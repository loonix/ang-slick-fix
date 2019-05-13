/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Constants } from '../constants';
import { KeyCode } from './../models/index';
/** @type {?} */
const DEFAULT_MIN_VALUE = 0;
/** @type {?} */
const DEFAULT_MAX_VALUE = 100;
/** @type {?} */
const DEFAULT_STEP = 1;
export class SliderEditor {
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
     * Getter for the Editor Generic Params
     * @private
     * @return {?}
     */
    get editorParams() {
        return this.columnEditor.params || {};
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
        const container = this.args && this.args.container;
        // define the input & slider number IDs
        /** @type {?} */
        const itemId = this.args && this.args.item && this.args.item.id;
        this._elementRangeInputId = `rangeInput_${this.columnDef.field}_${itemId}`;
        this._elementRangeOutputId = `rangeOutput_${this.columnDef.field}_${itemId}`;
        // create HTML string template
        /** @type {?} */
        const editorTemplate = this.buildTemplateHtmlString();
        this.$editorElm = $(editorTemplate);
        this.$input = this.$editorElm.children('input');
        this.$sliderNumber = this.$editorElm.children('div.input-group-addon.input-group-append').children();
        // watch on change event
        this.$editorElm
            .appendTo(container)
            .on('mouseup', (/**
         * @return {?}
         */
        () => this.save()));
        // if user chose to display the slider number on the right side, then update it every time it changes
        // we need to use both "input" and "change" event to be all cross-browser
        if (!this.editorParams.hideSliderNumber) {
            this.$editorElm.on('input change', (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                this._lastInputEvent = event;
                /** @type {?} */
                const value = event && event.target && event.target.value || '';
                if (value) {
                    document.getElementById(this._elementRangeOutputId).innerHTML = event.target.value;
                }
            }));
        }
    }
    /**
     * @return {?}
     */
    destroy() {
        this.$editorElm.off('input change mouseup').remove();
    }
    /**
     * @return {?}
     */
    focus() {
        this.$editorElm.focus();
    }
    /**
     * @return {?}
     */
    save() {
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
    cancel() {
        this.$input.val(this.defaultValue);
        this.args.cancelChanges();
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
            this.$input.val(this.defaultValue);
            this.$input[0].defaultValue = this.defaultValue;
            this.$sliderNumber.html(this.defaultValue);
        }
    }
    /**
     * @return {?}
     */
    serializeValue() {
        return parseInt((/** @type {?} */ (this.$input.val())), 10) || 0;
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
     * @param {?=} inputValue
     * @return {?}
     */
    validate(inputValue) {
        /** @type {?} */
        const elmValue = (inputValue !== undefined) ? inputValue : this.$input && this.$input.val && this.$input.val();
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
            '{{maxValue}}': maxValue
        };
        if (this.validator) {
            return this.validator(elmValue, this.args);
        }
        else if (isRequired && elmValue === '') {
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_REQUIRED_FIELD
            };
        }
        else if (minValue !== undefined && (elmValue < minValue || elmValue > maxValue)) {
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_EDITOR_NUMBER_BETWEEN.replace(/{{minValue}}|{{maxValue}}/gi, (/**
                 * @param {?} matched
                 * @return {?}
                 */
                (matched) => {
                    return mapValidation[matched];
                }))
            };
        }
        return {
            valid: true,
            msg: null
        };
    }
    //
    // private functions
    // ------------------
    /**
     * Create the HTML template as a string
     * @private
     * @return {?}
     */
    buildTemplateHtmlString() {
        /** @type {?} */
        const fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        const title = this.columnEditor && this.columnEditor.title || '';
        /** @type {?} */
        const minValue = this.columnEditor.hasOwnProperty('minValue') ? this.columnEditor.minValue : DEFAULT_MIN_VALUE;
        /** @type {?} */
        const maxValue = this.columnEditor.hasOwnProperty('maxValue') ? this.columnEditor.maxValue : DEFAULT_MAX_VALUE;
        /** @type {?} */
        const defaultValue = this.editorParams.hasOwnProperty('sliderStartValue') ? this.editorParams.sliderStartValue : minValue;
        /** @type {?} */
        const step = this.columnEditor.hasOwnProperty('valueStep') ? this.columnEditor.valueStep : DEFAULT_STEP;
        if (this.editorParams.hideSliderNumber) {
            return `
      <div class="slider-editor">
        <input type="range" id="${this._elementRangeInputId}"
          name="${this._elementRangeInputId}"
          title="${title}"
          defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-editor-input editor-${fieldId} range" />
      </div>`;
        }
        return `
      <div class="input-group slider-editor">
        <input type="range" id="${this._elementRangeInputId}"
          name="${this._elementRangeInputId}"
          title="${title}"
          defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-editor-input editor-${fieldId} range" />
        <div class="input-group-addon input-group-append slider-value"><span class="input-group-text" id="${this._elementRangeOutputId}">${defaultValue}</span></div>
      </div>`;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    SliderEditor.prototype._lastInputEvent;
    /**
     * @type {?}
     * @private
     */
    SliderEditor.prototype._elementRangeInputId;
    /**
     * @type {?}
     * @private
     */
    SliderEditor.prototype._elementRangeOutputId;
    /** @type {?} */
    SliderEditor.prototype.$editorElm;
    /** @type {?} */
    SliderEditor.prototype.$input;
    /** @type {?} */
    SliderEditor.prototype.$sliderNumber;
    /** @type {?} */
    SliderEditor.prototype.defaultValue;
    /**
     * @type {?}
     * @private
     */
    SliderEditor.prototype.args;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyRWRpdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9lZGl0b3JzL3NsaWRlckVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQTBELE9BQU8sRUFBZ0IsTUFBTSxtQkFBbUIsQ0FBQzs7TUFLNUcsaUJBQWlCLEdBQUcsQ0FBQzs7TUFDckIsaUJBQWlCLEdBQUcsR0FBRzs7TUFDdkIsWUFBWSxHQUFHLENBQUM7QUFFdEIsTUFBTSxPQUFPLFlBQVk7Ozs7SUFTdkIsWUFBb0IsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7UUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFHRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO0lBQzdDLENBQUM7Ozs7O0lBR0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLElBQUksRUFBRSxDQUFDO0lBQ3JFLENBQUM7Ozs7OztJQUdELElBQVksWUFBWTtRQUN0QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUN4QyxDQUFDOzs7OztJQUdELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFDakUsQ0FBQzs7OztJQUVELElBQUk7O2NBQ0ksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTOzs7Y0FHNUMs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LFlBQVksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxpQkFBaUI7O2NBQ3hHLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxRQUFROztjQUNuSCxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxZQUFZO1FBRXZHLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN0QyxPQUFPOztrQ0FFcUIsSUFBSSxDQUFDLG9CQUFvQjtrQkFDekMsSUFBSSxDQUFDLG9CQUFvQjttQkFDeEIsS0FBSzswQkFDRSxZQUFZLFVBQVUsUUFBUSxVQUFVLFFBQVEsV0FBVyxJQUFJOzJEQUM5QixPQUFPO2FBQ3JELENBQUM7U0FDVDtRQUVELE9BQU87O2tDQUV1QixJQUFJLENBQUMsb0JBQW9CO2tCQUN6QyxJQUFJLENBQUMsb0JBQW9CO21CQUN4QixLQUFLOzBCQUNFLFlBQVksVUFBVSxRQUFRLFVBQVUsUUFBUSxXQUFXLElBQUk7MkRBQzlCLE9BQU87NEdBQzBDLElBQUksQ0FBQyxxQkFBcUIsS0FBSyxZQUFZO2FBQzFJLENBQUM7SUFDWixDQUFDO0NBQ0Y7Ozs7OztJQWxNQyx1Q0FBdUM7Ozs7O0lBQ3ZDLDRDQUFxQzs7Ozs7SUFDckMsNkNBQXNDOztJQUN0QyxrQ0FBZ0I7O0lBQ2hCLDhCQUFZOztJQUNaLHFDQUFtQjs7SUFDbkIsb0NBQWtCOzs7OztJQUVOLDRCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IENvbHVtbiwgRWRpdG9yLCBFZGl0b3JWYWxpZGF0b3IsIEVkaXRvclZhbGlkYXRvck91dHB1dCwgS2V5Q29kZSwgQ29sdW1uRWRpdG9yIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG5jb25zdCBERUZBVUxUX01JTl9WQUxVRSA9IDA7XHJcbmNvbnN0IERFRkFVTFRfTUFYX1ZBTFVFID0gMTAwO1xyXG5jb25zdCBERUZBVUxUX1NURVAgPSAxO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNsaWRlckVkaXRvciBpbXBsZW1lbnRzIEVkaXRvciB7XHJcbiAgcHJpdmF0ZSBfbGFzdElucHV0RXZlbnQ6IEtleWJvYXJkRXZlbnQ7XHJcbiAgcHJpdmF0ZSBfZWxlbWVudFJhbmdlSW5wdXRJZDogc3RyaW5nO1xyXG4gIHByaXZhdGUgX2VsZW1lbnRSYW5nZU91dHB1dElkOiBzdHJpbmc7XHJcbiAgJGVkaXRvckVsbTogYW55O1xyXG4gICRpbnB1dDogYW55O1xyXG4gICRzbGlkZXJOdW1iZXI6IGFueTtcclxuICBkZWZhdWx0VmFsdWU6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcmdzOiBhbnkpIHtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBDb2x1bW4gRGVmaW5pdGlvbiBvYmplY3QgKi9cclxuICBnZXQgY29sdW1uRGVmKCk6IENvbHVtbiB7XHJcbiAgICByZXR1cm4gdGhpcy5hcmdzICYmIHRoaXMuYXJncy5jb2x1bW4gfHwge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IENvbHVtbiBFZGl0b3Igb2JqZWN0ICovXHJcbiAgZ2V0IGNvbHVtbkVkaXRvcigpOiBDb2x1bW5FZGl0b3Ige1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEVkaXRvciBHZW5lcmljIFBhcmFtcyAqL1xyXG4gIHByaXZhdGUgZ2V0IGVkaXRvclBhcmFtcygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRWRpdG9yLnBhcmFtcyB8fCB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIFZhbGlkYXRvciBmdW5jdGlvbiwgY2FuIGJlIHBhc3NlZCBpbiBFZGl0b3IgcHJvcGVydHkgb3IgQ29sdW1uIERlZmluaXRpb24gKi9cclxuICBnZXQgdmFsaWRhdG9yKCk6IEVkaXRvclZhbGlkYXRvciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5FZGl0b3IudmFsaWRhdG9yIHx8IHRoaXMuY29sdW1uRGVmLnZhbGlkYXRvcjtcclxuICB9XHJcblxyXG4gIGluaXQoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbnRhaW5lcjtcclxuXHJcbiAgICAvLyBkZWZpbmUgdGhlIGlucHV0ICYgc2xpZGVyIG51bWJlciBJRHNcclxuICAgIGNvbnN0IGl0ZW1JZCA9IHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuaXRlbSAmJiB0aGlzLmFyZ3MuaXRlbS5pZDtcclxuICAgIHRoaXMuX2VsZW1lbnRSYW5nZUlucHV0SWQgPSBgcmFuZ2VJbnB1dF8ke3RoaXMuY29sdW1uRGVmLmZpZWxkfV8ke2l0ZW1JZH1gO1xyXG4gICAgdGhpcy5fZWxlbWVudFJhbmdlT3V0cHV0SWQgPSBgcmFuZ2VPdXRwdXRfJHt0aGlzLmNvbHVtbkRlZi5maWVsZH1fJHtpdGVtSWR9YDtcclxuXHJcbiAgICAvLyBjcmVhdGUgSFRNTCBzdHJpbmcgdGVtcGxhdGVcclxuICAgIGNvbnN0IGVkaXRvclRlbXBsYXRlID0gdGhpcy5idWlsZFRlbXBsYXRlSHRtbFN0cmluZygpO1xyXG4gICAgdGhpcy4kZWRpdG9yRWxtID0gJChlZGl0b3JUZW1wbGF0ZSk7XHJcbiAgICB0aGlzLiRpbnB1dCA9IHRoaXMuJGVkaXRvckVsbS5jaGlsZHJlbignaW5wdXQnKTtcclxuICAgIHRoaXMuJHNsaWRlck51bWJlciA9IHRoaXMuJGVkaXRvckVsbS5jaGlsZHJlbignZGl2LmlucHV0LWdyb3VwLWFkZG9uLmlucHV0LWdyb3VwLWFwcGVuZCcpLmNoaWxkcmVuKCk7XHJcblxyXG4gICAgLy8gd2F0Y2ggb24gY2hhbmdlIGV2ZW50XHJcbiAgICB0aGlzLiRlZGl0b3JFbG1cclxuICAgICAgLmFwcGVuZFRvKGNvbnRhaW5lcilcclxuICAgICAgLm9uKCdtb3VzZXVwJywgKCkgPT4gdGhpcy5zYXZlKCkpO1xyXG5cclxuICAgIC8vIGlmIHVzZXIgY2hvc2UgdG8gZGlzcGxheSB0aGUgc2xpZGVyIG51bWJlciBvbiB0aGUgcmlnaHQgc2lkZSwgdGhlbiB1cGRhdGUgaXQgZXZlcnkgdGltZSBpdCBjaGFuZ2VzXHJcbiAgICAvLyB3ZSBuZWVkIHRvIHVzZSBib3RoIFwiaW5wdXRcIiBhbmQgXCJjaGFuZ2VcIiBldmVudCB0byBiZSBhbGwgY3Jvc3MtYnJvd3NlclxyXG4gICAgaWYgKCF0aGlzLmVkaXRvclBhcmFtcy5oaWRlU2xpZGVyTnVtYmVyKSB7XHJcbiAgICAgIHRoaXMuJGVkaXRvckVsbS5vbignaW5wdXQgY2hhbmdlJywgKGV2ZW50OiBLZXlib2FyZEV2ZW50ICYgeyB0YXJnZXQ6IEhUTUxJbnB1dEVsZW1lbnQgfSkgPT4ge1xyXG4gICAgICAgIHRoaXMuX2xhc3RJbnB1dEV2ZW50ID0gZXZlbnQ7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnZhbHVlIHx8ICcnO1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5fZWxlbWVudFJhbmdlT3V0cHV0SWQpLmlubmVySFRNTCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuJGVkaXRvckVsbS5vZmYoJ2lucHV0IGNoYW5nZSBtb3VzZXVwJykucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICBmb2N1cygpIHtcclxuICAgIHRoaXMuJGVkaXRvckVsbS5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZSgpIHtcclxuICAgIGNvbnN0IHZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKCk7XHJcbiAgICBpZiAodmFsaWRhdGlvbiAmJiB2YWxpZGF0aW9uLnZhbGlkKSB7XHJcbiAgICAgIGlmICh0aGlzLmFyZ3MuZ3JpZC5nZXRPcHRpb25zKCkuYXV0b0NvbW1pdEVkaXQpIHtcclxuICAgICAgICB0aGlzLmFyZ3MuZ3JpZC5nZXRFZGl0b3JMb2NrKCkuY29tbWl0Q3VycmVudEVkaXQoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmFyZ3MuY29tbWl0Q2hhbmdlcygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjYW5jZWwoKSB7XHJcbiAgICB0aGlzLiRpbnB1dC52YWwodGhpcy5kZWZhdWx0VmFsdWUpO1xyXG4gICAgdGhpcy5hcmdzLmNhbmNlbENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIGxvYWRWYWx1ZShpdGVtOiBhbnkpIHtcclxuICAgIGNvbnN0IGZpZWxkTmFtZSA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpZWxkO1xyXG5cclxuICAgIC8vIHdoZW4gaXQncyBhIGNvbXBsZXggb2JqZWN0LCB0aGVuIHB1bGwgdGhlIG9iamVjdCBuYW1lIG9ubHksIGUuZy46IFwidXNlci5maXJzdE5hbWVcIiA9PiBcInVzZXJcIlxyXG4gICAgY29uc3QgZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgPSBmaWVsZE5hbWUuaW5kZXhPZignLicpID8gZmllbGROYW1lLnN1YnN0cmluZygwLCBmaWVsZE5hbWUuaW5kZXhPZignLicpKSA6ICcnO1xyXG5cclxuICAgIGlmIChpdGVtICYmIHRoaXMuY29sdW1uRGVmICYmIChpdGVtLmhhc093blByb3BlcnR5KGZpZWxkTmFtZSkgfHwgaXRlbS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCkpKSB7XHJcbiAgICAgIHRoaXMuZGVmYXVsdFZhbHVlID0gaXRlbVtmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCB8fCBmaWVsZE5hbWVdO1xyXG4gICAgICB0aGlzLiRpbnB1dC52YWwodGhpcy5kZWZhdWx0VmFsdWUpO1xyXG4gICAgICB0aGlzLiRpbnB1dFswXS5kZWZhdWx0VmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZTtcclxuICAgICAgdGhpcy4kc2xpZGVyTnVtYmVyLmh0bWwodGhpcy5kZWZhdWx0VmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2VyaWFsaXplVmFsdWUoKSB7XHJcbiAgICByZXR1cm4gcGFyc2VJbnQodGhpcy4kaW5wdXQudmFsKCkgYXMgc3RyaW5nLCAxMCkgfHwgMDtcclxuICB9XHJcblxyXG4gIGFwcGx5VmFsdWUoaXRlbTogYW55LCBzdGF0ZTogYW55KSB7XHJcbiAgICBjb25zdCBmaWVsZE5hbWUgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWVsZDtcclxuICAgIC8vIHdoZW4gaXQncyBhIGNvbXBsZXggb2JqZWN0LCB0aGVuIHB1bGwgdGhlIG9iamVjdCBuYW1lIG9ubHksIGUuZy46IFwidXNlci5maXJzdE5hbWVcIiA9PiBcInVzZXJcIlxyXG4gICAgY29uc3QgZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgPSBmaWVsZE5hbWUuaW5kZXhPZignLicpID8gZmllbGROYW1lLnN1YnN0cmluZygwLCBmaWVsZE5hbWUuaW5kZXhPZignLicpKSA6ICcnO1xyXG4gICAgY29uc3QgdmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUoc3RhdGUpO1xyXG4gICAgaXRlbVtmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCB8fCBmaWVsZE5hbWVdID0gKHZhbGlkYXRpb24gJiYgdmFsaWRhdGlvbi52YWxpZCkgPyBzdGF0ZSA6ICcnO1xyXG4gIH1cclxuXHJcbiAgaXNWYWx1ZUNoYW5nZWQoKSB7XHJcbiAgICBjb25zdCBlbG1WYWx1ZSA9IHRoaXMuJGlucHV0LnZhbCgpO1xyXG4gICAgY29uc3QgbGFzdEV2ZW50ID0gdGhpcy5fbGFzdElucHV0RXZlbnQgJiYgdGhpcy5fbGFzdElucHV0RXZlbnQua2V5Q29kZTtcclxuICAgIGlmICh0aGlzLmNvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkVkaXRvci5hbHdheXNTYXZlT25FbnRlcktleSAmJiBsYXN0RXZlbnQgPT09IEtleUNvZGUuRU5URVIpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKCEoZWxtVmFsdWUgPT09ICcnICYmIHRoaXMuZGVmYXVsdFZhbHVlID09PSBudWxsKSkgJiYgKGVsbVZhbHVlICE9PSB0aGlzLmRlZmF1bHRWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZShpbnB1dFZhbHVlPzogYW55KTogRWRpdG9yVmFsaWRhdG9yT3V0cHV0IHtcclxuICAgIGNvbnN0IGVsbVZhbHVlID0gKGlucHV0VmFsdWUgIT09IHVuZGVmaW5lZCkgPyBpbnB1dFZhbHVlIDogdGhpcy4kaW5wdXQgJiYgdGhpcy4kaW5wdXQudmFsICYmIHRoaXMuJGlucHV0LnZhbCgpO1xyXG4gICAgY29uc3QgaXNSZXF1aXJlZCA9IHRoaXMuY29sdW1uRWRpdG9yLnJlcXVpcmVkO1xyXG4gICAgY29uc3QgbWluVmFsdWUgPSB0aGlzLmNvbHVtbkVkaXRvci5taW5WYWx1ZTtcclxuICAgIGNvbnN0IG1heFZhbHVlID0gdGhpcy5jb2x1bW5FZGl0b3IubWF4VmFsdWU7XHJcbiAgICBjb25zdCBlcnJvck1zZyA9IHRoaXMuY29sdW1uRWRpdG9yLmVycm9yTWVzc2FnZTtcclxuICAgIGNvbnN0IG1hcFZhbGlkYXRpb24gPSB7XHJcbiAgICAgICd7e21pblZhbHVlfX0nOiBtaW5WYWx1ZSxcclxuICAgICAgJ3t7bWF4VmFsdWV9fSc6IG1heFZhbHVlXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0aGlzLnZhbGlkYXRvcikge1xyXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IoZWxtVmFsdWUsIHRoaXMuYXJncyk7XHJcbiAgICB9IGVsc2UgaWYgKGlzUmVxdWlyZWQgJiYgZWxtVmFsdWUgPT09ICcnKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdmFsaWQ6IGZhbHNlLFxyXG4gICAgICAgIG1zZzogZXJyb3JNc2cgfHwgQ29uc3RhbnRzLlZBTElEQVRJT05fUkVRVUlSRURfRklFTERcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAobWluVmFsdWUgIT09IHVuZGVmaW5lZCAmJiAoZWxtVmFsdWUgPCBtaW5WYWx1ZSB8fCBlbG1WYWx1ZSA+IG1heFZhbHVlKSkge1xyXG4gICAgICAvLyB3aGVuIGRlY2ltYWwgdmFsdWUgaXMgYmlnZ2VyIHRoYW4gMCwgd2Ugb25seSBhY2NlcHQgdGhlIGRlY2ltYWwgdmFsdWVzIGFzIHRoYXQgdmFsdWUgc2V0XHJcbiAgICAgIC8vIGZvciBleGFtcGxlIGlmIHdlIHNldCBkZWNpbWFsUGxhY2VzIHRvIDIsIHdlIHdpbGwgb25seSBhY2NlcHQgbnVtYmVycyBiZXR3ZWVuIDAgYW5kIDIgZGVjaW1hbHNcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB2YWxpZDogZmFsc2UsXHJcbiAgICAgICAgbXNnOiBlcnJvck1zZyB8fCBDb25zdGFudHMuVkFMSURBVElPTl9FRElUT1JfTlVNQkVSX0JFVFdFRU4ucmVwbGFjZSgve3ttaW5WYWx1ZX19fHt7bWF4VmFsdWV9fS9naSwgKG1hdGNoZWQpID0+IHtcclxuICAgICAgICAgIHJldHVybiBtYXBWYWxpZGF0aW9uW21hdGNoZWRdO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdmFsaWQ6IHRydWUsXHJcbiAgICAgIG1zZzogbnVsbFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vXHJcbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIHRoZSBIVE1MIHRlbXBsYXRlIGFzIGEgc3RyaW5nXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBidWlsZFRlbXBsYXRlSHRtbFN0cmluZygpIHtcclxuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcclxuICAgIGNvbnN0IHRpdGxlID0gdGhpcy5jb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5FZGl0b3IudGl0bGUgfHwgJyc7XHJcbiAgICBjb25zdCBtaW5WYWx1ZSA9IHRoaXMuY29sdW1uRWRpdG9yLmhhc093blByb3BlcnR5KCdtaW5WYWx1ZScpID8gdGhpcy5jb2x1bW5FZGl0b3IubWluVmFsdWUgOiBERUZBVUxUX01JTl9WQUxVRTtcclxuICAgIGNvbnN0IG1heFZhbHVlID0gdGhpcy5jb2x1bW5FZGl0b3IuaGFzT3duUHJvcGVydHkoJ21heFZhbHVlJykgPyB0aGlzLmNvbHVtbkVkaXRvci5tYXhWYWx1ZSA6IERFRkFVTFRfTUFYX1ZBTFVFO1xyXG4gICAgY29uc3QgZGVmYXVsdFZhbHVlID0gdGhpcy5lZGl0b3JQYXJhbXMuaGFzT3duUHJvcGVydHkoJ3NsaWRlclN0YXJ0VmFsdWUnKSA/IHRoaXMuZWRpdG9yUGFyYW1zLnNsaWRlclN0YXJ0VmFsdWUgOiBtaW5WYWx1ZTtcclxuICAgIGNvbnN0IHN0ZXAgPSB0aGlzLmNvbHVtbkVkaXRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWVTdGVwJykgPyB0aGlzLmNvbHVtbkVkaXRvci52YWx1ZVN0ZXAgOiBERUZBVUxUX1NURVA7XHJcblxyXG4gICAgaWYgKHRoaXMuZWRpdG9yUGFyYW1zLmhpZGVTbGlkZXJOdW1iZXIpIHtcclxuICAgICAgcmV0dXJuIGBcclxuICAgICAgPGRpdiBjbGFzcz1cInNsaWRlci1lZGl0b3JcIj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgaWQ9XCIke3RoaXMuX2VsZW1lbnRSYW5nZUlucHV0SWR9XCJcclxuICAgICAgICAgIG5hbWU9XCIke3RoaXMuX2VsZW1lbnRSYW5nZUlucHV0SWR9XCJcclxuICAgICAgICAgIHRpdGxlPVwiJHt0aXRsZX1cIlxyXG4gICAgICAgICAgZGVmYXVsdFZhbHVlPVwiJHtkZWZhdWx0VmFsdWV9XCIgbWluPVwiJHttaW5WYWx1ZX1cIiBtYXg9XCIke21heFZhbHVlfVwiIHN0ZXA9XCIke3N0ZXB9XCJcclxuICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIHNsaWRlci1lZGl0b3ItaW5wdXQgZWRpdG9yLSR7ZmllbGRJZH0gcmFuZ2VcIiAvPlxyXG4gICAgICA8L2Rpdj5gO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBgXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBzbGlkZXItZWRpdG9yXCI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIGlkPVwiJHt0aGlzLl9lbGVtZW50UmFuZ2VJbnB1dElkfVwiXHJcbiAgICAgICAgICBuYW1lPVwiJHt0aGlzLl9lbGVtZW50UmFuZ2VJbnB1dElkfVwiXHJcbiAgICAgICAgICB0aXRsZT1cIiR7dGl0bGV9XCJcclxuICAgICAgICAgIGRlZmF1bHRWYWx1ZT1cIiR7ZGVmYXVsdFZhbHVlfVwiIG1pbj1cIiR7bWluVmFsdWV9XCIgbWF4PVwiJHttYXhWYWx1ZX1cIiBzdGVwPVwiJHtzdGVwfVwiXHJcbiAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBzbGlkZXItZWRpdG9yLWlucHV0IGVkaXRvci0ke2ZpZWxkSWR9IHJhbmdlXCIgLz5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaW5wdXQtZ3JvdXAtYXBwZW5kIHNsaWRlci12YWx1ZVwiPjxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiIGlkPVwiJHt0aGlzLl9lbGVtZW50UmFuZ2VPdXRwdXRJZH1cIj4ke2RlZmF1bHRWYWx1ZX08L3NwYW4+PC9kaXY+XHJcbiAgICAgIDwvZGl2PmA7XHJcbiAgfVxyXG59XHJcbiJdfQ==