/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function BackendService() { }
if (false) {
    /**
     * Backend Service options
     * @type {?|undefined}
     */
    BackendService.prototype.options;
    /**
     * Build and the return the backend service query string
     * @type {?}
     */
    BackendService.prototype.buildQuery;
    /**
     * Clear all sorts
     * @type {?|undefined}
     */
    BackendService.prototype.clearFilters;
    /**
     * Clear all sorts
     * @type {?|undefined}
     */
    BackendService.prototype.clearSorters;
    /**
     * initialize the backend service with certain options
     * @type {?|undefined}
     */
    BackendService.prototype.init;
    /**
     * Get the dataset name
     * @type {?|undefined}
     */
    BackendService.prototype.getDatasetName;
    /**
     * Get the Filters that are currently used by the grid
     * @type {?|undefined}
     */
    BackendService.prototype.getCurrentFilters;
    /**
     * Get the Pagination that is currently used by the grid
     * @type {?|undefined}
     */
    BackendService.prototype.getCurrentPagination;
    /**
     * Get the Sorters that are currently used by the grid
     * @type {?|undefined}
     */
    BackendService.prototype.getCurrentSorters;
    /**
     * Reset the pagination options
     * @type {?}
     */
    BackendService.prototype.resetPaginationOptions;
    /**
     * Update the Filters options with a set of new options
     * @type {?|undefined}
     */
    BackendService.prototype.updateFilters;
    /**
     * Update the Pagination component with it's new page number and size
     * @type {?|undefined}
     */
    BackendService.prototype.updatePagination;
    /**
     * Update the Sorters options with a set of new options
     * @type {?|undefined}
     */
    BackendService.prototype.updateSorters;
    /**
     * Update the backend service options
     * @type {?}
     */
    BackendService.prototype.updateOptions;
    /**
     * Execute when any of the filters changed
     * @type {?}
     */
    BackendService.prototype.processOnFilterChanged;
    /**
     * Execute when the pagination changed
     * @type {?}
     */
    BackendService.prototype.processOnPaginationChanged;
    /**
     * Execute when any of the sorters changed
     * @type {?}
     */
    BackendService.prototype.processOnSortChanged;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZFNlcnZpY2UuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9tb2RlbHMvYmFja2VuZFNlcnZpY2UuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFlQSxvQ0F1REM7Ozs7OztJQXJEQyxpQ0FBK0I7Ozs7O0lBRy9CLG9DQUE4RDs7Ozs7SUFHOUQsc0NBQTBCOzs7OztJQUcxQixzQ0FBMEI7Ozs7O0lBRzFCLDhCQUE0Rjs7Ozs7SUFHNUYsd0NBQThCOzs7OztJQUc5QiwyQ0FBMEQ7Ozs7O0lBRzFELDhDQUErQzs7Ozs7SUFHL0MsMkNBQTBDOzs7OztJQUcxQyxnREFBbUM7Ozs7O0lBR25DLHVDQUFxRzs7Ozs7SUFHckcsMENBQStEOzs7OztJQUcvRCx1Q0FBc0Y7Ozs7O0lBR3RGLHVDQUErRDs7Ozs7SUFPL0QsZ0RBQW1GOzs7OztJQUduRixvREFBOEY7Ozs7O0lBRzlGLDhDQUFzRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEJhY2tlbmRTZXJ2aWNlT3B0aW9uLFxuICBDb2x1bW4sXG4gIENvbHVtbkZpbHRlcnMsXG4gIENvbHVtblNvcnQsXG4gIEN1cnJlbnRGaWx0ZXIsXG4gIEN1cnJlbnRQYWdpbmF0aW9uLFxuICBDdXJyZW50U29ydGVyLFxuICBGaWx0ZXJDaGFuZ2VkQXJncyxcbiAgR3JpZE9wdGlvbixcbiAgUGFnaW5hdGlvbixcbiAgUGFnaW5hdGlvbkNoYW5nZWRBcmdzLFxuICBTb3J0Q2hhbmdlZEFyZ3MsXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcblxuZXhwb3J0IGludGVyZmFjZSBCYWNrZW5kU2VydmljZSB7XG4gIC8qKiBCYWNrZW5kIFNlcnZpY2Ugb3B0aW9ucyAqL1xuICBvcHRpb25zPzogQmFja2VuZFNlcnZpY2VPcHRpb247XG5cbiAgLyoqIEJ1aWxkIGFuZCB0aGUgcmV0dXJuIHRoZSBiYWNrZW5kIHNlcnZpY2UgcXVlcnkgc3RyaW5nICovXG4gIGJ1aWxkUXVlcnk6IChzZXJ2aWNlT3B0aW9ucz86IEJhY2tlbmRTZXJ2aWNlT3B0aW9uKSA9PiBzdHJpbmc7XG5cbiAgLyoqIENsZWFyIGFsbCBzb3J0cyAqL1xuICBjbGVhckZpbHRlcnM/OiAoKSA9PiB2b2lkO1xuXG4gIC8qKiBDbGVhciBhbGwgc29ydHMgKi9cbiAgY2xlYXJTb3J0ZXJzPzogKCkgPT4gdm9pZDtcblxuICAvKiogaW5pdGlhbGl6ZSB0aGUgYmFja2VuZCBzZXJ2aWNlIHdpdGggY2VydGFpbiBvcHRpb25zICovXG4gIGluaXQ/OiAoc2VydmljZU9wdGlvbnM/OiBCYWNrZW5kU2VydmljZU9wdGlvbiwgcGFnaW5hdGlvbj86IFBhZ2luYXRpb24sIGdyaWQ/OiBhbnkpID0+IHZvaWQ7XG5cbiAgLyoqIEdldCB0aGUgZGF0YXNldCBuYW1lICovXG4gIGdldERhdGFzZXROYW1lPzogKCkgPT4gc3RyaW5nO1xuXG4gIC8qKiBHZXQgdGhlIEZpbHRlcnMgdGhhdCBhcmUgY3VycmVudGx5IHVzZWQgYnkgdGhlIGdyaWQgKi9cbiAgZ2V0Q3VycmVudEZpbHRlcnM/OiAoKSA9PiBDb2x1bW5GaWx0ZXJzIHwgQ3VycmVudEZpbHRlcltdO1xuXG4gIC8qKiBHZXQgdGhlIFBhZ2luYXRpb24gdGhhdCBpcyBjdXJyZW50bHkgdXNlZCBieSB0aGUgZ3JpZCAqL1xuICBnZXRDdXJyZW50UGFnaW5hdGlvbj86ICgpID0+IEN1cnJlbnRQYWdpbmF0aW9uO1xuXG4gIC8qKiBHZXQgdGhlIFNvcnRlcnMgdGhhdCBhcmUgY3VycmVudGx5IHVzZWQgYnkgdGhlIGdyaWQgKi9cbiAgZ2V0Q3VycmVudFNvcnRlcnM/OiAoKSA9PiBDdXJyZW50U29ydGVyW107XG5cbiAgLyoqIFJlc2V0IHRoZSBwYWdpbmF0aW9uIG9wdGlvbnMgKi9cbiAgcmVzZXRQYWdpbmF0aW9uT3B0aW9uczogKCkgPT4gdm9pZDtcblxuICAvKiogVXBkYXRlIHRoZSBGaWx0ZXJzIG9wdGlvbnMgd2l0aCBhIHNldCBvZiBuZXcgb3B0aW9ucyAqL1xuICB1cGRhdGVGaWx0ZXJzPzogKGNvbHVtbkZpbHRlcnM6IENvbHVtbkZpbHRlcnMgfCBDdXJyZW50RmlsdGVyW10sIGlzVXBkYXRlZEJ5UHJlc2V0OiBib29sZWFuKSA9PiB2b2lkO1xuXG4gIC8qKiBVcGRhdGUgdGhlIFBhZ2luYXRpb24gY29tcG9uZW50IHdpdGggaXQncyBuZXcgcGFnZSBudW1iZXIgYW5kIHNpemUgKi9cbiAgdXBkYXRlUGFnaW5hdGlvbj86IChuZXdQYWdlOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIpID0+IHZvaWQ7XG5cbiAgLyoqIFVwZGF0ZSB0aGUgU29ydGVycyBvcHRpb25zIHdpdGggYSBzZXQgb2YgbmV3IG9wdGlvbnMgKi9cbiAgdXBkYXRlU29ydGVycz86IChzb3J0Q29sdW1ucz86IENvbHVtblNvcnRbXSwgcHJlc2V0U29ydGVycz86IEN1cnJlbnRTb3J0ZXJbXSkgPT4gdm9pZDtcblxuICAvKiogVXBkYXRlIHRoZSBiYWNrZW5kIHNlcnZpY2Ugb3B0aW9ucyAqL1xuICB1cGRhdGVPcHRpb25zOiAoc2VydmljZU9wdGlvbnM/OiBCYWNrZW5kU2VydmljZU9wdGlvbikgPT4gdm9pZDtcblxuICAvLyAtLVxuICAvLyBFdmVudHMgLyBNZXRob2RzXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqIEV4ZWN1dGUgd2hlbiBhbnkgb2YgdGhlIGZpbHRlcnMgY2hhbmdlZCAqL1xuICBwcm9jZXNzT25GaWx0ZXJDaGFuZ2VkOiAoZXZlbnQ6IEV2ZW50LCBhcmdzOiBGaWx0ZXJDaGFuZ2VkQXJncykgPT4gUHJvbWlzZTxzdHJpbmc+O1xuXG4gIC8qKiBFeGVjdXRlIHdoZW4gdGhlIHBhZ2luYXRpb24gY2hhbmdlZCAqL1xuICBwcm9jZXNzT25QYWdpbmF0aW9uQ2hhbmdlZDogKGV2ZW50OiBFdmVudCB8IHVuZGVmaW5lZCwgYXJnczogUGFnaW5hdGlvbkNoYW5nZWRBcmdzKSA9PiBzdHJpbmc7XG5cbiAgLyoqIEV4ZWN1dGUgd2hlbiBhbnkgb2YgdGhlIHNvcnRlcnMgY2hhbmdlZCAqL1xuICBwcm9jZXNzT25Tb3J0Q2hhbmdlZDogKGV2ZW50OiBFdmVudCwgYXJnczogU29ydENoYW5nZWRBcmdzKSA9PiBzdHJpbmc7XG59XG4iXX0=