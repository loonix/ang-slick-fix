/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Constants } from '../constants';
import { KeyCode } from './../models/index';
/** @type {?} */
var defaultDecimalPlaces = 0;
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
var /*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
FloatEditor = /** @class */ (function () {
    function FloatEditor(args) {
        this.args = args;
        this.init();
    }
    Object.defineProperty(FloatEditor.prototype, "columnDef", {
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
    Object.defineProperty(FloatEditor.prototype, "columnEditor", {
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
    Object.defineProperty(FloatEditor.prototype, "hasAutoCommitEdit", {
        get: /**
         * @return {?}
         */
        function () {
            return this.args.grid.getOptions().autoCommitEdit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FloatEditor.prototype, "validator", {
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
    FloatEditor.prototype.init = /**
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
        this.$input = $("<input type=\"number\" role=\"presentation\"  autocomplete=\"off\" class=\"editor-text editor-" + columnId + "\" placeholder=\"" + placeholder + "\" title=\"" + title + "\" step=\"" + this.getInputDecimalSteps() + "\" />")
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
    FloatEditor.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.$input.off('keydown.nav focusout').remove();
    };
    /**
     * @return {?}
     */
    FloatEditor.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.$input.focus();
    };
    /**
     * @return {?}
     */
    FloatEditor.prototype.getColumnEditor = /**
     * @return {?}
     */
    function () {
        return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    };
    /**
     * @return {?}
     */
    FloatEditor.prototype.getDecimalPlaces = /**
     * @return {?}
     */
    function () {
        // returns the number of fixed decimal places or null
        /** @type {?} */
        var rtn = (this.columnEditor.params && this.columnEditor.params.hasOwnProperty('decimalPlaces')) ? this.columnEditor.params.decimalPlaces : undefined;
        if (rtn === undefined) {
            rtn = defaultDecimalPlaces;
        }
        return (!rtn && rtn !== 0 ? null : rtn);
    };
    /**
     * @return {?}
     */
    FloatEditor.prototype.getInputDecimalSteps = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var decimals = this.getDecimalPlaces();
        /** @type {?} */
        var zeroString = '';
        for (var i = 1; i < decimals; i++) {
            zeroString += '0';
        }
        if (decimals > 0) {
            return "0." + zeroString + "1";
        }
        return '1';
    };
    /**
     * @param {?} item
     * @return {?}
     */
    FloatEditor.prototype.loadValue = /**
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
            this.defaultValue = item[fieldNameFromComplexObject || fieldName];
            /** @type {?} */
            var decPlaces = this.getDecimalPlaces();
            if (decPlaces !== null
                && (this.defaultValue || this.defaultValue === 0)
                && this.defaultValue.toFixed) {
                this.defaultValue = this.defaultValue.toFixed(decPlaces);
            }
            this.$input.val(this.defaultValue);
            this.$input[0].defaultValue = this.defaultValue;
            this.$input.select();
        }
    };
    /**
     * @return {?}
     */
    FloatEditor.prototype.serializeValue = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var elmValue = this.$input.val();
        if (elmValue === '' || isNaN(elmValue)) {
            return elmValue;
        }
        /** @type {?} */
        var rtn = parseFloat(elmValue);
        /** @type {?} */
        var decPlaces = this.getDecimalPlaces();
        if (decPlaces !== null
            && (rtn || rtn === 0)
            && rtn.toFixed) {
            rtn = parseFloat(rtn.toFixed(decPlaces));
        }
        return rtn;
    };
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    FloatEditor.prototype.applyValue = /**
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
    FloatEditor.prototype.isValueChanged = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var elmValue = this.$input.val();
        /** @type {?} */
        var lastEvent = this._lastInputEvent && this._lastInputEvent.keyCode;
        if (this.columnEditor && this.columnEditor.alwaysSaveOnEnterKey && lastEvent === KeyCode.ENTER) {
            return true;
        }
        return (!(elmValue === '' && this.defaultValue === null)) && (elmValue !== this.defaultValue);
    };
    /**
     * @return {?}
     */
    FloatEditor.prototype.save = /**
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
    FloatEditor.prototype.validate = /**
     * @param {?=} inputValue
     * @return {?}
     */
    function (inputValue) {
        /** @type {?} */
        var elmValue = (inputValue !== undefined) ? inputValue : this.$input && this.$input.val && this.$input.val();
        /** @type {?} */
        var floatNumber = !isNaN((/** @type {?} */ (elmValue))) ? parseFloat(elmValue) : null;
        /** @type {?} */
        var decPlaces = this.getDecimalPlaces();
        /** @type {?} */
        var isRequired = this.columnEditor.required;
        /** @type {?} */
        var minValue = this.columnEditor.minValue;
        /** @type {?} */
        var maxValue = this.columnEditor.maxValue;
        /** @type {?} */
        var errorMsg = this.columnEditor.errorMessage;
        /** @type {?} */
        var mapValidation = {
            '{{minValue}}': minValue,
            '{{maxValue}}': maxValue,
            '{{minDecimal}}': 0,
            '{{maxDecimal}}': decPlaces
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
        else if (isNaN((/** @type {?} */ (elmValue))) || (decPlaces === 0 && !/^[-+]?(\d+(\.)?(\d)*)$/.test(elmValue))) {
            // when decimal value is 0 (which is the default), we accept 0 or more decimal values
            isValid = false;
            outputMsg = errorMsg || Constants.VALIDATION_EDITOR_VALID_NUMBER;
        }
        else if (minValue !== undefined && maxValue !== undefined && floatNumber !== null && (floatNumber < minValue || floatNumber > maxValue)) {
            // MIN & MAX Values provided
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            isValid = false;
            outputMsg = errorMsg || Constants.VALIDATION_EDITOR_NUMBER_BETWEEN.replace(/{{minValue}}|{{maxValue}}/gi, (/**
             * @param {?} matched
             * @return {?}
             */
            function (matched) { return mapValidation[matched]; }));
        }
        else if (minValue !== undefined && floatNumber !== null && floatNumber <= minValue) {
            // MIN VALUE ONLY
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            isValid = false;
            outputMsg = errorMsg || Constants.VALIDATION_EDITOR_NUMBER_MIN.replace(/{{minValue}}/gi, (/**
             * @param {?} matched
             * @return {?}
             */
            function (matched) { return mapValidation[matched]; }));
        }
        else if (maxValue !== undefined && floatNumber !== null && floatNumber >= maxValue) {
            // MAX VALUE ONLY
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            isValid = false;
            outputMsg = errorMsg || Constants.VALIDATION_EDITOR_NUMBER_MAX.replace(/{{maxValue}}/gi, (/**
             * @param {?} matched
             * @return {?}
             */
            function (matched) { return mapValidation[matched]; }));
        }
        else if ((decPlaces > 0 && !new RegExp("^(\\d*(\\.)?(\\d){0," + decPlaces + "})$").test(elmValue))) {
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            isValid = false;
            outputMsg = errorMsg || Constants.VALIDATION_EDITOR_DECIMAL_BETWEEN.replace(/{{minDecimal}}|{{maxDecimal}}/gi, (/**
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
    return FloatEditor;
}());
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export { FloatEditor };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FloatEditor.prototype._lastInputEvent;
    /** @type {?} */
    FloatEditor.prototype.$input;
    /** @type {?} */
    FloatEditor.prototype.defaultValue;
    /**
     * @type {?}
     * @private
     */
    FloatEditor.prototype.args;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRFZGl0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2VkaXRvcnMvZmxvYXRFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUF3RSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7SUFLNUcsb0JBQW9CLEdBQUcsQ0FBQzs7Ozs7QUFNOUI7Ozs7O0lBS0UscUJBQW9CLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQzNCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFHRCxzQkFBSSxrQ0FBUztRQURiLG1DQUFtQzs7Ozs7UUFDbkM7WUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQzdDLENBQUM7OztPQUFBO0lBR0Qsc0JBQUkscUNBQVk7UUFEaEIsK0JBQStCOzs7OztRQUMvQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixJQUFJLEVBQUUsQ0FBQztRQUNyRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDBDQUFpQjs7OztRQUFyQjtZQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsY0FBYyxDQUFDO1FBQ3BELENBQUM7OztPQUFBO0lBR0Qsc0JBQUksa0NBQVM7UUFEYix3RkFBd0Y7Ozs7O1FBQ3hGO1lBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUNqRSxDQUFDOzs7T0FBQTs7OztJQUVELDBCQUFJOzs7SUFBSjtRQUFBLGlCQXVC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LENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRTtZQUMvRiwyRkFBMkY7WUFDM0YsaUdBQWlHO1lBQ2pHLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDaEIsU0FBUyxHQUFHLFFBQVEsSUFBSSxTQUFTLENBQUMsaUNBQWlDLENBQUMsT0FBTyxDQUFDLGlDQUFpQzs7OztZQUFFLFVBQUMsT0FBTyxJQUFLLE9BQUEsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUF0QixDQUFzQixFQUFDLENBQUM7U0FDcko7UUFFRCxPQUFPO1lBQ0wsS0FBSyxFQUFFLE9BQU87WUFDZCxHQUFHLEVBQUUsU0FBUztTQUNmLENBQUM7SUFDSixDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBbE5ELElBa05DOzs7Ozs7Ozs7OztJQWpOQyxzQ0FBdUM7O0lBQ3ZDLDZCQUFZOztJQUNaLG1DQUFrQjs7Ozs7SUFFTiwyQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBDb2x1bW4sIENvbHVtbkVkaXRvciwgRWRpdG9yLCBFZGl0b3JWYWxpZGF0b3IsIEVkaXRvclZhbGlkYXRvck91dHB1dCwgS2V5Q29kZSB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgJDogYW55O1xyXG5cclxuY29uc3QgZGVmYXVsdERlY2ltYWxQbGFjZXMgPSAwO1xyXG5cclxuLypcclxuICogQW4gZXhhbXBsZSBvZiBhICdkZXRhY2hlZCcgZWRpdG9yLlxyXG4gKiBLZXlEb3duIGV2ZW50cyBhcmUgYWxzbyBoYW5kbGVkIHRvIHByb3ZpZGUgaGFuZGxpbmcgZm9yIFRhYiwgU2hpZnQtVGFiLCBFc2MgYW5kIEN0cmwtRW50ZXIuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRmxvYXRFZGl0b3IgaW1wbGVtZW50cyBFZGl0b3Ige1xyXG4gIHByaXZhdGUgX2xhc3RJbnB1dEV2ZW50OiBLZXlib2FyZEV2ZW50O1xyXG4gICRpbnB1dDogYW55O1xyXG4gIGRlZmF1bHRWYWx1ZTogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFyZ3M6IGFueSkge1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IENvbHVtbiBEZWZpbml0aW9uIG9iamVjdCAqL1xyXG4gIGdldCBjb2x1bW5EZWYoKTogQ29sdW1uIHtcclxuICAgIHJldHVybiB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbHVtbiB8fCB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgQ29sdW1uIEVkaXRvciBvYmplY3QgKi9cclxuICBnZXQgY29sdW1uRWRpdG9yKCk6IENvbHVtbkVkaXRvciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgfHwge307XHJcbiAgfVxyXG5cclxuICBnZXQgaGFzQXV0b0NvbW1pdEVkaXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpLmF1dG9Db21taXRFZGl0O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgVmFsaWRhdG9yIGZ1bmN0aW9uLCBjYW4gYmUgcGFzc2VkIGluIEVkaXRvciBwcm9wZXJ0eSBvciBDb2x1bW4gRGVmaW5pdGlvbiAqL1xyXG4gIGdldCB2YWxpZGF0b3IoKTogRWRpdG9yVmFsaWRhdG9yIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkVkaXRvci52YWxpZGF0b3IgfHwgdGhpcy5jb2x1bW5EZWYudmFsaWRhdG9yO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNvbHVtbklkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XHJcbiAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMuY29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRWRpdG9yLnBsYWNlaG9sZGVyIHx8ICcnO1xyXG4gICAgY29uc3QgdGl0bGUgPSB0aGlzLmNvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkVkaXRvci50aXRsZSB8fCAnJztcclxuXHJcbiAgICB0aGlzLiRpbnB1dCA9ICQoYDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgcm9sZT1cInByZXNlbnRhdGlvblwiICBhdXRvY29tcGxldGU9XCJvZmZcIiBjbGFzcz1cImVkaXRvci10ZXh0IGVkaXRvci0ke2NvbHVtbklkfVwiIHBsYWNlaG9sZGVyPVwiJHtwbGFjZWhvbGRlcn1cIiB0aXRsZT1cIiR7dGl0bGV9XCIgc3RlcD1cIiR7dGhpcy5nZXRJbnB1dERlY2ltYWxTdGVwcygpfVwiIC8+YClcclxuICAgICAgLmFwcGVuZFRvKHRoaXMuYXJncy5jb250YWluZXIpXHJcbiAgICAgIC5vbigna2V5ZG93bi5uYXYnLCAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLl9sYXN0SW5wdXRFdmVudCA9IGV2ZW50O1xyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBLZXlDb2RlLkxFRlQgfHwgZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZS5SSUdIVCkge1xyXG4gICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAvLyB0aGUgbGliIGRvZXMgbm90IGdldCB0aGUgZm9jdXMgb3V0IGV2ZW50IGZvciBzb21lIHJlYXNvblxyXG4gICAgLy8gc28gcmVnaXN0ZXIgaXQgaGVyZVxyXG4gICAgaWYgKHRoaXMuaGFzQXV0b0NvbW1pdEVkaXQpIHtcclxuICAgICAgdGhpcy4kaW5wdXQub24oJ2ZvY3Vzb3V0JywgKCkgPT4gdGhpcy5zYXZlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLiRpbnB1dC5mb2N1cygpLnNlbGVjdCgpO1xyXG4gICAgfSwgNTApO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuJGlucHV0Lm9mZigna2V5ZG93bi5uYXYgZm9jdXNvdXQnKS5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIGZvY3VzKCkge1xyXG4gICAgdGhpcy4kaW5wdXQuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIGdldENvbHVtbkVkaXRvcigpIHtcclxuICAgIHJldHVybiB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbHVtbiAmJiB0aGlzLmFyZ3MuY29sdW1uLmludGVybmFsQ29sdW1uRWRpdG9yICYmIHRoaXMuYXJncy5jb2x1bW4uaW50ZXJuYWxDb2x1bW5FZGl0b3I7XHJcbiAgfVxyXG5cclxuICBnZXREZWNpbWFsUGxhY2VzKCk6IG51bWJlciB7XHJcbiAgICAvLyByZXR1cm5zIHRoZSBudW1iZXIgb2YgZml4ZWQgZGVjaW1hbCBwbGFjZXMgb3IgbnVsbFxyXG4gICAgbGV0IHJ0biA9ICh0aGlzLmNvbHVtbkVkaXRvci5wYXJhbXMgJiYgdGhpcy5jb2x1bW5FZGl0b3IucGFyYW1zLmhhc093blByb3BlcnR5KCdkZWNpbWFsUGxhY2VzJykpID8gdGhpcy5jb2x1bW5FZGl0b3IucGFyYW1zLmRlY2ltYWxQbGFjZXMgOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgaWYgKHJ0biA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJ0biA9IGRlZmF1bHREZWNpbWFsUGxhY2VzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICghcnRuICYmIHJ0biAhPT0gMCA/IG51bGwgOiBydG4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0SW5wdXREZWNpbWFsU3RlcHMoKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGRlY2ltYWxzID0gdGhpcy5nZXREZWNpbWFsUGxhY2VzKCk7XHJcbiAgICBsZXQgemVyb1N0cmluZyA9ICcnO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBkZWNpbWFsczsgaSsrKSB7XHJcbiAgICAgIHplcm9TdHJpbmcgKz0gJzAnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkZWNpbWFscyA+IDApIHtcclxuICAgICAgcmV0dXJuIGAwLiR7emVyb1N0cmluZ30xYDtcclxuICAgIH1cclxuICAgIHJldHVybiAnMSc7XHJcbiAgfVxyXG5cclxuICBsb2FkVmFsdWUoaXRlbTogYW55KSB7XHJcbiAgICBjb25zdCBmaWVsZE5hbWUgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWVsZDtcclxuXHJcbiAgICAvLyB3aGVuIGl0J3MgYSBjb21wbGV4IG9iamVjdCwgdGhlbiBwdWxsIHRoZSBvYmplY3QgbmFtZSBvbmx5LCBlLmcuOiBcInVzZXIuZmlyc3ROYW1lXCIgPT4gXCJ1c2VyXCJcclxuICAgIGNvbnN0IGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0ID0gZmllbGROYW1lLmluZGV4T2YoJy4nKSA/IGZpZWxkTmFtZS5zdWJzdHJpbmcoMCwgZmllbGROYW1lLmluZGV4T2YoJy4nKSkgOiAnJztcclxuXHJcbiAgICBpZiAoaXRlbSAmJiB0aGlzLmNvbHVtbkRlZiAmJiAoaXRlbS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWUpIHx8IGl0ZW0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QpKSkge1xyXG4gICAgICB0aGlzLmRlZmF1bHRWYWx1ZSA9IGl0ZW1bZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgfHwgZmllbGROYW1lXTtcclxuICAgICAgY29uc3QgZGVjUGxhY2VzID0gdGhpcy5nZXREZWNpbWFsUGxhY2VzKCk7XHJcbiAgICAgIGlmIChkZWNQbGFjZXMgIT09IG51bGxcclxuICAgICAgICAmJiAodGhpcy5kZWZhdWx0VmFsdWUgfHwgdGhpcy5kZWZhdWx0VmFsdWUgPT09IDApXHJcbiAgICAgICAgJiYgdGhpcy5kZWZhdWx0VmFsdWUudG9GaXhlZCkge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdFZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWUudG9GaXhlZChkZWNQbGFjZXMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLiRpbnB1dC52YWwodGhpcy5kZWZhdWx0VmFsdWUpO1xyXG4gICAgICB0aGlzLiRpbnB1dFswXS5kZWZhdWx0VmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZTtcclxuICAgICAgdGhpcy4kaW5wdXQuc2VsZWN0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXJpYWxpemVWYWx1ZSgpIHtcclxuICAgIGNvbnN0IGVsbVZhbHVlID0gdGhpcy4kaW5wdXQudmFsKCk7XHJcbiAgICBpZiAoZWxtVmFsdWUgPT09ICcnIHx8IGlzTmFOKGVsbVZhbHVlKSkge1xyXG4gICAgICByZXR1cm4gZWxtVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJ0biA9IHBhcnNlRmxvYXQoZWxtVmFsdWUpO1xyXG4gICAgY29uc3QgZGVjUGxhY2VzID0gdGhpcy5nZXREZWNpbWFsUGxhY2VzKCk7XHJcbiAgICBpZiAoZGVjUGxhY2VzICE9PSBudWxsXHJcbiAgICAgICYmIChydG4gfHwgcnRuID09PSAwKVxyXG4gICAgICAmJiBydG4udG9GaXhlZCkge1xyXG4gICAgICBydG4gPSBwYXJzZUZsb2F0KHJ0bi50b0ZpeGVkKGRlY1BsYWNlcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBydG47XHJcbiAgfVxyXG5cclxuICBhcHBseVZhbHVlKGl0ZW06IGFueSwgc3RhdGU6IGFueSkge1xyXG4gICAgY29uc3QgZmllbGROYW1lID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmllbGQ7XHJcbiAgICAvLyB3aGVuIGl0J3MgYSBjb21wbGV4IG9iamVjdCwgdGhlbiBwdWxsIHRoZSBvYmplY3QgbmFtZSBvbmx5LCBlLmcuOiBcInVzZXIuZmlyc3ROYW1lXCIgPT4gXCJ1c2VyXCJcclxuICAgIGNvbnN0IGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0ID0gZmllbGROYW1lLmluZGV4T2YoJy4nKSA/IGZpZWxkTmFtZS5zdWJzdHJpbmcoMCwgZmllbGROYW1lLmluZGV4T2YoJy4nKSkgOiAnJztcclxuICAgIGNvbnN0IHZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKHN0YXRlKTtcclxuICAgIGl0ZW1bZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgfHwgZmllbGROYW1lXSA9ICh2YWxpZGF0aW9uICYmIHZhbGlkYXRpb24udmFsaWQpID8gc3RhdGUgOiAnJztcclxuICB9XHJcblxyXG4gIGlzVmFsdWVDaGFuZ2VkKCkge1xyXG4gICAgY29uc3QgZWxtVmFsdWUgPSB0aGlzLiRpbnB1dC52YWwoKTtcclxuICAgIGNvbnN0IGxhc3RFdmVudCA9IHRoaXMuX2xhc3RJbnB1dEV2ZW50ICYmIHRoaXMuX2xhc3RJbnB1dEV2ZW50LmtleUNvZGU7XHJcbiAgICBpZiAodGhpcy5jb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5FZGl0b3IuYWx3YXlzU2F2ZU9uRW50ZXJLZXkgJiYgbGFzdEV2ZW50ID09PSBLZXlDb2RlLkVOVEVSKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICghKGVsbVZhbHVlID09PSAnJyAmJiB0aGlzLmRlZmF1bHRWYWx1ZSA9PT0gbnVsbCkpICYmIChlbG1WYWx1ZSAhPT0gdGhpcy5kZWZhdWx0VmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZSgpIHtcclxuICAgIGNvbnN0IHZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKCk7XHJcbiAgICBpZiAodmFsaWRhdGlvbiAmJiB2YWxpZGF0aW9uLnZhbGlkKSB7XHJcbiAgICAgIGlmICh0aGlzLmhhc0F1dG9Db21taXRFZGl0KSB7XHJcbiAgICAgICAgdGhpcy5hcmdzLmdyaWQuZ2V0RWRpdG9yTG9jaygpLmNvbW1pdEN1cnJlbnRFZGl0KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5hcmdzLmNvbW1pdENoYW5nZXMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGUoaW5wdXRWYWx1ZT86IGFueSk6IEVkaXRvclZhbGlkYXRvck91dHB1dCB7XHJcbiAgICBjb25zdCBlbG1WYWx1ZSA9IChpbnB1dFZhbHVlICE9PSB1bmRlZmluZWQpID8gaW5wdXRWYWx1ZSA6IHRoaXMuJGlucHV0ICYmIHRoaXMuJGlucHV0LnZhbCAmJiB0aGlzLiRpbnB1dC52YWwoKTtcclxuICAgIGNvbnN0IGZsb2F0TnVtYmVyID0gIWlzTmFOKGVsbVZhbHVlIGFzIG51bWJlcikgPyBwYXJzZUZsb2F0KGVsbVZhbHVlKSA6IG51bGw7XHJcbiAgICBjb25zdCBkZWNQbGFjZXMgPSB0aGlzLmdldERlY2ltYWxQbGFjZXMoKTtcclxuICAgIGNvbnN0IGlzUmVxdWlyZWQgPSB0aGlzLmNvbHVtbkVkaXRvci5yZXF1aXJlZDtcclxuICAgIGNvbnN0IG1pblZhbHVlID0gdGhpcy5jb2x1bW5FZGl0b3IubWluVmFsdWU7XHJcbiAgICBjb25zdCBtYXhWYWx1ZSA9IHRoaXMuY29sdW1uRWRpdG9yLm1heFZhbHVlO1xyXG4gICAgY29uc3QgZXJyb3JNc2cgPSB0aGlzLmNvbHVtbkVkaXRvci5lcnJvck1lc3NhZ2U7XHJcbiAgICBjb25zdCBtYXBWYWxpZGF0aW9uID0ge1xyXG4gICAgICAne3ttaW5WYWx1ZX19JzogbWluVmFsdWUsXHJcbiAgICAgICd7e21heFZhbHVlfX0nOiBtYXhWYWx1ZSxcclxuICAgICAgJ3t7bWluRGVjaW1hbH19JzogMCxcclxuICAgICAgJ3t7bWF4RGVjaW1hbH19JzogZGVjUGxhY2VzXHJcbiAgICB9O1xyXG4gICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xyXG4gICAgbGV0IG91dHB1dE1zZyA9ICcnO1xyXG5cclxuICAgIGlmICh0aGlzLnZhbGlkYXRvcikge1xyXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IoZWxtVmFsdWUsIHRoaXMuYXJncyk7XHJcbiAgICB9IGVsc2UgaWYgKGlzUmVxdWlyZWQgJiYgZWxtVmFsdWUgPT09ICcnKSB7XHJcbiAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgb3V0cHV0TXNnID0gZXJyb3JNc2cgfHwgQ29uc3RhbnRzLlZBTElEQVRJT05fUkVRVUlSRURfRklFTEQ7XHJcbiAgICB9IGVsc2UgaWYgKGlzTmFOKGVsbVZhbHVlIGFzIG51bWJlcikgfHwgKGRlY1BsYWNlcyA9PT0gMCAmJiAhL15bLStdPyhcXGQrKFxcLik/KFxcZCkqKSQvLnRlc3QoZWxtVmFsdWUpKSkge1xyXG4gICAgICAvLyB3aGVuIGRlY2ltYWwgdmFsdWUgaXMgMCAod2hpY2ggaXMgdGhlIGRlZmF1bHQpLCB3ZSBhY2NlcHQgMCBvciBtb3JlIGRlY2ltYWwgdmFsdWVzXHJcbiAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgb3V0cHV0TXNnID0gZXJyb3JNc2cgfHwgQ29uc3RhbnRzLlZBTElEQVRJT05fRURJVE9SX1ZBTElEX05VTUJFUjtcclxuICAgIH0gZWxzZSBpZiAobWluVmFsdWUgIT09IHVuZGVmaW5lZCAmJiBtYXhWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIGZsb2F0TnVtYmVyICE9PSBudWxsICYmIChmbG9hdE51bWJlciA8IG1pblZhbHVlIHx8IGZsb2F0TnVtYmVyID4gbWF4VmFsdWUpKSB7XHJcbiAgICAgIC8vIE1JTiAmIE1BWCBWYWx1ZXMgcHJvdmlkZWRcclxuICAgICAgLy8gd2hlbiBkZWNpbWFsIHZhbHVlIGlzIGJpZ2dlciB0aGFuIDAsIHdlIG9ubHkgYWNjZXB0IHRoZSBkZWNpbWFsIHZhbHVlcyBhcyB0aGF0IHZhbHVlIHNldFxyXG4gICAgICAvLyBmb3IgZXhhbXBsZSBpZiB3ZSBzZXQgZGVjaW1hbFBsYWNlcyB0byAyLCB3ZSB3aWxsIG9ubHkgYWNjZXB0IG51bWJlcnMgYmV0d2VlbiAwIGFuZCAyIGRlY2ltYWxzXHJcbiAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgb3V0cHV0TXNnID0gZXJyb3JNc2cgfHwgQ29uc3RhbnRzLlZBTElEQVRJT05fRURJVE9SX05VTUJFUl9CRVRXRUVOLnJlcGxhY2UoL3t7bWluVmFsdWV9fXx7e21heFZhbHVlfX0vZ2ksIChtYXRjaGVkKSA9PiBtYXBWYWxpZGF0aW9uW21hdGNoZWRdKTtcclxuICAgIH0gZWxzZSBpZiAobWluVmFsdWUgIT09IHVuZGVmaW5lZCAmJiBmbG9hdE51bWJlciAhPT0gbnVsbCAmJiBmbG9hdE51bWJlciA8PSBtaW5WYWx1ZSkge1xyXG4gICAgICAvLyBNSU4gVkFMVUUgT05MWVxyXG4gICAgICAvLyB3aGVuIGRlY2ltYWwgdmFsdWUgaXMgYmlnZ2VyIHRoYW4gMCwgd2Ugb25seSBhY2NlcHQgdGhlIGRlY2ltYWwgdmFsdWVzIGFzIHRoYXQgdmFsdWUgc2V0XHJcbiAgICAgIC8vIGZvciBleGFtcGxlIGlmIHdlIHNldCBkZWNpbWFsUGxhY2VzIHRvIDIsIHdlIHdpbGwgb25seSBhY2NlcHQgbnVtYmVycyBiZXR3ZWVuIDAgYW5kIDIgZGVjaW1hbHNcclxuICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICBvdXRwdXRNc2cgPSBlcnJvck1zZyB8fCBDb25zdGFudHMuVkFMSURBVElPTl9FRElUT1JfTlVNQkVSX01JTi5yZXBsYWNlKC97e21pblZhbHVlfX0vZ2ksIChtYXRjaGVkKSA9PiBtYXBWYWxpZGF0aW9uW21hdGNoZWRdKTtcclxuICAgIH0gZWxzZSBpZiAobWF4VmFsdWUgIT09IHVuZGVmaW5lZCAmJiBmbG9hdE51bWJlciAhPT0gbnVsbCAmJiBmbG9hdE51bWJlciA+PSBtYXhWYWx1ZSkge1xyXG4gICAgICAvLyBNQVggVkFMVUUgT05MWVxyXG4gICAgICAvLyB3aGVuIGRlY2ltYWwgdmFsdWUgaXMgYmlnZ2VyIHRoYW4gMCwgd2Ugb25seSBhY2NlcHQgdGhlIGRlY2ltYWwgdmFsdWVzIGFzIHRoYXQgdmFsdWUgc2V0XHJcbiAgICAgIC8vIGZvciBleGFtcGxlIGlmIHdlIHNldCBkZWNpbWFsUGxhY2VzIHRvIDIsIHdlIHdpbGwgb25seSBhY2NlcHQgbnVtYmVycyBiZXR3ZWVuIDAgYW5kIDIgZGVjaW1hbHNcclxuICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICBvdXRwdXRNc2cgPSBlcnJvck1zZyB8fCBDb25zdGFudHMuVkFMSURBVElPTl9FRElUT1JfTlVNQkVSX01BWC5yZXBsYWNlKC97e21heFZhbHVlfX0vZ2ksIChtYXRjaGVkKSA9PiBtYXBWYWxpZGF0aW9uW21hdGNoZWRdKTtcclxuICAgIH0gZWxzZSBpZiAoKGRlY1BsYWNlcyA+IDAgJiYgIW5ldyBSZWdFeHAoYF4oXFxcXGQqKFxcXFwuKT8oXFxcXGQpezAsJHtkZWNQbGFjZXN9fSkkYCkudGVzdChlbG1WYWx1ZSkpKSB7XHJcbiAgICAgIC8vIHdoZW4gZGVjaW1hbCB2YWx1ZSBpcyBiaWdnZXIgdGhhbiAwLCB3ZSBvbmx5IGFjY2VwdCB0aGUgZGVjaW1hbCB2YWx1ZXMgYXMgdGhhdCB2YWx1ZSBzZXRcclxuICAgICAgLy8gZm9yIGV4YW1wbGUgaWYgd2Ugc2V0IGRlY2ltYWxQbGFjZXMgdG8gMiwgd2Ugd2lsbCBvbmx5IGFjY2VwdCBudW1iZXJzIGJldHdlZW4gMCBhbmQgMiBkZWNpbWFsc1xyXG4gICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgIG91dHB1dE1zZyA9IGVycm9yTXNnIHx8IENvbnN0YW50cy5WQUxJREFUSU9OX0VESVRPUl9ERUNJTUFMX0JFVFdFRU4ucmVwbGFjZSgve3ttaW5EZWNpbWFsfX18e3ttYXhEZWNpbWFsfX0vZ2ksIChtYXRjaGVkKSA9PiBtYXBWYWxpZGF0aW9uW21hdGNoZWRdKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB2YWxpZDogaXNWYWxpZCxcclxuICAgICAgbXNnOiBvdXRwdXRNc2dcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==