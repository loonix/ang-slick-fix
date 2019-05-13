/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Takes a value display it according to a mask provided
 * e.: 1234567890 with mask "(000) 000-0000" will display "(123) 456-7890"
 * @type {?}
 */
export const maskFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} value
 * @param {?} columnDef
 * @param {?} dataContext
 * @return {?}
 */
(row, cell, value, columnDef, dataContext) => {
    /** @type {?} */
    const params = columnDef.params || {};
    /** @type {?} */
    const mask = params.mask;
    if (!mask) {
        throw new Error(`You must provide a "mask" via the generic "params" options (e.g.: { formatter: Formatters.mask, params: { mask: '000-000' }}`);
    }
    if (value) {
        /** @type {?} */
        let i = 0;
        /** @type {?} */
        const v = value.toString();
        return mask.replace(/[09A]/gi, (/**
         * @param {?} match
         * @return {?}
         */
        (match) => {
            // only replace the char when the mask is a 0 or 9 for a digit OR the mask is "A" and the char is a non-digit meaning a string char
            if (((match === '0' || match === '9') && /\d*/g.test(v[i])) // mask is 0 or 9 and value is a digit
                || (match.toUpperCase() === 'A' && /[^\d]*/gi.test(v[i])) // OR mask is an "A" and value is non-digit
            ) {
                return v[i++] || '';
            }
            return '';
        }));
    }
    return value;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFza0Zvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9tYXNrRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU9BLE1BQU0sT0FBTyxhQUFhOzs7Ozs7OztBQUFjLENBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxLQUFVLEVBQUUsU0FBaUIsRUFBRSxXQUFnQixFQUFFLEVBQUU7O1VBQy9HLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUU7O1VBQy9CLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSTtJQUV4QixJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyw4SEFBOEgsQ0FBQyxDQUFDO0tBQ2pKO0lBRUQsSUFBSSxLQUFLLEVBQUU7O1lBQ0wsQ0FBQyxHQUFHLENBQUM7O2NBQ0gsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUU7UUFDMUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7Ozs7UUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3ZDLG1JQUFtSTtZQUNuSSxJQUNFLENBQUMsQ0FBQyxLQUFLLEtBQUssR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUksc0NBQXNDO21CQUM5RixDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFFLDJDQUEyQztjQUN0RztnQkFDQSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNyQjtZQUNELE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQyxFQUFDLENBQUM7S0FDSjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBDb2x1bW4sIEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcblxuLyoqXG4gKiBUYWtlcyBhIHZhbHVlIGRpc3BsYXkgaXQgYWNjb3JkaW5nIHRvIGEgbWFzayBwcm92aWRlZFxuICogZS46IDEyMzQ1Njc4OTAgd2l0aCBtYXNrIFwiKDAwMCkgMDAwLTAwMDBcIiB3aWxsIGRpc3BsYXkgXCIoMTIzKSA0NTYtNzg5MFwiXG4gKi9cbmV4cG9ydCBjb25zdCBtYXNrRm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpID0+IHtcbiAgY29uc3QgcGFyYW1zID0gY29sdW1uRGVmLnBhcmFtcyB8fCB7fTtcbiAgY29uc3QgbWFzayA9IHBhcmFtcy5tYXNrO1xuXG4gIGlmICghbWFzaykge1xuICAgIHRocm93IG5ldyBFcnJvcihgWW91IG11c3QgcHJvdmlkZSBhIFwibWFza1wiIHZpYSB0aGUgZ2VuZXJpYyBcInBhcmFtc1wiIG9wdGlvbnMgKGUuZy46IHsgZm9ybWF0dGVyOiBGb3JtYXR0ZXJzLm1hc2ssIHBhcmFtczogeyBtYXNrOiAnMDAwLTAwMCcgfX1gKTtcbiAgfVxuXG4gIGlmICh2YWx1ZSkge1xuICAgIGxldCBpID0gMDtcbiAgICBjb25zdCB2ID0gdmFsdWUudG9TdHJpbmcoKTtcbiAgICByZXR1cm4gbWFzay5yZXBsYWNlKC9bMDlBXS9naSwgKG1hdGNoKSA9PiB7XG4gICAgICAvLyBvbmx5IHJlcGxhY2UgdGhlIGNoYXIgd2hlbiB0aGUgbWFzayBpcyBhIDAgb3IgOSBmb3IgYSBkaWdpdCBPUiB0aGUgbWFzayBpcyBcIkFcIiBhbmQgdGhlIGNoYXIgaXMgYSBub24tZGlnaXQgbWVhbmluZyBhIHN0cmluZyBjaGFyXG4gICAgICBpZiAoXG4gICAgICAgICgobWF0Y2ggPT09ICcwJyB8fCBtYXRjaCA9PT0gJzknKSAmJiAvXFxkKi9nLnRlc3QodltpXSkpICAgIC8vIG1hc2sgaXMgMCBvciA5IGFuZCB2YWx1ZSBpcyBhIGRpZ2l0XG4gICAgICAgIHx8IChtYXRjaC50b1VwcGVyQ2FzZSgpID09PSAnQScgJiYgL1teXFxkXSovZ2kudGVzdCh2W2ldKSkgIC8vIE9SIG1hc2sgaXMgYW4gXCJBXCIgYW5kIHZhbHVlIGlzIG5vbi1kaWdpdFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB2W2krK10gfHwgJyc7XG4gICAgICB9XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufTtcbiJdfQ==