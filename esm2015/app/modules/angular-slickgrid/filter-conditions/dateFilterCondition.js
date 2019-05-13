/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FieldType } from '../models/index';
import { mapMomentDateFormatWithFieldType } from './../services/utilities';
import { testFilterCondition } from './filterUtilities';
import * as moment_ from 'moment-mini';
/** @type {?} */
const moment = moment_;
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
/** @type {?} */
export const dateFilterCondition = (/**
 * @param {?} options
 * @return {?}
 */
(options) => {
    /** @type {?} */
    const searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
    /** @type {?} */
    const filterSearchType = options.filterSearchType || FieldType.dateIso;
    /** @type {?} */
    const searchDateFormat = mapMomentDateFormatWithFieldType(filterSearchType);
    if (searchTerm === null || searchTerm === '' || !moment(options.cellValue, moment.ISO_8601).isValid() || !moment(searchTerm, searchDateFormat, true).isValid()) {
        return false;
    }
    /** @type {?} */
    const dateCell = moment(options.cellValue);
    /** @type {?} */
    const dateSearch = moment(searchTerm);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUZpbHRlckNvbmRpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZmlsdGVyLWNvbmRpdGlvbnMvZGF0ZUZpbHRlckNvbmRpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBMEMsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RCxPQUFPLEtBQUssT0FBTyxNQUFNLGFBQWEsQ0FBQzs7TUFDakMsTUFBTSxHQUFHLE9BQU87OztBQUV0QixNQUFNLE9BQU8sbUJBQW1COzs7O0FBQW9CLENBQUMsT0FBOEIsRUFBRSxFQUFFOztVQUMvRSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFOztVQUMvRSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLElBQUksU0FBUyxDQUFDLE9BQU87O1VBQ2hFLGdCQUFnQixHQUFHLGdDQUFnQyxDQUFDLGdCQUFnQixDQUFDO0lBQzNFLElBQUksVUFBVSxLQUFLLElBQUksSUFBSSxVQUFVLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUM5SixPQUFPLEtBQUssQ0FBQztLQUNkOztVQUNLLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQzs7VUFDcEMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFFckMsOERBQThEO0lBQzlELE9BQU8sbUJBQW1CLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNqSSxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWVsZFR5cGUsIEZpbHRlckNvbmRpdGlvbiwgRmlsdGVyQ29uZGl0aW9uT3B0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgbWFwTW9tZW50RGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7IHRlc3RGaWx0ZXJDb25kaXRpb24gfSBmcm9tICcuL2ZpbHRlclV0aWxpdGllcyc7XHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50LW1pbmknO1xyXG5jb25zdCBtb21lbnQgPSBtb21lbnRfOyAvLyBwYXRjaCB0byBmaXggcm9sbHVwIFwibW9tZW50IGhhcyBubyBkZWZhdWx0IGV4cG9ydFwiIGlzc3VlLCBkb2N1bWVudCBoZXJlIGh0dHBzOi8vZ2l0aHViLmNvbS9yb2xsdXAvcm9sbHVwL2lzc3Vlcy82NzBcclxuXHJcbmV4cG9ydCBjb25zdCBkYXRlRmlsdGVyQ29uZGl0aW9uOiBGaWx0ZXJDb25kaXRpb24gPSAob3B0aW9uczogRmlsdGVyQ29uZGl0aW9uT3B0aW9uKSA9PiB7XHJcbiAgY29uc3Qgc2VhcmNoVGVybSA9IEFycmF5LmlzQXJyYXkob3B0aW9ucy5zZWFyY2hUZXJtcykgJiYgb3B0aW9ucy5zZWFyY2hUZXJtc1swXSB8fCAnJztcclxuICBjb25zdCBmaWx0ZXJTZWFyY2hUeXBlID0gb3B0aW9ucy5maWx0ZXJTZWFyY2hUeXBlIHx8IEZpZWxkVHlwZS5kYXRlSXNvO1xyXG4gIGNvbnN0IHNlYXJjaERhdGVGb3JtYXQgPSBtYXBNb21lbnREYXRlRm9ybWF0V2l0aEZpZWxkVHlwZShmaWx0ZXJTZWFyY2hUeXBlKTtcclxuICBpZiAoc2VhcmNoVGVybSA9PT0gbnVsbCB8fCBzZWFyY2hUZXJtID09PSAnJyB8fCAhbW9tZW50KG9wdGlvbnMuY2VsbFZhbHVlLCBtb21lbnQuSVNPXzg2MDEpLmlzVmFsaWQoKSB8fCAhbW9tZW50KHNlYXJjaFRlcm0sIHNlYXJjaERhdGVGb3JtYXQsIHRydWUpLmlzVmFsaWQoKSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBjb25zdCBkYXRlQ2VsbCA9IG1vbWVudChvcHRpb25zLmNlbGxWYWx1ZSk7XHJcbiAgY29uc3QgZGF0ZVNlYXJjaCA9IG1vbWVudChzZWFyY2hUZXJtKTtcclxuXHJcbiAgLy8gcnVuIHRoZSBmaWx0ZXIgY29uZGl0aW9uIHdpdGggZGF0ZSBpbiBVbml4IFRpbWVzdGFtcCBmb3JtYXRcclxuICByZXR1cm4gdGVzdEZpbHRlckNvbmRpdGlvbihvcHRpb25zLm9wZXJhdG9yIHx8ICc9PScsIHBhcnNlSW50KGRhdGVDZWxsLmZvcm1hdCgnWCcpLCAxMCksIHBhcnNlSW50KGRhdGVTZWFyY2guZm9ybWF0KCdYJyksIDEwKSk7XHJcbn07XHJcbiJdfQ==