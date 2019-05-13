/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function GridOption() { }
if (false) {
    /**
     * CSS class name used on newly added row
     * @type {?|undefined}
     */
    GridOption.prototype.addNewRowCssClass;
    /**
     * Defaults to true, which leads to always show a vertical scrolling. This is rather important to use when using the Grid Menu (hamburger)
     * @type {?|undefined}
     */
    GridOption.prototype.alwaysShowVerticalScroll;
    /**
     * Defaults to 100, which is the asynchronous editor loading delay
     * @type {?|undefined}
     */
    GridOption.prototype.asyncEditorLoadDelay;
    /**
     * Defaults to false, which leads to load editor asynchronously (delayed)
     * @type {?|undefined}
     */
    GridOption.prototype.asyncEditorLoading;
    /**
     * Defaults to 50, which is the delay before the asynchronous post renderer start execution
     * @type {?|undefined}
     */
    GridOption.prototype.asyncPostRenderDelay;
    /**
     * Defaults to 40, which is the delay before the asynchronous post renderer start cleanup execution
     * @type {?|undefined}
     */
    GridOption.prototype.asyncPostRenderCleanupDelay;
    /**
     * Defaults to false, when enabled will try to commit the current edit without focusing on the next row. If a custom editor is implemented and the grid cannot auto commit, you must use this option to implement it yourself
     * @type {?|undefined}
     */
    GridOption.prototype.autoCommitEdit;
    /**
     * Defaults to false, when enabled will automatically open the inlined editor as soon as there is a focus on the cell (can be combined with "enableCellNavigation: true").
     * @type {?|undefined}
     */
    GridOption.prototype.autoEdit;
    /**
     * Defaults to true, which leads to automatically adjust the size of each column with the available space. Similar to "Force Fit Column" but only happens on first page/component load.
     * @type {?|undefined}
     */
    GridOption.prototype.autoFitColumnsOnFirstLoad;
    /**
     * Defaults to false, which leads to automatically adjust the size (height) of the grid to display the entire content without any scrolling in the grid.
     * @type {?|undefined}
     */
    GridOption.prototype.autoHeight;
    /**
     * Auto-resize options (bottom padding, minHeight, ...)
     * @type {?|undefined}
     */
    GridOption.prototype.autoResize;
    /**
     * Auto-tooltip options (enableForCells, enableForHeaderCells, maxToolTipLength)
     * @type {?|undefined}
     */
    GridOption.prototype.autoTooltipOptions;
    /**
     * Backend Service API definition (GraphQL/OData Services)
     * @type {?|undefined}
     */
    GridOption.prototype.backendServiceApi;
    /**
     * CSS class name used to simulate cell flashing
     * @type {?|undefined}
     */
    GridOption.prototype.cellFlashingCssClass;
    /**
     * CSS class name used when highlighting a cell value. Useful to change background color of the activated cell
     * @type {?|undefined}
     */
    GridOption.prototype.cellHighlightCssClass;
    /**
     * Checkbox Select Plugin options (columnId, cssClass, toolTip, width)
     * @type {?|undefined}
     */
    GridOption.prototype.checkboxSelector;
    /**
     * Column Picker Plugin options (columnTitle, forceFitTitle, syncResizeTitle)
     * @type {?|undefined}
     */
    GridOption.prototype.columnPicker;
    /**
     * Defaults to false, which leads to create the footer row of the grid
     * @type {?|undefined}
     */
    GridOption.prototype.createFooterRow;
    /**
     * A callback function that will be used to define row spanning accross multiple columns
     * @type {?|undefined}
     */
    GridOption.prototype.colspanCallback;
    /**
     * Default to false, which leads to create an extra pre-header panel (on top of column header) for column grouping purposes
     * @type {?|undefined}
     */
    GridOption.prototype.createPreHeaderPanel;
    /**
     * Data item column value extractor (getter) that can be used by the Excel like copy buffer plugin
     * @type {?|undefined}
     */
    GridOption.prototype.dataItemColumnValueExtractor;
    /**
     * Data item column value setter that can be used by the Excel like copy buffer plugin
     * @type {?|undefined}
     */
    GridOption.prototype.dataItemColumnValueSetter;
    /**
     * Unique property name on the dataset used by Slick.Data.DataView
     * @type {?|undefined}
     */
    GridOption.prototype.datasetIdPropertyName;
    /** @type {?|undefined} */
    GridOption.prototype.dataView;
    /**
     * Default column width, is set to 80 when null
     * @type {?|undefined}
     */
    GridOption.prototype.defaultColumnWidth;
    /**
     * The default filter model to use when none is specified
     * @type {?|undefined}
     */
    GridOption.prototype.defaultFilter;
    /**
     * Default placeholder to use in Filters that support placeholder (input, flatpickr)
     * @type {?|undefined}
     */
    GridOption.prototype.defaultFilterPlaceholder;
    /**
     * Draggable Grouping Plugin options & events
     * @type {?|undefined}
     */
    GridOption.prototype.draggableGrouping;
    /**
     * Defaults to false, when enabled will give the possibility to edit cell values with inline editors.
     * @type {?|undefined}
     */
    GridOption.prototype.editable;
    /**
     * option to intercept edit commands and implement undo support.
     * @type {?|undefined}
     */
    GridOption.prototype.editCommandHandler;
    /**
     * Editor classes factory
     * @type {?|undefined}
     */
    GridOption.prototype.editorFactory;
    /**
     * a global singleton editor lock.
     * @type {?|undefined}
     */
    GridOption.prototype.editorLock;
    /**
     * Do we want to emulate paging when we are scrolling?
     * @type {?|undefined}
     */
    GridOption.prototype.emulatePagingWhenScrolling;
    /**
     * Defaults to false, which leads to give user possibility to add row to the grid
     * @type {?|undefined}
     */
    GridOption.prototype.enableAddRow;
    /**
     * Do we want to enable asynchronous (delayed) post rendering
     * @type {?|undefined}
     */
    GridOption.prototype.enableAsyncPostRender;
    /**
     * Defaults to false, which leads to cleanup after the post render is finished executing
     * @type {?|undefined}
     */
    GridOption.prototype.enableAsyncPostRenderCleanup;
    /**
     * Defaults to true, which will automatically resize the grid whenever the browser size changes
     * @type {?|undefined}
     */
    GridOption.prototype.enableAutoResize;
    /**
     * Defaults to true, which will automatically resize the column headers whenever the grid size changes
     * @type {?|undefined}
     */
    GridOption.prototype.enableAutoSizeColumns;
    /**
     * Defaults to false, which leads to showing tooltip over cell & header values that are not shown completely (... ellipsis)
     * @type {?|undefined}
     */
    GridOption.prototype.enableAutoTooltip;
    /**
     * Defaults to false, which will let user click on cell and navigate with arrow keys.
     * @type {?|undefined}
     */
    GridOption.prototype.enableCellNavigation;
    /**
     * Defaults to false, when enabled it will add a column for checkbox selection at the 1st column position. A selection will trigger the "onSelectedRowsChanged" event.
     * @type {?|undefined}
     */
    GridOption.prototype.enableCheckboxSelector;
    /**
     * Defaults to true, when enabled will give the possibility to do a right+click on any header title which will open the list of column. User can show/hide a column by using the checkbox from that picker list.
     * @type {?|undefined}
     */
    GridOption.prototype.enableColumnPicker;
    /**
     * Defaults to true, which permits the user to move an entire column from a position to another.
     * @type {?|undefined}
     */
    GridOption.prototype.enableColumnReorder;
    /**
     * Defaults to false, do we want to enable the Draggable Grouping Plugin?
     * @type {?|undefined}
     */
    GridOption.prototype.enableDraggableGrouping;
    /**
     * Defaults to true, which leads to use an Excel like copy buffer that gets copied in clipboard and can be pasted back in Excel or any other app
     * @type {?|undefined}
     */
    GridOption.prototype.enableExcelCopyBuffer;
    /**
     * Do we want to enable the Export to File? (if Yes, it will show up in the Grid Menu)
     * @type {?|undefined}
     */
    GridOption.prototype.enableExport;
    /**
     * Do we want to enable Filters?
     * @type {?|undefined}
     */
    GridOption.prototype.enableFiltering;
    /**
     * Defaults to false, do we want to globally trim white spaces on all filter values typed by the user?
     * User can choose to override the default
     * @type {?|undefined}
     */
    GridOption.prototype.enableFilterTrimWhiteSpace;
    /**
     * Do we want to enable Grid Menu (aka hamburger menu)
     * @type {?|undefined}
     */
    GridOption.prototype.enableGridMenu;
    /**
     * Defaults to false, do we want to enable the Grouping & Aggregator Plugin?
     * @type {?|undefined}
     */
    GridOption.prototype.enableGrouping;
    /**
     * Do we want to enable Header Buttons? (buttons with commands that can be shown beside each column)
     * @type {?|undefined}
     */
    GridOption.prototype.enableHeaderButton;
    /**
     * Do we want to enable Header Menu? (when hovering a column, a menu will appear for that column)
     * @type {?|undefined}
     */
    GridOption.prototype.enableHeaderMenu;
    /**
     * Do we want to enable a styling effect when hovering any row from the grid?
     * @type {?|undefined}
     */
    GridOption.prototype.enableMouseHoverHighlightRow;
    /**
     * Do we want to enable pagination? Currently only works with a Backend Service API
     * @type {?|undefined}
     */
    GridOption.prototype.enablePagination;
    /**
     * Defaults to false, do we want to enable the Row Detail Plugin?
     * @type {?|undefined}
     */
    GridOption.prototype.enableRowDetailView;
    /**
     * Defaults to false, when enabled it will make possible to move rows in the grid.
     * @type {?|undefined}
     */
    GridOption.prototype.enableRowMoveManager;
    /**
     * Do we want to enable row selection?
     * @type {?|undefined}
     */
    GridOption.prototype.enableRowSelection;
    /**
     * Do we want to enable sorting?
     * @type {?|undefined}
     */
    GridOption.prototype.enableSorting;
    /**
     * Do we want to enable text selection on cells? Useful when user wants to do copy to clipboard.
     * @type {?|undefined}
     */
    GridOption.prototype.enableTextSelectionOnCells;
    /**
     * Do we want to enable localization translation (i18n)?
     * @type {?|undefined}
     */
    GridOption.prototype.enableTranslate;
    /**
     * Do we want explicit grid initialization?
     * @type {?|undefined}
     */
    GridOption.prototype.explicitInitialization;
    /**
     * Some default options to set for the export service
     * @type {?|undefined}
     */
    GridOption.prototype.exportOptions;
    /**
     * Defaults to 25, which is the grid footer row panel height
     * @type {?|undefined}
     */
    GridOption.prototype.footerRowHeight;
    /**
     * Do we want to force fit columns in the grid at all time?
     * @type {?|undefined}
     */
    GridOption.prototype.forceFitColumns;
    /**
     * Defaults to false, force synchronous scrolling
     * @type {?|undefined}
     */
    GridOption.prototype.forceSyncScrolling;
    /**
     * Formatter classes factory
     * @type {?|undefined}
     */
    GridOption.prototype.formatterFactory;
    /**
     * Defaults to false, do we want to freeze (pin) the bottom portion instead of the top
     * @type {?|undefined}
     */
    GridOption.prototype.frozenBottom;
    /**
     * Number of column(s) to freeze (pin) in the grid
     * @type {?|undefined}
     */
    GridOption.prototype.frozenColumn;
    /**
     * Number of row(s) to freeze (pin) in the grid
     * @type {?|undefined}
     */
    GridOption.prototype.frozenRow;
    /**
     * Defaults to false, which leads to have row with full width
     * @type {?|undefined}
     */
    GridOption.prototype.fullWidthRows;
    /**
     * Grid DOM element container ID (used Angular-Slickgrid auto-resizer)
     * @type {?|undefined}
     */
    GridOption.prototype.gridContainerId;
    /**
     * Grid Menu options (aka hamburger menu)
     * @type {?|undefined}
     */
    GridOption.prototype.gridMenu;
    /**
     * Grid DOM element ID
     * @type {?|undefined}
     */
    GridOption.prototype.gridId;
    /**
     * Header row height in pixels (only type the number). Header row is where the filters are.
     * @type {?|undefined}
     */
    GridOption.prototype.headerRowHeight;
    /**
     * Header button options
     * @type {?|undefined}
     */
    GridOption.prototype.headerButton;
    /**
     * Header menu options
     * @type {?|undefined}
     */
    GridOption.prototype.headerMenu;
    /**
     * ngx-translate i18n translation service instance
     * @type {?|undefined}
     */
    GridOption.prototype.i18n;
    /**
     * Do we leave space for new rows in the DOM visible buffer
     * @type {?|undefined}
     */
    GridOption.prototype.leaveSpaceForNewRows;
    /**
     * What is the minimum row buffer to use?
     * @type {?|undefined}
     */
    GridOption.prototype.minRowBuffer;
    /**
     * Defaults to false, which leads to be able to do multiple columns sorting (or single sort when false)
     * @type {?|undefined}
     */
    GridOption.prototype.multiColumnSort;
    /**
     * Defaults to true, which leads to be able to do multiple selection
     * @type {?|undefined}
     */
    GridOption.prototype.multiSelect;
    /**
     * Defaults to true, which will display numbers indicating column sort precedence are displayed in the columns when multiple columns selected
     * @type {?|undefined}
     */
    GridOption.prototype.numberedMultiColumnSort;
    /**
     * Pagination options, these are currently used ONLY with a Backend Service API (GraphQL/OData Services)
     * @type {?|undefined}
     */
    GridOption.prototype.pagination;
    /**
     * if you want to pass custom paramaters to your Formatter/Editor or anything else
     * @type {?|undefined}
     */
    GridOption.prototype.params;
    /**
     * Extra pre-header panel height (on top of column header)
     * @type {?|undefined}
     */
    GridOption.prototype.preHeaderPanelHeight;
    /**
     * Do we want to preserve copied selection on paste?
     * @type {?|undefined}
     */
    GridOption.prototype.preserveCopiedSelectionOnPaste;
    /**
     * Query presets before grid load (filters, sorters, pagination)
     * @type {?|undefined}
     */
    GridOption.prototype.presets;
    /**
     * Preselect certain rows by their row index ("enableCheckboxSelector" must be enabled)
     * @type {?|undefined}
     */
    GridOption.prototype.preselectedRows;
    /**
     * Register 1 or more Slick Plugins
     * @type {?|undefined}
     */
    GridOption.prototype.registerPlugins;
    /**
     * Row Detail View Plugin options & events (columnId, cssClass, toolTip, width)
     * @type {?|undefined}
     */
    GridOption.prototype.rowDetailView;
    /**
     * Grid row height in pixels (only type the number). Row of cell values.
     * @type {?|undefined}
     */
    GridOption.prototype.rowHeight;
    /**
     * Row Move Manager Plugin options & events
     * @type {?|undefined}
     */
    GridOption.prototype.rowMoveManager;
    /**
     * Row selection options
     * @type {?|undefined}
     */
    GridOption.prototype.rowSelectionOptions;
    /**
     * Optionally pass some options to the 3rd party lib "cure32/DOMPurify" used in some Filters.
     * For this to work, "enableRenderHtml" as to be enabled.
     * @type {?|undefined}
     */
    GridOption.prototype.sanitizeHtmlOptions;
    /**
     * CSS class name used when cell is selected
     * @type {?|undefined}
     */
    GridOption.prototype.selectedCellCssClass;
    /**
     * Do we want to show cell selection?
     * @type {?|undefined}
     */
    GridOption.prototype.showCellSelection;
    /**
     * Do we want to show the footer row?
     * @type {?|undefined}
     */
    GridOption.prototype.showFooterRow;
    /**
     * Do we want to show header row?
     * @type {?|undefined}
     */
    GridOption.prototype.showHeaderRow;
    /**
     * Do we want to show the extra pre-header panel (on top of column header) for column grouping purposes
     * @type {?|undefined}
     */
    GridOption.prototype.showPreHeaderPanel;
    /**
     * Do we want to show top panel row?
     * @type {?|undefined}
     */
    GridOption.prototype.showTopPanel;
    /**
     * Defaults to true, which leads to render a separate span for the number and styles it with css class <i>slick-sort-indicator-numbered</i>
     * @type {?|undefined}
     */
    GridOption.prototype.sortColNumberInSeparateSpan;
    /**
     * Defaults to true, which leads to suppress the cell from becoming active when cell as an editor and is clicked.
     * This flag should be enabled especially when mixing these 2 features (Row Selections & Inline Editors)
     * @type {?|undefined}
     */
    GridOption.prototype.suppressActiveCellChangeOnEdit;
    /**
     * Defaults to false, when set to True will sync the column cell resize & apply the column width
     * @type {?|undefined}
     */
    GridOption.prototype.syncColumnCellResize;
    /**
     * What is the top panel height in pixels (only type the number)
     * @type {?|undefined}
     */
    GridOption.prototype.topPanelHeight;
    /**
     * Defaults to false, when set to True will lead to multiple columns sorting without the need to hold or do shift-click to execute a multiple sort.
     * @type {?|undefined}
     */
    GridOption.prototype.tristateMultiColumnSort;
    /**
     * Defaults to null, which is the default Viewport CSS class name
     * @type {?|undefined}
     */
    GridOption.prototype.viewportClass;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZE9wdGlvbi5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL21vZGVscy9ncmlkT3B0aW9uLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBbUJBLGdDQXdWQzs7Ozs7O0lBdFZDLHVDQUEyQjs7Ozs7SUFHM0IsOENBQW1DOzs7OztJQUduQywwQ0FBOEI7Ozs7O0lBRzlCLHdDQUE2Qjs7Ozs7SUFHN0IsMENBQThCOzs7OztJQUc5QixpREFBcUM7Ozs7O0lBR3JDLG9DQUF5Qjs7Ozs7SUFHekIsOEJBQW1COzs7OztJQUduQiwrQ0FBb0M7Ozs7O0lBR3BDLGdDQUFxQjs7Ozs7SUFHckIsZ0NBQThCOzs7OztJQUc5Qix3Q0FTRTs7Ozs7SUFHRix1Q0FBc0M7Ozs7O0lBR3RDLDBDQUE4Qjs7Ozs7SUFHOUIsMkNBQXNDOzs7OztJQUd0QyxzQ0FBb0M7Ozs7O0lBR3BDLGtDQUE0Qjs7Ozs7SUFHNUIscUNBQTBCOzs7OztJQUcxQixxQ0FBa0Q7Ozs7O0lBR2xELDBDQUErQjs7Ozs7SUFHL0Isa0RBQXFFOzs7OztJQUdyRSwrQ0FBK0U7Ozs7O0lBRy9FLDJDQUErQjs7SUFFL0IsOEJBTUU7Ozs7O0lBR0Ysd0NBQTRCOzs7OztJQUc1QixtQ0FBb0I7Ozs7O0lBR3BCLDhDQUFrQzs7Ozs7SUFHbEMsdUNBQXNDOzs7OztJQUd0Qyw4QkFBbUI7Ozs7O0lBR25CLHdDQUErRTs7Ozs7SUFHL0UsbUNBQW9COzs7OztJQUdwQixnQ0FBaUI7Ozs7O0lBR2pCLGdEQUFxQzs7Ozs7SUFHckMsa0NBQXVCOzs7OztJQUd2QiwyQ0FBZ0M7Ozs7O0lBR2hDLGtEQUF1Qzs7Ozs7SUFHdkMsc0NBQTJCOzs7OztJQUczQiwyQ0FBZ0M7Ozs7O0lBR2hDLHVDQUE0Qjs7Ozs7SUFHNUIsMENBQStCOzs7OztJQUcvQiw0Q0FBaUM7Ozs7O0lBR2pDLHdDQUE2Qjs7Ozs7SUFHN0IseUNBQThCOzs7OztJQUc5Qiw2Q0FBa0M7Ozs7O0lBR2xDLDJDQUFnQzs7Ozs7SUFHaEMsa0NBQXVCOzs7OztJQUd2QixxQ0FBMEI7Ozs7OztJQU0xQixnREFBcUM7Ozs7O0lBR3JDLG9DQUF5Qjs7Ozs7SUFHekIsb0NBQXlCOzs7OztJQUd6Qix3Q0FBNkI7Ozs7O0lBRzdCLHNDQUEyQjs7Ozs7SUFHM0Isa0RBQXVDOzs7OztJQUd2QyxzQ0FBMkI7Ozs7O0lBRzNCLHlDQUE4Qjs7Ozs7SUFHOUIsMENBQStCOzs7OztJQUcvQix3Q0FBNkI7Ozs7O0lBRzdCLG1DQUF3Qjs7Ozs7SUFHeEIsZ0RBQXFDOzs7OztJQUdyQyxxQ0FBMEI7Ozs7O0lBRzFCLDRDQUFpQzs7Ozs7SUFHakMsbUNBQTZCOzs7OztJQUc3QixxQ0FBeUI7Ozs7O0lBR3pCLHFDQUEwQjs7Ozs7SUFHMUIsd0NBQTZCOzs7OztJQUc3QixzQ0FBdUI7Ozs7O0lBR3ZCLGtDQUF1Qjs7Ozs7SUFHdkIsa0NBQXNCOzs7OztJQUd0QiwrQkFBbUI7Ozs7O0lBR25CLG1DQUF3Qjs7Ozs7SUFHeEIscUNBQXlCOzs7OztJQUd6Qiw4QkFBb0I7Ozs7O0lBR3BCLDRCQUFnQjs7Ozs7SUFHaEIscUNBQXlCOzs7OztJQUd6QixrQ0FBNEI7Ozs7O0lBRzVCLGdDQUF3Qjs7Ozs7SUFHeEIsMEJBQXdCOzs7OztJQUd4QiwwQ0FBK0I7Ozs7O0lBRy9CLGtDQUFzQjs7Ozs7SUFHdEIscUNBQTBCOzs7OztJQUcxQixpQ0FBc0I7Ozs7O0lBR3RCLDZDQUFrQzs7Ozs7SUFHbEMsZ0NBQXdCOzs7OztJQUd4Qiw0QkFBcUI7Ozs7O0lBR3JCLDBDQUE4Qjs7Ozs7SUFHOUIsb0RBQXlDOzs7OztJQUd6Qyw2QkFBb0I7Ozs7O0lBR3BCLHFDQUEyQjs7Ozs7SUFHM0IscUNBQThCOzs7OztJQUc5QixtQ0FBOEI7Ozs7O0lBRzlCLCtCQUFtQjs7Ozs7SUFHbkIsb0NBQWdDOzs7OztJQUdoQyx5Q0FHRTs7Ozs7O0lBTUYseUNBQTBCOzs7OztJQUcxQiwwQ0FBOEI7Ozs7O0lBRzlCLHVDQUE0Qjs7Ozs7SUFHNUIsbUNBQXdCOzs7OztJQUd4QixtQ0FBd0I7Ozs7O0lBR3hCLHdDQUE2Qjs7Ozs7SUFHN0Isa0NBQXVCOzs7OztJQUd2QixpREFBc0M7Ozs7OztJQU10QyxvREFBeUM7Ozs7O0lBR3pDLDBDQUErQjs7Ozs7SUFHL0Isb0NBQXdCOzs7OztJQUd4Qiw2Q0FBa0M7Ozs7O0lBR2xDLG1DQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7XG4gIEF1dG9SZXNpemVPcHRpb24sXG4gIEJhY2tlbmRTZXJ2aWNlQXBpLFxuICBDb2x1bW4sXG4gIENvbHVtblBpY2tlcixcbiAgQ2hlY2tib3hTZWxlY3RvcixcbiAgRHJhZ2dhYmxlR3JvdXBpbmcsXG4gIEVkaXRDb21tYW5kLFxuICBFeHBvcnRPcHRpb24sXG4gIEdyaWRNZW51LFxuICBHcmlkU3RhdGUsXG4gIEhlYWRlckJ1dHRvbixcbiAgSGVhZGVyTWVudSxcbiAgUGFnaW5hdGlvbixcbiAgUm93RGV0YWlsVmlldyxcbiAgUm93TW92ZU1hbmFnZXJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdyaWRPcHRpb24ge1xuICAvKiogQ1NTIGNsYXNzIG5hbWUgdXNlZCBvbiBuZXdseSBhZGRlZCByb3cgKi9cbiAgYWRkTmV3Um93Q3NzQ2xhc3M/OiBzdHJpbmc7XG5cbiAgLyoqIERlZmF1bHRzIHRvIHRydWUsIHdoaWNoIGxlYWRzIHRvIGFsd2F5cyBzaG93IGEgdmVydGljYWwgc2Nyb2xsaW5nLiBUaGlzIGlzIHJhdGhlciBpbXBvcnRhbnQgdG8gdXNlIHdoZW4gdXNpbmcgdGhlIEdyaWQgTWVudSAoaGFtYnVyZ2VyKSAqL1xuICBhbHdheXNTaG93VmVydGljYWxTY3JvbGw/OiBib29sZWFuO1xuXG4gIC8qKiBEZWZhdWx0cyB0byAxMDAsIHdoaWNoIGlzIHRoZSBhc3luY2hyb25vdXMgZWRpdG9yIGxvYWRpbmcgZGVsYXkgKi9cbiAgYXN5bmNFZGl0b3JMb2FkRGVsYXk/OiBudW1iZXI7XG5cbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCBsZWFkcyB0byBsb2FkIGVkaXRvciBhc3luY2hyb25vdXNseSAoZGVsYXllZCkgKi9cbiAgYXN5bmNFZGl0b3JMb2FkaW5nPzogYm9vbGVhbjtcblxuICAvKiogRGVmYXVsdHMgdG8gNTAsIHdoaWNoIGlzIHRoZSBkZWxheSBiZWZvcmUgdGhlIGFzeW5jaHJvbm91cyBwb3N0IHJlbmRlcmVyIHN0YXJ0IGV4ZWN1dGlvbiAqL1xuICBhc3luY1Bvc3RSZW5kZXJEZWxheT86IG51bWJlcjtcblxuICAvKiogRGVmYXVsdHMgdG8gNDAsIHdoaWNoIGlzIHRoZSBkZWxheSBiZWZvcmUgdGhlIGFzeW5jaHJvbm91cyBwb3N0IHJlbmRlcmVyIHN0YXJ0IGNsZWFudXAgZXhlY3V0aW9uICovXG4gIGFzeW5jUG9zdFJlbmRlckNsZWFudXBEZWxheT86IG51bWJlcjtcblxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIHdoZW4gZW5hYmxlZCB3aWxsIHRyeSB0byBjb21taXQgdGhlIGN1cnJlbnQgZWRpdCB3aXRob3V0IGZvY3VzaW5nIG9uIHRoZSBuZXh0IHJvdy4gSWYgYSBjdXN0b20gZWRpdG9yIGlzIGltcGxlbWVudGVkIGFuZCB0aGUgZ3JpZCBjYW5ub3QgYXV0byBjb21taXQsIHlvdSBtdXN0IHVzZSB0aGlzIG9wdGlvbiB0byBpbXBsZW1lbnQgaXQgeW91cnNlbGYgKi9cbiAgYXV0b0NvbW1pdEVkaXQ/OiBib29sZWFuO1xuXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hlbiBlbmFibGVkIHdpbGwgYXV0b21hdGljYWxseSBvcGVuIHRoZSBpbmxpbmVkIGVkaXRvciBhcyBzb29uIGFzIHRoZXJlIGlzIGEgZm9jdXMgb24gdGhlIGNlbGwgKGNhbiBiZSBjb21iaW5lZCB3aXRoIFwiZW5hYmxlQ2VsbE5hdmlnYXRpb246IHRydWVcIikuICovXG4gIGF1dG9FZGl0PzogYm9vbGVhbjtcblxuICAvKiogRGVmYXVsdHMgdG8gdHJ1ZSwgd2hpY2ggbGVhZHMgdG8gYXV0b21hdGljYWxseSBhZGp1c3QgdGhlIHNpemUgb2YgZWFjaCBjb2x1bW4gd2l0aCB0aGUgYXZhaWxhYmxlIHNwYWNlLiBTaW1pbGFyIHRvIFwiRm9yY2UgRml0IENvbHVtblwiIGJ1dCBvbmx5IGhhcHBlbnMgb24gZmlyc3QgcGFnZS9jb21wb25lbnQgbG9hZC4gKi9cbiAgYXV0b0ZpdENvbHVtbnNPbkZpcnN0TG9hZD86IGJvb2xlYW47XG5cbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCBsZWFkcyB0byBhdXRvbWF0aWNhbGx5IGFkanVzdCB0aGUgc2l6ZSAoaGVpZ2h0KSBvZiB0aGUgZ3JpZCB0byBkaXNwbGF5IHRoZSBlbnRpcmUgY29udGVudCB3aXRob3V0IGFueSBzY3JvbGxpbmcgaW4gdGhlIGdyaWQuICovXG4gIGF1dG9IZWlnaHQ/OiBib29sZWFuO1xuXG4gIC8qKiBBdXRvLXJlc2l6ZSBvcHRpb25zIChib3R0b20gcGFkZGluZywgbWluSGVpZ2h0LCAuLi4pICAqL1xuICBhdXRvUmVzaXplPzogQXV0b1Jlc2l6ZU9wdGlvbjtcblxuICAvKiogQXV0by10b29sdGlwIG9wdGlvbnMgKGVuYWJsZUZvckNlbGxzLCBlbmFibGVGb3JIZWFkZXJDZWxscywgbWF4VG9vbFRpcExlbmd0aCkgKi9cbiAgYXV0b1Rvb2x0aXBPcHRpb25zPzoge1xuICAgIC8qKiBhcmUgdG9vbHRpcCBlbmFibGVkIGZvciBhbGwgY2VsbHM/ICovXG4gICAgZW5hYmxlRm9yQ2VsbHM6IGJvb2xlYW47XG5cbiAgICAvKiogYXJlIHRvb2x0aXAgZW5hYmxlZCBmb3IgY29sdW1uIGhlYWRlcnMgKi9cbiAgICBlbmFibGVGb3JIZWFkZXJDZWxsczogYm9vbGVhbjtcblxuICAgIC8qKiB3aGF0IGlzIHRoZSBtYXhpbXVtIHRvb2x0aXAgbGVuZ3RoIGluIHBpeGVscyAob25seSB0eXBlIHRoZSBudW1iZXIpICovXG4gICAgbWF4VG9vbFRpcExlbmd0aDogbnVtYmVyO1xuICB9O1xuXG4gIC8qKiBCYWNrZW5kIFNlcnZpY2UgQVBJIGRlZmluaXRpb24gKEdyYXBoUUwvT0RhdGEgU2VydmljZXMpICovXG4gIGJhY2tlbmRTZXJ2aWNlQXBpPzogQmFja2VuZFNlcnZpY2VBcGk7XG5cbiAgLyoqIENTUyBjbGFzcyBuYW1lIHVzZWQgdG8gc2ltdWxhdGUgY2VsbCBmbGFzaGluZyAqL1xuICBjZWxsRmxhc2hpbmdDc3NDbGFzcz86IHN0cmluZztcblxuICAvKiogQ1NTIGNsYXNzIG5hbWUgdXNlZCB3aGVuIGhpZ2hsaWdodGluZyBhIGNlbGwgdmFsdWUuIFVzZWZ1bCB0byBjaGFuZ2UgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgYWN0aXZhdGVkIGNlbGwgKi9cbiAgY2VsbEhpZ2hsaWdodENzc0NsYXNzPzogc3RyaW5nIHwgbnVsbDtcblxuICAvKiogQ2hlY2tib3ggU2VsZWN0IFBsdWdpbiBvcHRpb25zIChjb2x1bW5JZCwgY3NzQ2xhc3MsIHRvb2xUaXAsIHdpZHRoKSAqL1xuICBjaGVja2JveFNlbGVjdG9yPzogQ2hlY2tib3hTZWxlY3RvcjtcblxuICAvKiogQ29sdW1uIFBpY2tlciBQbHVnaW4gb3B0aW9ucyAoY29sdW1uVGl0bGUsIGZvcmNlRml0VGl0bGUsIHN5bmNSZXNpemVUaXRsZSkgKi9cbiAgY29sdW1uUGlja2VyPzogQ29sdW1uUGlja2VyO1xuXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hpY2ggbGVhZHMgdG8gY3JlYXRlIHRoZSBmb290ZXIgcm93IG9mIHRoZSBncmlkICovXG4gIGNyZWF0ZUZvb3RlclJvdz86IGJvb2xlYW47XG5cbiAgLyoqIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIHVzZWQgdG8gZGVmaW5lIHJvdyBzcGFubmluZyBhY2Nyb3NzIG11bHRpcGxlIGNvbHVtbnMgKi9cbiAgY29sc3BhbkNhbGxiYWNrPzogKGl0ZW06IGFueSkgPT4geyBjb2x1bW5zOiBhbnkgfTtcblxuICAvKiogRGVmYXVsdCB0byBmYWxzZSwgd2hpY2ggbGVhZHMgdG8gY3JlYXRlIGFuIGV4dHJhIHByZS1oZWFkZXIgcGFuZWwgKG9uIHRvcCBvZiBjb2x1bW4gaGVhZGVyKSBmb3IgY29sdW1uIGdyb3VwaW5nIHB1cnBvc2VzICovXG4gIGNyZWF0ZVByZUhlYWRlclBhbmVsPzogYm9vbGVhbjtcblxuICAvKiogRGF0YSBpdGVtIGNvbHVtbiB2YWx1ZSBleHRyYWN0b3IgKGdldHRlcikgdGhhdCBjYW4gYmUgdXNlZCBieSB0aGUgRXhjZWwgbGlrZSBjb3B5IGJ1ZmZlciBwbHVnaW4gKi9cbiAgZGF0YUl0ZW1Db2x1bW5WYWx1ZUV4dHJhY3Rvcj86IChpdGVtOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uKSA9PiBhbnk7XG5cbiAgLyoqIERhdGEgaXRlbSBjb2x1bW4gdmFsdWUgc2V0dGVyIHRoYXQgY2FuIGJlIHVzZWQgYnkgdGhlIEV4Y2VsIGxpa2UgY29weSBidWZmZXIgcGx1Z2luICovXG4gIGRhdGFJdGVtQ29sdW1uVmFsdWVTZXR0ZXI/OiAoaXRlbTogYW55LCBjb2x1bW5EZWY6IENvbHVtbiwgdmFsdWU6IGFueSkgPT4gdm9pZDtcblxuICAvKiogVW5pcXVlIHByb3BlcnR5IG5hbWUgb24gdGhlIGRhdGFzZXQgdXNlZCBieSBTbGljay5EYXRhLkRhdGFWaWV3ICovXG4gIGRhdGFzZXRJZFByb3BlcnR5TmFtZT86IHN0cmluZztcblxuICBkYXRhVmlldz86IHtcbiAgICAvKipcbiAgICAgKiBpZiB5b3UgZG9uJ3Qgd2FudCB0aGUgaXRlbXMgdGhhdCBhcmUgbm90IHZpc2libGUgKGR1ZSB0byBiZWluZyBmaWx0ZXJlZCBvdXRcbiAgICAgKiBvciBiZWluZyBvbiBhIGRpZmZlcmVudCBwYWdlKSB0byBzdGF5IHNlbGVjdGVkLCB0aGUgc2V0IHRoaXMgcHJvcGVydHkgYXMgJ2ZhbHNlJ1xuICAgICAqL1xuICAgIHN5bmNHcmlkU2VsZWN0aW9uPzogYm9vbGVhbjtcbiAgfTtcblxuICAvKiogRGVmYXVsdCBjb2x1bW4gd2lkdGgsIGlzIHNldCB0byA4MCB3aGVuIG51bGwgKi9cbiAgZGVmYXVsdENvbHVtbldpZHRoPzogbnVtYmVyO1xuXG4gIC8qKiBUaGUgZGVmYXVsdCBmaWx0ZXIgbW9kZWwgdG8gdXNlIHdoZW4gbm9uZSBpcyBzcGVjaWZpZWQgKi9cbiAgZGVmYXVsdEZpbHRlcj86IGFueTtcblxuICAvKiogRGVmYXVsdCBwbGFjZWhvbGRlciB0byB1c2UgaW4gRmlsdGVycyB0aGF0IHN1cHBvcnQgcGxhY2Vob2xkZXIgKGlucHV0LCBmbGF0cGlja3IpICovXG4gIGRlZmF1bHRGaWx0ZXJQbGFjZWhvbGRlcj86IHN0cmluZztcblxuICAvKiogRHJhZ2dhYmxlIEdyb3VwaW5nIFBsdWdpbiBvcHRpb25zICYgZXZlbnRzICovXG4gIGRyYWdnYWJsZUdyb3VwaW5nPzogRHJhZ2dhYmxlR3JvdXBpbmc7XG5cbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGVuIGVuYWJsZWQgd2lsbCBnaXZlIHRoZSBwb3NzaWJpbGl0eSB0byBlZGl0IGNlbGwgdmFsdWVzIHdpdGggaW5saW5lIGVkaXRvcnMuICovXG4gIGVkaXRhYmxlPzogYm9vbGVhbjtcblxuICAvKiogb3B0aW9uIHRvIGludGVyY2VwdCBlZGl0IGNvbW1hbmRzIGFuZCBpbXBsZW1lbnQgdW5kbyBzdXBwb3J0LiAqL1xuICBlZGl0Q29tbWFuZEhhbmRsZXI/OiAoaXRlbTogYW55LCBjb2x1bW46IENvbHVtbiwgY29tbWFuZDogRWRpdENvbW1hbmQpID0+IHZvaWQ7XG5cbiAgLyoqIEVkaXRvciBjbGFzc2VzIGZhY3RvcnkgKi9cbiAgZWRpdG9yRmFjdG9yeT86IGFueTtcblxuICAvKiogYSBnbG9iYWwgc2luZ2xldG9uIGVkaXRvciBsb2NrLiAqL1xuICBlZGl0b3JMb2NrPzogYW55O1xuXG4gIC8qKiBEbyB3ZSB3YW50IHRvIGVtdWxhdGUgcGFnaW5nIHdoZW4gd2UgYXJlIHNjcm9sbGluZz8gKi9cbiAgZW11bGF0ZVBhZ2luZ1doZW5TY3JvbGxpbmc/OiBib29sZWFuO1xuXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hpY2ggbGVhZHMgdG8gZ2l2ZSB1c2VyIHBvc3NpYmlsaXR5IHRvIGFkZCByb3cgdG8gdGhlIGdyaWQgKi9cbiAgZW5hYmxlQWRkUm93PzogYm9vbGVhbjtcblxuICAvKiogRG8gd2Ugd2FudCB0byBlbmFibGUgYXN5bmNocm9ub3VzIChkZWxheWVkKSBwb3N0IHJlbmRlcmluZyAqL1xuICBlbmFibGVBc3luY1Bvc3RSZW5kZXI/OiBib29sZWFuO1xuXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hpY2ggbGVhZHMgdG8gY2xlYW51cCBhZnRlciB0aGUgcG9zdCByZW5kZXIgaXMgZmluaXNoZWQgZXhlY3V0aW5nICovXG4gIGVuYWJsZUFzeW5jUG9zdFJlbmRlckNsZWFudXA/OiBib29sZWFuO1xuXG4gIC8qKiBEZWZhdWx0cyB0byB0cnVlLCB3aGljaCB3aWxsIGF1dG9tYXRpY2FsbHkgcmVzaXplIHRoZSBncmlkIHdoZW5ldmVyIHRoZSBicm93c2VyIHNpemUgY2hhbmdlcyAqL1xuICBlbmFibGVBdXRvUmVzaXplPzogYm9vbGVhbjtcblxuICAvKiogRGVmYXVsdHMgdG8gdHJ1ZSwgd2hpY2ggd2lsbCBhdXRvbWF0aWNhbGx5IHJlc2l6ZSB0aGUgY29sdW1uIGhlYWRlcnMgd2hlbmV2ZXIgdGhlIGdyaWQgc2l6ZSBjaGFuZ2VzICovXG4gIGVuYWJsZUF1dG9TaXplQ29sdW1ucz86IGJvb2xlYW47XG5cbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCBsZWFkcyB0byBzaG93aW5nIHRvb2x0aXAgb3ZlciBjZWxsICYgaGVhZGVyIHZhbHVlcyB0aGF0IGFyZSBub3Qgc2hvd24gY29tcGxldGVseSAoLi4uIGVsbGlwc2lzKSAqL1xuICBlbmFibGVBdXRvVG9vbHRpcD86IGJvb2xlYW47XG5cbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCB3aWxsIGxldCB1c2VyIGNsaWNrIG9uIGNlbGwgYW5kIG5hdmlnYXRlIHdpdGggYXJyb3cga2V5cy4gKi9cbiAgZW5hYmxlQ2VsbE5hdmlnYXRpb24/OiBib29sZWFuO1xuXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hlbiBlbmFibGVkIGl0IHdpbGwgYWRkIGEgY29sdW1uIGZvciBjaGVja2JveCBzZWxlY3Rpb24gYXQgdGhlIDFzdCBjb2x1bW4gcG9zaXRpb24uIEEgc2VsZWN0aW9uIHdpbGwgdHJpZ2dlciB0aGUgXCJvblNlbGVjdGVkUm93c0NoYW5nZWRcIiBldmVudC4gKi9cbiAgZW5hYmxlQ2hlY2tib3hTZWxlY3Rvcj86IGJvb2xlYW47XG5cbiAgLyoqIERlZmF1bHRzIHRvIHRydWUsIHdoZW4gZW5hYmxlZCB3aWxsIGdpdmUgdGhlIHBvc3NpYmlsaXR5IHRvIGRvIGEgcmlnaHQrY2xpY2sgb24gYW55IGhlYWRlciB0aXRsZSB3aGljaCB3aWxsIG9wZW4gdGhlIGxpc3Qgb2YgY29sdW1uLiBVc2VyIGNhbiBzaG93L2hpZGUgYSBjb2x1bW4gYnkgdXNpbmcgdGhlIGNoZWNrYm94IGZyb20gdGhhdCBwaWNrZXIgbGlzdC4gKi9cbiAgZW5hYmxlQ29sdW1uUGlja2VyPzogYm9vbGVhbjtcblxuICAvKiogRGVmYXVsdHMgdG8gdHJ1ZSwgd2hpY2ggcGVybWl0cyB0aGUgdXNlciB0byBtb3ZlIGFuIGVudGlyZSBjb2x1bW4gZnJvbSBhIHBvc2l0aW9uIHRvIGFub3RoZXIuICovXG4gIGVuYWJsZUNvbHVtblJlb3JkZXI/OiBib29sZWFuO1xuXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgZG8gd2Ugd2FudCB0byBlbmFibGUgdGhlIERyYWdnYWJsZSBHcm91cGluZyBQbHVnaW4/ICovXG4gIGVuYWJsZURyYWdnYWJsZUdyb3VwaW5nPzogYm9vbGVhbjtcblxuICAvKiogRGVmYXVsdHMgdG8gdHJ1ZSwgd2hpY2ggbGVhZHMgdG8gdXNlIGFuIEV4Y2VsIGxpa2UgY29weSBidWZmZXIgdGhhdCBnZXRzIGNvcGllZCBpbiBjbGlwYm9hcmQgYW5kIGNhbiBiZSBwYXN0ZWQgYmFjayBpbiBFeGNlbCBvciBhbnkgb3RoZXIgYXBwICovXG4gIGVuYWJsZUV4Y2VsQ29weUJ1ZmZlcj86IGJvb2xlYW47XG5cbiAgLyoqIERvIHdlIHdhbnQgdG8gZW5hYmxlIHRoZSBFeHBvcnQgdG8gRmlsZT8gKGlmIFllcywgaXQgd2lsbCBzaG93IHVwIGluIHRoZSBHcmlkIE1lbnUpICovXG4gIGVuYWJsZUV4cG9ydD86IGJvb2xlYW47XG5cbiAgLyoqIERvIHdlIHdhbnQgdG8gZW5hYmxlIEZpbHRlcnM/ICovXG4gIGVuYWJsZUZpbHRlcmluZz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIERlZmF1bHRzIHRvIGZhbHNlLCBkbyB3ZSB3YW50IHRvIGdsb2JhbGx5IHRyaW0gd2hpdGUgc3BhY2VzIG9uIGFsbCBmaWx0ZXIgdmFsdWVzIHR5cGVkIGJ5IHRoZSB1c2VyP1xuICAgKiBVc2VyIGNhbiBjaG9vc2UgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHRcbiAgICovXG4gIGVuYWJsZUZpbHRlclRyaW1XaGl0ZVNwYWNlPzogYm9vbGVhbjtcblxuICAvKiogRG8gd2Ugd2FudCB0byBlbmFibGUgR3JpZCBNZW51IChha2EgaGFtYnVyZ2VyIG1lbnUpICovXG4gIGVuYWJsZUdyaWRNZW51PzogYm9vbGVhbjtcblxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIGRvIHdlIHdhbnQgdG8gZW5hYmxlIHRoZSBHcm91cGluZyAmIEFnZ3JlZ2F0b3IgUGx1Z2luPyAqL1xuICBlbmFibGVHcm91cGluZz86IGJvb2xlYW47XG5cbiAgLyoqIERvIHdlIHdhbnQgdG8gZW5hYmxlIEhlYWRlciBCdXR0b25zPyAoYnV0dG9ucyB3aXRoIGNvbW1hbmRzIHRoYXQgY2FuIGJlIHNob3duIGJlc2lkZSBlYWNoIGNvbHVtbikgICovXG4gIGVuYWJsZUhlYWRlckJ1dHRvbj86IGJvb2xlYW47XG5cbiAgLyoqIERvIHdlIHdhbnQgdG8gZW5hYmxlIEhlYWRlciBNZW51PyAod2hlbiBob3ZlcmluZyBhIGNvbHVtbiwgYSBtZW51IHdpbGwgYXBwZWFyIGZvciB0aGF0IGNvbHVtbikgKi9cbiAgZW5hYmxlSGVhZGVyTWVudT86IGJvb2xlYW47XG5cbiAgLyoqIERvIHdlIHdhbnQgdG8gZW5hYmxlIGEgc3R5bGluZyBlZmZlY3Qgd2hlbiBob3ZlcmluZyBhbnkgcm93IGZyb20gdGhlIGdyaWQ/ICovXG4gIGVuYWJsZU1vdXNlSG92ZXJIaWdobGlnaHRSb3c/OiBib29sZWFuO1xuXG4gIC8qKiBEbyB3ZSB3YW50IHRvIGVuYWJsZSBwYWdpbmF0aW9uPyBDdXJyZW50bHkgb25seSB3b3JrcyB3aXRoIGEgQmFja2VuZCBTZXJ2aWNlIEFQSSAqL1xuICBlbmFibGVQYWdpbmF0aW9uPzogYm9vbGVhbjtcblxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIGRvIHdlIHdhbnQgdG8gZW5hYmxlIHRoZSBSb3cgRGV0YWlsIFBsdWdpbj8gKi9cbiAgZW5hYmxlUm93RGV0YWlsVmlldz86IGJvb2xlYW47XG5cbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGVuIGVuYWJsZWQgaXQgd2lsbCBtYWtlIHBvc3NpYmxlIHRvIG1vdmUgcm93cyBpbiB0aGUgZ3JpZC4gKi9cbiAgZW5hYmxlUm93TW92ZU1hbmFnZXI/OiBib29sZWFuO1xuXG4gIC8qKiBEbyB3ZSB3YW50IHRvIGVuYWJsZSByb3cgc2VsZWN0aW9uPyAqL1xuICBlbmFibGVSb3dTZWxlY3Rpb24/OiBib29sZWFuO1xuXG4gIC8qKiBEbyB3ZSB3YW50IHRvIGVuYWJsZSBzb3J0aW5nPyAqL1xuICBlbmFibGVTb3J0aW5nPzogYm9vbGVhbjtcblxuICAvKiogRG8gd2Ugd2FudCB0byBlbmFibGUgdGV4dCBzZWxlY3Rpb24gb24gY2VsbHM/IFVzZWZ1bCB3aGVuIHVzZXIgd2FudHMgdG8gZG8gY29weSB0byBjbGlwYm9hcmQuICovXG4gIGVuYWJsZVRleHRTZWxlY3Rpb25PbkNlbGxzPzogYm9vbGVhbjtcblxuICAvKiogRG8gd2Ugd2FudCB0byBlbmFibGUgbG9jYWxpemF0aW9uIHRyYW5zbGF0aW9uIChpMThuKT8gKi9cbiAgZW5hYmxlVHJhbnNsYXRlPzogYm9vbGVhbjtcblxuICAvKiogRG8gd2Ugd2FudCBleHBsaWNpdCBncmlkIGluaXRpYWxpemF0aW9uPyAqL1xuICBleHBsaWNpdEluaXRpYWxpemF0aW9uPzogYm9vbGVhbjtcblxuICAvKiogU29tZSBkZWZhdWx0IG9wdGlvbnMgdG8gc2V0IGZvciB0aGUgZXhwb3J0IHNlcnZpY2UgKi9cbiAgZXhwb3J0T3B0aW9ucz86IEV4cG9ydE9wdGlvbjtcblxuICAvKiogRGVmYXVsdHMgdG8gMjUsIHdoaWNoIGlzIHRoZSBncmlkIGZvb3RlciByb3cgcGFuZWwgaGVpZ2h0ICovXG4gIGZvb3RlclJvd0hlaWdodD86IG51bWJlcjtcblxuICAvKiogRG8gd2Ugd2FudCB0byBmb3JjZSBmaXQgY29sdW1ucyBpbiB0aGUgZ3JpZCBhdCBhbGwgdGltZT8gKi9cbiAgZm9yY2VGaXRDb2x1bW5zPzogYm9vbGVhbjtcblxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIGZvcmNlIHN5bmNocm9ub3VzIHNjcm9sbGluZyAqL1xuICBmb3JjZVN5bmNTY3JvbGxpbmc/OiBib29sZWFuO1xuXG4gIC8qKiBGb3JtYXR0ZXIgY2xhc3NlcyBmYWN0b3J5ICovXG4gIGZvcm1hdHRlckZhY3Rvcnk/OiBhbnk7XG5cbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCBkbyB3ZSB3YW50IHRvIGZyZWV6ZSAocGluKSB0aGUgYm90dG9tIHBvcnRpb24gaW5zdGVhZCBvZiB0aGUgdG9wICovXG4gIGZyb3plbkJvdHRvbT86IGJvb2xlYW47XG5cbiAgLyoqIE51bWJlciBvZiBjb2x1bW4ocykgdG8gZnJlZXplIChwaW4pIGluIHRoZSBncmlkICovXG4gIGZyb3plbkNvbHVtbj86IG51bWJlcjtcblxuICAvKiogTnVtYmVyIG9mIHJvdyhzKSB0byBmcmVlemUgKHBpbikgaW4gdGhlIGdyaWQgKi9cbiAgZnJvemVuUm93PzogbnVtYmVyO1xuXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hpY2ggbGVhZHMgdG8gaGF2ZSByb3cgd2l0aCBmdWxsIHdpZHRoICovXG4gIGZ1bGxXaWR0aFJvd3M/OiBib29sZWFuO1xuXG4gIC8qKiBHcmlkIERPTSBlbGVtZW50IGNvbnRhaW5lciBJRCAodXNlZCBBbmd1bGFyLVNsaWNrZ3JpZCBhdXRvLXJlc2l6ZXIpICovXG4gIGdyaWRDb250YWluZXJJZD86IHN0cmluZztcblxuICAvKiogR3JpZCBNZW51IG9wdGlvbnMgKGFrYSBoYW1idXJnZXIgbWVudSkgKi9cbiAgZ3JpZE1lbnU/OiBHcmlkTWVudTtcblxuICAvKiogR3JpZCBET00gZWxlbWVudCBJRCAqL1xuICBncmlkSWQ/OiBzdHJpbmc7XG5cbiAgLyoqIEhlYWRlciByb3cgaGVpZ2h0IGluIHBpeGVscyAob25seSB0eXBlIHRoZSBudW1iZXIpLiBIZWFkZXIgcm93IGlzIHdoZXJlIHRoZSBmaWx0ZXJzIGFyZS4gKi9cbiAgaGVhZGVyUm93SGVpZ2h0PzogbnVtYmVyO1xuXG4gIC8qKiBIZWFkZXIgYnV0dG9uIG9wdGlvbnMgKi9cbiAgaGVhZGVyQnV0dG9uPzogSGVhZGVyQnV0dG9uO1xuXG4gIC8qKiBIZWFkZXIgbWVudSBvcHRpb25zICovXG4gIGhlYWRlck1lbnU/OiBIZWFkZXJNZW51O1xuXG4gIC8qKiBuZ3gtdHJhbnNsYXRlIGkxOG4gdHJhbnNsYXRpb24gc2VydmljZSBpbnN0YW5jZSAqL1xuICBpMThuPzogVHJhbnNsYXRlU2VydmljZTtcblxuICAvKiogRG8gd2UgbGVhdmUgc3BhY2UgZm9yIG5ldyByb3dzIGluIHRoZSBET00gdmlzaWJsZSBidWZmZXIgKi9cbiAgbGVhdmVTcGFjZUZvck5ld1Jvd3M/OiBib29sZWFuO1xuXG4gIC8qKiBXaGF0IGlzIHRoZSBtaW5pbXVtIHJvdyBidWZmZXIgdG8gdXNlPyAqL1xuICBtaW5Sb3dCdWZmZXI/OiBudW1iZXI7XG5cbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCBsZWFkcyB0byBiZSBhYmxlIHRvIGRvIG11bHRpcGxlIGNvbHVtbnMgc29ydGluZyAob3Igc2luZ2xlIHNvcnQgd2hlbiBmYWxzZSkgKi9cbiAgbXVsdGlDb2x1bW5Tb3J0PzogYm9vbGVhbjtcblxuICAvKiogRGVmYXVsdHMgdG8gdHJ1ZSwgd2hpY2ggbGVhZHMgdG8gYmUgYWJsZSB0byBkbyBtdWx0aXBsZSBzZWxlY3Rpb24gKi9cbiAgbXVsdGlTZWxlY3Q/OiBib29sZWFuO1xuXG4gIC8qKiBEZWZhdWx0cyB0byB0cnVlLCB3aGljaCB3aWxsIGRpc3BsYXkgbnVtYmVycyBpbmRpY2F0aW5nIGNvbHVtbiBzb3J0IHByZWNlZGVuY2UgYXJlIGRpc3BsYXllZCBpbiB0aGUgY29sdW1ucyB3aGVuIG11bHRpcGxlIGNvbHVtbnMgc2VsZWN0ZWQgKi9cbiAgbnVtYmVyZWRNdWx0aUNvbHVtblNvcnQ/OiBib29sZWFuO1xuXG4gIC8qKiBQYWdpbmF0aW9uIG9wdGlvbnMsIHRoZXNlIGFyZSBjdXJyZW50bHkgdXNlZCBPTkxZIHdpdGggYSBCYWNrZW5kIFNlcnZpY2UgQVBJIChHcmFwaFFML09EYXRhIFNlcnZpY2VzKSAqL1xuICBwYWdpbmF0aW9uPzogUGFnaW5hdGlvbjtcblxuICAvKiogaWYgeW91IHdhbnQgdG8gcGFzcyBjdXN0b20gcGFyYW1hdGVycyB0byB5b3VyIEZvcm1hdHRlci9FZGl0b3Igb3IgYW55dGhpbmcgZWxzZSAqL1xuICBwYXJhbXM/OiBhbnkgfCBhbnlbXTtcblxuICAvKiogRXh0cmEgcHJlLWhlYWRlciBwYW5lbCBoZWlnaHQgKG9uIHRvcCBvZiBjb2x1bW4gaGVhZGVyKSAqL1xuICBwcmVIZWFkZXJQYW5lbEhlaWdodD86IG51bWJlcjtcblxuICAvKiogRG8gd2Ugd2FudCB0byBwcmVzZXJ2ZSBjb3BpZWQgc2VsZWN0aW9uIG9uIHBhc3RlPyAqL1xuICBwcmVzZXJ2ZUNvcGllZFNlbGVjdGlvbk9uUGFzdGU/OiBib29sZWFuO1xuXG4gIC8qKiBRdWVyeSBwcmVzZXRzIGJlZm9yZSBncmlkIGxvYWQgKGZpbHRlcnMsIHNvcnRlcnMsIHBhZ2luYXRpb24pICovXG4gIHByZXNldHM/OiBHcmlkU3RhdGU7XG5cbiAgLyoqIFByZXNlbGVjdCBjZXJ0YWluIHJvd3MgYnkgdGhlaXIgcm93IGluZGV4IChcImVuYWJsZUNoZWNrYm94U2VsZWN0b3JcIiBtdXN0IGJlIGVuYWJsZWQpICovXG4gIHByZXNlbGVjdGVkUm93cz86IG51bWJlcltdO1xuXG4gIC8qKiBSZWdpc3RlciAxIG9yIG1vcmUgU2xpY2sgUGx1Z2lucyAqL1xuICByZWdpc3RlclBsdWdpbnM/OiBhbnkgfCBhbnlbXTtcblxuICAvKiogUm93IERldGFpbCBWaWV3IFBsdWdpbiBvcHRpb25zICYgZXZlbnRzIChjb2x1bW5JZCwgY3NzQ2xhc3MsIHRvb2xUaXAsIHdpZHRoKSAqL1xuICByb3dEZXRhaWxWaWV3PzogUm93RGV0YWlsVmlldztcblxuICAvKiogR3JpZCByb3cgaGVpZ2h0IGluIHBpeGVscyAob25seSB0eXBlIHRoZSBudW1iZXIpLiBSb3cgb2YgY2VsbCB2YWx1ZXMuICovXG4gIHJvd0hlaWdodD86IG51bWJlcjtcblxuICAvKiogUm93IE1vdmUgTWFuYWdlciBQbHVnaW4gb3B0aW9ucyAmIGV2ZW50cyAqL1xuICByb3dNb3ZlTWFuYWdlcj86IFJvd01vdmVNYW5hZ2VyO1xuXG4gIC8qKiBSb3cgc2VsZWN0aW9uIG9wdGlvbnMgKi9cbiAgcm93U2VsZWN0aW9uT3B0aW9ucz86IHtcbiAgICAvKiogZG8gd2Ugd2FudCB0byBzZWxlY3QgdGhlIGFjdGl2ZSByb3c/ICovXG4gICAgc2VsZWN0QWN0aXZlUm93OiBib29sZWFuO1xuICB9O1xuXG4gIC8qKlxuICAgKiBPcHRpb25hbGx5IHBhc3Mgc29tZSBvcHRpb25zIHRvIHRoZSAzcmQgcGFydHkgbGliIFwiY3VyZTMyL0RPTVB1cmlmeVwiIHVzZWQgaW4gc29tZSBGaWx0ZXJzLlxuICAgKiBGb3IgdGhpcyB0byB3b3JrLCBcImVuYWJsZVJlbmRlckh0bWxcIiBhcyB0byBiZSBlbmFibGVkLlxuICAgKi9cbiAgc2FuaXRpemVIdG1sT3B0aW9ucz86IGFueTtcblxuICAvKiogQ1NTIGNsYXNzIG5hbWUgdXNlZCB3aGVuIGNlbGwgaXMgc2VsZWN0ZWQgKi9cbiAgc2VsZWN0ZWRDZWxsQ3NzQ2xhc3M/OiBzdHJpbmc7XG5cbiAgLyoqIERvIHdlIHdhbnQgdG8gc2hvdyBjZWxsIHNlbGVjdGlvbj8gKi9cbiAgc2hvd0NlbGxTZWxlY3Rpb24/OiBib29sZWFuO1xuXG4gIC8qKiBEbyB3ZSB3YW50IHRvIHNob3cgdGhlIGZvb3RlciByb3c/ICovXG4gIHNob3dGb290ZXJSb3c/OiBib29sZWFuO1xuXG4gIC8qKiBEbyB3ZSB3YW50IHRvIHNob3cgaGVhZGVyIHJvdz8gKi9cbiAgc2hvd0hlYWRlclJvdz86IGJvb2xlYW47XG5cbiAgLyoqIERvIHdlIHdhbnQgdG8gc2hvdyB0aGUgZXh0cmEgcHJlLWhlYWRlciBwYW5lbCAob24gdG9wIG9mIGNvbHVtbiBoZWFkZXIpIGZvciBjb2x1bW4gZ3JvdXBpbmcgcHVycG9zZXMgKi9cbiAgc2hvd1ByZUhlYWRlclBhbmVsPzogYm9vbGVhbjtcblxuICAvKiogRG8gd2Ugd2FudCB0byBzaG93IHRvcCBwYW5lbCByb3c/ICovXG4gIHNob3dUb3BQYW5lbD86IGJvb2xlYW47XG5cbiAgLyoqIERlZmF1bHRzIHRvIHRydWUsIHdoaWNoIGxlYWRzIHRvIHJlbmRlciBhIHNlcGFyYXRlIHNwYW4gZm9yIHRoZSBudW1iZXIgYW5kIHN0eWxlcyBpdCB3aXRoIGNzcyBjbGFzcyA8aT5zbGljay1zb3J0LWluZGljYXRvci1udW1iZXJlZDwvaT4gKi9cbiAgc29ydENvbE51bWJlckluU2VwYXJhdGVTcGFuPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogRGVmYXVsdHMgdG8gdHJ1ZSwgd2hpY2ggbGVhZHMgdG8gc3VwcHJlc3MgdGhlIGNlbGwgZnJvbSBiZWNvbWluZyBhY3RpdmUgd2hlbiBjZWxsIGFzIGFuIGVkaXRvciBhbmQgaXMgY2xpY2tlZC5cbiAgICogVGhpcyBmbGFnIHNob3VsZCBiZSBlbmFibGVkIGVzcGVjaWFsbHkgd2hlbiBtaXhpbmcgdGhlc2UgMiBmZWF0dXJlcyAoUm93IFNlbGVjdGlvbnMgJiBJbmxpbmUgRWRpdG9ycylcbiAgICovXG4gIHN1cHByZXNzQWN0aXZlQ2VsbENoYW5nZU9uRWRpdD86IGJvb2xlYW47XG5cbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGVuIHNldCB0byBUcnVlIHdpbGwgc3luYyB0aGUgY29sdW1uIGNlbGwgcmVzaXplICYgYXBwbHkgdGhlIGNvbHVtbiB3aWR0aCAqL1xuICBzeW5jQ29sdW1uQ2VsbFJlc2l6ZT86IGJvb2xlYW47XG5cbiAgLyoqIFdoYXQgaXMgdGhlIHRvcCBwYW5lbCBoZWlnaHQgaW4gcGl4ZWxzIChvbmx5IHR5cGUgdGhlIG51bWJlcikgKi9cbiAgdG9wUGFuZWxIZWlnaHQ/OiBudW1iZXI7XG5cbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGVuIHNldCB0byBUcnVlIHdpbGwgbGVhZCB0byBtdWx0aXBsZSBjb2x1bW5zIHNvcnRpbmcgd2l0aG91dCB0aGUgbmVlZCB0byBob2xkIG9yIGRvIHNoaWZ0LWNsaWNrIHRvIGV4ZWN1dGUgYSBtdWx0aXBsZSBzb3J0LiAqL1xuICB0cmlzdGF0ZU11bHRpQ29sdW1uU29ydD86IGJvb2xlYW47XG5cbiAgLyoqIERlZmF1bHRzIHRvIG51bGwsIHdoaWNoIGlzIHRoZSBkZWZhdWx0IFZpZXdwb3J0IENTUyBjbGFzcyBuYW1lICovXG4gIHZpZXdwb3J0Q2xhc3M/OiBzdHJpbmc7XG59XG4iXX0=