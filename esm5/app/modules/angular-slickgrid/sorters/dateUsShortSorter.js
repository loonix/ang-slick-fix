/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { mapMomentDateFormatWithFieldType } from './../services/utilities';
import { FieldType } from './../models/index';
import { compareDates } from './compareDateUtility';
/** @type {?} */
var FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateUsShort);
/** @type {?} */
export var dateUsShortSorter = (/**
 * @param {?} value1
 * @param {?} value2
 * @param {?} sortDirection
 * @return {?}
 */
function (value1, value2, sortDirection) {
    return compareDates(value1, value2, FORMAT, sortDirection, true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVVzU2hvcnRTb3J0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NvcnRlcnMvZGF0ZVVzU2hvcnRTb3J0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNFLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0lBQzlDLE1BQU0sR0FBRyxnQ0FBZ0MsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDOztBQUV0RSxNQUFNLEtBQU8saUJBQWlCOzs7Ozs7QUFBVyxVQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYTtJQUNyRSxPQUFPLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbkUsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbWFwTW9tZW50RGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7IEZpZWxkVHlwZSwgU29ydGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBjb21wYXJlRGF0ZXMgfSBmcm9tICcuL2NvbXBhcmVEYXRlVXRpbGl0eSc7XHJcbmNvbnN0IEZPUk1BVCA9IG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlKEZpZWxkVHlwZS5kYXRlVXNTaG9ydCk7XHJcblxyXG5leHBvcnQgY29uc3QgZGF0ZVVzU2hvcnRTb3J0ZXI6IFNvcnRlciA9ICh2YWx1ZTEsIHZhbHVlMiwgc29ydERpcmVjdGlvbikgPT4ge1xyXG4gIHJldHVybiBjb21wYXJlRGF0ZXModmFsdWUxLCB2YWx1ZTIsIEZPUk1BVCwgc29ydERpcmVjdGlvbiwgdHJ1ZSk7XHJcbn07XHJcbiJdfQ==