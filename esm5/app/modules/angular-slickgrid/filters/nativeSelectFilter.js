/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { OperatorType, } from './../models/index';
var NativeSelectFilter = /** @class */ (function () {
    function NativeSelectFilter(translate) {
        this.translate = translate;
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
    }
    Object.defineProperty(NativeSelectFilter.prototype, "operator", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) || OperatorType.equal;
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
    NativeSelectFilter.prototype.init = /**
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
        if (typeof searchTerm === 'boolean' || typeof searchTerm === 'number') {
            searchTerm = "" + searchTerm;
        }
        // step 1, create HTML string template
        /** @type {?} */
        var filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
        this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
        // step 3, subscribe to the change event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.change((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var value = e && e.target && e.target.value || '';
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
     * Clear the filter values
     */
    /**
     * Clear the filter values
     * @param {?=} shouldTriggerQuery
     * @return {?}
     */
    NativeSelectFilter.prototype.clear = /**
     * Clear the filter values
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
            this.$filterElm.trigger('change');
        }
    };
    /**
     * destroy the filter
     */
    /**
     * destroy the filter
     * @return {?}
     */
    NativeSelectFilter.prototype.destroy = /**
     * destroy the filter
     * @return {?}
     */
    function () {
        if (this.$filterElm) {
            this.$filterElm.off('change').remove();
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
    NativeSelectFilter.prototype.setValues = /**
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
    // private functions
    // ------------------
    //
    // private functions
    // ------------------
    /**
     * @private
     * @return {?}
     */
    NativeSelectFilter.prototype.buildTemplateHtmlString = 
    //
    // private functions
    // ------------------
    /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.columnDef || !this.columnDef.filter || !this.columnDef.filter.collection) {
            throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" for the Select Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.select, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }");
        }
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        var optionCollection = this.columnDef.filter.collection || [];
        /** @type {?} */
        var labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
        /** @type {?} */
        var valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';
        /** @type {?} */
        var options = '';
        // collection could be an Array of Strings OR Objects
        if (optionCollection.every((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return typeof x === 'string'; }))) {
            optionCollection.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                options += "<option value=\"" + option + "\" label=\"" + option + "\">" + option + "</option>";
            }));
        }
        else {
            optionCollection.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                if (!option || (option[labelName] === undefined && option.labelKey === undefined)) {
                    throw new Error("A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.select, collection: [ { value: '1', label: 'One' } ]')");
                }
                /** @type {?} */
                var labelKey = option.labelKey || option[labelName];
                /** @type {?} */
                var textLabel = ((option.labelKey || _this.columnDef.filter.enableTranslateLabel) && _this.translate && typeof _this.translate.instant === 'function') ? _this.translate.instant(labelKey || ' ') : labelKey;
                options += "<option value=\"" + option[valueName] + "\">" + textLabel + "</option>";
            }));
        }
        return "<select class=\"form-control search-filter filter-" + fieldId + "\">" + options + "</select>";
    };
    /**
     * From the html template string, create a DOM element
     * @param filterTemplate
     */
    /**
     * From the html template string, create a DOM element
     * @private
     * @param {?} filterTemplate
     * @param {?=} searchTerm
     * @return {?}
     */
    NativeSelectFilter.prototype.createDomElement = /**
     * From the html template string, create a DOM element
     * @private
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
        /** @type {?} */
        var searchTermInput = (/** @type {?} */ ((searchTerm || '')));
        $filterElm.val(searchTermInput);
        $filterElm.attr('id', "filter-" + fieldId);
        $filterElm.data('columnId', fieldId);
        // append the new DOM element to the header row
        if ($filterElm && typeof $filterElm.appendTo === 'function') {
            $filterElm.appendTo($headerElm);
        }
        return $filterElm;
    };
    return NativeSelectFilter;
}());
export { NativeSelectFilter };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlU2VsZWN0RmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL25hdGl2ZVNlbGVjdEZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUtMLFlBQVksR0FHYixNQUFNLG1CQUFtQixDQUFDO0FBSzNCO0lBU0UsNEJBQW9CLFNBQTJCO1FBQTNCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBUnZDLDBCQUFxQixHQUFHLEtBQUssQ0FBQztRQUM5Qix3QkFBbUIsR0FBRyxJQUFJLENBQUM7SUFPZ0IsQ0FBQztJQUVwRCxzQkFBSSx3Q0FBUTs7OztRQUFaO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQztRQUMzRyxDQUFDOzs7T0FBQTtJQUVEOztPQUVHOzs7Ozs7SUFDSCxpQ0FBSTs7Ozs7SUFBSixVQUFLLElBQXFCO1FBQTFCLGlCQWlDQztRQWhDQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDOzs7WUFHdEMsVUFBVSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7UUFDL0UsSUFBSSxPQUFP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QyxJQUFJLENBQUMsSUFBSSxFQUFFLFlBQVUsT0FBUyxDQUFDLENBQUM7UUFDM0MsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFckMsK0NBQStDO1FBQy9DLElBQUksVUFBVSxJQUFJLE9BQU8sVUFBVSxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUU7WUFDM0QsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNqQztRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUE5SUQsSUE4SUM7Ozs7Ozs7SUE3SUMsbURBQXNDOzs7OztJQUN0QyxpREFBbUM7O0lBQ25DLHdDQUFnQjs7SUFDaEIsa0NBQVU7O0lBQ1YseUNBQTBCOztJQUMxQix1Q0FBa0I7O0lBQ2xCLHNDQUF5Qjs7Ozs7SUFFYix1Q0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29sdW1uLFxyXG4gIEZpbHRlcixcclxuICBGaWx0ZXJBcmd1bWVudHMsXHJcbiAgRmlsdGVyQ2FsbGJhY2ssXHJcbiAgT3BlcmF0b3JUeXBlLFxyXG4gIE9wZXJhdG9yU3RyaW5nLFxyXG4gIFNlYXJjaFRlcm0sXHJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgTmF0aXZlU2VsZWN0RmlsdGVyIGltcGxlbWVudHMgRmlsdGVyIHtcclxuICBwcml2YXRlIF9jbGVhckZpbHRlclRyaWdnZXJlZCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHRydWU7XHJcbiAgJGZpbHRlckVsbTogYW55O1xyXG4gIGdyaWQ6IGFueTtcclxuICBzZWFyY2hUZXJtczogU2VhcmNoVGVybVtdO1xyXG4gIGNvbHVtbkRlZjogQ29sdW1uO1xyXG4gIGNhbGxiYWNrOiBGaWx0ZXJDYWxsYmFjaztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHsgfVxyXG5cclxuICBnZXQgb3BlcmF0b3IoKTogT3BlcmF0b3JUeXBlIHwgT3BlcmF0b3JTdHJpbmcge1xyXG4gICAgcmV0dXJuICh0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yKSB8fCBPcGVyYXRvclR5cGUuZXF1YWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBGaWx0ZXJcclxuICAgKi9cclxuICBpbml0KGFyZ3M6IEZpbHRlckFyZ3VtZW50cykge1xyXG4gICAgdGhpcy5ncmlkID0gYXJncy5ncmlkO1xyXG4gICAgdGhpcy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2s7XHJcbiAgICB0aGlzLmNvbHVtbkRlZiA9IGFyZ3MuY29sdW1uRGVmO1xyXG4gICAgdGhpcy5zZWFyY2hUZXJtcyA9IGFyZ3Muc2VhcmNoVGVybXMgfHwgW107XHJcblxyXG4gICAgLy8gZmlsdGVyIGlucHV0IGNhbiBvbmx5IGhhdmUgMSBzZWFyY2ggdGVybSwgc28gd2Ugd2lsbCB1c2UgdGhlIDFzdCBhcnJheSBpbmRleCBpZiBpdCBleGlzdFxyXG4gICAgbGV0IHNlYXJjaFRlcm0gPSAoQXJyYXkuaXNBcnJheSh0aGlzLnNlYXJjaFRlcm1zKSAmJiB0aGlzLnNlYXJjaFRlcm1zWzBdKSB8fCAnJztcclxuICAgIGlmICh0eXBlb2Ygc2VhcmNoVGVybSA9PT0gJ2Jvb2xlYW4nIHx8IHR5cGVvZiBzZWFyY2hUZXJtID09PSAnbnVtYmVyJykge1xyXG4gICAgICBzZWFyY2hUZXJtID0gYCR7c2VhcmNoVGVybX1gO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN0ZXAgMSwgY3JlYXRlIEhUTUwgc3RyaW5nIHRlbXBsYXRlXHJcbiAgICBjb25zdCBmaWx0ZXJUZW1wbGF0ZSA9IHRoaXMuYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcoKTtcclxuXHJcbiAgICAvLyBzdGVwIDIsIGNyZWF0ZSB0aGUgRE9NIEVsZW1lbnQgb2YgdGhlIGZpbHRlciAmIGluaXRpYWxpemUgaXQgaWYgc2VhcmNoVGVybSBpcyBmaWxsZWRcclxuICAgIHRoaXMuJGZpbHRlckVsbSA9IHRoaXMuY3JlYXRlRG9tRWxlbWVudChmaWx0ZXJUZW1wbGF0ZSwgc2VhcmNoVGVybSk7XHJcblxyXG4gICAgLy8gc3RlcCAzLCBzdWJzY3JpYmUgdG8gdGhlIGNoYW5nZSBldmVudCBhbmQgcnVuIHRoZSBjYWxsYmFjayB3aGVuIHRoYXQgaGFwcGVuc1xyXG4gICAgLy8gYWxzbyBhZGQvcmVtb3ZlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcclxuICAgIHRoaXMuJGZpbHRlckVsbS5jaGFuZ2UoKGU6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgfHwgJyc7XHJcbiAgICAgIGlmICh0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCkge1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBjbGVhckZpbHRlclRyaWdnZXJlZDogdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQsIHNob3VsZFRyaWdnZXJRdWVyeTogdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5IH0pO1xyXG4gICAgICAgIHRoaXMuJGZpbHRlckVsbS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFsdWUgPT09ICcnID8gdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKSA6IHRoaXMuJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJyk7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIG9wZXJhdG9yOiB0aGlzLm9wZXJhdG9yLCBzZWFyY2hUZXJtczogW3ZhbHVlXSwgc2hvdWxkVHJpZ2dlclF1ZXJ5OiB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgfSk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gcmVzZXQgYm90aCBmbGFncyBmb3IgbmV4dCB1c2VcclxuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIGZpbHRlciB2YWx1ZXNcclxuICAgKi9cclxuICBjbGVhcihzaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlKSB7XHJcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtKSB7XHJcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gc2hvdWxkVHJpZ2dlclF1ZXJ5O1xyXG4gICAgICB0aGlzLnNlYXJjaFRlcm1zID0gW107XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS52YWwoJycpO1xyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0udHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBkZXN0cm95IHRoZSBmaWx0ZXJcclxuICAgKi9cclxuICBkZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSkge1xyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ub2ZmKCdjaGFuZ2UnKS5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB2YWx1ZShzKSBvbiB0aGUgRE9NIGVsZW1lbnRcclxuICAgKi9cclxuICBzZXRWYWx1ZXModmFsdWVzOiBTZWFyY2hUZXJtIHwgU2VhcmNoVGVybVtdKSB7XHJcbiAgICBpZiAodmFsdWVzKSB7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS52YWwodmFsdWVzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vXHJcbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgcHJpdmF0ZSBidWlsZFRlbXBsYXRlSHRtbFN0cmluZygpIHtcclxuICAgIGlmICghdGhpcy5jb2x1bW5EZWYgfHwgIXRoaXMuY29sdW1uRGVmLmZpbHRlciB8fCAhdGhpcy5jb2x1bW5EZWYuZmlsdGVyLmNvbGxlY3Rpb24pIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbQW5ndWxhci1TbGlja0dyaWRdIFlvdSBuZWVkIHRvIHBhc3MgYSBcImNvbGxlY3Rpb25cIiBmb3IgdGhlIFNlbGVjdCBGaWx0ZXIgdG8gd29yayBjb3JyZWN0bHkuIEFsc28gZWFjaCBvcHRpb24gc2hvdWxkIGluY2x1ZGUgYSB2YWx1ZS9sYWJlbCBwYWlyIChvciB2YWx1ZS9sYWJlbEtleSB3aGVuIHVzaW5nIExvY2FsZSkuIEZvciBleGFtcGxlOjogeyBmaWx0ZXI6IG1vZGVsOiBGaWx0ZXJzLnNlbGVjdCwgY29sbGVjdGlvbjogW3sgdmFsdWU6IHRydWUsIGxhYmVsOiAnVHJ1ZScgfSwgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiAnRmFsc2UnfV0gfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcclxuICAgIGNvbnN0IG9wdGlvbkNvbGxlY3Rpb24gPSB0aGlzLmNvbHVtbkRlZi5maWx0ZXIuY29sbGVjdGlvbiB8fCBbXTtcclxuICAgIGNvbnN0IGxhYmVsTmFtZSA9ICh0aGlzLmNvbHVtbkRlZi5maWx0ZXIuY3VzdG9tU3RydWN0dXJlKSA/IHRoaXMuY29sdW1uRGVmLmZpbHRlci5jdXN0b21TdHJ1Y3R1cmUubGFiZWwgOiAnbGFiZWwnO1xyXG4gICAgY29uc3QgdmFsdWVOYW1lID0gKHRoaXMuY29sdW1uRGVmLmZpbHRlci5jdXN0b21TdHJ1Y3R1cmUpID8gdGhpcy5jb2x1bW5EZWYuZmlsdGVyLmN1c3RvbVN0cnVjdHVyZS52YWx1ZSA6ICd2YWx1ZSc7XHJcblxyXG4gICAgbGV0IG9wdGlvbnMgPSAnJztcclxuXHJcbiAgICAvLyBjb2xsZWN0aW9uIGNvdWxkIGJlIGFuIEFycmF5IG9mIFN0cmluZ3MgT1IgT2JqZWN0c1xyXG4gICAgaWYgKG9wdGlvbkNvbGxlY3Rpb24uZXZlcnkoeCA9PiB0eXBlb2YgeCA9PT0gJ3N0cmluZycpKSB7XHJcbiAgICAgIG9wdGlvbkNvbGxlY3Rpb24uZm9yRWFjaCgob3B0aW9uOiBzdHJpbmcpID0+IHtcclxuICAgICAgICBvcHRpb25zICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtvcHRpb259XCIgbGFiZWw9XCIke29wdGlvbn1cIj4ke29wdGlvbn08L29wdGlvbj5gO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9wdGlvbkNvbGxlY3Rpb24uZm9yRWFjaCgob3B0aW9uOiBhbnkpID0+IHtcclxuICAgICAgICBpZiAoIW9wdGlvbiB8fCAob3B0aW9uW2xhYmVsTmFtZV0gPT09IHVuZGVmaW5lZCAmJiBvcHRpb24ubGFiZWxLZXkgPT09IHVuZGVmaW5lZCkpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQSBjb2xsZWN0aW9uIHdpdGggdmFsdWUvbGFiZWwgKG9yIHZhbHVlL2xhYmVsS2V5IHdoZW4gdXNpbmcgTG9jYWxlKSBpcyByZXF1aXJlZCB0byBwb3B1bGF0ZSB0aGUgU2VsZWN0IGxpc3QsIGZvciBleGFtcGxlOjogeyBmaWx0ZXI6IG1vZGVsOiBGaWx0ZXJzLnNlbGVjdCwgY29sbGVjdGlvbjogWyB7IHZhbHVlOiAnMScsIGxhYmVsOiAnT25lJyB9IF0nKWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsYWJlbEtleSA9IG9wdGlvbi5sYWJlbEtleSB8fCBvcHRpb25bbGFiZWxOYW1lXTtcclxuICAgICAgICBjb25zdCB0ZXh0TGFiZWwgPSAoKG9wdGlvbi5sYWJlbEtleSB8fCB0aGlzLmNvbHVtbkRlZi5maWx0ZXIuZW5hYmxlVHJhbnNsYXRlTGFiZWwpICYmIHRoaXMudHJhbnNsYXRlICYmIHR5cGVvZiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50ID09PSAnZnVuY3Rpb24nKSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQobGFiZWxLZXkgfHwgJyAnKSA6IGxhYmVsS2V5O1xyXG4gICAgICAgIG9wdGlvbnMgKz0gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvblt2YWx1ZU5hbWVdfVwiPiR7dGV4dExhYmVsfTwvb3B0aW9uPmA7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIHNlYXJjaC1maWx0ZXIgZmlsdGVyLSR7ZmllbGRJZH1cIj4ke29wdGlvbnN9PC9zZWxlY3Q+YDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZyb20gdGhlIGh0bWwgdGVtcGxhdGUgc3RyaW5nLCBjcmVhdGUgYSBET00gZWxlbWVudFxyXG4gICAqIEBwYXJhbSBmaWx0ZXJUZW1wbGF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlRG9tRWxlbWVudChmaWx0ZXJUZW1wbGF0ZTogc3RyaW5nLCBzZWFyY2hUZXJtPzogU2VhcmNoVGVybSkge1xyXG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xyXG4gICAgY29uc3QgJGhlYWRlckVsbSA9IHRoaXMuZ3JpZC5nZXRIZWFkZXJSb3dDb2x1bW4oZmllbGRJZCk7XHJcbiAgICAkKCRoZWFkZXJFbG0pLmVtcHR5KCk7XHJcblxyXG4gICAgLy8gY3JlYXRlIHRoZSBET00gZWxlbWVudCAmIGFkZCBhbiBJRCBhbmQgZmlsdGVyIGNsYXNzXHJcbiAgICBjb25zdCAkZmlsdGVyRWxtID0gJChmaWx0ZXJUZW1wbGF0ZSk7XHJcbiAgICBjb25zdCBzZWFyY2hUZXJtSW5wdXQgPSAoc2VhcmNoVGVybSB8fCAnJykgYXMgc3RyaW5nO1xyXG5cclxuICAgICRmaWx0ZXJFbG0udmFsKHNlYXJjaFRlcm1JbnB1dCk7XHJcbiAgICAkZmlsdGVyRWxtLmF0dHIoJ2lkJywgYGZpbHRlci0ke2ZpZWxkSWR9YCk7XHJcbiAgICAkZmlsdGVyRWxtLmRhdGEoJ2NvbHVtbklkJywgZmllbGRJZCk7XHJcblxyXG4gICAgLy8gYXBwZW5kIHRoZSBuZXcgRE9NIGVsZW1lbnQgdG8gdGhlIGhlYWRlciByb3dcclxuICAgIGlmICgkZmlsdGVyRWxtICYmIHR5cGVvZiAkZmlsdGVyRWxtLmFwcGVuZFRvID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICRmaWx0ZXJFbG0uYXBwZW5kVG8oJGhlYWRlckVsbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICRmaWx0ZXJFbG07XHJcbiAgfVxyXG59XHJcbiJdfQ==