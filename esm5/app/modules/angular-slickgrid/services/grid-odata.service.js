/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import './global-utilities';
import { parseUtcDate } from './utilities';
import { Injectable } from '@angular/core';
import { CaseType, FieldType, SortDirection } from './../models/index';
import { OdataService } from './odata.service';
/** @type {?} */
var DEFAULT_ITEMS_PER_PAGE = 25;
/** @type {?} */
var DEFAULT_PAGE_SIZE = 20;
var GridOdataService = /** @class */ (function () {
    function GridOdataService() {
        this._currentFilters = [];
        this._currentSorters = [];
        this.defaultOptions = {
            top: DEFAULT_ITEMS_PER_PAGE,
            orderBy: '',
            caseType: CaseType.pascalCase
        };
        this.odataService = new OdataService();
    }
    Object.defineProperty(GridOdataService.prototype, "_gridOptions", {
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
     * @return {?}
     */
    GridOdataService.prototype.buildQuery = /**
     * @return {?}
     */
    function () {
        return this.odataService.buildQuery();
    };
    /**
     * @return {?}
     */
    GridOdataService.prototype.clearFilters = /**
     * @return {?}
     */
    function () {
        this._currentFilters = [];
        this.updateOptions({ filteringOptions: [] });
    };
    /**
     * @return {?}
     */
    GridOdataService.prototype.clearSorters = /**
     * @return {?}
     */
    function () {
        this._currentSorters = [];
        this.updateOptions({ sortingOptions: [] });
    };
    /**
     * @param {?} options
     * @param {?=} pagination
     * @param {?=} grid
     * @return {?}
     */
    GridOdataService.prototype.init = /**
     * @param {?} options
     * @param {?=} pagination
     * @param {?=} grid
     * @return {?}
     */
    function (options, pagination, grid) {
        this._grid = grid;
        /** @type {?} */
        var mergedOptions = tslib_1.__assign({}, this.defaultOptions, options);
        if (pagination && pagination.pageSize) {
            mergedOptions.top = pagination.pageSize;
        }
        this.odataService.options = tslib_1.__assign({}, mergedOptions, { top: mergedOptions.top || this.defaultOptions.top });
        this.options = this.odataService.options;
        this.pagination = pagination;
        // save current pagination as Page 1 and page size as "top"
        this._currentPagination = {
            pageNumber: 1,
            pageSize: this.odataService.options.top || this.defaultOptions.top
        };
        if (grid && grid.getColumns) {
            this._columnDefinitions = (options && options.columnDefinitions) || grid.getColumns();
            this._columnDefinitions = this._columnDefinitions.filter((/**
             * @param {?} column
             * @return {?}
             */
            function (column) { return !column.excludeFromQuery; }));
        }
    };
    /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    GridOdataService.prototype.updateOptions = /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    function (serviceOptions) {
        this.options = tslib_1.__assign({}, this.options, serviceOptions);
    };
    /**
     * @param {?} fieldName
     * @return {?}
     */
    GridOdataService.prototype.removeColumnFilter = /**
     * @param {?} fieldName
     * @return {?}
     */
    function (fieldName) {
        this.odataService.removeColumnFilter(fieldName);
    };
    /** Get the Filters that are currently used by the grid */
    /**
     * Get the Filters that are currently used by the grid
     * @return {?}
     */
    GridOdataService.prototype.getCurrentFilters = /**
     * Get the Filters that are currently used by the grid
     * @return {?}
     */
    function () {
        return this._currentFilters;
    };
    /** Get the Pagination that is currently used by the grid */
    /**
     * Get the Pagination that is currently used by the grid
     * @return {?}
     */
    GridOdataService.prototype.getCurrentPagination = /**
     * Get the Pagination that is currently used by the grid
     * @return {?}
     */
    function () {
        return this._currentPagination;
    };
    /** Get the Sorters that are currently used by the grid */
    /**
     * Get the Sorters that are currently used by the grid
     * @return {?}
     */
    GridOdataService.prototype.getCurrentSorters = /**
     * Get the Sorters that are currently used by the grid
     * @return {?}
     */
    function () {
        return this._currentSorters;
    };
    /*
     * Reset the pagination options
     */
    /*
       * Reset the pagination options
       */
    /**
     * @return {?}
     */
    GridOdataService.prototype.resetPaginationOptions = /*
       * Reset the pagination options
       */
    /**
     * @return {?}
     */
    function () {
        this.odataService.updateOptions({
            skip: 0
        });
    };
    /**
     * @param {?} fieldName
     * @param {?} value
     * @param {?=} terms
     * @return {?}
     */
    GridOdataService.prototype.saveColumnFilter = /**
     * @param {?} fieldName
     * @param {?} value
     * @param {?=} terms
     * @return {?}
     */
    function (fieldName, value, terms) {
        this.odataService.saveColumnFilter(fieldName, value, terms);
    };
    /*
     * FILTERING
     */
    /*
       * FILTERING
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    GridOdataService.prototype.processOnFilterChanged = /*
       * FILTERING
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    function (event, args) {
        var _this = this;
        /** @type {?} */
        var serviceOptions = args.grid.getOptions();
        /** @type {?} */
        var backendApi = serviceOptions.backendServiceApi;
        if (backendApi === undefined) {
            throw new Error('Something went wrong in the GridOdataService, "backendServiceApi" is not initialized');
        }
        // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
        this._currentFilters = this.castFilterToColumnFilter(args.columnFilters);
        /** @type {?} */
        var promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            // loop through all columns to inspect filters & set the query
            _this.updateFilters(args.columnFilters);
            _this.resetPaginationOptions();
            resolve(_this.odataService.buildQuery());
        }));
        return promise;
    };
    /*
     * PAGINATION
     */
    /*
       * PAGINATION
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    GridOdataService.prototype.processOnPaginationChanged = /*
       * PAGINATION
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    function (event, args) {
        /** @type {?} */
        var pageSize = +(args.pageSize || DEFAULT_PAGE_SIZE);
        this.updatePagination(args.newPage, pageSize);
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    };
    /*
     * SORTING
     */
    /*
       * SORTING
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    GridOdataService.prototype.processOnSortChanged = /*
       * SORTING
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    function (event, args) {
        /** @type {?} */
        var sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });
        // loop through all columns to inspect sorters & set the query
        this.updateSorters(sortColumns);
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    };
    /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param columnFilters
     */
    /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param {?} columnFilters
     * @param {?=} isUpdatedByPreset
     * @return {?}
     */
    GridOdataService.prototype.updateFilters = /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param {?} columnFilters
     * @param {?=} isUpdatedByPreset
     * @return {?}
     */
    function (columnFilters, isUpdatedByPreset) {
        /** @type {?} */
        var searchBy = '';
        /** @type {?} */
        var searchByArray = [];
        // on filter preset load, we need to keep current filters
        if (isUpdatedByPreset) {
            this._currentFilters = this.castFilterToColumnFilter(columnFilters);
        }
        var _loop_1 = function (columnId) {
            if (columnFilters.hasOwnProperty(columnId)) {
                /** @type {?} */
                var columnFilter_1 = columnFilters[columnId];
                // if user defined some "presets", then we need to find the filters from the column definitions instead
                /** @type {?} */
                var columnDef = void 0;
                if (isUpdatedByPreset && Array.isArray(this_1._columnDefinitions)) {
                    columnDef = this_1._columnDefinitions.find((/**
                     * @param {?} column
                     * @return {?}
                     */
                    function (column) {
                        return column.id === columnFilter_1.columnId;
                    }));
                }
                else {
                    columnDef = columnFilter_1.columnDef;
                }
                if (!columnDef) {
                    throw new Error('[Backend Service API]: Something went wrong in trying to get the column definition of the specified filter (or preset filters). Did you make a typo on the filter columnId?');
                }
                /** @type {?} */
                var fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field || columnDef.name || '';
                /** @type {?} */
                var fieldType = columnDef.type || 'string';
                /** @type {?} */
                var searchTerms = (columnFilter_1 ? columnFilter_1.searchTerms : null) || [];
                /** @type {?} */
                var fieldSearchValue = (Array.isArray(searchTerms) && searchTerms.length === 1) ? searchTerms[0] : '';
                if (typeof fieldSearchValue === 'undefined') {
                    fieldSearchValue = '';
                }
                if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                    throw new Error("ODdata filter searchTerm property must be provided as type \"string\", if you use filter with options then make sure your IDs are also string. For example: filter: {model: Filters.select, collection: [{ id: \"0\", value: \"0\" }, { id: \"1\", value: \"1\" }]");
                }
                fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                // make sure it's a string
                /** @type {?} */
                var matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/);
                // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                /** @type {?} */
                var operator = columnFilter_1.operator || ((matches) ? matches[1] : '');
                /** @type {?} */
                var searchValue = (!!matches) ? matches[2] : '';
                /** @type {?} */
                var lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                /** @type {?} */
                var bypassOdataQuery = columnFilter_1.bypassBackendQuery || false;
                // no need to query if search value is empty
                if (fieldName && searchValue === '' && searchTerms.length === 0) {
                    this_1.removeColumnFilter(fieldName);
                    return "continue";
                }
                // escaping the search value
                searchValue = searchValue.replace("'", "''"); // escape single quotes by doubling them
                searchValue = encodeURIComponent(searchValue); // encode URI of the final search value
                // extra query arguments
                if (bypassOdataQuery) {
                    // push to our temp array and also trim white spaces
                    if (fieldName) {
                        this_1.saveColumnFilter(fieldName, fieldSearchValue, searchTerms);
                    }
                }
                else {
                    searchBy = '';
                    // titleCase the fieldName so that it matches the WebApi names
                    if (this_1.odataService.options.caseType === CaseType.pascalCase) {
                        fieldName = String.titleCase(fieldName || '');
                    }
                    // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
                    if (searchTerms && searchTerms.length > 1) {
                        /** @type {?} */
                        var tmpSearchTerms = [];
                        if (operator === 'IN') {
                            // example:: (Stage eq "Expired" or Stage eq "Renewal")
                            for (var j = 0, lnj = searchTerms.length; j < lnj; j++) {
                                tmpSearchTerms.push(fieldName + " eq '" + searchTerms[j] + "'");
                            }
                            searchBy = tmpSearchTerms.join(' or ');
                            searchBy = "(" + searchBy + ")";
                        }
                        else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
                            // example:: (Stage ne "Expired" and Stage ne "Renewal")
                            for (var k = 0, lnk = searchTerms.length; k < lnk; k++) {
                                tmpSearchTerms.push(fieldName + " ne '" + searchTerms[k] + "'");
                            }
                            searchBy = tmpSearchTerms.join(' and ');
                            searchBy = "(" + searchBy + ")";
                        }
                    }
                    else if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar !== '') {
                        // first/last character is a '*' will be a startsWith or endsWith
                        searchBy = (operator === '*' || operator === '*z')
                            ? "endswith(" + fieldName + ", '" + searchValue + "')"
                            : "startswith(" + fieldName + ", '" + searchValue + "')";
                    }
                    else if (fieldType === FieldType.date) {
                        // date field needs to be UTC and within DateTime function
                        /** @type {?} */
                        var dateFormatted = parseUtcDate(searchValue, true);
                        if (dateFormatted) {
                            searchBy = fieldName + " " + this_1.mapOdataOperator(operator) + " DateTime'" + dateFormatted + "'";
                        }
                    }
                    else if (fieldType === FieldType.string) {
                        // string field needs to be in single quotes
                        if (operator === '') {
                            searchBy = "substringof('" + searchValue + "', " + fieldName + ")";
                        }
                        else {
                            // searchBy = `substringof('${searchValue}', ${fieldNameCased}) ${this.mapOdataOperator(operator)} true`;
                            searchBy = fieldName + " " + this_1.mapOdataOperator(operator) + " '" + searchValue + "'";
                        }
                    }
                    else {
                        // any other field type (or undefined type)
                        searchValue = fieldType === FieldType.number ? searchValue : "'" + searchValue + "'";
                        searchBy = fieldName + " " + this_1.mapOdataOperator(operator) + " " + searchValue;
                    }
                    // push to our temp array and also trim white spaces
                    if (searchBy !== '') {
                        searchByArray.push(String.trim(searchBy));
                        this_1.saveColumnFilter(fieldName || '', fieldSearchValue, searchTerms);
                    }
                }
            }
        };
        var this_1 = this;
        // loop through all columns to inspect filters
        for (var columnId in columnFilters) {
            _loop_1(columnId);
        }
        // update the service options with filters for the buildQuery() to work later
        this.odataService.updateOptions({
            filter: (searchByArray.length > 0) ? searchByArray.join(' and ') : '',
            skip: undefined
        });
    };
    /**
     * Update the pagination component with it's new page number and size
     * @param newPage
     * @param pageSize
     */
    /**
     * Update the pagination component with it's new page number and size
     * @param {?} newPage
     * @param {?} pageSize
     * @return {?}
     */
    GridOdataService.prototype.updatePagination = /**
     * Update the pagination component with it's new page number and size
     * @param {?} newPage
     * @param {?} pageSize
     * @return {?}
     */
    function (newPage, pageSize) {
        this._currentPagination = {
            pageNumber: newPage,
            pageSize: pageSize
        };
        this.odataService.updateOptions({
            top: pageSize,
            skip: (newPage - 1) * pageSize
        });
    };
    /**
     * loop through all columns to inspect sorters & update backend service orderBy
     * @param columnFilters
     */
    /**
     * loop through all columns to inspect sorters & update backend service orderBy
     * @param {?=} sortColumns
     * @param {?=} presetSorters
     * @return {?}
     */
    GridOdataService.prototype.updateSorters = /**
     * loop through all columns to inspect sorters & update backend service orderBy
     * @param {?=} sortColumns
     * @param {?=} presetSorters
     * @return {?}
     */
    function (sortColumns, presetSorters) {
        var _this = this;
        var e_1, _a;
        /** @type {?} */
        var sortByArray = [];
        /** @type {?} */
        var sorterArray = [];
        if (!sortColumns && presetSorters) {
            // make the presets the current sorters, also make sure that all direction are in lowercase for OData
            sortByArray = presetSorters;
            sortByArray.forEach((/**
             * @param {?} sorter
             * @return {?}
             */
            function (sorter) { return sorter.direction = (/** @type {?} */ (sorter.direction.toLowerCase())); }));
            // display the correct sorting icons on the UI, for that it requires (columnId, sortAsc) properties
            /** @type {?} */
            var tmpSorterArray = sortByArray.map((/**
             * @param {?} sorter
             * @return {?}
             */
            function (sorter) {
                /** @type {?} */
                var columnDef = _this._columnDefinitions.find((/**
                 * @param {?} column
                 * @return {?}
                 */
                function (column) { return column.id === sorter.columnId; }));
                sorterArray.push({
                    columnId: columnDef ? ((columnDef.queryField || columnDef.queryFieldSorter || columnDef.field || columnDef.id) + '') : (sorter.columnId + ''),
                    direction: sorter.direction
                });
                // return only the column(s) found in the Column Definitions ELSE null
                if (columnDef) {
                    return {
                        columnId: sorter.columnId,
                        sortAsc: sorter.direction.toUpperCase() === SortDirection.ASC
                    };
                }
                return null;
            }));
            this._grid.setSortColumns(tmpSorterArray);
        }
        else if (sortColumns && !presetSorters) {
            // build the SortBy string, it could be multisort, example: customerNo asc, purchaserName desc
            if (sortColumns && sortColumns.length === 0) {
                sortByArray = new Array(this.defaultOptions.orderBy); // when empty, use the default sort
            }
            else {
                if (sortColumns) {
                    try {
                        for (var sortColumns_1 = tslib_1.__values(sortColumns), sortColumns_1_1 = sortColumns_1.next(); !sortColumns_1_1.done; sortColumns_1_1 = sortColumns_1.next()) {
                            var columnDef = sortColumns_1_1.value;
                            if (columnDef.sortCol) {
                                /** @type {?} */
                                var fieldName = (columnDef.sortCol.queryField || columnDef.sortCol.queryFieldSorter || columnDef.sortCol.field || columnDef.sortCol.id) + '';
                                /** @type {?} */
                                var columnFieldName = (columnDef.sortCol.field || columnDef.sortCol.id) + '';
                                if (this.odataService.options.caseType === CaseType.pascalCase) {
                                    fieldName = String.titleCase(fieldName);
                                    columnFieldName = String.titleCase(columnFieldName);
                                }
                                sorterArray.push({
                                    columnId: columnFieldName,
                                    direction: columnDef.sortAsc ? 'asc' : 'desc'
                                });
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (sortColumns_1_1 && !sortColumns_1_1.done && (_a = sortColumns_1.return)) _a.call(sortColumns_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    sortByArray = sorterArray;
                }
            }
        }
        // transform the sortby array into a CSV string for OData
        sortByArray = sortByArray || (/** @type {?} */ ([]));
        /** @type {?} */
        var csvString = sortByArray.map((/**
         * @param {?} sorter
         * @return {?}
         */
        function (sorter) {
            if (sorter && sorter.columnId) {
                return sorter.columnId + " " + (sorter && sorter.direction && sorter.direction.toLowerCase() || '');
            }
            return '';
        })).join(',');
        this.odataService.updateOptions({
            orderBy: (this.odataService.options.caseType === CaseType.pascalCase) ? String.titleCase(csvString) : csvString
        });
        // keep current Sorters and update the service options with the new sorting
        this._currentSorters = (/** @type {?} */ (sortByArray));
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    };
    //
    // private functions
    // -------------------
    /**
     * Cast provided filters (could be in multiple format) into an array of ColumnFilter
     * @param columnFilters
     */
    //
    // private functions
    // -------------------
    /**
     * Cast provided filters (could be in multiple format) into an array of ColumnFilter
     * @private
     * @param {?} columnFilters
     * @return {?}
     */
    GridOdataService.prototype.castFilterToColumnFilter = 
    //
    // private functions
    // -------------------
    /**
     * Cast provided filters (could be in multiple format) into an array of ColumnFilter
     * @private
     * @param {?} columnFilters
     * @return {?}
     */
    function (columnFilters) {
        // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
        /** @type {?} */
        var filtersArray = (/** @type {?} */ (((typeof columnFilters === 'object') ? Object.keys(columnFilters).map((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return columnFilters[key]; })) : columnFilters)));
        return filtersArray.map((/**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            /** @type {?} */
            var columnDef = filter.columnDef;
            /** @type {?} */
            var tmpFilter = { columnId: filter.columnId || '' };
            if (filter.operator) {
                tmpFilter.operator = filter.operator;
            }
            if (Array.isArray(filter.searchTerms)) {
                tmpFilter.searchTerms = filter.searchTerms;
            }
            return tmpFilter;
        }));
    };
    /**
     * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
     * @param string operator
     * @returns string map
     */
    /**
     * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
     * @private
     * @param {?} operator
     * @return {?} string map
     */
    GridOdataService.prototype.mapOdataOperator = /**
     * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
     * @private
     * @param {?} operator
     * @return {?} string map
     */
    function (operator) {
        /** @type {?} */
        var map = '';
        switch (operator) {
            case '<':
                map = 'lt';
                break;
            case '<=':
                map = 'le';
                break;
            case '>':
                map = 'gt';
                break;
            case '>=':
                map = 'ge';
                break;
            case '<>':
            case '!=':
                map = 'ne';
                break;
            case '=':
            case '==':
            default:
                map = 'eq';
                break;
        }
        return map;
    };
    GridOdataService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GridOdataService.ctorParameters = function () { return []; };
    return GridOdataService;
}());
export { GridOdataService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GridOdataService.prototype._currentFilters;
    /**
     * @type {?}
     * @private
     */
    GridOdataService.prototype._currentPagination;
    /**
     * @type {?}
     * @private
     */
    GridOdataService.prototype._currentSorters;
    /**
     * @type {?}
     * @private
     */
    GridOdataService.prototype._columnDefinitions;
    /**
     * @type {?}
     * @private
     */
    GridOdataService.prototype._grid;
    /** @type {?} */
    GridOdataService.prototype.odataService;
    /** @type {?} */
    GridOdataService.prototype.options;
    /** @type {?} */
    GridOdataService.prototype.pagination;
    /** @type {?} */
    GridOdataService.prototype.defaultOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1vZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9ncmlkLW9kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBRUwsUUFBUSxFQVNSLFNBQVMsRUFNVCxhQUFhLEVBRWQsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0lBRXpDLHNCQUFzQixHQUFHLEVBQUU7O0lBQzNCLGlCQUFpQixHQUFHLEVBQUU7QUFFNUI7SUFnQkU7UUFkUSxvQkFBZSxHQUFvQixFQUFFLENBQUM7UUFFdEMsb0JBQWUsR0FBb0IsRUFBRSxDQUFDO1FBTTlDLG1CQUFjLEdBQWdCO1lBQzVCLEdBQUcsRUFBRSxzQkFBc0I7WUFDM0IsT0FBTyxFQUFFLEVBQUU7WUFDWCxRQUFRLEVBQUUsUUFBUSxDQUFDLFVBQVU7U0FDOUIsQ0FBQztRQUdBLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBR0Qsc0JBQVksMENBQVk7UUFEeEIsaUVBQWlFOzs7Ozs7UUFDakU7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUUsQ0FBQzs7O09BQUE7Ozs7SUFFRCxxQ0FBVTs7O0lBQVY7UUFDRSxPQUFPLElBQUks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Ozs7O0lBZ2JYLHVCQUFDO0NBQUEsQUFoYkQsSUFnYkM7U0EvYVksZ0JBQWdCOzs7Ozs7SUFDM0IsMkNBQThDOzs7OztJQUM5Qyw4Q0FBOEM7Ozs7O0lBQzlDLDJDQUE4Qzs7Ozs7SUFDOUMsOENBQXFDOzs7OztJQUNyQyxpQ0FBbUI7O0lBQ25CLHdDQUEyQjs7SUFDM0IsbUNBQXFCOztJQUNyQixzQ0FBbUM7O0lBQ25DLDBDQUlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL2dsb2JhbC11dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBwYXJzZVV0Y0RhdGUgfSBmcm9tICcuL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBCYWNrZW5kU2VydmljZSxcclxuICBDYXNlVHlwZSxcclxuICBDb2x1bW4sXHJcbiAgQ29sdW1uRmlsdGVyLFxyXG4gIENvbHVtbkZpbHRlcnMsXHJcbiAgQ29sdW1uU29ydCxcclxuICBDdXJyZW50RmlsdGVyLFxyXG4gIEN1cnJlbnRQYWdpbmF0aW9uLFxyXG4gIEN1cnJlbnRTb3J0ZXIsXHJcbiAgRmlsdGVyQ2hhbmdlZEFyZ3MsXHJcbiAgRmllbGRUeXBlLFxyXG4gIEdyaWRPcHRpb24sXHJcbiAgT2RhdGFPcHRpb24sXHJcbiAgUGFnaW5hdGlvbixcclxuICBQYWdpbmF0aW9uQ2hhbmdlZEFyZ3MsXHJcbiAgU29ydENoYW5nZWRBcmdzLFxyXG4gIFNvcnREaXJlY3Rpb24sXHJcbiAgU29ydERpcmVjdGlvblN0cmluZ1xyXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgT2RhdGFTZXJ2aWNlIH0gZnJvbSAnLi9vZGF0YS5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IERFRkFVTFRfSVRFTVNfUEVSX1BBR0UgPSAyNTtcclxuY29uc3QgREVGQVVMVF9QQUdFX1NJWkUgPSAyMDtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdyaWRPZGF0YVNlcnZpY2UgaW1wbGVtZW50cyBCYWNrZW5kU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfY3VycmVudEZpbHRlcnM6IEN1cnJlbnRGaWx0ZXJbXSA9IFtdO1xyXG4gIHByaXZhdGUgX2N1cnJlbnRQYWdpbmF0aW9uOiBDdXJyZW50UGFnaW5hdGlvbjtcclxuICBwcml2YXRlIF9jdXJyZW50U29ydGVyczogQ3VycmVudFNvcnRlcltdID0gW107XHJcbiAgcHJpdmF0ZSBfY29sdW1uRGVmaW5pdGlvbnM6IENvbHVtbltdO1xyXG4gIHByaXZhdGUgX2dyaWQ6IGFueTtcclxuICBvZGF0YVNlcnZpY2U6IE9kYXRhU2VydmljZTtcclxuICBvcHRpb25zOiBPZGF0YU9wdGlvbjtcclxuICBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uIHwgdW5kZWZpbmVkO1xyXG4gIGRlZmF1bHRPcHRpb25zOiBPZGF0YU9wdGlvbiA9IHtcclxuICAgIHRvcDogREVGQVVMVF9JVEVNU19QRVJfUEFHRSxcclxuICAgIG9yZGVyQnk6ICcnLFxyXG4gICAgY2FzZVR5cGU6IENhc2VUeXBlLnBhc2NhbENhc2VcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMub2RhdGFTZXJ2aWNlID0gbmV3IE9kYXRhU2VydmljZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBwcml2YXRlIGdldCBfZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgfVxyXG5cclxuICBidWlsZFF1ZXJ5KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5vZGF0YVNlcnZpY2UuYnVpbGRRdWVyeSgpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJGaWx0ZXJzKCkge1xyXG4gICAgdGhpcy5fY3VycmVudEZpbHRlcnMgPSBbXTtcclxuICAgIHRoaXMudXBkYXRlT3B0aW9ucyh7IGZpbHRlcmluZ09wdGlvbnM6IFtdIH0pO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJTb3J0ZXJzKCkge1xyXG4gICAgdGhpcy5fY3VycmVudFNvcnRlcnMgPSBbXTtcclxuICAgIHRoaXMudXBkYXRlT3B0aW9ucyh7IHNvcnRpbmdPcHRpb25zOiBbXSB9KTtcclxuICB9XHJcblxyXG4gIGluaXQob3B0aW9uczogT2RhdGFPcHRpb24sIHBhZ2luYXRpb24/OiBQYWdpbmF0aW9uLCBncmlkPzogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcclxuICAgIGNvbnN0IG1lcmdlZE9wdGlvbnMgPSB7IC4uLnRoaXMuZGVmYXVsdE9wdGlvbnMsIC4uLm9wdGlvbnMgfTtcclxuICAgIGlmIChwYWdpbmF0aW9uICYmIHBhZ2luYXRpb24ucGFnZVNpemUpIHtcclxuICAgICAgbWVyZ2VkT3B0aW9ucy50b3AgPSBwYWdpbmF0aW9uLnBhZ2VTaXplO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vZGF0YVNlcnZpY2Uub3B0aW9ucyA9IHsgLi4ubWVyZ2VkT3B0aW9ucywgdG9wOiBtZXJnZWRPcHRpb25zLnRvcCB8fCB0aGlzLmRlZmF1bHRPcHRpb25zLnRvcCB9O1xyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5vZGF0YVNlcnZpY2Uub3B0aW9ucztcclxuICAgIHRoaXMucGFnaW5hdGlvbiA9IHBhZ2luYXRpb247XHJcblxyXG4gICAgLy8gc2F2ZSBjdXJyZW50IHBhZ2luYXRpb24gYXMgUGFnZSAxIGFuZCBwYWdlIHNpemUgYXMgXCJ0b3BcIlxyXG4gICAgdGhpcy5fY3VycmVudFBhZ2luYXRpb24gPSB7XHJcbiAgICAgIHBhZ2VOdW1iZXI6IDEsXHJcbiAgICAgIHBhZ2VTaXplOiB0aGlzLm9kYXRhU2VydmljZS5vcHRpb25zLnRvcCB8fCB0aGlzLmRlZmF1bHRPcHRpb25zLnRvcFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoZ3JpZCAmJiBncmlkLmdldENvbHVtbnMpIHtcclxuICAgICAgdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMgPSAob3B0aW9ucyAmJiBvcHRpb25zLmNvbHVtbkRlZmluaXRpb25zKSB8fCBncmlkLmdldENvbHVtbnMoKTtcclxuICAgICAgdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMgPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5maWx0ZXIoKGNvbHVtbjogQ29sdW1uKSA9PiAhY29sdW1uLmV4Y2x1ZGVGcm9tUXVlcnkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlT3B0aW9ucyhzZXJ2aWNlT3B0aW9ucz86IE9kYXRhT3B0aW9uKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB7IC4uLnRoaXMub3B0aW9ucywgLi4uc2VydmljZU9wdGlvbnMgfTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUNvbHVtbkZpbHRlcihmaWVsZE5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5vZGF0YVNlcnZpY2UucmVtb3ZlQ29sdW1uRmlsdGVyKGZpZWxkTmFtZSk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IHRoZSBGaWx0ZXJzIHRoYXQgYXJlIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBncmlkICovXHJcbiAgZ2V0Q3VycmVudEZpbHRlcnMoKTogQ3VycmVudEZpbHRlcltdIHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50RmlsdGVycztcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIFBhZ2luYXRpb24gdGhhdCBpcyBjdXJyZW50bHkgdXNlZCBieSB0aGUgZ3JpZCAqL1xyXG4gIGdldEN1cnJlbnRQYWdpbmF0aW9uKCk6IEN1cnJlbnRQYWdpbmF0aW9uIHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50UGFnaW5hdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIFNvcnRlcnMgdGhhdCBhcmUgY3VycmVudGx5IHVzZWQgYnkgdGhlIGdyaWQgKi9cclxuICBnZXRDdXJyZW50U29ydGVycygpOiBDdXJyZW50U29ydGVyW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTb3J0ZXJzO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBSZXNldCB0aGUgcGFnaW5hdGlvbiBvcHRpb25zXHJcbiAgICovXHJcbiAgcmVzZXRQYWdpbmF0aW9uT3B0aW9ucygpIHtcclxuICAgIHRoaXMub2RhdGFTZXJ2aWNlLnVwZGF0ZU9wdGlvbnMoe1xyXG4gICAgICBza2lwOiAwXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNhdmVDb2x1bW5GaWx0ZXIoZmllbGROYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHRlcm1zPzogYW55W10pIHtcclxuICAgIHRoaXMub2RhdGFTZXJ2aWNlLnNhdmVDb2x1bW5GaWx0ZXIoZmllbGROYW1lLCB2YWx1ZSwgdGVybXMpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBGSUxURVJJTkdcclxuICAgKi9cclxuICBwcm9jZXNzT25GaWx0ZXJDaGFuZ2VkKGV2ZW50OiBFdmVudCwgYXJnczogRmlsdGVyQ2hhbmdlZEFyZ3MpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgY29uc3Qgc2VydmljZU9wdGlvbnM6IEdyaWRPcHRpb24gPSBhcmdzLmdyaWQuZ2V0T3B0aW9ucygpO1xyXG4gICAgY29uc3QgYmFja2VuZEFwaSA9IHNlcnZpY2VPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xyXG5cclxuICAgIGlmIChiYWNrZW5kQXBpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyBpbiB0aGUgR3JpZE9kYXRhU2VydmljZSwgXCJiYWNrZW5kU2VydmljZUFwaVwiIGlzIG5vdCBpbml0aWFsaXplZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGtlZXAgY3VycmVudCBmaWx0ZXJzICYgYWx3YXlzIHNhdmUgaXQgYXMgYW4gYXJyYXkgKGNvbHVtbkZpbHRlcnMgY2FuIGJlIGFuIG9iamVjdCB3aGVuIGl0IGlzIGRlYWx0IGJ5IFNsaWNrR3JpZCBGaWx0ZXIpXHJcbiAgICB0aGlzLl9jdXJyZW50RmlsdGVycyA9IHRoaXMuY2FzdEZpbHRlclRvQ29sdW1uRmlsdGVyKGFyZ3MuY29sdW1uRmlsdGVycyk7XHJcblxyXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAvLyBsb29wIHRocm91Z2ggYWxsIGNvbHVtbnMgdG8gaW5zcGVjdCBmaWx0ZXJzICYgc2V0IHRoZSBxdWVyeVxyXG4gICAgICB0aGlzLnVwZGF0ZUZpbHRlcnMoYXJncy5jb2x1bW5GaWx0ZXJzKTtcclxuXHJcbiAgICAgIHRoaXMucmVzZXRQYWdpbmF0aW9uT3B0aW9ucygpO1xyXG4gICAgICByZXNvbHZlKHRoaXMub2RhdGFTZXJ2aWNlLmJ1aWxkUXVlcnkoKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogUEFHSU5BVElPTlxyXG4gICAqL1xyXG4gIHByb2Nlc3NPblBhZ2luYXRpb25DaGFuZ2VkKGV2ZW50OiBFdmVudCwgYXJnczogUGFnaW5hdGlvbkNoYW5nZWRBcmdzKSB7XHJcbiAgICBjb25zdCBwYWdlU2l6ZSA9ICsoYXJncy5wYWdlU2l6ZSB8fCBERUZBVUxUX1BBR0VfU0laRSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhZ2luYXRpb24oYXJncy5uZXdQYWdlLCBwYWdlU2l6ZSk7XHJcblxyXG4gICAgLy8gYnVpbGQgdGhlIE9EYXRhIHF1ZXJ5IHdoaWNoIHdlIHdpbGwgdXNlIGluIHRoZSBXZWJBUEkgY2FsbGJhY2tcclxuICAgIHJldHVybiB0aGlzLm9kYXRhU2VydmljZS5idWlsZFF1ZXJ5KCk7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFNPUlRJTkdcclxuICAgKi9cclxuICBwcm9jZXNzT25Tb3J0Q2hhbmdlZChldmVudDogRXZlbnQsIGFyZ3M6IFNvcnRDaGFuZ2VkQXJncykge1xyXG4gICAgY29uc3Qgc29ydENvbHVtbnMgPSAoYXJncy5tdWx0aUNvbHVtblNvcnQpID8gYXJncy5zb3J0Q29scyA6IG5ldyBBcnJheSh7IHNvcnRDb2w6IGFyZ3Muc29ydENvbCwgc29ydEFzYzogYXJncy5zb3J0QXNjIH0pO1xyXG5cclxuICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1ucyB0byBpbnNwZWN0IHNvcnRlcnMgJiBzZXQgdGhlIHF1ZXJ5XHJcbiAgICB0aGlzLnVwZGF0ZVNvcnRlcnMoc29ydENvbHVtbnMpO1xyXG5cclxuICAgIC8vIGJ1aWxkIHRoZSBPRGF0YSBxdWVyeSB3aGljaCB3ZSB3aWxsIHVzZSBpbiB0aGUgV2ViQVBJIGNhbGxiYWNrXHJcbiAgICByZXR1cm4gdGhpcy5vZGF0YVNlcnZpY2UuYnVpbGRRdWVyeSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW5zIHRvIGluc3BlY3QgZmlsdGVycyAmIHVwZGF0ZSBiYWNrZW5kIHNlcnZpY2UgZmlsdGVyaW5nT3B0aW9uc1xyXG4gICAqIEBwYXJhbSBjb2x1bW5GaWx0ZXJzXHJcbiAgICovXHJcbiAgdXBkYXRlRmlsdGVycyhjb2x1bW5GaWx0ZXJzOiBDb2x1bW5GaWx0ZXJzIHwgQ3VycmVudEZpbHRlcltdLCBpc1VwZGF0ZWRCeVByZXNldD86IGJvb2xlYW4pIHtcclxuICAgIGxldCBzZWFyY2hCeSA9ICcnO1xyXG4gICAgY29uc3Qgc2VhcmNoQnlBcnJheTogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAvLyBvbiBmaWx0ZXIgcHJlc2V0IGxvYWQsIHdlIG5lZWQgdG8ga2VlcCBjdXJyZW50IGZpbHRlcnNcclxuICAgIGlmIChpc1VwZGF0ZWRCeVByZXNldCkge1xyXG4gICAgICB0aGlzLl9jdXJyZW50RmlsdGVycyA9IHRoaXMuY2FzdEZpbHRlclRvQ29sdW1uRmlsdGVyKGNvbHVtbkZpbHRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1ucyB0byBpbnNwZWN0IGZpbHRlcnNcclxuICAgIGZvciAoY29uc3QgY29sdW1uSWQgaW4gY29sdW1uRmlsdGVycykge1xyXG4gICAgICBpZiAoY29sdW1uRmlsdGVycy5oYXNPd25Qcm9wZXJ0eShjb2x1bW5JZCkpIHtcclxuICAgICAgICBjb25zdCBjb2x1bW5GaWx0ZXIgPSBjb2x1bW5GaWx0ZXJzW2NvbHVtbklkXTtcclxuXHJcbiAgICAgICAgLy8gaWYgdXNlciBkZWZpbmVkIHNvbWUgXCJwcmVzZXRzXCIsIHRoZW4gd2UgbmVlZCB0byBmaW5kIHRoZSBmaWx0ZXJzIGZyb20gdGhlIGNvbHVtbiBkZWZpbml0aW9ucyBpbnN0ZWFkXHJcbiAgICAgICAgbGV0IGNvbHVtbkRlZjogQ29sdW1uIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmIChpc1VwZGF0ZWRCeVByZXNldCAmJiBBcnJheS5pc0FycmF5KHRoaXMuX2NvbHVtbkRlZmluaXRpb25zKSkge1xyXG4gICAgICAgICAgY29sdW1uRGVmID0gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMuZmluZCgoY29sdW1uOiBDb2x1bW4pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbHVtbi5pZCA9PT0gY29sdW1uRmlsdGVyLmNvbHVtbklkO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbHVtbkRlZiA9IGNvbHVtbkZpbHRlci5jb2x1bW5EZWY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghY29sdW1uRGVmKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tCYWNrZW5kIFNlcnZpY2UgQVBJXTogU29tZXRoaW5nIHdlbnQgd3JvbmcgaW4gdHJ5aW5nIHRvIGdldCB0aGUgY29sdW1uIGRlZmluaXRpb24gb2YgdGhlIHNwZWNpZmllZCBmaWx0ZXIgKG9yIHByZXNldCBmaWx0ZXJzKS4gRGlkIHlvdSBtYWtlIGEgdHlwbyBvbiB0aGUgZmlsdGVyIGNvbHVtbklkPycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZpZWxkTmFtZSA9IGNvbHVtbkRlZi5xdWVyeUZpZWxkIHx8IGNvbHVtbkRlZi5xdWVyeUZpZWxkRmlsdGVyIHx8IGNvbHVtbkRlZi5maWVsZCB8fCBjb2x1bW5EZWYubmFtZSB8fCAnJztcclxuICAgICAgICBjb25zdCBmaWVsZFR5cGUgPSBjb2x1bW5EZWYudHlwZSB8fCAnc3RyaW5nJztcclxuICAgICAgICBjb25zdCBzZWFyY2hUZXJtcyA9IChjb2x1bW5GaWx0ZXIgPyBjb2x1bW5GaWx0ZXIuc2VhcmNoVGVybXMgOiBudWxsKSB8fCBbXTtcclxuICAgICAgICBsZXQgZmllbGRTZWFyY2hWYWx1ZSA9IChBcnJheS5pc0FycmF5KHNlYXJjaFRlcm1zKSAmJiBzZWFyY2hUZXJtcy5sZW5ndGggPT09IDEpID8gc2VhcmNoVGVybXNbMF0gOiAnJztcclxuICAgICAgICBpZiAodHlwZW9mIGZpZWxkU2VhcmNoVmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICBmaWVsZFNlYXJjaFZhbHVlID0gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGZpZWxkU2VhcmNoVmFsdWUgIT09ICdzdHJpbmcnICYmICFzZWFyY2hUZXJtcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBPRGRhdGEgZmlsdGVyIHNlYXJjaFRlcm0gcHJvcGVydHkgbXVzdCBiZSBwcm92aWRlZCBhcyB0eXBlIFwic3RyaW5nXCIsIGlmIHlvdSB1c2UgZmlsdGVyIHdpdGggb3B0aW9ucyB0aGVuIG1ha2Ugc3VyZSB5b3VyIElEcyBhcmUgYWxzbyBzdHJpbmcuIEZvciBleGFtcGxlOiBmaWx0ZXI6IHttb2RlbDogRmlsdGVycy5zZWxlY3QsIGNvbGxlY3Rpb246IFt7IGlkOiBcIjBcIiwgdmFsdWU6IFwiMFwiIH0sIHsgaWQ6IFwiMVwiLCB2YWx1ZTogXCIxXCIgfV1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZpZWxkU2VhcmNoVmFsdWUgPSAnJyArIGZpZWxkU2VhcmNoVmFsdWU7IC8vIG1ha2Ugc3VyZSBpdCdzIGEgc3RyaW5nXHJcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGZpZWxkU2VhcmNoVmFsdWUubWF0Y2goL14oWzw+IT1cXCpdezAsMn0pKC4qW148PiE9XFwqXSkoW1xcKl0/KSQvKTsgLy8gZ3JvdXAgMTogT3BlcmF0b3IsIDI6IHNlYXJjaFZhbHVlLCAzOiBsYXN0IGNoYXIgaXMgJyonIChtZWFuaW5nIHN0YXJ0cyB3aXRoLCBleC46IGFiYyopXHJcbiAgICAgICAgY29uc3Qgb3BlcmF0b3IgPSBjb2x1bW5GaWx0ZXIub3BlcmF0b3IgfHwgKChtYXRjaGVzKSA/IG1hdGNoZXNbMV0gOiAnJyk7XHJcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gKCEhbWF0Y2hlcykgPyBtYXRjaGVzWzJdIDogJyc7XHJcbiAgICAgICAgY29uc3QgbGFzdFZhbHVlQ2hhciA9ICghIW1hdGNoZXMpID8gbWF0Y2hlc1szXSA6IChvcGVyYXRvciA9PT0gJyp6JyA/ICcqJyA6ICcnKTtcclxuICAgICAgICBjb25zdCBieXBhc3NPZGF0YVF1ZXJ5ID0gY29sdW1uRmlsdGVyLmJ5cGFzc0JhY2tlbmRRdWVyeSB8fCBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gbm8gbmVlZCB0byBxdWVyeSBpZiBzZWFyY2ggdmFsdWUgaXMgZW1wdHlcclxuICAgICAgICBpZiAoZmllbGROYW1lICYmIHNlYXJjaFZhbHVlID09PSAnJyAmJiBzZWFyY2hUZXJtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIHRoaXMucmVtb3ZlQ29sdW1uRmlsdGVyKGZpZWxkTmFtZSk7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGVzY2FwaW5nIHRoZSBzZWFyY2ggdmFsdWVcclxuICAgICAgICBzZWFyY2hWYWx1ZSA9IHNlYXJjaFZhbHVlLnJlcGxhY2UoYCdgLCBgJydgKTsgLy8gZXNjYXBlIHNpbmdsZSBxdW90ZXMgYnkgZG91YmxpbmcgdGhlbVxyXG4gICAgICAgIHNlYXJjaFZhbHVlID0gZW5jb2RlVVJJQ29tcG9uZW50KHNlYXJjaFZhbHVlKTsgLy8gZW5jb2RlIFVSSSBvZiB0aGUgZmluYWwgc2VhcmNoIHZhbHVlXHJcblxyXG4gICAgICAgIC8vIGV4dHJhIHF1ZXJ5IGFyZ3VtZW50c1xyXG4gICAgICAgIGlmIChieXBhc3NPZGF0YVF1ZXJ5KSB7XHJcbiAgICAgICAgICAvLyBwdXNoIHRvIG91ciB0ZW1wIGFycmF5IGFuZCBhbHNvIHRyaW0gd2hpdGUgc3BhY2VzXHJcbiAgICAgICAgICBpZiAoZmllbGROYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZUNvbHVtbkZpbHRlcihmaWVsZE5hbWUsIGZpZWxkU2VhcmNoVmFsdWUsIHNlYXJjaFRlcm1zKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc2VhcmNoQnkgPSAnJztcclxuXHJcbiAgICAgICAgICAvLyB0aXRsZUNhc2UgdGhlIGZpZWxkTmFtZSBzbyB0aGF0IGl0IG1hdGNoZXMgdGhlIFdlYkFwaSBuYW1lc1xyXG4gICAgICAgICAgaWYgKHRoaXMub2RhdGFTZXJ2aWNlLm9wdGlvbnMuY2FzZVR5cGUgPT09IENhc2VUeXBlLnBhc2NhbENhc2UpIHtcclxuICAgICAgICAgICAgZmllbGROYW1lID0gU3RyaW5nLnRpdGxlQ2FzZShmaWVsZE5hbWUgfHwgJycpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIHdoZW4gaGF2aW5nIG1vcmUgdGhhbiAxIHNlYXJjaCB0ZXJtICh0aGVuIGNoZWNrIGlmIHdlIGhhdmUgYSBcIklOXCIgb3IgXCJOT1QgSU5cIiBmaWx0ZXIgc2VhcmNoKVxyXG4gICAgICAgICAgaWYgKHNlYXJjaFRlcm1zICYmIHNlYXJjaFRlcm1zLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgY29uc3QgdG1wU2VhcmNoVGVybXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvcGVyYXRvciA9PT0gJ0lOJykge1xyXG4gICAgICAgICAgICAgIC8vIGV4YW1wbGU6OiAoU3RhZ2UgZXEgXCJFeHBpcmVkXCIgb3IgU3RhZ2UgZXEgXCJSZW5ld2FsXCIpXHJcbiAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIGxuaiA9IHNlYXJjaFRlcm1zLmxlbmd0aDsgaiA8IGxuajsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB0bXBTZWFyY2hUZXJtcy5wdXNoKGAke2ZpZWxkTmFtZX0gZXEgJyR7c2VhcmNoVGVybXNbal19J2ApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBzZWFyY2hCeSA9IHRtcFNlYXJjaFRlcm1zLmpvaW4oJyBvciAnKTtcclxuICAgICAgICAgICAgICBzZWFyY2hCeSA9IGAoJHtzZWFyY2hCeX0pYDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gJ05JTicgfHwgb3BlcmF0b3IgPT09ICdOT1RJTicgfHwgb3BlcmF0b3IgPT09ICdOT1QgSU4nKSB7XHJcbiAgICAgICAgICAgICAgLy8gZXhhbXBsZTo6IChTdGFnZSBuZSBcIkV4cGlyZWRcIiBhbmQgU3RhZ2UgbmUgXCJSZW5ld2FsXCIpXHJcbiAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDAsIGxuayA9IHNlYXJjaFRlcm1zLmxlbmd0aDsgayA8IGxuazsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICB0bXBTZWFyY2hUZXJtcy5wdXNoKGAke2ZpZWxkTmFtZX0gbmUgJyR7c2VhcmNoVGVybXNba119J2ApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBzZWFyY2hCeSA9IHRtcFNlYXJjaFRlcm1zLmpvaW4oJyBhbmQgJyk7XHJcbiAgICAgICAgICAgICAgc2VhcmNoQnkgPSBgKCR7c2VhcmNoQnl9KWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09ICcqJyB8fCBvcGVyYXRvciA9PT0gJ2EqJyB8fCBvcGVyYXRvciA9PT0gJyp6JyB8fCBsYXN0VmFsdWVDaGFyICE9PSAnJykge1xyXG4gICAgICAgICAgICAvLyBmaXJzdC9sYXN0IGNoYXJhY3RlciBpcyBhICcqJyB3aWxsIGJlIGEgc3RhcnRzV2l0aCBvciBlbmRzV2l0aFxyXG4gICAgICAgICAgICBzZWFyY2hCeSA9IChvcGVyYXRvciA9PT0gJyonIHx8IG9wZXJhdG9yID09PSAnKnonKVxyXG4gICAgICAgICAgICAgID8gYGVuZHN3aXRoKCR7ZmllbGROYW1lfSwgJyR7c2VhcmNoVmFsdWV9JylgXHJcbiAgICAgICAgICAgICAgOiBgc3RhcnRzd2l0aCgke2ZpZWxkTmFtZX0sICcke3NlYXJjaFZhbHVlfScpYDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZmllbGRUeXBlID09PSBGaWVsZFR5cGUuZGF0ZSkge1xyXG4gICAgICAgICAgICAvLyBkYXRlIGZpZWxkIG5lZWRzIHRvIGJlIFVUQyBhbmQgd2l0aGluIERhdGVUaW1lIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGVGb3JtYXR0ZWQgPSBwYXJzZVV0Y0RhdGUoc2VhcmNoVmFsdWUsIHRydWUpO1xyXG4gICAgICAgICAgICBpZiAoZGF0ZUZvcm1hdHRlZCkge1xyXG4gICAgICAgICAgICAgIHNlYXJjaEJ5ID0gYCR7ZmllbGROYW1lfSAke3RoaXMubWFwT2RhdGFPcGVyYXRvcihvcGVyYXRvcil9IERhdGVUaW1lJyR7ZGF0ZUZvcm1hdHRlZH0nYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChmaWVsZFR5cGUgPT09IEZpZWxkVHlwZS5zdHJpbmcpIHtcclxuICAgICAgICAgICAgLy8gc3RyaW5nIGZpZWxkIG5lZWRzIHRvIGJlIGluIHNpbmdsZSBxdW90ZXNcclxuICAgICAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnJykge1xyXG4gICAgICAgICAgICAgIHNlYXJjaEJ5ID0gYHN1YnN0cmluZ29mKCcke3NlYXJjaFZhbHVlfScsICR7ZmllbGROYW1lfSlgO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vIHNlYXJjaEJ5ID0gYHN1YnN0cmluZ29mKCcke3NlYXJjaFZhbHVlfScsICR7ZmllbGROYW1lQ2FzZWR9KSAke3RoaXMubWFwT2RhdGFPcGVyYXRvcihvcGVyYXRvcil9IHRydWVgO1xyXG4gICAgICAgICAgICAgIHNlYXJjaEJ5ID0gYCR7ZmllbGROYW1lfSAke3RoaXMubWFwT2RhdGFPcGVyYXRvcihvcGVyYXRvcil9ICcke3NlYXJjaFZhbHVlfSdgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBhbnkgb3RoZXIgZmllbGQgdHlwZSAob3IgdW5kZWZpbmVkIHR5cGUpXHJcbiAgICAgICAgICAgIHNlYXJjaFZhbHVlID0gZmllbGRUeXBlID09PSBGaWVsZFR5cGUubnVtYmVyID8gc2VhcmNoVmFsdWUgOiBgJyR7c2VhcmNoVmFsdWV9J2A7XHJcbiAgICAgICAgICAgIHNlYXJjaEJ5ID0gYCR7ZmllbGROYW1lfSAke3RoaXMubWFwT2RhdGFPcGVyYXRvcihvcGVyYXRvcil9ICR7c2VhcmNoVmFsdWV9YDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBwdXNoIHRvIG91ciB0ZW1wIGFycmF5IGFuZCBhbHNvIHRyaW0gd2hpdGUgc3BhY2VzXHJcbiAgICAgICAgICBpZiAoc2VhcmNoQnkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHNlYXJjaEJ5QXJyYXkucHVzaChTdHJpbmcudHJpbShzZWFyY2hCeSkpO1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVDb2x1bW5GaWx0ZXIoZmllbGROYW1lIHx8ICcnLCBmaWVsZFNlYXJjaFZhbHVlLCBzZWFyY2hUZXJtcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIHRoZSBzZXJ2aWNlIG9wdGlvbnMgd2l0aCBmaWx0ZXJzIGZvciB0aGUgYnVpbGRRdWVyeSgpIHRvIHdvcmsgbGF0ZXJcclxuICAgIHRoaXMub2RhdGFTZXJ2aWNlLnVwZGF0ZU9wdGlvbnMoe1xyXG4gICAgICBmaWx0ZXI6IChzZWFyY2hCeUFycmF5Lmxlbmd0aCA+IDApID8gc2VhcmNoQnlBcnJheS5qb2luKCcgYW5kICcpIDogJycsXHJcbiAgICAgIHNraXA6IHVuZGVmaW5lZFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIHBhZ2luYXRpb24gY29tcG9uZW50IHdpdGggaXQncyBuZXcgcGFnZSBudW1iZXIgYW5kIHNpemVcclxuICAgKiBAcGFyYW0gbmV3UGFnZVxyXG4gICAqIEBwYXJhbSBwYWdlU2l6ZVxyXG4gICAqL1xyXG4gIHVwZGF0ZVBhZ2luYXRpb24obmV3UGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9jdXJyZW50UGFnaW5hdGlvbiA9IHtcclxuICAgICAgcGFnZU51bWJlcjogbmV3UGFnZSxcclxuICAgICAgcGFnZVNpemVcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5vZGF0YVNlcnZpY2UudXBkYXRlT3B0aW9ucyh7XHJcbiAgICAgIHRvcDogcGFnZVNpemUsXHJcbiAgICAgIHNraXA6IChuZXdQYWdlIC0gMSkgKiBwYWdlU2l6ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBsb29wIHRocm91Z2ggYWxsIGNvbHVtbnMgdG8gaW5zcGVjdCBzb3J0ZXJzICYgdXBkYXRlIGJhY2tlbmQgc2VydmljZSBvcmRlckJ5XHJcbiAgICogQHBhcmFtIGNvbHVtbkZpbHRlcnNcclxuICAgKi9cclxuICB1cGRhdGVTb3J0ZXJzKHNvcnRDb2x1bW5zPzogQ29sdW1uU29ydFtdLCBwcmVzZXRTb3J0ZXJzPzogQ3VycmVudFNvcnRlcltdKSB7XHJcbiAgICBsZXQgc29ydEJ5QXJyYXk6IGFueVtdID0gW107XHJcbiAgICBjb25zdCBzb3J0ZXJBcnJheTogQ3VycmVudFNvcnRlcltdID0gW107XHJcblxyXG4gICAgaWYgKCFzb3J0Q29sdW1ucyAmJiBwcmVzZXRTb3J0ZXJzKSB7XHJcbiAgICAgIC8vIG1ha2UgdGhlIHByZXNldHMgdGhlIGN1cnJlbnQgc29ydGVycywgYWxzbyBtYWtlIHN1cmUgdGhhdCBhbGwgZGlyZWN0aW9uIGFyZSBpbiBsb3dlcmNhc2UgZm9yIE9EYXRhXHJcbiAgICAgIHNvcnRCeUFycmF5ID0gcHJlc2V0U29ydGVycztcclxuICAgICAgc29ydEJ5QXJyYXkuZm9yRWFjaCgoc29ydGVyKSA9PiBzb3J0ZXIuZGlyZWN0aW9uID0gc29ydGVyLmRpcmVjdGlvbi50b0xvd2VyQ2FzZSgpIGFzIFNvcnREaXJlY3Rpb25TdHJpbmcpO1xyXG5cclxuICAgICAgLy8gZGlzcGxheSB0aGUgY29ycmVjdCBzb3J0aW5nIGljb25zIG9uIHRoZSBVSSwgZm9yIHRoYXQgaXQgcmVxdWlyZXMgKGNvbHVtbklkLCBzb3J0QXNjKSBwcm9wZXJ0aWVzXHJcbiAgICAgIGNvbnN0IHRtcFNvcnRlckFycmF5ID0gc29ydEJ5QXJyYXkubWFwKChzb3J0ZXIpID0+IHtcclxuICAgICAgICBjb25zdCBjb2x1bW5EZWYgPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5maW5kKChjb2x1bW46IENvbHVtbikgPT4gY29sdW1uLmlkID09PSBzb3J0ZXIuY29sdW1uSWQpO1xyXG5cclxuICAgICAgICBzb3J0ZXJBcnJheS5wdXNoKHtcclxuICAgICAgICAgIGNvbHVtbklkOiBjb2x1bW5EZWYgPyAoKGNvbHVtbkRlZi5xdWVyeUZpZWxkIHx8IGNvbHVtbkRlZi5xdWVyeUZpZWxkU29ydGVyIHx8IGNvbHVtbkRlZi5maWVsZCB8fCBjb2x1bW5EZWYuaWQpICsgJycpIDogKHNvcnRlci5jb2x1bW5JZCArICcnKSxcclxuICAgICAgICAgIGRpcmVjdGlvbjogc29ydGVyLmRpcmVjdGlvblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyByZXR1cm4gb25seSB0aGUgY29sdW1uKHMpIGZvdW5kIGluIHRoZSBDb2x1bW4gRGVmaW5pdGlvbnMgRUxTRSBudWxsXHJcbiAgICAgICAgaWYgKGNvbHVtbkRlZikge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uSWQ6IHNvcnRlci5jb2x1bW5JZCxcclxuICAgICAgICAgICAgc29ydEFzYzogc29ydGVyLmRpcmVjdGlvbi50b1VwcGVyQ2FzZSgpID09PSBTb3J0RGlyZWN0aW9uLkFTQ1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9ncmlkLnNldFNvcnRDb2x1bW5zKHRtcFNvcnRlckFycmF5KTtcclxuICAgIH0gZWxzZSBpZiAoc29ydENvbHVtbnMgJiYgIXByZXNldFNvcnRlcnMpIHtcclxuICAgICAgLy8gYnVpbGQgdGhlIFNvcnRCeSBzdHJpbmcsIGl0IGNvdWxkIGJlIG11bHRpc29ydCwgZXhhbXBsZTogY3VzdG9tZXJObyBhc2MsIHB1cmNoYXNlck5hbWUgZGVzY1xyXG4gICAgICBpZiAoc29ydENvbHVtbnMgJiYgc29ydENvbHVtbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgc29ydEJ5QXJyYXkgPSBuZXcgQXJyYXkodGhpcy5kZWZhdWx0T3B0aW9ucy5vcmRlckJ5KTsgLy8gd2hlbiBlbXB0eSwgdXNlIHRoZSBkZWZhdWx0IHNvcnRcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoc29ydENvbHVtbnMpIHtcclxuICAgICAgICAgIGZvciAoY29uc3QgY29sdW1uRGVmIG9mIHNvcnRDb2x1bW5zKSB7XHJcbiAgICAgICAgICAgIGlmIChjb2x1bW5EZWYuc29ydENvbCkge1xyXG4gICAgICAgICAgICAgIGxldCBmaWVsZE5hbWUgPSAoY29sdW1uRGVmLnNvcnRDb2wucXVlcnlGaWVsZCB8fCBjb2x1bW5EZWYuc29ydENvbC5xdWVyeUZpZWxkU29ydGVyIHx8IGNvbHVtbkRlZi5zb3J0Q29sLmZpZWxkIHx8IGNvbHVtbkRlZi5zb3J0Q29sLmlkKSArICcnO1xyXG4gICAgICAgICAgICAgIGxldCBjb2x1bW5GaWVsZE5hbWUgPSAoY29sdW1uRGVmLnNvcnRDb2wuZmllbGQgfHwgY29sdW1uRGVmLnNvcnRDb2wuaWQpICsgJyc7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMub2RhdGFTZXJ2aWNlLm9wdGlvbnMuY2FzZVR5cGUgPT09IENhc2VUeXBlLnBhc2NhbENhc2UpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkTmFtZSA9IFN0cmluZy50aXRsZUNhc2UoZmllbGROYW1lKTtcclxuICAgICAgICAgICAgICAgIGNvbHVtbkZpZWxkTmFtZSA9IFN0cmluZy50aXRsZUNhc2UoY29sdW1uRmllbGROYW1lKTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIHNvcnRlckFycmF5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgY29sdW1uSWQ6IGNvbHVtbkZpZWxkTmFtZSxcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogY29sdW1uRGVmLnNvcnRBc2MgPyAnYXNjJyA6ICdkZXNjJ1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzb3J0QnlBcnJheSA9IHNvcnRlckFycmF5O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHRyYW5zZm9ybSB0aGUgc29ydGJ5IGFycmF5IGludG8gYSBDU1Ygc3RyaW5nIGZvciBPRGF0YVxyXG4gICAgc29ydEJ5QXJyYXkgPSBzb3J0QnlBcnJheSB8fCBbXSBhcyBDdXJyZW50U29ydGVyW107XHJcbiAgICBjb25zdCBjc3ZTdHJpbmcgPSBzb3J0QnlBcnJheS5tYXAoKHNvcnRlcikgPT4ge1xyXG4gICAgICBpZiAoc29ydGVyICYmIHNvcnRlci5jb2x1bW5JZCkge1xyXG4gICAgICAgIHJldHVybiBgJHtzb3J0ZXIuY29sdW1uSWR9ICR7c29ydGVyICYmIHNvcnRlci5kaXJlY3Rpb24gJiYgc29ydGVyLmRpcmVjdGlvbi50b0xvd2VyQ2FzZSgpIHx8ICcnfWA7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfSkuam9pbignLCcpO1xyXG5cclxuICAgIHRoaXMub2RhdGFTZXJ2aWNlLnVwZGF0ZU9wdGlvbnMoe1xyXG4gICAgICBvcmRlckJ5OiAodGhpcy5vZGF0YVNlcnZpY2Uub3B0aW9ucy5jYXNlVHlwZSA9PT0gQ2FzZVR5cGUucGFzY2FsQ2FzZSkgPyBTdHJpbmcudGl0bGVDYXNlKGNzdlN0cmluZykgOiBjc3ZTdHJpbmdcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGtlZXAgY3VycmVudCBTb3J0ZXJzIGFuZCB1cGRhdGUgdGhlIHNlcnZpY2Ugb3B0aW9ucyB3aXRoIHRoZSBuZXcgc29ydGluZ1xyXG4gICAgdGhpcy5fY3VycmVudFNvcnRlcnMgPSBzb3J0QnlBcnJheSBhcyBDdXJyZW50U29ydGVyW107XHJcblxyXG4gICAgLy8gYnVpbGQgdGhlIE9EYXRhIHF1ZXJ5IHdoaWNoIHdlIHdpbGwgdXNlIGluIHRoZSBXZWJBUEkgY2FsbGJhY2tcclxuICAgIHJldHVybiB0aGlzLm9kYXRhU2VydmljZS5idWlsZFF1ZXJ5KCk7XHJcbiAgfVxyXG5cclxuICAvL1xyXG4gIC8vIHByaXZhdGUgZnVuY3Rpb25zXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8qKlxyXG4gICAqIENhc3QgcHJvdmlkZWQgZmlsdGVycyAoY291bGQgYmUgaW4gbXVsdGlwbGUgZm9ybWF0KSBpbnRvIGFuIGFycmF5IG9mIENvbHVtbkZpbHRlclxyXG4gICAqIEBwYXJhbSBjb2x1bW5GaWx0ZXJzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjYXN0RmlsdGVyVG9Db2x1bW5GaWx0ZXIoY29sdW1uRmlsdGVyczogQ29sdW1uRmlsdGVycyB8IEN1cnJlbnRGaWx0ZXJbXSk6IEN1cnJlbnRGaWx0ZXJbXSB7XHJcbiAgICAvLyBrZWVwIGN1cnJlbnQgZmlsdGVycyAmIGFsd2F5cyBzYXZlIGl0IGFzIGFuIGFycmF5IChjb2x1bW5GaWx0ZXJzIGNhbiBiZSBhbiBvYmplY3Qgd2hlbiBpdCBpcyBkZWFsdCBieSBTbGlja0dyaWQgRmlsdGVyKVxyXG4gICAgY29uc3QgZmlsdGVyc0FycmF5OiBDb2x1bW5GaWx0ZXJbXSA9ICgodHlwZW9mIGNvbHVtbkZpbHRlcnMgPT09ICdvYmplY3QnKSA/IE9iamVjdC5rZXlzKGNvbHVtbkZpbHRlcnMpLm1hcChrZXkgPT4gY29sdW1uRmlsdGVyc1trZXldKSA6IGNvbHVtbkZpbHRlcnMpIGFzIEN1cnJlbnRGaWx0ZXJbXTtcclxuXHJcbiAgICByZXR1cm4gZmlsdGVyc0FycmF5Lm1hcCgoZmlsdGVyKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbHVtbkRlZiA9IGZpbHRlci5jb2x1bW5EZWY7XHJcbiAgICAgIGNvbnN0IHRtcEZpbHRlcjogQ3VycmVudEZpbHRlciA9IHsgY29sdW1uSWQ6IGZpbHRlci5jb2x1bW5JZCB8fCAnJyB9O1xyXG4gICAgICBpZiAoZmlsdGVyLm9wZXJhdG9yKSB7XHJcbiAgICAgICAgdG1wRmlsdGVyLm9wZXJhdG9yID0gZmlsdGVyLm9wZXJhdG9yO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGZpbHRlci5zZWFyY2hUZXJtcykpIHtcclxuICAgICAgICB0bXBGaWx0ZXIuc2VhcmNoVGVybXMgPSBmaWx0ZXIuc2VhcmNoVGVybXM7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRtcEZpbHRlcjtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWFwcGVyIGZvciBtYXRoZW1hdGljYWwgb3BlcmF0b3JzIChleC46IDw9IGlzIFwibGVcIiwgPiBpcyBcImd0XCIpXHJcbiAgICogQHBhcmFtIHN0cmluZyBvcGVyYXRvclxyXG4gICAqIEByZXR1cm5zIHN0cmluZyBtYXBcclxuICAgKi9cclxuICBwcml2YXRlIG1hcE9kYXRhT3BlcmF0b3Iob3BlcmF0b3I6IHN0cmluZykge1xyXG4gICAgbGV0IG1hcCA9ICcnO1xyXG4gICAgc3dpdGNoIChvcGVyYXRvcikge1xyXG4gICAgICBjYXNlICc8JzpcclxuICAgICAgICBtYXAgPSAnbHQnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICc8PSc6XHJcbiAgICAgICAgbWFwID0gJ2xlJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnPic6XHJcbiAgICAgICAgbWFwID0gJ2d0JztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnPj0nOlxyXG4gICAgICAgIG1hcCA9ICdnZSc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJzw+JzpcclxuICAgICAgY2FzZSAnIT0nOlxyXG4gICAgICAgIG1hcCA9ICduZSc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJz0nOlxyXG4gICAgICBjYXNlICc9PSc6XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgbWFwID0gJ2VxJztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWFwO1xyXG4gIH1cclxufVxyXG4iXX0=