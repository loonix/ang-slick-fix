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
var FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateUsShort);
/** @type {?} */
export var dateUsShortFilterCondition = (/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVVzU2hvcnRGaWx0ZXJDb25kaXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2ZpbHRlci1jb25kaXRpb25zL2RhdGVVc1Nob3J0RmlsdGVyQ29uZGl0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUEwQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNFLE9BQU8sS0FBSyxPQUFPLE1BQU0sYUFBYSxDQUFDOztJQUNqQyxNQUFNLEdBQUcsT0FBTzs7O0lBQ2hCLE1BQU0sR0FBRyxnQ0FBZ0MsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDOztBQUV0RSxNQUFNLEtBQU8sMEJBQTBCOzs7O0FBQW9CLFVBQUMsT0FBOEI7O1FBQ2xGLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7SUFDckYsSUFBSSxVQUFVLEtBQUssSUFBSSxJQUFJLFVBQVUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNqSixPQUFPLEtBQUssQ0FBQztLQUNkOztRQUNLLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOztRQUNsRCxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDO0lBRW5ELDhEQUE4RDtJQUM5RCxPQUFPLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDakksQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmllbGRUeXBlLCBGaWx0ZXJDb25kaXRpb24sIEZpbHRlckNvbmRpdGlvbk9wdGlvbiB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IHRlc3RGaWx0ZXJDb25kaXRpb24gfSBmcm9tICcuL2ZpbHRlclV0aWxpdGllcyc7XHJcbmltcG9ydCB7IG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudC1taW5pJztcclxuY29uc3QgbW9tZW50ID0gbW9tZW50XzsgLy8gcGF0Y2ggdG8gZml4IHJvbGx1cCBcIm1vbWVudCBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIiBpc3N1ZSwgZG9jdW1lbnQgaGVyZSBodHRwczovL2dpdGh1Yi5jb20vcm9sbHVwL3JvbGx1cC9pc3N1ZXMvNjcwXHJcbmNvbnN0IEZPUk1BVCA9IG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlKEZpZWxkVHlwZS5kYXRlVXNTaG9ydCk7XHJcblxyXG5leHBvcnQgY29uc3QgZGF0ZVVzU2hvcnRGaWx0ZXJDb25kaXRpb246IEZpbHRlckNvbmRpdGlvbiA9IChvcHRpb25zOiBGaWx0ZXJDb25kaXRpb25PcHRpb24pID0+IHtcclxuICBjb25zdCBzZWFyY2hUZXJtID0gQXJyYXkuaXNBcnJheShvcHRpb25zLnNlYXJjaFRlcm1zKSAmJiBvcHRpb25zLnNlYXJjaFRlcm1zWzBdIHx8ICcnO1xyXG4gIGlmIChzZWFyY2hUZXJtID09PSBudWxsIHx8IHNlYXJjaFRlcm0gPT09ICcnIHx8ICFtb21lbnQob3B0aW9ucy5jZWxsVmFsdWUsIEZPUk1BVCwgdHJ1ZSkuaXNWYWxpZCgpIHx8ICFtb21lbnQoc2VhcmNoVGVybSwgRk9STUFULCB0cnVlKS5pc1ZhbGlkKCkpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgY29uc3QgZGF0ZUNlbGwgPSBtb21lbnQob3B0aW9ucy5jZWxsVmFsdWUsIEZPUk1BVCwgdHJ1ZSk7XHJcbiAgY29uc3QgZGF0ZVNlYXJjaCA9IG1vbWVudChzZWFyY2hUZXJtLCBGT1JNQVQsIHRydWUpO1xyXG5cclxuICAvLyBydW4gdGhlIGZpbHRlciBjb25kaXRpb24gd2l0aCBkYXRlIGluIFVuaXggVGltZXN0YW1wIGZvcm1hdFxyXG4gIHJldHVybiB0ZXN0RmlsdGVyQ29uZGl0aW9uKG9wdGlvbnMub3BlcmF0b3IgfHwgJz09JywgcGFyc2VJbnQoZGF0ZUNlbGwuZm9ybWF0KCdYJyksIDEwKSwgcGFyc2VJbnQoZGF0ZVNlYXJjaC5mb3JtYXQoJ1gnKSwgMTApKTtcclxufTtcclxuIl19