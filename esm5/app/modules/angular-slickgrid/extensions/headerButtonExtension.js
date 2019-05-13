/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';
var HeaderButtonExtension = /** @class */ (function () {
    function HeaderButtonExtension(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
        this._eventHandler = new Slick.EventHandler();
    }
    /**
     * @return {?}
     */
    HeaderButtonExtension.prototype.dispose = /**
     * @return {?}
     */
    function () {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    };
    // Header Button Plugin
    // Header Button Plugin
    /**
     * @return {?}
     */
    HeaderButtonExtension.prototype.register = 
    // Header Button Plugin
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.headerButton);
            this._extension = new Slick.Plugins.HeaderButtons(this.sharedService.gridOptions.headerButton || {});
            this.sharedService.grid.registerPlugin(this._extension);
            // hook all events
            if (this.sharedService.grid && this.sharedService.gridOptions.headerButton) {
                if (this.sharedService.gridOptions.headerButton.onExtensionRegistered) {
                    this.sharedService.gridOptions.headerButton.onExtensionRegistered(this._extension);
                }
                this._eventHandler.subscribe(this._extension.onCommand, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                function (e, args) {
                    if (_this.sharedService.gridOptions.headerButton && typeof _this.sharedService.gridOptions.headerButton.onCommand === 'function') {
                        _this.sharedService.gridOptions.headerButton.onCommand(e, args);
                    }
                }));
            }
            return this._extension;
        }
        return null;
    };
    HeaderButtonExtension.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    HeaderButtonExtension.ctorParameters = function () { return [
        { type: ExtensionUtility },
        { type: SharedService }
    ]; };
    return HeaderButtonExtension;
}());
export { HeaderButtonExtension };
if (false) {
    /**
     * @type {?}
     * @private
     */
    HeaderButtonExtension.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    HeaderButtonExtension.prototype._extension;
    /**
     * @type {?}
     * @private
     */
    HeaderButtonExtension.prototype.extensionUtility;
    /**
     * @type {?}
     * @private
     */
    HeaderButtonExtension.prototype.sharedService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyQnV0dG9uRXh0ZW5zaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9leHRlbnNpb25zL2hlYWRlckJ1dHRvbkV4dGVuc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWEsYUFBYSxFQUE2QixNQUFNLGlCQUFpQixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUszRDtJQUtFLCtCQUFvQixnQkFBa0MsRUFBVSxhQUE0QjtRQUF4RSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFIcEYsa0JBQWEsR0FBUSxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUcwQyxDQUFDOzs7O0lBRWpHLHVDQUFPOzs7SUFBUDtRQUNFLG1DQUFtQztRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXBDLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRTtZQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVELHVCQUF1Qjs7Ozs7SUFDdkIsd0NBQVE7Ozs7O0lBQVI7UUFBQSxpQkFxQkM7UUFwQkMsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFO1lBQ25GLHlEQUF5RDtZQUN6RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLENBQUM7WUFDckcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUV4RCxrQkFBa0I7WUFDbEIsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUU7Z0JBQzFFLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLHFCQUFxQixFQUFFO29CQUNyRSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUNwRjtnQkFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVM7Ozs7O2dCQUFFLFVBQUMsQ0FBTSxFQUFFLElBQStCO29CQUM5RixJQUFJLEtBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLFlBQVksSUFBSSxPQUFPLEtBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxTQUFTLEtBQUssVUFBVSxFQUFFO3dCQUM5SCxLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDaEU7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7YUFDSjtZQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN4QjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Z0JBdENGLFVBQVU7Ozs7Z0JBTkYsZ0JBQWdCO2dCQUNoQixhQUFhOztJQTRDdEIsNEJBQUM7Q0FBQSxBQXZDRCxJQXVDQztTQXRDWSxxQkFBcUI7Ozs7OztJQUNoQyw4Q0FBc0Q7Ozs7O0lBQ3RELDJDQUF3Qjs7Ozs7SUFFWixpREFBMEM7Ozs7O0lBQUUsOENBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFeHRlbnNpb24sIEV4dGVuc2lvbk5hbWUsIEhlYWRlckJ1dHRvbk9uQ29tbWFuZEFyZ3MgfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBFeHRlbnNpb25VdGlsaXR5IH0gZnJvbSAnLi9leHRlbnNpb25VdGlsaXR5JztcclxuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlJztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEhlYWRlckJ1dHRvbkV4dGVuc2lvbiBpbXBsZW1lbnRzIEV4dGVuc2lvbiB7XHJcbiAgcHJpdmF0ZSBfZXZlbnRIYW5kbGVyOiBhbnkgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XHJcbiAgcHJpdmF0ZSBfZXh0ZW5zaW9uOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXh0ZW5zaW9uVXRpbGl0eTogRXh0ZW5zaW9uVXRpbGl0eSwgcHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCBTbGlja0dyaWQgZXZlbnRzXHJcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcclxuXHJcbiAgICBpZiAodGhpcy5fZXh0ZW5zaW9uICYmIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KSB7XHJcbiAgICAgIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBIZWFkZXIgQnV0dG9uIFBsdWdpblxyXG4gIHJlZ2lzdGVyKCk6IGFueSB7XHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucykge1xyXG4gICAgICAvLyBkeW5hbWljYWxseSBpbXBvcnQgdGhlIFNsaWNrR3JpZCBwbHVnaW4gd2l0aCByZXF1aXJlSlNcclxuICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LmxvYWRFeHRlbnNpb25EeW5hbWljYWxseShFeHRlbnNpb25OYW1lLmhlYWRlckJ1dHRvbik7XHJcbiAgICAgIHRoaXMuX2V4dGVuc2lvbiA9IG5ldyBTbGljay5QbHVnaW5zLkhlYWRlckJ1dHRvbnModGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlckJ1dHRvbiB8fCB7fSk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHRoaXMuX2V4dGVuc2lvbik7XHJcblxyXG4gICAgICAvLyBob29rIGFsbCBldmVudHNcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJCdXR0b24pIHtcclxuICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlckJ1dHRvbi5vbkV4dGVuc2lvblJlZ2lzdGVyZWQpIHtcclxuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJCdXR0b24ub25FeHRlbnNpb25SZWdpc3RlcmVkKHRoaXMuX2V4dGVuc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fZXh0ZW5zaW9uLm9uQ29tbWFuZCwgKGU6IGFueSwgYXJnczogSGVhZGVyQnV0dG9uT25Db21tYW5kQXJncykgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJCdXR0b24gJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJCdXR0b24ub25Db21tYW5kID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJCdXR0b24ub25Db21tYW5kKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzLl9leHRlbnNpb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuIl19