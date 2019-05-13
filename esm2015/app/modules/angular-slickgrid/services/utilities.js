/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FieldType, OperatorType } from '../models/index';
import { Observable } from 'rxjs';
import { first, take } from 'rxjs/operators';
import * as moment_ from 'moment-mini';
/** @type {?} */
const moment = moment_;
/**
 * Simple function to which will loop and create as demanded the number of white spaces,
 * this will be used in the Excel export
 * @param {?} nbSpaces
 * @return {?}
 */
export function addWhiteSpaces(nbSpaces) {
    /** @type {?} */
    let result = '';
    for (let i = 0; i < nbSpaces; i++) {
        result += ' ';
    }
    return result;
}
/**
 * HTML encode using jQuery
 * @param {?} value
 * @return {?}
 */
export function htmlEncode(value) {
    // create a in-memory div, set it's inner text(which jQuery automatically encodes)
    // then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}
/**
 * HTML decode using jQuery
 * @param {?} value
 * @return {?}
 */
export function htmlDecode(value) {
    return $('<div/>').html(value).text();
}
/**
 * decode text into html entity
 * @param {?} input
 * @return {?}
 */
export function htmlEntityDecode(input) {
    return input.replace(/&#(\d+);/g, (/**
     * @param {?} match
     * @param {?} dec
     * @return {?}
     */
    function (match, dec) {
        return String.fromCharCode(dec);
    }));
}
/**
 * decode text into html entity
 * @param {?} input
 * @return {?}
 */
export function htmlEntityEncode(input) {
    /** @type {?} */
    const buf = [];
    for (let i = input.length - 1; i >= 0; i--) {
        buf.unshift(['&#', input[i].charCodeAt(), ';'].join(''));
    }
    return buf.join('');
}
/**
 * Compares two arrays to determine if all the items are equal
 * @param {?} a first array
 * @param {?} b second array to compare with a
 * @param {?=} orderMatters
 * @return {?} boolean true if equal, else false
 */
export function arraysEqual(a, b, orderMatters = false) {
    if (a === b) {
        return true;
    }
    if (!a || !b) {
        return false;
    }
    if (a.length !== b.length) {
        return false;
    }
    if (!orderMatters) {
        a.sort();
        b.sort();
    }
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
/**
 * Try casting an input of type Promise | Observable into a Promise type.
 * @template T
 * @param {?} input
 * @param {?=} fromServiceName string representing the caller service name and will be used if we throw a casting problem error
 * @return {?}
 */
export function castToPromise(input, fromServiceName = '') {
    /** @type {?} */
    let promise = input;
    if (input instanceof Promise) {
        // if it's already a Promise then return it
        return input;
    }
    else if (input instanceof Observable) {
        promise = input.pipe(first()).toPromise();
        if (!(promise instanceof Promise)) {
            promise = input.pipe(take(1)).toPromise();
        }
        if (!(promise instanceof Promise)) {
            throw new Error(`Something went wrong, Angular-Slickgrid ${fromServiceName} is not able to convert the Observable into a Promise.
        If you are using Angular HttpClient, you could try converting your http call to a Promise with ".toPromise()"
        for example::  this.http.post('graphql', { query: graphqlQuery }).toPromise()
        `);
        }
    }
    return promise;
}
/**
 * Uses the logic function to find an item in an array or returns the default
 * value provided (empty object by default)
 * @param {?} array
 * @param {?} logic
 * @param {?=} defaultVal
 * @return {?} object the found object or default value
 */
export function findOrDefault(array, logic, defaultVal = {}) {
    return array.find(logic) || defaultVal;
}
/**
 * Take a number (or a string) and display it as a formatted decimal string with defined minimum and maximum decimals
 * @param {?} input
 * @param {?=} minDecimal
 * @param {?=} maxDecimal
 * @return {?}
 */
export function decimalFormatted(input, minDecimal, maxDecimal) {
    if (isNaN(+input)) {
        return input;
    }
    /** @type {?} */
    const minDec = (minDecimal === undefined) ? 2 : minDecimal;
    /** @type {?} */
    const maxDec = (maxDecimal === undefined) ? 2 : maxDecimal;
    /** @type {?} */
    let amount = String(Math.round(+input * Math.pow(10, maxDec)) / Math.pow(10, maxDec));
    if (amount.indexOf('.') < 0) {
        amount += '.';
    }
    while ((amount.length - amount.indexOf('.')) <= minDec) {
        amount += '0';
    }
    return amount;
}
/**
 * From a dot (.) notation find and return a property within an object given a path
 * @param {?} obj
 * @param {?} path
 * @return {?}
 */
export function getDescendantProperty(obj, path) {
    return path.split('.').reduce((/**
     * @param {?} acc
     * @param {?} part
     * @return {?}
     */
    (acc, part) => acc && acc[part]), obj);
}
/**
 * Get the browser's scrollbar width, this is different to each browser
 * @return {?}
 */
export function getScrollBarWidth() {
    /** @type {?} */
    const $outer = $('<div>').css({ visibility: 'hidden', width: 100, overflow: 'scroll' }).appendTo('body');
    /** @type {?} */
    const widthWithScroll = $('<div>').css({ width: '100%' }).appendTo($outer).outerWidth();
    $outer.remove();
    return Math.ceil(100 - widthWithScroll);
}
/**
 * From a Date FieldType, return it's equivalent moment.js format
 * refer to moment.js for the format standard used: https://momentjs.com/docs/#/parsing/string-format/
 * @param {?} fieldType
 * @return {?}
 */
export function mapMomentDateFormatWithFieldType(fieldType) {
    /** @type {?} */
    let map;
    switch (fieldType) {
        case FieldType.dateTime:
        case FieldType.dateTimeIso:
            map = 'YYYY-MM-DD HH:mm:ss';
            break;
        case FieldType.dateTimeShortIso:
            map = 'YYYY-MM-DD HH:mm';
            break;
        case FieldType.dateTimeIsoAmPm:
            map = 'YYYY-MM-DD hh:mm:ss a';
            break;
        case FieldType.dateTimeIsoAM_PM:
            map = 'YYYY-MM-DD hh:mm:ss A';
            break;
        case FieldType.dateUs:
            map = 'MM/DD/YYYY';
            break;
        case FieldType.dateUsShort:
            map = 'M/D/YY';
            break;
        case FieldType.dateTimeUs:
            map = 'MM/DD/YYYY HH:mm:ss';
            break;
        case FieldType.dateTimeShortUs:
            map = 'MM/DD/YYYY HH:mm';
            break;
        case FieldType.dateTimeUsAmPm:
            map = 'MM/DD/YYYY hh:mm:ss a';
            break;
        case FieldType.dateTimeUsAM_PM:
            map = 'MM/DD/YYYY hh:mm:ss A';
            break;
        case FieldType.dateTimeUsShort:
            map = 'M/D/YY H:m:s';
            break;
        case FieldType.dateTimeUsShortAmPm:
            map = 'M/D/YY h:m:s a';
            break;
        case FieldType.dateUtc:
            map = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
            break;
        case FieldType.date:
        case FieldType.dateIso:
        default:
            map = 'YYYY-MM-DD';
            break;
    }
    return map;
}
/**
 * From a Date FieldType, return it's equivalent Flatpickr format
 * refer to Flatpickr for the format standard used: https://chmln.github.io/flatpickr/formatting/#date-formatting-tokens
 * also note that they seem very similar to PHP format (except for am/pm): http://php.net/manual/en/function.date.php
 * @param {?} fieldType
 * @return {?}
 */
export function mapFlatpickrDateFormatWithFieldType(fieldType) {
    /*
        d: Day of the month, 2 digits with leading zeros	01 to 31
        D: A textual representation of a day	Mon through Sun
        l: (lowercase 'L')	A full textual representation of the day of the week	Sunday through Saturday
        j: Day of the month without leading zeros	1 to 31
        J: Day of the month without leading zeros and ordinal suffix	1st, 2nd, to 31st
        w: Numeric representation of the day of the week	0 (for Sunday) through 6 (for Saturday)
        F: A full textual representation of a month	January through December
        m: Numeric representation of a month, with leading zero	01 through 12
        n: Numeric representation of a month, without leading zeros	1 through 12
        M: A short textual representation of a month	Jan through Dec
        U: The number of seconds since the Unix Epoch	1413704993
        y: A two digit representation of a year	99 or 03
        Y: A full numeric representation of a year, 4 digits	1999 or 2003
        H: Hours (24 hours)	00 to 23
        h: Hours	1 to 12
        i: Minutes	00 to 59
        S: Seconds, 2 digits	00 to 59
        s: Seconds	0, 1 to 59
        K: AM/PM	AM or PM
      */
    /** @type {?} */
    let map;
    switch (fieldType) {
        case FieldType.dateTime:
        case FieldType.dateTimeIso:
            map = 'Y-m-d H:i:S';
            break;
        case FieldType.dateTimeShortIso:
            map = 'Y-m-d H:i';
            break;
        case FieldType.dateTimeIsoAmPm:
            map = 'Y-m-d h:i:S K'; // there is no lowercase in Flatpickr :(
            break;
        case FieldType.dateTimeIsoAM_PM:
            map = 'Y-m-d h:i:S K';
            break;
        case FieldType.dateUs:
            map = 'm/d/Y';
            break;
        case FieldType.dateUsShort:
            map = 'm/d/y';
            break;
        case FieldType.dateTimeUs:
            map = 'm/d/Y H:i:S';
            break;
        case FieldType.dateTimeShortUs:
            map = 'm/d/y H:i';
            break;
        case FieldType.dateTimeUsAmPm:
            map = 'm/d/Y h:i:S K'; // there is no lowercase in Flatpickr :(
            break;
        case FieldType.dateTimeUsAM_PM:
            map = 'm/d/Y h:i:s K';
            break;
        case FieldType.dateTimeUsShort:
            map = 'm/d/y H:i:s';
            break;
        case FieldType.dateTimeUsShortAmPm:
            map = 'm/d/y h:i:s K'; // there is no lowercase in Flatpickr :(
            break;
        case FieldType.dateUtc:
            map = 'Z';
            break;
        case FieldType.date:
        case FieldType.dateIso:
        default:
            map = 'Y-m-d';
            break;
    }
    return map;
}
/**
 * Mapper for query operators (ex.: <= is "le", > is "gt")
 * @param {?} operator
 * @return {?} string map
 */
export function mapOperatorType(operator) {
    /** @type {?} */
    let map;
    switch (operator) {
        case '<':
            map = OperatorType.lessThan;
            break;
        case '<=':
            map = OperatorType.lessThanOrEqual;
            break;
        case '>':
            map = OperatorType.greaterThan;
            break;
        case '>=':
            map = OperatorType.greaterThanOrEqual;
            break;
        case '<>':
        case '!=':
        case 'neq':
        case 'NEQ':
            map = OperatorType.notEqual;
            break;
        case '*':
        case '.*':
        case 'startsWith':
            map = OperatorType.startsWith;
            break;
        case '*.':
        case 'endsWith':
            map = OperatorType.endsWith;
            break;
        case '=':
        case '==':
        case 'eq':
        case 'EQ':
            map = OperatorType.equal;
            break;
        case 'in':
        case 'IN':
            map = OperatorType.in;
            break;
        case 'notIn':
        case 'NIN':
        case 'NOT_IN':
            map = OperatorType.notIn;
            break;
        default:
            map = OperatorType.contains;
            break;
    }
    return map;
}
/**
 * Mapper for query operator by a Filter Type
 * For example a multiple-select typically uses 'IN' operator
 * @param {?} fieldType
 * @return {?} string map
 */
export function mapOperatorByFieldType(fieldType) {
    /** @type {?} */
    let map;
    switch (fieldType) {
        case FieldType.string:
        case FieldType.unknown:
            map = OperatorType.contains;
            break;
        case FieldType.float:
        case FieldType.number:
        case FieldType.date:
        case FieldType.dateIso:
        case FieldType.date:
        case FieldType.dateUtc:
        case FieldType.dateTime:
        case FieldType.dateTimeIso:
        case FieldType.dateTimeIsoAmPm:
        case FieldType.dateTimeIsoAM_PM:
        case FieldType.dateUs:
        case FieldType.dateUsShort:
        case FieldType.dateTimeUs:
        case FieldType.dateTimeUsAmPm:
        case FieldType.dateTimeUsAM_PM:
        case FieldType.dateTimeUsShort:
        case FieldType.dateTimeUsShortAmPm:
        case FieldType.dateTimeUsShortAM_PM:
        default:
            map = OperatorType.equal;
            break;
    }
    return map;
}
/**
 * Parse any input (bool, number, string) and return a boolean or False when not possible
 * @param {?} input
 * @return {?}
 */
export function parseBoolean(input) {
    return /(true|1)/i.test(input + '');
}
/**
 * Parse a date passed as a string and return a Date object (if valid)
 * @param {?} inputDateString
 * @param {?} useUtc
 * @return {?} string date formatted
 */
export function parseUtcDate(inputDateString, useUtc) {
    /** @type {?} */
    let date = null;
    if (/^[0-9\-\/]*$/.test(inputDateString)) {
        // get the UTC datetime with moment.js but we need to decode the value so that it's valid text
        /** @type {?} */
        const dateString = decodeURIComponent(inputDateString);
        /** @type {?} */
        const dateMoment = moment(new Date(dateString));
        if (dateMoment.isValid() && dateMoment.year().toString().length === 4) {
            date = (useUtc) ? dateMoment.utc().format() : dateMoment.format();
        }
    }
    return date;
}
/**
 * Sanitize, return only the text without HTML tags
 * \@input htmlString
 * @param {?} htmlString
 * @return {?} text
 */
export function sanitizeHtmlToText(htmlString) {
    /** @type {?} */
    const temp = document.createElement('div');
    temp.innerHTML = htmlString;
    return temp.textContent || temp.innerText;
}
/**
 * Title case the complete sentence (upper case first char of each word while changing everything else to lower case)
 * @param {?} string
 * @return {?} string
 */
export function titleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
/**
 * Converts a string to camel case
 * @param {?} str the string to convert
 * @return {?} the string in camel case
 */
export function toCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|[\s+\-_\/])/g, (/**
     * @param {?} match
     * @param {?} offset
     * @return {?}
     */
    (match, offset) => {
        // remove white space or hypens or underscores
        if (/[\s+\-_\/]/.test(match)) {
            return '';
        }
        return offset === 0 ? match.toLowerCase() : match.toUpperCase();
    }));
}
/**
 * Converts a string to kebab (hypen) case
 * @param {?} str the string to convert
 * @return {?} the string in kebab case
 */
export function toKebabCase(str) {
    return toCamelCase(str).replace(/([A-Z])/g, '-$1').toLowerCase();
}
/**
 * Takes an input array and makes sure the array has unique values by removing duplicates
 * @param {?} arr
 * @return {?} array output without duplicates
 */
export function uniqueArray(arr) {
    return arr.filter((/**
     * @param {?} item
     * @param {?} index
     * @return {?}
     */
    (item, index) => {
        return arr.indexOf(item) >= index;
    }));
}
/**
 * Unsubscribe all Observables Subscriptions
 * It will return an empty array if it all went well
 * @param {?} subscriptions
 * @return {?}
 */
export function unsubscribeAllObservables(subscriptions) {
    if (Array.isArray(subscriptions)) {
        subscriptions.forEach((/**
         * @param {?} subscription
         * @return {?}
         */
        (subscription) => {
            if (subscription && subscription.unsubscribe) {
                subscription.unsubscribe();
            }
        }));
        subscriptions = [];
    }
    return subscriptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy91dGlsaXRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUk3QyxPQUFPLEtBQUssT0FBTyxNQUFNLGFBQWEsQ0FBQzs7TUFDakMsTUFBTSxHQUFHLE9BQU87Ozs7Ozs7QUFTdEIsTUFBTSxVQUFVLGNBQWMsQ0FBQyxRQUFROztRQUNqQyxNQUFNLEdBQUcsRUFBRTtJQUVmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDakMsTUFBTSxJQUFJLEdBQUcsQ0FBQztLQUNmO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQzs7Ozs7O0FBR0QsTUFBTSxVQUFVLFVBQVUsQ0FBQyxLQUFLO0lBQzlCLGtGQUFrRjtJQUNsRiw4RUFBOEU7SUFDOUUsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3hDLENBQUM7Ozs7OztBQUdELE1BQU0sVUFBVSxVQUFVLENBQUMsS0FBSztJQUM5QixPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDeEMsQ0FBQzs7Ozs7O0FBTUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEtBQWE7SUFDNUMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFD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QyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xFLENBQUMsRUFBQyxDQUFDO0FBQ0wsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLFdBQVcsQ0FBQyxHQUFXO0lBQ3JDLE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDbkUsQ0FBQzs7Ozs7O0FBT0QsTUFBTSxVQUFVLFdBQVcsQ0FBQyxHQUFVO0lBQ3BDLE9BQU8sR0FBRyxDQUFDLE1BQU07Ozs7O0lBQUMsQ0FBQyxJQUFTLEVBQUUsS0FBYSxFQUFFLEVBQUU7UUFDN0MsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQztJQUNwQyxDQUFDLEVBQUMsQ0FBQztBQUNMLENBQUM7Ozs7Ozs7QUFPRCxNQUFNLFVBQVUseUJBQXlCLENBQUMsYUFBNkI7SUFDckUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQ2hDLGFBQWEsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxZQUEwQixFQUFFLEVBQUU7WUFDbkQsSUFBSSxZQUFZLElBQUksWUFBWSxDQUFDLFdBQVcsRUFBRTtnQkFDNUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQzVCO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDSCxhQUFhLEdBQUcsRUFBRSxDQUFDO0tBQ3BCO0lBRUQsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZpZWxkVHlwZSwgT3BlcmF0b3JUeXBlIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpcnN0LCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuXHJcblxyXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudC1taW5pJztcclxuY29uc3QgbW9tZW50ID0gbW9tZW50XzsgLy8gcGF0Y2ggdG8gZml4IHJvbGx1cCBcIm1vbWVudCBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIiBpc3N1ZSwgZG9jdW1lbnQgaGVyZSBodHRwczovL2dpdGh1Yi5jb20vcm9sbHVwL3JvbGx1cC9pc3N1ZXMvNjcwXHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbi8qKiBTaW1wbGUgZnVuY3Rpb24gdG8gd2hpY2ggd2lsbCBsb29wIGFuZCBjcmVhdGUgYXMgZGVtYW5kZWQgdGhlIG51bWJlciBvZiB3aGl0ZSBzcGFjZXMsXHJcbiAqIHRoaXMgd2lsbCBiZSB1c2VkIGluIHRoZSBFeGNlbCBleHBvcnRcclxuICogQHBhcmFtIGludCBuYlNwYWNlczogbnVtYmVyIG9mIHdoaXRlIHNwYWNlcyB0byBjcmVhdGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRXaGl0ZVNwYWNlcyhuYlNwYWNlcyk6IHN0cmluZyB7XHJcbiAgbGV0IHJlc3VsdCA9ICcnO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5iU3BhY2VzOyBpKyspIHtcclxuICAgIHJlc3VsdCArPSAnICc7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbi8qKiBIVE1MIGVuY29kZSB1c2luZyBqUXVlcnkgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGh0bWxFbmNvZGUodmFsdWUpIHtcclxuICAvLyBjcmVhdGUgYSBpbi1tZW1vcnkgZGl2LCBzZXQgaXQncyBpbm5lciB0ZXh0KHdoaWNoIGpRdWVyeSBhdXRvbWF0aWNhbGx5IGVuY29kZXMpXHJcbiAgLy8gdGhlbiBncmFiIHRoZSBlbmNvZGVkIGNvbnRlbnRzIGJhY2sgb3V0LiAgVGhlIGRpdiBuZXZlciBleGlzdHMgb24gdGhlIHBhZ2UuXHJcbiAgcmV0dXJuICQoJzxkaXYvPicpLnRleHQodmFsdWUpLmh0bWwoKTtcclxufVxyXG5cclxuLyoqIEhUTUwgZGVjb2RlIHVzaW5nIGpRdWVyeSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaHRtbERlY29kZSh2YWx1ZSkge1xyXG4gIHJldHVybiAkKCc8ZGl2Lz4nKS5odG1sKHZhbHVlKS50ZXh0KCk7XHJcbn1cclxuXHJcbi8qKiBkZWNvZGUgdGV4dCBpbnRvIGh0bWwgZW50aXR5XHJcbiAqIEBwYXJhbSBzdHJpbmcgdGV4dDogaW5wdXQgdGV4dFxyXG4gKiBAcGFyYW0gc3RyaW5nIHRleHQ6IG91dHB1dCB0ZXh0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaHRtbEVudGl0eURlY29kZShpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcclxuICByZXR1cm4gaW5wdXQucmVwbGFjZSgvJiMoXFxkKyk7L2csIGZ1bmN0aW9uIChtYXRjaCwgZGVjKSB7XHJcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShkZWMpO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vKiogZGVjb2RlIHRleHQgaW50byBodG1sIGVudGl0eVxyXG4gKiBAcGFyYW0gc3RyaW5nIHRleHQ6IGlucHV0IHRleHRcclxuICogQHBhcmFtIHN0cmluZyB0ZXh0OiBvdXRwdXQgdGV4dFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGh0bWxFbnRpdHlFbmNvZGUoaW5wdXQ6IGFueSk6IHN0cmluZyB7XHJcbiAgY29uc3QgYnVmID0gW107XHJcbiAgZm9yIChsZXQgaSA9IGlucHV0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICBidWYudW5zaGlmdChbJyYjJywgaW5wdXRbaV0uY2hhckNvZGVBdCgpLCAnOyddLmpvaW4oJycpKTtcclxuICB9XHJcbiAgcmV0dXJuIGJ1Zi5qb2luKCcnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXBhcmVzIHR3byBhcnJheXMgdG8gZGV0ZXJtaW5lIGlmIGFsbCB0aGUgaXRlbXMgYXJlIGVxdWFsXHJcbiAqIEBwYXJhbSBhIGZpcnN0IGFycmF5XHJcbiAqIEBwYXJhbSBiIHNlY29uZCBhcnJheSB0byBjb21wYXJlIHdpdGggYVxyXG4gKiBAcGFyYW0gW29yZGVyTWF0dGVycz1mYWxzZV0gZmxhZyBpZiB0aGUgb3JkZXIgbWF0dGVycywgaWYgbm90IGFycmF5cyB3aWxsIGJlIHNvcnRlZFxyXG4gKiBAcmV0dXJuIGJvb2xlYW4gdHJ1ZSBpZiBlcXVhbCwgZWxzZSBmYWxzZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5c0VxdWFsKGE6IGFueVtdLCBiOiBhbnlbXSwgb3JkZXJNYXR0ZXJzOiBib29sZWFuID0gZmFsc2UpOiBib29sZWFuIHtcclxuICBpZiAoYSA9PT0gYikge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBpZiAoIWEgfHwgIWIpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlmICghb3JkZXJNYXR0ZXJzKSB7XHJcbiAgICBhLnNvcnQoKTtcclxuICAgIGIuc29ydCgpO1xyXG4gIH1cclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XHJcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRyeSBjYXN0aW5nIGFuIGlucHV0IG9mIHR5cGUgUHJvbWlzZSB8IE9ic2VydmFibGUgaW50byBhIFByb21pc2UgdHlwZS5cclxuICogQHBhcmFtIG9iamVjdCB3aGljaCBjb3VsZCBiZSBvZiB0eXBlIFByb21pc2Ugb3IgT2JzZXJ2YWJsZVxyXG4gKiBAcGFyYW0gZnJvbVNlcnZpY2VOYW1lIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGNhbGxlciBzZXJ2aWNlIG5hbWUgYW5kIHdpbGwgYmUgdXNlZCBpZiB3ZSB0aHJvdyBhIGNhc3RpbmcgcHJvYmxlbSBlcnJvclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNhc3RUb1Byb21pc2U8VD4oaW5wdXQ6IFByb21pc2U8VD4gfCBPYnNlcnZhYmxlPFQ+LCBmcm9tU2VydmljZU5hbWU6IHN0cmluZyA9ICcnKTogUHJvbWlzZTxUPiB7XHJcbiAgbGV0IHByb21pc2U6IGFueSA9IGlucHV0O1xyXG5cclxuICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAvLyBpZiBpdCdzIGFscmVhZHkgYSBQcm9taXNlIHRoZW4gcmV0dXJuIGl0XHJcbiAgICByZXR1cm4gaW5wdXQ7XHJcbiAgfSBlbHNlIGlmIChpbnB1dCBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcclxuICAgIHByb21pc2UgPSBpbnB1dC5waXBlKGZpcnN0KCkpLnRvUHJvbWlzZSgpO1xyXG4gICAgaWYgKCEocHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpKSB7XHJcbiAgICAgIHByb21pc2UgPSBpbnB1dC5waXBlKHRha2UoMSkpLnRvUHJvbWlzZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKCEocHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICBgU29tZXRoaW5nIHdlbnQgd3JvbmcsIEFuZ3VsYXItU2xpY2tncmlkICR7ZnJvbVNlcnZpY2VOYW1lfSBpcyBub3QgYWJsZSB0byBjb252ZXJ0IHRoZSBPYnNlcnZhYmxlIGludG8gYSBQcm9taXNlLlxyXG4gICAgICAgIElmIHlvdSBhcmUgdXNpbmcgQW5ndWxhciBIdHRwQ2xpZW50LCB5b3UgY291bGQgdHJ5IGNvbnZlcnRpbmcgeW91ciBodHRwIGNhbGwgdG8gYSBQcm9taXNlIHdpdGggXCIudG9Qcm9taXNlKClcIlxyXG4gICAgICAgIGZvciBleGFtcGxlOjogIHRoaXMuaHR0cC5wb3N0KCdncmFwaHFsJywgeyBxdWVyeTogZ3JhcGhxbFF1ZXJ5IH0pLnRvUHJvbWlzZSgpXHJcbiAgICAgICAgYCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcHJvbWlzZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVzZXMgdGhlIGxvZ2ljIGZ1bmN0aW9uIHRvIGZpbmQgYW4gaXRlbSBpbiBhbiBhcnJheSBvciByZXR1cm5zIHRoZSBkZWZhdWx0XHJcbiAqIHZhbHVlIHByb3ZpZGVkIChlbXB0eSBvYmplY3QgYnkgZGVmYXVsdClcclxuICogQHBhcmFtIGFueVtdIGFycmF5IHRoZSBhcnJheSB0byBmaWx0ZXJcclxuICogQHBhcmFtIGZ1bmN0aW9uIGxvZ2ljIHRoZSBsb2dpYyB0byBmaW5kIHRoZSBpdGVtXHJcbiAqIEBwYXJhbSBhbnkgW2RlZmF1bHRWYWw9e31dIHRoZSBkZWZhdWx0IHZhbHVlIHRvIHJldHVyblxyXG4gKiBAcmV0dXJuIG9iamVjdCB0aGUgZm91bmQgb2JqZWN0IG9yIGRlZmF1bHQgdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kT3JEZWZhdWx0KGFycmF5OiBhbnlbXSwgbG9naWM6IChpdGVtOiBhbnkpID0+IGJvb2xlYW4sIGRlZmF1bHRWYWwgPSB7fSk6IGFueSB7XHJcbiAgcmV0dXJuIGFycmF5LmZpbmQobG9naWMpIHx8IGRlZmF1bHRWYWw7XHJcbn1cclxuXHJcbi8qKlxyXG4gICogVGFrZSBhIG51bWJlciAob3IgYSBzdHJpbmcpIGFuZCBkaXNwbGF5IGl0IGFzIGEgZm9ybWF0dGVkIGRlY2ltYWwgc3RyaW5nIHdpdGggZGVmaW5lZCBtaW5pbXVtIGFuZCBtYXhpbXVtIGRlY2ltYWxzXHJcbiAgKiBAcGFyYW0gaW5wdXRcclxuICAqIEBwYXJhbSBtaW5EZWNpbWFsXHJcbiAgKiBAcGFyYW0gbWF4RGVjaW1hbFxyXG4gICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWNpbWFsRm9ybWF0dGVkKGlucHV0OiBudW1iZXIgfCBzdHJpbmcsIG1pbkRlY2ltYWw/OiBudW1iZXIsIG1heERlY2ltYWw/OiBudW1iZXIpIHtcclxuICBpZiAoaXNOYU4oK2lucHV0KSkge1xyXG4gICAgcmV0dXJuIGlucHV0O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbWluRGVjID0gKG1pbkRlY2ltYWwgPT09IHVuZGVmaW5lZCkgPyAyIDogbWluRGVjaW1hbDtcclxuICBjb25zdCBtYXhEZWMgPSAobWF4RGVjaW1hbCA9PT0gdW5kZWZpbmVkKSA/IDIgOiBtYXhEZWNpbWFsO1xyXG4gIGxldCBhbW91bnQgPSBTdHJpbmcoTWF0aC5yb3VuZCgraW5wdXQgKiBNYXRoLnBvdygxMCwgbWF4RGVjKSkgLyBNYXRoLnBvdygxMCwgbWF4RGVjKSk7XHJcblxyXG4gIGlmIChhbW91bnQuaW5kZXhPZignLicpIDwgMCkge1xyXG4gICAgYW1vdW50ICs9ICcuJztcclxuICB9XHJcbiAgd2hpbGUgKChhbW91bnQubGVuZ3RoIC0gYW1vdW50LmluZGV4T2YoJy4nKSkgPD0gbWluRGVjKSB7XHJcbiAgICBhbW91bnQgKz0gJzAnO1xyXG4gIH1cclxuICByZXR1cm4gYW1vdW50O1xyXG59XHJcblxyXG4vKiogRnJvbSBhIGRvdCAoLikgbm90YXRpb24gZmluZCBhbmQgcmV0dXJuIGEgcHJvcGVydHkgd2l0aGluIGFuIG9iamVjdCBnaXZlbiBhIHBhdGggKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERlc2NlbmRhbnRQcm9wZXJ0eShvYmo6IGFueSwgcGF0aDogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIHBhdGguc3BsaXQoJy4nKS5yZWR1Y2UoKGFjYywgcGFydCkgPT4gYWNjICYmIGFjY1twYXJ0XSwgb2JqKTtcclxufVxyXG5cclxuLyoqIEdldCB0aGUgYnJvd3NlcidzIHNjcm9sbGJhciB3aWR0aCwgdGhpcyBpcyBkaWZmZXJlbnQgdG8gZWFjaCBicm93c2VyICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxCYXJXaWR0aCgpIHtcclxuICBjb25zdCAkb3V0ZXIgPSAkKCc8ZGl2PicpLmNzcyh7IHZpc2liaWxpdHk6ICdoaWRkZW4nLCB3aWR0aDogMTAwLCBvdmVyZmxvdzogJ3Njcm9sbCcgfSkuYXBwZW5kVG8oJ2JvZHknKTtcclxuICBjb25zdCB3aWR0aFdpdGhTY3JvbGwgPSAkKCc8ZGl2PicpLmNzcyh7IHdpZHRoOiAnMTAwJScgfSkuYXBwZW5kVG8oJG91dGVyKS5vdXRlcldpZHRoKCk7XHJcbiAgJG91dGVyLnJlbW92ZSgpO1xyXG4gIHJldHVybiBNYXRoLmNlaWwoMTAwIC0gd2lkdGhXaXRoU2Nyb2xsKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZyb20gYSBEYXRlIEZpZWxkVHlwZSwgcmV0dXJuIGl0J3MgZXF1aXZhbGVudCBtb21lbnQuanMgZm9ybWF0XHJcbiAqIHJlZmVyIHRvIG1vbWVudC5qcyBmb3IgdGhlIGZvcm1hdCBzdGFuZGFyZCB1c2VkOiBodHRwczovL21vbWVudGpzLmNvbS9kb2NzLyMvcGFyc2luZy9zdHJpbmctZm9ybWF0L1xyXG4gKiBAcGFyYW0gZmllbGRUeXBlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWFwTW9tZW50RGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUoZmllbGRUeXBlOiBGaWVsZFR5cGUpOiBzdHJpbmcge1xyXG4gIGxldCBtYXA6IHN0cmluZztcclxuICBzd2l0Y2ggKGZpZWxkVHlwZSkge1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWU6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUlzbzpcclxuICAgICAgbWFwID0gJ1lZWVktTU0tREQgSEg6bW06c3MnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lU2hvcnRJc286XHJcbiAgICAgIG1hcCA9ICdZWVlZLU1NLUREIEhIOm1tJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUlzb0FtUG06XHJcbiAgICAgIG1hcCA9ICdZWVlZLU1NLUREIGhoOm1tOnNzIGEnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lSXNvQU1fUE06XHJcbiAgICAgIG1hcCA9ICdZWVlZLU1NLUREIGhoOm1tOnNzIEEnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVVczpcclxuICAgICAgbWFwID0gJ01NL0REL1lZWVknO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVVc1Nob3J0OlxyXG4gICAgICBtYXAgPSAnTS9EL1lZJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzOlxyXG4gICAgICBtYXAgPSAnTU0vREQvWVlZWSBISDptbTpzcyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVTaG9ydFVzOlxyXG4gICAgICBtYXAgPSAnTU0vREQvWVlZWSBISDptbSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc0FtUG06XHJcbiAgICAgIG1hcCA9ICdNTS9ERC9ZWVlZIGhoOm1tOnNzIGEnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNBTV9QTTpcclxuICAgICAgbWFwID0gJ01NL0REL1lZWVkgaGg6bW06c3MgQSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc1Nob3J0OlxyXG4gICAgICBtYXAgPSAnTS9EL1lZIEg6bTpzJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzU2hvcnRBbVBtOlxyXG4gICAgICBtYXAgPSAnTS9EL1lZIGg6bTpzIGEnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVVdGM6XHJcbiAgICAgIG1hcCA9ICdZWVlZLU1NLUREVEhIOm1tOnNzLlNTU1onO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGU6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlSXNvOlxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgbWFwID0gJ1lZWVktTU0tREQnO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbiAgcmV0dXJuIG1hcDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZyb20gYSBEYXRlIEZpZWxkVHlwZSwgcmV0dXJuIGl0J3MgZXF1aXZhbGVudCBGbGF0cGlja3IgZm9ybWF0XHJcbiAqIHJlZmVyIHRvIEZsYXRwaWNrciBmb3IgdGhlIGZvcm1hdCBzdGFuZGFyZCB1c2VkOiBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvZm9ybWF0dGluZy8jZGF0ZS1mb3JtYXR0aW5nLXRva2Vuc1xyXG4gKiBhbHNvIG5vdGUgdGhhdCB0aGV5IHNlZW0gdmVyeSBzaW1pbGFyIHRvIFBIUCBmb3JtYXQgKGV4Y2VwdCBmb3IgYW0vcG0pOiBodHRwOi8vcGhwLm5ldC9tYW51YWwvZW4vZnVuY3Rpb24uZGF0ZS5waHBcclxuICogQHBhcmFtIGZpZWxkVHlwZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1hcEZsYXRwaWNrckRhdGVGb3JtYXRXaXRoRmllbGRUeXBlKGZpZWxkVHlwZTogRmllbGRUeXBlKTogc3RyaW5nIHtcclxuICAvKlxyXG4gICAgZDogRGF5IG9mIHRoZSBtb250aCwgMiBkaWdpdHMgd2l0aCBsZWFkaW5nIHplcm9zXHQwMSB0byAzMVxyXG4gICAgRDogQSB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIGEgZGF5XHRNb24gdGhyb3VnaCBTdW5cclxuICAgIGw6IChsb3dlcmNhc2UgJ0wnKVx0QSBmdWxsIHRleHR1YWwgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRheSBvZiB0aGUgd2Vla1x0U3VuZGF5IHRocm91Z2ggU2F0dXJkYXlcclxuICAgIGo6IERheSBvZiB0aGUgbW9udGggd2l0aG91dCBsZWFkaW5nIHplcm9zXHQxIHRvIDMxXHJcbiAgICBKOiBEYXkgb2YgdGhlIG1vbnRoIHdpdGhvdXQgbGVhZGluZyB6ZXJvcyBhbmQgb3JkaW5hbCBzdWZmaXhcdDFzdCwgMm5kLCB0byAzMXN0XHJcbiAgICB3OiBOdW1lcmljIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXkgb2YgdGhlIHdlZWtcdDAgKGZvciBTdW5kYXkpIHRocm91Z2ggNiAoZm9yIFNhdHVyZGF5KVxyXG4gICAgRjogQSBmdWxsIHRleHR1YWwgcmVwcmVzZW50YXRpb24gb2YgYSBtb250aFx0SmFudWFyeSB0aHJvdWdoIERlY2VtYmVyXHJcbiAgICBtOiBOdW1lcmljIHJlcHJlc2VudGF0aW9uIG9mIGEgbW9udGgsIHdpdGggbGVhZGluZyB6ZXJvXHQwMSB0aHJvdWdoIDEyXHJcbiAgICBuOiBOdW1lcmljIHJlcHJlc2VudGF0aW9uIG9mIGEgbW9udGgsIHdpdGhvdXQgbGVhZGluZyB6ZXJvc1x0MSB0aHJvdWdoIDEyXHJcbiAgICBNOiBBIHNob3J0IHRleHR1YWwgcmVwcmVzZW50YXRpb24gb2YgYSBtb250aFx0SmFuIHRocm91Z2ggRGVjXHJcbiAgICBVOiBUaGUgbnVtYmVyIG9mIHNlY29uZHMgc2luY2UgdGhlIFVuaXggRXBvY2hcdDE0MTM3MDQ5OTNcclxuICAgIHk6IEEgdHdvIGRpZ2l0IHJlcHJlc2VudGF0aW9uIG9mIGEgeWVhclx0OTkgb3IgMDNcclxuICAgIFk6IEEgZnVsbCBudW1lcmljIHJlcHJlc2VudGF0aW9uIG9mIGEgeWVhciwgNCBkaWdpdHNcdDE5OTkgb3IgMjAwM1xyXG4gICAgSDogSG91cnMgKDI0IGhvdXJzKVx0MDAgdG8gMjNcclxuICAgIGg6IEhvdXJzXHQxIHRvIDEyXHJcbiAgICBpOiBNaW51dGVzXHQwMCB0byA1OVxyXG4gICAgUzogU2Vjb25kcywgMiBkaWdpdHNcdDAwIHRvIDU5XHJcbiAgICBzOiBTZWNvbmRzXHQwLCAxIHRvIDU5XHJcbiAgICBLOiBBTS9QTVx0QU0gb3IgUE1cclxuICAqL1xyXG4gIGxldCBtYXA6IHN0cmluZztcclxuICBzd2l0Y2ggKGZpZWxkVHlwZSkge1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWU6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUlzbzpcclxuICAgICAgbWFwID0gJ1ktbS1kIEg6aTpTJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVNob3J0SXNvOlxyXG4gICAgICBtYXAgPSAnWS1tLWQgSDppJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUlzb0FtUG06XHJcbiAgICAgIG1hcCA9ICdZLW0tZCBoOmk6UyBLJzsgLy8gdGhlcmUgaXMgbm8gbG93ZXJjYXNlIGluIEZsYXRwaWNrciA6KFxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lSXNvQU1fUE06XHJcbiAgICAgIG1hcCA9ICdZLW0tZCBoOmk6UyBLJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVXM6XHJcbiAgICAgIG1hcCA9ICdtL2QvWSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVVzU2hvcnQ6XHJcbiAgICAgIG1hcCA9ICdtL2QveSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVczpcclxuICAgICAgbWFwID0gJ20vZC9ZIEg6aTpTJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVNob3J0VXM6XHJcbiAgICAgIG1hcCA9ICdtL2QveSBIOmknO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNBbVBtOlxyXG4gICAgICBtYXAgPSAnbS9kL1kgaDppOlMgSyc7IC8vIHRoZXJlIGlzIG5vIGxvd2VyY2FzZSBpbiBGbGF0cGlja3IgOihcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzQU1fUE06XHJcbiAgICAgIG1hcCA9ICdtL2QvWSBoOmk6cyBLJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzU2hvcnQ6XHJcbiAgICAgIG1hcCA9ICdtL2QveSBIOmk6cyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc1Nob3J0QW1QbTpcclxuICAgICAgbWFwID0gJ20vZC95IGg6aTpzIEsnOyAvLyB0aGVyZSBpcyBubyBsb3dlcmNhc2UgaW4gRmxhdHBpY2tyIDooXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVV0YzpcclxuICAgICAgbWFwID0gJ1onO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGU6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlSXNvOlxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgbWFwID0gJ1ktbS1kJztcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG4gIHJldHVybiBtYXA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNYXBwZXIgZm9yIHF1ZXJ5IG9wZXJhdG9ycyAoZXguOiA8PSBpcyBcImxlXCIsID4gaXMgXCJndFwiKVxyXG4gKiBAcGFyYW0gc3RyaW5nIG9wZXJhdG9yXHJcbiAqIEByZXR1cm5zIHN0cmluZyBtYXBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXBPcGVyYXRvclR5cGUob3BlcmF0b3I6IHN0cmluZyk6IE9wZXJhdG9yVHlwZSB7XHJcbiAgbGV0IG1hcDogT3BlcmF0b3JUeXBlO1xyXG5cclxuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XHJcbiAgICBjYXNlICc8JzpcclxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmxlc3NUaGFuO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJzw9JzpcclxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmxlc3NUaGFuT3JFcXVhbDtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICc+JzpcclxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmdyZWF0ZXJUaGFuO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJz49JzpcclxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmdyZWF0ZXJUaGFuT3JFcXVhbDtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICc8Pic6XHJcbiAgICBjYXNlICchPSc6XHJcbiAgICBjYXNlICduZXEnOlxyXG4gICAgY2FzZSAnTkVRJzpcclxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLm5vdEVxdWFsO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJyonOlxyXG4gICAgY2FzZSAnLionOlxyXG4gICAgY2FzZSAnc3RhcnRzV2l0aCc6XHJcbiAgICAgIG1hcCA9IE9wZXJhdG9yVHlwZS5zdGFydHNXaXRoO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJyouJzpcclxuICAgIGNhc2UgJ2VuZHNXaXRoJzpcclxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmVuZHNXaXRoO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJz0nOlxyXG4gICAgY2FzZSAnPT0nOlxyXG4gICAgY2FzZSAnZXEnOlxyXG4gICAgY2FzZSAnRVEnOlxyXG4gICAgICBtYXAgPSBPcGVyYXRvclR5cGUuZXF1YWw7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnaW4nOlxyXG4gICAgY2FzZSAnSU4nOlxyXG4gICAgICBtYXAgPSBPcGVyYXRvclR5cGUuaW47XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnbm90SW4nOlxyXG4gICAgY2FzZSAnTklOJzpcclxuICAgIGNhc2UgJ05PVF9JTic6XHJcbiAgICAgIG1hcCA9IE9wZXJhdG9yVHlwZS5ub3RJbjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBtYXAgPSBPcGVyYXRvclR5cGUuY29udGFpbnM7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1hcDtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1hcHBlciBmb3IgcXVlcnkgb3BlcmF0b3IgYnkgYSBGaWx0ZXIgVHlwZVxyXG4gKiBGb3IgZXhhbXBsZSBhIG11bHRpcGxlLXNlbGVjdCB0eXBpY2FsbHkgdXNlcyAnSU4nIG9wZXJhdG9yXHJcbiAqIEBwYXJhbSBvcGVyYXRvclxyXG4gKiBAcmV0dXJucyBzdHJpbmcgbWFwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWFwT3BlcmF0b3JCeUZpZWxkVHlwZShmaWVsZFR5cGU6IEZpZWxkVHlwZSB8IHN0cmluZyk6IE9wZXJhdG9yVHlwZSB7XHJcbiAgbGV0IG1hcDogT3BlcmF0b3JUeXBlO1xyXG5cclxuICBzd2l0Y2ggKGZpZWxkVHlwZSkge1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuc3RyaW5nOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUudW5rbm93bjpcclxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmNvbnRhaW5zO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmZsb2F0OlxyXG4gICAgY2FzZSBGaWVsZFR5cGUubnVtYmVyOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZTpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVJc286XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVV0YzpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVJc286XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUlzb0FtUG06XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUlzb0FNX1BNOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVVzOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVVzU2hvcnQ6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc0FtUG06XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzQU1fUE06XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzU2hvcnQ6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzU2hvcnRBbVBtOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc1Nob3J0QU1fUE06XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBtYXAgPSBPcGVyYXRvclR5cGUuZXF1YWw7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1hcDtcclxufVxyXG5cclxuLyoqIFBhcnNlIGFueSBpbnB1dCAoYm9vbCwgbnVtYmVyLCBzdHJpbmcpIGFuZCByZXR1cm4gYSBib29sZWFuIG9yIEZhbHNlIHdoZW4gbm90IHBvc3NpYmxlICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUJvb2xlYW4oaW5wdXQ6IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcpIHtcclxuICByZXR1cm4gLyh0cnVlfDEpL2kudGVzdChpbnB1dCArICcnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcnNlIGEgZGF0ZSBwYXNzZWQgYXMgYSBzdHJpbmcgYW5kIHJldHVybiBhIERhdGUgb2JqZWN0IChpZiB2YWxpZClcclxuICogQHBhcmFtIGlucHV0RGF0ZVN0cmluZ1xyXG4gKiBAcmV0dXJucyBzdHJpbmcgZGF0ZSBmb3JtYXR0ZWRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVV0Y0RhdGUoaW5wdXREYXRlU3RyaW5nOiBzdHJpbmcsIHVzZVV0YzogYm9vbGVhbik6IHN0cmluZyB8IG51bGwge1xyXG4gIGxldCBkYXRlID0gbnVsbDtcclxuXHJcbiAgaWYgKC9eWzAtOVxcLVxcL10qJC8udGVzdChpbnB1dERhdGVTdHJpbmcpKSB7XHJcbiAgICAvLyBnZXQgdGhlIFVUQyBkYXRldGltZSB3aXRoIG1vbWVudC5qcyBidXQgd2UgbmVlZCB0byBkZWNvZGUgdGhlIHZhbHVlIHNvIHRoYXQgaXQncyB2YWxpZCB0ZXh0XHJcbiAgICBjb25zdCBkYXRlU3RyaW5nID0gZGVjb2RlVVJJQ29tcG9uZW50KGlucHV0RGF0ZVN0cmluZyk7XHJcbiAgICBjb25zdCBkYXRlTW9tZW50ID0gbW9tZW50KG5ldyBEYXRlKGRhdGVTdHJpbmcpKTtcclxuICAgIGlmIChkYXRlTW9tZW50LmlzVmFsaWQoKSAmJiBkYXRlTW9tZW50LnllYXIoKS50b1N0cmluZygpLmxlbmd0aCA9PT0gNCkge1xyXG4gICAgICBkYXRlID0gKHVzZVV0YykgPyBkYXRlTW9tZW50LnV0YygpLmZvcm1hdCgpIDogZGF0ZU1vbWVudC5mb3JtYXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBkYXRlO1xyXG59XHJcblxyXG4vKipcclxuICogU2FuaXRpemUsIHJldHVybiBvbmx5IHRoZSB0ZXh0IHdpdGhvdXQgSFRNTCB0YWdzXHJcbiAqIEBpbnB1dCBodG1sU3RyaW5nXHJcbiAqIEByZXR1cm4gdGV4dFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplSHRtbFRvVGV4dChodG1sU3RyaW5nOiBzdHJpbmcpIHtcclxuICBjb25zdCB0ZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgdGVtcC5pbm5lckhUTUwgPSBodG1sU3RyaW5nO1xyXG4gIHJldHVybiB0ZW1wLnRleHRDb250ZW50IHx8IHRlbXAuaW5uZXJUZXh0O1xyXG59XHJcblxyXG4vKipcclxuICogVGl0bGUgY2FzZSB0aGUgY29tcGxldGUgc2VudGVuY2UgKHVwcGVyIGNhc2UgZmlyc3QgY2hhciBvZiBlYWNoIHdvcmQgd2hpbGUgY2hhbmdpbmcgZXZlcnl0aGluZyBlbHNlIHRvIGxvd2VyIGNhc2UpXHJcbiAqIEBwYXJhbSBzdHJpbmdcclxuICogQHJldHVybnMgc3RyaW5nXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdGl0bGVDYXNlKHN0cmluZykge1xyXG4gIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhIHN0cmluZyB0byBjYW1lbCBjYXNlXHJcbiAqIEBwYXJhbSBzdHIgdGhlIHN0cmluZyB0byBjb252ZXJ0XHJcbiAqIEByZXR1cm4gdGhlIHN0cmluZyBpbiBjYW1lbCBjYXNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9DYW1lbENhc2Uoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIHJldHVybiBzdHIucmVwbGFjZSgvKD86Xlxcd3xbQS1aXXxcXGJcXHd8W1xccytcXC1fXFwvXSkvZywgKG1hdGNoOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyKSA9PiB7XHJcbiAgICAvLyByZW1vdmUgd2hpdGUgc3BhY2Ugb3IgaHlwZW5zIG9yIHVuZGVyc2NvcmVzXHJcbiAgICBpZiAoL1tcXHMrXFwtX1xcL10vLnRlc3QobWF0Y2gpKSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2Zmc2V0ID09PSAwID8gbWF0Y2gudG9Mb3dlckNhc2UoKSA6IG1hdGNoLnRvVXBwZXJDYXNlKCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhIHN0cmluZyB0byBrZWJhYiAoaHlwZW4pIGNhc2VcclxuICogQHBhcmFtIHN0ciB0aGUgc3RyaW5nIHRvIGNvbnZlcnRcclxuICogQHJldHVybiB0aGUgc3RyaW5nIGluIGtlYmFiIGNhc2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b0tlYmFiQ2FzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIHRvQ2FtZWxDYXNlKHN0cikucmVwbGFjZSgvKFtBLVpdKS9nLCAnLSQxJykudG9Mb3dlckNhc2UoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRha2VzIGFuIGlucHV0IGFycmF5IGFuZCBtYWtlcyBzdXJlIHRoZSBhcnJheSBoYXMgdW5pcXVlIHZhbHVlcyBieSByZW1vdmluZyBkdXBsaWNhdGVzXHJcbiAqIEBwYXJhbSBhcnJheSBpbnB1dCB3aXRoIHBvc3NpYmxlIGR1cGxpY2F0ZXNcclxuICogQHJldHVybiBhcnJheSBvdXRwdXQgd2l0aG91dCBkdXBsaWNhdGVzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdW5pcXVlQXJyYXkoYXJyOiBhbnlbXSk6IGFueVtdIHtcclxuICByZXR1cm4gYXJyLmZpbHRlcigoaXRlbTogYW55LCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICByZXR1cm4gYXJyLmluZGV4T2YoaXRlbSkgPj0gaW5kZXg7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVbnN1YnNjcmliZSBhbGwgT2JzZXJ2YWJsZXMgU3Vic2NyaXB0aW9uc1xyXG4gKiBJdCB3aWxsIHJldHVybiBhbiBlbXB0eSBhcnJheSBpZiBpdCBhbGwgd2VudCB3ZWxsXHJcbiAqIEBwYXJhbSBzdWJzY3JpcHRpb25zXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdW5zdWJzY3JpYmVBbGxPYnNlcnZhYmxlcyhzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSk6IFN1YnNjcmlwdGlvbltdIHtcclxuICBpZiAoQXJyYXkuaXNBcnJheShzdWJzY3JpcHRpb25zKSkge1xyXG4gICAgc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbikgPT4ge1xyXG4gICAgICBpZiAoc3Vic2NyaXB0aW9uICYmIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSkge1xyXG4gICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHN1YnNjcmlwdGlvbnMgPSBbXTtcclxuICB9XHJcblxyXG4gIHJldHVybiBzdWJzY3JpcHRpb25zO1xyXG59XHJcbiJdfQ==