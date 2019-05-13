/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Takes a boolean value, cast it to upperCase string and finally translates it with the "ngx-translate" service
 * @type {?}
 */
export const translateBooleanFormatter = (/**
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
    return value ? translate.instant((/** @type {?} */ (value.toUpperCase()))) : '';
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlQm9vbGVhbkZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy90cmFuc2xhdGVCb29sZWFuRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0EsTUFBTSxPQUFPLHlCQUF5Qjs7Ozs7Ozs7O0FBQWMsQ0FBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFpQixFQUFFLFdBQWdCLEVBQUUsSUFBUyxFQUFFLEVBQUU7O1VBQ3RJLFdBQVcsR0FBRyxDQUFDLElBQUksSUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTs7VUFDdEYsU0FBUyxHQUFHLFdBQVcsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUU5RixJQUFJLENBQUMsU0FBUyxJQUFJLE9BQU8sU0FBUyxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7UUFDekQsTUFBTSxJQUFJLEtBQUssQ0FBQztvRkFDZ0UsQ0FBQyxDQUFDO0tBQ25GO0lBRUQscUZBQXFGO0lBQ3JGLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUN0RSxLQUFLLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztLQUNwQjtJQUNELE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLG1CQUFBLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN2RSxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4sIEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcblxuLyoqIFRha2VzIGEgYm9vbGVhbiB2YWx1ZSwgY2FzdCBpdCB0byB1cHBlckNhc2Ugc3RyaW5nIGFuZCBmaW5hbGx5IHRyYW5zbGF0ZXMgaXQgd2l0aCB0aGUgXCJuZ3gtdHJhbnNsYXRlXCIgc2VydmljZSAqL1xuZXhwb3J0IGNvbnN0IHRyYW5zbGF0ZUJvb2xlYW5Gb3JtYXR0ZXI6IEZvcm1hdHRlciA9IChyb3c6IG51bWJlciwgY2VsbDogbnVtYmVyLCB2YWx1ZTogYW55LCBjb2x1bW5EZWY6IENvbHVtbiwgZGF0YUNvbnRleHQ6IGFueSwgZ3JpZDogYW55KSA9PiB7XG4gIGNvbnN0IGdyaWRPcHRpb25zID0gKGdyaWQgJiYgdHlwZW9mIGdyaWQuZ2V0T3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykgPyBncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xuICBjb25zdCB0cmFuc2xhdGUgPSBncmlkT3B0aW9ucy5pMThuIHx8IChjb2x1bW5EZWYgJiYgY29sdW1uRGVmLnBhcmFtcyAmJiBjb2x1bW5EZWYucGFyYW1zLmkxOG4pO1xuXG4gIGlmICghdHJhbnNsYXRlIHx8IHR5cGVvZiB0cmFuc2xhdGUuaW5zdGFudCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHRyYW5zbGF0ZSBmb3JtYXR0ZXIgcmVxdWlyZXMgdGhlIFwibmd4LXRyYW5zbGF0ZVwiIFNlcnZpY2UgdG8gYmUgcHJvdmlkZWQgYXMgYSBHcmlkIE9wdGlvbnMgb3IgQ29sdW1uIERlZmluaXRpb24gXCJpMThuXCIuXG4gICAgRm9yIGV4YW1wbGU6IHRoaXMuZ3JpZE9wdGlvbnMgPSB7IGVuYWJsZVRyYW5zbGF0ZTogdHJ1ZSwgaTE4bjogdGhpcy50cmFuc2xhdGUgfWApO1xuICB9XG5cbiAgLy8gbWFrZSBzdXJlIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyAoZm9yIGV4YW1wbGUgYSBib29sZWFuIHZhbHVlIHdvdWxkIHRocm93IGFuIGVycm9yKVxuICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgdmFsdWUgPSB2YWx1ZSArICcnO1xuICB9XG4gIHJldHVybiB2YWx1ZSA/IHRyYW5zbGF0ZS5pbnN0YW50KHZhbHVlLnRvVXBwZXJDYXNlKCkgYXMgc3RyaW5nKSA6ICcnO1xufTtcbiJdfQ==