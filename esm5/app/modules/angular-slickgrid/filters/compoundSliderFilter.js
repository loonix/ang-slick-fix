/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { OperatorType } from './../models/index';
/** @type {?} */
var DEFAULT_MIN_VALUE = 0;
/** @type {?} */
var DEFAULT_MAX_VALUE = 100;
/** @type {?} */
var DEFAULT_STEP = 1;
var CompoundSliderFilter = /** @class */ (function () {
    function CompoundSliderFilter() {
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
    }
    Object.defineProperty(CompoundSliderFilter.prototype, "gridOptions", {
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
    Object.defineProperty(CompoundSliderFilter.prototype, "filterParams", {
        /** Getter for the Filter Generic Params */
        get: /**
         * Getter for the Filter Generic Params
         * @private
         * @return {?}
         */
        function () {
            return this.columnDef && this.columnDef.filter && this.columnDef.filter.params || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompoundSliderFilter.prototype, "filterProperties", {
        /** Getter for the `filter` properties */
        get: /**
         * Getter for the `filter` properties
         * @private
         * @return {?}
         */
        function () {
            return this.columnDef && this.columnDef.filter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompoundSliderFilter.prototype, "operator", {
        get: /**
         * @return {?}
         */
        function () {
            return this._operator || OperatorType.empty;
        },
        set: /**
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
    CompoundSliderFilter.prototype.init = /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    function (args) {
        var _this = this;
        if (args) {
            this.grid = args.grid;
            this.callback = args.callback;
            this.columnDef = args.columnDef;
            this.operator = args.operator || '';
            this.searchTerms = args.searchTerms || [];
            // define the input & slider number IDs
            this._elementRangeInputId = "rangeInput_" + this.columnDef.field;
            this._elementRangeOutputId = "rangeOutput_" + this.columnDef.field;
            // filter input can only have 1 search term, so we will use the 1st array index if it exist
            /** @type {?} */
            var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
            // step 1, create the DOM Element of the filter which contain the compound Operator+Input
            // and initialize it if searchTerm is filled
            this.$filterElm = this.createDomElement(searchTerm);
            // step 3, subscribe to the keyup event and run the callback when that happens
            // also add/remove "filled" class for styling purposes
            this.$filterInputElm.change((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.onTriggerEvent(e);
            }));
            this.$selectOperatorElm.change((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.onTriggerEvent(e);
            }));
            // if user chose to display the slider number on the right side, then update it every time it changes
            // we need to use both "input" and "change" event to be all cross-browser
            if (!this.filterParams.hideSliderNumber) {
                this.$filterInputElm.on('input change', (/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) {
                    /** @type {?} */
                    var value = e && e.target && e.target.value || '';
                    if (value) {
                        document.getElementById(_this._elementRangeOutputId).innerHTML = value;
                    }
                }));
            }
        }
    };
    /**
     * Clear the filter value
     */
    /**
     * Clear the filter value
     * @param {?=} shouldTriggerQuery
     * @return {?}
     */
    CompoundSliderFilter.prototype.clear = /**
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
            /** @type {?} */
            var clearedValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : DEFAULT_MIN_VALUE;
            this.$selectOperatorElm.val(0);
            this.$filterInputElm.val(clearedValue);
            if (!this.filterParams.hideSliderNumber) {
                this.$containerInputGroupElm.children('div.input-group-addon.input-group-append').children().last().html(clearedValue);
            }
            this.onTriggerEvent(undefined);
            this.$filterElm.removeClass('filled');
        }
    };
    /**
     * destroy the filter
     */
    /**
     * destroy the filter
     * @return {?}
     */
    CompoundSliderFilter.prototype.destroy = /**
     * destroy the filter
     * @return {?}
     */
    function () {
        if (this.$filterElm) {
            this.$filterElm.off('input change').remove();
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
    CompoundSliderFilter.prototype.setValues = /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    function (values) {
        if (values && Array.isArray(values)) {
            this.$filterInputElm.val(values[0]);
            this.$containerInputGroupElm.children('div.input-group-addon.input-group-append').children().last().html(values[0]);
        }
    };
    //
    // private functions
    // ------------------
    /** Build HTML Template for the input range (slider) */
    //
    // private functions
    // ------------------
    /**
     * Build HTML Template for the input range (slider)
     * @private
     * @return {?}
     */
    CompoundSliderFilter.prototype.buildTemplateHtmlString = 
    //
    // private functions
    // ------------------
    /**
     * Build HTML Template for the input range (slider)
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
        /** @type {?} */
        var maxValue = this.filterProperties.hasOwnProperty('maxValue') ? this.filterProperties.maxValue : DEFAULT_MAX_VALUE;
        /** @type {?} */
        var defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
        /** @type {?} */
        var step = this.filterProperties.hasOwnProperty('valueStep') ? this.filterProperties.valueStep : DEFAULT_STEP;
        return "<input type=\"range\" id=\"" + this._elementRangeInputId + "\"\n              name=\"" + this._elementRangeInputId + "\"\n              defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n              class=\"form-control slider-filter-input range compound-slider\" />";
    };
    /** Build HTML Template for the text (number) that is shown appended to the slider */
    /**
     * Build HTML Template for the text (number) that is shown appended to the slider
     * @private
     * @return {?}
     */
    CompoundSliderFilter.prototype.buildTemplateSliderTextHtmlString = /**
     * Build HTML Template for the text (number) that is shown appended to the slider
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
        /** @type {?} */
        var defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
        return "<div class=\"input-group-addon input-group-append slider-value\"><span class=\"input-group-text\" id=\"" + this._elementRangeOutputId + "\">" + defaultValue + "</span></div>";
    };
    /** Build HTML Template select dropdown (operator) */
    /**
     * Build HTML Template select dropdown (operator)
     * @private
     * @return {?}
     */
    CompoundSliderFilter.prototype.buildSelectOperatorHtmlString = /**
     * Build HTML Template select dropdown (operator)
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
    /** Get the available operator option values */
    /**
     * Get the available operator option values
     * @private
     * @return {?}
     */
    CompoundSliderFilter.prototype.getOptionValues = /**
     * Get the available operator option values
     * @private
     * @return {?}
     */
    function () {
        return [
            { operator: (/** @type {?} */ ('')), description: '' },
            { operator: (/** @type {?} */ ('=')), description: '' },
            { operator: (/** @type {?} */ ('<')), description: '' },
            { operator: (/** @type {?} */ ('<=')), description: '' },
            { operator: (/** @type {?} */ ('>')), description: '' },
            { operator: (/** @type {?} */ ('>=')), description: '' },
            { operator: (/** @type {?} */ ('<>')), description: '' }
        ];
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
    CompoundSliderFilter.prototype.createDomElement = /**
     * Create the DOM element
     * @private
     * @param {?=} searchTerm
     * @return {?}
     */
    function (searchTerm) {
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        var searchTermInput = (/** @type {?} */ ((searchTerm || '0')));
        /** @type {?} */
        var $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        // create the DOM Select dropdown for the Operator
        this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
        this.$filterInputElm = $(this.buildTemplateHtmlString());
        /** @type {?} */
        var $filterContainerElm = $("<div class=\"form-group search-filter filter-" + fieldId + "\"></div>");
        this.$containerInputGroupElm = $("<div class=\"input-group search-filter filter-" + fieldId + "\"></div>");
        /** @type {?} */
        var $operatorInputGroupAddon = $("<span class=\"input-group-addon input-group-prepend operator\"></span>");
        /* the DOM element final structure will be
          <div class="input-group">
            <div class="input-group-addon input-group-prepend operator">
              <select class="form-control"></select>
            </div>
            <input class="form-control" type="text" />
            <div class="input-group-addon input-group-prepend" id="rangeOuput_percentComplete"><span class="input-group-text">0</span></div>
          </div>
        */
        $operatorInputGroupAddon.append(this.$selectOperatorElm);
        this.$containerInputGroupElm.append($operatorInputGroupAddon);
        this.$containerInputGroupElm.append(this.$filterInputElm);
        if (!this.filterParams.hideSliderNumber) {
            /** @type {?} */
            var $sliderTextInputAppendAddon = $(this.buildTemplateSliderTextHtmlString());
            $sliderTextInputAppendAddon.children().html(searchTermInput);
            this.$containerInputGroupElm.append($sliderTextInputAppendAddon);
        }
        // create the DOM element & add an ID and filter class
        $filterContainerElm.append(this.$containerInputGroupElm);
        $filterContainerElm.attr('id', "filter-" + fieldId);
        this.$filterInputElm.val(searchTermInput);
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
    CompoundSliderFilter.prototype.onTriggerEvent = /**
     * @private
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this._clearFilterTriggered) {
            this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
        }
        else {
            /** @type {?} */
            var selectedOperator = this.$selectOperatorElm.find('option:selected').text();
            /** @type {?} */
            var value = this.$filterInputElm.val();
            (value) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef, searchTerms: (value ? [value] : null), operator: selectedOperator || '', shouldTriggerQuery: this._shouldTriggerQuery });
        }
        // reset both flags for next use
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
    };
    return CompoundSliderFilter;
}());
export { CompoundSliderFilter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CompoundSliderFilter.prototype._clearFilterTriggered;
    /**
     * @type {?}
     * @private
     */
    CompoundSliderFilter.prototype._shouldTriggerQuery;
    /**
     * @type {?}
     * @private
     */
    CompoundSliderFilter.prototype._elementRangeInputId;
    /**
     * @type {?}
     * @private
     */
    CompoundSliderFilter.prototype._elementRangeOutputId;
    /**
     * @type {?}
     * @private
     */
    CompoundSliderFilter.prototype._operator;
    /**
     * @type {?}
     * @private
     */
    CompoundSliderFilter.prototype.$containerInputGroupElm;
    /**
     * @type {?}
     * @private
     */
    CompoundSliderFilter.prototype.$filterElm;
    /**
     * @type {?}
     * @private
     */
    CompoundSliderFilter.prototype.$filterInputElm;
    /**
     * @type {?}
     * @private
     */
    CompoundSliderFilter.prototype.$selectOperatorElm;
    /** @type {?} */
    CompoundSliderFilter.prototype.grid;
    /** @type {?} */
    CompoundSliderFilter.prototype.searchTerms;
    /** @type {?} */
    CompoundSliderFilter.prototype.columnDef;
    /** @type {?} */
    CompoundSliderFilter.prototype.callback;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG91bmRTbGlkZXJGaWx0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2ZpbHRlcnMvY29tcG91bmRTbGlkZXJGaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFRTCxZQUFZLEVBRWIsTUFBTSxtQkFBbUIsQ0FBQzs7SUFLckIsaUJBQWlCLEdBQUcsQ0FBQzs7SUFDckIsaUJBQWlCLEdBQUcsR0FBRzs7SUFDdkIsWUFBWSxHQUFHLENBQUM7QUFFdEI7SUFlRTtRQWRRLDBCQUFxQixHQUFHLEtBQUssQ0FBQztRQUM5Qix3QkFBbUIsR0FBRyxJQUFJLENBQUM7SUFhbkIsQ0FBQztJQUdqQixzQkFBWSw2Q0FBVztRQUR2QixpRUFBaUU7Ozs7OztRQUNqRTtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMzRSxDQUFDOzs7T0FBQTtJQUdELHNCQUFZLDhDQUFZO1FBRHhCLDJDQUEyQzs7Ozs7O1FBQzNDO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDdkYsQ0FBQzs7O09BQUE7SUFHRCxzQkFBWSxrREFBZ0I7UUFENUIseUNBQXlDOzs7Ozs7UUFDekM7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDakQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwwQ0FBUTs7OztRQUlaO1lBQ0UsT0FBTyxJQUFJ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a0JBQWtCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFOztnQkFDekUsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFO1lBQ3hDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixJQUFJLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1NBQ3hLO1FBQ0QsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztJQUNsQyxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBbFBELElBa1BDOzs7Ozs7O0lBalBDLHFEQUFzQzs7Ozs7SUFDdEMsbURBQW1DOzs7OztJQUNuQyxvREFBcUM7Ozs7O0lBQ3JDLHFEQUFzQzs7Ozs7SUFDdEMseUNBQWlEOzs7OztJQUNqRCx1REFBcUM7Ozs7O0lBQ3JDLDBDQUF3Qjs7Ozs7SUFDeEIsK0NBQTZCOzs7OztJQUM3QixrREFBZ0M7O0lBQ2hDLG9DQUFVOztJQUNWLDJDQUEwQjs7SUFDMUIseUNBQWtCOztJQUNsQix3Q0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbHVtbixcclxuICBDb2x1bW5GaWx0ZXIsXHJcbiAgRmlsdGVyLFxyXG4gIEZpbHRlckFyZ3VtZW50cyxcclxuICBGaWx0ZXJDYWxsYmFjayxcclxuICBHcmlkT3B0aW9uLFxyXG4gIE9wZXJhdG9yU3RyaW5nLFxyXG4gIE9wZXJhdG9yVHlwZSxcclxuICBTZWFyY2hUZXJtXHJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG5jb25zdCBERUZBVUxUX01JTl9WQUxVRSA9IDA7XHJcbmNvbnN0IERFRkFVTFRfTUFYX1ZBTFVFID0gMTAwO1xyXG5jb25zdCBERUZBVUxUX1NURVAgPSAxO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvdW5kU2xpZGVyRmlsdGVyIGltcGxlbWVudHMgRmlsdGVyIHtcclxuICBwcml2YXRlIF9jbGVhckZpbHRlclRyaWdnZXJlZCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHRydWU7XHJcbiAgcHJpdmF0ZSBfZWxlbWVudFJhbmdlSW5wdXRJZDogc3RyaW5nO1xyXG4gIHByaXZhdGUgX2VsZW1lbnRSYW5nZU91dHB1dElkOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfb3BlcmF0b3I6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nO1xyXG4gIHByaXZhdGUgJGNvbnRhaW5lcklucHV0R3JvdXBFbG06IGFueTtcclxuICBwcml2YXRlICRmaWx0ZXJFbG06IGFueTtcclxuICBwcml2YXRlICRmaWx0ZXJJbnB1dEVsbTogYW55O1xyXG4gIHByaXZhdGUgJHNlbGVjdE9wZXJhdG9yRWxtOiBhbnk7XHJcbiAgZ3JpZDogYW55O1xyXG4gIHNlYXJjaFRlcm1zOiBTZWFyY2hUZXJtW107XHJcbiAgY29sdW1uRGVmOiBDb2x1bW47XHJcbiAgY2FsbGJhY2s6IEZpbHRlckNhbGxiYWNrO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByaXZhdGUgZ2V0IGdyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xyXG4gICAgcmV0dXJuICh0aGlzLmdyaWQgJiYgdGhpcy5ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEZpbHRlciBHZW5lcmljIFBhcmFtcyAqL1xyXG4gIHByaXZhdGUgZ2V0IGZpbHRlclBhcmFtcygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIucGFyYW1zIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIGBmaWx0ZXJgIHByb3BlcnRpZXMgKi9cclxuICBwcml2YXRlIGdldCBmaWx0ZXJQcm9wZXJ0aWVzKCk6IENvbHVtbkZpbHRlciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyO1xyXG4gIH1cclxuXHJcbiAgc2V0IG9wZXJhdG9yKG9wOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZykge1xyXG4gICAgdGhpcy5fb3BlcmF0b3IgPSBvcDtcclxuICB9XHJcblxyXG4gIGdldCBvcGVyYXRvcigpOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3BlcmF0b3IgfHwgT3BlcmF0b3JUeXBlLmVtcHR5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgRmlsdGVyXHJcbiAgICovXHJcbiAgaW5pdChhcmdzOiBGaWx0ZXJBcmd1bWVudHMpIHtcclxuICAgIGlmIChhcmdzKSB7XHJcbiAgICAgIHRoaXMuZ3JpZCA9IGFyZ3MuZ3JpZDtcclxuICAgICAgdGhpcy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2s7XHJcbiAgICAgIHRoaXMuY29sdW1uRGVmID0gYXJncy5jb2x1bW5EZWY7XHJcbiAgICAgIHRoaXMub3BlcmF0b3IgPSBhcmdzLm9wZXJhdG9yIHx8ICcnO1xyXG4gICAgICB0aGlzLnNlYXJjaFRlcm1zID0gYXJncy5zZWFyY2hUZXJtcyB8fCBbXTtcclxuXHJcbiAgICAgIC8vIGRlZmluZSB0aGUgaW5wdXQgJiBzbGlkZXIgbnVtYmVyIElEc1xyXG4gICAgICB0aGlzLl9lbGVtZW50UmFuZ2VJbnB1dElkID0gYHJhbmdlSW5wdXRfJHt0aGlzLmNvbHVtbkRlZi5maWVsZH1gO1xyXG4gICAgICB0aGlzLl9lbGVtZW50UmFuZ2VPdXRwdXRJZCA9IGByYW5nZU91dHB1dF8ke3RoaXMuY29sdW1uRGVmLmZpZWxkfWA7XHJcblxyXG4gICAgICAvLyBmaWx0ZXIgaW5wdXQgY2FuIG9ubHkgaGF2ZSAxIHNlYXJjaCB0ZXJtLCBzbyB3ZSB3aWxsIHVzZSB0aGUgMXN0IGFycmF5IGluZGV4IGlmIGl0IGV4aXN0XHJcbiAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSAoQXJyYXkuaXNBcnJheSh0aGlzLnNlYXJjaFRlcm1zKSAmJiB0aGlzLnNlYXJjaFRlcm1zWzBdKSB8fCAnJztcclxuXHJcbiAgICAgIC8vIHN0ZXAgMSwgY3JlYXRlIHRoZSBET00gRWxlbWVudCBvZiB0aGUgZmlsdGVyIHdoaWNoIGNvbnRhaW4gdGhlIGNvbXBvdW5kIE9wZXJhdG9yK0lucHV0XHJcbiAgICAgIC8vIGFuZCBpbml0aWFsaXplIGl0IGlmIHNlYXJjaFRlcm0gaXMgZmlsbGVkXHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbSA9IHRoaXMuY3JlYXRlRG9tRWxlbWVudChzZWFyY2hUZXJtKTtcclxuXHJcbiAgICAgIC8vIHN0ZXAgMywgc3Vic2NyaWJlIHRvIHRoZSBrZXl1cCBldmVudCBhbmQgcnVuIHRoZSBjYWxsYmFjayB3aGVuIHRoYXQgaGFwcGVuc1xyXG4gICAgICAvLyBhbHNvIGFkZC9yZW1vdmUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xyXG4gICAgICB0aGlzLiRmaWx0ZXJJbnB1dEVsbS5jaGFuZ2UoKGU6IGFueSkgPT4ge1xyXG4gICAgICAgIHRoaXMub25UcmlnZ2VyRXZlbnQoZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS5jaGFuZ2UoKGU6IGFueSkgPT4ge1xyXG4gICAgICAgIHRoaXMub25UcmlnZ2VyRXZlbnQoZSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gaWYgdXNlciBjaG9zZSB0byBkaXNwbGF5IHRoZSBzbGlkZXIgbnVtYmVyIG9uIHRoZSByaWdodCBzaWRlLCB0aGVuIHVwZGF0ZSBpdCBldmVyeSB0aW1lIGl0IGNoYW5nZXNcclxuICAgICAgLy8gd2UgbmVlZCB0byB1c2UgYm90aCBcImlucHV0XCIgYW5kIFwiY2hhbmdlXCIgZXZlbnQgdG8gYmUgYWxsIGNyb3NzLWJyb3dzZXJcclxuICAgICAgaWYgKCF0aGlzLmZpbHRlclBhcmFtcy5oaWRlU2xpZGVyTnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy4kZmlsdGVySW5wdXRFbG0ub24oJ2lucHV0IGNoYW5nZScsIChlOiB7IHRhcmdldDogSFRNTElucHV0RWxlbWVudCB9KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgfHwgJyc7XHJcbiAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5fZWxlbWVudFJhbmdlT3V0cHV0SWQpLmlubmVySFRNTCA9IHZhbHVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgZmlsdGVyIHZhbHVlXHJcbiAgICovXHJcbiAgY2xlYXIoc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZSkge1xyXG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSAmJiB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbSkge1xyXG4gICAgICB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHNob3VsZFRyaWdnZXJRdWVyeTtcclxuICAgICAgdGhpcy5zZWFyY2hUZXJtcyA9IFtdO1xyXG4gICAgICBjb25zdCBjbGVhcmVkVmFsdWUgPSB0aGlzLmZpbHRlclBhcmFtcy5oYXNPd25Qcm9wZXJ0eSgnc2xpZGVyU3RhcnRWYWx1ZScpID8gdGhpcy5maWx0ZXJQYXJhbXMuc2xpZGVyU3RhcnRWYWx1ZSA6IERFRkFVTFRfTUlOX1ZBTFVFO1xyXG4gICAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS52YWwoMCk7XHJcbiAgICAgIHRoaXMuJGZpbHRlcklucHV0RWxtLnZhbChjbGVhcmVkVmFsdWUpO1xyXG4gICAgICBpZiAoIXRoaXMuZmlsdGVyUGFyYW1zLmhpZGVTbGlkZXJOdW1iZXIpIHtcclxuICAgICAgICB0aGlzLiRjb250YWluZXJJbnB1dEdyb3VwRWxtLmNoaWxkcmVuKCdkaXYuaW5wdXQtZ3JvdXAtYWRkb24uaW5wdXQtZ3JvdXAtYXBwZW5kJykuY2hpbGRyZW4oKS5sYXN0KCkuaHRtbChjbGVhcmVkVmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMub25UcmlnZ2VyRXZlbnQodW5kZWZpbmVkKTtcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGRlc3Ryb3kgdGhlIGZpbHRlclxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtKSB7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5vZmYoJ2lucHV0IGNoYW5nZScpLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHZhbHVlKHMpIG9uIHRoZSBET00gZWxlbWVudFxyXG4gICAqL1xyXG4gIHNldFZhbHVlcyh2YWx1ZXM6IFNlYXJjaFRlcm1bXSkge1xyXG4gICAgaWYgKHZhbHVlcyAmJiBBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcclxuICAgICAgdGhpcy4kZmlsdGVySW5wdXRFbG0udmFsKHZhbHVlc1swXSk7XHJcbiAgICAgIHRoaXMuJGNvbnRhaW5lcklucHV0R3JvdXBFbG0uY2hpbGRyZW4oJ2Rpdi5pbnB1dC1ncm91cC1hZGRvbi5pbnB1dC1ncm91cC1hcHBlbmQnKS5jaGlsZHJlbigpLmxhc3QoKS5odG1sKHZhbHVlc1swXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL1xyXG4gIC8vIHByaXZhdGUgZnVuY3Rpb25zXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKiBCdWlsZCBIVE1MIFRlbXBsYXRlIGZvciB0aGUgaW5wdXQgcmFuZ2UgKHNsaWRlcikgKi9cclxuICBwcml2YXRlIGJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKCkge1xyXG4gICAgY29uc3QgbWluVmFsdWUgPSB0aGlzLmZpbHRlclByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoJ21pblZhbHVlJykgPyB0aGlzLmZpbHRlclByb3BlcnRpZXMubWluVmFsdWUgOiBERUZBVUxUX01JTl9WQUxVRTtcclxuICAgIGNvbnN0IG1heFZhbHVlID0gdGhpcy5maWx0ZXJQcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KCdtYXhWYWx1ZScpID8gdGhpcy5maWx0ZXJQcm9wZXJ0aWVzLm1heFZhbHVlIDogREVGQVVMVF9NQVhfVkFMVUU7XHJcbiAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB0aGlzLmZpbHRlclBhcmFtcy5oYXNPd25Qcm9wZXJ0eSgnc2xpZGVyU3RhcnRWYWx1ZScpID8gdGhpcy5maWx0ZXJQYXJhbXMuc2xpZGVyU3RhcnRWYWx1ZSA6IG1pblZhbHVlO1xyXG4gICAgY29uc3Qgc3RlcCA9IHRoaXMuZmlsdGVyUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgndmFsdWVTdGVwJykgPyB0aGlzLmZpbHRlclByb3BlcnRpZXMudmFsdWVTdGVwIDogREVGQVVMVF9TVEVQO1xyXG5cclxuICAgIHJldHVybiBgPGlucHV0IHR5cGU9XCJyYW5nZVwiIGlkPVwiJHt0aGlzLl9lbGVtZW50UmFuZ2VJbnB1dElkfVwiXHJcbiAgICAgICAgICAgICAgbmFtZT1cIiR7dGhpcy5fZWxlbWVudFJhbmdlSW5wdXRJZH1cIlxyXG4gICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT1cIiR7ZGVmYXVsdFZhbHVlfVwiIG1pbj1cIiR7bWluVmFsdWV9XCIgbWF4PVwiJHttYXhWYWx1ZX1cIiBzdGVwPVwiJHtzdGVwfVwiXHJcbiAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2wgc2xpZGVyLWZpbHRlci1pbnB1dCByYW5nZSBjb21wb3VuZC1zbGlkZXJcIiAvPmA7XHJcbiAgfVxyXG5cclxuICAvKiogQnVpbGQgSFRNTCBUZW1wbGF0ZSBmb3IgdGhlIHRleHQgKG51bWJlcikgdGhhdCBpcyBzaG93biBhcHBlbmRlZCB0byB0aGUgc2xpZGVyICovXHJcbiAgcHJpdmF0ZSBidWlsZFRlbXBsYXRlU2xpZGVyVGV4dEh0bWxTdHJpbmcoKSB7XHJcbiAgICBjb25zdCBtaW5WYWx1ZSA9IHRoaXMuZmlsdGVyUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgnbWluVmFsdWUnKSA/IHRoaXMuZmlsdGVyUHJvcGVydGllcy5taW5WYWx1ZSA6IERFRkFVTFRfTUlOX1ZBTFVFO1xyXG4gICAgY29uc3QgZGVmYXVsdFZhbHVlID0gdGhpcy5maWx0ZXJQYXJhbXMuaGFzT3duUHJvcGVydHkoJ3NsaWRlclN0YXJ0VmFsdWUnKSA/IHRoaXMuZmlsdGVyUGFyYW1zLnNsaWRlclN0YXJ0VmFsdWUgOiBtaW5WYWx1ZTtcclxuXHJcbiAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpbnB1dC1ncm91cC1hcHBlbmQgc2xpZGVyLXZhbHVlXCI+PHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0XCIgaWQ9XCIke3RoaXMuX2VsZW1lbnRSYW5nZU91dHB1dElkfVwiPiR7ZGVmYXVsdFZhbHVlfTwvc3Bhbj48L2Rpdj5gO1xyXG4gIH1cclxuXHJcbiAgLyoqIEJ1aWxkIEhUTUwgVGVtcGxhdGUgc2VsZWN0IGRyb3Bkb3duIChvcGVyYXRvcikgKi9cclxuICBwcml2YXRlIGJ1aWxkU2VsZWN0T3BlcmF0b3JIdG1sU3RyaW5nKCkge1xyXG4gICAgY29uc3Qgb3B0aW9uVmFsdWVzID0gdGhpcy5nZXRPcHRpb25WYWx1ZXMoKTtcclxuICAgIGxldCBvcHRpb25WYWx1ZVN0cmluZyA9ICcnO1xyXG4gICAgb3B0aW9uVmFsdWVzLmZvckVhY2goKG9wdGlvbikgPT4ge1xyXG4gICAgICBvcHRpb25WYWx1ZVN0cmluZyArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9uLm9wZXJhdG9yfVwiIHRpdGxlPVwiJHtvcHRpb24uZGVzY3JpcHRpb259XCI+JHtvcHRpb24ub3BlcmF0b3J9PC9vcHRpb24+YDtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiPiR7b3B0aW9uVmFsdWVTdHJpbmd9PC9zZWxlY3Q+YDtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIGF2YWlsYWJsZSBvcGVyYXRvciBvcHRpb24gdmFsdWVzICovXHJcbiAgcHJpdmF0ZSBnZXRPcHRpb25WYWx1ZXMoKTogeyBvcGVyYXRvcjogT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcgfVtdIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHsgb3BlcmF0b3I6ICcnIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcclxuICAgICAgeyBvcGVyYXRvcjogJz0nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcclxuICAgICAgeyBvcGVyYXRvcjogJzwnIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcclxuICAgICAgeyBvcGVyYXRvcjogJzw9JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXHJcbiAgICAgIHsgb3BlcmF0b3I6ICc+JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXHJcbiAgICAgIHsgb3BlcmF0b3I6ICc+PScgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxyXG4gICAgICB7IG9wZXJhdG9yOiAnPD4nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSB0aGUgRE9NIGVsZW1lbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZURvbUVsZW1lbnQoc2VhcmNoVGVybT86IFNlYXJjaFRlcm0pIHtcclxuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcclxuICAgIGNvbnN0IHNlYXJjaFRlcm1JbnB1dCA9IChzZWFyY2hUZXJtIHx8ICcwJykgYXMgc3RyaW5nO1xyXG4gICAgY29uc3QgJGhlYWRlckVsbSA9IHRoaXMuZ3JpZC5nZXRIZWFkZXJSb3dDb2x1bW4odGhpcy5jb2x1bW5EZWYuaWQpO1xyXG4gICAgJCgkaGVhZGVyRWxtKS5lbXB0eSgpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIFNlbGVjdCBkcm9wZG93biBmb3IgdGhlIE9wZXJhdG9yXHJcbiAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbSA9ICQodGhpcy5idWlsZFNlbGVjdE9wZXJhdG9ySHRtbFN0cmluZygpKTtcclxuICAgIHRoaXMuJGZpbHRlcklucHV0RWxtID0gJCh0aGlzLmJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKCkpO1xyXG4gICAgY29uc3QgJGZpbHRlckNvbnRhaW5lckVsbSA9ICQoYDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHNlYXJjaC1maWx0ZXIgZmlsdGVyLSR7ZmllbGRJZH1cIj48L2Rpdj5gKTtcclxuICAgIHRoaXMuJGNvbnRhaW5lcklucHV0R3JvdXBFbG0gPSAkKGA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgc2VhcmNoLWZpbHRlciBmaWx0ZXItJHtmaWVsZElkfVwiPjwvZGl2PmApO1xyXG4gICAgY29uc3QgJG9wZXJhdG9ySW5wdXRHcm91cEFkZG9uID0gJChgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpbnB1dC1ncm91cC1wcmVwZW5kIG9wZXJhdG9yXCI+PC9zcGFuPmApO1xyXG5cclxuICAgIC8qIHRoZSBET00gZWxlbWVudCBmaW5hbCBzdHJ1Y3R1cmUgd2lsbCBiZVxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaW5wdXQtZ3JvdXAtcHJlcGVuZCBvcGVyYXRvclwiPlxyXG4gICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiPjwvc2VsZWN0PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJ0ZXh0XCIgLz5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaW5wdXQtZ3JvdXAtcHJlcGVuZFwiIGlkPVwicmFuZ2VPdXB1dF9wZXJjZW50Q29tcGxldGVcIj48c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHRcIj4wPC9zcGFuPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICovXHJcbiAgICAkb3BlcmF0b3JJbnB1dEdyb3VwQWRkb24uYXBwZW5kKHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtKTtcclxuICAgIHRoaXMuJGNvbnRhaW5lcklucHV0R3JvdXBFbG0uYXBwZW5kKCRvcGVyYXRvcklucHV0R3JvdXBBZGRvbik7XHJcbiAgICB0aGlzLiRjb250YWluZXJJbnB1dEdyb3VwRWxtLmFwcGVuZCh0aGlzLiRmaWx0ZXJJbnB1dEVsbSk7XHJcbiAgICBpZiAoIXRoaXMuZmlsdGVyUGFyYW1zLmhpZGVTbGlkZXJOdW1iZXIpIHtcclxuICAgICAgY29uc3QgJHNsaWRlclRleHRJbnB1dEFwcGVuZEFkZG9uID0gJCh0aGlzLmJ1aWxkVGVtcGxhdGVTbGlkZXJUZXh0SHRtbFN0cmluZygpKTtcclxuICAgICAgJHNsaWRlclRleHRJbnB1dEFwcGVuZEFkZG9uLmNoaWxkcmVuKCkuaHRtbChzZWFyY2hUZXJtSW5wdXQpO1xyXG4gICAgICB0aGlzLiRjb250YWluZXJJbnB1dEdyb3VwRWxtLmFwcGVuZCgkc2xpZGVyVGV4dElucHV0QXBwZW5kQWRkb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIGVsZW1lbnQgJiBhZGQgYW4gSUQgYW5kIGZpbHRlciBjbGFzc1xyXG4gICAgJGZpbHRlckNvbnRhaW5lckVsbS5hcHBlbmQodGhpcy4kY29udGFpbmVySW5wdXRHcm91cEVsbSk7XHJcbiAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmF0dHIoJ2lkJywgYGZpbHRlci0ke2ZpZWxkSWR9YCk7XHJcblxyXG4gICAgdGhpcy4kZmlsdGVySW5wdXRFbG0udmFsKHNlYXJjaFRlcm1JbnB1dCk7XHJcbiAgICB0aGlzLiRmaWx0ZXJJbnB1dEVsbS5kYXRhKCdjb2x1bW5JZCcsIGZpZWxkSWQpO1xyXG5cclxuICAgIGlmICh0aGlzLm9wZXJhdG9yKSB7XHJcbiAgICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLnZhbCh0aGlzLm9wZXJhdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiB0aGVyZSdzIGEgc2VhcmNoIHRlcm0sIHdlIHdpbGwgYWRkIHRoZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXHJcbiAgICBpZiAoc2VhcmNoVGVybSkge1xyXG4gICAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhcHBlbmQgdGhlIG5ldyBET00gZWxlbWVudCB0byB0aGUgaGVhZGVyIHJvd1xyXG4gICAgaWYgKCRmaWx0ZXJDb250YWluZXJFbG0gJiYgdHlwZW9mICRmaWx0ZXJDb250YWluZXJFbG0uYXBwZW5kVG8gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgJGZpbHRlckNvbnRhaW5lckVsbS5hcHBlbmRUbygkaGVhZGVyRWxtKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJGZpbHRlckNvbnRhaW5lckVsbTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25UcmlnZ2VyRXZlbnQoZTogRXZlbnQgfCB1bmRlZmluZWQpIHtcclxuICAgIGlmICh0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCkge1xyXG4gICAgICB0aGlzLmNhbGxiYWNrKGUsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgY2xlYXJGaWx0ZXJUcmlnZ2VyZWQ6IHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkLCBzaG91bGRUcmlnZ2VyUXVlcnk6IHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkT3BlcmF0b3IgPSB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS50ZXh0KCk7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy4kZmlsdGVySW5wdXRFbG0udmFsKCk7XHJcbiAgICAgICh2YWx1ZSkgPyB0aGlzLiRmaWx0ZXJFbG0uYWRkQ2xhc3MoJ2ZpbGxlZCcpIDogdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcclxuICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIHNlYXJjaFRlcm1zOiAodmFsdWUgPyBbdmFsdWVdIDogbnVsbCksIG9wZXJhdG9yOiBzZWxlY3RlZE9wZXJhdG9yIHx8ICcnLCBzaG91bGRUcmlnZ2VyUXVlcnk6IHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSB9KTtcclxuICAgIH1cclxuICAgIC8vIHJlc2V0IGJvdGggZmxhZ3MgZm9yIG5leHQgdXNlXHJcbiAgICB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZTtcclxuICB9XHJcbn1cclxuIl19