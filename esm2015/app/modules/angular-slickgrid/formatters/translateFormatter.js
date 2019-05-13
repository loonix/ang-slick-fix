/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Takes a cell value and translates it with the "ngx-translate" service
 * @type {?}
 */
export const translateFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} value
 * @param {?} columnDef
 * @param {?} dataContext
 * @param {?} grid
 * @return {?}
 */
(row, cell, value, columnDef, dataContext, grid) => {
    /** @type {?} */
    const gridOptions = (grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {};
    /** @type {?} */
    const translate = gridOptions.i18n || (columnDef && columnDef.params && columnDef.params.i18n);
    if (!translate || typeof translate.instant !== 'function') {
        throw new Error(`The translate formatter requires the "ngx-translate" Service to be provided as a Grid Options or Column Definition "i18n".
    For example: this.gridOptions = { enableTranslate: true, i18n: this.translate }`);
    }
    // make sure the value is a string (for example a boolean value would throw an error)
    if (value !== undefined && value !== null && typeof value !== 'string') {
        value = value + '';
    }
    return value ? translate.instant(value) : '';
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL3RyYW5zbGF0ZUZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUdBLE1BQU0sT0FBTyxrQkFBa0I7Ozs7Ozs7OztBQUFjLENBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxLQUFVLEVBQUUsU0FBaUIsRUFBRSxXQUFnQixFQUFFLElBQVMsRUFBRSxFQUFFOztVQUMvSCxXQUFXLEdBQUcsQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7O1VBQ3RGLFNBQVMsR0FBRyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFFOUYsSUFBSSxDQUFDLFNBQVMsSUFBSSxPQUFPLFNBQVMsQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO1FBQ3pELE1BQU0sSUFBSSxLQUFLLENBQUM7b0ZBQ2dFLENBQUMsQ0FBQztLQUNuRjtJQUVELHFGQUFxRjtJQUNyRixJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDdEUsS0FBSyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUM7S0FDcEI7SUFFRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQy9DLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgRm9ybWF0dGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuXG4vKiogVGFrZXMgYSBjZWxsIHZhbHVlIGFuZCB0cmFuc2xhdGVzIGl0IHdpdGggdGhlIFwibmd4LXRyYW5zbGF0ZVwiIHNlcnZpY2UgKi9cbmV4cG9ydCBjb25zdCB0cmFuc2xhdGVGb3JtYXR0ZXI6IEZvcm1hdHRlciA9IChyb3c6IG51bWJlciwgY2VsbDogbnVtYmVyLCB2YWx1ZTogYW55LCBjb2x1bW5EZWY6IENvbHVtbiwgZGF0YUNvbnRleHQ6IGFueSwgZ3JpZDogYW55KSA9PiB7XG4gIGNvbnN0IGdyaWRPcHRpb25zID0gKGdyaWQgJiYgdHlwZW9mIGdyaWQuZ2V0T3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykgPyBncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xuICBjb25zdCB0cmFuc2xhdGUgPSBncmlkT3B0aW9ucy5pMThuIHx8IChjb2x1bW5EZWYgJiYgY29sdW1uRGVmLnBhcmFtcyAmJiBjb2x1bW5EZWYucGFyYW1zLmkxOG4pO1xuXG4gIGlmICghdHJhbnNsYXRlIHx8IHR5cGVvZiB0cmFuc2xhdGUuaW5zdGFudCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHRyYW5zbGF0ZSBmb3JtYXR0ZXIgcmVxdWlyZXMgdGhlIFwibmd4LXRyYW5zbGF0ZVwiIFNlcnZpY2UgdG8gYmUgcHJvdmlkZWQgYXMgYSBHcmlkIE9wdGlvbnMgb3IgQ29sdW1uIERlZmluaXRpb24gXCJpMThuXCIuXG4gICAgRm9yIGV4YW1wbGU6IHRoaXMuZ3JpZE9wdGlvbnMgPSB7IGVuYWJsZVRyYW5zbGF0ZTogdHJ1ZSwgaTE4bjogdGhpcy50cmFuc2xhdGUgfWApO1xuICB9XG5cbiAgLy8gbWFrZSBzdXJlIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyAoZm9yIGV4YW1wbGUgYSBib29sZWFuIHZhbHVlIHdvdWxkIHRocm93IGFuIGVycm9yKVxuICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgdmFsdWUgPSB2YWx1ZSArICcnO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlID8gdHJhbnNsYXRlLmluc3RhbnQodmFsdWUpIDogJyc7XG59O1xuIl19