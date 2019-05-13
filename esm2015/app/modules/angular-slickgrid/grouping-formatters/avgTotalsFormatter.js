/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const avgTotalsFormatter = (/**
 * @param {?} totals
 * @param {?} columnDef
 * @param {?=} grid
 * @return {?}
 */
(totals, columnDef, grid) => {
    /** @type {?} */
    const field = columnDef.field || '';
    /** @type {?} */
    const val = totals.avg && totals.avg[field];
    /** @type {?} */
    const prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    /** @type {?} */
    const suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return prefix + Math.round(val) + suffix;
    }
    return '';
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZnVG90YWxzRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9ncm91cGluZy1mb3JtYXR0ZXJzL2F2Z1RvdGFsc0Zvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE1BQU0sT0FBTyxrQkFBa0I7Ozs7OztBQUF5QixDQUFDLE1BQVcsRUFBRSxTQUFpQixFQUFFLElBQVUsRUFBRSxFQUFFOztVQUMvRixLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssSUFBSSxFQUFFOztVQUM3QixHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQzs7VUFDckMsTUFBTSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUU7O1VBQ2pILE1BQU0sR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFO0lBRXZILElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtRQUNmLE9BQU8sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDO0tBQzFDO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4sIEdyb3VwVG90YWxzRm9ybWF0dGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGF2Z1RvdGFsc0Zvcm1hdHRlcjogR3JvdXBUb3RhbHNGb3JtYXR0ZXIgPSAodG90YWxzOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBncmlkPzogYW55KSA9PiB7XHJcbiAgY29uc3QgZmllbGQgPSBjb2x1bW5EZWYuZmllbGQgfHwgJyc7XHJcbiAgY29uc3QgdmFsID0gdG90YWxzLmF2ZyAmJiB0b3RhbHMuYXZnW2ZpZWxkXTtcclxuICBjb25zdCBwcmVmaXggPSAoY29sdW1uRGVmLnBhcmFtcyAmJiBjb2x1bW5EZWYucGFyYW1zLmdyb3VwRm9ybWF0dGVyUHJlZml4KSA/IGNvbHVtbkRlZi5wYXJhbXMuZ3JvdXBGb3JtYXR0ZXJQcmVmaXggOiAnJztcclxuICBjb25zdCBzdWZmaXggPSAoY29sdW1uRGVmLnBhcmFtcyAmJiBjb2x1bW5EZWYucGFyYW1zLmdyb3VwRm9ybWF0dGVyU3VmZml4KSA/IGNvbHVtbkRlZi5wYXJhbXMuZ3JvdXBGb3JtYXR0ZXJTdWZmaXggOiAnJztcclxuXHJcbiAgaWYgKHZhbCAhPSBudWxsKSB7XHJcbiAgICByZXR1cm4gcHJlZml4ICsgTWF0aC5yb3VuZCh2YWwpICsgc3VmZml4O1xyXG4gIH1cclxuICByZXR1cm4gJyc7XHJcbn07XHJcbiJdfQ==