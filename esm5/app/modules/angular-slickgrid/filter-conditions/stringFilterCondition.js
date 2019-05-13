/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { OperatorType } from '../models/index';
import { testFilterCondition } from './filterUtilities';
/** @type {?} */
export var stringFilterCondition = (/**
 * @param {?} options
 * @return {?}
 */
function (options) {
    // make sure the cell value is a string by casting it when possible
    options.cellValue = (options.cellValue === undefined || options.cellValue === null) ? '' : options.cellValue.toString();
    // make both the cell value and search value lower for case insensitive comparison
    /** @type {?} */
    var cellValue = options.cellValue.toLowerCase();
    /** @type {?} */
    var searchTerm = (Array.isArray(options.searchTerms) && options.searchTerms[0]) || '';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nRmlsdGVyQ29uZGl0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXItY29uZGl0aW9ucy9zdHJpbmdGaWx0ZXJDb25kaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBMEMsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBRXhELE1BQU0sS0FBTyxxQkFBcUI7Ozs7QUFBb0IsVUFBQyxPQUE4QjtJQUNuRixtRUFBbUU7SUFDbkUsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7O1FBR2xILFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTs7UUFDN0MsVUFBVSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7SUFDckYsSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7UUFDbEMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN2QztJQUVELElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxZQUFZLENBQUMsUUFBUSxFQUFFO1FBQzFFLE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUN2QztTQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsaUJBQWlCLEtBQUssR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxZQUFZLENBQUMsVUFBVSxFQUFFO1FBQ3pILE9BQU8sU0FBUyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUN6QztTQUFNLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxFQUFFLEVBQUU7UUFDbEMsT0FBTyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3ZDO0lBQ0QsT0FBTyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDOUUsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmlsdGVyQ29uZGl0aW9uLCBGaWx0ZXJDb25kaXRpb25PcHRpb24sIE9wZXJhdG9yVHlwZSB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IHRlc3RGaWx0ZXJDb25kaXRpb24gfSBmcm9tICcuL2ZpbHRlclV0aWxpdGllcyc7XHJcblxyXG5leHBvcnQgY29uc3Qgc3RyaW5nRmlsdGVyQ29uZGl0aW9uOiBGaWx0ZXJDb25kaXRpb24gPSAob3B0aW9uczogRmlsdGVyQ29uZGl0aW9uT3B0aW9uKSA9PiB7XHJcbiAgLy8gbWFrZSBzdXJlIHRoZSBjZWxsIHZhbHVlIGlzIGEgc3RyaW5nIGJ5IGNhc3RpbmcgaXQgd2hlbiBwb3NzaWJsZVxyXG4gIG9wdGlvbnMuY2VsbFZhbHVlID0gKG9wdGlvbnMuY2VsbFZhbHVlID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5jZWxsVmFsdWUgPT09IG51bGwpID8gJycgOiBvcHRpb25zLmNlbGxWYWx1ZS50b1N0cmluZygpO1xyXG5cclxuICAvLyBtYWtlIGJvdGggdGhlIGNlbGwgdmFsdWUgYW5kIHNlYXJjaCB2YWx1ZSBsb3dlciBmb3IgY2FzZSBpbnNlbnNpdGl2ZSBjb21wYXJpc29uXHJcbiAgY29uc3QgY2VsbFZhbHVlID0gb3B0aW9ucy5jZWxsVmFsdWUudG9Mb3dlckNhc2UoKTtcclxuICBsZXQgc2VhcmNoVGVybSA9IChBcnJheS5pc0FycmF5KG9wdGlvbnMuc2VhcmNoVGVybXMpICYmIG9wdGlvbnMuc2VhcmNoVGVybXNbMF0pIHx8ICcnO1xyXG4gIGlmICh0eXBlb2Ygc2VhcmNoVGVybSA9PT0gJ3N0cmluZycpIHtcclxuICAgIHNlYXJjaFRlcm0gPSBzZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG5cclxuICBpZiAob3B0aW9ucy5vcGVyYXRvciA9PT0gJyonIHx8IG9wdGlvbnMub3BlcmF0b3IgPT09IE9wZXJhdG9yVHlwZS5lbmRzV2l0aCkge1xyXG4gICAgcmV0dXJuIGNlbGxWYWx1ZS5lbmRzV2l0aChzZWFyY2hUZXJtKTtcclxuICB9IGVsc2UgaWYgKChvcHRpb25zLm9wZXJhdG9yID09PSAnJyAmJiBvcHRpb25zLmNlbGxWYWx1ZUxhc3RDaGFyID09PSAnKicpIHx8IG9wdGlvbnMub3BlcmF0b3IgPT09IE9wZXJhdG9yVHlwZS5zdGFydHNXaXRoKSB7XHJcbiAgICByZXR1cm4gY2VsbFZhbHVlLnN0YXJ0c1dpdGgoc2VhcmNoVGVybSk7XHJcbiAgfSBlbHNlIGlmIChvcHRpb25zLm9wZXJhdG9yID09PSAnJykge1xyXG4gICAgcmV0dXJuIGNlbGxWYWx1ZS5pbmNsdWRlcyhzZWFyY2hUZXJtKTtcclxuICB9XHJcbiAgcmV0dXJuIHRlc3RGaWx0ZXJDb25kaXRpb24ob3B0aW9ucy5vcGVyYXRvciB8fCAnPT0nLCBjZWxsVmFsdWUsIHNlYXJjaFRlcm0pO1xyXG59O1xyXG4iXX0=