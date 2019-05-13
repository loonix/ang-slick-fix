/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FieldType } from '../models/index';
import { mapMomentDateFormatWithFieldType } from './../services/utilities';
import { testFilterCondition } from './filterUtilities';
import * as moment_ from 'moment-mini';
/** @type {?} */
var moment = moment_;
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
/** @type {?} */
export var dateFilterCondition = (/**
 * @param {?} options
 * @return {?}
 */
function (options) {
    /** @type {?} */
    var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
    /** @type {?} */
    var filterSearchType = options.filterSearchType || FieldType.dateIso;
    /** @type {?} */
    var searchDateFormat = mapMomentDateFormatWithFieldType(filterSearchType);
    if (searchTerm === null || searchTerm === '' || !moment(options.cellValue, moment.ISO_8601).isValid() || !moment(searchTerm, searchDateFormat, true).isValid()) {
        return false;
    }
    /** @type {?} */
    var dateCell = moment(options.cellValue);
    /** @type {?} */
    var dateSearch = moment(searchTerm);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUZpbHRlckNvbmRpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZmlsdGVyLWNvbmRpdGlvbnMvZGF0ZUZpbHRlckNvbmRpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBMEMsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RCxPQUFPLEtBQUssT0FBTyxNQUFNLGFBQWEsQ0FBQzs7SUFDakMsTUFBTSxHQUFHLE9BQU87OztBQUV0QixNQUFNLEtBQU8sbUJBQW1COzs7O0FBQW9CLFVBQUMsT0FBOEI7O1FBQzNFLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7O1FBQy9FLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsSUFBSSxTQUFTLENBQUMsT0FBTzs7UUFDaEUsZ0JBQWdCLEdBQUcsZ0NBQWdDLENBQUMsZ0JBQWdCLENBQUM7SUFDM0UsSUFBSSxVQUFVLEtBQUssSUFBSSxJQUFJLFVBQVUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQzlKLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7O1FBQ0ssUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDOztRQUNwQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUVyQyw4REFBOEQ7SUFDOUQsT0FBTyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2pJLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZpZWxkVHlwZSwgRmlsdGVyQ29uZGl0aW9uLCBGaWx0ZXJDb25kaXRpb25PcHRpb24gfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBtYXBNb21lbnREYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSB9IGZyb20gJy4vLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgdGVzdEZpbHRlckNvbmRpdGlvbiB9IGZyb20gJy4vZmlsdGVyVXRpbGl0aWVzJztcclxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQtbWluaSc7XHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87IC8vIHBhdGNoIHRvIGZpeCByb2xsdXAgXCJtb21lbnQgaGFzIG5vIGRlZmF1bHQgZXhwb3J0XCIgaXNzdWUsIGRvY3VtZW50IGhlcmUgaHR0cHM6Ly9naXRodWIuY29tL3JvbGx1cC9yb2xsdXAvaXNzdWVzLzY3MFxyXG5cclxuZXhwb3J0IGNvbnN0IGRhdGVGaWx0ZXJDb25kaXRpb246IEZpbHRlckNvbmRpdGlvbiA9IChvcHRpb25zOiBGaWx0ZXJDb25kaXRpb25PcHRpb24pID0+IHtcclxuICBjb25zdCBzZWFyY2hUZXJtID0gQXJyYXkuaXNBcnJheShvcHRpb25zLnNlYXJjaFRlcm1zKSAmJiBvcHRpb25zLnNlYXJjaFRlcm1zWzBdIHx8ICcnO1xyXG4gIGNvbnN0IGZpbHRlclNlYXJjaFR5cGUgPSBvcHRpb25zLmZpbHRlclNlYXJjaFR5cGUgfHwgRmllbGRUeXBlLmRhdGVJc287XHJcbiAgY29uc3Qgc2VhcmNoRGF0ZUZvcm1hdCA9IG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlKGZpbHRlclNlYXJjaFR5cGUpO1xyXG4gIGlmIChzZWFyY2hUZXJtID09PSBudWxsIHx8IHNlYXJjaFRlcm0gPT09ICcnIHx8ICFtb21lbnQob3B0aW9ucy5jZWxsVmFsdWUsIG1vbWVudC5JU09fODYwMSkuaXNWYWxpZCgpIHx8ICFtb21lbnQoc2VhcmNoVGVybSwgc2VhcmNoRGF0ZUZvcm1hdCwgdHJ1ZSkuaXNWYWxpZCgpKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIGNvbnN0IGRhdGVDZWxsID0gbW9tZW50KG9wdGlvbnMuY2VsbFZhbHVlKTtcclxuICBjb25zdCBkYXRlU2VhcmNoID0gbW9tZW50KHNlYXJjaFRlcm0pO1xyXG5cclxuICAvLyBydW4gdGhlIGZpbHRlciBjb25kaXRpb24gd2l0aCBkYXRlIGluIFVuaXggVGltZXN0YW1wIGZvcm1hdFxyXG4gIHJldHVybiB0ZXN0RmlsdGVyQ29uZGl0aW9uKG9wdGlvbnMub3BlcmF0b3IgfHwgJz09JywgcGFyc2VJbnQoZGF0ZUNlbGwuZm9ybWF0KCdYJyksIDEwKSwgcGFyc2VJbnQoZGF0ZVNlYXJjaC5mb3JtYXQoJ1gnKSwgMTApKTtcclxufTtcclxuIl19