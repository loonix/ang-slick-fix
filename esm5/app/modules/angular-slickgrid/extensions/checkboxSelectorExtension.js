/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';
var CheckboxSelectorExtension = /** @class */ (function () {
    function CheckboxSelectorExtension(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
    }
    /**
     * @return {?}
     */
    CheckboxSelectorExtension.prototype.dispose = /**
     * @return {?}
     */
    function () {
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    };
    /**
     * Create the plugin before the Grid creation, else it will behave oddly.
     * Mostly because the column definitions might change after the grid creation
     */
    /**
     * Create the plugin before the Grid creation, else it will behave oddly.
     * Mostly because the column definitions might change after the grid creation
     * @param {?} columnDefinitions
     * @param {?} gridOptions
     * @return {?}
     */
    CheckboxSelectorExtension.prototype.create = /**
     * Create the plugin before the Grid creation, else it will behave oddly.
     * Mostly because the column definitions might change after the grid creation
     * @param {?} columnDefinitions
     * @param {?} gridOptions
     * @return {?}
     */
    function (columnDefinitions, gridOptions) {
        if (columnDefinitions && gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.checkboxSelector);
            if (!this._extension) {
                this._extension = new Slick.CheckboxSelectColumn(gridOptions.checkboxSelector || {});
            }
            /** @type {?} */
            var selectionColumn = this._extension.getColumnDefinition();
            selectionColumn.excludeFromExport = true;
            selectionColumn.excludeFromQuery = true;
            selectionColumn.excludeFromHeaderMenu = true;
            columnDefinitions.unshift(selectionColumn);
            return this._extension;
        }
        return null;
    };
    /**
     * @param {?=} rowSelectionPlugin
     * @return {?}
     */
    CheckboxSelectorExtension.prototype.register = /**
     * @param {?=} rowSelectionPlugin
     * @return {?}
     */
    function (rowSelectionPlugin) {
        var _this = this;
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // the plugin has to be created BEFORE the grid (else it behaves oddly), but we can only watch grid events AFTER the grid is created
            this.sharedService.grid.registerPlugin(this._extension);
            // this also requires the Row Selection Model to be registered as well
            if (!rowSelectionPlugin || !this.sharedService.grid.getSelectionModel()) {
                this.extensionUtility.loadExtensionDynamically(ExtensionName.rowSelection);
                rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || {});
                this.sharedService.grid.setSelectionModel(rowSelectionPlugin);
            }
            // user might want to pre-select some rows
            // the setTimeout is because of timing issue with styling (row selection happen but rows aren't highlighted properly)
            if (this.sharedService.gridOptions.preselectedRows && rowSelectionPlugin && this.sharedService.grid.getSelectionModel()) {
                setTimeout((/**
                 * @return {?}
                 */
                function () { return _this._extension.selectRows(_this.sharedService.gridOptions.preselectedRows); }), 0);
            }
            return rowSelectionPlugin;
        }
        return null;
    };
    CheckboxSelectorExtension.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CheckboxSelectorExtension.ctorParameters = function () { return [
        { type: ExtensionUtility },
        { type: SharedService }
    ]; };
    return CheckboxSelectorExtension;
}());
export { CheckboxSelectorExtension };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CheckboxSelectorExtension.prototype._extension;
    /**
     * @type {?}
     * @private
     */
    CheckboxSelectorExtension.prototype.extensionUtility;
    /**
     * @type {?}
     * @private
     */
    CheckboxSelectorExtension.prototype.sharedService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9jaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBcUIsYUFBYSxFQUFjLE1BQU0saUJBQWlCLENBQUM7QUFDL0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSzNEO0lBSUUsbUNBQW9CLGdCQUFrQyxFQUFVLGFBQTRCO1FBQXhFLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUFJLENBQUM7Ozs7SUFFakcsMkNBQU87OztJQUFQO1FBQ0UsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7OztJQUNILDBDQUFNOzs7Ozs7O0lBQU4sVUFBTyxpQkFBMkIsRUFBRSxXQUF1QjtRQUN6RCxJQUFJLGlCQUFpQixJQUFJLFdBQVcsRUFBRTtZQUNwQyx5REFBeUQ7WUFDekQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzlFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUN0Rjs7Z0JBQ0ssZUFBZSxHQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUU7WUFDckUsZUFBZSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztZQUN6QyxlQUFlLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1lBQ3hDLGVBQWUsQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7WUFDN0MsaUJBQWlCLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN4QjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFFRCw0Q0FBUTs7OztJQUFSLFVBQVMsa0JBQXdCO1FBQWpDLGlCQXFCQztRQXBCQyxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUU7WUFDbkYsb0lBQW9JO1lBQ3BJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFeEQsc0VBQXNFO1lBQ3RFLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7Z0JBQ3ZFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzNFLGtCQUFrQixHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLG1CQUFtQixJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2FBQy9EO1lBRUQsMENBQTBDO1lBQzFDLHFIQUFxSDtZQUNySCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGVBQWUsSUFBSSxrQkFBa0IsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO2dCQUN2SCxVQUFVOzs7Z0JBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxFQUExRSxDQUEwRSxHQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2pHO1lBRUQsT0FBTyxrQkFBa0IsQ0FBQztTQUMzQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Z0JBdERGLFVBQVU7Ozs7Z0JBTkYsZ0JBQWdCO2dCQUNoQixhQUFhOztJQTREdEIsZ0NBQUM7Q0FBQSxBQXZERCxJQXVEQztTQXREWSx5QkFBeUI7Ozs7OztJQUNwQywrQ0FBd0I7Ozs7O0lBRVoscURBQTBDOzs7OztJQUFFLGtEQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29sdW1uLCBFeHRlbnNpb24sIEV4dGVuc2lvbk5hbWUsIEdyaWRPcHRpb24gfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBFeHRlbnNpb25VdGlsaXR5IH0gZnJvbSAnLi9leHRlbnNpb25VdGlsaXR5JztcclxuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlJztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24gaW1wbGVtZW50cyBFeHRlbnNpb24ge1xyXG4gIHByaXZhdGUgX2V4dGVuc2lvbjogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4dGVuc2lvblV0aWxpdHk6IEV4dGVuc2lvblV0aWxpdHksIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSkgeyB9XHJcblxyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICBpZiAodGhpcy5fZXh0ZW5zaW9uICYmIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KSB7XHJcbiAgICAgIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdGhlIHBsdWdpbiBiZWZvcmUgdGhlIEdyaWQgY3JlYXRpb24sIGVsc2UgaXQgd2lsbCBiZWhhdmUgb2RkbHkuXHJcbiAgICogTW9zdGx5IGJlY2F1c2UgdGhlIGNvbHVtbiBkZWZpbml0aW9ucyBtaWdodCBjaGFuZ2UgYWZ0ZXIgdGhlIGdyaWQgY3JlYXRpb25cclxuICAgKi9cclxuICBjcmVhdGUoY29sdW1uRGVmaW5pdGlvbnM6IENvbHVtbltdLCBncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgaWYgKGNvbHVtbkRlZmluaXRpb25zICYmIGdyaWRPcHRpb25zKSB7XHJcbiAgICAgIC8vIGR5bmFtaWNhbGx5IGltcG9ydCB0aGUgU2xpY2tHcmlkIHBsdWdpbiB3aXRoIHJlcXVpcmVKU1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkubG9hZEV4dGVuc2lvbkR5bmFtaWNhbGx5KEV4dGVuc2lvbk5hbWUuY2hlY2tib3hTZWxlY3Rvcik7XHJcbiAgICAgICBpZiAoIXRoaXMuX2V4dGVuc2lvbikge1xyXG4gICAgICAgIHRoaXMuX2V4dGVuc2lvbiA9IG5ldyBTbGljay5DaGVja2JveFNlbGVjdENvbHVtbihncmlkT3B0aW9ucy5jaGVja2JveFNlbGVjdG9yIHx8IHt9KTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBzZWxlY3Rpb25Db2x1bW46IENvbHVtbiA9IHRoaXMuX2V4dGVuc2lvbi5nZXRDb2x1bW5EZWZpbml0aW9uKCk7XHJcbiAgICAgIHNlbGVjdGlvbkNvbHVtbi5leGNsdWRlRnJvbUV4cG9ydCA9IHRydWU7XHJcbiAgICAgIHNlbGVjdGlvbkNvbHVtbi5leGNsdWRlRnJvbVF1ZXJ5ID0gdHJ1ZTtcclxuICAgICAgc2VsZWN0aW9uQ29sdW1uLmV4Y2x1ZGVGcm9tSGVhZGVyTWVudSA9IHRydWU7XHJcbiAgICAgIGNvbHVtbkRlZmluaXRpb25zLnVuc2hpZnQoc2VsZWN0aW9uQ29sdW1uKTtcclxuICAgICAgcmV0dXJuIHRoaXMuX2V4dGVuc2lvbjtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXIocm93U2VsZWN0aW9uUGx1Z2luPzogYW55KSB7XHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucykge1xyXG4gICAgICAvLyB0aGUgcGx1Z2luIGhhcyB0byBiZSBjcmVhdGVkIEJFRk9SRSB0aGUgZ3JpZCAoZWxzZSBpdCBiZWhhdmVzIG9kZGx5KSwgYnV0IHdlIGNhbiBvbmx5IHdhdGNoIGdyaWQgZXZlbnRzIEFGVEVSIHRoZSBncmlkIGlzIGNyZWF0ZWRcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQucmVnaXN0ZXJQbHVnaW4odGhpcy5fZXh0ZW5zaW9uKTtcclxuXHJcbiAgICAgIC8vIHRoaXMgYWxzbyByZXF1aXJlcyB0aGUgUm93IFNlbGVjdGlvbiBNb2RlbCB0byBiZSByZWdpc3RlcmVkIGFzIHdlbGxcclxuICAgICAgaWYgKCFyb3dTZWxlY3Rpb25QbHVnaW4gfHwgIXRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldFNlbGVjdGlvbk1vZGVsKCkpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkubG9hZEV4dGVuc2lvbkR5bmFtaWNhbGx5KEV4dGVuc2lvbk5hbWUucm93U2VsZWN0aW9uKTtcclxuICAgICAgICByb3dTZWxlY3Rpb25QbHVnaW4gPSBuZXcgU2xpY2suUm93U2VsZWN0aW9uTW9kZWwodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd1NlbGVjdGlvbk9wdGlvbnMgfHwge30pO1xyXG4gICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldFNlbGVjdGlvbk1vZGVsKHJvd1NlbGVjdGlvblBsdWdpbik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHVzZXIgbWlnaHQgd2FudCB0byBwcmUtc2VsZWN0IHNvbWUgcm93c1xyXG4gICAgICAvLyB0aGUgc2V0VGltZW91dCBpcyBiZWNhdXNlIG9mIHRpbWluZyBpc3N1ZSB3aXRoIHN0eWxpbmcgKHJvdyBzZWxlY3Rpb24gaGFwcGVuIGJ1dCByb3dzIGFyZW4ndCBoaWdobGlnaHRlZCBwcm9wZXJseSlcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5wcmVzZWxlY3RlZFJvd3MgJiYgcm93U2VsZWN0aW9uUGx1Z2luICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldFNlbGVjdGlvbk1vZGVsKCkpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX2V4dGVuc2lvbi5zZWxlY3RSb3dzKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5wcmVzZWxlY3RlZFJvd3MpLCAwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHJvd1NlbGVjdGlvblBsdWdpbjtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=