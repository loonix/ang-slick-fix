/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FieldType } from '../models/index';
import { testFilterCondition } from './filterUtilities';
import { mapMomentDateFormatWithFieldType } from './../services/utilities';
import * as moment_ from 'moment-mini';
/** @type {?} */
var moment = moment_;
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
/** @type {?} */
var FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateUs);
/** @type {?} */
export var dateUsFilterCondition = (/**
 * @param {?} options
 * @return {?}
 */
function (options) {
    /** @type {?} */
    var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
    if (searchTerm === null || searchTerm === '' || !moment(options.cellValue, FORMAT, true).isValid() || !moment(searchTerm, FORMAT, true).isValid()) {
        return false;
    }
    /** @type {?} */
    var dateCell = moment(options.cellValue, FORMAT, true);
    /** @type {?} */
    var dateSearch = moment(searchTerm, FORMAT, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVVzRmlsdGVyQ29uZGl0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXItY29uZGl0aW9ucy9kYXRlVXNGaWx0ZXJDb25kaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQTBDLE1BQU0saUJBQWlCLENBQUM7QUFDcEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDeEQsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0UsT0FBTyxLQUFLLE9BQU8sTUFBTSxhQUFhLENBQUM7O0lBQ2pDLE1BQU0sR0FBRyxPQUFPOzs7SUFDaEIsTUFBTSxHQUFHLGdDQUFnQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7O0FBRWpFLE1BQU0sS0FBTyxxQkFBcUI7Ozs7QUFBb0IsVUFBQyxPQUE4Qjs7UUFDN0UsVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRTtJQUNyRixJQUFJLFVBQVUsS0FBSyxJQUFJLElBQUksVUFBVSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ2pKLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7O1FBQ0ssUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7O1FBQ2xELFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7SUFFbkQsOERBQThEO0lBQzlELE9BQU8sbUJBQW1CLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNqSSxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWVsZFR5cGUsIEZpbHRlckNvbmRpdGlvbiwgRmlsdGVyQ29uZGl0aW9uT3B0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgdGVzdEZpbHRlckNvbmRpdGlvbiB9IGZyb20gJy4vZmlsdGVyVXRpbGl0aWVzJztcclxuaW1wb3J0IHsgbWFwTW9tZW50RGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50LW1pbmknO1xyXG5jb25zdCBtb21lbnQgPSBtb21lbnRfOyAvLyBwYXRjaCB0byBmaXggcm9sbHVwIFwibW9tZW50IGhhcyBubyBkZWZhdWx0IGV4cG9ydFwiIGlzc3VlLCBkb2N1bWVudCBoZXJlIGh0dHBzOi8vZ2l0aHViLmNvbS9yb2xsdXAvcm9sbHVwL2lzc3Vlcy82NzBcclxuY29uc3QgRk9STUFUID0gbWFwTW9tZW50RGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUoRmllbGRUeXBlLmRhdGVVcyk7XHJcblxyXG5leHBvcnQgY29uc3QgZGF0ZVVzRmlsdGVyQ29uZGl0aW9uOiBGaWx0ZXJDb25kaXRpb24gPSAob3B0aW9uczogRmlsdGVyQ29uZGl0aW9uT3B0aW9uKSA9PiB7XHJcbiAgY29uc3Qgc2VhcmNoVGVybSA9IEFycmF5LmlzQXJyYXkob3B0aW9ucy5zZWFyY2hUZXJtcykgJiYgb3B0aW9ucy5zZWFyY2hUZXJtc1swXSB8fCAnJztcclxuICBpZiAoc2VhcmNoVGVybSA9PT0gbnVsbCB8fCBzZWFyY2hUZXJtID09PSAnJyB8fCAhbW9tZW50KG9wdGlvbnMuY2VsbFZhbHVlLCBGT1JNQVQsIHRydWUpLmlzVmFsaWQoKSB8fCAhbW9tZW50KHNlYXJjaFRlcm0sIEZPUk1BVCwgdHJ1ZSkuaXNWYWxpZCgpKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIGNvbnN0IGRhdGVDZWxsID0gbW9tZW50KG9wdGlvbnMuY2VsbFZhbHVlLCBGT1JNQVQsIHRydWUpO1xyXG4gIGNvbnN0IGRhdGVTZWFyY2ggPSBtb21lbnQoc2VhcmNoVGVybSwgRk9STUFULCB0cnVlKTtcclxuXHJcbiAgLy8gcnVuIHRoZSBmaWx0ZXIgY29uZGl0aW9uIHdpdGggZGF0ZSBpbiBVbml4IFRpbWVzdGFtcCBmb3JtYXRcclxuICByZXR1cm4gdGVzdEZpbHRlckNvbmRpdGlvbihvcHRpb25zLm9wZXJhdG9yIHx8ICc9PScsIHBhcnNlSW50KGRhdGVDZWxsLmZvcm1hdCgnWCcpLCAxMCksIHBhcnNlSW50KGRhdGVTZWFyY2guZm9ybWF0KCdYJyksIDEwKSk7XHJcbn07XHJcbiJdfQ==