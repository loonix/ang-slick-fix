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
var FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateIso);
/** @type {?} */
export var dateIsoFilterCondition = (/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUlzb0ZpbHRlckNvbmRpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZmlsdGVyLWNvbmRpdGlvbnMvZGF0ZUlzb0ZpbHRlckNvbmRpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBMEMsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRSxPQUFPLEtBQUssT0FBTyxNQUFNLGFBQWEsQ0FBQzs7SUFDakMsTUFBTSxHQUFHLE9BQU87OztJQUNoQixNQUFNLEdBQUcsZ0NBQWdDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQzs7QUFFbEUsTUFBTSxLQUFPLHNCQUFzQjs7OztBQUFvQixVQUFDLE9BQThCOztRQUM5RSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO0lBQ3JGLElBQUksVUFBVSxLQUFLLElBQUksSUFBSSxVQUFVLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDakosT0FBTyxLQUFLLENBQUM7S0FDZDs7UUFDSyxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQzs7UUFDbEQsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQztJQUVuRCw4REFBOEQ7SUFDOUQsT0FBTyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2pJLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZpZWxkVHlwZSwgRmlsdGVyQ29uZGl0aW9uLCBGaWx0ZXJDb25kaXRpb25PcHRpb24gfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyB0ZXN0RmlsdGVyQ29uZGl0aW9uIH0gZnJvbSAnLi9maWx0ZXJVdGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBtYXBNb21lbnREYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSB9IGZyb20gJy4vLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQtbWluaSc7XHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87IC8vIHBhdGNoIHRvIGZpeCByb2xsdXAgXCJtb21lbnQgaGFzIG5vIGRlZmF1bHQgZXhwb3J0XCIgaXNzdWUsIGRvY3VtZW50IGhlcmUgaHR0cHM6Ly9naXRodWIuY29tL3JvbGx1cC9yb2xsdXAvaXNzdWVzLzY3MFxyXG5jb25zdCBGT1JNQVQgPSBtYXBNb21lbnREYXRlRm9ybWF0V2l0aEZpZWxkVHlwZShGaWVsZFR5cGUuZGF0ZUlzbyk7XHJcblxyXG5leHBvcnQgY29uc3QgZGF0ZUlzb0ZpbHRlckNvbmRpdGlvbjogRmlsdGVyQ29uZGl0aW9uID0gKG9wdGlvbnM6IEZpbHRlckNvbmRpdGlvbk9wdGlvbikgPT4ge1xyXG4gIGNvbnN0IHNlYXJjaFRlcm0gPSBBcnJheS5pc0FycmF5KG9wdGlvbnMuc2VhcmNoVGVybXMpICYmIG9wdGlvbnMuc2VhcmNoVGVybXNbMF0gfHwgJyc7XHJcbiAgaWYgKHNlYXJjaFRlcm0gPT09IG51bGwgfHwgc2VhcmNoVGVybSA9PT0gJycgfHwgIW1vbWVudChvcHRpb25zLmNlbGxWYWx1ZSwgRk9STUFULCB0cnVlKS5pc1ZhbGlkKCkgfHwgIW1vbWVudChzZWFyY2hUZXJtLCBGT1JNQVQsIHRydWUpLmlzVmFsaWQoKSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBjb25zdCBkYXRlQ2VsbCA9IG1vbWVudChvcHRpb25zLmNlbGxWYWx1ZSwgRk9STUFULCB0cnVlKTtcclxuICBjb25zdCBkYXRlU2VhcmNoID0gbW9tZW50KHNlYXJjaFRlcm0sIEZPUk1BVCwgdHJ1ZSk7XHJcblxyXG4gIC8vIHJ1biB0aGUgZmlsdGVyIGNvbmRpdGlvbiB3aXRoIGRhdGUgaW4gVW5peCBUaW1lc3RhbXAgZm9ybWF0XHJcbiAgcmV0dXJuIHRlc3RGaWx0ZXJDb25kaXRpb24ob3B0aW9ucy5vcGVyYXRvciB8fCAnPT0nLCBwYXJzZUludChkYXRlQ2VsbC5mb3JtYXQoJ1gnKSwgMTApLCBwYXJzZUludChkYXRlU2VhcmNoLmZvcm1hdCgnWCcpLCAxMCkpO1xyXG59O1xyXG4iXX0=