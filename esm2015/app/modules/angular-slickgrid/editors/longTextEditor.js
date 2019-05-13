/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Constants } from './../constants';
import { KeyCode } from './../models/index';
/*
 * An example of a 'detached' editor.
 * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class LongTextEditor {
    /**
     * @param {?} args
     */
    constructor(args) {
        this.args = args;
        this.gridOptions = (/** @type {?} */ (this.args.grid.getOptions()));
        /** @type {?} */
        const options = this.gridOptions || this.args.column.params || {};
        this._translate = options.i18n;
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
     * Get the Validator function, can be passed in Editor property or Column Definition
     * @return {?}
     */
    get validator() {
        return this.columnEditor.validator || this.columnDef.validator;
    }
    /**
     * @return {?}
     */
    get hasAutoCommitEdit() {
        return this.args.grid.getOptions().autoCommitEdit;
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
        /** @type {?} */
        const cancelText = this._translate && this._translate.instant('CANCEL') || Constants.TEXT_CANCEL;
        /** @type {?} */
        const saveText = this._translate && this._translate.instant('SAVE') || Constants.TEXT_SAVE;
        /** @type {?} */
        const $container = $('body');
        this.$wrapper = $(`<div class="slick-large-editor-text editor-${columnId}" />`).appendTo($container);
        this.$textarea = $(`<textarea hidefocus rows="5" placeholder="${placeholder}" title="${title}">`).appendTo(this.$wrapper);
        // the lib does not get the focus out event for some reason
        // so register it here
        if (this.hasAutoCommitEdit) {
            this.$textarea.on('focusout', (/**
             * @return {?}
             */
            () => this.save()));
        }
        $(`<div class="editor-footer">
          <button class="btn btn-primary btn-xs">${saveText}</button>
          <button class="btn btn-default btn-xs">${cancelText}</button>
      </div>`).appendTo(this.$wrapper);
        this.$wrapper.find('button:first').on('click', (/**
         * @return {?}
         */
        () => this.save()));
        this.$wrapper.find('button:last').on('click', (/**
         * @return {?}
         */
        () => this.cancel()));
        this.$textarea.on('keydown', this.handleKeyDown.bind(this));
        this.position(this.args && this.args.position);
        this.$textarea.focus().select();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeyDown(event) {
        if (event.which === KeyCode.ENTER && event.ctrlKey) {
            this.save();
        }
        else if (event.which === KeyCode.ESCAPE) {
            event.preventDefault();
            this.cancel();
        }
        else if (event.which === KeyCode.TAB && event.shiftKey) {
            event.preventDefault();
            if (this.args && this.args.grid) {
                this.args.grid.navigatePrev();
            }
        }
        else if (event.which === KeyCode.TAB) {
            event.preventDefault();
            if (this.args && this.args.grid) {
                this.args.grid.navigateNext();
            }
        }
    }
    /**
     * @return {?}
     */
    cancel() {
        this.$textarea.val(this.defaultValue);
        if (this.args && this.args.cancelChanges) {
            this.args.cancelChanges();
        }
    }
    /**
     * @return {?}
     */
    hide() {
        this.$wrapper.hide();
    }
    /**
     * @return {?}
     */
    show() {
        this.$wrapper.show();
    }
    /**
     * @param {?} position
     * @return {?}
     */
    position(position) {
        this.$wrapper
            .css('top', (position.top || 0) - 5)
            .css('left', (position.left || 0) - 5);
    }
    /**
     * @return {?}
     */
    destroy() {
        this.$wrapper.off('keydown focusout').remove();
    }
    /**
     * @return {?}
     */
    focus() {
        this.$textarea.focus();
    }
    /**
     * @return {?}
     */
    getValue() {
        return this.$textarea.val();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    setValue(val) {
        this.$textarea.val(val);
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
            this.defaultValue = item[fieldNameFromComplexObject || fieldName];
            this.$textarea.val(this.defaultValue);
            this.$textarea.select();
        }
    }
    /**
     * @return {?}
     */
    serializeValue() {
        return this.$textarea.val();
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
        return (!(this.$textarea.val() === '' && this.defaultValue === null)) && (this.$textarea.val() !== this.defaultValue);
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
        else {
            this.args.commitChanges();
        }
    }
    /**
     * @param {?=} inputValue
     * @return {?}
     */
    validate(inputValue) {
        /** @type {?} */
        const isRequired = this.columnEditor.required;
        /** @type {?} */
        const elmValue = (inputValue !== undefined) ? inputValue : this.$textarea && this.$textarea.val && this.$textarea.val();
        /** @type {?} */
        const errorMsg = this.columnEditor.errorMessage;
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
    }
}
if (false) {
    /** @type {?} */
    LongTextEditor.prototype.$textarea;
    /** @type {?} */
    LongTextEditor.prototype.$wrapper;
    /** @type {?} */
    LongTextEditor.prototype.defaultValue;
    /**
     * Grid options
     * @type {?}
     */
    LongTextEditor.prototype.gridOptions;
    /**
     * The translate library
     * @type {?}
     * @private
     */
    LongTextEditor.prototype._translate;
    /**
     * @type {?}
     * @private
     */
    LongTextEditor.prototype.args;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9uZ1RleHRFZGl0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2VkaXRvcnMvbG9uZ1RleHRFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBUUwsT0FBTyxFQUNSLE1BQU0sbUJBQW1CLENBQUM7Ozs7OztBQVUzQixNQUFNLE9BQU8sY0FBYzs7OztJQVd6QixZQUFvQixJQUFTO1FBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLG1CQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFjLENBQUM7O2NBQ3ZELE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFO1FBQ2pFLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUUvQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDOzs7OztJQUdELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDN0MsQ0FBQzs7Ozs7SUFHRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixJQUFJLEVBQUUsQ0FBQztJQUM1RyxDQUFDOzs7OztJQUdELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFT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Ozs7SUFFekIsOEJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7XHJcbiAgQ29sdW1uLFxyXG4gIENvbHVtbkVkaXRvcixcclxuICBFZGl0b3IsXHJcbiAgRWRpdG9yVmFsaWRhdG9yLFxyXG4gIEVkaXRvclZhbGlkYXRvck91dHB1dCxcclxuICBHcmlkT3B0aW9uLFxyXG4gIEh0bWxFbGVtZW50UG9zaXRpb24sXHJcbiAgS2V5Q29kZVxyXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgJDogYW55O1xyXG5cclxuLypcclxuICogQW4gZXhhbXBsZSBvZiBhICdkZXRhY2hlZCcgZWRpdG9yLlxyXG4gKiBUaGUgVUkgaXMgYWRkZWQgb250byBkb2N1bWVudCBCT0RZIGFuZCAucG9zaXRpb24oKSwgLnNob3coKSBhbmQgLmhpZGUoKSBhcmUgaW1wbGVtZW50ZWQuXHJcbiAqIEtleURvd24gZXZlbnRzIGFyZSBhbHNvIGhhbmRsZWQgdG8gcHJvdmlkZSBoYW5kbGluZyBmb3IgVGFiLCBTaGlmdC1UYWIsIEVzYyBhbmQgQ3RybC1FbnRlci5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBMb25nVGV4dEVkaXRvciBpbXBsZW1lbnRzIEVkaXRvciB7XHJcbiAgJHRleHRhcmVhOiBhbnk7XHJcbiAgJHdyYXBwZXI6IGFueTtcclxuICBkZWZhdWx0VmFsdWU6IGFueTtcclxuXHJcbiAgLyoqIEdyaWQgb3B0aW9ucyAqL1xyXG4gIGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uO1xyXG5cclxuICAvKiogVGhlIHRyYW5zbGF0ZSBsaWJyYXJ5ICovXHJcbiAgcHJpdmF0ZSBfdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFyZ3M6IGFueSkge1xyXG4gICAgdGhpcy5ncmlkT3B0aW9ucyA9IHRoaXMuYXJncy5ncmlkLmdldE9wdGlvbnMoKSBhcyBHcmlkT3B0aW9uO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ3JpZE9wdGlvbnMgfHwgdGhpcy5hcmdzLmNvbHVtbi5wYXJhbXMgfHwge307XHJcbiAgICB0aGlzLl90cmFuc2xhdGUgPSBvcHRpb25zLmkxOG47XHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IENvbHVtbiBEZWZpbml0aW9uIG9iamVjdCAqL1xyXG4gIGdldCBjb2x1bW5EZWYoKTogQ29sdW1uIHtcclxuICAgIHJldHVybiB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbHVtbiB8fCB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgQ29sdW1uIEVkaXRvciBvYmplY3QgKi9cclxuICBnZXQgY29sdW1uRWRpdG9yKCk6IENvbHVtbkVkaXRvciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgfHwge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IHRoZSBWYWxpZGF0b3IgZnVuY3Rpb24sIGNhbiBiZSBwYXNzZWQgaW4gRWRpdG9yIHByb3BlcnR5IG9yIENvbHVtbiBEZWZpbml0aW9uICovXHJcbiAgZ2V0IHZhbGlkYXRvcigpOiBFZGl0b3JWYWxpZGF0b3Ige1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRWRpdG9yLnZhbGlkYXRvciB8fCB0aGlzLmNvbHVtbkRlZi52YWxpZGF0b3I7XHJcbiAgfVxyXG5cclxuICBnZXQgaGFzQXV0b0NvbW1pdEVkaXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpLmF1dG9Db21taXRFZGl0O1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNvbHVtbklkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XHJcbiAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMuY29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRWRpdG9yLnBsYWNlaG9sZGVyIHx8ICcnO1xyXG4gICAgY29uc3QgdGl0bGUgPSB0aGlzLmNvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkVkaXRvci50aXRsZSB8fCAnJztcclxuICAgIGNvbnN0IGNhbmNlbFRleHQgPSB0aGlzLl90cmFuc2xhdGUgJiYgdGhpcy5fdHJhbnNsYXRlLmluc3RhbnQoJ0NBTkNFTCcpIHx8IENvbnN0YW50cy5URVhUX0NBTkNFTDtcclxuICAgIGNvbnN0IHNhdmVUZXh0ID0gdGhpcy5fdHJhbnNsYXRlICYmIHRoaXMuX3RyYW5zbGF0ZS5pbnN0YW50KCdTQVZFJykgfHwgQ29uc3RhbnRzLlRFWFRfU0FWRTtcclxuICAgIGNvbnN0ICRjb250YWluZXIgPSAkKCdib2R5Jyk7XHJcblxyXG4gICAgdGhpcy4kd3JhcHBlciA9ICQoYDxkaXYgY2xhc3M9XCJzbGljay1sYXJnZS1lZGl0b3ItdGV4dCBlZGl0b3ItJHtjb2x1bW5JZH1cIiAvPmApLmFwcGVuZFRvKCRjb250YWluZXIpO1xyXG4gICAgdGhpcy4kdGV4dGFyZWEgPSAkKGA8dGV4dGFyZWEgaGlkZWZvY3VzIHJvd3M9XCI1XCIgcGxhY2Vob2xkZXI9XCIke3BsYWNlaG9sZGVyfVwiIHRpdGxlPVwiJHt0aXRsZX1cIj5gKS5hcHBlbmRUbyh0aGlzLiR3cmFwcGVyKTtcclxuXHJcbiAgICAvLyB0aGUgbGliIGRvZXMgbm90IGdldCB0aGUgZm9jdXMgb3V0IGV2ZW50IGZvciBzb21lIHJlYXNvblxyXG4gICAgLy8gc28gcmVnaXN0ZXIgaXQgaGVyZVxyXG4gICAgaWYgKHRoaXMuaGFzQXV0b0NvbW1pdEVkaXQpIHtcclxuICAgICAgdGhpcy4kdGV4dGFyZWEub24oJ2ZvY3Vzb3V0JywgKCkgPT4gdGhpcy5zYXZlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgICQoYDxkaXYgY2xhc3M9XCJlZGl0b3ItZm9vdGVyXCI+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi14c1wiPiR7c2F2ZVRleHR9PC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi14c1wiPiR7Y2FuY2VsVGV4dH08L2J1dHRvbj5cclxuICAgICAgPC9kaXY+YCkuYXBwZW5kVG8odGhpcy4kd3JhcHBlcik7XHJcblxyXG4gICAgdGhpcy4kd3JhcHBlci5maW5kKCdidXR0b246Zmlyc3QnKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLnNhdmUoKSk7XHJcbiAgICB0aGlzLiR3cmFwcGVyLmZpbmQoJ2J1dHRvbjpsYXN0Jykub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5jYW5jZWwoKSk7XHJcbiAgICB0aGlzLiR0ZXh0YXJlYS5vbigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLnBvc2l0aW9uKHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MucG9zaXRpb24pO1xyXG4gICAgdGhpcy4kdGV4dGFyZWEuZm9jdXMoKS5zZWxlY3QoKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIGlmIChldmVudC53aGljaCA9PT0gS2V5Q29kZS5FTlRFUiAmJiBldmVudC5jdHJsS2V5KSB7XHJcbiAgICAgIHRoaXMuc2F2ZSgpO1xyXG4gICAgfSBlbHNlIGlmIChldmVudC53aGljaCA9PT0gS2V5Q29kZS5FU0NBUEUpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdGhpcy5jYW5jZWwoKTtcclxuICAgIH0gZWxzZSBpZiAoZXZlbnQud2hpY2ggPT09IEtleUNvZGUuVEFCICYmIGV2ZW50LnNoaWZ0S2V5KSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGlmICh0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmdyaWQpIHtcclxuICAgICAgICB0aGlzLmFyZ3MuZ3JpZC5uYXZpZ2F0ZVByZXYoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChldmVudC53aGljaCA9PT0gS2V5Q29kZS5UQUIpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgaWYgKHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuZ3JpZCkge1xyXG4gICAgICAgIHRoaXMuYXJncy5ncmlkLm5hdmlnYXRlTmV4dCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjYW5jZWwoKSB7XHJcbiAgICB0aGlzLiR0ZXh0YXJlYS52YWwodGhpcy5kZWZhdWx0VmFsdWUpO1xyXG4gICAgaWYgKHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuY2FuY2VsQ2hhbmdlcykge1xyXG4gICAgICB0aGlzLmFyZ3MuY2FuY2VsQ2hhbmdlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGlkZSgpIHtcclxuICAgIHRoaXMuJHdyYXBwZXIuaGlkZSgpO1xyXG4gIH1cclxuXHJcbiAgc2hvdygpIHtcclxuICAgIHRoaXMuJHdyYXBwZXIuc2hvdygpO1xyXG4gIH1cclxuXHJcbiAgcG9zaXRpb24ocG9zaXRpb246IEh0bWxFbGVtZW50UG9zaXRpb24pIHtcclxuICAgIHRoaXMuJHdyYXBwZXJcclxuICAgICAgLmNzcygndG9wJywgKHBvc2l0aW9uLnRvcCB8fCAwKSAtIDUpXHJcbiAgICAgIC5jc3MoJ2xlZnQnLCAocG9zaXRpb24ubGVmdCB8fCAwKSAtIDUpO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuJHdyYXBwZXIub2ZmKCdrZXlkb3duIGZvY3Vzb3V0JykucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICBmb2N1cygpIHtcclxuICAgIHRoaXMuJHRleHRhcmVhLmZvY3VzKCk7XHJcbiAgfVxyXG5cclxuICBnZXRWYWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLiR0ZXh0YXJlYS52YWwoKTtcclxuICB9XHJcblxyXG4gIHNldFZhbHVlKHZhbDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLiR0ZXh0YXJlYS52YWwodmFsKTtcclxuICB9XHJcblxyXG4gIGdldENvbHVtbkVkaXRvcigpIHtcclxuICAgIHJldHVybiB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbHVtbiAmJiB0aGlzLmFyZ3MuY29sdW1uLmludGVybmFsQ29sdW1uRWRpdG9yICYmIHRoaXMuYXJncy5jb2x1bW4uaW50ZXJuYWxDb2x1bW5FZGl0b3I7XHJcbiAgfVxyXG5cclxuICBsb2FkVmFsdWUoaXRlbTogYW55KSB7XHJcbiAgICBjb25zdCBmaWVsZE5hbWUgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWVsZDtcclxuXHJcbiAgICAvLyB3aGVuIGl0J3MgYSBjb21wbGV4IG9iamVjdCwgdGhlbiBwdWxsIHRoZSBvYmplY3QgbmFtZSBvbmx5LCBlLmcuOiBcInVzZXIuZmlyc3ROYW1lXCIgPT4gXCJ1c2VyXCJcclxuICAgIGNvbnN0IGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0ID0gZmllbGROYW1lLmluZGV4T2YoJy4nKSA/IGZpZWxkTmFtZS5zdWJzdHJpbmcoMCwgZmllbGROYW1lLmluZGV4T2YoJy4nKSkgOiAnJztcclxuXHJcbiAgICBpZiAoaXRlbSAmJiB0aGlzLmNvbHVtbkRlZiAmJiAoaXRlbS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWUpIHx8IGl0ZW0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QpKSkge1xyXG4gICAgICB0aGlzLmRlZmF1bHRWYWx1ZSA9IGl0ZW1bZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgfHwgZmllbGROYW1lXTtcclxuICAgICAgdGhpcy4kdGV4dGFyZWEudmFsKHRoaXMuZGVmYXVsdFZhbHVlKTtcclxuICAgICAgdGhpcy4kdGV4dGFyZWEuc2VsZWN0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXJpYWxpemVWYWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLiR0ZXh0YXJlYS52YWwoKTtcclxuICB9XHJcblxyXG4gIGFwcGx5VmFsdWUoaXRlbTogYW55LCBzdGF0ZTogYW55KSB7XHJcbiAgICBjb25zdCBmaWVsZE5hbWUgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWVsZDtcclxuICAgIC8vIHdoZW4gaXQncyBhIGNvbXBsZXggb2JqZWN0LCB0aGVuIHB1bGwgdGhlIG9iamVjdCBuYW1lIG9ubHksIGUuZy46IFwidXNlci5maXJzdE5hbWVcIiA9PiBcInVzZXJcIlxyXG4gICAgY29uc3QgZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgPSBmaWVsZE5hbWUuaW5kZXhPZignLicpID8gZmllbGROYW1lLnN1YnN0cmluZygwLCBmaWVsZE5hbWUuaW5kZXhPZignLicpKSA6ICcnO1xyXG4gICAgY29uc3QgdmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUoc3RhdGUpO1xyXG4gICAgaXRlbVtmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCB8fCBmaWVsZE5hbWVdID0gKHZhbGlkYXRpb24gJiYgdmFsaWRhdGlvbi52YWxpZCkgPyBzdGF0ZSA6ICcnO1xyXG4gIH1cclxuXHJcblxyXG4gIGlzVmFsdWVDaGFuZ2VkKCkge1xyXG4gICAgcmV0dXJuICghKHRoaXMuJHRleHRhcmVhLnZhbCgpID09PSAnJyAmJiB0aGlzLmRlZmF1bHRWYWx1ZSA9PT0gbnVsbCkpICYmICh0aGlzLiR0ZXh0YXJlYS52YWwoKSAhPT0gdGhpcy5kZWZhdWx0VmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZSgpIHtcclxuICAgIGNvbnN0IHZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKCk7XHJcbiAgICBpZiAodmFsaWRhdGlvbiAmJiB2YWxpZGF0aW9uLnZhbGlkKSB7XHJcbiAgICAgIGlmICh0aGlzLmhhc0F1dG9Db21taXRFZGl0KSB7XHJcbiAgICAgICAgdGhpcy5hcmdzLmdyaWQuZ2V0RWRpdG9yTG9jaygpLmNvbW1pdEN1cnJlbnRFZGl0KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5hcmdzLmNvbW1pdENoYW5nZXMoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hcmdzLmNvbW1pdENoYW5nZXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhbGlkYXRlKGlucHV0VmFsdWU/OiBhbnkpOiBFZGl0b3JWYWxpZGF0b3JPdXRwdXQge1xyXG4gICAgY29uc3QgaXNSZXF1aXJlZCA9IHRoaXMuY29sdW1uRWRpdG9yLnJlcXVpcmVkO1xyXG4gICAgY29uc3QgZWxtVmFsdWUgPSAoaW5wdXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSA/IGlucHV0VmFsdWUgOiB0aGlzLiR0ZXh0YXJlYSAmJiB0aGlzLiR0ZXh0YXJlYS52YWwgJiYgdGhpcy4kdGV4dGFyZWEudmFsKCk7XHJcbiAgICBjb25zdCBlcnJvck1zZyA9IHRoaXMuY29sdW1uRWRpdG9yLmVycm9yTWVzc2FnZTtcclxuXHJcbiAgICBpZiAodGhpcy52YWxpZGF0b3IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yKGVsbVZhbHVlLCB0aGlzLmFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGJ5IGRlZmF1bHQgdGhlIGVkaXRvciBpcyBhbG1vc3QgYWx3YXlzIHZhbGlkIChleGNlcHQgd2hlbiBpdCdzIHJlcXVpcmVkIGJ1dCBub3QgcHJvdmlkZWQpXHJcbiAgICBpZiAoaXNSZXF1aXJlZCAmJiBlbG1WYWx1ZSA9PT0gJycpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB2YWxpZDogZmFsc2UsXHJcbiAgICAgICAgbXNnOiBlcnJvck1zZyB8fCBDb25zdGFudHMuVkFMSURBVElPTl9SRVFVSVJFRF9GSUVMRFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHZhbGlkOiB0cnVlLFxyXG4gICAgICBtc2c6IG51bGxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==