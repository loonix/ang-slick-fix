/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FieldType } from '../models/index';
import { testFilterCondition } from './filterUtilities';
import { mapMomentDateFormatWithFieldType } from './../services/utilities';
import * as moment_ from 'moment-mini';
/** @type {?} */
const moment = moment_;
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
/** @type {?} */
const FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateIso);
/** @type {?} */
export const dateIsoFilterCondition = (/**
 * @param {?} options
 * @return {?}
 */
(options) => {
    /** @type {?} */
    const searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
    if (searchTerm === null || searchTerm === '' || !moment(options.cellValue, FORMAT, true).isValid() || !moment(searchTerm, FORMAT, true).isValid()) {
        return false;
    }
    /** @type {?} */
    const dateCell = moment(options.cellValue, FORMAT, true);
    /** @type {?} */
    const dateSearch = moment(searchTerm, FORMAT, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUlzb0ZpbHRlckNvbmRpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZmlsdGVyLWNvbmRpdGlvbnMvZGF0ZUlzb0ZpbHRlckNvbmRpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBMEMsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRSxPQUFPLEtBQUssT0FBTyxNQUFNLGFBQWEsQ0FBQzs7TUFDakMsTUFBTSxHQUFHLE9BQU87OztNQUNoQixNQUFNLEdBQUcsZ0NBQWdDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQzs7QUFFbEUsTUFBTSxPQUFPLHNCQUFzQjs7OztBQUFvQixDQUFDLE9BQThCLEVBQUUsRUFBRTs7VUFDbEYsVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRTtJQUNyRixJQUFJLFVBQVUsS0FBSyxJQUFJLElBQUksVUFBVSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ2pKLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7O1VBQ0ssUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7O1VBQ2xELFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7SUFFbkQsOERBQThEO0lBQzlELE9BQU8sbUJBQW1CLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNqSSxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWVsZFR5cGUsIEZpbHRlckNvbmRpdGlvbiwgRmlsdGVyQ29uZGl0aW9uT3B0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgdGVzdEZpbHRlckNvbmRpdGlvbiB9IGZyb20gJy4vZmlsdGVyVXRpbGl0aWVzJztcclxuaW1wb3J0IHsgbWFwTW9tZW50RGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50LW1pbmknO1xyXG5jb25zdCBtb21lbnQgPSBtb21lbnRfOyAvLyBwYXRjaCB0byBmaXggcm9sbHVwIFwibW9tZW50IGhhcyBubyBkZWZhdWx0IGV4cG9ydFwiIGlzc3VlLCBkb2N1bWVudCBoZXJlIGh0dHBzOi8vZ2l0aHViLmNvbS9yb2xsdXAvcm9sbHVwL2lzc3Vlcy82NzBcclxuY29uc3QgRk9STUFUID0gbWFwTW9tZW50RGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUoRmllbGRUeXBlLmRhdGVJc28pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRhdGVJc29GaWx0ZXJDb25kaXRpb246IEZpbHRlckNvbmRpdGlvbiA9IChvcHRpb25zOiBGaWx0ZXJDb25kaXRpb25PcHRpb24pID0+IHtcclxuICBjb25zdCBzZWFyY2hUZXJtID0gQXJyYXkuaXNBcnJheShvcHRpb25zLnNlYXJjaFRlcm1zKSAmJiBvcHRpb25zLnNlYXJjaFRlcm1zWzBdIHx8ICcnO1xyXG4gIGlmIChzZWFyY2hUZXJtID09PSBudWxsIHx8IHNlYXJjaFRlcm0gPT09ICcnIHx8ICFtb21lbnQob3B0aW9ucy5jZWxsVmFsdWUsIEZPUk1BVCwgdHJ1ZSkuaXNWYWxpZCgpIHx8ICFtb21lbnQoc2VhcmNoVGVybSwgRk9STUFULCB0cnVlKS5pc1ZhbGlkKCkpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgY29uc3QgZGF0ZUNlbGwgPSBtb21lbnQob3B0aW9ucy5jZWxsVmFsdWUsIEZPUk1BVCwgdHJ1ZSk7XHJcbiAgY29uc3QgZGF0ZVNlYXJjaCA9IG1vbWVudChzZWFyY2hUZXJtLCBGT1JNQVQsIHRydWUpO1xyXG5cclxuICAvLyBydW4gdGhlIGZpbHRlciBjb25kaXRpb24gd2l0aCBkYXRlIGluIFVuaXggVGltZXN0YW1wIGZvcm1hdFxyXG4gIHJldHVybiB0ZXN0RmlsdGVyQ29uZGl0aW9uKG9wdGlvbnMub3BlcmF0b3IgfHwgJz09JywgcGFyc2VJbnQoZGF0ZUNlbGwuZm9ybWF0KCdYJyksIDEwKSwgcGFyc2VJbnQoZGF0ZVNlYXJjaC5mb3JtYXQoJ1gnKSwgMTApKTtcclxufTtcclxuIl19