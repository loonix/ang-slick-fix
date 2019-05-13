/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { mapOperatorType, mapOperatorByFieldType } from './utilities';
import { FieldType, SortDirection } from './../models/index';
import QueryBuilder from './graphqlQueryBuilder';
/** @type {?} */
var DEFAULT_ITEMS_PER_PAGE = 25;
/** @type {?} */
var DEFAULT_PAGE_SIZE = 20;
var GraphqlService = /** @class */ (function () {
    function GraphqlService() {
        this._currentFilters = [];
        this._currentSorters = [];
        this.defaultPaginationOptions = {
            first: DEFAULT_ITEMS_PER_PAGE,
            offset: 0
        };
    }
    Object.defineProperty(GraphqlService.prototype, "_gridOptions", {
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
     * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
     * @param serviceOptions GraphqlServiceOption
     */
    /**
     * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
     * @return {?}
     */
    GraphqlService.prototype.buildQuery = /**
     * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
     * @return {?}
     */
    function () {
        var e_1, _a, e_2, _b;
        if (!this.options || !this.options.datasetName || (!this._columnDefinitions && !this.options.columnDefinitions)) {
            throw new Error('GraphQL Service requires "datasetName" & "columnDefinitions" properties for it to work');
        }
        // get the column definitions and exclude some if they were tagged as excluded
        /** @type {?} */
        var columnDefinitions = this._columnDefinitions || this.options.columnDefinitions;
        columnDefinitions = columnDefinitions.filter((/**
         * @param {?} column
         * @return {?}
         */
        function (column) { return !column.excludeFromQuery; }));
        /** @type {?} */
        var queryQb = new QueryBuilder('query');
        /** @type {?} */
        var datasetQb = new QueryBuilder(this.options.datasetName);
        /** @type {?} */
        var dataQb = (this.options.isWithCursor) ? new QueryBuilder('edges') : new QueryBuilder('nodes');
        // get all the columnds Ids for the filters to work
        /** @type {?} */
        var columnIds = [];
        if (columnDefinitions && Array.isArray(columnDefinitions)) {
            try {
                for (var columnDefinitions_1 = tslib_1.__values(columnDefinitions), columnDefinitions_1_1 = columnDefinitions_1.next(); !columnDefinitions_1_1.done; columnDefinitions_1_1 = columnDefinitions_1.next()) {
                    var column = columnDefinitions_1_1.value;
                    columnIds.push(column.field);
                    // if extra "fields" are passed, also push them to columnIds
                    if (column.fields) {
                        columnIds.push.apply(columnIds, tslib_1.__spread(column.fields));
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (columnDefinitions_1_1 && !columnDefinitions_1_1.done && (_a = columnDefinitions_1.return)) _a.call(columnDefinitions_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // columnIds = columnDefinitions.map((column) => column.field);
        }
        else {
            columnIds = this.options.columnIds || [];
        }
        // Slickgrid also requires the "id" field to be part of DataView
        // add it to the GraphQL query if it wasn't already part of the list
        if (columnIds.indexOf('id') === -1) {
            columnIds.unshift('id');
        }
        /** @type {?} */
        var filters = this.buildFilterQuery(columnIds);
        if (this.options.isWithCursor) {
            // ...pageInfo { hasNextPage, endCursor }, edges { cursor, node { _filters_ } }
            /** @type {?} */
            var pageInfoQb = new QueryBuilder('pageInfo');
            pageInfoQb.find('hasNextPage', 'endCursor');
            dataQb.find(['cursor', { node: filters }]);
            datasetQb.find(['totalCount', pageInfoQb, dataQb]);
        }
        else {
            // ...nodes { _filters_ }
            dataQb.find(filters);
            datasetQb.find(['totalCount', dataQb]);
        }
        // add dataset filters, could be Pagination and SortingFilters and/or FieldFilters
        /** @type {?} */
        var datasetFilters = {};
        // only add pagination if it's enabled in the grid options
        if (this._gridOptions.enablePagination !== false) {
            datasetFilters = tslib_1.__assign({}, this.options.paginationOptions, { first: ((this.options.paginationOptions && this.options.paginationOptions.first) ? this.options.paginationOptions.first : ((this.pagination && this.pagination.pageSize) ? this.pagination.pageSize : null)) || this.defaultPaginationOptions.first });
            if (!this.options.isWithCursor) {
                datasetFilters.offset = ((this.options.paginationOptions && this.options.paginationOptions.hasOwnProperty('offset')) ? +this.options.paginationOptions['offset'] : 0);
            }
        }
        if (this.options.sortingOptions && Array.isArray(this.options.sortingOptions) && this.options.sortingOptions.length > 0) {
            // orderBy: [{ field:x, direction: 'ASC' }]
            datasetFilters.orderBy = this.options.sortingOptions;
        }
        if (this.options.filteringOptions && Array.isArray(this.options.filteringOptions) && this.options.filteringOptions.length > 0) {
            // filterBy: [{ field: date, operator: '>', value: '2000-10-10' }]
            datasetFilters.filterBy = this.options.filteringOptions;
        }
        if (this.options.addLocaleIntoQuery) {
            // first: 20, ... locale: "en-CA"
            datasetFilters.locale = this._gridOptions && this._gridOptions.i18n && this._gridOptions.i18n.currentLang || 'en';
        }
        if (this.options.extraQueryArguments) {
            try {
                // first: 20, ... userId: 123
                for (var _c = tslib_1.__values(this.options.extraQueryArguments), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var queryArgument = _d.value;
                    datasetFilters[queryArgument.field] = queryArgument.value;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        // query { users(first: 20, orderBy: [], filterBy: [])}
        datasetQb.filter(datasetFilters);
        queryQb.find(datasetQb);
        /** @type {?} */
        var enumSearchProperties = ['direction:', 'field:', 'operator:'];
        return this.trimDoubleQuotesOnEnumField(queryQb.toString(), enumSearchProperties, this.options.keepArgumentFieldDoubleQuotes || false);
    };
    /**
     * From an input array of strings, we want to build a GraphQL query string.
     * The process has to take the dot notation and parse it into a valid GraphQL query
     * Following this SO answer https://stackoverflow.com/a/47705476/1212166
     *
     * INPUT
     *  ['firstName', 'lastName', 'billing.address.street', 'billing.address.zip']
     * OUTPUT
     * firstName, lastName, billing{address{street, zip}}
     * @param inputArray
     */
    /**
     * From an input array of strings, we want to build a GraphQL query string.
     * The process has to take the dot notation and parse it into a valid GraphQL query
     * Following this SO answer https://stackoverflow.com/a/47705476/1212166
     *
     * INPUT
     *  ['firstName', 'lastName', 'billing.address.street', 'billing.address.zip']
     * OUTPUT
     * firstName, lastName, billing{address{street, zip}}
     * @param {?} inputArray
     * @return {?}
     */
    GraphqlService.prototype.buildFilterQuery = /**
     * From an input array of strings, we want to build a GraphQL query string.
     * The process has to take the dot notation and parse it into a valid GraphQL query
     * Following this SO answer https://stackoverflow.com/a/47705476/1212166
     *
     * INPUT
     *  ['firstName', 'lastName', 'billing.address.street', 'billing.address.zip']
     * OUTPUT
     * firstName, lastName, billing{address{street, zip}}
     * @param {?} inputArray
     * @return {?}
     */
    function (inputArray) {
        /** @type {?} */
        var set = (/**
         * @param {?=} o
         * @param {?=} a
         * @return {?}
         */
        function (o, a) {
            if (o === void 0) { o = {}; }
            /** @type {?} */
            var k = a.shift();
            o[k] = a.length ? set(o[k], a) : null;
            return o;
        });
        /** @type {?} */
        var output = inputArray.reduce((/**
         * @param {?} o
         * @param {?} a
         * @return {?}
         */
        function (o, a) { return set(o, a.split('.')); }), {});
        return JSON.stringify(output)
            .replace(/\"|\:|null/g, '')
            .replace(/^\{/, '')
            .replace(/\}$/, '');
    };
    /**
     * @return {?}
     */
    GraphqlService.prototype.clearFilters = /**
     * @return {?}
     */
    function () {
        this._currentFilters = [];
        this.updateOptions({ filteringOptions: [] });
    };
    /**
     * @return {?}
     */
    GraphqlService.prototype.clearSorters = /**
     * @return {?}
     */
    function () {
        this._currentSorters = [];
        this.updateOptions({ sortingOptions: [] });
    };
    /**
     * @param {?=} serviceOptions
     * @param {?=} pagination
     * @param {?=} grid
     * @return {?}
     */
    GraphqlService.prototype.init = /**
     * @param {?=} serviceOptions
     * @param {?=} pagination
     * @param {?=} grid
     * @return {?}
     */
    function (serviceOptions, pagination, grid) {
        this._grid = grid;
        this.options = serviceOptions || {};
        this.pagination = pagination;
        if (grid && grid.getColumns) {
            this._columnDefinitions = serviceOptions.columnDefinitions || grid.getColumns();
        }
    };
    /**
     * Get an initialization of Pagination options
     * @return Pagination Options
     */
    /**
     * Get an initialization of Pagination options
     * @return {?} Pagination Options
     */
    GraphqlService.prototype.getInitPaginationOptions = /**
     * Get an initialization of Pagination options
     * @return {?} Pagination Options
     */
    function () {
        return (this.options.isWithCursor) ? { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE) } : { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE), offset: 0 };
    };
    /** Get the GraphQL dataset name */
    /**
     * Get the GraphQL dataset name
     * @return {?}
     */
    GraphqlService.prototype.getDatasetName = /**
     * Get the GraphQL dataset name
     * @return {?}
     */
    function () {
        return this.options.datasetName || '';
    };
    /** Get the Filters that are currently used by the grid */
    /**
     * Get the Filters that are currently used by the grid
     * @return {?}
     */
    GraphqlService.prototype.getCurrentFilters = /**
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
    GraphqlService.prototype.getCurrentPagination = /**
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
    GraphqlService.prototype.getCurrentSorters = /**
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
    GraphqlService.prototype.resetPaginationOptions = /*
       * Reset the pagination options
       */
    /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var paginationOptions;
        if (this.options.isWithCursor) {
            // first, last, after, before
            paginationOptions = (/** @type {?} */ ({
                after: '',
                before: undefined,
                last: undefined
            }));
        }
        else {
            // first, last, offset
            paginationOptions = (/** @type {?} */ ((this.options.paginationOptions || this.getInitPaginationOptions())));
            paginationOptions.offset = 0;
        }
        // save current pagination as Page 1 and page size as "first" set size
        this._currentPagination = {
            pageNumber: 1,
            pageSize: paginationOptions.first
        };
        this.updateOptions({ paginationOptions: paginationOptions });
    };
    /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    GraphqlService.prototype.updateOptions = /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    function (serviceOptions) {
        this.options = tslib_1.__assign({}, this.options, serviceOptions);
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
    GraphqlService.prototype.processOnFilterChanged = /*
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
        var gridOptions = this._gridOptions || args.grid.getOptions();
        /** @type {?} */
        var backendApi = gridOptions.backendServiceApi;
        if (backendApi === undefined) {
            throw new Error('Something went wrong in the GraphqlService, "backendServiceApi" is not initialized');
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
            if (!args || !args.grid) {
                throw new Error('Something went wrong when trying create the GraphQL Backend Service, it seems that "args" is not populated correctly');
            }
            // loop through all columns to inspect filters & set the query
            _this.updateFilters(args.columnFilters, false);
            _this.resetPaginationOptions();
            resolve(_this.buildQuery());
        }));
        return promise;
    };
    /*
     * PAGINATION
     * With cursor, the query can have 4 arguments (first, after, last, before), for example:
     *   users (first:20, after:"YXJyYXljb25uZWN0aW9uOjM=") {
     *     totalCount
     *     pageInfo {
     *       hasNextPage
     *       endCursor
     *     }
     *     edges {
     *       cursor
     *       node {
     *         name
     *         gender
     *       }
     *     }
     *   }
     * Without cursor, the query can have 3 arguments (first, last, offset), for example:
     *   users (first:20, offset: 10) {
     *     totalCount
     *     nodes {
     *       name
     *       gender
     *     }
     *   }
     */
    /*
       * PAGINATION
       * With cursor, the query can have 4 arguments (first, after, last, before), for example:
       *   users (first:20, after:"YXJyYXljb25uZWN0aW9uOjM=") {
       *     totalCount
       *     pageInfo {
       *       hasNextPage
       *       endCursor
       *     }
       *     edges {
       *       cursor
       *       node {
       *         name
       *         gender
       *       }
       *     }
       *   }
       * Without cursor, the query can have 3 arguments (first, last, offset), for example:
       *   users (first:20, offset: 10) {
       *     totalCount
       *     nodes {
       *       name
       *       gender
       *     }
       *   }
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    GraphqlService.prototype.processOnPaginationChanged = /*
       * PAGINATION
       * With cursor, the query can have 4 arguments (first, after, last, before), for example:
       *   users (first:20, after:"YXJyYXljb25uZWN0aW9uOjM=") {
       *     totalCount
       *     pageInfo {
       *       hasNextPage
       *       endCursor
       *     }
       *     edges {
       *       cursor
       *       node {
       *         name
       *         gender
       *       }
       *     }
       *   }
       * Without cursor, the query can have 3 arguments (first, last, offset), for example:
       *   users (first:20, offset: 10) {
       *     totalCount
       *     nodes {
       *       name
       *       gender
       *     }
       *   }
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    function (event, args) {
        /** @type {?} */
        var pageSize = +(args.pageSize || ((this.pagination) ? this.pagination.pageSize : DEFAULT_PAGE_SIZE));
        this.updatePagination(args.newPage, pageSize);
        // build the GraphQL query which we will use in the WebAPI callback
        return this.buildQuery();
    };
    /*
     * SORTING
     * we will use sorting as per a Facebook suggestion on a Github issue (with some small changes)
     * https://github.com/graphql/graphql-relay-js/issues/20#issuecomment-220494222
     */
    /*
       * SORTING
       * we will use sorting as per a Facebook suggestion on a Github issue (with some small changes)
       * https://github.com/graphql/graphql-relay-js/issues/20#issuecomment-220494222
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    GraphqlService.prototype.processOnSortChanged = /*
       * SORTING
       * we will use sorting as per a Facebook suggestion on a Github issue (with some small changes)
       * https://github.com/graphql/graphql-relay-js/issues/20#issuecomment-220494222
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
        // build the GraphQL query which we will use in the WebAPI callback
        return this.buildQuery();
    };
    /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param columnFilters
     */
    /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param {?} columnFilters
     * @param {?} isUpdatedByPreset
     * @return {?}
     */
    GraphqlService.prototype.updateFilters = /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param {?} columnFilters
     * @param {?} isUpdatedByPreset
     * @return {?}
     */
    function (columnFilters, isUpdatedByPreset) {
        /** @type {?} */
        var searchByArray = [];
        /** @type {?} */
        var searchValue;
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
                    function (column) { return column.id === columnFilter_1.columnId; }));
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
                var searchTerms = (columnFilter_1 ? columnFilter_1.searchTerms : null) || [];
                /** @type {?} */
                var fieldSearchValue = (Array.isArray(searchTerms) && searchTerms.length === 1) ? searchTerms[0] : '';
                if (typeof fieldSearchValue === 'undefined') {
                    fieldSearchValue = '';
                }
                if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                    throw new Error("GraphQL filter searchTerm property must be provided as type \"string\", if you use filter with options then make sure your IDs are also string. For example: filter: {model: Filters.select, collection: [{ id: \"0\", value: \"0\" }, { id: \"1\", value: \"1\" }]");
                }
                fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                // make sure it's a string
                /** @type {?} */
                var matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/);
                // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                /** @type {?} */
                var operator = columnFilter_1.operator || ((matches) ? matches[1] : '');
                searchValue = (!!matches) ? matches[2] : '';
                /** @type {?} */
                var lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                // no need to query if search value is empty
                if (fieldName && searchValue === '' && searchTerms.length === 0) {
                    return "continue";
                }
                // when having more than 1 search term (we need to create a CSV string for GraphQL "IN" or "NOT IN" filter search)
                if (searchTerms && searchTerms.length > 1) {
                    searchValue = searchTerms.join(',');
                }
                else if (typeof searchValue === 'string') {
                    // escaping the search value
                    searchValue = searchValue.replace("'", "''"); // escape single quotes by doubling them
                    if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar === '*') {
                        operator = (operator === '*' || operator === '*z') ? 'endsWith' : 'startsWith';
                    }
                }
                // if we didn't find an Operator but we have a Filter Type, we should use default Operator
                // multipleSelect is "IN", while singleSelect is "EQ", else don't map any operator
                if (!operator && columnDef.filter) {
                    operator = columnDef.filter.operator;
                }
                // if we still don't have an operator find the proper Operator to use by it's field type
                if (!operator) {
                    operator = mapOperatorByFieldType(columnDef.type || FieldType.string);
                }
                searchByArray.push({
                    field: fieldName,
                    operator: mapOperatorType(operator),
                    value: searchValue
                });
            }
        };
        var this_1 = this;
        for (var columnId in columnFilters) {
            _loop_1(columnId);
        }
        // update the service options with filters for the buildQuery() to work later
        this.updateOptions({ filteringOptions: searchByArray });
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
    GraphqlService.prototype.updatePagination = /**
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
        /** @type {?} */
        var paginationOptions;
        if (this.options.isWithCursor) {
            paginationOptions = {
                first: pageSize
            };
        }
        else {
            paginationOptions = {
                first: pageSize,
                offset: (newPage - 1) * pageSize
            };
        }
        this.updateOptions({ paginationOptions: paginationOptions });
    };
    /**
     * loop through all columns to inspect sorters & update backend service sortingOptions
     * @param columnFilters
     */
    /**
     * loop through all columns to inspect sorters & update backend service sortingOptions
     * @param {?=} sortColumns
     * @param {?=} presetSorters
     * @return {?}
     */
    GraphqlService.prototype.updateSorters = /**
     * loop through all columns to inspect sorters & update backend service sortingOptions
     * @param {?=} sortColumns
     * @param {?=} presetSorters
     * @return {?}
     */
    function (sortColumns, presetSorters) {
        var _this = this;
        var e_3, _a;
        /** @type {?} */
        var currentSorters = [];
        /** @type {?} */
        var graphqlSorters = [];
        if (!sortColumns && presetSorters) {
            // make the presets the current sorters, also make sure that all direction are in uppercase for GraphQL
            currentSorters = presetSorters;
            currentSorters.forEach((/**
             * @param {?} sorter
             * @return {?}
             */
            function (sorter) { return sorter.direction = (/** @type {?} */ (sorter.direction.toUpperCase())); }));
            // display the correct sorting icons on the UI, for that it requires (columnId, sortAsc) properties
            /** @type {?} */
            var tmpSorterArray = currentSorters.map((/**
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
                graphqlSorters.push({
                    field: columnDef ? ((columnDef.queryField || columnDef.queryFieldSorter || columnDef.field || columnDef.id) + '') : (sorter.columnId + ''),
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
            // set the sort icons, but also make sure to filter out null values (happens when no columnDef found)
            if (Array.isArray(tmpSorterArray)) {
                this._grid.setSortColumns(tmpSorterArray.filter((/**
                 * @param {?} sorter
                 * @return {?}
                 */
                function (sorter) { return sorter; })));
            }
        }
        else if (sortColumns && !presetSorters) {
            // build the orderBy array, it could be multisort, example
            // orderBy:[{field: lastName, direction: ASC}, {field: firstName, direction: DESC}]
            if (Array.isArray(sortColumns) && sortColumns.length > 0) {
                try {
                    for (var sortColumns_1 = tslib_1.__values(sortColumns), sortColumns_1_1 = sortColumns_1.next(); !sortColumns_1_1.done; sortColumns_1_1 = sortColumns_1.next()) {
                        var column = sortColumns_1_1.value;
                        if (column && column.sortCol) {
                            currentSorters.push({
                                columnId: column.sortCol.id + '',
                                direction: column.sortAsc ? SortDirection.ASC : SortDirection.DESC
                            });
                            graphqlSorters.push({
                                field: (column.sortCol.queryField || column.sortCol.queryFieldSorter || column.sortCol.field || column.sortCol.id) + '',
                                direction: column.sortAsc ? SortDirection.ASC : SortDirection.DESC
                            });
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (sortColumns_1_1 && !sortColumns_1_1.done && (_a = sortColumns_1.return)) _a.call(sortColumns_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        // keep current Sorters and update the service options with the new sorting
        this._currentSorters = currentSorters;
        this.updateOptions({ sortingOptions: graphqlSorters });
    };
    /**
     * A function which takes an input string and removes double quotes only
     * on certain fields are identified as GraphQL enums (except fields with dot notation)
     * For example let say we identified ("direction:", "sort") as word which are GraphQL enum fields
     * then the result will be:
     * FROM
     * query { users (orderBy:[{field:"firstName", direction:"ASC"} }]) }
     * TO
     * query { users (orderBy:[{field: firstName, direction: ASC}})}
     *
     * EXCEPTIONS (fields with dot notation "." which are inside a "field:")
     * these fields will keep double quotes while everything else will be stripped of double quotes
     * query { users (orderBy:[{field:"billing.street.name", direction: "ASC"} }
     * TO
     * query { users (orderBy:[{field:"billing.street.name", direction: ASC}}
     * @param inputStr input string
     * @param enumSearchWords array of enum words to filter
     * @returns outputStr output string
     */
    /**
     * A function which takes an input string and removes double quotes only
     * on certain fields are identified as GraphQL enums (except fields with dot notation)
     * For example let say we identified ("direction:", "sort") as word which are GraphQL enum fields
     * then the result will be:
     * FROM
     * query { users (orderBy:[{field:"firstName", direction:"ASC"} }]) }
     * TO
     * query { users (orderBy:[{field: firstName, direction: ASC}})}
     *
     * EXCEPTIONS (fields with dot notation "." which are inside a "field:")
     * these fields will keep double quotes while everything else will be stripped of double quotes
     * query { users (orderBy:[{field:"billing.street.name", direction: "ASC"} }
     * TO
     * query { users (orderBy:[{field:"billing.street.name", direction: ASC}}
     * @param {?} inputStr input string
     * @param {?} enumSearchWords array of enum words to filter
     * @param {?} keepArgumentFieldDoubleQuotes
     * @return {?} outputStr output string
     */
    GraphqlService.prototype.trimDoubleQuotesOnEnumField = /**
     * A function which takes an input string and removes double quotes only
     * on certain fields are identified as GraphQL enums (except fields with dot notation)
     * For example let say we identified ("direction:", "sort") as word which are GraphQL enum fields
     * then the result will be:
     * FROM
     * query { users (orderBy:[{field:"firstName", direction:"ASC"} }]) }
     * TO
     * query { users (orderBy:[{field: firstName, direction: ASC}})}
     *
     * EXCEPTIONS (fields with dot notation "." which are inside a "field:")
     * these fields will keep double quotes while everything else will be stripped of double quotes
     * query { users (orderBy:[{field:"billing.street.name", direction: "ASC"} }
     * TO
     * query { users (orderBy:[{field:"billing.street.name", direction: ASC}}
     * @param {?} inputStr input string
     * @param {?} enumSearchWords array of enum words to filter
     * @param {?} keepArgumentFieldDoubleQuotes
     * @return {?} outputStr output string
     */
    function (inputStr, enumSearchWords, keepArgumentFieldDoubleQuotes) {
        /** @type {?} */
        var patternWordInQuotes = "s?((field:s*)?\".*?\")";
        /** @type {?} */
        var patternRegex = enumSearchWords.join(patternWordInQuotes + '|');
        patternRegex += patternWordInQuotes; // the last one should also have the pattern but without the pipe "|"
        // the last one should also have the pattern but without the pipe "|"
        // example with (field: & direction:):  /field:s?(".*?")|direction:s?(".*?")/
        /** @type {?} */
        var reg = new RegExp(patternRegex, 'g');
        return inputStr.replace(reg, (/**
         * @param {?} group1
         * @param {?} group2
         * @param {?} group3
         * @return {?}
         */
        function (group1, group2, group3) {
            // remove double quotes except when the string starts with a "field:"
            /** @type {?} */
            var removeDoubleQuotes = true;
            if (group1.startsWith('field:') && keepArgumentFieldDoubleQuotes) {
                removeDoubleQuotes = false;
            }
            /** @type {?} */
            var rep = removeDoubleQuotes ? group1.replace(/"/g, '') : group1;
            return rep;
        }));
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
    GraphqlService.prototype.castFilterToColumnFilter = 
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
        var filtersArray = (typeof columnFilters === 'object') ? Object.keys(columnFilters).map((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return columnFilters[key]; })) : columnFilters;
        return filtersArray.map((/**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
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
    return GraphqlService;
}());
export { GraphqlService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GraphqlService.prototype._currentFilters;
    /**
     * @type {?}
     * @private
     */
    GraphqlService.prototype._currentPagination;
    /**
     * @type {?}
     * @private
     */
    GraphqlService.prototype._currentSorters;
    /**
     * @type {?}
     * @private
     */
    GraphqlService.prototype._columnDefinitions;
    /**
     * @type {?}
     * @private
     */
    GraphqlService.prototype._grid;
    /** @type {?} */
    GraphqlService.prototype.options;
    /** @type {?} */
    GraphqlService.prototype.pagination;
    /** @type {?} */
    GraphqlService.prototype.defaultPaginationOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9ncmFwaHFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3RFLE9BQU8sRUFTTCxTQUFTLEVBWVQsYUFBYSxFQUVkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxZQUFZLE1BQU0sdUJBQXVCLENBQUM7O0lBRTNDLHNCQUFzQixHQUFHLEVBQUU7O0lBQzNCLGlCQUFpQixHQUFHLEVBQUU7QUFFNUI7SUFBQTtRQUNVLG9CQUFlLEdBQW9DLEVBQUUsQ0FBQztRQUV0RCxvQkFBZSxHQUFvQixFQUFFLENBQUM7UUFLOUMsNkJBQXdCLEdBQTREO1lBQ2xGLEtBQUssRUFBRSxzQkFBc0I7WUFDN0IsTUFBTSxFQUFFLENBQUM7U0FDVixDQUFDO0lBb2dCSixDQUFDO0lBamdCQyxzQkFBWSx3Q0FBWTtRQUR4QixpRUFBaUU7Ozs7OztRQUNqRTtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM5RSxDQUFDOzs7T0FBQTtJQUVEOzs7T0FHRzs7Ozs7SUFDSCxtQ0FBVTs7OztJQUFWOztRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsRUFBRTtZQUMvRyxN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LENBQWtCLEVBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYTtRQUVwSixPQUFPLFlBQVksQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQyxNQUFNOztnQkFDdkIsU0FBUyxHQUFrQixFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxJQUFJLEVBQUUsRUFBRTtZQUNwRSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQ25CLFNBQVMsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQzthQUN0QztZQUNELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ3JDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQzthQUM1QztZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ25CLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQS9nQkQsSUErZ0JDOzs7Ozs7O0lBOWdCQyx5Q0FBOEQ7Ozs7O0lBQzlELDRDQUE4Qzs7Ozs7SUFDOUMseUNBQThDOzs7OztJQUM5Qyw0Q0FBcUM7Ozs7O0lBQ3JDLCtCQUFtQjs7SUFDbkIsaUNBQThCOztJQUM5QixvQ0FBbUM7O0lBQ25DLGtEQUdFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbWFwT3BlcmF0b3JUeXBlLCBtYXBPcGVyYXRvckJ5RmllbGRUeXBlIH0gZnJvbSAnLi91dGlsaXRpZXMnO1xyXG5pbXBvcnQge1xyXG4gIEJhY2tlbmRTZXJ2aWNlLFxyXG4gIENvbHVtbixcclxuICBDb2x1bW5GaWx0ZXIsXHJcbiAgQ29sdW1uRmlsdGVycyxcclxuICBDb2x1bW5Tb3J0LFxyXG4gIEN1cnJlbnRGaWx0ZXIsXHJcbiAgQ3VycmVudFBhZ2luYXRpb24sXHJcbiAgQ3VycmVudFNvcnRlcixcclxuICBGaWVsZFR5cGUsXHJcbiAgRmlsdGVyQ2hhbmdlZEFyZ3MsXHJcbiAgR3JhcGhxbEN1cnNvclBhZ2luYXRpb25PcHRpb24sXHJcbiAgR3JhcGhxbERhdGFzZXRGaWx0ZXIsXHJcbiAgR3JhcGhxbEZpbHRlcmluZ09wdGlvbixcclxuICBHcmFwaHFsUGFnaW5hdGlvbk9wdGlvbixcclxuICBHcmFwaHFsU2VydmljZU9wdGlvbixcclxuICBHcmFwaHFsU29ydGluZ09wdGlvbixcclxuICBHcmlkT3B0aW9uLFxyXG4gIFBhZ2luYXRpb24sXHJcbiAgUGFnaW5hdGlvbkNoYW5nZWRBcmdzLFxyXG4gIFNvcnRDaGFuZ2VkQXJncyxcclxuICBTb3J0RGlyZWN0aW9uLFxyXG4gIFNvcnREaXJlY3Rpb25TdHJpbmdcclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCBRdWVyeUJ1aWxkZXIgZnJvbSAnLi9ncmFwaHFsUXVlcnlCdWlsZGVyJztcclxuXHJcbmNvbnN0IERFRkFVTFRfSVRFTVNfUEVSX1BBR0UgPSAyNTtcclxuY29uc3QgREVGQVVMVF9QQUdFX1NJWkUgPSAyMDtcclxuXHJcbmV4cG9ydCBjbGFzcyBHcmFwaHFsU2VydmljZSBpbXBsZW1lbnRzIEJhY2tlbmRTZXJ2aWNlIHtcclxuICBwcml2YXRlIF9jdXJyZW50RmlsdGVyczogQ29sdW1uRmlsdGVycyB8IEN1cnJlbnRGaWx0ZXJbXSA9IFtdO1xyXG4gIHByaXZhdGUgX2N1cnJlbnRQYWdpbmF0aW9uOiBDdXJyZW50UGFnaW5hdGlvbjtcclxuICBwcml2YXRlIF9jdXJyZW50U29ydGVyczogQ3VycmVudFNvcnRlcltdID0gW107XHJcbiAgcHJpdmF0ZSBfY29sdW1uRGVmaW5pdGlvbnM6IENvbHVtbltdO1xyXG4gIHByaXZhdGUgX2dyaWQ6IGFueTtcclxuICBvcHRpb25zOiBHcmFwaHFsU2VydmljZU9wdGlvbjtcclxuICBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uIHwgdW5kZWZpbmVkO1xyXG4gIGRlZmF1bHRQYWdpbmF0aW9uT3B0aW9uczogR3JhcGhxbFBhZ2luYXRpb25PcHRpb24gfCBHcmFwaHFsQ3Vyc29yUGFnaW5hdGlvbk9wdGlvbiA9IHtcclxuICAgIGZpcnN0OiBERUZBVUxUX0lURU1TX1BFUl9QQUdFLFxyXG4gICAgb2Zmc2V0OiAwXHJcbiAgfTtcclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBwcml2YXRlIGdldCBfZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCdWlsZCB0aGUgR3JhcGhRTCBxdWVyeSwgc2luY2UgdGhlIHNlcnZpY2UgaW5jbHVkZS9leGNsdWRlIGN1cnNvciwgdGhlIG91dHB1dCBxdWVyeSB3aWxsIGJlIGRpZmZlcmVudC5cclxuICAgKiBAcGFyYW0gc2VydmljZU9wdGlvbnMgR3JhcGhxbFNlcnZpY2VPcHRpb25cclxuICAgKi9cclxuICBidWlsZFF1ZXJ5KCkge1xyXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMgfHwgIXRoaXMub3B0aW9ucy5kYXRhc2V0TmFtZSB8fCAoIXRoaXMuX2NvbHVtbkRlZmluaXRpb25zICYmICF0aGlzLm9wdGlvbnMuY29sdW1uRGVmaW5pdGlvbnMpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignR3JhcGhRTCBTZXJ2aWNlIHJlcXVpcmVzIFwiZGF0YXNldE5hbWVcIiAmIFwiY29sdW1uRGVmaW5pdGlvbnNcIiBwcm9wZXJ0aWVzIGZvciBpdCB0byB3b3JrJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgYW5kIGV4Y2x1ZGUgc29tZSBpZiB0aGV5IHdlcmUgdGFnZ2VkIGFzIGV4Y2x1ZGVkXHJcbiAgICBsZXQgY29sdW1uRGVmaW5pdGlvbnMgPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucyB8fCB0aGlzLm9wdGlvbnMuY29sdW1uRGVmaW5pdGlvbnM7XHJcbiAgICBjb2x1bW5EZWZpbml0aW9ucyA9IGNvbHVtbkRlZmluaXRpb25zLmZpbHRlcigoY29sdW1uOiBDb2x1bW4pID0+ICFjb2x1bW4uZXhjbHVkZUZyb21RdWVyeSk7XHJcblxyXG4gICAgY29uc3QgcXVlcnlRYiA9IG5ldyBRdWVyeUJ1aWxkZXIoJ3F1ZXJ5Jyk7XHJcbiAgICBjb25zdCBkYXRhc2V0UWIgPSBuZXcgUXVlcnlCdWlsZGVyKHRoaXMub3B0aW9ucy5kYXRhc2V0TmFtZSk7XHJcbiAgICBjb25zdCBkYXRhUWIgPSAodGhpcy5vcHRpb25zLmlzV2l0aEN1cnNvcikgPyBuZXcgUXVlcnlCdWlsZGVyKCdlZGdlcycpIDogbmV3IFF1ZXJ5QnVpbGRlcignbm9kZXMnKTtcclxuXHJcbiAgICAvLyBnZXQgYWxsIHRoZSBjb2x1bW5kcyBJZHMgZm9yIHRoZSBmaWx0ZXJzIHRvIHdvcmtcclxuICAgIGxldCBjb2x1bW5JZHM6IHN0cmluZ1tdID0gW107XHJcbiAgICBpZiAoY29sdW1uRGVmaW5pdGlvbnMgJiYgQXJyYXkuaXNBcnJheShjb2x1bW5EZWZpbml0aW9ucykpIHtcclxuICAgICAgZm9yIChjb25zdCBjb2x1bW4gb2YgY29sdW1uRGVmaW5pdGlvbnMpIHtcclxuICAgICAgICBjb2x1bW5JZHMucHVzaChjb2x1bW4uZmllbGQpO1xyXG5cclxuICAgICAgICAvLyBpZiBleHRyYSBcImZpZWxkc1wiIGFyZSBwYXNzZWQsIGFsc28gcHVzaCB0aGVtIHRvIGNvbHVtbklkc1xyXG4gICAgICAgIGlmIChjb2x1bW4uZmllbGRzKSB7XHJcbiAgICAgICAgICBjb2x1bW5JZHMucHVzaCguLi5jb2x1bW4uZmllbGRzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy8gY29sdW1uSWRzID0gY29sdW1uRGVmaW5pdGlvbnMubWFwKChjb2x1bW4pID0+IGNvbHVtbi5maWVsZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb2x1bW5JZHMgPSB0aGlzLm9wdGlvbnMuY29sdW1uSWRzIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNsaWNrZ3JpZCBhbHNvIHJlcXVpcmVzIHRoZSBcImlkXCIgZmllbGQgdG8gYmUgcGFydCBvZiBEYXRhVmlld1xyXG4gICAgLy8gYWRkIGl0IHRvIHRoZSBHcmFwaFFMIHF1ZXJ5IGlmIGl0IHdhc24ndCBhbHJlYWR5IHBhcnQgb2YgdGhlIGxpc3RcclxuICAgIGlmIChjb2x1bW5JZHMuaW5kZXhPZignaWQnKSA9PT0gLTEpIHtcclxuICAgICAgY29sdW1uSWRzLnVuc2hpZnQoJ2lkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmlsdGVycyA9IHRoaXMuYnVpbGRGaWx0ZXJRdWVyeShjb2x1bW5JZHMpO1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMuaXNXaXRoQ3Vyc29yKSB7XHJcbiAgICAgIC8vIC4uLnBhZ2VJbmZvIHsgaGFzTmV4dFBhZ2UsIGVuZEN1cnNvciB9LCBlZGdlcyB7IGN1cnNvciwgbm9kZSB7IF9maWx0ZXJzXyB9IH1cclxuICAgICAgY29uc3QgcGFnZUluZm9RYiA9IG5ldyBRdWVyeUJ1aWxkZXIoJ3BhZ2VJbmZvJyk7XHJcbiAgICAgIHBhZ2VJbmZvUWIuZmluZCgnaGFzTmV4dFBhZ2UnLCAnZW5kQ3Vyc29yJyk7XHJcbiAgICAgIGRhdGFRYi5maW5kKFsnY3Vyc29yJywgeyBub2RlOiBmaWx0ZXJzIH1dKTtcclxuICAgICAgZGF0YXNldFFiLmZpbmQoWyd0b3RhbENvdW50JywgcGFnZUluZm9RYiwgZGF0YVFiXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyAuLi5ub2RlcyB7IF9maWx0ZXJzXyB9XHJcbiAgICAgIGRhdGFRYi5maW5kKGZpbHRlcnMpO1xyXG4gICAgICBkYXRhc2V0UWIuZmluZChbJ3RvdGFsQ291bnQnLCBkYXRhUWJdKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGQgZGF0YXNldCBmaWx0ZXJzLCBjb3VsZCBiZSBQYWdpbmF0aW9uIGFuZCBTb3J0aW5nRmlsdGVycyBhbmQvb3IgRmllbGRGaWx0ZXJzXHJcbiAgICBsZXQgZGF0YXNldEZpbHRlcnM6IEdyYXBocWxEYXRhc2V0RmlsdGVyID0ge307XHJcblxyXG4gICAgLy8gb25seSBhZGQgcGFnaW5hdGlvbiBpZiBpdCdzIGVuYWJsZWQgaW4gdGhlIGdyaWQgb3B0aW9uc1xyXG4gICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZVBhZ2luYXRpb24gIT09IGZhbHNlKSB7XHJcbiAgICAgIGRhdGFzZXRGaWx0ZXJzID0ge1xyXG4gICAgICAgIC4uLnRoaXMub3B0aW9ucy5wYWdpbmF0aW9uT3B0aW9ucyxcclxuICAgICAgICBmaXJzdDogKCh0aGlzLm9wdGlvbnMucGFnaW5hdGlvbk9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLnBhZ2luYXRpb25PcHRpb25zLmZpcnN0KSA/IHRoaXMub3B0aW9ucy5wYWdpbmF0aW9uT3B0aW9ucy5maXJzdCA6ICgodGhpcy5wYWdpbmF0aW9uICYmIHRoaXMucGFnaW5hdGlvbi5wYWdlU2l6ZSkgPyB0aGlzLnBhZ2luYXRpb24ucGFnZVNpemUgOiBudWxsKSkgfHwgdGhpcy5kZWZhdWx0UGFnaW5hdGlvbk9wdGlvbnMuZmlyc3RcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5vcHRpb25zLmlzV2l0aEN1cnNvcikge1xyXG4gICAgICAgIGRhdGFzZXRGaWx0ZXJzLm9mZnNldCA9ICgodGhpcy5vcHRpb25zLnBhZ2luYXRpb25PcHRpb25zICYmIHRoaXMub3B0aW9ucy5wYWdpbmF0aW9uT3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnb2Zmc2V0JykpID8gK3RoaXMub3B0aW9ucy5wYWdpbmF0aW9uT3B0aW9uc1snb2Zmc2V0J10gOiAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMuc29ydGluZ09wdGlvbnMgJiYgQXJyYXkuaXNBcnJheSh0aGlzLm9wdGlvbnMuc29ydGluZ09wdGlvbnMpICYmIHRoaXMub3B0aW9ucy5zb3J0aW5nT3B0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIC8vIG9yZGVyQnk6IFt7IGZpZWxkOngsIGRpcmVjdGlvbjogJ0FTQycgfV1cclxuICAgICAgZGF0YXNldEZpbHRlcnMub3JkZXJCeSA9IHRoaXMub3B0aW9ucy5zb3J0aW5nT3B0aW9ucztcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9wdGlvbnMuZmlsdGVyaW5nT3B0aW9ucyAmJiBBcnJheS5pc0FycmF5KHRoaXMub3B0aW9ucy5maWx0ZXJpbmdPcHRpb25zKSAmJiB0aGlzLm9wdGlvbnMuZmlsdGVyaW5nT3B0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIC8vIGZpbHRlckJ5OiBbeyBmaWVsZDogZGF0ZSwgb3BlcmF0b3I6ICc+JywgdmFsdWU6ICcyMDAwLTEwLTEwJyB9XVxyXG4gICAgICBkYXRhc2V0RmlsdGVycy5maWx0ZXJCeSA9IHRoaXMub3B0aW9ucy5maWx0ZXJpbmdPcHRpb25zO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hZGRMb2NhbGVJbnRvUXVlcnkpIHtcclxuICAgICAgLy8gZmlyc3Q6IDIwLCAuLi4gbG9jYWxlOiBcImVuLUNBXCJcclxuICAgICAgZGF0YXNldEZpbHRlcnMubG9jYWxlID0gdGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuaTE4biAmJiB0aGlzLl9ncmlkT3B0aW9ucy5pMThuLmN1cnJlbnRMYW5nIHx8ICdlbic7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmV4dHJhUXVlcnlBcmd1bWVudHMpIHtcclxuICAgICAgLy8gZmlyc3Q6IDIwLCAuLi4gdXNlcklkOiAxMjNcclxuICAgICAgZm9yIChjb25zdCBxdWVyeUFyZ3VtZW50IG9mIHRoaXMub3B0aW9ucy5leHRyYVF1ZXJ5QXJndW1lbnRzKSB7XHJcbiAgICAgICAgZGF0YXNldEZpbHRlcnNbcXVlcnlBcmd1bWVudC5maWVsZF0gPSBxdWVyeUFyZ3VtZW50LnZhbHVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcXVlcnkgeyB1c2VycyhmaXJzdDogMjAsIG9yZGVyQnk6IFtdLCBmaWx0ZXJCeTogW10pfVxyXG4gICAgZGF0YXNldFFiLmZpbHRlcihkYXRhc2V0RmlsdGVycyk7XHJcbiAgICBxdWVyeVFiLmZpbmQoZGF0YXNldFFiKTtcclxuXHJcbiAgICBjb25zdCBlbnVtU2VhcmNoUHJvcGVydGllcyA9IFsnZGlyZWN0aW9uOicsICdmaWVsZDonLCAnb3BlcmF0b3I6J107XHJcbiAgICByZXR1cm4gdGhpcy50cmltRG91YmxlUXVvdGVzT25FbnVtRmllbGQocXVlcnlRYi50b1N0cmluZygpLCBlbnVtU2VhcmNoUHJvcGVydGllcywgdGhpcy5vcHRpb25zLmtlZXBBcmd1bWVudEZpZWxkRG91YmxlUXVvdGVzIHx8IGZhbHNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZyb20gYW4gaW5wdXQgYXJyYXkgb2Ygc3RyaW5ncywgd2Ugd2FudCB0byBidWlsZCBhIEdyYXBoUUwgcXVlcnkgc3RyaW5nLlxyXG4gICAqIFRoZSBwcm9jZXNzIGhhcyB0byB0YWtlIHRoZSBkb3Qgbm90YXRpb24gYW5kIHBhcnNlIGl0IGludG8gYSB2YWxpZCBHcmFwaFFMIHF1ZXJ5XHJcbiAgICogRm9sbG93aW5nIHRoaXMgU08gYW5zd2VyIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80NzcwNTQ3Ni8xMjEyMTY2XHJcbiAgICpcclxuICAgKiBJTlBVVFxyXG4gICAqICBbJ2ZpcnN0TmFtZScsICdsYXN0TmFtZScsICdiaWxsaW5nLmFkZHJlc3Muc3RyZWV0JywgJ2JpbGxpbmcuYWRkcmVzcy56aXAnXVxyXG4gICAqIE9VVFBVVFxyXG4gICAqIGZpcnN0TmFtZSwgbGFzdE5hbWUsIGJpbGxpbmd7YWRkcmVzc3tzdHJlZXQsIHppcH19XHJcbiAgICogQHBhcmFtIGlucHV0QXJyYXlcclxuICAgKi9cclxuICBidWlsZEZpbHRlclF1ZXJ5KGlucHV0QXJyYXk6IHN0cmluZ1tdKSB7XHJcblxyXG4gICAgY29uc3Qgc2V0ID0gKG86IGFueSA9IHt9LCBhOiBhbnkpID0+IHtcclxuICAgICAgY29uc3QgayA9IGEuc2hpZnQoKTtcclxuICAgICAgb1trXSA9IGEubGVuZ3RoID8gc2V0KG9ba10sIGEpIDogbnVsbDtcclxuICAgICAgcmV0dXJuIG87XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG91dHB1dCA9IGlucHV0QXJyYXkucmVkdWNlKChvOiBhbnksIGE6IHN0cmluZykgPT4gc2V0KG8sIGEuc3BsaXQoJy4nKSksIHt9KTtcclxuXHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob3V0cHV0KVxyXG4gICAgICAucmVwbGFjZSgvXFxcInxcXDp8bnVsbC9nLCAnJylcclxuICAgICAgLnJlcGxhY2UoL15cXHsvLCAnJylcclxuICAgICAgLnJlcGxhY2UoL1xcfSQvLCAnJyk7XHJcbiAgfVxyXG5cclxuICBjbGVhckZpbHRlcnMoKSB7XHJcbiAgICB0aGlzLl9jdXJyZW50RmlsdGVycyA9IFtdO1xyXG4gICAgdGhpcy51cGRhdGVPcHRpb25zKHsgZmlsdGVyaW5nT3B0aW9uczogW10gfSk7XHJcbiAgfVxyXG5cclxuICBjbGVhclNvcnRlcnMoKSB7XHJcbiAgICB0aGlzLl9jdXJyZW50U29ydGVycyA9IFtdO1xyXG4gICAgdGhpcy51cGRhdGVPcHRpb25zKHsgc29ydGluZ09wdGlvbnM6IFtdIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdChzZXJ2aWNlT3B0aW9ucz86IEdyYXBocWxTZXJ2aWNlT3B0aW9uLCBwYWdpbmF0aW9uPzogUGFnaW5hdGlvbiwgZ3JpZD86IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBzZXJ2aWNlT3B0aW9ucyB8fCB7fTtcclxuICAgIHRoaXMucGFnaW5hdGlvbiA9IHBhZ2luYXRpb247XHJcblxyXG4gICAgaWYgKGdyaWQgJiYgZ3JpZC5nZXRDb2x1bW5zKSB7XHJcbiAgICAgIHRoaXMuX2NvbHVtbkRlZmluaXRpb25zID0gc2VydmljZU9wdGlvbnMuY29sdW1uRGVmaW5pdGlvbnMgfHwgZ3JpZC5nZXRDb2x1bW5zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYW4gaW5pdGlhbGl6YXRpb24gb2YgUGFnaW5hdGlvbiBvcHRpb25zXHJcbiAgICogQHJldHVybiBQYWdpbmF0aW9uIE9wdGlvbnNcclxuICAgKi9cclxuICBnZXRJbml0UGFnaW5hdGlvbk9wdGlvbnMoKTogR3JhcGhxbERhdGFzZXRGaWx0ZXIge1xyXG4gICAgcmV0dXJuICh0aGlzLm9wdGlvbnMuaXNXaXRoQ3Vyc29yKSA/IHsgZmlyc3Q6ICh0aGlzLnBhZ2luYXRpb24gPyB0aGlzLnBhZ2luYXRpb24ucGFnZVNpemUgOiBERUZBVUxUX0lURU1TX1BFUl9QQUdFKSB9IDogeyBmaXJzdDogKHRoaXMucGFnaW5hdGlvbiA/IHRoaXMucGFnaW5hdGlvbi5wYWdlU2l6ZSA6IERFRkFVTFRfSVRFTVNfUEVSX1BBR0UpLCBvZmZzZXQ6IDAgfTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIEdyYXBoUUwgZGF0YXNldCBuYW1lICovXHJcbiAgZ2V0RGF0YXNldE5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZGF0YXNldE5hbWUgfHwgJyc7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IHRoZSBGaWx0ZXJzIHRoYXQgYXJlIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBncmlkICovXHJcbiAgZ2V0Q3VycmVudEZpbHRlcnMoKTogQ29sdW1uRmlsdGVycyB8IEN1cnJlbnRGaWx0ZXJbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEZpbHRlcnM7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IHRoZSBQYWdpbmF0aW9uIHRoYXQgaXMgY3VycmVudGx5IHVzZWQgYnkgdGhlIGdyaWQgKi9cclxuICBnZXRDdXJyZW50UGFnaW5hdGlvbigpOiBDdXJyZW50UGFnaW5hdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFBhZ2luYXRpb247XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IHRoZSBTb3J0ZXJzIHRoYXQgYXJlIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBncmlkICovXHJcbiAgZ2V0Q3VycmVudFNvcnRlcnMoKTogQ3VycmVudFNvcnRlcltdIHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50U29ydGVycztcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogUmVzZXQgdGhlIHBhZ2luYXRpb24gb3B0aW9uc1xyXG4gICAqL1xyXG4gIHJlc2V0UGFnaW5hdGlvbk9wdGlvbnMoKSB7XHJcbiAgICBsZXQgcGFnaW5hdGlvbk9wdGlvbnM7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmlzV2l0aEN1cnNvcikge1xyXG4gICAgICAvLyBmaXJzdCwgbGFzdCwgYWZ0ZXIsIGJlZm9yZVxyXG4gICAgICBwYWdpbmF0aW9uT3B0aW9ucyA9IHtcclxuICAgICAgICBhZnRlcjogJycsXHJcbiAgICAgICAgYmVmb3JlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgbGFzdDogdW5kZWZpbmVkXHJcbiAgICAgIH0gYXMgR3JhcGhxbEN1cnNvclBhZ2luYXRpb25PcHRpb247XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBmaXJzdCwgbGFzdCwgb2Zmc2V0XHJcbiAgICAgIHBhZ2luYXRpb25PcHRpb25zID0gKHRoaXMub3B0aW9ucy5wYWdpbmF0aW9uT3B0aW9ucyB8fCB0aGlzLmdldEluaXRQYWdpbmF0aW9uT3B0aW9ucygpKSBhcyBHcmFwaHFsUGFnaW5hdGlvbk9wdGlvbjtcclxuICAgICAgcGFnaW5hdGlvbk9wdGlvbnMub2Zmc2V0ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzYXZlIGN1cnJlbnQgcGFnaW5hdGlvbiBhcyBQYWdlIDEgYW5kIHBhZ2Ugc2l6ZSBhcyBcImZpcnN0XCIgc2V0IHNpemVcclxuICAgIHRoaXMuX2N1cnJlbnRQYWdpbmF0aW9uID0ge1xyXG4gICAgICBwYWdlTnVtYmVyOiAxLFxyXG4gICAgICBwYWdlU2l6ZTogcGFnaW5hdGlvbk9wdGlvbnMuZmlyc3RcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy51cGRhdGVPcHRpb25zKHsgcGFnaW5hdGlvbk9wdGlvbnMgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVPcHRpb25zKHNlcnZpY2VPcHRpb25zPzogR3JhcGhxbFNlcnZpY2VPcHRpb24pIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IHsgLi4udGhpcy5vcHRpb25zLCAuLi5zZXJ2aWNlT3B0aW9ucyB9O1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBGSUxURVJJTkdcclxuICAgKi9cclxuICBwcm9jZXNzT25GaWx0ZXJDaGFuZ2VkKGV2ZW50OiBFdmVudCwgYXJnczogRmlsdGVyQ2hhbmdlZEFyZ3MpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgY29uc3QgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24gPSB0aGlzLl9ncmlkT3B0aW9ucyB8fCBhcmdzLmdyaWQuZ2V0T3B0aW9ucygpO1xyXG4gICAgY29uc3QgYmFja2VuZEFwaSA9IGdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xyXG5cclxuICAgIGlmIChiYWNrZW5kQXBpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyBpbiB0aGUgR3JhcGhxbFNlcnZpY2UsIFwiYmFja2VuZFNlcnZpY2VBcGlcIiBpcyBub3QgaW5pdGlhbGl6ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBrZWVwIGN1cnJlbnQgZmlsdGVycyAmIGFsd2F5cyBzYXZlIGl0IGFzIGFuIGFycmF5IChjb2x1bW5GaWx0ZXJzIGNhbiBiZSBhbiBvYmplY3Qgd2hlbiBpdCBpcyBkZWFsdCBieSBTbGlja0dyaWQgRmlsdGVyKVxyXG4gICAgdGhpcy5fY3VycmVudEZpbHRlcnMgPSB0aGlzLmNhc3RGaWx0ZXJUb0NvbHVtbkZpbHRlcihhcmdzLmNvbHVtbkZpbHRlcnMpO1xyXG5cclxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKCFhcmdzIHx8ICFhcmdzLmdyaWQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoZW4gdHJ5aW5nIGNyZWF0ZSB0aGUgR3JhcGhRTCBCYWNrZW5kIFNlcnZpY2UsIGl0IHNlZW1zIHRoYXQgXCJhcmdzXCIgaXMgbm90IHBvcHVsYXRlZCBjb3JyZWN0bHknKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW5zIHRvIGluc3BlY3QgZmlsdGVycyAmIHNldCB0aGUgcXVlcnlcclxuICAgICAgdGhpcy51cGRhdGVGaWx0ZXJzKGFyZ3MuY29sdW1uRmlsdGVycywgZmFsc2UpO1xyXG5cclxuICAgICAgdGhpcy5yZXNldFBhZ2luYXRpb25PcHRpb25zKCk7XHJcbiAgICAgIHJlc29sdmUodGhpcy5idWlsZFF1ZXJ5KCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFBBR0lOQVRJT05cclxuICAgKiBXaXRoIGN1cnNvciwgdGhlIHF1ZXJ5IGNhbiBoYXZlIDQgYXJndW1lbnRzIChmaXJzdCwgYWZ0ZXIsIGxhc3QsIGJlZm9yZSksIGZvciBleGFtcGxlOlxyXG4gICAqICAgdXNlcnMgKGZpcnN0OjIwLCBhZnRlcjpcIllYSnlZWGxqYjI1dVpXTjBhVzl1T2pNPVwiKSB7XHJcbiAgICogICAgIHRvdGFsQ291bnRcclxuICAgKiAgICAgcGFnZUluZm8ge1xyXG4gICAqICAgICAgIGhhc05leHRQYWdlXHJcbiAgICogICAgICAgZW5kQ3Vyc29yXHJcbiAgICogICAgIH1cclxuICAgKiAgICAgZWRnZXMge1xyXG4gICAqICAgICAgIGN1cnNvclxyXG4gICAqICAgICAgIG5vZGUge1xyXG4gICAqICAgICAgICAgbmFtZVxyXG4gICAqICAgICAgICAgZ2VuZGVyXHJcbiAgICogICAgICAgfVxyXG4gICAqICAgICB9XHJcbiAgICogICB9XHJcbiAgICogV2l0aG91dCBjdXJzb3IsIHRoZSBxdWVyeSBjYW4gaGF2ZSAzIGFyZ3VtZW50cyAoZmlyc3QsIGxhc3QsIG9mZnNldCksIGZvciBleGFtcGxlOlxyXG4gICAqICAgdXNlcnMgKGZpcnN0OjIwLCBvZmZzZXQ6IDEwKSB7XHJcbiAgICogICAgIHRvdGFsQ291bnRcclxuICAgKiAgICAgbm9kZXMge1xyXG4gICAqICAgICAgIG5hbWVcclxuICAgKiAgICAgICBnZW5kZXJcclxuICAgKiAgICAgfVxyXG4gICAqICAgfVxyXG4gICAqL1xyXG4gIHByb2Nlc3NPblBhZ2luYXRpb25DaGFuZ2VkKGV2ZW50OiBFdmVudCwgYXJnczogUGFnaW5hdGlvbkNoYW5nZWRBcmdzKSB7XHJcbiAgICBjb25zdCBwYWdlU2l6ZSA9ICsoYXJncy5wYWdlU2l6ZSB8fCAoKHRoaXMucGFnaW5hdGlvbikgPyB0aGlzLnBhZ2luYXRpb24ucGFnZVNpemUgOiBERUZBVUxUX1BBR0VfU0laRSkpO1xyXG4gICAgdGhpcy51cGRhdGVQYWdpbmF0aW9uKGFyZ3MubmV3UGFnZSwgcGFnZVNpemUpO1xyXG5cclxuICAgIC8vIGJ1aWxkIHRoZSBHcmFwaFFMIHF1ZXJ5IHdoaWNoIHdlIHdpbGwgdXNlIGluIHRoZSBXZWJBUEkgY2FsbGJhY2tcclxuICAgIHJldHVybiB0aGlzLmJ1aWxkUXVlcnkoKTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogU09SVElOR1xyXG4gICAqIHdlIHdpbGwgdXNlIHNvcnRpbmcgYXMgcGVyIGEgRmFjZWJvb2sgc3VnZ2VzdGlvbiBvbiBhIEdpdGh1YiBpc3N1ZSAod2l0aCBzb21lIHNtYWxsIGNoYW5nZXMpXHJcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL2dyYXBocWwvZ3JhcGhxbC1yZWxheS1qcy9pc3N1ZXMvMjAjaXNzdWVjb21tZW50LTIyMDQ5NDIyMlxyXG4gICAqL1xyXG4gIHByb2Nlc3NPblNvcnRDaGFuZ2VkKGV2ZW50OiBFdmVudCwgYXJnczogU29ydENoYW5nZWRBcmdzKSB7XHJcbiAgICBjb25zdCBzb3J0Q29sdW1ucyA9IChhcmdzLm11bHRpQ29sdW1uU29ydCkgPyBhcmdzLnNvcnRDb2xzIDogbmV3IEFycmF5KHsgc29ydENvbDogYXJncy5zb3J0Q29sLCBzb3J0QXNjOiBhcmdzLnNvcnRBc2MgfSk7XHJcblxyXG4gICAgLy8gbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW5zIHRvIGluc3BlY3Qgc29ydGVycyAmIHNldCB0aGUgcXVlcnlcclxuICAgIHRoaXMudXBkYXRlU29ydGVycyhzb3J0Q29sdW1ucyk7XHJcblxyXG4gICAgLy8gYnVpbGQgdGhlIEdyYXBoUUwgcXVlcnkgd2hpY2ggd2Ugd2lsbCB1c2UgaW4gdGhlIFdlYkFQSSBjYWxsYmFja1xyXG4gICAgcmV0dXJuIHRoaXMuYnVpbGRRdWVyeSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW5zIHRvIGluc3BlY3QgZmlsdGVycyAmIHVwZGF0ZSBiYWNrZW5kIHNlcnZpY2UgZmlsdGVyaW5nT3B0aW9uc1xyXG4gICAqIEBwYXJhbSBjb2x1bW5GaWx0ZXJzXHJcbiAgICovXHJcbiAgdXBkYXRlRmlsdGVycyhjb2x1bW5GaWx0ZXJzOiBDb2x1bW5GaWx0ZXJzIHwgQ3VycmVudEZpbHRlcltdLCBpc1VwZGF0ZWRCeVByZXNldDogYm9vbGVhbikge1xyXG4gICAgY29uc3Qgc2VhcmNoQnlBcnJheTogR3JhcGhxbEZpbHRlcmluZ09wdGlvbltdID0gW107XHJcbiAgICBsZXQgc2VhcmNoVmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdO1xyXG5cclxuICAgIC8vIG9uIGZpbHRlciBwcmVzZXQgbG9hZCwgd2UgbmVlZCB0byBrZWVwIGN1cnJlbnQgZmlsdGVyc1xyXG4gICAgaWYgKGlzVXBkYXRlZEJ5UHJlc2V0KSB7XHJcbiAgICAgIHRoaXMuX2N1cnJlbnRGaWx0ZXJzID0gdGhpcy5jYXN0RmlsdGVyVG9Db2x1bW5GaWx0ZXIoY29sdW1uRmlsdGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBjb2x1bW5JZCBpbiBjb2x1bW5GaWx0ZXJzKSB7XHJcbiAgICAgIGlmIChjb2x1bW5GaWx0ZXJzLmhhc093blByb3BlcnR5KGNvbHVtbklkKSkge1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbkZpbHRlciA9IGNvbHVtbkZpbHRlcnNbY29sdW1uSWRdO1xyXG5cclxuICAgICAgICAvLyBpZiB1c2VyIGRlZmluZWQgc29tZSBcInByZXNldHNcIiwgdGhlbiB3ZSBuZWVkIHRvIGZpbmQgdGhlIGZpbHRlcnMgZnJvbSB0aGUgY29sdW1uIGRlZmluaXRpb25zIGluc3RlYWRcclxuICAgICAgICBsZXQgY29sdW1uRGVmOiBDb2x1bW4gfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKGlzVXBkYXRlZEJ5UHJlc2V0ICYmIEFycmF5LmlzQXJyYXkodGhpcy5fY29sdW1uRGVmaW5pdGlvbnMpKSB7XHJcbiAgICAgICAgICBjb2x1bW5EZWYgPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5maW5kKChjb2x1bW46IENvbHVtbikgPT4gY29sdW1uLmlkID09PSBjb2x1bW5GaWx0ZXIuY29sdW1uSWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb2x1bW5EZWYgPSBjb2x1bW5GaWx0ZXIuY29sdW1uRGVmO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWNvbHVtbkRlZikge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbQmFja2VuZCBTZXJ2aWNlIEFQSV06IFNvbWV0aGluZyB3ZW50IHdyb25nIGluIHRyeWluZyB0byBnZXQgdGhlIGNvbHVtbiBkZWZpbml0aW9uIG9mIHRoZSBzcGVjaWZpZWQgZmlsdGVyIChvciBwcmVzZXQgZmlsdGVycykuIERpZCB5b3UgbWFrZSBhIHR5cG8gb24gdGhlIGZpbHRlciBjb2x1bW5JZD8nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IGNvbHVtbkRlZi5xdWVyeUZpZWxkIHx8IGNvbHVtbkRlZi5xdWVyeUZpZWxkRmlsdGVyIHx8IGNvbHVtbkRlZi5maWVsZCB8fCBjb2x1bW5EZWYubmFtZSB8fCAnJztcclxuICAgICAgICBjb25zdCBzZWFyY2hUZXJtcyA9IChjb2x1bW5GaWx0ZXIgPyBjb2x1bW5GaWx0ZXIuc2VhcmNoVGVybXMgOiBudWxsKSB8fCBbXTtcclxuICAgICAgICBsZXQgZmllbGRTZWFyY2hWYWx1ZSA9IChBcnJheS5pc0FycmF5KHNlYXJjaFRlcm1zKSAmJiBzZWFyY2hUZXJtcy5sZW5ndGggPT09IDEpID8gc2VhcmNoVGVybXNbMF0gOiAnJztcclxuICAgICAgICBpZiAodHlwZW9mIGZpZWxkU2VhcmNoVmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICBmaWVsZFNlYXJjaFZhbHVlID0gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGZpZWxkU2VhcmNoVmFsdWUgIT09ICdzdHJpbmcnICYmICFzZWFyY2hUZXJtcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBHcmFwaFFMIGZpbHRlciBzZWFyY2hUZXJtIHByb3BlcnR5IG11c3QgYmUgcHJvdmlkZWQgYXMgdHlwZSBcInN0cmluZ1wiLCBpZiB5b3UgdXNlIGZpbHRlciB3aXRoIG9wdGlvbnMgdGhlbiBtYWtlIHN1cmUgeW91ciBJRHMgYXJlIGFsc28gc3RyaW5nLiBGb3IgZXhhbXBsZTogZmlsdGVyOiB7bW9kZWw6IEZpbHRlcnMuc2VsZWN0LCBjb2xsZWN0aW9uOiBbeyBpZDogXCIwXCIsIHZhbHVlOiBcIjBcIiB9LCB7IGlkOiBcIjFcIiwgdmFsdWU6IFwiMVwiIH1dYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmaWVsZFNlYXJjaFZhbHVlID0gJycgKyBmaWVsZFNlYXJjaFZhbHVlOyAvLyBtYWtlIHN1cmUgaXQncyBhIHN0cmluZ1xyXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBmaWVsZFNlYXJjaFZhbHVlLm1hdGNoKC9eKFs8PiE9XFwqXXswLDJ9KSguKltePD4hPVxcKl0pKFtcXCpdPykkLyk7IC8vIGdyb3VwIDE6IE9wZXJhdG9yLCAyOiBzZWFyY2hWYWx1ZSwgMzogbGFzdCBjaGFyIGlzICcqJyAobWVhbmluZyBzdGFydHMgd2l0aCwgZXguOiBhYmMqKVxyXG4gICAgICAgIGxldCBvcGVyYXRvciA9IGNvbHVtbkZpbHRlci5vcGVyYXRvciB8fCAoKG1hdGNoZXMpID8gbWF0Y2hlc1sxXSA6ICcnKTtcclxuICAgICAgICBzZWFyY2hWYWx1ZSA9ICghIW1hdGNoZXMpID8gbWF0Y2hlc1syXSA6ICcnO1xyXG4gICAgICAgIGNvbnN0IGxhc3RWYWx1ZUNoYXIgPSAoISFtYXRjaGVzKSA/IG1hdGNoZXNbM10gOiAob3BlcmF0b3IgPT09ICcqeicgPyAnKicgOiAnJyk7XHJcblxyXG4gICAgICAgIC8vIG5vIG5lZWQgdG8gcXVlcnkgaWYgc2VhcmNoIHZhbHVlIGlzIGVtcHR5XHJcbiAgICAgICAgaWYgKGZpZWxkTmFtZSAmJiBzZWFyY2hWYWx1ZSA9PT0gJycgJiYgc2VhcmNoVGVybXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHdoZW4gaGF2aW5nIG1vcmUgdGhhbiAxIHNlYXJjaCB0ZXJtICh3ZSBuZWVkIHRvIGNyZWF0ZSBhIENTViBzdHJpbmcgZm9yIEdyYXBoUUwgXCJJTlwiIG9yIFwiTk9UIElOXCIgZmlsdGVyIHNlYXJjaClcclxuICAgICAgICBpZiAoc2VhcmNoVGVybXMgJiYgc2VhcmNoVGVybXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgc2VhcmNoVmFsdWUgPSBzZWFyY2hUZXJtcy5qb2luKCcsJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VhcmNoVmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAvLyBlc2NhcGluZyB0aGUgc2VhcmNoIHZhbHVlXHJcbiAgICAgICAgICBzZWFyY2hWYWx1ZSA9IHNlYXJjaFZhbHVlLnJlcGxhY2UoYCdgLCBgJydgKTsgLy8gZXNjYXBlIHNpbmdsZSBxdW90ZXMgYnkgZG91YmxpbmcgdGhlbVxyXG4gICAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnKicgfHwgb3BlcmF0b3IgPT09ICdhKicgfHwgb3BlcmF0b3IgPT09ICcqeicgfHwgbGFzdFZhbHVlQ2hhciA9PT0gJyonKSB7XHJcbiAgICAgICAgICAgIG9wZXJhdG9yID0gKG9wZXJhdG9yID09PSAnKicgfHwgb3BlcmF0b3IgPT09ICcqeicpID8gJ2VuZHNXaXRoJyA6ICdzdGFydHNXaXRoJztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmIHdlIGRpZG4ndCBmaW5kIGFuIE9wZXJhdG9yIGJ1dCB3ZSBoYXZlIGEgRmlsdGVyIFR5cGUsIHdlIHNob3VsZCB1c2UgZGVmYXVsdCBPcGVyYXRvclxyXG4gICAgICAgIC8vIG11bHRpcGxlU2VsZWN0IGlzIFwiSU5cIiwgd2hpbGUgc2luZ2xlU2VsZWN0IGlzIFwiRVFcIiwgZWxzZSBkb24ndCBtYXAgYW55IG9wZXJhdG9yXHJcbiAgICAgICAgaWYgKCFvcGVyYXRvciAmJiBjb2x1bW5EZWYuZmlsdGVyKSB7XHJcbiAgICAgICAgICBvcGVyYXRvciA9IGNvbHVtbkRlZi5maWx0ZXIub3BlcmF0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZiB3ZSBzdGlsbCBkb24ndCBoYXZlIGFuIG9wZXJhdG9yIGZpbmQgdGhlIHByb3BlciBPcGVyYXRvciB0byB1c2UgYnkgaXQncyBmaWVsZCB0eXBlXHJcbiAgICAgICAgaWYgKCFvcGVyYXRvcikge1xyXG4gICAgICAgICAgb3BlcmF0b3IgPSBtYXBPcGVyYXRvckJ5RmllbGRUeXBlKGNvbHVtbkRlZi50eXBlIHx8IEZpZWxkVHlwZS5zdHJpbmcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VhcmNoQnlBcnJheS5wdXNoKHtcclxuICAgICAgICAgIGZpZWxkOiBmaWVsZE5hbWUsXHJcbiAgICAgICAgICBvcGVyYXRvcjogbWFwT3BlcmF0b3JUeXBlKG9wZXJhdG9yKSxcclxuICAgICAgICAgIHZhbHVlOiBzZWFyY2hWYWx1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIHRoZSBzZXJ2aWNlIG9wdGlvbnMgd2l0aCBmaWx0ZXJzIGZvciB0aGUgYnVpbGRRdWVyeSgpIHRvIHdvcmsgbGF0ZXJcclxuICAgIHRoaXMudXBkYXRlT3B0aW9ucyh7IGZpbHRlcmluZ09wdGlvbnM6IHNlYXJjaEJ5QXJyYXkgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIHBhZ2luYXRpb24gY29tcG9uZW50IHdpdGggaXQncyBuZXcgcGFnZSBudW1iZXIgYW5kIHNpemVcclxuICAgKiBAcGFyYW0gbmV3UGFnZVxyXG4gICAqIEBwYXJhbSBwYWdlU2l6ZVxyXG4gICAqL1xyXG4gIHVwZGF0ZVBhZ2luYXRpb24obmV3UGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9jdXJyZW50UGFnaW5hdGlvbiA9IHtcclxuICAgICAgcGFnZU51bWJlcjogbmV3UGFnZSxcclxuICAgICAgcGFnZVNpemVcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHBhZ2luYXRpb25PcHRpb25zO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pc1dpdGhDdXJzb3IpIHtcclxuICAgICAgcGFnaW5hdGlvbk9wdGlvbnMgPSB7XHJcbiAgICAgICAgZmlyc3Q6IHBhZ2VTaXplXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwYWdpbmF0aW9uT3B0aW9ucyA9IHtcclxuICAgICAgICBmaXJzdDogcGFnZVNpemUsXHJcbiAgICAgICAgb2Zmc2V0OiAobmV3UGFnZSAtIDEpICogcGFnZVNpemVcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoeyBwYWdpbmF0aW9uT3B0aW9ucyB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1ucyB0byBpbnNwZWN0IHNvcnRlcnMgJiB1cGRhdGUgYmFja2VuZCBzZXJ2aWNlIHNvcnRpbmdPcHRpb25zXHJcbiAgICogQHBhcmFtIGNvbHVtbkZpbHRlcnNcclxuICAgKi9cclxuICB1cGRhdGVTb3J0ZXJzKHNvcnRDb2x1bW5zPzogQ29sdW1uU29ydFtdLCBwcmVzZXRTb3J0ZXJzPzogQ3VycmVudFNvcnRlcltdKSB7XHJcbiAgICBsZXQgY3VycmVudFNvcnRlcnM6IEN1cnJlbnRTb3J0ZXJbXSA9IFtdO1xyXG4gICAgY29uc3QgZ3JhcGhxbFNvcnRlcnM6IEdyYXBocWxTb3J0aW5nT3B0aW9uW10gPSBbXTtcclxuXHJcbiAgICBpZiAoIXNvcnRDb2x1bW5zICYmIHByZXNldFNvcnRlcnMpIHtcclxuICAgICAgLy8gbWFrZSB0aGUgcHJlc2V0cyB0aGUgY3VycmVudCBzb3J0ZXJzLCBhbHNvIG1ha2Ugc3VyZSB0aGF0IGFsbCBkaXJlY3Rpb24gYXJlIGluIHVwcGVyY2FzZSBmb3IgR3JhcGhRTFxyXG4gICAgICBjdXJyZW50U29ydGVycyA9IHByZXNldFNvcnRlcnM7XHJcbiAgICAgIGN1cnJlbnRTb3J0ZXJzLmZvckVhY2goKHNvcnRlcikgPT4gc29ydGVyLmRpcmVjdGlvbiA9IHNvcnRlci5kaXJlY3Rpb24udG9VcHBlckNhc2UoKSBhcyBTb3J0RGlyZWN0aW9uU3RyaW5nKTtcclxuXHJcbiAgICAgIC8vIGRpc3BsYXkgdGhlIGNvcnJlY3Qgc29ydGluZyBpY29ucyBvbiB0aGUgVUksIGZvciB0aGF0IGl0IHJlcXVpcmVzIChjb2x1bW5JZCwgc29ydEFzYykgcHJvcGVydGllc1xyXG4gICAgICBjb25zdCB0bXBTb3J0ZXJBcnJheSA9IGN1cnJlbnRTb3J0ZXJzLm1hcCgoc29ydGVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29sdW1uRGVmID0gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMuZmluZCgoY29sdW1uOiBDb2x1bW4pID0+IGNvbHVtbi5pZCA9PT0gc29ydGVyLmNvbHVtbklkKTtcclxuXHJcbiAgICAgICAgZ3JhcGhxbFNvcnRlcnMucHVzaCh7XHJcbiAgICAgICAgICBmaWVsZDogY29sdW1uRGVmID8gKChjb2x1bW5EZWYucXVlcnlGaWVsZCB8fCBjb2x1bW5EZWYucXVlcnlGaWVsZFNvcnRlciB8fCBjb2x1bW5EZWYuZmllbGQgfHwgY29sdW1uRGVmLmlkKSArICcnKSA6IChzb3J0ZXIuY29sdW1uSWQgKyAnJyksXHJcbiAgICAgICAgICBkaXJlY3Rpb246IHNvcnRlci5kaXJlY3Rpb25cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gcmV0dXJuIG9ubHkgdGhlIGNvbHVtbihzKSBmb3VuZCBpbiB0aGUgQ29sdW1uIERlZmluaXRpb25zIEVMU0UgbnVsbFxyXG4gICAgICAgIGlmIChjb2x1bW5EZWYpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbklkOiBzb3J0ZXIuY29sdW1uSWQsXHJcbiAgICAgICAgICAgIHNvcnRBc2M6IHNvcnRlci5kaXJlY3Rpb24udG9VcHBlckNhc2UoKSA9PT0gU29ydERpcmVjdGlvbi5BU0NcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIHNldCB0aGUgc29ydCBpY29ucywgYnV0IGFsc28gbWFrZSBzdXJlIHRvIGZpbHRlciBvdXQgbnVsbCB2YWx1ZXMgKGhhcHBlbnMgd2hlbiBubyBjb2x1bW5EZWYgZm91bmQpXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRtcFNvcnRlckFycmF5KSkge1xyXG4gICAgICAgIHRoaXMuX2dyaWQuc2V0U29ydENvbHVtbnModG1wU29ydGVyQXJyYXkuZmlsdGVyKChzb3J0ZXIpID0+IHNvcnRlcikpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHNvcnRDb2x1bW5zICYmICFwcmVzZXRTb3J0ZXJzKSB7XHJcbiAgICAgIC8vIGJ1aWxkIHRoZSBvcmRlckJ5IGFycmF5LCBpdCBjb3VsZCBiZSBtdWx0aXNvcnQsIGV4YW1wbGVcclxuICAgICAgLy8gb3JkZXJCeTpbe2ZpZWxkOiBsYXN0TmFtZSwgZGlyZWN0aW9uOiBBU0N9LCB7ZmllbGQ6IGZpcnN0TmFtZSwgZGlyZWN0aW9uOiBERVNDfV1cclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc29ydENvbHVtbnMpICYmIHNvcnRDb2x1bW5zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBzb3J0Q29sdW1ucykge1xyXG4gICAgICAgICAgaWYgKGNvbHVtbiAmJiBjb2x1bW4uc29ydENvbCkge1xyXG4gICAgICAgICAgICBjdXJyZW50U29ydGVycy5wdXNoKHtcclxuICAgICAgICAgICAgICBjb2x1bW5JZDogY29sdW1uLnNvcnRDb2wuaWQgKyAnJyxcclxuICAgICAgICAgICAgICBkaXJlY3Rpb246IGNvbHVtbi5zb3J0QXNjID8gU29ydERpcmVjdGlvbi5BU0MgOiBTb3J0RGlyZWN0aW9uLkRFU0NcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBncmFwaHFsU29ydGVycy5wdXNoKHtcclxuICAgICAgICAgICAgICBmaWVsZDogKGNvbHVtbi5zb3J0Q29sLnF1ZXJ5RmllbGQgfHwgY29sdW1uLnNvcnRDb2wucXVlcnlGaWVsZFNvcnRlciB8fCBjb2x1bW4uc29ydENvbC5maWVsZCB8fCBjb2x1bW4uc29ydENvbC5pZCkgKyAnJyxcclxuICAgICAgICAgICAgICBkaXJlY3Rpb246IGNvbHVtbi5zb3J0QXNjID8gU29ydERpcmVjdGlvbi5BU0MgOiBTb3J0RGlyZWN0aW9uLkRFU0NcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8ga2VlcCBjdXJyZW50IFNvcnRlcnMgYW5kIHVwZGF0ZSB0aGUgc2VydmljZSBvcHRpb25zIHdpdGggdGhlIG5ldyBzb3J0aW5nXHJcbiAgICB0aGlzLl9jdXJyZW50U29ydGVycyA9IGN1cnJlbnRTb3J0ZXJzO1xyXG4gICAgdGhpcy51cGRhdGVPcHRpb25zKHsgc29ydGluZ09wdGlvbnM6IGdyYXBocWxTb3J0ZXJzIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQSBmdW5jdGlvbiB3aGljaCB0YWtlcyBhbiBpbnB1dCBzdHJpbmcgYW5kIHJlbW92ZXMgZG91YmxlIHF1b3RlcyBvbmx5XHJcbiAgICogb24gY2VydGFpbiBmaWVsZHMgYXJlIGlkZW50aWZpZWQgYXMgR3JhcGhRTCBlbnVtcyAoZXhjZXB0IGZpZWxkcyB3aXRoIGRvdCBub3RhdGlvbilcclxuICAgKiBGb3IgZXhhbXBsZSBsZXQgc2F5IHdlIGlkZW50aWZpZWQgKFwiZGlyZWN0aW9uOlwiLCBcInNvcnRcIikgYXMgd29yZCB3aGljaCBhcmUgR3JhcGhRTCBlbnVtIGZpZWxkc1xyXG4gICAqIHRoZW4gdGhlIHJlc3VsdCB3aWxsIGJlOlxyXG4gICAqIEZST01cclxuICAgKiBxdWVyeSB7IHVzZXJzIChvcmRlckJ5Olt7ZmllbGQ6XCJmaXJzdE5hbWVcIiwgZGlyZWN0aW9uOlwiQVNDXCJ9IH1dKSB9XHJcbiAgICogVE9cclxuICAgKiBxdWVyeSB7IHVzZXJzIChvcmRlckJ5Olt7ZmllbGQ6IGZpcnN0TmFtZSwgZGlyZWN0aW9uOiBBU0N9fSl9XHJcbiAgICpcclxuICAgKiBFWENFUFRJT05TIChmaWVsZHMgd2l0aCBkb3Qgbm90YXRpb24gXCIuXCIgd2hpY2ggYXJlIGluc2lkZSBhIFwiZmllbGQ6XCIpXHJcbiAgICogdGhlc2UgZmllbGRzIHdpbGwga2VlcCBkb3VibGUgcXVvdGVzIHdoaWxlIGV2ZXJ5dGhpbmcgZWxzZSB3aWxsIGJlIHN0cmlwcGVkIG9mIGRvdWJsZSBxdW90ZXNcclxuICAgKiBxdWVyeSB7IHVzZXJzIChvcmRlckJ5Olt7ZmllbGQ6XCJiaWxsaW5nLnN0cmVldC5uYW1lXCIsIGRpcmVjdGlvbjogXCJBU0NcIn0gfVxyXG4gICAqIFRPXHJcbiAgICogcXVlcnkgeyB1c2VycyAob3JkZXJCeTpbe2ZpZWxkOlwiYmlsbGluZy5zdHJlZXQubmFtZVwiLCBkaXJlY3Rpb246IEFTQ319XHJcbiAgICogQHBhcmFtIGlucHV0U3RyIGlucHV0IHN0cmluZ1xyXG4gICAqIEBwYXJhbSBlbnVtU2VhcmNoV29yZHMgYXJyYXkgb2YgZW51bSB3b3JkcyB0byBmaWx0ZXJcclxuICAgKiBAcmV0dXJucyBvdXRwdXRTdHIgb3V0cHV0IHN0cmluZ1xyXG4gICAqL1xyXG4gIHRyaW1Eb3VibGVRdW90ZXNPbkVudW1GaWVsZChpbnB1dFN0cjogc3RyaW5nLCBlbnVtU2VhcmNoV29yZHM6IHN0cmluZ1tdLCBrZWVwQXJndW1lbnRGaWVsZERvdWJsZVF1b3RlczogYm9vbGVhbikge1xyXG4gICAgY29uc3QgcGF0dGVybldvcmRJblF1b3RlcyA9IGBcXHM/KChmaWVsZDpcXHMqKT9cIi4qP1wiKWA7XHJcbiAgICBsZXQgcGF0dGVyblJlZ2V4ID0gZW51bVNlYXJjaFdvcmRzLmpvaW4ocGF0dGVybldvcmRJblF1b3RlcyArICd8Jyk7XHJcbiAgICBwYXR0ZXJuUmVnZXggKz0gcGF0dGVybldvcmRJblF1b3RlczsgLy8gdGhlIGxhc3Qgb25lIHNob3VsZCBhbHNvIGhhdmUgdGhlIHBhdHRlcm4gYnV0IHdpdGhvdXQgdGhlIHBpcGUgXCJ8XCJcclxuICAgIC8vIGV4YW1wbGUgd2l0aCAoZmllbGQ6ICYgZGlyZWN0aW9uOik6ICAvZmllbGQ6cz8oXCIuKj9cIil8ZGlyZWN0aW9uOnM/KFwiLio/XCIpL1xyXG4gICAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cChwYXR0ZXJuUmVnZXgsICdnJyk7XHJcblxyXG4gICAgcmV0dXJuIGlucHV0U3RyLnJlcGxhY2UocmVnLCAoZ3JvdXAxLCBncm91cDIsIGdyb3VwMykgPT4ge1xyXG4gICAgICAvLyByZW1vdmUgZG91YmxlIHF1b3RlcyBleGNlcHQgd2hlbiB0aGUgc3RyaW5nIHN0YXJ0cyB3aXRoIGEgXCJmaWVsZDpcIlxyXG4gICAgICBsZXQgcmVtb3ZlRG91YmxlUXVvdGVzID0gdHJ1ZTtcclxuICAgICAgaWYgKGdyb3VwMS5zdGFydHNXaXRoKCdmaWVsZDonKSAmJiBrZWVwQXJndW1lbnRGaWVsZERvdWJsZVF1b3Rlcykge1xyXG4gICAgICAgIHJlbW92ZURvdWJsZVF1b3RlcyA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHJlcCA9IHJlbW92ZURvdWJsZVF1b3RlcyA/IGdyb3VwMS5yZXBsYWNlKC9cIi9nLCAnJykgOiBncm91cDE7XHJcbiAgICAgIHJldHVybiByZXA7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vXHJcbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLyoqXHJcbiAgICogQ2FzdCBwcm92aWRlZCBmaWx0ZXJzIChjb3VsZCBiZSBpbiBtdWx0aXBsZSBmb3JtYXQpIGludG8gYW4gYXJyYXkgb2YgQ29sdW1uRmlsdGVyXHJcbiAgICogQHBhcmFtIGNvbHVtbkZpbHRlcnNcclxuICAgKi9cclxuICBwcml2YXRlIGNhc3RGaWx0ZXJUb0NvbHVtbkZpbHRlcihjb2x1bW5GaWx0ZXJzOiBDb2x1bW5GaWx0ZXJzIHwgQ3VycmVudEZpbHRlcltdKTogQ3VycmVudEZpbHRlcltdIHtcclxuICAgIC8vIGtlZXAgY3VycmVudCBmaWx0ZXJzICYgYWx3YXlzIHNhdmUgaXQgYXMgYW4gYXJyYXkgKGNvbHVtbkZpbHRlcnMgY2FuIGJlIGFuIG9iamVjdCB3aGVuIGl0IGlzIGRlYWx0IGJ5IFNsaWNrR3JpZCBGaWx0ZXIpXHJcbiAgICBjb25zdCBmaWx0ZXJzQXJyYXk6IENvbHVtbkZpbHRlcltdID0gKHR5cGVvZiBjb2x1bW5GaWx0ZXJzID09PSAnb2JqZWN0JykgPyBPYmplY3Qua2V5cyhjb2x1bW5GaWx0ZXJzKS5tYXAoa2V5ID0+IGNvbHVtbkZpbHRlcnNba2V5XSkgOiBjb2x1bW5GaWx0ZXJzO1xyXG5cclxuICAgIHJldHVybiBmaWx0ZXJzQXJyYXkubWFwKChmaWx0ZXIpID0+IHtcclxuICAgICAgY29uc3QgdG1wRmlsdGVyOiBDdXJyZW50RmlsdGVyID0geyBjb2x1bW5JZDogZmlsdGVyLmNvbHVtbklkIHx8ICcnIH07XHJcbiAgICAgIGlmIChmaWx0ZXIub3BlcmF0b3IpIHtcclxuICAgICAgICB0bXBGaWx0ZXIub3BlcmF0b3IgPSBmaWx0ZXIub3BlcmF0b3I7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyLnNlYXJjaFRlcm1zKSkge1xyXG4gICAgICAgIHRtcEZpbHRlci5zZWFyY2hUZXJtcyA9IGZpbHRlci5zZWFyY2hUZXJtcztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG1wRmlsdGVyO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==