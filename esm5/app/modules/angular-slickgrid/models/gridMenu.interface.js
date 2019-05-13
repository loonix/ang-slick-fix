/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function GridMenu() { }
if (false) {
    /**
     * Array of Custom Items (title, command, disabled, ...)
     * @type {?|undefined}
     */
    GridMenu.prototype.customItems;
    /**
     * Defaults to "Commands" which is the title that shows up over the custom commands list
     * @type {?|undefined}
     */
    GridMenu.prototype.customTitle;
    /**
     * Same as "customTitle", except that it's a translation key which can be used on page load and/or when switching locale
     * @type {?|undefined}
     */
    GridMenu.prototype.customTitleKey;
    /**
     * Defaults to "Columns" which is the title that shows up over the columns
     * @type {?|undefined}
     */
    GridMenu.prototype.columnTitle;
    /**
     * Same as "columnTitle", except that it's a translation key which can be used on page load and/or when switching locale
     * @type {?|undefined}
     */
    GridMenu.prototype.columnTitleKey;
    /**
     * Defaults to "Force fit columns" which is 1 of the last 2 checkbox title shown at the end of the picker list
     * @type {?|undefined}
     */
    GridMenu.prototype.forceFitTitle;
    /**
     * Same as "forceFitTitle", except that it's a translation key which can be used on page load and/or when switching locale
     * @type {?|undefined}
     */
    GridMenu.prototype.forceFitTitleKey;
    /**
     * Defaults to false, which will hide the "Clear All Filters" command in the Grid Menu (Grid Option "enableFiltering: true" has to be enabled)
     * @type {?|undefined}
     */
    GridMenu.prototype.hideClearAllFiltersCommand;
    /**
     * Defaults to false, which will hide the "Clear All Sorting" command in the Grid Menu (Grid Option "enableSorting: true" has to be enabled)
     * @type {?|undefined}
     */
    GridMenu.prototype.hideClearAllSortingCommand;
    /**
     * Defaults to false, which will hide the "Export to CSV" command in the Grid Menu (Grid Option "enableExport: true" has to be enabled)
     * @type {?|undefined}
     */
    GridMenu.prototype.hideExportCsvCommand;
    /**
     * Defaults to false, which will hide the "Export to Text Delimited" command in the Grid Menu (Grid Option "enableExport: true" has to be enabled)
     * @type {?|undefined}
     */
    GridMenu.prototype.hideExportTextDelimitedCommand;
    /**
     * Defaults to false, show/hide 1 of the last 2 checkbox at the end of the picker list
     * @type {?|undefined}
     */
    GridMenu.prototype.hideForceFitButton;
    /**
     * Defaults to false, which will hide the "Refresh Dataset" command in the Grid Menu (only works with a Backend Service API)
     * @type {?|undefined}
     */
    GridMenu.prototype.hideRefreshDatasetCommand;
    /**
     * Defaults to false, show/hide 1 of the last 2 checkbox at the end of the picker list
     * @type {?|undefined}
     */
    GridMenu.prototype.hideSyncResizeButton;
    /**
     * Defaults to false, which will hide the "Toggle Filter Row" command in the Grid Menu (Grid Option "enableFiltering: true" has to be enabled)
     * @type {?|undefined}
     */
    GridMenu.prototype.hideToggleFilterCommand;
    /**
     * Defaults to true, which will hide the "Toggle Pre-Header Row" (used by draggable grouping) command in the Grid Menu (Grid Option "showPreHeaderPanel: true" has to be enabled)
     * @type {?|undefined}
     */
    GridMenu.prototype.hideTogglePreHeaderCommand;
    /**
     * CSS class for the displaying the Grid menu icon image (basically the hamburger menu)
     * @type {?|undefined}
     */
    GridMenu.prototype.iconCssClass;
    /**
     * icon for the "Clear All Filters" command
     * @type {?|undefined}
     */
    GridMenu.prototype.iconClearAllFiltersCommand;
    /**
     * icon for the "Clear All Sorting" command
     * @type {?|undefined}
     */
    GridMenu.prototype.iconClearAllSortingCommand;
    /**
     * icon for the "Export to CSV" command
     * @type {?|undefined}
     */
    GridMenu.prototype.iconExportCsvCommand;
    /**
     * icon for the "Export to Text Delimited" command
     * @type {?|undefined}
     */
    GridMenu.prototype.iconExportTextDelimitedCommand;
    /**
     * Link for the displaying the Grid menu icon image (basically the hamburger menu)
     * @type {?|undefined}
     */
    GridMenu.prototype.iconImage;
    /**
     * icon for the "Refresh Dataset" command
     * @type {?|undefined}
     */
    GridMenu.prototype.iconRefreshDatasetCommand;
    /**
     * icon for the "Toggle Filter Row" command
     * @type {?|undefined}
     */
    GridMenu.prototype.iconToggleFilterCommand;
    /**
     * icon for the "Toggle Pre-Header Row" command
     * @type {?|undefined}
     */
    GridMenu.prototype.iconTogglePreHeaderCommand;
    /**
     * Defaults to False, which leads to leaving the menu open after a click
     * @type {?|undefined}
     */
    GridMenu.prototype.leaveOpen;
    /**
     * Defaults to 16 pixels (only the number), which is the width in pixels of the Grid Menu icon
     * @type {?|undefined}
     */
    GridMenu.prototype.menuWidth;
    /**
     * Defaults to False, which will resize the Header Row and remove the width of the Grid Menu icon from it's total width.
     * @type {?|undefined}
     */
    GridMenu.prototype.resizeOnShowHeaderRow;
    /**
     * Defaults to "Synchronous resize" which is 1 of the last 2 checkbox title shown at the end of the picker list
     * @type {?|undefined}
     */
    GridMenu.prototype.syncResizeTitle;
    /**
     * Same as "syncResizeTitle", except that it's a translation key which can be used on page load and/or when switching locale
     * @type {?|undefined}
     */
    GridMenu.prototype.syncResizeTitleKey;
    /**
     * Fired after extension (control) is registered by SlickGrid
     * @type {?|undefined}
     */
    GridMenu.prototype.onExtensionRegistered;
    /**
     * SlickGrid Event fired before the menu is shown.
     * @type {?|undefined}
     */
    GridMenu.prototype.onBeforeMenuShow;
    /**
     * SlickGrid Event fired when any of the columns checkbox selection changes.
     * @type {?|undefined}
     */
    GridMenu.prototype.onColumnsChanged;
    /**
     * SlickGrid Event fired when the menu is closing.
     * @type {?|undefined}
     */
    GridMenu.prototype.onMenuClose;
    /**
     * SlickGrid Event fired on menu item click for buttons with 'command' specified.
     * @type {?|undefined}
     */
    GridMenu.prototype.onCommand;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZE1lbnUuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9tb2RlbHMvZ3JpZE1lbnUuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQSw4QkE0R0M7Ozs7OztJQTFHQywrQkFBNkI7Ozs7O0lBRzdCLCtCQUFxQjs7Ozs7SUFHckIsa0NBQXdCOzs7OztJQUd4QiwrQkFBcUI7Ozs7O0lBR3JCLGtDQUF3Qjs7Ozs7SUFHeEIsaUNBQXVCOzs7OztJQUd2QixvQ0FBMEI7Ozs7O0lBRzFCLDhDQUFxQzs7Ozs7SUFHckMsOENBQXFDOzs7OztJQUdyQyx3Q0FBK0I7Ozs7O0lBRy9CLGtEQUF5Qzs7Ozs7SUFHekMsc0NBQTZCOzs7OztJQUc3Qiw2Q0FBb0M7Ozs7O0lBR3BDLHdDQUErQjs7Ozs7SUFHL0IsMkNBQWtDOzs7OztJQUdsQyw4Q0FBcUM7Ozs7O0lBR3JDLGdDQUFzQjs7Ozs7SUFHdEIsOENBQW9DOzs7OztJQUdwQyw4Q0FBb0M7Ozs7O0lBR3BDLHdDQUE4Qjs7Ozs7SUFHOUIsa0RBQXdDOzs7OztJQUd4Qyw2QkFBbUI7Ozs7O0lBR25CLDZDQUFtQzs7Ozs7SUFHbkMsMkNBQWlDOzs7OztJQUdqQyw4Q0FBb0M7Ozs7O0lBR3BDLDZCQUFvQjs7Ozs7SUFHcEIsNkJBQW1COzs7OztJQUduQix5Q0FBZ0M7Ozs7O0lBR2hDLG1DQUF5Qjs7Ozs7SUFHekIsc0NBQTRCOzs7OztJQU01Qix5Q0FBOEM7Ozs7O0lBRzlDLG9DQUFpRDs7Ozs7SUFHakQsb0NBQWlEOzs7OztJQUdqRCwrQkFBNEM7Ozs7O0lBRzVDLDZCQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdyaWRNZW51SXRlbSB9IGZyb20gJy4vZ3JpZE1lbnVJdGVtLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdyaWRNZW51IHtcclxuICAvKiogQXJyYXkgb2YgQ3VzdG9tIEl0ZW1zICh0aXRsZSwgY29tbWFuZCwgZGlzYWJsZWQsIC4uLikgKi9cclxuICBjdXN0b21JdGVtcz86IEdyaWRNZW51SXRlbVtdO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gXCJDb21tYW5kc1wiIHdoaWNoIGlzIHRoZSB0aXRsZSB0aGF0IHNob3dzIHVwIG92ZXIgdGhlIGN1c3RvbSBjb21tYW5kcyBsaXN0ICovXHJcbiAgY3VzdG9tVGl0bGU/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBTYW1lIGFzIFwiY3VzdG9tVGl0bGVcIiwgZXhjZXB0IHRoYXQgaXQncyBhIHRyYW5zbGF0aW9uIGtleSB3aGljaCBjYW4gYmUgdXNlZCBvbiBwYWdlIGxvYWQgYW5kL29yIHdoZW4gc3dpdGNoaW5nIGxvY2FsZSAqL1xyXG4gIGN1c3RvbVRpdGxlS2V5Pzogc3RyaW5nO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gXCJDb2x1bW5zXCIgd2hpY2ggaXMgdGhlIHRpdGxlIHRoYXQgc2hvd3MgdXAgb3ZlciB0aGUgY29sdW1ucyAqL1xyXG4gIGNvbHVtblRpdGxlPzogc3RyaW5nO1xyXG5cclxuICAvKiogU2FtZSBhcyBcImNvbHVtblRpdGxlXCIsIGV4Y2VwdCB0aGF0IGl0J3MgYSB0cmFuc2xhdGlvbiBrZXkgd2hpY2ggY2FuIGJlIHVzZWQgb24gcGFnZSBsb2FkIGFuZC9vciB3aGVuIHN3aXRjaGluZyBsb2NhbGUgKi9cclxuICBjb2x1bW5UaXRsZUtleT86IHN0cmluZztcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIFwiRm9yY2UgZml0IGNvbHVtbnNcIiB3aGljaCBpcyAxIG9mIHRoZSBsYXN0IDIgY2hlY2tib3ggdGl0bGUgc2hvd24gYXQgdGhlIGVuZCBvZiB0aGUgcGlja2VyIGxpc3QgKi9cclxuICBmb3JjZUZpdFRpdGxlPzogc3RyaW5nO1xyXG5cclxuICAvKiogU2FtZSBhcyBcImZvcmNlRml0VGl0bGVcIiwgZXhjZXB0IHRoYXQgaXQncyBhIHRyYW5zbGF0aW9uIGtleSB3aGljaCBjYW4gYmUgdXNlZCBvbiBwYWdlIGxvYWQgYW5kL29yIHdoZW4gc3dpdGNoaW5nIGxvY2FsZSAqL1xyXG4gIGZvcmNlRml0VGl0bGVLZXk/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hpY2ggd2lsbCBoaWRlIHRoZSBcIkNsZWFyIEFsbCBGaWx0ZXJzXCIgY29tbWFuZCBpbiB0aGUgR3JpZCBNZW51IChHcmlkIE9wdGlvbiBcImVuYWJsZUZpbHRlcmluZzogdHJ1ZVwiIGhhcyB0byBiZSBlbmFibGVkKSAqL1xyXG4gIGhpZGVDbGVhckFsbEZpbHRlcnNDb21tYW5kPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCB3aWxsIGhpZGUgdGhlIFwiQ2xlYXIgQWxsIFNvcnRpbmdcIiBjb21tYW5kIGluIHRoZSBHcmlkIE1lbnUgKEdyaWQgT3B0aW9uIFwiZW5hYmxlU29ydGluZzogdHJ1ZVwiIGhhcyB0byBiZSBlbmFibGVkKSAqL1xyXG4gIGhpZGVDbGVhckFsbFNvcnRpbmdDb21tYW5kPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCB3aWxsIGhpZGUgdGhlIFwiRXhwb3J0IHRvIENTVlwiIGNvbW1hbmQgaW4gdGhlIEdyaWQgTWVudSAoR3JpZCBPcHRpb24gXCJlbmFibGVFeHBvcnQ6IHRydWVcIiBoYXMgdG8gYmUgZW5hYmxlZCkgKi9cclxuICBoaWRlRXhwb3J0Q3N2Q29tbWFuZD86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hpY2ggd2lsbCBoaWRlIHRoZSBcIkV4cG9ydCB0byBUZXh0IERlbGltaXRlZFwiIGNvbW1hbmQgaW4gdGhlIEdyaWQgTWVudSAoR3JpZCBPcHRpb24gXCJlbmFibGVFeHBvcnQ6IHRydWVcIiBoYXMgdG8gYmUgZW5hYmxlZCkgKi9cclxuICBoaWRlRXhwb3J0VGV4dERlbGltaXRlZENvbW1hbmQ/OiBib29sZWFuO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIHNob3cvaGlkZSAxIG9mIHRoZSBsYXN0IDIgY2hlY2tib3ggYXQgdGhlIGVuZCBvZiB0aGUgcGlja2VyIGxpc3QgKi9cclxuICBoaWRlRm9yY2VGaXRCdXR0b24/OiBib29sZWFuO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIHdoaWNoIHdpbGwgaGlkZSB0aGUgXCJSZWZyZXNoIERhdGFzZXRcIiBjb21tYW5kIGluIHRoZSBHcmlkIE1lbnUgKG9ubHkgd29ya3Mgd2l0aCBhIEJhY2tlbmQgU2VydmljZSBBUEkpICovXHJcbiAgaGlkZVJlZnJlc2hEYXRhc2V0Q29tbWFuZD86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgc2hvdy9oaWRlIDEgb2YgdGhlIGxhc3QgMiBjaGVja2JveCBhdCB0aGUgZW5kIG9mIHRoZSBwaWNrZXIgbGlzdCAqL1xyXG4gIGhpZGVTeW5jUmVzaXplQnV0dG9uPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCB3aWxsIGhpZGUgdGhlIFwiVG9nZ2xlIEZpbHRlciBSb3dcIiBjb21tYW5kIGluIHRoZSBHcmlkIE1lbnUgKEdyaWQgT3B0aW9uIFwiZW5hYmxlRmlsdGVyaW5nOiB0cnVlXCIgaGFzIHRvIGJlIGVuYWJsZWQpICovXHJcbiAgaGlkZVRvZ2dsZUZpbHRlckNvbW1hbmQ/OiBib29sZWFuO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gdHJ1ZSwgd2hpY2ggd2lsbCBoaWRlIHRoZSBcIlRvZ2dsZSBQcmUtSGVhZGVyIFJvd1wiICh1c2VkIGJ5IGRyYWdnYWJsZSBncm91cGluZykgY29tbWFuZCBpbiB0aGUgR3JpZCBNZW51IChHcmlkIE9wdGlvbiBcInNob3dQcmVIZWFkZXJQYW5lbDogdHJ1ZVwiIGhhcyB0byBiZSBlbmFibGVkKSAqL1xyXG4gIGhpZGVUb2dnbGVQcmVIZWFkZXJDb21tYW5kPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIENTUyBjbGFzcyBmb3IgdGhlIGRpc3BsYXlpbmcgdGhlIEdyaWQgbWVudSBpY29uIGltYWdlIChiYXNpY2FsbHkgdGhlIGhhbWJ1cmdlciBtZW51KSAqL1xyXG4gIGljb25Dc3NDbGFzcz86IHN0cmluZztcclxuXHJcbiAgLyoqIGljb24gZm9yIHRoZSBcIkNsZWFyIEFsbCBGaWx0ZXJzXCIgY29tbWFuZCAqL1xyXG4gIGljb25DbGVhckFsbEZpbHRlcnNDb21tYW5kPzogc3RyaW5nO1xyXG5cclxuICAvKiogaWNvbiBmb3IgdGhlIFwiQ2xlYXIgQWxsIFNvcnRpbmdcIiBjb21tYW5kICovXHJcbiAgaWNvbkNsZWFyQWxsU29ydGluZ0NvbW1hbmQ/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBpY29uIGZvciB0aGUgXCJFeHBvcnQgdG8gQ1NWXCIgY29tbWFuZCAqL1xyXG4gIGljb25FeHBvcnRDc3ZDb21tYW5kPzogc3RyaW5nO1xyXG5cclxuICAvKiogaWNvbiBmb3IgdGhlIFwiRXhwb3J0IHRvIFRleHQgRGVsaW1pdGVkXCIgY29tbWFuZCAqL1xyXG4gIGljb25FeHBvcnRUZXh0RGVsaW1pdGVkQ29tbWFuZD86IHN0cmluZztcclxuXHJcbiAgLyoqIExpbmsgZm9yIHRoZSBkaXNwbGF5aW5nIHRoZSBHcmlkIG1lbnUgaWNvbiBpbWFnZSAoYmFzaWNhbGx5IHRoZSBoYW1idXJnZXIgbWVudSkgKi9cclxuICBpY29uSW1hZ2U/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBpY29uIGZvciB0aGUgXCJSZWZyZXNoIERhdGFzZXRcIiBjb21tYW5kICovXHJcbiAgaWNvblJlZnJlc2hEYXRhc2V0Q29tbWFuZD86IHN0cmluZztcclxuXHJcbiAgLyoqIGljb24gZm9yIHRoZSBcIlRvZ2dsZSBGaWx0ZXIgUm93XCIgY29tbWFuZCAqL1xyXG4gIGljb25Ub2dnbGVGaWx0ZXJDb21tYW5kPzogc3RyaW5nO1xyXG5cclxuICAvKiogaWNvbiBmb3IgdGhlIFwiVG9nZ2xlIFByZS1IZWFkZXIgUm93XCIgY29tbWFuZCAqL1xyXG4gIGljb25Ub2dnbGVQcmVIZWFkZXJDb21tYW5kPzogc3RyaW5nO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gRmFsc2UsIHdoaWNoIGxlYWRzIHRvIGxlYXZpbmcgdGhlIG1lbnUgb3BlbiBhZnRlciBhIGNsaWNrICovXHJcbiAgbGVhdmVPcGVuPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIDE2IHBpeGVscyAob25seSB0aGUgbnVtYmVyKSwgd2hpY2ggaXMgdGhlIHdpZHRoIGluIHBpeGVscyBvZiB0aGUgR3JpZCBNZW51IGljb24gKi9cclxuICBtZW51V2lkdGg/OiBudW1iZXI7XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byBGYWxzZSwgd2hpY2ggd2lsbCByZXNpemUgdGhlIEhlYWRlciBSb3cgYW5kIHJlbW92ZSB0aGUgd2lkdGggb2YgdGhlIEdyaWQgTWVudSBpY29uIGZyb20gaXQncyB0b3RhbCB3aWR0aC4gKi9cclxuICByZXNpemVPblNob3dIZWFkZXJSb3c/OiBib29sZWFuO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gXCJTeW5jaHJvbm91cyByZXNpemVcIiB3aGljaCBpcyAxIG9mIHRoZSBsYXN0IDIgY2hlY2tib3ggdGl0bGUgc2hvd24gYXQgdGhlIGVuZCBvZiB0aGUgcGlja2VyIGxpc3QgKi9cclxuICBzeW5jUmVzaXplVGl0bGU/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBTYW1lIGFzIFwic3luY1Jlc2l6ZVRpdGxlXCIsIGV4Y2VwdCB0aGF0IGl0J3MgYSB0cmFuc2xhdGlvbiBrZXkgd2hpY2ggY2FuIGJlIHVzZWQgb24gcGFnZSBsb2FkIGFuZC9vciB3aGVuIHN3aXRjaGluZyBsb2NhbGUgKi9cclxuICBzeW5jUmVzaXplVGl0bGVLZXk/OiBzdHJpbmc7XHJcblxyXG4gIC8vIC0tXHJcbiAgLy8gRXZlbnRzXHJcblxyXG4gIC8qKiBGaXJlZCBhZnRlciBleHRlbnNpb24gKGNvbnRyb2wpIGlzIHJlZ2lzdGVyZWQgYnkgU2xpY2tHcmlkICovXHJcbiAgb25FeHRlbnNpb25SZWdpc3RlcmVkPzogKHBsdWdpbjogYW55KSA9PiB2b2lkO1xyXG5cclxuICAvKiogU2xpY2tHcmlkIEV2ZW50IGZpcmVkIGJlZm9yZSB0aGUgbWVudSBpcyBzaG93bi4gKi9cclxuICBvbkJlZm9yZU1lbnVTaG93PzogKGU6IEV2ZW50LCBhcmdzOiBhbnkpID0+IHZvaWQ7XHJcblxyXG4gIC8qKiBTbGlja0dyaWQgRXZlbnQgZmlyZWQgd2hlbiBhbnkgb2YgdGhlIGNvbHVtbnMgY2hlY2tib3ggc2VsZWN0aW9uIGNoYW5nZXMuICovXHJcbiAgb25Db2x1bW5zQ2hhbmdlZD86IChlOiBFdmVudCwgYXJnczogYW55KSA9PiB2b2lkO1xyXG5cclxuICAvKiogU2xpY2tHcmlkIEV2ZW50IGZpcmVkIHdoZW4gdGhlIG1lbnUgaXMgY2xvc2luZy4gKi9cclxuICBvbk1lbnVDbG9zZT86IChlOiBFdmVudCwgYXJnczogYW55KSA9PiB2b2lkO1xyXG5cclxuICAvKiogU2xpY2tHcmlkIEV2ZW50IGZpcmVkIG9uIG1lbnUgaXRlbSBjbGljayBmb3IgYnV0dG9ucyB3aXRoICdjb21tYW5kJyBzcGVjaWZpZWQuICovXHJcbiAgb25Db21tYW5kPzogKGU6IEV2ZW50LCBhcmdzOiBhbnkpID0+IHZvaWQ7XHJcbn1cclxuIl19