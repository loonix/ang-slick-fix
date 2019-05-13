/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as moment_ from 'moment-mini';
/** @type {?} */
const moment = moment_;
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
import { compareDates } from './compareDateUtility';
/** @type {?} */
export const dateSorter = (/**
 * @param {?} value1
 * @param {?} value2
 * @param {?} sortDirection
 * @return {?}
 */
(value1, value2, sortDirection) => {
    return compareDates(value1, value2, moment.ISO_8601, sortDirection);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVNvcnRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvc29ydGVycy9kYXRlU29ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEtBQUssT0FBTyxNQUFNLGFBQWEsQ0FBQzs7TUFDakMsTUFBTSxHQUFHLE9BQU87O0FBQ3RCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFFcEQsTUFBTSxPQUFPLFVBQVU7Ozs7OztBQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRTtJQUNsRSxPQUFPLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDdEUsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU29ydGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudC1taW5pJztcclxuY29uc3QgbW9tZW50ID0gbW9tZW50XzsgLy8gcGF0Y2ggdG8gZml4IHJvbGx1cCBcIm1vbWVudCBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIiBpc3N1ZSwgZG9jdW1lbnQgaGVyZSBodHRwczovL2dpdGh1Yi5jb20vcm9sbHVwL3JvbGx1cC9pc3N1ZXMvNjcwXHJcbmltcG9ydCB7IGNvbXBhcmVEYXRlcyB9IGZyb20gJy4vY29tcGFyZURhdGVVdGlsaXR5JztcclxuXHJcbmV4cG9ydCBjb25zdCBkYXRlU29ydGVyOiBTb3J0ZXIgPSAodmFsdWUxLCB2YWx1ZTIsIHNvcnREaXJlY3Rpb24pID0+IHtcclxuICByZXR1cm4gY29tcGFyZURhdGVzKHZhbHVlMSwgdmFsdWUyLCBtb21lbnQuSVNPXzg2MDEsIHNvcnREaXJlY3Rpb24pO1xyXG59O1xyXG4iXX0=