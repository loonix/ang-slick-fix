/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { executeBackendProcessesCallback, onBackendError } from '../services/backend-utilities';
import { FilterService } from './../services/filter.service';
import { GridService } from './../services/grid.service';
import { isObservable } from 'rxjs';
var SlickPaginationComponent = /** @class */ (function () {
    /** Constructor */
    function SlickPaginationComponent(filterService, gridService) {
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
    Object.defineProperty(SlickPaginationComponent.prototype, "gridPaginationOptions", {
        get: /**
         * @return {?}
         */
        function () {
            return this._gridPaginationOptions;
        },
        set: /**
         * @param {?} gridPaginationOptions
         * @return {?}
         */
        function (gridPaginationOptions) {
            this._gridPaginationOptions = gridPaginationOptions;
            if (this._isFirstRender || !gridPaginationOptions || !gridPaginationOptions.pagination || (gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
                this.refreshPagination();
                this._isFirstRender = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SlickPaginationComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.dispose();
    };
    /**
     * @return {?}
     */
    SlickPaginationComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._gridPaginationOptions = this._gridPaginationOptions;
        if (!this._gridPaginationOptions || !this._gridPaginationOptions.pagination || (this._gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
            this.refreshPagination();
        }
        // Subscribe to Filter Clear & Changed and go back to page 1 when that happen
        this._filterSubcription = this.filterService.onFilterChanged.subscribe((/**
         * @return {?}
         */
        function () { return _this.refreshPagination(true); }));
        this._filterSubcription = this.filterService.onFilterCleared.subscribe((/**
         * @return {?}
         */
        function () { return _this.refreshPagination(true); }));
        // Subscribe to any dataview row count changed so that when Adding/Deleting item(s) through the DataView
        // that would trigger a refresh of the pagination numbers
        if (this.dataView) {
            this.gridService.onItemAdded.subscribe((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return _this.onItemAddedOrRemoved(items, true); }));
            this.gridService.onItemDeleted.subscribe((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return _this.onItemAddedOrRemoved(items, false); }));
        }
    };
    /**
     * @param {?} number
     * @return {?}
     */
    SlickPaginationComponent.prototype.ceil = /**
     * @param {?} number
     * @return {?}
     */
    function (number) {
        return Math.ceil(number);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SlickPaginationComponent.prototype.changeToFirstPage = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.pageNumber = 1;
        this.onPageChanged(event, this.pageNumber);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SlickPaginationComponent.prototype.changeToLastPage = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.pageNumber = this.pageCount;
        this.onPageChanged(event, this.pageNumber);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SlickPaginationComponent.prototype.changeToNextPage = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber++;
            this.onPageChanged(event, this.pageNumber);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SlickPaginationComponent.prototype.changeToPreviousPage = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.pageNumber > 0) {
            this.pageNumber--;
            this.onPageChanged(event, this.pageNumber);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SlickPaginationComponent.prototype.changeToCurrentPage = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.pageNumber = +event.currentTarget.value;
        if (this.pageNumber < 1) {
            this.pageNumber = 1;
        }
        else if (this.pageNumber > this.pageCount) {
            this.pageNumber = this.pageCount;
        }
        this.onPageChanged(event, this.pageNumber);
    };
    /**
     * @return {?}
     */
    SlickPaginationComponent.prototype.dispose = /**
     * @return {?}
     */
    function () {
        this.onPaginationChanged.unsubscribe();
        if (this._filterSubcription) {
            this._filterSubcription.unsubscribe();
        }
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SlickPaginationComponent.prototype.onChangeItemPerPage = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var itemsPerPage = +event.target.value;
        this.pageCount = Math.ceil(this.totalItems / itemsPerPage);
        this.pageNumber = (this.totalItems > 0) ? 1 : 0;
        this.itemsPerPage = itemsPerPage;
        this.onPageChanged(event, this.pageNumber);
    };
    /**
     * @param {?=} isPageNumberReset
     * @return {?}
     */
    SlickPaginationComponent.prototype.refreshPagination = /**
     * @param {?=} isPageNumberReset
     * @return {?}
     */
    function (isPageNumberReset) {
        if (isPageNumberReset === void 0) { isPageNumberReset = false; }
        /** @type {?} */
        var backendApi = this._gridPaginationOptions.backendServiceApi;
        if (!backendApi || !backendApi.service || !backendApi.process) {
            throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
        }
        if (this._gridPaginationOptions && this._gridPaginationOptions.pagination) {
            /** @type {?} */
            var pagination = this._gridPaginationOptions.pagination;
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
    };
    /**
     * @param {?} event
     * @param {?} pageNumber
     * @return {?}
     */
    SlickPaginationComponent.prototype.onPageChanged = /**
     * @param {?} event
     * @param {?} pageNumber
     * @return {?}
     */
    function (event, pageNumber) {
        var _this = this;
        this.recalculateFromToIndexes();
        /** @type {?} */
        var backendApi = this._gridPaginationOptions.backendServiceApi;
        if (!backendApi || !backendApi.service || !backendApi.process) {
            throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
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
                var itemsPerPage = +this.itemsPerPage;
                // keep start time & end timestamps & return it after process execution
                /** @type {?} */
                var startTime_1 = new Date();
                // run any pre-process, if defined, for example a spinner
                if (backendApi.preProcess) {
                    backendApi.preProcess();
                }
                /** @type {?} */
                var query = backendApi.service.processOnPaginationChanged(event, { newPage: pageNumber, pageSize: itemsPerPage });
                // the processes can be Observables (like HttpClient) or Promises
                /** @type {?} */
                var process_1 = backendApi.process(query);
                if (process_1 instanceof Promise && process_1.then) {
                    process_1.then((/**
                     * @param {?} processResult
                     * @return {?}
                     */
                    function (processResult) { return executeBackendProcessesCallback(startTime_1, processResult, backendApi, _this._gridPaginationOptions); }));
                }
                else if (isObservable(process_1)) {
                    process_1.subscribe((/**
                     * @param {?} processResult
                     * @return {?}
                     */
                    function (processResult) { return executeBackendProcessesCallback(startTime_1, processResult, backendApi, _this._gridPaginationOptions); }), (/**
                     * @param {?} error
                     * @return {?}
                     */
                    function (error) { return onBackendError(error, backendApi); }));
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
    };
    /**
     * @return {?}
     */
    SlickPaginationComponent.prototype.recalculateFromToIndexes = /**
     * @return {?}
     */
    function () {
        if (this.totalItems === 0) {
            this.dataFrom = 0;
            this.dataTo = 0;
            this.pageNumber = 0;
        }
        else {
            this.dataFrom = (this.pageNumber * this.itemsPerPage) - this.itemsPerPage + 1;
            this.dataTo = (this.totalItems < this.itemsPerPage) ? this.totalItems : (this.pageNumber * this.itemsPerPage);
        }
    };
    /**
     * When item is added or removed, we will refresh the numbers on the pagination however we won't trigger a backend change
     * This will have a side effect though, which is that the "To" count won't be matching the "items per page" count,
     * that is a necessary side effect to avoid triggering a backend query just to refresh the paging,
     * basically we assume that this offset is fine for the time being,
     * until user does an action which will refresh the data hence the pagination which will then become normal again
     */
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
    SlickPaginationComponent.prototype.onItemAddedOrRemoved = /**
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
    function (items, isItemAdded) {
        if (isItemAdded === void 0) { isItemAdded = true; }
        if (items !== null) {
            /** @type {?} */
            var previousDataTo = this.dataTo;
            /** @type {?} */
            var itemCount = Array.isArray(items) ? items.length : 1;
            /** @type {?} */
            var itemCountWithDirection = isItemAdded ? +itemCount : -itemCount;
            // refresh the total count in the pagination and in the UI
            this.totalItems += itemCountWithDirection;
            this.recalculateFromToIndexes();
            // finally refresh the "To" count and we know it might be different than the "items per page" count
            // but this is necessary since we don't want an actual backend refresh
            this.dataTo = previousDataTo + itemCountWithDirection;
        }
    };
    SlickPaginationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'slick-pagination',
                    template: "<div class=\"slick-pagination\">\n    <div class=\"slick-pagination-nav\">\n        <nav aria-label=\"Page navigation\">\n        <ul class=\"pagination\">\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === 1 || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-first fa fa-angle-double-left\" aria-label=\"First\" (click)=\"changeToFirstPage($event)\">\n            </a>\n            </li>\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === 1 || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-prev fa fa-angle-left\" aria-label=\"Previous\" (click)=\"changeToPreviousPage($event)\">\n            </a>\n            </li>\n        </ul>\n        </nav>\n\n        <div class=\"slick-page-number\">\n            <span [translate]=\"'PAGE'\"></span>\n            <input type=\"text\" class=\"form-control\" [value]=\"pageNumber\" size=\"1\" [readOnly]=\"totalItems === 0\" (change)=\"changeToCurrentPage($event)\">\n            <span [translate]=\"'OF'\"></span><span> {{pageCount}}</span>\n        </div>\n\n        <nav aria-label=\"Page navigation\">\n        <ul class=\"pagination\">\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === pageCount || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-next text-center fa fa-lg fa-angle-right\" aria-label=\"Next\" (click)=\"changeToNextPage($event)\">\n            </a>\n            </li>\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === pageCount || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-end fa fa-lg fa-angle-double-right\" aria-label=\"Last\" (click)=\"changeToLastPage($event)\">\n            </a>\n            </li>\n        </ul>\n        </nav>\n    </div>\n    <span class=\"slick-pagination-settings\">\n        <select id=\"items-per-page-label\" [value]=\"itemsPerPage\" (change)=\"onChangeItemPerPage($event)\">\n        <option value=\"{{pageSize}}\" *ngFor=\"let pageSize of paginationPageSizes;\">{{pageSize}}</option>\n        </select>\n        <span [translate]=\"'ITEMS_PER_PAGE'\"></span>,\n        <span class=\"slick-pagination-count\">\n            <span [translate]=\"'FROM_TO_OF_TOTAL_ITEMS'\" [translateParams]=\"{ from: dataFrom, to: dataTo, totalItems: totalItems }\"></span>\n        </span>\n    </span>\n    </div>\n"
                }] },
        { type: Injectable }
    ];
    /** @nocollapse */
    SlickPaginationComponent.ctorParameters = function () { return [
        { type: FilterService },
        { type: GridService }
    ]; };
    SlickPaginationComponent.propDecorators = {
        onPaginationChanged: [{ type: Output }],
        dataView: [{ type: Input }],
        gridPaginationOptions: [{ type: Input }],
        grid: [{ type: Input }]
    };
    return SlickPaginationComponent;
}());
export { SlickPaginationComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpY2stcGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2NvbXBvbmVudHMvc2xpY2stcGFnaW5hdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3RyxPQUFPLEVBQUUsK0JBQStCLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUtsRDtJQWtDRSxrQkFBa0I7SUFDbEIsa0NBQW9CLGFBQTRCLEVBQVUsV0FBd0I7UUFBOUQsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQTdCMUUsa0JBQWEsR0FBRyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUd6QyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUNwQix3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBYy9ELGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRVgsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBRWYsd0JBQW1CLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLGlCQUFZLEdBQVEsRUFBRSxJQUFJLEVBQUUsSUFB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WSx3QkFBd0I7Ozs7OztJQUNuQyxpREFBaUQ7Ozs7O0lBQ2pELHNEQUF5Qzs7Ozs7SUFDekMsMERBQTJDOzs7OztJQUMzQyxrREFBOEI7O0lBQzlCLHVEQUErRDs7SUFDL0QsNENBQXVCOztJQVl2Qix3Q0FBbUI7O0lBQ25CLDRDQUFhOztJQUNiLDBDQUFXOztJQUNYLGdEQUFxQjs7SUFDckIsNkNBQWM7O0lBQ2QsOENBQWU7O0lBQ2YsOENBQWU7O0lBQ2Ysc0RBQTZCOztJQUM3Qix1REFBb0M7O0lBQ3BDLGdEQUEwRjs7Ozs7SUFHOUUsaURBQW9DOzs7OztJQUFFLCtDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR3JhcGhxbFJlc3VsdCwgR3JpZE9wdGlvbiwgUGFnaW5hdGlvbiB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgZXhlY3V0ZUJhY2tlbmRQcm9jZXNzZXNDYWxsYmFjaywgb25CYWNrZW5kRXJyb3IgfSBmcm9tICcuLi9zZXJ2aWNlcy9iYWNrZW5kLXV0aWxpdGllcyc7XHJcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2ZpbHRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR3JpZFNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2dyaWQuc2VydmljZSc7XHJcbmltcG9ydCB7IGlzT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NsaWNrLXBhZ2luYXRpb24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zbGljay1wYWdpbmF0aW9uLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTbGlja1BhZ2luYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgX2V2ZW50SGFuZGxlciA9IG5ldyBTbGljay5FdmVudEhhbmRsZXIoKTtcclxuICBwcml2YXRlIF9maWx0ZXJTdWJjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgX2dyaWRQYWdpbmF0aW9uT3B0aW9uczogR3JpZE9wdGlvbjtcclxuICBwcml2YXRlIF9pc0ZpcnN0UmVuZGVyID0gdHJ1ZTtcclxuICBAT3V0cHV0KCkgb25QYWdpbmF0aW9uQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8UGFnaW5hdGlvbj4oKTtcclxuICBASW5wdXQoKSBkYXRhVmlldzogYW55O1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGdyaWRQYWdpbmF0aW9uT3B0aW9ucyhncmlkUGFnaW5hdGlvbk9wdGlvbnM6IEdyaWRPcHRpb24pIHtcclxuICAgIHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucyA9IGdyaWRQYWdpbmF0aW9uT3B0aW9ucztcclxuICAgIGlmICh0aGlzLl9pc0ZpcnN0UmVuZGVyIHx8ICFncmlkUGFnaW5hdGlvbk9wdGlvbnMgfHwgIWdyaWRQYWdpbmF0aW9uT3B0aW9ucy5wYWdpbmF0aW9uIHx8IChncmlkUGFnaW5hdGlvbk9wdGlvbnMucGFnaW5hdGlvbi50b3RhbEl0ZW1zICE9PSB0aGlzLnRvdGFsSXRlbXMpKSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaFBhZ2luYXRpb24oKTtcclxuICAgICAgdGhpcy5faXNGaXJzdFJlbmRlciA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXQgZ3JpZFBhZ2luYXRpb25PcHRpb25zKCk6IEdyaWRPcHRpb24ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucztcclxuICB9XHJcbiAgQElucHV0KCkgZ3JpZDogYW55O1xyXG4gIGRhdGFGcm9tID0gMTtcclxuICBkYXRhVG8gPSAxO1xyXG4gIGl0ZW1zUGVyUGFnZTogbnVtYmVyO1xyXG4gIHBhZ2VDb3VudCA9IDA7XHJcbiAgcGFnZU51bWJlciA9IDE7XHJcbiAgdG90YWxJdGVtcyA9IDA7XHJcbiAgcGFnaW5hdGlvbkNhbGxiYWNrOiBGdW5jdGlvbjtcclxuICBwYWdpbmF0aW9uUGFnZVNpemVzID0gWzI1LCA3NSwgMTAwXTtcclxuICBmcm9tVG9QYXJhbXM6IGFueSA9IHsgZnJvbTogdGhpcy5kYXRhRnJvbSwgdG86IHRoaXMuZGF0YVRvLCB0b3RhbEl0ZW1zOiB0aGlzLnRvdGFsSXRlbXMgfTtcclxuXHJcbiAgLyoqIENvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmaWx0ZXJTZXJ2aWNlOiBGaWx0ZXJTZXJ2aWNlLCBwcml2YXRlIGdyaWRTZXJ2aWNlOiBHcmlkU2VydmljZSkge31cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucyA9IHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucztcclxuICAgIGlmICghdGhpcy5fZ3JpZFBhZ2luYXRpb25PcHRpb25zIHx8ICF0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMucGFnaW5hdGlvbiB8fCAodGhpcy5fZ3JpZFBhZ2luYXRpb25PcHRpb25zLnBhZ2luYXRpb24udG90YWxJdGVtcyAhPT0gdGhpcy50b3RhbEl0ZW1zKSkge1xyXG4gICAgICB0aGlzLnJlZnJlc2hQYWdpbmF0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3Vic2NyaWJlIHRvIEZpbHRlciBDbGVhciAmIENoYW5nZWQgYW5kIGdvIGJhY2sgdG8gcGFnZSAxIHdoZW4gdGhhdCBoYXBwZW5cclxuICAgIHRoaXMuX2ZpbHRlclN1YmNyaXB0aW9uID0gdGhpcy5maWx0ZXJTZXJ2aWNlLm9uRmlsdGVyQ2hhbmdlZC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZWZyZXNoUGFnaW5hdGlvbih0cnVlKSk7XHJcbiAgICB0aGlzLl9maWx0ZXJTdWJjcmlwdGlvbiA9IHRoaXMuZmlsdGVyU2VydmljZS5vbkZpbHRlckNsZWFyZWQuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVmcmVzaFBhZ2luYXRpb24odHJ1ZSkpO1xyXG5cclxuICAgIC8vIFN1YnNjcmliZSB0byBhbnkgZGF0YXZpZXcgcm93IGNvdW50IGNoYW5nZWQgc28gdGhhdCB3aGVuIEFkZGluZy9EZWxldGluZyBpdGVtKHMpIHRocm91Z2ggdGhlIERhdGFWaWV3XHJcbiAgICAvLyB0aGF0IHdvdWxkIHRyaWdnZXIgYSByZWZyZXNoIG9mIHRoZSBwYWdpbmF0aW9uIG51bWJlcnNcclxuICAgIGlmICh0aGlzLmRhdGFWaWV3KSB7XHJcbiAgICAgIHRoaXMuZ3JpZFNlcnZpY2Uub25JdGVtQWRkZWQuc3Vic2NyaWJlKChpdGVtczogYW55IHwgYW55W10pID0+IHRoaXMub25JdGVtQWRkZWRPclJlbW92ZWQoaXRlbXMsIHRydWUpKTtcclxuICAgICAgdGhpcy5ncmlkU2VydmljZS5vbkl0ZW1EZWxldGVkLnN1YnNjcmliZSgoaXRlbXM6IGFueSB8IGFueVtdKSA9PiB0aGlzLm9uSXRlbUFkZGVkT3JSZW1vdmVkKGl0ZW1zLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2VpbChudW1iZXI6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIE1hdGguY2VpbChudW1iZXIpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlVG9GaXJzdFBhZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5wYWdlTnVtYmVyID0gMTtcclxuICAgIHRoaXMub25QYWdlQ2hhbmdlZChldmVudCwgdGhpcy5wYWdlTnVtYmVyKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZVRvTGFzdFBhZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5wYWdlTnVtYmVyID0gdGhpcy5wYWdlQ291bnQ7XHJcbiAgICB0aGlzLm9uUGFnZUNoYW5nZWQoZXZlbnQsIHRoaXMucGFnZU51bWJlcik7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VUb05leHRQYWdlKGV2ZW50OiBhbnkpIHtcclxuICAgIGlmICh0aGlzLnBhZ2VOdW1iZXIgPCB0aGlzLnBhZ2VDb3VudCkge1xyXG4gICAgICB0aGlzLnBhZ2VOdW1iZXIrKztcclxuICAgICAgdGhpcy5vblBhZ2VDaGFuZ2VkKGV2ZW50LCB0aGlzLnBhZ2VOdW1iZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hhbmdlVG9QcmV2aW91c1BhZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgaWYgKHRoaXMucGFnZU51bWJlciA+IDApIHtcclxuICAgICAgdGhpcy5wYWdlTnVtYmVyLS07XHJcbiAgICAgIHRoaXMub25QYWdlQ2hhbmdlZChldmVudCwgdGhpcy5wYWdlTnVtYmVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoYW5nZVRvQ3VycmVudFBhZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5wYWdlTnVtYmVyID0gK2V2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWU7XHJcbiAgICBpZiAodGhpcy5wYWdlTnVtYmVyIDwgMSkge1xyXG4gICAgICB0aGlzLnBhZ2VOdW1iZXIgPSAxO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnBhZ2VOdW1iZXIgPiB0aGlzLnBhZ2VDb3VudCkge1xyXG4gICAgICB0aGlzLnBhZ2VOdW1iZXIgPSB0aGlzLnBhZ2VDb3VudDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9uUGFnZUNoYW5nZWQoZXZlbnQsIHRoaXMucGFnZU51bWJlcik7XHJcbiAgfVxyXG5cclxuICBkaXNwb3NlKCkge1xyXG4gICAgdGhpcy5vblBhZ2luYXRpb25DaGFuZ2VkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICBpZiAodGhpcy5fZmlsdGVyU3ViY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5fZmlsdGVyU3ViY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1bnN1YnNjcmliZSBhbGwgU2xpY2tHcmlkIGV2ZW50c1xyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnVuc3Vic2NyaWJlQWxsKCk7XHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZUl0ZW1QZXJQYWdlKGV2ZW50OiBhbnkpIHtcclxuICAgIGNvbnN0IGl0ZW1zUGVyUGFnZSA9ICtldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICB0aGlzLnBhZ2VDb3VudCA9IE1hdGguY2VpbCh0aGlzLnRvdGFsSXRlbXMgLyBpdGVtc1BlclBhZ2UpO1xyXG4gICAgdGhpcy5wYWdlTnVtYmVyID0gKHRoaXMudG90YWxJdGVtcyA+IDApID8gMSA6IDA7XHJcbiAgICB0aGlzLml0ZW1zUGVyUGFnZSA9IGl0ZW1zUGVyUGFnZTtcclxuICAgIHRoaXMub25QYWdlQ2hhbmdlZChldmVudCwgdGhpcy5wYWdlTnVtYmVyKTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hQYWdpbmF0aW9uKGlzUGFnZU51bWJlclJlc2V0OiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IGJhY2tlbmRBcGkgPSB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGk7XHJcbiAgICBpZiAoIWJhY2tlbmRBcGkgfHwgIWJhY2tlbmRBcGkuc2VydmljZSB8fCAhYmFja2VuZEFwaS5wcm9jZXNzKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQmFja2VuZFNlcnZpY2VBcGkgcmVxdWlyZXMgYXQgbGVhc3QgYSBcInByb2Nlc3NcIiBmdW5jdGlvbiBhbmQgYSBcInNlcnZpY2VcIiBkZWZpbmVkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucyAmJiB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMucGFnaW5hdGlvbikge1xyXG4gICAgICBjb25zdCBwYWdpbmF0aW9uID0gdGhpcy5fZ3JpZFBhZ2luYXRpb25PcHRpb25zLnBhZ2luYXRpb247XHJcbiAgICAgIC8vIHNldCB0aGUgbnVtYmVyIG9mIGl0ZW1zIHBlciBwYWdlIGlmIG5vdCBhbHJlYWR5IHNldFxyXG4gICAgICBpZiAoIXRoaXMuaXRlbXNQZXJQYWdlKSB7XHJcbiAgICAgICAgdGhpcy5pdGVtc1BlclBhZ2UgPSArKChiYWNrZW5kQXBpICYmIGJhY2tlbmRBcGkub3B0aW9ucyAmJiBiYWNrZW5kQXBpLm9wdGlvbnMucGFnaW5hdGlvbk9wdGlvbnMgJiYgYmFja2VuZEFwaS5vcHRpb25zLnBhZ2luYXRpb25PcHRpb25zLmZpcnN0KSA/IGJhY2tlbmRBcGkub3B0aW9ucy5wYWdpbmF0aW9uT3B0aW9ucy5maXJzdCA6IHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucy5wYWdpbmF0aW9uLnBhZ2VTaXplKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaWYgdG90YWxJdGVtcyBjaGFuZ2VkLCB3ZSBzaG91bGQgYWx3YXlzIGdvIGJhY2sgdG8gdGhlIGZpcnN0IHBhZ2UgYW5kIHJlY2FsY3VsYXRpb24gdGhlIEZyb20tVG8gaW5kZXhlc1xyXG4gICAgICBpZiAoaXNQYWdlTnVtYmVyUmVzZXQgfHwgdGhpcy50b3RhbEl0ZW1zICE9PSBwYWdpbmF0aW9uLnRvdGFsSXRlbXMpIHtcclxuICAgICAgICBpZiAodGhpcy5faXNGaXJzdFJlbmRlciAmJiBwYWdpbmF0aW9uLnBhZ2VOdW1iZXIgJiYgcGFnaW5hdGlvbi5wYWdlTnVtYmVyID4gMSkge1xyXG4gICAgICAgICAgdGhpcy5wYWdlTnVtYmVyID0gcGFnaW5hdGlvbi5wYWdlTnVtYmVyIHx8IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucGFnZU51bWJlciA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB3aGVuIHBhZ2UgbnVtYmVyIGlzIHNldCB0byAxIHRoZW4gYWxzbyByZXNldCB0aGUgXCJvZmZzZXRcIiBvZiBiYWNrZW5kIHNlcnZpY2VcclxuICAgICAgICBpZiAodGhpcy5wYWdlTnVtYmVyID09PSAxKSB7XHJcbiAgICAgICAgICBiYWNrZW5kQXBpLnNlcnZpY2UucmVzZXRQYWdpbmF0aW9uT3B0aW9ucygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gY2FsY3VsYXRlIGFuZCByZWZyZXNoIHRoZSBtdWx0aXBsZSBwcm9wZXJ0aWVzIG9mIHRoZSBwYWdpbmF0aW9uIFVJXHJcbiAgICAgIHRoaXMucGFnaW5hdGlvblBhZ2VTaXplcyA9IHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucy5wYWdpbmF0aW9uLnBhZ2VTaXplcztcclxuICAgICAgdGhpcy50b3RhbEl0ZW1zID0gdGhpcy5fZ3JpZFBhZ2luYXRpb25PcHRpb25zLnBhZ2luYXRpb24udG90YWxJdGVtcztcclxuICAgICAgdGhpcy5yZWNhbGN1bGF0ZUZyb21Ub0luZGV4ZXMoKTtcclxuICAgIH1cclxuICAgIHRoaXMucGFnZUNvdW50ID0gTWF0aC5jZWlsKHRoaXMudG90YWxJdGVtcyAvIHRoaXMuaXRlbXNQZXJQYWdlKTtcclxuICB9XHJcblxyXG4gIG9uUGFnZUNoYW5nZWQoZXZlbnQ6IEV2ZW50IHwgdW5kZWZpbmVkLCBwYWdlTnVtYmVyOiBudW1iZXIpIHtcclxuICAgIHRoaXMucmVjYWxjdWxhdGVGcm9tVG9JbmRleGVzKCk7XHJcblxyXG4gICAgY29uc3QgYmFja2VuZEFwaSA9IHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaTtcclxuICAgIGlmICghYmFja2VuZEFwaSB8fCAhYmFja2VuZEFwaS5zZXJ2aWNlIHx8ICFiYWNrZW5kQXBpLnByb2Nlc3MpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBCYWNrZW5kU2VydmljZUFwaSByZXF1aXJlcyBhdCBsZWFzdCBhIFwicHJvY2Vzc1wiIGZ1bmN0aW9uIGFuZCBhIFwic2VydmljZVwiIGRlZmluZWRgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5kYXRhVG8gPiB0aGlzLnRvdGFsSXRlbXMpIHtcclxuICAgICAgdGhpcy5kYXRhVG8gPSB0aGlzLnRvdGFsSXRlbXM7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMudG90YWxJdGVtcyA8IHRoaXMuaXRlbXNQZXJQYWdlKSB7XHJcbiAgICAgIHRoaXMuZGF0YVRvID0gdGhpcy50b3RhbEl0ZW1zO1xyXG4gICAgfVxyXG4gICAgaWYgKGJhY2tlbmRBcGkpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBpdGVtc1BlclBhZ2UgPSArdGhpcy5pdGVtc1BlclBhZ2U7XHJcblxyXG4gICAgICAgIC8vIGtlZXAgc3RhcnQgdGltZSAmIGVuZCB0aW1lc3RhbXBzICYgcmV0dXJuIGl0IGFmdGVyIHByb2Nlc3MgZXhlY3V0aW9uXHJcbiAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgLy8gcnVuIGFueSBwcmUtcHJvY2VzcywgaWYgZGVmaW5lZCwgZm9yIGV4YW1wbGUgYSBzcGlubmVyXHJcbiAgICAgICAgaWYgKGJhY2tlbmRBcGkucHJlUHJvY2Vzcykge1xyXG4gICAgICAgICAgYmFja2VuZEFwaS5wcmVQcm9jZXNzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBxdWVyeSA9IGJhY2tlbmRBcGkuc2VydmljZS5wcm9jZXNzT25QYWdpbmF0aW9uQ2hhbmdlZChldmVudCwgeyBuZXdQYWdlOiBwYWdlTnVtYmVyLCBwYWdlU2l6ZTogaXRlbXNQZXJQYWdlIH0pO1xyXG5cclxuICAgICAgICAvLyB0aGUgcHJvY2Vzc2VzIGNhbiBiZSBPYnNlcnZhYmxlcyAobGlrZSBIdHRwQ2xpZW50KSBvciBQcm9taXNlc1xyXG4gICAgICAgIGNvbnN0IHByb2Nlc3MgPSBiYWNrZW5kQXBpLnByb2Nlc3MocXVlcnkpO1xyXG4gICAgICAgIGlmIChwcm9jZXNzIGluc3RhbmNlb2YgUHJvbWlzZSAmJiBwcm9jZXNzLnRoZW4pIHtcclxuICAgICAgICAgIHByb2Nlc3MudGhlbigocHJvY2Vzc1Jlc3VsdDogR3JhcGhxbFJlc3VsdCB8IGFueSkgPT4gZXhlY3V0ZUJhY2tlbmRQcm9jZXNzZXNDYWxsYmFjayhzdGFydFRpbWUsIHByb2Nlc3NSZXN1bHQsIGJhY2tlbmRBcGksIHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucykpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlKHByb2Nlc3MpKSB7XHJcbiAgICAgICAgICBwcm9jZXNzLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHByb2Nlc3NSZXN1bHQ6IEdyYXBocWxSZXN1bHQgfCBhbnkpID0+IGV4ZWN1dGVCYWNrZW5kUHJvY2Vzc2VzQ2FsbGJhY2soc3RhcnRUaW1lLCBwcm9jZXNzUmVzdWx0LCBiYWNrZW5kQXBpLCB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMpLFxyXG4gICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4gb25CYWNrZW5kRXJyb3IoZXJyb3IsIGJhY2tlbmRBcGkpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBvbkJhY2tlbmRFcnJvcihlcnJvciwgYmFja2VuZEFwaSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGFnaW5hdGlvbiB3aXRoIGEgYmFja2VuZCBzZXJ2aWNlIHJlcXVpcmVzIFwiQmFja2VuZFNlcnZpY2VBcGlcIiB0byBiZSBkZWZpbmVkIGluIHlvdXIgZ3JpZCBvcHRpb25zJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZW1pdCB0aGUgY2hhbmdlcyB0byB0aGUgcGFyZW50IGNvbXBvbmVudFxyXG4gICAgdGhpcy5vblBhZ2luYXRpb25DaGFuZ2VkLmVtaXQoe1xyXG4gICAgICBwYWdlTnVtYmVyOiB0aGlzLnBhZ2VOdW1iZXIsXHJcbiAgICAgIHBhZ2VTaXplczogdGhpcy5wYWdpbmF0aW9uUGFnZVNpemVzLFxyXG4gICAgICBwYWdlU2l6ZTogdGhpcy5pdGVtc1BlclBhZ2UsXHJcbiAgICAgIHRvdGFsSXRlbXM6IHRoaXMudG90YWxJdGVtc1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZWNhbGN1bGF0ZUZyb21Ub0luZGV4ZXMoKSB7XHJcbiAgICBpZiAodGhpcy50b3RhbEl0ZW1zID09PSAwKSB7XHJcbiAgICAgIHRoaXMuZGF0YUZyb20gPSAwO1xyXG4gICAgICB0aGlzLmRhdGFUbyA9IDA7XHJcbiAgICAgIHRoaXMucGFnZU51bWJlciA9IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmRhdGFGcm9tID0gKHRoaXMucGFnZU51bWJlciAqIHRoaXMuaXRlbXNQZXJQYWdlKSAtIHRoaXMuaXRlbXNQZXJQYWdlICsgMTtcclxuICAgICAgdGhpcy5kYXRhVG8gPSAodGhpcy50b3RhbEl0ZW1zIDwgdGhpcy5pdGVtc1BlclBhZ2UpID8gdGhpcy50b3RhbEl0ZW1zIDogKHRoaXMucGFnZU51bWJlciAqIHRoaXMuaXRlbXNQZXJQYWdlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gaXRlbSBpcyBhZGRlZCBvciByZW1vdmVkLCB3ZSB3aWxsIHJlZnJlc2ggdGhlIG51bWJlcnMgb24gdGhlIHBhZ2luYXRpb24gaG93ZXZlciB3ZSB3b24ndCB0cmlnZ2VyIGEgYmFja2VuZCBjaGFuZ2VcclxuICAgKiBUaGlzIHdpbGwgaGF2ZSBhIHNpZGUgZWZmZWN0IHRob3VnaCwgd2hpY2ggaXMgdGhhdCB0aGUgXCJUb1wiIGNvdW50IHdvbid0IGJlIG1hdGNoaW5nIHRoZSBcIml0ZW1zIHBlciBwYWdlXCIgY291bnQsXHJcbiAgICogdGhhdCBpcyBhIG5lY2Vzc2FyeSBzaWRlIGVmZmVjdCB0byBhdm9pZCB0cmlnZ2VyaW5nIGEgYmFja2VuZCBxdWVyeSBqdXN0IHRvIHJlZnJlc2ggdGhlIHBhZ2luZyxcclxuICAgKiBiYXNpY2FsbHkgd2UgYXNzdW1lIHRoYXQgdGhpcyBvZmZzZXQgaXMgZmluZSBmb3IgdGhlIHRpbWUgYmVpbmcsXHJcbiAgICogdW50aWwgdXNlciBkb2VzIGFuIGFjdGlvbiB3aGljaCB3aWxsIHJlZnJlc2ggdGhlIGRhdGEgaGVuY2UgdGhlIHBhZ2luYXRpb24gd2hpY2ggd2lsbCB0aGVuIGJlY29tZSBub3JtYWwgYWdhaW5cclxuICAgKi9cclxuICBwcml2YXRlIG9uSXRlbUFkZGVkT3JSZW1vdmVkKGl0ZW1zOiBhbnkgfCBhbnlbXSwgaXNJdGVtQWRkZWQgPSB0cnVlKSB7XHJcbiAgICBpZiAoaXRlbXMgIT09IG51bGwpIHtcclxuICAgICAgY29uc3QgcHJldmlvdXNEYXRhVG8gPSB0aGlzLmRhdGFUbztcclxuICAgICAgY29uc3QgaXRlbUNvdW50ID0gQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcy5sZW5ndGggOiAxO1xyXG4gICAgICBjb25zdCBpdGVtQ291bnRXaXRoRGlyZWN0aW9uID0gaXNJdGVtQWRkZWQgPyAraXRlbUNvdW50IDogLWl0ZW1Db3VudDtcclxuXHJcbiAgICAgIC8vIHJlZnJlc2ggdGhlIHRvdGFsIGNvdW50IGluIHRoZSBwYWdpbmF0aW9uIGFuZCBpbiB0aGUgVUlcclxuICAgICAgdGhpcy50b3RhbEl0ZW1zICs9IGl0ZW1Db3VudFdpdGhEaXJlY3Rpb247XHJcbiAgICAgIHRoaXMucmVjYWxjdWxhdGVGcm9tVG9JbmRleGVzKCk7XHJcblxyXG4gICAgICAvLyBmaW5hbGx5IHJlZnJlc2ggdGhlIFwiVG9cIiBjb3VudCBhbmQgd2Uga25vdyBpdCBtaWdodCBiZSBkaWZmZXJlbnQgdGhhbiB0aGUgXCJpdGVtcyBwZXIgcGFnZVwiIGNvdW50XHJcbiAgICAgIC8vIGJ1dCB0aGlzIGlzIG5lY2Vzc2FyeSBzaW5jZSB3ZSBkb24ndCB3YW50IGFuIGFjdHVhbCBiYWNrZW5kIHJlZnJlc2hcclxuICAgICAgdGhpcy5kYXRhVG8gPSBwcmV2aW91c0RhdGFUbyArIGl0ZW1Db3VudFdpdGhEaXJlY3Rpb247XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==