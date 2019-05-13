/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const objectStringSorter = (/**
 * @param {?} value1
 * @param {?} value2
 * @param {?} sortDirection
 * @param {?} sortColumn
 * @return {?}
 */
(value1, value2, sortDirection, sortColumn) => {
    if (!sortColumn || !sortColumn.dataKey) {
        throw new Error('Sorting a "FieldType.object" requires you to provide the "dataKey" (object property name) of the object so that we can use it to sort correctly');
    }
    /** @type {?} */
    const stringValue1 = value1.hasOwnProperty(sortColumn.dataKey) ? value1[sortColumn.dataKey] : value1;
    /** @type {?} */
    const stringValue2 = value2.hasOwnProperty(sortColumn.dataKey) ? value2[sortColumn.dataKey] : value2;
    /** @type {?} */
    let position = 0;
    if (stringValue1 === null) {
        position = -1;
    }
    else if (stringValue2 === null) {
        position = 1;
    }
    else if (stringValue1 === stringValue2) {
        position = 0;
    }
    else if (sortDirection) {
        position = stringValue1 < stringValue2 ? -1 : 1;
    }
    else if (!sortDirection) {
        position = stringValue1 < stringValue2 ? 1 : -1;
    }
    return sortDirection * position;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0U3RyaW5nU29ydGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zb3J0ZXJzL29iamVjdFN0cmluZ1NvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE1BQU0sT0FBTyxrQkFBa0I7Ozs7Ozs7QUFBVyxDQUFDLE1BQVcsRUFBRSxNQUFXLEVBQUUsYUFBcUIsRUFBRSxVQUFrQixFQUFFLEVBQUU7SUFDaEgsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7UUFDdEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpSkFBaUosQ0FBQyxDQUFDO0tBQ3BLOztVQUVLLFlBQVksR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTTs7VUFDOUYsWUFBWSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNOztRQUVoRyxRQUFRLEdBQUcsQ0FBQztJQUNoQixJQUFJLFlBQVksS0FBSyxJQUFJLEVBQUU7UUFDekIsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ2Y7U0FBTSxJQUFJLFlBQVksS0FBSyxJQUFJLEVBQUU7UUFDaEMsUUFBUSxHQUFHLENBQUMsQ0FBQztLQUNkO1NBQU0sSUFBSSxZQUFZLEtBQUssWUFBWSxFQUFFO1FBQ3hDLFFBQVEsR0FBRyxDQUFDLENBQUM7S0FDZDtTQUFNLElBQUksYUFBYSxFQUFFO1FBQ3hCLFFBQVEsR0FBRyxZQUFZLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pEO1NBQU0sSUFBSSxDQUFDLGFBQWEsRUFBRTtRQUN6QixRQUFRLEdBQUcsWUFBWSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqRDtJQUNELE9BQU8sYUFBYSxHQUFHLFFBQVEsQ0FBQztBQUNsQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb3J0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9zb3J0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ29sdW1uIH0gZnJvbSAnLi4vbW9kZWxzL2NvbHVtbi5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNvbnN0IG9iamVjdFN0cmluZ1NvcnRlcjogU29ydGVyID0gKHZhbHVlMTogYW55LCB2YWx1ZTI6IGFueSwgc29ydERpcmVjdGlvbjogbnVtYmVyLCBzb3J0Q29sdW1uOiBDb2x1bW4pID0+IHtcclxuICBpZiAoIXNvcnRDb2x1bW4gfHwgIXNvcnRDb2x1bW4uZGF0YUtleSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdTb3J0aW5nIGEgXCJGaWVsZFR5cGUub2JqZWN0XCIgcmVxdWlyZXMgeW91IHRvIHByb3ZpZGUgdGhlIFwiZGF0YUtleVwiIChvYmplY3QgcHJvcGVydHkgbmFtZSkgb2YgdGhlIG9iamVjdCBzbyB0aGF0IHdlIGNhbiB1c2UgaXQgdG8gc29ydCBjb3JyZWN0bHknKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHN0cmluZ1ZhbHVlMSA9IHZhbHVlMS5oYXNPd25Qcm9wZXJ0eShzb3J0Q29sdW1uLmRhdGFLZXkpID8gdmFsdWUxW3NvcnRDb2x1bW4uZGF0YUtleV0gOiB2YWx1ZTE7XHJcbiAgY29uc3Qgc3RyaW5nVmFsdWUyID0gdmFsdWUyLmhhc093blByb3BlcnR5KHNvcnRDb2x1bW4uZGF0YUtleSkgPyB2YWx1ZTJbc29ydENvbHVtbi5kYXRhS2V5XSA6IHZhbHVlMjtcclxuXHJcbiAgbGV0IHBvc2l0aW9uID0gMDtcclxuICBpZiAoc3RyaW5nVmFsdWUxID09PSBudWxsKSB7XHJcbiAgICBwb3NpdGlvbiA9IC0xO1xyXG4gIH0gZWxzZSBpZiAoc3RyaW5nVmFsdWUyID09PSBudWxsKSB7XHJcbiAgICBwb3NpdGlvbiA9IDE7XHJcbiAgfSBlbHNlIGlmIChzdHJpbmdWYWx1ZTEgPT09IHN0cmluZ1ZhbHVlMikge1xyXG4gICAgcG9zaXRpb24gPSAwO1xyXG4gIH0gZWxzZSBpZiAoc29ydERpcmVjdGlvbikge1xyXG4gICAgcG9zaXRpb24gPSBzdHJpbmdWYWx1ZTEgPCBzdHJpbmdWYWx1ZTIgPyAtMSA6IDE7XHJcbiAgfSBlbHNlIGlmICghc29ydERpcmVjdGlvbikge1xyXG4gICAgcG9zaXRpb24gPSBzdHJpbmdWYWx1ZTEgPCBzdHJpbmdWYWx1ZTIgPyAxIDogLTE7XHJcbiAgfVxyXG4gIHJldHVybiBzb3J0RGlyZWN0aW9uICogcG9zaXRpb247XHJcbn07XHJcbiJdfQ==