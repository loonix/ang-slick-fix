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
var DOMPurify = DOMPurify_;
/** @type {?} */
var ROW_DETAIL_CONTAINER_PREFIX = 'container_';
/** @type {?} */
var PRELOAD_CONTAINER_PREFIX = 'container_loading';
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
var RowDetailViewExtension = /** @class */ (function () {
    function RowDetailViewExtension(angularUtilService, appRef, extensionUtility, filterService, sharedService) {
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
    RowDetailViewExtension.prototype.dispose = /**
     * @return {?}
     */
    function () {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
        // also unsubscribe all RxJS subscriptions
        this._subscriptions = unsubscribeAllObservables(this._subscriptions);
        this.disposeAllViewComponents();
    };
    /**
     * Create the plugin before the Grid creation, else it will behave oddly.
     * Mostly because the column definitions might change after the grid creation
     */
    /**
     * Create the plugin before the Grid creation, else it will behave oddly.
     * Mostly because the column definitions might change after the grid creation
     * @param {?} columnDefinitions
     * @param {?} gridOptions
     * @return {?}
     */
    RowDetailViewExtension.prototype.create = /**
     * Create the plugin before the Grid creation, else it will behave oddly.
     * Mostly because the column definitions might change after the grid creation
     * @param {?} columnDefinitions
     * @param {?} gridOptions
     * @return {?}
     */
    function (columnDefinitions, gridOptions) {
        var _this = this;
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
                        function (item) { return _this.onProcessing(item); }); // replace process method & run our internal one
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
                        function () { return DOMPurify.sanitize("<div class=\"" + PRELOAD_CONTAINER_PREFIX + "\"></div>"); });
                    }
                    if (!gridOptions.rowDetailView.postTemplate) {
                        this._viewComponent = gridOptions && gridOptions.rowDetailView && gridOptions.rowDetailView.viewComponent;
                        gridOptions.rowDetailView.postTemplate = (/**
                         * @param {?} itemDetail
                         * @return {?}
                         */
                        function (itemDetail) { return DOMPurify.sanitize("<div class=\"" + ROW_DETAIL_CONTAINER_PREFIX + itemDetail.id + "\"></div>"); });
                    }
                    // finally register the Row Detail View Plugin
                    this._extension = new Slick.Plugins.RowDetailView(gridOptions.rowDetailView);
                }
                /** @type {?} */
                var selectionColumn = this._extension.getColumnDefinition();
                selectionColumn.excludeFromExport = true;
                selectionColumn.excludeFromQuery = true;
                selectionColumn.excludeFromHeaderMenu = true;
                columnDefinitions.unshift(selectionColumn);
            }
            return this._extension;
        }
        return null;
    };
    /**
     * @param {?=} rowSelectionPlugin
     * @return {?}
     */
    RowDetailViewExtension.prototype.register = /**
     * @param {?=} rowSelectionPlugin
     * @return {?}
     */
    function (rowSelectionPlugin) {
        var _this = this;
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
                function (e, args) {
                    if (_this.sharedService.gridOptions.rowDetailView && typeof _this.sharedService.gridOptions.rowDetailView.onAsyncResponse === 'function') {
                        _this.sharedService.gridOptions.rowDetailView.onAsyncResponse(e, args);
                    }
                }));
                this._eventHandler.subscribe(this._extension.onAsyncEndUpdate, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                function (e, args) {
                    // triggers after backend called "onAsyncResponse.notify()"
                    _this.renderViewModel(args && args.item);
                    if (_this.sharedService.gridOptions.rowDetailView && typeof _this.sharedService.gridOptions.rowDetailView.onAsyncEndUpdate === 'function') {
                        _this.sharedService.gridOptions.rowDetailView.onAsyncEndUpdate(e, args);
                    }
                }));
                this._eventHandler.subscribe(this._extension.onAfterRowDetailToggle, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                function (e, args) {
                    // display preload template & re-render all the other Detail Views after toggling
                    // the preload View will eventually go away once the data gets loaded after the "onAsyncEndUpdate" event
                    _this.renderPreloadView();
                    _this.renderAllViewComponents();
                    if (_this.sharedService.gridOptions.rowDetailView && typeof _this.sharedService.gridOptions.rowDetailView.onAfterRowDetailToggle === 'function') {
                        _this.sharedService.gridOptions.rowDetailView.onAfterRowDetailToggle(e, args);
                    }
                }));
                this._eventHandler.subscribe(this._extension.onBeforeRowDetailToggle, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                function (e, args) {
                    // before toggling row detail, we need to create View Component if it doesn't exist
                    _this.onBeforeRowDetailToggle(e, args);
                    if (_this.sharedService.gridOptions.rowDetailView && typeof _this.sharedService.gridOptions.rowDetailView.onBeforeRowDetailToggle === 'function') {
                        _this.sharedService.gridOptions.rowDetailView.onBeforeRowDetailToggle(e, args);
                    }
                }));
                this._eventHandler.subscribe(this._extension.onRowBackToViewportRange, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                function (e, args) {
                    // when row is back to viewport range, we will re-render the View Component(s)
                    _this.onRowBackToViewportRange(e, args);
                    if (_this.sharedService.gridOptions.rowDetailView && typeof _this.sharedService.gridOptions.rowDetailView.onRowBackToViewportRange === 'function') {
                        _this.sharedService.gridOptions.rowDetailView.onRowBackToViewportRange(e, args);
                    }
                }));
                this._eventHandler.subscribe(this._extension.onRowOutOfViewportRange, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                function (e, args) {
                    if (_this.sharedService.gridOptions.rowDetailView && typeof _this.sharedService.gridOptions.rowDetailView.onRowOutOfViewportRange === 'function') {
                        _this.sharedService.gridOptions.rowDetailView.onRowOutOfViewportRange(e, args);
                    }
                }));
                // --
                // hook some events needed by the Plugin itself
                this._eventHandler.subscribe(this.sharedService.grid.onColumnsReordered, (/**
                 * @return {?}
                 */
                function () { return _this.redrawAllViewComponents(); }));
                // on sort, all row detail are collapsed so we can dispose of all the Views as well
                this._eventHandler.subscribe(this.sharedService.grid.onSort, (/**
                 * @return {?}
                 */
                function () { return _this.disposeAllViewComponents(); }));
                // on filter changed, we need to re-render all Views
                this._subscriptions.push(this.filterService.onFilterChanged.subscribe((/**
                 * @param {?} currentFilters
                 * @return {?}
                 */
                function (currentFilters) { return _this.redrawAllViewComponents(); })));
            }
            return this._extension;
        }
        return null;
    };
    // --
    // private functions
    // ------------------
    // --
    // private functions
    // ------------------
    /**
     * @private
     * @param {?} inputArray
     * @param {?} inputObj
     * @return {?}
     */
    RowDetailViewExtension.prototype.addToArrayWhenNotFound = 
    // --
    // private functions
    // ------------------
    /**
     * @private
     * @param {?} inputArray
     * @param {?} inputObj
     * @return {?}
     */
    function (inputArray, inputObj) {
        /** @type {?} */
        var arrayRowIndex = inputArray.findIndex((/**
         * @param {?} obj
         * @return {?}
         */
        function (obj) { return obj.id === inputObj.id; }));
        if (arrayRowIndex < 0) {
            inputArray.push(inputObj);
        }
    };
    /**
     * @private
     * @return {?}
     */
    RowDetailViewExtension.prototype.disposeAllViewComponents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._views.forEach((/**
         * @param {?} compRef
         * @return {?}
         */
        function (compRef) { return _this.disposeViewComponent(compRef); }));
        this._views = [];
    };
    /**
     * @private
     * @param {?} expandedView
     * @return {?}
     */
    RowDetailViewExtension.prototype.disposeViewComponent = /**
     * @private
     * @param {?} expandedView
     * @return {?}
     */
    function (expandedView) {
        /** @type {?} */
        var compRef = expandedView && expandedView.componentRef;
        if (compRef) {
            this.appRef.detachView(compRef.hostView);
            compRef.destroy();
            return expandedView;
        }
        return null;
    };
    /**
     * notify the onAsyncResponse with the "args.item" (required property)
     * the plugin will then use item to populate the row detail panel with the "postTemplate"
     * @param item
     */
    /**
     * notify the onAsyncResponse with the "args.item" (required property)
     * the plugin will then use item to populate the row detail panel with the "postTemplate"
     * @private
     * @param {?} item
     * @return {?}
     */
    RowDetailViewExtension.prototype.notifyTemplate = /**
     * notify the onAsyncResponse with the "args.item" (required property)
     * the plugin will then use item to populate the row detail panel with the "postTemplate"
     * @private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this._extension) {
            this._extension.onAsyncResponse.notify({ item: item }, undefined, this);
        }
    };
    /**
     * On Processing, we will notify the plugin with the new item detail once backend server call completes
     * @param item
     */
    /**
     * On Processing, we will notify the plugin with the new item detail once backend server call completes
     * @private
     * @param {?} item
     * @return {?}
     */
    RowDetailViewExtension.prototype.onProcessing = /**
     * On Processing, we will notify the plugin with the new item detail once backend server call completes
     * @private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var userProcessFn, response, awaitedItemDetail;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(item && typeof this._userProcessFn === 'function')) return [3 /*break*/, 6];
                        userProcessFn = this._userProcessFn(item);
                        // wait for the "userProcessFn", once resolved we will save it into the "collection"
                        return [4 /*yield*/, userProcessFn];
                    case 1:
                        response = _a.sent();
                        awaitedItemDetail = void 0;
                        if (!response.hasOwnProperty('id')) return [3 /*break*/, 2];
                        awaitedItemDetail = response; // from Promise
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(response instanceof Response && typeof response['json'] === 'function')) return [3 /*break*/, 4];
                        return [4 /*yield*/, response['json']()];
                    case 3:
                        awaitedItemDetail = _a.sent(); // from Fetch
                        return [3 /*break*/, 5];
                    case 4:
                        if (response && response['content']) {
                            awaitedItemDetail = response['content']; // from Angular-http-client
                        }
                        _a.label = 5;
                    case 5:
                        // notify the plugin with the new item details
                        this.notifyTemplate(awaitedItemDetail || {});
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /** Redraw (re-render) all the expanded row detail View Components */
    /**
     * Redraw (re-render) all the expanded row detail View Components
     * @private
     * @return {?}
     */
    RowDetailViewExtension.prototype.redrawAllViewComponents = /**
     * Redraw (re-render) all the expanded row detail View Components
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._views.forEach((/**
         * @param {?} compRef
         * @return {?}
         */
        function (compRef) {
            _this.redrawViewComponent(compRef);
        }));
    };
    /** Render all the expanded row detail View Components */
    /**
     * Render all the expanded row detail View Components
     * @private
     * @return {?}
     */
    RowDetailViewExtension.prototype.renderAllViewComponents = /**
     * Render all the expanded row detail View Components
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._views.forEach((/**
         * @param {?} view
         * @return {?}
         */
        function (view) {
            if (view && view.dataContext) {
                _this.renderViewModel(view.dataContext);
            }
        }));
    };
    /**
     * Just before the row get expanded or collapsed we will do the following
     * First determine if the row is expanding or collapsing,
     * if it's expanding we will add it to our View Components reference array if we don't already have it
     * or if it's collapsing we will remove it from our View Components reference array
     */
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
    RowDetailViewExtension.prototype.onBeforeRowDetailToggle = /**
     * Just before the row get expanded or collapsed we will do the following
     * First determine if the row is expanding or collapsing,
     * if it's expanding we will add it to our View Components reference array if we don't already have it
     * or if it's collapsing we will remove it from our View Components reference array
     * @private
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    function (e, args) {
        // expanding
        if (args && args.item && args.item.__collapsed) {
            // expanding row detail
            if (args && args.item) {
                /** @type {?} */
                var viewInfo = {
                    id: args.item.id,
                    dataContext: args.item
                };
                this.addToArrayWhenNotFound(this._views, viewInfo);
            }
        }
        else {
            // collapsing, so dispose of the View/Component
            /** @type {?} */
            var foundViewIndex = this._views.findIndex((/**
             * @param {?} view
             * @return {?}
             */
            function (view) { return view.id === args.item.id; }));
            if (foundViewIndex >= 0) {
                if (this._views.hasOwnProperty(foundViewIndex)) {
                    /** @type {?} */
                    var compRef = this._views[foundViewIndex].componentRef;
                    this.appRef.detachView(compRef.hostView);
                    compRef.destroy();
                    this._views.splice(foundViewIndex, 1);
                }
            }
        }
    };
    /** When Row comes back to Viewport Range, we need to redraw the View */
    /**
     * When Row comes back to Viewport Range, we need to redraw the View
     * @private
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    RowDetailViewExtension.prototype.onRowBackToViewportRange = /**
     * When Row comes back to Viewport Range, we need to redraw the View
     * @private
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    function (e, args) {
        var _this = this;
        if (args && args.item) {
            this._views.forEach((/**
             * @param {?} view
             * @return {?}
             */
            function (view) {
                if (view.id === args.item.id) {
                    _this.redrawViewComponent(view);
                }
            }));
        }
    };
    /** Redraw the necessary View Component */
    /**
     * Redraw the necessary View Component
     * @private
     * @param {?} createdView
     * @return {?}
     */
    RowDetailViewExtension.prototype.redrawViewComponent = /**
     * Redraw the necessary View Component
     * @private
     * @param {?} createdView
     * @return {?}
     */
    function (createdView) {
        /** @type {?} */
        var containerElements = document.getElementsByClassName("" + ROW_DETAIL_CONTAINER_PREFIX + createdView.id);
        if (containerElements && containerElements.length) {
            this.renderViewModel(createdView.dataContext);
        }
    };
    /** Render (or rerender) the View Component (Row Detail) */
    /**
     * Render (or rerender) the View Component (Row Detail)
     * @private
     * @return {?}
     */
    RowDetailViewExtension.prototype.renderPreloadView = /**
     * Render (or rerender) the View Component (Row Detail)
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var containerElements = document.getElementsByClassName("" + PRELOAD_CONTAINER_PREFIX);
        if (containerElements && containerElements.length) {
            this.angularUtilService.createAngularComponentAppendToDom(this._preloadComponent, containerElements[0], true);
        }
    };
    /** Render (or rerender) the View Component (Row Detail) */
    /**
     * Render (or rerender) the View Component (Row Detail)
     * @private
     * @param {?} item
     * @return {?}
     */
    RowDetailViewExtension.prototype.renderViewModel = /**
     * Render (or rerender) the View Component (Row Detail)
     * @private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var containerElements = document.getElementsByClassName("" + ROW_DETAIL_CONTAINER_PREFIX + item.id);
        if (containerElements && containerElements.length) {
            /** @type {?} */
            var componentOutput = this.angularUtilService.createAngularComponentAppendToDom(this._viewComponent, containerElements[0], true);
            if (componentOutput && componentOutput.componentRef && componentOutput.componentRef.instance) {
                Object.assign(componentOutput.componentRef.instance, { model: item });
                /** @type {?} */
                var viewObj = this._views.find((/**
                 * @param {?} obj
                 * @return {?}
                 */
                function (obj) { return obj.id === item.id; }));
                if (viewObj) {
                    viewObj.componentRef = componentOutput.componentRef;
                }
            }
        }
    };
    RowDetailViewExtension.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    RowDetailViewExtension.ctorParameters = function () { return [
        { type: AngularUtilService },
        { type: ApplicationRef },
        { type: ExtensionUtility },
        { type: FilterService },
        { type: SharedService }
    ]; };
    return RowDetailViewExtension;
}());
export { RowDetailViewExtension };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93RGV0YWlsVmlld0V4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9yb3dEZXRhaWxWaWV3RXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBZ0IsVUFBVSxFQUEwQixNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQW9DLGFBQWEsRUFBYyxNQUFNLGlCQUFpQixDQUFDO0FBQzlGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFbEUsT0FBTyxLQUFLLFVBQVUsTUFBTSxXQUFXLENBQUM7O0lBQ2xDLFNBQVMsR0FBRyxVQUFVOztJQUt0QiwyQkFBMkIsR0FBRyxZQUFZOztJQUMxQyx3QkFBd0IsR0FBRyxtQkFBbUI7Ozs7QUFFcEQsaUNBSUM7OztJQUhDLHlCQUFvQjs7SUFDcEIsa0NBQWlCOztJQUNqQixtQ0FBaUM7O0FBR25DO0lBV0UsZ0NBQ1Usa0JBQXNDLEVBQ3RDLE1BQXNCLEVBQ3RCLGdCQUFrQyxFQUNsQyxhQUE0QixFQUM1QixhQUE0QjtRQUo1Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFi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SUFBSSxFQUFFLENBQUMsQ0FBQzs7b0JBRWhFLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7Ozs7Z0JBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxHQUFHLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLEVBQWxCLENBQWtCLEVBQUM7Z0JBQzdELElBQUksT0FBTyxFQUFFO29CQUNYLE9BQU8sQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDLFlBQVksQ0FBQztpQkFDckQ7YUFDRjtTQUNGO0lBQ0gsQ0FBQzs7Z0JBMVRGLFVBQVU7Ozs7Z0JBcEJGLGtCQUFrQjtnQkFIbEIsY0FBYztnQkFFZCxnQkFBZ0I7Z0JBRWhCLGFBQWE7Z0JBQ2IsYUFBYTs7SUE2VXRCLDZCQUFDO0NBQUEsQUEzVEQsSUEyVEM7U0ExVFksc0JBQXNCOzs7SUFDakMsb0RBQXFDOzs7OztJQUNyQywrQ0FBc0Q7Ozs7O0lBQ3RELDRDQUF3Qjs7Ozs7SUFDeEIsbURBQXdDOzs7OztJQUN4Qyx3Q0FBbUM7Ozs7O0lBQ25DLGdEQUFxQzs7Ozs7SUFDckMsZ0RBQTRDOzs7OztJQUM1QyxnREFBb0Q7Ozs7O0lBR2xELG9EQUE4Qzs7Ozs7SUFDOUMsd0NBQThCOzs7OztJQUM5QixrREFBMEM7Ozs7O0lBQzFDLCtDQUFvQzs7Ozs7SUFDcEMsK0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwbGljYXRpb25SZWYsIENvbXBvbmVudFJlZiwgSW5qZWN0YWJsZSwgVHlwZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29sdW1uLCBDdXJyZW50RmlsdGVyLCBFeHRlbnNpb24sIEV4dGVuc2lvbk5hbWUsIEdyaWRPcHRpb24gfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHsgRXh0ZW5zaW9uVXRpbGl0eSB9IGZyb20gJy4vZXh0ZW5zaW9uVXRpbGl0eSc7XG5pbXBvcnQgeyBBbmd1bGFyVXRpbFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hbmd1bGFyVXRpbFNlcnZpY2UnO1xuaW1wb3J0IHsgRmlsdGVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2ZpbHRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XG5pbXBvcnQgeyB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzIH0gZnJvbSAnLi4vc2VydmljZXMvdXRpbGl0aWVzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgRE9NUHVyaWZ5XyBmcm9tICdkb21wdXJpZnknO1xuY29uc3QgRE9NUHVyaWZ5ID0gRE9NUHVyaWZ5XzsgLy8gcGF0Y2ggdG8gZml4IHJvbGx1cCB0byB3b3JrXG5cbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XG5cbmNvbnN0IFJPV19ERVRBSUxfQ09OVEFJTkVSX1BSRUZJWCA9ICdjb250YWluZXJfJztcbmNvbnN0IFBSRUxPQURfQ09OVEFJTkVSX1BSRUZJWCA9ICdjb250YWluZXJfbG9hZGluZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3JlYXRlZFZpZXcge1xuICBpZDogc3RyaW5nIHwgbnVtYmVyO1xuICBkYXRhQ29udGV4dDogYW55O1xuICBjb21wb25lbnRSZWY/OiBDb21wb25lbnRSZWY8YW55Pjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJvd0RldGFpbFZpZXdFeHRlbnNpb24gaW1wbGVtZW50cyBFeHRlbnNpb24ge1xuICByb3dEZXRhaWxDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG4gIHByaXZhdGUgX2V2ZW50SGFuZGxlcjogYW55ID0gbmV3IFNsaWNrLkV2ZW50SGFuZGxlcigpO1xuICBwcml2YXRlIF9leHRlbnNpb246IGFueTtcbiAgcHJpdmF0ZSBfcHJlbG9hZENvbXBvbmVudDogVHlwZTxvYmplY3Q+O1xuICBwcml2YXRlIF92aWV3czogQ3JlYXRlZFZpZXdbXSA9IFtdO1xuICBwcml2YXRlIF92aWV3Q29tcG9uZW50OiBUeXBlPG9iamVjdD47XG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHByaXZhdGUgX3VzZXJQcm9jZXNzRm46IChpdGVtOiBhbnkpID0+IFByb21pc2U8YW55PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFuZ3VsYXJVdGlsU2VydmljZTogQW5ndWxhclV0aWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICBwcml2YXRlIGV4dGVuc2lvblV0aWxpdHk6IEV4dGVuc2lvblV0aWxpdHksXG4gICAgcHJpdmF0ZSBmaWx0ZXJTZXJ2aWNlOiBGaWx0ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSxcbiAgKSB7IH1cblxuICBkaXNwb3NlKCkge1xuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCBTbGlja0dyaWQgZXZlbnRzXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnVuc3Vic2NyaWJlQWxsKCk7XG5cbiAgICBpZiAodGhpcy5fZXh0ZW5zaW9uICYmIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KSB7XG4gICAgICB0aGlzLl9leHRlbnNpb24uZGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8vIGFsc28gdW5zdWJzY3JpYmUgYWxsIFJ4SlMgc3Vic2NyaXB0aW9uc1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzKHRoaXMuX3N1YnNjcmlwdGlvbnMpO1xuICAgIHRoaXMuZGlzcG9zZUFsbFZpZXdDb21wb25lbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIHRoZSBwbHVnaW4gYmVmb3JlIHRoZSBHcmlkIGNyZWF0aW9uLCBlbHNlIGl0IHdpbGwgYmVoYXZlIG9kZGx5LlxuICAgKiBNb3N0bHkgYmVjYXVzZSB0aGUgY29sdW1uIGRlZmluaXRpb25zIG1pZ2h0IGNoYW5nZSBhZnRlciB0aGUgZ3JpZCBjcmVhdGlvblxuICAgKi9cbiAgY3JlYXRlKGNvbHVtbkRlZmluaXRpb25zOiBDb2x1bW5bXSwgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24pIHtcbiAgICBpZiAoY29sdW1uRGVmaW5pdGlvbnMgJiYgZ3JpZE9wdGlvbnMpIHtcbiAgICAgIC8vIGR5bmFtaWNhbGx5IGltcG9ydCB0aGUgU2xpY2tHcmlkIHBsdWdpbiB3aXRoIHJlcXVpcmVKU1xuICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LmxvYWRFeHRlbnNpb25EeW5hbWljYWxseShFeHRlbnNpb25OYW1lLnJvd0RldGFpbFZpZXcpO1xuXG4gICAgICBpZiAoIWdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgUm93IERldGFpbCBWaWV3IHJlcXVpcmVzIG9wdGlvbnMgdG8gYmUgcGFzc2VkIHZpYSB0aGUgXCJyb3dEZXRhaWxWaWV3XCIgcHJvcGVydHkgb2YgdGhlIEdyaWQgT3B0aW9ucycpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZ3JpZE9wdGlvbnMgJiYgZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldykge1xuICAgICAgICBpZiAoIXRoaXMuX2V4dGVuc2lvbikge1xuICAgICAgICAgIGlmICh0eXBlb2YgZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5wcm9jZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIGtlZXAgdGhlIHVzZXIgXCJwcm9jZXNzXCIgbWV0aG9kIGFuZCByZXBsYWNlIGl0IHdpdGggb3VyIG93biBleGVjdXRpb24gbWV0aG9kXG4gICAgICAgICAgICAvLyB3ZSBkbyB0aGlzIGJlY2F1c2Ugd2hlbiB3ZSBnZXQgdGhlIGl0ZW0gZGV0YWlsLCB3ZSBuZWVkIHRvIGNhbGwgXCJvbkFzeW5jUmVzcG9uc2Uubm90aWZ5XCIgZm9yIHRoZSBwbHVnaW4gdG8gd29ya1xuICAgICAgICAgICAgdGhpcy5fdXNlclByb2Nlc3NGbiA9IGdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcucHJvY2VzczsgICAgICAgICAgICAgICAgLy8ga2VlcCB1c2VyJ3MgcHJvY2VzcyBtZXRob2RcbiAgICAgICAgICAgIGdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcucHJvY2VzcyA9IChpdGVtKSA9PiB0aGlzLm9uUHJvY2Vzc2luZyhpdGVtKTsgIC8vIHJlcGxhY2UgcHJvY2VzcyBtZXRob2QgJiBydW4gb3VyIGludGVybmFsIG9uZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBuZWVkIHRvIHByb3ZpZGUgYSBcInByb2Nlc3NcIiBmdW5jdGlvbiBmb3IgdGhlIFJvdyBEZXRhaWwgRXh0ZW5zaW9uIHRvIHdvcmsgcHJvcGVybHknKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBsb2FkIHRoZSBQcmVsb2FkICYgUm93RGV0YWlsIFRlbXBsYXRlcyAoY291bGQgYmUgc3RyYWlnaHQgSFRNTCBvciBBbmd1bGFyIFZpZXcvVmlld01vZGVsKVxuICAgICAgICAgIC8vIHdoZW4gdGhvc2UgYXJlIEFuZ3VsYXIgVmlldy9WaWV3TW9kZWwsIHdlIG5lZWQgdG8gY3JlYXRlIFZpZXcgQ29tcG9uZW50ICYgcHJvdmlkZSB0aGUgaHRtbCBjb250YWluZXJzIHRvIHRoZSBQbHVnaW4gKHByZVRlbXBsYXRlL3Bvc3RUZW1wbGF0ZSBtZXRob2RzKVxuICAgICAgICAgIGlmICghZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5wcmVUZW1wbGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fcHJlbG9hZENvbXBvbmVudCA9IGdyaWRPcHRpb25zICYmIGdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcgJiYgZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5wcmVsb2FkQ29tcG9uZW50O1xuICAgICAgICAgICAgZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5wcmVUZW1wbGF0ZSA9ICgpID0+IERPTVB1cmlmeS5zYW5pdGl6ZShgPGRpdiBjbGFzcz1cIiR7UFJFTE9BRF9DT05UQUlORVJfUFJFRklYfVwiPjwvZGl2PmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcucG9zdFRlbXBsYXRlKSB7XG4gICAgICAgICAgICB0aGlzLl92aWV3Q29tcG9uZW50ID0gZ3JpZE9wdGlvbnMgJiYgZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldyAmJiBncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3LnZpZXdDb21wb25lbnQ7XG4gICAgICAgICAgICBncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3LnBvc3RUZW1wbGF0ZSA9IChpdGVtRGV0YWlsOiBhbnkpID0+IERPTVB1cmlmeS5zYW5pdGl6ZShgPGRpdiBjbGFzcz1cIiR7Uk9XX0RFVEFJTF9DT05UQUlORVJfUFJFRklYfSR7aXRlbURldGFpbC5pZH1cIj48L2Rpdj5gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBmaW5hbGx5IHJlZ2lzdGVyIHRoZSBSb3cgRGV0YWlsIFZpZXcgUGx1Z2luXG4gICAgICAgICAgdGhpcy5fZXh0ZW5zaW9uID0gbmV3IFNsaWNrLlBsdWdpbnMuUm93RGV0YWlsVmlldyhncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWxlY3Rpb25Db2x1bW46IENvbHVtbiA9IHRoaXMuX2V4dGVuc2lvbi5nZXRDb2x1bW5EZWZpbml0aW9uKCk7XG4gICAgICAgIHNlbGVjdGlvbkNvbHVtbi5leGNsdWRlRnJvbUV4cG9ydCA9IHRydWU7XG4gICAgICAgIHNlbGVjdGlvbkNvbHVtbi5leGNsdWRlRnJvbVF1ZXJ5ID0gdHJ1ZTtcbiAgICAgICAgc2VsZWN0aW9uQ29sdW1uLmV4Y2x1ZGVGcm9tSGVhZGVyTWVudSA9IHRydWU7XG4gICAgICAgIGNvbHVtbkRlZmluaXRpb25zLnVuc2hpZnQoc2VsZWN0aW9uQ29sdW1uKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLl9leHRlbnNpb247XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmVnaXN0ZXIocm93U2VsZWN0aW9uUGx1Z2luPzogYW55KSB7XG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMpIHtcbiAgICAgIC8vIHRoZSBwbHVnaW4gaGFzIHRvIGJlIGNyZWF0ZWQgQkVGT1JFIHRoZSBncmlkIChlbHNlIGl0IGJlaGF2ZXMgb2RkbHkpLCBidXQgd2UgY2FuIG9ubHkgd2F0Y2ggZ3JpZCBldmVudHMgQUZURVIgdGhlIGdyaWQgaXMgY3JlYXRlZFxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQucmVnaXN0ZXJQbHVnaW4odGhpcy5fZXh0ZW5zaW9uKTtcblxuICAgICAgLy8gdGhpcyBhbHNvIHJlcXVpcmVzIHRoZSBSb3cgU2VsZWN0aW9uIE1vZGVsIHRvIGJlIHJlZ2lzdGVyZWQgYXMgd2VsbFxuICAgICAgaWYgKCFyb3dTZWxlY3Rpb25QbHVnaW4gfHwgIXRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldFNlbGVjdGlvbk1vZGVsKCkpIHtcbiAgICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LmxvYWRFeHRlbnNpb25EeW5hbWljYWxseShFeHRlbnNpb25OYW1lLnJvd1NlbGVjdGlvbik7XG4gICAgICAgIHJvd1NlbGVjdGlvblBsdWdpbiA9IG5ldyBTbGljay5Sb3dTZWxlY3Rpb25Nb2RlbCh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93U2VsZWN0aW9uT3B0aW9ucyB8fCB7IHNlbGVjdEFjdGl2ZVJvdzogdHJ1ZSB9KTtcbiAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0U2VsZWN0aW9uTW9kZWwocm93U2VsZWN0aW9uUGx1Z2luKTtcbiAgICAgIH1cblxuICAgICAgLy8gdGhpcy5fZXh0ZW5zaW9uID0gdGhpcy5jcmVhdGUodGhpcy5zaGFyZWRTZXJ2aWNlLmFsbENvbHVtbnMsIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyk7XG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5yZWdpc3RlclBsdWdpbih0aGlzLl9leHRlbnNpb24pO1xuXG4gICAgICAvLyBob29rIGFsbCBldmVudHNcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldykge1xuICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcub25FeHRlbnNpb25SZWdpc3RlcmVkKSB7XG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcub25FeHRlbnNpb25SZWdpc3RlcmVkKHRoaXMuX2V4dGVuc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLl9leHRlbnNpb24ub25Bc3luY1Jlc3BvbnNlLCAoZTogYW55LCBhcmdzOiB7IGl0ZW06IGFueTsgZGV0YWlsVmlldzogYW55IH0pID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3Lm9uQXN5bmNSZXNwb25zZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcub25Bc3luY1Jlc3BvbnNlKGUsIGFyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fZXh0ZW5zaW9uLm9uQXN5bmNFbmRVcGRhdGUsIChlOiBhbnksIGFyZ3M6IHsgZ3JpZDogYW55OyBpdGVtOiBhbnk7IH0pID0+IHtcbiAgICAgICAgICAvLyB0cmlnZ2VycyBhZnRlciBiYWNrZW5kIGNhbGxlZCBcIm9uQXN5bmNSZXNwb25zZS5ub3RpZnkoKVwiXG4gICAgICAgICAgdGhpcy5yZW5kZXJWaWV3TW9kZWwoYXJncyAmJiBhcmdzLml0ZW0pO1xuXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3ICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5vbkFzeW5jRW5kVXBkYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5vbkFzeW5jRW5kVXBkYXRlKGUsIGFyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fZXh0ZW5zaW9uLm9uQWZ0ZXJSb3dEZXRhaWxUb2dnbGUsIChlOiBhbnksIGFyZ3M6IHsgZ3JpZDogYW55OyBpdGVtOiBhbnk7IGV4cGFuZGVkUm93czogYW55W107IH0pID0+IHtcbiAgICAgICAgICAvLyBkaXNwbGF5IHByZWxvYWQgdGVtcGxhdGUgJiByZS1yZW5kZXIgYWxsIHRoZSBvdGhlciBEZXRhaWwgVmlld3MgYWZ0ZXIgdG9nZ2xpbmdcbiAgICAgICAgICAvLyB0aGUgcHJlbG9hZCBWaWV3IHdpbGwgZXZlbnR1YWxseSBnbyBhd2F5IG9uY2UgdGhlIGRhdGEgZ2V0cyBsb2FkZWQgYWZ0ZXIgdGhlIFwib25Bc3luY0VuZFVwZGF0ZVwiIGV2ZW50XG4gICAgICAgICAgdGhpcy5yZW5kZXJQcmVsb2FkVmlldygpO1xuICAgICAgICAgIHRoaXMucmVuZGVyQWxsVmlld0NvbXBvbmVudHMoKTtcblxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldyAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcub25BZnRlclJvd0RldGFpbFRvZ2dsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcub25BZnRlclJvd0RldGFpbFRvZ2dsZShlLCBhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2V4dGVuc2lvbi5vbkJlZm9yZVJvd0RldGFpbFRvZ2dsZSwgKGU6IGFueSwgYXJnczogeyBncmlkOiBhbnk7IGl0ZW06IGFueTsgfSkgPT4ge1xuICAgICAgICAgIC8vIGJlZm9yZSB0b2dnbGluZyByb3cgZGV0YWlsLCB3ZSBuZWVkIHRvIGNyZWF0ZSBWaWV3IENvbXBvbmVudCBpZiBpdCBkb2Vzbid0IGV4aXN0XG4gICAgICAgICAgdGhpcy5vbkJlZm9yZVJvd0RldGFpbFRvZ2dsZShlLCBhcmdzKTtcblxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldyAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcub25CZWZvcmVSb3dEZXRhaWxUb2dnbGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3Lm9uQmVmb3JlUm93RGV0YWlsVG9nZ2xlKGUsIGFyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fZXh0ZW5zaW9uLm9uUm93QmFja1RvVmlld3BvcnRSYW5nZSwgKGU6IGFueSwgYXJnczogeyBncmlkOiBhbnk7IGl0ZW06IGFueTsgcm93SWQ6IG51bWJlcjsgcm93SW5kZXg6IG51bWJlcjsgZXhwYW5kZWRSb3dzOiBhbnlbXTsgcm93SWRzT3V0T2ZWaWV3cG9ydDogbnVtYmVyW107IH0pID0+IHtcbiAgICAgICAgICAvLyB3aGVuIHJvdyBpcyBiYWNrIHRvIHZpZXdwb3J0IHJhbmdlLCB3ZSB3aWxsIHJlLXJlbmRlciB0aGUgVmlldyBDb21wb25lbnQocylcbiAgICAgICAgICB0aGlzLm9uUm93QmFja1RvVmlld3BvcnRSYW5nZShlLCBhcmdzKTtcblxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldyAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcub25Sb3dCYWNrVG9WaWV3cG9ydFJhbmdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5vblJvd0JhY2tUb1ZpZXdwb3J0UmFuZ2UoZSwgYXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLl9leHRlbnNpb24ub25Sb3dPdXRPZlZpZXdwb3J0UmFuZ2UsIChlOiBhbnksIGFyZ3M6IHsgZ3JpZDogYW55OyBpdGVtOiBhbnk7IHJvd0lkOiBudW1iZXI7IHJvd0luZGV4OiBudW1iZXI7IGV4cGFuZGVkUm93czogYW55W107IHJvd0lkc091dE9mVmlld3BvcnQ6IG51bWJlcltdOyB9KSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3ICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5vblJvd091dE9mVmlld3BvcnRSYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcub25Sb3dPdXRPZlZpZXdwb3J0UmFuZ2UoZSwgYXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyAtLVxuICAgICAgICAvLyBob29rIHNvbWUgZXZlbnRzIG5lZWRlZCBieSB0aGUgUGx1Z2luIGl0c2VsZlxuXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQub25Db2x1bW5zUmVvcmRlcmVkLCAoKSA9PiB0aGlzLnJlZHJhd0FsbFZpZXdDb21wb25lbnRzKCkpO1xuXG4gICAgICAgIC8vIG9uIHNvcnQsIGFsbCByb3cgZGV0YWlsIGFyZSBjb2xsYXBzZWQgc28gd2UgY2FuIGRpc3Bvc2Ugb2YgYWxsIHRoZSBWaWV3cyBhcyB3ZWxsXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQub25Tb3J0LCAoKSA9PiB0aGlzLmRpc3Bvc2VBbGxWaWV3Q29tcG9uZW50cygpKTtcblxuICAgICAgICAvLyBvbiBmaWx0ZXIgY2hhbmdlZCwgd2UgbmVlZCB0byByZS1yZW5kZXIgYWxsIFZpZXdzXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgICB0aGlzLmZpbHRlclNlcnZpY2Uub25GaWx0ZXJDaGFuZ2VkLnN1YnNjcmliZSgoY3VycmVudEZpbHRlcnM6IEN1cnJlbnRGaWx0ZXJbXSkgPT4gdGhpcy5yZWRyYXdBbGxWaWV3Q29tcG9uZW50cygpKVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX2V4dGVuc2lvbjtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyAtLVxuICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cblxuICBwcml2YXRlIGFkZFRvQXJyYXlXaGVuTm90Rm91bmQoaW5wdXRBcnJheTogYW55W10sIGlucHV0T2JqOiBhbnkpIHtcbiAgICBjb25zdCBhcnJheVJvd0luZGV4ID0gaW5wdXRBcnJheS5maW5kSW5kZXgoKG9iaikgPT4gb2JqLmlkID09PSBpbnB1dE9iai5pZCk7XG4gICAgaWYgKGFycmF5Um93SW5kZXggPCAwKSB7XG4gICAgICBpbnB1dEFycmF5LnB1c2goaW5wdXRPYmopO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGlzcG9zZUFsbFZpZXdDb21wb25lbnRzKCkge1xuICAgIHRoaXMuX3ZpZXdzLmZvckVhY2goKGNvbXBSZWYpID0+IHRoaXMuZGlzcG9zZVZpZXdDb21wb25lbnQoY29tcFJlZikpO1xuICAgIHRoaXMuX3ZpZXdzID0gW107XG4gIH1cblxuICBwcml2YXRlIGRpc3Bvc2VWaWV3Q29tcG9uZW50KGV4cGFuZGVkVmlldzogQ3JlYXRlZFZpZXcpIHtcbiAgICBjb25zdCBjb21wUmVmID0gZXhwYW5kZWRWaWV3ICYmIGV4cGFuZGVkVmlldy5jb21wb25lbnRSZWY7XG4gICAgaWYgKGNvbXBSZWYpIHtcbiAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcoY29tcFJlZi5ob3N0Vmlldyk7XG4gICAgICBjb21wUmVmLmRlc3Ryb3koKTtcbiAgICAgIHJldHVybiBleHBhbmRlZFZpZXc7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIG5vdGlmeSB0aGUgb25Bc3luY1Jlc3BvbnNlIHdpdGggdGhlIFwiYXJncy5pdGVtXCIgKHJlcXVpcmVkIHByb3BlcnR5KVxuICAgKiB0aGUgcGx1Z2luIHdpbGwgdGhlbiB1c2UgaXRlbSB0byBwb3B1bGF0ZSB0aGUgcm93IGRldGFpbCBwYW5lbCB3aXRoIHRoZSBcInBvc3RUZW1wbGF0ZVwiXG4gICAqIEBwYXJhbSBpdGVtXG4gICAqL1xuICBwcml2YXRlIG5vdGlmeVRlbXBsYXRlKGl0ZW06IGFueSkge1xuICAgIGlmICh0aGlzLl9leHRlbnNpb24pIHtcbiAgICAgIHRoaXMuX2V4dGVuc2lvbi5vbkFzeW5jUmVzcG9uc2Uubm90aWZ5KHsgaXRlbSB9LCB1bmRlZmluZWQsIHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBQcm9jZXNzaW5nLCB3ZSB3aWxsIG5vdGlmeSB0aGUgcGx1Z2luIHdpdGggdGhlIG5ldyBpdGVtIGRldGFpbCBvbmNlIGJhY2tlbmQgc2VydmVyIGNhbGwgY29tcGxldGVzXG4gICAqIEBwYXJhbSBpdGVtXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIG9uUHJvY2Vzc2luZyhpdGVtOiBhbnkpIHtcbiAgICBpZiAoaXRlbSAmJiB0eXBlb2YgdGhpcy5fdXNlclByb2Nlc3NGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgdXNlclByb2Nlc3NGbiA9IHRoaXMuX3VzZXJQcm9jZXNzRm4oaXRlbSk7XG5cbiAgICAgIC8vIHdhaXQgZm9yIHRoZSBcInVzZXJQcm9jZXNzRm5cIiwgb25jZSByZXNvbHZlZCB3ZSB3aWxsIHNhdmUgaXQgaW50byB0aGUgXCJjb2xsZWN0aW9uXCJcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiBhbnkgfCBhbnlbXSA9IGF3YWl0IHVzZXJQcm9jZXNzRm47XG4gICAgICBsZXQgYXdhaXRlZEl0ZW1EZXRhaWw6IGFueTtcblxuICAgICAgaWYgKHJlc3BvbnNlLmhhc093blByb3BlcnR5KCdpZCcpKSB7XG4gICAgICAgIGF3YWl0ZWRJdGVtRGV0YWlsID0gcmVzcG9uc2U7IC8vIGZyb20gUHJvbWlzZVxuICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSBpbnN0YW5jZW9mIFJlc3BvbnNlICYmIHR5cGVvZiByZXNwb25zZVsnanNvbiddID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGF3YWl0ZWRJdGVtRGV0YWlsID0gYXdhaXQgcmVzcG9uc2VbJ2pzb24nXSgpOyAvLyBmcm9tIEZldGNoXG4gICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlWydjb250ZW50J10pIHtcbiAgICAgICAgYXdhaXRlZEl0ZW1EZXRhaWwgPSByZXNwb25zZVsnY29udGVudCddOyAvLyBmcm9tIEFuZ3VsYXItaHR0cC1jbGllbnRcbiAgICAgIH1cblxuICAgICAgLy8gbm90aWZ5IHRoZSBwbHVnaW4gd2l0aCB0aGUgbmV3IGl0ZW0gZGV0YWlsc1xuICAgICAgdGhpcy5ub3RpZnlUZW1wbGF0ZShhd2FpdGVkSXRlbURldGFpbCB8fCB7fSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFJlZHJhdyAocmUtcmVuZGVyKSBhbGwgdGhlIGV4cGFuZGVkIHJvdyBkZXRhaWwgVmlldyBDb21wb25lbnRzICovXG4gIHByaXZhdGUgcmVkcmF3QWxsVmlld0NvbXBvbmVudHMoKSB7XG4gICAgdGhpcy5fdmlld3MuZm9yRWFjaCgoY29tcFJlZikgPT4ge1xuICAgICAgdGhpcy5yZWRyYXdWaWV3Q29tcG9uZW50KGNvbXBSZWYpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFJlbmRlciBhbGwgdGhlIGV4cGFuZGVkIHJvdyBkZXRhaWwgVmlldyBDb21wb25lbnRzICovXG4gIHByaXZhdGUgcmVuZGVyQWxsVmlld0NvbXBvbmVudHMoKSB7XG4gICAgdGhpcy5fdmlld3MuZm9yRWFjaCgodmlldykgPT4ge1xuICAgICAgaWYgKHZpZXcgJiYgdmlldy5kYXRhQ29udGV4dCkge1xuICAgICAgICB0aGlzLnJlbmRlclZpZXdNb2RlbCh2aWV3LmRhdGFDb250ZXh0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBKdXN0IGJlZm9yZSB0aGUgcm93IGdldCBleHBhbmRlZCBvciBjb2xsYXBzZWQgd2Ugd2lsbCBkbyB0aGUgZm9sbG93aW5nXG4gICAqIEZpcnN0IGRldGVybWluZSBpZiB0aGUgcm93IGlzIGV4cGFuZGluZyBvciBjb2xsYXBzaW5nLFxuICAgKiBpZiBpdCdzIGV4cGFuZGluZyB3ZSB3aWxsIGFkZCBpdCB0byBvdXIgVmlldyBDb21wb25lbnRzIHJlZmVyZW5jZSBhcnJheSBpZiB3ZSBkb24ndCBhbHJlYWR5IGhhdmUgaXRcbiAgICogb3IgaWYgaXQncyBjb2xsYXBzaW5nIHdlIHdpbGwgcmVtb3ZlIGl0IGZyb20gb3VyIFZpZXcgQ29tcG9uZW50cyByZWZlcmVuY2UgYXJyYXlcbiAgICovXG4gIHByaXZhdGUgb25CZWZvcmVSb3dEZXRhaWxUb2dnbGUoZTogRXZlbnQsIGFyZ3M6IHsgZ3JpZDogYW55OyBpdGVtOiBhbnk7IH0pIHtcbiAgICAvLyBleHBhbmRpbmdcbiAgICBpZiAoYXJncyAmJiBhcmdzLml0ZW0gJiYgYXJncy5pdGVtLl9fY29sbGFwc2VkKSB7XG4gICAgICAvLyBleHBhbmRpbmcgcm93IGRldGFpbFxuICAgICAgaWYgKGFyZ3MgJiYgYXJncy5pdGVtKSB7XG4gICAgICAgIGNvbnN0IHZpZXdJbmZvOiBDcmVhdGVkVmlldyA9IHtcbiAgICAgICAgICBpZDogYXJncy5pdGVtLmlkLFxuICAgICAgICAgIGRhdGFDb250ZXh0OiBhcmdzLml0ZW1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hZGRUb0FycmF5V2hlbk5vdEZvdW5kKHRoaXMuX3ZpZXdzLCB2aWV3SW5mbyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNvbGxhcHNpbmcsIHNvIGRpc3Bvc2Ugb2YgdGhlIFZpZXcvQ29tcG9uZW50XG4gICAgICBjb25zdCBmb3VuZFZpZXdJbmRleCA9IHRoaXMuX3ZpZXdzLmZpbmRJbmRleCgodmlldzogQ3JlYXRlZFZpZXcpID0+IHZpZXcuaWQgPT09IGFyZ3MuaXRlbS5pZCk7XG4gICAgICBpZiAoZm91bmRWaWV3SW5kZXggPj0gMCkge1xuICAgICAgICBpZiAodGhpcy5fdmlld3MuaGFzT3duUHJvcGVydHkoZm91bmRWaWV3SW5kZXgpKSB7XG4gICAgICAgICAgY29uc3QgY29tcFJlZiA9IHRoaXMuX3ZpZXdzW2ZvdW5kVmlld0luZGV4XS5jb21wb25lbnRSZWY7XG4gICAgICAgICAgdGhpcy5hcHBSZWYuZGV0YWNoVmlldyhjb21wUmVmLmhvc3RWaWV3KTtcbiAgICAgICAgICBjb21wUmVmLmRlc3Ryb3koKTtcbiAgICAgICAgICB0aGlzLl92aWV3cy5zcGxpY2UoZm91bmRWaWV3SW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIFdoZW4gUm93IGNvbWVzIGJhY2sgdG8gVmlld3BvcnQgUmFuZ2UsIHdlIG5lZWQgdG8gcmVkcmF3IHRoZSBWaWV3ICovXG4gIHByaXZhdGUgb25Sb3dCYWNrVG9WaWV3cG9ydFJhbmdlKGU6IEV2ZW50LCBhcmdzOiB7IGdyaWQ6IGFueTsgaXRlbTogYW55OyByb3dJZDogbnVtYmVyOyByb3dJbmRleDogbnVtYmVyOyBleHBhbmRlZFJvd3M6IGFueVtdOyByb3dJZHNPdXRPZlZpZXdwb3J0OiBudW1iZXJbXTsgfSkge1xuICAgIGlmIChhcmdzICYmIGFyZ3MuaXRlbSkge1xuICAgICAgdGhpcy5fdmlld3MuZm9yRWFjaCgodmlldykgPT4ge1xuICAgICAgICBpZiAodmlldy5pZCA9PT0gYXJncy5pdGVtLmlkKSB7XG4gICAgICAgICAgdGhpcy5yZWRyYXdWaWV3Q29tcG9uZW50KHZpZXcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogUmVkcmF3IHRoZSBuZWNlc3NhcnkgVmlldyBDb21wb25lbnQgKi9cbiAgcHJpdmF0ZSByZWRyYXdWaWV3Q29tcG9uZW50KGNyZWF0ZWRWaWV3OiBDcmVhdGVkVmlldykge1xuICAgIGNvbnN0IGNvbnRhaW5lckVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHtST1dfREVUQUlMX0NPTlRBSU5FUl9QUkVGSVh9JHtjcmVhdGVkVmlldy5pZH1gKTtcbiAgICBpZiAoY29udGFpbmVyRWxlbWVudHMgJiYgY29udGFpbmVyRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnJlbmRlclZpZXdNb2RlbChjcmVhdGVkVmlldy5kYXRhQ29udGV4dCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFJlbmRlciAob3IgcmVyZW5kZXIpIHRoZSBWaWV3IENvbXBvbmVudCAoUm93IERldGFpbCkgKi9cbiAgcHJpdmF0ZSByZW5kZXJQcmVsb2FkVmlldygpIHtcbiAgICBjb25zdCBjb250YWluZXJFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7UFJFTE9BRF9DT05UQUlORVJfUFJFRklYfWApO1xuICAgIGlmIChjb250YWluZXJFbGVtZW50cyAmJiBjb250YWluZXJFbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuYW5ndWxhclV0aWxTZXJ2aWNlLmNyZWF0ZUFuZ3VsYXJDb21wb25lbnRBcHBlbmRUb0RvbSh0aGlzLl9wcmVsb2FkQ29tcG9uZW50LCBjb250YWluZXJFbGVtZW50c1swXSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFJlbmRlciAob3IgcmVyZW5kZXIpIHRoZSBWaWV3IENvbXBvbmVudCAoUm93IERldGFpbCkgKi9cbiAgcHJpdmF0ZSByZW5kZXJWaWV3TW9kZWwoaXRlbTogYW55KSB7XG4gICAgY29uc3QgY29udGFpbmVyRWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke1JPV19ERVRBSUxfQ09OVEFJTkVSX1BSRUZJWH0ke2l0ZW0uaWR9YCk7XG4gICAgaWYgKGNvbnRhaW5lckVsZW1lbnRzICYmIGNvbnRhaW5lckVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgY29uc3QgY29tcG9uZW50T3V0cHV0ID0gdGhpcy5hbmd1bGFyVXRpbFNlcnZpY2UuY3JlYXRlQW5ndWxhckNvbXBvbmVudEFwcGVuZFRvRG9tKHRoaXMuX3ZpZXdDb21wb25lbnQsIGNvbnRhaW5lckVsZW1lbnRzWzBdLCB0cnVlKTtcbiAgICAgIGlmIChjb21wb25lbnRPdXRwdXQgJiYgY29tcG9uZW50T3V0cHV0LmNvbXBvbmVudFJlZiAmJiBjb21wb25lbnRPdXRwdXQuY29tcG9uZW50UmVmLmluc3RhbmNlKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oY29tcG9uZW50T3V0cHV0LmNvbXBvbmVudFJlZi5pbnN0YW5jZSwgeyBtb2RlbDogaXRlbSB9KTtcblxuICAgICAgICBjb25zdCB2aWV3T2JqID0gdGhpcy5fdmlld3MuZmluZCgob2JqKSA9PiBvYmouaWQgPT09IGl0ZW0uaWQpO1xuICAgICAgICBpZiAodmlld09iaikge1xuICAgICAgICAgIHZpZXdPYmouY29tcG9uZW50UmVmID0gY29tcG9uZW50T3V0cHV0LmNvbXBvbmVudFJlZjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19