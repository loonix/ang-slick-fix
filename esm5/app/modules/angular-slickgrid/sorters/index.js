/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { dateUsShortSorter } from './dateUsShortSorter';
import { dateSorter } from './dateSorter';
import { dateIsoSorter } from './dateIsoSorter';
import { dateUsSorter } from './dateUsSorter';
import { numericSorter } from './numericSorter';
import { objectStringSorter } from './objectStringSorter';
import { stringSorter } from './stringSorter';
/** @type {?} */
export var Sorters = {
    /**
     * Sorter method to sort values by Date object type
     */
    date: dateSorter,
    /**
     * Sorter method to sort values by Date formatted as ISO date
     */
    dateIso: dateIsoSorter,
    /**
     * Sorter method to sort values by Date formatted as US date
     */
    dateUs: dateUsSorter,
    /**
     * Sorter method to sort values by Date formatted as US short date
     */
    dateUsShort: dateUsShortSorter,
    /**
     * Sorter method to sort values as numeric fields
     */
    numeric: numericSorter,
    /**
     * Sorter method to sort object values with a "dataKey" provided which it's output will be of string (e.g. obj1[dataKey] = 'John')
     */
    objectString: objectStringSorter,
    /**
     * Sorter method to sort values as regular strings
     */
    string: stringSorter
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NvcnRlcnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUU5QyxNQUFNLEtBQU8sT0FBTyxHQUFHOzs7O0lBRXJCLElBQUksRUFBRSxVQUFVOzs7O0lBR2hCLE9BQU8sRUFBRSxhQUFhOzs7O0lBR3RCLE1BQU0sRUFBRSxZQUFZOzs7O0lBR3BCLFdBQVcsRUFBRSxpQkFBaUI7Ozs7SUFHOUIsT0FBTyxFQUFFLGFBQWE7Ozs7SUFHdEIsWUFBWSxFQUFFLGtCQUFrQjs7OztJQUdoQyxNQUFNLEVBQUUsWUFBWTtDQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNvcnREaXJlY3Rpb25OdW1iZXIgfSBmcm9tICcuLy4uL21vZGVscy9zb3J0RGlyZWN0aW9uTnVtYmVyLmVudW0nO1xyXG5pbXBvcnQgeyBkYXRlVXNTaG9ydFNvcnRlciB9IGZyb20gJy4vZGF0ZVVzU2hvcnRTb3J0ZXInO1xyXG5pbXBvcnQgeyBkYXRlU29ydGVyIH0gZnJvbSAnLi9kYXRlU29ydGVyJztcclxuaW1wb3J0IHsgZGF0ZUlzb1NvcnRlciB9IGZyb20gJy4vZGF0ZUlzb1NvcnRlcic7XHJcbmltcG9ydCB7IGRhdGVVc1NvcnRlciB9IGZyb20gJy4vZGF0ZVVzU29ydGVyJztcclxuaW1wb3J0IHsgbnVtZXJpY1NvcnRlciB9IGZyb20gJy4vbnVtZXJpY1NvcnRlcic7XHJcbmltcG9ydCB7IG9iamVjdFN0cmluZ1NvcnRlciB9IGZyb20gJy4vb2JqZWN0U3RyaW5nU29ydGVyJztcclxuaW1wb3J0IHsgc3RyaW5nU29ydGVyIH0gZnJvbSAnLi9zdHJpbmdTb3J0ZXInO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNvcnRlcnMgPSB7XHJcbiAgLyoqIFNvcnRlciBtZXRob2QgdG8gc29ydCB2YWx1ZXMgYnkgRGF0ZSBvYmplY3QgdHlwZSAqL1xyXG4gIGRhdGU6IGRhdGVTb3J0ZXIsXHJcblxyXG4gIC8qKiBTb3J0ZXIgbWV0aG9kIHRvIHNvcnQgdmFsdWVzIGJ5IERhdGUgZm9ybWF0dGVkIGFzIElTTyBkYXRlICovXHJcbiAgZGF0ZUlzbzogZGF0ZUlzb1NvcnRlcixcclxuXHJcbiAgLyoqIFNvcnRlciBtZXRob2QgdG8gc29ydCB2YWx1ZXMgYnkgRGF0ZSBmb3JtYXR0ZWQgYXMgVVMgZGF0ZSAqL1xyXG4gIGRhdGVVczogZGF0ZVVzU29ydGVyLFxyXG5cclxuICAvKiogU29ydGVyIG1ldGhvZCB0byBzb3J0IHZhbHVlcyBieSBEYXRlIGZvcm1hdHRlZCBhcyBVUyBzaG9ydCBkYXRlICovXHJcbiAgZGF0ZVVzU2hvcnQ6IGRhdGVVc1Nob3J0U29ydGVyLFxyXG5cclxuICAvKiogU29ydGVyIG1ldGhvZCB0byBzb3J0IHZhbHVlcyBhcyBudW1lcmljIGZpZWxkcyAqL1xyXG4gIG51bWVyaWM6IG51bWVyaWNTb3J0ZXIsXHJcblxyXG4gIC8qKiBTb3J0ZXIgbWV0aG9kIHRvIHNvcnQgb2JqZWN0IHZhbHVlcyB3aXRoIGEgXCJkYXRhS2V5XCIgcHJvdmlkZWQgd2hpY2ggaXQncyBvdXRwdXQgd2lsbCBiZSBvZiBzdHJpbmcgKGUuZy4gb2JqMVtkYXRhS2V5XSA9ICdKb2huJykgKi9cclxuICBvYmplY3RTdHJpbmc6IG9iamVjdFN0cmluZ1NvcnRlcixcclxuXHJcbiAgLyoqIFNvcnRlciBtZXRob2QgdG8gc29ydCB2YWx1ZXMgYXMgcmVndWxhciBzdHJpbmdzICovXHJcbiAgc3RyaW5nOiBzdHJpbmdTb3J0ZXJcclxufTtcclxuIl19