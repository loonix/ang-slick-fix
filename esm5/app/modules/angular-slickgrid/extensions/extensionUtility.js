/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import { ExtensionName } from '../models/index';
import { SharedService } from '../services/shared.service';
var ExtensionUtility = /** @class */ (function () {
    function ExtensionUtility(sharedService, translate) {
        this.sharedService = sharedService;
        this.translate = translate;
    }
    /**
     * Remove a column from the grid by it's index in the grid
     * @param array input
     * @param index
     */
    /**
     * Remove a column from the grid by it's index in the grid
     * @param {?} array input
     * @param {?} index
     * @return {?}
     */
    ExtensionUtility.prototype.arrayRemoveItemByIndex = /**
     * Remove a column from the grid by it's index in the grid
     * @param {?} array input
     * @param {?} index
     * @return {?}
     */
    function (array, index) {
        return array.filter((/**
         * @param {?} el
         * @param {?} i
         * @return {?}
         */
        function (el, i) {
            return index !== i;
        }));
    };
    /**
     * Load SlickGrid Extension (Control/Plugin) dynamically (on demand)
     * This will basically only load the extension when user enables the feature
     * @param extensionName
     */
    /**
     * Load SlickGrid Extension (Control/Plugin) dynamically (on demand)
     * This will basically only load the extension when user enables the feature
     * @param {?} extensionName
     * @return {?}
     */
    ExtensionUtility.prototype.loadExtensionDynamically = /**
     * Load SlickGrid Extension (Control/Plugin) dynamically (on demand)
     * This will basically only load the extension when user enables the feature
     * @param {?} extensionName
     * @return {?}
     */
    function (extensionName) {
        try {
            switch (extensionName) {
                case ExtensionName.autoTooltip:
                    require('slickgrid/plugins/slick.autotooltips');
                    break;
                case ExtensionName.cellExternalCopyManager:
                    require('slickgrid/plugins/slick.cellexternalcopymanager');
                    break;
                case ExtensionName.checkboxSelector:
                    require('slickgrid/plugins/slick.checkboxselectcolumn');
                    break;
                case ExtensionName.columnPicker:
                    require('slickgrid/controls/slick.columnpicker');
                    break;
                case ExtensionName.draggableGrouping:
                    require('slickgrid/plugins/slick.draggablegrouping.js');
                    break;
                case ExtensionName.gridMenu:
                    require('slickgrid/controls/slick.gridmenu');
                    break;
                case ExtensionName.groupItemMetaProvider:
                    require('slickgrid/slick.groupitemmetadataprovider');
                    break;
                case ExtensionName.headerButton:
                    require('slickgrid/plugins/slick.headerbuttons');
                    break;
                case ExtensionName.headerMenu:
                    require('slickgrid/plugins/slick.headermenu');
                    break;
                case ExtensionName.rowSelection:
                    require('slickgrid/plugins/slick.rowselectionmodel');
                    break;
                case ExtensionName.rowDetailView:
                    require('slickgrid/plugins/slick.rowdetailview.js');
                    break;
                case ExtensionName.rowMoveManager:
                    require('slickgrid/plugins/slick.rowmovemanager.js');
                    break;
            }
        }
        catch (e) {
            // do nothing, we fall here when using Angular and RequireJS
        }
    };
    /**
     * From a Grid Menu object property name, we will return the correct title output string following this order
     * 1- if user provided a title, use it as the output title
     * 2- else if user provided a title key, use it to translate the output title
     * 3- else if nothing is provided use
     */
    /**
     * From a Grid Menu object property name, we will return the correct title output string following this order
     * 1- if user provided a title, use it as the output title
     * 2- else if user provided a title key, use it to translate the output title
     * 3- else if nothing is provided use
     * @param {?} propName
     * @param {?} pickerName
     * @return {?}
     */
    ExtensionUtility.prototype.getPickerTitleOutputString = /**
     * From a Grid Menu object property name, we will return the correct title output string following this order
     * 1- if user provided a title, use it as the output title
     * 2- else if user provided a title key, use it to translate the output title
     * 3- else if nothing is provided use
     * @param {?} propName
     * @param {?} pickerName
     * @return {?}
     */
    function (propName, pickerName) {
        /** @type {?} */
        var output = '';
        /** @type {?} */
        var picker = this.sharedService.gridOptions && this.sharedService.gridOptions[pickerName] || {};
        /** @type {?} */
        var enableTranslate = this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate || false;
        /** @type {?} */
        var title = picker && picker[propName];
        /** @type {?} */
        var titleKey = picker && picker[propName + "Key"];
        if (titleKey) {
            output = this.translate.instant(titleKey || ' ');
        }
        else {
            switch (propName) {
                case 'customTitle':
                    output = title || (enableTranslate ? this.translate.instant('COMMANDS') : Constants.TEXT_COMMANDS);
                    break;
                case 'columnTitle':
                    output = title || (enableTranslate ? this.translate.instant('COLUMNS') : Constants.TEXT_COLUMNS);
                    break;
                case 'forceFitTitle':
                    output = title || (enableTranslate ? this.translate.instant('FORCE_FIT_COLUMNS') : Constants.TEXT_FORCE_FIT_COLUMNS);
                    break;
                case 'syncResizeTitle':
                    output = title || (enableTranslate ? this.translate.instant('SYNCHRONOUS_RESIZE') : Constants.TEXT_SYNCHRONOUS_RESIZE);
                    break;
                default:
                    output = title;
                    break;
            }
        }
        return output;
    };
    /**
     * Sort items in an array by a property name
     * @params items array
     * @param property name to sort with
     * @return sorted array
     */
    /**
     * Sort items in an array by a property name
     * \@params items array
     * @param {?} items
     * @param {?} propertyName
     * @return {?} sorted array
     */
    ExtensionUtility.prototype.sortItems = /**
     * Sort items in an array by a property name
     * \@params items array
     * @param {?} items
     * @param {?} propertyName
     * @return {?} sorted array
     */
    function (items, propertyName) {
        // sort the custom items by their position in the list
        items.sort((/**
         * @param {?} itemA
         * @param {?} itemB
         * @return {?}
         */
        function (itemA, itemB) {
            if (itemA && itemB && itemA.hasOwnProperty(propertyName) && itemB.hasOwnProperty(propertyName)) {
                return itemA[propertyName] - itemB[propertyName];
            }
            return 0;
        }));
    };
    /** Translate the an array of items from an input key and assign to the output key */
    /**
     * Translate the an array of items from an input key and assign to the output key
     * @param {?} items
     * @param {?} inputKey
     * @param {?} outputKey
     * @return {?}
     */
    ExtensionUtility.prototype.translateItems = /**
     * Translate the an array of items from an input key and assign to the output key
     * @param {?} items
     * @param {?} inputKey
     * @param {?} outputKey
     * @return {?}
     */
    function (items, inputKey, outputKey) {
        var e_1, _a;
        try {
            for (var items_1 = tslib_1.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var item = items_1_1.value;
                if (item[inputKey]) {
                    item[outputKey] = this.translate.instant(item[inputKey]);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    ExtensionUtility.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ExtensionUtility.ctorParameters = function () { return [
        { type: SharedService },
        { type: TranslateService }
    ]; };
    return ExtensionUtility;
}());
export { ExtensionUtility };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ExtensionUtility.prototype.sharedService;
    /**
     * @type {?}
     * @private
     */
    ExtensionUtility.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uVXRpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9leHRlbnNpb25VdGlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFJM0Q7SUFFRSwwQkFBb0IsYUFBNEIsRUFBVSxTQUEyQjtRQUFqRSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQUksQ0FBQztJQUUxRjs7OztPQUlHOzs7Ozs7O0lBQ0gsaURBQXNCOzs7Ozs7SUFBdEIsVUFBdUIsS0FBWSxFQUFFLEtBQWE7UUFDaEQsT0FBTyxLQUFLLENBQUMsTUFBTTs7Ozs7UUFBQyxVQUFDLEVBQU8sRUFBRSxDQUFTO1lBQ3JDLE9BQU8sS0FBSyxLQUFLLENBQUMsQ0FBQztRQUNyQixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsbURBQXdCOzs7Ozs7SUFBeEIsVUFBeUIsYUFBNEI7UUFDbkQsSUFBSTtZQUNGLFFBQVEsYUFBYSxFQUFFO2dCQUNyQixLQUFLLGFBQWEsQ0FBQyxXQUFXO29CQUM1QixPQUFPLENBQUMsc0NBQXNDLENBQUMsQ0FBQztvQkFDaEQsTUFBTTtnQkFDUixLQUFLLGFBQWEsQ0FBQyx1QkFBdUI7b0JBQ3hDLE9BQU8sQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO29CQUMz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QUpGLGFBQWE7Z0JBSGIsZ0JBQWdCOztJQXNJekIsdUJBQUM7Q0FBQSxBQS9IRCxJQStIQztTQTlIWSxnQkFBZ0I7Ozs7OztJQUNmLHlDQUFvQzs7Ozs7SUFBRSxxQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgRXh0ZW5zaW9uTmFtZSB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XHJcblxyXG5kZWNsYXJlIGZ1bmN0aW9uIHJlcXVpcmUobmFtZTogc3RyaW5nKTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEV4dGVuc2lvblV0aWxpdHkge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSwgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYSBjb2x1bW4gZnJvbSB0aGUgZ3JpZCBieSBpdCdzIGluZGV4IGluIHRoZSBncmlkXHJcbiAgICogQHBhcmFtIGFycmF5IGlucHV0XHJcbiAgICogQHBhcmFtIGluZGV4XHJcbiAgICovXHJcbiAgYXJyYXlSZW1vdmVJdGVtQnlJbmRleChhcnJheTogYW55W10sIGluZGV4OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBhcnJheS5maWx0ZXIoKGVsOiBhbnksIGk6IG51bWJlcikgPT4ge1xyXG4gICAgICByZXR1cm4gaW5kZXggIT09IGk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExvYWQgU2xpY2tHcmlkIEV4dGVuc2lvbiAoQ29udHJvbC9QbHVnaW4pIGR5bmFtaWNhbGx5IChvbiBkZW1hbmQpXHJcbiAgICogVGhpcyB3aWxsIGJhc2ljYWxseSBvbmx5IGxvYWQgdGhlIGV4dGVuc2lvbiB3aGVuIHVzZXIgZW5hYmxlcyB0aGUgZmVhdHVyZVxyXG4gICAqIEBwYXJhbSBleHRlbnNpb25OYW1lXHJcbiAgICovXHJcbiAgbG9hZEV4dGVuc2lvbkR5bmFtaWNhbGx5KGV4dGVuc2lvbk5hbWU6IEV4dGVuc2lvbk5hbWUpOiBhbnkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgc3dpdGNoIChleHRlbnNpb25OYW1lKSB7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLmF1dG9Ub29sdGlwOlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suYXV0b3Rvb2x0aXBzJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUuY2VsbEV4dGVybmFsQ29weU1hbmFnZXI6XHJcbiAgICAgICAgICByZXF1aXJlKCdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5jZWxsZXh0ZXJuYWxjb3B5bWFuYWdlcicpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLmNoZWNrYm94U2VsZWN0b3I6XHJcbiAgICAgICAgICByZXF1aXJlKCdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5jaGVja2JveHNlbGVjdGNvbHVtbicpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLmNvbHVtblBpY2tlcjpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9jb250cm9scy9zbGljay5jb2x1bW5waWNrZXInKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5kcmFnZ2FibGVHcm91cGluZzpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLmRyYWdnYWJsZWdyb3VwaW5nLmpzJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUuZ3JpZE1lbnU6XHJcbiAgICAgICAgICByZXF1aXJlKCdzbGlja2dyaWQvY29udHJvbHMvc2xpY2suZ3JpZG1lbnUnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5ncm91cEl0ZW1NZXRhUHJvdmlkZXI6XHJcbiAgICAgICAgICByZXF1aXJlKCdzbGlja2dyaWQvc2xpY2suZ3JvdXBpdGVtbWV0YWRhdGFwcm92aWRlcicpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLmhlYWRlckJ1dHRvbjpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLmhlYWRlcmJ1dHRvbnMnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5oZWFkZXJNZW51OlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suaGVhZGVybWVudScpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLnJvd1NlbGVjdGlvbjpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLnJvd3NlbGVjdGlvbm1vZGVsJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUucm93RGV0YWlsVmlldzpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLnJvd2RldGFpbHZpZXcuanMnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5yb3dNb3ZlTWFuYWdlcjpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLnJvd21vdmVtYW5hZ2VyLmpzJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAvLyBkbyBub3RoaW5nLCB3ZSBmYWxsIGhlcmUgd2hlbiB1c2luZyBBbmd1bGFyIGFuZCBSZXF1aXJlSlNcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZyb20gYSBHcmlkIE1lbnUgb2JqZWN0IHByb3BlcnR5IG5hbWUsIHdlIHdpbGwgcmV0dXJuIHRoZSBjb3JyZWN0IHRpdGxlIG91dHB1dCBzdHJpbmcgZm9sbG93aW5nIHRoaXMgb3JkZXJcclxuICAgKiAxLSBpZiB1c2VyIHByb3ZpZGVkIGEgdGl0bGUsIHVzZSBpdCBhcyB0aGUgb3V0cHV0IHRpdGxlXHJcbiAgICogMi0gZWxzZSBpZiB1c2VyIHByb3ZpZGVkIGEgdGl0bGUga2V5LCB1c2UgaXQgdG8gdHJhbnNsYXRlIHRoZSBvdXRwdXQgdGl0bGVcclxuICAgKiAzLSBlbHNlIGlmIG5vdGhpbmcgaXMgcHJvdmlkZWQgdXNlXHJcbiAgICovXHJcbiAgZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcocHJvcE5hbWU6IHN0cmluZywgcGlja2VyTmFtZTogJ2dyaWRNZW51JyB8ICdjb2x1bW5QaWNrZXInKSB7XHJcbiAgICBsZXQgb3V0cHV0ID0gJyc7XHJcbiAgICBjb25zdCBwaWNrZXIgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zW3BpY2tlck5hbWVdIHx8IHt9O1xyXG4gICAgY29uc3QgZW5hYmxlVHJhbnNsYXRlID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgfHwgZmFsc2U7XHJcblxyXG4gICAgY29uc3QgdGl0bGUgPSBwaWNrZXIgJiYgcGlja2VyW3Byb3BOYW1lXTtcclxuICAgIGNvbnN0IHRpdGxlS2V5ID0gcGlja2VyICYmIHBpY2tlcltgJHtwcm9wTmFtZX1LZXlgXTtcclxuXHJcbiAgICBpZiAodGl0bGVLZXkpIHtcclxuICAgICAgb3V0cHV0ID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCh0aXRsZUtleSB8fCAnICcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dpdGNoIChwcm9wTmFtZSkge1xyXG4gICAgICAgIGNhc2UgJ2N1c3RvbVRpdGxlJzpcclxuICAgICAgICAgIG91dHB1dCA9IHRpdGxlIHx8IChlbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdDT01NQU5EUycpIDogQ29uc3RhbnRzLlRFWFRfQ09NTUFORFMpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnY29sdW1uVGl0bGUnOlxyXG4gICAgICAgICAgb3V0cHV0ID0gdGl0bGUgfHwgKGVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0NPTFVNTlMnKSA6IENvbnN0YW50cy5URVhUX0NPTFVNTlMpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnZm9yY2VGaXRUaXRsZSc6XHJcbiAgICAgICAgICBvdXRwdXQgPSB0aXRsZSB8fCAoZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnRk9SQ0VfRklUX0NPTFVNTlMnKSA6IENvbnN0YW50cy5URVhUX0ZPUkNFX0ZJVF9DT0xVTU5TKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3N5bmNSZXNpemVUaXRsZSc6XHJcbiAgICAgICAgICBvdXRwdXQgPSB0aXRsZSB8fCAoZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnU1lOQ0hST05PVVNfUkVTSVpFJykgOiBDb25zdGFudHMuVEVYVF9TWU5DSFJPTk9VU19SRVNJWkUpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIG91dHB1dCA9IHRpdGxlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTb3J0IGl0ZW1zIGluIGFuIGFycmF5IGJ5IGEgcHJvcGVydHkgbmFtZVxyXG4gICAqIEBwYXJhbXMgaXRlbXMgYXJyYXlcclxuICAgKiBAcGFyYW0gcHJvcGVydHkgbmFtZSB0byBzb3J0IHdpdGhcclxuICAgKiBAcmV0dXJuIHNvcnRlZCBhcnJheVxyXG4gICAqL1xyXG4gIHNvcnRJdGVtcyhpdGVtczogYW55W10sIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XHJcbiAgICAvLyBzb3J0IHRoZSBjdXN0b20gaXRlbXMgYnkgdGhlaXIgcG9zaXRpb24gaW4gdGhlIGxpc3RcclxuICAgIGl0ZW1zLnNvcnQoKGl0ZW1BOiBhbnksIGl0ZW1COiBhbnkpID0+IHtcclxuICAgICAgaWYgKGl0ZW1BICYmIGl0ZW1CICYmIGl0ZW1BLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkgJiYgaXRlbUIuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtQVtwcm9wZXJ0eU5hbWVdIC0gaXRlbUJbcHJvcGVydHlOYW1lXTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIFRyYW5zbGF0ZSB0aGUgYW4gYXJyYXkgb2YgaXRlbXMgZnJvbSBhbiBpbnB1dCBrZXkgYW5kIGFzc2lnbiB0byB0aGUgb3V0cHV0IGtleSAqL1xyXG4gIHRyYW5zbGF0ZUl0ZW1zKGl0ZW1zOiBhbnlbXSwgaW5wdXRLZXk6IHN0cmluZywgb3V0cHV0S2V5OiBzdHJpbmcpIHtcclxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xyXG4gICAgICBpZiAoaXRlbVtpbnB1dEtleV0pIHtcclxuICAgICAgICBpdGVtW291dHB1dEtleV0gPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KGl0ZW1baW5wdXRLZXldKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=