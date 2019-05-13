/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Constants } from '../constants';
import { KeyCode } from './../models/index';
/** @type {?} */
const defaultDecimalPlaces = 0;
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class FloatEditor {
    /**
     * @param {?} args
     */
    constructor(args) {
        this.args = args;
        this.init();
    }
    /**
     * Get Column Definition object
     * @return {?}
     */
    get columnDef() {
        return this.args && this.args.column || {};
    }
    /**
     * Get Column Editor object
     * @return {?}
     */
    get columnEditor() {
        return this.columnDef && this.columnDef.internalColumnEditor || {};
    }
    /**
     * @return {?}
     */
    get hasAutoCommitEdit() {
        return this.args.grid.getOptions().autoCommitEdit;
    }
    /**
     * Get the Validator function, can be passed in Editor property or Column Definition
     * @return {?}
     */
    get validator() {
        return this.columnEditor.validator || this.columnDef.validator;
    }
    /**
     * @return {?}
     */
    init() {
        /** @type {?} */
        const columnId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        const placeholder = this.columnEditor && this.columnEditor.placeholder || '';
        /** @type {?} */
        const title = this.columnEditor && this.columnEditor.title || '';
        this.$input = $(`<input type="number" role="presentation"  autocomplete="off" class="editor-text editor-${columnId}" placeholder="${placeholder}" title="${title}" step="${this.getInputDecimalSteps()}" />`)
            .appendTo(this.args.container)
            .on('keydown.nav', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this._lastInputEvent = event;
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
            () => this.save()));
        }
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.$input.focus().select();
        }), 50);
    }
    /**
     * @return {?}
     */
    destroy() {
        this.$input.off('keydown.nav focusout').remove();
    }
    /**
     * @return {?}
     */
    focus() {
        this.$input.focus();
    }
    /**
     * @return {?}
     */
    getColumnEditor() {
        return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    }
    /**
     * @return {?}
     */
    getDecimalPlaces() {
        // returns the number of fixed decimal places or null
        /** @type {?} */
        let rtn = (this.columnEditor.params && this.columnEditor.params.hasOwnProperty('decimalPlaces')) ? this.columnEditor.params.decimalPlaces : undefined;
        if (rtn === undefined) {
            rtn = defaultDecimalPlaces;
        }
        return (!rtn && rtn !== 0 ? null : rtn);
    }
    /**
     * @return {?}
     */
    getInputDecimalSteps() {
        /** @type {?} */
        const decimals = this.getDecimalPlaces();
        /** @type {?} */
        let zeroString = '';
        for (let i = 1; i < decimals; i++) {
            zeroString += '0';
        }
        if (decimals > 0) {
            return `0.${zeroString}1`;
        }
        return '1';
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        /** @type {?} */
        const fieldName = this.columnDef && this.columnDef.field;
        // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
        /** @type {?} */
        const fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
        if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
            this.defaultValue = item[fieldNameFromComplexObject || fieldName];
            /** @type {?} */
            const decPlaces = this.getDecimalPlaces();
            if (decPlaces !== null
                && (this.defaultValue || this.defaultValue === 0)
                && this.defaultValue.toFixed) {
                this.defaultValue = this.defaultValue.toFixed(decPlaces);
            }
            this.$input.val(this.defaultValue);
            this.$input[0].defaultValue = this.defaultValue;
            this.$input.select();
        }
    }
    /**
     * @return {?}
     */
    serializeValue() {
        /** @type {?} */
        const elmValue = this.$input.val();
        if (elmValue === '' || isNaN(elmValue)) {
            return elmValue;
        }
        /** @type {?} */
        let rtn = parseFloat(elmValue);
        /** @type {?} */
        const decPlaces = this.getDecimalPlaces();
        if (decPlaces !== null
            && (rtn || rtn === 0)
            && rtn.toFixed) {
            rtn = parseFloat(rtn.toFixed(decPlaces));
        }
        return rtn;
    }
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    applyValue(item, state) {
        /** @type {?} */
        const fieldName = this.columnDef && this.columnDef.field;
        // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
        /** @type {?} */
        const fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
        /** @type {?} */
        const validation = this.validate(state);
        item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? state : '';
    }
    /**
     * @return {?}
     */
    isValueChanged() {
        /** @type {?} */
        const elmValue = this.$input.val();
        /** @type {?} */
        const lastEvent = this._lastInputEvent && this._lastInputEvent.keyCode;
        if (this.columnEditor && this.columnEditor.alwaysSaveOnEnterKey && lastEvent === KeyCode.ENTER) {
            return true;
        }
        return (!(elmValue === '' && this.defaultValue === null)) && (elmValue !== this.defaultValue);
    }
    /**
     * @return {?}
     */
    save() {
        /** @type {?} */
        const validation = this.validate();
        if (validation && validation.valid) {
            if (this.hasAutoCommitEdit) {
                this.args.grid.getEditorLock().commitCurrentEdit();
            }
            else {
                this.args.commitChanges();
            }
        }
    }
    /**
     * @param {?=} inputValue
     * @return {?}
     */
    validate(inputValue) {
        /** @type {?} */
        const elmValue = (inputValue !== undefined) ? inputValue : this.$input && this.$input.val && this.$input.val();
        /** @type {?} */
        const floatNumber = !isNaN((/** @type {?} */ (elmValue))) ? parseFloat(elmValue) : null;
        /** @type {?} */
        const decPlaces = this.getDecimalPlaces();
        /** @type {?} */
        const isRequired = this.columnEditor.required;
        /** @type {?} */
        const minValue = this.columnEditor.minValue;
        /** @type {?} */
        const maxValue = this.columnEditor.maxValue;
        /** @type {?} */
        const errorMsg = this.columnEditor.errorMessage;
        /** @type {?} */
        const mapValidation = {
            '{{minValue}}': minValue,
            '{{maxValue}}': maxValue,
            '{{minDecimal}}': 0,
            '{{maxDecimal}}': decPlaces
        };
        /** @type {?} */
        let isValid = true;
        /** @type {?} */
        let outputMsg = '';
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
            (matched) => mapValidation[matched]));
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
            (matched) => mapValidation[matched]));
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
            (matched) => mapValidation[matched]));
        }
        else if ((decPlaces > 0 && !new RegExp(`^(\\d*(\\.)?(\\d){0,${decPlaces}})$`).test(elmValue))) {
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            isValid = false;
            outputMsg = errorMsg || Constants.VALIDATION_EDITOR_DECIMAL_BETWEEN.replace(/{{minDecimal}}|{{maxDecimal}}/gi, (/**
             * @param {?} matched
             * @return {?}
             */
            (matched) => mapValidation[matched]));
        }
        return {
            valid: isValid,
            msg: outputMsg
        };
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRFZGl0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2VkaXRvcnMvZmxvYXRFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUF3RSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7TUFLNUcsb0JBQW9CLEdBQUcsQ0FBQzs7Ozs7QUFNOUIsTUFBTSxPQUFPLFdBQVc7Ozs7SUFLdEIsWUFBb0IsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7UUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFHRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO0lBQzdDLENBQUM7Ozs7O0lBR0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLElBQUksRUFBRSxDQUFDO0lBQ3JFLENBQUM7Ozs7SUFFRCxJQUFJLGlCQUFpQjtRQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLGNBQWMsQ0FBQztJQUNwRCxDQUFDOzs7OztJQUdELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFDakUsQ0FBQzs7OztJQUVELElBQUk7O2NBQ0ksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFOztjQUM5QyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxJ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QUFDO1NBQ3JKO1FBRUQsT0FBTztZQUNMLEtBQUssRUFBRSxPQUFPO1lBQ2QsR0FBRyxFQUFFLFNBQVM7U0FDZixDQUFDO0lBQ0osQ0FBQztDQUNGOzs7Ozs7SUFqTkMsc0NBQXVDOztJQUN2Qyw2QkFBWTs7SUFDWixtQ0FBa0I7Ozs7O0lBRU4sMkJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgQ29sdW1uLCBDb2x1bW5FZGl0b3IsIEVkaXRvciwgRWRpdG9yVmFsaWRhdG9yLCBFZGl0b3JWYWxpZGF0b3JPdXRwdXQsIEtleUNvZGUgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbmNvbnN0IGRlZmF1bHREZWNpbWFsUGxhY2VzID0gMDtcclxuXHJcbi8qXHJcbiAqIEFuIGV4YW1wbGUgb2YgYSAnZGV0YWNoZWQnIGVkaXRvci5cclxuICogS2V5RG93biBldmVudHMgYXJlIGFsc28gaGFuZGxlZCB0byBwcm92aWRlIGhhbmRsaW5nIGZvciBUYWIsIFNoaWZ0LVRhYiwgRXNjIGFuZCBDdHJsLUVudGVyLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZsb2F0RWRpdG9yIGltcGxlbWVudHMgRWRpdG9yIHtcclxuICBwcml2YXRlIF9sYXN0SW5wdXRFdmVudDogS2V5Ym9hcmRFdmVudDtcclxuICAkaW5wdXQ6IGFueTtcclxuICBkZWZhdWx0VmFsdWU6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcmdzOiBhbnkpIHtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBDb2x1bW4gRGVmaW5pdGlvbiBvYmplY3QgKi9cclxuICBnZXQgY29sdW1uRGVmKCk6IENvbHVtbiB7XHJcbiAgICByZXR1cm4gdGhpcy5hcmdzICYmIHRoaXMuYXJncy5jb2x1bW4gfHwge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IENvbHVtbiBFZGl0b3Igb2JqZWN0ICovXHJcbiAgZ2V0IGNvbHVtbkVkaXRvcigpOiBDb2x1bW5FZGl0b3Ige1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGhhc0F1dG9Db21taXRFZGl0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXJncy5ncmlkLmdldE9wdGlvbnMoKS5hdXRvQ29tbWl0RWRpdDtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIFZhbGlkYXRvciBmdW5jdGlvbiwgY2FuIGJlIHBhc3NlZCBpbiBFZGl0b3IgcHJvcGVydHkgb3IgQ29sdW1uIERlZmluaXRpb24gKi9cclxuICBnZXQgdmFsaWRhdG9yKCk6IEVkaXRvclZhbGlkYXRvciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5FZGl0b3IudmFsaWRhdG9yIHx8IHRoaXMuY29sdW1uRGVmLnZhbGlkYXRvcjtcclxuICB9XHJcblxyXG4gIGluaXQoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb2x1bW5JZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xyXG4gICAgY29uc3QgcGxhY2Vob2xkZXIgPSB0aGlzLmNvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkVkaXRvci5wbGFjZWhvbGRlciB8fCAnJztcclxuICAgIGNvbnN0IHRpdGxlID0gdGhpcy5jb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5FZGl0b3IudGl0bGUgfHwgJyc7XHJcblxyXG4gICAgdGhpcy4kaW5wdXQgPSAkKGA8aW5wdXQgdHlwZT1cIm51bWJlclwiIHJvbGU9XCJwcmVzZW50YXRpb25cIiAgYXV0b2NvbXBsZXRlPVwib2ZmXCIgY2xhc3M9XCJlZGl0b3ItdGV4dCBlZGl0b3ItJHtjb2x1bW5JZH1cIiBwbGFjZWhvbGRlcj1cIiR7cGxhY2Vob2xkZXJ9XCIgdGl0bGU9XCIke3RpdGxlfVwiIHN0ZXA9XCIke3RoaXMuZ2V0SW5wdXREZWNpbWFsU3RlcHMoKX1cIiAvPmApXHJcbiAgICAgIC5hcHBlbmRUbyh0aGlzLmFyZ3MuY29udGFpbmVyKVxyXG4gICAgICAub24oJ2tleWRvd24ubmF2JywgKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5fbGFzdElucHV0RXZlbnQgPSBldmVudDtcclxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZS5MRUZUIHx8IGV2ZW50LmtleUNvZGUgPT09IEtleUNvZGUuUklHSFQpIHtcclxuICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgLy8gdGhlIGxpYiBkb2VzIG5vdCBnZXQgdGhlIGZvY3VzIG91dCBldmVudCBmb3Igc29tZSByZWFzb25cclxuICAgIC8vIHNvIHJlZ2lzdGVyIGl0IGhlcmVcclxuICAgIGlmICh0aGlzLmhhc0F1dG9Db21taXRFZGl0KSB7XHJcbiAgICAgIHRoaXMuJGlucHV0Lm9uKCdmb2N1c291dCcsICgpID0+IHRoaXMuc2F2ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy4kaW5wdXQuZm9jdXMoKS5zZWxlY3QoKTtcclxuICAgIH0sIDUwKTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLiRpbnB1dC5vZmYoJ2tleWRvd24ubmF2IGZvY3Vzb3V0JykucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICBmb2N1cygpIHtcclxuICAgIHRoaXMuJGlucHV0LmZvY3VzKCk7XHJcbiAgfVxyXG5cclxuICBnZXRDb2x1bW5FZGl0b3IoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hcmdzICYmIHRoaXMuYXJncy5jb2x1bW4gJiYgdGhpcy5hcmdzLmNvbHVtbi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmFyZ3MuY29sdW1uLmludGVybmFsQ29sdW1uRWRpdG9yO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGVjaW1hbFBsYWNlcygpOiBudW1iZXIge1xyXG4gICAgLy8gcmV0dXJucyB0aGUgbnVtYmVyIG9mIGZpeGVkIGRlY2ltYWwgcGxhY2VzIG9yIG51bGxcclxuICAgIGxldCBydG4gPSAodGhpcy5jb2x1bW5FZGl0b3IucGFyYW1zICYmIHRoaXMuY29sdW1uRWRpdG9yLnBhcmFtcy5oYXNPd25Qcm9wZXJ0eSgnZGVjaW1hbFBsYWNlcycpKSA/IHRoaXMuY29sdW1uRWRpdG9yLnBhcmFtcy5kZWNpbWFsUGxhY2VzIDogdW5kZWZpbmVkO1xyXG5cclxuICAgIGlmIChydG4gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBydG4gPSBkZWZhdWx0RGVjaW1hbFBsYWNlcztcclxuICAgIH1cclxuICAgIHJldHVybiAoIXJ0biAmJiBydG4gIT09IDAgPyBudWxsIDogcnRuKTtcclxuICB9XHJcblxyXG4gIGdldElucHV0RGVjaW1hbFN0ZXBzKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBkZWNpbWFscyA9IHRoaXMuZ2V0RGVjaW1hbFBsYWNlcygpO1xyXG4gICAgbGV0IHplcm9TdHJpbmcgPSAnJztcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgZGVjaW1hbHM7IGkrKykge1xyXG4gICAgICB6ZXJvU3RyaW5nICs9ICcwJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGVjaW1hbHMgPiAwKSB7XHJcbiAgICAgIHJldHVybiBgMC4ke3plcm9TdHJpbmd9MWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJzEnO1xyXG4gIH1cclxuXHJcbiAgbG9hZFZhbHVlKGl0ZW06IGFueSkge1xyXG4gICAgY29uc3QgZmllbGROYW1lID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmllbGQ7XHJcblxyXG4gICAgLy8gd2hlbiBpdCdzIGEgY29tcGxleCBvYmplY3QsIHRoZW4gcHVsbCB0aGUgb2JqZWN0IG5hbWUgb25seSwgZS5nLjogXCJ1c2VyLmZpcnN0TmFtZVwiID0+IFwidXNlclwiXHJcbiAgICBjb25zdCBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCA9IGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGZpZWxkTmFtZS5pbmRleE9mKCcuJykpIDogJyc7XHJcblxyXG4gICAgaWYgKGl0ZW0gJiYgdGhpcy5jb2x1bW5EZWYgJiYgKGl0ZW0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSB8fCBpdGVtLmhhc093blByb3BlcnR5KGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0KSkpIHtcclxuICAgICAgdGhpcy5kZWZhdWx0VmFsdWUgPSBpdGVtW2ZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0IHx8IGZpZWxkTmFtZV07XHJcbiAgICAgIGNvbnN0IGRlY1BsYWNlcyA9IHRoaXMuZ2V0RGVjaW1hbFBsYWNlcygpO1xyXG4gICAgICBpZiAoZGVjUGxhY2VzICE9PSBudWxsXHJcbiAgICAgICAgJiYgKHRoaXMuZGVmYXVsdFZhbHVlIHx8IHRoaXMuZGVmYXVsdFZhbHVlID09PSAwKVxyXG4gICAgICAgICYmIHRoaXMuZGVmYXVsdFZhbHVlLnRvRml4ZWQpIHtcclxuICAgICAgICB0aGlzLmRlZmF1bHRWYWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlLnRvRml4ZWQoZGVjUGxhY2VzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy4kaW5wdXQudmFsKHRoaXMuZGVmYXVsdFZhbHVlKTtcclxuICAgICAgdGhpcy4kaW5wdXRbMF0uZGVmYXVsdFZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWU7XHJcbiAgICAgIHRoaXMuJGlucHV0LnNlbGVjdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2VyaWFsaXplVmFsdWUoKSB7XHJcbiAgICBjb25zdCBlbG1WYWx1ZSA9IHRoaXMuJGlucHV0LnZhbCgpO1xyXG4gICAgaWYgKGVsbVZhbHVlID09PSAnJyB8fCBpc05hTihlbG1WYWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIGVsbVZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBydG4gPSBwYXJzZUZsb2F0KGVsbVZhbHVlKTtcclxuICAgIGNvbnN0IGRlY1BsYWNlcyA9IHRoaXMuZ2V0RGVjaW1hbFBsYWNlcygpO1xyXG4gICAgaWYgKGRlY1BsYWNlcyAhPT0gbnVsbFxyXG4gICAgICAmJiAocnRuIHx8IHJ0biA9PT0gMClcclxuICAgICAgJiYgcnRuLnRvRml4ZWQpIHtcclxuICAgICAgcnRuID0gcGFyc2VGbG9hdChydG4udG9GaXhlZChkZWNQbGFjZXMpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcnRuO1xyXG4gIH1cclxuXHJcbiAgYXBwbHlWYWx1ZShpdGVtOiBhbnksIHN0YXRlOiBhbnkpIHtcclxuICAgIGNvbnN0IGZpZWxkTmFtZSA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpZWxkO1xyXG4gICAgLy8gd2hlbiBpdCdzIGEgY29tcGxleCBvYmplY3QsIHRoZW4gcHVsbCB0aGUgb2JqZWN0IG5hbWUgb25seSwgZS5nLjogXCJ1c2VyLmZpcnN0TmFtZVwiID0+IFwidXNlclwiXHJcbiAgICBjb25zdCBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCA9IGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGZpZWxkTmFtZS5pbmRleE9mKCcuJykpIDogJyc7XHJcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZShzdGF0ZSk7XHJcbiAgICBpdGVtW2ZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0IHx8IGZpZWxkTmFtZV0gPSAodmFsaWRhdGlvbiAmJiB2YWxpZGF0aW9uLnZhbGlkKSA/IHN0YXRlIDogJyc7XHJcbiAgfVxyXG5cclxuICBpc1ZhbHVlQ2hhbmdlZCgpIHtcclxuICAgIGNvbnN0IGVsbVZhbHVlID0gdGhpcy4kaW5wdXQudmFsKCk7XHJcbiAgICBjb25zdCBsYXN0RXZlbnQgPSB0aGlzLl9sYXN0SW5wdXRFdmVudCAmJiB0aGlzLl9sYXN0SW5wdXRFdmVudC5rZXlDb2RlO1xyXG4gICAgaWYgKHRoaXMuY29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRWRpdG9yLmFsd2F5c1NhdmVPbkVudGVyS2V5ICYmIGxhc3RFdmVudCA9PT0gS2V5Q29kZS5FTlRFUikge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiAoIShlbG1WYWx1ZSA9PT0gJycgJiYgdGhpcy5kZWZhdWx0VmFsdWUgPT09IG51bGwpKSAmJiAoZWxtVmFsdWUgIT09IHRoaXMuZGVmYXVsdFZhbHVlKTtcclxuICB9XHJcblxyXG4gIHNhdmUoKSB7XHJcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZSgpO1xyXG4gICAgaWYgKHZhbGlkYXRpb24gJiYgdmFsaWRhdGlvbi52YWxpZCkge1xyXG4gICAgICBpZiAodGhpcy5oYXNBdXRvQ29tbWl0RWRpdCkge1xyXG4gICAgICAgIHRoaXMuYXJncy5ncmlkLmdldEVkaXRvckxvY2soKS5jb21taXRDdXJyZW50RWRpdCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYXJncy5jb21taXRDaGFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhbGlkYXRlKGlucHV0VmFsdWU/OiBhbnkpOiBFZGl0b3JWYWxpZGF0b3JPdXRwdXQge1xyXG4gICAgY29uc3QgZWxtVmFsdWUgPSAoaW5wdXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSA/IGlucHV0VmFsdWUgOiB0aGlzLiRpbnB1dCAmJiB0aGlzLiRpbnB1dC52YWwgJiYgdGhpcy4kaW5wdXQudmFsKCk7XHJcbiAgICBjb25zdCBmbG9hdE51bWJlciA9ICFpc05hTihlbG1WYWx1ZSBhcyBudW1iZXIpID8gcGFyc2VGbG9hdChlbG1WYWx1ZSkgOiBudWxsO1xyXG4gICAgY29uc3QgZGVjUGxhY2VzID0gdGhpcy5nZXREZWNpbWFsUGxhY2VzKCk7XHJcbiAgICBjb25zdCBpc1JlcXVpcmVkID0gdGhpcy5jb2x1bW5FZGl0b3IucmVxdWlyZWQ7XHJcbiAgICBjb25zdCBtaW5WYWx1ZSA9IHRoaXMuY29sdW1uRWRpdG9yLm1pblZhbHVlO1xyXG4gICAgY29uc3QgbWF4VmFsdWUgPSB0aGlzLmNvbHVtbkVkaXRvci5tYXhWYWx1ZTtcclxuICAgIGNvbnN0IGVycm9yTXNnID0gdGhpcy5jb2x1bW5FZGl0b3IuZXJyb3JNZXNzYWdlO1xyXG4gICAgY29uc3QgbWFwVmFsaWRhdGlvbiA9IHtcclxuICAgICAgJ3t7bWluVmFsdWV9fSc6IG1pblZhbHVlLFxyXG4gICAgICAne3ttYXhWYWx1ZX19JzogbWF4VmFsdWUsXHJcbiAgICAgICd7e21pbkRlY2ltYWx9fSc6IDAsXHJcbiAgICAgICd7e21heERlY2ltYWx9fSc6IGRlY1BsYWNlc1xyXG4gICAgfTtcclxuICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcclxuICAgIGxldCBvdXRwdXRNc2cgPSAnJztcclxuXHJcbiAgICBpZiAodGhpcy52YWxpZGF0b3IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yKGVsbVZhbHVlLCB0aGlzLmFyZ3MpO1xyXG4gICAgfSBlbHNlIGlmIChpc1JlcXVpcmVkICYmIGVsbVZhbHVlID09PSAnJykge1xyXG4gICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgIG91dHB1dE1zZyA9IGVycm9yTXNnIHx8IENvbnN0YW50cy5WQUxJREFUSU9OX1JFUVVJUkVEX0ZJRUxEO1xyXG4gICAgfSBlbHNlIGlmIChpc05hTihlbG1WYWx1ZSBhcyBudW1iZXIpIHx8IChkZWNQbGFjZXMgPT09IDAgJiYgIS9eWy0rXT8oXFxkKyhcXC4pPyhcXGQpKikkLy50ZXN0KGVsbVZhbHVlKSkpIHtcclxuICAgICAgLy8gd2hlbiBkZWNpbWFsIHZhbHVlIGlzIDAgKHdoaWNoIGlzIHRoZSBkZWZhdWx0KSwgd2UgYWNjZXB0IDAgb3IgbW9yZSBkZWNpbWFsIHZhbHVlc1xyXG4gICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgIG91dHB1dE1zZyA9IGVycm9yTXNnIHx8IENvbnN0YW50cy5WQUxJREFUSU9OX0VESVRPUl9WQUxJRF9OVU1CRVI7XHJcbiAgICB9IGVsc2UgaWYgKG1pblZhbHVlICE9PSB1bmRlZmluZWQgJiYgbWF4VmFsdWUgIT09IHVuZGVmaW5lZCAmJiBmbG9hdE51bWJlciAhPT0gbnVsbCAmJiAoZmxvYXROdW1iZXIgPCBtaW5WYWx1ZSB8fCBmbG9hdE51bWJlciA+IG1heFZhbHVlKSkge1xyXG4gICAgICAvLyBNSU4gJiBNQVggVmFsdWVzIHByb3ZpZGVkXHJcbiAgICAgIC8vIHdoZW4gZGVjaW1hbCB2YWx1ZSBpcyBiaWdnZXIgdGhhbiAwLCB3ZSBvbmx5IGFjY2VwdCB0aGUgZGVjaW1hbCB2YWx1ZXMgYXMgdGhhdCB2YWx1ZSBzZXRcclxuICAgICAgLy8gZm9yIGV4YW1wbGUgaWYgd2Ugc2V0IGRlY2ltYWxQbGFjZXMgdG8gMiwgd2Ugd2lsbCBvbmx5IGFjY2VwdCBudW1iZXJzIGJldHdlZW4gMCBhbmQgMiBkZWNpbWFsc1xyXG4gICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgIG91dHB1dE1zZyA9IGVycm9yTXNnIHx8IENvbnN0YW50cy5WQUxJREFUSU9OX0VESVRPUl9OVU1CRVJfQkVUV0VFTi5yZXBsYWNlKC97e21pblZhbHVlfX18e3ttYXhWYWx1ZX19L2dpLCAobWF0Y2hlZCkgPT4gbWFwVmFsaWRhdGlvblttYXRjaGVkXSk7XHJcbiAgICB9IGVsc2UgaWYgKG1pblZhbHVlICE9PSB1bmRlZmluZWQgJiYgZmxvYXROdW1iZXIgIT09IG51bGwgJiYgZmxvYXROdW1iZXIgPD0gbWluVmFsdWUpIHtcclxuICAgICAgLy8gTUlOIFZBTFVFIE9OTFlcclxuICAgICAgLy8gd2hlbiBkZWNpbWFsIHZhbHVlIGlzIGJpZ2dlciB0aGFuIDAsIHdlIG9ubHkgYWNjZXB0IHRoZSBkZWNpbWFsIHZhbHVlcyBhcyB0aGF0IHZhbHVlIHNldFxyXG4gICAgICAvLyBmb3IgZXhhbXBsZSBpZiB3ZSBzZXQgZGVjaW1hbFBsYWNlcyB0byAyLCB3ZSB3aWxsIG9ubHkgYWNjZXB0IG51bWJlcnMgYmV0d2VlbiAwIGFuZCAyIGRlY2ltYWxzXHJcbiAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgb3V0cHV0TXNnID0gZXJyb3JNc2cgfHwgQ29uc3RhbnRzLlZBTElEQVRJT05fRURJVE9SX05VTUJFUl9NSU4ucmVwbGFjZSgve3ttaW5WYWx1ZX19L2dpLCAobWF0Y2hlZCkgPT4gbWFwVmFsaWRhdGlvblttYXRjaGVkXSk7XHJcbiAgICB9IGVsc2UgaWYgKG1heFZhbHVlICE9PSB1bmRlZmluZWQgJiYgZmxvYXROdW1iZXIgIT09IG51bGwgJiYgZmxvYXROdW1iZXIgPj0gbWF4VmFsdWUpIHtcclxuICAgICAgLy8gTUFYIFZBTFVFIE9OTFlcclxuICAgICAgLy8gd2hlbiBkZWNpbWFsIHZhbHVlIGlzIGJpZ2dlciB0aGFuIDAsIHdlIG9ubHkgYWNjZXB0IHRoZSBkZWNpbWFsIHZhbHVlcyBhcyB0aGF0IHZhbHVlIHNldFxyXG4gICAgICAvLyBmb3IgZXhhbXBsZSBpZiB3ZSBzZXQgZGVjaW1hbFBsYWNlcyB0byAyLCB3ZSB3aWxsIG9ubHkgYWNjZXB0IG51bWJlcnMgYmV0d2VlbiAwIGFuZCAyIGRlY2ltYWxzXHJcbiAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgb3V0cHV0TXNnID0gZXJyb3JNc2cgfHwgQ29uc3RhbnRzLlZBTElEQVRJT05fRURJVE9SX05VTUJFUl9NQVgucmVwbGFjZSgve3ttYXhWYWx1ZX19L2dpLCAobWF0Y2hlZCkgPT4gbWFwVmFsaWRhdGlvblttYXRjaGVkXSk7XHJcbiAgICB9IGVsc2UgaWYgKChkZWNQbGFjZXMgPiAwICYmICFuZXcgUmVnRXhwKGBeKFxcXFxkKihcXFxcLik/KFxcXFxkKXswLCR7ZGVjUGxhY2VzfX0pJGApLnRlc3QoZWxtVmFsdWUpKSkge1xyXG4gICAgICAvLyB3aGVuIGRlY2ltYWwgdmFsdWUgaXMgYmlnZ2VyIHRoYW4gMCwgd2Ugb25seSBhY2NlcHQgdGhlIGRlY2ltYWwgdmFsdWVzIGFzIHRoYXQgdmFsdWUgc2V0XHJcbiAgICAgIC8vIGZvciBleGFtcGxlIGlmIHdlIHNldCBkZWNpbWFsUGxhY2VzIHRvIDIsIHdlIHdpbGwgb25seSBhY2NlcHQgbnVtYmVycyBiZXR3ZWVuIDAgYW5kIDIgZGVjaW1hbHNcclxuICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICBvdXRwdXRNc2cgPSBlcnJvck1zZyB8fCBDb25zdGFudHMuVkFMSURBVElPTl9FRElUT1JfREVDSU1BTF9CRVRXRUVOLnJlcGxhY2UoL3t7bWluRGVjaW1hbH19fHt7bWF4RGVjaW1hbH19L2dpLCAobWF0Y2hlZCkgPT4gbWFwVmFsaWRhdGlvblttYXRjaGVkXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdmFsaWQ6IGlzVmFsaWQsXHJcbiAgICAgIG1zZzogb3V0cHV0TXNnXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=