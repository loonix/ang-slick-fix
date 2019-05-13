/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { mapFlatpickrDateFormatWithFieldType } from '../services/utilities';
import { FieldType, OperatorType, } from './../models/index';
import Flatpickr from 'flatpickr';
require('flatpickr');
var CompoundDateFilter = /** @class */ (function () {
    function CompoundDateFilter(translate) {
        this.translate = translate;
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
    }
    Object.defineProperty(CompoundDateFilter.prototype, "gridOptions", {
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
    Object.defineProperty(CompoundDateFilter.prototype, "columnFilter", {
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
    Object.defineProperty(CompoundDateFilter.prototype, "operator", {
        /** Getter for the Filter Operator */
        get: /**
         * Getter for the Filter Operator
         * @return {?}
         */
        function () {
            return this._operator || OperatorType.empty;
        },
        /** Setter for the Filter Operator */
        set: /**
         * Setter for the Filter Operator
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
    CompoundDateFilter.prototype.init = /**
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
            // date input can only have 1 search term, so we will use the 1st array index if it exist
            /** @type {?} */
            var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
            // step 1, create the DOM Element of the filter which contain the compound Operator+Input
            // and initialize it if searchTerm is filled
            this.$filterElm = this.createDomElement(searchTerm);
            // step 3, subscribe to the keyup event and run the callback when that happens
            // also add/remove "filled" class for styling purposes
            this.$filterInputElm.keyup((/**
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
    CompoundDateFilter.prototype.clear = /**
     * Clear the filter value
     * @param {?=} shouldTriggerQuery
     * @return {?}
     */
    function (shouldTriggerQuery) {
        if (shouldTriggerQuery === void 0) { shouldTriggerQuery = true; }
        if (this.flatInstance && this.$selectOperatorElm) {
            this._clearFilterTriggered = true;
            this._shouldTriggerQuery = shouldTriggerQuery;
            this.searchTerms = [];
            this.$selectOperatorElm.val(0);
            this.flatInstance.clear();
        }
    };
    /**
     * destroy the filter
     */
    /**
     * destroy the filter
     * @return {?}
     */
    CompoundDateFilter.prototype.destroy = /**
     * destroy the filter
     * @return {?}
     */
    function () {
        if (this.$filterElm) {
            this.$filterElm.off('keyup').remove();
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
    CompoundDateFilter.prototype.setValues = /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    function (values) {
        if (this.flatInstance && values && Array.isArray(values)) {
            this.flatInstance.setDate(values[0]);
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
     * @param {?=} searchTerm
     * @return {?}
     */
    CompoundDateFilter.prototype.buildDatePickerInput = 
    //
    // private functions
    // ------------------
    /**
     * @private
     * @param {?=} searchTerm
     * @return {?}
     */
    function (searchTerm) {
        var _this = this;
        /** @type {?} */
        var inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
        /** @type {?} */
        var outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || this.columnDef.type || FieldType.dateUtc);
        /** @type {?} */
        var currentLocale = this.translate.currentLang || 'en';
        if (currentLocale.length > 2) {
            currentLocale = currentLocale.substring(0, 2);
        }
        /** @type {?} */
        var pickerOptions = {
            defaultDate: searchTerm || '',
            altInput: true,
            altFormat: outputFormat,
            dateFormat: inputFormat,
            wrap: true,
            closeOnSelect: true,
            locale: (currentLocale !== 'en') ? this.loadFlatpickrLocale(currentLocale) : 'en',
            onChange: (/**
             * @param {?} selectedDates
             * @param {?} dateStr
             * @param {?} instance
             * @return {?}
             */
            function (selectedDates, dateStr, instance) {
                _this._currentValue = dateStr;
                // when using the time picker, we can simulate a keyup event to avoid multiple backend request
                // since backend request are only executed after user start typing, changing the time should be treated the same way
                if (pickerOptions.enableTime) {
                    _this.onTriggerEvent(new CustomEvent('keyup'));
                }
                else {
                    _this.onTriggerEvent(undefined);
                }
            })
        };
        // add the time picker when format is UTC (Z) or has the 'h' (meaning hours)
        if (outputFormat && (outputFormat === 'Z' || outputFormat.toLowerCase().includes('h'))) {
            pickerOptions.enableTime = true;
        }
        // merge options with optional user's custom options
        /** @type {?} */
        var pickerMergedOptions = tslib_1.__assign({}, pickerOptions, this.columnFilter.filterOptions);
        /** @type {?} */
        var placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        if (this.columnFilter && this.columnFilter.placeholder) {
            placeholder = this.columnFilter.placeholder;
        }
        /** @type {?} */
        var $filterInputElm = $("<div class=\"flatpickr\"><input type=\"text\" class=\"form-control\" data-input placeholder=\"" + placeholder + "\"></div>");
        this.flatInstance = ($filterInputElm[0] && typeof $filterInputElm[0].flatpickr === 'function') ? $filterInputElm[0].flatpickr(pickerMergedOptions) : Flatpickr($filterInputElm, pickerMergedOptions);
        return $filterInputElm;
    };
    /**
     * @private
     * @return {?}
     */
    CompoundDateFilter.prototype.buildSelectOperatorHtmlString = /**
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
    CompoundDateFilter.prototype.getOptionValues = /**
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
    CompoundDateFilter.prototype.createDomElement = /**
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
        this.$filterInputElm = this.buildDatePickerInput(searchTerm);
        /** @type {?} */
        var $filterContainerElm = $("<div class=\"form-group search-filter filter-" + fieldId + "\"></div>");
        /** @type {?} */
        var $containerInputGroup = $("<div class=\"input-group flatpickr\"></div>");
        /** @type {?} */
        var $operatorInputGroupAddon = $("<div class=\"input-group-addon input-group-prepend operator\"></div>");
        /* the DOM element final structure will be
          <div class="input-group">
            <div class="input-group-addon input-group-prepend operator">
              <select class="form-control"></select>
            </div>
            <div class=flatpickr>
              <input type="text" class="form-control" data-input>
            </div>
          </div>
        */
        $operatorInputGroupAddon.append(this.$selectOperatorElm);
        $containerInputGroup.append($operatorInputGroupAddon);
        $containerInputGroup.append(this.$filterInputElm);
        // create the DOM element & add an ID and filter class
        $filterContainerElm.append($containerInputGroup);
        $filterContainerElm.attr('id', "filter-" + fieldId);
        this.$filterInputElm.data('columnId', fieldId);
        if (this.operator) {
            this.$selectOperatorElm.val(this.operator);
        }
        // if there's a search term, we will add the "filled" class for styling purposes
        if (searchTerm) {
            $filterContainerElm.addClass('filled');
            this._currentValue = (/** @type {?} */ (searchTerm));
        }
        // append the new DOM element to the header row
        if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
            $filterContainerElm.appendTo($headerElm);
        }
        return $filterContainerElm;
    };
    /**
     * @private
     * @param {?} locale
     * @return {?}
     */
    CompoundDateFilter.prototype.loadFlatpickrLocale = /**
     * @private
     * @param {?} locale
     * @return {?}
     */
    function (locale) {
        // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
        if (this.gridOptions && this.gridOptions.params && this.gridOptions.params.flapickrLocale) {
            return this.gridOptions.params.flapickrLocale;
        }
        else if (locale !== 'en') {
            /** @type {?} */
            var localeDefault = require("flatpickr/dist/l10n/" + locale + ".js").default;
            return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
        }
        return 'en';
    };
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    CompoundDateFilter.prototype.onTriggerEvent = /**
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
            (this._currentValue) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef, searchTerms: (this._currentValue ? [this._currentValue] : null), operator: selectedOperator || '', shouldTriggerQuery: this._shouldTriggerQuery });
        }
        // reset both flags for next use
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
    };
    /**
     * @private
     * @return {?}
     */
    CompoundDateFilter.prototype.hide = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.flatInstance && typeof this.flatInstance.close === 'function') {
            this.flatInstance.close();
        }
    };
    /**
     * @private
     * @return {?}
     */
    CompoundDateFilter.prototype.show = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.flatInstance && typeof this.flatInstance.open === 'function') {
            this.flatInstance.open();
        }
    };
    return CompoundDateFilter;
}());
export { CompoundDateFilter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CompoundDateFilter.prototype._clearFilterTriggered;
    /**
     * @type {?}
     * @private
     */
    CompoundDateFilter.prototype._shouldTriggerQuery;
    /**
     * @type {?}
     * @private
     */
    CompoundDateFilter.prototype.$filterElm;
    /**
     * @type {?}
     * @private
     */
    CompoundDateFilter.prototype.$filterInputElm;
    /**
     * @type {?}
     * @private
     */
    CompoundDateFilter.prototype.$selectOperatorElm;
    /**
     * @type {?}
     * @private
     */
    CompoundDateFilter.prototype._currentValue;
    /**
     * @type {?}
     * @private
     */
    CompoundDateFilter.prototype._operator;
    /** @type {?} */
    CompoundDateFilter.prototype.flatInstance;
    /** @type {?} */
    CompoundDateFilter.prototype.grid;
    /** @type {?} */
    CompoundDateFilter.prototype.searchTerms;
    /** @type {?} */
    CompoundDateFilter.prototype.columnDef;
    /** @type {?} */
    CompoundDateFilter.prototype.callback;
    /**
     * @type {?}
     * @private
     */
    CompoundDateFilter.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG91bmREYXRlRmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL2NvbXBvdW5kRGF0ZUZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVFLE9BQU8sRUFNTCxTQUFTLEVBR1QsWUFBWSxHQUViLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxTQUFTLE1BQU0sV0FBVyxDQUFDO0FBSWxDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUtyQjtJQWNFLDRCQUFvQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQWJ2QywwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDOUIsd0JBQW1CLEdBQUcsSUFBSSxDQUFDO0lBWWdCLENBQUM7SUFHcEQsc0JBQVksMkNBQVc7UUFEdkIsaUVBQWlFOzs7Ozs7UUFDakU7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDM0UsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSw0Q0FBWTtRQURoQixtQ0FBbUM7Ozs7O1FBQ25DO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUN2RCxDQUFDOzs7T0FBQTtJQUdELHNCQUFJLHdDQUFRO1FBSVoscUNBQXFDOzs7OztRQUNyQztZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQzlDLENBQUM7UUFSRCxxQ0FBcUM7Ozs7OztRQUNyQyxVQUFhLEVBQWlDO1lBQzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBT0Q7O09BRUc7Ozs7OztJQUNILGlDQUFJOzs7OztJQUFKLFVBQUssSUFBcUI7UUFBMUIsaUJBd0JDO1FBdkJDLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDOzs7Z0JBR3BDLFVBQVUsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO1lBRWpGLHlGQUF5RjtZQUN6Riw0Q0FBNEM7WUFDNUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFcEQsOEVBQThFO1lBQzlFLHNEQUFzRDtZQUN0RCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7Ozs7WUFBQyxVQUFDLENBQU07Z0JBQ2hDLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsQ0FBQyxFQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTTs7OztZQUFDLFVBQUMsQ0FBTTtnQkFDcEMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSCxrQ0FBSzs7Ozs7SUFBTCxVQUFNLGtCQUF5QjtRQUF6QixtQ0FBQSxFQUFBLHlCQUF5QjtRQUM3QixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ2hELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7WUFDbEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDO1lBQzlDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxvQ0FBTzs7OztJQUFQO1FBQ0UsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSCxzQ0FBUzs7Ozs7SUFBVCxVQUFVLE1BQW9CO1FBQzVCLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN4RCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QztJQUNILENBQUM7SUFFRCxFQUFFO0lBQ0Ysb0JBQW9CO0lBQ3BCLHFCQUFxQjs7Ozs7Ozs7O0lBQ2IsaURBQW9COzs7Ozs7Ozs7SUFBNUIsVUFBNkIsVUFBdUI7UUFBcEQsaUJBNkNDOztZQTVDTyxXQUFXLEdBQUcsbUNBQW1DLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQzs7WUFDM0YsWUFBWSxHQUFHLG1DQUFtQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUM7O1lBQzNILGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsSUFBSSxJQUFJO1FBQ3RELElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDNUIsYUFBYSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQy9DOztZQUVLLGFBQWEsR0FBUTtZQUN6QixXQUFXLEVBQUUsVUFBVSxJQUFJLEVBQUU7WUFDN0IsUUFBUSxFQUFFLElBQUk7WUFDZCxTQUFTLEVBQUUsWUFBWTtZQUN2QixVQUFVLEVBQUUsV0FBVztZQUN2QixJQUFJLEVBQUUsSUFBSTtZQUNWLGFBQWEsRUFBRSxJQUFJO1lBQ25CLE1BQU0sRUFBRSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ2pGLFFBQVE7Ozs7OztZQUFFLFVBQUMsYUFBMEIsRUFBRSxPQUFlLEVBQUUsUUFBYTtnQkFDbkUsS0FBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7Z0JBRTdCLDhGQUE4RjtnQkFDOUYsb0hBQW9IO2dCQUNwSCxJQUFJLGFBQWEsQ0FBQyxVQUFVLEVBQUU7b0JBQzVCLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztpQkFDL0M7cUJBQU07b0JBQ0wsS0FBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDaEM7WUFDSCxDQUFDLENBQUE7U0FDRjtRQUdELDRFQUE0RTtRQUM1RSxJQUFJLFlBQVksSUFBSSxDQUFDLFlBQVksS0FBSyxHQUFHLElBQUksWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ3RGLGFBQWEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ2pDOzs7WUFHSyxtQkFBbUIsd0JBQVEsYUFBYSxFQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFFOztZQUVoRixXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUM3RixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUU7WUFDdEQsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDO1NBQzdDOztZQUNLLGVBQWUsR0FBUSxDQUFDLENBQUMsbUdBQTBGLFdBQVcsY0FBVSxDQUFDO1FBQy9JLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUNyTSxPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDOzs7OztJQUVPLDBEQUE2Qjs7OztJQUFyQzs7WUFDUSxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRTs7WUFDdkMsaUJBQWlCLEdBQUcsRUFBRTtRQUMxQixZQUFZLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsTUFBTTtZQUMxQixpQkFBaUIsSUFBSSxxQkFBa0IsTUFBTSxDQUFDLFFBQVEsbUJBQVksTUFBTSxDQUFDLFdBQVcsV0FBSyxNQUFNLENBQUMsUUFBUSxjQUFXLENBQUM7UUFDdEgsQ0FBQyxFQUFDLENBQUM7UUFFSCxPQUFPLG9DQUFnQyxpQkFBaUIsY0FBVyxDQUFDO0lBQ3RFLENBQUM7Ozs7O0lBRU8sNENBQWU7Ozs7SUFBdkI7UUFDRSxPQUFPO1lBQ0wsRUFBRSxRQUFRLEVBQUUsbUJBQUEsRUFBRSxFQUFrQixFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7WUFDbkQsRUFBRSxRQUFRLEVBQUUsbUJBQUEsR0FBRyxFQUFrQixFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7WUFDcEQsRUFBRSxRQUFRLEVBQUUsbUJBQUEsR0FBRyxFQUFrQixFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7WUFDcEQsRUFBRSxRQUFRLEVBQUUsbUJBQUEsSUFBSSxFQUFrQixFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7WUFDckQsRUFBRSxRQUFRLEVBQUUsbUJBQUEsR0FBRyxFQUFrQixFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7WUFDcEQsRUFBRSxRQUFRLEVBQUUsbUJBQUEsSUFBSSxFQUFrQixFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7WUFDckQsRUFBRSxRQUFRLEVBQUUsbUJBQUEsSUFBSSxFQUFrQixFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7U0FDdEQsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRzs7Ozs7OztJQUNLLDZDQUFnQjs7Ozs7O0lBQXhCLFVBQXlCLFVBQXVCOztZQUN4QyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7O1lBQzdDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztRQUN4RCxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFdEIsa0RBQWtEO1FBQ2xELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7WUFDdkQsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLGtEQUErQyxPQUFPLGNBQVUsQ0FBQzs7WUFDekYsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLDZDQUEyQyxDQUFDOztZQUNyRSx3QkFBd0IsR0FBRyxDQUFDLENBQUMsc0VBQW9FLENBQUM7UUFFeEc7Ozs7Ozs7OztVQVNFO1FBQ0Ysd0JBQXdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3pELG9CQUFvQixDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3RELG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFbEQsc0RBQXNEO1FBQ3RELG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2pELG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsWUFBVSxPQUFTLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFL0MsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzVDO1FBRUQsZ0ZBQWdGO1FBQ2hGLElBQUksVUFBVSxFQUFFO1lBQ2QsbUJBQW1CLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsbUJBQUEsVUFBVSxFQUFVLENBQUM7U0FDM0M7UUFFRCwrQ0FBK0M7UUFDL0MsSUFBSSxtQkFBbUIsSUFBSSxPQUFPLG1CQUFtQixDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUU7WUFDN0UsbUJBQW1CLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzFDO1FBRUQsT0FBTyxtQkFBbUIsQ0FBQztJQUM3QixDQUFDOzs7Ozs7SUFFTyxnREFBbUI7Ozs7O0lBQTNCLFVBQTRCLE1BQWM7UUFDeEMsZ0dBQWdHO1FBQ2hHLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUU7WUFDekYsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7U0FDL0M7YUFBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7O2dCQUNwQixhQUFhLEdBQVEsT0FBTyxDQUFDLHlCQUF1QixNQUFNLFFBQUssQ0FBQyxDQUFDLE9BQU87WUFDOUUsT0FBTyxDQUFDLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDaEY7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7OztJQUVPLDJDQUFjOzs7OztJQUF0QixVQUF1QixDQUFvQjtRQUN6QyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLG9CQUFvQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1lBQ2hKLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZDO2FBQU07O2dCQUNDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFDL0UsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLElBQUksRUFBRSxFQUFFLGtCQUFrQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7U0FDbE07UUFDRCxnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBRU8saUNBQUk7Ozs7SUFBWjtRQUNFLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxLQUFLLFVBQVUsRUFBRTtZQUN0RSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxpQ0FBSTs7OztJQUFaO1FBQ0UsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO1lBQ3JFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBaFFELElBZ1FDOzs7Ozs7O0lBL1BDLG1EQUFzQzs7Ozs7SUFDdEMsaURBQW1DOzs7OztJQUNuQyx3Q0FBd0I7Ozs7O0lBQ3hCLDZDQUE2Qjs7Ozs7SUFDN0IsZ0RBQWdDOzs7OztJQUNoQywyQ0FBOEI7Ozs7O0lBQzlCLHVDQUFpRDs7SUFDakQsMENBQWtCOztJQUNsQixrQ0FBVTs7SUFDVix5Q0FBMEI7O0lBQzFCLHVDQUFrQjs7SUFDbEIsc0NBQXlCOzs7OztJQUViLHVDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgbWFwRmxhdHBpY2tyRGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUgfSBmcm9tICcuLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQge1xyXG4gIENvbHVtbixcclxuICBDb2x1bW5GaWx0ZXIsXHJcbiAgRmlsdGVyLFxyXG4gIEZpbHRlckFyZ3VtZW50cyxcclxuICBGaWx0ZXJDYWxsYmFjayxcclxuICBGaWVsZFR5cGUsXHJcbiAgR3JpZE9wdGlvbixcclxuICBPcGVyYXRvclN0cmluZyxcclxuICBPcGVyYXRvclR5cGUsXHJcbiAgU2VhcmNoVGVybSxcclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCBGbGF0cGlja3IgZnJvbSAnZmxhdHBpY2tyJztcclxuXHJcbi8vIHVzZSBGbGF0cGlja3IgZnJvbSBpbXBvcnQgb3IgJ3JlcXVpcmUnLCB3aGljaGV2ZXIgd29ya3MgZmlyc3RcclxuZGVjbGFyZSBmdW5jdGlvbiByZXF1aXJlKG5hbWU6IHN0cmluZyk6IGFueTtcclxucmVxdWlyZSgnZmxhdHBpY2tyJyk7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb3VuZERhdGVGaWx0ZXIgaW1wbGVtZW50cyBGaWx0ZXIge1xyXG4gIHByaXZhdGUgX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZTtcclxuICBwcml2YXRlICRmaWx0ZXJFbG06IGFueTtcclxuICBwcml2YXRlICRmaWx0ZXJJbnB1dEVsbTogYW55O1xyXG4gIHByaXZhdGUgJHNlbGVjdE9wZXJhdG9yRWxtOiBhbnk7XHJcbiAgcHJpdmF0ZSBfY3VycmVudFZhbHVlOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfb3BlcmF0b3I6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nO1xyXG4gIGZsYXRJbnN0YW5jZTogYW55O1xyXG4gIGdyaWQ6IGFueTtcclxuICBzZWFyY2hUZXJtczogU2VhcmNoVGVybVtdO1xyXG4gIGNvbHVtbkRlZjogQ29sdW1uO1xyXG4gIGNhbGxiYWNrOiBGaWx0ZXJDYWxsYmFjaztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHsgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByaXZhdGUgZ2V0IGdyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xyXG4gICAgcmV0dXJuICh0aGlzLmdyaWQgJiYgdGhpcy5ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIENvbHVtbiBGaWx0ZXIgKi9cclxuICBnZXQgY29sdW1uRmlsdGVyKCk6IENvbHVtbkZpbHRlciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIFNldHRlciBmb3IgdGhlIEZpbHRlciBPcGVyYXRvciAqL1xyXG4gIHNldCBvcGVyYXRvcihvcDogT3BlcmF0b3JUeXBlIHwgT3BlcmF0b3JTdHJpbmcpIHtcclxuICAgIHRoaXMuX29wZXJhdG9yID0gb3A7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgRmlsdGVyIE9wZXJhdG9yICovXHJcbiAgZ2V0IG9wZXJhdG9yKCk6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9vcGVyYXRvciB8fCBPcGVyYXRvclR5cGUuZW1wdHk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBGaWx0ZXJcclxuICAgKi9cclxuICBpbml0KGFyZ3M6IEZpbHRlckFyZ3VtZW50cykge1xyXG4gICAgaWYgKGFyZ3MpIHtcclxuICAgICAgdGhpcy5ncmlkID0gYXJncy5ncmlkO1xyXG4gICAgICB0aGlzLmNhbGxiYWNrID0gYXJncy5jYWxsYmFjaztcclxuICAgICAgdGhpcy5jb2x1bW5EZWYgPSBhcmdzLmNvbHVtbkRlZjtcclxuICAgICAgdGhpcy5vcGVyYXRvciA9IGFyZ3Mub3BlcmF0b3IgfHwgJyc7XHJcbiAgICAgIHRoaXMuc2VhcmNoVGVybXMgPSBhcmdzLnNlYXJjaFRlcm1zIHx8IFtdO1xyXG5cclxuICAgICAgLy8gZGF0ZSBpbnB1dCBjYW4gb25seSBoYXZlIDEgc2VhcmNoIHRlcm0sIHNvIHdlIHdpbGwgdXNlIHRoZSAxc3QgYXJyYXkgaW5kZXggaWYgaXQgZXhpc3RcclxuICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IChBcnJheS5pc0FycmF5KHRoaXMuc2VhcmNoVGVybXMpICYmIHRoaXMuc2VhcmNoVGVybXNbMF0pIHx8ICcnO1xyXG5cclxuICAgICAgLy8gc3RlcCAxLCBjcmVhdGUgdGhlIERPTSBFbGVtZW50IG9mIHRoZSBmaWx0ZXIgd2hpY2ggY29udGFpbiB0aGUgY29tcG91bmQgT3BlcmF0b3IrSW5wdXRcclxuICAgICAgLy8gYW5kIGluaXRpYWxpemUgaXQgaWYgc2VhcmNoVGVybSBpcyBmaWxsZWRcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtID0gdGhpcy5jcmVhdGVEb21FbGVtZW50KHNlYXJjaFRlcm0pO1xyXG5cclxuICAgICAgLy8gc3RlcCAzLCBzdWJzY3JpYmUgdG8gdGhlIGtleXVwIGV2ZW50IGFuZCBydW4gdGhlIGNhbGxiYWNrIHdoZW4gdGhhdCBoYXBwZW5zXHJcbiAgICAgIC8vIGFsc28gYWRkL3JlbW92ZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXHJcbiAgICAgIHRoaXMuJGZpbHRlcklucHV0RWxtLmtleXVwKChlOiBhbnkpID0+IHtcclxuICAgICAgICB0aGlzLm9uVHJpZ2dlckV2ZW50KGUpO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0uY2hhbmdlKChlOiBhbnkpID0+IHtcclxuICAgICAgICB0aGlzLm9uVHJpZ2dlckV2ZW50KGUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBmaWx0ZXIgdmFsdWVcclxuICAgKi9cclxuICBjbGVhcihzaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlKSB7XHJcbiAgICBpZiAodGhpcy5mbGF0SW5zdGFuY2UgJiYgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0pIHtcclxuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgPSBzaG91bGRUcmlnZ2VyUXVlcnk7XHJcbiAgICAgIHRoaXMuc2VhcmNoVGVybXMgPSBbXTtcclxuICAgICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0udmFsKDApO1xyXG4gICAgICB0aGlzLmZsYXRJbnN0YW5jZS5jbGVhcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZGVzdHJveSB0aGUgZmlsdGVyXHJcbiAgICovXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLiRmaWx0ZXJFbG0pIHtcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLm9mZigna2V5dXAnKS5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB2YWx1ZShzKSBvbiB0aGUgRE9NIGVsZW1lbnRcclxuICAgKi9cclxuICBzZXRWYWx1ZXModmFsdWVzOiBTZWFyY2hUZXJtW10pIHtcclxuICAgIGlmICh0aGlzLmZsYXRJbnN0YW5jZSAmJiB2YWx1ZXMgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XHJcbiAgICAgIHRoaXMuZmxhdEluc3RhbmNlLnNldERhdGUodmFsdWVzWzBdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vXHJcbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cclxuICBwcml2YXRlIGJ1aWxkRGF0ZVBpY2tlcklucHV0KHNlYXJjaFRlcm0/OiBTZWFyY2hUZXJtKSB7XHJcbiAgICBjb25zdCBpbnB1dEZvcm1hdCA9IG1hcEZsYXRwaWNrckRhdGVGb3JtYXRXaXRoRmllbGRUeXBlKHRoaXMuY29sdW1uRGVmLnR5cGUgfHwgRmllbGRUeXBlLmRhdGVJc28pO1xyXG4gICAgY29uc3Qgb3V0cHV0Rm9ybWF0ID0gbWFwRmxhdHBpY2tyRGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUodGhpcy5jb2x1bW5EZWYub3V0cHV0VHlwZSB8fCB0aGlzLmNvbHVtbkRlZi50eXBlIHx8IEZpZWxkVHlwZS5kYXRlVXRjKTtcclxuICAgIGxldCBjdXJyZW50TG9jYWxlID0gdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmcgfHwgJ2VuJztcclxuICAgIGlmIChjdXJyZW50TG9jYWxlLmxlbmd0aCA+IDIpIHtcclxuICAgICAgY3VycmVudExvY2FsZSA9IGN1cnJlbnRMb2NhbGUuc3Vic3RyaW5nKDAsIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBpY2tlck9wdGlvbnM6IGFueSA9IHtcclxuICAgICAgZGVmYXVsdERhdGU6IHNlYXJjaFRlcm0gfHwgJycsXHJcbiAgICAgIGFsdElucHV0OiB0cnVlLFxyXG4gICAgICBhbHRGb3JtYXQ6IG91dHB1dEZvcm1hdCxcclxuICAgICAgZGF0ZUZvcm1hdDogaW5wdXRGb3JtYXQsXHJcbiAgICAgIHdyYXA6IHRydWUsXHJcbiAgICAgIGNsb3NlT25TZWxlY3Q6IHRydWUsXHJcbiAgICAgIGxvY2FsZTogKGN1cnJlbnRMb2NhbGUgIT09ICdlbicpID8gdGhpcy5sb2FkRmxhdHBpY2tyTG9jYWxlKGN1cnJlbnRMb2NhbGUpIDogJ2VuJyxcclxuICAgICAgb25DaGFuZ2U6IChzZWxlY3RlZERhdGVzOiBhbnlbXSB8IGFueSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogYW55KSA9PiB7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFZhbHVlID0gZGF0ZVN0cjtcclxuXHJcbiAgICAgICAgLy8gd2hlbiB1c2luZyB0aGUgdGltZSBwaWNrZXIsIHdlIGNhbiBzaW11bGF0ZSBhIGtleXVwIGV2ZW50IHRvIGF2b2lkIG11bHRpcGxlIGJhY2tlbmQgcmVxdWVzdFxyXG4gICAgICAgIC8vIHNpbmNlIGJhY2tlbmQgcmVxdWVzdCBhcmUgb25seSBleGVjdXRlZCBhZnRlciB1c2VyIHN0YXJ0IHR5cGluZywgY2hhbmdpbmcgdGhlIHRpbWUgc2hvdWxkIGJlIHRyZWF0ZWQgdGhlIHNhbWUgd2F5XHJcbiAgICAgICAgaWYgKHBpY2tlck9wdGlvbnMuZW5hYmxlVGltZSkge1xyXG4gICAgICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2tleXVwJykpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm9uVHJpZ2dlckV2ZW50KHVuZGVmaW5lZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvLyBhZGQgdGhlIHRpbWUgcGlja2VyIHdoZW4gZm9ybWF0IGlzIFVUQyAoWikgb3IgaGFzIHRoZSAnaCcgKG1lYW5pbmcgaG91cnMpXHJcbiAgICBpZiAob3V0cHV0Rm9ybWF0ICYmIChvdXRwdXRGb3JtYXQgPT09ICdaJyB8fCBvdXRwdXRGb3JtYXQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnaCcpKSkge1xyXG4gICAgICBwaWNrZXJPcHRpb25zLmVuYWJsZVRpbWUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1lcmdlIG9wdGlvbnMgd2l0aCBvcHRpb25hbCB1c2VyJ3MgY3VzdG9tIG9wdGlvbnNcclxuICAgIGNvbnN0IHBpY2tlck1lcmdlZE9wdGlvbnMgPSB7IC4uLnBpY2tlck9wdGlvbnMsIC4uLnRoaXMuY29sdW1uRmlsdGVyLmZpbHRlck9wdGlvbnMgfTtcclxuXHJcbiAgICBsZXQgcGxhY2Vob2xkZXIgPSAodGhpcy5ncmlkT3B0aW9ucykgPyAodGhpcy5ncmlkT3B0aW9ucy5kZWZhdWx0RmlsdGVyUGxhY2Vob2xkZXIgfHwgJycpIDogJyc7XHJcbiAgICBpZiAodGhpcy5jb2x1bW5GaWx0ZXIgJiYgdGhpcy5jb2x1bW5GaWx0ZXIucGxhY2Vob2xkZXIpIHtcclxuICAgICAgcGxhY2Vob2xkZXIgPSB0aGlzLmNvbHVtbkZpbHRlci5wbGFjZWhvbGRlcjtcclxuICAgIH1cclxuICAgIGNvbnN0ICRmaWx0ZXJJbnB1dEVsbTogYW55ID0gJChgPGRpdiBjbGFzcz1cImZsYXRwaWNrclwiPjxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgZGF0YS1pbnB1dCBwbGFjZWhvbGRlcj1cIiR7cGxhY2Vob2xkZXJ9XCI+PC9kaXY+YCk7XHJcbiAgICB0aGlzLmZsYXRJbnN0YW5jZSA9ICgkZmlsdGVySW5wdXRFbG1bMF0gJiYgdHlwZW9mICRmaWx0ZXJJbnB1dEVsbVswXS5mbGF0cGlja3IgPT09ICdmdW5jdGlvbicpID8gJGZpbHRlcklucHV0RWxtWzBdLmZsYXRwaWNrcihwaWNrZXJNZXJnZWRPcHRpb25zKSA6IEZsYXRwaWNrcigkZmlsdGVySW5wdXRFbG0sIHBpY2tlck1lcmdlZE9wdGlvbnMpO1xyXG4gICAgcmV0dXJuICRmaWx0ZXJJbnB1dEVsbTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVpbGRTZWxlY3RPcGVyYXRvckh0bWxTdHJpbmcoKSB7XHJcbiAgICBjb25zdCBvcHRpb25WYWx1ZXMgPSB0aGlzLmdldE9wdGlvblZhbHVlcygpO1xyXG4gICAgbGV0IG9wdGlvblZhbHVlU3RyaW5nID0gJyc7XHJcbiAgICBvcHRpb25WYWx1ZXMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XHJcbiAgICAgIG9wdGlvblZhbHVlU3RyaW5nICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtvcHRpb24ub3BlcmF0b3J9XCIgdGl0bGU9XCIke29wdGlvbi5kZXNjcmlwdGlvbn1cIj4ke29wdGlvbi5vcGVyYXRvcn08L29wdGlvbj5gO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCI+JHtvcHRpb25WYWx1ZVN0cmluZ308L3NlbGVjdD5gO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPcHRpb25WYWx1ZXMoKTogeyBvcGVyYXRvcjogT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcgfVtdIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHsgb3BlcmF0b3I6ICcnIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcclxuICAgICAgeyBvcGVyYXRvcjogJz0nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcclxuICAgICAgeyBvcGVyYXRvcjogJzwnIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcclxuICAgICAgeyBvcGVyYXRvcjogJzw9JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXHJcbiAgICAgIHsgb3BlcmF0b3I6ICc+JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXHJcbiAgICAgIHsgb3BlcmF0b3I6ICc+PScgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxyXG4gICAgICB7IG9wZXJhdG9yOiAnPD4nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSB0aGUgRE9NIGVsZW1lbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZURvbUVsZW1lbnQoc2VhcmNoVGVybT86IFNlYXJjaFRlcm0pIHtcclxuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcclxuICAgIGNvbnN0ICRoZWFkZXJFbG0gPSB0aGlzLmdyaWQuZ2V0SGVhZGVyUm93Q29sdW1uKGZpZWxkSWQpO1xyXG4gICAgJCgkaGVhZGVyRWxtKS5lbXB0eSgpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIFNlbGVjdCBkcm9wZG93biBmb3IgdGhlIE9wZXJhdG9yXHJcbiAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbSA9ICQodGhpcy5idWlsZFNlbGVjdE9wZXJhdG9ySHRtbFN0cmluZygpKTtcclxuICAgIHRoaXMuJGZpbHRlcklucHV0RWxtID0gdGhpcy5idWlsZERhdGVQaWNrZXJJbnB1dChzZWFyY2hUZXJtKTtcclxuICAgIGNvbnN0ICRmaWx0ZXJDb250YWluZXJFbG0gPSAkKGA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBzZWFyY2gtZmlsdGVyIGZpbHRlci0ke2ZpZWxkSWR9XCI+PC9kaXY+YCk7XHJcbiAgICBjb25zdCAkY29udGFpbmVySW5wdXRHcm91cCA9ICQoYDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBmbGF0cGlja3JcIj48L2Rpdj5gKTtcclxuICAgIGNvbnN0ICRvcGVyYXRvcklucHV0R3JvdXBBZGRvbiA9ICQoYDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpbnB1dC1ncm91cC1wcmVwZW5kIG9wZXJhdG9yXCI+PC9kaXY+YCk7XHJcblxyXG4gICAgLyogdGhlIERPTSBlbGVtZW50IGZpbmFsIHN0cnVjdHVyZSB3aWxsIGJlXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpbnB1dC1ncm91cC1wcmVwZW5kIG9wZXJhdG9yXCI+XHJcbiAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCI+PC9zZWxlY3Q+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1mbGF0cGlja3I+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGRhdGEtaW5wdXQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKi9cclxuICAgICRvcGVyYXRvcklucHV0R3JvdXBBZGRvbi5hcHBlbmQodGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0pO1xyXG4gICAgJGNvbnRhaW5lcklucHV0R3JvdXAuYXBwZW5kKCRvcGVyYXRvcklucHV0R3JvdXBBZGRvbik7XHJcbiAgICAkY29udGFpbmVySW5wdXRHcm91cC5hcHBlbmQodGhpcy4kZmlsdGVySW5wdXRFbG0pO1xyXG5cclxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIGVsZW1lbnQgJiBhZGQgYW4gSUQgYW5kIGZpbHRlciBjbGFzc1xyXG4gICAgJGZpbHRlckNvbnRhaW5lckVsbS5hcHBlbmQoJGNvbnRhaW5lcklucHV0R3JvdXApO1xyXG4gICAgJGZpbHRlckNvbnRhaW5lckVsbS5hdHRyKCdpZCcsIGBmaWx0ZXItJHtmaWVsZElkfWApO1xyXG4gICAgdGhpcy4kZmlsdGVySW5wdXRFbG0uZGF0YSgnY29sdW1uSWQnLCBmaWVsZElkKTtcclxuXHJcbiAgICBpZiAodGhpcy5vcGVyYXRvcikge1xyXG4gICAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS52YWwodGhpcy5vcGVyYXRvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgdGhlcmUncyBhIHNlYXJjaCB0ZXJtLCB3ZSB3aWxsIGFkZCB0aGUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xyXG4gICAgaWYgKHNlYXJjaFRlcm0pIHtcclxuICAgICAgJGZpbHRlckNvbnRhaW5lckVsbS5hZGRDbGFzcygnZmlsbGVkJyk7XHJcbiAgICAgIHRoaXMuX2N1cnJlbnRWYWx1ZSA9IHNlYXJjaFRlcm0gYXMgc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFwcGVuZCB0aGUgbmV3IERPTSBlbGVtZW50IHRvIHRoZSBoZWFkZXIgcm93XHJcbiAgICBpZiAoJGZpbHRlckNvbnRhaW5lckVsbSAmJiB0eXBlb2YgJGZpbHRlckNvbnRhaW5lckVsbS5hcHBlbmRUbyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZFRvKCRoZWFkZXJFbG0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAkZmlsdGVyQ29udGFpbmVyRWxtO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBsb2FkRmxhdHBpY2tyTG9jYWxlKGxvY2FsZTogc3RyaW5nKSB7XHJcbiAgICAvLyBjaGFuZ2UgbG9jYWxlIGlmIG5lZWRlZCwgRmxhdHBpY2tyIHJlZmVyZW5jZTogaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2xvY2FsaXphdGlvbi9cclxuICAgIGlmICh0aGlzLmdyaWRPcHRpb25zICYmIHRoaXMuZ3JpZE9wdGlvbnMucGFyYW1zICYmIHRoaXMuZ3JpZE9wdGlvbnMucGFyYW1zLmZsYXBpY2tyTG9jYWxlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdyaWRPcHRpb25zLnBhcmFtcy5mbGFwaWNrckxvY2FsZTtcclxuICAgIH0gZWxzZSBpZiAobG9jYWxlICE9PSAnZW4nKSB7XHJcbiAgICAgIGNvbnN0IGxvY2FsZURlZmF1bHQ6IGFueSA9IHJlcXVpcmUoYGZsYXRwaWNrci9kaXN0L2wxMG4vJHtsb2NhbGV9LmpzYCkuZGVmYXVsdDtcclxuICAgICAgcmV0dXJuIChsb2NhbGVEZWZhdWx0ICYmIGxvY2FsZURlZmF1bHRbbG9jYWxlXSkgPyBsb2NhbGVEZWZhdWx0W2xvY2FsZV0gOiAnZW4nO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICdlbic7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uVHJpZ2dlckV2ZW50KGU6IEV2ZW50IHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAodGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQpIHtcclxuICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCwgc2hvdWxkVHJpZ2dlclF1ZXJ5OiB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgfSk7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBzZWxlY3RlZE9wZXJhdG9yID0gdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0uZmluZCgnb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpO1xyXG4gICAgICAodGhpcy5fY3VycmVudFZhbHVlKSA/IHRoaXMuJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJykgOiB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgICB0aGlzLmNhbGxiYWNrKGUsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgc2VhcmNoVGVybXM6ICh0aGlzLl9jdXJyZW50VmFsdWUgPyBbdGhpcy5fY3VycmVudFZhbHVlXSA6IG51bGwpLCBvcGVyYXRvcjogc2VsZWN0ZWRPcGVyYXRvciB8fCAnJywgc2hvdWxkVHJpZ2dlclF1ZXJ5OiB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgfSk7XHJcbiAgICB9XHJcbiAgICAvLyByZXNldCBib3RoIGZsYWdzIGZvciBuZXh0IHVzZVxyXG4gICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhpZGUoKSB7XHJcbiAgICBpZiAodGhpcy5mbGF0SW5zdGFuY2UgJiYgdHlwZW9mIHRoaXMuZmxhdEluc3RhbmNlLmNsb3NlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuZmxhdEluc3RhbmNlLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNob3coKSB7XHJcbiAgICBpZiAodGhpcy5mbGF0SW5zdGFuY2UgJiYgdHlwZW9mIHRoaXMuZmxhdEluc3RhbmNlLm9wZW4gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy5mbGF0SW5zdGFuY2Uub3BlbigpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=