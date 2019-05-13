/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { SharedService } from '../services/shared.service';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { Injectable } from '@angular/core';
export class DraggableGroupingExtension {
    /**
     * @param {?} extensionUtility
     * @param {?} sharedService
     */
    constructor(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
        this._eventHandler = new Slick.EventHandler();
    }
    /**
     * @return {?}
     */
    dispose() {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    }
    /**
     * Attach/Create different plugins before the Grid creation.
     * For example the multi-select have to be added to the column definition before the grid is created to work properly
     * @param {?} gridOptions
     * @return {?}
     */
    create(gridOptions) {
        // dynamically import the SlickGrid plugin with requireJS
        this.extensionUtility.loadExtensionDynamically(ExtensionName.draggableGrouping);
        if (!this._extension && gridOptions) {
            this._extension = new Slick.DraggableGrouping(gridOptions.draggableGrouping || {});
        }
        return this._extension;
    }
    /**
     * @return {?}
     */
    register() {
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
                (e, args) => {
                    if (this.sharedService.gridOptions.draggableGrouping && typeof this.sharedService.gridOptions.draggableGrouping.onGroupChanged === 'function') {
                        this.sharedService.gridOptions.draggableGrouping.onGroupChanged(e, args);
                    }
                }));
            }
            return this._extension;
        }
        return null;
    }
}
DraggableGroupingExtension.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DraggableGroupingExtension.ctorParameters = () => [
    { type: ExtensionUtility },
    { type: SharedService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2V4dGVuc2lvbnMvZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQWEsYUFBYSxFQUF3QixNQUFNLGlCQUFpQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNM0MsTUFBTSxPQUFPLDBCQUEwQjs7Ozs7SUFJckMsWUFBb0IsZ0JBQWtDLEVBQVUsYUFBNEI7UUFBeEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBSHBGLGtCQUFhLEdBQVEsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7SUFHMEMsQ0FBQzs7OztJQUVqRyxPQUFPO1FBQ0wsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFcEMsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDOzs7Ozs7O0lBTUQsTUFBTSxDQUFDLFdBQXVCO1FBQzVCLHlEQUF5RDtRQUN6RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFaEYsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksV0FBVyxFQUFFO1lBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLGlCQUFpQixJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3BGO1FBQ0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFO1lBQ25GLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFeEQsU0FBUztZQUNULElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUU7Z0JBQy9FLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLEVBQUU7b0JBQzFFLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDekY7Z0JBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjOzs7OztnQkFBRSxDQUFDLENBQU0sRUFBRSxJQUFtRCxFQUFFLEVBQUU7b0JBQzNILElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLElBQUksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEtBQUssVUFBVSxFQUFFO3dCQUM3SSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO3FCQUMxRTtnQkFDSCxDQUFDLEVBQUMsQ0FBQzthQUNKO1lBRUQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7WUFqREYsVUFBVTs7OztZQU5GLGdCQUFnQjtZQUZoQixhQUFhOzs7Ozs7O0lBVXBCLG1EQUFzRDs7Ozs7SUFDdEQsZ0RBQXdCOzs7OztJQUVaLHNEQUEwQzs7Ozs7SUFBRSxtREFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XG5pbXBvcnQgeyBFeHRlbnNpb24sIEV4dGVuc2lvbk5hbWUsIEdyaWRPcHRpb24sIEdyb3VwaW5nIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IEV4dGVuc2lvblV0aWxpdHkgfSBmcm9tICcuL2V4dGVuc2lvblV0aWxpdHknO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24gaW1wbGVtZW50cyBFeHRlbnNpb24ge1xuICBwcml2YXRlIF9ldmVudEhhbmRsZXI6IGFueSA9IG5ldyBTbGljay5FdmVudEhhbmRsZXIoKTtcbiAgcHJpdmF0ZSBfZXh0ZW5zaW9uOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBleHRlbnNpb25VdGlsaXR5OiBFeHRlbnNpb25VdGlsaXR5LCBwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UpIHsgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIFNsaWNrR3JpZCBldmVudHNcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcblxuICAgIGlmICh0aGlzLl9leHRlbnNpb24gJiYgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3kpIHtcbiAgICAgIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaC9DcmVhdGUgZGlmZmVyZW50IHBsdWdpbnMgYmVmb3JlIHRoZSBHcmlkIGNyZWF0aW9uLlxuICAgKiBGb3IgZXhhbXBsZSB0aGUgbXVsdGktc2VsZWN0IGhhdmUgdG8gYmUgYWRkZWQgdG8gdGhlIGNvbHVtbiBkZWZpbml0aW9uIGJlZm9yZSB0aGUgZ3JpZCBpcyBjcmVhdGVkIHRvIHdvcmsgcHJvcGVybHlcbiAgICovXG4gIGNyZWF0ZShncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xuICAgIC8vIGR5bmFtaWNhbGx5IGltcG9ydCB0aGUgU2xpY2tHcmlkIHBsdWdpbiB3aXRoIHJlcXVpcmVKU1xuICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5sb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoRXh0ZW5zaW9uTmFtZS5kcmFnZ2FibGVHcm91cGluZyk7XG5cbiAgICBpZiAoIXRoaXMuX2V4dGVuc2lvbiAmJiBncmlkT3B0aW9ucykge1xuICAgICAgdGhpcy5fZXh0ZW5zaW9uID0gbmV3IFNsaWNrLkRyYWdnYWJsZUdyb3VwaW5nKGdyaWRPcHRpb25zLmRyYWdnYWJsZUdyb3VwaW5nIHx8IHt9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2V4dGVuc2lvbjtcbiAgfVxuXG4gIHJlZ2lzdGVyKCk6IGFueSB7XG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMpIHtcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHRoaXMuX2V4dGVuc2lvbik7XG5cbiAgICAgIC8vIEV2ZW50c1xuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5kcmFnZ2FibGVHcm91cGluZykge1xuICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmRyYWdnYWJsZUdyb3VwaW5nLm9uRXh0ZW5zaW9uUmVnaXN0ZXJlZCkge1xuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5kcmFnZ2FibGVHcm91cGluZy5vbkV4dGVuc2lvblJlZ2lzdGVyZWQodGhpcy5fZXh0ZW5zaW9uKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2V4dGVuc2lvbi5vbkdyb3VwQ2hhbmdlZCwgKGU6IGFueSwgYXJnczogeyBjYWxsZXI/OiBzdHJpbmc7IGdyb3VwQ29sdW1uczogR3JvdXBpbmdbXSB9KSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5kcmFnZ2FibGVHcm91cGluZyAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmRyYWdnYWJsZUdyb3VwaW5nLm9uR3JvdXBDaGFuZ2VkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZHJhZ2dhYmxlR3JvdXBpbmcub25Hcm91cENoYW5nZWQoZSwgYXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX2V4dGVuc2lvbjtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==