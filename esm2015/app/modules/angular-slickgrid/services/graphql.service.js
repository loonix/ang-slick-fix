/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { mapOperatorType, mapOperatorByFieldType } from './utilities';
import { FieldType, SortDirection } from './../models/index';
import QueryBuilder from './graphqlQueryBuilder';
/** @type {?} */
const DEFAULT_ITEMS_PER_PAGE = 25;
/** @type {?} */
const DEFAULT_PAGE_SIZE = 20;
export class GraphqlService {
    constructor() {
        this._currentFilters = [];
        this._currentSorters = [];
        this.defaultPaginationOptions = {
            first: DEFAULT_ITEMS_PER_PAGE,
            offset: 0
        };
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
     * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
     * @return {?}
     */
    buildQuery() {
        if (!this.options || !this.options.datasetName || (!this._columnDefinitions && !this.options.columnDefinitions)) {
            throw new Error('GraphQL Service requires "datasetName" & "columnDefinitions" properties for it to work');
        }
        // get the column definitions and exclude some if they were tagged as excluded
        /** @type {?} */
        let columnDefinitions = this._columnDefinitions || this.options.columnDefinitions;
        columnDefinitions = columnDefinitions.filter((/**
         * @param {?} column
         * @return {?}
         */
        (column) => !column.excludeFromQuery));
        /** @type {?} */
        const queryQb = new QueryBuilder('query');
        /** @type {?} */
        const datasetQb = new QueryBuilder(this.options.datasetName);
        /** @type {?} */
        const dataQb = (this.options.isWithCursor) ? new QueryBuilder('edges') : new QueryBuilder('nodes');
        // get all the columnds Ids for the filters to work
        /** @type {?} */
        let columnIds = [];
        if (columnDefinitions && Array.isArray(columnDefinitions)) {
            for (const column of columnDefinitions) {
                columnIds.push(column.field);
                // if extra "fields" are passed, also push them to columnIds
                if (column.fields) {
                    columnIds.push(...column.fields);
                }
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
        const filters = this.buildFilterQuery(columnIds);
        if (this.options.isWithCursor) {
            // ...pageInfo { hasNextPage, endCursor }, edges { cursor, node { _filters_ } }
            /** @type {?} */
            const pageInfoQb = new QueryBuilder('pageInfo');
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
        let datasetFilters = {};
        // only add pagination if it's enabled in the grid options
        if (this._gridOptions.enablePagination !== false) {
            datasetFilters = Object.assign({}, this.options.paginationOptions, { first: ((this.options.paginationOptions && this.options.paginationOptions.first) ? this.options.paginationOptions.first : ((this.pagination && this.pagination.pageSize) ? this.pagination.pageSize : null)) || this.defaultPaginationOptions.first });
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
            // first: 20, ... userId: 123
            for (const queryArgument of this.options.extraQueryArguments) {
                datasetFilters[queryArgument.field] = queryArgument.value;
            }
        }
        // query { users(first: 20, orderBy: [], filterBy: [])}
        datasetQb.filter(datasetFilters);
        queryQb.find(datasetQb);
        /** @type {?} */
        const enumSearchProperties = ['direction:', 'field:', 'operator:'];
        return this.trimDoubleQuotesOnEnumField(queryQb.toString(), enumSearchProperties, this.options.keepArgumentFieldDoubleQuotes || false);
    }
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
    buildFilterQuery(inputArray) {
        /** @type {?} */
        const set = (/**
         * @param {?=} o
         * @param {?=} a
         * @return {?}
         */
        (o = {}, a) => {
            /** @type {?} */
            const k = a.shift();
            o[k] = a.length ? set(o[k], a) : null;
            return o;
        });
        /** @type {?} */
        const output = inputArray.reduce((/**
         * @param {?} o
         * @param {?} a
         * @return {?}
         */
        (o, a) => set(o, a.split('.'))), {});
        return JSON.stringify(output)
            .replace(/\"|\:|null/g, '')
            .replace(/^\{/, '')
            .replace(/\}$/, '');
    }
    /**
     * @return {?}
     */
    clearFilters() {
        this._currentFilters = [];
        this.updateOptions({ filteringOptions: [] });
    }
    /**
     * @return {?}
     */
    clearSorters() {
        this._currentSorters = [];
        this.updateOptions({ sortingOptions: [] });
    }
    /**
     * @param {?=} serviceOptions
     * @param {?=} pagination
     * @param {?=} grid
     * @return {?}
     */
    init(serviceOptions, pagination, grid) {
        this._grid = grid;
        this.options = serviceOptions || {};
        this.pagination = pagination;
        if (grid && grid.getColumns) {
            this._columnDefinitions = serviceOptions.columnDefinitions || grid.getColumns();
        }
    }
    /**
     * Get an initialization of Pagination options
     * @return {?} Pagination Options
     */
    getInitPaginationOptions() {
        return (this.options.isWithCursor) ? { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE) } : { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE), offset: 0 };
    }
    /**
     * Get the GraphQL dataset name
     * @return {?}
     */
    getDatasetName() {
        return this.options.datasetName || '';
    }
    /**
     * Get the Filters that are currently used by the grid
     * @return {?}
     */
    getCurrentFilters() {
        return this._currentFilters;
    }
    /**
     * Get the Pagination that is currently used by the grid
     * @return {?}
     */
    getCurrentPagination() {
        return this._currentPagination;
    }
    /**
     * Get the Sorters that are currently used by the grid
     * @return {?}
     */
    getCurrentSorters() {
        return this._currentSorters;
    }
    /*
       * Reset the pagination options
       */
    /**
     * @return {?}
     */
    resetPaginationOptions() {
        /** @type {?} */
        let paginationOptions;
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
        this.updateOptions({ paginationOptions });
    }
    /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    updateOptions(serviceOptions) {
        this.options = Object.assign({}, this.options, serviceOptions);
    }
    /*
       * FILTERING
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    processOnFilterChanged(event, args) {
        /** @type {?} */
        const gridOptions = this._gridOptions || args.grid.getOptions();
        /** @type {?} */
        const backendApi = gridOptions.backendServiceApi;
        if (backendApi === undefined) {
            throw new Error('Something went wrong in the GraphqlService, "backendServiceApi" is not initialized');
        }
        // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
        this._currentFilters = this.castFilterToColumnFilter(args.columnFilters);
        /** @type {?} */
        const promise = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            if (!args || !args.grid) {
                throw new Error('Something went wrong when trying create the GraphQL Backend Service, it seems that "args" is not populated correctly');
            }
            // loop through all columns to inspect filters & set the query
            this.updateFilters(args.columnFilters, false);
            this.resetPaginationOptions();
            resolve(this.buildQuery());
        }));
        return promise;
    }
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
    processOnPaginationChanged(event, args) {
        /** @type {?} */
        const pageSize = +(args.pageSize || ((this.pagination) ? this.pagination.pageSize : DEFAULT_PAGE_SIZE));
        this.updatePagination(args.newPage, pageSize);
        // build the GraphQL query which we will use in the WebAPI callback
        return this.buildQuery();
    }
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
    processOnSortChanged(event, args) {
        /** @type {?} */
        const sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });
        // loop through all columns to inspect sorters & set the query
        this.updateSorters(sortColumns);
        // build the GraphQL query which we will use in the WebAPI callback
        return this.buildQuery();
    }
    /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param {?} columnFilters
     * @param {?} isUpdatedByPreset
     * @return {?}
     */
    updateFilters(columnFilters, isUpdatedByPreset) {
        /** @type {?} */
        const searchByArray = [];
        /** @type {?} */
        let searchValue;
        // on filter preset load, we need to keep current filters
        if (isUpdatedByPreset) {
            this._currentFilters = this.castFilterToColumnFilter(columnFilters);
        }
        for (const columnId in columnFilters) {
            if (columnFilters.hasOwnProperty(columnId)) {
                /** @type {?} */
                const columnFilter = columnFilters[columnId];
                // if user defined some "presets", then we need to find the filters from the column definitions instead
                /** @type {?} */
                let columnDef;
                if (isUpdatedByPreset && Array.isArray(this._columnDefinitions)) {
                    columnDef = this._columnDefinitions.find((/**
                     * @param {?} column
                     * @return {?}
                     */
                    (column) => column.id === columnFilter.columnId));
                }
                else {
                    columnDef = columnFilter.columnDef;
                }
                if (!columnDef) {
                    throw new Error('[Backend Service API]: Something went wrong in trying to get the column definition of the specified filter (or preset filters). Did you make a typo on the filter columnId?');
                }
                /** @type {?} */
                const fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field || columnDef.name || '';
                /** @type {?} */
                const searchTerms = (columnFilter ? columnFilter.searchTerms : null) || [];
                /** @type {?} */
                let fieldSearchValue = (Array.isArray(searchTerms) && searchTerms.length === 1) ? searchTerms[0] : '';
                if (typeof fieldSearchValue === 'undefined') {
                    fieldSearchValue = '';
                }
                if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                    throw new Error(`GraphQL filter searchTerm property must be provided as type "string", if you use filter with options then make sure your IDs are also string. For example: filter: {model: Filters.select, collection: [{ id: "0", value: "0" }, { id: "1", value: "1" }]`);
                }
                fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                // make sure it's a string
                /** @type {?} */
                const matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/);
                // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                /** @type {?} */
                let operator = columnFilter.operator || ((matches) ? matches[1] : '');
                searchValue = (!!matches) ? matches[2] : '';
                /** @type {?} */
                const lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                // no need to query if search value is empty
                if (fieldName && searchValue === '' && searchTerms.length === 0) {
                    continue;
                }
                // when having more than 1 search term (we need to create a CSV string for GraphQL "IN" or "NOT IN" filter search)
                if (searchTerms && searchTerms.length > 1) {
                    searchValue = searchTerms.join(',');
                }
                else if (typeof searchValue === 'string') {
                    // escaping the search value
                    searchValue = searchValue.replace(`'`, `''`); // escape single quotes by doubling them
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
        }
        // update the service options with filters for the buildQuery() to work later
        this.updateOptions({ filteringOptions: searchByArray });
    }
    /**
     * Update the pagination component with it's new page number and size
     * @param {?} newPage
     * @param {?} pageSize
     * @return {?}
     */
    updatePagination(newPage, pageSize) {
        this._currentPagination = {
            pageNumber: newPage,
            pageSize
        };
        /** @type {?} */
        let paginationOptions;
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
        this.updateOptions({ paginationOptions });
    }
    /**
     * loop through all columns to inspect sorters & update backend service sortingOptions
     * @param {?=} sortColumns
     * @param {?=} presetSorters
     * @return {?}
     */
    updateSorters(sortColumns, presetSorters) {
        /** @type {?} */
        let currentSorters = [];
        /** @type {?} */
        const graphqlSorters = [];
        if (!sortColumns && presetSorters) {
            // make the presets the current sorters, also make sure that all direction are in uppercase for GraphQL
            currentSorters = presetSorters;
            currentSorters.forEach((/**
             * @param {?} sorter
             * @return {?}
             */
            (sorter) => sorter.direction = (/** @type {?} */ (sorter.direction.toUpperCase()))));
            // display the correct sorting icons on the UI, for that it requires (columnId, sortAsc) properties
            /** @type {?} */
            const tmpSorterArray = currentSorters.map((/**
             * @param {?} sorter
             * @return {?}
             */
            (sorter) => {
                /** @type {?} */
                const columnDef = this._columnDefinitions.find((/**
                 * @param {?} column
                 * @return {?}
                 */
                (column) => column.id === sorter.columnId));
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
                (sorter) => sorter)));
            }
        }
        else if (sortColumns && !presetSorters) {
            // build the orderBy array, it could be multisort, example
            // orderBy:[{field: lastName, direction: ASC}, {field: firstName, direction: DESC}]
            if (Array.isArray(sortColumns) && sortColumns.length > 0) {
                for (const column of sortColumns) {
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
        }
        // keep current Sorters and update the service options with the new sorting
        this._currentSorters = currentSorters;
        this.updateOptions({ sortingOptions: graphqlSorters });
    }
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
    trimDoubleQuotesOnEnumField(inputStr, enumSearchWords, keepArgumentFieldDoubleQuotes) {
        /** @type {?} */
        const patternWordInQuotes = `\s?((field:\s*)?".*?")`;
        /** @type {?} */
        let patternRegex = enumSearchWords.join(patternWordInQuotes + '|');
        patternRegex += patternWordInQuotes; // the last one should also have the pattern but without the pipe "|"
        // the last one should also have the pattern but without the pipe "|"
        // example with (field: & direction:):  /field:s?(".*?")|direction:s?(".*?")/
        /** @type {?} */
        const reg = new RegExp(patternRegex, 'g');
        return inputStr.replace(reg, (/**
         * @param {?} group1
         * @param {?} group2
         * @param {?} group3
         * @return {?}
         */
        (group1, group2, group3) => {
            // remove double quotes except when the string starts with a "field:"
            /** @type {?} */
            let removeDoubleQuotes = true;
            if (group1.startsWith('field:') && keepArgumentFieldDoubleQuotes) {
                removeDoubleQuotes = false;
            }
            /** @type {?} */
            const rep = removeDoubleQuotes ? group1.replace(/"/g, '') : group1;
            return rep;
        }));
    }
    //
    // private functions
    // -------------------
    /**
     * Cast provided filters (could be in multiple format) into an array of ColumnFilter
     * @private
     * @param {?} columnFilters
     * @return {?}
     */
    castFilterToColumnFilter(columnFilters) {
        // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
        /** @type {?} */
        const filtersArray = (typeof columnFilters === 'object') ? Object.keys(columnFilters).map((/**
         * @param {?} key
         * @return {?}
         */
        key => columnFilters[key])) : columnFilters;
        return filtersArray.map((/**
         * @param {?} filter
         * @return {?}
         */
        (filter) => {
            /** @type {?} */
            const tmpFilter = { columnId: filter.columnId || '' };
            if (filter.operator) {
                tmpFilter.operator = filter.operator;
            }
            if (Array.isArray(filter.searchTerms)) {
                tmpFilter.searchTerms = filter.searchTerms;
            }
            return tmpFilter;
        }));
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9ncmFwaHFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdEUsT0FBTyxFQVNMLFNBQVMsRUFZVCxhQUFhLEVBRWQsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLFlBQVksTUFBTSx1QkFBdUIsQ0FBQzs7TUFFM0Msc0JBQXNCLEdBQUcsRUFBRTs7TUFDM0IsaUJBQWlCLEdBQUcsRUFBRTtBQUU1QixNQUFNLE9BQU8sY0FBYztJQUEzQjtRQUNVLG9CQUFlLEdBQW9DLEVBQUUsQ0FBQztRQUV0RCxvQkFBZSxHQUFvQixFQUFFLENBQUM7UUFLOUMsNkJBQXdCLEdBQTREO1lBQ2xGLEtBQUssRUFBRSxzQkFBc0I7WUFDN0IsTUFBTSxFQUFFLENBQUM7U0FDVixDQUFDO0lBb2dCSixDQUFDOzs7Ozs7SUFqZ0JDLElBQVksWUFBWTtRQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDOUUsQ0FBQzs7Ozs7SUFNRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQy9HLE1BQU0sSUFBSSxLQUFLLENBQUMsd0ZBQXdGLENBQUMsQ0FB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QU8sYUFBYSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUc7Ozs7UUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxhQUFhO1FBRXBKLE9BQU8sWUFBWSxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLE1BQU0sRUFBRSxFQUFFOztrQkFDM0IsU0FBUyxHQUFrQixFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxJQUFJLEVBQUUsRUFBRTtZQUNwRSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQ25CLFNBQVMsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQzthQUN0QztZQUNELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ3JDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQzthQUM1QztZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ25CLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGOzs7Ozs7SUE5Z0JDLHlDQUE4RDs7Ozs7SUFDOUQsNENBQThDOzs7OztJQUM5Qyx5Q0FBOEM7Ozs7O0lBQzlDLDRDQUFxQzs7Ozs7SUFDckMsK0JBQW1COztJQUNuQixpQ0FBOEI7O0lBQzlCLG9DQUFtQzs7SUFDbkMsa0RBR0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtYXBPcGVyYXRvclR5cGUsIG1hcE9wZXJhdG9yQnlGaWVsZFR5cGUgfSBmcm9tICcuL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7XHJcbiAgQmFja2VuZFNlcnZpY2UsXHJcbiAgQ29sdW1uLFxyXG4gIENvbHVtbkZpbHRlcixcclxuICBDb2x1bW5GaWx0ZXJzLFxyXG4gIENvbHVtblNvcnQsXHJcbiAgQ3VycmVudEZpbHRlcixcclxuICBDdXJyZW50UGFnaW5hdGlvbixcclxuICBDdXJyZW50U29ydGVyLFxyXG4gIEZpZWxkVHlwZSxcclxuICBGaWx0ZXJDaGFuZ2VkQXJncyxcclxuICBHcmFwaHFsQ3Vyc29yUGFnaW5hdGlvbk9wdGlvbixcclxuICBHcmFwaHFsRGF0YXNldEZpbHRlcixcclxuICBHcmFwaHFsRmlsdGVyaW5nT3B0aW9uLFxyXG4gIEdyYXBocWxQYWdpbmF0aW9uT3B0aW9uLFxyXG4gIEdyYXBocWxTZXJ2aWNlT3B0aW9uLFxyXG4gIEdyYXBocWxTb3J0aW5nT3B0aW9uLFxyXG4gIEdyaWRPcHRpb24sXHJcbiAgUGFnaW5hdGlvbixcclxuICBQYWdpbmF0aW9uQ2hhbmdlZEFyZ3MsXHJcbiAgU29ydENoYW5nZWRBcmdzLFxyXG4gIFNvcnREaXJlY3Rpb24sXHJcbiAgU29ydERpcmVjdGlvblN0cmluZ1xyXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IFF1ZXJ5QnVpbGRlciBmcm9tICcuL2dyYXBocWxRdWVyeUJ1aWxkZXInO1xyXG5cclxuY29uc3QgREVGQVVMVF9JVEVNU19QRVJfUEFHRSA9IDI1O1xyXG5jb25zdCBERUZBVUxUX1BBR0VfU0laRSA9IDIwO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdyYXBocWxTZXJ2aWNlIGltcGxlbWVudHMgQmFja2VuZFNlcnZpY2Uge1xyXG4gIHByaXZhdGUgX2N1cnJlbnRGaWx0ZXJzOiBDb2x1bW5GaWx0ZXJzIHwgQ3VycmVudEZpbHRlcltdID0gW107XHJcbiAgcHJpdmF0ZSBfY3VycmVudFBhZ2luYXRpb246IEN1cnJlbnRQYWdpbmF0aW9uO1xyXG4gIHByaXZhdGUgX2N1cnJlbnRTb3J0ZXJzOiBDdXJyZW50U29ydGVyW10gPSBbXTtcclxuICBwcml2YXRlIF9jb2x1bW5EZWZpbml0aW9uczogQ29sdW1uW107XHJcbiAgcHJpdmF0ZSBfZ3JpZDogYW55O1xyXG4gIG9wdGlvbnM6IEdyYXBocWxTZXJ2aWNlT3B0aW9uO1xyXG4gIHBhZ2luYXRpb246IFBhZ2luYXRpb24gfCB1bmRlZmluZWQ7XHJcbiAgZGVmYXVsdFBhZ2luYXRpb25PcHRpb25zOiBHcmFwaHFsUGFnaW5hdGlvbk9wdGlvbiB8IEdyYXBocWxDdXJzb3JQYWdpbmF0aW9uT3B0aW9uID0ge1xyXG4gICAgZmlyc3Q6IERFRkFVTFRfSVRFTVNfUEVSX1BBR0UsXHJcbiAgICBvZmZzZXQ6IDBcclxuICB9O1xyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByaXZhdGUgZ2V0IF9ncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcclxuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJ1aWxkIHRoZSBHcmFwaFFMIHF1ZXJ5LCBzaW5jZSB0aGUgc2VydmljZSBpbmNsdWRlL2V4Y2x1ZGUgY3Vyc29yLCB0aGUgb3V0cHV0IHF1ZXJ5IHdpbGwgYmUgZGlmZmVyZW50LlxyXG4gICAqIEBwYXJhbSBzZXJ2aWNlT3B0aW9ucyBHcmFwaHFsU2VydmljZU9wdGlvblxyXG4gICAqL1xyXG4gIGJ1aWxkUXVlcnkoKSB7XHJcbiAgICBpZiAoIXRoaXMub3B0aW9ucyB8fCAhdGhpcy5vcHRpb25zLmRhdGFzZXROYW1lIHx8ICghdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMgJiYgIXRoaXMub3B0aW9ucy5jb2x1bW5EZWZpbml0aW9ucykpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdHcmFwaFFMIFNlcnZpY2UgcmVxdWlyZXMgXCJkYXRhc2V0TmFtZVwiICYgXCJjb2x1bW5EZWZpbml0aW9uc1wiIHByb3BlcnRpZXMgZm9yIGl0IHRvIHdvcmsnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXQgdGhlIGNvbHVtbiBkZWZpbml0aW9ucyBhbmQgZXhjbHVkZSBzb21lIGlmIHRoZXkgd2VyZSB0YWdnZWQgYXMgZXhjbHVkZWRcclxuICAgIGxldCBjb2x1bW5EZWZpbml0aW9ucyA9IHRoaXMuX2NvbHVtbkRlZmluaXRpb25zIHx8IHRoaXMub3B0aW9ucy5jb2x1bW5EZWZpbml0aW9ucztcclxuICAgIGNvbHVtbkRlZmluaXRpb25zID0gY29sdW1uRGVmaW5pdGlvbnMuZmlsdGVyKChjb2x1bW46IENvbHVtbikgPT4gIWNvbHVtbi5leGNsdWRlRnJvbVF1ZXJ5KTtcclxuXHJcbiAgICBjb25zdCBxdWVyeVFiID0gbmV3IFF1ZXJ5QnVpbGRlcigncXVlcnknKTtcclxuICAgIGNvbnN0IGRhdGFzZXRRYiA9IG5ldyBRdWVyeUJ1aWxkZXIodGhpcy5vcHRpb25zLmRhdGFzZXROYW1lKTtcclxuICAgIGNvbnN0IGRhdGFRYiA9ICh0aGlzLm9wdGlvbnMuaXNXaXRoQ3Vyc29yKSA/IG5ldyBRdWVyeUJ1aWxkZXIoJ2VkZ2VzJykgOiBuZXcgUXVlcnlCdWlsZGVyKCdub2RlcycpO1xyXG5cclxuICAgIC8vIGdldCBhbGwgdGhlIGNvbHVtbmRzIElkcyBmb3IgdGhlIGZpbHRlcnMgdG8gd29ya1xyXG4gICAgbGV0IGNvbHVtbklkczogc3RyaW5nW10gPSBbXTtcclxuICAgIGlmIChjb2x1bW5EZWZpbml0aW9ucyAmJiBBcnJheS5pc0FycmF5KGNvbHVtbkRlZmluaXRpb25zKSkge1xyXG4gICAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBjb2x1bW5EZWZpbml0aW9ucykge1xyXG4gICAgICAgIGNvbHVtbklkcy5wdXNoKGNvbHVtbi5maWVsZCk7XHJcblxyXG4gICAgICAgIC8vIGlmIGV4dHJhIFwiZmllbGRzXCIgYXJlIHBhc3NlZCwgYWxzbyBwdXNoIHRoZW0gdG8gY29sdW1uSWRzXHJcbiAgICAgICAgaWYgKGNvbHVtbi5maWVsZHMpIHtcclxuICAgICAgICAgIGNvbHVtbklkcy5wdXNoKC4uLmNvbHVtbi5maWVsZHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyBjb2x1bW5JZHMgPSBjb2x1bW5EZWZpbml0aW9ucy5tYXAoKGNvbHVtbikgPT4gY29sdW1uLmZpZWxkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbHVtbklkcyA9IHRoaXMub3B0aW9ucy5jb2x1bW5JZHMgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2xpY2tncmlkIGFsc28gcmVxdWlyZXMgdGhlIFwiaWRcIiBmaWVsZCB0byBiZSBwYXJ0IG9mIERhdGFWaWV3XHJcbiAgICAvLyBhZGQgaXQgdG8gdGhlIEdyYXBoUUwgcXVlcnkgaWYgaXQgd2Fzbid0IGFscmVhZHkgcGFydCBvZiB0aGUgbGlzdFxyXG4gICAgaWYgKGNvbHVtbklkcy5pbmRleE9mKCdpZCcpID09PSAtMSkge1xyXG4gICAgICBjb2x1bW5JZHMudW5zaGlmdCgnaWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaWx0ZXJzID0gdGhpcy5idWlsZEZpbHRlclF1ZXJ5KGNvbHVtbklkcyk7XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pc1dpdGhDdXJzb3IpIHtcclxuICAgICAgLy8gLi4ucGFnZUluZm8geyBoYXNOZXh0UGFnZSwgZW5kQ3Vyc29yIH0sIGVkZ2VzIHsgY3Vyc29yLCBub2RlIHsgX2ZpbHRlcnNfIH0gfVxyXG4gICAgICBjb25zdCBwYWdlSW5mb1FiID0gbmV3IFF1ZXJ5QnVpbGRlcigncGFnZUluZm8nKTtcclxuICAgICAgcGFnZUluZm9RYi5maW5kKCdoYXNOZXh0UGFnZScsICdlbmRDdXJzb3InKTtcclxuICAgICAgZGF0YVFiLmZpbmQoWydjdXJzb3InLCB7IG5vZGU6IGZpbHRlcnMgfV0pO1xyXG4gICAgICBkYXRhc2V0UWIuZmluZChbJ3RvdGFsQ291bnQnLCBwYWdlSW5mb1FiLCBkYXRhUWJdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIC4uLm5vZGVzIHsgX2ZpbHRlcnNfIH1cclxuICAgICAgZGF0YVFiLmZpbmQoZmlsdGVycyk7XHJcbiAgICAgIGRhdGFzZXRRYi5maW5kKFsndG90YWxDb3VudCcsIGRhdGFRYl0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZCBkYXRhc2V0IGZpbHRlcnMsIGNvdWxkIGJlIFBhZ2luYXRpb24gYW5kIFNvcnRpbmdGaWx0ZXJzIGFuZC9vciBGaWVsZEZpbHRlcnNcclxuICAgIGxldCBkYXRhc2V0RmlsdGVyczogR3JhcGhxbERhdGFzZXRGaWx0ZXIgPSB7fTtcclxuXHJcbiAgICAvLyBvbmx5IGFkZCBwYWdpbmF0aW9uIGlmIGl0J3MgZW5hYmxlZCBpbiB0aGUgZ3JpZCBvcHRpb25zXHJcbiAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlUGFnaW5hdGlvbiAhPT0gZmFsc2UpIHtcclxuICAgICAgZGF0YXNldEZpbHRlcnMgPSB7XHJcbiAgICAgICAgLi4udGhpcy5vcHRpb25zLnBhZ2luYXRpb25PcHRpb25zLFxyXG4gICAgICAgIGZpcnN0OiAoKHRoaXMub3B0aW9ucy5wYWdpbmF0aW9uT3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMucGFnaW5hdGlvbk9wdGlvbnMuZmlyc3QpID8gdGhpcy5vcHRpb25zLnBhZ2luYXRpb25PcHRpb25zLmZpcnN0IDogKCh0aGlzLnBhZ2luYXRpb24gJiYgdGhpcy5wYWdpbmF0aW9uLnBhZ2VTaXplKSA/IHRoaXMucGFnaW5hdGlvbi5wYWdlU2l6ZSA6IG51bGwpKSB8fCB0aGlzLmRlZmF1bHRQYWdpbmF0aW9uT3B0aW9ucy5maXJzdFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuaXNXaXRoQ3Vyc29yKSB7XHJcbiAgICAgICAgZGF0YXNldEZpbHRlcnMub2Zmc2V0ID0gKCh0aGlzLm9wdGlvbnMucGFnaW5hdGlvbk9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLnBhZ2luYXRpb25PcHRpb25zLmhhc093blByb3BlcnR5KCdvZmZzZXQnKSkgPyArdGhpcy5vcHRpb25zLnBhZ2luYXRpb25PcHRpb25zWydvZmZzZXQnXSA6IDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zb3J0aW5nT3B0aW9ucyAmJiBBcnJheS5pc0FycmF5KHRoaXMub3B0aW9ucy5zb3J0aW5nT3B0aW9ucykgJiYgdGhpcy5vcHRpb25zLnNvcnRpbmdPcHRpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgLy8gb3JkZXJCeTogW3sgZmllbGQ6eCwgZGlyZWN0aW9uOiAnQVNDJyB9XVxyXG4gICAgICBkYXRhc2V0RmlsdGVycy5vcmRlckJ5ID0gdGhpcy5vcHRpb25zLnNvcnRpbmdPcHRpb25zO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5maWx0ZXJpbmdPcHRpb25zICYmIEFycmF5LmlzQXJyYXkodGhpcy5vcHRpb25zLmZpbHRlcmluZ09wdGlvbnMpICYmIHRoaXMub3B0aW9ucy5maWx0ZXJpbmdPcHRpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgLy8gZmlsdGVyQnk6IFt7IGZpZWxkOiBkYXRlLCBvcGVyYXRvcjogJz4nLCB2YWx1ZTogJzIwMDAtMTAtMTAnIH1dXHJcbiAgICAgIGRhdGFzZXRGaWx0ZXJzLmZpbHRlckJ5ID0gdGhpcy5vcHRpb25zLmZpbHRlcmluZ09wdGlvbnM7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmFkZExvY2FsZUludG9RdWVyeSkge1xyXG4gICAgICAvLyBmaXJzdDogMjAsIC4uLiBsb2NhbGU6IFwiZW4tQ0FcIlxyXG4gICAgICBkYXRhc2V0RmlsdGVycy5sb2NhbGUgPSB0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5pMThuICYmIHRoaXMuX2dyaWRPcHRpb25zLmkxOG4uY3VycmVudExhbmcgfHwgJ2VuJztcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9wdGlvbnMuZXh0cmFRdWVyeUFyZ3VtZW50cykge1xyXG4gICAgICAvLyBmaXJzdDogMjAsIC4uLiB1c2VySWQ6IDEyM1xyXG4gICAgICBmb3IgKGNvbnN0IHF1ZXJ5QXJndW1lbnQgb2YgdGhpcy5vcHRpb25zLmV4dHJhUXVlcnlBcmd1bWVudHMpIHtcclxuICAgICAgICBkYXRhc2V0RmlsdGVyc1txdWVyeUFyZ3VtZW50LmZpZWxkXSA9IHF1ZXJ5QXJndW1lbnQudmFsdWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBxdWVyeSB7IHVzZXJzKGZpcnN0OiAyMCwgb3JkZXJCeTogW10sIGZpbHRlckJ5OiBbXSl9XHJcbiAgICBkYXRhc2V0UWIuZmlsdGVyKGRhdGFzZXRGaWx0ZXJzKTtcclxuICAgIHF1ZXJ5UWIuZmluZChkYXRhc2V0UWIpO1xyXG5cclxuICAgIGNvbnN0IGVudW1TZWFyY2hQcm9wZXJ0aWVzID0gWydkaXJlY3Rpb246JywgJ2ZpZWxkOicsICdvcGVyYXRvcjonXTtcclxuICAgIHJldHVybiB0aGlzLnRyaW1Eb3VibGVRdW90ZXNPbkVudW1GaWVsZChxdWVyeVFiLnRvU3RyaW5nKCksIGVudW1TZWFyY2hQcm9wZXJ0aWVzLCB0aGlzLm9wdGlvbnMua2VlcEFyZ3VtZW50RmllbGREb3VibGVRdW90ZXMgfHwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRnJvbSBhbiBpbnB1dCBhcnJheSBvZiBzdHJpbmdzLCB3ZSB3YW50IHRvIGJ1aWxkIGEgR3JhcGhRTCBxdWVyeSBzdHJpbmcuXHJcbiAgICogVGhlIHByb2Nlc3MgaGFzIHRvIHRha2UgdGhlIGRvdCBub3RhdGlvbiBhbmQgcGFyc2UgaXQgaW50byBhIHZhbGlkIEdyYXBoUUwgcXVlcnlcclxuICAgKiBGb2xsb3dpbmcgdGhpcyBTTyBhbnN3ZXIgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ3NzA1NDc2LzEyMTIxNjZcclxuICAgKlxyXG4gICAqIElOUFVUXHJcbiAgICogIFsnZmlyc3ROYW1lJywgJ2xhc3ROYW1lJywgJ2JpbGxpbmcuYWRkcmVzcy5zdHJlZXQnLCAnYmlsbGluZy5hZGRyZXNzLnppcCddXHJcbiAgICogT1VUUFVUXHJcbiAgICogZmlyc3ROYW1lLCBsYXN0TmFtZSwgYmlsbGluZ3thZGRyZXNze3N0cmVldCwgemlwfX1cclxuICAgKiBAcGFyYW0gaW5wdXRBcnJheVxyXG4gICAqL1xyXG4gIGJ1aWxkRmlsdGVyUXVlcnkoaW5wdXRBcnJheTogc3RyaW5nW10pIHtcclxuXHJcbiAgICBjb25zdCBzZXQgPSAobzogYW55ID0ge30sIGE6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBrID0gYS5zaGlmdCgpO1xyXG4gICAgICBvW2tdID0gYS5sZW5ndGggPyBzZXQob1trXSwgYSkgOiBudWxsO1xyXG4gICAgICByZXR1cm4gbztcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb3V0cHV0ID0gaW5wdXRBcnJheS5yZWR1Y2UoKG86IGFueSwgYTogc3RyaW5nKSA9PiBzZXQobywgYS5zcGxpdCgnLicpKSwge30pO1xyXG5cclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvdXRwdXQpXHJcbiAgICAgIC5yZXBsYWNlKC9cXFwifFxcOnxudWxsL2csICcnKVxyXG4gICAgICAucmVwbGFjZSgvXlxcey8sICcnKVxyXG4gICAgICAucmVwbGFjZSgvXFx9JC8sICcnKTtcclxuICB9XHJcblxyXG4gIGNsZWFyRmlsdGVycygpIHtcclxuICAgIHRoaXMuX2N1cnJlbnRGaWx0ZXJzID0gW107XHJcbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoeyBmaWx0ZXJpbmdPcHRpb25zOiBbXSB9KTtcclxuICB9XHJcblxyXG4gIGNsZWFyU29ydGVycygpIHtcclxuICAgIHRoaXMuX2N1cnJlbnRTb3J0ZXJzID0gW107XHJcbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoeyBzb3J0aW5nT3B0aW9uczogW10gfSk7XHJcbiAgfVxyXG5cclxuICBpbml0KHNlcnZpY2VPcHRpb25zPzogR3JhcGhxbFNlcnZpY2VPcHRpb24sIHBhZ2luYXRpb24/OiBQYWdpbmF0aW9uLCBncmlkPzogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcclxuICAgIHRoaXMub3B0aW9ucyA9IHNlcnZpY2VPcHRpb25zIHx8IHt9O1xyXG4gICAgdGhpcy5wYWdpbmF0aW9uID0gcGFnaW5hdGlvbjtcclxuXHJcbiAgICBpZiAoZ3JpZCAmJiBncmlkLmdldENvbHVtbnMpIHtcclxuICAgICAgdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMgPSBzZXJ2aWNlT3B0aW9ucy5jb2x1bW5EZWZpbml0aW9ucyB8fCBncmlkLmdldENvbHVtbnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBhbiBpbml0aWFsaXphdGlvbiBvZiBQYWdpbmF0aW9uIG9wdGlvbnNcclxuICAgKiBAcmV0dXJuIFBhZ2luYXRpb24gT3B0aW9uc1xyXG4gICAqL1xyXG4gIGdldEluaXRQYWdpbmF0aW9uT3B0aW9ucygpOiBHcmFwaHFsRGF0YXNldEZpbHRlciB7XHJcbiAgICByZXR1cm4gKHRoaXMub3B0aW9ucy5pc1dpdGhDdXJzb3IpID8geyBmaXJzdDogKHRoaXMucGFnaW5hdGlvbiA/IHRoaXMucGFnaW5hdGlvbi5wYWdlU2l6ZSA6IERFRkFVTFRfSVRFTVNfUEVSX1BBR0UpIH0gOiB7IGZpcnN0OiAodGhpcy5wYWdpbmF0aW9uID8gdGhpcy5wYWdpbmF0aW9uLnBhZ2VTaXplIDogREVGQVVMVF9JVEVNU19QRVJfUEFHRSksIG9mZnNldDogMCB9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgR3JhcGhRTCBkYXRhc2V0IG5hbWUgKi9cclxuICBnZXREYXRhc2V0TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5kYXRhc2V0TmFtZSB8fCAnJztcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIEZpbHRlcnMgdGhhdCBhcmUgY3VycmVudGx5IHVzZWQgYnkgdGhlIGdyaWQgKi9cclxuICBnZXRDdXJyZW50RmlsdGVycygpOiBDb2x1bW5GaWx0ZXJzIHwgQ3VycmVudEZpbHRlcltdIHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50RmlsdGVycztcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIFBhZ2luYXRpb24gdGhhdCBpcyBjdXJyZW50bHkgdXNlZCBieSB0aGUgZ3JpZCAqL1xyXG4gIGdldEN1cnJlbnRQYWdpbmF0aW9uKCk6IEN1cnJlbnRQYWdpbmF0aW9uIHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50UGFnaW5hdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIFNvcnRlcnMgdGhhdCBhcmUgY3VycmVudGx5IHVzZWQgYnkgdGhlIGdyaWQgKi9cclxuICBnZXRDdXJyZW50U29ydGVycygpOiBDdXJyZW50U29ydGVyW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTb3J0ZXJzO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBSZXNldCB0aGUgcGFnaW5hdGlvbiBvcHRpb25zXHJcbiAgICovXHJcbiAgcmVzZXRQYWdpbmF0aW9uT3B0aW9ucygpIHtcclxuICAgIGxldCBwYWdpbmF0aW9uT3B0aW9ucztcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuaXNXaXRoQ3Vyc29yKSB7XHJcbiAgICAgIC8vIGZpcnN0LCBsYXN0LCBhZnRlciwgYmVmb3JlXHJcbiAgICAgIHBhZ2luYXRpb25PcHRpb25zID0ge1xyXG4gICAgICAgIGFmdGVyOiAnJyxcclxuICAgICAgICBiZWZvcmU6IHVuZGVmaW5lZCxcclxuICAgICAgICBsYXN0OiB1bmRlZmluZWRcclxuICAgICAgfSBhcyBHcmFwaHFsQ3Vyc29yUGFnaW5hdGlvbk9wdGlvbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGZpcnN0LCBsYXN0LCBvZmZzZXRcclxuICAgICAgcGFnaW5hdGlvbk9wdGlvbnMgPSAodGhpcy5vcHRpb25zLnBhZ2luYXRpb25PcHRpb25zIHx8IHRoaXMuZ2V0SW5pdFBhZ2luYXRpb25PcHRpb25zKCkpIGFzIEdyYXBocWxQYWdpbmF0aW9uT3B0aW9uO1xyXG4gICAgICBwYWdpbmF0aW9uT3B0aW9ucy5vZmZzZXQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNhdmUgY3VycmVudCBwYWdpbmF0aW9uIGFzIFBhZ2UgMSBhbmQgcGFnZSBzaXplIGFzIFwiZmlyc3RcIiBzZXQgc2l6ZVxyXG4gICAgdGhpcy5fY3VycmVudFBhZ2luYXRpb24gPSB7XHJcbiAgICAgIHBhZ2VOdW1iZXI6IDEsXHJcbiAgICAgIHBhZ2VTaXplOiBwYWdpbmF0aW9uT3B0aW9ucy5maXJzdFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoeyBwYWdpbmF0aW9uT3B0aW9ucyB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZU9wdGlvbnMoc2VydmljZU9wdGlvbnM/OiBHcmFwaHFsU2VydmljZU9wdGlvbikge1xyXG4gICAgdGhpcy5vcHRpb25zID0geyAuLi50aGlzLm9wdGlvbnMsIC4uLnNlcnZpY2VPcHRpb25zIH07XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIEZJTFRFUklOR1xyXG4gICAqL1xyXG4gIHByb2Nlc3NPbkZpbHRlckNoYW5nZWQoZXZlbnQ6IEV2ZW50LCBhcmdzOiBGaWx0ZXJDaGFuZ2VkQXJncyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICBjb25zdCBncmlkT3B0aW9uczogR3JpZE9wdGlvbiA9IHRoaXMuX2dyaWRPcHRpb25zIHx8IGFyZ3MuZ3JpZC5nZXRPcHRpb25zKCk7XHJcbiAgICBjb25zdCBiYWNrZW5kQXBpID0gZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGk7XHJcblxyXG4gICAgaWYgKGJhY2tlbmRBcGkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIGluIHRoZSBHcmFwaHFsU2VydmljZSwgXCJiYWNrZW5kU2VydmljZUFwaVwiIGlzIG5vdCBpbml0aWFsaXplZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGtlZXAgY3VycmVudCBmaWx0ZXJzICYgYWx3YXlzIHNhdmUgaXQgYXMgYW4gYXJyYXkgKGNvbHVtbkZpbHRlcnMgY2FuIGJlIGFuIG9iamVjdCB3aGVuIGl0IGlzIGRlYWx0IGJ5IFNsaWNrR3JpZCBGaWx0ZXIpXHJcbiAgICB0aGlzLl9jdXJyZW50RmlsdGVycyA9IHRoaXMuY2FzdEZpbHRlclRvQ29sdW1uRmlsdGVyKGFyZ3MuY29sdW1uRmlsdGVycyk7XHJcblxyXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBpZiAoIWFyZ3MgfHwgIWFyZ3MuZ3JpZCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hlbiB0cnlpbmcgY3JlYXRlIHRoZSBHcmFwaFFMIEJhY2tlbmQgU2VydmljZSwgaXQgc2VlbXMgdGhhdCBcImFyZ3NcIiBpcyBub3QgcG9wdWxhdGVkIGNvcnJlY3RseScpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBsb29wIHRocm91Z2ggYWxsIGNvbHVtbnMgdG8gaW5zcGVjdCBmaWx0ZXJzICYgc2V0IHRoZSBxdWVyeVxyXG4gICAgICB0aGlzLnVwZGF0ZUZpbHRlcnMoYXJncy5jb2x1bW5GaWx0ZXJzLCBmYWxzZSk7XHJcblxyXG4gICAgICB0aGlzLnJlc2V0UGFnaW5hdGlvbk9wdGlvbnMoKTtcclxuICAgICAgcmVzb2x2ZSh0aGlzLmJ1aWxkUXVlcnkoKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogUEFHSU5BVElPTlxyXG4gICAqIFdpdGggY3Vyc29yLCB0aGUgcXVlcnkgY2FuIGhhdmUgNCBhcmd1bWVudHMgKGZpcnN0LCBhZnRlciwgbGFzdCwgYmVmb3JlKSwgZm9yIGV4YW1wbGU6XHJcbiAgICogICB1c2VycyAoZmlyc3Q6MjAsIGFmdGVyOlwiWVhKeVlYbGpiMjV1WldOMGFXOXVPak09XCIpIHtcclxuICAgKiAgICAgdG90YWxDb3VudFxyXG4gICAqICAgICBwYWdlSW5mbyB7XHJcbiAgICogICAgICAgaGFzTmV4dFBhZ2VcclxuICAgKiAgICAgICBlbmRDdXJzb3JcclxuICAgKiAgICAgfVxyXG4gICAqICAgICBlZGdlcyB7XHJcbiAgICogICAgICAgY3Vyc29yXHJcbiAgICogICAgICAgbm9kZSB7XHJcbiAgICogICAgICAgICBuYW1lXHJcbiAgICogICAgICAgICBnZW5kZXJcclxuICAgKiAgICAgICB9XHJcbiAgICogICAgIH1cclxuICAgKiAgIH1cclxuICAgKiBXaXRob3V0IGN1cnNvciwgdGhlIHF1ZXJ5IGNhbiBoYXZlIDMgYXJndW1lbnRzIChmaXJzdCwgbGFzdCwgb2Zmc2V0KSwgZm9yIGV4YW1wbGU6XHJcbiAgICogICB1c2VycyAoZmlyc3Q6MjAsIG9mZnNldDogMTApIHtcclxuICAgKiAgICAgdG90YWxDb3VudFxyXG4gICAqICAgICBub2RlcyB7XHJcbiAgICogICAgICAgbmFtZVxyXG4gICAqICAgICAgIGdlbmRlclxyXG4gICAqICAgICB9XHJcbiAgICogICB9XHJcbiAgICovXHJcbiAgcHJvY2Vzc09uUGFnaW5hdGlvbkNoYW5nZWQoZXZlbnQ6IEV2ZW50LCBhcmdzOiBQYWdpbmF0aW9uQ2hhbmdlZEFyZ3MpIHtcclxuICAgIGNvbnN0IHBhZ2VTaXplID0gKyhhcmdzLnBhZ2VTaXplIHx8ICgodGhpcy5wYWdpbmF0aW9uKSA/IHRoaXMucGFnaW5hdGlvbi5wYWdlU2l6ZSA6IERFRkFVTFRfUEFHRV9TSVpFKSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhZ2luYXRpb24oYXJncy5uZXdQYWdlLCBwYWdlU2l6ZSk7XHJcblxyXG4gICAgLy8gYnVpbGQgdGhlIEdyYXBoUUwgcXVlcnkgd2hpY2ggd2Ugd2lsbCB1c2UgaW4gdGhlIFdlYkFQSSBjYWxsYmFja1xyXG4gICAgcmV0dXJuIHRoaXMuYnVpbGRRdWVyeSgpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBTT1JUSU5HXHJcbiAgICogd2Ugd2lsbCB1c2Ugc29ydGluZyBhcyBwZXIgYSBGYWNlYm9vayBzdWdnZXN0aW9uIG9uIGEgR2l0aHViIGlzc3VlICh3aXRoIHNvbWUgc21hbGwgY2hhbmdlcylcclxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vZ3JhcGhxbC9ncmFwaHFsLXJlbGF5LWpzL2lzc3Vlcy8yMCNpc3N1ZWNvbW1lbnQtMjIwNDk0MjIyXHJcbiAgICovXHJcbiAgcHJvY2Vzc09uU29ydENoYW5nZWQoZXZlbnQ6IEV2ZW50LCBhcmdzOiBTb3J0Q2hhbmdlZEFyZ3MpIHtcclxuICAgIGNvbnN0IHNvcnRDb2x1bW5zID0gKGFyZ3MubXVsdGlDb2x1bW5Tb3J0KSA/IGFyZ3Muc29ydENvbHMgOiBuZXcgQXJyYXkoeyBzb3J0Q29sOiBhcmdzLnNvcnRDb2wsIHNvcnRBc2M6IGFyZ3Muc29ydEFzYyB9KTtcclxuXHJcbiAgICAvLyBsb29wIHRocm91Z2ggYWxsIGNvbHVtbnMgdG8gaW5zcGVjdCBzb3J0ZXJzICYgc2V0IHRoZSBxdWVyeVxyXG4gICAgdGhpcy51cGRhdGVTb3J0ZXJzKHNvcnRDb2x1bW5zKTtcclxuXHJcbiAgICAvLyBidWlsZCB0aGUgR3JhcGhRTCBxdWVyeSB3aGljaCB3ZSB3aWxsIHVzZSBpbiB0aGUgV2ViQVBJIGNhbGxiYWNrXHJcbiAgICByZXR1cm4gdGhpcy5idWlsZFF1ZXJ5KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBsb29wIHRocm91Z2ggYWxsIGNvbHVtbnMgdG8gaW5zcGVjdCBmaWx0ZXJzICYgdXBkYXRlIGJhY2tlbmQgc2VydmljZSBmaWx0ZXJpbmdPcHRpb25zXHJcbiAgICogQHBhcmFtIGNvbHVtbkZpbHRlcnNcclxuICAgKi9cclxuICB1cGRhdGVGaWx0ZXJzKGNvbHVtbkZpbHRlcnM6IENvbHVtbkZpbHRlcnMgfCBDdXJyZW50RmlsdGVyW10sIGlzVXBkYXRlZEJ5UHJlc2V0OiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBzZWFyY2hCeUFycmF5OiBHcmFwaHFsRmlsdGVyaW5nT3B0aW9uW10gPSBbXTtcclxuICAgIGxldCBzZWFyY2hWYWx1ZTogc3RyaW5nIHwgc3RyaW5nW107XHJcblxyXG4gICAgLy8gb24gZmlsdGVyIHByZXNldCBsb2FkLCB3ZSBuZWVkIHRvIGtlZXAgY3VycmVudCBmaWx0ZXJzXHJcbiAgICBpZiAoaXNVcGRhdGVkQnlQcmVzZXQpIHtcclxuICAgICAgdGhpcy5fY3VycmVudEZpbHRlcnMgPSB0aGlzLmNhc3RGaWx0ZXJUb0NvbHVtbkZpbHRlcihjb2x1bW5GaWx0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IGNvbHVtbklkIGluIGNvbHVtbkZpbHRlcnMpIHtcclxuICAgICAgaWYgKGNvbHVtbkZpbHRlcnMuaGFzT3duUHJvcGVydHkoY29sdW1uSWQpKSB7XHJcbiAgICAgICAgY29uc3QgY29sdW1uRmlsdGVyID0gY29sdW1uRmlsdGVyc1tjb2x1bW5JZF07XHJcblxyXG4gICAgICAgIC8vIGlmIHVzZXIgZGVmaW5lZCBzb21lIFwicHJlc2V0c1wiLCB0aGVuIHdlIG5lZWQgdG8gZmluZCB0aGUgZmlsdGVycyBmcm9tIHRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgaW5zdGVhZFxyXG4gICAgICAgIGxldCBjb2x1bW5EZWY6IENvbHVtbiB8IHVuZGVmaW5lZDtcclxuICAgICAgICBpZiAoaXNVcGRhdGVkQnlQcmVzZXQgJiYgQXJyYXkuaXNBcnJheSh0aGlzLl9jb2x1bW5EZWZpbml0aW9ucykpIHtcclxuICAgICAgICAgIGNvbHVtbkRlZiA9IHRoaXMuX2NvbHVtbkRlZmluaXRpb25zLmZpbmQoKGNvbHVtbjogQ29sdW1uKSA9PiBjb2x1bW4uaWQgPT09IGNvbHVtbkZpbHRlci5jb2x1bW5JZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbHVtbkRlZiA9IGNvbHVtbkZpbHRlci5jb2x1bW5EZWY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghY29sdW1uRGVmKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tCYWNrZW5kIFNlcnZpY2UgQVBJXTogU29tZXRoaW5nIHdlbnQgd3JvbmcgaW4gdHJ5aW5nIHRvIGdldCB0aGUgY29sdW1uIGRlZmluaXRpb24gb2YgdGhlIHNwZWNpZmllZCBmaWx0ZXIgKG9yIHByZXNldCBmaWx0ZXJzKS4gRGlkIHlvdSBtYWtlIGEgdHlwbyBvbiB0aGUgZmlsdGVyIGNvbHVtbklkPycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZmllbGROYW1lID0gY29sdW1uRGVmLnF1ZXJ5RmllbGQgfHwgY29sdW1uRGVmLnF1ZXJ5RmllbGRGaWx0ZXIgfHwgY29sdW1uRGVmLmZpZWxkIHx8IGNvbHVtbkRlZi5uYW1lIHx8ICcnO1xyXG4gICAgICAgIGNvbnN0IHNlYXJjaFRlcm1zID0gKGNvbHVtbkZpbHRlciA/IGNvbHVtbkZpbHRlci5zZWFyY2hUZXJtcyA6IG51bGwpIHx8IFtdO1xyXG4gICAgICAgIGxldCBmaWVsZFNlYXJjaFZhbHVlID0gKEFycmF5LmlzQXJyYXkoc2VhcmNoVGVybXMpICYmIHNlYXJjaFRlcm1zLmxlbmd0aCA9PT0gMSkgPyBzZWFyY2hUZXJtc1swXSA6ICcnO1xyXG4gICAgICAgIGlmICh0eXBlb2YgZmllbGRTZWFyY2hWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgIGZpZWxkU2VhcmNoVmFsdWUgPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZmllbGRTZWFyY2hWYWx1ZSAhPT0gJ3N0cmluZycgJiYgIXNlYXJjaFRlcm1zKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEdyYXBoUUwgZmlsdGVyIHNlYXJjaFRlcm0gcHJvcGVydHkgbXVzdCBiZSBwcm92aWRlZCBhcyB0eXBlIFwic3RyaW5nXCIsIGlmIHlvdSB1c2UgZmlsdGVyIHdpdGggb3B0aW9ucyB0aGVuIG1ha2Ugc3VyZSB5b3VyIElEcyBhcmUgYWxzbyBzdHJpbmcuIEZvciBleGFtcGxlOiBmaWx0ZXI6IHttb2RlbDogRmlsdGVycy5zZWxlY3QsIGNvbGxlY3Rpb246IFt7IGlkOiBcIjBcIiwgdmFsdWU6IFwiMFwiIH0sIHsgaWQ6IFwiMVwiLCB2YWx1ZTogXCIxXCIgfV1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZpZWxkU2VhcmNoVmFsdWUgPSAnJyArIGZpZWxkU2VhcmNoVmFsdWU7IC8vIG1ha2Ugc3VyZSBpdCdzIGEgc3RyaW5nXHJcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGZpZWxkU2VhcmNoVmFsdWUubWF0Y2goL14oWzw+IT1cXCpdezAsMn0pKC4qW148PiE9XFwqXSkoW1xcKl0/KSQvKTsgLy8gZ3JvdXAgMTogT3BlcmF0b3IsIDI6IHNlYXJjaFZhbHVlLCAzOiBsYXN0IGNoYXIgaXMgJyonIChtZWFuaW5nIHN0YXJ0cyB3aXRoLCBleC46IGFiYyopXHJcbiAgICAgICAgbGV0IG9wZXJhdG9yID0gY29sdW1uRmlsdGVyLm9wZXJhdG9yIHx8ICgobWF0Y2hlcykgPyBtYXRjaGVzWzFdIDogJycpO1xyXG4gICAgICAgIHNlYXJjaFZhbHVlID0gKCEhbWF0Y2hlcykgPyBtYXRjaGVzWzJdIDogJyc7XHJcbiAgICAgICAgY29uc3QgbGFzdFZhbHVlQ2hhciA9ICghIW1hdGNoZXMpID8gbWF0Y2hlc1szXSA6IChvcGVyYXRvciA9PT0gJyp6JyA/ICcqJyA6ICcnKTtcclxuXHJcbiAgICAgICAgLy8gbm8gbmVlZCB0byBxdWVyeSBpZiBzZWFyY2ggdmFsdWUgaXMgZW1wdHlcclxuICAgICAgICBpZiAoZmllbGROYW1lICYmIHNlYXJjaFZhbHVlID09PSAnJyAmJiBzZWFyY2hUZXJtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gd2hlbiBoYXZpbmcgbW9yZSB0aGFuIDEgc2VhcmNoIHRlcm0gKHdlIG5lZWQgdG8gY3JlYXRlIGEgQ1NWIHN0cmluZyBmb3IgR3JhcGhRTCBcIklOXCIgb3IgXCJOT1QgSU5cIiBmaWx0ZXIgc2VhcmNoKVxyXG4gICAgICAgIGlmIChzZWFyY2hUZXJtcyAmJiBzZWFyY2hUZXJtcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICBzZWFyY2hWYWx1ZSA9IHNlYXJjaFRlcm1zLmpvaW4oJywnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWFyY2hWYWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIC8vIGVzY2FwaW5nIHRoZSBzZWFyY2ggdmFsdWVcclxuICAgICAgICAgIHNlYXJjaFZhbHVlID0gc2VhcmNoVmFsdWUucmVwbGFjZShgJ2AsIGAnJ2ApOyAvLyBlc2NhcGUgc2luZ2xlIHF1b3RlcyBieSBkb3VibGluZyB0aGVtXHJcbiAgICAgICAgICBpZiAob3BlcmF0b3IgPT09ICcqJyB8fCBvcGVyYXRvciA9PT0gJ2EqJyB8fCBvcGVyYXRvciA9PT0gJyp6JyB8fCBsYXN0VmFsdWVDaGFyID09PSAnKicpIHtcclxuICAgICAgICAgICAgb3BlcmF0b3IgPSAob3BlcmF0b3IgPT09ICcqJyB8fCBvcGVyYXRvciA9PT0gJyp6JykgPyAnZW5kc1dpdGgnIDogJ3N0YXJ0c1dpdGgnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYgd2UgZGlkbid0IGZpbmQgYW4gT3BlcmF0b3IgYnV0IHdlIGhhdmUgYSBGaWx0ZXIgVHlwZSwgd2Ugc2hvdWxkIHVzZSBkZWZhdWx0IE9wZXJhdG9yXHJcbiAgICAgICAgLy8gbXVsdGlwbGVTZWxlY3QgaXMgXCJJTlwiLCB3aGlsZSBzaW5nbGVTZWxlY3QgaXMgXCJFUVwiLCBlbHNlIGRvbid0IG1hcCBhbnkgb3BlcmF0b3JcclxuICAgICAgICBpZiAoIW9wZXJhdG9yICYmIGNvbHVtbkRlZi5maWx0ZXIpIHtcclxuICAgICAgICAgIG9wZXJhdG9yID0gY29sdW1uRGVmLmZpbHRlci5vcGVyYXRvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmIHdlIHN0aWxsIGRvbid0IGhhdmUgYW4gb3BlcmF0b3IgZmluZCB0aGUgcHJvcGVyIE9wZXJhdG9yIHRvIHVzZSBieSBpdCdzIGZpZWxkIHR5cGVcclxuICAgICAgICBpZiAoIW9wZXJhdG9yKSB7XHJcbiAgICAgICAgICBvcGVyYXRvciA9IG1hcE9wZXJhdG9yQnlGaWVsZFR5cGUoY29sdW1uRGVmLnR5cGUgfHwgRmllbGRUeXBlLnN0cmluZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWFyY2hCeUFycmF5LnB1c2goe1xyXG4gICAgICAgICAgZmllbGQ6IGZpZWxkTmFtZSxcclxuICAgICAgICAgIG9wZXJhdG9yOiBtYXBPcGVyYXRvclR5cGUob3BlcmF0b3IpLFxyXG4gICAgICAgICAgdmFsdWU6IHNlYXJjaFZhbHVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgdGhlIHNlcnZpY2Ugb3B0aW9ucyB3aXRoIGZpbHRlcnMgZm9yIHRoZSBidWlsZFF1ZXJ5KCkgdG8gd29yayBsYXRlclxyXG4gICAgdGhpcy51cGRhdGVPcHRpb25zKHsgZmlsdGVyaW5nT3B0aW9uczogc2VhcmNoQnlBcnJheSB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgcGFnaW5hdGlvbiBjb21wb25lbnQgd2l0aCBpdCdzIG5ldyBwYWdlIG51bWJlciBhbmQgc2l6ZVxyXG4gICAqIEBwYXJhbSBuZXdQYWdlXHJcbiAgICogQHBhcmFtIHBhZ2VTaXplXHJcbiAgICovXHJcbiAgdXBkYXRlUGFnaW5hdGlvbihuZXdQYWdlOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2N1cnJlbnRQYWdpbmF0aW9uID0ge1xyXG4gICAgICBwYWdlTnVtYmVyOiBuZXdQYWdlLFxyXG4gICAgICBwYWdlU2l6ZVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgcGFnaW5hdGlvbk9wdGlvbnM7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmlzV2l0aEN1cnNvcikge1xyXG4gICAgICBwYWdpbmF0aW9uT3B0aW9ucyA9IHtcclxuICAgICAgICBmaXJzdDogcGFnZVNpemVcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBhZ2luYXRpb25PcHRpb25zID0ge1xyXG4gICAgICAgIGZpcnN0OiBwYWdlU2l6ZSxcclxuICAgICAgICBvZmZzZXQ6IChuZXdQYWdlIC0gMSkgKiBwYWdlU2l6ZVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlT3B0aW9ucyh7IHBhZ2luYXRpb25PcHRpb25zIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW5zIHRvIGluc3BlY3Qgc29ydGVycyAmIHVwZGF0ZSBiYWNrZW5kIHNlcnZpY2Ugc29ydGluZ09wdGlvbnNcclxuICAgKiBAcGFyYW0gY29sdW1uRmlsdGVyc1xyXG4gICAqL1xyXG4gIHVwZGF0ZVNvcnRlcnMoc29ydENvbHVtbnM/OiBDb2x1bW5Tb3J0W10sIHByZXNldFNvcnRlcnM/OiBDdXJyZW50U29ydGVyW10pIHtcclxuICAgIGxldCBjdXJyZW50U29ydGVyczogQ3VycmVudFNvcnRlcltdID0gW107XHJcbiAgICBjb25zdCBncmFwaHFsU29ydGVyczogR3JhcGhxbFNvcnRpbmdPcHRpb25bXSA9IFtdO1xyXG5cclxuICAgIGlmICghc29ydENvbHVtbnMgJiYgcHJlc2V0U29ydGVycykge1xyXG4gICAgICAvLyBtYWtlIHRoZSBwcmVzZXRzIHRoZSBjdXJyZW50IHNvcnRlcnMsIGFsc28gbWFrZSBzdXJlIHRoYXQgYWxsIGRpcmVjdGlvbiBhcmUgaW4gdXBwZXJjYXNlIGZvciBHcmFwaFFMXHJcbiAgICAgIGN1cnJlbnRTb3J0ZXJzID0gcHJlc2V0U29ydGVycztcclxuICAgICAgY3VycmVudFNvcnRlcnMuZm9yRWFjaCgoc29ydGVyKSA9PiBzb3J0ZXIuZGlyZWN0aW9uID0gc29ydGVyLmRpcmVjdGlvbi50b1VwcGVyQ2FzZSgpIGFzIFNvcnREaXJlY3Rpb25TdHJpbmcpO1xyXG5cclxuICAgICAgLy8gZGlzcGxheSB0aGUgY29ycmVjdCBzb3J0aW5nIGljb25zIG9uIHRoZSBVSSwgZm9yIHRoYXQgaXQgcmVxdWlyZXMgKGNvbHVtbklkLCBzb3J0QXNjKSBwcm9wZXJ0aWVzXHJcbiAgICAgIGNvbnN0IHRtcFNvcnRlckFycmF5ID0gY3VycmVudFNvcnRlcnMubWFwKChzb3J0ZXIpID0+IHtcclxuICAgICAgICBjb25zdCBjb2x1bW5EZWYgPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5maW5kKChjb2x1bW46IENvbHVtbikgPT4gY29sdW1uLmlkID09PSBzb3J0ZXIuY29sdW1uSWQpO1xyXG5cclxuICAgICAgICBncmFwaHFsU29ydGVycy5wdXNoKHtcclxuICAgICAgICAgIGZpZWxkOiBjb2x1bW5EZWYgPyAoKGNvbHVtbkRlZi5xdWVyeUZpZWxkIHx8IGNvbHVtbkRlZi5xdWVyeUZpZWxkU29ydGVyIHx8IGNvbHVtbkRlZi5maWVsZCB8fCBjb2x1bW5EZWYuaWQpICsgJycpIDogKHNvcnRlci5jb2x1bW5JZCArICcnKSxcclxuICAgICAgICAgIGRpcmVjdGlvbjogc29ydGVyLmRpcmVjdGlvblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyByZXR1cm4gb25seSB0aGUgY29sdW1uKHMpIGZvdW5kIGluIHRoZSBDb2x1bW4gRGVmaW5pdGlvbnMgRUxTRSBudWxsXHJcbiAgICAgICAgaWYgKGNvbHVtbkRlZikge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uSWQ6IHNvcnRlci5jb2x1bW5JZCxcclxuICAgICAgICAgICAgc29ydEFzYzogc29ydGVyLmRpcmVjdGlvbi50b1VwcGVyQ2FzZSgpID09PSBTb3J0RGlyZWN0aW9uLkFTQ1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gc2V0IHRoZSBzb3J0IGljb25zLCBidXQgYWxzbyBtYWtlIHN1cmUgdG8gZmlsdGVyIG91dCBudWxsIHZhbHVlcyAoaGFwcGVucyB3aGVuIG5vIGNvbHVtbkRlZiBmb3VuZClcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodG1wU29ydGVyQXJyYXkpKSB7XHJcbiAgICAgICAgdGhpcy5fZ3JpZC5zZXRTb3J0Q29sdW1ucyh0bXBTb3J0ZXJBcnJheS5maWx0ZXIoKHNvcnRlcikgPT4gc29ydGVyKSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoc29ydENvbHVtbnMgJiYgIXByZXNldFNvcnRlcnMpIHtcclxuICAgICAgLy8gYnVpbGQgdGhlIG9yZGVyQnkgYXJyYXksIGl0IGNvdWxkIGJlIG11bHRpc29ydCwgZXhhbXBsZVxyXG4gICAgICAvLyBvcmRlckJ5Olt7ZmllbGQ6IGxhc3ROYW1lLCBkaXJlY3Rpb246IEFTQ30sIHtmaWVsZDogZmlyc3ROYW1lLCBkaXJlY3Rpb246IERFU0N9XVxyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShzb3J0Q29sdW1ucykgJiYgc29ydENvbHVtbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGZvciAoY29uc3QgY29sdW1uIG9mIHNvcnRDb2x1bW5zKSB7XHJcbiAgICAgICAgICBpZiAoY29sdW1uICYmIGNvbHVtbi5zb3J0Q29sKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTb3J0ZXJzLnB1c2goe1xyXG4gICAgICAgICAgICAgIGNvbHVtbklkOiBjb2x1bW4uc29ydENvbC5pZCArICcnLFxyXG4gICAgICAgICAgICAgIGRpcmVjdGlvbjogY29sdW1uLnNvcnRBc2MgPyBTb3J0RGlyZWN0aW9uLkFTQyA6IFNvcnREaXJlY3Rpb24uREVTQ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGdyYXBocWxTb3J0ZXJzLnB1c2goe1xyXG4gICAgICAgICAgICAgIGZpZWxkOiAoY29sdW1uLnNvcnRDb2wucXVlcnlGaWVsZCB8fCBjb2x1bW4uc29ydENvbC5xdWVyeUZpZWxkU29ydGVyIHx8IGNvbHVtbi5zb3J0Q29sLmZpZWxkIHx8IGNvbHVtbi5zb3J0Q29sLmlkKSArICcnLFxyXG4gICAgICAgICAgICAgIGRpcmVjdGlvbjogY29sdW1uLnNvcnRBc2MgPyBTb3J0RGlyZWN0aW9uLkFTQyA6IFNvcnREaXJlY3Rpb24uREVTQ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBrZWVwIGN1cnJlbnQgU29ydGVycyBhbmQgdXBkYXRlIHRoZSBzZXJ2aWNlIG9wdGlvbnMgd2l0aCB0aGUgbmV3IHNvcnRpbmdcclxuICAgIHRoaXMuX2N1cnJlbnRTb3J0ZXJzID0gY3VycmVudFNvcnRlcnM7XHJcbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoeyBzb3J0aW5nT3B0aW9uczogZ3JhcGhxbFNvcnRlcnMgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBIGZ1bmN0aW9uIHdoaWNoIHRha2VzIGFuIGlucHV0IHN0cmluZyBhbmQgcmVtb3ZlcyBkb3VibGUgcXVvdGVzIG9ubHlcclxuICAgKiBvbiBjZXJ0YWluIGZpZWxkcyBhcmUgaWRlbnRpZmllZCBhcyBHcmFwaFFMIGVudW1zIChleGNlcHQgZmllbGRzIHdpdGggZG90IG5vdGF0aW9uKVxyXG4gICAqIEZvciBleGFtcGxlIGxldCBzYXkgd2UgaWRlbnRpZmllZCAoXCJkaXJlY3Rpb246XCIsIFwic29ydFwiKSBhcyB3b3JkIHdoaWNoIGFyZSBHcmFwaFFMIGVudW0gZmllbGRzXHJcbiAgICogdGhlbiB0aGUgcmVzdWx0IHdpbGwgYmU6XHJcbiAgICogRlJPTVxyXG4gICAqIHF1ZXJ5IHsgdXNlcnMgKG9yZGVyQnk6W3tmaWVsZDpcImZpcnN0TmFtZVwiLCBkaXJlY3Rpb246XCJBU0NcIn0gfV0pIH1cclxuICAgKiBUT1xyXG4gICAqIHF1ZXJ5IHsgdXNlcnMgKG9yZGVyQnk6W3tmaWVsZDogZmlyc3ROYW1lLCBkaXJlY3Rpb246IEFTQ319KX1cclxuICAgKlxyXG4gICAqIEVYQ0VQVElPTlMgKGZpZWxkcyB3aXRoIGRvdCBub3RhdGlvbiBcIi5cIiB3aGljaCBhcmUgaW5zaWRlIGEgXCJmaWVsZDpcIilcclxuICAgKiB0aGVzZSBmaWVsZHMgd2lsbCBrZWVwIGRvdWJsZSBxdW90ZXMgd2hpbGUgZXZlcnl0aGluZyBlbHNlIHdpbGwgYmUgc3RyaXBwZWQgb2YgZG91YmxlIHF1b3Rlc1xyXG4gICAqIHF1ZXJ5IHsgdXNlcnMgKG9yZGVyQnk6W3tmaWVsZDpcImJpbGxpbmcuc3RyZWV0Lm5hbWVcIiwgZGlyZWN0aW9uOiBcIkFTQ1wifSB9XHJcbiAgICogVE9cclxuICAgKiBxdWVyeSB7IHVzZXJzIChvcmRlckJ5Olt7ZmllbGQ6XCJiaWxsaW5nLnN0cmVldC5uYW1lXCIsIGRpcmVjdGlvbjogQVNDfX1cclxuICAgKiBAcGFyYW0gaW5wdXRTdHIgaW5wdXQgc3RyaW5nXHJcbiAgICogQHBhcmFtIGVudW1TZWFyY2hXb3JkcyBhcnJheSBvZiBlbnVtIHdvcmRzIHRvIGZpbHRlclxyXG4gICAqIEByZXR1cm5zIG91dHB1dFN0ciBvdXRwdXQgc3RyaW5nXHJcbiAgICovXHJcbiAgdHJpbURvdWJsZVF1b3Rlc09uRW51bUZpZWxkKGlucHV0U3RyOiBzdHJpbmcsIGVudW1TZWFyY2hXb3Jkczogc3RyaW5nW10sIGtlZXBBcmd1bWVudEZpZWxkRG91YmxlUXVvdGVzOiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBwYXR0ZXJuV29yZEluUXVvdGVzID0gYFxccz8oKGZpZWxkOlxccyopP1wiLio/XCIpYDtcclxuICAgIGxldCBwYXR0ZXJuUmVnZXggPSBlbnVtU2VhcmNoV29yZHMuam9pbihwYXR0ZXJuV29yZEluUXVvdGVzICsgJ3wnKTtcclxuICAgIHBhdHRlcm5SZWdleCArPSBwYXR0ZXJuV29yZEluUXVvdGVzOyAvLyB0aGUgbGFzdCBvbmUgc2hvdWxkIGFsc28gaGF2ZSB0aGUgcGF0dGVybiBidXQgd2l0aG91dCB0aGUgcGlwZSBcInxcIlxyXG4gICAgLy8gZXhhbXBsZSB3aXRoIChmaWVsZDogJiBkaXJlY3Rpb246KTogIC9maWVsZDpzPyhcIi4qP1wiKXxkaXJlY3Rpb246cz8oXCIuKj9cIikvXHJcbiAgICBjb25zdCByZWcgPSBuZXcgUmVnRXhwKHBhdHRlcm5SZWdleCwgJ2cnKTtcclxuXHJcbiAgICByZXR1cm4gaW5wdXRTdHIucmVwbGFjZShyZWcsIChncm91cDEsIGdyb3VwMiwgZ3JvdXAzKSA9PiB7XHJcbiAgICAgIC8vIHJlbW92ZSBkb3VibGUgcXVvdGVzIGV4Y2VwdCB3aGVuIHRoZSBzdHJpbmcgc3RhcnRzIHdpdGggYSBcImZpZWxkOlwiXHJcbiAgICAgIGxldCByZW1vdmVEb3VibGVRdW90ZXMgPSB0cnVlO1xyXG4gICAgICBpZiAoZ3JvdXAxLnN0YXJ0c1dpdGgoJ2ZpZWxkOicpICYmIGtlZXBBcmd1bWVudEZpZWxkRG91YmxlUXVvdGVzKSB7XHJcbiAgICAgICAgcmVtb3ZlRG91YmxlUXVvdGVzID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcmVwID0gcmVtb3ZlRG91YmxlUXVvdGVzID8gZ3JvdXAxLnJlcGxhY2UoL1wiL2csICcnKSA6IGdyb3VwMTtcclxuICAgICAgcmV0dXJuIHJlcDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy9cclxuICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvKipcclxuICAgKiBDYXN0IHByb3ZpZGVkIGZpbHRlcnMgKGNvdWxkIGJlIGluIG11bHRpcGxlIGZvcm1hdCkgaW50byBhbiBhcnJheSBvZiBDb2x1bW5GaWx0ZXJcclxuICAgKiBAcGFyYW0gY29sdW1uRmlsdGVyc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY2FzdEZpbHRlclRvQ29sdW1uRmlsdGVyKGNvbHVtbkZpbHRlcnM6IENvbHVtbkZpbHRlcnMgfCBDdXJyZW50RmlsdGVyW10pOiBDdXJyZW50RmlsdGVyW10ge1xyXG4gICAgLy8ga2VlcCBjdXJyZW50IGZpbHRlcnMgJiBhbHdheXMgc2F2ZSBpdCBhcyBhbiBhcnJheSAoY29sdW1uRmlsdGVycyBjYW4gYmUgYW4gb2JqZWN0IHdoZW4gaXQgaXMgZGVhbHQgYnkgU2xpY2tHcmlkIEZpbHRlcilcclxuICAgIGNvbnN0IGZpbHRlcnNBcnJheTogQ29sdW1uRmlsdGVyW10gPSAodHlwZW9mIGNvbHVtbkZpbHRlcnMgPT09ICdvYmplY3QnKSA/IE9iamVjdC5rZXlzKGNvbHVtbkZpbHRlcnMpLm1hcChrZXkgPT4gY29sdW1uRmlsdGVyc1trZXldKSA6IGNvbHVtbkZpbHRlcnM7XHJcblxyXG4gICAgcmV0dXJuIGZpbHRlcnNBcnJheS5tYXAoKGZpbHRlcikgPT4ge1xyXG4gICAgICBjb25zdCB0bXBGaWx0ZXI6IEN1cnJlbnRGaWx0ZXIgPSB7IGNvbHVtbklkOiBmaWx0ZXIuY29sdW1uSWQgfHwgJycgfTtcclxuICAgICAgaWYgKGZpbHRlci5vcGVyYXRvcikge1xyXG4gICAgICAgIHRtcEZpbHRlci5vcGVyYXRvciA9IGZpbHRlci5vcGVyYXRvcjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXIuc2VhcmNoVGVybXMpKSB7XHJcbiAgICAgICAgdG1wRmlsdGVyLnNlYXJjaFRlcm1zID0gZmlsdGVyLnNlYXJjaFRlcm1zO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0bXBGaWx0ZXI7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19