/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FieldType } from './../models/index';
import { mapMomentDateFormatWithFieldType } from './../services/utilities';
import * as moment_ from 'moment-mini';
/** @type {?} */
const moment = moment_;
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
/** @type {?} */
const FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateTimeShortIso);
/** @type {?} */
export const dateTimeShortIsoFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} value
 * @param {?} columnDef
 * @param {?} dataContext
 * @return {?}
 */
(row, cell, value, columnDef, dataContext) => {
    /** @type {?} */
    const isDateValid = moment(value, FORMAT, false).isValid();
    return (value && isDateValid) ? moment(value).format(FORMAT) : value;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVRpbWVTaG9ydElzb0Zvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9kYXRlVGltZVNob3J0SXNvRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQVUsU0FBUyxFQUFhLE1BQU0sbUJBQW1CLENBQUM7QUFDakUsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0UsT0FBTyxLQUFLLE9BQU8sTUFBTSxhQUFhLENBQUM7O01BQ2pDLE1BQU0sR0FBRyxPQUFPOzs7TUFDaEIsTUFBTSxHQUFHLGdDQUFnQyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQzs7QUFFM0UsTUFBTSxPQUFPLHlCQUF5Qjs7Ozs7Ozs7QUFBYyxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsV0FBZ0IsRUFBRSxFQUFFOztVQUMzSCxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFO0lBQzFELE9BQU8sQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUN2RSxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4sIEZpZWxkVHlwZSwgRm9ybWF0dGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBtYXBNb21lbnREYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSB9IGZyb20gJy4vLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQtbWluaSc7XHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87IC8vIHBhdGNoIHRvIGZpeCByb2xsdXAgXCJtb21lbnQgaGFzIG5vIGRlZmF1bHQgZXhwb3J0XCIgaXNzdWUsIGRvY3VtZW50IGhlcmUgaHR0cHM6Ly9naXRodWIuY29tL3JvbGx1cC9yb2xsdXAvaXNzdWVzLzY3MFxyXG5jb25zdCBGT1JNQVQgPSBtYXBNb21lbnREYXRlRm9ybWF0V2l0aEZpZWxkVHlwZShGaWVsZFR5cGUuZGF0ZVRpbWVTaG9ydElzbyk7XHJcblxyXG5leHBvcnQgY29uc3QgZGF0ZVRpbWVTaG9ydElzb0Zvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIHZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55KSA9PiB7XHJcbiAgY29uc3QgaXNEYXRlVmFsaWQgPSBtb21lbnQodmFsdWUsIEZPUk1BVCwgZmFsc2UpLmlzVmFsaWQoKTtcclxuICByZXR1cm4gKHZhbHVlICYmIGlzRGF0ZVZhbGlkKSA/IG1vbWVudCh2YWx1ZSkuZm9ybWF0KEZPUk1BVCkgOiB2YWx1ZTtcclxufTtcclxuIl19