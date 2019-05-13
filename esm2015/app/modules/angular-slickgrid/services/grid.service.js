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
export class GridService {
    /**
     * @param {?} extensionService
     * @param {?} filterService
     * @param {?} gridStateService
     * @param {?} sortService
     * @param {?} translate
     */
    constructor(extensionService, filterService, gridStateService, sortService, translate) {
        this.extensionService = extensionService;
        this.filterService = filterService;
        this.gridStateService = gridStateService;
        this.sortService = sortService;
        this.translate = translate;
        this.onItemAdded = new Subject();
        this.onItemDeleted = new Subject();
        this.onItemUpdated = new Subject();
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
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    init(grid, dataView) {
        this._grid = grid;
        this._dataView = dataView;
    }
    /**
     * Clear all Filters & Sorts
     * @return {?}
     */
    clearAllFiltersAndSorts() {
        // call both clear Filters & Sort but only trigger the last one to avoid sending multiple backend queries
        if (this.sortService && this.sortService.clearSorting) {
            this.sortService.clearSorting(false); // skip event trigger on this one
        }
        if (this.filterService && this.filterService.clearFilters) {
            this.filterService.clearFilters();
        }
    }
    /**
     * From a SlickGrid Event triggered get the Column Definition and Item Data Context
     *
     * For example the SlickGrid onClick will return cell arguments when subscribing to it.
     * From these cellArgs, we want to get the Column Definition and Item Data
     * @param {?} args
     * @return {?} object with columnDef and dataContext
     */
    getColumnFromEventArguments(args) {
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
    }
    /**
     * Get data item by it's row index number
     * @param {?} rowNumber
     * @return {?}
     */
    getDataItemByRowNumber(rowNumber) {
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        return this._grid.getDataItem(rowNumber);
    }
    /**
     * Chain the item Metadata with our implementation of Metadata at given row index
     * @param {?} previousItemMetadata
     * @return {?}
     */
    getItemRowMetadataToHighlight(previousItemMetadata) {
        return (/**
         * @param {?} rowNumber
         * @return {?}
         */
        (rowNumber) => {
            /** @type {?} */
            const item = this._dataView.getItem(rowNumber);
            /** @type {?} */
            let meta = { cssClasses: '' };
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
                meta.cssClasses += ` ${item.rowClass}`;
                meta.cssClasses += ` row${rowNumber}`;
            }
            return meta;
        });
    }
    /**
     * Highlight then fade a row for x seconds.
     * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
     * @param {?} rowNumber
     * @param {?=} fadeDelay
     * @return {?}
     */
    highlightRow(rowNumber, fadeDelay = 1500) {
        // create a SelectionModel if there's not one yet
        if (!this._grid.getSelectionModel()) {
            /** @type {?} */
            const rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
            this._grid.setSelectionModel(rowSelectionPlugin);
        }
        /** @type {?} */
        const rowIndexes = Array.isArray(rowNumber) ? rowNumber : [rowNumber];
        this._grid.setSelectedRows(rowIndexes);
        if (Array.isArray(rowNumber)) {
            rowNumber.forEach((/**
             * @param {?} row
             * @return {?}
             */
            row => this.highlightRowByMetadata(row, fadeDelay)));
        }
        else {
            this.highlightRowByMetadata(rowNumber, fadeDelay);
        }
    }
    /**
     * @param {?} rowNumber
     * @param {?=} fadeDelay
     * @return {?}
     */
    highlightRowByMetadata(rowNumber, fadeDelay = 1500) {
        this._dataView.getItemMetadata = this.getItemRowMetadataToHighlight(this._dataView.getItemMetadata);
        /** @type {?} */
        const item = this._dataView.getItem(rowNumber);
        if (item && item.id) {
            item.rowClass = 'highlight';
            this._dataView.updateItem(item.id, item);
            /** @type {?} */
            const gridOptions = (/** @type {?} */ (this._grid.getOptions()));
            // highlight the row for a user defined timeout
            $(`#${gridOptions.gridId}`)
                .find(`.highlight.row${rowNumber}`)
                .first();
            // delete the row's CSS that was attached for highlighting
            setTimeout((/**
             * @return {?}
             */
            () => {
                if (item && item.id) {
                    delete item.rowClass;
                    /** @type {?} */
                    const gridIdx = this._dataView.getIdxById(item.id);
                    if (gridIdx !== undefined) {
                        this._dataView.updateItem(item.id, item);
                    }
                }
            }), fadeDelay + 10);
        }
    }
    /**
     * Get the Data Item from a grid row index
     * @param {?} index
     * @return {?}
     */
    getDataItemByRowIndex(index) {
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        return this._grid.getDataItem(index);
    }
    /**
     * Get the Data Item from an array of grid row indexes
     * @param {?} indexes
     * @return {?}
     */
    getDataItemByRowIndexes(indexes) {
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        /** @type {?} */
        const dataItems = [];
        if (Array.isArray(indexes)) {
            indexes.forEach((/**
             * @param {?} idx
             * @return {?}
             */
            (idx) => {
                dataItems.push(this._grid.getDataItem(idx));
            }));
        }
        return dataItems;
    }
    /**
     * Get the currently selected row indexes
     * @return {?}
     */
    getSelectedRows() {
        return this._grid.getSelectedRows();
    }
    /**
     * Get the currently selected rows item data
     * @return {?}
     */
    getSelectedRowsDataItem() {
        if (!this._grid || typeof this._grid.getSelectedRows !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        /** @type {?} */
        const selectedRowIndexes = this._grid.getSelectedRows();
        return this.getDataItemByRowIndexes(selectedRowIndexes);
    }
    /**
     * Select the selected row by a row index
     * @param {?} rowIndex
     * @return {?}
     */
    setSelectedRow(rowIndex) {
        this._grid.setSelectedRows([rowIndex]);
    }
    /**
     * Set selected rows with provided array of row indexes
     * @param {?} rowIndexes
     * @return {?}
     */
    setSelectedRows(rowIndexes) {
        this._grid.setSelectedRows(rowIndexes);
    }
    /**
     * Re-Render the Grid
     * @return {?}
     */
    renderGrid() {
        if (this._grid && typeof this._grid.invalidate === 'function') {
            this._grid.invalidate();
            this._grid.render();
        }
    }
    /**
     * Reset the grid to it's original state (clear any filters, sorting & pagination if exists) .
     * The column definitions could be passed as argument to reset (this can be used after a Grid State reset)
     * The reset will clear the Filters & Sort, then will reset the Columns to their original state
     * @param {?=} columnDefinitions
     * @return {?}
     */
    resetGrid(columnDefinitions) {
        // reset columns to original states & refresh the grid
        if (this._grid && this._dataView) {
            /** @type {?} */
            const originalColumns = this.extensionService.getAllColumns();
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
    }
    /**
     * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param {?} item
     * @param {?=} shouldHighlightRow do we want to highlight the row after adding item
     * @param {?=} shouldResortGrid defaults to false, do we want the item to be sorted after insert? When set to False, it will add item on first row (default)
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    addItemToDatagrid(item, shouldHighlightRow = true, shouldResortGrid = false, shouldTriggerEvent = true) {
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
                const rowNumber = this._dataView.getRowById(item.id);
                this.highlightRow(rowNumber, 1500);
            }
        }
        // do we want to trigger an event after adding the item
        if (shouldTriggerEvent) {
            this.onItemAdded.next(item);
        }
    }
    /**
     * Add item array (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param {?} items
     * @param {?=} shouldHighlightRow do we want to highlight the row after adding item
     * @param {?=} shouldResortGrid defaults to false, do we want the item to be sorted after insert? When set to False, it will add item on first row (default)
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    addItemsToDatagrid(items, shouldHighlightRow = true, shouldResortGrid = false, shouldTriggerEvent = true) {
        /** @type {?} */
        let highlightRow = shouldHighlightRow;
        if (shouldResortGrid) {
            highlightRow = false; // don't highlight until later when shouldResortGrid is set to true
        }
        // loop through all items to add
        if (Array.isArray(items)) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            (item) => this.addItemToDatagrid(item, highlightRow, false, false)));
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
                (item) => {
                    /** @type {?} */
                    const rowNumber = this._dataView.getRowById(item.id);
                    this.highlightRow(rowNumber, 1500);
                }));
            }
        }
        // do we want to trigger an event after adding the item
        if (shouldTriggerEvent) {
            this.onItemAdded.next(items);
        }
    }
    /**
     * Delete an existing item from the datagrid (dataView)
     * @param {?} item
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    deleteDataGridItem(item, shouldTriggerEvent = true) {
        if (!item || !item.hasOwnProperty('id')) {
            throw new Error(`deleteDataGridItem() requires an item object which includes the "id" property`);
        }
        /** @type {?} */
        const itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
        this.deleteDataGridItemById(itemId, shouldTriggerEvent);
    }
    /**
     * Delete an array of existing items from the datagrid
     * @param {?} items
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    deleteDataGridItems(items, shouldTriggerEvent = true) {
        // when it's not an array, we can call directly the single item delete
        if (!Array.isArray(items)) {
            this.deleteDataGridItem(items);
        }
        items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this.deleteDataGridItem(item, false)));
        // do we want to trigger an event after deleting the item
        if (shouldTriggerEvent) {
            this.onItemDeleted.next(items);
        }
    }
    /**
     * Delete an existing item from the datagrid (dataView) by it's id
     * @param {?} itemId
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    deleteDataGridItemById(itemId, shouldTriggerEvent = true) {
        if (itemId === undefined) {
            throw new Error(`Cannot delete a row without a valid "id"`);
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
    }
    /**
     * Delete an array of existing items from the datagrid
     * @param {?} itemIds
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    deleteDataGridItemByIds(itemIds, shouldTriggerEvent = true) {
        // when it's not an array, we can call directly the single item delete
        if (!Array.isArray(itemIds)) {
            this.deleteDataGridItemById(itemIds);
        }
        for (let i = 0; i < itemIds.length; i++) {
            if (itemIds[i] !== null) {
                this.deleteDataGridItemById(itemIds[i], false);
            }
        }
        // do we want to trigger an event after deleting the item
        if (shouldTriggerEvent) {
            this.onItemDeleted.next(itemIds);
        }
    }
    /**
     * Update an existing item with new properties inside the datagrid
     * @param {?} item
     * @param {?=} shouldHighlightRow do we want to highlight the row after update
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?} grid row index
     */
    updateDataGridItem(item, shouldHighlightRow = true, shouldTriggerEvent = true) {
        /** @type {?} */
        const itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
        if (itemId === undefined) {
            throw new Error(`Could not find the item in the grid or it's associated "id"`);
        }
        return this.updateDataGridItemById(itemId, item, shouldHighlightRow, shouldTriggerEvent);
    }
    /**
     * Update an array of existing items with new properties inside the datagrid
     * @param {?} items
     * @param {?=} shouldHighlightRow do we want to highlight the row after update
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?}
     */
    updateDataGridItems(items, shouldHighlightRow = true, shouldTriggerEvent = true) {
        // when it's not an array, we can call directly the single item update
        if (!Array.isArray(items)) {
            this.updateDataGridItem(items, shouldHighlightRow);
        }
        /** @type {?} */
        const gridIndexes = [];
        items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            gridIndexes.push(this.updateDataGridItem(item, false, false));
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
    }
    /**
     * Update an existing item in the datagrid by it's id and new properties
     * @param {?} itemId
     * @param {?} item
     * @param {?=} shouldHighlightRow do we want to highlight the row after update
     * @param {?=} shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return {?} grid row index
     */
    updateDataGridItemById(itemId, item, shouldHighlightRow = true, shouldTriggerEvent = true) {
        if (itemId === undefined) {
            throw new Error(`Cannot update a row without a valid "id"`);
        }
        /** @type {?} */
        const rowNumber = this._dataView.getRowById(itemId);
        if (!item || rowNumber === undefined) {
            throw new Error(`Could not find the item in the grid or it's associated "id"`);
        }
        /** @type {?} */
        const gridIdx = this._dataView.getIdxById(itemId);
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
    }
}
GridService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
GridService.ctorParameters = () => [
    { type: ExtensionService },
    { type: FilterService },
    { type: GridStateService },
    { type: SortService },
    { type: TranslateService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9ncmlkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBTy9CLE1BQU0sT0FBTyxXQUFXOzs7Ozs7OztJQU90QixZQUFvQixnQkFBa0MsRUFBVSxhQUE0QixFQUFVLGdCQUFrQyxFQUFVLFdBQXdCLEVBQVUsU0FBMkI7UUFBM0wscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFKL00sZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBZSxDQUFDO1FBQ3pDLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQWUsQ0FBQztRQUMzQyxrQkFBYSxHQUFHLElBQUksT0FBTyxFQUFlLENBQUM7SUFFd0ssQ0FBQzs7Ozs7O0lBR3BOLElBQVksWUFBWTtRQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FB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O1NBQzdEOztjQUNLLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFFbkQsSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ3BDLE1BQU0sSUFBSSxLQUFLLENBQUMsNkRBQTZELENBQUMsQ0FBQztTQUNoRjs7Y0FFSyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ2pELElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUN6Qiw2Q0FBNkM7WUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRWhDLGdEQUFnRDtZQUNoRCxJQUFJLGtCQUFrQixFQUFFO2dCQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNwQztZQUVELHlEQUF5RDtZQUN6RCxJQUFJLGtCQUFrQixFQUFFO2dCQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMvQjtZQUVELE9BQU8sT0FBTyxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQzs7O1lBOWNGLFVBQVU7Ozs7WUFWRixnQkFBZ0I7WUFDaEIsYUFBYTtZQUNiLGdCQUFnQjtZQUNoQixXQUFXO1lBTlgsZ0JBQWdCOzs7Ozs7O0lBZXZCLDRCQUFtQjs7Ozs7SUFDbkIsZ0NBQXVCOztJQUN2QixrQ0FBeUM7O0lBQ3pDLG9DQUEyQzs7SUFDM0Msb0NBQTJDOzs7OztJQUUvQix1Q0FBMEM7Ozs7O0lBQUUsb0NBQW9DOzs7OztJQUFFLHVDQUEwQzs7Ozs7SUFBRSxrQ0FBZ0M7Ozs7O0lBQUUsZ0NBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2VsbEFyZ3MsIENvbHVtbiwgR3JpZE9wdGlvbiwgT25FdmVudEFyZ3MgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBFeHRlbnNpb25TZXJ2aWNlIH0gZnJvbSAnLi9leHRlbnNpb24uc2VydmljZSc7XG5pbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9maWx0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBHcmlkU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi9ncmlkU3RhdGUuc2VydmljZSc7XG5pbXBvcnQgeyBTb3J0U2VydmljZSB9IGZyb20gJy4vc29ydC5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xuZGVjbGFyZSB2YXIgJDogYW55O1xuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdyaWRTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfZ3JpZDogYW55O1xuICBwcml2YXRlIF9kYXRhVmlldzogYW55O1xuICBvbkl0ZW1BZGRlZCA9IG5ldyBTdWJqZWN0PGFueSB8IGFueVtdPigpO1xuICBvbkl0ZW1EZWxldGVkID0gbmV3IFN1YmplY3Q8YW55IHwgYW55W10+KCk7XG4gIG9uSXRlbVVwZGF0ZWQgPSBuZXcgU3ViamVjdDxhbnkgfCBhbnlbXT4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4dGVuc2lvblNlcnZpY2U6IEV4dGVuc2lvblNlcnZpY2UsIHByaXZhdGUgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSwgcHJpdmF0ZSBncmlkU3RhdGVTZXJ2aWNlOiBHcmlkU3RhdGVTZXJ2aWNlLCBwcml2YXRlIHNvcnRTZXJ2aWNlOiBTb3J0U2VydmljZSwgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHsgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXG4gIHByaXZhdGUgZ2V0IF9ncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XG4gIH1cblxuICBpbml0KGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX2dyaWQgPSBncmlkO1xuICAgIHRoaXMuX2RhdGFWaWV3ID0gZGF0YVZpZXc7XG4gIH1cblxuICAvKiogQ2xlYXIgYWxsIEZpbHRlcnMgJiBTb3J0cyAqL1xuICBjbGVhckFsbEZpbHRlcnNBbmRTb3J0cygpIHtcbiAgICAvLyBjYWxsIGJvdGggY2xlYXIgRmlsdGVycyAmIFNvcnQgYnV0IG9ubHkgdHJpZ2dlciB0aGUgbGFzdCBvbmUgdG8gYXZvaWQgc2VuZGluZyBtdWx0aXBsZSBiYWNrZW5kIHF1ZXJpZXNcbiAgICBpZiAodGhpcy5zb3J0U2VydmljZSAmJiB0aGlzLnNvcnRTZXJ2aWNlLmNsZWFyU29ydGluZykge1xuICAgICAgdGhpcy5zb3J0U2VydmljZS5jbGVhclNvcnRpbmcoZmFsc2UpOyAvLyBza2lwIGV2ZW50IHRyaWdnZXIgb24gdGhpcyBvbmVcbiAgICB9XG4gICAgaWYgKHRoaXMuZmlsdGVyU2VydmljZSAmJiB0aGlzLmZpbHRlclNlcnZpY2UuY2xlYXJGaWx0ZXJzKSB7XG4gICAgICB0aGlzLmZpbHRlclNlcnZpY2UuY2xlYXJGaWx0ZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZyb20gYSBTbGlja0dyaWQgRXZlbnQgdHJpZ2dlcmVkIGdldCB0aGUgQ29sdW1uIERlZmluaXRpb24gYW5kIEl0ZW0gRGF0YSBDb250ZXh0XG4gICAqXG4gICAqIEZvciBleGFtcGxlIHRoZSBTbGlja0dyaWQgb25DbGljayB3aWxsIHJldHVybiBjZWxsIGFyZ3VtZW50cyB3aGVuIHN1YnNjcmliaW5nIHRvIGl0LlxuICAgKiBGcm9tIHRoZXNlIGNlbGxBcmdzLCB3ZSB3YW50IHRvIGdldCB0aGUgQ29sdW1uIERlZmluaXRpb24gYW5kIEl0ZW0gRGF0YVxuICAgKiBAcGFyYW0gY2VsbCBldmVudCBhcmdzXG4gICAqIEByZXR1cm4gb2JqZWN0IHdpdGggY29sdW1uRGVmIGFuZCBkYXRhQ29udGV4dFxuICAgKi9cbiAgZ2V0Q29sdW1uRnJvbUV2ZW50QXJndW1lbnRzKGFyZ3M6IENlbGxBcmdzKTogT25FdmVudEFyZ3Mge1xuICAgIGlmICghYXJncyB8fCAhYXJncy5ncmlkIHx8ICFhcmdzLmdyaWQuZ2V0Q29sdW1ucyB8fCAhYXJncy5ncmlkLmdldERhdGFJdGVtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RvIGdldCB0aGUgY29sdW1uIGRlZmluaXRpb24gYW5kIGRhdGEsIHdlIG5lZWQgdG8gaGF2ZSB0aGVzZSBhcmd1bWVudHMgcGFzc2VkIGFzIG9iamVjdHMgKHJvdywgY2VsbCwgZ3JpZCknKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcm93OiBhcmdzLnJvdyxcbiAgICAgIGNlbGw6IGFyZ3MuY2VsbCxcbiAgICAgIGNvbHVtbkRlZjogYXJncy5ncmlkLmdldENvbHVtbnMoKVthcmdzLmNlbGxdLFxuICAgICAgZGF0YUNvbnRleHQ6IGFyZ3MuZ3JpZC5nZXREYXRhSXRlbShhcmdzLnJvdyksXG4gICAgICBkYXRhVmlldzogdGhpcy5fZGF0YVZpZXcsXG4gICAgICBncmlkOiB0aGlzLl9ncmlkLFxuICAgICAgZ3JpZERlZmluaXRpb246IHRoaXMuX2dyaWRPcHRpb25zXG4gICAgfTtcbiAgfVxuXG4gIC8qKiBHZXQgZGF0YSBpdGVtIGJ5IGl0J3Mgcm93IGluZGV4IG51bWJlciAqL1xuICBnZXREYXRhSXRlbUJ5Um93TnVtYmVyKHJvd051bWJlcjogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLl9ncmlkIHx8IHR5cGVvZiB0aGlzLl9ncmlkLmdldERhdGFJdGVtICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlIGNvdWxkIG5vdCBmaW5kIFNsaWNrR3JpZCBHcmlkIG9iamVjdCcpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZ3JpZC5nZXREYXRhSXRlbShyb3dOdW1iZXIpO1xuICB9XG5cbiAgLyoqIENoYWluIHRoZSBpdGVtIE1ldGFkYXRhIHdpdGggb3VyIGltcGxlbWVudGF0aW9uIG9mIE1ldGFkYXRhIGF0IGdpdmVuIHJvdyBpbmRleCAqL1xuICBnZXRJdGVtUm93TWV0YWRhdGFUb0hpZ2hsaWdodChwcmV2aW91c0l0ZW1NZXRhZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIChyb3dOdW1iZXI6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgaXRlbSA9IHRoaXMuX2RhdGFWaWV3LmdldEl0ZW0ocm93TnVtYmVyKTtcbiAgICAgIGxldCBtZXRhID0geyBjc3NDbGFzc2VzOiAnJyB9O1xuICAgICAgaWYgKHR5cGVvZiBwcmV2aW91c0l0ZW1NZXRhZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBtZXRhID0gcHJldmlvdXNJdGVtTWV0YWRhdGEocm93TnVtYmVyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5fZGlydHkpIHtcbiAgICAgICAgbWV0YS5jc3NDbGFzc2VzID0gKG1ldGEgJiYgbWV0YS5jc3NDbGFzc2VzIHx8ICcnKSArICcgZGlydHknO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW1ldGEpIHtcbiAgICAgICAgbWV0YSA9IHsgY3NzQ2xhc3NlczogJycgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5yb3dDbGFzcyAmJiBtZXRhKSB7XG4gICAgICAgIG1ldGEuY3NzQ2xhc3NlcyArPSBgICR7aXRlbS5yb3dDbGFzc31gO1xuICAgICAgICBtZXRhLmNzc0NsYXNzZXMgKz0gYCByb3cke3Jvd051bWJlcn1gO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWV0YTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZ2hsaWdodCB0aGVuIGZhZGUgYSByb3cgZm9yIHggc2Vjb25kcy5cbiAgICogVGhlIGltcGxlbWVudGF0aW9uIGZvbGxvd3MgdGhpcyBTTyBhbnN3ZXI6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xOTk4NTE0OC8xMjEyMTY2XG4gICAqIEBwYXJhbSByb3dOdW1iZXJcbiAgICogQHBhcmFtIGZhZGVEZWxheVxuICAgKi9cbiAgaGlnaGxpZ2h0Um93KHJvd051bWJlcjogbnVtYmVyIHwgbnVtYmVyW10sIGZhZGVEZWxheTogbnVtYmVyID0gMTUwMCkge1xuICAgIC8vIGNyZWF0ZSBhIFNlbGVjdGlvbk1vZGVsIGlmIHRoZXJlJ3Mgbm90IG9uZSB5ZXRcbiAgICBpZiAoIXRoaXMuX2dyaWQuZ2V0U2VsZWN0aW9uTW9kZWwoKSkge1xuICAgICAgY29uc3Qgcm93U2VsZWN0aW9uUGx1Z2luID0gbmV3IFNsaWNrLlJvd1NlbGVjdGlvbk1vZGVsKHRoaXMuX2dyaWRPcHRpb25zLnJvd1NlbGVjdGlvbk9wdGlvbnMgfHwge30pO1xuICAgICAgdGhpcy5fZ3JpZC5zZXRTZWxlY3Rpb25Nb2RlbChyb3dTZWxlY3Rpb25QbHVnaW4pO1xuICAgIH1cblxuICAgIGNvbnN0IHJvd0luZGV4ZXMgPSBBcnJheS5pc0FycmF5KHJvd051bWJlcikgPyByb3dOdW1iZXIgOiBbcm93TnVtYmVyXTtcbiAgICB0aGlzLl9ncmlkLnNldFNlbGVjdGVkUm93cyhyb3dJbmRleGVzKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHJvd051bWJlcikpIHtcbiAgICAgIHJvd051bWJlci5mb3JFYWNoKHJvdyA9PiB0aGlzLmhpZ2hsaWdodFJvd0J5TWV0YWRhdGEocm93LCBmYWRlRGVsYXkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oaWdobGlnaHRSb3dCeU1ldGFkYXRhKHJvd051bWJlciwgZmFkZURlbGF5KTtcbiAgICB9XG4gIH1cblxuICBoaWdobGlnaHRSb3dCeU1ldGFkYXRhKHJvd051bWJlcjogbnVtYmVyLCBmYWRlRGVsYXk6IG51bWJlciA9IDE1MDApIHtcbiAgICB0aGlzLl9kYXRhVmlldy5nZXRJdGVtTWV0YWRhdGEgPSB0aGlzLmdldEl0ZW1Sb3dNZXRhZGF0YVRvSGlnaGxpZ2h0KHRoaXMuX2RhdGFWaWV3LmdldEl0ZW1NZXRhZGF0YSk7XG5cbiAgICBjb25zdCBpdGVtID0gdGhpcy5fZGF0YVZpZXcuZ2V0SXRlbShyb3dOdW1iZXIpO1xuICAgIGlmIChpdGVtICYmIGl0ZW0uaWQpIHtcbiAgICAgIGl0ZW0ucm93Q2xhc3MgPSAnaGlnaGxpZ2h0JztcbiAgICAgIHRoaXMuX2RhdGFWaWV3LnVwZGF0ZUl0ZW0oaXRlbS5pZCwgaXRlbSk7XG4gICAgICBjb25zdCBncmlkT3B0aW9ucyA9IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIGFzIEdyaWRPcHRpb247XG5cbiAgICAgIC8vIGhpZ2hsaWdodCB0aGUgcm93IGZvciBhIHVzZXIgZGVmaW5lZCB0aW1lb3V0XG4gICAgICAkKGAjJHtncmlkT3B0aW9ucy5ncmlkSWR9YClcbiAgICAgICAgLmZpbmQoYC5oaWdobGlnaHQucm93JHtyb3dOdW1iZXJ9YClcbiAgICAgICAgLmZpcnN0KCk7XG5cbiAgICAgIC8vIGRlbGV0ZSB0aGUgcm93J3MgQ1NTIHRoYXQgd2FzIGF0dGFjaGVkIGZvciBoaWdobGlnaHRpbmdcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLmlkKSB7XG4gICAgICAgICAgZGVsZXRlIGl0ZW0ucm93Q2xhc3M7XG4gICAgICAgICAgY29uc3QgZ3JpZElkeCA9IHRoaXMuX2RhdGFWaWV3LmdldElkeEJ5SWQoaXRlbS5pZCk7XG4gICAgICAgICAgaWYgKGdyaWRJZHggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5fZGF0YVZpZXcudXBkYXRlSXRlbShpdGVtLmlkLCBpdGVtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIGZhZGVEZWxheSArIDEwKTtcbiAgICB9XG4gIH1cblxuICAvKiogR2V0IHRoZSBEYXRhIEl0ZW0gZnJvbSBhIGdyaWQgcm93IGluZGV4ICovXG4gIGdldERhdGFJdGVtQnlSb3dJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLl9ncmlkIHx8IHR5cGVvZiB0aGlzLl9ncmlkLmdldERhdGFJdGVtICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlIGNvdWxkIG5vdCBmaW5kIFNsaWNrR3JpZCBHcmlkIG9iamVjdCcpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9ncmlkLmdldERhdGFJdGVtKGluZGV4KTtcbiAgfVxuXG4gIC8qKiBHZXQgdGhlIERhdGEgSXRlbSBmcm9tIGFuIGFycmF5IG9mIGdyaWQgcm93IGluZGV4ZXMgKi9cbiAgZ2V0RGF0YUl0ZW1CeVJvd0luZGV4ZXMoaW5kZXhlczogbnVtYmVyW10pIHtcbiAgICBpZiAoIXRoaXMuX2dyaWQgfHwgdHlwZW9mIHRoaXMuX2dyaWQuZ2V0RGF0YUl0ZW0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2UgY291bGQgbm90IGZpbmQgU2xpY2tHcmlkIEdyaWQgb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YUl0ZW1zID0gW107XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShpbmRleGVzKSkge1xuICAgICAgaW5kZXhlcy5mb3JFYWNoKChpZHgpID0+IHtcbiAgICAgICAgZGF0YUl0ZW1zLnB1c2godGhpcy5fZ3JpZC5nZXREYXRhSXRlbShpZHgpKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhSXRlbXM7XG4gIH1cblxuICAvKiogR2V0IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgcm93IGluZGV4ZXMgKi9cbiAgZ2V0U2VsZWN0ZWRSb3dzKCkge1xuICAgIHJldHVybiB0aGlzLl9ncmlkLmdldFNlbGVjdGVkUm93cygpO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHJvd3MgaXRlbSBkYXRhICovXG4gIGdldFNlbGVjdGVkUm93c0RhdGFJdGVtKCkge1xuICAgIGlmICghdGhpcy5fZ3JpZCB8fCB0eXBlb2YgdGhpcy5fZ3JpZC5nZXRTZWxlY3RlZFJvd3MgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2UgY291bGQgbm90IGZpbmQgU2xpY2tHcmlkIEdyaWQgb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VsZWN0ZWRSb3dJbmRleGVzID0gdGhpcy5fZ3JpZC5nZXRTZWxlY3RlZFJvd3MoKTtcbiAgICByZXR1cm4gdGhpcy5nZXREYXRhSXRlbUJ5Um93SW5kZXhlcyhzZWxlY3RlZFJvd0luZGV4ZXMpO1xuICB9XG5cbiAgLyoqIFNlbGVjdCB0aGUgc2VsZWN0ZWQgcm93IGJ5IGEgcm93IGluZGV4ICovXG4gIHNldFNlbGVjdGVkUm93KHJvd0luZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9ncmlkLnNldFNlbGVjdGVkUm93cyhbcm93SW5kZXhdKTtcbiAgfVxuXG4gIC8qKiBTZXQgc2VsZWN0ZWQgcm93cyB3aXRoIHByb3ZpZGVkIGFycmF5IG9mIHJvdyBpbmRleGVzICovXG4gIHNldFNlbGVjdGVkUm93cyhyb3dJbmRleGVzOiBudW1iZXJbXSkge1xuICAgIHRoaXMuX2dyaWQuc2V0U2VsZWN0ZWRSb3dzKHJvd0luZGV4ZXMpO1xuICB9XG5cbiAgLyoqIFJlLVJlbmRlciB0aGUgR3JpZCAqL1xuICByZW5kZXJHcmlkKCkge1xuICAgIGlmICh0aGlzLl9ncmlkICYmIHR5cGVvZiB0aGlzLl9ncmlkLmludmFsaWRhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuX2dyaWQuaW52YWxpZGF0ZSgpO1xuICAgICAgdGhpcy5fZ3JpZC5yZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIGdyaWQgdG8gaXQncyBvcmlnaW5hbCBzdGF0ZSAoY2xlYXIgYW55IGZpbHRlcnMsIHNvcnRpbmcgJiBwYWdpbmF0aW9uIGlmIGV4aXN0cykgLlxuICAgKiBUaGUgY29sdW1uIGRlZmluaXRpb25zIGNvdWxkIGJlIHBhc3NlZCBhcyBhcmd1bWVudCB0byByZXNldCAodGhpcyBjYW4gYmUgdXNlZCBhZnRlciBhIEdyaWQgU3RhdGUgcmVzZXQpXG4gICAqIFRoZSByZXNldCB3aWxsIGNsZWFyIHRoZSBGaWx0ZXJzICYgU29ydCwgdGhlbiB3aWxsIHJlc2V0IHRoZSBDb2x1bW5zIHRvIHRoZWlyIG9yaWdpbmFsIHN0YXRlXG4gICAqL1xuICByZXNldEdyaWQoY29sdW1uRGVmaW5pdGlvbnM/OiBDb2x1bW5bXSkge1xuICAgIC8vIHJlc2V0IGNvbHVtbnMgdG8gb3JpZ2luYWwgc3RhdGVzICYgcmVmcmVzaCB0aGUgZ3JpZFxuICAgIGlmICh0aGlzLl9ncmlkICYmIHRoaXMuX2RhdGFWaWV3KSB7XG4gICAgICBjb25zdCBvcmlnaW5hbENvbHVtbnMgPSB0aGlzLmV4dGVuc2lvblNlcnZpY2UuZ2V0QWxsQ29sdW1ucygpO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3JpZ2luYWxDb2x1bW5zKSAmJiBvcmlnaW5hbENvbHVtbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBzZXQgdGhlIGdyaWQgY29sdW1ucyB0byBpdCdzIG9yaWdpbmFsIGNvbHVtbiBkZWZpbml0aW9uc1xuICAgICAgICB0aGlzLl9ncmlkLnNldENvbHVtbnMob3JpZ2luYWxDb2x1bW5zKTtcbiAgICAgICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZUF1dG9TaXplQ29sdW1ucykge1xuICAgICAgICAgIHRoaXMuX2dyaWQuYXV0b3NpemVDb2x1bW5zKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ncmlkU3RhdGVTZXJ2aWNlLnJlc2V0Q29sdW1ucyhjb2x1bW5EZWZpbml0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmZpbHRlclNlcnZpY2UgJiYgdGhpcy5maWx0ZXJTZXJ2aWNlLmNsZWFyRmlsdGVycykge1xuICAgICAgdGhpcy5maWx0ZXJTZXJ2aWNlLmNsZWFyRmlsdGVycygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zb3J0U2VydmljZSAmJiB0aGlzLnNvcnRTZXJ2aWNlLmNsZWFyU29ydGluZykge1xuICAgICAgdGhpcy5zb3J0U2VydmljZS5jbGVhclNvcnRpbmcoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIGl0ZW0gKGRhdGEgaXRlbSkgdG8gdGhlIGRhdGFncmlkLCBieSBkZWZhdWx0IGl0IHdpbGwgaGlnaGxpZ2h0IChmbGFzaGluZykgdGhlIGluc2VydGVkIHJvdyBidXQgd2UgY2FuIGRpc2FibGUgaXQgdG9vXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YUl0ZW06IGl0ZW0gb2JqZWN0IGhvbGRpbmcgYWxsIHByb3BlcnRpZXMgb2YgdGhhdCByb3dcbiAgICogQHBhcmFtIHNob3VsZEhpZ2hsaWdodFJvdyBkbyB3ZSB3YW50IHRvIGhpZ2hsaWdodCB0aGUgcm93IGFmdGVyIGFkZGluZyBpdGVtXG4gICAqIEBwYXJhbSBzaG91bGRSZXNvcnRHcmlkIGRlZmF1bHRzIHRvIGZhbHNlLCBkbyB3ZSB3YW50IHRoZSBpdGVtIHRvIGJlIHNvcnRlZCBhZnRlciBpbnNlcnQ/IFdoZW4gc2V0IHRvIEZhbHNlLCBpdCB3aWxsIGFkZCBpdGVtIG9uIGZpcnN0IHJvdyAoZGVmYXVsdClcbiAgICogQHBhcmFtIHNob3VsZFRyaWdnZXJFdmVudCBkZWZhdWx0cyB0byB0cnVlLCB3aGljaCB3aWxsIHRyaWdnZXIgYW4gZXZlbnQgKHVzZWQgYnkgYXQgbGVhc3QgdGhlIHBhZ2luYXRpb24gY29tcG9uZW50KVxuICAgKi9cbiAgYWRkSXRlbVRvRGF0YWdyaWQoaXRlbTogYW55LCBzaG91bGRIaWdobGlnaHRSb3cgPSB0cnVlLCBzaG91bGRSZXNvcnRHcmlkID0gZmFsc2UsIHNob3VsZFRyaWdnZXJFdmVudCA9IHRydWUpIHtcbiAgICBpZiAoIXRoaXMuX2dyaWQgfHwgIXRoaXMuX2dyaWRPcHRpb25zIHx8ICF0aGlzLl9kYXRhVmlldykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZSBjb3VsZCBub3QgZmluZCBTbGlja0dyaWQgR3JpZCwgRGF0YVZpZXcgb2JqZWN0cycpO1xuICAgIH1cblxuICAgIHRoaXMuX2RhdGFWaWV3Lmluc2VydEl0ZW0oMCwgaXRlbSk7IC8vIGluc2VydCBhdCBpbmRleCAwXG5cbiAgICBpZiAoIXNob3VsZFJlc29ydEdyaWQpIHtcbiAgICAgIHRoaXMuX2dyaWQuc2Nyb2xsUm93SW50b1ZpZXcoMCk7IC8vIHNjcm9sbCB0byByb3cgMFxuICAgIH1cblxuICAgIC8vIGhpZ2hsaWdodCB0aGUgcm93IHdlIGp1c3QgYWRkZWQsIGlmIGhpZ2hsaWdodCBpcyBkZWZpbmVkXG4gICAgaWYgKHNob3VsZEhpZ2hsaWdodFJvdyAmJiAhc2hvdWxkUmVzb3J0R3JpZCkge1xuICAgICAgdGhpcy5oaWdobGlnaHRSb3coMCwgMTUwMCk7XG4gICAgfVxuXG4gICAgLy8gZG8gd2Ugd2FudCB0aGUgaXRlbSB0byBiZSBzb3J0ZWQgaW4gdGhlIGdyaWQsIHdoZW4gc2V0IHRvIEZhbHNlIGl0IHdpbGwgaW5zZXJ0IG9uIGZpcnN0IHJvdyAoZGVmYXVsdHMgdG8gZmFsc2UpXG4gICAgaWYgKHNob3VsZFJlc29ydEdyaWQpIHtcbiAgICAgIHRoaXMuX2RhdGFWaWV3LnJlU29ydCgpO1xuXG4gICAgICAvLyBpZiB1c2VyIHdhbnRlZCB0byBzZWUgaGlnaGxpZ2h0ZWQgcm93XG4gICAgICAvLyB3ZSBuZWVkIHRvIGRvIGl0IGhlcmUgYWZ0ZXIgcmVzb3J0IGFuZCBnZXQgZWFjaCByb3cgbnVtYmVyIGJlY2F1c2UgaXQgcG9zc2libHkgY2hhbmdlcyBhZnRlciB0aGUgc29ydFxuICAgICAgaWYgKHNob3VsZEhpZ2hsaWdodFJvdykge1xuICAgICAgICBjb25zdCByb3dOdW1iZXIgPSB0aGlzLl9kYXRhVmlldy5nZXRSb3dCeUlkKGl0ZW0uaWQpO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodFJvdyhyb3dOdW1iZXIsIDE1MDApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRvIHdlIHdhbnQgdG8gdHJpZ2dlciBhbiBldmVudCBhZnRlciBhZGRpbmcgdGhlIGl0ZW1cbiAgICBpZiAoc2hvdWxkVHJpZ2dlckV2ZW50KSB7XG4gICAgICB0aGlzLm9uSXRlbUFkZGVkLm5leHQoaXRlbSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBpdGVtIGFycmF5IChkYXRhIGl0ZW0pIHRvIHRoZSBkYXRhZ3JpZCwgYnkgZGVmYXVsdCBpdCB3aWxsIGhpZ2hsaWdodCAoZmxhc2hpbmcpIHRoZSBpbnNlcnRlZCByb3cgYnV0IHdlIGNhbiBkaXNhYmxlIGl0IHRvb1xuICAgKiBAcGFyYW0gZGF0YUl0ZW0gYXJyYXk6IGl0ZW0gb2JqZWN0IGhvbGRpbmcgYWxsIHByb3BlcnRpZXMgb2YgdGhhdCByb3dcbiAgICogQHBhcmFtIHNob3VsZEhpZ2hsaWdodFJvdyBkbyB3ZSB3YW50IHRvIGhpZ2hsaWdodCB0aGUgcm93IGFmdGVyIGFkZGluZyBpdGVtXG4gICAqIEBwYXJhbSBzaG91bGRSZXNvcnRHcmlkIGRlZmF1bHRzIHRvIGZhbHNlLCBkbyB3ZSB3YW50IHRoZSBpdGVtIHRvIGJlIHNvcnRlZCBhZnRlciBpbnNlcnQ/IFdoZW4gc2V0IHRvIEZhbHNlLCBpdCB3aWxsIGFkZCBpdGVtIG9uIGZpcnN0IHJvdyAoZGVmYXVsdClcbiAgICogQHBhcmFtIHNob3VsZFRyaWdnZXJFdmVudCBkZWZhdWx0cyB0byB0cnVlLCB3aGljaCB3aWxsIHRyaWdnZXIgYW4gZXZlbnQgKHVzZWQgYnkgYXQgbGVhc3QgdGhlIHBhZ2luYXRpb24gY29tcG9uZW50KVxuICAgKi9cbiAgYWRkSXRlbXNUb0RhdGFncmlkKGl0ZW1zOiBhbnlbXSwgc2hvdWxkSGlnaGxpZ2h0Um93ID0gdHJ1ZSwgc2hvdWxkUmVzb3J0R3JpZCA9IGZhbHNlLCBzaG91bGRUcmlnZ2VyRXZlbnQgPSB0cnVlKSB7XG4gICAgbGV0IGhpZ2hsaWdodFJvdyA9IHNob3VsZEhpZ2hsaWdodFJvdztcbiAgICBpZiAoc2hvdWxkUmVzb3J0R3JpZCkge1xuICAgICAgaGlnaGxpZ2h0Um93ID0gZmFsc2U7IC8vIGRvbid0IGhpZ2hsaWdodCB1bnRpbCBsYXRlciB3aGVuIHNob3VsZFJlc29ydEdyaWQgaXMgc2V0IHRvIHRydWVcbiAgICB9XG5cbiAgICAvLyBsb29wIHRocm91Z2ggYWxsIGl0ZW1zIHRvIGFkZFxuICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW1zKSkge1xuICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB0aGlzLmFkZEl0ZW1Ub0RhdGFncmlkKGl0ZW0sIGhpZ2hsaWdodFJvdywgZmFsc2UsIGZhbHNlKSk7XG4gICAgfVxuXG4gICAgLy8gZG8gd2Ugd2FudCB0aGUgaXRlbSB0byBiZSBzb3J0ZWQgaW4gdGhlIGdyaWQsIHdoZW4gc2V0IHRvIEZhbHNlIGl0IHdpbGwgaW5zZXJ0IG9uIGZpcnN0IHJvdyAoZGVmYXVsdHMgdG8gZmFsc2UpXG4gICAgaWYgKHNob3VsZFJlc29ydEdyaWQpIHtcbiAgICAgIHRoaXMuX2RhdGFWaWV3LnJlU29ydCgpO1xuXG4gICAgICAvLyBpZiB1c2VyIHdhbnRlZCB0byBzZWUgaGlnaGxpZ2h0ZWQgcm93XG4gICAgICAvLyB3ZSBuZWVkIHRvIGRvIGl0IGhlcmUgYWZ0ZXIgcmVzb3J0IGFuZCBnZXQgZWFjaCByb3cgbnVtYmVyIGJlY2F1c2UgaXQgcG9zc2libHkgY2hhbmdlcyBhZnRlciB0aGUgc29ydFxuICAgICAgaWYgKHNob3VsZEhpZ2hsaWdodFJvdykge1xuICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICBjb25zdCByb3dOdW1iZXIgPSB0aGlzLl9kYXRhVmlldy5nZXRSb3dCeUlkKGl0ZW0uaWQpO1xuICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0Um93KHJvd051bWJlciwgMTUwMCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRvIHdlIHdhbnQgdG8gdHJpZ2dlciBhbiBldmVudCBhZnRlciBhZGRpbmcgdGhlIGl0ZW1cbiAgICBpZiAoc2hvdWxkVHJpZ2dlckV2ZW50KSB7XG4gICAgICB0aGlzLm9uSXRlbUFkZGVkLm5leHQoaXRlbXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYW4gZXhpc3RpbmcgaXRlbSBmcm9tIHRoZSBkYXRhZ3JpZCAoZGF0YVZpZXcpXG4gICAqIEBwYXJhbSBvYmplY3QgaXRlbTogaXRlbSBvYmplY3QgaG9sZGluZyBhbGwgcHJvcGVydGllcyBvZiB0aGF0IHJvd1xuICAgKiBAcGFyYW0gc2hvdWxkVHJpZ2dlckV2ZW50IGRlZmF1bHRzIHRvIHRydWUsIHdoaWNoIHdpbGwgdHJpZ2dlciBhbiBldmVudCAodXNlZCBieSBhdCBsZWFzdCB0aGUgcGFnaW5hdGlvbiBjb21wb25lbnQpXG4gICAqL1xuICBkZWxldGVEYXRhR3JpZEl0ZW0oaXRlbTogYW55LCBzaG91bGRUcmlnZ2VyRXZlbnQgPSB0cnVlKSB7XG4gICAgaWYgKCFpdGVtIHx8ICFpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGRlbGV0ZURhdGFHcmlkSXRlbSgpIHJlcXVpcmVzIGFuIGl0ZW0gb2JqZWN0IHdoaWNoIGluY2x1ZGVzIHRoZSBcImlkXCIgcHJvcGVydHlgKTtcbiAgICB9XG4gICAgY29uc3QgaXRlbUlkID0gKCFpdGVtIHx8ICFpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSA/IHVuZGVmaW5lZCA6IGl0ZW0uaWQ7XG4gICAgdGhpcy5kZWxldGVEYXRhR3JpZEl0ZW1CeUlkKGl0ZW1JZCwgc2hvdWxkVHJpZ2dlckV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYW4gYXJyYXkgb2YgZXhpc3RpbmcgaXRlbXMgZnJvbSB0aGUgZGF0YWdyaWRcbiAgICogQHBhcmFtIG9iamVjdCBpdGVtOiBpdGVtIG9iamVjdCBob2xkaW5nIGFsbCBwcm9wZXJ0aWVzIG9mIHRoYXQgcm93XG4gICAqIEBwYXJhbSBzaG91bGRUcmlnZ2VyRXZlbnQgZGVmYXVsdHMgdG8gdHJ1ZSwgd2hpY2ggd2lsbCB0cmlnZ2VyIGFuIGV2ZW50ICh1c2VkIGJ5IGF0IGxlYXN0IHRoZSBwYWdpbmF0aW9uIGNvbXBvbmVudClcbiAgICovXG4gIGRlbGV0ZURhdGFHcmlkSXRlbXMoaXRlbXM6IGFueVtdLCBzaG91bGRUcmlnZ2VyRXZlbnQgPSB0cnVlKSB7XG4gICAgLy8gd2hlbiBpdCdzIG5vdCBhbiBhcnJheSwgd2UgY2FuIGNhbGwgZGlyZWN0bHkgdGhlIHNpbmdsZSBpdGVtIGRlbGV0ZVxuICAgIGlmICghQXJyYXkuaXNBcnJheShpdGVtcykpIHtcbiAgICAgIHRoaXMuZGVsZXRlRGF0YUdyaWRJdGVtKGl0ZW1zKTtcbiAgICB9XG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB0aGlzLmRlbGV0ZURhdGFHcmlkSXRlbShpdGVtLCBmYWxzZSkpO1xuXG4gICAgLy8gZG8gd2Ugd2FudCB0byB0cmlnZ2VyIGFuIGV2ZW50IGFmdGVyIGRlbGV0aW5nIHRoZSBpdGVtXG4gICAgaWYgKHNob3VsZFRyaWdnZXJFdmVudCkge1xuICAgICAgdGhpcy5vbkl0ZW1EZWxldGVkLm5leHQoaXRlbXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYW4gZXhpc3RpbmcgaXRlbSBmcm9tIHRoZSBkYXRhZ3JpZCAoZGF0YVZpZXcpIGJ5IGl0J3MgaWRcbiAgICogQHBhcmFtIGl0ZW1JZDogaXRlbSB1bmlxdWUgaWRcbiAgICogQHBhcmFtIHNob3VsZFRyaWdnZXJFdmVudCBkZWZhdWx0cyB0byB0cnVlLCB3aGljaCB3aWxsIHRyaWdnZXIgYW4gZXZlbnQgKHVzZWQgYnkgYXQgbGVhc3QgdGhlIHBhZ2luYXRpb24gY29tcG9uZW50KVxuICAgKi9cbiAgZGVsZXRlRGF0YUdyaWRJdGVtQnlJZChpdGVtSWQ6IHN0cmluZyB8IG51bWJlciwgc2hvdWxkVHJpZ2dlckV2ZW50ID0gdHJ1ZSkge1xuICAgIGlmIChpdGVtSWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZGVsZXRlIGEgcm93IHdpdGhvdXQgYSB2YWxpZCBcImlkXCJgKTtcbiAgICB9XG5cbiAgICAvLyB3aGVuIHVzZXIgaGFzIHJvdyBzZWxlY3Rpb24gZW5hYmxlZCwgd2Ugc2hvdWxkIGNsZWFyIGFueSBzZWxlY3Rpb24gdG8gYXZvaWQgY29uZnVzaW9uIGFmdGVyIGEgZGVsZXRlXG4gICAgaWYgKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZE9wdGlvbnMgJiYgKHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZUNoZWNrYm94U2VsZWN0b3IgfHwgdGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlUm93U2VsZWN0aW9uKSkge1xuICAgICAgdGhpcy5fZ3JpZC5zZXRTZWxlY3RlZFJvd3MoW10pO1xuICAgIH1cblxuICAgIC8vIGRlbGV0ZSB0aGUgaXRlbSBmcm9tIHRoZSBkYXRhVmlld1xuICAgIHRoaXMuX2RhdGFWaWV3LmRlbGV0ZUl0ZW0oaXRlbUlkKTtcblxuICAgIC8vIGRvIHdlIHdhbnQgdG8gdHJpZ2dlciBhbiBldmVudCBhZnRlciBkZWxldGluZyB0aGUgaXRlbVxuICAgIGlmIChzaG91bGRUcmlnZ2VyRXZlbnQpIHtcbiAgICAgIHRoaXMub25JdGVtRGVsZXRlZC5uZXh0KGl0ZW1JZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhbiBhcnJheSBvZiBleGlzdGluZyBpdGVtcyBmcm9tIHRoZSBkYXRhZ3JpZFxuICAgKiBAcGFyYW0gb2JqZWN0IGl0ZW06IGl0ZW0gb2JqZWN0IGhvbGRpbmcgYWxsIHByb3BlcnRpZXMgb2YgdGhhdCByb3dcbiAgICogQHBhcmFtIHNob3VsZFRyaWdnZXJFdmVudCBkZWZhdWx0cyB0byB0cnVlLCB3aGljaCB3aWxsIHRyaWdnZXIgYW4gZXZlbnQgKHVzZWQgYnkgYXQgbGVhc3QgdGhlIHBhZ2luYXRpb24gY29tcG9uZW50KVxuICAgKi9cbiAgZGVsZXRlRGF0YUdyaWRJdGVtQnlJZHMoaXRlbUlkczogbnVtYmVyW10gfCBzdHJpbmdbXSwgc2hvdWxkVHJpZ2dlckV2ZW50ID0gdHJ1ZSkge1xuICAgIC8vIHdoZW4gaXQncyBub3QgYW4gYXJyYXksIHdlIGNhbiBjYWxsIGRpcmVjdGx5IHRoZSBzaW5nbGUgaXRlbSBkZWxldGVcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaXRlbUlkcykpIHtcbiAgICAgIHRoaXMuZGVsZXRlRGF0YUdyaWRJdGVtQnlJZChpdGVtSWRzKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtSWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXRlbUlkc1tpXSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmRlbGV0ZURhdGFHcmlkSXRlbUJ5SWQoaXRlbUlkc1tpXSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRvIHdlIHdhbnQgdG8gdHJpZ2dlciBhbiBldmVudCBhZnRlciBkZWxldGluZyB0aGUgaXRlbVxuICAgIGlmIChzaG91bGRUcmlnZ2VyRXZlbnQpIHtcbiAgICAgIHRoaXMub25JdGVtRGVsZXRlZC5uZXh0KGl0ZW1JZHMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgaXRlbSB3aXRoIG5ldyBwcm9wZXJ0aWVzIGluc2lkZSB0aGUgZGF0YWdyaWRcbiAgICogQHBhcmFtIG9iamVjdCBpdGVtOiBpdGVtIG9iamVjdCBob2xkaW5nIGFsbCBwcm9wZXJ0aWVzIG9mIHRoYXQgcm93XG4gICAqIEBwYXJhbSBzaG91bGRIaWdobGlnaHRSb3cgZG8gd2Ugd2FudCB0byBoaWdobGlnaHQgdGhlIHJvdyBhZnRlciB1cGRhdGVcbiAgICogQHBhcmFtIHNob3VsZFRyaWdnZXJFdmVudCBkZWZhdWx0cyB0byB0cnVlLCB3aGljaCB3aWxsIHRyaWdnZXIgYW4gZXZlbnQgKHVzZWQgYnkgYXQgbGVhc3QgdGhlIHBhZ2luYXRpb24gY29tcG9uZW50KVxuICAgKiBAcmV0dXJuIGdyaWQgcm93IGluZGV4XG4gICAqL1xuICB1cGRhdGVEYXRhR3JpZEl0ZW0oaXRlbTogYW55LCBzaG91bGRIaWdobGlnaHRSb3cgPSB0cnVlLCBzaG91bGRUcmlnZ2VyRXZlbnQgPSB0cnVlKSB7XG4gICAgY29uc3QgaXRlbUlkID0gKCFpdGVtIHx8ICFpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSA/IHVuZGVmaW5lZCA6IGl0ZW0uaWQ7XG5cbiAgICBpZiAoaXRlbUlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgdGhlIGl0ZW0gaW4gdGhlIGdyaWQgb3IgaXQncyBhc3NvY2lhdGVkIFwiaWRcImApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnVwZGF0ZURhdGFHcmlkSXRlbUJ5SWQoaXRlbUlkLCBpdGVtLCBzaG91bGRIaWdobGlnaHRSb3csIHNob3VsZFRyaWdnZXJFdmVudCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGFuIGFycmF5IG9mIGV4aXN0aW5nIGl0ZW1zIHdpdGggbmV3IHByb3BlcnRpZXMgaW5zaWRlIHRoZSBkYXRhZ3JpZFxuICAgKiBAcGFyYW0gb2JqZWN0IGl0ZW06IGFycmF5IG9mIGl0ZW0gb2JqZWN0c1xuICAgKiBAcGFyYW0gc2hvdWxkSGlnaGxpZ2h0Um93IGRvIHdlIHdhbnQgdG8gaGlnaGxpZ2h0IHRoZSByb3cgYWZ0ZXIgdXBkYXRlXG4gICAqIEBwYXJhbSBzaG91bGRUcmlnZ2VyRXZlbnQgZGVmYXVsdHMgdG8gdHJ1ZSwgd2hpY2ggd2lsbCB0cmlnZ2VyIGFuIGV2ZW50ICh1c2VkIGJ5IGF0IGxlYXN0IHRoZSBwYWdpbmF0aW9uIGNvbXBvbmVudClcbiAgICovXG4gIHVwZGF0ZURhdGFHcmlkSXRlbXMoaXRlbXM6IGFueSB8IGFueVtdLCBzaG91bGRIaWdobGlnaHRSb3cgPSB0cnVlLCBzaG91bGRUcmlnZ2VyRXZlbnQgPSB0cnVlKSB7XG4gICAgLy8gd2hlbiBpdCdzIG5vdCBhbiBhcnJheSwgd2UgY2FuIGNhbGwgZGlyZWN0bHkgdGhlIHNpbmdsZSBpdGVtIHVwZGF0ZVxuICAgIGlmICghQXJyYXkuaXNBcnJheShpdGVtcykpIHtcbiAgICAgIHRoaXMudXBkYXRlRGF0YUdyaWRJdGVtKGl0ZW1zLCBzaG91bGRIaWdobGlnaHRSb3cpO1xuICAgIH1cblxuICAgIGNvbnN0IGdyaWRJbmRleGVzOiBudW1iZXJbXSA9IFtdO1xuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xuICAgICAgZ3JpZEluZGV4ZXMucHVzaCh0aGlzLnVwZGF0ZURhdGFHcmlkSXRlbShpdGVtLCBmYWxzZSwgZmFsc2UpKTtcbiAgICB9KTtcblxuICAgIC8vIG9ubHkgaGlnaGxpZ2h0IGF0IHRoZSBlbmQsIGFsbCBhdCBvbmNlXG4gICAgLy8gd2UgaGF2ZSB0byBkbyB0aGlzIGJlY2F1c2UgZG9pbmcgaGlnaGxpZ2h0IDEgYnkgMSB3b3VsZCBvbmx5IHJlLXNlbGVjdCB0aGUgbGFzdCBoaWdobGlnaHRlZCByb3cgd2hpY2ggaXMgd3JvbmcgYmVoYXZpb3JcbiAgICBpZiAoc2hvdWxkSGlnaGxpZ2h0Um93KSB7XG4gICAgICB0aGlzLmhpZ2hsaWdodFJvdyhncmlkSW5kZXhlcyk7XG4gICAgfVxuXG4gICAgLy8gZG8gd2Ugd2FudCB0byB0cmlnZ2VyIGFuIGV2ZW50IGFmdGVyIHVwZGF0aW5nIHRoZSBpdGVtXG4gICAgaWYgKHNob3VsZFRyaWdnZXJFdmVudCkge1xuICAgICAgdGhpcy5vbkl0ZW1VcGRhdGVkLm5leHQoaXRlbXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgaXRlbSBpbiB0aGUgZGF0YWdyaWQgYnkgaXQncyBpZCBhbmQgbmV3IHByb3BlcnRpZXNcbiAgICogQHBhcmFtIGl0ZW1JZDogaXRlbSB1bmlxdWUgaWRcbiAgICogQHBhcmFtIG9iamVjdCBpdGVtOiBpdGVtIG9iamVjdCBob2xkaW5nIGFsbCBwcm9wZXJ0aWVzIG9mIHRoYXQgcm93XG4gICAqIEBwYXJhbSBzaG91bGRIaWdobGlnaHRSb3cgZG8gd2Ugd2FudCB0byBoaWdobGlnaHQgdGhlIHJvdyBhZnRlciB1cGRhdGVcbiAgICogQHBhcmFtIHNob3VsZFRyaWdnZXJFdmVudCBkZWZhdWx0cyB0byB0cnVlLCB3aGljaCB3aWxsIHRyaWdnZXIgYW4gZXZlbnQgKHVzZWQgYnkgYXQgbGVhc3QgdGhlIHBhZ2luYXRpb24gY29tcG9uZW50KVxuICAgKiBAcmV0dXJuIGdyaWQgcm93IGluZGV4XG4gICAqL1xuICB1cGRhdGVEYXRhR3JpZEl0ZW1CeUlkKGl0ZW1JZDogbnVtYmVyIHwgc3RyaW5nLCBpdGVtOiBhbnksIHNob3VsZEhpZ2hsaWdodFJvdyA9IHRydWUsIHNob3VsZFRyaWdnZXJFdmVudCA9IHRydWUpIHtcbiAgICBpZiAoaXRlbUlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IHVwZGF0ZSBhIHJvdyB3aXRob3V0IGEgdmFsaWQgXCJpZFwiYCk7XG4gICAgfVxuICAgIGNvbnN0IHJvd051bWJlciA9IHRoaXMuX2RhdGFWaWV3LmdldFJvd0J5SWQoaXRlbUlkKTtcblxuICAgIGlmICghaXRlbSB8fCByb3dOdW1iZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCB0aGUgaXRlbSBpbiB0aGUgZ3JpZCBvciBpdCdzIGFzc29jaWF0ZWQgXCJpZFwiYCk7XG4gICAgfVxuXG4gICAgY29uc3QgZ3JpZElkeCA9IHRoaXMuX2RhdGFWaWV3LmdldElkeEJ5SWQoaXRlbUlkKTtcbiAgICBpZiAoZ3JpZElkeCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBVcGRhdGUgdGhlIGl0ZW0gaXRzZWxmIGluc2lkZSB0aGUgZGF0YVZpZXdcbiAgICAgIHRoaXMuX2RhdGFWaWV3LnVwZGF0ZUl0ZW0oaXRlbUlkLCBpdGVtKTtcbiAgICAgIHRoaXMuX2dyaWQudXBkYXRlUm93KHJvd051bWJlcik7XG5cbiAgICAgIC8vIGhpZ2hsaWdodCB0aGUgcm93IHdlIGp1c3QgdXBkYXRlZCwgaWYgZGVmaW5lZFxuICAgICAgaWYgKHNob3VsZEhpZ2hsaWdodFJvdykge1xuICAgICAgICB0aGlzLmhpZ2hsaWdodFJvdyhyb3dOdW1iZXIsIDE1MDApO1xuICAgICAgfVxuXG4gICAgICAvLyBkbyB3ZSB3YW50IHRvIHRyaWdnZXIgYW4gZXZlbnQgYWZ0ZXIgdXBkYXRpbmcgdGhlIGl0ZW1cbiAgICAgIGlmIChzaG91bGRUcmlnZ2VyRXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbkl0ZW1VcGRhdGVkLm5leHQoaXRlbSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBncmlkSWR4O1xuICAgIH1cbiAgfVxufVxuIl19