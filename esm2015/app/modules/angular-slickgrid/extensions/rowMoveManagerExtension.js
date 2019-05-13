/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';
export class RowMoveManagerExtension {
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
     * @param {?=} rowSelectionPlugin
     * @return {?}
     */
    register(rowSelectionPlugin) {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.rowMoveManager);
            // this also requires the Row Selection Model to be registered as well
            if (!rowSelectionPlugin || !this.sharedService.grid.getSelectionModel()) {
                this.extensionUtility.loadExtensionDynamically(ExtensionName.rowSelection);
                rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || {});
                this.sharedService.grid.setSelectionModel(rowSelectionPlugin);
            }
            this._extension = new Slick.RowMoveManager(this.sharedService.gridOptions.rowMoveManager || { cancelEditOnDrag: true });
            this.sharedService.grid.registerPlugin(this._extension);
            // hook all events
            if (this.sharedService.grid && this.sharedService.gridOptions.rowMoveManager) {
                if (this.sharedService.gridOptions.rowMoveManager.onExtensionRegistered) {
                    this.sharedService.gridOptions.rowMoveManager.onExtensionRegistered(this._extension);
                }
                this._eventHandler.subscribe(this._extension.onBeforeMoveRows, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                (e, args) => {
                    if (this.sharedService.gridOptions.rowMoveManager && typeof this.sharedService.gridOptions.rowMoveManager.onBeforeMoveRows === 'function') {
                        this.sharedService.gridOptions.rowMoveManager.onBeforeMoveRows(e, args);
                    }
                }));
                this._eventHandler.subscribe(this._extension.onMoveRows, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                (e, args) => {
                    if (this.sharedService.gridOptions.rowMoveManager && typeof this.sharedService.gridOptions.rowMoveManager.onMoveRows === 'function') {
                        this.sharedService.gridOptions.rowMoveManager.onMoveRows(e, args);
                    }
                }));
            }
            return this._extension;
        }
        return null;
    }
}
RowMoveManagerExtension.decorators = [
    { type: Injectable }
];
/** @nocollapse */
RowMoveManagerExtension.ctorParameters = () => [
    { type: ExtensionUtility },
    { type: SharedService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    RowMoveManagerExtension.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    RowMoveManagerExtension.prototype._extension;
    /**
     * @type {?}
     * @private
     */
    RowMoveManagerExtension.prototype.extensionUtility;
    /**
     * @type {?}
     * @private
     */
    RowMoveManagerExtension.prototype.sharedService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93TW92ZU1hbmFnZXJFeHRlbnNpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2V4dGVuc2lvbnMvcm93TW92ZU1hbmFnZXJFeHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUF1QixhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFNM0QsTUFBTSxPQUFPLHVCQUF1Qjs7Ozs7SUFJbEMsWUFBb0IsZ0JBQWtDLEVBQVUsYUFBNEI7UUFBeEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBSHBGLGtCQUFhLEdBQVEsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7SUFHMEMsQ0FBQzs7OztJQUVqRyxPQUFPO1FBQ0wsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFcEMsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxrQkFBd0I7UUFDL0IsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFO1lBQ25GLHlEQUF5RDtZQUN6RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRTdFLHNFQUFzRTtZQUN0RSxJQUFJLENBQUMsa0JBQWtCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO2dCQUN2RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMzRSxrQkFBa0IsR0FBRyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDM0csSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUMvRDtZQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGNBQWMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDeEgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUV4RCxrQkFBa0I7WUFDbEIsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUU7Z0JBQzVFLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLHFCQUFxQixFQUFFO29CQUN2RSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUN0RjtnQkFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQjs7Ozs7Z0JBQUUsQ0FBQyxDQUFNLEVBQUUsSUFBYyxFQUFFLEVBQUU7b0JBQ3hGLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsY0FBYyxJQUFJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLGdCQUFnQixLQUFLLFVBQVUsRUFBRTt3QkFDekksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDekU7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVOzs7OztnQkFBRSxDQUFDLENBQU0sRUFBRSxJQUFjLEVBQUUsRUFBRTtvQkFDbEYsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxjQUFjLElBQUksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRTt3QkFDbkksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7cUJBQ25FO2dCQUNILENBQUMsRUFBQyxDQUFDO2FBQ0o7WUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7OztZQWxERixVQUFVOzs7O1lBTkYsZ0JBQWdCO1lBQ2hCLGFBQWE7Ozs7Ozs7SUFPcEIsZ0RBQXNEOzs7OztJQUN0RCw2Q0FBd0I7Ozs7O0lBRVosbURBQTBDOzs7OztJQUFFLGdEQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2VsbEFyZ3MsIEV4dGVuc2lvbiwgRXh0ZW5zaW9uTmFtZSB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IEV4dGVuc2lvblV0aWxpdHkgfSBmcm9tICcuL2V4dGVuc2lvblV0aWxpdHknO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUm93TW92ZU1hbmFnZXJFeHRlbnNpb24gaW1wbGVtZW50cyBFeHRlbnNpb24ge1xyXG4gIHByaXZhdGUgX2V2ZW50SGFuZGxlcjogYW55ID0gbmV3IFNsaWNrLkV2ZW50SGFuZGxlcigpO1xyXG4gIHByaXZhdGUgX2V4dGVuc2lvbjogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4dGVuc2lvblV0aWxpdHk6IEV4dGVuc2lvblV0aWxpdHksIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSkgeyB9XHJcblxyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICAvLyB1bnN1YnNjcmliZSBhbGwgU2xpY2tHcmlkIGV2ZW50c1xyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnVuc3Vic2NyaWJlQWxsKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuX2V4dGVuc2lvbiAmJiB0aGlzLl9leHRlbnNpb24uZGVzdHJveSkge1xyXG4gICAgICB0aGlzLl9leHRlbnNpb24uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXIocm93U2VsZWN0aW9uUGx1Z2luPzogYW55KTogYW55IHtcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zKSB7XHJcbiAgICAgIC8vIGR5bmFtaWNhbGx5IGltcG9ydCB0aGUgU2xpY2tHcmlkIHBsdWdpbiB3aXRoIHJlcXVpcmVKU1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkubG9hZEV4dGVuc2lvbkR5bmFtaWNhbGx5KEV4dGVuc2lvbk5hbWUucm93TW92ZU1hbmFnZXIpO1xyXG5cclxuICAgICAgLy8gdGhpcyBhbHNvIHJlcXVpcmVzIHRoZSBSb3cgU2VsZWN0aW9uIE1vZGVsIHRvIGJlIHJlZ2lzdGVyZWQgYXMgd2VsbFxyXG4gICAgICBpZiAoIXJvd1NlbGVjdGlvblBsdWdpbiB8fCAhdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0U2VsZWN0aW9uTW9kZWwoKSkge1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5sb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoRXh0ZW5zaW9uTmFtZS5yb3dTZWxlY3Rpb24pO1xyXG4gICAgICAgIHJvd1NlbGVjdGlvblBsdWdpbiA9IG5ldyBTbGljay5Sb3dTZWxlY3Rpb25Nb2RlbCh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93U2VsZWN0aW9uT3B0aW9ucyB8fCB7fSk7XHJcbiAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0U2VsZWN0aW9uTW9kZWwocm93U2VsZWN0aW9uUGx1Z2luKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5fZXh0ZW5zaW9uID0gbmV3IFNsaWNrLlJvd01vdmVNYW5hZ2VyKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dNb3ZlTWFuYWdlciB8fCB7IGNhbmNlbEVkaXRPbkRyYWc6IHRydWUgfSk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHRoaXMuX2V4dGVuc2lvbik7XHJcblxyXG4gICAgICAvLyBob29rIGFsbCBldmVudHNcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dNb3ZlTWFuYWdlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93TW92ZU1hbmFnZXIub25FeHRlbnNpb25SZWdpc3RlcmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93TW92ZU1hbmFnZXIub25FeHRlbnNpb25SZWdpc3RlcmVkKHRoaXMuX2V4dGVuc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fZXh0ZW5zaW9uLm9uQmVmb3JlTW92ZVJvd3MsIChlOiBhbnksIGFyZ3M6IENlbGxBcmdzKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd01vdmVNYW5hZ2VyICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93TW92ZU1hbmFnZXIub25CZWZvcmVNb3ZlUm93cyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93TW92ZU1hbmFnZXIub25CZWZvcmVNb3ZlUm93cyhlLCBhcmdzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2V4dGVuc2lvbi5vbk1vdmVSb3dzLCAoZTogYW55LCBhcmdzOiBDZWxsQXJncykgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dNb3ZlTWFuYWdlciAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd01vdmVNYW5hZ2VyLm9uTW92ZVJvd3MgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd01vdmVNYW5hZ2VyLm9uTW92ZVJvd3MoZSwgYXJncyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuX2V4dGVuc2lvbjtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=