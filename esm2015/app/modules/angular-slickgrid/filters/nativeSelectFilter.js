/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { OperatorType, } from './../models/index';
export class NativeSelectFilter {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
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
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        /** @type {?} */
        let searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        if (typeof searchTerm === 'boolean' || typeof searchTerm === 'number') {
            searchTerm = `${searchTerm}`;
        }
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
    }
    /**
     * Clear the filter values
     * @param {?=} shouldTriggerQuery
     * @return {?}
     */
    clear(shouldTriggerQuery = true) {
        if (this.$filterElm) {
            this._clearFilterTriggered = true;
            this._shouldTriggerQuery = shouldTriggerQuery;
            this.searchTerms = [];
            this.$filterElm.val('');
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
     * @private
     * @return {?}
     */
    buildTemplateHtmlString() {
        if (!this.columnDef || !this.columnDef.filter || !this.columnDef.filter.collection) {
            throw new Error(`[Angular-SlickGrid] You need to pass a "collection" for the Select Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.select, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }`);
        }
        /** @type {?} */
        const fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        const optionCollection = this.columnDef.filter.collection || [];
        /** @type {?} */
        const labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
        /** @type {?} */
        const valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';
        /** @type {?} */
        let options = '';
        // collection could be an Array of Strings OR Objects
        if (optionCollection.every((/**
         * @param {?} x
         * @return {?}
         */
        x => typeof x === 'string'))) {
            optionCollection.forEach((/**
             * @param {?} option
             * @return {?}
             */
            (option) => {
                options += `<option value="${option}" label="${option}">${option}</option>`;
            }));
        }
        else {
            optionCollection.forEach((/**
             * @param {?} option
             * @return {?}
             */
            (option) => {
                if (!option || (option[labelName] === undefined && option.labelKey === undefined)) {
                    throw new Error(`A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.select, collection: [ { value: '1', label: 'One' } ]')`);
                }
                /** @type {?} */
                const labelKey = option.labelKey || option[labelName];
                /** @type {?} */
                const textLabel = ((option.labelKey || this.columnDef.filter.enableTranslateLabel) && this.translate && typeof this.translate.instant === 'function') ? this.translate.instant(labelKey || ' ') : labelKey;
                options += `<option value="${option[valueName]}">${textLabel}</option>`;
            }));
        }
        return `<select class="form-control search-filter filter-${fieldId}">${options}</select>`;
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
        const searchTermInput = (/** @type {?} */ ((searchTerm || '')));
        $filterElm.val(searchTermInput);
        $filterElm.attr('id', `filter-${fieldId}`);
        $filterElm.data('columnId', fieldId);
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
    NativeSelectFilter.prototype._clearFilterTriggered;
    /**
     * @type {?}
     * @private
     */
    NativeSelectFilter.prototype._shouldTriggerQuery;
    /** @type {?} */
    NativeSelectFilter.prototype.$filterElm;
    /** @type {?} */
    NativeSelectFilter.prototype.grid;
    /** @type {?} */
    NativeSelectFilter.prototype.searchTerms;
    /** @type {?} */
    NativeSelectFilter.prototype.columnDef;
    /** @type {?} */
    NativeSelectFilter.prototype.callback;
    /**
     * @type {?}
     * @private
     */
    NativeSelectFilter.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlU2VsZWN0RmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL25hdGl2ZVNlbGVjdEZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUtMLFlBQVksR0FHYixNQUFNLG1CQUFtQixDQUFDO0FBSzNCLE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUFTN0IsWUFBb0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFSdkMsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLHdCQUFtQixHQUFHLElBQUksQ0FBQztJQU9nQixDQUFDOzs7O0lBRXBELElBQUksUUFBUTtRQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFDM0csQ0FBQzs7Ozs7O0lBS0QsSUFBSSxDQUFDLElBQXFCO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7OztZQUd0QyxVQUFVLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRTtRQUMvRSxJQUFJLE9BQU8sVUFBVSxLQUFLLFNBQVMsSUFBSSxPQUFPLFVB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WUFDM0QsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNqQztRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FDRjs7Ozs7O0lBN0lDLG1EQUFzQzs7Ozs7SUFDdEMsaURBQW1DOztJQUNuQyx3Q0FBZ0I7O0lBQ2hCLGtDQUFVOztJQUNWLHlDQUEwQjs7SUFDMUIsdUNBQWtCOztJQUNsQixzQ0FBeUI7Ozs7O0lBRWIsdUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENvbHVtbixcclxuICBGaWx0ZXIsXHJcbiAgRmlsdGVyQXJndW1lbnRzLFxyXG4gIEZpbHRlckNhbGxiYWNrLFxyXG4gIE9wZXJhdG9yVHlwZSxcclxuICBPcGVyYXRvclN0cmluZyxcclxuICBTZWFyY2hUZXJtLFxyXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgJDogYW55O1xyXG5cclxuZXhwb3J0IGNsYXNzIE5hdGl2ZVNlbGVjdEZpbHRlciBpbXBsZW1lbnRzIEZpbHRlciB7XHJcbiAgcHJpdmF0ZSBfY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTtcclxuICBwcml2YXRlIF9zaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlO1xyXG4gICRmaWx0ZXJFbG06IGFueTtcclxuICBncmlkOiBhbnk7XHJcbiAgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXTtcclxuICBjb2x1bW5EZWY6IENvbHVtbjtcclxuICBjYWxsYmFjazogRmlsdGVyQ2FsbGJhY2s7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7IH1cclxuXHJcbiAgZ2V0IG9wZXJhdG9yKCk6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nIHtcclxuICAgIHJldHVybiAodGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlci5vcGVyYXRvcikgfHwgT3BlcmF0b3JUeXBlLmVxdWFsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgRmlsdGVyXHJcbiAgICovXHJcbiAgaW5pdChhcmdzOiBGaWx0ZXJBcmd1bWVudHMpIHtcclxuICAgIHRoaXMuZ3JpZCA9IGFyZ3MuZ3JpZDtcclxuICAgIHRoaXMuY2FsbGJhY2sgPSBhcmdzLmNhbGxiYWNrO1xyXG4gICAgdGhpcy5jb2x1bW5EZWYgPSBhcmdzLmNvbHVtbkRlZjtcclxuICAgIHRoaXMuc2VhcmNoVGVybXMgPSBhcmdzLnNlYXJjaFRlcm1zIHx8IFtdO1xyXG5cclxuICAgIC8vIGZpbHRlciBpbnB1dCBjYW4gb25seSBoYXZlIDEgc2VhcmNoIHRlcm0sIHNvIHdlIHdpbGwgdXNlIHRoZSAxc3QgYXJyYXkgaW5kZXggaWYgaXQgZXhpc3RcclxuICAgIGxldCBzZWFyY2hUZXJtID0gKEFycmF5LmlzQXJyYXkodGhpcy5zZWFyY2hUZXJtcykgJiYgdGhpcy5zZWFyY2hUZXJtc1swXSkgfHwgJyc7XHJcbiAgICBpZiAodHlwZW9mIHNlYXJjaFRlcm0gPT09ICdib29sZWFuJyB8fCB0eXBlb2Ygc2VhcmNoVGVybSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgc2VhcmNoVGVybSA9IGAke3NlYXJjaFRlcm19YDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzdGVwIDEsIGNyZWF0ZSBIVE1MIHN0cmluZyB0ZW1wbGF0ZVxyXG4gICAgY29uc3QgZmlsdGVyVGVtcGxhdGUgPSB0aGlzLmJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKCk7XHJcblxyXG4gICAgLy8gc3RlcCAyLCBjcmVhdGUgdGhlIERPTSBFbGVtZW50IG9mIHRoZSBmaWx0ZXIgJiBpbml0aWFsaXplIGl0IGlmIHNlYXJjaFRlcm0gaXMgZmlsbGVkXHJcbiAgICB0aGlzLiRmaWx0ZXJFbG0gPSB0aGlzLmNyZWF0ZURvbUVsZW1lbnQoZmlsdGVyVGVtcGxhdGUsIHNlYXJjaFRlcm0pO1xyXG5cclxuICAgIC8vIHN0ZXAgMywgc3Vic2NyaWJlIHRvIHRoZSBjaGFuZ2UgZXZlbnQgYW5kIHJ1biB0aGUgY2FsbGJhY2sgd2hlbiB0aGF0IGhhcHBlbnNcclxuICAgIC8vIGFsc28gYWRkL3JlbW92ZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXHJcbiAgICB0aGlzLiRmaWx0ZXJFbG0uY2hhbmdlKChlOiBhbnkpID0+IHtcclxuICAgICAgY29uc3QgdmFsdWUgPSBlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlIHx8ICcnO1xyXG4gICAgICBpZiAodGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQpIHtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrKGUsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgY2xlYXJGaWx0ZXJUcmlnZ2VyZWQ6IHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkLCBzaG91bGRUcmlnZ2VyUXVlcnk6IHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSB9KTtcclxuICAgICAgICB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhbHVlID09PSAnJyA/IHRoaXMuJGZpbHRlckVsbS5yZW1vdmVDbGFzcygnZmlsbGVkJykgOiB0aGlzLiRmaWx0ZXJFbG0uYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBvcGVyYXRvcjogdGhpcy5vcGVyYXRvciwgc2VhcmNoVGVybXM6IFt2YWx1ZV0sIHNob3VsZFRyaWdnZXJRdWVyeTogdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5IH0pO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHJlc2V0IGJvdGggZmxhZ3MgZm9yIG5leHQgdXNlXHJcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHRydWU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBmaWx0ZXIgdmFsdWVzXHJcbiAgICovXHJcbiAgY2xlYXIoc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZSkge1xyXG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSkge1xyXG4gICAgICB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHNob3VsZFRyaWdnZXJRdWVyeTtcclxuICAgICAgdGhpcy5zZWFyY2hUZXJtcyA9IFtdO1xyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0udmFsKCcnKTtcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZGVzdHJveSB0aGUgZmlsdGVyXHJcbiAgICovXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLiRmaWx0ZXJFbG0pIHtcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLm9mZignY2hhbmdlJykucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdmFsdWUocykgb24gdGhlIERPTSBlbGVtZW50XHJcbiAgICovXHJcbiAgc2V0VmFsdWVzKHZhbHVlczogU2VhcmNoVGVybSB8IFNlYXJjaFRlcm1bXSkge1xyXG4gICAgaWYgKHZhbHVlcykge1xyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0udmFsKHZhbHVlcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL1xyXG4gIC8vIHByaXZhdGUgZnVuY3Rpb25zXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIHByaXZhdGUgYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcoKSB7XHJcbiAgICBpZiAoIXRoaXMuY29sdW1uRGVmIHx8ICF0aGlzLmNvbHVtbkRlZi5maWx0ZXIgfHwgIXRoaXMuY29sdW1uRGVmLmZpbHRlci5jb2xsZWN0aW9uKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgW0FuZ3VsYXItU2xpY2tHcmlkXSBZb3UgbmVlZCB0byBwYXNzIGEgXCJjb2xsZWN0aW9uXCIgZm9yIHRoZSBTZWxlY3QgRmlsdGVyIHRvIHdvcmsgY29ycmVjdGx5LiBBbHNvIGVhY2ggb3B0aW9uIHNob3VsZCBpbmNsdWRlIGEgdmFsdWUvbGFiZWwgcGFpciAob3IgdmFsdWUvbGFiZWxLZXkgd2hlbiB1c2luZyBMb2NhbGUpLiBGb3IgZXhhbXBsZTo6IHsgZmlsdGVyOiBtb2RlbDogRmlsdGVycy5zZWxlY3QsIGNvbGxlY3Rpb246IFt7IHZhbHVlOiB0cnVlLCBsYWJlbDogJ1RydWUnIH0sIHsgdmFsdWU6IGZhbHNlLCBsYWJlbDogJ0ZhbHNlJ31dIH1gKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XHJcbiAgICBjb25zdCBvcHRpb25Db2xsZWN0aW9uID0gdGhpcy5jb2x1bW5EZWYuZmlsdGVyLmNvbGxlY3Rpb24gfHwgW107XHJcbiAgICBjb25zdCBsYWJlbE5hbWUgPSAodGhpcy5jb2x1bW5EZWYuZmlsdGVyLmN1c3RvbVN0cnVjdHVyZSkgPyB0aGlzLmNvbHVtbkRlZi5maWx0ZXIuY3VzdG9tU3RydWN0dXJlLmxhYmVsIDogJ2xhYmVsJztcclxuICAgIGNvbnN0IHZhbHVlTmFtZSA9ICh0aGlzLmNvbHVtbkRlZi5maWx0ZXIuY3VzdG9tU3RydWN0dXJlKSA/IHRoaXMuY29sdW1uRGVmLmZpbHRlci5jdXN0b21TdHJ1Y3R1cmUudmFsdWUgOiAndmFsdWUnO1xyXG5cclxuICAgIGxldCBvcHRpb25zID0gJyc7XHJcblxyXG4gICAgLy8gY29sbGVjdGlvbiBjb3VsZCBiZSBhbiBBcnJheSBvZiBTdHJpbmdzIE9SIE9iamVjdHNcclxuICAgIGlmIChvcHRpb25Db2xsZWN0aW9uLmV2ZXJ5KHggPT4gdHlwZW9mIHggPT09ICdzdHJpbmcnKSkge1xyXG4gICAgICBvcHRpb25Db2xsZWN0aW9uLmZvckVhY2goKG9wdGlvbjogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgb3B0aW9ucyArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9ufVwiIGxhYmVsPVwiJHtvcHRpb259XCI+JHtvcHRpb259PC9vcHRpb24+YDtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvcHRpb25Db2xsZWN0aW9uLmZvckVhY2goKG9wdGlvbjogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKCFvcHRpb24gfHwgKG9wdGlvbltsYWJlbE5hbWVdID09PSB1bmRlZmluZWQgJiYgb3B0aW9uLmxhYmVsS2V5ID09PSB1bmRlZmluZWQpKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEEgY29sbGVjdGlvbiB3aXRoIHZhbHVlL2xhYmVsIChvciB2YWx1ZS9sYWJlbEtleSB3aGVuIHVzaW5nIExvY2FsZSkgaXMgcmVxdWlyZWQgdG8gcG9wdWxhdGUgdGhlIFNlbGVjdCBsaXN0LCBmb3IgZXhhbXBsZTo6IHsgZmlsdGVyOiBtb2RlbDogRmlsdGVycy5zZWxlY3QsIGNvbGxlY3Rpb246IFsgeyB2YWx1ZTogJzEnLCBsYWJlbDogJ09uZScgfSBdJylgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbGFiZWxLZXkgPSBvcHRpb24ubGFiZWxLZXkgfHwgb3B0aW9uW2xhYmVsTmFtZV07XHJcbiAgICAgICAgY29uc3QgdGV4dExhYmVsID0gKChvcHRpb24ubGFiZWxLZXkgfHwgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLmVuYWJsZVRyYW5zbGF0ZUxhYmVsKSAmJiB0aGlzLnRyYW5zbGF0ZSAmJiB0eXBlb2YgdGhpcy50cmFuc2xhdGUuaW5zdGFudCA9PT0gJ2Z1bmN0aW9uJykgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KGxhYmVsS2V5IHx8ICcgJykgOiBsYWJlbEtleTtcclxuICAgICAgICBvcHRpb25zICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtvcHRpb25bdmFsdWVOYW1lXX1cIj4ke3RleHRMYWJlbH08L29wdGlvbj5gO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBzZWFyY2gtZmlsdGVyIGZpbHRlci0ke2ZpZWxkSWR9XCI+JHtvcHRpb25zfTwvc2VsZWN0PmA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGcm9tIHRoZSBodG1sIHRlbXBsYXRlIHN0cmluZywgY3JlYXRlIGEgRE9NIGVsZW1lbnRcclxuICAgKiBAcGFyYW0gZmlsdGVyVGVtcGxhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZURvbUVsZW1lbnQoZmlsdGVyVGVtcGxhdGU6IHN0cmluZywgc2VhcmNoVGVybT86IFNlYXJjaFRlcm0pIHtcclxuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcclxuICAgIGNvbnN0ICRoZWFkZXJFbG0gPSB0aGlzLmdyaWQuZ2V0SGVhZGVyUm93Q29sdW1uKGZpZWxkSWQpO1xyXG4gICAgJCgkaGVhZGVyRWxtKS5lbXB0eSgpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIGVsZW1lbnQgJiBhZGQgYW4gSUQgYW5kIGZpbHRlciBjbGFzc1xyXG4gICAgY29uc3QgJGZpbHRlckVsbSA9ICQoZmlsdGVyVGVtcGxhdGUpO1xyXG4gICAgY29uc3Qgc2VhcmNoVGVybUlucHV0ID0gKHNlYXJjaFRlcm0gfHwgJycpIGFzIHN0cmluZztcclxuXHJcbiAgICAkZmlsdGVyRWxtLnZhbChzZWFyY2hUZXJtSW5wdXQpO1xyXG4gICAgJGZpbHRlckVsbS5hdHRyKCdpZCcsIGBmaWx0ZXItJHtmaWVsZElkfWApO1xyXG4gICAgJGZpbHRlckVsbS5kYXRhKCdjb2x1bW5JZCcsIGZpZWxkSWQpO1xyXG5cclxuICAgIC8vIGFwcGVuZCB0aGUgbmV3IERPTSBlbGVtZW50IHRvIHRoZSBoZWFkZXIgcm93XHJcbiAgICBpZiAoJGZpbHRlckVsbSAmJiB0eXBlb2YgJGZpbHRlckVsbS5hcHBlbmRUbyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAkZmlsdGVyRWxtLmFwcGVuZFRvKCRoZWFkZXJFbG0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAkZmlsdGVyRWxtO1xyXG4gIH1cclxufVxyXG4iXX0=