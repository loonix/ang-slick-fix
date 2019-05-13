/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const stringSorter = (/**
 * @param {?} value1
 * @param {?} value2
 * @param {?} sortDirection
 * @return {?}
 */
(value1, value2, sortDirection) => {
    /** @type {?} */
    let position;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nU29ydGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zb3J0ZXJzL3N0cmluZ1NvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE1BQU0sT0FBTyxZQUFZOzs7Ozs7QUFBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUU7O1FBQ2hFLFFBQVE7SUFDWixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7UUFDbkIsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ2Y7U0FBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7UUFDMUIsUUFBUSxHQUFHLENBQUMsQ0FBQztLQUNkO1NBQU0sSUFBSSxNQUFNLEtBQUssTUFBTSxFQUFFO1FBQzVCLFFBQVEsR0FBRyxDQUFDLENBQUM7S0FDZDtTQUFNLElBQUksYUFBYSxFQUFFO1FBQ3hCLFFBQVEsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3JDO1NBQU07UUFDTCxRQUFRLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNyQztJQUNELE9BQU8sYUFBYSxHQUFHLFFBQVEsQ0FBQztBQUNsQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb3J0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5cbmV4cG9ydCBjb25zdCBzdHJpbmdTb3J0ZXI6IFNvcnRlciA9ICh2YWx1ZTEsIHZhbHVlMiwgc29ydERpcmVjdGlvbikgPT4ge1xuICBsZXQgcG9zaXRpb247XG4gIGlmICh2YWx1ZTEgPT09IG51bGwpIHtcbiAgICBwb3NpdGlvbiA9IC0xO1xuICB9IGVsc2UgaWYgKHZhbHVlMiA9PT0gbnVsbCkge1xuICAgIHBvc2l0aW9uID0gMTtcbiAgfSBlbHNlIGlmICh2YWx1ZTEgPT09IHZhbHVlMikge1xuICAgIHBvc2l0aW9uID0gMDtcbiAgfSBlbHNlIGlmIChzb3J0RGlyZWN0aW9uKSB7XG4gICAgcG9zaXRpb24gPSB2YWx1ZTEgPCB2YWx1ZTIgPyAtMSA6IDE7XG4gIH0gZWxzZSB7XG4gICAgcG9zaXRpb24gPSB2YWx1ZTEgPCB2YWx1ZTIgPyAxIDogLTE7XG4gIH1cbiAgcmV0dXJuIHNvcnREaXJlY3Rpb24gKiBwb3NpdGlvbjtcbn07XG4iXX0=