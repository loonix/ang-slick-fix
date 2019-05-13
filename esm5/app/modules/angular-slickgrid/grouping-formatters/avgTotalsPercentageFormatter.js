/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var avgTotalsPercentageFormatter = (/**
 * @param {?} totals
 * @param {?} columnDef
 * @param {?=} grid
 * @return {?}
 */
function (totals, columnDef, grid) {
    /** @type {?} */
    var field = columnDef.field || '';
    /** @type {?} */
    var val = totals.avg && totals.avg[field];
    /** @type {?} */
    var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    /** @type {?} */
    var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return prefix + Math.round(val) + '%' + suffix;
    }
    return '';
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZnVG90YWxzUGVyY2VudGFnZUZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZ3JvdXBpbmctZm9ybWF0dGVycy9hdmdUb3RhbHNQZXJjZW50YWdlRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsTUFBTSxLQUFPLDRCQUE0Qjs7Ozs7O0FBQXlCLFVBQUMsTUFBVyxFQUFFLFNBQWlCLEVBQUUsSUFBVTs7UUFDckcsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLElBQUksRUFBRTs7UUFDN0IsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7O1FBQ3JDLE1BQU0sR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFOztRQUNqSCxNQUFNLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUV2SCxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7UUFDZixPQUFPLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7S0FDaEQ7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgR3JvdXBUb3RhbHNGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG5leHBvcnQgY29uc3QgYXZnVG90YWxzUGVyY2VudGFnZUZvcm1hdHRlcjogR3JvdXBUb3RhbHNGb3JtYXR0ZXIgPSAodG90YWxzOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBncmlkPzogYW55KSA9PiB7XHJcbiAgY29uc3QgZmllbGQgPSBjb2x1bW5EZWYuZmllbGQgfHwgJyc7XHJcbiAgY29uc3QgdmFsID0gdG90YWxzLmF2ZyAmJiB0b3RhbHMuYXZnW2ZpZWxkXTtcclxuICBjb25zdCBwcmVmaXggPSAoY29sdW1uRGVmLnBhcmFtcyAmJiBjb2x1bW5EZWYucGFyYW1zLmdyb3VwRm9ybWF0dGVyUHJlZml4KSA/IGNvbHVtbkRlZi5wYXJhbXMuZ3JvdXBGb3JtYXR0ZXJQcmVmaXggOiAnJztcclxuICBjb25zdCBzdWZmaXggPSAoY29sdW1uRGVmLnBhcmFtcyAmJiBjb2x1bW5EZWYucGFyYW1zLmdyb3VwRm9ybWF0dGVyU3VmZml4KSA/IGNvbHVtbkRlZi5wYXJhbXMuZ3JvdXBGb3JtYXR0ZXJTdWZmaXggOiAnJztcclxuXHJcbiAgaWYgKHZhbCAhPSBudWxsKSB7XHJcbiAgICByZXR1cm4gcHJlZml4ICsgTWF0aC5yb3VuZCh2YWwpICsgJyUnICsgc3VmZml4O1xyXG4gIH1cclxuICByZXR1cm4gJyc7XHJcbn07XHJcbiJdfQ==