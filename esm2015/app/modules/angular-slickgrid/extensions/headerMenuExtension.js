/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import { ExtensionName, } from '../models/index';
import { FilterService } from '../services/filter.service';
import { SortService } from '../services/sort.service';
import { SharedService } from '../services/shared.service';
import { ExtensionUtility } from './extensionUtility';
export class HeaderMenuExtension {
    /**
     * @param {?} extensionUtility
     * @param {?} filterService
     * @param {?} sharedService
     * @param {?} sortService
     * @param {?} translate
     */
    constructor(extensionUtility, filterService, sharedService, sortService, translate) {
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
    dispose() {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    }
    /**
     * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
     * @return {?}
     */
    register() {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.headerMenu);
            this.sharedService.gridOptions.headerMenu = Object.assign({}, this.getDefaultHeaderMenuOptions(), this.sharedService.gridOptions.headerMenu);
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
                (e, args) => {
                    this.executeHeaderMenuInternalCommands(e, args);
                    if (this.sharedService.gridOptions.headerMenu && typeof this.sharedService.gridOptions.headerMenu.onCommand === 'function') {
                        this.sharedService.gridOptions.headerMenu.onCommand(e, args);
                    }
                }));
                this._eventHandler.subscribe(this._extension.onBeforeMenuShow, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                (e, args) => {
                    if (this.sharedService.gridOptions.headerMenu && typeof this.sharedService.gridOptions.headerMenu.onBeforeMenuShow === 'function') {
                        this.sharedService.gridOptions.headerMenu.onBeforeMenuShow(e, args);
                    }
                }));
            }
            return this._extension;
        }
        return null;
    }
    /**
     * Create Header Menu with Custom Commands if user has enabled Header Menu
     * @private
     * @param {?} options
     * @param {?} columnDefinitions
     * @return {?} header menu
     */
    addHeaderMenuCustomCommands(options, columnDefinitions) {
        /** @type {?} */
        const headerMenuOptions = options.headerMenu || {};
        if (columnDefinitions && Array.isArray(columnDefinitions) && options.enableHeaderMenu) {
            columnDefinitions.forEach((/**
             * @param {?} columnDef
             * @return {?}
             */
            (columnDef) => {
                if (columnDef && !columnDef.excludeFromHeaderMenu) {
                    if (!columnDef.header || !columnDef.header.menu) {
                        columnDef.header = {
                            menu: {
                                items: []
                            }
                        };
                    }
                    /** @type {?} */
                    const columnHeaderMenuItems = columnDef && columnDef.header && columnDef.header.menu && columnDef.header.menu.items || [];
                    // Sorting Commands
                    if (options.enableSorting && columnDef.sortable && headerMenuOptions && !headerMenuOptions.hideSortCommands) {
                        if (columnHeaderMenuItems.filter((/**
                         * @param {?} item
                         * @return {?}
                         */
                        (item) => item.command === 'sort-asc')).length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconSortAscCommand || 'fa fa-sort-asc',
                                title: options.enableTranslate ? this.translate.instant('SORT_ASCENDING') : Constants.TEXT_SORT_ASCENDING,
                                command: 'sort-asc',
                                positionOrder: 50
                            });
                        }
                        if (columnHeaderMenuItems.filter((/**
                         * @param {?} item
                         * @return {?}
                         */
                        (item) => item.command === 'sort-desc')).length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconSortDescCommand || 'fa fa-sort-desc',
                                title: options.enableTranslate ? this.translate.instant('SORT_DESCENDING') : Constants.TEXT_SORT_DESCENDING,
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
                        (item) => item.command === 'clear-sort')).length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconClearSortCommand || 'fa fa-unsorted',
                                title: options.enableTranslate ? this.translate.instant('REMOVE_SORT') : Constants.TEXT_REMOVE_SORT,
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
                        (item) => item.command === 'clear-filter')).length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconClearFilterCommand || 'fa fa-filter',
                                title: options.enableTranslate ? this.translate.instant('REMOVE_FILTER') : Constants.TEXT_REMOVE_FILTER,
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
                    (item) => item.command === 'hide')).length === 0) {
                        columnHeaderMenuItems.push({
                            iconCssClass: headerMenuOptions.iconColumnHideCommand || 'fa fa-times',
                            title: options.enableTranslate ? this.translate.instant('HIDE_COLUMN') : Constants.TEXT_HIDE_COLUMN,
                            command: 'hide',
                            positionOrder: 55
                        });
                    }
                    this.extensionUtility.translateItems(columnHeaderMenuItems, 'titleKey', 'title');
                    // sort the custom items by their position in the list
                    columnHeaderMenuItems.sort((/**
                     * @param {?} itemA
                     * @param {?} itemB
                     * @return {?}
                     */
                    (itemA, itemB) => {
                        if (itemA && itemB && itemA.hasOwnProperty('positionOrder') && itemB.hasOwnProperty('positionOrder')) {
                            return itemA.positionOrder - itemB.positionOrder;
                        }
                        return 0;
                    }));
                }
            }));
        }
        return headerMenuOptions;
    }
    /**
     * Execute the Header Menu Commands that was triggered by the onCommand subscribe
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    executeHeaderMenuInternalCommands(event, args) {
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
                    const isSortingAsc = (args.command === 'sort-asc');
                    this.sortColumn(event, args, isSortingAsc);
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
     * Reset all the Grid Menu options which have text to translate
     * @param {?} columnDefinitions
     * @return {?}
     */
    resetHeaderMenuTranslations(columnDefinitions) {
        columnDefinitions.forEach((/**
         * @param {?} columnDef
         * @return {?}
         */
        (columnDef) => {
            if (columnDef && columnDef.header && columnDef.header && columnDef.header.menu && columnDef.header.menu.items) {
                if (!columnDef.excludeFromHeaderMenu) {
                    /** @type {?} */
                    const columnHeaderMenuItems = columnDef.header.menu.items || [];
                    columnHeaderMenuItems.forEach((/**
                     * @param {?} item
                     * @return {?}
                     */
                    (item) => {
                        switch (item.command) {
                            case 'clear-filter':
                                item.title = this.translate.instant('REMOVE_FILTER') || Constants.TEXT_REMOVE_FILTER;
                                break;
                            case 'clear-sort':
                                item.title = this.translate.instant('REMOVE_SORT') || Constants.TEXT_REMOVE_SORT;
                                break;
                            case 'sort-asc':
                                item.title = this.translate.instant('SORT_ASCENDING') || Constants.TEXT_SORT_ASCENDING;
                                break;
                            case 'sort-desc':
                                item.title = this.translate.instant('SORT_DESCENDING') || Constants.TEXT_SORT_DESCENDING;
                                break;
                            case 'hide':
                                item.title = this.translate.instant('HIDE_COLUMN') || Constants.TEXT_HIDE_COLUMN;
                                break;
                        }
                        // re-translate if there's a "titleKey"
                        if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate) {
                            this.extensionUtility.translateItems(columnHeaderMenuItems, 'titleKey', 'title');
                        }
                    }));
                }
            }
        }));
    }
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    translateHeaderMenu() {
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.headerMenu) {
            this.resetHeaderMenuTranslations(this.sharedService.visibleColumns);
        }
    }
    /**
     * @private
     * @return {?} default Header Menu options
     */
    getDefaultHeaderMenuOptions() {
        return {
            autoAlignOffset: 12,
            minWidth: 140,
            hideColumnHideCommand: false,
            hideSortCommands: false,
            title: ''
        };
    }
    /**
     * Sort the current column
     * @private
     * @param {?} event
     * @param {?} args
     * @param {?=} isSortingAsc
     * @return {?}
     */
    sortColumn(event, args, isSortingAsc = true) {
        if (args && args.column) {
            // get previously sorted columns
            /** @type {?} */
            const sortedColsWithoutCurrent = this.sortService.getPreviousColumnSorts(args.column.id + '');
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
                const isMultiSort = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.multiColumnSort || false;
                /** @type {?} */
                const sortOutput = isMultiSort ? sortedColsWithoutCurrent : sortedColsWithoutCurrent[0];
                args.grid.onSort.notify(sortOutput);
            }
            // update the this.sharedService.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
            /** @type {?} */
            const newSortColumns = sortedColsWithoutCurrent.map((/**
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
        }
    }
    /**
     * Clear the Filter on the current column (if it's actually filtered)
     * @private
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    clearColumnFilter(event, args) {
        if (args && args.column) {
            this.filterService.clearFilterByColumnId(event, args.column.id);
        }
    }
    /**
     * Clear the Sort on the current column (if it's actually sorted)
     * @private
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    clearColumnSort(event, args) {
        if (args && args.column && this.sharedService) {
            // get previously sorted columns
            /** @type {?} */
            const allSortedCols = this.sortService.getPreviousColumnSorts();
            /** @type {?} */
            const sortedColsWithoutCurrent = this.sortService.getPreviousColumnSorts(args.column.id + '');
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
                    const isMultiSort = this.sharedService.gridOptions && this.sharedService.gridOptions.multiColumnSort || false;
                    /** @type {?} */
                    const sortOutput = isMultiSort ? sortedColsWithoutCurrent : sortedColsWithoutCurrent[0];
                    args.grid.onSort.notify(sortOutput);
                }
                // update the this.sharedService.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
                /** @type {?} */
                const updatedSortColumns = sortedColsWithoutCurrent.map((/**
                 * @param {?} col
                 * @return {?}
                 */
                (col) => {
                    return {
                        columnId: col && col.sortCol && col.sortCol.id,
                        sortAsc: col && col.sortAsc
                    };
                }));
                this.sharedService.grid.setSortColumns(updatedSortColumns); // add sort icon in UI
            }
        }
    }
}
HeaderMenuExtension.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HeaderMenuExtension.ctorParameters = () => [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyTWVudUV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9oZWFkZXJNZW51RXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUlMLGFBQWEsR0FNZCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBTXRELE1BQU0sT0FBTyxtQkFBbUI7Ozs7Ozs7O0lBSTlCLFlBQ1UsZ0JBQWtDLEVBQ2xDLGFBQTRCLEVBQzVCLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ3hCLFNBQTJCO1FBSjNCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFSN0Isa0JBQWEsR0FBUSxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQVNsRCxDQUFDOzs7O0lBRUwsT0FBTztRQUNMLG1DQUFtQztRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3BDLElB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bXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgQ29sdW1uU29ydCxcclxuICBFeHRlbnNpb24sXHJcbiAgRXh0ZW5zaW9uTmFtZSxcclxuICBHcmlkT3B0aW9uLFxyXG4gIEhlYWRlck1lbnUsXHJcbiAgSGVhZGVyTWVudUl0ZW0sXHJcbiAgSGVhZGVyTWVudU9uQ29tbWFuZEFyZ3MsXHJcbiAgSGVhZGVyTWVudU9uQmVmb3JlTWVudVNob3dBcmdzLFxyXG59IGZyb20gJy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9maWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFNvcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc29ydC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRXh0ZW5zaW9uVXRpbGl0eSB9IGZyb20gJy4vZXh0ZW5zaW9uVXRpbGl0eSc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIZWFkZXJNZW51RXh0ZW5zaW9uIGltcGxlbWVudHMgRXh0ZW5zaW9uIHtcclxuICBwcml2YXRlIF9ldmVudEhhbmRsZXI6IGFueSA9IG5ldyBTbGljay5FdmVudEhhbmRsZXIoKTtcclxuICBwcml2YXRlIF9leHRlbnNpb246IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGV4dGVuc2lvblV0aWxpdHk6IEV4dGVuc2lvblV0aWxpdHksXHJcbiAgICBwcml2YXRlIGZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHNvcnRTZXJ2aWNlOiBTb3J0U2VydmljZSxcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICkgeyB9XHJcblxyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICAvLyB1bnN1YnNjcmliZSBhbGwgU2xpY2tHcmlkIGV2ZW50c1xyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnVuc3Vic2NyaWJlQWxsKCk7XHJcbiAgICBpZiAodGhpcy5fZXh0ZW5zaW9uICYmIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KSB7XHJcbiAgICAgIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIENyZWF0ZSB0aGUgSGVhZGVyIE1lbnUgYW5kIGV4cG9zZSBhbGwgdGhlIGF2YWlsYWJsZSBob29rcyB0aGF0IHVzZXIgY2FuIHN1YnNjcmliZSAob25Db21tYW5kLCBvbkJlZm9yZU1lbnVTaG93LCAuLi4pXHJcbiAgKiBAcGFyYW0gZ3JpZFxyXG4gICogQHBhcmFtIGRhdGFWaWV3XHJcbiAgKiBAcGFyYW0gY29sdW1uRGVmaW5pdGlvbnNcclxuICAqL1xyXG4gIHJlZ2lzdGVyKCk6IGFueSB7XHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucykge1xyXG4gICAgICAvLyBkeW5hbWljYWxseSBpbXBvcnQgdGhlIFNsaWNrR3JpZCBwbHVnaW4gd2l0aCByZXF1aXJlSlNcclxuICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LmxvYWRFeHRlbnNpb25EeW5hbWljYWxseShFeHRlbnNpb25OYW1lLmhlYWRlck1lbnUpO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudSA9IHsgLi4udGhpcy5nZXREZWZhdWx0SGVhZGVyTWVudU9wdGlvbnMoKSwgLi4udGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUgfTtcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVIZWFkZXJNZW51KSB7XHJcbiAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUgPSB0aGlzLmFkZEhlYWRlck1lbnVDdXN0b21Db21tYW5kcyh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMsIHRoaXMuc2hhcmVkU2VydmljZS5jb2x1bW5EZWZpbml0aW9ucyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX2V4dGVuc2lvbiA9IG5ldyBTbGljay5QbHVnaW5zLkhlYWRlck1lbnUodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUpO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5yZWdpc3RlclBsdWdpbih0aGlzLl9leHRlbnNpb24pO1xyXG5cclxuICAgICAgLy8gaG9vayBhbGwgZXZlbnRzXHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudSkge1xyXG4gICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudS5vbkV4dGVuc2lvblJlZ2lzdGVyZWQpIHtcclxuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51Lm9uRXh0ZW5zaW9uUmVnaXN0ZXJlZCh0aGlzLl9leHRlbnNpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2V4dGVuc2lvbi5vbkNvbW1hbmQsIChlOiBhbnksIGFyZ3M6IEhlYWRlck1lbnVPbkNvbW1hbmRBcmdzKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmV4ZWN1dGVIZWFkZXJNZW51SW50ZXJuYWxDb21tYW5kcyhlLCBhcmdzKTtcclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudSAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUub25Db21tYW5kID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51Lm9uQ29tbWFuZChlLCBhcmdzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2V4dGVuc2lvbi5vbkJlZm9yZU1lbnVTaG93LCAoZTogYW55LCBhcmdzOiBIZWFkZXJNZW51T25CZWZvcmVNZW51U2hvd0FyZ3MpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudSAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUub25CZWZvcmVNZW51U2hvdyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudS5vbkJlZm9yZU1lbnVTaG93KGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzLl9leHRlbnNpb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gLyoqXHJcbiAgKiBDcmVhdGUgSGVhZGVyIE1lbnUgd2l0aCBDdXN0b20gQ29tbWFuZHMgaWYgdXNlciBoYXMgZW5hYmxlZCBIZWFkZXIgTWVudVxyXG4gICogQHBhcmFtIG9wdGlvbnNcclxuICAqIEBwYXJhbSBjb2x1bW5EZWZpbml0aW9uc1xyXG4gICogQHJldHVybiBoZWFkZXIgbWVudVxyXG4gICovXHJcbiAgcHJpdmF0ZSBhZGRIZWFkZXJNZW51Q3VzdG9tQ29tbWFuZHMob3B0aW9uczogR3JpZE9wdGlvbiwgY29sdW1uRGVmaW5pdGlvbnM6IENvbHVtbltdKTogSGVhZGVyTWVudSB7XHJcbiAgICBjb25zdCBoZWFkZXJNZW51T3B0aW9ucyA9IG9wdGlvbnMuaGVhZGVyTWVudSB8fCB7fTtcclxuXHJcbiAgICBpZiAoY29sdW1uRGVmaW5pdGlvbnMgJiYgQXJyYXkuaXNBcnJheShjb2x1bW5EZWZpbml0aW9ucykgJiYgb3B0aW9ucy5lbmFibGVIZWFkZXJNZW51KSB7XHJcbiAgICAgIGNvbHVtbkRlZmluaXRpb25zLmZvckVhY2goKGNvbHVtbkRlZjogQ29sdW1uKSA9PiB7XHJcbiAgICAgICAgaWYgKGNvbHVtbkRlZiAmJiAhY29sdW1uRGVmLmV4Y2x1ZGVGcm9tSGVhZGVyTWVudSkge1xyXG4gICAgICAgICAgaWYgKCFjb2x1bW5EZWYuaGVhZGVyIHx8ICFjb2x1bW5EZWYuaGVhZGVyLm1lbnUpIHtcclxuICAgICAgICAgICAgY29sdW1uRGVmLmhlYWRlciA9IHtcclxuICAgICAgICAgICAgICBtZW51OiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtczogW11cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgY29sdW1uSGVhZGVyTWVudUl0ZW1zOiBIZWFkZXJNZW51SXRlbVtdID0gY29sdW1uRGVmICYmIGNvbHVtbkRlZi5oZWFkZXIgJiYgY29sdW1uRGVmLmhlYWRlci5tZW51ICYmIGNvbHVtbkRlZi5oZWFkZXIubWVudS5pdGVtcyB8fCBbXTtcclxuXHJcbiAgICAgICAgICAvLyBTb3J0aW5nIENvbW1hbmRzXHJcbiAgICAgICAgICBpZiAob3B0aW9ucy5lbmFibGVTb3J0aW5nICYmIGNvbHVtbkRlZi5zb3J0YWJsZSAmJiBoZWFkZXJNZW51T3B0aW9ucyAmJiAhaGVhZGVyTWVudU9wdGlvbnMuaGlkZVNvcnRDb21tYW5kcykge1xyXG4gICAgICAgICAgICBpZiAoY29sdW1uSGVhZGVyTWVudUl0ZW1zLmZpbHRlcigoaXRlbTogSGVhZGVyTWVudUl0ZW0pID0+IGl0ZW0uY29tbWFuZCA9PT0gJ3NvcnQtYXNjJykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgY29sdW1uSGVhZGVyTWVudUl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiBoZWFkZXJNZW51T3B0aW9ucy5pY29uU29ydEFzY0NvbW1hbmQgfHwgJ2ZhIGZhLXNvcnQtYXNjJyxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBvcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1NPUlRfQVNDRU5ESU5HJykgOiBDb25zdGFudHMuVEVYVF9TT1JUX0FTQ0VORElORyxcclxuICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdzb3J0LWFzYycsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbk9yZGVyOiA1MFxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb2x1bW5IZWFkZXJNZW51SXRlbXMuZmlsdGVyKChpdGVtOiBIZWFkZXJNZW51SXRlbSkgPT4gaXRlbS5jb21tYW5kID09PSAnc29ydC1kZXNjJykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgY29sdW1uSGVhZGVyTWVudUl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiBoZWFkZXJNZW51T3B0aW9ucy5pY29uU29ydERlc2NDb21tYW5kIHx8ICdmYSBmYS1zb3J0LWRlc2MnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnU09SVF9ERVNDRU5ESU5HJykgOiBDb25zdGFudHMuVEVYVF9TT1JUX0RFU0NFTkRJTkcsXHJcbiAgICAgICAgICAgICAgICBjb21tYW5kOiAnc29ydC1kZXNjJyxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDUxXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCBhIGRpdmlkZXIgKHNlcGFyYXRvcikgYmV0d2VlbiB0aGUgdG9wIHNvcnQgY29tbWFuZHMgYW5kIHRoZSBvdGhlciBjbGVhciBjb21tYW5kc1xyXG4gICAgICAgICAgICBjb2x1bW5IZWFkZXJNZW51SXRlbXMucHVzaCh7IGRpdmlkZXI6IHRydWUsIGNvbW1hbmQ6ICcnLCBwb3NpdGlvbk9yZGVyOiA1MiB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaGVhZGVyTWVudU9wdGlvbnMuaGlkZUNsZWFyU29ydENvbW1hbmQgJiYgY29sdW1uSGVhZGVyTWVudUl0ZW1zLmZpbHRlcigoaXRlbTogSGVhZGVyTWVudUl0ZW0pID0+IGl0ZW0uY29tbWFuZCA9PT0gJ2NsZWFyLXNvcnQnKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICBjb2x1bW5IZWFkZXJNZW51SXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBpY29uQ3NzQ2xhc3M6IGhlYWRlck1lbnVPcHRpb25zLmljb25DbGVhclNvcnRDb21tYW5kIHx8ICdmYSBmYS11bnNvcnRlZCcsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogb3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdSRU1PVkVfU09SVCcpIDogQ29uc3RhbnRzLlRFWFRfUkVNT1ZFX1NPUlQsXHJcbiAgICAgICAgICAgICAgICBjb21tYW5kOiAnY2xlYXItc29ydCcsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbk9yZGVyOiA1M1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gRmlsdGVyaW5nIENvbW1hbmRzXHJcbiAgICAgICAgICBpZiAob3B0aW9ucy5lbmFibGVGaWx0ZXJpbmcgJiYgY29sdW1uRGVmLmZpbHRlcmFibGUgJiYgaGVhZGVyTWVudU9wdGlvbnMgJiYgIWhlYWRlck1lbnVPcHRpb25zLmhpZGVGaWx0ZXJDb21tYW5kcykge1xyXG4gICAgICAgICAgICBpZiAoIWhlYWRlck1lbnVPcHRpb25zLmhpZGVDbGVhckZpbHRlckNvbW1hbmQgJiYgY29sdW1uSGVhZGVyTWVudUl0ZW1zLmZpbHRlcigoaXRlbTogSGVhZGVyTWVudUl0ZW0pID0+IGl0ZW0uY29tbWFuZCA9PT0gJ2NsZWFyLWZpbHRlcicpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgIGNvbHVtbkhlYWRlck1lbnVJdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGljb25Dc3NDbGFzczogaGVhZGVyTWVudU9wdGlvbnMuaWNvbkNsZWFyRmlsdGVyQ29tbWFuZCB8fCAnZmEgZmEtZmlsdGVyJyxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBvcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1JFTU9WRV9GSUxURVInKSA6IENvbnN0YW50cy5URVhUX1JFTU9WRV9GSUxURVIsXHJcbiAgICAgICAgICAgICAgICBjb21tYW5kOiAnY2xlYXItZmlsdGVyJyxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDUyXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBIaWRlIENvbHVtbiBDb21tYW5kXHJcbiAgICAgICAgICBpZiAoaGVhZGVyTWVudU9wdGlvbnMgJiYgIWhlYWRlck1lbnVPcHRpb25zLmhpZGVDb2x1bW5IaWRlQ29tbWFuZCAmJiBjb2x1bW5IZWFkZXJNZW51SXRlbXMuZmlsdGVyKChpdGVtOiBIZWFkZXJNZW51SXRlbSkgPT4gaXRlbS5jb21tYW5kID09PSAnaGlkZScpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb2x1bW5IZWFkZXJNZW51SXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiBoZWFkZXJNZW51T3B0aW9ucy5pY29uQ29sdW1uSGlkZUNvbW1hbmQgfHwgJ2ZhIGZhLXRpbWVzJyxcclxuICAgICAgICAgICAgICB0aXRsZTogb3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdISURFX0NPTFVNTicpIDogQ29uc3RhbnRzLlRFWFRfSElERV9DT0xVTU4sXHJcbiAgICAgICAgICAgICAgY29tbWFuZDogJ2hpZGUnLFxyXG4gICAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDU1XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS50cmFuc2xhdGVJdGVtcyhjb2x1bW5IZWFkZXJNZW51SXRlbXMsICd0aXRsZUtleScsICd0aXRsZScpO1xyXG4gICAgICAgICAgLy8gc29ydCB0aGUgY3VzdG9tIGl0ZW1zIGJ5IHRoZWlyIHBvc2l0aW9uIGluIHRoZSBsaXN0XHJcbiAgICAgICAgICBjb2x1bW5IZWFkZXJNZW51SXRlbXMuc29ydCgoaXRlbUE6IGFueSwgaXRlbUI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXRlbUEgJiYgaXRlbUIgJiYgaXRlbUEuaGFzT3duUHJvcGVydHkoJ3Bvc2l0aW9uT3JkZXInKSAmJiBpdGVtQi5oYXNPd25Qcm9wZXJ0eSgncG9zaXRpb25PcmRlcicpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1BLnBvc2l0aW9uT3JkZXIgLSBpdGVtQi5wb3NpdGlvbk9yZGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBoZWFkZXJNZW51T3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKiBFeGVjdXRlIHRoZSBIZWFkZXIgTWVudSBDb21tYW5kcyB0aGF0IHdhcyB0cmlnZ2VyZWQgYnkgdGhlIG9uQ29tbWFuZCBzdWJzY3JpYmUgKi9cclxuICBleGVjdXRlSGVhZGVyTWVudUludGVybmFsQ29tbWFuZHMoZXZlbnQ6IEV2ZW50LCBhcmdzOiBIZWFkZXJNZW51T25Db21tYW5kQXJncykge1xyXG4gICAgaWYgKGFyZ3MgJiYgYXJncy5jb21tYW5kKSB7XHJcbiAgICAgIHN3aXRjaCAoYXJncy5jb21tYW5kKSB7XHJcbiAgICAgICAgY2FzZSAnaGlkZSc6XHJcbiAgICAgICAgICB0aGlzLmhpZGVDb2x1bW4oYXJncy5jb2x1bW4pO1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1NpemVDb2x1bW5zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmF1dG9zaXplQ29sdW1ucygpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnY2xlYXItZmlsdGVyJzpcclxuICAgICAgICAgIHRoaXMuY2xlYXJDb2x1bW5GaWx0ZXIoZXZlbnQsIGFyZ3MpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnY2xlYXItc29ydCc6XHJcbiAgICAgICAgICB0aGlzLmNsZWFyQ29sdW1uU29ydChldmVudCwgYXJncyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdzb3J0LWFzYyc6XHJcbiAgICAgICAgY2FzZSAnc29ydC1kZXNjJzpcclxuICAgICAgICAgIGNvbnN0IGlzU29ydGluZ0FzYyA9IChhcmdzLmNvbW1hbmQgPT09ICdzb3J0LWFzYycpO1xyXG4gICAgICAgICAgdGhpcy5zb3J0Q29sdW1uKGV2ZW50LCBhcmdzLCBpc1NvcnRpbmdBc2MpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogSGlkZSBhIGNvbHVtbiBmcm9tIHRoZSBncmlkICovXHJcbiAgaGlkZUNvbHVtbihjb2x1bW46IENvbHVtbikge1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldENvbHVtbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0Q29sdW1ucykge1xyXG4gICAgICBjb25zdCBjb2x1bW5JbmRleCA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldENvbHVtbkluZGV4KGNvbHVtbi5pZCk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyA9IHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5hcnJheVJlbW92ZUl0ZW1CeUluZGV4KHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldENvbHVtbnMoKSwgY29sdW1uSW5kZXgpO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRDb2x1bW5zKHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldCBhbGwgdGhlIEdyaWQgTWVudSBvcHRpb25zIHdoaWNoIGhhdmUgdGV4dCB0byB0cmFuc2xhdGVcclxuICAgKiBAcGFyYW0gZ3JpZCBtZW51IG9iamVjdFxyXG4gICAqL1xyXG4gIHJlc2V0SGVhZGVyTWVudVRyYW5zbGF0aW9ucyhjb2x1bW5EZWZpbml0aW9uczogQ29sdW1uW10pIHtcclxuICAgIGNvbHVtbkRlZmluaXRpb25zLmZvckVhY2goKGNvbHVtbkRlZjogQ29sdW1uKSA9PiB7XHJcbiAgICAgIGlmIChjb2x1bW5EZWYgJiYgY29sdW1uRGVmLmhlYWRlciAmJiBjb2x1bW5EZWYuaGVhZGVyICYmIGNvbHVtbkRlZi5oZWFkZXIubWVudSAmJiBjb2x1bW5EZWYuaGVhZGVyLm1lbnUuaXRlbXMpIHtcclxuICAgICAgICBpZiAoIWNvbHVtbkRlZi5leGNsdWRlRnJvbUhlYWRlck1lbnUpIHtcclxuICAgICAgICAgIGNvbnN0IGNvbHVtbkhlYWRlck1lbnVJdGVtczogSGVhZGVyTWVudUl0ZW1bXSA9IGNvbHVtbkRlZi5oZWFkZXIubWVudS5pdGVtcyB8fCBbXTtcclxuICAgICAgICAgIGNvbHVtbkhlYWRlck1lbnVJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5jb21tYW5kKSB7XHJcbiAgICAgICAgICAgICAgY2FzZSAnY2xlYXItZmlsdGVyJzpcclxuICAgICAgICAgICAgICAgIGl0ZW0udGl0bGUgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdSRU1PVkVfRklMVEVSJykgfHwgQ29uc3RhbnRzLlRFWFRfUkVNT1ZFX0ZJTFRFUjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ2NsZWFyLXNvcnQnOlxyXG4gICAgICAgICAgICAgICAgaXRlbS50aXRsZSA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1JFTU9WRV9TT1JUJykgfHwgQ29uc3RhbnRzLlRFWFRfUkVNT1ZFX1NPUlQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICdzb3J0LWFzYyc6XHJcbiAgICAgICAgICAgICAgICBpdGVtLnRpdGxlID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnU09SVF9BU0NFTkRJTkcnKSB8fCBDb25zdGFudHMuVEVYVF9TT1JUX0FTQ0VORElORztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ3NvcnQtZGVzYyc6XHJcbiAgICAgICAgICAgICAgICBpdGVtLnRpdGxlID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnU09SVF9ERVNDRU5ESU5HJykgfHwgQ29uc3RhbnRzLlRFWFRfU09SVF9ERVNDRU5ESU5HO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnaGlkZSc6XHJcbiAgICAgICAgICAgICAgICBpdGVtLnRpdGxlID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnSElERV9DT0xVTU4nKSB8fCBDb25zdGFudHMuVEVYVF9ISURFX0NPTFVNTjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyByZS10cmFuc2xhdGUgaWYgdGhlcmUncyBhIFwidGl0bGVLZXlcIlxyXG4gICAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVUcmFuc2xhdGUpIHtcclxuICAgICAgICAgICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkudHJhbnNsYXRlSXRlbXMoY29sdW1uSGVhZGVyTWVudUl0ZW1zLCAndGl0bGVLZXknLCAndGl0bGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zbGF0ZSB0aGUgSGVhZGVyIE1lbnUgdGl0bGVzLCB3ZSBuZWVkIHRvIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1uIGRlZmluaXRpb24gdG8gcmUtdHJhbnNsYXRlIHRoZW1cclxuICAgKi9cclxuICB0cmFuc2xhdGVIZWFkZXJNZW51KCkge1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudSkge1xyXG4gICAgICB0aGlzLnJlc2V0SGVhZGVyTWVudVRyYW5zbGF0aW9ucyh0aGlzLnNoYXJlZFNlcnZpY2UudmlzaWJsZUNvbHVtbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHJldHVybiBkZWZhdWx0IEhlYWRlciBNZW51IG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIGdldERlZmF1bHRIZWFkZXJNZW51T3B0aW9ucygpOiBIZWFkZXJNZW51IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGF1dG9BbGlnbk9mZnNldDogMTIsXHJcbiAgICAgIG1pbldpZHRoOiAxNDAsXHJcbiAgICAgIGhpZGVDb2x1bW5IaWRlQ29tbWFuZDogZmFsc2UsXHJcbiAgICAgIGhpZGVTb3J0Q29tbWFuZHM6IGZhbHNlLFxyXG4gICAgICB0aXRsZTogJydcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKiogU29ydCB0aGUgY3VycmVudCBjb2x1bW4gKi9cclxuICBwcml2YXRlIHNvcnRDb2x1bW4oZXZlbnQ6IEV2ZW50LCBhcmdzOiBIZWFkZXJNZW51T25Db21tYW5kQXJncywgaXNTb3J0aW5nQXNjID0gdHJ1ZSkge1xyXG4gICAgaWYgKGFyZ3MgJiYgYXJncy5jb2x1bW4pIHtcclxuICAgICAgLy8gZ2V0IHByZXZpb3VzbHkgc29ydGVkIGNvbHVtbnNcclxuICAgICAgY29uc3Qgc29ydGVkQ29sc1dpdGhvdXRDdXJyZW50OiBDb2x1bW5Tb3J0W10gPSB0aGlzLnNvcnRTZXJ2aWNlLmdldFByZXZpb3VzQ29sdW1uU29ydHMoYXJncy5jb2x1bW4uaWQgKyAnJyk7XHJcblxyXG4gICAgICAvLyBhZGQgdG8gdGhlIGNvbHVtbiBhcnJheSwgdGhlIGNvbHVtbiBzb3J0ZWQgYnkgdGhlIGhlYWRlciBtZW51XHJcbiAgICAgIHNvcnRlZENvbHNXaXRob3V0Q3VycmVudC5wdXNoKHsgc29ydENvbDogYXJncy5jb2x1bW4sIHNvcnRBc2M6IGlzU29ydGluZ0FzYyB9KTtcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICAgIHRoaXMuc29ydFNlcnZpY2Uub25CYWNrZW5kU29ydENoYW5nZWQoZXZlbnQsIHsgbXVsdGlDb2x1bW5Tb3J0OiB0cnVlLCBzb3J0Q29sczogc29ydGVkQ29sc1dpdGhvdXRDdXJyZW50LCBncmlkOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCB9KTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZGF0YVZpZXcpIHtcclxuICAgICAgICB0aGlzLnNvcnRTZXJ2aWNlLm9uTG9jYWxTb3J0Q2hhbmdlZCh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCwgdGhpcy5zaGFyZWRTZXJ2aWNlLmRhdGFWaWV3LCBzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIHdoZW4gdXNpbmcgY3VzdG9tRGF0YVZpZXcsIHdlIHdpbGwgc2ltcGx5IHNlbmQgaXQgYXMgYSBvblNvcnQgZXZlbnQgd2l0aCBub3RpZnlcclxuICAgICAgICBjb25zdCBpc011bHRpU29ydCA9IHRoaXMuc2hhcmVkU2VydmljZSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLm11bHRpQ29sdW1uU29ydCB8fCBmYWxzZTtcclxuICAgICAgICBjb25zdCBzb3J0T3V0cHV0ID0gaXNNdWx0aVNvcnQgPyBzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnQgOiBzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnRbMF07XHJcbiAgICAgICAgYXJncy5ncmlkLm9uU29ydC5ub3RpZnkoc29ydE91dHB1dCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHVwZGF0ZSB0aGUgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPYmogc29ydENvbHVtbnMgYXJyYXkgd2hpY2ggd2lsbCBhdCB0aGUgc2FtZSBhZGQgdGhlIHZpc3VhbCBzb3J0IGljb24ocykgb24gdGhlIFVJXHJcbiAgICAgIGNvbnN0IG5ld1NvcnRDb2x1bW5zOiBDb2x1bW5Tb3J0W10gPSBzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnQubWFwKChjb2wpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgY29sdW1uSWQ6IGNvbCAmJiBjb2wuc29ydENvbCAmJiBjb2wuc29ydENvbC5pZCxcclxuICAgICAgICAgIHNvcnRBc2M6IGNvbCAmJiBjb2wuc29ydEFzY1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRTb3J0Q29sdW1ucyhuZXdTb3J0Q29sdW1ucyk7IC8vIGFkZCBzb3J0IGljb24gaW4gVUlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBDbGVhciB0aGUgRmlsdGVyIG9uIHRoZSBjdXJyZW50IGNvbHVtbiAoaWYgaXQncyBhY3R1YWxseSBmaWx0ZXJlZCkgKi9cclxuICBwcml2YXRlIGNsZWFyQ29sdW1uRmlsdGVyKGV2ZW50OiBFdmVudCwgYXJnczogSGVhZGVyTWVudU9uQ29tbWFuZEFyZ3MpIHtcclxuICAgIGlmIChhcmdzICYmIGFyZ3MuY29sdW1uKSB7XHJcbiAgICAgIHRoaXMuZmlsdGVyU2VydmljZS5jbGVhckZpbHRlckJ5Q29sdW1uSWQoZXZlbnQsIGFyZ3MuY29sdW1uLmlkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBDbGVhciB0aGUgU29ydCBvbiB0aGUgY3VycmVudCBjb2x1bW4gKGlmIGl0J3MgYWN0dWFsbHkgc29ydGVkKSAqL1xyXG4gIHByaXZhdGUgY2xlYXJDb2x1bW5Tb3J0KGV2ZW50OiBFdmVudCwgYXJnczogSGVhZGVyTWVudU9uQ29tbWFuZEFyZ3MpIHtcclxuICAgIGlmIChhcmdzICYmIGFyZ3MuY29sdW1uICYmIHRoaXMuc2hhcmVkU2VydmljZSkge1xyXG4gICAgICAvLyBnZXQgcHJldmlvdXNseSBzb3J0ZWQgY29sdW1uc1xyXG4gICAgICBjb25zdCBhbGxTb3J0ZWRDb2xzOiBDb2x1bW5Tb3J0W10gPSB0aGlzLnNvcnRTZXJ2aWNlLmdldFByZXZpb3VzQ29sdW1uU29ydHMoKTtcclxuICAgICAgY29uc3Qgc29ydGVkQ29sc1dpdGhvdXRDdXJyZW50OiBDb2x1bW5Tb3J0W10gPSB0aGlzLnNvcnRTZXJ2aWNlLmdldFByZXZpb3VzQ29sdW1uU29ydHMoYXJncy5jb2x1bW4uaWQgKyAnJyk7XHJcblxyXG4gICAgICBpZiAoYWxsU29ydGVkQ29scy5sZW5ndGggIT09IHNvcnRlZENvbHNXaXRob3V0Q3VycmVudC5sZW5ndGgpIHtcclxuICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICAgICAgdGhpcy5zb3J0U2VydmljZS5vbkJhY2tlbmRTb3J0Q2hhbmdlZChldmVudCwgeyBtdWx0aUNvbHVtblNvcnQ6IHRydWUsIHNvcnRDb2xzOiBzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnQsIGdyaWQ6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmRhdGFWaWV3KSB7XHJcbiAgICAgICAgICB0aGlzLnNvcnRTZXJ2aWNlLm9uTG9jYWxTb3J0Q2hhbmdlZCh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCwgdGhpcy5zaGFyZWRTZXJ2aWNlLmRhdGFWaWV3LCBzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnQsIHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyB3aGVuIHVzaW5nIGN1c3RvbURhdGFWaWV3LCB3ZSB3aWxsIHNpbXBseSBzZW5kIGl0IGFzIGEgb25Tb3J0IGV2ZW50IHdpdGggbm90aWZ5XHJcbiAgICAgICAgICBjb25zdCBpc011bHRpU29ydCA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMubXVsdGlDb2x1bW5Tb3J0IHx8IGZhbHNlO1xyXG4gICAgICAgICAgY29uc3Qgc29ydE91dHB1dCA9IGlzTXVsdGlTb3J0ID8gc29ydGVkQ29sc1dpdGhvdXRDdXJyZW50IDogc29ydGVkQ29sc1dpdGhvdXRDdXJyZW50WzBdO1xyXG4gICAgICAgICAgYXJncy5ncmlkLm9uU29ydC5ub3RpZnkoc29ydE91dHB1dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdGhlIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT2JqIHNvcnRDb2x1bW5zIGFycmF5IHdoaWNoIHdpbGwgYXQgdGhlIHNhbWUgYWRkIHRoZSB2aXN1YWwgc29ydCBpY29uKHMpIG9uIHRoZSBVSVxyXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRTb3J0Q29sdW1uczogQ29sdW1uU29ydFtdID0gc29ydGVkQ29sc1dpdGhvdXRDdXJyZW50Lm1hcCgoY29sKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5JZDogY29sICYmIGNvbC5zb3J0Q29sICYmIGNvbC5zb3J0Q29sLmlkLFxyXG4gICAgICAgICAgICBzb3J0QXNjOiBjb2wgJiYgY29sLnNvcnRBc2NcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0U29ydENvbHVtbnModXBkYXRlZFNvcnRDb2x1bW5zKTsgLy8gYWRkIHNvcnQgaWNvbiBpbiBVSVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==