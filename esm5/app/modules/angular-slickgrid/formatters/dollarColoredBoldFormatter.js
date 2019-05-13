/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { decimalFormatted } from './../services/utilities';
/** @type {?} */
export var dollarColoredBoldFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} value
 * @param {?} columnDef
 * @param {?} dataContext
 * @return {?}
 */
function (row, cell, value, columnDef, dataContext) {
    /** @type {?} */
    var isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
    /** @type {?} */
    var params = columnDef && columnDef.params || {};
    /** @type {?} */
    var minDecimal = params.minDecimal || 2;
    /** @type {?} */
    var maxDecimal = params.maxDecimal || 4;
    /** @type {?} */
    var outputValue = (isNumber && (params.minDecimal || params.maxDecimal)) ? decimalFormatted(value, minDecimal, maxDecimal) : value;
    if (!isNumber) {
        return value;
    }
    else if (value >= 0) {
        return "<span style=\"color:green; font-weight:bold;\">$" + outputValue + "</span>";
    }
    else {
        return "<span style=\"color:red; font-weight:bold;\">$" + outputValue + "</span>";
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9sbGFyQ29sb3JlZEJvbGRGb3JtYXR0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2Zvcm1hdHRlcnMvZG9sbGFyQ29sb3JlZEJvbGRGb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQUUzRCxNQUFNLEtBQU8sMEJBQTBCOzs7Ozs7OztBQUFjLFVBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxLQUFVLEVBQUUsU0FBaUIsRUFBRSxXQUFnQjs7UUFDeEgsUUFBUSxHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQzs7UUFDM0YsTUFBTSxHQUFHLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUU7O1FBQzVDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxJQUFJLENBQUM7O1FBQ25DLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxJQUFJLENBQUM7O1FBQ25DLFdBQVcsR0FBRyxDQUFDLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7SUFFcEksSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNiLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7U0FBTSxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7UUFDckIsT0FBTyxxREFBaUQsV0FBVyxZQUFTLENBQUM7S0FDOUU7U0FBTTtRQUNMLE9BQU8sbURBQStDLFdBQVcsWUFBUyxDQUFDO0tBQzVFO0FBQ0gsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBkZWNpbWFsRm9ybWF0dGVkIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xuXG5leHBvcnQgY29uc3QgZG9sbGFyQ29sb3JlZEJvbGRGb3JtYXR0ZXI6IEZvcm1hdHRlciA9IChyb3c6IG51bWJlciwgY2VsbDogbnVtYmVyLCB2YWx1ZTogYW55LCBjb2x1bW5EZWY6IENvbHVtbiwgZGF0YUNvbnRleHQ6IGFueSkgPT4ge1xuICBjb25zdCBpc051bWJlciA9ICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSAnJykgPyBmYWxzZSA6ICFpc05hTigrdmFsdWUpO1xuICBjb25zdCBwYXJhbXMgPSBjb2x1bW5EZWYgJiYgY29sdW1uRGVmLnBhcmFtcyB8fCB7fTtcbiAgY29uc3QgbWluRGVjaW1hbCA9IHBhcmFtcy5taW5EZWNpbWFsIHx8IDI7XG4gIGNvbnN0IG1heERlY2ltYWwgPSBwYXJhbXMubWF4RGVjaW1hbCB8fCA0O1xuICBjb25zdCBvdXRwdXRWYWx1ZSA9IChpc051bWJlciAmJiAocGFyYW1zLm1pbkRlY2ltYWwgfHwgcGFyYW1zLm1heERlY2ltYWwpKSA/IGRlY2ltYWxGb3JtYXR0ZWQodmFsdWUsIG1pbkRlY2ltYWwsIG1heERlY2ltYWwpIDogdmFsdWU7XG5cbiAgaWYgKCFpc051bWJlcikge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSBlbHNlIGlmICh2YWx1ZSA+PSAwKSB7XG4gICAgcmV0dXJuIGA8c3BhbiBzdHlsZT1cImNvbG9yOmdyZWVuOyBmb250LXdlaWdodDpib2xkO1wiPiQke291dHB1dFZhbHVlfTwvc3Bhbj5gO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBgPHNwYW4gc3R5bGU9XCJjb2xvcjpyZWQ7IGZvbnQtd2VpZ2h0OmJvbGQ7XCI+JCR7b3V0cHV0VmFsdWV9PC9zcGFuPmA7XG4gIH1cbn07XG4iXX0=