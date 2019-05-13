/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as moment_ from 'moment-mini';
/** @type {?} */
var moment = moment_;
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
import { compareDates } from './compareDateUtility';
/** @type {?} */
export var dateSorter = (/**
 * @param {?} value1
 * @param {?} value2
 * @param {?} sortDirection
 * @return {?}
 */
function (value1, value2, sortDirection) {
    return compareDates(value1, value2, moment.ISO_8601, sortDirection);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVNvcnRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvc29ydGVycy9kYXRlU29ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEtBQUssT0FBTyxNQUFNLGFBQWEsQ0FBQzs7SUFDakMsTUFBTSxHQUFHLE9BQU87O0FBQ3RCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFFcEQsTUFBTSxLQUFPLFVBQVU7Ozs7OztBQUFXLFVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhO0lBQzlELE9BQU8sWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUN0RSxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb3J0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50LW1pbmknO1xyXG5jb25zdCBtb21lbnQgPSBtb21lbnRfOyAvLyBwYXRjaCB0byBmaXggcm9sbHVwIFwibW9tZW50IGhhcyBubyBkZWZhdWx0IGV4cG9ydFwiIGlzc3VlLCBkb2N1bWVudCBoZXJlIGh0dHBzOi8vZ2l0aHViLmNvbS9yb2xsdXAvcm9sbHVwL2lzc3Vlcy82NzBcclxuaW1wb3J0IHsgY29tcGFyZURhdGVzIH0gZnJvbSAnLi9jb21wYXJlRGF0ZVV0aWxpdHknO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRhdGVTb3J0ZXI6IFNvcnRlciA9ICh2YWx1ZTEsIHZhbHVlMiwgc29ydERpcmVjdGlvbikgPT4ge1xyXG4gIHJldHVybiBjb21wYXJlRGF0ZXModmFsdWUxLCB2YWx1ZTIsIG1vbWVudC5JU09fODYwMSwgc29ydERpcmVjdGlvbik7XHJcbn07XHJcbiJdfQ==