/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/** @type {?} */
export var multipleFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} value
 * @param {?} columnDef
 * @param {?} dataContext
 * @param {?} grid
 * @return {?}
 */
function (row, cell, value, columnDef, dataContext, grid) {
    var e_1, _a;
    /** @type {?} */
    var params = columnDef.params || {};
    if (!params.formatters || !Array.isArray(params.formatters)) {
        throw new Error("The multiple formatter requires the \"formatters\" to be provided as a column params.\n    For example: this.columnDefinitions = [{ id: title, field: title, formatter: Formatters.multiple, params: { formatters: [Formatters.lowercase, Formatters.uppercase] }");
    }
    /** @type {?} */
    var formatters = params.formatters;
    // loop through all Formatters, the value of 1st formatter will be used by 2nd formatter and so on.
    // they are piped and executed in sequences
    /** @type {?} */
    var currentValue = value;
    try {
        for (var formatters_1 = tslib_1.__values(formatters), formatters_1_1 = formatters_1.next(); !formatters_1_1.done; formatters_1_1 = formatters_1.next()) {
            var formatter = formatters_1_1.value;
            currentValue = formatter(row, cell, currentValue, columnDef, dataContext, grid);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (formatters_1_1 && !formatters_1_1.done && (_a = formatters_1.return)) _a.call(formatters_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return currentValue;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwbGVGb3JtYXR0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2Zvcm1hdHRlcnMvbXVsdGlwbGVGb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsTUFBTSxLQUFPLGlCQUFpQjs7Ozs7Ozs7O0FBQWMsVUFBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFpQixFQUFFLFdBQWdCLEVBQUUsSUFBUzs7O1FBQzFILE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUU7SUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUMzRCxNQUFNLElBQUksS0FBSyxDQUFDLG1RQUN1SixDQUFDLENBQUM7S0FDMUs7O1FBQ0ssVUFBVSxHQUFnQixNQUFNLENBQUMsVUFBVTs7OztRQUk3QyxZQUFZLEdBQUcsS0FBSzs7UUFDeEIsS0FBd0IsSUFBQSxlQUFBLGlCQUFBLFVBQVUsQ0FBQSxzQ0FBQSw4REFBRTtZQUEvQixJQUFNLFNBQVMsdUJBQUE7WUFDbEIsWUFBWSxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2pGOzs7Ozs7Ozs7SUFDRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4sIEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbmV4cG9ydCBjb25zdCBtdWx0aXBsZUZvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIHZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55LCBncmlkOiBhbnkpID0+IHtcclxuICBjb25zdCBwYXJhbXMgPSBjb2x1bW5EZWYucGFyYW1zIHx8IHt9O1xyXG4gIGlmICghcGFyYW1zLmZvcm1hdHRlcnMgfHwgIUFycmF5LmlzQXJyYXkocGFyYW1zLmZvcm1hdHRlcnMpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBtdWx0aXBsZSBmb3JtYXR0ZXIgcmVxdWlyZXMgdGhlIFwiZm9ybWF0dGVyc1wiIHRvIGJlIHByb3ZpZGVkIGFzIGEgY29sdW1uIHBhcmFtcy5cclxuICAgIEZvciBleGFtcGxlOiB0aGlzLmNvbHVtbkRlZmluaXRpb25zID0gW3sgaWQ6IHRpdGxlLCBmaWVsZDogdGl0bGUsIGZvcm1hdHRlcjogRm9ybWF0dGVycy5tdWx0aXBsZSwgcGFyYW1zOiB7IGZvcm1hdHRlcnM6IFtGb3JtYXR0ZXJzLmxvd2VyY2FzZSwgRm9ybWF0dGVycy51cHBlcmNhc2VdIH1gKTtcclxuICB9XHJcbiAgY29uc3QgZm9ybWF0dGVyczogRm9ybWF0dGVyW10gPSBwYXJhbXMuZm9ybWF0dGVycztcclxuXHJcbiAgLy8gbG9vcCB0aHJvdWdoIGFsbCBGb3JtYXR0ZXJzLCB0aGUgdmFsdWUgb2YgMXN0IGZvcm1hdHRlciB3aWxsIGJlIHVzZWQgYnkgMm5kIGZvcm1hdHRlciBhbmQgc28gb24uXHJcbiAgLy8gdGhleSBhcmUgcGlwZWQgYW5kIGV4ZWN1dGVkIGluIHNlcXVlbmNlc1xyXG4gIGxldCBjdXJyZW50VmFsdWUgPSB2YWx1ZTtcclxuICBmb3IgKGNvbnN0IGZvcm1hdHRlciBvZiBmb3JtYXR0ZXJzKSB7XHJcbiAgICBjdXJyZW50VmFsdWUgPSBmb3JtYXR0ZXIocm93LCBjZWxsLCBjdXJyZW50VmFsdWUsIGNvbHVtbkRlZiwgZGF0YUNvbnRleHQsIGdyaWQpO1xyXG4gIH1cclxuICByZXR1cm4gY3VycmVudFZhbHVlO1xyXG59O1xyXG4iXX0=