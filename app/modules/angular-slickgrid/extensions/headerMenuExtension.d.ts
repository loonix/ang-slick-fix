import { TranslateService } from '@ngx-translate/core';
import { Column, Extension, HeaderMenuOnCommandArgs } from '../models/index';
import { FilterService } from '../services/filter.service';
import { SortService } from '../services/sort.service';
import { SharedService } from '../services/shared.service';
import { ExtensionUtility } from './extensionUtility';
export declare class HeaderMenuExtension implements Extension {
    private extensionUtility;
    private filterService;
    private sharedService;
    private sortService;
    private translate;
    private _eventHandler;
    private _extension;
    constructor(extensionUtility: ExtensionUtility, filterService: FilterService, sharedService: SharedService, sortService: SortService, translate: TranslateService);
    dispose(): void;
    /**
    * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
    * @param grid
    * @param dataView
    * @param columnDefinitions
    */
    register(): any;
    /**
     * Create Header Menu with Custom Commands if user has enabled Header Menu
     * @param options
     * @param columnDefinitions
     * @return header menu
     */
    private addHeaderMenuCustomCommands;
    /** Execute the Header Menu Commands that was triggered by the onCommand subscribe */
    executeHeaderMenuInternalCommands(event: Event, args: HeaderMenuOnCommandArgs): void;
    /** Hide a column from the grid */
    hideColumn(column: Column): void;
    /**
     * Reset all the Grid Menu options which have text to translate
     * @param grid menu object
     */
    resetHeaderMenuTranslations(columnDefinitions: Column[]): void;
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     */
    translateHeaderMenu(): void;
    /**
     * @return default Header Menu options
     */
    private getDefaultHeaderMenuOptions;
    /** Sort the current column */
    private sortColumn;
    /** Clear the Filter on the current column (if it's actually filtered) */
    private clearColumnFilter;
    /** Clear the Sort on the current column (if it's actually sorted) */
    private clearColumnSort;
}
