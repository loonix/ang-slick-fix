/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Constants } from '../constants';
import { KeyCode } from './../models/index';
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
var /*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
TextEditor = /** @class */ (function () {
    function TextEditor(args) {
        this.args = args;
        this.init();
    }
    Object.defineProperty(TextEditor.prototype, "columnDef", {
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
    Object.defineProperty(TextEditor.prototype, "columnEditor", {
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
    Object.defineProperty(TextEditor.prototype, "hasAutoCommitEdit", {
        get: /**
         * @return {?}
         */
        function () {
            return this.args.grid.getOptions().autoCommitEdit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextEditor.prototype, "validator", {
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
    TextEditor.prototype.init = /**
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
        this.$input = $("<input type=\"text\" role=\"presentation\"  autocomplete=\"off\" class=\"editor-text editor-" + columnId + "\" placeholder=\"" + placeholder + "\" title=\"" + title + "\" />")
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
    TextEditor.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.$input.off('keydown.nav focusout').remove();
    };
    /**
     * @return {?}
     */
    TextEditor.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.$input.focus();
    };
    /**
     * @return {?}
     */
    TextEditor.prototype.getValue = /**
     * @return {?}
     */
    function () {
        return this.$input.val();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    TextEditor.prototype.setValue = /**
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
    TextEditor.prototype.loadValue = /**
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
            this.defaultValue = item[fieldNameFromComplexObject || fieldName] || '';
            this.$input.val(this.defaultValue);
            this.$input[0].defaultValue = this.defaultValue;
            this.$input.select();
        }
    };
    /**
     * @return {?}
     */
    TextEditor.prototype.serializeValue = /**
     * @return {?}
     */
    function () {
        return this.$input.val();
    };
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    TextEditor.prototype.applyValue = /**
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
    TextEditor.prototype.isValueChanged = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var lastEvent = this._lastInputEvent && this._lastInputEvent.keyCode;
        if (this.columnEditor && this.columnEditor.alwaysSaveOnEnterKey && lastEvent === KeyCode.ENTER) {
            return true;
        }
        return (!(this.$input.val() === '' && this.defaultValue === null)) && (this.$input.val() !== this.defaultValue);
    };
    /**
     * @return {?}
     */
    TextEditor.prototype.save = /**
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
    TextEditor.prototype.validate = /**
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
            /** @type {?} */
            var value = this.$input && this.$input.val && this.$input.val();
            return this.validator(value, this.args);
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
    return TextEditor;
}());
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export { TextEditor };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TextEditor.prototype._lastInputEvent;
    /** @type {?} */
    TextEditor.prototype.$input;
    /** @type {?} */
    TextEditor.prototype.defaultValue;
    /**
     * @type {?}
     * @private
     */
    TextEditor.prototype.args;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dEVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZWRpdG9ycy90ZXh0RWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFBd0UsT0FBTyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7O0FBU2xIOzs7OztJQUtFLG9CQUFvQixJQUFTO1FBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztRQUMzQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBR0Qsc0JBQUksaUNBQVM7UUFEYixtQ0FBbUM7Ozs7O1FBQ25DO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTtJQUdELHNCQUFJLG9DQUFZO1FBRGhCLCtCQUErQjs7Ozs7UUFDL0I7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixJQUFJLEVBQUUsQ0FBQztRQUM1RyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHlDQUFpQjs7OztRQUFyQjtZQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsY0FBYyxDQUFDO1FBQ3BELENBQUM7OztPQUFBO0lBR0Qsc0JBQUksaUNBQVM7UUFEYix3RkFBd0Y7Ozs7O1FBQ3hGO1lBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUNqRSxDQUFDOzs7T0FBQTs7OztJQUVELHlCQUFJOzs7SUFBSjtRQUFB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Q0FBQztTQUNIO1FBRUQsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLElBQUk7U0FDVixDQUFDO0lBQ0osQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQXpJRCxJQXlJQzs7Ozs7Ozs7Ozs7SUF4SUMscUNBQXVDOztJQUN2Qyw0QkFBWTs7SUFDWixrQ0FBa0I7Ozs7O0lBRU4sMEJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgQ29sdW1uLCBDb2x1bW5FZGl0b3IsIEVkaXRvciwgRWRpdG9yVmFsaWRhdG9yLCBFZGl0b3JWYWxpZGF0b3JPdXRwdXQsIEtleUNvZGUgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbi8qXHJcbiAqIEFuIGV4YW1wbGUgb2YgYSAnZGV0YWNoZWQnIGVkaXRvci5cclxuICogS2V5RG93biBldmVudHMgYXJlIGFsc28gaGFuZGxlZCB0byBwcm92aWRlIGhhbmRsaW5nIGZvciBUYWIsIFNoaWZ0LVRhYiwgRXNjIGFuZCBDdHJsLUVudGVyLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRleHRFZGl0b3IgaW1wbGVtZW50cyBFZGl0b3Ige1xyXG4gIHByaXZhdGUgX2xhc3RJbnB1dEV2ZW50OiBLZXlib2FyZEV2ZW50O1xyXG4gICRpbnB1dDogYW55O1xyXG4gIGRlZmF1bHRWYWx1ZTogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFyZ3M6IGFueSkge1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IENvbHVtbiBEZWZpbml0aW9uIG9iamVjdCAqL1xyXG4gIGdldCBjb2x1bW5EZWYoKTogQ29sdW1uIHtcclxuICAgIHJldHVybiB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbHVtbiB8fCB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgQ29sdW1uIEVkaXRvciBvYmplY3QgKi9cclxuICBnZXQgY29sdW1uRWRpdG9yKCk6IENvbHVtbkVkaXRvciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgfHwge307XHJcbiAgfVxyXG5cclxuICBnZXQgaGFzQXV0b0NvbW1pdEVkaXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpLmF1dG9Db21taXRFZGl0O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgVmFsaWRhdG9yIGZ1bmN0aW9uLCBjYW4gYmUgcGFzc2VkIGluIEVkaXRvciBwcm9wZXJ0eSBvciBDb2x1bW4gRGVmaW5pdGlvbiAqL1xyXG4gIGdldCB2YWxpZGF0b3IoKTogRWRpdG9yVmFsaWRhdG9yIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkVkaXRvci52YWxpZGF0b3IgfHwgdGhpcy5jb2x1bW5EZWYudmFsaWRhdG9yO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNvbHVtbklkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XHJcbiAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMuY29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRWRpdG9yLnBsYWNlaG9sZGVyIHx8ICcnO1xyXG4gICAgY29uc3QgdGl0bGUgPSB0aGlzLmNvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkVkaXRvci50aXRsZSB8fCAnJztcclxuXHJcbiAgICB0aGlzLiRpbnB1dCA9ICQoYDxpbnB1dCB0eXBlPVwidGV4dFwiIHJvbGU9XCJwcmVzZW50YXRpb25cIiAgYXV0b2NvbXBsZXRlPVwib2ZmXCIgY2xhc3M9XCJlZGl0b3ItdGV4dCBlZGl0b3ItJHtjb2x1bW5JZH1cIiBwbGFjZWhvbGRlcj1cIiR7cGxhY2Vob2xkZXJ9XCIgdGl0bGU9XCIke3RpdGxlfVwiIC8+YClcclxuICAgICAgLmFwcGVuZFRvKHRoaXMuYXJncy5jb250YWluZXIpXHJcbiAgICAgIC5vbigna2V5ZG93bi5uYXYnLCAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLl9sYXN0SW5wdXRFdmVudCA9IGV2ZW50O1xyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBLZXlDb2RlLkxFRlQgfHwgZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZS5SSUdIVCkge1xyXG4gICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAvLyB0aGUgbGliIGRvZXMgbm90IGdldCB0aGUgZm9jdXMgb3V0IGV2ZW50IGZvciBzb21lIHJlYXNvblxyXG4gICAgLy8gc28gcmVnaXN0ZXIgaXQgaGVyZVxyXG4gICAgaWYgKHRoaXMuaGFzQXV0b0NvbW1pdEVkaXQpIHtcclxuICAgICAgdGhpcy4kaW5wdXQub24oJ2ZvY3Vzb3V0JywgKCkgPT4gdGhpcy5zYXZlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLiRpbnB1dC5mb2N1cygpLnNlbGVjdCgpO1xyXG4gICAgfSwgNTApO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuJGlucHV0Lm9mZigna2V5ZG93bi5uYXYgZm9jdXNvdXQnKS5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIGZvY3VzKCkge1xyXG4gICAgdGhpcy4kaW5wdXQuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIGdldFZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuJGlucHV0LnZhbCgpO1xyXG4gIH1cclxuXHJcbiAgc2V0VmFsdWUodmFsOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuJGlucHV0LnZhbCh2YWwpO1xyXG4gIH1cclxuXHJcbiAgbG9hZFZhbHVlKGl0ZW06IGFueSkge1xyXG4gICAgY29uc3QgZmllbGROYW1lID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmllbGQ7XHJcblxyXG4gICAgLy8gd2hlbiBpdCdzIGEgY29tcGxleCBvYmplY3QsIHRoZW4gcHVsbCB0aGUgb2JqZWN0IG5hbWUgb25seSwgZS5nLjogXCJ1c2VyLmZpcnN0TmFtZVwiID0+IFwidXNlclwiXHJcbiAgICBjb25zdCBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCA9IGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGZpZWxkTmFtZS5pbmRleE9mKCcuJykpIDogJyc7XHJcblxyXG4gICAgaWYgKGl0ZW0gJiYgdGhpcy5jb2x1bW5EZWYgJiYgKGl0ZW0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSB8fCBpdGVtLmhhc093blByb3BlcnR5KGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0KSkpIHtcclxuICAgICAgdGhpcy5kZWZhdWx0VmFsdWUgPSBpdGVtW2ZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0IHx8IGZpZWxkTmFtZV0gfHwgJyc7XHJcbiAgICAgIHRoaXMuJGlucHV0LnZhbCh0aGlzLmRlZmF1bHRWYWx1ZSk7XHJcbiAgICAgIHRoaXMuJGlucHV0WzBdLmRlZmF1bHRWYWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlO1xyXG4gICAgICB0aGlzLiRpbnB1dC5zZWxlY3QoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNlcmlhbGl6ZVZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuJGlucHV0LnZhbCgpO1xyXG4gIH1cclxuXHJcbiAgYXBwbHlWYWx1ZShpdGVtOiBhbnksIHN0YXRlOiBhbnkpIHtcclxuICAgIGNvbnN0IGZpZWxkTmFtZSA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpZWxkO1xyXG4gICAgLy8gd2hlbiBpdCdzIGEgY29tcGxleCBvYmplY3QsIHRoZW4gcHVsbCB0aGUgb2JqZWN0IG5hbWUgb25seSwgZS5nLjogXCJ1c2VyLmZpcnN0TmFtZVwiID0+IFwidXNlclwiXHJcbiAgICBjb25zdCBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCA9IGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGZpZWxkTmFtZS5pbmRleE9mKCcuJykpIDogJyc7XHJcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZShzdGF0ZSk7XHJcbiAgICBpdGVtW2ZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0IHx8IGZpZWxkTmFtZV0gPSAodmFsaWRhdGlvbiAmJiB2YWxpZGF0aW9uLnZhbGlkKSA/IHN0YXRlIDogJyc7XHJcbiAgfVxyXG5cclxuICBpc1ZhbHVlQ2hhbmdlZCgpIHtcclxuICAgIGNvbnN0IGxhc3RFdmVudCA9IHRoaXMuX2xhc3RJbnB1dEV2ZW50ICYmIHRoaXMuX2xhc3RJbnB1dEV2ZW50LmtleUNvZGU7XHJcbiAgICBpZiAodGhpcy5jb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5FZGl0b3IuYWx3YXlzU2F2ZU9uRW50ZXJLZXkgJiYgbGFzdEV2ZW50ID09PSBLZXlDb2RlLkVOVEVSKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICghKHRoaXMuJGlucHV0LnZhbCgpID09PSAnJyAmJiB0aGlzLmRlZmF1bHRWYWx1ZSA9PT0gbnVsbCkpICYmICh0aGlzLiRpbnB1dC52YWwoKSAhPT0gdGhpcy5kZWZhdWx0VmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZSgpIHtcclxuICAgIGNvbnN0IHZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKCk7XHJcbiAgICBpZiAodmFsaWRhdGlvbiAmJiB2YWxpZGF0aW9uLnZhbGlkKSB7XHJcbiAgICAgIGlmICh0aGlzLmhhc0F1dG9Db21taXRFZGl0KSB7XHJcbiAgICAgICAgdGhpcy5hcmdzLmdyaWQuZ2V0RWRpdG9yTG9jaygpLmNvbW1pdEN1cnJlbnRFZGl0KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5hcmdzLmNvbW1pdENoYW5nZXMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGUoaW5wdXRWYWx1ZT86IGFueSk6IEVkaXRvclZhbGlkYXRvck91dHB1dCB7XHJcbiAgICBjb25zdCBpc1JlcXVpcmVkID0gdGhpcy5jb2x1bW5FZGl0b3IucmVxdWlyZWQ7XHJcbiAgICBjb25zdCBlbG1WYWx1ZSA9IChpbnB1dFZhbHVlICE9PSB1bmRlZmluZWQpID8gaW5wdXRWYWx1ZSA6IHRoaXMuJGlucHV0ICYmIHRoaXMuJGlucHV0LnZhbCAmJiB0aGlzLiRpbnB1dC52YWwoKTtcclxuICAgIGNvbnN0IGVycm9yTXNnID0gdGhpcy5jb2x1bW5FZGl0b3IuZXJyb3JNZXNzYWdlO1xyXG5cclxuICAgIGlmICh0aGlzLnZhbGlkYXRvcikge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuJGlucHV0ICYmIHRoaXMuJGlucHV0LnZhbCAmJiB0aGlzLiRpbnB1dC52YWwoKTtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yKHZhbHVlLCB0aGlzLmFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGJ5IGRlZmF1bHQgdGhlIGVkaXRvciBpcyBhbG1vc3QgYWx3YXlzIHZhbGlkIChleGNlcHQgd2hlbiBpdCdzIHJlcXVpcmVkIGJ1dCBub3QgcHJvdmlkZWQpXHJcbiAgICBpZiAoaXNSZXF1aXJlZCAmJiBlbG1WYWx1ZSA9PT0gJycpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB2YWxpZDogZmFsc2UsXHJcbiAgICAgICAgbXNnOiBlcnJvck1zZyB8fCBDb25zdGFudHMuVkFMSURBVElPTl9SRVFVSVJFRF9GSUVMRFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHZhbGlkOiB0cnVlLFxyXG4gICAgICBtc2c6IG51bGxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==