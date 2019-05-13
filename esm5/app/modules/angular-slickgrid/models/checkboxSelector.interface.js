/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function CheckboxSelector() { }
if (false) {
    /**
     * Defaults to "_checkbox_selector", you can provide a different column id used as the column header id
     * @type {?|undefined}
     */
    CheckboxSelector.prototype.columnId;
    /**
     * Provide a CSS class used by each row selection check boxes
     * @type {?|undefined}
     */
    CheckboxSelector.prototype.cssClass;
    /**
     * default to false, do we want to hide the "Select All" checkbox?
     * @type {?|undefined}
     */
    CheckboxSelector.prototype.hideSelectAllCheckbox;
    /**
     * defaults to false, do we want to hide the "Select All" checkbox from the Column Header Title Row?
     * @type {?|undefined}
     */
    CheckboxSelector.prototype.hideInColumnTitleRow;
    /**
     * defaults to true, do we want to hide the "Select All" checkbox from the Column Header Filter Row?
     * @type {?|undefined}
     */
    CheckboxSelector.prototype.hideInFilterHeaderRow;
    /**
     * Defaults to "Select/Deselect All", provide a tooltip that will be shown over the "Select All" checkbox
     * @type {?|undefined}
     */
    CheckboxSelector.prototype.toolTip;
    /**
     * Defaults to 30, width of the Row Selection checkbox column
     * @type {?|undefined}
     */
    CheckboxSelector.prototype.width;
    /**
     * Override the logic for showing (or not) the expand icon (use case example: only every 2nd row is expandable)
     * @type {?|undefined}
     */
    CheckboxSelector.prototype.selectableOverride;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3hTZWxlY3Rvci5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL21vZGVscy9jaGVja2JveFNlbGVjdG9yLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsc0NBd0JDOzs7Ozs7SUF0QkMsb0NBQWtCOzs7OztJQUdsQixvQ0FBa0I7Ozs7O0lBR2xCLGlEQUFnQzs7Ozs7SUFHaEMsZ0RBQStCOzs7OztJQUcvQixpREFBZ0M7Ozs7O0lBR2hDLG1DQUFpQjs7Ozs7SUFHakIsaUNBQWU7Ozs7O0lBR2YsOENBQTJFIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBDaGVja2JveFNlbGVjdG9yIHtcclxuICAvKiogRGVmYXVsdHMgdG8gXCJfY2hlY2tib3hfc2VsZWN0b3JcIiwgeW91IGNhbiBwcm92aWRlIGEgZGlmZmVyZW50IGNvbHVtbiBpZCB1c2VkIGFzIHRoZSBjb2x1bW4gaGVhZGVyIGlkICovXHJcbiAgY29sdW1uSWQ/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBQcm92aWRlIGEgQ1NTIGNsYXNzIHVzZWQgYnkgZWFjaCByb3cgc2VsZWN0aW9uIGNoZWNrIGJveGVzICovXHJcbiAgY3NzQ2xhc3M/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBkZWZhdWx0IHRvIGZhbHNlLCBkbyB3ZSB3YW50IHRvIGhpZGUgdGhlIFwiU2VsZWN0IEFsbFwiIGNoZWNrYm94PyAqL1xyXG4gIGhpZGVTZWxlY3RBbGxDaGVja2JveD86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBkZWZhdWx0cyB0byBmYWxzZSwgZG8gd2Ugd2FudCB0byBoaWRlIHRoZSBcIlNlbGVjdCBBbGxcIiBjaGVja2JveCBmcm9tIHRoZSBDb2x1bW4gSGVhZGVyIFRpdGxlIFJvdz8gKi9cclxuICBoaWRlSW5Db2x1bW5UaXRsZVJvdz86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBkZWZhdWx0cyB0byB0cnVlLCBkbyB3ZSB3YW50IHRvIGhpZGUgdGhlIFwiU2VsZWN0IEFsbFwiIGNoZWNrYm94IGZyb20gdGhlIENvbHVtbiBIZWFkZXIgRmlsdGVyIFJvdz8gKi9cclxuICBoaWRlSW5GaWx0ZXJIZWFkZXJSb3c/OiBib29sZWFuO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gXCJTZWxlY3QvRGVzZWxlY3QgQWxsXCIsIHByb3ZpZGUgYSB0b29sdGlwIHRoYXQgd2lsbCBiZSBzaG93biBvdmVyIHRoZSBcIlNlbGVjdCBBbGxcIiBjaGVja2JveCAqL1xyXG4gIHRvb2xUaXA/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byAzMCwgd2lkdGggb2YgdGhlIFJvdyBTZWxlY3Rpb24gY2hlY2tib3ggY29sdW1uICovXHJcbiAgd2lkdGg/OiBudW1iZXI7XHJcblxyXG4gIC8qKiBPdmVycmlkZSB0aGUgbG9naWMgZm9yIHNob3dpbmcgKG9yIG5vdCkgdGhlIGV4cGFuZCBpY29uICh1c2UgY2FzZSBleGFtcGxlOiBvbmx5IGV2ZXJ5IDJuZCByb3cgaXMgZXhwYW5kYWJsZSkgKi9cclxuICBzZWxlY3RhYmxlT3ZlcnJpZGU/OiAocm93OiBudW1iZXIsIGRhdGFDb250ZXh0OiBhbnksIGdyaWQ6IGFueSkgPT4gYm9vbGVhbjtcclxufVxyXG4iXX0=