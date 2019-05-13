/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// import common 3rd party SlickGrid plugins/libs
import 'slickgrid/plugins/slick.cellrangedecorator';
import 'slickgrid/plugins/slick.cellrangeselector';
import 'slickgrid/plugins/slick.cellselectionmodel';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ExtensionName, } from '../models/index';
import { AutoTooltipExtension, CellExternalCopyManagerExtension, CheckboxSelectorExtension, ColumnPickerExtension, DraggableGroupingExtension, GridMenuExtension, GroupItemMetaProviderExtension, HeaderButtonExtension, HeaderMenuExtension, RowDetailViewExtension, RowMoveManagerExtension, RowSelectionExtension, } from '../extensions/index';
import { SharedService } from './shared.service';
export class ExtensionService {
    /**
     * @param {?} autoTooltipExtension
     * @param {?} cellExternalCopyExtension
     * @param {?} checkboxSelectorExtension
     * @param {?} columnPickerExtension
     * @param {?} draggableGroupingExtension
     * @param {?} gridMenuExtension
     * @param {?} groupItemMetaExtension
     * @param {?} headerButtonExtension
     * @param {?} headerMenuExtension
     * @param {?} rowDetailViewExtension
     * @param {?} rowMoveManagerExtension
     * @param {?} rowSelectionExtension
     * @param {?} sharedService
     * @param {?} translate
     */
    constructor(autoTooltipExtension, cellExternalCopyExtension, checkboxSelectorExtension, columnPickerExtension, draggableGroupingExtension, gridMenuExtension, groupItemMetaExtension, headerButtonExtension, headerMenuExtension, rowDetailViewExtension, rowMoveManagerExtension, rowSelectionExtension, sharedService, translate) {
        this.autoTooltipExtension = autoTooltipExtension;
        this.cellExternalCopyExtension = cellExternalCopyExtension;
        this.checkboxSelectorExtension = checkboxSelectorExtension;
        this.columnPickerExtension = columnPickerExtension;
        this.draggableGroupingExtension = draggableGroupingExtension;
        this.gridMenuExtension = gridMenuExtension;
        this.groupItemMetaExtension = groupItemMetaExtension;
        this.headerButtonExtension = headerButtonExtension;
        this.headerMenuExtension = headerMenuExtension;
        this.rowDetailViewExtension = rowDetailViewExtension;
        this.rowMoveManagerExtension = rowMoveManagerExtension;
        this.rowSelectionExtension = rowSelectionExtension;
        this.sharedService = sharedService;
        this.translate = translate;
        this.extensionList = [];
    }
    /**
     * Dispose of all the controls & plugins
     * @return {?}
     */
    dispose() {
        this.sharedService.grid = null;
        this.sharedService.visibleColumns = [];
        // dispose of each control/plugin & reset the list
        this.extensionList.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            if (item && item.class && item.class.dispose) {
                item.class.dispose();
            }
        }));
        this.extensionList = [];
    }
    /**
     * Get all columns (includes visible and non-visible)
     * @return {?}
     */
    getAllColumns() {
        return this.sharedService.allColumns || [];
    }
    /**
     * Get only visible columns
     * @return {?}
     */
    getVisibleColumns() {
        return this.sharedService.visibleColumns || [];
    }
    /**
     * Get all Extensions
     * @return {?}
     */
    getAllExtensions() {
        return this.extensionList;
    }
    /**
     * Get an Extension by it's name
     * @param {?} name
     * @return {?}
     */
    getExtensionByName(name) {
        return this.extensionList.find((/**
         * @param {?} p
         * @return {?}
         */
        (p) => p.name === name));
    }
    /**
     * Get the instance of the SlickGrid addon (control or plugin).
     * This is the raw addon coming directly from SlickGrid itself, not to confuse with Angular-Slickgrid extension
     * @param {?} name
     * @return {?}
     */
    getSlickgridAddonInstance(name) {
        /** @type {?} */
        const extension = this.getExtensionByName(name);
        if (extension && extension.addon) {
            return extension.addon;
        }
        return null;
    }
    /**
     * Auto-resize all the column in the grid to fit the grid width
     * @return {?}
     */
    autoResizeColumns() {
        this.sharedService.grid.autosizeColumns();
    }
    /**
     * Attach/Create different Controls or Plugins after the Grid is created
     * @return {?}
     */
    attachDifferentExtensions() {
        // make sure all columns are translated before creating ColumnPicker/GridMenu Controls
        // this is to avoid having hidden columns not being translated on first load
        if (this.sharedService.gridOptions.enableTranslate) {
            this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
        }
        // Auto Tooltip Plugin
        if (this.sharedService.gridOptions.enableAutoTooltip) {
            if (this.autoTooltipExtension && this.autoTooltipExtension.register) {
                this.extensionList.push({ name: ExtensionName.autoTooltip, class: this.autoTooltipExtension, addon: this.autoTooltipExtension.register() });
            }
        }
        // Column Picker Control
        if (this.sharedService.gridOptions.enableColumnPicker) {
            if (this.columnPickerExtension && this.columnPickerExtension.register) {
                this.extensionList.push({ name: ExtensionName.columnPicker, class: this.columnPickerExtension, addon: this.columnPickerExtension.register() });
            }
        }
        // Draggable Grouping Plugin
        if (this.sharedService.gridOptions.enableDraggableGrouping) {
            if (this.draggableGroupingExtension && this.draggableGroupingExtension.register) {
                this.extensionList.push({ name: ExtensionName.draggableGrouping, class: this.draggableGroupingExtension, addon: this.draggableGroupingExtension.register() });
            }
        }
        // Grid Menu Control
        if (this.sharedService.gridOptions.enableGridMenu) {
            if (this.gridMenuExtension && this.gridMenuExtension.register) {
                this.extensionList.push({ name: ExtensionName.gridMenu, class: this.gridMenuExtension, addon: this.gridMenuExtension.register() });
            }
        }
        // Grouping Plugin & Draggable Grouping Plugin
        // register the group item metadata provider to add expand/collapse group handlers
        if (this.sharedService.gridOptions.enableDraggableGrouping || this.sharedService.gridOptions.enableGrouping) {
            if (this.groupItemMetaExtension && this.groupItemMetaExtension.register) {
                this.extensionList.push({ name: ExtensionName.groupItemMetaProvider, class: this.groupItemMetaExtension, addon: this.groupItemMetaExtension.register() });
            }
        }
        // Checkbox Selector Plugin
        if (this.sharedService.gridOptions.enableCheckboxSelector) {
            if (this.checkboxSelectorExtension && this.checkboxSelectorExtension.register) {
                /** @type {?} */
                const rowSelectionExtension = this.getExtensionByName(ExtensionName.rowSelection);
                this.extensionList.push({ name: ExtensionName.checkboxSelector, class: this.checkboxSelectorExtension, addon: this.checkboxSelectorExtension.register(rowSelectionExtension) });
            }
        }
        // Row Detail View Plugin
        if (this.sharedService.gridOptions.enableRowDetailView) {
            if (this.rowDetailViewExtension && this.rowDetailViewExtension.register) {
                /** @type {?} */
                const rowSelectionExtension = this.getExtensionByName(ExtensionName.rowSelection);
                this.extensionList.push({ name: ExtensionName.rowDetailView, class: this.rowDetailViewExtension, addon: this.rowDetailViewExtension.register(rowSelectionExtension) });
            }
        }
        // Row Move Manager Plugin
        if (this.sharedService.gridOptions.enableRowMoveManager) {
            if (this.rowMoveManagerExtension && this.rowMoveManagerExtension.register) {
                this.extensionList.push({ name: ExtensionName.rowMoveManager, class: this.rowMoveManagerExtension, addon: this.rowMoveManagerExtension.register() });
            }
        }
        // Row Selection Plugin
        if (!this.sharedService.gridOptions.enableCheckboxSelector && this.sharedService.gridOptions.enableRowSelection) {
            if (this.rowSelectionExtension && this.rowSelectionExtension.register) {
                this.extensionList.push({ name: ExtensionName.rowSelection, class: this.rowSelectionExtension, addon: this.rowSelectionExtension.register() });
            }
        }
        // Header Button Plugin
        if (this.sharedService.gridOptions.enableHeaderButton) {
            if (this.headerButtonExtension && this.headerButtonExtension.register) {
                this.extensionList.push({ name: ExtensionName.headerButton, class: this.headerButtonExtension, addon: this.headerButtonExtension.register() });
            }
        }
        // Header Menu Plugin
        if (this.sharedService.gridOptions.enableHeaderMenu) {
            if (this.headerMenuExtension && this.headerMenuExtension.register) {
                this.extensionList.push({ name: ExtensionName.headerMenu, class: this.headerMenuExtension, addon: this.headerMenuExtension.register() });
            }
        }
        // Cell External Copy Manager Plugin (Excel Like)
        if (this.sharedService.gridOptions.enableExcelCopyBuffer) {
            if (this.cellExternalCopyExtension && this.cellExternalCopyExtension.register) {
                this.extensionList.push({ name: ExtensionName.cellExternalCopyManager, class: this.cellExternalCopyExtension, addon: this.cellExternalCopyExtension.register() });
            }
        }
        // manually register other plugins
        if (this.sharedService.gridOptions.registerPlugins !== undefined) {
            if (Array.isArray(this.sharedService.gridOptions.registerPlugins)) {
                this.sharedService.gridOptions.registerPlugins.forEach((/**
                 * @param {?} plugin
                 * @return {?}
                 */
                (plugin) => {
                    this.sharedService.grid.registerPlugin(plugin);
                    this.extensionList.push({ name: ExtensionName.noname, class: null, addon: plugin });
                }));
            }
            else {
                this.sharedService.grid.registerPlugin(this.sharedService.gridOptions.registerPlugins);
                this.extensionList.push({ name: ExtensionName.noname, class: null, addon: this.sharedService.gridOptions.registerPlugins });
            }
        }
    }
    /**
     * Attach/Create certain plugins before the Grid creation, else they might behave oddly.
     * Mostly because the column definitions might change after the grid creation
     * @param {?} columnDefinitions
     * @param {?} options
     * @return {?}
     */
    createExtensionsBeforeGridCreation(columnDefinitions, options) {
        if (options.enableCheckboxSelector) {
            this.checkboxSelectorExtension.create(columnDefinitions, options);
        }
        if (options.enableRowDetailView) {
            this.rowDetailViewExtension.create(columnDefinitions, options);
        }
        if (options.enableDraggableGrouping) {
            /** @type {?} */
            const plugin = this.draggableGroupingExtension.create(options);
            options.enableColumnReorder = plugin.getSetupColumnReorder;
        }
    }
    /**
     * Hide a column from the grid
     * @param {?} column
     * @return {?}
     */
    hideColumn(column) {
        if (this.sharedService && this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
            /** @type {?} */
            const columnIndex = this.sharedService.grid.getColumnIndex(column.id);
            this.sharedService.visibleColumns = this.removeColumnByIndex(this.sharedService.grid.getColumns(), columnIndex);
            this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
        }
    }
    /**
     * Refresh the dataset through the Backend Service
     * @param {?=} gridOptions
     * @return {?}
     */
    refreshBackendDataset(gridOptions) {
        this.gridMenuExtension.refreshBackendDataset(gridOptions);
    }
    /**
     * Remove a column from the grid by it's index in the grid
     * @param {?} array input
     * @param {?} index
     * @return {?}
     */
    removeColumnByIndex(array, index) {
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
     * Translate the Column Picker and it's last 2 checkboxes
     * @return {?}
     */
    translateColumnPicker() {
        if (this.columnPickerExtension && this.columnPickerExtension.translateColumnPicker) {
            this.columnPickerExtension.translateColumnPicker();
        }
    }
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    translateGridMenu() {
        if (this.gridMenuExtension && this.gridMenuExtension.translateGridMenu) {
            this.gridMenuExtension.translateGridMenu();
        }
    }
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    translateHeaderMenu() {
        if (this.headerMenuExtension && this.headerMenuExtension.translateHeaderMenu) {
            this.headerMenuExtension.translateHeaderMenu();
        }
    }
    /**
     * Translate manually the header titles.
     * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
     * @param {?=} locale to use
     * @param {?=} newColumnDefinitions
     * @return {?}
     */
    translateColumnHeaders(locale, newColumnDefinitions) {
        if (locale) {
            this.translate.use((/** @type {?} */ (locale)));
        }
        /** @type {?} */
        const columnDefinitions = newColumnDefinitions || this.sharedService.columnDefinitions;
        this.translateItems(columnDefinitions, 'headerKey', 'name');
        this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
        // re-render the column headers
        this.renderColumnHeaders(columnDefinitions);
    }
    /**
     * Render (or re-render) the column headers from column definitions.
     * calling setColumns() will trigger a grid re-render
     * @param {?=} newColumnDefinitions
     * @return {?}
     */
    renderColumnHeaders(newColumnDefinitions) {
        /** @type {?} */
        const collection = newColumnDefinitions || this.sharedService.columnDefinitions;
        if (Array.isArray(collection) && this.sharedService.grid && this.sharedService.grid.setColumns) {
            this.sharedService.grid.setColumns(collection);
        }
    }
    /**
     * Translate the an array of items from an input key and assign to the output key
     * @private
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
ExtensionService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ExtensionService.ctorParameters = () => [
    { type: AutoTooltipExtension },
    { type: CellExternalCopyManagerExtension },
    { type: CheckboxSelectorExtension },
    { type: ColumnPickerExtension },
    { type: DraggableGroupingExtension },
    { type: GridMenuExtension },
    { type: GroupItemMetaProviderExtension },
    { type: HeaderButtonExtension },
    { type: HeaderMenuExtension },
    { type: RowDetailViewExtension },
    { type: RowMoveManagerExtension },
    { type: RowSelectionExtension },
    { type: SharedService },
    { type: TranslateService }
];
if (false) {
    /** @type {?} */
    ExtensionService.prototype.extensionList;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.autoTooltipExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.cellExternalCopyExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.checkboxSelectorExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.columnPickerExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.draggableGroupingExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.gridMenuExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.groupItemMetaExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.headerButtonExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.headerMenuExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.rowDetailViewExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.rowMoveManagerExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.rowSelectionExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.sharedService;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2V4dGVuc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyw0Q0FBNEMsQ0FBQztBQUNwRCxPQUFPLDJDQUEyQyxDQUFDO0FBQ25ELE9BQU8sNENBQTRDLENBQUM7QUFFcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBR0wsYUFBYSxHQUVkLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixnQ0FBZ0MsRUFDaEMseUJBQXlCLEVBQ3pCLHFCQUFxQixFQUNyQiwwQkFBMEIsRUFDMUIsaUJBQWlCLEVBQ2pCLDhCQUE4QixFQUM5QixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ25CLHNCQUFzQixFQUN0Qix1QkFBdUIsRUFDdkIscUJBQXFCLEdBQ3RCLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBR2pELE1BQU0sT0FBTyxnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRzNCLFlBQ1Usb0JBQTBDLEVBQzFDLHlCQUEyRCxFQUMzRCx5QkFBb0QsRUFDcEQscUJBQTRDLEVBQzVDLDBCQUFzRCxFQUN0RCxpQkFBb0MsRUFDcEMsc0JBQXNELEVBQ3RELHFCQUE0QyxFQUM1QyxtQkFBd0MsRUFDeEMsc0JBQThDLEVBQzlDLHVCQUFnRCxFQUNoRCxxQkFBNEMsRUFDNUMsYUFBNEIsRUFDNUIsU0FBMkI7UUFiM0IseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyw4QkFBeUIsR0FBekIseUJBQXlCLENBQWtD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SUFDaEQsa0RBQXNEOzs7OztJQUN0RCxtREFBd0Q7Ozs7O0lBQ3hELGlEQUFvRDs7Ozs7SUFDcEQseUNBQW9DOzs7OztJQUNwQyxxQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgY29tbW9uIDNyZCBwYXJ0eSBTbGlja0dyaWQgcGx1Z2lucy9saWJzXHJcbmltcG9ydCAnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suY2VsbHJhbmdlZGVjb3JhdG9yJztcclxuaW1wb3J0ICdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5jZWxscmFuZ2VzZWxlY3Rvcic7XHJcbmltcG9ydCAnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suY2VsbHNlbGVjdGlvbm1vZGVsJztcclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENvbHVtbixcclxuICBFeHRlbnNpb25Nb2RlbCxcclxuICBFeHRlbnNpb25OYW1lLFxyXG4gIEdyaWRPcHRpb24sXHJcbn0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHtcclxuICBBdXRvVG9vbHRpcEV4dGVuc2lvbixcclxuICBDZWxsRXh0ZXJuYWxDb3B5TWFuYWdlckV4dGVuc2lvbixcclxuICBDaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uLFxyXG4gIENvbHVtblBpY2tlckV4dGVuc2lvbixcclxuICBEcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbixcclxuICBHcmlkTWVudUV4dGVuc2lvbixcclxuICBHcm91cEl0ZW1NZXRhUHJvdmlkZXJFeHRlbnNpb24sXHJcbiAgSGVhZGVyQnV0dG9uRXh0ZW5zaW9uLFxyXG4gIEhlYWRlck1lbnVFeHRlbnNpb24sXHJcbiAgUm93RGV0YWlsVmlld0V4dGVuc2lvbixcclxuICBSb3dNb3ZlTWFuYWdlckV4dGVuc2lvbixcclxuICBSb3dTZWxlY3Rpb25FeHRlbnNpb24sXHJcbn0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9pbmRleCc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEV4dGVuc2lvblNlcnZpY2Uge1xyXG4gIGV4dGVuc2lvbkxpc3Q6IEV4dGVuc2lvbk1vZGVsW10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGF1dG9Ub29sdGlwRXh0ZW5zaW9uOiBBdXRvVG9vbHRpcEV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgY2VsbEV4dGVybmFsQ29weUV4dGVuc2lvbjogQ2VsbEV4dGVybmFsQ29weU1hbmFnZXJFeHRlbnNpb24sXHJcbiAgICBwcml2YXRlIGNoZWNrYm94U2VsZWN0b3JFeHRlbnNpb246IENoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24sXHJcbiAgICBwcml2YXRlIGNvbHVtblBpY2tlckV4dGVuc2lvbjogQ29sdW1uUGlja2VyRXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSBkcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbjogRHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24sXHJcbiAgICBwcml2YXRlIGdyaWRNZW51RXh0ZW5zaW9uOiBHcmlkTWVudUV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgZ3JvdXBJdGVtTWV0YUV4dGVuc2lvbjogR3JvdXBJdGVtTWV0YVByb3ZpZGVyRXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSBoZWFkZXJCdXR0b25FeHRlbnNpb246IEhlYWRlckJ1dHRvbkV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgaGVhZGVyTWVudUV4dGVuc2lvbjogSGVhZGVyTWVudUV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgcm93RGV0YWlsVmlld0V4dGVuc2lvbjogUm93RGV0YWlsVmlld0V4dGVuc2lvbixcclxuICAgIHByaXZhdGUgcm93TW92ZU1hbmFnZXJFeHRlbnNpb246IFJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSByb3dTZWxlY3Rpb25FeHRlbnNpb246IFJvd1NlbGVjdGlvbkV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSxcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICkgeyB9XHJcblxyXG4gIC8qKiBEaXNwb3NlIG9mIGFsbCB0aGUgY29udHJvbHMgJiBwbHVnaW5zICovXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkID0gbnVsbDtcclxuICAgIHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyA9IFtdO1xyXG5cclxuICAgIC8vIGRpc3Bvc2Ugb2YgZWFjaCBjb250cm9sL3BsdWdpbiAmIHJlc2V0IHRoZSBsaXN0XHJcbiAgICB0aGlzLmV4dGVuc2lvbkxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBpZiAoaXRlbSAmJiBpdGVtLmNsYXNzICYmIGl0ZW0uY2xhc3MuZGlzcG9zZSkge1xyXG4gICAgICAgIGl0ZW0uY2xhc3MuZGlzcG9zZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuZXh0ZW5zaW9uTGlzdCA9IFtdO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBhbGwgY29sdW1ucyAoaW5jbHVkZXMgdmlzaWJsZSBhbmQgbm9uLXZpc2libGUpICovXHJcbiAgZ2V0QWxsQ29sdW1ucygpOiBDb2x1bW5bXSB7XHJcbiAgICByZXR1cm4gdGhpcy5zaGFyZWRTZXJ2aWNlLmFsbENvbHVtbnMgfHwgW107XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IG9ubHkgdmlzaWJsZSBjb2x1bW5zICovXHJcbiAgZ2V0VmlzaWJsZUNvbHVtbnMoKTogQ29sdW1uW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyB8fCBbXTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgYWxsIEV4dGVuc2lvbnMgKi9cclxuICBnZXRBbGxFeHRlbnNpb25zKCk6IEV4dGVuc2lvbk1vZGVsW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuZXh0ZW5zaW9uTGlzdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBhbiBFeHRlbnNpb24gYnkgaXQncyBuYW1lXHJcbiAgICogIEBwYXJhbSBuYW1lXHJcbiAgICovXHJcbiAgZ2V0RXh0ZW5zaW9uQnlOYW1lKG5hbWU6IEV4dGVuc2lvbk5hbWUpOiBFeHRlbnNpb25Nb2RlbCB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5leHRlbnNpb25MaXN0LmZpbmQoKHApID0+IHAubmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGluc3RhbmNlIG9mIHRoZSBTbGlja0dyaWQgYWRkb24gKGNvbnRyb2wgb3IgcGx1Z2luKS5cclxuICAgKiBUaGlzIGlzIHRoZSByYXcgYWRkb24gY29taW5nIGRpcmVjdGx5IGZyb20gU2xpY2tHcmlkIGl0c2VsZiwgbm90IHRvIGNvbmZ1c2Ugd2l0aCBBbmd1bGFyLVNsaWNrZ3JpZCBleHRlbnNpb25cclxuICAgKiAgQHBhcmFtIG5hbWVcclxuICAgKi9cclxuICBnZXRTbGlja2dyaWRBZGRvbkluc3RhbmNlKG5hbWU6IEV4dGVuc2lvbk5hbWUpIHtcclxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IHRoaXMuZ2V0RXh0ZW5zaW9uQnlOYW1lKG5hbWUpO1xyXG4gICAgaWYgKGV4dGVuc2lvbiAmJiBleHRlbnNpb24uYWRkb24pIHtcclxuICAgICAgcmV0dXJuIGV4dGVuc2lvbi5hZGRvbjtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqIEF1dG8tcmVzaXplIGFsbCB0aGUgY29sdW1uIGluIHRoZSBncmlkIHRvIGZpdCB0aGUgZ3JpZCB3aWR0aCAqL1xyXG4gIGF1dG9SZXNpemVDb2x1bW5zKCkge1xyXG4gICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuYXV0b3NpemVDb2x1bW5zKCk7XHJcbiAgfVxyXG5cclxuICAvKiogQXR0YWNoL0NyZWF0ZSBkaWZmZXJlbnQgQ29udHJvbHMgb3IgUGx1Z2lucyBhZnRlciB0aGUgR3JpZCBpcyBjcmVhdGVkICovXHJcbiAgYXR0YWNoRGlmZmVyZW50RXh0ZW5zaW9ucygpIHtcclxuICAgIC8vIG1ha2Ugc3VyZSBhbGwgY29sdW1ucyBhcmUgdHJhbnNsYXRlZCBiZWZvcmUgY3JlYXRpbmcgQ29sdW1uUGlja2VyL0dyaWRNZW51IENvbnRyb2xzXHJcbiAgICAvLyB0aGlzIGlzIHRvIGF2b2lkIGhhdmluZyBoaWRkZW4gY29sdW1ucyBub3QgYmVpbmcgdHJhbnNsYXRlZCBvbiBmaXJzdCBsb2FkXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSkge1xyXG4gICAgICB0aGlzLnRyYW5zbGF0ZUl0ZW1zKHRoaXMuc2hhcmVkU2VydmljZS5hbGxDb2x1bW5zLCAnaGVhZGVyS2V5JywgJ25hbWUnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBdXRvIFRvb2x0aXAgUGx1Z2luXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUF1dG9Ub29sdGlwKSB7XHJcbiAgICAgIGlmICh0aGlzLmF1dG9Ub29sdGlwRXh0ZW5zaW9uICYmIHRoaXMuYXV0b1Rvb2x0aXBFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuYXV0b1Rvb2x0aXAsIGNsYXNzOiB0aGlzLmF1dG9Ub29sdGlwRXh0ZW5zaW9uLCBhZGRvbjogdGhpcy5hdXRvVG9vbHRpcEV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ29sdW1uIFBpY2tlciBDb250cm9sXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUNvbHVtblBpY2tlcikge1xyXG4gICAgICBpZiAodGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24gJiYgdGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuY29sdW1uUGlja2VyLCBjbGFzczogdGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24sIGFkZG9uOiB0aGlzLmNvbHVtblBpY2tlckV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRHJhZ2dhYmxlIEdyb3VwaW5nIFBsdWdpblxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVEcmFnZ2FibGVHcm91cGluZykge1xyXG4gICAgICBpZiAodGhpcy5kcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbiAmJiB0aGlzLmRyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLmRyYWdnYWJsZUdyb3VwaW5nLCBjbGFzczogdGhpcy5kcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbiwgYWRkb246IHRoaXMuZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEdyaWQgTWVudSBDb250cm9sXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUdyaWRNZW51KSB7XHJcbiAgICAgIGlmICh0aGlzLmdyaWRNZW51RXh0ZW5zaW9uICYmIHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuZ3JpZE1lbnUsIGNsYXNzOiB0aGlzLmdyaWRNZW51RXh0ZW5zaW9uLCBhZGRvbjogdGhpcy5ncmlkTWVudUV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR3JvdXBpbmcgUGx1Z2luICYgRHJhZ2dhYmxlIEdyb3VwaW5nIFBsdWdpblxyXG4gICAgLy8gcmVnaXN0ZXIgdGhlIGdyb3VwIGl0ZW0gbWV0YWRhdGEgcHJvdmlkZXIgdG8gYWRkIGV4cGFuZC9jb2xsYXBzZSBncm91cCBoYW5kbGVyc1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVEcmFnZ2FibGVHcm91cGluZyB8fCB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlR3JvdXBpbmcpIHtcclxuICAgICAgaWYgKHRoaXMuZ3JvdXBJdGVtTWV0YUV4dGVuc2lvbiAmJiB0aGlzLmdyb3VwSXRlbU1ldGFFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuZ3JvdXBJdGVtTWV0YVByb3ZpZGVyLCBjbGFzczogdGhpcy5ncm91cEl0ZW1NZXRhRXh0ZW5zaW9uLCBhZGRvbjogdGhpcy5ncm91cEl0ZW1NZXRhRXh0ZW5zaW9uLnJlZ2lzdGVyKCkgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVja2JveCBTZWxlY3RvciBQbHVnaW5cclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlQ2hlY2tib3hTZWxlY3Rvcikge1xyXG4gICAgICBpZiAodGhpcy5jaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uICYmIHRoaXMuY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbi5yZWdpc3Rlcikge1xyXG4gICAgICAgIGNvbnN0IHJvd1NlbGVjdGlvbkV4dGVuc2lvbiA9IHRoaXMuZ2V0RXh0ZW5zaW9uQnlOYW1lKEV4dGVuc2lvbk5hbWUucm93U2VsZWN0aW9uKTtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuY2hlY2tib3hTZWxlY3RvciwgY2xhc3M6IHRoaXMuY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbiwgYWRkb246IHRoaXMuY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbi5yZWdpc3Rlcihyb3dTZWxlY3Rpb25FeHRlbnNpb24pIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUm93IERldGFpbCBWaWV3IFBsdWdpblxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVSb3dEZXRhaWxWaWV3KSB7XHJcbiAgICAgIGlmICh0aGlzLnJvd0RldGFpbFZpZXdFeHRlbnNpb24gJiYgdGhpcy5yb3dEZXRhaWxWaWV3RXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgY29uc3Qgcm93U2VsZWN0aW9uRXh0ZW5zaW9uID0gdGhpcy5nZXRFeHRlbnNpb25CeU5hbWUoRXh0ZW5zaW9uTmFtZS5yb3dTZWxlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5yb3dEZXRhaWxWaWV3LCBjbGFzczogdGhpcy5yb3dEZXRhaWxWaWV3RXh0ZW5zaW9uLCBhZGRvbjogdGhpcy5yb3dEZXRhaWxWaWV3RXh0ZW5zaW9uLnJlZ2lzdGVyKHJvd1NlbGVjdGlvbkV4dGVuc2lvbikgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBSb3cgTW92ZSBNYW5hZ2VyIFBsdWdpblxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVSb3dNb3ZlTWFuYWdlcikge1xyXG4gICAgICBpZiAodGhpcy5yb3dNb3ZlTWFuYWdlckV4dGVuc2lvbiAmJiB0aGlzLnJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLnJvd01vdmVNYW5hZ2VyLCBjbGFzczogdGhpcy5yb3dNb3ZlTWFuYWdlckV4dGVuc2lvbiwgYWRkb246IHRoaXMucm93TW92ZU1hbmFnZXJFeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJvdyBTZWxlY3Rpb24gUGx1Z2luXHJcbiAgICBpZiAoIXRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVDaGVja2JveFNlbGVjdG9yICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVSb3dTZWxlY3Rpb24pIHtcclxuICAgICAgaWYgKHRoaXMucm93U2VsZWN0aW9uRXh0ZW5zaW9uICYmIHRoaXMucm93U2VsZWN0aW9uRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLnJvd1NlbGVjdGlvbiwgY2xhc3M6IHRoaXMucm93U2VsZWN0aW9uRXh0ZW5zaW9uLCBhZGRvbjogdGhpcy5yb3dTZWxlY3Rpb25FeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEhlYWRlciBCdXR0b24gUGx1Z2luXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUhlYWRlckJ1dHRvbikge1xyXG4gICAgICBpZiAodGhpcy5oZWFkZXJCdXR0b25FeHRlbnNpb24gJiYgdGhpcy5oZWFkZXJCdXR0b25FeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuaGVhZGVyQnV0dG9uLCBjbGFzczogdGhpcy5oZWFkZXJCdXR0b25FeHRlbnNpb24sIGFkZG9uOiB0aGlzLmhlYWRlckJ1dHRvbkV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGVhZGVyIE1lbnUgUGx1Z2luXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUhlYWRlck1lbnUpIHtcclxuICAgICAgaWYgKHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbiAmJiB0aGlzLmhlYWRlck1lbnVFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuaGVhZGVyTWVudSwgY2xhc3M6IHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbiwgYWRkb246IHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2VsbCBFeHRlcm5hbCBDb3B5IE1hbmFnZXIgUGx1Z2luIChFeGNlbCBMaWtlKVxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVFeGNlbENvcHlCdWZmZXIpIHtcclxuICAgICAgaWYgKHRoaXMuY2VsbEV4dGVybmFsQ29weUV4dGVuc2lvbiAmJiB0aGlzLmNlbGxFeHRlcm5hbENvcHlFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuY2VsbEV4dGVybmFsQ29weU1hbmFnZXIsIGNsYXNzOiB0aGlzLmNlbGxFeHRlcm5hbENvcHlFeHRlbnNpb24sIGFkZG9uOiB0aGlzLmNlbGxFeHRlcm5hbENvcHlFeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIG1hbnVhbGx5IHJlZ2lzdGVyIG90aGVyIHBsdWdpbnNcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucmVnaXN0ZXJQbHVnaW5zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJlZ2lzdGVyUGx1Z2lucykpIHtcclxuICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucmVnaXN0ZXJQbHVnaW5zLmZvckVhY2goKHBsdWdpbikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQucmVnaXN0ZXJQbHVnaW4ocGx1Z2luKTtcclxuICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5ub25hbWUsIGNsYXNzOiBudWxsLCBhZGRvbjogcGx1Z2luIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yZWdpc3RlclBsdWdpbnMpO1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5ub25hbWUsIGNsYXNzOiBudWxsLCBhZGRvbjogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJlZ2lzdGVyUGx1Z2lucyB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0YWNoL0NyZWF0ZSBjZXJ0YWluIHBsdWdpbnMgYmVmb3JlIHRoZSBHcmlkIGNyZWF0aW9uLCBlbHNlIHRoZXkgbWlnaHQgYmVoYXZlIG9kZGx5LlxyXG4gICAqIE1vc3RseSBiZWNhdXNlIHRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgbWlnaHQgY2hhbmdlIGFmdGVyIHRoZSBncmlkIGNyZWF0aW9uXHJcbiAgICogQHBhcmFtIGNvbHVtbkRlZmluaXRpb25zXHJcbiAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgKi9cclxuICBjcmVhdGVFeHRlbnNpb25zQmVmb3JlR3JpZENyZWF0aW9uKGNvbHVtbkRlZmluaXRpb25zOiBDb2x1bW5bXSwgb3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgaWYgKG9wdGlvbnMuZW5hYmxlQ2hlY2tib3hTZWxlY3Rvcikge1xyXG4gICAgICB0aGlzLmNoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24uY3JlYXRlKGNvbHVtbkRlZmluaXRpb25zLCBvcHRpb25zKTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmVuYWJsZVJvd0RldGFpbFZpZXcpIHtcclxuICAgICAgdGhpcy5yb3dEZXRhaWxWaWV3RXh0ZW5zaW9uLmNyZWF0ZShjb2x1bW5EZWZpbml0aW9ucywgb3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9ucy5lbmFibGVEcmFnZ2FibGVHcm91cGluZykge1xyXG4gICAgICBjb25zdCBwbHVnaW4gPSB0aGlzLmRyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uLmNyZWF0ZShvcHRpb25zKTtcclxuICAgICAgb3B0aW9ucy5lbmFibGVDb2x1bW5SZW9yZGVyID0gcGx1Z2luLmdldFNldHVwQ29sdW1uUmVvcmRlcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBIaWRlIGEgY29sdW1uIGZyb20gdGhlIGdyaWQgKi9cclxuICBoaWRlQ29sdW1uKGNvbHVtbjogQ29sdW1uKSB7XHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldENvbHVtbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0Q29sdW1ucykge1xyXG4gICAgICBjb25zdCBjb2x1bW5JbmRleCA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldENvbHVtbkluZGV4KGNvbHVtbi5pZCk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyA9IHRoaXMucmVtb3ZlQ29sdW1uQnlJbmRleCh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRDb2x1bW5zKCksIGNvbHVtbkluZGV4KTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0Q29sdW1ucyh0aGlzLnNoYXJlZFNlcnZpY2UudmlzaWJsZUNvbHVtbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFJlZnJlc2ggdGhlIGRhdGFzZXQgdGhyb3VnaCB0aGUgQmFja2VuZCBTZXJ2aWNlICovXHJcbiAgcmVmcmVzaEJhY2tlbmREYXRhc2V0KGdyaWRPcHRpb25zPzogR3JpZE9wdGlvbikge1xyXG4gICAgdGhpcy5ncmlkTWVudUV4dGVuc2lvbi5yZWZyZXNoQmFja2VuZERhdGFzZXQoZ3JpZE9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGEgY29sdW1uIGZyb20gdGhlIGdyaWQgYnkgaXQncyBpbmRleCBpbiB0aGUgZ3JpZFxyXG4gICAqIEBwYXJhbSBhcnJheSBpbnB1dFxyXG4gICAqIEBwYXJhbSBpbmRleFxyXG4gICAqL1xyXG4gIHJlbW92ZUNvbHVtbkJ5SW5kZXgoYXJyYXk6IGFueVtdLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gYXJyYXkuZmlsdGVyKChlbDogYW55LCBpOiBudW1iZXIpID0+IHtcclxuICAgICAgcmV0dXJuIGluZGV4ICE9PSBpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogVHJhbnNsYXRlIHRoZSBDb2x1bW4gUGlja2VyIGFuZCBpdCdzIGxhc3QgMiBjaGVja2JveGVzICovXHJcbiAgdHJhbnNsYXRlQ29sdW1uUGlja2VyKCkge1xyXG4gICAgaWYgKHRoaXMuY29sdW1uUGlja2VyRXh0ZW5zaW9uICYmIHRoaXMuY29sdW1uUGlja2VyRXh0ZW5zaW9uLnRyYW5zbGF0ZUNvbHVtblBpY2tlcikge1xyXG4gICAgICB0aGlzLmNvbHVtblBpY2tlckV4dGVuc2lvbi50cmFuc2xhdGVDb2x1bW5QaWNrZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zbGF0ZSB0aGUgSGVhZGVyIE1lbnUgdGl0bGVzLCB3ZSBuZWVkIHRvIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1uIGRlZmluaXRpb24gdG8gcmUtdHJhbnNsYXRlIHRoZW1cclxuICAgKi9cclxuICB0cmFuc2xhdGVHcmlkTWVudSgpIHtcclxuICAgIGlmICh0aGlzLmdyaWRNZW51RXh0ZW5zaW9uICYmIHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24udHJhbnNsYXRlR3JpZE1lbnUpIHtcclxuICAgICAgdGhpcy5ncmlkTWVudUV4dGVuc2lvbi50cmFuc2xhdGVHcmlkTWVudSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJhbnNsYXRlIHRoZSBIZWFkZXIgTWVudSB0aXRsZXMsIHdlIG5lZWQgdG8gbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW4gZGVmaW5pdGlvbiB0byByZS10cmFuc2xhdGUgdGhlbVxyXG4gICAqL1xyXG4gIHRyYW5zbGF0ZUhlYWRlck1lbnUoKSB7XHJcbiAgICBpZiAodGhpcy5oZWFkZXJNZW51RXh0ZW5zaW9uICYmIHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbi50cmFuc2xhdGVIZWFkZXJNZW51KSB7XHJcbiAgICAgIHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbi50cmFuc2xhdGVIZWFkZXJNZW51KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmFuc2xhdGUgbWFudWFsbHkgdGhlIGhlYWRlciB0aXRsZXMuXHJcbiAgICogV2UgY291bGQgb3B0aW9uYWxseSBwYXNzIGEgbG9jYWxlICh0aGF0IHdpbGwgY2hhbmdlIGN1cnJlbnRseSBsb2FkZWQgbG9jYWxlKSwgZWxzZSBpdCB3aWxsIHVzZSBjdXJyZW50IGxvY2FsZVxyXG4gICAqIEBwYXJhbSBsb2NhbGUgdG8gdXNlXHJcbiAgICogQHBhcmFtIG5ldyBjb2x1bW4gZGVmaW5pdGlvbnMgKG9wdGlvbmFsKVxyXG4gICAqL1xyXG4gIHRyYW5zbGF0ZUNvbHVtbkhlYWRlcnMobG9jYWxlPzogYm9vbGVhbiB8IHN0cmluZywgbmV3Q29sdW1uRGVmaW5pdGlvbnM/OiBDb2x1bW5bXSkge1xyXG4gICAgaWYgKGxvY2FsZSkge1xyXG4gICAgICB0aGlzLnRyYW5zbGF0ZS51c2UobG9jYWxlIGFzIHN0cmluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29sdW1uRGVmaW5pdGlvbnMgPSBuZXdDb2x1bW5EZWZpbml0aW9ucyB8fCB0aGlzLnNoYXJlZFNlcnZpY2UuY29sdW1uRGVmaW5pdGlvbnM7XHJcblxyXG4gICAgdGhpcy50cmFuc2xhdGVJdGVtcyhjb2x1bW5EZWZpbml0aW9ucywgJ2hlYWRlcktleScsICduYW1lJyk7XHJcbiAgICB0aGlzLnRyYW5zbGF0ZUl0ZW1zKHRoaXMuc2hhcmVkU2VydmljZS5hbGxDb2x1bW5zLCAnaGVhZGVyS2V5JywgJ25hbWUnKTtcclxuXHJcbiAgICAvLyByZS1yZW5kZXIgdGhlIGNvbHVtbiBoZWFkZXJzXHJcbiAgICB0aGlzLnJlbmRlckNvbHVtbkhlYWRlcnMoY29sdW1uRGVmaW5pdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVuZGVyIChvciByZS1yZW5kZXIpIHRoZSBjb2x1bW4gaGVhZGVycyBmcm9tIGNvbHVtbiBkZWZpbml0aW9ucy5cclxuICAgKiBjYWxsaW5nIHNldENvbHVtbnMoKSB3aWxsIHRyaWdnZXIgYSBncmlkIHJlLXJlbmRlclxyXG4gICAqL1xyXG4gIHJlbmRlckNvbHVtbkhlYWRlcnMobmV3Q29sdW1uRGVmaW5pdGlvbnM/OiBDb2x1bW5bXSkge1xyXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IG5ld0NvbHVtbkRlZmluaXRpb25zIHx8IHRoaXMuc2hhcmVkU2VydmljZS5jb2x1bW5EZWZpbml0aW9ucztcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldENvbHVtbnMpIHtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0Q29sdW1ucyhjb2xsZWN0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUcmFuc2xhdGUgdGhlIGFuIGFycmF5IG9mIGl0ZW1zIGZyb20gYW4gaW5wdXQga2V5IGFuZCBhc3NpZ24gdG8gdGhlIG91dHB1dCBrZXkgKi9cclxuICBwcml2YXRlIHRyYW5zbGF0ZUl0ZW1zKGl0ZW1zOiBhbnlbXSwgaW5wdXRLZXk6IHN0cmluZywgb3V0cHV0S2V5OiBzdHJpbmcpIHtcclxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xyXG4gICAgICBpZiAoaXRlbVtpbnB1dEtleV0pIHtcclxuICAgICAgICBpdGVtW291dHB1dEtleV0gPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KGl0ZW1baW5wdXRLZXldKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=