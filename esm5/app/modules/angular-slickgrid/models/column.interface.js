/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function Column() { }
if (false) {
    /**
     * async background post-rendering formatter
     * @type {?|undefined}
     */
    Column.prototype.asyncPostRender;
    /**
     * Row Move Behavior, used by the Row Move Manager Plugin
     * @type {?|undefined}
     */
    Column.prototype.behavior;
    /**
     * Block event triggering of an insert?
     * @type {?|undefined}
     */
    Column.prototype.cannotTriggerInsert;
    /**
     * Column group name for grouping of column headers spanning accross multiple columns
     * @type {?|undefined}
     */
    Column.prototype.columnGroup;
    /**
     * CSS class to add to the column cell
     * @type {?|undefined}
     */
    Column.prototype.cssClass;
    /**
     * Column span in pixels or `*`, only input the number value
     * @type {?|undefined}
     */
    Column.prototype.colspan;
    /**
     * Data key, for example this could be used as a property key for complex object comparison (e.g. dataKey: 'id')
     * @type {?|undefined}
     */
    Column.prototype.dataKey;
    /**
     * Do we want default sort to be ascending? True by default
     * @type {?|undefined}
     */
    Column.prototype.defaultSortAsc;
    /**
     * Any inline editor function that implements Editor for the cell value or ColumnEditor
     * @type {?|undefined}
     */
    Column.prototype.editor;
    /**
     * Default to false, which leads to exclude the column from the export?
     * @type {?|undefined}
     */
    Column.prototype.excludeFromExport;
    /**
     * Defaults to false, which leads to exclude the field from the query (mostly a backend service query)
     * @type {?|undefined}
     */
    Column.prototype.excludeFromQuery;
    /**
     * Defaults to false, which leads to exclude the column from getting a header menu. For example, the checkbox row selection should not have a header menu.
     * @type {?|undefined}
     */
    Column.prototype.excludeFromHeaderMenu;
    /**
     * Export with a Custom Formatter, useful when we want to use a different Formatter for the export.
     * For example, we might have a boolean field with "Formatters.checkmark" but we would like see a translated value for (True/False).
     * @type {?|undefined}
     */
    Column.prototype.exportCustomFormatter;
    /**
     * Defaults to false, which leads to Formatters being evaluated on export.
     * Most often used with dates that are stored as UTC but displayed as Date ISO (or any other format) with a Formatter.
     * @type {?|undefined}
     */
    Column.prototype.exportWithFormatter;
    /**
     * Do we want to force the cell value to be a string?
     * When set to True, it will wrap the cell value in double quotes and add an equal sign (=) at the beginning of the cell to force Excel to evaluate it as a string and not change it's format.
     * For example, without this flag a cell value with "1E06" would be interpreted as a number becoming (1.0E06) by Excel.
     * When set this flag to True, the cell value will be wrapped with an equal sign and double quotes, which forces Excel to evaluate it as a string. The output will be:: ="1E06"
     * @type {?|undefined}
     */
    Column.prototype.exportCsvForceToKeepAsString;
    /**
     * Field property name to use from the dataset that is used to display the column data.
     * @type {?}
     */
    Column.prototype.field;
    /**
     * Only used by Backend Services since the query is built using the column definitions, this is a way to pass extra properties to the backend query.
     * It can help in getting more fields for a Formatter without adding a new column definition every time that we don't want to display.
     * For example: { id: 'Users', field: 'user.firstName', fields: ['user.lastName', 'user.middleName'], formatter: fullNameFormatter }
     * @type {?|undefined}
     */
    Column.prototype.fields;
    /**
     * Filter class to use when filtering this column
     * @type {?|undefined}
     */
    Column.prototype.filter;
    /**
     * is the column filterable? Goes with grid option "enableFiltering: true".
     * @type {?|undefined}
     */
    Column.prototype.filterable;
    /**
     * Extra option to filter more easily. For example, a "UTC Date" field can use a search format of US Format like ">02/28/2017"
     * @type {?|undefined}
     */
    Column.prototype.filterSearchType;
    /**
     * are we allowed to focus on the column?
     * @type {?|undefined}
     */
    Column.prototype.focusable;
    /**
     * Formatter function that can be used to change and format certain column(s) in the grid
     * @type {?|undefined}
     */
    Column.prototype.formatter;
    /**
     * Grouping option used by a Draggable Grouping Column
     * @type {?|undefined}
     */
    Column.prototype.grouping;
    /**
     * Group Totals Formatter function that can be used to add grouping totals in the grid
     * @type {?|undefined}
     */
    Column.prototype.groupTotalsFormatter;
    /**
     * Options that can be provide to the Header Menu Plugin
     * @type {?|undefined}
     */
    Column.prototype.header;
    /**
     * CSS class that can be added to the column header
     * @type {?|undefined}
     */
    Column.prototype.headerCssClass;
    /**
     * Column header translation key that can be used by the Translate Service (i18n)
     * @type {?|undefined}
     */
    Column.prototype.headerKey;
    /**
     * ID of the column, each row have to be unique or SlickGrid will throw an error.
     * @type {?}
     */
    Column.prototype.id;
    /**
     * \@internal used internally by Angular-Slickgrid, to copy over the Column Editor Options
     * @type {?|undefined}
     */
    Column.prototype.internalColumnEditor;
    /**
     * Label key, for example this could be used as a property key for complex object label display (e.g. dataKey: 'name')
     * @type {?|undefined}
     */
    Column.prototype.labelKey;
    /**
     * Maximum Width of the column in pixels (number only).
     * @type {?|undefined}
     */
    Column.prototype.maxWidth;
    /**
     * Minimum Width of the column in pixels (number only).
     * @type {?|undefined}
     */
    Column.prototype.minWidth;
    /**
     * Field Name to be displayed in the Grid (UI)
     * @type {?|undefined}
     */
    Column.prototype.name;
    /**
     * an event that can be used for triggering an action after a cell change
     * @type {?|undefined}
     */
    Column.prototype.onCellChange;
    /**
     * an event that can be used for triggering an action after a cell click
     * @type {?|undefined}
     */
    Column.prototype.onCellClick;
    /**
     * column output type
     * @type {?|undefined}
     */
    Column.prototype.outputType;
    /**
     * if you want to pass custom paramaters to your Formatter/Editor or anything else
     * @type {?|undefined}
     */
    Column.prototype.params;
    /**
     * The previous column width in pixels (number only)
     * @type {?|undefined}
     */
    Column.prototype.previousWidth;
    /**
     * Useful when you want to display a certain field to the UI, but you want to use another field to query for Filtering/Sorting.
     * @type {?|undefined}
     */
    Column.prototype.queryField;
    /**
     * Similar to "queryField" but only used with Filtering. Useful when you want to display a certain field to the UI, but you want to use another field to query for Filtering.
     * @type {?|undefined}
     */
    Column.prototype.queryFieldFilter;
    /**
     * Similar to "queryField" but only used with Sorting. Useful when you want to display a certain field to the UI, but you want to use another field to query for Sorting.
     * @type {?|undefined}
     */
    Column.prototype.queryFieldSorter;
    /**
     * Is the column resizable, can we make it wider/thinner? A resize cursor will show on the right side of the column when enabled.
     * @type {?|undefined}
     */
    Column.prototype.resizable;
    /**
     * Do we want to re-render the grid on a grid resize
     * @type {?|undefined}
     */
    Column.prototype.rerenderOnResize;
    /**
     * Defaults to false, which leads to Sanitizing all data (striping out any HTML tags) when being evaluated on export.
     * @type {?|undefined}
     */
    Column.prototype.sanitizeDataExport;
    /**
     * Is the column selectable? Goes with grid option "enableCellNavigation: true".
     * @type {?|undefined}
     */
    Column.prototype.selectable;
    /**
     * Is the column sortable? Goes with grid option "enableSorting: true".
     * @type {?|undefined}
     */
    Column.prototype.sortable;
    /**
     * Custom Sorter function that can be provided to the column
     * @type {?|undefined}
     */
    Column.prototype.sorter;
    /**
     * Custom Tooltip that can ben shown to the column
     * @type {?|undefined}
     */
    Column.prototype.toolTip;
    /**
     * What is the Field Type, this can be used in the Formatters/Editors/...
     * @type {?|undefined}
     */
    Column.prototype.type;
    /**
     * Defaults to false, when set to True will lead to the column being unselected in the UI
     * @type {?|undefined}
     */
    Column.prototype.unselectable;
    /**
     * Editor Validator
     * @type {?|undefined}
     */
    Column.prototype.validator;
    /**
     * Width of the column in pixels (number only).
     * @type {?|undefined}
     */
    Column.prototype.width;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvbW9kZWxzL2NvbHVtbi5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVlBLDRCQWtMQzs7Ozs7O0lBaExDLGlDQUErRjs7Ozs7SUFHL0YsMEJBQWtCOzs7OztJQUdsQixxQ0FBOEI7Ozs7O0lBRzlCLDZCQUFxQjs7Ozs7SUFHckIsMEJBQWtCOzs7OztJQUdsQix5QkFBdUI7Ozs7O0lBR3ZCLHlCQUFjOzs7OztJQUdkLGdDQUF5Qjs7Ozs7SUFHekIsd0JBQTRCOzs7OztJQUc1QixtQ0FBNEI7Ozs7O0lBRzVCLGtDQUEyQjs7Ozs7SUFHM0IsdUNBQWdDOzs7Ozs7SUFNaEMsdUNBQWtDOzs7Ozs7SUFNbEMscUNBQThCOzs7Ozs7OztJQU85Qiw4Q0FBdUM7Ozs7O0lBR3ZDLHVCQUFjOzs7Ozs7O0lBT2Qsd0JBQWtCOzs7OztJQUdsQix3QkFBc0I7Ozs7O0lBR3RCLDRCQUFxQjs7Ozs7SUFHckIsa0NBQTZCOzs7OztJQUc3QiwyQkFBb0I7Ozs7O0lBR3BCLDJCQUFzQjs7Ozs7SUFHdEIsMEJBQW9COzs7OztJQUdwQixzQ0FBNEM7Ozs7O0lBRzVDLHdCQU1FOzs7OztJQUdGLGdDQUF3Qjs7Ozs7SUFHeEIsMkJBQW1COzs7OztJQUduQixvQkFBb0I7Ozs7O0lBS3BCLHNDQUFvQzs7Ozs7SUFHcEMsMEJBQWU7Ozs7O0lBR2YsMEJBQWtCOzs7OztJQUdsQiwwQkFBa0I7Ozs7O0lBR2xCLHNCQUFjOzs7OztJQUdkLDhCQUFxRDs7Ozs7SUFHckQsNkJBQW9EOzs7OztJQUdwRCw0QkFBdUI7Ozs7O0lBR3ZCLHdCQUFxQjs7Ozs7SUFHckIsK0JBQXVCOzs7OztJQUd2Qiw0QkFBb0I7Ozs7O0lBR3BCLGtDQUEwQjs7Ozs7SUFHMUIsa0NBQTBCOzs7OztJQUcxQiwyQkFBb0I7Ozs7O0lBR3BCLGtDQUEyQjs7Ozs7SUFHM0Isb0NBQTZCOzs7OztJQUc3Qiw0QkFBcUI7Ozs7O0lBR3JCLDBCQUFtQjs7Ozs7SUFHbkIsd0JBQWdCOzs7OztJQUdoQix5QkFBaUI7Ozs7O0lBR2pCLHNCQUFpQjs7Ozs7SUFHakIsOEJBQXVCOzs7OztJQUd2QiwyQkFBNEI7Ozs7O0lBRzVCLHVCQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uRWRpdG9yIH0gZnJvbSAnLi9jb2x1bW5FZGl0b3IuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ29sdW1uRmlsdGVyIH0gZnJvbSAnLi9jb2x1bW5GaWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgRWRpdG9yVmFsaWRhdG9yIH0gZnJvbSAnLi9lZGl0b3JWYWxpZGF0b3IuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgRmllbGRUeXBlIH0gZnJvbSAnLi9maWVsZFR5cGUuZW51bSc7XHJcbmltcG9ydCB7IEZvcm1hdHRlciB9IGZyb20gJy4vZm9ybWF0dGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEdyb3VwaW5nIH0gZnJvbSAnLi9ncm91cGluZy5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBHcm91cFRvdGFsc0Zvcm1hdHRlciB9IGZyb20gJy4vZ3JvdXBUb3RhbHNGb3JtYXR0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgSGVhZGVyQnV0dG9uSXRlbSB9IGZyb20gJy4vaGVhZGVyQnV0dG9uSXRlbS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBIZWFkZXJNZW51SXRlbSB9IGZyb20gJy4vaGVhZGVyTWVudUl0ZW0uaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgT25FdmVudEFyZ3MgfSBmcm9tICcuL29uRXZlbnRBcmdzLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFNvcnRlciB9IGZyb20gJy4vc29ydGVyLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbHVtbiB7XHJcbiAgLyoqIGFzeW5jIGJhY2tncm91bmQgcG9zdC1yZW5kZXJpbmcgZm9ybWF0dGVyICovXHJcbiAgYXN5bmNQb3N0UmVuZGVyPzogKGRvbUNlbGxOb2RlOiBhbnksIHJvdzogbnVtYmVyLCBkYXRhQ29udGV4dDogYW55LCBjb2x1bW5EZWY6IENvbHVtbikgPT4gdm9pZDtcclxuXHJcbiAgLyoqIFJvdyBNb3ZlIEJlaGF2aW9yLCB1c2VkIGJ5IHRoZSBSb3cgTW92ZSBNYW5hZ2VyIFBsdWdpbiAqL1xyXG4gIGJlaGF2aW9yPzogc3RyaW5nO1xyXG5cclxuICAvKiogQmxvY2sgZXZlbnQgdHJpZ2dlcmluZyBvZiBhbiBpbnNlcnQ/ICovXHJcbiAgY2Fubm90VHJpZ2dlckluc2VydD86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBDb2x1bW4gZ3JvdXAgbmFtZSBmb3IgZ3JvdXBpbmcgb2YgY29sdW1uIGhlYWRlcnMgc3Bhbm5pbmcgYWNjcm9zcyBtdWx0aXBsZSBjb2x1bW5zICovXHJcbiAgY29sdW1uR3JvdXA/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBDU1MgY2xhc3MgdG8gYWRkIHRvIHRoZSBjb2x1bW4gY2VsbCAqL1xyXG4gIGNzc0NsYXNzPzogc3RyaW5nO1xyXG5cclxuICAvKiogQ29sdW1uIHNwYW4gaW4gcGl4ZWxzIG9yIGAqYCwgb25seSBpbnB1dCB0aGUgbnVtYmVyIHZhbHVlICovXHJcbiAgY29sc3Bhbj86IG51bWJlciB8ICcqJztcclxuXHJcbiAgLyoqIERhdGEga2V5LCBmb3IgZXhhbXBsZSB0aGlzIGNvdWxkIGJlIHVzZWQgYXMgYSBwcm9wZXJ0eSBrZXkgZm9yIGNvbXBsZXggb2JqZWN0IGNvbXBhcmlzb24gKGUuZy4gZGF0YUtleTogJ2lkJykgKi9cclxuICBkYXRhS2V5PzogYW55O1xyXG5cclxuICAvKiogRG8gd2Ugd2FudCBkZWZhdWx0IHNvcnQgdG8gYmUgYXNjZW5kaW5nPyBUcnVlIGJ5IGRlZmF1bHQgKi9cclxuICBkZWZhdWx0U29ydEFzYz86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBBbnkgaW5saW5lIGVkaXRvciBmdW5jdGlvbiB0aGF0IGltcGxlbWVudHMgRWRpdG9yIGZvciB0aGUgY2VsbCB2YWx1ZSBvciBDb2x1bW5FZGl0b3IgKi9cclxuICBlZGl0b3I/OiBhbnkgfCBDb2x1bW5FZGl0b3I7XHJcblxyXG4gIC8qKiBEZWZhdWx0IHRvIGZhbHNlLCB3aGljaCBsZWFkcyB0byBleGNsdWRlIHRoZSBjb2x1bW4gZnJvbSB0aGUgZXhwb3J0PyAqL1xyXG4gIGV4Y2x1ZGVGcm9tRXhwb3J0PzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCBsZWFkcyB0byBleGNsdWRlIHRoZSBmaWVsZCBmcm9tIHRoZSBxdWVyeSAobW9zdGx5IGEgYmFja2VuZCBzZXJ2aWNlIHF1ZXJ5KSAqL1xyXG4gIGV4Y2x1ZGVGcm9tUXVlcnk/OiBib29sZWFuO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIHdoaWNoIGxlYWRzIHRvIGV4Y2x1ZGUgdGhlIGNvbHVtbiBmcm9tIGdldHRpbmcgYSBoZWFkZXIgbWVudS4gRm9yIGV4YW1wbGUsIHRoZSBjaGVja2JveCByb3cgc2VsZWN0aW9uIHNob3VsZCBub3QgaGF2ZSBhIGhlYWRlciBtZW51LiAqL1xyXG4gIGV4Y2x1ZGVGcm9tSGVhZGVyTWVudT86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4cG9ydCB3aXRoIGEgQ3VzdG9tIEZvcm1hdHRlciwgdXNlZnVsIHdoZW4gd2Ugd2FudCB0byB1c2UgYSBkaWZmZXJlbnQgRm9ybWF0dGVyIGZvciB0aGUgZXhwb3J0LlxyXG4gICAqIEZvciBleGFtcGxlLCB3ZSBtaWdodCBoYXZlIGEgYm9vbGVhbiBmaWVsZCB3aXRoIFwiRm9ybWF0dGVycy5jaGVja21hcmtcIiBidXQgd2Ugd291bGQgbGlrZSBzZWUgYSB0cmFuc2xhdGVkIHZhbHVlIGZvciAoVHJ1ZS9GYWxzZSkuXHJcbiAgICovXHJcbiAgZXhwb3J0Q3VzdG9tRm9ybWF0dGVyPzogRm9ybWF0dGVyO1xyXG5cclxuICAvKipcclxuICAgKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hpY2ggbGVhZHMgdG8gRm9ybWF0dGVycyBiZWluZyBldmFsdWF0ZWQgb24gZXhwb3J0LlxyXG4gICAqIE1vc3Qgb2Z0ZW4gdXNlZCB3aXRoIGRhdGVzIHRoYXQgYXJlIHN0b3JlZCBhcyBVVEMgYnV0IGRpc3BsYXllZCBhcyBEYXRlIElTTyAob3IgYW55IG90aGVyIGZvcm1hdCkgd2l0aCBhIEZvcm1hdHRlci5cclxuICAgKi9cclxuICBleHBvcnRXaXRoRm9ybWF0dGVyPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogRG8gd2Ugd2FudCB0byBmb3JjZSB0aGUgY2VsbCB2YWx1ZSB0byBiZSBhIHN0cmluZz9cclxuICAgKiBXaGVuIHNldCB0byBUcnVlLCBpdCB3aWxsIHdyYXAgdGhlIGNlbGwgdmFsdWUgaW4gZG91YmxlIHF1b3RlcyBhbmQgYWRkIGFuIGVxdWFsIHNpZ24gKD0pIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGNlbGwgdG8gZm9yY2UgRXhjZWwgdG8gZXZhbHVhdGUgaXQgYXMgYSBzdHJpbmcgYW5kIG5vdCBjaGFuZ2UgaXQncyBmb3JtYXQuXHJcbiAgICogRm9yIGV4YW1wbGUsIHdpdGhvdXQgdGhpcyBmbGFnIGEgY2VsbCB2YWx1ZSB3aXRoIFwiMUUwNlwiIHdvdWxkIGJlIGludGVycHJldGVkIGFzIGEgbnVtYmVyIGJlY29taW5nICgxLjBFMDYpIGJ5IEV4Y2VsLlxyXG4gICAqIFdoZW4gc2V0IHRoaXMgZmxhZyB0byBUcnVlLCB0aGUgY2VsbCB2YWx1ZSB3aWxsIGJlIHdyYXBwZWQgd2l0aCBhbiBlcXVhbCBzaWduIGFuZCBkb3VibGUgcXVvdGVzLCB3aGljaCBmb3JjZXMgRXhjZWwgdG8gZXZhbHVhdGUgaXQgYXMgYSBzdHJpbmcuIFRoZSBvdXRwdXQgd2lsbCBiZTo6ID1cIjFFMDZcIiAqL1xyXG4gIGV4cG9ydENzdkZvcmNlVG9LZWVwQXNTdHJpbmc/OiBib29sZWFuO1xyXG5cclxuICAvKiogRmllbGQgcHJvcGVydHkgbmFtZSB0byB1c2UgZnJvbSB0aGUgZGF0YXNldCB0aGF0IGlzIHVzZWQgdG8gZGlzcGxheSB0aGUgY29sdW1uIGRhdGEuICAqL1xyXG4gIGZpZWxkOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ubHkgdXNlZCBieSBCYWNrZW5kIFNlcnZpY2VzIHNpbmNlIHRoZSBxdWVyeSBpcyBidWlsdCB1c2luZyB0aGUgY29sdW1uIGRlZmluaXRpb25zLCB0aGlzIGlzIGEgd2F5IHRvIHBhc3MgZXh0cmEgcHJvcGVydGllcyB0byB0aGUgYmFja2VuZCBxdWVyeS5cclxuICAgKiBJdCBjYW4gaGVscCBpbiBnZXR0aW5nIG1vcmUgZmllbGRzIGZvciBhIEZvcm1hdHRlciB3aXRob3V0IGFkZGluZyBhIG5ldyBjb2x1bW4gZGVmaW5pdGlvbiBldmVyeSB0aW1lIHRoYXQgd2UgZG9uJ3Qgd2FudCB0byBkaXNwbGF5LlxyXG4gICAqIEZvciBleGFtcGxlOiB7IGlkOiAnVXNlcnMnLCBmaWVsZDogJ3VzZXIuZmlyc3ROYW1lJywgZmllbGRzOiBbJ3VzZXIubGFzdE5hbWUnLCAndXNlci5taWRkbGVOYW1lJ10sIGZvcm1hdHRlcjogZnVsbE5hbWVGb3JtYXR0ZXIgfVxyXG4gICAqL1xyXG4gIGZpZWxkcz86IHN0cmluZ1tdO1xyXG5cclxuICAvKiogRmlsdGVyIGNsYXNzIHRvIHVzZSB3aGVuIGZpbHRlcmluZyB0aGlzIGNvbHVtbiAqL1xyXG4gIGZpbHRlcj86IENvbHVtbkZpbHRlcjtcclxuXHJcbiAgLyoqIGlzIHRoZSBjb2x1bW4gZmlsdGVyYWJsZT8gR29lcyB3aXRoIGdyaWQgb3B0aW9uIFwiZW5hYmxlRmlsdGVyaW5nOiB0cnVlXCIuICovXHJcbiAgZmlsdGVyYWJsZT86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBFeHRyYSBvcHRpb24gdG8gZmlsdGVyIG1vcmUgZWFzaWx5LiBGb3IgZXhhbXBsZSwgYSBcIlVUQyBEYXRlXCIgZmllbGQgY2FuIHVzZSBhIHNlYXJjaCBmb3JtYXQgb2YgVVMgRm9ybWF0IGxpa2UgXCI+MDIvMjgvMjAxN1wiICovXHJcbiAgZmlsdGVyU2VhcmNoVHlwZT86IEZpZWxkVHlwZTtcclxuXHJcbiAgLyoqIGFyZSB3ZSBhbGxvd2VkIHRvIGZvY3VzIG9uIHRoZSBjb2x1bW4/ICovXHJcbiAgZm9jdXNhYmxlPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIEZvcm1hdHRlciBmdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGNoYW5nZSBhbmQgZm9ybWF0IGNlcnRhaW4gY29sdW1uKHMpIGluIHRoZSBncmlkICovXHJcbiAgZm9ybWF0dGVyPzogRm9ybWF0dGVyO1xyXG5cclxuICAvKiogR3JvdXBpbmcgb3B0aW9uIHVzZWQgYnkgYSBEcmFnZ2FibGUgR3JvdXBpbmcgQ29sdW1uICovXHJcbiAgZ3JvdXBpbmc/OiBHcm91cGluZztcclxuXHJcbiAgLyoqIEdyb3VwIFRvdGFscyBGb3JtYXR0ZXIgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBhZGQgZ3JvdXBpbmcgdG90YWxzIGluIHRoZSBncmlkICovXHJcbiAgZ3JvdXBUb3RhbHNGb3JtYXR0ZXI/OiBHcm91cFRvdGFsc0Zvcm1hdHRlcjtcclxuXHJcbiAgLyoqIE9wdGlvbnMgdGhhdCBjYW4gYmUgcHJvdmlkZSB0byB0aGUgSGVhZGVyIE1lbnUgUGx1Z2luICovXHJcbiAgaGVhZGVyPzoge1xyXG4gICAgLyoqIGxpc3Qgb2YgQnV0dG9ucyB0byBzaG93IGluIHRoZSBoZWFkZXIgKi9cclxuICAgIGJ1dHRvbnM/OiBIZWFkZXJCdXR0b25JdGVtW107XHJcbiAgICBtZW51Pzoge1xyXG4gICAgICBpdGVtczogSGVhZGVyTWVudUl0ZW1bXTtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgLyoqIENTUyBjbGFzcyB0aGF0IGNhbiBiZSBhZGRlZCB0byB0aGUgY29sdW1uIGhlYWRlciAqL1xyXG4gIGhlYWRlckNzc0NsYXNzPzogc3RyaW5nO1xyXG5cclxuICAvKiogQ29sdW1uIGhlYWRlciB0cmFuc2xhdGlvbiBrZXkgdGhhdCBjYW4gYmUgdXNlZCBieSB0aGUgVHJhbnNsYXRlIFNlcnZpY2UgKGkxOG4pICovXHJcbiAgaGVhZGVyS2V5Pzogc3RyaW5nO1xyXG5cclxuICAvKiogSUQgb2YgdGhlIGNvbHVtbiwgZWFjaCByb3cgaGF2ZSB0byBiZSB1bmlxdWUgb3IgU2xpY2tHcmlkIHdpbGwgdGhyb3cgYW4gZXJyb3IuICovXHJcbiAgaWQ6IG51bWJlciB8IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsIHVzZWQgaW50ZXJuYWxseSBieSBBbmd1bGFyLVNsaWNrZ3JpZCwgdG8gY29weSBvdmVyIHRoZSBDb2x1bW4gRWRpdG9yIE9wdGlvbnNcclxuICAgKi9cclxuICBpbnRlcm5hbENvbHVtbkVkaXRvcj86IENvbHVtbkVkaXRvcjtcclxuXHJcbiAgLyoqIExhYmVsIGtleSwgZm9yIGV4YW1wbGUgdGhpcyBjb3VsZCBiZSB1c2VkIGFzIGEgcHJvcGVydHkga2V5IGZvciBjb21wbGV4IG9iamVjdCBsYWJlbCBkaXNwbGF5IChlLmcuIGRhdGFLZXk6ICduYW1lJykgKi9cclxuICBsYWJlbEtleT86IGFueTtcclxuXHJcbiAgLyoqIE1heGltdW0gV2lkdGggb2YgdGhlIGNvbHVtbiBpbiBwaXhlbHMgKG51bWJlciBvbmx5KS4gKi9cclxuICBtYXhXaWR0aD86IG51bWJlcjtcclxuXHJcbiAgLyoqIE1pbmltdW0gV2lkdGggb2YgdGhlIGNvbHVtbiBpbiBwaXhlbHMgKG51bWJlciBvbmx5KS4gKi9cclxuICBtaW5XaWR0aD86IG51bWJlcjtcclxuXHJcbiAgLyoqIEZpZWxkIE5hbWUgdG8gYmUgZGlzcGxheWVkIGluIHRoZSBHcmlkIChVSSkgKi9cclxuICBuYW1lPzogc3RyaW5nO1xyXG5cclxuICAvKiogYW4gZXZlbnQgdGhhdCBjYW4gYmUgdXNlZCBmb3IgdHJpZ2dlcmluZyBhbiBhY3Rpb24gYWZ0ZXIgYSBjZWxsIGNoYW5nZSAqL1xyXG4gIG9uQ2VsbENoYW5nZT86IChlOiBFdmVudCwgYXJnczogT25FdmVudEFyZ3MpID0+IHZvaWQ7XHJcblxyXG4gIC8qKiBhbiBldmVudCB0aGF0IGNhbiBiZSB1c2VkIGZvciB0cmlnZ2VyaW5nIGFuIGFjdGlvbiBhZnRlciBhIGNlbGwgY2xpY2sgKi9cclxuICBvbkNlbGxDbGljaz86IChlOiBFdmVudCwgYXJnczogT25FdmVudEFyZ3MpID0+IHZvaWQ7XHJcblxyXG4gIC8qKiBjb2x1bW4gb3V0cHV0IHR5cGUgKi9cclxuICBvdXRwdXRUeXBlPzogRmllbGRUeXBlO1xyXG5cclxuICAvKiogaWYgeW91IHdhbnQgdG8gcGFzcyBjdXN0b20gcGFyYW1hdGVycyB0byB5b3VyIEZvcm1hdHRlci9FZGl0b3Igb3IgYW55dGhpbmcgZWxzZSAqL1xyXG4gIHBhcmFtcz86IGFueSB8IGFueVtdO1xyXG5cclxuICAvKiogVGhlIHByZXZpb3VzIGNvbHVtbiB3aWR0aCBpbiBwaXhlbHMgKG51bWJlciBvbmx5KSAqL1xyXG4gIHByZXZpb3VzV2lkdGg/OiBudW1iZXI7XHJcblxyXG4gIC8qKiBVc2VmdWwgd2hlbiB5b3Ugd2FudCB0byBkaXNwbGF5IGEgY2VydGFpbiBmaWVsZCB0byB0aGUgVUksIGJ1dCB5b3Ugd2FudCB0byB1c2UgYW5vdGhlciBmaWVsZCB0byBxdWVyeSBmb3IgRmlsdGVyaW5nL1NvcnRpbmcuICovXHJcbiAgcXVlcnlGaWVsZD86IHN0cmluZztcclxuXHJcbiAgLyoqIFNpbWlsYXIgdG8gXCJxdWVyeUZpZWxkXCIgYnV0IG9ubHkgdXNlZCB3aXRoIEZpbHRlcmluZy4gVXNlZnVsIHdoZW4geW91IHdhbnQgdG8gZGlzcGxheSBhIGNlcnRhaW4gZmllbGQgdG8gdGhlIFVJLCBidXQgeW91IHdhbnQgdG8gdXNlIGFub3RoZXIgZmllbGQgdG8gcXVlcnkgZm9yIEZpbHRlcmluZy4gKi9cclxuICBxdWVyeUZpZWxkRmlsdGVyPzogc3RyaW5nO1xyXG5cclxuICAvKiogU2ltaWxhciB0byBcInF1ZXJ5RmllbGRcIiBidXQgb25seSB1c2VkIHdpdGggU29ydGluZy4gVXNlZnVsIHdoZW4geW91IHdhbnQgdG8gZGlzcGxheSBhIGNlcnRhaW4gZmllbGQgdG8gdGhlIFVJLCBidXQgeW91IHdhbnQgdG8gdXNlIGFub3RoZXIgZmllbGQgdG8gcXVlcnkgZm9yIFNvcnRpbmcuICovXHJcbiAgcXVlcnlGaWVsZFNvcnRlcj86IHN0cmluZztcclxuXHJcbiAgLyoqIElzIHRoZSBjb2x1bW4gcmVzaXphYmxlLCBjYW4gd2UgbWFrZSBpdCB3aWRlci90aGlubmVyPyBBIHJlc2l6ZSBjdXJzb3Igd2lsbCBzaG93IG9uIHRoZSByaWdodCBzaWRlIG9mIHRoZSBjb2x1bW4gd2hlbiBlbmFibGVkLiAqL1xyXG4gIHJlc2l6YWJsZT86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEbyB3ZSB3YW50IHRvIHJlLXJlbmRlciB0aGUgZ3JpZCBvbiBhIGdyaWQgcmVzaXplICovXHJcbiAgcmVyZW5kZXJPblJlc2l6ZT86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hpY2ggbGVhZHMgdG8gU2FuaXRpemluZyBhbGwgZGF0YSAoc3RyaXBpbmcgb3V0IGFueSBIVE1MIHRhZ3MpIHdoZW4gYmVpbmcgZXZhbHVhdGVkIG9uIGV4cG9ydC4gKi9cclxuICBzYW5pdGl6ZURhdGFFeHBvcnQ/OiBib29sZWFuO1xyXG5cclxuICAvKiogSXMgdGhlIGNvbHVtbiBzZWxlY3RhYmxlPyBHb2VzIHdpdGggZ3JpZCBvcHRpb24gXCJlbmFibGVDZWxsTmF2aWdhdGlvbjogdHJ1ZVwiLiAqL1xyXG4gIHNlbGVjdGFibGU/OiBib29sZWFuO1xyXG5cclxuICAvKiogSXMgdGhlIGNvbHVtbiBzb3J0YWJsZT8gR29lcyB3aXRoIGdyaWQgb3B0aW9uIFwiZW5hYmxlU29ydGluZzogdHJ1ZVwiLiAqL1xyXG4gIHNvcnRhYmxlPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIEN1c3RvbSBTb3J0ZXIgZnVuY3Rpb24gdGhhdCBjYW4gYmUgcHJvdmlkZWQgdG8gdGhlIGNvbHVtbiAqL1xyXG4gIHNvcnRlcj86IFNvcnRlcjtcclxuXHJcbiAgLyoqIEN1c3RvbSBUb29sdGlwIHRoYXQgY2FuIGJlbiBzaG93biB0byB0aGUgY29sdW1uICovXHJcbiAgdG9vbFRpcD86IHN0cmluZztcclxuXHJcbiAgLyoqIFdoYXQgaXMgdGhlIEZpZWxkIFR5cGUsIHRoaXMgY2FuIGJlIHVzZWQgaW4gdGhlIEZvcm1hdHRlcnMvRWRpdG9ycy8uLi4gKi9cclxuICB0eXBlPzogRmllbGRUeXBlO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIHdoZW4gc2V0IHRvIFRydWUgd2lsbCBsZWFkIHRvIHRoZSBjb2x1bW4gYmVpbmcgdW5zZWxlY3RlZCBpbiB0aGUgVUkgKi9cclxuICB1bnNlbGVjdGFibGU/OiBib29sZWFuO1xyXG5cclxuICAvKiogRWRpdG9yIFZhbGlkYXRvciAqL1xyXG4gIHZhbGlkYXRvcj86IEVkaXRvclZhbGlkYXRvcjtcclxuXHJcbiAgLyoqIFdpZHRoIG9mIHRoZSBjb2x1bW4gaW4gcGl4ZWxzIChudW1iZXIgb25seSkuICovXHJcbiAgd2lkdGg/OiBudW1iZXI7XHJcbn1cclxuIl19