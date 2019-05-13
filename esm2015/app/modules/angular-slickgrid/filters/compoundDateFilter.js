/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { mapFlatpickrDateFormatWithFieldType } from '../services/utilities';
import { FieldType, OperatorType, } from './../models/index';
import Flatpickr from 'flatpickr';
require('flatpickr');
export class CompoundDateFilter {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @private
     * @return {?}
     */
    get gridOptions() {
        return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
    }
    /**
     * Getter for the Column Filter
     * @return {?}
     */
    get columnFilter() {
        return this.columnDef && this.columnDef.filter || {};
    }
    /**
     * Setter for the Filter Operator
     * @param {?} op
     * @return {?}
     */
    set operator(op) {
        this._operator = op;
    }
    /**
     * Getter for the Filter Operator
     * @return {?}
     */
    get operator() {
        return this._operator || OperatorType.empty;
    }
    /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    init(args) {
        if (args) {
            this.grid = args.grid;
            this.callback = args.callback;
            this.columnDef = args.columnDef;
            this.operator = args.operator || '';
            this.searchTerms = args.searchTerms || [];
            // date input can only have 1 search term, so we will use the 1st array index if it exist
            /** @type {?} */
            const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
            // step 1, create the DOM Element of the filter which contain the compound Operator+Input
            // and initialize it if searchTerm is filled
            this.$filterElm = this.createDomElement(searchTerm);
            // step 3, subscribe to the keyup event and run the callback when that happens
            // also add/remove "filled" class for styling purposes
            this.$filterInputElm.keyup((/**
             * @param {?} e
             * @return {?}
             */
            (e) => {
                this.onTriggerEvent(e);
            }));
            this.$selectOperatorElm.change((/**
             * @param {?} e
             * @return {?}
             */
            (e) => {
                this.onTriggerEvent(e);
            }));
        }
    }
    /**
     * Clear the filter value
     * @param {?=} shouldTriggerQuery
     * @return {?}
     */
    clear(shouldTriggerQuery = true) {
        if (this.flatInstance && this.$selectOperatorElm) {
            this._clearFilterTriggered = true;
            this._shouldTriggerQuery = shouldTriggerQuery;
            this.searchTerms = [];
            this.$selectOperatorElm.val(0);
            this.flatInstance.clear();
        }
    }
    /**
     * destroy the filter
     * @return {?}
     */
    destroy() {
        if (this.$filterElm) {
            this.$filterElm.off('keyup').remove();
        }
    }
    /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    setValues(values) {
        if (this.flatInstance && values && Array.isArray(values)) {
            this.flatInstance.setDate(values[0]);
        }
    }
    //
    // private functions
    // ------------------
    /**
     * @private
     * @param {?=} searchTerm
     * @return {?}
     */
    buildDatePickerInput(searchTerm) {
        /** @type {?} */
        const inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
        /** @type {?} */
        const outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || this.columnDef.type || FieldType.dateUtc);
        /** @type {?} */
        let currentLocale = this.translate.currentLang || 'en';
        if (currentLocale.length > 2) {
            currentLocale = currentLocale.substring(0, 2);
        }
        /** @type {?} */
        const pickerOptions = {
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
            (selectedDates, dateStr, instance) => {
                this._currentValue = dateStr;
                // when using the time picker, we can simulate a keyup event to avoid multiple backend request
                // since backend request are only executed after user start typing, changing the time should be treated the same way
                if (pickerOptions.enableTime) {
                    this.onTriggerEvent(new CustomEvent('keyup'));
                }
                else {
                    this.onTriggerEvent(undefined);
                }
            })
        };
        // add the time picker when format is UTC (Z) or has the 'h' (meaning hours)
        if (outputFormat && (outputFormat === 'Z' || outputFormat.toLowerCase().includes('h'))) {
            pickerOptions.enableTime = true;
        }
        // merge options with optional user's custom options
        /** @type {?} */
        const pickerMergedOptions = Object.assign({}, pickerOptions, this.columnFilter.filterOptions);
        /** @type {?} */
        let placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        if (this.columnFilter && this.columnFilter.placeholder) {
            placeholder = this.columnFilter.placeholder;
        }
        /** @type {?} */
        const $filterInputElm = $(`<div class="flatpickr"><input type="text" class="form-control" data-input placeholder="${placeholder}"></div>`);
        this.flatInstance = ($filterInputElm[0] && typeof $filterInputElm[0].flatpickr === 'function') ? $filterInputElm[0].flatpickr(pickerMergedOptions) : Flatpickr($filterInputElm, pickerMergedOptions);
        return $filterInputElm;
    }
    /**
     * @private
     * @return {?}
     */
    buildSelectOperatorHtmlString() {
        /** @type {?} */
        const optionValues = this.getOptionValues();
        /** @type {?} */
        let optionValueString = '';
        optionValues.forEach((/**
         * @param {?} option
         * @return {?}
         */
        (option) => {
            optionValueString += `<option value="${option.operator}" title="${option.description}">${option.operator}</option>`;
        }));
        return `<select class="form-control">${optionValueString}</select>`;
    }
    /**
     * @private
     * @return {?}
     */
    getOptionValues() {
        return [
            { operator: (/** @type {?} */ ('')), description: '' },
            { operator: (/** @type {?} */ ('=')), description: '' },
            { operator: (/** @type {?} */ ('<')), description: '' },
            { operator: (/** @type {?} */ ('<=')), description: '' },
            { operator: (/** @type {?} */ ('>')), description: '' },
            { operator: (/** @type {?} */ ('>=')), description: '' },
            { operator: (/** @type {?} */ ('<>')), description: '' }
        ];
    }
    /**
     * Create the DOM element
     * @private
     * @param {?=} searchTerm
     * @return {?}
     */
    createDomElement(searchTerm) {
        /** @type {?} */
        const fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        const $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM Select dropdown for the Operator
        this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
        this.$filterInputElm = this.buildDatePickerInput(searchTerm);
        /** @type {?} */
        const $filterContainerElm = $(`<div class="form-group search-filter filter-${fieldId}"></div>`);
        /** @type {?} */
        const $containerInputGroup = $(`<div class="input-group flatpickr"></div>`);
        /** @type {?} */
        const $operatorInputGroupAddon = $(`<div class="input-group-addon input-group-prepend operator"></div>`);
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
        $filterContainerElm.attr('id', `filter-${fieldId}`);
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
    }
    /**
     * @private
     * @param {?} locale
     * @return {?}
     */
    loadFlatpickrLocale(locale) {
        // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
        if (this.gridOptions && this.gridOptions.params && this.gridOptions.params.flapickrLocale) {
            return this.gridOptions.params.flapickrLocale;
        }
        else if (locale !== 'en') {
            /** @type {?} */
            const localeDefault = require(`flatpickr/dist/l10n/${locale}.js`).default;
            return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
        }
        return 'en';
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    onTriggerEvent(e) {
        if (this._clearFilterTriggered) {
            this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
            this.$filterElm.removeClass('filled');
        }
        else {
            /** @type {?} */
            const selectedOperator = this.$selectOperatorElm.find('option:selected').text();
            (this._currentValue) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef, searchTerms: (this._currentValue ? [this._currentValue] : null), operator: selectedOperator || '', shouldTriggerQuery: this._shouldTriggerQuery });
        }
        // reset both flags for next use
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
    }
    /**
     * @private
     * @return {?}
     */
    hide() {
        if (this.flatInstance && typeof this.flatInstance.close === 'function') {
            this.flatInstance.close();
        }
    }
    /**
     * @private
     * @return {?}
     */
    show() {
        if (this.flatInstance && typeof this.flatInstance.open === 'function') {
            this.flatInstance.open();
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG91bmREYXRlRmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL2NvbXBvdW5kRGF0ZUZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQU1MLFNBQVMsRUFHVCxZQUFZLEdBRWIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLFNBQVMsTUFBTSxXQUFXLENBQUM7QUFJbEMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBS3JCLE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUFjN0IsWUFBb0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFidkMsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLHdCQUFtQixHQUFHLElBQUksQ0FBQztJQVlnQixDQUFDOzs7Ozs7SUFHcEQsSUFBWSxXQUFXO1FBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMzRSxDQUFDOzs7OztJQUdELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDdkQsQ0FBQzs7Ozs7O0lBR0QsSUFBSSxRQUFRLENBQUMsRUFBaUM7UUFDNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFHRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQztJQUM5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QixHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBRU8sSUFBSTtRQUNWLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxLQUFLLFVBQVUsRUFBRTtZQUN0RSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxJQUFJO1FBQ1YsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO1lBQ3JFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDO0NBQ0Y7Ozs7OztJQS9QQyxtREFBc0M7Ozs7O0lBQ3RDLGlEQUFtQzs7Ozs7SUFDbkMsd0NBQXdCOzs7OztJQUN4Qiw2Q0FBNkI7Ozs7O0lBQzdCLGdEQUFnQzs7Ozs7SUFDaEMsMkNBQThCOzs7OztJQUM5Qix1Q0FBaUQ7O0lBQ2pELDBDQUFrQjs7SUFDbEIsa0NBQVU7O0lBQ1YseUNBQTBCOztJQUMxQix1Q0FBa0I7O0lBQ2xCLHNDQUF5Qjs7Ozs7SUFFYix1Q0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IG1hcEZsYXRwaWNrckRhdGVGb3JtYXRXaXRoRmllbGRUeXBlIH0gZnJvbSAnLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgQ29sdW1uRmlsdGVyLFxyXG4gIEZpbHRlcixcclxuICBGaWx0ZXJBcmd1bWVudHMsXHJcbiAgRmlsdGVyQ2FsbGJhY2ssXHJcbiAgRmllbGRUeXBlLFxyXG4gIEdyaWRPcHRpb24sXHJcbiAgT3BlcmF0b3JTdHJpbmcsXHJcbiAgT3BlcmF0b3JUeXBlLFxyXG4gIFNlYXJjaFRlcm0sXHJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgRmxhdHBpY2tyIGZyb20gJ2ZsYXRwaWNrcic7XHJcblxyXG4vLyB1c2UgRmxhdHBpY2tyIGZyb20gaW1wb3J0IG9yICdyZXF1aXJlJywgd2hpY2hldmVyIHdvcmtzIGZpcnN0XHJcbmRlY2xhcmUgZnVuY3Rpb24gcmVxdWlyZShuYW1lOiBzdHJpbmcpOiBhbnk7XHJcbnJlcXVpcmUoJ2ZsYXRwaWNrcicpO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG91bmREYXRlRmlsdGVyIGltcGxlbWVudHMgRmlsdGVyIHtcclxuICBwcml2YXRlIF9jbGVhckZpbHRlclRyaWdnZXJlZCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHRydWU7XHJcbiAgcHJpdmF0ZSAkZmlsdGVyRWxtOiBhbnk7XHJcbiAgcHJpdmF0ZSAkZmlsdGVySW5wdXRFbG06IGFueTtcclxuICBwcml2YXRlICRzZWxlY3RPcGVyYXRvckVsbTogYW55O1xyXG4gIHByaXZhdGUgX2N1cnJlbnRWYWx1ZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgX29wZXJhdG9yOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZztcclxuICBmbGF0SW5zdGFuY2U6IGFueTtcclxuICBncmlkOiBhbnk7XHJcbiAgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXTtcclxuICBjb2x1bW5EZWY6IENvbHVtbjtcclxuICBjYWxsYmFjazogRmlsdGVyQ2FsbGJhY2s7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7IH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBwcml2YXRlIGdldCBncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcclxuICAgIHJldHVybiAodGhpcy5ncmlkICYmIHRoaXMuZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDb2x1bW4gRmlsdGVyICovXHJcbiAgZ2V0IGNvbHVtbkZpbHRlcigpOiBDb2x1bW5GaWx0ZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciB8fCB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBTZXR0ZXIgZm9yIHRoZSBGaWx0ZXIgT3BlcmF0b3IgKi9cclxuICBzZXQgb3BlcmF0b3Iob3A6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nKSB7XHJcbiAgICB0aGlzLl9vcGVyYXRvciA9IG9wO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEZpbHRlciBPcGVyYXRvciAqL1xyXG4gIGdldCBvcGVyYXRvcigpOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3BlcmF0b3IgfHwgT3BlcmF0b3JUeXBlLmVtcHR5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgRmlsdGVyXHJcbiAgICovXHJcbiAgaW5pdChhcmdzOiBGaWx0ZXJBcmd1bWVudHMpIHtcclxuICAgIGlmIChhcmdzKSB7XHJcbiAgICAgIHRoaXMuZ3JpZCA9IGFyZ3MuZ3JpZDtcclxuICAgICAgdGhpcy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2s7XHJcbiAgICAgIHRoaXMuY29sdW1uRGVmID0gYXJncy5jb2x1bW5EZWY7XHJcbiAgICAgIHRoaXMub3BlcmF0b3IgPSBhcmdzLm9wZXJhdG9yIHx8ICcnO1xyXG4gICAgICB0aGlzLnNlYXJjaFRlcm1zID0gYXJncy5zZWFyY2hUZXJtcyB8fCBbXTtcclxuXHJcbiAgICAgIC8vIGRhdGUgaW5wdXQgY2FuIG9ubHkgaGF2ZSAxIHNlYXJjaCB0ZXJtLCBzbyB3ZSB3aWxsIHVzZSB0aGUgMXN0IGFycmF5IGluZGV4IGlmIGl0IGV4aXN0XHJcbiAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSAoQXJyYXkuaXNBcnJheSh0aGlzLnNlYXJjaFRlcm1zKSAmJiB0aGlzLnNlYXJjaFRlcm1zWzBdKSB8fCAnJztcclxuXHJcbiAgICAgIC8vIHN0ZXAgMSwgY3JlYXRlIHRoZSBET00gRWxlbWVudCBvZiB0aGUgZmlsdGVyIHdoaWNoIGNvbnRhaW4gdGhlIGNvbXBvdW5kIE9wZXJhdG9yK0lucHV0XHJcbiAgICAgIC8vIGFuZCBpbml0aWFsaXplIGl0IGlmIHNlYXJjaFRlcm0gaXMgZmlsbGVkXHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbSA9IHRoaXMuY3JlYXRlRG9tRWxlbWVudChzZWFyY2hUZXJtKTtcclxuXHJcbiAgICAgIC8vIHN0ZXAgMywgc3Vic2NyaWJlIHRvIHRoZSBrZXl1cCBldmVudCBhbmQgcnVuIHRoZSBjYWxsYmFjayB3aGVuIHRoYXQgaGFwcGVuc1xyXG4gICAgICAvLyBhbHNvIGFkZC9yZW1vdmUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xyXG4gICAgICB0aGlzLiRmaWx0ZXJJbnB1dEVsbS5rZXl1cCgoZTogYW55KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLmNoYW5nZSgoZTogYW55KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgZmlsdGVyIHZhbHVlXHJcbiAgICovXHJcbiAgY2xlYXIoc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZSkge1xyXG4gICAgaWYgKHRoaXMuZmxhdEluc3RhbmNlICYmIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtKSB7XHJcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gc2hvdWxkVHJpZ2dlclF1ZXJ5O1xyXG4gICAgICB0aGlzLnNlYXJjaFRlcm1zID0gW107XHJcbiAgICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLnZhbCgwKTtcclxuICAgICAgdGhpcy5mbGF0SW5zdGFuY2UuY2xlYXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGRlc3Ryb3kgdGhlIGZpbHRlclxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtKSB7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5vZmYoJ2tleXVwJykucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdmFsdWUocykgb24gdGhlIERPTSBlbGVtZW50XHJcbiAgICovXHJcbiAgc2V0VmFsdWVzKHZhbHVlczogU2VhcmNoVGVybVtdKSB7XHJcbiAgICBpZiAodGhpcy5mbGF0SW5zdGFuY2UgJiYgdmFsdWVzICYmIEFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xyXG4gICAgICB0aGlzLmZsYXRJbnN0YW5jZS5zZXREYXRlKHZhbHVlc1swXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL1xyXG4gIC8vIHByaXZhdGUgZnVuY3Rpb25zXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgcHJpdmF0ZSBidWlsZERhdGVQaWNrZXJJbnB1dChzZWFyY2hUZXJtPzogU2VhcmNoVGVybSkge1xyXG4gICAgY29uc3QgaW5wdXRGb3JtYXQgPSBtYXBGbGF0cGlja3JEYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSh0aGlzLmNvbHVtbkRlZi50eXBlIHx8IEZpZWxkVHlwZS5kYXRlSXNvKTtcclxuICAgIGNvbnN0IG91dHB1dEZvcm1hdCA9IG1hcEZsYXRwaWNrckRhdGVGb3JtYXRXaXRoRmllbGRUeXBlKHRoaXMuY29sdW1uRGVmLm91dHB1dFR5cGUgfHwgdGhpcy5jb2x1bW5EZWYudHlwZSB8fCBGaWVsZFR5cGUuZGF0ZVV0Yyk7XHJcbiAgICBsZXQgY3VycmVudExvY2FsZSA9IHRoaXMudHJhbnNsYXRlLmN1cnJlbnRMYW5nIHx8ICdlbic7XHJcbiAgICBpZiAoY3VycmVudExvY2FsZS5sZW5ndGggPiAyKSB7XHJcbiAgICAgIGN1cnJlbnRMb2NhbGUgPSBjdXJyZW50TG9jYWxlLnN1YnN0cmluZygwLCAyKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwaWNrZXJPcHRpb25zOiBhbnkgPSB7XHJcbiAgICAgIGRlZmF1bHREYXRlOiBzZWFyY2hUZXJtIHx8ICcnLFxyXG4gICAgICBhbHRJbnB1dDogdHJ1ZSxcclxuICAgICAgYWx0Rm9ybWF0OiBvdXRwdXRGb3JtYXQsXHJcbiAgICAgIGRhdGVGb3JtYXQ6IGlucHV0Rm9ybWF0LFxyXG4gICAgICB3cmFwOiB0cnVlLFxyXG4gICAgICBjbG9zZU9uU2VsZWN0OiB0cnVlLFxyXG4gICAgICBsb2NhbGU6IChjdXJyZW50TG9jYWxlICE9PSAnZW4nKSA/IHRoaXMubG9hZEZsYXRwaWNrckxvY2FsZShjdXJyZW50TG9jYWxlKSA6ICdlbicsXHJcbiAgICAgIG9uQ2hhbmdlOiAoc2VsZWN0ZWREYXRlczogYW55W10gfCBhbnksIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IGFueSkgPT4ge1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRWYWx1ZSA9IGRhdGVTdHI7XHJcblxyXG4gICAgICAgIC8vIHdoZW4gdXNpbmcgdGhlIHRpbWUgcGlja2VyLCB3ZSBjYW4gc2ltdWxhdGUgYSBrZXl1cCBldmVudCB0byBhdm9pZCBtdWx0aXBsZSBiYWNrZW5kIHJlcXVlc3RcclxuICAgICAgICAvLyBzaW5jZSBiYWNrZW5kIHJlcXVlc3QgYXJlIG9ubHkgZXhlY3V0ZWQgYWZ0ZXIgdXNlciBzdGFydCB0eXBpbmcsIGNoYW5naW5nIHRoZSB0aW1lIHNob3VsZCBiZSB0cmVhdGVkIHRoZSBzYW1lIHdheVxyXG4gICAgICAgIGlmIChwaWNrZXJPcHRpb25zLmVuYWJsZVRpbWUpIHtcclxuICAgICAgICAgIHRoaXMub25UcmlnZ2VyRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdrZXl1cCcpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5vblRyaWdnZXJFdmVudCh1bmRlZmluZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLy8gYWRkIHRoZSB0aW1lIHBpY2tlciB3aGVuIGZvcm1hdCBpcyBVVEMgKFopIG9yIGhhcyB0aGUgJ2gnIChtZWFuaW5nIGhvdXJzKVxyXG4gICAgaWYgKG91dHB1dEZvcm1hdCAmJiAob3V0cHV0Rm9ybWF0ID09PSAnWicgfHwgb3V0cHV0Rm9ybWF0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2gnKSkpIHtcclxuICAgICAgcGlja2VyT3B0aW9ucy5lbmFibGVUaW1lID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtZXJnZSBvcHRpb25zIHdpdGggb3B0aW9uYWwgdXNlcidzIGN1c3RvbSBvcHRpb25zXHJcbiAgICBjb25zdCBwaWNrZXJNZXJnZWRPcHRpb25zID0geyAuLi5waWNrZXJPcHRpb25zLCAuLi50aGlzLmNvbHVtbkZpbHRlci5maWx0ZXJPcHRpb25zIH07XHJcblxyXG4gICAgbGV0IHBsYWNlaG9sZGVyID0gKHRoaXMuZ3JpZE9wdGlvbnMpID8gKHRoaXMuZ3JpZE9wdGlvbnMuZGVmYXVsdEZpbHRlclBsYWNlaG9sZGVyIHx8ICcnKSA6ICcnO1xyXG4gICAgaWYgKHRoaXMuY29sdW1uRmlsdGVyICYmIHRoaXMuY29sdW1uRmlsdGVyLnBsYWNlaG9sZGVyKSB7XHJcbiAgICAgIHBsYWNlaG9sZGVyID0gdGhpcy5jb2x1bW5GaWx0ZXIucGxhY2Vob2xkZXI7XHJcbiAgICB9XHJcbiAgICBjb25zdCAkZmlsdGVySW5wdXRFbG06IGFueSA9ICQoYDxkaXYgY2xhc3M9XCJmbGF0cGlja3JcIj48aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGRhdGEtaW5wdXQgcGxhY2Vob2xkZXI9XCIke3BsYWNlaG9sZGVyfVwiPjwvZGl2PmApO1xyXG4gICAgdGhpcy5mbGF0SW5zdGFuY2UgPSAoJGZpbHRlcklucHV0RWxtWzBdICYmIHR5cGVvZiAkZmlsdGVySW5wdXRFbG1bMF0uZmxhdHBpY2tyID09PSAnZnVuY3Rpb24nKSA/ICRmaWx0ZXJJbnB1dEVsbVswXS5mbGF0cGlja3IocGlja2VyTWVyZ2VkT3B0aW9ucykgOiBGbGF0cGlja3IoJGZpbHRlcklucHV0RWxtLCBwaWNrZXJNZXJnZWRPcHRpb25zKTtcclxuICAgIHJldHVybiAkZmlsdGVySW5wdXRFbG07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJ1aWxkU2VsZWN0T3BlcmF0b3JIdG1sU3RyaW5nKCkge1xyXG4gICAgY29uc3Qgb3B0aW9uVmFsdWVzID0gdGhpcy5nZXRPcHRpb25WYWx1ZXMoKTtcclxuICAgIGxldCBvcHRpb25WYWx1ZVN0cmluZyA9ICcnO1xyXG4gICAgb3B0aW9uVmFsdWVzLmZvckVhY2goKG9wdGlvbikgPT4ge1xyXG4gICAgICBvcHRpb25WYWx1ZVN0cmluZyArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9uLm9wZXJhdG9yfVwiIHRpdGxlPVwiJHtvcHRpb24uZGVzY3JpcHRpb259XCI+JHtvcHRpb24ub3BlcmF0b3J9PC9vcHRpb24+YDtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiPiR7b3B0aW9uVmFsdWVTdHJpbmd9PC9zZWxlY3Q+YDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0T3B0aW9uVmFsdWVzKCk6IHsgb3BlcmF0b3I6IE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nIH1bXSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7IG9wZXJhdG9yOiAnJyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXHJcbiAgICAgIHsgb3BlcmF0b3I6ICc9JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXHJcbiAgICAgIHsgb3BlcmF0b3I6ICc8JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXHJcbiAgICAgIHsgb3BlcmF0b3I6ICc8PScgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxyXG4gICAgICB7IG9wZXJhdG9yOiAnPicgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxyXG4gICAgICB7IG9wZXJhdG9yOiAnPj0nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcclxuICAgICAgeyBvcGVyYXRvcjogJzw+JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH1cclxuICAgIF07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdGhlIERPTSBlbGVtZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVEb21FbGVtZW50KHNlYXJjaFRlcm0/OiBTZWFyY2hUZXJtKSB7XHJcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XHJcbiAgICBjb25zdCAkaGVhZGVyRWxtID0gdGhpcy5ncmlkLmdldEhlYWRlclJvd0NvbHVtbihmaWVsZElkKTtcclxuICAgICQoJGhlYWRlckVsbSkuZW1wdHkoKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgdGhlIERPTSBTZWxlY3QgZHJvcGRvd24gZm9yIHRoZSBPcGVyYXRvclxyXG4gICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0gPSAkKHRoaXMuYnVpbGRTZWxlY3RPcGVyYXRvckh0bWxTdHJpbmcoKSk7XHJcbiAgICB0aGlzLiRmaWx0ZXJJbnB1dEVsbSA9IHRoaXMuYnVpbGREYXRlUGlja2VySW5wdXQoc2VhcmNoVGVybSk7XHJcbiAgICBjb25zdCAkZmlsdGVyQ29udGFpbmVyRWxtID0gJChgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgc2VhcmNoLWZpbHRlciBmaWx0ZXItJHtmaWVsZElkfVwiPjwvZGl2PmApO1xyXG4gICAgY29uc3QgJGNvbnRhaW5lcklucHV0R3JvdXAgPSAkKGA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgZmxhdHBpY2tyXCI+PC9kaXY+YCk7XHJcbiAgICBjb25zdCAkb3BlcmF0b3JJbnB1dEdyb3VwQWRkb24gPSAkKGA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaW5wdXQtZ3JvdXAtcHJlcGVuZCBvcGVyYXRvclwiPjwvZGl2PmApO1xyXG5cclxuICAgIC8qIHRoZSBET00gZWxlbWVudCBmaW5hbCBzdHJ1Y3R1cmUgd2lsbCBiZVxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaW5wdXQtZ3JvdXAtcHJlcGVuZCBvcGVyYXRvclwiPlxyXG4gICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiPjwvc2VsZWN0PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9ZmxhdHBpY2tyPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBkYXRhLWlucHV0PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICovXHJcbiAgICAkb3BlcmF0b3JJbnB1dEdyb3VwQWRkb24uYXBwZW5kKHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtKTtcclxuICAgICRjb250YWluZXJJbnB1dEdyb3VwLmFwcGVuZCgkb3BlcmF0b3JJbnB1dEdyb3VwQWRkb24pO1xyXG4gICAgJGNvbnRhaW5lcklucHV0R3JvdXAuYXBwZW5kKHRoaXMuJGZpbHRlcklucHV0RWxtKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgdGhlIERPTSBlbGVtZW50ICYgYWRkIGFuIElEIGFuZCBmaWx0ZXIgY2xhc3NcclxuICAgICRmaWx0ZXJDb250YWluZXJFbG0uYXBwZW5kKCRjb250YWluZXJJbnB1dEdyb3VwKTtcclxuICAgICRmaWx0ZXJDb250YWluZXJFbG0uYXR0cignaWQnLCBgZmlsdGVyLSR7ZmllbGRJZH1gKTtcclxuICAgIHRoaXMuJGZpbHRlcklucHV0RWxtLmRhdGEoJ2NvbHVtbklkJywgZmllbGRJZCk7XHJcblxyXG4gICAgaWYgKHRoaXMub3BlcmF0b3IpIHtcclxuICAgICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0udmFsKHRoaXMub3BlcmF0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIHRoZXJlJ3MgYSBzZWFyY2ggdGVybSwgd2Ugd2lsbCBhZGQgdGhlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcclxuICAgIGlmIChzZWFyY2hUZXJtKSB7XHJcbiAgICAgICRmaWx0ZXJDb250YWluZXJFbG0uYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgICB0aGlzLl9jdXJyZW50VmFsdWUgPSBzZWFyY2hUZXJtIGFzIHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICAvLyBhcHBlbmQgdGhlIG5ldyBET00gZWxlbWVudCB0byB0aGUgaGVhZGVyIHJvd1xyXG4gICAgaWYgKCRmaWx0ZXJDb250YWluZXJFbG0gJiYgdHlwZW9mICRmaWx0ZXJDb250YWluZXJFbG0uYXBwZW5kVG8gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgJGZpbHRlckNvbnRhaW5lckVsbS5hcHBlbmRUbygkaGVhZGVyRWxtKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJGZpbHRlckNvbnRhaW5lckVsbTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbG9hZEZsYXRwaWNrckxvY2FsZShsb2NhbGU6IHN0cmluZykge1xyXG4gICAgLy8gY2hhbmdlIGxvY2FsZSBpZiBuZWVkZWQsIEZsYXRwaWNrciByZWZlcmVuY2U6IGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9sb2NhbGl6YXRpb24vXHJcbiAgICBpZiAodGhpcy5ncmlkT3B0aW9ucyAmJiB0aGlzLmdyaWRPcHRpb25zLnBhcmFtcyAmJiB0aGlzLmdyaWRPcHRpb25zLnBhcmFtcy5mbGFwaWNrckxvY2FsZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5ncmlkT3B0aW9ucy5wYXJhbXMuZmxhcGlja3JMb2NhbGU7XHJcbiAgICB9IGVsc2UgaWYgKGxvY2FsZSAhPT0gJ2VuJykge1xyXG4gICAgICBjb25zdCBsb2NhbGVEZWZhdWx0OiBhbnkgPSByZXF1aXJlKGBmbGF0cGlja3IvZGlzdC9sMTBuLyR7bG9jYWxlfS5qc2ApLmRlZmF1bHQ7XHJcbiAgICAgIHJldHVybiAobG9jYWxlRGVmYXVsdCAmJiBsb2NhbGVEZWZhdWx0W2xvY2FsZV0pID8gbG9jYWxlRGVmYXVsdFtsb2NhbGVdIDogJ2VuJztcclxuICAgIH1cclxuICAgIHJldHVybiAnZW4nO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblRyaWdnZXJFdmVudChlOiBFdmVudCB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkKSB7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBjbGVhckZpbHRlclRyaWdnZXJlZDogdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQsIHNob3VsZFRyaWdnZXJRdWVyeTogdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5IH0pO1xyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWRPcGVyYXRvciA9IHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLnRleHQoKTtcclxuICAgICAgKHRoaXMuX2N1cnJlbnRWYWx1ZSkgPyB0aGlzLiRmaWx0ZXJFbG0uYWRkQ2xhc3MoJ2ZpbGxlZCcpIDogdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcclxuICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIHNlYXJjaFRlcm1zOiAodGhpcy5fY3VycmVudFZhbHVlID8gW3RoaXMuX2N1cnJlbnRWYWx1ZV0gOiBudWxsKSwgb3BlcmF0b3I6IHNlbGVjdGVkT3BlcmF0b3IgfHwgJycsIHNob3VsZFRyaWdnZXJRdWVyeTogdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5IH0pO1xyXG4gICAgfVxyXG4gICAgLy8gcmVzZXQgYm90aCBmbGFncyBmb3IgbmV4dCB1c2VcclxuICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XHJcbiAgICB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoaWRlKCkge1xyXG4gICAgaWYgKHRoaXMuZmxhdEluc3RhbmNlICYmIHR5cGVvZiB0aGlzLmZsYXRJbnN0YW5jZS5jbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLmZsYXRJbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzaG93KCkge1xyXG4gICAgaWYgKHRoaXMuZmxhdEluc3RhbmNlICYmIHR5cGVvZiB0aGlzLmZsYXRJbnN0YW5jZS5vcGVuID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuZmxhdEluc3RhbmNlLm9wZW4oKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19