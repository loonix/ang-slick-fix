/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const sumTotalsFormatter = (/**
 * @param {?} totals
 * @param {?} columnDef
 * @param {?=} grid
 * @return {?}
 */
(totals, columnDef, grid) => {
    /** @type {?} */
    const field = columnDef.field || '';
    /** @type {?} */
    const val = totals.sum && totals.sum[field];
    /** @type {?} */
    const prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    /** @type {?} */
    const suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix;
    }
    return '';
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtVG90YWxzRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9ncm91cGluZy1mb3JtYXR0ZXJzL3N1bVRvdGFsc0Zvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE1BQU0sT0FBTyxrQkFBa0I7Ozs7OztBQUF5QixDQUFDLE1BQVcsRUFBRSxTQUFpQixFQUFFLElBQVUsRUFBRSxFQUFFOztVQUMvRixLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssSUFBSSxFQUFFOztVQUM3QixHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQzs7VUFDckMsTUFBTSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUU7O1VBQ2pILE1BQU0sR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFO0lBRXZILElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtRQUNmLE9BQU8sTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztLQUM5RTtJQUNELE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBHcm91cFRvdGFsc0Zvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbmV4cG9ydCBjb25zdCBzdW1Ub3RhbHNGb3JtYXR0ZXI6IEdyb3VwVG90YWxzRm9ybWF0dGVyID0gKHRvdGFsczogYW55LCBjb2x1bW5EZWY6IENvbHVtbiwgZ3JpZD86IGFueSkgPT4ge1xyXG4gIGNvbnN0IGZpZWxkID0gY29sdW1uRGVmLmZpZWxkIHx8ICcnO1xyXG4gIGNvbnN0IHZhbCA9IHRvdGFscy5zdW0gJiYgdG90YWxzLnN1bVtmaWVsZF07XHJcbiAgY29uc3QgcHJlZml4ID0gKGNvbHVtbkRlZi5wYXJhbXMgJiYgY29sdW1uRGVmLnBhcmFtcy5ncm91cEZvcm1hdHRlclByZWZpeCkgPyBjb2x1bW5EZWYucGFyYW1zLmdyb3VwRm9ybWF0dGVyUHJlZml4IDogJyc7XHJcbiAgY29uc3Qgc3VmZml4ID0gKGNvbHVtbkRlZi5wYXJhbXMgJiYgY29sdW1uRGVmLnBhcmFtcy5ncm91cEZvcm1hdHRlclN1ZmZpeCkgPyBjb2x1bW5EZWYucGFyYW1zLmdyb3VwRm9ybWF0dGVyU3VmZml4IDogJyc7XHJcblxyXG4gIGlmICh2YWwgIT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIHByZWZpeCArICgoTWF0aC5yb3VuZChwYXJzZUZsb2F0KHZhbCkgKiAxMDAwMDAwKSAvIDEwMDAwMDApKSArIHN1ZmZpeDtcclxuICB9XHJcbiAgcmV0dXJuICcnO1xyXG59O1xyXG4iXX0=