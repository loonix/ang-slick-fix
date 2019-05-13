/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { testFilterCondition } from './filterUtilities';
/** @type {?} */
export var numberFilterCondition = (/**
 * @param {?} options
 * @return {?}
 */
function (options) {
    /** @type {?} */
    var cellValue = parseFloat(options.cellValue);
    /** @type {?} */
    var searchTerm = (Array.isArray(options.searchTerms) && options.searchTerms[0]) || 0;
    if (typeof searchTerm === 'string') {
        searchTerm = parseFloat(searchTerm);
    }
    if (!searchTerm && (!options.operator || options.operator === '')) {
        return true;
    }
    return testFilterCondition(options.operator || '==', cellValue, searchTerm);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyRmlsdGVyQ29uZGl0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXItY29uZGl0aW9ucy9udW1iZXJGaWx0ZXJDb25kaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQUV4RCxNQUFNLEtBQU8scUJBQXFCOzs7O0FBQW9CLFVBQUMsT0FBOEI7O1FBQzdFLFNBQVMsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQzs7UUFDM0MsVUFBVSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDcEYsSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7UUFDbEMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNyQztJQUVELElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsRUFBRTtRQUNqRSxPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsT0FBTyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDOUUsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmlsdGVyQ29uZGl0aW9uLCBGaWx0ZXJDb25kaXRpb25PcHRpb24gfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyB0ZXN0RmlsdGVyQ29uZGl0aW9uIH0gZnJvbSAnLi9maWx0ZXJVdGlsaXRpZXMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IG51bWJlckZpbHRlckNvbmRpdGlvbjogRmlsdGVyQ29uZGl0aW9uID0gKG9wdGlvbnM6IEZpbHRlckNvbmRpdGlvbk9wdGlvbikgPT4ge1xyXG4gIGNvbnN0IGNlbGxWYWx1ZSA9IHBhcnNlRmxvYXQob3B0aW9ucy5jZWxsVmFsdWUpO1xyXG4gIGxldCBzZWFyY2hUZXJtID0gKEFycmF5LmlzQXJyYXkob3B0aW9ucy5zZWFyY2hUZXJtcykgJiYgb3B0aW9ucy5zZWFyY2hUZXJtc1swXSkgfHwgMDtcclxuICBpZiAodHlwZW9mIHNlYXJjaFRlcm0gPT09ICdzdHJpbmcnKSB7XHJcbiAgICBzZWFyY2hUZXJtID0gcGFyc2VGbG9hdChzZWFyY2hUZXJtKTtcclxuICB9XHJcblxyXG4gIGlmICghc2VhcmNoVGVybSAmJiAoIW9wdGlvbnMub3BlcmF0b3IgfHwgb3B0aW9ucy5vcGVyYXRvciA9PT0gJycpKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgcmV0dXJuIHRlc3RGaWx0ZXJDb25kaXRpb24ob3B0aW9ucy5vcGVyYXRvciB8fCAnPT0nLCBjZWxsVmFsdWUsIHNlYXJjaFRlcm0pO1xyXG59O1xyXG4iXX0=