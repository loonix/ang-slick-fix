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
const FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateUsShort);
/** @type {?} */
export const dateUsShortFilterCondition = (/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVVzU2hvcnRGaWx0ZXJDb25kaXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2ZpbHRlci1jb25kaXRpb25zL2RhdGVVc1Nob3J0RmlsdGVyQ29uZGl0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUEwQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNFLE9BQU8sS0FBSyxPQUFPLE1BQU0sYUFBYSxDQUFDOztNQUNqQyxNQUFNLEdBQUcsT0FBTzs7O01BQ2hCLE1BQU0sR0FBRyxnQ0FBZ0MsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDOztBQUV0RSxNQUFNLE9BQU8sMEJBQTBCOzs7O0FBQW9CLENBQUMsT0FBOEIsRUFBRSxFQUFFOztVQUN0RixVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO0lBQ3JGLElBQUksVUFBVSxLQUFLLElBQUksSUFBSSxVQUFVLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDakosT0FBTyxLQUFLLENBQUM7S0FDZDs7VUFDSyxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQzs7VUFDbEQsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQztJQUVuRCw4REFBOEQ7SUFDOUQsT0FBTyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2pJLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZpZWxkVHlwZSwgRmlsdGVyQ29uZGl0aW9uLCBGaWx0ZXJDb25kaXRpb25PcHRpb24gfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyB0ZXN0RmlsdGVyQ29uZGl0aW9uIH0gZnJvbSAnLi9maWx0ZXJVdGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBtYXBNb21lbnREYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSB9IGZyb20gJy4vLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQtbWluaSc7XHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87IC8vIHBhdGNoIHRvIGZpeCByb2xsdXAgXCJtb21lbnQgaGFzIG5vIGRlZmF1bHQgZXhwb3J0XCIgaXNzdWUsIGRvY3VtZW50IGhlcmUgaHR0cHM6Ly9naXRodWIuY29tL3JvbGx1cC9yb2xsdXAvaXNzdWVzLzY3MFxyXG5jb25zdCBGT1JNQVQgPSBtYXBNb21lbnREYXRlRm9ybWF0V2l0aEZpZWxkVHlwZShGaWVsZFR5cGUuZGF0ZVVzU2hvcnQpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRhdGVVc1Nob3J0RmlsdGVyQ29uZGl0aW9uOiBGaWx0ZXJDb25kaXRpb24gPSAob3B0aW9uczogRmlsdGVyQ29uZGl0aW9uT3B0aW9uKSA9PiB7XHJcbiAgY29uc3Qgc2VhcmNoVGVybSA9IEFycmF5LmlzQXJyYXkob3B0aW9ucy5zZWFyY2hUZXJtcykgJiYgb3B0aW9ucy5zZWFyY2hUZXJtc1swXSB8fCAnJztcclxuICBpZiAoc2VhcmNoVGVybSA9PT0gbnVsbCB8fCBzZWFyY2hUZXJtID09PSAnJyB8fCAhbW9tZW50KG9wdGlvbnMuY2VsbFZhbHVlLCBGT1JNQVQsIHRydWUpLmlzVmFsaWQoKSB8fCAhbW9tZW50KHNlYXJjaFRlcm0sIEZPUk1BVCwgdHJ1ZSkuaXNWYWxpZCgpKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIGNvbnN0IGRhdGVDZWxsID0gbW9tZW50KG9wdGlvbnMuY2VsbFZhbHVlLCBGT1JNQVQsIHRydWUpO1xyXG4gIGNvbnN0IGRhdGVTZWFyY2ggPSBtb21lbnQoc2VhcmNoVGVybSwgRk9STUFULCB0cnVlKTtcclxuXHJcbiAgLy8gcnVuIHRoZSBmaWx0ZXIgY29uZGl0aW9uIHdpdGggZGF0ZSBpbiBVbml4IFRpbWVzdGFtcCBmb3JtYXRcclxuICByZXR1cm4gdGVzdEZpbHRlckNvbmRpdGlvbihvcHRpb25zLm9wZXJhdG9yIHx8ICc9PScsIHBhcnNlSW50KGRhdGVDZWxsLmZvcm1hdCgnWCcpLCAxMCksIHBhcnNlSW50KGRhdGVTZWFyY2guZm9ybWF0KCdYJyksIDEwKSk7XHJcbn07XHJcbiJdfQ==