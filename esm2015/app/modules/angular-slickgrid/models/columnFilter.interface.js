/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function ColumnFilter() { }
if (false) {
    /**
     * Do we want to bypass the Backend Query? Commonly used with an OData Backend Service, if we want to filter without calling the regular OData query.
     * @type {?|undefined}
     */
    ColumnFilter.prototype.bypassBackendQuery;
    /**
     * Column ID
     * @type {?|undefined}
     */
    ColumnFilter.prototype.columnId;
    /**
     * Column Definition
     * @type {?|undefined}
     */
    ColumnFilter.prototype.columnDef;
    /**
     * Custom Filter
     * @type {?|undefined}
     */
    ColumnFilter.prototype.customFilter;
    /**
     * Search terms (collection)
     * @type {?|undefined}
     */
    ColumnFilter.prototype.searchTerms;
    /**
     * Operator to use when filtering (>, >=, EQ, IN, ...)
     * @type {?|undefined}
     */
    ColumnFilter.prototype.operator;
    /**
     * Maximum value of the filter, works only with Filters supporting it (text, number, float, slider)
     * @type {?|undefined}
     */
    ColumnFilter.prototype.maxValue;
    /**
     * Minimum value of the filter, works only with Filters supporting it (text, number, float, slider)
     * @type {?|undefined}
     */
    ColumnFilter.prototype.minValue;
    /**
     * Filter to use (input, multipleSelect, singleSelect, select, custom)
     * @type {?|undefined}
     */
    ColumnFilter.prototype.model;
    /**
     * A collection of items/options that will be loaded asynchronously (commonly used with a Select/Multi-Select Filter)
     * @type {?|undefined}
     */
    ColumnFilter.prototype.collectionAsync;
    /**
     * A collection of items/options (commonly used with a Select/Multi-Select Filter)
     * It can be a collection of string or label/value pair (the pair can be customized via the "customStructure" option)
     * @type {?|undefined}
     */
    ColumnFilter.prototype.collection;
    /**
     * Options to change the behavior of the "collection"
     * @type {?|undefined}
     */
    ColumnFilter.prototype.collectionOptions;
    /**
     * We could filter some 1 or more items from the collection
     * @type {?|undefined}
     */
    ColumnFilter.prototype.collectionFilterBy;
    /**
     * We could sort the collection by 1 or more properties, or by translated value(s) when enableTranslateLabel is True
     * @type {?|undefined}
     */
    ColumnFilter.prototype.collectionSortBy;
    /**
     * A custom structure can be used instead of the default label/value pair. Commonly used with Select/Multi-Select Filter
     * @type {?|undefined}
     */
    ColumnFilter.prototype.customStructure;
    /**
     * Options that could be provided to the Filter, example: { container: 'body', maxHeight: 250}
     * @type {?|undefined}
     */
    ColumnFilter.prototype.filterOptions;
    /**
     * Defaults to false, when set it will render any HTML code instead of removing it
     * So far only used in the MultipleSelect & SingleSelect Filters will support it
     * @type {?|undefined}
     */
    ColumnFilter.prototype.enableRenderHtml;
    /**
     * Defaults to false, do we want to trim white spaces from the filter value typed by the user?
     * @type {?|undefined}
     */
    ColumnFilter.prototype.enableTrimWhiteSpace;
    /**
     * Do we want the Filter to handle translation (localization)?
     * @type {?|undefined}
     */
    ColumnFilter.prototype.enableTranslateLabel;
    /**
     * Use "params" to pass any type of arguments to your Custom Filter
     * for example, to pass a second collection to a select Filter we can type this:
     * params: { options: [{ value: true, label: 'True' }, { value: true, label: 'True'} ]}
     * @type {?|undefined}
     */
    ColumnFilter.prototype.params;
    /**
     * Placeholder text that can be used by some Filters.
     * Note that this will override the default placeholder configured in the global config
     * @type {?|undefined}
     */
    ColumnFilter.prototype.placeholder;
    /**
     * Step value of the filter, works only with Filters supporting it (input text, number, float, range, slider)
     * @type {?|undefined}
     */
    ColumnFilter.prototype.valueStep;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uRmlsdGVyLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvbW9kZWxzL2NvbHVtbkZpbHRlci5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQWNBLGtDQStFQzs7Ozs7O0lBN0VDLDBDQUE2Qjs7Ozs7SUFHN0IsZ0NBQWtCOzs7OztJQUdsQixpQ0FBbUI7Ozs7O0lBR25CLG9DQUFzQjs7Ozs7SUFHdEIsbUNBQTJCOzs7OztJQUczQixnQ0FBeUM7Ozs7O0lBR3pDLGdDQUEyQjs7Ozs7SUFHM0IsZ0NBQTJCOzs7OztJQUczQiw2QkFBWTs7Ozs7SUFHWix1Q0FBZ0U7Ozs7OztJQU1oRSxrQ0FBbUI7Ozs7O0lBR25CLHlDQUFxQzs7Ozs7SUFHckMsMENBQStEOzs7OztJQUcvRCx3Q0FBeUQ7Ozs7O0lBR3pELHVDQUE0Qzs7Ozs7SUFHNUMscUNBQTJDOzs7Ozs7SUFNM0Msd0NBQTJCOzs7OztJQUczQiw0Q0FBK0I7Ozs7O0lBRy9CLDRDQUErQjs7Ozs7OztJQU8vQiw4QkFBYTs7Ozs7O0lBTWIsbUNBQXFCOzs7OztJQUdyQixpQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbGxlY3Rpb25DdXN0b21TdHJ1Y3R1cmUsXHJcbiAgQ29sbGVjdGlvbkZpbHRlckJ5LFxyXG4gIENvbGxlY3Rpb25PcHRpb24sXHJcbiAgQ29sbGVjdGlvblNvcnRCeSxcclxuICBDb2x1bW4sXHJcbiAgRmlsdGVyLFxyXG4gIE11bHRpcGxlU2VsZWN0T3B0aW9uLFxyXG4gIE9wZXJhdG9yU3RyaW5nLFxyXG4gIE9wZXJhdG9yVHlwZSxcclxuICBTZWFyY2hUZXJtXHJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbHVtbkZpbHRlciB7XHJcbiAgLyoqIERvIHdlIHdhbnQgdG8gYnlwYXNzIHRoZSBCYWNrZW5kIFF1ZXJ5PyBDb21tb25seSB1c2VkIHdpdGggYW4gT0RhdGEgQmFja2VuZCBTZXJ2aWNlLCBpZiB3ZSB3YW50IHRvIGZpbHRlciB3aXRob3V0IGNhbGxpbmcgdGhlIHJlZ3VsYXIgT0RhdGEgcXVlcnkuICovXHJcbiAgYnlwYXNzQmFja2VuZFF1ZXJ5PzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIENvbHVtbiBJRCAqL1xyXG4gIGNvbHVtbklkPzogc3RyaW5nO1xyXG5cclxuICAvKiogQ29sdW1uIERlZmluaXRpb24gKi9cclxuICBjb2x1bW5EZWY/OiBDb2x1bW47XHJcblxyXG4gIC8qKiBDdXN0b20gRmlsdGVyICovXHJcbiAgY3VzdG9tRmlsdGVyPzogRmlsdGVyO1xyXG5cclxuICAvKiogU2VhcmNoIHRlcm1zIChjb2xsZWN0aW9uKSAqL1xyXG4gIHNlYXJjaFRlcm1zPzogU2VhcmNoVGVybVtdO1xyXG5cclxuICAvKiogT3BlcmF0b3IgdG8gdXNlIHdoZW4gZmlsdGVyaW5nICg+LCA+PSwgRVEsIElOLCAuLi4pICovXHJcbiAgb3BlcmF0b3I/OiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZztcclxuXHJcbiAgLyoqIE1heGltdW0gdmFsdWUgb2YgdGhlIGZpbHRlciwgd29ya3Mgb25seSB3aXRoIEZpbHRlcnMgc3VwcG9ydGluZyBpdCAodGV4dCwgbnVtYmVyLCBmbG9hdCwgc2xpZGVyKSAqL1xyXG4gIG1heFZhbHVlPzogbnVtYmVyIHwgc3RyaW5nO1xyXG5cclxuICAvKiogTWluaW11bSB2YWx1ZSBvZiB0aGUgZmlsdGVyLCB3b3JrcyBvbmx5IHdpdGggRmlsdGVycyBzdXBwb3J0aW5nIGl0ICh0ZXh0LCBudW1iZXIsIGZsb2F0LCBzbGlkZXIpICovXHJcbiAgbWluVmFsdWU/OiBudW1iZXIgfCBzdHJpbmc7XHJcblxyXG4gIC8qKiBGaWx0ZXIgdG8gdXNlIChpbnB1dCwgbXVsdGlwbGVTZWxlY3QsIHNpbmdsZVNlbGVjdCwgc2VsZWN0LCBjdXN0b20pICovXHJcbiAgbW9kZWw/OiBhbnk7XHJcblxyXG4gIC8qKiBBIGNvbGxlY3Rpb24gb2YgaXRlbXMvb3B0aW9ucyB0aGF0IHdpbGwgYmUgbG9hZGVkIGFzeW5jaHJvbm91c2x5IChjb21tb25seSB1c2VkIHdpdGggYSBTZWxlY3QvTXVsdGktU2VsZWN0IEZpbHRlcikgKi9cclxuICBjb2xsZWN0aW9uQXN5bmM/OiBQcm9taXNlPGFueT4gfCBPYnNlcnZhYmxlPGFueT4gfCBTdWJqZWN0PGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY29sbGVjdGlvbiBvZiBpdGVtcy9vcHRpb25zIChjb21tb25seSB1c2VkIHdpdGggYSBTZWxlY3QvTXVsdGktU2VsZWN0IEZpbHRlcilcclxuICAgKiBJdCBjYW4gYmUgYSBjb2xsZWN0aW9uIG9mIHN0cmluZyBvciBsYWJlbC92YWx1ZSBwYWlyICh0aGUgcGFpciBjYW4gYmUgY3VzdG9taXplZCB2aWEgdGhlIFwiY3VzdG9tU3RydWN0dXJlXCIgb3B0aW9uKVxyXG4gICAqL1xyXG4gIGNvbGxlY3Rpb24/OiBhbnlbXTtcclxuXHJcbiAgLyoqIE9wdGlvbnMgdG8gY2hhbmdlIHRoZSBiZWhhdmlvciBvZiB0aGUgXCJjb2xsZWN0aW9uXCIgKi9cclxuICBjb2xsZWN0aW9uT3B0aW9ucz86IENvbGxlY3Rpb25PcHRpb247XHJcblxyXG4gIC8qKiBXZSBjb3VsZCBmaWx0ZXIgc29tZSAxIG9yIG1vcmUgaXRlbXMgZnJvbSB0aGUgY29sbGVjdGlvbiAqL1xyXG4gIGNvbGxlY3Rpb25GaWx0ZXJCeT86IENvbGxlY3Rpb25GaWx0ZXJCeSB8IENvbGxlY3Rpb25GaWx0ZXJCeVtdO1xyXG5cclxuICAvKiogV2UgY291bGQgc29ydCB0aGUgY29sbGVjdGlvbiBieSAxIG9yIG1vcmUgcHJvcGVydGllcywgb3IgYnkgdHJhbnNsYXRlZCB2YWx1ZShzKSB3aGVuIGVuYWJsZVRyYW5zbGF0ZUxhYmVsIGlzIFRydWUgKi9cclxuICBjb2xsZWN0aW9uU29ydEJ5PzogQ29sbGVjdGlvblNvcnRCeSB8IENvbGxlY3Rpb25Tb3J0QnlbXTtcclxuXHJcbiAgLyoqIEEgY3VzdG9tIHN0cnVjdHVyZSBjYW4gYmUgdXNlZCBpbnN0ZWFkIG9mIHRoZSBkZWZhdWx0IGxhYmVsL3ZhbHVlIHBhaXIuIENvbW1vbmx5IHVzZWQgd2l0aCBTZWxlY3QvTXVsdGktU2VsZWN0IEZpbHRlciAqL1xyXG4gIGN1c3RvbVN0cnVjdHVyZT86IENvbGxlY3Rpb25DdXN0b21TdHJ1Y3R1cmU7XHJcblxyXG4gIC8qKiBPcHRpb25zIHRoYXQgY291bGQgYmUgcHJvdmlkZWQgdG8gdGhlIEZpbHRlciwgZXhhbXBsZTogeyBjb250YWluZXI6ICdib2R5JywgbWF4SGVpZ2h0OiAyNTB9ICovXHJcbiAgZmlsdGVyT3B0aW9ucz86IE11bHRpcGxlU2VsZWN0T3B0aW9uIHwgYW55O1xyXG5cclxuICAvKipcclxuICAgKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hlbiBzZXQgaXQgd2lsbCByZW5kZXIgYW55IEhUTUwgY29kZSBpbnN0ZWFkIG9mIHJlbW92aW5nIGl0XHJcbiAgICogU28gZmFyIG9ubHkgdXNlZCBpbiB0aGUgTXVsdGlwbGVTZWxlY3QgJiBTaW5nbGVTZWxlY3QgRmlsdGVycyB3aWxsIHN1cHBvcnQgaXRcclxuICAgKi9cclxuICBlbmFibGVSZW5kZXJIdG1sPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCBkbyB3ZSB3YW50IHRvIHRyaW0gd2hpdGUgc3BhY2VzIGZyb20gdGhlIGZpbHRlciB2YWx1ZSB0eXBlZCBieSB0aGUgdXNlcj8gKi9cclxuICBlbmFibGVUcmltV2hpdGVTcGFjZT86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEbyB3ZSB3YW50IHRoZSBGaWx0ZXIgdG8gaGFuZGxlIHRyYW5zbGF0aW9uIChsb2NhbGl6YXRpb24pPyAqL1xyXG4gIGVuYWJsZVRyYW5zbGF0ZUxhYmVsPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIFwicGFyYW1zXCIgdG8gcGFzcyBhbnkgdHlwZSBvZiBhcmd1bWVudHMgdG8geW91ciBDdXN0b20gRmlsdGVyXHJcbiAgICogZm9yIGV4YW1wbGUsIHRvIHBhc3MgYSBzZWNvbmQgY29sbGVjdGlvbiB0byBhIHNlbGVjdCBGaWx0ZXIgd2UgY2FuIHR5cGUgdGhpczpcclxuICAgKiBwYXJhbXM6IHsgb3B0aW9uczogW3sgdmFsdWU6IHRydWUsIGxhYmVsOiAnVHJ1ZScgfSwgeyB2YWx1ZTogdHJ1ZSwgbGFiZWw6ICdUcnVlJ30gXX1cclxuICAgKi9cclxuICBwYXJhbXM/OiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFBsYWNlaG9sZGVyIHRleHQgdGhhdCBjYW4gYmUgdXNlZCBieSBzb21lIEZpbHRlcnMuXHJcbiAgICogTm90ZSB0aGF0IHRoaXMgd2lsbCBvdmVycmlkZSB0aGUgZGVmYXVsdCBwbGFjZWhvbGRlciBjb25maWd1cmVkIGluIHRoZSBnbG9iYWwgY29uZmlnXHJcbiAgICovXHJcbiAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBTdGVwIHZhbHVlIG9mIHRoZSBmaWx0ZXIsIHdvcmtzIG9ubHkgd2l0aCBGaWx0ZXJzIHN1cHBvcnRpbmcgaXQgKGlucHV0IHRleHQsIG51bWJlciwgZmxvYXQsIHJhbmdlLCBzbGlkZXIpICovXHJcbiAgdmFsdWVTdGVwPzogbnVtYmVyIHwgc3RyaW5nO1xyXG59XHJcbiJdfQ==