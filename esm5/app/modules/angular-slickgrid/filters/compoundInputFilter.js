/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FieldType } from './../models/index';
import { OperatorType, } from './../models/index';
var CompoundInputFilter = /** @class */ (function () {
    function CompoundInputFilter(translate) {
        this.translate = translate;
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
        this._inputType = 'text';
    }
    Object.defineProperty(CompoundInputFilter.prototype, "gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: /**
         * Getter for the Grid Options pulled through the Grid Object
         * @private
         * @return {?}
         */
        function () {
            return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompoundInputFilter.prototype, "columnFilter", {
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
    Object.defineProperty(CompoundInputFilter.prototype, "inputType", {
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
    Object.defineProperty(CompoundInputFilter.prototype, "operator", {
        /** Getter of the Operator to use when doing the filter comparing */
        get: /**
         * Getter of the Operator to use when doing the filter comparing
         * @return {?}
         */
        function () {
            return this._operator || OperatorType.empty;
        },
        /** Getter of the Operator to use when doing the filter comparing */
        set: /**
         * Getter of the Operator to use when doing the filter comparing
         * @param {?} op
         * @return {?}
         */
        function (op) {
            this._operator = op;
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
    CompoundInputFilter.prototype.init = /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    function (args) {
        var _this = this;
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.operator = args.operator;
        this.searchTerms = args.searchTerms || [];
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        /** @type {?} */
        var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        // step 1, create the DOM Element of the filter which contain the compound Operator+Input
        // and initialize it if searchTerms is filled
        this.$filterElm = this.createDomElement(searchTerm);
        // step 3, subscribe to the keyup event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterInputElm.on('keyup input change', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.onTriggerEvent(e);
        }));
        this.$selectOperatorElm.on('change', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.onTriggerEvent(e);
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
    CompoundInputFilter.prototype.clear = /**
     * Clear the filter value
     * @param {?=} shouldTriggerQuery
     * @return {?}
     */
    function (shouldTriggerQuery) {
        if (shouldTriggerQuery === void 0) { shouldTriggerQuery = true; }
        if (this.$filterElm && this.$selectOperatorElm) {
            this._clearFilterTriggered = true;
            this._shouldTriggerQuery = shouldTriggerQuery;
            this.searchTerms = [];
            this.$selectOperatorElm.val(0);
            this.$filterInputElm.val('');
            this.onTriggerEvent(null);
        }
    };
    /**
     * destroy the filter
     */
    /**
     * destroy the filter
     * @return {?}
     */
    CompoundInputFilter.prototype.destroy = /**
     * destroy the filter
     * @return {?}
     */
    function () {
        if (this.$filterElm && this.$selectOperatorElm) {
            this.$filterElm.off('keyup input change').remove();
            this.$selectOperatorElm.off('change');
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
    CompoundInputFilter.prototype.setValues = /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    function (values) {
        if (values && Array.isArray(values)) {
            this.$filterElm.val(values[0]);
        }
    };
    //
    // private functions
    // ------------------
    //
    // private functions
    // ------------------
    /**
     * @private
     * @return {?}
     */
    CompoundInputFilter.prototype.buildInputHtmlString = 
    //
    // private functions
    // ------------------
    /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        if (this.columnFilter && this.columnFilter.placeholder) {
            placeholder = this.columnFilter.placeholder;
        }
        return "<input type=\"" + (this._inputType || 'text') + "\" role=\"presentation\"  autocomplete=\"off\" class=\"form-control\" placeholder=\"" + placeholder + "\" /><span></span>";
    };
    /**
     * @private
     * @return {?}
     */
    CompoundInputFilter.prototype.buildSelectOperatorHtmlString = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var optionValues = this.getOptionValues();
        /** @type {?} */
        var optionValueString = '';
        optionValues.forEach((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            optionValueString += "<option value=\"" + option.operator + "\" title=\"" + option.description + "\">" + option.operator + "</option>";
        }));
        return "<select class=\"form-control\">" + optionValueString + "</select>";
    };
    /**
     * @private
     * @return {?}
     */
    CompoundInputFilter.prototype.getOptionValues = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var type = (this.columnDef.type && this.columnDef.type) ? this.columnDef.type : FieldType.string;
        /** @type {?} */
        var optionValues = [];
        switch (type) {
            case FieldType.string:
                optionValues = [
                    { operator: (/** @type {?} */ ('')), description: this.translate.instant('CONTAINS') },
                    { operator: (/** @type {?} */ ('=')), description: this.translate.instant('EQUALS') },
                    { operator: (/** @type {?} */ ('a*')), description: this.translate.instant('STARTS_WITH') },
                    { operator: (/** @type {?} */ ('*z')), description: this.translate.instant('ENDS_WITH') },
                ];
                break;
            default:
                optionValues = [
                    { operator: (/** @type {?} */ ('')), description: this.translate.instant('CONTAINS') },
                    { operator: (/** @type {?} */ ('=')), description: '' },
                    { operator: (/** @type {?} */ ('<')), description: '' },
                    { operator: (/** @type {?} */ ('<=')), description: '' },
                    { operator: (/** @type {?} */ ('>')), description: '' },
                    { operator: (/** @type {?} */ ('>=')), description: '' },
                    { operator: (/** @type {?} */ ('<>')), description: '' }
                ];
                break;
        }
        return optionValues;
    };
    /**
     * Create the DOM element
     */
    /**
     * Create the DOM element
     * @private
     * @param {?=} searchTerm
     * @return {?}
     */
    CompoundInputFilter.prototype.createDomElement = /**
     * Create the DOM element
     * @private
     * @param {?=} searchTerm
     * @return {?}
     */
    function (searchTerm) {
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        var $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM Select dropdown for the Operator
        this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
        this.$filterInputElm = $(this.buildInputHtmlString());
        /** @type {?} */
        var $filterContainerElm = $("<div class=\"form-group search-filter filter-" + fieldId + "\"></div>");
        /** @type {?} */
        var $containerInputGroup = $("<div class=\"input-group\"></div>");
        /** @type {?} */
        var $operatorInputGroupAddon = $("<div class=\"input-group-addon input-group-prepend operator\"></div>");
        /* the DOM element final structure will be
          <div class="input-group">
            <div class="input-group-addon input-group-prepend operator">
              <select class="form-control"></select>
            </div>
            <input class="form-control" type="text" />
          </div>
        */
        $operatorInputGroupAddon.append(this.$selectOperatorElm);
        $containerInputGroup.append($operatorInputGroupAddon);
        $containerInputGroup.append(this.$filterInputElm);
        // create the DOM element & add an ID and filter class
        $filterContainerElm.append($containerInputGroup);
        $filterContainerElm.attr('id', "filter-" + fieldId);
        this.$filterInputElm.val(searchTerm);
        this.$filterInputElm.data('columnId', fieldId);
        if (this.operator) {
            this.$selectOperatorElm.val(this.operator);
        }
        // if there's a search term, we will add the "filled" class for styling purposes
        if (searchTerm) {
            $filterContainerElm.addClass('filled');
        }
        // append the new DOM element to the header row
        if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
            $filterContainerElm.appendTo($headerElm);
        }
        return $filterContainerElm;
    };
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    CompoundInputFilter.prototype.onTriggerEvent = /**
     * @private
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this._clearFilterTriggered) {
            this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
            this.$filterElm.removeClass('filled');
        }
        else {
            /** @type {?} */
            var selectedOperator = this.$selectOperatorElm.find('option:selected').text();
            /** @type {?} */
            var value = this.$filterInputElm.val();
            /** @type {?} */
            var enableWhiteSpaceTrim = this.gridOptions.enableFilterTrimWhiteSpace || this.columnFilter.enableTrimWhiteSpace;
            if (typeof value === 'string' && enableWhiteSpaceTrim) {
                value = value.trim();
            }
            (value !== null && value !== undefined && value !== '') ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef, searchTerms: (value ? [value] : null), operator: selectedOperator || '', shouldTriggerQuery: this._shouldTriggerQuery });
        }
        // reset both flags for next use
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
    };
    return CompoundInputFilter;
}());
export { CompoundInputFilter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CompoundInputFilter.prototype._clearFilterTriggered;
    /**
     * @type {?}
     * @private
     */
    CompoundInputFilter.prototype._shouldTriggerQuery;
    /**
     * @type {?}
     * @private
     */
    CompoundInputFilter.prototype._inputType;
    /**
     * @type {?}
     * @private
     */
    CompoundInputFilter.prototype.$filterElm;
    /**
     * @type {?}
     * @private
     */
    CompoundInputFilter.prototype.$filterInputElm;
    /**
     * @type {?}
     * @private
     */
    CompoundInputFilter.prototype.$selectOperatorElm;
    /**
     * @type {?}
     * @private
     */
    CompoundInputFilter.prototype._operator;
    /** @type {?} */
    CompoundInputFilter.prototype.grid;
    /** @type {?} */
    CompoundInputFilter.prototype.searchTerms;
    /** @type {?} */
    CompoundInputFilter.prototype.columnDef;
    /** @type {?} */
    CompoundInputFilter.prototype.callback;
    /**
     * @type {?}
     * @protected
     */
    CompoundInputFilter.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG91bmRJbnB1dEZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZmlsdGVycy9jb21wb3VuZElucHV0RmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQVFMLFlBQVksR0FFYixNQUFNLG1CQUFtQixDQUFDO0FBSzNCO0lBYUUsNkJBQXNCLFNBQTJCO1FBQTNCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBWnpDLDBCQUFxQixHQUFHLEtBQUssQ0FBQztRQUM5Qix3QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDM0IsZUFBVSxHQUFHLE1BQU0sQ0FBQztJQVV5QixDQUFDO0lBR3RELHNCQUFZLDRDQUFXO1FBRHZCLGlFQUFpRTs7Ozs7O1FBQ2pFO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzNFLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksNkNBQVk7UUFEaEIsbUNBQW1DOzs7OztRQUNuQztZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDdkQsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSwwQ0FBUztRQURiLG9EQUFvRDs7Ozs7UUFDcEQ7WUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQztRQUVELG9EQUFvRDs7Ozs7O1FBQ3BELFVBQWMsSUFBWTtZQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN6QixDQUFDOzs7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Z3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRUeXBlIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHtcbiAgQ29sdW1uLFxuICBDb2x1bW5GaWx0ZXIsXG4gIEZpbHRlcixcbiAgRmlsdGVyQXJndW1lbnRzLFxuICBGaWx0ZXJDYWxsYmFjayxcbiAgR3JpZE9wdGlvbixcbiAgT3BlcmF0b3JTdHJpbmcsXG4gIE9wZXJhdG9yVHlwZSxcbiAgU2VhcmNoVGVybSxcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5cbmV4cG9ydCBjbGFzcyBDb21wb3VuZElucHV0RmlsdGVyIGltcGxlbWVudHMgRmlsdGVyIHtcbiAgcHJpdmF0ZSBfY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZTtcbiAgcHJpdmF0ZSBfaW5wdXRUeXBlID0gJ3RleHQnO1xuICBwcml2YXRlICRmaWx0ZXJFbG06IGFueTtcbiAgcHJpdmF0ZSAkZmlsdGVySW5wdXRFbG06IGFueTtcbiAgcHJpdmF0ZSAkc2VsZWN0T3BlcmF0b3JFbG06IGFueTtcbiAgcHJpdmF0ZSBfb3BlcmF0b3I6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nO1xuICBncmlkOiBhbnk7XG4gIHNlYXJjaFRlcm1zOiBTZWFyY2hUZXJtW107XG4gIGNvbHVtbkRlZjogQ29sdW1uO1xuICBjYWxsYmFjazogRmlsdGVyQ2FsbGJhY2s7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkgeyB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cbiAgcHJpdmF0ZSBnZXQgZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XG4gICAgcmV0dXJuICh0aGlzLmdyaWQgJiYgdGhpcy5ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xuICB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIENvbHVtbiBGaWx0ZXIgKi9cbiAgZ2V0IGNvbHVtbkZpbHRlcigpOiBDb2x1bW5GaWx0ZXIge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgfHwge307XG4gIH1cblxuICAvKiogR2V0dGVyIG9mIGlucHV0IHR5cGUgKHRleHQsIG51bWJlciwgcGFzc3dvcmQpICovXG4gIGdldCBpbnB1dFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lucHV0VHlwZTtcbiAgfVxuXG4gIC8qKiBTZXR0ZXIgb2YgaW5wdXQgdHlwZSAodGV4dCwgbnVtYmVyLCBwYXNzd29yZCkgKi9cbiAgc2V0IGlucHV0VHlwZSh0eXBlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9pbnB1dFR5cGUgPSB0eXBlO1xuICB9XG5cbiAgLyoqIEdldHRlciBvZiB0aGUgT3BlcmF0b3IgdG8gdXNlIHdoZW4gZG9pbmcgdGhlIGZpbHRlciBjb21wYXJpbmcgKi9cbiAgZ2V0IG9wZXJhdG9yKCk6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fb3BlcmF0b3IgfHwgT3BlcmF0b3JUeXBlLmVtcHR5O1xuICB9XG5cbiAgLyoqIEdldHRlciBvZiB0aGUgT3BlcmF0b3IgdG8gdXNlIHdoZW4gZG9pbmcgdGhlIGZpbHRlciBjb21wYXJpbmcgKi9cbiAgc2V0IG9wZXJhdG9yKG9wOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZykge1xuICAgIHRoaXMuX29wZXJhdG9yID0gb3A7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgRmlsdGVyXG4gICAqL1xuICBpbml0KGFyZ3M6IEZpbHRlckFyZ3VtZW50cykge1xuICAgIHRoaXMuZ3JpZCA9IGFyZ3MuZ3JpZDtcbiAgICB0aGlzLmNhbGxiYWNrID0gYXJncy5jYWxsYmFjaztcbiAgICB0aGlzLmNvbHVtbkRlZiA9IGFyZ3MuY29sdW1uRGVmO1xuICAgIHRoaXMub3BlcmF0b3IgPSBhcmdzLm9wZXJhdG9yO1xuICAgIHRoaXMuc2VhcmNoVGVybXMgPSBhcmdzLnNlYXJjaFRlcm1zIHx8IFtdO1xuXG4gICAgLy8gZmlsdGVyIGlucHV0IGNhbiBvbmx5IGhhdmUgMSBzZWFyY2ggdGVybSwgc28gd2Ugd2lsbCB1c2UgdGhlIDFzdCBhcnJheSBpbmRleCBpZiBpdCBleGlzdFxuICAgIGNvbnN0IHNlYXJjaFRlcm0gPSAoQXJyYXkuaXNBcnJheSh0aGlzLnNlYXJjaFRlcm1zKSAmJiB0aGlzLnNlYXJjaFRlcm1zWzBdKSB8fCAnJztcblxuICAgIC8vIHN0ZXAgMSwgY3JlYXRlIHRoZSBET00gRWxlbWVudCBvZiB0aGUgZmlsdGVyIHdoaWNoIGNvbnRhaW4gdGhlIGNvbXBvdW5kIE9wZXJhdG9yK0lucHV0XG4gICAgLy8gYW5kIGluaXRpYWxpemUgaXQgaWYgc2VhcmNoVGVybXMgaXMgZmlsbGVkXG4gICAgdGhpcy4kZmlsdGVyRWxtID0gdGhpcy5jcmVhdGVEb21FbGVtZW50KHNlYXJjaFRlcm0pO1xuXG4gICAgLy8gc3RlcCAzLCBzdWJzY3JpYmUgdG8gdGhlIGtleXVwIGV2ZW50IGFuZCBydW4gdGhlIGNhbGxiYWNrIHdoZW4gdGhhdCBoYXBwZW5zXG4gICAgLy8gYWxzbyBhZGQvcmVtb3ZlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcbiAgICB0aGlzLiRmaWx0ZXJJbnB1dEVsbS5vbigna2V5dXAgaW5wdXQgY2hhbmdlJywgKGU6IGFueSkgPT4ge1xuICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChlKTtcbiAgICB9KTtcbiAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS5vbignY2hhbmdlJywgKGU6IGFueSkgPT4ge1xuICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgZmlsdGVyIHZhbHVlXG4gICAqL1xuICBjbGVhcihzaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlKSB7XG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSAmJiB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbSkge1xuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gc2hvdWxkVHJpZ2dlclF1ZXJ5O1xuICAgICAgdGhpcy5zZWFyY2hUZXJtcyA9IFtdO1xuICAgICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0udmFsKDApO1xuICAgICAgdGhpcy4kZmlsdGVySW5wdXRFbG0udmFsKCcnKTtcbiAgICAgIHRoaXMub25UcmlnZ2VyRXZlbnQobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRlc3Ryb3kgdGhlIGZpbHRlclxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtICYmIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtKSB7XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ub2ZmKCdrZXl1cCBpbnB1dCBjaGFuZ2UnKS5yZW1vdmUoKTtcbiAgICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLm9mZignY2hhbmdlJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB2YWx1ZShzKSBvbiB0aGUgRE9NIGVsZW1lbnRcbiAgICovXG4gIHNldFZhbHVlcyh2YWx1ZXM6IFNlYXJjaFRlcm1bXSkge1xuICAgIGlmICh2YWx1ZXMgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0udmFsKHZhbHVlc1swXSk7XG4gICAgfVxuICB9XG5cbiAgLy9cbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgcHJpdmF0ZSBidWlsZElucHV0SHRtbFN0cmluZygpIHtcbiAgICBsZXQgcGxhY2Vob2xkZXIgPSAodGhpcy5ncmlkT3B0aW9ucykgPyAodGhpcy5ncmlkT3B0aW9ucy5kZWZhdWx0RmlsdGVyUGxhY2Vob2xkZXIgfHwgJycpIDogJyc7XG4gICAgaWYgKHRoaXMuY29sdW1uRmlsdGVyICYmIHRoaXMuY29sdW1uRmlsdGVyLnBsYWNlaG9sZGVyKSB7XG4gICAgICBwbGFjZWhvbGRlciA9IHRoaXMuY29sdW1uRmlsdGVyLnBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICByZXR1cm4gYDxpbnB1dCB0eXBlPVwiJHt0aGlzLl9pbnB1dFR5cGUgfHwgJ3RleHQnfVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIiAgYXV0b2NvbXBsZXRlPVwib2ZmXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIiR7cGxhY2Vob2xkZXJ9XCIgLz48c3Bhbj48L3NwYW4+YDtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRTZWxlY3RPcGVyYXRvckh0bWxTdHJpbmcoKSB7XG4gICAgY29uc3Qgb3B0aW9uVmFsdWVzID0gdGhpcy5nZXRPcHRpb25WYWx1ZXMoKTtcbiAgICBsZXQgb3B0aW9uVmFsdWVTdHJpbmcgPSAnJztcbiAgICBvcHRpb25WYWx1ZXMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICBvcHRpb25WYWx1ZVN0cmluZyArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9uLm9wZXJhdG9yfVwiIHRpdGxlPVwiJHtvcHRpb24uZGVzY3JpcHRpb259XCI+JHtvcHRpb24ub3BlcmF0b3J9PC9vcHRpb24+YDtcbiAgICB9KTtcblxuICAgIHJldHVybiBgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiPiR7b3B0aW9uVmFsdWVTdHJpbmd9PC9zZWxlY3Q+YDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3B0aW9uVmFsdWVzKCk6IHsgb3BlcmF0b3I6IE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nIH1bXSB7XG4gICAgY29uc3QgdHlwZSA9ICh0aGlzLmNvbHVtbkRlZi50eXBlICYmIHRoaXMuY29sdW1uRGVmLnR5cGUpID8gdGhpcy5jb2x1bW5EZWYudHlwZSA6IEZpZWxkVHlwZS5zdHJpbmc7XG4gICAgbGV0IG9wdGlvblZhbHVlcyA9IFtdO1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIEZpZWxkVHlwZS5zdHJpbmc6XG4gICAgICAgIG9wdGlvblZhbHVlcyA9IFtcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnJyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0NPTlRBSU5TJykgfSxcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnPScgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdFUVVBTFMnKSB9LFxuICAgICAgICAgIHsgb3BlcmF0b3I6ICdhKicgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdTVEFSVFNfV0lUSCcpIH0sXG4gICAgICAgICAgeyBvcGVyYXRvcjogJyp6JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0VORFNfV0lUSCcpIH0sXG4gICAgICAgICAgLypcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnSU4nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnSU5fQ09MTEVDVElPTl9TRVBFUkFURURfQllfQ09NTUEnKSB9LFxuICAgICAgICAgIHsgb3BlcmF0b3I6ICdOSU4nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnTk9UX0lOX0NPTExFQ1RJT05fU0VQRVJBVEVEX0JZX0NPTU1BJykgfSxcbiAgICAgICAgICAqL1xuICAgICAgICBdO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG9wdGlvblZhbHVlcyA9IFtcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnJyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0NPTlRBSU5TJykgfSxcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnPScgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxuICAgICAgICAgIHsgb3BlcmF0b3I6ICc8JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXG4gICAgICAgICAgeyBvcGVyYXRvcjogJzw9JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXG4gICAgICAgICAgeyBvcGVyYXRvcjogJz4nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnPj0nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnPD4nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfV07XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25WYWx1ZXM7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIHRoZSBET00gZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVEb21FbGVtZW50KHNlYXJjaFRlcm0/OiBTZWFyY2hUZXJtKSB7XG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xuICAgIGNvbnN0ICRoZWFkZXJFbG0gPSB0aGlzLmdyaWQuZ2V0SGVhZGVyUm93Q29sdW1uKGZpZWxkSWQpO1xuICAgICQoJGhlYWRlckVsbSkuZW1wdHkoKTtcblxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIFNlbGVjdCBkcm9wZG93biBmb3IgdGhlIE9wZXJhdG9yXG4gICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0gPSAkKHRoaXMuYnVpbGRTZWxlY3RPcGVyYXRvckh0bWxTdHJpbmcoKSk7XG4gICAgdGhpcy4kZmlsdGVySW5wdXRFbG0gPSAkKHRoaXMuYnVpbGRJbnB1dEh0bWxTdHJpbmcoKSk7XG4gICAgY29uc3QgJGZpbHRlckNvbnRhaW5lckVsbSA9ICQoYDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHNlYXJjaC1maWx0ZXIgZmlsdGVyLSR7ZmllbGRJZH1cIj48L2Rpdj5gKTtcbiAgICBjb25zdCAkY29udGFpbmVySW5wdXRHcm91cCA9ICQoYDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPjwvZGl2PmApO1xuICAgIGNvbnN0ICRvcGVyYXRvcklucHV0R3JvdXBBZGRvbiA9ICQoYDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpbnB1dC1ncm91cC1wcmVwZW5kIG9wZXJhdG9yXCI+PC9kaXY+YCk7XG5cbiAgICAvKiB0aGUgRE9NIGVsZW1lbnQgZmluYWwgc3RydWN0dXJlIHdpbGwgYmVcbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaW5wdXQtZ3JvdXAtcHJlcGVuZCBvcGVyYXRvclwiPlxuICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj48L3NlbGVjdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgIDwvZGl2PlxuICAgICovXG4gICAgJG9wZXJhdG9ySW5wdXRHcm91cEFkZG9uLmFwcGVuZCh0aGlzLiRzZWxlY3RPcGVyYXRvckVsbSk7XG4gICAgJGNvbnRhaW5lcklucHV0R3JvdXAuYXBwZW5kKCRvcGVyYXRvcklucHV0R3JvdXBBZGRvbik7XG4gICAgJGNvbnRhaW5lcklucHV0R3JvdXAuYXBwZW5kKHRoaXMuJGZpbHRlcklucHV0RWxtKTtcblxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIGVsZW1lbnQgJiBhZGQgYW4gSUQgYW5kIGZpbHRlciBjbGFzc1xuICAgICRmaWx0ZXJDb250YWluZXJFbG0uYXBwZW5kKCRjb250YWluZXJJbnB1dEdyb3VwKTtcbiAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmF0dHIoJ2lkJywgYGZpbHRlci0ke2ZpZWxkSWR9YCk7XG5cbiAgICB0aGlzLiRmaWx0ZXJJbnB1dEVsbS52YWwoc2VhcmNoVGVybSk7XG4gICAgdGhpcy4kZmlsdGVySW5wdXRFbG0uZGF0YSgnY29sdW1uSWQnLCBmaWVsZElkKTtcblxuICAgIGlmICh0aGlzLm9wZXJhdG9yKSB7XG4gICAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS52YWwodGhpcy5vcGVyYXRvcik7XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlcmUncyBhIHNlYXJjaCB0ZXJtLCB3ZSB3aWxsIGFkZCB0aGUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xuICAgIGlmIChzZWFyY2hUZXJtKSB7XG4gICAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKTtcbiAgICB9XG5cbiAgICAvLyBhcHBlbmQgdGhlIG5ldyBET00gZWxlbWVudCB0byB0aGUgaGVhZGVyIHJvd1xuICAgIGlmICgkZmlsdGVyQ29udGFpbmVyRWxtICYmIHR5cGVvZiAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZFRvID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZFRvKCRoZWFkZXJFbG0pO1xuICAgIH1cblxuICAgIHJldHVybiAkZmlsdGVyQ29udGFpbmVyRWxtO1xuICB9XG5cbiAgcHJpdmF0ZSBvblRyaWdnZXJFdmVudChlOiBFdmVudCB8IHVuZGVmaW5lZCkge1xuICAgIGlmICh0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCkge1xuICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCwgc2hvdWxkVHJpZ2dlclF1ZXJ5OiB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgfSk7XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzZWxlY3RlZE9wZXJhdG9yID0gdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0uZmluZCgnb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpO1xuICAgICAgbGV0IHZhbHVlID0gdGhpcy4kZmlsdGVySW5wdXRFbG0udmFsKCk7XG4gICAgICBjb25zdCBlbmFibGVXaGl0ZVNwYWNlVHJpbSA9IHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlRmlsdGVyVHJpbVdoaXRlU3BhY2UgfHwgdGhpcy5jb2x1bW5GaWx0ZXIuZW5hYmxlVHJpbVdoaXRlU3BhY2U7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiBlbmFibGVXaGl0ZVNwYWNlVHJpbSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcbiAgICAgIH1cblxuICAgICAgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09ICcnKSA/IHRoaXMuJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJykgOiB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xuICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIHNlYXJjaFRlcm1zOiAodmFsdWUgPyBbdmFsdWVdIDogbnVsbCksIG9wZXJhdG9yOiBzZWxlY3RlZE9wZXJhdG9yIHx8ICcnLCBzaG91bGRUcmlnZ2VyUXVlcnk6IHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSB9KTtcbiAgICB9XG4gICAgLy8gcmVzZXQgYm90aCBmbGFncyBmb3IgbmV4dCB1c2VcbiAgICB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHRydWU7XG4gIH1cbn1cbiJdfQ==