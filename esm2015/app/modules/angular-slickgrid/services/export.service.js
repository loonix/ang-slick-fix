/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FileType } from './../models/index';
import { addWhiteSpaces, htmlEntityDecode, sanitizeHtmlToText } from './../services/utilities';
import { Subject } from 'rxjs';
import { TextEncoder } from 'text-encoding-utf-8';
/**
 * @record
 */
export function ExportColumnHeader() { }
if (false) {
    /** @type {?} */
    ExportColumnHeader.prototype.key;
    /** @type {?} */
    ExportColumnHeader.prototype.title;
}
export class ExportService {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
        this._lineCarriageReturn = '\n';
        this._hasGroupedItems = false;
        this.onGridBeforeExportToFile = new Subject();
        this.onGridAfterExportToFile = new Subject();
    }
    /**
     * @private
     * @return {?}
     */
    get datasetIdName() {
        return this._gridOptions && this._gridOptions.datasetIdPropertyName || 'id';
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @private
     * @return {?}
     */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    /**
     * Initialize the Export Service
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    init(grid, dataView) {
        this._grid = grid;
        this._dataView = dataView;
    }
    /**
     * Function to export the Grid result to an Excel CSV format using javascript for it to produce the CSV file.
     * This is a WYSIWYG export to file output (What You See is What You Get)
     *
     * NOTES: The column position needs to match perfectly the JSON Object position because of the way we are pulling the data,
     * which means that if any column(s) got moved in the UI, it has to be reflected in the JSON array output as well
     *
     * Example: exportToFile({ format: FileType.csv, delimiter: DelimiterType.comma })
     * @param {?} options
     * @return {?}
     */
    exportToFile(options) {
        this.onGridBeforeExportToFile.next(true);
        this._exportOptions = $.extend(true, {}, this._gridOptions.exportOptions, options);
        // get the CSV output from the grid data
        /** @type {?} */
        const dataOutput = this.getDataOutput();
        // trigger a download file
        // wrap it into a setTimeout so that the EventAggregator has enough time to start a pre-process like showing a spinner
        setTimeout((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const downloadOptions = {
                filename: `${this._exportOptions.filename}.${this._exportOptions.format}`,
                csvContent: dataOutput,
                format: this._exportOptions.format,
                useUtf8WithBom: this._exportOptions.useUtf8WithBom
            };
            this.startDownloadFile(downloadOptions);
            this.onGridAfterExportToFile.next({ options: downloadOptions });
        }), 0);
    }
    // -----------------------
    // Private functions
    // -----------------------
    /**
     * @return {?}
     */
    getDataOutput() {
        /** @type {?} */
        const columns = this._grid.getColumns() || [];
        /** @type {?} */
        const delimiter = this._exportOptions.delimiter || '';
        /** @type {?} */
        const format = this._exportOptions.format || '';
        /** @type {?} */
        const groupByColumnHeader = this._exportOptions.groupingColumnHeaderTitle || this.translate.instant('GROUP_BY');
        // a CSV needs double quotes wrapper, the other types do not need any wrapper
        this._exportQuoteWrapper = (format === FileType.csv) ? '"' : '';
        // data variable which will hold all the fields data of a row
        /** @type {?} */
        let outputDataString = '';
        // get grouped column titles and if found, we will add a "Group by" column at the first column index
        /** @type {?} */
        const grouping = this._dataView.getGrouping();
        if (grouping && Array.isArray(grouping) && grouping.length > 0) {
            this._hasGroupedItems = true;
            outputDataString += `${groupByColumnHeader}` + delimiter;
        }
        else {
            this._hasGroupedItems = false;
        }
        // get all column headers
        this._columnHeaders = this.getColumnHeaders(columns) || [];
        if (this._columnHeaders && Array.isArray(this._columnHeaders) && this._columnHeaders.length > 0) {
            // add the header row + add a new line at the end of the row
            /** @type {?} */
            const outputHeaderTitles = this._columnHeaders.map((/**
             * @param {?} header
             * @return {?}
             */
            (header) => {
                return this._exportQuoteWrapper + header.title + this._exportQuoteWrapper;
            }));
            outputDataString += (outputHeaderTitles.join(delimiter) + this._lineCarriageReturn);
        }
        // Populate the rest of the Grid Data
        outputDataString += this.getAllGridRowData(columns, this._lineCarriageReturn);
        return outputDataString;
    }
    /**
     * Get all the grid row data and return that as an output string
     * @param {?} columns
     * @param {?} lineCarriageReturn
     * @return {?}
     */
    getAllGridRowData(columns, lineCarriageReturn) {
        /** @type {?} */
        const outputDataStrings = [];
        /** @type {?} */
        const lineCount = this._dataView.getLength();
        // loop through all the grid rows of data
        for (let rowNumber = 0; rowNumber < lineCount; rowNumber++) {
            /** @type {?} */
            const itemObj = this._dataView.getItem(rowNumber);
            if (itemObj != null) {
                // Normal row (not grouped by anything) would have an ID which was predefined in the Grid Columns definition
                if (itemObj[this.datasetIdName] != null) {
                    // get regular row item data
                    outputDataStrings.push(this.readRegularRowData(columns, rowNumber, itemObj));
                }
                else if (this._hasGroupedItems && itemObj.__groupTotals === undefined) {
                    // get the group row
                    outputDataStrings.push(this.readGroupedTitleRow(itemObj));
                }
                else if (itemObj.__groupTotals) {
                    // else if the row is a Group By and we have agreggators, then a property of '__groupTotals' would exist under that object
                    outputDataStrings.push(this.readGroupedTotalRow(columns, itemObj));
                }
            }
        }
        return outputDataStrings.join(this._lineCarriageReturn);
    }
    /**
     * Get all header titles and their keys, translate the title when required.
     * @param {?} columns of the grid
     * @return {?}
     */
    getColumnHeaders(columns) {
        if (!columns || !Array.isArray(columns) || columns.length === 0) {
            return null;
        }
        /** @type {?} */
        const columnHeaders = [];
        // Populate the Column Header, pull the name defined
        columns.forEach((/**
         * @param {?} columnDef
         * @return {?}
         */
        (columnDef) => {
            /** @type {?} */
            const fieldName = (columnDef.headerKey) ? this.translate.instant(columnDef.headerKey) : columnDef.name;
            /** @type {?} */
            const skippedField = columnDef.excludeFromExport || false;
            // if column width is 0 then it's not evaluated since that field is considered hidden should not be part of the export
            if ((columnDef.width === undefined || columnDef.width > 0) && !skippedField) {
                columnHeaders.push({
                    key: columnDef.field || columnDef.id,
                    title: fieldName
                });
            }
        }));
        return columnHeaders;
    }
    /**
     * Get the data of a regular row (a row without grouping)
     * @param {?} columns
     * @param {?} row
     * @param {?} itemObj
     * @return {?}
     */
    readRegularRowData(columns, row, itemObj) {
        /** @type {?} */
        let idx = 0;
        /** @type {?} */
        const rowOutputStrings = [];
        /** @type {?} */
        const delimiter = this._exportOptions.delimiter;
        /** @type {?} */
        const format = this._exportOptions.format;
        /** @type {?} */
        const exportQuoteWrapper = this._exportQuoteWrapper || '';
        for (let col = 0, ln = columns.length; col < ln; col++) {
            /** @type {?} */
            const columnDef = columns[col];
            /** @type {?} */
            const fieldId = columnDef.field || columnDef.id || '';
            // skip excluded column
            if (columnDef.excludeFromExport) {
                continue;
            }
            // if we are grouping and are on 1st column index, we need to skip this column since it will be used later by the grouping text:: Group by [columnX]
            if (this._hasGroupedItems && idx === 0) {
                rowOutputStrings.push(`""`);
            }
            // does the user want to evaluate current column Formatter?
            /** @type {?} */
            const isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : this._exportOptions.exportWithFormatter;
            // did the user provide a Custom Formatter for the export
            /** @type {?} */
            const exportCustomFormatter = (columnDef.exportCustomFormatter !== undefined) ? columnDef.exportCustomFormatter : undefined;
            /** @type {?} */
            let itemData = '';
            if (itemObj && itemObj[fieldId] && exportCustomFormatter !== undefined && exportCustomFormatter !== null) {
                /** @type {?} */
                const formattedData = exportCustomFormatter(row, col, itemObj[fieldId], columnDef, itemObj, this._grid);
                itemData = (/** @type {?} */ (formattedData));
                if (formattedData && typeof formattedData === 'object' && formattedData.hasOwnProperty('text')) {
                    itemData = formattedData.text;
                }
                if (itemData === null) {
                    itemData = '';
                }
            }
            else if (isEvaluatingFormatter && columnDef.formatter !== undefined && columnDef.formatter !== null) {
                /** @type {?} */
                const formattedData = columnDef.formatter(row, col, itemObj[fieldId], columnDef, itemObj, this._grid);
                itemData = (/** @type {?} */ (formattedData));
                if (formattedData && typeof formattedData === 'object' && formattedData.hasOwnProperty('text')) {
                    itemData = formattedData.text;
                }
                if (itemData === null) {
                    itemData = '';
                }
            }
            else {
                itemData = (itemObj[fieldId] === null || itemObj[fieldId] === undefined) ? '' : itemObj[fieldId];
                if (itemData === null) {
                    itemData = '';
                }
            }
            // does the user want to sanitize the output data (remove HTML tags)?
            if (columnDef.sanitizeDataExport || this._exportOptions.sanitizeDataExport) {
                itemData = sanitizeHtmlToText(itemData);
            }
            // when CSV we also need to escape double quotes twice, so " becomes ""
            if (format === FileType.csv && itemData) {
                itemData = itemData.toString().replace(/"/gi, `""`);
            }
            // do we have a wrapper to keep as a string? in certain cases like "1E06", we don't want excel to transform it into exponential (1.0E06)
            // to cancel that effect we can had = in front, ex: ="1E06"
            /** @type {?} */
            const keepAsStringWrapper = (columnDef && columnDef.exportCsvForceToKeepAsString) ? '=' : '';
            rowOutputStrings.push(keepAsStringWrapper + exportQuoteWrapper + itemData + exportQuoteWrapper);
            idx++;
        }
        return rowOutputStrings.join(delimiter);
    }
    /**
     * Get the grouped title(s), for example if we grouped by salesRep, the returned result would be:: 'Sales Rep'
     * @param {?} itemObj
     * @return {?}
     */
    readGroupedTitleRow(itemObj) {
        /** @type {?} */
        let groupName = sanitizeHtmlToText(itemObj.title);
        /** @type {?} */
        const exportQuoteWrapper = this._exportQuoteWrapper || '';
        /** @type {?} */
        const format = this._exportOptions.format;
        groupName = addWhiteSpaces(5 * itemObj.level) + groupName;
        if (format === FileType.csv) {
            // when CSV we also need to escape double quotes twice, so " becomes ""
            groupName = groupName.toString().replace(/"/gi, `""`);
        }
        return exportQuoteWrapper + ' ' + groupName + exportQuoteWrapper;
    }
    /**
     * Get the grouped totals, these are set by Slick Aggregators.
     * For example if we grouped by "salesRep" and we have a Sum Aggregator on "sales", then the returned output would be:: ["Sum 123$"]
     * @param {?} columns
     * @param {?} itemObj
     * @return {?}
     */
    readGroupedTotalRow(columns, itemObj) {
        /** @type {?} */
        const delimiter = this._exportOptions.delimiter;
        /** @type {?} */
        const format = this._exportOptions.format;
        /** @type {?} */
        const groupingAggregatorRowText = this._exportOptions.groupingAggregatorRowText || '';
        /** @type {?} */
        const exportQuoteWrapper = this._exportQuoteWrapper || '';
        /** @type {?} */
        const outputStrings = [`${exportQuoteWrapper}${groupingAggregatorRowText}${exportQuoteWrapper}`];
        columns.forEach((/**
         * @param {?} columnDef
         * @return {?}
         */
        (columnDef) => {
            /** @type {?} */
            let itemData = '';
            // if there's a groupTotalsFormatter, we will re-run it to get the exact same output as what is shown in UI
            if (columnDef.groupTotalsFormatter) {
                itemData = columnDef.groupTotalsFormatter(itemObj, columnDef);
            }
            // does the user want to sanitize the output data (remove HTML tags)?
            if (columnDef.sanitizeDataExport || this._exportOptions.sanitizeDataExport) {
                itemData = sanitizeHtmlToText(itemData);
            }
            if (format === FileType.csv) {
                // when CSV we also need to escape double quotes twice, so a double quote " becomes 2x double quotes ""
                itemData = itemData.toString().replace(/"/gi, `""`);
            }
            outputStrings.push(exportQuoteWrapper + itemData + exportQuoteWrapper);
        }));
        return outputStrings.join(delimiter);
    }
    /**
     * Triggers download file with file format.
     * IE(6-10) are not supported
     * All other browsers will use plain javascript on client side to produce a file download.
     * @param {?} options
     * @return {?}
     */
    startDownloadFile(options) {
        // IE(6-10) don't support javascript download and our service doesn't support either so throw an error, we have to make a round trip to the Web Server for exporting
        if (navigator.appName === 'Microsoft Internet Explorer') {
            throw new Error('Microsoft Internet Explorer 6 to 10 do not support javascript export to CSV. Please upgrade your browser.');
        }
        // set the correct MIME type
        /** @type {?} */
        const mimeType = (options.format === FileType.csv) ? 'text/csv' : 'text/plain';
        // make sure no html entities exist in the data
        /** @type {?} */
        const csvContent = htmlEntityDecode(options.csvContent);
        // dealing with Excel CSV export and UTF-8 is a little tricky.. We will use Option #2 to cover older Excel versions
        // Option #1: we need to make Excel knowing that it's dealing with an UTF-8, A correctly formatted UTF8 file can have a Byte Order Mark as its first three octets
        // reference: http://stackoverflow.com/questions/155097/microsoft-excel-mangles-diacritics-in-csv-files
        // Option#2: use a 3rd party extension to javascript encode into UTF-16
        /** @type {?} */
        let outputData;
        if (options.format === FileType.csv) {
            outputData = new TextEncoder('utf-8').encode(csvContent);
        }
        else {
            outputData = csvContent;
        }
        // create a Blob object for the download
        /** @type {?} */
        const blob = new Blob([options.useUtf8WithBom ? '\uFEFF' : '', outputData], {
            type: `${mimeType};charset=utf-8;`
        });
        // when using IE/Edge, then use different download call
        if (typeof navigator.msSaveOrOpenBlob === 'function') {
            navigator.msSaveOrOpenBlob(blob, options.filename);
        }
        else {
            // this trick will generate a temp <a /> tag
            // the code will then trigger a hidden click for it to start downloading
            /** @type {?} */
            const link = document.createElement('a');
            /** @type {?} */
            const csvUrl = URL.createObjectURL(blob);
            link.textContent = 'download';
            link.href = csvUrl;
            link.setAttribute('download', options.filename);
            // set the visibility to hidden so there is no effect on your web-layout
            link.style.visibility = 'hidden';
            // this part will append the anchor tag, trigger a click (for download to start) and finally remove the tag once completed
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
ExportService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ExportService.ctorParameters = () => [
    { type: TranslateService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype._lineCarriageReturn;
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype._dataView;
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype._grid;
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype._exportQuoteWrapper;
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype._columnHeaders;
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype._groupedHeaders;
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype._hasGroupedItems;
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype._exportOptions;
    /** @type {?} */
    ExportService.prototype.onGridBeforeExportToFile;
    /** @type {?} */
    ExportService.prototype.onGridAfterExportToFile;
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2V4cG9ydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFHTCxRQUFRLEVBR1QsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0YsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFLbEQsd0NBR0M7OztJQUZDLGlDQUFZOztJQUNaLG1DQUFjOztBQUloQixNQUFNLE9BQU8sYUFBYTs7OztJQVl4QixZQUFvQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQVh2Qyx3QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFNM0IscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBRWpDLDZCQUF3QixHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7UUFDbEQsNEJBQXVCLEdBQUcsSUFBSSxPQUFPLEVBQW9CLENBQUM7SUFFUCxDQUFDOzs7OztJQUVwRCxJQUFZLGFBQWE7UUFDdkIsT0FBTyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLElBQUksSUFBSSxDQUFDO0lBQzlFLENBQUM7Ozs7OztJQUdELElBQVksWUFBWTtRQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxD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QWlCO1NBQ25DLENBQUM7UUFFRix1REFBdUQ7UUFDdkQsSUFBSSxPQUFPLFNBQVMsQ0FBQyxnQkFBZ0IsS0FBSyxVQUFVLEVBQUU7WUFDcEQsU0FBUyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDcEQ7YUFBTTs7OztrQkFHQyxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7O2tCQUNsQyxNQUFNLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7WUFFeEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7WUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRWhELHdFQUF3RTtZQUN4RSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7WUFFakMsMEhBQTBIO1lBQzFILFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQzs7O1lBOVZGLFVBQVU7Ozs7WUFwQkYsZ0JBQWdCOzs7Ozs7O0lBc0J2Qiw0Q0FBbUM7Ozs7O0lBQ25DLGtDQUF1Qjs7Ozs7SUFDdkIsOEJBQW1COzs7OztJQUNuQiw0Q0FBb0M7Ozs7O0lBQ3BDLHVDQUE2Qzs7Ozs7SUFDN0Msd0NBQThDOzs7OztJQUM5Qyx5Q0FBaUM7Ozs7O0lBQ2pDLHVDQUFxQzs7SUFDckMsaURBQWtEOztJQUNsRCxnREFBMEQ7Ozs7O0lBRTlDLGtDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7XG4gIENvbHVtbixcbiAgRXhwb3J0T3B0aW9uLFxuICBGaWxlVHlwZSxcbiAgRm9ybWF0dGVyLFxuICBHcmlkT3B0aW9uXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IGFkZFdoaXRlU3BhY2VzLCBodG1sRW50aXR5RGVjb2RlLCBzYW5pdGl6ZUh0bWxUb1RleHQgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUZXh0RW5jb2RlciB9IGZyb20gJ3RleHQtZW5jb2RpbmctdXRmLTgnO1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIGxldCAkOiBhbnk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXhwb3J0Q29sdW1uSGVhZGVyIHtcbiAga2V5OiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmc7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFeHBvcnRTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfbGluZUNhcnJpYWdlUmV0dXJuID0gJ1xcbic7XG4gIHByaXZhdGUgX2RhdGFWaWV3OiBhbnk7XG4gIHByaXZhdGUgX2dyaWQ6IGFueTtcbiAgcHJpdmF0ZSBfZXhwb3J0UXVvdGVXcmFwcGVyOiBzdHJpbmc7XG4gIHByaXZhdGUgX2NvbHVtbkhlYWRlcnM6IEV4cG9ydENvbHVtbkhlYWRlcltdO1xuICBwcml2YXRlIF9ncm91cGVkSGVhZGVyczogRXhwb3J0Q29sdW1uSGVhZGVyW107XG4gIHByaXZhdGUgX2hhc0dyb3VwZWRJdGVtcyA9IGZhbHNlO1xuICBwcml2YXRlIF9leHBvcnRPcHRpb25zOiBFeHBvcnRPcHRpb247XG4gIG9uR3JpZEJlZm9yZUV4cG9ydFRvRmlsZSA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG4gIG9uR3JpZEFmdGVyRXhwb3J0VG9GaWxlID0gbmV3IFN1YmplY3Q8eyBvcHRpb25zOiBhbnkgfT4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkgeyB9XG5cbiAgcHJpdmF0ZSBnZXQgZGF0YXNldElkTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5kYXRhc2V0SWRQcm9wZXJ0eU5hbWUgfHwgJ2lkJztcbiAgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXG4gIHByaXZhdGUgZ2V0IF9ncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgRXhwb3J0IFNlcnZpY2VcbiAgICogQHBhcmFtIGdyaWRcbiAgICogQHBhcmFtIGdyaWRPcHRpb25zXG4gICAqIEBwYXJhbSBkYXRhVmlld1xuICAgKi9cbiAgaW5pdChncmlkOiBhbnksIGRhdGFWaWV3OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcbiAgICB0aGlzLl9kYXRhVmlldyA9IGRhdGFWaWV3O1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIGV4cG9ydCB0aGUgR3JpZCByZXN1bHQgdG8gYW4gRXhjZWwgQ1NWIGZvcm1hdCB1c2luZyBqYXZhc2NyaXB0IGZvciBpdCB0byBwcm9kdWNlIHRoZSBDU1YgZmlsZS5cbiAgICogVGhpcyBpcyBhIFdZU0lXWUcgZXhwb3J0IHRvIGZpbGUgb3V0cHV0IChXaGF0IFlvdSBTZWUgaXMgV2hhdCBZb3UgR2V0KVxuICAgKlxuICAgKiBOT1RFUzogVGhlIGNvbHVtbiBwb3NpdGlvbiBuZWVkcyB0byBtYXRjaCBwZXJmZWN0bHkgdGhlIEpTT04gT2JqZWN0IHBvc2l0aW9uIGJlY2F1c2Ugb2YgdGhlIHdheSB3ZSBhcmUgcHVsbGluZyB0aGUgZGF0YSxcbiAgICogd2hpY2ggbWVhbnMgdGhhdCBpZiBhbnkgY29sdW1uKHMpIGdvdCBtb3ZlZCBpbiB0aGUgVUksIGl0IGhhcyB0byBiZSByZWZsZWN0ZWQgaW4gdGhlIEpTT04gYXJyYXkgb3V0cHV0IGFzIHdlbGxcbiAgICpcbiAgICogRXhhbXBsZTogZXhwb3J0VG9GaWxlKHsgZm9ybWF0OiBGaWxlVHlwZS5jc3YsIGRlbGltaXRlcjogRGVsaW1pdGVyVHlwZS5jb21tYSB9KVxuICAgKi9cbiAgZXhwb3J0VG9GaWxlKG9wdGlvbnM6IEV4cG9ydE9wdGlvbikge1xuICAgIHRoaXMub25HcmlkQmVmb3JlRXhwb3J0VG9GaWxlLm5leHQodHJ1ZSk7XG4gICAgdGhpcy5fZXhwb3J0T3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLl9ncmlkT3B0aW9ucy5leHBvcnRPcHRpb25zLCBvcHRpb25zKTtcblxuICAgIC8vIGdldCB0aGUgQ1NWIG91dHB1dCBmcm9tIHRoZSBncmlkIGRhdGFcbiAgICBjb25zdCBkYXRhT3V0cHV0ID0gdGhpcy5nZXREYXRhT3V0cHV0KCk7XG5cbiAgICAvLyB0cmlnZ2VyIGEgZG93bmxvYWQgZmlsZVxuICAgIC8vIHdyYXAgaXQgaW50byBhIHNldFRpbWVvdXQgc28gdGhhdCB0aGUgRXZlbnRBZ2dyZWdhdG9yIGhhcyBlbm91Z2ggdGltZSB0byBzdGFydCBhIHByZS1wcm9jZXNzIGxpa2Ugc2hvd2luZyBhIHNwaW5uZXJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IGRvd25sb2FkT3B0aW9ucyA9IHtcbiAgICAgICAgZmlsZW5hbWU6IGAke3RoaXMuX2V4cG9ydE9wdGlvbnMuZmlsZW5hbWV9LiR7dGhpcy5fZXhwb3J0T3B0aW9ucy5mb3JtYXR9YCxcbiAgICAgICAgY3N2Q29udGVudDogZGF0YU91dHB1dCxcbiAgICAgICAgZm9ybWF0OiB0aGlzLl9leHBvcnRPcHRpb25zLmZvcm1hdCxcbiAgICAgICAgdXNlVXRmOFdpdGhCb206IHRoaXMuX2V4cG9ydE9wdGlvbnMudXNlVXRmOFdpdGhCb21cbiAgICAgIH07XG4gICAgICB0aGlzLnN0YXJ0RG93bmxvYWRGaWxlKGRvd25sb2FkT3B0aW9ucyk7XG4gICAgICB0aGlzLm9uR3JpZEFmdGVyRXhwb3J0VG9GaWxlLm5leHQoeyBvcHRpb25zOiBkb3dubG9hZE9wdGlvbnMgfSk7XG4gICAgfSwgMCk7XG4gIH1cblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBQcml2YXRlIGZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIGdldERhdGFPdXRwdXQoKTogc3RyaW5nIHtcbiAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKCkgfHwgW107XG4gICAgY29uc3QgZGVsaW1pdGVyID0gdGhpcy5fZXhwb3J0T3B0aW9ucy5kZWxpbWl0ZXIgfHwgJyc7XG4gICAgY29uc3QgZm9ybWF0ID0gdGhpcy5fZXhwb3J0T3B0aW9ucy5mb3JtYXQgfHwgJyc7XG4gICAgY29uc3QgZ3JvdXBCeUNvbHVtbkhlYWRlciA9IHRoaXMuX2V4cG9ydE9wdGlvbnMuZ3JvdXBpbmdDb2x1bW5IZWFkZXJUaXRsZSB8fCB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdHUk9VUF9CWScpO1xuXG4gICAgLy8gYSBDU1YgbmVlZHMgZG91YmxlIHF1b3RlcyB3cmFwcGVyLCB0aGUgb3RoZXIgdHlwZXMgZG8gbm90IG5lZWQgYW55IHdyYXBwZXJcbiAgICB0aGlzLl9leHBvcnRRdW90ZVdyYXBwZXIgPSAoZm9ybWF0ID09PSBGaWxlVHlwZS5jc3YpID8gJ1wiJyA6ICcnO1xuXG4gICAgLy8gZGF0YSB2YXJpYWJsZSB3aGljaCB3aWxsIGhvbGQgYWxsIHRoZSBmaWVsZHMgZGF0YSBvZiBhIHJvd1xuICAgIGxldCBvdXRwdXREYXRhU3RyaW5nID0gJyc7XG5cbiAgICAvLyBnZXQgZ3JvdXBlZCBjb2x1bW4gdGl0bGVzIGFuZCBpZiBmb3VuZCwgd2Ugd2lsbCBhZGQgYSBcIkdyb3VwIGJ5XCIgY29sdW1uIGF0IHRoZSBmaXJzdCBjb2x1bW4gaW5kZXhcbiAgICBjb25zdCBncm91cGluZyA9IHRoaXMuX2RhdGFWaWV3LmdldEdyb3VwaW5nKCk7XG4gICAgaWYgKGdyb3VwaW5nICYmIEFycmF5LmlzQXJyYXkoZ3JvdXBpbmcpICYmIGdyb3VwaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX2hhc0dyb3VwZWRJdGVtcyA9IHRydWU7XG4gICAgICBvdXRwdXREYXRhU3RyaW5nICs9IGAke2dyb3VwQnlDb2x1bW5IZWFkZXJ9YCArIGRlbGltaXRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGFzR3JvdXBlZEl0ZW1zID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gZ2V0IGFsbCBjb2x1bW4gaGVhZGVyc1xuICAgIHRoaXMuX2NvbHVtbkhlYWRlcnMgPSB0aGlzLmdldENvbHVtbkhlYWRlcnMoY29sdW1ucykgfHwgW107XG4gICAgaWYgKHRoaXMuX2NvbHVtbkhlYWRlcnMgJiYgQXJyYXkuaXNBcnJheSh0aGlzLl9jb2x1bW5IZWFkZXJzKSAmJiB0aGlzLl9jb2x1bW5IZWFkZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGFkZCB0aGUgaGVhZGVyIHJvdyArIGFkZCBhIG5ldyBsaW5lIGF0IHRoZSBlbmQgb2YgdGhlIHJvd1xuICAgICAgY29uc3Qgb3V0cHV0SGVhZGVyVGl0bGVzID0gdGhpcy5fY29sdW1uSGVhZGVycy5tYXAoKGhlYWRlcikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXhwb3J0UXVvdGVXcmFwcGVyICsgaGVhZGVyLnRpdGxlICsgdGhpcy5fZXhwb3J0UXVvdGVXcmFwcGVyO1xuICAgICAgfSk7XG4gICAgICBvdXRwdXREYXRhU3RyaW5nICs9IChvdXRwdXRIZWFkZXJUaXRsZXMuam9pbihkZWxpbWl0ZXIpICsgdGhpcy5fbGluZUNhcnJpYWdlUmV0dXJuKTtcbiAgICB9XG5cbiAgICAvLyBQb3B1bGF0ZSB0aGUgcmVzdCBvZiB0aGUgR3JpZCBEYXRhXG4gICAgb3V0cHV0RGF0YVN0cmluZyArPSB0aGlzLmdldEFsbEdyaWRSb3dEYXRhKGNvbHVtbnMsIHRoaXMuX2xpbmVDYXJyaWFnZVJldHVybik7XG5cbiAgICByZXR1cm4gb3V0cHV0RGF0YVN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHRoZSBncmlkIHJvdyBkYXRhIGFuZCByZXR1cm4gdGhhdCBhcyBhbiBvdXRwdXQgc3RyaW5nXG4gICAqL1xuICBnZXRBbGxHcmlkUm93RGF0YShjb2x1bW5zOiBDb2x1bW5bXSwgbGluZUNhcnJpYWdlUmV0dXJuOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IG91dHB1dERhdGFTdHJpbmdzID0gW107XG4gICAgY29uc3QgbGluZUNvdW50ID0gdGhpcy5fZGF0YVZpZXcuZ2V0TGVuZ3RoKCk7XG5cbiAgICAvLyBsb29wIHRocm91Z2ggYWxsIHRoZSBncmlkIHJvd3Mgb2YgZGF0YVxuICAgIGZvciAobGV0IHJvd051bWJlciA9IDA7IHJvd051bWJlciA8IGxpbmVDb3VudDsgcm93TnVtYmVyKyspIHtcbiAgICAgIGNvbnN0IGl0ZW1PYmogPSB0aGlzLl9kYXRhVmlldy5nZXRJdGVtKHJvd051bWJlcik7XG5cbiAgICAgIGlmIChpdGVtT2JqICE9IG51bGwpIHtcbiAgICAgICAgLy8gTm9ybWFsIHJvdyAobm90IGdyb3VwZWQgYnkgYW55dGhpbmcpIHdvdWxkIGhhdmUgYW4gSUQgd2hpY2ggd2FzIHByZWRlZmluZWQgaW4gdGhlIEdyaWQgQ29sdW1ucyBkZWZpbml0aW9uXG4gICAgICAgIGlmIChpdGVtT2JqW3RoaXMuZGF0YXNldElkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgIC8vIGdldCByZWd1bGFyIHJvdyBpdGVtIGRhdGFcbiAgICAgICAgICBvdXRwdXREYXRhU3RyaW5ncy5wdXNoKHRoaXMucmVhZFJlZ3VsYXJSb3dEYXRhKGNvbHVtbnMsIHJvd051bWJlciwgaXRlbU9iaikpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2hhc0dyb3VwZWRJdGVtcyAmJiBpdGVtT2JqLl9fZ3JvdXBUb3RhbHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIGdldCB0aGUgZ3JvdXAgcm93XG4gICAgICAgICAgb3V0cHV0RGF0YVN0cmluZ3MucHVzaCh0aGlzLnJlYWRHcm91cGVkVGl0bGVSb3coaXRlbU9iaikpO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW1PYmouX19ncm91cFRvdGFscykge1xuICAgICAgICAgIC8vIGVsc2UgaWYgdGhlIHJvdyBpcyBhIEdyb3VwIEJ5IGFuZCB3ZSBoYXZlIGFncmVnZ2F0b3JzLCB0aGVuIGEgcHJvcGVydHkgb2YgJ19fZ3JvdXBUb3RhbHMnIHdvdWxkIGV4aXN0IHVuZGVyIHRoYXQgb2JqZWN0XG4gICAgICAgICAgb3V0cHV0RGF0YVN0cmluZ3MucHVzaCh0aGlzLnJlYWRHcm91cGVkVG90YWxSb3coY29sdW1ucywgaXRlbU9iaikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dERhdGFTdHJpbmdzLmpvaW4odGhpcy5fbGluZUNhcnJpYWdlUmV0dXJuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIGhlYWRlciB0aXRsZXMgYW5kIHRoZWlyIGtleXMsIHRyYW5zbGF0ZSB0aGUgdGl0bGUgd2hlbiByZXF1aXJlZC5cbiAgICogQHBhcmFtIGNvbHVtbnMgb2YgdGhlIGdyaWRcbiAgICovXG4gIGdldENvbHVtbkhlYWRlcnMoY29sdW1uczogQ29sdW1uW10pOiBFeHBvcnRDb2x1bW5IZWFkZXJbXSB7XG4gICAgaWYgKCFjb2x1bW5zIHx8ICFBcnJheS5pc0FycmF5KGNvbHVtbnMpIHx8IGNvbHVtbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgY29sdW1uSGVhZGVycyA9IFtdO1xuXG4gICAgLy8gUG9wdWxhdGUgdGhlIENvbHVtbiBIZWFkZXIsIHB1bGwgdGhlIG5hbWUgZGVmaW5lZFxuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uRGVmKSA9PiB7XG4gICAgICBjb25zdCBmaWVsZE5hbWUgPSAoY29sdW1uRGVmLmhlYWRlcktleSkgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KGNvbHVtbkRlZi5oZWFkZXJLZXkpIDogY29sdW1uRGVmLm5hbWU7XG4gICAgICBjb25zdCBza2lwcGVkRmllbGQgPSBjb2x1bW5EZWYuZXhjbHVkZUZyb21FeHBvcnQgfHwgZmFsc2U7XG5cbiAgICAgIC8vIGlmIGNvbHVtbiB3aWR0aCBpcyAwIHRoZW4gaXQncyBub3QgZXZhbHVhdGVkIHNpbmNlIHRoYXQgZmllbGQgaXMgY29uc2lkZXJlZCBoaWRkZW4gc2hvdWxkIG5vdCBiZSBwYXJ0IG9mIHRoZSBleHBvcnRcbiAgICAgIGlmICgoY29sdW1uRGVmLndpZHRoID09PSAgdW5kZWZpbmVkIHx8IGNvbHVtbkRlZi53aWR0aCA+IDApICYmICFza2lwcGVkRmllbGQpIHtcbiAgICAgICAgY29sdW1uSGVhZGVycy5wdXNoKHtcbiAgICAgICAgICBrZXk6IGNvbHVtbkRlZi5maWVsZCB8fCBjb2x1bW5EZWYuaWQsXG4gICAgICAgICAgdGl0bGU6IGZpZWxkTmFtZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjb2x1bW5IZWFkZXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGF0YSBvZiBhIHJlZ3VsYXIgcm93IChhIHJvdyB3aXRob3V0IGdyb3VwaW5nKVxuICAgKiBAcGFyYW0gcm93XG4gICAqIEBwYXJhbSBpdGVtT2JqXG4gICAqL1xuICByZWFkUmVndWxhclJvd0RhdGEoY29sdW1uczogQ29sdW1uW10sIHJvdzogbnVtYmVyLCBpdGVtT2JqOiBhbnkpIHtcbiAgICBsZXQgaWR4ID0gMDtcbiAgICBjb25zdCByb3dPdXRwdXRTdHJpbmdzID0gW107XG4gICAgY29uc3QgZGVsaW1pdGVyID0gdGhpcy5fZXhwb3J0T3B0aW9ucy5kZWxpbWl0ZXI7XG4gICAgY29uc3QgZm9ybWF0ID0gdGhpcy5fZXhwb3J0T3B0aW9ucy5mb3JtYXQ7XG4gICAgY29uc3QgZXhwb3J0UXVvdGVXcmFwcGVyID0gdGhpcy5fZXhwb3J0UXVvdGVXcmFwcGVyIHx8ICcnO1xuXG4gICAgZm9yIChsZXQgY29sID0gMCwgbG4gPSBjb2x1bW5zLmxlbmd0aDsgY29sIDwgbG47IGNvbCsrKSB7XG4gICAgICBjb25zdCBjb2x1bW5EZWYgPSBjb2x1bW5zW2NvbF07XG4gICAgICBjb25zdCBmaWVsZElkID0gY29sdW1uRGVmLmZpZWxkIHx8IGNvbHVtbkRlZi5pZCB8fCAnJztcblxuICAgICAgLy8gc2tpcCBleGNsdWRlZCBjb2x1bW5cbiAgICAgIGlmIChjb2x1bW5EZWYuZXhjbHVkZUZyb21FeHBvcnQpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgd2UgYXJlIGdyb3VwaW5nIGFuZCBhcmUgb24gMXN0IGNvbHVtbiBpbmRleCwgd2UgbmVlZCB0byBza2lwIHRoaXMgY29sdW1uIHNpbmNlIGl0IHdpbGwgYmUgdXNlZCBsYXRlciBieSB0aGUgZ3JvdXBpbmcgdGV4dDo6IEdyb3VwIGJ5IFtjb2x1bW5YXVxuICAgICAgaWYgKHRoaXMuX2hhc0dyb3VwZWRJdGVtcyAmJiBpZHggPT09IDApIHtcbiAgICAgICAgcm93T3V0cHV0U3RyaW5ncy5wdXNoKGBcIlwiYCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGRvZXMgdGhlIHVzZXIgd2FudCB0byBldmFsdWF0ZSBjdXJyZW50IGNvbHVtbiBGb3JtYXR0ZXI/XG4gICAgICBjb25zdCBpc0V2YWx1YXRpbmdGb3JtYXR0ZXIgPSAoY29sdW1uRGVmLmV4cG9ydFdpdGhGb3JtYXR0ZXIgIT09IHVuZGVmaW5lZCkgPyBjb2x1bW5EZWYuZXhwb3J0V2l0aEZvcm1hdHRlciA6IHRoaXMuX2V4cG9ydE9wdGlvbnMuZXhwb3J0V2l0aEZvcm1hdHRlcjtcblxuICAgICAgLy8gZGlkIHRoZSB1c2VyIHByb3ZpZGUgYSBDdXN0b20gRm9ybWF0dGVyIGZvciB0aGUgZXhwb3J0XG4gICAgICBjb25zdCBleHBvcnRDdXN0b21Gb3JtYXR0ZXI6IEZvcm1hdHRlciB8IHVuZGVmaW5lZCA9IChjb2x1bW5EZWYuZXhwb3J0Q3VzdG9tRm9ybWF0dGVyICE9PSB1bmRlZmluZWQpID8gY29sdW1uRGVmLmV4cG9ydEN1c3RvbUZvcm1hdHRlciA6IHVuZGVmaW5lZDtcblxuICAgICAgbGV0IGl0ZW1EYXRhID0gJyc7XG5cbiAgICAgIGlmIChpdGVtT2JqICYmIGl0ZW1PYmpbZmllbGRJZF0gJiYgZXhwb3J0Q3VzdG9tRm9ybWF0dGVyICE9PSB1bmRlZmluZWQgJiYgZXhwb3J0Q3VzdG9tRm9ybWF0dGVyICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZERhdGEgPSBleHBvcnRDdXN0b21Gb3JtYXR0ZXIocm93LCBjb2wsIGl0ZW1PYmpbZmllbGRJZF0sIGNvbHVtbkRlZiwgaXRlbU9iaiwgdGhpcy5fZ3JpZCk7XG4gICAgICAgIGl0ZW1EYXRhID0gZm9ybWF0dGVkRGF0YSBhcyBzdHJpbmc7XG4gICAgICAgIGlmIChmb3JtYXR0ZWREYXRhICYmIHR5cGVvZiBmb3JtYXR0ZWREYXRhID09PSAnb2JqZWN0JyAmJiBmb3JtYXR0ZWREYXRhLmhhc093blByb3BlcnR5KCd0ZXh0JykpIHtcbiAgICAgICAgICBpdGVtRGF0YSA9IGZvcm1hdHRlZERhdGEudGV4dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbURhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICBpdGVtRGF0YSA9ICcnO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlzRXZhbHVhdGluZ0Zvcm1hdHRlciAmJiBjb2x1bW5EZWYuZm9ybWF0dGVyICE9PSB1bmRlZmluZWQgJiYgY29sdW1uRGVmLmZvcm1hdHRlciAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWREYXRhID0gY29sdW1uRGVmLmZvcm1hdHRlcihyb3csIGNvbCwgaXRlbU9ialtmaWVsZElkXSwgY29sdW1uRGVmLCBpdGVtT2JqLCB0aGlzLl9ncmlkKTtcbiAgICAgICAgaXRlbURhdGEgPSBmb3JtYXR0ZWREYXRhIGFzIHN0cmluZztcbiAgICAgICAgaWYgKGZvcm1hdHRlZERhdGEgJiYgdHlwZW9mIGZvcm1hdHRlZERhdGEgPT09ICdvYmplY3QnICYmIGZvcm1hdHRlZERhdGEuaGFzT3duUHJvcGVydHkoJ3RleHQnKSkge1xuICAgICAgICAgIGl0ZW1EYXRhID0gZm9ybWF0dGVkRGF0YS50ZXh0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtRGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgIGl0ZW1EYXRhID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW1EYXRhID0gKGl0ZW1PYmpbZmllbGRJZF0gPT09IG51bGwgfHwgaXRlbU9ialtmaWVsZElkXSA9PT0gdW5kZWZpbmVkKSA/ICcnIDogaXRlbU9ialtmaWVsZElkXTtcbiAgICAgICAgaWYgKGl0ZW1EYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgaXRlbURhdGEgPSAnJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBkb2VzIHRoZSB1c2VyIHdhbnQgdG8gc2FuaXRpemUgdGhlIG91dHB1dCBkYXRhIChyZW1vdmUgSFRNTCB0YWdzKT9cbiAgICAgIGlmIChjb2x1bW5EZWYuc2FuaXRpemVEYXRhRXhwb3J0IHx8IHRoaXMuX2V4cG9ydE9wdGlvbnMuc2FuaXRpemVEYXRhRXhwb3J0KSB7XG4gICAgICAgIGl0ZW1EYXRhID0gc2FuaXRpemVIdG1sVG9UZXh0KGl0ZW1EYXRhKTtcbiAgICAgIH1cblxuICAgICAgLy8gd2hlbiBDU1Ygd2UgYWxzbyBuZWVkIHRvIGVzY2FwZSBkb3VibGUgcXVvdGVzIHR3aWNlLCBzbyBcIiBiZWNvbWVzIFwiXCJcbiAgICAgIGlmIChmb3JtYXQgPT09IEZpbGVUeXBlLmNzdiAmJiBpdGVtRGF0YSkge1xuICAgICAgICBpdGVtRGF0YSA9IGl0ZW1EYXRhLnRvU3RyaW5nKCkucmVwbGFjZSgvXCIvZ2ksIGBcIlwiYCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGRvIHdlIGhhdmUgYSB3cmFwcGVyIHRvIGtlZXAgYXMgYSBzdHJpbmc/IGluIGNlcnRhaW4gY2FzZXMgbGlrZSBcIjFFMDZcIiwgd2UgZG9uJ3Qgd2FudCBleGNlbCB0byB0cmFuc2Zvcm0gaXQgaW50byBleHBvbmVudGlhbCAoMS4wRTA2KVxuICAgICAgLy8gdG8gY2FuY2VsIHRoYXQgZWZmZWN0IHdlIGNhbiBoYWQgPSBpbiBmcm9udCwgZXg6ID1cIjFFMDZcIlxuICAgICAgY29uc3Qga2VlcEFzU3RyaW5nV3JhcHBlciA9IChjb2x1bW5EZWYgJiYgY29sdW1uRGVmLmV4cG9ydENzdkZvcmNlVG9LZWVwQXNTdHJpbmcpID8gJz0nIDogJyc7XG5cbiAgICAgIHJvd091dHB1dFN0cmluZ3MucHVzaChrZWVwQXNTdHJpbmdXcmFwcGVyICsgZXhwb3J0UXVvdGVXcmFwcGVyICsgaXRlbURhdGEgKyBleHBvcnRRdW90ZVdyYXBwZXIpO1xuICAgICAgaWR4Kys7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvd091dHB1dFN0cmluZ3Muam9pbihkZWxpbWl0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZ3JvdXBlZCB0aXRsZShzKSwgZm9yIGV4YW1wbGUgaWYgd2UgZ3JvdXBlZCBieSBzYWxlc1JlcCwgdGhlIHJldHVybmVkIHJlc3VsdCB3b3VsZCBiZTo6ICdTYWxlcyBSZXAnXG4gICAqIEBwYXJhbSBpdGVtT2JqXG4gICAqL1xuICByZWFkR3JvdXBlZFRpdGxlUm93KGl0ZW1PYmo6IGFueSkge1xuICAgIGxldCBncm91cE5hbWUgPSBzYW5pdGl6ZUh0bWxUb1RleHQoaXRlbU9iai50aXRsZSk7XG4gICAgY29uc3QgZXhwb3J0UXVvdGVXcmFwcGVyID0gdGhpcy5fZXhwb3J0UXVvdGVXcmFwcGVyIHx8ICcnO1xuICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMuX2V4cG9ydE9wdGlvbnMuZm9ybWF0O1xuXG4gICAgZ3JvdXBOYW1lID0gYWRkV2hpdGVTcGFjZXMoNSAqIGl0ZW1PYmoubGV2ZWwpICsgZ3JvdXBOYW1lO1xuXG4gICAgaWYgKGZvcm1hdCA9PT0gRmlsZVR5cGUuY3N2KSB7XG4gICAgICAvLyB3aGVuIENTViB3ZSBhbHNvIG5lZWQgdG8gZXNjYXBlIGRvdWJsZSBxdW90ZXMgdHdpY2UsIHNvIFwiIGJlY29tZXMgXCJcIlxuICAgICAgZ3JvdXBOYW1lID0gZ3JvdXBOYW1lLnRvU3RyaW5nKCkucmVwbGFjZSgvXCIvZ2ksIGBcIlwiYCk7XG4gICAgfVxuICAgIHJldHVybiBleHBvcnRRdW90ZVdyYXBwZXIgKyAnICcgKyBncm91cE5hbWUgKyBleHBvcnRRdW90ZVdyYXBwZXI7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBncm91cGVkIHRvdGFscywgdGhlc2UgYXJlIHNldCBieSBTbGljayBBZ2dyZWdhdG9ycy5cbiAgICogRm9yIGV4YW1wbGUgaWYgd2UgZ3JvdXBlZCBieSBcInNhbGVzUmVwXCIgYW5kIHdlIGhhdmUgYSBTdW0gQWdncmVnYXRvciBvbiBcInNhbGVzXCIsIHRoZW4gdGhlIHJldHVybmVkIG91dHB1dCB3b3VsZCBiZTo6IFtcIlN1bSAxMjMkXCJdXG4gICAqIEBwYXJhbSBpdGVtT2JqXG4gICAqL1xuICByZWFkR3JvdXBlZFRvdGFsUm93KGNvbHVtbnM6IENvbHVtbltdLCBpdGVtT2JqOiBhbnkpIHtcbiAgICBjb25zdCBkZWxpbWl0ZXIgPSB0aGlzLl9leHBvcnRPcHRpb25zLmRlbGltaXRlcjtcbiAgICBjb25zdCBmb3JtYXQgPSB0aGlzLl9leHBvcnRPcHRpb25zLmZvcm1hdDtcbiAgICBjb25zdCBncm91cGluZ0FnZ3JlZ2F0b3JSb3dUZXh0ID0gdGhpcy5fZXhwb3J0T3B0aW9ucy5ncm91cGluZ0FnZ3JlZ2F0b3JSb3dUZXh0IHx8ICcnO1xuICAgIGNvbnN0IGV4cG9ydFF1b3RlV3JhcHBlciA9IHRoaXMuX2V4cG9ydFF1b3RlV3JhcHBlciB8fCAnJztcbiAgICBjb25zdCBvdXRwdXRTdHJpbmdzID0gW2Ake2V4cG9ydFF1b3RlV3JhcHBlcn0ke2dyb3VwaW5nQWdncmVnYXRvclJvd1RleHR9JHtleHBvcnRRdW90ZVdyYXBwZXJ9YF07XG5cbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbkRlZikgPT4ge1xuICAgICAgbGV0IGl0ZW1EYXRhID0gJyc7XG5cbiAgICAgIC8vIGlmIHRoZXJlJ3MgYSBncm91cFRvdGFsc0Zvcm1hdHRlciwgd2Ugd2lsbCByZS1ydW4gaXQgdG8gZ2V0IHRoZSBleGFjdCBzYW1lIG91dHB1dCBhcyB3aGF0IGlzIHNob3duIGluIFVJXG4gICAgICBpZiAoY29sdW1uRGVmLmdyb3VwVG90YWxzRm9ybWF0dGVyKSB7XG4gICAgICAgIGl0ZW1EYXRhID0gY29sdW1uRGVmLmdyb3VwVG90YWxzRm9ybWF0dGVyKGl0ZW1PYmosIGNvbHVtbkRlZik7XG4gICAgICB9XG5cbiAgICAgIC8vIGRvZXMgdGhlIHVzZXIgd2FudCB0byBzYW5pdGl6ZSB0aGUgb3V0cHV0IGRhdGEgKHJlbW92ZSBIVE1MIHRhZ3MpP1xuICAgICAgaWYgKGNvbHVtbkRlZi5zYW5pdGl6ZURhdGFFeHBvcnQgfHwgdGhpcy5fZXhwb3J0T3B0aW9ucy5zYW5pdGl6ZURhdGFFeHBvcnQpIHtcbiAgICAgICAgaXRlbURhdGEgPSBzYW5pdGl6ZUh0bWxUb1RleHQoaXRlbURhdGEpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZm9ybWF0ID09PSBGaWxlVHlwZS5jc3YpIHtcbiAgICAgICAgLy8gd2hlbiBDU1Ygd2UgYWxzbyBuZWVkIHRvIGVzY2FwZSBkb3VibGUgcXVvdGVzIHR3aWNlLCBzbyBhIGRvdWJsZSBxdW90ZSBcIiBiZWNvbWVzIDJ4IGRvdWJsZSBxdW90ZXMgXCJcIlxuICAgICAgICBpdGVtRGF0YSA9IGl0ZW1EYXRhLnRvU3RyaW5nKCkucmVwbGFjZSgvXCIvZ2ksIGBcIlwiYCk7XG4gICAgICB9XG4gICAgICBvdXRwdXRTdHJpbmdzLnB1c2goZXhwb3J0UXVvdGVXcmFwcGVyICsgaXRlbURhdGEgKyBleHBvcnRRdW90ZVdyYXBwZXIpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG91dHB1dFN0cmluZ3Muam9pbihkZWxpbWl0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJzIGRvd25sb2FkIGZpbGUgd2l0aCBmaWxlIGZvcm1hdC5cbiAgICogSUUoNi0xMCkgYXJlIG5vdCBzdXBwb3J0ZWRcbiAgICogQWxsIG90aGVyIGJyb3dzZXJzIHdpbGwgdXNlIHBsYWluIGphdmFzY3JpcHQgb24gY2xpZW50IHNpZGUgdG8gcHJvZHVjZSBhIGZpbGUgZG93bmxvYWQuXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBzdGFydERvd25sb2FkRmlsZShvcHRpb25zOiB7IGZpbGVuYW1lOiBzdHJpbmcsIGNzdkNvbnRlbnQ6IGFueSwgZm9ybWF0OiBGaWxlVHlwZSB8IHN0cmluZywgdXNlVXRmOFdpdGhCb206IGJvb2xlYW4gfSk6IHZvaWQge1xuICAgIC8vIElFKDYtMTApIGRvbid0IHN1cHBvcnQgamF2YXNjcmlwdCBkb3dubG9hZCBhbmQgb3VyIHNlcnZpY2UgZG9lc24ndCBzdXBwb3J0IGVpdGhlciBzbyB0aHJvdyBhbiBlcnJvciwgd2UgaGF2ZSB0byBtYWtlIGEgcm91bmQgdHJpcCB0byB0aGUgV2ViIFNlcnZlciBmb3IgZXhwb3J0aW5nXG4gICAgaWYgKG5hdmlnYXRvci5hcHBOYW1lID09PSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXIgNiB0byAxMCBkbyBub3Qgc3VwcG9ydCBqYXZhc2NyaXB0IGV4cG9ydCB0byBDU1YuIFBsZWFzZSB1cGdyYWRlIHlvdXIgYnJvd3Nlci4nKTtcbiAgICB9XG5cbiAgICAvLyBzZXQgdGhlIGNvcnJlY3QgTUlNRSB0eXBlXG4gICAgY29uc3QgbWltZVR5cGUgPSAob3B0aW9ucy5mb3JtYXQgPT09IEZpbGVUeXBlLmNzdikgPyAndGV4dC9jc3YnIDogJ3RleHQvcGxhaW4nO1xuXG4gICAgLy8gbWFrZSBzdXJlIG5vIGh0bWwgZW50aXRpZXMgZXhpc3QgaW4gdGhlIGRhdGFcbiAgICBjb25zdCBjc3ZDb250ZW50ID0gaHRtbEVudGl0eURlY29kZShvcHRpb25zLmNzdkNvbnRlbnQpO1xuXG4gICAgLy8gZGVhbGluZyB3aXRoIEV4Y2VsIENTViBleHBvcnQgYW5kIFVURi04IGlzIGEgbGl0dGxlIHRyaWNreS4uIFdlIHdpbGwgdXNlIE9wdGlvbiAjMiB0byBjb3ZlciBvbGRlciBFeGNlbCB2ZXJzaW9uc1xuICAgIC8vIE9wdGlvbiAjMTogd2UgbmVlZCB0byBtYWtlIEV4Y2VsIGtub3dpbmcgdGhhdCBpdCdzIGRlYWxpbmcgd2l0aCBhbiBVVEYtOCwgQSBjb3JyZWN0bHkgZm9ybWF0dGVkIFVURjggZmlsZSBjYW4gaGF2ZSBhIEJ5dGUgT3JkZXIgTWFyayBhcyBpdHMgZmlyc3QgdGhyZWUgb2N0ZXRzXG4gICAgLy8gcmVmZXJlbmNlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE1NTA5Ny9taWNyb3NvZnQtZXhjZWwtbWFuZ2xlcy1kaWFjcml0aWNzLWluLWNzdi1maWxlc1xuICAgIC8vIE9wdGlvbiMyOiB1c2UgYSAzcmQgcGFydHkgZXh0ZW5zaW9uIHRvIGphdmFzY3JpcHQgZW5jb2RlIGludG8gVVRGLTE2XG4gICAgbGV0IG91dHB1dERhdGE6IFVpbnQ4QXJyYXkgfCBzdHJpbmc7XG4gICAgaWYgKG9wdGlvbnMuZm9ybWF0ID09PSBGaWxlVHlwZS5jc3YpIHtcbiAgICAgIG91dHB1dERhdGEgPSBuZXcgVGV4dEVuY29kZXIoJ3V0Zi04JykuZW5jb2RlKGNzdkNvbnRlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXREYXRhID0gY3N2Q29udGVudDtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgYSBCbG9iIG9iamVjdCBmb3IgdGhlIGRvd25sb2FkXG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtvcHRpb25zLnVzZVV0ZjhXaXRoQm9tID8gJ1xcdUZFRkYnIDogJycsIG91dHB1dERhdGFdLCB7XG4gICAgICB0eXBlOiBgJHttaW1lVHlwZX07Y2hhcnNldD11dGYtODtgXG4gICAgfSk7XG5cbiAgICAvLyB3aGVuIHVzaW5nIElFL0VkZ2UsIHRoZW4gdXNlIGRpZmZlcmVudCBkb3dubG9hZCBjYWxsXG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IoYmxvYiwgb3B0aW9ucy5maWxlbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRoaXMgdHJpY2sgd2lsbCBnZW5lcmF0ZSBhIHRlbXAgPGEgLz4gdGFnXG4gICAgICAvLyB0aGUgY29kZSB3aWxsIHRoZW4gdHJpZ2dlciBhIGhpZGRlbiBjbGljayBmb3IgaXQgdG8gc3RhcnQgZG93bmxvYWRpbmdcbiAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBjb25zdCBjc3ZVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG4gICAgICBsaW5rLnRleHRDb250ZW50ID0gJ2Rvd25sb2FkJztcbiAgICAgIGxpbmsuaHJlZiA9IGNzdlVybDtcbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIG9wdGlvbnMuZmlsZW5hbWUpO1xuXG4gICAgICAvLyBzZXQgdGhlIHZpc2liaWxpdHkgdG8gaGlkZGVuIHNvIHRoZXJlIGlzIG5vIGVmZmVjdCBvbiB5b3VyIHdlYi1sYXlvdXRcbiAgICAgIGxpbmsuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuXG4gICAgICAvLyB0aGlzIHBhcnQgd2lsbCBhcHBlbmQgdGhlIGFuY2hvciB0YWcsIHRyaWdnZXIgYSBjbGljayAoZm9yIGRvd25sb2FkIHRvIHN0YXJ0KSBhbmQgZmluYWxseSByZW1vdmUgdGhlIHRhZyBvbmNlIGNvbXBsZXRlZFxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgIGxpbmsuY2xpY2soKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgfVxuICB9XG59XG4iXX0=