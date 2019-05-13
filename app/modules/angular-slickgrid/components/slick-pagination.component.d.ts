import { AfterViewInit, EventEmitter, OnDestroy } from '@angular/core';
import { GridOption, Pagination } from './../models/index';
import { FilterService } from './../services/filter.service';
import { GridService } from './../services/grid.service';
export declare class SlickPaginationComponent implements AfterViewInit, OnDestroy {
    private filterService;
    private gridService;
    private _eventHandler;
    private _filterSubcription;
    private _gridPaginationOptions;
    private _isFirstRender;
    onPaginationChanged: EventEmitter<Pagination>;
    dataView: any;
    gridPaginationOptions: GridOption;
    grid: any;
    dataFrom: number;
    dataTo: number;
    itemsPerPage: number;
    pageCount: number;
    pageNumber: number;
    totalItems: number;
    paginationCallback: Function;
    paginationPageSizes: number[];
    fromToParams: any;
    /** Constructor */
    constructor(filterService: FilterService, gridService: GridService);
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    ceil(number: number): number;
    changeToFirstPage(event: any): void;
    changeToLastPage(event: any): void;
    changeToNextPage(event: any): void;
    changeToPreviousPage(event: any): void;
    changeToCurrentPage(event: any): void;
    dispose(): void;
    onChangeItemPerPage(event: any): void;
    refreshPagination(isPageNumberReset?: boolean): void;
    onPageChanged(event: Event | undefined, pageNumber: number): void;
    recalculateFromToIndexes(): void;
    /**
     * When item is added or removed, we will refresh the numbers on the pagination however we won't trigger a backend change
     * This will have a side effect though, which is that the "To" count won't be matching the "items per page" count,
     * that is a necessary side effect to avoid triggering a backend query just to refresh the paging,
     * basically we assume that this offset is fine for the time being,
     * until user does an action which will refresh the data hence the pagination which will then become normal again
     */
    private onItemAddedOrRemoved;
}
