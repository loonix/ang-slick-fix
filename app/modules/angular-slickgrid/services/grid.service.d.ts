import { TranslateService } from '@ngx-translate/core';
import { CellArgs, Column, OnEventArgs } from './../models/index';
import { ExtensionService } from './extension.service';
import { FilterService } from './filter.service';
import { GridStateService } from './gridState.service';
import { SortService } from './sort.service';
import { Subject } from 'rxjs';
export declare class GridService {
    private extensionService;
    private filterService;
    private gridStateService;
    private sortService;
    private translate;
    private _grid;
    private _dataView;
    onItemAdded: Subject<any>;
    onItemDeleted: Subject<any>;
    onItemUpdated: Subject<any>;
    constructor(extensionService: ExtensionService, filterService: FilterService, gridStateService: GridStateService, sortService: SortService, translate: TranslateService);
    /** Getter for the Grid Options pulled through the Grid Object */
    private readonly _gridOptions;
    init(grid: any, dataView: any): void;
    /** Clear all Filters & Sorts */
    clearAllFiltersAndSorts(): void;
    /**
     * From a SlickGrid Event triggered get the Column Definition and Item Data Context
     *
     * For example the SlickGrid onClick will return cell arguments when subscribing to it.
     * From these cellArgs, we want to get the Column Definition and Item Data
     * @param cell event args
     * @return object with columnDef and dataContext
     */
    getColumnFromEventArguments(args: CellArgs): OnEventArgs;
    /** Get data item by it's row index number */
    getDataItemByRowNumber(rowNumber: number): any;
    /** Chain the item Metadata with our implementation of Metadata at given row index */
    getItemRowMetadataToHighlight(previousItemMetadata: any): (rowNumber: number) => {
        cssClasses: string;
    };
    /**
     * Highlight then fade a row for x seconds.
     * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
     * @param rowNumber
     * @param fadeDelay
     */
    highlightRow(rowNumber: number | number[], fadeDelay?: number): void;
    highlightRowByMetadata(rowNumber: number, fadeDelay?: number): void;
    /** Get the Data Item from a grid row index */
    getDataItemByRowIndex(index: number): any;
    /** Get the Data Item from an array of grid row indexes */
    getDataItemByRowIndexes(indexes: number[]): any[];
    /** Get the currently selected row indexes */
    getSelectedRows(): any;
    /** Get the currently selected rows item data */
    getSelectedRowsDataItem(): any[];
    /** Select the selected row by a row index */
    setSelectedRow(rowIndex: number): void;
    /** Set selected rows with provided array of row indexes */
    setSelectedRows(rowIndexes: number[]): void;
    /** Re-Render the Grid */
    renderGrid(): void;
    /**
     * Reset the grid to it's original state (clear any filters, sorting & pagination if exists) .
     * The column definitions could be passed as argument to reset (this can be used after a Grid State reset)
     * The reset will clear the Filters & Sort, then will reset the Columns to their original state
     */
    resetGrid(columnDefinitions?: Column[]): void;
    /**
     * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param object dataItem: item object holding all properties of that row
     * @param shouldHighlightRow do we want to highlight the row after adding item
     * @param shouldResortGrid defaults to false, do we want the item to be sorted after insert? When set to False, it will add item on first row (default)
     * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     */
    addItemToDatagrid(item: any, shouldHighlightRow?: boolean, shouldResortGrid?: boolean, shouldTriggerEvent?: boolean): void;
    /**
     * Add item array (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param dataItem array: item object holding all properties of that row
     * @param shouldHighlightRow do we want to highlight the row after adding item
     * @param shouldResortGrid defaults to false, do we want the item to be sorted after insert? When set to False, it will add item on first row (default)
     * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     */
    addItemsToDatagrid(items: any[], shouldHighlightRow?: boolean, shouldResortGrid?: boolean, shouldTriggerEvent?: boolean): void;
    /**
     * Delete an existing item from the datagrid (dataView)
     * @param object item: item object holding all properties of that row
     * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     */
    deleteDataGridItem(item: any, shouldTriggerEvent?: boolean): void;
    /**
     * Delete an array of existing items from the datagrid
     * @param object item: item object holding all properties of that row
     * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     */
    deleteDataGridItems(items: any[], shouldTriggerEvent?: boolean): void;
    /**
     * Delete an existing item from the datagrid (dataView) by it's id
     * @param itemId: item unique id
     * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     */
    deleteDataGridItemById(itemId: string | number, shouldTriggerEvent?: boolean): void;
    /**
     * Delete an array of existing items from the datagrid
     * @param object item: item object holding all properties of that row
     * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     */
    deleteDataGridItemByIds(itemIds: number[] | string[], shouldTriggerEvent?: boolean): void;
    /**
     * Update an existing item with new properties inside the datagrid
     * @param object item: item object holding all properties of that row
     * @param shouldHighlightRow do we want to highlight the row after update
     * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return grid row index
     */
    updateDataGridItem(item: any, shouldHighlightRow?: boolean, shouldTriggerEvent?: boolean): any;
    /**
     * Update an array of existing items with new properties inside the datagrid
     * @param object item: array of item objects
     * @param shouldHighlightRow do we want to highlight the row after update
     * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     */
    updateDataGridItems(items: any | any[], shouldHighlightRow?: boolean, shouldTriggerEvent?: boolean): void;
    /**
     * Update an existing item in the datagrid by it's id and new properties
     * @param itemId: item unique id
     * @param object item: item object holding all properties of that row
     * @param shouldHighlightRow do we want to highlight the row after update
     * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
     * @return grid row index
     */
    updateDataGridItemById(itemId: number | string, item: any, shouldHighlightRow?: boolean, shouldTriggerEvent?: boolean): any;
}
