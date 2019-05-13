/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Takes a boolean value, cast it to upperCase string and finally translates it with the "ngx-translate" service
 * @type {?}
 */
export var translateBooleanFormatter = (/**
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
    return value ? translate.instant((/** @type {?} */ (value.toUpperCase()))) : '';
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlQm9vbGVhbkZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy90cmFuc2xhdGVCb29sZWFuRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0EsTUFBTSxLQUFPLHlCQUF5Qjs7Ozs7Ozs7O0FBQWMsVUFBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFpQixFQUFFLFdBQWdCLEVBQUUsSUFBUzs7UUFDbEksV0FBVyxHQUFHLENBQUMsSUFBSSxJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFOztRQUN0RixTQUFTLEdBQUcsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBRTlGLElBQUksQ0FBQyxTQUFTLElBQUksT0FBTyxTQUFTLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtRQUN6RCxNQUFNLElBQUksS0FBSyxDQUFDLHFOQUNnRSxDQUFDLENBQUM7S0FDbkY7SUFFRCxxRkFBcUY7SUFDckYsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ3RFLEtBQUssR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDO0tBQ3BCO0lBQ0QsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsbUJBQUEsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3ZFLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgRm9ybWF0dGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuXG4vKiogVGFrZXMgYSBib29sZWFuIHZhbHVlLCBjYXN0IGl0IHRvIHVwcGVyQ2FzZSBzdHJpbmcgYW5kIGZpbmFsbHkgdHJhbnNsYXRlcyBpdCB3aXRoIHRoZSBcIm5neC10cmFuc2xhdGVcIiBzZXJ2aWNlICovXG5leHBvcnQgY29uc3QgdHJhbnNsYXRlQm9vbGVhbkZvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIHZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55LCBncmlkOiBhbnkpID0+IHtcbiAgY29uc3QgZ3JpZE9wdGlvbnMgPSAoZ3JpZCAmJiB0eXBlb2YgZ3JpZC5nZXRPcHRpb25zID09PSAnZnVuY3Rpb24nKSA/IGdyaWQuZ2V0T3B0aW9ucygpIDoge307XG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGdyaWRPcHRpb25zLmkxOG4gfHwgKGNvbHVtbkRlZiAmJiBjb2x1bW5EZWYucGFyYW1zICYmIGNvbHVtbkRlZi5wYXJhbXMuaTE4bik7XG5cbiAgaWYgKCF0cmFuc2xhdGUgfHwgdHlwZW9mIHRyYW5zbGF0ZS5pbnN0YW50ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgdHJhbnNsYXRlIGZvcm1hdHRlciByZXF1aXJlcyB0aGUgXCJuZ3gtdHJhbnNsYXRlXCIgU2VydmljZSB0byBiZSBwcm92aWRlZCBhcyBhIEdyaWQgT3B0aW9ucyBvciBDb2x1bW4gRGVmaW5pdGlvbiBcImkxOG5cIi5cbiAgICBGb3IgZXhhbXBsZTogdGhpcy5ncmlkT3B0aW9ucyA9IHsgZW5hYmxlVHJhbnNsYXRlOiB0cnVlLCBpMThuOiB0aGlzLnRyYW5zbGF0ZSB9YCk7XG4gIH1cblxuICAvLyBtYWtlIHN1cmUgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIChmb3IgZXhhbXBsZSBhIGJvb2xlYW4gdmFsdWUgd291bGQgdGhyb3cgYW4gZXJyb3IpXG4gIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICB2YWx1ZSA9IHZhbHVlICsgJyc7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID8gdHJhbnNsYXRlLmluc3RhbnQodmFsdWUudG9VcHBlckNhc2UoKSBhcyBzdHJpbmcpIDogJyc7XG59O1xuIl19