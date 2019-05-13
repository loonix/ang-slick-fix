/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { decimalFormatted } from './../services/utilities';
/** @type {?} */
export const dollarColoredBoldFormatter = (/**
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
    if (!isNumber) {
        return value;
    }
    else if (value >= 0) {
        return `<span style="color:green; font-weight:bold;">$${outputValue}</span>`;
    }
    else {
        return `<span style="color:red; font-weight:bold;">$${outputValue}</span>`;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9sbGFyQ29sb3JlZEJvbGRGb3JtYXR0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2Zvcm1hdHRlcnMvZG9sbGFyQ29sb3JlZEJvbGRGb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQUUzRCxNQUFNLE9BQU8sMEJBQTBCOzs7Ozs7OztBQUFjLENBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxLQUFVLEVBQUUsU0FBaUIsRUFBRSxXQUFnQixFQUFFLEVBQUU7O1VBQzVILFFBQVEsR0FBRyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7O1VBQzNGLE1BQU0sR0FBRyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxFQUFFOztVQUM1QyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDOztVQUNuQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDOztVQUNuQyxXQUFXLEdBQUcsQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO0lBRXBJLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixPQUFPLEtBQUssQ0FBQztLQUNkO1NBQU0sSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1FBQ3JCLE9BQU8saURBQWlELFdBQVcsU0FBUyxDQUFDO0tBQzlFO1NBQU07UUFDTCxPQUFPLCtDQUErQyxXQUFXLFNBQVMsQ0FBQztLQUM1RTtBQUNILENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgRm9ybWF0dGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHsgZGVjaW1hbEZvcm1hdHRlZCB9IGZyb20gJy4vLi4vc2VydmljZXMvdXRpbGl0aWVzJztcblxuZXhwb3J0IGNvbnN0IGRvbGxhckNvbG9yZWRCb2xkRm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpID0+IHtcbiAgY29uc3QgaXNOdW1iZXIgPSAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gJycpID8gZmFsc2UgOiAhaXNOYU4oK3ZhbHVlKTtcbiAgY29uc3QgcGFyYW1zID0gY29sdW1uRGVmICYmIGNvbHVtbkRlZi5wYXJhbXMgfHwge307XG4gIGNvbnN0IG1pbkRlY2ltYWwgPSBwYXJhbXMubWluRGVjaW1hbCB8fCAyO1xuICBjb25zdCBtYXhEZWNpbWFsID0gcGFyYW1zLm1heERlY2ltYWwgfHwgNDtcbiAgY29uc3Qgb3V0cHV0VmFsdWUgPSAoaXNOdW1iZXIgJiYgKHBhcmFtcy5taW5EZWNpbWFsIHx8IHBhcmFtcy5tYXhEZWNpbWFsKSkgPyBkZWNpbWFsRm9ybWF0dGVkKHZhbHVlLCBtaW5EZWNpbWFsLCBtYXhEZWNpbWFsKSA6IHZhbHVlO1xuXG4gIGlmICghaXNOdW1iZXIpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0gZWxzZSBpZiAodmFsdWUgPj0gMCkge1xuICAgIHJldHVybiBgPHNwYW4gc3R5bGU9XCJjb2xvcjpncmVlbjsgZm9udC13ZWlnaHQ6Ym9sZDtcIj4kJHtvdXRwdXRWYWx1ZX08L3NwYW4+YDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYDxzcGFuIHN0eWxlPVwiY29sb3I6cmVkOyBmb250LXdlaWdodDpib2xkO1wiPiQke291dHB1dFZhbHVlfTwvc3Bhbj5gO1xuICB9XG59O1xuIl19