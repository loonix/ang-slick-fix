/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var complexObjectFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} cellValue
 * @param {?} columnDef
 * @param {?} dataContext
 * @return {?}
 */
function (row, cell, cellValue, columnDef, dataContext) {
    if (!columnDef) {
        return '';
    }
    /** @type {?} */
    var columnParams = columnDef.params || {};
    /** @type {?} */
    var complexFieldLabel = columnParams && columnParams.complexFieldLabel || columnDef.field;
    if (!complexFieldLabel) {
        throw new Error("For the Formatters.complexObject to work properly, you need to tell it which property of the complex object to use.\n      There are 3 ways to provide it:\n      1- via the generic \"params\" with a \"complexFieldLabel\" property on your Column Definition, example: this.columnDefs = [{ id: 'user', field: 'user', params: { complexFieldLabel: 'user.firstName' } }]\n      2- via the generic \"params\" with a \"complexFieldLabel\" and a \"labelKey\" property on your Column Definition, example: this.columnDefs = [{ id: 'user', field: 'user', labelKey: 'firstName' params: { complexFieldLabel: 'user' } }]\n      3- via the field name that includes a dot notation, example: this.columnDefs = [{ id: 'user', field: 'user.firstName'}] ");
    }
    if (columnDef.labelKey && dataContext.hasOwnProperty(complexFieldLabel)) {
        return dataContext[complexFieldLabel] && dataContext[complexFieldLabel][columnDef.labelKey];
    }
    // when complexFieldLabel includes the dot ".", we will do the split and get the value from the complex object
    // however we also need to make sure that the complex objet exist, else we'll return the cell value (original value)
    if (typeof complexFieldLabel === 'string' && complexFieldLabel.indexOf('.') > 0) {
        return complexFieldLabel.split('.').reduce((/**
         * @param {?} obj
         * @param {?} i
         * @return {?}
         */
        function (obj, i) { return (obj && obj.hasOwnProperty(i) ? obj[i] : cellValue); }), dataContext);
    }
    return cellValue;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGxleE9iamVjdEZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9jb21wbGV4T2JqZWN0Rm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsTUFBTSxLQUFPLHNCQUFzQjs7Ozs7Ozs7QUFBYyxVQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsU0FBYyxFQUFFLFNBQWlCLEVBQUUsV0FBZ0I7SUFDOUgsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ1g7O1FBRUssWUFBWSxHQUFHLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRTs7UUFDckMsaUJBQWlCLEdBQUcsWUFBWSxJQUFJLFlBQVksQ0FBQyxpQkFBaUIsSUFBSSxTQUFTLENBQUMsS0FBSztJQUUzRixJQUFJLENBQUMsaUJBQWlCLEVBQUU7UUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQywrdEJBSTJHLENBQUMsQ0FBQztLQUM5SDtJQUVELElBQUksU0FBUyxDQUFDLFFBQVEsSUFBSSxXQUFXLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFDdkUsT0FBTyxXQUFXLENBQUMsaUJBQWlCLENBQUMsSUFBSSxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDN0Y7SUFFRCw4R0FBOEc7SUFDOUcsb0hBQW9IO0lBQ3BILElBQUksT0FBTyxpQkFBaUIsS0FBSyxRQUFRLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUMvRSxPQUFPLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNOzs7OztRQUFDLFVBQUMsR0FBRyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQW5ELENBQW1ELEdBQUUsV0FBVyxDQUFDLENBQUM7S0FDMUg7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4gfSBmcm9tICcuLy4uL21vZGVscy9jb2x1bW4uaW50ZXJmYWNlJztcbmltcG9ydCB7IEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2Zvcm1hdHRlci5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY29uc3QgY29tcGxleE9iamVjdEZvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIGNlbGxWYWx1ZTogYW55LCBjb2x1bW5EZWY6IENvbHVtbiwgZGF0YUNvbnRleHQ6IGFueSkgPT4ge1xuICBpZiAoIWNvbHVtbkRlZikge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGNvbnN0IGNvbHVtblBhcmFtcyA9IGNvbHVtbkRlZi5wYXJhbXMgfHwge307XG4gIGNvbnN0IGNvbXBsZXhGaWVsZExhYmVsID0gY29sdW1uUGFyYW1zICYmIGNvbHVtblBhcmFtcy5jb21wbGV4RmllbGRMYWJlbCB8fCBjb2x1bW5EZWYuZmllbGQ7XG5cbiAgaWYgKCFjb21wbGV4RmllbGRMYWJlbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRm9yIHRoZSBGb3JtYXR0ZXJzLmNvbXBsZXhPYmplY3QgdG8gd29yayBwcm9wZXJseSwgeW91IG5lZWQgdG8gdGVsbCBpdCB3aGljaCBwcm9wZXJ0eSBvZiB0aGUgY29tcGxleCBvYmplY3QgdG8gdXNlLlxuICAgICAgVGhlcmUgYXJlIDMgd2F5cyB0byBwcm92aWRlIGl0OlxuICAgICAgMS0gdmlhIHRoZSBnZW5lcmljIFwicGFyYW1zXCIgd2l0aCBhIFwiY29tcGxleEZpZWxkTGFiZWxcIiBwcm9wZXJ0eSBvbiB5b3VyIENvbHVtbiBEZWZpbml0aW9uLCBleGFtcGxlOiB0aGlzLmNvbHVtbkRlZnMgPSBbeyBpZDogJ3VzZXInLCBmaWVsZDogJ3VzZXInLCBwYXJhbXM6IHsgY29tcGxleEZpZWxkTGFiZWw6ICd1c2VyLmZpcnN0TmFtZScgfSB9XVxuICAgICAgMi0gdmlhIHRoZSBnZW5lcmljIFwicGFyYW1zXCIgd2l0aCBhIFwiY29tcGxleEZpZWxkTGFiZWxcIiBhbmQgYSBcImxhYmVsS2V5XCIgcHJvcGVydHkgb24geW91ciBDb2x1bW4gRGVmaW5pdGlvbiwgZXhhbXBsZTogdGhpcy5jb2x1bW5EZWZzID0gW3sgaWQ6ICd1c2VyJywgZmllbGQ6ICd1c2VyJywgbGFiZWxLZXk6ICdmaXJzdE5hbWUnIHBhcmFtczogeyBjb21wbGV4RmllbGRMYWJlbDogJ3VzZXInIH0gfV1cbiAgICAgIDMtIHZpYSB0aGUgZmllbGQgbmFtZSB0aGF0IGluY2x1ZGVzIGEgZG90IG5vdGF0aW9uLCBleGFtcGxlOiB0aGlzLmNvbHVtbkRlZnMgPSBbeyBpZDogJ3VzZXInLCBmaWVsZDogJ3VzZXIuZmlyc3ROYW1lJ31dIGApO1xuICB9XG5cbiAgaWYgKGNvbHVtbkRlZi5sYWJlbEtleSAmJiBkYXRhQ29udGV4dC5oYXNPd25Qcm9wZXJ0eShjb21wbGV4RmllbGRMYWJlbCkpIHtcbiAgICByZXR1cm4gZGF0YUNvbnRleHRbY29tcGxleEZpZWxkTGFiZWxdICYmIGRhdGFDb250ZXh0W2NvbXBsZXhGaWVsZExhYmVsXVtjb2x1bW5EZWYubGFiZWxLZXldO1xuICB9XG5cbiAgLy8gd2hlbiBjb21wbGV4RmllbGRMYWJlbCBpbmNsdWRlcyB0aGUgZG90IFwiLlwiLCB3ZSB3aWxsIGRvIHRoZSBzcGxpdCBhbmQgZ2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBjb21wbGV4IG9iamVjdFxuICAvLyBob3dldmVyIHdlIGFsc28gbmVlZCB0byBtYWtlIHN1cmUgdGhhdCB0aGUgY29tcGxleCBvYmpldCBleGlzdCwgZWxzZSB3ZSdsbCByZXR1cm4gdGhlIGNlbGwgdmFsdWUgKG9yaWdpbmFsIHZhbHVlKVxuICBpZiAodHlwZW9mIGNvbXBsZXhGaWVsZExhYmVsID09PSAnc3RyaW5nJyAmJiBjb21wbGV4RmllbGRMYWJlbC5pbmRleE9mKCcuJykgPiAwKSB7XG4gICAgcmV0dXJuIGNvbXBsZXhGaWVsZExhYmVsLnNwbGl0KCcuJykucmVkdWNlKChvYmosIGkpID0+IChvYmogJiYgb2JqLmhhc093blByb3BlcnR5KGkpID8gb2JqW2ldIDogY2VsbFZhbHVlKSwgZGF0YUNvbnRleHQpO1xuICB9XG4gIHJldHVybiBjZWxsVmFsdWU7XG59O1xuIl19