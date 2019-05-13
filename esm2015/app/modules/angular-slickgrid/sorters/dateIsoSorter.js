/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { mapMomentDateFormatWithFieldType } from './../services/utilities';
import { FieldType } from './../models/index';
import { compareDates } from './compareDateUtility';
/** @type {?} */
const FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateIso);
/** @type {?} */
export const dateIsoSorter = (/**
 * @param {?} value1
 * @param {?} value2
 * @param {?} sortDirection
 * @return {?}
 */
(value1, value2, sortDirection) => {
    return compareDates(value1, value2, FORMAT, sortDirection, true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUlzb1NvcnRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvc29ydGVycy9kYXRlSXNvU29ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDOztNQUM5QyxNQUFNLEdBQUcsZ0NBQWdDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQzs7QUFFbEUsTUFBTSxPQUFPLGFBQWE7Ozs7OztBQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRTtJQUNyRSxPQUFPLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbkUsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbWFwTW9tZW50RGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7IEZpZWxkVHlwZSwgU29ydGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBjb21wYXJlRGF0ZXMgfSBmcm9tICcuL2NvbXBhcmVEYXRlVXRpbGl0eSc7XHJcbmNvbnN0IEZPUk1BVCA9IG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlKEZpZWxkVHlwZS5kYXRlSXNvKTtcclxuXHJcbmV4cG9ydCBjb25zdCBkYXRlSXNvU29ydGVyOiBTb3J0ZXIgPSAodmFsdWUxLCB2YWx1ZTIsIHNvcnREaXJlY3Rpb24pID0+IHtcclxuICByZXR1cm4gY29tcGFyZURhdGVzKHZhbHVlMSwgdmFsdWUyLCBGT1JNQVQsIHNvcnREaXJlY3Rpb24sIHRydWUpO1xyXG59O1xyXG4iXX0=