/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { decimalFormatted } from './../services/utilities';
/** @type {?} */
export var decimalFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} value
 * @param {?} columnDef
 * @param {?} dataContext
 * @return {?}
 */
function (row, cell, value, columnDef, dataContext) {
    /** @type {?} */
    var params = columnDef.params || {};
    /** @type {?} */
    var minDecimalPlaces = (params.minDecimal !== null && params.minDecimal) || (params.minDecimalPlaces !== null && params.minDecimalPlaces) || (params.decimalPlaces !== null && params.decimalPlaces) || 2;
    /** @type {?} */
    var maxDecimalPlaces = (params.maxDecimal !== null && params.maxDecimal) || (params.maxDecimalPlaces !== null && params.maxDecimalPlaces) || 2;
    /** @type {?} */
    var isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
    return !isNumber ? value : "" + decimalFormatted(value, minDecimalPlaces, maxDecimalPlaces);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjaW1hbEZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9kZWNpbWFsRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFFM0QsTUFBTSxLQUFPLGdCQUFnQjs7Ozs7Ozs7QUFBYyxVQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsV0FBZ0I7O1FBQzlHLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUU7O1FBQy9CLGdCQUFnQixHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxJQUFJLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixLQUFLLElBQUksSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEtBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOztRQUNyTSxnQkFBZ0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLElBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQzs7UUFDMUksUUFBUSxHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUVqRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUcsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixDQUFHLENBQUM7QUFDOUYsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBkZWNpbWFsRm9ybWF0dGVkIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xuXG5leHBvcnQgY29uc3QgZGVjaW1hbEZvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIHZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55KSA9PiB7XG4gIGNvbnN0IHBhcmFtcyA9IGNvbHVtbkRlZi5wYXJhbXMgfHwge307XG4gIGNvbnN0IG1pbkRlY2ltYWxQbGFjZXMgPSAocGFyYW1zLm1pbkRlY2ltYWwgIT09IG51bGwgJiYgcGFyYW1zLm1pbkRlY2ltYWwpIHx8IChwYXJhbXMubWluRGVjaW1hbFBsYWNlcyAhPT0gbnVsbCAmJiBwYXJhbXMubWluRGVjaW1hbFBsYWNlcykgfHwgKHBhcmFtcy5kZWNpbWFsUGxhY2VzICE9PSBudWxsICYmIHBhcmFtcy5kZWNpbWFsUGxhY2VzKSB8fCAyO1xuICBjb25zdCBtYXhEZWNpbWFsUGxhY2VzID0gKHBhcmFtcy5tYXhEZWNpbWFsICE9PSBudWxsICYmIHBhcmFtcy5tYXhEZWNpbWFsKSB8fCAocGFyYW1zLm1heERlY2ltYWxQbGFjZXMgIT09IG51bGwgJiYgcGFyYW1zLm1heERlY2ltYWxQbGFjZXMpIHx8IDI7XG4gIGNvbnN0IGlzTnVtYmVyID0gKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09ICcnKSA/IGZhbHNlIDogIWlzTmFOKCt2YWx1ZSk7XG5cbiAgcmV0dXJuICFpc051bWJlciA/IHZhbHVlIDogYCR7ZGVjaW1hbEZvcm1hdHRlZCh2YWx1ZSwgbWluRGVjaW1hbFBsYWNlcywgbWF4RGVjaW1hbFBsYWNlcyl9YDtcbn07XG5cbiJdfQ==