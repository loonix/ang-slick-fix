/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class InputFilter {
    constructor() {
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
        this._inputType = 'text';
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
        return this.columnDef && this.columnDef.filter && this.columnDef.filter.operator || '';
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @protected
     * @return {?}
     */
    get gridOptions() {
        return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
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
            let value = e && e.target && e.target.value || '';
            /** @type {?} */
            const enableWhiteSpaceTrim = this.gridOptions.enableFilterTrimWhiteSpace || this.columnFilter.enableTrimWhiteSpace;
            if (typeof value === 'string' && enableWhiteSpaceTrim) {
                value = value.trim();
            }
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
            this.$filterElm.val('');
            this.$filterElm.trigger('keyup');
        }
    }
    /**
     * destroy the filter
     * @return {?}
     */
    destroy() {
        if (this.$filterElm) {
            this.$filterElm.off('keyup input change').remove();
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
    // protected functions
    // ------------------
    /**
     * Create the HTML template as a string
     * @protected
     * @return {?}
     */
    buildTemplateHtmlString() {
        /** @type {?} */
        const fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        let placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        if (this.columnFilter && this.columnFilter.placeholder) {
            placeholder = this.columnFilter.placeholder;
        }
        return `<input type="${this._inputType || 'text'}" role="presentation"  autocomplete="off" class="form-control search-filter filter-${fieldId}" placeholder="${placeholder}"><span></span>`;
    }
    /**
     * From the html template string, create a DOM element
     * @protected
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
        $filterElm.val(searchTerm);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRGaWx0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2ZpbHRlcnMvaW5wdXRGaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQWVBLE1BQU0sT0FBTyxXQUFXO0lBVXRCO1FBVFUsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQUMzQixlQUFVLEdBQUcsTUFBTSxDQUFDO0lBT2QsQ0FBQzs7Ozs7SUFHakIsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUN2RCxDQUFDOzs7OztJQUdELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDOzs7Ozs7SUFHRCxJQUFJLFNBQVMsQ0FBQyxJQUFZO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBR0QsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7SUFDekYsQ0FBQzs7Ozs7O0lBR0QsSUFBYyxXQUFXO1FBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMzRSxDQUFDOzs7Ozs7SUFLRCxJQUFJLENBQUMsSUFBcUI7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxD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LFVBQVUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUMzQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVyQyxnRkFBZ0Y7UUFDaEYsSUFBSSxVQUFVLEVBQUU7WUFDZCxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9CO1FBRUQsK0NBQStDO1FBQy9DLElBQUksVUFBVSxJQUFJLE9BQU8sVUFBVSxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUU7WUFDM0QsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNqQztRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FDRjs7Ozs7O0lBdkpDLDRDQUF3Qzs7Ozs7SUFDeEMsMENBQXFDOzs7OztJQUNyQyxpQ0FBOEI7Ozs7O0lBQzlCLGlDQUEwQjs7SUFDMUIsMkJBQVU7O0lBQ1Ysa0NBQTBCOztJQUMxQixnQ0FBa0I7O0lBQ2xCLCtCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbHVtbixcbiAgQ29sdW1uRmlsdGVyLFxuICBGaWx0ZXIsXG4gIEZpbHRlckFyZ3VtZW50cyxcbiAgRmlsdGVyQ2FsbGJhY2ssXG4gIEdyaWRPcHRpb24sXG4gIE9wZXJhdG9yVHlwZSxcbiAgT3BlcmF0b3JTdHJpbmcsXG4gIFNlYXJjaFRlcm0sXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcblxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xuZGVjbGFyZSB2YXIgJDogYW55O1xuXG5leHBvcnQgY2xhc3MgSW5wdXRGaWx0ZXIgaW1wbGVtZW50cyBGaWx0ZXIge1xuICBwcm90ZWN0ZWQgX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XG4gIHByb3RlY3RlZCBfc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZTtcbiAgcHJvdGVjdGVkIF9pbnB1dFR5cGUgPSAndGV4dCc7XG4gIHByb3RlY3RlZCAkZmlsdGVyRWxtOiBhbnk7XG4gIGdyaWQ6IGFueTtcbiAgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXTtcbiAgY29sdW1uRGVmOiBDb2x1bW47XG4gIGNhbGxiYWNrOiBGaWx0ZXJDYWxsYmFjaztcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDb2x1bW4gRmlsdGVyICovXG4gIGdldCBjb2x1bW5GaWx0ZXIoKTogQ29sdW1uRmlsdGVyIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyIHx8IHt9O1xuICB9XG5cbiAgLyoqIEdldHRlciBvZiBpbnB1dCB0eXBlICh0ZXh0LCBudW1iZXIsIHBhc3N3b3JkKSAqL1xuICBnZXQgaW5wdXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLl9pbnB1dFR5cGU7XG4gIH1cblxuICAvKiogU2V0dGVyIG9mIGlucHV0IHR5cGUgKHRleHQsIG51bWJlciwgcGFzc3dvcmQpICovXG4gIHNldCBpbnB1dFR5cGUodHlwZTogc3RyaW5nKSB7XG4gICAgdGhpcy5faW5wdXRUeXBlID0gdHlwZTtcbiAgfVxuXG4gIC8qKiBHZXR0ZXIgb2YgdGhlIE9wZXJhdG9yIHRvIHVzZSB3aGVuIGRvaW5nIHRoZSBmaWx0ZXIgY29tcGFyaW5nICovXG4gIGdldCBvcGVyYXRvcigpOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIub3BlcmF0b3IgfHwgJyc7XG4gIH1cblxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xuICBwcm90ZWN0ZWQgZ2V0IGdyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xuICAgIHJldHVybiAodGhpcy5ncmlkICYmIHRoaXMuZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBGaWx0ZXJcbiAgICovXG4gIGluaXQoYXJnczogRmlsdGVyQXJndW1lbnRzKSB7XG4gICAgdGhpcy5ncmlkID0gYXJncy5ncmlkO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBhcmdzLmNhbGxiYWNrO1xuICAgIHRoaXMuY29sdW1uRGVmID0gYXJncy5jb2x1bW5EZWY7XG4gICAgdGhpcy5zZWFyY2hUZXJtcyA9IGFyZ3Muc2VhcmNoVGVybXMgfHwgW107XG5cbiAgICAvLyBmaWx0ZXIgaW5wdXQgY2FuIG9ubHkgaGF2ZSAxIHNlYXJjaCB0ZXJtLCBzbyB3ZSB3aWxsIHVzZSB0aGUgMXN0IGFycmF5IGluZGV4IGlmIGl0IGV4aXN0XG4gICAgY29uc3Qgc2VhcmNoVGVybSA9IChBcnJheS5pc0FycmF5KHRoaXMuc2VhcmNoVGVybXMpICYmIHRoaXMuc2VhcmNoVGVybXNbMF0pIHx8ICcnO1xuXG4gICAgLy8gc3RlcCAxLCBjcmVhdGUgSFRNTCBzdHJpbmcgdGVtcGxhdGVcbiAgICBjb25zdCBmaWx0ZXJUZW1wbGF0ZSA9IHRoaXMuYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcoKTtcblxuICAgIC8vIHN0ZXAgMiwgY3JlYXRlIHRoZSBET00gRWxlbWVudCBvZiB0aGUgZmlsdGVyICYgaW5pdGlhbGl6ZSBpdCBpZiBzZWFyY2hUZXJtIGlzIGZpbGxlZFxuICAgIHRoaXMuJGZpbHRlckVsbSA9IHRoaXMuY3JlYXRlRG9tRWxlbWVudChmaWx0ZXJUZW1wbGF0ZSwgc2VhcmNoVGVybSk7XG5cbiAgICAvLyBzdGVwIDMsIHN1YnNjcmliZSB0byB0aGUga2V5dXAgZXZlbnQgYW5kIHJ1biB0aGUgY2FsbGJhY2sgd2hlbiB0aGF0IGhhcHBlbnNcbiAgICAvLyBhbHNvIGFkZC9yZW1vdmUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xuICAgIHRoaXMuJGZpbHRlckVsbS5vbigna2V5dXAgaW5wdXQgY2hhbmdlJywgKGU6IGFueSkgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSB8fCAnJztcbiAgICAgIGNvbnN0IGVuYWJsZVdoaXRlU3BhY2VUcmltID0gdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVGaWx0ZXJUcmltV2hpdGVTcGFjZSB8fCB0aGlzLmNvbHVtbkZpbHRlci5lbmFibGVUcmltV2hpdGVTcGFjZTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIGVuYWJsZVdoaXRlU3BhY2VUcmltKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUudHJpbSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCwgc2hvdWxkVHJpZ2dlclF1ZXJ5OiB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgfSk7XG4gICAgICAgIHRoaXMuJGZpbHRlckVsbS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9PT0gJycgPyB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpIDogdGhpcy4kZmlsdGVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKTtcbiAgICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIG9wZXJhdG9yOiB0aGlzLm9wZXJhdG9yLCBzZWFyY2hUZXJtczogW3ZhbHVlXSwgc2hvdWxkVHJpZ2dlclF1ZXJ5OiB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgfSk7XG4gICAgICB9XG4gICAgICAvLyByZXNldCBib3RoIGZsYWdzIGZvciBuZXh0IHVzZVxuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIGZpbHRlciB2YWx1ZVxuICAgKi9cbiAgY2xlYXIoc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZSkge1xuICAgIGlmICh0aGlzLiRmaWx0ZXJFbG0pIHtcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHNob3VsZFRyaWdnZXJRdWVyeTtcbiAgICAgIHRoaXMuc2VhcmNoVGVybXMgPSBbXTtcbiAgICAgIHRoaXMuJGZpbHRlckVsbS52YWwoJycpO1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLnRyaWdnZXIoJ2tleXVwJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRlc3Ryb3kgdGhlIGZpbHRlclxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtKSB7XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ub2ZmKCdrZXl1cCBpbnB1dCBjaGFuZ2UnKS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHZhbHVlKHMpIG9uIHRoZSBET00gZWxlbWVudFxuICAgKi9cbiAgc2V0VmFsdWVzKHZhbHVlczogU2VhcmNoVGVybSkge1xuICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgIHRoaXMuJGZpbHRlckVsbS52YWwodmFsdWVzKTtcbiAgICB9XG4gIH1cblxuICAvL1xuICAvLyBwcm90ZWN0ZWQgZnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgdGhlIEhUTUwgdGVtcGxhdGUgYXMgYSBzdHJpbmdcbiAgICovXG4gIHByb3RlY3RlZCBidWlsZFRlbXBsYXRlSHRtbFN0cmluZygpIHtcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XG4gICAgbGV0IHBsYWNlaG9sZGVyID0gKHRoaXMuZ3JpZE9wdGlvbnMpID8gKHRoaXMuZ3JpZE9wdGlvbnMuZGVmYXVsdEZpbHRlclBsYWNlaG9sZGVyIHx8ICcnKSA6ICcnO1xuICAgIGlmICh0aGlzLmNvbHVtbkZpbHRlciAmJiB0aGlzLmNvbHVtbkZpbHRlci5wbGFjZWhvbGRlcikge1xuICAgICAgcGxhY2Vob2xkZXIgPSB0aGlzLmNvbHVtbkZpbHRlci5wbGFjZWhvbGRlcjtcbiAgICB9XG4gICAgcmV0dXJuIGA8aW5wdXQgdHlwZT1cIiR7dGhpcy5faW5wdXRUeXBlIHx8ICd0ZXh0J31cIiByb2xlPVwicHJlc2VudGF0aW9uXCIgIGF1dG9jb21wbGV0ZT1cIm9mZlwiIGNsYXNzPVwiZm9ybS1jb250cm9sIHNlYXJjaC1maWx0ZXIgZmlsdGVyLSR7ZmllbGRJZH1cIiBwbGFjZWhvbGRlcj1cIiR7cGxhY2Vob2xkZXJ9XCI+PHNwYW4+PC9zcGFuPmA7XG4gIH1cblxuICAvKipcbiAgICogRnJvbSB0aGUgaHRtbCB0ZW1wbGF0ZSBzdHJpbmcsIGNyZWF0ZSBhIERPTSBlbGVtZW50XG4gICAqIEBwYXJhbSBmaWx0ZXJUZW1wbGF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIGNyZWF0ZURvbUVsZW1lbnQoZmlsdGVyVGVtcGxhdGU6IHN0cmluZywgc2VhcmNoVGVybT86IFNlYXJjaFRlcm0pIHtcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XG4gICAgY29uc3QgJGhlYWRlckVsbSA9IHRoaXMuZ3JpZC5nZXRIZWFkZXJSb3dDb2x1bW4oZmllbGRJZCk7XG4gICAgJCgkaGVhZGVyRWxtKS5lbXB0eSgpO1xuXG4gICAgLy8gY3JlYXRlIHRoZSBET00gZWxlbWVudCAmIGFkZCBhbiBJRCBhbmQgZmlsdGVyIGNsYXNzXG4gICAgY29uc3QgJGZpbHRlckVsbSA9ICQoZmlsdGVyVGVtcGxhdGUpO1xuXG4gICAgJGZpbHRlckVsbS52YWwoc2VhcmNoVGVybSk7XG4gICAgJGZpbHRlckVsbS5hdHRyKCdpZCcsIGBmaWx0ZXItJHtmaWVsZElkfWApO1xuICAgICRmaWx0ZXJFbG0uZGF0YSgnY29sdW1uSWQnLCBmaWVsZElkKTtcblxuICAgIC8vIGlmIHRoZXJlJ3MgYSBzZWFyY2ggdGVybSwgd2Ugd2lsbCBhZGQgdGhlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcbiAgICBpZiAoc2VhcmNoVGVybSkge1xuICAgICAgJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJyk7XG4gICAgfVxuXG4gICAgLy8gYXBwZW5kIHRoZSBuZXcgRE9NIGVsZW1lbnQgdG8gdGhlIGhlYWRlciByb3dcbiAgICBpZiAoJGZpbHRlckVsbSAmJiB0eXBlb2YgJGZpbHRlckVsbS5hcHBlbmRUbyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgJGZpbHRlckVsbS5hcHBlbmRUbygkaGVhZGVyRWxtKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJGZpbHRlckVsbTtcbiAgfVxufVxuIl19