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
export class IntegerEditor {
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
        return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
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
        this.$input = $(`<input type="number" role="presentation"  autocomplete="off" class="editor-text editor-${columnId}" placeholder="${placeholder}" title="${title}" />`)
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
            this.defaultValue = parseInt(item[fieldNameFromComplexObject || fieldName], 10);
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
        return parseInt(elmValue, 10) || 0;
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
        const value = isNaN(elmValue) ? elmValue : parseInt(elmValue, 10);
        /** @type {?} */
        const lastEvent = this._lastInputEvent && this._lastInputEvent.keyCode;
        if (this.columnEditor && this.columnEditor.alwaysSaveOnEnterKey && lastEvent === KeyCode.ENTER) {
            return true;
        }
        return (!(value === '' && this.defaultValue === null && lastEvent !== KeyCode.ENTER)) && (value !== this.defaultValue);
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
        const intNumber = !isNaN((/** @type {?} */ (elmValue))) ? parseInt(elmValue, 10) : null;
        /** @type {?} */
        const errorMsg = this.columnEditor.errorMessage;
        /** @type {?} */
        const isRequired = this.columnEditor.required;
        /** @type {?} */
        const minValue = this.columnEditor.minValue;
        /** @type {?} */
        const maxValue = this.columnEditor.maxValue;
        /** @type {?} */
        const mapValidation = {
            '{{minValue}}': minValue,
            '{{maxValue}}': maxValue
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
            (matched) => mapValidation[matched]));
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
            (matched) => mapValidation[matched]));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdlckVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZWRpdG9ycy9pbnRlZ2VyRWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUF3RSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7QUFTbEgsTUFBTSxPQUFPLGFBQWE7Ozs7SUFLeEIsWUFBb0IsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7UUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFHRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO0lBQzdDLENBQUM7Ozs7O0lBR0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsSUFBSSxFQUFFLENBQUM7SUFDNUcsQ0FBQzs7OztJQUVELElBQUksaUJBQWlCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsY0FBYyxDQUFDO0lBQ3BELENBQUM7Ozs7O0lBR0QsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUNqRSxDQUFDOzs7O0lBRUQsSUFBSTs7Y0FDSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7O2NBQzlDLFdBQVcsR0FBRyxJQUFJLENB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akIsMkZBQTJGO1lBQzNGLGlHQUFpRztZQUNqRyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ2hCLFNBQVMsR0FBRyxRQUFRLElBQUksU0FBUyxDQUFDLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxnQkFBZ0I7Ozs7WUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFDLENBQUM7U0FDaEk7YUFBTSxJQUFJLFFBQVEsS0FBSyxTQUFTLElBQUksU0FBUyxLQUFLLElBQUksSUFBSSxTQUFTLElBQUksUUFBUSxFQUFFO1lBQ2hGLGlCQUFpQjtZQUNqQiwyRkFBMkY7WUFDM0YsaUdBQWlHO1lBQ2pHLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDaEIsU0FBUyxHQUFHLFFBQVEsSUFBSSxTQUFTLENBQUMsNkJBQTZCLENBQUMsT0FBTyxDQUFDLGdCQUFnQjs7OztZQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQztTQUNoSTtRQUVELE9BQU87WUFDTCxLQUFLLEVBQUUsT0FBTztZQUNkLEdBQUcsRUFBRSxTQUFTO1NBQ2YsQ0FBQztJQUNKLENBQUM7Q0FDRjs7Ozs7O0lBbktDLHdDQUF1Qzs7SUFDdkMsK0JBQVk7O0lBQ1oscUNBQWtCOzs7OztJQUVOLDZCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4vLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgQ29sdW1uLCBDb2x1bW5FZGl0b3IsIEVkaXRvciwgRWRpdG9yVmFsaWRhdG9yLCBFZGl0b3JWYWxpZGF0b3JPdXRwdXQsIEtleUNvZGUgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbi8qXHJcbiAqIEFuIGV4YW1wbGUgb2YgYSAnZGV0YWNoZWQnIGVkaXRvci5cclxuICogS2V5RG93biBldmVudHMgYXJlIGFsc28gaGFuZGxlZCB0byBwcm92aWRlIGhhbmRsaW5nIGZvciBUYWIsIFNoaWZ0LVRhYiwgRXNjIGFuZCBDdHJsLUVudGVyLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEludGVnZXJFZGl0b3IgaW1wbGVtZW50cyBFZGl0b3Ige1xyXG4gIHByaXZhdGUgX2xhc3RJbnB1dEV2ZW50OiBLZXlib2FyZEV2ZW50O1xyXG4gICRpbnB1dDogYW55O1xyXG4gIGRlZmF1bHRWYWx1ZTogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFyZ3M6IGFueSkge1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IENvbHVtbiBEZWZpbml0aW9uIG9iamVjdCAqL1xyXG4gIGdldCBjb2x1bW5EZWYoKTogQ29sdW1uIHtcclxuICAgIHJldHVybiB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbHVtbiB8fCB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgQ29sdW1uIEVkaXRvciBvYmplY3QgKi9cclxuICBnZXQgY29sdW1uRWRpdG9yKCk6IENvbHVtbkVkaXRvciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgfHwge307XHJcbiAgfVxyXG5cclxuICBnZXQgaGFzQXV0b0NvbW1pdEVkaXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpLmF1dG9Db21taXRFZGl0O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgVmFsaWRhdG9yIGZ1bmN0aW9uLCBjYW4gYmUgcGFzc2VkIGluIEVkaXRvciBwcm9wZXJ0eSBvciBDb2x1bW4gRGVmaW5pdGlvbiAqL1xyXG4gIGdldCB2YWxpZGF0b3IoKTogRWRpdG9yVmFsaWRhdG9yIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkVkaXRvci52YWxpZGF0b3IgfHwgdGhpcy5jb2x1bW5EZWYudmFsaWRhdG9yO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNvbHVtbklkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XHJcbiAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMuY29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRWRpdG9yLnBsYWNlaG9sZGVyIHx8ICcnO1xyXG4gICAgY29uc3QgdGl0bGUgPSB0aGlzLmNvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkVkaXRvci50aXRsZSB8fCAnJztcclxuXHJcbiAgICB0aGlzLiRpbnB1dCA9ICQoYDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgcm9sZT1cInByZXNlbnRhdGlvblwiICBhdXRvY29tcGxldGU9XCJvZmZcIiBjbGFzcz1cImVkaXRvci10ZXh0IGVkaXRvci0ke2NvbHVtbklkfVwiIHBsYWNlaG9sZGVyPVwiJHtwbGFjZWhvbGRlcn1cIiB0aXRsZT1cIiR7dGl0bGV9XCIgLz5gKVxyXG4gICAgICAuYXBwZW5kVG8odGhpcy5hcmdzLmNvbnRhaW5lcilcclxuICAgICAgLm9uKCdrZXlkb3duLm5hdicsIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX2xhc3RJbnB1dEV2ZW50ID0gZXZlbnQ7XHJcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEtleUNvZGUuTEVGVCB8fCBldmVudC5rZXlDb2RlID09PSBLZXlDb2RlLlJJR0hUKSB7XHJcbiAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIC8vIHRoZSBsaWIgZG9lcyBub3QgZ2V0IHRoZSBmb2N1cyBvdXQgZXZlbnQgZm9yIHNvbWUgcmVhc29uXHJcbiAgICAvLyBzbyByZWdpc3RlciBpdCBoZXJlXHJcbiAgICBpZiAodGhpcy5oYXNBdXRvQ29tbWl0RWRpdCkge1xyXG4gICAgICB0aGlzLiRpbnB1dC5vbignZm9jdXNvdXQnLCAoKSA9PiB0aGlzLnNhdmUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuJGlucHV0LmZvY3VzKCkuc2VsZWN0KCk7XHJcbiAgICB9LCA1MCk7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCkge1xyXG4gICAgdGhpcy4kaW5wdXQub2ZmKCdrZXlkb3duLm5hdiBmb2N1c291dCcpLnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgZm9jdXMoKSB7XHJcbiAgICB0aGlzLiRpbnB1dC5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29sdW1uRWRpdG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuY29sdW1uICYmIHRoaXMuYXJncy5jb2x1bW4uaW50ZXJuYWxDb2x1bW5FZGl0b3IgJiYgdGhpcy5hcmdzLmNvbHVtbi5pbnRlcm5hbENvbHVtbkVkaXRvcjtcclxuICB9XHJcblxyXG4gIGxvYWRWYWx1ZShpdGVtOiBhbnkpIHtcclxuICAgIGNvbnN0IGZpZWxkTmFtZSA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpZWxkO1xyXG5cclxuICAgIC8vIHdoZW4gaXQncyBhIGNvbXBsZXggb2JqZWN0LCB0aGVuIHB1bGwgdGhlIG9iamVjdCBuYW1lIG9ubHksIGUuZy46IFwidXNlci5maXJzdE5hbWVcIiA9PiBcInVzZXJcIlxyXG4gICAgY29uc3QgZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgPSBmaWVsZE5hbWUuaW5kZXhPZignLicpID8gZmllbGROYW1lLnN1YnN0cmluZygwLCBmaWVsZE5hbWUuaW5kZXhPZignLicpKSA6ICcnO1xyXG5cclxuICAgIGlmIChpdGVtICYmIHRoaXMuY29sdW1uRGVmICYmIChpdGVtLmhhc093blByb3BlcnR5KGZpZWxkTmFtZSkgfHwgaXRlbS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCkpKSB7XHJcbiAgICAgIHRoaXMuZGVmYXVsdFZhbHVlID0gcGFyc2VJbnQoaXRlbVtmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCB8fCBmaWVsZE5hbWVdLCAxMCk7XHJcbiAgICAgIHRoaXMuJGlucHV0LnZhbCh0aGlzLmRlZmF1bHRWYWx1ZSk7XHJcbiAgICAgIHRoaXMuJGlucHV0WzBdLmRlZmF1bHRWYWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlO1xyXG4gICAgICB0aGlzLiRpbnB1dC5zZWxlY3QoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNlcmlhbGl6ZVZhbHVlKCkge1xyXG4gICAgY29uc3QgZWxtVmFsdWUgPSB0aGlzLiRpbnB1dC52YWwoKTtcclxuICAgIGlmIChlbG1WYWx1ZSA9PT0gJycgfHwgaXNOYU4oZWxtVmFsdWUpKSB7XHJcbiAgICAgIHJldHVybiBlbG1WYWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJzZUludChlbG1WYWx1ZSwgMTApIHx8IDA7XHJcbiAgfVxyXG5cclxuICBhcHBseVZhbHVlKGl0ZW06IGFueSwgc3RhdGU6IGFueSkge1xyXG4gICAgY29uc3QgZmllbGROYW1lID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmllbGQ7XHJcbiAgICAvLyB3aGVuIGl0J3MgYSBjb21wbGV4IG9iamVjdCwgdGhlbiBwdWxsIHRoZSBvYmplY3QgbmFtZSBvbmx5LCBlLmcuOiBcInVzZXIuZmlyc3ROYW1lXCIgPT4gXCJ1c2VyXCJcclxuICAgIGNvbnN0IGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0ID0gZmllbGROYW1lLmluZGV4T2YoJy4nKSA/IGZpZWxkTmFtZS5zdWJzdHJpbmcoMCwgZmllbGROYW1lLmluZGV4T2YoJy4nKSkgOiAnJztcclxuICAgIGNvbnN0IHZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKHN0YXRlKTtcclxuICAgIGl0ZW1bZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgfHwgZmllbGROYW1lXSA9ICh2YWxpZGF0aW9uICYmIHZhbGlkYXRpb24udmFsaWQpID8gc3RhdGUgOiAnJztcclxuICB9XHJcblxyXG4gIGlzVmFsdWVDaGFuZ2VkKCkge1xyXG4gICAgY29uc3QgZWxtVmFsdWUgPSB0aGlzLiRpbnB1dC52YWwoKTtcclxuICAgIGNvbnN0IHZhbHVlID0gaXNOYU4oZWxtVmFsdWUpID8gZWxtVmFsdWUgOiBwYXJzZUludChlbG1WYWx1ZSwgMTApO1xyXG4gICAgY29uc3QgbGFzdEV2ZW50ID0gdGhpcy5fbGFzdElucHV0RXZlbnQgJiYgdGhpcy5fbGFzdElucHV0RXZlbnQua2V5Q29kZTtcclxuXHJcbiAgICBpZiAodGhpcy5jb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5FZGl0b3IuYWx3YXlzU2F2ZU9uRW50ZXJLZXkgJiYgbGFzdEV2ZW50ID09PSBLZXlDb2RlLkVOVEVSKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICghKHZhbHVlID09PSAnJyAmJiB0aGlzLmRlZmF1bHRWYWx1ZSA9PT0gbnVsbCAmJiBsYXN0RXZlbnQgIT09IEtleUNvZGUuRU5URVIpKSAmJiAodmFsdWUgIT09IHRoaXMuZGVmYXVsdFZhbHVlKTtcclxuICB9XHJcblxyXG4gIHNhdmUoKSB7XHJcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZSgpO1xyXG4gICAgaWYgKHZhbGlkYXRpb24gJiYgdmFsaWRhdGlvbi52YWxpZCkge1xyXG4gICAgICBpZiAodGhpcy5oYXNBdXRvQ29tbWl0RWRpdCkge1xyXG4gICAgICAgIHRoaXMuYXJncy5ncmlkLmdldEVkaXRvckxvY2soKS5jb21taXRDdXJyZW50RWRpdCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYXJncy5jb21taXRDaGFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhbGlkYXRlKGlucHV0VmFsdWU/OiBhbnkpOiBFZGl0b3JWYWxpZGF0b3JPdXRwdXQge1xyXG4gICAgY29uc3QgZWxtVmFsdWUgPSAoaW5wdXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSA/IGlucHV0VmFsdWUgOiB0aGlzLiRpbnB1dCAmJiB0aGlzLiRpbnB1dC52YWwgJiYgdGhpcy4kaW5wdXQudmFsKCk7XHJcbiAgICBjb25zdCBpbnROdW1iZXIgPSAhaXNOYU4oZWxtVmFsdWUgYXMgbnVtYmVyKSA/IHBhcnNlSW50KGVsbVZhbHVlLCAxMCkgOiBudWxsO1xyXG4gICAgY29uc3QgZXJyb3JNc2cgPSB0aGlzLmNvbHVtbkVkaXRvci5lcnJvck1lc3NhZ2U7XHJcbiAgICBjb25zdCBpc1JlcXVpcmVkID0gdGhpcy5jb2x1bW5FZGl0b3IucmVxdWlyZWQ7XHJcbiAgICBjb25zdCBtaW5WYWx1ZSA9IHRoaXMuY29sdW1uRWRpdG9yLm1pblZhbHVlO1xyXG4gICAgY29uc3QgbWF4VmFsdWUgPSB0aGlzLmNvbHVtbkVkaXRvci5tYXhWYWx1ZTtcclxuICAgIGNvbnN0IG1hcFZhbGlkYXRpb24gPSB7XHJcbiAgICAgICd7e21pblZhbHVlfX0nOiBtaW5WYWx1ZSxcclxuICAgICAgJ3t7bWF4VmFsdWV9fSc6IG1heFZhbHVlXHJcbiAgICB9O1xyXG4gICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xyXG4gICAgbGV0IG91dHB1dE1zZyA9ICcnO1xyXG5cclxuICAgIGlmICh0aGlzLnZhbGlkYXRvcikge1xyXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IoZWxtVmFsdWUsIHRoaXMuYXJncyk7XHJcbiAgICB9IGVsc2UgaWYgKGlzUmVxdWlyZWQgJiYgZWxtVmFsdWUgPT09ICcnKSB7XHJcbiAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgb3V0cHV0TXNnID0gZXJyb3JNc2cgfHwgQ29uc3RhbnRzLlZBTElEQVRJT05fUkVRVUlSRURfRklFTEQ7XHJcbiAgICB9IGVsc2UgaWYgKGlzTmFOKGVsbVZhbHVlIGFzIG51bWJlcikgfHwgIS9eWystXT9cXGQrJC8udGVzdChlbG1WYWx1ZSkpIHtcclxuICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICBvdXRwdXRNc2cgPSBlcnJvck1zZyB8fCBDb25zdGFudHMuVkFMSURBVElPTl9FRElUT1JfVkFMSURfSU5URUdFUjtcclxuICAgIH0gZWxzZSBpZiAobWluVmFsdWUgIT09IHVuZGVmaW5lZCAmJiBtYXhWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIGludE51bWJlciAhPT0gbnVsbCAmJiAoaW50TnVtYmVyIDwgbWluVmFsdWUgfHwgaW50TnVtYmVyID4gbWF4VmFsdWUpKSB7XHJcbiAgICAgIC8vIE1JTiAmIE1BWCBWYWx1ZXMgcHJvdmlkZWRcclxuICAgICAgLy8gd2hlbiBkZWNpbWFsIHZhbHVlIGlzIGJpZ2dlciB0aGFuIDAsIHdlIG9ubHkgYWNjZXB0IHRoZSBkZWNpbWFsIHZhbHVlcyBhcyB0aGF0IHZhbHVlIHNldFxyXG4gICAgICAvLyBmb3IgZXhhbXBsZSBpZiB3ZSBzZXQgZGVjaW1hbFBsYWNlcyB0byAyLCB3ZSB3aWxsIG9ubHkgYWNjZXB0IG51bWJlcnMgYmV0d2VlbiAwIGFuZCAyIGRlY2ltYWxzXHJcbiAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgb3V0cHV0TXNnID0gZXJyb3JNc2cgfHwgQ29uc3RhbnRzLlZBTElEQVRJT05fRURJVE9SX0lOVEVHRVJfQkVUV0VFTi5yZXBsYWNlKC97e21pblZhbHVlfX18e3ttYXhWYWx1ZX19L2dpLCAobWF0Y2hlZCkgPT4gbWFwVmFsaWRhdGlvblttYXRjaGVkXSk7XHJcbiAgICB9IGVsc2UgaWYgKG1pblZhbHVlICE9PSB1bmRlZmluZWQgJiYgaW50TnVtYmVyICE9PSBudWxsICYmIGludE51bWJlciA8PSBtaW5WYWx1ZSkge1xyXG4gICAgICAvLyBNSU4gVkFMVUUgT05MWVxyXG4gICAgICAvLyB3aGVuIGRlY2ltYWwgdmFsdWUgaXMgYmlnZ2VyIHRoYW4gMCwgd2Ugb25seSBhY2NlcHQgdGhlIGRlY2ltYWwgdmFsdWVzIGFzIHRoYXQgdmFsdWUgc2V0XHJcbiAgICAgIC8vIGZvciBleGFtcGxlIGlmIHdlIHNldCBkZWNpbWFsUGxhY2VzIHRvIDIsIHdlIHdpbGwgb25seSBhY2NlcHQgbnVtYmVycyBiZXR3ZWVuIDAgYW5kIDIgZGVjaW1hbHNcclxuICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICBvdXRwdXRNc2cgPSBlcnJvck1zZyB8fCBDb25zdGFudHMuVkFMSURBVElPTl9FRElUT1JfSU5URUdFUl9NSU4ucmVwbGFjZSgve3ttaW5WYWx1ZX19L2dpLCAobWF0Y2hlZCkgPT4gbWFwVmFsaWRhdGlvblttYXRjaGVkXSk7XHJcbiAgICB9IGVsc2UgaWYgKG1heFZhbHVlICE9PSB1bmRlZmluZWQgJiYgaW50TnVtYmVyICE9PSBudWxsICYmIGludE51bWJlciA+PSBtYXhWYWx1ZSkge1xyXG4gICAgICAvLyBNQVggVkFMVUUgT05MWVxyXG4gICAgICAvLyB3aGVuIGRlY2ltYWwgdmFsdWUgaXMgYmlnZ2VyIHRoYW4gMCwgd2Ugb25seSBhY2NlcHQgdGhlIGRlY2ltYWwgdmFsdWVzIGFzIHRoYXQgdmFsdWUgc2V0XHJcbiAgICAgIC8vIGZvciBleGFtcGxlIGlmIHdlIHNldCBkZWNpbWFsUGxhY2VzIHRvIDIsIHdlIHdpbGwgb25seSBhY2NlcHQgbnVtYmVycyBiZXR3ZWVuIDAgYW5kIDIgZGVjaW1hbHNcclxuICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICBvdXRwdXRNc2cgPSBlcnJvck1zZyB8fCBDb25zdGFudHMuVkFMSURBVElPTl9FRElUT1JfSU5URUdFUl9NQVgucmVwbGFjZSgve3ttYXhWYWx1ZX19L2dpLCAobWF0Y2hlZCkgPT4gbWFwVmFsaWRhdGlvblttYXRjaGVkXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdmFsaWQ6IGlzVmFsaWQsXHJcbiAgICAgIG1zZzogb3V0cHV0TXNnXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=