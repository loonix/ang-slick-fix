/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var arrayToCsvFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} value
 * @param {?} columnDef
 * @param {?} dataContext
 * @return {?}
 */
function (row, cell, value, columnDef, dataContext) {
    if (value && Array.isArray(value) && value.length > 0) {
        /** @type {?} */
        var values = value.join(', ');
        return "<span title=\"" + values + "\">" + values + "</span>";
    }
    return value;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlUb0NzdkZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9hcnJheVRvQ3N2Rm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsTUFBTSxLQUFPLG1CQUFtQjs7Ozs7Ozs7QUFBYyxVQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsV0FBZ0I7SUFDdkgsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7WUFDL0MsTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQy9CLE9BQU8sbUJBQWdCLE1BQU0sV0FBSyxNQUFNLFlBQVMsQ0FBQztLQUNuRDtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uIH0gZnJvbSAnLi8uLi9tb2RlbHMvY29sdW1uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9mb3JtYXR0ZXIuaW50ZXJmYWNlJztcblxuZXhwb3J0IGNvbnN0IGFycmF5VG9Dc3ZGb3JtYXR0ZXI6IEZvcm1hdHRlciA9IChyb3c6IG51bWJlciwgY2VsbDogbnVtYmVyLCB2YWx1ZTogYW55LCBjb2x1bW5EZWY6IENvbHVtbiwgZGF0YUNvbnRleHQ6IGFueSkgPT4ge1xuICBpZiAodmFsdWUgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHZhbHVlcyA9IHZhbHVlLmpvaW4oJywgJyk7XG4gICAgcmV0dXJuIGA8c3BhbiB0aXRsZT1cIiR7dmFsdWVzfVwiPiR7dmFsdWVzfTwvc3Bhbj5gO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG4iXX0=