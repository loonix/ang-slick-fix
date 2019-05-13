/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FieldType } from './../models/index';
import { OperatorType, } from './../models/index';
export class CompoundInputFilter {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
        this._inputType = 'text';
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
     * Getter of input type (text, number, password)
     * @return {?}
     */
    get inputType() {
        return this._inputType;
    }
    /**
     * Setter of input type (text, number, password)
     * @param {?} type
     * @return {?}
     */
    set inputType(type) {
        this._inputType = type;
    }
    /**
     * Getter of the Operator to use when doing the filter comparing
     * @return {?}
     */
    get operator() {
        return this._operator || OperatorType.empty;
    }
    /**
     * Getter of the Operator to use when doing the filter comparing
     * @param {?} op
     * @return {?}
     */
    set operator(op) {
        this._operator = op;
    }
    /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    init(args) {
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.operator = args.operator;
        this.searchTerms = args.searchTerms || [];
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        /** @type {?} */
        const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        // step 1, create the DOM Element of the filter which contain the compound Operator+Input
        // and initialize it if searchTerms is filled
        this.$filterElm = this.createDomElement(searchTerm);
        // step 3, subscribe to the keyup event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterInputElm.on('keyup input change', (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.onTriggerEvent(e);
        }));
        this.$selectOperatorElm.on('change', (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.onTriggerEvent(e);
        }));
    }
    /**
     * Clear the filter value
     * @param {?=} shouldTriggerQuery
     * @return {?}
     */
    clear(shouldTriggerQuery = true) {
        if (this.$filterElm && this.$selectOperatorElm) {
            this._clearFilterTriggered = true;
            this._shouldTriggerQuery = shouldTriggerQuery;
            this.searchTerms = [];
            this.$selectOperatorElm.val(0);
            this.$filterInputElm.val('');
            this.onTriggerEvent(null);
        }
    }
    /**
     * destroy the filter
     * @return {?}
     */
    destroy() {
        if (this.$filterElm && this.$selectOperatorElm) {
            this.$filterElm.off('keyup input change').remove();
            this.$selectOperatorElm.off('change');
        }
    }
    /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    setValues(values) {
        if (values && Array.isArray(values)) {
            this.$filterElm.val(values[0]);
        }
    }
    //
    // private functions
    // ------------------
    /**
     * @private
     * @return {?}
     */
    buildInputHtmlString() {
        /** @type {?} */
        let placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        if (this.columnFilter && this.columnFilter.placeholder) {
            placeholder = this.columnFilter.placeholder;
        }
        return `<input type="${this._inputType || 'text'}" role="presentation"  autocomplete="off" class="form-control" placeholder="${placeholder}" /><span></span>`;
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
        /** @type {?} */
        const type = (this.columnDef.type && this.columnDef.type) ? this.columnDef.type : FieldType.string;
        /** @type {?} */
        let optionValues = [];
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
        this.$filterInputElm = $(this.buildInputHtmlString());
        /** @type {?} */
        const $filterContainerElm = $(`<div class="form-group search-filter filter-${fieldId}"></div>`);
        /** @type {?} */
        const $containerInputGroup = $(`<div class="input-group"></div>`);
        /** @type {?} */
        const $operatorInputGroupAddon = $(`<div class="input-group-addon input-group-prepend operator"></div>`);
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
        $filterContainerElm.attr('id', `filter-${fieldId}`);
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
            /** @type {?} */
            let value = this.$filterInputElm.val();
            /** @type {?} */
            const enableWhiteSpaceTrim = this.gridOptions.enableFilterTrimWhiteSpace || this.columnFilter.enableTrimWhiteSpace;
            if (typeof value === 'string' && enableWhiteSpaceTrim) {
                value = value.trim();
            }
            (value !== null && value !== undefined && value !== '') ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef, searchTerms: (value ? [value] : null), operator: selectedOperator || '', shouldTriggerQuery: this._shouldTriggerQuery });
        }
        // reset both flags for next use
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG91bmRJbnB1dEZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZmlsdGVycy9jb21wb3VuZElucHV0RmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQVFMLFlBQVksR0FFYixNQUFNLG1CQUFtQixDQUFDO0FBSzNCLE1BQU0sT0FBTyxtQkFBbUI7Ozs7SUFhOUIsWUFBc0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFaekMsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQUMzQixlQUFVLEdBQUcsTUFBTSxDQUFDO0lBVXlCLENBQUM7Ozs7OztJQUd0RCxJQUFZLFdBQVc7UUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzNFLENBQUM7Ozs7O0lBR0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUN2RCxDQUFDOzs7OztJQUdELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDOzs7Ozs7SUFHRCxJQUFJLFNBQVMsQ0FBQyxJQUFZO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBR0QsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLFlBQVksQ0FBQyxL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QyxRQUFRLENBQUMsQ0FBQztZQUNySSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixJQUFJLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1NBQ3hLO1FBQ0QsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztJQUNsQyxDQUFDO0NBQ0Y7Ozs7OztJQXBPQyxvREFBc0M7Ozs7O0lBQ3RDLGtEQUFtQzs7Ozs7SUFDbkMseUNBQTRCOzs7OztJQUM1Qix5Q0FBd0I7Ozs7O0lBQ3hCLDhDQUE2Qjs7Ozs7SUFDN0IsaURBQWdDOzs7OztJQUNoQyx3Q0FBaUQ7O0lBQ2pELG1DQUFVOztJQUNWLDBDQUEwQjs7SUFDMUIsd0NBQWtCOztJQUNsQix1Q0FBeUI7Ozs7O0lBRWIsd0NBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRUeXBlIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHtcbiAgQ29sdW1uLFxuICBDb2x1bW5GaWx0ZXIsXG4gIEZpbHRlcixcbiAgRmlsdGVyQXJndW1lbnRzLFxuICBGaWx0ZXJDYWxsYmFjayxcbiAgR3JpZE9wdGlvbixcbiAgT3BlcmF0b3JTdHJpbmcsXG4gIE9wZXJhdG9yVHlwZSxcbiAgU2VhcmNoVGVybSxcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5cbmV4cG9ydCBjbGFzcyBDb21wb3VuZElucHV0RmlsdGVyIGltcGxlbWVudHMgRmlsdGVyIHtcbiAgcHJpdmF0ZSBfY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZTtcbiAgcHJpdmF0ZSBfaW5wdXRUeXBlID0gJ3RleHQnO1xuICBwcml2YXRlICRmaWx0ZXJFbG06IGFueTtcbiAgcHJpdmF0ZSAkZmlsdGVySW5wdXRFbG06IGFueTtcbiAgcHJpdmF0ZSAkc2VsZWN0T3BlcmF0b3JFbG06IGFueTtcbiAgcHJpdmF0ZSBfb3BlcmF0b3I6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nO1xuICBncmlkOiBhbnk7XG4gIHNlYXJjaFRlcm1zOiBTZWFyY2hUZXJtW107XG4gIGNvbHVtbkRlZjogQ29sdW1uO1xuICBjYWxsYmFjazogRmlsdGVyQ2FsbGJhY2s7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkgeyB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cbiAgcHJpdmF0ZSBnZXQgZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XG4gICAgcmV0dXJuICh0aGlzLmdyaWQgJiYgdGhpcy5ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xuICB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIENvbHVtbiBGaWx0ZXIgKi9cbiAgZ2V0IGNvbHVtbkZpbHRlcigpOiBDb2x1bW5GaWx0ZXIge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgfHwge307XG4gIH1cblxuICAvKiogR2V0dGVyIG9mIGlucHV0IHR5cGUgKHRleHQsIG51bWJlciwgcGFzc3dvcmQpICovXG4gIGdldCBpbnB1dFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lucHV0VHlwZTtcbiAgfVxuXG4gIC8qKiBTZXR0ZXIgb2YgaW5wdXQgdHlwZSAodGV4dCwgbnVtYmVyLCBwYXNzd29yZCkgKi9cbiAgc2V0IGlucHV0VHlwZSh0eXBlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9pbnB1dFR5cGUgPSB0eXBlO1xuICB9XG5cbiAgLyoqIEdldHRlciBvZiB0aGUgT3BlcmF0b3IgdG8gdXNlIHdoZW4gZG9pbmcgdGhlIGZpbHRlciBjb21wYXJpbmcgKi9cbiAgZ2V0IG9wZXJhdG9yKCk6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fb3BlcmF0b3IgfHwgT3BlcmF0b3JUeXBlLmVtcHR5O1xuICB9XG5cbiAgLyoqIEdldHRlciBvZiB0aGUgT3BlcmF0b3IgdG8gdXNlIHdoZW4gZG9pbmcgdGhlIGZpbHRlciBjb21wYXJpbmcgKi9cbiAgc2V0IG9wZXJhdG9yKG9wOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZykge1xuICAgIHRoaXMuX29wZXJhdG9yID0gb3A7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgRmlsdGVyXG4gICAqL1xuICBpbml0KGFyZ3M6IEZpbHRlckFyZ3VtZW50cykge1xuICAgIHRoaXMuZ3JpZCA9IGFyZ3MuZ3JpZDtcbiAgICB0aGlzLmNhbGxiYWNrID0gYXJncy5jYWxsYmFjaztcbiAgICB0aGlzLmNvbHVtbkRlZiA9IGFyZ3MuY29sdW1uRGVmO1xuICAgIHRoaXMub3BlcmF0b3IgPSBhcmdzLm9wZXJhdG9yO1xuICAgIHRoaXMuc2VhcmNoVGVybXMgPSBhcmdzLnNlYXJjaFRlcm1zIHx8IFtdO1xuXG4gICAgLy8gZmlsdGVyIGlucHV0IGNhbiBvbmx5IGhhdmUgMSBzZWFyY2ggdGVybSwgc28gd2Ugd2lsbCB1c2UgdGhlIDFzdCBhcnJheSBpbmRleCBpZiBpdCBleGlzdFxuICAgIGNvbnN0IHNlYXJjaFRlcm0gPSAoQXJyYXkuaXNBcnJheSh0aGlzLnNlYXJjaFRlcm1zKSAmJiB0aGlzLnNlYXJjaFRlcm1zWzBdKSB8fCAnJztcblxuICAgIC8vIHN0ZXAgMSwgY3JlYXRlIHRoZSBET00gRWxlbWVudCBvZiB0aGUgZmlsdGVyIHdoaWNoIGNvbnRhaW4gdGhlIGNvbXBvdW5kIE9wZXJhdG9yK0lucHV0XG4gICAgLy8gYW5kIGluaXRpYWxpemUgaXQgaWYgc2VhcmNoVGVybXMgaXMgZmlsbGVkXG4gICAgdGhpcy4kZmlsdGVyRWxtID0gdGhpcy5jcmVhdGVEb21FbGVtZW50KHNlYXJjaFRlcm0pO1xuXG4gICAgLy8gc3RlcCAzLCBzdWJzY3JpYmUgdG8gdGhlIGtleXVwIGV2ZW50IGFuZCBydW4gdGhlIGNhbGxiYWNrIHdoZW4gdGhhdCBoYXBwZW5zXG4gICAgLy8gYWxzbyBhZGQvcmVtb3ZlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcbiAgICB0aGlzLiRmaWx0ZXJJbnB1dEVsbS5vbigna2V5dXAgaW5wdXQgY2hhbmdlJywgKGU6IGFueSkgPT4ge1xuICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChlKTtcbiAgICB9KTtcbiAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS5vbignY2hhbmdlJywgKGU6IGFueSkgPT4ge1xuICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgZmlsdGVyIHZhbHVlXG4gICAqL1xuICBjbGVhcihzaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlKSB7XG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSAmJiB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbSkge1xuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gc2hvdWxkVHJpZ2dlclF1ZXJ5O1xuICAgICAgdGhpcy5zZWFyY2hUZXJtcyA9IFtdO1xuICAgICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0udmFsKDApO1xuICAgICAgdGhpcy4kZmlsdGVySW5wdXRFbG0udmFsKCcnKTtcbiAgICAgIHRoaXMub25UcmlnZ2VyRXZlbnQobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRlc3Ryb3kgdGhlIGZpbHRlclxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtICYmIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtKSB7XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ub2ZmKCdrZXl1cCBpbnB1dCBjaGFuZ2UnKS5yZW1vdmUoKTtcbiAgICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLm9mZignY2hhbmdlJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB2YWx1ZShzKSBvbiB0aGUgRE9NIGVsZW1lbnRcbiAgICovXG4gIHNldFZhbHVlcyh2YWx1ZXM6IFNlYXJjaFRlcm1bXSkge1xuICAgIGlmICh2YWx1ZXMgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0udmFsKHZhbHVlc1swXSk7XG4gICAgfVxuICB9XG5cbiAgLy9cbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgcHJpdmF0ZSBidWlsZElucHV0SHRtbFN0cmluZygpIHtcbiAgICBsZXQgcGxhY2Vob2xkZXIgPSAodGhpcy5ncmlkT3B0aW9ucykgPyAodGhpcy5ncmlkT3B0aW9ucy5kZWZhdWx0RmlsdGVyUGxhY2Vob2xkZXIgfHwgJycpIDogJyc7XG4gICAgaWYgKHRoaXMuY29sdW1uRmlsdGVyICYmIHRoaXMuY29sdW1uRmlsdGVyLnBsYWNlaG9sZGVyKSB7XG4gICAgICBwbGFjZWhvbGRlciA9IHRoaXMuY29sdW1uRmlsdGVyLnBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICByZXR1cm4gYDxpbnB1dCB0eXBlPVwiJHt0aGlzLl9pbnB1dFR5cGUgfHwgJ3RleHQnfVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIiAgYXV0b2NvbXBsZXRlPVwib2ZmXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIiR7cGxhY2Vob2xkZXJ9XCIgLz48c3Bhbj48L3NwYW4+YDtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRTZWxlY3RPcGVyYXRvckh0bWxTdHJpbmcoKSB7XG4gICAgY29uc3Qgb3B0aW9uVmFsdWVzID0gdGhpcy5nZXRPcHRpb25WYWx1ZXMoKTtcbiAgICBsZXQgb3B0aW9uVmFsdWVTdHJpbmcgPSAnJztcbiAgICBvcHRpb25WYWx1ZXMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICBvcHRpb25WYWx1ZVN0cmluZyArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9uLm9wZXJhdG9yfVwiIHRpdGxlPVwiJHtvcHRpb24uZGVzY3JpcHRpb259XCI+JHtvcHRpb24ub3BlcmF0b3J9PC9vcHRpb24+YDtcbiAgICB9KTtcblxuICAgIHJldHVybiBgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiPiR7b3B0aW9uVmFsdWVTdHJpbmd9PC9zZWxlY3Q+YDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3B0aW9uVmFsdWVzKCk6IHsgb3BlcmF0b3I6IE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nIH1bXSB7XG4gICAgY29uc3QgdHlwZSA9ICh0aGlzLmNvbHVtbkRlZi50eXBlICYmIHRoaXMuY29sdW1uRGVmLnR5cGUpID8gdGhpcy5jb2x1bW5EZWYudHlwZSA6IEZpZWxkVHlwZS5zdHJpbmc7XG4gICAgbGV0IG9wdGlvblZhbHVlcyA9IFtdO1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIEZpZWxkVHlwZS5zdHJpbmc6XG4gICAgICAgIG9wdGlvblZhbHVlcyA9IFtcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnJyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0NPTlRBSU5TJykgfSxcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnPScgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdFUVVBTFMnKSB9LFxuICAgICAgICAgIHsgb3BlcmF0b3I6ICdhKicgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdTVEFSVFNfV0lUSCcpIH0sXG4gICAgICAgICAgeyBvcGVyYXRvcjogJyp6JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0VORFNfV0lUSCcpIH0sXG4gICAgICAgICAgLypcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnSU4nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnSU5fQ09MTEVDVElPTl9TRVBFUkFURURfQllfQ09NTUEnKSB9LFxuICAgICAgICAgIHsgb3BlcmF0b3I6ICdOSU4nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnTk9UX0lOX0NPTExFQ1RJT05fU0VQRVJBVEVEX0JZX0NPTU1BJykgfSxcbiAgICAgICAgICAqL1xuICAgICAgICBdO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG9wdGlvblZhbHVlcyA9IFtcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnJyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0NPTlRBSU5TJykgfSxcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnPScgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxuICAgICAgICAgIHsgb3BlcmF0b3I6ICc8JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXG4gICAgICAgICAgeyBvcGVyYXRvcjogJzw9JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXG4gICAgICAgICAgeyBvcGVyYXRvcjogJz4nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnPj0nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnPD4nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfV07XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25WYWx1ZXM7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIHRoZSBET00gZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVEb21FbGVtZW50KHNlYXJjaFRlcm0/OiBTZWFyY2hUZXJtKSB7XG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xuICAgIGNvbnN0ICRoZWFkZXJFbG0gPSB0aGlzLmdyaWQuZ2V0SGVhZGVyUm93Q29sdW1uKGZpZWxkSWQpO1xuICAgICQoJGhlYWRlckVsbSkuZW1wdHkoKTtcblxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIFNlbGVjdCBkcm9wZG93biBmb3IgdGhlIE9wZXJhdG9yXG4gICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0gPSAkKHRoaXMuYnVpbGRTZWxlY3RPcGVyYXRvckh0bWxTdHJpbmcoKSk7XG4gICAgdGhpcy4kZmlsdGVySW5wdXRFbG0gPSAkKHRoaXMuYnVpbGRJbnB1dEh0bWxTdHJpbmcoKSk7XG4gICAgY29uc3QgJGZpbHRlckNvbnRhaW5lckVsbSA9ICQoYDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHNlYXJjaC1maWx0ZXIgZmlsdGVyLSR7ZmllbGRJZH1cIj48L2Rpdj5gKTtcbiAgICBjb25zdCAkY29udGFpbmVySW5wdXRHcm91cCA9ICQoYDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPjwvZGl2PmApO1xuICAgIGNvbnN0ICRvcGVyYXRvcklucHV0R3JvdXBBZGRvbiA9ICQoYDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpbnB1dC1ncm91cC1wcmVwZW5kIG9wZXJhdG9yXCI+PC9kaXY+YCk7XG5cbiAgICAvKiB0aGUgRE9NIGVsZW1lbnQgZmluYWwgc3RydWN0dXJlIHdpbGwgYmVcbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaW5wdXQtZ3JvdXAtcHJlcGVuZCBvcGVyYXRvclwiPlxuICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj48L3NlbGVjdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgIDwvZGl2PlxuICAgICovXG4gICAgJG9wZXJhdG9ySW5wdXRHcm91cEFkZG9uLmFwcGVuZCh0aGlzLiRzZWxlY3RPcGVyYXRvckVsbSk7XG4gICAgJGNvbnRhaW5lcklucHV0R3JvdXAuYXBwZW5kKCRvcGVyYXRvcklucHV0R3JvdXBBZGRvbik7XG4gICAgJGNvbnRhaW5lcklucHV0R3JvdXAuYXBwZW5kKHRoaXMuJGZpbHRlcklucHV0RWxtKTtcblxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIGVsZW1lbnQgJiBhZGQgYW4gSUQgYW5kIGZpbHRlciBjbGFzc1xuICAgICRmaWx0ZXJDb250YWluZXJFbG0uYXBwZW5kKCRjb250YWluZXJJbnB1dEdyb3VwKTtcbiAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmF0dHIoJ2lkJywgYGZpbHRlci0ke2ZpZWxkSWR9YCk7XG5cbiAgICB0aGlzLiRmaWx0ZXJJbnB1dEVsbS52YWwoc2VhcmNoVGVybSk7XG4gICAgdGhpcy4kZmlsdGVySW5wdXRFbG0uZGF0YSgnY29sdW1uSWQnLCBmaWVsZElkKTtcblxuICAgIGlmICh0aGlzLm9wZXJhdG9yKSB7XG4gICAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS52YWwodGhpcy5vcGVyYXRvcik7XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlcmUncyBhIHNlYXJjaCB0ZXJtLCB3ZSB3aWxsIGFkZCB0aGUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xuICAgIGlmIChzZWFyY2hUZXJtKSB7XG4gICAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKTtcbiAgICB9XG5cbiAgICAvLyBhcHBlbmQgdGhlIG5ldyBET00gZWxlbWVudCB0byB0aGUgaGVhZGVyIHJvd1xuICAgIGlmICgkZmlsdGVyQ29udGFpbmVyRWxtICYmIHR5cGVvZiAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZFRvID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZFRvKCRoZWFkZXJFbG0pO1xuICAgIH1cblxuICAgIHJldHVybiAkZmlsdGVyQ29udGFpbmVyRWxtO1xuICB9XG5cbiAgcHJpdmF0ZSBvblRyaWdnZXJFdmVudChlOiBFdmVudCB8IHVuZGVmaW5lZCkge1xuICAgIGlmICh0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCkge1xuICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCwgc2hvdWxkVHJpZ2dlclF1ZXJ5OiB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgfSk7XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzZWxlY3RlZE9wZXJhdG9yID0gdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0uZmluZCgnb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpO1xuICAgICAgbGV0IHZhbHVlID0gdGhpcy4kZmlsdGVySW5wdXRFbG0udmFsKCk7XG4gICAgICBjb25zdCBlbmFibGVXaGl0ZVNwYWNlVHJpbSA9IHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlRmlsdGVyVHJpbVdoaXRlU3BhY2UgfHwgdGhpcy5jb2x1bW5GaWx0ZXIuZW5hYmxlVHJpbVdoaXRlU3BhY2U7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiBlbmFibGVXaGl0ZVNwYWNlVHJpbSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcbiAgICAgIH1cblxuICAgICAgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09ICcnKSA/IHRoaXMuJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJykgOiB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xuICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIHNlYXJjaFRlcm1zOiAodmFsdWUgPyBbdmFsdWVdIDogbnVsbCksIG9wZXJhdG9yOiBzZWxlY3RlZE9wZXJhdG9yIHx8ICcnLCBzaG91bGRUcmlnZ2VyUXVlcnk6IHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSB9KTtcbiAgICB9XG4gICAgLy8gcmVzZXQgYm90aCBmbGFncyBmb3IgbmV4dCB1c2VcbiAgICB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHRydWU7XG4gIH1cbn1cbiJdfQ==