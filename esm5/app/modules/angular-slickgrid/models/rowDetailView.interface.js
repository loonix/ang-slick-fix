/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function RowDetailView() { }
if (false) {
    /**
     * A CSS class to be added to the row detail
     * @type {?|undefined}
     */
    RowDetailView.prototype.cssClass;
    /**
     * Defaults to true, which will collapse all row detail views when user calls a sort. Unless user implements a sort to deal with padding
     * @type {?|undefined}
     */
    RowDetailView.prototype.collapseAllOnSort;
    /**
     * Extra classes to be added to the collapse Toggle
     * @type {?|undefined}
     */
    RowDetailView.prototype.collapsedClass;
    /**
     * Extra classes to be added to the expanded Toggle
     * @type {?|undefined}
     */
    RowDetailView.prototype.expandedClass;
    /**
     * Defaults to '_', prefix used for all the plugin metadata added to the item object (meta e.g.: padding, collapsed, parent)
     * @type {?|undefined}
     */
    RowDetailView.prototype.keyPrefix;
    /**
     * Defaults to false, when True will load the data once and then reuse it.
     * @type {?|undefined}
     */
    RowDetailView.prototype.loadOnce;
    /**
     * How many grid rows do we want to use for the detail panel view
     * also note that the detail view adds an extra 1 row for padding purposes
     * so if you choose 4 panelRows, the display will in fact use 5 rows
     * @type {?}
     */
    RowDetailView.prototype.panelRows;
    /**
     * Defaults to false, when True will open the row detail on a row click (from any column)
     * @type {?|undefined}
     */
    RowDetailView.prototype.useRowClick;
    /**
     * Defaults to true, which will save the row detail view in a cache when it detects that it will become out of the viewport buffer
     * @type {?|undefined}
     */
    RowDetailView.prototype.saveDetailViewOnScroll;
    /**
     * Defaults to false, which will use a simpler way of calculating when rows become out (or back) of viewport range.
     * It is recommended to enable this flag since it seems to work correctly with Aurelia-Slickgrid while the inverse is misbehaving
     * @type {?|undefined}
     */
    RowDetailView.prototype.useSimpleViewportCalc;
    /**
     * View Component of the preload template which shows after opening row detail & before row detail data shows up
     * @type {?|undefined}
     */
    RowDetailView.prototype.preloadComponent;
    /**
     * View Component that will be loaded once the async function finishes
     * @type {?}
     */
    RowDetailView.prototype.viewComponent;
    /**
     * HTML Preload Template that will be used before the async process (typically used to show a spinner/loading)
     * It's preferable to use the "preloadView" property to use an Aurelia View instead of plain HTML.
     * If you still wish to use these methods, we strongly suggest you to sanitize your HTML, e.g. "DOMPurify.sanitize()"
     * @type {?|undefined}
     */
    RowDetailView.prototype.preTemplate;
    /**
     * HTML Post Template (when Row Detail data is available) that will be loaded once the async function finishes
     * It's preferable to use the "preloadView" property to use an Aurelia View instead of plain HTML
     * If you still wish to use these methods, we strongly suggest you to sanitize your HTML, e.g. "DOMPurify.sanitize()"
     * @type {?|undefined}
     */
    RowDetailView.prototype.postTemplate;
    /**
     * Async server function call
     * @type {?}
     */
    RowDetailView.prototype.process;
    /**
     * Override the logic for showing (or not) the expand icon (use case example: only every 2nd row is expandable)
     * @type {?|undefined}
     */
    RowDetailView.prototype.expandableOverride;
    /**
     * Fired after extension (plugin) is registered by SlickGrid
     * @type {?|undefined}
     */
    RowDetailView.prototype.onExtensionRegistered;
    /**
     * This event must be used with the "notify" by the end user once the Asynchronous Server call returns the item detail
     * @type {?|undefined}
     */
    RowDetailView.prototype.onAsyncResponse;
    /**
     * Fired when the async response finished
     * @type {?|undefined}
     */
    RowDetailView.prototype.onAsyncEndUpdate;
    /**
     * Fired after the row detail gets toggled
     * @type {?|undefined}
     */
    RowDetailView.prototype.onAfterRowDetailToggle;
    /**
     * Fired before the row detail gets toggled
     * @type {?|undefined}
     */
    RowDetailView.prototype.onBeforeRowDetailToggle;
    /**
     * Fired after the row detail gets toggled
     * @type {?|undefined}
     */
    RowDetailView.prototype.onRowBackToViewportRange;
    /**
     * Fired after a row becomes out of viewport range (user can't see the row anymore)
     * @type {?|undefined}
     */
    RowDetailView.prototype.onRowOutOfViewportRange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93RGV0YWlsVmlldy5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL21vZGVscy9yb3dEZXRhaWxWaWV3LmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUEsbUNBMEZDOzs7Ozs7SUF4RkMsaUNBQWtCOzs7OztJQUdsQiwwQ0FBNEI7Ozs7O0lBRzVCLHVDQUF3Qjs7Ozs7SUFHeEIsc0NBQXVCOzs7OztJQUd2QixrQ0FBbUI7Ozs7O0lBR25CLGlDQUFtQjs7Ozs7OztJQU9uQixrQ0FBa0I7Ozs7O0lBR2xCLG9DQUFzQjs7Ozs7SUFHdEIsK0NBQWlDOzs7Ozs7SUFNakMsOENBQWdDOzs7OztJQUdoQyx5Q0FBZ0M7Ozs7O0lBR2hDLHNDQUE0Qjs7Ozs7OztJQVU1QixvQ0FBMkI7Ozs7Ozs7SUFPM0IscUNBQXFDOzs7OztJQUdyQyxnQ0FBcUM7Ozs7O0lBR3JDLDJDQUEyRTs7Ozs7SUFNM0UsOENBQThDOzs7OztJQUc5Qyx3Q0FBNEU7Ozs7O0lBRzVFLHlDQUFzRTs7Ozs7SUFHdEUsK0NBQWlHOzs7OztJQUdqRyxnREFBNkU7Ozs7O0lBRzdFLGlEQUFvSzs7Ozs7SUFHcEssZ0RBQW1LIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSb3dEZXRhaWxWaWV3IHtcclxuICAvKiogQSBDU1MgY2xhc3MgdG8gYmUgYWRkZWQgdG8gdGhlIHJvdyBkZXRhaWwgKi9cclxuICBjc3NDbGFzcz86IHN0cmluZztcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIHRydWUsIHdoaWNoIHdpbGwgY29sbGFwc2UgYWxsIHJvdyBkZXRhaWwgdmlld3Mgd2hlbiB1c2VyIGNhbGxzIGEgc29ydC4gVW5sZXNzIHVzZXIgaW1wbGVtZW50cyBhIHNvcnQgdG8gZGVhbCB3aXRoIHBhZGRpbmcgKi9cclxuICBjb2xsYXBzZUFsbE9uU29ydD86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBFeHRyYSBjbGFzc2VzIHRvIGJlIGFkZGVkIHRvIHRoZSBjb2xsYXBzZSBUb2dnbGUgKi9cclxuICBjb2xsYXBzZWRDbGFzcz86IHN0cmluZztcclxuXHJcbiAgLyoqIEV4dHJhIGNsYXNzZXMgdG8gYmUgYWRkZWQgdG8gdGhlIGV4cGFuZGVkIFRvZ2dsZSAqL1xyXG4gIGV4cGFuZGVkQ2xhc3M/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byAnXycsIHByZWZpeCB1c2VkIGZvciBhbGwgdGhlIHBsdWdpbiBtZXRhZGF0YSBhZGRlZCB0byB0aGUgaXRlbSBvYmplY3QgKG1ldGEgZS5nLjogcGFkZGluZywgY29sbGFwc2VkLCBwYXJlbnQpICovXHJcbiAga2V5UHJlZml4Pzogc3RyaW5nO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIHdoZW4gVHJ1ZSB3aWxsIGxvYWQgdGhlIGRhdGEgb25jZSBhbmQgdGhlbiByZXVzZSBpdC4gKi9cclxuICBsb2FkT25jZT86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEhvdyBtYW55IGdyaWQgcm93cyBkbyB3ZSB3YW50IHRvIHVzZSBmb3IgdGhlIGRldGFpbCBwYW5lbCB2aWV3XHJcbiAgICogYWxzbyBub3RlIHRoYXQgdGhlIGRldGFpbCB2aWV3IGFkZHMgYW4gZXh0cmEgMSByb3cgZm9yIHBhZGRpbmcgcHVycG9zZXNcclxuICAgKiBzbyBpZiB5b3UgY2hvb3NlIDQgcGFuZWxSb3dzLCB0aGUgZGlzcGxheSB3aWxsIGluIGZhY3QgdXNlIDUgcm93c1xyXG4gICAqL1xyXG4gIHBhbmVsUm93czogbnVtYmVyO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIHdoZW4gVHJ1ZSB3aWxsIG9wZW4gdGhlIHJvdyBkZXRhaWwgb24gYSByb3cgY2xpY2sgKGZyb20gYW55IGNvbHVtbikgKi9cclxuICB1c2VSb3dDbGljaz86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byB0cnVlLCB3aGljaCB3aWxsIHNhdmUgdGhlIHJvdyBkZXRhaWwgdmlldyBpbiBhIGNhY2hlIHdoZW4gaXQgZGV0ZWN0cyB0aGF0IGl0IHdpbGwgYmVjb21lIG91dCBvZiB0aGUgdmlld3BvcnQgYnVmZmVyICovXHJcbiAgc2F2ZURldGFpbFZpZXdPblNjcm9sbD86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCB3aWxsIHVzZSBhIHNpbXBsZXIgd2F5IG9mIGNhbGN1bGF0aW5nIHdoZW4gcm93cyBiZWNvbWUgb3V0IChvciBiYWNrKSBvZiB2aWV3cG9ydCByYW5nZS5cclxuICAgKiBJdCBpcyByZWNvbW1lbmRlZCB0byBlbmFibGUgdGhpcyBmbGFnIHNpbmNlIGl0IHNlZW1zIHRvIHdvcmsgY29ycmVjdGx5IHdpdGggQXVyZWxpYS1TbGlja2dyaWQgd2hpbGUgdGhlIGludmVyc2UgaXMgbWlzYmVoYXZpbmdcclxuICAgKi9cclxuICB1c2VTaW1wbGVWaWV3cG9ydENhbGM/OiBib29sZWFuO1xyXG5cclxuICAvKiogVmlldyBDb21wb25lbnQgb2YgdGhlIHByZWxvYWQgdGVtcGxhdGUgd2hpY2ggc2hvd3MgYWZ0ZXIgb3BlbmluZyByb3cgZGV0YWlsICYgYmVmb3JlIHJvdyBkZXRhaWwgZGF0YSBzaG93cyB1cCAqL1xyXG4gIHByZWxvYWRDb21wb25lbnQ/OiBUeXBlPG9iamVjdD47XHJcblxyXG4gIC8qKiBWaWV3IENvbXBvbmVudCB0aGF0IHdpbGwgYmUgbG9hZGVkIG9uY2UgdGhlIGFzeW5jIGZ1bmN0aW9uIGZpbmlzaGVzICovXHJcbiAgdmlld0NvbXBvbmVudDogVHlwZTxvYmplY3Q+O1xyXG5cclxuICAvLyAtLVxyXG4gIC8vIENhbGxiYWNrIE1ldGhvZHNcclxuXHJcbiAgLyoqXHJcbiAgICogSFRNTCBQcmVsb2FkIFRlbXBsYXRlIHRoYXQgd2lsbCBiZSB1c2VkIGJlZm9yZSB0aGUgYXN5bmMgcHJvY2VzcyAodHlwaWNhbGx5IHVzZWQgdG8gc2hvdyBhIHNwaW5uZXIvbG9hZGluZylcclxuICAgKiBJdCdzIHByZWZlcmFibGUgdG8gdXNlIHRoZSBcInByZWxvYWRWaWV3XCIgcHJvcGVydHkgdG8gdXNlIGFuIEF1cmVsaWEgVmlldyBpbnN0ZWFkIG9mIHBsYWluIEhUTUwuXHJcbiAgICogSWYgeW91IHN0aWxsIHdpc2ggdG8gdXNlIHRoZXNlIG1ldGhvZHMsIHdlIHN0cm9uZ2x5IHN1Z2dlc3QgeW91IHRvIHNhbml0aXplIHlvdXIgSFRNTCwgZS5nLiBcIkRPTVB1cmlmeS5zYW5pdGl6ZSgpXCJcclxuICAgKi9cclxuICBwcmVUZW1wbGF0ZT86ICgpID0+IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogSFRNTCBQb3N0IFRlbXBsYXRlICh3aGVuIFJvdyBEZXRhaWwgZGF0YSBpcyBhdmFpbGFibGUpIHRoYXQgd2lsbCBiZSBsb2FkZWQgb25jZSB0aGUgYXN5bmMgZnVuY3Rpb24gZmluaXNoZXNcclxuICAgKiBJdCdzIHByZWZlcmFibGUgdG8gdXNlIHRoZSBcInByZWxvYWRWaWV3XCIgcHJvcGVydHkgdG8gdXNlIGFuIEF1cmVsaWEgVmlldyBpbnN0ZWFkIG9mIHBsYWluIEhUTUxcclxuICAgKiBJZiB5b3Ugc3RpbGwgd2lzaCB0byB1c2UgdGhlc2UgbWV0aG9kcywgd2Ugc3Ryb25nbHkgc3VnZ2VzdCB5b3UgdG8gc2FuaXRpemUgeW91ciBIVE1MLCBlLmcuIFwiRE9NUHVyaWZ5LnNhbml0aXplKClcIlxyXG4gICAqL1xyXG4gIHBvc3RUZW1wbGF0ZT86IChpdGVtOiBhbnkpID0+IHN0cmluZztcclxuXHJcbiAgLyoqIEFzeW5jIHNlcnZlciBmdW5jdGlvbiBjYWxsICovXHJcbiAgcHJvY2VzczogKGl0ZW06IGFueSkgPT4gUHJvbWlzZTxhbnk+O1xyXG5cclxuICAvKiogT3ZlcnJpZGUgdGhlIGxvZ2ljIGZvciBzaG93aW5nIChvciBub3QpIHRoZSBleHBhbmQgaWNvbiAodXNlIGNhc2UgZXhhbXBsZTogb25seSBldmVyeSAybmQgcm93IGlzIGV4cGFuZGFibGUpICovXHJcbiAgZXhwYW5kYWJsZU92ZXJyaWRlPzogKHJvdzogbnVtYmVyLCBkYXRhQ29udGV4dDogYW55LCBncmlkOiBhbnkpID0+IGJvb2xlYW47XHJcblxyXG4gIC8vIC0tXHJcbiAgLy8gU2xpY2tHcmlkIEV2ZW50c1xyXG5cclxuICAvKiogRmlyZWQgYWZ0ZXIgZXh0ZW5zaW9uIChwbHVnaW4pIGlzIHJlZ2lzdGVyZWQgYnkgU2xpY2tHcmlkICovXHJcbiAgb25FeHRlbnNpb25SZWdpc3RlcmVkPzogKHBsdWdpbjogYW55KSA9PiB2b2lkO1xyXG5cclxuICAvKiogVGhpcyBldmVudCBtdXN0IGJlIHVzZWQgd2l0aCB0aGUgXCJub3RpZnlcIiBieSB0aGUgZW5kIHVzZXIgb25jZSB0aGUgQXN5bmNocm9ub3VzIFNlcnZlciBjYWxsIHJldHVybnMgdGhlIGl0ZW0gZGV0YWlsICovXHJcbiAgb25Bc3luY1Jlc3BvbnNlPzogKGU6IEV2ZW50LCBhcmdzOiB7IGl0ZW06IGFueTsgZGV0YWlsVmlldz86IGFueSB9KSA9PiB2b2lkO1xyXG5cclxuICAvKiogRmlyZWQgd2hlbiB0aGUgYXN5bmMgcmVzcG9uc2UgZmluaXNoZWQgKi9cclxuICBvbkFzeW5jRW5kVXBkYXRlPzogKGU6IEV2ZW50LCBhcmdzOiB7IGdyaWQ6IGFueTsgaXRlbTogYW55IH0pID0+IHZvaWQ7XHJcblxyXG4gIC8qKiBGaXJlZCBhZnRlciB0aGUgcm93IGRldGFpbCBnZXRzIHRvZ2dsZWQgKi9cclxuICBvbkFmdGVyUm93RGV0YWlsVG9nZ2xlPzogKGU6IEV2ZW50LCBhcmdzOiB7IGdyaWQ6IGFueTsgaXRlbTogYW55OyBleHBhbmRlZFJvd3M6IGFueVtdIH0pID0+IHZvaWQ7XHJcblxyXG4gIC8qKiBGaXJlZCBiZWZvcmUgdGhlIHJvdyBkZXRhaWwgZ2V0cyB0b2dnbGVkICovXHJcbiAgb25CZWZvcmVSb3dEZXRhaWxUb2dnbGU/OiAoZTogRXZlbnQsIGFyZ3M6IHsgZ3JpZDogYW55OyBpdGVtOiBhbnkgfSkgPT4gdm9pZDtcclxuXHJcbiAgLyoqIEZpcmVkIGFmdGVyIHRoZSByb3cgZGV0YWlsIGdldHMgdG9nZ2xlZCAqL1xyXG4gIG9uUm93QmFja1RvVmlld3BvcnRSYW5nZT86IChlOiBFdmVudCwgYXJnczogeyBncmlkOiBhbnk7IGl0ZW06IGFueTsgcm93SWQ6IG51bWJlcjsgcm93SW5kZXg6IG51bWJlcjsgZXhwYW5kZWRSb3dzOiBhbnlbXTsgcm93SWRzT3V0T2ZWaWV3cG9ydDogbnVtYmVyW107IH0pID0+IHZvaWQ7XHJcblxyXG4gIC8qKiBGaXJlZCBhZnRlciBhIHJvdyBiZWNvbWVzIG91dCBvZiB2aWV3cG9ydCByYW5nZSAodXNlciBjYW4ndCBzZWUgdGhlIHJvdyBhbnltb3JlKSAqL1xyXG4gIG9uUm93T3V0T2ZWaWV3cG9ydFJhbmdlPzogKGU6IEV2ZW50LCBhcmdzOiB7IGdyaWQ6IGFueTsgaXRlbTogYW55OyByb3dJZDogbnVtYmVyOyByb3dJbmRleDogbnVtYmVyOyBleHBhbmRlZFJvd3M6IGFueVtdOyByb3dJZHNPdXRPZlZpZXdwb3J0OiBudW1iZXJbXTsgfSkgPT4gdm9pZDtcclxufVxyXG4iXX0=