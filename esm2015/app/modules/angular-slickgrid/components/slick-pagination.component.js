/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { executeBackendProcessesCallback, onBackendError } from '../services/backend-utilities';
import { FilterService } from './../services/filter.service';
import { GridService } from './../services/grid.service';
import { isObservable } from 'rxjs';
export class SlickPaginationComponent {
    /**
     * Constructor
     * @param {?} filterService
     * @param {?} gridService
     */
    constructor(filterService, gridService) {
        this.filterService = filterService;
        this.gridService = gridService;
        this._eventHandler = new Slick.EventHandler();
        this._isFirstRender = true;
        this.onPaginationChanged = new EventEmitter();
        this.dataFrom = 1;
        this.dataTo = 1;
        this.pageCount = 0;
        this.pageNumber = 1;
        this.totalItems = 0;
        this.paginationPageSizes = [25, 75, 100];
        this.fromToParams = { from: this.dataFrom, to: this.dataTo, totalItems: this.totalItems };
    }
    /**
     * @param {?} gridPaginationOptions
     * @return {?}
     */
    set gridPaginationOptions(gridPaginationOptions) {
        this._gridPaginationOptions = gridPaginationOptions;
        if (this._isFirstRender || !gridPaginationOptions || !gridPaginationOptions.pagination || (gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
            this.refreshPagination();
            this._isFirstRender = false;
        }
    }
    /**
     * @return {?}
     */
    get gridPaginationOptions() {
        return this._gridPaginationOptions;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.dispose();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._gridPaginationOptions = this._gridPaginationOptions;
        if (!this._gridPaginationOptions || !this._gridPaginationOptions.pagination || (this._gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
            this.refreshPagination();
        }
        // Subscribe to Filter Clear & Changed and go back to page 1 when that happen
        this._filterSubcription = this.filterService.onFilterChanged.subscribe((/**
         * @return {?}
         */
        () => this.refreshPagination(true)));
        this._filterSubcription = this.filterService.onFilterCleared.subscribe((/**
         * @return {?}
         */
        () => this.refreshPagination(true)));
        // Subscribe to any dataview row count changed so that when Adding/Deleting item(s) through the DataView
        // that would trigger a refresh of the pagination numbers
        if (this.dataView) {
            this.gridService.onItemAdded.subscribe((/**
             * @param {?} items
             * @return {?}
             */
            (items) => this.onItemAddedOrRemoved(items, true)));
            this.gridService.onItemDeleted.subscribe((/**
             * @param {?} items
             * @return {?}
             */
            (items) => this.onItemAddedOrRemoved(items, false)));
        }
    }
    /**
     * @param {?} number
     * @return {?}
     */
    ceil(number) {
        return Math.ceil(number);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeToFirstPage(event) {
        this.pageNumber = 1;
        this.onPageChanged(event, this.pageNumber);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeToLastPage(event) {
        this.pageNumber = this.pageCount;
        this.onPageChanged(event, this.pageNumber);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeToNextPage(event) {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber++;
            this.onPageChanged(event, this.pageNumber);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeToPreviousPage(event) {
        if (this.pageNumber > 0) {
            this.pageNumber--;
            this.onPageChanged(event, this.pageNumber);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeToCurrentPage(event) {
        this.pageNumber = +event.currentTarget.value;
        if (this.pageNumber < 1) {
            this.pageNumber = 1;
        }
        else if (this.pageNumber > this.pageCount) {
            this.pageNumber = this.pageCount;
        }
        this.onPageChanged(event, this.pageNumber);
    }
    /**
     * @return {?}
     */
    dispose() {
        this.onPaginationChanged.unsubscribe();
        if (this._filterSubcription) {
            this._filterSubcription.unsubscribe();
        }
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onChangeItemPerPage(event) {
        /** @type {?} */
        const itemsPerPage = +event.target.value;
        this.pageCount = Math.ceil(this.totalItems / itemsPerPage);
        this.pageNumber = (this.totalItems > 0) ? 1 : 0;
        this.itemsPerPage = itemsPerPage;
        this.onPageChanged(event, this.pageNumber);
    }
    /**
     * @param {?=} isPageNumberReset
     * @return {?}
     */
    refreshPagination(isPageNumberReset = false) {
        /** @type {?} */
        const backendApi = this._gridPaginationOptions.backendServiceApi;
        if (!backendApi || !backendApi.service || !backendApi.process) {
            throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
        }
        if (this._gridPaginationOptions && this._gridPaginationOptions.pagination) {
            /** @type {?} */
            const pagination = this._gridPaginationOptions.pagination;
            // set the number of items per page if not already set
            if (!this.itemsPerPage) {
                this.itemsPerPage = +((backendApi && backendApi.options && backendApi.options.paginationOptions && backendApi.options.paginationOptions.first) ? backendApi.options.paginationOptions.first : this._gridPaginationOptions.pagination.pageSize);
            }
            // if totalItems changed, we should always go back to the first page and recalculation the From-To indexes
            if (isPageNumberReset || this.totalItems !== pagination.totalItems) {
                if (this._isFirstRender && pagination.pageNumber && pagination.pageNumber > 1) {
                    this.pageNumber = pagination.pageNumber || 1;
                }
                else {
                    this.pageNumber = 1;
                }
                // when page number is set to 1 then also reset the "offset" of backend service
                if (this.pageNumber === 1) {
                    backendApi.service.resetPaginationOptions();
                }
            }
            // calculate and refresh the multiple properties of the pagination UI
            this.paginationPageSizes = this._gridPaginationOptions.pagination.pageSizes;
            this.totalItems = this._gridPaginationOptions.pagination.totalItems;
            this.recalculateFromToIndexes();
        }
        this.pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    }
    /**
     * @param {?} event
     * @param {?} pageNumber
     * @return {?}
     */
    onPageChanged(event, pageNumber) {
        this.recalculateFromToIndexes();
        /** @type {?} */
        const backendApi = this._gridPaginationOptions.backendServiceApi;
        if (!backendApi || !backendApi.service || !backendApi.process) {
            throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
        }
        if (this.dataTo > this.totalItems) {
            this.dataTo = this.totalItems;
        }
        else if (this.totalItems < this.itemsPerPage) {
            this.dataTo = this.totalItems;
        }
        if (backendApi) {
            try {
                /** @type {?} */
                const itemsPerPage = +this.itemsPerPage;
                // keep start time & end timestamps & return it after process execution
                /** @type {?} */
                const startTime = new Date();
                // run any pre-process, if defined, for example a spinner
                if (backendApi.preProcess) {
                    backendApi.preProcess();
                }
                /** @type {?} */
                const query = backendApi.service.processOnPaginationChanged(event, { newPage: pageNumber, pageSize: itemsPerPage });
                // the processes can be Observables (like HttpClient) or Promises
                /** @type {?} */
                const process = backendApi.process(query);
                if (process instanceof Promise && process.then) {
                    process.then((/**
                     * @param {?} processResult
                     * @return {?}
                     */
                    (processResult) => executeBackendProcessesCallback(startTime, processResult, backendApi, this._gridPaginationOptions)));
                }
                else if (isObservable(process)) {
                    process.subscribe((/**
                     * @param {?} processResult
                     * @return {?}
                     */
                    (processResult) => executeBackendProcessesCallback(startTime, processResult, backendApi, this._gridPaginationOptions)), (/**
                     * @param {?} error
                     * @return {?}
                     */
                    (error) => onBackendError(error, backendApi)));
                }
            }
            catch (error) {
                onBackendError(error, backendApi);
            }
        }
        else {
            throw new Error('Pagination with a backend service requires "BackendServiceApi" to be defined in your grid options');
        }
        // emit the changes to the parent component
        this.onPaginationChanged.emit({
            pageNumber: this.pageNumber,
            pageSizes: this.paginationPageSizes,
            pageSize: this.itemsPerPage,
            totalItems: this.totalItems
        });
    }
    /**
     * @return {?}
     */
    recalculateFromToIndexes() {
        if (this.totalItems === 0) {
            this.dataFrom = 0;
            this.dataTo = 0;
            this.pageNumber = 0;
        }
        else {
            this.dataFrom = (this.pageNumber * this.itemsPerPage) - this.itemsPerPage + 1;
            this.dataTo = (this.totalItems < this.itemsPerPage) ? this.totalItems : (this.pageNumber * this.itemsPerPage);
        }
    }
    /**
     * When item is added or removed, we will refresh the numbers on the pagination however we won't trigger a backend change
     * This will have a side effect though, which is that the "To" count won't be matching the "items per page" count,
     * that is a necessary side effect to avoid triggering a backend query just to refresh the paging,
     * basically we assume that this offset is fine for the time being,
     * until user does an action which will refresh the data hence the pagination which will then become normal again
     * @private
     * @param {?} items
     * @param {?=} isItemAdded
     * @return {?}
     */
    onItemAddedOrRemoved(items, isItemAdded = true) {
        if (items !== null) {
            /** @type {?} */
            const previousDataTo = this.dataTo;
            /** @type {?} */
            const itemCount = Array.isArray(items) ? items.length : 1;
            /** @type {?} */
            const itemCountWithDirection = isItemAdded ? +itemCount : -itemCount;
            // refresh the total count in the pagination and in the UI
            this.totalItems += itemCountWithDirection;
            this.recalculateFromToIndexes();
            // finally refresh the "To" count and we know it might be different than the "items per page" count
            // but this is necessary since we don't want an actual backend refresh
            this.dataTo = previousDataTo + itemCountWithDirection;
        }
    }
}
SlickPaginationComponent.decorators = [
    { type: Component, args: [{
                selector: 'slick-pagination',
                template: "<div class=\"slick-pagination\">\n    <div class=\"slick-pagination-nav\">\n        <nav aria-label=\"Page navigation\">\n        <ul class=\"pagination\">\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === 1 || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-first fa fa-angle-double-left\" aria-label=\"First\" (click)=\"changeToFirstPage($event)\">\n            </a>\n            </li>\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === 1 || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-prev fa fa-angle-left\" aria-label=\"Previous\" (click)=\"changeToPreviousPage($event)\">\n            </a>\n            </li>\n        </ul>\n        </nav>\n\n        <div class=\"slick-page-number\">\n            <span [translate]=\"'PAGE'\"></span>\n            <input type=\"text\" class=\"form-control\" [value]=\"pageNumber\" size=\"1\" [readOnly]=\"totalItems === 0\" (change)=\"changeToCurrentPage($event)\">\n            <span [translate]=\"'OF'\"></span><span> {{pageCount}}</span>\n        </div>\n\n        <nav aria-label=\"Page navigation\">\n        <ul class=\"pagination\">\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === pageCount || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-next text-center fa fa-lg fa-angle-right\" aria-label=\"Next\" (click)=\"changeToNextPage($event)\">\n            </a>\n            </li>\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === pageCount || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-end fa fa-lg fa-angle-double-right\" aria-label=\"Last\" (click)=\"changeToLastPage($event)\">\n            </a>\n            </li>\n        </ul>\n        </nav>\n    </div>\n    <span class=\"slick-pagination-settings\">\n        <select id=\"items-per-page-label\" [value]=\"itemsPerPage\" (change)=\"onChangeItemPerPage($event)\">\n        <option value=\"{{pageSize}}\" *ngFor=\"let pageSize of paginationPageSizes;\">{{pageSize}}</option>\n        </select>\n        <span [translate]=\"'ITEMS_PER_PAGE'\"></span>,\n        <span class=\"slick-pagination-count\">\n            <span [translate]=\"'FROM_TO_OF_TOTAL_ITEMS'\" [translateParams]=\"{ from: dataFrom, to: dataTo, totalItems: totalItems }\"></span>\n        </span>\n    </span>\n    </div>\n"
            }] },
    { type: Injectable }
];
/** @nocollapse */
SlickPaginationComponent.ctorParameters = () => [
    { type: FilterService },
    { type: GridService }
];
SlickPaginationComponent.propDecorators = {
    onPaginationChanged: [{ type: Output }],
    dataView: [{ type: Input }],
    gridPaginationOptions: [{ type: Input }],
    grid: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    SlickPaginationComponent.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    SlickPaginationComponent.prototype._filterSubcription;
    /**
     * @type {?}
     * @private
     */
    SlickPaginationComponent.prototype._gridPaginationOptions;
    /**
     * @type {?}
     * @private
     */
    SlickPaginationComponent.prototype._isFirstRender;
    /** @type {?} */
    SlickPaginationComponent.prototype.onPaginationChanged;
    /** @type {?} */
    SlickPaginationComponent.prototype.dataView;
    /** @type {?} */
    SlickPaginationComponent.prototype.grid;
    /** @type {?} */
    SlickPaginationComponent.prototype.dataFrom;
    /** @type {?} */
    SlickPaginationComponent.prototype.dataTo;
    /** @type {?} */
    SlickPaginationComponent.prototype.itemsPerPage;
    /** @type {?} */
    SlickPaginationComponent.prototype.pageCount;
    /** @type {?} */
    SlickPaginationComponent.prototype.pageNumber;
    /** @type {?} */
    SlickPaginationComponent.prototype.totalItems;
    /** @type {?} */
    SlickPaginationComponent.prototype.paginationCallback;
    /** @type {?} */
    SlickPaginationComponent.prototype.paginationPageSizes;
    /** @type {?} */
    SlickPaginationComponent.prototype.fromToParams;
    /**
     * @type {?}
     * @private
     */
    SlickPaginationComponent.prototype.filterService;
    /**
     * @type {?}
     * @private
     */
    SlickPaginationComponent.prototype.gridService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpY2stcGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2NvbXBvbmVudHMvc2xpY2stcGFnaW5hdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3RyxPQUFPLEVBQUUsK0JBQStCLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQVVsRCxNQUFNLE9BQU8sd0JBQXdCOzs7Ozs7SUE4Qm5DLFlBQW9CLGFBQTRCLEVBQVUsV0FBd0I7UUFBOUQsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQTdCMUUsa0JBQWEsR0FBRyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUd6QyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUNwQix3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBYy9ELGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRVgsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBRWYsd0JBQW1CLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLGlCQUFZLEdBQVEsRUFBRSxJQUFJ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clZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdyYXBocWxSZXN1bHQsIEdyaWRPcHRpb24sIFBhZ2luYXRpb24gfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IGV4ZWN1dGVCYWNrZW5kUHJvY2Vzc2VzQ2FsbGJhY2ssIG9uQmFja2VuZEVycm9yIH0gZnJvbSAnLi4vc2VydmljZXMvYmFja2VuZC11dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9maWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEdyaWRTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ncmlkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBpc09ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzbGljay1wYWdpbmF0aW9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2xpY2stcGFnaW5hdGlvbi5jb21wb25lbnQuaHRtbCdcclxufSlcclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2xpY2tQYWdpbmF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIF9ldmVudEhhbmRsZXIgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XHJcbiAgcHJpdmF0ZSBfZmlsdGVyU3ViY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIF9ncmlkUGFnaW5hdGlvbk9wdGlvbnM6IEdyaWRPcHRpb247XHJcbiAgcHJpdmF0ZSBfaXNGaXJzdFJlbmRlciA9IHRydWU7XHJcbiAgQE91dHB1dCgpIG9uUGFnaW5hdGlvbkNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFBhZ2luYXRpb24+KCk7XHJcbiAgQElucHV0KCkgZGF0YVZpZXc6IGFueTtcclxuICBASW5wdXQoKVxyXG4gIHNldCBncmlkUGFnaW5hdGlvbk9wdGlvbnMoZ3JpZFBhZ2luYXRpb25PcHRpb25zOiBHcmlkT3B0aW9uKSB7XHJcbiAgICB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMgPSBncmlkUGFnaW5hdGlvbk9wdGlvbnM7XHJcbiAgICBpZiAodGhpcy5faXNGaXJzdFJlbmRlciB8fCAhZ3JpZFBhZ2luYXRpb25PcHRpb25zIHx8ICFncmlkUGFnaW5hdGlvbk9wdGlvbnMucGFnaW5hdGlvbiB8fCAoZ3JpZFBhZ2luYXRpb25PcHRpb25zLnBhZ2luYXRpb24udG90YWxJdGVtcyAhPT0gdGhpcy50b3RhbEl0ZW1zKSkge1xyXG4gICAgICB0aGlzLnJlZnJlc2hQYWdpbmF0aW9uKCk7XHJcbiAgICAgIHRoaXMuX2lzRmlyc3RSZW5kZXIgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0IGdyaWRQYWdpbmF0aW9uT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcclxuICAgIHJldHVybiB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnM7XHJcbiAgfVxyXG4gIEBJbnB1dCgpIGdyaWQ6IGFueTtcclxuICBkYXRhRnJvbSA9IDE7XHJcbiAgZGF0YVRvID0gMTtcclxuICBpdGVtc1BlclBhZ2U6IG51bWJlcjtcclxuICBwYWdlQ291bnQgPSAwO1xyXG4gIHBhZ2VOdW1iZXIgPSAxO1xyXG4gIHRvdGFsSXRlbXMgPSAwO1xyXG4gIHBhZ2luYXRpb25DYWxsYmFjazogRnVuY3Rpb247XHJcbiAgcGFnaW5hdGlvblBhZ2VTaXplcyA9IFsyNSwgNzUsIDEwMF07XHJcbiAgZnJvbVRvUGFyYW1zOiBhbnkgPSB7IGZyb206IHRoaXMuZGF0YUZyb20sIHRvOiB0aGlzLmRhdGFUbywgdG90YWxJdGVtczogdGhpcy50b3RhbEl0ZW1zIH07XHJcblxyXG4gIC8qKiBDb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSwgcHJpdmF0ZSBncmlkU2VydmljZTogR3JpZFNlcnZpY2UpIHt9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5kaXNwb3NlKCk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMgPSB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnM7XHJcbiAgICBpZiAoIXRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucyB8fCAhdGhpcy5fZ3JpZFBhZ2luYXRpb25PcHRpb25zLnBhZ2luYXRpb24gfHwgKHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucy5wYWdpbmF0aW9uLnRvdGFsSXRlbXMgIT09IHRoaXMudG90YWxJdGVtcykpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoUGFnaW5hdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFN1YnNjcmliZSB0byBGaWx0ZXIgQ2xlYXIgJiBDaGFuZ2VkIGFuZCBnbyBiYWNrIHRvIHBhZ2UgMSB3aGVuIHRoYXQgaGFwcGVuXHJcbiAgICB0aGlzLl9maWx0ZXJTdWJjcmlwdGlvbiA9IHRoaXMuZmlsdGVyU2VydmljZS5vbkZpbHRlckNoYW5nZWQuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVmcmVzaFBhZ2luYXRpb24odHJ1ZSkpO1xyXG4gICAgdGhpcy5fZmlsdGVyU3ViY3JpcHRpb24gPSB0aGlzLmZpbHRlclNlcnZpY2Uub25GaWx0ZXJDbGVhcmVkLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlZnJlc2hQYWdpbmF0aW9uKHRydWUpKTtcclxuXHJcbiAgICAvLyBTdWJzY3JpYmUgdG8gYW55IGRhdGF2aWV3IHJvdyBjb3VudCBjaGFuZ2VkIHNvIHRoYXQgd2hlbiBBZGRpbmcvRGVsZXRpbmcgaXRlbShzKSB0aHJvdWdoIHRoZSBEYXRhVmlld1xyXG4gICAgLy8gdGhhdCB3b3VsZCB0cmlnZ2VyIGEgcmVmcmVzaCBvZiB0aGUgcGFnaW5hdGlvbiBudW1iZXJzXHJcbiAgICBpZiAodGhpcy5kYXRhVmlldykge1xyXG4gICAgICB0aGlzLmdyaWRTZXJ2aWNlLm9uSXRlbUFkZGVkLnN1YnNjcmliZSgoaXRlbXM6IGFueSB8IGFueVtdKSA9PiB0aGlzLm9uSXRlbUFkZGVkT3JSZW1vdmVkKGl0ZW1zLCB0cnVlKSk7XHJcbiAgICAgIHRoaXMuZ3JpZFNlcnZpY2Uub25JdGVtRGVsZXRlZC5zdWJzY3JpYmUoKGl0ZW1zOiBhbnkgfCBhbnlbXSkgPT4gdGhpcy5vbkl0ZW1BZGRlZE9yUmVtb3ZlZChpdGVtcywgZmFsc2UpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNlaWwobnVtYmVyOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLmNlaWwobnVtYmVyKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZVRvRmlyc3RQYWdlKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMucGFnZU51bWJlciA9IDE7XHJcbiAgICB0aGlzLm9uUGFnZUNoYW5nZWQoZXZlbnQsIHRoaXMucGFnZU51bWJlcik7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VUb0xhc3RQYWdlKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMucGFnZU51bWJlciA9IHRoaXMucGFnZUNvdW50O1xyXG4gICAgdGhpcy5vblBhZ2VDaGFuZ2VkKGV2ZW50LCB0aGlzLnBhZ2VOdW1iZXIpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlVG9OZXh0UGFnZShldmVudDogYW55KSB7XHJcbiAgICBpZiAodGhpcy5wYWdlTnVtYmVyIDwgdGhpcy5wYWdlQ291bnQpIHtcclxuICAgICAgdGhpcy5wYWdlTnVtYmVyKys7XHJcbiAgICAgIHRoaXMub25QYWdlQ2hhbmdlZChldmVudCwgdGhpcy5wYWdlTnVtYmVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoYW5nZVRvUHJldmlvdXNQYWdlKGV2ZW50OiBhbnkpIHtcclxuICAgIGlmICh0aGlzLnBhZ2VOdW1iZXIgPiAwKSB7XHJcbiAgICAgIHRoaXMucGFnZU51bWJlci0tO1xyXG4gICAgICB0aGlzLm9uUGFnZUNoYW5nZWQoZXZlbnQsIHRoaXMucGFnZU51bWJlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VUb0N1cnJlbnRQYWdlKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMucGFnZU51bWJlciA9ICtldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlO1xyXG4gICAgaWYgKHRoaXMucGFnZU51bWJlciA8IDEpIHtcclxuICAgICAgdGhpcy5wYWdlTnVtYmVyID0gMTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wYWdlTnVtYmVyID4gdGhpcy5wYWdlQ291bnQpIHtcclxuICAgICAgdGhpcy5wYWdlTnVtYmVyID0gdGhpcy5wYWdlQ291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vblBhZ2VDaGFuZ2VkKGV2ZW50LCB0aGlzLnBhZ2VOdW1iZXIpO1xyXG4gIH1cclxuXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIHRoaXMub25QYWdpbmF0aW9uQ2hhbmdlZC51bnN1YnNjcmliZSgpO1xyXG4gICAgaWYgKHRoaXMuX2ZpbHRlclN1YmNyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX2ZpbHRlclN1YmNyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIFNsaWNrR3JpZCBldmVudHNcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCgpO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2VJdGVtUGVyUGFnZShldmVudDogYW55KSB7XHJcbiAgICBjb25zdCBpdGVtc1BlclBhZ2UgPSArZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgdGhpcy5wYWdlQ291bnQgPSBNYXRoLmNlaWwodGhpcy50b3RhbEl0ZW1zIC8gaXRlbXNQZXJQYWdlKTtcclxuICAgIHRoaXMucGFnZU51bWJlciA9ICh0aGlzLnRvdGFsSXRlbXMgPiAwKSA/IDEgOiAwO1xyXG4gICAgdGhpcy5pdGVtc1BlclBhZ2UgPSBpdGVtc1BlclBhZ2U7XHJcbiAgICB0aGlzLm9uUGFnZUNoYW5nZWQoZXZlbnQsIHRoaXMucGFnZU51bWJlcik7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoUGFnaW5hdGlvbihpc1BhZ2VOdW1iZXJSZXNldDogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBiYWNrZW5kQXBpID0gdGhpcy5fZ3JpZFBhZ2luYXRpb25PcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xyXG4gICAgaWYgKCFiYWNrZW5kQXBpIHx8ICFiYWNrZW5kQXBpLnNlcnZpY2UgfHwgIWJhY2tlbmRBcGkucHJvY2Vzcykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEJhY2tlbmRTZXJ2aWNlQXBpIHJlcXVpcmVzIGF0IGxlYXN0IGEgXCJwcm9jZXNzXCIgZnVuY3Rpb24gYW5kIGEgXCJzZXJ2aWNlXCIgZGVmaW5lZGApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMgJiYgdGhpcy5fZ3JpZFBhZ2luYXRpb25PcHRpb25zLnBhZ2luYXRpb24pIHtcclxuICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucy5wYWdpbmF0aW9uO1xyXG4gICAgICAvLyBzZXQgdGhlIG51bWJlciBvZiBpdGVtcyBwZXIgcGFnZSBpZiBub3QgYWxyZWFkeSBzZXRcclxuICAgICAgaWYgKCF0aGlzLml0ZW1zUGVyUGFnZSkge1xyXG4gICAgICAgIHRoaXMuaXRlbXNQZXJQYWdlID0gKygoYmFja2VuZEFwaSAmJiBiYWNrZW5kQXBpLm9wdGlvbnMgJiYgYmFja2VuZEFwaS5vcHRpb25zLnBhZ2luYXRpb25PcHRpb25zICYmIGJhY2tlbmRBcGkub3B0aW9ucy5wYWdpbmF0aW9uT3B0aW9ucy5maXJzdCkgPyBiYWNrZW5kQXBpLm9wdGlvbnMucGFnaW5hdGlvbk9wdGlvbnMuZmlyc3QgOiB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMucGFnaW5hdGlvbi5wYWdlU2l6ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGlmIHRvdGFsSXRlbXMgY2hhbmdlZCwgd2Ugc2hvdWxkIGFsd2F5cyBnbyBiYWNrIHRvIHRoZSBmaXJzdCBwYWdlIGFuZCByZWNhbGN1bGF0aW9uIHRoZSBGcm9tLVRvIGluZGV4ZXNcclxuICAgICAgaWYgKGlzUGFnZU51bWJlclJlc2V0IHx8IHRoaXMudG90YWxJdGVtcyAhPT0gcGFnaW5hdGlvbi50b3RhbEl0ZW1zKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzRmlyc3RSZW5kZXIgJiYgcGFnaW5hdGlvbi5wYWdlTnVtYmVyICYmIHBhZ2luYXRpb24ucGFnZU51bWJlciA+IDEpIHtcclxuICAgICAgICAgIHRoaXMucGFnZU51bWJlciA9IHBhZ2luYXRpb24ucGFnZU51bWJlciB8fCAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnBhZ2VOdW1iZXIgPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gd2hlbiBwYWdlIG51bWJlciBpcyBzZXQgdG8gMSB0aGVuIGFsc28gcmVzZXQgdGhlIFwib2Zmc2V0XCIgb2YgYmFja2VuZCBzZXJ2aWNlXHJcbiAgICAgICAgaWYgKHRoaXMucGFnZU51bWJlciA9PT0gMSkge1xyXG4gICAgICAgICAgYmFja2VuZEFwaS5zZXJ2aWNlLnJlc2V0UGFnaW5hdGlvbk9wdGlvbnMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNhbGN1bGF0ZSBhbmQgcmVmcmVzaCB0aGUgbXVsdGlwbGUgcHJvcGVydGllcyBvZiB0aGUgcGFnaW5hdGlvbiBVSVxyXG4gICAgICB0aGlzLnBhZ2luYXRpb25QYWdlU2l6ZXMgPSB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMucGFnaW5hdGlvbi5wYWdlU2l6ZXM7XHJcbiAgICAgIHRoaXMudG90YWxJdGVtcyA9IHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucy5wYWdpbmF0aW9uLnRvdGFsSXRlbXM7XHJcbiAgICAgIHRoaXMucmVjYWxjdWxhdGVGcm9tVG9JbmRleGVzKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnBhZ2VDb3VudCA9IE1hdGguY2VpbCh0aGlzLnRvdGFsSXRlbXMgLyB0aGlzLml0ZW1zUGVyUGFnZSk7XHJcbiAgfVxyXG5cclxuICBvblBhZ2VDaGFuZ2VkKGV2ZW50OiBFdmVudCB8IHVuZGVmaW5lZCwgcGFnZU51bWJlcjogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnJlY2FsY3VsYXRlRnJvbVRvSW5kZXhlcygpO1xyXG5cclxuICAgIGNvbnN0IGJhY2tlbmRBcGkgPSB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGk7XHJcbiAgICBpZiAoIWJhY2tlbmRBcGkgfHwgIWJhY2tlbmRBcGkuc2VydmljZSB8fCAhYmFja2VuZEFwaS5wcm9jZXNzKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQmFja2VuZFNlcnZpY2VBcGkgcmVxdWlyZXMgYXQgbGVhc3QgYSBcInByb2Nlc3NcIiBmdW5jdGlvbiBhbmQgYSBcInNlcnZpY2VcIiBkZWZpbmVkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZGF0YVRvID4gdGhpcy50b3RhbEl0ZW1zKSB7XHJcbiAgICAgIHRoaXMuZGF0YVRvID0gdGhpcy50b3RhbEl0ZW1zO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRvdGFsSXRlbXMgPCB0aGlzLml0ZW1zUGVyUGFnZSkge1xyXG4gICAgICB0aGlzLmRhdGFUbyA9IHRoaXMudG90YWxJdGVtcztcclxuICAgIH1cclxuICAgIGlmIChiYWNrZW5kQXBpKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgaXRlbXNQZXJQYWdlID0gK3RoaXMuaXRlbXNQZXJQYWdlO1xyXG5cclxuICAgICAgICAvLyBrZWVwIHN0YXJ0IHRpbWUgJiBlbmQgdGltZXN0YW1wcyAmIHJldHVybiBpdCBhZnRlciBwcm9jZXNzIGV4ZWN1dGlvblxyXG4gICAgICAgIGNvbnN0IHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgICAgIC8vIHJ1biBhbnkgcHJlLXByb2Nlc3MsIGlmIGRlZmluZWQsIGZvciBleGFtcGxlIGEgc3Bpbm5lclxyXG4gICAgICAgIGlmIChiYWNrZW5kQXBpLnByZVByb2Nlc3MpIHtcclxuICAgICAgICAgIGJhY2tlbmRBcGkucHJlUHJvY2VzcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcXVlcnkgPSBiYWNrZW5kQXBpLnNlcnZpY2UucHJvY2Vzc09uUGFnaW5hdGlvbkNoYW5nZWQoZXZlbnQsIHsgbmV3UGFnZTogcGFnZU51bWJlciwgcGFnZVNpemU6IGl0ZW1zUGVyUGFnZSB9KTtcclxuXHJcbiAgICAgICAgLy8gdGhlIHByb2Nlc3NlcyBjYW4gYmUgT2JzZXJ2YWJsZXMgKGxpa2UgSHR0cENsaWVudCkgb3IgUHJvbWlzZXNcclxuICAgICAgICBjb25zdCBwcm9jZXNzID0gYmFja2VuZEFwaS5wcm9jZXNzKHF1ZXJ5KTtcclxuICAgICAgICBpZiAocHJvY2VzcyBpbnN0YW5jZW9mIFByb21pc2UgJiYgcHJvY2Vzcy50aGVuKSB7XHJcbiAgICAgICAgICBwcm9jZXNzLnRoZW4oKHByb2Nlc3NSZXN1bHQ6IEdyYXBocWxSZXN1bHQgfCBhbnkpID0+IGV4ZWN1dGVCYWNrZW5kUHJvY2Vzc2VzQ2FsbGJhY2soc3RhcnRUaW1lLCBwcm9jZXNzUmVzdWx0LCBiYWNrZW5kQXBpLCB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZShwcm9jZXNzKSkge1xyXG4gICAgICAgICAgcHJvY2Vzcy5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChwcm9jZXNzUmVzdWx0OiBHcmFwaHFsUmVzdWx0IHwgYW55KSA9PiBleGVjdXRlQmFja2VuZFByb2Nlc3Nlc0NhbGxiYWNrKHN0YXJ0VGltZSwgcHJvY2Vzc1Jlc3VsdCwgYmFja2VuZEFwaSwgdGhpcy5fZ3JpZFBhZ2luYXRpb25PcHRpb25zKSxcclxuICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IG9uQmFja2VuZEVycm9yKGVycm9yLCBiYWNrZW5kQXBpKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgb25CYWNrZW5kRXJyb3IoZXJyb3IsIGJhY2tlbmRBcGkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhZ2luYXRpb24gd2l0aCBhIGJhY2tlbmQgc2VydmljZSByZXF1aXJlcyBcIkJhY2tlbmRTZXJ2aWNlQXBpXCIgdG8gYmUgZGVmaW5lZCBpbiB5b3VyIGdyaWQgb3B0aW9ucycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGVtaXQgdGhlIGNoYW5nZXMgdG8gdGhlIHBhcmVudCBjb21wb25lbnRcclxuICAgIHRoaXMub25QYWdpbmF0aW9uQ2hhbmdlZC5lbWl0KHtcclxuICAgICAgcGFnZU51bWJlcjogdGhpcy5wYWdlTnVtYmVyLFxyXG4gICAgICBwYWdlU2l6ZXM6IHRoaXMucGFnaW5hdGlvblBhZ2VTaXplcyxcclxuICAgICAgcGFnZVNpemU6IHRoaXMuaXRlbXNQZXJQYWdlLFxyXG4gICAgICB0b3RhbEl0ZW1zOiB0aGlzLnRvdGFsSXRlbXNcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVjYWxjdWxhdGVGcm9tVG9JbmRleGVzKCkge1xyXG4gICAgaWYgKHRoaXMudG90YWxJdGVtcyA9PT0gMCkge1xyXG4gICAgICB0aGlzLmRhdGFGcm9tID0gMDtcclxuICAgICAgdGhpcy5kYXRhVG8gPSAwO1xyXG4gICAgICB0aGlzLnBhZ2VOdW1iZXIgPSAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kYXRhRnJvbSA9ICh0aGlzLnBhZ2VOdW1iZXIgKiB0aGlzLml0ZW1zUGVyUGFnZSkgLSB0aGlzLml0ZW1zUGVyUGFnZSArIDE7XHJcbiAgICAgIHRoaXMuZGF0YVRvID0gKHRoaXMudG90YWxJdGVtcyA8IHRoaXMuaXRlbXNQZXJQYWdlKSA/IHRoaXMudG90YWxJdGVtcyA6ICh0aGlzLnBhZ2VOdW1iZXIgKiB0aGlzLml0ZW1zUGVyUGFnZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGl0ZW0gaXMgYWRkZWQgb3IgcmVtb3ZlZCwgd2Ugd2lsbCByZWZyZXNoIHRoZSBudW1iZXJzIG9uIHRoZSBwYWdpbmF0aW9uIGhvd2V2ZXIgd2Ugd29uJ3QgdHJpZ2dlciBhIGJhY2tlbmQgY2hhbmdlXHJcbiAgICogVGhpcyB3aWxsIGhhdmUgYSBzaWRlIGVmZmVjdCB0aG91Z2gsIHdoaWNoIGlzIHRoYXQgdGhlIFwiVG9cIiBjb3VudCB3b24ndCBiZSBtYXRjaGluZyB0aGUgXCJpdGVtcyBwZXIgcGFnZVwiIGNvdW50LFxyXG4gICAqIHRoYXQgaXMgYSBuZWNlc3Nhcnkgc2lkZSBlZmZlY3QgdG8gYXZvaWQgdHJpZ2dlcmluZyBhIGJhY2tlbmQgcXVlcnkganVzdCB0byByZWZyZXNoIHRoZSBwYWdpbmcsXHJcbiAgICogYmFzaWNhbGx5IHdlIGFzc3VtZSB0aGF0IHRoaXMgb2Zmc2V0IGlzIGZpbmUgZm9yIHRoZSB0aW1lIGJlaW5nLFxyXG4gICAqIHVudGlsIHVzZXIgZG9lcyBhbiBhY3Rpb24gd2hpY2ggd2lsbCByZWZyZXNoIHRoZSBkYXRhIGhlbmNlIHRoZSBwYWdpbmF0aW9uIHdoaWNoIHdpbGwgdGhlbiBiZWNvbWUgbm9ybWFsIGFnYWluXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkl0ZW1BZGRlZE9yUmVtb3ZlZChpdGVtczogYW55IHwgYW55W10sIGlzSXRlbUFkZGVkID0gdHJ1ZSkge1xyXG4gICAgaWYgKGl0ZW1zICE9PSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IHByZXZpb3VzRGF0YVRvID0gdGhpcy5kYXRhVG87XHJcbiAgICAgIGNvbnN0IGl0ZW1Db3VudCA9IEFycmF5LmlzQXJyYXkoaXRlbXMpID8gaXRlbXMubGVuZ3RoIDogMTtcclxuICAgICAgY29uc3QgaXRlbUNvdW50V2l0aERpcmVjdGlvbiA9IGlzSXRlbUFkZGVkID8gK2l0ZW1Db3VudCA6IC1pdGVtQ291bnQ7XHJcblxyXG4gICAgICAvLyByZWZyZXNoIHRoZSB0b3RhbCBjb3VudCBpbiB0aGUgcGFnaW5hdGlvbiBhbmQgaW4gdGhlIFVJXHJcbiAgICAgIHRoaXMudG90YWxJdGVtcyArPSBpdGVtQ291bnRXaXRoRGlyZWN0aW9uO1xyXG4gICAgICB0aGlzLnJlY2FsY3VsYXRlRnJvbVRvSW5kZXhlcygpO1xyXG5cclxuICAgICAgLy8gZmluYWxseSByZWZyZXNoIHRoZSBcIlRvXCIgY291bnQgYW5kIHdlIGtub3cgaXQgbWlnaHQgYmUgZGlmZmVyZW50IHRoYW4gdGhlIFwiaXRlbXMgcGVyIHBhZ2VcIiBjb3VudFxyXG4gICAgICAvLyBidXQgdGhpcyBpcyBuZWNlc3Nhcnkgc2luY2Ugd2UgZG9uJ3Qgd2FudCBhbiBhY3R1YWwgYmFja2VuZCByZWZyZXNoXHJcbiAgICAgIHRoaXMuZGF0YVRvID0gcHJldmlvdXNEYXRhVG8gKyBpdGVtQ291bnRXaXRoRGlyZWN0aW9uO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=