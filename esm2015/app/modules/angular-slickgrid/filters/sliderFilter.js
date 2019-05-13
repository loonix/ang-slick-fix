/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { OperatorType, } from './../models/index';
/** @type {?} */
const DEFAULT_MIN_VALUE = 0;
/** @type {?} */
const DEFAULT_MAX_VALUE = 100;
/** @type {?} */
const DEFAULT_STEP = 1;
export class SliderFilter {
    constructor() {
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
    }
    /**
     * Getter for the Filter Generic Params
     * @private
     * @return {?}
     */
    get filterParams() {
        return this.columnDef && this.columnDef.filter && this.columnDef.filter.params || {};
    }
    /**
     * Getter for the `filter` properties
     * @private
     * @return {?}
     */
    get filterProperties() {
        return this.columnDef && this.columnDef.filter;
    }
    /**
     * @return {?}
     */
    get operator() {
        return (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) || OperatorType.equal;
    }
    /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    init(args) {
        if (!args) {
            throw new Error('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
        }
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        // define the input & slider number IDs
        this._elementRangeInputId = `rangeInput_${this.columnDef.field}`;
        this._elementRangeOutputId = `rangeOutput_${this.columnDef.field}`;
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        /** @type {?} */
        const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        // step 1, create HTML string template
        /** @type {?} */
        const filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
        this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
        // step 3, subscribe to the change event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.change((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            /** @type {?} */
            const value = e && e.target && e.target.value || '';
            if (this._clearFilterTriggered) {
                this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
                this.$filterElm.removeClass('filled');
            }
            else {
                value === '' ? this.$filterElm.removeClass('filled') : this.$filterElm.addClass('filled');
                this.callback(e, { columnDef: this.columnDef, operator: this.operator, searchTerms: [value], shouldTriggerQuery: this._shouldTriggerQuery });
            }
            // reset both flags for next use
            this._clearFilterTriggered = false;
            this._shouldTriggerQuery = true;
        }));
        // if user chose to display the slider number on the right side, then update it every time it changes
        // we need to use both "input" and "change" event to be all cross-browser
        if (!this.filterParams.hideSliderNumber) {
            this.$filterElm.on('input change', (/**
             * @param {?} e
             * @return {?}
             */
            (e) => {
                /** @type {?} */
                const value = e && e.target && e.target.value || '';
                if (value) {
                    document.getElementById(this._elementRangeOutputId).innerHTML = value;
                }
            }));
        }
    }
    /**
     * Clear the filter value
     * @param {?=} shouldTriggerQuery
     * @return {?}
     */
    clear(shouldTriggerQuery = true) {
        if (this.$filterElm) {
            this._clearFilterTriggered = true;
            this._shouldTriggerQuery = shouldTriggerQuery;
            this.searchTerms = [];
            /** @type {?} */
            const clearedValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : DEFAULT_MIN_VALUE;
            this.$filterElm.children('input').val(clearedValue);
            this.$filterElm.children('div.input-group-addon.input-group-append').children().html(clearedValue);
            this.$filterElm.trigger('change');
        }
    }
    /**
     * destroy the filter
     * @return {?}
     */
    destroy() {
        if (this.$filterElm) {
            this.$filterElm.off('change').remove();
        }
    }
    /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    setValues(values) {
        if (values) {
            this.$filterElm.val(values);
        }
    }
    //
    // private functions
    // ------------------
    /**
     * Create the HTML template as a string
     * @private
     * @return {?}
     */
    buildTemplateHtmlString() {
        /** @type {?} */
        const fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        const minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
        /** @type {?} */
        const maxValue = this.filterProperties.hasOwnProperty('maxValue') ? this.filterProperties.maxValue : DEFAULT_MAX_VALUE;
        /** @type {?} */
        const defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
        /** @type {?} */
        const step = this.filterProperties.hasOwnProperty('valueStep') ? this.filterProperties.valueStep : DEFAULT_STEP;
        if (this.filterParams.hideSliderNumber) {
            return `
      <div class="search-filter filter-${fieldId}">
        <input type="range" id="${this._elementRangeInputId}"
          name="${this._elementRangeInputId}"
          defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-filter-input range" />
      </div>`;
        }
        return `
      <div class="input-group search-filter filter-${fieldId}">
        <input type="range" id="${this._elementRangeInputId}"
          name="${this._elementRangeInputId}"
          defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-filter-input range" />
        <div class="input-group-addon input-group-append slider-value">
          <span class="input-group-text" id="${this._elementRangeOutputId}">${defaultValue}</span>
        </div>
      </div>`;
    }
    /**
     * From the html template string, create a DOM element
     * @private
     * @param {?} filterTemplate
     * @param {?=} searchTerm
     * @return {?}
     */
    createDomElement(filterTemplate, searchTerm) {
        /** @type {?} */
        const fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        const $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        /** @type {?} */
        const $filterElm = $(filterTemplate);
        /** @type {?} */
        const searchTermInput = (/** @type {?} */ ((searchTerm || '0')));
        $filterElm.children('input').val(searchTermInput);
        $filterElm.children('div.input-group-addon.input-group-append').children().html(searchTermInput);
        $filterElm.attr('id', `filter-${fieldId}`);
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
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    SliderFilter.prototype._clearFilterTriggered;
    /**
     * @type {?}
     * @private
     */
    SliderFilter.prototype._shouldTriggerQuery;
    /**
     * @type {?}
     * @private
     */
    SliderFilter.prototype._elementRangeInputId;
    /**
     * @type {?}
     * @private
     */
    SliderFilter.prototype._elementRangeOutputId;
    /**
     * @type {?}
     * @private
     */
    SliderFilter.prototype.$filterElm;
    /** @type {?} */
    SliderFilter.prototype.grid;
    /** @type {?} */
    SliderFilter.prototype.searchTerms;
    /** @type {?} */
    SliderFilter.prototype.columnDef;
    /** @type {?} */
    SliderFilter.prototype.callback;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyRmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL3NsaWRlckZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQU1MLFlBQVksR0FHYixNQUFNLG1CQUFtQixDQUFDOztNQUtyQixpQkFBaUIsR0FBRyxDQUFDOztNQUNyQixpQkFBaUIsR0FBRyxHQUFHOztNQUN2QixZQUFZLEdBQUcsQ0FBQztBQUV0QixNQUFNLE9BQU8sWUFBWTtJQUF6QjtRQUNVLDBCQUFxQixHQUFHLEtBQUssQ0FBQztRQUM5Qix3QkFBbUIsR0FBRyxJQUFJLENBQUM7SUErS3JDLENBQUM7Ozs7OztJQXJLQyxJQUFZLFlBQVk7UUFDdEIsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDdkYsQ0FBQzs7Ozs7O0lBR0QsSUFBWSxnQkFBZ0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO0lBQ2pELENBQUM7Ozs7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDO0lBQzNHLENBQUM7Ozs7OztJQUtELElBQUksQ0FBQyxJQUFxQjtRQUN4QixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyxpRkFBaUYsQ0FBQyxDQUFDO1NBQ3BHO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJ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Q0FBQyxPQUFPLENBQUM7UUFDeEQsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDOzs7Y0FHaEIsVUFBVSxHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUM7O2NBQzlCLGVBQWUsR0FBRyxtQkFBQSxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsRUFBVTtRQUVyRCxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNsRCxVQUFVLENBQUMsUUFBUSxDQUFDLDBDQUEwQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2pHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUMzQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVyQyxnRkFBZ0Y7UUFDaEYsSUFBSSxVQUFVLEVBQUU7WUFDZCxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9CO1FBRUQsK0NBQStDO1FBQy9DLElBQUksVUFBVSxJQUFJLE9BQU8sVUFBVSxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUU7WUFDM0QsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNqQztRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FDRjs7Ozs7O0lBaExDLDZDQUFzQzs7Ozs7SUFDdEMsMkNBQW1DOzs7OztJQUNuQyw0Q0FBcUM7Ozs7O0lBQ3JDLDZDQUFzQzs7Ozs7SUFDdEMsa0NBQXdCOztJQUN4Qiw0QkFBVTs7SUFDVixtQ0FBMEI7O0lBQzFCLGlDQUFrQjs7SUFDbEIsZ0NBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgQ29sdW1uRmlsdGVyLFxyXG4gIEZpbHRlcixcclxuICBGaWx0ZXJBcmd1bWVudHMsXHJcbiAgRmlsdGVyQ2FsbGJhY2ssXHJcbiAgT3BlcmF0b3JUeXBlLFxyXG4gIE9wZXJhdG9yU3RyaW5nLFxyXG4gIFNlYXJjaFRlcm0sXHJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG5jb25zdCBERUZBVUxUX01JTl9WQUxVRSA9IDA7XHJcbmNvbnN0IERFRkFVTFRfTUFYX1ZBTFVFID0gMTAwO1xyXG5jb25zdCBERUZBVUxUX1NURVAgPSAxO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNsaWRlckZpbHRlciBpbXBsZW1lbnRzIEZpbHRlciB7XHJcbiAgcHJpdmF0ZSBfY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTtcclxuICBwcml2YXRlIF9zaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlO1xyXG4gIHByaXZhdGUgX2VsZW1lbnRSYW5nZUlucHV0SWQ6IHN0cmluZztcclxuICBwcml2YXRlIF9lbGVtZW50UmFuZ2VPdXRwdXRJZDogc3RyaW5nO1xyXG4gIHByaXZhdGUgJGZpbHRlckVsbTogYW55O1xyXG4gIGdyaWQ6IGFueTtcclxuICBzZWFyY2hUZXJtczogU2VhcmNoVGVybVtdO1xyXG4gIGNvbHVtbkRlZjogQ29sdW1uO1xyXG4gIGNhbGxiYWNrOiBGaWx0ZXJDYWxsYmFjaztcclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEZpbHRlciBHZW5lcmljIFBhcmFtcyAqL1xyXG4gIHByaXZhdGUgZ2V0IGZpbHRlclBhcmFtcygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIucGFyYW1zIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIGBmaWx0ZXJgIHByb3BlcnRpZXMgKi9cclxuICBwcml2YXRlIGdldCBmaWx0ZXJQcm9wZXJ0aWVzKCk6IENvbHVtbkZpbHRlciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG9wZXJhdG9yKCk6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlci5vcGVyYXRvcikgfHwgT3BlcmF0b3JUeXBlLmVxdWFsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgRmlsdGVyXHJcbiAgICovXHJcbiAgaW5pdChhcmdzOiBGaWx0ZXJBcmd1bWVudHMpIHtcclxuICAgIGlmICghYXJncykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tBbmd1bGFyLVNsaWNrR3JpZF0gQSBmaWx0ZXIgbXVzdCBhbHdheXMgaGF2ZSBhbiBcImluaXQoKVwiIHdpdGggdmFsaWQgYXJndW1lbnRzLicpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5ncmlkID0gYXJncy5ncmlkO1xyXG4gICAgdGhpcy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2s7XHJcbiAgICB0aGlzLmNvbHVtbkRlZiA9IGFyZ3MuY29sdW1uRGVmO1xyXG4gICAgdGhpcy5zZWFyY2hUZXJtcyA9IGFyZ3Muc2VhcmNoVGVybXMgfHwgW107XHJcblxyXG4gICAgLy8gZGVmaW5lIHRoZSBpbnB1dCAmIHNsaWRlciBudW1iZXIgSURzXHJcbiAgICB0aGlzLl9lbGVtZW50UmFuZ2VJbnB1dElkID0gYHJhbmdlSW5wdXRfJHt0aGlzLmNvbHVtbkRlZi5maWVsZH1gO1xyXG4gICAgdGhpcy5fZWxlbWVudFJhbmdlT3V0cHV0SWQgPSBgcmFuZ2VPdXRwdXRfJHt0aGlzLmNvbHVtbkRlZi5maWVsZH1gO1xyXG5cclxuICAgIC8vIGZpbHRlciBpbnB1dCBjYW4gb25seSBoYXZlIDEgc2VhcmNoIHRlcm0sIHNvIHdlIHdpbGwgdXNlIHRoZSAxc3QgYXJyYXkgaW5kZXggaWYgaXQgZXhpc3RcclxuICAgIGNvbnN0IHNlYXJjaFRlcm0gPSAoQXJyYXkuaXNBcnJheSh0aGlzLnNlYXJjaFRlcm1zKSAmJiB0aGlzLnNlYXJjaFRlcm1zWzBdKSB8fCAnJztcclxuXHJcbiAgICAvLyBzdGVwIDEsIGNyZWF0ZSBIVE1MIHN0cmluZyB0ZW1wbGF0ZVxyXG4gICAgY29uc3QgZmlsdGVyVGVtcGxhdGUgPSB0aGlzLmJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKCk7XHJcblxyXG4gICAgLy8gc3RlcCAyLCBjcmVhdGUgdGhlIERPTSBFbGVtZW50IG9mIHRoZSBmaWx0ZXIgJiBpbml0aWFsaXplIGl0IGlmIHNlYXJjaFRlcm0gaXMgZmlsbGVkXHJcbiAgICB0aGlzLiRmaWx0ZXJFbG0gPSB0aGlzLmNyZWF0ZURvbUVsZW1lbnQoZmlsdGVyVGVtcGxhdGUsIHNlYXJjaFRlcm0pO1xyXG5cclxuICAgIC8vIHN0ZXAgMywgc3Vic2NyaWJlIHRvIHRoZSBjaGFuZ2UgZXZlbnQgYW5kIHJ1biB0aGUgY2FsbGJhY2sgd2hlbiB0aGF0IGhhcHBlbnNcclxuICAgIC8vIGFsc28gYWRkL3JlbW92ZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXHJcbiAgICB0aGlzLiRmaWx0ZXJFbG0uY2hhbmdlKChlOiBhbnkpID0+IHtcclxuICAgICAgY29uc3QgdmFsdWUgPSBlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlIHx8ICcnO1xyXG4gICAgICBpZiAodGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQpIHtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrKGUsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgY2xlYXJGaWx0ZXJUcmlnZ2VyZWQ6IHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkLCBzaG91bGRUcmlnZ2VyUXVlcnk6IHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSB9KTtcclxuICAgICAgICB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhbHVlID09PSAnJyA/IHRoaXMuJGZpbHRlckVsbS5yZW1vdmVDbGFzcygnZmlsbGVkJykgOiB0aGlzLiRmaWx0ZXJFbG0uYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBvcGVyYXRvcjogdGhpcy5vcGVyYXRvciwgc2VhcmNoVGVybXM6IFt2YWx1ZV0sIHNob3VsZFRyaWdnZXJRdWVyeTogdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5IH0pO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHJlc2V0IGJvdGggZmxhZ3MgZm9yIG5leHQgdXNlXHJcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHRydWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBpZiB1c2VyIGNob3NlIHRvIGRpc3BsYXkgdGhlIHNsaWRlciBudW1iZXIgb24gdGhlIHJpZ2h0IHNpZGUsIHRoZW4gdXBkYXRlIGl0IGV2ZXJ5IHRpbWUgaXQgY2hhbmdlc1xyXG4gICAgLy8gd2UgbmVlZCB0byB1c2UgYm90aCBcImlucHV0XCIgYW5kIFwiY2hhbmdlXCIgZXZlbnQgdG8gYmUgYWxsIGNyb3NzLWJyb3dzZXJcclxuICAgIGlmICghdGhpcy5maWx0ZXJQYXJhbXMuaGlkZVNsaWRlck51bWJlcikge1xyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ub24oJ2lucHV0IGNoYW5nZScsIChlOiB7IHRhcmdldDogSFRNTElucHV0RWxlbWVudCB9KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlIHx8ICcnO1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5fZWxlbWVudFJhbmdlT3V0cHV0SWQpLmlubmVySFRNTCA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgZmlsdGVyIHZhbHVlXHJcbiAgICovXHJcbiAgY2xlYXIoc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZSkge1xyXG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSkge1xyXG4gICAgICB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHNob3VsZFRyaWdnZXJRdWVyeTtcclxuICAgICAgdGhpcy5zZWFyY2hUZXJtcyA9IFtdO1xyXG4gICAgICBjb25zdCBjbGVhcmVkVmFsdWUgPSB0aGlzLmZpbHRlclBhcmFtcy5oYXNPd25Qcm9wZXJ0eSgnc2xpZGVyU3RhcnRWYWx1ZScpID8gdGhpcy5maWx0ZXJQYXJhbXMuc2xpZGVyU3RhcnRWYWx1ZSA6IERFRkFVTFRfTUlOX1ZBTFVFO1xyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0uY2hpbGRyZW4oJ2lucHV0JykudmFsKGNsZWFyZWRWYWx1ZSk7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5jaGlsZHJlbignZGl2LmlucHV0LWdyb3VwLWFkZG9uLmlucHV0LWdyb3VwLWFwcGVuZCcpLmNoaWxkcmVuKCkuaHRtbChjbGVhcmVkVmFsdWUpO1xyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0udHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBkZXN0cm95IHRoZSBmaWx0ZXJcclxuICAgKi9cclxuICBkZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSkge1xyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ub2ZmKCdjaGFuZ2UnKS5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB2YWx1ZShzKSBvbiB0aGUgRE9NIGVsZW1lbnRcclxuICAgKi9cclxuICBzZXRWYWx1ZXModmFsdWVzOiBTZWFyY2hUZXJtKSB7XHJcbiAgICBpZiAodmFsdWVzKSB7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS52YWwodmFsdWVzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vXHJcbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIHRoZSBIVE1MIHRlbXBsYXRlIGFzIGEgc3RyaW5nXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBidWlsZFRlbXBsYXRlSHRtbFN0cmluZygpIHtcclxuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcclxuICAgIGNvbnN0IG1pblZhbHVlID0gdGhpcy5maWx0ZXJQcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KCdtaW5WYWx1ZScpID8gdGhpcy5maWx0ZXJQcm9wZXJ0aWVzLm1pblZhbHVlIDogREVGQVVMVF9NSU5fVkFMVUU7XHJcbiAgICBjb25zdCBtYXhWYWx1ZSA9IHRoaXMuZmlsdGVyUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgnbWF4VmFsdWUnKSA/IHRoaXMuZmlsdGVyUHJvcGVydGllcy5tYXhWYWx1ZSA6IERFRkFVTFRfTUFYX1ZBTFVFO1xyXG4gICAgY29uc3QgZGVmYXVsdFZhbHVlID0gdGhpcy5maWx0ZXJQYXJhbXMuaGFzT3duUHJvcGVydHkoJ3NsaWRlclN0YXJ0VmFsdWUnKSA/IHRoaXMuZmlsdGVyUGFyYW1zLnNsaWRlclN0YXJ0VmFsdWUgOiBtaW5WYWx1ZTtcclxuICAgIGNvbnN0IHN0ZXAgPSB0aGlzLmZpbHRlclByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoJ3ZhbHVlU3RlcCcpID8gdGhpcy5maWx0ZXJQcm9wZXJ0aWVzLnZhbHVlU3RlcCA6IERFRkFVTFRfU1RFUDtcclxuXHJcbiAgICBpZiAodGhpcy5maWx0ZXJQYXJhbXMuaGlkZVNsaWRlck51bWJlcikge1xyXG4gICAgICByZXR1cm4gYFxyXG4gICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLWZpbHRlciBmaWx0ZXItJHtmaWVsZElkfVwiPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBpZD1cIiR7dGhpcy5fZWxlbWVudFJhbmdlSW5wdXRJZH1cIlxyXG4gICAgICAgICAgbmFtZT1cIiR7dGhpcy5fZWxlbWVudFJhbmdlSW5wdXRJZH1cIlxyXG4gICAgICAgICAgZGVmYXVsdFZhbHVlPVwiJHtkZWZhdWx0VmFsdWV9XCIgbWluPVwiJHttaW5WYWx1ZX1cIiBtYXg9XCIke21heFZhbHVlfVwiIHN0ZXA9XCIke3N0ZXB9XCJcclxuICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIHNsaWRlci1maWx0ZXItaW5wdXQgcmFuZ2VcIiAvPlxyXG4gICAgICA8L2Rpdj5gO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBgXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBzZWFyY2gtZmlsdGVyIGZpbHRlci0ke2ZpZWxkSWR9XCI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIGlkPVwiJHt0aGlzLl9lbGVtZW50UmFuZ2VJbnB1dElkfVwiXHJcbiAgICAgICAgICBuYW1lPVwiJHt0aGlzLl9lbGVtZW50UmFuZ2VJbnB1dElkfVwiXHJcbiAgICAgICAgICBkZWZhdWx0VmFsdWU9XCIke2RlZmF1bHRWYWx1ZX1cIiBtaW49XCIke21pblZhbHVlfVwiIG1heD1cIiR7bWF4VmFsdWV9XCIgc3RlcD1cIiR7c3RlcH1cIlxyXG4gICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2wgc2xpZGVyLWZpbHRlci1pbnB1dCByYW5nZVwiIC8+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIGlucHV0LWdyb3VwLWFwcGVuZCBzbGlkZXItdmFsdWVcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiIGlkPVwiJHt0aGlzLl9lbGVtZW50UmFuZ2VPdXRwdXRJZH1cIj4ke2RlZmF1bHRWYWx1ZX08L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PmA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGcm9tIHRoZSBodG1sIHRlbXBsYXRlIHN0cmluZywgY3JlYXRlIGEgRE9NIGVsZW1lbnRcclxuICAgKiBAcGFyYW0gZmlsdGVyVGVtcGxhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZURvbUVsZW1lbnQoZmlsdGVyVGVtcGxhdGU6IHN0cmluZywgc2VhcmNoVGVybT86IFNlYXJjaFRlcm0pIHtcclxuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcclxuICAgIGNvbnN0ICRoZWFkZXJFbG0gPSB0aGlzLmdyaWQuZ2V0SGVhZGVyUm93Q29sdW1uKGZpZWxkSWQpO1xyXG4gICAgJCgkaGVhZGVyRWxtKS5lbXB0eSgpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIGVsZW1lbnQgJiBhZGQgYW4gSUQgYW5kIGZpbHRlciBjbGFzc1xyXG4gICAgY29uc3QgJGZpbHRlckVsbSA9ICQoZmlsdGVyVGVtcGxhdGUpO1xyXG4gICAgY29uc3Qgc2VhcmNoVGVybUlucHV0ID0gKHNlYXJjaFRlcm0gfHwgJzAnKSBhcyBzdHJpbmc7XHJcblxyXG4gICAgJGZpbHRlckVsbS5jaGlsZHJlbignaW5wdXQnKS52YWwoc2VhcmNoVGVybUlucHV0KTtcclxuICAgICRmaWx0ZXJFbG0uY2hpbGRyZW4oJ2Rpdi5pbnB1dC1ncm91cC1hZGRvbi5pbnB1dC1ncm91cC1hcHBlbmQnKS5jaGlsZHJlbigpLmh0bWwoc2VhcmNoVGVybUlucHV0KTtcclxuICAgICRmaWx0ZXJFbG0uYXR0cignaWQnLCBgZmlsdGVyLSR7ZmllbGRJZH1gKTtcclxuICAgICRmaWx0ZXJFbG0uZGF0YSgnY29sdW1uSWQnLCBmaWVsZElkKTtcclxuXHJcbiAgICAvLyBpZiB0aGVyZSdzIGEgc2VhcmNoIHRlcm0sIHdlIHdpbGwgYWRkIHRoZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXHJcbiAgICBpZiAoc2VhcmNoVGVybSkge1xyXG4gICAgICAkZmlsdGVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhcHBlbmQgdGhlIG5ldyBET00gZWxlbWVudCB0byB0aGUgaGVhZGVyIHJvd1xyXG4gICAgaWYgKCRmaWx0ZXJFbG0gJiYgdHlwZW9mICRmaWx0ZXJFbG0uYXBwZW5kVG8gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgJGZpbHRlckVsbS5hcHBlbmRUbygkaGVhZGVyRWxtKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJGZpbHRlckVsbTtcclxuICB9XHJcbn1cclxuIl19