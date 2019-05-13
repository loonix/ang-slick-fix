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
const FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateUs);
/** @type {?} */
export const dateUsFilterCondition = (/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVVzRmlsdGVyQ29uZGl0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXItY29uZGl0aW9ucy9kYXRlVXNGaWx0ZXJDb25kaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQTBDLE1BQU0saUJBQWlCLENBQUM7QUFDcEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDeEQsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0UsT0FBTyxLQUFLLE9BQU8sTUFBTSxhQUFhLENBQUM7O01BQ2pDLE1BQU0sR0FBRyxPQUFPOzs7TUFDaEIsTUFBTSxHQUFHLGdDQUFnQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7O0FBRWpFLE1BQU0sT0FBTyxxQkFBcUI7Ozs7QUFBb0IsQ0FBQyxPQUE4QixFQUFFLEVBQUU7O1VBQ2pGLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7SUFDckYsSUFBSSxVQUFVLEtBQUssSUFBSSxJQUFJLFVBQVUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNqSixPQUFPLEtBQUssQ0FBQztLQUNkOztVQUNLLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOztVQUNsRCxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDO0lBRW5ELDhEQUE4RDtJQUM5RCxPQUFPLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDakksQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmllbGRUeXBlLCBGaWx0ZXJDb25kaXRpb24sIEZpbHRlckNvbmRpdGlvbk9wdGlvbiB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IHRlc3RGaWx0ZXJDb25kaXRpb24gfSBmcm9tICcuL2ZpbHRlclV0aWxpdGllcyc7XHJcbmltcG9ydCB7IG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudC1taW5pJztcclxuY29uc3QgbW9tZW50ID0gbW9tZW50XzsgLy8gcGF0Y2ggdG8gZml4IHJvbGx1cCBcIm1vbWVudCBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIiBpc3N1ZSwgZG9jdW1lbnQgaGVyZSBodHRwczovL2dpdGh1Yi5jb20vcm9sbHVwL3JvbGx1cC9pc3N1ZXMvNjcwXHJcbmNvbnN0IEZPUk1BVCA9IG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlKEZpZWxkVHlwZS5kYXRlVXMpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRhdGVVc0ZpbHRlckNvbmRpdGlvbjogRmlsdGVyQ29uZGl0aW9uID0gKG9wdGlvbnM6IEZpbHRlckNvbmRpdGlvbk9wdGlvbikgPT4ge1xyXG4gIGNvbnN0IHNlYXJjaFRlcm0gPSBBcnJheS5pc0FycmF5KG9wdGlvbnMuc2VhcmNoVGVybXMpICYmIG9wdGlvbnMuc2VhcmNoVGVybXNbMF0gfHwgJyc7XHJcbiAgaWYgKHNlYXJjaFRlcm0gPT09IG51bGwgfHwgc2VhcmNoVGVybSA9PT0gJycgfHwgIW1vbWVudChvcHRpb25zLmNlbGxWYWx1ZSwgRk9STUFULCB0cnVlKS5pc1ZhbGlkKCkgfHwgIW1vbWVudChzZWFyY2hUZXJtLCBGT1JNQVQsIHRydWUpLmlzVmFsaWQoKSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBjb25zdCBkYXRlQ2VsbCA9IG1vbWVudChvcHRpb25zLmNlbGxWYWx1ZSwgRk9STUFULCB0cnVlKTtcclxuICBjb25zdCBkYXRlU2VhcmNoID0gbW9tZW50KHNlYXJjaFRlcm0sIEZPUk1BVCwgdHJ1ZSk7XHJcblxyXG4gIC8vIHJ1biB0aGUgZmlsdGVyIGNvbmRpdGlvbiB3aXRoIGRhdGUgaW4gVW5peCBUaW1lc3RhbXAgZm9ybWF0XHJcbiAgcmV0dXJuIHRlc3RGaWx0ZXJDb25kaXRpb24ob3B0aW9ucy5vcGVyYXRvciB8fCAnPT0nLCBwYXJzZUludChkYXRlQ2VsbC5mb3JtYXQoJ1gnKSwgMTApLCBwYXJzZUludChkYXRlU2VhcmNoLmZvcm1hdCgnWCcpLCAxMCkpO1xyXG59O1xyXG4iXX0=