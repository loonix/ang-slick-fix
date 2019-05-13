/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { mapMomentDateFormatWithFieldType } from './../services/utilities';
import { FieldType } from './../models/index';
import { compareDates } from './compareDateUtility';
/** @type {?} */
const FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateUsShort);
/** @type {?} */
export const dateUsShortSorter = (/**
 * @param {?} value1
 * @param {?} value2
 * @param {?} sortDirection
 * @return {?}
 */
(value1, value2, sortDirection) => {
    return compareDates(value1, value2, FORMAT, sortDirection, true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVVzU2hvcnRTb3J0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NvcnRlcnMvZGF0ZVVzU2hvcnRTb3J0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNFLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7O01BQzlDLE1BQU0sR0FBRyxnQ0FBZ0MsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDOztBQUV0RSxNQUFNLE9BQU8saUJBQWlCOzs7Ozs7QUFBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUU7SUFDekUsT0FBTyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ25FLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBGaWVsZFR5cGUsIFNvcnRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgY29tcGFyZURhdGVzIH0gZnJvbSAnLi9jb21wYXJlRGF0ZVV0aWxpdHknO1xyXG5jb25zdCBGT1JNQVQgPSBtYXBNb21lbnREYXRlRm9ybWF0V2l0aEZpZWxkVHlwZShGaWVsZFR5cGUuZGF0ZVVzU2hvcnQpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRhdGVVc1Nob3J0U29ydGVyOiBTb3J0ZXIgPSAodmFsdWUxLCB2YWx1ZTIsIHNvcnREaXJlY3Rpb24pID0+IHtcclxuICByZXR1cm4gY29tcGFyZURhdGVzKHZhbHVlMSwgdmFsdWUyLCBGT1JNQVQsIHNvcnREaXJlY3Rpb24sIHRydWUpO1xyXG59O1xyXG4iXX0=