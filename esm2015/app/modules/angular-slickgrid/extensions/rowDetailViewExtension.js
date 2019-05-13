/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ApplicationRef, Injectable } from '@angular/core';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { AngularUtilService } from '../services/angularUtilService';
import { FilterService } from '../services/filter.service';
import { SharedService } from '../services/shared.service';
import { unsubscribeAllObservables } from '../services/utilities';
import * as DOMPurify_ from 'dompurify';
/** @type {?} */
const DOMPurify = DOMPurify_;
/** @type {?} */
const ROW_DETAIL_CONTAINER_PREFIX = 'container_';
/** @type {?} */
const PRELOAD_CONTAINER_PREFIX = 'container_loading';
/**
 * @record
 */
export function CreatedView() { }
if (false) {
    /** @type {?} */
    CreatedView.prototype.id;
    /** @type {?} */
    CreatedView.prototype.dataContext;
    /** @type {?|undefined} */
    CreatedView.prototype.componentRef;
}
export class RowDetailViewExtension {
    /**
     * @param {?} angularUtilService
     * @param {?} appRef
     * @param {?} extensionUtility
     * @param {?} filterService
     * @param {?} sharedService
     */
    constructor(angularUtilService, appRef, extensionUtility, filterService, sharedService) {
        this.angularUtilService = angularUtilService;
        this.appRef = appRef;
        this.extensionUtility = extensionUtility;
        this.filterService = filterService;
        this.sharedService = sharedService;
        this._eventHandler = new Slick.EventHandler();
        this._views = [];
        this._subscriptions = [];
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
        // also unsubscribe all RxJS subscriptions
        this._subscriptions = unsubscribeAllObservables(this._subscriptions);
        this.disposeAllViewComponents();
    }
    /**
     * Create the plugin before the Grid creation, else it will behave oddly.
     * Mostly because the column definitions might change after the grid creation
     * @param {?} columnDefinitions
     * @param {?} gridOptions
     * @return {?}
     */
    create(columnDefinitions, gridOptions) {
        if (columnDefinitions && gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.rowDetailView);
            if (!gridOptions.rowDetailView) {
                throw new Error('The Row Detail View requires options to be passed via the "rowDetailView" property of the Grid Options');
            }
            if (gridOptions && gridOptions.rowDetailView) {
                if (!this._extension) {
                    if (typeof gridOptions.rowDetailView.process === 'function') {
                        // we need to keep the user "process" method and replace it with our own execution method
                        // we do this because when we get the item detail, we need to call "onAsyncResponse.notify" for the plugin to work
                        this._userProcessFn = gridOptions.rowDetailView.process; // keep user's process method
                        gridOptions.rowDetailView.process = (/**
                         * @param {?} item
                         * @return {?}
                         */
                        (item) => this.onProcessing(item)); // replace process method & run our internal one
                    }
                    else {
                        throw new Error('You need to provide a "process" function for the Row Detail Extension to work properly');
                    }
                    // load the Preload & RowDetail Templates (could be straight HTML or Angular View/ViewModel)
                    // when those are Angular View/ViewModel, we need to create View Component & provide the html containers to the Plugin (preTemplate/postTemplate methods)
                    if (!gridOptions.rowDetailView.preTemplate) {
                        this._preloadComponent = gridOptions && gridOptions.rowDetailView && gridOptions.rowDetailView.preloadComponent;
                        gridOptions.rowDetailView.preTemplate = (/**
                         * @return {?}
                         */
                        () => DOMPurify.sanitize(`<div class="${PRELOAD_CONTAINER_PREFIX}"></div>`));
                    }
                    if (!gridOptions.rowDetailView.postTemplate) {
                        this._viewComponent = gridOptions && gridOptions.rowDetailView && gridOptions.rowDetailView.viewComponent;
                        gridOptions.rowDetailView.postTemplate = (/**
                         * @param {?} itemDetail
                         * @return {?}
                         */
                        (itemDetail) => DOMPurify.sanitize(`<div class="${ROW_DETAIL_CONTAINER_PREFIX}${itemDetail.id}"></div>`));
                    }
                    // finally register the Row Detail View Plugin
                    this._extension = new Slick.Plugins.RowDetailView(gridOptions.rowDetailView);
                }
                /** @type {?} */
                const selectionColumn = this._extension.getColumnDefinition();
                selectionColumn.excludeFromExport = true;
                selectionColumn.excludeFromQuery = true;
                selectionColumn.excludeFromHeaderMenu = true;
                columnDefinitions.unshift(selectionColumn);
            }
            return this._extension;
        }
        return null;
    }
    /**
     * @param {?=} rowSelectionPlugin
     * @return {?}
     */
    register(rowSelectionPlugin) {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // the plugin has to be created BEFORE the grid (else it behaves oddly), but we can only watch grid events AFTER the grid is created
            this.sharedService.grid.registerPlugin(this._extension);
            // this also requires the Row Selection Model to be registered as well
            if (!rowSelectionPlugin || !this.sharedService.grid.getSelectionModel()) {
                this.extensionUtility.loadExtensionDynamically(ExtensionName.rowSelection);
                rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || { selectActiveRow: true });
                this.sharedService.grid.setSelectionModel(rowSelectionPlugin);
            }
            // this._extension = this.create(this.sharedService.allColumns, this.sharedService.gridOptions);
            this.sharedService.grid.registerPlugin(this._extension);
            // hook all events
            if (this.sharedService.grid && this.sharedService.gridOptions.rowDetailView) {
                if (this.sharedService.gridOptions.rowDetailView.onExtensionRegistered) {
                    this.sharedService.gridOptions.rowDetailView.onExtensionRegistered(this._extension);
                }
                this._eventHandler.subscribe(this._extension.onAsyncResponse, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                (e, args) => {
                    if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onAsyncResponse === 'function') {
                        this.sharedService.gridOptions.rowDetailView.onAsyncResponse(e, args);
                    }
                }));
                this._eventHandler.subscribe(this._extension.onAsyncEndUpdate, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                (e, args) => {
                    // triggers after backend called "onAsyncResponse.notify()"
                    this.renderViewModel(args && args.item);
                    if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onAsyncEndUpdate === 'function') {
                        this.sharedService.gridOptions.rowDetailView.onAsyncEndUpdate(e, args);
                    }
                }));
                this._eventHandler.subscribe(this._extension.onAfterRowDetailToggle, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                (e, args) => {
                    // display preload template & re-render all the other Detail Views after toggling
                    // the preload View will eventually go away once the data gets loaded after the "onAsyncEndUpdate" event
                    this.renderPreloadView();
                    this.renderAllViewComponents();
                    if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onAfterRowDetailToggle === 'function') {
                        this.sharedService.gridOptions.rowDetailView.onAfterRowDetailToggle(e, args);
                    }
                }));
                this._eventHandler.subscribe(this._extension.onBeforeRowDetailToggle, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                (e, args) => {
                    // before toggling row detail, we need to create View Component if it doesn't exist
                    this.onBeforeRowDetailToggle(e, args);
                    if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onBeforeRowDetailToggle === 'function') {
                        this.sharedService.gridOptions.rowDetailView.onBeforeRowDetailToggle(e, args);
                    }
                }));
                this._eventHandler.subscribe(this._extension.onRowBackToViewportRange, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                (e, args) => {
                    // when row is back to viewport range, we will re-render the View Component(s)
                    this.onRowBackToViewportRange(e, args);
                    if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onRowBackToViewportRange === 'function') {
                        this.sharedService.gridOptions.rowDetailView.onRowBackToViewportRange(e, args);
                    }
                }));
                this._eventHandler.subscribe(this._extension.onRowOutOfViewportRange, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                (e, args) => {
                    if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onRowOutOfViewportRange === 'function') {
                        this.sharedService.gridOptions.rowDetailView.onRowOutOfViewportRange(e, args);
                    }
                }));
                // --
                // hook some events needed by the Plugin itself
                this._eventHandler.subscribe(this.sharedService.grid.onColumnsReordered, (/**
                 * @return {?}
                 */
                () => this.redrawAllViewComponents()));
                // on sort, all row detail are collapsed so we can dispose of all the Views as well
                this._eventHandler.subscribe(this.sharedService.grid.onSort, (/**
                 * @return {?}
                 */
                () => this.disposeAllViewComponents()));
                // on filter changed, we need to re-render all Views
                this._subscriptions.push(this.filterService.onFilterChanged.subscribe((/**
                 * @param {?} currentFilters
                 * @return {?}
                 */
                (currentFilters) => this.redrawAllViewComponents())));
            }
            return this._extension;
        }
        return null;
    }
    // --
    // private functions
    // ------------------
    /**
     * @private
     * @param {?} inputArray
     * @param {?} inputObj
     * @return {?}
     */
    addToArrayWhenNotFound(inputArray, inputObj) {
        /** @type {?} */
        const arrayRowIndex = inputArray.findIndex((/**
         * @param {?} obj
         * @return {?}
         */
        (obj) => obj.id === inputObj.id));
        if (arrayRowIndex < 0) {
            inputArray.push(inputObj);
        }
    }
    /**
     * @private
     * @return {?}
     */
    disposeAllViewComponents() {
        this._views.forEach((/**
         * @param {?} compRef
         * @return {?}
         */
        (compRef) => this.disposeViewComponent(compRef)));
        this._views = [];
    }
    /**
     * @private
     * @param {?} expandedView
     * @return {?}
     */
    disposeViewComponent(expandedView) {
        /** @type {?} */
        const compRef = expandedView && expandedView.componentRef;
        if (compRef) {
            this.appRef.detachView(compRef.hostView);
            compRef.destroy();
            return expandedView;
        }
        return null;
    }
    /**
     * notify the onAsyncResponse with the "args.item" (required property)
     * the plugin will then use item to populate the row detail panel with the "postTemplate"
     * @private
     * @param {?} item
     * @return {?}
     */
    notifyTemplate(item) {
        if (this._extension) {
            this._extension.onAsyncResponse.notify({ item }, undefined, this);
        }
    }
    /**
     * On Processing, we will notify the plugin with the new item detail once backend server call completes
     * @private
     * @param {?} item
     * @return {?}
     */
    onProcessing(item) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (item && typeof this._userProcessFn === 'function') {
                /** @type {?} */
                const userProcessFn = this._userProcessFn(item);
                // wait for the "userProcessFn", once resolved we will save it into the "collection"
                /** @type {?} */
                const response = yield userProcessFn;
                /** @type {?} */
                let awaitedItemDetail;
                if (response.hasOwnProperty('id')) {
                    awaitedItemDetail = response; // from Promise
                }
                else if (response instanceof Response && typeof response['json'] === 'function') {
                    awaitedItemDetail = yield response['json'](); // from Fetch
                }
                else if (response && response['content']) {
                    awaitedItemDetail = response['content']; // from Angular-http-client
                }
                // notify the plugin with the new item details
                this.notifyTemplate(awaitedItemDetail || {});
            }
        });
    }
    /**
     * Redraw (re-render) all the expanded row detail View Components
     * @private
     * @return {?}
     */
    redrawAllViewComponents() {
        this._views.forEach((/**
         * @param {?} compRef
         * @return {?}
         */
        (compRef) => {
            this.redrawViewComponent(compRef);
        }));
    }
    /**
     * Render all the expanded row detail View Components
     * @private
     * @return {?}
     */
    renderAllViewComponents() {
        this._views.forEach((/**
         * @param {?} view
         * @return {?}
         */
        (view) => {
            if (view && view.dataContext) {
                this.renderViewModel(view.dataContext);
            }
        }));
    }
    /**
     * Just before the row get expanded or collapsed we will do the following
     * First determine if the row is expanding or collapsing,
     * if it's expanding we will add it to our View Components reference array if we don't already have it
     * or if it's collapsing we will remove it from our View Components reference array
     * @private
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    onBeforeRowDetailToggle(e, args) {
        // expanding
        if (args && args.item && args.item.__collapsed) {
            // expanding row detail
            if (args && args.item) {
                /** @type {?} */
                const viewInfo = {
                    id: args.item.id,
                    dataContext: args.item
                };
                this.addToArrayWhenNotFound(this._views, viewInfo);
            }
        }
        else {
            // collapsing, so dispose of the View/Component
            /** @type {?} */
            const foundViewIndex = this._views.findIndex((/**
             * @param {?} view
             * @return {?}
             */
            (view) => view.id === args.item.id));
            if (foundViewIndex >= 0) {
                if (this._views.hasOwnProperty(foundViewIndex)) {
                    /** @type {?} */
                    const compRef = this._views[foundViewIndex].componentRef;
                    this.appRef.detachView(compRef.hostView);
                    compRef.destroy();
                    this._views.splice(foundViewIndex, 1);
                }
            }
        }
    }
    /**
     * When Row comes back to Viewport Range, we need to redraw the View
     * @private
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    onRowBackToViewportRange(e, args) {
        if (args && args.item) {
            this._views.forEach((/**
             * @param {?} view
             * @return {?}
             */
            (view) => {
                if (view.id === args.item.id) {
                    this.redrawViewComponent(view);
                }
            }));
        }
    }
    /**
     * Redraw the necessary View Component
     * @private
     * @param {?} createdView
     * @return {?}
     */
    redrawViewComponent(createdView) {
        /** @type {?} */
        const containerElements = document.getElementsByClassName(`${ROW_DETAIL_CONTAINER_PREFIX}${createdView.id}`);
        if (containerElements && containerElements.length) {
            this.renderViewModel(createdView.dataContext);
        }
    }
    /**
     * Render (or rerender) the View Component (Row Detail)
     * @private
     * @return {?}
     */
    renderPreloadView() {
        /** @type {?} */
        const containerElements = document.getElementsByClassName(`${PRELOAD_CONTAINER_PREFIX}`);
        if (containerElements && containerElements.length) {
            this.angularUtilService.createAngularComponentAppendToDom(this._preloadComponent, containerElements[0], true);
        }
    }
    /**
     * Render (or rerender) the View Component (Row Detail)
     * @private
     * @param {?} item
     * @return {?}
     */
    renderViewModel(item) {
        /** @type {?} */
        const containerElements = document.getElementsByClassName(`${ROW_DETAIL_CONTAINER_PREFIX}${item.id}`);
        if (containerElements && containerElements.length) {
            /** @type {?} */
            const componentOutput = this.angularUtilService.createAngularComponentAppendToDom(this._viewComponent, containerElements[0], true);
            if (componentOutput && componentOutput.componentRef && componentOutput.componentRef.instance) {
                Object.assign(componentOutput.componentRef.instance, { model: item });
                /** @type {?} */
                const viewObj = this._views.find((/**
                 * @param {?} obj
                 * @return {?}
                 */
                (obj) => obj.id === item.id));
                if (viewObj) {
                    viewObj.componentRef = componentOutput.componentRef;
                }
            }
        }
    }
}
RowDetailViewExtension.decorators = [
    { type: Injectable }
];
/** @nocollapse */
RowDetailViewExtension.ctorParameters = () => [
    { type: AngularUtilService },
    { type: ApplicationRef },
    { type: ExtensionUtility },
    { type: FilterService },
    { type: SharedService }
];
if (false) {
    /** @type {?} */
    RowDetailViewExtension.prototype.rowDetailContainer;
    /**
     * @type {?}
     * @private
     */
    RowDetailViewExtension.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    RowDetailViewExtension.prototype._extension;
    /**
     * @type {?}
     * @private
     */
    RowDetailViewExtension.prototype._preloadComponent;
    /**
     * @type {?}
     * @private
     */
    RowDetailViewExtension.prototype._views;
    /**
     * @type {?}
     * @private
     */
    RowDetailViewExtension.prototype._viewComponent;
    /**
     * @type {?}
     * @private
     */
    RowDetailViewExtension.prototype._subscriptions;
    /**
     * @type {?}
     * @private
     */
    RowDetailViewExtension.prototype._userProcessFn;
    /**
     * @type {?}
     * @private
     */
    RowDetailViewExtension.prototype.angularUtilService;
    /**
     * @type {?}
     * @private
     */
    RowDetailViewExtension.prototype.appRef;
    /**
     * @type {?}
     * @private
     */
    RowDetailViewExtension.prototype.extensionUtility;
    /**
     * @type {?}
     * @private
     */
    RowDetailViewExtension.prototype.filterService;
    /**
     * @type {?}
     * @private
     */
    RowDetailViewExtension.prototype.sharedService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93RGV0YWlsVmlld0V4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9yb3dEZXRhaWxWaWV3RXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBZ0IsVUFBVSxFQUEwQixNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQW9DLGFBQWEsRUFBYyxNQUFNLGlCQUFpQixDQUFDO0FBQzlGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFbEUsT0FBTyxLQUFLLFVBQVUsTUFBTSxXQUFXLENBQUM7O01BQ2xDLFNBQVMsR0FBRyxVQUFVOztNQUt0QiwyQkFBMkIsR0FBRyxZQUFZOztNQUMxQyx3QkFBd0IsR0FBRyxtQkFBbUI7Ozs7QUFFcEQsaUNBSUM7OztJQUhDLHlCQUFvQjs7SUFDcEIsa0NBQWlCOztJQUNqQixtQ0FBaUM7O0FBSW5DLE1BQU0sT0FBTyxzQkFBc0I7Ozs7Ozs7O0lBVWpDLFlBQ1Usa0JBQXNDLEVBQ3RDLE1BQXNCLEVBQ3RCLGdCQUFrQyxFQUNsQyxhQUE0QixFQUM1QixhQUE0QjtRQUo1Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIs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Ozs7O0lBQ3JDLGdEQUE0Qzs7Ozs7SUFDNUMsZ0RBQW9EOzs7OztJQUdsRCxvREFBOEM7Ozs7O0lBQzlDLHdDQUE4Qjs7Ozs7SUFDOUIsa0RBQTBDOzs7OztJQUMxQywrQ0FBb0M7Ozs7O0lBQ3BDLCtDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRSZWYsIEluamVjdGFibGUsIFR5cGUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbHVtbiwgQ3VycmVudEZpbHRlciwgRXh0ZW5zaW9uLCBFeHRlbnNpb25OYW1lLCBHcmlkT3B0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IEV4dGVuc2lvblV0aWxpdHkgfSBmcm9tICcuL2V4dGVuc2lvblV0aWxpdHknO1xuaW1wb3J0IHsgQW5ndWxhclV0aWxTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYW5ndWxhclV0aWxTZXJ2aWNlJztcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9maWx0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgdW5zdWJzY3JpYmVBbGxPYnNlcnZhYmxlcyB9IGZyb20gJy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCAqIGFzIERPTVB1cmlmeV8gZnJvbSAnZG9tcHVyaWZ5JztcbmNvbnN0IERPTVB1cmlmeSA9IERPTVB1cmlmeV87IC8vIHBhdGNoIHRvIGZpeCByb2xsdXAgdG8gd29ya1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xuXG5jb25zdCBST1dfREVUQUlMX0NPTlRBSU5FUl9QUkVGSVggPSAnY29udGFpbmVyXyc7XG5jb25zdCBQUkVMT0FEX0NPTlRBSU5FUl9QUkVGSVggPSAnY29udGFpbmVyX2xvYWRpbmcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENyZWF0ZWRWaWV3IHtcbiAgaWQ6IHN0cmluZyB8IG51bWJlcjtcbiAgZGF0YUNvbnRleHQ6IGFueTtcbiAgY29tcG9uZW50UmVmPzogQ29tcG9uZW50UmVmPGFueT47XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSb3dEZXRhaWxWaWV3RXh0ZW5zaW9uIGltcGxlbWVudHMgRXh0ZW5zaW9uIHtcbiAgcm93RGV0YWlsQ29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuICBwcml2YXRlIF9ldmVudEhhbmRsZXI6IGFueSA9IG5ldyBTbGljay5FdmVudEhhbmRsZXIoKTtcbiAgcHJpdmF0ZSBfZXh0ZW5zaW9uOiBhbnk7XG4gIHByaXZhdGUgX3ByZWxvYWRDb21wb25lbnQ6IFR5cGU8b2JqZWN0PjtcbiAgcHJpdmF0ZSBfdmlld3M6IENyZWF0ZWRWaWV3W10gPSBbXTtcbiAgcHJpdmF0ZSBfdmlld0NvbXBvbmVudDogVHlwZTxvYmplY3Q+O1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBwcml2YXRlIF91c2VyUHJvY2Vzc0ZuOiAoaXRlbTogYW55KSA9PiBQcm9taXNlPGFueT47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhbmd1bGFyVXRpbFNlcnZpY2U6IEFuZ3VsYXJVdGlsU2VydmljZSxcbiAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgcHJpdmF0ZSBleHRlbnNpb25VdGlsaXR5OiBFeHRlbnNpb25VdGlsaXR5LFxuICAgIHByaXZhdGUgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSxcbiAgICBwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UsXG4gICkgeyB9XG5cbiAgZGlzcG9zZSgpIHtcbiAgICAvLyB1bnN1YnNjcmliZSBhbGwgU2xpY2tHcmlkIGV2ZW50c1xuICAgIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCgpO1xuXG4gICAgaWYgKHRoaXMuX2V4dGVuc2lvbiAmJiB0aGlzLl9leHRlbnNpb24uZGVzdHJveSkge1xuICAgICAgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICAvLyBhbHNvIHVuc3Vic2NyaWJlIGFsbCBSeEpTIHN1YnNjcmlwdGlvbnNcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zID0gdW5zdWJzY3JpYmVBbGxPYnNlcnZhYmxlcyh0aGlzLl9zdWJzY3JpcHRpb25zKTtcbiAgICB0aGlzLmRpc3Bvc2VBbGxWaWV3Q29tcG9uZW50cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSB0aGUgcGx1Z2luIGJlZm9yZSB0aGUgR3JpZCBjcmVhdGlvbiwgZWxzZSBpdCB3aWxsIGJlaGF2ZSBvZGRseS5cbiAgICogTW9zdGx5IGJlY2F1c2UgdGhlIGNvbHVtbiBkZWZpbml0aW9ucyBtaWdodCBjaGFuZ2UgYWZ0ZXIgdGhlIGdyaWQgY3JlYXRpb25cbiAgICovXG4gIGNyZWF0ZShjb2x1bW5EZWZpbml0aW9uczogQ29sdW1uW10sIGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uKSB7XG4gICAgaWYgKGNvbHVtbkRlZmluaXRpb25zICYmIGdyaWRPcHRpb25zKSB7XG4gICAgICAvLyBkeW5hbWljYWxseSBpbXBvcnQgdGhlIFNsaWNrR3JpZCBwbHVnaW4gd2l0aCByZXF1aXJlSlNcbiAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5sb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoRXh0ZW5zaW9uTmFtZS5yb3dEZXRhaWxWaWV3KTtcblxuICAgICAgaWYgKCFncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIFJvdyBEZXRhaWwgVmlldyByZXF1aXJlcyBvcHRpb25zIHRvIGJlIHBhc3NlZCB2aWEgdGhlIFwicm93RGV0YWlsVmlld1wiIHByb3BlcnR5IG9mIHRoZSBHcmlkIE9wdGlvbnMnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGdyaWRPcHRpb25zICYmIGdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9leHRlbnNpb24pIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcucHJvY2VzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byBrZWVwIHRoZSB1c2VyIFwicHJvY2Vzc1wiIG1ldGhvZCBhbmQgcmVwbGFjZSBpdCB3aXRoIG91ciBvd24gZXhlY3V0aW9uIG1ldGhvZFxuICAgICAgICAgICAgLy8gd2UgZG8gdGhpcyBiZWNhdXNlIHdoZW4gd2UgZ2V0IHRoZSBpdGVtIGRldGFpbCwgd2UgbmVlZCB0byBjYWxsIFwib25Bc3luY1Jlc3BvbnNlLm5vdGlmeVwiIGZvciB0aGUgcGx1Z2luIHRvIHdvcmtcbiAgICAgICAgICAgIHRoaXMuX3VzZXJQcm9jZXNzRm4gPSBncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3LnByb2Nlc3M7ICAgICAgICAgICAgICAgIC8vIGtlZXAgdXNlcidzIHByb2Nlc3MgbWV0aG9kXG4gICAgICAgICAgICBncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3LnByb2Nlc3MgPSAoaXRlbSkgPT4gdGhpcy5vblByb2Nlc3NpbmcoaXRlbSk7ICAvLyByZXBsYWNlIHByb2Nlc3MgbWV0aG9kICYgcnVuIG91ciBpbnRlcm5hbCBvbmVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbmVlZCB0byBwcm92aWRlIGEgXCJwcm9jZXNzXCIgZnVuY3Rpb24gZm9yIHRoZSBSb3cgRGV0YWlsIEV4dGVuc2lvbiB0byB3b3JrIHByb3Blcmx5Jyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gbG9hZCB0aGUgUHJlbG9hZCAmIFJvd0RldGFpbCBUZW1wbGF0ZXMgKGNvdWxkIGJlIHN0cmFpZ2h0IEhUTUwgb3IgQW5ndWxhciBWaWV3L1ZpZXdNb2RlbClcbiAgICAgICAgICAvLyB3aGVuIHRob3NlIGFyZSBBbmd1bGFyIFZpZXcvVmlld01vZGVsLCB3ZSBuZWVkIHRvIGNyZWF0ZSBWaWV3IENvbXBvbmVudCAmIHByb3ZpZGUgdGhlIGh0bWwgY29udGFpbmVycyB0byB0aGUgUGx1Z2luIChwcmVUZW1wbGF0ZS9wb3N0VGVtcGxhdGUgbWV0aG9kcylcbiAgICAgICAgICBpZiAoIWdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcucHJlVGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZWxvYWRDb21wb25lbnQgPSBncmlkT3B0aW9ucyAmJiBncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3ICYmIGdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcucHJlbG9hZENvbXBvbmVudDtcbiAgICAgICAgICAgIGdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcucHJlVGVtcGxhdGUgPSAoKSA9PiBET01QdXJpZnkuc2FuaXRpemUoYDxkaXYgY2xhc3M9XCIke1BSRUxPQURfQ09OVEFJTkVSX1BSRUZJWH1cIj48L2Rpdj5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3LnBvc3RUZW1wbGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fdmlld0NvbXBvbmVudCA9IGdyaWRPcHRpb25zICYmIGdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcgJiYgZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy52aWV3Q29tcG9uZW50O1xuICAgICAgICAgICAgZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5wb3N0VGVtcGxhdGUgPSAoaXRlbURldGFpbDogYW55KSA9PiBET01QdXJpZnkuc2FuaXRpemUoYDxkaXYgY2xhc3M9XCIke1JPV19ERVRBSUxfQ09OVEFJTkVSX1BSRUZJWH0ke2l0ZW1EZXRhaWwuaWR9XCI+PC9kaXY+YCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gZmluYWxseSByZWdpc3RlciB0aGUgUm93IERldGFpbCBWaWV3IFBsdWdpblxuICAgICAgICAgIHRoaXMuX2V4dGVuc2lvbiA9IG5ldyBTbGljay5QbHVnaW5zLlJvd0RldGFpbFZpZXcoZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uQ29sdW1uOiBDb2x1bW4gPSB0aGlzLl9leHRlbnNpb24uZ2V0Q29sdW1uRGVmaW5pdGlvbigpO1xuICAgICAgICBzZWxlY3Rpb25Db2x1bW4uZXhjbHVkZUZyb21FeHBvcnQgPSB0cnVlO1xuICAgICAgICBzZWxlY3Rpb25Db2x1bW4uZXhjbHVkZUZyb21RdWVyeSA9IHRydWU7XG4gICAgICAgIHNlbGVjdGlvbkNvbHVtbi5leGNsdWRlRnJvbUhlYWRlck1lbnUgPSB0cnVlO1xuICAgICAgICBjb2x1bW5EZWZpbml0aW9ucy51bnNoaWZ0KHNlbGVjdGlvbkNvbHVtbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5fZXh0ZW5zaW9uO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJlZ2lzdGVyKHJvd1NlbGVjdGlvblBsdWdpbj86IGFueSkge1xuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zKSB7XG4gICAgICAvLyB0aGUgcGx1Z2luIGhhcyB0byBiZSBjcmVhdGVkIEJFRk9SRSB0aGUgZ3JpZCAoZWxzZSBpdCBiZWhhdmVzIG9kZGx5KSwgYnV0IHdlIGNhbiBvbmx5IHdhdGNoIGdyaWQgZXZlbnRzIEFGVEVSIHRoZSBncmlkIGlzIGNyZWF0ZWRcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHRoaXMuX2V4dGVuc2lvbik7XG5cbiAgICAgIC8vIHRoaXMgYWxzbyByZXF1aXJlcyB0aGUgUm93IFNlbGVjdGlvbiBNb2RlbCB0byBiZSByZWdpc3RlcmVkIGFzIHdlbGxcbiAgICAgIGlmICghcm93U2VsZWN0aW9uUGx1Z2luIHx8ICF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRTZWxlY3Rpb25Nb2RlbCgpKSB7XG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5sb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoRXh0ZW5zaW9uTmFtZS5yb3dTZWxlY3Rpb24pO1xuICAgICAgICByb3dTZWxlY3Rpb25QbHVnaW4gPSBuZXcgU2xpY2suUm93U2VsZWN0aW9uTW9kZWwodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd1NlbGVjdGlvbk9wdGlvbnMgfHwgeyBzZWxlY3RBY3RpdmVSb3c6IHRydWUgfSk7XG4gICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldFNlbGVjdGlvbk1vZGVsKHJvd1NlbGVjdGlvblBsdWdpbik7XG4gICAgICB9XG5cbiAgICAgIC8vIHRoaXMuX2V4dGVuc2lvbiA9IHRoaXMuY3JlYXRlKHRoaXMuc2hhcmVkU2VydmljZS5hbGxDb2x1bW5zLCB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMpO1xuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQucmVnaXN0ZXJQbHVnaW4odGhpcy5fZXh0ZW5zaW9uKTtcblxuICAgICAgLy8gaG9vayBhbGwgZXZlbnRzXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3Lm9uRXh0ZW5zaW9uUmVnaXN0ZXJlZCkge1xuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3Lm9uRXh0ZW5zaW9uUmVnaXN0ZXJlZCh0aGlzLl9leHRlbnNpb24pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fZXh0ZW5zaW9uLm9uQXN5bmNSZXNwb25zZSwgKGU6IGFueSwgYXJnczogeyBpdGVtOiBhbnk7IGRldGFpbFZpZXc6IGFueSB9KSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3ICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5vbkFzeW5jUmVzcG9uc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3Lm9uQXN5bmNSZXNwb25zZShlLCBhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2V4dGVuc2lvbi5vbkFzeW5jRW5kVXBkYXRlLCAoZTogYW55LCBhcmdzOiB7IGdyaWQ6IGFueTsgaXRlbTogYW55OyB9KSA9PiB7XG4gICAgICAgICAgLy8gdHJpZ2dlcnMgYWZ0ZXIgYmFja2VuZCBjYWxsZWQgXCJvbkFzeW5jUmVzcG9uc2Uubm90aWZ5KClcIlxuICAgICAgICAgIHRoaXMucmVuZGVyVmlld01vZGVsKGFyZ3MgJiYgYXJncy5pdGVtKTtcblxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldyAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcub25Bc3luY0VuZFVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcub25Bc3luY0VuZFVwZGF0ZShlLCBhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2V4dGVuc2lvbi5vbkFmdGVyUm93RGV0YWlsVG9nZ2xlLCAoZTogYW55LCBhcmdzOiB7IGdyaWQ6IGFueTsgaXRlbTogYW55OyBleHBhbmRlZFJvd3M6IGFueVtdOyB9KSA9PiB7XG4gICAgICAgICAgLy8gZGlzcGxheSBwcmVsb2FkIHRlbXBsYXRlICYgcmUtcmVuZGVyIGFsbCB0aGUgb3RoZXIgRGV0YWlsIFZpZXdzIGFmdGVyIHRvZ2dsaW5nXG4gICAgICAgICAgLy8gdGhlIHByZWxvYWQgVmlldyB3aWxsIGV2ZW50dWFsbHkgZ28gYXdheSBvbmNlIHRoZSBkYXRhIGdldHMgbG9hZGVkIGFmdGVyIHRoZSBcIm9uQXN5bmNFbmRVcGRhdGVcIiBldmVudFxuICAgICAgICAgIHRoaXMucmVuZGVyUHJlbG9hZFZpZXcoKTtcbiAgICAgICAgICB0aGlzLnJlbmRlckFsbFZpZXdDb21wb25lbnRzKCk7XG5cbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3Lm9uQWZ0ZXJSb3dEZXRhaWxUb2dnbGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3Lm9uQWZ0ZXJSb3dEZXRhaWxUb2dnbGUoZSwgYXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLl9leHRlbnNpb24ub25CZWZvcmVSb3dEZXRhaWxUb2dnbGUsIChlOiBhbnksIGFyZ3M6IHsgZ3JpZDogYW55OyBpdGVtOiBhbnk7IH0pID0+IHtcbiAgICAgICAgICAvLyBiZWZvcmUgdG9nZ2xpbmcgcm93IGRldGFpbCwgd2UgbmVlZCB0byBjcmVhdGUgVmlldyBDb21wb25lbnQgaWYgaXQgZG9lc24ndCBleGlzdFxuICAgICAgICAgIHRoaXMub25CZWZvcmVSb3dEZXRhaWxUb2dnbGUoZSwgYXJncyk7XG5cbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3Lm9uQmVmb3JlUm93RGV0YWlsVG9nZ2xlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5vbkJlZm9yZVJvd0RldGFpbFRvZ2dsZShlLCBhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2V4dGVuc2lvbi5vblJvd0JhY2tUb1ZpZXdwb3J0UmFuZ2UsIChlOiBhbnksIGFyZ3M6IHsgZ3JpZDogYW55OyBpdGVtOiBhbnk7IHJvd0lkOiBudW1iZXI7IHJvd0luZGV4OiBudW1iZXI7IGV4cGFuZGVkUm93czogYW55W107IHJvd0lkc091dE9mVmlld3BvcnQ6IG51bWJlcltdOyB9KSA9PiB7XG4gICAgICAgICAgLy8gd2hlbiByb3cgaXMgYmFjayB0byB2aWV3cG9ydCByYW5nZSwgd2Ugd2lsbCByZS1yZW5kZXIgdGhlIFZpZXcgQ29tcG9uZW50KHMpXG4gICAgICAgICAgdGhpcy5vblJvd0JhY2tUb1ZpZXdwb3J0UmFuZ2UoZSwgYXJncyk7XG5cbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3Lm9uUm93QmFja1RvVmlld3BvcnRSYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcub25Sb3dCYWNrVG9WaWV3cG9ydFJhbmdlKGUsIGFyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fZXh0ZW5zaW9uLm9uUm93T3V0T2ZWaWV3cG9ydFJhbmdlLCAoZTogYW55LCBhcmdzOiB7IGdyaWQ6IGFueTsgaXRlbTogYW55OyByb3dJZDogbnVtYmVyOyByb3dJbmRleDogbnVtYmVyOyBleHBhbmRlZFJvd3M6IGFueVtdOyByb3dJZHNPdXRPZlZpZXdwb3J0OiBudW1iZXJbXTsgfSkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldyAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcub25Sb3dPdXRPZlZpZXdwb3J0UmFuZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3Lm9uUm93T3V0T2ZWaWV3cG9ydFJhbmdlKGUsIGFyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gLS1cbiAgICAgICAgLy8gaG9vayBzb21lIGV2ZW50cyBuZWVkZWQgYnkgdGhlIFBsdWdpbiBpdHNlbGZcblxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLm9uQ29sdW1uc1Jlb3JkZXJlZCwgKCkgPT4gdGhpcy5yZWRyYXdBbGxWaWV3Q29tcG9uZW50cygpKTtcblxuICAgICAgICAvLyBvbiBzb3J0LCBhbGwgcm93IGRldGFpbCBhcmUgY29sbGFwc2VkIHNvIHdlIGNhbiBkaXNwb3NlIG9mIGFsbCB0aGUgVmlld3MgYXMgd2VsbFxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLm9uU29ydCwgKCkgPT4gdGhpcy5kaXNwb3NlQWxsVmlld0NvbXBvbmVudHMoKSk7XG5cbiAgICAgICAgLy8gb24gZmlsdGVyIGNoYW5nZWQsIHdlIG5lZWQgdG8gcmUtcmVuZGVyIGFsbCBWaWV3c1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgICAgdGhpcy5maWx0ZXJTZXJ2aWNlLm9uRmlsdGVyQ2hhbmdlZC5zdWJzY3JpYmUoKGN1cnJlbnRGaWx0ZXJzOiBDdXJyZW50RmlsdGVyW10pID0+IHRoaXMucmVkcmF3QWxsVmlld0NvbXBvbmVudHMoKSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLl9leHRlbnNpb247XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gLS1cbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgcHJpdmF0ZSBhZGRUb0FycmF5V2hlbk5vdEZvdW5kKGlucHV0QXJyYXk6IGFueVtdLCBpbnB1dE9iajogYW55KSB7XG4gICAgY29uc3QgYXJyYXlSb3dJbmRleCA9IGlucHV0QXJyYXkuZmluZEluZGV4KChvYmopID0+IG9iai5pZCA9PT0gaW5wdXRPYmouaWQpO1xuICAgIGlmIChhcnJheVJvd0luZGV4IDwgMCkge1xuICAgICAgaW5wdXRBcnJheS5wdXNoKGlucHV0T2JqKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRpc3Bvc2VBbGxWaWV3Q29tcG9uZW50cygpIHtcbiAgICB0aGlzLl92aWV3cy5mb3JFYWNoKChjb21wUmVmKSA9PiB0aGlzLmRpc3Bvc2VWaWV3Q29tcG9uZW50KGNvbXBSZWYpKTtcbiAgICB0aGlzLl92aWV3cyA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBkaXNwb3NlVmlld0NvbXBvbmVudChleHBhbmRlZFZpZXc6IENyZWF0ZWRWaWV3KSB7XG4gICAgY29uc3QgY29tcFJlZiA9IGV4cGFuZGVkVmlldyAmJiBleHBhbmRlZFZpZXcuY29tcG9uZW50UmVmO1xuICAgIGlmIChjb21wUmVmKSB7XG4gICAgICB0aGlzLmFwcFJlZi5kZXRhY2hWaWV3KGNvbXBSZWYuaG9zdFZpZXcpO1xuICAgICAgY29tcFJlZi5kZXN0cm95KCk7XG4gICAgICByZXR1cm4gZXhwYW5kZWRWaWV3O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBub3RpZnkgdGhlIG9uQXN5bmNSZXNwb25zZSB3aXRoIHRoZSBcImFyZ3MuaXRlbVwiIChyZXF1aXJlZCBwcm9wZXJ0eSlcbiAgICogdGhlIHBsdWdpbiB3aWxsIHRoZW4gdXNlIGl0ZW0gdG8gcG9wdWxhdGUgdGhlIHJvdyBkZXRhaWwgcGFuZWwgd2l0aCB0aGUgXCJwb3N0VGVtcGxhdGVcIlxuICAgKiBAcGFyYW0gaXRlbVxuICAgKi9cbiAgcHJpdmF0ZSBub3RpZnlUZW1wbGF0ZShpdGVtOiBhbnkpIHtcbiAgICBpZiAodGhpcy5fZXh0ZW5zaW9uKSB7XG4gICAgICB0aGlzLl9leHRlbnNpb24ub25Bc3luY1Jlc3BvbnNlLm5vdGlmeSh7IGl0ZW0gfSwgdW5kZWZpbmVkLCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT24gUHJvY2Vzc2luZywgd2Ugd2lsbCBub3RpZnkgdGhlIHBsdWdpbiB3aXRoIHRoZSBuZXcgaXRlbSBkZXRhaWwgb25jZSBiYWNrZW5kIHNlcnZlciBjYWxsIGNvbXBsZXRlc1xuICAgKiBAcGFyYW0gaXRlbVxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBvblByb2Nlc3NpbmcoaXRlbTogYW55KSB7XG4gICAgaWYgKGl0ZW0gJiYgdHlwZW9mIHRoaXMuX3VzZXJQcm9jZXNzRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnN0IHVzZXJQcm9jZXNzRm4gPSB0aGlzLl91c2VyUHJvY2Vzc0ZuKGl0ZW0pO1xuXG4gICAgICAvLyB3YWl0IGZvciB0aGUgXCJ1c2VyUHJvY2Vzc0ZuXCIsIG9uY2UgcmVzb2x2ZWQgd2Ugd2lsbCBzYXZlIGl0IGludG8gdGhlIFwiY29sbGVjdGlvblwiXG4gICAgICBjb25zdCByZXNwb25zZTogYW55IHwgYW55W10gPSBhd2FpdCB1c2VyUHJvY2Vzc0ZuO1xuICAgICAgbGV0IGF3YWl0ZWRJdGVtRGV0YWlsOiBhbnk7XG5cbiAgICAgIGlmIChyZXNwb25zZS5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xuICAgICAgICBhd2FpdGVkSXRlbURldGFpbCA9IHJlc3BvbnNlOyAvLyBmcm9tIFByb21pc2VcbiAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UgaW5zdGFuY2VvZiBSZXNwb25zZSAmJiB0eXBlb2YgcmVzcG9uc2VbJ2pzb24nXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBhd2FpdGVkSXRlbURldGFpbCA9IGF3YWl0IHJlc3BvbnNlWydqc29uJ10oKTsgLy8gZnJvbSBGZXRjaFxuICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSAmJiByZXNwb25zZVsnY29udGVudCddKSB7XG4gICAgICAgIGF3YWl0ZWRJdGVtRGV0YWlsID0gcmVzcG9uc2VbJ2NvbnRlbnQnXTsgLy8gZnJvbSBBbmd1bGFyLWh0dHAtY2xpZW50XG4gICAgICB9XG5cbiAgICAgIC8vIG5vdGlmeSB0aGUgcGx1Z2luIHdpdGggdGhlIG5ldyBpdGVtIGRldGFpbHNcbiAgICAgIHRoaXMubm90aWZ5VGVtcGxhdGUoYXdhaXRlZEl0ZW1EZXRhaWwgfHwge30pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBSZWRyYXcgKHJlLXJlbmRlcikgYWxsIHRoZSBleHBhbmRlZCByb3cgZGV0YWlsIFZpZXcgQ29tcG9uZW50cyAqL1xuICBwcml2YXRlIHJlZHJhd0FsbFZpZXdDb21wb25lbnRzKCkge1xuICAgIHRoaXMuX3ZpZXdzLmZvckVhY2goKGNvbXBSZWYpID0+IHtcbiAgICAgIHRoaXMucmVkcmF3Vmlld0NvbXBvbmVudChjb21wUmVmKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBSZW5kZXIgYWxsIHRoZSBleHBhbmRlZCByb3cgZGV0YWlsIFZpZXcgQ29tcG9uZW50cyAqL1xuICBwcml2YXRlIHJlbmRlckFsbFZpZXdDb21wb25lbnRzKCkge1xuICAgIHRoaXMuX3ZpZXdzLmZvckVhY2goKHZpZXcpID0+IHtcbiAgICAgIGlmICh2aWV3ICYmIHZpZXcuZGF0YUNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJWaWV3TW9kZWwodmlldy5kYXRhQ29udGV4dCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSnVzdCBiZWZvcmUgdGhlIHJvdyBnZXQgZXhwYW5kZWQgb3IgY29sbGFwc2VkIHdlIHdpbGwgZG8gdGhlIGZvbGxvd2luZ1xuICAgKiBGaXJzdCBkZXRlcm1pbmUgaWYgdGhlIHJvdyBpcyBleHBhbmRpbmcgb3IgY29sbGFwc2luZyxcbiAgICogaWYgaXQncyBleHBhbmRpbmcgd2Ugd2lsbCBhZGQgaXQgdG8gb3VyIFZpZXcgQ29tcG9uZW50cyByZWZlcmVuY2UgYXJyYXkgaWYgd2UgZG9uJ3QgYWxyZWFkeSBoYXZlIGl0XG4gICAqIG9yIGlmIGl0J3MgY29sbGFwc2luZyB3ZSB3aWxsIHJlbW92ZSBpdCBmcm9tIG91ciBWaWV3IENvbXBvbmVudHMgcmVmZXJlbmNlIGFycmF5XG4gICAqL1xuICBwcml2YXRlIG9uQmVmb3JlUm93RGV0YWlsVG9nZ2xlKGU6IEV2ZW50LCBhcmdzOiB7IGdyaWQ6IGFueTsgaXRlbTogYW55OyB9KSB7XG4gICAgLy8gZXhwYW5kaW5nXG4gICAgaWYgKGFyZ3MgJiYgYXJncy5pdGVtICYmIGFyZ3MuaXRlbS5fX2NvbGxhcHNlZCkge1xuICAgICAgLy8gZXhwYW5kaW5nIHJvdyBkZXRhaWxcbiAgICAgIGlmIChhcmdzICYmIGFyZ3MuaXRlbSkge1xuICAgICAgICBjb25zdCB2aWV3SW5mbzogQ3JlYXRlZFZpZXcgPSB7XG4gICAgICAgICAgaWQ6IGFyZ3MuaXRlbS5pZCxcbiAgICAgICAgICBkYXRhQ29udGV4dDogYXJncy5pdGVtXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWRkVG9BcnJheVdoZW5Ob3RGb3VuZCh0aGlzLl92aWV3cywgdmlld0luZm8pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjb2xsYXBzaW5nLCBzbyBkaXNwb3NlIG9mIHRoZSBWaWV3L0NvbXBvbmVudFxuICAgICAgY29uc3QgZm91bmRWaWV3SW5kZXggPSB0aGlzLl92aWV3cy5maW5kSW5kZXgoKHZpZXc6IENyZWF0ZWRWaWV3KSA9PiB2aWV3LmlkID09PSBhcmdzLml0ZW0uaWQpO1xuICAgICAgaWYgKGZvdW5kVmlld0luZGV4ID49IDApIHtcbiAgICAgICAgaWYgKHRoaXMuX3ZpZXdzLmhhc093blByb3BlcnR5KGZvdW5kVmlld0luZGV4KSkge1xuICAgICAgICAgIGNvbnN0IGNvbXBSZWYgPSB0aGlzLl92aWV3c1tmb3VuZFZpZXdJbmRleF0uY29tcG9uZW50UmVmO1xuICAgICAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcoY29tcFJlZi5ob3N0Vmlldyk7XG4gICAgICAgICAgY29tcFJlZi5kZXN0cm95KCk7XG4gICAgICAgICAgdGhpcy5fdmlld3Muc3BsaWNlKGZvdW5kVmlld0luZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBXaGVuIFJvdyBjb21lcyBiYWNrIHRvIFZpZXdwb3J0IFJhbmdlLCB3ZSBuZWVkIHRvIHJlZHJhdyB0aGUgVmlldyAqL1xuICBwcml2YXRlIG9uUm93QmFja1RvVmlld3BvcnRSYW5nZShlOiBFdmVudCwgYXJnczogeyBncmlkOiBhbnk7IGl0ZW06IGFueTsgcm93SWQ6IG51bWJlcjsgcm93SW5kZXg6IG51bWJlcjsgZXhwYW5kZWRSb3dzOiBhbnlbXTsgcm93SWRzT3V0T2ZWaWV3cG9ydDogbnVtYmVyW107IH0pIHtcbiAgICBpZiAoYXJncyAmJiBhcmdzLml0ZW0pIHtcbiAgICAgIHRoaXMuX3ZpZXdzLmZvckVhY2goKHZpZXcpID0+IHtcbiAgICAgICAgaWYgKHZpZXcuaWQgPT09IGFyZ3MuaXRlbS5pZCkge1xuICAgICAgICAgIHRoaXMucmVkcmF3Vmlld0NvbXBvbmVudCh2aWV3KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFJlZHJhdyB0aGUgbmVjZXNzYXJ5IFZpZXcgQ29tcG9uZW50ICovXG4gIHByaXZhdGUgcmVkcmF3Vmlld0NvbXBvbmVudChjcmVhdGVkVmlldzogQ3JlYXRlZFZpZXcpIHtcbiAgICBjb25zdCBjb250YWluZXJFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7Uk9XX0RFVEFJTF9DT05UQUlORVJfUFJFRklYfSR7Y3JlYXRlZFZpZXcuaWR9YCk7XG4gICAgaWYgKGNvbnRhaW5lckVsZW1lbnRzICYmIGNvbnRhaW5lckVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgdGhpcy5yZW5kZXJWaWV3TW9kZWwoY3JlYXRlZFZpZXcuZGF0YUNvbnRleHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBSZW5kZXIgKG9yIHJlcmVuZGVyKSB0aGUgVmlldyBDb21wb25lbnQgKFJvdyBEZXRhaWwpICovXG4gIHByaXZhdGUgcmVuZGVyUHJlbG9hZFZpZXcoKSB7XG4gICAgY29uc3QgY29udGFpbmVyRWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke1BSRUxPQURfQ09OVEFJTkVSX1BSRUZJWH1gKTtcbiAgICBpZiAoY29udGFpbmVyRWxlbWVudHMgJiYgY29udGFpbmVyRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmFuZ3VsYXJVdGlsU2VydmljZS5jcmVhdGVBbmd1bGFyQ29tcG9uZW50QXBwZW5kVG9Eb20odGhpcy5fcHJlbG9hZENvbXBvbmVudCwgY29udGFpbmVyRWxlbWVudHNbMF0sIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBSZW5kZXIgKG9yIHJlcmVuZGVyKSB0aGUgVmlldyBDb21wb25lbnQgKFJvdyBEZXRhaWwpICovXG4gIHByaXZhdGUgcmVuZGVyVmlld01vZGVsKGl0ZW06IGFueSkge1xuICAgIGNvbnN0IGNvbnRhaW5lckVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHtST1dfREVUQUlMX0NPTlRBSU5FUl9QUkVGSVh9JHtpdGVtLmlkfWApO1xuICAgIGlmIChjb250YWluZXJFbGVtZW50cyAmJiBjb250YWluZXJFbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudE91dHB1dCA9IHRoaXMuYW5ndWxhclV0aWxTZXJ2aWNlLmNyZWF0ZUFuZ3VsYXJDb21wb25lbnRBcHBlbmRUb0RvbSh0aGlzLl92aWV3Q29tcG9uZW50LCBjb250YWluZXJFbGVtZW50c1swXSwgdHJ1ZSk7XG4gICAgICBpZiAoY29tcG9uZW50T3V0cHV0ICYmIGNvbXBvbmVudE91dHB1dC5jb21wb25lbnRSZWYgJiYgY29tcG9uZW50T3V0cHV0LmNvbXBvbmVudFJlZi5pbnN0YW5jZSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGNvbXBvbmVudE91dHB1dC5jb21wb25lbnRSZWYuaW5zdGFuY2UsIHsgbW9kZWw6IGl0ZW0gfSk7XG5cbiAgICAgICAgY29uc3Qgdmlld09iaiA9IHRoaXMuX3ZpZXdzLmZpbmQoKG9iaikgPT4gb2JqLmlkID09PSBpdGVtLmlkKTtcbiAgICAgICAgaWYgKHZpZXdPYmopIHtcbiAgICAgICAgICB2aWV3T2JqLmNvbXBvbmVudFJlZiA9IGNvbXBvbmVudE91dHB1dC5jb21wb25lbnRSZWY7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==