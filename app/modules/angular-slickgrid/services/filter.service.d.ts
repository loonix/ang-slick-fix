import { BackendServiceApi, Column, ColumnFilters, EmitterType, FilterCallbackArg, CurrentFilter } from './../models/index';
import { FilterFactory } from '../filters/filterFactory';
import { Subject } from 'rxjs';
export declare class FilterService {
    private filterFactory;
    private _eventHandler;
    private _isFilterFirstRender;
    private _firstColumnIdRendered;
    private _slickSubscriber;
    private _filters;
    private _columnFilters;
    private _dataView;
    private _grid;
    private _onFilterChangedOptions;
    onFilterChanged: Subject<CurrentFilter[]>;
    onFilterCleared: Subject<boolean>;
    constructor(filterFactory: FilterFactory);
    /** Getter for the Grid Options pulled through the Grid Object */
    private readonly _gridOptions;
    /** Getter for the Column Definitions pulled through the Grid Object */
    private readonly _columnDefinitions;
    init(grid: any): void;
    /**
     * Attach a backend filter hook to the grid
     * @param grid SlickGrid Grid object
     */
    attachBackendOnFilter(grid: any, dataView: any): void;
    onBackendFilterChange(event: KeyboardEvent, args: any): void;
    executeBackendCallback(event: KeyboardEvent, args: any, startTime: Date, backendApi: BackendServiceApi): Promise<void>;
    /**
     * Attach a local filter hook to the grid
     * @param grid SlickGrid Grid object
     * @param dataView
     */
    attachLocalOnFilter(grid: any, dataView: any): void;
    clearFilterByColumnId(event: Event, columnId: number | string): void;
    /** Clear the search filters (below the column titles) */
    clearFilters(): void;
    customLocalFilter(dataView: any, item: any, args: any): boolean;
    dispose(): void;
    /**
     * Dispose of the filters, since it's a singleton, we don't want to affect other grids with same columns
     */
    disposeColumnFilters(): void;
    getColumnFilters(): ColumnFilters;
    getCurrentLocalFilters(): CurrentFilter[];
    callbackSearchEvent(e: KeyboardEvent | undefined, args: FilterCallbackArg): void;
    addFilterTemplateToHeaderRow(args: {
        column: Column;
        grid: any;
        node: any;
    }, isFilterFirstRender?: boolean): void;
    /**
     * A simple function that is attached to the subscriber and emit a change when the filter is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param caller
     */
    emitFilterChanged(caller: EmitterType): void;
    /**
     * When user passes an array of preset filters, we need to pre-populate each column filter searchTerm(s)
     * The process is to loop through the preset filters array, find the associated column from columnDefinitions and fill in the filter object searchTerm(s)
     * This is basically the same as if we would manually add searchTerm(s) to a column filter object in the column definition, but we do it programmatically.
     * At the end of the day, when creating the Filter (DOM Element), it will use these searchTerm(s) so we can take advantage of that without recoding each Filter type (DOM element)
     */
    populateColumnFilterSearchTerms(): void;
    private updateColumnFilters;
    private triggerEvent;
}
