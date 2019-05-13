/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Constants } from '../constants';
import { FieldType, } from './../models/index';
import { CollectionService } from '../services/index';
import { arraysEqual, findOrDefault, getDescendantProperty, htmlEncode, unsubscribeAllObservables } from '../services/utilities';
import * as DOMPurify_ from 'dompurify';
/** @type {?} */
var DOMPurify = DOMPurify_;
/**
 * Slickgrid editor class for multiple/single select lists
 */
var /**
 * Slickgrid editor class for multiple/single select lists
 */
SelectEditor = /** @class */ (function () {
    function SelectEditor(args, isMultipleSelect) {
        var _this = this;
        this.args = args;
        this.isMultipleSelect = isMultipleSelect;
        /**
         * Observable Subscriptions
         */
        this._subscriptions = [];
        // flag to signal that the editor is destroying itself, helps prevent
        // commit changes from being called twice and erroring
        this._destroying = false;
        this.gridOptions = (/** @type {?} */ (this.args.grid.getOptions()));
        /** @type {?} */
        var gridOptions = this.gridOptions || this.args.column.params || {};
        this._translate = gridOptions.i18n;
        // provide the name attribute to the DOM element which will be needed to auto-adjust drop position (dropup / dropdown)
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        this.elementName = "editor-" + fieldId;
        /** @type {?} */
        var libOptions = {
            autoAdjustDropHeight: true,
            autoAdjustDropPosition: true,
            autoAdjustDropWidthByTextSize: true,
            container: 'body',
            filter: false,
            maxHeight: 275,
            name: this.elementName,
            single: true,
            textTemplate: (/**
             * @param {?} $elm
             * @return {?}
             */
            function ($elm) {
                // render HTML code or not, by default it is sanitized and won't be rendered
                /** @type {?} */
                var isRenderHtmlEnabled = _this.columnDef && _this.columnDef.internalColumnEditor && _this.columnDef.internalColumnEditor.enableRenderHtml || false;
                return isRenderHtmlEnabled ? $elm.text() : $elm.html();
            }),
            onBlur: (/**
             * @return {?}
             */
            function () { return _this.destroy(); }),
            onClose: (/**
             * @return {?}
             */
            function () {
                if (!_this._destroying && _this.hasAutoCommitEdit) {
                    // do not use args.commitChanges() as this sets the focus to the next
                    // row. Also the select list will stay shown when clicking off the grid
                    args.grid.getEditorLock().commitCurrentEdit();
                }
            })
        };
        if (isMultipleSelect) {
            libOptions.single = false;
            libOptions.addTitle = true;
            libOptions.okButton = true;
            libOptions.selectAllDelimiter = ['', ''];
            if (this._translate) {
                libOptions.countSelected = this._translate.instant('X_OF_Y_SELECTED');
                libOptions.allSelected = this._translate.instant('ALL_SELECTED');
                libOptions.selectAllText = this._translate.instant('SELECT_ALL');
            }
        }
        // assign the multiple select lib options
        this.defaultOptions = libOptions;
        this.init();
    }
    Object.defineProperty(SelectEditor.prototype, "collection", {
        /** Get the Collection */
        get: /**
         * Get the Collection
         * @return {?}
         */
        function () {
            return this.columnDef && this.columnDef && this.columnDef.internalColumnEditor.collection || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectEditor.prototype, "collectionOptions", {
        /** Getter for the Collection Options */
        get: /**
         * Getter for the Collection Options
         * @return {?}
         */
        function () {
            return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.collectionOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectEditor.prototype, "columnDef", {
        /** Get Column Definition object */
        get: /**
         * Get Column Definition object
         * @return {?}
         */
        function () {
            return this.args && this.args.column || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectEditor.prototype, "columnEditor", {
        /** Get Column Editor object */
        get: /**
         * Get Column Editor object
         * @return {?}
         */
        function () {
            return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectEditor.prototype, "customStructure", {
        /** Getter for the Custom Structure if exist */
        get: /**
         * Getter for the Custom Structure if exist
         * @protected
         * @return {?}
         */
        function () {
            return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.customStructure;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectEditor.prototype, "hasAutoCommitEdit", {
        get: /**
         * @return {?}
         */
        function () {
            return this.args.grid.getOptions().autoCommitEdit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectEditor.prototype, "currentValues", {
        /**
         * The current selected values (multiple select) from the collection
         */
        get: /**
         * The current selected values (multiple select) from the collection
         * @return {?}
         */
        function () {
            var _this = this;
            // collection of strings, just return the filtered string that are equals
            if (this.collection.every((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return typeof x === 'string'; }))) {
                return this.collection.filter((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return _this.$editorElm.val().indexOf(c.toString()) !== -1; }));
            }
            // collection of label/value pair
            /** @type {?} */
            var separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
            /** @type {?} */
            var isIncludingPrefixSuffix = this.collectionOptions && this.collectionOptions.includePrefixSuffixToSelectedValues || false;
            return this.collection
                .filter((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return _this.$editorElm.val().indexOf(c[_this.valueName].toString()) !== -1; }))
                .map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) {
                /** @type {?} */
                var labelText = c[_this.valueName];
                /** @type {?} */
                var prefixText = c[_this.labelPrefixName] || '';
                /** @type {?} */
                var suffixText = c[_this.labelSuffixName] || '';
                // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
                /** @type {?} */
                var fieldName = _this.columnDef && _this.columnDef.field;
                /** @type {?} */
                var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
                if (fieldNameFromComplexObject && typeof c === 'object') {
                    return c;
                }
                // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                prefixText = (_this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? _this._translate.instant(prefixText || ' ') : prefixText;
                suffixText = (_this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? _this._translate.instant(suffixText || ' ') : suffixText;
                if (isIncludingPrefixSuffix) {
                    /** @type {?} */
                    var tmpOptionArray = [prefixText, labelText, suffixText].filter((/**
                     * @param {?} text
                     * @return {?}
                     */
                    function (text) { return text; }));
                    return tmpOptionArray.join(separatorBetweenLabels);
                }
                return labelText;
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectEditor.prototype, "currentValue", {
        /**
         * The current selected values (single select) from the collection
         */
        get: /**
         * The current selected values (single select) from the collection
         * @return {?}
         */
        function () {
            var _this = this;
            // collection of strings, just return the filtered string that are equals
            if (this.collection.every((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return typeof x === 'string'; }))) {
                return findOrDefault(this.collection, (/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.toString() === _this.$editorElm.val(); }));
            }
            // collection of label/value pair
            /** @type {?} */
            var separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
            /** @type {?} */
            var isIncludingPrefixSuffix = this.collectionOptions && this.collectionOptions.includePrefixSuffixToSelectedValues || false;
            /** @type {?} */
            var itemFound = findOrDefault(this.collection, (/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c[_this.valueName].toString() === _this.$editorElm.val(); }));
            // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
            /** @type {?} */
            var fieldName = this.columnDef && this.columnDef.field;
            /** @type {?} */
            var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
            if (fieldNameFromComplexObject && typeof itemFound === 'object') {
                return itemFound;
            }
            else if (itemFound) {
                /** @type {?} */
                var labelText = itemFound[this.valueName];
                if (isIncludingPrefixSuffix) {
                    /** @type {?} */
                    var prefixText = itemFound[this.labelPrefixName] || '';
                    /** @type {?} */
                    var suffixText = itemFound[this.labelSuffixName] || '';
                    // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                    prefixText = (this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? this._translate.instant(prefixText || ' ') : prefixText;
                    suffixText = (this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? this._translate.instant(suffixText || ' ') : suffixText;
                    // add to a temp array for joining purpose and filter out empty text
                    /** @type {?} */
                    var tmpOptionArray = [prefixText, labelText, suffixText].filter((/**
                     * @param {?} text
                     * @return {?}
                     */
                    function (text) { return text; }));
                    return tmpOptionArray.join(separatorBetweenLabels);
                }
                return labelText;
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectEditor.prototype, "validator", {
        /** Get the Validator function, can be passed in Editor property or Column Definition */
        get: /**
         * Get the Validator function, can be passed in Editor property or Column Definition
         * @return {?}
         */
        function () {
            return this.columnEditor.validator || this.columnDef.validator;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectEditor.prototype.init = /**
     * @return {?}
     */
    function () {
        if (!this.args) {
            throw new Error('[Angular-SlickGrid] An editor must always have an "init()" with valid arguments.');
        }
        if (!this.columnDef || !this.columnDef.internalColumnEditor || (!this.columnDef.internalColumnEditor.collection && !this.columnDef.internalColumnEditor.collectionAsync)) {
            throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" (or \"collectionAsync\") inside Column Definition Editor for the MultipleSelect/SingleSelect Editor to work correctly.\n      Also each option should include a value/label pair (or value/labelKey when using Locale).\n      For example: { editor: { collection: [{ value: true, label: 'True' },{ value: false, label: 'False'}] } }");
        }
        this._collectionService = new CollectionService(this._translate);
        this.enableTranslateLabel = (this.columnDef.internalColumnEditor.enableTranslateLabel) ? this.columnDef.internalColumnEditor.enableTranslateLabel : false;
        this.labelName = this.customStructure && this.customStructure.label || 'label';
        this.labelPrefixName = this.customStructure && this.customStructure.labelPrefix || 'labelPrefix';
        this.labelSuffixName = this.customStructure && this.customStructure.labelSuffix || 'labelSuffix';
        this.optionLabel = this.customStructure && this.customStructure.optionLabel || 'value';
        this.valueName = this.customStructure && this.customStructure.value || 'value';
        if (this.enableTranslateLabel && (!this._translate || typeof this._translate.instant !== 'function')) {
            throw new Error("[select-editor] The ngx-translate TranslateService is required for the Select Editor to work correctly");
        }
        // always render the Select (dropdown) DOM element, even if user passed a "collectionAsync",
        // if that is the case, the Select will simply be without any options but we still have to render it (else SlickGrid would throw an error)
        this.renderDomElement(this.collection);
    };
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    SelectEditor.prototype.applyValue = /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    function (item, state) {
        /** @type {?} */
        var fieldName = this.columnDef && this.columnDef.field;
        /** @type {?} */
        var fieldType = this.columnDef && this.columnDef.type;
        /** @type {?} */
        var newValue = state;
        // when the provided user defined the column field type as a possible number then try parsing the state value as that
        if (fieldType === FieldType.number || fieldType === FieldType.integer || fieldType === FieldType.boolean) {
            newValue = parseFloat(state);
        }
        // when set as a multiple selection, we can assume that the 3rd party lib multiple-select will return a CSV string
        // we need to re-split that into an array to be the same as the original column
        if (this.isMultipleSelect && typeof state === 'string' && state.indexOf(',') >= 0) {
            newValue = state.split(',');
        }
        // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
        /** @type {?} */
        var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
        /** @type {?} */
        var validation = this.validate(newValue);
        item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? newValue : '';
    };
    /**
     * @return {?}
     */
    SelectEditor.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this._destroying = true;
        if (this.$editorElm && typeof this.$editorElm.multipleSelect === 'function') {
            this.$editorElm.multipleSelect('destroy');
            this.$editorElm.remove();
            /** @type {?} */
            var elementClassName = this.elementName.toString().replace('.', '\\.');
            $("[name=" + elementClassName + "].ms-drop").remove();
        }
        else if (this.$editorElm && typeof this.$editorElm.remove === 'function') {
            this.$editorElm.remove();
        }
        this._subscriptions = unsubscribeAllObservables(this._subscriptions);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    SelectEditor.prototype.loadValue = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var fieldName = this.columnDef && this.columnDef.field;
        // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
        /** @type {?} */
        var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
        if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
            /** @type {?} */
            var currentValue = item[fieldNameFromComplexObject || fieldName];
            /** @type {?} */
            var loadValue = fieldNameFromComplexObject && currentValue.hasOwnProperty(this.valueName) ? currentValue[this.valueName] : currentValue;
            if (this.isMultipleSelect && Array.isArray(loadValue)) {
                this.loadMultipleValues(loadValue);
            }
            else {
                this.loadSingleValue(loadValue);
            }
            this.refresh();
        }
    };
    /**
     * @param {?} currentValues
     * @return {?}
     */
    SelectEditor.prototype.loadMultipleValues = /**
     * @param {?} currentValues
     * @return {?}
     */
    function (currentValues) {
        // convert to string because that is how the DOM will return these values
        if (Array.isArray(currentValues)) {
            // keep the default values in memory for references
            this.defaultValue = currentValues.map((/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i; }));
            // compare all the array values but as string type since multiple-select always return string
            /** @type {?} */
            var currentStringValues_1 = currentValues.map((/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i.toString(); }));
            this.$editorElm.find('option').each((/**
             * @param {?} i
             * @param {?} $e
             * @return {?}
             */
            function (i, $e) {
                $e.selected = (currentStringValues_1.indexOf($e.value) !== -1);
            }));
        }
    };
    /**
     * @param {?} currentValue
     * @return {?}
     */
    SelectEditor.prototype.loadSingleValue = /**
     * @param {?} currentValue
     * @return {?}
     */
    function (currentValue) {
        // keep the default value in memory for references
        this.defaultValue = currentValue;
        // make sure the prop exists first
        this.$editorElm.find('option').each((/**
         * @param {?} i
         * @param {?} $e
         * @return {?}
         */
        function (i, $e) {
            // check equality after converting defaultValue to string since the DOM value will always be of type string
            $e.selected = (currentValue.toString() === $e.value);
        }));
    };
    /**
     * @return {?}
     */
    SelectEditor.prototype.serializeValue = /**
     * @return {?}
     */
    function () {
        return (this.isMultipleSelect) ? this.currentValues : this.currentValue;
    };
    /**
     * @return {?}
     */
    SelectEditor.prototype.focus = /**
     * @return {?}
     */
    function () {
        if (this.$editorElm && this.$editorElm.multipleSelect) {
            this.$editorElm.multipleSelect('focus');
        }
    };
    /**
     * @return {?}
     */
    SelectEditor.prototype.isValueChanged = /**
     * @return {?}
     */
    function () {
        if (this.isMultipleSelect) {
            return !arraysEqual(this.$editorElm.val(), this.defaultValue);
        }
        return this.$editorElm.val() !== this.defaultValue;
    };
    /**
     * @param {?=} inputValue
     * @return {?}
     */
    SelectEditor.prototype.validate = /**
     * @param {?=} inputValue
     * @return {?}
     */
    function (inputValue) {
        /** @type {?} */
        var isRequired = this.columnEditor.required;
        /** @type {?} */
        var elmValue = (inputValue !== undefined) ? inputValue : this.$editorElm && this.$editorElm.val && this.$editorElm.val();
        /** @type {?} */
        var errorMsg = this.columnEditor.errorMessage;
        if (this.validator) {
            /** @type {?} */
            var value = (inputValue !== undefined) ? inputValue : (this.isMultipleSelect ? this.currentValues : this.currentValue);
            return this.validator(value, this.args);
        }
        // by default the editor is almost always valid (except when it's required but not provided)
        if (isRequired && (elmValue === '' || (Array.isArray(elmValue) && elmValue.length === 0))) {
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_REQUIRED_FIELD
            };
        }
        return {
            valid: true,
            msg: null
        };
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
    SelectEditor.prototype.filterCollection = 
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
        if (this.columnEditor && this.columnEditor.collectionFilterBy) {
            /** @type {?} */
            var filterBy = this.columnEditor.collectionFilterBy;
            /** @type {?} */
            var filterCollectionBy = this.columnEditor.collectionOptions && this.columnEditor.collectionOptions.filterResultAfterEachPass || null;
            outputCollection = this._collectionService.filterCollection(outputCollection, filterBy, filterCollectionBy);
        }
        return outputCollection;
    };
    /**
     * user might want to sort the collection in a certain way
     * @param inputCollection
     * @return outputCollection sorted collection
     */
    /**
     * user might want to sort the collection in a certain way
     * @protected
     * @param {?} inputCollection
     * @return {?} outputCollection sorted collection
     */
    SelectEditor.prototype.sortCollection = /**
     * user might want to sort the collection in a certain way
     * @protected
     * @param {?} inputCollection
     * @return {?} outputCollection sorted collection
     */
    function (inputCollection) {
        /** @type {?} */
        var outputCollection = inputCollection;
        // user might want to sort the collection
        if (this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.collectionSortBy) {
            /** @type {?} */
            var sortBy = this.columnDef.internalColumnEditor.collectionSortBy;
            outputCollection = this._collectionService.sortCollection(this.columnDef, outputCollection, sortBy, this.enableTranslateLabel);
        }
        return outputCollection;
    };
    /**
     * @protected
     * @param {?} collection
     * @return {?}
     */
    SelectEditor.prototype.renderDomElement = /**
     * @protected
     * @param {?} collection
     * @return {?}
     */
    function (collection) {
        if (!Array.isArray(collection) && this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
            collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
        }
        if (!Array.isArray(collection)) {
            throw new Error('The "collection" passed to the Select Editor is not a valid array');
        }
        // user can optionally add a blank entry at the beginning of the collection
        if (this.collectionOptions && this.collectionOptions.addBlankEntry) {
            collection.unshift(this.createBlankEntry());
        }
        /** @type {?} */
        var newCollection = collection || [];
        // user might want to filter and/or sort certain items of the collection
        newCollection = this.filterCollection(newCollection);
        newCollection = this.sortCollection(newCollection);
        // step 1, create HTML string template
        /** @type {?} */
        var editorTemplate = this.buildTemplateHtmlString(newCollection);
        // step 2, create the DOM Element of the editor
        // also subscribe to the onClose event
        this.createDomElement(editorTemplate);
    };
    /**
     * @protected
     * @param {?} collection
     * @return {?}
     */
    SelectEditor.prototype.buildTemplateHtmlString = /**
     * @protected
     * @param {?} collection
     * @return {?}
     */
    function (collection) {
        var _this = this;
        /** @type {?} */
        var options = '';
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        var separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
        /** @type {?} */
        var isRenderHtmlEnabled = this.columnDef.internalColumnEditor.enableRenderHtml || false;
        /** @type {?} */
        var sanitizedOptions = this.gridOptions && this.gridOptions.sanitizeHtmlOptions || {};
        // collection could be an Array of Strings OR Objects
        if (collection.every((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return typeof x === 'string'; }))) {
            collection.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                options += "<option value=\"" + option + "\" label=\"" + option + "\">" + option + "</option>";
            }));
        }
        else {
            // array of objects will require a label/value pair unless a customStructure is passed
            collection.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                if (!option || (option[_this.labelName] === undefined && option.labelKey === undefined)) {
                    throw new Error("[select-editor] A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example: { collection: [ { value: '1', label: 'One' } ])");
                }
                /** @type {?} */
                var labelKey = (/** @type {?} */ ((option.labelKey || option[_this.labelName])));
                /** @type {?} */
                var labelText = ((option.labelKey || _this.enableTranslateLabel) && labelKey) ? _this._translate.instant(labelKey || ' ') : labelKey;
                /** @type {?} */
                var prefixText = option[_this.labelPrefixName] || '';
                /** @type {?} */
                var suffixText = option[_this.labelSuffixName] || '';
                /** @type {?} */
                var optionLabel = option[_this.optionLabel] || '';
                optionLabel = optionLabel.toString().replace(/\"/g, '\''); // replace double quotes by single quotes to avoid interfering with regular html
                // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                prefixText = (_this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? _this._translate.instant(prefixText || ' ') : prefixText;
                suffixText = (_this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? _this._translate.instant(suffixText || ' ') : suffixText;
                optionLabel = (_this.enableTranslateLabel && optionLabel && typeof optionLabel === 'string') ? _this._translate.instant(optionLabel || ' ') : optionLabel;
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
                options += "<option value=\"" + option[_this.valueName] + "\" label=\"" + optionLabel + "\">" + optionText + "</option>";
            }));
        }
        return "<select id=\"" + this.elementName + "\" class=\"ms-filter search-filter editor-" + fieldId + "\" " + (this.isMultipleSelect ? 'multiple="multiple"' : '') + ">" + options + "</select>";
    };
    /** Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be */
    /**
     * Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be
     * @protected
     * @return {?}
     */
    SelectEditor.prototype.createBlankEntry = /**
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
    /** Build the template HTML string */
    /**
     * Build the template HTML string
     * @protected
     * @param {?} editorTemplate
     * @return {?}
     */
    SelectEditor.prototype.createDomElement = /**
     * Build the template HTML string
     * @protected
     * @param {?} editorTemplate
     * @return {?}
     */
    function (editorTemplate) {
        var _this = this;
        this.$editorElm = $(editorTemplate);
        if (this.$editorElm && typeof this.$editorElm.appendTo === 'function') {
            this.$editorElm.appendTo(this.args.container);
        }
        if (typeof this.$editorElm.multipleSelect !== 'function') {
            // fallback to bootstrap
            this.$editorElm.addClass('form-control');
        }
        else {
            /** @type {?} */
            var elementOptions = (this.columnDef.internalColumnEditor) ? this.columnDef.internalColumnEditor.elementOptions : {};
            this.editorElmOptions = tslib_1.__assign({}, this.defaultOptions, elementOptions);
            this.$editorElm = this.$editorElm.multipleSelect(this.editorElmOptions);
            setTimeout((/**
             * @return {?}
             */
            function () {
                if (_this.$editorElm && typeof _this.$editorElm.multipleSelect === 'function') {
                    _this.$editorElm.multipleSelect('open');
                }
            }));
        }
    };
    // refresh the jquery object because the selected checkboxes were already set
    // prior to this method being called
    // refresh the jquery object because the selected checkboxes were already set
    // prior to this method being called
    /**
     * @protected
     * @return {?}
     */
    SelectEditor.prototype.refresh = 
    // refresh the jquery object because the selected checkboxes were already set
    // prior to this method being called
    /**
     * @protected
     * @return {?}
     */
    function () {
        if (typeof this.$editorElm.multipleSelect === 'function') {
            this.$editorElm.multipleSelect('refresh');
        }
    };
    return SelectEditor;
}());
/**
 * Slickgrid editor class for multiple/single select lists
 */
export { SelectEditor };
if (false) {
    /**
     * The JQuery DOM element
     * @type {?}
     */
    SelectEditor.prototype.$editorElm;
    /**
     * Editor Multiple-Select options
     * @type {?}
     */
    SelectEditor.prototype.editorElmOptions;
    /**
     * DOM Element Name, useful for auto-detecting positioning (dropup / dropdown)
     * @type {?}
     */
    SelectEditor.prototype.elementName;
    /**
     * The multiple-select options for a multiple select list
     * @type {?}
     */
    SelectEditor.prototype.defaultOptions;
    /**
     * The default item values that are set
     * @type {?}
     */
    SelectEditor.prototype.defaultValue;
    /**
     * The property name for values in the collection
     * @type {?}
     */
    SelectEditor.prototype.valueName;
    /**
     * The property name for labels in the collection
     * @type {?}
     */
    SelectEditor.prototype.labelName;
    /**
     * The property name for a prefix that can be added to the labels in the collection
     * @type {?}
     */
    SelectEditor.prototype.labelPrefixName;
    /**
     * The property name for a suffix that can be added to the labels in the collection
     * @type {?}
     */
    SelectEditor.prototype.labelSuffixName;
    /**
     * A label that can be added to each option and can be used as an alternative to display selected options
     * @type {?}
     */
    SelectEditor.prototype.optionLabel;
    /**
     * Grid options
     * @type {?}
     */
    SelectEditor.prototype.gridOptions;
    /**
     * Do we translate the label?
     * @type {?}
     */
    SelectEditor.prototype.enableTranslateLabel;
    /**
     * Observable Subscriptions
     * @type {?}
     */
    SelectEditor.prototype._subscriptions;
    /**
     * @type {?}
     * @protected
     */
    SelectEditor.prototype._destroying;
    /**
     * Collection Service
     * @type {?}
     * @protected
     */
    SelectEditor.prototype._collectionService;
    /**
     * The translate library
     * @type {?}
     * @protected
     */
    SelectEditor.prototype._translate;
    /**
     * @type {?}
     * @protected
     */
    SelectEditor.prototype.args;
    /**
     * @type {?}
     * @protected
     */
    SelectEditor.prototype.isMultipleSelect;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0RWRpdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9lZGl0b3JzL3NlbGVjdEVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQVFMLFNBQVMsR0FJVixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLHFCQUFxQixFQUFFLFVBQVUsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRWpJLE9BQU8sS0FBSyxVQUFVLE1BQU0sV0FBVyxDQUFDOztJQUNsQyxTQUFTLEdBQUcsVUFBVTs7OztBQVE1Qjs7OztJQWtERSxzQkFBc0IsSUFBUyxFQUFZLGdCQUFnQjtRQUEzRCxpQkFrREM7UUFsRHFCLFNBQUksR0FBSixJQUFJLENBQUs7UUFBWSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQUE7Ozs7UUFaM0QsbUJBQWMsR0FBbUIsRUFBRSxDQUFDOzs7UUFJMUIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFTNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxtQkFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBYyxDQUFDOztZQUN2RCxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRTtRQUNyRSxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7OztZQUc3QixPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDbkQsSUFB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Ozs7SUFJcEMsbUNBQThCOzs7Ozs7SUFHOUIsMENBQWdEOzs7Ozs7SUFHaEQsa0NBQXVDOzs7OztJQUUzQiw0QkFBbUI7Ozs7O0lBQUUsd0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQge1xyXG4gIENvbGxlY3Rpb25DdXN0b21TdHJ1Y3R1cmUsXHJcbiAgQ29sbGVjdGlvbk9wdGlvbixcclxuICBDb2x1bW4sXHJcbiAgQ29sdW1uRWRpdG9yLFxyXG4gIEVkaXRvcixcclxuICBFZGl0b3JWYWxpZGF0b3IsXHJcbiAgRWRpdG9yVmFsaWRhdG9yT3V0cHV0LFxyXG4gIEZpZWxkVHlwZSxcclxuICBHcmlkT3B0aW9uLFxyXG4gIE11bHRpcGxlU2VsZWN0T3B0aW9uLFxyXG4gIFNlbGVjdE9wdGlvbixcclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IENvbGxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaW5kZXgnO1xyXG5pbXBvcnQgeyBhcnJheXNFcXVhbCwgZmluZE9yRGVmYXVsdCwgZ2V0RGVzY2VuZGFudFByb3BlcnR5LCBodG1sRW5jb2RlLCB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzIH0gZnJvbSAnLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCAqIGFzIERPTVB1cmlmeV8gZnJvbSAnZG9tcHVyaWZ5JztcclxuY29uc3QgRE9NUHVyaWZ5ID0gRE9NUHVyaWZ5XzsgLy8gcGF0Y2ggdG8gZml4IHJvbGx1cCB0byB3b3JrXHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbi8qKlxyXG4gKiBTbGlja2dyaWQgZWRpdG9yIGNsYXNzIGZvciBtdWx0aXBsZS9zaW5nbGUgc2VsZWN0IGxpc3RzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2VsZWN0RWRpdG9yIGltcGxlbWVudHMgRWRpdG9yIHtcclxuICAvKiogVGhlIEpRdWVyeSBET00gZWxlbWVudCAqL1xyXG4gICRlZGl0b3JFbG06IGFueTtcclxuXHJcbiAgLyoqIEVkaXRvciBNdWx0aXBsZS1TZWxlY3Qgb3B0aW9ucyAqL1xyXG4gIGVkaXRvckVsbU9wdGlvbnM6IE11bHRpcGxlU2VsZWN0T3B0aW9uO1xyXG5cclxuICAvKiogRE9NIEVsZW1lbnQgTmFtZSwgdXNlZnVsIGZvciBhdXRvLWRldGVjdGluZyBwb3NpdGlvbmluZyAoZHJvcHVwIC8gZHJvcGRvd24pICovXHJcbiAgZWxlbWVudE5hbWU6IHN0cmluZztcclxuXHJcbiAgLyoqIFRoZSBtdWx0aXBsZS1zZWxlY3Qgb3B0aW9ucyBmb3IgYSBtdWx0aXBsZSBzZWxlY3QgbGlzdCAqL1xyXG4gIGRlZmF1bHRPcHRpb25zOiBNdWx0aXBsZVNlbGVjdE9wdGlvbjtcclxuXHJcbiAgLyoqIFRoZSBkZWZhdWx0IGl0ZW0gdmFsdWVzIHRoYXQgYXJlIHNldCAqL1xyXG4gIGRlZmF1bHRWYWx1ZTogYW55W107XHJcblxyXG4gIC8qKiBUaGUgcHJvcGVydHkgbmFtZSBmb3IgdmFsdWVzIGluIHRoZSBjb2xsZWN0aW9uICovXHJcbiAgdmFsdWVOYW1lOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBUaGUgcHJvcGVydHkgbmFtZSBmb3IgbGFiZWxzIGluIHRoZSBjb2xsZWN0aW9uICovXHJcbiAgbGFiZWxOYW1lOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBUaGUgcHJvcGVydHkgbmFtZSBmb3IgYSBwcmVmaXggdGhhdCBjYW4gYmUgYWRkZWQgdG8gdGhlIGxhYmVscyBpbiB0aGUgY29sbGVjdGlvbiAqL1xyXG4gIGxhYmVsUHJlZml4TmFtZTogc3RyaW5nO1xyXG5cclxuICAvKiogVGhlIHByb3BlcnR5IG5hbWUgZm9yIGEgc3VmZml4IHRoYXQgY2FuIGJlIGFkZGVkIHRvIHRoZSBsYWJlbHMgaW4gdGhlIGNvbGxlY3Rpb24gKi9cclxuICBsYWJlbFN1ZmZpeE5hbWU6IHN0cmluZztcclxuXHJcbiAgLyoqIEEgbGFiZWwgdGhhdCBjYW4gYmUgYWRkZWQgdG8gZWFjaCBvcHRpb24gYW5kIGNhbiBiZSB1c2VkIGFzIGFuIGFsdGVybmF0aXZlIHRvIGRpc3BsYXkgc2VsZWN0ZWQgb3B0aW9ucyAqL1xyXG4gIG9wdGlvbkxhYmVsOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBHcmlkIG9wdGlvbnMgKi9cclxuICBncmlkT3B0aW9uczogR3JpZE9wdGlvbjtcclxuXHJcbiAgLyoqIERvIHdlIHRyYW5zbGF0ZSB0aGUgbGFiZWw/ICovXHJcbiAgZW5hYmxlVHJhbnNsYXRlTGFiZWw6IGJvb2xlYW47XHJcblxyXG4gIC8qKiBPYnNlcnZhYmxlIFN1YnNjcmlwdGlvbnMgKi9cclxuICBfc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuXHJcbiAgLy8gZmxhZyB0byBzaWduYWwgdGhhdCB0aGUgZWRpdG9yIGlzIGRlc3Ryb3lpbmcgaXRzZWxmLCBoZWxwcyBwcmV2ZW50XHJcbiAgLy8gY29tbWl0IGNoYW5nZXMgZnJvbSBiZWluZyBjYWxsZWQgdHdpY2UgYW5kIGVycm9yaW5nXHJcbiAgcHJvdGVjdGVkIF9kZXN0cm95aW5nID0gZmFsc2U7XHJcblxyXG4gIC8qKiBDb2xsZWN0aW9uIFNlcnZpY2UgKi9cclxuICBwcm90ZWN0ZWQgX2NvbGxlY3Rpb25TZXJ2aWNlOiBDb2xsZWN0aW9uU2VydmljZTtcclxuXHJcbiAgLyoqIFRoZSB0cmFuc2xhdGUgbGlicmFyeSAqL1xyXG4gIHByb3RlY3RlZCBfdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYXJnczogYW55LCBwcm90ZWN0ZWQgaXNNdWx0aXBsZVNlbGVjdCkge1xyXG4gICAgdGhpcy5ncmlkT3B0aW9ucyA9IHRoaXMuYXJncy5ncmlkLmdldE9wdGlvbnMoKSBhcyBHcmlkT3B0aW9uO1xyXG4gICAgY29uc3QgZ3JpZE9wdGlvbnMgPSB0aGlzLmdyaWRPcHRpb25zIHx8IHRoaXMuYXJncy5jb2x1bW4ucGFyYW1zIHx8IHt9O1xyXG4gICAgdGhpcy5fdHJhbnNsYXRlID0gZ3JpZE9wdGlvbnMuaTE4bjtcclxuXHJcbiAgICAvLyBwcm92aWRlIHRoZSBuYW1lIGF0dHJpYnV0ZSB0byB0aGUgRE9NIGVsZW1lbnQgd2hpY2ggd2lsbCBiZSBuZWVkZWQgdG8gYXV0by1hZGp1c3QgZHJvcCBwb3NpdGlvbiAoZHJvcHVwIC8gZHJvcGRvd24pXHJcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XHJcbiAgICB0aGlzLmVsZW1lbnROYW1lID0gYGVkaXRvci0ke2ZpZWxkSWR9YDtcclxuXHJcbiAgICBjb25zdCBsaWJPcHRpb25zOiBNdWx0aXBsZVNlbGVjdE9wdGlvbiA9IHtcclxuICAgICAgYXV0b0FkanVzdERyb3BIZWlnaHQ6IHRydWUsXHJcbiAgICAgIGF1dG9BZGp1c3REcm9wUG9zaXRpb246IHRydWUsXHJcbiAgICAgIGF1dG9BZGp1c3REcm9wV2lkdGhCeVRleHRTaXplOiB0cnVlLFxyXG4gICAgICBjb250YWluZXI6ICdib2R5JyxcclxuICAgICAgZmlsdGVyOiBmYWxzZSxcclxuICAgICAgbWF4SGVpZ2h0OiAyNzUsXHJcbiAgICAgIG5hbWU6IHRoaXMuZWxlbWVudE5hbWUsXHJcbiAgICAgIHNpbmdsZTogdHJ1ZSxcclxuICAgICAgdGV4dFRlbXBsYXRlOiAoJGVsbSkgPT4ge1xyXG4gICAgICAgIC8vIHJlbmRlciBIVE1MIGNvZGUgb3Igbm90LCBieSBkZWZhdWx0IGl0IGlzIHNhbml0aXplZCBhbmQgd29uJ3QgYmUgcmVuZGVyZWRcclxuICAgICAgICBjb25zdCBpc1JlbmRlckh0bWxFbmFibGVkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IuZW5hYmxlUmVuZGVySHRtbCB8fCBmYWxzZTtcclxuICAgICAgICByZXR1cm4gaXNSZW5kZXJIdG1sRW5hYmxlZCA/ICRlbG0udGV4dCgpIDogJGVsbS5odG1sKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG9uQmx1cjogKCkgPT4gdGhpcy5kZXN0cm95KCksXHJcbiAgICAgIG9uQ2xvc2U6ICgpID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuX2Rlc3Ryb3lpbmcgJiYgdGhpcy5oYXNBdXRvQ29tbWl0RWRpdCkge1xyXG4gICAgICAgICAgLy8gZG8gbm90IHVzZSBhcmdzLmNvbW1pdENoYW5nZXMoKSBhcyB0aGlzIHNldHMgdGhlIGZvY3VzIHRvIHRoZSBuZXh0XHJcbiAgICAgICAgICAvLyByb3cuIEFsc28gdGhlIHNlbGVjdCBsaXN0IHdpbGwgc3RheSBzaG93biB3aGVuIGNsaWNraW5nIG9mZiB0aGUgZ3JpZFxyXG4gICAgICAgICAgYXJncy5ncmlkLmdldEVkaXRvckxvY2soKS5jb21taXRDdXJyZW50RWRpdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoaXNNdWx0aXBsZVNlbGVjdCkge1xyXG4gICAgICBsaWJPcHRpb25zLnNpbmdsZSA9IGZhbHNlO1xyXG4gICAgICBsaWJPcHRpb25zLmFkZFRpdGxlID0gdHJ1ZTtcclxuICAgICAgbGliT3B0aW9ucy5va0J1dHRvbiA9IHRydWU7XHJcbiAgICAgIGxpYk9wdGlvbnMuc2VsZWN0QWxsRGVsaW1pdGVyID0gWycnLCAnJ107XHJcblxyXG4gICAgICBpZiAodGhpcy5fdHJhbnNsYXRlKSB7XHJcbiAgICAgICAgbGliT3B0aW9ucy5jb3VudFNlbGVjdGVkID0gdGhpcy5fdHJhbnNsYXRlLmluc3RhbnQoJ1hfT0ZfWV9TRUxFQ1RFRCcpO1xyXG4gICAgICAgIGxpYk9wdGlvbnMuYWxsU2VsZWN0ZWQgPSB0aGlzLl90cmFuc2xhdGUuaW5zdGFudCgnQUxMX1NFTEVDVEVEJyk7XHJcbiAgICAgICAgbGliT3B0aW9ucy5zZWxlY3RBbGxUZXh0ID0gdGhpcy5fdHJhbnNsYXRlLmluc3RhbnQoJ1NFTEVDVF9BTEwnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGFzc2lnbiB0aGUgbXVsdGlwbGUgc2VsZWN0IGxpYiBvcHRpb25zXHJcbiAgICB0aGlzLmRlZmF1bHRPcHRpb25zID0gbGliT3B0aW9ucztcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIENvbGxlY3Rpb24gKi9cclxuICBnZXQgY29sbGVjdGlvbigpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IuY29sbGVjdGlvbiB8fCBbXTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDb2xsZWN0aW9uIE9wdGlvbnMgKi9cclxuICBnZXQgY29sbGVjdGlvbk9wdGlvbnMoKTogQ29sbGVjdGlvbk9wdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IuY29sbGVjdGlvbk9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IENvbHVtbiBEZWZpbml0aW9uIG9iamVjdCAqL1xyXG4gIGdldCBjb2x1bW5EZWYoKTogQ29sdW1uIHtcclxuICAgIHJldHVybiB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbHVtbiB8fCB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgQ29sdW1uIEVkaXRvciBvYmplY3QgKi9cclxuICBnZXQgY29sdW1uRWRpdG9yKCk6IENvbHVtbkVkaXRvciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgfHwge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgQ3VzdG9tIFN0cnVjdHVyZSBpZiBleGlzdCAqL1xyXG4gIHByb3RlY3RlZCBnZXQgY3VzdG9tU3RydWN0dXJlKCk6IENvbGxlY3Rpb25DdXN0b21TdHJ1Y3R1cmUge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yLmN1c3RvbVN0cnVjdHVyZTtcclxuICB9XHJcblxyXG4gIGdldCBoYXNBdXRvQ29tbWl0RWRpdCgpIHtcclxuICAgIHJldHVybiB0aGlzLmFyZ3MuZ3JpZC5nZXRPcHRpb25zKCkuYXV0b0NvbW1pdEVkaXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCBzZWxlY3RlZCB2YWx1ZXMgKG11bHRpcGxlIHNlbGVjdCkgZnJvbSB0aGUgY29sbGVjdGlvblxyXG4gICAqL1xyXG4gIGdldCBjdXJyZW50VmFsdWVzKCkge1xyXG4gICAgLy8gY29sbGVjdGlvbiBvZiBzdHJpbmdzLCBqdXN0IHJldHVybiB0aGUgZmlsdGVyZWQgc3RyaW5nIHRoYXQgYXJlIGVxdWFsc1xyXG4gICAgaWYgKHRoaXMuY29sbGVjdGlvbi5ldmVyeSh4ID0+IHR5cGVvZiB4ID09PSAnc3RyaW5nJykpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbi5maWx0ZXIoYyA9PiB0aGlzLiRlZGl0b3JFbG0udmFsKCkuaW5kZXhPZihjLnRvU3RyaW5nKCkpICE9PSAtMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29sbGVjdGlvbiBvZiBsYWJlbC92YWx1ZSBwYWlyXHJcbiAgICBjb25zdCBzZXBhcmF0b3JCZXR3ZWVuTGFiZWxzID0gdGhpcy5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLnNlcGFyYXRvckJldHdlZW5UZXh0TGFiZWxzIHx8ICcnO1xyXG4gICAgY29uc3QgaXNJbmNsdWRpbmdQcmVmaXhTdWZmaXggPSB0aGlzLmNvbGxlY3Rpb25PcHRpb25zICYmIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuaW5jbHVkZVByZWZpeFN1ZmZpeFRvU2VsZWN0ZWRWYWx1ZXMgfHwgZmFsc2U7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvblxyXG4gICAgICAuZmlsdGVyKGMgPT4gdGhpcy4kZWRpdG9yRWxtLnZhbCgpLmluZGV4T2YoY1t0aGlzLnZhbHVlTmFtZV0udG9TdHJpbmcoKSkgIT09IC0xKVxyXG4gICAgICAubWFwKGMgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxhYmVsVGV4dCA9IGNbdGhpcy52YWx1ZU5hbWVdO1xyXG4gICAgICAgIGxldCBwcmVmaXhUZXh0ID0gY1t0aGlzLmxhYmVsUHJlZml4TmFtZV0gfHwgJyc7XHJcbiAgICAgICAgbGV0IHN1ZmZpeFRleHQgPSBjW3RoaXMubGFiZWxTdWZmaXhOYW1lXSB8fCAnJztcclxuXHJcbiAgICAgICAgLy8gd2hlbiBpdCdzIGEgY29tcGxleCBvYmplY3QsIHRoZW4gcHVsbCB0aGUgb2JqZWN0IG5hbWUgb25seSwgZS5nLjogXCJ1c2VyLmZpcnN0TmFtZVwiID0+IFwidXNlclwiXHJcbiAgICAgICAgY29uc3QgZmllbGROYW1lID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmllbGQ7XHJcbiAgICAgICAgY29uc3QgZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgPSBmaWVsZE5hbWUuaW5kZXhPZignLicpID8gZmllbGROYW1lLnN1YnN0cmluZygwLCBmaWVsZE5hbWUuaW5kZXhPZignLicpKSA6ICcnO1xyXG4gICAgICAgIGlmIChmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCAmJiB0eXBlb2YgYyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgIHJldHVybiBjO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYWxzbyB0cmFuc2xhdGUgcHJlZml4L3N1ZmZpeCBpZiBlbmFibGVUcmFuc2xhdGVMYWJlbCBpcyB0cnVlIGFuZCB0ZXh0IGlzIGEgc3RyaW5nXHJcbiAgICAgICAgcHJlZml4VGV4dCA9ICh0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsICYmIHByZWZpeFRleHQgJiYgdHlwZW9mIHByZWZpeFRleHQgPT09ICdzdHJpbmcnKSA/IHRoaXMuX3RyYW5zbGF0ZS5pbnN0YW50KHByZWZpeFRleHQgfHwgJyAnKSA6IHByZWZpeFRleHQ7XHJcbiAgICAgICAgc3VmZml4VGV4dCA9ICh0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsICYmIHN1ZmZpeFRleHQgJiYgdHlwZW9mIHN1ZmZpeFRleHQgPT09ICdzdHJpbmcnKSA/IHRoaXMuX3RyYW5zbGF0ZS5pbnN0YW50KHN1ZmZpeFRleHQgfHwgJyAnKSA6IHN1ZmZpeFRleHQ7XHJcblxyXG4gICAgICAgIGlmIChpc0luY2x1ZGluZ1ByZWZpeFN1ZmZpeCkge1xyXG4gICAgICAgICAgY29uc3QgdG1wT3B0aW9uQXJyYXkgPSBbcHJlZml4VGV4dCwgbGFiZWxUZXh0LCBzdWZmaXhUZXh0XS5maWx0ZXIoKHRleHQpID0+IHRleHQpOyAvLyBhZGQgdG8gYSB0ZW1wIGFycmF5IGZvciBqb2luaW5nIHB1cnBvc2UgYW5kIGZpbHRlciBvdXQgZW1wdHkgdGV4dFxyXG4gICAgICAgICAgcmV0dXJuIHRtcE9wdGlvbkFycmF5LmpvaW4oc2VwYXJhdG9yQmV0d2VlbkxhYmVscyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsYWJlbFRleHQ7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IHNlbGVjdGVkIHZhbHVlcyAoc2luZ2xlIHNlbGVjdCkgZnJvbSB0aGUgY29sbGVjdGlvblxyXG4gICAqL1xyXG4gIGdldCBjdXJyZW50VmFsdWUoKSB7XHJcbiAgICAvLyBjb2xsZWN0aW9uIG9mIHN0cmluZ3MsIGp1c3QgcmV0dXJuIHRoZSBmaWx0ZXJlZCBzdHJpbmcgdGhhdCBhcmUgZXF1YWxzXHJcbiAgICBpZiAodGhpcy5jb2xsZWN0aW9uLmV2ZXJ5KHggPT4gdHlwZW9mIHggPT09ICdzdHJpbmcnKSkge1xyXG4gICAgICByZXR1cm4gZmluZE9yRGVmYXVsdCh0aGlzLmNvbGxlY3Rpb24sIChjOiBhbnkpID0+IGMudG9TdHJpbmcoKSA9PT0gdGhpcy4kZWRpdG9yRWxtLnZhbCgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb2xsZWN0aW9uIG9mIGxhYmVsL3ZhbHVlIHBhaXJcclxuICAgIGNvbnN0IHNlcGFyYXRvckJldHdlZW5MYWJlbHMgPSB0aGlzLmNvbGxlY3Rpb25PcHRpb25zICYmIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuc2VwYXJhdG9yQmV0d2VlblRleHRMYWJlbHMgfHwgJyc7XHJcbiAgICBjb25zdCBpc0luY2x1ZGluZ1ByZWZpeFN1ZmZpeCA9IHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5pbmNsdWRlUHJlZml4U3VmZml4VG9TZWxlY3RlZFZhbHVlcyB8fCBmYWxzZTtcclxuICAgIGNvbnN0IGl0ZW1Gb3VuZCA9IGZpbmRPckRlZmF1bHQodGhpcy5jb2xsZWN0aW9uLCAoYzogYW55KSA9PiBjW3RoaXMudmFsdWVOYW1lXS50b1N0cmluZygpID09PSB0aGlzLiRlZGl0b3JFbG0udmFsKCkpO1xyXG5cclxuICAgIC8vIHdoZW4gaXQncyBhIGNvbXBsZXggb2JqZWN0LCB0aGVuIHB1bGwgdGhlIG9iamVjdCBuYW1lIG9ubHksIGUuZy46IFwidXNlci5maXJzdE5hbWVcIiA9PiBcInVzZXJcIlxyXG4gICAgY29uc3QgZmllbGROYW1lID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmllbGQ7XHJcbiAgICBjb25zdCBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCA9IGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGZpZWxkTmFtZS5pbmRleE9mKCcuJykpIDogJyc7XHJcbiAgICBpZiAoZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgJiYgdHlwZW9mIGl0ZW1Gb3VuZCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgcmV0dXJuIGl0ZW1Gb3VuZDtcclxuICAgIH0gZWxzZSBpZiAoaXRlbUZvdW5kKSB7XHJcbiAgICAgIGNvbnN0IGxhYmVsVGV4dCA9IGl0ZW1Gb3VuZFt0aGlzLnZhbHVlTmFtZV07XHJcblxyXG4gICAgICBpZiAoaXNJbmNsdWRpbmdQcmVmaXhTdWZmaXgpIHtcclxuICAgICAgICBsZXQgcHJlZml4VGV4dCA9IGl0ZW1Gb3VuZFt0aGlzLmxhYmVsUHJlZml4TmFtZV0gfHwgJyc7XHJcbiAgICAgICAgbGV0IHN1ZmZpeFRleHQgPSBpdGVtRm91bmRbdGhpcy5sYWJlbFN1ZmZpeE5hbWVdIHx8ICcnO1xyXG5cclxuICAgICAgICAvLyBhbHNvIHRyYW5zbGF0ZSBwcmVmaXgvc3VmZml4IGlmIGVuYWJsZVRyYW5zbGF0ZUxhYmVsIGlzIHRydWUgYW5kIHRleHQgaXMgYSBzdHJpbmdcclxuICAgICAgICBwcmVmaXhUZXh0ID0gKHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgJiYgcHJlZml4VGV4dCAmJiB0eXBlb2YgcHJlZml4VGV4dCA9PT0gJ3N0cmluZycpID8gdGhpcy5fdHJhbnNsYXRlLmluc3RhbnQocHJlZml4VGV4dCB8fCAnICcpIDogcHJlZml4VGV4dDtcclxuICAgICAgICBzdWZmaXhUZXh0ID0gKHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgJiYgc3VmZml4VGV4dCAmJiB0eXBlb2Ygc3VmZml4VGV4dCA9PT0gJ3N0cmluZycpID8gdGhpcy5fdHJhbnNsYXRlLmluc3RhbnQoc3VmZml4VGV4dCB8fCAnICcpIDogc3VmZml4VGV4dDtcclxuXHJcbiAgICAgICAgLy8gYWRkIHRvIGEgdGVtcCBhcnJheSBmb3Igam9pbmluZyBwdXJwb3NlIGFuZCBmaWx0ZXIgb3V0IGVtcHR5IHRleHRcclxuICAgICAgICBjb25zdCB0bXBPcHRpb25BcnJheSA9IFtwcmVmaXhUZXh0LCBsYWJlbFRleHQsIHN1ZmZpeFRleHRdLmZpbHRlcigodGV4dCkgPT4gdGV4dCk7XHJcbiAgICAgICAgcmV0dXJuIHRtcE9wdGlvbkFycmF5LmpvaW4oc2VwYXJhdG9yQmV0d2VlbkxhYmVscyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBsYWJlbFRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKiBHZXQgdGhlIFZhbGlkYXRvciBmdW5jdGlvbiwgY2FuIGJlIHBhc3NlZCBpbiBFZGl0b3IgcHJvcGVydHkgb3IgQ29sdW1uIERlZmluaXRpb24gKi9cclxuICBnZXQgdmFsaWRhdG9yKCk6IEVkaXRvclZhbGlkYXRvciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5FZGl0b3IudmFsaWRhdG9yIHx8IHRoaXMuY29sdW1uRGVmLnZhbGlkYXRvcjtcclxuICB9XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICBpZiAoIXRoaXMuYXJncykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tBbmd1bGFyLVNsaWNrR3JpZF0gQW4gZWRpdG9yIG11c3QgYWx3YXlzIGhhdmUgYW4gXCJpbml0KClcIiB3aXRoIHZhbGlkIGFyZ3VtZW50cy4nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuY29sdW1uRGVmIHx8ICF0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciB8fCAoIXRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yLmNvbGxlY3Rpb24gJiYgIXRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yLmNvbGxlY3Rpb25Bc3luYykpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbQW5ndWxhci1TbGlja0dyaWRdIFlvdSBuZWVkIHRvIHBhc3MgYSBcImNvbGxlY3Rpb25cIiAob3IgXCJjb2xsZWN0aW9uQXN5bmNcIikgaW5zaWRlIENvbHVtbiBEZWZpbml0aW9uIEVkaXRvciBmb3IgdGhlIE11bHRpcGxlU2VsZWN0L1NpbmdsZVNlbGVjdCBFZGl0b3IgdG8gd29yayBjb3JyZWN0bHkuXHJcbiAgICAgIEFsc28gZWFjaCBvcHRpb24gc2hvdWxkIGluY2x1ZGUgYSB2YWx1ZS9sYWJlbCBwYWlyIChvciB2YWx1ZS9sYWJlbEtleSB3aGVuIHVzaW5nIExvY2FsZSkuXHJcbiAgICAgIEZvciBleGFtcGxlOiB7IGVkaXRvcjogeyBjb2xsZWN0aW9uOiBbeyB2YWx1ZTogdHJ1ZSwgbGFiZWw6ICdUcnVlJyB9LHsgdmFsdWU6IGZhbHNlLCBsYWJlbDogJ0ZhbHNlJ31dIH0gfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2NvbGxlY3Rpb25TZXJ2aWNlID0gbmV3IENvbGxlY3Rpb25TZXJ2aWNlKHRoaXMuX3RyYW5zbGF0ZSk7XHJcbiAgICB0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsID0gKHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yLmVuYWJsZVRyYW5zbGF0ZUxhYmVsKSA/IHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yLmVuYWJsZVRyYW5zbGF0ZUxhYmVsIDogZmFsc2U7XHJcbiAgICB0aGlzLmxhYmVsTmFtZSA9IHRoaXMuY3VzdG9tU3RydWN0dXJlICYmIHRoaXMuY3VzdG9tU3RydWN0dXJlLmxhYmVsIHx8ICdsYWJlbCc7XHJcbiAgICB0aGlzLmxhYmVsUHJlZml4TmFtZSA9IHRoaXMuY3VzdG9tU3RydWN0dXJlICYmIHRoaXMuY3VzdG9tU3RydWN0dXJlLmxhYmVsUHJlZml4IHx8ICdsYWJlbFByZWZpeCc7XHJcbiAgICB0aGlzLmxhYmVsU3VmZml4TmFtZSA9IHRoaXMuY3VzdG9tU3RydWN0dXJlICYmIHRoaXMuY3VzdG9tU3RydWN0dXJlLmxhYmVsU3VmZml4IHx8ICdsYWJlbFN1ZmZpeCc7XHJcbiAgICB0aGlzLm9wdGlvbkxhYmVsID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUub3B0aW9uTGFiZWwgfHwgJ3ZhbHVlJztcclxuICAgIHRoaXMudmFsdWVOYW1lID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUudmFsdWUgfHwgJ3ZhbHVlJztcclxuXHJcbiAgICBpZiAodGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCAmJiAoIXRoaXMuX3RyYW5zbGF0ZSB8fCB0eXBlb2YgdGhpcy5fdHJhbnNsYXRlLmluc3RhbnQgIT09ICdmdW5jdGlvbicpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgW3NlbGVjdC1lZGl0b3JdIFRoZSBuZ3gtdHJhbnNsYXRlIFRyYW5zbGF0ZVNlcnZpY2UgaXMgcmVxdWlyZWQgZm9yIHRoZSBTZWxlY3QgRWRpdG9yIHRvIHdvcmsgY29ycmVjdGx5YCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWx3YXlzIHJlbmRlciB0aGUgU2VsZWN0IChkcm9wZG93bikgRE9NIGVsZW1lbnQsIGV2ZW4gaWYgdXNlciBwYXNzZWQgYSBcImNvbGxlY3Rpb25Bc3luY1wiLFxyXG4gICAgLy8gaWYgdGhhdCBpcyB0aGUgY2FzZSwgdGhlIFNlbGVjdCB3aWxsIHNpbXBseSBiZSB3aXRob3V0IGFueSBvcHRpb25zIGJ1dCB3ZSBzdGlsbCBoYXZlIHRvIHJlbmRlciBpdCAoZWxzZSBTbGlja0dyaWQgd291bGQgdGhyb3cgYW4gZXJyb3IpXHJcbiAgICB0aGlzLnJlbmRlckRvbUVsZW1lbnQodGhpcy5jb2xsZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIGFwcGx5VmFsdWUoaXRlbTogYW55LCBzdGF0ZTogYW55KTogdm9pZCB7XHJcbiAgICBjb25zdCBmaWVsZE5hbWUgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWVsZDtcclxuICAgIGNvbnN0IGZpZWxkVHlwZSA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLnR5cGU7XHJcbiAgICBsZXQgbmV3VmFsdWUgPSBzdGF0ZTtcclxuXHJcbiAgICAvLyB3aGVuIHRoZSBwcm92aWRlZCB1c2VyIGRlZmluZWQgdGhlIGNvbHVtbiBmaWVsZCB0eXBlIGFzIGEgcG9zc2libGUgbnVtYmVyIHRoZW4gdHJ5IHBhcnNpbmcgdGhlIHN0YXRlIHZhbHVlIGFzIHRoYXRcclxuICAgIGlmIChmaWVsZFR5cGUgPT09IEZpZWxkVHlwZS5udW1iZXIgfHwgZmllbGRUeXBlID09PSBGaWVsZFR5cGUuaW50ZWdlciB8fCBmaWVsZFR5cGUgPT09IEZpZWxkVHlwZS5ib29sZWFuKSB7XHJcbiAgICAgIG5ld1ZhbHVlID0gcGFyc2VGbG9hdChzdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2hlbiBzZXQgYXMgYSBtdWx0aXBsZSBzZWxlY3Rpb24sIHdlIGNhbiBhc3N1bWUgdGhhdCB0aGUgM3JkIHBhcnR5IGxpYiBtdWx0aXBsZS1zZWxlY3Qgd2lsbCByZXR1cm4gYSBDU1Ygc3RyaW5nXHJcbiAgICAvLyB3ZSBuZWVkIHRvIHJlLXNwbGl0IHRoYXQgaW50byBhbiBhcnJheSB0byBiZSB0aGUgc2FtZSBhcyB0aGUgb3JpZ2luYWwgY29sdW1uXHJcbiAgICBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0ICYmIHR5cGVvZiBzdGF0ZSA9PT0gJ3N0cmluZycgJiYgc3RhdGUuaW5kZXhPZignLCcpID49IDApIHtcclxuICAgICAgbmV3VmFsdWUgPSBzdGF0ZS5zcGxpdCgnLCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHdoZW4gaXQncyBhIGNvbXBsZXggb2JqZWN0LCB0aGVuIHB1bGwgdGhlIG9iamVjdCBuYW1lIG9ubHksIGUuZy46IFwidXNlci5maXJzdE5hbWVcIiA9PiBcInVzZXJcIlxyXG4gICAgY29uc3QgZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgPSBmaWVsZE5hbWUuaW5kZXhPZignLicpID8gZmllbGROYW1lLnN1YnN0cmluZygwLCBmaWVsZE5hbWUuaW5kZXhPZignLicpKSA6ICcnO1xyXG4gICAgY29uc3QgdmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUobmV3VmFsdWUpO1xyXG4gICAgaXRlbVtmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCB8fCBmaWVsZE5hbWVdID0gKHZhbGlkYXRpb24gJiYgdmFsaWRhdGlvbi52YWxpZCkgPyBuZXdWYWx1ZSA6ICcnO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuX2Rlc3Ryb3lpbmcgPSB0cnVlO1xyXG4gICAgaWYgKHRoaXMuJGVkaXRvckVsbSAmJiB0eXBlb2YgdGhpcy4kZWRpdG9yRWxtLm11bHRpcGxlU2VsZWN0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuJGVkaXRvckVsbS5tdWx0aXBsZVNlbGVjdCgnZGVzdHJveScpO1xyXG4gICAgICB0aGlzLiRlZGl0b3JFbG0ucmVtb3ZlKCk7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnRDbGFzc05hbWUgPSB0aGlzLmVsZW1lbnROYW1lLnRvU3RyaW5nKCkucmVwbGFjZSgnLicsICdcXFxcLicpOyAvLyBtYWtlIHN1cmUgdG8gZXNjYXBlIGFueSBkb3QgXCIuXCIgZnJvbSBDU1MgY2xhc3MgdG8gYXZvaWQgY29uc29sZSBlcnJvclxyXG4gICAgICAkKGBbbmFtZT0ke2VsZW1lbnRDbGFzc05hbWV9XS5tcy1kcm9wYCkucmVtb3ZlKCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuJGVkaXRvckVsbSAmJiB0eXBlb2YgdGhpcy4kZWRpdG9yRWxtLnJlbW92ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLiRlZGl0b3JFbG0ucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zID0gdW5zdWJzY3JpYmVBbGxPYnNlcnZhYmxlcyh0aGlzLl9zdWJzY3JpcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGxvYWRWYWx1ZShpdGVtOiBhbnkpOiB2b2lkIHtcclxuICAgIGNvbnN0IGZpZWxkTmFtZSA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpZWxkO1xyXG5cclxuICAgIC8vIHdoZW4gaXQncyBhIGNvbXBsZXggb2JqZWN0LCB0aGVuIHB1bGwgdGhlIG9iamVjdCBuYW1lIG9ubHksIGUuZy46IFwidXNlci5maXJzdE5hbWVcIiA9PiBcInVzZXJcIlxyXG4gICAgY29uc3QgZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgPSBmaWVsZE5hbWUuaW5kZXhPZignLicpID8gZmllbGROYW1lLnN1YnN0cmluZygwLCBmaWVsZE5hbWUuaW5kZXhPZignLicpKSA6ICcnO1xyXG5cclxuICAgIGlmIChpdGVtICYmIHRoaXMuY29sdW1uRGVmICYmIChpdGVtLmhhc093blByb3BlcnR5KGZpZWxkTmFtZSkgfHwgaXRlbS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCkpKSB7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGl0ZW1bZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgfHwgZmllbGROYW1lXTtcclxuICAgICAgY29uc3QgbG9hZFZhbHVlID0gZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgJiYgY3VycmVudFZhbHVlLmhhc093blByb3BlcnR5KHRoaXMudmFsdWVOYW1lKSA/IGN1cnJlbnRWYWx1ZVt0aGlzLnZhbHVlTmFtZV0gOiBjdXJyZW50VmFsdWU7XHJcbiAgICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3QgJiYgQXJyYXkuaXNBcnJheShsb2FkVmFsdWUpKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkTXVsdGlwbGVWYWx1ZXMobG9hZFZhbHVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmxvYWRTaW5nbGVWYWx1ZShsb2FkVmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9hZE11bHRpcGxlVmFsdWVzKGN1cnJlbnRWYWx1ZXM6IGFueVtdKSB7XHJcbiAgICAvLyBjb252ZXJ0IHRvIHN0cmluZyBiZWNhdXNlIHRoYXQgaXMgaG93IHRoZSBET00gd2lsbCByZXR1cm4gdGhlc2UgdmFsdWVzXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjdXJyZW50VmFsdWVzKSkge1xyXG4gICAgICAvLyBrZWVwIHRoZSBkZWZhdWx0IHZhbHVlcyBpbiBtZW1vcnkgZm9yIHJlZmVyZW5jZXNcclxuICAgICAgdGhpcy5kZWZhdWx0VmFsdWUgPSBjdXJyZW50VmFsdWVzLm1hcCgoaTogYW55KSA9PiBpKTtcclxuXHJcbiAgICAgIC8vIGNvbXBhcmUgYWxsIHRoZSBhcnJheSB2YWx1ZXMgYnV0IGFzIHN0cmluZyB0eXBlIHNpbmNlIG11bHRpcGxlLXNlbGVjdCBhbHdheXMgcmV0dXJuIHN0cmluZ1xyXG4gICAgICBjb25zdCBjdXJyZW50U3RyaW5nVmFsdWVzID0gY3VycmVudFZhbHVlcy5tYXAoKGk6IGFueSkgPT4gaS50b1N0cmluZygpKTtcclxuICAgICAgdGhpcy4kZWRpdG9yRWxtLmZpbmQoJ29wdGlvbicpLmVhY2goKGk6IG51bWJlciwgJGU6IGFueSkgPT4ge1xyXG4gICAgICAgICRlLnNlbGVjdGVkID0gKGN1cnJlbnRTdHJpbmdWYWx1ZXMuaW5kZXhPZigkZS52YWx1ZSkgIT09IC0xKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb2FkU2luZ2xlVmFsdWUoY3VycmVudFZhbHVlOiBhbnkpIHtcclxuICAgIC8vIGtlZXAgdGhlIGRlZmF1bHQgdmFsdWUgaW4gbWVtb3J5IGZvciByZWZlcmVuY2VzXHJcbiAgICB0aGlzLmRlZmF1bHRWYWx1ZSA9IGN1cnJlbnRWYWx1ZTtcclxuXHJcbiAgICAvLyBtYWtlIHN1cmUgdGhlIHByb3AgZXhpc3RzIGZpcnN0XHJcbiAgICB0aGlzLiRlZGl0b3JFbG0uZmluZCgnb3B0aW9uJykuZWFjaCgoaTogbnVtYmVyLCAkZTogYW55KSA9PiB7XHJcbiAgICAgIC8vIGNoZWNrIGVxdWFsaXR5IGFmdGVyIGNvbnZlcnRpbmcgZGVmYXVsdFZhbHVlIHRvIHN0cmluZyBzaW5jZSB0aGUgRE9NIHZhbHVlIHdpbGwgYWx3YXlzIGJlIG9mIHR5cGUgc3RyaW5nXHJcbiAgICAgICRlLnNlbGVjdGVkID0gKGN1cnJlbnRWYWx1ZS50b1N0cmluZygpID09PSAkZS52YWx1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNlcmlhbGl6ZVZhbHVlKCk6IGFueSB7XHJcbiAgICByZXR1cm4gKHRoaXMuaXNNdWx0aXBsZVNlbGVjdCkgPyB0aGlzLmN1cnJlbnRWYWx1ZXMgOiB0aGlzLmN1cnJlbnRWYWx1ZTtcclxuICB9XHJcblxyXG4gIGZvY3VzKCkge1xyXG4gICAgaWYgKHRoaXMuJGVkaXRvckVsbSAmJiB0aGlzLiRlZGl0b3JFbG0ubXVsdGlwbGVTZWxlY3QpIHtcclxuICAgICAgdGhpcy4kZWRpdG9yRWxtLm11bHRpcGxlU2VsZWN0KCdmb2N1cycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNWYWx1ZUNoYW5nZWQoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0KSB7XHJcbiAgICAgIHJldHVybiAhYXJyYXlzRXF1YWwodGhpcy4kZWRpdG9yRWxtLnZhbCgpLCB0aGlzLmRlZmF1bHRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy4kZWRpdG9yRWxtLnZhbCgpICE9PSB0aGlzLmRlZmF1bHRWYWx1ZTtcclxuICB9XHJcblxyXG4gIHZhbGlkYXRlKGlucHV0VmFsdWU/OiBhbnkpOiBFZGl0b3JWYWxpZGF0b3JPdXRwdXQge1xyXG4gICAgY29uc3QgaXNSZXF1aXJlZCA9IHRoaXMuY29sdW1uRWRpdG9yLnJlcXVpcmVkO1xyXG4gICAgY29uc3QgZWxtVmFsdWUgPSAoaW5wdXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSA/IGlucHV0VmFsdWUgOiB0aGlzLiRlZGl0b3JFbG0gJiYgdGhpcy4kZWRpdG9yRWxtLnZhbCAmJiB0aGlzLiRlZGl0b3JFbG0udmFsKCk7XHJcbiAgICBjb25zdCBlcnJvck1zZyA9IHRoaXMuY29sdW1uRWRpdG9yLmVycm9yTWVzc2FnZTtcclxuXHJcbiAgICBpZiAodGhpcy52YWxpZGF0b3IpIHtcclxuICAgICAgY29uc3QgdmFsdWUgPSAoaW5wdXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSA/IGlucHV0VmFsdWUgOiAodGhpcy5pc011bHRpcGxlU2VsZWN0ID8gdGhpcy5jdXJyZW50VmFsdWVzIDogdGhpcy5jdXJyZW50VmFsdWUpO1xyXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IodmFsdWUsIHRoaXMuYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYnkgZGVmYXVsdCB0aGUgZWRpdG9yIGlzIGFsbW9zdCBhbHdheXMgdmFsaWQgKGV4Y2VwdCB3aGVuIGl0J3MgcmVxdWlyZWQgYnV0IG5vdCBwcm92aWRlZClcclxuICAgIGlmIChpc1JlcXVpcmVkICYmIChlbG1WYWx1ZSA9PT0gJycgfHwgKEFycmF5LmlzQXJyYXkoZWxtVmFsdWUpICYmIGVsbVZhbHVlLmxlbmd0aCA9PT0gMCkpKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdmFsaWQ6IGZhbHNlLFxyXG4gICAgICAgIG1zZzogZXJyb3JNc2cgfHwgQ29uc3RhbnRzLlZBTElEQVRJT05fUkVRVUlSRURfRklFTERcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB2YWxpZDogdHJ1ZSxcclxuICAgICAgbXNnOiBudWxsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy9cclxuICAvLyBwcm90ZWN0ZWQgZnVuY3Rpb25zXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKlxyXG4gICAqIHVzZXIgbWlnaHQgd2FudCB0byBmaWx0ZXIgY2VydGFpbiBpdGVtcyBvZiB0aGUgY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBpbnB1dENvbGxlY3Rpb25cclxuICAgKiBAcmV0dXJuIG91dHB1dENvbGxlY3Rpb24gZmlsdGVyZWQgYW5kL29yIHNvcnRlZCBjb2xsZWN0aW9uXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGZpbHRlckNvbGxlY3Rpb24oaW5wdXRDb2xsZWN0aW9uKSB7XHJcbiAgICBsZXQgb3V0cHV0Q29sbGVjdGlvbiA9IGlucHV0Q29sbGVjdGlvbjtcclxuXHJcbiAgICAvLyB1c2VyIG1pZ2h0IHdhbnQgdG8gZmlsdGVyIGNlcnRhaW4gaXRlbXMgb2YgdGhlIGNvbGxlY3Rpb25cclxuICAgIGlmICh0aGlzLmNvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkVkaXRvci5jb2xsZWN0aW9uRmlsdGVyQnkpIHtcclxuICAgICAgY29uc3QgZmlsdGVyQnkgPSB0aGlzLmNvbHVtbkVkaXRvci5jb2xsZWN0aW9uRmlsdGVyQnk7XHJcbiAgICAgIGNvbnN0IGZpbHRlckNvbGxlY3Rpb25CeSA9IHRoaXMuY29sdW1uRWRpdG9yLmNvbGxlY3Rpb25PcHRpb25zICYmIHRoaXMuY29sdW1uRWRpdG9yLmNvbGxlY3Rpb25PcHRpb25zLmZpbHRlclJlc3VsdEFmdGVyRWFjaFBhc3MgfHwgbnVsbDtcclxuICAgICAgb3V0cHV0Q29sbGVjdGlvbiA9IHRoaXMuX2NvbGxlY3Rpb25TZXJ2aWNlLmZpbHRlckNvbGxlY3Rpb24ob3V0cHV0Q29sbGVjdGlvbiwgZmlsdGVyQnksIGZpbHRlckNvbGxlY3Rpb25CeSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG91dHB1dENvbGxlY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB1c2VyIG1pZ2h0IHdhbnQgdG8gc29ydCB0aGUgY29sbGVjdGlvbiBpbiBhIGNlcnRhaW4gd2F5XHJcbiAgICogQHBhcmFtIGlucHV0Q29sbGVjdGlvblxyXG4gICAqIEByZXR1cm4gb3V0cHV0Q29sbGVjdGlvbiBzb3J0ZWQgY29sbGVjdGlvblxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBzb3J0Q29sbGVjdGlvbihpbnB1dENvbGxlY3Rpb24pIHtcclxuICAgIGxldCBvdXRwdXRDb2xsZWN0aW9uID0gaW5wdXRDb2xsZWN0aW9uO1xyXG5cclxuICAgIC8vIHVzZXIgbWlnaHQgd2FudCB0byBzb3J0IHRoZSBjb2xsZWN0aW9uXHJcbiAgICBpZiAodGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IuY29sbGVjdGlvblNvcnRCeSkge1xyXG4gICAgICBjb25zdCBzb3J0QnkgPSB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvci5jb2xsZWN0aW9uU29ydEJ5O1xyXG4gICAgICBvdXRwdXRDb2xsZWN0aW9uID0gdGhpcy5fY29sbGVjdGlvblNlcnZpY2Uuc29ydENvbGxlY3Rpb24odGhpcy5jb2x1bW5EZWYsIG91dHB1dENvbGxlY3Rpb24sIHNvcnRCeSwgdGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG91dHB1dENvbGxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcmVuZGVyRG9tRWxlbWVudChjb2xsZWN0aW9uOiBhbnlbXSkge1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pICYmIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5jb2xsZWN0aW9uSW5PYmplY3RQcm9wZXJ0eSkge1xyXG4gICAgICBjb2xsZWN0aW9uID0gZ2V0RGVzY2VuZGFudFByb3BlcnR5KGNvbGxlY3Rpb24sIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuY29sbGVjdGlvbkluT2JqZWN0UHJvcGVydHkpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIFwiY29sbGVjdGlvblwiIHBhc3NlZCB0byB0aGUgU2VsZWN0IEVkaXRvciBpcyBub3QgYSB2YWxpZCBhcnJheScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVzZXIgY2FuIG9wdGlvbmFsbHkgYWRkIGEgYmxhbmsgZW50cnkgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgY29sbGVjdGlvblxyXG4gICAgaWYgKHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5hZGRCbGFua0VudHJ5KSB7XHJcbiAgICAgIGNvbGxlY3Rpb24udW5zaGlmdCh0aGlzLmNyZWF0ZUJsYW5rRW50cnkoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG5ld0NvbGxlY3Rpb24gPSBjb2xsZWN0aW9uIHx8IFtdO1xyXG5cclxuICAgIC8vIHVzZXIgbWlnaHQgd2FudCB0byBmaWx0ZXIgYW5kL29yIHNvcnQgY2VydGFpbiBpdGVtcyBvZiB0aGUgY29sbGVjdGlvblxyXG4gICAgbmV3Q29sbGVjdGlvbiA9IHRoaXMuZmlsdGVyQ29sbGVjdGlvbihuZXdDb2xsZWN0aW9uKTtcclxuICAgIG5ld0NvbGxlY3Rpb24gPSB0aGlzLnNvcnRDb2xsZWN0aW9uKG5ld0NvbGxlY3Rpb24pO1xyXG5cclxuICAgIC8vIHN0ZXAgMSwgY3JlYXRlIEhUTUwgc3RyaW5nIHRlbXBsYXRlXHJcbiAgICBjb25zdCBlZGl0b3JUZW1wbGF0ZSA9IHRoaXMuYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcobmV3Q29sbGVjdGlvbik7XHJcblxyXG4gICAgLy8gc3RlcCAyLCBjcmVhdGUgdGhlIERPTSBFbGVtZW50IG9mIHRoZSBlZGl0b3JcclxuICAgIC8vIGFsc28gc3Vic2NyaWJlIHRvIHRoZSBvbkNsb3NlIGV2ZW50XHJcbiAgICB0aGlzLmNyZWF0ZURvbUVsZW1lbnQoZWRpdG9yVGVtcGxhdGUpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKGNvbGxlY3Rpb246IGFueVtdKSB7XHJcbiAgICBsZXQgb3B0aW9ucyA9ICcnO1xyXG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xyXG4gICAgY29uc3Qgc2VwYXJhdG9yQmV0d2VlbkxhYmVscyA9IHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5zZXBhcmF0b3JCZXR3ZWVuVGV4dExhYmVscyB8fCAnJztcclxuICAgIGNvbnN0IGlzUmVuZGVySHRtbEVuYWJsZWQgPSB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvci5lbmFibGVSZW5kZXJIdG1sIHx8IGZhbHNlO1xyXG4gICAgY29uc3Qgc2FuaXRpemVkT3B0aW9ucyA9IHRoaXMuZ3JpZE9wdGlvbnMgJiYgdGhpcy5ncmlkT3B0aW9ucy5zYW5pdGl6ZUh0bWxPcHRpb25zIHx8IHt9O1xyXG5cclxuICAgIC8vIGNvbGxlY3Rpb24gY291bGQgYmUgYW4gQXJyYXkgb2YgU3RyaW5ncyBPUiBPYmplY3RzXHJcbiAgICBpZiAoY29sbGVjdGlvbi5ldmVyeSh4ID0+IHR5cGVvZiB4ID09PSAnc3RyaW5nJykpIHtcclxuICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChvcHRpb246IHN0cmluZykgPT4ge1xyXG4gICAgICAgIG9wdGlvbnMgKz0gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvbn1cIiBsYWJlbD1cIiR7b3B0aW9ufVwiPiR7b3B0aW9ufTwvb3B0aW9uPmA7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gYXJyYXkgb2Ygb2JqZWN0cyB3aWxsIHJlcXVpcmUgYSBsYWJlbC92YWx1ZSBwYWlyIHVubGVzcyBhIGN1c3RvbVN0cnVjdHVyZSBpcyBwYXNzZWRcclxuICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChvcHRpb246IFNlbGVjdE9wdGlvbikgPT4ge1xyXG4gICAgICAgIGlmICghb3B0aW9uIHx8IChvcHRpb25bdGhpcy5sYWJlbE5hbWVdID09PSB1bmRlZmluZWQgJiYgb3B0aW9uLmxhYmVsS2V5ID09PSB1bmRlZmluZWQpKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFtzZWxlY3QtZWRpdG9yXSBBIGNvbGxlY3Rpb24gd2l0aCB2YWx1ZS9sYWJlbCAob3IgdmFsdWUvbGFiZWxLZXkgd2hlbiB1c2luZyBMb2NhbGUpIGlzIHJlcXVpcmVkIHRvIHBvcHVsYXRlIHRoZSBTZWxlY3QgbGlzdCwgZm9yIGV4YW1wbGU6IHsgY29sbGVjdGlvbjogWyB7IHZhbHVlOiAnMScsIGxhYmVsOiAnT25lJyB9IF0pYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGxhYmVsS2V5ID0gKG9wdGlvbi5sYWJlbEtleSB8fCBvcHRpb25bdGhpcy5sYWJlbE5hbWVdKSBhcyBzdHJpbmc7XHJcbiAgICAgICAgY29uc3QgbGFiZWxUZXh0ID0gKChvcHRpb24ubGFiZWxLZXkgfHwgdGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCkgJiYgbGFiZWxLZXkpID8gdGhpcy5fdHJhbnNsYXRlLmluc3RhbnQobGFiZWxLZXkgfHwgJyAnKSA6IGxhYmVsS2V5O1xyXG4gICAgICAgIGxldCBwcmVmaXhUZXh0ID0gb3B0aW9uW3RoaXMubGFiZWxQcmVmaXhOYW1lXSB8fCAnJztcclxuICAgICAgICBsZXQgc3VmZml4VGV4dCA9IG9wdGlvblt0aGlzLmxhYmVsU3VmZml4TmFtZV0gfHwgJyc7XHJcbiAgICAgICAgbGV0IG9wdGlvbkxhYmVsID0gb3B0aW9uW3RoaXMub3B0aW9uTGFiZWxdIHx8ICcnO1xyXG4gICAgICAgIG9wdGlvbkxhYmVsID0gb3B0aW9uTGFiZWwudG9TdHJpbmcoKS5yZXBsYWNlKC9cXFwiL2csICdcXCcnKTsgLy8gcmVwbGFjZSBkb3VibGUgcXVvdGVzIGJ5IHNpbmdsZSBxdW90ZXMgdG8gYXZvaWQgaW50ZXJmZXJpbmcgd2l0aCByZWd1bGFyIGh0bWxcclxuXHJcbiAgICAgICAgLy8gYWxzbyB0cmFuc2xhdGUgcHJlZml4L3N1ZmZpeCBpZiBlbmFibGVUcmFuc2xhdGVMYWJlbCBpcyB0cnVlIGFuZCB0ZXh0IGlzIGEgc3RyaW5nXHJcbiAgICAgICAgcHJlZml4VGV4dCA9ICh0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsICYmIHByZWZpeFRleHQgJiYgdHlwZW9mIHByZWZpeFRleHQgPT09ICdzdHJpbmcnKSA/IHRoaXMuX3RyYW5zbGF0ZS5pbnN0YW50KHByZWZpeFRleHQgfHwgJyAnKSA6IHByZWZpeFRleHQ7XHJcbiAgICAgICAgc3VmZml4VGV4dCA9ICh0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsICYmIHN1ZmZpeFRleHQgJiYgdHlwZW9mIHN1ZmZpeFRleHQgPT09ICdzdHJpbmcnKSA/IHRoaXMuX3RyYW5zbGF0ZS5pbnN0YW50KHN1ZmZpeFRleHQgfHwgJyAnKSA6IHN1ZmZpeFRleHQ7XHJcbiAgICAgICAgb3B0aW9uTGFiZWwgPSAodGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCAmJiBvcHRpb25MYWJlbCAmJiB0eXBlb2Ygb3B0aW9uTGFiZWwgPT09ICdzdHJpbmcnKSA/IHRoaXMuX3RyYW5zbGF0ZS5pbnN0YW50KG9wdGlvbkxhYmVsIHx8ICcgJykgOiBvcHRpb25MYWJlbDtcclxuXHJcbiAgICAgICAgLy8gYWRkIHRvIGEgdGVtcCBhcnJheSBmb3Igam9pbmluZyBwdXJwb3NlIGFuZCBmaWx0ZXIgb3V0IGVtcHR5IHRleHRcclxuICAgICAgICBjb25zdCB0bXBPcHRpb25BcnJheSA9IFtwcmVmaXhUZXh0LCBsYWJlbFRleHQsIHN1ZmZpeFRleHRdLmZpbHRlcigodGV4dCkgPT4gdGV4dCk7XHJcbiAgICAgICAgbGV0IG9wdGlvblRleHQgPSB0bXBPcHRpb25BcnJheS5qb2luKHNlcGFyYXRvckJldHdlZW5MYWJlbHMpO1xyXG5cclxuICAgICAgICAvLyBpZiB1c2VyIHNwZWNpZmljYWxseSB3YW50cyB0byByZW5kZXIgaHRtbCB0ZXh0LCBoZSBuZWVkcyB0byBvcHQtaW4gZWxzZSBpdCB3aWxsIHN0cmlwcGVkIG91dCBieSBkZWZhdWx0XHJcbiAgICAgICAgLy8gYWxzbywgdGhlIDNyZCBwYXJ0eSBsaWIgd2lsbCBzYW5pbml0emUgYW55IGh0bWwgY29kZSB1bmxlc3MgaXQncyBlbmNvZGVkLCBzbyB3ZSdsbCBkbyB0aGF0XHJcbiAgICAgICAgaWYgKGlzUmVuZGVySHRtbEVuYWJsZWQpIHtcclxuICAgICAgICAgIC8vIHNhbml0aXplIGFueSB1bmF1dGhvcml6ZWQgaHRtbCB0YWdzIGxpa2Ugc2NyaXB0IGFuZCBvdGhlcnNcclxuICAgICAgICAgIC8vIGZvciB0aGUgcmVtYWluaW5nIGFsbG93ZWQgdGFncyB3ZSdsbCBwZXJtaXQgYWxsIGF0dHJpYnV0ZXNcclxuICAgICAgICAgIGNvbnN0IHNhbml0aXplZFRleHQgPSBET01QdXJpZnkuc2FuaXRpemUob3B0aW9uVGV4dCwgc2FuaXRpemVkT3B0aW9ucyk7XHJcbiAgICAgICAgICBvcHRpb25UZXh0ID0gaHRtbEVuY29kZShzYW5pdGl6ZWRUZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9wdGlvbnMgKz0gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvblt0aGlzLnZhbHVlTmFtZV19XCIgbGFiZWw9XCIke29wdGlvbkxhYmVsfVwiPiR7b3B0aW9uVGV4dH08L29wdGlvbj5gO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYDxzZWxlY3QgaWQ9XCIke3RoaXMuZWxlbWVudE5hbWV9XCIgY2xhc3M9XCJtcy1maWx0ZXIgc2VhcmNoLWZpbHRlciBlZGl0b3ItJHtmaWVsZElkfVwiICR7dGhpcy5pc011bHRpcGxlU2VsZWN0ID8gJ211bHRpcGxlPVwibXVsdGlwbGVcIicgOiAnJ30+JHtvcHRpb25zfTwvc2VsZWN0PmA7XHJcbiAgfVxyXG5cclxuICAvKiogQ3JlYXRlIGEgYmxhbmsgZW50cnkgdGhhdCBjYW4gYmUgYWRkZWQgdG8gdGhlIGNvbGxlY3Rpb24uIEl0IHdpbGwgYWxzbyByZXVzZSB0aGUgc2FtZSBjdXN0b21TdHJ1Y3R1cmUgaWYgbmVlZCBiZSAqL1xyXG4gIHByb3RlY3RlZCBjcmVhdGVCbGFua0VudHJ5KCkge1xyXG4gICAgY29uc3QgYmxhbmtFbnRyeSA9IHtcclxuICAgICAgW3RoaXMubGFiZWxOYW1lXTogJycsXHJcbiAgICAgIFt0aGlzLnZhbHVlTmFtZV06ICcnXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMubGFiZWxQcmVmaXhOYW1lKSB7XHJcbiAgICAgIGJsYW5rRW50cnlbdGhpcy5sYWJlbFByZWZpeE5hbWVdID0gJyc7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sYWJlbFN1ZmZpeE5hbWUpIHtcclxuICAgICAgYmxhbmtFbnRyeVt0aGlzLmxhYmVsU3VmZml4TmFtZV0gPSAnJztcclxuICAgIH1cclxuICAgIHJldHVybiBibGFua0VudHJ5O1xyXG4gIH1cclxuXHJcbiAgLyoqIEJ1aWxkIHRoZSB0ZW1wbGF0ZSBIVE1MIHN0cmluZyAqL1xyXG4gIHByb3RlY3RlZCBjcmVhdGVEb21FbGVtZW50KGVkaXRvclRlbXBsYXRlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuJGVkaXRvckVsbSA9ICQoZWRpdG9yVGVtcGxhdGUpO1xyXG5cclxuICAgIGlmICh0aGlzLiRlZGl0b3JFbG0gJiYgdHlwZW9mIHRoaXMuJGVkaXRvckVsbS5hcHBlbmRUbyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLiRlZGl0b3JFbG0uYXBwZW5kVG8odGhpcy5hcmdzLmNvbnRhaW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLiRlZGl0b3JFbG0ubXVsdGlwbGVTZWxlY3QgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgLy8gZmFsbGJhY2sgdG8gYm9vdHN0cmFwXHJcbiAgICAgIHRoaXMuJGVkaXRvckVsbS5hZGRDbGFzcygnZm9ybS1jb250cm9sJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBlbGVtZW50T3B0aW9ucyA9ICh0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvcikgPyB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvci5lbGVtZW50T3B0aW9ucyA6IHt9O1xyXG4gICAgICB0aGlzLmVkaXRvckVsbU9wdGlvbnMgPSB7IC4uLnRoaXMuZGVmYXVsdE9wdGlvbnMsIC4uLmVsZW1lbnRPcHRpb25zIH07XHJcbiAgICAgIHRoaXMuJGVkaXRvckVsbSA9IHRoaXMuJGVkaXRvckVsbS5tdWx0aXBsZVNlbGVjdCh0aGlzLmVkaXRvckVsbU9wdGlvbnMpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy4kZWRpdG9yRWxtICYmIHR5cGVvZiB0aGlzLiRlZGl0b3JFbG0ubXVsdGlwbGVTZWxlY3QgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgIHRoaXMuJGVkaXRvckVsbS5tdWx0aXBsZVNlbGVjdCgnb3BlbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyByZWZyZXNoIHRoZSBqcXVlcnkgb2JqZWN0IGJlY2F1c2UgdGhlIHNlbGVjdGVkIGNoZWNrYm94ZXMgd2VyZSBhbHJlYWR5IHNldFxyXG4gIC8vIHByaW9yIHRvIHRoaXMgbWV0aG9kIGJlaW5nIGNhbGxlZFxyXG4gIHByb3RlY3RlZCByZWZyZXNoKCkge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLiRlZGl0b3JFbG0ubXVsdGlwbGVTZWxlY3QgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy4kZWRpdG9yRWxtLm11bHRpcGxlU2VsZWN0KCdyZWZyZXNoJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==