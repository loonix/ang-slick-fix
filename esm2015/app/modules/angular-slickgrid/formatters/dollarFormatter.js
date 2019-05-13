/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { decimalFormatted } from './../services/utilities';
/** @type {?} */
export const dollarFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} value
 * @param {?} columnDef
 * @param {?} dataContext
 * @return {?}
 */
(row, cell, value, columnDef, dataContext) => {
    /** @type {?} */
    const isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
    /** @type {?} */
    const params = columnDef && columnDef.params || {};
    /** @type {?} */
    const minDecimal = params.minDecimal || 2;
    /** @type {?} */
    const maxDecimal = params.maxDecimal || 4;
    /** @type {?} */
    const outputValue = (isNumber && (params.minDecimal || params.maxDecimal)) ? decimalFormatted(value, minDecimal, maxDecimal) : value;
    return !isNumber ? value : `$${outputValue}`;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9sbGFyRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL2RvbGxhckZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBRTNELE1BQU0sT0FBTyxlQUFlOzs7Ozs7OztBQUFjLENBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxLQUFVLEVBQUUsU0FBaUIsRUFBRSxXQUFnQixFQUFFLEVBQUU7O1VBQ2pILFFBQVEsR0FBRyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7O1VBQzNGLE1BQU0sR0FBRyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxFQUFFOztVQUM1QyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDOztVQUNuQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDOztVQUNuQyxXQUFXLEdBQUcsQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO0lBRXBJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUMvQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4sIEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IGRlY2ltYWxGb3JtYXR0ZWQgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XG5cbmV4cG9ydCBjb25zdCBkb2xsYXJGb3JtYXR0ZXI6IEZvcm1hdHRlciA9IChyb3c6IG51bWJlciwgY2VsbDogbnVtYmVyLCB2YWx1ZTogYW55LCBjb2x1bW5EZWY6IENvbHVtbiwgZGF0YUNvbnRleHQ6IGFueSkgPT4ge1xuICBjb25zdCBpc051bWJlciA9ICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSAnJykgPyBmYWxzZSA6ICFpc05hTigrdmFsdWUpO1xuICBjb25zdCBwYXJhbXMgPSBjb2x1bW5EZWYgJiYgY29sdW1uRGVmLnBhcmFtcyB8fCB7fTtcbiAgY29uc3QgbWluRGVjaW1hbCA9IHBhcmFtcy5taW5EZWNpbWFsIHx8IDI7XG4gIGNvbnN0IG1heERlY2ltYWwgPSBwYXJhbXMubWF4RGVjaW1hbCB8fCA0O1xuICBjb25zdCBvdXRwdXRWYWx1ZSA9IChpc051bWJlciAmJiAocGFyYW1zLm1pbkRlY2ltYWwgfHwgcGFyYW1zLm1heERlY2ltYWwpKSA/IGRlY2ltYWxGb3JtYXR0ZWQodmFsdWUsIG1pbkRlY2ltYWwsIG1heERlY2ltYWwpIDogdmFsdWU7XG5cbiAgcmV0dXJuICFpc051bWJlciA/IHZhbHVlIDogYCQke291dHB1dFZhbHVlfWA7XG59O1xuIl19