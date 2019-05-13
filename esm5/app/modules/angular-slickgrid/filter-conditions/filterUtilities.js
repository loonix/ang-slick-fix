/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Compare 2 objects,
 * we will loop through all properties of the object to compare the entire content of both objects
 * Optionally we can compare by a property key, when that is provided we will compare the object content
 * \@param o1
 * \@param o2
 * \@param compareKey optional
 * @type {?}
 */
export var compareObjects = (/**
 * @param {?} o1
 * @param {?} o2
 * @param {?=} compareKey
 * @return {?}
 */
function (o1, o2, compareKey) {
    // if user provided an object compare key then compare directly both objects by that key
    if (compareKey && (o1.hasOwnProperty(compareKey) || o2.hasOwnProperty(compareKey))) {
        return o1[compareKey] === o2 || o1 === o2[compareKey] || o1[compareKey] === o2[compareKey];
    }
    // loop through all object properties to compare the full content of the object
    for (var p in o1) {
        if (o1.hasOwnProperty(p)) {
            if (o1[p] !== o2[p]) {
                return false;
            }
        }
    }
    for (var p in o2) {
        if (o2.hasOwnProperty(p)) {
            if (o1[p] !== o2[p]) {
                return false;
            }
        }
    }
    return true;
});
/** @type {?} */
export var testFilterCondition = (/**
 * @param {?} operator
 * @param {?} value1
 * @param {?} value2
 * @return {?}
 */
function (operator, value1, value2) {
    switch (operator) {
        case '<':
        case 'LT': return (value1 < value2);
        case '<=':
        case 'LE': return (value1 <= value2);
        case '>':
        case 'GT': return (value1 > value2);
        case '>=':
        case 'GE': return (value1 >= value2);
        case '!=':
        case '<>':
        case 'NE': return (value1 !== value2);
        case '=':
        case '==':
        case 'EQ': return (value1 === value2);
        case 'IN': return ((value2 && value2.includes) ? (value2.includes(value1)) : false);
        case 'NIN':
        case 'NOT_IN':
            return ((value2 && value2.includes) ? (!value2.includes(value1)) : false);
        case 'IN_CONTAINS':
            if (value2 && Array.isArray(value2) && value2.findIndex) {
                return ((value2.findIndex((/**
                 * @param {?} val
                 * @return {?}
                 */
                function (val) { return value1.indexOf(val) > -1; }))) > -1);
            }
            return false;
        case 'NIN_CONTAINS':
        case 'NOT_IN_CONTAINS':
            if (value2 && Array.isArray(value2) && value2.findIndex) {
                return !((value2.findIndex((/**
                 * @param {?} val
                 * @return {?}
                 */
                function (val) { return value1.indexOf(val) > -1; }))) > -1);
            }
            return false;
    }
    return true;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyVXRpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXItY29uZGl0aW9ucy9maWx0ZXJVdGlsaXRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVFBLE1BQU0sS0FBTyxjQUFjOzs7Ozs7QUFBRyxVQUFDLEVBQU8sRUFBRSxFQUFPLEVBQUUsVUFBbUI7SUFDbEUsd0ZBQXdGO0lBQ3hGLElBQUksVUFBVSxJQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUU7UUFDbEYsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUM1RjtJQUVELCtFQUErRTtJQUMvRSxLQUFLLElBQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNsQixJQUFJLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDeEIsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNuQixPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7S0FDRjtJQUNELEtBQUssSUFBTSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2xCLElBQUksRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN4QixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ25CLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7U0FDRjtLQUNGO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUE7O0FBRUQsTUFBTSxLQUFPLG1CQUFtQjs7Ozs7O0FBQUcsVUFBQyxRQUFnQixFQUFFLE1BQVcsRUFBRSxNQUFXO0lBQzVFLFFBQVEsUUFBUSxFQUFFO1FBQ2hCLEtBQUssR0FBRyxDQUFDO1FBQ1QsS0FBSyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLEtBQUssSUFBSSxDQUFDO1FBQ1YsS0FBSyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLEtBQUssR0FBRyxDQUFDO1FBQ1QsS0FBSyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLEtBQUssSUFBSSxDQUFDO1FBQ1YsS0FBSyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLEtBQUssSUFBSSxDQUFDO1FBQ1YsS0FBSyxJQUFJLENBQUM7UUFDVixLQUFLLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUM7UUFDdEMsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLElBQUksQ0FBQztRQUNWLEtBQUssSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQztRQUN0QyxLQUFLLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRixLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssUUFBUTtZQUNYLE9BQU8sQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVFLEtBQUssYUFBYTtZQUNoQixJQUFJLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7Z0JBQ3ZELE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7O2dCQUFDLFVBQUMsR0FBRyxJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBeEIsQ0FBd0IsRUFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNyRTtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsS0FBSyxjQUFjLENBQUM7UUFDcEIsS0FBSyxpQkFBaUI7WUFDdEIsSUFBSSxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFO2dCQUN2RCxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7O2dCQUFDLFVBQUMsR0FBRyxJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBeEIsQ0FBd0IsRUFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0RTtZQUNELE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDWixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ29tcGFyZSAyIG9iamVjdHMsXHJcbiAqIHdlIHdpbGwgbG9vcCB0aHJvdWdoIGFsbCBwcm9wZXJ0aWVzIG9mIHRoZSBvYmplY3QgdG8gY29tcGFyZSB0aGUgZW50aXJlIGNvbnRlbnQgb2YgYm90aCBvYmplY3RzXHJcbiAqIE9wdGlvbmFsbHkgd2UgY2FuIGNvbXBhcmUgYnkgYSBwcm9wZXJ0eSBrZXksIHdoZW4gdGhhdCBpcyBwcm92aWRlZCB3ZSB3aWxsIGNvbXBhcmUgdGhlIG9iamVjdCBjb250ZW50XHJcbiAqIEBwYXJhbSBvMVxyXG4gKiBAcGFyYW0gbzJcclxuICogQHBhcmFtIGNvbXBhcmVLZXkgb3B0aW9uYWxcclxuICovXHJcbmV4cG9ydCBjb25zdCBjb21wYXJlT2JqZWN0cyA9IChvMTogYW55LCBvMjogYW55LCBjb21wYXJlS2V5Pzogc3RyaW5nKSA9PiB7XHJcbiAgLy8gaWYgdXNlciBwcm92aWRlZCBhbiBvYmplY3QgY29tcGFyZSBrZXkgdGhlbiBjb21wYXJlIGRpcmVjdGx5IGJvdGggb2JqZWN0cyBieSB0aGF0IGtleVxyXG4gIGlmIChjb21wYXJlS2V5ICYmIChvMS5oYXNPd25Qcm9wZXJ0eShjb21wYXJlS2V5KSB8fCBvMi5oYXNPd25Qcm9wZXJ0eShjb21wYXJlS2V5KSkpIHtcclxuICAgIHJldHVybiBvMVtjb21wYXJlS2V5XSA9PT0gbzIgfHwgbzEgPT09IG8yW2NvbXBhcmVLZXldIHx8IG8xW2NvbXBhcmVLZXldID09PSBvMltjb21wYXJlS2V5XTtcclxuICB9XHJcblxyXG4gIC8vIGxvb3AgdGhyb3VnaCBhbGwgb2JqZWN0IHByb3BlcnRpZXMgdG8gY29tcGFyZSB0aGUgZnVsbCBjb250ZW50IG9mIHRoZSBvYmplY3RcclxuICBmb3IgKGNvbnN0IHAgaW4gbzEpIHtcclxuICAgIGlmIChvMS5oYXNPd25Qcm9wZXJ0eShwKSkge1xyXG4gICAgICBpZiAobzFbcF0gIT09IG8yW3BdKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZvciAoY29uc3QgcCBpbiBvMikge1xyXG4gICAgaWYgKG8yLmhhc093blByb3BlcnR5KHApKSB7XHJcbiAgICAgIGlmIChvMVtwXSAhPT0gbzJbcF0pIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdGVzdEZpbHRlckNvbmRpdGlvbiA9IChvcGVyYXRvcjogc3RyaW5nLCB2YWx1ZTE6IGFueSwgdmFsdWUyOiBhbnkpOiBib29sZWFuID0+IHtcclxuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XHJcbiAgICBjYXNlICc8JzpcclxuICAgIGNhc2UgJ0xUJzogcmV0dXJuICh2YWx1ZTEgPCB2YWx1ZTIpO1xyXG4gICAgY2FzZSAnPD0nOlxyXG4gICAgY2FzZSAnTEUnOiByZXR1cm4gKHZhbHVlMSA8PSB2YWx1ZTIpO1xyXG4gICAgY2FzZSAnPic6XHJcbiAgICBjYXNlICdHVCc6IHJldHVybiAodmFsdWUxID4gdmFsdWUyKTtcclxuICAgIGNhc2UgJz49JzpcclxuICAgIGNhc2UgJ0dFJzogcmV0dXJuICh2YWx1ZTEgPj0gdmFsdWUyKTtcclxuICAgIGNhc2UgJyE9JzpcclxuICAgIGNhc2UgJzw+JzpcclxuICAgIGNhc2UgJ05FJzogcmV0dXJuICh2YWx1ZTEgIT09IHZhbHVlMik7XHJcbiAgICBjYXNlICc9JzpcclxuICAgIGNhc2UgJz09JzpcclxuICAgIGNhc2UgJ0VRJzogcmV0dXJuICh2YWx1ZTEgPT09IHZhbHVlMik7XHJcbiAgICBjYXNlICdJTic6IHJldHVybiAoKHZhbHVlMiAmJiB2YWx1ZTIuaW5jbHVkZXMpID8gKHZhbHVlMi5pbmNsdWRlcyh2YWx1ZTEpKSA6IGZhbHNlKTtcclxuICAgIGNhc2UgJ05JTic6XHJcbiAgICBjYXNlICdOT1RfSU4nOlxyXG4gICAgICByZXR1cm4gKCh2YWx1ZTIgJiYgdmFsdWUyLmluY2x1ZGVzKSA/ICghdmFsdWUyLmluY2x1ZGVzKHZhbHVlMSkpIDogZmFsc2UpO1xyXG4gICAgY2FzZSAnSU5fQ09OVEFJTlMnOlxyXG4gICAgICBpZiAodmFsdWUyICYmIEFycmF5LmlzQXJyYXkodmFsdWUyKSAmJiB2YWx1ZTIuZmluZEluZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuICgodmFsdWUyLmZpbmRJbmRleCgodmFsKSA9PiB2YWx1ZTEuaW5kZXhPZih2YWwpID4gLTEpKSA+IC0xKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBjYXNlICdOSU5fQ09OVEFJTlMnOlxyXG4gICAgY2FzZSAnTk9UX0lOX0NPTlRBSU5TJzpcclxuICAgIGlmICh2YWx1ZTIgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZTIpICYmIHZhbHVlMi5maW5kSW5kZXgpIHtcclxuICAgICAgcmV0dXJuICEoKHZhbHVlMi5maW5kSW5kZXgoKHZhbCkgPT4gdmFsdWUxLmluZGV4T2YodmFsKSA+IC0xKSkgPiAtMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxucmV0dXJuIHRydWU7XHJcbn07XHJcbiJdfQ==