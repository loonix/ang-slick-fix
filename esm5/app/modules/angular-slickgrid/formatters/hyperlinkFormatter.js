/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as DOMPurify_ from 'dompurify';
/** @type {?} */
var DOMPurify = DOMPurify_;
// patch to fix rollup to work
/**
 * Takes an hyperlink cell value and transforms it into a real hyperlink, given that the value starts with 1 of these (http|ftp|https).
 * The structure will be "<a href="hyperlink">hyperlink</a>"
 *
 * You can optionally change the hyperlink text displayed by using the generic params "hyperlinkText" in the column definition
 * For example: { id: 'link', field: 'link', params: { hyperlinkText: 'Company Website' } } will display "<a href="link">Company Website</a>"
 *
 * You can also optionally provide the hyperlink URL by using the generic params "hyperlinkUrl" in the column definition
 * For example: { id: 'link', field: 'link', params: {  hyperlinkText: 'Company Website', hyperlinkUrl: 'http://www.somewhere.com' } } will display "<a href="http://www.somewhere.com">Company Website</a>"
 * @type {?}
 */
export var hyperlinkFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} value
 * @param {?} columnDef
 * @param {?} dataContext
 * @return {?}
 */
function (row, cell, value, columnDef, dataContext) {
    /** @type {?} */
    var columnParams = columnDef && columnDef.params || {};
    /** @type {?} */
    var displayedText = columnParams.hyperlinkText ? columnParams.hyperlinkText : value;
    displayedText = DOMPurify.sanitize(displayedText || '');
    /** @type {?} */
    var outputLink = columnParams.hyperlinkUrl ? columnParams.hyperlinkUrl : value;
    outputLink = DOMPurify.sanitize(outputLink || '');
    /** @type {?} */
    var matchUrl = outputLink.match(/^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/i);
    if (matchUrl && Array.isArray(matchUrl) && matchUrl.length > 0) {
        /** @type {?} */
        var finalUrl = matchUrl[0];
        return "<a href=\"" + finalUrl + "\">" + displayedText + "</a>";
    }
    return value;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwZXJsaW5rRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL2h5cGVybGlua0Zvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxLQUFLLFVBQVUsTUFBTSxXQUFXLENBQUM7O0lBQ2xDLFNBQVMsR0FBRyxVQUFVOzs7Ozs7Ozs7Ozs7O0FBWTVCLE1BQU0sS0FBTyxrQkFBa0I7Ozs7Ozs7O0FBQWMsVUFBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFpQixFQUFFLFdBQWdCOztRQUNoSCxZQUFZLEdBQUcsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRTs7UUFFcEQsYUFBYSxHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUs7SUFDbkYsYUFBYSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQyxDQUFDOztRQUVwRCxVQUFVLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSztJQUM5RSxVQUFVLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUM7O1FBRTVDLFFBQVEsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLG1HQUFtRyxDQUFDO0lBRXRJLElBQUksUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O1lBQ3hELFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzVCLE9BQU8sZUFBWSxRQUFRLFdBQUssYUFBYSxTQUFNLENBQUM7S0FDckQ7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiB9IGZyb20gJy4vLi4vbW9kZWxzL2NvbHVtbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRm9ybWF0dGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvZm9ybWF0dGVyLmludGVyZmFjZSc7XG5pbXBvcnQgKiBhcyBET01QdXJpZnlfIGZyb20gJ2RvbXB1cmlmeSc7XG5jb25zdCBET01QdXJpZnkgPSBET01QdXJpZnlfOyAvLyBwYXRjaCB0byBmaXggcm9sbHVwIHRvIHdvcmtcblxuLyoqXG4gKiBUYWtlcyBhbiBoeXBlcmxpbmsgY2VsbCB2YWx1ZSBhbmQgdHJhbnNmb3JtcyBpdCBpbnRvIGEgcmVhbCBoeXBlcmxpbmssIGdpdmVuIHRoYXQgdGhlIHZhbHVlIHN0YXJ0cyB3aXRoIDEgb2YgdGhlc2UgKGh0dHB8ZnRwfGh0dHBzKS5cbiAqIFRoZSBzdHJ1Y3R1cmUgd2lsbCBiZSBcIjxhIGhyZWY9XCJoeXBlcmxpbmtcIj5oeXBlcmxpbms8L2E+XCJcbiAqXG4gKiBZb3UgY2FuIG9wdGlvbmFsbHkgY2hhbmdlIHRoZSBoeXBlcmxpbmsgdGV4dCBkaXNwbGF5ZWQgYnkgdXNpbmcgdGhlIGdlbmVyaWMgcGFyYW1zIFwiaHlwZXJsaW5rVGV4dFwiIGluIHRoZSBjb2x1bW4gZGVmaW5pdGlvblxuICogRm9yIGV4YW1wbGU6IHsgaWQ6ICdsaW5rJywgZmllbGQ6ICdsaW5rJywgcGFyYW1zOiB7IGh5cGVybGlua1RleHQ6ICdDb21wYW55IFdlYnNpdGUnIH0gfSB3aWxsIGRpc3BsYXkgXCI8YSBocmVmPVwibGlua1wiPkNvbXBhbnkgV2Vic2l0ZTwvYT5cIlxuICpcbiAqIFlvdSBjYW4gYWxzbyBvcHRpb25hbGx5IHByb3ZpZGUgdGhlIGh5cGVybGluayBVUkwgYnkgdXNpbmcgdGhlIGdlbmVyaWMgcGFyYW1zIFwiaHlwZXJsaW5rVXJsXCIgaW4gdGhlIGNvbHVtbiBkZWZpbml0aW9uXG4gKiBGb3IgZXhhbXBsZTogeyBpZDogJ2xpbmsnLCBmaWVsZDogJ2xpbmsnLCBwYXJhbXM6IHsgIGh5cGVybGlua1RleHQ6ICdDb21wYW55IFdlYnNpdGUnLCBoeXBlcmxpbmtVcmw6ICdodHRwOi8vd3d3LnNvbWV3aGVyZS5jb20nIH0gfSB3aWxsIGRpc3BsYXkgXCI8YSBocmVmPVwiaHR0cDovL3d3dy5zb21ld2hlcmUuY29tXCI+Q29tcGFueSBXZWJzaXRlPC9hPlwiXG4gKi9cbmV4cG9ydCBjb25zdCBoeXBlcmxpbmtGb3JtYXR0ZXI6IEZvcm1hdHRlciA9IChyb3c6IG51bWJlciwgY2VsbDogbnVtYmVyLCB2YWx1ZTogYW55LCBjb2x1bW5EZWY6IENvbHVtbiwgZGF0YUNvbnRleHQ6IGFueSkgPT4ge1xuICBjb25zdCBjb2x1bW5QYXJhbXMgPSBjb2x1bW5EZWYgJiYgY29sdW1uRGVmLnBhcmFtcyB8fCB7fTtcblxuICBsZXQgZGlzcGxheWVkVGV4dCA9IGNvbHVtblBhcmFtcy5oeXBlcmxpbmtUZXh0ID8gY29sdW1uUGFyYW1zLmh5cGVybGlua1RleHQgOiB2YWx1ZTtcbiAgZGlzcGxheWVkVGV4dCA9IERPTVB1cmlmeS5zYW5pdGl6ZShkaXNwbGF5ZWRUZXh0IHx8ICcnKTtcblxuICBsZXQgb3V0cHV0TGluayA9IGNvbHVtblBhcmFtcy5oeXBlcmxpbmtVcmwgPyBjb2x1bW5QYXJhbXMuaHlwZXJsaW5rVXJsIDogdmFsdWU7XG4gIG91dHB1dExpbmsgPSBET01QdXJpZnkuc2FuaXRpemUob3V0cHV0TGluayB8fCAnJyk7XG5cbiAgY29uc3QgbWF0Y2hVcmwgPSBvdXRwdXRMaW5rLm1hdGNoKC9eKGh0dHB8ZnRwfGh0dHBzKTpcXC9cXC9bXFx3XFwtX10rKFxcLltcXHdcXC1fXSspKyhbXFx3XFwtXFwuLEA/Xj0lJmFtcDs6XFwvflxcKyNdKltcXHdcXC1cXEA/Xj0lJmFtcDtcXC9+XFwrI10pPy9pKTtcblxuICBpZiAobWF0Y2hVcmwgJiYgQXJyYXkuaXNBcnJheShtYXRjaFVybCkgJiYgbWF0Y2hVcmwubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGZpbmFsVXJsID0gbWF0Y2hVcmxbMF07XG4gICAgcmV0dXJuIGA8YSBocmVmPVwiJHtmaW5hbFVybH1cIj4ke2Rpc3BsYXllZFRleHR9PC9hPmA7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59O1xuIl19