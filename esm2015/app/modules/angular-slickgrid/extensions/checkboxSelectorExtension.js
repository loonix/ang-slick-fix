/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';
export class CheckboxSelectorExtension {
    /**
     * @param {?} extensionUtility
     * @param {?} sharedService
     */
    constructor(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
    }
    /**
     * @return {?}
     */
    dispose() {
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    }
    /**
     * Create the plugin before the Grid creation, else it will behave oddly.
     * Mostly because the column definitions might change after the grid creation
     * @param {?} columnDefinitions
     * @param {?} gridOptions
     * @return {?}
     */
    create(columnDefinitions, gridOptions) {
        if (columnDefinitions && gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.checkboxSelector);
            if (!this._extension) {
                this._extension = new Slick.CheckboxSelectColumn(gridOptions.checkboxSelector || {});
            }
            /** @type {?} */
            const selectionColumn = this._extension.getColumnDefinition();
            selectionColumn.excludeFromExport = true;
            selectionColumn.excludeFromQuery = true;
            selectionColumn.excludeFromHeaderMenu = true;
            columnDefinitions.unshift(selectionColumn);
            return this._extension;
        }
        return null;
    }
    /**
     * @param {?=} rowSelectionPlugin
     * @return {?}
     */
    register(rowSelectionPlugin) {
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
                () => this._extension.selectRows(this.sharedService.gridOptions.preselectedRows)), 0);
            }
            return rowSelectionPlugin;
        }
        return null;
    }
}
CheckboxSelectorExtension.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CheckboxSelectorExtension.ctorParameters = () => [
    { type: ExtensionUtility },
    { type: SharedService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9jaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBcUIsYUFBYSxFQUFjLE1BQU0saUJBQWlCLENBQUM7QUFDL0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBTTNELE1BQU0sT0FBTyx5QkFBeUI7Ozs7O0lBR3BDLFlBQW9CLGdCQUFrQyxFQUFVLGFBQTRCO1FBQXhFLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUFJLENBQUM7Ozs7SUFFakcsT0FBTztRQUNMLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRTtZQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7Ozs7Ozs7SUFNRCxNQUFNLENBQUMsaUJBQTJCLEVBQUUsV0FBdUI7UUFDekQsSUFBSSxpQkFBaUIsSUFBSSxXQUFXLEVBQUU7WUFDcEMseURBQXlEO1lBQ3pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLElBQUksRUFBRSxDQUFDLENBQUM7YUFDdEY7O2tCQUNLLGVBQWUsR0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFO1lBQ3JFLGVBQWUsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFDekMsZUFBZSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztZQUN4QyxlQUFlLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1lBQzdDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMzQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLGtCQUF3QjtRQUMvQixJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUU7WUFDbkYsb0lBQW9JO1lBQ3BJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFeEQsc0VBQXNFO1lBQ3RFLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7Z0JBQ3ZFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzNFLGtCQUFrQixHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLG1CQUFtQixJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2FBQy9EO1lBRUQsMENBQTBDO1lBQzFDLHFIQUFxSDtZQUNySCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGVBQWUsSUFBSSxrQkFBa0IsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO2dCQUN2SCxVQUFVOzs7Z0JBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUM7YUFDakc7WUFFRCxPQUFPLGtCQUFrQixDQUFDO1NBQzNCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7WUF0REYsVUFBVTs7OztZQU5GLGdCQUFnQjtZQUNoQixhQUFhOzs7Ozs7O0lBT3BCLCtDQUF3Qjs7Ozs7SUFFWixxREFBMEM7Ozs7O0lBQUUsa0RBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb2x1bW4sIEV4dGVuc2lvbiwgRXh0ZW5zaW9uTmFtZSwgR3JpZE9wdGlvbiB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IEV4dGVuc2lvblV0aWxpdHkgfSBmcm9tICcuL2V4dGVuc2lvblV0aWxpdHknO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbiBpbXBsZW1lbnRzIEV4dGVuc2lvbiB7XHJcbiAgcHJpdmF0ZSBfZXh0ZW5zaW9uOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXh0ZW5zaW9uVXRpbGl0eTogRXh0ZW5zaW9uVXRpbGl0eSwgcHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIGlmICh0aGlzLl9leHRlbnNpb24gJiYgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3kpIHtcclxuICAgICAgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSB0aGUgcGx1Z2luIGJlZm9yZSB0aGUgR3JpZCBjcmVhdGlvbiwgZWxzZSBpdCB3aWxsIGJlaGF2ZSBvZGRseS5cclxuICAgKiBNb3N0bHkgYmVjYXVzZSB0aGUgY29sdW1uIGRlZmluaXRpb25zIG1pZ2h0IGNoYW5nZSBhZnRlciB0aGUgZ3JpZCBjcmVhdGlvblxyXG4gICAqL1xyXG4gIGNyZWF0ZShjb2x1bW5EZWZpbml0aW9uczogQ29sdW1uW10sIGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uKSB7XHJcbiAgICBpZiAoY29sdW1uRGVmaW5pdGlvbnMgJiYgZ3JpZE9wdGlvbnMpIHtcclxuICAgICAgLy8gZHluYW1pY2FsbHkgaW1wb3J0IHRoZSBTbGlja0dyaWQgcGx1Z2luIHdpdGggcmVxdWlyZUpTXHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5sb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoRXh0ZW5zaW9uTmFtZS5jaGVja2JveFNlbGVjdG9yKTtcclxuICAgICAgIGlmICghdGhpcy5fZXh0ZW5zaW9uKSB7XHJcbiAgICAgICAgdGhpcy5fZXh0ZW5zaW9uID0gbmV3IFNsaWNrLkNoZWNrYm94U2VsZWN0Q29sdW1uKGdyaWRPcHRpb25zLmNoZWNrYm94U2VsZWN0b3IgfHwge30pO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHNlbGVjdGlvbkNvbHVtbjogQ29sdW1uID0gdGhpcy5fZXh0ZW5zaW9uLmdldENvbHVtbkRlZmluaXRpb24oKTtcclxuICAgICAgc2VsZWN0aW9uQ29sdW1uLmV4Y2x1ZGVGcm9tRXhwb3J0ID0gdHJ1ZTtcclxuICAgICAgc2VsZWN0aW9uQ29sdW1uLmV4Y2x1ZGVGcm9tUXVlcnkgPSB0cnVlO1xyXG4gICAgICBzZWxlY3Rpb25Db2x1bW4uZXhjbHVkZUZyb21IZWFkZXJNZW51ID0gdHJ1ZTtcclxuICAgICAgY29sdW1uRGVmaW5pdGlvbnMudW5zaGlmdChzZWxlY3Rpb25Db2x1bW4pO1xyXG4gICAgICByZXR1cm4gdGhpcy5fZXh0ZW5zaW9uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlcihyb3dTZWxlY3Rpb25QbHVnaW4/OiBhbnkpIHtcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zKSB7XHJcbiAgICAgIC8vIHRoZSBwbHVnaW4gaGFzIHRvIGJlIGNyZWF0ZWQgQkVGT1JFIHRoZSBncmlkIChlbHNlIGl0IGJlaGF2ZXMgb2RkbHkpLCBidXQgd2UgY2FuIG9ubHkgd2F0Y2ggZ3JpZCBldmVudHMgQUZURVIgdGhlIGdyaWQgaXMgY3JlYXRlZFxyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5yZWdpc3RlclBsdWdpbih0aGlzLl9leHRlbnNpb24pO1xyXG5cclxuICAgICAgLy8gdGhpcyBhbHNvIHJlcXVpcmVzIHRoZSBSb3cgU2VsZWN0aW9uIE1vZGVsIHRvIGJlIHJlZ2lzdGVyZWQgYXMgd2VsbFxyXG4gICAgICBpZiAoIXJvd1NlbGVjdGlvblBsdWdpbiB8fCAhdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0U2VsZWN0aW9uTW9kZWwoKSkge1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5sb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoRXh0ZW5zaW9uTmFtZS5yb3dTZWxlY3Rpb24pO1xyXG4gICAgICAgIHJvd1NlbGVjdGlvblBsdWdpbiA9IG5ldyBTbGljay5Sb3dTZWxlY3Rpb25Nb2RlbCh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93U2VsZWN0aW9uT3B0aW9ucyB8fCB7fSk7XHJcbiAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0U2VsZWN0aW9uTW9kZWwocm93U2VsZWN0aW9uUGx1Z2luKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gdXNlciBtaWdodCB3YW50IHRvIHByZS1zZWxlY3Qgc29tZSByb3dzXHJcbiAgICAgIC8vIHRoZSBzZXRUaW1lb3V0IGlzIGJlY2F1c2Ugb2YgdGltaW5nIGlzc3VlIHdpdGggc3R5bGluZyAocm93IHNlbGVjdGlvbiBoYXBwZW4gYnV0IHJvd3MgYXJlbid0IGhpZ2hsaWdodGVkIHByb3Blcmx5KVxyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnByZXNlbGVjdGVkUm93cyAmJiByb3dTZWxlY3Rpb25QbHVnaW4gJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0U2VsZWN0aW9uTW9kZWwoKSkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fZXh0ZW5zaW9uLnNlbGVjdFJvd3ModGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnByZXNlbGVjdGVkUm93cyksIDApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcm93U2VsZWN0aW9uUGx1Z2luO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==