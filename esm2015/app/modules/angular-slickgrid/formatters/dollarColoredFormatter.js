/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { decimalFormatted } from './../services/utilities';
/** @type {?} */
export const dollarColoredFormatter = (/**
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
        return `<span style="color:green;">$${outputValue}</span>`;
    }
    else {
        return `<span style="color:red;">$${outputValue}</span>`;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9sbGFyQ29sb3JlZEZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9kb2xsYXJDb2xvcmVkRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFFM0QsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7Ozs7QUFBYyxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsV0FBZ0IsRUFBRSxFQUFFOztVQUN4SCxRQUFRLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDOztVQUMzRixNQUFNLEdBQUcsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRTs7VUFDNUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQzs7VUFDbkMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQzs7VUFDbkMsV0FBVyxHQUFHLENBQUMsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztJQUVwSSxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2IsT0FBTyxLQUFLLENBQUM7S0FDZDtTQUFNLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtRQUNyQixPQUFPLCtCQUErQixXQUFXLFNBQVMsQ0FBQztLQUM1RDtTQUFNO1FBQ0wsT0FBTyw2QkFBNkIsV0FBVyxTQUFTLENBQUM7S0FDMUQ7QUFDSCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4sIEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IGRlY2ltYWxGb3JtYXR0ZWQgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XG5cbmV4cG9ydCBjb25zdCBkb2xsYXJDb2xvcmVkRm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpID0+IHtcbiAgY29uc3QgaXNOdW1iZXIgPSAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gJycpID8gZmFsc2UgOiAhaXNOYU4oK3ZhbHVlKTtcbiAgY29uc3QgcGFyYW1zID0gY29sdW1uRGVmICYmIGNvbHVtbkRlZi5wYXJhbXMgfHwge307XG4gIGNvbnN0IG1pbkRlY2ltYWwgPSBwYXJhbXMubWluRGVjaW1hbCB8fCAyO1xuICBjb25zdCBtYXhEZWNpbWFsID0gcGFyYW1zLm1heERlY2ltYWwgfHwgNDtcbiAgY29uc3Qgb3V0cHV0VmFsdWUgPSAoaXNOdW1iZXIgJiYgKHBhcmFtcy5taW5EZWNpbWFsIHx8IHBhcmFtcy5tYXhEZWNpbWFsKSkgPyBkZWNpbWFsRm9ybWF0dGVkKHZhbHVlLCBtaW5EZWNpbWFsLCBtYXhEZWNpbWFsKSA6IHZhbHVlO1xuXG4gIGlmICghaXNOdW1iZXIpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0gZWxzZSBpZiAodmFsdWUgPj0gMCkge1xuICAgIHJldHVybiBgPHNwYW4gc3R5bGU9XCJjb2xvcjpncmVlbjtcIj4kJHtvdXRwdXRWYWx1ZX08L3NwYW4+YDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYDxzcGFuIHN0eWxlPVwiY29sb3I6cmVkO1wiPiQke291dHB1dFZhbHVlfTwvc3Bhbj5gO1xuICB9XG59O1xuIl19