/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
String.format = (/**
 * @param {?} format
 * @param {?} args
 * @return {?}
 */
function (format, args) {
    // const args = (Array.isArray(arguments[1])) ? arguments[1] : Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, (/**
     * @param {?} match
     * @param {?} number
     * @return {?}
     */
    function (match, number) {
        return (typeof args[number] !== 'undefined') ? args[number] : match;
    }));
});
String.padZero = (/**
 * @this {?}
 * @param {?} length
 * @return {?}
 */
function (length) {
    /** @type {?} */
    let s = this;
    while (s.length < length) {
        s = '0' + s;
    }
    return s;
});
/**
 * Trim any extra white space from the string
 * @param string inputStr
 * @returns string outputStr
 */
String.trim = (/**
 * @param {?} inputStr
 * @return {?}
 */
function (inputStr) {
    return inputStr ? inputStr.replace(/\s+/g, ' ') : inputStr;
});
/**
 * Title case the complete sentence (upper case first char of each word while changing everything else to lower case)
 * @param string inputStr
 * @returns string outputStr
 */
String.allTitleCase = (/**
 * @param {?} inputStr
 * @return {?}
 */
function (inputStr) {
    return inputStr.replace(/\w\S*/g, (/**
     * @param {?} outputStr
     * @return {?}
     */
    function (outputStr) {
        return outputStr.charAt(0).toUpperCase() + outputStr.substr(1).toLowerCase();
    }));
});
/**
 * Title case the complete sentence (upper case first char of each word while changing everything else to lower case)
 * @param string inputStr
 * @returns string outputStr
*/
String.titleCase = (/**
 * @param {?} inputStr
 * @return {?}
 */
function (inputStr) {
    return inputStr.charAt(0).toUpperCase() + inputStr.slice(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLXV0aWxpdGllcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvc2VydmljZXMvZ2xvYmFsLXV0aWxpdGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBU0EsTUFBTSxDQUFDLE1BQU07Ozs7O0FBQUcsVUFBUyxNQUFjLEVBQUUsSUFBSTtJQUMzQyx3R0FBd0c7SUFFeEcsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVU7Ozs7O0lBQUUsVUFBVSxLQUFLLEVBQUUsTUFBTTtRQUN2RCxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3RFLENBQUMsRUFBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFBLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTzs7Ozs7QUFBRyxVQUF3QixNQUFjOztRQUNqRCxDQUFDLEdBQUcsSUFBSTtJQUNaLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQUU7UUFDeEIsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7S0FDYjtJQUNELE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFBLENBQUM7Ozs7OztBQU9GLE1BQU0sQ0FBQyxJQUFJOzs7O0FBQUcsVUFBUyxRQUFnQjtJQUNyQyxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztBQUM3RCxDQUFDLENBQUEsQ0FBQzs7Ozs7O0FBT0YsTUFBTSxDQUFDLFlBQVk7Ozs7QUFBRyxVQUFTLFFBQWdCO0lBQzdDLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFROzs7O0lBQUUsVUFBUyxTQUFTO1FBQ2pELE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hGLENBQUMsRUFBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFBLENBQUM7Ozs7OztBQU9GLE1BQU0sQ0FBQyxTQUFTOzs7O0FBQUcsVUFBUyxRQUFnQjtJQUMxQyxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5RCxDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImRlY2xhcmUgaW50ZXJmYWNlIFN0cmluZ0NvbnN0cnVjdG9yIHtcclxuICBhbGxUaXRsZUNhc2UoaW5wdXRTdHI6IHN0cmluZyk6IHN0cmluZztcclxuICBmb3JtYXQoaW5wdXRTdHI6IHN0cmluZywgYXJnczogYW55KTogc3RyaW5nO1xyXG4gIHBhZFplcm8obGVuZ3RoOiBudW1iZXIpOiBzdHJpbmc7XHJcbiAgdHJpbShpbnB1dFN0cjogc3RyaW5nKTogc3RyaW5nO1xyXG4gIHRpdGxlQ2FzZShpbnB1dFN0cjogc3RyaW5nKTogc3RyaW5nO1xyXG59XHJcblxyXG5cclxuU3RyaW5nLmZvcm1hdCA9IGZ1bmN0aW9uKGZvcm1hdDogc3RyaW5nLCBhcmdzKTogc3RyaW5nIHtcclxuICAvLyBjb25zdCBhcmdzID0gKEFycmF5LmlzQXJyYXkoYXJndW1lbnRzWzFdKSkgPyBhcmd1bWVudHNbMV0gOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xyXG5cclxuICByZXR1cm4gZm9ybWF0LnJlcGxhY2UoL3soXFxkKyl9L2csIGZ1bmN0aW9uIChtYXRjaCwgbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gKHR5cGVvZiBhcmdzW251bWJlcl0gIT09ICd1bmRlZmluZWQnKSA/IGFyZ3NbbnVtYmVyXSA6IG1hdGNoO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuU3RyaW5nLnBhZFplcm8gPSBmdW5jdGlvbiAodGhpczogc3RyaW5nLCBsZW5ndGg6IG51bWJlcikge1xyXG4gIGxldCBzID0gdGhpcztcclxuICB3aGlsZSAocy5sZW5ndGggPCBsZW5ndGgpIHtcclxuICAgIHMgPSAnMCcgKyBzO1xyXG4gIH1cclxuICByZXR1cm4gcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUcmltIGFueSBleHRyYSB3aGl0ZSBzcGFjZSBmcm9tIHRoZSBzdHJpbmdcclxuICogQHBhcmFtIHN0cmluZyBpbnB1dFN0clxyXG4gKiBAcmV0dXJucyBzdHJpbmcgb3V0cHV0U3RyXHJcbiAqL1xyXG5TdHJpbmcudHJpbSA9IGZ1bmN0aW9uKGlucHV0U3RyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIHJldHVybiBpbnB1dFN0ciA/IGlucHV0U3RyLnJlcGxhY2UoL1xccysvZywgJyAnKSA6IGlucHV0U3RyO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRpdGxlIGNhc2UgdGhlIGNvbXBsZXRlIHNlbnRlbmNlICh1cHBlciBjYXNlIGZpcnN0IGNoYXIgb2YgZWFjaCB3b3JkIHdoaWxlIGNoYW5naW5nIGV2ZXJ5dGhpbmcgZWxzZSB0byBsb3dlciBjYXNlKVxyXG4gKiBAcGFyYW0gc3RyaW5nIGlucHV0U3RyXHJcbiAqIEByZXR1cm5zIHN0cmluZyBvdXRwdXRTdHJcclxuICovXHJcblN0cmluZy5hbGxUaXRsZUNhc2UgPSBmdW5jdGlvbihpbnB1dFN0cjogc3RyaW5nKTogc3RyaW5nIHtcclxuICByZXR1cm4gaW5wdXRTdHIucmVwbGFjZSgvXFx3XFxTKi9nLCBmdW5jdGlvbihvdXRwdXRTdHIpIHtcclxuICAgICByZXR1cm4gb3V0cHV0U3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgb3V0cHV0U3RyLnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRpdGxlIGNhc2UgdGhlIGNvbXBsZXRlIHNlbnRlbmNlICh1cHBlciBjYXNlIGZpcnN0IGNoYXIgb2YgZWFjaCB3b3JkIHdoaWxlIGNoYW5naW5nIGV2ZXJ5dGhpbmcgZWxzZSB0byBsb3dlciBjYXNlKVxyXG4gKiBAcGFyYW0gc3RyaW5nIGlucHV0U3RyXHJcbiAqIEByZXR1cm5zIHN0cmluZyBvdXRwdXRTdHJcclxuKi9cclxuU3RyaW5nLnRpdGxlQ2FzZSA9IGZ1bmN0aW9uKGlucHV0U3RyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIHJldHVybiBpbnB1dFN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGlucHV0U3RyLnNsaWNlKDEpO1xyXG59O1xyXG4iXX0=