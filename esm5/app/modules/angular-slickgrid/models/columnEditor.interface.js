/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function ColumnEditor() { }
if (false) {
    /**
     * Defaults to false, when set to True and user presses the ENTER key (on Editors that supports it),
     * it will always call a Save regardless if the current value is null and/or previous value was null
     * @type {?|undefined}
     */
    ColumnEditor.prototype.alwaysSaveOnEnterKey;
    /**
     * A collection of items/options that will be loaded asynchronously (commonly used with a Select/Multi-Select Editor)
     * @type {?|undefined}
     */
    ColumnEditor.prototype.collectionAsync;
    /**
     * A collection of items/options (commonly used with a Select/Multi-Select Editor)
     * It can be a collection of string or label/value pair (the pair can be customized via the "customStructure" option)
     * @type {?|undefined}
     */
    ColumnEditor.prototype.collection;
    /**
     * We could filter some 1 or more items from the collection
     * @type {?|undefined}
     */
    ColumnEditor.prototype.collectionFilterBy;
    /**
     * Options to change the behavior of the "collection"
     * @type {?|undefined}
     */
    ColumnEditor.prototype.collectionOptions;
    /**
     * We could sort the collection by 1 or more properties, or by translated value(s) when enableTranslateLabel is True
     * @type {?|undefined}
     */
    ColumnEditor.prototype.collectionSortBy;
    /**
     * A custom structure can be used instead of the default label/value pair. Commonly used with Select/Multi-Select Editor
     * @type {?|undefined}
     */
    ColumnEditor.prototype.customStructure;
    /**
     * Options that could be provided to the Editor, example: { container: 'body', maxHeight: 250}
     * @type {?|undefined}
     */
    ColumnEditor.prototype.editorOptions;
    /**
     * Defaults to false, when set it will render any HTML code instead of removing it (sanitized)
     * Only used so far in the MultipleSelect & SingleSelect Filters will support it
     * @type {?|undefined}
     */
    ColumnEditor.prototype.enableRenderHtml;
    /**
     * Do we want the Editor to handle translation (localization)?
     * @type {?|undefined}
     */
    ColumnEditor.prototype.enableTranslateLabel;
    /**
     * Error message to display when validation fails
     * @type {?|undefined}
     */
    ColumnEditor.prototype.errorMessage;
    /**
     * Maximum value of the filter, works only with Filters supporting it (text, number, float, slider)
     * @type {?|undefined}
     */
    ColumnEditor.prototype.maxValue;
    /**
     * Minimum value of the filter, works only with Filters supporting it (text, number, float, slider)
     * @type {?|undefined}
     */
    ColumnEditor.prototype.minValue;
    /**
     * Any inline editor function that implements Editor for the cell
     * @type {?|undefined}
     */
    ColumnEditor.prototype.model;
    /**
     * Placeholder text that can be used by some Editors.
     * Note that this will override the default placeholder configured in the global config
     * @type {?|undefined}
     */
    ColumnEditor.prototype.placeholder;
    /**
     * Title attribute that can be used in some Editors as tooltip (usually the "input" editors).
     *
     * To use this as a Tooltip, Angular-Slickgrid doesn't (and will never) use any Angular 3rd party lib to display a real Tooltip,
     * for that you can use any jQuery 3rd party lib like tipsy for example (we use it in our own project and it works)
     * https://www.npmjs.com/package/jquery.tipsy
     * @type {?|undefined}
     */
    ColumnEditor.prototype.title;
    /**
     * Defaults to false, is the field required to be valid?
     * Only on Editors that supports it.
     * @type {?|undefined}
     */
    ColumnEditor.prototype.required;
    /**
     * Editor Validator
     * @type {?|undefined}
     */
    ColumnEditor.prototype.validator;
    /**
     * Step value of the filter, works only with Filters supporting it (input text, number, float, range, slider)
     * @type {?|undefined}
     */
    ColumnEditor.prototype.valueStep;
    /**
     * DOM element extra options
     * @type {?|undefined}
     */
    ColumnEditor.prototype.elementOptions;
    /**
     * Use "params" to pass any type of arguments to your Custom Editor
     * or regular Editor like the Editors.float
     * for example, to pass the option collection to a select Filter we can type this:
     * params: { decimalPlaces: 2 }
     * @type {?|undefined}
     */
    ColumnEditor.prototype.params;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uRWRpdG9yLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvbW9kZWxzL2NvbHVtbkVkaXRvci5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVVBLGtDQXlGQzs7Ozs7OztJQXBGQyw0Q0FBK0I7Ozs7O0lBRy9CLHVDQUFpRDs7Ozs7O0lBTWpELGtDQUFtQjs7Ozs7SUFHbkIsMENBQStEOzs7OztJQUcvRCx5Q0FBcUM7Ozs7O0lBR3JDLHdDQUF5RDs7Ozs7SUFHekQsdUNBQTRDOzs7OztJQUc1QyxxQ0FBMkM7Ozs7OztJQU0zQyx3Q0FBMkI7Ozs7O0lBRzNCLDRDQUErQjs7Ozs7SUFHL0Isb0NBQXNCOzs7OztJQUd0QixnQ0FBMkI7Ozs7O0lBRzNCLGdDQUEyQjs7Ozs7SUFHM0IsNkJBQVk7Ozs7OztJQU1aLG1DQUFxQjs7Ozs7Ozs7O0lBU3JCLDZCQUFlOzs7Ozs7SUFNZixnQ0FBbUI7Ozs7O0lBR25CLGlDQUE0Qjs7Ozs7SUFHNUIsaUNBQTRCOzs7OztJQUc1QixzQ0FBcUI7Ozs7Ozs7O0lBUXJCLDhCQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb2xsZWN0aW9uQ3VzdG9tU3RydWN0dXJlLFxyXG4gIENvbGxlY3Rpb25GaWx0ZXJCeSxcclxuICBDb2xsZWN0aW9uT3B0aW9uLFxyXG4gIENvbGxlY3Rpb25Tb3J0QnksXHJcbiAgRWRpdG9yVmFsaWRhdG9yLFxyXG4gIE11bHRpcGxlU2VsZWN0T3B0aW9uLFxyXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb2x1bW5FZGl0b3Ige1xyXG4gIC8qKlxyXG4gICAqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGVuIHNldCB0byBUcnVlIGFuZCB1c2VyIHByZXNzZXMgdGhlIEVOVEVSIGtleSAob24gRWRpdG9ycyB0aGF0IHN1cHBvcnRzIGl0KSxcclxuICAgKiBpdCB3aWxsIGFsd2F5cyBjYWxsIGEgU2F2ZSByZWdhcmRsZXNzIGlmIHRoZSBjdXJyZW50IHZhbHVlIGlzIG51bGwgYW5kL29yIHByZXZpb3VzIHZhbHVlIHdhcyBudWxsXHJcbiAgICovXHJcbiAgYWx3YXlzU2F2ZU9uRW50ZXJLZXk/OiBib29sZWFuO1xyXG5cclxuICAvKiogQSBjb2xsZWN0aW9uIG9mIGl0ZW1zL29wdGlvbnMgdGhhdCB3aWxsIGJlIGxvYWRlZCBhc3luY2hyb25vdXNseSAoY29tbW9ubHkgdXNlZCB3aXRoIGEgU2VsZWN0L011bHRpLVNlbGVjdCBFZGl0b3IpICovXHJcbiAgY29sbGVjdGlvbkFzeW5jPzogUHJvbWlzZTxhbnk+IHwgT2JzZXJ2YWJsZTxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBBIGNvbGxlY3Rpb24gb2YgaXRlbXMvb3B0aW9ucyAoY29tbW9ubHkgdXNlZCB3aXRoIGEgU2VsZWN0L011bHRpLVNlbGVjdCBFZGl0b3IpXHJcbiAgICogSXQgY2FuIGJlIGEgY29sbGVjdGlvbiBvZiBzdHJpbmcgb3IgbGFiZWwvdmFsdWUgcGFpciAodGhlIHBhaXIgY2FuIGJlIGN1c3RvbWl6ZWQgdmlhIHRoZSBcImN1c3RvbVN0cnVjdHVyZVwiIG9wdGlvbilcclxuICAgKi9cclxuICBjb2xsZWN0aW9uPzogYW55W107XHJcblxyXG4gIC8qKiBXZSBjb3VsZCBmaWx0ZXIgc29tZSAxIG9yIG1vcmUgaXRlbXMgZnJvbSB0aGUgY29sbGVjdGlvbiAqL1xyXG4gIGNvbGxlY3Rpb25GaWx0ZXJCeT86IENvbGxlY3Rpb25GaWx0ZXJCeSB8IENvbGxlY3Rpb25GaWx0ZXJCeVtdO1xyXG5cclxuICAvKiogT3B0aW9ucyB0byBjaGFuZ2UgdGhlIGJlaGF2aW9yIG9mIHRoZSBcImNvbGxlY3Rpb25cIiAqL1xyXG4gIGNvbGxlY3Rpb25PcHRpb25zPzogQ29sbGVjdGlvbk9wdGlvbjtcclxuXHJcbiAgLyoqIFdlIGNvdWxkIHNvcnQgdGhlIGNvbGxlY3Rpb24gYnkgMSBvciBtb3JlIHByb3BlcnRpZXMsIG9yIGJ5IHRyYW5zbGF0ZWQgdmFsdWUocykgd2hlbiBlbmFibGVUcmFuc2xhdGVMYWJlbCBpcyBUcnVlICovXHJcbiAgY29sbGVjdGlvblNvcnRCeT86IENvbGxlY3Rpb25Tb3J0QnkgfCBDb2xsZWN0aW9uU29ydEJ5W107XHJcblxyXG4gIC8qKiBBIGN1c3RvbSBzdHJ1Y3R1cmUgY2FuIGJlIHVzZWQgaW5zdGVhZCBvZiB0aGUgZGVmYXVsdCBsYWJlbC92YWx1ZSBwYWlyLiBDb21tb25seSB1c2VkIHdpdGggU2VsZWN0L011bHRpLVNlbGVjdCBFZGl0b3IgKi9cclxuICBjdXN0b21TdHJ1Y3R1cmU/OiBDb2xsZWN0aW9uQ3VzdG9tU3RydWN0dXJlO1xyXG5cclxuICAvKiogT3B0aW9ucyB0aGF0IGNvdWxkIGJlIHByb3ZpZGVkIHRvIHRoZSBFZGl0b3IsIGV4YW1wbGU6IHsgY29udGFpbmVyOiAnYm9keScsIG1heEhlaWdodDogMjUwfSAqL1xyXG4gIGVkaXRvck9wdGlvbnM/OiBNdWx0aXBsZVNlbGVjdE9wdGlvbiB8IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGVmYXVsdHMgdG8gZmFsc2UsIHdoZW4gc2V0IGl0IHdpbGwgcmVuZGVyIGFueSBIVE1MIGNvZGUgaW5zdGVhZCBvZiByZW1vdmluZyBpdCAoc2FuaXRpemVkKVxyXG4gICAqIE9ubHkgdXNlZCBzbyBmYXIgaW4gdGhlIE11bHRpcGxlU2VsZWN0ICYgU2luZ2xlU2VsZWN0IEZpbHRlcnMgd2lsbCBzdXBwb3J0IGl0XHJcbiAgICovXHJcbiAgZW5hYmxlUmVuZGVySHRtbD86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEbyB3ZSB3YW50IHRoZSBFZGl0b3IgdG8gaGFuZGxlIHRyYW5zbGF0aW9uIChsb2NhbGl6YXRpb24pPyAqL1xyXG4gIGVuYWJsZVRyYW5zbGF0ZUxhYmVsPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIEVycm9yIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHZhbGlkYXRpb24gZmFpbHMgKi9cclxuICBlcnJvck1lc3NhZ2U/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBNYXhpbXVtIHZhbHVlIG9mIHRoZSBmaWx0ZXIsIHdvcmtzIG9ubHkgd2l0aCBGaWx0ZXJzIHN1cHBvcnRpbmcgaXQgKHRleHQsIG51bWJlciwgZmxvYXQsIHNsaWRlcikgKi9cclxuICBtYXhWYWx1ZT86IG51bWJlciB8IHN0cmluZztcclxuXHJcbiAgLyoqIE1pbmltdW0gdmFsdWUgb2YgdGhlIGZpbHRlciwgd29ya3Mgb25seSB3aXRoIEZpbHRlcnMgc3VwcG9ydGluZyBpdCAodGV4dCwgbnVtYmVyLCBmbG9hdCwgc2xpZGVyKSAqL1xyXG4gIG1pblZhbHVlPzogbnVtYmVyIHwgc3RyaW5nO1xyXG5cclxuICAvKiogQW55IGlubGluZSBlZGl0b3IgZnVuY3Rpb24gdGhhdCBpbXBsZW1lbnRzIEVkaXRvciBmb3IgdGhlIGNlbGwgKi9cclxuICBtb2RlbD86IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogUGxhY2Vob2xkZXIgdGV4dCB0aGF0IGNhbiBiZSB1c2VkIGJ5IHNvbWUgRWRpdG9ycy5cclxuICAgKiBOb3RlIHRoYXQgdGhpcyB3aWxsIG92ZXJyaWRlIHRoZSBkZWZhdWx0IHBsYWNlaG9sZGVyIGNvbmZpZ3VyZWQgaW4gdGhlIGdsb2JhbCBjb25maWdcclxuICAgKi9cclxuICBwbGFjZWhvbGRlcj86IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGl0bGUgYXR0cmlidXRlIHRoYXQgY2FuIGJlIHVzZWQgaW4gc29tZSBFZGl0b3JzIGFzIHRvb2x0aXAgKHVzdWFsbHkgdGhlIFwiaW5wdXRcIiBlZGl0b3JzKS5cclxuICAgKlxyXG4gICAqIFRvIHVzZSB0aGlzIGFzIGEgVG9vbHRpcCwgQW5ndWxhci1TbGlja2dyaWQgZG9lc24ndCAoYW5kIHdpbGwgbmV2ZXIpIHVzZSBhbnkgQW5ndWxhciAzcmQgcGFydHkgbGliIHRvIGRpc3BsYXkgYSByZWFsIFRvb2x0aXAsXHJcbiAgICogZm9yIHRoYXQgeW91IGNhbiB1c2UgYW55IGpRdWVyeSAzcmQgcGFydHkgbGliIGxpa2UgdGlwc3kgZm9yIGV4YW1wbGUgKHdlIHVzZSBpdCBpbiBvdXIgb3duIHByb2plY3QgYW5kIGl0IHdvcmtzKVxyXG4gICAqIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2pxdWVyeS50aXBzeVxyXG4gICAqL1xyXG4gIHRpdGxlPzogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBEZWZhdWx0cyB0byBmYWxzZSwgaXMgdGhlIGZpZWxkIHJlcXVpcmVkIHRvIGJlIHZhbGlkP1xyXG4gICAqIE9ubHkgb24gRWRpdG9ycyB0aGF0IHN1cHBvcnRzIGl0LlxyXG4gICAqL1xyXG4gIHJlcXVpcmVkPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIEVkaXRvciBWYWxpZGF0b3IgKi9cclxuICB2YWxpZGF0b3I/OiBFZGl0b3JWYWxpZGF0b3I7XHJcblxyXG4gIC8qKiBTdGVwIHZhbHVlIG9mIHRoZSBmaWx0ZXIsIHdvcmtzIG9ubHkgd2l0aCBGaWx0ZXJzIHN1cHBvcnRpbmcgaXQgKGlucHV0IHRleHQsIG51bWJlciwgZmxvYXQsIHJhbmdlLCBzbGlkZXIpICovXHJcbiAgdmFsdWVTdGVwPzogbnVtYmVyIHwgc3RyaW5nO1xyXG5cclxuICAvKiogRE9NIGVsZW1lbnQgZXh0cmEgb3B0aW9ucyAqL1xyXG4gIGVsZW1lbnRPcHRpb25zPzogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgXCJwYXJhbXNcIiB0byBwYXNzIGFueSB0eXBlIG9mIGFyZ3VtZW50cyB0byB5b3VyIEN1c3RvbSBFZGl0b3JcclxuICAgKiBvciByZWd1bGFyIEVkaXRvciBsaWtlIHRoZSBFZGl0b3JzLmZsb2F0XHJcbiAgICogZm9yIGV4YW1wbGUsIHRvIHBhc3MgdGhlIG9wdGlvbiBjb2xsZWN0aW9uIHRvIGEgc2VsZWN0IEZpbHRlciB3ZSBjYW4gdHlwZSB0aGlzOlxyXG4gICAqIHBhcmFtczogeyBkZWNpbWFsUGxhY2VzOiAyIH1cclxuICAgKi9cclxuICBwYXJhbXM/OiBhbnk7XHJcbn1cclxuIl19