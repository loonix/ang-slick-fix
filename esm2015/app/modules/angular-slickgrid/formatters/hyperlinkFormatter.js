/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as DOMPurify_ from 'dompurify';
/** @type {?} */
const DOMPurify = DOMPurify_;
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
export const hyperlinkFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} value
 * @param {?} columnDef
 * @param {?} dataContext
 * @return {?}
 */
(row, cell, value, columnDef, dataContext) => {
    /** @type {?} */
    const columnParams = columnDef && columnDef.params || {};
    /** @type {?} */
    let displayedText = columnParams.hyperlinkText ? columnParams.hyperlinkText : value;
    displayedText = DOMPurify.sanitize(displayedText || '');
    /** @type {?} */
    let outputLink = columnParams.hyperlinkUrl ? columnParams.hyperlinkUrl : value;
    outputLink = DOMPurify.sanitize(outputLink || '');
    /** @type {?} */
    const matchUrl = outputLink.match(/^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/i);
    if (matchUrl && Array.isArray(matchUrl) && matchUrl.length > 0) {
        /** @type {?} */
        const finalUrl = matchUrl[0];
        return `<a href="${finalUrl}">${displayedText}</a>`;
    }
    return value;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwZXJsaW5rRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL2h5cGVybGlua0Zvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxLQUFLLFVBQVUsTUFBTSxXQUFXLENBQUM7O01BQ2xDLFNBQVMsR0FBRyxVQUFVOzs7Ozs7Ozs7Ozs7O0FBWTVCLE1BQU0sT0FBTyxrQkFBa0I7Ozs7Ozs7O0FBQWMsQ0FBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFpQixFQUFFLFdBQWdCLEVBQUUsRUFBRTs7VUFDcEgsWUFBWSxHQUFHLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUU7O1FBRXBELGFBQWEsR0FBRyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxLQUFLO0lBQ25GLGFBQWEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUMsQ0FBQzs7UUFFcEQsVUFBVSxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUs7SUFDOUUsVUFBVSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDOztVQUU1QyxRQUFRLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxtR0FBbUcsQ0FBQztJQUV0SSxJQUFJLFFBQVEsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztjQUN4RCxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM1QixPQUFPLFlBQVksUUFBUSxLQUFLLGFBQWEsTUFBTSxDQUFDO0tBQ3JEO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4gfSBmcm9tICcuLy4uL21vZGVscy9jb2x1bW4uaW50ZXJmYWNlJztcbmltcG9ydCB7IEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2Zvcm1hdHRlci5pbnRlcmZhY2UnO1xuaW1wb3J0ICogYXMgRE9NUHVyaWZ5XyBmcm9tICdkb21wdXJpZnknO1xuY29uc3QgRE9NUHVyaWZ5ID0gRE9NUHVyaWZ5XzsgLy8gcGF0Y2ggdG8gZml4IHJvbGx1cCB0byB3b3JrXG5cbi8qKlxuICogVGFrZXMgYW4gaHlwZXJsaW5rIGNlbGwgdmFsdWUgYW5kIHRyYW5zZm9ybXMgaXQgaW50byBhIHJlYWwgaHlwZXJsaW5rLCBnaXZlbiB0aGF0IHRoZSB2YWx1ZSBzdGFydHMgd2l0aCAxIG9mIHRoZXNlIChodHRwfGZ0cHxodHRwcykuXG4gKiBUaGUgc3RydWN0dXJlIHdpbGwgYmUgXCI8YSBocmVmPVwiaHlwZXJsaW5rXCI+aHlwZXJsaW5rPC9hPlwiXG4gKlxuICogWW91IGNhbiBvcHRpb25hbGx5IGNoYW5nZSB0aGUgaHlwZXJsaW5rIHRleHQgZGlzcGxheWVkIGJ5IHVzaW5nIHRoZSBnZW5lcmljIHBhcmFtcyBcImh5cGVybGlua1RleHRcIiBpbiB0aGUgY29sdW1uIGRlZmluaXRpb25cbiAqIEZvciBleGFtcGxlOiB7IGlkOiAnbGluaycsIGZpZWxkOiAnbGluaycsIHBhcmFtczogeyBoeXBlcmxpbmtUZXh0OiAnQ29tcGFueSBXZWJzaXRlJyB9IH0gd2lsbCBkaXNwbGF5IFwiPGEgaHJlZj1cImxpbmtcIj5Db21wYW55IFdlYnNpdGU8L2E+XCJcbiAqXG4gKiBZb3UgY2FuIGFsc28gb3B0aW9uYWxseSBwcm92aWRlIHRoZSBoeXBlcmxpbmsgVVJMIGJ5IHVzaW5nIHRoZSBnZW5lcmljIHBhcmFtcyBcImh5cGVybGlua1VybFwiIGluIHRoZSBjb2x1bW4gZGVmaW5pdGlvblxuICogRm9yIGV4YW1wbGU6IHsgaWQ6ICdsaW5rJywgZmllbGQ6ICdsaW5rJywgcGFyYW1zOiB7ICBoeXBlcmxpbmtUZXh0OiAnQ29tcGFueSBXZWJzaXRlJywgaHlwZXJsaW5rVXJsOiAnaHR0cDovL3d3dy5zb21ld2hlcmUuY29tJyB9IH0gd2lsbCBkaXNwbGF5IFwiPGEgaHJlZj1cImh0dHA6Ly93d3cuc29tZXdoZXJlLmNvbVwiPkNvbXBhbnkgV2Vic2l0ZTwvYT5cIlxuICovXG5leHBvcnQgY29uc3QgaHlwZXJsaW5rRm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpID0+IHtcbiAgY29uc3QgY29sdW1uUGFyYW1zID0gY29sdW1uRGVmICYmIGNvbHVtbkRlZi5wYXJhbXMgfHwge307XG5cbiAgbGV0IGRpc3BsYXllZFRleHQgPSBjb2x1bW5QYXJhbXMuaHlwZXJsaW5rVGV4dCA/IGNvbHVtblBhcmFtcy5oeXBlcmxpbmtUZXh0IDogdmFsdWU7XG4gIGRpc3BsYXllZFRleHQgPSBET01QdXJpZnkuc2FuaXRpemUoZGlzcGxheWVkVGV4dCB8fCAnJyk7XG5cbiAgbGV0IG91dHB1dExpbmsgPSBjb2x1bW5QYXJhbXMuaHlwZXJsaW5rVXJsID8gY29sdW1uUGFyYW1zLmh5cGVybGlua1VybCA6IHZhbHVlO1xuICBvdXRwdXRMaW5rID0gRE9NUHVyaWZ5LnNhbml0aXplKG91dHB1dExpbmsgfHwgJycpO1xuXG4gIGNvbnN0IG1hdGNoVXJsID0gb3V0cHV0TGluay5tYXRjaCgvXihodHRwfGZ0cHxodHRwcyk6XFwvXFwvW1xcd1xcLV9dKyhcXC5bXFx3XFwtX10rKSsoW1xcd1xcLVxcLixAP149JSZhbXA7OlxcL35cXCsjXSpbXFx3XFwtXFxAP149JSZhbXA7XFwvflxcKyNdKT8vaSk7XG5cbiAgaWYgKG1hdGNoVXJsICYmIEFycmF5LmlzQXJyYXkobWF0Y2hVcmwpICYmIG1hdGNoVXJsLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBmaW5hbFVybCA9IG1hdGNoVXJsWzBdO1xuICAgIHJldHVybiBgPGEgaHJlZj1cIiR7ZmluYWxVcmx9XCI+JHtkaXNwbGF5ZWRUZXh0fTwvYT5gO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufTtcbiJdfQ==