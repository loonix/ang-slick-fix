/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Constants } from './../constants';
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
var /*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
CheckboxEditor = /** @class */ (function () {
    function CheckboxEditor(args) {
        this.args = args;
        this.init();
    }
    Object.defineProperty(CheckboxEditor.prototype, "columnDef", {
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
    Object.defineProperty(CheckboxEditor.prototype, "columnEditor", {
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
    Object.defineProperty(CheckboxEditor.prototype, "validator", {
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
    CheckboxEditor.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        var title = this.columnEditor && this.columnEditor.title || '';
        this.$input = $("<input type=\"checkbox\" value=\"true\" class=\"editor-checkbox editor-" + fieldId + "\" title=\"" + title + "\" />");
        this.$input.appendTo(this.args.container);
        this.$input.focus();
        // make the checkbox editor act like a regular checkbox that commit the value on click
        if (this.args.grid.getOptions().autoCommitEdit) {
            this.$input.click((/**
             * @return {?}
             */
            function () { return _this.args.grid.getEditorLock().commitCurrentEdit(); }));
        }
    };
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.$input.remove();
    };
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.$input.focus();
    };
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.hide = /**
     * @return {?}
     */
    function () {
        this.$input.hide();
    };
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.show = /**
     * @return {?}
     */
    function () {
        this.$input.show();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    CheckboxEditor.prototype.loadValue = /**
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
            this.defaultValue = !!item[fieldNameFromComplexObject || fieldName];
            if (this.defaultValue) {
                this.$input.prop('checked', true);
            }
            else {
                this.$input.prop('checked', false);
            }
        }
    };
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.preClick = /**
     * @return {?}
     */
    function () {
        this.$input.prop('checked', !this.$input.prop('checked'));
    };
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.serializeValue = /**
     * @return {?}
     */
    function () {
        return this.$input.prop('checked');
    };
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    CheckboxEditor.prototype.applyValue = /**
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
    CheckboxEditor.prototype.isValueChanged = /**
     * @return {?}
     */
    function () {
        return (this.serializeValue() !== this.defaultValue);
    };
    /**
     * @param {?=} inputValue
     * @return {?}
     */
    CheckboxEditor.prototype.validate = /**
     * @param {?=} inputValue
     * @return {?}
     */
    function (inputValue) {
        /** @type {?} */
        var isRequired = this.columnEditor.required;
        /** @type {?} */
        var isChecked = (inputValue !== undefined) ? inputValue : this.$input && this.$input.prop && this.$input.prop('checked');
        /** @type {?} */
        var errorMsg = this.columnEditor.errorMessage;
        if (this.validator) {
            return this.validator(isChecked, this.args);
        }
        // by default the editor is almost always valid (except when it's required but not provided)
        if (isRequired && !isChecked) {
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
    return CheckboxEditor;
}());
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export { CheckboxEditor };
if (false) {
    /** @type {?} */
    CheckboxEditor.prototype.$input;
    /** @type {?} */
    CheckboxEditor.prototype.defaultValue;
    /**
     * @type {?}
     * @private
     */
    CheckboxEditor.prototype.args;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3hFZGl0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2VkaXRvcnMvY2hlY2tib3hFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFVM0M7Ozs7O0lBSUUsd0JBQW9CLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQzNCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFHRCxzQkFBSSxxQ0FBUztRQURiLG1DQUFtQzs7Ozs7UUFDbkM7WUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQzdDLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksd0NBQVk7UUFEaEIsK0JBQStCOzs7OztRQUMvQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLElBQUksRUFBRSxDQUFDO1FBQzVHLENBQUM7OztPQUFBO0lBR0Qsc0JBQUkscUNBQVM7UUFEYix3RkFBd0Y7Ozs7O1FBQ3hGO1lBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUNqRSxDQUFDOzs7T0FBQTs7OztJQUVELDZCQUFJOzs7SUFBSjtRQUFBLGlCQVlDOztZQVhPLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTs7WUFDN0MsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUksRUFBRTtRQUVo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R0M7Ozs7Ozs7O0lBOUdDLGdDQUFZOztJQUNaLHNDQUFzQjs7Ozs7SUFFViw4QkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IENvbHVtbiwgQ29sdW1uRWRpdG9yLCBFZGl0b3IsIEVkaXRvclZhbGlkYXRvciwgRWRpdG9yVmFsaWRhdG9yT3V0cHV0IH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG4vKlxyXG4gKiBBbiBleGFtcGxlIG9mIGEgJ2RldGFjaGVkJyBlZGl0b3IuXHJcbiAqIEtleURvd24gZXZlbnRzIGFyZSBhbHNvIGhhbmRsZWQgdG8gcHJvdmlkZSBoYW5kbGluZyBmb3IgVGFiLCBTaGlmdC1UYWIsIEVzYyBhbmQgQ3RybC1FbnRlci5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDaGVja2JveEVkaXRvciBpbXBsZW1lbnRzIEVkaXRvciB7XHJcbiAgJGlucHV0OiBhbnk7XHJcbiAgZGVmYXVsdFZhbHVlOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFyZ3M6IGFueSkge1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IENvbHVtbiBEZWZpbml0aW9uIG9iamVjdCAqL1xyXG4gIGdldCBjb2x1bW5EZWYoKTogQ29sdW1uIHtcclxuICAgIHJldHVybiB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbHVtbiB8fCB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgQ29sdW1uIEVkaXRvciBvYmplY3QgKi9cclxuICBnZXQgY29sdW1uRWRpdG9yKCk6IENvbHVtbkVkaXRvciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgfHwge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IHRoZSBWYWxpZGF0b3IgZnVuY3Rpb24sIGNhbiBiZSBwYXNzZWQgaW4gRWRpdG9yIHByb3BlcnR5IG9yIENvbHVtbiBEZWZpbml0aW9uICovXHJcbiAgZ2V0IHZhbGlkYXRvcigpOiBFZGl0b3JWYWxpZGF0b3Ige1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRWRpdG9yLnZhbGlkYXRvciB8fCB0aGlzLmNvbHVtbkRlZi52YWxpZGF0b3I7XHJcbiAgfVxyXG5cclxuICBpbml0KCk6IHZvaWQge1xyXG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xyXG4gICAgY29uc3QgdGl0bGUgPSB0aGlzLmNvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkVkaXRvci50aXRsZSB8fCAnJztcclxuXHJcbiAgICB0aGlzLiRpbnB1dCA9ICQoYDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cInRydWVcIiBjbGFzcz1cImVkaXRvci1jaGVja2JveCBlZGl0b3ItJHtmaWVsZElkfVwiIHRpdGxlPVwiJHt0aXRsZX1cIiAvPmApO1xyXG4gICAgdGhpcy4kaW5wdXQuYXBwZW5kVG8odGhpcy5hcmdzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLiRpbnB1dC5mb2N1cygpO1xyXG5cclxuICAgIC8vIG1ha2UgdGhlIGNoZWNrYm94IGVkaXRvciBhY3QgbGlrZSBhIHJlZ3VsYXIgY2hlY2tib3ggdGhhdCBjb21taXQgdGhlIHZhbHVlIG9uIGNsaWNrXHJcbiAgICBpZiAodGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpLmF1dG9Db21taXRFZGl0KSB7XHJcbiAgICAgIHRoaXMuJGlucHV0LmNsaWNrKCgpID0+IHRoaXMuYXJncy5ncmlkLmdldEVkaXRvckxvY2soKS5jb21taXRDdXJyZW50RWRpdCgpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLiRpbnB1dC5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIGZvY3VzKCk6IHZvaWQge1xyXG4gICAgdGhpcy4kaW5wdXQuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICB0aGlzLiRpbnB1dC5oaWRlKCk7XHJcbiAgfVxyXG5cclxuICBzaG93KCkge1xyXG4gICAgdGhpcy4kaW5wdXQuc2hvdygpO1xyXG4gIH1cclxuXHJcbiAgbG9hZFZhbHVlKGl0ZW06IGFueSkge1xyXG4gICAgY29uc3QgZmllbGROYW1lID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmllbGQ7XHJcblxyXG4gICAgLy8gd2hlbiBpdCdzIGEgY29tcGxleCBvYmplY3QsIHRoZW4gcHVsbCB0aGUgb2JqZWN0IG5hbWUgb25seSwgZS5nLjogXCJ1c2VyLmZpcnN0TmFtZVwiID0+IFwidXNlclwiXHJcbiAgICBjb25zdCBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCA9IGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGZpZWxkTmFtZS5pbmRleE9mKCcuJykpIDogJyc7XHJcblxyXG4gICAgaWYgKGl0ZW0gJiYgdGhpcy5jb2x1bW5EZWYgJiYgKGl0ZW0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSB8fCBpdGVtLmhhc093blByb3BlcnR5KGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0KSkpIHtcclxuICAgICAgdGhpcy5kZWZhdWx0VmFsdWUgPSAhIWl0ZW1bZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgfHwgZmllbGROYW1lXTtcclxuICAgICAgaWYgKHRoaXMuZGVmYXVsdFZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy4kaW5wdXQucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuJGlucHV0LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByZUNsaWNrKCkge1xyXG4gICAgdGhpcy4kaW5wdXQucHJvcCgnY2hlY2tlZCcsICF0aGlzLiRpbnB1dC5wcm9wKCdjaGVja2VkJykpO1xyXG4gIH1cclxuXHJcbiAgc2VyaWFsaXplVmFsdWUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy4kaW5wdXQucHJvcCgnY2hlY2tlZCcpO1xyXG4gIH1cclxuXHJcbiAgYXBwbHlWYWx1ZShpdGVtOiBhbnksIHN0YXRlOiBhbnkpIHtcclxuICAgIGNvbnN0IGZpZWxkTmFtZSA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpZWxkO1xyXG4gICAgLy8gd2hlbiBpdCdzIGEgY29tcGxleCBvYmplY3QsIHRoZW4gcHVsbCB0aGUgb2JqZWN0IG5hbWUgb25seSwgZS5nLjogXCJ1c2VyLmZpcnN0TmFtZVwiID0+IFwidXNlclwiXHJcbiAgICBjb25zdCBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCA9IGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGZpZWxkTmFtZS5pbmRleE9mKCcuJykpIDogJyc7XHJcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZShzdGF0ZSk7XHJcbiAgICBpdGVtW2ZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0IHx8IGZpZWxkTmFtZV0gPSAodmFsaWRhdGlvbiAmJiB2YWxpZGF0aW9uLnZhbGlkKSA/IHN0YXRlIDogJyc7XHJcbiAgfVxyXG5cclxuICBpc1ZhbHVlQ2hhbmdlZCgpIHtcclxuICAgIHJldHVybiAodGhpcy5zZXJpYWxpemVWYWx1ZSgpICE9PSB0aGlzLmRlZmF1bHRWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZShpbnB1dFZhbHVlPzogYW55KTogRWRpdG9yVmFsaWRhdG9yT3V0cHV0IHtcclxuICAgIGNvbnN0IGlzUmVxdWlyZWQgPSB0aGlzLmNvbHVtbkVkaXRvci5yZXF1aXJlZDtcclxuICAgIGNvbnN0IGlzQ2hlY2tlZCA9IChpbnB1dFZhbHVlICE9PSB1bmRlZmluZWQpID8gaW5wdXRWYWx1ZSA6IHRoaXMuJGlucHV0ICYmIHRoaXMuJGlucHV0LnByb3AgJiYgdGhpcy4kaW5wdXQucHJvcCgnY2hlY2tlZCcpO1xyXG4gICAgY29uc3QgZXJyb3JNc2cgPSB0aGlzLmNvbHVtbkVkaXRvci5lcnJvck1lc3NhZ2U7XHJcblxyXG4gICAgaWYgKHRoaXMudmFsaWRhdG9yKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcihpc0NoZWNrZWQsIHRoaXMuYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYnkgZGVmYXVsdCB0aGUgZWRpdG9yIGlzIGFsbW9zdCBhbHdheXMgdmFsaWQgKGV4Y2VwdCB3aGVuIGl0J3MgcmVxdWlyZWQgYnV0IG5vdCBwcm92aWRlZClcclxuICAgIGlmIChpc1JlcXVpcmVkICYmICFpc0NoZWNrZWQpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB2YWxpZDogZmFsc2UsXHJcbiAgICAgICAgbXNnOiBlcnJvck1zZyB8fCBDb25zdGFudHMuVkFMSURBVElPTl9SRVFVSVJFRF9GSUVMRFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHZhbGlkOiB0cnVlLFxyXG4gICAgICBtc2c6IG51bGxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==