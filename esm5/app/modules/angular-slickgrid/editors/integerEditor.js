/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Constants } from './../constants';
import { KeyCode } from './../models/index';
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
var /*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
IntegerEditor = /** @class */ (function () {
    function IntegerEditor(args) {
        this.args = args;
        this.init();
    }
    Object.defineProperty(IntegerEditor.prototype, "columnDef", {
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
    Object.defineProperty(IntegerEditor.prototype, "columnEditor", {
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
    Object.defineProperty(IntegerEditor.prototype, "hasAutoCommitEdit", {
        get: /**
         * @return {?}
         */
        function () {
            return this.args.grid.getOptions().autoCommitEdit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IntegerEditor.prototype, "validator", {
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
    IntegerEditor.prototype.init = /**
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
        this.$input = $("<input type=\"number\" role=\"presentation\"  autocomplete=\"off\" class=\"editor-text editor-" + columnId + "\" placeholder=\"" + placeholder + "\" title=\"" + title + "\" />")
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
        // the lib does not get the focus out event for some reason
        // so register it here
        if (this.hasAutoCommitEdit) {
            this.$input.on('focusout', (/**
             * @return {?}
             */
            function () { return _this.save(); }));
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
    IntegerEditor.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.$input.off('keydown.nav focusout').remove();
    };
    /**
     * @return {?}
     */
    IntegerEditor.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.$input.focus();
    };
    /**
     * @return {?}
     */
    IntegerEditor.prototype.getColumnEditor = /**
     * @return {?}
     */
    function () {
        return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    IntegerEditor.prototype.loadValue = /**
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
            this.defaultValue = parseInt(item[fieldNameFromComplexObject || fieldName], 10);
            this.$input.val(this.defaultValue);
            this.$input[0].defaultValue = this.defaultValue;
            this.$input.select();
        }
    };
    /**
     * @return {?}
     */
    IntegerEditor.prototype.serializeValue = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var elmValue = this.$input.val();
        if (elmValue === '' || isNaN(elmValue)) {
            return elmValue;
        }
        return parseInt(elmValue, 10) || 0;
    };
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    IntegerEditor.prototype.applyValue = /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    function (item, state) {
        /** @type {?} */
        var fieldName = this.columnDef && this.columnDef.field;
        // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
        /** @type {?} */
        var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
        /** @type {?} */
        var validation = this.validate(state);
        item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? state : '';
    };
    /**
     * @return {?}
     */
    IntegerEditor.prototype.isValueChanged = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var elmValue = this.$input.val();
        /** @type {?} */
        var value = isNaN(elmValue) ? elmValue : parseInt(elmValue, 10);
        /** @type {?} */
        var lastEvent = this._lastInputEvent && this._lastInputEvent.keyCode;
        if (this.columnEditor && this.columnEditor.alwaysSaveOnEnterKey && lastEvent === KeyCode.ENTER) {
            return true;
        }
        return (!(value === '' && this.defaultValue === null && lastEvent !== KeyCode.ENTER)) && (value !== this.defaultValue);
    };
    /**
     * @return {?}
     */
    IntegerEditor.prototype.save = /**
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
     * @param {?=} inputValue
     * @return {?}
     */
    IntegerEditor.prototype.validate = /**
     * @param {?=} inputValue
     * @return {?}
     */
    function (inputValue) {
        /** @type {?} */
        var elmValue = (inputValue !== undefined) ? inputValue : this.$input && this.$input.val && this.$input.val();
        /** @type {?} */
        var intNumber = !isNaN((/** @type {?} */ (elmValue))) ? parseInt(elmValue, 10) : null;
        /** @type {?} */
        var errorMsg = this.columnEditor.errorMessage;
        /** @type {?} */
        var isRequired = this.columnEditor.required;
        /** @type {?} */
        var minValue = this.columnEditor.minValue;
        /** @type {?} */
        var maxValue = this.columnEditor.maxValue;
        /** @type {?} */
        var mapValidation = {
            '{{minValue}}': minValue,
            '{{maxValue}}': maxValue
        };
        /** @type {?} */
        var isValid = true;
        /** @type {?} */
        var outputMsg = '';
        if (this.validator) {
            return this.validator(elmValue, this.args);
        }
        else if (isRequired && elmValue === '') {
            isValid = false;
            outputMsg = errorMsg || Constants.VALIDATION_REQUIRED_FIELD;
        }
        else if (isNaN((/** @type {?} */ (elmValue))) || !/^[+-]?\d+$/.test(elmValue)) {
            isValid = false;
            outputMsg = errorMsg || Constants.VALIDATION_EDITOR_VALID_INTEGER;
        }
        else if (minValue !== undefined && maxValue !== undefined && intNumber !== null && (intNumber < minValue || intNumber > maxValue)) {
            // MIN & MAX Values provided
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            isValid = false;
            outputMsg = errorMsg || Constants.VALIDATION_EDITOR_INTEGER_BETWEEN.replace(/{{minValue}}|{{maxValue}}/gi, (/**
             * @param {?} matched
             * @return {?}
             */
            function (matched) { return mapValidation[matched]; }));
        }
        else if (minValue !== undefined && intNumber !== null && intNumber <= minValue) {
            // MIN VALUE ONLY
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            isValid = false;
            outputMsg = errorMsg || Constants.VALIDATION_EDITOR_INTEGER_MIN.replace(/{{minValue}}/gi, (/**
             * @param {?} matched
             * @return {?}
             */
            function (matched) { return mapValidation[matched]; }));
        }
        else if (maxValue !== undefined && intNumber !== null && intNumber >= maxValue) {
            // MAX VALUE ONLY
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            isValid = false;
            outputMsg = errorMsg || Constants.VALIDATION_EDITOR_INTEGER_MAX.replace(/{{maxValue}}/gi, (/**
             * @param {?} matched
             * @return {?}
             */
            function (matched) { return mapValidation[matched]; }));
        }
        return {
            valid: isValid,
            msg: outputMsg
        };
    };
    return IntegerEditor;
}());
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export { IntegerEditor };
if (false) {
    /**
     * @type {?}
     * @private
     */
    IntegerEditor.prototype._lastInputEvent;
    /** @type {?} */
    IntegerEditor.prototype.$input;
    /** @type {?} */
    IntegerEditor.prototype.defaultValue;
    /**
     * @type {?}
     * @private
     */
    IntegerEditor.prototype.args;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdlckVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZWRpdG9ycy9pbnRlZ2VyRWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUF3RSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7QUFTbEg7Ozs7O0lBS0UsdUJBQW9CLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQzNCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFHRCxzQkFBSSxvQ0FBUztRQURiLG1DQUFtQzs7Ozs7UUFDbkM7WUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQzdDLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksdUNBQVk7UUFEaEIsK0JBQStCOzs7OztRQUMvQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLElBQUksRUFBRSxDQUFDO1FBQzVHLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNENBQWlCOzs7O1FBQXJCO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxjQUFjLENBQUM7UUFDcEQsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSxvQ0FBUztRQURiLHdGQUF3Rjs7Ozs7UUFDeEY7WUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQ2pFLENBQUM7OztPQUFBOzs7O0lBRUQsNEJBQUk7OztJ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Qyw2QkFBNkI7Ozs7WUFBRSxVQUFDLE9BQU8sSUFBSyxPQUFBLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBdEIsQ0FBc0IsRUFBQyxDQUFDO1NBQ2pKO2FBQU0sSUFBSSxRQUFRLEtBQUssU0FBUyxJQUFJLFNBQVMsS0FBSyxJQUFJLElBQUksU0FBUyxJQUFJLFFBQVEsRUFBRTtZQUNoRixpQkFBaUI7WUFDakIsMkZBQTJGO1lBQzNGLGlHQUFpRztZQUNqRyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ2hCLFNBQVMsR0FBRyxRQUFRLElBQUksU0FBUyxDQUFDLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxnQkFBZ0I7Ozs7WUFBRSxVQUFDLE9BQU8sSUFBSyxPQUFBLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBdEIsQ0FBc0IsRUFBQyxDQUFDO1NBQ2hJO2FBQU0sSUFBSSxRQUFRLEtBQUssU0FBUyxJQUFJLFNBQVMsS0FBSyxJQUFJLElBQUksU0FBUyxJQUFJLFFBQVEsRUFBRTtZQUNoRixpQkFBaUI7WUFDakIsMkZBQTJGO1lBQzNGLGlHQUFpRztZQUNqRyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ2hCLFNBQVMsR0FBRyxRQUFRLElBQUksU0FBUyxDQUFDLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxnQkFBZ0I7Ozs7WUFBRSxVQUFDLE9BQU8sSUFBSyxPQUFBLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBdEIsQ0FBc0IsRUFBQyxDQUFDO1NBQ2hJO1FBRUQsT0FBTztZQUNMLEtBQUssRUFBRSxPQUFPO1lBQ2QsR0FBRyxFQUFFLFNBQVM7U0FDZixDQUFDO0lBQ0osQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQXBLRCxJQW9LQzs7Ozs7Ozs7Ozs7SUFuS0Msd0NBQXVDOztJQUN2QywrQkFBWTs7SUFDWixxQ0FBa0I7Ozs7O0lBRU4sNkJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi8uLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBDb2x1bW4sIENvbHVtbkVkaXRvciwgRWRpdG9yLCBFZGl0b3JWYWxpZGF0b3IsIEVkaXRvclZhbGlkYXRvck91dHB1dCwgS2V5Q29kZSB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgJDogYW55O1xyXG5cclxuLypcclxuICogQW4gZXhhbXBsZSBvZiBhICdkZXRhY2hlZCcgZWRpdG9yLlxyXG4gKiBLZXlEb3duIGV2ZW50cyBhcmUgYWxzbyBoYW5kbGVkIHRvIHByb3ZpZGUgaGFuZGxpbmcgZm9yIFRhYiwgU2hpZnQtVGFiLCBFc2MgYW5kIEN0cmwtRW50ZXIuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSW50ZWdlckVkaXRvciBpbXBsZW1lbnRzIEVkaXRvciB7XHJcbiAgcHJpdmF0ZSBfbGFzdElucHV0RXZlbnQ6IEtleWJvYXJkRXZlbnQ7XHJcbiAgJGlucHV0OiBhbnk7XHJcbiAgZGVmYXVsdFZhbHVlOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXJnczogYW55KSB7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgQ29sdW1uIERlZmluaXRpb24gb2JqZWN0ICovXHJcbiAgZ2V0IGNvbHVtbkRlZigpOiBDb2x1bW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuY29sdW1uIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBDb2x1bW4gRWRpdG9yIG9iamVjdCAqL1xyXG4gIGdldCBjb2x1bW5FZGl0b3IoKTogQ29sdW1uRWRpdG9yIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciB8fCB7fTtcclxuICB9XHJcblxyXG4gIGdldCBoYXNBdXRvQ29tbWl0RWRpdCgpIHtcclxuICAgIHJldHVybiB0aGlzLmFyZ3MuZ3JpZC5nZXRPcHRpb25zKCkuYXV0b0NvbW1pdEVkaXQ7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IHRoZSBWYWxpZGF0b3IgZnVuY3Rpb24sIGNhbiBiZSBwYXNzZWQgaW4gRWRpdG9yIHByb3BlcnR5IG9yIENvbHVtbiBEZWZpbml0aW9uICovXHJcbiAgZ2V0IHZhbGlkYXRvcigpOiBFZGl0b3JWYWxpZGF0b3Ige1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRWRpdG9yLnZhbGlkYXRvciB8fCB0aGlzLmNvbHVtbkRlZi52YWxpZGF0b3I7XHJcbiAgfVxyXG5cclxuICBpbml0KCk6IHZvaWQge1xyXG4gICAgY29uc3QgY29sdW1uSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcclxuICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5jb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5FZGl0b3IucGxhY2Vob2xkZXIgfHwgJyc7XHJcbiAgICBjb25zdCB0aXRsZSA9IHRoaXMuY29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRWRpdG9yLnRpdGxlIHx8ICcnO1xyXG5cclxuICAgIHRoaXMuJGlucHV0ID0gJChgPGlucHV0IHR5cGU9XCJudW1iZXJcIiByb2xlPVwicHJlc2VudGF0aW9uXCIgIGF1dG9jb21wbGV0ZT1cIm9mZlwiIGNsYXNzPVwiZWRpdG9yLXRleHQgZWRpdG9yLSR7Y29sdW1uSWR9XCIgcGxhY2Vob2xkZXI9XCIke3BsYWNlaG9sZGVyfVwiIHRpdGxlPVwiJHt0aXRsZX1cIiAvPmApXHJcbiAgICAgIC5hcHBlbmRUbyh0aGlzLmFyZ3MuY29udGFpbmVyKVxyXG4gICAgICAub24oJ2tleWRvd24ubmF2JywgKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5fbGFzdElucHV0RXZlbnQgPSBldmVudDtcclxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZS5MRUZUIHx8IGV2ZW50LmtleUNvZGUgPT09IEtleUNvZGUuUklHSFQpIHtcclxuICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgLy8gdGhlIGxpYiBkb2VzIG5vdCBnZXQgdGhlIGZvY3VzIG91dCBldmVudCBmb3Igc29tZSByZWFzb25cclxuICAgIC8vIHNvIHJlZ2lzdGVyIGl0IGhlcmVcclxuICAgIGlmICh0aGlzLmhhc0F1dG9Db21taXRFZGl0KSB7XHJcbiAgICAgIHRoaXMuJGlucHV0Lm9uKCdmb2N1c291dCcsICgpID0+IHRoaXMuc2F2ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy4kaW5wdXQuZm9jdXMoKS5zZWxlY3QoKTtcclxuICAgIH0sIDUwKTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLiRpbnB1dC5vZmYoJ2tleWRvd24ubmF2IGZvY3Vzb3V0JykucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICBmb2N1cygpIHtcclxuICAgIHRoaXMuJGlucHV0LmZvY3VzKCk7XHJcbiAgfVxyXG5cclxuICBnZXRDb2x1bW5FZGl0b3IoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hcmdzICYmIHRoaXMuYXJncy5jb2x1bW4gJiYgdGhpcy5hcmdzLmNvbHVtbi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmFyZ3MuY29sdW1uLmludGVybmFsQ29sdW1uRWRpdG9yO1xyXG4gIH1cclxuXHJcbiAgbG9hZFZhbHVlKGl0ZW06IGFueSkge1xyXG4gICAgY29uc3QgZmllbGROYW1lID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmllbGQ7XHJcblxyXG4gICAgLy8gd2hlbiBpdCdzIGEgY29tcGxleCBvYmplY3QsIHRoZW4gcHVsbCB0aGUgb2JqZWN0IG5hbWUgb25seSwgZS5nLjogXCJ1c2VyLmZpcnN0TmFtZVwiID0+IFwidXNlclwiXHJcbiAgICBjb25zdCBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCA9IGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGZpZWxkTmFtZS5pbmRleE9mKCcuJykpIDogJyc7XHJcblxyXG4gICAgaWYgKGl0ZW0gJiYgdGhpcy5jb2x1bW5EZWYgJiYgKGl0ZW0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSB8fCBpdGVtLmhhc093blByb3BlcnR5KGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0KSkpIHtcclxuICAgICAgdGhpcy5kZWZhdWx0VmFsdWUgPSBwYXJzZUludChpdGVtW2ZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0IHx8IGZpZWxkTmFtZV0sIDEwKTtcclxuICAgICAgdGhpcy4kaW5wdXQudmFsKHRoaXMuZGVmYXVsdFZhbHVlKTtcclxuICAgICAgdGhpcy4kaW5wdXRbMF0uZGVmYXVsdFZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWU7XHJcbiAgICAgIHRoaXMuJGlucHV0LnNlbGVjdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2VyaWFsaXplVmFsdWUoKSB7XHJcbiAgICBjb25zdCBlbG1WYWx1ZSA9IHRoaXMuJGlucHV0LnZhbCgpO1xyXG4gICAgaWYgKGVsbVZhbHVlID09PSAnJyB8fCBpc05hTihlbG1WYWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIGVsbVZhbHVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcnNlSW50KGVsbVZhbHVlLCAxMCkgfHwgMDtcclxuICB9XHJcblxyXG4gIGFwcGx5VmFsdWUoaXRlbTogYW55LCBzdGF0ZTogYW55KSB7XHJcbiAgICBjb25zdCBmaWVsZE5hbWUgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWVsZDtcclxuICAgIC8vIHdoZW4gaXQncyBhIGNvbXBsZXggb2JqZWN0LCB0aGVuIHB1bGwgdGhlIG9iamVjdCBuYW1lIG9ubHksIGUuZy46IFwidXNlci5maXJzdE5hbWVcIiA9PiBcInVzZXJcIlxyXG4gICAgY29uc3QgZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgPSBmaWVsZE5hbWUuaW5kZXhPZignLicpID8gZmllbGROYW1lLnN1YnN0cmluZygwLCBmaWVsZE5hbWUuaW5kZXhPZignLicpKSA6ICcnO1xyXG4gICAgY29uc3QgdmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUoc3RhdGUpO1xyXG4gICAgaXRlbVtmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCB8fCBmaWVsZE5hbWVdID0gKHZhbGlkYXRpb24gJiYgdmFsaWRhdGlvbi52YWxpZCkgPyBzdGF0ZSA6ICcnO1xyXG4gIH1cclxuXHJcbiAgaXNWYWx1ZUNoYW5nZWQoKSB7XHJcbiAgICBjb25zdCBlbG1WYWx1ZSA9IHRoaXMuJGlucHV0LnZhbCgpO1xyXG4gICAgY29uc3QgdmFsdWUgPSBpc05hTihlbG1WYWx1ZSkgPyBlbG1WYWx1ZSA6IHBhcnNlSW50KGVsbVZhbHVlLCAxMCk7XHJcbiAgICBjb25zdCBsYXN0RXZlbnQgPSB0aGlzLl9sYXN0SW5wdXRFdmVudCAmJiB0aGlzLl9sYXN0SW5wdXRFdmVudC5rZXlDb2RlO1xyXG5cclxuICAgIGlmICh0aGlzLmNvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkVkaXRvci5hbHdheXNTYXZlT25FbnRlcktleSAmJiBsYXN0RXZlbnQgPT09IEtleUNvZGUuRU5URVIpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKCEodmFsdWUgPT09ICcnICYmIHRoaXMuZGVmYXVsdFZhbHVlID09PSBudWxsICYmIGxhc3RFdmVudCAhPT0gS2V5Q29kZS5FTlRFUikpICYmICh2YWx1ZSAhPT0gdGhpcy5kZWZhdWx0VmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZSgpIHtcclxuICAgIGNvbnN0IHZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKCk7XHJcbiAgICBpZiAodmFsaWRhdGlvbiAmJiB2YWxpZGF0aW9uLnZhbGlkKSB7XHJcbiAgICAgIGlmICh0aGlzLmhhc0F1dG9Db21taXRFZGl0KSB7XHJcbiAgICAgICAgdGhpcy5hcmdzLmdyaWQuZ2V0RWRpdG9yTG9jaygpLmNvbW1pdEN1cnJlbnRFZGl0KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5hcmdzLmNvbW1pdENoYW5nZXMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGUoaW5wdXRWYWx1ZT86IGFueSk6IEVkaXRvclZhbGlkYXRvck91dHB1dCB7XHJcbiAgICBjb25zdCBlbG1WYWx1ZSA9IChpbnB1dFZhbHVlICE9PSB1bmRlZmluZWQpID8gaW5wdXRWYWx1ZSA6IHRoaXMuJGlucHV0ICYmIHRoaXMuJGlucHV0LnZhbCAmJiB0aGlzLiRpbnB1dC52YWwoKTtcclxuICAgIGNvbnN0IGludE51bWJlciA9ICFpc05hTihlbG1WYWx1ZSBhcyBudW1iZXIpID8gcGFyc2VJbnQoZWxtVmFsdWUsIDEwKSA6IG51bGw7XHJcbiAgICBjb25zdCBlcnJvck1zZyA9IHRoaXMuY29sdW1uRWRpdG9yLmVycm9yTWVzc2FnZTtcclxuICAgIGNvbnN0IGlzUmVxdWlyZWQgPSB0aGlzLmNvbHVtbkVkaXRvci5yZXF1aXJlZDtcclxuICAgIGNvbnN0IG1pblZhbHVlID0gdGhpcy5jb2x1bW5FZGl0b3IubWluVmFsdWU7XHJcbiAgICBjb25zdCBtYXhWYWx1ZSA9IHRoaXMuY29sdW1uRWRpdG9yLm1heFZhbHVlO1xyXG4gICAgY29uc3QgbWFwVmFsaWRhdGlvbiA9IHtcclxuICAgICAgJ3t7bWluVmFsdWV9fSc6IG1pblZhbHVlLFxyXG4gICAgICAne3ttYXhWYWx1ZX19JzogbWF4VmFsdWVcclxuICAgIH07XHJcbiAgICBsZXQgaXNWYWxpZCA9IHRydWU7XHJcbiAgICBsZXQgb3V0cHV0TXNnID0gJyc7XHJcblxyXG4gICAgaWYgKHRoaXMudmFsaWRhdG9yKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcihlbG1WYWx1ZSwgdGhpcy5hcmdzKTtcclxuICAgIH0gZWxzZSBpZiAoaXNSZXF1aXJlZCAmJiBlbG1WYWx1ZSA9PT0gJycpIHtcclxuICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICBvdXRwdXRNc2cgPSBlcnJvck1zZyB8fCBDb25zdGFudHMuVkFMSURBVElPTl9SRVFVSVJFRF9GSUVMRDtcclxuICAgIH0gZWxzZSBpZiAoaXNOYU4oZWxtVmFsdWUgYXMgbnVtYmVyKSB8fCAhL15bKy1dP1xcZCskLy50ZXN0KGVsbVZhbHVlKSkge1xyXG4gICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgIG91dHB1dE1zZyA9IGVycm9yTXNnIHx8IENvbnN0YW50cy5WQUxJREFUSU9OX0VESVRPUl9WQUxJRF9JTlRFR0VSO1xyXG4gICAgfSBlbHNlIGlmIChtaW5WYWx1ZSAhPT0gdW5kZWZpbmVkICYmIG1heFZhbHVlICE9PSB1bmRlZmluZWQgJiYgaW50TnVtYmVyICE9PSBudWxsICYmIChpbnROdW1iZXIgPCBtaW5WYWx1ZSB8fCBpbnROdW1iZXIgPiBtYXhWYWx1ZSkpIHtcclxuICAgICAgLy8gTUlOICYgTUFYIFZhbHVlcyBwcm92aWRlZFxyXG4gICAgICAvLyB3aGVuIGRlY2ltYWwgdmFsdWUgaXMgYmlnZ2VyIHRoYW4gMCwgd2Ugb25seSBhY2NlcHQgdGhlIGRlY2ltYWwgdmFsdWVzIGFzIHRoYXQgdmFsdWUgc2V0XHJcbiAgICAgIC8vIGZvciBleGFtcGxlIGlmIHdlIHNldCBkZWNpbWFsUGxhY2VzIHRvIDIsIHdlIHdpbGwgb25seSBhY2NlcHQgbnVtYmVycyBiZXR3ZWVuIDAgYW5kIDIgZGVjaW1hbHNcclxuICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICBvdXRwdXRNc2cgPSBlcnJvck1zZyB8fCBDb25zdGFudHMuVkFMSURBVElPTl9FRElUT1JfSU5URUdFUl9CRVRXRUVOLnJlcGxhY2UoL3t7bWluVmFsdWV9fXx7e21heFZhbHVlfX0vZ2ksIChtYXRjaGVkKSA9PiBtYXBWYWxpZGF0aW9uW21hdGNoZWRdKTtcclxuICAgIH0gZWxzZSBpZiAobWluVmFsdWUgIT09IHVuZGVmaW5lZCAmJiBpbnROdW1iZXIgIT09IG51bGwgJiYgaW50TnVtYmVyIDw9IG1pblZhbHVlKSB7XHJcbiAgICAgIC8vIE1JTiBWQUxVRSBPTkxZXHJcbiAgICAgIC8vIHdoZW4gZGVjaW1hbCB2YWx1ZSBpcyBiaWdnZXIgdGhhbiAwLCB3ZSBvbmx5IGFjY2VwdCB0aGUgZGVjaW1hbCB2YWx1ZXMgYXMgdGhhdCB2YWx1ZSBzZXRcclxuICAgICAgLy8gZm9yIGV4YW1wbGUgaWYgd2Ugc2V0IGRlY2ltYWxQbGFjZXMgdG8gMiwgd2Ugd2lsbCBvbmx5IGFjY2VwdCBudW1iZXJzIGJldHdlZW4gMCBhbmQgMiBkZWNpbWFsc1xyXG4gICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgIG91dHB1dE1zZyA9IGVycm9yTXNnIHx8IENvbnN0YW50cy5WQUxJREFUSU9OX0VESVRPUl9JTlRFR0VSX01JTi5yZXBsYWNlKC97e21pblZhbHVlfX0vZ2ksIChtYXRjaGVkKSA9PiBtYXBWYWxpZGF0aW9uW21hdGNoZWRdKTtcclxuICAgIH0gZWxzZSBpZiAobWF4VmFsdWUgIT09IHVuZGVmaW5lZCAmJiBpbnROdW1iZXIgIT09IG51bGwgJiYgaW50TnVtYmVyID49IG1heFZhbHVlKSB7XHJcbiAgICAgIC8vIE1BWCBWQUxVRSBPTkxZXHJcbiAgICAgIC8vIHdoZW4gZGVjaW1hbCB2YWx1ZSBpcyBiaWdnZXIgdGhhbiAwLCB3ZSBvbmx5IGFjY2VwdCB0aGUgZGVjaW1hbCB2YWx1ZXMgYXMgdGhhdCB2YWx1ZSBzZXRcclxuICAgICAgLy8gZm9yIGV4YW1wbGUgaWYgd2Ugc2V0IGRlY2ltYWxQbGFjZXMgdG8gMiwgd2Ugd2lsbCBvbmx5IGFjY2VwdCBudW1iZXJzIGJldHdlZW4gMCBhbmQgMiBkZWNpbWFsc1xyXG4gICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgIG91dHB1dE1zZyA9IGVycm9yTXNnIHx8IENvbnN0YW50cy5WQUxJREFUSU9OX0VESVRPUl9JTlRFR0VSX01BWC5yZXBsYWNlKC97e21heFZhbHVlfX0vZ2ksIChtYXRjaGVkKSA9PiBtYXBWYWxpZGF0aW9uW21hdGNoZWRdKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB2YWxpZDogaXNWYWxpZCxcclxuICAgICAgbXNnOiBvdXRwdXRNc2dcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==