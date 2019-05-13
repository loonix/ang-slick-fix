/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Constants } from './../constants';
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class CheckboxEditor {
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
        const fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        const title = this.columnEditor && this.columnEditor.title || '';
        this.$input = $(`<input type="checkbox" value="true" class="editor-checkbox editor-${fieldId}" title="${title}" />`);
        this.$input.appendTo(this.args.container);
        this.$input.focus();
        // make the checkbox editor act like a regular checkbox that commit the value on click
        if (this.args.grid.getOptions().autoCommitEdit) {
            this.$input.click((/**
             * @return {?}
             */
            () => this.args.grid.getEditorLock().commitCurrentEdit()));
        }
    }
    /**
     * @return {?}
     */
    destroy() {
        this.$input.remove();
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
    hide() {
        this.$input.hide();
    }
    /**
     * @return {?}
     */
    show() {
        this.$input.show();
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
            this.defaultValue = !!item[fieldNameFromComplexObject || fieldName];
            if (this.defaultValue) {
                this.$input.prop('checked', true);
            }
            else {
                this.$input.prop('checked', false);
            }
        }
    }
    /**
     * @return {?}
     */
    preClick() {
        this.$input.prop('checked', !this.$input.prop('checked'));
    }
    /**
     * @return {?}
     */
    serializeValue() {
        return this.$input.prop('checked');
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
        return (this.serializeValue() !== this.defaultValue);
    }
    /**
     * @param {?=} inputValue
     * @return {?}
     */
    validate(inputValue) {
        /** @type {?} */
        const isRequired = this.columnEditor.required;
        /** @type {?} */
        const isChecked = (inputValue !== undefined) ? inputValue : this.$input && this.$input.prop && this.$input.prop('checked');
        /** @type {?} */
        const errorMsg = this.columnEditor.errorMessage;
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
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3hFZGl0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2VkaXRvcnMvY2hlY2tib3hFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFVM0MsTUFBTSxPQUFPLGNBQWM7Ozs7SUFJekIsWUFBb0IsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7UUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFHRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO0lBQzdDLENBQUM7Ozs7O0lBR0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsSUFBSSxFQUFFLENBQUM7SUFDNUcsQ0FBQzs7Ozs7SUFHRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQ2pFLENBQUM7Ozs7SUFFRCxJQUFJOztjQUNJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTs7Y0FDN0MsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUksRUFBRTtRQUVoRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxxRUFBcUUsT0FBTyxZQUFZLEtBQUssTUFBTSxDQUFDLENBQUM7UUFDckgsSUFBSSxDQUFDLE1B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QUM7SUFDaEcsQ0FBQzs7OztJQUVELGNBQWM7UUFDWixPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxVQUFnQjs7Y0FDakIsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUTs7Y0FDdkMsU0FBUyxHQUFHLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOztjQUNwSCxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZO1FBRS9DLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QztRQUVELDRGQUE0RjtRQUM1RixJQUFJLFVBQVUsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUM1QixPQUFPO2dCQUNMLEtBQUssRUFBRSxLQUFLO2dCQUNaLEdBQUcsRUFBRSxRQUFRLElBQUksU0FBUyxDQUFDLHlCQUF5QjthQUNyRCxDQUFDO1NBQ0g7UUFFRCxPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUsSUFBSTtTQUNWLENBQUM7SUFDSixDQUFDO0NBQ0Y7OztJQTlHQyxnQ0FBWTs7SUFDWixzQ0FBc0I7Ozs7O0lBRVYsOEJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi8uLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBDb2x1bW4sIENvbHVtbkVkaXRvciwgRWRpdG9yLCBFZGl0b3JWYWxpZGF0b3IsIEVkaXRvclZhbGlkYXRvck91dHB1dCB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgJDogYW55O1xyXG5cclxuLypcclxuICogQW4gZXhhbXBsZSBvZiBhICdkZXRhY2hlZCcgZWRpdG9yLlxyXG4gKiBLZXlEb3duIGV2ZW50cyBhcmUgYWxzbyBoYW5kbGVkIHRvIHByb3ZpZGUgaGFuZGxpbmcgZm9yIFRhYiwgU2hpZnQtVGFiLCBFc2MgYW5kIEN0cmwtRW50ZXIuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hFZGl0b3IgaW1wbGVtZW50cyBFZGl0b3Ige1xyXG4gICRpbnB1dDogYW55O1xyXG4gIGRlZmF1bHRWYWx1ZTogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcmdzOiBhbnkpIHtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBDb2x1bW4gRGVmaW5pdGlvbiBvYmplY3QgKi9cclxuICBnZXQgY29sdW1uRGVmKCk6IENvbHVtbiB7XHJcbiAgICByZXR1cm4gdGhpcy5hcmdzICYmIHRoaXMuYXJncy5jb2x1bW4gfHwge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IENvbHVtbiBFZGl0b3Igb2JqZWN0ICovXHJcbiAgZ2V0IGNvbHVtbkVkaXRvcigpOiBDb2x1bW5FZGl0b3Ige1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgVmFsaWRhdG9yIGZ1bmN0aW9uLCBjYW4gYmUgcGFzc2VkIGluIEVkaXRvciBwcm9wZXJ0eSBvciBDb2x1bW4gRGVmaW5pdGlvbiAqL1xyXG4gIGdldCB2YWxpZGF0b3IoKTogRWRpdG9yVmFsaWRhdG9yIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkVkaXRvci52YWxpZGF0b3IgfHwgdGhpcy5jb2x1bW5EZWYudmFsaWRhdG9yO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcclxuICAgIGNvbnN0IHRpdGxlID0gdGhpcy5jb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5FZGl0b3IudGl0bGUgfHwgJyc7XHJcblxyXG4gICAgdGhpcy4kaW5wdXQgPSAkKGA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCJ0cnVlXCIgY2xhc3M9XCJlZGl0b3ItY2hlY2tib3ggZWRpdG9yLSR7ZmllbGRJZH1cIiB0aXRsZT1cIiR7dGl0bGV9XCIgLz5gKTtcclxuICAgIHRoaXMuJGlucHV0LmFwcGVuZFRvKHRoaXMuYXJncy5jb250YWluZXIpO1xyXG4gICAgdGhpcy4kaW5wdXQuZm9jdXMoKTtcclxuXHJcbiAgICAvLyBtYWtlIHRoZSBjaGVja2JveCBlZGl0b3IgYWN0IGxpa2UgYSByZWd1bGFyIGNoZWNrYm94IHRoYXQgY29tbWl0IHRoZSB2YWx1ZSBvbiBjbGlja1xyXG4gICAgaWYgKHRoaXMuYXJncy5ncmlkLmdldE9wdGlvbnMoKS5hdXRvQ29tbWl0RWRpdCkge1xyXG4gICAgICB0aGlzLiRpbnB1dC5jbGljaygoKSA9PiB0aGlzLmFyZ3MuZ3JpZC5nZXRFZGl0b3JMb2NrKCkuY29tbWl0Q3VycmVudEVkaXQoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy4kaW5wdXQucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICBmb2N1cygpOiB2b2lkIHtcclxuICAgIHRoaXMuJGlucHV0LmZvY3VzKCk7XHJcbiAgfVxyXG5cclxuICBoaWRlKCkge1xyXG4gICAgdGhpcy4kaW5wdXQuaGlkZSgpO1xyXG4gIH1cclxuXHJcbiAgc2hvdygpIHtcclxuICAgIHRoaXMuJGlucHV0LnNob3coKTtcclxuICB9XHJcblxyXG4gIGxvYWRWYWx1ZShpdGVtOiBhbnkpIHtcclxuICAgIGNvbnN0IGZpZWxkTmFtZSA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpZWxkO1xyXG5cclxuICAgIC8vIHdoZW4gaXQncyBhIGNvbXBsZXggb2JqZWN0LCB0aGVuIHB1bGwgdGhlIG9iamVjdCBuYW1lIG9ubHksIGUuZy46IFwidXNlci5maXJzdE5hbWVcIiA9PiBcInVzZXJcIlxyXG4gICAgY29uc3QgZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgPSBmaWVsZE5hbWUuaW5kZXhPZignLicpID8gZmllbGROYW1lLnN1YnN0cmluZygwLCBmaWVsZE5hbWUuaW5kZXhPZignLicpKSA6ICcnO1xyXG5cclxuICAgIGlmIChpdGVtICYmIHRoaXMuY29sdW1uRGVmICYmIChpdGVtLmhhc093blByb3BlcnR5KGZpZWxkTmFtZSkgfHwgaXRlbS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCkpKSB7XHJcbiAgICAgIHRoaXMuZGVmYXVsdFZhbHVlID0gISFpdGVtW2ZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0IHx8IGZpZWxkTmFtZV07XHJcbiAgICAgIGlmICh0aGlzLmRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuJGlucHV0LnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLiRpbnB1dC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcmVDbGljaygpIHtcclxuICAgIHRoaXMuJGlucHV0LnByb3AoJ2NoZWNrZWQnLCAhdGhpcy4kaW5wdXQucHJvcCgnY2hlY2tlZCcpKTtcclxuICB9XHJcblxyXG4gIHNlcmlhbGl6ZVZhbHVlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuJGlucHV0LnByb3AoJ2NoZWNrZWQnKTtcclxuICB9XHJcblxyXG4gIGFwcGx5VmFsdWUoaXRlbTogYW55LCBzdGF0ZTogYW55KSB7XHJcbiAgICBjb25zdCBmaWVsZE5hbWUgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWVsZDtcclxuICAgIC8vIHdoZW4gaXQncyBhIGNvbXBsZXggb2JqZWN0LCB0aGVuIHB1bGwgdGhlIG9iamVjdCBuYW1lIG9ubHksIGUuZy46IFwidXNlci5maXJzdE5hbWVcIiA9PiBcInVzZXJcIlxyXG4gICAgY29uc3QgZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgPSBmaWVsZE5hbWUuaW5kZXhPZignLicpID8gZmllbGROYW1lLnN1YnN0cmluZygwLCBmaWVsZE5hbWUuaW5kZXhPZignLicpKSA6ICcnO1xyXG4gICAgY29uc3QgdmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUoc3RhdGUpO1xyXG4gICAgaXRlbVtmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCB8fCBmaWVsZE5hbWVdID0gKHZhbGlkYXRpb24gJiYgdmFsaWRhdGlvbi52YWxpZCkgPyBzdGF0ZSA6ICcnO1xyXG4gIH1cclxuXHJcbiAgaXNWYWx1ZUNoYW5nZWQoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuc2VyaWFsaXplVmFsdWUoKSAhPT0gdGhpcy5kZWZhdWx0VmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGUoaW5wdXRWYWx1ZT86IGFueSk6IEVkaXRvclZhbGlkYXRvck91dHB1dCB7XHJcbiAgICBjb25zdCBpc1JlcXVpcmVkID0gdGhpcy5jb2x1bW5FZGl0b3IucmVxdWlyZWQ7XHJcbiAgICBjb25zdCBpc0NoZWNrZWQgPSAoaW5wdXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSA/IGlucHV0VmFsdWUgOiB0aGlzLiRpbnB1dCAmJiB0aGlzLiRpbnB1dC5wcm9wICYmIHRoaXMuJGlucHV0LnByb3AoJ2NoZWNrZWQnKTtcclxuICAgIGNvbnN0IGVycm9yTXNnID0gdGhpcy5jb2x1bW5FZGl0b3IuZXJyb3JNZXNzYWdlO1xyXG5cclxuICAgIGlmICh0aGlzLnZhbGlkYXRvcikge1xyXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IoaXNDaGVja2VkLCB0aGlzLmFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGJ5IGRlZmF1bHQgdGhlIGVkaXRvciBpcyBhbG1vc3QgYWx3YXlzIHZhbGlkIChleGNlcHQgd2hlbiBpdCdzIHJlcXVpcmVkIGJ1dCBub3QgcHJvdmlkZWQpXHJcbiAgICBpZiAoaXNSZXF1aXJlZCAmJiAhaXNDaGVja2VkKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdmFsaWQ6IGZhbHNlLFxyXG4gICAgICAgIG1zZzogZXJyb3JNc2cgfHwgQ29uc3RhbnRzLlZBTElEQVRJT05fUkVRVUlSRURfRklFTERcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB2YWxpZDogdHJ1ZSxcclxuICAgICAgbXNnOiBudWxsXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=