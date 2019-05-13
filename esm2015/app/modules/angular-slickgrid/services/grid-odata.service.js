/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import './global-utilities';
import { parseUtcDate } from './utilities';
import { Injectable } from '@angular/core';
import { CaseType, FieldType, SortDirection } from './../models/index';
import { OdataService } from './odata.service';
/** @type {?} */
const DEFAULT_ITEMS_PER_PAGE = 25;
/** @type {?} */
const DEFAULT_PAGE_SIZE = 20;
export class GridOdataService {
    constructor() {
        this._currentFilters = [];
        this._currentSorters = [];
        this.defaultOptions = {
            top: DEFAULT_ITEMS_PER_PAGE,
            orderBy: '',
            caseType: CaseType.pascalCase
        };
        this.odataService = new OdataService();
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
     * @return {?}
     */
    buildQuery() {
        return this.odataService.buildQuery();
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
     * @param {?} options
     * @param {?=} pagination
     * @param {?=} grid
     * @return {?}
     */
    init(options, pagination, grid) {
        this._grid = grid;
        /** @type {?} */
        const mergedOptions = Object.assign({}, this.defaultOptions, options);
        if (pagination && pagination.pageSize) {
            mergedOptions.top = pagination.pageSize;
        }
        this.odataService.options = Object.assign({}, mergedOptions, { top: mergedOptions.top || this.defaultOptions.top });
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
            (column) => !column.excludeFromQuery));
        }
    }
    /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    updateOptions(serviceOptions) {
        this.options = Object.assign({}, this.options, serviceOptions);
    }
    /**
     * @param {?} fieldName
     * @return {?}
     */
    removeColumnFilter(fieldName) {
        this.odataService.removeColumnFilter(fieldName);
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
        this.odataService.updateOptions({
            skip: 0
        });
    }
    /**
     * @param {?} fieldName
     * @param {?} value
     * @param {?=} terms
     * @return {?}
     */
    saveColumnFilter(fieldName, value, terms) {
        this.odataService.saveColumnFilter(fieldName, value, terms);
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
        const serviceOptions = args.grid.getOptions();
        /** @type {?} */
        const backendApi = serviceOptions.backendServiceApi;
        if (backendApi === undefined) {
            throw new Error('Something went wrong in the GridOdataService, "backendServiceApi" is not initialized');
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
            // loop through all columns to inspect filters & set the query
            this.updateFilters(args.columnFilters);
            this.resetPaginationOptions();
            resolve(this.odataService.buildQuery());
        }));
        return promise;
    }
    /*
       * PAGINATION
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    processOnPaginationChanged(event, args) {
        /** @type {?} */
        const pageSize = +(args.pageSize || DEFAULT_PAGE_SIZE);
        this.updatePagination(args.newPage, pageSize);
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    }
    /*
       * SORTING
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
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    }
    /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param {?} columnFilters
     * @param {?=} isUpdatedByPreset
     * @return {?}
     */
    updateFilters(columnFilters, isUpdatedByPreset) {
        /** @type {?} */
        let searchBy = '';
        /** @type {?} */
        const searchByArray = [];
        // on filter preset load, we need to keep current filters
        if (isUpdatedByPreset) {
            this._currentFilters = this.castFilterToColumnFilter(columnFilters);
        }
        // loop through all columns to inspect filters
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
                    (column) => {
                        return column.id === columnFilter.columnId;
                    }));
                }
                else {
                    columnDef = columnFilter.columnDef;
                }
                if (!columnDef) {
                    throw new Error('[Backend Service API]: Something went wrong in trying to get the column definition of the specified filter (or preset filters). Did you make a typo on the filter columnId?');
                }
                /** @type {?} */
                let fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field || columnDef.name || '';
                /** @type {?} */
                const fieldType = columnDef.type || 'string';
                /** @type {?} */
                const searchTerms = (columnFilter ? columnFilter.searchTerms : null) || [];
                /** @type {?} */
                let fieldSearchValue = (Array.isArray(searchTerms) && searchTerms.length === 1) ? searchTerms[0] : '';
                if (typeof fieldSearchValue === 'undefined') {
                    fieldSearchValue = '';
                }
                if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                    throw new Error(`ODdata filter searchTerm property must be provided as type "string", if you use filter with options then make sure your IDs are also string. For example: filter: {model: Filters.select, collection: [{ id: "0", value: "0" }, { id: "1", value: "1" }]`);
                }
                fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                // make sure it's a string
                /** @type {?} */
                const matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/);
                // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                /** @type {?} */
                const operator = columnFilter.operator || ((matches) ? matches[1] : '');
                /** @type {?} */
                let searchValue = (!!matches) ? matches[2] : '';
                /** @type {?} */
                const lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                /** @type {?} */
                const bypassOdataQuery = columnFilter.bypassBackendQuery || false;
                // no need to query if search value is empty
                if (fieldName && searchValue === '' && searchTerms.length === 0) {
                    this.removeColumnFilter(fieldName);
                    continue;
                }
                // escaping the search value
                searchValue = searchValue.replace(`'`, `''`); // escape single quotes by doubling them
                searchValue = encodeURIComponent(searchValue); // encode URI of the final search value
                // extra query arguments
                if (bypassOdataQuery) {
                    // push to our temp array and also trim white spaces
                    if (fieldName) {
                        this.saveColumnFilter(fieldName, fieldSearchValue, searchTerms);
                    }
                }
                else {
                    searchBy = '';
                    // titleCase the fieldName so that it matches the WebApi names
                    if (this.odataService.options.caseType === CaseType.pascalCase) {
                        fieldName = String.titleCase(fieldName || '');
                    }
                    // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
                    if (searchTerms && searchTerms.length > 1) {
                        /** @type {?} */
                        const tmpSearchTerms = [];
                        if (operator === 'IN') {
                            // example:: (Stage eq "Expired" or Stage eq "Renewal")
                            for (let j = 0, lnj = searchTerms.length; j < lnj; j++) {
                                tmpSearchTerms.push(`${fieldName} eq '${searchTerms[j]}'`);
                            }
                            searchBy = tmpSearchTerms.join(' or ');
                            searchBy = `(${searchBy})`;
                        }
                        else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
                            // example:: (Stage ne "Expired" and Stage ne "Renewal")
                            for (let k = 0, lnk = searchTerms.length; k < lnk; k++) {
                                tmpSearchTerms.push(`${fieldName} ne '${searchTerms[k]}'`);
                            }
                            searchBy = tmpSearchTerms.join(' and ');
                            searchBy = `(${searchBy})`;
                        }
                    }
                    else if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar !== '') {
                        // first/last character is a '*' will be a startsWith or endsWith
                        searchBy = (operator === '*' || operator === '*z')
                            ? `endswith(${fieldName}, '${searchValue}')`
                            : `startswith(${fieldName}, '${searchValue}')`;
                    }
                    else if (fieldType === FieldType.date) {
                        // date field needs to be UTC and within DateTime function
                        /** @type {?} */
                        const dateFormatted = parseUtcDate(searchValue, true);
                        if (dateFormatted) {
                            searchBy = `${fieldName} ${this.mapOdataOperator(operator)} DateTime'${dateFormatted}'`;
                        }
                    }
                    else if (fieldType === FieldType.string) {
                        // string field needs to be in single quotes
                        if (operator === '') {
                            searchBy = `substringof('${searchValue}', ${fieldName})`;
                        }
                        else {
                            // searchBy = `substringof('${searchValue}', ${fieldNameCased}) ${this.mapOdataOperator(operator)} true`;
                            searchBy = `${fieldName} ${this.mapOdataOperator(operator)} '${searchValue}'`;
                        }
                    }
                    else {
                        // any other field type (or undefined type)
                        searchValue = fieldType === FieldType.number ? searchValue : `'${searchValue}'`;
                        searchBy = `${fieldName} ${this.mapOdataOperator(operator)} ${searchValue}`;
                    }
                    // push to our temp array and also trim white spaces
                    if (searchBy !== '') {
                        searchByArray.push(String.trim(searchBy));
                        this.saveColumnFilter(fieldName || '', fieldSearchValue, searchTerms);
                    }
                }
            }
        }
        // update the service options with filters for the buildQuery() to work later
        this.odataService.updateOptions({
            filter: (searchByArray.length > 0) ? searchByArray.join(' and ') : '',
            skip: undefined
        });
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
        this.odataService.updateOptions({
            top: pageSize,
            skip: (newPage - 1) * pageSize
        });
    }
    /**
     * loop through all columns to inspect sorters & update backend service orderBy
     * @param {?=} sortColumns
     * @param {?=} presetSorters
     * @return {?}
     */
    updateSorters(sortColumns, presetSorters) {
        /** @type {?} */
        let sortByArray = [];
        /** @type {?} */
        const sorterArray = [];
        if (!sortColumns && presetSorters) {
            // make the presets the current sorters, also make sure that all direction are in lowercase for OData
            sortByArray = presetSorters;
            sortByArray.forEach((/**
             * @param {?} sorter
             * @return {?}
             */
            (sorter) => sorter.direction = (/** @type {?} */ (sorter.direction.toLowerCase()))));
            // display the correct sorting icons on the UI, for that it requires (columnId, sortAsc) properties
            /** @type {?} */
            const tmpSorterArray = sortByArray.map((/**
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
                    for (const columnDef of sortColumns) {
                        if (columnDef.sortCol) {
                            /** @type {?} */
                            let fieldName = (columnDef.sortCol.queryField || columnDef.sortCol.queryFieldSorter || columnDef.sortCol.field || columnDef.sortCol.id) + '';
                            /** @type {?} */
                            let columnFieldName = (columnDef.sortCol.field || columnDef.sortCol.id) + '';
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
                    sortByArray = sorterArray;
                }
            }
        }
        // transform the sortby array into a CSV string for OData
        sortByArray = sortByArray || (/** @type {?} */ ([]));
        /** @type {?} */
        const csvString = sortByArray.map((/**
         * @param {?} sorter
         * @return {?}
         */
        (sorter) => {
            if (sorter && sorter.columnId) {
                return `${sorter.columnId} ${sorter && sorter.direction && sorter.direction.toLowerCase() || ''}`;
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
        const filtersArray = (/** @type {?} */ (((typeof columnFilters === 'object') ? Object.keys(columnFilters).map((/**
         * @param {?} key
         * @return {?}
         */
        key => columnFilters[key])) : columnFilters)));
        return filtersArray.map((/**
         * @param {?} filter
         * @return {?}
         */
        (filter) => {
            /** @type {?} */
            const columnDef = filter.columnDef;
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
    /**
     * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
     * @private
     * @param {?} operator
     * @return {?} string map
     */
    mapOdataOperator(operator) {
        /** @type {?} */
        let map = '';
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
    }
}
GridOdataService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
GridOdataService.ctorParameters = () => [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1vZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9ncmlkLW9kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFFTCxRQUFRLEVBU1IsU0FBUyxFQU1ULGFBQWEsRUFFZCxNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7TUFFekMsc0JBQXNCLEdBQUcsRUFBRTs7TUFDM0IsaUJBQWlCLEdBQUcsRUFBRTtBQUc1QixNQUFNLE9BQU8sZ0JBQWdCO0lBZTNCO1FBZFEsb0JBQWUsR0FBb0IsRUFBRSxDQUFDO1FBRXRDLG9CQUFlLEdBQW9CLEVBQUUsQ0FBQztRQU05QyxtQkFBYyxHQUFnQjtZQUM1QixHQUFHLEVBQUUsc0JBQXNCO1lBQzNCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsUUFBUSxFQUFFLFFBQVEsQ0FBQyxVQUFVO1NBQzlCLENBQUM7UUFHQSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQzs7Ozs7O0lBR0QsSUFBWSxZQUFZO1FBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM5RSxDQUFDOzs7O0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFV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SUFDTCxDQUFDOzs7Ozs7O0lBT08sZ0JBQWdCLENBQUMsUUFBZ0I7O1lBQ25DLEdBQUcsR0FBRyxFQUFFO1FBQ1osUUFBUSxRQUFRLEVBQUU7WUFDaEIsS0FBSyxHQUFHO2dCQUNOLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0JBQ1gsTUFBTTtZQUNSLEtBQUssSUFBSTtnQkFDUCxHQUFHLEdBQUcsSUFBSSxDQUFDO2dCQUNYLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sR0FBRyxHQUFHLElBQUksQ0FBQztnQkFDWCxNQUFNO1lBQ1IsS0FBSyxJQUFJO2dCQUNQLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0JBQ1gsTUFBTTtZQUNSLEtBQUssSUFBSSxDQUFDO1lBQ1YsS0FBSyxJQUFJO2dCQUNQLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0JBQ1gsTUFBTTtZQUNSLEtBQUssR0FBRyxDQUFDO1lBQ1QsS0FBSyxJQUFJLENBQUM7WUFDVjtnQkFDRSxHQUFHLEdBQUcsSUFBSSxDQUFDO2dCQUNYLE1BQU07U0FDVDtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7O1lBL2FGLFVBQVU7Ozs7Ozs7OztJQUVULDJDQUE4Qzs7Ozs7SUFDOUMsOENBQThDOzs7OztJQUM5QywyQ0FBOEM7Ozs7O0lBQzlDLDhDQUFxQzs7Ozs7SUFDckMsaUNBQW1COztJQUNuQix3Q0FBMkI7O0lBQzNCLG1DQUFxQjs7SUFDckIsc0NBQW1DOztJQUNuQywwQ0FJRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9nbG9iYWwtdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgcGFyc2VVdGNEYXRlIH0gZnJvbSAnLi91dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQmFja2VuZFNlcnZpY2UsXHJcbiAgQ2FzZVR5cGUsXHJcbiAgQ29sdW1uLFxyXG4gIENvbHVtbkZpbHRlcixcclxuICBDb2x1bW5GaWx0ZXJzLFxyXG4gIENvbHVtblNvcnQsXHJcbiAgQ3VycmVudEZpbHRlcixcclxuICBDdXJyZW50UGFnaW5hdGlvbixcclxuICBDdXJyZW50U29ydGVyLFxyXG4gIEZpbHRlckNoYW5nZWRBcmdzLFxyXG4gIEZpZWxkVHlwZSxcclxuICBHcmlkT3B0aW9uLFxyXG4gIE9kYXRhT3B0aW9uLFxyXG4gIFBhZ2luYXRpb24sXHJcbiAgUGFnaW5hdGlvbkNoYW5nZWRBcmdzLFxyXG4gIFNvcnRDaGFuZ2VkQXJncyxcclxuICBTb3J0RGlyZWN0aW9uLFxyXG4gIFNvcnREaXJlY3Rpb25TdHJpbmdcclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IE9kYXRhU2VydmljZSB9IGZyb20gJy4vb2RhdGEuc2VydmljZSc7XHJcblxyXG5jb25zdCBERUZBVUxUX0lURU1TX1BFUl9QQUdFID0gMjU7XHJcbmNvbnN0IERFRkFVTFRfUEFHRV9TSVpFID0gMjA7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHcmlkT2RhdGFTZXJ2aWNlIGltcGxlbWVudHMgQmFja2VuZFNlcnZpY2Uge1xyXG4gIHByaXZhdGUgX2N1cnJlbnRGaWx0ZXJzOiBDdXJyZW50RmlsdGVyW10gPSBbXTtcclxuICBwcml2YXRlIF9jdXJyZW50UGFnaW5hdGlvbjogQ3VycmVudFBhZ2luYXRpb247XHJcbiAgcHJpdmF0ZSBfY3VycmVudFNvcnRlcnM6IEN1cnJlbnRTb3J0ZXJbXSA9IFtdO1xyXG4gIHByaXZhdGUgX2NvbHVtbkRlZmluaXRpb25zOiBDb2x1bW5bXTtcclxuICBwcml2YXRlIF9ncmlkOiBhbnk7XHJcbiAgb2RhdGFTZXJ2aWNlOiBPZGF0YVNlcnZpY2U7XHJcbiAgb3B0aW9uczogT2RhdGFPcHRpb247XHJcbiAgcGFnaW5hdGlvbjogUGFnaW5hdGlvbiB8IHVuZGVmaW5lZDtcclxuICBkZWZhdWx0T3B0aW9uczogT2RhdGFPcHRpb24gPSB7XHJcbiAgICB0b3A6IERFRkFVTFRfSVRFTVNfUEVSX1BBR0UsXHJcbiAgICBvcmRlckJ5OiAnJyxcclxuICAgIGNhc2VUeXBlOiBDYXNlVHlwZS5wYXNjYWxDYXNlXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLm9kYXRhU2VydmljZSA9IG5ldyBPZGF0YVNlcnZpY2UoKTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXHJcbiAgcHJpdmF0ZSBnZXQgX2dyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xyXG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLl9ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xyXG4gIH1cclxuXHJcbiAgYnVpbGRRdWVyeSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMub2RhdGFTZXJ2aWNlLmJ1aWxkUXVlcnkoKTtcclxuICB9XHJcblxyXG4gIGNsZWFyRmlsdGVycygpIHtcclxuICAgIHRoaXMuX2N1cnJlbnRGaWx0ZXJzID0gW107XHJcbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoeyBmaWx0ZXJpbmdPcHRpb25zOiBbXSB9KTtcclxuICB9XHJcblxyXG4gIGNsZWFyU29ydGVycygpIHtcclxuICAgIHRoaXMuX2N1cnJlbnRTb3J0ZXJzID0gW107XHJcbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoeyBzb3J0aW5nT3B0aW9uczogW10gfSk7XHJcbiAgfVxyXG5cclxuICBpbml0KG9wdGlvbnM6IE9kYXRhT3B0aW9uLCBwYWdpbmF0aW9uPzogUGFnaW5hdGlvbiwgZ3JpZD86IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XHJcbiAgICBjb25zdCBtZXJnZWRPcHRpb25zID0geyAuLi50aGlzLmRlZmF1bHRPcHRpb25zLCAuLi5vcHRpb25zIH07XHJcbiAgICBpZiAocGFnaW5hdGlvbiAmJiBwYWdpbmF0aW9uLnBhZ2VTaXplKSB7XHJcbiAgICAgIG1lcmdlZE9wdGlvbnMudG9wID0gcGFnaW5hdGlvbi5wYWdlU2l6ZTtcclxuICAgIH1cclxuICAgIHRoaXMub2RhdGFTZXJ2aWNlLm9wdGlvbnMgPSB7IC4uLm1lcmdlZE9wdGlvbnMsIHRvcDogbWVyZ2VkT3B0aW9ucy50b3AgfHwgdGhpcy5kZWZhdWx0T3B0aW9ucy50b3AgfTtcclxuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMub2RhdGFTZXJ2aWNlLm9wdGlvbnM7XHJcbiAgICB0aGlzLnBhZ2luYXRpb24gPSBwYWdpbmF0aW9uO1xyXG5cclxuICAgIC8vIHNhdmUgY3VycmVudCBwYWdpbmF0aW9uIGFzIFBhZ2UgMSBhbmQgcGFnZSBzaXplIGFzIFwidG9wXCJcclxuICAgIHRoaXMuX2N1cnJlbnRQYWdpbmF0aW9uID0ge1xyXG4gICAgICBwYWdlTnVtYmVyOiAxLFxyXG4gICAgICBwYWdlU2l6ZTogdGhpcy5vZGF0YVNlcnZpY2Uub3B0aW9ucy50b3AgfHwgdGhpcy5kZWZhdWx0T3B0aW9ucy50b3BcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGdyaWQgJiYgZ3JpZC5nZXRDb2x1bW5zKSB7XHJcbiAgICAgIHRoaXMuX2NvbHVtbkRlZmluaXRpb25zID0gKG9wdGlvbnMgJiYgb3B0aW9ucy5jb2x1bW5EZWZpbml0aW9ucykgfHwgZ3JpZC5nZXRDb2x1bW5zKCk7XHJcbiAgICAgIHRoaXMuX2NvbHVtbkRlZmluaXRpb25zID0gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMuZmlsdGVyKChjb2x1bW46IENvbHVtbikgPT4gIWNvbHVtbi5leGNsdWRlRnJvbVF1ZXJ5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZU9wdGlvbnMoc2VydmljZU9wdGlvbnM/OiBPZGF0YU9wdGlvbikge1xyXG4gICAgdGhpcy5vcHRpb25zID0geyAuLi50aGlzLm9wdGlvbnMsIC4uLnNlcnZpY2VPcHRpb25zIH07XHJcbiAgfVxyXG5cclxuICByZW1vdmVDb2x1bW5GaWx0ZXIoZmllbGROYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMub2RhdGFTZXJ2aWNlLnJlbW92ZUNvbHVtbkZpbHRlcihmaWVsZE5hbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgRmlsdGVycyB0aGF0IGFyZSBjdXJyZW50bHkgdXNlZCBieSB0aGUgZ3JpZCAqL1xyXG4gIGdldEN1cnJlbnRGaWx0ZXJzKCk6IEN1cnJlbnRGaWx0ZXJbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEZpbHRlcnM7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IHRoZSBQYWdpbmF0aW9uIHRoYXQgaXMgY3VycmVudGx5IHVzZWQgYnkgdGhlIGdyaWQgKi9cclxuICBnZXRDdXJyZW50UGFnaW5hdGlvbigpOiBDdXJyZW50UGFnaW5hdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFBhZ2luYXRpb247XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IHRoZSBTb3J0ZXJzIHRoYXQgYXJlIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBncmlkICovXHJcbiAgZ2V0Q3VycmVudFNvcnRlcnMoKTogQ3VycmVudFNvcnRlcltdIHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50U29ydGVycztcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogUmVzZXQgdGhlIHBhZ2luYXRpb24gb3B0aW9uc1xyXG4gICAqL1xyXG4gIHJlc2V0UGFnaW5hdGlvbk9wdGlvbnMoKSB7XHJcbiAgICB0aGlzLm9kYXRhU2VydmljZS51cGRhdGVPcHRpb25zKHtcclxuICAgICAgc2tpcDogMFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzYXZlQ29sdW1uRmlsdGVyKGZpZWxkTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCB0ZXJtcz86IGFueVtdKSB7XHJcbiAgICB0aGlzLm9kYXRhU2VydmljZS5zYXZlQ29sdW1uRmlsdGVyKGZpZWxkTmFtZSwgdmFsdWUsIHRlcm1zKTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogRklMVEVSSU5HXHJcbiAgICovXHJcbiAgcHJvY2Vzc09uRmlsdGVyQ2hhbmdlZChldmVudDogRXZlbnQsIGFyZ3M6IEZpbHRlckNoYW5nZWRBcmdzKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIGNvbnN0IHNlcnZpY2VPcHRpb25zOiBHcmlkT3B0aW9uID0gYXJncy5ncmlkLmdldE9wdGlvbnMoKTtcclxuICAgIGNvbnN0IGJhY2tlbmRBcGkgPSBzZXJ2aWNlT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaTtcclxuXHJcbiAgICBpZiAoYmFja2VuZEFwaSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcgaW4gdGhlIEdyaWRPZGF0YVNlcnZpY2UsIFwiYmFja2VuZFNlcnZpY2VBcGlcIiBpcyBub3QgaW5pdGlhbGl6ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBrZWVwIGN1cnJlbnQgZmlsdGVycyAmIGFsd2F5cyBzYXZlIGl0IGFzIGFuIGFycmF5IChjb2x1bW5GaWx0ZXJzIGNhbiBiZSBhbiBvYmplY3Qgd2hlbiBpdCBpcyBkZWFsdCBieSBTbGlja0dyaWQgRmlsdGVyKVxyXG4gICAgdGhpcy5fY3VycmVudEZpbHRlcnMgPSB0aGlzLmNhc3RGaWx0ZXJUb0NvbHVtbkZpbHRlcihhcmdzLmNvbHVtbkZpbHRlcnMpO1xyXG5cclxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgLy8gbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW5zIHRvIGluc3BlY3QgZmlsdGVycyAmIHNldCB0aGUgcXVlcnlcclxuICAgICAgdGhpcy51cGRhdGVGaWx0ZXJzKGFyZ3MuY29sdW1uRmlsdGVycyk7XHJcblxyXG4gICAgICB0aGlzLnJlc2V0UGFnaW5hdGlvbk9wdGlvbnMoKTtcclxuICAgICAgcmVzb2x2ZSh0aGlzLm9kYXRhU2VydmljZS5idWlsZFF1ZXJ5KCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFBBR0lOQVRJT05cclxuICAgKi9cclxuICBwcm9jZXNzT25QYWdpbmF0aW9uQ2hhbmdlZChldmVudDogRXZlbnQsIGFyZ3M6IFBhZ2luYXRpb25DaGFuZ2VkQXJncykge1xyXG4gICAgY29uc3QgcGFnZVNpemUgPSArKGFyZ3MucGFnZVNpemUgfHwgREVGQVVMVF9QQUdFX1NJWkUpO1xyXG4gICAgdGhpcy51cGRhdGVQYWdpbmF0aW9uKGFyZ3MubmV3UGFnZSwgcGFnZVNpemUpO1xyXG5cclxuICAgIC8vIGJ1aWxkIHRoZSBPRGF0YSBxdWVyeSB3aGljaCB3ZSB3aWxsIHVzZSBpbiB0aGUgV2ViQVBJIGNhbGxiYWNrXHJcbiAgICByZXR1cm4gdGhpcy5vZGF0YVNlcnZpY2UuYnVpbGRRdWVyeSgpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBTT1JUSU5HXHJcbiAgICovXHJcbiAgcHJvY2Vzc09uU29ydENoYW5nZWQoZXZlbnQ6IEV2ZW50LCBhcmdzOiBTb3J0Q2hhbmdlZEFyZ3MpIHtcclxuICAgIGNvbnN0IHNvcnRDb2x1bW5zID0gKGFyZ3MubXVsdGlDb2x1bW5Tb3J0KSA/IGFyZ3Muc29ydENvbHMgOiBuZXcgQXJyYXkoeyBzb3J0Q29sOiBhcmdzLnNvcnRDb2wsIHNvcnRBc2M6IGFyZ3Muc29ydEFzYyB9KTtcclxuXHJcbiAgICAvLyBsb29wIHRocm91Z2ggYWxsIGNvbHVtbnMgdG8gaW5zcGVjdCBzb3J0ZXJzICYgc2V0IHRoZSBxdWVyeVxyXG4gICAgdGhpcy51cGRhdGVTb3J0ZXJzKHNvcnRDb2x1bW5zKTtcclxuXHJcbiAgICAvLyBidWlsZCB0aGUgT0RhdGEgcXVlcnkgd2hpY2ggd2Ugd2lsbCB1c2UgaW4gdGhlIFdlYkFQSSBjYWxsYmFja1xyXG4gICAgcmV0dXJuIHRoaXMub2RhdGFTZXJ2aWNlLmJ1aWxkUXVlcnkoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1ucyB0byBpbnNwZWN0IGZpbHRlcnMgJiB1cGRhdGUgYmFja2VuZCBzZXJ2aWNlIGZpbHRlcmluZ09wdGlvbnNcclxuICAgKiBAcGFyYW0gY29sdW1uRmlsdGVyc1xyXG4gICAqL1xyXG4gIHVwZGF0ZUZpbHRlcnMoY29sdW1uRmlsdGVyczogQ29sdW1uRmlsdGVycyB8IEN1cnJlbnRGaWx0ZXJbXSwgaXNVcGRhdGVkQnlQcmVzZXQ/OiBib29sZWFuKSB7XHJcbiAgICBsZXQgc2VhcmNoQnkgPSAnJztcclxuICAgIGNvbnN0IHNlYXJjaEJ5QXJyYXk6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgLy8gb24gZmlsdGVyIHByZXNldCBsb2FkLCB3ZSBuZWVkIHRvIGtlZXAgY3VycmVudCBmaWx0ZXJzXHJcbiAgICBpZiAoaXNVcGRhdGVkQnlQcmVzZXQpIHtcclxuICAgICAgdGhpcy5fY3VycmVudEZpbHRlcnMgPSB0aGlzLmNhc3RGaWx0ZXJUb0NvbHVtbkZpbHRlcihjb2x1bW5GaWx0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBsb29wIHRocm91Z2ggYWxsIGNvbHVtbnMgdG8gaW5zcGVjdCBmaWx0ZXJzXHJcbiAgICBmb3IgKGNvbnN0IGNvbHVtbklkIGluIGNvbHVtbkZpbHRlcnMpIHtcclxuICAgICAgaWYgKGNvbHVtbkZpbHRlcnMuaGFzT3duUHJvcGVydHkoY29sdW1uSWQpKSB7XHJcbiAgICAgICAgY29uc3QgY29sdW1uRmlsdGVyID0gY29sdW1uRmlsdGVyc1tjb2x1bW5JZF07XHJcblxyXG4gICAgICAgIC8vIGlmIHVzZXIgZGVmaW5lZCBzb21lIFwicHJlc2V0c1wiLCB0aGVuIHdlIG5lZWQgdG8gZmluZCB0aGUgZmlsdGVycyBmcm9tIHRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgaW5zdGVhZFxyXG4gICAgICAgIGxldCBjb2x1bW5EZWY6IENvbHVtbiB8IHVuZGVmaW5lZDtcclxuICAgICAgICBpZiAoaXNVcGRhdGVkQnlQcmVzZXQgJiYgQXJyYXkuaXNBcnJheSh0aGlzLl9jb2x1bW5EZWZpbml0aW9ucykpIHtcclxuICAgICAgICAgIGNvbHVtbkRlZiA9IHRoaXMuX2NvbHVtbkRlZmluaXRpb25zLmZpbmQoKGNvbHVtbjogQ29sdW1uKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb2x1bW4uaWQgPT09IGNvbHVtbkZpbHRlci5jb2x1bW5JZDtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb2x1bW5EZWYgPSBjb2x1bW5GaWx0ZXIuY29sdW1uRGVmO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWNvbHVtbkRlZikge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbQmFja2VuZCBTZXJ2aWNlIEFQSV06IFNvbWV0aGluZyB3ZW50IHdyb25nIGluIHRyeWluZyB0byBnZXQgdGhlIGNvbHVtbiBkZWZpbml0aW9uIG9mIHRoZSBzcGVjaWZpZWQgZmlsdGVyIChvciBwcmVzZXQgZmlsdGVycykuIERpZCB5b3UgbWFrZSBhIHR5cG8gb24gdGhlIGZpbHRlciBjb2x1bW5JZD8nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmaWVsZE5hbWUgPSBjb2x1bW5EZWYucXVlcnlGaWVsZCB8fCBjb2x1bW5EZWYucXVlcnlGaWVsZEZpbHRlciB8fCBjb2x1bW5EZWYuZmllbGQgfHwgY29sdW1uRGVmLm5hbWUgfHwgJyc7XHJcbiAgICAgICAgY29uc3QgZmllbGRUeXBlID0gY29sdW1uRGVmLnR5cGUgfHwgJ3N0cmluZyc7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoVGVybXMgPSAoY29sdW1uRmlsdGVyID8gY29sdW1uRmlsdGVyLnNlYXJjaFRlcm1zIDogbnVsbCkgfHwgW107XHJcbiAgICAgICAgbGV0IGZpZWxkU2VhcmNoVmFsdWUgPSAoQXJyYXkuaXNBcnJheShzZWFyY2hUZXJtcykgJiYgc2VhcmNoVGVybXMubGVuZ3RoID09PSAxKSA/IHNlYXJjaFRlcm1zWzBdIDogJyc7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZFNlYXJjaFZhbHVlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgZmllbGRTZWFyY2hWYWx1ZSA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZFNlYXJjaFZhbHVlICE9PSAnc3RyaW5nJyAmJiAhc2VhcmNoVGVybXMpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgT0RkYXRhIGZpbHRlciBzZWFyY2hUZXJtIHByb3BlcnR5IG11c3QgYmUgcHJvdmlkZWQgYXMgdHlwZSBcInN0cmluZ1wiLCBpZiB5b3UgdXNlIGZpbHRlciB3aXRoIG9wdGlvbnMgdGhlbiBtYWtlIHN1cmUgeW91ciBJRHMgYXJlIGFsc28gc3RyaW5nLiBGb3IgZXhhbXBsZTogZmlsdGVyOiB7bW9kZWw6IEZpbHRlcnMuc2VsZWN0LCBjb2xsZWN0aW9uOiBbeyBpZDogXCIwXCIsIHZhbHVlOiBcIjBcIiB9LCB7IGlkOiBcIjFcIiwgdmFsdWU6IFwiMVwiIH1dYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmaWVsZFNlYXJjaFZhbHVlID0gJycgKyBmaWVsZFNlYXJjaFZhbHVlOyAvLyBtYWtlIHN1cmUgaXQncyBhIHN0cmluZ1xyXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBmaWVsZFNlYXJjaFZhbHVlLm1hdGNoKC9eKFs8PiE9XFwqXXswLDJ9KSguKltePD4hPVxcKl0pKFtcXCpdPykkLyk7IC8vIGdyb3VwIDE6IE9wZXJhdG9yLCAyOiBzZWFyY2hWYWx1ZSwgMzogbGFzdCBjaGFyIGlzICcqJyAobWVhbmluZyBzdGFydHMgd2l0aCwgZXguOiBhYmMqKVxyXG4gICAgICAgIGNvbnN0IG9wZXJhdG9yID0gY29sdW1uRmlsdGVyLm9wZXJhdG9yIHx8ICgobWF0Y2hlcykgPyBtYXRjaGVzWzFdIDogJycpO1xyXG4gICAgICAgIGxldCBzZWFyY2hWYWx1ZSA9ICghIW1hdGNoZXMpID8gbWF0Y2hlc1syXSA6ICcnO1xyXG4gICAgICAgIGNvbnN0IGxhc3RWYWx1ZUNoYXIgPSAoISFtYXRjaGVzKSA/IG1hdGNoZXNbM10gOiAob3BlcmF0b3IgPT09ICcqeicgPyAnKicgOiAnJyk7XHJcbiAgICAgICAgY29uc3QgYnlwYXNzT2RhdGFRdWVyeSA9IGNvbHVtbkZpbHRlci5ieXBhc3NCYWNrZW5kUXVlcnkgfHwgZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIG5vIG5lZWQgdG8gcXVlcnkgaWYgc2VhcmNoIHZhbHVlIGlzIGVtcHR5XHJcbiAgICAgICAgaWYgKGZpZWxkTmFtZSAmJiBzZWFyY2hWYWx1ZSA9PT0gJycgJiYgc2VhcmNoVGVybXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbW92ZUNvbHVtbkZpbHRlcihmaWVsZE5hbWUpO1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBlc2NhcGluZyB0aGUgc2VhcmNoIHZhbHVlXHJcbiAgICAgICAgc2VhcmNoVmFsdWUgPSBzZWFyY2hWYWx1ZS5yZXBsYWNlKGAnYCwgYCcnYCk7IC8vIGVzY2FwZSBzaW5nbGUgcXVvdGVzIGJ5IGRvdWJsaW5nIHRoZW1cclxuICAgICAgICBzZWFyY2hWYWx1ZSA9IGVuY29kZVVSSUNvbXBvbmVudChzZWFyY2hWYWx1ZSk7IC8vIGVuY29kZSBVUkkgb2YgdGhlIGZpbmFsIHNlYXJjaCB2YWx1ZVxyXG5cclxuICAgICAgICAvLyBleHRyYSBxdWVyeSBhcmd1bWVudHNcclxuICAgICAgICBpZiAoYnlwYXNzT2RhdGFRdWVyeSkge1xyXG4gICAgICAgICAgLy8gcHVzaCB0byBvdXIgdGVtcCBhcnJheSBhbmQgYWxzbyB0cmltIHdoaXRlIHNwYWNlc1xyXG4gICAgICAgICAgaWYgKGZpZWxkTmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVDb2x1bW5GaWx0ZXIoZmllbGROYW1lLCBmaWVsZFNlYXJjaFZhbHVlLCBzZWFyY2hUZXJtcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNlYXJjaEJ5ID0gJyc7XHJcblxyXG4gICAgICAgICAgLy8gdGl0bGVDYXNlIHRoZSBmaWVsZE5hbWUgc28gdGhhdCBpdCBtYXRjaGVzIHRoZSBXZWJBcGkgbmFtZXNcclxuICAgICAgICAgIGlmICh0aGlzLm9kYXRhU2VydmljZS5vcHRpb25zLmNhc2VUeXBlID09PSBDYXNlVHlwZS5wYXNjYWxDYXNlKSB7XHJcbiAgICAgICAgICAgIGZpZWxkTmFtZSA9IFN0cmluZy50aXRsZUNhc2UoZmllbGROYW1lIHx8ICcnKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyB3aGVuIGhhdmluZyBtb3JlIHRoYW4gMSBzZWFyY2ggdGVybSAodGhlbiBjaGVjayBpZiB3ZSBoYXZlIGEgXCJJTlwiIG9yIFwiTk9UIElOXCIgZmlsdGVyIHNlYXJjaClcclxuICAgICAgICAgIGlmIChzZWFyY2hUZXJtcyAmJiBzZWFyY2hUZXJtcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRtcFNlYXJjaFRlcm1zID0gW107XHJcblxyXG4gICAgICAgICAgICBpZiAob3BlcmF0b3IgPT09ICdJTicpIHtcclxuICAgICAgICAgICAgICAvLyBleGFtcGxlOjogKFN0YWdlIGVxIFwiRXhwaXJlZFwiIG9yIFN0YWdlIGVxIFwiUmVuZXdhbFwiKVxyXG4gICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBsbmogPSBzZWFyY2hUZXJtcy5sZW5ndGg7IGogPCBsbmo7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdG1wU2VhcmNoVGVybXMucHVzaChgJHtmaWVsZE5hbWV9IGVxICcke3NlYXJjaFRlcm1zW2pdfSdgKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgc2VhcmNoQnkgPSB0bXBTZWFyY2hUZXJtcy5qb2luKCcgb3IgJyk7XHJcbiAgICAgICAgICAgICAgc2VhcmNoQnkgPSBgKCR7c2VhcmNoQnl9KWA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09ICdOSU4nIHx8IG9wZXJhdG9yID09PSAnTk9USU4nIHx8IG9wZXJhdG9yID09PSAnTk9UIElOJykge1xyXG4gICAgICAgICAgICAgIC8vIGV4YW1wbGU6OiAoU3RhZ2UgbmUgXCJFeHBpcmVkXCIgYW5kIFN0YWdlIG5lIFwiUmVuZXdhbFwiKVxyXG4gICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwLCBsbmsgPSBzZWFyY2hUZXJtcy5sZW5ndGg7IGsgPCBsbms7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgdG1wU2VhcmNoVGVybXMucHVzaChgJHtmaWVsZE5hbWV9IG5lICcke3NlYXJjaFRlcm1zW2tdfSdgKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgc2VhcmNoQnkgPSB0bXBTZWFyY2hUZXJtcy5qb2luKCcgYW5kICcpO1xyXG4gICAgICAgICAgICAgIHNlYXJjaEJ5ID0gYCgke3NlYXJjaEJ5fSlgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSAnKicgfHwgb3BlcmF0b3IgPT09ICdhKicgfHwgb3BlcmF0b3IgPT09ICcqeicgfHwgbGFzdFZhbHVlQ2hhciAhPT0gJycpIHtcclxuICAgICAgICAgICAgLy8gZmlyc3QvbGFzdCBjaGFyYWN0ZXIgaXMgYSAnKicgd2lsbCBiZSBhIHN0YXJ0c1dpdGggb3IgZW5kc1dpdGhcclxuICAgICAgICAgICAgc2VhcmNoQnkgPSAob3BlcmF0b3IgPT09ICcqJyB8fCBvcGVyYXRvciA9PT0gJyp6JylcclxuICAgICAgICAgICAgICA/IGBlbmRzd2l0aCgke2ZpZWxkTmFtZX0sICcke3NlYXJjaFZhbHVlfScpYFxyXG4gICAgICAgICAgICAgIDogYHN0YXJ0c3dpdGgoJHtmaWVsZE5hbWV9LCAnJHtzZWFyY2hWYWx1ZX0nKWA7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGZpZWxkVHlwZSA9PT0gRmllbGRUeXBlLmRhdGUpIHtcclxuICAgICAgICAgICAgLy8gZGF0ZSBmaWVsZCBuZWVkcyB0byBiZSBVVEMgYW5kIHdpdGhpbiBEYXRlVGltZSBmdW5jdGlvblxyXG4gICAgICAgICAgICBjb25zdCBkYXRlRm9ybWF0dGVkID0gcGFyc2VVdGNEYXRlKHNlYXJjaFZhbHVlLCB0cnVlKTtcclxuICAgICAgICAgICAgaWYgKGRhdGVGb3JtYXR0ZWQpIHtcclxuICAgICAgICAgICAgICBzZWFyY2hCeSA9IGAke2ZpZWxkTmFtZX0gJHt0aGlzLm1hcE9kYXRhT3BlcmF0b3Iob3BlcmF0b3IpfSBEYXRlVGltZScke2RhdGVGb3JtYXR0ZWR9J2A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoZmllbGRUeXBlID09PSBGaWVsZFR5cGUuc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIC8vIHN0cmluZyBmaWVsZCBuZWVkcyB0byBiZSBpbiBzaW5nbGUgcXVvdGVzXHJcbiAgICAgICAgICAgIGlmIChvcGVyYXRvciA9PT0gJycpIHtcclxuICAgICAgICAgICAgICBzZWFyY2hCeSA9IGBzdWJzdHJpbmdvZignJHtzZWFyY2hWYWx1ZX0nLCAke2ZpZWxkTmFtZX0pYDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyBzZWFyY2hCeSA9IGBzdWJzdHJpbmdvZignJHtzZWFyY2hWYWx1ZX0nLCAke2ZpZWxkTmFtZUNhc2VkfSkgJHt0aGlzLm1hcE9kYXRhT3BlcmF0b3Iob3BlcmF0b3IpfSB0cnVlYDtcclxuICAgICAgICAgICAgICBzZWFyY2hCeSA9IGAke2ZpZWxkTmFtZX0gJHt0aGlzLm1hcE9kYXRhT3BlcmF0b3Iob3BlcmF0b3IpfSAnJHtzZWFyY2hWYWx1ZX0nYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gYW55IG90aGVyIGZpZWxkIHR5cGUgKG9yIHVuZGVmaW5lZCB0eXBlKVxyXG4gICAgICAgICAgICBzZWFyY2hWYWx1ZSA9IGZpZWxkVHlwZSA9PT0gRmllbGRUeXBlLm51bWJlciA/IHNlYXJjaFZhbHVlIDogYCcke3NlYXJjaFZhbHVlfSdgO1xyXG4gICAgICAgICAgICBzZWFyY2hCeSA9IGAke2ZpZWxkTmFtZX0gJHt0aGlzLm1hcE9kYXRhT3BlcmF0b3Iob3BlcmF0b3IpfSAke3NlYXJjaFZhbHVlfWA7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gcHVzaCB0byBvdXIgdGVtcCBhcnJheSBhbmQgYWxzbyB0cmltIHdoaXRlIHNwYWNlc1xyXG4gICAgICAgICAgaWYgKHNlYXJjaEJ5ICE9PSAnJykge1xyXG4gICAgICAgICAgICBzZWFyY2hCeUFycmF5LnB1c2goU3RyaW5nLnRyaW0oc2VhcmNoQnkpKTtcclxuICAgICAgICAgICAgdGhpcy5zYXZlQ29sdW1uRmlsdGVyKGZpZWxkTmFtZSB8fCAnJywgZmllbGRTZWFyY2hWYWx1ZSwgc2VhcmNoVGVybXMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSB0aGUgc2VydmljZSBvcHRpb25zIHdpdGggZmlsdGVycyBmb3IgdGhlIGJ1aWxkUXVlcnkoKSB0byB3b3JrIGxhdGVyXHJcbiAgICB0aGlzLm9kYXRhU2VydmljZS51cGRhdGVPcHRpb25zKHtcclxuICAgICAgZmlsdGVyOiAoc2VhcmNoQnlBcnJheS5sZW5ndGggPiAwKSA/IHNlYXJjaEJ5QXJyYXkuam9pbignIGFuZCAnKSA6ICcnLFxyXG4gICAgICBza2lwOiB1bmRlZmluZWRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBwYWdpbmF0aW9uIGNvbXBvbmVudCB3aXRoIGl0J3MgbmV3IHBhZ2UgbnVtYmVyIGFuZCBzaXplXHJcbiAgICogQHBhcmFtIG5ld1BhZ2VcclxuICAgKiBAcGFyYW0gcGFnZVNpemVcclxuICAgKi9cclxuICB1cGRhdGVQYWdpbmF0aW9uKG5ld1BhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcikge1xyXG4gICAgdGhpcy5fY3VycmVudFBhZ2luYXRpb24gPSB7XHJcbiAgICAgIHBhZ2VOdW1iZXI6IG5ld1BhZ2UsXHJcbiAgICAgIHBhZ2VTaXplXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMub2RhdGFTZXJ2aWNlLnVwZGF0ZU9wdGlvbnMoe1xyXG4gICAgICB0b3A6IHBhZ2VTaXplLFxyXG4gICAgICBza2lwOiAobmV3UGFnZSAtIDEpICogcGFnZVNpemVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW5zIHRvIGluc3BlY3Qgc29ydGVycyAmIHVwZGF0ZSBiYWNrZW5kIHNlcnZpY2Ugb3JkZXJCeVxyXG4gICAqIEBwYXJhbSBjb2x1bW5GaWx0ZXJzXHJcbiAgICovXHJcbiAgdXBkYXRlU29ydGVycyhzb3J0Q29sdW1ucz86IENvbHVtblNvcnRbXSwgcHJlc2V0U29ydGVycz86IEN1cnJlbnRTb3J0ZXJbXSkge1xyXG4gICAgbGV0IHNvcnRCeUFycmF5OiBhbnlbXSA9IFtdO1xyXG4gICAgY29uc3Qgc29ydGVyQXJyYXk6IEN1cnJlbnRTb3J0ZXJbXSA9IFtdO1xyXG5cclxuICAgIGlmICghc29ydENvbHVtbnMgJiYgcHJlc2V0U29ydGVycykge1xyXG4gICAgICAvLyBtYWtlIHRoZSBwcmVzZXRzIHRoZSBjdXJyZW50IHNvcnRlcnMsIGFsc28gbWFrZSBzdXJlIHRoYXQgYWxsIGRpcmVjdGlvbiBhcmUgaW4gbG93ZXJjYXNlIGZvciBPRGF0YVxyXG4gICAgICBzb3J0QnlBcnJheSA9IHByZXNldFNvcnRlcnM7XHJcbiAgICAgIHNvcnRCeUFycmF5LmZvckVhY2goKHNvcnRlcikgPT4gc29ydGVyLmRpcmVjdGlvbiA9IHNvcnRlci5kaXJlY3Rpb24udG9Mb3dlckNhc2UoKSBhcyBTb3J0RGlyZWN0aW9uU3RyaW5nKTtcclxuXHJcbiAgICAgIC8vIGRpc3BsYXkgdGhlIGNvcnJlY3Qgc29ydGluZyBpY29ucyBvbiB0aGUgVUksIGZvciB0aGF0IGl0IHJlcXVpcmVzIChjb2x1bW5JZCwgc29ydEFzYykgcHJvcGVydGllc1xyXG4gICAgICBjb25zdCB0bXBTb3J0ZXJBcnJheSA9IHNvcnRCeUFycmF5Lm1hcCgoc29ydGVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29sdW1uRGVmID0gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMuZmluZCgoY29sdW1uOiBDb2x1bW4pID0+IGNvbHVtbi5pZCA9PT0gc29ydGVyLmNvbHVtbklkKTtcclxuXHJcbiAgICAgICAgc29ydGVyQXJyYXkucHVzaCh7XHJcbiAgICAgICAgICBjb2x1bW5JZDogY29sdW1uRGVmID8gKChjb2x1bW5EZWYucXVlcnlGaWVsZCB8fCBjb2x1bW5EZWYucXVlcnlGaWVsZFNvcnRlciB8fCBjb2x1bW5EZWYuZmllbGQgfHwgY29sdW1uRGVmLmlkKSArICcnKSA6IChzb3J0ZXIuY29sdW1uSWQgKyAnJyksXHJcbiAgICAgICAgICBkaXJlY3Rpb246IHNvcnRlci5kaXJlY3Rpb25cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gcmV0dXJuIG9ubHkgdGhlIGNvbHVtbihzKSBmb3VuZCBpbiB0aGUgQ29sdW1uIERlZmluaXRpb25zIEVMU0UgbnVsbFxyXG4gICAgICAgIGlmIChjb2x1bW5EZWYpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbklkOiBzb3J0ZXIuY29sdW1uSWQsXHJcbiAgICAgICAgICAgIHNvcnRBc2M6IHNvcnRlci5kaXJlY3Rpb24udG9VcHBlckNhc2UoKSA9PT0gU29ydERpcmVjdGlvbi5BU0NcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5fZ3JpZC5zZXRTb3J0Q29sdW1ucyh0bXBTb3J0ZXJBcnJheSk7XHJcbiAgICB9IGVsc2UgaWYgKHNvcnRDb2x1bW5zICYmICFwcmVzZXRTb3J0ZXJzKSB7XHJcbiAgICAgIC8vIGJ1aWxkIHRoZSBTb3J0Qnkgc3RyaW5nLCBpdCBjb3VsZCBiZSBtdWx0aXNvcnQsIGV4YW1wbGU6IGN1c3RvbWVyTm8gYXNjLCBwdXJjaGFzZXJOYW1lIGRlc2NcclxuICAgICAgaWYgKHNvcnRDb2x1bW5zICYmIHNvcnRDb2x1bW5zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHNvcnRCeUFycmF5ID0gbmV3IEFycmF5KHRoaXMuZGVmYXVsdE9wdGlvbnMub3JkZXJCeSk7IC8vIHdoZW4gZW1wdHksIHVzZSB0aGUgZGVmYXVsdCBzb3J0XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHNvcnRDb2x1bW5zKSB7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IGNvbHVtbkRlZiBvZiBzb3J0Q29sdW1ucykge1xyXG4gICAgICAgICAgICBpZiAoY29sdW1uRGVmLnNvcnRDb2wpIHtcclxuICAgICAgICAgICAgICBsZXQgZmllbGROYW1lID0gKGNvbHVtbkRlZi5zb3J0Q29sLnF1ZXJ5RmllbGQgfHwgY29sdW1uRGVmLnNvcnRDb2wucXVlcnlGaWVsZFNvcnRlciB8fCBjb2x1bW5EZWYuc29ydENvbC5maWVsZCB8fCBjb2x1bW5EZWYuc29ydENvbC5pZCkgKyAnJztcclxuICAgICAgICAgICAgICBsZXQgY29sdW1uRmllbGROYW1lID0gKGNvbHVtbkRlZi5zb3J0Q29sLmZpZWxkIHx8IGNvbHVtbkRlZi5zb3J0Q29sLmlkKSArICcnO1xyXG4gICAgICAgICAgICAgIGlmICh0aGlzLm9kYXRhU2VydmljZS5vcHRpb25zLmNhc2VUeXBlID09PSBDYXNlVHlwZS5wYXNjYWxDYXNlKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWUgPSBTdHJpbmcudGl0bGVDYXNlKGZpZWxkTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5GaWVsZE5hbWUgPSBTdHJpbmcudGl0bGVDYXNlKGNvbHVtbkZpZWxkTmFtZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBzb3J0ZXJBcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbklkOiBjb2x1bW5GaWVsZE5hbWUsXHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb246IGNvbHVtbkRlZi5zb3J0QXNjID8gJ2FzYycgOiAnZGVzYydcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc29ydEJ5QXJyYXkgPSBzb3J0ZXJBcnJheTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyB0cmFuc2Zvcm0gdGhlIHNvcnRieSBhcnJheSBpbnRvIGEgQ1NWIHN0cmluZyBmb3IgT0RhdGFcclxuICAgIHNvcnRCeUFycmF5ID0gc29ydEJ5QXJyYXkgfHwgW10gYXMgQ3VycmVudFNvcnRlcltdO1xyXG4gICAgY29uc3QgY3N2U3RyaW5nID0gc29ydEJ5QXJyYXkubWFwKChzb3J0ZXIpID0+IHtcclxuICAgICAgaWYgKHNvcnRlciAmJiBzb3J0ZXIuY29sdW1uSWQpIHtcclxuICAgICAgICByZXR1cm4gYCR7c29ydGVyLmNvbHVtbklkfSAke3NvcnRlciAmJiBzb3J0ZXIuZGlyZWN0aW9uICYmIHNvcnRlci5kaXJlY3Rpb24udG9Mb3dlckNhc2UoKSB8fCAnJ31gO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH0pLmpvaW4oJywnKTtcclxuXHJcbiAgICB0aGlzLm9kYXRhU2VydmljZS51cGRhdGVPcHRpb25zKHtcclxuICAgICAgb3JkZXJCeTogKHRoaXMub2RhdGFTZXJ2aWNlLm9wdGlvbnMuY2FzZVR5cGUgPT09IENhc2VUeXBlLnBhc2NhbENhc2UpID8gU3RyaW5nLnRpdGxlQ2FzZShjc3ZTdHJpbmcpIDogY3N2U3RyaW5nXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBrZWVwIGN1cnJlbnQgU29ydGVycyBhbmQgdXBkYXRlIHRoZSBzZXJ2aWNlIG9wdGlvbnMgd2l0aCB0aGUgbmV3IHNvcnRpbmdcclxuICAgIHRoaXMuX2N1cnJlbnRTb3J0ZXJzID0gc29ydEJ5QXJyYXkgYXMgQ3VycmVudFNvcnRlcltdO1xyXG5cclxuICAgIC8vIGJ1aWxkIHRoZSBPRGF0YSBxdWVyeSB3aGljaCB3ZSB3aWxsIHVzZSBpbiB0aGUgV2ViQVBJIGNhbGxiYWNrXHJcbiAgICByZXR1cm4gdGhpcy5vZGF0YVNlcnZpY2UuYnVpbGRRdWVyeSgpO1xyXG4gIH1cclxuXHJcbiAgLy9cclxuICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvKipcclxuICAgKiBDYXN0IHByb3ZpZGVkIGZpbHRlcnMgKGNvdWxkIGJlIGluIG11bHRpcGxlIGZvcm1hdCkgaW50byBhbiBhcnJheSBvZiBDb2x1bW5GaWx0ZXJcclxuICAgKiBAcGFyYW0gY29sdW1uRmlsdGVyc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY2FzdEZpbHRlclRvQ29sdW1uRmlsdGVyKGNvbHVtbkZpbHRlcnM6IENvbHVtbkZpbHRlcnMgfCBDdXJyZW50RmlsdGVyW10pOiBDdXJyZW50RmlsdGVyW10ge1xyXG4gICAgLy8ga2VlcCBjdXJyZW50IGZpbHRlcnMgJiBhbHdheXMgc2F2ZSBpdCBhcyBhbiBhcnJheSAoY29sdW1uRmlsdGVycyBjYW4gYmUgYW4gb2JqZWN0IHdoZW4gaXQgaXMgZGVhbHQgYnkgU2xpY2tHcmlkIEZpbHRlcilcclxuICAgIGNvbnN0IGZpbHRlcnNBcnJheTogQ29sdW1uRmlsdGVyW10gPSAoKHR5cGVvZiBjb2x1bW5GaWx0ZXJzID09PSAnb2JqZWN0JykgPyBPYmplY3Qua2V5cyhjb2x1bW5GaWx0ZXJzKS5tYXAoa2V5ID0+IGNvbHVtbkZpbHRlcnNba2V5XSkgOiBjb2x1bW5GaWx0ZXJzKSBhcyBDdXJyZW50RmlsdGVyW107XHJcblxyXG4gICAgcmV0dXJuIGZpbHRlcnNBcnJheS5tYXAoKGZpbHRlcikgPT4ge1xyXG4gICAgICBjb25zdCBjb2x1bW5EZWYgPSBmaWx0ZXIuY29sdW1uRGVmO1xyXG4gICAgICBjb25zdCB0bXBGaWx0ZXI6IEN1cnJlbnRGaWx0ZXIgPSB7IGNvbHVtbklkOiBmaWx0ZXIuY29sdW1uSWQgfHwgJycgfTtcclxuICAgICAgaWYgKGZpbHRlci5vcGVyYXRvcikge1xyXG4gICAgICAgIHRtcEZpbHRlci5vcGVyYXRvciA9IGZpbHRlci5vcGVyYXRvcjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXIuc2VhcmNoVGVybXMpKSB7XHJcbiAgICAgICAgdG1wRmlsdGVyLnNlYXJjaFRlcm1zID0gZmlsdGVyLnNlYXJjaFRlcm1zO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0bXBGaWx0ZXI7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcHBlciBmb3IgbWF0aGVtYXRpY2FsIG9wZXJhdG9ycyAoZXguOiA8PSBpcyBcImxlXCIsID4gaXMgXCJndFwiKVxyXG4gICAqIEBwYXJhbSBzdHJpbmcgb3BlcmF0b3JcclxuICAgKiBAcmV0dXJucyBzdHJpbmcgbWFwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtYXBPZGF0YU9wZXJhdG9yKG9wZXJhdG9yOiBzdHJpbmcpIHtcclxuICAgIGxldCBtYXAgPSAnJztcclxuICAgIHN3aXRjaCAob3BlcmF0b3IpIHtcclxuICAgICAgY2FzZSAnPCc6XHJcbiAgICAgICAgbWFwID0gJ2x0JztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnPD0nOlxyXG4gICAgICAgIG1hcCA9ICdsZSc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJz4nOlxyXG4gICAgICAgIG1hcCA9ICdndCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJz49JzpcclxuICAgICAgICBtYXAgPSAnZ2UnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICc8Pic6XHJcbiAgICAgIGNhc2UgJyE9JzpcclxuICAgICAgICBtYXAgPSAnbmUnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICc9JzpcclxuICAgICAgY2FzZSAnPT0nOlxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIG1hcCA9ICdlcSc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1hcDtcclxuICB9XHJcbn1cclxuIl19