/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const numericSorter = (/**
 * @param {?} value1
 * @param {?} value2
 * @param {?} sortDirection
 * @return {?}
 */
(value1, value2, sortDirection) => {
    /** @type {?} */
    const x = (isNaN(value1) || value1 === '' || value1 === null) ? -99e+10 : parseFloat(value1);
    /** @type {?} */
    const y = (isNaN(value2) || value2 === '' || value2 === null) ? -99e+10 : parseFloat(value2);
    return sortDirection * (x === y ? 0 : (x > y ? 1 : -1));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpY1NvcnRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvc29ydGVycy9udW1lcmljU29ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsTUFBTSxPQUFPLGFBQWE7Ozs7OztBQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRTs7VUFDL0QsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sS0FBSyxFQUFFLElBQUksTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQzs7VUFDdEYsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sS0FBSyxFQUFFLElBQUksTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUM1RixPQUFPLGFBQWEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxRCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb3J0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG5leHBvcnQgY29uc3QgbnVtZXJpY1NvcnRlcjogU29ydGVyID0gKHZhbHVlMSwgdmFsdWUyLCBzb3J0RGlyZWN0aW9uKSA9PiB7XHJcbiAgY29uc3QgeCA9IChpc05hTih2YWx1ZTEpIHx8IHZhbHVlMSA9PT0gJycgfHwgdmFsdWUxID09PSBudWxsKSA/IC05OWUrMTAgOiBwYXJzZUZsb2F0KHZhbHVlMSk7XHJcbiAgY29uc3QgeSA9IChpc05hTih2YWx1ZTIpIHx8IHZhbHVlMiA9PT0gJycgfHwgdmFsdWUyID09PSBudWxsKSA/IC05OWUrMTAgOiBwYXJzZUZsb2F0KHZhbHVlMik7XHJcbiAgcmV0dXJuIHNvcnREaXJlY3Rpb24gKiAoeCA9PT0geSA/IDAgOiAoeCA+IHkgPyAxIDogLTEpKTtcclxufTtcclxuIl19