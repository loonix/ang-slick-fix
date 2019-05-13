/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function HeaderMenu() { }
if (false) {
    /**
     * Auto-align drop menu to the left when not enough viewport space to show on the right
     * @type {?|undefined}
     */
    HeaderMenu.prototype.autoAlign;
    /**
     * When drop menu is aligned to the left, it might not be perfectly aligned with the header menu icon, if that is the case you can add an offset (positive/negative number to move right/left)
     * @type {?|undefined}
     */
    HeaderMenu.prototype.autoAlignOffset;
    /**
     * an extra CSS class to add to the menu button
     * @type {?|undefined}
     */
    HeaderMenu.prototype.buttonCssClass;
    /**
     * a url to the menu button image (default '../images/down.gif')
     * @type {?|undefined}
     */
    HeaderMenu.prototype.buttonImage;
    /**
     * A command identifier to be passed to the onCommand event handlers.
     * @type {?|undefined}
     */
    HeaderMenu.prototype.command;
    /**
     * Whether the item is disabled.
     * @type {?|undefined}
     */
    HeaderMenu.prototype.disabled;
    /**
     * Defaults to false, which will hide the "Remove Filter" command in the Header Menu (Grid Option "enableHeaderMenu: true" has to be enabled)
     * @type {?|undefined}
     */
    HeaderMenu.prototype.hideClearFilterCommand;
    /**
     * Defaults to false, which will hide the "Remove Sort" command in the Header Menu (Grid Option "enableHeaderMenu: true" has to be enabled)
     * @type {?|undefined}
     */
    HeaderMenu.prototype.hideClearSortCommand;
    /**
     * Defaults to false, which will hide the Clear Filter command in the Header Menu (Grid Option "enableHeaderMenu: true" has to be enabled)
     * @type {?|undefined}
     */
    HeaderMenu.prototype.hideFilterCommands;
    /**
     * Defaults to false, which will hide Sort (Asc/Desc & Clear Sort) commands in the Header Menu (Grid Option "enableHeaderMenu: true" has to be enabled)
     * @type {?|undefined}
     */
    HeaderMenu.prototype.hideSortCommands;
    /**
     * Defaults to false, which will hide the "Hide Column" command in the Header Menu (Grid Option "enableHeaderMenu: true" has to be enabled)
     * @type {?|undefined}
     */
    HeaderMenu.prototype.hideColumnHideCommand;
    /**
     * A CSS class to be added to the menu item icon.
     * @type {?|undefined}
     */
    HeaderMenu.prototype.iconCssClass;
    /**
     * A url to the icon image.
     * @type {?|undefined}
     */
    HeaderMenu.prototype.iconImage;
    /**
     * icon for the "Remove Filter" command
     * @type {?|undefined}
     */
    HeaderMenu.prototype.iconClearFilterCommand;
    /**
     * icon for the "Remove Sort" command
     * @type {?|undefined}
     */
    HeaderMenu.prototype.iconClearSortCommand;
    /**
     * icon for the "Hide Column" command
     * @type {?|undefined}
     */
    HeaderMenu.prototype.iconColumnHideCommand;
    /**
     * icon for the "Sort Ascending" command
     * @type {?|undefined}
     */
    HeaderMenu.prototype.iconSortAscCommand;
    /**
     * icon for the "Sort Descending" command
     * @type {?|undefined}
     */
    HeaderMenu.prototype.iconSortDescCommand;
    /**
     * Minimum width that the drop menu will have
     * @type {?|undefined}
     */
    HeaderMenu.prototype.minWidth;
    /**
     * Menu item text.
     * @type {?|undefined}
     */
    HeaderMenu.prototype.title;
    /**
     * Item tooltip.
     * @type {?|undefined}
     */
    HeaderMenu.prototype.tooltip;
    /**
     * Fired after extension (plugin) is registered by SlickGrid
     * @type {?|undefined}
     */
    HeaderMenu.prototype.onExtensionRegistered;
    /**
     * Fired before the header menu shows up.
     * @type {?|undefined}
     */
    HeaderMenu.prototype.onBeforeMenuShow;
    /**
     * Fired when a command is clicked
     * @type {?|undefined}
     */
    HeaderMenu.prototype.onCommand;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyTWVudS5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL21vZGVscy9oZWFkZXJNZW51LmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBR0EsZ0NBNEVDOzs7Ozs7SUExRUMsK0JBQW9COzs7OztJQUdwQixxQ0FBeUI7Ozs7O0lBR3pCLG9DQUF3Qjs7Ozs7SUFHeEIsaUNBQXFCOzs7OztJQUdyQiw2QkFBaUI7Ozs7O0lBR2pCLDhCQUFtQjs7Ozs7SUFHbkIsNENBQWlDOzs7OztJQUdqQywwQ0FBK0I7Ozs7O0lBRy9CLHdDQUE2Qjs7Ozs7SUFHN0Isc0NBQTJCOzs7OztJQUczQiwyQ0FBZ0M7Ozs7O0lBR2hDLGtDQUFzQjs7Ozs7SUFHdEIsK0JBQW1COzs7OztJQUduQiw0Q0FBZ0M7Ozs7O0lBR2hDLDBDQUE4Qjs7Ozs7SUFHOUIsMkNBQStCOzs7OztJQUcvQix3Q0FBNEI7Ozs7O0lBRzVCLHlDQUE2Qjs7Ozs7SUFHN0IsOEJBQWtCOzs7OztJQUdsQiwyQkFBZTs7Ozs7SUFHZiw2QkFBaUI7Ozs7O0lBT2pCLDJDQUE4Qzs7Ozs7SUFHOUMsc0NBQTRFOzs7OztJQUc1RSwrQkFBZ0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIZWFkZXJNZW51T25CZWZvcmVNZW51U2hvd0FyZ3MgfSBmcm9tICcuL2hlYWRlck1lbnVPbkJlZm9yZU1lbnVTaG93QXJncy5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBIZWFkZXJCdXR0b25PbkNvbW1hbmRBcmdzIH0gZnJvbSAnLi9oZWFkZXJCdXR0b25PbkNvbW1hbmRBcmdzLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEhlYWRlck1lbnUge1xyXG4gIC8qKiBBdXRvLWFsaWduIGRyb3AgbWVudSB0byB0aGUgbGVmdCB3aGVuIG5vdCBlbm91Z2ggdmlld3BvcnQgc3BhY2UgdG8gc2hvdyBvbiB0aGUgcmlnaHQgKi9cclxuICBhdXRvQWxpZ24/OiBib29sZWFuO1xyXG5cclxuICAvKiogV2hlbiBkcm9wIG1lbnUgaXMgYWxpZ25lZCB0byB0aGUgbGVmdCwgaXQgbWlnaHQgbm90IGJlIHBlcmZlY3RseSBhbGlnbmVkIHdpdGggdGhlIGhlYWRlciBtZW51IGljb24sIGlmIHRoYXQgaXMgdGhlIGNhc2UgeW91IGNhbiBhZGQgYW4gb2Zmc2V0IChwb3NpdGl2ZS9uZWdhdGl2ZSBudW1iZXIgdG8gbW92ZSByaWdodC9sZWZ0KSAqL1xyXG4gIGF1dG9BbGlnbk9mZnNldD86IG51bWJlcjtcclxuXHJcbiAgLyoqIGFuIGV4dHJhIENTUyBjbGFzcyB0byBhZGQgdG8gdGhlIG1lbnUgYnV0dG9uICovXHJcbiAgYnV0dG9uQ3NzQ2xhc3M/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBhIHVybCB0byB0aGUgbWVudSBidXR0b24gaW1hZ2UgKGRlZmF1bHQgJy4uL2ltYWdlcy9kb3duLmdpZicpICovXHJcbiAgYnV0dG9uSW1hZ2U/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBBIGNvbW1hbmQgaWRlbnRpZmllciB0byBiZSBwYXNzZWQgdG8gdGhlIG9uQ29tbWFuZCBldmVudCBoYW5kbGVycy4gKi9cclxuICBjb21tYW5kPzogc3RyaW5nO1xyXG5cclxuICAvKiogV2hldGhlciB0aGUgaXRlbSBpcyBkaXNhYmxlZC4gKi9cclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hpY2ggd2lsbCBoaWRlIHRoZSBcIlJlbW92ZSBGaWx0ZXJcIiBjb21tYW5kIGluIHRoZSBIZWFkZXIgTWVudSAoR3JpZCBPcHRpb24gXCJlbmFibGVIZWFkZXJNZW51OiB0cnVlXCIgaGFzIHRvIGJlIGVuYWJsZWQpICovXHJcbiAgaGlkZUNsZWFyRmlsdGVyQ29tbWFuZD86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hpY2ggd2lsbCBoaWRlIHRoZSBcIlJlbW92ZSBTb3J0XCIgY29tbWFuZCBpbiB0aGUgSGVhZGVyIE1lbnUgKEdyaWQgT3B0aW9uIFwiZW5hYmxlSGVhZGVyTWVudTogdHJ1ZVwiIGhhcyB0byBiZSBlbmFibGVkKSAqL1xyXG4gIGhpZGVDbGVhclNvcnRDb21tYW5kPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCB3aWxsIGhpZGUgdGhlIENsZWFyIEZpbHRlciBjb21tYW5kIGluIHRoZSBIZWFkZXIgTWVudSAoR3JpZCBPcHRpb24gXCJlbmFibGVIZWFkZXJNZW51OiB0cnVlXCIgaGFzIHRvIGJlIGVuYWJsZWQpICovXHJcbiAgaGlkZUZpbHRlckNvbW1hbmRzPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCB3aWxsIGhpZGUgU29ydCAoQXNjL0Rlc2MgJiBDbGVhciBTb3J0KSBjb21tYW5kcyBpbiB0aGUgSGVhZGVyIE1lbnUgKEdyaWQgT3B0aW9uIFwiZW5hYmxlSGVhZGVyTWVudTogdHJ1ZVwiIGhhcyB0byBiZSBlbmFibGVkKSAqL1xyXG4gIGhpZGVTb3J0Q29tbWFuZHM/OiBib29sZWFuO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIHdoaWNoIHdpbGwgaGlkZSB0aGUgXCJIaWRlIENvbHVtblwiIGNvbW1hbmQgaW4gdGhlIEhlYWRlciBNZW51IChHcmlkIE9wdGlvbiBcImVuYWJsZUhlYWRlck1lbnU6IHRydWVcIiBoYXMgdG8gYmUgZW5hYmxlZCkgKi9cclxuICBoaWRlQ29sdW1uSGlkZUNvbW1hbmQ/OiBib29sZWFuO1xyXG5cclxuICAvKiogQSBDU1MgY2xhc3MgdG8gYmUgYWRkZWQgdG8gdGhlIG1lbnUgaXRlbSBpY29uLiAqL1xyXG4gIGljb25Dc3NDbGFzcz86IHN0cmluZztcclxuXHJcbiAgLyoqIEEgdXJsIHRvIHRoZSBpY29uIGltYWdlLiAqL1xyXG4gIGljb25JbWFnZT86IHN0cmluZztcclxuXHJcbiAgLyoqIGljb24gZm9yIHRoZSBcIlJlbW92ZSBGaWx0ZXJcIiBjb21tYW5kICovXHJcbiAgaWNvbkNsZWFyRmlsdGVyQ29tbWFuZD86IHN0cmluZztcclxuXHJcbiAgLyoqIGljb24gZm9yIHRoZSBcIlJlbW92ZSBTb3J0XCIgY29tbWFuZCAqL1xyXG4gIGljb25DbGVhclNvcnRDb21tYW5kPzogc3RyaW5nO1xyXG5cclxuICAvKiogaWNvbiBmb3IgdGhlIFwiSGlkZSBDb2x1bW5cIiBjb21tYW5kICovXHJcbiAgaWNvbkNvbHVtbkhpZGVDb21tYW5kPzogc3RyaW5nO1xyXG5cclxuICAvKiogaWNvbiBmb3IgdGhlIFwiU29ydCBBc2NlbmRpbmdcIiBjb21tYW5kICovXHJcbiAgaWNvblNvcnRBc2NDb21tYW5kPzogc3RyaW5nO1xyXG5cclxuICAvKiogaWNvbiBmb3IgdGhlIFwiU29ydCBEZXNjZW5kaW5nXCIgY29tbWFuZCAqL1xyXG4gIGljb25Tb3J0RGVzY0NvbW1hbmQ/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBNaW5pbXVtIHdpZHRoIHRoYXQgdGhlIGRyb3AgbWVudSB3aWxsIGhhdmUgKi9cclxuICBtaW5XaWR0aD86IG51bWJlcjtcclxuXHJcbiAgLyoqIE1lbnUgaXRlbSB0ZXh0LiAqL1xyXG4gIHRpdGxlPzogc3RyaW5nO1xyXG5cclxuICAvKiogSXRlbSB0b29sdGlwLiAqL1xyXG4gIHRvb2x0aXA/OiBzdHJpbmc7XHJcblxyXG4gIC8vIC0tXHJcbiAgLy8gRXZlbnRzXHJcbiAgLy8gLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKiBGaXJlZCBhZnRlciBleHRlbnNpb24gKHBsdWdpbikgaXMgcmVnaXN0ZXJlZCBieSBTbGlja0dyaWQgKi9cclxuICBvbkV4dGVuc2lvblJlZ2lzdGVyZWQ/OiAocGx1Z2luOiBhbnkpID0+IHZvaWQ7XHJcblxyXG4gIC8qKiBGaXJlZCBiZWZvcmUgdGhlIGhlYWRlciBtZW51IHNob3dzIHVwLiAqL1xyXG4gIG9uQmVmb3JlTWVudVNob3c/OiAoZTogRXZlbnQsIGFyZ3M6IEhlYWRlck1lbnVPbkJlZm9yZU1lbnVTaG93QXJncykgPT4gdm9pZDtcclxuXHJcbiAgLyoqIEZpcmVkIHdoZW4gYSBjb21tYW5kIGlzIGNsaWNrZWQgKi9cclxuICBvbkNvbW1hbmQ/OiAoZTogRXZlbnQsIGFyZ3M6IEhlYWRlckJ1dHRvbk9uQ29tbWFuZEFyZ3MpID0+IHZvaWQ7XHJcbn1cclxuIl19