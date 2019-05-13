/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { compareObjects } from './filterUtilities';
/** @type {?} */
export var objectFilterCondition = (/**
 * @param {?} options
 * @return {?}
 */
function (options) {
    /** @type {?} */
    var searchTerm = (Array.isArray(options.searchTerms) && options.searchTerms[0] || '');
    if (!searchTerm && (!options.operator || options.operator === '')) {
        return true;
    }
    return compareObjects(options.cellValue, searchTerm, options.dataKey);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0RmlsdGVyQ29uZGl0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXItY29uZGl0aW9ucy9vYmplY3RGaWx0ZXJDb25kaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFFbkQsTUFBTSxLQUFPLHFCQUFxQjs7OztBQUFvQixVQUFDLE9BQThCOztRQUM3RSxVQUFVLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUV2RixJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssRUFBRSxDQUFDLEVBQUU7UUFDakUsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELE9BQU8sY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4RSxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWx0ZXJDb25kaXRpb24sIEZpbHRlckNvbmRpdGlvbk9wdGlvbiB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IGNvbXBhcmVPYmplY3RzIH0gZnJvbSAnLi9maWx0ZXJVdGlsaXRpZXMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IG9iamVjdEZpbHRlckNvbmRpdGlvbjogRmlsdGVyQ29uZGl0aW9uID0gKG9wdGlvbnM6IEZpbHRlckNvbmRpdGlvbk9wdGlvbikgPT4ge1xyXG4gIGNvbnN0IHNlYXJjaFRlcm0gPSAoQXJyYXkuaXNBcnJheShvcHRpb25zLnNlYXJjaFRlcm1zKSAmJiBvcHRpb25zLnNlYXJjaFRlcm1zWzBdIHx8ICcnKTtcclxuXHJcbiAgaWYgKCFzZWFyY2hUZXJtICYmICghb3B0aW9ucy5vcGVyYXRvciB8fCBvcHRpb25zLm9wZXJhdG9yID09PSAnJykpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICByZXR1cm4gY29tcGFyZU9iamVjdHMob3B0aW9ucy5jZWxsVmFsdWUsIHNlYXJjaFRlcm0sIG9wdGlvbnMuZGF0YUtleSk7XHJcbn07XHJcbiJdfQ==