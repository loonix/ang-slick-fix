/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { compareObjects } from './filterUtilities';
/** @type {?} */
export const objectFilterCondition = (/**
 * @param {?} options
 * @return {?}
 */
(options) => {
    /** @type {?} */
    const searchTerm = (Array.isArray(options.searchTerms) && options.searchTerms[0] || '');
    if (!searchTerm && (!options.operator || options.operator === '')) {
        return true;
    }
    return compareObjects(options.cellValue, searchTerm, options.dataKey);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0RmlsdGVyQ29uZGl0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXItY29uZGl0aW9ucy9vYmplY3RGaWx0ZXJDb25kaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFFbkQsTUFBTSxPQUFPLHFCQUFxQjs7OztBQUFvQixDQUFDLE9BQThCLEVBQUUsRUFBRTs7VUFDakYsVUFBVSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFdkYsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLEVBQUUsQ0FBQyxFQUFFO1FBQ2pFLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxPQUFPLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDeEUsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmlsdGVyQ29uZGl0aW9uLCBGaWx0ZXJDb25kaXRpb25PcHRpb24gfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBjb21wYXJlT2JqZWN0cyB9IGZyb20gJy4vZmlsdGVyVXRpbGl0aWVzJztcclxuXHJcbmV4cG9ydCBjb25zdCBvYmplY3RGaWx0ZXJDb25kaXRpb246IEZpbHRlckNvbmRpdGlvbiA9IChvcHRpb25zOiBGaWx0ZXJDb25kaXRpb25PcHRpb24pID0+IHtcclxuICBjb25zdCBzZWFyY2hUZXJtID0gKEFycmF5LmlzQXJyYXkob3B0aW9ucy5zZWFyY2hUZXJtcykgJiYgb3B0aW9ucy5zZWFyY2hUZXJtc1swXSB8fCAnJyk7XHJcblxyXG4gIGlmICghc2VhcmNoVGVybSAmJiAoIW9wdGlvbnMub3BlcmF0b3IgfHwgb3B0aW9ucy5vcGVyYXRvciA9PT0gJycpKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgcmV0dXJuIGNvbXBhcmVPYmplY3RzKG9wdGlvbnMuY2VsbFZhbHVlLCBzZWFyY2hUZXJtLCBvcHRpb25zLmRhdGFLZXkpO1xyXG59O1xyXG4iXX0=