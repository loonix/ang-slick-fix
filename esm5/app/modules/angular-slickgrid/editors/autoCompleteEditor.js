/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { KeyCode, FieldType } from './../models/index';
import { Constants } from './../constants';
import { findOrDefault } from '../services/utilities';
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
var /*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
AutoCompleteEditor = /** @class */ (function () {
    function AutoCompleteEditor(args) {
        this.args = args;
        this.init();
    }
    Object.defineProperty(AutoCompleteEditor.prototype, "collection", {
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
    Object.defineProperty(AutoCompleteEditor.prototype, "columnDef", {
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
    Object.defineProperty(AutoCompleteEditor.prototype, "columnEditor", {
        /** Get Column Editor object */
        get: /**
         * Get Column Editor object
         * @return {?}
         */
        function () {
            return this.columnDef && this.columnDef.internalColumnEditor || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteEditor.prototype, "customStructure", {
        /** Getter for the Custom Structure if exist */
        get: /**
         * Getter for the Custom Structure if exist
         * @return {?}
         */
        function () {
            return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.customStructure;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteEditor.prototype, "hasAutoCommitEdit", {
        get: /**
         * @return {?}
         */
        function () {
            return this.args.grid.getOptions().autoCommitEdit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteEditor.prototype, "validator", {
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
    Object.defineProperty(AutoCompleteEditor.prototype, "editorOptions", {
        get: /**
         * @return {?}
         */
        function () {
            return this.columnEditor && this.columnEditor.editorOptions || {};
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AutoCompleteEditor.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var columnId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        var placeholder = this.columnEditor && this.columnEditor.placeholder || '';
        /** @type {?} */
        var title = this.columnEditor && this.columnEditor.title || '';
        this.labelName = this.customStructure && this.customStructure.label || 'label';
        this.valueName = this.customStructure && this.customStructure.value || 'value';
        this.$input = $("<input type=\"text\" role=\"presentation\" autocomplete=\"off\" class=\"autocomplete editor-text editor-" + columnId + "\" placeholder=\"" + placeholder + "\" title=\"" + title + "\" />")
            .appendTo(this.args.container)
            .on('keydown.nav', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this._lastInputEvent = event;
            if (event.keyCode === KeyCode.LEFT || event.keyCode === KeyCode.RIGHT) {
                event.stopImmediatePropagation();
            }
        }));
        // user might pass his own autocomplete options
        /** @type {?} */
        var autoCompleteOptions = this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.editorOptions;
        // user might provide his own custom structure
        // jQuery UI autocomplete requires a label/value pair, so we must remap them when user provide different ones
        /** @type {?} */
        var collection = this.collection;
        if (Array.isArray(collection) && this.customStructure) {
            collection = collection.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                return { label: item[_this.labelName], value: item[_this.valueName] };
            }));
        }
        // when user passes it's own autocomplete options
        // we still need to provide our own "select" callback implementation
        if (autoCompleteOptions) {
            autoCompleteOptions.select = (/**
             * @param {?} event
             * @param {?} ui
             * @return {?}
             */
            function (event, ui) { return _this.onClose(event, ui); });
            this.$input.autocomplete(autoCompleteOptions);
        }
        else {
            this.$input.autocomplete({
                source: collection,
                minLength: 0,
                select: (/**
                 * @param {?} event
                 * @param {?} ui
                 * @return {?}
                 */
                function (event, ui) { return _this.onClose(event, ui); }),
            });
        }
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.$input.focus().select();
        }), 50);
    };
    /**
     * @return {?}
     */
    AutoCompleteEditor.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.$input.off('keydown.nav').remove();
    };
    /**
     * @return {?}
     */
    AutoCompleteEditor.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.$input.focus();
    };
    /**
     * @return {?}
     */
    AutoCompleteEditor.prototype.getValue = /**
     * @return {?}
     */
    function () {
        return this.$input.val();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    AutoCompleteEditor.prototype.setValue = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.$input.val(val);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    AutoCompleteEditor.prototype.loadValue = /**
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
            var data = item[fieldNameFromComplexObject || fieldName];
            this._currentValue = data;
            this._defaultTextValue = typeof data === 'string' ? data : data[this.labelName];
            this.$input.val(this._defaultTextValue);
            this.$input[0].defaultValue = this._defaultTextValue;
            this.$input.select();
        }
    };
    /**
     * @return {?}
     */
    AutoCompleteEditor.prototype.save = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var validation = this.validate();
        if (validation && validation.valid) {
            if (this.hasAutoCommitEdit) {
                this.args.grid.getEditorLock().commitCurrentEdit();
            }
            else {
                this.args.commitChanges();
            }
        }
    };
    /**
     * @return {?}
     */
    AutoCompleteEditor.prototype.serializeValue = /**
     * @return {?}
     */
    function () {
        var _a;
        // if user provided a custom structure, we will serialize the value returned from the object with custom structure
        const minLength = this.editorOptions.minLength || this.editorOptions.minLength === 0 ? this.editorOptions.minLength : 3;
        if (this.editorOptions.forceUserInput) {
          this._currentValue = this.$input.val().length >= minLength ? this.$input.val() : this._currentValue;
        }
        if (this.customStructure && this._currentValue.hasOwnProperty(this.labelName)) {
            return this._currentValue[this.labelName];
        }
        else if (this._currentValue.label) {
            if (this.columnDef.type === FieldType.object) {
                return _a = {},
                    _a[this.labelName] = this._currentValue.label,
                    _a[this.valueName] = this._currentValue.value,
                    _a;
            }
            return this._currentValue.label;
        }
        return this._currentValue;
    };
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    AutoCompleteEditor.prototype.applyValue = /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    function (item, state) {
        var _this = this;
        /** @type {?} */
        var newValue = state;
        /** @type {?} */
        var fieldName = this.columnDef && this.columnDef.field;
        // if we have a collection defined, we will try to find the string within the collection and return it
        if (Array.isArray(this.collection) && this.collection.length > 0) {
            newValue = findOrDefault(this.collection, (/**
             * @param {?} collectionItem
             * @return {?}
             */
            function (collectionItem) {
                if (collectionItem && collectionItem.hasOwnProperty(_this.labelName)) {
                    return collectionItem[_this.labelName].toString() === state;
                }
                return collectionItem.toString() === state;
            }));
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
    AutoCompleteEditor.prototype.isValueChanged = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var lastEvent = this._lastInputEvent && this._lastInputEvent.keyCode;
        if (this.columnEditor && this.columnEditor.alwaysSaveOnEnterKey && lastEvent === KeyCode.ENTER) {
            return true;
        }
        return (!(this.$input.val() === '' && this._defaultTextValue === null)) && (this.$input.val() !== this._defaultTextValue);
    };
    /**
     * @param {?=} inputValue
     * @return {?}
     */
    AutoCompleteEditor.prototype.validate = /**
     * @param {?=} inputValue
     * @return {?}
     */
    function (inputValue) {
        /** @type {?} */
        var isRequired = this.columnEditor.required;
        /** @type {?} */
        var elmValue = (inputValue !== undefined) ? inputValue : this.$input && this.$input.val && this.$input.val();
        /** @type {?} */
        var errorMsg = this.columnEditor.errorMessage;
        if (this.validator) {
            return this.validator(elmValue, this.args);
        }
        // by default the editor is almost always valid (except when it's required but not provided)
        if (isRequired && elmValue === '') {
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
    // private functions
    // ------------------
    //
    // private functions
    // ------------------
    /**
     * @private
     * @param {?} event
     * @param {?} ui
     * @return {?}
     */
    AutoCompleteEditor.prototype.onClose = 
    //
    // private functions
    // ------------------
    /**
     * @private
     * @param {?} event
     * @param {?} ui
     * @return {?}
     */
    function (event, ui) {
        if (ui && ui.item) {
            this._currentValue = ui && ui.item;
            /** @type {?} */
            var itemLabel = typeof ui.item === 'string' ? ui.item : ui.item.label;
            this.setValue(itemLabel);
            if (this.args.grid.getOptions().autoCommitEdit) {
                // do not use args.commitChanges() as this sets the focus to the next row.
                /** @type {?} */
                var validation = this.validate();
                if (validation && validation.valid) {
                    this.args.grid.getEditorLock().commitCurrentEdit();
                }
            }
        }
        return false;
    };
    return AutoCompleteEditor;
}());
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export { AutoCompleteEditor };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AutoCompleteEditor.prototype._currentValue;
    /**
     * @type {?}
     * @private
     */
    AutoCompleteEditor.prototype._defaultTextValue;
    /**
     * @type {?}
     * @private
     */
    AutoCompleteEditor.prototype._lastInputEvent;
    /** @type {?} */
    AutoCompleteEditor.prototype.$input;
    /**
     * The property name for labels in the collection
     * @type {?}
     */
    AutoCompleteEditor.prototype.labelName;
    /**
     * The property name for values in the collection
     * @type {?}
     */
    AutoCompleteEditor.prototype.valueName;
    /** @type {?} */
    AutoCompleteEditor.prototype.forceUserInput;
    /**
     * @type {?}
     * @private
     */
    AutoCompleteEditor.prototype.args;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b0NvbXBsZXRlRWRpdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9lZGl0b3JzL2F1dG9Db21wbGV0ZUVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQU1MLE9BQU8sRUFFUCxTQUFTLEVBQ1YsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7OztBQVN0RDs7Ozs7SUFjRSw0QkFBb0IsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7UUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUdELHNCQUFJLDBDQUFVO1FBRGQseUJBQXlCOzs7OztRQUN6QjtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztRQUNsRyxDQUFDOzs7T0FBQTtJQUdELHNCQUFJLHlDQUFTO1FBRGIsbUNBQW1DOzs7OztRQUNuQztZQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDN0MsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSw0Q0FBWTtRQURoQiwrQkFBK0I7Ozs7O1FBQy9CO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLElBQUksRUFBRSxDQUFDO1FBQ3JFLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksK0NBQWU7UUFEbkIsK0NBQStDOzs7OztRQUMvQztZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMs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QUFFLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQ3ZFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFekIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxjQUFjLEVBQUU7OztvQkFFeEMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2xDLElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxLQUFLLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUM7aUJBQ3BEO2FBQ0Y7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQXRPRCxJQXNPQzs7Ozs7Ozs7Ozs7SUFyT0MsMkNBQTJCOzs7OztJQUMzQiwrQ0FBa0M7Ozs7O0lBQ2xDLDZDQUF1Qzs7SUFDdkMsb0NBQVk7Ozs7O0lBR1osdUNBQWtCOzs7OztJQUdsQix1Q0FBa0I7O0lBRWxCLDRDQUF3Qjs7Ozs7SUFFWixrQ0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbHVtbixcclxuICBDb2x1bW5FZGl0b3IsXHJcbiAgRWRpdG9yLFxyXG4gIEVkaXRvclZhbGlkYXRvcixcclxuICBFZGl0b3JWYWxpZGF0b3JPdXRwdXQsXHJcbiAgS2V5Q29kZSxcclxuICBDb2xsZWN0aW9uQ3VzdG9tU3RydWN0dXJlLFxyXG4gIEZpZWxkVHlwZVxyXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi8uLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBmaW5kT3JEZWZhdWx0IH0gZnJvbSAnLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgJDogYW55O1xyXG5cclxuLypcclxuICogQW4gZXhhbXBsZSBvZiBhICdkZXRhY2hlZCcgZWRpdG9yLlxyXG4gKiBLZXlEb3duIGV2ZW50cyBhcmUgYWxzbyBoYW5kbGVkIHRvIHByb3ZpZGUgaGFuZGxpbmcgZm9yIFRhYiwgU2hpZnQtVGFiLCBFc2MgYW5kIEN0cmwtRW50ZXIuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXV0b0NvbXBsZXRlRWRpdG9yIGltcGxlbWVudHMgRWRpdG9yIHtcclxuICBwcml2YXRlIF9jdXJyZW50VmFsdWU6IGFueTtcclxuICBwcml2YXRlIF9kZWZhdWx0VGV4dFZhbHVlOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfbGFzdElucHV0RXZlbnQ6IEtleWJvYXJkRXZlbnQ7XHJcbiAgJGlucHV0OiBhbnk7XHJcblxyXG4gIC8qKiBUaGUgcHJvcGVydHkgbmFtZSBmb3IgbGFiZWxzIGluIHRoZSBjb2xsZWN0aW9uICovXHJcbiAgbGFiZWxOYW1lOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBUaGUgcHJvcGVydHkgbmFtZSBmb3IgdmFsdWVzIGluIHRoZSBjb2xsZWN0aW9uICovXHJcbiAgdmFsdWVOYW1lOiBzdHJpbmc7XHJcblxyXG4gIGZvcmNlVXNlcklucHV0OiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFyZ3M6IGFueSkge1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IHRoZSBDb2xsZWN0aW9uICovXHJcbiAgZ2V0IGNvbGxlY3Rpb24oKTogYW55W10ge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yLmNvbGxlY3Rpb24gfHwgW107XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IENvbHVtbiBEZWZpbml0aW9uIG9iamVjdCAqL1xyXG4gIGdldCBjb2x1bW5EZWYoKTogQ29sdW1uIHtcclxuICAgIHJldHVybiB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbHVtbiB8fCB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgQ29sdW1uIEVkaXRvciBvYmplY3QgKi9cclxuICBnZXQgY29sdW1uRWRpdG9yKCk6IENvbHVtbkVkaXRvciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgfHwge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgQ3VzdG9tIFN0cnVjdHVyZSBpZiBleGlzdCAqL1xyXG4gIGdldCBjdXN0b21TdHJ1Y3R1cmUoKTogQ29sbGVjdGlvbkN1c3RvbVN0cnVjdHVyZSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IuY3VzdG9tU3RydWN0dXJlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGhhc0F1dG9Db21taXRFZGl0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXJncy5ncmlkLmdldE9wdGlvbnMoKS5hdXRvQ29tbWl0RWRpdDtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIFZhbGlkYXRvciBmdW5jdGlvbiwgY2FuIGJlIHBhc3NlZCBpbiBFZGl0b3IgcHJvcGVydHkgb3IgQ29sdW1uIERlZmluaXRpb24gKi9cclxuICBnZXQgdmFsaWRhdG9yKCk6IEVkaXRvclZhbGlkYXRvciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5FZGl0b3IudmFsaWRhdG9yIHx8IHRoaXMuY29sdW1uRGVmLnZhbGlkYXRvcjtcclxuICB9XHJcblxyXG4gIGdldCBlZGl0b3JPcHRpb25zKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRWRpdG9yLmVkaXRvck9wdGlvbnMgfHwge307XHJcbiAgfVxyXG5cclxuICBpbml0KCk6IHZvaWQge1xyXG4gICAgY29uc3QgY29sdW1uSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcclxuICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5jb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5FZGl0b3IucGxhY2Vob2xkZXIgfHwgJyc7XHJcbiAgICBjb25zdCB0aXRsZSA9IHRoaXMuY29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRWRpdG9yLnRpdGxlIHx8ICcnO1xyXG4gICAgdGhpcy5sYWJlbE5hbWUgPSB0aGlzLmN1c3RvbVN0cnVjdHVyZSAmJiB0aGlzLmN1c3RvbVN0cnVjdHVyZS5sYWJlbCB8fCAnbGFiZWwnO1xyXG4gICAgdGhpcy52YWx1ZU5hbWUgPSB0aGlzLmN1c3RvbVN0cnVjdHVyZSAmJiB0aGlzLmN1c3RvbVN0cnVjdHVyZS52YWx1ZSB8fCAndmFsdWUnO1xyXG4gICAgdGhpcy4kaW5wdXQgPSAkKGA8aW5wdXQgdHlwZT1cInRleHRcIiByb2xlPVwicHJlc2VudGF0aW9uXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgY2xhc3M9XCJhdXRvY29tcGxldGUgZWRpdG9yLXRleHQgZWRpdG9yLSR7Y29sdW1uSWR9XCIgcGxhY2Vob2xkZXI9XCIke3BsYWNlaG9sZGVyfVwiIHRpdGxlPVwiJHt0aXRsZX1cIiAvPmApXHJcbiAgICAgIC5hcHBlbmRUbyh0aGlzLmFyZ3MuY29udGFpbmVyKVxyXG4gICAgICAub24oJ2tleWRvd24ubmF2JywgKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5fbGFzdElucHV0RXZlbnQgPSBldmVudDtcclxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZS5MRUZUIHx8IGV2ZW50LmtleUNvZGUgPT09IEtleUNvZGUuUklHSFQpIHtcclxuICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgLy8gdXNlciBtaWdodCBwYXNzIGhpcyBvd24gYXV0b2NvbXBsZXRlIG9wdGlvbnNcclxuICAgIGNvbnN0IGF1dG9Db21wbGV0ZU9wdGlvbnMgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvci5lZGl0b3JPcHRpb25zO1xyXG5cclxuICAgIC8vIHVzZXIgbWlnaHQgcHJvdmlkZSBoaXMgb3duIGN1c3RvbSBzdHJ1Y3R1cmVcclxuICAgIC8vIGpRdWVyeSBVSSBhdXRvY29tcGxldGUgcmVxdWlyZXMgYSBsYWJlbC92YWx1ZSBwYWlyLCBzbyB3ZSBtdXN0IHJlbWFwIHRoZW0gd2hlbiB1c2VyIHByb3ZpZGUgZGlmZmVyZW50IG9uZXNcclxuICAgIGxldCBjb2xsZWN0aW9uID0gdGhpcy5jb2xsZWN0aW9uO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUpIHtcclxuICAgICAgY29sbGVjdGlvbiA9IGNvbGxlY3Rpb24ubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgbGFiZWw6IGl0ZW1bdGhpcy5sYWJlbE5hbWVdLCB2YWx1ZTogaXRlbVt0aGlzLnZhbHVlTmFtZV0gfTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2hlbiB1c2VyIHBhc3NlcyBpdCdzIG93biBhdXRvY29tcGxldGUgb3B0aW9uc1xyXG4gICAgLy8gd2Ugc3RpbGwgbmVlZCB0byBwcm92aWRlIG91ciBvd24gXCJzZWxlY3RcIiBjYWxsYmFjayBpbXBsZW1lbnRhdGlvblxyXG4gICAgaWYgKGF1dG9Db21wbGV0ZU9wdGlvbnMpIHtcclxuICAgICAgYXV0b0NvbXBsZXRlT3B0aW9ucy5zZWxlY3QgPSAoZXZlbnQ6IEV2ZW50LCB1aTogYW55KSA9PiB0aGlzLm9uQ2xvc2UoZXZlbnQsIHVpKTtcclxuICAgICAgdGhpcy4kaW5wdXQuYXV0b2NvbXBsZXRlKGF1dG9Db21wbGV0ZU9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy4kaW5wdXQuYXV0b2NvbXBsZXRlKHtcclxuICAgICAgICBzb3VyY2U6IGNvbGxlY3Rpb24sXHJcbiAgICAgICAgbWluTGVuZ3RoOiAwLFxyXG4gICAgICAgIHNlbGVjdDogKGV2ZW50OiBFdmVudCwgdWk6IGFueSkgPT4gdGhpcy5vbkNsb3NlKGV2ZW50LCB1aSksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLiRpbnB1dC5mb2N1cygpLnNlbGVjdCgpO1xyXG4gICAgfSwgNTApO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuJGlucHV0Lm9mZigna2V5ZG93bi5uYXYnKS5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIGZvY3VzKCkge1xyXG4gICAgdGhpcy4kaW5wdXQuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIGdldFZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuJGlucHV0LnZhbCgpO1xyXG4gIH1cclxuXHJcbiAgc2V0VmFsdWUodmFsOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuJGlucHV0LnZhbCh2YWwpO1xyXG4gIH1cclxuXHJcbiAgbG9hZFZhbHVlKGl0ZW06IGFueSkge1xyXG4gICAgY29uc3QgZmllbGROYW1lID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmllbGQ7XHJcblxyXG4gICAgLy8gd2hlbiBpdCdzIGEgY29tcGxleCBvYmplY3QsIHRoZW4gcHVsbCB0aGUgb2JqZWN0IG5hbWUgb25seSwgZS5nLjogXCJ1c2VyLmZpcnN0TmFtZVwiID0+IFwidXNlclwiXHJcbiAgICBjb25zdCBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCA9IGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGZpZWxkTmFtZS5pbmRleE9mKCcuJykpIDogJyc7XHJcblxyXG4gICAgaWYgKGl0ZW0gJiYgdGhpcy5jb2x1bW5EZWYgJiYgKGl0ZW0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSB8fCBpdGVtLmhhc093blByb3BlcnR5KGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0KSkpIHtcclxuICAgICAgY29uc3QgZGF0YSA9IGl0ZW1bZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgfHwgZmllbGROYW1lXTtcclxuICAgICAgdGhpcy5fY3VycmVudFZhbHVlID0gZGF0YTtcclxuICAgICAgdGhpcy5fZGVmYXVsdFRleHRWYWx1ZSA9IHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJyA/IGRhdGEgOiBkYXRhW3RoaXMubGFiZWxOYW1lXTtcclxuICAgICAgdGhpcy4kaW5wdXQudmFsKHRoaXMuX2RlZmF1bHRUZXh0VmFsdWUpO1xyXG4gICAgICB0aGlzLiRpbnB1dFswXS5kZWZhdWx0VmFsdWUgPSB0aGlzLl9kZWZhdWx0VGV4dFZhbHVlO1xyXG4gICAgICB0aGlzLiRpbnB1dC5zZWxlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBzYXZlKCkge1xyXG4gICAgY29uc3QgdmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUoKTtcclxuICAgIGlmICh2YWxpZGF0aW9uICYmIHZhbGlkYXRpb24udmFsaWQpIHtcclxuICAgICAgaWYgKHRoaXMuaGFzQXV0b0NvbW1pdEVkaXQpIHtcclxuICAgICAgICB0aGlzLmFyZ3MuZ3JpZC5nZXRFZGl0b3JMb2NrKCkuY29tbWl0Q3VycmVudEVkaXQoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmFyZ3MuY29tbWl0Q2hhbmdlcygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXJpYWxpemVWYWx1ZSgpIHtcclxuICAgIC8vIGlmIHVzZXIgcHJvdmlkZWQgYSBjdXN0b20gc3RydWN0dXJlLCB3ZSB3aWxsIHNlcmlhbGl6ZSB0aGUgdmFsdWUgcmV0dXJuZWQgZnJvbSB0aGUgb2JqZWN0IHdpdGggY3VzdG9tIHN0cnVjdHVyZVxyXG4gICAgaWYgKHRoaXMuZWRpdG9yT3B0aW9ucy5mb3JjZVVzZXJJbnB1dCkge1xyXG4gICAgICB0aGlzLl9jdXJyZW50VmFsdWUgPSB0aGlzLiRpbnB1dC52YWwoKS5sZW5ndGggPiAzID8gdGhpcy4kaW5wdXQudmFsKCkgOiB0aGlzLl9jdXJyZW50VmFsdWU7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5fY3VycmVudFZhbHVlLmhhc093blByb3BlcnR5KHRoaXMubGFiZWxOYW1lKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY3VycmVudFZhbHVlW3RoaXMubGFiZWxOYW1lXTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudFZhbHVlLmxhYmVsKSB7XHJcbiAgICAgIGlmICh0aGlzLmNvbHVtbkRlZi50eXBlID09PSBGaWVsZFR5cGUub2JqZWN0KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIFt0aGlzLmxhYmVsTmFtZV06IHRoaXMuX2N1cnJlbnRWYWx1ZS5sYWJlbCxcclxuICAgICAgICAgIFt0aGlzLnZhbHVlTmFtZV06IHRoaXMuX2N1cnJlbnRWYWx1ZS52YWx1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRWYWx1ZS5sYWJlbDtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50VmFsdWU7XHJcbiAgfVxyXG5cclxuICBhcHBseVZhbHVlKGl0ZW06IGFueSwgc3RhdGU6IGFueSkge1xyXG4gICAgbGV0IG5ld1ZhbHVlID0gc3RhdGU7XHJcbiAgICBjb25zdCBmaWVsZE5hbWUgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWVsZDtcclxuXHJcbiAgICAvLyBpZiB3ZSBoYXZlIGEgY29sbGVjdGlvbiBkZWZpbmVkLCB3ZSB3aWxsIHRyeSB0byBmaW5kIHRoZSBzdHJpbmcgd2l0aGluIHRoZSBjb2xsZWN0aW9uIGFuZCByZXR1cm4gaXRcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuY29sbGVjdGlvbikgJiYgdGhpcy5jb2xsZWN0aW9uLmxlbmd0aCA+IDApIHtcclxuICAgICAgbmV3VmFsdWUgPSBmaW5kT3JEZWZhdWx0KHRoaXMuY29sbGVjdGlvbiwgKGNvbGxlY3Rpb25JdGVtOiBhbnkpID0+IHtcclxuICAgICAgICBpZiAoY29sbGVjdGlvbkl0ZW0gJiYgY29sbGVjdGlvbkl0ZW0uaGFzT3duUHJvcGVydHkodGhpcy5sYWJlbE5hbWUpKSB7XHJcbiAgICAgICAgICByZXR1cm4gY29sbGVjdGlvbkl0ZW1bdGhpcy5sYWJlbE5hbWVdLnRvU3RyaW5nKCkgPT09IHN0YXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbkl0ZW0udG9TdHJpbmcoKSA9PT0gc3RhdGU7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHdoZW4gaXQncyBhIGNvbXBsZXggb2JqZWN0LCB0aGVuIHB1bGwgdGhlIG9iamVjdCBuYW1lIG9ubHksIGUuZy46IFwidXNlci5maXJzdE5hbWVcIiA9PiBcInVzZXJcIlxyXG4gICAgY29uc3QgZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgPSBmaWVsZE5hbWUuaW5kZXhPZignLicpID8gZmllbGROYW1lLnN1YnN0cmluZygwLCBmaWVsZE5hbWUuaW5kZXhPZignLicpKSA6ICcnO1xyXG4gICAgY29uc3QgdmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUobmV3VmFsdWUpO1xyXG4gICAgaXRlbVtmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCB8fCBmaWVsZE5hbWVdID0gKHZhbGlkYXRpb24gJiYgdmFsaWRhdGlvbi52YWxpZCkgPyBuZXdWYWx1ZSA6ICcnO1xyXG4gIH1cclxuXHJcbiAgaXNWYWx1ZUNoYW5nZWQoKSB7XHJcbiAgICBjb25zdCBsYXN0RXZlbnQgPSB0aGlzLl9sYXN0SW5wdXRFdmVudCAmJiB0aGlzLl9sYXN0SW5wdXRFdmVudC5rZXlDb2RlO1xyXG4gICAgaWYgKHRoaXMuY29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRWRpdG9yLmFsd2F5c1NhdmVPbkVudGVyS2V5ICYmIGxhc3RFdmVudCA9PT0gS2V5Q29kZS5FTlRFUikge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiAoISh0aGlzLiRpbnB1dC52YWwoKSA9PT0gJycgJiYgdGhpcy5fZGVmYXVsdFRleHRWYWx1ZSA9PT0gbnVsbCkpICYmICh0aGlzLiRpbnB1dC52YWwoKSAhPT0gdGhpcy5fZGVmYXVsdFRleHRWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZShpbnB1dFZhbHVlPzogYW55KTogRWRpdG9yVmFsaWRhdG9yT3V0cHV0IHtcclxuICAgIGNvbnN0IGlzUmVxdWlyZWQgPSB0aGlzLmNvbHVtbkVkaXRvci5yZXF1aXJlZDtcclxuICAgIGNvbnN0IGVsbVZhbHVlID0gKGlucHV0VmFsdWUgIT09IHVuZGVmaW5lZCkgPyBpbnB1dFZhbHVlIDogdGhpcy4kaW5wdXQgJiYgdGhpcy4kaW5wdXQudmFsICYmIHRoaXMuJGlucHV0LnZhbCgpO1xyXG4gICAgY29uc3QgZXJyb3JNc2cgPSB0aGlzLmNvbHVtbkVkaXRvci5lcnJvck1lc3NhZ2U7XHJcblxyXG4gICAgaWYgKHRoaXMudmFsaWRhdG9yKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcihlbG1WYWx1ZSwgdGhpcy5hcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBieSBkZWZhdWx0IHRoZSBlZGl0b3IgaXMgYWxtb3N0IGFsd2F5cyB2YWxpZCAoZXhjZXB0IHdoZW4gaXQncyByZXF1aXJlZCBidXQgbm90IHByb3ZpZGVkKVxyXG4gICAgaWYgKGlzUmVxdWlyZWQgJiYgZWxtVmFsdWUgPT09ICcnKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdmFsaWQ6IGZhbHNlLFxyXG4gICAgICAgIG1zZzogZXJyb3JNc2cgfHwgQ29uc3RhbnRzLlZBTElEQVRJT05fUkVRVUlSRURfRklFTERcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB2YWxpZDogdHJ1ZSxcclxuICAgICAgbXNnOiBudWxsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy9cclxuICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICBwcml2YXRlIG9uQ2xvc2UoZXZlbnQ6IEV2ZW50LCB1aTogYW55KSB7XHJcbiAgICBpZiAodWkgJiYgdWkuaXRlbSkge1xyXG4gICAgICB0aGlzLl9jdXJyZW50VmFsdWUgPSB1aSAmJiB1aS5pdGVtO1xyXG4gICAgICBjb25zdCBpdGVtTGFiZWwgPSB0eXBlb2YgdWkuaXRlbSA9PT0gJ3N0cmluZycgPyB1aS5pdGVtIDogdWkuaXRlbS5sYWJlbDtcclxuICAgICAgdGhpcy5zZXRWYWx1ZShpdGVtTGFiZWwpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuYXJncy5ncmlkLmdldE9wdGlvbnMoKS5hdXRvQ29tbWl0RWRpdCkge1xyXG4gICAgICAgIC8vIGRvIG5vdCB1c2UgYXJncy5jb21taXRDaGFuZ2VzKCkgYXMgdGhpcyBzZXRzIHRoZSBmb2N1cyB0byB0aGUgbmV4dCByb3cuXHJcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUoKTtcclxuICAgICAgICBpZiAodmFsaWRhdGlvbiAmJiB2YWxpZGF0aW9uLnZhbGlkKSB7XHJcbiAgICAgICAgICB0aGlzLmFyZ3MuZ3JpZC5nZXRFZGl0b3JMb2NrKCkuY29tbWl0Q3VycmVudEVkaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuIl19