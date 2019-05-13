/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { TranslateService } from '@ngx-translate/core';
import { Constants } from './../constants';
import { mapFlatpickrDateFormatWithFieldType, mapMomentDateFormatWithFieldType } from './../services/utilities';
import { FieldType } from './../models/index';
import * as moment_ from 'moment-mini';
/** @type {?} */
const moment = moment_;
require('flatpickr');
/*
 * An example of a date picker editor using Flatpickr
 * https://chmln.github.io/flatpickr
 */
export class DateEditor {
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
     * Get Flatpickr options passed to the editor by the user
     * @return {?}
     */
    get editorOptions() {
        return this.columnEditor.editorOptions || {};
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
        if (this.args && this.args.column) {
            /** @type {?} */
            const columnId = this.columnDef && this.columnDef.id;
            /** @type {?} */
            const placeholder = this.columnEditor && this.columnEditor.placeholder || '';
            /** @type {?} */
            const title = this.columnEditor && this.columnEditor.title || '';
            /** @type {?} */
            const gridOptions = (/** @type {?} */ (this.args.grid.getOptions()));
            this.defaultDate = (this.args.item) ? this.args.item[this.args.column.field] : null;
            /** @type {?} */
            const inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
            /** @type {?} */
            const outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || FieldType.dateUtc);
            /** @type {?} */
            let currentLocale = this.getCurrentLocale(this.columnDef, gridOptions);
            if (currentLocale.length > 2) {
                currentLocale = currentLocale.substring(0, 2);
            }
            /** @type {?} */
            const pickerOptions = {
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
                (selectedDates, dateStr, instance) => {
                    this.save();
                }),
            };
            // merge options with optional user's custom options
            /** @type {?} */
            const pickerMergedOptions = Object.assign({}, pickerOptions, this.editorOptions);
            /** @type {?} */
            const inputCssClasses = `.editor-text.editor-${columnId}.flatpickr`;
            this.$input = $(`<input type="text" data-defaultDate="${this.defaultDate}" class="${inputCssClasses.replace(/\./g, ' ')}" placeholder="${placeholder}" title="${title}" />`);
            this.$input.appendTo(this.args.container);
            this.flatInstance = (this.$input[0] && typeof this.$input[0].flatpickr === 'function') ? this.$input[0].flatpickr(pickerMergedOptions) : null;
            // when we're using an alternate input to display data, we'll consider this input as the one to do the focus later on
            // else just use the top one
            this._$inputWithData = (pickerMergedOptions && pickerMergedOptions.altInput) ? $(`${inputCssClasses}.flatpickr-alt-input`) : this.$input;
        }
    }
    /**
     * @param {?} columnDef
     * @param {?} gridOptions
     * @return {?}
     */
    getCurrentLocale(columnDef, gridOptions) {
        /** @type {?} */
        const options = gridOptions || columnDef.params || {};
        if (options.i18n && options.i18n instanceof TranslateService) {
            return options.i18n.currentLang;
        }
        return 'en';
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    loadFlatpickrLocale(locale) {
        // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
        /** @type {?} */
        const gridOptions = this.args && this.args.grid && this.args.grid.getOptions();
        if (gridOptions && gridOptions.params && gridOptions.params.flapickrLocale) {
            return gridOptions.params.flapickrLocale;
        }
        else if (locale !== 'en') {
            /** @type {?} */
            const localeDefault = require(`flatpickr/dist/l10n/${locale}.js`).default;
            return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
        }
        return 'en';
    }
    /**
     * @return {?}
     */
    destroy() {
        this.hide();
        this.$input.remove();
        if (this._$inputWithData && typeof this._$inputWithData.remove === 'function') {
            this._$inputWithData.remove();
        }
    }
    /**
     * @return {?}
     */
    show() {
        if (this.flatInstance && typeof this.flatInstance.open === 'function') {
            this.flatInstance.open();
        }
    }
    /**
     * @return {?}
     */
    hide() {
        if (this.flatInstance && typeof this.flatInstance.close === 'function') {
            this.flatInstance.close();
        }
    }
    /**
     * @return {?}
     */
    focus() {
        if (this._$inputWithData && this._$inputWithData.focus) {
            this._$inputWithData.focus().select();
        }
        else if (this.$input && this.$input.focus) {
            this.$input.focus().select();
        }
    }
    /**
     * @return {?}
     */
    save() {
        // autocommit will not focus the next editor
        /** @type {?} */
        const validation = this.validate();
        if (validation && validation.valid) {
            if (this.args.grid.getOptions().autoCommitEdit) {
                this.args.grid.getEditorLock().commitCurrentEdit();
            }
            else {
                this.args.commitChanges();
            }
        }
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
            this.defaultDate = item[fieldNameFromComplexObject || fieldName];
            this.flatInstance.setDate(item[this.args.column.field]);
            this.focus();
        }
    }
    /**
     * @return {?}
     */
    serializeValue() {
        /** @type {?} */
        const domValue = this.$input.val();
        if (!domValue) {
            return '';
        }
        /** @type {?} */
        const outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
        /** @type {?} */
        const value = moment(domValue).format(outputFormat);
        return value;
    }
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    applyValue(item, state) {
        /** @type {?} */
        const fieldName = this.columnDef && this.columnDef.field;
        /** @type {?} */
        const outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
        // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
        /** @type {?} */
        const fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
        /** @type {?} */
        const newValue = state ? moment(state, outputFormat).toDate() : '';
        /** @type {?} */
        const validation = this.validate(newValue);
        item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? newValue : '';
    }
    /**
     * @return {?}
     */
    isValueChanged() {
        return (!(this.$input.val() === '' && this.defaultDate == null)) && (this.$input.val() !== this.defaultDate);
    }
    /**
     * @param {?=} inputValue
     * @return {?}
     */
    validate(inputValue) {
        /** @type {?} */
        const isRequired = this.columnEditor.required;
        /** @type {?} */
        const elmValue = (inputValue !== undefined) ? inputValue : this.$input && this.$input.val && this.$input.val();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZWRpdG9ycy9kYXRlRWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEgsT0FBTyxFQUF3RSxTQUFTLEVBQXVCLE1BQU0sbUJBQW1CLENBQUM7QUFDekksT0FBTyxLQUFLLE9BQU8sTUFBTSxhQUFhLENBQUM7O01BQ2pDLE1BQU0sR0FBRyxPQUFPO0FBR3RCLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Ozs7QUFTckIsTUFBTSxPQUFPLFVBQVU7Ozs7SUFNckIsWUFBb0IsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7UUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFHRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO0lBQzdDLENBQUM7Ozs7O0lBR0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsSUFBSSxFQUFFLENBQUM7SUFDNUcsQ0FBQzs7Ozs7SUFHRCxJQUFJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQztJQUMvQyxDQUFDOzs7OztJQUdELElBQUksU0FBUztRQUNYLE9BQU8s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Q0FBb0I7Ozs7O0lBRVIsMEJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IG1hcEZsYXRwaWNrckRhdGVGb3JtYXRXaXRoRmllbGRUeXBlLCBtYXBNb21lbnREYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSB9IGZyb20gJy4vLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgQ29sdW1uLCBDb2x1bW5FZGl0b3IsIEVkaXRvciwgRWRpdG9yVmFsaWRhdG9yLCBFZGl0b3JWYWxpZGF0b3JPdXRwdXQsIEZpZWxkVHlwZSwgR3JpZE9wdGlvbiwgS2V5Q29kZSB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQtbWluaSc7XHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87IC8vIHBhdGNoIHRvIGZpeCByb2xsdXAgXCJtb21lbnQgaGFzIG5vIGRlZmF1bHQgZXhwb3J0XCIgaXNzdWUsIGRvY3VtZW50IGhlcmUgaHR0cHM6Ly9naXRodWIuY29tL3JvbGx1cC9yb2xsdXAvaXNzdWVzLzY3MFxyXG5cclxuZGVjbGFyZSBmdW5jdGlvbiByZXF1aXJlKG5hbWU6IHN0cmluZyk7XHJcbnJlcXVpcmUoJ2ZsYXRwaWNrcicpO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG4vKlxyXG4gKiBBbiBleGFtcGxlIG9mIGEgZGF0ZSBwaWNrZXIgZWRpdG9yIHVzaW5nIEZsYXRwaWNrclxyXG4gKiBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBEYXRlRWRpdG9yIGltcGxlbWVudHMgRWRpdG9yIHtcclxuICBwcml2YXRlIF8kaW5wdXRXaXRoRGF0YTogYW55O1xyXG4gICRpbnB1dDogYW55O1xyXG4gIGZsYXRJbnN0YW5jZTogYW55O1xyXG4gIGRlZmF1bHREYXRlOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXJnczogYW55KSB7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgQ29sdW1uIERlZmluaXRpb24gb2JqZWN0ICovXHJcbiAgZ2V0IGNvbHVtbkRlZigpOiBDb2x1bW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuY29sdW1uIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBDb2x1bW4gRWRpdG9yIG9iamVjdCAqL1xyXG4gIGdldCBjb2x1bW5FZGl0b3IoKTogQ29sdW1uRWRpdG9yIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciB8fCB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgRmxhdHBpY2tyIG9wdGlvbnMgcGFzc2VkIHRvIHRoZSBlZGl0b3IgYnkgdGhlIHVzZXIgKi9cclxuICBnZXQgZWRpdG9yT3B0aW9ucygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRWRpdG9yLmVkaXRvck9wdGlvbnMgfHwge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IHRoZSBWYWxpZGF0b3IgZnVuY3Rpb24sIGNhbiBiZSBwYXNzZWQgaW4gRWRpdG9yIHByb3BlcnR5IG9yIENvbHVtbiBEZWZpbml0aW9uICovXHJcbiAgZ2V0IHZhbGlkYXRvcigpOiBFZGl0b3JWYWxpZGF0b3Ige1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRWRpdG9yLnZhbGlkYXRvciB8fCB0aGlzLmNvbHVtbkRlZi52YWxpZGF0b3I7XHJcbiAgfVxyXG5cclxuICBpbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuY29sdW1uKSB7XHJcbiAgICAgIGNvbnN0IGNvbHVtbklkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XHJcbiAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5jb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5FZGl0b3IucGxhY2Vob2xkZXIgfHwgJyc7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy5jb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5FZGl0b3IudGl0bGUgfHwgJyc7XHJcbiAgICAgIGNvbnN0IGdyaWRPcHRpb25zID0gdGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpIGFzIEdyaWRPcHRpb247XHJcbiAgICAgIHRoaXMuZGVmYXVsdERhdGUgPSAodGhpcy5hcmdzLml0ZW0pID8gdGhpcy5hcmdzLml0ZW1bdGhpcy5hcmdzLmNvbHVtbi5maWVsZF0gOiBudWxsO1xyXG4gICAgICBjb25zdCBpbnB1dEZvcm1hdCA9IG1hcEZsYXRwaWNrckRhdGVGb3JtYXRXaXRoRmllbGRUeXBlKHRoaXMuY29sdW1uRGVmLnR5cGUgfHwgRmllbGRUeXBlLmRhdGVJc28pO1xyXG4gICAgICBjb25zdCBvdXRwdXRGb3JtYXQgPSBtYXBGbGF0cGlja3JEYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSh0aGlzLmNvbHVtbkRlZi5vdXRwdXRUeXBlIHx8IEZpZWxkVHlwZS5kYXRlVXRjKTtcclxuICAgICAgbGV0IGN1cnJlbnRMb2NhbGUgPSB0aGlzLmdldEN1cnJlbnRMb2NhbGUodGhpcy5jb2x1bW5EZWYsIGdyaWRPcHRpb25zKTtcclxuICAgICAgaWYgKGN1cnJlbnRMb2NhbGUubGVuZ3RoID4gMikge1xyXG4gICAgICAgIGN1cnJlbnRMb2NhbGUgPSBjdXJyZW50TG9jYWxlLnN1YnN0cmluZygwLCAyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcGlja2VyT3B0aW9uczogYW55ID0ge1xyXG4gICAgICAgIGRlZmF1bHREYXRlOiB0aGlzLmRlZmF1bHREYXRlLFxyXG4gICAgICAgIGFsdElucHV0OiB0cnVlLFxyXG4gICAgICAgIGFsdElucHV0Q2xhc3M6ICdmbGF0cGlja3ItYWx0LWlucHV0JyxcclxuICAgICAgICBhbHRGb3JtYXQ6IGlucHV0Rm9ybWF0LFxyXG4gICAgICAgIGRhdGVGb3JtYXQ6IG91dHB1dEZvcm1hdCxcclxuICAgICAgICBjbG9zZU9uU2VsZWN0OiBmYWxzZSxcclxuICAgICAgICBsb2NhbGU6IChjdXJyZW50TG9jYWxlICE9PSAnZW4nKSA/IHRoaXMubG9hZEZsYXRwaWNrckxvY2FsZShjdXJyZW50TG9jYWxlKSA6ICdlbicsXHJcbiAgICAgICAgb25DaGFuZ2U6IChzZWxlY3RlZERhdGVzOiBhbnlbXSB8IGFueSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNhdmUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gbWVyZ2Ugb3B0aW9ucyB3aXRoIG9wdGlvbmFsIHVzZXIncyBjdXN0b20gb3B0aW9uc1xyXG4gICAgICBjb25zdCBwaWNrZXJNZXJnZWRPcHRpb25zID0geyAuLi5waWNrZXJPcHRpb25zLCAuLi50aGlzLmVkaXRvck9wdGlvbnMgfTtcclxuICAgICAgY29uc3QgaW5wdXRDc3NDbGFzc2VzID0gYC5lZGl0b3ItdGV4dC5lZGl0b3ItJHtjb2x1bW5JZH0uZmxhdHBpY2tyYDtcclxuXHJcbiAgICAgIHRoaXMuJGlucHV0ID0gJChgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgZGF0YS1kZWZhdWx0RGF0ZT1cIiR7dGhpcy5kZWZhdWx0RGF0ZX1cIiBjbGFzcz1cIiR7aW5wdXRDc3NDbGFzc2VzLnJlcGxhY2UoL1xcLi9nLCAnICcpfVwiIHBsYWNlaG9sZGVyPVwiJHtwbGFjZWhvbGRlcn1cIiB0aXRsZT1cIiR7dGl0bGV9XCIgLz5gKTtcclxuICAgICAgdGhpcy4kaW5wdXQuYXBwZW5kVG8odGhpcy5hcmdzLmNvbnRhaW5lcik7XHJcbiAgICAgIHRoaXMuZmxhdEluc3RhbmNlID0gKHRoaXMuJGlucHV0WzBdICYmIHR5cGVvZiB0aGlzLiRpbnB1dFswXS5mbGF0cGlja3IgPT09ICdmdW5jdGlvbicpID8gdGhpcy4kaW5wdXRbMF0uZmxhdHBpY2tyKHBpY2tlck1lcmdlZE9wdGlvbnMpIDogbnVsbDtcclxuXHJcbiAgICAgIC8vIHdoZW4gd2UncmUgdXNpbmcgYW4gYWx0ZXJuYXRlIGlucHV0IHRvIGRpc3BsYXkgZGF0YSwgd2UnbGwgY29uc2lkZXIgdGhpcyBpbnB1dCBhcyB0aGUgb25lIHRvIGRvIHRoZSBmb2N1cyBsYXRlciBvblxyXG4gICAgICAvLyBlbHNlIGp1c3QgdXNlIHRoZSB0b3Agb25lXHJcbiAgICAgIHRoaXMuXyRpbnB1dFdpdGhEYXRhID0gKHBpY2tlck1lcmdlZE9wdGlvbnMgJiYgcGlja2VyTWVyZ2VkT3B0aW9ucy5hbHRJbnB1dCkgPyAkKGAke2lucHV0Q3NzQ2xhc3Nlc30uZmxhdHBpY2tyLWFsdC1pbnB1dGApIDogdGhpcy4kaW5wdXQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRDdXJyZW50TG9jYWxlKGNvbHVtbkRlZjogQ29sdW1uLCBncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IGdyaWRPcHRpb25zIHx8IGNvbHVtbkRlZi5wYXJhbXMgfHwge307XHJcbiAgICBpZiAob3B0aW9ucy5pMThuICYmIG9wdGlvbnMuaTE4biBpbnN0YW5jZW9mIFRyYW5zbGF0ZVNlcnZpY2UpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMuaTE4bi5jdXJyZW50TGFuZztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJ2VuJztcclxuICB9XHJcblxyXG4gIGxvYWRGbGF0cGlja3JMb2NhbGUobG9jYWxlOiBzdHJpbmcpIHtcclxuICAgIC8vIGNoYW5nZSBsb2NhbGUgaWYgbmVlZGVkLCBGbGF0cGlja3IgcmVmZXJlbmNlOiBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvbG9jYWxpemF0aW9uL1xyXG4gICAgY29uc3QgZ3JpZE9wdGlvbnMgPSB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmdyaWQgJiYgdGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpO1xyXG4gICAgaWYgKGdyaWRPcHRpb25zICYmIGdyaWRPcHRpb25zLnBhcmFtcyAmJiBncmlkT3B0aW9ucy5wYXJhbXMuZmxhcGlja3JMb2NhbGUpIHtcclxuICAgICAgcmV0dXJuIGdyaWRPcHRpb25zLnBhcmFtcy5mbGFwaWNrckxvY2FsZTtcclxuICAgIH0gZWxzZSBpZiAobG9jYWxlICE9PSAnZW4nKSB7XHJcbiAgICAgIGNvbnN0IGxvY2FsZURlZmF1bHQ6IGFueSA9IHJlcXVpcmUoYGZsYXRwaWNrci9kaXN0L2wxMG4vJHtsb2NhbGV9LmpzYCkuZGVmYXVsdDtcclxuICAgICAgcmV0dXJuIChsb2NhbGVEZWZhdWx0ICYmIGxvY2FsZURlZmF1bHRbbG9jYWxlXSkgPyBsb2NhbGVEZWZhdWx0W2xvY2FsZV0gOiAnZW4nO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICdlbic7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5oaWRlKCk7XHJcbiAgICB0aGlzLiRpbnB1dC5yZW1vdmUoKTtcclxuICAgIGlmICh0aGlzLl8kaW5wdXRXaXRoRGF0YSAmJiB0eXBlb2YgdGhpcy5fJGlucHV0V2l0aERhdGEucmVtb3ZlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuXyRpbnB1dFdpdGhEYXRhLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2hvdygpIHtcclxuICAgIGlmICh0aGlzLmZsYXRJbnN0YW5jZSAmJiB0eXBlb2YgdGhpcy5mbGF0SW5zdGFuY2Uub3BlbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLmZsYXRJbnN0YW5jZS5vcGVuKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaWRlKCkge1xyXG4gICAgaWYgKHRoaXMuZmxhdEluc3RhbmNlICYmIHR5cGVvZiB0aGlzLmZsYXRJbnN0YW5jZS5jbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLmZsYXRJbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9jdXMoKSB7XHJcbiAgICBpZiAodGhpcy5fJGlucHV0V2l0aERhdGEgJiYgdGhpcy5fJGlucHV0V2l0aERhdGEuZm9jdXMpIHtcclxuICAgICAgdGhpcy5fJGlucHV0V2l0aERhdGEuZm9jdXMoKS5zZWxlY3QoKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy4kaW5wdXQgJiYgdGhpcy4kaW5wdXQuZm9jdXMpIHtcclxuICAgICAgdGhpcy4kaW5wdXQuZm9jdXMoKS5zZWxlY3QoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNhdmUoKSB7XHJcbiAgICAvLyBhdXRvY29tbWl0IHdpbGwgbm90IGZvY3VzIHRoZSBuZXh0IGVkaXRvclxyXG4gICAgY29uc3QgdmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUoKTtcclxuICAgIGlmICh2YWxpZGF0aW9uICYmIHZhbGlkYXRpb24udmFsaWQpIHtcclxuICAgICAgaWYgKHRoaXMuYXJncy5ncmlkLmdldE9wdGlvbnMoKS5hdXRvQ29tbWl0RWRpdCkge1xyXG4gICAgICAgIHRoaXMuYXJncy5ncmlkLmdldEVkaXRvckxvY2soKS5jb21taXRDdXJyZW50RWRpdCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYXJncy5jb21taXRDaGFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldENvbHVtbkVkaXRvcigpIHtcclxuICAgIHJldHVybiB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbHVtbiAmJiB0aGlzLmFyZ3MuY29sdW1uLmludGVybmFsQ29sdW1uRWRpdG9yICYmIHRoaXMuYXJncy5jb2x1bW4uaW50ZXJuYWxDb2x1bW5FZGl0b3I7XHJcbiAgfVxyXG5cclxuICBsb2FkVmFsdWUoaXRlbTogYW55KSB7XHJcbiAgICBjb25zdCBmaWVsZE5hbWUgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWVsZDtcclxuXHJcbiAgICAvLyB3aGVuIGl0J3MgYSBjb21wbGV4IG9iamVjdCwgdGhlbiBwdWxsIHRoZSBvYmplY3QgbmFtZSBvbmx5LCBlLmcuOiBcInVzZXIuZmlyc3ROYW1lXCIgPT4gXCJ1c2VyXCJcclxuICAgIGNvbnN0IGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0ID0gZmllbGROYW1lLmluZGV4T2YoJy4nKSA/IGZpZWxkTmFtZS5zdWJzdHJpbmcoMCwgZmllbGROYW1lLmluZGV4T2YoJy4nKSkgOiAnJztcclxuXHJcbiAgICBpZiAoaXRlbSAmJiB0aGlzLmNvbHVtbkRlZiAmJiAoaXRlbS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWUpIHx8IGl0ZW0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QpKSkge1xyXG4gICAgICB0aGlzLmRlZmF1bHREYXRlID0gaXRlbVtmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCB8fCBmaWVsZE5hbWVdO1xyXG4gICAgICB0aGlzLmZsYXRJbnN0YW5jZS5zZXREYXRlKGl0ZW1bdGhpcy5hcmdzLmNvbHVtbi5maWVsZF0pO1xyXG4gICAgICB0aGlzLmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXJpYWxpemVWYWx1ZSgpIHtcclxuICAgIGNvbnN0IGRvbVZhbHVlOiBzdHJpbmcgPSB0aGlzLiRpbnB1dC52YWwoKTtcclxuXHJcbiAgICBpZiAoIWRvbVZhbHVlKSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvdXRwdXRGb3JtYXQgPSBtYXBNb21lbnREYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSh0aGlzLmFyZ3MuY29sdW1uLnR5cGUgfHwgRmllbGRUeXBlLmRhdGVJc28pO1xyXG4gICAgY29uc3QgdmFsdWUgPSBtb21lbnQoZG9tVmFsdWUpLmZvcm1hdChvdXRwdXRGb3JtYXQpO1xyXG5cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGFwcGx5VmFsdWUoaXRlbTogYW55LCBzdGF0ZTogYW55KSB7XHJcbiAgICBjb25zdCBmaWVsZE5hbWUgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWVsZDtcclxuICAgIGNvbnN0IG91dHB1dEZvcm1hdCA9IG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlKHRoaXMuYXJncy5jb2x1bW4udHlwZSB8fCBGaWVsZFR5cGUuZGF0ZUlzbyk7XHJcblxyXG4gICAgLy8gd2hlbiBpdCdzIGEgY29tcGxleCBvYmplY3QsIHRoZW4gcHVsbCB0aGUgb2JqZWN0IG5hbWUgb25seSwgZS5nLjogXCJ1c2VyLmZpcnN0TmFtZVwiID0+IFwidXNlclwiXHJcbiAgICBjb25zdCBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCA9IGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGZpZWxkTmFtZS5pbmRleE9mKCcuJykpIDogJyc7XHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHN0YXRlID8gbW9tZW50KHN0YXRlLCBvdXRwdXRGb3JtYXQpLnRvRGF0ZSgpIDogJyc7XHJcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZShuZXdWYWx1ZSk7XHJcbiAgICBpdGVtW2ZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0IHx8IGZpZWxkTmFtZV0gPSAodmFsaWRhdGlvbiAmJiB2YWxpZGF0aW9uLnZhbGlkKSA/IG5ld1ZhbHVlIDogJyc7XHJcbiAgfVxyXG5cclxuICBpc1ZhbHVlQ2hhbmdlZCgpIHtcclxuICAgIHJldHVybiAoISh0aGlzLiRpbnB1dC52YWwoKSA9PT0gJycgJiYgdGhpcy5kZWZhdWx0RGF0ZSA9PSBudWxsKSkgJiYgKHRoaXMuJGlucHV0LnZhbCgpICE9PSB0aGlzLmRlZmF1bHREYXRlKTtcclxuICB9XHJcblxyXG4gIHZhbGlkYXRlKGlucHV0VmFsdWU/OiBhbnkpOiBFZGl0b3JWYWxpZGF0b3JPdXRwdXQge1xyXG4gICAgY29uc3QgaXNSZXF1aXJlZCA9IHRoaXMuY29sdW1uRWRpdG9yLnJlcXVpcmVkO1xyXG4gICAgY29uc3QgZWxtVmFsdWUgPSAoaW5wdXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSA/IGlucHV0VmFsdWUgOiB0aGlzLiRpbnB1dCAmJiB0aGlzLiRpbnB1dC52YWwgJiYgdGhpcy4kaW5wdXQudmFsKCk7XHJcbiAgICBjb25zdCBlcnJvck1zZyA9IHRoaXMuY29sdW1uRWRpdG9yLmVycm9yTWVzc2FnZTtcclxuXHJcbiAgICBpZiAodGhpcy52YWxpZGF0b3IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yKGVsbVZhbHVlLCB0aGlzLmFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGJ5IGRlZmF1bHQgdGhlIGVkaXRvciBpcyBhbG1vc3QgYWx3YXlzIHZhbGlkIChleGNlcHQgd2hlbiBpdCdzIHJlcXVpcmVkIGJ1dCBub3QgcHJvdmlkZWQpXHJcbiAgICBpZiAoaXNSZXF1aXJlZCAmJiBlbG1WYWx1ZSA9PT0gJycpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB2YWxpZDogZmFsc2UsXHJcbiAgICAgICAgbXNnOiBlcnJvck1zZyB8fCBDb25zdGFudHMuVkFMSURBVElPTl9SRVFVSVJFRF9GSUVMRFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHZhbGlkOiB0cnVlLFxyXG4gICAgICBtc2c6IG51bGxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==