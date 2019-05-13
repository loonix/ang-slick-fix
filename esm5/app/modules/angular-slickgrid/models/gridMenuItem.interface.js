/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function GridMenuItem() { }
if (false) {
    /**
     * Menu item text to show in the list.
     * @type {?|undefined}
     */
    GridMenuItem.prototype.title;
    /**
     * Same as "title", except that it's a translation key which can be used on page load and/or when switching locale
     * @type {?|undefined}
     */
    GridMenuItem.prototype.titleKey;
    /**
     * A command identifier to be passed to the onCommand event callback handlers.
     * @type {?}
     */
    GridMenuItem.prototype.command;
    /**
     * Defaults to false, whether the item is disabled.
     * @type {?|undefined}
     */
    GridMenuItem.prototype.disabled;
    /**
     * Defaults to false, whether the command is actually a divider (separator).
     * @type {?|undefined}
     */
    GridMenuItem.prototype.divider;
    /**
     * CSS class to be added to the menu item icon.
     * @type {?|undefined}
     */
    GridMenuItem.prototype.iconCssClass;
    /**
     * URL pointing to the icon image.
     * @type {?|undefined}
     */
    GridMenuItem.prototype.iconImage;
    /**
     * position order in the list, a lower number will make it on top of the list. Internal commands starts at 50.
     * @type {?|undefined}
     */
    GridMenuItem.prototype.positionOrder;
    /**
     * Item tooltip to show while hovering the command.
     * @type {?|undefined}
     */
    GridMenuItem.prototype.tooltip;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZE1lbnVJdGVtLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvbW9kZWxzL2dyaWRNZW51SXRlbS5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLGtDQTJCQzs7Ozs7O0lBekJDLDZCQUFlOzs7OztJQUdmLGdDQUFrQjs7Ozs7SUFHbEIsK0JBQWdCOzs7OztJQUdoQixnQ0FBbUI7Ozs7O0lBR25CLCtCQUFrQjs7Ozs7SUFHbEIsb0NBQXNCOzs7OztJQUd0QixpQ0FBbUI7Ozs7O0lBR25CLHFDQUF1Qjs7Ozs7SUFHdkIsK0JBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBHcmlkTWVudUl0ZW0ge1xyXG4gIC8qKiBNZW51IGl0ZW0gdGV4dCB0byBzaG93IGluIHRoZSBsaXN0LiAqL1xyXG4gIHRpdGxlPzogc3RyaW5nO1xyXG5cclxuICAvKiogU2FtZSBhcyBcInRpdGxlXCIsIGV4Y2VwdCB0aGF0IGl0J3MgYSB0cmFuc2xhdGlvbiBrZXkgd2hpY2ggY2FuIGJlIHVzZWQgb24gcGFnZSBsb2FkIGFuZC9vciB3aGVuIHN3aXRjaGluZyBsb2NhbGUgKi9cclxuICB0aXRsZUtleT86IHN0cmluZztcclxuXHJcbiAgLyoqIEEgY29tbWFuZCBpZGVudGlmaWVyIHRvIGJlIHBhc3NlZCB0byB0aGUgb25Db21tYW5kIGV2ZW50IGNhbGxiYWNrIGhhbmRsZXJzLiAqL1xyXG4gIGNvbW1hbmQ6IHN0cmluZztcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGV0aGVyIHRoZSBpdGVtIGlzIGRpc2FibGVkLiAqL1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGV0aGVyIHRoZSBjb21tYW5kIGlzIGFjdHVhbGx5IGEgZGl2aWRlciAoc2VwYXJhdG9yKS4gKi9cclxuICBkaXZpZGVyPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIENTUyBjbGFzcyB0byBiZSBhZGRlZCB0byB0aGUgbWVudSBpdGVtIGljb24uICovXHJcbiAgaWNvbkNzc0NsYXNzPzogc3RyaW5nO1xyXG5cclxuICAvKiogVVJMIHBvaW50aW5nIHRvIHRoZSBpY29uIGltYWdlLiAqL1xyXG4gIGljb25JbWFnZT86IHN0cmluZztcclxuXHJcbiAgLyoqIHBvc2l0aW9uIG9yZGVyIGluIHRoZSBsaXN0LCBhIGxvd2VyIG51bWJlciB3aWxsIG1ha2UgaXQgb24gdG9wIG9mIHRoZSBsaXN0LiBJbnRlcm5hbCBjb21tYW5kcyBzdGFydHMgYXQgNTAuICovXHJcbiAgcG9zaXRpb25PcmRlcj86IG51bWJlcjtcclxuXHJcbiAgLyoqIEl0ZW0gdG9vbHRpcCB0byBzaG93IHdoaWxlIGhvdmVyaW5nIHRoZSBjb21tYW5kLiAqL1xyXG4gIHRvb2x0aXA/OiBzdHJpbmc7XHJcbn1cclxuIl19