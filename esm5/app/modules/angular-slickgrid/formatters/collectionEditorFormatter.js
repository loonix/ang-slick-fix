/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { arrayToCsvFormatter } from './arrayToCsvFormatter';
import { findOrDefault } from '../services/utilities';
/**
 * A formatter to show the label property value of an editor collection
 * @type {?}
 */
export var collectionEditorFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} value
 * @param {?} columnDef
 * @param {?} dataContext
 * @return {?}
 */
function (row, cell, value, columnDef, dataContext) {
    if (!value || !columnDef || !columnDef.internalColumnEditor || !columnDef.internalColumnEditor.collection
        || !columnDef.internalColumnEditor.collection.length) {
        return value;
    }
    var internalColumnEditor = columnDef.internalColumnEditor, collection = columnDef.internalColumnEditor.collection;
    /** @type {?} */
    var labelName = (internalColumnEditor.customStructure) ? internalColumnEditor.customStructure.label : 'label';
    /** @type {?} */
    var valueName = (internalColumnEditor.customStructure) ? internalColumnEditor.customStructure.value : 'value';
    if (Array.isArray(value)) {
        if (collection.every((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return typeof x === 'string'; }))) {
            return arrayToCsvFormatter(row, cell, value.map((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return findOrDefault(collection, (/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c === v; })); })), columnDef, dataContext);
        }
        else {
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
    }
    return findOrDefault(collection, (/**
     * @param {?} c
     * @return {?}
     */
    function (c) { return c[valueName] === value; }))[labelName] || '';
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbkVkaXRvckZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9jb2xsZWN0aW9uRWRpdG9yRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBS3RELE1BQU0sS0FBTyx5QkFBeUI7Ozs7Ozs7O0FBQWMsVUFBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFpQixFQUFFLFdBQWdCO0lBQzdILElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsVUFBVTtXQUNwRyxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO1FBQ3RELE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFTyxJQUFBLHFEQUFvQixFQUEwQixzREFBVTs7UUFDMUQsU0FBUyxHQUFHLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU87O1FBQ3pHLFNBQVMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPO0lBRS9HLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN4QixJQUFJLFVBQVUsQ0FBQyxLQUFLOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQXJCLENBQXFCLEVBQUMsRUFBRTtZQUNoRCxPQUFPLG1CQUFtQixDQUFDLEdBQUcsRUFDNUIsSUFBSSxFQUNKLEtBQUssQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQyxDQUFNLElBQUssT0FBQSxhQUFhLENBQUMsVUFBVTs7OztZQUFFLFVBQUMsQ0FBTSxJQUFLLE9BQUEsQ0FBQyxLQUFLLENBQUMsRUFBUCxDQUFPLEVBQUMsRUFBOUMsQ0FBOEMsRUFBQyxFQUNyRSxTQUFTLEVBQ1QsV0FBVyxDQUFDLENBQUM7U0FDaEI7YUFBTTtZQUNMLE9BQU8sbUJBQW1CLENBQUMsR0FBRyxFQUM1QixJQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUc7Ozs7WUFBQyxVQUFDLENBQU0sSUFBSyxPQUFBLGFBQWEsQ0FBQyxVQUFVOzs7O1lBQUUsVUFBQyxDQUFNLElBQUssT0FBQSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFsQixDQUFrQixFQUFDLENBQUMsU0FBUyxDQUFDLEVBQXBFLENBQW9FLEVBQUMsRUFDM0YsU0FBUyxFQUNULFdBQVcsQ0FBQyxDQUFDO1NBQ2hCO0tBQ0Y7SUFFRCxPQUFPLGFBQWEsQ0FBQyxVQUFVOzs7O0lBQUUsVUFBQyxDQUFNLElBQUssT0FBQSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSyxFQUF0QixDQUFzQixFQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3hGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFycmF5VG9Dc3ZGb3JtYXR0ZXIgfSBmcm9tICcuL2FycmF5VG9Dc3ZGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBDb2x1bW4sIEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgZmluZE9yRGVmYXVsdCB9IGZyb20gJy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XHJcblxyXG4vKipcclxuICogQSBmb3JtYXR0ZXIgdG8gc2hvdyB0aGUgbGFiZWwgcHJvcGVydHkgdmFsdWUgb2YgYW4gZWRpdG9yIGNvbGxlY3Rpb25cclxuICovXHJcbmV4cG9ydCBjb25zdCBjb2xsZWN0aW9uRWRpdG9yRm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpID0+IHtcclxuICBpZiAoIXZhbHVlIHx8ICFjb2x1bW5EZWYgfHwgIWNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciB8fCAhY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yLmNvbGxlY3Rpb25cclxuICAgIHx8ICFjb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IuY29sbGVjdGlvbi5sZW5ndGgpIHtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgaW50ZXJuYWxDb2x1bW5FZGl0b3IsIGludGVybmFsQ29sdW1uRWRpdG9yOiB7IGNvbGxlY3Rpb24gfSB9ID0gY29sdW1uRGVmO1xyXG4gIGNvbnN0IGxhYmVsTmFtZSA9IChpbnRlcm5hbENvbHVtbkVkaXRvci5jdXN0b21TdHJ1Y3R1cmUpID8gaW50ZXJuYWxDb2x1bW5FZGl0b3IuY3VzdG9tU3RydWN0dXJlLmxhYmVsIDogJ2xhYmVsJztcclxuICBjb25zdCB2YWx1ZU5hbWUgPSAoaW50ZXJuYWxDb2x1bW5FZGl0b3IuY3VzdG9tU3RydWN0dXJlKSA/IGludGVybmFsQ29sdW1uRWRpdG9yLmN1c3RvbVN0cnVjdHVyZS52YWx1ZSA6ICd2YWx1ZSc7XHJcblxyXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgaWYgKGNvbGxlY3Rpb24uZXZlcnkoeCA9PiB0eXBlb2YgeCA9PT0gJ3N0cmluZycpKSB7XHJcbiAgICAgIHJldHVybiBhcnJheVRvQ3N2Rm9ybWF0dGVyKHJvdyxcclxuICAgICAgICBjZWxsLFxyXG4gICAgICAgIHZhbHVlLm1hcCgodjogYW55KSA9PiBmaW5kT3JEZWZhdWx0KGNvbGxlY3Rpb24sIChjOiBhbnkpID0+IGMgPT09IHYpKSxcclxuICAgICAgICBjb2x1bW5EZWYsXHJcbiAgICAgICAgZGF0YUNvbnRleHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGFycmF5VG9Dc3ZGb3JtYXR0ZXIocm93LFxyXG4gICAgICAgIGNlbGwsXHJcbiAgICAgICAgdmFsdWUubWFwKCh2OiBhbnkpID0+IGZpbmRPckRlZmF1bHQoY29sbGVjdGlvbiwgKGM6IGFueSkgPT4gY1t2YWx1ZU5hbWVdID09PSB2KVtsYWJlbE5hbWVdKSxcclxuICAgICAgICBjb2x1bW5EZWYsXHJcbiAgICAgICAgZGF0YUNvbnRleHQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZpbmRPckRlZmF1bHQoY29sbGVjdGlvbiwgKGM6IGFueSkgPT4gY1t2YWx1ZU5hbWVdID09PSB2YWx1ZSlbbGFiZWxOYW1lXSB8fCAnJztcclxufTtcclxuIl19