import { ApplicationRef, ComponentRef, ViewContainerRef } from '@angular/core';
import { Column, Extension, GridOption } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { AngularUtilService } from '../services/angularUtilService';
import { FilterService } from '../services/filter.service';
import { SharedService } from '../services/shared.service';
export interface CreatedView {
    id: string | number;
    dataContext: any;
    componentRef?: ComponentRef<any>;
}
export declare class RowDetailViewExtension implements Extension {
    private angularUtilService;
    private appRef;
    private extensionUtility;
    private filterService;
    private sharedService;
    rowDetailContainer: ViewContainerRef;
    private _eventHandler;
    private _extension;
    private _preloadComponent;
    private _views;
    private _viewComponent;
    private _subscriptions;
    private _userProcessFn;
    constructor(angularUtilService: AngularUtilService, appRef: ApplicationRef, extensionUtility: ExtensionUtility, filterService: FilterService, sharedService: SharedService);
    dispose(): void;
    /**
     * Create the plugin before the Grid creation, else it will behave oddly.
     * Mostly because the column definitions might change after the grid creation
     */
    create(columnDefinitions: Column[], gridOptions: GridOption): any;
    register(rowSelectionPlugin?: any): any;
    private addToArrayWhenNotFound;
    private disposeAllViewComponents;
    private disposeViewComponent;
    /**
     * notify the onAsyncResponse with the "args.item" (required property)
     * the plugin will then use item to populate the row detail panel with the "postTemplate"
     * @param item
     */
    private notifyTemplate;
    /**
     * On Processing, we will notify the plugin with the new item detail once backend server call completes
     * @param item
     */
    private onProcessing;
    /** Redraw (re-render) all the expanded row detail View Components */
    private redrawAllViewComponents;
    /** Render all the expanded row detail View Components */
    private renderAllViewComponents;
    /**
     * Just before the row get expanded or collapsed we will do the following
     * First determine if the row is expanding or collapsing,
     * if it's expanding we will add it to our View Components reference array if we don't already have it
     * or if it's collapsing we will remove it from our View Components reference array
     */
    private onBeforeRowDetailToggle;
    /** When Row comes back to Viewport Range, we need to redraw the View */
    private onRowBackToViewportRange;
    /** Redraw the necessary View Component */
    private redrawViewComponent;
    /** Render (or rerender) the View Component (Row Detail) */
    private renderPreloadView;
    /** Render (or rerender) the View Component (Row Detail) */
    private renderViewModel;
}
