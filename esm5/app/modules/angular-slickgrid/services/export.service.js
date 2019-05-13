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
var ExportService = /** @class */ (function () {
    function ExportService(translate) {
        this.translate = translate;
        this._lineCarriageReturn = '\n';
        this._hasGroupedItems = false;
        this.onGridBeforeExportToFile = new Subject();
        this.onGridAfterExportToFile = new Subject();
    }
    Object.defineProperty(ExportService.prototype, "datasetIdName", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this._gridOptions && this._gridOptions.datasetIdPropertyName || 'id';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportService.prototype, "_gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: /**
         * Getter for the Grid Options pulled through the Grid Object
         * @private
         * @return {?}
         */
        function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize the Export Service
     * @param grid
     * @param gridOptions
     * @param dataView
     */
    /**
     * Initialize the Export Service
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    ExportService.prototype.init = /**
     * Initialize the Export Service
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    function (grid, dataView) {
        this._grid = grid;
        this._dataView = dataView;
    };
    /**
     * Function to export the Grid result to an Excel CSV format using javascript for it to produce the CSV file.
     * This is a WYSIWYG export to file output (What You See is What You Get)
     *
     * NOTES: The column position needs to match perfectly the JSON Object position because of the way we are pulling the data,
     * which means that if any column(s) got moved in the UI, it has to be reflected in the JSON array output as well
     *
     * Example: exportToFile({ format: FileType.csv, delimiter: DelimiterType.comma })
     */
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
    ExportService.prototype.exportToFile = /**
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
    function (options) {
        var _this = this;
        this.onGridBeforeExportToFile.next(true);
        this._exportOptions = $.extend(true, {}, this._gridOptions.exportOptions, options);
        // get the CSV output from the grid data
        /** @type {?} */
        var dataOutput = this.getDataOutput();
        // trigger a download file
        // wrap it into a setTimeout so that the EventAggregator has enough time to start a pre-process like showing a spinner
        setTimeout((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var downloadOptions = {
                filename: _this._exportOptions.filename + "." + _this._exportOptions.format,
                csvContent: dataOutput,
                format: _this._exportOptions.format,
                useUtf8WithBom: _this._exportOptions.useUtf8WithBom
            };
            _this.startDownloadFile(downloadOptions);
            _this.onGridAfterExportToFile.next({ options: downloadOptions });
        }), 0);
    };
    // -----------------------
    // Private functions
    // -----------------------
    // -----------------------
    // Private functions
    // -----------------------
    /**
     * @return {?}
     */
    ExportService.prototype.getDataOutput = 
    // -----------------------
    // Private functions
    // -----------------------
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var columns = this._grid.getColumns() || [];
        /** @type {?} */
        var delimiter = this._exportOptions.delimiter || '';
        /** @type {?} */
        var format = this._exportOptions.format || '';
        /** @type {?} */
        var groupByColumnHeader = this._exportOptions.groupingColumnHeaderTitle || this.translate.instant('GROUP_BY');
        // a CSV needs double quotes wrapper, the other types do not need any wrapper
        this._exportQuoteWrapper = (format === FileType.csv) ? '"' : '';
        // data variable which will hold all the fields data of a row
        /** @type {?} */
        var outputDataString = '';
        // get grouped column titles and if found, we will add a "Group by" column at the first column index
        /** @type {?} */
        var grouping = this._dataView.getGrouping();
        if (grouping && Array.isArray(grouping) && grouping.length > 0) {
            this._hasGroupedItems = true;
            outputDataString += "" + groupByColumnHeader + delimiter;
        }
        else {
            this._hasGroupedItems = false;
        }
        // get all column headers
        this._columnHeaders = this.getColumnHeaders(columns) || [];
        if (this._columnHeaders && Array.isArray(this._columnHeaders) && this._columnHeaders.length > 0) {
            // add the header row + add a new line at the end of the row
            /** @type {?} */
            var outputHeaderTitles = this._columnHeaders.map((/**
             * @param {?} header
             * @return {?}
             */
            function (header) {
                return _this._exportQuoteWrapper + header.title + _this._exportQuoteWrapper;
            }));
            outputDataString += (outputHeaderTitles.join(delimiter) + this._lineCarriageReturn);
        }
        // Populate the rest of the Grid Data
        outputDataString += this.getAllGridRowData(columns, this._lineCarriageReturn);
        return outputDataString;
    };
    /**
     * Get all the grid row data and return that as an output string
     */
    /**
     * Get all the grid row data and return that as an output string
     * @param {?} columns
     * @param {?} lineCarriageReturn
     * @return {?}
     */
    ExportService.prototype.getAllGridRowData = /**
     * Get all the grid row data and return that as an output string
     * @param {?} columns
     * @param {?} lineCarriageReturn
     * @return {?}
     */
    function (columns, lineCarriageReturn) {
        /** @type {?} */
        var outputDataStrings = [];
        /** @type {?} */
        var lineCount = this._dataView.getLength();
        // loop through all the grid rows of data
        for (var rowNumber = 0; rowNumber < lineCount; rowNumber++) {
            /** @type {?} */
            var itemObj = this._dataView.getItem(rowNumber);
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
    };
    /**
     * Get all header titles and their keys, translate the title when required.
     * @param columns of the grid
     */
    /**
     * Get all header titles and their keys, translate the title when required.
     * @param {?} columns of the grid
     * @return {?}
     */
    ExportService.prototype.getColumnHeaders = /**
     * Get all header titles and their keys, translate the title when required.
     * @param {?} columns of the grid
     * @return {?}
     */
    function (columns) {
        var _this = this;
        if (!columns || !Array.isArray(columns) || columns.length === 0) {
            return null;
        }
        /** @type {?} */
        var columnHeaders = [];
        // Populate the Column Header, pull the name defined
        columns.forEach((/**
         * @param {?} columnDef
         * @return {?}
         */
        function (columnDef) {
            /** @type {?} */
            var fieldName = (columnDef.headerKey) ? _this.translate.instant(columnDef.headerKey) : columnDef.name;
            /** @type {?} */
            var skippedField = columnDef.excludeFromExport || false;
            // if column width is 0 then it's not evaluated since that field is considered hidden should not be part of the export
            if ((columnDef.width === undefined || columnDef.width > 0) && !skippedField) {
                columnHeaders.push({
                    key: columnDef.field || columnDef.id,
                    title: fieldName
                });
            }
        }));
        return columnHeaders;
    };
    /**
     * Get the data of a regular row (a row without grouping)
     * @param row
     * @param itemObj
     */
    /**
     * Get the data of a regular row (a row without grouping)
     * @param {?} columns
     * @param {?} row
     * @param {?} itemObj
     * @return {?}
     */
    ExportService.prototype.readRegularRowData = /**
     * Get the data of a regular row (a row without grouping)
     * @param {?} columns
     * @param {?} row
     * @param {?} itemObj
     * @return {?}
     */
    function (columns, row, itemObj) {
        /** @type {?} */
        var idx = 0;
        /** @type {?} */
        var rowOutputStrings = [];
        /** @type {?} */
        var delimiter = this._exportOptions.delimiter;
        /** @type {?} */
        var format = this._exportOptions.format;
        /** @type {?} */
        var exportQuoteWrapper = this._exportQuoteWrapper || '';
        for (var col = 0, ln = columns.length; col < ln; col++) {
            /** @type {?} */
            var columnDef = columns[col];
            /** @type {?} */
            var fieldId = columnDef.field || columnDef.id || '';
            // skip excluded column
            if (columnDef.excludeFromExport) {
                continue;
            }
            // if we are grouping and are on 1st column index, we need to skip this column since it will be used later by the grouping text:: Group by [columnX]
            if (this._hasGroupedItems && idx === 0) {
                rowOutputStrings.push("\"\"");
            }
            // does the user want to evaluate current column Formatter?
            /** @type {?} */
            var isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : this._exportOptions.exportWithFormatter;
            // did the user provide a Custom Formatter for the export
            /** @type {?} */
            var exportCustomFormatter = (columnDef.exportCustomFormatter !== undefined) ? columnDef.exportCustomFormatter : undefined;
            /** @type {?} */
            var itemData = '';
            if (itemObj && itemObj[fieldId] && exportCustomFormatter !== undefined && exportCustomFormatter !== null) {
                /** @type {?} */
                var formattedData = exportCustomFormatter(row, col, itemObj[fieldId], columnDef, itemObj, this._grid);
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
                var formattedData = columnDef.formatter(row, col, itemObj[fieldId], columnDef, itemObj, this._grid);
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
                itemData = itemData.toString().replace(/"/gi, "\"\"");
            }
            // do we have a wrapper to keep as a string? in certain cases like "1E06", we don't want excel to transform it into exponential (1.0E06)
            // to cancel that effect we can had = in front, ex: ="1E06"
            /** @type {?} */
            var keepAsStringWrapper = (columnDef && columnDef.exportCsvForceToKeepAsString) ? '=' : '';
            rowOutputStrings.push(keepAsStringWrapper + exportQuoteWrapper + itemData + exportQuoteWrapper);
            idx++;
        }
        return rowOutputStrings.join(delimiter);
    };
    /**
     * Get the grouped title(s), for example if we grouped by salesRep, the returned result would be:: 'Sales Rep'
     * @param itemObj
     */
    /**
     * Get the grouped title(s), for example if we grouped by salesRep, the returned result would be:: 'Sales Rep'
     * @param {?} itemObj
     * @return {?}
     */
    ExportService.prototype.readGroupedTitleRow = /**
     * Get the grouped title(s), for example if we grouped by salesRep, the returned result would be:: 'Sales Rep'
     * @param {?} itemObj
     * @return {?}
     */
    function (itemObj) {
        /** @type {?} */
        var groupName = sanitizeHtmlToText(itemObj.title);
        /** @type {?} */
        var exportQuoteWrapper = this._exportQuoteWrapper || '';
        /** @type {?} */
        var format = this._exportOptions.format;
        groupName = addWhiteSpaces(5 * itemObj.level) + groupName;
        if (format === FileType.csv) {
            // when CSV we also need to escape double quotes twice, so " becomes ""
            groupName = groupName.toString().replace(/"/gi, "\"\"");
        }
        return exportQuoteWrapper + ' ' + groupName + exportQuoteWrapper;
    };
    /**
     * Get the grouped totals, these are set by Slick Aggregators.
     * For example if we grouped by "salesRep" and we have a Sum Aggregator on "sales", then the returned output would be:: ["Sum 123$"]
     * @param itemObj
     */
    /**
     * Get the grouped totals, these are set by Slick Aggregators.
     * For example if we grouped by "salesRep" and we have a Sum Aggregator on "sales", then the returned output would be:: ["Sum 123$"]
     * @param {?} columns
     * @param {?} itemObj
     * @return {?}
     */
    ExportService.prototype.readGroupedTotalRow = /**
     * Get the grouped totals, these are set by Slick Aggregators.
     * For example if we grouped by "salesRep" and we have a Sum Aggregator on "sales", then the returned output would be:: ["Sum 123$"]
     * @param {?} columns
     * @param {?} itemObj
     * @return {?}
     */
    function (columns, itemObj) {
        var _this = this;
        /** @type {?} */
        var delimiter = this._exportOptions.delimiter;
        /** @type {?} */
        var format = this._exportOptions.format;
        /** @type {?} */
        var groupingAggregatorRowText = this._exportOptions.groupingAggregatorRowText || '';
        /** @type {?} */
        var exportQuoteWrapper = this._exportQuoteWrapper || '';
        /** @type {?} */
        var outputStrings = ["" + exportQuoteWrapper + groupingAggregatorRowText + exportQuoteWrapper];
        columns.forEach((/**
         * @param {?} columnDef
         * @return {?}
         */
        function (columnDef) {
            /** @type {?} */
            var itemData = '';
            // if there's a groupTotalsFormatter, we will re-run it to get the exact same output as what is shown in UI
            if (columnDef.groupTotalsFormatter) {
                itemData = columnDef.groupTotalsFormatter(itemObj, columnDef);
            }
            // does the user want to sanitize the output data (remove HTML tags)?
            if (columnDef.sanitizeDataExport || _this._exportOptions.sanitizeDataExport) {
                itemData = sanitizeHtmlToText(itemData);
            }
            if (format === FileType.csv) {
                // when CSV we also need to escape double quotes twice, so a double quote " becomes 2x double quotes ""
                itemData = itemData.toString().replace(/"/gi, "\"\"");
            }
            outputStrings.push(exportQuoteWrapper + itemData + exportQuoteWrapper);
        }));
        return outputStrings.join(delimiter);
    };
    /**
     * Triggers download file with file format.
     * IE(6-10) are not supported
     * All other browsers will use plain javascript on client side to produce a file download.
     * @param options
     */
    /**
     * Triggers download file with file format.
     * IE(6-10) are not supported
     * All other browsers will use plain javascript on client side to produce a file download.
     * @param {?} options
     * @return {?}
     */
    ExportService.prototype.startDownloadFile = /**
     * Triggers download file with file format.
     * IE(6-10) are not supported
     * All other browsers will use plain javascript on client side to produce a file download.
     * @param {?} options
     * @return {?}
     */
    function (options) {
        // IE(6-10) don't support javascript download and our service doesn't support either so throw an error, we have to make a round trip to the Web Server for exporting
        if (navigator.appName === 'Microsoft Internet Explorer') {
            throw new Error('Microsoft Internet Explorer 6 to 10 do not support javascript export to CSV. Please upgrade your browser.');
        }
        // set the correct MIME type
        /** @type {?} */
        var mimeType = (options.format === FileType.csv) ? 'text/csv' : 'text/plain';
        // make sure no html entities exist in the data
        /** @type {?} */
        var csvContent = htmlEntityDecode(options.csvContent);
        // dealing with Excel CSV export and UTF-8 is a little tricky.. We will use Option #2 to cover older Excel versions
        // Option #1: we need to make Excel knowing that it's dealing with an UTF-8, A correctly formatted UTF8 file can have a Byte Order Mark as its first three octets
        // reference: http://stackoverflow.com/questions/155097/microsoft-excel-mangles-diacritics-in-csv-files
        // Option#2: use a 3rd party extension to javascript encode into UTF-16
        /** @type {?} */
        var outputData;
        if (options.format === FileType.csv) {
            outputData = new TextEncoder('utf-8').encode(csvContent);
        }
        else {
            outputData = csvContent;
        }
        // create a Blob object for the download
        /** @type {?} */
        var blob = new Blob([options.useUtf8WithBom ? '\uFEFF' : '', outputData], {
            type: mimeType + ";charset=utf-8;"
        });
        // when using IE/Edge, then use different download call
        if (typeof navigator.msSaveOrOpenBlob === 'function') {
            navigator.msSaveOrOpenBlob(blob, options.filename);
        }
        else {
            // this trick will generate a temp <a /> tag
            // the code will then trigger a hidden click for it to start downloading
            /** @type {?} */
            var link = document.createElement('a');
            /** @type {?} */
            var csvUrl = URL.createObjectURL(blob);
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
    };
    ExportService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ExportService.ctorParameters = function () { return [
        { type: TranslateService }
    ]; };
    return ExportService;
}());
export { ExportService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2V4cG9ydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFHTCxRQUFRLEVBR1QsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0YsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFLbEQsd0NBR0M7OztJQUZDLGlDQUFZOztJQUNaLG1DQUFjOztBQUdoQjtJQWFFLHVCQUFvQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQVh2Qyx3QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFNM0IscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBRWpDLDZCQUF3QixHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7UUFDbEQsNEJBQXVCLEdBQUcsSUFBSSxPQUFPLEVBQW9CLENBQUM7SUFFUCxDQUFDO0lBRXBELHNCQUFZLHdDQUFhOzs7OztRQUF6QjtZQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixJQUFJLElBQUksQ0FBQztRQUM5RSxDQUFDOzs7T0FBQTtJQUdELHNCQUFZLHVDQUFZO1FBRHhCLGlFQUFpRTs7Ozs7O1FBQ2pFO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzlFLENBQUM7OztPQUFBO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7SUFDSCw0QkFBSTs7Ozs7O0lBQUosVUFBSyxJQUFTLEVBQUUsUUFBYTtRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7Ozs7Ozs7Ozs7OztJQUNILG9DQUFZOzs7Ozs7Ozs7OztJQUFaLFVBQWEsT0FBcUI7UUFBbEMsaUJBbUJDO1FBbEJDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7OztZQUc3RSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRTtRQUV2QywwQkFBMEI7UUFDMUIsc0hBQXNIO1FBQ3RILFVBQVU7OztRQUFDOztnQkFDSCxlQUFlLEdBQUc7Z0JBQ3RCLFFBQVEsRUFBSyxLQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsU0FBSSxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQVE7Z0JBQ3pFLFVBQVUsRUFBRSxVQUFVO2dCQUN0QixNQUFNLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNO2dCQUNsQyxjQUFjLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjO2FBQ25EO1lBQ0QsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3hDLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztRQUNsRSxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQsMEJBQTBCO0lBQzFCLG9CQUFvQjtJQUNwQiwwQkFBMEI7Ozs7Ozs7SUFFMUIscUNBQWE7Ozs7Ozs7SUFBYjtRQUFBLGlCQW1DQzs7WUFsQ08sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRTs7WUFDdkMsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxJQUFJLEVBQUU7O1lBQy9DLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sSUFBSSxFQUFFOztZQUN6QyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLHlCQUF5QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUUvRyw2RUFBNkU7UUFDN0UsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7OztZQUc1RCxnQkFBZ0IsR0FBRyxFQUFFOzs7WUFHbkIsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFO1FBQzdDLElBQUksUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDOUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztZQUM3QixnQkFBZ0IsSUFBSSxLQUFHLG1CQUFxQixHQUFHLFNBQVMsQ0FBQztTQUMxRDthQUFNO1lBQ0wsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztTQUMvQjtRQUVELHlCQUF5QjtRQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0QsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7O2dCQUV6RixrQkFBa0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUc7Ozs7WUFBQyxVQUFDLE1BQU07Z0JBQ3hELE9BQU8sS0FBSSxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLG1CQUFtQixDQUFDO1lBQzVFLENBQUMsRUFBQztZQUNGLGdCQUFnQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3JGO1FBRUQscUNBQXFDO1FBQ3JDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFOUUsT0FBTyxnQkFBZ0IsQ0FBQztJQUMxQixDQUFDO0lBRUQ7O09BRUc7Ozs7Ozs7SUFDSCx5Q0FBaUI7Ozs7OztJQUFqQixVQUFrQixPQUFpQixFQUFFLGtCQUEwQjs7WUFDdkQsaUJBQWlCLEdBQUcsRUFBRTs7WUFDdEIsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO1FBRTVDLHlDQUF5QztRQUN6QyxLQUFLLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRSxTQUFTLEdBQUcsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFOztnQkFDcEQsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUVqRCxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7Z0JBQ25CLDRHQUE0RztnQkFDNUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksRUFBRTtvQkFDdkMsNEJBQTRCO29CQUM1QixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztpQkFDOUU7cUJBQU0sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksT0FBTyxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQUU7b0JBQ3ZFLG9CQUFvQjtvQkFDcEIsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2lCQUMzRDtxQkFBTSxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUU7b0JBQ2hDLDBIQUEwSDtvQkFDMUgsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztpQkFDcEU7YUFDRjtTQUNGO1FBRUQsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsd0NBQWdCOzs7OztJQUFoQixVQUFpQixPQUFpQjtRQUFsQyxpQkFxQkM7UUFwQkMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDL0QsT0FBTyxJQUFJLENBQUM7U0FDYjs7WUFDSyxhQUFhLEdBQUcsRUFBRTtRQUV4QixvREFBb0Q7UUFDcEQsT0FBTyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLFNBQVM7O2dCQUNsQixTQUFTLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUk7O2dCQUNoRyxZQUFZLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixJQUFJLEtBQUs7WUFFekQsc0hBQXNIO1lBQ3RILElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFNLFNBQVMsSUFBSSxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUM1RSxhQUFhLENBQUMsSUFBSSxDQUFDO29CQUNqQixHQUFHLEVBQUUsU0FBUyxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsRUFBRTtvQkFDcEMsS0FBSyxFQUFFLFNBQVM7aUJBQ2pCLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFFSCxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7SUFDSCwwQ0FBa0I7Ozs7Ozs7SUFBbEIsVUFBbUIsT0FBaUIsRUFBRSxHQUFXLEVBQUUsT0FBWTs7WUFDekQsR0FBRyxHQUFHLENBQUM7O1lBQ0wsZ0JBQWdCLEdBQUcsRUFBRTs7WUFDckIsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUzs7WUFDekMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTTs7WUFDbkMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixJQUFJLEVBQUU7UUFFekQsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs7Z0JBQ2hELFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDOztnQkFDeEIsT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFO1lBRXJELHVCQUF1QjtZQUN2QixJQUFJLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRTtnQkFDN0IsU0FBUzthQUNaO1lBRUQsb0pBQW9KO1lBQ3BKLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7Z0JBQ3RDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFJLENBQUMsQ0FBQzthQUM3Qjs7O2dCQUdLLHFCQUFxQixHQUFHLENBQUMsU0FBUyxDQUFDLG1CQUFtQixLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1COzs7Z0JBRy9JLHFCQUFxQixHQUEwQixDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxTQUFTOztnQkFFOUksUUFBUSxHQUFHLEVBQUU7WUFFakIsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLHFCQUFxQixLQUFLLFNBQVMsSUFBSSxxQkFBcUIsS0FBSyxJQUFJLEVBQUU7O29CQUNsRyxhQUFhLEdBQUcscUJBQXFCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUN2RyxRQUFRLEdBQUcsbUJBQUEsYUFBYSxFQUFVLENBQUM7Z0JBQ25DLElBQUksYUFBYSxJQUFJLE9BQU8sYUFBYSxLQUFLLFFBQVEsSUFBSSxhQUFhLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUM5RixRQUFRLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztpQkFDL0I7Z0JBQ0QsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO29CQUNyQixRQUFRLEdBQUcsRUFBRSxDQUFDO2lCQUNmO2FBQ0Y7aUJBQU0sSUFBSSxxQkFBcUIsSUFBSSxTQUFTLENBQUMsU0FBUyxLQUFLLFNBQVMsSUFBSSxTQUFTLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTs7b0JBQy9GLGFBQWEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDckcsUUFBUSxHQUFHLG1CQUFBLGFBQWEsRUFBVSxDQUFDO2dCQUNuQyxJQUFJLGFBQWEsSUFBSSxPQUFPLGFBQWEsS0FBSyxRQUFRLElBQUksYUFBYSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDOUYsUUFBUSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUM7aUJBQy9CO2dCQUNELElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtvQkFDckIsUUFBUSxHQUFHLEVBQUUsQ0FBQztpQkFDZjthQUNGO2lCQUFNO2dCQUNMLFFBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDakcsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO29CQUNyQixRQUFRLEdBQUcsRUFBRSxDQUFDO2lCQUNmO2FBQ0Y7WUFFRCxxRUFBcUU7WUFDckUsSUFBSSxTQUFTLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRTtnQkFDMUUsUUFBUSxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3pDO1lBRUQsdUVBQXVFO1lBQ3ZFLElBQUksTUFBTSxLQUFLLFFBQVEsQ0FBQyxHQUFHLElBQUksUUFBUSxFQUFFO2dCQUN2QyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBSSxDQUFDLENBQUM7YUFDckQ7Ozs7Z0JBSUssbUJBQW1CLEdBQUcsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUU1RixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsa0JBQWtCLEdBQUcsUUFBUSxHQUFHLGtCQUFrQixDQUFDLENBQUM7WUFDaEcsR0FBRyxFQUFFLENBQUM7U0FDUDtRQUVELE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILDJDQUFtQjs7Ozs7SUFBbkIsVUFBb0IsT0FBWTs7WUFDMUIsU0FBUyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7O1lBQzNDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxFQUFFOztZQUNuRCxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNO1FBRXpDLFNBQVMsR0FBRyxjQUFjLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUM7UUFFMUQsSUFBSSxNQUFNLEtBQUssUUFBUSxDQUFDLEdBQUcsRUFBRTtZQUMzQix1RUFBdUU7WUFDdkUsU0FBUyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQUksQ0FBQyxDQUFDO1NBQ3ZEO1FBQ0QsT0FBTyxrQkFBa0IsR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLGtCQUFrQixDQUFDO0lBQ25FLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7OztJQUNILDJDQUFtQjs7Ozs7OztJQUFuQixVQUFvQixPQUFpQixFQUFFLE9BQVk7UUFBbkQsaUJBNEJDOztZQTNCTyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTOztZQUN6QyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNOztZQUNuQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLHlCQUF5QixJQUFJLEVBQUU7O1lBQy9FLGtCQUFrQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxFQUFFOztZQUNuRCxhQUFhLEdBQUcsQ0FBQyxLQUFHLGtCQUFrQixHQUFHLHlCQUF5QixHQUFHLGtCQUFvQixDQUFDO1FBRWhHLE9BQU8sQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxTQUFTOztnQkFDcEIsUUFBUSxHQUFHLEVBQUU7WUFFakIsMkdBQTJHO1lBQzNHLElBQUksU0FBUyxDQUFDLG9CQUFvQixFQUFFO2dCQUNsQyxRQUFRLEdBQUcsU0FBUyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQzthQUMvRDtZQUVELHFFQUFxRTtZQUNyRSxJQUFJLFNBQVMsQ0FBQyxrQkFBa0IsSUFBSSxLQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFO2dCQUMxRSxRQUFRLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDekM7WUFFRCxJQUFJLE1BQU0sS0FBSyxRQUFRLENBQUMsR0FBRyxFQUFFO2dCQUMzQix1R0FBdUc7Z0JBQ3ZHLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFJLENBQUMsQ0FBQzthQUNyRDtZQUNELGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxHQUFHLGtCQUFrQixDQUFDLENBQUM7UUFDekUsQ0FBQyxFQUFDLENBQUM7UUFFSCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7OztJQUNILHlDQUFpQjs7Ozs7OztJQUFqQixVQUFrQixPQUFrRztRQUNsSCxvS0FBb0s7UUFDcEssSUFBSSxTQUFTLENBQUMsT0FBTyxLQUFLLDZCQUE2QixFQUFFO1lBQ3ZELE1BQU0sSUFBSSxLQUFLLENBQUMsMkdBQTJHLENBQUMsQ0FBQztTQUM5SDs7O1lBR0ssUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsWUFBWTs7O1lBR3hFLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDOzs7Ozs7WUFNbkQsVUFBK0I7UUFDbkMsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxHQUFHLEVBQUU7WUFDbkMsVUFBVSxHQUFHLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMxRDthQUFNO1lBQ0wsVUFBVSxHQUFHLFVBQVUsQ0FBQztTQUN6Qjs7O1lBR0ssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLEVBQUU7WUFDMUUsSUFBSSxFQUFLLFFBQVEsb0JBQWlCO1NBQ25DLENBQUM7UUFFRix1REFBdUQ7UUFDdkQsSUFBSSxPQUFPLFNBQVMsQ0FBQyxnQkFBZ0IsS0FBSyxVQUFVLEVBQUU7WUFDcEQsU0FBUyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDcEQ7YUFBTTs7OztnQkFHQyxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7O2dCQUNsQyxNQUFNLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7WUFFeEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7WUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRWhELHdFQUF3RTtZQUN4RSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7WUFFakMsMEhBQTBIO1lBQzFILFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQzs7Z0JBOVZGLFVBQVU7Ozs7Z0JBcEJGLGdCQUFnQjs7SUFtWHpCLG9CQUFDO0NBQUEsQUEvVkQsSUErVkM7U0E5VlksYUFBYTs7Ozs7O0lBQ3hCLDRDQUFtQzs7Ozs7SUFDbkMsa0NBQXVCOzs7OztJQUN2Qiw4QkFBbUI7Ozs7O0lBQ25CLDRDQUFvQzs7Ozs7SUFDcEMsdUNBQTZDOzs7OztJQUM3Qyx3Q0FBOEM7Ozs7O0lBQzlDLHlDQUFpQzs7Ozs7SUFDakMsdUNBQXFDOztJQUNyQyxpREFBa0Q7O0lBQ2xELGdEQUEwRDs7Ozs7SUFFOUMsa0NBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29sdW1uLFxuICBFeHBvcnRPcHRpb24sXG4gIEZpbGVUeXBlLFxuICBGb3JtYXR0ZXIsXG4gIEdyaWRPcHRpb25cbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHsgYWRkV2hpdGVTcGFjZXMsIGh0bWxFbnRpdHlEZWNvZGUsIHNhbml0aXplSHRtbFRvVGV4dCB9IGZyb20gJy4vLi4vc2VydmljZXMvdXRpbGl0aWVzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRleHRFbmNvZGVyIH0gZnJvbSAndGV4dC1lbmNvZGluZy11dGYtOCc7XG5cbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcbmRlY2xhcmUgbGV0ICQ6IGFueTtcblxuZXhwb3J0IGludGVyZmFjZSBFeHBvcnRDb2x1bW5IZWFkZXIge1xuICBrZXk6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEV4cG9ydFNlcnZpY2Uge1xuICBwcml2YXRlIF9saW5lQ2FycmlhZ2VSZXR1cm4gPSAnXFxuJztcbiAgcHJpdmF0ZSBfZGF0YVZpZXc6IGFueTtcbiAgcHJpdmF0ZSBfZ3JpZDogYW55O1xuICBwcml2YXRlIF9leHBvcnRRdW90ZVdyYXBwZXI6IHN0cmluZztcbiAgcHJpdmF0ZSBfY29sdW1uSGVhZGVyczogRXhwb3J0Q29sdW1uSGVhZGVyW107XG4gIHByaXZhdGUgX2dyb3VwZWRIZWFkZXJzOiBFeHBvcnRDb2x1bW5IZWFkZXJbXTtcbiAgcHJpdmF0ZSBfaGFzR3JvdXBlZEl0ZW1zID0gZmFsc2U7XG4gIHByaXZhdGUgX2V4cG9ydE9wdGlvbnM6IEV4cG9ydE9wdGlvbjtcbiAgb25HcmlkQmVmb3JlRXhwb3J0VG9GaWxlID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgb25HcmlkQWZ0ZXJFeHBvcnRUb0ZpbGUgPSBuZXcgU3ViamVjdDx7IG9wdGlvbnM6IGFueSB9PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7IH1cblxuICBwcml2YXRlIGdldCBkYXRhc2V0SWROYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmRhdGFzZXRJZFByb3BlcnR5TmFtZSB8fCAnaWQnO1xuICB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cbiAgcHJpdmF0ZSBnZXQgX2dyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBFeHBvcnQgU2VydmljZVxuICAgKiBAcGFyYW0gZ3JpZFxuICAgKiBAcGFyYW0gZ3JpZE9wdGlvbnNcbiAgICogQHBhcmFtIGRhdGFWaWV3XG4gICAqL1xuICBpbml0KGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX2dyaWQgPSBncmlkO1xuICAgIHRoaXMuX2RhdGFWaWV3ID0gZGF0YVZpZXc7XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gZXhwb3J0IHRoZSBHcmlkIHJlc3VsdCB0byBhbiBFeGNlbCBDU1YgZm9ybWF0IHVzaW5nIGphdmFzY3JpcHQgZm9yIGl0IHRvIHByb2R1Y2UgdGhlIENTViBmaWxlLlxuICAgKiBUaGlzIGlzIGEgV1lTSVdZRyBleHBvcnQgdG8gZmlsZSBvdXRwdXQgKFdoYXQgWW91IFNlZSBpcyBXaGF0IFlvdSBHZXQpXG4gICAqXG4gICAqIE5PVEVTOiBUaGUgY29sdW1uIHBvc2l0aW9uIG5lZWRzIHRvIG1hdGNoIHBlcmZlY3RseSB0aGUgSlNPTiBPYmplY3QgcG9zaXRpb24gYmVjYXVzZSBvZiB0aGUgd2F5IHdlIGFyZSBwdWxsaW5nIHRoZSBkYXRhLFxuICAgKiB3aGljaCBtZWFucyB0aGF0IGlmIGFueSBjb2x1bW4ocykgZ290IG1vdmVkIGluIHRoZSBVSSwgaXQgaGFzIHRvIGJlIHJlZmxlY3RlZCBpbiB0aGUgSlNPTiBhcnJheSBvdXRwdXQgYXMgd2VsbFxuICAgKlxuICAgKiBFeGFtcGxlOiBleHBvcnRUb0ZpbGUoeyBmb3JtYXQ6IEZpbGVUeXBlLmNzdiwgZGVsaW1pdGVyOiBEZWxpbWl0ZXJUeXBlLmNvbW1hIH0pXG4gICAqL1xuICBleHBvcnRUb0ZpbGUob3B0aW9uczogRXhwb3J0T3B0aW9uKSB7XG4gICAgdGhpcy5vbkdyaWRCZWZvcmVFeHBvcnRUb0ZpbGUubmV4dCh0cnVlKTtcbiAgICB0aGlzLl9leHBvcnRPcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX2dyaWRPcHRpb25zLmV4cG9ydE9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgLy8gZ2V0IHRoZSBDU1Ygb3V0cHV0IGZyb20gdGhlIGdyaWQgZGF0YVxuICAgIGNvbnN0IGRhdGFPdXRwdXQgPSB0aGlzLmdldERhdGFPdXRwdXQoKTtcblxuICAgIC8vIHRyaWdnZXIgYSBkb3dubG9hZCBmaWxlXG4gICAgLy8gd3JhcCBpdCBpbnRvIGEgc2V0VGltZW91dCBzbyB0aGF0IHRoZSBFdmVudEFnZ3JlZ2F0b3IgaGFzIGVub3VnaCB0aW1lIHRvIHN0YXJ0IGEgcHJlLXByb2Nlc3MgbGlrZSBzaG93aW5nIGEgc3Bpbm5lclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgZG93bmxvYWRPcHRpb25zID0ge1xuICAgICAgICBmaWxlbmFtZTogYCR7dGhpcy5fZXhwb3J0T3B0aW9ucy5maWxlbmFtZX0uJHt0aGlzLl9leHBvcnRPcHRpb25zLmZvcm1hdH1gLFxuICAgICAgICBjc3ZDb250ZW50OiBkYXRhT3V0cHV0LFxuICAgICAgICBmb3JtYXQ6IHRoaXMuX2V4cG9ydE9wdGlvbnMuZm9ybWF0LFxuICAgICAgICB1c2VVdGY4V2l0aEJvbTogdGhpcy5fZXhwb3J0T3B0aW9ucy51c2VVdGY4V2l0aEJvbVxuICAgICAgfTtcbiAgICAgIHRoaXMuc3RhcnREb3dubG9hZEZpbGUoZG93bmxvYWRPcHRpb25zKTtcbiAgICAgIHRoaXMub25HcmlkQWZ0ZXJFeHBvcnRUb0ZpbGUubmV4dCh7IG9wdGlvbnM6IGRvd25sb2FkT3B0aW9ucyB9KTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFByaXZhdGUgZnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgZ2V0RGF0YU91dHB1dCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNvbHVtbnMgPSB0aGlzLl9ncmlkLmdldENvbHVtbnMoKSB8fCBbXTtcbiAgICBjb25zdCBkZWxpbWl0ZXIgPSB0aGlzLl9leHBvcnRPcHRpb25zLmRlbGltaXRlciB8fCAnJztcbiAgICBjb25zdCBmb3JtYXQgPSB0aGlzLl9leHBvcnRPcHRpb25zLmZvcm1hdCB8fCAnJztcbiAgICBjb25zdCBncm91cEJ5Q29sdW1uSGVhZGVyID0gdGhpcy5fZXhwb3J0T3B0aW9ucy5ncm91cGluZ0NvbHVtbkhlYWRlclRpdGxlIHx8IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0dST1VQX0JZJyk7XG5cbiAgICAvLyBhIENTViBuZWVkcyBkb3VibGUgcXVvdGVzIHdyYXBwZXIsIHRoZSBvdGhlciB0eXBlcyBkbyBub3QgbmVlZCBhbnkgd3JhcHBlclxuICAgIHRoaXMuX2V4cG9ydFF1b3RlV3JhcHBlciA9IChmb3JtYXQgPT09IEZpbGVUeXBlLmNzdikgPyAnXCInIDogJyc7XG5cbiAgICAvLyBkYXRhIHZhcmlhYmxlIHdoaWNoIHdpbGwgaG9sZCBhbGwgdGhlIGZpZWxkcyBkYXRhIG9mIGEgcm93XG4gICAgbGV0IG91dHB1dERhdGFTdHJpbmcgPSAnJztcblxuICAgIC8vIGdldCBncm91cGVkIGNvbHVtbiB0aXRsZXMgYW5kIGlmIGZvdW5kLCB3ZSB3aWxsIGFkZCBhIFwiR3JvdXAgYnlcIiBjb2x1bW4gYXQgdGhlIGZpcnN0IGNvbHVtbiBpbmRleFxuICAgIGNvbnN0IGdyb3VwaW5nID0gdGhpcy5fZGF0YVZpZXcuZ2V0R3JvdXBpbmcoKTtcbiAgICBpZiAoZ3JvdXBpbmcgJiYgQXJyYXkuaXNBcnJheShncm91cGluZykgJiYgZ3JvdXBpbmcubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5faGFzR3JvdXBlZEl0ZW1zID0gdHJ1ZTtcbiAgICAgIG91dHB1dERhdGFTdHJpbmcgKz0gYCR7Z3JvdXBCeUNvbHVtbkhlYWRlcn1gICsgZGVsaW1pdGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oYXNHcm91cGVkSXRlbXMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBnZXQgYWxsIGNvbHVtbiBoZWFkZXJzXG4gICAgdGhpcy5fY29sdW1uSGVhZGVycyA9IHRoaXMuZ2V0Q29sdW1uSGVhZGVycyhjb2x1bW5zKSB8fCBbXTtcbiAgICBpZiAodGhpcy5fY29sdW1uSGVhZGVycyAmJiBBcnJheS5pc0FycmF5KHRoaXMuX2NvbHVtbkhlYWRlcnMpICYmIHRoaXMuX2NvbHVtbkhlYWRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgLy8gYWRkIHRoZSBoZWFkZXIgcm93ICsgYWRkIGEgbmV3IGxpbmUgYXQgdGhlIGVuZCBvZiB0aGUgcm93XG4gICAgICBjb25zdCBvdXRwdXRIZWFkZXJUaXRsZXMgPSB0aGlzLl9jb2x1bW5IZWFkZXJzLm1hcCgoaGVhZGVyKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leHBvcnRRdW90ZVdyYXBwZXIgKyBoZWFkZXIudGl0bGUgKyB0aGlzLl9leHBvcnRRdW90ZVdyYXBwZXI7XG4gICAgICB9KTtcbiAgICAgIG91dHB1dERhdGFTdHJpbmcgKz0gKG91dHB1dEhlYWRlclRpdGxlcy5qb2luKGRlbGltaXRlcikgKyB0aGlzLl9saW5lQ2FycmlhZ2VSZXR1cm4pO1xuICAgIH1cblxuICAgIC8vIFBvcHVsYXRlIHRoZSByZXN0IG9mIHRoZSBHcmlkIERhdGFcbiAgICBvdXRwdXREYXRhU3RyaW5nICs9IHRoaXMuZ2V0QWxsR3JpZFJvd0RhdGEoY29sdW1ucywgdGhpcy5fbGluZUNhcnJpYWdlUmV0dXJuKTtcblxuICAgIHJldHVybiBvdXRwdXREYXRhU3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgdGhlIGdyaWQgcm93IGRhdGEgYW5kIHJldHVybiB0aGF0IGFzIGFuIG91dHB1dCBzdHJpbmdcbiAgICovXG4gIGdldEFsbEdyaWRSb3dEYXRhKGNvbHVtbnM6IENvbHVtbltdLCBsaW5lQ2FycmlhZ2VSZXR1cm46IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3Qgb3V0cHV0RGF0YVN0cmluZ3MgPSBbXTtcbiAgICBjb25zdCBsaW5lQ291bnQgPSB0aGlzLl9kYXRhVmlldy5nZXRMZW5ndGgoKTtcblxuICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgdGhlIGdyaWQgcm93cyBvZiBkYXRhXG4gICAgZm9yIChsZXQgcm93TnVtYmVyID0gMDsgcm93TnVtYmVyIDwgbGluZUNvdW50OyByb3dOdW1iZXIrKykge1xuICAgICAgY29uc3QgaXRlbU9iaiA9IHRoaXMuX2RhdGFWaWV3LmdldEl0ZW0ocm93TnVtYmVyKTtcblxuICAgICAgaWYgKGl0ZW1PYmogIT0gbnVsbCkge1xuICAgICAgICAvLyBOb3JtYWwgcm93IChub3QgZ3JvdXBlZCBieSBhbnl0aGluZykgd291bGQgaGF2ZSBhbiBJRCB3aGljaCB3YXMgcHJlZGVmaW5lZCBpbiB0aGUgR3JpZCBDb2x1bW5zIGRlZmluaXRpb25cbiAgICAgICAgaWYgKGl0ZW1PYmpbdGhpcy5kYXRhc2V0SWROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgLy8gZ2V0IHJlZ3VsYXIgcm93IGl0ZW0gZGF0YVxuICAgICAgICAgIG91dHB1dERhdGFTdHJpbmdzLnB1c2godGhpcy5yZWFkUmVndWxhclJvd0RhdGEoY29sdW1ucywgcm93TnVtYmVyLCBpdGVtT2JqKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5faGFzR3JvdXBlZEl0ZW1zICYmIGl0ZW1PYmouX19ncm91cFRvdGFscyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gZ2V0IHRoZSBncm91cCByb3dcbiAgICAgICAgICBvdXRwdXREYXRhU3RyaW5ncy5wdXNoKHRoaXMucmVhZEdyb3VwZWRUaXRsZVJvdyhpdGVtT2JqKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbU9iai5fX2dyb3VwVG90YWxzKSB7XG4gICAgICAgICAgLy8gZWxzZSBpZiB0aGUgcm93IGlzIGEgR3JvdXAgQnkgYW5kIHdlIGhhdmUgYWdyZWdnYXRvcnMsIHRoZW4gYSBwcm9wZXJ0eSBvZiAnX19ncm91cFRvdGFscycgd291bGQgZXhpc3QgdW5kZXIgdGhhdCBvYmplY3RcbiAgICAgICAgICBvdXRwdXREYXRhU3RyaW5ncy5wdXNoKHRoaXMucmVhZEdyb3VwZWRUb3RhbFJvdyhjb2x1bW5zLCBpdGVtT2JqKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0RGF0YVN0cmluZ3Muam9pbih0aGlzLl9saW5lQ2FycmlhZ2VSZXR1cm4pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgaGVhZGVyIHRpdGxlcyBhbmQgdGhlaXIga2V5cywgdHJhbnNsYXRlIHRoZSB0aXRsZSB3aGVuIHJlcXVpcmVkLlxuICAgKiBAcGFyYW0gY29sdW1ucyBvZiB0aGUgZ3JpZFxuICAgKi9cbiAgZ2V0Q29sdW1uSGVhZGVycyhjb2x1bW5zOiBDb2x1bW5bXSk6IEV4cG9ydENvbHVtbkhlYWRlcltdIHtcbiAgICBpZiAoIWNvbHVtbnMgfHwgIUFycmF5LmlzQXJyYXkoY29sdW1ucykgfHwgY29sdW1ucy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBjb2x1bW5IZWFkZXJzID0gW107XG5cbiAgICAvLyBQb3B1bGF0ZSB0aGUgQ29sdW1uIEhlYWRlciwgcHVsbCB0aGUgbmFtZSBkZWZpbmVkXG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2x1bW5EZWYpID0+IHtcbiAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IChjb2x1bW5EZWYuaGVhZGVyS2V5KSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoY29sdW1uRGVmLmhlYWRlcktleSkgOiBjb2x1bW5EZWYubmFtZTtcbiAgICAgIGNvbnN0IHNraXBwZWRGaWVsZCA9IGNvbHVtbkRlZi5leGNsdWRlRnJvbUV4cG9ydCB8fCBmYWxzZTtcblxuICAgICAgLy8gaWYgY29sdW1uIHdpZHRoIGlzIDAgdGhlbiBpdCdzIG5vdCBldmFsdWF0ZWQgc2luY2UgdGhhdCBmaWVsZCBpcyBjb25zaWRlcmVkIGhpZGRlbiBzaG91bGQgbm90IGJlIHBhcnQgb2YgdGhlIGV4cG9ydFxuICAgICAgaWYgKChjb2x1bW5EZWYud2lkdGggPT09ICB1bmRlZmluZWQgfHwgY29sdW1uRGVmLndpZHRoID4gMCkgJiYgIXNraXBwZWRGaWVsZCkge1xuICAgICAgICBjb2x1bW5IZWFkZXJzLnB1c2goe1xuICAgICAgICAgIGtleTogY29sdW1uRGVmLmZpZWxkIHx8IGNvbHVtbkRlZi5pZCxcbiAgICAgICAgICB0aXRsZTogZmllbGROYW1lXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvbHVtbkhlYWRlcnM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkYXRhIG9mIGEgcmVndWxhciByb3cgKGEgcm93IHdpdGhvdXQgZ3JvdXBpbmcpXG4gICAqIEBwYXJhbSByb3dcbiAgICogQHBhcmFtIGl0ZW1PYmpcbiAgICovXG4gIHJlYWRSZWd1bGFyUm93RGF0YShjb2x1bW5zOiBDb2x1bW5bXSwgcm93OiBudW1iZXIsIGl0ZW1PYmo6IGFueSkge1xuICAgIGxldCBpZHggPSAwO1xuICAgIGNvbnN0IHJvd091dHB1dFN0cmluZ3MgPSBbXTtcbiAgICBjb25zdCBkZWxpbWl0ZXIgPSB0aGlzLl9leHBvcnRPcHRpb25zLmRlbGltaXRlcjtcbiAgICBjb25zdCBmb3JtYXQgPSB0aGlzLl9leHBvcnRPcHRpb25zLmZvcm1hdDtcbiAgICBjb25zdCBleHBvcnRRdW90ZVdyYXBwZXIgPSB0aGlzLl9leHBvcnRRdW90ZVdyYXBwZXIgfHwgJyc7XG5cbiAgICBmb3IgKGxldCBjb2wgPSAwLCBsbiA9IGNvbHVtbnMubGVuZ3RoOyBjb2wgPCBsbjsgY29sKyspIHtcbiAgICAgIGNvbnN0IGNvbHVtbkRlZiA9IGNvbHVtbnNbY29sXTtcbiAgICAgIGNvbnN0IGZpZWxkSWQgPSBjb2x1bW5EZWYuZmllbGQgfHwgY29sdW1uRGVmLmlkIHx8ICcnO1xuXG4gICAgICAvLyBza2lwIGV4Y2x1ZGVkIGNvbHVtblxuICAgICAgaWYgKGNvbHVtbkRlZi5leGNsdWRlRnJvbUV4cG9ydCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiB3ZSBhcmUgZ3JvdXBpbmcgYW5kIGFyZSBvbiAxc3QgY29sdW1uIGluZGV4LCB3ZSBuZWVkIHRvIHNraXAgdGhpcyBjb2x1bW4gc2luY2UgaXQgd2lsbCBiZSB1c2VkIGxhdGVyIGJ5IHRoZSBncm91cGluZyB0ZXh0OjogR3JvdXAgYnkgW2NvbHVtblhdXG4gICAgICBpZiAodGhpcy5faGFzR3JvdXBlZEl0ZW1zICYmIGlkeCA9PT0gMCkge1xuICAgICAgICByb3dPdXRwdXRTdHJpbmdzLnB1c2goYFwiXCJgKTtcbiAgICAgIH1cblxuICAgICAgLy8gZG9lcyB0aGUgdXNlciB3YW50IHRvIGV2YWx1YXRlIGN1cnJlbnQgY29sdW1uIEZvcm1hdHRlcj9cbiAgICAgIGNvbnN0IGlzRXZhbHVhdGluZ0Zvcm1hdHRlciA9IChjb2x1bW5EZWYuZXhwb3J0V2l0aEZvcm1hdHRlciAhPT0gdW5kZWZpbmVkKSA/IGNvbHVtbkRlZi5leHBvcnRXaXRoRm9ybWF0dGVyIDogdGhpcy5fZXhwb3J0T3B0aW9ucy5leHBvcnRXaXRoRm9ybWF0dGVyO1xuXG4gICAgICAvLyBkaWQgdGhlIHVzZXIgcHJvdmlkZSBhIEN1c3RvbSBGb3JtYXR0ZXIgZm9yIHRoZSBleHBvcnRcbiAgICAgIGNvbnN0IGV4cG9ydEN1c3RvbUZvcm1hdHRlcjogRm9ybWF0dGVyIHwgdW5kZWZpbmVkID0gKGNvbHVtbkRlZi5leHBvcnRDdXN0b21Gb3JtYXR0ZXIgIT09IHVuZGVmaW5lZCkgPyBjb2x1bW5EZWYuZXhwb3J0Q3VzdG9tRm9ybWF0dGVyIDogdW5kZWZpbmVkO1xuXG4gICAgICBsZXQgaXRlbURhdGEgPSAnJztcblxuICAgICAgaWYgKGl0ZW1PYmogJiYgaXRlbU9ialtmaWVsZElkXSAmJiBleHBvcnRDdXN0b21Gb3JtYXR0ZXIgIT09IHVuZGVmaW5lZCAmJiBleHBvcnRDdXN0b21Gb3JtYXR0ZXIgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkRGF0YSA9IGV4cG9ydEN1c3RvbUZvcm1hdHRlcihyb3csIGNvbCwgaXRlbU9ialtmaWVsZElkXSwgY29sdW1uRGVmLCBpdGVtT2JqLCB0aGlzLl9ncmlkKTtcbiAgICAgICAgaXRlbURhdGEgPSBmb3JtYXR0ZWREYXRhIGFzIHN0cmluZztcbiAgICAgICAgaWYgKGZvcm1hdHRlZERhdGEgJiYgdHlwZW9mIGZvcm1hdHRlZERhdGEgPT09ICdvYmplY3QnICYmIGZvcm1hdHRlZERhdGEuaGFzT3duUHJvcGVydHkoJ3RleHQnKSkge1xuICAgICAgICAgIGl0ZW1EYXRhID0gZm9ybWF0dGVkRGF0YS50ZXh0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtRGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgIGl0ZW1EYXRhID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNFdmFsdWF0aW5nRm9ybWF0dGVyICYmIGNvbHVtbkRlZi5mb3JtYXR0ZXIgIT09IHVuZGVmaW5lZCAmJiBjb2x1bW5EZWYuZm9ybWF0dGVyICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZERhdGEgPSBjb2x1bW5EZWYuZm9ybWF0dGVyKHJvdywgY29sLCBpdGVtT2JqW2ZpZWxkSWRdLCBjb2x1bW5EZWYsIGl0ZW1PYmosIHRoaXMuX2dyaWQpO1xuICAgICAgICBpdGVtRGF0YSA9IGZvcm1hdHRlZERhdGEgYXMgc3RyaW5nO1xuICAgICAgICBpZiAoZm9ybWF0dGVkRGF0YSAmJiB0eXBlb2YgZm9ybWF0dGVkRGF0YSA9PT0gJ29iamVjdCcgJiYgZm9ybWF0dGVkRGF0YS5oYXNPd25Qcm9wZXJ0eSgndGV4dCcpKSB7XG4gICAgICAgICAgaXRlbURhdGEgPSBmb3JtYXR0ZWREYXRhLnRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW1EYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgaXRlbURhdGEgPSAnJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbURhdGEgPSAoaXRlbU9ialtmaWVsZElkXSA9PT0gbnVsbCB8fCBpdGVtT2JqW2ZpZWxkSWRdID09PSB1bmRlZmluZWQpID8gJycgOiBpdGVtT2JqW2ZpZWxkSWRdO1xuICAgICAgICBpZiAoaXRlbURhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICBpdGVtRGF0YSA9ICcnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGRvZXMgdGhlIHVzZXIgd2FudCB0byBzYW5pdGl6ZSB0aGUgb3V0cHV0IGRhdGEgKHJlbW92ZSBIVE1MIHRhZ3MpP1xuICAgICAgaWYgKGNvbHVtbkRlZi5zYW5pdGl6ZURhdGFFeHBvcnQgfHwgdGhpcy5fZXhwb3J0T3B0aW9ucy5zYW5pdGl6ZURhdGFFeHBvcnQpIHtcbiAgICAgICAgaXRlbURhdGEgPSBzYW5pdGl6ZUh0bWxUb1RleHQoaXRlbURhdGEpO1xuICAgICAgfVxuXG4gICAgICAvLyB3aGVuIENTViB3ZSBhbHNvIG5lZWQgdG8gZXNjYXBlIGRvdWJsZSBxdW90ZXMgdHdpY2UsIHNvIFwiIGJlY29tZXMgXCJcIlxuICAgICAgaWYgKGZvcm1hdCA9PT0gRmlsZVR5cGUuY3N2ICYmIGl0ZW1EYXRhKSB7XG4gICAgICAgIGl0ZW1EYXRhID0gaXRlbURhdGEudG9TdHJpbmcoKS5yZXBsYWNlKC9cIi9naSwgYFwiXCJgKTtcbiAgICAgIH1cblxuICAgICAgLy8gZG8gd2UgaGF2ZSBhIHdyYXBwZXIgdG8ga2VlcCBhcyBhIHN0cmluZz8gaW4gY2VydGFpbiBjYXNlcyBsaWtlIFwiMUUwNlwiLCB3ZSBkb24ndCB3YW50IGV4Y2VsIHRvIHRyYW5zZm9ybSBpdCBpbnRvIGV4cG9uZW50aWFsICgxLjBFMDYpXG4gICAgICAvLyB0byBjYW5jZWwgdGhhdCBlZmZlY3Qgd2UgY2FuIGhhZCA9IGluIGZyb250LCBleDogPVwiMUUwNlwiXG4gICAgICBjb25zdCBrZWVwQXNTdHJpbmdXcmFwcGVyID0gKGNvbHVtbkRlZiAmJiBjb2x1bW5EZWYuZXhwb3J0Q3N2Rm9yY2VUb0tlZXBBc1N0cmluZykgPyAnPScgOiAnJztcblxuICAgICAgcm93T3V0cHV0U3RyaW5ncy5wdXNoKGtlZXBBc1N0cmluZ1dyYXBwZXIgKyBleHBvcnRRdW90ZVdyYXBwZXIgKyBpdGVtRGF0YSArIGV4cG9ydFF1b3RlV3JhcHBlcik7XG4gICAgICBpZHgrKztcbiAgICB9XG5cbiAgICByZXR1cm4gcm93T3V0cHV0U3RyaW5ncy5qb2luKGRlbGltaXRlcik7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBncm91cGVkIHRpdGxlKHMpLCBmb3IgZXhhbXBsZSBpZiB3ZSBncm91cGVkIGJ5IHNhbGVzUmVwLCB0aGUgcmV0dXJuZWQgcmVzdWx0IHdvdWxkIGJlOjogJ1NhbGVzIFJlcCdcbiAgICogQHBhcmFtIGl0ZW1PYmpcbiAgICovXG4gIHJlYWRHcm91cGVkVGl0bGVSb3coaXRlbU9iajogYW55KSB7XG4gICAgbGV0IGdyb3VwTmFtZSA9IHNhbml0aXplSHRtbFRvVGV4dChpdGVtT2JqLnRpdGxlKTtcbiAgICBjb25zdCBleHBvcnRRdW90ZVdyYXBwZXIgPSB0aGlzLl9leHBvcnRRdW90ZVdyYXBwZXIgfHwgJyc7XG4gICAgY29uc3QgZm9ybWF0ID0gdGhpcy5fZXhwb3J0T3B0aW9ucy5mb3JtYXQ7XG5cbiAgICBncm91cE5hbWUgPSBhZGRXaGl0ZVNwYWNlcyg1ICogaXRlbU9iai5sZXZlbCkgKyBncm91cE5hbWU7XG5cbiAgICBpZiAoZm9ybWF0ID09PSBGaWxlVHlwZS5jc3YpIHtcbiAgICAgIC8vIHdoZW4gQ1NWIHdlIGFsc28gbmVlZCB0byBlc2NhcGUgZG91YmxlIHF1b3RlcyB0d2ljZSwgc28gXCIgYmVjb21lcyBcIlwiXG4gICAgICBncm91cE5hbWUgPSBncm91cE5hbWUudG9TdHJpbmcoKS5yZXBsYWNlKC9cIi9naSwgYFwiXCJgKTtcbiAgICB9XG4gICAgcmV0dXJuIGV4cG9ydFF1b3RlV3JhcHBlciArICcgJyArIGdyb3VwTmFtZSArIGV4cG9ydFF1b3RlV3JhcHBlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGdyb3VwZWQgdG90YWxzLCB0aGVzZSBhcmUgc2V0IGJ5IFNsaWNrIEFnZ3JlZ2F0b3JzLlxuICAgKiBGb3IgZXhhbXBsZSBpZiB3ZSBncm91cGVkIGJ5IFwic2FsZXNSZXBcIiBhbmQgd2UgaGF2ZSBhIFN1bSBBZ2dyZWdhdG9yIG9uIFwic2FsZXNcIiwgdGhlbiB0aGUgcmV0dXJuZWQgb3V0cHV0IHdvdWxkIGJlOjogW1wiU3VtIDEyMyRcIl1cbiAgICogQHBhcmFtIGl0ZW1PYmpcbiAgICovXG4gIHJlYWRHcm91cGVkVG90YWxSb3coY29sdW1uczogQ29sdW1uW10sIGl0ZW1PYmo6IGFueSkge1xuICAgIGNvbnN0IGRlbGltaXRlciA9IHRoaXMuX2V4cG9ydE9wdGlvbnMuZGVsaW1pdGVyO1xuICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMuX2V4cG9ydE9wdGlvbnMuZm9ybWF0O1xuICAgIGNvbnN0IGdyb3VwaW5nQWdncmVnYXRvclJvd1RleHQgPSB0aGlzLl9leHBvcnRPcHRpb25zLmdyb3VwaW5nQWdncmVnYXRvclJvd1RleHQgfHwgJyc7XG4gICAgY29uc3QgZXhwb3J0UXVvdGVXcmFwcGVyID0gdGhpcy5fZXhwb3J0UXVvdGVXcmFwcGVyIHx8ICcnO1xuICAgIGNvbnN0IG91dHB1dFN0cmluZ3MgPSBbYCR7ZXhwb3J0UXVvdGVXcmFwcGVyfSR7Z3JvdXBpbmdBZ2dyZWdhdG9yUm93VGV4dH0ke2V4cG9ydFF1b3RlV3JhcHBlcn1gXTtcblxuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uRGVmKSA9PiB7XG4gICAgICBsZXQgaXRlbURhdGEgPSAnJztcblxuICAgICAgLy8gaWYgdGhlcmUncyBhIGdyb3VwVG90YWxzRm9ybWF0dGVyLCB3ZSB3aWxsIHJlLXJ1biBpdCB0byBnZXQgdGhlIGV4YWN0IHNhbWUgb3V0cHV0IGFzIHdoYXQgaXMgc2hvd24gaW4gVUlcbiAgICAgIGlmIChjb2x1bW5EZWYuZ3JvdXBUb3RhbHNGb3JtYXR0ZXIpIHtcbiAgICAgICAgaXRlbURhdGEgPSBjb2x1bW5EZWYuZ3JvdXBUb3RhbHNGb3JtYXR0ZXIoaXRlbU9iaiwgY29sdW1uRGVmKTtcbiAgICAgIH1cblxuICAgICAgLy8gZG9lcyB0aGUgdXNlciB3YW50IHRvIHNhbml0aXplIHRoZSBvdXRwdXQgZGF0YSAocmVtb3ZlIEhUTUwgdGFncyk/XG4gICAgICBpZiAoY29sdW1uRGVmLnNhbml0aXplRGF0YUV4cG9ydCB8fCB0aGlzLl9leHBvcnRPcHRpb25zLnNhbml0aXplRGF0YUV4cG9ydCkge1xuICAgICAgICBpdGVtRGF0YSA9IHNhbml0aXplSHRtbFRvVGV4dChpdGVtRGF0YSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmb3JtYXQgPT09IEZpbGVUeXBlLmNzdikge1xuICAgICAgICAvLyB3aGVuIENTViB3ZSBhbHNvIG5lZWQgdG8gZXNjYXBlIGRvdWJsZSBxdW90ZXMgdHdpY2UsIHNvIGEgZG91YmxlIHF1b3RlIFwiIGJlY29tZXMgMnggZG91YmxlIHF1b3RlcyBcIlwiXG4gICAgICAgIGl0ZW1EYXRhID0gaXRlbURhdGEudG9TdHJpbmcoKS5yZXBsYWNlKC9cIi9naSwgYFwiXCJgKTtcbiAgICAgIH1cbiAgICAgIG91dHB1dFN0cmluZ3MucHVzaChleHBvcnRRdW90ZVdyYXBwZXIgKyBpdGVtRGF0YSArIGV4cG9ydFF1b3RlV3JhcHBlcik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb3V0cHV0U3RyaW5ncy5qb2luKGRlbGltaXRlcik7XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcnMgZG93bmxvYWQgZmlsZSB3aXRoIGZpbGUgZm9ybWF0LlxuICAgKiBJRSg2LTEwKSBhcmUgbm90IHN1cHBvcnRlZFxuICAgKiBBbGwgb3RoZXIgYnJvd3NlcnMgd2lsbCB1c2UgcGxhaW4gamF2YXNjcmlwdCBvbiBjbGllbnQgc2lkZSB0byBwcm9kdWNlIGEgZmlsZSBkb3dubG9hZC5cbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIHN0YXJ0RG93bmxvYWRGaWxlKG9wdGlvbnM6IHsgZmlsZW5hbWU6IHN0cmluZywgY3N2Q29udGVudDogYW55LCBmb3JtYXQ6IEZpbGVUeXBlIHwgc3RyaW5nLCB1c2VVdGY4V2l0aEJvbTogYm9vbGVhbiB9KTogdm9pZCB7XG4gICAgLy8gSUUoNi0xMCkgZG9uJ3Qgc3VwcG9ydCBqYXZhc2NyaXB0IGRvd25sb2FkIGFuZCBvdXIgc2VydmljZSBkb2Vzbid0IHN1cHBvcnQgZWl0aGVyIHNvIHRocm93IGFuIGVycm9yLCB3ZSBoYXZlIHRvIG1ha2UgYSByb3VuZCB0cmlwIHRvIHRoZSBXZWIgU2VydmVyIGZvciBleHBvcnRpbmdcbiAgICBpZiAobmF2aWdhdG9yLmFwcE5hbWUgPT09ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlciA2IHRvIDEwIGRvIG5vdCBzdXBwb3J0IGphdmFzY3JpcHQgZXhwb3J0IHRvIENTVi4gUGxlYXNlIHVwZ3JhZGUgeW91ciBicm93c2VyLicpO1xuICAgIH1cblxuICAgIC8vIHNldCB0aGUgY29ycmVjdCBNSU1FIHR5cGVcbiAgICBjb25zdCBtaW1lVHlwZSA9IChvcHRpb25zLmZvcm1hdCA9PT0gRmlsZVR5cGUuY3N2KSA/ICd0ZXh0L2NzdicgOiAndGV4dC9wbGFpbic7XG5cbiAgICAvLyBtYWtlIHN1cmUgbm8gaHRtbCBlbnRpdGllcyBleGlzdCBpbiB0aGUgZGF0YVxuICAgIGNvbnN0IGNzdkNvbnRlbnQgPSBodG1sRW50aXR5RGVjb2RlKG9wdGlvbnMuY3N2Q29udGVudCk7XG5cbiAgICAvLyBkZWFsaW5nIHdpdGggRXhjZWwgQ1NWIGV4cG9ydCBhbmQgVVRGLTggaXMgYSBsaXR0bGUgdHJpY2t5Li4gV2Ugd2lsbCB1c2UgT3B0aW9uICMyIHRvIGNvdmVyIG9sZGVyIEV4Y2VsIHZlcnNpb25zXG4gICAgLy8gT3B0aW9uICMxOiB3ZSBuZWVkIHRvIG1ha2UgRXhjZWwga25vd2luZyB0aGF0IGl0J3MgZGVhbGluZyB3aXRoIGFuIFVURi04LCBBIGNvcnJlY3RseSBmb3JtYXR0ZWQgVVRGOCBmaWxlIGNhbiBoYXZlIGEgQnl0ZSBPcmRlciBNYXJrIGFzIGl0cyBmaXJzdCB0aHJlZSBvY3RldHNcbiAgICAvLyByZWZlcmVuY2U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTU1MDk3L21pY3Jvc29mdC1leGNlbC1tYW5nbGVzLWRpYWNyaXRpY3MtaW4tY3N2LWZpbGVzXG4gICAgLy8gT3B0aW9uIzI6IHVzZSBhIDNyZCBwYXJ0eSBleHRlbnNpb24gdG8gamF2YXNjcmlwdCBlbmNvZGUgaW50byBVVEYtMTZcbiAgICBsZXQgb3V0cHV0RGF0YTogVWludDhBcnJheSB8IHN0cmluZztcbiAgICBpZiAob3B0aW9ucy5mb3JtYXQgPT09IEZpbGVUeXBlLmNzdikge1xuICAgICAgb3V0cHV0RGF0YSA9IG5ldyBUZXh0RW5jb2RlcigndXRmLTgnKS5lbmNvZGUoY3N2Q29udGVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dERhdGEgPSBjc3ZDb250ZW50O1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBhIEJsb2Igb2JqZWN0IGZvciB0aGUgZG93bmxvYWRcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW29wdGlvbnMudXNlVXRmOFdpdGhCb20gPyAnXFx1RkVGRicgOiAnJywgb3V0cHV0RGF0YV0sIHtcbiAgICAgIHR5cGU6IGAke21pbWVUeXBlfTtjaGFyc2V0PXV0Zi04O2BcbiAgICB9KTtcblxuICAgIC8vIHdoZW4gdXNpbmcgSUUvRWRnZSwgdGhlbiB1c2UgZGlmZmVyZW50IGRvd25sb2FkIGNhbGxcbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBuYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYihibG9iLCBvcHRpb25zLmZpbGVuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhpcyB0cmljayB3aWxsIGdlbmVyYXRlIGEgdGVtcCA8YSAvPiB0YWdcbiAgICAgIC8vIHRoZSBjb2RlIHdpbGwgdGhlbiB0cmlnZ2VyIGEgaGlkZGVuIGNsaWNrIGZvciBpdCB0byBzdGFydCBkb3dubG9hZGluZ1xuICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIGNvbnN0IGNzdlVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cbiAgICAgIGxpbmsudGV4dENvbnRlbnQgPSAnZG93bmxvYWQnO1xuICAgICAgbGluay5ocmVmID0gY3N2VXJsO1xuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgb3B0aW9ucy5maWxlbmFtZSk7XG5cbiAgICAgIC8vIHNldCB0aGUgdmlzaWJpbGl0eSB0byBoaWRkZW4gc28gdGhlcmUgaXMgbm8gZWZmZWN0IG9uIHlvdXIgd2ViLWxheW91dFxuICAgICAgbGluay5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG5cbiAgICAgIC8vIHRoaXMgcGFydCB3aWxsIGFwcGVuZCB0aGUgYW5jaG9yIHRhZywgdHJpZ2dlciBhIGNsaWNrIChmb3IgZG93bmxvYWQgdG8gc3RhcnQpIGFuZCBmaW5hbGx5IHJlbW92ZSB0aGUgdGFnIG9uY2UgY29tcGxldGVkXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgbGluay5jbGljaygpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==