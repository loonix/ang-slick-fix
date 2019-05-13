/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { SharedService } from '../services/shared.service';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { Injectable } from '@angular/core';
var DraggableGroupingExtension = /** @class */ (function () {
    function DraggableGroupingExtension(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
        this._eventHandler = new Slick.EventHandler();
    }
    /**
     * @return {?}
     */
    DraggableGroupingExtension.prototype.dispose = /**
     * @return {?}
     */
    function () {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    };
    /**
     * Attach/Create different plugins before the Grid creation.
     * For example the multi-select have to be added to the column definition before the grid is created to work properly
     */
    /**
     * Attach/Create different plugins before the Grid creation.
     * For example the multi-select have to be added to the column definition before the grid is created to work properly
     * @param {?} gridOptions
     * @return {?}
     */
    DraggableGroupingExtension.prototype.create = /**
     * Attach/Create different plugins before the Grid creation.
     * For example the multi-select have to be added to the column definition before the grid is created to work properly
     * @param {?} gridOptions
     * @return {?}
     */
    function (gridOptions) {
        // dynamically import the SlickGrid plugin with requireJS
        this.extensionUtility.loadExtensionDynamically(ExtensionName.draggableGrouping);
        if (!this._extension && gridOptions) {
            this._extension = new Slick.DraggableGrouping(gridOptions.draggableGrouping || {});
        }
        return this._extension;
    };
    /**
     * @return {?}
     */
    DraggableGroupingExtension.prototype.register = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            this.sharedService.grid.registerPlugin(this._extension);
            // Events
            if (this.sharedService.grid && this.sharedService.gridOptions.draggableGrouping) {
                if (this.sharedService.gridOptions.draggableGrouping.onExtensionRegistered) {
                    this.sharedService.gridOptions.draggableGrouping.onExtensionRegistered(this._extension);
                }
                this._eventHandler.subscribe(this._extension.onGroupChanged, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                function (e, args) {
                    if (_this.sharedService.gridOptions.draggableGrouping && typeof _this.sharedService.gridOptions.draggableGrouping.onGroupChanged === 'function') {
                        _this.sharedService.gridOptions.draggableGrouping.onGroupChanged(e, args);
                    }
                }));
            }
            return this._extension;
        }
        return null;
    };
    DraggableGroupingExtension.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DraggableGroupingExtension.ctorParameters = function () { return [
        { type: ExtensionUtility },
        { type: SharedService }
    ]; };
    return DraggableGroupingExtension;
}());
export { DraggableGroupingExtension };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DraggableGroupingExtension.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    DraggableGroupingExtension.prototype._extension;
    /**
     * @type {?}
     * @private
     */
    DraggableGroupingExtension.prototype.extensionUtility;
    /**
     * @type {?}
     * @private
     */
    DraggableGroupingExtension.prototype.sharedService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2V4dGVuc2lvbnMvZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQWEsYUFBYSxFQUF3QixNQUFNLGlCQUFpQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLM0M7SUFLRSxvQ0FBb0IsZ0JBQWtDLEVBQVUsYUFBNEI7UUFBeEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBSHBGLGtCQUFhLEdBQVEsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7SUFHMEMsQ0FBQzs7OztJQUVqRyw0Q0FBTzs7O0lBQVA7UUFDRSxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUVwQyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSCwyQ0FBTTs7Ozs7O0lBQU4sVUFBTyxXQUF1QjtRQUM1Qix5REFBeUQ7UUFDekQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRWhGLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLFdBQVcsRUFBRTtZQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNwRjtRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsNkNBQVE7OztJQUFSO1FBQUEsaUJBbUJDO1FBbEJDLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRTtZQUNuRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXhELFNBQVM7WUFDVCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFO2dCQUMvRSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixFQUFFO29CQUMxRSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQ3pGO2dCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYzs7Ozs7Z0JBQUUsVUFBQyxDQUFNLEVBQUUsSUFBbUQ7b0JBQ3ZILElBQUksS0FBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLElBQUksT0FBTyxLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEtBQUssVUFBVSxFQUFFO3dCQUM3SSxLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO3FCQUMxRTtnQkFDSCxDQUFDLEVBQUMsQ0FBQzthQUNKO1lBRUQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOztnQkFqREYsVUFBVTs7OztnQkFORixnQkFBZ0I7Z0JBRmhCLGFBQWE7O0lBMER0QixpQ0FBQztDQUFBLEFBbERELElBa0RDO1NBakRZLDBCQUEwQjs7Ozs7O0lBQ3JDLG1EQUFzRDs7Ozs7SUFDdEQsZ0RBQXdCOzs7OztJQUVaLHNEQUEwQzs7Ozs7SUFBRSxtREFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XG5pbXBvcnQgeyBFeHRlbnNpb24sIEV4dGVuc2lvbk5hbWUsIEdyaWRPcHRpb24sIEdyb3VwaW5nIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IEV4dGVuc2lvblV0aWxpdHkgfSBmcm9tICcuL2V4dGVuc2lvblV0aWxpdHknO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24gaW1wbGVtZW50cyBFeHRlbnNpb24ge1xuICBwcml2YXRlIF9ldmVudEhhbmRsZXI6IGFueSA9IG5ldyBTbGljay5FdmVudEhhbmRsZXIoKTtcbiAgcHJpdmF0ZSBfZXh0ZW5zaW9uOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBleHRlbnNpb25VdGlsaXR5OiBFeHRlbnNpb25VdGlsaXR5LCBwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UpIHsgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIFNsaWNrR3JpZCBldmVudHNcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcblxuICAgIGlmICh0aGlzLl9leHRlbnNpb24gJiYgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3kpIHtcbiAgICAgIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaC9DcmVhdGUgZGlmZmVyZW50IHBsdWdpbnMgYmVmb3JlIHRoZSBHcmlkIGNyZWF0aW9uLlxuICAgKiBGb3IgZXhhbXBsZSB0aGUgbXVsdGktc2VsZWN0IGhhdmUgdG8gYmUgYWRkZWQgdG8gdGhlIGNvbHVtbiBkZWZpbml0aW9uIGJlZm9yZSB0aGUgZ3JpZCBpcyBjcmVhdGVkIHRvIHdvcmsgcHJvcGVybHlcbiAgICovXG4gIGNyZWF0ZShncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xuICAgIC8vIGR5bmFtaWNhbGx5IGltcG9ydCB0aGUgU2xpY2tHcmlkIHBsdWdpbiB3aXRoIHJlcXVpcmVKU1xuICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5sb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoRXh0ZW5zaW9uTmFtZS5kcmFnZ2FibGVHcm91cGluZyk7XG5cbiAgICBpZiAoIXRoaXMuX2V4dGVuc2lvbiAmJiBncmlkT3B0aW9ucykge1xuICAgICAgdGhpcy5fZXh0ZW5zaW9uID0gbmV3IFNsaWNrLkRyYWdnYWJsZUdyb3VwaW5nKGdyaWRPcHRpb25zLmRyYWdnYWJsZUdyb3VwaW5nIHx8IHt9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2V4dGVuc2lvbjtcbiAgfVxuXG4gIHJlZ2lzdGVyKCk6IGFueSB7XG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMpIHtcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHRoaXMuX2V4dGVuc2lvbik7XG5cbiAgICAgIC8vIEV2ZW50c1xuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5kcmFnZ2FibGVHcm91cGluZykge1xuICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmRyYWdnYWJsZUdyb3VwaW5nLm9uRXh0ZW5zaW9uUmVnaXN0ZXJlZCkge1xuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5kcmFnZ2FibGVHcm91cGluZy5vbkV4dGVuc2lvblJlZ2lzdGVyZWQodGhpcy5fZXh0ZW5zaW9uKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2V4dGVuc2lvbi5vbkdyb3VwQ2hhbmdlZCwgKGU6IGFueSwgYXJnczogeyBjYWxsZXI/OiBzdHJpbmc7IGdyb3VwQ29sdW1uczogR3JvdXBpbmdbXSB9KSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5kcmFnZ2FibGVHcm91cGluZyAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmRyYWdnYWJsZUdyb3VwaW5nLm9uR3JvdXBDaGFuZ2VkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZHJhZ2dhYmxlR3JvdXBpbmcub25Hcm91cENoYW5nZWQoZSwgYXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX2V4dGVuc2lvbjtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==