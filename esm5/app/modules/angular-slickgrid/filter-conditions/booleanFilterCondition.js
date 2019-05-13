/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} str
 * @return {?}
 */
function parseBoolean(str) {
    return /(true|1)/i.test(str + '');
}
/** @type {?} */
export var booleanFilterCondition = (/**
 * @param {?} options
 * @return {?}
 */
function (options) {
    /** @type {?} */
    var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
    return parseBoolean(options.cellValue) === parseBoolean(searchTerm);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vbGVhbkZpbHRlckNvbmRpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZmlsdGVyLWNvbmRpdGlvbnMvYm9vbGVhbkZpbHRlckNvbmRpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBLFNBQVMsWUFBWSxDQUFDLEdBQW9CO0lBQ3hDLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDcEMsQ0FBQzs7QUFFRCxNQUFNLEtBQU8sc0JBQXNCOzs7O0FBQW9CLFVBQUMsT0FBOEI7O1FBQzlFLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7SUFDckYsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0RSxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWx0ZXJDb25kaXRpb24sIEZpbHRlckNvbmRpdGlvbk9wdGlvbiB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbmZ1bmN0aW9uIHBhcnNlQm9vbGVhbihzdHI6IG51bWJlciB8IHN0cmluZykge1xyXG4gIHJldHVybiAvKHRydWV8MSkvaS50ZXN0KHN0ciArICcnKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGJvb2xlYW5GaWx0ZXJDb25kaXRpb246IEZpbHRlckNvbmRpdGlvbiA9IChvcHRpb25zOiBGaWx0ZXJDb25kaXRpb25PcHRpb24pID0+IHtcclxuICBjb25zdCBzZWFyY2hUZXJtID0gQXJyYXkuaXNBcnJheShvcHRpb25zLnNlYXJjaFRlcm1zKSAmJiBvcHRpb25zLnNlYXJjaFRlcm1zWzBdIHx8ICcnO1xyXG4gIHJldHVybiBwYXJzZUJvb2xlYW4ob3B0aW9ucy5jZWxsVmFsdWUpID09PSBwYXJzZUJvb2xlYW4oc2VhcmNoVGVybSk7XHJcbn07XHJcbiJdfQ==