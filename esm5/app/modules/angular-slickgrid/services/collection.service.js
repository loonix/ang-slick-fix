/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FilterMultiplePassType, FieldType, OperatorType, SortDirectionNumber, } from './../models/index';
import { sortByFieldType } from '../sorters/sorterUtilities';
import { uniqueArray } from './utilities';
var CollectionService = /** @class */ (function () {
    function CollectionService(translate) {
        this.translate = translate;
    }
    /**
     * Filter 1 or more items from a collection
     * @param collection
     * @param filterByOptions
     */
    /**
     * Filter 1 or more items from a collection
     * @param {?} collection
     * @param {?} filterByOptions
     * @param {?=} filterResultBy
     * @return {?}
     */
    CollectionService.prototype.filterCollection = /**
     * Filter 1 or more items from a collection
     * @param {?} collection
     * @param {?} filterByOptions
     * @param {?=} filterResultBy
     * @return {?}
     */
    function (collection, filterByOptions, filterResultBy) {
        if (filterResultBy === void 0) { filterResultBy = FilterMultiplePassType.chain; }
        var e_1, _a;
        /** @type {?} */
        var filteredCollection = [];
        // when it's array, we will use the new filtered collection after every pass
        // basically if input collection has 10 items on 1st pass and 1 item is filtered out, then on 2nd pass the input collection will be 9 items
        if (Array.isArray(filterByOptions)) {
            filteredCollection = (filterResultBy === FilterMultiplePassType.merge) ? [] : collection;
            try {
                for (var filterByOptions_1 = tslib_1.__values(filterByOptions), filterByOptions_1_1 = filterByOptions_1.next(); !filterByOptions_1_1.done; filterByOptions_1_1 = filterByOptions_1.next()) {
                    var filter = filterByOptions_1_1.value;
                    if (filterResultBy === FilterMultiplePassType.merge) {
                        /** @type {?} */
                        var filteredPass = this.singleFilterCollection(collection, filter);
                        filteredCollection = uniqueArray(tslib_1.__spread(filteredCollection, filteredPass));
                    }
                    else {
                        filteredCollection = this.singleFilterCollection(filteredCollection, filter);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (filterByOptions_1_1 && !filterByOptions_1_1.done && (_a = filterByOptions_1.return)) _a.call(filterByOptions_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            filteredCollection = this.singleFilterCollection(collection, filterByOptions);
        }
        return filteredCollection;
    };
    /**
     * Filter an item from a collection
     * @param collection
     * @param filterBy
     */
    /**
     * Filter an item from a collection
     * @param {?} collection
     * @param {?} filterBy
     * @return {?}
     */
    CollectionService.prototype.singleFilterCollection = /**
     * Filter an item from a collection
     * @param {?} collection
     * @param {?} filterBy
     * @return {?}
     */
    function (collection, filterBy) {
        /** @type {?} */
        var filteredCollection = [];
        if (filterBy) {
            /** @type {?} */
            var property_1 = filterBy.property || '';
            /** @type {?} */
            var operator = filterBy.operator || OperatorType.equal;
            // just check for undefined since the filter value could be null, 0, '', false etc
            /** @type {?} */
            var value_1 = typeof filterBy.value === 'undefined' ? '' : filterBy.value;
            switch (operator) {
                case OperatorType.equal:
                    filteredCollection = collection.filter((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) { return item[property_1] === value_1; }));
                    break;
                case OperatorType.contains:
                    filteredCollection = collection.filter((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) { return item[property_1].toString().indexOf(value_1.toString()) !== -1; }));
                    break;
                case OperatorType.notContains:
                    filteredCollection = collection.filter((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) { return item[property_1].toString().indexOf(value_1.toString()) === -1; }));
                    break;
                case OperatorType.notEqual:
                default:
                    filteredCollection = collection.filter((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) { return item[property_1] !== value_1; }));
            }
        }
        return filteredCollection;
    };
    /**
     * Sort 1 or more items in a collection
     * @param column definition
     * @param collection
     * @param sortByOptions
     * @param enableTranslateLabel
     */
    /**
     * Sort 1 or more items in a collection
     * @param {?} columnDef
     * @param {?} collection
     * @param {?} sortByOptions
     * @param {?=} enableTranslateLabel
     * @return {?}
     */
    CollectionService.prototype.sortCollection = /**
     * Sort 1 or more items in a collection
     * @param {?} columnDef
     * @param {?} collection
     * @param {?} sortByOptions
     * @param {?=} enableTranslateLabel
     * @return {?}
     */
    function (columnDef, collection, sortByOptions, enableTranslateLabel) {
        var _this = this;
        /** @type {?} */
        var sortedCollection = [];
        if (sortByOptions) {
            if (Array.isArray(sortByOptions)) {
                // multi-sort
                sortedCollection = collection.sort((/**
                 * @param {?} dataRow1
                 * @param {?} dataRow2
                 * @return {?}
                 */
                function (dataRow1, dataRow2) {
                    for (var i = 0, l = sortByOptions.length; i < l; i++) {
                        /** @type {?} */
                        var sortBy = sortByOptions[i];
                        if (sortBy) {
                            /** @type {?} */
                            var sortDirection = sortBy.sortDesc ? SortDirectionNumber.desc : SortDirectionNumber.asc;
                            /** @type {?} */
                            var propertyName = sortBy.property || '';
                            /** @type {?} */
                            var fieldType = sortBy.fieldType || FieldType.string;
                            /** @type {?} */
                            var value1 = (enableTranslateLabel) ? _this.translate.instant(dataRow1[propertyName] || ' ') : dataRow1[propertyName];
                            /** @type {?} */
                            var value2 = (enableTranslateLabel) ? _this.translate.instant(dataRow2[propertyName] || ' ') : dataRow2[propertyName];
                            /** @type {?} */
                            var sortResult = sortByFieldType(value1, value2, fieldType, sortDirection, columnDef);
                            if (sortResult !== SortDirectionNumber.neutral) {
                                return sortResult;
                            }
                        }
                    }
                    return SortDirectionNumber.neutral;
                }));
            }
            else {
                // single sort
                /** @type {?} */
                var propertyName_1 = sortByOptions.property || '';
                /** @type {?} */
                var sortDirection_1 = sortByOptions.sortDesc ? SortDirectionNumber.desc : SortDirectionNumber.asc;
                /** @type {?} */
                var fieldType_1 = sortByOptions.fieldType || FieldType.string;
                sortedCollection = collection.sort((/**
                 * @param {?} dataRow1
                 * @param {?} dataRow2
                 * @return {?}
                 */
                function (dataRow1, dataRow2) {
                    /** @type {?} */
                    var value1 = (enableTranslateLabel) ? _this.translate.instant(dataRow1[propertyName_1] || ' ') : dataRow1[propertyName_1];
                    /** @type {?} */
                    var value2 = (enableTranslateLabel) ? _this.translate.instant(dataRow2[propertyName_1] || ' ') : dataRow2[propertyName_1];
                    /** @type {?} */
                    var sortResult = sortByFieldType(value1, value2, fieldType_1, sortDirection_1, columnDef);
                    if (sortResult !== SortDirectionNumber.neutral) {
                        return sortResult;
                    }
                    return SortDirectionNumber.neutral;
                }));
            }
        }
        return sortedCollection;
    };
    CollectionService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CollectionService.ctorParameters = function () { return [
        { type: TranslateService }
    ]; };
    return CollectionService;
}());
export { CollectionService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CollectionService.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9jb2xsZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFJTCxzQkFBc0IsRUFFdEIsU0FBUyxFQUNULFlBQVksRUFDWixtQkFBbUIsR0FDcEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUUxQztJQUVFLDJCQUFvQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtJQUFJLENBQUM7SUFFcEQ7Ozs7T0FJRzs7Ozs7Ozs7SUFDSCw0Q0FBZ0I7Ozs7Ozs7SUFBaEIsVUFBaUIsVUFBaUIsRUFBRSxlQUEwRCxFQUFFLGNBQTJHO1FBQTNHLCtCQUFBLEVBQUEsaUJBQStFLHNCQUFzQixDQUFDLEtBQUs7OztZQUNyTSxrQkFBa0IsR0FBVSxFQUFFO1FBRWxDLDRFQUE0RTtRQUM1RSwySUFBMkk7UUFDM0ksSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ2xDLGtCQUFrQixHQUFHLENBQUMsY0FBYyxLQUFLLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQzs7Z0JBRXpGLEtBQXFCLElBQUEsb0JBQUEsaUJBQUEsZUFBZSxDQUFBLGdEQUFBLDZFQUFFO29CQUFqQyxJQUFNLE1BQU0sNEJBQUE7b0JBQ2YsSUFBSSxj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QyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsR0FBRzs7b0JBQzNGLFdBQVMsR0FBRyxhQUFhLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNO2dCQUU3RCxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsSUFBSTs7Ozs7Z0JBQUMsVUFBQyxRQUFhLEVBQUUsUUFBYTs7d0JBQ3hELE1BQU0sR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFZLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQVksQ0FBQzs7d0JBQ2hILE1BQU0sR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFZLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQVksQ0FBQzs7d0JBQ2hILFVBQVUsR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFTLEVBQUUsZUFBYSxFQUFFLFNBQVMsQ0FBQztvQkFDdkYsSUFBSSxVQUFVLEtBQUssbUJBQW1CLENBQUMsT0FBTyxFQUFFO3dCQUM5QyxPQUFPLFVBQVUsQ0FBQztxQkFDbkI7b0JBQ0QsT0FBTyxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7Z0JBQ3JDLENBQUMsRUFBQyxDQUFDO2FBQ0o7U0FDRjtRQUVELE9BQU8sZ0JBQWdCLENBQUM7SUFDMUIsQ0FBQzs7Z0JBcEhGLFVBQVU7Ozs7Z0JBZEYsZ0JBQWdCOztJQW1JekIsd0JBQUM7Q0FBQSxBQXJIRCxJQXFIQztTQXBIWSxpQkFBaUI7Ozs7OztJQUNoQixzQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDb2xsZWN0aW9uRmlsdGVyQnksXHJcbiAgQ29sbGVjdGlvblNvcnRCeSxcclxuICBDb2x1bW4sXHJcbiAgRmlsdGVyTXVsdGlwbGVQYXNzVHlwZSxcclxuICBGaWx0ZXJNdWx0aXBsZVBhc3NUeXBlU3RyaW5nLFxyXG4gIEZpZWxkVHlwZSxcclxuICBPcGVyYXRvclR5cGUsXHJcbiAgU29ydERpcmVjdGlvbk51bWJlcixcclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IHNvcnRCeUZpZWxkVHlwZSB9IGZyb20gJy4uL3NvcnRlcnMvc29ydGVyVXRpbGl0aWVzJztcclxuaW1wb3J0IHsgdW5pcXVlQXJyYXkgfSBmcm9tICcuL3V0aWxpdGllcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHsgfVxyXG5cclxuICAvKipcclxuICAgKiBGaWx0ZXIgMSBvciBtb3JlIGl0ZW1zIGZyb20gYSBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gZmlsdGVyQnlPcHRpb25zXHJcbiAgICovXHJcbiAgZmlsdGVyQ29sbGVjdGlvbihjb2xsZWN0aW9uOiBhbnlbXSwgZmlsdGVyQnlPcHRpb25zOiBDb2xsZWN0aW9uRmlsdGVyQnkgfCBDb2xsZWN0aW9uRmlsdGVyQnlbXSwgZmlsdGVyUmVzdWx0Qnk6IEZpbHRlck11bHRpcGxlUGFzc1R5cGUgfCBGaWx0ZXJNdWx0aXBsZVBhc3NUeXBlU3RyaW5nIHwgbnVsbCA9IEZpbHRlck11bHRpcGxlUGFzc1R5cGUuY2hhaW4pOiBhbnlbXSB7XHJcbiAgICBsZXQgZmlsdGVyZWRDb2xsZWN0aW9uOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIC8vIHdoZW4gaXQncyBhcnJheSwgd2Ugd2lsbCB1c2UgdGhlIG5ldyBmaWx0ZXJlZCBjb2xsZWN0aW9uIGFmdGVyIGV2ZXJ5IHBhc3NcclxuICAgIC8vIGJhc2ljYWxseSBpZiBpbnB1dCBjb2xsZWN0aW9uIGhhcyAxMCBpdGVtcyBvbiAxc3QgcGFzcyBhbmQgMSBpdGVtIGlzIGZpbHRlcmVkIG91dCwgdGhlbiBvbiAybmQgcGFzcyB0aGUgaW5wdXQgY29sbGVjdGlvbiB3aWxsIGJlIDkgaXRlbXNcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGZpbHRlckJ5T3B0aW9ucykpIHtcclxuICAgICAgZmlsdGVyZWRDb2xsZWN0aW9uID0gKGZpbHRlclJlc3VsdEJ5ID09PSBGaWx0ZXJNdWx0aXBsZVBhc3NUeXBlLm1lcmdlKSA/IFtdIDogY29sbGVjdGlvbjtcclxuXHJcbiAgICAgIGZvciAoY29uc3QgZmlsdGVyIG9mIGZpbHRlckJ5T3B0aW9ucykge1xyXG4gICAgICAgIGlmIChmaWx0ZXJSZXN1bHRCeSA9PT0gRmlsdGVyTXVsdGlwbGVQYXNzVHlwZS5tZXJnZSkge1xyXG4gICAgICAgICAgY29uc3QgZmlsdGVyZWRQYXNzID0gdGhpcy5zaW5nbGVGaWx0ZXJDb2xsZWN0aW9uKGNvbGxlY3Rpb24sIGZpbHRlcik7XHJcbiAgICAgICAgICBmaWx0ZXJlZENvbGxlY3Rpb24gPSB1bmlxdWVBcnJheShbLi4uZmlsdGVyZWRDb2xsZWN0aW9uLCAuLi5maWx0ZXJlZFBhc3NdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZmlsdGVyZWRDb2xsZWN0aW9uID0gdGhpcy5zaW5nbGVGaWx0ZXJDb2xsZWN0aW9uKGZpbHRlcmVkQ29sbGVjdGlvbiwgZmlsdGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZpbHRlcmVkQ29sbGVjdGlvbiA9IHRoaXMuc2luZ2xlRmlsdGVyQ29sbGVjdGlvbihjb2xsZWN0aW9uLCBmaWx0ZXJCeU9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmaWx0ZXJlZENvbGxlY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaWx0ZXIgYW4gaXRlbSBmcm9tIGEgY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIGZpbHRlckJ5XHJcbiAgICovXHJcbiAgc2luZ2xlRmlsdGVyQ29sbGVjdGlvbihjb2xsZWN0aW9uOiBhbnlbXSwgZmlsdGVyQnk6IENvbGxlY3Rpb25GaWx0ZXJCeSk6IGFueVtdIHtcclxuICAgIGxldCBmaWx0ZXJlZENvbGxlY3Rpb246IGFueVtdID0gW107XHJcblxyXG4gICAgaWYgKGZpbHRlckJ5KSB7XHJcbiAgICAgIGNvbnN0IHByb3BlcnR5ID0gZmlsdGVyQnkucHJvcGVydHkgfHwgJyc7XHJcbiAgICAgIGNvbnN0IG9wZXJhdG9yID0gZmlsdGVyQnkub3BlcmF0b3IgfHwgT3BlcmF0b3JUeXBlLmVxdWFsO1xyXG4gICAgICAvLyBqdXN0IGNoZWNrIGZvciB1bmRlZmluZWQgc2luY2UgdGhlIGZpbHRlciB2YWx1ZSBjb3VsZCBiZSBudWxsLCAwLCAnJywgZmFsc2UgZXRjXHJcbiAgICAgIGNvbnN0IHZhbHVlID0gdHlwZW9mIGZpbHRlckJ5LnZhbHVlID09PSAndW5kZWZpbmVkJyA/ICcnIDogZmlsdGVyQnkudmFsdWU7XHJcblxyXG4gICAgICBzd2l0Y2ggKG9wZXJhdG9yKSB7XHJcbiAgICAgICAgY2FzZSBPcGVyYXRvclR5cGUuZXF1YWw6XHJcbiAgICAgICAgICBmaWx0ZXJlZENvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLmZpbHRlcigoaXRlbSkgPT4gaXRlbVtwcm9wZXJ0eV0gPT09IHZhbHVlKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgT3BlcmF0b3JUeXBlLmNvbnRhaW5zOlxyXG4gICAgICAgICAgZmlsdGVyZWRDb2xsZWN0aW9uID0gY29sbGVjdGlvbi5maWx0ZXIoKGl0ZW0pID0+IGl0ZW1bcHJvcGVydHldLnRvU3RyaW5nKCkuaW5kZXhPZih2YWx1ZS50b1N0cmluZygpKSAhPT0gLTEpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBPcGVyYXRvclR5cGUubm90Q29udGFpbnM6XHJcbiAgICAgICAgICBmaWx0ZXJlZENvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLmZpbHRlcigoaXRlbSkgPT4gaXRlbVtwcm9wZXJ0eV0udG9TdHJpbmcoKS5pbmRleE9mKHZhbHVlLnRvU3RyaW5nKCkpID09PSAtMSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIE9wZXJhdG9yVHlwZS5ub3RFcXVhbDpcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgZmlsdGVyZWRDb2xsZWN0aW9uID0gY29sbGVjdGlvbi5maWx0ZXIoKGl0ZW0pID0+IGl0ZW1bcHJvcGVydHldICE9PSB2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmlsdGVyZWRDb2xsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU29ydCAxIG9yIG1vcmUgaXRlbXMgaW4gYSBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICogQHBhcmFtIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gc29ydEJ5T3B0aW9uc1xyXG4gICAqIEBwYXJhbSBlbmFibGVUcmFuc2xhdGVMYWJlbFxyXG4gICAqL1xyXG4gIHNvcnRDb2xsZWN0aW9uKGNvbHVtbkRlZjogQ29sdW1uLCBjb2xsZWN0aW9uOiBhbnlbXSwgc29ydEJ5T3B0aW9uczogQ29sbGVjdGlvblNvcnRCeSB8IENvbGxlY3Rpb25Tb3J0QnlbXSwgZW5hYmxlVHJhbnNsYXRlTGFiZWw/OiBib29sZWFuKTogYW55W10ge1xyXG4gICAgbGV0IHNvcnRlZENvbGxlY3Rpb246IGFueVtdID0gW107XHJcblxyXG4gICAgaWYgKHNvcnRCeU9wdGlvbnMpIHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc29ydEJ5T3B0aW9ucykpIHtcclxuICAgICAgICAvLyBtdWx0aS1zb3J0XHJcbiAgICAgICAgc29ydGVkQ29sbGVjdGlvbiA9IGNvbGxlY3Rpb24uc29ydCgoZGF0YVJvdzE6IGFueSwgZGF0YVJvdzI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBzb3J0QnlPcHRpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBzb3J0QnkgPSBzb3J0QnlPcHRpb25zW2ldO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNvcnRCeSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHNvcnREaXJlY3Rpb24gPSBzb3J0Qnkuc29ydERlc2MgPyBTb3J0RGlyZWN0aW9uTnVtYmVyLmRlc2MgOiBTb3J0RGlyZWN0aW9uTnVtYmVyLmFzYztcclxuICAgICAgICAgICAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSBzb3J0QnkucHJvcGVydHkgfHwgJyc7XHJcbiAgICAgICAgICAgICAgY29uc3QgZmllbGRUeXBlID0gc29ydEJ5LmZpZWxkVHlwZSB8fCBGaWVsZFR5cGUuc3RyaW5nO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlMSA9IChlbmFibGVUcmFuc2xhdGVMYWJlbCkgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KGRhdGFSb3cxW3Byb3BlcnR5TmFtZV0gfHwgJyAnKSA6IGRhdGFSb3cxW3Byb3BlcnR5TmFtZV07XHJcbiAgICAgICAgICAgICAgY29uc3QgdmFsdWUyID0gKGVuYWJsZVRyYW5zbGF0ZUxhYmVsKSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoZGF0YVJvdzJbcHJvcGVydHlOYW1lXSB8fCAnICcpIDogZGF0YVJvdzJbcHJvcGVydHlOYW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgY29uc3Qgc29ydFJlc3VsdCA9IHNvcnRCeUZpZWxkVHlwZSh2YWx1ZTEsIHZhbHVlMiwgZmllbGRUeXBlLCBzb3J0RGlyZWN0aW9uLCBjb2x1bW5EZWYpO1xyXG4gICAgICAgICAgICAgIGlmIChzb3J0UmVzdWx0ICE9PSBTb3J0RGlyZWN0aW9uTnVtYmVyLm5ldXRyYWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzb3J0UmVzdWx0O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIFNvcnREaXJlY3Rpb25OdW1iZXIubmV1dHJhbDtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBzaW5nbGUgc29ydFxyXG4gICAgICAgIGNvbnN0IHByb3BlcnR5TmFtZSA9IHNvcnRCeU9wdGlvbnMucHJvcGVydHkgfHwgJyc7XHJcbiAgICAgICAgY29uc3Qgc29ydERpcmVjdGlvbiA9IHNvcnRCeU9wdGlvbnMuc29ydERlc2MgPyBTb3J0RGlyZWN0aW9uTnVtYmVyLmRlc2MgOiBTb3J0RGlyZWN0aW9uTnVtYmVyLmFzYztcclxuICAgICAgICBjb25zdCBmaWVsZFR5cGUgPSBzb3J0QnlPcHRpb25zLmZpZWxkVHlwZSB8fCBGaWVsZFR5cGUuc3RyaW5nO1xyXG5cclxuICAgICAgICBzb3J0ZWRDb2xsZWN0aW9uID0gY29sbGVjdGlvbi5zb3J0KChkYXRhUm93MTogYW55LCBkYXRhUm93MjogYW55KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB2YWx1ZTEgPSAoZW5hYmxlVHJhbnNsYXRlTGFiZWwpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChkYXRhUm93MVtwcm9wZXJ0eU5hbWVdIHx8ICcgJykgOiBkYXRhUm93MVtwcm9wZXJ0eU5hbWVdO1xyXG4gICAgICAgICAgY29uc3QgdmFsdWUyID0gKGVuYWJsZVRyYW5zbGF0ZUxhYmVsKSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoZGF0YVJvdzJbcHJvcGVydHlOYW1lXSB8fCAnICcpIDogZGF0YVJvdzJbcHJvcGVydHlOYW1lXTtcclxuICAgICAgICAgIGNvbnN0IHNvcnRSZXN1bHQgPSBzb3J0QnlGaWVsZFR5cGUodmFsdWUxLCB2YWx1ZTIsIGZpZWxkVHlwZSwgc29ydERpcmVjdGlvbiwgY29sdW1uRGVmKTtcclxuICAgICAgICAgIGlmIChzb3J0UmVzdWx0ICE9PSBTb3J0RGlyZWN0aW9uTnVtYmVyLm5ldXRyYWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNvcnRSZXN1bHQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gU29ydERpcmVjdGlvbk51bWJlci5uZXV0cmFsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNvcnRlZENvbGxlY3Rpb247XHJcbiAgfVxyXG59XHJcbiJdfQ==