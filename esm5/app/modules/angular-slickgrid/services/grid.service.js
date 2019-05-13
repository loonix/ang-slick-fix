/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { ExtensionService } from './extension.service';
import { FilterService } from './filter.service';
import { GridStateService } from './gridState.service';
import { SortService } from './sort.service';
import { Subject } from 'rxjs';
var GridService = /** @class */ (function () {
    function GridService(extensionService, filterService, gridStateService, sortService, translate) {
        this.extensionService = extensionService;
        this.filterService = filterService;
        this.gridStateService = gridStateService;
        this.sortService = sortService;
        this.translate = translate;
        this.onItemAdded = new Subject();
        this.onItemDeleted = new Subject();
        this.onItemUpdated = new Subject();
    }
    Object.defineProperty(GridService.prototype, "_gridOptions", {
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
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    GridService.prototype.init = /**
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    function (grid, dataView) {
        this._grid = grid;
        this._dataView = dataView;
    };
    /** Clear all Filters & Sorts */
    /**
     * Clear all Filters & Sorts
     * @return {?}
     */
    GridService.prototype.clearAllFiltersAndSorts = /**
     * Clear all Filters & Sorts
     * @return {?}
     */
    function () {
        // call both clear Filters & Sort but only trigger the last one to avoid sending multiple backend queries
        if (this.sortService && this.sortService.clearSorting) {
            this.sortService.clearSorting(false); // skip event trigger on this one
        }
        if (this.filterService && this.filterService.clearFilters) {
            this.filterService.clearFilters();
        }
    };
    /**
     * From a SlickGrid Event triggered get the Column Definition and Item Data Context
     *
     * For example the SlickGrid onClick will return cell arguments when subscribing to it.
     * From these cellArgs, we want to get the Column Definition and Item Data
     * @param cell event args
     * @return object with columnDef and dataContext
     */
    /**
     * From a SlickGrid Event triggered get the Column Definition and Item Data Context
     *
     * For example the SlickGrid onClick will return cell arguments when subscribing to it.
     * From these cellArgs, we want to get the Column Definition and Item Data
     * @param {?} args
     * @return {?} object with columnDef and dataContext
     */
    GridService.prototype.getColumnFromEventArguments = /**
     * From a SlickGrid Event triggered get the Column Definition and Item Data Context
     *
     * For example the SlickGrid onClick will return cell arguments when subscribing to it.
     * From these cellArgs, we want to get the Column Definition and Item Data
     * @param {?} args
     * @return {?} object with columnDef and dataContext
     */
    function (args) {
        if (!args || !args.grid || !args.grid.getColumns || !args.grid.getDataItem) {
            throw new Error('To get the column definition and data, we need to have these arguments passed as objects (row, cell, grid)');
        }
        return {
            row: args.row,
            cell: args.cell,
            columnDef: args.grid.getColumns()[args.cell],
            dataContext: args.grid.getDataItem(args.row),
            dataView: this._dataView,
            grid: this._grid,
            gridDefinition: this._gridOptions
        };
    };
    /** Get data item by it's row index number */
    /**
     * Get data item by it's row index number
     * @param {?} rowNumber
     * @return {?}
     */
    GridService.prototype.getDataItemByRowNumber = /**
     * Get data item by it's row index number
     * @param {?} rowNumber
     * @return {?}
     */
    function (rowNumber) {
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        return this._grid.getDataItem(rowNumber);
    };
    /** Chain the item Metadata with our implementation of Metadata at given row index */
    /**
     * Chain the item Metadata with our implementation of Metadata at given row index
     * @param {?} previousItemMetadata
     * @return {?}
     */
    GridService.prototype.getItemRowMetadataToHighlight = /**
     * Chain the item Metadata with our implementation of Metadata at given row index
     * @param {?} previousItemMetadata
     * @return {?}
     */
    function (previousItemMetadata) {
        var _this = this;
        return (/**
         * @param {?} rowNumber
         * @return {?}
         */
        function (rowNumber) {
            /** @type {?} */
            var item = _this._dataView.getItem(rowNumber);
            /** @type {?} */
            var meta = { cssClasses: '' };
            if (typeof previousItemMetadata === 'function') {
                meta = previousItemMetadata(rowNumber);
            }
            if (item && item._dirty) {
                meta.cssClasses = (meta && meta.cssClasses || '') + ' dirty';
            }
            if (!meta) {
                meta = { cssClasses: '' };
            }
            if (item && item.rowClass && meta) {
                meta.cssClasses += " " + item.rowClass;
                meta.cssClasses += " row" + rowNumber;
            }
            return meta;
        });
    };
    /**
     * Highlight then fade a row for x seconds.
     * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
     * @param rowNumber
     * @param fadeDelay
     */
    /**
     * Highlight then fade a row for x seconds.
     * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
     * @param {?} rowNumber
     * @param {?=} fadeDelay
     * @return {?}
     */
    GridService.prototype.highlightRow = /**
     * Highlight then fade a row for x seconds.
     * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
     * @param {?} rowNumber
     * @param {?=} fadeDelay
     * @return {?}
     */
    function (rowNumber, fadeDelay) {
        var _this = this;
        if (fadeDelay === void 0) { fadeDelay = 1500; }
        // create a SelectionModel if there's not one yet
        if (!this._grid.getSelectionModel()) {
            /** @type {?} */
            var rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
            this._grid.setSelectionModel(rowSelectionPlugin);
        }
        /** @type {?} */
        var rowIndexes = Array.isArray(rowNumber) ? rowNumber : [rowNumber];
        this._grid.setSelectedRows(rowIndexes);
        if (Array.isArray(rowNumber)) {
            rowNumber.forEach((/**
             * @param {?} row
             * @return {?}
             */
            function (row) { return _this.highlightRowByMetadata(row, fadeDelay); }));
        }
        else {
            this.highlightRowByMetadata(rowNumber, fadeDelay);
        }
    };
    /**
     * @param {?} rowNumber
     * @param {?=} fadeDelay
     * @return {?}
     */
    GridService.prototype.highlightRowByMetadata = /**
     * @param {?} rowNumber
     * @param {?=} fadeDelay
     * @return {?}
     */
    function (rowNumber, fadeDelay) {
        var _this = this;
        if (fadeDelay === void 0) { fadeDelay = 1500; }
        this._dataView.getItemMetadata = this.getItemRowMetadataToHighlight(this._dataView.getItemMetadata);
        /** @type {?} */
        var item = this._dataView.getItem(rowNumber);
        if (item && item.id) {
            item.rowClass = 'highlight';
            this._dataView.updateItem(item.id, item);
            /** @type {?} */
            var gridOptions = (/** @type {?} */ (this._grid.getOptions()));
            // highlight the row for a user defined timeout
            $("#" + gridOptions.gridId)
                .find(".highlight.row" + rowNumber)
                .first();
            // delete the row's CSS that was attached for highlighting
            setTimeout((/**
             * @return {?}
             */
            function () {
                if (item && item.id) {
                    delete item.rowClass;
                    /** @type {?} */
                    var gridIdx = _this._dataView.getIdxById(item.id);
                    if (gridIdx !== undefined) {
                        _this._dataView.updateItem(item.id, item);
                    }
                }
            }), fadeDelay + 10);
        }
    };
    /** Get the Data Item from a grid row index */
    /**
     * Get the Data Item from a grid row index
     * @param {?} index
     * @return {?}
     */
    GridService.prototype.getDataItemByRowIndex = /**
     * Get the Data Item from a grid row index
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        return this._grid.getDataItem(index);
    };
    /** Get the Data Item from an array of grid row indexes */
    /**
     * Get the Data Item from an array of grid row indexes
     * @param {?} indexes
     * @return {?}
     */
    GridService.prototype.getDataItemByRowIndexes = /**
     * Get the Data Item from an array of grid row indexes
     * @param {?} indexes
     * @return {?}
     */
    function (indexes) {
        var _this = this;
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        /** @type {?} */
        var dataItems = [];
        if (Array.isArray(indexes)) {
            indexes.forEach((/**
             * @param {?} idx
             * @return {?}
             */
            function (idx) {
                dataItems.push(_this._grid.getDataItem(idx));
            }));
        }
        return dataItems;
    };
    /** Get the currently selected row indexes */
    /**
     * Get the currently selected row indexes
     * @return {?}
     */
    GridService.prototype.getSelectedRows = /**
     * Get the currently selected row indexes
     * @return {?}
     */
    function () {
        return this._grid.getSelectedRows();
    };
    /** Get the currently selected rows item data */
    /**
     * Get the currently selected rows item data
     * @return {?}
     */
    GridService.prototype.getSelectedRowsDataItem = /**
     * Get the currently selected rows item data
     * @return {?}
     */
    function () {
        if (!this._grid || typeof this._grid.getSelectedRows !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        /** @type {?} */
        var selectedRowIndexes = this._grid.getSelectedRows();
        return this.getDataItemByRowIndexes(selectedRowIndexes);
    };
    /** Select the selected row by a row index */
    /**
     * Select the selected row by a row index
     * @param {?} rowIndex
     * @return {?}
     */
    GridService.prototype.setSelectedRow = /**
     * Select the selected row by a row index
     * @param {?} rowIndex
     * @return {?}
     */
    function (rowIndex) {
        this._grid.setSelectedRows([rowIndex]);
    };
    /** Set selected rows with provided array of row indexes */
    /**
     * Set selected rows with provided array of row indexes
     * @param {?} rowIndexes
     * @return {?}
     */
    GridService.prototype.setSelectedRows = /**
     * Set selected rows with provided array of row indexes
     * @param {?} rowIndexes
     * @return {?}
     */
    function (rowIndexes) {
        this._grid.setSelectedRows(rowIndexes);
    };
    /** Re-Render the Grid */
    /**
     * Re-Render the Grid
     * @return {?}
     */
    GridService.prototype.renderGrid = /**
     * Re-Render the Grid
     * @return {?}
     */
    function () {
        if (this._grid && typeof this._grid.invalidate === 'function') {
            this._grid.invalidate();
            this._grid.render();
        }
    };
    /**
     * Reset the grid to it's original state (clear any filters, sorting & pagination if exists) .
     * The column definitions could be passed as argument to reset (this can be used after a Grid State reset)
     * The reset will clear the Filters & Sort, then will reset the Columns to their original state
     */
    /**
     * Reset the grid to it's original state (clear any filters, sorting & pagination if exists) .
     * The column definitions could be passed as argument to reset (this can be used after a Grid State reset)
     * The reset will clear the Filters & Sort, then will reset the Columns to their original state
     * @param {?=} columnDefinitions
     * @return {?}
     */
    GridService.prototype.resetGrid = /**
     * Reset the grid to it's original state (clear any filters, sorting & pagination if exists) .
     * The column definitions could be passed as argument to reset (this can be used after a Grid State reset)
     * The reset will clear the Filters & Sort, then will reset the Columns to their original state
     * @param {?=} columnDefinitions
     * @return {?}
     */
    function (columnDefinitions) {
        // reset columns to original states & refresh the grid
        if (this._grid && this._dataView) {
            /** @type {?} */
            var originalColumns = this.extensionService.getAllColumns();
            if (Array.isArray(originalColumns) && originalColumns.length > 0) {
                // set the grid columns to it's original column definitions
                this._grid.setColumns(originalColumns);
                if (this._gridOptions && this._gridOptions.enableAutoSizeColumns) {
                    this._grid.autosizeColumns();
                }
                this.gridStateService.resetColumns(columnDefinitions);
            }
        }
        if (this.filterService && this.filterService.clearFilters) {
            this.filterService.clearFilters();
        }
        if (this.sortService && this.sortService.clearSorting) {
            this.sortService.clearSorting();
        }
    };
    /**
     * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param object dataItem: item object holding all properties of that row
     * @param shouldHighlightRow do we want to highlight the row after adding item
     * @param shouldResortGrid defaults to false, do we want the item to be sorted after insert? When set to False, it will add item on first row (default)
     * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     */
    /**
     * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param {?} item
     * @param {?=} shouldHighlightRow do we want to highlight the row after adding item
     * @param {?=} shouldResortGrid defaults to false, do we want the item to be sorted after insert? When set to False, it will add item on first row (default)
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    GridService.prototype.addItemToDatagrid = /**
     * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param {?} item
     * @param {?=} shouldHighlightRow do we want to highlight the row after adding item
     * @param {?=} shouldResortGrid defaults to false, do we want the item to be sorted after insert? When set to False, it will add item on first row (default)
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    function (item, shouldHighlightRow, shouldResortGrid, shouldTriggerEvent) {
        if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
        if (shouldResortGrid === void 0) { shouldResortGrid = false; }
        if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
        if (!this._grid || !this._gridOptions || !this._dataView) {
            throw new Error('We could not find SlickGrid Grid, DataView objects');
        }
        this._dataView.insertItem(0, item); // insert at index 0
        if (!shouldResortGrid) {
            this._grid.scrollRowIntoView(0); // scroll to row 0
        }
        // highlight the row we just added, if highlight is defined
        if (shouldHighlightRow && !shouldResortGrid) {
            this.highlightRow(0, 1500);
        }
        // do we want the item to be sorted in the grid, when set to False it will insert on first row (defaults to false)
        if (shouldResortGrid) {
            this._dataView.reSort();
            // if user wanted to see highlighted row
            // we need to do it here after resort and get each row number because it possibly changes after the sort
            if (shouldHighlightRow) {
                /** @type {?} */
                var rowNumber = this._dataView.getRowById(item.id);
                this.highlightRow(rowNumber, 1500);
            }
        }
        // do we want to trigger an event after adding the item
        if (shouldTriggerEvent) {
            this.onItemAdded.next(item);
        }
    };
    /**
     * Add item array (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param dataItem array: item object holding all properties of that row
     * @param shouldHighlightRow do we want to highlight the row after adding item
     * @param shouldResortGrid defaults to false, do we want the item to be sorted after insert? When set to False, it will add item on first row (default)
     * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     */
    /**
     * Add item array (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param {?} items
     * @param {?=} shouldHighlightRow do we want to highlight the row after adding item
     * @param {?=} shouldResortGrid defaults to false, do we want the item to be sorted after insert? When set to False, it will add item on first row (default)
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    GridService.prototype.addItemsToDatagrid = /**
     * Add item array (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param {?} items
     * @param {?=} shouldHighlightRow do we want to highlight the row after adding item
     * @param {?=} shouldResortGrid defaults to false, do we want the item to be sorted after insert? When set to False, it will add item on first row (default)
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    function (items, shouldHighlightRow, shouldResortGrid, shouldTriggerEvent) {
        var _this = this;
        if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
        if (shouldResortGrid === void 0) { shouldResortGrid = false; }
        if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
        /** @type {?} */
        var highlightRow = shouldHighlightRow;
        if (shouldResortGrid) {
            highlightRow = false; // don't highlight until later when shouldResortGrid is set to true
        }
        // loop through all items to add
        if (Array.isArray(items)) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return _this.addItemToDatagrid(item, highlightRow, false, false); }));
        }
        // do we want the item to be sorted in the grid, when set to False it will insert on first row (defaults to false)
        if (shouldResortGrid) {
            this._dataView.reSort();
            // if user wanted to see highlighted row
            // we need to do it here after resort and get each row number because it possibly changes after the sort
            if (shouldHighlightRow) {
                items.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    /** @type {?} */
                    var rowNumber = _this._dataView.getRowById(item.id);
                    _this.highlightRow(rowNumber, 1500);
                }));
            }
        }
        // do we want to trigger an event after adding the item
        if (shouldTriggerEvent) {
            this.onItemAdded.next(items);
        }
    };
    /**
     * Delete an existing item from the datagrid (dataView)
     * @param object item: item object holding all properties of that row
     * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     */
    /**
     * Delete an existing item from the datagrid (dataView)
     * @param {?} item
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    GridService.prototype.deleteDataGridItem = /**
     * Delete an existing item from the datagrid (dataView)
     * @param {?} item
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    function (item, shouldTriggerEvent) {
        if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
        if (!item || !item.hasOwnProperty('id')) {
            throw new Error("deleteDataGridItem() requires an item object which includes the \"id\" property");
        }
        /** @type {?} */
        var itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
        this.deleteDataGridItemById(itemId, shouldTriggerEvent);
    };
    /**
     * Delete an array of existing items from the datagrid
     * @param object item: item object holding all properties of that row
     * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     */
    /**
     * Delete an array of existing items from the datagrid
     * @param {?} items
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    GridService.prototype.deleteDataGridItems = /**
     * Delete an array of existing items from the datagrid
     * @param {?} items
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    function (items, shouldTriggerEvent) {
        var _this = this;
        if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
        // when it's not an array, we can call directly the single item delete
        if (!Array.isArray(items)) {
            this.deleteDataGridItem(items);
        }
        items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this.deleteDataGridItem(item, false); }));
        // do we want to trigger an event after deleting the item
        if (shouldTriggerEvent) {
            this.onItemDeleted.next(items);
        }
    };
    /**
     * Delete an existing item from the datagrid (dataView) by it's id
     * @param itemId: item unique id
     * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     */
    /**
     * Delete an existing item from the datagrid (dataView) by it's id
     * @param {?} itemId
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    GridService.prototype.deleteDataGridItemById = /**
     * Delete an existing item from the datagrid (dataView) by it's id
     * @param {?} itemId
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    function (itemId, shouldTriggerEvent) {
        if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
        if (itemId === undefined) {
            throw new Error("Cannot delete a row without a valid \"id\"");
        }
        // when user has row selection enabled, we should clear any selection to avoid confusion after a delete
        if (this._grid && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
            this._grid.setSelectedRows([]);
        }
        // delete the item from the dataView
        this._dataView.deleteItem(itemId);
        // do we want to trigger an event after deleting the item
        if (shouldTriggerEvent) {
            this.onItemDeleted.next(itemId);
        }
    };
    /**
     * Delete an array of existing items from the datagrid
     * @param object item: item object holding all properties of that row
     * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     */
    /**
     * Delete an array of existing items from the datagrid
     * @param {?} itemIds
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    GridService.prototype.deleteDataGridItemByIds = /**
     * Delete an array of existing items from the datagrid
     * @param {?} itemIds
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    function (itemIds, shouldTriggerEvent) {
        if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
        // when it's not an array, we can call directly the single item delete
        if (!Array.isArray(itemIds)) {
            this.deleteDataGridItemById(itemIds);
        }
        for (var i = 0; i < itemIds.length; i++) {
            if (itemIds[i] !== null) {
                this.deleteDataGridItemById(itemIds[i], false);
            }
        }
        // do we want to trigger an event after deleting the item
        if (shouldTriggerEvent) {
            this.onItemDeleted.next(itemIds);
        }
    };
    /**
     * Update an existing item with new properties inside the datagrid
     * @param object item: item object holding all properties of that row
     * @param shouldHighlightRow do we want to highlight the row after update
     * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return grid row index
     */
    /**
     * Update an existing item with new properties inside the datagrid
     * @param {?} item
     * @param {?=} shouldHighlightRow do we want to highlight the row after update
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?} grid row index
     */
    GridService.prototype.updateDataGridItem = /**
     * Update an existing item with new properties inside the datagrid
     * @param {?} item
     * @param {?=} shouldHighlightRow do we want to highlight the row after update
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?} grid row index
     */
    function (item, shouldHighlightRow, shouldTriggerEvent) {
        if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
        if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
        /** @type {?} */
        var itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
        if (itemId === undefined) {
            throw new Error("Could not find the item in the grid or it's associated \"id\"");
        }
        return this.updateDataGridItemById(itemId, item, shouldHighlightRow, shouldTriggerEvent);
    };
    /**
     * Update an array of existing items with new properties inside the datagrid
     * @param object item: array of item objects
     * @param shouldHighlightRow do we want to highlight the row after update
     * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     */
    /**
     * Update an array of existing items with new properties inside the datagrid
     * @param {?} items
     * @param {?=} shouldHighlightRow do we want to highlight the row after update
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    GridService.prototype.updateDataGridItems = /**
     * Update an array of existing items with new properties inside the datagrid
     * @param {?} items
     * @param {?=} shouldHighlightRow do we want to highlight the row after update
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    function (items, shouldHighlightRow, shouldTriggerEvent) {
        var _this = this;
        if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
        if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
        // when it's not an array, we can call directly the single item update
        if (!Array.isArray(items)) {
            this.updateDataGridItem(items, shouldHighlightRow);
        }
        /** @type {?} */
        var gridIndexes = [];
        items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            gridIndexes.push(_this.updateDataGridItem(item, false, false));
        }));
        // only highlight at the end, all at once
        // we have to do this because doing highlight 1 by 1 would only re-select the last highlighted row which is wrong behavior
        if (shouldHighlightRow) {
            this.highlightRow(gridIndexes);
        }
        // do we want to trigger an event after updating the item
        if (shouldTriggerEvent) {
            this.onItemUpdated.next(items);
        }
    };
    /**
     * Update an existing item in the datagrid by it's id and new properties
     * @param itemId: item unique id
     * @param object item: item object holding all properties of that row
     * @param shouldHighlightRow do we want to highlight the row after update
     * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return grid row index
     */
    /**
     * Update an existing item in the datagrid by it's id and new properties
     * @param {?} itemId
     * @param {?} item
     * @param {?=} shouldHighlightRow do we want to highlight the row after update
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?} grid row index
     */
    GridService.prototype.updateDataGridItemById = /**
     * Update an existing item in the datagrid by it's id and new properties
     * @param {?} itemId
     * @param {?} item
     * @param {?=} shouldHighlightRow do we want to highlight the row after update
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?} grid row index
     */
    function (itemId, item, shouldHighlightRow, shouldTriggerEvent) {
        if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
        if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
        if (itemId === undefined) {
            throw new Error("Cannot update a row without a valid \"id\"");
        }
        /** @type {?} */
        var rowNumber = this._dataView.getRowById(itemId);
        if (!item || rowNumber === undefined) {
            throw new Error("Could not find the item in the grid or it's associated \"id\"");
        }
        /** @type {?} */
        var gridIdx = this._dataView.getIdxById(itemId);
        if (gridIdx !== undefined) {
            // Update the item itself inside the dataView
            this._dataView.updateItem(itemId, item);
            this._grid.updateRow(rowNumber);
            // highlight the row we just updated, if defined
            if (shouldHighlightRow) {
                this.highlightRow(rowNumber, 1500);
            }
            // do we want to trigger an event after updating the item
            if (shouldTriggerEvent) {
                this.onItemUpdated.next(item);
            }
            return gridIdx;
        }
    };
    GridService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GridService.ctorParameters = function () { return [
        { type: ExtensionService },
        { type: FilterService },
        { type: GridStateService },
        { type: SortService },
        { type: TranslateService }
    ]; };
    return GridService;
}());
export { GridService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GridService.prototype._grid;
    /**
     * @type {?}
     * @private
     */
    GridService.prototype._dataView;
    /** @type {?} */
    GridService.prototype.onItemAdded;
    /** @type {?} */
    GridService.prototype.onItemDeleted;
    /** @type {?} */
    GridService.prototype.onItemUpdated;
    /**
     * @type {?}
     * @private
     */
    GridService.prototype.extensionService;
    /**
     * @type {?}
     * @private
     */
    GridService.prototype.filterService;
    /**
     * @type {?}
     * @private
     */
    GridService.prototype.gridStateService;
    /**
     * @type {?}
     * @private
     */
    GridService.prototype.sortService;
    /**
     * @type {?}
     * @private
     */
    GridService.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9ncmlkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBTS9CO0lBUUUscUJBQW9CLGdCQUFrQyxFQUFVLGFBQTRCLEVBQVUsZ0JBQWtDLEVBQVUsV0FBd0IsRUFBVSxTQUEyQjtRQUEzTCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUovTSxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFlLENBQUM7UUFDekMsa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBZSxDQUFDO1FBQzNDLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQWUsQ0FBQztJQUV3SyxDQUFDO0lBR3BOLHNCQUFZLHFDQUFZO1FBRHhCLGlFQUFpRTs7Ozs7O1FBQ2pFO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUss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ZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZWxsQXJncywgQ29sdW1uLCBHcmlkT3B0aW9uLCBPbkV2ZW50QXJncyB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IEV4dGVuc2lvblNlcnZpY2UgfSBmcm9tICcuL2V4dGVuc2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICcuL2ZpbHRlci5zZXJ2aWNlJztcbmltcG9ydCB7IEdyaWRTdGF0ZVNlcnZpY2UgfSBmcm9tICcuL2dyaWRTdGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFNvcnRTZXJ2aWNlIH0gZnJvbSAnLi9zb3J0LnNlcnZpY2UnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5kZWNsYXJlIHZhciBTbGljazogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR3JpZFNlcnZpY2Uge1xuICBwcml2YXRlIF9ncmlkOiBhbnk7XG4gIHByaXZhdGUgX2RhdGFWaWV3OiBhbnk7XG4gIG9uSXRlbUFkZGVkID0gbmV3IFN1YmplY3Q8YW55IHwgYW55W10+KCk7XG4gIG9uSXRlbURlbGV0ZWQgPSBuZXcgU3ViamVjdDxhbnkgfCBhbnlbXT4oKTtcbiAgb25JdGVtVXBkYXRlZCA9IG5ldyBTdWJqZWN0PGFueSB8IGFueVtdPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXh0ZW5zaW9uU2VydmljZTogRXh0ZW5zaW9uU2VydmljZSwgcHJpdmF0ZSBmaWx0ZXJTZXJ2aWNlOiBGaWx0ZXJTZXJ2aWNlLCBwcml2YXRlIGdyaWRTdGF0ZVNlcnZpY2U6IEdyaWRTdGF0ZVNlcnZpY2UsIHByaXZhdGUgc29ydFNlcnZpY2U6IFNvcnRTZXJ2aWNlLCBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkgeyB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cbiAgcHJpdmF0ZSBnZXQgX2dyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcbiAgfVxuXG4gIGluaXQoZ3JpZDogYW55LCBkYXRhVmlldzogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XG4gICAgdGhpcy5fZGF0YVZpZXcgPSBkYXRhVmlldztcbiAgfVxuXG4gIC8qKiBDbGVhciBhbGwgRmlsdGVycyAmIFNvcnRzICovXG4gIGNsZWFyQWxsRmlsdGVyc0FuZFNvcnRzKCkge1xuICAgIC8vIGNhbGwgYm90aCBjbGVhciBGaWx0ZXJzICYgU29ydCBidXQgb25seSB0cmlnZ2VyIHRoZSBsYXN0IG9uZSB0byBhdm9pZCBzZW5kaW5nIG11bHRpcGxlIGJhY2tlbmQgcXVlcmllc1xuICAgIGlmICh0aGlzLnNvcnRTZXJ2aWNlICYmIHRoaXMuc29ydFNlcnZpY2UuY2xlYXJTb3J0aW5nKSB7XG4gICAgICB0aGlzLnNvcnRTZXJ2aWNlLmNsZWFyU29ydGluZyhmYWxzZSk7IC8vIHNraXAgZXZlbnQgdHJpZ2dlciBvbiB0aGlzIG9uZVxuICAgIH1cbiAgICBpZiAodGhpcy5maWx0ZXJTZXJ2aWNlICYmIHRoaXMuZmlsdGVyU2VydmljZS5jbGVhckZpbHRlcnMpIHtcbiAgICAgIHRoaXMuZmlsdGVyU2VydmljZS5jbGVhckZpbHRlcnMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRnJvbSBhIFNsaWNrR3JpZCBFdmVudCB0cmlnZ2VyZWQgZ2V0IHRoZSBDb2x1bW4gRGVmaW5pdGlvbiBhbmQgSXRlbSBEYXRhIENvbnRleHRcbiAgICpcbiAgICogRm9yIGV4YW1wbGUgdGhlIFNsaWNrR3JpZCBvbkNsaWNrIHdpbGwgcmV0dXJuIGNlbGwgYXJndW1lbnRzIHdoZW4gc3Vic2NyaWJpbmcgdG8gaXQuXG4gICAqIEZyb20gdGhlc2UgY2VsbEFyZ3MsIHdlIHdhbnQgdG8gZ2V0IHRoZSBDb2x1bW4gRGVmaW5pdGlvbiBhbmQgSXRlbSBEYXRhXG4gICAqIEBwYXJhbSBjZWxsIGV2ZW50IGFyZ3NcbiAgICogQHJldHVybiBvYmplY3Qgd2l0aCBjb2x1bW5EZWYgYW5kIGRhdGFDb250ZXh0XG4gICAqL1xuICBnZXRDb2x1bW5Gcm9tRXZlbnRBcmd1bWVudHMoYXJnczogQ2VsbEFyZ3MpOiBPbkV2ZW50QXJncyB7XG4gICAgaWYgKCFhcmdzIHx8ICFhcmdzLmdyaWQgfHwgIWFyZ3MuZ3JpZC5nZXRDb2x1bW5zIHx8ICFhcmdzLmdyaWQuZ2V0RGF0YUl0ZW0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVG8gZ2V0IHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBhbmQgZGF0YSwgd2UgbmVlZCB0byBoYXZlIHRoZXNlIGFyZ3VtZW50cyBwYXNzZWQgYXMgb2JqZWN0cyAocm93LCBjZWxsLCBncmlkKScpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICByb3c6IGFyZ3Mucm93LFxuICAgICAgY2VsbDogYXJncy5jZWxsLFxuICAgICAgY29sdW1uRGVmOiBhcmdzLmdyaWQuZ2V0Q29sdW1ucygpW2FyZ3MuY2VsbF0sXG4gICAgICBkYXRhQ29udGV4dDogYXJncy5ncmlkLmdldERhdGFJdGVtKGFyZ3Mucm93KSxcbiAgICAgIGRhdGFWaWV3OiB0aGlzLl9kYXRhVmlldyxcbiAgICAgIGdyaWQ6IHRoaXMuX2dyaWQsXG4gICAgICBncmlkRGVmaW5pdGlvbjogdGhpcy5fZ3JpZE9wdGlvbnNcbiAgICB9O1xuICB9XG5cbiAgLyoqIEdldCBkYXRhIGl0ZW0gYnkgaXQncyByb3cgaW5kZXggbnVtYmVyICovXG4gIGdldERhdGFJdGVtQnlSb3dOdW1iZXIocm93TnVtYmVyOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuX2dyaWQgfHwgdHlwZW9mIHRoaXMuX2dyaWQuZ2V0RGF0YUl0ZW0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2UgY291bGQgbm90IGZpbmQgU2xpY2tHcmlkIEdyaWQgb2JqZWN0Jyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9ncmlkLmdldERhdGFJdGVtKHJvd051bWJlcik7XG4gIH1cblxuICAvKiogQ2hhaW4gdGhlIGl0ZW0gTWV0YWRhdGEgd2l0aCBvdXIgaW1wbGVtZW50YXRpb24gb2YgTWV0YWRhdGEgYXQgZ2l2ZW4gcm93IGluZGV4ICovXG4gIGdldEl0ZW1Sb3dNZXRhZGF0YVRvSGlnaGxpZ2h0KHByZXZpb3VzSXRlbU1ldGFkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gKHJvd051bWJlcjogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBpdGVtID0gdGhpcy5fZGF0YVZpZXcuZ2V0SXRlbShyb3dOdW1iZXIpO1xuICAgICAgbGV0IG1ldGEgPSB7IGNzc0NsYXNzZXM6ICcnIH07XG4gICAgICBpZiAodHlwZW9mIHByZXZpb3VzSXRlbU1ldGFkYXRhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG1ldGEgPSBwcmV2aW91c0l0ZW1NZXRhZGF0YShyb3dOdW1iZXIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbSAmJiBpdGVtLl9kaXJ0eSkge1xuICAgICAgICBtZXRhLmNzc0NsYXNzZXMgPSAobWV0YSAmJiBtZXRhLmNzc0NsYXNzZXMgfHwgJycpICsgJyBkaXJ0eSc7XG4gICAgICB9XG5cbiAgICAgIGlmICghbWV0YSkge1xuICAgICAgICBtZXRhID0geyBjc3NDbGFzc2VzOiAnJyB9O1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbSAmJiBpdGVtLnJvd0NsYXNzICYmIG1ldGEpIHtcbiAgICAgICAgbWV0YS5jc3NDbGFzc2VzICs9IGAgJHtpdGVtLnJvd0NsYXNzfWA7XG4gICAgICAgIG1ldGEuY3NzQ2xhc3NlcyArPSBgIHJvdyR7cm93TnVtYmVyfWA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtZXRhO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogSGlnaGxpZ2h0IHRoZW4gZmFkZSBhIHJvdyBmb3IgeCBzZWNvbmRzLlxuICAgKiBUaGUgaW1wbGVtZW50YXRpb24gZm9sbG93cyB0aGlzIFNPIGFuc3dlcjogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE5OTg1MTQ4LzEyMTIxNjZcbiAgICogQHBhcmFtIHJvd051bWJlclxuICAgKiBAcGFyYW0gZmFkZURlbGF5XG4gICAqL1xuICBoaWdobGlnaHRSb3cocm93TnVtYmVyOiBudW1iZXIgfCBudW1iZXJbXSwgZmFkZURlbGF5OiBudW1iZXIgPSAxNTAwKSB7XG4gICAgLy8gY3JlYXRlIGEgU2VsZWN0aW9uTW9kZWwgaWYgdGhlcmUncyBub3Qgb25lIHlldFxuICAgIGlmICghdGhpcy5fZ3JpZC5nZXRTZWxlY3Rpb25Nb2RlbCgpKSB7XG4gICAgICBjb25zdCByb3dTZWxlY3Rpb25QbHVnaW4gPSBuZXcgU2xpY2suUm93U2VsZWN0aW9uTW9kZWwodGhpcy5fZ3JpZE9wdGlvbnMucm93U2VsZWN0aW9uT3B0aW9ucyB8fCB7fSk7XG4gICAgICB0aGlzLl9ncmlkLnNldFNlbGVjdGlvbk1vZGVsKHJvd1NlbGVjdGlvblBsdWdpbik7XG4gICAgfVxuXG4gICAgY29uc3Qgcm93SW5kZXhlcyA9IEFycmF5LmlzQXJyYXkocm93TnVtYmVyKSA/IHJvd051bWJlciA6IFtyb3dOdW1iZXJdO1xuICAgIHRoaXMuX2dyaWQuc2V0U2VsZWN0ZWRSb3dzKHJvd0luZGV4ZXMpO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkocm93TnVtYmVyKSkge1xuICAgICAgcm93TnVtYmVyLmZvckVhY2gocm93ID0+IHRoaXMuaGlnaGxpZ2h0Um93QnlNZXRhZGF0YShyb3csIGZhZGVEZWxheSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpZ2hsaWdodFJvd0J5TWV0YWRhdGEocm93TnVtYmVyLCBmYWRlRGVsYXkpO1xuICAgIH1cbiAgfVxuXG4gIGhpZ2hsaWdodFJvd0J5TWV0YWRhdGEocm93TnVtYmVyOiBudW1iZXIsIGZhZGVEZWxheTogbnVtYmVyID0gMTUwMCkge1xuICAgIHRoaXMuX2RhdGFWaWV3LmdldEl0ZW1NZXRhZGF0YSA9IHRoaXMuZ2V0SXRlbVJvd01ldGFkYXRhVG9IaWdobGlnaHQodGhpcy5fZGF0YVZpZXcuZ2V0SXRlbU1ldGFkYXRhKTtcblxuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl9kYXRhVmlldy5nZXRJdGVtKHJvd051bWJlcik7XG4gICAgaWYgKGl0ZW0gJiYgaXRlbS5pZCkge1xuICAgICAgaXRlbS5yb3dDbGFzcyA9ICdoaWdobGlnaHQnO1xuICAgICAgdGhpcy5fZGF0YVZpZXcudXBkYXRlSXRlbShpdGVtLmlkLCBpdGVtKTtcbiAgICAgIGNvbnN0IGdyaWRPcHRpb25zID0gdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgYXMgR3JpZE9wdGlvbjtcblxuICAgICAgLy8gaGlnaGxpZ2h0IHRoZSByb3cgZm9yIGEgdXNlciBkZWZpbmVkIHRpbWVvdXRcbiAgICAgICQoYCMke2dyaWRPcHRpb25zLmdyaWRJZH1gKVxuICAgICAgICAuZmluZChgLmhpZ2hsaWdodC5yb3cke3Jvd051bWJlcn1gKVxuICAgICAgICAuZmlyc3QoKTtcblxuICAgICAgLy8gZGVsZXRlIHRoZSByb3cncyBDU1MgdGhhdCB3YXMgYXR0YWNoZWQgZm9yIGhpZ2hsaWdodGluZ1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChpdGVtICYmIGl0ZW0uaWQpIHtcbiAgICAgICAgICBkZWxldGUgaXRlbS5yb3dDbGFzcztcbiAgICAgICAgICBjb25zdCBncmlkSWR4ID0gdGhpcy5fZGF0YVZpZXcuZ2V0SWR4QnlJZChpdGVtLmlkKTtcbiAgICAgICAgICBpZiAoZ3JpZElkeCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLl9kYXRhVmlldy51cGRhdGVJdGVtKGl0ZW0uaWQsIGl0ZW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgZmFkZURlbGF5ICsgMTApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBHZXQgdGhlIERhdGEgSXRlbSBmcm9tIGEgZ3JpZCByb3cgaW5kZXggKi9cbiAgZ2V0RGF0YUl0ZW1CeVJvd0luZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuX2dyaWQgfHwgdHlwZW9mIHRoaXMuX2dyaWQuZ2V0RGF0YUl0ZW0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2UgY291bGQgbm90IGZpbmQgU2xpY2tHcmlkIEdyaWQgb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2dyaWQuZ2V0RGF0YUl0ZW0oaW5kZXgpO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgRGF0YSBJdGVtIGZyb20gYW4gYXJyYXkgb2YgZ3JpZCByb3cgaW5kZXhlcyAqL1xuICBnZXREYXRhSXRlbUJ5Um93SW5kZXhlcyhpbmRleGVzOiBudW1iZXJbXSkge1xuICAgIGlmICghdGhpcy5fZ3JpZCB8fCB0eXBlb2YgdGhpcy5fZ3JpZC5nZXREYXRhSXRlbSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZSBjb3VsZCBub3QgZmluZCBTbGlja0dyaWQgR3JpZCBvYmplY3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhSXRlbXMgPSBbXTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGluZGV4ZXMpKSB7XG4gICAgICBpbmRleGVzLmZvckVhY2goKGlkeCkgPT4ge1xuICAgICAgICBkYXRhSXRlbXMucHVzaCh0aGlzLl9ncmlkLmdldERhdGFJdGVtKGlkeCkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGFJdGVtcztcbiAgfVxuXG4gIC8qKiBHZXQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCByb3cgaW5kZXhlcyAqL1xuICBnZXRTZWxlY3RlZFJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dyaWQuZ2V0U2VsZWN0ZWRSb3dzKCk7XG4gIH1cblxuICAvKiogR2V0IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgcm93cyBpdGVtIGRhdGEgKi9cbiAgZ2V0U2VsZWN0ZWRSb3dzRGF0YUl0ZW0oKSB7XG4gICAgaWYgKCF0aGlzLl9ncmlkIHx8IHR5cGVvZiB0aGlzLl9ncmlkLmdldFNlbGVjdGVkUm93cyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZSBjb3VsZCBub3QgZmluZCBTbGlja0dyaWQgR3JpZCBvYmplY3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RlZFJvd0luZGV4ZXMgPSB0aGlzLl9ncmlkLmdldFNlbGVjdGVkUm93cygpO1xuICAgIHJldHVybiB0aGlzLmdldERhdGFJdGVtQnlSb3dJbmRleGVzKHNlbGVjdGVkUm93SW5kZXhlcyk7XG4gIH1cblxuICAvKiogU2VsZWN0IHRoZSBzZWxlY3RlZCByb3cgYnkgYSByb3cgaW5kZXggKi9cbiAgc2V0U2VsZWN0ZWRSb3cocm93SW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX2dyaWQuc2V0U2VsZWN0ZWRSb3dzKFtyb3dJbmRleF0pO1xuICB9XG5cbiAgLyoqIFNldCBzZWxlY3RlZCByb3dzIHdpdGggcHJvdmlkZWQgYXJyYXkgb2Ygcm93IGluZGV4ZXMgKi9cbiAgc2V0U2VsZWN0ZWRSb3dzKHJvd0luZGV4ZXM6IG51bWJlcltdKSB7XG4gICAgdGhpcy5fZ3JpZC5zZXRTZWxlY3RlZFJvd3Mocm93SW5kZXhlcyk7XG4gIH1cblxuICAvKiogUmUtUmVuZGVyIHRoZSBHcmlkICovXG4gIHJlbmRlckdyaWQoKSB7XG4gICAgaWYgKHRoaXMuX2dyaWQgJiYgdHlwZW9mIHRoaXMuX2dyaWQuaW52YWxpZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5fZ3JpZC5pbnZhbGlkYXRlKCk7XG4gICAgICB0aGlzLl9ncmlkLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgZ3JpZCB0byBpdCdzIG9yaWdpbmFsIHN0YXRlIChjbGVhciBhbnkgZmlsdGVycywgc29ydGluZyAmIHBhZ2luYXRpb24gaWYgZXhpc3RzKSAuXG4gICAqIFRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgY291bGQgYmUgcGFzc2VkIGFzIGFyZ3VtZW50IHRvIHJlc2V0ICh0aGlzIGNhbiBiZSB1c2VkIGFmdGVyIGEgR3JpZCBTdGF0ZSByZXNldClcbiAgICogVGhlIHJlc2V0IHdpbGwgY2xlYXIgdGhlIEZpbHRlcnMgJiBTb3J0LCB0aGVuIHdpbGwgcmVzZXQgdGhlIENvbHVtbnMgdG8gdGhlaXIgb3JpZ2luYWwgc3RhdGVcbiAgICovXG4gIHJlc2V0R3JpZChjb2x1bW5EZWZpbml0aW9ucz86IENvbHVtbltdKSB7XG4gICAgLy8gcmVzZXQgY29sdW1ucyB0byBvcmlnaW5hbCBzdGF0ZXMgJiByZWZyZXNoIHRoZSBncmlkXG4gICAgaWYgKHRoaXMuX2dyaWQgJiYgdGhpcy5fZGF0YVZpZXcpIHtcbiAgICAgIGNvbnN0IG9yaWdpbmFsQ29sdW1ucyA9IHRoaXMuZXh0ZW5zaW9uU2VydmljZS5nZXRBbGxDb2x1bW5zKCk7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvcmlnaW5hbENvbHVtbnMpICYmIG9yaWdpbmFsQ29sdW1ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIHNldCB0aGUgZ3JpZCBjb2x1bW5zIHRvIGl0J3Mgb3JpZ2luYWwgY29sdW1uIGRlZmluaXRpb25zXG4gICAgICAgIHRoaXMuX2dyaWQuc2V0Q29sdW1ucyhvcmlnaW5hbENvbHVtbnMpO1xuICAgICAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1NpemVDb2x1bW5zKSB7XG4gICAgICAgICAgdGhpcy5fZ3JpZC5hdXRvc2l6ZUNvbHVtbnMoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdyaWRTdGF0ZVNlcnZpY2UucmVzZXRDb2x1bW5zKGNvbHVtbkRlZmluaXRpb25zKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuZmlsdGVyU2VydmljZSAmJiB0aGlzLmZpbHRlclNlcnZpY2UuY2xlYXJGaWx0ZXJzKSB7XG4gICAgICB0aGlzLmZpbHRlclNlcnZpY2UuY2xlYXJGaWx0ZXJzKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNvcnRTZXJ2aWNlICYmIHRoaXMuc29ydFNlcnZpY2UuY2xlYXJTb3J0aW5nKSB7XG4gICAgICB0aGlzLnNvcnRTZXJ2aWNlLmNsZWFyU29ydGluZygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gaXRlbSAoZGF0YSBpdGVtKSB0byB0aGUgZGF0YWdyaWQsIGJ5IGRlZmF1bHQgaXQgd2lsbCBoaWdobGlnaHQgKGZsYXNoaW5nKSB0aGUgaW5zZXJ0ZWQgcm93IGJ1dCB3ZSBjYW4gZGlzYWJsZSBpdCB0b29cbiAgICogQHBhcmFtIG9iamVjdCBkYXRhSXRlbTogaXRlbSBvYmplY3QgaG9sZGluZyBhbGwgcHJvcGVydGllcyBvZiB0aGF0IHJvd1xuICAgKiBAcGFyYW0gc2hvdWxkSGlnaGxpZ2h0Um93IGRvIHdlIHdhbnQgdG8gaGlnaGxpZ2h0IHRoZSByb3cgYWZ0ZXIgYWRkaW5nIGl0ZW1cbiAgICogQHBhcmFtIHNob3VsZFJlc29ydEdyaWQgZGVmYXVsdHMgdG8gZmFsc2UsIGRvIHdlIHdhbnQgdGhlIGl0ZW0gdG8gYmUgc29ydGVkIGFmdGVyIGluc2VydD8gV2hlbiBzZXQgdG8gRmFsc2UsIGl0IHdpbGwgYWRkIGl0ZW0gb24gZmlyc3Qgcm93IChkZWZhdWx0KVxuICAgKiBAcGFyYW0gc2hvdWxkVHJpZ2dlckV2ZW50IGRlZmF1bHRzIHRvIHRydWUsIHdoaWNoIHdpbGwgdHJpZ2dlciBhbiBldmVudCAodXNlZCBieSBhdCBsZWFzdCB0aGUgcGFnaW5hdGlvbiBjb21wb25lbnQpXG4gICAqL1xuICBhZGRJdGVtVG9EYXRhZ3JpZChpdGVtOiBhbnksIHNob3VsZEhpZ2hsaWdodFJvdyA9IHRydWUsIHNob3VsZFJlc29ydEdyaWQgPSBmYWxzZSwgc2hvdWxkVHJpZ2dlckV2ZW50ID0gdHJ1ZSkge1xuICAgIGlmICghdGhpcy5fZ3JpZCB8fCAhdGhpcy5fZ3JpZE9wdGlvbnMgfHwgIXRoaXMuX2RhdGFWaWV3KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlIGNvdWxkIG5vdCBmaW5kIFNsaWNrR3JpZCBHcmlkLCBEYXRhVmlldyBvYmplY3RzJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZGF0YVZpZXcuaW5zZXJ0SXRlbSgwLCBpdGVtKTsgLy8gaW5zZXJ0IGF0IGluZGV4IDBcblxuICAgIGlmICghc2hvdWxkUmVzb3J0R3JpZCkge1xuICAgICAgdGhpcy5fZ3JpZC5zY3JvbGxSb3dJbnRvVmlldygwKTsgLy8gc2Nyb2xsIHRvIHJvdyAwXG4gICAgfVxuXG4gICAgLy8gaGlnaGxpZ2h0IHRoZSByb3cgd2UganVzdCBhZGRlZCwgaWYgaGlnaGxpZ2h0IGlzIGRlZmluZWRcbiAgICBpZiAoc2hvdWxkSGlnaGxpZ2h0Um93ICYmICFzaG91bGRSZXNvcnRHcmlkKSB7XG4gICAgICB0aGlzLmhpZ2hsaWdodFJvdygwLCAxNTAwKTtcbiAgICB9XG5cbiAgICAvLyBkbyB3ZSB3YW50IHRoZSBpdGVtIHRvIGJlIHNvcnRlZCBpbiB0aGUgZ3JpZCwgd2hlbiBzZXQgdG8gRmFsc2UgaXQgd2lsbCBpbnNlcnQgb24gZmlyc3Qgcm93IChkZWZhdWx0cyB0byBmYWxzZSlcbiAgICBpZiAoc2hvdWxkUmVzb3J0R3JpZCkge1xuICAgICAgdGhpcy5fZGF0YVZpZXcucmVTb3J0KCk7XG5cbiAgICAgIC8vIGlmIHVzZXIgd2FudGVkIHRvIHNlZSBoaWdobGlnaHRlZCByb3dcbiAgICAgIC8vIHdlIG5lZWQgdG8gZG8gaXQgaGVyZSBhZnRlciByZXNvcnQgYW5kIGdldCBlYWNoIHJvdyBudW1iZXIgYmVjYXVzZSBpdCBwb3NzaWJseSBjaGFuZ2VzIGFmdGVyIHRoZSBzb3J0XG4gICAgICBpZiAoc2hvdWxkSGlnaGxpZ2h0Um93KSB7XG4gICAgICAgIGNvbnN0IHJvd051bWJlciA9IHRoaXMuX2RhdGFWaWV3LmdldFJvd0J5SWQoaXRlbS5pZCk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0Um93KHJvd051bWJlciwgMTUwMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZG8gd2Ugd2FudCB0byB0cmlnZ2VyIGFuIGV2ZW50IGFmdGVyIGFkZGluZyB0aGUgaXRlbVxuICAgIGlmIChzaG91bGRUcmlnZ2VyRXZlbnQpIHtcbiAgICAgIHRoaXMub25JdGVtQWRkZWQubmV4dChpdGVtKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkIGl0ZW0gYXJyYXkgKGRhdGEgaXRlbSkgdG8gdGhlIGRhdGFncmlkLCBieSBkZWZhdWx0IGl0IHdpbGwgaGlnaGxpZ2h0IChmbGFzaGluZykgdGhlIGluc2VydGVkIHJvdyBidXQgd2UgY2FuIGRpc2FibGUgaXQgdG9vXG4gICAqIEBwYXJhbSBkYXRhSXRlbSBhcnJheTogaXRlbSBvYmplY3QgaG9sZGluZyBhbGwgcHJvcGVydGllcyBvZiB0aGF0IHJvd1xuICAgKiBAcGFyYW0gc2hvdWxkSGlnaGxpZ2h0Um93IGRvIHdlIHdhbnQgdG8gaGlnaGxpZ2h0IHRoZSByb3cgYWZ0ZXIgYWRkaW5nIGl0ZW1cbiAgICogQHBhcmFtIHNob3VsZFJlc29ydEdyaWQgZGVmYXVsdHMgdG8gZmFsc2UsIGRvIHdlIHdhbnQgdGhlIGl0ZW0gdG8gYmUgc29ydGVkIGFmdGVyIGluc2VydD8gV2hlbiBzZXQgdG8gRmFsc2UsIGl0IHdpbGwgYWRkIGl0ZW0gb24gZmlyc3Qgcm93IChkZWZhdWx0KVxuICAgKiBAcGFyYW0gc2hvdWxkVHJpZ2dlckV2ZW50IGRlZmF1bHRzIHRvIHRydWUsIHdoaWNoIHdpbGwgdHJpZ2dlciBhbiBldmVudCAodXNlZCBieSBhdCBsZWFzdCB0aGUgcGFnaW5hdGlvbiBjb21wb25lbnQpXG4gICAqL1xuICBhZGRJdGVtc1RvRGF0YWdyaWQoaXRlbXM6IGFueVtdLCBzaG91bGRIaWdobGlnaHRSb3cgPSB0cnVlLCBzaG91bGRSZXNvcnRHcmlkID0gZmFsc2UsIHNob3VsZFRyaWdnZXJFdmVudCA9IHRydWUpIHtcbiAgICBsZXQgaGlnaGxpZ2h0Um93ID0gc2hvdWxkSGlnaGxpZ2h0Um93O1xuICAgIGlmIChzaG91bGRSZXNvcnRHcmlkKSB7XG4gICAgICBoaWdobGlnaHRSb3cgPSBmYWxzZTsgLy8gZG9uJ3QgaGlnaGxpZ2h0IHVudGlsIGxhdGVyIHdoZW4gc2hvdWxkUmVzb3J0R3JpZCBpcyBzZXQgdG8gdHJ1ZVxuICAgIH1cblxuICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgaXRlbXMgdG8gYWRkXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbXMpKSB7XG4gICAgICBpdGVtcy5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHRoaXMuYWRkSXRlbVRvRGF0YWdyaWQoaXRlbSwgaGlnaGxpZ2h0Um93LCBmYWxzZSwgZmFsc2UpKTtcbiAgICB9XG5cbiAgICAvLyBkbyB3ZSB3YW50IHRoZSBpdGVtIHRvIGJlIHNvcnRlZCBpbiB0aGUgZ3JpZCwgd2hlbiBzZXQgdG8gRmFsc2UgaXQgd2lsbCBpbnNlcnQgb24gZmlyc3Qgcm93IChkZWZhdWx0cyB0byBmYWxzZSlcbiAgICBpZiAoc2hvdWxkUmVzb3J0R3JpZCkge1xuICAgICAgdGhpcy5fZGF0YVZpZXcucmVTb3J0KCk7XG5cbiAgICAgIC8vIGlmIHVzZXIgd2FudGVkIHRvIHNlZSBoaWdobGlnaHRlZCByb3dcbiAgICAgIC8vIHdlIG5lZWQgdG8gZG8gaXQgaGVyZSBhZnRlciByZXNvcnQgYW5kIGdldCBlYWNoIHJvdyBudW1iZXIgYmVjYXVzZSBpdCBwb3NzaWJseSBjaGFuZ2VzIGFmdGVyIHRoZSBzb3J0XG4gICAgICBpZiAoc2hvdWxkSGlnaGxpZ2h0Um93KSB7XG4gICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJvd051bWJlciA9IHRoaXMuX2RhdGFWaWV3LmdldFJvd0J5SWQoaXRlbS5pZCk7XG4gICAgICAgICAgdGhpcy5oaWdobGlnaHRSb3cocm93TnVtYmVyLCAxNTAwKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZG8gd2Ugd2FudCB0byB0cmlnZ2VyIGFuIGV2ZW50IGFmdGVyIGFkZGluZyB0aGUgaXRlbVxuICAgIGlmIChzaG91bGRUcmlnZ2VyRXZlbnQpIHtcbiAgICAgIHRoaXMub25JdGVtQWRkZWQubmV4dChpdGVtcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhbiBleGlzdGluZyBpdGVtIGZyb20gdGhlIGRhdGFncmlkIChkYXRhVmlldylcbiAgICogQHBhcmFtIG9iamVjdCBpdGVtOiBpdGVtIG9iamVjdCBob2xkaW5nIGFsbCBwcm9wZXJ0aWVzIG9mIHRoYXQgcm93XG4gICAqIEBwYXJhbSBzaG91bGRUcmlnZ2VyRXZlbnQgZGVmYXVsdHMgdG8gdHJ1ZSwgd2hpY2ggd2lsbCB0cmlnZ2VyIGFuIGV2ZW50ICh1c2VkIGJ5IGF0IGxlYXN0IHRoZSBwYWdpbmF0aW9uIGNvbXBvbmVudClcbiAgICovXG4gIGRlbGV0ZURhdGFHcmlkSXRlbShpdGVtOiBhbnksIHNob3VsZFRyaWdnZXJFdmVudCA9IHRydWUpIHtcbiAgICBpZiAoIWl0ZW0gfHwgIWl0ZW0uaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgZGVsZXRlRGF0YUdyaWRJdGVtKCkgcmVxdWlyZXMgYW4gaXRlbSBvYmplY3Qgd2hpY2ggaW5jbHVkZXMgdGhlIFwiaWRcIiBwcm9wZXJ0eWApO1xuICAgIH1cbiAgICBjb25zdCBpdGVtSWQgPSAoIWl0ZW0gfHwgIWl0ZW0uaGFzT3duUHJvcGVydHkoJ2lkJykpID8gdW5kZWZpbmVkIDogaXRlbS5pZDtcbiAgICB0aGlzLmRlbGV0ZURhdGFHcmlkSXRlbUJ5SWQoaXRlbUlkLCBzaG91bGRUcmlnZ2VyRXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhbiBhcnJheSBvZiBleGlzdGluZyBpdGVtcyBmcm9tIHRoZSBkYXRhZ3JpZFxuICAgKiBAcGFyYW0gb2JqZWN0IGl0ZW06IGl0ZW0gb2JqZWN0IGhvbGRpbmcgYWxsIHByb3BlcnRpZXMgb2YgdGhhdCByb3dcbiAgICogQHBhcmFtIHNob3VsZFRyaWdnZXJFdmVudCBkZWZhdWx0cyB0byB0cnVlLCB3aGljaCB3aWxsIHRyaWdnZXIgYW4gZXZlbnQgKHVzZWQgYnkgYXQgbGVhc3QgdGhlIHBhZ2luYXRpb24gY29tcG9uZW50KVxuICAgKi9cbiAgZGVsZXRlRGF0YUdyaWRJdGVtcyhpdGVtczogYW55W10sIHNob3VsZFRyaWdnZXJFdmVudCA9IHRydWUpIHtcbiAgICAvLyB3aGVuIGl0J3Mgbm90IGFuIGFycmF5LCB3ZSBjYW4gY2FsbCBkaXJlY3RseSB0aGUgc2luZ2xlIGl0ZW0gZGVsZXRlXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGl0ZW1zKSkge1xuICAgICAgdGhpcy5kZWxldGVEYXRhR3JpZEl0ZW0oaXRlbXMpO1xuICAgIH1cbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHRoaXMuZGVsZXRlRGF0YUdyaWRJdGVtKGl0ZW0sIGZhbHNlKSk7XG5cbiAgICAvLyBkbyB3ZSB3YW50IHRvIHRyaWdnZXIgYW4gZXZlbnQgYWZ0ZXIgZGVsZXRpbmcgdGhlIGl0ZW1cbiAgICBpZiAoc2hvdWxkVHJpZ2dlckV2ZW50KSB7XG4gICAgICB0aGlzLm9uSXRlbURlbGV0ZWQubmV4dChpdGVtcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhbiBleGlzdGluZyBpdGVtIGZyb20gdGhlIGRhdGFncmlkIChkYXRhVmlldykgYnkgaXQncyBpZFxuICAgKiBAcGFyYW0gaXRlbUlkOiBpdGVtIHVuaXF1ZSBpZFxuICAgKiBAcGFyYW0gc2hvdWxkVHJpZ2dlckV2ZW50IGRlZmF1bHRzIHRvIHRydWUsIHdoaWNoIHdpbGwgdHJpZ2dlciBhbiBldmVudCAodXNlZCBieSBhdCBsZWFzdCB0aGUgcGFnaW5hdGlvbiBjb21wb25lbnQpXG4gICAqL1xuICBkZWxldGVEYXRhR3JpZEl0ZW1CeUlkKGl0ZW1JZDogc3RyaW5nIHwgbnVtYmVyLCBzaG91bGRUcmlnZ2VyRXZlbnQgPSB0cnVlKSB7XG4gICAgaWYgKGl0ZW1JZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBkZWxldGUgYSByb3cgd2l0aG91dCBhIHZhbGlkIFwiaWRcImApO1xuICAgIH1cblxuICAgIC8vIHdoZW4gdXNlciBoYXMgcm93IHNlbGVjdGlvbiBlbmFibGVkLCB3ZSBzaG91bGQgY2xlYXIgYW55IHNlbGVjdGlvbiB0byBhdm9pZCBjb25mdXNpb24gYWZ0ZXIgYSBkZWxldGVcbiAgICBpZiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkT3B0aW9ucyAmJiAodGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlQ2hlY2tib3hTZWxlY3RvciB8fCB0aGlzLl9ncmlkT3B0aW9ucy5lbmFibGVSb3dTZWxlY3Rpb24pKSB7XG4gICAgICB0aGlzLl9ncmlkLnNldFNlbGVjdGVkUm93cyhbXSk7XG4gICAgfVxuXG4gICAgLy8gZGVsZXRlIHRoZSBpdGVtIGZyb20gdGhlIGRhdGFWaWV3XG4gICAgdGhpcy5fZGF0YVZpZXcuZGVsZXRlSXRlbShpdGVtSWQpO1xuXG4gICAgLy8gZG8gd2Ugd2FudCB0byB0cmlnZ2VyIGFuIGV2ZW50IGFmdGVyIGRlbGV0aW5nIHRoZSBpdGVtXG4gICAgaWYgKHNob3VsZFRyaWdnZXJFdmVudCkge1xuICAgICAgdGhpcy5vbkl0ZW1EZWxldGVkLm5leHQoaXRlbUlkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGFuIGFycmF5IG9mIGV4aXN0aW5nIGl0ZW1zIGZyb20gdGhlIGRhdGFncmlkXG4gICAqIEBwYXJhbSBvYmplY3QgaXRlbTogaXRlbSBvYmplY3QgaG9sZGluZyBhbGwgcHJvcGVydGllcyBvZiB0aGF0IHJvd1xuICAgKiBAcGFyYW0gc2hvdWxkVHJpZ2dlckV2ZW50IGRlZmF1bHRzIHRvIHRydWUsIHdoaWNoIHdpbGwgdHJpZ2dlciBhbiBldmVudCAodXNlZCBieSBhdCBsZWFzdCB0aGUgcGFnaW5hdGlvbiBjb21wb25lbnQpXG4gICAqL1xuICBkZWxldGVEYXRhR3JpZEl0ZW1CeUlkcyhpdGVtSWRzOiBudW1iZXJbXSB8IHN0cmluZ1tdLCBzaG91bGRUcmlnZ2VyRXZlbnQgPSB0cnVlKSB7XG4gICAgLy8gd2hlbiBpdCdzIG5vdCBhbiBhcnJheSwgd2UgY2FuIGNhbGwgZGlyZWN0bHkgdGhlIHNpbmdsZSBpdGVtIGRlbGV0ZVxuICAgIGlmICghQXJyYXkuaXNBcnJheShpdGVtSWRzKSkge1xuICAgICAgdGhpcy5kZWxldGVEYXRhR3JpZEl0ZW1CeUlkKGl0ZW1JZHMpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1JZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpdGVtSWRzW2ldICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuZGVsZXRlRGF0YUdyaWRJdGVtQnlJZChpdGVtSWRzW2ldLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZG8gd2Ugd2FudCB0byB0cmlnZ2VyIGFuIGV2ZW50IGFmdGVyIGRlbGV0aW5nIHRoZSBpdGVtXG4gICAgaWYgKHNob3VsZFRyaWdnZXJFdmVudCkge1xuICAgICAgdGhpcy5vbkl0ZW1EZWxldGVkLm5leHQoaXRlbUlkcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhbiBleGlzdGluZyBpdGVtIHdpdGggbmV3IHByb3BlcnRpZXMgaW5zaWRlIHRoZSBkYXRhZ3JpZFxuICAgKiBAcGFyYW0gb2JqZWN0IGl0ZW06IGl0ZW0gb2JqZWN0IGhvbGRpbmcgYWxsIHByb3BlcnRpZXMgb2YgdGhhdCByb3dcbiAgICogQHBhcmFtIHNob3VsZEhpZ2hsaWdodFJvdyBkbyB3ZSB3YW50IHRvIGhpZ2hsaWdodCB0aGUgcm93IGFmdGVyIHVwZGF0ZVxuICAgKiBAcGFyYW0gc2hvdWxkVHJpZ2dlckV2ZW50IGRlZmF1bHRzIHRvIHRydWUsIHdoaWNoIHdpbGwgdHJpZ2dlciBhbiBldmVudCAodXNlZCBieSBhdCBsZWFzdCB0aGUgcGFnaW5hdGlvbiBjb21wb25lbnQpXG4gICAqIEByZXR1cm4gZ3JpZCByb3cgaW5kZXhcbiAgICovXG4gIHVwZGF0ZURhdGFHcmlkSXRlbShpdGVtOiBhbnksIHNob3VsZEhpZ2hsaWdodFJvdyA9IHRydWUsIHNob3VsZFRyaWdnZXJFdmVudCA9IHRydWUpIHtcbiAgICBjb25zdCBpdGVtSWQgPSAoIWl0ZW0gfHwgIWl0ZW0uaGFzT3duUHJvcGVydHkoJ2lkJykpID8gdW5kZWZpbmVkIDogaXRlbS5pZDtcblxuICAgIGlmIChpdGVtSWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCB0aGUgaXRlbSBpbiB0aGUgZ3JpZCBvciBpdCdzIGFzc29jaWF0ZWQgXCJpZFwiYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMudXBkYXRlRGF0YUdyaWRJdGVtQnlJZChpdGVtSWQsIGl0ZW0sIHNob3VsZEhpZ2hsaWdodFJvdywgc2hvdWxkVHJpZ2dlckV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW4gYXJyYXkgb2YgZXhpc3RpbmcgaXRlbXMgd2l0aCBuZXcgcHJvcGVydGllcyBpbnNpZGUgdGhlIGRhdGFncmlkXG4gICAqIEBwYXJhbSBvYmplY3QgaXRlbTogYXJyYXkgb2YgaXRlbSBvYmplY3RzXG4gICAqIEBwYXJhbSBzaG91bGRIaWdobGlnaHRSb3cgZG8gd2Ugd2FudCB0byBoaWdobGlnaHQgdGhlIHJvdyBhZnRlciB1cGRhdGVcbiAgICogQHBhcmFtIHNob3VsZFRyaWdnZXJFdmVudCBkZWZhdWx0cyB0byB0cnVlLCB3aGljaCB3aWxsIHRyaWdnZXIgYW4gZXZlbnQgKHVzZWQgYnkgYXQgbGVhc3QgdGhlIHBhZ2luYXRpb24gY29tcG9uZW50KVxuICAgKi9cbiAgdXBkYXRlRGF0YUdyaWRJdGVtcyhpdGVtczogYW55IHwgYW55W10sIHNob3VsZEhpZ2hsaWdodFJvdyA9IHRydWUsIHNob3VsZFRyaWdnZXJFdmVudCA9IHRydWUpIHtcbiAgICAvLyB3aGVuIGl0J3Mgbm90IGFuIGFycmF5LCB3ZSBjYW4gY2FsbCBkaXJlY3RseSB0aGUgc2luZ2xlIGl0ZW0gdXBkYXRlXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGl0ZW1zKSkge1xuICAgICAgdGhpcy51cGRhdGVEYXRhR3JpZEl0ZW0oaXRlbXMsIHNob3VsZEhpZ2hsaWdodFJvdyk7XG4gICAgfVxuXG4gICAgY29uc3QgZ3JpZEluZGV4ZXM6IG51bWJlcltdID0gW107XG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XG4gICAgICBncmlkSW5kZXhlcy5wdXNoKHRoaXMudXBkYXRlRGF0YUdyaWRJdGVtKGl0ZW0sIGZhbHNlLCBmYWxzZSkpO1xuICAgIH0pO1xuXG4gICAgLy8gb25seSBoaWdobGlnaHQgYXQgdGhlIGVuZCwgYWxsIGF0IG9uY2VcbiAgICAvLyB3ZSBoYXZlIHRvIGRvIHRoaXMgYmVjYXVzZSBkb2luZyBoaWdobGlnaHQgMSBieSAxIHdvdWxkIG9ubHkgcmUtc2VsZWN0IHRoZSBsYXN0IGhpZ2hsaWdodGVkIHJvdyB3aGljaCBpcyB3cm9uZyBiZWhhdmlvclxuICAgIGlmIChzaG91bGRIaWdobGlnaHRSb3cpIHtcbiAgICAgIHRoaXMuaGlnaGxpZ2h0Um93KGdyaWRJbmRleGVzKTtcbiAgICB9XG5cbiAgICAvLyBkbyB3ZSB3YW50IHRvIHRyaWdnZXIgYW4gZXZlbnQgYWZ0ZXIgdXBkYXRpbmcgdGhlIGl0ZW1cbiAgICBpZiAoc2hvdWxkVHJpZ2dlckV2ZW50KSB7XG4gICAgICB0aGlzLm9uSXRlbVVwZGF0ZWQubmV4dChpdGVtcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhbiBleGlzdGluZyBpdGVtIGluIHRoZSBkYXRhZ3JpZCBieSBpdCdzIGlkIGFuZCBuZXcgcHJvcGVydGllc1xuICAgKiBAcGFyYW0gaXRlbUlkOiBpdGVtIHVuaXF1ZSBpZFxuICAgKiBAcGFyYW0gb2JqZWN0IGl0ZW06IGl0ZW0gb2JqZWN0IGhvbGRpbmcgYWxsIHByb3BlcnRpZXMgb2YgdGhhdCByb3dcbiAgICogQHBhcmFtIHNob3VsZEhpZ2hsaWdodFJvdyBkbyB3ZSB3YW50IHRvIGhpZ2hsaWdodCB0aGUgcm93IGFmdGVyIHVwZGF0ZVxuICAgKiBAcGFyYW0gc2hvdWxkVHJpZ2dlckV2ZW50IGRlZmF1bHRzIHRvIHRydWUsIHdoaWNoIHdpbGwgdHJpZ2dlciBhbiBldmVudCAodXNlZCBieSBhdCBsZWFzdCB0aGUgcGFnaW5hdGlvbiBjb21wb25lbnQpXG4gICAqIEByZXR1cm4gZ3JpZCByb3cgaW5kZXhcbiAgICovXG4gIHVwZGF0ZURhdGFHcmlkSXRlbUJ5SWQoaXRlbUlkOiBudW1iZXIgfCBzdHJpbmcsIGl0ZW06IGFueSwgc2hvdWxkSGlnaGxpZ2h0Um93ID0gdHJ1ZSwgc2hvdWxkVHJpZ2dlckV2ZW50ID0gdHJ1ZSkge1xuICAgIGlmIChpdGVtSWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgdXBkYXRlIGEgcm93IHdpdGhvdXQgYSB2YWxpZCBcImlkXCJgKTtcbiAgICB9XG4gICAgY29uc3Qgcm93TnVtYmVyID0gdGhpcy5fZGF0YVZpZXcuZ2V0Um93QnlJZChpdGVtSWQpO1xuXG4gICAgaWYgKCFpdGVtIHx8IHJvd051bWJlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIHRoZSBpdGVtIGluIHRoZSBncmlkIG9yIGl0J3MgYXNzb2NpYXRlZCBcImlkXCJgKTtcbiAgICB9XG5cbiAgICBjb25zdCBncmlkSWR4ID0gdGhpcy5fZGF0YVZpZXcuZ2V0SWR4QnlJZChpdGVtSWQpO1xuICAgIGlmIChncmlkSWR4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIFVwZGF0ZSB0aGUgaXRlbSBpdHNlbGYgaW5zaWRlIHRoZSBkYXRhVmlld1xuICAgICAgdGhpcy5fZGF0YVZpZXcudXBkYXRlSXRlbShpdGVtSWQsIGl0ZW0pO1xuICAgICAgdGhpcy5fZ3JpZC51cGRhdGVSb3cocm93TnVtYmVyKTtcblxuICAgICAgLy8gaGlnaGxpZ2h0IHRoZSByb3cgd2UganVzdCB1cGRhdGVkLCBpZiBkZWZpbmVkXG4gICAgICBpZiAoc2hvdWxkSGlnaGxpZ2h0Um93KSB7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0Um93KHJvd051bWJlciwgMTUwMCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGRvIHdlIHdhbnQgdG8gdHJpZ2dlciBhbiBldmVudCBhZnRlciB1cGRhdGluZyB0aGUgaXRlbVxuICAgICAgaWYgKHNob3VsZFRyaWdnZXJFdmVudCkge1xuICAgICAgICB0aGlzLm9uSXRlbVVwZGF0ZWQubmV4dChpdGVtKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGdyaWRJZHg7XG4gICAgfVxuICB9XG59XG4iXX0=