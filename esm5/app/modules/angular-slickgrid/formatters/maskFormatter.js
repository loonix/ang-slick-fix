/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Takes a value display it according to a mask provided
 * e.: 1234567890 with mask "(000) 000-0000" will display "(123) 456-7890"
 * @type {?}
 */
export var maskFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} value
 * @param {?} columnDef
 * @param {?} dataContext
 * @return {?}
 */
function (row, cell, value, columnDef, dataContext) {
    /** @type {?} */
    var params = columnDef.params || {};
    /** @type {?} */
    var mask = params.mask;
    if (!mask) {
        throw new Error("You must provide a \"mask\" via the generic \"params\" options (e.g.: { formatter: Formatters.mask, params: { mask: '000-000' }}");
    }
    if (value) {
        /** @type {?} */
        var i_1 = 0;
        /** @type {?} */
        var v_1 = value.toString();
        return mask.replace(/[09A]/gi, (/**
         * @param {?} match
         * @return {?}
         */
        function (match) {
            // only replace the char when the mask is a 0 or 9 for a digit OR the mask is "A" and the char is a non-digit meaning a string char
            if (((match === '0' || match === '9') && /\d*/g.test(v_1[i_1])) // mask is 0 or 9 and value is a digit
                || (match.toUpperCase() === 'A' && /[^\d]*/gi.test(v_1[i_1])) // OR mask is an "A" and value is non-digit
            ) {
                return v_1[i_1++] || '';
            }
            return '';
        }));
    }
    return value;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFza0Zvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9tYXNrRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU9BLE1BQU0sS0FBTyxhQUFhOzs7Ozs7OztBQUFjLFVBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxLQUFVLEVBQUUsU0FBaUIsRUFBRSxXQUFnQjs7UUFDM0csTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRTs7UUFDL0IsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJO0lBRXhCLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxNQUFNLElBQUksS0FBSyxDQUFDLGtJQUE4SCxDQUFDLENBQUM7S0FDako7SUFFRCxJQUFJLEtBQUssRUFBRTs7WUFDTCxHQUFDLEdBQUcsQ0FBQzs7WUFDSCxHQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRTtRQUMxQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUzs7OztRQUFFLFVBQUMsS0FBSztZQUNuQyxtSUFBbUk7WUFDbkksSUFDRSxDQUFDLENBQUMsS0FBSyxLQUFLLEdBQUcsSUFBSSxLQUFLLEtBQUssR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFJLHNDQUFzQzttQkFDOUYsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSwyQ0FBMkM7Y0FDdEc7Z0JBQ0EsT0FBTyxHQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDckI7WUFDRCxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsRUFBQyxDQUFDO0tBQ0o7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgQ29sdW1uLCBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5cbi8qKlxuICogVGFrZXMgYSB2YWx1ZSBkaXNwbGF5IGl0IGFjY29yZGluZyB0byBhIG1hc2sgcHJvdmlkZWRcbiAqIGUuOiAxMjM0NTY3ODkwIHdpdGggbWFzayBcIigwMDApIDAwMC0wMDAwXCIgd2lsbCBkaXNwbGF5IFwiKDEyMykgNDU2LTc4OTBcIlxuICovXG5leHBvcnQgY29uc3QgbWFza0Zvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIHZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55KSA9PiB7XG4gIGNvbnN0IHBhcmFtcyA9IGNvbHVtbkRlZi5wYXJhbXMgfHwge307XG4gIGNvbnN0IG1hc2sgPSBwYXJhbXMubWFzaztcblxuICBpZiAoIW1hc2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFlvdSBtdXN0IHByb3ZpZGUgYSBcIm1hc2tcIiB2aWEgdGhlIGdlbmVyaWMgXCJwYXJhbXNcIiBvcHRpb25zIChlLmcuOiB7IGZvcm1hdHRlcjogRm9ybWF0dGVycy5tYXNrLCBwYXJhbXM6IHsgbWFzazogJzAwMC0wMDAnIH19YCk7XG4gIH1cblxuICBpZiAodmFsdWUpIHtcbiAgICBsZXQgaSA9IDA7XG4gICAgY29uc3QgdiA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgcmV0dXJuIG1hc2sucmVwbGFjZSgvWzA5QV0vZ2ksIChtYXRjaCkgPT4ge1xuICAgICAgLy8gb25seSByZXBsYWNlIHRoZSBjaGFyIHdoZW4gdGhlIG1hc2sgaXMgYSAwIG9yIDkgZm9yIGEgZGlnaXQgT1IgdGhlIG1hc2sgaXMgXCJBXCIgYW5kIHRoZSBjaGFyIGlzIGEgbm9uLWRpZ2l0IG1lYW5pbmcgYSBzdHJpbmcgY2hhclxuICAgICAgaWYgKFxuICAgICAgICAoKG1hdGNoID09PSAnMCcgfHwgbWF0Y2ggPT09ICc5JykgJiYgL1xcZCovZy50ZXN0KHZbaV0pKSAgICAvLyBtYXNrIGlzIDAgb3IgOSBhbmQgdmFsdWUgaXMgYSBkaWdpdFxuICAgICAgICB8fCAobWF0Y2gudG9VcHBlckNhc2UoKSA9PT0gJ0EnICYmIC9bXlxcZF0qL2dpLnRlc3QodltpXSkpICAvLyBPUiBtYXNrIGlzIGFuIFwiQVwiIGFuZCB2YWx1ZSBpcyBub24tZGlnaXRcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdltpKytdIHx8ICcnO1xuICAgICAgfVxuICAgICAgcmV0dXJuICcnO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG4iXX0=