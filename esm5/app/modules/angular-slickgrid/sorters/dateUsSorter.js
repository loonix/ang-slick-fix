/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { mapMomentDateFormatWithFieldType } from './../services/utilities';
import { FieldType } from './../models/index';
import { compareDates } from './compareDateUtility';
/** @type {?} */
var FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateUs);
/** @type {?} */
export var dateUsSorter = (/**
 * @param {?} value1
 * @param {?} value2
 * @param {?} sortDirection
 * @return {?}
 */
function (value1, value2, sortDirection) {
    return compareDates(value1, value2, FORMAT, sortDirection, true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVVzU29ydGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zb3J0ZXJzL2RhdGVVc1NvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0UsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7SUFDOUMsTUFBTSxHQUFHLGdDQUFnQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7O0FBRWpFLE1BQU0sS0FBTyxZQUFZOzs7Ozs7QUFBVyxVQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYTtJQUNoRSxPQUFPLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbkUsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbWFwTW9tZW50RGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7IEZpZWxkVHlwZSwgU29ydGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBjb21wYXJlRGF0ZXMgfSBmcm9tICcuL2NvbXBhcmVEYXRlVXRpbGl0eSc7XHJcbmNvbnN0IEZPUk1BVCA9IG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlKEZpZWxkVHlwZS5kYXRlVXMpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRhdGVVc1NvcnRlcjogU29ydGVyID0gKHZhbHVlMSwgdmFsdWUyLCBzb3J0RGlyZWN0aW9uKSA9PiB7XHJcbiAgcmV0dXJuIGNvbXBhcmVEYXRlcyh2YWx1ZTEsIHZhbHVlMiwgRk9STUFULCBzb3J0RGlyZWN0aW9uLCB0cnVlKTtcclxufTtcclxuIl19