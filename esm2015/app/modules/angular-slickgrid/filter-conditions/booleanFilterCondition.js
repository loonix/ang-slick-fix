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
export const booleanFilterCondition = (/**
 * @param {?} options
 * @return {?}
 */
(options) => {
    /** @type {?} */
    const searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
    return parseBoolean(options.cellValue) === parseBoolean(searchTerm);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vbGVhbkZpbHRlckNvbmRpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZmlsdGVyLWNvbmRpdGlvbnMvYm9vbGVhbkZpbHRlckNvbmRpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBLFNBQVMsWUFBWSxDQUFDLEdBQW9CO0lBQ3hDLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDcEMsQ0FBQzs7QUFFRCxNQUFNLE9BQU8sc0JBQXNCOzs7O0FBQW9CLENBQUMsT0FBOEIsRUFBRSxFQUFFOztVQUNsRixVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO0lBQ3JGLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEUsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmlsdGVyQ29uZGl0aW9uLCBGaWx0ZXJDb25kaXRpb25PcHRpb24gfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG5mdW5jdGlvbiBwYXJzZUJvb2xlYW4oc3RyOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICByZXR1cm4gLyh0cnVlfDEpL2kudGVzdChzdHIgKyAnJyk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBib29sZWFuRmlsdGVyQ29uZGl0aW9uOiBGaWx0ZXJDb25kaXRpb24gPSAob3B0aW9uczogRmlsdGVyQ29uZGl0aW9uT3B0aW9uKSA9PiB7XHJcbiAgY29uc3Qgc2VhcmNoVGVybSA9IEFycmF5LmlzQXJyYXkob3B0aW9ucy5zZWFyY2hUZXJtcykgJiYgb3B0aW9ucy5zZWFyY2hUZXJtc1swXSB8fCAnJztcclxuICByZXR1cm4gcGFyc2VCb29sZWFuKG9wdGlvbnMuY2VsbFZhbHVlKSA9PT0gcGFyc2VCb29sZWFuKHNlYXJjaFRlcm0pO1xyXG59O1xyXG4iXX0=