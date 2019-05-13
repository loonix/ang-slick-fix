/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InputFilter } from './inputFilter';
export class InputMaskFilter extends InputFilter {
    /**
     * Initialize the Filter
     */
    constructor() {
        super();
        this.inputType = 'text';
    }
    /**
     * Getter of the input mask, when provided
     * @return {?}
     */
    get inputMask() {
        return this.columnDef.params && this.columnDef.params && this.columnDef.params.mask;
    }
    /**
     * Override the Filter init used by SlickGrid
     * @param {?} args
     * @return {?}
     */
    init(args) {
        if (!args) {
            throw new Error('[Aurelia-SlickGrid] A filter must always have an "init()" with valid arguments.');
        }
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        /** @type {?} */
        const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        // step 1, create HTML string template
        /** @type {?} */
        const filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
        this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
        // step 3, subscribe to the keyup event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.on('keyup input change', (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            /** @type {?} */
            let value = '';
            if (e && e.target && e.target.value) {
                /** @type {?} */
                let targetValue = e.target.value;
                /** @type {?} */
                const enableWhiteSpaceTrim = this.gridOptions.enableFilterTrimWhiteSpace || this.columnFilter.enableTrimWhiteSpace;
                if (typeof targetValue === 'string' && enableWhiteSpaceTrim) {
                    targetValue = targetValue.trim();
                }
                // if it has a mask, we need to do a bit more work
                // and replace the filter string by the masked output without triggering an event
                /** @type {?} */
                const unmaskedValue = this.unmaskValue(targetValue);
                /** @type {?} */
                const maskedValue = this.maskValue(unmaskedValue);
                value = unmaskedValue;
                if (e.keyCode >= 48) {
                    this.$filterElm.val(maskedValue); // replace filter string with masked string
                    e.preventDefault();
                }
            }
            if (this._clearFilterTriggered) {
                this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
                this.$filterElm.removeClass('filled');
            }
            else {
                this.$filterElm.addClass('filled');
                this.callback(e, { columnDef: this.columnDef, operator: this.operator, searchTerms: [value], shouldTriggerQuery: this._shouldTriggerQuery });
            }
            // reset both flags for next use
            this._clearFilterTriggered = false;
            this._shouldTriggerQuery = true;
        }));
    }
    /**
     * From a regular string, we will use the mask to output a new string
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    maskValue(inputValue) {
        /** @type {?} */
        let i = 0;
        /** @type {?} */
        let maskedValue = '';
        if (this.inputMask) {
            maskedValue = this.inputMask.replace(/[09A]/gi, (/**
             * @param {?} match
             * @return {?}
             */
            (match) => {
                // only replace the char when the mask is a 0 or 9 for a digit OR the mask is "A" and the char is a non-digit meaning a string char
                if (((match === '0' || match === '9') && /\d+/g.test(inputValue[i])) // mask is 0 or 9 and value is a digit
                    || (match.toUpperCase() === 'A' && /[^\d]+/gi.test(inputValue[i])) // OR mask is an "A" and value is non-digit
                ) {
                    return inputValue[i++] || '';
                }
                return '';
            }));
        }
        return maskedValue;
    }
    /**
     * From a masked string, we will remove the mask and make a regular string again
     * @private
     * @param {?} maskedValue
     * @return {?}
     */
    unmaskValue(maskedValue) {
        // remove anything else but digits and chars from both the input mask and the input masked value for later comparison
        // e.g. (000) 000-0000 would return 0000000000
        /** @type {?} */
        const valueWithoutSymbols = maskedValue.replace(/[^0-9a-z]*/gi, '');
        /** @type {?} */
        const maskWithoutSymbols = this.inputMask.replace(/[^0-9a-z]*/gi, '');
        // then we can analyze if each char on each indexes equals what the mask requires, if not the char will be disregarded from the output
        // basically, if our mask is "0A0" and input value is "2ab", then only "2a" will be returned since the last char "b" is not part of the mask and is invalid
        /** @type {?} */
        let output = '';
        for (let i = 0; i < maskWithoutSymbols.length; i++) {
            if (valueWithoutSymbols[i]) {
                if (((maskWithoutSymbols[i] === '0' || maskWithoutSymbols[i] === '9') && /\d+/g.test(valueWithoutSymbols[i])) // mask is 0 or 9 and value is a digit
                    || (maskWithoutSymbols[i].toUpperCase() === 'A' && /[^\d]+/gi.test(valueWithoutSymbols[i])) // OR mask is an "A" and value is non-digit
                ) {
                    output += valueWithoutSymbols[i]; // valid and matches the Mask, so we can add it up to the string output
                }
            }
        }
        return output;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRNYXNrRmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL2lucHV0TWFza0ZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUc1QyxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxXQUFXOzs7O0lBRTlDO1FBQ0UsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztJQUMxQixDQUFDOzs7OztJQUdELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ3RGLENBQUM7Ozs7OztJQUtELElBQUksQ0FBQyxJQUFxQjtRQUN4QixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyxpRkFBaUYsQ0FBQyxDQUFDO1NBQ3BHO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQzs7O2NBR3BDLFVBQVUsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFOzs7Y0FHM0UsY0FBYyxHQUFHLElBQUksQ0FBQyx1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ZXIgfSBmcm9tICcuL2lucHV0RmlsdGVyJztcbmltcG9ydCB7IEZpbHRlckFyZ3VtZW50cyB9IGZyb20gJy4uL21vZGVscy9maWx0ZXJBcmd1bWVudHMuaW50ZXJmYWNlJztcblxuZXhwb3J0IGNsYXNzIElucHV0TWFza0ZpbHRlciBleHRlbmRzIElucHV0RmlsdGVyIHtcbiAgLyoqIEluaXRpYWxpemUgdGhlIEZpbHRlciAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaW5wdXRUeXBlID0gJ3RleHQnO1xuICB9XG5cbiAgLyoqIEdldHRlciBvZiB0aGUgaW5wdXQgbWFzaywgd2hlbiBwcm92aWRlZCAqL1xuICBnZXQgaW5wdXRNYXNrKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmLnBhcmFtcyAmJiB0aGlzLmNvbHVtbkRlZi5wYXJhbXMgJiYgdGhpcy5jb2x1bW5EZWYucGFyYW1zLm1hc2s7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGUgdGhlIEZpbHRlciBpbml0IHVzZWQgYnkgU2xpY2tHcmlkXG4gICAqL1xuICBpbml0KGFyZ3M6IEZpbHRlckFyZ3VtZW50cykge1xuICAgIGlmICghYXJncykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbQXVyZWxpYS1TbGlja0dyaWRdIEEgZmlsdGVyIG11c3QgYWx3YXlzIGhhdmUgYW4gXCJpbml0KClcIiB3aXRoIHZhbGlkIGFyZ3VtZW50cy4nKTtcbiAgICB9XG4gICAgdGhpcy5ncmlkID0gYXJncy5ncmlkO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBhcmdzLmNhbGxiYWNrO1xuICAgIHRoaXMuY29sdW1uRGVmID0gYXJncy5jb2x1bW5EZWY7XG4gICAgdGhpcy5zZWFyY2hUZXJtcyA9IGFyZ3Muc2VhcmNoVGVybXMgfHwgW107XG5cbiAgICAvLyBmaWx0ZXIgaW5wdXQgY2FuIG9ubHkgaGF2ZSAxIHNlYXJjaCB0ZXJtLCBzbyB3ZSB3aWxsIHVzZSB0aGUgMXN0IGFycmF5IGluZGV4IGlmIGl0IGV4aXN0XG4gICAgY29uc3Qgc2VhcmNoVGVybSA9IChBcnJheS5pc0FycmF5KHRoaXMuc2VhcmNoVGVybXMpICYmIHRoaXMuc2VhcmNoVGVybXNbMF0pIHx8ICcnO1xuXG4gICAgLy8gc3RlcCAxLCBjcmVhdGUgSFRNTCBzdHJpbmcgdGVtcGxhdGVcbiAgICBjb25zdCBmaWx0ZXJUZW1wbGF0ZSA9IHRoaXMuYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcoKTtcblxuICAgIC8vIHN0ZXAgMiwgY3JlYXRlIHRoZSBET00gRWxlbWVudCBvZiB0aGUgZmlsdGVyICYgaW5pdGlhbGl6ZSBpdCBpZiBzZWFyY2hUZXJtIGlzIGZpbGxlZFxuICAgIHRoaXMuJGZpbHRlckVsbSA9IHRoaXMuY3JlYXRlRG9tRWxlbWVudChmaWx0ZXJUZW1wbGF0ZSwgc2VhcmNoVGVybSk7XG5cbiAgICAvLyBzdGVwIDMsIHN1YnNjcmliZSB0byB0aGUga2V5dXAgZXZlbnQgYW5kIHJ1biB0aGUgY2FsbGJhY2sgd2hlbiB0aGF0IGhhcHBlbnNcbiAgICAvLyBhbHNvIGFkZC9yZW1vdmUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xuXG4gICAgdGhpcy4kZmlsdGVyRWxtLm9uKCdrZXl1cCBpbnB1dCBjaGFuZ2UnLCAoZTogYW55KSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSAnJztcbiAgICAgIGlmIChlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlKSB7XG4gICAgICAgIGxldCB0YXJnZXRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICBjb25zdCBlbmFibGVXaGl0ZVNwYWNlVHJpbSA9IHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlRmlsdGVyVHJpbVdoaXRlU3BhY2UgfHwgdGhpcy5jb2x1bW5GaWx0ZXIuZW5hYmxlVHJpbVdoaXRlU3BhY2U7XG4gICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0VmFsdWUgPT09ICdzdHJpbmcnICYmIGVuYWJsZVdoaXRlU3BhY2VUcmltKSB7XG4gICAgICAgICAgdGFyZ2V0VmFsdWUgPSB0YXJnZXRWYWx1ZS50cmltKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBpdCBoYXMgYSBtYXNrLCB3ZSBuZWVkIHRvIGRvIGEgYml0IG1vcmUgd29ya1xuICAgICAgICAvLyBhbmQgcmVwbGFjZSB0aGUgZmlsdGVyIHN0cmluZyBieSB0aGUgbWFza2VkIG91dHB1dCB3aXRob3V0IHRyaWdnZXJpbmcgYW4gZXZlbnRcbiAgICAgICAgY29uc3QgdW5tYXNrZWRWYWx1ZSA9IHRoaXMudW5tYXNrVmFsdWUodGFyZ2V0VmFsdWUpO1xuICAgICAgICBjb25zdCBtYXNrZWRWYWx1ZSA9IHRoaXMubWFza1ZhbHVlKHVubWFza2VkVmFsdWUpO1xuICAgICAgICB2YWx1ZSA9IHVubWFza2VkVmFsdWU7XG5cbiAgICAgICAgaWYgKGUua2V5Q29kZSA+PSA0OCkge1xuICAgICAgICAgIHRoaXMuJGZpbHRlckVsbS52YWwobWFza2VkVmFsdWUpOyAvLyByZXBsYWNlIGZpbHRlciBzdHJpbmcgd2l0aCBtYXNrZWQgc3RyaW5nXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrKGUsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgY2xlYXJGaWx0ZXJUcmlnZ2VyZWQ6IHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkLCBzaG91bGRUcmlnZ2VyUXVlcnk6IHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSB9KTtcbiAgICAgICAgdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJyk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBvcGVyYXRvcjogdGhpcy5vcGVyYXRvciwgc2VhcmNoVGVybXM6IFt2YWx1ZV0sIHNob3VsZFRyaWdnZXJRdWVyeTogdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5IH0pO1xuICAgICAgfVxuICAgICAgLy8gcmVzZXQgYm90aCBmbGFncyBmb3IgbmV4dCB1c2VcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XG4gICAgICB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEZyb20gYSByZWd1bGFyIHN0cmluZywgd2Ugd2lsbCB1c2UgdGhlIG1hc2sgdG8gb3V0cHV0IGEgbmV3IHN0cmluZyAqL1xuICBwcml2YXRlIG1hc2tWYWx1ZShpbnB1dFZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgbWFza2VkVmFsdWUgPSAnJztcblxuICAgIGlmICh0aGlzLmlucHV0TWFzaykge1xuICAgICAgbWFza2VkVmFsdWUgPSB0aGlzLmlucHV0TWFzay5yZXBsYWNlKC9bMDlBXS9naSwgKG1hdGNoKSA9PiB7XG4gICAgICAgIC8vIG9ubHkgcmVwbGFjZSB0aGUgY2hhciB3aGVuIHRoZSBtYXNrIGlzIGEgMCBvciA5IGZvciBhIGRpZ2l0IE9SIHRoZSBtYXNrIGlzIFwiQVwiIGFuZCB0aGUgY2hhciBpcyBhIG5vbi1kaWdpdCBtZWFuaW5nIGEgc3RyaW5nIGNoYXJcbiAgICAgICAgaWYgKFxuICAgICAgICAgICgobWF0Y2ggPT09ICcwJyB8fCBtYXRjaCA9PT0gJzknKSAmJiAvXFxkKy9nLnRlc3QoaW5wdXRWYWx1ZVtpXSkpICAgIC8vIG1hc2sgaXMgMCBvciA5IGFuZCB2YWx1ZSBpcyBhIGRpZ2l0XG4gICAgICAgICAgfHwgKG1hdGNoLnRvVXBwZXJDYXNlKCkgPT09ICdBJyAmJiAvW15cXGRdKy9naS50ZXN0KGlucHV0VmFsdWVbaV0pKSAgLy8gT1IgbWFzayBpcyBhbiBcIkFcIiBhbmQgdmFsdWUgaXMgbm9uLWRpZ2l0XG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBpbnB1dFZhbHVlW2krK10gfHwgJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hc2tlZFZhbHVlO1xuICB9XG5cbiAgLyoqIEZyb20gYSBtYXNrZWQgc3RyaW5nLCB3ZSB3aWxsIHJlbW92ZSB0aGUgbWFzayBhbmQgbWFrZSBhIHJlZ3VsYXIgc3RyaW5nIGFnYWluICovXG4gIHByaXZhdGUgdW5tYXNrVmFsdWUobWFza2VkVmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLy8gcmVtb3ZlIGFueXRoaW5nIGVsc2UgYnV0IGRpZ2l0cyBhbmQgY2hhcnMgZnJvbSBib3RoIHRoZSBpbnB1dCBtYXNrIGFuZCB0aGUgaW5wdXQgbWFza2VkIHZhbHVlIGZvciBsYXRlciBjb21wYXJpc29uXG4gICAgLy8gZS5nLiAoMDAwKSAwMDAtMDAwMCB3b3VsZCByZXR1cm4gMDAwMDAwMDAwMFxuICAgIGNvbnN0IHZhbHVlV2l0aG91dFN5bWJvbHMgPSBtYXNrZWRWYWx1ZS5yZXBsYWNlKC9bXjAtOWEtel0qL2dpLCAnJyk7XG4gICAgY29uc3QgbWFza1dpdGhvdXRTeW1ib2xzID0gdGhpcy5pbnB1dE1hc2sucmVwbGFjZSgvW14wLTlhLXpdKi9naSwgJycpO1xuXG4gICAgLy8gdGhlbiB3ZSBjYW4gYW5hbHl6ZSBpZiBlYWNoIGNoYXIgb24gZWFjaCBpbmRleGVzIGVxdWFscyB3aGF0IHRoZSBtYXNrIHJlcXVpcmVzLCBpZiBub3QgdGhlIGNoYXIgd2lsbCBiZSBkaXNyZWdhcmRlZCBmcm9tIHRoZSBvdXRwdXRcbiAgICAvLyBiYXNpY2FsbHksIGlmIG91ciBtYXNrIGlzIFwiMEEwXCIgYW5kIGlucHV0IHZhbHVlIGlzIFwiMmFiXCIsIHRoZW4gb25seSBcIjJhXCIgd2lsbCBiZSByZXR1cm5lZCBzaW5jZSB0aGUgbGFzdCBjaGFyIFwiYlwiIGlzIG5vdCBwYXJ0IG9mIHRoZSBtYXNrIGFuZCBpcyBpbnZhbGlkXG4gICAgbGV0IG91dHB1dCA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFza1dpdGhvdXRTeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodmFsdWVXaXRob3V0U3ltYm9sc1tpXSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKChtYXNrV2l0aG91dFN5bWJvbHNbaV0gPT09ICcwJyB8fCBtYXNrV2l0aG91dFN5bWJvbHNbaV0gPT09ICc5JykgJiYgL1xcZCsvZy50ZXN0KHZhbHVlV2l0aG91dFN5bWJvbHNbaV0pKSAgICAvLyBtYXNrIGlzIDAgb3IgOSBhbmQgdmFsdWUgaXMgYSBkaWdpdFxuICAgICAgICAgIHx8IChtYXNrV2l0aG91dFN5bWJvbHNbaV0udG9VcHBlckNhc2UoKSA9PT0gJ0EnICYmIC9bXlxcZF0rL2dpLnRlc3QodmFsdWVXaXRob3V0U3ltYm9sc1tpXSkpICAvLyBPUiBtYXNrIGlzIGFuIFwiQVwiIGFuZCB2YWx1ZSBpcyBub24tZGlnaXRcbiAgICAgICAgKSB7XG4gICAgICAgICAgb3V0cHV0ICs9IHZhbHVlV2l0aG91dFN5bWJvbHNbaV07IC8vIHZhbGlkIGFuZCBtYXRjaGVzIHRoZSBNYXNrLCBzbyB3ZSBjYW4gYWRkIGl0IHVwIHRvIHRoZSBzdHJpbmcgb3V0cHV0XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG59XG4iXX0=