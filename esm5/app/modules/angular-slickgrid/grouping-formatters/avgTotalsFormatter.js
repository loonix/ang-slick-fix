/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var avgTotalsFormatter = (/**
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
        return prefix + Math.round(val) + suffix;
    }
    return '';
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZnVG90YWxzRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9ncm91cGluZy1mb3JtYXR0ZXJzL2F2Z1RvdGFsc0Zvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE1BQU0sS0FBTyxrQkFBa0I7Ozs7OztBQUF5QixVQUFDLE1BQVcsRUFBRSxTQUFpQixFQUFFLElBQVU7O1FBQzNGLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxJQUFJLEVBQUU7O1FBQzdCLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDOztRQUNyQyxNQUFNLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRTs7UUFDakgsTUFBTSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFFdkgsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO1FBQ2YsT0FBTyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUM7S0FDMUM7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgR3JvdXBUb3RhbHNGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG5leHBvcnQgY29uc3QgYXZnVG90YWxzRm9ybWF0dGVyOiBHcm91cFRvdGFsc0Zvcm1hdHRlciA9ICh0b3RhbHM6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGdyaWQ/OiBhbnkpID0+IHtcclxuICBjb25zdCBmaWVsZCA9IGNvbHVtbkRlZi5maWVsZCB8fCAnJztcclxuICBjb25zdCB2YWwgPSB0b3RhbHMuYXZnICYmIHRvdGFscy5hdmdbZmllbGRdO1xyXG4gIGNvbnN0IHByZWZpeCA9IChjb2x1bW5EZWYucGFyYW1zICYmIGNvbHVtbkRlZi5wYXJhbXMuZ3JvdXBGb3JtYXR0ZXJQcmVmaXgpID8gY29sdW1uRGVmLnBhcmFtcy5ncm91cEZvcm1hdHRlclByZWZpeCA6ICcnO1xyXG4gIGNvbnN0IHN1ZmZpeCA9IChjb2x1bW5EZWYucGFyYW1zICYmIGNvbHVtbkRlZi5wYXJhbXMuZ3JvdXBGb3JtYXR0ZXJTdWZmaXgpID8gY29sdW1uRGVmLnBhcmFtcy5ncm91cEZvcm1hdHRlclN1ZmZpeCA6ICcnO1xyXG5cclxuICBpZiAodmFsICE9IG51bGwpIHtcclxuICAgIHJldHVybiBwcmVmaXggKyBNYXRoLnJvdW5kKHZhbCkgKyBzdWZmaXg7XHJcbiAgfVxyXG4gIHJldHVybiAnJztcclxufTtcclxuIl19