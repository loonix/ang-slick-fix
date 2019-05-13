/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EmitterType, FieldType, SortDirection, SortDirectionNumber, } from './../models/index';
import { executeBackendProcessesCallback, onBackendError } from './backend-utilities';
import { getDescendantProperty } from './utilities';
import { sortByFieldType } from '../sorters/sorterUtilities';
import { isObservable, Subject } from 'rxjs';
var SortService = /** @class */ (function () {
    function SortService() {
        this._currentLocalSorters = [];
        this._eventHandler = new Slick.EventHandler();
        this._isBackendGrid = false;
        this.onSortChanged = new Subject();
        this.onSortCleared = new Subject();
    }
    Object.defineProperty(SortService.prototype, "_gridOptions", {
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
    Object.defineProperty(SortService.prototype, "_columnDefinitions", {
        /** Getter for the Column Definitions pulled through the Grid Object */
        get: /**
         * Getter for the Column Definitions pulled through the Grid Object
         * @private
         * @return {?}
         */
        function () {
            return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Attach a backend sort (single/multi) hook to the grid
     * @param grid SlickGrid Grid object
     * @param dataView SlickGrid DataView object
     */
    /**
     * Attach a backend sort (single/multi) hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView SlickGrid DataView object
     * @return {?}
     */
    SortService.prototype.attachBackendOnSort = /**
     * Attach a backend sort (single/multi) hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView SlickGrid DataView object
     * @return {?}
     */
    function (grid, dataView) {
        this._isBackendGrid = true;
        this._grid = grid;
        this._dataView = dataView;
        this._slickSubscriber = grid.onSort;
        // subscribe to the SlickGrid event and call the backend execution
        this._slickSubscriber.subscribe(this.onBackendSortChanged.bind(this));
    };
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    SortService.prototype.onBackendSortChanged = /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    function (event, args) {
        var _this = this;
        if (!args || !args.grid) {
            throw new Error('Something went wrong when trying to attach the "onBackendSortChanged(event, args)" function, it seems that "args" is not populated correctly');
        }
        /** @type {?} */
        var gridOptions = args.grid.getOptions() || {};
        /** @type {?} */
        var backendApi = gridOptions.backendServiceApi;
        if (!backendApi || !backendApi.process || !backendApi.service) {
            throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
        }
        try {
            // keep start time & end timestamps & return it after process execution
            /** @type {?} */
            var startTime_1 = new Date();
            if (backendApi.preProcess) {
                backendApi.preProcess();
            }
            /** @type {?} */
            var query = backendApi.service.processOnSortChanged(event, args);
            this.emitSortChanged(EmitterType.remote);
            // the processes can be Observables (like HttpClient) or Promises
            /** @type {?} */
            var process_1 = backendApi.process(query);
            if (process_1 instanceof Promise && process_1.then) {
                process_1.then((/**
                 * @param {?} processResult
                 * @return {?}
                 */
                function (processResult) { return executeBackendProcessesCallback(startTime_1, processResult, backendApi, _this._gridOptions); }));
            }
            else if (isObservable(process_1)) {
                process_1.subscribe((/**
                 * @param {?} processResult
                 * @return {?}
                 */
                function (processResult) { return executeBackendProcessesCallback(startTime_1, processResult, backendApi, _this._gridOptions); }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) { return onBackendError(error, backendApi); }));
            }
        }
        catch (error) {
            onBackendError(error, backendApi);
        }
    };
    /**
     * Attach a local sort (single/multi) hook to the grid
     * @param grid SlickGrid Grid object
     * @param gridOptions Grid Options object
     * @param dataView
     */
    /**
     * Attach a local sort (single/multi) hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView
     * @return {?}
     */
    SortService.prototype.attachLocalOnSort = /**
     * Attach a local sort (single/multi) hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView
     * @return {?}
     */
    function (grid, dataView) {
        var _this = this;
        this._isBackendGrid = false;
        this._grid = grid;
        this._dataView = dataView;
        this._slickSubscriber = grid.onSort;
        this._slickSubscriber.subscribe((/**
         * @param {?} e
         * @param {?} args
         * @return {?}
         */
        function (e, args) {
            // multiSort and singleSort are not exactly the same, but we want to structure it the same for the (for loop) after
            // also to avoid having to rewrite the for loop in the sort, we will make the singleSort an array of 1 object
            /** @type {?} */
            var sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortAsc: args.sortAsc, sortCol: args.sortCol });
            // keep current sorters
            _this._currentLocalSorters = []; // reset current local sorters
            if (Array.isArray(sortColumns)) {
                sortColumns.forEach((/**
                 * @param {?} sortColumn
                 * @return {?}
                 */
                function (sortColumn) {
                    if (sortColumn.sortCol) {
                        _this._currentLocalSorters.push({
                            columnId: sortColumn.sortCol.id,
                            direction: sortColumn.sortAsc ? SortDirection.ASC : SortDirection.DESC
                        });
                    }
                }));
            }
            _this.onLocalSortChanged(grid, dataView, sortColumns);
            _this.emitSortChanged(EmitterType.local);
        }));
    };
    /**
     * @param {?=} triggerQueryEvent
     * @return {?}
     */
    SortService.prototype.clearSorting = /**
     * @param {?=} triggerQueryEvent
     * @return {?}
     */
    function (triggerQueryEvent) {
        if (triggerQueryEvent === void 0) { triggerQueryEvent = true; }
        if (this._grid && this._gridOptions && this._dataView) {
            // remove any sort icons (this setSortColumns function call really does only that)
            this._grid.setSortColumns([]);
            // we also need to trigger a sort change
            // for a backend grid, we will trigger a backend sort changed with an empty sort columns array
            // however for a local grid, we need to pass a sort column and so we will sort by the 1st column
            if (triggerQueryEvent) {
                if (this._isBackendGrid) {
                    this.onBackendSortChanged(undefined, { grid: this._grid, sortCols: [] });
                }
                else {
                    if (this._columnDefinitions && Array.isArray(this._columnDefinitions)) {
                        this.onLocalSortChanged(this._grid, this._dataView, new Array({ sortAsc: true, sortCol: this._columnDefinitions[0] }));
                    }
                }
            }
            else if (this._isBackendGrid) {
                /** @type {?} */
                var backendService = this._gridOptions && this._gridOptions.backendServiceApi && this._gridOptions.backendServiceApi.service;
                if (backendService && backendService.clearSorters) {
                    backendService.clearSorters();
                }
            }
        }
        // set current sorter to empty & emit a sort changed event
        this._currentLocalSorters = [];
        // emit an event when sorts are all cleared
        this.onSortCleared.next(true);
    };
    /**
     * @return {?}
     */
    SortService.prototype.getCurrentLocalSorters = /**
     * @return {?}
     */
    function () {
        return this._currentLocalSorters;
    };
    /**
     * Get column sorts,
     * If a column is passed as an argument, we won't add this column to our output array since it is already in the array
     * We want to know the sort prior to calling the next sorting command
     */
    /**
     * Get column sorts,
     * If a column is passed as an argument, we won't add this column to our output array since it is already in the array
     * We want to know the sort prior to calling the next sorting command
     * @param {?=} columnId
     * @return {?}
     */
    SortService.prototype.getPreviousColumnSorts = /**
     * Get column sorts,
     * If a column is passed as an argument, we won't add this column to our output array since it is already in the array
     * We want to know the sort prior to calling the next sorting command
     * @param {?=} columnId
     * @return {?}
     */
    function (columnId) {
        var _this = this;
        // getSortColumns() only returns sortAsc & columnId, we want the entire column definition
        /** @type {?} */
        var oldSortColumns = this._grid && this._grid.getSortColumns();
        // get the column definition but only keep column which are not equal to our current column
        if (Array.isArray(oldSortColumns)) {
            /** @type {?} */
            var sortedCols = oldSortColumns.reduce((/**
             * @param {?} cols
             * @param {?} col
             * @return {?}
             */
            function (cols, col) {
                if (!columnId || col.columnId !== columnId) {
                    cols.push({ sortCol: _this._columnDefinitions[_this._grid.getColumnIndex(col.columnId)], sortAsc: col.sortAsc });
                }
                return cols;
            }), []);
            return sortedCols;
        }
        return [];
    };
    /**
     * load any presets if there are any
     * @param grid
     * @param dataView
     */
    /**
     * load any presets if there are any
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    SortService.prototype.loadLocalPresets = /**
     * load any presets if there are any
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    function (grid, dataView) {
        var _this = this;
        /** @type {?} */
        var sortCols = [];
        this._currentLocalSorters = []; // reset current local sorters
        if (this._gridOptions && this._gridOptions.presets && this._gridOptions.presets.sorters) {
            /** @type {?} */
            var sorters = this._gridOptions.presets.sorters;
            sorters.forEach((/**
             * @param {?} presetSorting
             * @return {?}
             */
            function (presetSorting) {
                /** @type {?} */
                var gridColumn = _this._columnDefinitions.find((/**
                 * @param {?} col
                 * @return {?}
                 */
                function (col) { return col.id === presetSorting.columnId; }));
                if (gridColumn) {
                    sortCols.push({
                        columnId: gridColumn.id,
                        sortAsc: ((presetSorting.direction.toUpperCase() === SortDirection.ASC) ? true : false),
                        sortCol: gridColumn
                    });
                    // keep current sorters
                    _this._currentLocalSorters.push({
                        columnId: gridColumn.id + '',
                        direction: (/** @type {?} */ (presetSorting.direction.toUpperCase()))
                    });
                }
            }));
            if (sortCols.length > 0) {
                this.onLocalSortChanged(grid, dataView, sortCols);
                grid.setSortColumns(sortCols); // use this to add sort icon(s) in UI
            }
        }
    };
    /**
     * @param {?} grid
     * @param {?} dataView
     * @param {?} sortColumns
     * @param {?=} forceReSort
     * @return {?}
     */
    SortService.prototype.onLocalSortChanged = /**
     * @param {?} grid
     * @param {?} dataView
     * @param {?} sortColumns
     * @param {?=} forceReSort
     * @return {?}
     */
    function (grid, dataView, sortColumns, forceReSort) {
        if (forceReSort === void 0) { forceReSort = false; }
        if (grid && dataView) {
            if (forceReSort) {
                dataView.reSort();
            }
            dataView.sort((/**
             * @param {?} dataRow1
             * @param {?} dataRow2
             * @return {?}
             */
            function (dataRow1, dataRow2) {
                for (var i = 0, l = sortColumns.length; i < l; i++) {
                    /** @type {?} */
                    var columnSortObj = sortColumns[i];
                    if (columnSortObj && columnSortObj.sortCol) {
                        /** @type {?} */
                        var sortDirection = columnSortObj.sortAsc ? SortDirectionNumber.asc : SortDirectionNumber.desc;
                        /** @type {?} */
                        var sortField = columnSortObj.sortCol.queryField || columnSortObj.sortCol.queryFieldSorter || columnSortObj.sortCol.field;
                        /** @type {?} */
                        var fieldType = columnSortObj.sortCol.type || FieldType.string;
                        /** @type {?} */
                        var value1 = dataRow1[sortField];
                        /** @type {?} */
                        var value2 = dataRow2[sortField];
                        // when item is a complex object (dot "." notation), we need to filter the value contained in the object tree
                        if (sortField && sortField.indexOf('.') >= 0) {
                            value1 = getDescendantProperty(dataRow1, sortField);
                            value2 = getDescendantProperty(dataRow2, sortField);
                        }
                        // user could provide his own custom Sorter
                        if (columnSortObj.sortCol && columnSortObj.sortCol.sorter) {
                            /** @type {?} */
                            var customSortResult = columnSortObj.sortCol.sorter(value1, value2, sortDirection, columnSortObj.sortCol);
                            if (customSortResult !== SortDirectionNumber.neutral) {
                                return customSortResult;
                            }
                        }
                        /** @type {?} */
                        var sortResult = sortByFieldType(value1, value2, fieldType, sortDirection, columnSortObj.sortCol);
                        if (sortResult !== SortDirectionNumber.neutral) {
                            return sortResult;
                        }
                    }
                }
                return SortDirectionNumber.neutral;
            }));
            grid.invalidate();
            grid.render();
        }
    };
    /**
     * @return {?}
     */
    SortService.prototype.dispose = /**
     * @return {?}
     */
    function () {
        // unsubscribe local event
        if (this._slickSubscriber && typeof this._slickSubscriber.unsubscribe === 'function') {
            this._slickSubscriber.unsubscribe();
        }
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
    };
    /**
     * A simple function that is attached to the subscriber and emit a change when the sort is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param sender
     */
    /**
     * A simple function that is attached to the subscriber and emit a change when the sort is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param {?} sender
     * @return {?}
     */
    SortService.prototype.emitSortChanged = /**
     * A simple function that is attached to the subscriber and emit a change when the sort is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param {?} sender
     * @return {?}
     */
    function (sender) {
        if (sender === EmitterType.remote && this._gridOptions && this._gridOptions.backendServiceApi) {
            /** @type {?} */
            var currentSorters = [];
            /** @type {?} */
            var backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentSorters) {
                currentSorters = (/** @type {?} */ (backendService.getCurrentSorters()));
            }
            this.onSortChanged.next(currentSorters);
        }
        else if (sender === EmitterType.local) {
            this.onSortChanged.next(this.getCurrentLocalSorters());
        }
    };
    return SortService;
}());
export { SortService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SortService.prototype._currentLocalSorters;
    /**
     * @type {?}
     * @private
     */
    SortService.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    SortService.prototype._dataView;
    /**
     * @type {?}
     * @private
     */
    SortService.prototype._grid;
    /**
     * @type {?}
     * @private
     */
    SortService.prototype._slickSubscriber;
    /**
     * @type {?}
     * @private
     */
    SortService.prototype._isBackendGrid;
    /** @type {?} */
    SortService.prototype.onSortChanged;
    /** @type {?} */
    SortService.prototype.onSortCleared;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9zb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFJTCxXQUFXLEVBQ1gsU0FBUyxFQUlULGFBQWEsRUFDYixtQkFBbUIsR0FFcEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsK0JBQStCLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUs3QztJQUFBO1FBQ1UseUJBQW9CLEdBQW9CLEVBQUUsQ0FBQztRQUMzQyxrQkFBYSxHQUFRLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBSTlDLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQy9CLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQW1CLENBQUM7UUFDL0Msa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO0lBdVF6QyxDQUFDO0lBcFFDLHNCQUFZLHFDQUFZO1FBRHhCLGlFQUFpRTs7Ozs7O1FBQ2pFO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzlFLENBQUM7OztPQUFBO0lBR0Qsc0JBQVksMkNBQWtCO1FBRDlCLHVFQUF1RTs7Ozs7O1FBQ3ZFO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FB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QUFlOzs7Ozs7SUFBZixVQUFnQixNQUFtQjtRQUNqQyxJQUFJLE1BQU0sS0FBSyxXQUFXLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRTs7Z0JBQ3pGLGNBQWMsR0FBb0IsRUFBRTs7Z0JBQ2xDLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLE9BQU87WUFDbEUsSUFBSSxjQUFjLElBQUksY0FBYyxDQUFDLGlCQUFpQixFQUFFO2dCQUN0RCxjQUFjLEdBQUcsbUJBQUEsY0FBYyxDQUFDLGlCQUFpQixFQUFFLEVBQW1CLENBQUM7YUFDeEU7WUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUN6QzthQUFNLElBQUksTUFBTSxLQUFLLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUEvUUQsSUErUUM7Ozs7Ozs7SUE5UUMsMkNBQW1EOzs7OztJQUNuRCxvQ0FBc0Q7Ozs7O0lBQ3RELGdDQUF1Qjs7Ozs7SUFDdkIsNEJBQW1COzs7OztJQUNuQix1Q0FBcUM7Ozs7O0lBQ3JDLHFDQUErQjs7SUFDL0Isb0NBQStDOztJQUMvQyxvQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb2x1bW4sXG4gIENvbHVtblNvcnQsXG4gIEN1cnJlbnRTb3J0ZXIsXG4gIEVtaXR0ZXJUeXBlLFxuICBGaWVsZFR5cGUsXG4gIEdyYXBocWxSZXN1bHQsXG4gIEdyaWRPcHRpb24sXG4gIFNsaWNrRXZlbnQsXG4gIFNvcnREaXJlY3Rpb24sXG4gIFNvcnREaXJlY3Rpb25OdW1iZXIsXG4gIFNvcnREaXJlY3Rpb25TdHJpbmcsXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IGV4ZWN1dGVCYWNrZW5kUHJvY2Vzc2VzQ2FsbGJhY2ssIG9uQmFja2VuZEVycm9yIH0gZnJvbSAnLi9iYWNrZW5kLXV0aWxpdGllcyc7XG5pbXBvcnQgeyBnZXREZXNjZW5kYW50UHJvcGVydHkgfSBmcm9tICcuL3V0aWxpdGllcyc7XG5pbXBvcnQgeyBzb3J0QnlGaWVsZFR5cGUgfSBmcm9tICcuLi9zb3J0ZXJzL3NvcnRlclV0aWxpdGllcyc7XG5pbXBvcnQgeyBpc09ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcblxuZXhwb3J0IGNsYXNzIFNvcnRTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfY3VycmVudExvY2FsU29ydGVyczogQ3VycmVudFNvcnRlcltdID0gW107XG4gIHByaXZhdGUgX2V2ZW50SGFuZGxlcjogYW55ID0gbmV3IFNsaWNrLkV2ZW50SGFuZGxlcigpO1xuICBwcml2YXRlIF9kYXRhVmlldzogYW55O1xuICBwcml2YXRlIF9ncmlkOiBhbnk7XG4gIHByaXZhdGUgX3NsaWNrU3Vic2NyaWJlcjogU2xpY2tFdmVudDtcbiAgcHJpdmF0ZSBfaXNCYWNrZW5kR3JpZCA9IGZhbHNlO1xuICBvblNvcnRDaGFuZ2VkID0gbmV3IFN1YmplY3Q8Q3VycmVudFNvcnRlcltdPigpO1xuICBvblNvcnRDbGVhcmVkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xuICBwcml2YXRlIGdldCBfZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLl9ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xuICB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIENvbHVtbiBEZWZpbml0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cbiAgcHJpdmF0ZSBnZXQgX2NvbHVtbkRlZmluaXRpb25zKCk6IENvbHVtbltdIHtcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKSA/IHRoaXMuX2dyaWQuZ2V0Q29sdW1ucygpIDogW107XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGEgYmFja2VuZCBzb3J0IChzaW5nbGUvbXVsdGkpIGhvb2sgdG8gdGhlIGdyaWRcbiAgICogQHBhcmFtIGdyaWQgU2xpY2tHcmlkIEdyaWQgb2JqZWN0XG4gICAqIEBwYXJhbSBkYXRhVmlldyBTbGlja0dyaWQgRGF0YVZpZXcgb2JqZWN0XG4gICAqL1xuICBhdHRhY2hCYWNrZW5kT25Tb3J0KGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSkge1xuICAgIHRoaXMuX2lzQmFja2VuZEdyaWQgPSB0cnVlO1xuICAgIHRoaXMuX2dyaWQgPSBncmlkO1xuICAgIHRoaXMuX2RhdGFWaWV3ID0gZGF0YVZpZXc7XG4gICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyID0gZ3JpZC5vblNvcnQ7XG5cbiAgICAvLyBzdWJzY3JpYmUgdG8gdGhlIFNsaWNrR3JpZCBldmVudCBhbmQgY2FsbCB0aGUgYmFja2VuZCBleGVjdXRpb25cbiAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIuc3Vic2NyaWJlKHRoaXMub25CYWNrZW5kU29ydENoYW5nZWQuYmluZCh0aGlzKSk7XG4gIH1cblxuICBvbkJhY2tlbmRTb3J0Q2hhbmdlZChldmVudDogRXZlbnQsIGFyZ3M6IGFueSkge1xuICAgIGlmICghYXJncyB8fCAhYXJncy5ncmlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoZW4gdHJ5aW5nIHRvIGF0dGFjaCB0aGUgXCJvbkJhY2tlbmRTb3J0Q2hhbmdlZChldmVudCwgYXJncylcIiBmdW5jdGlvbiwgaXQgc2VlbXMgdGhhdCBcImFyZ3NcIiBpcyBub3QgcG9wdWxhdGVkIGNvcnJlY3RseScpO1xuICAgIH1cbiAgICBjb25zdCBncmlkT3B0aW9uczogR3JpZE9wdGlvbiA9IGFyZ3MuZ3JpZC5nZXRPcHRpb25zKCkgfHwge307XG4gICAgY29uc3QgYmFja2VuZEFwaSA9IGdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xuXG4gICAgaWYgKCFiYWNrZW5kQXBpIHx8ICFiYWNrZW5kQXBpLnByb2Nlc3MgfHwgIWJhY2tlbmRBcGkuc2VydmljZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBCYWNrZW5kU2VydmljZUFwaSByZXF1aXJlcyBhdCBsZWFzdCBhIFwicHJvY2Vzc1wiIGZ1bmN0aW9uIGFuZCBhIFwic2VydmljZVwiIGRlZmluZWRgKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgLy8ga2VlcCBzdGFydCB0aW1lICYgZW5kIHRpbWVzdGFtcHMgJiByZXR1cm4gaXQgYWZ0ZXIgcHJvY2VzcyBleGVjdXRpb25cbiAgICAgIGNvbnN0IHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgIGlmIChiYWNrZW5kQXBpLnByZVByb2Nlc3MpIHtcbiAgICAgICAgYmFja2VuZEFwaS5wcmVQcm9jZXNzKCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHF1ZXJ5ID0gYmFja2VuZEFwaS5zZXJ2aWNlLnByb2Nlc3NPblNvcnRDaGFuZ2VkKGV2ZW50LCBhcmdzKTtcbiAgICAgIHRoaXMuZW1pdFNvcnRDaGFuZ2VkKEVtaXR0ZXJUeXBlLnJlbW90ZSk7XG5cbiAgICAgIC8vIHRoZSBwcm9jZXNzZXMgY2FuIGJlIE9ic2VydmFibGVzIChsaWtlIEh0dHBDbGllbnQpIG9yIFByb21pc2VzXG4gICAgICBjb25zdCBwcm9jZXNzID0gYmFja2VuZEFwaS5wcm9jZXNzKHF1ZXJ5KTtcbiAgICAgIGlmIChwcm9jZXNzIGluc3RhbmNlb2YgUHJvbWlzZSAmJiBwcm9jZXNzLnRoZW4pIHtcbiAgICAgICAgcHJvY2Vzcy50aGVuKChwcm9jZXNzUmVzdWx0OiBHcmFwaHFsUmVzdWx0IHwgYW55KSA9PiBleGVjdXRlQmFja2VuZFByb2Nlc3Nlc0NhbGxiYWNrKHN0YXJ0VGltZSwgcHJvY2Vzc1Jlc3VsdCwgYmFja2VuZEFwaSwgdGhpcy5fZ3JpZE9wdGlvbnMpKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlKHByb2Nlc3MpKSB7XG4gICAgICAgIHByb2Nlc3Muc3Vic2NyaWJlKFxuICAgICAgICAgIChwcm9jZXNzUmVzdWx0OiBHcmFwaHFsUmVzdWx0IHwgYW55KSA9PiBleGVjdXRlQmFja2VuZFByb2Nlc3Nlc0NhbGxiYWNrKHN0YXJ0VGltZSwgcHJvY2Vzc1Jlc3VsdCwgYmFja2VuZEFwaSwgdGhpcy5fZ3JpZE9wdGlvbnMpLFxuICAgICAgICAgIChlcnJvcjogYW55KSA9PiBvbkJhY2tlbmRFcnJvcihlcnJvciwgYmFja2VuZEFwaSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgb25CYWNrZW5kRXJyb3IoZXJyb3IsIGJhY2tlbmRBcGkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBsb2NhbCBzb3J0IChzaW5nbGUvbXVsdGkpIGhvb2sgdG8gdGhlIGdyaWRcbiAgICogQHBhcmFtIGdyaWQgU2xpY2tHcmlkIEdyaWQgb2JqZWN0XG4gICAqIEBwYXJhbSBncmlkT3B0aW9ucyBHcmlkIE9wdGlvbnMgb2JqZWN0XG4gICAqIEBwYXJhbSBkYXRhVmlld1xuICAgKi9cbiAgYXR0YWNoTG9jYWxPblNvcnQoZ3JpZDogYW55LCBkYXRhVmlldzogYW55KSB7XG4gICAgdGhpcy5faXNCYWNrZW5kR3JpZCA9IGZhbHNlO1xuICAgIHRoaXMuX2dyaWQgPSBncmlkO1xuICAgIHRoaXMuX2RhdGFWaWV3ID0gZGF0YVZpZXc7XG4gICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyID0gZ3JpZC5vblNvcnQ7XG5cbiAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIuc3Vic2NyaWJlKChlOiBhbnksIGFyZ3M6IGFueSkgPT4ge1xuICAgICAgLy8gbXVsdGlTb3J0IGFuZCBzaW5nbGVTb3J0IGFyZSBub3QgZXhhY3RseSB0aGUgc2FtZSwgYnV0IHdlIHdhbnQgdG8gc3RydWN0dXJlIGl0IHRoZSBzYW1lIGZvciB0aGUgKGZvciBsb29wKSBhZnRlclxuICAgICAgLy8gYWxzbyB0byBhdm9pZCBoYXZpbmcgdG8gcmV3cml0ZSB0aGUgZm9yIGxvb3AgaW4gdGhlIHNvcnQsIHdlIHdpbGwgbWFrZSB0aGUgc2luZ2xlU29ydCBhbiBhcnJheSBvZiAxIG9iamVjdFxuICAgICAgY29uc3Qgc29ydENvbHVtbnMgPSAoYXJncy5tdWx0aUNvbHVtblNvcnQpID8gYXJncy5zb3J0Q29scyA6IG5ldyBBcnJheSh7c29ydEFzYzogYXJncy5zb3J0QXNjLCBzb3J0Q29sOiBhcmdzLnNvcnRDb2x9KTtcblxuICAgICAgLy8ga2VlcCBjdXJyZW50IHNvcnRlcnNcbiAgICAgIHRoaXMuX2N1cnJlbnRMb2NhbFNvcnRlcnMgPSBbXTsgLy8gcmVzZXQgY3VycmVudCBsb2NhbCBzb3J0ZXJzXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShzb3J0Q29sdW1ucykpIHtcbiAgICAgICAgc29ydENvbHVtbnMuZm9yRWFjaCgoc29ydENvbHVtbjogeyBzb3J0Q29sOiBDb2x1bW4sIHNvcnRBc2M6IG51bWJlciB9KSA9PiB7XG4gICAgICAgICAgaWYgKHNvcnRDb2x1bW4uc29ydENvbCkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudExvY2FsU29ydGVycy5wdXNoKHtcbiAgICAgICAgICAgICAgY29sdW1uSWQ6IHNvcnRDb2x1bW4uc29ydENvbC5pZCxcbiAgICAgICAgICAgICAgZGlyZWN0aW9uOiBzb3J0Q29sdW1uLnNvcnRBc2MgPyBTb3J0RGlyZWN0aW9uLkFTQyA6IFNvcnREaXJlY3Rpb24uREVTQ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5vbkxvY2FsU29ydENoYW5nZWQoZ3JpZCwgZGF0YVZpZXcsIHNvcnRDb2x1bW5zKTtcbiAgICAgIHRoaXMuZW1pdFNvcnRDaGFuZ2VkKEVtaXR0ZXJUeXBlLmxvY2FsKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsZWFyU29ydGluZyh0cmlnZ2VyUXVlcnlFdmVudCA9IHRydWUpIHtcbiAgICBpZiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9kYXRhVmlldykge1xuICAgICAgLy8gcmVtb3ZlIGFueSBzb3J0IGljb25zICh0aGlzIHNldFNvcnRDb2x1bW5zIGZ1bmN0aW9uIGNhbGwgcmVhbGx5IGRvZXMgb25seSB0aGF0KVxuICAgICAgdGhpcy5fZ3JpZC5zZXRTb3J0Q29sdW1ucyhbXSk7XG5cbiAgICAgIC8vIHdlIGFsc28gbmVlZCB0byB0cmlnZ2VyIGEgc29ydCBjaGFuZ2VcbiAgICAgIC8vIGZvciBhIGJhY2tlbmQgZ3JpZCwgd2Ugd2lsbCB0cmlnZ2VyIGEgYmFja2VuZCBzb3J0IGNoYW5nZWQgd2l0aCBhbiBlbXB0eSBzb3J0IGNvbHVtbnMgYXJyYXlcbiAgICAgIC8vIGhvd2V2ZXIgZm9yIGEgbG9jYWwgZ3JpZCwgd2UgbmVlZCB0byBwYXNzIGEgc29ydCBjb2x1bW4gYW5kIHNvIHdlIHdpbGwgc29ydCBieSB0aGUgMXN0IGNvbHVtblxuICAgICAgaWYgKHRyaWdnZXJRdWVyeUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0JhY2tlbmRHcmlkKSB7XG4gICAgICAgICAgdGhpcy5vbkJhY2tlbmRTb3J0Q2hhbmdlZCh1bmRlZmluZWQsIHsgZ3JpZDogdGhpcy5fZ3JpZCwgc29ydENvbHM6IFtdIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLl9jb2x1bW5EZWZpbml0aW9ucyAmJiBBcnJheS5pc0FycmF5KHRoaXMuX2NvbHVtbkRlZmluaXRpb25zKSkge1xuICAgICAgICAgICAgdGhpcy5vbkxvY2FsU29ydENoYW5nZWQodGhpcy5fZ3JpZCwgdGhpcy5fZGF0YVZpZXcsIG5ldyBBcnJheSh7c29ydEFzYzogdHJ1ZSwgc29ydENvbDogdGhpcy5fY29sdW1uRGVmaW5pdGlvbnNbMF0gfSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9pc0JhY2tlbmRHcmlkKSB7XG4gICAgICAgIGNvbnN0IGJhY2tlbmRTZXJ2aWNlID0gdGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkuc2VydmljZTtcbiAgICAgICAgaWYgKGJhY2tlbmRTZXJ2aWNlICYmIGJhY2tlbmRTZXJ2aWNlLmNsZWFyU29ydGVycykge1xuICAgICAgICAgIGJhY2tlbmRTZXJ2aWNlLmNsZWFyU29ydGVycygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gc2V0IGN1cnJlbnQgc29ydGVyIHRvIGVtcHR5ICYgZW1pdCBhIHNvcnQgY2hhbmdlZCBldmVudFxuICAgIHRoaXMuX2N1cnJlbnRMb2NhbFNvcnRlcnMgPSBbXTtcblxuICAgIC8vIGVtaXQgYW4gZXZlbnQgd2hlbiBzb3J0cyBhcmUgYWxsIGNsZWFyZWRcbiAgICB0aGlzLm9uU29ydENsZWFyZWQubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGdldEN1cnJlbnRMb2NhbFNvcnRlcnMoKTogQ3VycmVudFNvcnRlcltdIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudExvY2FsU29ydGVycztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY29sdW1uIHNvcnRzLFxuICAgKiBJZiBhIGNvbHVtbiBpcyBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIHdlIHdvbid0IGFkZCB0aGlzIGNvbHVtbiB0byBvdXIgb3V0cHV0IGFycmF5IHNpbmNlIGl0IGlzIGFscmVhZHkgaW4gdGhlIGFycmF5XG4gICAqIFdlIHdhbnQgdG8ga25vdyB0aGUgc29ydCBwcmlvciB0byBjYWxsaW5nIHRoZSBuZXh0IHNvcnRpbmcgY29tbWFuZFxuICAgKi9cbiAgZ2V0UHJldmlvdXNDb2x1bW5Tb3J0cyhjb2x1bW5JZD86IHN0cmluZykge1xuICAgIC8vIGdldFNvcnRDb2x1bW5zKCkgb25seSByZXR1cm5zIHNvcnRBc2MgJiBjb2x1bW5JZCwgd2Ugd2FudCB0aGUgZW50aXJlIGNvbHVtbiBkZWZpbml0aW9uXG4gICAgY29uc3Qgb2xkU29ydENvbHVtbnMgPSB0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0U29ydENvbHVtbnMoKTtcblxuICAgIC8vIGdldCB0aGUgY29sdW1uIGRlZmluaXRpb24gYnV0IG9ubHkga2VlcCBjb2x1bW4gd2hpY2ggYXJlIG5vdCBlcXVhbCB0byBvdXIgY3VycmVudCBjb2x1bW5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvbGRTb3J0Q29sdW1ucykpIHtcbiAgICAgIGNvbnN0IHNvcnRlZENvbHMgPSBvbGRTb3J0Q29sdW1ucy5yZWR1Y2UoKGNvbHMsIGNvbCkgPT4ge1xuICAgICAgICBpZiAoIWNvbHVtbklkIHx8IGNvbC5jb2x1bW5JZCAhPT0gY29sdW1uSWQpIHtcbiAgICAgICAgICBjb2xzLnB1c2goeyBzb3J0Q29sOiB0aGlzLl9jb2x1bW5EZWZpbml0aW9uc1t0aGlzLl9ncmlkLmdldENvbHVtbkluZGV4KGNvbC5jb2x1bW5JZCldLCBzb3J0QXNjOiBjb2wuc29ydEFzYyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29scztcbiAgICAgIH0sIFtdKTtcblxuICAgICAgcmV0dXJuIHNvcnRlZENvbHM7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBsb2FkIGFueSBwcmVzZXRzIGlmIHRoZXJlIGFyZSBhbnlcbiAgICogQHBhcmFtIGdyaWRcbiAgICogQHBhcmFtIGRhdGFWaWV3XG4gICAqL1xuICBsb2FkTG9jYWxQcmVzZXRzKGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSkge1xuICAgIGNvbnN0IHNvcnRDb2xzOiBDb2x1bW5Tb3J0W10gPSBbXTtcbiAgICB0aGlzLl9jdXJyZW50TG9jYWxTb3J0ZXJzID0gW107IC8vIHJlc2V0IGN1cnJlbnQgbG9jYWwgc29ydGVyc1xuICAgIGlmICh0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5wcmVzZXRzICYmIHRoaXMuX2dyaWRPcHRpb25zLnByZXNldHMuc29ydGVycykge1xuICAgICAgY29uc3Qgc29ydGVycyA9IHRoaXMuX2dyaWRPcHRpb25zLnByZXNldHMuc29ydGVycztcblxuICAgICAgc29ydGVycy5mb3JFYWNoKChwcmVzZXRTb3J0aW5nOiBDdXJyZW50U29ydGVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGdyaWRDb2x1bW4gPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5maW5kKChjb2w6IENvbHVtbikgPT4gY29sLmlkID09PSBwcmVzZXRTb3J0aW5nLmNvbHVtbklkKTtcbiAgICAgICAgaWYgKGdyaWRDb2x1bW4pIHtcbiAgICAgICAgICBzb3J0Q29scy5wdXNoKHtcbiAgICAgICAgICAgIGNvbHVtbklkOiBncmlkQ29sdW1uLmlkLFxuICAgICAgICAgICAgc29ydEFzYzogKChwcmVzZXRTb3J0aW5nLmRpcmVjdGlvbi50b1VwcGVyQ2FzZSgpID09PSBTb3J0RGlyZWN0aW9uLkFTQykgPyB0cnVlIDogZmFsc2UpLFxuICAgICAgICAgICAgc29ydENvbDogZ3JpZENvbHVtblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8ga2VlcCBjdXJyZW50IHNvcnRlcnNcbiAgICAgICAgICB0aGlzLl9jdXJyZW50TG9jYWxTb3J0ZXJzLnB1c2goe1xuICAgICAgICAgICAgY29sdW1uSWQ6IGdyaWRDb2x1bW4uaWQgKyAnJyxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogcHJlc2V0U29ydGluZy5kaXJlY3Rpb24udG9VcHBlckNhc2UoKSBhcyBTb3J0RGlyZWN0aW9uU3RyaW5nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoc29ydENvbHMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLm9uTG9jYWxTb3J0Q2hhbmdlZChncmlkLCBkYXRhVmlldywgc29ydENvbHMpO1xuICAgICAgICBncmlkLnNldFNvcnRDb2x1bW5zKHNvcnRDb2xzKTsgLy8gdXNlIHRoaXMgdG8gYWRkIHNvcnQgaWNvbihzKSBpbiBVSVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uTG9jYWxTb3J0Q2hhbmdlZChncmlkOiBhbnksIGRhdGFWaWV3OiBhbnksIHNvcnRDb2x1bW5zOiBDb2x1bW5Tb3J0W10sIGZvcmNlUmVTb3J0ID0gZmFsc2UpIHtcbiAgICBpZiAoZ3JpZCAmJiBkYXRhVmlldykge1xuICAgICAgaWYgKGZvcmNlUmVTb3J0KSB7XG4gICAgICAgIGRhdGFWaWV3LnJlU29ydCgpO1xuICAgICAgfVxuXG4gICAgICBkYXRhVmlldy5zb3J0KChkYXRhUm93MTogYW55LCBkYXRhUm93MjogYW55KSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gc29ydENvbHVtbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY29sdW1uU29ydE9iaiA9IHNvcnRDb2x1bW5zW2ldO1xuICAgICAgICAgIGlmIChjb2x1bW5Tb3J0T2JqICYmIGNvbHVtblNvcnRPYmouc29ydENvbCkge1xuICAgICAgICAgICAgY29uc3Qgc29ydERpcmVjdGlvbiA9IGNvbHVtblNvcnRPYmouc29ydEFzYyA/IFNvcnREaXJlY3Rpb25OdW1iZXIuYXNjIDogU29ydERpcmVjdGlvbk51bWJlci5kZXNjO1xuICAgICAgICAgICAgY29uc3Qgc29ydEZpZWxkID0gY29sdW1uU29ydE9iai5zb3J0Q29sLnF1ZXJ5RmllbGQgfHwgY29sdW1uU29ydE9iai5zb3J0Q29sLnF1ZXJ5RmllbGRTb3J0ZXIgfHwgY29sdW1uU29ydE9iai5zb3J0Q29sLmZpZWxkO1xuICAgICAgICAgICAgY29uc3QgZmllbGRUeXBlID0gY29sdW1uU29ydE9iai5zb3J0Q29sLnR5cGUgfHwgRmllbGRUeXBlLnN0cmluZztcbiAgICAgICAgICAgIGxldCB2YWx1ZTEgPSBkYXRhUm93MVtzb3J0RmllbGRdO1xuICAgICAgICAgICAgbGV0IHZhbHVlMiA9IGRhdGFSb3cyW3NvcnRGaWVsZF07XG5cbiAgICAgICAgICAgIC8vIHdoZW4gaXRlbSBpcyBhIGNvbXBsZXggb2JqZWN0IChkb3QgXCIuXCIgbm90YXRpb24pLCB3ZSBuZWVkIHRvIGZpbHRlciB0aGUgdmFsdWUgY29udGFpbmVkIGluIHRoZSBvYmplY3QgdHJlZVxuICAgICAgICAgICAgaWYgKHNvcnRGaWVsZCAmJiBzb3J0RmllbGQuaW5kZXhPZignLicpID49IDApIHtcbiAgICAgICAgICAgICAgdmFsdWUxID0gZ2V0RGVzY2VuZGFudFByb3BlcnR5KGRhdGFSb3cxLCBzb3J0RmllbGQpO1xuICAgICAgICAgICAgICB2YWx1ZTIgPSBnZXREZXNjZW5kYW50UHJvcGVydHkoZGF0YVJvdzIsIHNvcnRGaWVsZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHVzZXIgY291bGQgcHJvdmlkZSBoaXMgb3duIGN1c3RvbSBTb3J0ZXJcbiAgICAgICAgICAgIGlmIChjb2x1bW5Tb3J0T2JqLnNvcnRDb2wgJiYgY29sdW1uU29ydE9iai5zb3J0Q29sLnNvcnRlcikge1xuICAgICAgICAgICAgICBjb25zdCBjdXN0b21Tb3J0UmVzdWx0ID0gY29sdW1uU29ydE9iai5zb3J0Q29sLnNvcnRlcih2YWx1ZTEsIHZhbHVlMiwgc29ydERpcmVjdGlvbiwgY29sdW1uU29ydE9iai5zb3J0Q29sKTtcbiAgICAgICAgICAgICAgaWYgKGN1c3RvbVNvcnRSZXN1bHQgIT09IFNvcnREaXJlY3Rpb25OdW1iZXIubmV1dHJhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXN0b21Tb3J0UmVzdWx0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHNvcnRSZXN1bHQgPSBzb3J0QnlGaWVsZFR5cGUodmFsdWUxLCB2YWx1ZTIsIGZpZWxkVHlwZSwgc29ydERpcmVjdGlvbiwgY29sdW1uU29ydE9iai5zb3J0Q29sKTtcbiAgICAgICAgICAgIGlmIChzb3J0UmVzdWx0ICE9PSBTb3J0RGlyZWN0aW9uTnVtYmVyLm5ldXRyYWwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNvcnRSZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTb3J0RGlyZWN0aW9uTnVtYmVyLm5ldXRyYWw7XG4gICAgICB9KTtcblxuICAgICAgZ3JpZC5pbnZhbGlkYXRlKCk7XG4gICAgICBncmlkLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgLy8gdW5zdWJzY3JpYmUgbG9jYWwgZXZlbnRcbiAgICBpZiAodGhpcy5fc2xpY2tTdWJzY3JpYmVyICYmIHR5cGVvZiB0aGlzLl9zbGlja1N1YnNjcmliZXIudW5zdWJzY3JpYmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCBTbGlja0dyaWQgZXZlbnRzXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnVuc3Vic2NyaWJlQWxsKCk7XG4gIH1cblxuICAvKipcbiAgICogQSBzaW1wbGUgZnVuY3Rpb24gdGhhdCBpcyBhdHRhY2hlZCB0byB0aGUgc3Vic2NyaWJlciBhbmQgZW1pdCBhIGNoYW5nZSB3aGVuIHRoZSBzb3J0IGlzIGNhbGxlZC5cbiAgICogT3RoZXIgc2VydmljZXMsIGxpa2UgUGFnaW5hdGlvbiwgY2FuIHRoZW4gc3Vic2NyaWJlIHRvIGl0LlxuICAgKiBAcGFyYW0gc2VuZGVyXG4gICAqL1xuICBlbWl0U29ydENoYW5nZWQoc2VuZGVyOiBFbWl0dGVyVHlwZSkge1xuICAgIGlmIChzZW5kZXIgPT09IEVtaXR0ZXJUeXBlLnJlbW90ZSAmJiB0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xuICAgICAgbGV0IGN1cnJlbnRTb3J0ZXJzOiBDdXJyZW50U29ydGVyW10gPSBbXTtcbiAgICAgIGNvbnN0IGJhY2tlbmRTZXJ2aWNlID0gdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkuc2VydmljZTtcbiAgICAgIGlmIChiYWNrZW5kU2VydmljZSAmJiBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50U29ydGVycykge1xuICAgICAgICBjdXJyZW50U29ydGVycyA9IGJhY2tlbmRTZXJ2aWNlLmdldEN1cnJlbnRTb3J0ZXJzKCkgYXMgQ3VycmVudFNvcnRlcltdO1xuICAgICAgfVxuICAgICAgdGhpcy5vblNvcnRDaGFuZ2VkLm5leHQoY3VycmVudFNvcnRlcnMpO1xuICAgIH0gZWxzZSBpZiAoc2VuZGVyID09PSBFbWl0dGVyVHlwZS5sb2NhbCkge1xuICAgICAgdGhpcy5vblNvcnRDaGFuZ2VkLm5leHQodGhpcy5nZXRDdXJyZW50TG9jYWxTb3J0ZXJzKCkpO1xuICAgIH1cbiAgfVxufVxuIl19