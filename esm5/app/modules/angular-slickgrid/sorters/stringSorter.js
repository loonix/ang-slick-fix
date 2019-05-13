/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var stringSorter = (/**
 * @param {?} value1
 * @param {?} value2
 * @param {?} sortDirection
 * @return {?}
 */
function (value1, value2, sortDirection) {
    /** @type {?} */
    var position;
    if (value1 === null) {
        position = -1;
    }
    else if (value2 === null) {
        position = 1;
    }
    else if (value1 === value2) {
        position = 0;
    }
    else if (sortDirection) {
        position = value1 < value2 ? -1 : 1;
    }
    else {
        position = value1 < value2 ? 1 : -1;
    }
    return sortDirection * position;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nU29ydGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zb3J0ZXJzL3N0cmluZ1NvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE1BQU0sS0FBTyxZQUFZOzs7Ozs7QUFBVyxVQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYTs7UUFDNUQsUUFBUTtJQUNaLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtRQUNuQixRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDZjtTQUFNLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtRQUMxQixRQUFRLEdBQUcsQ0FBQyxDQUFDO0tBQ2Q7U0FBTSxJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUU7UUFDNUIsUUFBUSxHQUFHLENBQUMsQ0FBQztLQUNkO1NBQU0sSUFBSSxhQUFhLEVBQUU7UUFDeEIsUUFBUSxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDckM7U0FBTTtRQUNMLFFBQVEsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3JDO0lBQ0QsT0FBTyxhQUFhLEdBQUcsUUFBUSxDQUFDO0FBQ2xDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNvcnRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcblxuZXhwb3J0IGNvbnN0IHN0cmluZ1NvcnRlcjogU29ydGVyID0gKHZhbHVlMSwgdmFsdWUyLCBzb3J0RGlyZWN0aW9uKSA9PiB7XG4gIGxldCBwb3NpdGlvbjtcbiAgaWYgKHZhbHVlMSA9PT0gbnVsbCkge1xuICAgIHBvc2l0aW9uID0gLTE7XG4gIH0gZWxzZSBpZiAodmFsdWUyID09PSBudWxsKSB7XG4gICAgcG9zaXRpb24gPSAxO1xuICB9IGVsc2UgaWYgKHZhbHVlMSA9PT0gdmFsdWUyKSB7XG4gICAgcG9zaXRpb24gPSAwO1xuICB9IGVsc2UgaWYgKHNvcnREaXJlY3Rpb24pIHtcbiAgICBwb3NpdGlvbiA9IHZhbHVlMSA8IHZhbHVlMiA/IC0xIDogMTtcbiAgfSBlbHNlIHtcbiAgICBwb3NpdGlvbiA9IHZhbHVlMSA8IHZhbHVlMiA/IDEgOiAtMTtcbiAgfVxuICByZXR1cm4gc29ydERpcmVjdGlvbiAqIHBvc2l0aW9uO1xufTtcbiJdfQ==