/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { mapMomentDateFormatWithFieldType } from './../services/utilities';
import { FieldType } from './../models/index';
import { compareDates } from './compareDateUtility';
/** @type {?} */
const FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateUs);
/** @type {?} */
export const dateUsSorter = (/**
 * @param {?} value1
 * @param {?} value2
 * @param {?} sortDirection
 * @return {?}
 */
(value1, value2, sortDirection) => {
    return compareDates(value1, value2, FORMAT, sortDirection, true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVVzU29ydGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zb3J0ZXJzL2RhdGVVc1NvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0UsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7TUFDOUMsTUFBTSxHQUFHLGdDQUFnQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7O0FBRWpFLE1BQU0sT0FBTyxZQUFZOzs7Ozs7QUFBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUU7SUFDcEUsT0FBTyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ25FLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBGaWVsZFR5cGUsIFNvcnRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgY29tcGFyZURhdGVzIH0gZnJvbSAnLi9jb21wYXJlRGF0ZVV0aWxpdHknO1xyXG5jb25zdCBGT1JNQVQgPSBtYXBNb21lbnREYXRlRm9ybWF0V2l0aEZpZWxkVHlwZShGaWVsZFR5cGUuZGF0ZVVzKTtcclxuXHJcbmV4cG9ydCBjb25zdCBkYXRlVXNTb3J0ZXI6IFNvcnRlciA9ICh2YWx1ZTEsIHZhbHVlMiwgc29ydERpcmVjdGlvbikgPT4ge1xyXG4gIHJldHVybiBjb21wYXJlRGF0ZXModmFsdWUxLCB2YWx1ZTIsIEZPUk1BVCwgc29ydERpcmVjdGlvbiwgdHJ1ZSk7XHJcbn07XHJcbiJdfQ==