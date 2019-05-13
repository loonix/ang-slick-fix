/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var percentCompleteFormatter = (/**
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
    if (!isNumber) {
        return value;
    }
    else if (value < 50) {
        return "<span style='color:red;font-weight:bold;'>" + value + "%</span>";
    }
    else {
        /** @type {?} */
        var outputValue = value > 100 ? 100 : value;
        return "<span style='color:green'>" + outputValue + "%</span>";
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyY2VudENvbXBsZXRlRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL3BlcmNlbnRDb21wbGV0ZUZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE1BQU0sS0FBTyx3QkFBd0I7Ozs7Ozs7O0FBQWMsVUFBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFpQixFQUFFLFdBQWdCOztRQUN0SCxRQUFRLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBRWpHLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixPQUFPLEtBQUssQ0FBQztLQUNkO1NBQU0sSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUFFO1FBQ3JCLE9BQU8sK0NBQTZDLEtBQUssYUFBVSxDQUFDO0tBQ3JFO1NBQU07O1lBQ0MsV0FBVyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSztRQUM3QyxPQUFPLCtCQUE2QixXQUFXLGFBQVUsQ0FBQztLQUMzRDtBQUNILENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgRm9ybWF0dGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuXG5leHBvcnQgY29uc3QgcGVyY2VudENvbXBsZXRlRm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBpc051bWJlciA9ICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSAnJykgPyBmYWxzZSA6ICFpc05hTigrdmFsdWUpO1xuXG4gIGlmICghaXNOdW1iZXIpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0gZWxzZSBpZiAodmFsdWUgPCA1MCkge1xuICAgIHJldHVybiBgPHNwYW4gc3R5bGU9J2NvbG9yOnJlZDtmb250LXdlaWdodDpib2xkOyc+JHt2YWx1ZX0lPC9zcGFuPmA7XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qgb3V0cHV0VmFsdWUgPSB2YWx1ZSA+IDEwMCA/IDEwMCA6IHZhbHVlO1xuICAgIHJldHVybiBgPHNwYW4gc3R5bGU9J2NvbG9yOmdyZWVuJz4ke291dHB1dFZhbHVlfSU8L3NwYW4+YDtcbiAgfVxufTtcbiJdfQ==