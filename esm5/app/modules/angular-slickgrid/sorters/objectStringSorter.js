/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var objectStringSorter = (/**
 * @param {?} value1
 * @param {?} value2
 * @param {?} sortDirection
 * @param {?} sortColumn
 * @return {?}
 */
function (value1, value2, sortDirection, sortColumn) {
    if (!sortColumn || !sortColumn.dataKey) {
        throw new Error('Sorting a "FieldType.object" requires you to provide the "dataKey" (object property name) of the object so that we can use it to sort correctly');
    }
    /** @type {?} */
    var stringValue1 = value1.hasOwnProperty(sortColumn.dataKey) ? value1[sortColumn.dataKey] : value1;
    /** @type {?} */
    var stringValue2 = value2.hasOwnProperty(sortColumn.dataKey) ? value2[sortColumn.dataKey] : value2;
    /** @type {?} */
    var position = 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0U3RyaW5nU29ydGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zb3J0ZXJzL29iamVjdFN0cmluZ1NvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE1BQU0sS0FBTyxrQkFBa0I7Ozs7Ozs7QUFBVyxVQUFDLE1BQVcsRUFBRSxNQUFXLEVBQUUsYUFBcUIsRUFBRSxVQUFrQjtJQUM1RyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRTtRQUN0QyxNQUFNLElBQUksS0FBSyxDQUFDLGlKQUFpSixDQUFDLENBQUM7S0FDcEs7O1FBRUssWUFBWSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNOztRQUM5RixZQUFZLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07O1FBRWhHLFFBQVEsR0FBRyxDQUFDO0lBQ2hCLElBQUksWUFBWSxLQUFLLElBQUksRUFBRTtRQUN6QixRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDZjtTQUFNLElBQUksWUFBWSxLQUFLLElBQUksRUFBRTtRQUNoQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0tBQ2Q7U0FBTSxJQUFJLFlBQVksS0FBSyxZQUFZLEVBQUU7UUFDeEMsUUFBUSxHQUFHLENBQUMsQ0FBQztLQUNkO1NBQU0sSUFBSSxhQUFhLEVBQUU7UUFDeEIsUUFBUSxHQUFHLFlBQVksR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakQ7U0FBTSxJQUFJLENBQUMsYUFBYSxFQUFFO1FBQ3pCLFFBQVEsR0FBRyxZQUFZLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pEO0lBQ0QsT0FBTyxhQUFhLEdBQUcsUUFBUSxDQUFDO0FBQ2xDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNvcnRlciB9IGZyb20gJy4vLi4vbW9kZWxzL3NvcnRlci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBDb2x1bW4gfSBmcm9tICcuLi9tb2RlbHMvY29sdW1uLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY29uc3Qgb2JqZWN0U3RyaW5nU29ydGVyOiBTb3J0ZXIgPSAodmFsdWUxOiBhbnksIHZhbHVlMjogYW55LCBzb3J0RGlyZWN0aW9uOiBudW1iZXIsIHNvcnRDb2x1bW46IENvbHVtbikgPT4ge1xyXG4gIGlmICghc29ydENvbHVtbiB8fCAhc29ydENvbHVtbi5kYXRhS2V5KSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnRpbmcgYSBcIkZpZWxkVHlwZS5vYmplY3RcIiByZXF1aXJlcyB5b3UgdG8gcHJvdmlkZSB0aGUgXCJkYXRhS2V5XCIgKG9iamVjdCBwcm9wZXJ0eSBuYW1lKSBvZiB0aGUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIHVzZSBpdCB0byBzb3J0IGNvcnJlY3RseScpO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc3RyaW5nVmFsdWUxID0gdmFsdWUxLmhhc093blByb3BlcnR5KHNvcnRDb2x1bW4uZGF0YUtleSkgPyB2YWx1ZTFbc29ydENvbHVtbi5kYXRhS2V5XSA6IHZhbHVlMTtcclxuICBjb25zdCBzdHJpbmdWYWx1ZTIgPSB2YWx1ZTIuaGFzT3duUHJvcGVydHkoc29ydENvbHVtbi5kYXRhS2V5KSA/IHZhbHVlMltzb3J0Q29sdW1uLmRhdGFLZXldIDogdmFsdWUyO1xyXG5cclxuICBsZXQgcG9zaXRpb24gPSAwO1xyXG4gIGlmIChzdHJpbmdWYWx1ZTEgPT09IG51bGwpIHtcclxuICAgIHBvc2l0aW9uID0gLTE7XHJcbiAgfSBlbHNlIGlmIChzdHJpbmdWYWx1ZTIgPT09IG51bGwpIHtcclxuICAgIHBvc2l0aW9uID0gMTtcclxuICB9IGVsc2UgaWYgKHN0cmluZ1ZhbHVlMSA9PT0gc3RyaW5nVmFsdWUyKSB7XHJcbiAgICBwb3NpdGlvbiA9IDA7XHJcbiAgfSBlbHNlIGlmIChzb3J0RGlyZWN0aW9uKSB7XHJcbiAgICBwb3NpdGlvbiA9IHN0cmluZ1ZhbHVlMSA8IHN0cmluZ1ZhbHVlMiA/IC0xIDogMTtcclxuICB9IGVsc2UgaWYgKCFzb3J0RGlyZWN0aW9uKSB7XHJcbiAgICBwb3NpdGlvbiA9IHN0cmluZ1ZhbHVlMSA8IHN0cmluZ1ZhbHVlMiA/IDEgOiAtMTtcclxuICB9XHJcbiAgcmV0dXJuIHNvcnREaXJlY3Rpb24gKiBwb3NpdGlvbjtcclxufTtcclxuIl19