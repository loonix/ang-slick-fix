/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OperatorType } from './../models/index';
import { CollectionService } from '../services/collection.service';
import { getDescendantProperty, castToPromise } from '../services/utilities';
import { Subject } from 'rxjs';
export class AutoCompleteFilter {
    /**
     * Initialize the Filter
     * @param {?} translate
     * @param {?} collectionService
     */
    constructor(translate, collectionService) {
        this.translate = translate;
        this.collectionService = collectionService;
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
        this.isFilled = false;
        /**
         * The property name for values in the collection
         */
        this.valueName = 'label';
        this.enableTranslateLabel = false;
        this.subscriptions = [];
    }
    /**
     * Getter for the Collection Options
     * @protected
     * @return {?}
     */
    get collectionOptions() {
        return this.columnDef && this.columnDef.filter && this.columnDef.filter.collectionOptions || {};
    }
    /**
     * Getter for the Column Filter
     * @return {?}
     */
    get columnFilter() {
        return this.columnDef && this.columnDef.filter || {};
    }
    /**
     * Getter for the Custom Structure if exist
     * @return {?}
     */
    get customStructure() {
        return this.columnDef && this.columnDef.filter && this.columnDef.filter.customStructure;
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @return {?}
     */
    get gridOptions() {
        return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
    }
    /**
     * Getter of the Operator to use when doing the filter comparing
     * @return {?}
     */
    get operator() {
        return this.columnDef && this.columnDef.filter && this.columnDef.filter.operator || OperatorType.equal;
    }
    /**
     * Initialize the filter template
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
        if (!this.grid || !this.columnDef || !this.columnFilter || (!this.columnFilter.collection && !this.columnFilter.collectionAsync && !this.columnFilter.filterOptions)) {
            throw new Error(`[Angular-SlickGrid] You need to pass a "collection" (or "collectionAsync") for the AutoComplete Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.autoComplete, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }`);
        }
        this.enableTranslateLabel = this.columnFilter && this.columnFilter.enableTranslateLabel || false;
        this.labelName = this.customStructure && this.customStructure.label || 'label';
        this.valueName = this.customStructure && this.customStructure.value || 'value';
        // always render the DOM element, even if user passed a "collectionAsync",
        /** @type {?} */
        const newCollection = this.columnFilter.collection || [];
        this.renderDomElement(newCollection);
        // on every Filter which have a "collection" or a "collectionAsync"
        // we will add (or replace) a Subject to the "collectionAsync" property so that user has possibility to change the collection
        // if "collectionAsync" is already set by the user, it will resolve it first then after it will replace it with a Subject
        /** @type {?} */
        const collectionAsync = this.columnFilter && this.columnFilter.collectionAsync;
        if (collectionAsync) {
            this.renderOptionsAsync(collectionAsync); // create Subject after resolve (createCollectionAsyncSubject)
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
     * user might want to filter certain items of the collection
     * @protected
     * @param {?} inputCollection
     * @return {?} outputCollection filtered and/or sorted collection
     */
    filterCollection(inputCollection) {
        /** @type {?} */
        let outputCollection = inputCollection;
        // user might want to filter certain items of the collection
        if (this.columnFilter && this.columnFilter.collectionFilterBy) {
            /** @type {?} */
            const filterBy = this.columnFilter.collectionFilterBy;
            /** @type {?} */
            const filterCollectionBy = this.columnFilter.collectionOptions && this.columnFilter.collectionOptions.filterResultAfterEachPass || null;
            outputCollection = this.collectionService.filterCollection(outputCollection, filterBy, filterCollectionBy);
        }
        return outputCollection;
    }
    /**
     * user might want to sort the collection in a certain way
     * @protected
     * @param {?} inputCollection
     * @return {?} outputCollection filtered and/or sorted collection
     */
    sortCollection(inputCollection) {
        /** @type {?} */
        let outputCollection = inputCollection;
        // user might want to sort the collection
        if (this.columnFilter && this.columnFilter.collectionSortBy) {
            /** @type {?} */
            const sortBy = this.columnFilter.collectionSortBy;
            outputCollection = this.collectionService.sortCollection(this.columnDef, outputCollection, sortBy, this.enableTranslateLabel);
        }
        return outputCollection;
    }
    /**
     * @protected
     * @param {?} collectionAsync
     * @return {?}
     */
    renderOptionsAsync(collectionAsync) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let awaitedCollection = [];
            if (collectionAsync) {
                awaitedCollection = yield castToPromise(collectionAsync);
                this.renderDomElementFromCollectionAsync(awaitedCollection);
                // because we accept Promises & HttpClient Observable only execute once
                // we will re-create an RxJs Subject which will replace the "collectionAsync" which got executed once anyway
                // doing this provide the user a way to call a "collectionAsync.next()"
                this.createCollectionAsyncSubject();
            }
        });
    }
    /**
     * Create or recreate an Observable Subject and reassign it to the "collectionAsync" object so user can call a "collectionAsync.next()" on it
     * @protected
     * @return {?}
     */
    createCollectionAsyncSubject() {
        /** @type {?} */
        const newCollectionAsync = new Subject();
        this.columnFilter.collectionAsync = newCollectionAsync;
        this.subscriptions.push(newCollectionAsync.subscribe((/**
         * @param {?} collection
         * @return {?}
         */
        collection => this.renderDomElementFromCollectionAsync(collection))));
    }
    /**
     * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
     * and reinitialize filter collection with this new collection
     * @protected
     * @param {?} collection
     * @return {?}
     */
    renderDomElementFromCollectionAsync(collection) {
        if (this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
            collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
        }
        if (!Array.isArray(collection)) {
            throw new Error('Something went wrong while trying to pull the collection from the "collectionAsync" call in the AutoComplete Filter, the collection is not a valid array.');
        }
        // copy over the array received from the async call to the "collection" as the new collection to use
        // this has to be BEFORE the `collectionObserver().subscribe` to avoid going into an infinite loop
        this.columnFilter.collection = collection;
        // recreate Filter DOM element after getting async collection
        this.renderDomElement(collection);
    }
    /**
     * @protected
     * @param {?} collection
     * @return {?}
     */
    renderDomElement(collection) {
        if (!Array.isArray(collection) && this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
            collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
        }
        if (!Array.isArray(collection)) {
            throw new Error('The "collection" passed to the Autocomplete Filter is not a valid array');
        }
        // assign the collection to a temp variable before filtering/sorting the collection
        /** @type {?} */
        let newCollection = collection;
        // user might want to filter and/or sort certain items of the collection
        newCollection = this.filterCollection(newCollection);
        newCollection = this.sortCollection(newCollection);
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        /** @type {?} */
        const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        // step 1, create HTML string template
        /** @type {?} */
        const filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & pre-load search term
        // also subscribe to the onClose event
        this.$filterElm = this.createDomElement(filterTemplate, newCollection, searchTerm);
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
                if (value === '') {
                    this.$filterElm.removeClass('filled');
                    this.callback(e, { columnDef: this.columnDef, operator: this.operator, searchTerms: [value], shouldTriggerQuery: this._shouldTriggerQuery });
                }
                else {
                    this.$filterElm.addClass('filled');
                }
            }
            // reset both flags for next use
            this._clearFilterTriggered = false;
            this._shouldTriggerQuery = true;
        }));
    }
    /**
     * Create the HTML template as a string
     * @private
     * @return {?}
     */
    buildTemplateHtmlString() {
        /** @type {?} */
        const columnId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        let placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        if (this.columnFilter && this.columnFilter.placeholder) {
            placeholder = this.columnFilter.placeholder;
        }
        return `<input type="text" role="presentation" autocomplete="off" class="form-control autocomplete search-filter filter-${columnId}" placeholder="${placeholder}">`;
    }
    /**
     * From the html template string, create a DOM element
     * @private
     * @param {?} filterTemplate
     * @param {?} collection
     * @param {?=} searchTerm
     * @return {?}
     */
    createDomElement(filterTemplate, collection, searchTerm) {
        /** @type {?} */
        const columnId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        const $headerElm = this.grid.getHeaderRowColumn(columnId);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        /** @type {?} */
        const $filterElm = (/** @type {?} */ ($(filterTemplate)));
        /** @type {?} */
        const searchTermInput = (/** @type {?} */ (searchTerm));
        // user might provide his own custom structure
        // jQuery UI autocomplete requires a label/value pair, so we must remap them when user provide different ones
        if (Array.isArray(collection) && this.customStructure) {
            collection = collection.map((/**
             * @param {?} item
             * @return {?}
             */
            (item) => {
                return { label: item[this.labelName], value: item[this.valueName] };
            }));
        }
        // user might pass his own autocomplete options
        /** @type {?} */
        const autoCompleteOptions = this.columnFilter.filterOptions;
        // when user passes it's own autocomplete options
        // we still need to provide our own "select" callback implementation
        if (autoCompleteOptions) {
            autoCompleteOptions.select = (/**
             * @param {?} event
             * @param {?} ui
             * @return {?}
             */
            (event, ui) => this.onSelect(event, ui));
            $filterElm.autocomplete(autoCompleteOptions);
        }
        else {
            if (!Array.isArray(collection)) {
                throw new Error('AutoComplete default implementation requires a "collection" or "collectionAsync" to be provided for the filter to work properly');
            }
            $filterElm.autocomplete({
                minLength: 0,
                source: collection,
                select: (/**
                 * @param {?} event
                 * @param {?} ui
                 * @return {?}
                 */
                (event, ui) => this.onSelect(event, ui)),
            });
        }
        $filterElm.val(searchTermInput);
        $filterElm.attr('id', `filter-${columnId}`);
        $filterElm.data('columnId', columnId);
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
    //
    // private functions
    // ------------------
    /**
     * @private
     * @param {?} event
     * @param {?} ui
     * @return {?}
     */
    onSelect(event, ui) {
        if (ui && ui.item) {
            /** @type {?} */
            const itemLabel = typeof ui.item === 'string' ? ui.item : ui.item.label;
            /** @type {?} */
            const itemValue = typeof ui.item === 'string' ? ui.item : ui.item.value;
            this.$filterElm.val(itemLabel);
            this.callback(event, { columnDef: this.columnDef, operator: this.operator, searchTerms: [itemValue], shouldTriggerQuery: this._shouldTriggerQuery });
            // reset both flags for next use
            this._clearFilterTriggered = false;
            this._shouldTriggerQuery = true;
        }
        return false;
    }
}
AutoCompleteFilter.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AutoCompleteFilter.ctorParameters = () => [
    { type: TranslateService },
    { type: CollectionService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    AutoCompleteFilter.prototype._clearFilterTriggered;
    /**
     * @type {?}
     * @private
     */
    AutoCompleteFilter.prototype._shouldTriggerQuery;
    /**
     * DOM Element Name, useful for auto-detecting positioning (dropup / dropdown)
     * @type {?}
     */
    AutoCompleteFilter.prototype.elementName;
    /**
     * The JQuery DOM element
     * @type {?}
     */
    AutoCompleteFilter.prototype.$filterElm;
    /** @type {?} */
    AutoCompleteFilter.prototype.grid;
    /** @type {?} */
    AutoCompleteFilter.prototype.searchTerms;
    /** @type {?} */
    AutoCompleteFilter.prototype.columnDef;
    /** @type {?} */
    AutoCompleteFilter.prototype.callback;
    /** @type {?} */
    AutoCompleteFilter.prototype.isFilled;
    /**
     * The property name for labels in the collection
     * @type {?}
     */
    AutoCompleteFilter.prototype.labelName;
    /**
     * The property name for values in the collection
     * @type {?}
     */
    AutoCompleteFilter.prototype.optionLabel;
    /**
     * The property name for values in the collection
     * @type {?}
     */
    AutoCompleteFilter.prototype.valueName;
    /** @type {?} */
    AutoCompleteFilter.prototype.enableTranslateLabel;
    /** @type {?} */
    AutoCompleteFilter.prototype.subscriptions;
    /**
     * @type {?}
     * @protected
     */
    AutoCompleteFilter.prototype.translate;
    /**
     * @type {?}
     * @protected
     */
    AutoCompleteFilter.prototype.collectionService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b0NvbXBsZXRlRmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL2F1dG9Db21wbGV0ZUZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQVNMLFlBQVksRUFHYixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RSxPQUFPLEVBQWdCLE9BQU8sRUFBYyxNQUFNLE1BQU0sQ0FBQztBQU16RCxNQUFNLE9BQU8sa0JBQWtCOzs7Ozs7SUErQjdCLFlBQXNCLFNBQTJCLEVBQVksaUJBQW9DO1FBQTNFLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQVksc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQTlCekYsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQVluQyxhQUFRLEdBQUcsS0FBSyxDQUFDOzs7O1FBU2pCLGNBQVMsR0FBRyxPQUFPLENBQUM7UUFFcEIseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzdCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztJQUtrRSxDQUFDOzs7Ozs7SUFHdEcsSUFBYyxpQkFBaUI7UUFDN0IsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlCQUFpQixJQUFJLEVBQUUsQ0FBQztJQUNsRyxDQUFDOzs7OztJQUdELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDdkQsQ0FBQzs7Ozs7SUFHRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUMxRixDQUFDOzs7OztJQUdELElBQUksV0FBVztRQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMzRSxDQUFDOzs7OztJQUdELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQztJQUN6RyxDQUFDOzs7Ozs7SUFLRCxJQUFJLENBQUMsSUFBcUI7UUFDeEIsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsaUZBQWlGLENBQUMsQ0FBQztTQUNwRztRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7UUFFMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDcEssTUFBTSxJQUFJLEtBQUssQ0FBQywwVkFBMFYsQ0FBQyxDQUFDO1NBQzdXO1FBRUQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsSUFBSSxLQUFLLENBQUM7UUFDakcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQztRQUMvRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDOzs7Y0FHekUsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxJQUFJLEVBQUU7UUFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7OztjQUsvQixlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWU7UUFDOUUsSUFBSSxlQUFlLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsOERBQThEO1NBQ3pHO0lBQ0gsQ0FBQzs7Ozs7O0lBS0QsS0FBSyxDQUFDLGtCQUFrQixHQUFHLElBQUk7UUFDN0IsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7WUFDbEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDO1lBQzlDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQzs7Ozs7SUFLRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDcEQ7SUFDSCxDQUFDOzs7Ozs7SUFLRCxTQUFTLENBQUMsTUFBaUM7UUFDekMsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM3QjtJQUNILENBQUM7Ozs7Ozs7Ozs7SUFXUyxnQkFBZ0IsQ0FBQyxlQUFzQjs7WUFDM0MsZ0JBQWdCLEdBQUcsZUFBZTtRQUV0Qyw0REFBNEQ7UUFDNUQsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUU7O2tCQUN2RCxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0I7O2tCQUMvQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMseUJBQXlCLElBQUksSUFBSTtZQUN2SSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7U0FDNUc7UUFFRCxPQUFPLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7Ozs7Ozs7SUFPUyxjQUFjLENBQUMsZUFBc0I7O1lBQ3pDLGdCQUFnQixHQUFHLGVBQWU7UUFFdEMseUNBQXlDO1FBQ3pDLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFOztrQkFDckQsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCO1lBQ2pELGdCQUFnQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDL0g7UUFFRCxPQUFPLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7Ozs7OztJQUVlLGtCQUFrQixDQUFDLGVBQThEOzs7Z0JBQzNGLGlCQUFpQixHQUFRLEVBQUU7WUFFL0IsSUFBSSxlQUFlLEVBQUU7Z0JBQ25CLGlCQUFpQixHQUFHLE1BQU0sYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLENBQUMsbUNBQW1DLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFFNUQsdUVBQXVFO2dCQUN2RSw0R0FBNEc7Z0JBQzVHLHVFQUF1RTtnQkFDdkUsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7YUFDckM7UUFDSCxDQUFDO0tBQUE7Ozs7OztJQUdTLDRCQUE0Qjs7Y0FDOUIsa0JBQWtCLEdBQUcsSUFBSSxPQUFPLEVBQU87UUFDN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEdBQUcsa0JBQWtCLENBQUM7UUFDdkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLGtCQUFrQixDQUFDLFNBQVM7Ozs7UUFBQyxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxVQUFVLENBQUMsRUFBQyxDQUNqRyxDQUFDO0lBQ0osQ0FBQzs7Ozs7Ozs7SUFNUyxtQ0FBbUMsQ0FBQyxVQUFVO1FBQ3RELElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQywwQkFBMEIsRUFBRTtZQUMvRSxVQUFVLEdBQUcscUJBQXFCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1NBQ25HO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQywySkFBMkosQ0FBQyxDQUFDO1NBQzlLO1FBRUQsb0dBQW9HO1FBQ3BHLGtHQUFrRztRQUNsRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFFMUMsNkRBQTZEO1FBQzdELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7SUFFUyxnQkFBZ0IsQ0FBQyxVQUFpQjtRQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLDBCQUEwQixFQUFFO1lBQzdHLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLDBCQUEwQixDQUFDLENBQUM7U0FDbkc7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLHlFQUF5RSxDQUFDLENBQUM7U0FDNUY7OztZQUdHLGFBQWEsR0FBRyxVQUFVO1FBRTlCLHdFQUF3RTtRQUN4RSxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JELGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7Y0FHN0MsVUFBVSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7OztjQUczRSxjQUFjLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFO1FBRXJELHNFQUFzRTtRQUN0RSxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVuRiw4RUFBOEU7UUFDOUUsc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLG9CQUFvQjs7OztRQUFFLENBQUMsQ0FBTSxFQUFFLEVBQUU7O2dCQUM5QyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRTs7a0JBQzNDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsMEJBQTBCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0I7WUFDbEgsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksb0JBQW9CLEVBQUU7Z0JBQ3JELEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDdEI7WUFFRCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLENBQUMscUJBQXFCLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztnQkFDaEosSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDdkM7aUJBQU07Z0JBQ0wsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO29CQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO2lCQUM5STtxQkFBTTtvQkFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDcEM7YUFDRjtZQUNELGdDQUFnQztZQUNoQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1lBQ25DLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDbEMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFLTyx1QkFBdUI7O2NBQ3ZCLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTs7WUFDaEQsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsd0JBQXdCLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDN0YsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFO1lBQ3RELFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQztTQUM3QztRQUNELE9BQU8sbUhBQW1ILFFBQVEsa0JBQWtCLFdBQVcsSUFBSSxDQUFDO0lBQ3RLLENBQUM7Ozs7Ozs7OztJQU1PLGdCQUFnQixDQUFDLGNBQXNCLEVBQUUsVUFBaUIsRUFBRSxVQUF1Qjs7Y0FDbkYsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFOztjQUM5QyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUM7UUFDekQsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDOzs7Y0FHaEIsVUFBVSxHQUFHLG1CQUFBLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBTzs7Y0FDckMsZUFBZSxHQUFHLG1CQUFBLFVBQVUsRUFBVTtRQUU1Qyw4Q0FBOEM7UUFDOUMsNkdBQTZHO1FBQzdHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3JELFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRzs7OztZQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ25DLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ3RFLENBQUMsRUFBQyxDQUFDO1NBQ0o7OztjQUdLLG1CQUFtQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYTtRQUUzRCxpREFBaUQ7UUFDakQsb0VBQW9FO1FBQ3BFLElBQUksbUJBQW1CLEVBQUU7WUFDdkIsbUJBQW1CLENBQUMsTUFBTTs7Ozs7WUFBRyxDQUFDLEtBQVksRUFBRSxFQUFPLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFBLENBQUM7WUFDakYsVUFBVSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQzlDO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpSUFBaUksQ0FBQyxDQUFDO2FBQ3BKO1lBRUQsVUFBVSxDQUFDLFlBQVksQ0FBQztnQkFDdEIsU0FBUyxFQUFFLENBQUM7Z0JBQ1osTUFBTSxFQUFFLFVBQVU7Z0JBQ2xCLE1BQU07Ozs7O2dCQUFFLENBQUMsS0FBWSxFQUFFLEVBQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUE7YUFDNUQsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxVQUFVLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2hDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUM1QyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUV0QyxnRkFBZ0Y7UUFDaEYsSUFBSSxVQUFVLEVBQUU7WUFDZCxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9CO1FBRUQsK0NBQStDO1FBQy9DLElBQUksVUFBVSxJQUFJLE9BQU8sVUFBVSxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUU7WUFDM0QsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNqQztRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Ozs7Ozs7Ozs7SUFNTyxRQUFRLENBQUMsS0FBWSxFQUFFLEVBQU87UUFDcEMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRTs7a0JBQ1gsU0FBUyxHQUFHLE9BQU8sRUFBRSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSzs7a0JBQ2pFLFNBQVMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUs7WUFDdkUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1lBQ3JKLGdDQUFnQztZQUNoQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1lBQ25DLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7U0FDakM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7OztZQXJWRixVQUFVOzs7O1lBckJGLGdCQUFnQjtZQWNoQixpQkFBaUI7Ozs7Ozs7SUFTeEIsbURBQXNDOzs7OztJQUN0QyxpREFBbUM7Ozs7O0lBR25DLHlDQUFvQjs7Ozs7SUFHcEIsd0NBQWdCOztJQUVoQixrQ0FBVTs7SUFDVix5Q0FBMEI7O0lBQzFCLHVDQUFrQjs7SUFDbEIsc0NBQXlCOztJQUN6QixzQ0FBaUI7Ozs7O0lBR2pCLHVDQUFrQjs7Ozs7SUFHbEIseUNBQW9COzs7OztJQUdwQix1Q0FBb0I7O0lBRXBCLGtEQUE2Qjs7SUFDN0IsMkNBQW1DOzs7OztJQUt2Qix1Q0FBcUM7Ozs7O0lBQUUsK0NBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29sbGVjdGlvbkN1c3RvbVN0cnVjdHVyZSxcbiAgQ29sbGVjdGlvbk9wdGlvbixcbiAgQ29sdW1uLFxuICBDb2x1bW5GaWx0ZXIsXG4gIEZpbHRlcixcbiAgRmlsdGVyQXJndW1lbnRzLFxuICBGaWx0ZXJDYWxsYmFjayxcbiAgR3JpZE9wdGlvbixcbiAgT3BlcmF0b3JUeXBlLFxuICBPcGVyYXRvclN0cmluZyxcbiAgU2VhcmNoVGVybVxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NvbGxlY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBnZXREZXNjZW5kYW50UHJvcGVydHksIGNhc3RUb1Byb21pc2UgfSBmcm9tICcuLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dG9Db21wbGV0ZUZpbHRlciBpbXBsZW1lbnRzIEZpbHRlciB7XG4gIHByaXZhdGUgX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XG4gIHByaXZhdGUgX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHRydWU7XG5cbiAgLyoqIERPTSBFbGVtZW50IE5hbWUsIHVzZWZ1bCBmb3IgYXV0by1kZXRlY3RpbmcgcG9zaXRpb25pbmcgKGRyb3B1cCAvIGRyb3Bkb3duKSAqL1xuICBlbGVtZW50TmFtZTogc3RyaW5nO1xuXG4gIC8qKiBUaGUgSlF1ZXJ5IERPTSBlbGVtZW50ICovXG4gICRmaWx0ZXJFbG06IGFueTtcblxuICBncmlkOiBhbnk7XG4gIHNlYXJjaFRlcm1zOiBTZWFyY2hUZXJtW107XG4gIGNvbHVtbkRlZjogQ29sdW1uO1xuICBjYWxsYmFjazogRmlsdGVyQ2FsbGJhY2s7XG4gIGlzRmlsbGVkID0gZmFsc2U7XG5cbiAgLyoqIFRoZSBwcm9wZXJ0eSBuYW1lIGZvciBsYWJlbHMgaW4gdGhlIGNvbGxlY3Rpb24gKi9cbiAgbGFiZWxOYW1lOiBzdHJpbmc7XG5cbiAgLyoqIFRoZSBwcm9wZXJ0eSBuYW1lIGZvciB2YWx1ZXMgaW4gdGhlIGNvbGxlY3Rpb24gKi9cbiAgb3B0aW9uTGFiZWw6IHN0cmluZztcblxuICAvKiogVGhlIHByb3BlcnR5IG5hbWUgZm9yIHZhbHVlcyBpbiB0aGUgY29sbGVjdGlvbiAqL1xuICB2YWx1ZU5hbWUgPSAnbGFiZWwnO1xuXG4gIGVuYWJsZVRyYW5zbGF0ZUxhYmVsID0gZmFsc2U7XG4gIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIEZpbHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSwgcHJvdGVjdGVkIGNvbGxlY3Rpb25TZXJ2aWNlOiBDb2xsZWN0aW9uU2VydmljZSkgeyB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIENvbGxlY3Rpb24gT3B0aW9ucyAqL1xuICBwcm90ZWN0ZWQgZ2V0IGNvbGxlY3Rpb25PcHRpb25zKCk6IENvbGxlY3Rpb25PcHRpb24ge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLmNvbGxlY3Rpb25PcHRpb25zIHx8IHt9O1xuICB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIENvbHVtbiBGaWx0ZXIgKi9cbiAgZ2V0IGNvbHVtbkZpbHRlcigpOiBDb2x1bW5GaWx0ZXIge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgfHwge307XG4gIH1cblxuICAvKiogR2V0dGVyIGZvciB0aGUgQ3VzdG9tIFN0cnVjdHVyZSBpZiBleGlzdCAqL1xuICBnZXQgY3VzdG9tU3RydWN0dXJlKCk6IENvbGxlY3Rpb25DdXN0b21TdHJ1Y3R1cmUgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLmN1c3RvbVN0cnVjdHVyZTtcbiAgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXG4gIGdldCBncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcbiAgICByZXR1cm4gKHRoaXMuZ3JpZCAmJiB0aGlzLmdyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLmdyaWQuZ2V0T3B0aW9ucygpIDoge307XG4gIH1cblxuICAvKiogR2V0dGVyIG9mIHRoZSBPcGVyYXRvciB0byB1c2Ugd2hlbiBkb2luZyB0aGUgZmlsdGVyIGNvbXBhcmluZyAqL1xuICBnZXQgb3BlcmF0b3IoKTogT3BlcmF0b3JUeXBlIHwgT3BlcmF0b3JTdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yIHx8IE9wZXJhdG9yVHlwZS5lcXVhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBmaWx0ZXIgdGVtcGxhdGVcbiAgICovXG4gIGluaXQoYXJnczogRmlsdGVyQXJndW1lbnRzKSB7XG4gICAgaWYgKCFhcmdzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tBbmd1bGFyLVNsaWNrR3JpZF0gQSBmaWx0ZXIgbXVzdCBhbHdheXMgaGF2ZSBhbiBcImluaXQoKVwiIHdpdGggdmFsaWQgYXJndW1lbnRzLicpO1xuICAgIH1cbiAgICB0aGlzLmdyaWQgPSBhcmdzLmdyaWQ7XG4gICAgdGhpcy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2s7XG4gICAgdGhpcy5jb2x1bW5EZWYgPSBhcmdzLmNvbHVtbkRlZjtcbiAgICB0aGlzLnNlYXJjaFRlcm1zID0gYXJncy5zZWFyY2hUZXJtcyB8fCBbXTtcblxuICAgIGlmICghdGhpcy5ncmlkIHx8ICF0aGlzLmNvbHVtbkRlZiB8fCAhdGhpcy5jb2x1bW5GaWx0ZXIgfHwgKCF0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uICYmICF0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uQXN5bmMgJiYgIXRoaXMuY29sdW1uRmlsdGVyLmZpbHRlck9wdGlvbnMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFtBbmd1bGFyLVNsaWNrR3JpZF0gWW91IG5lZWQgdG8gcGFzcyBhIFwiY29sbGVjdGlvblwiIChvciBcImNvbGxlY3Rpb25Bc3luY1wiKSBmb3IgdGhlIEF1dG9Db21wbGV0ZSBGaWx0ZXIgdG8gd29yayBjb3JyZWN0bHkuIEFsc28gZWFjaCBvcHRpb24gc2hvdWxkIGluY2x1ZGUgYSB2YWx1ZS9sYWJlbCBwYWlyIChvciB2YWx1ZS9sYWJlbEtleSB3aGVuIHVzaW5nIExvY2FsZSkuIEZvciBleGFtcGxlOjogeyBmaWx0ZXI6IG1vZGVsOiBGaWx0ZXJzLmF1dG9Db21wbGV0ZSwgY29sbGVjdGlvbjogW3sgdmFsdWU6IHRydWUsIGxhYmVsOiAnVHJ1ZScgfSwgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiAnRmFsc2UnfV0gfWApO1xuICAgIH1cblxuICAgIHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgPSB0aGlzLmNvbHVtbkZpbHRlciAmJiB0aGlzLmNvbHVtbkZpbHRlci5lbmFibGVUcmFuc2xhdGVMYWJlbCB8fCBmYWxzZTtcbiAgICB0aGlzLmxhYmVsTmFtZSA9IHRoaXMuY3VzdG9tU3RydWN0dXJlICYmIHRoaXMuY3VzdG9tU3RydWN0dXJlLmxhYmVsIHx8ICdsYWJlbCc7XG4gICAgdGhpcy52YWx1ZU5hbWUgPSB0aGlzLmN1c3RvbVN0cnVjdHVyZSAmJiB0aGlzLmN1c3RvbVN0cnVjdHVyZS52YWx1ZSB8fCAndmFsdWUnO1xuXG4gICAgLy8gYWx3YXlzIHJlbmRlciB0aGUgRE9NIGVsZW1lbnQsIGV2ZW4gaWYgdXNlciBwYXNzZWQgYSBcImNvbGxlY3Rpb25Bc3luY1wiLFxuICAgIGNvbnN0IG5ld0NvbGxlY3Rpb24gPSB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uIHx8IFtdO1xuICAgIHRoaXMucmVuZGVyRG9tRWxlbWVudChuZXdDb2xsZWN0aW9uKTtcblxuICAgIC8vIG9uIGV2ZXJ5IEZpbHRlciB3aGljaCBoYXZlIGEgXCJjb2xsZWN0aW9uXCIgb3IgYSBcImNvbGxlY3Rpb25Bc3luY1wiXG4gICAgLy8gd2Ugd2lsbCBhZGQgKG9yIHJlcGxhY2UpIGEgU3ViamVjdCB0byB0aGUgXCJjb2xsZWN0aW9uQXN5bmNcIiBwcm9wZXJ0eSBzbyB0aGF0IHVzZXIgaGFzIHBvc3NpYmlsaXR5IHRvIGNoYW5nZSB0aGUgY29sbGVjdGlvblxuICAgIC8vIGlmIFwiY29sbGVjdGlvbkFzeW5jXCIgaXMgYWxyZWFkeSBzZXQgYnkgdGhlIHVzZXIsIGl0IHdpbGwgcmVzb2x2ZSBpdCBmaXJzdCB0aGVuIGFmdGVyIGl0IHdpbGwgcmVwbGFjZSBpdCB3aXRoIGEgU3ViamVjdFxuICAgIGNvbnN0IGNvbGxlY3Rpb25Bc3luYyA9IHRoaXMuY29sdW1uRmlsdGVyICYmIHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25Bc3luYztcbiAgICBpZiAoY29sbGVjdGlvbkFzeW5jKSB7XG4gICAgICB0aGlzLnJlbmRlck9wdGlvbnNBc3luYyhjb2xsZWN0aW9uQXN5bmMpOyAvLyBjcmVhdGUgU3ViamVjdCBhZnRlciByZXNvbHZlIChjcmVhdGVDb2xsZWN0aW9uQXN5bmNTdWJqZWN0KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgZmlsdGVyIHZhbHVlXG4gICAqL1xuICBjbGVhcihzaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlKSB7XG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSkge1xuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gc2hvdWxkVHJpZ2dlclF1ZXJ5O1xuICAgICAgdGhpcy5zZWFyY2hUZXJtcyA9IFtdO1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLnZhbCgnJyk7XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0udHJpZ2dlcigna2V5dXAnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZGVzdHJveSB0aGUgZmlsdGVyXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLiRmaWx0ZXJFbG0pIHtcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5vZmYoJ2tleXVwIGlucHV0IGNoYW5nZScpLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdmFsdWUocykgb24gdGhlIERPTSBlbGVtZW50XG4gICAqL1xuICBzZXRWYWx1ZXModmFsdWVzOiBTZWFyY2hUZXJtIHwgU2VhcmNoVGVybVtdKSB7XG4gICAgaWYgKHZhbHVlcykge1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLnZhbCh2YWx1ZXMpO1xuICAgIH1cbiAgfVxuXG4gIC8vXG4gIC8vIHByb3RlY3RlZCBmdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIHVzZXIgbWlnaHQgd2FudCB0byBmaWx0ZXIgY2VydGFpbiBpdGVtcyBvZiB0aGUgY29sbGVjdGlvblxuICAgKiBAcGFyYW0gaW5wdXRDb2xsZWN0aW9uXG4gICAqIEByZXR1cm4gb3V0cHV0Q29sbGVjdGlvbiBmaWx0ZXJlZCBhbmQvb3Igc29ydGVkIGNvbGxlY3Rpb25cbiAgICovXG4gIHByb3RlY3RlZCBmaWx0ZXJDb2xsZWN0aW9uKGlucHV0Q29sbGVjdGlvbjogYW55W10pOiBhbnlbXSB7XG4gICAgbGV0IG91dHB1dENvbGxlY3Rpb24gPSBpbnB1dENvbGxlY3Rpb247XG5cbiAgICAvLyB1c2VyIG1pZ2h0IHdhbnQgdG8gZmlsdGVyIGNlcnRhaW4gaXRlbXMgb2YgdGhlIGNvbGxlY3Rpb25cbiAgICBpZiAodGhpcy5jb2x1bW5GaWx0ZXIgJiYgdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbkZpbHRlckJ5KSB7XG4gICAgICBjb25zdCBmaWx0ZXJCeSA9IHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25GaWx0ZXJCeTtcbiAgICAgIGNvbnN0IGZpbHRlckNvbGxlY3Rpb25CeSA9IHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25PcHRpb25zICYmIHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25PcHRpb25zLmZpbHRlclJlc3VsdEFmdGVyRWFjaFBhc3MgfHwgbnVsbDtcbiAgICAgIG91dHB1dENvbGxlY3Rpb24gPSB0aGlzLmNvbGxlY3Rpb25TZXJ2aWNlLmZpbHRlckNvbGxlY3Rpb24ob3V0cHV0Q29sbGVjdGlvbiwgZmlsdGVyQnksIGZpbHRlckNvbGxlY3Rpb25CeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dENvbGxlY3Rpb247XG4gIH1cblxuICAvKipcbiAgICogdXNlciBtaWdodCB3YW50IHRvIHNvcnQgdGhlIGNvbGxlY3Rpb24gaW4gYSBjZXJ0YWluIHdheVxuICAgKiBAcGFyYW0gaW5wdXRDb2xsZWN0aW9uXG4gICAqIEByZXR1cm4gb3V0cHV0Q29sbGVjdGlvbiBmaWx0ZXJlZCBhbmQvb3Igc29ydGVkIGNvbGxlY3Rpb25cbiAgICovXG4gIHByb3RlY3RlZCBzb3J0Q29sbGVjdGlvbihpbnB1dENvbGxlY3Rpb246IGFueVtdKTogYW55W10ge1xuICAgIGxldCBvdXRwdXRDb2xsZWN0aW9uID0gaW5wdXRDb2xsZWN0aW9uO1xuXG4gICAgLy8gdXNlciBtaWdodCB3YW50IHRvIHNvcnQgdGhlIGNvbGxlY3Rpb25cbiAgICBpZiAodGhpcy5jb2x1bW5GaWx0ZXIgJiYgdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvblNvcnRCeSkge1xuICAgICAgY29uc3Qgc29ydEJ5ID0gdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvblNvcnRCeTtcbiAgICAgIG91dHB1dENvbGxlY3Rpb24gPSB0aGlzLmNvbGxlY3Rpb25TZXJ2aWNlLnNvcnRDb2xsZWN0aW9uKHRoaXMuY29sdW1uRGVmLCBvdXRwdXRDb2xsZWN0aW9uLCBzb3J0QnksIHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwpO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXRDb2xsZWN0aW9uO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIHJlbmRlck9wdGlvbnNBc3luYyhjb2xsZWN0aW9uQXN5bmM6IFByb21pc2U8YW55PiB8IE9ic2VydmFibGU8YW55PiB8IFN1YmplY3Q8YW55Pikge1xuICAgIGxldCBhd2FpdGVkQ29sbGVjdGlvbjogYW55ID0gW107XG5cbiAgICBpZiAoY29sbGVjdGlvbkFzeW5jKSB7XG4gICAgICBhd2FpdGVkQ29sbGVjdGlvbiA9IGF3YWl0IGNhc3RUb1Byb21pc2UoY29sbGVjdGlvbkFzeW5jKTtcbiAgICAgIHRoaXMucmVuZGVyRG9tRWxlbWVudEZyb21Db2xsZWN0aW9uQXN5bmMoYXdhaXRlZENvbGxlY3Rpb24pO1xuXG4gICAgICAvLyBiZWNhdXNlIHdlIGFjY2VwdCBQcm9taXNlcyAmIEh0dHBDbGllbnQgT2JzZXJ2YWJsZSBvbmx5IGV4ZWN1dGUgb25jZVxuICAgICAgLy8gd2Ugd2lsbCByZS1jcmVhdGUgYW4gUnhKcyBTdWJqZWN0IHdoaWNoIHdpbGwgcmVwbGFjZSB0aGUgXCJjb2xsZWN0aW9uQXN5bmNcIiB3aGljaCBnb3QgZXhlY3V0ZWQgb25jZSBhbnl3YXlcbiAgICAgIC8vIGRvaW5nIHRoaXMgcHJvdmlkZSB0aGUgdXNlciBhIHdheSB0byBjYWxsIGEgXCJjb2xsZWN0aW9uQXN5bmMubmV4dCgpXCJcbiAgICAgIHRoaXMuY3JlYXRlQ29sbGVjdGlvbkFzeW5jU3ViamVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBDcmVhdGUgb3IgcmVjcmVhdGUgYW4gT2JzZXJ2YWJsZSBTdWJqZWN0IGFuZCByZWFzc2lnbiBpdCB0byB0aGUgXCJjb2xsZWN0aW9uQXN5bmNcIiBvYmplY3Qgc28gdXNlciBjYW4gY2FsbCBhIFwiY29sbGVjdGlvbkFzeW5jLm5leHQoKVwiIG9uIGl0ICovXG4gIHByb3RlY3RlZCBjcmVhdGVDb2xsZWN0aW9uQXN5bmNTdWJqZWN0KCkge1xuICAgIGNvbnN0IG5ld0NvbGxlY3Rpb25Bc3luYyA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgICB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uQXN5bmMgPSBuZXdDb2xsZWN0aW9uQXN5bmM7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICBuZXdDb2xsZWN0aW9uQXN5bmMuc3Vic2NyaWJlKGNvbGxlY3Rpb24gPT4gdGhpcy5yZW5kZXJEb21FbGVtZW50RnJvbUNvbGxlY3Rpb25Bc3luYyhjb2xsZWN0aW9uKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gdXNlciB1c2UgYSBDb2xsZWN0aW9uQXN5bmMgd2Ugd2lsbCB1c2UgdGhlIHJldHVybmVkIGNvbGxlY3Rpb24gdG8gcmVuZGVyIHRoZSBmaWx0ZXIgRE9NIGVsZW1lbnRcbiAgICogYW5kIHJlaW5pdGlhbGl6ZSBmaWx0ZXIgY29sbGVjdGlvbiB3aXRoIHRoaXMgbmV3IGNvbGxlY3Rpb25cbiAgICovXG4gIHByb3RlY3RlZCByZW5kZXJEb21FbGVtZW50RnJvbUNvbGxlY3Rpb25Bc3luYyhjb2xsZWN0aW9uKSB7XG4gICAgaWYgKHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5jb2xsZWN0aW9uSW5PYmplY3RQcm9wZXJ0eSkge1xuICAgICAgY29sbGVjdGlvbiA9IGdldERlc2NlbmRhbnRQcm9wZXJ0eShjb2xsZWN0aW9uLCB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmNvbGxlY3Rpb25Jbk9iamVjdFByb3BlcnR5KTtcbiAgICB9XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBwdWxsIHRoZSBjb2xsZWN0aW9uIGZyb20gdGhlIFwiY29sbGVjdGlvbkFzeW5jXCIgY2FsbCBpbiB0aGUgQXV0b0NvbXBsZXRlIEZpbHRlciwgdGhlIGNvbGxlY3Rpb24gaXMgbm90IGEgdmFsaWQgYXJyYXkuJyk7XG4gICAgfVxuXG4gICAgLy8gY29weSBvdmVyIHRoZSBhcnJheSByZWNlaXZlZCBmcm9tIHRoZSBhc3luYyBjYWxsIHRvIHRoZSBcImNvbGxlY3Rpb25cIiBhcyB0aGUgbmV3IGNvbGxlY3Rpb24gdG8gdXNlXG4gICAgLy8gdGhpcyBoYXMgdG8gYmUgQkVGT1JFIHRoZSBgY29sbGVjdGlvbk9ic2VydmVyKCkuc3Vic2NyaWJlYCB0byBhdm9pZCBnb2luZyBpbnRvIGFuIGluZmluaXRlIGxvb3BcbiAgICB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uID0gY29sbGVjdGlvbjtcblxuICAgIC8vIHJlY3JlYXRlIEZpbHRlciBET00gZWxlbWVudCBhZnRlciBnZXR0aW5nIGFzeW5jIGNvbGxlY3Rpb25cbiAgICB0aGlzLnJlbmRlckRvbUVsZW1lbnQoY29sbGVjdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVuZGVyRG9tRWxlbWVudChjb2xsZWN0aW9uOiBhbnlbXSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSAmJiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zICYmIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuY29sbGVjdGlvbkluT2JqZWN0UHJvcGVydHkpIHtcbiAgICAgIGNvbGxlY3Rpb24gPSBnZXREZXNjZW5kYW50UHJvcGVydHkoY29sbGVjdGlvbiwgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5jb2xsZWN0aW9uSW5PYmplY3RQcm9wZXJ0eSk7XG4gICAgfVxuICAgIGlmICghQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgXCJjb2xsZWN0aW9uXCIgcGFzc2VkIHRvIHRoZSBBdXRvY29tcGxldGUgRmlsdGVyIGlzIG5vdCBhIHZhbGlkIGFycmF5Jyk7XG4gICAgfVxuXG4gICAgLy8gYXNzaWduIHRoZSBjb2xsZWN0aW9uIHRvIGEgdGVtcCB2YXJpYWJsZSBiZWZvcmUgZmlsdGVyaW5nL3NvcnRpbmcgdGhlIGNvbGxlY3Rpb25cbiAgICBsZXQgbmV3Q29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG5cbiAgICAvLyB1c2VyIG1pZ2h0IHdhbnQgdG8gZmlsdGVyIGFuZC9vciBzb3J0IGNlcnRhaW4gaXRlbXMgb2YgdGhlIGNvbGxlY3Rpb25cbiAgICBuZXdDb2xsZWN0aW9uID0gdGhpcy5maWx0ZXJDb2xsZWN0aW9uKG5ld0NvbGxlY3Rpb24pO1xuICAgIG5ld0NvbGxlY3Rpb24gPSB0aGlzLnNvcnRDb2xsZWN0aW9uKG5ld0NvbGxlY3Rpb24pO1xuXG4gICAgLy8gZmlsdGVyIGlucHV0IGNhbiBvbmx5IGhhdmUgMSBzZWFyY2ggdGVybSwgc28gd2Ugd2lsbCB1c2UgdGhlIDFzdCBhcnJheSBpbmRleCBpZiBpdCBleGlzdFxuICAgIGNvbnN0IHNlYXJjaFRlcm0gPSAoQXJyYXkuaXNBcnJheSh0aGlzLnNlYXJjaFRlcm1zKSAmJiB0aGlzLnNlYXJjaFRlcm1zWzBdKSB8fCAnJztcblxuICAgIC8vIHN0ZXAgMSwgY3JlYXRlIEhUTUwgc3RyaW5nIHRlbXBsYXRlXG4gICAgY29uc3QgZmlsdGVyVGVtcGxhdGUgPSB0aGlzLmJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKCk7XG5cbiAgICAvLyBzdGVwIDIsIGNyZWF0ZSB0aGUgRE9NIEVsZW1lbnQgb2YgdGhlIGZpbHRlciAmIHByZS1sb2FkIHNlYXJjaCB0ZXJtXG4gICAgLy8gYWxzbyBzdWJzY3JpYmUgdG8gdGhlIG9uQ2xvc2UgZXZlbnRcbiAgICB0aGlzLiRmaWx0ZXJFbG0gPSB0aGlzLmNyZWF0ZURvbUVsZW1lbnQoZmlsdGVyVGVtcGxhdGUsIG5ld0NvbGxlY3Rpb24sIHNlYXJjaFRlcm0pO1xuXG4gICAgLy8gc3RlcCAzLCBzdWJzY3JpYmUgdG8gdGhlIGtleXVwIGV2ZW50IGFuZCBydW4gdGhlIGNhbGxiYWNrIHdoZW4gdGhhdCBoYXBwZW5zXG4gICAgLy8gYWxzbyBhZGQvcmVtb3ZlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcbiAgICB0aGlzLiRmaWx0ZXJFbG0ub24oJ2tleXVwIGlucHV0IGNoYW5nZScsIChlOiBhbnkpID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgfHwgJyc7XG4gICAgICBjb25zdCBlbmFibGVXaGl0ZVNwYWNlVHJpbSA9IHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlRmlsdGVyVHJpbVdoaXRlU3BhY2UgfHwgdGhpcy5jb2x1bW5GaWx0ZXIuZW5hYmxlVHJpbVdoaXRlU3BhY2U7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiBlbmFibGVXaGl0ZVNwYWNlVHJpbSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBjbGVhckZpbHRlclRyaWdnZXJlZDogdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQsIHNob3VsZFRyaWdnZXJRdWVyeTogdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5IH0pO1xuICAgICAgICB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSAnJykge1xuICAgICAgICAgIHRoaXMuJGZpbHRlckVsbS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XG4gICAgICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIG9wZXJhdG9yOiB0aGlzLm9wZXJhdG9yLCBzZWFyY2hUZXJtczogW3ZhbHVlXSwgc2hvdWxkVHJpZ2dlclF1ZXJ5OiB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy4kZmlsdGVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gcmVzZXQgYm90aCBmbGFncyBmb3IgbmV4dCB1c2VcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XG4gICAgICB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSB0aGUgSFRNTCB0ZW1wbGF0ZSBhcyBhIHN0cmluZ1xuICAgKi9cbiAgcHJpdmF0ZSBidWlsZFRlbXBsYXRlSHRtbFN0cmluZygpIHtcbiAgICBjb25zdCBjb2x1bW5JZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xuICAgIGxldCBwbGFjZWhvbGRlciA9ICh0aGlzLmdyaWRPcHRpb25zKSA/ICh0aGlzLmdyaWRPcHRpb25zLmRlZmF1bHRGaWx0ZXJQbGFjZWhvbGRlciB8fCAnJykgOiAnJztcbiAgICBpZiAodGhpcy5jb2x1bW5GaWx0ZXIgJiYgdGhpcy5jb2x1bW5GaWx0ZXIucGxhY2Vob2xkZXIpIHtcbiAgICAgIHBsYWNlaG9sZGVyID0gdGhpcy5jb2x1bW5GaWx0ZXIucGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIHJldHVybiBgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcm9sZT1cInByZXNlbnRhdGlvblwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGF1dG9jb21wbGV0ZSBzZWFyY2gtZmlsdGVyIGZpbHRlci0ke2NvbHVtbklkfVwiIHBsYWNlaG9sZGVyPVwiJHtwbGFjZWhvbGRlcn1cIj5gO1xuICB9XG5cbiAgLyoqXG4gICAqIEZyb20gdGhlIGh0bWwgdGVtcGxhdGUgc3RyaW5nLCBjcmVhdGUgYSBET00gZWxlbWVudFxuICAgKiBAcGFyYW0gZmlsdGVyVGVtcGxhdGVcbiAgICovXG4gIHByaXZhdGUgY3JlYXRlRG9tRWxlbWVudChmaWx0ZXJUZW1wbGF0ZTogc3RyaW5nLCBjb2xsZWN0aW9uOiBhbnlbXSwgc2VhcmNoVGVybT86IFNlYXJjaFRlcm0pIHtcbiAgICBjb25zdCBjb2x1bW5JZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xuICAgIGNvbnN0ICRoZWFkZXJFbG0gPSB0aGlzLmdyaWQuZ2V0SGVhZGVyUm93Q29sdW1uKGNvbHVtbklkKTtcbiAgICAkKCRoZWFkZXJFbG0pLmVtcHR5KCk7XG5cbiAgICAvLyBjcmVhdGUgdGhlIERPTSBlbGVtZW50ICYgYWRkIGFuIElEIGFuZCBmaWx0ZXIgY2xhc3NcbiAgICBjb25zdCAkZmlsdGVyRWxtID0gJChmaWx0ZXJUZW1wbGF0ZSkgYXMgYW55O1xuICAgIGNvbnN0IHNlYXJjaFRlcm1JbnB1dCA9IHNlYXJjaFRlcm0gYXMgc3RyaW5nO1xuXG4gICAgLy8gdXNlciBtaWdodCBwcm92aWRlIGhpcyBvd24gY3VzdG9tIHN0cnVjdHVyZVxuICAgIC8vIGpRdWVyeSBVSSBhdXRvY29tcGxldGUgcmVxdWlyZXMgYSBsYWJlbC92YWx1ZSBwYWlyLCBzbyB3ZSBtdXN0IHJlbWFwIHRoZW0gd2hlbiB1c2VyIHByb3ZpZGUgZGlmZmVyZW50IG9uZXNcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSAmJiB0aGlzLmN1c3RvbVN0cnVjdHVyZSkge1xuICAgICAgY29sbGVjdGlvbiA9IGNvbGxlY3Rpb24ubWFwKChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiB7IGxhYmVsOiBpdGVtW3RoaXMubGFiZWxOYW1lXSwgdmFsdWU6IGl0ZW1bdGhpcy52YWx1ZU5hbWVdIH07XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyB1c2VyIG1pZ2h0IHBhc3MgaGlzIG93biBhdXRvY29tcGxldGUgb3B0aW9uc1xuICAgIGNvbnN0IGF1dG9Db21wbGV0ZU9wdGlvbnMgPSB0aGlzLmNvbHVtbkZpbHRlci5maWx0ZXJPcHRpb25zO1xuXG4gICAgLy8gd2hlbiB1c2VyIHBhc3NlcyBpdCdzIG93biBhdXRvY29tcGxldGUgb3B0aW9uc1xuICAgIC8vIHdlIHN0aWxsIG5lZWQgdG8gcHJvdmlkZSBvdXIgb3duIFwic2VsZWN0XCIgY2FsbGJhY2sgaW1wbGVtZW50YXRpb25cbiAgICBpZiAoYXV0b0NvbXBsZXRlT3B0aW9ucykge1xuICAgICAgYXV0b0NvbXBsZXRlT3B0aW9ucy5zZWxlY3QgPSAoZXZlbnQ6IEV2ZW50LCB1aTogYW55KSA9PiB0aGlzLm9uU2VsZWN0KGV2ZW50LCB1aSk7XG4gICAgICAkZmlsdGVyRWxtLmF1dG9jb21wbGV0ZShhdXRvQ29tcGxldGVPcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0b0NvbXBsZXRlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gcmVxdWlyZXMgYSBcImNvbGxlY3Rpb25cIiBvciBcImNvbGxlY3Rpb25Bc3luY1wiIHRvIGJlIHByb3ZpZGVkIGZvciB0aGUgZmlsdGVyIHRvIHdvcmsgcHJvcGVybHknKTtcbiAgICAgIH1cblxuICAgICAgJGZpbHRlckVsbS5hdXRvY29tcGxldGUoe1xuICAgICAgICBtaW5MZW5ndGg6IDAsXG4gICAgICAgIHNvdXJjZTogY29sbGVjdGlvbixcbiAgICAgICAgc2VsZWN0OiAoZXZlbnQ6IEV2ZW50LCB1aTogYW55KSA9PiB0aGlzLm9uU2VsZWN0KGV2ZW50LCB1aSksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAkZmlsdGVyRWxtLnZhbChzZWFyY2hUZXJtSW5wdXQpO1xuICAgICRmaWx0ZXJFbG0uYXR0cignaWQnLCBgZmlsdGVyLSR7Y29sdW1uSWR9YCk7XG4gICAgJGZpbHRlckVsbS5kYXRhKCdjb2x1bW5JZCcsIGNvbHVtbklkKTtcblxuICAgIC8vIGlmIHRoZXJlJ3MgYSBzZWFyY2ggdGVybSwgd2Ugd2lsbCBhZGQgdGhlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcbiAgICBpZiAoc2VhcmNoVGVybSkge1xuICAgICAgJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJyk7XG4gICAgfVxuXG4gICAgLy8gYXBwZW5kIHRoZSBuZXcgRE9NIGVsZW1lbnQgdG8gdGhlIGhlYWRlciByb3dcbiAgICBpZiAoJGZpbHRlckVsbSAmJiB0eXBlb2YgJGZpbHRlckVsbS5hcHBlbmRUbyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgJGZpbHRlckVsbS5hcHBlbmRUbygkaGVhZGVyRWxtKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJGZpbHRlckVsbTtcbiAgfVxuXG4gIC8vXG4gIC8vIHByaXZhdGUgZnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIHByaXZhdGUgb25TZWxlY3QoZXZlbnQ6IEV2ZW50LCB1aTogYW55KSB7XG4gICAgaWYgKHVpICYmIHVpLml0ZW0pIHtcbiAgICAgIGNvbnN0IGl0ZW1MYWJlbCA9IHR5cGVvZiB1aS5pdGVtID09PSAnc3RyaW5nJyA/IHVpLml0ZW0gOiB1aS5pdGVtLmxhYmVsO1xuICAgICAgY29uc3QgaXRlbVZhbHVlID0gdHlwZW9mIHVpLml0ZW0gPT09ICdzdHJpbmcnID8gdWkuaXRlbSA6IHVpLml0ZW0udmFsdWU7XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0udmFsKGl0ZW1MYWJlbCk7XG4gICAgICB0aGlzLmNhbGxiYWNrKGV2ZW50LCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIG9wZXJhdG9yOiB0aGlzLm9wZXJhdG9yLCBzZWFyY2hUZXJtczogW2l0ZW1WYWx1ZV0sIHNob3VsZFRyaWdnZXJRdWVyeTogdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5IH0pO1xuICAgICAgLy8gcmVzZXQgYm90aCBmbGFncyBmb3IgbmV4dCB1c2VcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XG4gICAgICB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==