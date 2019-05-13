/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { OperatorType } from '../models/index';
import { testFilterCondition } from './filterUtilities';
/** @type {?} */
export const stringFilterCondition = (/**
 * @param {?} options
 * @return {?}
 */
(options) => {
    // make sure the cell value is a string by casting it when possible
    options.cellValue = (options.cellValue === undefined || options.cellValue === null) ? '' : options.cellValue.toString();
    // make both the cell value and search value lower for case insensitive comparison
    /** @type {?} */
    const cellValue = options.cellValue.toLowerCase();
    /** @type {?} */
    let searchTerm = (Array.isArray(options.searchTerms) && options.searchTerms[0]) || '';
    if (typeof searchTerm === 'string') {
        searchTerm = searchTerm.toLowerCase();
    }
    if (options.operator === '*' || options.operator === OperatorType.endsWith) {
        return cellValue.endsWith(searchTerm);
    }
    else if ((options.operator === '' && options.cellValueLastChar === '*') || options.operator === OperatorType.startsWith) {
        return cellValue.startsWith(searchTerm);
    }
    else if (options.operator === '') {
        return cellValue.includes(searchTerm);
    }
    return testFilterCondition(options.operator || '==', cellValue, searchTerm);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nRmlsdGVyQ29uZGl0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXItY29uZGl0aW9ucy9zdHJpbmdGaWx0ZXJDb25kaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBMEMsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBRXhELE1BQU0sT0FBTyxxQkFBcUI7Ozs7QUFBb0IsQ0FBQyxPQUE4QixFQUFFLEVBQUU7SUFDdkYsbUVBQW1FO0lBQ25FLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLFNBQVMsSUFBSSxPQUFPLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7OztVQUdsSCxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUU7O1FBQzdDLFVBQVUsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO0lBQ3JGLElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxFQUFFO1FBQ2xDLFVBQVUsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDdkM7SUFFRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssWUFBWSxDQUFDLFFBQVEsRUFBRTtRQUMxRSxPQUFPLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDdkM7U0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLGlCQUFpQixLQUFLLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssWUFBWSxDQUFDLFVBQVUsRUFBRTtRQUN6SCxPQUFPLFNBQVMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDekM7U0FBTSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssRUFBRSxFQUFFO1FBQ2xDLE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUN2QztJQUNELE9BQU8sbUJBQW1CLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzlFLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZpbHRlckNvbmRpdGlvbiwgRmlsdGVyQ29uZGl0aW9uT3B0aW9uLCBPcGVyYXRvclR5cGUgfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyB0ZXN0RmlsdGVyQ29uZGl0aW9uIH0gZnJvbSAnLi9maWx0ZXJVdGlsaXRpZXMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHN0cmluZ0ZpbHRlckNvbmRpdGlvbjogRmlsdGVyQ29uZGl0aW9uID0gKG9wdGlvbnM6IEZpbHRlckNvbmRpdGlvbk9wdGlvbikgPT4ge1xyXG4gIC8vIG1ha2Ugc3VyZSB0aGUgY2VsbCB2YWx1ZSBpcyBhIHN0cmluZyBieSBjYXN0aW5nIGl0IHdoZW4gcG9zc2libGVcclxuICBvcHRpb25zLmNlbGxWYWx1ZSA9IChvcHRpb25zLmNlbGxWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMuY2VsbFZhbHVlID09PSBudWxsKSA/ICcnIDogb3B0aW9ucy5jZWxsVmFsdWUudG9TdHJpbmcoKTtcclxuXHJcbiAgLy8gbWFrZSBib3RoIHRoZSBjZWxsIHZhbHVlIGFuZCBzZWFyY2ggdmFsdWUgbG93ZXIgZm9yIGNhc2UgaW5zZW5zaXRpdmUgY29tcGFyaXNvblxyXG4gIGNvbnN0IGNlbGxWYWx1ZSA9IG9wdGlvbnMuY2VsbFZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcbiAgbGV0IHNlYXJjaFRlcm0gPSAoQXJyYXkuaXNBcnJheShvcHRpb25zLnNlYXJjaFRlcm1zKSAmJiBvcHRpb25zLnNlYXJjaFRlcm1zWzBdKSB8fCAnJztcclxuICBpZiAodHlwZW9mIHNlYXJjaFRlcm0gPT09ICdzdHJpbmcnKSB7XHJcbiAgICBzZWFyY2hUZXJtID0gc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKG9wdGlvbnMub3BlcmF0b3IgPT09ICcqJyB8fCBvcHRpb25zLm9wZXJhdG9yID09PSBPcGVyYXRvclR5cGUuZW5kc1dpdGgpIHtcclxuICAgIHJldHVybiBjZWxsVmFsdWUuZW5kc1dpdGgoc2VhcmNoVGVybSk7XHJcbiAgfSBlbHNlIGlmICgob3B0aW9ucy5vcGVyYXRvciA9PT0gJycgJiYgb3B0aW9ucy5jZWxsVmFsdWVMYXN0Q2hhciA9PT0gJyonKSB8fCBvcHRpb25zLm9wZXJhdG9yID09PSBPcGVyYXRvclR5cGUuc3RhcnRzV2l0aCkge1xyXG4gICAgcmV0dXJuIGNlbGxWYWx1ZS5zdGFydHNXaXRoKHNlYXJjaFRlcm0pO1xyXG4gIH0gZWxzZSBpZiAob3B0aW9ucy5vcGVyYXRvciA9PT0gJycpIHtcclxuICAgIHJldHVybiBjZWxsVmFsdWUuaW5jbHVkZXMoc2VhcmNoVGVybSk7XHJcbiAgfVxyXG4gIHJldHVybiB0ZXN0RmlsdGVyQ29uZGl0aW9uKG9wdGlvbnMub3BlcmF0b3IgfHwgJz09JywgY2VsbFZhbHVlLCBzZWFyY2hUZXJtKTtcclxufTtcclxuIl19