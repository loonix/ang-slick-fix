/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { arrayToCsvFormatter } from './arrayToCsvFormatter';
import { findOrDefault } from '../services/utilities';
/**
 * A formatter to show the label property value of a params collection
 * @type {?}
 */
export var collectionFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} value
 * @param {?} columnDef
 * @param {?} dataContext
 * @return {?}
 */
function (row, cell, value, columnDef, dataContext) {
    if (!value || !columnDef || !columnDef.params || !columnDef.params.collection
        || !columnDef.params.collection.length) {
        return value;
    }
    var params = columnDef.params, collection = columnDef.params.collection;
    /** @type {?} */
    var labelName = (params.customStructure) ? params.customStructure.label : 'label';
    /** @type {?} */
    var valueName = (params.customStructure) ? params.customStructure.value : 'value';
    if (Array.isArray(value)) {
        return arrayToCsvFormatter(row, cell, value.map((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return findOrDefault(collection, (/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c[valueName] === v; }))[labelName]; })), columnDef, dataContext);
    }
    return findOrDefault(collection, (/**
     * @param {?} c
     * @return {?}
     */
    function (c) { return c[valueName] === value; }))[labelName] || '';
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbkZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9jb2xsZWN0aW9uRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBS3RELE1BQU0sS0FBTyxtQkFBbUI7Ozs7Ozs7O0FBQWMsVUFBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFpQixFQUFFLFdBQWdCO0lBQ3ZILElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO1dBQ3hFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO1FBQ3hDLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFTyxJQUFBLHlCQUFNLEVBQVksd0NBQVU7O1FBQzlCLFNBQVMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU87O1FBQzdFLFNBQVMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU87SUFFbkYsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3hCLE9BQU8sbUJBQW1CLENBQUMsR0FBRyxFQUM1QixJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFDLENBQU0sSUFBSyxPQUFBLGFBQWEsQ0FBQyxVQUFVOzs7O1FBQUUsVUFBQyxDQUFNLElBQUssT0FBQSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFsQixDQUFrQixFQUFDLENBQUMsU0FBUyxDQUFDLEVBQXBFLENBQW9FLEVBQUMsRUFDM0YsU0FBUyxFQUNULFdBQVcsQ0FBQyxDQUFDO0tBQ2hCO0lBRUQsT0FBTyxhQUFhLENBQUMsVUFBVTs7OztJQUFFLFVBQUMsQ0FBTSxJQUFLLE9BQUEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEtBQUssRUFBdEIsQ0FBc0IsRUFBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN4RixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhcnJheVRvQ3N2Rm9ybWF0dGVyIH0gZnJvbSAnLi9hcnJheVRvQ3N2Rm9ybWF0dGVyJztcclxuaW1wb3J0IHsgQ29sdW1uLCBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IGZpbmRPckRlZmF1bHQgfSBmcm9tICcuLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5cclxuLyoqXHJcbiAqIEEgZm9ybWF0dGVyIHRvIHNob3cgdGhlIGxhYmVsIHByb3BlcnR5IHZhbHVlIG9mIGEgcGFyYW1zIGNvbGxlY3Rpb25cclxuICovXHJcbmV4cG9ydCBjb25zdCBjb2xsZWN0aW9uRm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpID0+IHtcclxuICBpZiAoIXZhbHVlIHx8ICFjb2x1bW5EZWYgfHwgIWNvbHVtbkRlZi5wYXJhbXMgfHwgIWNvbHVtbkRlZi5wYXJhbXMuY29sbGVjdGlvblxyXG4gICAgfHwgIWNvbHVtbkRlZi5wYXJhbXMuY29sbGVjdGlvbi5sZW5ndGgpIHtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgcGFyYW1zLCBwYXJhbXM6IHsgY29sbGVjdGlvbiB9IH0gPSBjb2x1bW5EZWY7XHJcbiAgY29uc3QgbGFiZWxOYW1lID0gKHBhcmFtcy5jdXN0b21TdHJ1Y3R1cmUpID8gcGFyYW1zLmN1c3RvbVN0cnVjdHVyZS5sYWJlbCA6ICdsYWJlbCc7XHJcbiAgY29uc3QgdmFsdWVOYW1lID0gKHBhcmFtcy5jdXN0b21TdHJ1Y3R1cmUpID8gcGFyYW1zLmN1c3RvbVN0cnVjdHVyZS52YWx1ZSA6ICd2YWx1ZSc7XHJcblxyXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgcmV0dXJuIGFycmF5VG9Dc3ZGb3JtYXR0ZXIocm93LFxyXG4gICAgICBjZWxsLFxyXG4gICAgICB2YWx1ZS5tYXAoKHY6IGFueSkgPT4gZmluZE9yRGVmYXVsdChjb2xsZWN0aW9uLCAoYzogYW55KSA9PiBjW3ZhbHVlTmFtZV0gPT09IHYpW2xhYmVsTmFtZV0pLFxyXG4gICAgICBjb2x1bW5EZWYsXHJcbiAgICAgIGRhdGFDb250ZXh0KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBmaW5kT3JEZWZhdWx0KGNvbGxlY3Rpb24sIChjOiBhbnkpID0+IGNbdmFsdWVOYW1lXSA9PT0gdmFsdWUpW2xhYmVsTmFtZV0gfHwgJyc7XHJcbn07XHJcbiJdfQ==