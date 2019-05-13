/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const complexObjectFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} cellValue
 * @param {?} columnDef
 * @param {?} dataContext
 * @return {?}
 */
(row, cell, cellValue, columnDef, dataContext) => {
    if (!columnDef) {
        return '';
    }
    /** @type {?} */
    const columnParams = columnDef.params || {};
    /** @type {?} */
    const complexFieldLabel = columnParams && columnParams.complexFieldLabel || columnDef.field;
    if (!complexFieldLabel) {
        throw new Error(`For the Formatters.complexObject to work properly, you need to tell it which property of the complex object to use.
      There are 3 ways to provide it:
      1- via the generic "params" with a "complexFieldLabel" property on your Column Definition, example: this.columnDefs = [{ id: 'user', field: 'user', params: { complexFieldLabel: 'user.firstName' } }]
      2- via the generic "params" with a "complexFieldLabel" and a "labelKey" property on your Column Definition, example: this.columnDefs = [{ id: 'user', field: 'user', labelKey: 'firstName' params: { complexFieldLabel: 'user' } }]
      3- via the field name that includes a dot notation, example: this.columnDefs = [{ id: 'user', field: 'user.firstName'}] `);
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
        (obj, i) => (obj && obj.hasOwnProperty(i) ? obj[i] : cellValue)), dataContext);
    }
    return cellValue;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGxleE9iamVjdEZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9jb21wbGV4T2JqZWN0Rm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7Ozs7QUFBYyxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsU0FBYyxFQUFFLFNBQWlCLEVBQUUsV0FBZ0IsRUFBRSxFQUFFO0lBQ2xJLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYOztVQUVLLFlBQVksR0FBRyxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUU7O1VBQ3JDLGlCQUFpQixHQUFHLFlBQVksSUFBSSxZQUFZLENBQUMsaUJBQWlCLElBQUksU0FBUyxDQUFDLEtBQUs7SUFFM0YsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1FBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUM7Ozs7K0hBSTJHLENBQUMsQ0FBQztLQUM5SDtJQUVELElBQUksU0FBUyxDQUFDLFFBQVEsSUFBSSxXQUFXLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFDdkUsT0FBTyxXQUFXLENBQUMsaUJBQWlCLENBQUMsSUFBSSxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDN0Y7SUFFRCw4R0FBOEc7SUFDOUcsb0hBQW9IO0lBQ3BILElBQUksT0FBTyxpQkFBaUIsS0FBSyxRQUFRLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUMvRSxPQUFPLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNOzs7OztRQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRSxXQUFXLENBQUMsQ0FBQztLQUMxSDtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiB9IGZyb20gJy4vLi4vbW9kZWxzL2NvbHVtbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRm9ybWF0dGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvZm9ybWF0dGVyLmludGVyZmFjZSc7XG5cbmV4cG9ydCBjb25zdCBjb21wbGV4T2JqZWN0Rm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgY2VsbFZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55KSA9PiB7XG4gIGlmICghY29sdW1uRGVmKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgY29uc3QgY29sdW1uUGFyYW1zID0gY29sdW1uRGVmLnBhcmFtcyB8fCB7fTtcbiAgY29uc3QgY29tcGxleEZpZWxkTGFiZWwgPSBjb2x1bW5QYXJhbXMgJiYgY29sdW1uUGFyYW1zLmNvbXBsZXhGaWVsZExhYmVsIHx8IGNvbHVtbkRlZi5maWVsZDtcblxuICBpZiAoIWNvbXBsZXhGaWVsZExhYmVsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBGb3IgdGhlIEZvcm1hdHRlcnMuY29tcGxleE9iamVjdCB0byB3b3JrIHByb3Blcmx5LCB5b3UgbmVlZCB0byB0ZWxsIGl0IHdoaWNoIHByb3BlcnR5IG9mIHRoZSBjb21wbGV4IG9iamVjdCB0byB1c2UuXG4gICAgICBUaGVyZSBhcmUgMyB3YXlzIHRvIHByb3ZpZGUgaXQ6XG4gICAgICAxLSB2aWEgdGhlIGdlbmVyaWMgXCJwYXJhbXNcIiB3aXRoIGEgXCJjb21wbGV4RmllbGRMYWJlbFwiIHByb3BlcnR5IG9uIHlvdXIgQ29sdW1uIERlZmluaXRpb24sIGV4YW1wbGU6IHRoaXMuY29sdW1uRGVmcyA9IFt7IGlkOiAndXNlcicsIGZpZWxkOiAndXNlcicsIHBhcmFtczogeyBjb21wbGV4RmllbGRMYWJlbDogJ3VzZXIuZmlyc3ROYW1lJyB9IH1dXG4gICAgICAyLSB2aWEgdGhlIGdlbmVyaWMgXCJwYXJhbXNcIiB3aXRoIGEgXCJjb21wbGV4RmllbGRMYWJlbFwiIGFuZCBhIFwibGFiZWxLZXlcIiBwcm9wZXJ0eSBvbiB5b3VyIENvbHVtbiBEZWZpbml0aW9uLCBleGFtcGxlOiB0aGlzLmNvbHVtbkRlZnMgPSBbeyBpZDogJ3VzZXInLCBmaWVsZDogJ3VzZXInLCBsYWJlbEtleTogJ2ZpcnN0TmFtZScgcGFyYW1zOiB7IGNvbXBsZXhGaWVsZExhYmVsOiAndXNlcicgfSB9XVxuICAgICAgMy0gdmlhIHRoZSBmaWVsZCBuYW1lIHRoYXQgaW5jbHVkZXMgYSBkb3Qgbm90YXRpb24sIGV4YW1wbGU6IHRoaXMuY29sdW1uRGVmcyA9IFt7IGlkOiAndXNlcicsIGZpZWxkOiAndXNlci5maXJzdE5hbWUnfV0gYCk7XG4gIH1cblxuICBpZiAoY29sdW1uRGVmLmxhYmVsS2V5ICYmIGRhdGFDb250ZXh0Lmhhc093blByb3BlcnR5KGNvbXBsZXhGaWVsZExhYmVsKSkge1xuICAgIHJldHVybiBkYXRhQ29udGV4dFtjb21wbGV4RmllbGRMYWJlbF0gJiYgZGF0YUNvbnRleHRbY29tcGxleEZpZWxkTGFiZWxdW2NvbHVtbkRlZi5sYWJlbEtleV07XG4gIH1cblxuICAvLyB3aGVuIGNvbXBsZXhGaWVsZExhYmVsIGluY2x1ZGVzIHRoZSBkb3QgXCIuXCIsIHdlIHdpbGwgZG8gdGhlIHNwbGl0IGFuZCBnZXQgdGhlIHZhbHVlIGZyb20gdGhlIGNvbXBsZXggb2JqZWN0XG4gIC8vIGhvd2V2ZXIgd2UgYWxzbyBuZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBjb21wbGV4IG9iamV0IGV4aXN0LCBlbHNlIHdlJ2xsIHJldHVybiB0aGUgY2VsbCB2YWx1ZSAob3JpZ2luYWwgdmFsdWUpXG4gIGlmICh0eXBlb2YgY29tcGxleEZpZWxkTGFiZWwgPT09ICdzdHJpbmcnICYmIGNvbXBsZXhGaWVsZExhYmVsLmluZGV4T2YoJy4nKSA+IDApIHtcbiAgICByZXR1cm4gY29tcGxleEZpZWxkTGFiZWwuc3BsaXQoJy4nKS5yZWR1Y2UoKG9iaiwgaSkgPT4gKG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkoaSkgPyBvYmpbaV0gOiBjZWxsVmFsdWUpLCBkYXRhQ29udGV4dCk7XG4gIH1cbiAgcmV0dXJuIGNlbGxWYWx1ZTtcbn07XG4iXX0=