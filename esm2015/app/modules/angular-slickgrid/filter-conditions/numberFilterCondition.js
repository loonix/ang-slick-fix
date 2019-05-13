/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { testFilterCondition } from './filterUtilities';
/** @type {?} */
export const numberFilterCondition = (/**
 * @param {?} options
 * @return {?}
 */
(options) => {
    /** @type {?} */
    const cellValue = parseFloat(options.cellValue);
    /** @type {?} */
    let searchTerm = (Array.isArray(options.searchTerms) && options.searchTerms[0]) || 0;
    if (typeof searchTerm === 'string') {
        searchTerm = parseFloat(searchTerm);
    }
    if (!searchTerm && (!options.operator || options.operator === '')) {
        return true;
    }
    return testFilterCondition(options.operator || '==', cellValue, searchTerm);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyRmlsdGVyQ29uZGl0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXItY29uZGl0aW9ucy9udW1iZXJGaWx0ZXJDb25kaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQUV4RCxNQUFNLE9BQU8scUJBQXFCOzs7O0FBQW9CLENBQUMsT0FBOEIsRUFBRSxFQUFFOztVQUNqRixTQUFTLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7O1FBQzNDLFVBQVUsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3BGLElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxFQUFFO1FBQ2xDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDckM7SUFFRCxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssRUFBRSxDQUFDLEVBQUU7UUFDakUsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELE9BQU8sbUJBQW1CLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzlFLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZpbHRlckNvbmRpdGlvbiwgRmlsdGVyQ29uZGl0aW9uT3B0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgdGVzdEZpbHRlckNvbmRpdGlvbiB9IGZyb20gJy4vZmlsdGVyVXRpbGl0aWVzJztcclxuXHJcbmV4cG9ydCBjb25zdCBudW1iZXJGaWx0ZXJDb25kaXRpb246IEZpbHRlckNvbmRpdGlvbiA9IChvcHRpb25zOiBGaWx0ZXJDb25kaXRpb25PcHRpb24pID0+IHtcclxuICBjb25zdCBjZWxsVmFsdWUgPSBwYXJzZUZsb2F0KG9wdGlvbnMuY2VsbFZhbHVlKTtcclxuICBsZXQgc2VhcmNoVGVybSA9IChBcnJheS5pc0FycmF5KG9wdGlvbnMuc2VhcmNoVGVybXMpICYmIG9wdGlvbnMuc2VhcmNoVGVybXNbMF0pIHx8IDA7XHJcbiAgaWYgKHR5cGVvZiBzZWFyY2hUZXJtID09PSAnc3RyaW5nJykge1xyXG4gICAgc2VhcmNoVGVybSA9IHBhcnNlRmxvYXQoc2VhcmNoVGVybSk7XHJcbiAgfVxyXG5cclxuICBpZiAoIXNlYXJjaFRlcm0gJiYgKCFvcHRpb25zLm9wZXJhdG9yIHx8IG9wdGlvbnMub3BlcmF0b3IgPT09ICcnKSkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIHJldHVybiB0ZXN0RmlsdGVyQ29uZGl0aW9uKG9wdGlvbnMub3BlcmF0b3IgfHwgJz09JywgY2VsbFZhbHVlLCBzZWFyY2hUZXJtKTtcclxufTtcclxuIl19