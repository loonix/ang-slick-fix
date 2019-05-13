/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var percentSymbolFormatter = (/**
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
    return (isNumber) ? value + "%" : value;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyY2VudFN5bWJvbEZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9wZXJjZW50U3ltYm9sRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsTUFBTSxLQUFPLHNCQUFzQjs7Ozs7Ozs7QUFBYyxVQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsV0FBZ0I7O1FBQ3BILFFBQVEsR0FBRyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDakcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBSSxLQUFLLE1BQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQzFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiB9IGZyb20gJy4vLi4vbW9kZWxzL2NvbHVtbi5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9mb3JtYXR0ZXIuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjb25zdCBwZXJjZW50U3ltYm9sRm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGlzTnVtYmVyID0gKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09ICcnKSA/IGZhbHNlIDogIWlzTmFOKCt2YWx1ZSk7XHJcbiAgcmV0dXJuIChpc051bWJlcikgPyBgJHt2YWx1ZX0lYCA6IHZhbHVlO1xyXG59O1xyXG4iXX0=