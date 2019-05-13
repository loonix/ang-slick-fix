/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { EmitterType, FieldType, KeyCode, OperatorType, } from './../models/index';
import { executeBackendProcessesCallback, onBackendError } from './backend-utilities';
import { getDescendantProperty } from './utilities';
import { FilterConditions } from './../filter-conditions';
import { FilterFactory } from '../filters/filterFactory';
import { isObservable, Subject } from 'rxjs';
import * as isequal_ from 'lodash.isequal';
/** @type {?} */
var isequal = isequal_;
// timer for keeping track of user typing waits
/** @type {?} */
var timer;
/** @type {?} */
var DEFAULT_FILTER_TYPING_DEBOUNCE = 500;
var FilterService = /** @class */ (function () {
    function FilterService(filterFactory) {
        this.filterFactory = filterFactory;
        this._eventHandler = new Slick.EventHandler();
        this._isFilterFirstRender = true;
        this._firstColumnIdRendered = '';
        this._filters = [];
        this._columnFilters = {};
        this.onFilterChanged = new Subject();
        this.onFilterCleared = new Subject();
    }
    Object.defineProperty(FilterService.prototype, "_gridOptions", {
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
    Object.defineProperty(FilterService.prototype, "_columnDefinitions", {
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
     * @param {?} grid
     * @return {?}
     */
    FilterService.prototype.init = /**
     * @param {?} grid
     * @return {?}
     */
    function (grid) {
        this._grid = grid;
    };
    /**
     * Attach a backend filter hook to the grid
     * @param grid SlickGrid Grid object
     */
    /**
     * Attach a backend filter hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView
     * @return {?}
     */
    FilterService.prototype.attachBackendOnFilter = /**
     * Attach a backend filter hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView
     * @return {?}
     */
    function (grid, dataView) {
        var _this = this;
        this._dataView = dataView;
        this._filters = [];
        this._slickSubscriber = new Slick.Event();
        // subscribe to the SlickGrid event and call the backend execution
        this._slickSubscriber.subscribe(this.onBackendFilterChange.bind(this));
        // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
        this._eventHandler.subscribe(grid.onHeaderRowCellRendered, (/**
         * @param {?} e
         * @param {?} args
         * @return {?}
         */
        function (e, args) {
            // firstColumnIdRendered is null at first, so if it changes to being filled and equal then we know it was already rendered
            if (args.column.id === _this._firstColumnIdRendered) {
                _this._isFilterFirstRender = false;
            }
            _this.addFilterTemplateToHeaderRow(args, _this._isFilterFirstRender);
            if (_this._firstColumnIdRendered === '') {
                _this._firstColumnIdRendered = args.column.id;
            }
        }));
    };
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    FilterService.prototype.onBackendFilterChange = /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    function (event, args) {
        var _this = this;
        if (!args || !args.grid) {
            throw new Error('Something went wrong when trying to attach the "attachBackendOnFilterSubscribe(event, args)" function, it seems that "args" is not populated correctly');
        }
        /** @type {?} */
        var backendApi = this._gridOptions.backendServiceApi;
        if (!backendApi || !backendApi.process || !backendApi.service) {
            throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
        }
        try {
            // keep start time & end timestamps & return it after process execution
            /** @type {?} */
            var startTime_1 = new Date();
            // run a preProcess callback if defined
            if (backendApi.preProcess) {
                backendApi.preProcess();
            }
            // only add a delay when user is typing, on select dropdown filter (or "Clear Filter") it will execute right away
            /** @type {?} */
            var debounceTypingDelay = 0;
            /** @type {?} */
            var isTriggeredByClearFilter = args && args.clearFilterTriggered;
            if (!isTriggeredByClearFilter && event && event.keyCode !== KeyCode.ENTER && (event.type === 'input' || event.type === 'keyup' || event.type === 'keydown')) {
                debounceTypingDelay = backendApi.filterTypingDebounce || DEFAULT_FILTER_TYPING_DEBOUNCE;
            }
            // query backend, except when it's called by a ClearFilters then we won't
            if (args && args.shouldTriggerQuery) {
                // call the service to get a query back
                if (debounceTypingDelay > 0) {
                    clearTimeout(timer);
                    timer = setTimeout((/**
                     * @return {?}
                     */
                    function () { return _this.executeBackendCallback(event, args, startTime_1, backendApi); }), debounceTypingDelay);
                }
                else {
                    this.executeBackendCallback(event, args, startTime_1, backendApi);
                }
            }
        }
        catch (error) {
            onBackendError(error, backendApi);
        }
    };
    /**
     * @param {?} event
     * @param {?} args
     * @param {?} startTime
     * @param {?} backendApi
     * @return {?}
     */
    FilterService.prototype.executeBackendCallback = /**
     * @param {?} event
     * @param {?} args
     * @param {?} startTime
     * @param {?} backendApi
     * @return {?}
     */
    function (event, args, startTime, backendApi) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var query, process;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, backendApi.service.processOnFilterChanged(event, args)];
                    case 1:
                        query = _a.sent();
                        // emit an onFilterChanged event when it's not called by a clear filter
                        if (args && !args.clearFilterTriggered) {
                            this.emitFilterChanged(EmitterType.remote);
                        }
                        // the processes can be Observables (like HttpClient) or Promises
                        process = backendApi.process(query);
                        if (process instanceof Promise && process.then) {
                            process.then((/**
                             * @param {?} processResult
                             * @return {?}
                             */
                            function (processResult) { return executeBackendProcessesCallback(startTime, processResult, backendApi, _this._gridOptions); }));
                        }
                        else if (isObservable(process)) {
                            process.subscribe((/**
                             * @param {?} processResult
                             * @return {?}
                             */
                            function (processResult) { return executeBackendProcessesCallback(startTime, processResult, backendApi, _this._gridOptions); }), (/**
                             * @param {?} error
                             * @return {?}
                             */
                            function (error) { return onBackendError(error, backendApi); }));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Attach a local filter hook to the grid
     * @param grid SlickGrid Grid object
     * @param dataView
     */
    /**
     * Attach a local filter hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView
     * @return {?}
     */
    FilterService.prototype.attachLocalOnFilter = /**
     * Attach a local filter hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView
     * @return {?}
     */
    function (grid, dataView) {
        var _this = this;
        this._filters = [];
        this._dataView = dataView;
        this._slickSubscriber = new Slick.Event();
        dataView.setFilterArgs({ columnFilters: this._columnFilters, grid: this._grid });
        dataView.setFilter(this.customLocalFilter.bind(this, dataView));
        this._slickSubscriber.subscribe((/**
         * @param {?} e
         * @param {?} args
         * @return {?}
         */
        function (e, args) {
            /** @type {?} */
            var columnId = args.columnId;
            if (columnId != null) {
                dataView.refresh();
            }
            // emit an onFilterChanged event when it's not called by a clear filter
            if (args && !args.clearFilterTriggered) {
                _this.emitFilterChanged(EmitterType.local);
            }
        }));
        // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
        this._eventHandler.subscribe(grid.onHeaderRowCellRendered, (/**
         * @param {?} e
         * @param {?} args
         * @return {?}
         */
        function (e, args) {
            _this.addFilterTemplateToHeaderRow(args);
        }));
    };
    /**
     * @param {?} event
     * @param {?} columnId
     * @return {?}
     */
    FilterService.prototype.clearFilterByColumnId = /**
     * @param {?} event
     * @param {?} columnId
     * @return {?}
     */
    function (event, columnId) {
        /** @type {?} */
        var colFilter = this._filters.find((/**
         * @param {?} filter
         * @return {?}
         */
        function (filter) { return filter.columnDef.id === columnId; }));
        if (colFilter && colFilter.clear) {
            colFilter.clear(true);
        }
        // we need to loop through all columnFilters and delete the filter found
        // only trying to clear columnFilter (without looping through) would not trigger a dataset change
        for (var colId in this._columnFilters) {
            if (colId === columnId && this._columnFilters[colId]) {
                delete this._columnFilters[colId];
            }
        }
        /** @type {?} */
        var emitter = EmitterType.local;
        /** @type {?} */
        var isBackendApi = this._gridOptions && this._gridOptions.backendServiceApi || false;
        // when using a backend service, we need to manually trigger a filter change
        if (isBackendApi) {
            emitter = EmitterType.remote;
            this.onBackendFilterChange((/** @type {?} */ (event)), { grid: this._grid, columnFilters: this._columnFilters });
        }
        // emit an event when filter is cleared
        this.emitFilterChanged(emitter);
    };
    /** Clear the search filters (below the column titles) */
    /**
     * Clear the search filters (below the column titles)
     * @return {?}
     */
    FilterService.prototype.clearFilters = /**
     * Clear the search filters (below the column titles)
     * @return {?}
     */
    function () {
        this._filters.forEach((/**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            if (filter && filter.clear) {
                // clear element and trigger a change
                filter.clear(false);
            }
        }));
        // we need to loop through all columnFilters and delete them 1 by 1
        // only trying to clear columnFilter (without looping through) would not trigger a dataset change
        for (var columnId in this._columnFilters) {
            if (columnId && this._columnFilters[columnId]) {
                delete this._columnFilters[columnId];
            }
        }
        // we also need to refresh the dataView and optionally the grid (it's optional since we use DataView)
        if (this._dataView && this._grid) {
            this._dataView.refresh();
            this._grid.invalidate();
        }
        // when using backend service, we need to query only once so it's better to do it here
        if (this._gridOptions && this._gridOptions.backendServiceApi) {
            /** @type {?} */
            var callbackArgs = { clearFilterTriggered: true, shouldTriggerQuery: true, grid: this._grid, columnFilters: this._columnFilters };
            this.executeBackendCallback(undefined, callbackArgs, new Date(), this._gridOptions.backendServiceApi);
        }
        // emit an event when filters are all cleared
        this.onFilterCleared.next(true);
    };
    /**
     * @param {?} dataView
     * @param {?} item
     * @param {?} args
     * @return {?}
     */
    FilterService.prototype.customLocalFilter = /**
     * @param {?} dataView
     * @param {?} item
     * @param {?} args
     * @return {?}
     */
    function (dataView, item, args) {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(Object.keys(args.columnFilters)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var columnId = _c.value;
                /** @type {?} */
                var columnFilter = args.columnFilters[columnId];
                /** @type {?} */
                var columnIndex = args.grid.getColumnIndex(columnId);
                /** @type {?} */
                var columnDef = args.grid.getColumns()[columnIndex];
                if (!columnDef) {
                    return false;
                }
                // Row Detail View plugin, if the row is padding we just get the value we're filtering on from it's parent
                if (this._gridOptions.enableRowDetailView) {
                    /** @type {?} */
                    var metadataPrefix = this._gridOptions.rowDetailView && this._gridOptions.rowDetailView.keyPrefix || '__';
                    if (item[metadataPrefix + "isPadding"] && item[metadataPrefix + "parent"]) {
                        item = item[metadataPrefix + "parent"];
                    }
                }
                /** @type {?} */
                var dataKey = columnDef.dataKey;
                /** @type {?} */
                var fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field;
                /** @type {?} */
                var fieldType = columnDef.type || FieldType.string;
                /** @type {?} */
                var filterSearchType = (columnDef.filterSearchType) ? columnDef.filterSearchType : null;
                /** @type {?} */
                var cellValue = item[fieldName];
                // when item is a complex object (dot "." notation), we need to filter the value contained in the object tree
                if (fieldName.indexOf('.') >= 0) {
                    cellValue = getDescendantProperty(item, fieldName);
                }
                // if we find searchTerms use them but make a deep copy so that we don't affect original array
                // we might have to overwrite the value(s) locally that are returned
                // e.g: we don't want to operator within the search value, since it will fail filter condition check trigger afterward
                /** @type {?} */
                var searchValues = (columnFilter && columnFilter.searchTerms) ? $.extend(true, [], columnFilter.searchTerms) : null;
                /** @type {?} */
                var fieldSearchValue = (Array.isArray(searchValues) && searchValues.length === 1) ? searchValues[0] : '';
                /** @type {?} */
                var matches = null;
                if (fieldType !== FieldType.object) {
                    fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                    matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                }
                /** @type {?} */
                var operator = columnFilter.operator || ((matches) ? matches[1] : '');
                /** @type {?} */
                var searchTerm = (!!matches) ? matches[2] : '';
                /** @type {?} */
                var lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                if (searchValues && searchValues.length > 1) {
                    fieldSearchValue = searchValues.join(',');
                }
                else if (typeof fieldSearchValue === 'string') {
                    // escaping the search value
                    fieldSearchValue = fieldSearchValue.replace("'", "''"); // escape single quotes by doubling them
                    if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar === '*') {
                        operator = (operator === '*' || operator === '*z') ? OperatorType.endsWith : OperatorType.startsWith;
                    }
                }
                // no need to query if search value is empty
                if (searchTerm === '' && (!searchValues || (Array.isArray(searchValues) && searchValues.length === 0))) {
                    return true;
                }
                // if search value has a regex match we will only keep the value without the operator
                // in this case we need to overwrite the returned search values to truncate operator from the string search
                if (Array.isArray(matches) && matches.length >= 1 && (Array.isArray(searchValues) && searchValues.length === 1)) {
                    searchValues[0] = searchTerm;
                }
                // filter search terms should always be string type (even though we permit the end user to input numbers)
                // so make sure each term are strings, if user has some default search terms, we will cast them to string
                if (searchValues && Array.isArray(searchValues) && fieldType !== FieldType.object) {
                    for (var k = 0, ln = searchValues.length; k < ln; k++) {
                        // make sure all search terms are strings
                        searchValues[k] = ((searchValues[k] === undefined || searchValues[k] === null) ? '' : searchValues[k]) + '';
                    }
                }
                // when using localization (i18n), we should use the formatter output to search as the new cell value
                if (columnDef && columnDef.params && columnDef.params.useFormatterOuputToFilter) {
                    /** @type {?} */
                    var rowIndex = (dataView && typeof dataView.getIdxById === 'function') ? dataView.getIdxById(item.id) : 0;
                    cellValue = columnDef.formatter(rowIndex, columnIndex, cellValue, columnDef, item, this._grid);
                }
                // make sure cell value is always a string
                if (typeof cellValue === 'number') {
                    cellValue = cellValue.toString();
                }
                /** @type {?} */
                var conditionOptions = {
                    dataKey: dataKey,
                    fieldType: fieldType,
                    searchTerms: searchValues,
                    cellValue: cellValue,
                    operator: operator,
                    cellValueLastChar: lastValueChar,
                    filterSearchType: filterSearchType
                };
                if (!FilterConditions.executeMappedCondition(conditionOptions)) {
                    return false;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return true;
    };
    /**
     * @return {?}
     */
    FilterService.prototype.dispose = /**
     * @return {?}
     */
    function () {
        this.disposeColumnFilters();
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        // unsubscribe local event
        if (this._slickSubscriber && typeof this._slickSubscriber.unsubscribe === 'function') {
            this._slickSubscriber.unsubscribe();
        }
    };
    /**
     * Dispose of the filters, since it's a singleton, we don't want to affect other grids with same columns
     */
    /**
     * Dispose of the filters, since it's a singleton, we don't want to affect other grids with same columns
     * @return {?}
     */
    FilterService.prototype.disposeColumnFilters = /**
     * Dispose of the filters, since it's a singleton, we don't want to affect other grids with same columns
     * @return {?}
     */
    function () {
        // we need to loop through all columnFilters and delete them 1 by 1
        // only trying to make columnFilter an empty (without looping) would not trigger a dataset change
        for (var columnId in this._columnFilters) {
            if (columnId && this._columnFilters[columnId]) {
                delete this._columnFilters[columnId];
            }
        }
        // also destroy each Filter instances
        this._filters.forEach((/**
         * @param {?} filter
         * @param {?} index
         * @return {?}
         */
        function (filter, index) {
            if (filter && filter.destroy) {
                filter.destroy(true);
            }
        }));
    };
    /**
     * @return {?}
     */
    FilterService.prototype.getColumnFilters = /**
     * @return {?}
     */
    function () {
        return this._columnFilters;
    };
    /**
     * @return {?}
     */
    FilterService.prototype.getCurrentLocalFilters = /**
     * @return {?}
     */
    function () {
        var e_2, _a;
        /** @type {?} */
        var currentFilters = [];
        if (this._columnFilters) {
            try {
                for (var _b = tslib_1.__values(Object.keys(this._columnFilters)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var colId = _c.value;
                    /** @type {?} */
                    var columnFilter = this._columnFilters[colId];
                    /** @type {?} */
                    var filter = (/** @type {?} */ ({ columnId: colId || '' }));
                    if (columnFilter && columnFilter.searchTerms) {
                        filter.searchTerms = columnFilter.searchTerms;
                    }
                    if (columnFilter.operator) {
                        filter.operator = columnFilter.operator;
                    }
                    if (Array.isArray(filter.searchTerms) && filter.searchTerms.length > 0 && filter.searchTerms[0] !== '') {
                        currentFilters.push(filter);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return currentFilters;
    };
    /**
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    FilterService.prototype.callbackSearchEvent = /**
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    function (e, args) {
        if (args) {
            /** @type {?} */
            var searchTerm = ((e && e.target) ? ((/** @type {?} */ (e.target))).value : undefined);
            /** @type {?} */
            var searchTerms = (args.searchTerms && Array.isArray(args.searchTerms)) ? args.searchTerms : (searchTerm ? [searchTerm] : undefined);
            /** @type {?} */
            var columnDef = args.columnDef || null;
            /** @type {?} */
            var columnId = columnDef ? (columnDef.id || '') : '';
            /** @type {?} */
            var operator = args.operator || undefined;
            /** @type {?} */
            var hasSearchTerms = searchTerms && Array.isArray(searchTerms);
            /** @type {?} */
            var termsCount = hasSearchTerms && searchTerms.length;
            /** @type {?} */
            var oldColumnFilters = tslib_1.__assign({}, this._columnFilters);
            if (!hasSearchTerms || termsCount === 0 || (termsCount === 1 && searchTerms[0] === '')) {
                // delete the property from the columnFilters when it becomes empty
                // without doing this, it would leave an incorrect state of the previous column filters when filtering on another column
                delete this._columnFilters[columnId];
            }
            else {
                /** @type {?} */
                var colId = (/** @type {?} */ ('' + columnId));
                /** @type {?} */
                var colFilter = {
                    columnId: colId,
                    columnDef: columnDef,
                    searchTerms: searchTerms,
                };
                if (operator) {
                    colFilter.operator = operator;
                }
                this._columnFilters[colId] = colFilter;
            }
            // trigger an event only if Filters changed or if ENTER key was pressed
            /** @type {?} */
            var eventKeyCode = e && e.keyCode;
            if (eventKeyCode === KeyCode.ENTER || !isequal(oldColumnFilters, this._columnFilters)) {
                this.triggerEvent(this._slickSubscriber, {
                    clearFilterTriggered: args.clearFilterTriggered,
                    shouldTriggerQuery: args.shouldTriggerQuery,
                    columnId: columnId,
                    columnDef: args.columnDef || null,
                    columnFilters: this._columnFilters,
                    operator: operator,
                    searchTerms: searchTerms,
                    serviceOptions: this._onFilterChangedOptions,
                    grid: this._grid
                }, e);
            }
        }
    };
    /**
     * @param {?} args
     * @param {?=} isFilterFirstRender
     * @return {?}
     */
    FilterService.prototype.addFilterTemplateToHeaderRow = /**
     * @param {?} args
     * @param {?=} isFilterFirstRender
     * @return {?}
     */
    function (args, isFilterFirstRender) {
        if (isFilterFirstRender === void 0) { isFilterFirstRender = true; }
        /** @type {?} */
        var columnDef = args.column;
        /** @type {?} */
        var columnId = columnDef.id || '';
        if (columnDef && columnId !== 'selector' && columnDef.filterable) {
            /** @type {?} */
            var searchTerms = void 0;
            /** @type {?} */
            var operator = void 0;
            /** @type {?} */
            var filter_1 = this.filterFactory.createFilter(args.column.filter);
            operator = (columnDef && columnDef.filter && columnDef.filter.operator) || (filter_1 && filter_1.operator) || undefined;
            if (this._columnFilters[columnDef.id]) {
                searchTerms = this._columnFilters[columnDef.id].searchTerms || undefined;
                operator = this._columnFilters[columnDef.id].operator || undefined;
            }
            else if (columnDef.filter) {
                // when hiding/showing (with Column Picker or Grid Menu), it will try to re-create yet again the filters (since SlickGrid does a re-render)
                // because of that we need to first get searchTerm(s) from the columnFilters (that is what the user last entered)
                searchTerms = columnDef.filter.searchTerms || undefined;
                this.updateColumnFilters(searchTerms, columnDef, operator);
            }
            /** @type {?} */
            var filterArguments = {
                grid: this._grid,
                operator: operator,
                searchTerms: searchTerms,
                columnDef: columnDef,
                callback: this.callbackSearchEvent.bind(this)
            };
            if (filter_1) {
                filter_1.init(filterArguments, isFilterFirstRender);
                /** @type {?} */
                var filterExistIndex = this._filters.findIndex((/**
                 * @param {?} filt
                 * @return {?}
                 */
                function (filt) { return filter_1.columnDef.name === filt.columnDef.name; }));
                // add to the filters arrays or replace it when found
                if (filterExistIndex === -1) {
                    this._filters.push(filter_1);
                }
                else {
                    this._filters[filterExistIndex] = filter_1;
                }
                // when hiding/showing (with Column Picker or Grid Menu), it will try to re-create yet again the filters (since SlickGrid does a re-render)
                // we need to also set again the values in the DOM elements if the values were set by a searchTerm(s)
                if (searchTerms && filter_1.setValues) {
                    filter_1.setValues(searchTerms);
                }
            }
        }
    };
    /**
     * A simple function that is attached to the subscriber and emit a change when the filter is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param caller
     */
    /**
     * A simple function that is attached to the subscriber and emit a change when the filter is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param {?} caller
     * @return {?}
     */
    FilterService.prototype.emitFilterChanged = /**
     * A simple function that is attached to the subscriber and emit a change when the filter is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param {?} caller
     * @return {?}
     */
    function (caller) {
        if (caller === EmitterType.remote && this._gridOptions && this._gridOptions.backendServiceApi) {
            /** @type {?} */
            var currentFilters = [];
            /** @type {?} */
            var backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentFilters) {
                currentFilters = (/** @type {?} */ (backendService.getCurrentFilters()));
            }
            this.onFilterChanged.next(currentFilters);
        }
        else if (caller === EmitterType.local) {
            this.onFilterChanged.next(this.getCurrentLocalFilters());
        }
    };
    /**
     * When user passes an array of preset filters, we need to pre-populate each column filter searchTerm(s)
     * The process is to loop through the preset filters array, find the associated column from columnDefinitions and fill in the filter object searchTerm(s)
     * This is basically the same as if we would manually add searchTerm(s) to a column filter object in the column definition, but we do it programmatically.
     * At the end of the day, when creating the Filter (DOM Element), it will use these searchTerm(s) so we can take advantage of that without recoding each Filter type (DOM element)
     */
    /**
     * When user passes an array of preset filters, we need to pre-populate each column filter searchTerm(s)
     * The process is to loop through the preset filters array, find the associated column from columnDefinitions and fill in the filter object searchTerm(s)
     * This is basically the same as if we would manually add searchTerm(s) to a column filter object in the column definition, but we do it programmatically.
     * At the end of the day, when creating the Filter (DOM Element), it will use these searchTerm(s) so we can take advantage of that without recoding each Filter type (DOM element)
     * @return {?}
     */
    FilterService.prototype.populateColumnFilterSearchTerms = /**
     * When user passes an array of preset filters, we need to pre-populate each column filter searchTerm(s)
     * The process is to loop through the preset filters array, find the associated column from columnDefinitions and fill in the filter object searchTerm(s)
     * This is basically the same as if we would manually add searchTerm(s) to a column filter object in the column definition, but we do it programmatically.
     * At the end of the day, when creating the Filter (DOM Element), it will use these searchTerm(s) so we can take advantage of that without recoding each Filter type (DOM element)
     * @return {?}
     */
    function () {
        if (this._gridOptions.presets && Array.isArray(this._gridOptions.presets.filters) && this._gridOptions.presets.filters.length > 0) {
            /** @type {?} */
            var filters_1 = this._gridOptions.presets.filters;
            this._columnDefinitions.forEach((/**
             * @param {?} columnDef
             * @return {?}
             */
            function (columnDef) {
                // clear any columnDef searchTerms before applying Presets
                if (columnDef.filter && columnDef.filter.searchTerms) {
                    delete columnDef.filter.searchTerms;
                }
                // from each presets, we will find the associated columnDef and apply the preset searchTerms & operator if there is
                /** @type {?} */
                var columnPreset = filters_1.find((/**
                 * @param {?} presetFilter
                 * @return {?}
                 */
                function (presetFilter) {
                    return presetFilter.columnId === columnDef.id;
                }));
                if (columnPreset && columnPreset.searchTerms && Array.isArray(columnPreset.searchTerms)) {
                    columnDef.filter = columnDef.filter || {};
                    columnDef.filter.operator = columnPreset.operator || columnDef.filter.operator || '';
                    columnDef.filter.searchTerms = columnPreset.searchTerms;
                }
            }));
        }
    };
    /**
     * @private
     * @param {?} searchTerms
     * @param {?} columnDef
     * @param {?=} operator
     * @return {?}
     */
    FilterService.prototype.updateColumnFilters = /**
     * @private
     * @param {?} searchTerms
     * @param {?} columnDef
     * @param {?=} operator
     * @return {?}
     */
    function (searchTerms, columnDef, operator) {
        if (searchTerms && columnDef) {
            // this._columnFilters.searchTerms = searchTerms;
            this._columnFilters[columnDef.id] = {
                columnId: columnDef.id,
                columnDef: columnDef,
                searchTerms: searchTerms,
                operator: operator
            };
        }
    };
    /**
     * @private
     * @param {?} slickEvent
     * @param {?} args
     * @param {?} e
     * @return {?}
     */
    FilterService.prototype.triggerEvent = /**
     * @private
     * @param {?} slickEvent
     * @param {?} args
     * @param {?} e
     * @return {?}
     */
    function (slickEvent, args, e) {
        slickEvent = slickEvent || new Slick.Event();
        // event might have been created as a CustomEvent (e.g. CompoundDateFilter), without being a valid Slick.EventData.
        // if so we will create a new Slick.EventData and merge it with that CustomEvent to avoid having SlickGrid errors
        /** @type {?} */
        var event = e;
        if (e && typeof e.isPropagationStopped !== 'function') {
            event = $.extend({}, new Slick.EventData(), e);
        }
        slickEvent.notify(args, event, args.grid);
    };
    FilterService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FilterService.ctorParameters = function () { return [
        { type: FilterFactory }
    ]; };
    return FilterService;
}());
export { FilterService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FilterService.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    FilterService.prototype._isFilterFirstRender;
    /**
     * @type {?}
     * @private
     */
    FilterService.prototype._firstColumnIdRendered;
    /**
     * @type {?}
     * @private
     */
    FilterService.prototype._slickSubscriber;
    /**
     * @type {?}
     * @private
     */
    FilterService.prototype._filters;
    /**
     * @type {?}
     * @private
     */
    FilterService.prototype._columnFilters;
    /**
     * @type {?}
     * @private
     */
    FilterService.prototype._dataView;
    /**
     * @type {?}
     * @private
     */
    FilterService.prototype._grid;
    /**
     * @type {?}
     * @private
     */
    FilterService.prototype._onFilterChangedOptions;
    /** @type {?} */
    FilterService.prototype.onFilterChanged;
    /** @type {?} */
    FilterService.prototype.onFilterCleared;
    /**
     * @type {?}
     * @private
     */
    FilterService.prototype.filterFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2ZpbHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBS0wsV0FBVyxFQUlYLFNBQVMsRUFHVCxPQUFPLEVBQ1AsWUFBWSxHQUtiLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLCtCQUErQixFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxLQUFLLFFBQVEsTUFBTSxnQkFBZ0IsQ0FBQzs7SUFDckMsT0FBTyxHQUFHLFFBQVE7OztJQU9wQixLQUFVOztJQUNSLDhCQUE4QixHQUFHLEdBQUc7QUFFMUM7SUFjRSx1QkFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFaeEMsa0JBQWEsR0FBRyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6Qyx5QkFBb0IsR0FBRyxJQUFJLENBQUM7UUFDNUIsMkJBQXNCLEdBQUcsRUFBRSxDQUFDO1FBRTVCLGFBQVEsR0FBVSxFQUFFLENBQUM7UUFDckIsbUJBQWMsR0FBa0IsRUFBRSxDQUFDO1FBSTNDLG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQW1CLENBQUM7UUFDakQsb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFB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QUNULENBQUM7U0FDSDtJQUNILENBQUM7Ozs7Ozs7O0lBRU8sb0NBQVk7Ozs7Ozs7SUFBcEIsVUFBcUIsVUFBZSxFQUFFLElBQVMsRUFBRSxDQUFNO1FBQ3JELFVBQVUsR0FBRyxVQUFVLElBQUksSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7Ozs7WUFJekMsS0FBSyxHQUFHLENBQUM7UUFDYixJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxvQkFBb0IsS0FBSyxVQUFVLEVBQUU7WUFDckQsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDOztnQkFoaEJGLFVBQVU7Ozs7Z0JBYkYsYUFBYTs7SUE4aEJ0QixvQkFBQztDQUFBLEFBamhCRCxJQWloQkM7U0FoaEJZLGFBQWE7Ozs7OztJQUN4QixzQ0FBaUQ7Ozs7O0lBQ2pELDZDQUFvQzs7Ozs7SUFDcEMsK0NBQW9DOzs7OztJQUNwQyx5Q0FBcUM7Ozs7O0lBQ3JDLGlDQUE2Qjs7Ozs7SUFDN0IsdUNBQTJDOzs7OztJQUMzQyxrQ0FBdUI7Ozs7O0lBQ3ZCLDhCQUFtQjs7Ozs7SUFDbkIsZ0RBQXFDOztJQUNyQyx3Q0FBaUQ7O0lBQ2pELHdDQUF5Qzs7Ozs7SUFFN0Isc0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEJhY2tlbmRTZXJ2aWNlQXBpLFxyXG4gIENvbHVtbixcclxuICBDb2x1bW5GaWx0ZXIsXHJcbiAgQ29sdW1uRmlsdGVycyxcclxuICBFbWl0dGVyVHlwZSxcclxuICBGaWx0ZXIsXHJcbiAgRmlsdGVyQXJndW1lbnRzLFxyXG4gIEZpbHRlckNhbGxiYWNrQXJnLFxyXG4gIEZpZWxkVHlwZSxcclxuICBHcmFwaHFsUmVzdWx0LFxyXG4gIEdyaWRPcHRpb24sXHJcbiAgS2V5Q29kZSxcclxuICBPcGVyYXRvclR5cGUsXHJcbiAgQ3VycmVudEZpbHRlcixcclxuICBTZWFyY2hUZXJtLFxyXG4gIFNsaWNrRXZlbnQsXHJcbiAgT3BlcmF0b3JTdHJpbmcsXHJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBleGVjdXRlQmFja2VuZFByb2Nlc3Nlc0NhbGxiYWNrLCBvbkJhY2tlbmRFcnJvciB9IGZyb20gJy4vYmFja2VuZC11dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBnZXREZXNjZW5kYW50UHJvcGVydHkgfSBmcm9tICcuL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7IEZpbHRlckNvbmRpdGlvbnMgfSBmcm9tICcuLy4uL2ZpbHRlci1jb25kaXRpb25zJztcclxuaW1wb3J0IHsgRmlsdGVyRmFjdG9yeSB9IGZyb20gJy4uL2ZpbHRlcnMvZmlsdGVyRmFjdG9yeSc7XHJcbmltcG9ydCB7IGlzT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgKiBhcyBpc2VxdWFsXyBmcm9tICdsb2Rhc2guaXNlcXVhbCc7XHJcbmNvbnN0IGlzZXF1YWwgPSBpc2VxdWFsXzsgLy8gcGF0Y2ggdG8gZml4IHJvbGx1cCB0byB3b3JrXHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbi8vIHRpbWVyIGZvciBrZWVwaW5nIHRyYWNrIG9mIHVzZXIgdHlwaW5nIHdhaXRzXHJcbmxldCB0aW1lcjogYW55O1xyXG5jb25zdCBERUZBVUxUX0ZJTFRFUl9UWVBJTkdfREVCT1VOQ0UgPSA1MDA7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGaWx0ZXJTZXJ2aWNlIHtcclxuICBwcml2YXRlIF9ldmVudEhhbmRsZXIgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XHJcbiAgcHJpdmF0ZSBfaXNGaWx0ZXJGaXJzdFJlbmRlciA9IHRydWU7XHJcbiAgcHJpdmF0ZSBfZmlyc3RDb2x1bW5JZFJlbmRlcmVkID0gJyc7XHJcbiAgcHJpdmF0ZSBfc2xpY2tTdWJzY3JpYmVyOiBTbGlja0V2ZW50O1xyXG4gIHByaXZhdGUgX2ZpbHRlcnM6IGFueVtdID0gW107XHJcbiAgcHJpdmF0ZSBfY29sdW1uRmlsdGVyczogQ29sdW1uRmlsdGVycyA9IHt9O1xyXG4gIHByaXZhdGUgX2RhdGFWaWV3OiBhbnk7XHJcbiAgcHJpdmF0ZSBfZ3JpZDogYW55O1xyXG4gIHByaXZhdGUgX29uRmlsdGVyQ2hhbmdlZE9wdGlvbnM6IGFueTtcclxuICBvbkZpbHRlckNoYW5nZWQgPSBuZXcgU3ViamVjdDxDdXJyZW50RmlsdGVyW10+KCk7XHJcbiAgb25GaWx0ZXJDbGVhcmVkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmaWx0ZXJGYWN0b3J5OiBGaWx0ZXJGYWN0b3J5KSB7IH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBwcml2YXRlIGdldCBfZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgQ29sdW1uIERlZmluaXRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByaXZhdGUgZ2V0IF9jb2x1bW5EZWZpbml0aW9ucygpOiBDb2x1bW5bXSB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKSA/IHRoaXMuX2dyaWQuZ2V0Q29sdW1ucygpIDogW107XHJcbiAgfVxyXG5cclxuICBpbml0KGdyaWQ6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRhY2ggYSBiYWNrZW5kIGZpbHRlciBob29rIHRvIHRoZSBncmlkXHJcbiAgICogQHBhcmFtIGdyaWQgU2xpY2tHcmlkIEdyaWQgb2JqZWN0XHJcbiAgICovXHJcbiAgYXR0YWNoQmFja2VuZE9uRmlsdGVyKGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSkge1xyXG4gICAgdGhpcy5fZGF0YVZpZXcgPSBkYXRhVmlldztcclxuICAgIHRoaXMuX2ZpbHRlcnMgPSBbXTtcclxuICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlciA9IG5ldyBTbGljay5FdmVudCgpO1xyXG5cclxuICAgIC8vIHN1YnNjcmliZSB0byB0aGUgU2xpY2tHcmlkIGV2ZW50IGFuZCBjYWxsIHRoZSBiYWNrZW5kIGV4ZWN1dGlvblxyXG4gICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyLnN1YnNjcmliZSh0aGlzLm9uQmFja2VuZEZpbHRlckNoYW5nZS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAvLyBzdWJzY3JpYmUgdG8gU2xpY2tHcmlkIG9uSGVhZGVyUm93Q2VsbFJlbmRlcmVkIGV2ZW50IHRvIGNyZWF0ZSBmaWx0ZXIgdGVtcGxhdGVcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZ3JpZC5vbkhlYWRlclJvd0NlbGxSZW5kZXJlZCwgKGU6IEtleWJvYXJkRXZlbnQsIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAvLyBmaXJzdENvbHVtbklkUmVuZGVyZWQgaXMgbnVsbCBhdCBmaXJzdCwgc28gaWYgaXQgY2hhbmdlcyB0byBiZWluZyBmaWxsZWQgYW5kIGVxdWFsIHRoZW4gd2Uga25vdyBpdCB3YXMgYWxyZWFkeSByZW5kZXJlZFxyXG4gICAgICBpZiAoYXJncy5jb2x1bW4uaWQgPT09IHRoaXMuX2ZpcnN0Q29sdW1uSWRSZW5kZXJlZCkge1xyXG4gICAgICAgIHRoaXMuX2lzRmlsdGVyRmlyc3RSZW5kZXIgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmFkZEZpbHRlclRlbXBsYXRlVG9IZWFkZXJSb3coYXJncywgdGhpcy5faXNGaWx0ZXJGaXJzdFJlbmRlcik7XHJcbiAgICAgIGlmICh0aGlzLl9maXJzdENvbHVtbklkUmVuZGVyZWQgPT09ICcnKSB7XHJcbiAgICAgICAgdGhpcy5fZmlyc3RDb2x1bW5JZFJlbmRlcmVkID0gYXJncy5jb2x1bW4uaWQ7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25CYWNrZW5kRmlsdGVyQ2hhbmdlKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBhcmdzOiBhbnkpIHtcclxuICAgIGlmICghYXJncyB8fCAhYXJncy5ncmlkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hlbiB0cnlpbmcgdG8gYXR0YWNoIHRoZSBcImF0dGFjaEJhY2tlbmRPbkZpbHRlclN1YnNjcmliZShldmVudCwgYXJncylcIiBmdW5jdGlvbiwgaXQgc2VlbXMgdGhhdCBcImFyZ3NcIiBpcyBub3QgcG9wdWxhdGVkIGNvcnJlY3RseScpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYmFja2VuZEFwaSA9IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xyXG4gICAgaWYgKCFiYWNrZW5kQXBpIHx8ICFiYWNrZW5kQXBpLnByb2Nlc3MgfHwgIWJhY2tlbmRBcGkuc2VydmljZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEJhY2tlbmRTZXJ2aWNlQXBpIHJlcXVpcmVzIGF0IGxlYXN0IGEgXCJwcm9jZXNzXCIgZnVuY3Rpb24gYW5kIGEgXCJzZXJ2aWNlXCIgZGVmaW5lZGApO1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgLy8ga2VlcCBzdGFydCB0aW1lICYgZW5kIHRpbWVzdGFtcHMgJiByZXR1cm4gaXQgYWZ0ZXIgcHJvY2VzcyBleGVjdXRpb25cclxuICAgICAgY29uc3Qgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgIC8vIHJ1biBhIHByZVByb2Nlc3MgY2FsbGJhY2sgaWYgZGVmaW5lZFxyXG4gICAgICBpZiAoYmFja2VuZEFwaS5wcmVQcm9jZXNzKSB7XHJcbiAgICAgICAgYmFja2VuZEFwaS5wcmVQcm9jZXNzKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIG9ubHkgYWRkIGEgZGVsYXkgd2hlbiB1c2VyIGlzIHR5cGluZywgb24gc2VsZWN0IGRyb3Bkb3duIGZpbHRlciAob3IgXCJDbGVhciBGaWx0ZXJcIikgaXQgd2lsbCBleGVjdXRlIHJpZ2h0IGF3YXlcclxuICAgICAgbGV0IGRlYm91bmNlVHlwaW5nRGVsYXkgPSAwO1xyXG4gICAgICBjb25zdCBpc1RyaWdnZXJlZEJ5Q2xlYXJGaWx0ZXIgPSBhcmdzICYmIGFyZ3MuY2xlYXJGaWx0ZXJUcmlnZ2VyZWQ7IC8vIHdhcyBpdCB0cmlnZ2VyIGJ5IGEgXCJDbGVhciBGaWx0ZXJcIiBjb21tYW5kP1xyXG5cclxuICAgICAgaWYgKCFpc1RyaWdnZXJlZEJ5Q2xlYXJGaWx0ZXIgJiYgZXZlbnQgJiYgZXZlbnQua2V5Q29kZSAhPT0gS2V5Q29kZS5FTlRFUiAmJiAoZXZlbnQudHlwZSA9PT0gJ2lucHV0JyB8fCBldmVudC50eXBlID09PSAna2V5dXAnIHx8IGV2ZW50LnR5cGUgPT09ICdrZXlkb3duJykpIHtcclxuICAgICAgICBkZWJvdW5jZVR5cGluZ0RlbGF5ID0gYmFja2VuZEFwaS5maWx0ZXJUeXBpbmdEZWJvdW5jZSB8fCBERUZBVUxUX0ZJTFRFUl9UWVBJTkdfREVCT1VOQ0U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHF1ZXJ5IGJhY2tlbmQsIGV4Y2VwdCB3aGVuIGl0J3MgY2FsbGVkIGJ5IGEgQ2xlYXJGaWx0ZXJzIHRoZW4gd2Ugd29uJ3RcclxuICAgICAgaWYgKGFyZ3MgJiYgYXJncy5zaG91bGRUcmlnZ2VyUXVlcnkpIHtcclxuICAgICAgICAvLyBjYWxsIHRoZSBzZXJ2aWNlIHRvIGdldCBhIHF1ZXJ5IGJhY2tcclxuICAgICAgICBpZiAoZGVib3VuY2VUeXBpbmdEZWxheSA+IDApIHtcclxuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5leGVjdXRlQmFja2VuZENhbGxiYWNrKGV2ZW50LCBhcmdzLCBzdGFydFRpbWUsIGJhY2tlbmRBcGkpLCBkZWJvdW5jZVR5cGluZ0RlbGF5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5leGVjdXRlQmFja2VuZENhbGxiYWNrKGV2ZW50LCBhcmdzLCBzdGFydFRpbWUsIGJhY2tlbmRBcGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgb25CYWNrZW5kRXJyb3IoZXJyb3IsIGJhY2tlbmRBcGkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZXhlY3V0ZUJhY2tlbmRDYWxsYmFjayhldmVudDogS2V5Ym9hcmRFdmVudCwgYXJnczogYW55LCBzdGFydFRpbWU6IERhdGUsIGJhY2tlbmRBcGk6IEJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICBjb25zdCBxdWVyeSA9IGF3YWl0IGJhY2tlbmRBcGkuc2VydmljZS5wcm9jZXNzT25GaWx0ZXJDaGFuZ2VkKGV2ZW50LCBhcmdzKTtcclxuXHJcbiAgICAvLyBlbWl0IGFuIG9uRmlsdGVyQ2hhbmdlZCBldmVudCB3aGVuIGl0J3Mgbm90IGNhbGxlZCBieSBhIGNsZWFyIGZpbHRlclxyXG4gICAgaWYgKGFyZ3MgJiYgIWFyZ3MuY2xlYXJGaWx0ZXJUcmlnZ2VyZWQpIHtcclxuICAgICAgdGhpcy5lbWl0RmlsdGVyQ2hhbmdlZChFbWl0dGVyVHlwZS5yZW1vdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRoZSBwcm9jZXNzZXMgY2FuIGJlIE9ic2VydmFibGVzIChsaWtlIEh0dHBDbGllbnQpIG9yIFByb21pc2VzXHJcbiAgICBjb25zdCBwcm9jZXNzID0gYmFja2VuZEFwaS5wcm9jZXNzKHF1ZXJ5KTtcclxuICAgIGlmIChwcm9jZXNzIGluc3RhbmNlb2YgUHJvbWlzZSAmJiBwcm9jZXNzLnRoZW4pIHtcclxuICAgICAgcHJvY2Vzcy50aGVuKChwcm9jZXNzUmVzdWx0OiBHcmFwaHFsUmVzdWx0IHwgYW55KSA9PiBleGVjdXRlQmFja2VuZFByb2Nlc3Nlc0NhbGxiYWNrKHN0YXJ0VGltZSwgcHJvY2Vzc1Jlc3VsdCwgYmFja2VuZEFwaSwgdGhpcy5fZ3JpZE9wdGlvbnMpKTtcclxuICAgIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlKHByb2Nlc3MpKSB7XHJcbiAgICAgIHByb2Nlc3Muc3Vic2NyaWJlKFxyXG4gICAgICAgIChwcm9jZXNzUmVzdWx0OiBHcmFwaHFsUmVzdWx0IHwgYW55KSA9PiBleGVjdXRlQmFja2VuZFByb2Nlc3Nlc0NhbGxiYWNrKHN0YXJ0VGltZSwgcHJvY2Vzc1Jlc3VsdCwgYmFja2VuZEFwaSwgdGhpcy5fZ3JpZE9wdGlvbnMpLFxyXG4gICAgICAgIChlcnJvcjogYW55KSA9PiBvbkJhY2tlbmRFcnJvcihlcnJvciwgYmFja2VuZEFwaSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEF0dGFjaCBhIGxvY2FsIGZpbHRlciBob29rIHRvIHRoZSBncmlkXHJcbiAgICogQHBhcmFtIGdyaWQgU2xpY2tHcmlkIEdyaWQgb2JqZWN0XHJcbiAgICogQHBhcmFtIGRhdGFWaWV3XHJcbiAgICovXHJcbiAgYXR0YWNoTG9jYWxPbkZpbHRlcihncmlkOiBhbnksIGRhdGFWaWV3OiBhbnkpIHtcclxuICAgIHRoaXMuX2ZpbHRlcnMgPSBbXTtcclxuICAgIHRoaXMuX2RhdGFWaWV3ID0gZGF0YVZpZXc7XHJcbiAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIgPSBuZXcgU2xpY2suRXZlbnQoKTtcclxuXHJcbiAgICBkYXRhVmlldy5zZXRGaWx0ZXJBcmdzKHsgY29sdW1uRmlsdGVyczogdGhpcy5fY29sdW1uRmlsdGVycywgZ3JpZDogdGhpcy5fZ3JpZCB9KTtcclxuICAgIGRhdGFWaWV3LnNldEZpbHRlcih0aGlzLmN1c3RvbUxvY2FsRmlsdGVyLmJpbmQodGhpcywgZGF0YVZpZXcpKTtcclxuXHJcbiAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIuc3Vic2NyaWJlKChlOiBLZXlib2FyZEV2ZW50LCBhcmdzOiBhbnkpID0+IHtcclxuICAgICAgY29uc3QgY29sdW1uSWQgPSBhcmdzLmNvbHVtbklkO1xyXG4gICAgICBpZiAoY29sdW1uSWQgIT0gbnVsbCkge1xyXG4gICAgICAgIGRhdGFWaWV3LnJlZnJlc2goKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBlbWl0IGFuIG9uRmlsdGVyQ2hhbmdlZCBldmVudCB3aGVuIGl0J3Mgbm90IGNhbGxlZCBieSBhIGNsZWFyIGZpbHRlclxyXG4gICAgICBpZiAoYXJncyAmJiAhYXJncy5jbGVhckZpbHRlclRyaWdnZXJlZCkge1xyXG4gICAgICAgIHRoaXMuZW1pdEZpbHRlckNoYW5nZWQoRW1pdHRlclR5cGUubG9jYWwpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBzdWJzY3JpYmUgdG8gU2xpY2tHcmlkIG9uSGVhZGVyUm93Q2VsbFJlbmRlcmVkIGV2ZW50IHRvIGNyZWF0ZSBmaWx0ZXIgdGVtcGxhdGVcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZ3JpZC5vbkhlYWRlclJvd0NlbGxSZW5kZXJlZCwgKGU6IEtleWJvYXJkRXZlbnQsIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLmFkZEZpbHRlclRlbXBsYXRlVG9IZWFkZXJSb3coYXJncyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNsZWFyRmlsdGVyQnlDb2x1bW5JZChldmVudDogRXZlbnQsIGNvbHVtbklkOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGNvbEZpbHRlcjogRmlsdGVyID0gdGhpcy5fZmlsdGVycy5maW5kKChmaWx0ZXI6IEZpbHRlcikgPT4gZmlsdGVyLmNvbHVtbkRlZi5pZCA9PT0gY29sdW1uSWQpO1xyXG4gICAgaWYgKGNvbEZpbHRlciAmJiBjb2xGaWx0ZXIuY2xlYXIpIHtcclxuICAgICAgY29sRmlsdGVyLmNsZWFyKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHdlIG5lZWQgdG8gbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW5GaWx0ZXJzIGFuZCBkZWxldGUgdGhlIGZpbHRlciBmb3VuZFxyXG4gICAgLy8gb25seSB0cnlpbmcgdG8gY2xlYXIgY29sdW1uRmlsdGVyICh3aXRob3V0IGxvb3BpbmcgdGhyb3VnaCkgd291bGQgbm90IHRyaWdnZXIgYSBkYXRhc2V0IGNoYW5nZVxyXG4gICAgZm9yIChjb25zdCBjb2xJZCBpbiB0aGlzLl9jb2x1bW5GaWx0ZXJzKSB7XHJcbiAgICAgIGlmIChjb2xJZCA9PT0gY29sdW1uSWQgJiYgdGhpcy5fY29sdW1uRmlsdGVyc1tjb2xJZF0pIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5fY29sdW1uRmlsdGVyc1tjb2xJZF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgZW1pdHRlcjogRW1pdHRlclR5cGUgPSBFbWl0dGVyVHlwZS5sb2NhbDtcclxuICAgIGNvbnN0IGlzQmFja2VuZEFwaSA9IHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpIHx8IGZhbHNlO1xyXG5cclxuICAgIC8vIHdoZW4gdXNpbmcgYSBiYWNrZW5kIHNlcnZpY2UsIHdlIG5lZWQgdG8gbWFudWFsbHkgdHJpZ2dlciBhIGZpbHRlciBjaGFuZ2VcclxuICAgIGlmIChpc0JhY2tlbmRBcGkpIHtcclxuICAgICAgZW1pdHRlciA9IEVtaXR0ZXJUeXBlLnJlbW90ZTtcclxuICAgICAgdGhpcy5vbkJhY2tlbmRGaWx0ZXJDaGFuZ2UoZXZlbnQgYXMgS2V5Ym9hcmRFdmVudCwgeyBncmlkOiB0aGlzLl9ncmlkLCBjb2x1bW5GaWx0ZXJzOiB0aGlzLl9jb2x1bW5GaWx0ZXJzIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGVtaXQgYW4gZXZlbnQgd2hlbiBmaWx0ZXIgaXMgY2xlYXJlZFxyXG4gICAgdGhpcy5lbWl0RmlsdGVyQ2hhbmdlZChlbWl0dGVyKTtcclxuICB9XHJcblxyXG4gIC8qKiBDbGVhciB0aGUgc2VhcmNoIGZpbHRlcnMgKGJlbG93IHRoZSBjb2x1bW4gdGl0bGVzKSAqL1xyXG4gIGNsZWFyRmlsdGVycygpIHtcclxuICAgIHRoaXMuX2ZpbHRlcnMuZm9yRWFjaCgoZmlsdGVyOiBGaWx0ZXIpID0+IHtcclxuICAgICAgaWYgKGZpbHRlciAmJiBmaWx0ZXIuY2xlYXIpIHtcclxuICAgICAgICAvLyBjbGVhciBlbGVtZW50IGFuZCB0cmlnZ2VyIGEgY2hhbmdlXHJcbiAgICAgICAgZmlsdGVyLmNsZWFyKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gd2UgbmVlZCB0byBsb29wIHRocm91Z2ggYWxsIGNvbHVtbkZpbHRlcnMgYW5kIGRlbGV0ZSB0aGVtIDEgYnkgMVxyXG4gICAgLy8gb25seSB0cnlpbmcgdG8gY2xlYXIgY29sdW1uRmlsdGVyICh3aXRob3V0IGxvb3BpbmcgdGhyb3VnaCkgd291bGQgbm90IHRyaWdnZXIgYSBkYXRhc2V0IGNoYW5nZVxyXG4gICAgZm9yIChjb25zdCBjb2x1bW5JZCBpbiB0aGlzLl9jb2x1bW5GaWx0ZXJzKSB7XHJcbiAgICAgIGlmIChjb2x1bW5JZCAmJiB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbklkXSkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbklkXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHdlIGFsc28gbmVlZCB0byByZWZyZXNoIHRoZSBkYXRhVmlldyBhbmQgb3B0aW9uYWxseSB0aGUgZ3JpZCAoaXQncyBvcHRpb25hbCBzaW5jZSB3ZSB1c2UgRGF0YVZpZXcpXHJcbiAgICBpZiAodGhpcy5fZGF0YVZpZXcgJiYgdGhpcy5fZ3JpZCkge1xyXG4gICAgICB0aGlzLl9kYXRhVmlldy5yZWZyZXNoKCk7XHJcbiAgICAgIHRoaXMuX2dyaWQuaW52YWxpZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHdoZW4gdXNpbmcgYmFja2VuZCBzZXJ2aWNlLCB3ZSBuZWVkIHRvIHF1ZXJ5IG9ubHkgb25jZSBzbyBpdCdzIGJldHRlciB0byBkbyBpdCBoZXJlXHJcbiAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgY29uc3QgY2FsbGJhY2tBcmdzID0geyBjbGVhckZpbHRlclRyaWdnZXJlZDogdHJ1ZSwgc2hvdWxkVHJpZ2dlclF1ZXJ5OiB0cnVlLCBncmlkOiB0aGlzLl9ncmlkLCBjb2x1bW5GaWx0ZXJzOiB0aGlzLl9jb2x1bW5GaWx0ZXJzIH07XHJcbiAgICAgIHRoaXMuZXhlY3V0ZUJhY2tlbmRDYWxsYmFjayh1bmRlZmluZWQsIGNhbGxiYWNrQXJncywgbmV3IERhdGUoKSwgdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGVtaXQgYW4gZXZlbnQgd2hlbiBmaWx0ZXJzIGFyZSBhbGwgY2xlYXJlZFxyXG4gICAgdGhpcy5vbkZpbHRlckNsZWFyZWQubmV4dCh0cnVlKTtcclxuICB9XHJcblxyXG4gIGN1c3RvbUxvY2FsRmlsdGVyKGRhdGFWaWV3OiBhbnksIGl0ZW06IGFueSwgYXJnczogYW55KSB7XHJcbiAgICBmb3IgKGNvbnN0IGNvbHVtbklkIG9mIE9iamVjdC5rZXlzKGFyZ3MuY29sdW1uRmlsdGVycykpIHtcclxuICAgICAgY29uc3QgY29sdW1uRmlsdGVyID0gYXJncy5jb2x1bW5GaWx0ZXJzW2NvbHVtbklkXTtcclxuICAgICAgY29uc3QgY29sdW1uSW5kZXggPSBhcmdzLmdyaWQuZ2V0Q29sdW1uSW5kZXgoY29sdW1uSWQpO1xyXG4gICAgICBjb25zdCBjb2x1bW5EZWYgPSBhcmdzLmdyaWQuZ2V0Q29sdW1ucygpW2NvbHVtbkluZGV4XTtcclxuICAgICAgaWYgKCFjb2x1bW5EZWYpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJvdyBEZXRhaWwgVmlldyBwbHVnaW4sIGlmIHRoZSByb3cgaXMgcGFkZGluZyB3ZSBqdXN0IGdldCB0aGUgdmFsdWUgd2UncmUgZmlsdGVyaW5nIG9uIGZyb20gaXQncyBwYXJlbnRcclxuICAgICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZVJvd0RldGFpbFZpZXcpIHtcclxuICAgICAgICBjb25zdCBtZXRhZGF0YVByZWZpeCA9IHRoaXMuX2dyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcgJiYgdGhpcy5fZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5rZXlQcmVmaXggfHwgJ19fJztcclxuICAgICAgICBpZiAoaXRlbVtgJHttZXRhZGF0YVByZWZpeH1pc1BhZGRpbmdgXSAmJiBpdGVtW2Ake21ldGFkYXRhUHJlZml4fXBhcmVudGBdKSB7XHJcbiAgICAgICAgICBpdGVtID0gaXRlbVtgJHttZXRhZGF0YVByZWZpeH1wYXJlbnRgXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGRhdGFLZXkgPSBjb2x1bW5EZWYuZGF0YUtleTtcclxuICAgICAgY29uc3QgZmllbGROYW1lID0gY29sdW1uRGVmLnF1ZXJ5RmllbGQgfHwgY29sdW1uRGVmLnF1ZXJ5RmllbGRGaWx0ZXIgfHwgY29sdW1uRGVmLmZpZWxkO1xyXG4gICAgICBjb25zdCBmaWVsZFR5cGUgPSBjb2x1bW5EZWYudHlwZSB8fCBGaWVsZFR5cGUuc3RyaW5nO1xyXG4gICAgICBjb25zdCBmaWx0ZXJTZWFyY2hUeXBlID0gKGNvbHVtbkRlZi5maWx0ZXJTZWFyY2hUeXBlKSA/IGNvbHVtbkRlZi5maWx0ZXJTZWFyY2hUeXBlIDogbnVsbDtcclxuICAgICAgbGV0IGNlbGxWYWx1ZSA9IGl0ZW1bZmllbGROYW1lXTtcclxuXHJcbiAgICAgIC8vIHdoZW4gaXRlbSBpcyBhIGNvbXBsZXggb2JqZWN0IChkb3QgXCIuXCIgbm90YXRpb24pLCB3ZSBuZWVkIHRvIGZpbHRlciB0aGUgdmFsdWUgY29udGFpbmVkIGluIHRoZSBvYmplY3QgdHJlZVxyXG4gICAgICBpZiAoZmllbGROYW1lLmluZGV4T2YoJy4nKSA+PSAwKSB7XHJcbiAgICAgICAgY2VsbFZhbHVlID0gZ2V0RGVzY2VuZGFudFByb3BlcnR5KGl0ZW0sIGZpZWxkTmFtZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGlmIHdlIGZpbmQgc2VhcmNoVGVybXMgdXNlIHRoZW0gYnV0IG1ha2UgYSBkZWVwIGNvcHkgc28gdGhhdCB3ZSBkb24ndCBhZmZlY3Qgb3JpZ2luYWwgYXJyYXlcclxuICAgICAgLy8gd2UgbWlnaHQgaGF2ZSB0byBvdmVyd3JpdGUgdGhlIHZhbHVlKHMpIGxvY2FsbHkgdGhhdCBhcmUgcmV0dXJuZWRcclxuICAgICAgLy8gZS5nOiB3ZSBkb24ndCB3YW50IHRvIG9wZXJhdG9yIHdpdGhpbiB0aGUgc2VhcmNoIHZhbHVlLCBzaW5jZSBpdCB3aWxsIGZhaWwgZmlsdGVyIGNvbmRpdGlvbiBjaGVjayB0cmlnZ2VyIGFmdGVyd2FyZFxyXG4gICAgICBjb25zdCBzZWFyY2hWYWx1ZXMgPSAoY29sdW1uRmlsdGVyICYmIGNvbHVtbkZpbHRlci5zZWFyY2hUZXJtcykgPyAkLmV4dGVuZCh0cnVlLCBbXSwgY29sdW1uRmlsdGVyLnNlYXJjaFRlcm1zKSA6IG51bGw7XHJcblxyXG4gICAgICBsZXQgZmllbGRTZWFyY2hWYWx1ZSA9IChBcnJheS5pc0FycmF5KHNlYXJjaFZhbHVlcykgJiYgc2VhcmNoVmFsdWVzLmxlbmd0aCA9PT0gMSkgPyBzZWFyY2hWYWx1ZXNbMF0gOiAnJztcclxuXHJcbiAgICAgIGxldCBtYXRjaGVzID0gbnVsbDtcclxuICAgICAgaWYgKGZpZWxkVHlwZSAhPT0gRmllbGRUeXBlLm9iamVjdCkge1xyXG4gICAgICAgIGZpZWxkU2VhcmNoVmFsdWUgPSAnJyArIGZpZWxkU2VhcmNoVmFsdWU7IC8vIG1ha2Ugc3VyZSBpdCdzIGEgc3RyaW5nXHJcbiAgICAgICAgbWF0Y2hlcyA9IGZpZWxkU2VhcmNoVmFsdWUubWF0Y2goL14oWzw+IT1cXCpdezAsMn0pKC4qW148PiE9XFwqXSkoW1xcKl0/KSQvKTsgLy8gZ3JvdXAgMTogT3BlcmF0b3IsIDI6IHNlYXJjaFZhbHVlLCAzOiBsYXN0IGNoYXIgaXMgJyonIChtZWFuaW5nIHN0YXJ0cyB3aXRoLCBleC46IGFiYyopXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBvcGVyYXRvciA9IGNvbHVtbkZpbHRlci5vcGVyYXRvciB8fCAoKG1hdGNoZXMpID8gbWF0Y2hlc1sxXSA6ICcnKTtcclxuICAgICAgY29uc3Qgc2VhcmNoVGVybSA9ICghIW1hdGNoZXMpID8gbWF0Y2hlc1syXSA6ICcnO1xyXG4gICAgICBjb25zdCBsYXN0VmFsdWVDaGFyID0gKCEhbWF0Y2hlcykgPyBtYXRjaGVzWzNdIDogKG9wZXJhdG9yID09PSAnKnonID8gJyonIDogJycpO1xyXG5cclxuICAgICAgaWYgKHNlYXJjaFZhbHVlcyAmJiBzZWFyY2hWYWx1ZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIGZpZWxkU2VhcmNoVmFsdWUgPSBzZWFyY2hWYWx1ZXMuam9pbignLCcpO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBmaWVsZFNlYXJjaFZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIC8vIGVzY2FwaW5nIHRoZSBzZWFyY2ggdmFsdWVcclxuICAgICAgICBmaWVsZFNlYXJjaFZhbHVlID0gZmllbGRTZWFyY2hWYWx1ZS5yZXBsYWNlKGAnYCwgYCcnYCk7IC8vIGVzY2FwZSBzaW5nbGUgcXVvdGVzIGJ5IGRvdWJsaW5nIHRoZW1cclxuICAgICAgICBpZiAob3BlcmF0b3IgPT09ICcqJyB8fCBvcGVyYXRvciA9PT0gJ2EqJyB8fCBvcGVyYXRvciA9PT0gJyp6JyB8fCBsYXN0VmFsdWVDaGFyID09PSAnKicpIHtcclxuICAgICAgICAgIG9wZXJhdG9yID0gKG9wZXJhdG9yID09PSAnKicgfHwgb3BlcmF0b3IgPT09ICcqeicpID8gT3BlcmF0b3JUeXBlLmVuZHNXaXRoIDogT3BlcmF0b3JUeXBlLnN0YXJ0c1dpdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBubyBuZWVkIHRvIHF1ZXJ5IGlmIHNlYXJjaCB2YWx1ZSBpcyBlbXB0eVxyXG4gICAgICBpZiAoc2VhcmNoVGVybSA9PT0gJycgJiYgKCFzZWFyY2hWYWx1ZXMgfHwgKEFycmF5LmlzQXJyYXkoc2VhcmNoVmFsdWVzKSAmJiBzZWFyY2hWYWx1ZXMubGVuZ3RoID09PSAwKSkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaWYgc2VhcmNoIHZhbHVlIGhhcyBhIHJlZ2V4IG1hdGNoIHdlIHdpbGwgb25seSBrZWVwIHRoZSB2YWx1ZSB3aXRob3V0IHRoZSBvcGVyYXRvclxyXG4gICAgICAvLyBpbiB0aGlzIGNhc2Ugd2UgbmVlZCB0byBvdmVyd3JpdGUgdGhlIHJldHVybmVkIHNlYXJjaCB2YWx1ZXMgdG8gdHJ1bmNhdGUgb3BlcmF0b3IgZnJvbSB0aGUgc3RyaW5nIHNlYXJjaFxyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRjaGVzKSAmJiBtYXRjaGVzLmxlbmd0aCA+PSAxICYmIChBcnJheS5pc0FycmF5KHNlYXJjaFZhbHVlcykgJiYgc2VhcmNoVmFsdWVzLmxlbmd0aCA9PT0gMSkpIHtcclxuICAgICAgICBzZWFyY2hWYWx1ZXNbMF0gPSBzZWFyY2hUZXJtO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBmaWx0ZXIgc2VhcmNoIHRlcm1zIHNob3VsZCBhbHdheXMgYmUgc3RyaW5nIHR5cGUgKGV2ZW4gdGhvdWdoIHdlIHBlcm1pdCB0aGUgZW5kIHVzZXIgdG8gaW5wdXQgbnVtYmVycylcclxuICAgICAgLy8gc28gbWFrZSBzdXJlIGVhY2ggdGVybSBhcmUgc3RyaW5ncywgaWYgdXNlciBoYXMgc29tZSBkZWZhdWx0IHNlYXJjaCB0ZXJtcywgd2Ugd2lsbCBjYXN0IHRoZW0gdG8gc3RyaW5nXHJcbiAgICAgIGlmIChzZWFyY2hWYWx1ZXMgJiYgQXJyYXkuaXNBcnJheShzZWFyY2hWYWx1ZXMpICYmIGZpZWxkVHlwZSAhPT0gRmllbGRUeXBlLm9iamVjdCkge1xyXG4gICAgICAgIGZvciAobGV0IGsgPSAwLCBsbiA9IHNlYXJjaFZhbHVlcy5sZW5ndGg7IGsgPCBsbjsgaysrKSB7XHJcbiAgICAgICAgICAvLyBtYWtlIHN1cmUgYWxsIHNlYXJjaCB0ZXJtcyBhcmUgc3RyaW5nc1xyXG4gICAgICAgICAgc2VhcmNoVmFsdWVzW2tdID0gKChzZWFyY2hWYWx1ZXNba10gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hWYWx1ZXNba10gPT09IG51bGwpID8gJycgOiBzZWFyY2hWYWx1ZXNba10pICsgJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB3aGVuIHVzaW5nIGxvY2FsaXphdGlvbiAoaTE4biksIHdlIHNob3VsZCB1c2UgdGhlIGZvcm1hdHRlciBvdXRwdXQgdG8gc2VhcmNoIGFzIHRoZSBuZXcgY2VsbCB2YWx1ZVxyXG4gICAgICBpZiAoY29sdW1uRGVmICYmIGNvbHVtbkRlZi5wYXJhbXMgJiYgY29sdW1uRGVmLnBhcmFtcy51c2VGb3JtYXR0ZXJPdXB1dFRvRmlsdGVyKSB7XHJcbiAgICAgICAgY29uc3Qgcm93SW5kZXggPSAoZGF0YVZpZXcgJiYgdHlwZW9mIGRhdGFWaWV3LmdldElkeEJ5SWQgPT09ICdmdW5jdGlvbicpID8gZGF0YVZpZXcuZ2V0SWR4QnlJZChpdGVtLmlkKSA6IDA7XHJcbiAgICAgICAgY2VsbFZhbHVlID0gY29sdW1uRGVmLmZvcm1hdHRlcihyb3dJbmRleCwgY29sdW1uSW5kZXgsIGNlbGxWYWx1ZSwgY29sdW1uRGVmLCBpdGVtLCB0aGlzLl9ncmlkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gbWFrZSBzdXJlIGNlbGwgdmFsdWUgaXMgYWx3YXlzIGEgc3RyaW5nXHJcbiAgICAgIGlmICh0eXBlb2YgY2VsbFZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgIGNlbGxWYWx1ZSA9IGNlbGxWYWx1ZS50b1N0cmluZygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjb25kaXRpb25PcHRpb25zID0ge1xyXG4gICAgICAgIGRhdGFLZXksXHJcbiAgICAgICAgZmllbGRUeXBlLFxyXG4gICAgICAgIHNlYXJjaFRlcm1zOiBzZWFyY2hWYWx1ZXMsXHJcbiAgICAgICAgY2VsbFZhbHVlLFxyXG4gICAgICAgIG9wZXJhdG9yLFxyXG4gICAgICAgIGNlbGxWYWx1ZUxhc3RDaGFyOiBsYXN0VmFsdWVDaGFyLFxyXG4gICAgICAgIGZpbHRlclNlYXJjaFR5cGVcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICghRmlsdGVyQ29uZGl0aW9ucy5leGVjdXRlTWFwcGVkQ29uZGl0aW9uKGNvbmRpdGlvbk9wdGlvbnMpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBkaXNwb3NlKCkge1xyXG4gICAgdGhpcy5kaXNwb3NlQ29sdW1uRmlsdGVycygpO1xyXG5cclxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCBTbGlja0dyaWQgZXZlbnRzXHJcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcclxuXHJcbiAgICAvLyB1bnN1YnNjcmliZSBsb2NhbCBldmVudFxyXG4gICAgaWYgKHRoaXMuX3NsaWNrU3Vic2NyaWJlciAmJiB0eXBlb2YgdGhpcy5fc2xpY2tTdWJzY3JpYmVyLnVuc3Vic2NyaWJlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzcG9zZSBvZiB0aGUgZmlsdGVycywgc2luY2UgaXQncyBhIHNpbmdsZXRvbiwgd2UgZG9uJ3Qgd2FudCB0byBhZmZlY3Qgb3RoZXIgZ3JpZHMgd2l0aCBzYW1lIGNvbHVtbnNcclxuICAgKi9cclxuICBkaXNwb3NlQ29sdW1uRmlsdGVycygpIHtcclxuICAgIC8vIHdlIG5lZWQgdG8gbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW5GaWx0ZXJzIGFuZCBkZWxldGUgdGhlbSAxIGJ5IDFcclxuICAgIC8vIG9ubHkgdHJ5aW5nIHRvIG1ha2UgY29sdW1uRmlsdGVyIGFuIGVtcHR5ICh3aXRob3V0IGxvb3BpbmcpIHdvdWxkIG5vdCB0cmlnZ2VyIGEgZGF0YXNldCBjaGFuZ2VcclxuICAgIGZvciAoY29uc3QgY29sdW1uSWQgaW4gdGhpcy5fY29sdW1uRmlsdGVycykge1xyXG4gICAgICBpZiAoY29sdW1uSWQgJiYgdGhpcy5fY29sdW1uRmlsdGVyc1tjb2x1bW5JZF0pIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5fY29sdW1uRmlsdGVyc1tjb2x1bW5JZF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBhbHNvIGRlc3Ryb3kgZWFjaCBGaWx0ZXIgaW5zdGFuY2VzXHJcbiAgICB0aGlzLl9maWx0ZXJzLmZvckVhY2goKGZpbHRlciwgaW5kZXgpID0+IHtcclxuICAgICAgaWYgKGZpbHRlciAmJiBmaWx0ZXIuZGVzdHJveSkge1xyXG4gICAgICAgIGZpbHRlci5kZXN0cm95KHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldENvbHVtbkZpbHRlcnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sdW1uRmlsdGVycztcclxuICB9XHJcblxyXG4gIGdldEN1cnJlbnRMb2NhbEZpbHRlcnMoKTogQ3VycmVudEZpbHRlcltdIHtcclxuICAgIGNvbnN0IGN1cnJlbnRGaWx0ZXJzOiBDdXJyZW50RmlsdGVyW10gPSBbXTtcclxuICAgIGlmICh0aGlzLl9jb2x1bW5GaWx0ZXJzKSB7XHJcbiAgICAgIGZvciAoY29uc3QgY29sSWQgb2YgT2JqZWN0LmtleXModGhpcy5fY29sdW1uRmlsdGVycykpIHtcclxuICAgICAgICBjb25zdCBjb2x1bW5GaWx0ZXIgPSB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbElkXTtcclxuICAgICAgICBjb25zdCBmaWx0ZXIgPSB7IGNvbHVtbklkOiBjb2xJZCB8fCAnJyB9IGFzIEN1cnJlbnRGaWx0ZXI7XHJcblxyXG4gICAgICAgIGlmIChjb2x1bW5GaWx0ZXIgJiYgY29sdW1uRmlsdGVyLnNlYXJjaFRlcm1zKSB7XHJcbiAgICAgICAgICBmaWx0ZXIuc2VhcmNoVGVybXMgPSBjb2x1bW5GaWx0ZXIuc2VhcmNoVGVybXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb2x1bW5GaWx0ZXIub3BlcmF0b3IpIHtcclxuICAgICAgICAgIGZpbHRlci5vcGVyYXRvciA9IGNvbHVtbkZpbHRlci5vcGVyYXRvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyLnNlYXJjaFRlcm1zKSAmJiBmaWx0ZXIuc2VhcmNoVGVybXMubGVuZ3RoID4gMCAmJiBmaWx0ZXIuc2VhcmNoVGVybXNbMF0gIT09ICcnKSB7XHJcbiAgICAgICAgICBjdXJyZW50RmlsdGVycy5wdXNoKGZpbHRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3VycmVudEZpbHRlcnM7XHJcbiAgfVxyXG5cclxuICBjYWxsYmFja1NlYXJjaEV2ZW50KGU6IEtleWJvYXJkRXZlbnQgfCB1bmRlZmluZWQsIGFyZ3M6IEZpbHRlckNhbGxiYWNrQXJnKSB7XHJcbiAgICBpZiAoYXJncykge1xyXG4gICAgICBjb25zdCBzZWFyY2hUZXJtID0gKChlICYmIGUudGFyZ2V0KSA/IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA6IHVuZGVmaW5lZCk7XHJcbiAgICAgIGNvbnN0IHNlYXJjaFRlcm1zID0gKGFyZ3Muc2VhcmNoVGVybXMgJiYgQXJyYXkuaXNBcnJheShhcmdzLnNlYXJjaFRlcm1zKSkgPyBhcmdzLnNlYXJjaFRlcm1zIDogKHNlYXJjaFRlcm0gPyBbc2VhcmNoVGVybV0gOiB1bmRlZmluZWQpO1xyXG4gICAgICBjb25zdCBjb2x1bW5EZWYgPSBhcmdzLmNvbHVtbkRlZiB8fCBudWxsO1xyXG4gICAgICBjb25zdCBjb2x1bW5JZCA9IGNvbHVtbkRlZiA/IChjb2x1bW5EZWYuaWQgfHwgJycpIDogJyc7XHJcbiAgICAgIGNvbnN0IG9wZXJhdG9yID0gYXJncy5vcGVyYXRvciB8fCB1bmRlZmluZWQ7XHJcbiAgICAgIGNvbnN0IGhhc1NlYXJjaFRlcm1zID0gc2VhcmNoVGVybXMgJiYgQXJyYXkuaXNBcnJheShzZWFyY2hUZXJtcyk7XHJcbiAgICAgIGNvbnN0IHRlcm1zQ291bnQgPSBoYXNTZWFyY2hUZXJtcyAmJiBzZWFyY2hUZXJtcy5sZW5ndGg7XHJcbiAgICAgIGNvbnN0IG9sZENvbHVtbkZpbHRlcnMgPSB7IC4uLnRoaXMuX2NvbHVtbkZpbHRlcnMgfTtcclxuXHJcbiAgICAgIGlmICghaGFzU2VhcmNoVGVybXMgfHwgdGVybXNDb3VudCA9PT0gMCB8fCAodGVybXNDb3VudCA9PT0gMSAmJiBzZWFyY2hUZXJtc1swXSA9PT0gJycpKSB7XHJcbiAgICAgICAgLy8gZGVsZXRlIHRoZSBwcm9wZXJ0eSBmcm9tIHRoZSBjb2x1bW5GaWx0ZXJzIHdoZW4gaXQgYmVjb21lcyBlbXB0eVxyXG4gICAgICAgIC8vIHdpdGhvdXQgZG9pbmcgdGhpcywgaXQgd291bGQgbGVhdmUgYW4gaW5jb3JyZWN0IHN0YXRlIG9mIHRoZSBwcmV2aW91cyBjb2x1bW4gZmlsdGVycyB3aGVuIGZpbHRlcmluZyBvbiBhbm90aGVyIGNvbHVtblxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbklkXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBjb2xJZCA9ICcnICsgY29sdW1uSWQgYXMgc3RyaW5nO1xyXG4gICAgICAgIGNvbnN0IGNvbEZpbHRlcjogQ29sdW1uRmlsdGVyID0ge1xyXG4gICAgICAgICAgY29sdW1uSWQ6IGNvbElkLFxyXG4gICAgICAgICAgY29sdW1uRGVmLFxyXG4gICAgICAgICAgc2VhcmNoVGVybXMsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAob3BlcmF0b3IpIHtcclxuICAgICAgICAgIGNvbEZpbHRlci5vcGVyYXRvciA9IG9wZXJhdG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbElkXSA9IGNvbEZpbHRlcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gdHJpZ2dlciBhbiBldmVudCBvbmx5IGlmIEZpbHRlcnMgY2hhbmdlZCBvciBpZiBFTlRFUiBrZXkgd2FzIHByZXNzZWRcclxuICAgICAgY29uc3QgZXZlbnRLZXlDb2RlID0gZSAmJiBlLmtleUNvZGU7XHJcbiAgICAgIGlmIChldmVudEtleUNvZGUgPT09IEtleUNvZGUuRU5URVIgfHwgIWlzZXF1YWwob2xkQ29sdW1uRmlsdGVycywgdGhpcy5fY29sdW1uRmlsdGVycykpIHtcclxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCh0aGlzLl9zbGlja1N1YnNjcmliZXIsIHtcclxuICAgICAgICAgIGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiBhcmdzLmNsZWFyRmlsdGVyVHJpZ2dlcmVkLFxyXG4gICAgICAgICAgc2hvdWxkVHJpZ2dlclF1ZXJ5OiBhcmdzLnNob3VsZFRyaWdnZXJRdWVyeSxcclxuICAgICAgICAgIGNvbHVtbklkLFxyXG4gICAgICAgICAgY29sdW1uRGVmOiBhcmdzLmNvbHVtbkRlZiB8fCBudWxsLFxyXG4gICAgICAgICAgY29sdW1uRmlsdGVyczogdGhpcy5fY29sdW1uRmlsdGVycyxcclxuICAgICAgICAgIG9wZXJhdG9yLFxyXG4gICAgICAgICAgc2VhcmNoVGVybXMsXHJcbiAgICAgICAgICBzZXJ2aWNlT3B0aW9uczogdGhpcy5fb25GaWx0ZXJDaGFuZ2VkT3B0aW9ucyxcclxuICAgICAgICAgIGdyaWQ6IHRoaXMuX2dyaWRcclxuICAgICAgICB9LCBlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkRmlsdGVyVGVtcGxhdGVUb0hlYWRlclJvdyhhcmdzOiB7IGNvbHVtbjogQ29sdW1uOyBncmlkOiBhbnk7IG5vZGU6IGFueSB9LCBpc0ZpbHRlckZpcnN0UmVuZGVyID0gdHJ1ZSkge1xyXG4gICAgY29uc3QgY29sdW1uRGVmID0gYXJncy5jb2x1bW47XHJcbiAgICBjb25zdCBjb2x1bW5JZCA9IGNvbHVtbkRlZi5pZCB8fCAnJztcclxuXHJcbiAgICBpZiAoY29sdW1uRGVmICYmIGNvbHVtbklkICE9PSAnc2VsZWN0b3InICYmIGNvbHVtbkRlZi5maWx0ZXJhYmxlKSB7XHJcbiAgICAgIGxldCBzZWFyY2hUZXJtczogU2VhcmNoVGVybVtdIHwgdW5kZWZpbmVkO1xyXG4gICAgICBsZXQgb3BlcmF0b3I6IE9wZXJhdG9yU3RyaW5nIHwgT3BlcmF0b3JUeXBlO1xyXG4gICAgICBjb25zdCBmaWx0ZXI6IEZpbHRlciB8IHVuZGVmaW5lZCA9IHRoaXMuZmlsdGVyRmFjdG9yeS5jcmVhdGVGaWx0ZXIoYXJncy5jb2x1bW4uZmlsdGVyKTtcclxuICAgICAgb3BlcmF0b3IgPSAoY29sdW1uRGVmICYmIGNvbHVtbkRlZi5maWx0ZXIgJiYgY29sdW1uRGVmLmZpbHRlci5vcGVyYXRvcikgfHwgKGZpbHRlciAmJiBmaWx0ZXIub3BlcmF0b3IpIHx8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgIGlmICh0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbkRlZi5pZF0pIHtcclxuICAgICAgICBzZWFyY2hUZXJtcyA9IHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uRGVmLmlkXS5zZWFyY2hUZXJtcyB8fCB1bmRlZmluZWQ7XHJcbiAgICAgICAgb3BlcmF0b3IgPSB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbkRlZi5pZF0ub3BlcmF0b3IgfHwgdW5kZWZpbmVkO1xyXG4gICAgICB9IGVsc2UgaWYgKGNvbHVtbkRlZi5maWx0ZXIpIHtcclxuICAgICAgICAvLyB3aGVuIGhpZGluZy9zaG93aW5nICh3aXRoIENvbHVtbiBQaWNrZXIgb3IgR3JpZCBNZW51KSwgaXQgd2lsbCB0cnkgdG8gcmUtY3JlYXRlIHlldCBhZ2FpbiB0aGUgZmlsdGVycyAoc2luY2UgU2xpY2tHcmlkIGRvZXMgYSByZS1yZW5kZXIpXHJcbiAgICAgICAgLy8gYmVjYXVzZSBvZiB0aGF0IHdlIG5lZWQgdG8gZmlyc3QgZ2V0IHNlYXJjaFRlcm0ocykgZnJvbSB0aGUgY29sdW1uRmlsdGVycyAodGhhdCBpcyB3aGF0IHRoZSB1c2VyIGxhc3QgZW50ZXJlZClcclxuICAgICAgICBzZWFyY2hUZXJtcyA9IGNvbHVtbkRlZi5maWx0ZXIuc2VhcmNoVGVybXMgfHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ29sdW1uRmlsdGVycyhzZWFyY2hUZXJtcywgY29sdW1uRGVmLCBvcGVyYXRvcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGZpbHRlckFyZ3VtZW50czogRmlsdGVyQXJndW1lbnRzID0ge1xyXG4gICAgICAgIGdyaWQ6IHRoaXMuX2dyaWQsXHJcbiAgICAgICAgb3BlcmF0b3IsXHJcbiAgICAgICAgc2VhcmNoVGVybXMsXHJcbiAgICAgICAgY29sdW1uRGVmLFxyXG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLmNhbGxiYWNrU2VhcmNoRXZlbnQuYmluZCh0aGlzKVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKGZpbHRlcikge1xyXG4gICAgICAgIGZpbHRlci5pbml0KGZpbHRlckFyZ3VtZW50cywgaXNGaWx0ZXJGaXJzdFJlbmRlcik7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyRXhpc3RJbmRleCA9IHRoaXMuX2ZpbHRlcnMuZmluZEluZGV4KChmaWx0KSA9PiBmaWx0ZXIuY29sdW1uRGVmLm5hbWUgPT09IGZpbHQuY29sdW1uRGVmLm5hbWUpO1xyXG5cclxuICAgICAgICAvLyBhZGQgdG8gdGhlIGZpbHRlcnMgYXJyYXlzIG9yIHJlcGxhY2UgaXQgd2hlbiBmb3VuZFxyXG4gICAgICAgIGlmIChmaWx0ZXJFeGlzdEluZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgdGhpcy5fZmlsdGVycy5wdXNoKGZpbHRlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuX2ZpbHRlcnNbZmlsdGVyRXhpc3RJbmRleF0gPSBmaWx0ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB3aGVuIGhpZGluZy9zaG93aW5nICh3aXRoIENvbHVtbiBQaWNrZXIgb3IgR3JpZCBNZW51KSwgaXQgd2lsbCB0cnkgdG8gcmUtY3JlYXRlIHlldCBhZ2FpbiB0aGUgZmlsdGVycyAoc2luY2UgU2xpY2tHcmlkIGRvZXMgYSByZS1yZW5kZXIpXHJcbiAgICAgICAgLy8gd2UgbmVlZCB0byBhbHNvIHNldCBhZ2FpbiB0aGUgdmFsdWVzIGluIHRoZSBET00gZWxlbWVudHMgaWYgdGhlIHZhbHVlcyB3ZXJlIHNldCBieSBhIHNlYXJjaFRlcm0ocylcclxuICAgICAgICBpZiAoc2VhcmNoVGVybXMgJiYgZmlsdGVyLnNldFZhbHVlcykge1xyXG4gICAgICAgICAgZmlsdGVyLnNldFZhbHVlcyhzZWFyY2hUZXJtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBIHNpbXBsZSBmdW5jdGlvbiB0aGF0IGlzIGF0dGFjaGVkIHRvIHRoZSBzdWJzY3JpYmVyIGFuZCBlbWl0IGEgY2hhbmdlIHdoZW4gdGhlIGZpbHRlciBpcyBjYWxsZWQuXHJcbiAgICogT3RoZXIgc2VydmljZXMsIGxpa2UgUGFnaW5hdGlvbiwgY2FuIHRoZW4gc3Vic2NyaWJlIHRvIGl0LlxyXG4gICAqIEBwYXJhbSBjYWxsZXJcclxuICAgKi9cclxuICBlbWl0RmlsdGVyQ2hhbmdlZChjYWxsZXI6IEVtaXR0ZXJUeXBlKSB7XHJcbiAgICBpZiAoY2FsbGVyID09PSBFbWl0dGVyVHlwZS5yZW1vdGUgJiYgdGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgbGV0IGN1cnJlbnRGaWx0ZXJzOiBDdXJyZW50RmlsdGVyW10gPSBbXTtcclxuICAgICAgY29uc3QgYmFja2VuZFNlcnZpY2UgPSB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaS5zZXJ2aWNlO1xyXG4gICAgICBpZiAoYmFja2VuZFNlcnZpY2UgJiYgYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudEZpbHRlcnMpIHtcclxuICAgICAgICBjdXJyZW50RmlsdGVycyA9IGJhY2tlbmRTZXJ2aWNlLmdldEN1cnJlbnRGaWx0ZXJzKCkgYXMgQ3VycmVudEZpbHRlcltdO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMub25GaWx0ZXJDaGFuZ2VkLm5leHQoY3VycmVudEZpbHRlcnMpO1xyXG4gICAgfSBlbHNlIGlmIChjYWxsZXIgPT09IEVtaXR0ZXJUeXBlLmxvY2FsKSB7XHJcbiAgICAgIHRoaXMub25GaWx0ZXJDaGFuZ2VkLm5leHQodGhpcy5nZXRDdXJyZW50TG9jYWxGaWx0ZXJzKCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB1c2VyIHBhc3NlcyBhbiBhcnJheSBvZiBwcmVzZXQgZmlsdGVycywgd2UgbmVlZCB0byBwcmUtcG9wdWxhdGUgZWFjaCBjb2x1bW4gZmlsdGVyIHNlYXJjaFRlcm0ocylcclxuICAgKiBUaGUgcHJvY2VzcyBpcyB0byBsb29wIHRocm91Z2ggdGhlIHByZXNldCBmaWx0ZXJzIGFycmF5LCBmaW5kIHRoZSBhc3NvY2lhdGVkIGNvbHVtbiBmcm9tIGNvbHVtbkRlZmluaXRpb25zIGFuZCBmaWxsIGluIHRoZSBmaWx0ZXIgb2JqZWN0IHNlYXJjaFRlcm0ocylcclxuICAgKiBUaGlzIGlzIGJhc2ljYWxseSB0aGUgc2FtZSBhcyBpZiB3ZSB3b3VsZCBtYW51YWxseSBhZGQgc2VhcmNoVGVybShzKSB0byBhIGNvbHVtbiBmaWx0ZXIgb2JqZWN0IGluIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiwgYnV0IHdlIGRvIGl0IHByb2dyYW1tYXRpY2FsbHkuXHJcbiAgICogQXQgdGhlIGVuZCBvZiB0aGUgZGF5LCB3aGVuIGNyZWF0aW5nIHRoZSBGaWx0ZXIgKERPTSBFbGVtZW50KSwgaXQgd2lsbCB1c2UgdGhlc2Ugc2VhcmNoVGVybShzKSBzbyB3ZSBjYW4gdGFrZSBhZHZhbnRhZ2Ugb2YgdGhhdCB3aXRob3V0IHJlY29kaW5nIGVhY2ggRmlsdGVyIHR5cGUgKERPTSBlbGVtZW50KVxyXG4gICAqL1xyXG4gIHBvcHVsYXRlQ29sdW1uRmlsdGVyU2VhcmNoVGVybXMoKSB7XHJcbiAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMucHJlc2V0cyAmJiBBcnJheS5pc0FycmF5KHRoaXMuX2dyaWRPcHRpb25zLnByZXNldHMuZmlsdGVycykgJiYgdGhpcy5fZ3JpZE9wdGlvbnMucHJlc2V0cy5maWx0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgZmlsdGVycyA9IHRoaXMuX2dyaWRPcHRpb25zLnByZXNldHMuZmlsdGVycztcclxuICAgICAgdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMuZm9yRWFjaCgoY29sdW1uRGVmOiBDb2x1bW4pID0+IHtcclxuICAgICAgICAvLyBjbGVhciBhbnkgY29sdW1uRGVmIHNlYXJjaFRlcm1zIGJlZm9yZSBhcHBseWluZyBQcmVzZXRzXHJcbiAgICAgICAgaWYgKGNvbHVtbkRlZi5maWx0ZXIgJiYgY29sdW1uRGVmLmZpbHRlci5zZWFyY2hUZXJtcykge1xyXG4gICAgICAgICAgZGVsZXRlIGNvbHVtbkRlZi5maWx0ZXIuc2VhcmNoVGVybXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBmcm9tIGVhY2ggcHJlc2V0cywgd2Ugd2lsbCBmaW5kIHRoZSBhc3NvY2lhdGVkIGNvbHVtbkRlZiBhbmQgYXBwbHkgdGhlIHByZXNldCBzZWFyY2hUZXJtcyAmIG9wZXJhdG9yIGlmIHRoZXJlIGlzXHJcbiAgICAgICAgY29uc3QgY29sdW1uUHJlc2V0ID0gZmlsdGVycy5maW5kKChwcmVzZXRGaWx0ZXI6IEN1cnJlbnRGaWx0ZXIpID0+IHtcclxuICAgICAgICAgIHJldHVybiBwcmVzZXRGaWx0ZXIuY29sdW1uSWQgPT09IGNvbHVtbkRlZi5pZDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoY29sdW1uUHJlc2V0ICYmIGNvbHVtblByZXNldC5zZWFyY2hUZXJtcyAmJiBBcnJheS5pc0FycmF5KGNvbHVtblByZXNldC5zZWFyY2hUZXJtcykpIHtcclxuICAgICAgICAgIGNvbHVtbkRlZi5maWx0ZXIgPSBjb2x1bW5EZWYuZmlsdGVyIHx8IHt9O1xyXG4gICAgICAgICAgY29sdW1uRGVmLmZpbHRlci5vcGVyYXRvciA9IGNvbHVtblByZXNldC5vcGVyYXRvciB8fCBjb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yIHx8ICcnO1xyXG4gICAgICAgICAgY29sdW1uRGVmLmZpbHRlci5zZWFyY2hUZXJtcyA9IGNvbHVtblByZXNldC5zZWFyY2hUZXJtcztcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVDb2x1bW5GaWx0ZXJzKHNlYXJjaFRlcm1zOiBTZWFyY2hUZXJtW10gfCB1bmRlZmluZWQsIGNvbHVtbkRlZjogYW55LCBvcGVyYXRvcj86IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nKSB7XHJcbiAgICBpZiAoc2VhcmNoVGVybXMgJiYgY29sdW1uRGVmKSB7XHJcbiAgICAgIC8vIHRoaXMuX2NvbHVtbkZpbHRlcnMuc2VhcmNoVGVybXMgPSBzZWFyY2hUZXJtcztcclxuICAgICAgdGhpcy5fY29sdW1uRmlsdGVyc1tjb2x1bW5EZWYuaWRdID0ge1xyXG4gICAgICAgIGNvbHVtbklkOiBjb2x1bW5EZWYuaWQsXHJcbiAgICAgICAgY29sdW1uRGVmLFxyXG4gICAgICAgIHNlYXJjaFRlcm1zLFxyXG4gICAgICAgIG9wZXJhdG9yXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyaWdnZXJFdmVudChzbGlja0V2ZW50OiBhbnksIGFyZ3M6IGFueSwgZTogYW55KSB7XHJcbiAgICBzbGlja0V2ZW50ID0gc2xpY2tFdmVudCB8fCBuZXcgU2xpY2suRXZlbnQoKTtcclxuXHJcbiAgICAvLyBldmVudCBtaWdodCBoYXZlIGJlZW4gY3JlYXRlZCBhcyBhIEN1c3RvbUV2ZW50IChlLmcuIENvbXBvdW5kRGF0ZUZpbHRlciksIHdpdGhvdXQgYmVpbmcgYSB2YWxpZCBTbGljay5FdmVudERhdGEuXHJcbiAgICAvLyBpZiBzbyB3ZSB3aWxsIGNyZWF0ZSBhIG5ldyBTbGljay5FdmVudERhdGEgYW5kIG1lcmdlIGl0IHdpdGggdGhhdCBDdXN0b21FdmVudCB0byBhdm9pZCBoYXZpbmcgU2xpY2tHcmlkIGVycm9yc1xyXG4gICAgbGV0IGV2ZW50ID0gZTtcclxuICAgIGlmIChlICYmIHR5cGVvZiBlLmlzUHJvcGFnYXRpb25TdG9wcGVkICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIGV2ZW50ID0gJC5leHRlbmQoe30sIG5ldyBTbGljay5FdmVudERhdGEoKSwgZSk7XHJcbiAgICB9XHJcbiAgICBzbGlja0V2ZW50Lm5vdGlmeShhcmdzLCBldmVudCwgYXJncy5ncmlkKTtcclxuICB9XHJcbn1cclxuIl19