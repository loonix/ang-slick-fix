/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Takes a cell value and translates it with the "ngx-translate" service
 * @type {?}
 */
export var translateFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} value
 * @param {?} columnDef
 * @param {?} dataContext
 * @param {?} grid
 * @return {?}
 */
function (row, cell, value, columnDef, dataContext, grid) {
    /** @type {?} */
    var gridOptions = (grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {};
    /** @type {?} */
    var translate = gridOptions.i18n || (columnDef && columnDef.params && columnDef.params.i18n);
    if (!translate || typeof translate.instant !== 'function') {
        throw new Error("The translate formatter requires the \"ngx-translate\" Service to be provided as a Grid Options or Column Definition \"i18n\".\n    For example: this.gridOptions = { enableTranslate: true, i18n: this.translate }");
    }
    // make sure the value is a string (for example a boolean value would throw an error)
    if (value !== undefined && value !== null && typeof value !== 'string') {
        value = value + '';
    }
    return value ? translate.instant(value) : '';
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL3RyYW5zbGF0ZUZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUdBLE1BQU0sS0FBTyxrQkFBa0I7Ozs7Ozs7OztBQUFjLFVBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxLQUFVLEVBQUUsU0FBaUIsRUFBRSxXQUFnQixFQUFFLElBQVM7O1FBQzNILFdBQVcsR0FBRyxDQUFDLElBQUksSUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTs7UUFDdEYsU0FBUyxHQUFHLFdBQVcsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUU5RixJQUFJLENBQUMsU0FBUyxJQUFJLE9BQU8sU0FBUyxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7UUFDekQsTUFBTSxJQUFJLEtBQUssQ0FBQyxxTkFDZ0UsQ0FBQyxDQUFDO0tBQ25GO0lBRUQscUZBQXFGO0lBQ3JGLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUN0RSxLQUFLLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztLQUNwQjtJQUVELE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDL0MsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5cbi8qKiBUYWtlcyBhIGNlbGwgdmFsdWUgYW5kIHRyYW5zbGF0ZXMgaXQgd2l0aCB0aGUgXCJuZ3gtdHJhbnNsYXRlXCIgc2VydmljZSAqL1xuZXhwb3J0IGNvbnN0IHRyYW5zbGF0ZUZvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIHZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55LCBncmlkOiBhbnkpID0+IHtcbiAgY29uc3QgZ3JpZE9wdGlvbnMgPSAoZ3JpZCAmJiB0eXBlb2YgZ3JpZC5nZXRPcHRpb25zID09PSAnZnVuY3Rpb24nKSA/IGdyaWQuZ2V0T3B0aW9ucygpIDoge307XG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGdyaWRPcHRpb25zLmkxOG4gfHwgKGNvbHVtbkRlZiAmJiBjb2x1bW5EZWYucGFyYW1zICYmIGNvbHVtbkRlZi5wYXJhbXMuaTE4bik7XG5cbiAgaWYgKCF0cmFuc2xhdGUgfHwgdHlwZW9mIHRyYW5zbGF0ZS5pbnN0YW50ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgdHJhbnNsYXRlIGZvcm1hdHRlciByZXF1aXJlcyB0aGUgXCJuZ3gtdHJhbnNsYXRlXCIgU2VydmljZSB0byBiZSBwcm92aWRlZCBhcyBhIEdyaWQgT3B0aW9ucyBvciBDb2x1bW4gRGVmaW5pdGlvbiBcImkxOG5cIi5cbiAgICBGb3IgZXhhbXBsZTogdGhpcy5ncmlkT3B0aW9ucyA9IHsgZW5hYmxlVHJhbnNsYXRlOiB0cnVlLCBpMThuOiB0aGlzLnRyYW5zbGF0ZSB9YCk7XG4gIH1cblxuICAvLyBtYWtlIHN1cmUgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIChmb3IgZXhhbXBsZSBhIGJvb2xlYW4gdmFsdWUgd291bGQgdGhyb3cgYW4gZXJyb3IpXG4gIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICB2YWx1ZSA9IHZhbHVlICsgJyc7XG4gIH1cblxuICByZXR1cm4gdmFsdWUgPyB0cmFuc2xhdGUuaW5zdGFudCh2YWx1ZSkgOiAnJztcbn07XG4iXX0=