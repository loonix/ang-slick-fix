/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const percentCompleteFormatter = (/**
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
    if (!isNumber) {
        return value;
    }
    else if (value < 50) {
        return `<span style='color:red;font-weight:bold;'>${value}%</span>`;
    }
    else {
        /** @type {?} */
        const outputValue = value > 100 ? 100 : value;
        return `<span style='color:green'>${outputValue}%</span>`;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyY2VudENvbXBsZXRlRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL3BlcmNlbnRDb21wbGV0ZUZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE1BQU0sT0FBTyx3QkFBd0I7Ozs7Ozs7O0FBQWMsQ0FBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFpQixFQUFFLFdBQWdCLEVBQVUsRUFBRTs7VUFDbEksUUFBUSxHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUVqRyxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2IsT0FBTyxLQUFLLENBQUM7S0FDZDtTQUFNLElBQUksS0FBSyxHQUFHLEVBQUUsRUFBRTtRQUNyQixPQUFPLDZDQUE2QyxLQUFLLFVBQVUsQ0FBQztLQUNyRTtTQUFNOztjQUNDLFdBQVcsR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUs7UUFDN0MsT0FBTyw2QkFBNkIsV0FBVyxVQUFVLENBQUM7S0FDM0Q7QUFDSCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4sIEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcblxuZXhwb3J0IGNvbnN0IHBlcmNlbnRDb21wbGV0ZUZvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIHZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55KTogc3RyaW5nID0+IHtcbiAgY29uc3QgaXNOdW1iZXIgPSAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gJycpID8gZmFsc2UgOiAhaXNOYU4oK3ZhbHVlKTtcblxuICBpZiAoIWlzTnVtYmVyKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9IGVsc2UgaWYgKHZhbHVlIDwgNTApIHtcbiAgICByZXR1cm4gYDxzcGFuIHN0eWxlPSdjb2xvcjpyZWQ7Zm9udC13ZWlnaHQ6Ym9sZDsnPiR7dmFsdWV9JTwvc3Bhbj5gO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IG91dHB1dFZhbHVlID0gdmFsdWUgPiAxMDAgPyAxMDAgOiB2YWx1ZTtcbiAgICByZXR1cm4gYDxzcGFuIHN0eWxlPSdjb2xvcjpncmVlbic+JHtvdXRwdXRWYWx1ZX0lPC9zcGFuPmA7XG4gIH1cbn07XG4iXX0=