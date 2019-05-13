/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// import 3rd party vendor libs
// only import the necessary core lib, each will be imported on demand when enabled (via require)
import 'jquery-ui-dist/jquery-ui';
import 'slickgrid/lib/jquery.event.drag-2.3.0';
import 'slickgrid/slick.core';
import 'slickgrid/slick.grid';
import 'slickgrid/slick.dataview';
// ...then everything else...
import { Component, ElementRef, EventEmitter, Inject, Injectable, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalGridOptions } from './../global-grid-options';
import { titleCase, unsubscribeAllObservables } from './../services/utilities';
import { executeBackendProcessesCallback, onBackendError } from '../services/backend-utilities';
import { ExtensionName, GridStateType, } from './../models/index';
import { FilterFactory } from '../filters/filterFactory';
import { SlickgridConfig } from '../slickgrid-config';
import { isObservable, Observable } from 'rxjs';
// Services
import { AngularUtilService } from './../services/angularUtilService';
import { ExportService } from './../services/export.service';
import { ExtensionService } from '../services/extension.service';
import { ExtensionUtility } from '../extensions/extensionUtility';
import { FilterService } from './../services/filter.service';
import { GraphqlService } from './../services/graphql.service';
import { GridEventService } from './../services/gridEvent.service';
import { GridService } from './../services/grid.service';
import { GridStateService } from './../services/gridState.service';
import { GroupingAndColspanService } from './../services/groupingAndColspan.service';
import { ResizerService } from './../services/resizer.service';
import { SharedService } from '../services/shared.service';
import { SortService } from './../services/sort.service';
// Extensions (SlickGrid Controls & Plugins)
import { AutoTooltipExtension } from '../extensions/autoTooltipExtension';
import { CellExternalCopyManagerExtension } from '../extensions/cellExternalCopyManagerExtension';
import { CheckboxSelectorExtension } from '../extensions/checkboxSelectorExtension';
import { ColumnPickerExtension } from '../extensions/columnPickerExtension';
import { DraggableGroupingExtension } from '../extensions/draggableGroupingExtension';
import { GridMenuExtension } from '../extensions/gridMenuExtension';
import { GroupItemMetaProviderExtension } from '../extensions/groupItemMetaProviderExtension';
import { HeaderButtonExtension } from '../extensions/headerButtonExtension';
import { HeaderMenuExtension } from '../extensions/headerMenuExtension';
import { RowDetailViewExtension } from '../extensions/rowDetailViewExtension';
import { RowMoveManagerExtension } from '../extensions/rowMoveManagerExtension';
import { RowSelectionExtension } from '../extensions/rowSelectionExtension';
/** @type {?} */
var slickgridEventPrefix = 'sg';
var AngularSlickgridComponent = /** @class */ (function () {
    function AngularSlickgridComponent(elm, exportService, extensionService, extensionUtility, filterService, gridService, gridEventService, gridStateService, groupingAndColspanService, resizer, sharedService, sortService, translate, forRootConfig) {
        this.elm = elm;
        this.exportService = exportService;
        this.extensionService = extensionService;
        this.extensionUtility = extensionUtility;
        this.filterService = filterService;
        this.gridService = gridService;
        this.gridEventService = gridEventService;
        this.gridStateService = gridStateService;
        this.groupingAndColspanService = groupingAndColspanService;
        this.resizer = resizer;
        this.sharedService = sharedService;
        this.sortService = sortService;
        this.translate = translate;
        this.forRootConfig = forRootConfig;
        this._eventHandler = new Slick.EventHandler();
        this._hideHeaderRowAfterPageLoad = false;
        this.groupingDefinition = {};
        this.showPagination = false;
        this.isGridInitialized = false;
        this.subscriptions = [];
        this.onAngularGridCreated = new EventEmitter();
        this.onDataviewCreated = new EventEmitter();
        this.onGridCreated = new EventEmitter();
        this.onGridInitialized = new EventEmitter();
        this.onBeforeGridCreate = new EventEmitter();
        this.onBeforeGridDestroy = new EventEmitter();
        this.onAfterGridDestroyed = new EventEmitter();
        this.onGridStateChanged = new EventEmitter();
    }
    Object.defineProperty(AngularSlickgridComponent.prototype, "gridHeight", {
        set: /**
         * @param {?} height
         * @return {?}
         */
        function (height) {
            this._fixedHeight = height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AngularSlickgridComponent.prototype, "gridWidth", {
        set: /**
         * @param {?} width
         * @return {?}
         */
        function (width) {
            this._fixedWidth = width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AngularSlickgridComponent.prototype, "columnDefinitions", {
        get: /**
         * @return {?}
         */
        function () {
            return this._columnDefinitions;
        },
        set: /**
         * @param {?} columnDefinitions
         * @return {?}
         */
        function (columnDefinitions) {
            this._columnDefinitions = columnDefinitions;
            if (this.isGridInitialized) {
                this.updateColumnDefinitionsList(columnDefinitions);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AngularSlickgridComponent.prototype, "dataset", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dataView.getItems();
        },
        set: /**
         * @param {?} dataset
         * @return {?}
         */
        function (dataset) {
            this._dataset = dataset;
            this.refreshGridData(dataset);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AngularSlickgridComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.onBeforeGridCreate.emit(true);
        if (this.gridOptions && !this.gridOptions.enableAutoResize && (this._fixedHeight || this._fixedWidth)) {
            this.gridHeightString = this._fixedHeight + "px";
            this.gridWidthString = this._fixedWidth + "px";
        }
    };
    /**
     * @return {?}
     */
    AngularSlickgridComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.onBeforeGridDestroy.emit(this.grid);
        this.destroy();
        this.onAfterGridDestroyed.emit(true);
    };
    /**
     * @param {?=} emptyDomElementContainer
     * @return {?}
     */
    AngularSlickgridComponent.prototype.destroy = /**
     * @param {?=} emptyDomElementContainer
     * @return {?}
     */
    function (emptyDomElementContainer) {
        if (emptyDomElementContainer === void 0) { emptyDomElementContainer = false; }
        /** @type {?} */
        var gridContainerId = this.gridOptions && this.gridOptions.gridContainerId;
        this.dataView = [];
        this.gridOptions = {};
        this.extensionService.dispose();
        this.filterService.dispose();
        this.gridEventService.dispose();
        this.gridStateService.dispose();
        this.groupingAndColspanService.dispose();
        this.resizer.dispose();
        this.sortService.dispose();
        if (this._eventHandler && this._eventHandler.unsubscribeAll) {
            this._eventHandler.unsubscribeAll();
        }
        if (this.grid && this.grid.destroy) {
            this.grid.destroy();
        }
        if (emptyDomElementContainer) {
            $(gridContainerId).empty();
        }
        // also unsubscribe all RxJS subscriptions
        this.subscriptions = unsubscribeAllObservables(this.subscriptions);
    };
    /**
     * @return {?}
     */
    AngularSlickgridComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.initialization();
        this.isGridInitialized = true;
        // user must provide a "gridHeight" or use "autoResize: true" in the grid options
        if (!this._fixedHeight && !this.gridOptions.enableAutoResize) {
            throw new Error("[Angular-Slickgrid] requires a \"grid-height\" or the \"enableAutoResize\" grid option to be enabled.\n        Without that the grid will seem empty while in fact it just does not have any height define.");
        }
    };
    /**
     * @return {?}
     */
    AngularSlickgridComponent.prototype.initialization = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // make sure the dataset is initialized (if not it will throw an error that it cannot getLength of null)
        this._dataset = this._dataset || [];
        this.gridOptions = this.mergeGridOptions(this.gridOptions);
        this.createBackendApiInternalPostProcessCallback(this.gridOptions);
        if (!this.customDataView) {
            if (this.gridOptions.draggableGrouping || this.gridOptions.enableGrouping) {
                this.extensionUtility.loadExtensionDynamically(ExtensionName.groupItemMetaProvider);
                this.groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider();
                this.sharedService.groupItemMetadataProvider = this.groupItemMetadataProvider;
                this.dataView = new Slick.Data.DataView({ groupItemMetadataProvider: this.groupItemMetadataProvider });
            }
            else {
                this.dataView = new Slick.Data.DataView();
            }
        }
        // for convenience, we provide the property "editor" as an Angular-Slickgrid editor complex object
        // however "editor" is used internally by SlickGrid for it's own Editor Factory
        // so in our lib we will swap "editor" and copy it into a new property called "internalColumnEditor"
        // then take back "editor.model" and make it the new "editor" so that SlickGrid Editor Factory still works
        this._columnDefinitions = this._columnDefinitions.map((/**
         * @param {?} column
         * @return {?}
         */
        function (column) {
            // on every Editor that have a "collectionAsync", resolve the data and assign it to the "collection" property
            if (column.editor && column.editor.collectionAsync) {
                _this.loadEditorCollectionAsync(column);
            }
            return tslib_1.__assign({}, column, { editor: column.editor && column.editor.model, internalColumnEditor: tslib_1.__assign({}, column.editor) });
        }));
        // save reference for all columns before they optionally become hidden/visible
        this.sharedService.allColumns = this._columnDefinitions;
        this.sharedService.visibleColumns = this._columnDefinitions;
        this.extensionService.createExtensionsBeforeGridCreation(this._columnDefinitions, this.gridOptions);
        // build SlickGrid Grid, also user might optionally pass a custom dataview (e.g. remote model)
        this.grid = new Slick.Grid("#" + this.gridId, this.customDataView || this.dataView, this._columnDefinitions, this.gridOptions);
        this.sharedService.dataView = this.dataView;
        this.sharedService.grid = this.grid;
        this.extensionService.attachDifferentExtensions();
        this.attachDifferentHooks(this.grid, this.gridOptions, this.dataView);
        // emit the Grid & DataView object to make them available in parent component
        this.onGridCreated.emit(this.grid);
        // initialize the SlickGrid grid
        this.grid.init();
        if (!this.customDataView && (this.dataView && this.dataView.beginUpdate && this.dataView.setItems && this.dataView.endUpdate)) {
            this.onDataviewCreated.emit(this.dataView);
            this.dataView.beginUpdate();
            this.dataView.setItems(this._dataset, this.gridOptions.datasetIdPropertyName);
            this.dataView.endUpdate();
            // if you don't want the items that are not visible (due to being filtered out
            // or being on a different page) to stay selected, pass 'false' to the second arg
            if (this.gridOptions && this.gridOptions.dataView && this.gridOptions.dataView.hasOwnProperty('syncGridSelection')) {
                this.dataView.syncGridSelection(this.grid, this.gridOptions.dataView.syncGridSelection);
            }
        }
        // user might want to hide the header row on page load but still have `enableFiltering: true`
        // if that is the case, we need to hide the headerRow ONLY AFTER all filters got created & dataView exist
        if (this._hideHeaderRowAfterPageLoad) {
            this.showHeaderRow(false);
        }
        // after the DataView is created & updated execute some processes
        this.executeAfterDataviewCreated(this.grid, this.gridOptions, this.dataView);
        // attach resize ONLY after the dataView is ready
        this.attachResizeHook(this.grid, this.gridOptions);
        // attach grouping and header grouping colspan service
        if (this.gridOptions.createPreHeaderPanel && !this.gridOptions.enableDraggableGrouping) {
            this.groupingAndColspanService.init(this.grid, this.dataView);
        }
        // attach grid  service
        this.gridService.init(this.grid, this.dataView);
        // when user enables translation, we need to translate Headers on first pass & subsequently in the attachDifferentHooks
        if (this.gridOptions.enableTranslate) {
            this.extensionService.translateColumnHeaders();
        }
        // if Export is enabled, initialize the service with the necessary grid and other objects
        if (this.gridOptions.enableExport) {
            this.exportService.init(this.grid, this.dataView);
        }
        // once all hooks are in placed and the grid is initialized, we can emit an event
        this.onGridInitialized.emit(this.grid);
        // attach the Backend Service API callback functions only after the grid is initialized
        // because the preProcess() and onInit() might get triggered
        if (this.gridOptions && this.gridOptions.backendServiceApi) {
            this.attachBackendCallbackFunctions(this.gridOptions);
        }
        this.gridStateService.init(this.grid, this.extensionService, this.filterService, this.sortService);
        this.onAngularGridCreated.emit({
            // Slick Grid & DataView objects
            dataView: this.dataView,
            slickGrid: this.grid,
            // public methods
            destroy: this.destroy.bind(this),
            // return all available Services (non-singleton)
            backendService: this.gridOptions && this.gridOptions.backendServiceApi && this.gridOptions.backendServiceApi.service,
            exportService: this.exportService,
            extensionService: this.extensionService,
            filterService: this.filterService,
            gridEventService: this.gridEventService,
            gridStateService: this.gridStateService,
            gridService: this.gridService,
            groupingService: this.groupingAndColspanService,
            resizerService: this.resizer,
            sortService: this.sortService,
            /**
             * @deprecated please use "extensionService" instead
             */
            pluginService: this.extensionService,
        });
    };
    /**
     * Commits the current edit to the grid
     */
    /**
     * Commits the current edit to the grid
     * @param {?} target
     * @return {?}
     */
    AngularSlickgridComponent.prototype.commitEdit = /**
     * Commits the current edit to the grid
     * @param {?} target
     * @return {?}
     */
    function (target) {
        var _this = this;
        if (this.grid.getOptions().autoCommitEdit) {
            /** @type {?} */
            var activeNode_1 = this.grid.getActiveCellNode();
            // a timeout must be set or this could come into conflict when slickgrid
            // tries to commit the edit when going from one editor to another on the grid
            // through the click event. If the timeout was not here it would
            // try to commit/destroy the editor twice, which would throw a jquery
            // error about the element not being in the DOM
            setTimeout((/**
             * @return {?}
             */
            function () {
                // make sure the target is the active editor so we do not
                // commit prematurely
                if (activeNode_1 && activeNode_1.contains(target) && _this.grid.getEditorLock().isActive()) {
                    _this.grid.getEditorLock().commitCurrentEdit();
                }
            }));
        }
    };
    /**
     * Define our internal Post Process callback, it will execute internally after we get back result from the Process backend call
     * For now, this is GraphQL Service ONLY feature and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
     */
    /**
     * Define our internal Post Process callback, it will execute internally after we get back result from the Process backend call
     * For now, this is GraphQL Service ONLY feature and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
     * @param {?} gridOptions
     * @return {?}
     */
    AngularSlickgridComponent.prototype.createBackendApiInternalPostProcessCallback = /**
     * Define our internal Post Process callback, it will execute internally after we get back result from the Process backend call
     * For now, this is GraphQL Service ONLY feature and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
     * @param {?} gridOptions
     * @return {?}
     */
    function (gridOptions) {
        var _this = this;
        if (gridOptions && gridOptions.backendServiceApi) {
            /** @type {?} */
            var backendApi_1 = gridOptions.backendServiceApi;
            // internalPostProcess only works with a GraphQL Service, so make sure it is that type
            if (backendApi_1 && backendApi_1.service && backendApi_1.service instanceof GraphqlService) {
                backendApi_1.internalPostProcess = (/**
                 * @param {?} processResult
                 * @return {?}
                 */
                function (processResult) {
                    /** @type {?} */
                    var datasetName = (backendApi_1 && backendApi_1.service && typeof backendApi_1.service.getDatasetName === 'function') ? backendApi_1.service.getDatasetName() : '';
                    if (processResult && processResult.data && processResult.data[datasetName]) {
                        _this._dataset = processResult.data[datasetName].nodes;
                        _this.refreshGridData(_this._dataset, processResult.data[datasetName].totalCount);
                    }
                    else {
                        _this._dataset = [];
                    }
                });
            }
        }
    };
    /**
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} dataView
     * @return {?}
     */
    AngularSlickgridComponent.prototype.attachDifferentHooks = /**
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} dataView
     * @return {?}
     */
    function (grid, gridOptions, dataView) {
        var _this = this;
        // on locale change, we have to manually translate the Headers, GridMenu
        this.subscriptions.push(this.translate.onLangChange.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (gridOptions.enableTranslate) {
                _this.extensionService.translateColumnHeaders();
                _this.extensionService.translateColumnPicker();
                _this.extensionService.translateGridMenu();
                _this.extensionService.translateHeaderMenu();
            }
        })));
        // if user entered some Columns "presets", we need to reflect them all in the grid
        if (gridOptions.presets && Array.isArray(gridOptions.presets.columns) && gridOptions.presets.columns.length > 0) {
            /** @type {?} */
            var gridColumns = this.gridStateService.getAssociatedGridColumns(grid, gridOptions.presets.columns);
            if (gridColumns && Array.isArray(gridColumns) && gridColumns.length > 0) {
                // make sure that the checkbox selector is also visible if it is enabled
                if (gridOptions.enableCheckboxSelector) {
                    /** @type {?} */
                    var checkboxColumn = (Array.isArray(this._columnDefinitions) && this._columnDefinitions.length > 0) ? this._columnDefinitions[0] : null;
                    if (checkboxColumn && checkboxColumn.id === '_checkbox_selector' && gridColumns[0].id !== '_checkbox_selector') {
                        gridColumns.unshift(checkboxColumn);
                    }
                }
                // finally set the new presets columns (including checkbox selector if need be)
                grid.setColumns(gridColumns);
            }
        }
        // attach external sorting (backend) when available or default onSort (dataView)
        if (gridOptions.enableSorting && !this.customDataView) {
            gridOptions.backendServiceApi ? this.sortService.attachBackendOnSort(grid, dataView) : this.sortService.attachLocalOnSort(grid, dataView);
        }
        // attach external filter (backend) when available or default onFilter (dataView)
        if (gridOptions.enableFiltering && !this.customDataView) {
            this.filterService.init(grid);
            // if user entered some Filter "presets", we need to reflect them all in the DOM
            if (gridOptions.presets && Array.isArray(gridOptions.presets.filters) && gridOptions.presets.filters.length > 0) {
                this.filterService.populateColumnFilterSearchTerms();
            }
            gridOptions.backendServiceApi ? this.filterService.attachBackendOnFilter(grid, this.dataView) : this.filterService.attachLocalOnFilter(grid, this.dataView);
        }
        // if user set an onInit Backend, we'll run it right away (and if so, we also need to run preProcess, internalPostProcess & postProcess)
        if (gridOptions.backendServiceApi) {
            /** @type {?} */
            var backendApi = gridOptions.backendServiceApi;
            if (backendApi && backendApi.service && backendApi.service.init) {
                backendApi.service.init(backendApi.options, gridOptions.pagination, this.grid);
            }
        }
        var _loop_1 = function (prop) {
            if (grid.hasOwnProperty(prop) && prop.startsWith('on')) {
                this_1._eventHandler.subscribe(grid[prop], (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                function (e, args) {
                    return _this.dispatchCustomEvent("" + slickgridEventPrefix + titleCase(prop), { eventData: e, args: args });
                }));
            }
        };
        var this_1 = this;
        // expose all Slick Grid Events through dispatch
        for (var prop in grid) {
            _loop_1(prop);
        }
        var _loop_2 = function (prop) {
            if (dataView.hasOwnProperty(prop) && prop.startsWith('on')) {
                this_2._eventHandler.subscribe(dataView[prop], (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                function (e, args) {
                    return _this.dispatchCustomEvent("" + slickgridEventPrefix + titleCase(prop), { eventData: e, args: args });
                }));
            }
        };
        var this_2 = this;
        // expose all Slick DataView Events through dispatch
        for (var prop in dataView) {
            _loop_2(prop);
        }
        // expose GridState Service changes event through dispatch
        this.subscriptions.push(this.gridStateService.onGridStateChanged.subscribe((/**
         * @param {?} gridStateChange
         * @return {?}
         */
        function (gridStateChange) {
            _this.onGridStateChanged.emit(gridStateChange);
        })));
        // on cell click, mainly used with the columnDef.action callback
        this.gridEventService.attachOnCellChange(grid, dataView);
        this.gridEventService.attachOnClick(grid, dataView);
        if (dataView && grid) {
            this._eventHandler.subscribe(dataView.onRowCountChanged, (/**
             * @param {?} e
             * @param {?} args
             * @return {?}
             */
            function (e, args) {
                grid.invalidate();
            }));
            // without this, filtering data with local dataset will not always show correctly
            // also don't use "invalidateRows" since it destroys the entire row and as bad user experience when updating a row
            // see commit: https://github.com/ghiscoding/Angular-Slickgrid/commit/bb62c0aa2314a5d61188ff005ccb564577f08805
            if (gridOptions && gridOptions.enableFiltering && !gridOptions.enableRowDetailView) {
                this._eventHandler.subscribe(dataView.onRowsChanged, (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                function (e, args) {
                    if (args && args.rows && Array.isArray(args.rows)) {
                        args.rows.forEach((/**
                         * @param {?} row
                         * @return {?}
                         */
                        function (row) { return grid.updateRow(row); }));
                        grid.render();
                    }
                }));
            }
        }
        // does the user have a colspan callback?
        if (gridOptions.colspanCallback) {
            this.dataView.getItemMetadata = (/**
             * @param {?} rowNumber
             * @return {?}
             */
            function (rowNumber) {
                /** @type {?} */
                var item = _this.dataView.getItem(rowNumber);
                return gridOptions.colspanCallback(item);
            });
        }
    };
    /**
     * @param {?} gridOptions
     * @return {?}
     */
    AngularSlickgridComponent.prototype.attachBackendCallbackFunctions = /**
     * @param {?} gridOptions
     * @return {?}
     */
    function (gridOptions) {
        var _this = this;
        /** @type {?} */
        var backendApi = gridOptions.backendServiceApi;
        /** @type {?} */
        var serviceOptions = (backendApi && backendApi.service && backendApi.service.options) ? backendApi.service.options : {};
        /** @type {?} */
        var isExecuteCommandOnInit = (!serviceOptions) ? false : ((serviceOptions && serviceOptions.hasOwnProperty('executeProcessCommandOnInit')) ? serviceOptions['executeProcessCommandOnInit'] : true);
        // update backend filters (if need be) before the query runs
        if (backendApi) {
            /** @type {?} */
            var backendService = backendApi.service;
            // if user entered some any "presets", we need to reflect them all in the grid
            if (gridOptions && gridOptions.presets) {
                // Filters "presets"
                if (backendService && backendService.updateFilters && Array.isArray(gridOptions.presets.filters) && gridOptions.presets.filters.length > 0) {
                    backendService.updateFilters(gridOptions.presets.filters, true);
                }
                // Sorters "presets"
                if (backendService && backendService.updateSorters && Array.isArray(gridOptions.presets.sorters) && gridOptions.presets.sorters.length > 0) {
                    backendService.updateSorters(undefined, gridOptions.presets.sorters);
                }
                // Pagination "presets"
                if (backendService && backendService.updatePagination && gridOptions.presets.pagination) {
                    backendService.updatePagination(gridOptions.presets.pagination.pageNumber, gridOptions.presets.pagination.pageSize);
                }
            }
            else {
                /** @type {?} */
                var columnFilters = this.filterService.getColumnFilters();
                if (columnFilters && backendService && backendService.updateFilters) {
                    backendService.updateFilters(columnFilters, false);
                }
            }
        }
        if (backendApi && backendApi.service && (backendApi.onInit || isExecuteCommandOnInit)) {
            /** @type {?} */
            var query = (typeof backendApi.service.buildQuery === 'function') ? backendApi.service.buildQuery() : '';
            /** @type {?} */
            var process_1 = (isExecuteCommandOnInit) ? backendApi.process(query) : backendApi.onInit(query);
            // wrap this inside a setTimeout to avoid timing issue since the gridOptions needs to be ready before running this onInit
            setTimeout((/**
             * @return {?}
             */
            function () {
                // keep start time & end timestamps & return it after process execution
                /** @type {?} */
                var startTime = new Date();
                // run any pre-process, if defined, for example a spinner
                if (backendApi.preProcess) {
                    backendApi.preProcess();
                }
                try {
                    // the processes can be Observables (like HttpClient) or Promises
                    if (process_1 instanceof Promise && process_1.then) {
                        process_1.then((/**
                         * @param {?} processResult
                         * @return {?}
                         */
                        function (processResult) { return executeBackendProcessesCallback(startTime, processResult, backendApi, _this.gridOptions); }));
                    }
                    else if (isObservable(process_1)) {
                        process_1.subscribe((/**
                         * @param {?} processResult
                         * @return {?}
                         */
                        function (processResult) { return executeBackendProcessesCallback(startTime, processResult, backendApi, _this.gridOptions); }), (/**
                         * @param {?} error
                         * @return {?}
                         */
                        function (error) { return onBackendError(error, backendApi); }));
                    }
                }
                catch (error) {
                    onBackendError(error, backendApi);
                }
            }));
        }
    };
    /**
     * @param {?} grid
     * @param {?} options
     * @return {?}
     */
    AngularSlickgridComponent.prototype.attachResizeHook = /**
     * @param {?} grid
     * @param {?} options
     * @return {?}
     */
    function (grid, options) {
        // expand/autofit columns on first page load
        if (grid && options.autoFitColumnsOnFirstLoad && options.enableAutoSizeColumns) {
            grid.autosizeColumns();
            // compensate anytime SlickGrid measureScrollbar is incorrect (only seems to happen in Chrome 1/5 computers)
            this.resizer.compensateHorizontalScroll(this.grid, this.gridOptions);
        }
        // auto-resize grid on browser resize
        if (this._fixedHeight || this._fixedWidth) {
            this.resizer.init(grid, { height: this._fixedHeight, width: this._fixedWidth });
        }
        else {
            this.resizer.init(grid);
        }
        if (options.enableAutoResize) {
            this.resizer.bindAutoResizeDataGrid();
            if (grid && options.autoFitColumnsOnFirstLoad && options.enableAutoSizeColumns) {
                grid.autosizeColumns();
            }
        }
    };
    /**
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} dataView
     * @return {?}
     */
    AngularSlickgridComponent.prototype.executeAfterDataviewCreated = /**
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} dataView
     * @return {?}
     */
    function (grid, gridOptions, dataView) {
        // if user entered some Sort "presets", we need to reflect them all in the DOM
        if (gridOptions.enableSorting) {
            if (gridOptions.presets && Array.isArray(gridOptions.presets.sorters) && gridOptions.presets.sorters.length > 0) {
                this.sortService.loadLocalPresets(grid, dataView);
            }
        }
    };
    /**
     * @param {?} gridOptions
     * @return {?}
     */
    AngularSlickgridComponent.prototype.mergeGridOptions = /**
     * @param {?} gridOptions
     * @return {?}
     */
    function (gridOptions) {
        gridOptions.gridId = this.gridId;
        gridOptions.gridContainerId = "slickGridContainer-" + this.gridId;
        // use jquery extend to deep merge & copy to avoid immutable properties being changed in GlobalGridOptions after a route change
        /** @type {?} */
        var options = $.extend(true, {}, GlobalGridOptions, this.forRootConfig, gridOptions);
        // using jQuery extend to do a deep clone has an unwanted side on objects and pageSizes but ES6 spread has other worst side effects
        // so we will just overwrite the pageSizes when needed, this is the only one causing issues so far.
        // jQuery wrote this on their docs:: On a deep extend, Object and Array are extended, but object wrappers on primitive types such as String, Boolean, and Number are not.
        if (gridOptions && gridOptions.backendServiceApi) {
            if (gridOptions.pagination && Array.isArray(gridOptions.pagination.pageSizes) && gridOptions.pagination.pageSizes.length > 0) {
                options.pagination.pageSizes = gridOptions.pagination.pageSizes;
            }
        }
        // also make sure to show the header row if user have enabled filtering
        this._hideHeaderRowAfterPageLoad = (options.showHeaderRow === false);
        if (options.enableFiltering && !options.showHeaderRow) {
            options.showHeaderRow = options.enableFiltering;
        }
        return options;
    };
    /**
     * On a Pagination changed, we will trigger a Grid State changed with the new pagination info
     * Also if we use Row Selection or the Checkbox Selector, we need to reset any selection
     */
    /**
     * On a Pagination changed, we will trigger a Grid State changed with the new pagination info
     * Also if we use Row Selection or the Checkbox Selector, we need to reset any selection
     * @param {?} pagination
     * @return {?}
     */
    AngularSlickgridComponent.prototype.paginationChanged = /**
     * On a Pagination changed, we will trigger a Grid State changed with the new pagination info
     * Also if we use Row Selection or the Checkbox Selector, we need to reset any selection
     * @param {?} pagination
     * @return {?}
     */
    function (pagination) {
        if (this.gridOptions.enableRowSelection || this.gridOptions.enableCheckboxSelector) {
            this.gridService.setSelectedRows([]);
        }
        this.gridStateService.onGridStateChanged.next({
            change: { newValues: pagination, type: GridStateType.pagination },
            gridState: this.gridStateService.getCurrentGridState()
        });
    };
    /**
     * When dataset changes, we need to refresh the entire grid UI & possibly resize it as well
     * @param dataset
     */
    /**
     * When dataset changes, we need to refresh the entire grid UI & possibly resize it as well
     * @param {?} dataset
     * @param {?=} totalCount
     * @return {?}
     */
    AngularSlickgridComponent.prototype.refreshGridData = /**
     * When dataset changes, we need to refresh the entire grid UI & possibly resize it as well
     * @param {?} dataset
     * @param {?=} totalCount
     * @return {?}
     */
    function (dataset, totalCount) {
        if (Array.isArray(dataset) && this.grid && this.dataView && typeof this.dataView.setItems === 'function') {
            this.dataView.setItems(dataset, this.gridOptions.datasetIdPropertyName);
            if (!this.gridOptions.backendServiceApi) {
                this.dataView.reSort();
            }
            if (dataset) {
                this.grid.invalidate();
                this.grid.render();
            }
            if (this.gridOptions.backendServiceApi) {
                // do we want to show pagination?
                // if we have a backendServiceApi and the enablePagination is undefined, we'll assume that we do want to see it, else get that defined value
                this.showPagination = ((this.gridOptions.backendServiceApi && this.gridOptions.enablePagination === undefined) ? true : this.gridOptions.enablePagination) || false;
                // before merging the grid options, make sure that it has the totalItems count
                // once we have that, we can merge and pass all these options to the pagination component
                if (!this.gridOptions.pagination) {
                    this.gridOptions.pagination = (this.gridOptions.pagination) ? this.gridOptions.pagination : undefined;
                }
                if (this.gridOptions.pagination && totalCount !== undefined) {
                    this.gridOptions.pagination.totalItems = totalCount;
                }
                if (this.gridOptions.presets && this.gridOptions.presets.pagination && this.gridOptions.pagination) {
                    this.gridOptions.pagination.pageSize = this.gridOptions.presets.pagination.pageSize;
                    this.gridOptions.pagination.pageNumber = this.gridOptions.presets.pagination.pageNumber;
                }
                this.gridPaginationOptions = this.mergeGridOptions(this.gridOptions);
            }
            // resize the grid inside a slight timeout, in case other DOM element changed prior to the resize (like a filter/pagination changed)
            if (this.grid && this.gridOptions.enableAutoResize) {
                /** @type {?} */
                var delay = this.gridOptions.autoResize && this.gridOptions.autoResize.delay;
                this.resizer.resizeGrid(delay || 10);
            }
        }
    };
    /**
     * Dynamically change or update the column definitions list.
     * We will re-render the grid so that the new header and data shows up correctly.
     * If using i18n, we also need to trigger a re-translate of the column headers
     */
    /**
     * Dynamically change or update the column definitions list.
     * We will re-render the grid so that the new header and data shows up correctly.
     * If using i18n, we also need to trigger a re-translate of the column headers
     * @param {?} newColumnDefinitions
     * @return {?}
     */
    AngularSlickgridComponent.prototype.updateColumnDefinitionsList = /**
     * Dynamically change or update the column definitions list.
     * We will re-render the grid so that the new header and data shows up correctly.
     * If using i18n, we also need to trigger a re-translate of the column headers
     * @param {?} newColumnDefinitions
     * @return {?}
     */
    function (newColumnDefinitions) {
        if (this.gridOptions.enableTranslate) {
            this.extensionService.translateColumnHeaders(false, newColumnDefinitions);
        }
        else {
            this.extensionService.renderColumnHeaders(newColumnDefinitions);
        }
        if (this.gridOptions && this.gridOptions.enableAutoSizeColumns) {
            this.grid.autosizeColumns();
        }
    };
    /** Toggle the filter row displayed on first row
     * @param isShowing
     */
    /**
     * Toggle the filter row displayed on first row
     * @param {?} isShowing
     * @return {?}
     */
    AngularSlickgridComponent.prototype.showHeaderRow = /**
     * Toggle the filter row displayed on first row
     * @param {?} isShowing
     * @return {?}
     */
    function (isShowing) {
        this.grid.setHeaderRowVisibility(isShowing);
        return isShowing;
    };
    /** Toggle the filter row displayed on first row */
    /**
     * Toggle the filter row displayed on first row
     * @return {?}
     */
    AngularSlickgridComponent.prototype.toggleHeaderRow = /**
     * Toggle the filter row displayed on first row
     * @return {?}
     */
    function () {
        /** @type {?} */
        var isShowing = !this.grid.getOptions().showHeaderRow;
        this.grid.setHeaderRowVisibility(isShowing);
        return isShowing;
    };
    //
    // private functions
    // ------------------
    /** Dispatch of Custom Event, which by default will bubble & is cancelable */
    //
    // private functions
    // ------------------
    /**
     * Dispatch of Custom Event, which by default will bubble & is cancelable
     * @private
     * @param {?} eventName
     * @param {?=} data
     * @param {?=} isBubbling
     * @param {?=} isCancelable
     * @return {?}
     */
    AngularSlickgridComponent.prototype.dispatchCustomEvent = 
    //
    // private functions
    // ------------------
    /**
     * Dispatch of Custom Event, which by default will bubble & is cancelable
     * @private
     * @param {?} eventName
     * @param {?=} data
     * @param {?=} isBubbling
     * @param {?=} isCancelable
     * @return {?}
     */
    function (eventName, data, isBubbling, isCancelable) {
        if (isBubbling === void 0) { isBubbling = true; }
        if (isCancelable === void 0) { isCancelable = true; }
        /** @type {?} */
        var eventInit = { bubbles: isBubbling, cancelable: isCancelable };
        if (data) {
            eventInit.detail = data;
        }
        return this.elm.nativeElement.dispatchEvent(new CustomEvent(eventName, eventInit));
    };
    /** Load the Editor Collection asynchronously and replace the "collection" property when Observable resolves */
    /**
     * Load the Editor Collection asynchronously and replace the "collection" property when Observable resolves
     * @private
     * @param {?} column
     * @return {?}
     */
    AngularSlickgridComponent.prototype.loadEditorCollectionAsync = /**
     * Load the Editor Collection asynchronously and replace the "collection" property when Observable resolves
     * @private
     * @param {?} column
     * @return {?}
     */
    function (column) {
        var _this = this;
        /** @type {?} */
        var collectionAsync = column && column.editor && column.editor.collectionAsync;
        if (collectionAsync instanceof Observable) {
            this.subscriptions.push(collectionAsync.subscribe((/**
             * @param {?} resolvedCollection
             * @return {?}
             */
            function (resolvedCollection) { return _this.updateEditorCollection(column, resolvedCollection); })));
        }
    };
    /**
     * Update the Editor "collection" property from an async call resolved
     * Since this is called after the async call resolves, the pointer will not be the same as the "column" argument passed.
     * Once we found the new pointer, we will reassign the "editor" and "collection" to the "internalColumnEditor" so it has newest collection
     */
    /**
     * Update the Editor "collection" property from an async call resolved
     * Since this is called after the async call resolves, the pointer will not be the same as the "column" argument passed.
     * Once we found the new pointer, we will reassign the "editor" and "collection" to the "internalColumnEditor" so it has newest collection
     * @private
     * @param {?} column
     * @param {?} newCollection
     * @return {?}
     */
    AngularSlickgridComponent.prototype.updateEditorCollection = /**
     * Update the Editor "collection" property from an async call resolved
     * Since this is called after the async call resolves, the pointer will not be the same as the "column" argument passed.
     * Once we found the new pointer, we will reassign the "editor" and "collection" to the "internalColumnEditor" so it has newest collection
     * @private
     * @param {?} column
     * @param {?} newCollection
     * @return {?}
     */
    function (column, newCollection) {
        column.editor.collection = newCollection;
        // find the new column reference pointer
        /** @type {?} */
        var columns = this.grid.getColumns();
        if (Array.isArray(columns)) {
            /** @type {?} */
            var columnRef = columns.find((/**
             * @param {?} col
             * @return {?}
             */
            function (col) { return col.id === column.id; }));
            columnRef.internalColumnEditor = column.editor;
        }
    };
    AngularSlickgridComponent.decorators = [
        { type: Injectable },
        { type: Component, args: [{
                    selector: 'angular-slickgrid',
                    template: "<div id=\"slickGridContainer-{{gridId}}\" class=\"gridPane\" [style.width]=\"gridWidthString\">\r\n    <div attr.id='{{gridId}}' class=\"slickgrid-container\" style=\"width: 100%\" [style.height]=\"gridHeightString\">\r\n    </div>\r\n\r\n    <slick-pagination id=\"slickPagingContainer-{{gridId}}\"\r\n        *ngIf=\"showPagination\"\r\n        (onPaginationChanged)=\"paginationChanged($event)\"\r\n        [dataView]=\"dataView\"\r\n        [gridPaginationOptions]=\"gridPaginationOptions\">\r\n    </slick-pagination>\r\n</div>\r\n",
                    providers: [
                        // make everything transient (non-singleton)
                        AngularUtilService,
                        AutoTooltipExtension,
                        CellExternalCopyManagerExtension,
                        CheckboxSelectorExtension,
                        ColumnPickerExtension,
                        DraggableGroupingExtension,
                        ExtensionService,
                        ExportService,
                        ExtensionUtility,
                        FilterFactory,
                        FilterService,
                        GraphqlService,
                        GridEventService,
                        GridMenuExtension,
                        GridService,
                        GridStateService,
                        GroupingAndColspanService,
                        GroupItemMetaProviderExtension,
                        HeaderButtonExtension,
                        HeaderMenuExtension,
                        ResizerService,
                        RowDetailViewExtension,
                        RowMoveManagerExtension,
                        RowSelectionExtension,
                        SharedService,
                        SortService,
                        SlickgridConfig
                    ]
                }] }
    ];
    /** @nocollapse */
    AngularSlickgridComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ExportService },
        { type: ExtensionService },
        { type: ExtensionUtility },
        { type: FilterService },
        { type: GridService },
        { type: GridEventService },
        { type: GridStateService },
        { type: GroupingAndColspanService },
        { type: ResizerService },
        { type: SharedService },
        { type: SortService },
        { type: TranslateService },
        { type: undefined, decorators: [{ type: Inject, args: ['config',] }] }
    ]; };
    AngularSlickgridComponent.propDecorators = {
        onAngularGridCreated: [{ type: Output }],
        onDataviewCreated: [{ type: Output }],
        onGridCreated: [{ type: Output }],
        onGridInitialized: [{ type: Output }],
        onBeforeGridCreate: [{ type: Output }],
        onBeforeGridDestroy: [{ type: Output }],
        onAfterGridDestroyed: [{ type: Output }],
        onGridStateChanged: [{ type: Output }],
        customDataView: [{ type: Input }],
        gridId: [{ type: Input }],
        gridOptions: [{ type: Input }],
        gridHeight: [{ type: Input }],
        gridWidth: [{ type: Input }],
        columnDefinitions: [{ type: Input }],
        dataset: [{ type: Input }]
    };
    return AngularSlickgridComponent;
}());
export { AngularSlickgridComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype._dataset;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype._columnDefinitions;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype._fixedHeight;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype._fixedWidth;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype._hideHeaderRowAfterPageLoad;
    /** @type {?} */
    AngularSlickgridComponent.prototype.dataView;
    /** @type {?} */
    AngularSlickgridComponent.prototype.grid;
    /** @type {?} */
    AngularSlickgridComponent.prototype.gridPaginationOptions;
    /** @type {?} */
    AngularSlickgridComponent.prototype.gridHeightString;
    /** @type {?} */
    AngularSlickgridComponent.prototype.gridWidthString;
    /** @type {?} */
    AngularSlickgridComponent.prototype.groupingDefinition;
    /** @type {?} */
    AngularSlickgridComponent.prototype.groupItemMetadataProvider;
    /** @type {?} */
    AngularSlickgridComponent.prototype.showPagination;
    /** @type {?} */
    AngularSlickgridComponent.prototype.isGridInitialized;
    /** @type {?} */
    AngularSlickgridComponent.prototype.subscriptions;
    /** @type {?} */
    AngularSlickgridComponent.prototype.onAngularGridCreated;
    /** @type {?} */
    AngularSlickgridComponent.prototype.onDataviewCreated;
    /** @type {?} */
    AngularSlickgridComponent.prototype.onGridCreated;
    /** @type {?} */
    AngularSlickgridComponent.prototype.onGridInitialized;
    /** @type {?} */
    AngularSlickgridComponent.prototype.onBeforeGridCreate;
    /** @type {?} */
    AngularSlickgridComponent.prototype.onBeforeGridDestroy;
    /** @type {?} */
    AngularSlickgridComponent.prototype.onAfterGridDestroyed;
    /** @type {?} */
    AngularSlickgridComponent.prototype.onGridStateChanged;
    /** @type {?} */
    AngularSlickgridComponent.prototype.customDataView;
    /** @type {?} */
    AngularSlickgridComponent.prototype.gridId;
    /** @type {?} */
    AngularSlickgridComponent.prototype.gridOptions;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.elm;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.exportService;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.extensionService;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.extensionUtility;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.filterService;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.gridService;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.gridEventService;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.gridStateService;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.groupingAndColspanService;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.resizer;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.sharedService;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.sortService;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.translate;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.forRootConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1zbGlja2dyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9jb21wb25lbnRzL2FuZ3VsYXItc2xpY2tncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUEsT0FBTywwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLHVDQUF1QyxDQUFDO0FBQy9DLE9BQU8sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLDBCQUEwQixDQUFDOztBQUdsQyxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDekksT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9FLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRyxPQUFPLEVBSUwsYUFBYSxFQUliLGFBQWEsR0FFZCxNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQWdCLE1BQU0sTUFBTSxDQUFDOztBQUc5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThC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REFBc0Q7O0lBQ3RELGtEQUFrRDs7SUFDbEQsc0RBQXNEOztJQUN0RCx1REFBMkQ7O0lBQzNELHdEQUF3RDs7SUFDeEQseURBQTZEOztJQUM3RCx1REFBbUU7O0lBQ25FLG1EQUE2Qjs7SUFDN0IsMkNBQXdCOztJQUN4QixnREFBaUM7Ozs7O0lBK0IvQix3Q0FBdUI7Ozs7O0lBQ3ZCLGtEQUFvQzs7Ozs7SUFDcEMscURBQTBDOzs7OztJQUMxQyxxREFBMEM7Ozs7O0lBQzFDLGtEQUFvQzs7Ozs7SUFDcEMsZ0RBQWdDOzs7OztJQUNoQyxxREFBMEM7Ozs7O0lBQzFDLHFEQUEwQzs7Ozs7SUFDMUMsOERBQTREOzs7OztJQUM1RCw0Q0FBK0I7Ozs7O0lBQy9CLGtEQUFvQzs7Ozs7SUFDcEMsZ0RBQWdDOzs7OztJQUNoQyw4Q0FBbUM7Ozs7O0lBQ25DLGtEQUFtRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCAzcmQgcGFydHkgdmVuZG9yIGxpYnNcclxuLy8gb25seSBpbXBvcnQgdGhlIG5lY2Vzc2FyeSBjb3JlIGxpYiwgZWFjaCB3aWxsIGJlIGltcG9ydGVkIG9uIGRlbWFuZCB3aGVuIGVuYWJsZWQgKHZpYSByZXF1aXJlKVxyXG5pbXBvcnQgJ2pxdWVyeS11aS1kaXN0L2pxdWVyeS11aSc7XHJcbmltcG9ydCAnc2xpY2tncmlkL2xpYi9qcXVlcnkuZXZlbnQuZHJhZy0yLjMuMCc7XHJcbmltcG9ydCAnc2xpY2tncmlkL3NsaWNrLmNvcmUnO1xyXG5pbXBvcnQgJ3NsaWNrZ3JpZC9zbGljay5ncmlkJztcclxuaW1wb3J0ICdzbGlja2dyaWQvc2xpY2suZGF0YXZpZXcnO1xyXG5cclxuLy8gLi4udGhlbiBldmVyeXRoaW5nIGVsc2UuLi5cclxuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5qZWN0YWJsZSwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBHbG9iYWxHcmlkT3B0aW9ucyB9IGZyb20gJy4vLi4vZ2xvYmFsLWdyaWQtb3B0aW9ucyc7XHJcbmltcG9ydCB7IHRpdGxlQ2FzZSwgdW5zdWJzY3JpYmVBbGxPYnNlcnZhYmxlcyB9IGZyb20gJy4vLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgZXhlY3V0ZUJhY2tlbmRQcm9jZXNzZXNDYWxsYmFjaywgb25CYWNrZW5kRXJyb3IgfSBmcm9tICcuLi9zZXJ2aWNlcy9iYWNrZW5kLXV0aWxpdGllcyc7XHJcbmltcG9ydCB7XHJcbiAgQW5ndWxhckdyaWRJbnN0YW5jZSxcclxuICBCYWNrZW5kU2VydmljZU9wdGlvbixcclxuICBDb2x1bW4sXHJcbiAgRXh0ZW5zaW9uTmFtZSxcclxuICBHcmFwaHFsUmVzdWx0LFxyXG4gIEdyaWRPcHRpb24sXHJcbiAgR3JpZFN0YXRlQ2hhbmdlLFxyXG4gIEdyaWRTdGF0ZVR5cGUsXHJcbiAgUGFnaW5hdGlvbixcclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IEZpbHRlckZhY3RvcnkgfSBmcm9tICcuLi9maWx0ZXJzL2ZpbHRlckZhY3RvcnknO1xyXG5pbXBvcnQgeyBTbGlja2dyaWRDb25maWcgfSBmcm9tICcuLi9zbGlja2dyaWQtY29uZmlnJztcclxuaW1wb3J0IHsgaXNPYnNlcnZhYmxlLCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbi8vIFNlcnZpY2VzXHJcbmltcG9ydCB7IEFuZ3VsYXJVdGlsU2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvYW5ndWxhclV0aWxTZXJ2aWNlJztcclxuaW1wb3J0IHsgRXhwb3J0U2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvZXhwb3J0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBFeHRlbnNpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZXh0ZW5zaW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBFeHRlbnNpb25VdGlsaXR5IH0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9leHRlbnNpb25VdGlsaXR5JztcclxuaW1wb3J0IHsgRmlsdGVyU2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvZmlsdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHcmFwaHFsU2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvZ3JhcGhxbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR3JpZEV2ZW50U2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvZ3JpZEV2ZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHcmlkU2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvZ3JpZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR3JpZFN0YXRlU2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvZ3JpZFN0YXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHcm91cGluZ0FuZENvbHNwYW5TZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ncm91cGluZ0FuZENvbHNwYW4uc2VydmljZSc7XHJcbmltcG9ydCB7IFJlc2l6ZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9yZXNpemVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTb3J0U2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvc29ydC5zZXJ2aWNlJztcclxuXHJcbi8vIEV4dGVuc2lvbnMgKFNsaWNrR3JpZCBDb250cm9scyAmIFBsdWdpbnMpXHJcbmltcG9ydCB7IEF1dG9Ub29sdGlwRXh0ZW5zaW9uIH0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9hdXRvVG9vbHRpcEV4dGVuc2lvbic7XHJcbmltcG9ydCB7IENlbGxFeHRlcm5hbENvcHlNYW5hZ2VyRXh0ZW5zaW9uIH0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9jZWxsRXh0ZXJuYWxDb3B5TWFuYWdlckV4dGVuc2lvbic7XHJcbmltcG9ydCB7IENoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2NoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24nO1xyXG5pbXBvcnQgeyBDb2x1bW5QaWNrZXJFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2NvbHVtblBpY2tlckV4dGVuc2lvbic7XHJcbmltcG9ydCB7IERyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uIH0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9kcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbic7XHJcbmltcG9ydCB7IEdyaWRNZW51RXh0ZW5zaW9uIH0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9ncmlkTWVudUV4dGVuc2lvbic7XHJcbmltcG9ydCB7IEdyb3VwSXRlbU1ldGFQcm92aWRlckV4dGVuc2lvbiB9IGZyb20gJy4uL2V4dGVuc2lvbnMvZ3JvdXBJdGVtTWV0YVByb3ZpZGVyRXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgSGVhZGVyQnV0dG9uRXh0ZW5zaW9uIH0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9oZWFkZXJCdXR0b25FeHRlbnNpb24nO1xyXG5pbXBvcnQgeyBIZWFkZXJNZW51RXh0ZW5zaW9uIH0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9oZWFkZXJNZW51RXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgUm93RGV0YWlsVmlld0V4dGVuc2lvbiB9IGZyb20gJy4uL2V4dGVuc2lvbnMvcm93RGV0YWlsVmlld0V4dGVuc2lvbic7XHJcbmltcG9ydCB7IFJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uIH0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9yb3dNb3ZlTWFuYWdlckV4dGVuc2lvbic7XHJcbmltcG9ydCB7IFJvd1NlbGVjdGlvbkV4dGVuc2lvbiB9IGZyb20gJy4uL2V4dGVuc2lvbnMvcm93U2VsZWN0aW9uRXh0ZW5zaW9uJztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcclxuZGVjbGFyZSB2YXIgJDogYW55O1xyXG5cclxuY29uc3Qgc2xpY2tncmlkRXZlbnRQcmVmaXggPSAnc2cnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FuZ3VsYXItc2xpY2tncmlkJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYW5ndWxhci1zbGlja2dyaWQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgLy8gbWFrZSBldmVyeXRoaW5nIHRyYW5zaWVudCAobm9uLXNpbmdsZXRvbilcclxuICAgIEFuZ3VsYXJVdGlsU2VydmljZSxcclxuICAgIEF1dG9Ub29sdGlwRXh0ZW5zaW9uLFxyXG4gICAgQ2VsbEV4dGVybmFsQ29weU1hbmFnZXJFeHRlbnNpb24sXHJcbiAgICBDaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uLFxyXG4gICAgQ29sdW1uUGlja2VyRXh0ZW5zaW9uLFxyXG4gICAgRHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24sXHJcbiAgICBFeHRlbnNpb25TZXJ2aWNlLFxyXG4gICAgRXhwb3J0U2VydmljZSxcclxuICAgIEV4dGVuc2lvblV0aWxpdHksXHJcbiAgICBGaWx0ZXJGYWN0b3J5LFxyXG4gICAgRmlsdGVyU2VydmljZSxcclxuICAgIEdyYXBocWxTZXJ2aWNlLFxyXG4gICAgR3JpZEV2ZW50U2VydmljZSxcclxuICAgIEdyaWRNZW51RXh0ZW5zaW9uLFxyXG4gICAgR3JpZFNlcnZpY2UsXHJcbiAgICBHcmlkU3RhdGVTZXJ2aWNlLFxyXG4gICAgR3JvdXBpbmdBbmRDb2xzcGFuU2VydmljZSxcclxuICAgIEdyb3VwSXRlbU1ldGFQcm92aWRlckV4dGVuc2lvbixcclxuICAgIEhlYWRlckJ1dHRvbkV4dGVuc2lvbixcclxuICAgIEhlYWRlck1lbnVFeHRlbnNpb24sXHJcbiAgICBSZXNpemVyU2VydmljZSxcclxuICAgIFJvd0RldGFpbFZpZXdFeHRlbnNpb24sXHJcbiAgICBSb3dNb3ZlTWFuYWdlckV4dGVuc2lvbixcclxuICAgIFJvd1NlbGVjdGlvbkV4dGVuc2lvbixcclxuICAgIFNoYXJlZFNlcnZpY2UsXHJcbiAgICBTb3J0U2VydmljZSxcclxuICAgIFNsaWNrZ3JpZENvbmZpZ1xyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJTbGlja2dyaWRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIE9uSW5pdCB7XHJcbiAgcHJpdmF0ZSBfZGF0YXNldDogYW55W107XHJcbiAgcHJpdmF0ZSBfY29sdW1uRGVmaW5pdGlvbnM6IENvbHVtbltdO1xyXG4gIHByaXZhdGUgX2V2ZW50SGFuZGxlcjogYW55ID0gbmV3IFNsaWNrLkV2ZW50SGFuZGxlcigpO1xyXG4gIHByaXZhdGUgX2ZpeGVkSGVpZ2h0OiBudW1iZXIgfCBudWxsO1xyXG4gIHByaXZhdGUgX2ZpeGVkV2lkdGg6IG51bWJlciB8IG51bGw7XHJcbiAgcHJpdmF0ZSBfaGlkZUhlYWRlclJvd0FmdGVyUGFnZUxvYWQgPSBmYWxzZTtcclxuICBkYXRhVmlldzogYW55O1xyXG4gIGdyaWQ6IGFueTtcclxuICBncmlkUGFnaW5hdGlvbk9wdGlvbnM6IEdyaWRPcHRpb247XHJcbiAgZ3JpZEhlaWdodFN0cmluZzogc3RyaW5nO1xyXG4gIGdyaWRXaWR0aFN0cmluZzogc3RyaW5nO1xyXG4gIGdyb3VwaW5nRGVmaW5pdGlvbjogYW55ID0ge307XHJcbiAgZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlcjogYW55O1xyXG4gIHNob3dQYWdpbmF0aW9uID0gZmFsc2U7XHJcbiAgaXNHcmlkSW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICBAT3V0cHV0KCkgb25Bbmd1bGFyR3JpZENyZWF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEFuZ3VsYXJHcmlkSW5zdGFuY2U+KCk7XHJcbiAgQE91dHB1dCgpIG9uRGF0YXZpZXdDcmVhdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIG9uR3JpZENyZWF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgb25HcmlkSW5pdGlhbGl6ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgb25CZWZvcmVHcmlkQ3JlYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gIEBPdXRwdXQoKSBvbkJlZm9yZUdyaWREZXN0cm95ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIG9uQWZ0ZXJHcmlkRGVzdHJveWVkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gIEBPdXRwdXQoKSBvbkdyaWRTdGF0ZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEdyaWRTdGF0ZUNoYW5nZT4oKTtcclxuICBASW5wdXQoKSBjdXN0b21EYXRhVmlldzogYW55O1xyXG4gIEBJbnB1dCgpIGdyaWRJZDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBncmlkSGVpZ2h0KGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9maXhlZEhlaWdodCA9IGhlaWdodDtcclxuICB9XHJcbiAgQElucHV0KClcclxuICBzZXQgZ3JpZFdpZHRoKHdpZHRoOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2ZpeGVkV2lkdGggPSB3aWR0aDtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGNvbHVtbkRlZmluaXRpb25zKGNvbHVtbkRlZmluaXRpb25zOiBDb2x1bW5bXSkge1xyXG4gICAgdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMgPSBjb2x1bW5EZWZpbml0aW9ucztcclxuICAgIGlmICh0aGlzLmlzR3JpZEluaXRpYWxpemVkKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlQ29sdW1uRGVmaW5pdGlvbnNMaXN0KGNvbHVtbkRlZmluaXRpb25zKTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0IGNvbHVtbkRlZmluaXRpb25zKCk6IENvbHVtbltdIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucztcclxuICB9XHJcbiAgQElucHV0KClcclxuICBzZXQgZGF0YXNldChkYXRhc2V0OiBhbnlbXSkge1xyXG4gICAgdGhpcy5fZGF0YXNldCA9IGRhdGFzZXQ7XHJcbiAgICB0aGlzLnJlZnJlc2hHcmlkRGF0YShkYXRhc2V0KTtcclxuICB9XHJcbiAgZ2V0IGRhdGFzZXQoKTogYW55W10ge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YVZpZXcuZ2V0SXRlbXMoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbG06IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIGV4cG9ydFNlcnZpY2U6IEV4cG9ydFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGV4dGVuc2lvblNlcnZpY2U6IEV4dGVuc2lvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGV4dGVuc2lvblV0aWxpdHk6IEV4dGVuc2lvblV0aWxpdHksXHJcbiAgICBwcml2YXRlIGZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGdyaWRTZXJ2aWNlOiBHcmlkU2VydmljZSxcclxuICAgIHByaXZhdGUgZ3JpZEV2ZW50U2VydmljZTogR3JpZEV2ZW50U2VydmljZSxcclxuICAgIHByaXZhdGUgZ3JpZFN0YXRlU2VydmljZTogR3JpZFN0YXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgZ3JvdXBpbmdBbmRDb2xzcGFuU2VydmljZTogR3JvdXBpbmdBbmRDb2xzcGFuU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVzaXplcjogUmVzaXplclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHNvcnRTZXJ2aWNlOiBTb3J0U2VydmljZSxcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICAgQEluamVjdCgnY29uZmlnJykgcHJpdmF0ZSBmb3JSb290Q29uZmlnOiBHcmlkT3B0aW9uXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQmVmb3JlR3JpZENyZWF0ZS5lbWl0KHRydWUpO1xyXG5cclxuICAgIGlmICh0aGlzLmdyaWRPcHRpb25zICYmICF0aGlzLmdyaWRPcHRpb25zLmVuYWJsZUF1dG9SZXNpemUgJiYgKHRoaXMuX2ZpeGVkSGVpZ2h0IHx8IHRoaXMuX2ZpeGVkV2lkdGgpKSB7XHJcbiAgICAgIHRoaXMuZ3JpZEhlaWdodFN0cmluZyA9IGAke3RoaXMuX2ZpeGVkSGVpZ2h0fXB4YDtcclxuICAgICAgdGhpcy5ncmlkV2lkdGhTdHJpbmcgPSBgJHt0aGlzLl9maXhlZFdpZHRofXB4YDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkJlZm9yZUdyaWREZXN0cm95LmVtaXQodGhpcy5ncmlkKTtcclxuICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgdGhpcy5vbkFmdGVyR3JpZERlc3Ryb3llZC5lbWl0KHRydWUpO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveShlbXB0eURvbUVsZW1lbnRDb250YWluZXIgPSBmYWxzZSkge1xyXG4gICAgY29uc3QgZ3JpZENvbnRhaW5lcklkID0gdGhpcy5ncmlkT3B0aW9ucyAmJiB0aGlzLmdyaWRPcHRpb25zLmdyaWRDb250YWluZXJJZDtcclxuICAgIHRoaXMuZGF0YVZpZXcgPSBbXTtcclxuICAgIHRoaXMuZ3JpZE9wdGlvbnMgPSB7fTtcclxuICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS5kaXNwb3NlKCk7XHJcbiAgICB0aGlzLmZpbHRlclNlcnZpY2UuZGlzcG9zZSgpO1xyXG4gICAgdGhpcy5ncmlkRXZlbnRTZXJ2aWNlLmRpc3Bvc2UoKTtcclxuICAgIHRoaXMuZ3JpZFN0YXRlU2VydmljZS5kaXNwb3NlKCk7XHJcbiAgICB0aGlzLmdyb3VwaW5nQW5kQ29sc3BhblNlcnZpY2UuZGlzcG9zZSgpO1xyXG4gICAgdGhpcy5yZXNpemVyLmRpc3Bvc2UoKTtcclxuICAgIHRoaXMuc29ydFNlcnZpY2UuZGlzcG9zZSgpO1xyXG4gICAgaWYgKHRoaXMuX2V2ZW50SGFuZGxlciAmJiB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwpIHtcclxuICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnVuc3Vic2NyaWJlQWxsKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5ncmlkICYmIHRoaXMuZ3JpZC5kZXN0cm95KSB7XHJcbiAgICAgIHRoaXMuZ3JpZC5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVtcHR5RG9tRWxlbWVudENvbnRhaW5lcikge1xyXG4gICAgICAkKGdyaWRDb250YWluZXJJZCkuZW1wdHkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhbHNvIHVuc3Vic2NyaWJlIGFsbCBSeEpTIHN1YnNjcmlwdGlvbnNcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IHVuc3Vic2NyaWJlQWxsT2JzZXJ2YWJsZXModGhpcy5zdWJzY3JpcHRpb25zKTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuaW5pdGlhbGl6YXRpb24oKTtcclxuICAgIHRoaXMuaXNHcmlkSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG5cclxuICAgIC8vIHVzZXIgbXVzdCBwcm92aWRlIGEgXCJncmlkSGVpZ2h0XCIgb3IgdXNlIFwiYXV0b1Jlc2l6ZTogdHJ1ZVwiIGluIHRoZSBncmlkIG9wdGlvbnNcclxuICAgIGlmICghdGhpcy5fZml4ZWRIZWlnaHQgJiYgIXRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1Jlc2l6ZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgYFtBbmd1bGFyLVNsaWNrZ3JpZF0gcmVxdWlyZXMgYSBcImdyaWQtaGVpZ2h0XCIgb3IgdGhlIFwiZW5hYmxlQXV0b1Jlc2l6ZVwiIGdyaWQgb3B0aW9uIHRvIGJlIGVuYWJsZWQuXHJcbiAgICAgICAgV2l0aG91dCB0aGF0IHRoZSBncmlkIHdpbGwgc2VlbSBlbXB0eSB3aGlsZSBpbiBmYWN0IGl0IGp1c3QgZG9lcyBub3QgaGF2ZSBhbnkgaGVpZ2h0IGRlZmluZS5gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXphdGlvbigpIHtcclxuICAgIC8vIG1ha2Ugc3VyZSB0aGUgZGF0YXNldCBpcyBpbml0aWFsaXplZCAoaWYgbm90IGl0IHdpbGwgdGhyb3cgYW4gZXJyb3IgdGhhdCBpdCBjYW5ub3QgZ2V0TGVuZ3RoIG9mIG51bGwpXHJcbiAgICB0aGlzLl9kYXRhc2V0ID0gdGhpcy5fZGF0YXNldCB8fCBbXTtcclxuICAgIHRoaXMuZ3JpZE9wdGlvbnMgPSB0aGlzLm1lcmdlR3JpZE9wdGlvbnModGhpcy5ncmlkT3B0aW9ucyk7XHJcbiAgICB0aGlzLmNyZWF0ZUJhY2tlbmRBcGlJbnRlcm5hbFBvc3RQcm9jZXNzQ2FsbGJhY2sodGhpcy5ncmlkT3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmN1c3RvbURhdGFWaWV3KSB7XHJcbiAgICAgIGlmICh0aGlzLmdyaWRPcHRpb25zLmRyYWdnYWJsZUdyb3VwaW5nIHx8IHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlR3JvdXBpbmcpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkubG9hZEV4dGVuc2lvbkR5bmFtaWNhbGx5KEV4dGVuc2lvbk5hbWUuZ3JvdXBJdGVtTWV0YVByb3ZpZGVyKTtcclxuICAgICAgICB0aGlzLmdyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXIgPSBuZXcgU2xpY2suRGF0YS5Hcm91cEl0ZW1NZXRhZGF0YVByb3ZpZGVyKCk7XHJcbiAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXIgPSB0aGlzLmdyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXI7XHJcbiAgICAgICAgdGhpcy5kYXRhVmlldyA9IG5ldyBTbGljay5EYXRhLkRhdGFWaWV3KHsgZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlcjogdGhpcy5ncm91cEl0ZW1NZXRhZGF0YVByb3ZpZGVyIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZGF0YVZpZXcgPSBuZXcgU2xpY2suRGF0YS5EYXRhVmlldygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZm9yIGNvbnZlbmllbmNlLCB3ZSBwcm92aWRlIHRoZSBwcm9wZXJ0eSBcImVkaXRvclwiIGFzIGFuIEFuZ3VsYXItU2xpY2tncmlkIGVkaXRvciBjb21wbGV4IG9iamVjdFxyXG4gICAgLy8gaG93ZXZlciBcImVkaXRvclwiIGlzIHVzZWQgaW50ZXJuYWxseSBieSBTbGlja0dyaWQgZm9yIGl0J3Mgb3duIEVkaXRvciBGYWN0b3J5XHJcbiAgICAvLyBzbyBpbiBvdXIgbGliIHdlIHdpbGwgc3dhcCBcImVkaXRvclwiIGFuZCBjb3B5IGl0IGludG8gYSBuZXcgcHJvcGVydHkgY2FsbGVkIFwiaW50ZXJuYWxDb2x1bW5FZGl0b3JcIlxyXG4gICAgLy8gdGhlbiB0YWtlIGJhY2sgXCJlZGl0b3IubW9kZWxcIiBhbmQgbWFrZSBpdCB0aGUgbmV3IFwiZWRpdG9yXCIgc28gdGhhdCBTbGlja0dyaWQgRWRpdG9yIEZhY3Rvcnkgc3RpbGwgd29ya3NcclxuICAgIHRoaXMuX2NvbHVtbkRlZmluaXRpb25zID0gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMubWFwKChjb2x1bW46IENvbHVtbiB8IGFueSkgPT4ge1xyXG4gICAgICAvLyBvbiBldmVyeSBFZGl0b3IgdGhhdCBoYXZlIGEgXCJjb2xsZWN0aW9uQXN5bmNcIiwgcmVzb2x2ZSB0aGUgZGF0YSBhbmQgYXNzaWduIGl0IHRvIHRoZSBcImNvbGxlY3Rpb25cIiBwcm9wZXJ0eVxyXG4gICAgICBpZiAoY29sdW1uLmVkaXRvciAmJiBjb2x1bW4uZWRpdG9yLmNvbGxlY3Rpb25Bc3luYykge1xyXG4gICAgICAgIHRoaXMubG9hZEVkaXRvckNvbGxlY3Rpb25Bc3luYyhjb2x1bW4pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB7IC4uLmNvbHVtbiwgZWRpdG9yOiBjb2x1bW4uZWRpdG9yICYmIGNvbHVtbi5lZGl0b3IubW9kZWwsIGludGVybmFsQ29sdW1uRWRpdG9yOiB7IC4uLmNvbHVtbi5lZGl0b3IgfSB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gc2F2ZSByZWZlcmVuY2UgZm9yIGFsbCBjb2x1bW5zIGJlZm9yZSB0aGV5IG9wdGlvbmFsbHkgYmVjb21lIGhpZGRlbi92aXNpYmxlXHJcbiAgICB0aGlzLnNoYXJlZFNlcnZpY2UuYWxsQ29sdW1ucyA9IHRoaXMuX2NvbHVtbkRlZmluaXRpb25zO1xyXG4gICAgdGhpcy5zaGFyZWRTZXJ2aWNlLnZpc2libGVDb2x1bW5zID0gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnM7XHJcbiAgICB0aGlzLmV4dGVuc2lvblNlcnZpY2UuY3JlYXRlRXh0ZW5zaW9uc0JlZm9yZUdyaWRDcmVhdGlvbih0aGlzLl9jb2x1bW5EZWZpbml0aW9ucywgdGhpcy5ncmlkT3B0aW9ucyk7XHJcblxyXG4gICAgLy8gYnVpbGQgU2xpY2tHcmlkIEdyaWQsIGFsc28gdXNlciBtaWdodCBvcHRpb25hbGx5IHBhc3MgYSBjdXN0b20gZGF0YXZpZXcgKGUuZy4gcmVtb3RlIG1vZGVsKVxyXG4gICAgdGhpcy5ncmlkID0gbmV3IFNsaWNrLkdyaWQoYCMke3RoaXMuZ3JpZElkfWAsIHRoaXMuY3VzdG9tRGF0YVZpZXcgfHwgdGhpcy5kYXRhVmlldywgdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMsIHRoaXMuZ3JpZE9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMuc2hhcmVkU2VydmljZS5kYXRhVmlldyA9IHRoaXMuZGF0YVZpZXc7XHJcbiAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCA9IHRoaXMuZ3JpZDtcclxuXHJcbiAgICB0aGlzLmV4dGVuc2lvblNlcnZpY2UuYXR0YWNoRGlmZmVyZW50RXh0ZW5zaW9ucygpO1xyXG4gICAgdGhpcy5hdHRhY2hEaWZmZXJlbnRIb29rcyh0aGlzLmdyaWQsIHRoaXMuZ3JpZE9wdGlvbnMsIHRoaXMuZGF0YVZpZXcpO1xyXG5cclxuICAgIC8vIGVtaXQgdGhlIEdyaWQgJiBEYXRhVmlldyBvYmplY3QgdG8gbWFrZSB0aGVtIGF2YWlsYWJsZSBpbiBwYXJlbnQgY29tcG9uZW50XHJcbiAgICB0aGlzLm9uR3JpZENyZWF0ZWQuZW1pdCh0aGlzLmdyaWQpO1xyXG5cclxuICAgIC8vIGluaXRpYWxpemUgdGhlIFNsaWNrR3JpZCBncmlkXHJcbiAgICB0aGlzLmdyaWQuaW5pdCgpO1xyXG5cclxuICAgIGlmICghdGhpcy5jdXN0b21EYXRhVmlldyAmJiAodGhpcy5kYXRhVmlldyAmJiB0aGlzLmRhdGFWaWV3LmJlZ2luVXBkYXRlICYmIHRoaXMuZGF0YVZpZXcuc2V0SXRlbXMgJiYgdGhpcy5kYXRhVmlldy5lbmRVcGRhdGUpKSB7XHJcbiAgICAgIHRoaXMub25EYXRhdmlld0NyZWF0ZWQuZW1pdCh0aGlzLmRhdGFWaWV3KTtcclxuICAgICAgdGhpcy5kYXRhVmlldy5iZWdpblVwZGF0ZSgpO1xyXG4gICAgICB0aGlzLmRhdGFWaWV3LnNldEl0ZW1zKHRoaXMuX2RhdGFzZXQsIHRoaXMuZ3JpZE9wdGlvbnMuZGF0YXNldElkUHJvcGVydHlOYW1lKTtcclxuICAgICAgdGhpcy5kYXRhVmlldy5lbmRVcGRhdGUoKTtcclxuXHJcbiAgICAgIC8vIGlmIHlvdSBkb24ndCB3YW50IHRoZSBpdGVtcyB0aGF0IGFyZSBub3QgdmlzaWJsZSAoZHVlIHRvIGJlaW5nIGZpbHRlcmVkIG91dFxyXG4gICAgICAvLyBvciBiZWluZyBvbiBhIGRpZmZlcmVudCBwYWdlKSB0byBzdGF5IHNlbGVjdGVkLCBwYXNzICdmYWxzZScgdG8gdGhlIHNlY29uZCBhcmdcclxuICAgICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMgJiYgdGhpcy5ncmlkT3B0aW9ucy5kYXRhVmlldyAmJiB0aGlzLmdyaWRPcHRpb25zLmRhdGFWaWV3Lmhhc093blByb3BlcnR5KCdzeW5jR3JpZFNlbGVjdGlvbicpKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhVmlldy5zeW5jR3JpZFNlbGVjdGlvbih0aGlzLmdyaWQsIHRoaXMuZ3JpZE9wdGlvbnMuZGF0YVZpZXcuc3luY0dyaWRTZWxlY3Rpb24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXNlciBtaWdodCB3YW50IHRvIGhpZGUgdGhlIGhlYWRlciByb3cgb24gcGFnZSBsb2FkIGJ1dCBzdGlsbCBoYXZlIGBlbmFibGVGaWx0ZXJpbmc6IHRydWVgXHJcbiAgICAvLyBpZiB0aGF0IGlzIHRoZSBjYXNlLCB3ZSBuZWVkIHRvIGhpZGUgdGhlIGhlYWRlclJvdyBPTkxZIEFGVEVSIGFsbCBmaWx0ZXJzIGdvdCBjcmVhdGVkICYgZGF0YVZpZXcgZXhpc3RcclxuICAgIGlmICh0aGlzLl9oaWRlSGVhZGVyUm93QWZ0ZXJQYWdlTG9hZCkge1xyXG4gICAgICB0aGlzLnNob3dIZWFkZXJSb3coZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFmdGVyIHRoZSBEYXRhVmlldyBpcyBjcmVhdGVkICYgdXBkYXRlZCBleGVjdXRlIHNvbWUgcHJvY2Vzc2VzXHJcbiAgICB0aGlzLmV4ZWN1dGVBZnRlckRhdGF2aWV3Q3JlYXRlZCh0aGlzLmdyaWQsIHRoaXMuZ3JpZE9wdGlvbnMsIHRoaXMuZGF0YVZpZXcpO1xyXG5cclxuICAgIC8vIGF0dGFjaCByZXNpemUgT05MWSBhZnRlciB0aGUgZGF0YVZpZXcgaXMgcmVhZHlcclxuICAgIHRoaXMuYXR0YWNoUmVzaXplSG9vayh0aGlzLmdyaWQsIHRoaXMuZ3JpZE9wdGlvbnMpO1xyXG5cclxuICAgIC8vIGF0dGFjaCBncm91cGluZyBhbmQgaGVhZGVyIGdyb3VwaW5nIGNvbHNwYW4gc2VydmljZVxyXG4gICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMuY3JlYXRlUHJlSGVhZGVyUGFuZWwgJiYgIXRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlRHJhZ2dhYmxlR3JvdXBpbmcpIHtcclxuICAgICAgdGhpcy5ncm91cGluZ0FuZENvbHNwYW5TZXJ2aWNlLmluaXQodGhpcy5ncmlkLCB0aGlzLmRhdGFWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhdHRhY2ggZ3JpZCAgc2VydmljZVxyXG4gICAgdGhpcy5ncmlkU2VydmljZS5pbml0KHRoaXMuZ3JpZCwgdGhpcy5kYXRhVmlldyk7XHJcblxyXG4gICAgLy8gd2hlbiB1c2VyIGVuYWJsZXMgdHJhbnNsYXRpb24sIHdlIG5lZWQgdG8gdHJhbnNsYXRlIEhlYWRlcnMgb24gZmlyc3QgcGFzcyAmIHN1YnNlcXVlbnRseSBpbiB0aGUgYXR0YWNoRGlmZmVyZW50SG9va3NcclxuICAgIGlmICh0aGlzLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSkge1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblNlcnZpY2UudHJhbnNsYXRlQ29sdW1uSGVhZGVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIEV4cG9ydCBpcyBlbmFibGVkLCBpbml0aWFsaXplIHRoZSBzZXJ2aWNlIHdpdGggdGhlIG5lY2Vzc2FyeSBncmlkIGFuZCBvdGhlciBvYmplY3RzXHJcbiAgICBpZiAodGhpcy5ncmlkT3B0aW9ucy5lbmFibGVFeHBvcnQpIHtcclxuICAgICAgdGhpcy5leHBvcnRTZXJ2aWNlLmluaXQodGhpcy5ncmlkLCB0aGlzLmRhdGFWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBvbmNlIGFsbCBob29rcyBhcmUgaW4gcGxhY2VkIGFuZCB0aGUgZ3JpZCBpcyBpbml0aWFsaXplZCwgd2UgY2FuIGVtaXQgYW4gZXZlbnRcclxuICAgIHRoaXMub25HcmlkSW5pdGlhbGl6ZWQuZW1pdCh0aGlzLmdyaWQpO1xyXG5cclxuICAgIC8vIGF0dGFjaCB0aGUgQmFja2VuZCBTZXJ2aWNlIEFQSSBjYWxsYmFjayBmdW5jdGlvbnMgb25seSBhZnRlciB0aGUgZ3JpZCBpcyBpbml0aWFsaXplZFxyXG4gICAgLy8gYmVjYXVzZSB0aGUgcHJlUHJvY2VzcygpIGFuZCBvbkluaXQoKSBtaWdodCBnZXQgdHJpZ2dlcmVkXHJcbiAgICBpZiAodGhpcy5ncmlkT3B0aW9ucyAmJiB0aGlzLmdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICAgIHRoaXMuYXR0YWNoQmFja2VuZENhbGxiYWNrRnVuY3Rpb25zKHRoaXMuZ3JpZE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ3JpZFN0YXRlU2VydmljZS5pbml0KHRoaXMuZ3JpZCwgdGhpcy5leHRlbnNpb25TZXJ2aWNlLCB0aGlzLmZpbHRlclNlcnZpY2UsIHRoaXMuc29ydFNlcnZpY2UpO1xyXG5cclxuICAgIHRoaXMub25Bbmd1bGFyR3JpZENyZWF0ZWQuZW1pdCh7XHJcbiAgICAgIC8vIFNsaWNrIEdyaWQgJiBEYXRhVmlldyBvYmplY3RzXHJcbiAgICAgIGRhdGFWaWV3OiB0aGlzLmRhdGFWaWV3LFxyXG4gICAgICBzbGlja0dyaWQ6IHRoaXMuZ3JpZCxcclxuXHJcbiAgICAgIC8vIHB1YmxpYyBtZXRob2RzXHJcbiAgICAgIGRlc3Ryb3k6IHRoaXMuZGVzdHJveS5iaW5kKHRoaXMpLFxyXG5cclxuICAgICAgLy8gcmV0dXJuIGFsbCBhdmFpbGFibGUgU2VydmljZXMgKG5vbi1zaW5nbGV0b24pXHJcbiAgICAgIGJhY2tlbmRTZXJ2aWNlOiB0aGlzLmdyaWRPcHRpb25zICYmIHRoaXMuZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkgJiYgdGhpcy5ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaS5zZXJ2aWNlLFxyXG4gICAgICBleHBvcnRTZXJ2aWNlOiB0aGlzLmV4cG9ydFNlcnZpY2UsXHJcbiAgICAgIGV4dGVuc2lvblNlcnZpY2U6IHRoaXMuZXh0ZW5zaW9uU2VydmljZSxcclxuICAgICAgZmlsdGVyU2VydmljZTogdGhpcy5maWx0ZXJTZXJ2aWNlLFxyXG4gICAgICBncmlkRXZlbnRTZXJ2aWNlOiB0aGlzLmdyaWRFdmVudFNlcnZpY2UsXHJcbiAgICAgIGdyaWRTdGF0ZVNlcnZpY2U6IHRoaXMuZ3JpZFN0YXRlU2VydmljZSxcclxuICAgICAgZ3JpZFNlcnZpY2U6IHRoaXMuZ3JpZFNlcnZpY2UsXHJcbiAgICAgIGdyb3VwaW5nU2VydmljZTogdGhpcy5ncm91cGluZ0FuZENvbHNwYW5TZXJ2aWNlLFxyXG4gICAgICByZXNpemVyU2VydmljZTogdGhpcy5yZXNpemVyLFxyXG4gICAgICBzb3J0U2VydmljZTogdGhpcy5zb3J0U2VydmljZSxcclxuXHJcbiAgICAgIC8qKiBAZGVwcmVjYXRlZCBwbGVhc2UgdXNlIFwiZXh0ZW5zaW9uU2VydmljZVwiIGluc3RlYWQgKi9cclxuICAgICAgcGx1Z2luU2VydmljZTogdGhpcy5leHRlbnNpb25TZXJ2aWNlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21taXRzIHRoZSBjdXJyZW50IGVkaXQgdG8gdGhlIGdyaWRcclxuICAgKi9cclxuICBjb21taXRFZGl0KHRhcmdldDogRWxlbWVudCkge1xyXG4gICAgaWYgKHRoaXMuZ3JpZC5nZXRPcHRpb25zKCkuYXV0b0NvbW1pdEVkaXQpIHtcclxuICAgICAgY29uc3QgYWN0aXZlTm9kZSA9IHRoaXMuZ3JpZC5nZXRBY3RpdmVDZWxsTm9kZSgpO1xyXG5cclxuICAgICAgLy8gYSB0aW1lb3V0IG11c3QgYmUgc2V0IG9yIHRoaXMgY291bGQgY29tZSBpbnRvIGNvbmZsaWN0IHdoZW4gc2xpY2tncmlkXHJcbiAgICAgIC8vIHRyaWVzIHRvIGNvbW1pdCB0aGUgZWRpdCB3aGVuIGdvaW5nIGZyb20gb25lIGVkaXRvciB0byBhbm90aGVyIG9uIHRoZSBncmlkXHJcbiAgICAgIC8vIHRocm91Z2ggdGhlIGNsaWNrIGV2ZW50LiBJZiB0aGUgdGltZW91dCB3YXMgbm90IGhlcmUgaXQgd291bGRcclxuICAgICAgLy8gdHJ5IHRvIGNvbW1pdC9kZXN0cm95IHRoZSBlZGl0b3IgdHdpY2UsIHdoaWNoIHdvdWxkIHRocm93IGEganF1ZXJ5XHJcbiAgICAgIC8vIGVycm9yIGFib3V0IHRoZSBlbGVtZW50IG5vdCBiZWluZyBpbiB0aGUgRE9NXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgdGFyZ2V0IGlzIHRoZSBhY3RpdmUgZWRpdG9yIHNvIHdlIGRvIG5vdFxyXG4gICAgICAgIC8vIGNvbW1pdCBwcmVtYXR1cmVseVxyXG4gICAgICAgIGlmIChhY3RpdmVOb2RlICYmIGFjdGl2ZU5vZGUuY29udGFpbnModGFyZ2V0KSAmJiB0aGlzLmdyaWQuZ2V0RWRpdG9yTG9jaygpLmlzQWN0aXZlKCkpIHtcclxuICAgICAgICAgIHRoaXMuZ3JpZC5nZXRFZGl0b3JMb2NrKCkuY29tbWl0Q3VycmVudEVkaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lIG91ciBpbnRlcm5hbCBQb3N0IFByb2Nlc3MgY2FsbGJhY2ssIGl0IHdpbGwgZXhlY3V0ZSBpbnRlcm5hbGx5IGFmdGVyIHdlIGdldCBiYWNrIHJlc3VsdCBmcm9tIHRoZSBQcm9jZXNzIGJhY2tlbmQgY2FsbFxyXG4gICAqIEZvciBub3csIHRoaXMgaXMgR3JhcGhRTCBTZXJ2aWNlIE9OTFkgZmVhdHVyZSBhbmQgaXQgd2lsbCBiYXNpY2FsbHkgcmVmcmVzaCB0aGUgRGF0YXNldCAmIFBhZ2luYXRpb24gd2l0aG91dCBoYXZpbmcgdGhlIHVzZXIgdG8gY3JlYXRlIGhpcyBvd24gUG9zdFByb2Nlc3MgZXZlcnkgdGltZVxyXG4gICAqL1xyXG4gIGNyZWF0ZUJhY2tlbmRBcGlJbnRlcm5hbFBvc3RQcm9jZXNzQ2FsbGJhY2soZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24pIHtcclxuICAgIGlmIChncmlkT3B0aW9ucyAmJiBncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICBjb25zdCBiYWNrZW5kQXBpID0gZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGk7XHJcblxyXG4gICAgICAvLyBpbnRlcm5hbFBvc3RQcm9jZXNzIG9ubHkgd29ya3Mgd2l0aCBhIEdyYXBoUUwgU2VydmljZSwgc28gbWFrZSBzdXJlIGl0IGlzIHRoYXQgdHlwZVxyXG4gICAgICBpZiAoYmFja2VuZEFwaSAmJiBiYWNrZW5kQXBpLnNlcnZpY2UgJiYgYmFja2VuZEFwaS5zZXJ2aWNlIGluc3RhbmNlb2YgR3JhcGhxbFNlcnZpY2UpIHtcclxuICAgICAgICBiYWNrZW5kQXBpLmludGVybmFsUG9zdFByb2Nlc3MgPSAocHJvY2Vzc1Jlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhc2V0TmFtZSA9IChiYWNrZW5kQXBpICYmIGJhY2tlbmRBcGkuc2VydmljZSAmJiB0eXBlb2YgYmFja2VuZEFwaS5zZXJ2aWNlLmdldERhdGFzZXROYW1lID09PSAnZnVuY3Rpb24nKSA/IGJhY2tlbmRBcGkuc2VydmljZS5nZXREYXRhc2V0TmFtZSgpIDogJyc7XHJcbiAgICAgICAgICBpZiAocHJvY2Vzc1Jlc3VsdCAmJiBwcm9jZXNzUmVzdWx0LmRhdGEgJiYgcHJvY2Vzc1Jlc3VsdC5kYXRhW2RhdGFzZXROYW1lXSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhc2V0ID0gcHJvY2Vzc1Jlc3VsdC5kYXRhW2RhdGFzZXROYW1lXS5ub2RlcztcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoR3JpZERhdGEodGhpcy5fZGF0YXNldCwgcHJvY2Vzc1Jlc3VsdC5kYXRhW2RhdGFzZXROYW1lXS50b3RhbENvdW50KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFzZXQgPSBbXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhdHRhY2hEaWZmZXJlbnRIb29rcyhncmlkOiBhbnksIGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uLCBkYXRhVmlldzogYW55KSB7XHJcbiAgICAvLyBvbiBsb2NhbGUgY2hhbmdlLCB3ZSBoYXZlIHRvIG1hbnVhbGx5IHRyYW5zbGF0ZSB0aGUgSGVhZGVycywgR3JpZE1lbnVcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICB0aGlzLnRyYW5zbGF0ZS5vbkxhbmdDaGFuZ2Uuc3Vic2NyaWJlKChldmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChncmlkT3B0aW9ucy5lbmFibGVUcmFuc2xhdGUpIHtcclxuICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS50cmFuc2xhdGVDb2x1bW5IZWFkZXJzKCk7XHJcbiAgICAgICAgICB0aGlzLmV4dGVuc2lvblNlcnZpY2UudHJhbnNsYXRlQ29sdW1uUGlja2VyKCk7XHJcbiAgICAgICAgICB0aGlzLmV4dGVuc2lvblNlcnZpY2UudHJhbnNsYXRlR3JpZE1lbnUoKTtcclxuICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS50cmFuc2xhdGVIZWFkZXJNZW51KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBpZiB1c2VyIGVudGVyZWQgc29tZSBDb2x1bW5zIFwicHJlc2V0c1wiLCB3ZSBuZWVkIHRvIHJlZmxlY3QgdGhlbSBhbGwgaW4gdGhlIGdyaWRcclxuICAgIGlmIChncmlkT3B0aW9ucy5wcmVzZXRzICYmIEFycmF5LmlzQXJyYXkoZ3JpZE9wdGlvbnMucHJlc2V0cy5jb2x1bW5zKSAmJiBncmlkT3B0aW9ucy5wcmVzZXRzLmNvbHVtbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBncmlkQ29sdW1uczogQ29sdW1uW10gPSB0aGlzLmdyaWRTdGF0ZVNlcnZpY2UuZ2V0QXNzb2NpYXRlZEdyaWRDb2x1bW5zKGdyaWQsIGdyaWRPcHRpb25zLnByZXNldHMuY29sdW1ucyk7XHJcbiAgICAgIGlmIChncmlkQ29sdW1ucyAmJiBBcnJheS5pc0FycmF5KGdyaWRDb2x1bW5zKSAmJiBncmlkQ29sdW1ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhlIGNoZWNrYm94IHNlbGVjdG9yIGlzIGFsc28gdmlzaWJsZSBpZiBpdCBpcyBlbmFibGVkXHJcbiAgICAgICAgaWYgKGdyaWRPcHRpb25zLmVuYWJsZUNoZWNrYm94U2VsZWN0b3IpIHtcclxuICAgICAgICAgIGNvbnN0IGNoZWNrYm94Q29sdW1uID0gKEFycmF5LmlzQXJyYXkodGhpcy5fY29sdW1uRGVmaW5pdGlvbnMpICYmIHRoaXMuX2NvbHVtbkRlZmluaXRpb25zLmxlbmd0aCA+IDApID8gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnNbMF0gOiBudWxsO1xyXG4gICAgICAgICAgaWYgKGNoZWNrYm94Q29sdW1uICYmIGNoZWNrYm94Q29sdW1uLmlkID09PSAnX2NoZWNrYm94X3NlbGVjdG9yJyAmJiBncmlkQ29sdW1uc1swXS5pZCAhPT0gJ19jaGVja2JveF9zZWxlY3RvcicpIHtcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnMudW5zaGlmdChjaGVja2JveENvbHVtbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBmaW5hbGx5IHNldCB0aGUgbmV3IHByZXNldHMgY29sdW1ucyAoaW5jbHVkaW5nIGNoZWNrYm94IHNlbGVjdG9yIGlmIG5lZWQgYmUpXHJcbiAgICAgICAgZ3JpZC5zZXRDb2x1bW5zKGdyaWRDb2x1bW5zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGF0dGFjaCBleHRlcm5hbCBzb3J0aW5nIChiYWNrZW5kKSB3aGVuIGF2YWlsYWJsZSBvciBkZWZhdWx0IG9uU29ydCAoZGF0YVZpZXcpXHJcbiAgICBpZiAoZ3JpZE9wdGlvbnMuZW5hYmxlU29ydGluZyAmJiAhdGhpcy5jdXN0b21EYXRhVmlldykge1xyXG4gICAgICBncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSA/IHRoaXMuc29ydFNlcnZpY2UuYXR0YWNoQmFja2VuZE9uU29ydChncmlkLCBkYXRhVmlldykgOiB0aGlzLnNvcnRTZXJ2aWNlLmF0dGFjaExvY2FsT25Tb3J0KGdyaWQsIGRhdGFWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhdHRhY2ggZXh0ZXJuYWwgZmlsdGVyIChiYWNrZW5kKSB3aGVuIGF2YWlsYWJsZSBvciBkZWZhdWx0IG9uRmlsdGVyIChkYXRhVmlldylcclxuICAgIGlmIChncmlkT3B0aW9ucy5lbmFibGVGaWx0ZXJpbmcgJiYgIXRoaXMuY3VzdG9tRGF0YVZpZXcpIHtcclxuICAgICAgdGhpcy5maWx0ZXJTZXJ2aWNlLmluaXQoZ3JpZCk7XHJcblxyXG4gICAgICAvLyBpZiB1c2VyIGVudGVyZWQgc29tZSBGaWx0ZXIgXCJwcmVzZXRzXCIsIHdlIG5lZWQgdG8gcmVmbGVjdCB0aGVtIGFsbCBpbiB0aGUgRE9NXHJcbiAgICAgIGlmIChncmlkT3B0aW9ucy5wcmVzZXRzICYmIEFycmF5LmlzQXJyYXkoZ3JpZE9wdGlvbnMucHJlc2V0cy5maWx0ZXJzKSAmJiBncmlkT3B0aW9ucy5wcmVzZXRzLmZpbHRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyU2VydmljZS5wb3B1bGF0ZUNvbHVtbkZpbHRlclNlYXJjaFRlcm1zKCk7XHJcbiAgICAgIH1cclxuICAgICAgZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkgPyB0aGlzLmZpbHRlclNlcnZpY2UuYXR0YWNoQmFja2VuZE9uRmlsdGVyKGdyaWQsIHRoaXMuZGF0YVZpZXcpIDogdGhpcy5maWx0ZXJTZXJ2aWNlLmF0dGFjaExvY2FsT25GaWx0ZXIoZ3JpZCwgdGhpcy5kYXRhVmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgdXNlciBzZXQgYW4gb25Jbml0IEJhY2tlbmQsIHdlJ2xsIHJ1biBpdCByaWdodCBhd2F5IChhbmQgaWYgc28sIHdlIGFsc28gbmVlZCB0byBydW4gcHJlUHJvY2VzcywgaW50ZXJuYWxQb3N0UHJvY2VzcyAmIHBvc3RQcm9jZXNzKVxyXG4gICAgaWYgKGdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICAgIGNvbnN0IGJhY2tlbmRBcGkgPSBncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaTtcclxuXHJcbiAgICAgIGlmIChiYWNrZW5kQXBpICYmIGJhY2tlbmRBcGkuc2VydmljZSAmJiBiYWNrZW5kQXBpLnNlcnZpY2UuaW5pdCkge1xyXG4gICAgICAgIGJhY2tlbmRBcGkuc2VydmljZS5pbml0KGJhY2tlbmRBcGkub3B0aW9ucywgZ3JpZE9wdGlvbnMucGFnaW5hdGlvbiwgdGhpcy5ncmlkKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGV4cG9zZSBhbGwgU2xpY2sgR3JpZCBFdmVudHMgdGhyb3VnaCBkaXNwYXRjaFxyXG4gICAgZm9yIChjb25zdCBwcm9wIGluIGdyaWQpIHtcclxuICAgICAgaWYgKGdyaWQuaGFzT3duUHJvcGVydHkocHJvcCkgJiYgcHJvcC5zdGFydHNXaXRoKCdvbicpKSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShncmlkW3Byb3BdLCAoZTogYW55LCBhcmdzOiBhbnkpID0+IHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoYCR7c2xpY2tncmlkRXZlbnRQcmVmaXh9JHt0aXRsZUNhc2UocHJvcCl9YCwgeyBldmVudERhdGE6IGUsIGFyZ3MgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBleHBvc2UgYWxsIFNsaWNrIERhdGFWaWV3IEV2ZW50cyB0aHJvdWdoIGRpc3BhdGNoXHJcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gZGF0YVZpZXcpIHtcclxuICAgICAgaWYgKGRhdGFWaWV3Lmhhc093blByb3BlcnR5KHByb3ApICYmIHByb3Auc3RhcnRzV2l0aCgnb24nKSkge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZGF0YVZpZXdbcHJvcF0sIChlOiBhbnksIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChgJHtzbGlja2dyaWRFdmVudFByZWZpeH0ke3RpdGxlQ2FzZShwcm9wKX1gLCB7IGV2ZW50RGF0YTogZSwgYXJncyB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGV4cG9zZSBHcmlkU3RhdGUgU2VydmljZSBjaGFuZ2VzIGV2ZW50IHRocm91Z2ggZGlzcGF0Y2hcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICB0aGlzLmdyaWRTdGF0ZVNlcnZpY2Uub25HcmlkU3RhdGVDaGFuZ2VkLnN1YnNjcmliZSgoZ3JpZFN0YXRlQ2hhbmdlOiBHcmlkU3RhdGVDaGFuZ2UpID0+IHtcclxuICAgICAgICB0aGlzLm9uR3JpZFN0YXRlQ2hhbmdlZC5lbWl0KGdyaWRTdGF0ZUNoYW5nZSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuXHJcbiAgICAvLyBvbiBjZWxsIGNsaWNrLCBtYWlubHkgdXNlZCB3aXRoIHRoZSBjb2x1bW5EZWYuYWN0aW9uIGNhbGxiYWNrXHJcbiAgICB0aGlzLmdyaWRFdmVudFNlcnZpY2UuYXR0YWNoT25DZWxsQ2hhbmdlKGdyaWQsIGRhdGFWaWV3KTtcclxuICAgIHRoaXMuZ3JpZEV2ZW50U2VydmljZS5hdHRhY2hPbkNsaWNrKGdyaWQsIGRhdGFWaWV3KTtcclxuXHJcbiAgICBpZiAoZGF0YVZpZXcgJiYgZ3JpZCkge1xyXG4gICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKGRhdGFWaWV3Lm9uUm93Q291bnRDaGFuZ2VkLCAoZTogYW55LCBhcmdzOiBhbnkpID0+IHtcclxuICAgICAgICBncmlkLmludmFsaWRhdGUoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyB3aXRob3V0IHRoaXMsIGZpbHRlcmluZyBkYXRhIHdpdGggbG9jYWwgZGF0YXNldCB3aWxsIG5vdCBhbHdheXMgc2hvdyBjb3JyZWN0bHlcclxuICAgICAgLy8gYWxzbyBkb24ndCB1c2UgXCJpbnZhbGlkYXRlUm93c1wiIHNpbmNlIGl0IGRlc3Ryb3lzIHRoZSBlbnRpcmUgcm93IGFuZCBhcyBiYWQgdXNlciBleHBlcmllbmNlIHdoZW4gdXBkYXRpbmcgYSByb3dcclxuICAgICAgLy8gc2VlIGNvbW1pdDogaHR0cHM6Ly9naXRodWIuY29tL2doaXNjb2RpbmcvQW5ndWxhci1TbGlja2dyaWQvY29tbWl0L2JiNjJjMGFhMjMxNGE1ZDYxMTg4ZmYwMDVjY2I1NjQ1NzdmMDg4MDVcclxuICAgICAgaWYgKGdyaWRPcHRpb25zICYmIGdyaWRPcHRpb25zLmVuYWJsZUZpbHRlcmluZyAmJiAhZ3JpZE9wdGlvbnMuZW5hYmxlUm93RGV0YWlsVmlldykge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZGF0YVZpZXcub25Sb3dzQ2hhbmdlZCwgKGU6IGFueSwgYXJnczogYW55KSA9PiB7XHJcbiAgICAgICAgICBpZiAoYXJncyAmJiBhcmdzLnJvd3MgJiYgQXJyYXkuaXNBcnJheShhcmdzLnJvd3MpKSB7XHJcbiAgICAgICAgICAgIGFyZ3Mucm93cy5mb3JFYWNoKChyb3cpID0+IGdyaWQudXBkYXRlUm93KHJvdykpO1xyXG4gICAgICAgICAgICBncmlkLnJlbmRlcigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZG9lcyB0aGUgdXNlciBoYXZlIGEgY29sc3BhbiBjYWxsYmFjaz9cclxuICAgIGlmIChncmlkT3B0aW9ucy5jb2xzcGFuQ2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5kYXRhVmlldy5nZXRJdGVtTWV0YWRhdGEgPSAocm93TnVtYmVyOiBudW1iZXIpID0+IHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5kYXRhVmlldy5nZXRJdGVtKHJvd051bWJlcik7XHJcbiAgICAgICAgcmV0dXJuIGdyaWRPcHRpb25zLmNvbHNwYW5DYWxsYmFjayhpdGVtKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGF0dGFjaEJhY2tlbmRDYWxsYmFja0Z1bmN0aW9ucyhncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgY29uc3QgYmFja2VuZEFwaSA9IGdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xyXG4gICAgY29uc3Qgc2VydmljZU9wdGlvbnM6IEJhY2tlbmRTZXJ2aWNlT3B0aW9uID0gKGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5zZXJ2aWNlICYmIGJhY2tlbmRBcGkuc2VydmljZS5vcHRpb25zKSA/IGJhY2tlbmRBcGkuc2VydmljZS5vcHRpb25zIDoge307XHJcbiAgICBjb25zdCBpc0V4ZWN1dGVDb21tYW5kT25Jbml0ID0gKCFzZXJ2aWNlT3B0aW9ucykgPyBmYWxzZSA6ICgoc2VydmljZU9wdGlvbnMgJiYgc2VydmljZU9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2V4ZWN1dGVQcm9jZXNzQ29tbWFuZE9uSW5pdCcpKSA/IHNlcnZpY2VPcHRpb25zWydleGVjdXRlUHJvY2Vzc0NvbW1hbmRPbkluaXQnXSA6IHRydWUpO1xyXG5cclxuICAgIC8vIHVwZGF0ZSBiYWNrZW5kIGZpbHRlcnMgKGlmIG5lZWQgYmUpIGJlZm9yZSB0aGUgcXVlcnkgcnVuc1xyXG4gICAgaWYgKGJhY2tlbmRBcGkpIHtcclxuICAgICAgY29uc3QgYmFja2VuZFNlcnZpY2UgPSBiYWNrZW5kQXBpLnNlcnZpY2U7XHJcblxyXG4gICAgICAvLyBpZiB1c2VyIGVudGVyZWQgc29tZSBhbnkgXCJwcmVzZXRzXCIsIHdlIG5lZWQgdG8gcmVmbGVjdCB0aGVtIGFsbCBpbiB0aGUgZ3JpZFxyXG4gICAgICBpZiAoZ3JpZE9wdGlvbnMgJiYgZ3JpZE9wdGlvbnMucHJlc2V0cykge1xyXG4gICAgICAgIC8vIEZpbHRlcnMgXCJwcmVzZXRzXCJcclxuICAgICAgICBpZiAoYmFja2VuZFNlcnZpY2UgJiYgYmFja2VuZFNlcnZpY2UudXBkYXRlRmlsdGVycyAmJiBBcnJheS5pc0FycmF5KGdyaWRPcHRpb25zLnByZXNldHMuZmlsdGVycykgJiYgZ3JpZE9wdGlvbnMucHJlc2V0cy5maWx0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGJhY2tlbmRTZXJ2aWNlLnVwZGF0ZUZpbHRlcnMoZ3JpZE9wdGlvbnMucHJlc2V0cy5maWx0ZXJzLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU29ydGVycyBcInByZXNldHNcIlxyXG4gICAgICAgIGlmIChiYWNrZW5kU2VydmljZSAmJiBiYWNrZW5kU2VydmljZS51cGRhdGVTb3J0ZXJzICYmIEFycmF5LmlzQXJyYXkoZ3JpZE9wdGlvbnMucHJlc2V0cy5zb3J0ZXJzKSAmJiBncmlkT3B0aW9ucy5wcmVzZXRzLnNvcnRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgYmFja2VuZFNlcnZpY2UudXBkYXRlU29ydGVycyh1bmRlZmluZWQsIGdyaWRPcHRpb25zLnByZXNldHMuc29ydGVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFBhZ2luYXRpb24gXCJwcmVzZXRzXCJcclxuICAgICAgICBpZiAoYmFja2VuZFNlcnZpY2UgJiYgYmFja2VuZFNlcnZpY2UudXBkYXRlUGFnaW5hdGlvbiAmJiBncmlkT3B0aW9ucy5wcmVzZXRzLnBhZ2luYXRpb24pIHtcclxuICAgICAgICAgIGJhY2tlbmRTZXJ2aWNlLnVwZGF0ZVBhZ2luYXRpb24oZ3JpZE9wdGlvbnMucHJlc2V0cy5wYWdpbmF0aW9uLnBhZ2VOdW1iZXIsIGdyaWRPcHRpb25zLnByZXNldHMucGFnaW5hdGlvbi5wYWdlU2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbkZpbHRlcnMgPSB0aGlzLmZpbHRlclNlcnZpY2UuZ2V0Q29sdW1uRmlsdGVycygpO1xyXG4gICAgICAgIGlmIChjb2x1bW5GaWx0ZXJzICYmIGJhY2tlbmRTZXJ2aWNlICYmIGJhY2tlbmRTZXJ2aWNlLnVwZGF0ZUZpbHRlcnMpIHtcclxuICAgICAgICAgIGJhY2tlbmRTZXJ2aWNlLnVwZGF0ZUZpbHRlcnMoY29sdW1uRmlsdGVycywgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChiYWNrZW5kQXBpICYmIGJhY2tlbmRBcGkuc2VydmljZSAmJiAoYmFja2VuZEFwaS5vbkluaXQgfHwgaXNFeGVjdXRlQ29tbWFuZE9uSW5pdCkpIHtcclxuICAgICAgY29uc3QgcXVlcnkgPSAodHlwZW9mIGJhY2tlbmRBcGkuc2VydmljZS5idWlsZFF1ZXJ5ID09PSAnZnVuY3Rpb24nKSA/IGJhY2tlbmRBcGkuc2VydmljZS5idWlsZFF1ZXJ5KCkgOiAnJztcclxuICAgICAgY29uc3QgcHJvY2VzcyA9IChpc0V4ZWN1dGVDb21tYW5kT25Jbml0KSA/IGJhY2tlbmRBcGkucHJvY2VzcyhxdWVyeSkgOiBiYWNrZW5kQXBpLm9uSW5pdChxdWVyeSk7XHJcblxyXG4gICAgICAvLyB3cmFwIHRoaXMgaW5zaWRlIGEgc2V0VGltZW91dCB0byBhdm9pZCB0aW1pbmcgaXNzdWUgc2luY2UgdGhlIGdyaWRPcHRpb25zIG5lZWRzIHRvIGJlIHJlYWR5IGJlZm9yZSBydW5uaW5nIHRoaXMgb25Jbml0XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vIGtlZXAgc3RhcnQgdGltZSAmIGVuZCB0aW1lc3RhbXBzICYgcmV0dXJuIGl0IGFmdGVyIHByb2Nlc3MgZXhlY3V0aW9uXHJcbiAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgLy8gcnVuIGFueSBwcmUtcHJvY2VzcywgaWYgZGVmaW5lZCwgZm9yIGV4YW1wbGUgYSBzcGlubmVyXHJcbiAgICAgICAgaWYgKGJhY2tlbmRBcGkucHJlUHJvY2Vzcykge1xyXG4gICAgICAgICAgYmFja2VuZEFwaS5wcmVQcm9jZXNzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy8gdGhlIHByb2Nlc3NlcyBjYW4gYmUgT2JzZXJ2YWJsZXMgKGxpa2UgSHR0cENsaWVudCkgb3IgUHJvbWlzZXNcclxuICAgICAgICAgIGlmIChwcm9jZXNzIGluc3RhbmNlb2YgUHJvbWlzZSAmJiBwcm9jZXNzLnRoZW4pIHtcclxuICAgICAgICAgICAgcHJvY2Vzcy50aGVuKChwcm9jZXNzUmVzdWx0OiBHcmFwaHFsUmVzdWx0IHwgYW55KSA9PiBleGVjdXRlQmFja2VuZFByb2Nlc3Nlc0NhbGxiYWNrKHN0YXJ0VGltZSwgcHJvY2Vzc1Jlc3VsdCwgYmFja2VuZEFwaSwgdGhpcy5ncmlkT3B0aW9ucykpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChpc09ic2VydmFibGUocHJvY2VzcykpIHtcclxuICAgICAgICAgICAgcHJvY2Vzcy5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgKHByb2Nlc3NSZXN1bHQ6IEdyYXBocWxSZXN1bHQgfCBhbnkpID0+IGV4ZWN1dGVCYWNrZW5kUHJvY2Vzc2VzQ2FsbGJhY2soc3RhcnRUaW1lLCBwcm9jZXNzUmVzdWx0LCBiYWNrZW5kQXBpLCB0aGlzLmdyaWRPcHRpb25zKSxcclxuICAgICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4gb25CYWNrZW5kRXJyb3IoZXJyb3IsIGJhY2tlbmRBcGkpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIG9uQmFja2VuZEVycm9yKGVycm9yLCBiYWNrZW5kQXBpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXR0YWNoUmVzaXplSG9vayhncmlkOiBhbnksIG9wdGlvbnM6IEdyaWRPcHRpb24pIHtcclxuICAgIC8vIGV4cGFuZC9hdXRvZml0IGNvbHVtbnMgb24gZmlyc3QgcGFnZSBsb2FkXHJcbiAgICBpZiAoZ3JpZCAmJiBvcHRpb25zLmF1dG9GaXRDb2x1bW5zT25GaXJzdExvYWQgJiYgb3B0aW9ucy5lbmFibGVBdXRvU2l6ZUNvbHVtbnMpIHtcclxuICAgICAgZ3JpZC5hdXRvc2l6ZUNvbHVtbnMoKTtcclxuXHJcbiAgICAgIC8vIGNvbXBlbnNhdGUgYW55dGltZSBTbGlja0dyaWQgbWVhc3VyZVNjcm9sbGJhciBpcyBpbmNvcnJlY3QgKG9ubHkgc2VlbXMgdG8gaGFwcGVuIGluIENocm9tZSAxLzUgY29tcHV0ZXJzKVxyXG4gICAgICB0aGlzLnJlc2l6ZXIuY29tcGVuc2F0ZUhvcml6b250YWxTY3JvbGwodGhpcy5ncmlkLCB0aGlzLmdyaWRPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhdXRvLXJlc2l6ZSBncmlkIG9uIGJyb3dzZXIgcmVzaXplXHJcbiAgICBpZiAodGhpcy5fZml4ZWRIZWlnaHQgfHwgdGhpcy5fZml4ZWRXaWR0aCkge1xyXG4gICAgICB0aGlzLnJlc2l6ZXIuaW5pdChncmlkLCB7IGhlaWdodDogdGhpcy5fZml4ZWRIZWlnaHQsIHdpZHRoOiB0aGlzLl9maXhlZFdpZHRoIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZXNpemVyLmluaXQoZ3JpZCk7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9ucy5lbmFibGVBdXRvUmVzaXplKSB7XHJcbiAgICAgIHRoaXMucmVzaXplci5iaW5kQXV0b1Jlc2l6ZURhdGFHcmlkKCk7XHJcbiAgICAgIGlmIChncmlkICYmIG9wdGlvbnMuYXV0b0ZpdENvbHVtbnNPbkZpcnN0TG9hZCAmJiBvcHRpb25zLmVuYWJsZUF1dG9TaXplQ29sdW1ucykge1xyXG4gICAgICAgIGdyaWQuYXV0b3NpemVDb2x1bW5zKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4ZWN1dGVBZnRlckRhdGF2aWV3Q3JlYXRlZChncmlkOiBhbnksIGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uLCBkYXRhVmlldzogYW55KSB7XHJcbiAgICAvLyBpZiB1c2VyIGVudGVyZWQgc29tZSBTb3J0IFwicHJlc2V0c1wiLCB3ZSBuZWVkIHRvIHJlZmxlY3QgdGhlbSBhbGwgaW4gdGhlIERPTVxyXG4gICAgaWYgKGdyaWRPcHRpb25zLmVuYWJsZVNvcnRpbmcpIHtcclxuICAgICAgaWYgKGdyaWRPcHRpb25zLnByZXNldHMgJiYgQXJyYXkuaXNBcnJheShncmlkT3B0aW9ucy5wcmVzZXRzLnNvcnRlcnMpICYmIGdyaWRPcHRpb25zLnByZXNldHMuc29ydGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5zb3J0U2VydmljZS5sb2FkTG9jYWxQcmVzZXRzKGdyaWQsIGRhdGFWaWV3KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbWVyZ2VHcmlkT3B0aW9ucyhncmlkT3B0aW9ucyk6IEdyaWRPcHRpb24ge1xyXG4gICAgZ3JpZE9wdGlvbnMuZ3JpZElkID0gdGhpcy5ncmlkSWQ7XHJcbiAgICBncmlkT3B0aW9ucy5ncmlkQ29udGFpbmVySWQgPSBgc2xpY2tHcmlkQ29udGFpbmVyLSR7dGhpcy5ncmlkSWR9YDtcclxuXHJcbiAgICAvLyB1c2UganF1ZXJ5IGV4dGVuZCB0byBkZWVwIG1lcmdlICYgY29weSB0byBhdm9pZCBpbW11dGFibGUgcHJvcGVydGllcyBiZWluZyBjaGFuZ2VkIGluIEdsb2JhbEdyaWRPcHRpb25zIGFmdGVyIGEgcm91dGUgY2hhbmdlXHJcbiAgICBjb25zdCBvcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIEdsb2JhbEdyaWRPcHRpb25zLCB0aGlzLmZvclJvb3RDb25maWcsIGdyaWRPcHRpb25zKTtcclxuXHJcbiAgICAvLyB1c2luZyBqUXVlcnkgZXh0ZW5kIHRvIGRvIGEgZGVlcCBjbG9uZSBoYXMgYW4gdW53YW50ZWQgc2lkZSBvbiBvYmplY3RzIGFuZCBwYWdlU2l6ZXMgYnV0IEVTNiBzcHJlYWQgaGFzIG90aGVyIHdvcnN0IHNpZGUgZWZmZWN0c1xyXG4gICAgLy8gc28gd2Ugd2lsbCBqdXN0IG92ZXJ3cml0ZSB0aGUgcGFnZVNpemVzIHdoZW4gbmVlZGVkLCB0aGlzIGlzIHRoZSBvbmx5IG9uZSBjYXVzaW5nIGlzc3VlcyBzbyBmYXIuXHJcbiAgICAvLyBqUXVlcnkgd3JvdGUgdGhpcyBvbiB0aGVpciBkb2NzOjogT24gYSBkZWVwIGV4dGVuZCwgT2JqZWN0IGFuZCBBcnJheSBhcmUgZXh0ZW5kZWQsIGJ1dCBvYmplY3Qgd3JhcHBlcnMgb24gcHJpbWl0aXZlIHR5cGVzIHN1Y2ggYXMgU3RyaW5nLCBCb29sZWFuLCBhbmQgTnVtYmVyIGFyZSBub3QuXHJcbiAgICBpZiAoZ3JpZE9wdGlvbnMgJiYgZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgaWYgKGdyaWRPcHRpb25zLnBhZ2luYXRpb24gJiYgQXJyYXkuaXNBcnJheShncmlkT3B0aW9ucy5wYWdpbmF0aW9uLnBhZ2VTaXplcykgJiYgZ3JpZE9wdGlvbnMucGFnaW5hdGlvbi5wYWdlU2l6ZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIG9wdGlvbnMucGFnaW5hdGlvbi5wYWdlU2l6ZXMgPSBncmlkT3B0aW9ucy5wYWdpbmF0aW9uLnBhZ2VTaXplcztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGFsc28gbWFrZSBzdXJlIHRvIHNob3cgdGhlIGhlYWRlciByb3cgaWYgdXNlciBoYXZlIGVuYWJsZWQgZmlsdGVyaW5nXHJcbiAgICB0aGlzLl9oaWRlSGVhZGVyUm93QWZ0ZXJQYWdlTG9hZCA9IChvcHRpb25zLnNob3dIZWFkZXJSb3cgPT09IGZhbHNlKTtcclxuICAgIGlmIChvcHRpb25zLmVuYWJsZUZpbHRlcmluZyAmJiAhb3B0aW9ucy5zaG93SGVhZGVyUm93KSB7XHJcbiAgICAgIG9wdGlvbnMuc2hvd0hlYWRlclJvdyA9IG9wdGlvbnMuZW5hYmxlRmlsdGVyaW5nO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBhIFBhZ2luYXRpb24gY2hhbmdlZCwgd2Ugd2lsbCB0cmlnZ2VyIGEgR3JpZCBTdGF0ZSBjaGFuZ2VkIHdpdGggdGhlIG5ldyBwYWdpbmF0aW9uIGluZm9cclxuICAgKiBBbHNvIGlmIHdlIHVzZSBSb3cgU2VsZWN0aW9uIG9yIHRoZSBDaGVja2JveCBTZWxlY3Rvciwgd2UgbmVlZCB0byByZXNldCBhbnkgc2VsZWN0aW9uXHJcbiAgICovXHJcbiAgcGFnaW5hdGlvbkNoYW5nZWQocGFnaW5hdGlvbjogUGFnaW5hdGlvbikge1xyXG4gICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlUm93U2VsZWN0aW9uIHx8IHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlQ2hlY2tib3hTZWxlY3Rvcikge1xyXG4gICAgICB0aGlzLmdyaWRTZXJ2aWNlLnNldFNlbGVjdGVkUm93cyhbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ncmlkU3RhdGVTZXJ2aWNlLm9uR3JpZFN0YXRlQ2hhbmdlZC5uZXh0KHtcclxuICAgICAgY2hhbmdlOiB7IG5ld1ZhbHVlczogcGFnaW5hdGlvbiwgdHlwZTogR3JpZFN0YXRlVHlwZS5wYWdpbmF0aW9uIH0sXHJcbiAgICAgIGdyaWRTdGF0ZTogdGhpcy5ncmlkU3RhdGVTZXJ2aWNlLmdldEN1cnJlbnRHcmlkU3RhdGUoKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGRhdGFzZXQgY2hhbmdlcywgd2UgbmVlZCB0byByZWZyZXNoIHRoZSBlbnRpcmUgZ3JpZCBVSSAmIHBvc3NpYmx5IHJlc2l6ZSBpdCBhcyB3ZWxsXHJcbiAgICogQHBhcmFtIGRhdGFzZXRcclxuICAgKi9cclxuICByZWZyZXNoR3JpZERhdGEoZGF0YXNldDogYW55W10sIHRvdGFsQ291bnQ/OiBudW1iZXIpIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGFzZXQpICYmIHRoaXMuZ3JpZCAmJiB0aGlzLmRhdGFWaWV3ICYmIHR5cGVvZiB0aGlzLmRhdGFWaWV3LnNldEl0ZW1zID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuZGF0YVZpZXcuc2V0SXRlbXMoZGF0YXNldCwgdGhpcy5ncmlkT3B0aW9ucy5kYXRhc2V0SWRQcm9wZXJ0eU5hbWUpO1xyXG4gICAgICBpZiAoIXRoaXMuZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgICB0aGlzLmRhdGFWaWV3LnJlU29ydCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGF0YXNldCkge1xyXG4gICAgICAgIHRoaXMuZ3JpZC5pbnZhbGlkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5ncmlkLnJlbmRlcigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICAgIC8vIGRvIHdlIHdhbnQgdG8gc2hvdyBwYWdpbmF0aW9uP1xyXG4gICAgICAgIC8vIGlmIHdlIGhhdmUgYSBiYWNrZW5kU2VydmljZUFwaSBhbmQgdGhlIGVuYWJsZVBhZ2luYXRpb24gaXMgdW5kZWZpbmVkLCB3ZSdsbCBhc3N1bWUgdGhhdCB3ZSBkbyB3YW50IHRvIHNlZSBpdCwgZWxzZSBnZXQgdGhhdCBkZWZpbmVkIHZhbHVlXHJcbiAgICAgICAgdGhpcy5zaG93UGFnaW5hdGlvbiA9ICgodGhpcy5ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSAmJiB0aGlzLmdyaWRPcHRpb25zLmVuYWJsZVBhZ2luYXRpb24gPT09IHVuZGVmaW5lZCkgPyB0cnVlIDogdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVQYWdpbmF0aW9uKSB8fCBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gYmVmb3JlIG1lcmdpbmcgdGhlIGdyaWQgb3B0aW9ucywgbWFrZSBzdXJlIHRoYXQgaXQgaGFzIHRoZSB0b3RhbEl0ZW1zIGNvdW50XHJcbiAgICAgICAgLy8gb25jZSB3ZSBoYXZlIHRoYXQsIHdlIGNhbiBtZXJnZSBhbmQgcGFzcyBhbGwgdGhlc2Ugb3B0aW9ucyB0byB0aGUgcGFnaW5hdGlvbiBjb21wb25lbnRcclxuICAgICAgICBpZiAoIXRoaXMuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbikge1xyXG4gICAgICAgICAgdGhpcy5ncmlkT3B0aW9ucy5wYWdpbmF0aW9uID0gKHRoaXMuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbikgPyB0aGlzLmdyaWRPcHRpb25zLnBhZ2luYXRpb24gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmdyaWRPcHRpb25zLnBhZ2luYXRpb24gJiYgdG90YWxDb3VudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLmdyaWRPcHRpb25zLnBhZ2luYXRpb24udG90YWxJdGVtcyA9IHRvdGFsQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmdyaWRPcHRpb25zLnByZXNldHMgJiYgdGhpcy5ncmlkT3B0aW9ucy5wcmVzZXRzLnBhZ2luYXRpb24gJiYgdGhpcy5ncmlkT3B0aW9ucy5wYWdpbmF0aW9uKSB7XHJcbiAgICAgICAgICB0aGlzLmdyaWRPcHRpb25zLnBhZ2luYXRpb24ucGFnZVNpemUgPSB0aGlzLmdyaWRPcHRpb25zLnByZXNldHMucGFnaW5hdGlvbi5wYWdlU2l6ZTtcclxuICAgICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbi5wYWdlTnVtYmVyID0gdGhpcy5ncmlkT3B0aW9ucy5wcmVzZXRzLnBhZ2luYXRpb24ucGFnZU51bWJlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ncmlkUGFnaW5hdGlvbk9wdGlvbnMgPSB0aGlzLm1lcmdlR3JpZE9wdGlvbnModGhpcy5ncmlkT3B0aW9ucyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHJlc2l6ZSB0aGUgZ3JpZCBpbnNpZGUgYSBzbGlnaHQgdGltZW91dCwgaW4gY2FzZSBvdGhlciBET00gZWxlbWVudCBjaGFuZ2VkIHByaW9yIHRvIHRoZSByZXNpemUgKGxpa2UgYSBmaWx0ZXIvcGFnaW5hdGlvbiBjaGFuZ2VkKVxyXG4gICAgICBpZiAodGhpcy5ncmlkICYmIHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1Jlc2l6ZSkge1xyXG4gICAgICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5ncmlkT3B0aW9ucy5hdXRvUmVzaXplICYmIHRoaXMuZ3JpZE9wdGlvbnMuYXV0b1Jlc2l6ZS5kZWxheTtcclxuICAgICAgICB0aGlzLnJlc2l6ZXIucmVzaXplR3JpZChkZWxheSB8fCAxMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIER5bmFtaWNhbGx5IGNoYW5nZSBvciB1cGRhdGUgdGhlIGNvbHVtbiBkZWZpbml0aW9ucyBsaXN0LlxyXG4gICAqIFdlIHdpbGwgcmUtcmVuZGVyIHRoZSBncmlkIHNvIHRoYXQgdGhlIG5ldyBoZWFkZXIgYW5kIGRhdGEgc2hvd3MgdXAgY29ycmVjdGx5LlxyXG4gICAqIElmIHVzaW5nIGkxOG4sIHdlIGFsc28gbmVlZCB0byB0cmlnZ2VyIGEgcmUtdHJhbnNsYXRlIG9mIHRoZSBjb2x1bW4gaGVhZGVyc1xyXG4gICAqL1xyXG4gIHVwZGF0ZUNvbHVtbkRlZmluaXRpb25zTGlzdChuZXdDb2x1bW5EZWZpbml0aW9ucykge1xyXG4gICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlKSB7XHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS50cmFuc2xhdGVDb2x1bW5IZWFkZXJzKGZhbHNlLCBuZXdDb2x1bW5EZWZpbml0aW9ucyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblNlcnZpY2UucmVuZGVyQ29sdW1uSGVhZGVycyhuZXdDb2x1bW5EZWZpbml0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMgJiYgdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVBdXRvU2l6ZUNvbHVtbnMpIHtcclxuICAgICAgdGhpcy5ncmlkLmF1dG9zaXplQ29sdW1ucygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRvZ2dsZSB0aGUgZmlsdGVyIHJvdyBkaXNwbGF5ZWQgb24gZmlyc3Qgcm93XHJcbiAgICogQHBhcmFtIGlzU2hvd2luZ1xyXG4gICAqL1xyXG4gIHNob3dIZWFkZXJSb3coaXNTaG93aW5nOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmdyaWQuc2V0SGVhZGVyUm93VmlzaWJpbGl0eShpc1Nob3dpbmcpO1xyXG4gICAgcmV0dXJuIGlzU2hvd2luZztcclxuICB9XHJcblxyXG4gIC8qKiBUb2dnbGUgdGhlIGZpbHRlciByb3cgZGlzcGxheWVkIG9uIGZpcnN0IHJvdyAqL1xyXG4gIHRvZ2dsZUhlYWRlclJvdygpIHtcclxuICAgIGNvbnN0IGlzU2hvd2luZyA9ICF0aGlzLmdyaWQuZ2V0T3B0aW9ucygpLnNob3dIZWFkZXJSb3c7XHJcbiAgICB0aGlzLmdyaWQuc2V0SGVhZGVyUm93VmlzaWJpbGl0eShpc1Nob3dpbmcpO1xyXG4gICAgcmV0dXJuIGlzU2hvd2luZztcclxuICB9XHJcblxyXG4gIC8vXHJcbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgLyoqIERpc3BhdGNoIG9mIEN1c3RvbSBFdmVudCwgd2hpY2ggYnkgZGVmYXVsdCB3aWxsIGJ1YmJsZSAmIGlzIGNhbmNlbGFibGUgKi9cclxuICBwcml2YXRlIGRpc3BhdGNoQ3VzdG9tRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcsIGRhdGE/OiBhbnksIGlzQnViYmxpbmc6IGJvb2xlYW4gPSB0cnVlLCBpc0NhbmNlbGFibGU6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICBjb25zdCBldmVudEluaXQ6IEN1c3RvbUV2ZW50SW5pdCA9IHsgYnViYmxlczogaXNCdWJibGluZywgY2FuY2VsYWJsZTogaXNDYW5jZWxhYmxlIH07XHJcbiAgICBpZiAoZGF0YSkge1xyXG4gICAgICBldmVudEluaXQuZGV0YWlsID0gZGF0YTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGV2ZW50TmFtZSwgZXZlbnRJbml0KSk7XHJcbiAgfVxyXG5cclxuICAvKiogTG9hZCB0aGUgRWRpdG9yIENvbGxlY3Rpb24gYXN5bmNocm9ub3VzbHkgYW5kIHJlcGxhY2UgdGhlIFwiY29sbGVjdGlvblwiIHByb3BlcnR5IHdoZW4gT2JzZXJ2YWJsZSByZXNvbHZlcyAqL1xyXG4gIHByaXZhdGUgbG9hZEVkaXRvckNvbGxlY3Rpb25Bc3luYyhjb2x1bW46IENvbHVtbikge1xyXG4gICAgY29uc3QgY29sbGVjdGlvbkFzeW5jID0gY29sdW1uICYmIGNvbHVtbi5lZGl0b3IgJiYgY29sdW1uLmVkaXRvci5jb2xsZWN0aW9uQXN5bmM7XHJcbiAgICBpZiAoY29sbGVjdGlvbkFzeW5jIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgICBjb2xsZWN0aW9uQXN5bmMuc3Vic2NyaWJlKChyZXNvbHZlZENvbGxlY3Rpb24pID0+IHRoaXMudXBkYXRlRWRpdG9yQ29sbGVjdGlvbihjb2x1bW4sIHJlc29sdmVkQ29sbGVjdGlvbikpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIEVkaXRvciBcImNvbGxlY3Rpb25cIiBwcm9wZXJ0eSBmcm9tIGFuIGFzeW5jIGNhbGwgcmVzb2x2ZWRcclxuICAgKiBTaW5jZSB0aGlzIGlzIGNhbGxlZCBhZnRlciB0aGUgYXN5bmMgY2FsbCByZXNvbHZlcywgdGhlIHBvaW50ZXIgd2lsbCBub3QgYmUgdGhlIHNhbWUgYXMgdGhlIFwiY29sdW1uXCIgYXJndW1lbnQgcGFzc2VkLlxyXG4gICAqIE9uY2Ugd2UgZm91bmQgdGhlIG5ldyBwb2ludGVyLCB3ZSB3aWxsIHJlYXNzaWduIHRoZSBcImVkaXRvclwiIGFuZCBcImNvbGxlY3Rpb25cIiB0byB0aGUgXCJpbnRlcm5hbENvbHVtbkVkaXRvclwiIHNvIGl0IGhhcyBuZXdlc3QgY29sbGVjdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgdXBkYXRlRWRpdG9yQ29sbGVjdGlvbihjb2x1bW46IENvbHVtbiwgbmV3Q29sbGVjdGlvbjogYW55W10pIHtcclxuICAgIGNvbHVtbi5lZGl0b3IuY29sbGVjdGlvbiA9IG5ld0NvbGxlY3Rpb247XHJcblxyXG4gICAgLy8gZmluZCB0aGUgbmV3IGNvbHVtbiByZWZlcmVuY2UgcG9pbnRlclxyXG4gICAgY29uc3QgY29sdW1ucyA9IHRoaXMuZ3JpZC5nZXRDb2x1bW5zKCk7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb2x1bW5zKSkge1xyXG4gICAgICBjb25zdCBjb2x1bW5SZWY6IENvbHVtbiA9IGNvbHVtbnMuZmluZCgoY29sOiBDb2x1bW4pID0+IGNvbC5pZCA9PT0gY29sdW1uLmlkKTtcclxuICAgICAgY29sdW1uUmVmLmludGVybmFsQ29sdW1uRWRpdG9yID0gY29sdW1uLmVkaXRvcjtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19