/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const percentFormatter = (/**
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
    /** @type {?} */
    const outputValue = value * 100;
    return `${outputValue}%`;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyY2VudEZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9wZXJjZW50Rm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7Ozs7QUFBYyxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsV0FBZ0IsRUFBVSxFQUFFOztVQUMxSCxRQUFRLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2pHLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixPQUFPLEtBQUssQ0FBQztLQUNkOztVQUVLLFdBQVcsR0FBRyxLQUFLLEdBQUcsR0FBRztJQUMvQixPQUFPLEdBQUcsV0FBVyxHQUFHLENBQUM7QUFDM0IsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uIH0gZnJvbSAnLi8uLi9tb2RlbHMvY29sdW1uLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2Zvcm1hdHRlci5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHBlcmNlbnRGb3JtYXR0ZXI6IEZvcm1hdHRlciA9IChyb3c6IG51bWJlciwgY2VsbDogbnVtYmVyLCB2YWx1ZTogYW55LCBjb2x1bW5EZWY6IENvbHVtbiwgZGF0YUNvbnRleHQ6IGFueSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgaXNOdW1iZXIgPSAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gJycpID8gZmFsc2UgOiAhaXNOYU4oK3ZhbHVlKTtcclxuICBpZiAoIWlzTnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBjb25zdCBvdXRwdXRWYWx1ZSA9IHZhbHVlICogMTAwO1xyXG4gIHJldHVybiBgJHtvdXRwdXRWYWx1ZX0lYDtcclxufTtcclxuIl19