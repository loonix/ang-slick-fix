/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var progressBarFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} value
 * @param {?} columnDef
 * @param {?} dataContext
 * @return {?}
 */
function (row, cell, value, columnDef, dataContext) {
    /** @type {?} */
    var isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
    if (!isNumber) {
        return '';
    }
    /** @type {?} */
    var color = '';
    /** @type {?} */
    var inputNumber = parseFloat(value);
    if (inputNumber > 100) {
        inputNumber = 100;
    }
    if (inputNumber < 30) {
        color = 'danger';
    }
    else if (inputNumber < 70) {
        color = 'warning';
    }
    else {
        color = 'success';
    }
    /** @type {?} */
    var output = "<div class=\"progress\">\n    <div class=\"progress-bar progress-bar-" + color + " bg-" + color + "\" role=\"progressbar\" aria-valuenow=\"" + inputNumber + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"min-width: 2em; width: " + inputNumber + "%;\">\n    " + inputNumber + "%\n    </div>\n  </div>";
    return output.replace(/\s{2,}/g, ' ').trim();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NCYXJGb3JtYXR0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2Zvcm1hdHRlcnMvcHJvZ3Jlc3NCYXJGb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxNQUFNLEtBQU8sb0JBQW9COzs7Ozs7OztBQUFjLFVBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxLQUFVLEVBQUUsU0FBaUIsRUFBRSxXQUFnQjs7UUFDbEgsUUFBUSxHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNqRyxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2IsT0FBTyxFQUFFLENBQUM7S0FDWDs7UUFFRyxLQUFLLEdBQUcsRUFBRTs7UUFDVixXQUFXLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUNuQyxJQUFJLFdBQVcsR0FBRyxHQUFHLEVBQUU7UUFDckIsV0FBVyxHQUFHLEdBQUcsQ0FBQztLQUNuQjtJQUVELElBQUksV0FBVyxHQUFHLEVBQUUsRUFBRTtRQUNwQixLQUFLLEdBQUcsUUFBUSxDQUFDO0tBQ2xCO1NBQU0sSUFBSSxXQUFXLEdBQUcsRUFBRSxFQUFFO1FBQzNCLEtBQUssR0FBRyxTQUFTLENBQUM7S0FDbkI7U0FBTTtRQUNMLEtBQUssR0FBRyxTQUFTLENBQUM7S0FDbkI7O1FBRUssTUFBTSxHQUFHLDBFQUMyQixLQUFLLFlBQU8sS0FBSyxnREFBdUMsV0FBVyxvRkFBeUUsV0FBVyxtQkFDN0wsV0FBVyw0QkFFUjtJQUVQLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDL0MsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uIH0gZnJvbSAnLi8uLi9tb2RlbHMvY29sdW1uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9mb3JtYXR0ZXIuaW50ZXJmYWNlJztcblxuZXhwb3J0IGNvbnN0IHByb2dyZXNzQmFyRm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBpc051bWJlciA9ICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSAnJykgPyBmYWxzZSA6ICFpc05hTigrdmFsdWUpO1xuICBpZiAoIWlzTnVtYmVyKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgbGV0IGNvbG9yID0gJyc7XG4gIGxldCBpbnB1dE51bWJlciA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICBpZiAoaW5wdXROdW1iZXIgPiAxMDApIHtcbiAgICBpbnB1dE51bWJlciA9IDEwMDtcbiAgfVxuXG4gIGlmIChpbnB1dE51bWJlciA8IDMwKSB7XG4gICAgY29sb3IgPSAnZGFuZ2VyJztcbiAgfSBlbHNlIGlmIChpbnB1dE51bWJlciA8IDcwKSB7XG4gICAgY29sb3IgPSAnd2FybmluZyc7XG4gIH0gZWxzZSB7XG4gICAgY29sb3IgPSAnc3VjY2Vzcyc7XG4gIH1cblxuICBjb25zdCBvdXRwdXQgPSBgPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+XG4gICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItJHtjb2xvcn0gYmctJHtjb2xvcn1cIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBhcmlhLXZhbHVlbm93PVwiJHtpbnB1dE51bWJlcn1cIiBhcmlhLXZhbHVlbWluPVwiMFwiIGFyaWEtdmFsdWVtYXg9XCIxMDBcIiBzdHlsZT1cIm1pbi13aWR0aDogMmVtOyB3aWR0aDogJHtpbnB1dE51bWJlcn0lO1wiPlxuICAgICR7aW5wdXROdW1iZXJ9JVxuICAgIDwvZGl2PlxuICA8L2Rpdj5gO1xuXG4gIHJldHVybiBvdXRwdXQucmVwbGFjZSgvXFxzezIsfS9nLCAnICcpLnRyaW0oKTtcbn07XG4iXX0=