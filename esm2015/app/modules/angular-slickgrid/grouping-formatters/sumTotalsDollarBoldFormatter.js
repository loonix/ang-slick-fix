/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { decimalFormatted } from './../services/utilities';
/** @type {?} */
export const sumTotalsDollarBoldFormatter = (/**
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
        return `<span style="font-weight: bold;">${prefix + '$' + decimalFormatted(val, 2, 4) + suffix}</span>`;
    }
    return '';
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtVG90YWxzRG9sbGFyQm9sZEZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZ3JvdXBpbmctZm9ybWF0dGVycy9zdW1Ub3RhbHNEb2xsYXJCb2xkRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFFM0QsTUFBTSxPQUFPLDRCQUE0Qjs7Ozs7O0FBQXlCLENBQUMsTUFBVyxFQUFFLFNBQWlCLEVBQUUsSUFBVSxFQUFFLEVBQUU7O1VBQ3pHLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxJQUFJLEVBQUU7O1VBQzdCLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDOztVQUNyQyxNQUFNLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRTs7VUFDakgsTUFBTSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFFdkgsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO1FBQ2YsT0FBTyxvQ0FBb0MsTUFBTSxHQUFHLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sU0FBUyxDQUFDO0tBQ3pHO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4sIEdyb3VwVG90YWxzRm9ybWF0dGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBkZWNpbWFsRm9ybWF0dGVkIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHN1bVRvdGFsc0RvbGxhckJvbGRGb3JtYXR0ZXI6IEdyb3VwVG90YWxzRm9ybWF0dGVyID0gKHRvdGFsczogYW55LCBjb2x1bW5EZWY6IENvbHVtbiwgZ3JpZD86IGFueSkgPT4ge1xyXG4gIGNvbnN0IGZpZWxkID0gY29sdW1uRGVmLmZpZWxkIHx8ICcnO1xyXG4gIGNvbnN0IHZhbCA9IHRvdGFscy5zdW0gJiYgdG90YWxzLnN1bVtmaWVsZF07XHJcbiAgY29uc3QgcHJlZml4ID0gKGNvbHVtbkRlZi5wYXJhbXMgJiYgY29sdW1uRGVmLnBhcmFtcy5ncm91cEZvcm1hdHRlclByZWZpeCkgPyBjb2x1bW5EZWYucGFyYW1zLmdyb3VwRm9ybWF0dGVyUHJlZml4IDogJyc7XHJcbiAgY29uc3Qgc3VmZml4ID0gKGNvbHVtbkRlZi5wYXJhbXMgJiYgY29sdW1uRGVmLnBhcmFtcy5ncm91cEZvcm1hdHRlclN1ZmZpeCkgPyBjb2x1bW5EZWYucGFyYW1zLmdyb3VwRm9ybWF0dGVyU3VmZml4IDogJyc7XHJcblxyXG4gIGlmICh2YWwgIT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIGA8c3BhbiBzdHlsZT1cImZvbnQtd2VpZ2h0OiBib2xkO1wiPiR7cHJlZml4ICsgJyQnICsgZGVjaW1hbEZvcm1hdHRlZCh2YWwsIDIsIDQpICsgc3VmZml4fTwvc3Bhbj5gO1xyXG4gIH1cclxuICByZXR1cm4gJyc7XHJcbn07XHJcbiJdfQ==