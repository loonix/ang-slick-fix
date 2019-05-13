/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { mapMomentDateFormatWithFieldType } from './../services/utilities';
import { FieldType } from './../models/index';
import { compareDates } from './compareDateUtility';
/** @type {?} */
var FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateIso);
/** @type {?} */
export var dateIsoSorter = (/**
 * @param {?} value1
 * @param {?} value2
 * @param {?} sortDirection
 * @return {?}
 */
function (value1, value2, sortDirection) {
    return compareDates(value1, value2, FORMAT, sortDirection, true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUlzb1NvcnRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvc29ydGVycy9kYXRlSXNvU29ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDOztJQUM5QyxNQUFNLEdBQUcsZ0NBQWdDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQzs7QUFFbEUsTUFBTSxLQUFPLGFBQWE7Ozs7OztBQUFXLFVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhO0lBQ2pFLE9BQU8sWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNuRSxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtYXBNb21lbnREYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSB9IGZyb20gJy4vLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgRmllbGRUeXBlLCBTb3J0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IGNvbXBhcmVEYXRlcyB9IGZyb20gJy4vY29tcGFyZURhdGVVdGlsaXR5JztcclxuY29uc3QgRk9STUFUID0gbWFwTW9tZW50RGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUoRmllbGRUeXBlLmRhdGVJc28pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRhdGVJc29Tb3J0ZXI6IFNvcnRlciA9ICh2YWx1ZTEsIHZhbHVlMiwgc29ydERpcmVjdGlvbikgPT4ge1xyXG4gIHJldHVybiBjb21wYXJlRGF0ZXModmFsdWUxLCB2YWx1ZTIsIEZPUk1BVCwgc29ydERpcmVjdGlvbiwgdHJ1ZSk7XHJcbn07XHJcbiJdfQ==