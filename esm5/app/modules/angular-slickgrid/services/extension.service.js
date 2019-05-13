/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// import common 3rd party SlickGrid plugins/libs
import 'slickgrid/plugins/slick.cellrangedecorator';
import 'slickgrid/plugins/slick.cellrangeselector';
import 'slickgrid/plugins/slick.cellselectionmodel';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ExtensionName, } from '../models/index';
import { AutoTooltipExtension, CellExternalCopyManagerExtension, CheckboxSelectorExtension, ColumnPickerExtension, DraggableGroupingExtension, GridMenuExtension, GroupItemMetaProviderExtension, HeaderButtonExtension, HeaderMenuExtension, RowDetailViewExtension, RowMoveManagerExtension, RowSelectionExtension, } from '../extensions/index';
import { SharedService } from './shared.service';
var ExtensionService = /** @class */ (function () {
    function ExtensionService(autoTooltipExtension, cellExternalCopyExtension, checkboxSelectorExtension, columnPickerExtension, draggableGroupingExtension, gridMenuExtension, groupItemMetaExtension, headerButtonExtension, headerMenuExtension, rowDetailViewExtension, rowMoveManagerExtension, rowSelectionExtension, sharedService, translate) {
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
    /** Dispose of all the controls & plugins */
    /**
     * Dispose of all the controls & plugins
     * @return {?}
     */
    ExtensionService.prototype.dispose = /**
     * Dispose of all the controls & plugins
     * @return {?}
     */
    function () {
        this.sharedService.grid = null;
        this.sharedService.visibleColumns = [];
        // dispose of each control/plugin & reset the list
        this.extensionList.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (item && item.class && item.class.dispose) {
                item.class.dispose();
            }
        }));
        this.extensionList = [];
    };
    /** Get all columns (includes visible and non-visible) */
    /**
     * Get all columns (includes visible and non-visible)
     * @return {?}
     */
    ExtensionService.prototype.getAllColumns = /**
     * Get all columns (includes visible and non-visible)
     * @return {?}
     */
    function () {
        return this.sharedService.allColumns || [];
    };
    /** Get only visible columns */
    /**
     * Get only visible columns
     * @return {?}
     */
    ExtensionService.prototype.getVisibleColumns = /**
     * Get only visible columns
     * @return {?}
     */
    function () {
        return this.sharedService.visibleColumns || [];
    };
    /** Get all Extensions */
    /**
     * Get all Extensions
     * @return {?}
     */
    ExtensionService.prototype.getAllExtensions = /**
     * Get all Extensions
     * @return {?}
     */
    function () {
        return this.extensionList;
    };
    /**
     * Get an Extension by it's name
     *  @param name
     */
    /**
     * Get an Extension by it's name
     * @param {?} name
     * @return {?}
     */
    ExtensionService.prototype.getExtensionByName = /**
     * Get an Extension by it's name
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return this.extensionList.find((/**
         * @param {?} p
         * @return {?}
         */
        function (p) { return p.name === name; }));
    };
    /**
     * Get the instance of the SlickGrid addon (control or plugin).
     * This is the raw addon coming directly from SlickGrid itself, not to confuse with Angular-Slickgrid extension
     *  @param name
     */
    /**
     * Get the instance of the SlickGrid addon (control or plugin).
     * This is the raw addon coming directly from SlickGrid itself, not to confuse with Angular-Slickgrid extension
     * @param {?} name
     * @return {?}
     */
    ExtensionService.prototype.getSlickgridAddonInstance = /**
     * Get the instance of the SlickGrid addon (control or plugin).
     * This is the raw addon coming directly from SlickGrid itself, not to confuse with Angular-Slickgrid extension
     * @param {?} name
     * @return {?}
     */
    function (name) {
        /** @type {?} */
        var extension = this.getExtensionByName(name);
        if (extension && extension.addon) {
            return extension.addon;
        }
        return null;
    };
    /** Auto-resize all the column in the grid to fit the grid width */
    /**
     * Auto-resize all the column in the grid to fit the grid width
     * @return {?}
     */
    ExtensionService.prototype.autoResizeColumns = /**
     * Auto-resize all the column in the grid to fit the grid width
     * @return {?}
     */
    function () {
        this.sharedService.grid.autosizeColumns();
    };
    /** Attach/Create different Controls or Plugins after the Grid is created */
    /**
     * Attach/Create different Controls or Plugins after the Grid is created
     * @return {?}
     */
    ExtensionService.prototype.attachDifferentExtensions = /**
     * Attach/Create different Controls or Plugins after the Grid is created
     * @return {?}
     */
    function () {
        var _this = this;
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
                var rowSelectionExtension = this.getExtensionByName(ExtensionName.rowSelection);
                this.extensionList.push({ name: ExtensionName.checkboxSelector, class: this.checkboxSelectorExtension, addon: this.checkboxSelectorExtension.register(rowSelectionExtension) });
            }
        }
        // Row Detail View Plugin
        if (this.sharedService.gridOptions.enableRowDetailView) {
            if (this.rowDetailViewExtension && this.rowDetailViewExtension.register) {
                /** @type {?} */
                var rowSelectionExtension = this.getExtensionByName(ExtensionName.rowSelection);
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
                function (plugin) {
                    _this.sharedService.grid.registerPlugin(plugin);
                    _this.extensionList.push({ name: ExtensionName.noname, class: null, addon: plugin });
                }));
            }
            else {
                this.sharedService.grid.registerPlugin(this.sharedService.gridOptions.registerPlugins);
                this.extensionList.push({ name: ExtensionName.noname, class: null, addon: this.sharedService.gridOptions.registerPlugins });
            }
        }
    };
    /**
     * Attach/Create certain plugins before the Grid creation, else they might behave oddly.
     * Mostly because the column definitions might change after the grid creation
     * @param columnDefinitions
     * @param options
     */
    /**
     * Attach/Create certain plugins before the Grid creation, else they might behave oddly.
     * Mostly because the column definitions might change after the grid creation
     * @param {?} columnDefinitions
     * @param {?} options
     * @return {?}
     */
    ExtensionService.prototype.createExtensionsBeforeGridCreation = /**
     * Attach/Create certain plugins before the Grid creation, else they might behave oddly.
     * Mostly because the column definitions might change after the grid creation
     * @param {?} columnDefinitions
     * @param {?} options
     * @return {?}
     */
    function (columnDefinitions, options) {
        if (options.enableCheckboxSelector) {
            this.checkboxSelectorExtension.create(columnDefinitions, options);
        }
        if (options.enableRowDetailView) {
            this.rowDetailViewExtension.create(columnDefinitions, options);
        }
        if (options.enableDraggableGrouping) {
            /** @type {?} */
            var plugin = this.draggableGroupingExtension.create(options);
            options.enableColumnReorder = plugin.getSetupColumnReorder;
        }
    };
    /** Hide a column from the grid */
    /**
     * Hide a column from the grid
     * @param {?} column
     * @return {?}
     */
    ExtensionService.prototype.hideColumn = /**
     * Hide a column from the grid
     * @param {?} column
     * @return {?}
     */
    function (column) {
        if (this.sharedService && this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
            /** @type {?} */
            var columnIndex = this.sharedService.grid.getColumnIndex(column.id);
            this.sharedService.visibleColumns = this.removeColumnByIndex(this.sharedService.grid.getColumns(), columnIndex);
            this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
        }
    };
    /** Refresh the dataset through the Backend Service */
    /**
     * Refresh the dataset through the Backend Service
     * @param {?=} gridOptions
     * @return {?}
     */
    ExtensionService.prototype.refreshBackendDataset = /**
     * Refresh the dataset through the Backend Service
     * @param {?=} gridOptions
     * @return {?}
     */
    function (gridOptions) {
        this.gridMenuExtension.refreshBackendDataset(gridOptions);
    };
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
    ExtensionService.prototype.removeColumnByIndex = /**
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
    /** Translate the Column Picker and it's last 2 checkboxes */
    /**
     * Translate the Column Picker and it's last 2 checkboxes
     * @return {?}
     */
    ExtensionService.prototype.translateColumnPicker = /**
     * Translate the Column Picker and it's last 2 checkboxes
     * @return {?}
     */
    function () {
        if (this.columnPickerExtension && this.columnPickerExtension.translateColumnPicker) {
            this.columnPickerExtension.translateColumnPicker();
        }
    };
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     */
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    ExtensionService.prototype.translateGridMenu = /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    function () {
        if (this.gridMenuExtension && this.gridMenuExtension.translateGridMenu) {
            this.gridMenuExtension.translateGridMenu();
        }
    };
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     */
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    ExtensionService.prototype.translateHeaderMenu = /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    function () {
        if (this.headerMenuExtension && this.headerMenuExtension.translateHeaderMenu) {
            this.headerMenuExtension.translateHeaderMenu();
        }
    };
    /**
     * Translate manually the header titles.
     * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
     * @param locale to use
     * @param new column definitions (optional)
     */
    /**
     * Translate manually the header titles.
     * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
     * @param {?=} locale to use
     * @param {?=} newColumnDefinitions
     * @return {?}
     */
    ExtensionService.prototype.translateColumnHeaders = /**
     * Translate manually the header titles.
     * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
     * @param {?=} locale to use
     * @param {?=} newColumnDefinitions
     * @return {?}
     */
    function (locale, newColumnDefinitions) {
        if (locale) {
            this.translate.use((/** @type {?} */ (locale)));
        }
        /** @type {?} */
        var columnDefinitions = newColumnDefinitions || this.sharedService.columnDefinitions;
        this.translateItems(columnDefinitions, 'headerKey', 'name');
        this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
        // re-render the column headers
        this.renderColumnHeaders(columnDefinitions);
    };
    /**
     * Render (or re-render) the column headers from column definitions.
     * calling setColumns() will trigger a grid re-render
     */
    /**
     * Render (or re-render) the column headers from column definitions.
     * calling setColumns() will trigger a grid re-render
     * @param {?=} newColumnDefinitions
     * @return {?}
     */
    ExtensionService.prototype.renderColumnHeaders = /**
     * Render (or re-render) the column headers from column definitions.
     * calling setColumns() will trigger a grid re-render
     * @param {?=} newColumnDefinitions
     * @return {?}
     */
    function (newColumnDefinitions) {
        /** @type {?} */
        var collection = newColumnDefinitions || this.sharedService.columnDefinitions;
        if (Array.isArray(collection) && this.sharedService.grid && this.sharedService.grid.setColumns) {
            this.sharedService.grid.setColumns(collection);
        }
    };
    /** Translate the an array of items from an input key and assign to the output key */
    /**
     * Translate the an array of items from an input key and assign to the output key
     * @private
     * @param {?} items
     * @param {?} inputKey
     * @param {?} outputKey
     * @return {?}
     */
    ExtensionService.prototype.translateItems = /**
     * Translate the an array of items from an input key and assign to the output key
     * @private
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
    ExtensionService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ExtensionService.ctorParameters = function () { return [
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
    ]; };
    return ExtensionService;
}());
export { ExtensionService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2V4dGVuc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sNENBQTRDLENBQUM7QUFDcEQsT0FBTywyQ0FBMkMsQ0FBQztBQUNuRCxPQUFPLDRDQUE0QyxDQUFDO0FBRXBELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUdMLGFBQWEsR0FFZCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsZ0NBQWdDLEVBQ2hDLHlCQUF5QixFQUN6QixxQkFBcUIsRUFDckIsMEJBQTBCLEVBQzFCLGlCQUFpQixFQUNqQiw4QkFBOEIsRUFDOUIscUJBQXFCLEVBQ3JCLG1CQUFtQixFQUNuQixzQkFBc0IsRUFDdEIsdUJBQXVCLEVBQ3ZCLHFCQUFxQixHQUN0QixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRDtJQUlFLDBCQUNVLG9CQUEwQyxFQUMxQyx5QkFBMkQsRUFDM0QseUJBQW9ELEVBQ3BELHFCQUE0QyxFQUM1QywwQkFBc0QsRUFDdEQsaUJBQW9DLEVBQ3BDLHNCQUFzRCxFQUN0RCxxQkFBNEMsRUFDNUMsbUJBQXdDLEVBQ3hDLHNCQUE4QyxFQUM5Qyx1QkFBZ0QsRUFDaEQscUJBQTRDLEVBQzVDLGFBQTRCLEVBQzVCLFNBQTJCO1FBYjNCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUFrQztRQUMzRCw4QkFBeUIsR0FBekIseUJBQXlCLENBQTJC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QUMsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDMUQ7YUFDRjs7Ozs7Ozs7O0lBQ0gsQ0FBQzs7Z0JBcFNGLFVBQVU7Ozs7Z0JBZlQsb0JBQW9CO2dCQUNwQixnQ0FBZ0M7Z0JBQ2hDLHlCQUF5QjtnQkFDekIscUJBQXFCO2dCQUNyQiwwQkFBMEI7Z0JBQzFCLGlCQUFpQjtnQkFDakIsOEJBQThCO2dCQUM5QixxQkFBcUI7Z0JBQ3JCLG1CQUFtQjtnQkFDbkIsc0JBQXNCO2dCQUN0Qix1QkFBdUI7Z0JBQ3ZCLHFCQUFxQjtnQkFFZCxhQUFhO2dCQXJCYixnQkFBZ0I7O0lBNFR6Qix1QkFBQztDQUFBLEFBclNELElBcVNDO1NBcFNZLGdCQUFnQjs7O0lBQzNCLHlDQUFxQzs7Ozs7SUFHbkMsZ0RBQWtEOzs7OztJQUNsRCxxREFBbUU7Ozs7O0lBQ25FLHFEQUE0RDs7Ozs7SUFDNUQsaURBQW9EOzs7OztJQUNwRCxzREFBOEQ7Ozs7O0lBQzlELDZDQUE0Qzs7Ozs7SUFDNUMsa0RBQThEOzs7OztJQUM5RCxpREFBb0Q7Ozs7O0lBQ3BELCtDQUFnRDs7Ozs7SUFDaEQsa0RBQXNEOzs7OztJQUN0RCxtREFBd0Q7Ozs7O0lBQ3hELGlEQUFvRDs7Ozs7SUFDcEQseUNBQW9DOzs7OztJQUNwQyxxQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgY29tbW9uIDNyZCBwYXJ0eSBTbGlja0dyaWQgcGx1Z2lucy9saWJzXHJcbmltcG9ydCAnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suY2VsbHJhbmdlZGVjb3JhdG9yJztcclxuaW1wb3J0ICdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5jZWxscmFuZ2VzZWxlY3Rvcic7XHJcbmltcG9ydCAnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suY2VsbHNlbGVjdGlvbm1vZGVsJztcclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENvbHVtbixcclxuICBFeHRlbnNpb25Nb2RlbCxcclxuICBFeHRlbnNpb25OYW1lLFxyXG4gIEdyaWRPcHRpb24sXHJcbn0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHtcclxuICBBdXRvVG9vbHRpcEV4dGVuc2lvbixcclxuICBDZWxsRXh0ZXJuYWxDb3B5TWFuYWdlckV4dGVuc2lvbixcclxuICBDaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uLFxyXG4gIENvbHVtblBpY2tlckV4dGVuc2lvbixcclxuICBEcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbixcclxuICBHcmlkTWVudUV4dGVuc2lvbixcclxuICBHcm91cEl0ZW1NZXRhUHJvdmlkZXJFeHRlbnNpb24sXHJcbiAgSGVhZGVyQnV0dG9uRXh0ZW5zaW9uLFxyXG4gIEhlYWRlck1lbnVFeHRlbnNpb24sXHJcbiAgUm93RGV0YWlsVmlld0V4dGVuc2lvbixcclxuICBSb3dNb3ZlTWFuYWdlckV4dGVuc2lvbixcclxuICBSb3dTZWxlY3Rpb25FeHRlbnNpb24sXHJcbn0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9pbmRleCc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEV4dGVuc2lvblNlcnZpY2Uge1xyXG4gIGV4dGVuc2lvbkxpc3Q6IEV4dGVuc2lvbk1vZGVsW10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGF1dG9Ub29sdGlwRXh0ZW5zaW9uOiBBdXRvVG9vbHRpcEV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgY2VsbEV4dGVybmFsQ29weUV4dGVuc2lvbjogQ2VsbEV4dGVybmFsQ29weU1hbmFnZXJFeHRlbnNpb24sXHJcbiAgICBwcml2YXRlIGNoZWNrYm94U2VsZWN0b3JFeHRlbnNpb246IENoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24sXHJcbiAgICBwcml2YXRlIGNvbHVtblBpY2tlckV4dGVuc2lvbjogQ29sdW1uUGlja2VyRXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSBkcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbjogRHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24sXHJcbiAgICBwcml2YXRlIGdyaWRNZW51RXh0ZW5zaW9uOiBHcmlkTWVudUV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgZ3JvdXBJdGVtTWV0YUV4dGVuc2lvbjogR3JvdXBJdGVtTWV0YVByb3ZpZGVyRXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSBoZWFkZXJCdXR0b25FeHRlbnNpb246IEhlYWRlckJ1dHRvbkV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgaGVhZGVyTWVudUV4dGVuc2lvbjogSGVhZGVyTWVudUV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgcm93RGV0YWlsVmlld0V4dGVuc2lvbjogUm93RGV0YWlsVmlld0V4dGVuc2lvbixcclxuICAgIHByaXZhdGUgcm93TW92ZU1hbmFnZXJFeHRlbnNpb246IFJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSByb3dTZWxlY3Rpb25FeHRlbnNpb246IFJvd1NlbGVjdGlvbkV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSxcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICkgeyB9XHJcblxyXG4gIC8qKiBEaXNwb3NlIG9mIGFsbCB0aGUgY29udHJvbHMgJiBwbHVnaW5zICovXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkID0gbnVsbDtcclxuICAgIHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyA9IFtdO1xyXG5cclxuICAgIC8vIGRpc3Bvc2Ugb2YgZWFjaCBjb250cm9sL3BsdWdpbiAmIHJlc2V0IHRoZSBsaXN0XHJcbiAgICB0aGlzLmV4dGVuc2lvbkxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBpZiAoaXRlbSAmJiBpdGVtLmNsYXNzICYmIGl0ZW0uY2xhc3MuZGlzcG9zZSkge1xyXG4gICAgICAgIGl0ZW0uY2xhc3MuZGlzcG9zZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuZXh0ZW5zaW9uTGlzdCA9IFtdO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBhbGwgY29sdW1ucyAoaW5jbHVkZXMgdmlzaWJsZSBhbmQgbm9uLXZpc2libGUpICovXHJcbiAgZ2V0QWxsQ29sdW1ucygpOiBDb2x1bW5bXSB7XHJcbiAgICByZXR1cm4gdGhpcy5zaGFyZWRTZXJ2aWNlLmFsbENvbHVtbnMgfHwgW107XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IG9ubHkgdmlzaWJsZSBjb2x1bW5zICovXHJcbiAgZ2V0VmlzaWJsZUNvbHVtbnMoKTogQ29sdW1uW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyB8fCBbXTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgYWxsIEV4dGVuc2lvbnMgKi9cclxuICBnZXRBbGxFeHRlbnNpb25zKCk6IEV4dGVuc2lvbk1vZGVsW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuZXh0ZW5zaW9uTGlzdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBhbiBFeHRlbnNpb24gYnkgaXQncyBuYW1lXHJcbiAgICogIEBwYXJhbSBuYW1lXHJcbiAgICovXHJcbiAgZ2V0RXh0ZW5zaW9uQnlOYW1lKG5hbWU6IEV4dGVuc2lvbk5hbWUpOiBFeHRlbnNpb25Nb2RlbCB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5leHRlbnNpb25MaXN0LmZpbmQoKHApID0+IHAubmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGluc3RhbmNlIG9mIHRoZSBTbGlja0dyaWQgYWRkb24gKGNvbnRyb2wgb3IgcGx1Z2luKS5cclxuICAgKiBUaGlzIGlzIHRoZSByYXcgYWRkb24gY29taW5nIGRpcmVjdGx5IGZyb20gU2xpY2tHcmlkIGl0c2VsZiwgbm90IHRvIGNvbmZ1c2Ugd2l0aCBBbmd1bGFyLVNsaWNrZ3JpZCBleHRlbnNpb25cclxuICAgKiAgQHBhcmFtIG5hbWVcclxuICAgKi9cclxuICBnZXRTbGlja2dyaWRBZGRvbkluc3RhbmNlKG5hbWU6IEV4dGVuc2lvbk5hbWUpIHtcclxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IHRoaXMuZ2V0RXh0ZW5zaW9uQnlOYW1lKG5hbWUpO1xyXG4gICAgaWYgKGV4dGVuc2lvbiAmJiBleHRlbnNpb24uYWRkb24pIHtcclxuICAgICAgcmV0dXJuIGV4dGVuc2lvbi5hZGRvbjtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqIEF1dG8tcmVzaXplIGFsbCB0aGUgY29sdW1uIGluIHRoZSBncmlkIHRvIGZpdCB0aGUgZ3JpZCB3aWR0aCAqL1xyXG4gIGF1dG9SZXNpemVDb2x1bW5zKCkge1xyXG4gICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuYXV0b3NpemVDb2x1bW5zKCk7XHJcbiAgfVxyXG5cclxuICAvKiogQXR0YWNoL0NyZWF0ZSBkaWZmZXJlbnQgQ29udHJvbHMgb3IgUGx1Z2lucyBhZnRlciB0aGUgR3JpZCBpcyBjcmVhdGVkICovXHJcbiAgYXR0YWNoRGlmZmVyZW50RXh0ZW5zaW9ucygpIHtcclxuICAgIC8vIG1ha2Ugc3VyZSBhbGwgY29sdW1ucyBhcmUgdHJhbnNsYXRlZCBiZWZvcmUgY3JlYXRpbmcgQ29sdW1uUGlja2VyL0dyaWRNZW51IENvbnRyb2xzXHJcbiAgICAvLyB0aGlzIGlzIHRvIGF2b2lkIGhhdmluZyBoaWRkZW4gY29sdW1ucyBub3QgYmVpbmcgdHJhbnNsYXRlZCBvbiBmaXJzdCBsb2FkXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSkge1xyXG4gICAgICB0aGlzLnRyYW5zbGF0ZUl0ZW1zKHRoaXMuc2hhcmVkU2VydmljZS5hbGxDb2x1bW5zLCAnaGVhZGVyS2V5JywgJ25hbWUnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBdXRvIFRvb2x0aXAgUGx1Z2luXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUF1dG9Ub29sdGlwKSB7XHJcbiAgICAgIGlmICh0aGlzLmF1dG9Ub29sdGlwRXh0ZW5zaW9uICYmIHRoaXMuYXV0b1Rvb2x0aXBFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuYXV0b1Rvb2x0aXAsIGNsYXNzOiB0aGlzLmF1dG9Ub29sdGlwRXh0ZW5zaW9uLCBhZGRvbjogdGhpcy5hdXRvVG9vbHRpcEV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ29sdW1uIFBpY2tlciBDb250cm9sXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUNvbHVtblBpY2tlcikge1xyXG4gICAgICBpZiAodGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24gJiYgdGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuY29sdW1uUGlja2VyLCBjbGFzczogdGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24sIGFkZG9uOiB0aGlzLmNvbHVtblBpY2tlckV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRHJhZ2dhYmxlIEdyb3VwaW5nIFBsdWdpblxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVEcmFnZ2FibGVHcm91cGluZykge1xyXG4gICAgICBpZiAodGhpcy5kcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbiAmJiB0aGlzLmRyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLmRyYWdnYWJsZUdyb3VwaW5nLCBjbGFzczogdGhpcy5kcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbiwgYWRkb246IHRoaXMuZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEdyaWQgTWVudSBDb250cm9sXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUdyaWRNZW51KSB7XHJcbiAgICAgIGlmICh0aGlzLmdyaWRNZW51RXh0ZW5zaW9uICYmIHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuZ3JpZE1lbnUsIGNsYXNzOiB0aGlzLmdyaWRNZW51RXh0ZW5zaW9uLCBhZGRvbjogdGhpcy5ncmlkTWVudUV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR3JvdXBpbmcgUGx1Z2luICYgRHJhZ2dhYmxlIEdyb3VwaW5nIFBsdWdpblxyXG4gICAgLy8gcmVnaXN0ZXIgdGhlIGdyb3VwIGl0ZW0gbWV0YWRhdGEgcHJvdmlkZXIgdG8gYWRkIGV4cGFuZC9jb2xsYXBzZSBncm91cCBoYW5kbGVyc1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVEcmFnZ2FibGVHcm91cGluZyB8fCB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlR3JvdXBpbmcpIHtcclxuICAgICAgaWYgKHRoaXMuZ3JvdXBJdGVtTWV0YUV4dGVuc2lvbiAmJiB0aGlzLmdyb3VwSXRlbU1ldGFFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuZ3JvdXBJdGVtTWV0YVByb3ZpZGVyLCBjbGFzczogdGhpcy5ncm91cEl0ZW1NZXRhRXh0ZW5zaW9uLCBhZGRvbjogdGhpcy5ncm91cEl0ZW1NZXRhRXh0ZW5zaW9uLnJlZ2lzdGVyKCkgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVja2JveCBTZWxlY3RvciBQbHVnaW5cclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlQ2hlY2tib3hTZWxlY3Rvcikge1xyXG4gICAgICBpZiAodGhpcy5jaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uICYmIHRoaXMuY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbi5yZWdpc3Rlcikge1xyXG4gICAgICAgIGNvbnN0IHJvd1NlbGVjdGlvbkV4dGVuc2lvbiA9IHRoaXMuZ2V0RXh0ZW5zaW9uQnlOYW1lKEV4dGVuc2lvbk5hbWUucm93U2VsZWN0aW9uKTtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuY2hlY2tib3hTZWxlY3RvciwgY2xhc3M6IHRoaXMuY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbiwgYWRkb246IHRoaXMuY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbi5yZWdpc3Rlcihyb3dTZWxlY3Rpb25FeHRlbnNpb24pIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUm93IERldGFpbCBWaWV3IFBsdWdpblxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVSb3dEZXRhaWxWaWV3KSB7XHJcbiAgICAgIGlmICh0aGlzLnJvd0RldGFpbFZpZXdFeHRlbnNpb24gJiYgdGhpcy5yb3dEZXRhaWxWaWV3RXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgY29uc3Qgcm93U2VsZWN0aW9uRXh0ZW5zaW9uID0gdGhpcy5nZXRFeHRlbnNpb25CeU5hbWUoRXh0ZW5zaW9uTmFtZS5yb3dTZWxlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5yb3dEZXRhaWxWaWV3LCBjbGFzczogdGhpcy5yb3dEZXRhaWxWaWV3RXh0ZW5zaW9uLCBhZGRvbjogdGhpcy5yb3dEZXRhaWxWaWV3RXh0ZW5zaW9uLnJlZ2lzdGVyKHJvd1NlbGVjdGlvbkV4dGVuc2lvbikgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBSb3cgTW92ZSBNYW5hZ2VyIFBsdWdpblxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVSb3dNb3ZlTWFuYWdlcikge1xyXG4gICAgICBpZiAodGhpcy5yb3dNb3ZlTWFuYWdlckV4dGVuc2lvbiAmJiB0aGlzLnJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLnJvd01vdmVNYW5hZ2VyLCBjbGFzczogdGhpcy5yb3dNb3ZlTWFuYWdlckV4dGVuc2lvbiwgYWRkb246IHRoaXMucm93TW92ZU1hbmFnZXJFeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJvdyBTZWxlY3Rpb24gUGx1Z2luXHJcbiAgICBpZiAoIXRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVDaGVja2JveFNlbGVjdG9yICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVSb3dTZWxlY3Rpb24pIHtcclxuICAgICAgaWYgKHRoaXMucm93U2VsZWN0aW9uRXh0ZW5zaW9uICYmIHRoaXMucm93U2VsZWN0aW9uRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLnJvd1NlbGVjdGlvbiwgY2xhc3M6IHRoaXMucm93U2VsZWN0aW9uRXh0ZW5zaW9uLCBhZGRvbjogdGhpcy5yb3dTZWxlY3Rpb25FeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEhlYWRlciBCdXR0b24gUGx1Z2luXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUhlYWRlckJ1dHRvbikge1xyXG4gICAgICBpZiAodGhpcy5oZWFkZXJCdXR0b25FeHRlbnNpb24gJiYgdGhpcy5oZWFkZXJCdXR0b25FeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuaGVhZGVyQnV0dG9uLCBjbGFzczogdGhpcy5oZWFkZXJCdXR0b25FeHRlbnNpb24sIGFkZG9uOiB0aGlzLmhlYWRlckJ1dHRvbkV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGVhZGVyIE1lbnUgUGx1Z2luXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUhlYWRlck1lbnUpIHtcclxuICAgICAgaWYgKHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbiAmJiB0aGlzLmhlYWRlck1lbnVFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuaGVhZGVyTWVudSwgY2xhc3M6IHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbiwgYWRkb246IHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2VsbCBFeHRlcm5hbCBDb3B5IE1hbmFnZXIgUGx1Z2luIChFeGNlbCBMaWtlKVxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVFeGNlbENvcHlCdWZmZXIpIHtcclxuICAgICAgaWYgKHRoaXMuY2VsbEV4dGVybmFsQ29weUV4dGVuc2lvbiAmJiB0aGlzLmNlbGxFeHRlcm5hbENvcHlFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuY2VsbEV4dGVybmFsQ29weU1hbmFnZXIsIGNsYXNzOiB0aGlzLmNlbGxFeHRlcm5hbENvcHlFeHRlbnNpb24sIGFkZG9uOiB0aGlzLmNlbGxFeHRlcm5hbENvcHlFeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIG1hbnVhbGx5IHJlZ2lzdGVyIG90aGVyIHBsdWdpbnNcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucmVnaXN0ZXJQbHVnaW5zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJlZ2lzdGVyUGx1Z2lucykpIHtcclxuICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucmVnaXN0ZXJQbHVnaW5zLmZvckVhY2goKHBsdWdpbikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQucmVnaXN0ZXJQbHVnaW4ocGx1Z2luKTtcclxuICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5ub25hbWUsIGNsYXNzOiBudWxsLCBhZGRvbjogcGx1Z2luIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yZWdpc3RlclBsdWdpbnMpO1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5ub25hbWUsIGNsYXNzOiBudWxsLCBhZGRvbjogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJlZ2lzdGVyUGx1Z2lucyB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0YWNoL0NyZWF0ZSBjZXJ0YWluIHBsdWdpbnMgYmVmb3JlIHRoZSBHcmlkIGNyZWF0aW9uLCBlbHNlIHRoZXkgbWlnaHQgYmVoYXZlIG9kZGx5LlxyXG4gICAqIE1vc3RseSBiZWNhdXNlIHRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgbWlnaHQgY2hhbmdlIGFmdGVyIHRoZSBncmlkIGNyZWF0aW9uXHJcbiAgICogQHBhcmFtIGNvbHVtbkRlZmluaXRpb25zXHJcbiAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgKi9cclxuICBjcmVhdGVFeHRlbnNpb25zQmVmb3JlR3JpZENyZWF0aW9uKGNvbHVtbkRlZmluaXRpb25zOiBDb2x1bW5bXSwgb3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgaWYgKG9wdGlvbnMuZW5hYmxlQ2hlY2tib3hTZWxlY3Rvcikge1xyXG4gICAgICB0aGlzLmNoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24uY3JlYXRlKGNvbHVtbkRlZmluaXRpb25zLCBvcHRpb25zKTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmVuYWJsZVJvd0RldGFpbFZpZXcpIHtcclxuICAgICAgdGhpcy5yb3dEZXRhaWxWaWV3RXh0ZW5zaW9uLmNyZWF0ZShjb2x1bW5EZWZpbml0aW9ucywgb3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9ucy5lbmFibGVEcmFnZ2FibGVHcm91cGluZykge1xyXG4gICAgICBjb25zdCBwbHVnaW4gPSB0aGlzLmRyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uLmNyZWF0ZShvcHRpb25zKTtcclxuICAgICAgb3B0aW9ucy5lbmFibGVDb2x1bW5SZW9yZGVyID0gcGx1Z2luLmdldFNldHVwQ29sdW1uUmVvcmRlcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBIaWRlIGEgY29sdW1uIGZyb20gdGhlIGdyaWQgKi9cclxuICBoaWRlQ29sdW1uKGNvbHVtbjogQ29sdW1uKSB7XHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldENvbHVtbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0Q29sdW1ucykge1xyXG4gICAgICBjb25zdCBjb2x1bW5JbmRleCA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldENvbHVtbkluZGV4KGNvbHVtbi5pZCk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyA9IHRoaXMucmVtb3ZlQ29sdW1uQnlJbmRleCh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRDb2x1bW5zKCksIGNvbHVtbkluZGV4KTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0Q29sdW1ucyh0aGlzLnNoYXJlZFNlcnZpY2UudmlzaWJsZUNvbHVtbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFJlZnJlc2ggdGhlIGRhdGFzZXQgdGhyb3VnaCB0aGUgQmFja2VuZCBTZXJ2aWNlICovXHJcbiAgcmVmcmVzaEJhY2tlbmREYXRhc2V0KGdyaWRPcHRpb25zPzogR3JpZE9wdGlvbikge1xyXG4gICAgdGhpcy5ncmlkTWVudUV4dGVuc2lvbi5yZWZyZXNoQmFja2VuZERhdGFzZXQoZ3JpZE9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGEgY29sdW1uIGZyb20gdGhlIGdyaWQgYnkgaXQncyBpbmRleCBpbiB0aGUgZ3JpZFxyXG4gICAqIEBwYXJhbSBhcnJheSBpbnB1dFxyXG4gICAqIEBwYXJhbSBpbmRleFxyXG4gICAqL1xyXG4gIHJlbW92ZUNvbHVtbkJ5SW5kZXgoYXJyYXk6IGFueVtdLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gYXJyYXkuZmlsdGVyKChlbDogYW55LCBpOiBudW1iZXIpID0+IHtcclxuICAgICAgcmV0dXJuIGluZGV4ICE9PSBpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogVHJhbnNsYXRlIHRoZSBDb2x1bW4gUGlja2VyIGFuZCBpdCdzIGxhc3QgMiBjaGVja2JveGVzICovXHJcbiAgdHJhbnNsYXRlQ29sdW1uUGlja2VyKCkge1xyXG4gICAgaWYgKHRoaXMuY29sdW1uUGlja2VyRXh0ZW5zaW9uICYmIHRoaXMuY29sdW1uUGlja2VyRXh0ZW5zaW9uLnRyYW5zbGF0ZUNvbHVtblBpY2tlcikge1xyXG4gICAgICB0aGlzLmNvbHVtblBpY2tlckV4dGVuc2lvbi50cmFuc2xhdGVDb2x1bW5QaWNrZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zbGF0ZSB0aGUgSGVhZGVyIE1lbnUgdGl0bGVzLCB3ZSBuZWVkIHRvIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1uIGRlZmluaXRpb24gdG8gcmUtdHJhbnNsYXRlIHRoZW1cclxuICAgKi9cclxuICB0cmFuc2xhdGVHcmlkTWVudSgpIHtcclxuICAgIGlmICh0aGlzLmdyaWRNZW51RXh0ZW5zaW9uICYmIHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24udHJhbnNsYXRlR3JpZE1lbnUpIHtcclxuICAgICAgdGhpcy5ncmlkTWVudUV4dGVuc2lvbi50cmFuc2xhdGVHcmlkTWVudSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJhbnNsYXRlIHRoZSBIZWFkZXIgTWVudSB0aXRsZXMsIHdlIG5lZWQgdG8gbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW4gZGVmaW5pdGlvbiB0byByZS10cmFuc2xhdGUgdGhlbVxyXG4gICAqL1xyXG4gIHRyYW5zbGF0ZUhlYWRlck1lbnUoKSB7XHJcbiAgICBpZiAodGhpcy5oZWFkZXJNZW51RXh0ZW5zaW9uICYmIHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbi50cmFuc2xhdGVIZWFkZXJNZW51KSB7XHJcbiAgICAgIHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbi50cmFuc2xhdGVIZWFkZXJNZW51KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmFuc2xhdGUgbWFudWFsbHkgdGhlIGhlYWRlciB0aXRsZXMuXHJcbiAgICogV2UgY291bGQgb3B0aW9uYWxseSBwYXNzIGEgbG9jYWxlICh0aGF0IHdpbGwgY2hhbmdlIGN1cnJlbnRseSBsb2FkZWQgbG9jYWxlKSwgZWxzZSBpdCB3aWxsIHVzZSBjdXJyZW50IGxvY2FsZVxyXG4gICAqIEBwYXJhbSBsb2NhbGUgdG8gdXNlXHJcbiAgICogQHBhcmFtIG5ldyBjb2x1bW4gZGVmaW5pdGlvbnMgKG9wdGlvbmFsKVxyXG4gICAqL1xyXG4gIHRyYW5zbGF0ZUNvbHVtbkhlYWRlcnMobG9jYWxlPzogYm9vbGVhbiB8IHN0cmluZywgbmV3Q29sdW1uRGVmaW5pdGlvbnM/OiBDb2x1bW5bXSkge1xyXG4gICAgaWYgKGxvY2FsZSkge1xyXG4gICAgICB0aGlzLnRyYW5zbGF0ZS51c2UobG9jYWxlIGFzIHN0cmluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29sdW1uRGVmaW5pdGlvbnMgPSBuZXdDb2x1bW5EZWZpbml0aW9ucyB8fCB0aGlzLnNoYXJlZFNlcnZpY2UuY29sdW1uRGVmaW5pdGlvbnM7XHJcblxyXG4gICAgdGhpcy50cmFuc2xhdGVJdGVtcyhjb2x1bW5EZWZpbml0aW9ucywgJ2hlYWRlcktleScsICduYW1lJyk7XHJcbiAgICB0aGlzLnRyYW5zbGF0ZUl0ZW1zKHRoaXMuc2hhcmVkU2VydmljZS5hbGxDb2x1bW5zLCAnaGVhZGVyS2V5JywgJ25hbWUnKTtcclxuXHJcbiAgICAvLyByZS1yZW5kZXIgdGhlIGNvbHVtbiBoZWFkZXJzXHJcbiAgICB0aGlzLnJlbmRlckNvbHVtbkhlYWRlcnMoY29sdW1uRGVmaW5pdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVuZGVyIChvciByZS1yZW5kZXIpIHRoZSBjb2x1bW4gaGVhZGVycyBmcm9tIGNvbHVtbiBkZWZpbml0aW9ucy5cclxuICAgKiBjYWxsaW5nIHNldENvbHVtbnMoKSB3aWxsIHRyaWdnZXIgYSBncmlkIHJlLXJlbmRlclxyXG4gICAqL1xyXG4gIHJlbmRlckNvbHVtbkhlYWRlcnMobmV3Q29sdW1uRGVmaW5pdGlvbnM/OiBDb2x1bW5bXSkge1xyXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IG5ld0NvbHVtbkRlZmluaXRpb25zIHx8IHRoaXMuc2hhcmVkU2VydmljZS5jb2x1bW5EZWZpbml0aW9ucztcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldENvbHVtbnMpIHtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0Q29sdW1ucyhjb2xsZWN0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUcmFuc2xhdGUgdGhlIGFuIGFycmF5IG9mIGl0ZW1zIGZyb20gYW4gaW5wdXQga2V5IGFuZCBhc3NpZ24gdG8gdGhlIG91dHB1dCBrZXkgKi9cclxuICBwcml2YXRlIHRyYW5zbGF0ZUl0ZW1zKGl0ZW1zOiBhbnlbXSwgaW5wdXRLZXk6IHN0cmluZywgb3V0cHV0S2V5OiBzdHJpbmcpIHtcclxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xyXG4gICAgICBpZiAoaXRlbVtpbnB1dEtleV0pIHtcclxuICAgICAgICBpdGVtW291dHB1dEtleV0gPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KGl0ZW1baW5wdXRLZXldKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=