/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';
var ColumnPickerExtension = /** @class */ (function () {
    function ColumnPickerExtension(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
        this._eventHandler = new Slick.EventHandler();
    }
    /**
     * @return {?}
     */
    ColumnPickerExtension.prototype.dispose = /**
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
     * @return {?}
     */
    ColumnPickerExtension.prototype.register = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.columnPicker);
            // localization support for the picker
            /** @type {?} */
            var columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'columnPicker');
            /** @type {?} */
            var forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'columnPicker');
            /** @type {?} */
            var syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'columnPicker');
            this.sharedService.gridOptions.columnPicker = this.sharedService.gridOptions.columnPicker || {};
            this.sharedService.gridOptions.columnPicker.columnTitle = this.sharedService.gridOptions.columnPicker.columnTitle || columnTitle;
            this.sharedService.gridOptions.columnPicker.forceFitTitle = this.sharedService.gridOptions.columnPicker.forceFitTitle || forceFitTitle;
            this.sharedService.gridOptions.columnPicker.syncResizeTitle = this.sharedService.gridOptions.columnPicker.syncResizeTitle || syncResizeTitle;
            this._extension = new Slick.Controls.ColumnPicker(this.sharedService.columnDefinitions, this.sharedService.grid, this.sharedService.gridOptions);
            if (this.sharedService.grid && this.sharedService.gridOptions.enableColumnPicker) {
                this._eventHandler.subscribe(this._extension.onColumnsChanged, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                function (e, args) {
                    if (_this.sharedService.gridOptions.columnPicker && typeof _this.sharedService.gridOptions.columnPicker.onColumnsChanged === 'function') {
                        _this.sharedService.gridOptions.columnPicker.onColumnsChanged(e, args);
                    }
                }));
            }
            return this._extension;
        }
    };
    /** Translate the Column Picker and it's last 2 checkboxes */
    /**
     * Translate the Column Picker and it's last 2 checkboxes
     * @return {?}
     */
    ColumnPickerExtension.prototype.translateColumnPicker = /**
     * Translate the Column Picker and it's last 2 checkboxes
     * @return {?}
     */
    function () {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // update the properties by pointers, that is the only way to get Grid Menu Control to see the new values
            if (this.sharedService.gridOptions.columnPicker) {
                this.emptyColumnPickerTitles();
                this.sharedService.gridOptions.columnPicker.columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'columnPicker');
                this.sharedService.gridOptions.columnPicker.forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'columnPicker');
                this.sharedService.gridOptions.columnPicker.syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'columnPicker');
            }
            // translate all columns (including non-visible)
            this.extensionUtility.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
            // re-initialize the Column Picker, that will recreate all the list
            // doing an "init()" won't drop any existing command attached
            if (this._extension.init) {
                this._extension.init(this.sharedService.grid);
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    ColumnPickerExtension.prototype.emptyColumnPickerTitles = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.columnPicker) {
            this.sharedService.gridOptions.columnPicker.columnTitle = '';
            this.sharedService.gridOptions.columnPicker.forceFitTitle = '';
            this.sharedService.gridOptions.columnPicker.syncResizeTitle = '';
        }
    };
    ColumnPickerExtension.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ColumnPickerExtension.ctorParameters = function () { return [
        { type: ExtensionUtility },
        { type: SharedService }
    ]; };
    return ColumnPickerExtension;
}());
export { ColumnPickerExtension };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ColumnPickerExtension.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    ColumnPickerExtension.prototype._extension;
    /**
     * @type {?}
     * @private
     */
    ColumnPickerExtension.prototype.extensionUtility;
    /**
     * @type {?}
     * @private
     */
    ColumnPickerExtension.prototype.sharedService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uUGlja2VyRXh0ZW5zaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9leHRlbnNpb25zL2NvbHVtblBpY2tlckV4dGVuc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQXVCLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUszRDtJQUtFLCtCQUNVLGdCQUFrQyxFQUNsQyxhQUE0QjtRQUQ1QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBTDlCLGtCQUFhLEdBQVEsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7SUFNbEQsQ0FBQzs7OztJQUVMLHVDQUFPOzs7SUFBUDtRQUNFLG1DQUFtQztRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3BDLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRTtZQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7OztJQUVELHdDQUFROzs7SUFBUjtRQUFBLGlCQXdCQztRQXZCQyxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUU7WUFDbkYseURBQXlEO1lBQ3pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsWUFB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ZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQywwQkFBMEIsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLENBQUMsQ0FBQzthQUNuSjtZQUVELGdEQUFnRDtZQUNoRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUV6RixtRUFBbUU7WUFDbkUsNkRBQTZEO1lBQzdELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDL0M7U0FDRjtJQUNILENBQUM7Ozs7O0lBRU8sdURBQXVCOzs7O0lBQS9CO1FBQ0UsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRTtZQUN2RyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUM3RCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztZQUMvRCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztTQUNsRTtJQUNILENBQUM7O2dCQXhFRixVQUFVOzs7O2dCQU5GLGdCQUFnQjtnQkFDaEIsYUFBYTs7SUE4RXRCLDRCQUFDO0NBQUEsQUF6RUQsSUF5RUM7U0F4RVkscUJBQXFCOzs7Ozs7SUFDaEMsOENBQXNEOzs7OztJQUN0RCwyQ0FBd0I7Ozs7O0lBR3RCLGlEQUEwQzs7Ozs7SUFDMUMsOENBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDZWxsQXJncywgRXh0ZW5zaW9uLCBFeHRlbnNpb25OYW1lIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgRXh0ZW5zaW9uVXRpbGl0eSB9IGZyb20gJy4vZXh0ZW5zaW9uVXRpbGl0eSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb2x1bW5QaWNrZXJFeHRlbnNpb24gaW1wbGVtZW50cyBFeHRlbnNpb24ge1xyXG4gIHByaXZhdGUgX2V2ZW50SGFuZGxlcjogYW55ID0gbmV3IFNsaWNrLkV2ZW50SGFuZGxlcigpO1xyXG4gIHByaXZhdGUgX2V4dGVuc2lvbjogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZXh0ZW5zaW9uVXRpbGl0eTogRXh0ZW5zaW9uVXRpbGl0eSxcclxuICAgIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSxcclxuICApIHsgfVxyXG5cclxuICBkaXNwb3NlKCkge1xyXG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIFNsaWNrR3JpZCBldmVudHNcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCgpO1xyXG4gICAgaWYgKHRoaXMuX2V4dGVuc2lvbiAmJiB0aGlzLl9leHRlbnNpb24uZGVzdHJveSkge1xyXG4gICAgICB0aGlzLl9leHRlbnNpb24uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXIoKTogYW55IHtcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zKSB7XHJcbiAgICAgIC8vIGR5bmFtaWNhbGx5IGltcG9ydCB0aGUgU2xpY2tHcmlkIHBsdWdpbiB3aXRoIHJlcXVpcmVKU1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkubG9hZEV4dGVuc2lvbkR5bmFtaWNhbGx5KEV4dGVuc2lvbk5hbWUuY29sdW1uUGlja2VyKTtcclxuICAgICAgLy8gbG9jYWxpemF0aW9uIHN1cHBvcnQgZm9yIHRoZSBwaWNrZXJcclxuICAgICAgY29uc3QgY29sdW1uVGl0bGUgPSB0aGlzLmV4dGVuc2lvblV0aWxpdHkuZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcoJ2NvbHVtblRpdGxlJywgJ2NvbHVtblBpY2tlcicpO1xyXG4gICAgICBjb25zdCBmb3JjZUZpdFRpdGxlID0gdGhpcy5leHRlbnNpb25VdGlsaXR5LmdldFBpY2tlclRpdGxlT3V0cHV0U3RyaW5nKCdmb3JjZUZpdFRpdGxlJywgJ2NvbHVtblBpY2tlcicpO1xyXG4gICAgICBjb25zdCBzeW5jUmVzaXplVGl0bGUgPSB0aGlzLmV4dGVuc2lvblV0aWxpdHkuZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcoJ3N5bmNSZXNpemVUaXRsZScsICdjb2x1bW5QaWNrZXInKTtcclxuXHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5jb2x1bW5QaWNrZXIgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyIHx8IHt9O1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyLmNvbHVtblRpdGxlID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlci5jb2x1bW5UaXRsZSB8fCBjb2x1bW5UaXRsZTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlci5mb3JjZUZpdFRpdGxlID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlci5mb3JjZUZpdFRpdGxlIHx8IGZvcmNlRml0VGl0bGU7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5jb2x1bW5QaWNrZXIuc3luY1Jlc2l6ZVRpdGxlID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlci5zeW5jUmVzaXplVGl0bGUgfHwgc3luY1Jlc2l6ZVRpdGxlO1xyXG4gICAgICB0aGlzLl9leHRlbnNpb24gPSBuZXcgU2xpY2suQ29udHJvbHMuQ29sdW1uUGlja2VyKHRoaXMuc2hhcmVkU2VydmljZS5jb2x1bW5EZWZpbml0aW9ucywgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQsIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyk7XHJcblxyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUNvbHVtblBpY2tlcikge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fZXh0ZW5zaW9uLm9uQ29sdW1uc0NoYW5nZWQsIChlOiBhbnksIGFyZ3M6IENlbGxBcmdzKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlciAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlci5vbkNvbHVtbnNDaGFuZ2VkID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5jb2x1bW5QaWNrZXIub25Db2x1bW5zQ2hhbmdlZChlLCBhcmdzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy5fZXh0ZW5zaW9uO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRyYW5zbGF0ZSB0aGUgQ29sdW1uIFBpY2tlciBhbmQgaXQncyBsYXN0IDIgY2hlY2tib3hlcyAqL1xyXG4gIHRyYW5zbGF0ZUNvbHVtblBpY2tlcigpIHtcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zKSB7XHJcbiAgICAgIC8vIHVwZGF0ZSB0aGUgcHJvcGVydGllcyBieSBwb2ludGVycywgdGhhdCBpcyB0aGUgb25seSB3YXkgdG8gZ2V0IEdyaWQgTWVudSBDb250cm9sIHRvIHNlZSB0aGUgbmV3IHZhbHVlc1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlcikge1xyXG4gICAgICAgIHRoaXMuZW1wdHlDb2x1bW5QaWNrZXJUaXRsZXMoKTtcclxuICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyLmNvbHVtblRpdGxlID0gdGhpcy5leHRlbnNpb25VdGlsaXR5LmdldFBpY2tlclRpdGxlT3V0cHV0U3RyaW5nKCdjb2x1bW5UaXRsZScsICdjb2x1bW5QaWNrZXInKTtcclxuICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyLmZvcmNlRml0VGl0bGUgPSB0aGlzLmV4dGVuc2lvblV0aWxpdHkuZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcoJ2ZvcmNlRml0VGl0bGUnLCAnY29sdW1uUGlja2VyJyk7XHJcbiAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlci5zeW5jUmVzaXplVGl0bGUgPSB0aGlzLmV4dGVuc2lvblV0aWxpdHkuZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcoJ3N5bmNSZXNpemVUaXRsZScsICdjb2x1bW5QaWNrZXInKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gdHJhbnNsYXRlIGFsbCBjb2x1bW5zIChpbmNsdWRpbmcgbm9uLXZpc2libGUpXHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS50cmFuc2xhdGVJdGVtcyh0aGlzLnNoYXJlZFNlcnZpY2UuYWxsQ29sdW1ucywgJ2hlYWRlcktleScsICduYW1lJyk7XHJcblxyXG4gICAgICAvLyByZS1pbml0aWFsaXplIHRoZSBDb2x1bW4gUGlja2VyLCB0aGF0IHdpbGwgcmVjcmVhdGUgYWxsIHRoZSBsaXN0XHJcbiAgICAgIC8vIGRvaW5nIGFuIFwiaW5pdCgpXCIgd29uJ3QgZHJvcCBhbnkgZXhpc3RpbmcgY29tbWFuZCBhdHRhY2hlZFxyXG4gICAgICBpZiAodGhpcy5fZXh0ZW5zaW9uLmluaXQpIHtcclxuICAgICAgICB0aGlzLl9leHRlbnNpb24uaW5pdCh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZW1wdHlDb2x1bW5QaWNrZXJUaXRsZXMoKSB7XHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyKSB7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5jb2x1bW5QaWNrZXIuY29sdW1uVGl0bGUgPSAnJztcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlci5mb3JjZUZpdFRpdGxlID0gJyc7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5jb2x1bW5QaWNrZXIuc3luY1Jlc2l6ZVRpdGxlID0gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==