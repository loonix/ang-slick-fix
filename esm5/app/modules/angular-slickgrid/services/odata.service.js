/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import './global-utilities';
import { CaseType } from './../models/index';
var OdataService = /** @class */ (function () {
    function OdataService() {
        this._odataOptions = {
            filterQueue: [],
            orderBy: ''
        };
        this._defaultSortBy = '';
        this._columnFilters = {};
    }
    /*
      * Build the OData query string from all the options provided
      * @return string OData query
      */
    /*
        * Build the OData query string from all the options provided
        * @return string OData query
        */
    /**
     * @return {?}
     */
    OdataService.prototype.buildQuery = /*
        * Build the OData query string from all the options provided
        * @return string OData query
        */
    /**
     * @return {?}
     */
    function () {
        this._odataOptions.filterQueue = [];
        /** @type {?} */
        var queryTmpArray = [];
        if (this._odataOptions.top) {
            queryTmpArray.push("$top=" + this._odataOptions.top);
        }
        if (this._odataOptions.skip) {
            queryTmpArray.push("$skip=" + this._odataOptions.skip);
        }
        if (this._odataOptions.orderBy) {
            /** @type {?} */
            var argument = '';
            if (Array.isArray(this._odataOptions.orderBy)) {
                argument = this._odataOptions.orderBy.join(','); // csv, that will form a query example like: $orderby=RoleName asc, Id desc
            }
            else {
                argument = this._odataOptions.orderBy;
            }
            queryTmpArray.push("$orderby=" + argument);
        }
        if (this._odataOptions.filterBy || this._odataOptions.filter) {
            if (this._odataOptions.filter) {
                this._odataOptions.filterQueue = [];
                /** @type {?} */
                var filterStr = this._odataOptions.filter;
                if (Array.isArray(this._odataOptions.filter)) {
                    filterStr = this._odataOptions.filter.join(" " + (this._odataOptions.filterBySeparator || 'and') + " ");
                }
                this._odataOptions.filterQueue.push("(" + filterStr + ")");
            }
            // filterBy are passed manually by the user, however we will only add it if the column wasn't yet filtered
            if (!!this._odataOptions.filterBy && !!this._odataOptions.filterBy.fieldName && !this._columnFilters[this._odataOptions.filterBy.fieldName.toLowerCase()]) {
                if (this._odataOptions.filterBy.searchTerm !== '') {
                    this.saveColumnFilter(this._odataOptions.filterBy.fieldName.toLowerCase(), this._odataOptions.filterBy.searchTerm, this._odataOptions.filterBy.searchTerms);
                    this.updateFilterFromListTerms(this._odataOptions.filterBy);
                }
            }
        }
        if (this._odataOptions.filterQueue.length > 0) {
            /** @type {?} */
            var query = this._odataOptions.filterQueue.join(" " + (this._odataOptions.filterBySeparator || 'and') + " ");
            this._odataOptions.filter = query; // overwrite with
            queryTmpArray.push("$filter=" + query);
        }
        // join all the odata functions by a '&'
        return queryTmpArray.join('&');
    };
    /**
     * @param {?} columnName
     * @return {?}
     */
    OdataService.prototype.getFilterByColumn = /**
     * @param {?} columnName
     * @return {?}
     */
    function (columnName) {
        return (!!this._columnFilters[columnName]) ? this._columnFilters[columnName] : null;
    };
    /**
     * @return {?}
     */
    OdataService.prototype.getFilterCount = /**
     * @return {?}
     */
    function () {
        return (this._odataOptions.filterQueue) ? this._odataOptions.filterQueue.length : 0;
    };
    Object.defineProperty(OdataService.prototype, "columnFilters", {
        get: /**
         * @return {?}
         */
        function () {
            return this._columnFilters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OdataService.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () {
            return this._odataOptions;
        },
        set: /**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            this._odataOptions = options;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} fieldName
     * @return {?}
     */
    OdataService.prototype.removeColumnFilter = /**
     * @param {?} fieldName
     * @return {?}
     */
    function (fieldName) {
        delete this._columnFilters[fieldName];
    };
    /**
     * @param {?} fieldName
     * @param {?} value
     * @param {?=} searchTerms
     * @return {?}
     */
    OdataService.prototype.saveColumnFilter = /**
     * @param {?} fieldName
     * @param {?} value
     * @param {?=} searchTerms
     * @return {?}
     */
    function (fieldName, value, searchTerms) {
        this._columnFilters[fieldName] = {
            search: searchTerms,
            value: value
        };
    };
    /**
     * Update the filter by a list of terms usually passed manually by the user as default filters
     * @param filterOptions
     * @returns
     */
    /**
     * Update the filter by a list of terms usually passed manually by the user as default filters
     * @param {?} filterOptions
     * @return {?}
     */
    OdataService.prototype.updateFilterFromListTerms = /**
     * Update the filter by a list of terms usually passed manually by the user as default filters
     * @param {?} filterOptions
     * @return {?}
     */
    function (filterOptions) {
        var _this = this;
        // build the filter query
        if (Array.isArray(filterOptions)) {
            filterOptions.forEach((/**
             * @param {?} filterOptionObject
             * @return {?}
             */
            function (filterOptionObject) {
                _this.updateFilterFromTerm(filterOptionObject);
            }));
        }
        else {
            this.updateFilterFromTerm(filterOptions);
        }
    };
    /**
     * @param {?} filterOptions
     * @return {?}
     */
    OdataService.prototype.updateFilterFromTerm = /**
     * @param {?} filterOptions
     * @return {?}
     */
    function (filterOptions) {
        /** @type {?} */
        var searchBy = '';
        /** @type {?} */
        var tmpSearchByArray = [];
        /** @type {?} */
        var fieldName = filterOptions.fieldName;
        /** @type {?} */
        var fieldSearchTerms = filterOptions.searchTerms;
        /** @type {?} */
        var operator = filterOptions.operator;
        // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
        if (!!fieldSearchTerms && fieldSearchTerms.length > 0) {
            /** @type {?} */
            var tmpSearchTerms = [];
            if (operator === 'IN') {
                // example:: (Stage eq "Expired" or Stage eq "Renewal")
                for (var j = 0, lnj = fieldSearchTerms.length; j < lnj; j++) {
                    tmpSearchTerms.push(fieldName + " eq '" + fieldSearchTerms[j] + "'");
                }
                searchBy = tmpSearchTerms.join(' or ');
                searchBy = "$(" + searchBy + ")";
            }
            else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
                // example:: (Stage ne "Expired" and Stage ne "Renewal")
                for (var k = 0, lnk = fieldSearchTerms.length; k < lnk; k++) {
                    tmpSearchTerms.push(fieldName + " ne '" + fieldSearchTerms[k] + "'");
                }
                searchBy = tmpSearchTerms.join(' and ');
                searchBy = "$(" + searchBy + ")";
            }
        }
        // push to our temp array and also trim white spaces
        tmpSearchByArray.push(String.trim(searchBy));
        // add to the filter queue only if it doesn't exist in the queue
        /** @type {?} */
        var filter = (tmpSearchByArray.length > 0) ? tmpSearchByArray.join(' and ') : '';
        if (this._odataOptions.filterQueue && this._odataOptions.filterQueue.indexOf(filter) === -1) {
            this._odataOptions.filterQueue.push(filter);
        }
    };
    /**
     * Change any OData options that will be used to build the query
     * @param object options
     */
    /**
     * Change any OData options that will be used to build the query
     * @param {?} options
     * @return {?}
     */
    OdataService.prototype.updateOptions = /**
     * Change any OData options that will be used to build the query
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(Object.keys(options)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var property = _c.value;
                if (options.hasOwnProperty(property)) {
                    this._odataOptions[property] = options[property]; // replace of the property
                }
                // we need to keep the defaultSortBy for references whenever the user removes his Sorting
                // then we would revert to the defaultSortBy and the only way is to keep a hard copy here
                if (property === 'orderBy' || property === 'sortBy') {
                    /** @type {?} */
                    var sortBy = options[property];
                    // make sure first char of each orderBy field is capitalize
                    if (this._odataOptions.caseType === CaseType.pascalCase) {
                        if (Array.isArray(sortBy)) {
                            sortBy.forEach((/**
                             * @param {?} field
                             * @param {?} index
                             * @param {?} inputArray
                             * @return {?}
                             */
                            function (field, index, inputArray) {
                                inputArray[index] = String.titleCase(field);
                            }));
                        }
                        else {
                            sortBy = String.titleCase(options[property]);
                        }
                    }
                    this._odataOptions.orderBy = sortBy;
                    this._defaultSortBy = sortBy;
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
    };
    return OdataService;
}());
export { OdataService };
if (false) {
    /** @type {?} */
    OdataService.prototype._columnFilters;
    /** @type {?} */
    OdataService.prototype._defaultSortBy;
    /** @type {?} */
    OdataService.prototype._odataOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2RhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvc2VydmljZXMvb2RhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFFLFFBQVEsRUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBRTFEO0lBS0U7UUFDRSxJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ25CLFdBQVcsRUFBRSxFQUFFO1lBQ2YsT0FBTyxFQUFFLEVBQUU7U0FDWixDQUFDO1FBQ0YsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7UUFHSTs7Ozs7Ozs7SUFDSixpQ0FBVTs7Ozs7OztJQUFWO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDOztZQUM5QixhQUFhLEdBQUcsRUFBRTtRQUV4QixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFO1lBQzFCLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBUSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUssQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRTtZQUMzQixhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFNLENBQUMsQ0FBQztTQUN4RDtRQUNELElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7O2dCQUMxQixRQUFRLEdBQUcsRUFBRTtZQUNqQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDN0MsUUFBUSxHQUFHLElBQUksQ0FBQyxh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Ozs7OzRCQUFDLFVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVO2dDQUN0QyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDOUMsQ0FBQyxFQUFDLENBQUM7eUJBQ0o7NkJBQU07NEJBQ0wsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7eUJBQzlDO3FCQUNGO29CQUNELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztvQkFDcEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7aUJBQzlCO2FBQ0Y7Ozs7Ozs7OztJQUNILENBQUM7SUFFSCxtQkFBQztBQUFELENBQUMsQUFwTEQsSUFvTEM7Ozs7SUFuTEMsc0NBQW9COztJQUNwQixzQ0FBdUI7O0lBQ3ZCLHFDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9nbG9iYWwtdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgQ2FzZVR5cGUsIE9kYXRhT3B0aW9uIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9kYXRhU2VydmljZSB7XHJcbiAgX2NvbHVtbkZpbHRlcnM6IGFueTtcclxuICBfZGVmYXVsdFNvcnRCeTogc3RyaW5nO1xyXG4gIF9vZGF0YU9wdGlvbnM6IE9kYXRhT3B0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX29kYXRhT3B0aW9ucyA9IHtcclxuICAgICAgZmlsdGVyUXVldWU6IFtdLFxyXG4gICAgICBvcmRlckJ5OiAnJ1xyXG4gICAgfTtcclxuICAgIHRoaXMuX2RlZmF1bHRTb3J0QnkgPSAnJztcclxuICAgIHRoaXMuX2NvbHVtbkZpbHRlcnMgPSB7fTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICAqIEJ1aWxkIHRoZSBPRGF0YSBxdWVyeSBzdHJpbmcgZnJvbSBhbGwgdGhlIG9wdGlvbnMgcHJvdmlkZWRcclxuICAgICogQHJldHVybiBzdHJpbmcgT0RhdGEgcXVlcnlcclxuICAgICovXHJcbiAgYnVpbGRRdWVyeSgpOiBzdHJpbmcge1xyXG4gICAgdGhpcy5fb2RhdGFPcHRpb25zLmZpbHRlclF1ZXVlID0gW107XHJcbiAgICBjb25zdCBxdWVyeVRtcEFycmF5ID0gW107XHJcblxyXG4gICAgaWYgKHRoaXMuX29kYXRhT3B0aW9ucy50b3ApIHtcclxuICAgICAgcXVlcnlUbXBBcnJheS5wdXNoKGAkdG9wPSR7dGhpcy5fb2RhdGFPcHRpb25zLnRvcH1gKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9vZGF0YU9wdGlvbnMuc2tpcCkge1xyXG4gICAgICBxdWVyeVRtcEFycmF5LnB1c2goYCRza2lwPSR7dGhpcy5fb2RhdGFPcHRpb25zLnNraXB9YCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fb2RhdGFPcHRpb25zLm9yZGVyQnkpIHtcclxuICAgICAgbGV0IGFyZ3VtZW50ID0gJyc7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuX29kYXRhT3B0aW9ucy5vcmRlckJ5KSkge1xyXG4gICAgICAgIGFyZ3VtZW50ID0gdGhpcy5fb2RhdGFPcHRpb25zLm9yZGVyQnkuam9pbignLCcpOyAvLyBjc3YsIHRoYXQgd2lsbCBmb3JtIGEgcXVlcnkgZXhhbXBsZSBsaWtlOiAkb3JkZXJieT1Sb2xlTmFtZSBhc2MsIElkIGRlc2NcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhcmd1bWVudCA9IHRoaXMuX29kYXRhT3B0aW9ucy5vcmRlckJ5O1xyXG4gICAgICB9XHJcbiAgICAgIHF1ZXJ5VG1wQXJyYXkucHVzaChgJG9yZGVyYnk9JHthcmd1bWVudH1gKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9vZGF0YU9wdGlvbnMuZmlsdGVyQnkgfHwgdGhpcy5fb2RhdGFPcHRpb25zLmZpbHRlcikge1xyXG4gICAgICBpZiAodGhpcy5fb2RhdGFPcHRpb25zLmZpbHRlcikge1xyXG4gICAgICAgIHRoaXMuX29kYXRhT3B0aW9ucy5maWx0ZXJRdWV1ZSA9IFtdO1xyXG4gICAgICAgIGxldCBmaWx0ZXJTdHIgPSB0aGlzLl9vZGF0YU9wdGlvbnMuZmlsdGVyO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuX29kYXRhT3B0aW9ucy5maWx0ZXIpKSB7XHJcbiAgICAgICAgICBmaWx0ZXJTdHIgPSB0aGlzLl9vZGF0YU9wdGlvbnMuZmlsdGVyLmpvaW4oYCAke3RoaXMuX29kYXRhT3B0aW9ucy5maWx0ZXJCeVNlcGFyYXRvciB8fCAnYW5kJ30gYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX29kYXRhT3B0aW9ucy5maWx0ZXJRdWV1ZS5wdXNoKGAoJHtmaWx0ZXJTdHJ9KWApO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGZpbHRlckJ5IGFyZSBwYXNzZWQgbWFudWFsbHkgYnkgdGhlIHVzZXIsIGhvd2V2ZXIgd2Ugd2lsbCBvbmx5IGFkZCBpdCBpZiB0aGUgY29sdW1uIHdhc24ndCB5ZXQgZmlsdGVyZWRcclxuICAgICAgaWYgKCEhdGhpcy5fb2RhdGFPcHRpb25zLmZpbHRlckJ5ICYmICEhdGhpcy5fb2RhdGFPcHRpb25zLmZpbHRlckJ5LmZpZWxkTmFtZSAmJiAhdGhpcy5fY29sdW1uRmlsdGVyc1t0aGlzLl9vZGF0YU9wdGlvbnMuZmlsdGVyQnkuZmllbGROYW1lLnRvTG93ZXJDYXNlKCldKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX29kYXRhT3B0aW9ucy5maWx0ZXJCeS5zZWFyY2hUZXJtICE9PSAnJykge1xyXG4gICAgICAgICAgdGhpcy5zYXZlQ29sdW1uRmlsdGVyKHRoaXMuX29kYXRhT3B0aW9ucy5maWx0ZXJCeS5maWVsZE5hbWUudG9Mb3dlckNhc2UoKSwgdGhpcy5fb2RhdGFPcHRpb25zLmZpbHRlckJ5LnNlYXJjaFRlcm0sIHRoaXMuX29kYXRhT3B0aW9ucy5maWx0ZXJCeS5zZWFyY2hUZXJtcyk7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlckZyb21MaXN0VGVybXModGhpcy5fb2RhdGFPcHRpb25zLmZpbHRlckJ5KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9vZGF0YU9wdGlvbnMuZmlsdGVyUXVldWUubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBxdWVyeSA9IHRoaXMuX29kYXRhT3B0aW9ucy5maWx0ZXJRdWV1ZS5qb2luKGAgJHt0aGlzLl9vZGF0YU9wdGlvbnMuZmlsdGVyQnlTZXBhcmF0b3IgfHwgJ2FuZCd9IGApO1xyXG4gICAgICB0aGlzLl9vZGF0YU9wdGlvbnMuZmlsdGVyID0gcXVlcnk7IC8vIG92ZXJ3cml0ZSB3aXRoXHJcbiAgICAgIHF1ZXJ5VG1wQXJyYXkucHVzaChgJGZpbHRlcj0ke3F1ZXJ5fWApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGpvaW4gYWxsIHRoZSBvZGF0YSBmdW5jdGlvbnMgYnkgYSAnJidcclxuICAgIHJldHVybiBxdWVyeVRtcEFycmF5LmpvaW4oJyYnKTtcclxuICB9XHJcblxyXG4gIGdldEZpbHRlckJ5Q29sdW1uKGNvbHVtbk5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKCEhdGhpcy5fY29sdW1uRmlsdGVyc1tjb2x1bW5OYW1lXSkgPyB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbk5hbWVdIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGdldEZpbHRlckNvdW50KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gKHRoaXMuX29kYXRhT3B0aW9ucy5maWx0ZXJRdWV1ZSkgPyB0aGlzLl9vZGF0YU9wdGlvbnMuZmlsdGVyUXVldWUubGVuZ3RoIDogMDtcclxuICB9XHJcblxyXG4gIGdldCBjb2x1bW5GaWx0ZXJzKCk6IGFueVtdIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2x1bW5GaWx0ZXJzO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG9wdGlvbnMoKTogT2RhdGFPcHRpb24ge1xyXG4gICAgcmV0dXJuIHRoaXMuX29kYXRhT3B0aW9ucztcclxuICB9XHJcblxyXG4gIHNldCBvcHRpb25zKG9wdGlvbnM6IE9kYXRhT3B0aW9uKSB7XHJcbiAgICB0aGlzLl9vZGF0YU9wdGlvbnMgPSBvcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQ29sdW1uRmlsdGVyKGZpZWxkTmFtZTogc3RyaW5nKSB7XHJcbiAgICBkZWxldGUgdGhpcy5fY29sdW1uRmlsdGVyc1tmaWVsZE5hbWVdO1xyXG4gIH1cclxuXHJcbiAgc2F2ZUNvbHVtbkZpbHRlcihmaWVsZE5hbWU6IHN0cmluZywgdmFsdWU6IGFueSwgc2VhcmNoVGVybXM/OiBhbnlbXSkge1xyXG4gICAgdGhpcy5fY29sdW1uRmlsdGVyc1tmaWVsZE5hbWVdID0ge1xyXG4gICAgICBzZWFyY2g6IHNlYXJjaFRlcm1zLFxyXG4gICAgICB2YWx1ZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgZmlsdGVyIGJ5IGEgbGlzdCBvZiB0ZXJtcyB1c3VhbGx5IHBhc3NlZCBtYW51YWxseSBieSB0aGUgdXNlciBhcyBkZWZhdWx0IGZpbHRlcnNcclxuICAgKiBAcGFyYW0gZmlsdGVyT3B0aW9uc1xyXG4gICAqIEByZXR1cm5zXHJcbiAgICovXHJcbiAgdXBkYXRlRmlsdGVyRnJvbUxpc3RUZXJtcyhmaWx0ZXJPcHRpb25zOiBhbnkpIHtcclxuICAgIC8vIGJ1aWxkIHRoZSBmaWx0ZXIgcXVlcnlcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGZpbHRlck9wdGlvbnMpKSB7XHJcbiAgICAgIGZpbHRlck9wdGlvbnMuZm9yRWFjaCgoZmlsdGVyT3B0aW9uT2JqZWN0KSA9PiB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXJGcm9tVGVybShmaWx0ZXJPcHRpb25PYmplY3QpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudXBkYXRlRmlsdGVyRnJvbVRlcm0oZmlsdGVyT3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVGaWx0ZXJGcm9tVGVybShmaWx0ZXJPcHRpb25zOiBhbnkpIHtcclxuICAgIGxldCBzZWFyY2hCeSA9ICcnO1xyXG4gICAgY29uc3QgdG1wU2VhcmNoQnlBcnJheSA9IFtdO1xyXG4gICAgY29uc3QgZmllbGROYW1lID0gZmlsdGVyT3B0aW9ucy5maWVsZE5hbWU7XHJcbiAgICBjb25zdCBmaWVsZFNlYXJjaFRlcm1zID0gZmlsdGVyT3B0aW9ucy5zZWFyY2hUZXJtcztcclxuICAgIGNvbnN0IG9wZXJhdG9yID0gZmlsdGVyT3B0aW9ucy5vcGVyYXRvcjtcclxuXHJcbiAgICAvLyB3aGVuIGhhdmluZyBtb3JlIHRoYW4gMSBzZWFyY2ggdGVybSAodGhlbiBjaGVjayBpZiB3ZSBoYXZlIGEgXCJJTlwiIG9yIFwiTk9UIElOXCIgZmlsdGVyIHNlYXJjaClcclxuICAgIGlmICghIWZpZWxkU2VhcmNoVGVybXMgJiYgZmllbGRTZWFyY2hUZXJtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IHRtcFNlYXJjaFRlcm1zID0gW107XHJcblxyXG4gICAgICBpZiAob3BlcmF0b3IgPT09ICdJTicpIHtcclxuICAgICAgICAvLyBleGFtcGxlOjogKFN0YWdlIGVxIFwiRXhwaXJlZFwiIG9yIFN0YWdlIGVxIFwiUmVuZXdhbFwiKVxyXG4gICAgICAgIGZvciAobGV0IGogPSAwLCBsbmogPSBmaWVsZFNlYXJjaFRlcm1zLmxlbmd0aDsgaiA8IGxuajsgaisrKSB7XHJcbiAgICAgICAgICB0bXBTZWFyY2hUZXJtcy5wdXNoKGAke2ZpZWxkTmFtZX0gZXEgJyR7ZmllbGRTZWFyY2hUZXJtc1tqXX0nYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlYXJjaEJ5ID0gdG1wU2VhcmNoVGVybXMuam9pbignIG9yICcpO1xyXG4gICAgICAgIHNlYXJjaEJ5ID0gYCQoJHtzZWFyY2hCeX0pYDtcclxuICAgICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gJ05JTicgfHwgb3BlcmF0b3IgPT09ICdOT1RJTicgfHwgb3BlcmF0b3IgPT09ICdOT1QgSU4nKSB7XHJcbiAgICAgICAgLy8gZXhhbXBsZTo6IChTdGFnZSBuZSBcIkV4cGlyZWRcIiBhbmQgU3RhZ2UgbmUgXCJSZW5ld2FsXCIpXHJcbiAgICAgICAgZm9yIChsZXQgayA9IDAsIGxuayA9IGZpZWxkU2VhcmNoVGVybXMubGVuZ3RoOyBrIDwgbG5rOyBrKyspIHtcclxuICAgICAgICAgIHRtcFNlYXJjaFRlcm1zLnB1c2goYCR7ZmllbGROYW1lfSBuZSAnJHtmaWVsZFNlYXJjaFRlcm1zW2tdfSdgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VhcmNoQnkgPSB0bXBTZWFyY2hUZXJtcy5qb2luKCcgYW5kICcpO1xyXG4gICAgICAgIHNlYXJjaEJ5ID0gYCQoJHtzZWFyY2hCeX0pYDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHB1c2ggdG8gb3VyIHRlbXAgYXJyYXkgYW5kIGFsc28gdHJpbSB3aGl0ZSBzcGFjZXNcclxuICAgIHRtcFNlYXJjaEJ5QXJyYXkucHVzaChTdHJpbmcudHJpbShzZWFyY2hCeSkpO1xyXG5cclxuICAgIC8vIGFkZCB0byB0aGUgZmlsdGVyIHF1ZXVlIG9ubHkgaWYgaXQgZG9lc24ndCBleGlzdCBpbiB0aGUgcXVldWVcclxuICAgIGNvbnN0IGZpbHRlciA9ICh0bXBTZWFyY2hCeUFycmF5Lmxlbmd0aCA+IDApID8gdG1wU2VhcmNoQnlBcnJheS5qb2luKCcgYW5kICcpIDogJyc7XHJcbiAgICBpZiAodGhpcy5fb2RhdGFPcHRpb25zLmZpbHRlclF1ZXVlICYmIHRoaXMuX29kYXRhT3B0aW9ucy5maWx0ZXJRdWV1ZS5pbmRleE9mKGZpbHRlcikgPT09IC0xKSB7XHJcbiAgICAgIHRoaXMuX29kYXRhT3B0aW9ucy5maWx0ZXJRdWV1ZS5wdXNoKGZpbHRlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2UgYW55IE9EYXRhIG9wdGlvbnMgdGhhdCB3aWxsIGJlIHVzZWQgdG8gYnVpbGQgdGhlIHF1ZXJ5XHJcbiAgICogQHBhcmFtIG9iamVjdCBvcHRpb25zXHJcbiAgICovXHJcbiAgdXBkYXRlT3B0aW9ucyhvcHRpb25zOiBPZGF0YU9wdGlvbikge1xyXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBvZiBPYmplY3Qua2V5cyhvcHRpb25zKSkge1xyXG4gICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcclxuICAgICAgICB0aGlzLl9vZGF0YU9wdGlvbnNbcHJvcGVydHldID0gb3B0aW9uc1twcm9wZXJ0eV07IC8vIHJlcGxhY2Ugb2YgdGhlIHByb3BlcnR5XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHdlIG5lZWQgdG8ga2VlcCB0aGUgZGVmYXVsdFNvcnRCeSBmb3IgcmVmZXJlbmNlcyB3aGVuZXZlciB0aGUgdXNlciByZW1vdmVzIGhpcyBTb3J0aW5nXHJcbiAgICAgIC8vIHRoZW4gd2Ugd291bGQgcmV2ZXJ0IHRvIHRoZSBkZWZhdWx0U29ydEJ5IGFuZCB0aGUgb25seSB3YXkgaXMgdG8ga2VlcCBhIGhhcmQgY29weSBoZXJlXHJcbiAgICAgIGlmIChwcm9wZXJ0eSA9PT0gJ29yZGVyQnknIHx8IHByb3BlcnR5ID09PSAnc29ydEJ5Jykge1xyXG4gICAgICAgIGxldCBzb3J0QnkgPSBvcHRpb25zW3Byb3BlcnR5XTtcclxuXHJcbiAgICAgICAgLy8gbWFrZSBzdXJlIGZpcnN0IGNoYXIgb2YgZWFjaCBvcmRlckJ5IGZpZWxkIGlzIGNhcGl0YWxpemVcclxuICAgICAgICBpZiAodGhpcy5fb2RhdGFPcHRpb25zLmNhc2VUeXBlID09PSBDYXNlVHlwZS5wYXNjYWxDYXNlKSB7XHJcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzb3J0QnkpKSB7XHJcbiAgICAgICAgICAgIHNvcnRCeS5mb3JFYWNoKChmaWVsZCwgaW5kZXgsIGlucHV0QXJyYXkpID0+IHtcclxuICAgICAgICAgICAgICBpbnB1dEFycmF5W2luZGV4XSA9IFN0cmluZy50aXRsZUNhc2UoZmllbGQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNvcnRCeSA9IFN0cmluZy50aXRsZUNhc2Uob3B0aW9uc1twcm9wZXJ0eV0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9vZGF0YU9wdGlvbnMub3JkZXJCeSA9IHNvcnRCeTtcclxuICAgICAgICB0aGlzLl9kZWZhdWx0U29ydEJ5ID0gc29ydEJ5O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=