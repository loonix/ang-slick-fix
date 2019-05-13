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
const isequal = isequal_;
// timer for keeping track of user typing waits
/** @type {?} */
let timer;
/** @type {?} */
const DEFAULT_FILTER_TYPING_DEBOUNCE = 500;
export class FilterService {
    /**
     * @param {?} filterFactory
     */
    constructor(filterFactory) {
        this.filterFactory = filterFactory;
        this._eventHandler = new Slick.EventHandler();
        this._isFilterFirstRender = true;
        this._firstColumnIdRendered = '';
        this._filters = [];
        this._columnFilters = {};
        this.onFilterChanged = new Subject();
        this.onFilterCleared = new Subject();
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
     * Getter for the Column Definitions pulled through the Grid Object
     * @private
     * @return {?}
     */
    get _columnDefinitions() {
        return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
    }
    /**
     * @param {?} grid
     * @return {?}
     */
    init(grid) {
        this._grid = grid;
    }
    /**
     * Attach a backend filter hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView
     * @return {?}
     */
    attachBackendOnFilter(grid, dataView) {
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
        (e, args) => {
            // firstColumnIdRendered is null at first, so if it changes to being filled and equal then we know it was already rendered
            if (args.column.id === this._firstColumnIdRendered) {
                this._isFilterFirstRender = false;
            }
            this.addFilterTemplateToHeaderRow(args, this._isFilterFirstRender);
            if (this._firstColumnIdRendered === '') {
                this._firstColumnIdRendered = args.column.id;
            }
        }));
    }
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    onBackendFilterChange(event, args) {
        if (!args || !args.grid) {
            throw new Error('Something went wrong when trying to attach the "attachBackendOnFilterSubscribe(event, args)" function, it seems that "args" is not populated correctly');
        }
        /** @type {?} */
        const backendApi = this._gridOptions.backendServiceApi;
        if (!backendApi || !backendApi.process || !backendApi.service) {
            throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
        }
        try {
            // keep start time & end timestamps & return it after process execution
            /** @type {?} */
            const startTime = new Date();
            // run a preProcess callback if defined
            if (backendApi.preProcess) {
                backendApi.preProcess();
            }
            // only add a delay when user is typing, on select dropdown filter (or "Clear Filter") it will execute right away
            /** @type {?} */
            let debounceTypingDelay = 0;
            /** @type {?} */
            const isTriggeredByClearFilter = args && args.clearFilterTriggered;
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
                    () => this.executeBackendCallback(event, args, startTime, backendApi)), debounceTypingDelay);
                }
                else {
                    this.executeBackendCallback(event, args, startTime, backendApi);
                }
            }
        }
        catch (error) {
            onBackendError(error, backendApi);
        }
    }
    /**
     * @param {?} event
     * @param {?} args
     * @param {?} startTime
     * @param {?} backendApi
     * @return {?}
     */
    executeBackendCallback(event, args, startTime, backendApi) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const query = yield backendApi.service.processOnFilterChanged(event, args);
            // emit an onFilterChanged event when it's not called by a clear filter
            if (args && !args.clearFilterTriggered) {
                this.emitFilterChanged(EmitterType.remote);
            }
            // the processes can be Observables (like HttpClient) or Promises
            /** @type {?} */
            const process = backendApi.process(query);
            if (process instanceof Promise && process.then) {
                process.then((/**
                 * @param {?} processResult
                 * @return {?}
                 */
                (processResult) => executeBackendProcessesCallback(startTime, processResult, backendApi, this._gridOptions)));
            }
            else if (isObservable(process)) {
                process.subscribe((/**
                 * @param {?} processResult
                 * @return {?}
                 */
                (processResult) => executeBackendProcessesCallback(startTime, processResult, backendApi, this._gridOptions)), (/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => onBackendError(error, backendApi)));
            }
        });
    }
    /**
     * Attach a local filter hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView
     * @return {?}
     */
    attachLocalOnFilter(grid, dataView) {
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
        (e, args) => {
            /** @type {?} */
            const columnId = args.columnId;
            if (columnId != null) {
                dataView.refresh();
            }
            // emit an onFilterChanged event when it's not called by a clear filter
            if (args && !args.clearFilterTriggered) {
                this.emitFilterChanged(EmitterType.local);
            }
        }));
        // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
        this._eventHandler.subscribe(grid.onHeaderRowCellRendered, (/**
         * @param {?} e
         * @param {?} args
         * @return {?}
         */
        (e, args) => {
            this.addFilterTemplateToHeaderRow(args);
        }));
    }
    /**
     * @param {?} event
     * @param {?} columnId
     * @return {?}
     */
    clearFilterByColumnId(event, columnId) {
        /** @type {?} */
        const colFilter = this._filters.find((/**
         * @param {?} filter
         * @return {?}
         */
        (filter) => filter.columnDef.id === columnId));
        if (colFilter && colFilter.clear) {
            colFilter.clear(true);
        }
        // we need to loop through all columnFilters and delete the filter found
        // only trying to clear columnFilter (without looping through) would not trigger a dataset change
        for (const colId in this._columnFilters) {
            if (colId === columnId && this._columnFilters[colId]) {
                delete this._columnFilters[colId];
            }
        }
        /** @type {?} */
        let emitter = EmitterType.local;
        /** @type {?} */
        const isBackendApi = this._gridOptions && this._gridOptions.backendServiceApi || false;
        // when using a backend service, we need to manually trigger a filter change
        if (isBackendApi) {
            emitter = EmitterType.remote;
            this.onBackendFilterChange((/** @type {?} */ (event)), { grid: this._grid, columnFilters: this._columnFilters });
        }
        // emit an event when filter is cleared
        this.emitFilterChanged(emitter);
    }
    /**
     * Clear the search filters (below the column titles)
     * @return {?}
     */
    clearFilters() {
        this._filters.forEach((/**
         * @param {?} filter
         * @return {?}
         */
        (filter) => {
            if (filter && filter.clear) {
                // clear element and trigger a change
                filter.clear(false);
            }
        }));
        // we need to loop through all columnFilters and delete them 1 by 1
        // only trying to clear columnFilter (without looping through) would not trigger a dataset change
        for (const columnId in this._columnFilters) {
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
            const callbackArgs = { clearFilterTriggered: true, shouldTriggerQuery: true, grid: this._grid, columnFilters: this._columnFilters };
            this.executeBackendCallback(undefined, callbackArgs, new Date(), this._gridOptions.backendServiceApi);
        }
        // emit an event when filters are all cleared
        this.onFilterCleared.next(true);
    }
    /**
     * @param {?} dataView
     * @param {?} item
     * @param {?} args
     * @return {?}
     */
    customLocalFilter(dataView, item, args) {
        for (const columnId of Object.keys(args.columnFilters)) {
            /** @type {?} */
            const columnFilter = args.columnFilters[columnId];
            /** @type {?} */
            const columnIndex = args.grid.getColumnIndex(columnId);
            /** @type {?} */
            const columnDef = args.grid.getColumns()[columnIndex];
            if (!columnDef) {
                return false;
            }
            // Row Detail View plugin, if the row is padding we just get the value we're filtering on from it's parent
            if (this._gridOptions.enableRowDetailView) {
                /** @type {?} */
                const metadataPrefix = this._gridOptions.rowDetailView && this._gridOptions.rowDetailView.keyPrefix || '__';
                if (item[`${metadataPrefix}isPadding`] && item[`${metadataPrefix}parent`]) {
                    item = item[`${metadataPrefix}parent`];
                }
            }
            /** @type {?} */
            const dataKey = columnDef.dataKey;
            /** @type {?} */
            const fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field;
            /** @type {?} */
            const fieldType = columnDef.type || FieldType.string;
            /** @type {?} */
            const filterSearchType = (columnDef.filterSearchType) ? columnDef.filterSearchType : null;
            /** @type {?} */
            let cellValue = item[fieldName];
            // when item is a complex object (dot "." notation), we need to filter the value contained in the object tree
            if (fieldName.indexOf('.') >= 0) {
                cellValue = getDescendantProperty(item, fieldName);
            }
            // if we find searchTerms use them but make a deep copy so that we don't affect original array
            // we might have to overwrite the value(s) locally that are returned
            // e.g: we don't want to operator within the search value, since it will fail filter condition check trigger afterward
            /** @type {?} */
            const searchValues = (columnFilter && columnFilter.searchTerms) ? $.extend(true, [], columnFilter.searchTerms) : null;
            /** @type {?} */
            let fieldSearchValue = (Array.isArray(searchValues) && searchValues.length === 1) ? searchValues[0] : '';
            /** @type {?} */
            let matches = null;
            if (fieldType !== FieldType.object) {
                fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
            }
            /** @type {?} */
            let operator = columnFilter.operator || ((matches) ? matches[1] : '');
            /** @type {?} */
            const searchTerm = (!!matches) ? matches[2] : '';
            /** @type {?} */
            const lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
            if (searchValues && searchValues.length > 1) {
                fieldSearchValue = searchValues.join(',');
            }
            else if (typeof fieldSearchValue === 'string') {
                // escaping the search value
                fieldSearchValue = fieldSearchValue.replace(`'`, `''`); // escape single quotes by doubling them
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
                for (let k = 0, ln = searchValues.length; k < ln; k++) {
                    // make sure all search terms are strings
                    searchValues[k] = ((searchValues[k] === undefined || searchValues[k] === null) ? '' : searchValues[k]) + '';
                }
            }
            // when using localization (i18n), we should use the formatter output to search as the new cell value
            if (columnDef && columnDef.params && columnDef.params.useFormatterOuputToFilter) {
                /** @type {?} */
                const rowIndex = (dataView && typeof dataView.getIdxById === 'function') ? dataView.getIdxById(item.id) : 0;
                cellValue = columnDef.formatter(rowIndex, columnIndex, cellValue, columnDef, item, this._grid);
            }
            // make sure cell value is always a string
            if (typeof cellValue === 'number') {
                cellValue = cellValue.toString();
            }
            /** @type {?} */
            const conditionOptions = {
                dataKey,
                fieldType,
                searchTerms: searchValues,
                cellValue,
                operator,
                cellValueLastChar: lastValueChar,
                filterSearchType
            };
            if (!FilterConditions.executeMappedCondition(conditionOptions)) {
                return false;
            }
        }
        return true;
    }
    /**
     * @return {?}
     */
    dispose() {
        this.disposeColumnFilters();
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        // unsubscribe local event
        if (this._slickSubscriber && typeof this._slickSubscriber.unsubscribe === 'function') {
            this._slickSubscriber.unsubscribe();
        }
    }
    /**
     * Dispose of the filters, since it's a singleton, we don't want to affect other grids with same columns
     * @return {?}
     */
    disposeColumnFilters() {
        // we need to loop through all columnFilters and delete them 1 by 1
        // only trying to make columnFilter an empty (without looping) would not trigger a dataset change
        for (const columnId in this._columnFilters) {
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
        (filter, index) => {
            if (filter && filter.destroy) {
                filter.destroy(true);
            }
        }));
    }
    /**
     * @return {?}
     */
    getColumnFilters() {
        return this._columnFilters;
    }
    /**
     * @return {?}
     */
    getCurrentLocalFilters() {
        /** @type {?} */
        const currentFilters = [];
        if (this._columnFilters) {
            for (const colId of Object.keys(this._columnFilters)) {
                /** @type {?} */
                const columnFilter = this._columnFilters[colId];
                /** @type {?} */
                const filter = (/** @type {?} */ ({ columnId: colId || '' }));
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
        return currentFilters;
    }
    /**
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    callbackSearchEvent(e, args) {
        if (args) {
            /** @type {?} */
            const searchTerm = ((e && e.target) ? ((/** @type {?} */ (e.target))).value : undefined);
            /** @type {?} */
            const searchTerms = (args.searchTerms && Array.isArray(args.searchTerms)) ? args.searchTerms : (searchTerm ? [searchTerm] : undefined);
            /** @type {?} */
            const columnDef = args.columnDef || null;
            /** @type {?} */
            const columnId = columnDef ? (columnDef.id || '') : '';
            /** @type {?} */
            const operator = args.operator || undefined;
            /** @type {?} */
            const hasSearchTerms = searchTerms && Array.isArray(searchTerms);
            /** @type {?} */
            const termsCount = hasSearchTerms && searchTerms.length;
            /** @type {?} */
            const oldColumnFilters = Object.assign({}, this._columnFilters);
            if (!hasSearchTerms || termsCount === 0 || (termsCount === 1 && searchTerms[0] === '')) {
                // delete the property from the columnFilters when it becomes empty
                // without doing this, it would leave an incorrect state of the previous column filters when filtering on another column
                delete this._columnFilters[columnId];
            }
            else {
                /** @type {?} */
                const colId = (/** @type {?} */ ('' + columnId));
                /** @type {?} */
                const colFilter = {
                    columnId: colId,
                    columnDef,
                    searchTerms,
                };
                if (operator) {
                    colFilter.operator = operator;
                }
                this._columnFilters[colId] = colFilter;
            }
            // trigger an event only if Filters changed or if ENTER key was pressed
            /** @type {?} */
            const eventKeyCode = e && e.keyCode;
            if (eventKeyCode === KeyCode.ENTER || !isequal(oldColumnFilters, this._columnFilters)) {
                this.triggerEvent(this._slickSubscriber, {
                    clearFilterTriggered: args.clearFilterTriggered,
                    shouldTriggerQuery: args.shouldTriggerQuery,
                    columnId,
                    columnDef: args.columnDef || null,
                    columnFilters: this._columnFilters,
                    operator,
                    searchTerms,
                    serviceOptions: this._onFilterChangedOptions,
                    grid: this._grid
                }, e);
            }
        }
    }
    /**
     * @param {?} args
     * @param {?=} isFilterFirstRender
     * @return {?}
     */
    addFilterTemplateToHeaderRow(args, isFilterFirstRender = true) {
        /** @type {?} */
        const columnDef = args.column;
        /** @type {?} */
        const columnId = columnDef.id || '';
        if (columnDef && columnId !== 'selector' && columnDef.filterable) {
            /** @type {?} */
            let searchTerms;
            /** @type {?} */
            let operator;
            /** @type {?} */
            const filter = this.filterFactory.createFilter(args.column.filter);
            operator = (columnDef && columnDef.filter && columnDef.filter.operator) || (filter && filter.operator) || undefined;
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
            const filterArguments = {
                grid: this._grid,
                operator,
                searchTerms,
                columnDef,
                callback: this.callbackSearchEvent.bind(this)
            };
            if (filter) {
                filter.init(filterArguments, isFilterFirstRender);
                /** @type {?} */
                const filterExistIndex = this._filters.findIndex((/**
                 * @param {?} filt
                 * @return {?}
                 */
                (filt) => filter.columnDef.name === filt.columnDef.name));
                // add to the filters arrays or replace it when found
                if (filterExistIndex === -1) {
                    this._filters.push(filter);
                }
                else {
                    this._filters[filterExistIndex] = filter;
                }
                // when hiding/showing (with Column Picker or Grid Menu), it will try to re-create yet again the filters (since SlickGrid does a re-render)
                // we need to also set again the values in the DOM elements if the values were set by a searchTerm(s)
                if (searchTerms && filter.setValues) {
                    filter.setValues(searchTerms);
                }
            }
        }
    }
    /**
     * A simple function that is attached to the subscriber and emit a change when the filter is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param {?} caller
     * @return {?}
     */
    emitFilterChanged(caller) {
        if (caller === EmitterType.remote && this._gridOptions && this._gridOptions.backendServiceApi) {
            /** @type {?} */
            let currentFilters = [];
            /** @type {?} */
            const backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentFilters) {
                currentFilters = (/** @type {?} */ (backendService.getCurrentFilters()));
            }
            this.onFilterChanged.next(currentFilters);
        }
        else if (caller === EmitterType.local) {
            this.onFilterChanged.next(this.getCurrentLocalFilters());
        }
    }
    /**
     * When user passes an array of preset filters, we need to pre-populate each column filter searchTerm(s)
     * The process is to loop through the preset filters array, find the associated column from columnDefinitions and fill in the filter object searchTerm(s)
     * This is basically the same as if we would manually add searchTerm(s) to a column filter object in the column definition, but we do it programmatically.
     * At the end of the day, when creating the Filter (DOM Element), it will use these searchTerm(s) so we can take advantage of that without recoding each Filter type (DOM element)
     * @return {?}
     */
    populateColumnFilterSearchTerms() {
        if (this._gridOptions.presets && Array.isArray(this._gridOptions.presets.filters) && this._gridOptions.presets.filters.length > 0) {
            /** @type {?} */
            const filters = this._gridOptions.presets.filters;
            this._columnDefinitions.forEach((/**
             * @param {?} columnDef
             * @return {?}
             */
            (columnDef) => {
                // clear any columnDef searchTerms before applying Presets
                if (columnDef.filter && columnDef.filter.searchTerms) {
                    delete columnDef.filter.searchTerms;
                }
                // from each presets, we will find the associated columnDef and apply the preset searchTerms & operator if there is
                /** @type {?} */
                const columnPreset = filters.find((/**
                 * @param {?} presetFilter
                 * @return {?}
                 */
                (presetFilter) => {
                    return presetFilter.columnId === columnDef.id;
                }));
                if (columnPreset && columnPreset.searchTerms && Array.isArray(columnPreset.searchTerms)) {
                    columnDef.filter = columnDef.filter || {};
                    columnDef.filter.operator = columnPreset.operator || columnDef.filter.operator || '';
                    columnDef.filter.searchTerms = columnPreset.searchTerms;
                }
            }));
        }
    }
    /**
     * @private
     * @param {?} searchTerms
     * @param {?} columnDef
     * @param {?=} operator
     * @return {?}
     */
    updateColumnFilters(searchTerms, columnDef, operator) {
        if (searchTerms && columnDef) {
            // this._columnFilters.searchTerms = searchTerms;
            this._columnFilters[columnDef.id] = {
                columnId: columnDef.id,
                columnDef,
                searchTerms,
                operator
            };
        }
    }
    /**
     * @private
     * @param {?} slickEvent
     * @param {?} args
     * @param {?} e
     * @return {?}
     */
    triggerEvent(slickEvent, args, e) {
        slickEvent = slickEvent || new Slick.Event();
        // event might have been created as a CustomEvent (e.g. CompoundDateFilter), without being a valid Slick.EventData.
        // if so we will create a new Slick.EventData and merge it with that CustomEvent to avoid having SlickGrid errors
        /** @type {?} */
        let event = e;
        if (e && typeof e.isPropagationStopped !== 'function') {
            event = $.extend({}, new Slick.EventData(), e);
        }
        slickEvent.notify(args, event, args.grid);
    }
}
FilterService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FilterService.ctorParameters = () => [
    { type: FilterFactory }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2ZpbHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBS0wsV0FBVyxFQUlYLFNBQVMsRUFHVCxPQUFPLEVBQ1AsWUFBWSxHQUtiLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLCtCQUErQixFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxLQUFLLFFBQVEsTUFBTSxnQkFBZ0IsQ0FBQzs7TUFDckMsT0FBTyxHQUFHLFFBQVE7OztJQU9wQixLQUFVOztNQUNSLDhCQUE4QixHQUFHLEdBQUc7QUFHMUMsTUFBTSxPQUFPLGFBQWE7Ozs7SUFheEIsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFaeEMsa0JBQWEsR0FBRyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6Qyx5QkFBb0IsR0FBRyxJQUFJLENBQUM7UUFDNUIsMkJBQXNCLEdBQUcsRUFBRSxDQUFDO1FBRTVCLGFBQVEsR0FBVSxFQUFFLENBQUM7UUFDckIsbUJBQWMsR0FBa0IsRUFBRSxDQUFDO1FBSTNDLG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQW1CLENBQUM7UUFDakQsb0JBQWUs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SUFDdkIsOEJBQW1COzs7OztJQUNuQixnREFBcUM7O0lBQ3JDLHdDQUFpRDs7SUFDakQsd0NBQXlDOzs7OztJQUU3QixzQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQmFja2VuZFNlcnZpY2VBcGksXHJcbiAgQ29sdW1uLFxyXG4gIENvbHVtbkZpbHRlcixcclxuICBDb2x1bW5GaWx0ZXJzLFxyXG4gIEVtaXR0ZXJUeXBlLFxyXG4gIEZpbHRlcixcclxuICBGaWx0ZXJBcmd1bWVudHMsXHJcbiAgRmlsdGVyQ2FsbGJhY2tBcmcsXHJcbiAgRmllbGRUeXBlLFxyXG4gIEdyYXBocWxSZXN1bHQsXHJcbiAgR3JpZE9wdGlvbixcclxuICBLZXlDb2RlLFxyXG4gIE9wZXJhdG9yVHlwZSxcclxuICBDdXJyZW50RmlsdGVyLFxyXG4gIFNlYXJjaFRlcm0sXHJcbiAgU2xpY2tFdmVudCxcclxuICBPcGVyYXRvclN0cmluZyxcclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IGV4ZWN1dGVCYWNrZW5kUHJvY2Vzc2VzQ2FsbGJhY2ssIG9uQmFja2VuZEVycm9yIH0gZnJvbSAnLi9iYWNrZW5kLXV0aWxpdGllcyc7XHJcbmltcG9ydCB7IGdldERlc2NlbmRhbnRQcm9wZXJ0eSB9IGZyb20gJy4vdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgRmlsdGVyQ29uZGl0aW9ucyB9IGZyb20gJy4vLi4vZmlsdGVyLWNvbmRpdGlvbnMnO1xyXG5pbXBvcnQgeyBGaWx0ZXJGYWN0b3J5IH0gZnJvbSAnLi4vZmlsdGVycy9maWx0ZXJGYWN0b3J5JztcclxuaW1wb3J0IHsgaXNPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCAqIGFzIGlzZXF1YWxfIGZyb20gJ2xvZGFzaC5pc2VxdWFsJztcclxuY29uc3QgaXNlcXVhbCA9IGlzZXF1YWxfOyAvLyBwYXRjaCB0byBmaXggcm9sbHVwIHRvIHdvcmtcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcclxuZGVjbGFyZSB2YXIgJDogYW55O1xyXG5cclxuLy8gdGltZXIgZm9yIGtlZXBpbmcgdHJhY2sgb2YgdXNlciB0eXBpbmcgd2FpdHNcclxubGV0IHRpbWVyOiBhbnk7XHJcbmNvbnN0IERFRkFVTFRfRklMVEVSX1RZUElOR19ERUJPVU5DRSA9IDUwMDtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZpbHRlclNlcnZpY2Uge1xyXG4gIHByaXZhdGUgX2V2ZW50SGFuZGxlciA9IG5ldyBTbGljay5FdmVudEhhbmRsZXIoKTtcclxuICBwcml2YXRlIF9pc0ZpbHRlckZpcnN0UmVuZGVyID0gdHJ1ZTtcclxuICBwcml2YXRlIF9maXJzdENvbHVtbklkUmVuZGVyZWQgPSAnJztcclxuICBwcml2YXRlIF9zbGlja1N1YnNjcmliZXI6IFNsaWNrRXZlbnQ7XHJcbiAgcHJpdmF0ZSBfZmlsdGVyczogYW55W10gPSBbXTtcclxuICBwcml2YXRlIF9jb2x1bW5GaWx0ZXJzOiBDb2x1bW5GaWx0ZXJzID0ge307XHJcbiAgcHJpdmF0ZSBfZGF0YVZpZXc6IGFueTtcclxuICBwcml2YXRlIF9ncmlkOiBhbnk7XHJcbiAgcHJpdmF0ZSBfb25GaWx0ZXJDaGFuZ2VkT3B0aW9uczogYW55O1xyXG4gIG9uRmlsdGVyQ2hhbmdlZCA9IG5ldyBTdWJqZWN0PEN1cnJlbnRGaWx0ZXJbXT4oKTtcclxuICBvbkZpbHRlckNsZWFyZWQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZpbHRlckZhY3Rvcnk6IEZpbHRlckZhY3RvcnkpIHsgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByaXZhdGUgZ2V0IF9ncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcclxuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDb2x1bW4gRGVmaW5pdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXHJcbiAgcHJpdmF0ZSBnZXQgX2NvbHVtbkRlZmluaXRpb25zKCk6IENvbHVtbltdIHtcclxuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldENvbHVtbnMpID8gdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKCkgOiBbXTtcclxuICB9XHJcblxyXG4gIGluaXQoZ3JpZDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEF0dGFjaCBhIGJhY2tlbmQgZmlsdGVyIGhvb2sgdG8gdGhlIGdyaWRcclxuICAgKiBAcGFyYW0gZ3JpZCBTbGlja0dyaWQgR3JpZCBvYmplY3RcclxuICAgKi9cclxuICBhdHRhY2hCYWNrZW5kT25GaWx0ZXIoZ3JpZDogYW55LCBkYXRhVmlldzogYW55KSB7XHJcbiAgICB0aGlzLl9kYXRhVmlldyA9IGRhdGFWaWV3O1xyXG4gICAgdGhpcy5fZmlsdGVycyA9IFtdO1xyXG4gICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyID0gbmV3IFNsaWNrLkV2ZW50KCk7XHJcblxyXG4gICAgLy8gc3Vic2NyaWJlIHRvIHRoZSBTbGlja0dyaWQgZXZlbnQgYW5kIGNhbGwgdGhlIGJhY2tlbmQgZXhlY3V0aW9uXHJcbiAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIuc3Vic2NyaWJlKHRoaXMub25CYWNrZW5kRmlsdGVyQ2hhbmdlLmJpbmQodGhpcykpO1xyXG5cclxuICAgIC8vIHN1YnNjcmliZSB0byBTbGlja0dyaWQgb25IZWFkZXJSb3dDZWxsUmVuZGVyZWQgZXZlbnQgdG8gY3JlYXRlIGZpbHRlciB0ZW1wbGF0ZVxyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShncmlkLm9uSGVhZGVyUm93Q2VsbFJlbmRlcmVkLCAoZTogS2V5Ym9hcmRFdmVudCwgYXJnczogYW55KSA9PiB7XHJcbiAgICAgIC8vIGZpcnN0Q29sdW1uSWRSZW5kZXJlZCBpcyBudWxsIGF0IGZpcnN0LCBzbyBpZiBpdCBjaGFuZ2VzIHRvIGJlaW5nIGZpbGxlZCBhbmQgZXF1YWwgdGhlbiB3ZSBrbm93IGl0IHdhcyBhbHJlYWR5IHJlbmRlcmVkXHJcbiAgICAgIGlmIChhcmdzLmNvbHVtbi5pZCA9PT0gdGhpcy5fZmlyc3RDb2x1bW5JZFJlbmRlcmVkKSB7XHJcbiAgICAgICAgdGhpcy5faXNGaWx0ZXJGaXJzdFJlbmRlciA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYWRkRmlsdGVyVGVtcGxhdGVUb0hlYWRlclJvdyhhcmdzLCB0aGlzLl9pc0ZpbHRlckZpcnN0UmVuZGVyKTtcclxuICAgICAgaWYgKHRoaXMuX2ZpcnN0Q29sdW1uSWRSZW5kZXJlZCA9PT0gJycpIHtcclxuICAgICAgICB0aGlzLl9maXJzdENvbHVtbklkUmVuZGVyZWQgPSBhcmdzLmNvbHVtbi5pZDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvbkJhY2tlbmRGaWx0ZXJDaGFuZ2UoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGFyZ3M6IGFueSkge1xyXG4gICAgaWYgKCFhcmdzIHx8ICFhcmdzLmdyaWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGVuIHRyeWluZyB0byBhdHRhY2ggdGhlIFwiYXR0YWNoQmFja2VuZE9uRmlsdGVyU3Vic2NyaWJlKGV2ZW50LCBhcmdzKVwiIGZ1bmN0aW9uLCBpdCBzZWVtcyB0aGF0IFwiYXJnc1wiIGlzIG5vdCBwb3B1bGF0ZWQgY29ycmVjdGx5Jyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBiYWNrZW5kQXBpID0gdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGk7XHJcbiAgICBpZiAoIWJhY2tlbmRBcGkgfHwgIWJhY2tlbmRBcGkucHJvY2VzcyB8fCAhYmFja2VuZEFwaS5zZXJ2aWNlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQmFja2VuZFNlcnZpY2VBcGkgcmVxdWlyZXMgYXQgbGVhc3QgYSBcInByb2Nlc3NcIiBmdW5jdGlvbiBhbmQgYSBcInNlcnZpY2VcIiBkZWZpbmVkYCk7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBrZWVwIHN0YXJ0IHRpbWUgJiBlbmQgdGltZXN0YW1wcyAmIHJldHVybiBpdCBhZnRlciBwcm9jZXNzIGV4ZWN1dGlvblxyXG4gICAgICBjb25zdCBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgLy8gcnVuIGEgcHJlUHJvY2VzcyBjYWxsYmFjayBpZiBkZWZpbmVkXHJcbiAgICAgIGlmIChiYWNrZW5kQXBpLnByZVByb2Nlc3MpIHtcclxuICAgICAgICBiYWNrZW5kQXBpLnByZVByb2Nlc3MoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gb25seSBhZGQgYSBkZWxheSB3aGVuIHVzZXIgaXMgdHlwaW5nLCBvbiBzZWxlY3QgZHJvcGRvd24gZmlsdGVyIChvciBcIkNsZWFyIEZpbHRlclwiKSBpdCB3aWxsIGV4ZWN1dGUgcmlnaHQgYXdheVxyXG4gICAgICBsZXQgZGVib3VuY2VUeXBpbmdEZWxheSA9IDA7XHJcbiAgICAgIGNvbnN0IGlzVHJpZ2dlcmVkQnlDbGVhckZpbHRlciA9IGFyZ3MgJiYgYXJncy5jbGVhckZpbHRlclRyaWdnZXJlZDsgLy8gd2FzIGl0IHRyaWdnZXIgYnkgYSBcIkNsZWFyIEZpbHRlclwiIGNvbW1hbmQ/XHJcblxyXG4gICAgICBpZiAoIWlzVHJpZ2dlcmVkQnlDbGVhckZpbHRlciAmJiBldmVudCAmJiBldmVudC5rZXlDb2RlICE9PSBLZXlDb2RlLkVOVEVSICYmIChldmVudC50eXBlID09PSAnaW5wdXQnIHx8IGV2ZW50LnR5cGUgPT09ICdrZXl1cCcgfHwgZXZlbnQudHlwZSA9PT0gJ2tleWRvd24nKSkge1xyXG4gICAgICAgIGRlYm91bmNlVHlwaW5nRGVsYXkgPSBiYWNrZW5kQXBpLmZpbHRlclR5cGluZ0RlYm91bmNlIHx8IERFRkFVTFRfRklMVEVSX1RZUElOR19ERUJPVU5DRTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gcXVlcnkgYmFja2VuZCwgZXhjZXB0IHdoZW4gaXQncyBjYWxsZWQgYnkgYSBDbGVhckZpbHRlcnMgdGhlbiB3ZSB3b24ndFxyXG4gICAgICBpZiAoYXJncyAmJiBhcmdzLnNob3VsZFRyaWdnZXJRdWVyeSkge1xyXG4gICAgICAgIC8vIGNhbGwgdGhlIHNlcnZpY2UgdG8gZ2V0IGEgcXVlcnkgYmFja1xyXG4gICAgICAgIGlmIChkZWJvdW5jZVR5cGluZ0RlbGF5ID4gMCkge1xyXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmV4ZWN1dGVCYWNrZW5kQ2FsbGJhY2soZXZlbnQsIGFyZ3MsIHN0YXJ0VGltZSwgYmFja2VuZEFwaSksIGRlYm91bmNlVHlwaW5nRGVsYXkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmV4ZWN1dGVCYWNrZW5kQ2FsbGJhY2soZXZlbnQsIGFyZ3MsIHN0YXJ0VGltZSwgYmFja2VuZEFwaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBvbkJhY2tlbmRFcnJvcihlcnJvciwgYmFja2VuZEFwaSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBleGVjdXRlQmFja2VuZENhbGxiYWNrKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBhcmdzOiBhbnksIHN0YXJ0VGltZTogRGF0ZSwgYmFja2VuZEFwaTogQmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgIGNvbnN0IHF1ZXJ5ID0gYXdhaXQgYmFja2VuZEFwaS5zZXJ2aWNlLnByb2Nlc3NPbkZpbHRlckNoYW5nZWQoZXZlbnQsIGFyZ3MpO1xyXG5cclxuICAgIC8vIGVtaXQgYW4gb25GaWx0ZXJDaGFuZ2VkIGV2ZW50IHdoZW4gaXQncyBub3QgY2FsbGVkIGJ5IGEgY2xlYXIgZmlsdGVyXHJcbiAgICBpZiAoYXJncyAmJiAhYXJncy5jbGVhckZpbHRlclRyaWdnZXJlZCkge1xyXG4gICAgICB0aGlzLmVtaXRGaWx0ZXJDaGFuZ2VkKEVtaXR0ZXJUeXBlLnJlbW90ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGhlIHByb2Nlc3NlcyBjYW4gYmUgT2JzZXJ2YWJsZXMgKGxpa2UgSHR0cENsaWVudCkgb3IgUHJvbWlzZXNcclxuICAgIGNvbnN0IHByb2Nlc3MgPSBiYWNrZW5kQXBpLnByb2Nlc3MocXVlcnkpO1xyXG4gICAgaWYgKHByb2Nlc3MgaW5zdGFuY2VvZiBQcm9taXNlICYmIHByb2Nlc3MudGhlbikge1xyXG4gICAgICBwcm9jZXNzLnRoZW4oKHByb2Nlc3NSZXN1bHQ6IEdyYXBocWxSZXN1bHQgfCBhbnkpID0+IGV4ZWN1dGVCYWNrZW5kUHJvY2Vzc2VzQ2FsbGJhY2soc3RhcnRUaW1lLCBwcm9jZXNzUmVzdWx0LCBiYWNrZW5kQXBpLCB0aGlzLl9ncmlkT3B0aW9ucykpO1xyXG4gICAgfSBlbHNlIGlmIChpc09ic2VydmFibGUocHJvY2VzcykpIHtcclxuICAgICAgcHJvY2Vzcy5zdWJzY3JpYmUoXHJcbiAgICAgICAgKHByb2Nlc3NSZXN1bHQ6IEdyYXBocWxSZXN1bHQgfCBhbnkpID0+IGV4ZWN1dGVCYWNrZW5kUHJvY2Vzc2VzQ2FsbGJhY2soc3RhcnRUaW1lLCBwcm9jZXNzUmVzdWx0LCBiYWNrZW5kQXBpLCB0aGlzLl9ncmlkT3B0aW9ucyksXHJcbiAgICAgICAgKGVycm9yOiBhbnkpID0+IG9uQmFja2VuZEVycm9yKGVycm9yLCBiYWNrZW5kQXBpKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0YWNoIGEgbG9jYWwgZmlsdGVyIGhvb2sgdG8gdGhlIGdyaWRcclxuICAgKiBAcGFyYW0gZ3JpZCBTbGlja0dyaWQgR3JpZCBvYmplY3RcclxuICAgKiBAcGFyYW0gZGF0YVZpZXdcclxuICAgKi9cclxuICBhdHRhY2hMb2NhbE9uRmlsdGVyKGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSkge1xyXG4gICAgdGhpcy5fZmlsdGVycyA9IFtdO1xyXG4gICAgdGhpcy5fZGF0YVZpZXcgPSBkYXRhVmlldztcclxuICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlciA9IG5ldyBTbGljay5FdmVudCgpO1xyXG5cclxuICAgIGRhdGFWaWV3LnNldEZpbHRlckFyZ3MoeyBjb2x1bW5GaWx0ZXJzOiB0aGlzLl9jb2x1bW5GaWx0ZXJzLCBncmlkOiB0aGlzLl9ncmlkIH0pO1xyXG4gICAgZGF0YVZpZXcuc2V0RmlsdGVyKHRoaXMuY3VzdG9tTG9jYWxGaWx0ZXIuYmluZCh0aGlzLCBkYXRhVmlldykpO1xyXG5cclxuICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlci5zdWJzY3JpYmUoKGU6IEtleWJvYXJkRXZlbnQsIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBjb2x1bW5JZCA9IGFyZ3MuY29sdW1uSWQ7XHJcbiAgICAgIGlmIChjb2x1bW5JZCAhPSBudWxsKSB7XHJcbiAgICAgICAgZGF0YVZpZXcucmVmcmVzaCgpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGVtaXQgYW4gb25GaWx0ZXJDaGFuZ2VkIGV2ZW50IHdoZW4gaXQncyBub3QgY2FsbGVkIGJ5IGEgY2xlYXIgZmlsdGVyXHJcbiAgICAgIGlmIChhcmdzICYmICFhcmdzLmNsZWFyRmlsdGVyVHJpZ2dlcmVkKSB7XHJcbiAgICAgICAgdGhpcy5lbWl0RmlsdGVyQ2hhbmdlZChFbWl0dGVyVHlwZS5sb2NhbCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHN1YnNjcmliZSB0byBTbGlja0dyaWQgb25IZWFkZXJSb3dDZWxsUmVuZGVyZWQgZXZlbnQgdG8gY3JlYXRlIGZpbHRlciB0ZW1wbGF0ZVxyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShncmlkLm9uSGVhZGVyUm93Q2VsbFJlbmRlcmVkLCAoZTogS2V5Ym9hcmRFdmVudCwgYXJnczogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMuYWRkRmlsdGVyVGVtcGxhdGVUb0hlYWRlclJvdyhhcmdzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJGaWx0ZXJCeUNvbHVtbklkKGV2ZW50OiBFdmVudCwgY29sdW1uSWQ6IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgY29uc3QgY29sRmlsdGVyOiBGaWx0ZXIgPSB0aGlzLl9maWx0ZXJzLmZpbmQoKGZpbHRlcjogRmlsdGVyKSA9PiBmaWx0ZXIuY29sdW1uRGVmLmlkID09PSBjb2x1bW5JZCk7XHJcbiAgICBpZiAoY29sRmlsdGVyICYmIGNvbEZpbHRlci5jbGVhcikge1xyXG4gICAgICBjb2xGaWx0ZXIuY2xlYXIodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2UgbmVlZCB0byBsb29wIHRocm91Z2ggYWxsIGNvbHVtbkZpbHRlcnMgYW5kIGRlbGV0ZSB0aGUgZmlsdGVyIGZvdW5kXHJcbiAgICAvLyBvbmx5IHRyeWluZyB0byBjbGVhciBjb2x1bW5GaWx0ZXIgKHdpdGhvdXQgbG9vcGluZyB0aHJvdWdoKSB3b3VsZCBub3QgdHJpZ2dlciBhIGRhdGFzZXQgY2hhbmdlXHJcbiAgICBmb3IgKGNvbnN0IGNvbElkIGluIHRoaXMuX2NvbHVtbkZpbHRlcnMpIHtcclxuICAgICAgaWYgKGNvbElkID09PSBjb2x1bW5JZCAmJiB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbElkXSkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbElkXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBlbWl0dGVyOiBFbWl0dGVyVHlwZSA9IEVtaXR0ZXJUeXBlLmxvY2FsO1xyXG4gICAgY29uc3QgaXNCYWNrZW5kQXBpID0gdGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkgfHwgZmFsc2U7XHJcblxyXG4gICAgLy8gd2hlbiB1c2luZyBhIGJhY2tlbmQgc2VydmljZSwgd2UgbmVlZCB0byBtYW51YWxseSB0cmlnZ2VyIGEgZmlsdGVyIGNoYW5nZVxyXG4gICAgaWYgKGlzQmFja2VuZEFwaSkge1xyXG4gICAgICBlbWl0dGVyID0gRW1pdHRlclR5cGUucmVtb3RlO1xyXG4gICAgICB0aGlzLm9uQmFja2VuZEZpbHRlckNoYW5nZShldmVudCBhcyBLZXlib2FyZEV2ZW50LCB7IGdyaWQ6IHRoaXMuX2dyaWQsIGNvbHVtbkZpbHRlcnM6IHRoaXMuX2NvbHVtbkZpbHRlcnMgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZW1pdCBhbiBldmVudCB3aGVuIGZpbHRlciBpcyBjbGVhcmVkXHJcbiAgICB0aGlzLmVtaXRGaWx0ZXJDaGFuZ2VkKGVtaXR0ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqIENsZWFyIHRoZSBzZWFyY2ggZmlsdGVycyAoYmVsb3cgdGhlIGNvbHVtbiB0aXRsZXMpICovXHJcbiAgY2xlYXJGaWx0ZXJzKCkge1xyXG4gICAgdGhpcy5fZmlsdGVycy5mb3JFYWNoKChmaWx0ZXI6IEZpbHRlcikgPT4ge1xyXG4gICAgICBpZiAoZmlsdGVyICYmIGZpbHRlci5jbGVhcikge1xyXG4gICAgICAgIC8vIGNsZWFyIGVsZW1lbnQgYW5kIHRyaWdnZXIgYSBjaGFuZ2VcclxuICAgICAgICBmaWx0ZXIuY2xlYXIoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyB3ZSBuZWVkIHRvIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1uRmlsdGVycyBhbmQgZGVsZXRlIHRoZW0gMSBieSAxXHJcbiAgICAvLyBvbmx5IHRyeWluZyB0byBjbGVhciBjb2x1bW5GaWx0ZXIgKHdpdGhvdXQgbG9vcGluZyB0aHJvdWdoKSB3b3VsZCBub3QgdHJpZ2dlciBhIGRhdGFzZXQgY2hhbmdlXHJcbiAgICBmb3IgKGNvbnN0IGNvbHVtbklkIGluIHRoaXMuX2NvbHVtbkZpbHRlcnMpIHtcclxuICAgICAgaWYgKGNvbHVtbklkICYmIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uSWRdKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uSWRdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2UgYWxzbyBuZWVkIHRvIHJlZnJlc2ggdGhlIGRhdGFWaWV3IGFuZCBvcHRpb25hbGx5IHRoZSBncmlkIChpdCdzIG9wdGlvbmFsIHNpbmNlIHdlIHVzZSBEYXRhVmlldylcclxuICAgIGlmICh0aGlzLl9kYXRhVmlldyAmJiB0aGlzLl9ncmlkKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFWaWV3LnJlZnJlc2goKTtcclxuICAgICAgdGhpcy5fZ3JpZC5pbnZhbGlkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2hlbiB1c2luZyBiYWNrZW5kIHNlcnZpY2UsIHdlIG5lZWQgdG8gcXVlcnkgb25seSBvbmNlIHNvIGl0J3MgYmV0dGVyIHRvIGRvIGl0IGhlcmVcclxuICAgIGlmICh0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICBjb25zdCBjYWxsYmFja0FyZ3MgPSB7IGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiB0cnVlLCBzaG91bGRUcmlnZ2VyUXVlcnk6IHRydWUsIGdyaWQ6IHRoaXMuX2dyaWQsIGNvbHVtbkZpbHRlcnM6IHRoaXMuX2NvbHVtbkZpbHRlcnMgfTtcclxuICAgICAgdGhpcy5leGVjdXRlQmFja2VuZENhbGxiYWNrKHVuZGVmaW5lZCwgY2FsbGJhY2tBcmdzLCBuZXcgRGF0ZSgpLCB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZW1pdCBhbiBldmVudCB3aGVuIGZpbHRlcnMgYXJlIGFsbCBjbGVhcmVkXHJcbiAgICB0aGlzLm9uRmlsdGVyQ2xlYXJlZC5uZXh0KHRydWUpO1xyXG4gIH1cclxuXHJcbiAgY3VzdG9tTG9jYWxGaWx0ZXIoZGF0YVZpZXc6IGFueSwgaXRlbTogYW55LCBhcmdzOiBhbnkpIHtcclxuICAgIGZvciAoY29uc3QgY29sdW1uSWQgb2YgT2JqZWN0LmtleXMoYXJncy5jb2x1bW5GaWx0ZXJzKSkge1xyXG4gICAgICBjb25zdCBjb2x1bW5GaWx0ZXIgPSBhcmdzLmNvbHVtbkZpbHRlcnNbY29sdW1uSWRdO1xyXG4gICAgICBjb25zdCBjb2x1bW5JbmRleCA9IGFyZ3MuZ3JpZC5nZXRDb2x1bW5JbmRleChjb2x1bW5JZCk7XHJcbiAgICAgIGNvbnN0IGNvbHVtbkRlZiA9IGFyZ3MuZ3JpZC5nZXRDb2x1bW5zKClbY29sdW1uSW5kZXhdO1xyXG4gICAgICBpZiAoIWNvbHVtbkRlZikge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUm93IERldGFpbCBWaWV3IHBsdWdpbiwgaWYgdGhlIHJvdyBpcyBwYWRkaW5nIHdlIGp1c3QgZ2V0IHRoZSB2YWx1ZSB3ZSdyZSBmaWx0ZXJpbmcgb24gZnJvbSBpdCdzIHBhcmVudFxyXG4gICAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlUm93RGV0YWlsVmlldykge1xyXG4gICAgICAgIGNvbnN0IG1ldGFkYXRhUHJlZml4ID0gdGhpcy5fZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3LmtleVByZWZpeCB8fCAnX18nO1xyXG4gICAgICAgIGlmIChpdGVtW2Ake21ldGFkYXRhUHJlZml4fWlzUGFkZGluZ2BdICYmIGl0ZW1bYCR7bWV0YWRhdGFQcmVmaXh9cGFyZW50YF0pIHtcclxuICAgICAgICAgIGl0ZW0gPSBpdGVtW2Ake21ldGFkYXRhUHJlZml4fXBhcmVudGBdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZGF0YUtleSA9IGNvbHVtbkRlZi5kYXRhS2V5O1xyXG4gICAgICBjb25zdCBmaWVsZE5hbWUgPSBjb2x1bW5EZWYucXVlcnlGaWVsZCB8fCBjb2x1bW5EZWYucXVlcnlGaWVsZEZpbHRlciB8fCBjb2x1bW5EZWYuZmllbGQ7XHJcbiAgICAgIGNvbnN0IGZpZWxkVHlwZSA9IGNvbHVtbkRlZi50eXBlIHx8IEZpZWxkVHlwZS5zdHJpbmc7XHJcbiAgICAgIGNvbnN0IGZpbHRlclNlYXJjaFR5cGUgPSAoY29sdW1uRGVmLmZpbHRlclNlYXJjaFR5cGUpID8gY29sdW1uRGVmLmZpbHRlclNlYXJjaFR5cGUgOiBudWxsO1xyXG4gICAgICBsZXQgY2VsbFZhbHVlID0gaXRlbVtmaWVsZE5hbWVdO1xyXG5cclxuICAgICAgLy8gd2hlbiBpdGVtIGlzIGEgY29tcGxleCBvYmplY3QgKGRvdCBcIi5cIiBub3RhdGlvbiksIHdlIG5lZWQgdG8gZmlsdGVyIHRoZSB2YWx1ZSBjb250YWluZWQgaW4gdGhlIG9iamVjdCB0cmVlXHJcbiAgICAgIGlmIChmaWVsZE5hbWUuaW5kZXhPZignLicpID49IDApIHtcclxuICAgICAgICBjZWxsVmFsdWUgPSBnZXREZXNjZW5kYW50UHJvcGVydHkoaXRlbSwgZmllbGROYW1lKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaWYgd2UgZmluZCBzZWFyY2hUZXJtcyB1c2UgdGhlbSBidXQgbWFrZSBhIGRlZXAgY29weSBzbyB0aGF0IHdlIGRvbid0IGFmZmVjdCBvcmlnaW5hbCBhcnJheVxyXG4gICAgICAvLyB3ZSBtaWdodCBoYXZlIHRvIG92ZXJ3cml0ZSB0aGUgdmFsdWUocykgbG9jYWxseSB0aGF0IGFyZSByZXR1cm5lZFxyXG4gICAgICAvLyBlLmc6IHdlIGRvbid0IHdhbnQgdG8gb3BlcmF0b3Igd2l0aGluIHRoZSBzZWFyY2ggdmFsdWUsIHNpbmNlIGl0IHdpbGwgZmFpbCBmaWx0ZXIgY29uZGl0aW9uIGNoZWNrIHRyaWdnZXIgYWZ0ZXJ3YXJkXHJcbiAgICAgIGNvbnN0IHNlYXJjaFZhbHVlcyA9IChjb2x1bW5GaWx0ZXIgJiYgY29sdW1uRmlsdGVyLnNlYXJjaFRlcm1zKSA/ICQuZXh0ZW5kKHRydWUsIFtdLCBjb2x1bW5GaWx0ZXIuc2VhcmNoVGVybXMpIDogbnVsbDtcclxuXHJcbiAgICAgIGxldCBmaWVsZFNlYXJjaFZhbHVlID0gKEFycmF5LmlzQXJyYXkoc2VhcmNoVmFsdWVzKSAmJiBzZWFyY2hWYWx1ZXMubGVuZ3RoID09PSAxKSA/IHNlYXJjaFZhbHVlc1swXSA6ICcnO1xyXG5cclxuICAgICAgbGV0IG1hdGNoZXMgPSBudWxsO1xyXG4gICAgICBpZiAoZmllbGRUeXBlICE9PSBGaWVsZFR5cGUub2JqZWN0KSB7XHJcbiAgICAgICAgZmllbGRTZWFyY2hWYWx1ZSA9ICcnICsgZmllbGRTZWFyY2hWYWx1ZTsgLy8gbWFrZSBzdXJlIGl0J3MgYSBzdHJpbmdcclxuICAgICAgICBtYXRjaGVzID0gZmllbGRTZWFyY2hWYWx1ZS5tYXRjaCgvXihbPD4hPVxcKl17MCwyfSkoLipbXjw+IT1cXCpdKShbXFwqXT8pJC8pOyAvLyBncm91cCAxOiBPcGVyYXRvciwgMjogc2VhcmNoVmFsdWUsIDM6IGxhc3QgY2hhciBpcyAnKicgKG1lYW5pbmcgc3RhcnRzIHdpdGgsIGV4LjogYWJjKilcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IG9wZXJhdG9yID0gY29sdW1uRmlsdGVyLm9wZXJhdG9yIHx8ICgobWF0Y2hlcykgPyBtYXRjaGVzWzFdIDogJycpO1xyXG4gICAgICBjb25zdCBzZWFyY2hUZXJtID0gKCEhbWF0Y2hlcykgPyBtYXRjaGVzWzJdIDogJyc7XHJcbiAgICAgIGNvbnN0IGxhc3RWYWx1ZUNoYXIgPSAoISFtYXRjaGVzKSA/IG1hdGNoZXNbM10gOiAob3BlcmF0b3IgPT09ICcqeicgPyAnKicgOiAnJyk7XHJcblxyXG4gICAgICBpZiAoc2VhcmNoVmFsdWVzICYmIHNlYXJjaFZhbHVlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgZmllbGRTZWFyY2hWYWx1ZSA9IHNlYXJjaFZhbHVlcy5qb2luKCcsJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpZWxkU2VhcmNoVmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgLy8gZXNjYXBpbmcgdGhlIHNlYXJjaCB2YWx1ZVxyXG4gICAgICAgIGZpZWxkU2VhcmNoVmFsdWUgPSBmaWVsZFNlYXJjaFZhbHVlLnJlcGxhY2UoYCdgLCBgJydgKTsgLy8gZXNjYXBlIHNpbmdsZSBxdW90ZXMgYnkgZG91YmxpbmcgdGhlbVxyXG4gICAgICAgIGlmIChvcGVyYXRvciA9PT0gJyonIHx8IG9wZXJhdG9yID09PSAnYSonIHx8IG9wZXJhdG9yID09PSAnKnonIHx8IGxhc3RWYWx1ZUNoYXIgPT09ICcqJykge1xyXG4gICAgICAgICAgb3BlcmF0b3IgPSAob3BlcmF0b3IgPT09ICcqJyB8fCBvcGVyYXRvciA9PT0gJyp6JykgPyBPcGVyYXRvclR5cGUuZW5kc1dpdGggOiBPcGVyYXRvclR5cGUuc3RhcnRzV2l0aDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIG5vIG5lZWQgdG8gcXVlcnkgaWYgc2VhcmNoIHZhbHVlIGlzIGVtcHR5XHJcbiAgICAgIGlmIChzZWFyY2hUZXJtID09PSAnJyAmJiAoIXNlYXJjaFZhbHVlcyB8fCAoQXJyYXkuaXNBcnJheShzZWFyY2hWYWx1ZXMpICYmIHNlYXJjaFZhbHVlcy5sZW5ndGggPT09IDApKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBpZiBzZWFyY2ggdmFsdWUgaGFzIGEgcmVnZXggbWF0Y2ggd2Ugd2lsbCBvbmx5IGtlZXAgdGhlIHZhbHVlIHdpdGhvdXQgdGhlIG9wZXJhdG9yXHJcbiAgICAgIC8vIGluIHRoaXMgY2FzZSB3ZSBuZWVkIHRvIG92ZXJ3cml0ZSB0aGUgcmV0dXJuZWQgc2VhcmNoIHZhbHVlcyB0byB0cnVuY2F0ZSBvcGVyYXRvciBmcm9tIHRoZSBzdHJpbmcgc2VhcmNoXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG1hdGNoZXMpICYmIG1hdGNoZXMubGVuZ3RoID49IDEgJiYgKEFycmF5LmlzQXJyYXkoc2VhcmNoVmFsdWVzKSAmJiBzZWFyY2hWYWx1ZXMubGVuZ3RoID09PSAxKSkge1xyXG4gICAgICAgIHNlYXJjaFZhbHVlc1swXSA9IHNlYXJjaFRlcm07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGZpbHRlciBzZWFyY2ggdGVybXMgc2hvdWxkIGFsd2F5cyBiZSBzdHJpbmcgdHlwZSAoZXZlbiB0aG91Z2ggd2UgcGVybWl0IHRoZSBlbmQgdXNlciB0byBpbnB1dCBudW1iZXJzKVxyXG4gICAgICAvLyBzbyBtYWtlIHN1cmUgZWFjaCB0ZXJtIGFyZSBzdHJpbmdzLCBpZiB1c2VyIGhhcyBzb21lIGRlZmF1bHQgc2VhcmNoIHRlcm1zLCB3ZSB3aWxsIGNhc3QgdGhlbSB0byBzdHJpbmdcclxuICAgICAgaWYgKHNlYXJjaFZhbHVlcyAmJiBBcnJheS5pc0FycmF5KHNlYXJjaFZhbHVlcykgJiYgZmllbGRUeXBlICE9PSBGaWVsZFR5cGUub2JqZWN0KSB7XHJcbiAgICAgICAgZm9yIChsZXQgayA9IDAsIGxuID0gc2VhcmNoVmFsdWVzLmxlbmd0aDsgayA8IGxuOyBrKyspIHtcclxuICAgICAgICAgIC8vIG1ha2Ugc3VyZSBhbGwgc2VhcmNoIHRlcm1zIGFyZSBzdHJpbmdzXHJcbiAgICAgICAgICBzZWFyY2hWYWx1ZXNba10gPSAoKHNlYXJjaFZhbHVlc1trXSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFZhbHVlc1trXSA9PT0gbnVsbCkgPyAnJyA6IHNlYXJjaFZhbHVlc1trXSkgKyAnJztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHdoZW4gdXNpbmcgbG9jYWxpemF0aW9uIChpMThuKSwgd2Ugc2hvdWxkIHVzZSB0aGUgZm9ybWF0dGVyIG91dHB1dCB0byBzZWFyY2ggYXMgdGhlIG5ldyBjZWxsIHZhbHVlXHJcbiAgICAgIGlmIChjb2x1bW5EZWYgJiYgY29sdW1uRGVmLnBhcmFtcyAmJiBjb2x1bW5EZWYucGFyYW1zLnVzZUZvcm1hdHRlck91cHV0VG9GaWx0ZXIpIHtcclxuICAgICAgICBjb25zdCByb3dJbmRleCA9IChkYXRhVmlldyAmJiB0eXBlb2YgZGF0YVZpZXcuZ2V0SWR4QnlJZCA9PT0gJ2Z1bmN0aW9uJykgPyBkYXRhVmlldy5nZXRJZHhCeUlkKGl0ZW0uaWQpIDogMDtcclxuICAgICAgICBjZWxsVmFsdWUgPSBjb2x1bW5EZWYuZm9ybWF0dGVyKHJvd0luZGV4LCBjb2x1bW5JbmRleCwgY2VsbFZhbHVlLCBjb2x1bW5EZWYsIGl0ZW0sIHRoaXMuX2dyaWQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBtYWtlIHN1cmUgY2VsbCB2YWx1ZSBpcyBhbHdheXMgYSBzdHJpbmdcclxuICAgICAgaWYgKHR5cGVvZiBjZWxsVmFsdWUgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgY2VsbFZhbHVlID0gY2VsbFZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNvbmRpdGlvbk9wdGlvbnMgPSB7XHJcbiAgICAgICAgZGF0YUtleSxcclxuICAgICAgICBmaWVsZFR5cGUsXHJcbiAgICAgICAgc2VhcmNoVGVybXM6IHNlYXJjaFZhbHVlcyxcclxuICAgICAgICBjZWxsVmFsdWUsXHJcbiAgICAgICAgb3BlcmF0b3IsXHJcbiAgICAgICAgY2VsbFZhbHVlTGFzdENoYXI6IGxhc3RWYWx1ZUNoYXIsXHJcbiAgICAgICAgZmlsdGVyU2VhcmNoVHlwZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKCFGaWx0ZXJDb25kaXRpb25zLmV4ZWN1dGVNYXBwZWRDb25kaXRpb24oY29uZGl0aW9uT3B0aW9ucykpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICB0aGlzLmRpc3Bvc2VDb2x1bW5GaWx0ZXJzKCk7XHJcblxyXG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIFNsaWNrR3JpZCBldmVudHNcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCgpO1xyXG5cclxuICAgIC8vIHVuc3Vic2NyaWJlIGxvY2FsIGV2ZW50XHJcbiAgICBpZiAodGhpcy5fc2xpY2tTdWJzY3JpYmVyICYmIHR5cGVvZiB0aGlzLl9zbGlja1N1YnNjcmliZXIudW5zdWJzY3JpYmUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEaXNwb3NlIG9mIHRoZSBmaWx0ZXJzLCBzaW5jZSBpdCdzIGEgc2luZ2xldG9uLCB3ZSBkb24ndCB3YW50IHRvIGFmZmVjdCBvdGhlciBncmlkcyB3aXRoIHNhbWUgY29sdW1uc1xyXG4gICAqL1xyXG4gIGRpc3Bvc2VDb2x1bW5GaWx0ZXJzKCkge1xyXG4gICAgLy8gd2UgbmVlZCB0byBsb29wIHRocm91Z2ggYWxsIGNvbHVtbkZpbHRlcnMgYW5kIGRlbGV0ZSB0aGVtIDEgYnkgMVxyXG4gICAgLy8gb25seSB0cnlpbmcgdG8gbWFrZSBjb2x1bW5GaWx0ZXIgYW4gZW1wdHkgKHdpdGhvdXQgbG9vcGluZykgd291bGQgbm90IHRyaWdnZXIgYSBkYXRhc2V0IGNoYW5nZVxyXG4gICAgZm9yIChjb25zdCBjb2x1bW5JZCBpbiB0aGlzLl9jb2x1bW5GaWx0ZXJzKSB7XHJcbiAgICAgIGlmIChjb2x1bW5JZCAmJiB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbklkXSkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbklkXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGFsc28gZGVzdHJveSBlYWNoIEZpbHRlciBpbnN0YW5jZXNcclxuICAgIHRoaXMuX2ZpbHRlcnMuZm9yRWFjaCgoZmlsdGVyLCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAoZmlsdGVyICYmIGZpbHRlci5kZXN0cm95KSB7XHJcbiAgICAgICAgZmlsdGVyLmRlc3Ryb3kodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29sdW1uRmlsdGVycygpIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2x1bW5GaWx0ZXJzO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q3VycmVudExvY2FsRmlsdGVycygpOiBDdXJyZW50RmlsdGVyW10ge1xyXG4gICAgY29uc3QgY3VycmVudEZpbHRlcnM6IEN1cnJlbnRGaWx0ZXJbXSA9IFtdO1xyXG4gICAgaWYgKHRoaXMuX2NvbHVtbkZpbHRlcnMpIHtcclxuICAgICAgZm9yIChjb25zdCBjb2xJZCBvZiBPYmplY3Qua2V5cyh0aGlzLl9jb2x1bW5GaWx0ZXJzKSkge1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbkZpbHRlciA9IHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sSWRdO1xyXG4gICAgICAgIGNvbnN0IGZpbHRlciA9IHsgY29sdW1uSWQ6IGNvbElkIHx8ICcnIH0gYXMgQ3VycmVudEZpbHRlcjtcclxuXHJcbiAgICAgICAgaWYgKGNvbHVtbkZpbHRlciAmJiBjb2x1bW5GaWx0ZXIuc2VhcmNoVGVybXMpIHtcclxuICAgICAgICAgIGZpbHRlci5zZWFyY2hUZXJtcyA9IGNvbHVtbkZpbHRlci5zZWFyY2hUZXJtcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbHVtbkZpbHRlci5vcGVyYXRvcikge1xyXG4gICAgICAgICAgZmlsdGVyLm9wZXJhdG9yID0gY29sdW1uRmlsdGVyLm9wZXJhdG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXIuc2VhcmNoVGVybXMpICYmIGZpbHRlci5zZWFyY2hUZXJtcy5sZW5ndGggPiAwICYmIGZpbHRlci5zZWFyY2hUZXJtc1swXSAhPT0gJycpIHtcclxuICAgICAgICAgIGN1cnJlbnRGaWx0ZXJzLnB1c2goZmlsdGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjdXJyZW50RmlsdGVycztcclxuICB9XHJcblxyXG4gIGNhbGxiYWNrU2VhcmNoRXZlbnQoZTogS2V5Ym9hcmRFdmVudCB8IHVuZGVmaW5lZCwgYXJnczogRmlsdGVyQ2FsbGJhY2tBcmcpIHtcclxuICAgIGlmIChhcmdzKSB7XHJcbiAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSAoKGUgJiYgZS50YXJnZXQpID8gKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlIDogdW5kZWZpbmVkKTtcclxuICAgICAgY29uc3Qgc2VhcmNoVGVybXMgPSAoYXJncy5zZWFyY2hUZXJtcyAmJiBBcnJheS5pc0FycmF5KGFyZ3Muc2VhcmNoVGVybXMpKSA/IGFyZ3Muc2VhcmNoVGVybXMgOiAoc2VhcmNoVGVybSA/IFtzZWFyY2hUZXJtXSA6IHVuZGVmaW5lZCk7XHJcbiAgICAgIGNvbnN0IGNvbHVtbkRlZiA9IGFyZ3MuY29sdW1uRGVmIHx8IG51bGw7XHJcbiAgICAgIGNvbnN0IGNvbHVtbklkID0gY29sdW1uRGVmID8gKGNvbHVtbkRlZi5pZCB8fCAnJykgOiAnJztcclxuICAgICAgY29uc3Qgb3BlcmF0b3IgPSBhcmdzLm9wZXJhdG9yIHx8IHVuZGVmaW5lZDtcclxuICAgICAgY29uc3QgaGFzU2VhcmNoVGVybXMgPSBzZWFyY2hUZXJtcyAmJiBBcnJheS5pc0FycmF5KHNlYXJjaFRlcm1zKTtcclxuICAgICAgY29uc3QgdGVybXNDb3VudCA9IGhhc1NlYXJjaFRlcm1zICYmIHNlYXJjaFRlcm1zLmxlbmd0aDtcclxuICAgICAgY29uc3Qgb2xkQ29sdW1uRmlsdGVycyA9IHsgLi4udGhpcy5fY29sdW1uRmlsdGVycyB9O1xyXG5cclxuICAgICAgaWYgKCFoYXNTZWFyY2hUZXJtcyB8fCB0ZXJtc0NvdW50ID09PSAwIHx8ICh0ZXJtc0NvdW50ID09PSAxICYmIHNlYXJjaFRlcm1zWzBdID09PSAnJykpIHtcclxuICAgICAgICAvLyBkZWxldGUgdGhlIHByb3BlcnR5IGZyb20gdGhlIGNvbHVtbkZpbHRlcnMgd2hlbiBpdCBiZWNvbWVzIGVtcHR5XHJcbiAgICAgICAgLy8gd2l0aG91dCBkb2luZyB0aGlzLCBpdCB3b3VsZCBsZWF2ZSBhbiBpbmNvcnJlY3Qgc3RhdGUgb2YgdGhlIHByZXZpb3VzIGNvbHVtbiBmaWx0ZXJzIHdoZW4gZmlsdGVyaW5nIG9uIGFub3RoZXIgY29sdW1uXHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uSWRdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGNvbElkID0gJycgKyBjb2x1bW5JZCBhcyBzdHJpbmc7XHJcbiAgICAgICAgY29uc3QgY29sRmlsdGVyOiBDb2x1bW5GaWx0ZXIgPSB7XHJcbiAgICAgICAgICBjb2x1bW5JZDogY29sSWQsXHJcbiAgICAgICAgICBjb2x1bW5EZWYsXHJcbiAgICAgICAgICBzZWFyY2hUZXJtcyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChvcGVyYXRvcikge1xyXG4gICAgICAgICAgY29sRmlsdGVyLm9wZXJhdG9yID0gb3BlcmF0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sSWRdID0gY29sRmlsdGVyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB0cmlnZ2VyIGFuIGV2ZW50IG9ubHkgaWYgRmlsdGVycyBjaGFuZ2VkIG9yIGlmIEVOVEVSIGtleSB3YXMgcHJlc3NlZFxyXG4gICAgICBjb25zdCBldmVudEtleUNvZGUgPSBlICYmIGUua2V5Q29kZTtcclxuICAgICAgaWYgKGV2ZW50S2V5Q29kZSA9PT0gS2V5Q29kZS5FTlRFUiB8fCAhaXNlcXVhbChvbGRDb2x1bW5GaWx0ZXJzLCB0aGlzLl9jb2x1bW5GaWx0ZXJzKSkge1xyXG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHRoaXMuX3NsaWNrU3Vic2NyaWJlciwge1xyXG4gICAgICAgICAgY2xlYXJGaWx0ZXJUcmlnZ2VyZWQ6IGFyZ3MuY2xlYXJGaWx0ZXJUcmlnZ2VyZWQsXHJcbiAgICAgICAgICBzaG91bGRUcmlnZ2VyUXVlcnk6IGFyZ3Muc2hvdWxkVHJpZ2dlclF1ZXJ5LFxyXG4gICAgICAgICAgY29sdW1uSWQsXHJcbiAgICAgICAgICBjb2x1bW5EZWY6IGFyZ3MuY29sdW1uRGVmIHx8IG51bGwsXHJcbiAgICAgICAgICBjb2x1bW5GaWx0ZXJzOiB0aGlzLl9jb2x1bW5GaWx0ZXJzLFxyXG4gICAgICAgICAgb3BlcmF0b3IsXHJcbiAgICAgICAgICBzZWFyY2hUZXJtcyxcclxuICAgICAgICAgIHNlcnZpY2VPcHRpb25zOiB0aGlzLl9vbkZpbHRlckNoYW5nZWRPcHRpb25zLFxyXG4gICAgICAgICAgZ3JpZDogdGhpcy5fZ3JpZFxyXG4gICAgICAgIH0sIGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRGaWx0ZXJUZW1wbGF0ZVRvSGVhZGVyUm93KGFyZ3M6IHsgY29sdW1uOiBDb2x1bW47IGdyaWQ6IGFueTsgbm9kZTogYW55IH0sIGlzRmlsdGVyRmlyc3RSZW5kZXIgPSB0cnVlKSB7XHJcbiAgICBjb25zdCBjb2x1bW5EZWYgPSBhcmdzLmNvbHVtbjtcclxuICAgIGNvbnN0IGNvbHVtbklkID0gY29sdW1uRGVmLmlkIHx8ICcnO1xyXG5cclxuICAgIGlmIChjb2x1bW5EZWYgJiYgY29sdW1uSWQgIT09ICdzZWxlY3RvcicgJiYgY29sdW1uRGVmLmZpbHRlcmFibGUpIHtcclxuICAgICAgbGV0IHNlYXJjaFRlcm1zOiBTZWFyY2hUZXJtW10gfCB1bmRlZmluZWQ7XHJcbiAgICAgIGxldCBvcGVyYXRvcjogT3BlcmF0b3JTdHJpbmcgfCBPcGVyYXRvclR5cGU7XHJcbiAgICAgIGNvbnN0IGZpbHRlcjogRmlsdGVyIHwgdW5kZWZpbmVkID0gdGhpcy5maWx0ZXJGYWN0b3J5LmNyZWF0ZUZpbHRlcihhcmdzLmNvbHVtbi5maWx0ZXIpO1xyXG4gICAgICBvcGVyYXRvciA9IChjb2x1bW5EZWYgJiYgY29sdW1uRGVmLmZpbHRlciAmJiBjb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yKSB8fCAoZmlsdGVyICYmIGZpbHRlci5vcGVyYXRvcikgfHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgaWYgKHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uRGVmLmlkXSkge1xyXG4gICAgICAgIHNlYXJjaFRlcm1zID0gdGhpcy5fY29sdW1uRmlsdGVyc1tjb2x1bW5EZWYuaWRdLnNlYXJjaFRlcm1zIHx8IHVuZGVmaW5lZDtcclxuICAgICAgICBvcGVyYXRvciA9IHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uRGVmLmlkXS5vcGVyYXRvciB8fCB1bmRlZmluZWQ7XHJcbiAgICAgIH0gZWxzZSBpZiAoY29sdW1uRGVmLmZpbHRlcikge1xyXG4gICAgICAgIC8vIHdoZW4gaGlkaW5nL3Nob3dpbmcgKHdpdGggQ29sdW1uIFBpY2tlciBvciBHcmlkIE1lbnUpLCBpdCB3aWxsIHRyeSB0byByZS1jcmVhdGUgeWV0IGFnYWluIHRoZSBmaWx0ZXJzIChzaW5jZSBTbGlja0dyaWQgZG9lcyBhIHJlLXJlbmRlcilcclxuICAgICAgICAvLyBiZWNhdXNlIG9mIHRoYXQgd2UgbmVlZCB0byBmaXJzdCBnZXQgc2VhcmNoVGVybShzKSBmcm9tIHRoZSBjb2x1bW5GaWx0ZXJzICh0aGF0IGlzIHdoYXQgdGhlIHVzZXIgbGFzdCBlbnRlcmVkKVxyXG4gICAgICAgIHNlYXJjaFRlcm1zID0gY29sdW1uRGVmLmZpbHRlci5zZWFyY2hUZXJtcyB8fCB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb2x1bW5GaWx0ZXJzKHNlYXJjaFRlcm1zLCBjb2x1bW5EZWYsIG9wZXJhdG9yKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZmlsdGVyQXJndW1lbnRzOiBGaWx0ZXJBcmd1bWVudHMgPSB7XHJcbiAgICAgICAgZ3JpZDogdGhpcy5fZ3JpZCxcclxuICAgICAgICBvcGVyYXRvcixcclxuICAgICAgICBzZWFyY2hUZXJtcyxcclxuICAgICAgICBjb2x1bW5EZWYsXHJcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuY2FsbGJhY2tTZWFyY2hFdmVudC5iaW5kKHRoaXMpXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoZmlsdGVyKSB7XHJcbiAgICAgICAgZmlsdGVyLmluaXQoZmlsdGVyQXJndW1lbnRzLCBpc0ZpbHRlckZpcnN0UmVuZGVyKTtcclxuICAgICAgICBjb25zdCBmaWx0ZXJFeGlzdEluZGV4ID0gdGhpcy5fZmlsdGVycy5maW5kSW5kZXgoKGZpbHQpID0+IGZpbHRlci5jb2x1bW5EZWYubmFtZSA9PT0gZmlsdC5jb2x1bW5EZWYubmFtZSk7XHJcblxyXG4gICAgICAgIC8vIGFkZCB0byB0aGUgZmlsdGVycyBhcnJheXMgb3IgcmVwbGFjZSBpdCB3aGVuIGZvdW5kXHJcbiAgICAgICAgaWYgKGZpbHRlckV4aXN0SW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICB0aGlzLl9maWx0ZXJzLnB1c2goZmlsdGVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5fZmlsdGVyc1tmaWx0ZXJFeGlzdEluZGV4XSA9IGZpbHRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHdoZW4gaGlkaW5nL3Nob3dpbmcgKHdpdGggQ29sdW1uIFBpY2tlciBvciBHcmlkIE1lbnUpLCBpdCB3aWxsIHRyeSB0byByZS1jcmVhdGUgeWV0IGFnYWluIHRoZSBmaWx0ZXJzIChzaW5jZSBTbGlja0dyaWQgZG9lcyBhIHJlLXJlbmRlcilcclxuICAgICAgICAvLyB3ZSBuZWVkIHRvIGFsc28gc2V0IGFnYWluIHRoZSB2YWx1ZXMgaW4gdGhlIERPTSBlbGVtZW50cyBpZiB0aGUgdmFsdWVzIHdlcmUgc2V0IGJ5IGEgc2VhcmNoVGVybShzKVxyXG4gICAgICAgIGlmIChzZWFyY2hUZXJtcyAmJiBmaWx0ZXIuc2V0VmFsdWVzKSB7XHJcbiAgICAgICAgICBmaWx0ZXIuc2V0VmFsdWVzKHNlYXJjaFRlcm1zKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgc2ltcGxlIGZ1bmN0aW9uIHRoYXQgaXMgYXR0YWNoZWQgdG8gdGhlIHN1YnNjcmliZXIgYW5kIGVtaXQgYSBjaGFuZ2Ugd2hlbiB0aGUgZmlsdGVyIGlzIGNhbGxlZC5cclxuICAgKiBPdGhlciBzZXJ2aWNlcywgbGlrZSBQYWdpbmF0aW9uLCBjYW4gdGhlbiBzdWJzY3JpYmUgdG8gaXQuXHJcbiAgICogQHBhcmFtIGNhbGxlclxyXG4gICAqL1xyXG4gIGVtaXRGaWx0ZXJDaGFuZ2VkKGNhbGxlcjogRW1pdHRlclR5cGUpIHtcclxuICAgIGlmIChjYWxsZXIgPT09IEVtaXR0ZXJUeXBlLnJlbW90ZSAmJiB0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICBsZXQgY3VycmVudEZpbHRlcnM6IEN1cnJlbnRGaWx0ZXJbXSA9IFtdO1xyXG4gICAgICBjb25zdCBiYWNrZW5kU2VydmljZSA9IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpLnNlcnZpY2U7XHJcbiAgICAgIGlmIChiYWNrZW5kU2VydmljZSAmJiBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50RmlsdGVycykge1xyXG4gICAgICAgIGN1cnJlbnRGaWx0ZXJzID0gYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudEZpbHRlcnMoKSBhcyBDdXJyZW50RmlsdGVyW107XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5vbkZpbHRlckNoYW5nZWQubmV4dChjdXJyZW50RmlsdGVycyk7XHJcbiAgICB9IGVsc2UgaWYgKGNhbGxlciA9PT0gRW1pdHRlclR5cGUubG9jYWwpIHtcclxuICAgICAgdGhpcy5vbkZpbHRlckNoYW5nZWQubmV4dCh0aGlzLmdldEN1cnJlbnRMb2NhbEZpbHRlcnMoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHVzZXIgcGFzc2VzIGFuIGFycmF5IG9mIHByZXNldCBmaWx0ZXJzLCB3ZSBuZWVkIHRvIHByZS1wb3B1bGF0ZSBlYWNoIGNvbHVtbiBmaWx0ZXIgc2VhcmNoVGVybShzKVxyXG4gICAqIFRoZSBwcm9jZXNzIGlzIHRvIGxvb3AgdGhyb3VnaCB0aGUgcHJlc2V0IGZpbHRlcnMgYXJyYXksIGZpbmQgdGhlIGFzc29jaWF0ZWQgY29sdW1uIGZyb20gY29sdW1uRGVmaW5pdGlvbnMgYW5kIGZpbGwgaW4gdGhlIGZpbHRlciBvYmplY3Qgc2VhcmNoVGVybShzKVxyXG4gICAqIFRoaXMgaXMgYmFzaWNhbGx5IHRoZSBzYW1lIGFzIGlmIHdlIHdvdWxkIG1hbnVhbGx5IGFkZCBzZWFyY2hUZXJtKHMpIHRvIGEgY29sdW1uIGZpbHRlciBvYmplY3QgaW4gdGhlIGNvbHVtbiBkZWZpbml0aW9uLCBidXQgd2UgZG8gaXQgcHJvZ3JhbW1hdGljYWxseS5cclxuICAgKiBBdCB0aGUgZW5kIG9mIHRoZSBkYXksIHdoZW4gY3JlYXRpbmcgdGhlIEZpbHRlciAoRE9NIEVsZW1lbnQpLCBpdCB3aWxsIHVzZSB0aGVzZSBzZWFyY2hUZXJtKHMpIHNvIHdlIGNhbiB0YWtlIGFkdmFudGFnZSBvZiB0aGF0IHdpdGhvdXQgcmVjb2RpbmcgZWFjaCBGaWx0ZXIgdHlwZSAoRE9NIGVsZW1lbnQpXHJcbiAgICovXHJcbiAgcG9wdWxhdGVDb2x1bW5GaWx0ZXJTZWFyY2hUZXJtcygpIHtcclxuICAgIGlmICh0aGlzLl9ncmlkT3B0aW9ucy5wcmVzZXRzICYmIEFycmF5LmlzQXJyYXkodGhpcy5fZ3JpZE9wdGlvbnMucHJlc2V0cy5maWx0ZXJzKSAmJiB0aGlzLl9ncmlkT3B0aW9ucy5wcmVzZXRzLmZpbHRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBmaWx0ZXJzID0gdGhpcy5fZ3JpZE9wdGlvbnMucHJlc2V0cy5maWx0ZXJzO1xyXG4gICAgICB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5mb3JFYWNoKChjb2x1bW5EZWY6IENvbHVtbikgPT4ge1xyXG4gICAgICAgIC8vIGNsZWFyIGFueSBjb2x1bW5EZWYgc2VhcmNoVGVybXMgYmVmb3JlIGFwcGx5aW5nIFByZXNldHNcclxuICAgICAgICBpZiAoY29sdW1uRGVmLmZpbHRlciAmJiBjb2x1bW5EZWYuZmlsdGVyLnNlYXJjaFRlcm1zKSB7XHJcbiAgICAgICAgICBkZWxldGUgY29sdW1uRGVmLmZpbHRlci5zZWFyY2hUZXJtcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGZyb20gZWFjaCBwcmVzZXRzLCB3ZSB3aWxsIGZpbmQgdGhlIGFzc29jaWF0ZWQgY29sdW1uRGVmIGFuZCBhcHBseSB0aGUgcHJlc2V0IHNlYXJjaFRlcm1zICYgb3BlcmF0b3IgaWYgdGhlcmUgaXNcclxuICAgICAgICBjb25zdCBjb2x1bW5QcmVzZXQgPSBmaWx0ZXJzLmZpbmQoKHByZXNldEZpbHRlcjogQ3VycmVudEZpbHRlcikgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHByZXNldEZpbHRlci5jb2x1bW5JZCA9PT0gY29sdW1uRGVmLmlkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChjb2x1bW5QcmVzZXQgJiYgY29sdW1uUHJlc2V0LnNlYXJjaFRlcm1zICYmIEFycmF5LmlzQXJyYXkoY29sdW1uUHJlc2V0LnNlYXJjaFRlcm1zKSkge1xyXG4gICAgICAgICAgY29sdW1uRGVmLmZpbHRlciA9IGNvbHVtbkRlZi5maWx0ZXIgfHwge307XHJcbiAgICAgICAgICBjb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yID0gY29sdW1uUHJlc2V0Lm9wZXJhdG9yIHx8IGNvbHVtbkRlZi5maWx0ZXIub3BlcmF0b3IgfHwgJyc7XHJcbiAgICAgICAgICBjb2x1bW5EZWYuZmlsdGVyLnNlYXJjaFRlcm1zID0gY29sdW1uUHJlc2V0LnNlYXJjaFRlcm1zO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZUNvbHVtbkZpbHRlcnMoc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXSB8IHVuZGVmaW5lZCwgY29sdW1uRGVmOiBhbnksIG9wZXJhdG9yPzogT3BlcmF0b3JUeXBlIHwgT3BlcmF0b3JTdHJpbmcpIHtcclxuICAgIGlmIChzZWFyY2hUZXJtcyAmJiBjb2x1bW5EZWYpIHtcclxuICAgICAgLy8gdGhpcy5fY29sdW1uRmlsdGVycy5zZWFyY2hUZXJtcyA9IHNlYXJjaFRlcm1zO1xyXG4gICAgICB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbkRlZi5pZF0gPSB7XHJcbiAgICAgICAgY29sdW1uSWQ6IGNvbHVtbkRlZi5pZCxcclxuICAgICAgICBjb2x1bW5EZWYsXHJcbiAgICAgICAgc2VhcmNoVGVybXMsXHJcbiAgICAgICAgb3BlcmF0b3JcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJpZ2dlckV2ZW50KHNsaWNrRXZlbnQ6IGFueSwgYXJnczogYW55LCBlOiBhbnkpIHtcclxuICAgIHNsaWNrRXZlbnQgPSBzbGlja0V2ZW50IHx8IG5ldyBTbGljay5FdmVudCgpO1xyXG5cclxuICAgIC8vIGV2ZW50IG1pZ2h0IGhhdmUgYmVlbiBjcmVhdGVkIGFzIGEgQ3VzdG9tRXZlbnQgKGUuZy4gQ29tcG91bmREYXRlRmlsdGVyKSwgd2l0aG91dCBiZWluZyBhIHZhbGlkIFNsaWNrLkV2ZW50RGF0YS5cclxuICAgIC8vIGlmIHNvIHdlIHdpbGwgY3JlYXRlIGEgbmV3IFNsaWNrLkV2ZW50RGF0YSBhbmQgbWVyZ2UgaXQgd2l0aCB0aGF0IEN1c3RvbUV2ZW50IHRvIGF2b2lkIGhhdmluZyBTbGlja0dyaWQgZXJyb3JzXHJcbiAgICBsZXQgZXZlbnQgPSBlO1xyXG4gICAgaWYgKGUgJiYgdHlwZW9mIGUuaXNQcm9wYWdhdGlvblN0b3BwZWQgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgZXZlbnQgPSAkLmV4dGVuZCh7fSwgbmV3IFNsaWNrLkV2ZW50RGF0YSgpLCBlKTtcclxuICAgIH1cclxuICAgIHNsaWNrRXZlbnQubm90aWZ5KGFyZ3MsIGV2ZW50LCBhcmdzLmdyaWQpO1xyXG4gIH1cclxufVxyXG4iXX0=