/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var InputFilter = /** @class */ (function () {
    function InputFilter() {
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
        this._inputType = 'text';
    }
    Object.defineProperty(InputFilter.prototype, "columnFilter", {
        /** Getter for the Column Filter */
        get: /**
         * Getter for the Column Filter
         * @return {?}
         */
        function () {
            return this.columnDef && this.columnDef.filter || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputFilter.prototype, "inputType", {
        /** Getter of input type (text, number, password) */
        get: /**
         * Getter of input type (text, number, password)
         * @return {?}
         */
        function () {
            return this._inputType;
        },
        /** Setter of input type (text, number, password) */
        set: /**
         * Setter of input type (text, number, password)
         * @param {?} type
         * @return {?}
         */
        function (type) {
            this._inputType = type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputFilter.prototype, "operator", {
        /** Getter of the Operator to use when doing the filter comparing */
        get: /**
         * Getter of the Operator to use when doing the filter comparing
         * @return {?}
         */
        function () {
            return this.columnDef && this.columnDef.filter && this.columnDef.filter.operator || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputFilter.prototype, "gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: /**
         * Getter for the Grid Options pulled through the Grid Object
         * @protected
         * @return {?}
         */
        function () {
            return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize the Filter
     */
    /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    InputFilter.prototype.init = /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    function (args) {
        var _this = this;
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
            var value = e && e.target && e.target.value || '';
            /** @type {?} */
            var enableWhiteSpaceTrim = _this.gridOptions.enableFilterTrimWhiteSpace || _this.columnFilter.enableTrimWhiteSpace;
            if (typeof value === 'string' && enableWhiteSpaceTrim) {
                value = value.trim();
            }
            if (_this._clearFilterTriggered) {
                _this.callback(e, { columnDef: _this.columnDef, clearFilterTriggered: _this._clearFilterTriggered, shouldTriggerQuery: _this._shouldTriggerQuery });
                _this.$filterElm.removeClass('filled');
            }
            else {
                value === '' ? _this.$filterElm.removeClass('filled') : _this.$filterElm.addClass('filled');
                _this.callback(e, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: [value], shouldTriggerQuery: _this._shouldTriggerQuery });
            }
            // reset both flags for next use
            _this._clearFilterTriggered = false;
            _this._shouldTriggerQuery = true;
        }));
    };
    /**
     * Clear the filter value
     */
    /**
     * Clear the filter value
     * @param {?=} shouldTriggerQuery
     * @return {?}
     */
    InputFilter.prototype.clear = /**
     * Clear the filter value
     * @param {?=} shouldTriggerQuery
     * @return {?}
     */
    function (shouldTriggerQuery) {
        if (shouldTriggerQuery === void 0) { shouldTriggerQuery = true; }
        if (this.$filterElm) {
            this._clearFilterTriggered = true;
            this._shouldTriggerQuery = shouldTriggerQuery;
            this.searchTerms = [];
            this.$filterElm.val('');
            this.$filterElm.trigger('keyup');
        }
    };
    /**
     * destroy the filter
     */
    /**
     * destroy the filter
     * @return {?}
     */
    InputFilter.prototype.destroy = /**
     * destroy the filter
     * @return {?}
     */
    function () {
        if (this.$filterElm) {
            this.$filterElm.off('keyup input change').remove();
        }
    };
    /**
     * Set value(s) on the DOM element
     */
    /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    InputFilter.prototype.setValues = /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    function (values) {
        if (values) {
            this.$filterElm.val(values);
        }
    };
    //
    // protected functions
    // ------------------
    /**
     * Create the HTML template as a string
     */
    //
    // protected functions
    // ------------------
    /**
     * Create the HTML template as a string
     * @protected
     * @return {?}
     */
    InputFilter.prototype.buildTemplateHtmlString = 
    //
    // protected functions
    // ------------------
    /**
     * Create the HTML template as a string
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        var placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        if (this.columnFilter && this.columnFilter.placeholder) {
            placeholder = this.columnFilter.placeholder;
        }
        return "<input type=\"" + (this._inputType || 'text') + "\" role=\"presentation\"  autocomplete=\"off\" class=\"form-control search-filter filter-" + fieldId + "\" placeholder=\"" + placeholder + "\"><span></span>";
    };
    /**
     * From the html template string, create a DOM element
     * @param filterTemplate
     */
    /**
     * From the html template string, create a DOM element
     * @protected
     * @param {?} filterTemplate
     * @param {?=} searchTerm
     * @return {?}
     */
    InputFilter.prototype.createDomElement = /**
     * From the html template string, create a DOM element
     * @protected
     * @param {?} filterTemplate
     * @param {?=} searchTerm
     * @return {?}
     */
    function (filterTemplate, searchTerm) {
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        var $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        /** @type {?} */
        var $filterElm = $(filterTemplate);
        $filterElm.val(searchTerm);
        $filterElm.attr('id', "filter-" + fieldId);
        $filterElm.data('columnId', fieldId);
        // if there's a search term, we will add the "filled" class for styling purposes
        if (searchTerm) {
            $filterElm.addClass('filled');
        }
        // append the new DOM element to the header row
        if ($filterElm && typeof $filterElm.appendTo === 'function') {
            $filterElm.appendTo($headerElm);
        }
        return $filterElm;
    };
    return InputFilter;
}());
export { InputFilter };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    InputFilter.prototype._clearFilterTriggered;
    /**
     * @type {?}
     * @protected
     */
    InputFilter.prototype._shouldTriggerQuery;
    /**
     * @type {?}
     * @protected
     */
    InputFilter.prototype._inputType;
    /**
     * @type {?}
     * @protected
     */
    InputFilter.prototype.$filterElm;
    /** @type {?} */
    InputFilter.prototype.grid;
    /** @type {?} */
    InputFilter.prototype.searchTerms;
    /** @type {?} */
    InputFilter.prototype.columnDef;
    /** @type {?} */
    InputFilter.prototype.callback;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRGaWx0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2ZpbHRlcnMvaW5wdXRGaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQWVBO0lBVUU7UUFUVSwwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDOUIsd0JBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQzNCLGVBQVUsR0FBRyxNQUFNLENBQUM7SUFPZCxDQUFDO0lBR2pCLHNCQUFJLHFDQUFZO1FBRGhCLG1DQUFtQzs7Ozs7UUFDbkM7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ3ZELENBQUM7OztPQUFBO0lBR0Qsc0JBQUksa0NBQVM7UUFEYixvREFBb0Q7Ozs7O1FBQ3BEO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7UUFFRCxvREFBb0Q7Ozs7OztRQUNwRCxVQUFjLElBQVk7WUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQzs7O09BTEE7SUFRRCxzQkFBSSxpQ0FBUTtRQURaLG9FQUFvRTs7Ozs7UUFDcEU7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUN6RixDQUFDOzs7T0FBQTtJQUdELHNCQUFjLG9DQUFXO1FBRHpCLGlFQUFpRTs7Ozs7O1FBQ2pFO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzNFLENBQUM7OztPQUFBO0lBRUQ7O09BRUc7Ozs7OztJQUNILDBCQUFJOzs7OztJQUFKLFVBQUssSUFBcUI7UUFBMUIsaUJBbUNDO1FBbENDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7OztZQUdwQyxVQUFVLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRTs7O1lBRzNFLGNBQWMsR0FBRyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7UUFFckQsdUZBQXVGO1FBQ3ZGLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVwRSw4RUFBOEU7UUFDOUUsc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLG9CQUFvQjs7OztRQUFFLFVBQUMsQ0FBTTs7Z0JBQzFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFOztnQkFDM0Msb0JBQW9CLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQywwQkFBMEIsSUFBSSxLQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQjtZQUNsSCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxvQkFBb0IsRUFBRTtnQkFDckQsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN0QjtZQUVELElBQUksS0FBSSxDQUFDLHFCQUFxQixFQUFFO2dCQUM5QixLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFJLENBQUMsU0FBUyxFQUFFLG9CQUFvQixFQUFFLEtBQUksQ0FBQyxxQkFBcUIsRUFBRSxrQkFBa0IsRUFBRSxLQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO2dCQUNoSixLQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN2QztpQkFBTTtnQkFDTCxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzFGLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUksQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsS0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQzthQUM5STtZQUNELGdDQUFnQztZQUNoQyxLQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1lBQ25DLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDbEMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNILDJCQUFLOzs7OztJQUFMLFVBQU0sa0JBQXlCO1FBQXpCLG1DQUFBLEVBQUEseUJBQXlCO1FBQzdCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztZQUM5QyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNsQztJQUNILENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCw2QkFBTzs7OztJQUFQO1FBQ0UsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDcEQ7SUFDSCxDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNILCtCQUFTOzs7OztJQUFULFVBQVUsTUFBa0I7UUFDMUIsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM3QjtJQUNILENBQUM7SUFFRCxFQUFFO0lBQ0Ysc0JBQXNCO0lBQ3RCLHFCQUFxQjtJQUVyQjs7T0FFRzs7Ozs7Ozs7O0lBQ08sNkNBQXVCOzs7Ozs7Ozs7SUFBakM7O1lBQ1EsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFOztZQUMvQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUM3RixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUU7WUFDdEQsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDO1NBQzdDO1FBQ0QsT0FBTyxvQkFBZ0IsSUFBSSxDQUFDLFVBQVUsSUFBSSxNQUFNLGtHQUFzRixPQUFPLHlCQUFrQixXQUFXLHFCQUFpQixDQUFDO0lBQzlMLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7O0lBQ08sc0NBQWdCOzs7Ozs7O0lBQTFCLFVBQTJCLGNBQXNCLEVBQUUsVUFBdUI7O1lBQ2xFLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTs7WUFDN0MsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDO1FBQ3hELENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7O1lBR2hCLFVBQVUsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDO1FBRXBDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0IsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsWUFBVSxPQUFTLENBQUMsQ0FBQztRQUMzQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVyQyxnRkFBZ0Y7UUFDaEYsSUFBSSxVQUFVLEVBQUU7WUFDZCxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9CO1FBRUQsK0NBQStDO1FBQy9DLElBQUksVUFBVSxJQUFJLE9BQU8sVUFBVSxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUU7WUFDM0QsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNqQztRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUF4SkQsSUF3SkM7Ozs7Ozs7SUF2SkMsNENBQXdDOzs7OztJQUN4QywwQ0FBcUM7Ozs7O0lBQ3JDLGlDQUE4Qjs7Ozs7SUFDOUIsaUNBQTBCOztJQUMxQiwyQkFBVTs7SUFDVixrQ0FBMEI7O0lBQzFCLGdDQUFrQjs7SUFDbEIsK0JBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29sdW1uLFxuICBDb2x1bW5GaWx0ZXIsXG4gIEZpbHRlcixcbiAgRmlsdGVyQXJndW1lbnRzLFxuICBGaWx0ZXJDYWxsYmFjayxcbiAgR3JpZE9wdGlvbixcbiAgT3BlcmF0b3JUeXBlLFxuICBPcGVyYXRvclN0cmluZyxcbiAgU2VhcmNoVGVybSxcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5cbmV4cG9ydCBjbGFzcyBJbnB1dEZpbHRlciBpbXBsZW1lbnRzIEZpbHRlciB7XG4gIHByb3RlY3RlZCBfY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTtcbiAgcHJvdGVjdGVkIF9zaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlO1xuICBwcm90ZWN0ZWQgX2lucHV0VHlwZSA9ICd0ZXh0JztcbiAgcHJvdGVjdGVkICRmaWx0ZXJFbG06IGFueTtcbiAgZ3JpZDogYW55O1xuICBzZWFyY2hUZXJtczogU2VhcmNoVGVybVtdO1xuICBjb2x1bW5EZWY6IENvbHVtbjtcbiAgY2FsbGJhY2s6IEZpbHRlckNhbGxiYWNrO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIENvbHVtbiBGaWx0ZXIgKi9cbiAgZ2V0IGNvbHVtbkZpbHRlcigpOiBDb2x1bW5GaWx0ZXIge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgfHwge307XG4gIH1cblxuICAvKiogR2V0dGVyIG9mIGlucHV0IHR5cGUgKHRleHQsIG51bWJlciwgcGFzc3dvcmQpICovXG4gIGdldCBpbnB1dFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lucHV0VHlwZTtcbiAgfVxuXG4gIC8qKiBTZXR0ZXIgb2YgaW5wdXQgdHlwZSAodGV4dCwgbnVtYmVyLCBwYXNzd29yZCkgKi9cbiAgc2V0IGlucHV0VHlwZSh0eXBlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9pbnB1dFR5cGUgPSB0eXBlO1xuICB9XG5cbiAgLyoqIEdldHRlciBvZiB0aGUgT3BlcmF0b3IgdG8gdXNlIHdoZW4gZG9pbmcgdGhlIGZpbHRlciBjb21wYXJpbmcgKi9cbiAgZ2V0IG9wZXJhdG9yKCk6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlci5vcGVyYXRvciB8fCAnJztcbiAgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXG4gIHByb3RlY3RlZCBnZXQgZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XG4gICAgcmV0dXJuICh0aGlzLmdyaWQgJiYgdGhpcy5ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIEZpbHRlclxuICAgKi9cbiAgaW5pdChhcmdzOiBGaWx0ZXJBcmd1bWVudHMpIHtcbiAgICB0aGlzLmdyaWQgPSBhcmdzLmdyaWQ7XG4gICAgdGhpcy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2s7XG4gICAgdGhpcy5jb2x1bW5EZWYgPSBhcmdzLmNvbHVtbkRlZjtcbiAgICB0aGlzLnNlYXJjaFRlcm1zID0gYXJncy5zZWFyY2hUZXJtcyB8fCBbXTtcblxuICAgIC8vIGZpbHRlciBpbnB1dCBjYW4gb25seSBoYXZlIDEgc2VhcmNoIHRlcm0sIHNvIHdlIHdpbGwgdXNlIHRoZSAxc3QgYXJyYXkgaW5kZXggaWYgaXQgZXhpc3RcbiAgICBjb25zdCBzZWFyY2hUZXJtID0gKEFycmF5LmlzQXJyYXkodGhpcy5zZWFyY2hUZXJtcykgJiYgdGhpcy5zZWFyY2hUZXJtc1swXSkgfHwgJyc7XG5cbiAgICAvLyBzdGVwIDEsIGNyZWF0ZSBIVE1MIHN0cmluZyB0ZW1wbGF0ZVxuICAgIGNvbnN0IGZpbHRlclRlbXBsYXRlID0gdGhpcy5idWlsZFRlbXBsYXRlSHRtbFN0cmluZygpO1xuXG4gICAgLy8gc3RlcCAyLCBjcmVhdGUgdGhlIERPTSBFbGVtZW50IG9mIHRoZSBmaWx0ZXIgJiBpbml0aWFsaXplIGl0IGlmIHNlYXJjaFRlcm0gaXMgZmlsbGVkXG4gICAgdGhpcy4kZmlsdGVyRWxtID0gdGhpcy5jcmVhdGVEb21FbGVtZW50KGZpbHRlclRlbXBsYXRlLCBzZWFyY2hUZXJtKTtcblxuICAgIC8vIHN0ZXAgMywgc3Vic2NyaWJlIHRvIHRoZSBrZXl1cCBldmVudCBhbmQgcnVuIHRoZSBjYWxsYmFjayB3aGVuIHRoYXQgaGFwcGVuc1xuICAgIC8vIGFsc28gYWRkL3JlbW92ZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXG4gICAgdGhpcy4kZmlsdGVyRWxtLm9uKCdrZXl1cCBpbnB1dCBjaGFuZ2UnLCAoZTogYW55KSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSBlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlIHx8ICcnO1xuICAgICAgY29uc3QgZW5hYmxlV2hpdGVTcGFjZVRyaW0gPSB0aGlzLmdyaWRPcHRpb25zLmVuYWJsZUZpbHRlclRyaW1XaGl0ZVNwYWNlIHx8IHRoaXMuY29sdW1uRmlsdGVyLmVuYWJsZVRyaW1XaGl0ZVNwYWNlO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgZW5hYmxlV2hpdGVTcGFjZVRyaW0pIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50cmltKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrKGUsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgY2xlYXJGaWx0ZXJUcmlnZ2VyZWQ6IHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkLCBzaG91bGRUcmlnZ2VyUXVlcnk6IHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSB9KTtcbiAgICAgICAgdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID09PSAnJyA/IHRoaXMuJGZpbHRlckVsbS5yZW1vdmVDbGFzcygnZmlsbGVkJykgOiB0aGlzLiRmaWx0ZXJFbG0uYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xuICAgICAgICB0aGlzLmNhbGxiYWNrKGUsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgb3BlcmF0b3I6IHRoaXMub3BlcmF0b3IsIHNlYXJjaFRlcm1zOiBbdmFsdWVdLCBzaG91bGRUcmlnZ2VyUXVlcnk6IHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSB9KTtcbiAgICAgIH1cbiAgICAgIC8vIHJlc2V0IGJvdGggZmxhZ3MgZm9yIG5leHQgdXNlXG4gICAgICB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgZmlsdGVyIHZhbHVlXG4gICAqL1xuICBjbGVhcihzaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlKSB7XG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSkge1xuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gc2hvdWxkVHJpZ2dlclF1ZXJ5O1xuICAgICAgdGhpcy5zZWFyY2hUZXJtcyA9IFtdO1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLnZhbCgnJyk7XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0udHJpZ2dlcigna2V5dXAnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZGVzdHJveSB0aGUgZmlsdGVyXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLiRmaWx0ZXJFbG0pIHtcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5vZmYoJ2tleXVwIGlucHV0IGNoYW5nZScpLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdmFsdWUocykgb24gdGhlIERPTSBlbGVtZW50XG4gICAqL1xuICBzZXRWYWx1ZXModmFsdWVzOiBTZWFyY2hUZXJtKSB7XG4gICAgaWYgKHZhbHVlcykge1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLnZhbCh2YWx1ZXMpO1xuICAgIH1cbiAgfVxuXG4gIC8vXG4gIC8vIHByb3RlY3RlZCBmdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIENyZWF0ZSB0aGUgSFRNTCB0ZW1wbGF0ZSBhcyBhIHN0cmluZ1xuICAgKi9cbiAgcHJvdGVjdGVkIGJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKCkge1xuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcbiAgICBsZXQgcGxhY2Vob2xkZXIgPSAodGhpcy5ncmlkT3B0aW9ucykgPyAodGhpcy5ncmlkT3B0aW9ucy5kZWZhdWx0RmlsdGVyUGxhY2Vob2xkZXIgfHwgJycpIDogJyc7XG4gICAgaWYgKHRoaXMuY29sdW1uRmlsdGVyICYmIHRoaXMuY29sdW1uRmlsdGVyLnBsYWNlaG9sZGVyKSB7XG4gICAgICBwbGFjZWhvbGRlciA9IHRoaXMuY29sdW1uRmlsdGVyLnBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICByZXR1cm4gYDxpbnB1dCB0eXBlPVwiJHt0aGlzLl9pbnB1dFR5cGUgfHwgJ3RleHQnfVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIiAgYXV0b2NvbXBsZXRlPVwib2ZmXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgc2VhcmNoLWZpbHRlciBmaWx0ZXItJHtmaWVsZElkfVwiIHBsYWNlaG9sZGVyPVwiJHtwbGFjZWhvbGRlcn1cIj48c3Bhbj48L3NwYW4+YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGcm9tIHRoZSBodG1sIHRlbXBsYXRlIHN0cmluZywgY3JlYXRlIGEgRE9NIGVsZW1lbnRcbiAgICogQHBhcmFtIGZpbHRlclRlbXBsYXRlXG4gICAqL1xuICBwcm90ZWN0ZWQgY3JlYXRlRG9tRWxlbWVudChmaWx0ZXJUZW1wbGF0ZTogc3RyaW5nLCBzZWFyY2hUZXJtPzogU2VhcmNoVGVybSkge1xuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcbiAgICBjb25zdCAkaGVhZGVyRWxtID0gdGhpcy5ncmlkLmdldEhlYWRlclJvd0NvbHVtbihmaWVsZElkKTtcbiAgICAkKCRoZWFkZXJFbG0pLmVtcHR5KCk7XG5cbiAgICAvLyBjcmVhdGUgdGhlIERPTSBlbGVtZW50ICYgYWRkIGFuIElEIGFuZCBmaWx0ZXIgY2xhc3NcbiAgICBjb25zdCAkZmlsdGVyRWxtID0gJChmaWx0ZXJUZW1wbGF0ZSk7XG5cbiAgICAkZmlsdGVyRWxtLnZhbChzZWFyY2hUZXJtKTtcbiAgICAkZmlsdGVyRWxtLmF0dHIoJ2lkJywgYGZpbHRlci0ke2ZpZWxkSWR9YCk7XG4gICAgJGZpbHRlckVsbS5kYXRhKCdjb2x1bW5JZCcsIGZpZWxkSWQpO1xuXG4gICAgLy8gaWYgdGhlcmUncyBhIHNlYXJjaCB0ZXJtLCB3ZSB3aWxsIGFkZCB0aGUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xuICAgIGlmIChzZWFyY2hUZXJtKSB7XG4gICAgICAkZmlsdGVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKTtcbiAgICB9XG5cbiAgICAvLyBhcHBlbmQgdGhlIG5ldyBET00gZWxlbWVudCB0byB0aGUgaGVhZGVyIHJvd1xuICAgIGlmICgkZmlsdGVyRWxtICYmIHR5cGVvZiAkZmlsdGVyRWxtLmFwcGVuZFRvID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAkZmlsdGVyRWxtLmFwcGVuZFRvKCRoZWFkZXJFbG0pO1xuICAgIH1cblxuICAgIHJldHVybiAkZmlsdGVyRWxtO1xuICB9XG59XG4iXX0=