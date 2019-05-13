/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import { ExtensionName, } from '../models/index';
import { FilterService } from '../services/filter.service';
import { SortService } from '../services/sort.service';
import { SharedService } from '../services/shared.service';
import { ExtensionUtility } from './extensionUtility';
var HeaderMenuExtension = /** @class */ (function () {
    function HeaderMenuExtension(extensionUtility, filterService, sharedService, sortService, translate) {
        this.extensionUtility = extensionUtility;
        this.filterService = filterService;
        this.sharedService = sharedService;
        this.sortService = sortService;
        this.translate = translate;
        this._eventHandler = new Slick.EventHandler();
    }
    /**
     * @return {?}
     */
    HeaderMenuExtension.prototype.dispose = /**
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
    * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
    * @param grid
    * @param dataView
    * @param columnDefinitions
    */
    /**
     * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
     * @return {?}
     */
    HeaderMenuExtension.prototype.register = /**
     * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.headerMenu);
            this.sharedService.gridOptions.headerMenu = tslib_1.__assign({}, this.getDefaultHeaderMenuOptions(), this.sharedService.gridOptions.headerMenu);
            if (this.sharedService.gridOptions.enableHeaderMenu) {
                this.sharedService.gridOptions.headerMenu = this.addHeaderMenuCustomCommands(this.sharedService.gridOptions, this.sharedService.columnDefinitions);
            }
            this._extension = new Slick.Plugins.HeaderMenu(this.sharedService.gridOptions.headerMenu);
            this.sharedService.grid.registerPlugin(this._extension);
            // hook all events
            if (this.sharedService.grid && this.sharedService.gridOptions.headerMenu) {
                if (this.sharedService.gridOptions.headerMenu.onExtensionRegistered) {
                    this.sharedService.gridOptions.headerMenu.onExtensionRegistered(this._extension);
                }
                this._eventHandler.subscribe(this._extension.onCommand, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                function (e, args) {
                    _this.executeHeaderMenuInternalCommands(e, args);
                    if (_this.sharedService.gridOptions.headerMenu && typeof _this.sharedService.gridOptions.headerMenu.onCommand === 'function') {
                        _this.sharedService.gridOptions.headerMenu.onCommand(e, args);
                    }
                }));
                this._eventHandler.subscribe(this._extension.onBeforeMenuShow, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                function (e, args) {
                    if (_this.sharedService.gridOptions.headerMenu && typeof _this.sharedService.gridOptions.headerMenu.onBeforeMenuShow === 'function') {
                        _this.sharedService.gridOptions.headerMenu.onBeforeMenuShow(e, args);
                    }
                }));
            }
            return this._extension;
        }
        return null;
    };
    /**
     * Create Header Menu with Custom Commands if user has enabled Header Menu
     * @param options
     * @param columnDefinitions
     * @return header menu
     */
    /**
     * Create Header Menu with Custom Commands if user has enabled Header Menu
     * @private
     * @param {?} options
     * @param {?} columnDefinitions
     * @return {?} header menu
     */
    HeaderMenuExtension.prototype.addHeaderMenuCustomCommands = /**
     * Create Header Menu with Custom Commands if user has enabled Header Menu
     * @private
     * @param {?} options
     * @param {?} columnDefinitions
     * @return {?} header menu
     */
    function (options, columnDefinitions) {
        var _this = this;
        /** @type {?} */
        var headerMenuOptions = options.headerMenu || {};
        if (columnDefinitions && Array.isArray(columnDefinitions) && options.enableHeaderMenu) {
            columnDefinitions.forEach((/**
             * @param {?} columnDef
             * @return {?}
             */
            function (columnDef) {
                if (columnDef && !columnDef.excludeFromHeaderMenu) {
                    if (!columnDef.header || !columnDef.header.menu) {
                        columnDef.header = {
                            menu: {
                                items: []
                            }
                        };
                    }
                    /** @type {?} */
                    var columnHeaderMenuItems = columnDef && columnDef.header && columnDef.header.menu && columnDef.header.menu.items || [];
                    // Sorting Commands
                    if (options.enableSorting && columnDef.sortable && headerMenuOptions && !headerMenuOptions.hideSortCommands) {
                        if (columnHeaderMenuItems.filter((/**
                         * @param {?} item
                         * @return {?}
                         */
                        function (item) { return item.command === 'sort-asc'; })).length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconSortAscCommand || 'fa fa-sort-asc',
                                title: options.enableTranslate ? _this.translate.instant('SORT_ASCENDING') : Constants.TEXT_SORT_ASCENDING,
                                command: 'sort-asc',
                                positionOrder: 50
                            });
                        }
                        if (columnHeaderMenuItems.filter((/**
                         * @param {?} item
                         * @return {?}
                         */
                        function (item) { return item.command === 'sort-desc'; })).length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconSortDescCommand || 'fa fa-sort-desc',
                                title: options.enableTranslate ? _this.translate.instant('SORT_DESCENDING') : Constants.TEXT_SORT_DESCENDING,
                                command: 'sort-desc',
                                positionOrder: 51
                            });
                        }
                        // add a divider (separator) between the top sort commands and the other clear commands
                        columnHeaderMenuItems.push({ divider: true, command: '', positionOrder: 52 });
                        if (!headerMenuOptions.hideClearSortCommand && columnHeaderMenuItems.filter((/**
                         * @param {?} item
                         * @return {?}
                         */
                        function (item) { return item.command === 'clear-sort'; })).length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconClearSortCommand || 'fa fa-unsorted',
                                title: options.enableTranslate ? _this.translate.instant('REMOVE_SORT') : Constants.TEXT_REMOVE_SORT,
                                command: 'clear-sort',
                                positionOrder: 53
                            });
                        }
                    }
                    // Filtering Commands
                    if (options.enableFiltering && columnDef.filterable && headerMenuOptions && !headerMenuOptions.hideFilterCommands) {
                        if (!headerMenuOptions.hideClearFilterCommand && columnHeaderMenuItems.filter((/**
                         * @param {?} item
                         * @return {?}
                         */
                        function (item) { return item.command === 'clear-filter'; })).length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconClearFilterCommand || 'fa fa-filter',
                                title: options.enableTranslate ? _this.translate.instant('REMOVE_FILTER') : Constants.TEXT_REMOVE_FILTER,
                                command: 'clear-filter',
                                positionOrder: 52
                            });
                        }
                    }
                    // Hide Column Command
                    if (headerMenuOptions && !headerMenuOptions.hideColumnHideCommand && columnHeaderMenuItems.filter((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) { return item.command === 'hide'; })).length === 0) {
                        columnHeaderMenuItems.push({
                            iconCssClass: headerMenuOptions.iconColumnHideCommand || 'fa fa-times',
                            title: options.enableTranslate ? _this.translate.instant('HIDE_COLUMN') : Constants.TEXT_HIDE_COLUMN,
                            command: 'hide',
                            positionOrder: 55
                        });
                    }
                    _this.extensionUtility.translateItems(columnHeaderMenuItems, 'titleKey', 'title');
                    // sort the custom items by their position in the list
                    columnHeaderMenuItems.sort((/**
                     * @param {?} itemA
                     * @param {?} itemB
                     * @return {?}
                     */
                    function (itemA, itemB) {
                        if (itemA && itemB && itemA.hasOwnProperty('positionOrder') && itemB.hasOwnProperty('positionOrder')) {
                            return itemA.positionOrder - itemB.positionOrder;
                        }
                        return 0;
                    }));
                }
            }));
        }
        return headerMenuOptions;
    };
    /** Execute the Header Menu Commands that was triggered by the onCommand subscribe */
    /**
     * Execute the Header Menu Commands that was triggered by the onCommand subscribe
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    HeaderMenuExtension.prototype.executeHeaderMenuInternalCommands = /**
     * Execute the Header Menu Commands that was triggered by the onCommand subscribe
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    function (event, args) {
        if (args && args.command) {
            switch (args.command) {
                case 'hide':
                    this.hideColumn(args.column);
                    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableAutoSizeColumns) {
                        this.sharedService.grid.autosizeColumns();
                    }
                    break;
                case 'clear-filter':
                    this.clearColumnFilter(event, args);
                    break;
                case 'clear-sort':
                    this.clearColumnSort(event, args);
                    break;
                case 'sort-asc':
                case 'sort-desc':
                    /** @type {?} */
                    var isSortingAsc = (args.command === 'sort-asc');
                    this.sortColumn(event, args, isSortingAsc);
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
    HeaderMenuExtension.prototype.hideColumn = /**
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
    /**
     * Reset all the Grid Menu options which have text to translate
     * @param grid menu object
     */
    /**
     * Reset all the Grid Menu options which have text to translate
     * @param {?} columnDefinitions
     * @return {?}
     */
    HeaderMenuExtension.prototype.resetHeaderMenuTranslations = /**
     * Reset all the Grid Menu options which have text to translate
     * @param {?} columnDefinitions
     * @return {?}
     */
    function (columnDefinitions) {
        var _this = this;
        columnDefinitions.forEach((/**
         * @param {?} columnDef
         * @return {?}
         */
        function (columnDef) {
            if (columnDef && columnDef.header && columnDef.header && columnDef.header.menu && columnDef.header.menu.items) {
                if (!columnDef.excludeFromHeaderMenu) {
                    /** @type {?} */
                    var columnHeaderMenuItems_1 = columnDef.header.menu.items || [];
                    columnHeaderMenuItems_1.forEach((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) {
                        switch (item.command) {
                            case 'clear-filter':
                                item.title = _this.translate.instant('REMOVE_FILTER') || Constants.TEXT_REMOVE_FILTER;
                                break;
                            case 'clear-sort':
                                item.title = _this.translate.instant('REMOVE_SORT') || Constants.TEXT_REMOVE_SORT;
                                break;
                            case 'sort-asc':
                                item.title = _this.translate.instant('SORT_ASCENDING') || Constants.TEXT_SORT_ASCENDING;
                                break;
                            case 'sort-desc':
                                item.title = _this.translate.instant('SORT_DESCENDING') || Constants.TEXT_SORT_DESCENDING;
                                break;
                            case 'hide':
                                item.title = _this.translate.instant('HIDE_COLUMN') || Constants.TEXT_HIDE_COLUMN;
                                break;
                        }
                        // re-translate if there's a "titleKey"
                        if (_this.sharedService.gridOptions && _this.sharedService.gridOptions.enableTranslate) {
                            _this.extensionUtility.translateItems(columnHeaderMenuItems_1, 'titleKey', 'title');
                        }
                    }));
                }
            }
        }));
    };
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     */
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    HeaderMenuExtension.prototype.translateHeaderMenu = /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    function () {
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.headerMenu) {
            this.resetHeaderMenuTranslations(this.sharedService.visibleColumns);
        }
    };
    /**
     * @return default Header Menu options
     */
    /**
     * @private
     * @return {?} default Header Menu options
     */
    HeaderMenuExtension.prototype.getDefaultHeaderMenuOptions = /**
     * @private
     * @return {?} default Header Menu options
     */
    function () {
        return {
            autoAlignOffset: 12,
            minWidth: 140,
            hideColumnHideCommand: false,
            hideSortCommands: false,
            title: ''
        };
    };
    /** Sort the current column */
    /**
     * Sort the current column
     * @private
     * @param {?} event
     * @param {?} args
     * @param {?=} isSortingAsc
     * @return {?}
     */
    HeaderMenuExtension.prototype.sortColumn = /**
     * Sort the current column
     * @private
     * @param {?} event
     * @param {?} args
     * @param {?=} isSortingAsc
     * @return {?}
     */
    function (event, args, isSortingAsc) {
        if (isSortingAsc === void 0) { isSortingAsc = true; }
        if (args && args.column) {
            // get previously sorted columns
            /** @type {?} */
            var sortedColsWithoutCurrent = this.sortService.getPreviousColumnSorts(args.column.id + '');
            // add to the column array, the column sorted by the header menu
            sortedColsWithoutCurrent.push({ sortCol: args.column, sortAsc: isSortingAsc });
            if (this.sharedService.gridOptions.backendServiceApi) {
                this.sortService.onBackendSortChanged(event, { multiColumnSort: true, sortCols: sortedColsWithoutCurrent, grid: this.sharedService.grid });
            }
            else if (this.sharedService.dataView) {
                this.sortService.onLocalSortChanged(this.sharedService.grid, this.sharedService.dataView, sortedColsWithoutCurrent);
            }
            else {
                // when using customDataView, we will simply send it as a onSort event with notify
                /** @type {?} */
                var isMultiSort = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.multiColumnSort || false;
                /** @type {?} */
                var sortOutput = isMultiSort ? sortedColsWithoutCurrent : sortedColsWithoutCurrent[0];
                args.grid.onSort.notify(sortOutput);
            }
            // update the this.sharedService.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
            /** @type {?} */
            var newSortColumns = sortedColsWithoutCurrent.map((/**
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
        }
    };
    /** Clear the Filter on the current column (if it's actually filtered) */
    /**
     * Clear the Filter on the current column (if it's actually filtered)
     * @private
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    HeaderMenuExtension.prototype.clearColumnFilter = /**
     * Clear the Filter on the current column (if it's actually filtered)
     * @private
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    function (event, args) {
        if (args && args.column) {
            this.filterService.clearFilterByColumnId(event, args.column.id);
        }
    };
    /** Clear the Sort on the current column (if it's actually sorted) */
    /**
     * Clear the Sort on the current column (if it's actually sorted)
     * @private
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    HeaderMenuExtension.prototype.clearColumnSort = /**
     * Clear the Sort on the current column (if it's actually sorted)
     * @private
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    function (event, args) {
        if (args && args.column && this.sharedService) {
            // get previously sorted columns
            /** @type {?} */
            var allSortedCols = this.sortService.getPreviousColumnSorts();
            /** @type {?} */
            var sortedColsWithoutCurrent = this.sortService.getPreviousColumnSorts(args.column.id + '');
            if (allSortedCols.length !== sortedColsWithoutCurrent.length) {
                if (this.sharedService.gridOptions && this.sharedService.gridOptions.backendServiceApi) {
                    this.sortService.onBackendSortChanged(event, { multiColumnSort: true, sortCols: sortedColsWithoutCurrent, grid: this.sharedService.grid });
                }
                else if (this.sharedService.dataView) {
                    this.sortService.onLocalSortChanged(this.sharedService.grid, this.sharedService.dataView, sortedColsWithoutCurrent, true);
                }
                else {
                    // when using customDataView, we will simply send it as a onSort event with notify
                    /** @type {?} */
                    var isMultiSort = this.sharedService.gridOptions && this.sharedService.gridOptions.multiColumnSort || false;
                    /** @type {?} */
                    var sortOutput = isMultiSort ? sortedColsWithoutCurrent : sortedColsWithoutCurrent[0];
                    args.grid.onSort.notify(sortOutput);
                }
                // update the this.sharedService.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
                /** @type {?} */
                var updatedSortColumns = sortedColsWithoutCurrent.map((/**
                 * @param {?} col
                 * @return {?}
                 */
                function (col) {
                    return {
                        columnId: col && col.sortCol && col.sortCol.id,
                        sortAsc: col && col.sortAsc
                    };
                }));
                this.sharedService.grid.setSortColumns(updatedSortColumns); // add sort icon in UI
            }
        }
    };
    HeaderMenuExtension.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    HeaderMenuExtension.ctorParameters = function () { return [
        { type: ExtensionUtility },
        { type: FilterService },
        { type: SharedService },
        { type: SortService },
        { type: TranslateService }
    ]; };
    return HeaderMenuExtension;
}());
export { HeaderMenuExtension };
if (false) {
    /**
     * @type {?}
     * @private
     */
    HeaderMenuExtension.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    HeaderMenuExtension.prototype._extension;
    /**
     * @type {?}
     * @private
     */
    HeaderMenuExtension.prototype.extensionUtility;
    /**
     * @type {?}
     * @private
     */
    HeaderMenuExtension.prototype.filterService;
    /**
     * @type {?}
     * @private
     */
    HeaderMenuExtension.prototype.sharedService;
    /**
     * @type {?}
     * @private
     */
    HeaderMenuExtension.prototype.sortService;
    /**
     * @type {?}
     * @private
     */
    HeaderMenuExtension.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyTWVudUV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9oZWFkZXJNZW51RXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFJTCxhQUFhLEdBTWQsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUt0RDtJQUtFLDZCQUNVLGdCQUFrQyxFQUNsQyxhQUE0QixFQUM1QixhQUE0QixFQUM1QixXQUF3QixFQUN4QixTQUEyQjtRQUozQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBUjdCLGtCQUFhLEdBQVEsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7SUFTbEQsQ0FBQzs7OztJQUVMLHFDQUFPOzs7SUFBUDtRQUNFLG1DQUFtQztRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3BDLElBQUksSUFBSSxDQUFDLFVB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QUNuRjtTQUNGO0lBQ0gsQ0FBQzs7Z0JBelRGLFVBQVU7Ozs7Z0JBTEYsZ0JBQWdCO2dCQUhoQixhQUFhO2dCQUViLGFBQWE7Z0JBRGIsV0FBVztnQkFkWCxnQkFBZ0I7O0lBK1V6QiwwQkFBQztDQUFBLEFBMVRELElBMFRDO1NBelRZLG1CQUFtQjs7Ozs7O0lBQzlCLDRDQUFzRDs7Ozs7SUFDdEQseUNBQXdCOzs7OztJQUd0QiwrQ0FBMEM7Ozs7O0lBQzFDLDRDQUFvQzs7Ozs7SUFDcEMsNENBQW9DOzs7OztJQUNwQywwQ0FBZ0M7Ozs7O0lBQ2hDLHdDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQge1xyXG4gIENvbHVtbixcclxuICBDb2x1bW5Tb3J0LFxyXG4gIEV4dGVuc2lvbixcclxuICBFeHRlbnNpb25OYW1lLFxyXG4gIEdyaWRPcHRpb24sXHJcbiAgSGVhZGVyTWVudSxcclxuICBIZWFkZXJNZW51SXRlbSxcclxuICBIZWFkZXJNZW51T25Db21tYW5kQXJncyxcclxuICBIZWFkZXJNZW51T25CZWZvcmVNZW51U2hvd0FyZ3MsXHJcbn0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgRmlsdGVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2ZpbHRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU29ydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zb3J0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBFeHRlbnNpb25VdGlsaXR5IH0gZnJvbSAnLi9leHRlbnNpb25VdGlsaXR5JztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEhlYWRlck1lbnVFeHRlbnNpb24gaW1wbGVtZW50cyBFeHRlbnNpb24ge1xyXG4gIHByaXZhdGUgX2V2ZW50SGFuZGxlcjogYW55ID0gbmV3IFNsaWNrLkV2ZW50SGFuZGxlcigpO1xyXG4gIHByaXZhdGUgX2V4dGVuc2lvbjogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZXh0ZW5zaW9uVXRpbGl0eTogRXh0ZW5zaW9uVXRpbGl0eSxcclxuICAgIHByaXZhdGUgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSxcclxuICAgIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSxcclxuICAgIHByaXZhdGUgc29ydFNlcnZpY2U6IFNvcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgKSB7IH1cclxuXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCBTbGlja0dyaWQgZXZlbnRzXHJcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcclxuICAgIGlmICh0aGlzLl9leHRlbnNpb24gJiYgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3kpIHtcclxuICAgICAgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogQ3JlYXRlIHRoZSBIZWFkZXIgTWVudSBhbmQgZXhwb3NlIGFsbCB0aGUgYXZhaWxhYmxlIGhvb2tzIHRoYXQgdXNlciBjYW4gc3Vic2NyaWJlIChvbkNvbW1hbmQsIG9uQmVmb3JlTWVudVNob3csIC4uLilcclxuICAqIEBwYXJhbSBncmlkXHJcbiAgKiBAcGFyYW0gZGF0YVZpZXdcclxuICAqIEBwYXJhbSBjb2x1bW5EZWZpbml0aW9uc1xyXG4gICovXHJcbiAgcmVnaXN0ZXIoKTogYW55IHtcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zKSB7XHJcbiAgICAgIC8vIGR5bmFtaWNhbGx5IGltcG9ydCB0aGUgU2xpY2tHcmlkIHBsdWdpbiB3aXRoIHJlcXVpcmVKU1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkubG9hZEV4dGVuc2lvbkR5bmFtaWNhbGx5KEV4dGVuc2lvbk5hbWUuaGVhZGVyTWVudSk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51ID0geyAuLi50aGlzLmdldERlZmF1bHRIZWFkZXJNZW51T3B0aW9ucygpLCAuLi50aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudSB9O1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUhlYWRlck1lbnUpIHtcclxuICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudSA9IHRoaXMuYWRkSGVhZGVyTWVudUN1c3RvbUNvbW1hbmRzKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucywgdGhpcy5zaGFyZWRTZXJ2aWNlLmNvbHVtbkRlZmluaXRpb25zKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5fZXh0ZW5zaW9uID0gbmV3IFNsaWNrLlBsdWdpbnMuSGVhZGVyTWVudSh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudSk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHRoaXMuX2V4dGVuc2lvbik7XHJcblxyXG4gICAgICAvLyBob29rIGFsbCBldmVudHNcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51Lm9uRXh0ZW5zaW9uUmVnaXN0ZXJlZCkge1xyXG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUub25FeHRlbnNpb25SZWdpc3RlcmVkKHRoaXMuX2V4dGVuc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fZXh0ZW5zaW9uLm9uQ29tbWFuZCwgKGU6IGFueSwgYXJnczogSGVhZGVyTWVudU9uQ29tbWFuZEFyZ3MpID0+IHtcclxuICAgICAgICAgIHRoaXMuZXhlY3V0ZUhlYWRlck1lbnVJbnRlcm5hbENvbW1hbmRzKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51ICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudS5vbkNvbW1hbmQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUub25Db21tYW5kKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fZXh0ZW5zaW9uLm9uQmVmb3JlTWVudVNob3csIChlOiBhbnksIGFyZ3M6IEhlYWRlck1lbnVPbkJlZm9yZU1lbnVTaG93QXJncykgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51ICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudS5vbkJlZm9yZU1lbnVTaG93ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51Lm9uQmVmb3JlTWVudVNob3coZSwgYXJncyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuX2V4dGVuc2lvbjtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAvKipcclxuICAqIENyZWF0ZSBIZWFkZXIgTWVudSB3aXRoIEN1c3RvbSBDb21tYW5kcyBpZiB1c2VyIGhhcyBlbmFibGVkIEhlYWRlciBNZW51XHJcbiAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICogQHBhcmFtIGNvbHVtbkRlZmluaXRpb25zXHJcbiAgKiBAcmV0dXJuIGhlYWRlciBtZW51XHJcbiAgKi9cclxuICBwcml2YXRlIGFkZEhlYWRlck1lbnVDdXN0b21Db21tYW5kcyhvcHRpb25zOiBHcmlkT3B0aW9uLCBjb2x1bW5EZWZpbml0aW9uczogQ29sdW1uW10pOiBIZWFkZXJNZW51IHtcclxuICAgIGNvbnN0IGhlYWRlck1lbnVPcHRpb25zID0gb3B0aW9ucy5oZWFkZXJNZW51IHx8IHt9O1xyXG5cclxuICAgIGlmIChjb2x1bW5EZWZpbml0aW9ucyAmJiBBcnJheS5pc0FycmF5KGNvbHVtbkRlZmluaXRpb25zKSAmJiBvcHRpb25zLmVuYWJsZUhlYWRlck1lbnUpIHtcclxuICAgICAgY29sdW1uRGVmaW5pdGlvbnMuZm9yRWFjaCgoY29sdW1uRGVmOiBDb2x1bW4pID0+IHtcclxuICAgICAgICBpZiAoY29sdW1uRGVmICYmICFjb2x1bW5EZWYuZXhjbHVkZUZyb21IZWFkZXJNZW51KSB7XHJcbiAgICAgICAgICBpZiAoIWNvbHVtbkRlZi5oZWFkZXIgfHwgIWNvbHVtbkRlZi5oZWFkZXIubWVudSkge1xyXG4gICAgICAgICAgICBjb2x1bW5EZWYuaGVhZGVyID0ge1xyXG4gICAgICAgICAgICAgIG1lbnU6IHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBjb2x1bW5IZWFkZXJNZW51SXRlbXM6IEhlYWRlck1lbnVJdGVtW10gPSBjb2x1bW5EZWYgJiYgY29sdW1uRGVmLmhlYWRlciAmJiBjb2x1bW5EZWYuaGVhZGVyLm1lbnUgJiYgY29sdW1uRGVmLmhlYWRlci5tZW51Lml0ZW1zIHx8IFtdO1xyXG5cclxuICAgICAgICAgIC8vIFNvcnRpbmcgQ29tbWFuZHNcclxuICAgICAgICAgIGlmIChvcHRpb25zLmVuYWJsZVNvcnRpbmcgJiYgY29sdW1uRGVmLnNvcnRhYmxlICYmIGhlYWRlck1lbnVPcHRpb25zICYmICFoZWFkZXJNZW51T3B0aW9ucy5oaWRlU29ydENvbW1hbmRzKSB7XHJcbiAgICAgICAgICAgIGlmIChjb2x1bW5IZWFkZXJNZW51SXRlbXMuZmlsdGVyKChpdGVtOiBIZWFkZXJNZW51SXRlbSkgPT4gaXRlbS5jb21tYW5kID09PSAnc29ydC1hc2MnKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICBjb2x1bW5IZWFkZXJNZW51SXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBpY29uQ3NzQ2xhc3M6IGhlYWRlck1lbnVPcHRpb25zLmljb25Tb3J0QXNjQ29tbWFuZCB8fCAnZmEgZmEtc29ydC1hc2MnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnU09SVF9BU0NFTkRJTkcnKSA6IENvbnN0YW50cy5URVhUX1NPUlRfQVNDRU5ESU5HLFxyXG4gICAgICAgICAgICAgICAgY29tbWFuZDogJ3NvcnQtYXNjJyxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDUwXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbHVtbkhlYWRlck1lbnVJdGVtcy5maWx0ZXIoKGl0ZW06IEhlYWRlck1lbnVJdGVtKSA9PiBpdGVtLmNvbW1hbmQgPT09ICdzb3J0LWRlc2MnKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICBjb2x1bW5IZWFkZXJNZW51SXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBpY29uQ3NzQ2xhc3M6IGhlYWRlck1lbnVPcHRpb25zLmljb25Tb3J0RGVzY0NvbW1hbmQgfHwgJ2ZhIGZhLXNvcnQtZGVzYycsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogb3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdTT1JUX0RFU0NFTkRJTkcnKSA6IENvbnN0YW50cy5URVhUX1NPUlRfREVTQ0VORElORyxcclxuICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdzb3J0LWRlc2MnLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25PcmRlcjogNTFcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gYWRkIGEgZGl2aWRlciAoc2VwYXJhdG9yKSBiZXR3ZWVuIHRoZSB0b3Agc29ydCBjb21tYW5kcyBhbmQgdGhlIG90aGVyIGNsZWFyIGNvbW1hbmRzXHJcbiAgICAgICAgICAgIGNvbHVtbkhlYWRlck1lbnVJdGVtcy5wdXNoKHsgZGl2aWRlcjogdHJ1ZSwgY29tbWFuZDogJycsIHBvc2l0aW9uT3JkZXI6IDUyIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFoZWFkZXJNZW51T3B0aW9ucy5oaWRlQ2xlYXJTb3J0Q29tbWFuZCAmJiBjb2x1bW5IZWFkZXJNZW51SXRlbXMuZmlsdGVyKChpdGVtOiBIZWFkZXJNZW51SXRlbSkgPT4gaXRlbS5jb21tYW5kID09PSAnY2xlYXItc29ydCcpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgIGNvbHVtbkhlYWRlck1lbnVJdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGljb25Dc3NDbGFzczogaGVhZGVyTWVudU9wdGlvbnMuaWNvbkNsZWFyU29ydENvbW1hbmQgfHwgJ2ZhIGZhLXVuc29ydGVkJyxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBvcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1JFTU9WRV9TT1JUJykgOiBDb25zdGFudHMuVEVYVF9SRU1PVkVfU09SVCxcclxuICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdjbGVhci1zb3J0JyxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDUzXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBGaWx0ZXJpbmcgQ29tbWFuZHNcclxuICAgICAgICAgIGlmIChvcHRpb25zLmVuYWJsZUZpbHRlcmluZyAmJiBjb2x1bW5EZWYuZmlsdGVyYWJsZSAmJiBoZWFkZXJNZW51T3B0aW9ucyAmJiAhaGVhZGVyTWVudU9wdGlvbnMuaGlkZUZpbHRlckNvbW1hbmRzKSB7XHJcbiAgICAgICAgICAgIGlmICghaGVhZGVyTWVudU9wdGlvbnMuaGlkZUNsZWFyRmlsdGVyQ29tbWFuZCAmJiBjb2x1bW5IZWFkZXJNZW51SXRlbXMuZmlsdGVyKChpdGVtOiBIZWFkZXJNZW51SXRlbSkgPT4gaXRlbS5jb21tYW5kID09PSAnY2xlYXItZmlsdGVyJykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgY29sdW1uSGVhZGVyTWVudUl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiBoZWFkZXJNZW51T3B0aW9ucy5pY29uQ2xlYXJGaWx0ZXJDb21tYW5kIHx8ICdmYSBmYS1maWx0ZXInLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnUkVNT1ZFX0ZJTFRFUicpIDogQ29uc3RhbnRzLlRFWFRfUkVNT1ZFX0ZJTFRFUixcclxuICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdjbGVhci1maWx0ZXInLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25PcmRlcjogNTJcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIEhpZGUgQ29sdW1uIENvbW1hbmRcclxuICAgICAgICAgIGlmIChoZWFkZXJNZW51T3B0aW9ucyAmJiAhaGVhZGVyTWVudU9wdGlvbnMuaGlkZUNvbHVtbkhpZGVDb21tYW5kICYmIGNvbHVtbkhlYWRlck1lbnVJdGVtcy5maWx0ZXIoKGl0ZW06IEhlYWRlck1lbnVJdGVtKSA9PiBpdGVtLmNvbW1hbmQgPT09ICdoaWRlJykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbHVtbkhlYWRlck1lbnVJdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICBpY29uQ3NzQ2xhc3M6IGhlYWRlck1lbnVPcHRpb25zLmljb25Db2x1bW5IaWRlQ29tbWFuZCB8fCAnZmEgZmEtdGltZXMnLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiBvcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0hJREVfQ09MVU1OJykgOiBDb25zdGFudHMuVEVYVF9ISURFX0NPTFVNTixcclxuICAgICAgICAgICAgICBjb21tYW5kOiAnaGlkZScsXHJcbiAgICAgICAgICAgICAgcG9zaXRpb25PcmRlcjogNTVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LnRyYW5zbGF0ZUl0ZW1zKGNvbHVtbkhlYWRlck1lbnVJdGVtcywgJ3RpdGxlS2V5JywgJ3RpdGxlJyk7XHJcbiAgICAgICAgICAvLyBzb3J0IHRoZSBjdXN0b20gaXRlbXMgYnkgdGhlaXIgcG9zaXRpb24gaW4gdGhlIGxpc3RcclxuICAgICAgICAgIGNvbHVtbkhlYWRlck1lbnVJdGVtcy5zb3J0KChpdGVtQTogYW55LCBpdGVtQjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtQSAmJiBpdGVtQiAmJiBpdGVtQS5oYXNPd25Qcm9wZXJ0eSgncG9zaXRpb25PcmRlcicpICYmIGl0ZW1CLmhhc093blByb3BlcnR5KCdwb3NpdGlvbk9yZGVyJykpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gaXRlbUEucG9zaXRpb25PcmRlciAtIGl0ZW1CLnBvc2l0aW9uT3JkZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhlYWRlck1lbnVPcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgLyoqIEV4ZWN1dGUgdGhlIEhlYWRlciBNZW51IENvbW1hbmRzIHRoYXQgd2FzIHRyaWdnZXJlZCBieSB0aGUgb25Db21tYW5kIHN1YnNjcmliZSAqL1xyXG4gIGV4ZWN1dGVIZWFkZXJNZW51SW50ZXJuYWxDb21tYW5kcyhldmVudDogRXZlbnQsIGFyZ3M6IEhlYWRlck1lbnVPbkNvbW1hbmRBcmdzKSB7XHJcbiAgICBpZiAoYXJncyAmJiBhcmdzLmNvbW1hbmQpIHtcclxuICAgICAgc3dpdGNoIChhcmdzLmNvbW1hbmQpIHtcclxuICAgICAgICBjYXNlICdoaWRlJzpcclxuICAgICAgICAgIHRoaXMuaGlkZUNvbHVtbihhcmdzLmNvbHVtbik7XHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVBdXRvU2l6ZUNvbHVtbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuYXV0b3NpemVDb2x1bW5zKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdjbGVhci1maWx0ZXInOlxyXG4gICAgICAgICAgdGhpcy5jbGVhckNvbHVtbkZpbHRlcihldmVudCwgYXJncyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdjbGVhci1zb3J0JzpcclxuICAgICAgICAgIHRoaXMuY2xlYXJDb2x1bW5Tb3J0KGV2ZW50LCBhcmdzKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3NvcnQtYXNjJzpcclxuICAgICAgICBjYXNlICdzb3J0LWRlc2MnOlxyXG4gICAgICAgICAgY29uc3QgaXNTb3J0aW5nQXNjID0gKGFyZ3MuY29tbWFuZCA9PT0gJ3NvcnQtYXNjJyk7XHJcbiAgICAgICAgICB0aGlzLnNvcnRDb2x1bW4oZXZlbnQsIGFyZ3MsIGlzU29ydGluZ0FzYyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBIaWRlIGEgY29sdW1uIGZyb20gdGhlIGdyaWQgKi9cclxuICBoaWRlQ29sdW1uKGNvbHVtbjogQ29sdW1uKSB7XHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRDb2x1bW5zKSB7XHJcbiAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1uSW5kZXgoY29sdW1uLmlkKTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLnZpc2libGVDb2x1bW5zID0gdGhpcy5leHRlbnNpb25VdGlsaXR5LmFycmF5UmVtb3ZlSXRlbUJ5SW5kZXgodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1ucygpLCBjb2x1bW5JbmRleCk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldENvbHVtbnModGhpcy5zaGFyZWRTZXJ2aWNlLnZpc2libGVDb2x1bW5zKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0IGFsbCB0aGUgR3JpZCBNZW51IG9wdGlvbnMgd2hpY2ggaGF2ZSB0ZXh0IHRvIHRyYW5zbGF0ZVxyXG4gICAqIEBwYXJhbSBncmlkIG1lbnUgb2JqZWN0XHJcbiAgICovXHJcbiAgcmVzZXRIZWFkZXJNZW51VHJhbnNsYXRpb25zKGNvbHVtbkRlZmluaXRpb25zOiBDb2x1bW5bXSkge1xyXG4gICAgY29sdW1uRGVmaW5pdGlvbnMuZm9yRWFjaCgoY29sdW1uRGVmOiBDb2x1bW4pID0+IHtcclxuICAgICAgaWYgKGNvbHVtbkRlZiAmJiBjb2x1bW5EZWYuaGVhZGVyICYmIGNvbHVtbkRlZi5oZWFkZXIgJiYgY29sdW1uRGVmLmhlYWRlci5tZW51ICYmIGNvbHVtbkRlZi5oZWFkZXIubWVudS5pdGVtcykge1xyXG4gICAgICAgIGlmICghY29sdW1uRGVmLmV4Y2x1ZGVGcm9tSGVhZGVyTWVudSkge1xyXG4gICAgICAgICAgY29uc3QgY29sdW1uSGVhZGVyTWVudUl0ZW1zOiBIZWFkZXJNZW51SXRlbVtdID0gY29sdW1uRGVmLmhlYWRlci5tZW51Lml0ZW1zIHx8IFtdO1xyXG4gICAgICAgICAgY29sdW1uSGVhZGVyTWVudUl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmNvbW1hbmQpIHtcclxuICAgICAgICAgICAgICBjYXNlICdjbGVhci1maWx0ZXInOlxyXG4gICAgICAgICAgICAgICAgaXRlbS50aXRsZSA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1JFTU9WRV9GSUxURVInKSB8fCBDb25zdGFudHMuVEVYVF9SRU1PVkVfRklMVEVSO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnY2xlYXItc29ydCc6XHJcbiAgICAgICAgICAgICAgICBpdGVtLnRpdGxlID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnUkVNT1ZFX1NPUlQnKSB8fCBDb25zdGFudHMuVEVYVF9SRU1PVkVfU09SVDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ3NvcnQtYXNjJzpcclxuICAgICAgICAgICAgICAgIGl0ZW0udGl0bGUgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdTT1JUX0FTQ0VORElORycpIHx8IENvbnN0YW50cy5URVhUX1NPUlRfQVNDRU5ESU5HO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnc29ydC1kZXNjJzpcclxuICAgICAgICAgICAgICAgIGl0ZW0udGl0bGUgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdTT1JUX0RFU0NFTkRJTkcnKSB8fCBDb25zdGFudHMuVEVYVF9TT1JUX0RFU0NFTkRJTkc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICdoaWRlJzpcclxuICAgICAgICAgICAgICAgIGl0ZW0udGl0bGUgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdISURFX0NPTFVNTicpIHx8IENvbnN0YW50cy5URVhUX0hJREVfQ09MVU1OO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHJlLXRyYW5zbGF0ZSBpZiB0aGVyZSdzIGEgXCJ0aXRsZUtleVwiXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS50cmFuc2xhdGVJdGVtcyhjb2x1bW5IZWFkZXJNZW51SXRlbXMsICd0aXRsZUtleScsICd0aXRsZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJhbnNsYXRlIHRoZSBIZWFkZXIgTWVudSB0aXRsZXMsIHdlIG5lZWQgdG8gbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW4gZGVmaW5pdGlvbiB0byByZS10cmFuc2xhdGUgdGhlbVxyXG4gICAqL1xyXG4gIHRyYW5zbGF0ZUhlYWRlck1lbnUoKSB7XHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51KSB7XHJcbiAgICAgIHRoaXMucmVzZXRIZWFkZXJNZW51VHJhbnNsYXRpb25zKHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcmV0dXJuIGRlZmF1bHQgSGVhZGVyIE1lbnUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0RGVmYXVsdEhlYWRlck1lbnVPcHRpb25zKCk6IEhlYWRlck1lbnUge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYXV0b0FsaWduT2Zmc2V0OiAxMixcclxuICAgICAgbWluV2lkdGg6IDE0MCxcclxuICAgICAgaGlkZUNvbHVtbkhpZGVDb21tYW5kOiBmYWxzZSxcclxuICAgICAgaGlkZVNvcnRDb21tYW5kczogZmFsc2UsXHJcbiAgICAgIHRpdGxlOiAnJ1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKiBTb3J0IHRoZSBjdXJyZW50IGNvbHVtbiAqL1xyXG4gIHByaXZhdGUgc29ydENvbHVtbihldmVudDogRXZlbnQsIGFyZ3M6IEhlYWRlck1lbnVPbkNvbW1hbmRBcmdzLCBpc1NvcnRpbmdBc2MgPSB0cnVlKSB7XHJcbiAgICBpZiAoYXJncyAmJiBhcmdzLmNvbHVtbikge1xyXG4gICAgICAvLyBnZXQgcHJldmlvdXNseSBzb3J0ZWQgY29sdW1uc1xyXG4gICAgICBjb25zdCBzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnQ6IENvbHVtblNvcnRbXSA9IHRoaXMuc29ydFNlcnZpY2UuZ2V0UHJldmlvdXNDb2x1bW5Tb3J0cyhhcmdzLmNvbHVtbi5pZCArICcnKTtcclxuXHJcbiAgICAgIC8vIGFkZCB0byB0aGUgY29sdW1uIGFycmF5LCB0aGUgY29sdW1uIHNvcnRlZCBieSB0aGUgaGVhZGVyIG1lbnVcclxuICAgICAgc29ydGVkQ29sc1dpdGhvdXRDdXJyZW50LnB1c2goeyBzb3J0Q29sOiBhcmdzLmNvbHVtbiwgc29ydEFzYzogaXNTb3J0aW5nQXNjIH0pO1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICAgICAgdGhpcy5zb3J0U2VydmljZS5vbkJhY2tlbmRTb3J0Q2hhbmdlZChldmVudCwgeyBtdWx0aUNvbHVtblNvcnQ6IHRydWUsIHNvcnRDb2xzOiBzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnQsIGdyaWQ6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5kYXRhVmlldykge1xyXG4gICAgICAgIHRoaXMuc29ydFNlcnZpY2Uub25Mb2NhbFNvcnRDaGFuZ2VkKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLCB0aGlzLnNoYXJlZFNlcnZpY2UuZGF0YVZpZXcsIHNvcnRlZENvbHNXaXRob3V0Q3VycmVudCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gd2hlbiB1c2luZyBjdXN0b21EYXRhVmlldywgd2Ugd2lsbCBzaW1wbHkgc2VuZCBpdCBhcyBhIG9uU29ydCBldmVudCB3aXRoIG5vdGlmeVxyXG4gICAgICAgIGNvbnN0IGlzTXVsdGlTb3J0ID0gdGhpcy5zaGFyZWRTZXJ2aWNlICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMubXVsdGlDb2x1bW5Tb3J0IHx8IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IHNvcnRPdXRwdXQgPSBpc011bHRpU29ydCA/IHNvcnRlZENvbHNXaXRob3V0Q3VycmVudCA6IHNvcnRlZENvbHNXaXRob3V0Q3VycmVudFswXTtcclxuICAgICAgICBhcmdzLmdyaWQub25Tb3J0Lm5vdGlmeShzb3J0T3V0cHV0KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gdXBkYXRlIHRoZSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9iaiBzb3J0Q29sdW1ucyBhcnJheSB3aGljaCB3aWxsIGF0IHRoZSBzYW1lIGFkZCB0aGUgdmlzdWFsIHNvcnQgaWNvbihzKSBvbiB0aGUgVUlcclxuICAgICAgY29uc3QgbmV3U29ydENvbHVtbnM6IENvbHVtblNvcnRbXSA9IHNvcnRlZENvbHNXaXRob3V0Q3VycmVudC5tYXAoKGNvbCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBjb2x1bW5JZDogY29sICYmIGNvbC5zb3J0Q29sICYmIGNvbC5zb3J0Q29sLmlkLFxyXG4gICAgICAgICAgc29ydEFzYzogY29sICYmIGNvbC5zb3J0QXNjXHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldFNvcnRDb2x1bW5zKG5ld1NvcnRDb2x1bW5zKTsgLy8gYWRkIHNvcnQgaWNvbiBpbiBVSVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIENsZWFyIHRoZSBGaWx0ZXIgb24gdGhlIGN1cnJlbnQgY29sdW1uIChpZiBpdCdzIGFjdHVhbGx5IGZpbHRlcmVkKSAqL1xyXG4gIHByaXZhdGUgY2xlYXJDb2x1bW5GaWx0ZXIoZXZlbnQ6IEV2ZW50LCBhcmdzOiBIZWFkZXJNZW51T25Db21tYW5kQXJncykge1xyXG4gICAgaWYgKGFyZ3MgJiYgYXJncy5jb2x1bW4pIHtcclxuICAgICAgdGhpcy5maWx0ZXJTZXJ2aWNlLmNsZWFyRmlsdGVyQnlDb2x1bW5JZChldmVudCwgYXJncy5jb2x1bW4uaWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIENsZWFyIHRoZSBTb3J0IG9uIHRoZSBjdXJyZW50IGNvbHVtbiAoaWYgaXQncyBhY3R1YWxseSBzb3J0ZWQpICovXHJcbiAgcHJpdmF0ZSBjbGVhckNvbHVtblNvcnQoZXZlbnQ6IEV2ZW50LCBhcmdzOiBIZWFkZXJNZW51T25Db21tYW5kQXJncykge1xyXG4gICAgaWYgKGFyZ3MgJiYgYXJncy5jb2x1bW4gJiYgdGhpcy5zaGFyZWRTZXJ2aWNlKSB7XHJcbiAgICAgIC8vIGdldCBwcmV2aW91c2x5IHNvcnRlZCBjb2x1bW5zXHJcbiAgICAgIGNvbnN0IGFsbFNvcnRlZENvbHM6IENvbHVtblNvcnRbXSA9IHRoaXMuc29ydFNlcnZpY2UuZ2V0UHJldmlvdXNDb2x1bW5Tb3J0cygpO1xyXG4gICAgICBjb25zdCBzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnQ6IENvbHVtblNvcnRbXSA9IHRoaXMuc29ydFNlcnZpY2UuZ2V0UHJldmlvdXNDb2x1bW5Tb3J0cyhhcmdzLmNvbHVtbi5pZCArICcnKTtcclxuXHJcbiAgICAgIGlmIChhbGxTb3J0ZWRDb2xzLmxlbmd0aCAhPT0gc29ydGVkQ29sc1dpdGhvdXRDdXJyZW50Lmxlbmd0aCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICAgICAgICB0aGlzLnNvcnRTZXJ2aWNlLm9uQmFja2VuZFNvcnRDaGFuZ2VkKGV2ZW50LCB7IG11bHRpQ29sdW1uU29ydDogdHJ1ZSwgc29ydENvbHM6IHNvcnRlZENvbHNXaXRob3V0Q3VycmVudCwgZ3JpZDogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZGF0YVZpZXcpIHtcclxuICAgICAgICAgIHRoaXMuc29ydFNlcnZpY2Uub25Mb2NhbFNvcnRDaGFuZ2VkKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLCB0aGlzLnNoYXJlZFNlcnZpY2UuZGF0YVZpZXcsIHNvcnRlZENvbHNXaXRob3V0Q3VycmVudCwgdHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIHdoZW4gdXNpbmcgY3VzdG9tRGF0YVZpZXcsIHdlIHdpbGwgc2ltcGx5IHNlbmQgaXQgYXMgYSBvblNvcnQgZXZlbnQgd2l0aCBub3RpZnlcclxuICAgICAgICAgIGNvbnN0IGlzTXVsdGlTb3J0ID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5tdWx0aUNvbHVtblNvcnQgfHwgZmFsc2U7XHJcbiAgICAgICAgICBjb25zdCBzb3J0T3V0cHV0ID0gaXNNdWx0aVNvcnQgPyBzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnQgOiBzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnRbMF07XHJcbiAgICAgICAgICBhcmdzLmdyaWQub25Tb3J0Lm5vdGlmeShzb3J0T3V0cHV0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPYmogc29ydENvbHVtbnMgYXJyYXkgd2hpY2ggd2lsbCBhdCB0aGUgc2FtZSBhZGQgdGhlIHZpc3VhbCBzb3J0IGljb24ocykgb24gdGhlIFVJXHJcbiAgICAgICAgY29uc3QgdXBkYXRlZFNvcnRDb2x1bW5zOiBDb2x1bW5Tb3J0W10gPSBzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnQubWFwKChjb2wpID0+IHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbklkOiBjb2wgJiYgY29sLnNvcnRDb2wgJiYgY29sLnNvcnRDb2wuaWQsXHJcbiAgICAgICAgICAgIHNvcnRBc2M6IGNvbCAmJiBjb2wuc29ydEFzY1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRTb3J0Q29sdW1ucyh1cGRhdGVkU29ydENvbHVtbnMpOyAvLyBhZGQgc29ydCBpY29uIGluIFVJXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19