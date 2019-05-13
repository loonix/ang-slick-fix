/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { InputFilter } from './inputFilter';
var InputMaskFilter = /** @class */ (function (_super) {
    tslib_1.__extends(InputMaskFilter, _super);
    /** Initialize the Filter */
    function InputMaskFilter() {
        var _this = _super.call(this) || this;
        _this.inputType = 'text';
        return _this;
    }
    Object.defineProperty(InputMaskFilter.prototype, "inputMask", {
        /** Getter of the input mask, when provided */
        get: /**
         * Getter of the input mask, when provided
         * @return {?}
         */
        function () {
            return this.columnDef.params && this.columnDef.params && this.columnDef.params.mask;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Override the Filter init used by SlickGrid
     */
    /**
     * Override the Filter init used by SlickGrid
     * @param {?} args
     * @return {?}
     */
    InputMaskFilter.prototype.init = /**
     * Override the Filter init used by SlickGrid
     * @param {?} args
     * @return {?}
     */
    function (args) {
        var _this = this;
        if (!args) {
            throw new Error('[Aurelia-SlickGrid] A filter must always have an "init()" with valid arguments.');
        }
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        /** @type {?} */
        var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        // step 1, create HTML string template
        /** @type {?} */
        var filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
        this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
        // step 3, subscribe to the keyup event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.on('keyup input change', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var value = '';
            if (e && e.target && e.target.value) {
                /** @type {?} */
                var targetValue = e.target.value;
                /** @type {?} */
                var enableWhiteSpaceTrim = _this.gridOptions.enableFilterTrimWhiteSpace || _this.columnFilter.enableTrimWhiteSpace;
                if (typeof targetValue === 'string' && enableWhiteSpaceTrim) {
                    targetValue = targetValue.trim();
                }
                // if it has a mask, we need to do a bit more work
                // and replace the filter string by the masked output without triggering an event
                /** @type {?} */
                var unmaskedValue = _this.unmaskValue(targetValue);
                /** @type {?} */
                var maskedValue = _this.maskValue(unmaskedValue);
                value = unmaskedValue;
                if (e.keyCode >= 48) {
                    _this.$filterElm.val(maskedValue); // replace filter string with masked string
                    e.preventDefault();
                }
            }
            if (_this._clearFilterTriggered) {
                _this.callback(e, { columnDef: _this.columnDef, clearFilterTriggered: _this._clearFilterTriggered, shouldTriggerQuery: _this._shouldTriggerQuery });
                _this.$filterElm.removeClass('filled');
            }
            else {
                _this.$filterElm.addClass('filled');
                _this.callback(e, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: [value], shouldTriggerQuery: _this._shouldTriggerQuery });
            }
            // reset both flags for next use
            _this._clearFilterTriggered = false;
            _this._shouldTriggerQuery = true;
        }));
    };
    /** From a regular string, we will use the mask to output a new string */
    /**
     * From a regular string, we will use the mask to output a new string
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    InputMaskFilter.prototype.maskValue = /**
     * From a regular string, we will use the mask to output a new string
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        /** @type {?} */
        var i = 0;
        /** @type {?} */
        var maskedValue = '';
        if (this.inputMask) {
            maskedValue = this.inputMask.replace(/[09A]/gi, (/**
             * @param {?} match
             * @return {?}
             */
            function (match) {
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
    };
    /** From a masked string, we will remove the mask and make a regular string again */
    /**
     * From a masked string, we will remove the mask and make a regular string again
     * @private
     * @param {?} maskedValue
     * @return {?}
     */
    InputMaskFilter.prototype.unmaskValue = /**
     * From a masked string, we will remove the mask and make a regular string again
     * @private
     * @param {?} maskedValue
     * @return {?}
     */
    function (maskedValue) {
        // remove anything else but digits and chars from both the input mask and the input masked value for later comparison
        // e.g. (000) 000-0000 would return 0000000000
        /** @type {?} */
        var valueWithoutSymbols = maskedValue.replace(/[^0-9a-z]*/gi, '');
        /** @type {?} */
        var maskWithoutSymbols = this.inputMask.replace(/[^0-9a-z]*/gi, '');
        // then we can analyze if each char on each indexes equals what the mask requires, if not the char will be disregarded from the output
        // basically, if our mask is "0A0" and input value is "2ab", then only "2a" will be returned since the last char "b" is not part of the mask and is invalid
        /** @type {?} */
        var output = '';
        for (var i = 0; i < maskWithoutSymbols.length; i++) {
            if (valueWithoutSymbols[i]) {
                if (((maskWithoutSymbols[i] === '0' || maskWithoutSymbols[i] === '9') && /\d+/g.test(valueWithoutSymbols[i])) // mask is 0 or 9 and value is a digit
                    || (maskWithoutSymbols[i].toUpperCase() === 'A' && /[^\d]+/gi.test(valueWithoutSymbols[i])) // OR mask is an "A" and value is non-digit
                ) {
                    output += valueWithoutSymbols[i]; // valid and matches the Mask, so we can add it up to the string output
                }
            }
        }
        return output;
    };
    return InputMaskFilter;
}(InputFilter));
export { InputMaskFilter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRNYXNrRmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL2lucHV0TWFza0ZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHNUM7SUFBcUMsMkNBQVc7SUFDOUMsNEJBQTRCO0lBQzVCO1FBQUEsWUFDRSxpQkFBTyxTQUVSO1FBREMsS0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7O0lBQzFCLENBQUM7SUFHRCxzQkFBSSxzQ0FBUztRQURiLDhDQUE4Qzs7Ozs7UUFDOUM7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN0RixDQUFDOzs7T0FBQTtJQUVEOztPQUVHOzs7Ozs7SUFDSCw4QkFBSTs7Ozs7SUFBSixVQUFLLElBQXFCO1FBQTFCLGlCQXFEQztRQXBEQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyxpRkFBaUYsQ0FBQyxDQUFDO1NBQ3BHO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQzs7O1lBR3BDLFVBQVUsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFOzs7WUFHM0UsY0FBYyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtRQUVyRCx1RkFBdUY7UUFDdkYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRXBFLDhFQUE4RTtRQUM5RSxzREFBc0Q7UUFFdEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsb0JBQW9COzs7O1FBQUUsVUFBQyxDQUFNOztnQkFDMUMsS0FBSyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFOztvQkFDL0IsV0FBVyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSzs7b0JBQzFCLG9CQUFvQixHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsMEJBQTBCLElBQUksS0FBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0I7Z0JBQ2xILElBQUksT0FBTyxXQUFXLEtBQUssUUFBUSxJQUFJLG9CQUFvQixFQUFFO29CQUMzRCxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNsQzs7OztvQkFJSyxhQUFhLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7O29CQUM3QyxXQUFXLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7Z0JBQ2pELEtBQUssR0FBRyxhQUFhLENBQUM7Z0JBRXRCLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLEVBQUU7b0JBQ25CLEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsMkNBQTJDO29CQUM3RSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7aUJBQ3BCO2FBQ0Y7WUFFRCxJQUFJLEtBQUksQ0FBQyxxQkFBcUIsRUFBRTtnQkFDOUIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSSxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxLQUFJLENBQUMscUJBQXFCLEVBQUUsa0JBQWtCLEVBQUUsS0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztnQkFDaEosS0FBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDdkM7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ25DLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUksQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsS0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQzthQUM5STtZQUNELGdDQUFnQztZQUNoQyxLQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1lBQ25DLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDbEMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQseUVBQXlFOzs7Ozs7O0lBQ2pFLG1DQUFTOzs7Ozs7SUFBakIsVUFBa0IsVUFBa0I7O1lBQzlCLENBQUMsR0FBRyxDQUFDOztZQUNMLFdBQVcsR0FBRyxFQUFFO1FBRXBCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUzs7OztZQUFFLFVBQUMsS0FBSztnQkFDcEQsbUlBQW1JO2dCQUNuSSxJQUNFLENBQUMsQ0FBQyxLQUFLLEtBQUssR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUksc0NBQXNDO3VCQUN2RyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFFLDJDQUEyQztrQkFDL0c7b0JBQ0EsT0FBTyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQzlCO2dCQUNELE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxvRkFBb0Y7Ozs7Ozs7SUFDNUUscUNBQVc7Ozs7OztJQUFuQixVQUFvQixXQUFtQjs7OztZQUcvQixtQkFBbUIsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUM7O1lBQzdELGtCQUFrQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUM7Ozs7WUFJakUsTUFBTSxHQUFHLEVBQUU7UUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xELElBQUksbUJBQW1CLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzFCLElBQ0UsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBSSxzQ0FBc0M7dUJBQ2hKLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFFLDJDQUEyQztrQkFDeEk7b0JBQ0EsTUFBTSxJQUFJLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsdUVBQXVFO2lCQUMxRzthQUNGO1NBQ0Y7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBbEhELENBQXFDLFdBQVcsR0FrSC9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5wdXRGaWx0ZXIgfSBmcm9tICcuL2lucHV0RmlsdGVyJztcbmltcG9ydCB7IEZpbHRlckFyZ3VtZW50cyB9IGZyb20gJy4uL21vZGVscy9maWx0ZXJBcmd1bWVudHMuaW50ZXJmYWNlJztcblxuZXhwb3J0IGNsYXNzIElucHV0TWFza0ZpbHRlciBleHRlbmRzIElucHV0RmlsdGVyIHtcbiAgLyoqIEluaXRpYWxpemUgdGhlIEZpbHRlciAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaW5wdXRUeXBlID0gJ3RleHQnO1xuICB9XG5cbiAgLyoqIEdldHRlciBvZiB0aGUgaW5wdXQgbWFzaywgd2hlbiBwcm92aWRlZCAqL1xuICBnZXQgaW5wdXRNYXNrKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmLnBhcmFtcyAmJiB0aGlzLmNvbHVtbkRlZi5wYXJhbXMgJiYgdGhpcy5jb2x1bW5EZWYucGFyYW1zLm1hc2s7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGUgdGhlIEZpbHRlciBpbml0IHVzZWQgYnkgU2xpY2tHcmlkXG4gICAqL1xuICBpbml0KGFyZ3M6IEZpbHRlckFyZ3VtZW50cykge1xuICAgIGlmICghYXJncykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbQXVyZWxpYS1TbGlja0dyaWRdIEEgZmlsdGVyIG11c3QgYWx3YXlzIGhhdmUgYW4gXCJpbml0KClcIiB3aXRoIHZhbGlkIGFyZ3VtZW50cy4nKTtcbiAgICB9XG4gICAgdGhpcy5ncmlkID0gYXJncy5ncmlkO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBhcmdzLmNhbGxiYWNrO1xuICAgIHRoaXMuY29sdW1uRGVmID0gYXJncy5jb2x1bW5EZWY7XG4gICAgdGhpcy5zZWFyY2hUZXJtcyA9IGFyZ3Muc2VhcmNoVGVybXMgfHwgW107XG5cbiAgICAvLyBmaWx0ZXIgaW5wdXQgY2FuIG9ubHkgaGF2ZSAxIHNlYXJjaCB0ZXJtLCBzbyB3ZSB3aWxsIHVzZSB0aGUgMXN0IGFycmF5IGluZGV4IGlmIGl0IGV4aXN0XG4gICAgY29uc3Qgc2VhcmNoVGVybSA9IChBcnJheS5pc0FycmF5KHRoaXMuc2VhcmNoVGVybXMpICYmIHRoaXMuc2VhcmNoVGVybXNbMF0pIHx8ICcnO1xuXG4gICAgLy8gc3RlcCAxLCBjcmVhdGUgSFRNTCBzdHJpbmcgdGVtcGxhdGVcbiAgICBjb25zdCBmaWx0ZXJUZW1wbGF0ZSA9IHRoaXMuYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcoKTtcblxuICAgIC8vIHN0ZXAgMiwgY3JlYXRlIHRoZSBET00gRWxlbWVudCBvZiB0aGUgZmlsdGVyICYgaW5pdGlhbGl6ZSBpdCBpZiBzZWFyY2hUZXJtIGlzIGZpbGxlZFxuICAgIHRoaXMuJGZpbHRlckVsbSA9IHRoaXMuY3JlYXRlRG9tRWxlbWVudChmaWx0ZXJUZW1wbGF0ZSwgc2VhcmNoVGVybSk7XG5cbiAgICAvLyBzdGVwIDMsIHN1YnNjcmliZSB0byB0aGUga2V5dXAgZXZlbnQgYW5kIHJ1biB0aGUgY2FsbGJhY2sgd2hlbiB0aGF0IGhhcHBlbnNcbiAgICAvLyBhbHNvIGFkZC9yZW1vdmUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xuXG4gICAgdGhpcy4kZmlsdGVyRWxtLm9uKCdrZXl1cCBpbnB1dCBjaGFuZ2UnLCAoZTogYW55KSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSAnJztcbiAgICAgIGlmIChlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlKSB7XG4gICAgICAgIGxldCB0YXJnZXRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICBjb25zdCBlbmFibGVXaGl0ZVNwYWNlVHJpbSA9IHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlRmlsdGVyVHJpbVdoaXRlU3BhY2UgfHwgdGhpcy5jb2x1bW5GaWx0ZXIuZW5hYmxlVHJpbVdoaXRlU3BhY2U7XG4gICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0VmFsdWUgPT09ICdzdHJpbmcnICYmIGVuYWJsZVdoaXRlU3BhY2VUcmltKSB7XG4gICAgICAgICAgdGFyZ2V0VmFsdWUgPSB0YXJnZXRWYWx1ZS50cmltKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBpdCBoYXMgYSBtYXNrLCB3ZSBuZWVkIHRvIGRvIGEgYml0IG1vcmUgd29ya1xuICAgICAgICAvLyBhbmQgcmVwbGFjZSB0aGUgZmlsdGVyIHN0cmluZyBieSB0aGUgbWFza2VkIG91dHB1dCB3aXRob3V0IHRyaWdnZXJpbmcgYW4gZXZlbnRcbiAgICAgICAgY29uc3QgdW5tYXNrZWRWYWx1ZSA9IHRoaXMudW5tYXNrVmFsdWUodGFyZ2V0VmFsdWUpO1xuICAgICAgICBjb25zdCBtYXNrZWRWYWx1ZSA9IHRoaXMubWFza1ZhbHVlKHVubWFza2VkVmFsdWUpO1xuICAgICAgICB2YWx1ZSA9IHVubWFza2VkVmFsdWU7XG5cbiAgICAgICAgaWYgKGUua2V5Q29kZSA+PSA0OCkge1xuICAgICAgICAgIHRoaXMuJGZpbHRlckVsbS52YWwobWFza2VkVmFsdWUpOyAvLyByZXBsYWNlIGZpbHRlciBzdHJpbmcgd2l0aCBtYXNrZWQgc3RyaW5nXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrKGUsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgY2xlYXJGaWx0ZXJUcmlnZ2VyZWQ6IHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkLCBzaG91bGRUcmlnZ2VyUXVlcnk6IHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSB9KTtcbiAgICAgICAgdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJyk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBvcGVyYXRvcjogdGhpcy5vcGVyYXRvciwgc2VhcmNoVGVybXM6IFt2YWx1ZV0sIHNob3VsZFRyaWdnZXJRdWVyeTogdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5IH0pO1xuICAgICAgfVxuICAgICAgLy8gcmVzZXQgYm90aCBmbGFncyBmb3IgbmV4dCB1c2VcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XG4gICAgICB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEZyb20gYSByZWd1bGFyIHN0cmluZywgd2Ugd2lsbCB1c2UgdGhlIG1hc2sgdG8gb3V0cHV0IGEgbmV3IHN0cmluZyAqL1xuICBwcml2YXRlIG1hc2tWYWx1ZShpbnB1dFZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgbWFza2VkVmFsdWUgPSAnJztcblxuICAgIGlmICh0aGlzLmlucHV0TWFzaykge1xuICAgICAgbWFza2VkVmFsdWUgPSB0aGlzLmlucHV0TWFzay5yZXBsYWNlKC9bMDlBXS9naSwgKG1hdGNoKSA9PiB7XG4gICAgICAgIC8vIG9ubHkgcmVwbGFjZSB0aGUgY2hhciB3aGVuIHRoZSBtYXNrIGlzIGEgMCBvciA5IGZvciBhIGRpZ2l0IE9SIHRoZSBtYXNrIGlzIFwiQVwiIGFuZCB0aGUgY2hhciBpcyBhIG5vbi1kaWdpdCBtZWFuaW5nIGEgc3RyaW5nIGNoYXJcbiAgICAgICAgaWYgKFxuICAgICAgICAgICgobWF0Y2ggPT09ICcwJyB8fCBtYXRjaCA9PT0gJzknKSAmJiAvXFxkKy9nLnRlc3QoaW5wdXRWYWx1ZVtpXSkpICAgIC8vIG1hc2sgaXMgMCBvciA5IGFuZCB2YWx1ZSBpcyBhIGRpZ2l0XG4gICAgICAgICAgfHwgKG1hdGNoLnRvVXBwZXJDYXNlKCkgPT09ICdBJyAmJiAvW15cXGRdKy9naS50ZXN0KGlucHV0VmFsdWVbaV0pKSAgLy8gT1IgbWFzayBpcyBhbiBcIkFcIiBhbmQgdmFsdWUgaXMgbm9uLWRpZ2l0XG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBpbnB1dFZhbHVlW2krK10gfHwgJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hc2tlZFZhbHVlO1xuICB9XG5cbiAgLyoqIEZyb20gYSBtYXNrZWQgc3RyaW5nLCB3ZSB3aWxsIHJlbW92ZSB0aGUgbWFzayBhbmQgbWFrZSBhIHJlZ3VsYXIgc3RyaW5nIGFnYWluICovXG4gIHByaXZhdGUgdW5tYXNrVmFsdWUobWFza2VkVmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLy8gcmVtb3ZlIGFueXRoaW5nIGVsc2UgYnV0IGRpZ2l0cyBhbmQgY2hhcnMgZnJvbSBib3RoIHRoZSBpbnB1dCBtYXNrIGFuZCB0aGUgaW5wdXQgbWFza2VkIHZhbHVlIGZvciBsYXRlciBjb21wYXJpc29uXG4gICAgLy8gZS5nLiAoMDAwKSAwMDAtMDAwMCB3b3VsZCByZXR1cm4gMDAwMDAwMDAwMFxuICAgIGNvbnN0IHZhbHVlV2l0aG91dFN5bWJvbHMgPSBtYXNrZWRWYWx1ZS5yZXBsYWNlKC9bXjAtOWEtel0qL2dpLCAnJyk7XG4gICAgY29uc3QgbWFza1dpdGhvdXRTeW1ib2xzID0gdGhpcy5pbnB1dE1hc2sucmVwbGFjZSgvW14wLTlhLXpdKi9naSwgJycpO1xuXG4gICAgLy8gdGhlbiB3ZSBjYW4gYW5hbHl6ZSBpZiBlYWNoIGNoYXIgb24gZWFjaCBpbmRleGVzIGVxdWFscyB3aGF0IHRoZSBtYXNrIHJlcXVpcmVzLCBpZiBub3QgdGhlIGNoYXIgd2lsbCBiZSBkaXNyZWdhcmRlZCBmcm9tIHRoZSBvdXRwdXRcbiAgICAvLyBiYXNpY2FsbHksIGlmIG91ciBtYXNrIGlzIFwiMEEwXCIgYW5kIGlucHV0IHZhbHVlIGlzIFwiMmFiXCIsIHRoZW4gb25seSBcIjJhXCIgd2lsbCBiZSByZXR1cm5lZCBzaW5jZSB0aGUgbGFzdCBjaGFyIFwiYlwiIGlzIG5vdCBwYXJ0IG9mIHRoZSBtYXNrIGFuZCBpcyBpbnZhbGlkXG4gICAgbGV0IG91dHB1dCA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFza1dpdGhvdXRTeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodmFsdWVXaXRob3V0U3ltYm9sc1tpXSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKChtYXNrV2l0aG91dFN5bWJvbHNbaV0gPT09ICcwJyB8fCBtYXNrV2l0aG91dFN5bWJvbHNbaV0gPT09ICc5JykgJiYgL1xcZCsvZy50ZXN0KHZhbHVlV2l0aG91dFN5bWJvbHNbaV0pKSAgICAvLyBtYXNrIGlzIDAgb3IgOSBhbmQgdmFsdWUgaXMgYSBkaWdpdFxuICAgICAgICAgIHx8IChtYXNrV2l0aG91dFN5bWJvbHNbaV0udG9VcHBlckNhc2UoKSA9PT0gJ0EnICYmIC9bXlxcZF0rL2dpLnRlc3QodmFsdWVXaXRob3V0U3ltYm9sc1tpXSkpICAvLyBPUiBtYXNrIGlzIGFuIFwiQVwiIGFuZCB2YWx1ZSBpcyBub24tZGlnaXRcbiAgICAgICAgKSB7XG4gICAgICAgICAgb3V0cHV0ICs9IHZhbHVlV2l0aG91dFN5bWJvbHNbaV07IC8vIHZhbGlkIGFuZCBtYXRjaGVzIHRoZSBNYXNrLCBzbyB3ZSBjYW4gYWRkIGl0IHVwIHRvIHRoZSBzdHJpbmcgb3V0cHV0XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG59XG4iXX0=