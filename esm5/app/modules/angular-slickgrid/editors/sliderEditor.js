/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Constants } from '../constants';
import { KeyCode } from './../models/index';
/** @type {?} */
var DEFAULT_MIN_VALUE = 0;
/** @type {?} */
var DEFAULT_MAX_VALUE = 100;
/** @type {?} */
var DEFAULT_STEP = 1;
var SliderEditor = /** @class */ (function () {
    function SliderEditor(args) {
        this.args = args;
        this.init();
    }
    Object.defineProperty(SliderEditor.prototype, "columnDef", {
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
    Object.defineProperty(SliderEditor.prototype, "columnEditor", {
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
    Object.defineProperty(SliderEditor.prototype, "editorParams", {
        /** Getter for the Editor Generic Params */
        get: /**
         * Getter for the Editor Generic Params
         * @private
         * @return {?}
         */
        function () {
            return this.columnEditor.params || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderEditor.prototype, "validator", {
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
    SliderEditor.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var container = this.args && this.args.container;
        // define the input & slider number IDs
        /** @type {?} */
        var itemId = this.args && this.args.item && this.args.item.id;
        this._elementRangeInputId = "rangeInput_" + this.columnDef.field + "_" + itemId;
        this._elementRangeOutputId = "rangeOutput_" + this.columnDef.field + "_" + itemId;
        // create HTML string template
        /** @type {?} */
        var editorTemplate = this.buildTemplateHtmlString();
        this.$editorElm = $(editorTemplate);
        this.$input = this.$editorElm.children('input');
        this.$sliderNumber = this.$editorElm.children('div.input-group-addon.input-group-append').children();
        // watch on change event
        this.$editorElm
            .appendTo(container)
            .on('mouseup', (/**
         * @return {?}
         */
        function () { return _this.save(); }));
        // if user chose to display the slider number on the right side, then update it every time it changes
        // we need to use both "input" and "change" event to be all cross-browser
        if (!this.editorParams.hideSliderNumber) {
            this.$editorElm.on('input change', (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                _this._lastInputEvent = event;
                /** @type {?} */
                var value = event && event.target && event.target.value || '';
                if (value) {
                    document.getElementById(_this._elementRangeOutputId).innerHTML = event.target.value;
                }
            }));
        }
    };
    /**
     * @return {?}
     */
    SliderEditor.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.$editorElm.off('input change mouseup').remove();
    };
    /**
     * @return {?}
     */
    SliderEditor.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.$editorElm.focus();
    };
    /**
     * @return {?}
     */
    SliderEditor.prototype.save = /**
     * @return {?}
     */
    function () {
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
    SliderEditor.prototype.cancel = /**
     * @return {?}
     */
    function () {
        this.$input.val(this.defaultValue);
        this.args.cancelChanges();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    SliderEditor.prototype.loadValue = /**
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
            this.$input.val(this.defaultValue);
            this.$input[0].defaultValue = this.defaultValue;
            this.$sliderNumber.html(this.defaultValue);
        }
    };
    /**
     * @return {?}
     */
    SliderEditor.prototype.serializeValue = /**
     * @return {?}
     */
    function () {
        return parseInt((/** @type {?} */ (this.$input.val())), 10) || 0;
    };
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    SliderEditor.prototype.applyValue = /**
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
    SliderEditor.prototype.isValueChanged = /**
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
     * @param {?=} inputValue
     * @return {?}
     */
    SliderEditor.prototype.validate = /**
     * @param {?=} inputValue
     * @return {?}
     */
    function (inputValue) {
        /** @type {?} */
        var elmValue = (inputValue !== undefined) ? inputValue : this.$input && this.$input.val && this.$input.val();
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
                function (matched) {
                    return mapValidation[matched];
                }))
            };
        }
        return {
            valid: true,
            msg: null
        };
    };
    //
    // private functions
    // ------------------
    /**
     * Create the HTML template as a string
     */
    //
    // private functions
    // ------------------
    /**
     * Create the HTML template as a string
     * @private
     * @return {?}
     */
    SliderEditor.prototype.buildTemplateHtmlString = 
    //
    // private functions
    // ------------------
    /**
     * Create the HTML template as a string
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        var title = this.columnEditor && this.columnEditor.title || '';
        /** @type {?} */
        var minValue = this.columnEditor.hasOwnProperty('minValue') ? this.columnEditor.minValue : DEFAULT_MIN_VALUE;
        /** @type {?} */
        var maxValue = this.columnEditor.hasOwnProperty('maxValue') ? this.columnEditor.maxValue : DEFAULT_MAX_VALUE;
        /** @type {?} */
        var defaultValue = this.editorParams.hasOwnProperty('sliderStartValue') ? this.editorParams.sliderStartValue : minValue;
        /** @type {?} */
        var step = this.columnEditor.hasOwnProperty('valueStep') ? this.columnEditor.valueStep : DEFAULT_STEP;
        if (this.editorParams.hideSliderNumber) {
            return "\n      <div class=\"slider-editor\">\n        <input type=\"range\" id=\"" + this._elementRangeInputId + "\"\n          name=\"" + this._elementRangeInputId + "\"\n          title=\"" + title + "\"\n          defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n          class=\"form-control slider-editor-input editor-" + fieldId + " range\" />\n      </div>";
        }
        return "\n      <div class=\"input-group slider-editor\">\n        <input type=\"range\" id=\"" + this._elementRangeInputId + "\"\n          name=\"" + this._elementRangeInputId + "\"\n          title=\"" + title + "\"\n          defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n          class=\"form-control slider-editor-input editor-" + fieldId + " range\" />\n        <div class=\"input-group-addon input-group-append slider-value\"><span class=\"input-group-text\" id=\"" + this._elementRangeOutputId + "\">" + defaultValue + "</span></div>\n      </div>";
    };
    return SliderEditor;
}());
export { SliderEditor };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyRWRpdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9lZGl0b3JzL3NsaWRlckVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQTBELE9BQU8sRUFBZ0IsTUFBTSxtQkFBbUIsQ0FBQzs7SUFLNUcsaUJBQWlCLEdBQUcsQ0FBQzs7SUFDckIsaUJBQWlCLEdBQUcsR0FBRzs7SUFDdkIsWUFBWSxHQUFHLENBQUM7QUFFdEI7SUFTRSxzQkFBb0IsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7UUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUdELHNCQUFJLG1DQUFTO1FBRGIsbUNBQW1DOzs7OztRQUNuQztZQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDN0MsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSxzQ0FBWTtRQURoQiwrQkFBK0I7Ozs7O1FBQy9CO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLElBQUksRUFBRSxDQUFDO1FBQ3JFLENBQUM7OztPQUFBO0lBR0Qsc0JBQVksc0NBQVk7UUFEeEIsMkNBQTJDOzs7Ozs7UUFDM0M7WUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUN4QyxDQUFDOzs7T0FBQTtJQUdELHNCQUFJLG1DQUFTO1FBRGIsd0ZBQXdGOzs7OztRQUN4RjtZQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFDakUsQ0FB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QVksZ0NBQzFJLENBQUM7SUFDWixDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBbk1ELElBbU1DOzs7Ozs7O0lBbE1DLHVDQUF1Qzs7Ozs7SUFDdkMsNENBQXFDOzs7OztJQUNyQyw2Q0FBc0M7O0lBQ3RDLGtDQUFnQjs7SUFDaEIsOEJBQVk7O0lBQ1oscUNBQW1COztJQUNuQixvQ0FBa0I7Ozs7O0lBRU4sNEJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgQ29sdW1uLCBFZGl0b3IsIEVkaXRvclZhbGlkYXRvciwgRWRpdG9yVmFsaWRhdG9yT3V0cHV0LCBLZXlDb2RlLCBDb2x1bW5FZGl0b3IgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbmNvbnN0IERFRkFVTFRfTUlOX1ZBTFVFID0gMDtcclxuY29uc3QgREVGQVVMVF9NQVhfVkFMVUUgPSAxMDA7XHJcbmNvbnN0IERFRkFVTFRfU1RFUCA9IDE7XHJcblxyXG5leHBvcnQgY2xhc3MgU2xpZGVyRWRpdG9yIGltcGxlbWVudHMgRWRpdG9yIHtcclxuICBwcml2YXRlIF9sYXN0SW5wdXRFdmVudDogS2V5Ym9hcmRFdmVudDtcclxuICBwcml2YXRlIF9lbGVtZW50UmFuZ2VJbnB1dElkOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfZWxlbWVudFJhbmdlT3V0cHV0SWQ6IHN0cmluZztcclxuICAkZWRpdG9yRWxtOiBhbnk7XHJcbiAgJGlucHV0OiBhbnk7XHJcbiAgJHNsaWRlck51bWJlcjogYW55O1xyXG4gIGRlZmF1bHRWYWx1ZTogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFyZ3M6IGFueSkge1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IENvbHVtbiBEZWZpbml0aW9uIG9iamVjdCAqL1xyXG4gIGdldCBjb2x1bW5EZWYoKTogQ29sdW1uIHtcclxuICAgIHJldHVybiB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbHVtbiB8fCB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgQ29sdW1uIEVkaXRvciBvYmplY3QgKi9cclxuICBnZXQgY29sdW1uRWRpdG9yKCk6IENvbHVtbkVkaXRvciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgfHwge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgRWRpdG9yIEdlbmVyaWMgUGFyYW1zICovXHJcbiAgcHJpdmF0ZSBnZXQgZWRpdG9yUGFyYW1zKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5FZGl0b3IucGFyYW1zIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgVmFsaWRhdG9yIGZ1bmN0aW9uLCBjYW4gYmUgcGFzc2VkIGluIEVkaXRvciBwcm9wZXJ0eSBvciBDb2x1bW4gRGVmaW5pdGlvbiAqL1xyXG4gIGdldCB2YWxpZGF0b3IoKTogRWRpdG9yVmFsaWRhdG9yIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkVkaXRvci52YWxpZGF0b3IgfHwgdGhpcy5jb2x1bW5EZWYudmFsaWRhdG9yO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuY29udGFpbmVyO1xyXG5cclxuICAgIC8vIGRlZmluZSB0aGUgaW5wdXQgJiBzbGlkZXIgbnVtYmVyIElEc1xyXG4gICAgY29uc3QgaXRlbUlkID0gdGhpcy5hcmdzICYmIHRoaXMuYXJncy5pdGVtICYmIHRoaXMuYXJncy5pdGVtLmlkO1xyXG4gICAgdGhpcy5fZWxlbWVudFJhbmdlSW5wdXRJZCA9IGByYW5nZUlucHV0XyR7dGhpcy5jb2x1bW5EZWYuZmllbGR9XyR7aXRlbUlkfWA7XHJcbiAgICB0aGlzLl9lbGVtZW50UmFuZ2VPdXRwdXRJZCA9IGByYW5nZU91dHB1dF8ke3RoaXMuY29sdW1uRGVmLmZpZWxkfV8ke2l0ZW1JZH1gO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBIVE1MIHN0cmluZyB0ZW1wbGF0ZVxyXG4gICAgY29uc3QgZWRpdG9yVGVtcGxhdGUgPSB0aGlzLmJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKCk7XHJcbiAgICB0aGlzLiRlZGl0b3JFbG0gPSAkKGVkaXRvclRlbXBsYXRlKTtcclxuICAgIHRoaXMuJGlucHV0ID0gdGhpcy4kZWRpdG9yRWxtLmNoaWxkcmVuKCdpbnB1dCcpO1xyXG4gICAgdGhpcy4kc2xpZGVyTnVtYmVyID0gdGhpcy4kZWRpdG9yRWxtLmNoaWxkcmVuKCdkaXYuaW5wdXQtZ3JvdXAtYWRkb24uaW5wdXQtZ3JvdXAtYXBwZW5kJykuY2hpbGRyZW4oKTtcclxuXHJcbiAgICAvLyB3YXRjaCBvbiBjaGFuZ2UgZXZlbnRcclxuICAgIHRoaXMuJGVkaXRvckVsbVxyXG4gICAgICAuYXBwZW5kVG8oY29udGFpbmVyKVxyXG4gICAgICAub24oJ21vdXNldXAnLCAoKSA9PiB0aGlzLnNhdmUoKSk7XHJcblxyXG4gICAgLy8gaWYgdXNlciBjaG9zZSB0byBkaXNwbGF5IHRoZSBzbGlkZXIgbnVtYmVyIG9uIHRoZSByaWdodCBzaWRlLCB0aGVuIHVwZGF0ZSBpdCBldmVyeSB0aW1lIGl0IGNoYW5nZXNcclxuICAgIC8vIHdlIG5lZWQgdG8gdXNlIGJvdGggXCJpbnB1dFwiIGFuZCBcImNoYW5nZVwiIGV2ZW50IHRvIGJlIGFsbCBjcm9zcy1icm93c2VyXHJcbiAgICBpZiAoIXRoaXMuZWRpdG9yUGFyYW1zLmhpZGVTbGlkZXJOdW1iZXIpIHtcclxuICAgICAgdGhpcy4kZWRpdG9yRWxtLm9uKCdpbnB1dCBjaGFuZ2UnLCAoZXZlbnQ6IEtleWJvYXJkRXZlbnQgJiB7IHRhcmdldDogSFRNTElucHV0RWxlbWVudCB9KSA9PiB7XHJcbiAgICAgICAgdGhpcy5fbGFzdElucHV0RXZlbnQgPSBldmVudDtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQudmFsdWUgfHwgJyc7XHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLl9lbGVtZW50UmFuZ2VPdXRwdXRJZCkuaW5uZXJIVE1MID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCkge1xyXG4gICAgdGhpcy4kZWRpdG9yRWxtLm9mZignaW5wdXQgY2hhbmdlIG1vdXNldXAnKS5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIGZvY3VzKCkge1xyXG4gICAgdGhpcy4kZWRpdG9yRWxtLmZvY3VzKCk7XHJcbiAgfVxyXG5cclxuICBzYXZlKCkge1xyXG4gICAgY29uc3QgdmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUoKTtcclxuICAgIGlmICh2YWxpZGF0aW9uICYmIHZhbGlkYXRpb24udmFsaWQpIHtcclxuICAgICAgaWYgKHRoaXMuYXJncy5ncmlkLmdldE9wdGlvbnMoKS5hdXRvQ29tbWl0RWRpdCkge1xyXG4gICAgICAgIHRoaXMuYXJncy5ncmlkLmdldEVkaXRvckxvY2soKS5jb21taXRDdXJyZW50RWRpdCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYXJncy5jb21taXRDaGFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNhbmNlbCgpIHtcclxuICAgIHRoaXMuJGlucHV0LnZhbCh0aGlzLmRlZmF1bHRWYWx1ZSk7XHJcbiAgICB0aGlzLmFyZ3MuY2FuY2VsQ2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgbG9hZFZhbHVlKGl0ZW06IGFueSkge1xyXG4gICAgY29uc3QgZmllbGROYW1lID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmllbGQ7XHJcblxyXG4gICAgLy8gd2hlbiBpdCdzIGEgY29tcGxleCBvYmplY3QsIHRoZW4gcHVsbCB0aGUgb2JqZWN0IG5hbWUgb25seSwgZS5nLjogXCJ1c2VyLmZpcnN0TmFtZVwiID0+IFwidXNlclwiXHJcbiAgICBjb25zdCBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCA9IGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGZpZWxkTmFtZS5pbmRleE9mKCcuJykpIDogJyc7XHJcblxyXG4gICAgaWYgKGl0ZW0gJiYgdGhpcy5jb2x1bW5EZWYgJiYgKGl0ZW0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSB8fCBpdGVtLmhhc093blByb3BlcnR5KGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0KSkpIHtcclxuICAgICAgdGhpcy5kZWZhdWx0VmFsdWUgPSBpdGVtW2ZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0IHx8IGZpZWxkTmFtZV07XHJcbiAgICAgIHRoaXMuJGlucHV0LnZhbCh0aGlzLmRlZmF1bHRWYWx1ZSk7XHJcbiAgICAgIHRoaXMuJGlucHV0WzBdLmRlZmF1bHRWYWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlO1xyXG4gICAgICB0aGlzLiRzbGlkZXJOdW1iZXIuaHRtbCh0aGlzLmRlZmF1bHRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXJpYWxpemVWYWx1ZSgpIHtcclxuICAgIHJldHVybiBwYXJzZUludCh0aGlzLiRpbnB1dC52YWwoKSBhcyBzdHJpbmcsIDEwKSB8fCAwO1xyXG4gIH1cclxuXHJcbiAgYXBwbHlWYWx1ZShpdGVtOiBhbnksIHN0YXRlOiBhbnkpIHtcclxuICAgIGNvbnN0IGZpZWxkTmFtZSA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpZWxkO1xyXG4gICAgLy8gd2hlbiBpdCdzIGEgY29tcGxleCBvYmplY3QsIHRoZW4gcHVsbCB0aGUgb2JqZWN0IG5hbWUgb25seSwgZS5nLjogXCJ1c2VyLmZpcnN0TmFtZVwiID0+IFwidXNlclwiXHJcbiAgICBjb25zdCBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCA9IGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGZpZWxkTmFtZS5pbmRleE9mKCcuJykpIDogJyc7XHJcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZShzdGF0ZSk7XHJcbiAgICBpdGVtW2ZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0IHx8IGZpZWxkTmFtZV0gPSAodmFsaWRhdGlvbiAmJiB2YWxpZGF0aW9uLnZhbGlkKSA/IHN0YXRlIDogJyc7XHJcbiAgfVxyXG5cclxuICBpc1ZhbHVlQ2hhbmdlZCgpIHtcclxuICAgIGNvbnN0IGVsbVZhbHVlID0gdGhpcy4kaW5wdXQudmFsKCk7XHJcbiAgICBjb25zdCBsYXN0RXZlbnQgPSB0aGlzLl9sYXN0SW5wdXRFdmVudCAmJiB0aGlzLl9sYXN0SW5wdXRFdmVudC5rZXlDb2RlO1xyXG4gICAgaWYgKHRoaXMuY29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRWRpdG9yLmFsd2F5c1NhdmVPbkVudGVyS2V5ICYmIGxhc3RFdmVudCA9PT0gS2V5Q29kZS5FTlRFUikge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiAoIShlbG1WYWx1ZSA9PT0gJycgJiYgdGhpcy5kZWZhdWx0VmFsdWUgPT09IG51bGwpKSAmJiAoZWxtVmFsdWUgIT09IHRoaXMuZGVmYXVsdFZhbHVlKTtcclxuICB9XHJcblxyXG4gIHZhbGlkYXRlKGlucHV0VmFsdWU/OiBhbnkpOiBFZGl0b3JWYWxpZGF0b3JPdXRwdXQge1xyXG4gICAgY29uc3QgZWxtVmFsdWUgPSAoaW5wdXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSA/IGlucHV0VmFsdWUgOiB0aGlzLiRpbnB1dCAmJiB0aGlzLiRpbnB1dC52YWwgJiYgdGhpcy4kaW5wdXQudmFsKCk7XHJcbiAgICBjb25zdCBpc1JlcXVpcmVkID0gdGhpcy5jb2x1bW5FZGl0b3IucmVxdWlyZWQ7XHJcbiAgICBjb25zdCBtaW5WYWx1ZSA9IHRoaXMuY29sdW1uRWRpdG9yLm1pblZhbHVlO1xyXG4gICAgY29uc3QgbWF4VmFsdWUgPSB0aGlzLmNvbHVtbkVkaXRvci5tYXhWYWx1ZTtcclxuICAgIGNvbnN0IGVycm9yTXNnID0gdGhpcy5jb2x1bW5FZGl0b3IuZXJyb3JNZXNzYWdlO1xyXG4gICAgY29uc3QgbWFwVmFsaWRhdGlvbiA9IHtcclxuICAgICAgJ3t7bWluVmFsdWV9fSc6IG1pblZhbHVlLFxyXG4gICAgICAne3ttYXhWYWx1ZX19JzogbWF4VmFsdWVcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHRoaXMudmFsaWRhdG9yKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcihlbG1WYWx1ZSwgdGhpcy5hcmdzKTtcclxuICAgIH0gZWxzZSBpZiAoaXNSZXF1aXJlZCAmJiBlbG1WYWx1ZSA9PT0gJycpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB2YWxpZDogZmFsc2UsXHJcbiAgICAgICAgbXNnOiBlcnJvck1zZyB8fCBDb25zdGFudHMuVkFMSURBVElPTl9SRVFVSVJFRF9GSUVMRFxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIGlmIChtaW5WYWx1ZSAhPT0gdW5kZWZpbmVkICYmIChlbG1WYWx1ZSA8IG1pblZhbHVlIHx8IGVsbVZhbHVlID4gbWF4VmFsdWUpKSB7XHJcbiAgICAgIC8vIHdoZW4gZGVjaW1hbCB2YWx1ZSBpcyBiaWdnZXIgdGhhbiAwLCB3ZSBvbmx5IGFjY2VwdCB0aGUgZGVjaW1hbCB2YWx1ZXMgYXMgdGhhdCB2YWx1ZSBzZXRcclxuICAgICAgLy8gZm9yIGV4YW1wbGUgaWYgd2Ugc2V0IGRlY2ltYWxQbGFjZXMgdG8gMiwgd2Ugd2lsbCBvbmx5IGFjY2VwdCBudW1iZXJzIGJldHdlZW4gMCBhbmQgMiBkZWNpbWFsc1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHZhbGlkOiBmYWxzZSxcclxuICAgICAgICBtc2c6IGVycm9yTXNnIHx8IENvbnN0YW50cy5WQUxJREFUSU9OX0VESVRPUl9OVU1CRVJfQkVUV0VFTi5yZXBsYWNlKC97e21pblZhbHVlfX18e3ttYXhWYWx1ZX19L2dpLCAobWF0Y2hlZCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIG1hcFZhbGlkYXRpb25bbWF0Y2hlZF07XHJcbiAgICAgICAgfSlcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB2YWxpZDogdHJ1ZSxcclxuICAgICAgbXNnOiBudWxsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy9cclxuICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdGhlIEhUTUwgdGVtcGxhdGUgYXMgYSBzdHJpbmdcclxuICAgKi9cclxuICBwcml2YXRlIGJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKCkge1xyXG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xyXG4gICAgY29uc3QgdGl0bGUgPSB0aGlzLmNvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkVkaXRvci50aXRsZSB8fCAnJztcclxuICAgIGNvbnN0IG1pblZhbHVlID0gdGhpcy5jb2x1bW5FZGl0b3IuaGFzT3duUHJvcGVydHkoJ21pblZhbHVlJykgPyB0aGlzLmNvbHVtbkVkaXRvci5taW5WYWx1ZSA6IERFRkFVTFRfTUlOX1ZBTFVFO1xyXG4gICAgY29uc3QgbWF4VmFsdWUgPSB0aGlzLmNvbHVtbkVkaXRvci5oYXNPd25Qcm9wZXJ0eSgnbWF4VmFsdWUnKSA/IHRoaXMuY29sdW1uRWRpdG9yLm1heFZhbHVlIDogREVGQVVMVF9NQVhfVkFMVUU7XHJcbiAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB0aGlzLmVkaXRvclBhcmFtcy5oYXNPd25Qcm9wZXJ0eSgnc2xpZGVyU3RhcnRWYWx1ZScpID8gdGhpcy5lZGl0b3JQYXJhbXMuc2xpZGVyU3RhcnRWYWx1ZSA6IG1pblZhbHVlO1xyXG4gICAgY29uc3Qgc3RlcCA9IHRoaXMuY29sdW1uRWRpdG9yLmhhc093blByb3BlcnR5KCd2YWx1ZVN0ZXAnKSA/IHRoaXMuY29sdW1uRWRpdG9yLnZhbHVlU3RlcCA6IERFRkFVTFRfU1RFUDtcclxuXHJcbiAgICBpZiAodGhpcy5lZGl0b3JQYXJhbXMuaGlkZVNsaWRlck51bWJlcikge1xyXG4gICAgICByZXR1cm4gYFxyXG4gICAgICA8ZGl2IGNsYXNzPVwic2xpZGVyLWVkaXRvclwiPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBpZD1cIiR7dGhpcy5fZWxlbWVudFJhbmdlSW5wdXRJZH1cIlxyXG4gICAgICAgICAgbmFtZT1cIiR7dGhpcy5fZWxlbWVudFJhbmdlSW5wdXRJZH1cIlxyXG4gICAgICAgICAgdGl0bGU9XCIke3RpdGxlfVwiXHJcbiAgICAgICAgICBkZWZhdWx0VmFsdWU9XCIke2RlZmF1bHRWYWx1ZX1cIiBtaW49XCIke21pblZhbHVlfVwiIG1heD1cIiR7bWF4VmFsdWV9XCIgc3RlcD1cIiR7c3RlcH1cIlxyXG4gICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2wgc2xpZGVyLWVkaXRvci1pbnB1dCBlZGl0b3ItJHtmaWVsZElkfSByYW5nZVwiIC8+XHJcbiAgICAgIDwvZGl2PmA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGBcclxuICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIHNsaWRlci1lZGl0b3JcIj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgaWQ9XCIke3RoaXMuX2VsZW1lbnRSYW5nZUlucHV0SWR9XCJcclxuICAgICAgICAgIG5hbWU9XCIke3RoaXMuX2VsZW1lbnRSYW5nZUlucHV0SWR9XCJcclxuICAgICAgICAgIHRpdGxlPVwiJHt0aXRsZX1cIlxyXG4gICAgICAgICAgZGVmYXVsdFZhbHVlPVwiJHtkZWZhdWx0VmFsdWV9XCIgbWluPVwiJHttaW5WYWx1ZX1cIiBtYXg9XCIke21heFZhbHVlfVwiIHN0ZXA9XCIke3N0ZXB9XCJcclxuICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIHNsaWRlci1lZGl0b3ItaW5wdXQgZWRpdG9yLSR7ZmllbGRJZH0gcmFuZ2VcIiAvPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpbnB1dC1ncm91cC1hcHBlbmQgc2xpZGVyLXZhbHVlXCI+PHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0XCIgaWQ9XCIke3RoaXMuX2VsZW1lbnRSYW5nZU91dHB1dElkfVwiPiR7ZGVmYXVsdFZhbHVlfTwvc3Bhbj48L2Rpdj5cclxuICAgICAgPC9kaXY+YDtcclxuICB9XHJcbn1cclxuIl19