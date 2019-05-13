/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import { DelimiterType, ExtensionName, FileType, } from '../models';
import { ExportService } from '../services/export.service';
import { ExtensionUtility } from './extensionUtility';
import { FilterService } from '../services/filter.service';
import { SortService } from '../services/sort.service';
import { castToPromise } from '../services/utilities';
import { SharedService } from '../services/shared.service';
var GridMenuExtension = /** @class */ (function () {
    function GridMenuExtension(exportService, extensionUtility, filterService, sharedService, sortService, translate) {
        this.exportService = exportService;
        this.extensionUtility = extensionUtility;
        this.filterService = filterService;
        this.sharedService = sharedService;
        this.sortService = sortService;
        this.translate = translate;
        this._areVisibleColumnDifferent = false;
        this._eventHandler = new Slick.EventHandler();
    }
    /**
     * @return {?}
     */
    GridMenuExtension.prototype.dispose = /**
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
     * @param {?} e
     * @return {?}
     */
    GridMenuExtension.prototype.showGridMenu = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this._extension.showGridMenu(e);
    };
    /** Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...) */
    /**
     * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
     * @return {?}
     */
    GridMenuExtension.prototype.register = /**
     * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
     * @return {?}
     */
    function () {
        var _this = this;
        // keep original user grid menu, useful when switching locale to translate
        this._userOriginalGridMenu = tslib_1.__assign({}, this.sharedService.gridOptions.gridMenu);
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.gridMenu);
            this.sharedService.gridOptions.gridMenu = tslib_1.__assign({}, this.getDefaultGridMenuOptions(), this.sharedService.gridOptions.gridMenu);
            // merge original user grid menu items with internal items
            // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
            this.sharedService.gridOptions.gridMenu.customItems = tslib_1.__spread(this._userOriginalGridMenu.customItems || [], this.addGridMenuCustomCommands());
            this.extensionUtility.translateItems(this.sharedService.gridOptions.gridMenu.customItems, 'titleKey', 'title');
            this.extensionUtility.sortItems(this.sharedService.gridOptions.gridMenu.customItems, 'positionOrder');
            this._extension = new Slick.Controls.GridMenu(this.sharedService.columnDefinitions, this.sharedService.grid, this.sharedService.gridOptions);
            // hook all events
            if (this.sharedService.grid && this.sharedService.gridOptions.gridMenu) {
                if (this.sharedService.gridOptions.gridMenu.onExtensionRegistered) {
                    this.sharedService.gridOptions.gridMenu.onExtensionRegistered(this._extension);
                }
                this._eventHandler.subscribe(this._extension.onBeforeMenuShow, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                function (e, args) {
                    if (_this.sharedService.gridOptions.gridMenu && typeof _this.sharedService.gridOptions.gridMenu.onBeforeMenuShow === 'function') {
                        _this.sharedService.gridOptions.gridMenu.onBeforeMenuShow(e, args);
                    }
                }));
                this._eventHandler.subscribe(this._extension.onColumnsChanged, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                function (e, args) {
                    _this._areVisibleColumnDifferent = true;
                    if (_this.sharedService.gridOptions.gridMenu && typeof _this.sharedService.gridOptions.gridMenu.onColumnsChanged === 'function') {
                        _this.sharedService.gridOptions.gridMenu.onColumnsChanged(e, args);
                    }
                }));
                this._eventHandler.subscribe(this._extension.onCommand, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                function (e, args) {
                    _this.executeGridMenuInternalCustomCommands(e, args);
                    if (_this.sharedService.gridOptions.gridMenu && typeof _this.sharedService.gridOptions.gridMenu.onCommand === 'function') {
                        _this.sharedService.gridOptions.gridMenu.onCommand(e, args);
                    }
                }));
                this._eventHandler.subscribe(this._extension.onMenuClose, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                function (e, args) {
                    if (_this.sharedService.gridOptions.gridMenu && typeof _this.sharedService.gridOptions.gridMenu.onMenuClose === 'function') {
                        _this.sharedService.gridOptions.gridMenu.onMenuClose(e, args);
                    }
                    // we also want to resize the columns if the user decided to hide certain column(s)
                    if (_this.sharedService.grid && typeof _this.sharedService.grid.autosizeColumns === 'function') {
                        // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree)
                        /** @type {?} */
                        var gridUid = _this.sharedService.grid.getUID();
                        if (_this._areVisibleColumnDifferent && gridUid && $("." + gridUid).length > 0) {
                            if (_this.sharedService.gridOptions && _this.sharedService.gridOptions.enableAutoSizeColumns) {
                                _this.sharedService.grid.autosizeColumns();
                            }
                            _this._areVisibleColumnDifferent = false;
                        }
                    }
                }));
            }
            return this._extension;
        }
        return null;
    };
    /**
    * Execute the Grid Menu Custom command callback that was triggered by the onCommand subscribe
    * These are the default internal custom commands
    * @param event
    * @param GridMenuItem args
    */
    /**
     * Execute the Grid Menu Custom command callback that was triggered by the onCommand subscribe
     * These are the default internal custom commands
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    GridMenuExtension.prototype.executeGridMenuInternalCustomCommands = /**
     * Execute the Grid Menu Custom command callback that was triggered by the onCommand subscribe
     * These are the default internal custom commands
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    function (e, args) {
        if (args && args.command) {
            switch (args.command) {
                case 'clear-filter':
                    this.filterService.clearFilters();
                    this.sharedService.dataView.refresh();
                    break;
                case 'clear-sorting':
                    this.sortService.clearSorting();
                    this.sharedService.dataView.refresh();
                    break;
                case 'export-csv':
                    this.exportService.exportToFile({
                        delimiter: DelimiterType.comma,
                        filename: 'export',
                        format: FileType.csv,
                        useUtf8WithBom: true
                    });
                    break;
                case 'export-text-delimited':
                    this.exportService.exportToFile({
                        delimiter: DelimiterType.tab,
                        filename: 'export',
                        format: FileType.txt,
                        useUtf8WithBom: true
                    });
                    break;
                case 'toggle-filter':
                    this.sharedService.grid.setHeaderRowVisibility(!this.sharedService.grid.getOptions().showHeaderRow);
                    break;
                case 'toggle-toppanel':
                    this.sharedService.grid.setTopPanelVisibility(!this.sharedService.grid.getOptions().showTopPanel);
                    break;
                case 'toggle-preheader':
                    this.sharedService.grid.setPreHeaderPanelVisibility(!this.sharedService.grid.getOptions().showPreHeaderPanel);
                    break;
                case 'refresh-dataset':
                    this.refreshBackendDataset();
                    break;
                default:
                    break;
            }
        }
    };
    /** Refresh the dataset through the Backend Service */
    /**
     * Refresh the dataset through the Backend Service
     * @param {?=} gridOptions
     * @return {?}
     */
    GridMenuExtension.prototype.refreshBackendDataset = /**
     * Refresh the dataset through the Backend Service
     * @param {?=} gridOptions
     * @return {?}
     */
    function (gridOptions) {
        var _this = this;
        /** @type {?} */
        var query = '';
        // user can pass new set of grid options which will override current ones
        if (gridOptions) {
            this.sharedService.gridOptions = tslib_1.__assign({}, this.sharedService.gridOptions, gridOptions);
        }
        /** @type {?} */
        var backendApi = this.sharedService.gridOptions.backendServiceApi;
        if (!backendApi || !backendApi.service || !backendApi.process) {
            throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
        }
        if (backendApi.service) {
            query = backendApi.service.buildQuery();
        }
        if (query && query !== '') {
            // keep start time & end timestamps & return it after process execution
            /** @type {?} */
            var startTime_1 = new Date();
            if (backendApi.preProcess) {
                backendApi.preProcess();
            }
            // the process could be an Observable (like HttpClient) or a Promise
            // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
            /** @type {?} */
            var observableOrPromise = backendApi.process(query);
            castToPromise(observableOrPromise).then((/**
             * @param {?} processResult
             * @return {?}
             */
            function (processResult) {
                /** @type {?} */
                var endTime = new Date();
                // from the result, call our internal post process to update the Dataset and Pagination info
                if (processResult && backendApi && backendApi.internalPostProcess) {
                    backendApi.internalPostProcess(processResult);
                }
                // send the response process to the postProcess callback
                if (backendApi && backendApi.postProcess) {
                    if (processResult instanceof Object) {
                        processResult.statistics = {
                            startTime: startTime_1,
                            endTime: endTime,
                            executionTime: endTime.valueOf() - startTime_1.valueOf(),
                            totalItemCount: _this.sharedService.gridOptions && _this.sharedService.gridOptions.pagination && _this.sharedService.gridOptions.pagination.totalItems
                        };
                    }
                    backendApi.postProcess(processResult);
                }
            }));
        }
    };
    /** Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL) */
    /**
     * Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL)
     * @private
     * @return {?}
     */
    GridMenuExtension.prototype.addGridMenuCustomCommands = /**
     * Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL)
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var backendApi = this.sharedService.gridOptions.backendServiceApi || null;
        /** @type {?} */
        var gridMenuCustomItems = [];
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableFiltering) {
            // show grid menu: clear all filters
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideClearAllFiltersCommand) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconClearAllFiltersCommand || 'fa fa-filter text-danger',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('CLEAR_ALL_FILTERS') : Constants.TEXT_CLEAR_ALL_FILTERS,
                    disabled: false,
                    command: 'clear-filter',
                    positionOrder: 50
                });
            }
            // show grid menu: toggle filter row
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideToggleFilterCommand) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconToggleFilterCommand || 'fa fa-random',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('TOGGLE_FILTER_ROW') : Constants.TEXT_TOGGLE_FILTER_ROW,
                    disabled: false,
                    command: 'toggle-filter',
                    positionOrder: 52
                });
            }
            // show grid menu: refresh dataset
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideRefreshDatasetCommand && backendApi) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconRefreshDatasetCommand || 'fa fa-refresh',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('REFRESH_DATASET') : Constants.TEXT_REFRESH_DATASET,
                    disabled: false,
                    command: 'refresh-dataset',
                    positionOrder: 54
                });
            }
        }
        if (this.sharedService.gridOptions.showPreHeaderPanel) {
            // show grid menu: toggle pre-header row
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideTogglePreHeaderCommand) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconTogglePreHeaderCommand || 'fa fa-random',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('TOGGLE_PRE_HEADER_ROW') : Constants.TEXT_TOGGLE_PRE_HEADER_ROW,
                    disabled: false,
                    command: 'toggle-preheader',
                    positionOrder: 52
                });
            }
        }
        if (this.sharedService.gridOptions.enableSorting) {
            // show grid menu: clear all sorting
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideClearAllSortingCommand) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconClearAllSortingCommand || 'fa fa-unsorted text-danger',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('CLEAR_ALL_SORTING') : Constants.TEXT_CLEAR_ALL_SORTING,
                    disabled: false,
                    command: 'clear-sorting',
                    positionOrder: 51
                });
            }
        }
        // show grid menu: export to file
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableExport && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideExportCsvCommand) {
            gridMenuCustomItems.push({
                iconCssClass: this.sharedService.gridOptions.gridMenu.iconExportCsvCommand || 'fa fa-download',
                title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('EXPORT_TO_CSV') : Constants.TEXT_EXPORT_IN_CSV_FORMAT,
                disabled: false,
                command: 'export-csv',
                positionOrder: 53
            });
        }
        // show grid menu: export to text file as tab delimited
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableExport && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideExportTextDelimitedCommand) {
            gridMenuCustomItems.push({
                iconCssClass: this.sharedService.gridOptions.gridMenu.iconExportTextDelimitedCommand || 'fa fa-download',
                title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('EXPORT_TO_TAB_DELIMITED') : Constants.TEXT_EXPORT_IN_TEXT_FORMAT,
                disabled: false,
                command: 'export-text-delimited',
                positionOrder: 54
            });
        }
        // add the custom "Commands" title if there are any commands
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && (gridMenuCustomItems.length > 0 || (this.sharedService.gridOptions.gridMenu.customItems && this.sharedService.gridOptions.gridMenu.customItems.length > 0))) {
            this.sharedService.gridOptions.gridMenu.customTitle = this.sharedService.gridOptions.gridMenu.customTitle || this.extensionUtility.getPickerTitleOutputString('customTitle', 'gridMenu');
        }
        return gridMenuCustomItems;
    };
    /** Execute the Header Menu Commands that was triggered by the onCommand subscribe */
    /**
     * Execute the Header Menu Commands that was triggered by the onCommand subscribe
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    GridMenuExtension.prototype.executeHeaderMenuInternalCommands = /**
     * Execute the Header Menu Commands that was triggered by the onCommand subscribe
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    function (e, args) {
        if (args && args.command) {
            switch (args.command) {
                case 'hide':
                    this.hideColumn(args.column);
                    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableAutoSizeColumns) {
                        this.sharedService.grid.autosizeColumns();
                    }
                    break;
                case 'sort-asc':
                case 'sort-desc':
                    // get previously sorted columns
                    /** @type {?} */
                    var cols = this.sortService.getPreviousColumnSorts(args.column.id + '');
                    // add to the column array, the column sorted by the header menu
                    cols.push({ sortCol: args.column, sortAsc: (args.command === 'sort-asc') });
                    if (this.sharedService.gridOptions.backendServiceApi) {
                        this.sortService.onBackendSortChanged(e, { multiColumnSort: true, sortCols: cols, grid: this.sharedService.grid });
                    }
                    else {
                        this.sortService.onLocalSortChanged(this.sharedService.grid, this.sharedService.dataView, cols);
                    }
                    // update the this.sharedService.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
                    /** @type {?} */
                    var newSortColumns = cols.map((/**
                     * @param {?} col
                     * @return {?}
                     */
                    function (col) {
                        return {
                            columnId: col && col.sortCol && col.sortCol.id,
                            sortAsc: col && col.sortAsc
                        };
                    }));
                    this.sharedService.grid.setSortColumns(newSortColumns); // add sort icon in UI
                    break;
                default:
                    break;
            }
        }
    };
    /** Hide a column from the grid */
    /**
     * Hide a column from the grid
     * @param {?} column
     * @return {?}
     */
    GridMenuExtension.prototype.hideColumn = /**
     * Hide a column from the grid
     * @param {?} column
     * @return {?}
     */
    function (column) {
        if (this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
            /** @type {?} */
            var columnIndex = this.sharedService.grid.getColumnIndex(column.id);
            this.sharedService.visibleColumns = this.extensionUtility.arrayRemoveItemByIndex(this.sharedService.grid.getColumns(), columnIndex);
            this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
        }
    };
    /** Translate the Grid Menu titles and column picker */
    /**
     * Translate the Grid Menu titles and column picker
     * @return {?}
     */
    GridMenuExtension.prototype.translateGridMenu = /**
     * Translate the Grid Menu titles and column picker
     * @return {?}
     */
    function () {
        // update the properties by pointers, that is the only way to get Grid Menu Control to see the new values
        // we also need to call the control init so that it takes the new Grid object with latest values
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
            this.sharedService.gridOptions.gridMenu.customItems = [];
            this.emptyGridMenuTitles();
            // merge original user grid menu items with internal items
            // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
            this.sharedService.gridOptions.gridMenu.customItems = tslib_1.__spread(this._userOriginalGridMenu.customItems || [], this.addGridMenuCustomCommands());
            this.extensionUtility.translateItems(this.sharedService.gridOptions.gridMenu.customItems, 'titleKey', 'title');
            this.extensionUtility.sortItems(this.sharedService.gridOptions.gridMenu.customItems, 'positionOrder');
            this.sharedService.gridOptions.gridMenu.columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'gridMenu');
            this.sharedService.gridOptions.gridMenu.forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'gridMenu');
            this.sharedService.gridOptions.gridMenu.syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'gridMenu');
            // translate all columns (including non-visible)
            this.extensionUtility.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
            // re-initialize the Grid Menu, that will recreate all the menus & list
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
    GridMenuExtension.prototype.emptyGridMenuTitles = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
            this.sharedService.gridOptions.gridMenu.customTitle = '';
            this.sharedService.gridOptions.gridMenu.columnTitle = '';
            this.sharedService.gridOptions.gridMenu.forceFitTitle = '';
            this.sharedService.gridOptions.gridMenu.syncResizeTitle = '';
        }
    };
    /**
    * @return default Grid Menu options
    */
    /**
     * @private
     * @return {?} default Grid Menu options
     */
    GridMenuExtension.prototype.getDefaultGridMenuOptions = /**
     * @private
     * @return {?} default Grid Menu options
     */
    function () {
        return {
            customTitle: undefined,
            columnTitle: this.extensionUtility.getPickerTitleOutputString('columnTitle', 'gridMenu'),
            forceFitTitle: this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'gridMenu'),
            syncResizeTitle: this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'gridMenu'),
            iconCssClass: 'fa fa-bars',
            menuWidth: 18,
            customItems: [],
            hideClearAllFiltersCommand: false,
            hideRefreshDatasetCommand: false,
            hideToggleFilterCommand: false,
        };
    };
    GridMenuExtension.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GridMenuExtension.ctorParameters = function () { return [
        { type: ExportService },
        { type: ExtensionUtility },
        { type: FilterService },
        { type: SharedService },
        { type: SortService },
        { type: TranslateService }
    ]; };
    return GridMenuExtension;
}());
export { GridMenuExtension };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GridMenuExtension.prototype._areVisibleColumnDifferent;
    /**
     * @type {?}
     * @private
     */
    GridMenuExtension.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    GridMenuExtension.prototype._extension;
    /**
     * @type {?}
     * @private
     */
    GridMenuExtension.prototype._userOriginalGridMenu;
    /**
     * @type {?}
     * @private
     */
    GridMenuExtension.prototype.exportService;
    /**
     * @type {?}
     * @private
     */
    GridMenuExtension.prototype.extensionUtility;
    /**
     * @type {?}
     * @private
     */
    GridMenuExtension.prototype.filterService;
    /**
     * @type {?}
     * @private
     */
    GridMenuExtension.prototype.sharedService;
    /**
     * @type {?}
     * @private
     */
    GridMenuExtension.prototype.sortService;
    /**
     * @type {?}
     * @private
     */
    GridMenuExtension.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZE1lbnVFeHRlbnNpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2V4dGVuc2lvbnMvZ3JpZE1lbnVFeHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUlMLGFBQWEsRUFFYixhQUFhLEVBQ2IsUUFBUSxHQU1ULE1BQU0sV0FBVyxDQUFDO0FBQ25CLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFNM0Q7SUFPRSwyQkFDVSxhQUE0QixFQUM1QixnQkFBa0MsRUFDbEMsYUFBNEIsRUFDNUIsYUFBNEIsRUFDNUIsV0FBd0IsRUFDeEIsU0FBMkI7UUFMM0Isa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQVg3QiwrQkFBMEIsR0FB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Ozs7O0lBQ3BDLDBDQUFvQzs7Ozs7SUFDcEMsd0NBQWdDOzs7OztJQUNoQyxzQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHtcclxuICBDZWxsQXJncyxcclxuICBDb2x1bW4sXHJcbiAgQ29sdW1uU29ydCxcclxuICBEZWxpbWl0ZXJUeXBlLFxyXG4gIEV4dGVuc2lvbixcclxuICBFeHRlbnNpb25OYW1lLFxyXG4gIEZpbGVUeXBlLFxyXG4gIEdyYXBocWxSZXN1bHQsXHJcbiAgR3JpZE9wdGlvbixcclxuICBHcmlkTWVudSxcclxuICBHcmlkTWVudUl0ZW0sXHJcbiAgSGVhZGVyTWVudU9uQ29tbWFuZEFyZ3MsXHJcbn0gZnJvbSAnLi4vbW9kZWxzJztcclxuaW1wb3J0IHsgRXhwb3J0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2V4cG9ydC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRXh0ZW5zaW9uVXRpbGl0eSB9IGZyb20gJy4vZXh0ZW5zaW9uVXRpbGl0eSc7XHJcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9maWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFNvcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc29ydC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgY2FzdFRvUHJvbWlzZSB9IGZyb20gJy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdyaWRNZW51RXh0ZW5zaW9uIGltcGxlbWVudHMgRXh0ZW5zaW9uIHtcclxuICBwcml2YXRlIF9hcmVWaXNpYmxlQ29sdW1uRGlmZmVyZW50ID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfZXZlbnRIYW5kbGVyOiBhbnkgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XHJcbiAgcHJpdmF0ZSBfZXh0ZW5zaW9uOiBhbnk7XHJcbiAgcHJpdmF0ZSBfdXNlck9yaWdpbmFsR3JpZE1lbnU6IEdyaWRNZW51O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZXhwb3J0U2VydmljZTogRXhwb3J0U2VydmljZSxcclxuICAgIHByaXZhdGUgZXh0ZW5zaW9uVXRpbGl0eTogRXh0ZW5zaW9uVXRpbGl0eSxcclxuICAgIHByaXZhdGUgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSxcclxuICAgIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSxcclxuICAgIHByaXZhdGUgc29ydFNlcnZpY2U6IFNvcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgKSB7IH1cclxuXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCBTbGlja0dyaWQgZXZlbnRzXHJcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcclxuICAgIGlmICh0aGlzLl9leHRlbnNpb24gJiYgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3kpIHtcclxuICAgICAgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNob3dHcmlkTWVudShlKSB7XHJcbiAgICB0aGlzLl9leHRlbnNpb24uc2hvd0dyaWRNZW51KGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqIENyZWF0ZSB0aGUgSGVhZGVyIE1lbnUgYW5kIGV4cG9zZSBhbGwgdGhlIGF2YWlsYWJsZSBob29rcyB0aGF0IHVzZXIgY2FuIHN1YnNjcmliZSAob25Db21tYW5kLCBvbkJlZm9yZU1lbnVTaG93LCAuLi4pICovXHJcbiAgcmVnaXN0ZXIoKTogYW55IHtcclxuICAgIC8vIGtlZXAgb3JpZ2luYWwgdXNlciBncmlkIG1lbnUsIHVzZWZ1bCB3aGVuIHN3aXRjaGluZyBsb2NhbGUgdG8gdHJhbnNsYXRlXHJcbiAgICB0aGlzLl91c2VyT3JpZ2luYWxHcmlkTWVudSA9IHsgLi4udGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51IH07XHJcblxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUpIHtcclxuICAgICAgLy8gZHluYW1pY2FsbHkgaW1wb3J0IHRoZSBTbGlja0dyaWQgcGx1Z2luIHdpdGggcmVxdWlyZUpTXHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5sb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoRXh0ZW5zaW9uTmFtZS5ncmlkTWVudSk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSA9IHsgLi4udGhpcy5nZXREZWZhdWx0R3JpZE1lbnVPcHRpb25zKCksIC4uLnRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSB9O1xyXG5cclxuICAgICAgLy8gbWVyZ2Ugb3JpZ2luYWwgdXNlciBncmlkIG1lbnUgaXRlbXMgd2l0aCBpbnRlcm5hbCBpdGVtc1xyXG4gICAgICAvLyB0aGVuIHNvcnQgYWxsIEdyaWQgTWVudSBDdXN0b20gSXRlbXMgKHNvcnRlZCBieSBwb2ludGVyLCBubyBuZWVkIHRvIHVzZSB0aGUgcmV0dXJuKVxyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tSXRlbXMgPSBbLi4udGhpcy5fdXNlck9yaWdpbmFsR3JpZE1lbnUuY3VzdG9tSXRlbXMgfHwgW10sIC4uLnRoaXMuYWRkR3JpZE1lbnVDdXN0b21Db21tYW5kcygpXTtcclxuICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LnRyYW5zbGF0ZUl0ZW1zKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21JdGVtcywgJ3RpdGxlS2V5JywgJ3RpdGxlJyk7XHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5zb3J0SXRlbXModGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmN1c3RvbUl0ZW1zLCAncG9zaXRpb25PcmRlcicpO1xyXG5cclxuICAgICAgdGhpcy5fZXh0ZW5zaW9uID0gbmV3IFNsaWNrLkNvbnRyb2xzLkdyaWRNZW51KHRoaXMuc2hhcmVkU2VydmljZS5jb2x1bW5EZWZpbml0aW9ucywgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQsIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyk7XHJcblxyXG4gICAgICAvLyBob29rIGFsbCBldmVudHNcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSkge1xyXG4gICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUub25FeHRlbnNpb25SZWdpc3RlcmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUub25FeHRlbnNpb25SZWdpc3RlcmVkKHRoaXMuX2V4dGVuc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fZXh0ZW5zaW9uLm9uQmVmb3JlTWVudVNob3csIChlOiBhbnksIGFyZ3M6IENlbGxBcmdzKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUub25CZWZvcmVNZW51U2hvdyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUub25CZWZvcmVNZW51U2hvdyhlLCBhcmdzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2V4dGVuc2lvbi5vbkNvbHVtbnNDaGFuZ2VkLCAoZTogYW55LCBhcmdzOiBDZWxsQXJncykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fYXJlVmlzaWJsZUNvbHVtbkRpZmZlcmVudCA9IHRydWU7XHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUub25Db2x1bW5zQ2hhbmdlZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUub25Db2x1bW5zQ2hhbmdlZChlLCBhcmdzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2V4dGVuc2lvbi5vbkNvbW1hbmQsIChlOiBhbnksIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5leGVjdXRlR3JpZE1lbnVJbnRlcm5hbEN1c3RvbUNvbW1hbmRzKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lm9uQ29tbWFuZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUub25Db21tYW5kKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fZXh0ZW5zaW9uLm9uTWVudUNsb3NlLCAoZTogYW55LCBhcmdzOiBDZWxsQXJncykgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lm9uTWVudUNsb3NlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5vbk1lbnVDbG9zZShlLCBhcmdzKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyB3ZSBhbHNvIHdhbnQgdG8gcmVzaXplIHRoZSBjb2x1bW5zIGlmIHRoZSB1c2VyIGRlY2lkZWQgdG8gaGlkZSBjZXJ0YWluIGNvbHVtbihzKVxyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5hdXRvc2l6ZUNvbHVtbnMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhlIGdyaWQgc3RpbGwgZXhpc3QgKGJ5IGxvb2tpbmcgaWYgdGhlIEdyaWQgVUlEIGlzIGZvdW5kIGluIHRoZSBET00gdHJlZSlcclxuICAgICAgICAgICAgY29uc3QgZ3JpZFVpZCA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldFVJRCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYXJlVmlzaWJsZUNvbHVtbkRpZmZlcmVudCAmJiBncmlkVWlkICYmICQoYC4ke2dyaWRVaWR9YCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUF1dG9TaXplQ29sdW1ucykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuYXV0b3NpemVDb2x1bW5zKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHRoaXMuX2FyZVZpc2libGVDb2x1bW5EaWZmZXJlbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzLl9leHRlbnNpb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogRXhlY3V0ZSB0aGUgR3JpZCBNZW51IEN1c3RvbSBjb21tYW5kIGNhbGxiYWNrIHRoYXQgd2FzIHRyaWdnZXJlZCBieSB0aGUgb25Db21tYW5kIHN1YnNjcmliZVxyXG4gICogVGhlc2UgYXJlIHRoZSBkZWZhdWx0IGludGVybmFsIGN1c3RvbSBjb21tYW5kc1xyXG4gICogQHBhcmFtIGV2ZW50XHJcbiAgKiBAcGFyYW0gR3JpZE1lbnVJdGVtIGFyZ3NcclxuICAqL1xyXG4gIGV4ZWN1dGVHcmlkTWVudUludGVybmFsQ3VzdG9tQ29tbWFuZHMoZTogRXZlbnQsIGFyZ3M6IEdyaWRNZW51SXRlbSkge1xyXG4gICAgaWYgKGFyZ3MgJiYgYXJncy5jb21tYW5kKSB7XHJcbiAgICAgIHN3aXRjaCAoYXJncy5jb21tYW5kKSB7XHJcbiAgICAgICAgY2FzZSAnY2xlYXItZmlsdGVyJzpcclxuICAgICAgICAgIHRoaXMuZmlsdGVyU2VydmljZS5jbGVhckZpbHRlcnMoKTtcclxuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5kYXRhVmlldy5yZWZyZXNoKCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdjbGVhci1zb3J0aW5nJzpcclxuICAgICAgICAgIHRoaXMuc29ydFNlcnZpY2UuY2xlYXJTb3J0aW5nKCk7XHJcbiAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZGF0YVZpZXcucmVmcmVzaCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnZXhwb3J0LWNzdic6XHJcbiAgICAgICAgICB0aGlzLmV4cG9ydFNlcnZpY2UuZXhwb3J0VG9GaWxlKHtcclxuICAgICAgICAgICAgZGVsaW1pdGVyOiBEZWxpbWl0ZXJUeXBlLmNvbW1hLFxyXG4gICAgICAgICAgICBmaWxlbmFtZTogJ2V4cG9ydCcsXHJcbiAgICAgICAgICAgIGZvcm1hdDogRmlsZVR5cGUuY3N2LFxyXG4gICAgICAgICAgICB1c2VVdGY4V2l0aEJvbTogdHJ1ZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdleHBvcnQtdGV4dC1kZWxpbWl0ZWQnOlxyXG4gICAgICAgICAgdGhpcy5leHBvcnRTZXJ2aWNlLmV4cG9ydFRvRmlsZSh7XHJcbiAgICAgICAgICAgIGRlbGltaXRlcjogRGVsaW1pdGVyVHlwZS50YWIsXHJcbiAgICAgICAgICAgIGZpbGVuYW1lOiAnZXhwb3J0JyxcclxuICAgICAgICAgICAgZm9ybWF0OiBGaWxlVHlwZS50eHQsXHJcbiAgICAgICAgICAgIHVzZVV0ZjhXaXRoQm9tOiB0cnVlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3RvZ2dsZS1maWx0ZXInOlxyXG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0SGVhZGVyUm93VmlzaWJpbGl0eSghdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0T3B0aW9ucygpLnNob3dIZWFkZXJSb3cpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndG9nZ2xlLXRvcHBhbmVsJzpcclxuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldFRvcFBhbmVsVmlzaWJpbGl0eSghdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0T3B0aW9ucygpLnNob3dUb3BQYW5lbCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd0b2dnbGUtcHJlaGVhZGVyJzpcclxuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldFByZUhlYWRlclBhbmVsVmlzaWJpbGl0eSghdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0T3B0aW9ucygpLnNob3dQcmVIZWFkZXJQYW5lbCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdyZWZyZXNoLWRhdGFzZXQnOlxyXG4gICAgICAgICAgdGhpcy5yZWZyZXNoQmFja2VuZERhdGFzZXQoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFJlZnJlc2ggdGhlIGRhdGFzZXQgdGhyb3VnaCB0aGUgQmFja2VuZCBTZXJ2aWNlICovXHJcbiAgcmVmcmVzaEJhY2tlbmREYXRhc2V0KGdyaWRPcHRpb25zPzogR3JpZE9wdGlvbikge1xyXG4gICAgbGV0IHF1ZXJ5ID0gJyc7XHJcblxyXG4gICAgLy8gdXNlciBjYW4gcGFzcyBuZXcgc2V0IG9mIGdyaWQgb3B0aW9ucyB3aGljaCB3aWxsIG92ZXJyaWRlIGN1cnJlbnQgb25lc1xyXG4gICAgaWYgKGdyaWRPcHRpb25zKSB7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyA9IHsgLi4udGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLCAuLi5ncmlkT3B0aW9ucyB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJhY2tlbmRBcGkgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGk7XHJcbiAgICBpZiAoIWJhY2tlbmRBcGkgfHwgIWJhY2tlbmRBcGkuc2VydmljZSB8fCAhYmFja2VuZEFwaS5wcm9jZXNzKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQmFja2VuZFNlcnZpY2VBcGkgcmVxdWlyZXMgYXQgbGVhc3QgYSBcInByb2Nlc3NcIiBmdW5jdGlvbiBhbmQgYSBcInNlcnZpY2VcIiBkZWZpbmVkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGJhY2tlbmRBcGkuc2VydmljZSkge1xyXG4gICAgICBxdWVyeSA9IGJhY2tlbmRBcGkuc2VydmljZS5idWlsZFF1ZXJ5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHF1ZXJ5ICYmIHF1ZXJ5ICE9PSAnJykge1xyXG4gICAgICAvLyBrZWVwIHN0YXJ0IHRpbWUgJiBlbmQgdGltZXN0YW1wcyAmIHJldHVybiBpdCBhZnRlciBwcm9jZXNzIGV4ZWN1dGlvblxyXG4gICAgICBjb25zdCBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgaWYgKGJhY2tlbmRBcGkucHJlUHJvY2Vzcykge1xyXG4gICAgICAgIGJhY2tlbmRBcGkucHJlUHJvY2VzcygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB0aGUgcHJvY2VzcyBjb3VsZCBiZSBhbiBPYnNlcnZhYmxlIChsaWtlIEh0dHBDbGllbnQpIG9yIGEgUHJvbWlzZVxyXG4gICAgICAvLyBpbiBhbnkgY2FzZSwgd2UgbmVlZCB0byBoYXZlIGEgUHJvbWlzZSBzbyB0aGF0IHdlIGNhbiBhd2FpdCBvbiBpdCAoaWYgYW4gT2JzZXJ2YWJsZSwgY29udmVydCBpdCB0byBQcm9taXNlKVxyXG4gICAgICBjb25zdCBvYnNlcnZhYmxlT3JQcm9taXNlID0gYmFja2VuZEFwaS5wcm9jZXNzKHF1ZXJ5KTtcclxuXHJcbiAgICAgIGNhc3RUb1Byb21pc2Uob2JzZXJ2YWJsZU9yUHJvbWlzZSkudGhlbigocHJvY2Vzc1Jlc3VsdDogR3JhcGhxbFJlc3VsdCB8IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVuZFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgICAvLyBmcm9tIHRoZSByZXN1bHQsIGNhbGwgb3VyIGludGVybmFsIHBvc3QgcHJvY2VzcyB0byB1cGRhdGUgdGhlIERhdGFzZXQgYW5kIFBhZ2luYXRpb24gaW5mb1xyXG4gICAgICAgIGlmIChwcm9jZXNzUmVzdWx0ICYmIGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5pbnRlcm5hbFBvc3RQcm9jZXNzKSB7XHJcbiAgICAgICAgICBiYWNrZW5kQXBpLmludGVybmFsUG9zdFByb2Nlc3MocHJvY2Vzc1Jlc3VsdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzZW5kIHRoZSByZXNwb25zZSBwcm9jZXNzIHRvIHRoZSBwb3N0UHJvY2VzcyBjYWxsYmFja1xyXG4gICAgICAgIGlmIChiYWNrZW5kQXBpICYmIGJhY2tlbmRBcGkucG9zdFByb2Nlc3MpIHtcclxuICAgICAgICAgIGlmIChwcm9jZXNzUmVzdWx0IGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIHByb2Nlc3NSZXN1bHQuc3RhdGlzdGljcyA9IHtcclxuICAgICAgICAgICAgICBzdGFydFRpbWUsXHJcbiAgICAgICAgICAgICAgZW5kVGltZSxcclxuICAgICAgICAgICAgICBleGVjdXRpb25UaW1lOiBlbmRUaW1lLnZhbHVlT2YoKSAtIHN0YXJ0VGltZS52YWx1ZU9mKCksXHJcbiAgICAgICAgICAgICAgdG90YWxJdGVtQ291bnQ6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbiAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbi50b3RhbEl0ZW1zXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBiYWNrZW5kQXBpLnBvc3RQcm9jZXNzKHByb2Nlc3NSZXN1bHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogQ3JlYXRlIEdyaWQgTWVudSB3aXRoIEN1c3RvbSBDb21tYW5kcyBpZiB1c2VyIGhhcyBlbmFibGVkIEZpbHRlcnMgYW5kL29yIHVzZXMgYSBCYWNrZW5kIFNlcnZpY2UgKE9EYXRhLCBHcmFwaFFMKSAqL1xyXG4gIHByaXZhdGUgYWRkR3JpZE1lbnVDdXN0b21Db21tYW5kcygpIHtcclxuICAgIGNvbnN0IGJhY2tlbmRBcGkgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkgfHwgbnVsbDtcclxuICAgIGNvbnN0IGdyaWRNZW51Q3VzdG9tSXRlbXM6IEdyaWRNZW51SXRlbVtdID0gW107XHJcblxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlRmlsdGVyaW5nKSB7XHJcbiAgICAgIC8vIHNob3cgZ3JpZCBtZW51OiBjbGVhciBhbGwgZmlsdGVyc1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSAmJiAhdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmhpZGVDbGVhckFsbEZpbHRlcnNDb21tYW5kKSB7XHJcbiAgICAgICAgZ3JpZE1lbnVDdXN0b21JdGVtcy5wdXNoKFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBpY29uQ3NzQ2xhc3M6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5pY29uQ2xlYXJBbGxGaWx0ZXJzQ29tbWFuZCB8fCAnZmEgZmEtZmlsdGVyIHRleHQtZGFuZ2VyJyxcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdDTEVBUl9BTExfRklMVEVSUycpIDogQ29uc3RhbnRzLlRFWFRfQ0xFQVJfQUxMX0ZJTFRFUlMsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY29tbWFuZDogJ2NsZWFyLWZpbHRlcicsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDUwXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gc2hvdyBncmlkIG1lbnU6IHRvZ2dsZSBmaWx0ZXIgcm93XHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmICF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaGlkZVRvZ2dsZUZpbHRlckNvbW1hbmQpIHtcclxuICAgICAgICBncmlkTWVudUN1c3RvbUl0ZW1zLnB1c2goXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGljb25Dc3NDbGFzczogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lmljb25Ub2dnbGVGaWx0ZXJDb21tYW5kIHx8ICdmYSBmYS1yYW5kb20nLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1RPR0dMRV9GSUxURVJfUk9XJykgOiBDb25zdGFudHMuVEVYVF9UT0dHTEVfRklMVEVSX1JPVyxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb21tYW5kOiAndG9nZ2xlLWZpbHRlcicsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDUyXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gc2hvdyBncmlkIG1lbnU6IHJlZnJlc2ggZGF0YXNldFxyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSAmJiAhdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmhpZGVSZWZyZXNoRGF0YXNldENvbW1hbmQgJiYgYmFja2VuZEFwaSkge1xyXG4gICAgICAgIGdyaWRNZW51Q3VzdG9tSXRlbXMucHVzaChcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaWNvblJlZnJlc2hEYXRhc2V0Q29tbWFuZCB8fCAnZmEgZmEtcmVmcmVzaCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnUkVGUkVTSF9EQVRBU0VUJykgOiBDb25zdGFudHMuVEVYVF9SRUZSRVNIX0RBVEFTRVQsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY29tbWFuZDogJ3JlZnJlc2gtZGF0YXNldCcsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDU0XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuc2hvd1ByZUhlYWRlclBhbmVsKSB7XHJcbiAgICAgIC8vIHNob3cgZ3JpZCBtZW51OiB0b2dnbGUgcHJlLWhlYWRlciByb3dcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUgJiYgIXRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5oaWRlVG9nZ2xlUHJlSGVhZGVyQ29tbWFuZCkge1xyXG4gICAgICAgIGdyaWRNZW51Q3VzdG9tSXRlbXMucHVzaChcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaWNvblRvZ2dsZVByZUhlYWRlckNvbW1hbmQgfHwgJ2ZhIGZhLXJhbmRvbScsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnVE9HR0xFX1BSRV9IRUFERVJfUk9XJykgOiBDb25zdGFudHMuVEVYVF9UT0dHTEVfUFJFX0hFQURFUl9ST1csXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY29tbWFuZDogJ3RvZ2dsZS1wcmVoZWFkZXInLFxyXG4gICAgICAgICAgICBwb3NpdGlvbk9yZGVyOiA1MlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVNvcnRpbmcpIHtcclxuICAgICAgLy8gc2hvdyBncmlkIG1lbnU6IGNsZWFyIGFsbCBzb3J0aW5nXHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmICF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaGlkZUNsZWFyQWxsU29ydGluZ0NvbW1hbmQpIHtcclxuICAgICAgICBncmlkTWVudUN1c3RvbUl0ZW1zLnB1c2goXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGljb25Dc3NDbGFzczogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lmljb25DbGVhckFsbFNvcnRpbmdDb21tYW5kIHx8ICdmYSBmYS11bnNvcnRlZCB0ZXh0LWRhbmdlcicsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnQ0xFQVJfQUxMX1NPUlRJTkcnKSA6IENvbnN0YW50cy5URVhUX0NMRUFSX0FMTF9TT1JUSU5HLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdjbGVhci1zb3J0aW5nJyxcclxuICAgICAgICAgICAgcG9zaXRpb25PcmRlcjogNTFcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hvdyBncmlkIG1lbnU6IGV4cG9ydCB0byBmaWxlXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVFeHBvcnQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmICF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaGlkZUV4cG9ydENzdkNvbW1hbmQpIHtcclxuICAgICAgZ3JpZE1lbnVDdXN0b21JdGVtcy5wdXNoKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGljb25Dc3NDbGFzczogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lmljb25FeHBvcnRDc3ZDb21tYW5kIHx8ICdmYSBmYS1kb3dubG9hZCcsXHJcbiAgICAgICAgICB0aXRsZTogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0VYUE9SVF9UT19DU1YnKSA6IENvbnN0YW50cy5URVhUX0VYUE9SVF9JTl9DU1ZfRk9STUFULFxyXG4gICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgY29tbWFuZDogJ2V4cG9ydC1jc3YnLFxyXG4gICAgICAgICAgcG9zaXRpb25PcmRlcjogNTNcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICAvLyBzaG93IGdyaWQgbWVudTogZXhwb3J0IHRvIHRleHQgZmlsZSBhcyB0YWIgZGVsaW1pdGVkXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVFeHBvcnQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmICF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaGlkZUV4cG9ydFRleHREZWxpbWl0ZWRDb21tYW5kKSB7XHJcbiAgICAgIGdyaWRNZW51Q3VzdG9tSXRlbXMucHVzaChcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpY29uQ3NzQ2xhc3M6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5pY29uRXhwb3J0VGV4dERlbGltaXRlZENvbW1hbmQgfHwgJ2ZhIGZhLWRvd25sb2FkJyxcclxuICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnRVhQT1JUX1RPX1RBQl9ERUxJTUlURUQnKSA6IENvbnN0YW50cy5URVhUX0VYUE9SVF9JTl9URVhUX0ZPUk1BVCxcclxuICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgIGNvbW1hbmQ6ICdleHBvcnQtdGV4dC1kZWxpbWl0ZWQnLFxyXG4gICAgICAgICAgcG9zaXRpb25PcmRlcjogNTRcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWRkIHRoZSBjdXN0b20gXCJDb21tYW5kc1wiIHRpdGxlIGlmIHRoZXJlIGFyZSBhbnkgY29tbWFuZHNcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmIChncmlkTWVudUN1c3RvbUl0ZW1zLmxlbmd0aCA+IDAgfHwgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21JdGVtcyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tSXRlbXMubGVuZ3RoID4gMCkpKSB7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21UaXRsZSA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21UaXRsZSB8fCB0aGlzLmV4dGVuc2lvblV0aWxpdHkuZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcoJ2N1c3RvbVRpdGxlJywgJ2dyaWRNZW51Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGdyaWRNZW51Q3VzdG9tSXRlbXM7XHJcbiAgfVxyXG5cclxuICAvKiogRXhlY3V0ZSB0aGUgSGVhZGVyIE1lbnUgQ29tbWFuZHMgdGhhdCB3YXMgdHJpZ2dlcmVkIGJ5IHRoZSBvbkNvbW1hbmQgc3Vic2NyaWJlICovXHJcbiAgZXhlY3V0ZUhlYWRlck1lbnVJbnRlcm5hbENvbW1hbmRzKGU6IEV2ZW50LCBhcmdzOiBIZWFkZXJNZW51T25Db21tYW5kQXJncykge1xyXG4gICAgaWYgKGFyZ3MgJiYgYXJncy5jb21tYW5kKSB7XHJcbiAgICAgIHN3aXRjaCAoYXJncy5jb21tYW5kKSB7XHJcbiAgICAgICAgY2FzZSAnaGlkZSc6XHJcbiAgICAgICAgICB0aGlzLmhpZGVDb2x1bW4oYXJncy5jb2x1bW4pO1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1NpemVDb2x1bW5zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmF1dG9zaXplQ29sdW1ucygpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnc29ydC1hc2MnOlxyXG4gICAgICAgIGNhc2UgJ3NvcnQtZGVzYyc6XHJcbiAgICAgICAgICAvLyBnZXQgcHJldmlvdXNseSBzb3J0ZWQgY29sdW1uc1xyXG4gICAgICAgICAgY29uc3QgY29sczogQ29sdW1uU29ydFtdID0gdGhpcy5zb3J0U2VydmljZS5nZXRQcmV2aW91c0NvbHVtblNvcnRzKGFyZ3MuY29sdW1uLmlkICsgJycpO1xyXG5cclxuICAgICAgICAgIC8vIGFkZCB0byB0aGUgY29sdW1uIGFycmF5LCB0aGUgY29sdW1uIHNvcnRlZCBieSB0aGUgaGVhZGVyIG1lbnVcclxuICAgICAgICAgIGNvbHMucHVzaCh7IHNvcnRDb2w6IGFyZ3MuY29sdW1uLCBzb3J0QXNjOiAoYXJncy5jb21tYW5kID09PSAnc29ydC1hc2MnKSB9KTtcclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0U2VydmljZS5vbkJhY2tlbmRTb3J0Q2hhbmdlZChlLCB7IG11bHRpQ29sdW1uU29ydDogdHJ1ZSwgc29ydENvbHM6IGNvbHMsIGdyaWQ6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0U2VydmljZS5vbkxvY2FsU29ydENoYW5nZWQodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQsIHRoaXMuc2hhcmVkU2VydmljZS5kYXRhVmlldywgY29scyk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gdXBkYXRlIHRoZSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9iaiBzb3J0Q29sdW1ucyBhcnJheSB3aGljaCB3aWxsIGF0IHRoZSBzYW1lIGFkZCB0aGUgdmlzdWFsIHNvcnQgaWNvbihzKSBvbiB0aGUgVUlcclxuICAgICAgICAgIGNvbnN0IG5ld1NvcnRDb2x1bW5zOiBDb2x1bW5Tb3J0W10gPSBjb2xzLm1hcCgoY29sKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgY29sdW1uSWQ6IGNvbCAmJiBjb2wuc29ydENvbCAmJiBjb2wuc29ydENvbC5pZCxcclxuICAgICAgICAgICAgICBzb3J0QXNjOiBjb2wgJiYgY29sLnNvcnRBc2NcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0U29ydENvbHVtbnMobmV3U29ydENvbHVtbnMpOyAvLyBhZGQgc29ydCBpY29uIGluIFVJXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBIaWRlIGEgY29sdW1uIGZyb20gdGhlIGdyaWQgKi9cclxuICBoaWRlQ29sdW1uKGNvbHVtbjogQ29sdW1uKSB7XHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRDb2x1bW5zKSB7XHJcbiAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1uSW5kZXgoY29sdW1uLmlkKTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLnZpc2libGVDb2x1bW5zID0gdGhpcy5leHRlbnNpb25VdGlsaXR5LmFycmF5UmVtb3ZlSXRlbUJ5SW5kZXgodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1ucygpLCBjb2x1bW5JbmRleCk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldENvbHVtbnModGhpcy5zaGFyZWRTZXJ2aWNlLnZpc2libGVDb2x1bW5zKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUcmFuc2xhdGUgdGhlIEdyaWQgTWVudSB0aXRsZXMgYW5kIGNvbHVtbiBwaWNrZXIgKi9cclxuICB0cmFuc2xhdGVHcmlkTWVudSgpIHtcclxuICAgIC8vIHVwZGF0ZSB0aGUgcHJvcGVydGllcyBieSBwb2ludGVycywgdGhhdCBpcyB0aGUgb25seSB3YXkgdG8gZ2V0IEdyaWQgTWVudSBDb250cm9sIHRvIHNlZSB0aGUgbmV3IHZhbHVlc1xyXG4gICAgLy8gd2UgYWxzbyBuZWVkIHRvIGNhbGwgdGhlIGNvbnRyb2wgaW5pdCBzbyB0aGF0IGl0IHRha2VzIHRoZSBuZXcgR3JpZCBvYmplY3Qgd2l0aCBsYXRlc3QgdmFsdWVzXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSkge1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tSXRlbXMgPSBbXTtcclxuICAgICAgdGhpcy5lbXB0eUdyaWRNZW51VGl0bGVzKCk7XHJcblxyXG4gICAgICAvLyBtZXJnZSBvcmlnaW5hbCB1c2VyIGdyaWQgbWVudSBpdGVtcyB3aXRoIGludGVybmFsIGl0ZW1zXHJcbiAgICAgIC8vIHRoZW4gc29ydCBhbGwgR3JpZCBNZW51IEN1c3RvbSBJdGVtcyAoc29ydGVkIGJ5IHBvaW50ZXIsIG5vIG5lZWQgdG8gdXNlIHRoZSByZXR1cm4pXHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21JdGVtcyA9IFsuLi50aGlzLl91c2VyT3JpZ2luYWxHcmlkTWVudS5jdXN0b21JdGVtcyB8fCBbXSwgLi4udGhpcy5hZGRHcmlkTWVudUN1c3RvbUNvbW1hbmRzKCldO1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkudHJhbnNsYXRlSXRlbXModGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmN1c3RvbUl0ZW1zLCAndGl0bGVLZXknLCAndGl0bGUnKTtcclxuICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LnNvcnRJdGVtcyh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tSXRlbXMsICdwb3NpdGlvbk9yZGVyJyk7XHJcblxyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY29sdW1uVGl0bGUgPSB0aGlzLmV4dGVuc2lvblV0aWxpdHkuZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcoJ2NvbHVtblRpdGxlJywgJ2dyaWRNZW51Jyk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5mb3JjZUZpdFRpdGxlID0gdGhpcy5leHRlbnNpb25VdGlsaXR5LmdldFBpY2tlclRpdGxlT3V0cHV0U3RyaW5nKCdmb3JjZUZpdFRpdGxlJywgJ2dyaWRNZW51Jyk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5zeW5jUmVzaXplVGl0bGUgPSB0aGlzLmV4dGVuc2lvblV0aWxpdHkuZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcoJ3N5bmNSZXNpemVUaXRsZScsICdncmlkTWVudScpO1xyXG5cclxuICAgICAgLy8gdHJhbnNsYXRlIGFsbCBjb2x1bW5zIChpbmNsdWRpbmcgbm9uLXZpc2libGUpXHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS50cmFuc2xhdGVJdGVtcyh0aGlzLnNoYXJlZFNlcnZpY2UuYWxsQ29sdW1ucywgJ2hlYWRlcktleScsICduYW1lJyk7XHJcblxyXG4gICAgICAvLyByZS1pbml0aWFsaXplIHRoZSBHcmlkIE1lbnUsIHRoYXQgd2lsbCByZWNyZWF0ZSBhbGwgdGhlIG1lbnVzICYgbGlzdFxyXG4gICAgICAvLyBkb2luZyBhbiBcImluaXQoKVwiIHdvbid0IGRyb3AgYW55IGV4aXN0aW5nIGNvbW1hbmQgYXR0YWNoZWRcclxuICAgICAgaWYgKHRoaXMuX2V4dGVuc2lvbi5pbml0KSB7XHJcbiAgICAgICAgdGhpcy5fZXh0ZW5zaW9uLmluaXQodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGVtcHR5R3JpZE1lbnVUaXRsZXMoKSB7XHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUpIHtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmN1c3RvbVRpdGxlID0gJyc7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jb2x1bW5UaXRsZSA9ICcnO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuZm9yY2VGaXRUaXRsZSA9ICcnO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuc3luY1Jlc2l6ZVRpdGxlID0gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEByZXR1cm4gZGVmYXVsdCBHcmlkIE1lbnUgb3B0aW9uc1xyXG4gICovXHJcbiAgcHJpdmF0ZSBnZXREZWZhdWx0R3JpZE1lbnVPcHRpb25zKCk6IEdyaWRNZW51IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGN1c3RvbVRpdGxlOiB1bmRlZmluZWQsXHJcbiAgICAgIGNvbHVtblRpdGxlOiB0aGlzLmV4dGVuc2lvblV0aWxpdHkuZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcoJ2NvbHVtblRpdGxlJywgJ2dyaWRNZW51JyksXHJcbiAgICAgIGZvcmNlRml0VGl0bGU6IHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5nZXRQaWNrZXJUaXRsZU91dHB1dFN0cmluZygnZm9yY2VGaXRUaXRsZScsICdncmlkTWVudScpLFxyXG4gICAgICBzeW5jUmVzaXplVGl0bGU6IHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5nZXRQaWNrZXJUaXRsZU91dHB1dFN0cmluZygnc3luY1Jlc2l6ZVRpdGxlJywgJ2dyaWRNZW51JyksXHJcbiAgICAgIGljb25Dc3NDbGFzczogJ2ZhIGZhLWJhcnMnLFxyXG4gICAgICBtZW51V2lkdGg6IDE4LFxyXG4gICAgICBjdXN0b21JdGVtczogW10sXHJcbiAgICAgIGhpZGVDbGVhckFsbEZpbHRlcnNDb21tYW5kOiBmYWxzZSxcclxuICAgICAgaGlkZVJlZnJlc2hEYXRhc2V0Q29tbWFuZDogZmFsc2UsXHJcbiAgICAgIGhpZGVUb2dnbGVGaWx0ZXJDb21tYW5kOiBmYWxzZSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==