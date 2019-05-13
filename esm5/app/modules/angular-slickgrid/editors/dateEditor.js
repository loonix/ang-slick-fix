/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { TranslateService } from '@ngx-translate/core';
import { Constants } from './../constants';
import { mapFlatpickrDateFormatWithFieldType, mapMomentDateFormatWithFieldType } from './../services/utilities';
import { FieldType } from './../models/index';
import * as moment_ from 'moment-mini';
/** @type {?} */
var moment = moment_;
require('flatpickr');
/*
 * An example of a date picker editor using Flatpickr
 * https://chmln.github.io/flatpickr
 */
var /*
 * An example of a date picker editor using Flatpickr
 * https://chmln.github.io/flatpickr
 */
DateEditor = /** @class */ (function () {
    function DateEditor(args) {
        this.args = args;
        this.init();
    }
    Object.defineProperty(DateEditor.prototype, "columnDef", {
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
    Object.defineProperty(DateEditor.prototype, "columnEditor", {
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
    Object.defineProperty(DateEditor.prototype, "editorOptions", {
        /** Get Flatpickr options passed to the editor by the user */
        get: /**
         * Get Flatpickr options passed to the editor by the user
         * @return {?}
         */
        function () {
            return this.columnEditor.editorOptions || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateEditor.prototype, "validator", {
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
    DateEditor.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.args && this.args.column) {
            /** @type {?} */
            var columnId = this.columnDef && this.columnDef.id;
            /** @type {?} */
            var placeholder = this.columnEditor && this.columnEditor.placeholder || '';
            /** @type {?} */
            var title = this.columnEditor && this.columnEditor.title || '';
            /** @type {?} */
            var gridOptions = (/** @type {?} */ (this.args.grid.getOptions()));
            this.defaultDate = (this.args.item) ? this.args.item[this.args.column.field] : null;
            /** @type {?} */
            var inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
            /** @type {?} */
            var outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || FieldType.dateUtc);
            /** @type {?} */
            var currentLocale = this.getCurrentLocale(this.columnDef, gridOptions);
            if (currentLocale.length > 2) {
                currentLocale = currentLocale.substring(0, 2);
            }
            /** @type {?} */
            var pickerOptions = {
                defaultDate: this.defaultDate,
                altInput: true,
                altInputClass: 'flatpickr-alt-input',
                altFormat: inputFormat,
                dateFormat: outputFormat,
                closeOnSelect: false,
                locale: (currentLocale !== 'en') ? this.loadFlatpickrLocale(currentLocale) : 'en',
                onChange: (/**
                 * @param {?} selectedDates
                 * @param {?} dateStr
                 * @param {?} instance
                 * @return {?}
                 */
                function (selectedDates, dateStr, instance) {
                    _this.save();
                }),
            };
            // merge options with optional user's custom options
            /** @type {?} */
            var pickerMergedOptions = tslib_1.__assign({}, pickerOptions, this.editorOptions);
            /** @type {?} */
            var inputCssClasses = ".editor-text.editor-" + columnId + ".flatpickr";
            this.$input = $("<input type=\"text\" data-defaultDate=\"" + this.defaultDate + "\" class=\"" + inputCssClasses.replace(/\./g, ' ') + "\" placeholder=\"" + placeholder + "\" title=\"" + title + "\" />");
            this.$input.appendTo(this.args.container);
            this.flatInstance = (this.$input[0] && typeof this.$input[0].flatpickr === 'function') ? this.$input[0].flatpickr(pickerMergedOptions) : null;
            // when we're using an alternate input to display data, we'll consider this input as the one to do the focus later on
            // else just use the top one
            this._$inputWithData = (pickerMergedOptions && pickerMergedOptions.altInput) ? $(inputCssClasses + ".flatpickr-alt-input") : this.$input;
        }
    };
    /**
     * @param {?} columnDef
     * @param {?} gridOptions
     * @return {?}
     */
    DateEditor.prototype.getCurrentLocale = /**
     * @param {?} columnDef
     * @param {?} gridOptions
     * @return {?}
     */
    function (columnDef, gridOptions) {
        /** @type {?} */
        var options = gridOptions || columnDef.params || {};
        if (options.i18n && options.i18n instanceof TranslateService) {
            return options.i18n.currentLang;
        }
        return 'en';
    };
    /**
     * @param {?} locale
     * @return {?}
     */
    DateEditor.prototype.loadFlatpickrLocale = /**
     * @param {?} locale
     * @return {?}
     */
    function (locale) {
        // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
        /** @type {?} */
        var gridOptions = this.args && this.args.grid && this.args.grid.getOptions();
        if (gridOptions && gridOptions.params && gridOptions.params.flapickrLocale) {
            return gridOptions.params.flapickrLocale;
        }
        else if (locale !== 'en') {
            /** @type {?} */
            var localeDefault = require("flatpickr/dist/l10n/" + locale + ".js").default;
            return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
        }
        return 'en';
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.hide();
        this.$input.remove();
        if (this._$inputWithData && typeof this._$inputWithData.remove === 'function') {
            this._$inputWithData.remove();
        }
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.show = /**
     * @return {?}
     */
    function () {
        if (this.flatInstance && typeof this.flatInstance.open === 'function') {
            this.flatInstance.open();
        }
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.hide = /**
     * @return {?}
     */
    function () {
        if (this.flatInstance && typeof this.flatInstance.close === 'function') {
            this.flatInstance.close();
        }
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.focus = /**
     * @return {?}
     */
    function () {
        if (this._$inputWithData && this._$inputWithData.focus) {
            this._$inputWithData.focus().select();
        }
        else if (this.$input && this.$input.focus) {
            this.$input.focus().select();
        }
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.save = /**
     * @return {?}
     */
    function () {
        // autocommit will not focus the next editor
        /** @type {?} */
        var validation = this.validate();
        if (validation && validation.valid) {
            if (this.args.grid.getOptions().autoCommitEdit) {
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
    DateEditor.prototype.getColumnEditor = /**
     * @return {?}
     */
    function () {
        return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    DateEditor.prototype.loadValue = /**
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
            this.defaultDate = item[fieldNameFromComplexObject || fieldName];
            this.flatInstance.setDate(item[this.args.column.field]);
            this.focus();
        }
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.serializeValue = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var domValue = this.$input.val();
        if (!domValue) {
            return '';
        }
        /** @type {?} */
        var outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
        /** @type {?} */
        var value = moment(domValue).format(outputFormat);
        return value;
    };
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    DateEditor.prototype.applyValue = /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    function (item, state) {
        /** @type {?} */
        var fieldName = this.columnDef && this.columnDef.field;
        /** @type {?} */
        var outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
        // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
        /** @type {?} */
        var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
        /** @type {?} */
        var newValue = state ? moment(state, outputFormat).toDate() : '';
        /** @type {?} */
        var validation = this.validate(newValue);
        item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? newValue : '';
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.isValueChanged = /**
     * @return {?}
     */
    function () {
        return (!(this.$input.val() === '' && this.defaultDate == null)) && (this.$input.val() !== this.defaultDate);
    };
    /**
     * @param {?=} inputValue
     * @return {?}
     */
    DateEditor.prototype.validate = /**
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
    return DateEditor;
}());
/*
 * An example of a date picker editor using Flatpickr
 * https://chmln.github.io/flatpickr
 */
export { DateEditor };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DateEditor.prototype._$inputWithData;
    /** @type {?} */
    DateEditor.prototype.$input;
    /** @type {?} */
    DateEditor.prototype.flatInstance;
    /** @type {?} */
    DateEditor.prototype.defaultDate;
    /**
     * @type {?}
     * @private
     */
    DateEditor.prototype.args;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZWRpdG9ycy9kYXRlRWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hILE9BQU8sRUFBd0UsU0FBUyxFQUF1QixNQUFNLG1CQUFtQixDQUFDO0FBQ3pJLE9BQU8sS0FBSyxPQUFPLE1BQU0sYUFBYSxDQUFDOztJQUNqQyxNQUFNLEdBQUcsT0FBTztBQUd0QixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7Ozs7O0FBU3JCOzs7OztJQU1FLG9CQUFvQixJQUFTO1FBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztRQUMzQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBR0Qsc0JBQUksaUNBQVM7UUFEYixtQ0FBbUM7Ozs7O1FBQ25DO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTtJQUdELHNCQUFJLG9DQUFZO1FBRGhCLCtCQUErQjs7Ozs7UUFDL0I7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixJQUFJLEVBQUUsQ0FBQztRQUM1RyxDQUFDOzs7T0FBQTtJQUdELHNCQUFJLHFDQUFhO1FBRGpCLDZEQUE2RDs7Ozs7UUFDN0Q7WUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENB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WUFDakMsT0FBTztnQkFDTCxLQUFLLEVBQUUsS0FBSztnQkFDWixHQUFHLEVBQUUsUUFBUSxJQUFJLFNBQVMsQ0FBQyx5QkFBeUI7YUFDckQsQ0FBQztTQUNIO1FBRUQsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLElBQUk7U0FDVixDQUFDO0lBQ0osQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQXZNRCxJQXVNQzs7Ozs7Ozs7Ozs7SUF0TUMscUNBQTZCOztJQUM3Qiw0QkFBWTs7SUFDWixrQ0FBa0I7O0lBQ2xCLGlDQUFvQjs7Ozs7SUFFUiwwQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4vLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgbWFwRmxhdHBpY2tyRGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUsIG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBDb2x1bW4sIENvbHVtbkVkaXRvciwgRWRpdG9yLCBFZGl0b3JWYWxpZGF0b3IsIEVkaXRvclZhbGlkYXRvck91dHB1dCwgRmllbGRUeXBlLCBHcmlkT3B0aW9uLCBLZXlDb2RlIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudC1taW5pJztcclxuY29uc3QgbW9tZW50ID0gbW9tZW50XzsgLy8gcGF0Y2ggdG8gZml4IHJvbGx1cCBcIm1vbWVudCBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIiBpc3N1ZSwgZG9jdW1lbnQgaGVyZSBodHRwczovL2dpdGh1Yi5jb20vcm9sbHVwL3JvbGx1cC9pc3N1ZXMvNjcwXHJcblxyXG5kZWNsYXJlIGZ1bmN0aW9uIHJlcXVpcmUobmFtZTogc3RyaW5nKTtcclxucmVxdWlyZSgnZmxhdHBpY2tyJyk7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbi8qXHJcbiAqIEFuIGV4YW1wbGUgb2YgYSBkYXRlIHBpY2tlciBlZGl0b3IgdXNpbmcgRmxhdHBpY2tyXHJcbiAqIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERhdGVFZGl0b3IgaW1wbGVtZW50cyBFZGl0b3Ige1xyXG4gIHByaXZhdGUgXyRpbnB1dFdpdGhEYXRhOiBhbnk7XHJcbiAgJGlucHV0OiBhbnk7XHJcbiAgZmxhdEluc3RhbmNlOiBhbnk7XHJcbiAgZGVmYXVsdERhdGU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcmdzOiBhbnkpIHtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBDb2x1bW4gRGVmaW5pdGlvbiBvYmplY3QgKi9cclxuICBnZXQgY29sdW1uRGVmKCk6IENvbHVtbiB7XHJcbiAgICByZXR1cm4gdGhpcy5hcmdzICYmIHRoaXMuYXJncy5jb2x1bW4gfHwge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IENvbHVtbiBFZGl0b3Igb2JqZWN0ICovXHJcbiAgZ2V0IGNvbHVtbkVkaXRvcigpOiBDb2x1bW5FZGl0b3Ige1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBGbGF0cGlja3Igb3B0aW9ucyBwYXNzZWQgdG8gdGhlIGVkaXRvciBieSB0aGUgdXNlciAqL1xyXG4gIGdldCBlZGl0b3JPcHRpb25zKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5FZGl0b3IuZWRpdG9yT3B0aW9ucyB8fCB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIFZhbGlkYXRvciBmdW5jdGlvbiwgY2FuIGJlIHBhc3NlZCBpbiBFZGl0b3IgcHJvcGVydHkgb3IgQ29sdW1uIERlZmluaXRpb24gKi9cclxuICBnZXQgdmFsaWRhdG9yKCk6IEVkaXRvclZhbGlkYXRvciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5FZGl0b3IudmFsaWRhdG9yIHx8IHRoaXMuY29sdW1uRGVmLnZhbGlkYXRvcjtcclxuICB9XHJcblxyXG4gIGluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5hcmdzICYmIHRoaXMuYXJncy5jb2x1bW4pIHtcclxuICAgICAgY29uc3QgY29sdW1uSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcclxuICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSB0aGlzLmNvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkVkaXRvci5wbGFjZWhvbGRlciB8fCAnJztcclxuICAgICAgY29uc3QgdGl0bGUgPSB0aGlzLmNvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkVkaXRvci50aXRsZSB8fCAnJztcclxuICAgICAgY29uc3QgZ3JpZE9wdGlvbnMgPSB0aGlzLmFyZ3MuZ3JpZC5nZXRPcHRpb25zKCkgYXMgR3JpZE9wdGlvbjtcclxuICAgICAgdGhpcy5kZWZhdWx0RGF0ZSA9ICh0aGlzLmFyZ3MuaXRlbSkgPyB0aGlzLmFyZ3MuaXRlbVt0aGlzLmFyZ3MuY29sdW1uLmZpZWxkXSA6IG51bGw7XHJcbiAgICAgIGNvbnN0IGlucHV0Rm9ybWF0ID0gbWFwRmxhdHBpY2tyRGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUodGhpcy5jb2x1bW5EZWYudHlwZSB8fCBGaWVsZFR5cGUuZGF0ZUlzbyk7XHJcbiAgICAgIGNvbnN0IG91dHB1dEZvcm1hdCA9IG1hcEZsYXRwaWNrckRhdGVGb3JtYXRXaXRoRmllbGRUeXBlKHRoaXMuY29sdW1uRGVmLm91dHB1dFR5cGUgfHwgRmllbGRUeXBlLmRhdGVVdGMpO1xyXG4gICAgICBsZXQgY3VycmVudExvY2FsZSA9IHRoaXMuZ2V0Q3VycmVudExvY2FsZSh0aGlzLmNvbHVtbkRlZiwgZ3JpZE9wdGlvbnMpO1xyXG4gICAgICBpZiAoY3VycmVudExvY2FsZS5sZW5ndGggPiAyKSB7XHJcbiAgICAgICAgY3VycmVudExvY2FsZSA9IGN1cnJlbnRMb2NhbGUuc3Vic3RyaW5nKDAsIDIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwaWNrZXJPcHRpb25zOiBhbnkgPSB7XHJcbiAgICAgICAgZGVmYXVsdERhdGU6IHRoaXMuZGVmYXVsdERhdGUsXHJcbiAgICAgICAgYWx0SW5wdXQ6IHRydWUsXHJcbiAgICAgICAgYWx0SW5wdXRDbGFzczogJ2ZsYXRwaWNrci1hbHQtaW5wdXQnLFxyXG4gICAgICAgIGFsdEZvcm1hdDogaW5wdXRGb3JtYXQsXHJcbiAgICAgICAgZGF0ZUZvcm1hdDogb3V0cHV0Rm9ybWF0LFxyXG4gICAgICAgIGNsb3NlT25TZWxlY3Q6IGZhbHNlLFxyXG4gICAgICAgIGxvY2FsZTogKGN1cnJlbnRMb2NhbGUgIT09ICdlbicpID8gdGhpcy5sb2FkRmxhdHBpY2tyTG9jYWxlKGN1cnJlbnRMb2NhbGUpIDogJ2VuJyxcclxuICAgICAgICBvbkNoYW5nZTogKHNlbGVjdGVkRGF0ZXM6IGFueVtdIHwgYW55LCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBhbnkpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2F2ZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBtZXJnZSBvcHRpb25zIHdpdGggb3B0aW9uYWwgdXNlcidzIGN1c3RvbSBvcHRpb25zXHJcbiAgICAgIGNvbnN0IHBpY2tlck1lcmdlZE9wdGlvbnMgPSB7IC4uLnBpY2tlck9wdGlvbnMsIC4uLnRoaXMuZWRpdG9yT3B0aW9ucyB9O1xyXG4gICAgICBjb25zdCBpbnB1dENzc0NsYXNzZXMgPSBgLmVkaXRvci10ZXh0LmVkaXRvci0ke2NvbHVtbklkfS5mbGF0cGlja3JgO1xyXG5cclxuICAgICAgdGhpcy4kaW5wdXQgPSAkKGA8aW5wdXQgdHlwZT1cInRleHRcIiBkYXRhLWRlZmF1bHREYXRlPVwiJHt0aGlzLmRlZmF1bHREYXRlfVwiIGNsYXNzPVwiJHtpbnB1dENzc0NsYXNzZXMucmVwbGFjZSgvXFwuL2csICcgJyl9XCIgcGxhY2Vob2xkZXI9XCIke3BsYWNlaG9sZGVyfVwiIHRpdGxlPVwiJHt0aXRsZX1cIiAvPmApO1xyXG4gICAgICB0aGlzLiRpbnB1dC5hcHBlbmRUbyh0aGlzLmFyZ3MuY29udGFpbmVyKTtcclxuICAgICAgdGhpcy5mbGF0SW5zdGFuY2UgPSAodGhpcy4kaW5wdXRbMF0gJiYgdHlwZW9mIHRoaXMuJGlucHV0WzBdLmZsYXRwaWNrciA9PT0gJ2Z1bmN0aW9uJykgPyB0aGlzLiRpbnB1dFswXS5mbGF0cGlja3IocGlja2VyTWVyZ2VkT3B0aW9ucykgOiBudWxsO1xyXG5cclxuICAgICAgLy8gd2hlbiB3ZSdyZSB1c2luZyBhbiBhbHRlcm5hdGUgaW5wdXQgdG8gZGlzcGxheSBkYXRhLCB3ZSdsbCBjb25zaWRlciB0aGlzIGlucHV0IGFzIHRoZSBvbmUgdG8gZG8gdGhlIGZvY3VzIGxhdGVyIG9uXHJcbiAgICAgIC8vIGVsc2UganVzdCB1c2UgdGhlIHRvcCBvbmVcclxuICAgICAgdGhpcy5fJGlucHV0V2l0aERhdGEgPSAocGlja2VyTWVyZ2VkT3B0aW9ucyAmJiBwaWNrZXJNZXJnZWRPcHRpb25zLmFsdElucHV0KSA/ICQoYCR7aW5wdXRDc3NDbGFzc2VzfS5mbGF0cGlja3ItYWx0LWlucHV0YCkgOiB0aGlzLiRpbnB1dDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEN1cnJlbnRMb2NhbGUoY29sdW1uRGVmOiBDb2x1bW4sIGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uKSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gZ3JpZE9wdGlvbnMgfHwgY29sdW1uRGVmLnBhcmFtcyB8fCB7fTtcclxuICAgIGlmIChvcHRpb25zLmkxOG4gJiYgb3B0aW9ucy5pMThuIGluc3RhbmNlb2YgVHJhbnNsYXRlU2VydmljZSkge1xyXG4gICAgICByZXR1cm4gb3B0aW9ucy5pMThuLmN1cnJlbnRMYW5nO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAnZW4nO1xyXG4gIH1cclxuXHJcbiAgbG9hZEZsYXRwaWNrckxvY2FsZShsb2NhbGU6IHN0cmluZykge1xyXG4gICAgLy8gY2hhbmdlIGxvY2FsZSBpZiBuZWVkZWQsIEZsYXRwaWNrciByZWZlcmVuY2U6IGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9sb2NhbGl6YXRpb24vXHJcbiAgICBjb25zdCBncmlkT3B0aW9ucyA9IHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuZ3JpZCAmJiB0aGlzLmFyZ3MuZ3JpZC5nZXRPcHRpb25zKCk7XHJcbiAgICBpZiAoZ3JpZE9wdGlvbnMgJiYgZ3JpZE9wdGlvbnMucGFyYW1zICYmIGdyaWRPcHRpb25zLnBhcmFtcy5mbGFwaWNrckxvY2FsZSkge1xyXG4gICAgICByZXR1cm4gZ3JpZE9wdGlvbnMucGFyYW1zLmZsYXBpY2tyTG9jYWxlO1xyXG4gICAgfSBlbHNlIGlmIChsb2NhbGUgIT09ICdlbicpIHtcclxuICAgICAgY29uc3QgbG9jYWxlRGVmYXVsdDogYW55ID0gcmVxdWlyZShgZmxhdHBpY2tyL2Rpc3QvbDEwbi8ke2xvY2FsZX0uanNgKS5kZWZhdWx0O1xyXG4gICAgICByZXR1cm4gKGxvY2FsZURlZmF1bHQgJiYgbG9jYWxlRGVmYXVsdFtsb2NhbGVdKSA/IGxvY2FsZURlZmF1bHRbbG9jYWxlXSA6ICdlbic7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJ2VuJztcclxuICB9XHJcblxyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmhpZGUoKTtcclxuICAgIHRoaXMuJGlucHV0LnJlbW92ZSgpO1xyXG4gICAgaWYgKHRoaXMuXyRpbnB1dFdpdGhEYXRhICYmIHR5cGVvZiB0aGlzLl8kaW5wdXRXaXRoRGF0YS5yZW1vdmUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy5fJGlucHV0V2l0aERhdGEucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzaG93KCkge1xyXG4gICAgaWYgKHRoaXMuZmxhdEluc3RhbmNlICYmIHR5cGVvZiB0aGlzLmZsYXRJbnN0YW5jZS5vcGVuID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuZmxhdEluc3RhbmNlLm9wZW4oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICBpZiAodGhpcy5mbGF0SW5zdGFuY2UgJiYgdHlwZW9mIHRoaXMuZmxhdEluc3RhbmNlLmNsb3NlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuZmxhdEluc3RhbmNlLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb2N1cygpIHtcclxuICAgIGlmICh0aGlzLl8kaW5wdXRXaXRoRGF0YSAmJiB0aGlzLl8kaW5wdXRXaXRoRGF0YS5mb2N1cykge1xyXG4gICAgICB0aGlzLl8kaW5wdXRXaXRoRGF0YS5mb2N1cygpLnNlbGVjdCgpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLiRpbnB1dCAmJiB0aGlzLiRpbnB1dC5mb2N1cykge1xyXG4gICAgICB0aGlzLiRpbnB1dC5mb2N1cygpLnNlbGVjdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2F2ZSgpIHtcclxuICAgIC8vIGF1dG9jb21taXQgd2lsbCBub3QgZm9jdXMgdGhlIG5leHQgZWRpdG9yXHJcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZSgpO1xyXG4gICAgaWYgKHZhbGlkYXRpb24gJiYgdmFsaWRhdGlvbi52YWxpZCkge1xyXG4gICAgICBpZiAodGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpLmF1dG9Db21taXRFZGl0KSB7XHJcbiAgICAgICAgdGhpcy5hcmdzLmdyaWQuZ2V0RWRpdG9yTG9jaygpLmNvbW1pdEN1cnJlbnRFZGl0KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5hcmdzLmNvbW1pdENoYW5nZXMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0Q29sdW1uRWRpdG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuY29sdW1uICYmIHRoaXMuYXJncy5jb2x1bW4uaW50ZXJuYWxDb2x1bW5FZGl0b3IgJiYgdGhpcy5hcmdzLmNvbHVtbi5pbnRlcm5hbENvbHVtbkVkaXRvcjtcclxuICB9XHJcblxyXG4gIGxvYWRWYWx1ZShpdGVtOiBhbnkpIHtcclxuICAgIGNvbnN0IGZpZWxkTmFtZSA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpZWxkO1xyXG5cclxuICAgIC8vIHdoZW4gaXQncyBhIGNvbXBsZXggb2JqZWN0LCB0aGVuIHB1bGwgdGhlIG9iamVjdCBuYW1lIG9ubHksIGUuZy46IFwidXNlci5maXJzdE5hbWVcIiA9PiBcInVzZXJcIlxyXG4gICAgY29uc3QgZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgPSBmaWVsZE5hbWUuaW5kZXhPZignLicpID8gZmllbGROYW1lLnN1YnN0cmluZygwLCBmaWVsZE5hbWUuaW5kZXhPZignLicpKSA6ICcnO1xyXG5cclxuICAgIGlmIChpdGVtICYmIHRoaXMuY29sdW1uRGVmICYmIChpdGVtLmhhc093blByb3BlcnR5KGZpZWxkTmFtZSkgfHwgaXRlbS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCkpKSB7XHJcbiAgICAgIHRoaXMuZGVmYXVsdERhdGUgPSBpdGVtW2ZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0IHx8IGZpZWxkTmFtZV07XHJcbiAgICAgIHRoaXMuZmxhdEluc3RhbmNlLnNldERhdGUoaXRlbVt0aGlzLmFyZ3MuY29sdW1uLmZpZWxkXSk7XHJcbiAgICAgIHRoaXMuZm9jdXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNlcmlhbGl6ZVZhbHVlKCkge1xyXG4gICAgY29uc3QgZG9tVmFsdWU6IHN0cmluZyA9IHRoaXMuJGlucHV0LnZhbCgpO1xyXG5cclxuICAgIGlmICghZG9tVmFsdWUpIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG91dHB1dEZvcm1hdCA9IG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlKHRoaXMuYXJncy5jb2x1bW4udHlwZSB8fCBGaWVsZFR5cGUuZGF0ZUlzbyk7XHJcbiAgICBjb25zdCB2YWx1ZSA9IG1vbWVudChkb21WYWx1ZSkuZm9ybWF0KG91dHB1dEZvcm1hdCk7XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgYXBwbHlWYWx1ZShpdGVtOiBhbnksIHN0YXRlOiBhbnkpIHtcclxuICAgIGNvbnN0IGZpZWxkTmFtZSA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpZWxkO1xyXG4gICAgY29uc3Qgb3V0cHV0Rm9ybWF0ID0gbWFwTW9tZW50RGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUodGhpcy5hcmdzLmNvbHVtbi50eXBlIHx8IEZpZWxkVHlwZS5kYXRlSXNvKTtcclxuXHJcbiAgICAvLyB3aGVuIGl0J3MgYSBjb21wbGV4IG9iamVjdCwgdGhlbiBwdWxsIHRoZSBvYmplY3QgbmFtZSBvbmx5LCBlLmcuOiBcInVzZXIuZmlyc3ROYW1lXCIgPT4gXCJ1c2VyXCJcclxuICAgIGNvbnN0IGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0ID0gZmllbGROYW1lLmluZGV4T2YoJy4nKSA/IGZpZWxkTmFtZS5zdWJzdHJpbmcoMCwgZmllbGROYW1lLmluZGV4T2YoJy4nKSkgOiAnJztcclxuICAgIGNvbnN0IG5ld1ZhbHVlID0gc3RhdGUgPyBtb21lbnQoc3RhdGUsIG91dHB1dEZvcm1hdCkudG9EYXRlKCkgOiAnJztcclxuICAgIGNvbnN0IHZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKG5ld1ZhbHVlKTtcclxuICAgIGl0ZW1bZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgfHwgZmllbGROYW1lXSA9ICh2YWxpZGF0aW9uICYmIHZhbGlkYXRpb24udmFsaWQpID8gbmV3VmFsdWUgOiAnJztcclxuICB9XHJcblxyXG4gIGlzVmFsdWVDaGFuZ2VkKCkge1xyXG4gICAgcmV0dXJuICghKHRoaXMuJGlucHV0LnZhbCgpID09PSAnJyAmJiB0aGlzLmRlZmF1bHREYXRlID09IG51bGwpKSAmJiAodGhpcy4kaW5wdXQudmFsKCkgIT09IHRoaXMuZGVmYXVsdERhdGUpO1xyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGUoaW5wdXRWYWx1ZT86IGFueSk6IEVkaXRvclZhbGlkYXRvck91dHB1dCB7XHJcbiAgICBjb25zdCBpc1JlcXVpcmVkID0gdGhpcy5jb2x1bW5FZGl0b3IucmVxdWlyZWQ7XHJcbiAgICBjb25zdCBlbG1WYWx1ZSA9IChpbnB1dFZhbHVlICE9PSB1bmRlZmluZWQpID8gaW5wdXRWYWx1ZSA6IHRoaXMuJGlucHV0ICYmIHRoaXMuJGlucHV0LnZhbCAmJiB0aGlzLiRpbnB1dC52YWwoKTtcclxuICAgIGNvbnN0IGVycm9yTXNnID0gdGhpcy5jb2x1bW5FZGl0b3IuZXJyb3JNZXNzYWdlO1xyXG5cclxuICAgIGlmICh0aGlzLnZhbGlkYXRvcikge1xyXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IoZWxtVmFsdWUsIHRoaXMuYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYnkgZGVmYXVsdCB0aGUgZWRpdG9yIGlzIGFsbW9zdCBhbHdheXMgdmFsaWQgKGV4Y2VwdCB3aGVuIGl0J3MgcmVxdWlyZWQgYnV0IG5vdCBwcm92aWRlZClcclxuICAgIGlmIChpc1JlcXVpcmVkICYmIGVsbVZhbHVlID09PSAnJykge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHZhbGlkOiBmYWxzZSxcclxuICAgICAgICBtc2c6IGVycm9yTXNnIHx8IENvbnN0YW50cy5WQUxJREFUSU9OX1JFUVVJUkVEX0ZJRUxEXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdmFsaWQ6IHRydWUsXHJcbiAgICAgIG1zZzogbnVsbFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19