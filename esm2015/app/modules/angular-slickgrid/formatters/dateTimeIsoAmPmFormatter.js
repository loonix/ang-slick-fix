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
const FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateTimeIsoAmPm);
/** @type {?} */
export const dateTimeIsoAmPmFormatter = (/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVRpbWVJc29BbVBtRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL2RhdGVUaW1lSXNvQW1QbUZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFVLFNBQVMsRUFBYSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNFLE9BQU8sS0FBSyxPQUFPLE1BQU0sYUFBYSxDQUFDOztNQUNqQyxNQUFNLEdBQUcsT0FBTzs7O01BQ2hCLE1BQU0sR0FBRyxnQ0FBZ0MsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDOztBQUUxRSxNQUFNLE9BQU8sd0JBQXdCOzs7Ozs7OztBQUFjLENBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxLQUFVLEVBQUUsU0FBaUIsRUFBRSxXQUFnQixFQUFFLEVBQUU7O1VBQzFILFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUU7SUFDMUQsT0FBTyxDQUFDLEtBQUssSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ3ZFLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgRmllbGRUeXBlLCBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudC1taW5pJztcclxuY29uc3QgbW9tZW50ID0gbW9tZW50XzsgLy8gcGF0Y2ggdG8gZml4IHJvbGx1cCBcIm1vbWVudCBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIiBpc3N1ZSwgZG9jdW1lbnQgaGVyZSBodHRwczovL2dpdGh1Yi5jb20vcm9sbHVwL3JvbGx1cC9pc3N1ZXMvNjcwXHJcbmNvbnN0IEZPUk1BVCA9IG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlKEZpZWxkVHlwZS5kYXRlVGltZUlzb0FtUG0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRhdGVUaW1lSXNvQW1QbUZvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIHZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55KSA9PiB7XHJcbiAgY29uc3QgaXNEYXRlVmFsaWQgPSBtb21lbnQodmFsdWUsIEZPUk1BVCwgZmFsc2UpLmlzVmFsaWQoKTtcclxuICByZXR1cm4gKHZhbHVlICYmIGlzRGF0ZVZhbGlkKSA/IG1vbWVudCh2YWx1ZSkuZm9ybWF0KEZPUk1BVCkgOiB2YWx1ZTtcclxufTtcclxuIl19