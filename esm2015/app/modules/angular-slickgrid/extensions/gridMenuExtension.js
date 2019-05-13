/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class GridMenuExtension {
    /**
     * @param {?} exportService
     * @param {?} extensionUtility
     * @param {?} filterService
     * @param {?} sharedService
     * @param {?} sortService
     * @param {?} translate
     */
    constructor(exportService, extensionUtility, filterService, sharedService, sortService, translate) {
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
    dispose() {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    showGridMenu(e) {
        this._extension.showGridMenu(e);
    }
    /**
     * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
     * @return {?}
     */
    register() {
        // keep original user grid menu, useful when switching locale to translate
        this._userOriginalGridMenu = Object.assign({}, this.sharedService.gridOptions.gridMenu);
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.gridMenu);
            this.sharedService.gridOptions.gridMenu = Object.assign({}, this.getDefaultGridMenuOptions(), this.sharedService.gridOptions.gridMenu);
            // merge original user grid menu items with internal items
            // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
            this.sharedService.gridOptions.gridMenu.customItems = [...this._userOriginalGridMenu.customItems || [], ...this.addGridMenuCustomCommands()];
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
                (e, args) => {
                    if (this.sharedService.gridOptions.gridMenu && typeof this.sharedService.gridOptions.gridMenu.onBeforeMenuShow === 'function') {
                        this.sharedService.gridOptions.gridMenu.onBeforeMenuShow(e, args);
                    }
                }));
                this._eventHandler.subscribe(this._extension.onColumnsChanged, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                (e, args) => {
                    this._areVisibleColumnDifferent = true;
                    if (this.sharedService.gridOptions.gridMenu && typeof this.sharedService.gridOptions.gridMenu.onColumnsChanged === 'function') {
                        this.sharedService.gridOptions.gridMenu.onColumnsChanged(e, args);
                    }
                }));
                this._eventHandler.subscribe(this._extension.onCommand, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                (e, args) => {
                    this.executeGridMenuInternalCustomCommands(e, args);
                    if (this.sharedService.gridOptions.gridMenu && typeof this.sharedService.gridOptions.gridMenu.onCommand === 'function') {
                        this.sharedService.gridOptions.gridMenu.onCommand(e, args);
                    }
                }));
                this._eventHandler.subscribe(this._extension.onMenuClose, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                (e, args) => {
                    if (this.sharedService.gridOptions.gridMenu && typeof this.sharedService.gridOptions.gridMenu.onMenuClose === 'function') {
                        this.sharedService.gridOptions.gridMenu.onMenuClose(e, args);
                    }
                    // we also want to resize the columns if the user decided to hide certain column(s)
                    if (this.sharedService.grid && typeof this.sharedService.grid.autosizeColumns === 'function') {
                        // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree)
                        /** @type {?} */
                        const gridUid = this.sharedService.grid.getUID();
                        if (this._areVisibleColumnDifferent && gridUid && $(`.${gridUid}`).length > 0) {
                            if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableAutoSizeColumns) {
                                this.sharedService.grid.autosizeColumns();
                            }
                            this._areVisibleColumnDifferent = false;
                        }
                    }
                }));
            }
            return this._extension;
        }
        return null;
    }
    /**
     * Execute the Grid Menu Custom command callback that was triggered by the onCommand subscribe
     * These are the default internal custom commands
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    executeGridMenuInternalCustomCommands(e, args) {
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
    }
    /**
     * Refresh the dataset through the Backend Service
     * @param {?=} gridOptions
     * @return {?}
     */
    refreshBackendDataset(gridOptions) {
        /** @type {?} */
        let query = '';
        // user can pass new set of grid options which will override current ones
        if (gridOptions) {
            this.sharedService.gridOptions = Object.assign({}, this.sharedService.gridOptions, gridOptions);
        }
        /** @type {?} */
        const backendApi = this.sharedService.gridOptions.backendServiceApi;
        if (!backendApi || !backendApi.service || !backendApi.process) {
            throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
        }
        if (backendApi.service) {
            query = backendApi.service.buildQuery();
        }
        if (query && query !== '') {
            // keep start time & end timestamps & return it after process execution
            /** @type {?} */
            const startTime = new Date();
            if (backendApi.preProcess) {
                backendApi.preProcess();
            }
            // the process could be an Observable (like HttpClient) or a Promise
            // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
            /** @type {?} */
            const observableOrPromise = backendApi.process(query);
            castToPromise(observableOrPromise).then((/**
             * @param {?} processResult
             * @return {?}
             */
            (processResult) => {
                /** @type {?} */
                const endTime = new Date();
                // from the result, call our internal post process to update the Dataset and Pagination info
                if (processResult && backendApi && backendApi.internalPostProcess) {
                    backendApi.internalPostProcess(processResult);
                }
                // send the response process to the postProcess callback
                if (backendApi && backendApi.postProcess) {
                    if (processResult instanceof Object) {
                        processResult.statistics = {
                            startTime,
                            endTime,
                            executionTime: endTime.valueOf() - startTime.valueOf(),
                            totalItemCount: this.sharedService.gridOptions && this.sharedService.gridOptions.pagination && this.sharedService.gridOptions.pagination.totalItems
                        };
                    }
                    backendApi.postProcess(processResult);
                }
            }));
        }
    }
    /**
     * Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL)
     * @private
     * @return {?}
     */
    addGridMenuCustomCommands() {
        /** @type {?} */
        const backendApi = this.sharedService.gridOptions.backendServiceApi || null;
        /** @type {?} */
        const gridMenuCustomItems = [];
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
    }
    /**
     * Execute the Header Menu Commands that was triggered by the onCommand subscribe
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    executeHeaderMenuInternalCommands(e, args) {
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
                    const cols = this.sortService.getPreviousColumnSorts(args.column.id + '');
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
                    const newSortColumns = cols.map((/**
                     * @param {?} col
                     * @return {?}
                     */
                    (col) => {
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
    }
    /**
     * Hide a column from the grid
     * @param {?} column
     * @return {?}
     */
    hideColumn(column) {
        if (this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
            /** @type {?} */
            const columnIndex = this.sharedService.grid.getColumnIndex(column.id);
            this.sharedService.visibleColumns = this.extensionUtility.arrayRemoveItemByIndex(this.sharedService.grid.getColumns(), columnIndex);
            this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
        }
    }
    /**
     * Translate the Grid Menu titles and column picker
     * @return {?}
     */
    translateGridMenu() {
        // update the properties by pointers, that is the only way to get Grid Menu Control to see the new values
        // we also need to call the control init so that it takes the new Grid object with latest values
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
            this.sharedService.gridOptions.gridMenu.customItems = [];
            this.emptyGridMenuTitles();
            // merge original user grid menu items with internal items
            // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
            this.sharedService.gridOptions.gridMenu.customItems = [...this._userOriginalGridMenu.customItems || [], ...this.addGridMenuCustomCommands()];
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
    }
    /**
     * @private
     * @return {?}
     */
    emptyGridMenuTitles() {
        if (this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
            this.sharedService.gridOptions.gridMenu.customTitle = '';
            this.sharedService.gridOptions.gridMenu.columnTitle = '';
            this.sharedService.gridOptions.gridMenu.forceFitTitle = '';
            this.sharedService.gridOptions.gridMenu.syncResizeTitle = '';
        }
    }
    /**
     * @private
     * @return {?} default Grid Menu options
     */
    getDefaultGridMenuOptions() {
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
    }
}
GridMenuExtension.decorators = [
    { type: Injectable }
];
/** @nocollapse */
GridMenuExtension.ctorParameters = () => [
    { type: ExportService },
    { type: ExtensionUtility },
    { type: FilterService },
    { type: SharedService },
    { type: SortService },
    { type: TranslateService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZE1lbnVFeHRlbnNpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2V4dGVuc2lvbnMvZ3JpZE1lbnVFeHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBSUwsYUFBYSxFQUViLGFBQWEsRUFDYixRQUFRLEdBTVQsTUFBTSxXQUFXLENBQUM7QUFDbkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQU8zRCxNQUFNLE9BQU8saUJBQWlCOzs7Ozs7Ozs7SUFNNUIsWUFDVSxhQUE0QixFQUM1QixnQkFBa0MsRUFDbEMsYUFBNEIsRUFDNUIsYUFBNEIsRUFDNUIsV0FBd0IsRUFDeEIsU0FBMkI7UUFMM0Isa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixjQUFTLEdBQVQsU0FB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QVEsQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1lBQzNELElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1NBQzlEO0lBQ0gsQ0FBQzs7Ozs7SUFLTyx5QkFBeUI7UUFDL0IsT0FBTztZQUNMLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLFdBQVcsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsMEJBQTBCLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQztZQUN4RixhQUFhLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLDBCQUEwQixDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUM7WUFDNUYsZUFBZSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQywwQkFBMEIsQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLENBQUM7WUFDaEcsWUFBWSxFQUFFLFlBQVk7WUFDMUIsU0FBUyxFQUFFLEVBQUU7WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLDBCQUEwQixFQUFFLEtBQUs7WUFDakMseUJBQXlCLEVBQUUsS0FBSztZQUNoQyx1QkFBdUIsRUFBRSxLQUFLO1NBQy9CLENBQUM7SUFDSixDQUFDOzs7WUF0WkYsVUFBVTs7OztZQVhGLGFBQWE7WUFDYixnQkFBZ0I7WUFDaEIsYUFBYTtZQUdiLGFBQWE7WUFGYixXQUFXO1lBbkJYLGdCQUFnQjs7Ozs7OztJQTZCdkIsdURBQTJDOzs7OztJQUMzQywwQ0FBc0Q7Ozs7O0lBQ3RELHVDQUF3Qjs7Ozs7SUFDeEIsa0RBQXdDOzs7OztJQUd0QywwQ0FBb0M7Ozs7O0lBQ3BDLDZDQUEwQzs7Ozs7SUFDMUMsMENBQW9DOzs7OztJQUNwQywwQ0FBb0M7Ozs7O0lBQ3BDLHdDQUFnQzs7Ozs7SUFDaEMsc0NBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7XHJcbiAgQ2VsbEFyZ3MsXHJcbiAgQ29sdW1uLFxyXG4gIENvbHVtblNvcnQsXHJcbiAgRGVsaW1pdGVyVHlwZSxcclxuICBFeHRlbnNpb24sXHJcbiAgRXh0ZW5zaW9uTmFtZSxcclxuICBGaWxlVHlwZSxcclxuICBHcmFwaHFsUmVzdWx0LFxyXG4gIEdyaWRPcHRpb24sXHJcbiAgR3JpZE1lbnUsXHJcbiAgR3JpZE1lbnVJdGVtLFxyXG4gIEhlYWRlck1lbnVPbkNvbW1hbmRBcmdzLFxyXG59IGZyb20gJy4uL21vZGVscyc7XHJcbmltcG9ydCB7IEV4cG9ydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9leHBvcnQuc2VydmljZSc7XHJcbmltcG9ydCB7IEV4dGVuc2lvblV0aWxpdHkgfSBmcm9tICcuL2V4dGVuc2lvblV0aWxpdHknO1xyXG5pbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZmlsdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTb3J0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NvcnQuc2VydmljZSc7XHJcbmltcG9ydCB7IGNhc3RUb1Byb21pc2UgfSBmcm9tICcuLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHcmlkTWVudUV4dGVuc2lvbiBpbXBsZW1lbnRzIEV4dGVuc2lvbiB7XHJcbiAgcHJpdmF0ZSBfYXJlVmlzaWJsZUNvbHVtbkRpZmZlcmVudCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX2V2ZW50SGFuZGxlcjogYW55ID0gbmV3IFNsaWNrLkV2ZW50SGFuZGxlcigpO1xyXG4gIHByaXZhdGUgX2V4dGVuc2lvbjogYW55O1xyXG4gIHByaXZhdGUgX3VzZXJPcmlnaW5hbEdyaWRNZW51OiBHcmlkTWVudTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGV4cG9ydFNlcnZpY2U6IEV4cG9ydFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGV4dGVuc2lvblV0aWxpdHk6IEV4dGVuc2lvblV0aWxpdHksXHJcbiAgICBwcml2YXRlIGZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHNvcnRTZXJ2aWNlOiBTb3J0U2VydmljZSxcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICkgeyB9XHJcblxyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICAvLyB1bnN1YnNjcmliZSBhbGwgU2xpY2tHcmlkIGV2ZW50c1xyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnVuc3Vic2NyaWJlQWxsKCk7XHJcbiAgICBpZiAodGhpcy5fZXh0ZW5zaW9uICYmIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KSB7XHJcbiAgICAgIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzaG93R3JpZE1lbnUoZSkge1xyXG4gICAgdGhpcy5fZXh0ZW5zaW9uLnNob3dHcmlkTWVudShlKTtcclxuICB9XHJcblxyXG4gIC8qKiBDcmVhdGUgdGhlIEhlYWRlciBNZW51IGFuZCBleHBvc2UgYWxsIHRoZSBhdmFpbGFibGUgaG9va3MgdGhhdCB1c2VyIGNhbiBzdWJzY3JpYmUgKG9uQ29tbWFuZCwgb25CZWZvcmVNZW51U2hvdywgLi4uKSAqL1xyXG4gIHJlZ2lzdGVyKCk6IGFueSB7XHJcbiAgICAvLyBrZWVwIG9yaWdpbmFsIHVzZXIgZ3JpZCBtZW51LCB1c2VmdWwgd2hlbiBzd2l0Y2hpbmcgbG9jYWxlIHRvIHRyYW5zbGF0ZVxyXG4gICAgdGhpcy5fdXNlck9yaWdpbmFsR3JpZE1lbnUgPSB7IC4uLnRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSB9O1xyXG5cclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51KSB7XHJcbiAgICAgIC8vIGR5bmFtaWNhbGx5IGltcG9ydCB0aGUgU2xpY2tHcmlkIHBsdWdpbiB3aXRoIHJlcXVpcmVKU1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkubG9hZEV4dGVuc2lvbkR5bmFtaWNhbGx5KEV4dGVuc2lvbk5hbWUuZ3JpZE1lbnUpO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUgPSB7IC4uLnRoaXMuZ2V0RGVmYXVsdEdyaWRNZW51T3B0aW9ucygpLCAuLi50aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUgfTtcclxuXHJcbiAgICAgIC8vIG1lcmdlIG9yaWdpbmFsIHVzZXIgZ3JpZCBtZW51IGl0ZW1zIHdpdGggaW50ZXJuYWwgaXRlbXNcclxuICAgICAgLy8gdGhlbiBzb3J0IGFsbCBHcmlkIE1lbnUgQ3VzdG9tIEl0ZW1zIChzb3J0ZWQgYnkgcG9pbnRlciwgbm8gbmVlZCB0byB1c2UgdGhlIHJldHVybilcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmN1c3RvbUl0ZW1zID0gWy4uLnRoaXMuX3VzZXJPcmlnaW5hbEdyaWRNZW51LmN1c3RvbUl0ZW1zIHx8IFtdLCAuLi50aGlzLmFkZEdyaWRNZW51Q3VzdG9tQ29tbWFuZHMoKV07XHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS50cmFuc2xhdGVJdGVtcyh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tSXRlbXMsICd0aXRsZUtleScsICd0aXRsZScpO1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkuc29ydEl0ZW1zKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21JdGVtcywgJ3Bvc2l0aW9uT3JkZXInKTtcclxuXHJcbiAgICAgIHRoaXMuX2V4dGVuc2lvbiA9IG5ldyBTbGljay5Db250cm9scy5HcmlkTWVudSh0aGlzLnNoYXJlZFNlcnZpY2UuY29sdW1uRGVmaW5pdGlvbnMsIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLCB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMpO1xyXG5cclxuICAgICAgLy8gaG9vayBhbGwgZXZlbnRzXHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUpIHtcclxuICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lm9uRXh0ZW5zaW9uUmVnaXN0ZXJlZCkge1xyXG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lm9uRXh0ZW5zaW9uUmVnaXN0ZXJlZCh0aGlzLl9leHRlbnNpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2V4dGVuc2lvbi5vbkJlZm9yZU1lbnVTaG93LCAoZTogYW55LCBhcmdzOiBDZWxsQXJncykgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lm9uQmVmb3JlTWVudVNob3cgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lm9uQmVmb3JlTWVudVNob3coZSwgYXJncyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLl9leHRlbnNpb24ub25Db2x1bW5zQ2hhbmdlZCwgKGU6IGFueSwgYXJnczogQ2VsbEFyZ3MpID0+IHtcclxuICAgICAgICAgIHRoaXMuX2FyZVZpc2libGVDb2x1bW5EaWZmZXJlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lm9uQ29sdW1uc0NoYW5nZWQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lm9uQ29sdW1uc0NoYW5nZWQoZSwgYXJncyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLl9leHRlbnNpb24ub25Db21tYW5kLCAoZTogYW55LCBhcmdzOiBhbnkpID0+IHtcclxuICAgICAgICAgIHRoaXMuZXhlY3V0ZUdyaWRNZW51SW50ZXJuYWxDdXN0b21Db21tYW5kcyhlLCBhcmdzKTtcclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5vbkNvbW1hbmQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lm9uQ29tbWFuZChlLCBhcmdzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2V4dGVuc2lvbi5vbk1lbnVDbG9zZSwgKGU6IGFueSwgYXJnczogQ2VsbEFyZ3MpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5vbk1lbnVDbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUub25NZW51Q2xvc2UoZSwgYXJncyk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gd2UgYWxzbyB3YW50IHRvIHJlc2l6ZSB0aGUgY29sdW1ucyBpZiB0aGUgdXNlciBkZWNpZGVkIHRvIGhpZGUgY2VydGFpbiBjb2x1bW4ocylcclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuYXV0b3NpemVDb2x1bW5zID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHRoZSBncmlkIHN0aWxsIGV4aXN0IChieSBsb29raW5nIGlmIHRoZSBHcmlkIFVJRCBpcyBmb3VuZCBpbiB0aGUgRE9NIHRyZWUpXHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWRVaWQgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRVSUQoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2FyZVZpc2libGVDb2x1bW5EaWZmZXJlbnQgJiYgZ3JpZFVpZCAmJiAkKGAuJHtncmlkVWlkfWApLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVBdXRvU2l6ZUNvbHVtbnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmF1dG9zaXplQ29sdW1ucygpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB0aGlzLl9hcmVWaXNpYmxlQ29sdW1uRGlmZmVyZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy5fZXh0ZW5zaW9uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEV4ZWN1dGUgdGhlIEdyaWQgTWVudSBDdXN0b20gY29tbWFuZCBjYWxsYmFjayB0aGF0IHdhcyB0cmlnZ2VyZWQgYnkgdGhlIG9uQ29tbWFuZCBzdWJzY3JpYmVcclxuICAqIFRoZXNlIGFyZSB0aGUgZGVmYXVsdCBpbnRlcm5hbCBjdXN0b20gY29tbWFuZHNcclxuICAqIEBwYXJhbSBldmVudFxyXG4gICogQHBhcmFtIEdyaWRNZW51SXRlbSBhcmdzXHJcbiAgKi9cclxuICBleGVjdXRlR3JpZE1lbnVJbnRlcm5hbEN1c3RvbUNvbW1hbmRzKGU6IEV2ZW50LCBhcmdzOiBHcmlkTWVudUl0ZW0pIHtcclxuICAgIGlmIChhcmdzICYmIGFyZ3MuY29tbWFuZCkge1xyXG4gICAgICBzd2l0Y2ggKGFyZ3MuY29tbWFuZCkge1xyXG4gICAgICAgIGNhc2UgJ2NsZWFyLWZpbHRlcic6XHJcbiAgICAgICAgICB0aGlzLmZpbHRlclNlcnZpY2UuY2xlYXJGaWx0ZXJzKCk7XHJcbiAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZGF0YVZpZXcucmVmcmVzaCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnY2xlYXItc29ydGluZyc6XHJcbiAgICAgICAgICB0aGlzLnNvcnRTZXJ2aWNlLmNsZWFyU29ydGluZygpO1xyXG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmRhdGFWaWV3LnJlZnJlc2goKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2V4cG9ydC1jc3YnOlxyXG4gICAgICAgICAgdGhpcy5leHBvcnRTZXJ2aWNlLmV4cG9ydFRvRmlsZSh7XHJcbiAgICAgICAgICAgIGRlbGltaXRlcjogRGVsaW1pdGVyVHlwZS5jb21tYSxcclxuICAgICAgICAgICAgZmlsZW5hbWU6ICdleHBvcnQnLFxyXG4gICAgICAgICAgICBmb3JtYXQ6IEZpbGVUeXBlLmNzdixcclxuICAgICAgICAgICAgdXNlVXRmOFdpdGhCb206IHRydWVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnZXhwb3J0LXRleHQtZGVsaW1pdGVkJzpcclxuICAgICAgICAgIHRoaXMuZXhwb3J0U2VydmljZS5leHBvcnRUb0ZpbGUoe1xyXG4gICAgICAgICAgICBkZWxpbWl0ZXI6IERlbGltaXRlclR5cGUudGFiLFxyXG4gICAgICAgICAgICBmaWxlbmFtZTogJ2V4cG9ydCcsXHJcbiAgICAgICAgICAgIGZvcm1hdDogRmlsZVR5cGUudHh0LFxyXG4gICAgICAgICAgICB1c2VVdGY4V2l0aEJvbTogdHJ1ZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd0b2dnbGUtZmlsdGVyJzpcclxuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldEhlYWRlclJvd1Zpc2liaWxpdHkoIXRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldE9wdGlvbnMoKS5zaG93SGVhZGVyUm93KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3RvZ2dsZS10b3BwYW5lbCc6XHJcbiAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRUb3BQYW5lbFZpc2liaWxpdHkoIXRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldE9wdGlvbnMoKS5zaG93VG9wUGFuZWwpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndG9nZ2xlLXByZWhlYWRlcic6XHJcbiAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRQcmVIZWFkZXJQYW5lbFZpc2liaWxpdHkoIXRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldE9wdGlvbnMoKS5zaG93UHJlSGVhZGVyUGFuZWwpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAncmVmcmVzaC1kYXRhc2V0JzpcclxuICAgICAgICAgIHRoaXMucmVmcmVzaEJhY2tlbmREYXRhc2V0KCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBSZWZyZXNoIHRoZSBkYXRhc2V0IHRocm91Z2ggdGhlIEJhY2tlbmQgU2VydmljZSAqL1xyXG4gIHJlZnJlc2hCYWNrZW5kRGF0YXNldChncmlkT3B0aW9ucz86IEdyaWRPcHRpb24pIHtcclxuICAgIGxldCBxdWVyeSA9ICcnO1xyXG5cclxuICAgIC8vIHVzZXIgY2FuIHBhc3MgbmV3IHNldCBvZiBncmlkIG9wdGlvbnMgd2hpY2ggd2lsbCBvdmVycmlkZSBjdXJyZW50IG9uZXNcclxuICAgIGlmIChncmlkT3B0aW9ucykge1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgPSB7IC4uLnRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucywgLi4uZ3JpZE9wdGlvbnMgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBiYWNrZW5kQXBpID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xyXG4gICAgaWYgKCFiYWNrZW5kQXBpIHx8ICFiYWNrZW5kQXBpLnNlcnZpY2UgfHwgIWJhY2tlbmRBcGkucHJvY2Vzcykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEJhY2tlbmRTZXJ2aWNlQXBpIHJlcXVpcmVzIGF0IGxlYXN0IGEgXCJwcm9jZXNzXCIgZnVuY3Rpb24gYW5kIGEgXCJzZXJ2aWNlXCIgZGVmaW5lZGApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChiYWNrZW5kQXBpLnNlcnZpY2UpIHtcclxuICAgICAgcXVlcnkgPSBiYWNrZW5kQXBpLnNlcnZpY2UuYnVpbGRRdWVyeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChxdWVyeSAmJiBxdWVyeSAhPT0gJycpIHtcclxuICAgICAgLy8ga2VlcCBzdGFydCB0aW1lICYgZW5kIHRpbWVzdGFtcHMgJiByZXR1cm4gaXQgYWZ0ZXIgcHJvY2VzcyBleGVjdXRpb25cclxuICAgICAgY29uc3Qgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgIGlmIChiYWNrZW5kQXBpLnByZVByb2Nlc3MpIHtcclxuICAgICAgICBiYWNrZW5kQXBpLnByZVByb2Nlc3MoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gdGhlIHByb2Nlc3MgY291bGQgYmUgYW4gT2JzZXJ2YWJsZSAobGlrZSBIdHRwQ2xpZW50KSBvciBhIFByb21pc2VcclxuICAgICAgLy8gaW4gYW55IGNhc2UsIHdlIG5lZWQgdG8gaGF2ZSBhIFByb21pc2Ugc28gdGhhdCB3ZSBjYW4gYXdhaXQgb24gaXQgKGlmIGFuIE9ic2VydmFibGUsIGNvbnZlcnQgaXQgdG8gUHJvbWlzZSlcclxuICAgICAgY29uc3Qgb2JzZXJ2YWJsZU9yUHJvbWlzZSA9IGJhY2tlbmRBcGkucHJvY2VzcyhxdWVyeSk7XHJcblxyXG4gICAgICBjYXN0VG9Qcm9taXNlKG9ic2VydmFibGVPclByb21pc2UpLnRoZW4oKHByb2Nlc3NSZXN1bHQ6IEdyYXBocWxSZXN1bHQgfCBhbnkpID0+IHtcclxuICAgICAgICBjb25zdCBlbmRUaW1lID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgLy8gZnJvbSB0aGUgcmVzdWx0LCBjYWxsIG91ciBpbnRlcm5hbCBwb3N0IHByb2Nlc3MgdG8gdXBkYXRlIHRoZSBEYXRhc2V0IGFuZCBQYWdpbmF0aW9uIGluZm9cclxuICAgICAgICBpZiAocHJvY2Vzc1Jlc3VsdCAmJiBiYWNrZW5kQXBpICYmIGJhY2tlbmRBcGkuaW50ZXJuYWxQb3N0UHJvY2Vzcykge1xyXG4gICAgICAgICAgYmFja2VuZEFwaS5pbnRlcm5hbFBvc3RQcm9jZXNzKHByb2Nlc3NSZXN1bHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc2VuZCB0aGUgcmVzcG9uc2UgcHJvY2VzcyB0byB0aGUgcG9zdFByb2Nlc3MgY2FsbGJhY2tcclxuICAgICAgICBpZiAoYmFja2VuZEFwaSAmJiBiYWNrZW5kQXBpLnBvc3RQcm9jZXNzKSB7XHJcbiAgICAgICAgICBpZiAocHJvY2Vzc1Jlc3VsdCBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICAgICAgICBwcm9jZXNzUmVzdWx0LnN0YXRpc3RpY3MgPSB7XHJcbiAgICAgICAgICAgICAgc3RhcnRUaW1lLFxyXG4gICAgICAgICAgICAgIGVuZFRpbWUsXHJcbiAgICAgICAgICAgICAgZXhlY3V0aW9uVGltZTogZW5kVGltZS52YWx1ZU9mKCkgLSBzdGFydFRpbWUudmFsdWVPZigpLFxyXG4gICAgICAgICAgICAgIHRvdGFsSXRlbUNvdW50OiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnBhZ2luYXRpb24gJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnBhZ2luYXRpb24udG90YWxJdGVtc1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYmFja2VuZEFwaS5wb3N0UHJvY2Vzcyhwcm9jZXNzUmVzdWx0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIENyZWF0ZSBHcmlkIE1lbnUgd2l0aCBDdXN0b20gQ29tbWFuZHMgaWYgdXNlciBoYXMgZW5hYmxlZCBGaWx0ZXJzIGFuZC9vciB1c2VzIGEgQmFja2VuZCBTZXJ2aWNlIChPRGF0YSwgR3JhcGhRTCkgKi9cclxuICBwcml2YXRlIGFkZEdyaWRNZW51Q3VzdG9tQ29tbWFuZHMoKSB7XHJcbiAgICBjb25zdCBiYWNrZW5kQXBpID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpIHx8IG51bGw7XHJcbiAgICBjb25zdCBncmlkTWVudUN1c3RvbUl0ZW1zOiBHcmlkTWVudUl0ZW1bXSA9IFtdO1xyXG5cclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUZpbHRlcmluZykge1xyXG4gICAgICAvLyBzaG93IGdyaWQgbWVudTogY2xlYXIgYWxsIGZpbHRlcnNcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUgJiYgIXRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5oaWRlQ2xlYXJBbGxGaWx0ZXJzQ29tbWFuZCkge1xyXG4gICAgICAgIGdyaWRNZW51Q3VzdG9tSXRlbXMucHVzaChcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaWNvbkNsZWFyQWxsRmlsdGVyc0NvbW1hbmQgfHwgJ2ZhIGZhLWZpbHRlciB0ZXh0LWRhbmdlcicsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnQ0xFQVJfQUxMX0ZJTFRFUlMnKSA6IENvbnN0YW50cy5URVhUX0NMRUFSX0FMTF9GSUxURVJTLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdjbGVhci1maWx0ZXInLFxyXG4gICAgICAgICAgICBwb3NpdGlvbk9yZGVyOiA1MFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHNob3cgZ3JpZCBtZW51OiB0b2dnbGUgZmlsdGVyIHJvd1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSAmJiAhdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmhpZGVUb2dnbGVGaWx0ZXJDb21tYW5kKSB7XHJcbiAgICAgICAgZ3JpZE1lbnVDdXN0b21JdGVtcy5wdXNoKFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBpY29uQ3NzQ2xhc3M6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5pY29uVG9nZ2xlRmlsdGVyQ29tbWFuZCB8fCAnZmEgZmEtcmFuZG9tJyxcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdUT0dHTEVfRklMVEVSX1JPVycpIDogQ29uc3RhbnRzLlRFWFRfVE9HR0xFX0ZJTFRFUl9ST1csXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY29tbWFuZDogJ3RvZ2dsZS1maWx0ZXInLFxyXG4gICAgICAgICAgICBwb3NpdGlvbk9yZGVyOiA1MlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHNob3cgZ3JpZCBtZW51OiByZWZyZXNoIGRhdGFzZXRcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUgJiYgIXRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5oaWRlUmVmcmVzaERhdGFzZXRDb21tYW5kICYmIGJhY2tlbmRBcGkpIHtcclxuICAgICAgICBncmlkTWVudUN1c3RvbUl0ZW1zLnB1c2goXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGljb25Dc3NDbGFzczogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lmljb25SZWZyZXNoRGF0YXNldENvbW1hbmQgfHwgJ2ZhIGZhLXJlZnJlc2gnLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1JFRlJFU0hfREFUQVNFVCcpIDogQ29uc3RhbnRzLlRFWFRfUkVGUkVTSF9EQVRBU0VULFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdyZWZyZXNoLWRhdGFzZXQnLFxyXG4gICAgICAgICAgICBwb3NpdGlvbk9yZGVyOiA1NFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnNob3dQcmVIZWFkZXJQYW5lbCkge1xyXG4gICAgICAvLyBzaG93IGdyaWQgbWVudTogdG9nZ2xlIHByZS1oZWFkZXIgcm93XHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmICF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaGlkZVRvZ2dsZVByZUhlYWRlckNvbW1hbmQpIHtcclxuICAgICAgICBncmlkTWVudUN1c3RvbUl0ZW1zLnB1c2goXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGljb25Dc3NDbGFzczogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lmljb25Ub2dnbGVQcmVIZWFkZXJDb21tYW5kIHx8ICdmYSBmYS1yYW5kb20nLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1RPR0dMRV9QUkVfSEVBREVSX1JPVycpIDogQ29uc3RhbnRzLlRFWFRfVE9HR0xFX1BSRV9IRUFERVJfUk9XLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbW1hbmQ6ICd0b2dnbGUtcHJlaGVhZGVyJyxcclxuICAgICAgICAgICAgcG9zaXRpb25PcmRlcjogNTJcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVTb3J0aW5nKSB7XHJcbiAgICAgIC8vIHNob3cgZ3JpZCBtZW51OiBjbGVhciBhbGwgc29ydGluZ1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSAmJiAhdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmhpZGVDbGVhckFsbFNvcnRpbmdDb21tYW5kKSB7XHJcbiAgICAgICAgZ3JpZE1lbnVDdXN0b21JdGVtcy5wdXNoKFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBpY29uQ3NzQ2xhc3M6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5pY29uQ2xlYXJBbGxTb3J0aW5nQ29tbWFuZCB8fCAnZmEgZmEtdW5zb3J0ZWQgdGV4dC1kYW5nZXInLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0NMRUFSX0FMTF9TT1JUSU5HJykgOiBDb25zdGFudHMuVEVYVF9DTEVBUl9BTExfU09SVElORyxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb21tYW5kOiAnY2xlYXItc29ydGluZycsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDUxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHNob3cgZ3JpZCBtZW51OiBleHBvcnQgdG8gZmlsZVxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlRXhwb3J0ICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSAmJiAhdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmhpZGVFeHBvcnRDc3ZDb21tYW5kKSB7XHJcbiAgICAgIGdyaWRNZW51Q3VzdG9tSXRlbXMucHVzaChcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpY29uQ3NzQ2xhc3M6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5pY29uRXhwb3J0Q3N2Q29tbWFuZCB8fCAnZmEgZmEtZG93bmxvYWQnLFxyXG4gICAgICAgICAgdGl0bGU6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdFWFBPUlRfVE9fQ1NWJykgOiBDb25zdGFudHMuVEVYVF9FWFBPUlRfSU5fQ1NWX0ZPUk1BVCxcclxuICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgIGNvbW1hbmQ6ICdleHBvcnQtY3N2JyxcclxuICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDUzXHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgLy8gc2hvdyBncmlkIG1lbnU6IGV4cG9ydCB0byB0ZXh0IGZpbGUgYXMgdGFiIGRlbGltaXRlZFxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlRXhwb3J0ICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSAmJiAhdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmhpZGVFeHBvcnRUZXh0RGVsaW1pdGVkQ29tbWFuZCkge1xyXG4gICAgICBncmlkTWVudUN1c3RvbUl0ZW1zLnB1c2goXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWNvbkNzc0NsYXNzOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaWNvbkV4cG9ydFRleHREZWxpbWl0ZWRDb21tYW5kIHx8ICdmYSBmYS1kb3dubG9hZCcsXHJcbiAgICAgICAgICB0aXRsZTogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0VYUE9SVF9UT19UQUJfREVMSU1JVEVEJykgOiBDb25zdGFudHMuVEVYVF9FWFBPUlRfSU5fVEVYVF9GT1JNQVQsXHJcbiAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICBjb21tYW5kOiAnZXhwb3J0LXRleHQtZGVsaW1pdGVkJyxcclxuICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDU0XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZCB0aGUgY3VzdG9tIFwiQ29tbWFuZHNcIiB0aXRsZSBpZiB0aGVyZSBhcmUgYW55IGNvbW1hbmRzXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSAmJiAoZ3JpZE1lbnVDdXN0b21JdGVtcy5sZW5ndGggPiAwIHx8ICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tSXRlbXMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmN1c3RvbUl0ZW1zLmxlbmd0aCA+IDApKSkge1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tVGl0bGUgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tVGl0bGUgfHwgdGhpcy5leHRlbnNpb25VdGlsaXR5LmdldFBpY2tlclRpdGxlT3V0cHV0U3RyaW5nKCdjdXN0b21UaXRsZScsICdncmlkTWVudScpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBncmlkTWVudUN1c3RvbUl0ZW1zO1xyXG4gIH1cclxuXHJcbiAgLyoqIEV4ZWN1dGUgdGhlIEhlYWRlciBNZW51IENvbW1hbmRzIHRoYXQgd2FzIHRyaWdnZXJlZCBieSB0aGUgb25Db21tYW5kIHN1YnNjcmliZSAqL1xyXG4gIGV4ZWN1dGVIZWFkZXJNZW51SW50ZXJuYWxDb21tYW5kcyhlOiBFdmVudCwgYXJnczogSGVhZGVyTWVudU9uQ29tbWFuZEFyZ3MpIHtcclxuICAgIGlmIChhcmdzICYmIGFyZ3MuY29tbWFuZCkge1xyXG4gICAgICBzd2l0Y2ggKGFyZ3MuY29tbWFuZCkge1xyXG4gICAgICAgIGNhc2UgJ2hpZGUnOlxyXG4gICAgICAgICAgdGhpcy5oaWRlQ29sdW1uKGFyZ3MuY29sdW1uKTtcclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUF1dG9TaXplQ29sdW1ucykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5hdXRvc2l6ZUNvbHVtbnMoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3NvcnQtYXNjJzpcclxuICAgICAgICBjYXNlICdzb3J0LWRlc2MnOlxyXG4gICAgICAgICAgLy8gZ2V0IHByZXZpb3VzbHkgc29ydGVkIGNvbHVtbnNcclxuICAgICAgICAgIGNvbnN0IGNvbHM6IENvbHVtblNvcnRbXSA9IHRoaXMuc29ydFNlcnZpY2UuZ2V0UHJldmlvdXNDb2x1bW5Tb3J0cyhhcmdzLmNvbHVtbi5pZCArICcnKTtcclxuXHJcbiAgICAgICAgICAvLyBhZGQgdG8gdGhlIGNvbHVtbiBhcnJheSwgdGhlIGNvbHVtbiBzb3J0ZWQgYnkgdGhlIGhlYWRlciBtZW51XHJcbiAgICAgICAgICBjb2xzLnB1c2goeyBzb3J0Q29sOiBhcmdzLmNvbHVtbiwgc29ydEFzYzogKGFyZ3MuY29tbWFuZCA9PT0gJ3NvcnQtYXNjJykgfSk7XHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydFNlcnZpY2Uub25CYWNrZW5kU29ydENoYW5nZWQoZSwgeyBtdWx0aUNvbHVtblNvcnQ6IHRydWUsIHNvcnRDb2xzOiBjb2xzLCBncmlkOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydFNlcnZpY2Uub25Mb2NhbFNvcnRDaGFuZ2VkKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLCB0aGlzLnNoYXJlZFNlcnZpY2UuZGF0YVZpZXcsIGNvbHMpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPYmogc29ydENvbHVtbnMgYXJyYXkgd2hpY2ggd2lsbCBhdCB0aGUgc2FtZSBhZGQgdGhlIHZpc3VhbCBzb3J0IGljb24ocykgb24gdGhlIFVJXHJcbiAgICAgICAgICBjb25zdCBuZXdTb3J0Q29sdW1uczogQ29sdW1uU29ydFtdID0gY29scy5tYXAoKGNvbCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgIGNvbHVtbklkOiBjb2wgJiYgY29sLnNvcnRDb2wgJiYgY29sLnNvcnRDb2wuaWQsXHJcbiAgICAgICAgICAgICAgc29ydEFzYzogY29sICYmIGNvbC5zb3J0QXNjXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldFNvcnRDb2x1bW5zKG5ld1NvcnRDb2x1bW5zKTsgLy8gYWRkIHNvcnQgaWNvbiBpbiBVSVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogSGlkZSBhIGNvbHVtbiBmcm9tIHRoZSBncmlkICovXHJcbiAgaGlkZUNvbHVtbihjb2x1bW46IENvbHVtbikge1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldENvbHVtbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0Q29sdW1ucykge1xyXG4gICAgICBjb25zdCBjb2x1bW5JbmRleCA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldENvbHVtbkluZGV4KGNvbHVtbi5pZCk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyA9IHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5hcnJheVJlbW92ZUl0ZW1CeUluZGV4KHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldENvbHVtbnMoKSwgY29sdW1uSW5kZXgpO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRDb2x1bW5zKHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVHJhbnNsYXRlIHRoZSBHcmlkIE1lbnUgdGl0bGVzIGFuZCBjb2x1bW4gcGlja2VyICovXHJcbiAgdHJhbnNsYXRlR3JpZE1lbnUoKSB7XHJcbiAgICAvLyB1cGRhdGUgdGhlIHByb3BlcnRpZXMgYnkgcG9pbnRlcnMsIHRoYXQgaXMgdGhlIG9ubHkgd2F5IHRvIGdldCBHcmlkIE1lbnUgQ29udHJvbCB0byBzZWUgdGhlIG5ldyB2YWx1ZXNcclxuICAgIC8vIHdlIGFsc28gbmVlZCB0byBjYWxsIHRoZSBjb250cm9sIGluaXQgc28gdGhhdCBpdCB0YWtlcyB0aGUgbmV3IEdyaWQgb2JqZWN0IHdpdGggbGF0ZXN0IHZhbHVlc1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUpIHtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmN1c3RvbUl0ZW1zID0gW107XHJcbiAgICAgIHRoaXMuZW1wdHlHcmlkTWVudVRpdGxlcygpO1xyXG5cclxuICAgICAgLy8gbWVyZ2Ugb3JpZ2luYWwgdXNlciBncmlkIG1lbnUgaXRlbXMgd2l0aCBpbnRlcm5hbCBpdGVtc1xyXG4gICAgICAvLyB0aGVuIHNvcnQgYWxsIEdyaWQgTWVudSBDdXN0b20gSXRlbXMgKHNvcnRlZCBieSBwb2ludGVyLCBubyBuZWVkIHRvIHVzZSB0aGUgcmV0dXJuKVxyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tSXRlbXMgPSBbLi4udGhpcy5fdXNlck9yaWdpbmFsR3JpZE1lbnUuY3VzdG9tSXRlbXMgfHwgW10sIC4uLnRoaXMuYWRkR3JpZE1lbnVDdXN0b21Db21tYW5kcygpXTtcclxuICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LnRyYW5zbGF0ZUl0ZW1zKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21JdGVtcywgJ3RpdGxlS2V5JywgJ3RpdGxlJyk7XHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5zb3J0SXRlbXModGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmN1c3RvbUl0ZW1zLCAncG9zaXRpb25PcmRlcicpO1xyXG5cclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmNvbHVtblRpdGxlID0gdGhpcy5leHRlbnNpb25VdGlsaXR5LmdldFBpY2tlclRpdGxlT3V0cHV0U3RyaW5nKCdjb2x1bW5UaXRsZScsICdncmlkTWVudScpO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuZm9yY2VGaXRUaXRsZSA9IHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5nZXRQaWNrZXJUaXRsZU91dHB1dFN0cmluZygnZm9yY2VGaXRUaXRsZScsICdncmlkTWVudScpO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuc3luY1Jlc2l6ZVRpdGxlID0gdGhpcy5leHRlbnNpb25VdGlsaXR5LmdldFBpY2tlclRpdGxlT3V0cHV0U3RyaW5nKCdzeW5jUmVzaXplVGl0bGUnLCAnZ3JpZE1lbnUnKTtcclxuXHJcbiAgICAgIC8vIHRyYW5zbGF0ZSBhbGwgY29sdW1ucyAoaW5jbHVkaW5nIG5vbi12aXNpYmxlKVxyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkudHJhbnNsYXRlSXRlbXModGhpcy5zaGFyZWRTZXJ2aWNlLmFsbENvbHVtbnMsICdoZWFkZXJLZXknLCAnbmFtZScpO1xyXG5cclxuICAgICAgLy8gcmUtaW5pdGlhbGl6ZSB0aGUgR3JpZCBNZW51LCB0aGF0IHdpbGwgcmVjcmVhdGUgYWxsIHRoZSBtZW51cyAmIGxpc3RcclxuICAgICAgLy8gZG9pbmcgYW4gXCJpbml0KClcIiB3b24ndCBkcm9wIGFueSBleGlzdGluZyBjb21tYW5kIGF0dGFjaGVkXHJcbiAgICAgIGlmICh0aGlzLl9leHRlbnNpb24uaW5pdCkge1xyXG4gICAgICAgIHRoaXMuX2V4dGVuc2lvbi5pbml0KHRoaXMuc2hhcmVkU2VydmljZS5ncmlkKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBlbXB0eUdyaWRNZW51VGl0bGVzKCkge1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51KSB7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21UaXRsZSA9ICcnO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY29sdW1uVGl0bGUgPSAnJztcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmZvcmNlRml0VGl0bGUgPSAnJztcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LnN5bmNSZXNpemVUaXRsZSA9ICcnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBAcmV0dXJuIGRlZmF1bHQgR3JpZCBNZW51IG9wdGlvbnNcclxuICAqL1xyXG4gIHByaXZhdGUgZ2V0RGVmYXVsdEdyaWRNZW51T3B0aW9ucygpOiBHcmlkTWVudSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjdXN0b21UaXRsZTogdW5kZWZpbmVkLFxyXG4gICAgICBjb2x1bW5UaXRsZTogdGhpcy5leHRlbnNpb25VdGlsaXR5LmdldFBpY2tlclRpdGxlT3V0cHV0U3RyaW5nKCdjb2x1bW5UaXRsZScsICdncmlkTWVudScpLFxyXG4gICAgICBmb3JjZUZpdFRpdGxlOiB0aGlzLmV4dGVuc2lvblV0aWxpdHkuZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcoJ2ZvcmNlRml0VGl0bGUnLCAnZ3JpZE1lbnUnKSxcclxuICAgICAgc3luY1Jlc2l6ZVRpdGxlOiB0aGlzLmV4dGVuc2lvblV0aWxpdHkuZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcoJ3N5bmNSZXNpemVUaXRsZScsICdncmlkTWVudScpLFxyXG4gICAgICBpY29uQ3NzQ2xhc3M6ICdmYSBmYS1iYXJzJyxcclxuICAgICAgbWVudVdpZHRoOiAxOCxcclxuICAgICAgY3VzdG9tSXRlbXM6IFtdLFxyXG4gICAgICBoaWRlQ2xlYXJBbGxGaWx0ZXJzQ29tbWFuZDogZmFsc2UsXHJcbiAgICAgIGhpZGVSZWZyZXNoRGF0YXNldENvbW1hbmQ6IGZhbHNlLFxyXG4gICAgICBoaWRlVG9nZ2xlRmlsdGVyQ29tbWFuZDogZmFsc2UsXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=