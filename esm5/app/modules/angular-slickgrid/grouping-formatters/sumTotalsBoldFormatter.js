/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var sumTotalsBoldFormatter = (/**
 * @param {?} totals
 * @param {?} columnDef
 * @param {?=} grid
 * @return {?}
 */
function (totals, columnDef, grid) {
    /** @type {?} */
    var field = columnDef.field || '';
    /** @type {?} */
    var val = totals.sum && totals.sum[field];
    /** @type {?} */
    var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    /** @type {?} */
    var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return "<span style=\"font-weight: bold;\">" + (prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix);
    }
    return '';
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtVG90YWxzQm9sZEZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZ3JvdXBpbmctZm9ybWF0dGVycy9zdW1Ub3RhbHNCb2xkRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsTUFBTSxLQUFPLHNCQUFzQjs7Ozs7O0FBQXlCLFVBQUMsTUFBVyxFQUFFLFNBQWlCLEVBQUUsSUFBVTs7UUFDL0YsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLElBQUksRUFBRTs7UUFDN0IsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7O1FBQ3JDLE1BQU0sR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFOztRQUNqSCxNQUFNLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUV2SCxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7UUFDZixPQUFPLHlDQUFvQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFFLENBQUM7S0FDcEg7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgR3JvdXBUb3RhbHNGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG5leHBvcnQgY29uc3Qgc3VtVG90YWxzQm9sZEZvcm1hdHRlcjogR3JvdXBUb3RhbHNGb3JtYXR0ZXIgPSAodG90YWxzOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBncmlkPzogYW55KSA9PiB7XHJcbiAgY29uc3QgZmllbGQgPSBjb2x1bW5EZWYuZmllbGQgfHwgJyc7XHJcbiAgY29uc3QgdmFsID0gdG90YWxzLnN1bSAmJiB0b3RhbHMuc3VtW2ZpZWxkXTtcclxuICBjb25zdCBwcmVmaXggPSAoY29sdW1uRGVmLnBhcmFtcyAmJiBjb2x1bW5EZWYucGFyYW1zLmdyb3VwRm9ybWF0dGVyUHJlZml4KSA/IGNvbHVtbkRlZi5wYXJhbXMuZ3JvdXBGb3JtYXR0ZXJQcmVmaXggOiAnJztcclxuICBjb25zdCBzdWZmaXggPSAoY29sdW1uRGVmLnBhcmFtcyAmJiBjb2x1bW5EZWYucGFyYW1zLmdyb3VwRm9ybWF0dGVyU3VmZml4KSA/IGNvbHVtbkRlZi5wYXJhbXMuZ3JvdXBGb3JtYXR0ZXJTdWZmaXggOiAnJztcclxuXHJcbiAgaWYgKHZhbCAhPSBudWxsKSB7XHJcbiAgICByZXR1cm4gYDxzcGFuIHN0eWxlPVwiZm9udC13ZWlnaHQ6IGJvbGQ7XCI+JHtwcmVmaXggKyAoKE1hdGgucm91bmQocGFyc2VGbG9hdCh2YWwpICogMTAwMDAwMCkgLyAxMDAwMDAwKSkgKyBzdWZmaXh9YDtcclxuICB9XHJcbiAgcmV0dXJuICcnO1xyXG59O1xyXG4iXX0=