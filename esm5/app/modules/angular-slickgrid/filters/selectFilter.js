/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { OperatorType, } from './../models/index';
import { castToPromise, getDescendantProperty, htmlEncode, unsubscribeAllObservables } from '../services/utilities';
import { Subject } from 'rxjs';
import * as DOMPurify_ from 'dompurify';
/** @type {?} */
var DOMPurify = DOMPurify_;
var SelectFilter = /** @class */ (function () {
    /**
     * Initialize the Filter
     */
    function SelectFilter(translate, collectionService, isMultipleSelect) {
        if (isMultipleSelect === void 0) { isMultipleSelect = true; }
        var _this = this;
        this.translate = translate;
        this.collectionService = collectionService;
        this.isMultipleSelect = isMultipleSelect;
        this._isFilterFirstRender = true;
        this._shouldTriggerQuery = true;
        this.isFilled = false;
        this.enableTranslateLabel = false;
        this.subscriptions = [];
        // default options used by this Filter, user can overwrite any of these by passing "otions"
        /** @type {?} */
        var options = {
            autoAdjustDropHeight: true,
            autoAdjustDropPosition: true,
            autoAdjustDropWidthByTextSize: true,
            container: 'body',
            filter: false,
            // input search term on top of the select option list
            maxHeight: 275,
            single: true,
            textTemplate: (/**
             * @param {?} $elm
             * @return {?}
             */
            function ($elm) {
                // render HTML code or not, by default it is sanitized and won't be rendered
                /** @type {?} */
                var isRenderHtmlEnabled = _this.columnDef && _this.columnDef.filter && _this.columnDef.filter.enableRenderHtml || false;
                return isRenderHtmlEnabled ? $elm.text() : $elm.html();
            }),
            onClose: (/**
             * @return {?}
             */
            function () {
                // we will subscribe to the onClose event for triggering our callback
                // also add/remove "filled" class for styling purposes
                /** @type {?} */
                var selectedItems = _this.$filterElm.multipleSelect('getSelects');
                if (Array.isArray(selectedItems) && selectedItems.length > 1 || (selectedItems.length === 1 && selectedItems[0] !== '')) {
                    _this.isFilled = true;
                    _this.$filterElm.addClass('filled').siblings('div .search-filter').addClass('filled');
                }
                else {
                    _this.isFilled = false;
                    _this.$filterElm.removeClass('filled');
                    _this.$filterElm.siblings('div .search-filter').removeClass('filled');
                }
                _this.callback(undefined, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: selectedItems, shouldTriggerQuery: _this._shouldTriggerQuery });
                // reset flag for next use
                _this._shouldTriggerQuery = true;
            })
        };
        if (this.isMultipleSelect) {
            options.single = false;
            options.okButton = true;
            options.addTitle = true; // show tooltip of all selected items while hovering the filter
            options.countSelected = this.translate.instant('X_OF_Y_SELECTED');
            options.allSelected = this.translate.instant('ALL_SELECTED');
            options.selectAllText = this.translate.instant('SELECT_ALL');
            options.selectAllDelimiter = ['', '']; // remove default square brackets of default text "[Select All]" => "Select All"
        }
        this.defaultOptions = options;
    }
    Object.defineProperty(SelectFilter.prototype, "columnFilter", {
        /** Getter for the Column Filter itself */
        get: /**
         * Getter for the Column Filter itself
         * @protected
         * @return {?}
         */
        function () {
            return this.columnDef && this.columnDef.filter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectFilter.prototype, "collectionOptions", {
        /** Getter for the Collection Options */
        get: /**
         * Getter for the Collection Options
         * @protected
         * @return {?}
         */
        function () {
            return this.columnDef && this.columnDef.filter && this.columnDef.filter.collectionOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectFilter.prototype, "customStructure", {
        /** Getter for the Custom Structure if exist */
        get: /**
         * Getter for the Custom Structure if exist
         * @protected
         * @return {?}
         */
        function () {
            return this.columnDef && this.columnDef.filter && this.columnDef.filter.customStructure;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectFilter.prototype, "gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: /**
         * Getter for the Grid Options pulled through the Grid Object
         * @protected
         * @return {?}
         */
        function () {
            return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectFilter.prototype, "operator", {
        /** Getter for the filter operator */
        get: /**
         * Getter for the filter operator
         * @return {?}
         */
        function () {
            if (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) {
                return this.columnDef && this.columnDef.filter && this.columnDef.filter.operator;
            }
            return this.isMultipleSelect ? OperatorType.in : OperatorType.equal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize the filter template
     */
    /**
     * Initialize the filter template
     * @param {?} args
     * @param {?} isFilterFirstRender
     * @return {?}
     */
    SelectFilter.prototype.init = /**
     * Initialize the filter template
     * @param {?} args
     * @param {?} isFilterFirstRender
     * @return {?}
     */
    function (args, isFilterFirstRender) {
        this._isFilterFirstRender = isFilterFirstRender;
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        if (!this.grid || !this.columnDef || !this.columnFilter || (!this.columnFilter.collection && !this.columnFilter.collectionAsync)) {
            throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" (or \"collectionAsync\") for the MultipleSelect/SingleSelect Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.multipleSelect, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }");
        }
        this.enableTranslateLabel = this.columnFilter.enableTranslateLabel;
        this.labelName = this.customStructure && this.customStructure.label || 'label';
        this.labelPrefixName = this.customStructure && this.customStructure.labelPrefix || 'labelPrefix';
        this.labelSuffixName = this.customStructure && this.customStructure.labelSuffix || 'labelSuffix';
        this.optionLabel = this.customStructure && this.customStructure.optionLabel || 'value';
        this.valueName = this.customStructure && this.customStructure.value || 'value';
        if (this.enableTranslateLabel && (!this.translate || typeof this.translate.instant !== 'function')) {
            throw new Error("[select-editor] The ngx-translate TranslateService is required for the Select Filter to work correctly");
        }
        // always render the Select (dropdown) DOM element, even if user passed a "collectionAsync",
        // if that is the case, the Select will simply be without any options but we still have to render it (else SlickGrid would throw an error)
        /** @type {?} */
        var newCollection = this.columnFilter.collection || [];
        this.renderDomElement(newCollection);
        // on every Filter which have a "collection" or a "collectionAsync"
        // we will add (or replace) a Subject to the "collectionAsync" property so that user has possibility to change the collection
        // if "collectionAsync" is already set by the user, it will resolve it first then after it will replace it with a Subject
        /** @type {?} */
        var collectionAsync = this.columnFilter && this.columnFilter.collectionAsync;
        if (collectionAsync) {
            this.renderOptionsAsync(collectionAsync); // create Subject after resolve (createCollectionAsyncSubject)
        }
    };
    /**
     * Clear the filter values
     */
    /**
     * Clear the filter values
     * @param {?=} shouldTriggerQuery
     * @return {?}
     */
    SelectFilter.prototype.clear = /**
     * Clear the filter values
     * @param {?=} shouldTriggerQuery
     * @return {?}
     */
    function (shouldTriggerQuery) {
        if (shouldTriggerQuery === void 0) { shouldTriggerQuery = true; }
        if (this.$filterElm && this.$filterElm.multipleSelect) {
            // reload the filter element by it's id, to make sure it's still a valid element (because of some issue in the GraphQL example)
            this.$filterElm.multipleSelect('setSelects', []);
            this.$filterElm.removeClass('filled');
            this.$filterElm.siblings('div .search-filter').removeClass('filled');
            this.searchTerms = [];
            this._shouldTriggerQuery = shouldTriggerQuery;
            this.callback(undefined, { columnDef: this.columnDef, clearFilterTriggered: true, shouldTriggerQuery: this._shouldTriggerQuery });
            // reset both flags for next use
            this._shouldTriggerQuery = true;
        }
    };
    /**
     * destroy the filter
     */
    /**
     * destroy the filter
     * @return {?}
     */
    SelectFilter.prototype.destroy = /**
     * destroy the filter
     * @return {?}
     */
    function () {
        if (this.$filterElm) {
            // remove event watcher
            this.$filterElm.off().remove();
            /** @type {?} */
            var elementClassName = this.elementName.toString().replace('.', '\\.');
            $("[name=" + elementClassName + "].ms-drop").remove();
        }
        // also dispose of all Subscriptions
        this.subscriptions = unsubscribeAllObservables(this.subscriptions);
    };
    /**
     * Set value(s) on the DOM element
     */
    /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    SelectFilter.prototype.setValues = /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    function (values) {
        if (values) {
            values = Array.isArray(values) ? values : [values];
            this.$filterElm.multipleSelect('setSelects', values);
        }
    };
    //
    // protected functions
    // ------------------
    /**
     * user might want to filter certain items of the collection
     * @param inputCollection
     * @return outputCollection filtered and/or sorted collection
     */
    //
    // protected functions
    // ------------------
    /**
     * user might want to filter certain items of the collection
     * @protected
     * @param {?} inputCollection
     * @return {?} outputCollection filtered and/or sorted collection
     */
    SelectFilter.prototype.filterCollection = 
    //
    // protected functions
    // ------------------
    /**
     * user might want to filter certain items of the collection
     * @protected
     * @param {?} inputCollection
     * @return {?} outputCollection filtered and/or sorted collection
     */
    function (inputCollection) {
        /** @type {?} */
        var outputCollection = inputCollection;
        // user might want to filter certain items of the collection
        if (this.columnDef && this.columnFilter && this.columnFilter.collectionFilterBy) {
            /** @type {?} */
            var filterBy = this.columnFilter.collectionFilterBy;
            /** @type {?} */
            var filterCollectionBy = this.columnFilter.collectionOptions && this.columnFilter.collectionOptions.filterResultAfterEachPass || null;
            outputCollection = this.collectionService.filterCollection(outputCollection, filterBy, filterCollectionBy);
        }
        return outputCollection;
    };
    /**
     * user might want to sort the collection in a certain way
     * @param inputCollection
     * @return outputCollection filtered and/or sorted collection
     */
    /**
     * user might want to sort the collection in a certain way
     * @protected
     * @param {?} inputCollection
     * @return {?} outputCollection filtered and/or sorted collection
     */
    SelectFilter.prototype.sortCollection = /**
     * user might want to sort the collection in a certain way
     * @protected
     * @param {?} inputCollection
     * @return {?} outputCollection filtered and/or sorted collection
     */
    function (inputCollection) {
        /** @type {?} */
        var outputCollection = inputCollection;
        // user might want to sort the collection
        if (this.columnDef && this.columnFilter && this.columnFilter.collectionSortBy) {
            /** @type {?} */
            var sortBy = this.columnFilter.collectionSortBy;
            outputCollection = this.collectionService.sortCollection(this.columnDef, outputCollection, sortBy, this.enableTranslateLabel);
        }
        return outputCollection;
    };
    /**
     * @protected
     * @param {?} collectionAsync
     * @return {?}
     */
    SelectFilter.prototype.renderOptionsAsync = /**
     * @protected
     * @param {?} collectionAsync
     * @return {?}
     */
    function (collectionAsync) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var awaitedCollection;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        awaitedCollection = [];
                        if (!collectionAsync) return [3 /*break*/, 2];
                        return [4 /*yield*/, castToPromise(collectionAsync)];
                    case 1:
                        awaitedCollection = _a.sent();
                        this.renderDomElementFromCollectionAsync(awaitedCollection);
                        // because we accept Promises & HttpClient Observable only execute once
                        // we will re-create an RxJs Subject which will replace the "collectionAsync" which got executed once anyway
                        // doing this provide the user a way to call a "collectionAsync.next()"
                        this.createCollectionAsyncSubject();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /** Create or recreate an Observable Subject and reassign it to the "collectionAsync" object so user can call a "collectionAsync.next()" on it */
    /**
     * Create or recreate an Observable Subject and reassign it to the "collectionAsync" object so user can call a "collectionAsync.next()" on it
     * @protected
     * @return {?}
     */
    SelectFilter.prototype.createCollectionAsyncSubject = /**
     * Create or recreate an Observable Subject and reassign it to the "collectionAsync" object so user can call a "collectionAsync.next()" on it
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var newCollectionAsync = new Subject();
        this.columnFilter.collectionAsync = newCollectionAsync;
        this.subscriptions.push(newCollectionAsync.subscribe((/**
         * @param {?} collection
         * @return {?}
         */
        function (collection) { return _this.renderDomElementFromCollectionAsync(collection); })));
    };
    /**
     * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
     * and reinitialize filter collection with this new collection
     */
    /**
     * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
     * and reinitialize filter collection with this new collection
     * @protected
     * @param {?} collection
     * @return {?}
     */
    SelectFilter.prototype.renderDomElementFromCollectionAsync = /**
     * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
     * and reinitialize filter collection with this new collection
     * @protected
     * @param {?} collection
     * @return {?}
     */
    function (collection) {
        if (this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
            collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
        }
        if (!Array.isArray(collection)) {
            throw new Error('Something went wrong while trying to pull the collection from the "collectionAsync" call in the Select Filter, the collection is not a valid array.');
        }
        // copy over the array received from the async call to the "collection" as the new collection to use
        // this has to be BEFORE the `collectionObserver().subscribe` to avoid going into an infinite loop
        this.columnFilter.collection = collection;
        // recreate Multiple Select after getting async collection
        this.renderDomElement(collection);
    };
    /**
     * @protected
     * @param {?} collection
     * @return {?}
     */
    SelectFilter.prototype.renderDomElement = /**
     * @protected
     * @param {?} collection
     * @return {?}
     */
    function (collection) {
        if (!Array.isArray(collection) && this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
            collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
        }
        if (!Array.isArray(collection)) {
            throw new Error('The "collection" passed to the Select Filter is not a valid array');
        }
        // user can optionally add a blank entry at the beginning of the collection
        if (this.collectionOptions && this.collectionOptions.addBlankEntry && this._isFilterFirstRender) {
            collection.unshift(this.createBlankEntry());
        }
        /** @type {?} */
        var newCollection = collection;
        // user might want to filter and/or sort certain items of the collection
        newCollection = this.filterCollection(newCollection);
        newCollection = this.sortCollection(newCollection);
        // step 1, create HTML string template
        /** @type {?} */
        var filterTemplate = this.buildTemplateHtmlString(newCollection, this.searchTerms);
        // step 2, create the DOM Element of the filter & pre-load search terms
        // also subscribe to the onClose event
        this.createDomElement(filterTemplate);
    };
    /**
     * Create the HTML template as a string
     */
    /**
     * Create the HTML template as a string
     * @protected
     * @param {?} optionCollection
     * @param {?} searchTerms
     * @return {?}
     */
    SelectFilter.prototype.buildTemplateHtmlString = /**
     * Create the HTML template as a string
     * @protected
     * @param {?} optionCollection
     * @param {?} searchTerms
     * @return {?}
     */
    function (optionCollection, searchTerms) {
        var _this = this;
        /** @type {?} */
        var options = '';
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        var separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
        /** @type {?} */
        var isRenderHtmlEnabled = this.columnFilter && this.columnFilter.enableRenderHtml || false;
        /** @type {?} */
        var sanitizedOptions = this.gridOptions && this.gridOptions.sanitizeHtmlOptions || {};
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
                /** @type {?} */
                var selected = (searchTerms.findIndex((/**
                 * @param {?} term
                 * @return {?}
                 */
                function (term) { return term === option; })) >= 0) ? 'selected' : '';
                options += "<option value=\"" + option + "\" label=\"" + option + "\" " + selected + ">" + option + "</option>";
                // if there's at least 1 search term found, we will add the "filled" class for styling purposes
                if (selected) {
                    _this.isFilled = true;
                }
            }));
        }
        else {
            // array of objects will require a label/value pair unless a customStructure is passed
            optionCollection.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                if (!option || (option[_this.labelName] === undefined && option.labelKey === undefined)) {
                    throw new Error("[select-filter] A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.multipleSelect, collection: [ { value: '1', label: 'One' } ]')");
                }
                /** @type {?} */
                var labelKey = (/** @type {?} */ ((option.labelKey || option[_this.labelName])));
                /** @type {?} */
                var selected = (searchTerms.findIndex((/**
                 * @param {?} term
                 * @return {?}
                 */
                function (term) { return term === option[_this.valueName]; })) >= 0) ? 'selected' : '';
                /** @type {?} */
                var labelText = ((option.labelKey || _this.enableTranslateLabel) && labelKey) ? _this.translate.instant(labelKey || ' ') : labelKey;
                /** @type {?} */
                var prefixText = option[_this.labelPrefixName] || '';
                /** @type {?} */
                var suffixText = option[_this.labelSuffixName] || '';
                /** @type {?} */
                var optionLabel = option[_this.optionLabel] || '';
                optionLabel = optionLabel.toString().replace(/\"/g, '\''); // replace double quotes by single quotes to avoid interfering with regular html
                // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                prefixText = (_this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? _this.translate.instant(prefixText || ' ') : prefixText;
                suffixText = (_this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? _this.translate.instant(suffixText || ' ') : suffixText;
                optionLabel = (_this.enableTranslateLabel && optionLabel && typeof optionLabel === 'string') ? _this.translate.instant(optionLabel || ' ') : optionLabel;
                // add to a temp array for joining purpose and filter out empty text
                /** @type {?} */
                var tmpOptionArray = [prefixText, labelText, suffixText].filter((/**
                 * @param {?} text
                 * @return {?}
                 */
                function (text) { return text; }));
                /** @type {?} */
                var optionText = tmpOptionArray.join(separatorBetweenLabels);
                // if user specifically wants to render html text, he needs to opt-in else it will stripped out by default
                // also, the 3rd party lib will saninitze any html code unless it's encoded, so we'll do that
                if (isRenderHtmlEnabled) {
                    // sanitize any unauthorized html tags like script and others
                    // for the remaining allowed tags we'll permit all attributes
                    /** @type {?} */
                    var sanitizedText = DOMPurify.sanitize(optionText, sanitizedOptions);
                    optionText = htmlEncode(sanitizedText);
                }
                // html text of each select option
                options += "<option value=\"" + option[_this.valueName] + "\" label=\"" + optionLabel + "\" " + selected + ">" + optionText + "</option>";
                // if there's at least 1 search term found, we will add the "filled" class for styling purposes
                if (selected) {
                    _this.isFilled = true;
                }
            }));
        }
        return "<select class=\"ms-filter search-filter filter-" + fieldId + "\" " + (this.isMultipleSelect ? 'multiple="multiple"' : '') + ">" + options + "</select>";
    };
    /** Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be */
    /**
     * Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be
     * @protected
     * @return {?}
     */
    SelectFilter.prototype.createBlankEntry = /**
     * Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be
     * @protected
     * @return {?}
     */
    function () {
        var _a;
        /** @type {?} */
        var blankEntry = (_a = {},
            _a[this.labelName] = '',
            _a[this.valueName] = '',
            _a);
        if (this.labelPrefixName) {
            blankEntry[this.labelPrefixName] = '';
        }
        if (this.labelSuffixName) {
            blankEntry[this.labelSuffixName] = '';
        }
        return blankEntry;
    };
    /**
     * From the html template string, create a DOM element
     * Subscribe to the onClose event and run the callback when that happens
     * @param filterTemplate
     */
    /**
     * From the html template string, create a DOM element
     * Subscribe to the onClose event and run the callback when that happens
     * @protected
     * @param {?} filterTemplate
     * @return {?}
     */
    SelectFilter.prototype.createDomElement = /**
     * From the html template string, create a DOM element
     * Subscribe to the onClose event and run the callback when that happens
     * @protected
     * @param {?} filterTemplate
     * @return {?}
     */
    function (filterTemplate) {
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        // provide the name attribute to the DOM element which will be needed to auto-adjust drop position (dropup / dropdown)
        this.elementName = "filter-" + fieldId;
        this.defaultOptions.name = this.elementName;
        /** @type {?} */
        var $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        this.$filterElm = $(filterTemplate);
        if (typeof this.$filterElm.multipleSelect !== 'function') {
            throw new Error("multiple-select.js was not found, make sure to modify your \"angular-cli.json\" file and include \"../node_modules/angular-slickgrid/lib/multiple-select/multiple-select.js\" and it's css or SASS file");
        }
        this.$filterElm.attr('id', this.elementName);
        this.$filterElm.attr('name', this.elementName);
        this.$filterElm.data('columnId', fieldId);
        // if there's a search term, we will add the "filled" class for styling purposes
        if (this.isFilled) {
            this.$filterElm.addClass('filled');
        }
        // append the new DOM element to the header row
        if (this.$filterElm && typeof this.$filterElm.appendTo === 'function') {
            this.$filterElm.appendTo($headerElm);
        }
        // merge options & attach multiSelect
        /** @type {?} */
        var elementOptions = tslib_1.__assign({}, this.defaultOptions, this.columnFilter.filterOptions);
        this.filterElmOptions = tslib_1.__assign({}, this.defaultOptions, elementOptions);
        this.$filterElm = this.$filterElm.multipleSelect(this.filterElmOptions);
    };
    return SelectFilter;
}());
export { SelectFilter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SelectFilter.prototype._isFilterFirstRender;
    /**
     * @type {?}
     * @private
     */
    SelectFilter.prototype._shouldTriggerQuery;
    /**
     * DOM Element Name, useful for auto-detecting positioning (dropup / dropdown)
     * @type {?}
     */
    SelectFilter.prototype.elementName;
    /**
     * Filter Multiple-Select options
     * @type {?}
     */
    SelectFilter.prototype.filterElmOptions;
    /**
     * The JQuery DOM element
     * @type {?}
     */
    SelectFilter.prototype.$filterElm;
    /** @type {?} */
    SelectFilter.prototype.grid;
    /** @type {?} */
    SelectFilter.prototype.searchTerms;
    /** @type {?} */
    SelectFilter.prototype.columnDef;
    /** @type {?} */
    SelectFilter.prototype.callback;
    /** @type {?} */
    SelectFilter.prototype.defaultOptions;
    /** @type {?} */
    SelectFilter.prototype.isFilled;
    /** @type {?} */
    SelectFilter.prototype.labelName;
    /** @type {?} */
    SelectFilter.prototype.labelPrefixName;
    /** @type {?} */
    SelectFilter.prototype.labelSuffixName;
    /** @type {?} */
    SelectFilter.prototype.optionLabel;
    /** @type {?} */
    SelectFilter.prototype.valueName;
    /** @type {?} */
    SelectFilter.prototype.enableTranslateLabel;
    /** @type {?} */
    SelectFilter.prototype.subscriptions;
    /**
     * @type {?}
     * @protected
     */
    SelectFilter.prototype.translate;
    /**
     * @type {?}
     * @protected
     */
    SelectFilter.prototype.collectionService;
    /**
     * @type {?}
     * @protected
     */
    SelectFilter.prototype.isMultipleSelect;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0RmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL3NlbGVjdEZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFVTCxZQUFZLEdBSWIsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUUsYUFBYSxFQUFFLHFCQUFxQixFQUFFLFVBQVUsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BILE9BQU8sRUFBYyxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sS0FBSyxVQUFVLE1BQU0sV0FBVyxDQUFDOztJQUNsQyxTQUFTLEdBQUcsVUFBVTtBQUs1QjtJQTJCRTs7T0FFRztJQUNILHNCQUFzQixTQUEyQixFQUFZLGlCQUFvQyxFQUFZLGdCQUF1QjtRQUF2QixpQ0FBQSxFQUFBLHVCQUF1QjtRQUFwSSxpQkE4Q0M7UUE5Q3FCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQVksc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFZLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBTztRQTdCNUgseUJBQW9CLEdBQUcsSUFBSSxDQUFDO1FBQzVCLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQWdCbkMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQU1qQix5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDN0Isa0JBQWEsR0FBbUIsRUFBRSxDQUFDOzs7WUFPM0IsT0FBTyxHQUF5QjtZQUNwQyxvQkFBb0IsRUFBRSxJQUFJO1lBQzFCLHNCQUFzQixFQUFFLElBQUk7WUFDNUIsNkJBQTZCLEVBQUUsSUFBSTtZQUNuQyxTQUFTLEVBQUUsTUFBTTtZQUNqQixNQUFNLEVBQUUsS0FBSzs7WUFDYixTQUFTLEVBQUUsR0FBRztZQUNkLE1BQU0sRUFBRSxJQUFJO1lBRVosWUFBWTs7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QUFtQzs7Ozs7SUFLdkIsaUNBQXFDOzs7OztJQUFFLHlDQUE4Qzs7Ozs7SUFBRSx3Q0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29sbGVjdGlvbkN1c3RvbVN0cnVjdHVyZSxcclxuICBDb2xsZWN0aW9uT3B0aW9uLFxyXG4gIENvbHVtbixcclxuICBDb2x1bW5GaWx0ZXIsXHJcbiAgRmlsdGVyLFxyXG4gIEZpbHRlckFyZ3VtZW50cyxcclxuICBGaWx0ZXJDYWxsYmFjayxcclxuICBHcmlkT3B0aW9uLFxyXG4gIE11bHRpcGxlU2VsZWN0T3B0aW9uLFxyXG4gIE9wZXJhdG9yVHlwZSxcclxuICBPcGVyYXRvclN0cmluZyxcclxuICBTZWFyY2hUZXJtLFxyXG4gIFNlbGVjdE9wdGlvbixcclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IENvbGxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9jb2xsZWN0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBjYXN0VG9Qcm9taXNlLCBnZXREZXNjZW5kYW50UHJvcGVydHksIGh0bWxFbmNvZGUsIHVuc3Vic2NyaWJlQWxsT2JzZXJ2YWJsZXMgfSBmcm9tICcuLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0ICogYXMgRE9NUHVyaWZ5XyBmcm9tICdkb21wdXJpZnknO1xyXG5jb25zdCBET01QdXJpZnkgPSBET01QdXJpZnlfOyAvLyBwYXRjaCB0byBmaXggcm9sbHVwIHRvIHdvcmtcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgJDogYW55O1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlbGVjdEZpbHRlciBpbXBsZW1lbnRzIEZpbHRlciB7XHJcbiAgcHJpdmF0ZSBfaXNGaWx0ZXJGaXJzdFJlbmRlciA9IHRydWU7XHJcbiAgcHJpdmF0ZSBfc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZTtcclxuXHJcbiAgLyoqIERPTSBFbGVtZW50IE5hbWUsIHVzZWZ1bCBmb3IgYXV0by1kZXRlY3RpbmcgcG9zaXRpb25pbmcgKGRyb3B1cCAvIGRyb3Bkb3duKSAqL1xyXG4gIGVsZW1lbnROYW1lOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBGaWx0ZXIgTXVsdGlwbGUtU2VsZWN0IG9wdGlvbnMgKi9cclxuICBmaWx0ZXJFbG1PcHRpb25zOiBNdWx0aXBsZVNlbGVjdE9wdGlvbjtcclxuXHJcbiAgLyoqIFRoZSBKUXVlcnkgRE9NIGVsZW1lbnQgKi9cclxuICAkZmlsdGVyRWxtOiBhbnk7XHJcblxyXG4gIGdyaWQ6IGFueTtcclxuICBzZWFyY2hUZXJtczogU2VhcmNoVGVybVtdO1xyXG4gIGNvbHVtbkRlZjogQ29sdW1uO1xyXG4gIGNhbGxiYWNrOiBGaWx0ZXJDYWxsYmFjaztcclxuICBkZWZhdWx0T3B0aW9uczogTXVsdGlwbGVTZWxlY3RPcHRpb247XHJcbiAgaXNGaWxsZWQgPSBmYWxzZTtcclxuICBsYWJlbE5hbWU6IHN0cmluZztcclxuICBsYWJlbFByZWZpeE5hbWU6IHN0cmluZztcclxuICBsYWJlbFN1ZmZpeE5hbWU6IHN0cmluZztcclxuICBvcHRpb25MYWJlbDogc3RyaW5nO1xyXG4gIHZhbHVlTmFtZTogc3RyaW5nO1xyXG4gIGVuYWJsZVRyYW5zbGF0ZUxhYmVsID0gZmFsc2U7XHJcbiAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgRmlsdGVyXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSwgcHJvdGVjdGVkIGNvbGxlY3Rpb25TZXJ2aWNlOiBDb2xsZWN0aW9uU2VydmljZSwgcHJvdGVjdGVkIGlzTXVsdGlwbGVTZWxlY3QgPSB0cnVlKSB7XHJcbiAgICAvLyBkZWZhdWx0IG9wdGlvbnMgdXNlZCBieSB0aGlzIEZpbHRlciwgdXNlciBjYW4gb3ZlcndyaXRlIGFueSBvZiB0aGVzZSBieSBwYXNzaW5nIFwib3Rpb25zXCJcclxuICAgIGNvbnN0IG9wdGlvbnM6IE11bHRpcGxlU2VsZWN0T3B0aW9uID0ge1xyXG4gICAgICBhdXRvQWRqdXN0RHJvcEhlaWdodDogdHJ1ZSxcclxuICAgICAgYXV0b0FkanVzdERyb3BQb3NpdGlvbjogdHJ1ZSxcclxuICAgICAgYXV0b0FkanVzdERyb3BXaWR0aEJ5VGV4dFNpemU6IHRydWUsXHJcbiAgICAgIGNvbnRhaW5lcjogJ2JvZHknLFxyXG4gICAgICBmaWx0ZXI6IGZhbHNlLCAgLy8gaW5wdXQgc2VhcmNoIHRlcm0gb24gdG9wIG9mIHRoZSBzZWxlY3Qgb3B0aW9uIGxpc3RcclxuICAgICAgbWF4SGVpZ2h0OiAyNzUsXHJcbiAgICAgIHNpbmdsZTogdHJ1ZSxcclxuXHJcbiAgICAgIHRleHRUZW1wbGF0ZTogKCRlbG0pID0+IHtcclxuICAgICAgICAvLyByZW5kZXIgSFRNTCBjb2RlIG9yIG5vdCwgYnkgZGVmYXVsdCBpdCBpcyBzYW5pdGl6ZWQgYW5kIHdvbid0IGJlIHJlbmRlcmVkXHJcbiAgICAgICAgY29uc3QgaXNSZW5kZXJIdG1sRW5hYmxlZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIuZW5hYmxlUmVuZGVySHRtbCB8fCBmYWxzZTtcclxuICAgICAgICByZXR1cm4gaXNSZW5kZXJIdG1sRW5hYmxlZCA/ICRlbG0udGV4dCgpIDogJGVsbS5odG1sKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG9uQ2xvc2U6ICgpID0+IHtcclxuICAgICAgICAvLyB3ZSB3aWxsIHN1YnNjcmliZSB0byB0aGUgb25DbG9zZSBldmVudCBmb3IgdHJpZ2dlcmluZyBvdXIgY2FsbGJhY2tcclxuICAgICAgICAvLyBhbHNvIGFkZC9yZW1vdmUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSB0aGlzLiRmaWx0ZXJFbG0ubXVsdGlwbGVTZWxlY3QoJ2dldFNlbGVjdHMnKTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzZWxlY3RlZEl0ZW1zKSAmJiBzZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDEgfHwgKHNlbGVjdGVkSXRlbXMubGVuZ3RoID09PSAxICYmIHNlbGVjdGVkSXRlbXNbMF0gIT09ICcnKSkge1xyXG4gICAgICAgICAgdGhpcy5pc0ZpbGxlZCA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLiRmaWx0ZXJFbG0uYWRkQ2xhc3MoJ2ZpbGxlZCcpLnNpYmxpbmdzKCdkaXYgLnNlYXJjaC1maWx0ZXInKS5hZGRDbGFzcygnZmlsbGVkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuaXNGaWxsZWQgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuJGZpbHRlckVsbS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XHJcbiAgICAgICAgICB0aGlzLiRmaWx0ZXJFbG0uc2libGluZ3MoJ2RpdiAuc2VhcmNoLWZpbHRlcicpLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodW5kZWZpbmVkLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIG9wZXJhdG9yOiB0aGlzLm9wZXJhdG9yLCBzZWFyY2hUZXJtczogc2VsZWN0ZWRJdGVtcywgc2hvdWxkVHJpZ2dlclF1ZXJ5OiB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgfSk7XHJcbiAgICAgICAgLy8gcmVzZXQgZmxhZyBmb3IgbmV4dCB1c2VcclxuICAgICAgICB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3QpIHtcclxuICAgICAgb3B0aW9ucy5zaW5nbGUgPSBmYWxzZTtcclxuICAgICAgb3B0aW9ucy5va0J1dHRvbiA9IHRydWU7XHJcbiAgICAgIG9wdGlvbnMuYWRkVGl0bGUgPSB0cnVlOyAvLyBzaG93IHRvb2x0aXAgb2YgYWxsIHNlbGVjdGVkIGl0ZW1zIHdoaWxlIGhvdmVyaW5nIHRoZSBmaWx0ZXJcclxuICAgICAgb3B0aW9ucy5jb3VudFNlbGVjdGVkID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnWF9PRl9ZX1NFTEVDVEVEJyk7XHJcbiAgICAgIG9wdGlvbnMuYWxsU2VsZWN0ZWQgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdBTExfU0VMRUNURUQnKTtcclxuICAgICAgb3B0aW9ucy5zZWxlY3RBbGxUZXh0ID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnU0VMRUNUX0FMTCcpO1xyXG4gICAgICBvcHRpb25zLnNlbGVjdEFsbERlbGltaXRlciA9IFsnJywgJyddOyAvLyByZW1vdmUgZGVmYXVsdCBzcXVhcmUgYnJhY2tldHMgb2YgZGVmYXVsdCB0ZXh0IFwiW1NlbGVjdCBBbGxdXCIgPT4gXCJTZWxlY3QgQWxsXCJcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRlZmF1bHRPcHRpb25zID0gb3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDb2x1bW4gRmlsdGVyIGl0c2VsZiAqL1xyXG4gIHByb3RlY3RlZCBnZXQgY29sdW1uRmlsdGVyKCk6IENvbHVtbkZpbHRlciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIENvbGxlY3Rpb24gT3B0aW9ucyAqL1xyXG4gIHByb3RlY3RlZCBnZXQgY29sbGVjdGlvbk9wdGlvbnMoKTogQ29sbGVjdGlvbk9wdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlci5jb2xsZWN0aW9uT3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDdXN0b20gU3RydWN0dXJlIGlmIGV4aXN0ICovXHJcbiAgcHJvdGVjdGVkIGdldCBjdXN0b21TdHJ1Y3R1cmUoKTogQ29sbGVjdGlvbkN1c3RvbVN0cnVjdHVyZSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlci5jdXN0b21TdHJ1Y3R1cmU7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByb3RlY3RlZCBnZXQgZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gKHRoaXMuZ3JpZCAmJiB0aGlzLmdyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLmdyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgZmlsdGVyIG9wZXJhdG9yICovXHJcbiAgZ2V0IG9wZXJhdG9yKCk6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nIHtcclxuICAgIGlmICh0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaXNNdWx0aXBsZVNlbGVjdCA/IE9wZXJhdG9yVHlwZS5pbiA6IE9wZXJhdG9yVHlwZS5lcXVhbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIGZpbHRlciB0ZW1wbGF0ZVxyXG4gICAqL1xyXG4gIGluaXQoYXJnczogRmlsdGVyQXJndW1lbnRzLCBpc0ZpbHRlckZpcnN0UmVuZGVyOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9pc0ZpbHRlckZpcnN0UmVuZGVyID0gaXNGaWx0ZXJGaXJzdFJlbmRlcjtcclxuICAgIHRoaXMuZ3JpZCA9IGFyZ3MuZ3JpZDtcclxuICAgIHRoaXMuY2FsbGJhY2sgPSBhcmdzLmNhbGxiYWNrO1xyXG4gICAgdGhpcy5jb2x1bW5EZWYgPSBhcmdzLmNvbHVtbkRlZjtcclxuICAgIHRoaXMuc2VhcmNoVGVybXMgPSBhcmdzLnNlYXJjaFRlcm1zIHx8IFtdO1xyXG5cclxuICAgIGlmICghdGhpcy5ncmlkIHx8ICF0aGlzLmNvbHVtbkRlZiB8fCAhdGhpcy5jb2x1bW5GaWx0ZXIgfHwgKCF0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uICYmICF0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uQXN5bmMpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgW0FuZ3VsYXItU2xpY2tHcmlkXSBZb3UgbmVlZCB0byBwYXNzIGEgXCJjb2xsZWN0aW9uXCIgKG9yIFwiY29sbGVjdGlvbkFzeW5jXCIpIGZvciB0aGUgTXVsdGlwbGVTZWxlY3QvU2luZ2xlU2VsZWN0IEZpbHRlciB0byB3b3JrIGNvcnJlY3RseS4gQWxzbyBlYWNoIG9wdGlvbiBzaG91bGQgaW5jbHVkZSBhIHZhbHVlL2xhYmVsIHBhaXIgKG9yIHZhbHVlL2xhYmVsS2V5IHdoZW4gdXNpbmcgTG9jYWxlKS4gRm9yIGV4YW1wbGU6OiB7IGZpbHRlcjogbW9kZWw6IEZpbHRlcnMubXVsdGlwbGVTZWxlY3QsIGNvbGxlY3Rpb246IFt7IHZhbHVlOiB0cnVlLCBsYWJlbDogJ1RydWUnIH0sIHsgdmFsdWU6IGZhbHNlLCBsYWJlbDogJ0ZhbHNlJ31dIH1gKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsID0gdGhpcy5jb2x1bW5GaWx0ZXIuZW5hYmxlVHJhbnNsYXRlTGFiZWw7XHJcbiAgICB0aGlzLmxhYmVsTmFtZSA9IHRoaXMuY3VzdG9tU3RydWN0dXJlICYmIHRoaXMuY3VzdG9tU3RydWN0dXJlLmxhYmVsIHx8ICdsYWJlbCc7XHJcbiAgICB0aGlzLmxhYmVsUHJlZml4TmFtZSA9IHRoaXMuY3VzdG9tU3RydWN0dXJlICYmIHRoaXMuY3VzdG9tU3RydWN0dXJlLmxhYmVsUHJlZml4IHx8ICdsYWJlbFByZWZpeCc7XHJcbiAgICB0aGlzLmxhYmVsU3VmZml4TmFtZSA9IHRoaXMuY3VzdG9tU3RydWN0dXJlICYmIHRoaXMuY3VzdG9tU3RydWN0dXJlLmxhYmVsU3VmZml4IHx8ICdsYWJlbFN1ZmZpeCc7XHJcbiAgICB0aGlzLm9wdGlvbkxhYmVsID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUub3B0aW9uTGFiZWwgfHwgJ3ZhbHVlJztcclxuICAgIHRoaXMudmFsdWVOYW1lID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUudmFsdWUgfHwgJ3ZhbHVlJztcclxuXHJcbiAgICBpZiAodGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCAmJiAoIXRoaXMudHJhbnNsYXRlIHx8IHR5cGVvZiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50ICE9PSAnZnVuY3Rpb24nKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFtzZWxlY3QtZWRpdG9yXSBUaGUgbmd4LXRyYW5zbGF0ZSBUcmFuc2xhdGVTZXJ2aWNlIGlzIHJlcXVpcmVkIGZvciB0aGUgU2VsZWN0IEZpbHRlciB0byB3b3JrIGNvcnJlY3RseWApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFsd2F5cyByZW5kZXIgdGhlIFNlbGVjdCAoZHJvcGRvd24pIERPTSBlbGVtZW50LCBldmVuIGlmIHVzZXIgcGFzc2VkIGEgXCJjb2xsZWN0aW9uQXN5bmNcIixcclxuICAgIC8vIGlmIHRoYXQgaXMgdGhlIGNhc2UsIHRoZSBTZWxlY3Qgd2lsbCBzaW1wbHkgYmUgd2l0aG91dCBhbnkgb3B0aW9ucyBidXQgd2Ugc3RpbGwgaGF2ZSB0byByZW5kZXIgaXQgKGVsc2UgU2xpY2tHcmlkIHdvdWxkIHRocm93IGFuIGVycm9yKVxyXG4gICAgY29uc3QgbmV3Q29sbGVjdGlvbiA9IHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb24gfHwgW107XHJcbiAgICB0aGlzLnJlbmRlckRvbUVsZW1lbnQobmV3Q29sbGVjdGlvbik7XHJcblxyXG4gICAgLy8gb24gZXZlcnkgRmlsdGVyIHdoaWNoIGhhdmUgYSBcImNvbGxlY3Rpb25cIiBvciBhIFwiY29sbGVjdGlvbkFzeW5jXCJcclxuICAgIC8vIHdlIHdpbGwgYWRkIChvciByZXBsYWNlKSBhIFN1YmplY3QgdG8gdGhlIFwiY29sbGVjdGlvbkFzeW5jXCIgcHJvcGVydHkgc28gdGhhdCB1c2VyIGhhcyBwb3NzaWJpbGl0eSB0byBjaGFuZ2UgdGhlIGNvbGxlY3Rpb25cclxuICAgIC8vIGlmIFwiY29sbGVjdGlvbkFzeW5jXCIgaXMgYWxyZWFkeSBzZXQgYnkgdGhlIHVzZXIsIGl0IHdpbGwgcmVzb2x2ZSBpdCBmaXJzdCB0aGVuIGFmdGVyIGl0IHdpbGwgcmVwbGFjZSBpdCB3aXRoIGEgU3ViamVjdFxyXG4gICAgY29uc3QgY29sbGVjdGlvbkFzeW5jID0gdGhpcy5jb2x1bW5GaWx0ZXIgJiYgdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbkFzeW5jO1xyXG4gICAgaWYgKGNvbGxlY3Rpb25Bc3luYykge1xyXG4gICAgICB0aGlzLnJlbmRlck9wdGlvbnNBc3luYyhjb2xsZWN0aW9uQXN5bmMpOyAvLyBjcmVhdGUgU3ViamVjdCBhZnRlciByZXNvbHZlIChjcmVhdGVDb2xsZWN0aW9uQXN5bmNTdWJqZWN0KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIGZpbHRlciB2YWx1ZXNcclxuICAgKi9cclxuICBjbGVhcihzaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlKSB7XHJcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtICYmIHRoaXMuJGZpbHRlckVsbS5tdWx0aXBsZVNlbGVjdCkge1xyXG4gICAgICAvLyByZWxvYWQgdGhlIGZpbHRlciBlbGVtZW50IGJ5IGl0J3MgaWQsIHRvIG1ha2Ugc3VyZSBpdCdzIHN0aWxsIGEgdmFsaWQgZWxlbWVudCAoYmVjYXVzZSBvZiBzb21lIGlzc3VlIGluIHRoZSBHcmFwaFFMIGV4YW1wbGUpXHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5tdWx0aXBsZVNlbGVjdCgnc2V0U2VsZWN0cycsIFtdKTtcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLnNpYmxpbmdzKCdkaXYgLnNlYXJjaC1maWx0ZXInKS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XHJcbiAgICAgIHRoaXMuc2VhcmNoVGVybXMgPSBbXTtcclxuICAgICAgdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gc2hvdWxkVHJpZ2dlclF1ZXJ5O1xyXG4gICAgICB0aGlzLmNhbGxiYWNrKHVuZGVmaW5lZCwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBjbGVhckZpbHRlclRyaWdnZXJlZDogdHJ1ZSwgc2hvdWxkVHJpZ2dlclF1ZXJ5OiB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgfSk7XHJcbiAgICAgIC8vIHJlc2V0IGJvdGggZmxhZ3MgZm9yIG5leHQgdXNlXHJcbiAgICAgIHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBkZXN0cm95IHRoZSBmaWx0ZXJcclxuICAgKi9cclxuICBkZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSkge1xyXG4gICAgICAvLyByZW1vdmUgZXZlbnQgd2F0Y2hlclxyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ub2ZmKCkucmVtb3ZlKCk7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnRDbGFzc05hbWUgPSB0aGlzLmVsZW1lbnROYW1lLnRvU3RyaW5nKCkucmVwbGFjZSgnLicsICdcXFxcLicpOyAvLyBtYWtlIHN1cmUgdG8gZXNjYXBlIGFueSBkb3QgXCIuXCIgZnJvbSBDU1MgY2xhc3MgdG8gYXZvaWQgY29uc29sZSBlcnJvclxyXG4gICAgICAkKGBbbmFtZT0ke2VsZW1lbnRDbGFzc05hbWV9XS5tcy1kcm9wYCkucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWxzbyBkaXNwb3NlIG9mIGFsbCBTdWJzY3JpcHRpb25zXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzKHRoaXMuc3Vic2NyaXB0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdmFsdWUocykgb24gdGhlIERPTSBlbGVtZW50XHJcbiAgICovXHJcbiAgc2V0VmFsdWVzKHZhbHVlczogU2VhcmNoVGVybSB8IFNlYXJjaFRlcm1bXSkge1xyXG4gICAgaWYgKHZhbHVlcykge1xyXG4gICAgICB2YWx1ZXMgPSBBcnJheS5pc0FycmF5KHZhbHVlcykgPyB2YWx1ZXMgOiBbdmFsdWVzXTtcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLm11bHRpcGxlU2VsZWN0KCdzZXRTZWxlY3RzJywgdmFsdWVzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vXHJcbiAgLy8gcHJvdGVjdGVkIGZ1bmN0aW9uc1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKipcclxuICAgKiB1c2VyIG1pZ2h0IHdhbnQgdG8gZmlsdGVyIGNlcnRhaW4gaXRlbXMgb2YgdGhlIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gaW5wdXRDb2xsZWN0aW9uXHJcbiAgICogQHJldHVybiBvdXRwdXRDb2xsZWN0aW9uIGZpbHRlcmVkIGFuZC9vciBzb3J0ZWQgY29sbGVjdGlvblxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBmaWx0ZXJDb2xsZWN0aW9uKGlucHV0Q29sbGVjdGlvbikge1xyXG4gICAgbGV0IG91dHB1dENvbGxlY3Rpb24gPSBpbnB1dENvbGxlY3Rpb247XHJcblxyXG4gICAgLy8gdXNlciBtaWdodCB3YW50IHRvIGZpbHRlciBjZXJ0YWluIGl0ZW1zIG9mIHRoZSBjb2xsZWN0aW9uXHJcbiAgICBpZiAodGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5GaWx0ZXIgJiYgdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbkZpbHRlckJ5KSB7XHJcbiAgICAgIGNvbnN0IGZpbHRlckJ5ID0gdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbkZpbHRlckJ5O1xyXG4gICAgICBjb25zdCBmaWx0ZXJDb2xsZWN0aW9uQnkgPSB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uT3B0aW9ucy5maWx0ZXJSZXN1bHRBZnRlckVhY2hQYXNzIHx8IG51bGw7XHJcbiAgICAgIG91dHB1dENvbGxlY3Rpb24gPSB0aGlzLmNvbGxlY3Rpb25TZXJ2aWNlLmZpbHRlckNvbGxlY3Rpb24ob3V0cHV0Q29sbGVjdGlvbiwgZmlsdGVyQnksIGZpbHRlckNvbGxlY3Rpb25CeSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG91dHB1dENvbGxlY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB1c2VyIG1pZ2h0IHdhbnQgdG8gc29ydCB0aGUgY29sbGVjdGlvbiBpbiBhIGNlcnRhaW4gd2F5XHJcbiAgICogQHBhcmFtIGlucHV0Q29sbGVjdGlvblxyXG4gICAqIEByZXR1cm4gb3V0cHV0Q29sbGVjdGlvbiBmaWx0ZXJlZCBhbmQvb3Igc29ydGVkIGNvbGxlY3Rpb25cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgc29ydENvbGxlY3Rpb24oaW5wdXRDb2xsZWN0aW9uKSB7XHJcbiAgICBsZXQgb3V0cHV0Q29sbGVjdGlvbiA9IGlucHV0Q29sbGVjdGlvbjtcclxuXHJcbiAgICAvLyB1c2VyIG1pZ2h0IHdhbnQgdG8gc29ydCB0aGUgY29sbGVjdGlvblxyXG4gICAgaWYgKHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRmlsdGVyICYmIHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25Tb3J0QnkpIHtcclxuICAgICAgY29uc3Qgc29ydEJ5ID0gdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvblNvcnRCeTtcclxuICAgICAgb3V0cHV0Q29sbGVjdGlvbiA9IHRoaXMuY29sbGVjdGlvblNlcnZpY2Uuc29ydENvbGxlY3Rpb24odGhpcy5jb2x1bW5EZWYsIG91dHB1dENvbGxlY3Rpb24sIHNvcnRCeSwgdGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG91dHB1dENvbGxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYXN5bmMgcmVuZGVyT3B0aW9uc0FzeW5jKGNvbGxlY3Rpb25Bc3luYzogUHJvbWlzZTxhbnk+IHwgT2JzZXJ2YWJsZTxhbnk+IHwgU3ViamVjdDxhbnk+KSB7XHJcbiAgICBsZXQgYXdhaXRlZENvbGxlY3Rpb246IGFueSA9IFtdO1xyXG5cclxuICAgIGlmIChjb2xsZWN0aW9uQXN5bmMpIHtcclxuICAgICAgYXdhaXRlZENvbGxlY3Rpb24gPSBhd2FpdCBjYXN0VG9Qcm9taXNlKGNvbGxlY3Rpb25Bc3luYyk7XHJcbiAgICAgIHRoaXMucmVuZGVyRG9tRWxlbWVudEZyb21Db2xsZWN0aW9uQXN5bmMoYXdhaXRlZENvbGxlY3Rpb24pO1xyXG5cclxuICAgICAgLy8gYmVjYXVzZSB3ZSBhY2NlcHQgUHJvbWlzZXMgJiBIdHRwQ2xpZW50IE9ic2VydmFibGUgb25seSBleGVjdXRlIG9uY2VcclxuICAgICAgLy8gd2Ugd2lsbCByZS1jcmVhdGUgYW4gUnhKcyBTdWJqZWN0IHdoaWNoIHdpbGwgcmVwbGFjZSB0aGUgXCJjb2xsZWN0aW9uQXN5bmNcIiB3aGljaCBnb3QgZXhlY3V0ZWQgb25jZSBhbnl3YXlcclxuICAgICAgLy8gZG9pbmcgdGhpcyBwcm92aWRlIHRoZSB1c2VyIGEgd2F5IHRvIGNhbGwgYSBcImNvbGxlY3Rpb25Bc3luYy5uZXh0KClcIlxyXG4gICAgICB0aGlzLmNyZWF0ZUNvbGxlY3Rpb25Bc3luY1N1YmplY3QoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBDcmVhdGUgb3IgcmVjcmVhdGUgYW4gT2JzZXJ2YWJsZSBTdWJqZWN0IGFuZCByZWFzc2lnbiBpdCB0byB0aGUgXCJjb2xsZWN0aW9uQXN5bmNcIiBvYmplY3Qgc28gdXNlciBjYW4gY2FsbCBhIFwiY29sbGVjdGlvbkFzeW5jLm5leHQoKVwiIG9uIGl0ICovXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZUNvbGxlY3Rpb25Bc3luY1N1YmplY3QoKSB7XHJcbiAgICBjb25zdCBuZXdDb2xsZWN0aW9uQXN5bmMgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgICB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uQXN5bmMgPSBuZXdDb2xsZWN0aW9uQXN5bmM7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgbmV3Q29sbGVjdGlvbkFzeW5jLnN1YnNjcmliZShjb2xsZWN0aW9uID0+IHRoaXMucmVuZGVyRG9tRWxlbWVudEZyb21Db2xsZWN0aW9uQXN5bmMoY29sbGVjdGlvbikpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB1c2VyIHVzZSBhIENvbGxlY3Rpb25Bc3luYyB3ZSB3aWxsIHVzZSB0aGUgcmV0dXJuZWQgY29sbGVjdGlvbiB0byByZW5kZXIgdGhlIGZpbHRlciBET00gZWxlbWVudFxyXG4gICAqIGFuZCByZWluaXRpYWxpemUgZmlsdGVyIGNvbGxlY3Rpb24gd2l0aCB0aGlzIG5ldyBjb2xsZWN0aW9uXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIHJlbmRlckRvbUVsZW1lbnRGcm9tQ29sbGVjdGlvbkFzeW5jKGNvbGxlY3Rpb24pIHtcclxuICAgIGlmICh0aGlzLmNvbGxlY3Rpb25PcHRpb25zICYmIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuY29sbGVjdGlvbkluT2JqZWN0UHJvcGVydHkpIHtcclxuICAgICAgY29sbGVjdGlvbiA9IGdldERlc2NlbmRhbnRQcm9wZXJ0eShjb2xsZWN0aW9uLCB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmNvbGxlY3Rpb25Jbk9iamVjdFByb3BlcnR5KTtcclxuICAgIH1cclxuICAgIGlmICghQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHRyeWluZyB0byBwdWxsIHRoZSBjb2xsZWN0aW9uIGZyb20gdGhlIFwiY29sbGVjdGlvbkFzeW5jXCIgY2FsbCBpbiB0aGUgU2VsZWN0IEZpbHRlciwgdGhlIGNvbGxlY3Rpb24gaXMgbm90IGEgdmFsaWQgYXJyYXkuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29weSBvdmVyIHRoZSBhcnJheSByZWNlaXZlZCBmcm9tIHRoZSBhc3luYyBjYWxsIHRvIHRoZSBcImNvbGxlY3Rpb25cIiBhcyB0aGUgbmV3IGNvbGxlY3Rpb24gdG8gdXNlXHJcbiAgICAvLyB0aGlzIGhhcyB0byBiZSBCRUZPUkUgdGhlIGBjb2xsZWN0aW9uT2JzZXJ2ZXIoKS5zdWJzY3JpYmVgIHRvIGF2b2lkIGdvaW5nIGludG8gYW4gaW5maW5pdGUgbG9vcFxyXG4gICAgdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XHJcblxyXG4gICAgLy8gcmVjcmVhdGUgTXVsdGlwbGUgU2VsZWN0IGFmdGVyIGdldHRpbmcgYXN5bmMgY29sbGVjdGlvblxyXG4gICAgdGhpcy5yZW5kZXJEb21FbGVtZW50KGNvbGxlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHJlbmRlckRvbUVsZW1lbnQoY29sbGVjdGlvbikge1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pICYmIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5jb2xsZWN0aW9uSW5PYmplY3RQcm9wZXJ0eSkge1xyXG4gICAgICBjb2xsZWN0aW9uID0gZ2V0RGVzY2VuZGFudFByb3BlcnR5KGNvbGxlY3Rpb24sIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuY29sbGVjdGlvbkluT2JqZWN0UHJvcGVydHkpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIFwiY29sbGVjdGlvblwiIHBhc3NlZCB0byB0aGUgU2VsZWN0IEZpbHRlciBpcyBub3QgYSB2YWxpZCBhcnJheScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVzZXIgY2FuIG9wdGlvbmFsbHkgYWRkIGEgYmxhbmsgZW50cnkgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgY29sbGVjdGlvblxyXG4gICAgaWYgKHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5hZGRCbGFua0VudHJ5ICYmIHRoaXMuX2lzRmlsdGVyRmlyc3RSZW5kZXIpIHtcclxuICAgICAgY29sbGVjdGlvbi51bnNoaWZ0KHRoaXMuY3JlYXRlQmxhbmtFbnRyeSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbmV3Q29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XHJcblxyXG4gICAgLy8gdXNlciBtaWdodCB3YW50IHRvIGZpbHRlciBhbmQvb3Igc29ydCBjZXJ0YWluIGl0ZW1zIG9mIHRoZSBjb2xsZWN0aW9uXHJcbiAgICBuZXdDb2xsZWN0aW9uID0gdGhpcy5maWx0ZXJDb2xsZWN0aW9uKG5ld0NvbGxlY3Rpb24pO1xyXG4gICAgbmV3Q29sbGVjdGlvbiA9IHRoaXMuc29ydENvbGxlY3Rpb24obmV3Q29sbGVjdGlvbik7XHJcblxyXG4gICAgLy8gc3RlcCAxLCBjcmVhdGUgSFRNTCBzdHJpbmcgdGVtcGxhdGVcclxuICAgIGNvbnN0IGZpbHRlclRlbXBsYXRlID0gdGhpcy5idWlsZFRlbXBsYXRlSHRtbFN0cmluZyhuZXdDb2xsZWN0aW9uLCB0aGlzLnNlYXJjaFRlcm1zKTtcclxuXHJcbiAgICAvLyBzdGVwIDIsIGNyZWF0ZSB0aGUgRE9NIEVsZW1lbnQgb2YgdGhlIGZpbHRlciAmIHByZS1sb2FkIHNlYXJjaCB0ZXJtc1xyXG4gICAgLy8gYWxzbyBzdWJzY3JpYmUgdG8gdGhlIG9uQ2xvc2UgZXZlbnRcclxuICAgIHRoaXMuY3JlYXRlRG9tRWxlbWVudChmaWx0ZXJUZW1wbGF0ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdGhlIEhUTUwgdGVtcGxhdGUgYXMgYSBzdHJpbmdcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcob3B0aW9uQ29sbGVjdGlvbjogYW55W10sIHNlYXJjaFRlcm1zOiBTZWFyY2hUZXJtW10pIHtcclxuICAgIGxldCBvcHRpb25zID0gJyc7XHJcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XHJcbiAgICBjb25zdCBzZXBhcmF0b3JCZXR3ZWVuTGFiZWxzID0gdGhpcy5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLnNlcGFyYXRvckJldHdlZW5UZXh0TGFiZWxzIHx8ICcnO1xyXG4gICAgY29uc3QgaXNSZW5kZXJIdG1sRW5hYmxlZCA9IHRoaXMuY29sdW1uRmlsdGVyICYmIHRoaXMuY29sdW1uRmlsdGVyLmVuYWJsZVJlbmRlckh0bWwgfHwgZmFsc2U7XHJcbiAgICBjb25zdCBzYW5pdGl6ZWRPcHRpb25zID0gdGhpcy5ncmlkT3B0aW9ucyAmJiB0aGlzLmdyaWRPcHRpb25zLnNhbml0aXplSHRtbE9wdGlvbnMgfHwge307XHJcblxyXG4gICAgLy8gY29sbGVjdGlvbiBjb3VsZCBiZSBhbiBBcnJheSBvZiBTdHJpbmdzIE9SIE9iamVjdHNcclxuICAgIGlmIChvcHRpb25Db2xsZWN0aW9uLmV2ZXJ5KHggPT4gdHlwZW9mIHggPT09ICdzdHJpbmcnKSkge1xyXG4gICAgICBvcHRpb25Db2xsZWN0aW9uLmZvckVhY2goKG9wdGlvbjogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSAoc2VhcmNoVGVybXMuZmluZEluZGV4KCh0ZXJtKSA9PiB0ZXJtID09PSBvcHRpb24pID49IDApID8gJ3NlbGVjdGVkJyA6ICcnO1xyXG4gICAgICAgIG9wdGlvbnMgKz0gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvbn1cIiBsYWJlbD1cIiR7b3B0aW9ufVwiICR7c2VsZWN0ZWR9PiR7b3B0aW9ufTwvb3B0aW9uPmA7XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZXJlJ3MgYXQgbGVhc3QgMSBzZWFyY2ggdGVybSBmb3VuZCwgd2Ugd2lsbCBhZGQgdGhlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcclxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgIHRoaXMuaXNGaWxsZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBhcnJheSBvZiBvYmplY3RzIHdpbGwgcmVxdWlyZSBhIGxhYmVsL3ZhbHVlIHBhaXIgdW5sZXNzIGEgY3VzdG9tU3RydWN0dXJlIGlzIHBhc3NlZFxyXG4gICAgICBvcHRpb25Db2xsZWN0aW9uLmZvckVhY2goKG9wdGlvbjogU2VsZWN0T3B0aW9uKSA9PiB7XHJcbiAgICAgICAgaWYgKCFvcHRpb24gfHwgKG9wdGlvblt0aGlzLmxhYmVsTmFtZV0gPT09IHVuZGVmaW5lZCAmJiBvcHRpb24ubGFiZWxLZXkgPT09IHVuZGVmaW5lZCkpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgW3NlbGVjdC1maWx0ZXJdIEEgY29sbGVjdGlvbiB3aXRoIHZhbHVlL2xhYmVsIChvciB2YWx1ZS9sYWJlbEtleSB3aGVuIHVzaW5nIExvY2FsZSkgaXMgcmVxdWlyZWQgdG8gcG9wdWxhdGUgdGhlIFNlbGVjdCBsaXN0LCBmb3IgZXhhbXBsZTo6IHsgZmlsdGVyOiBtb2RlbDogRmlsdGVycy5tdWx0aXBsZVNlbGVjdCwgY29sbGVjdGlvbjogWyB7IHZhbHVlOiAnMScsIGxhYmVsOiAnT25lJyB9IF0nKWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsYWJlbEtleSA9IChvcHRpb24ubGFiZWxLZXkgfHwgb3B0aW9uW3RoaXMubGFiZWxOYW1lXSkgYXMgc3RyaW5nO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gKHNlYXJjaFRlcm1zLmZpbmRJbmRleCgodGVybSkgPT4gdGVybSA9PT0gb3B0aW9uW3RoaXMudmFsdWVOYW1lXSkgPj0gMCkgPyAnc2VsZWN0ZWQnIDogJyc7XHJcbiAgICAgICAgY29uc3QgbGFiZWxUZXh0ID0gKChvcHRpb24ubGFiZWxLZXkgfHwgdGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCkgJiYgbGFiZWxLZXkpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChsYWJlbEtleSB8fCAnICcpIDogbGFiZWxLZXk7XHJcbiAgICAgICAgbGV0IHByZWZpeFRleHQgPSBvcHRpb25bdGhpcy5sYWJlbFByZWZpeE5hbWVdIHx8ICcnO1xyXG4gICAgICAgIGxldCBzdWZmaXhUZXh0ID0gb3B0aW9uW3RoaXMubGFiZWxTdWZmaXhOYW1lXSB8fCAnJztcclxuICAgICAgICBsZXQgb3B0aW9uTGFiZWwgPSBvcHRpb25bdGhpcy5vcHRpb25MYWJlbF0gfHwgJyc7XHJcbiAgICAgICAgb3B0aW9uTGFiZWwgPSBvcHRpb25MYWJlbC50b1N0cmluZygpLnJlcGxhY2UoL1xcXCIvZywgJ1xcJycpOyAvLyByZXBsYWNlIGRvdWJsZSBxdW90ZXMgYnkgc2luZ2xlIHF1b3RlcyB0byBhdm9pZCBpbnRlcmZlcmluZyB3aXRoIHJlZ3VsYXIgaHRtbFxyXG5cclxuICAgICAgICAvLyBhbHNvIHRyYW5zbGF0ZSBwcmVmaXgvc3VmZml4IGlmIGVuYWJsZVRyYW5zbGF0ZUxhYmVsIGlzIHRydWUgYW5kIHRleHQgaXMgYSBzdHJpbmdcclxuICAgICAgICBwcmVmaXhUZXh0ID0gKHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgJiYgcHJlZml4VGV4dCAmJiB0eXBlb2YgcHJlZml4VGV4dCA9PT0gJ3N0cmluZycpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChwcmVmaXhUZXh0IHx8ICcgJykgOiBwcmVmaXhUZXh0O1xyXG4gICAgICAgIHN1ZmZpeFRleHQgPSAodGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCAmJiBzdWZmaXhUZXh0ICYmIHR5cGVvZiBzdWZmaXhUZXh0ID09PSAnc3RyaW5nJykgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KHN1ZmZpeFRleHQgfHwgJyAnKSA6IHN1ZmZpeFRleHQ7XHJcbiAgICAgICAgb3B0aW9uTGFiZWwgPSAodGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCAmJiBvcHRpb25MYWJlbCAmJiB0eXBlb2Ygb3B0aW9uTGFiZWwgPT09ICdzdHJpbmcnKSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQob3B0aW9uTGFiZWwgfHwgJyAnKSA6IG9wdGlvbkxhYmVsO1xyXG5cclxuICAgICAgICAvLyBhZGQgdG8gYSB0ZW1wIGFycmF5IGZvciBqb2luaW5nIHB1cnBvc2UgYW5kIGZpbHRlciBvdXQgZW1wdHkgdGV4dFxyXG4gICAgICAgIGNvbnN0IHRtcE9wdGlvbkFycmF5ID0gW3ByZWZpeFRleHQsIGxhYmVsVGV4dCwgc3VmZml4VGV4dF0uZmlsdGVyKCh0ZXh0KSA9PiB0ZXh0KTtcclxuICAgICAgICBsZXQgb3B0aW9uVGV4dCA9IHRtcE9wdGlvbkFycmF5LmpvaW4oc2VwYXJhdG9yQmV0d2VlbkxhYmVscyk7XHJcblxyXG4gICAgICAgIC8vIGlmIHVzZXIgc3BlY2lmaWNhbGx5IHdhbnRzIHRvIHJlbmRlciBodG1sIHRleHQsIGhlIG5lZWRzIHRvIG9wdC1pbiBlbHNlIGl0IHdpbGwgc3RyaXBwZWQgb3V0IGJ5IGRlZmF1bHRcclxuICAgICAgICAvLyBhbHNvLCB0aGUgM3JkIHBhcnR5IGxpYiB3aWxsIHNhbmluaXR6ZSBhbnkgaHRtbCBjb2RlIHVubGVzcyBpdCdzIGVuY29kZWQsIHNvIHdlJ2xsIGRvIHRoYXRcclxuICAgICAgICBpZiAoaXNSZW5kZXJIdG1sRW5hYmxlZCkge1xyXG4gICAgICAgICAgLy8gc2FuaXRpemUgYW55IHVuYXV0aG9yaXplZCBodG1sIHRhZ3MgbGlrZSBzY3JpcHQgYW5kIG90aGVyc1xyXG4gICAgICAgICAgLy8gZm9yIHRoZSByZW1haW5pbmcgYWxsb3dlZCB0YWdzIHdlJ2xsIHBlcm1pdCBhbGwgYXR0cmlidXRlc1xyXG4gICAgICAgICAgY29uc3Qgc2FuaXRpemVkVGV4dCA9IERPTVB1cmlmeS5zYW5pdGl6ZShvcHRpb25UZXh0LCBzYW5pdGl6ZWRPcHRpb25zKTtcclxuICAgICAgICAgIG9wdGlvblRleHQgPSBodG1sRW5jb2RlKHNhbml0aXplZFRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaHRtbCB0ZXh0IG9mIGVhY2ggc2VsZWN0IG9wdGlvblxyXG4gICAgICAgIG9wdGlvbnMgKz0gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvblt0aGlzLnZhbHVlTmFtZV19XCIgbGFiZWw9XCIke29wdGlvbkxhYmVsfVwiICR7c2VsZWN0ZWR9PiR7b3B0aW9uVGV4dH08L29wdGlvbj5gO1xyXG5cclxuICAgICAgICAvLyBpZiB0aGVyZSdzIGF0IGxlYXN0IDEgc2VhcmNoIHRlcm0gZm91bmQsIHdlIHdpbGwgYWRkIHRoZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICB0aGlzLmlzRmlsbGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBgPHNlbGVjdCBjbGFzcz1cIm1zLWZpbHRlciBzZWFyY2gtZmlsdGVyIGZpbHRlci0ke2ZpZWxkSWR9XCIgJHt0aGlzLmlzTXVsdGlwbGVTZWxlY3QgPyAnbXVsdGlwbGU9XCJtdWx0aXBsZVwiJyA6ICcnfT4ke29wdGlvbnN9PC9zZWxlY3Q+YDtcclxuICB9XHJcblxyXG4gIC8qKiBDcmVhdGUgYSBibGFuayBlbnRyeSB0aGF0IGNhbiBiZSBhZGRlZCB0byB0aGUgY29sbGVjdGlvbi4gSXQgd2lsbCBhbHNvIHJldXNlIHRoZSBzYW1lIGN1c3RvbVN0cnVjdHVyZSBpZiBuZWVkIGJlICovXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZUJsYW5rRW50cnkoKSB7XHJcbiAgICBjb25zdCBibGFua0VudHJ5ID0ge1xyXG4gICAgICBbdGhpcy5sYWJlbE5hbWVdOiAnJyxcclxuICAgICAgW3RoaXMudmFsdWVOYW1lXTogJydcclxuICAgIH07XHJcbiAgICBpZiAodGhpcy5sYWJlbFByZWZpeE5hbWUpIHtcclxuICAgICAgYmxhbmtFbnRyeVt0aGlzLmxhYmVsUHJlZml4TmFtZV0gPSAnJztcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmxhYmVsU3VmZml4TmFtZSkge1xyXG4gICAgICBibGFua0VudHJ5W3RoaXMubGFiZWxTdWZmaXhOYW1lXSA9ICcnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJsYW5rRW50cnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGcm9tIHRoZSBodG1sIHRlbXBsYXRlIHN0cmluZywgY3JlYXRlIGEgRE9NIGVsZW1lbnRcclxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIG9uQ2xvc2UgZXZlbnQgYW5kIHJ1biB0aGUgY2FsbGJhY2sgd2hlbiB0aGF0IGhhcHBlbnNcclxuICAgKiBAcGFyYW0gZmlsdGVyVGVtcGxhdGVcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgY3JlYXRlRG9tRWxlbWVudChmaWx0ZXJUZW1wbGF0ZTogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XHJcblxyXG4gICAgLy8gcHJvdmlkZSB0aGUgbmFtZSBhdHRyaWJ1dGUgdG8gdGhlIERPTSBlbGVtZW50IHdoaWNoIHdpbGwgYmUgbmVlZGVkIHRvIGF1dG8tYWRqdXN0IGRyb3AgcG9zaXRpb24gKGRyb3B1cCAvIGRyb3Bkb3duKVxyXG4gICAgdGhpcy5lbGVtZW50TmFtZSA9IGBmaWx0ZXItJHtmaWVsZElkfWA7XHJcbiAgICB0aGlzLmRlZmF1bHRPcHRpb25zLm5hbWUgPSB0aGlzLmVsZW1lbnROYW1lO1xyXG5cclxuICAgIGNvbnN0ICRoZWFkZXJFbG0gPSB0aGlzLmdyaWQuZ2V0SGVhZGVyUm93Q29sdW1uKGZpZWxkSWQpO1xyXG4gICAgJCgkaGVhZGVyRWxtKS5lbXB0eSgpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIGVsZW1lbnQgJiBhZGQgYW4gSUQgYW5kIGZpbHRlciBjbGFzc1xyXG4gICAgdGhpcy4kZmlsdGVyRWxtID0gJChmaWx0ZXJUZW1wbGF0ZSk7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuJGZpbHRlckVsbS5tdWx0aXBsZVNlbGVjdCAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYG11bHRpcGxlLXNlbGVjdC5qcyB3YXMgbm90IGZvdW5kLCBtYWtlIHN1cmUgdG8gbW9kaWZ5IHlvdXIgXCJhbmd1bGFyLWNsaS5qc29uXCIgZmlsZSBhbmQgaW5jbHVkZSBcIi4uL25vZGVfbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9saWIvbXVsdGlwbGUtc2VsZWN0L211bHRpcGxlLXNlbGVjdC5qc1wiIGFuZCBpdCdzIGNzcyBvciBTQVNTIGZpbGVgKTtcclxuICAgIH1cclxuICAgIHRoaXMuJGZpbHRlckVsbS5hdHRyKCdpZCcsIHRoaXMuZWxlbWVudE5hbWUpO1xyXG4gICAgdGhpcy4kZmlsdGVyRWxtLmF0dHIoJ25hbWUnLCB0aGlzLmVsZW1lbnROYW1lKTtcclxuICAgIHRoaXMuJGZpbHRlckVsbS5kYXRhKCdjb2x1bW5JZCcsIGZpZWxkSWQpO1xyXG5cclxuICAgIC8vIGlmIHRoZXJlJ3MgYSBzZWFyY2ggdGVybSwgd2Ugd2lsbCBhZGQgdGhlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcclxuICAgIGlmICh0aGlzLmlzRmlsbGVkKSB7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXBwZW5kIHRoZSBuZXcgRE9NIGVsZW1lbnQgdG8gdGhlIGhlYWRlciByb3dcclxuICAgIGlmICh0aGlzLiRmaWx0ZXJFbG0gJiYgdHlwZW9mIHRoaXMuJGZpbHRlckVsbS5hcHBlbmRUbyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0uYXBwZW5kVG8oJGhlYWRlckVsbSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWVyZ2Ugb3B0aW9ucyAmIGF0dGFjaCBtdWx0aVNlbGVjdFxyXG4gICAgY29uc3QgZWxlbWVudE9wdGlvbnM6IE11bHRpcGxlU2VsZWN0T3B0aW9uID0geyAuLi50aGlzLmRlZmF1bHRPcHRpb25zLCAuLi50aGlzLmNvbHVtbkZpbHRlci5maWx0ZXJPcHRpb25zIH07XHJcbiAgICB0aGlzLmZpbHRlckVsbU9wdGlvbnMgPSB7IC4uLnRoaXMuZGVmYXVsdE9wdGlvbnMsIC4uLmVsZW1lbnRPcHRpb25zIH07XHJcbiAgICB0aGlzLiRmaWx0ZXJFbG0gPSB0aGlzLiRmaWx0ZXJFbG0ubXVsdGlwbGVTZWxlY3QodGhpcy5maWx0ZXJFbG1PcHRpb25zKTtcclxuICB9XHJcbn1cclxuIl19