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
var /*
 * An example of a 'detached' editor.
 * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
LongTextEditor = /** @class */ (function () {
    function LongTextEditor(args) {
        this.args = args;
        this.gridOptions = (/** @type {?} */ (this.args.grid.getOptions()));
        /** @type {?} */
        var options = this.gridOptions || this.args.column.params || {};
        this._translate = options.i18n;
        this.init();
    }
    Object.defineProperty(LongTextEditor.prototype, "columnDef", {
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
    Object.defineProperty(LongTextEditor.prototype, "columnEditor", {
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
    Object.defineProperty(LongTextEditor.prototype, "validator", {
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
    Object.defineProperty(LongTextEditor.prototype, "hasAutoCommitEdit", {
        get: /**
         * @return {?}
         */
        function () {
            return this.args.grid.getOptions().autoCommitEdit;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    LongTextEditor.prototype.init = /**
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
        /** @type {?} */
        var cancelText = this._translate && this._translate.instant('CANCEL') || Constants.TEXT_CANCEL;
        /** @type {?} */
        var saveText = this._translate && this._translate.instant('SAVE') || Constants.TEXT_SAVE;
        /** @type {?} */
        var $container = $('body');
        this.$wrapper = $("<div class=\"slick-large-editor-text editor-" + columnId + "\" />").appendTo($container);
        this.$textarea = $("<textarea hidefocus rows=\"5\" placeholder=\"" + placeholder + "\" title=\"" + title + "\">").appendTo(this.$wrapper);
        // the lib does not get the focus out event for some reason
        // so register it here
        if (this.hasAutoCommitEdit) {
            this.$textarea.on('focusout', (/**
             * @return {?}
             */
            function () { return _this.save(); }));
        }
        $("<div class=\"editor-footer\">\n          <button class=\"btn btn-primary btn-xs\">" + saveText + "</button>\n          <button class=\"btn btn-default btn-xs\">" + cancelText + "</button>\n      </div>").appendTo(this.$wrapper);
        this.$wrapper.find('button:first').on('click', (/**
         * @return {?}
         */
        function () { return _this.save(); }));
        this.$wrapper.find('button:last').on('click', (/**
         * @return {?}
         */
        function () { return _this.cancel(); }));
        this.$textarea.on('keydown', this.handleKeyDown.bind(this));
        this.position(this.args && this.args.position);
        this.$textarea.focus().select();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    LongTextEditor.prototype.handleKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.cancel = /**
     * @return {?}
     */
    function () {
        this.$textarea.val(this.defaultValue);
        if (this.args && this.args.cancelChanges) {
            this.args.cancelChanges();
        }
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.hide = /**
     * @return {?}
     */
    function () {
        this.$wrapper.hide();
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.show = /**
     * @return {?}
     */
    function () {
        this.$wrapper.show();
    };
    /**
     * @param {?} position
     * @return {?}
     */
    LongTextEditor.prototype.position = /**
     * @param {?} position
     * @return {?}
     */
    function (position) {
        this.$wrapper
            .css('top', (position.top || 0) - 5)
            .css('left', (position.left || 0) - 5);
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.$wrapper.off('keydown focusout').remove();
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.$textarea.focus();
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.getValue = /**
     * @return {?}
     */
    function () {
        return this.$textarea.val();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    LongTextEditor.prototype.setValue = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.$textarea.val(val);
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.getColumnEditor = /**
     * @return {?}
     */
    function () {
        return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    LongTextEditor.prototype.loadValue = /**
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
            this.$textarea.val(this.defaultValue);
            this.$textarea.select();
        }
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.serializeValue = /**
     * @return {?}
     */
    function () {
        return this.$textarea.val();
    };
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    LongTextEditor.prototype.applyValue = /**
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
    LongTextEditor.prototype.isValueChanged = /**
     * @return {?}
     */
    function () {
        return (!(this.$textarea.val() === '' && this.defaultValue === null)) && (this.$textarea.val() !== this.defaultValue);
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.save = /**
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
        else {
            this.args.commitChanges();
        }
    };
    /**
     * @param {?=} inputValue
     * @return {?}
     */
    LongTextEditor.prototype.validate = /**
     * @param {?=} inputValue
     * @return {?}
     */
    function (inputValue) {
        /** @type {?} */
        var isRequired = this.columnEditor.required;
        /** @type {?} */
        var elmValue = (inputValue !== undefined) ? inputValue : this.$textarea && this.$textarea.val && this.$textarea.val();
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
    return LongTextEditor;
}());
/*
 * An example of a 'detached' editor.
 * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export { LongTextEditor };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9uZ1RleHRFZGl0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2VkaXRvcnMvbG9uZ1RleHRFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBUUwsT0FBTyxFQUNSLE1BQU0sbUJBQW1CLENBQUM7Ozs7OztBQVUzQjs7Ozs7O0lBV0Usd0JBQW9CLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQWMsQ0FBQzs7WUFDdkQsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUU7UUFDakUsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBRS9CLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFHRCxzQkFBSSxxQ0FBUztRQURiLG1DQUFtQzs7Ozs7UUFDbkM7WUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQzdDLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksd0NBQVk7UUFEaEIsK0JBQStCOzs7OztRQUMvQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLElBQUksRUFBRSxDQUFDO1FBQzVHLENBQUM7OztPQUFBO0lBR0Qsc0JBQUkscUNBQVM7UUFEYix3RkFBd0Y7Ozs7O1FBQ3hGO1lB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QUFLLEVBQUUsRUFBRTtZQUNqQyxPQUFPO2dCQUNMLEtBQUssRUFBRSxLQUFLO2dCQUNaLEdBQUcsRUFBRSxRQUFRLElBQUksU0FBUyxDQUFDLHlCQUF5QjthQUNyRCxDQUFDO1NBQ0g7UUFFRCxPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUsSUFBSTtTQUNWLENBQUM7SUFDSixDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBak1ELElBaU1DOzs7Ozs7Ozs7SUFoTUMsbUNBQWU7O0lBQ2Ysa0NBQWM7O0lBQ2Qsc0NBQWtCOzs7OztJQUdsQixxQ0FBd0I7Ozs7OztJQUd4QixvQ0FBcUM7Ozs7O0lBRXpCLDhCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi8uLi9jb25zdGFudHMnO1xyXG5pbXBvcnQge1xyXG4gIENvbHVtbixcclxuICBDb2x1bW5FZGl0b3IsXHJcbiAgRWRpdG9yLFxyXG4gIEVkaXRvclZhbGlkYXRvcixcclxuICBFZGl0b3JWYWxpZGF0b3JPdXRwdXQsXHJcbiAgR3JpZE9wdGlvbixcclxuICBIdG1sRWxlbWVudFBvc2l0aW9uLFxyXG4gIEtleUNvZGVcclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbi8qXHJcbiAqIEFuIGV4YW1wbGUgb2YgYSAnZGV0YWNoZWQnIGVkaXRvci5cclxuICogVGhlIFVJIGlzIGFkZGVkIG9udG8gZG9jdW1lbnQgQk9EWSBhbmQgLnBvc2l0aW9uKCksIC5zaG93KCkgYW5kIC5oaWRlKCkgYXJlIGltcGxlbWVudGVkLlxyXG4gKiBLZXlEb3duIGV2ZW50cyBhcmUgYWxzbyBoYW5kbGVkIHRvIHByb3ZpZGUgaGFuZGxpbmcgZm9yIFRhYiwgU2hpZnQtVGFiLCBFc2MgYW5kIEN0cmwtRW50ZXIuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTG9uZ1RleHRFZGl0b3IgaW1wbGVtZW50cyBFZGl0b3Ige1xyXG4gICR0ZXh0YXJlYTogYW55O1xyXG4gICR3cmFwcGVyOiBhbnk7XHJcbiAgZGVmYXVsdFZhbHVlOiBhbnk7XHJcblxyXG4gIC8qKiBHcmlkIG9wdGlvbnMgKi9cclxuICBncmlkT3B0aW9uczogR3JpZE9wdGlvbjtcclxuXHJcbiAgLyoqIFRoZSB0cmFuc2xhdGUgbGlicmFyeSAqL1xyXG4gIHByaXZhdGUgX3RyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcmdzOiBhbnkpIHtcclxuICAgIHRoaXMuZ3JpZE9wdGlvbnMgPSB0aGlzLmFyZ3MuZ3JpZC5nZXRPcHRpb25zKCkgYXMgR3JpZE9wdGlvbjtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdyaWRPcHRpb25zIHx8IHRoaXMuYXJncy5jb2x1bW4ucGFyYW1zIHx8IHt9O1xyXG4gICAgdGhpcy5fdHJhbnNsYXRlID0gb3B0aW9ucy5pMThuO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBDb2x1bW4gRGVmaW5pdGlvbiBvYmplY3QgKi9cclxuICBnZXQgY29sdW1uRGVmKCk6IENvbHVtbiB7XHJcbiAgICByZXR1cm4gdGhpcy5hcmdzICYmIHRoaXMuYXJncy5jb2x1bW4gfHwge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IENvbHVtbiBFZGl0b3Igb2JqZWN0ICovXHJcbiAgZ2V0IGNvbHVtbkVkaXRvcigpOiBDb2x1bW5FZGl0b3Ige1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgVmFsaWRhdG9yIGZ1bmN0aW9uLCBjYW4gYmUgcGFzc2VkIGluIEVkaXRvciBwcm9wZXJ0eSBvciBDb2x1bW4gRGVmaW5pdGlvbiAqL1xyXG4gIGdldCB2YWxpZGF0b3IoKTogRWRpdG9yVmFsaWRhdG9yIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkVkaXRvci52YWxpZGF0b3IgfHwgdGhpcy5jb2x1bW5EZWYudmFsaWRhdG9yO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGhhc0F1dG9Db21taXRFZGl0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXJncy5ncmlkLmdldE9wdGlvbnMoKS5hdXRvQ29tbWl0RWRpdDtcclxuICB9XHJcblxyXG4gIGluaXQoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb2x1bW5JZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xyXG4gICAgY29uc3QgcGxhY2Vob2xkZXIgPSB0aGlzLmNvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkVkaXRvci5wbGFjZWhvbGRlciB8fCAnJztcclxuICAgIGNvbnN0IHRpdGxlID0gdGhpcy5jb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5FZGl0b3IudGl0bGUgfHwgJyc7XHJcbiAgICBjb25zdCBjYW5jZWxUZXh0ID0gdGhpcy5fdHJhbnNsYXRlICYmIHRoaXMuX3RyYW5zbGF0ZS5pbnN0YW50KCdDQU5DRUwnKSB8fCBDb25zdGFudHMuVEVYVF9DQU5DRUw7XHJcbiAgICBjb25zdCBzYXZlVGV4dCA9IHRoaXMuX3RyYW5zbGF0ZSAmJiB0aGlzLl90cmFuc2xhdGUuaW5zdGFudCgnU0FWRScpIHx8IENvbnN0YW50cy5URVhUX1NBVkU7XHJcbiAgICBjb25zdCAkY29udGFpbmVyID0gJCgnYm9keScpO1xyXG5cclxuICAgIHRoaXMuJHdyYXBwZXIgPSAkKGA8ZGl2IGNsYXNzPVwic2xpY2stbGFyZ2UtZWRpdG9yLXRleHQgZWRpdG9yLSR7Y29sdW1uSWR9XCIgLz5gKS5hcHBlbmRUbygkY29udGFpbmVyKTtcclxuICAgIHRoaXMuJHRleHRhcmVhID0gJChgPHRleHRhcmVhIGhpZGVmb2N1cyByb3dzPVwiNVwiIHBsYWNlaG9sZGVyPVwiJHtwbGFjZWhvbGRlcn1cIiB0aXRsZT1cIiR7dGl0bGV9XCI+YCkuYXBwZW5kVG8odGhpcy4kd3JhcHBlcik7XHJcblxyXG4gICAgLy8gdGhlIGxpYiBkb2VzIG5vdCBnZXQgdGhlIGZvY3VzIG91dCBldmVudCBmb3Igc29tZSByZWFzb25cclxuICAgIC8vIHNvIHJlZ2lzdGVyIGl0IGhlcmVcclxuICAgIGlmICh0aGlzLmhhc0F1dG9Db21taXRFZGl0KSB7XHJcbiAgICAgIHRoaXMuJHRleHRhcmVhLm9uKCdmb2N1c291dCcsICgpID0+IHRoaXMuc2F2ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICAkKGA8ZGl2IGNsYXNzPVwiZWRpdG9yLWZvb3RlclwiPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4teHNcIj4ke3NhdmVUZXh0fTwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG4teHNcIj4ke2NhbmNlbFRleHR9PC9idXR0b24+XHJcbiAgICAgIDwvZGl2PmApLmFwcGVuZFRvKHRoaXMuJHdyYXBwZXIpO1xyXG5cclxuICAgIHRoaXMuJHdyYXBwZXIuZmluZCgnYnV0dG9uOmZpcnN0Jykub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5zYXZlKCkpO1xyXG4gICAgdGhpcy4kd3JhcHBlci5maW5kKCdidXR0b246bGFzdCcpLm9uKCdjbGljaycsICgpID0+IHRoaXMuY2FuY2VsKCkpO1xyXG4gICAgdGhpcy4kdGV4dGFyZWEub24oJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgdGhpcy5wb3NpdGlvbih0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLnBvc2l0aW9uKTtcclxuICAgIHRoaXMuJHRleHRhcmVhLmZvY3VzKCkuc2VsZWN0KCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQud2hpY2ggPT09IEtleUNvZGUuRU5URVIgJiYgZXZlbnQuY3RybEtleSkge1xyXG4gICAgICB0aGlzLnNhdmUoKTtcclxuICAgIH0gZWxzZSBpZiAoZXZlbnQud2hpY2ggPT09IEtleUNvZGUuRVNDQVBFKSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHRoaXMuY2FuY2VsKCk7XHJcbiAgICB9IGVsc2UgaWYgKGV2ZW50LndoaWNoID09PSBLZXlDb2RlLlRBQiAmJiBldmVudC5zaGlmdEtleSkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBpZiAodGhpcy5hcmdzICYmIHRoaXMuYXJncy5ncmlkKSB7XHJcbiAgICAgICAgdGhpcy5hcmdzLmdyaWQubmF2aWdhdGVQcmV2KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZXZlbnQud2hpY2ggPT09IEtleUNvZGUuVEFCKSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGlmICh0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmdyaWQpIHtcclxuICAgICAgICB0aGlzLmFyZ3MuZ3JpZC5uYXZpZ2F0ZU5leHQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2FuY2VsKCkge1xyXG4gICAgdGhpcy4kdGV4dGFyZWEudmFsKHRoaXMuZGVmYXVsdFZhbHVlKTtcclxuICAgIGlmICh0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNhbmNlbENoYW5nZXMpIHtcclxuICAgICAgdGhpcy5hcmdzLmNhbmNlbENoYW5nZXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICB0aGlzLiR3cmFwcGVyLmhpZGUoKTtcclxuICB9XHJcblxyXG4gIHNob3coKSB7XHJcbiAgICB0aGlzLiR3cmFwcGVyLnNob3coKTtcclxuICB9XHJcblxyXG4gIHBvc2l0aW9uKHBvc2l0aW9uOiBIdG1sRWxlbWVudFBvc2l0aW9uKSB7XHJcbiAgICB0aGlzLiR3cmFwcGVyXHJcbiAgICAgIC5jc3MoJ3RvcCcsIChwb3NpdGlvbi50b3AgfHwgMCkgLSA1KVxyXG4gICAgICAuY3NzKCdsZWZ0JywgKHBvc2l0aW9uLmxlZnQgfHwgMCkgLSA1KTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLiR3cmFwcGVyLm9mZigna2V5ZG93biBmb2N1c291dCcpLnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgZm9jdXMoKSB7XHJcbiAgICB0aGlzLiR0ZXh0YXJlYS5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4kdGV4dGFyZWEudmFsKCk7XHJcbiAgfVxyXG5cclxuICBzZXRWYWx1ZSh2YWw6IHN0cmluZykge1xyXG4gICAgdGhpcy4kdGV4dGFyZWEudmFsKHZhbCk7XHJcbiAgfVxyXG5cclxuICBnZXRDb2x1bW5FZGl0b3IoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hcmdzICYmIHRoaXMuYXJncy5jb2x1bW4gJiYgdGhpcy5hcmdzLmNvbHVtbi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmFyZ3MuY29sdW1uLmludGVybmFsQ29sdW1uRWRpdG9yO1xyXG4gIH1cclxuXHJcbiAgbG9hZFZhbHVlKGl0ZW06IGFueSkge1xyXG4gICAgY29uc3QgZmllbGROYW1lID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmllbGQ7XHJcblxyXG4gICAgLy8gd2hlbiBpdCdzIGEgY29tcGxleCBvYmplY3QsIHRoZW4gcHVsbCB0aGUgb2JqZWN0IG5hbWUgb25seSwgZS5nLjogXCJ1c2VyLmZpcnN0TmFtZVwiID0+IFwidXNlclwiXHJcbiAgICBjb25zdCBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCA9IGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGZpZWxkTmFtZS5pbmRleE9mKCcuJykpIDogJyc7XHJcblxyXG4gICAgaWYgKGl0ZW0gJiYgdGhpcy5jb2x1bW5EZWYgJiYgKGl0ZW0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSB8fCBpdGVtLmhhc093blByb3BlcnR5KGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0KSkpIHtcclxuICAgICAgdGhpcy5kZWZhdWx0VmFsdWUgPSBpdGVtW2ZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0IHx8IGZpZWxkTmFtZV07XHJcbiAgICAgIHRoaXMuJHRleHRhcmVhLnZhbCh0aGlzLmRlZmF1bHRWYWx1ZSk7XHJcbiAgICAgIHRoaXMuJHRleHRhcmVhLnNlbGVjdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2VyaWFsaXplVmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4kdGV4dGFyZWEudmFsKCk7XHJcbiAgfVxyXG5cclxuICBhcHBseVZhbHVlKGl0ZW06IGFueSwgc3RhdGU6IGFueSkge1xyXG4gICAgY29uc3QgZmllbGROYW1lID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmllbGQ7XHJcbiAgICAvLyB3aGVuIGl0J3MgYSBjb21wbGV4IG9iamVjdCwgdGhlbiBwdWxsIHRoZSBvYmplY3QgbmFtZSBvbmx5LCBlLmcuOiBcInVzZXIuZmlyc3ROYW1lXCIgPT4gXCJ1c2VyXCJcclxuICAgIGNvbnN0IGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0ID0gZmllbGROYW1lLmluZGV4T2YoJy4nKSA/IGZpZWxkTmFtZS5zdWJzdHJpbmcoMCwgZmllbGROYW1lLmluZGV4T2YoJy4nKSkgOiAnJztcclxuICAgIGNvbnN0IHZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKHN0YXRlKTtcclxuICAgIGl0ZW1bZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgfHwgZmllbGROYW1lXSA9ICh2YWxpZGF0aW9uICYmIHZhbGlkYXRpb24udmFsaWQpID8gc3RhdGUgOiAnJztcclxuICB9XHJcblxyXG5cclxuICBpc1ZhbHVlQ2hhbmdlZCgpIHtcclxuICAgIHJldHVybiAoISh0aGlzLiR0ZXh0YXJlYS52YWwoKSA9PT0gJycgJiYgdGhpcy5kZWZhdWx0VmFsdWUgPT09IG51bGwpKSAmJiAodGhpcy4kdGV4dGFyZWEudmFsKCkgIT09IHRoaXMuZGVmYXVsdFZhbHVlKTtcclxuICB9XHJcblxyXG4gIHNhdmUoKSB7XHJcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZSgpO1xyXG4gICAgaWYgKHZhbGlkYXRpb24gJiYgdmFsaWRhdGlvbi52YWxpZCkge1xyXG4gICAgICBpZiAodGhpcy5oYXNBdXRvQ29tbWl0RWRpdCkge1xyXG4gICAgICAgIHRoaXMuYXJncy5ncmlkLmdldEVkaXRvckxvY2soKS5jb21taXRDdXJyZW50RWRpdCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYXJncy5jb21taXRDaGFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYXJncy5jb21taXRDaGFuZ2VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZShpbnB1dFZhbHVlPzogYW55KTogRWRpdG9yVmFsaWRhdG9yT3V0cHV0IHtcclxuICAgIGNvbnN0IGlzUmVxdWlyZWQgPSB0aGlzLmNvbHVtbkVkaXRvci5yZXF1aXJlZDtcclxuICAgIGNvbnN0IGVsbVZhbHVlID0gKGlucHV0VmFsdWUgIT09IHVuZGVmaW5lZCkgPyBpbnB1dFZhbHVlIDogdGhpcy4kdGV4dGFyZWEgJiYgdGhpcy4kdGV4dGFyZWEudmFsICYmIHRoaXMuJHRleHRhcmVhLnZhbCgpO1xyXG4gICAgY29uc3QgZXJyb3JNc2cgPSB0aGlzLmNvbHVtbkVkaXRvci5lcnJvck1lc3NhZ2U7XHJcblxyXG4gICAgaWYgKHRoaXMudmFsaWRhdG9yKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcihlbG1WYWx1ZSwgdGhpcy5hcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBieSBkZWZhdWx0IHRoZSBlZGl0b3IgaXMgYWxtb3N0IGFsd2F5cyB2YWxpZCAoZXhjZXB0IHdoZW4gaXQncyByZXF1aXJlZCBidXQgbm90IHByb3ZpZGVkKVxyXG4gICAgaWYgKGlzUmVxdWlyZWQgJiYgZWxtVmFsdWUgPT09ICcnKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdmFsaWQ6IGZhbHNlLFxyXG4gICAgICAgIG1zZzogZXJyb3JNc2cgfHwgQ29uc3RhbnRzLlZBTElEQVRJT05fUkVRVUlSRURfRklFTERcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB2YWxpZDogdHJ1ZSxcclxuICAgICAgbXNnOiBudWxsXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=