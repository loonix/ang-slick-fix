/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const arrayToCsvFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} value
 * @param {?} columnDef
 * @param {?} dataContext
 * @return {?}
 */
(row, cell, value, columnDef, dataContext) => {
    if (value && Array.isArray(value) && value.length > 0) {
        /** @type {?} */
        const values = value.join(', ');
        return `<span title="${values}">${values}</span>`;
    }
    return value;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlUb0NzdkZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9hcnJheVRvQ3N2Rm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsTUFBTSxPQUFPLG1CQUFtQjs7Ozs7Ozs7QUFBYyxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsV0FBZ0IsRUFBRSxFQUFFO0lBQzNILElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O2NBQy9DLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMvQixPQUFPLGdCQUFnQixNQUFNLEtBQUssTUFBTSxTQUFTLENBQUM7S0FDbkQ7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiB9IGZyb20gJy4vLi4vbW9kZWxzL2NvbHVtbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRm9ybWF0dGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvZm9ybWF0dGVyLmludGVyZmFjZSc7XG5cbmV4cG9ydCBjb25zdCBhcnJheVRvQ3N2Rm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpID0+IHtcbiAgaWYgKHZhbHVlICYmIEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCB2YWx1ZXMgPSB2YWx1ZS5qb2luKCcsICcpO1xuICAgIHJldHVybiBgPHNwYW4gdGl0bGU9XCIke3ZhbHVlc31cIj4ke3ZhbHVlc308L3NwYW4+YDtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59O1xuIl19