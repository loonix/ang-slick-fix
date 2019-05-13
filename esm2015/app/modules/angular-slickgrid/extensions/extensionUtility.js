/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import { ExtensionName } from '../models/index';
import { SharedService } from '../services/shared.service';
export class ExtensionUtility {
    /**
     * @param {?} sharedService
     * @param {?} translate
     */
    constructor(sharedService, translate) {
        this.sharedService = sharedService;
        this.translate = translate;
    }
    /**
     * Remove a column from the grid by it's index in the grid
     * @param {?} array input
     * @param {?} index
     * @return {?}
     */
    arrayRemoveItemByIndex(array, index) {
        return array.filter((/**
         * @param {?} el
         * @param {?} i
         * @return {?}
         */
        (el, i) => {
            return index !== i;
        }));
    }
    /**
     * Load SlickGrid Extension (Control/Plugin) dynamically (on demand)
     * This will basically only load the extension when user enables the feature
     * @param {?} extensionName
     * @return {?}
     */
    loadExtensionDynamically(extensionName) {
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
    }
    /**
     * From a Grid Menu object property name, we will return the correct title output string following this order
     * 1- if user provided a title, use it as the output title
     * 2- else if user provided a title key, use it to translate the output title
     * 3- else if nothing is provided use
     * @param {?} propName
     * @param {?} pickerName
     * @return {?}
     */
    getPickerTitleOutputString(propName, pickerName) {
        /** @type {?} */
        let output = '';
        /** @type {?} */
        const picker = this.sharedService.gridOptions && this.sharedService.gridOptions[pickerName] || {};
        /** @type {?} */
        const enableTranslate = this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate || false;
        /** @type {?} */
        const title = picker && picker[propName];
        /** @type {?} */
        const titleKey = picker && picker[`${propName}Key`];
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
    }
    /**
     * Sort items in an array by a property name
     * \@params items array
     * @param {?} items
     * @param {?} propertyName
     * @return {?} sorted array
     */
    sortItems(items, propertyName) {
        // sort the custom items by their position in the list
        items.sort((/**
         * @param {?} itemA
         * @param {?} itemB
         * @return {?}
         */
        (itemA, itemB) => {
            if (itemA && itemB && itemA.hasOwnProperty(propertyName) && itemB.hasOwnProperty(propertyName)) {
                return itemA[propertyName] - itemB[propertyName];
            }
            return 0;
        }));
    }
    /**
     * Translate the an array of items from an input key and assign to the output key
     * @param {?} items
     * @param {?} inputKey
     * @param {?} outputKey
     * @return {?}
     */
    translateItems(items, inputKey, outputKey) {
        for (const item of items) {
            if (item[inputKey]) {
                item[outputKey] = this.translate.instant(item[inputKey]);
            }
        }
    }
}
ExtensionUtility.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ExtensionUtility.ctorParameters = () => [
    { type: SharedService },
    { type: TranslateService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uVXRpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9leHRlbnNpb25VdGlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUszRCxNQUFNLE9BQU8sZ0JBQWdCOzs7OztJQUMzQixZQUFvQixhQUE0QixFQUFVLFNBQTJCO1FBQWpFLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFBSSxDQUFDOzs7Ozs7O0lBTzFGLHNCQUFzQixDQUFDLEtBQVksRUFBRSxLQUFhO1FBQ2hELE9BQU8sS0FBSyxDQUFDLE1BQU07Ozs7O1FBQUMsQ0FBQyxFQUFPLEVBQUUsQ0FBUyxFQUFFLEVBQUU7WUFDekMsT0FBTyxLQUFLLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7OztJQU9ELHdCQUF3QixDQUFDLGFBQTRCO1FBQ25ELElBQUk7WUFDRixRQUFRLGFBQWEsRUFBRTtnQkFDckIsS0FBSyxhQUFhLENBQUMsV0FBVztvQkFDNUIsT0FBTyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7b0JBQ2hELE1BQU07Z0JBQ1IsS0FBSyxhQUFhLENBQUMsdUJBQXVCO29CQUN4QyxPQUFPLENBQUMsaURBQWlELENBQUMsQ0FBQztvQkFDM0QsTUFBTTtnQkFDUixLQUFLLGFB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Q0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsQ0FBQztvQkFDdkgsTUFBTTtnQkFDUjtvQkFDRSxNQUFNLEdBQUcsS0FBSyxDQUFDO29CQUNmLE1BQU07YUFDVDtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7Ozs7Ozs7SUFRRCxTQUFTLENBQUMsS0FBWSxFQUFFLFlBQW9CO1FBQzFDLHNEQUFzRDtRQUN0RCxLQUFLLENBQUMsSUFBSTs7Ozs7UUFBQyxDQUFDLEtBQVUsRUFBRSxLQUFVLEVBQUUsRUFBRTtZQUNwQyxJQUFJLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUM5RixPQUFPLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDbEQ7WUFDRCxPQUFPLENBQUMsQ0FBQztRQUNYLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7Ozs7SUFHRCxjQUFjLENBQUMsS0FBWSxFQUFFLFFBQWdCLEVBQUUsU0FBaUI7UUFDOUQsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7WUFDeEIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUMxRDtTQUNGO0lBQ0gsQ0FBQzs7O1lBOUhGLFVBQVU7Ozs7WUFKRixhQUFhO1lBSGIsZ0JBQWdCOzs7Ozs7O0lBU1gseUNBQW9DOzs7OztJQUFFLHFDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBFeHRlbnNpb25OYW1lIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlJztcclxuXHJcbmRlY2xhcmUgZnVuY3Rpb24gcmVxdWlyZShuYW1lOiBzdHJpbmcpO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRXh0ZW5zaW9uVXRpbGl0eSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlLCBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhIGNvbHVtbiBmcm9tIHRoZSBncmlkIGJ5IGl0J3MgaW5kZXggaW4gdGhlIGdyaWRcclxuICAgKiBAcGFyYW0gYXJyYXkgaW5wdXRcclxuICAgKiBAcGFyYW0gaW5kZXhcclxuICAgKi9cclxuICBhcnJheVJlbW92ZUl0ZW1CeUluZGV4KGFycmF5OiBhbnlbXSwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGFycmF5LmZpbHRlcigoZWw6IGFueSwgaTogbnVtYmVyKSA9PiB7XHJcbiAgICAgIHJldHVybiBpbmRleCAhPT0gaTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZCBTbGlja0dyaWQgRXh0ZW5zaW9uIChDb250cm9sL1BsdWdpbikgZHluYW1pY2FsbHkgKG9uIGRlbWFuZClcclxuICAgKiBUaGlzIHdpbGwgYmFzaWNhbGx5IG9ubHkgbG9hZCB0aGUgZXh0ZW5zaW9uIHdoZW4gdXNlciBlbmFibGVzIHRoZSBmZWF0dXJlXHJcbiAgICogQHBhcmFtIGV4dGVuc2lvbk5hbWVcclxuICAgKi9cclxuICBsb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoZXh0ZW5zaW9uTmFtZTogRXh0ZW5zaW9uTmFtZSk6IGFueSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBzd2l0Y2ggKGV4dGVuc2lvbk5hbWUpIHtcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUuYXV0b1Rvb2x0aXA6XHJcbiAgICAgICAgICByZXF1aXJlKCdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5hdXRvdG9vbHRpcHMnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5jZWxsRXh0ZXJuYWxDb3B5TWFuYWdlcjpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLmNlbGxleHRlcm5hbGNvcHltYW5hZ2VyJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUuY2hlY2tib3hTZWxlY3RvcjpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLmNoZWNrYm94c2VsZWN0Y29sdW1uJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUuY29sdW1uUGlja2VyOlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL2NvbnRyb2xzL3NsaWNrLmNvbHVtbnBpY2tlcicpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLmRyYWdnYWJsZUdyb3VwaW5nOlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suZHJhZ2dhYmxlZ3JvdXBpbmcuanMnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5ncmlkTWVudTpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9jb250cm9scy9zbGljay5ncmlkbWVudScpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLmdyb3VwSXRlbU1ldGFQcm92aWRlcjpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9zbGljay5ncm91cGl0ZW1tZXRhZGF0YXByb3ZpZGVyJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUuaGVhZGVyQnV0dG9uOlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suaGVhZGVyYnV0dG9ucycpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLmhlYWRlck1lbnU6XHJcbiAgICAgICAgICByZXF1aXJlKCdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5oZWFkZXJtZW51Jyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUucm93U2VsZWN0aW9uOlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2sucm93c2VsZWN0aW9ubW9kZWwnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5yb3dEZXRhaWxWaWV3OlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2sucm93ZGV0YWlsdmlldy5qcycpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLnJvd01vdmVNYW5hZ2VyOlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2sucm93bW92ZW1hbmFnZXIuanMnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIC8vIGRvIG5vdGhpbmcsIHdlIGZhbGwgaGVyZSB3aGVuIHVzaW5nIEFuZ3VsYXIgYW5kIFJlcXVpcmVKU1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRnJvbSBhIEdyaWQgTWVudSBvYmplY3QgcHJvcGVydHkgbmFtZSwgd2Ugd2lsbCByZXR1cm4gdGhlIGNvcnJlY3QgdGl0bGUgb3V0cHV0IHN0cmluZyBmb2xsb3dpbmcgdGhpcyBvcmRlclxyXG4gICAqIDEtIGlmIHVzZXIgcHJvdmlkZWQgYSB0aXRsZSwgdXNlIGl0IGFzIHRoZSBvdXRwdXQgdGl0bGVcclxuICAgKiAyLSBlbHNlIGlmIHVzZXIgcHJvdmlkZWQgYSB0aXRsZSBrZXksIHVzZSBpdCB0byB0cmFuc2xhdGUgdGhlIG91dHB1dCB0aXRsZVxyXG4gICAqIDMtIGVsc2UgaWYgbm90aGluZyBpcyBwcm92aWRlZCB1c2VcclxuICAgKi9cclxuICBnZXRQaWNrZXJUaXRsZU91dHB1dFN0cmluZyhwcm9wTmFtZTogc3RyaW5nLCBwaWNrZXJOYW1lOiAnZ3JpZE1lbnUnIHwgJ2NvbHVtblBpY2tlcicpIHtcclxuICAgIGxldCBvdXRwdXQgPSAnJztcclxuICAgIGNvbnN0IHBpY2tlciA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnNbcGlja2VyTmFtZV0gfHwge307XHJcbiAgICBjb25zdCBlbmFibGVUcmFuc2xhdGUgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSB8fCBmYWxzZTtcclxuXHJcbiAgICBjb25zdCB0aXRsZSA9IHBpY2tlciAmJiBwaWNrZXJbcHJvcE5hbWVdO1xyXG4gICAgY29uc3QgdGl0bGVLZXkgPSBwaWNrZXIgJiYgcGlja2VyW2Ake3Byb3BOYW1lfUtleWBdO1xyXG5cclxuICAgIGlmICh0aXRsZUtleSkge1xyXG4gICAgICBvdXRwdXQgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KHRpdGxlS2V5IHx8ICcgJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzd2l0Y2ggKHByb3BOYW1lKSB7XHJcbiAgICAgICAgY2FzZSAnY3VzdG9tVGl0bGUnOlxyXG4gICAgICAgICAgb3V0cHV0ID0gdGl0bGUgfHwgKGVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0NPTU1BTkRTJykgOiBDb25zdGFudHMuVEVYVF9DT01NQU5EUyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdjb2x1bW5UaXRsZSc6XHJcbiAgICAgICAgICBvdXRwdXQgPSB0aXRsZSB8fCAoZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnQ09MVU1OUycpIDogQ29uc3RhbnRzLlRFWFRfQ09MVU1OUyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdmb3JjZUZpdFRpdGxlJzpcclxuICAgICAgICAgIG91dHB1dCA9IHRpdGxlIHx8IChlbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdGT1JDRV9GSVRfQ09MVU1OUycpIDogQ29uc3RhbnRzLlRFWFRfRk9SQ0VfRklUX0NPTFVNTlMpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnc3luY1Jlc2l6ZVRpdGxlJzpcclxuICAgICAgICAgIG91dHB1dCA9IHRpdGxlIHx8IChlbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdTWU5DSFJPTk9VU19SRVNJWkUnKSA6IENvbnN0YW50cy5URVhUX1NZTkNIUk9OT1VTX1JFU0laRSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgb3V0cHV0ID0gdGl0bGU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dHB1dDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnQgaXRlbXMgaW4gYW4gYXJyYXkgYnkgYSBwcm9wZXJ0eSBuYW1lXHJcbiAgICogQHBhcmFtcyBpdGVtcyBhcnJheVxyXG4gICAqIEBwYXJhbSBwcm9wZXJ0eSBuYW1lIHRvIHNvcnQgd2l0aFxyXG4gICAqIEByZXR1cm4gc29ydGVkIGFycmF5XHJcbiAgICovXHJcbiAgc29ydEl0ZW1zKGl0ZW1zOiBhbnlbXSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcclxuICAgIC8vIHNvcnQgdGhlIGN1c3RvbSBpdGVtcyBieSB0aGVpciBwb3NpdGlvbiBpbiB0aGUgbGlzdFxyXG4gICAgaXRlbXMuc29ydCgoaXRlbUE6IGFueSwgaXRlbUI6IGFueSkgPT4ge1xyXG4gICAgICBpZiAoaXRlbUEgJiYgaXRlbUIgJiYgaXRlbUEuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSAmJiBpdGVtQi5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1BW3Byb3BlcnR5TmFtZV0gLSBpdGVtQltwcm9wZXJ0eU5hbWVdO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogVHJhbnNsYXRlIHRoZSBhbiBhcnJheSBvZiBpdGVtcyBmcm9tIGFuIGlucHV0IGtleSBhbmQgYXNzaWduIHRvIHRoZSBvdXRwdXQga2V5ICovXHJcbiAgdHJhbnNsYXRlSXRlbXMoaXRlbXM6IGFueVtdLCBpbnB1dEtleTogc3RyaW5nLCBvdXRwdXRLZXk6IHN0cmluZykge1xyXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XHJcbiAgICAgIGlmIChpdGVtW2lucHV0S2V5XSkge1xyXG4gICAgICAgIGl0ZW1bb3V0cHV0S2V5XSA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoaXRlbVtpbnB1dEtleV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==