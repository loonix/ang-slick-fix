/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
const slickgridEventPrefix = 'sg';
export class AngularSlickgridComponent {
    /**
     * @param {?} elm
     * @param {?} exportService
     * @param {?} extensionService
     * @param {?} extensionUtility
     * @param {?} filterService
     * @param {?} gridService
     * @param {?} gridEventService
     * @param {?} gridStateService
     * @param {?} groupingAndColspanService
     * @param {?} resizer
     * @param {?} sharedService
     * @param {?} sortService
     * @param {?} translate
     * @param {?} forRootConfig
     */
    constructor(elm, exportService, extensionService, extensionUtility, filterService, gridService, gridEventService, gridStateService, groupingAndColspanService, resizer, sharedService, sortService, translate, forRootConfig) {
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
    /**
     * @param {?} height
     * @return {?}
     */
    set gridHeight(height) {
        this._fixedHeight = height;
    }
    /**
     * @param {?} width
     * @return {?}
     */
    set gridWidth(width) {
        this._fixedWidth = width;
    }
    /**
     * @param {?} columnDefinitions
     * @return {?}
     */
    set columnDefinitions(columnDefinitions) {
        this._columnDefinitions = columnDefinitions;
        if (this.isGridInitialized) {
            this.updateColumnDefinitionsList(columnDefinitions);
        }
    }
    /**
     * @return {?}
     */
    get columnDefinitions() {
        return this._columnDefinitions;
    }
    /**
     * @param {?} dataset
     * @return {?}
     */
    set dataset(dataset) {
        this._dataset = dataset;
        this.refreshGridData(dataset);
    }
    /**
     * @return {?}
     */
    get dataset() {
        return this.dataView.getItems();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.onBeforeGridCreate.emit(true);
        if (this.gridOptions && !this.gridOptions.enableAutoResize && (this._fixedHeight || this._fixedWidth)) {
            this.gridHeightString = `${this._fixedHeight}px`;
            this.gridWidthString = `${this._fixedWidth}px`;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.onBeforeGridDestroy.emit(this.grid);
        this.destroy();
        this.onAfterGridDestroyed.emit(true);
    }
    /**
     * @param {?=} emptyDomElementContainer
     * @return {?}
     */
    destroy(emptyDomElementContainer = false) {
        /** @type {?} */
        const gridContainerId = this.gridOptions && this.gridOptions.gridContainerId;
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
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initialization();
        this.isGridInitialized = true;
        // user must provide a "gridHeight" or use "autoResize: true" in the grid options
        if (!this._fixedHeight && !this.gridOptions.enableAutoResize) {
            throw new Error(`[Angular-Slickgrid] requires a "grid-height" or the "enableAutoResize" grid option to be enabled.
        Without that the grid will seem empty while in fact it just does not have any height define.`);
        }
    }
    /**
     * @return {?}
     */
    initialization() {
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
        (column) => {
            // on every Editor that have a "collectionAsync", resolve the data and assign it to the "collection" property
            if (column.editor && column.editor.collectionAsync) {
                this.loadEditorCollectionAsync(column);
            }
            return Object.assign({}, column, { editor: column.editor && column.editor.model, internalColumnEditor: Object.assign({}, column.editor) });
        }));
        // save reference for all columns before they optionally become hidden/visible
        this.sharedService.allColumns = this._columnDefinitions;
        this.sharedService.visibleColumns = this._columnDefinitions;
        this.extensionService.createExtensionsBeforeGridCreation(this._columnDefinitions, this.gridOptions);
        // build SlickGrid Grid, also user might optionally pass a custom dataview (e.g. remote model)
        this.grid = new Slick.Grid(`#${this.gridId}`, this.customDataView || this.dataView, this._columnDefinitions, this.gridOptions);
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
    }
    /**
     * Commits the current edit to the grid
     * @param {?} target
     * @return {?}
     */
    commitEdit(target) {
        if (this.grid.getOptions().autoCommitEdit) {
            /** @type {?} */
            const activeNode = this.grid.getActiveCellNode();
            // a timeout must be set or this could come into conflict when slickgrid
            // tries to commit the edit when going from one editor to another on the grid
            // through the click event. If the timeout was not here it would
            // try to commit/destroy the editor twice, which would throw a jquery
            // error about the element not being in the DOM
            setTimeout((/**
             * @return {?}
             */
            () => {
                // make sure the target is the active editor so we do not
                // commit prematurely
                if (activeNode && activeNode.contains(target) && this.grid.getEditorLock().isActive()) {
                    this.grid.getEditorLock().commitCurrentEdit();
                }
            }));
        }
    }
    /**
     * Define our internal Post Process callback, it will execute internally after we get back result from the Process backend call
     * For now, this is GraphQL Service ONLY feature and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
     * @param {?} gridOptions
     * @return {?}
     */
    createBackendApiInternalPostProcessCallback(gridOptions) {
        if (gridOptions && gridOptions.backendServiceApi) {
            /** @type {?} */
            const backendApi = gridOptions.backendServiceApi;
            // internalPostProcess only works with a GraphQL Service, so make sure it is that type
            if (backendApi && backendApi.service && backendApi.service instanceof GraphqlService) {
                backendApi.internalPostProcess = (/**
                 * @param {?} processResult
                 * @return {?}
                 */
                (processResult) => {
                    /** @type {?} */
                    const datasetName = (backendApi && backendApi.service && typeof backendApi.service.getDatasetName === 'function') ? backendApi.service.getDatasetName() : '';
                    if (processResult && processResult.data && processResult.data[datasetName]) {
                        this._dataset = processResult.data[datasetName].nodes;
                        this.refreshGridData(this._dataset, processResult.data[datasetName].totalCount);
                    }
                    else {
                        this._dataset = [];
                    }
                });
            }
        }
    }
    /**
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} dataView
     * @return {?}
     */
    attachDifferentHooks(grid, gridOptions, dataView) {
        // on locale change, we have to manually translate the Headers, GridMenu
        this.subscriptions.push(this.translate.onLangChange.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (gridOptions.enableTranslate) {
                this.extensionService.translateColumnHeaders();
                this.extensionService.translateColumnPicker();
                this.extensionService.translateGridMenu();
                this.extensionService.translateHeaderMenu();
            }
        })));
        // if user entered some Columns "presets", we need to reflect them all in the grid
        if (gridOptions.presets && Array.isArray(gridOptions.presets.columns) && gridOptions.presets.columns.length > 0) {
            /** @type {?} */
            const gridColumns = this.gridStateService.getAssociatedGridColumns(grid, gridOptions.presets.columns);
            if (gridColumns && Array.isArray(gridColumns) && gridColumns.length > 0) {
                // make sure that the checkbox selector is also visible if it is enabled
                if (gridOptions.enableCheckboxSelector) {
                    /** @type {?} */
                    const checkboxColumn = (Array.isArray(this._columnDefinitions) && this._columnDefinitions.length > 0) ? this._columnDefinitions[0] : null;
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
            const backendApi = gridOptions.backendServiceApi;
            if (backendApi && backendApi.service && backendApi.service.init) {
                backendApi.service.init(backendApi.options, gridOptions.pagination, this.grid);
            }
        }
        // expose all Slick Grid Events through dispatch
        for (const prop in grid) {
            if (grid.hasOwnProperty(prop) && prop.startsWith('on')) {
                this._eventHandler.subscribe(grid[prop], (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                (e, args) => {
                    return this.dispatchCustomEvent(`${slickgridEventPrefix}${titleCase(prop)}`, { eventData: e, args });
                }));
            }
        }
        // expose all Slick DataView Events through dispatch
        for (const prop in dataView) {
            if (dataView.hasOwnProperty(prop) && prop.startsWith('on')) {
                this._eventHandler.subscribe(dataView[prop], (/**
                 * @param {?} e
                 * @param {?} args
                 * @return {?}
                 */
                (e, args) => {
                    return this.dispatchCustomEvent(`${slickgridEventPrefix}${titleCase(prop)}`, { eventData: e, args });
                }));
            }
        }
        // expose GridState Service changes event through dispatch
        this.subscriptions.push(this.gridStateService.onGridStateChanged.subscribe((/**
         * @param {?} gridStateChange
         * @return {?}
         */
        (gridStateChange) => {
            this.onGridStateChanged.emit(gridStateChange);
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
            (e, args) => {
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
                (e, args) => {
                    if (args && args.rows && Array.isArray(args.rows)) {
                        args.rows.forEach((/**
                         * @param {?} row
                         * @return {?}
                         */
                        (row) => grid.updateRow(row)));
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
            (rowNumber) => {
                /** @type {?} */
                const item = this.dataView.getItem(rowNumber);
                return gridOptions.colspanCallback(item);
            });
        }
    }
    /**
     * @param {?} gridOptions
     * @return {?}
     */
    attachBackendCallbackFunctions(gridOptions) {
        /** @type {?} */
        const backendApi = gridOptions.backendServiceApi;
        /** @type {?} */
        const serviceOptions = (backendApi && backendApi.service && backendApi.service.options) ? backendApi.service.options : {};
        /** @type {?} */
        const isExecuteCommandOnInit = (!serviceOptions) ? false : ((serviceOptions && serviceOptions.hasOwnProperty('executeProcessCommandOnInit')) ? serviceOptions['executeProcessCommandOnInit'] : true);
        // update backend filters (if need be) before the query runs
        if (backendApi) {
            /** @type {?} */
            const backendService = backendApi.service;
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
                const columnFilters = this.filterService.getColumnFilters();
                if (columnFilters && backendService && backendService.updateFilters) {
                    backendService.updateFilters(columnFilters, false);
                }
            }
        }
        if (backendApi && backendApi.service && (backendApi.onInit || isExecuteCommandOnInit)) {
            /** @type {?} */
            const query = (typeof backendApi.service.buildQuery === 'function') ? backendApi.service.buildQuery() : '';
            /** @type {?} */
            const process = (isExecuteCommandOnInit) ? backendApi.process(query) : backendApi.onInit(query);
            // wrap this inside a setTimeout to avoid timing issue since the gridOptions needs to be ready before running this onInit
            setTimeout((/**
             * @return {?}
             */
            () => {
                // keep start time & end timestamps & return it after process execution
                /** @type {?} */
                const startTime = new Date();
                // run any pre-process, if defined, for example a spinner
                if (backendApi.preProcess) {
                    backendApi.preProcess();
                }
                try {
                    // the processes can be Observables (like HttpClient) or Promises
                    if (process instanceof Promise && process.then) {
                        process.then((/**
                         * @param {?} processResult
                         * @return {?}
                         */
                        (processResult) => executeBackendProcessesCallback(startTime, processResult, backendApi, this.gridOptions)));
                    }
                    else if (isObservable(process)) {
                        process.subscribe((/**
                         * @param {?} processResult
                         * @return {?}
                         */
                        (processResult) => executeBackendProcessesCallback(startTime, processResult, backendApi, this.gridOptions)), (/**
                         * @param {?} error
                         * @return {?}
                         */
                        (error) => onBackendError(error, backendApi)));
                    }
                }
                catch (error) {
                    onBackendError(error, backendApi);
                }
            }));
        }
    }
    /**
     * @param {?} grid
     * @param {?} options
     * @return {?}
     */
    attachResizeHook(grid, options) {
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
    }
    /**
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} dataView
     * @return {?}
     */
    executeAfterDataviewCreated(grid, gridOptions, dataView) {
        // if user entered some Sort "presets", we need to reflect them all in the DOM
        if (gridOptions.enableSorting) {
            if (gridOptions.presets && Array.isArray(gridOptions.presets.sorters) && gridOptions.presets.sorters.length > 0) {
                this.sortService.loadLocalPresets(grid, dataView);
            }
        }
    }
    /**
     * @param {?} gridOptions
     * @return {?}
     */
    mergeGridOptions(gridOptions) {
        gridOptions.gridId = this.gridId;
        gridOptions.gridContainerId = `slickGridContainer-${this.gridId}`;
        // use jquery extend to deep merge & copy to avoid immutable properties being changed in GlobalGridOptions after a route change
        /** @type {?} */
        const options = $.extend(true, {}, GlobalGridOptions, this.forRootConfig, gridOptions);
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
    }
    /**
     * On a Pagination changed, we will trigger a Grid State changed with the new pagination info
     * Also if we use Row Selection or the Checkbox Selector, we need to reset any selection
     * @param {?} pagination
     * @return {?}
     */
    paginationChanged(pagination) {
        if (this.gridOptions.enableRowSelection || this.gridOptions.enableCheckboxSelector) {
            this.gridService.setSelectedRows([]);
        }
        this.gridStateService.onGridStateChanged.next({
            change: { newValues: pagination, type: GridStateType.pagination },
            gridState: this.gridStateService.getCurrentGridState()
        });
    }
    /**
     * When dataset changes, we need to refresh the entire grid UI & possibly resize it as well
     * @param {?} dataset
     * @param {?=} totalCount
     * @return {?}
     */
    refreshGridData(dataset, totalCount) {
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
                const delay = this.gridOptions.autoResize && this.gridOptions.autoResize.delay;
                this.resizer.resizeGrid(delay || 10);
            }
        }
    }
    /**
     * Dynamically change or update the column definitions list.
     * We will re-render the grid so that the new header and data shows up correctly.
     * If using i18n, we also need to trigger a re-translate of the column headers
     * @param {?} newColumnDefinitions
     * @return {?}
     */
    updateColumnDefinitionsList(newColumnDefinitions) {
        if (this.gridOptions.enableTranslate) {
            this.extensionService.translateColumnHeaders(false, newColumnDefinitions);
        }
        else {
            this.extensionService.renderColumnHeaders(newColumnDefinitions);
        }
        if (this.gridOptions && this.gridOptions.enableAutoSizeColumns) {
            this.grid.autosizeColumns();
        }
    }
    /**
     * Toggle the filter row displayed on first row
     * @param {?} isShowing
     * @return {?}
     */
    showHeaderRow(isShowing) {
        this.grid.setHeaderRowVisibility(isShowing);
        return isShowing;
    }
    /**
     * Toggle the filter row displayed on first row
     * @return {?}
     */
    toggleHeaderRow() {
        /** @type {?} */
        const isShowing = !this.grid.getOptions().showHeaderRow;
        this.grid.setHeaderRowVisibility(isShowing);
        return isShowing;
    }
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
    dispatchCustomEvent(eventName, data, isBubbling = true, isCancelable = true) {
        /** @type {?} */
        const eventInit = { bubbles: isBubbling, cancelable: isCancelable };
        if (data) {
            eventInit.detail = data;
        }
        return this.elm.nativeElement.dispatchEvent(new CustomEvent(eventName, eventInit));
    }
    /**
     * Load the Editor Collection asynchronously and replace the "collection" property when Observable resolves
     * @private
     * @param {?} column
     * @return {?}
     */
    loadEditorCollectionAsync(column) {
        /** @type {?} */
        const collectionAsync = column && column.editor && column.editor.collectionAsync;
        if (collectionAsync instanceof Observable) {
            this.subscriptions.push(collectionAsync.subscribe((/**
             * @param {?} resolvedCollection
             * @return {?}
             */
            (resolvedCollection) => this.updateEditorCollection(column, resolvedCollection))));
        }
    }
    /**
     * Update the Editor "collection" property from an async call resolved
     * Since this is called after the async call resolves, the pointer will not be the same as the "column" argument passed.
     * Once we found the new pointer, we will reassign the "editor" and "collection" to the "internalColumnEditor" so it has newest collection
     * @private
     * @param {?} column
     * @param {?} newCollection
     * @return {?}
     */
    updateEditorCollection(column, newCollection) {
        column.editor.collection = newCollection;
        // find the new column reference pointer
        /** @type {?} */
        const columns = this.grid.getColumns();
        if (Array.isArray(columns)) {
            /** @type {?} */
            const columnRef = columns.find((/**
             * @param {?} col
             * @return {?}
             */
            (col) => col.id === column.id));
            columnRef.internalColumnEditor = column.editor;
        }
    }
}
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
AngularSlickgridComponent.ctorParameters = () => [
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
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1zbGlja2dyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9jb21wb25lbnRzL2FuZ3VsYXItc2xpY2tncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSxPQUFPLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sdUNBQXVDLENBQUM7QUFDL0MsT0FBTyxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sMEJBQTBCLENBQUM7O0FBR2xDLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUN6SSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsU0FBUyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0UsT0FBTyxFQUFFLCtCQUErQixFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hHLE9BQU8sRUFJTCxhQUFhLEVBSWIsYUFBYSxHQUVkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7O0FBRzlELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIs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TTtrQ0FDTixNQUFNO21DQUNOLE1BQU07aUNBQ04sTUFBTTs2QkFDTixLQUFLO3FCQUNMLEtBQUs7MEJBQ0wsS0FBSzt5QkFFTCxLQUFLO3dCQUlMLEtBQUs7Z0NBS0wsS0FBSztzQkFVTCxLQUFLOzs7Ozs7O0lBaEROLDZDQUF3Qjs7Ozs7SUFDeEIsdURBQXFDOzs7OztJQUNyQyxrREFBc0Q7Ozs7O0lBQ3RELGlEQUFvQzs7Ozs7SUFDcEMsZ0RBQW1DOzs7OztJQUNuQyxnRUFBNEM7O0lBQzVDLDZDQUFjOztJQUNkLHlDQUFVOztJQUNWLDBEQUFrQzs7SUFDbEMscURBQXlCOztJQUN6QixvREFBd0I7O0lBQ3hCLHVEQUE2Qjs7SUFDN0IsOERBQStCOztJQUMvQixtREFBdUI7O0lBQ3ZCLHNEQUEwQjs7SUFDMUIsa0RBQW1DOztJQUVuQyx5REFBeUU7O0lBQ3pFLHNEQUFzRDs7SUFDdEQsa0RBQWtEOztJQUNsRCxzREFBc0Q7O0lBQ3RELHVEQUEyRDs7SUFDM0Qsd0RBQXdEOztJQUN4RCx5REFBNkQ7O0lBQzdELHVEQUFtRTs7SUFDbkUsbURBQTZCOztJQUM3QiwyQ0FBd0I7O0lBQ3hCLGdEQUFpQzs7Ozs7SUErQi9CLHdDQUF1Qjs7Ozs7SUFDdkIsa0RBQW9DOzs7OztJQUNwQyxxREFBMEM7Ozs7O0lBQzFDLHFEQUEwQzs7Ozs7SUFDMUMsa0RBQW9DOzs7OztJQUNwQyxnREFBZ0M7Ozs7O0lBQ2hDLHFEQUEwQzs7Ozs7SUFDMUMscURBQTBDOzs7OztJQUMxQyw4REFBNEQ7Ozs7O0lBQzVELDRDQUErQjs7Ozs7SUFDL0Isa0RBQW9DOzs7OztJQUNwQyxnREFBZ0M7Ozs7O0lBQ2hDLDhDQUFtQzs7Ozs7SUFDbkMsa0RBQW1EIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IDNyZCBwYXJ0eSB2ZW5kb3IgbGlic1xyXG4vLyBvbmx5IGltcG9ydCB0aGUgbmVjZXNzYXJ5IGNvcmUgbGliLCBlYWNoIHdpbGwgYmUgaW1wb3J0ZWQgb24gZGVtYW5kIHdoZW4gZW5hYmxlZCAodmlhIHJlcXVpcmUpXHJcbmltcG9ydCAnanF1ZXJ5LXVpLWRpc3QvanF1ZXJ5LXVpJztcclxuaW1wb3J0ICdzbGlja2dyaWQvbGliL2pxdWVyeS5ldmVudC5kcmFnLTIuMy4wJztcclxuaW1wb3J0ICdzbGlja2dyaWQvc2xpY2suY29yZSc7XHJcbmltcG9ydCAnc2xpY2tncmlkL3NsaWNrLmdyaWQnO1xyXG5pbXBvcnQgJ3NsaWNrZ3JpZC9zbGljay5kYXRhdmlldyc7XHJcblxyXG4vLyAuLi50aGVuIGV2ZXJ5dGhpbmcgZWxzZS4uLlxyXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbmplY3RhYmxlLCBJbnB1dCwgT3V0cHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IEdsb2JhbEdyaWRPcHRpb25zIH0gZnJvbSAnLi8uLi9nbG9iYWwtZ3JpZC1vcHRpb25zJztcclxuaW1wb3J0IHsgdGl0bGVDYXNlLCB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBleGVjdXRlQmFja2VuZFByb2Nlc3Nlc0NhbGxiYWNrLCBvbkJhY2tlbmRFcnJvciB9IGZyb20gJy4uL3NlcnZpY2VzL2JhY2tlbmQtdXRpbGl0aWVzJztcclxuaW1wb3J0IHtcclxuICBBbmd1bGFyR3JpZEluc3RhbmNlLFxyXG4gIEJhY2tlbmRTZXJ2aWNlT3B0aW9uLFxyXG4gIENvbHVtbixcclxuICBFeHRlbnNpb25OYW1lLFxyXG4gIEdyYXBocWxSZXN1bHQsXHJcbiAgR3JpZE9wdGlvbixcclxuICBHcmlkU3RhdGVDaGFuZ2UsXHJcbiAgR3JpZFN0YXRlVHlwZSxcclxuICBQYWdpbmF0aW9uLFxyXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgRmlsdGVyRmFjdG9yeSB9IGZyb20gJy4uL2ZpbHRlcnMvZmlsdGVyRmFjdG9yeSc7XHJcbmltcG9ydCB7IFNsaWNrZ3JpZENvbmZpZyB9IGZyb20gJy4uL3NsaWNrZ3JpZC1jb25maWcnO1xyXG5pbXBvcnQgeyBpc09ic2VydmFibGUsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuLy8gU2VydmljZXNcclxuaW1wb3J0IHsgQW5ndWxhclV0aWxTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9hbmd1bGFyVXRpbFNlcnZpY2UnO1xyXG5pbXBvcnQgeyBFeHBvcnRTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9leHBvcnQuc2VydmljZSc7XHJcbmltcG9ydCB7IEV4dGVuc2lvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9leHRlbnNpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEV4dGVuc2lvblV0aWxpdHkgfSBmcm9tICcuLi9leHRlbnNpb25zL2V4dGVuc2lvblV0aWxpdHknO1xyXG5pbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9maWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEdyYXBocWxTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ncmFwaHFsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHcmlkRXZlbnRTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ncmlkRXZlbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IEdyaWRTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ncmlkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHcmlkU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ncmlkU3RhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IEdyb3VwaW5nQW5kQ29sc3BhblNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2dyb3VwaW5nQW5kQ29sc3Bhbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUmVzaXplclNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3Jlc2l6ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XHJcbmltcG9ydCB7IFNvcnRTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9zb3J0LnNlcnZpY2UnO1xyXG5cclxuLy8gRXh0ZW5zaW9ucyAoU2xpY2tHcmlkIENvbnRyb2xzICYgUGx1Z2lucylcclxuaW1wb3J0IHsgQXV0b1Rvb2x0aXBFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2F1dG9Ub29sdGlwRXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgQ2VsbEV4dGVybmFsQ29weU1hbmFnZXJFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2NlbGxFeHRlcm5hbENvcHlNYW5hZ2VyRXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgQ2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbiB9IGZyb20gJy4uL2V4dGVuc2lvbnMvY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbic7XHJcbmltcG9ydCB7IENvbHVtblBpY2tlckV4dGVuc2lvbiB9IGZyb20gJy4uL2V4dGVuc2lvbnMvY29sdW1uUGlja2VyRXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgRHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2RyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgR3JpZE1lbnVFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2dyaWRNZW51RXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgR3JvdXBJdGVtTWV0YVByb3ZpZGVyRXh0ZW5zaW9uIH0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9ncm91cEl0ZW1NZXRhUHJvdmlkZXJFeHRlbnNpb24nO1xyXG5pbXBvcnQgeyBIZWFkZXJCdXR0b25FeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2hlYWRlckJ1dHRvbkV4dGVuc2lvbic7XHJcbmltcG9ydCB7IEhlYWRlck1lbnVFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2hlYWRlck1lbnVFeHRlbnNpb24nO1xyXG5pbXBvcnQgeyBSb3dEZXRhaWxWaWV3RXh0ZW5zaW9uIH0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9yb3dEZXRhaWxWaWV3RXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgUm93TW92ZU1hbmFnZXJFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL3Jvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgUm93U2VsZWN0aW9uRXh0ZW5zaW9uIH0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9yb3dTZWxlY3Rpb25FeHRlbnNpb24nO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG5jb25zdCBzbGlja2dyaWRFdmVudFByZWZpeCA9ICdzZyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYW5ndWxhci1zbGlja2dyaWQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hbmd1bGFyLXNsaWNrZ3JpZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICAvLyBtYWtlIGV2ZXJ5dGhpbmcgdHJhbnNpZW50IChub24tc2luZ2xldG9uKVxyXG4gICAgQW5ndWxhclV0aWxTZXJ2aWNlLFxyXG4gICAgQXV0b1Rvb2x0aXBFeHRlbnNpb24sXHJcbiAgICBDZWxsRXh0ZXJuYWxDb3B5TWFuYWdlckV4dGVuc2lvbixcclxuICAgIENoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24sXHJcbiAgICBDb2x1bW5QaWNrZXJFeHRlbnNpb24sXHJcbiAgICBEcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbixcclxuICAgIEV4dGVuc2lvblNlcnZpY2UsXHJcbiAgICBFeHBvcnRTZXJ2aWNlLFxyXG4gICAgRXh0ZW5zaW9uVXRpbGl0eSxcclxuICAgIEZpbHRlckZhY3RvcnksXHJcbiAgICBGaWx0ZXJTZXJ2aWNlLFxyXG4gICAgR3JhcGhxbFNlcnZpY2UsXHJcbiAgICBHcmlkRXZlbnRTZXJ2aWNlLFxyXG4gICAgR3JpZE1lbnVFeHRlbnNpb24sXHJcbiAgICBHcmlkU2VydmljZSxcclxuICAgIEdyaWRTdGF0ZVNlcnZpY2UsXHJcbiAgICBHcm91cGluZ0FuZENvbHNwYW5TZXJ2aWNlLFxyXG4gICAgR3JvdXBJdGVtTWV0YVByb3ZpZGVyRXh0ZW5zaW9uLFxyXG4gICAgSGVhZGVyQnV0dG9uRXh0ZW5zaW9uLFxyXG4gICAgSGVhZGVyTWVudUV4dGVuc2lvbixcclxuICAgIFJlc2l6ZXJTZXJ2aWNlLFxyXG4gICAgUm93RGV0YWlsVmlld0V4dGVuc2lvbixcclxuICAgIFJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uLFxyXG4gICAgUm93U2VsZWN0aW9uRXh0ZW5zaW9uLFxyXG4gICAgU2hhcmVkU2VydmljZSxcclxuICAgIFNvcnRTZXJ2aWNlLFxyXG4gICAgU2xpY2tncmlkQ29uZmlnXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhclNsaWNrZ3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25Jbml0IHtcclxuICBwcml2YXRlIF9kYXRhc2V0OiBhbnlbXTtcclxuICBwcml2YXRlIF9jb2x1bW5EZWZpbml0aW9uczogQ29sdW1uW107XHJcbiAgcHJpdmF0ZSBfZXZlbnRIYW5kbGVyOiBhbnkgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XHJcbiAgcHJpdmF0ZSBfZml4ZWRIZWlnaHQ6IG51bWJlciB8IG51bGw7XHJcbiAgcHJpdmF0ZSBfZml4ZWRXaWR0aDogbnVtYmVyIHwgbnVsbDtcclxuICBwcml2YXRlIF9oaWRlSGVhZGVyUm93QWZ0ZXJQYWdlTG9hZCA9IGZhbHNlO1xyXG4gIGRhdGFWaWV3OiBhbnk7XHJcbiAgZ3JpZDogYW55O1xyXG4gIGdyaWRQYWdpbmF0aW9uT3B0aW9uczogR3JpZE9wdGlvbjtcclxuICBncmlkSGVpZ2h0U3RyaW5nOiBzdHJpbmc7XHJcbiAgZ3JpZFdpZHRoU3RyaW5nOiBzdHJpbmc7XHJcbiAgZ3JvdXBpbmdEZWZpbml0aW9uOiBhbnkgPSB7fTtcclxuICBncm91cEl0ZW1NZXRhZGF0YVByb3ZpZGVyOiBhbnk7XHJcbiAgc2hvd1BhZ2luYXRpb24gPSBmYWxzZTtcclxuICBpc0dyaWRJbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIEBPdXRwdXQoKSBvbkFuZ3VsYXJHcmlkQ3JlYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8QW5ndWxhckdyaWRJbnN0YW5jZT4oKTtcclxuICBAT3V0cHV0KCkgb25EYXRhdmlld0NyZWF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgb25HcmlkQ3JlYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBvbkdyaWRJbml0aWFsaXplZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBvbkJlZm9yZUdyaWRDcmVhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgQE91dHB1dCgpIG9uQmVmb3JlR3JpZERlc3Ryb3kgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgb25BZnRlckdyaWREZXN0cm95ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgQE91dHB1dCgpIG9uR3JpZFN0YXRlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8R3JpZFN0YXRlQ2hhbmdlPigpO1xyXG4gIEBJbnB1dCgpIGN1c3RvbURhdGFWaWV3OiBhbnk7XHJcbiAgQElucHV0KCkgZ3JpZElkOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb247XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGdyaWRIZWlnaHQoaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2ZpeGVkSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gIH1cclxuICBASW5wdXQoKVxyXG4gIHNldCBncmlkV2lkdGgod2lkdGg6IG51bWJlcikge1xyXG4gICAgdGhpcy5fZml4ZWRXaWR0aCA9IHdpZHRoO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgY29sdW1uRGVmaW5pdGlvbnMoY29sdW1uRGVmaW5pdGlvbnM6IENvbHVtbltdKSB7XHJcbiAgICB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucyA9IGNvbHVtbkRlZmluaXRpb25zO1xyXG4gICAgaWYgKHRoaXMuaXNHcmlkSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgdGhpcy51cGRhdGVDb2x1bW5EZWZpbml0aW9uc0xpc3QoY29sdW1uRGVmaW5pdGlvbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXQgY29sdW1uRGVmaW5pdGlvbnMoKTogQ29sdW1uW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbkRlZmluaXRpb25zO1xyXG4gIH1cclxuICBASW5wdXQoKVxyXG4gIHNldCBkYXRhc2V0KGRhdGFzZXQ6IGFueVtdKSB7XHJcbiAgICB0aGlzLl9kYXRhc2V0ID0gZGF0YXNldDtcclxuICAgIHRoaXMucmVmcmVzaEdyaWREYXRhKGRhdGFzZXQpO1xyXG4gIH1cclxuICBnZXQgZGF0YXNldCgpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhVmlldy5nZXRJdGVtcygpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsbTogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgZXhwb3J0U2VydmljZTogRXhwb3J0U2VydmljZSxcclxuICAgIHByaXZhdGUgZXh0ZW5zaW9uU2VydmljZTogRXh0ZW5zaW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgZXh0ZW5zaW9uVXRpbGl0eTogRXh0ZW5zaW9uVXRpbGl0eSxcclxuICAgIHByaXZhdGUgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSxcclxuICAgIHByaXZhdGUgZ3JpZFNlcnZpY2U6IEdyaWRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBncmlkRXZlbnRTZXJ2aWNlOiBHcmlkRXZlbnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBncmlkU3RhdGVTZXJ2aWNlOiBHcmlkU3RhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBncm91cGluZ0FuZENvbHNwYW5TZXJ2aWNlOiBHcm91cGluZ0FuZENvbHNwYW5TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZXNpemVyOiBSZXNpemVyU2VydmljZSxcclxuICAgIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSxcclxuICAgIHByaXZhdGUgc29ydFNlcnZpY2U6IFNvcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBASW5qZWN0KCdjb25maWcnKSBwcml2YXRlIGZvclJvb3RDb25maWc6IEdyaWRPcHRpb25cclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMub25CZWZvcmVHcmlkQ3JlYXRlLmVtaXQodHJ1ZSk7XHJcblxyXG4gICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMgJiYgIXRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1Jlc2l6ZSAmJiAodGhpcy5fZml4ZWRIZWlnaHQgfHwgdGhpcy5fZml4ZWRXaWR0aCkpIHtcclxuICAgICAgdGhpcy5ncmlkSGVpZ2h0U3RyaW5nID0gYCR7dGhpcy5fZml4ZWRIZWlnaHR9cHhgO1xyXG4gICAgICB0aGlzLmdyaWRXaWR0aFN0cmluZyA9IGAke3RoaXMuX2ZpeGVkV2lkdGh9cHhgO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQmVmb3JlR3JpZERlc3Ryb3kuZW1pdCh0aGlzLmdyaWQpO1xyXG4gICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICB0aGlzLm9uQWZ0ZXJHcmlkRGVzdHJveWVkLmVtaXQodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KGVtcHR5RG9tRWxlbWVudENvbnRhaW5lciA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBncmlkQ29udGFpbmVySWQgPSB0aGlzLmdyaWRPcHRpb25zICYmIHRoaXMuZ3JpZE9wdGlvbnMuZ3JpZENvbnRhaW5lcklkO1xyXG4gICAgdGhpcy5kYXRhVmlldyA9IFtdO1xyXG4gICAgdGhpcy5ncmlkT3B0aW9ucyA9IHt9O1xyXG4gICAgdGhpcy5leHRlbnNpb25TZXJ2aWNlLmRpc3Bvc2UoKTtcclxuICAgIHRoaXMuZmlsdGVyU2VydmljZS5kaXNwb3NlKCk7XHJcbiAgICB0aGlzLmdyaWRFdmVudFNlcnZpY2UuZGlzcG9zZSgpO1xyXG4gICAgdGhpcy5ncmlkU3RhdGVTZXJ2aWNlLmRpc3Bvc2UoKTtcclxuICAgIHRoaXMuZ3JvdXBpbmdBbmRDb2xzcGFuU2VydmljZS5kaXNwb3NlKCk7XHJcbiAgICB0aGlzLnJlc2l6ZXIuZGlzcG9zZSgpO1xyXG4gICAgdGhpcy5zb3J0U2VydmljZS5kaXNwb3NlKCk7XHJcbiAgICBpZiAodGhpcy5fZXZlbnRIYW5kbGVyICYmIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCkge1xyXG4gICAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmdyaWQgJiYgdGhpcy5ncmlkLmRlc3Ryb3kpIHtcclxuICAgICAgdGhpcy5ncmlkLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZW1wdHlEb21FbGVtZW50Q29udGFpbmVyKSB7XHJcbiAgICAgICQoZ3JpZENvbnRhaW5lcklkKS5lbXB0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFsc28gdW5zdWJzY3JpYmUgYWxsIFJ4SlMgc3Vic2NyaXB0aW9uc1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gdW5zdWJzY3JpYmVBbGxPYnNlcnZhYmxlcyh0aGlzLnN1YnNjcmlwdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5pbml0aWFsaXphdGlvbigpO1xyXG4gICAgdGhpcy5pc0dyaWRJbml0aWFsaXplZCA9IHRydWU7XHJcblxyXG4gICAgLy8gdXNlciBtdXN0IHByb3ZpZGUgYSBcImdyaWRIZWlnaHRcIiBvciB1c2UgXCJhdXRvUmVzaXplOiB0cnVlXCIgaW4gdGhlIGdyaWQgb3B0aW9uc1xyXG4gICAgaWYgKCF0aGlzLl9maXhlZEhlaWdodCAmJiAhdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVBdXRvUmVzaXplKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICBgW0FuZ3VsYXItU2xpY2tncmlkXSByZXF1aXJlcyBhIFwiZ3JpZC1oZWlnaHRcIiBvciB0aGUgXCJlbmFibGVBdXRvUmVzaXplXCIgZ3JpZCBvcHRpb24gdG8gYmUgZW5hYmxlZC5cclxuICAgICAgICBXaXRob3V0IHRoYXQgdGhlIGdyaWQgd2lsbCBzZWVtIGVtcHR5IHdoaWxlIGluIGZhY3QgaXQganVzdCBkb2VzIG5vdCBoYXZlIGFueSBoZWlnaHQgZGVmaW5lLmBcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGluaXRpYWxpemF0aW9uKCkge1xyXG4gICAgLy8gbWFrZSBzdXJlIHRoZSBkYXRhc2V0IGlzIGluaXRpYWxpemVkIChpZiBub3QgaXQgd2lsbCB0aHJvdyBhbiBlcnJvciB0aGF0IGl0IGNhbm5vdCBnZXRMZW5ndGggb2YgbnVsbClcclxuICAgIHRoaXMuX2RhdGFzZXQgPSB0aGlzLl9kYXRhc2V0IHx8IFtdO1xyXG4gICAgdGhpcy5ncmlkT3B0aW9ucyA9IHRoaXMubWVyZ2VHcmlkT3B0aW9ucyh0aGlzLmdyaWRPcHRpb25zKTtcclxuICAgIHRoaXMuY3JlYXRlQmFja2VuZEFwaUludGVybmFsUG9zdFByb2Nlc3NDYWxsYmFjayh0aGlzLmdyaWRPcHRpb25zKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuY3VzdG9tRGF0YVZpZXcpIHtcclxuICAgICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMuZHJhZ2dhYmxlR3JvdXBpbmcgfHwgdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVHcm91cGluZykge1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5sb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoRXh0ZW5zaW9uTmFtZS5ncm91cEl0ZW1NZXRhUHJvdmlkZXIpO1xyXG4gICAgICAgIHRoaXMuZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlciA9IG5ldyBTbGljay5EYXRhLkdyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXIoKTtcclxuICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlciA9IHRoaXMuZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlcjtcclxuICAgICAgICB0aGlzLmRhdGFWaWV3ID0gbmV3IFNsaWNrLkRhdGEuRGF0YVZpZXcoeyBncm91cEl0ZW1NZXRhZGF0YVByb3ZpZGVyOiB0aGlzLmdyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXIgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5kYXRhVmlldyA9IG5ldyBTbGljay5EYXRhLkRhdGFWaWV3KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmb3IgY29udmVuaWVuY2UsIHdlIHByb3ZpZGUgdGhlIHByb3BlcnR5IFwiZWRpdG9yXCIgYXMgYW4gQW5ndWxhci1TbGlja2dyaWQgZWRpdG9yIGNvbXBsZXggb2JqZWN0XHJcbiAgICAvLyBob3dldmVyIFwiZWRpdG9yXCIgaXMgdXNlZCBpbnRlcm5hbGx5IGJ5IFNsaWNrR3JpZCBmb3IgaXQncyBvd24gRWRpdG9yIEZhY3RvcnlcclxuICAgIC8vIHNvIGluIG91ciBsaWIgd2Ugd2lsbCBzd2FwIFwiZWRpdG9yXCIgYW5kIGNvcHkgaXQgaW50byBhIG5ldyBwcm9wZXJ0eSBjYWxsZWQgXCJpbnRlcm5hbENvbHVtbkVkaXRvclwiXHJcbiAgICAvLyB0aGVuIHRha2UgYmFjayBcImVkaXRvci5tb2RlbFwiIGFuZCBtYWtlIGl0IHRoZSBuZXcgXCJlZGl0b3JcIiBzbyB0aGF0IFNsaWNrR3JpZCBFZGl0b3IgRmFjdG9yeSBzdGlsbCB3b3Jrc1xyXG4gICAgdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMgPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5tYXAoKGNvbHVtbjogQ29sdW1uIHwgYW55KSA9PiB7XHJcbiAgICAgIC8vIG9uIGV2ZXJ5IEVkaXRvciB0aGF0IGhhdmUgYSBcImNvbGxlY3Rpb25Bc3luY1wiLCByZXNvbHZlIHRoZSBkYXRhIGFuZCBhc3NpZ24gaXQgdG8gdGhlIFwiY29sbGVjdGlvblwiIHByb3BlcnR5XHJcbiAgICAgIGlmIChjb2x1bW4uZWRpdG9yICYmIGNvbHVtbi5lZGl0b3IuY29sbGVjdGlvbkFzeW5jKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkRWRpdG9yQ29sbGVjdGlvbkFzeW5jKGNvbHVtbik7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHsgLi4uY29sdW1uLCBlZGl0b3I6IGNvbHVtbi5lZGl0b3IgJiYgY29sdW1uLmVkaXRvci5tb2RlbCwgaW50ZXJuYWxDb2x1bW5FZGl0b3I6IHsgLi4uY29sdW1uLmVkaXRvciB9IH07XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBzYXZlIHJlZmVyZW5jZSBmb3IgYWxsIGNvbHVtbnMgYmVmb3JlIHRoZXkgb3B0aW9uYWxseSBiZWNvbWUgaGlkZGVuL3Zpc2libGVcclxuICAgIHRoaXMuc2hhcmVkU2VydmljZS5hbGxDb2x1bW5zID0gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnM7XHJcbiAgICB0aGlzLnNoYXJlZFNlcnZpY2UudmlzaWJsZUNvbHVtbnMgPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucztcclxuICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS5jcmVhdGVFeHRlbnNpb25zQmVmb3JlR3JpZENyZWF0aW9uKHRoaXMuX2NvbHVtbkRlZmluaXRpb25zLCB0aGlzLmdyaWRPcHRpb25zKTtcclxuXHJcbiAgICAvLyBidWlsZCBTbGlja0dyaWQgR3JpZCwgYWxzbyB1c2VyIG1pZ2h0IG9wdGlvbmFsbHkgcGFzcyBhIGN1c3RvbSBkYXRhdmlldyAoZS5nLiByZW1vdGUgbW9kZWwpXHJcbiAgICB0aGlzLmdyaWQgPSBuZXcgU2xpY2suR3JpZChgIyR7dGhpcy5ncmlkSWR9YCwgdGhpcy5jdXN0b21EYXRhVmlldyB8fCB0aGlzLmRhdGFWaWV3LCB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucywgdGhpcy5ncmlkT3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmRhdGFWaWV3ID0gdGhpcy5kYXRhVmlldztcclxuICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkID0gdGhpcy5ncmlkO1xyXG5cclxuICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS5hdHRhY2hEaWZmZXJlbnRFeHRlbnNpb25zKCk7XHJcbiAgICB0aGlzLmF0dGFjaERpZmZlcmVudEhvb2tzKHRoaXMuZ3JpZCwgdGhpcy5ncmlkT3B0aW9ucywgdGhpcy5kYXRhVmlldyk7XHJcblxyXG4gICAgLy8gZW1pdCB0aGUgR3JpZCAmIERhdGFWaWV3IG9iamVjdCB0byBtYWtlIHRoZW0gYXZhaWxhYmxlIGluIHBhcmVudCBjb21wb25lbnRcclxuICAgIHRoaXMub25HcmlkQ3JlYXRlZC5lbWl0KHRoaXMuZ3JpZCk7XHJcblxyXG4gICAgLy8gaW5pdGlhbGl6ZSB0aGUgU2xpY2tHcmlkIGdyaWRcclxuICAgIHRoaXMuZ3JpZC5pbml0KCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmN1c3RvbURhdGFWaWV3ICYmICh0aGlzLmRhdGFWaWV3ICYmIHRoaXMuZGF0YVZpZXcuYmVnaW5VcGRhdGUgJiYgdGhpcy5kYXRhVmlldy5zZXRJdGVtcyAmJiB0aGlzLmRhdGFWaWV3LmVuZFVwZGF0ZSkpIHtcclxuICAgICAgdGhpcy5vbkRhdGF2aWV3Q3JlYXRlZC5lbWl0KHRoaXMuZGF0YVZpZXcpO1xyXG4gICAgICB0aGlzLmRhdGFWaWV3LmJlZ2luVXBkYXRlKCk7XHJcbiAgICAgIHRoaXMuZGF0YVZpZXcuc2V0SXRlbXModGhpcy5fZGF0YXNldCwgdGhpcy5ncmlkT3B0aW9ucy5kYXRhc2V0SWRQcm9wZXJ0eU5hbWUpO1xyXG4gICAgICB0aGlzLmRhdGFWaWV3LmVuZFVwZGF0ZSgpO1xyXG5cclxuICAgICAgLy8gaWYgeW91IGRvbid0IHdhbnQgdGhlIGl0ZW1zIHRoYXQgYXJlIG5vdCB2aXNpYmxlIChkdWUgdG8gYmVpbmcgZmlsdGVyZWQgb3V0XHJcbiAgICAgIC8vIG9yIGJlaW5nIG9uIGEgZGlmZmVyZW50IHBhZ2UpIHRvIHN0YXkgc2VsZWN0ZWQsIHBhc3MgJ2ZhbHNlJyB0byB0aGUgc2Vjb25kIGFyZ1xyXG4gICAgICBpZiAodGhpcy5ncmlkT3B0aW9ucyAmJiB0aGlzLmdyaWRPcHRpb25zLmRhdGFWaWV3ICYmIHRoaXMuZ3JpZE9wdGlvbnMuZGF0YVZpZXcuaGFzT3duUHJvcGVydHkoJ3N5bmNHcmlkU2VsZWN0aW9uJykpIHtcclxuICAgICAgICB0aGlzLmRhdGFWaWV3LnN5bmNHcmlkU2VsZWN0aW9uKHRoaXMuZ3JpZCwgdGhpcy5ncmlkT3B0aW9ucy5kYXRhVmlldy5zeW5jR3JpZFNlbGVjdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyB1c2VyIG1pZ2h0IHdhbnQgdG8gaGlkZSB0aGUgaGVhZGVyIHJvdyBvbiBwYWdlIGxvYWQgYnV0IHN0aWxsIGhhdmUgYGVuYWJsZUZpbHRlcmluZzogdHJ1ZWBcclxuICAgIC8vIGlmIHRoYXQgaXMgdGhlIGNhc2UsIHdlIG5lZWQgdG8gaGlkZSB0aGUgaGVhZGVyUm93IE9OTFkgQUZURVIgYWxsIGZpbHRlcnMgZ290IGNyZWF0ZWQgJiBkYXRhVmlldyBleGlzdFxyXG4gICAgaWYgKHRoaXMuX2hpZGVIZWFkZXJSb3dBZnRlclBhZ2VMb2FkKSB7XHJcbiAgICAgIHRoaXMuc2hvd0hlYWRlclJvdyhmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWZ0ZXIgdGhlIERhdGFWaWV3IGlzIGNyZWF0ZWQgJiB1cGRhdGVkIGV4ZWN1dGUgc29tZSBwcm9jZXNzZXNcclxuICAgIHRoaXMuZXhlY3V0ZUFmdGVyRGF0YXZpZXdDcmVhdGVkKHRoaXMuZ3JpZCwgdGhpcy5ncmlkT3B0aW9ucywgdGhpcy5kYXRhVmlldyk7XHJcblxyXG4gICAgLy8gYXR0YWNoIHJlc2l6ZSBPTkxZIGFmdGVyIHRoZSBkYXRhVmlldyBpcyByZWFkeVxyXG4gICAgdGhpcy5hdHRhY2hSZXNpemVIb29rKHRoaXMuZ3JpZCwgdGhpcy5ncmlkT3B0aW9ucyk7XHJcblxyXG4gICAgLy8gYXR0YWNoIGdyb3VwaW5nIGFuZCBoZWFkZXIgZ3JvdXBpbmcgY29sc3BhbiBzZXJ2aWNlXHJcbiAgICBpZiAodGhpcy5ncmlkT3B0aW9ucy5jcmVhdGVQcmVIZWFkZXJQYW5lbCAmJiAhdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVEcmFnZ2FibGVHcm91cGluZykge1xyXG4gICAgICB0aGlzLmdyb3VwaW5nQW5kQ29sc3BhblNlcnZpY2UuaW5pdCh0aGlzLmdyaWQsIHRoaXMuZGF0YVZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGF0dGFjaCBncmlkICBzZXJ2aWNlXHJcbiAgICB0aGlzLmdyaWRTZXJ2aWNlLmluaXQodGhpcy5ncmlkLCB0aGlzLmRhdGFWaWV3KTtcclxuXHJcbiAgICAvLyB3aGVuIHVzZXIgZW5hYmxlcyB0cmFuc2xhdGlvbiwgd2UgbmVlZCB0byB0cmFuc2xhdGUgSGVhZGVycyBvbiBmaXJzdCBwYXNzICYgc3Vic2VxdWVudGx5IGluIHRoZSBhdHRhY2hEaWZmZXJlbnRIb29rc1xyXG4gICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlKSB7XHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS50cmFuc2xhdGVDb2x1bW5IZWFkZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgRXhwb3J0IGlzIGVuYWJsZWQsIGluaXRpYWxpemUgdGhlIHNlcnZpY2Ugd2l0aCB0aGUgbmVjZXNzYXJ5IGdyaWQgYW5kIG90aGVyIG9iamVjdHNcclxuICAgIGlmICh0aGlzLmdyaWRPcHRpb25zLmVuYWJsZUV4cG9ydCkge1xyXG4gICAgICB0aGlzLmV4cG9ydFNlcnZpY2UuaW5pdCh0aGlzLmdyaWQsIHRoaXMuZGF0YVZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG9uY2UgYWxsIGhvb2tzIGFyZSBpbiBwbGFjZWQgYW5kIHRoZSBncmlkIGlzIGluaXRpYWxpemVkLCB3ZSBjYW4gZW1pdCBhbiBldmVudFxyXG4gICAgdGhpcy5vbkdyaWRJbml0aWFsaXplZC5lbWl0KHRoaXMuZ3JpZCk7XHJcblxyXG4gICAgLy8gYXR0YWNoIHRoZSBCYWNrZW5kIFNlcnZpY2UgQVBJIGNhbGxiYWNrIGZ1bmN0aW9ucyBvbmx5IGFmdGVyIHRoZSBncmlkIGlzIGluaXRpYWxpemVkXHJcbiAgICAvLyBiZWNhdXNlIHRoZSBwcmVQcm9jZXNzKCkgYW5kIG9uSW5pdCgpIG1pZ2h0IGdldCB0cmlnZ2VyZWRcclxuICAgIGlmICh0aGlzLmdyaWRPcHRpb25zICYmIHRoaXMuZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgdGhpcy5hdHRhY2hCYWNrZW5kQ2FsbGJhY2tGdW5jdGlvbnModGhpcy5ncmlkT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ncmlkU3RhdGVTZXJ2aWNlLmluaXQodGhpcy5ncmlkLCB0aGlzLmV4dGVuc2lvblNlcnZpY2UsIHRoaXMuZmlsdGVyU2VydmljZSwgdGhpcy5zb3J0U2VydmljZSk7XHJcblxyXG4gICAgdGhpcy5vbkFuZ3VsYXJHcmlkQ3JlYXRlZC5lbWl0KHtcclxuICAgICAgLy8gU2xpY2sgR3JpZCAmIERhdGFWaWV3IG9iamVjdHNcclxuICAgICAgZGF0YVZpZXc6IHRoaXMuZGF0YVZpZXcsXHJcbiAgICAgIHNsaWNrR3JpZDogdGhpcy5ncmlkLFxyXG5cclxuICAgICAgLy8gcHVibGljIG1ldGhvZHNcclxuICAgICAgZGVzdHJveTogdGhpcy5kZXN0cm95LmJpbmQodGhpcyksXHJcblxyXG4gICAgICAvLyByZXR1cm4gYWxsIGF2YWlsYWJsZSBTZXJ2aWNlcyAobm9uLXNpbmdsZXRvbilcclxuICAgICAgYmFja2VuZFNlcnZpY2U6IHRoaXMuZ3JpZE9wdGlvbnMgJiYgdGhpcy5ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSAmJiB0aGlzLmdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpLnNlcnZpY2UsXHJcbiAgICAgIGV4cG9ydFNlcnZpY2U6IHRoaXMuZXhwb3J0U2VydmljZSxcclxuICAgICAgZXh0ZW5zaW9uU2VydmljZTogdGhpcy5leHRlbnNpb25TZXJ2aWNlLFxyXG4gICAgICBmaWx0ZXJTZXJ2aWNlOiB0aGlzLmZpbHRlclNlcnZpY2UsXHJcbiAgICAgIGdyaWRFdmVudFNlcnZpY2U6IHRoaXMuZ3JpZEV2ZW50U2VydmljZSxcclxuICAgICAgZ3JpZFN0YXRlU2VydmljZTogdGhpcy5ncmlkU3RhdGVTZXJ2aWNlLFxyXG4gICAgICBncmlkU2VydmljZTogdGhpcy5ncmlkU2VydmljZSxcclxuICAgICAgZ3JvdXBpbmdTZXJ2aWNlOiB0aGlzLmdyb3VwaW5nQW5kQ29sc3BhblNlcnZpY2UsXHJcbiAgICAgIHJlc2l6ZXJTZXJ2aWNlOiB0aGlzLnJlc2l6ZXIsXHJcbiAgICAgIHNvcnRTZXJ2aWNlOiB0aGlzLnNvcnRTZXJ2aWNlLFxyXG5cclxuICAgICAgLyoqIEBkZXByZWNhdGVkIHBsZWFzZSB1c2UgXCJleHRlbnNpb25TZXJ2aWNlXCIgaW5zdGVhZCAqL1xyXG4gICAgICBwbHVnaW5TZXJ2aWNlOiB0aGlzLmV4dGVuc2lvblNlcnZpY2UsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbW1pdHMgdGhlIGN1cnJlbnQgZWRpdCB0byB0aGUgZ3JpZFxyXG4gICAqL1xyXG4gIGNvbW1pdEVkaXQodGFyZ2V0OiBFbGVtZW50KSB7XHJcbiAgICBpZiAodGhpcy5ncmlkLmdldE9wdGlvbnMoKS5hdXRvQ29tbWl0RWRpdCkge1xyXG4gICAgICBjb25zdCBhY3RpdmVOb2RlID0gdGhpcy5ncmlkLmdldEFjdGl2ZUNlbGxOb2RlKCk7XHJcblxyXG4gICAgICAvLyBhIHRpbWVvdXQgbXVzdCBiZSBzZXQgb3IgdGhpcyBjb3VsZCBjb21lIGludG8gY29uZmxpY3Qgd2hlbiBzbGlja2dyaWRcclxuICAgICAgLy8gdHJpZXMgdG8gY29tbWl0IHRoZSBlZGl0IHdoZW4gZ29pbmcgZnJvbSBvbmUgZWRpdG9yIHRvIGFub3RoZXIgb24gdGhlIGdyaWRcclxuICAgICAgLy8gdGhyb3VnaCB0aGUgY2xpY2sgZXZlbnQuIElmIHRoZSB0aW1lb3V0IHdhcyBub3QgaGVyZSBpdCB3b3VsZFxyXG4gICAgICAvLyB0cnkgdG8gY29tbWl0L2Rlc3Ryb3kgdGhlIGVkaXRvciB0d2ljZSwgd2hpY2ggd291bGQgdGhyb3cgYSBqcXVlcnlcclxuICAgICAgLy8gZXJyb3IgYWJvdXQgdGhlIGVsZW1lbnQgbm90IGJlaW5nIGluIHRoZSBET01cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSB0YXJnZXQgaXMgdGhlIGFjdGl2ZSBlZGl0b3Igc28gd2UgZG8gbm90XHJcbiAgICAgICAgLy8gY29tbWl0IHByZW1hdHVyZWx5XHJcbiAgICAgICAgaWYgKGFjdGl2ZU5vZGUgJiYgYWN0aXZlTm9kZS5jb250YWlucyh0YXJnZXQpICYmIHRoaXMuZ3JpZC5nZXRFZGl0b3JMb2NrKCkuaXNBY3RpdmUoKSkge1xyXG4gICAgICAgICAgdGhpcy5ncmlkLmdldEVkaXRvckxvY2soKS5jb21taXRDdXJyZW50RWRpdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmUgb3VyIGludGVybmFsIFBvc3QgUHJvY2VzcyBjYWxsYmFjaywgaXQgd2lsbCBleGVjdXRlIGludGVybmFsbHkgYWZ0ZXIgd2UgZ2V0IGJhY2sgcmVzdWx0IGZyb20gdGhlIFByb2Nlc3MgYmFja2VuZCBjYWxsXHJcbiAgICogRm9yIG5vdywgdGhpcyBpcyBHcmFwaFFMIFNlcnZpY2UgT05MWSBmZWF0dXJlIGFuZCBpdCB3aWxsIGJhc2ljYWxseSByZWZyZXNoIHRoZSBEYXRhc2V0ICYgUGFnaW5hdGlvbiB3aXRob3V0IGhhdmluZyB0aGUgdXNlciB0byBjcmVhdGUgaGlzIG93biBQb3N0UHJvY2VzcyBldmVyeSB0aW1lXHJcbiAgICovXHJcbiAgY3JlYXRlQmFja2VuZEFwaUludGVybmFsUG9zdFByb2Nlc3NDYWxsYmFjayhncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgaWYgKGdyaWRPcHRpb25zICYmIGdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICAgIGNvbnN0IGJhY2tlbmRBcGkgPSBncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaTtcclxuXHJcbiAgICAgIC8vIGludGVybmFsUG9zdFByb2Nlc3Mgb25seSB3b3JrcyB3aXRoIGEgR3JhcGhRTCBTZXJ2aWNlLCBzbyBtYWtlIHN1cmUgaXQgaXMgdGhhdCB0eXBlXHJcbiAgICAgIGlmIChiYWNrZW5kQXBpICYmIGJhY2tlbmRBcGkuc2VydmljZSAmJiBiYWNrZW5kQXBpLnNlcnZpY2UgaW5zdGFuY2VvZiBHcmFwaHFsU2VydmljZSkge1xyXG4gICAgICAgIGJhY2tlbmRBcGkuaW50ZXJuYWxQb3N0UHJvY2VzcyA9IChwcm9jZXNzUmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGRhdGFzZXROYW1lID0gKGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5zZXJ2aWNlICYmIHR5cGVvZiBiYWNrZW5kQXBpLnNlcnZpY2UuZ2V0RGF0YXNldE5hbWUgPT09ICdmdW5jdGlvbicpID8gYmFja2VuZEFwaS5zZXJ2aWNlLmdldERhdGFzZXROYW1lKCkgOiAnJztcclxuICAgICAgICAgIGlmIChwcm9jZXNzUmVzdWx0ICYmIHByb2Nlc3NSZXN1bHQuZGF0YSAmJiBwcm9jZXNzUmVzdWx0LmRhdGFbZGF0YXNldE5hbWVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFzZXQgPSBwcm9jZXNzUmVzdWx0LmRhdGFbZGF0YXNldE5hbWVdLm5vZGVzO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hHcmlkRGF0YSh0aGlzLl9kYXRhc2V0LCBwcm9jZXNzUmVzdWx0LmRhdGFbZGF0YXNldE5hbWVdLnRvdGFsQ291bnQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YXNldCA9IFtdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGF0dGFjaERpZmZlcmVudEhvb2tzKGdyaWQ6IGFueSwgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24sIGRhdGFWaWV3OiBhbnkpIHtcclxuICAgIC8vIG9uIGxvY2FsZSBjaGFuZ2UsIHdlIGhhdmUgdG8gbWFudWFsbHkgdHJhbnNsYXRlIHRoZSBIZWFkZXJzLCBHcmlkTWVudVxyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgIHRoaXMudHJhbnNsYXRlLm9uTGFuZ0NoYW5nZS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSkge1xyXG4gICAgICAgICAgdGhpcy5leHRlbnNpb25TZXJ2aWNlLnRyYW5zbGF0ZUNvbHVtbkhlYWRlcnMoKTtcclxuICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS50cmFuc2xhdGVDb2x1bW5QaWNrZXIoKTtcclxuICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS50cmFuc2xhdGVHcmlkTWVudSgpO1xyXG4gICAgICAgICAgdGhpcy5leHRlbnNpb25TZXJ2aWNlLnRyYW5zbGF0ZUhlYWRlck1lbnUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIC8vIGlmIHVzZXIgZW50ZXJlZCBzb21lIENvbHVtbnMgXCJwcmVzZXRzXCIsIHdlIG5lZWQgdG8gcmVmbGVjdCB0aGVtIGFsbCBpbiB0aGUgZ3JpZFxyXG4gICAgaWYgKGdyaWRPcHRpb25zLnByZXNldHMgJiYgQXJyYXkuaXNBcnJheShncmlkT3B0aW9ucy5wcmVzZXRzLmNvbHVtbnMpICYmIGdyaWRPcHRpb25zLnByZXNldHMuY29sdW1ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGdyaWRDb2x1bW5zOiBDb2x1bW5bXSA9IHRoaXMuZ3JpZFN0YXRlU2VydmljZS5nZXRBc3NvY2lhdGVkR3JpZENvbHVtbnMoZ3JpZCwgZ3JpZE9wdGlvbnMucHJlc2V0cy5jb2x1bW5zKTtcclxuICAgICAgaWYgKGdyaWRDb2x1bW5zICYmIEFycmF5LmlzQXJyYXkoZ3JpZENvbHVtbnMpICYmIGdyaWRDb2x1bW5zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgY2hlY2tib3ggc2VsZWN0b3IgaXMgYWxzbyB2aXNpYmxlIGlmIGl0IGlzIGVuYWJsZWRcclxuICAgICAgICBpZiAoZ3JpZE9wdGlvbnMuZW5hYmxlQ2hlY2tib3hTZWxlY3Rvcikge1xyXG4gICAgICAgICAgY29uc3QgY2hlY2tib3hDb2x1bW4gPSAoQXJyYXkuaXNBcnJheSh0aGlzLl9jb2x1bW5EZWZpbml0aW9ucykgJiYgdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMubGVuZ3RoID4gMCkgPyB0aGlzLl9jb2x1bW5EZWZpbml0aW9uc1swXSA6IG51bGw7XHJcbiAgICAgICAgICBpZiAoY2hlY2tib3hDb2x1bW4gJiYgY2hlY2tib3hDb2x1bW4uaWQgPT09ICdfY2hlY2tib3hfc2VsZWN0b3InICYmIGdyaWRDb2x1bW5zWzBdLmlkICE9PSAnX2NoZWNrYm94X3NlbGVjdG9yJykge1xyXG4gICAgICAgICAgICBncmlkQ29sdW1ucy51bnNoaWZ0KGNoZWNrYm94Q29sdW1uKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGZpbmFsbHkgc2V0IHRoZSBuZXcgcHJlc2V0cyBjb2x1bW5zIChpbmNsdWRpbmcgY2hlY2tib3ggc2VsZWN0b3IgaWYgbmVlZCBiZSlcclxuICAgICAgICBncmlkLnNldENvbHVtbnMoZ3JpZENvbHVtbnMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXR0YWNoIGV4dGVybmFsIHNvcnRpbmcgKGJhY2tlbmQpIHdoZW4gYXZhaWxhYmxlIG9yIGRlZmF1bHQgb25Tb3J0IChkYXRhVmlldylcclxuICAgIGlmIChncmlkT3B0aW9ucy5lbmFibGVTb3J0aW5nICYmICF0aGlzLmN1c3RvbURhdGFWaWV3KSB7XHJcbiAgICAgIGdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpID8gdGhpcy5zb3J0U2VydmljZS5hdHRhY2hCYWNrZW5kT25Tb3J0KGdyaWQsIGRhdGFWaWV3KSA6IHRoaXMuc29ydFNlcnZpY2UuYXR0YWNoTG9jYWxPblNvcnQoZ3JpZCwgZGF0YVZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGF0dGFjaCBleHRlcm5hbCBmaWx0ZXIgKGJhY2tlbmQpIHdoZW4gYXZhaWxhYmxlIG9yIGRlZmF1bHQgb25GaWx0ZXIgKGRhdGFWaWV3KVxyXG4gICAgaWYgKGdyaWRPcHRpb25zLmVuYWJsZUZpbHRlcmluZyAmJiAhdGhpcy5jdXN0b21EYXRhVmlldykge1xyXG4gICAgICB0aGlzLmZpbHRlclNlcnZpY2UuaW5pdChncmlkKTtcclxuXHJcbiAgICAgIC8vIGlmIHVzZXIgZW50ZXJlZCBzb21lIEZpbHRlciBcInByZXNldHNcIiwgd2UgbmVlZCB0byByZWZsZWN0IHRoZW0gYWxsIGluIHRoZSBET01cclxuICAgICAgaWYgKGdyaWRPcHRpb25zLnByZXNldHMgJiYgQXJyYXkuaXNBcnJheShncmlkT3B0aW9ucy5wcmVzZXRzLmZpbHRlcnMpICYmIGdyaWRPcHRpb25zLnByZXNldHMuZmlsdGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJTZXJ2aWNlLnBvcHVsYXRlQ29sdW1uRmlsdGVyU2VhcmNoVGVybXMoKTtcclxuICAgICAgfVxyXG4gICAgICBncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSA/IHRoaXMuZmlsdGVyU2VydmljZS5hdHRhY2hCYWNrZW5kT25GaWx0ZXIoZ3JpZCwgdGhpcy5kYXRhVmlldykgOiB0aGlzLmZpbHRlclNlcnZpY2UuYXR0YWNoTG9jYWxPbkZpbHRlcihncmlkLCB0aGlzLmRhdGFWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiB1c2VyIHNldCBhbiBvbkluaXQgQmFja2VuZCwgd2UnbGwgcnVuIGl0IHJpZ2h0IGF3YXkgKGFuZCBpZiBzbywgd2UgYWxzbyBuZWVkIHRvIHJ1biBwcmVQcm9jZXNzLCBpbnRlcm5hbFBvc3RQcm9jZXNzICYgcG9zdFByb2Nlc3MpXHJcbiAgICBpZiAoZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgY29uc3QgYmFja2VuZEFwaSA9IGdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xyXG5cclxuICAgICAgaWYgKGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5zZXJ2aWNlICYmIGJhY2tlbmRBcGkuc2VydmljZS5pbml0KSB7XHJcbiAgICAgICAgYmFja2VuZEFwaS5zZXJ2aWNlLmluaXQoYmFja2VuZEFwaS5vcHRpb25zLCBncmlkT3B0aW9ucy5wYWdpbmF0aW9uLCB0aGlzLmdyaWQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZXhwb3NlIGFsbCBTbGljayBHcmlkIEV2ZW50cyB0aHJvdWdoIGRpc3BhdGNoXHJcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gZ3JpZCkge1xyXG4gICAgICBpZiAoZ3JpZC5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiBwcm9wLnN0YXJ0c1dpdGgoJ29uJykpIHtcclxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKGdyaWRbcHJvcF0sIChlOiBhbnksIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChgJHtzbGlja2dyaWRFdmVudFByZWZpeH0ke3RpdGxlQ2FzZShwcm9wKX1gLCB7IGV2ZW50RGF0YTogZSwgYXJncyB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGV4cG9zZSBhbGwgU2xpY2sgRGF0YVZpZXcgRXZlbnRzIHRocm91Z2ggZGlzcGF0Y2hcclxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBkYXRhVmlldykge1xyXG4gICAgICBpZiAoZGF0YVZpZXcuaGFzT3duUHJvcGVydHkocHJvcCkgJiYgcHJvcC5zdGFydHNXaXRoKCdvbicpKSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShkYXRhVmlld1twcm9wXSwgKGU6IGFueSwgYXJnczogYW55KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwYXRjaEN1c3RvbUV2ZW50KGAke3NsaWNrZ3JpZEV2ZW50UHJlZml4fSR7dGl0bGVDYXNlKHByb3ApfWAsIHsgZXZlbnREYXRhOiBlLCBhcmdzIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZXhwb3NlIEdyaWRTdGF0ZSBTZXJ2aWNlIGNoYW5nZXMgZXZlbnQgdGhyb3VnaCBkaXNwYXRjaFxyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgIHRoaXMuZ3JpZFN0YXRlU2VydmljZS5vbkdyaWRTdGF0ZUNoYW5nZWQuc3Vic2NyaWJlKChncmlkU3RhdGVDaGFuZ2U6IEdyaWRTdGF0ZUNoYW5nZSkgPT4ge1xyXG4gICAgICAgIHRoaXMub25HcmlkU3RhdGVDaGFuZ2VkLmVtaXQoZ3JpZFN0YXRlQ2hhbmdlKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG5cclxuICAgIC8vIG9uIGNlbGwgY2xpY2ssIG1haW5seSB1c2VkIHdpdGggdGhlIGNvbHVtbkRlZi5hY3Rpb24gY2FsbGJhY2tcclxuICAgIHRoaXMuZ3JpZEV2ZW50U2VydmljZS5hdHRhY2hPbkNlbGxDaGFuZ2UoZ3JpZCwgZGF0YVZpZXcpO1xyXG4gICAgdGhpcy5ncmlkRXZlbnRTZXJ2aWNlLmF0dGFjaE9uQ2xpY2soZ3JpZCwgZGF0YVZpZXcpO1xyXG5cclxuICAgIGlmIChkYXRhVmlldyAmJiBncmlkKSB7XHJcbiAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZGF0YVZpZXcub25Sb3dDb3VudENoYW5nZWQsIChlOiBhbnksIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAgIGdyaWQuaW52YWxpZGF0ZSgpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIHdpdGhvdXQgdGhpcywgZmlsdGVyaW5nIGRhdGEgd2l0aCBsb2NhbCBkYXRhc2V0IHdpbGwgbm90IGFsd2F5cyBzaG93IGNvcnJlY3RseVxyXG4gICAgICAvLyBhbHNvIGRvbid0IHVzZSBcImludmFsaWRhdGVSb3dzXCIgc2luY2UgaXQgZGVzdHJveXMgdGhlIGVudGlyZSByb3cgYW5kIGFzIGJhZCB1c2VyIGV4cGVyaWVuY2Ugd2hlbiB1cGRhdGluZyBhIHJvd1xyXG4gICAgICAvLyBzZWUgY29tbWl0OiBodHRwczovL2dpdGh1Yi5jb20vZ2hpc2NvZGluZy9Bbmd1bGFyLVNsaWNrZ3JpZC9jb21taXQvYmI2MmMwYWEyMzE0YTVkNjExODhmZjAwNWNjYjU2NDU3N2YwODgwNVxyXG4gICAgICBpZiAoZ3JpZE9wdGlvbnMgJiYgZ3JpZE9wdGlvbnMuZW5hYmxlRmlsdGVyaW5nICYmICFncmlkT3B0aW9ucy5lbmFibGVSb3dEZXRhaWxWaWV3KSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShkYXRhVmlldy5vblJvd3NDaGFuZ2VkLCAoZTogYW55LCBhcmdzOiBhbnkpID0+IHtcclxuICAgICAgICAgIGlmIChhcmdzICYmIGFyZ3Mucm93cyAmJiBBcnJheS5pc0FycmF5KGFyZ3Mucm93cykpIHtcclxuICAgICAgICAgICAgYXJncy5yb3dzLmZvckVhY2goKHJvdykgPT4gZ3JpZC51cGRhdGVSb3cocm93KSk7XHJcbiAgICAgICAgICAgIGdyaWQucmVuZGVyKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBkb2VzIHRoZSB1c2VyIGhhdmUgYSBjb2xzcGFuIGNhbGxiYWNrP1xyXG4gICAgaWYgKGdyaWRPcHRpb25zLmNvbHNwYW5DYWxsYmFjaykge1xyXG4gICAgICB0aGlzLmRhdGFWaWV3LmdldEl0ZW1NZXRhZGF0YSA9IChyb3dOdW1iZXI6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmRhdGFWaWV3LmdldEl0ZW0ocm93TnVtYmVyKTtcclxuICAgICAgICByZXR1cm4gZ3JpZE9wdGlvbnMuY29sc3BhbkNhbGxiYWNrKGl0ZW0pO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXR0YWNoQmFja2VuZENhbGxiYWNrRnVuY3Rpb25zKGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uKSB7XHJcbiAgICBjb25zdCBiYWNrZW5kQXBpID0gZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGk7XHJcbiAgICBjb25zdCBzZXJ2aWNlT3B0aW9uczogQmFja2VuZFNlcnZpY2VPcHRpb24gPSAoYmFja2VuZEFwaSAmJiBiYWNrZW5kQXBpLnNlcnZpY2UgJiYgYmFja2VuZEFwaS5zZXJ2aWNlLm9wdGlvbnMpID8gYmFja2VuZEFwaS5zZXJ2aWNlLm9wdGlvbnMgOiB7fTtcclxuICAgIGNvbnN0IGlzRXhlY3V0ZUNvbW1hbmRPbkluaXQgPSAoIXNlcnZpY2VPcHRpb25zKSA/IGZhbHNlIDogKChzZXJ2aWNlT3B0aW9ucyAmJiBzZXJ2aWNlT3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnZXhlY3V0ZVByb2Nlc3NDb21tYW5kT25Jbml0JykpID8gc2VydmljZU9wdGlvbnNbJ2V4ZWN1dGVQcm9jZXNzQ29tbWFuZE9uSW5pdCddIDogdHJ1ZSk7XHJcblxyXG4gICAgLy8gdXBkYXRlIGJhY2tlbmQgZmlsdGVycyAoaWYgbmVlZCBiZSkgYmVmb3JlIHRoZSBxdWVyeSBydW5zXHJcbiAgICBpZiAoYmFja2VuZEFwaSkge1xyXG4gICAgICBjb25zdCBiYWNrZW5kU2VydmljZSA9IGJhY2tlbmRBcGkuc2VydmljZTtcclxuXHJcbiAgICAgIC8vIGlmIHVzZXIgZW50ZXJlZCBzb21lIGFueSBcInByZXNldHNcIiwgd2UgbmVlZCB0byByZWZsZWN0IHRoZW0gYWxsIGluIHRoZSBncmlkXHJcbiAgICAgIGlmIChncmlkT3B0aW9ucyAmJiBncmlkT3B0aW9ucy5wcmVzZXRzKSB7XHJcbiAgICAgICAgLy8gRmlsdGVycyBcInByZXNldHNcIlxyXG4gICAgICAgIGlmIChiYWNrZW5kU2VydmljZSAmJiBiYWNrZW5kU2VydmljZS51cGRhdGVGaWx0ZXJzICYmIEFycmF5LmlzQXJyYXkoZ3JpZE9wdGlvbnMucHJlc2V0cy5maWx0ZXJzKSAmJiBncmlkT3B0aW9ucy5wcmVzZXRzLmZpbHRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgYmFja2VuZFNlcnZpY2UudXBkYXRlRmlsdGVycyhncmlkT3B0aW9ucy5wcmVzZXRzLmZpbHRlcnMsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTb3J0ZXJzIFwicHJlc2V0c1wiXHJcbiAgICAgICAgaWYgKGJhY2tlbmRTZXJ2aWNlICYmIGJhY2tlbmRTZXJ2aWNlLnVwZGF0ZVNvcnRlcnMgJiYgQXJyYXkuaXNBcnJheShncmlkT3B0aW9ucy5wcmVzZXRzLnNvcnRlcnMpICYmIGdyaWRPcHRpb25zLnByZXNldHMuc29ydGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBiYWNrZW5kU2VydmljZS51cGRhdGVTb3J0ZXJzKHVuZGVmaW5lZCwgZ3JpZE9wdGlvbnMucHJlc2V0cy5zb3J0ZXJzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUGFnaW5hdGlvbiBcInByZXNldHNcIlxyXG4gICAgICAgIGlmIChiYWNrZW5kU2VydmljZSAmJiBiYWNrZW5kU2VydmljZS51cGRhdGVQYWdpbmF0aW9uICYmIGdyaWRPcHRpb25zLnByZXNldHMucGFnaW5hdGlvbikge1xyXG4gICAgICAgICAgYmFja2VuZFNlcnZpY2UudXBkYXRlUGFnaW5hdGlvbihncmlkT3B0aW9ucy5wcmVzZXRzLnBhZ2luYXRpb24ucGFnZU51bWJlciwgZ3JpZE9wdGlvbnMucHJlc2V0cy5wYWdpbmF0aW9uLnBhZ2VTaXplKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgY29sdW1uRmlsdGVycyA9IHRoaXMuZmlsdGVyU2VydmljZS5nZXRDb2x1bW5GaWx0ZXJzKCk7XHJcbiAgICAgICAgaWYgKGNvbHVtbkZpbHRlcnMgJiYgYmFja2VuZFNlcnZpY2UgJiYgYmFja2VuZFNlcnZpY2UudXBkYXRlRmlsdGVycykge1xyXG4gICAgICAgICAgYmFja2VuZFNlcnZpY2UudXBkYXRlRmlsdGVycyhjb2x1bW5GaWx0ZXJzLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5zZXJ2aWNlICYmIChiYWNrZW5kQXBpLm9uSW5pdCB8fCBpc0V4ZWN1dGVDb21tYW5kT25Jbml0KSkge1xyXG4gICAgICBjb25zdCBxdWVyeSA9ICh0eXBlb2YgYmFja2VuZEFwaS5zZXJ2aWNlLmJ1aWxkUXVlcnkgPT09ICdmdW5jdGlvbicpID8gYmFja2VuZEFwaS5zZXJ2aWNlLmJ1aWxkUXVlcnkoKSA6ICcnO1xyXG4gICAgICBjb25zdCBwcm9jZXNzID0gKGlzRXhlY3V0ZUNvbW1hbmRPbkluaXQpID8gYmFja2VuZEFwaS5wcm9jZXNzKHF1ZXJ5KSA6IGJhY2tlbmRBcGkub25Jbml0KHF1ZXJ5KTtcclxuXHJcbiAgICAgIC8vIHdyYXAgdGhpcyBpbnNpZGUgYSBzZXRUaW1lb3V0IHRvIGF2b2lkIHRpbWluZyBpc3N1ZSBzaW5jZSB0aGUgZ3JpZE9wdGlvbnMgbmVlZHMgdG8gYmUgcmVhZHkgYmVmb3JlIHJ1bm5pbmcgdGhpcyBvbkluaXRcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgLy8ga2VlcCBzdGFydCB0aW1lICYgZW5kIHRpbWVzdGFtcHMgJiByZXR1cm4gaXQgYWZ0ZXIgcHJvY2VzcyBleGVjdXRpb25cclxuICAgICAgICBjb25zdCBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgICAvLyBydW4gYW55IHByZS1wcm9jZXNzLCBpZiBkZWZpbmVkLCBmb3IgZXhhbXBsZSBhIHNwaW5uZXJcclxuICAgICAgICBpZiAoYmFja2VuZEFwaS5wcmVQcm9jZXNzKSB7XHJcbiAgICAgICAgICBiYWNrZW5kQXBpLnByZVByb2Nlc3MoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAvLyB0aGUgcHJvY2Vzc2VzIGNhbiBiZSBPYnNlcnZhYmxlcyAobGlrZSBIdHRwQ2xpZW50KSBvciBQcm9taXNlc1xyXG4gICAgICAgICAgaWYgKHByb2Nlc3MgaW5zdGFuY2VvZiBQcm9taXNlICYmIHByb2Nlc3MudGhlbikge1xyXG4gICAgICAgICAgICBwcm9jZXNzLnRoZW4oKHByb2Nlc3NSZXN1bHQ6IEdyYXBocWxSZXN1bHQgfCBhbnkpID0+IGV4ZWN1dGVCYWNrZW5kUHJvY2Vzc2VzQ2FsbGJhY2soc3RhcnRUaW1lLCBwcm9jZXNzUmVzdWx0LCBiYWNrZW5kQXBpLCB0aGlzLmdyaWRPcHRpb25zKSk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZShwcm9jZXNzKSkge1xyXG4gICAgICAgICAgICBwcm9jZXNzLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAocHJvY2Vzc1Jlc3VsdDogR3JhcGhxbFJlc3VsdCB8IGFueSkgPT4gZXhlY3V0ZUJhY2tlbmRQcm9jZXNzZXNDYWxsYmFjayhzdGFydFRpbWUsIHByb2Nlc3NSZXN1bHQsIGJhY2tlbmRBcGksIHRoaXMuZ3JpZE9wdGlvbnMpLFxyXG4gICAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiBvbkJhY2tlbmRFcnJvcihlcnJvciwgYmFja2VuZEFwaSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgb25CYWNrZW5kRXJyb3IoZXJyb3IsIGJhY2tlbmRBcGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhdHRhY2hSZXNpemVIb29rKGdyaWQ6IGFueSwgb3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgLy8gZXhwYW5kL2F1dG9maXQgY29sdW1ucyBvbiBmaXJzdCBwYWdlIGxvYWRcclxuICAgIGlmIChncmlkICYmIG9wdGlvbnMuYXV0b0ZpdENvbHVtbnNPbkZpcnN0TG9hZCAmJiBvcHRpb25zLmVuYWJsZUF1dG9TaXplQ29sdW1ucykge1xyXG4gICAgICBncmlkLmF1dG9zaXplQ29sdW1ucygpO1xyXG5cclxuICAgICAgLy8gY29tcGVuc2F0ZSBhbnl0aW1lIFNsaWNrR3JpZCBtZWFzdXJlU2Nyb2xsYmFyIGlzIGluY29ycmVjdCAob25seSBzZWVtcyB0byBoYXBwZW4gaW4gQ2hyb21lIDEvNSBjb21wdXRlcnMpXHJcbiAgICAgIHRoaXMucmVzaXplci5jb21wZW5zYXRlSG9yaXpvbnRhbFNjcm9sbCh0aGlzLmdyaWQsIHRoaXMuZ3JpZE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGF1dG8tcmVzaXplIGdyaWQgb24gYnJvd3NlciByZXNpemVcclxuICAgIGlmICh0aGlzLl9maXhlZEhlaWdodCB8fCB0aGlzLl9maXhlZFdpZHRoKSB7XHJcbiAgICAgIHRoaXMucmVzaXplci5pbml0KGdyaWQsIHsgaGVpZ2h0OiB0aGlzLl9maXhlZEhlaWdodCwgd2lkdGg6IHRoaXMuX2ZpeGVkV2lkdGggfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlc2l6ZXIuaW5pdChncmlkKTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmVuYWJsZUF1dG9SZXNpemUpIHtcclxuICAgICAgdGhpcy5yZXNpemVyLmJpbmRBdXRvUmVzaXplRGF0YUdyaWQoKTtcclxuICAgICAgaWYgKGdyaWQgJiYgb3B0aW9ucy5hdXRvRml0Q29sdW1uc09uRmlyc3RMb2FkICYmIG9wdGlvbnMuZW5hYmxlQXV0b1NpemVDb2x1bW5zKSB7XHJcbiAgICAgICAgZ3JpZC5hdXRvc2l6ZUNvbHVtbnMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZUFmdGVyRGF0YXZpZXdDcmVhdGVkKGdyaWQ6IGFueSwgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24sIGRhdGFWaWV3OiBhbnkpIHtcclxuICAgIC8vIGlmIHVzZXIgZW50ZXJlZCBzb21lIFNvcnQgXCJwcmVzZXRzXCIsIHdlIG5lZWQgdG8gcmVmbGVjdCB0aGVtIGFsbCBpbiB0aGUgRE9NXHJcbiAgICBpZiAoZ3JpZE9wdGlvbnMuZW5hYmxlU29ydGluZykge1xyXG4gICAgICBpZiAoZ3JpZE9wdGlvbnMucHJlc2V0cyAmJiBBcnJheS5pc0FycmF5KGdyaWRPcHRpb25zLnByZXNldHMuc29ydGVycykgJiYgZ3JpZE9wdGlvbnMucHJlc2V0cy5zb3J0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLnNvcnRTZXJ2aWNlLmxvYWRMb2NhbFByZXNldHMoZ3JpZCwgZGF0YVZpZXcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtZXJnZUdyaWRPcHRpb25zKGdyaWRPcHRpb25zKTogR3JpZE9wdGlvbiB7XHJcbiAgICBncmlkT3B0aW9ucy5ncmlkSWQgPSB0aGlzLmdyaWRJZDtcclxuICAgIGdyaWRPcHRpb25zLmdyaWRDb250YWluZXJJZCA9IGBzbGlja0dyaWRDb250YWluZXItJHt0aGlzLmdyaWRJZH1gO1xyXG5cclxuICAgIC8vIHVzZSBqcXVlcnkgZXh0ZW5kIHRvIGRlZXAgbWVyZ2UgJiBjb3B5IHRvIGF2b2lkIGltbXV0YWJsZSBwcm9wZXJ0aWVzIGJlaW5nIGNoYW5nZWQgaW4gR2xvYmFsR3JpZE9wdGlvbnMgYWZ0ZXIgYSByb3V0ZSBjaGFuZ2VcclxuICAgIGNvbnN0IG9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgR2xvYmFsR3JpZE9wdGlvbnMsIHRoaXMuZm9yUm9vdENvbmZpZywgZ3JpZE9wdGlvbnMpO1xyXG5cclxuICAgIC8vIHVzaW5nIGpRdWVyeSBleHRlbmQgdG8gZG8gYSBkZWVwIGNsb25lIGhhcyBhbiB1bndhbnRlZCBzaWRlIG9uIG9iamVjdHMgYW5kIHBhZ2VTaXplcyBidXQgRVM2IHNwcmVhZCBoYXMgb3RoZXIgd29yc3Qgc2lkZSBlZmZlY3RzXHJcbiAgICAvLyBzbyB3ZSB3aWxsIGp1c3Qgb3ZlcndyaXRlIHRoZSBwYWdlU2l6ZXMgd2hlbiBuZWVkZWQsIHRoaXMgaXMgdGhlIG9ubHkgb25lIGNhdXNpbmcgaXNzdWVzIHNvIGZhci5cclxuICAgIC8vIGpRdWVyeSB3cm90ZSB0aGlzIG9uIHRoZWlyIGRvY3M6OiBPbiBhIGRlZXAgZXh0ZW5kLCBPYmplY3QgYW5kIEFycmF5IGFyZSBleHRlbmRlZCwgYnV0IG9iamVjdCB3cmFwcGVycyBvbiBwcmltaXRpdmUgdHlwZXMgc3VjaCBhcyBTdHJpbmcsIEJvb2xlYW4sIGFuZCBOdW1iZXIgYXJlIG5vdC5cclxuICAgIGlmIChncmlkT3B0aW9ucyAmJiBncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICBpZiAoZ3JpZE9wdGlvbnMucGFnaW5hdGlvbiAmJiBBcnJheS5pc0FycmF5KGdyaWRPcHRpb25zLnBhZ2luYXRpb24ucGFnZVNpemVzKSAmJiBncmlkT3B0aW9ucy5wYWdpbmF0aW9uLnBhZ2VTaXplcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgb3B0aW9ucy5wYWdpbmF0aW9uLnBhZ2VTaXplcyA9IGdyaWRPcHRpb25zLnBhZ2luYXRpb24ucGFnZVNpemVzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWxzbyBtYWtlIHN1cmUgdG8gc2hvdyB0aGUgaGVhZGVyIHJvdyBpZiB1c2VyIGhhdmUgZW5hYmxlZCBmaWx0ZXJpbmdcclxuICAgIHRoaXMuX2hpZGVIZWFkZXJSb3dBZnRlclBhZ2VMb2FkID0gKG9wdGlvbnMuc2hvd0hlYWRlclJvdyA9PT0gZmFsc2UpO1xyXG4gICAgaWYgKG9wdGlvbnMuZW5hYmxlRmlsdGVyaW5nICYmICFvcHRpb25zLnNob3dIZWFkZXJSb3cpIHtcclxuICAgICAgb3B0aW9ucy5zaG93SGVhZGVyUm93ID0gb3B0aW9ucy5lbmFibGVGaWx0ZXJpbmc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIGEgUGFnaW5hdGlvbiBjaGFuZ2VkLCB3ZSB3aWxsIHRyaWdnZXIgYSBHcmlkIFN0YXRlIGNoYW5nZWQgd2l0aCB0aGUgbmV3IHBhZ2luYXRpb24gaW5mb1xyXG4gICAqIEFsc28gaWYgd2UgdXNlIFJvdyBTZWxlY3Rpb24gb3IgdGhlIENoZWNrYm94IFNlbGVjdG9yLCB3ZSBuZWVkIHRvIHJlc2V0IGFueSBzZWxlY3Rpb25cclxuICAgKi9cclxuICBwYWdpbmF0aW9uQ2hhbmdlZChwYWdpbmF0aW9uOiBQYWdpbmF0aW9uKSB7XHJcbiAgICBpZiAodGhpcy5ncmlkT3B0aW9ucy5lbmFibGVSb3dTZWxlY3Rpb24gfHwgdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVDaGVja2JveFNlbGVjdG9yKSB7XHJcbiAgICAgIHRoaXMuZ3JpZFNlcnZpY2Uuc2V0U2VsZWN0ZWRSb3dzKFtdKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdyaWRTdGF0ZVNlcnZpY2Uub25HcmlkU3RhdGVDaGFuZ2VkLm5leHQoe1xyXG4gICAgICBjaGFuZ2U6IHsgbmV3VmFsdWVzOiBwYWdpbmF0aW9uLCB0eXBlOiBHcmlkU3RhdGVUeXBlLnBhZ2luYXRpb24gfSxcclxuICAgICAgZ3JpZFN0YXRlOiB0aGlzLmdyaWRTdGF0ZVNlcnZpY2UuZ2V0Q3VycmVudEdyaWRTdGF0ZSgpXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gZGF0YXNldCBjaGFuZ2VzLCB3ZSBuZWVkIHRvIHJlZnJlc2ggdGhlIGVudGlyZSBncmlkIFVJICYgcG9zc2libHkgcmVzaXplIGl0IGFzIHdlbGxcclxuICAgKiBAcGFyYW0gZGF0YXNldFxyXG4gICAqL1xyXG4gIHJlZnJlc2hHcmlkRGF0YShkYXRhc2V0OiBhbnlbXSwgdG90YWxDb3VudD86IG51bWJlcikge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YXNldCkgJiYgdGhpcy5ncmlkICYmIHRoaXMuZGF0YVZpZXcgJiYgdHlwZW9mIHRoaXMuZGF0YVZpZXcuc2V0SXRlbXMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy5kYXRhVmlldy5zZXRJdGVtcyhkYXRhc2V0LCB0aGlzLmdyaWRPcHRpb25zLmRhdGFzZXRJZFByb3BlcnR5TmFtZSk7XHJcbiAgICAgIGlmICghdGhpcy5ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICAgIHRoaXMuZGF0YVZpZXcucmVTb3J0KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhc2V0KSB7XHJcbiAgICAgICAgdGhpcy5ncmlkLmludmFsaWRhdGUoKTtcclxuICAgICAgICB0aGlzLmdyaWQucmVuZGVyKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLmdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICAgICAgLy8gZG8gd2Ugd2FudCB0byBzaG93IHBhZ2luYXRpb24/XHJcbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhIGJhY2tlbmRTZXJ2aWNlQXBpIGFuZCB0aGUgZW5hYmxlUGFnaW5hdGlvbiBpcyB1bmRlZmluZWQsIHdlJ2xsIGFzc3VtZSB0aGF0IHdlIGRvIHdhbnQgdG8gc2VlIGl0LCBlbHNlIGdldCB0aGF0IGRlZmluZWQgdmFsdWVcclxuICAgICAgICB0aGlzLnNob3dQYWdpbmF0aW9uID0gKCh0aGlzLmdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpICYmIHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlUGFnaW5hdGlvbiA9PT0gdW5kZWZpbmVkKSA/IHRydWUgOiB0aGlzLmdyaWRPcHRpb25zLmVuYWJsZVBhZ2luYXRpb24pIHx8IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBiZWZvcmUgbWVyZ2luZyB0aGUgZ3JpZCBvcHRpb25zLCBtYWtlIHN1cmUgdGhhdCBpdCBoYXMgdGhlIHRvdGFsSXRlbXMgY291bnRcclxuICAgICAgICAvLyBvbmNlIHdlIGhhdmUgdGhhdCwgd2UgY2FuIG1lcmdlIGFuZCBwYXNzIGFsbCB0aGVzZSBvcHRpb25zIHRvIHRoZSBwYWdpbmF0aW9uIGNvbXBvbmVudFxyXG4gICAgICAgIGlmICghdGhpcy5ncmlkT3B0aW9ucy5wYWdpbmF0aW9uKSB7XHJcbiAgICAgICAgICB0aGlzLmdyaWRPcHRpb25zLnBhZ2luYXRpb24gPSAodGhpcy5ncmlkT3B0aW9ucy5wYWdpbmF0aW9uKSA/IHRoaXMuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbiA6IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbiAmJiB0b3RhbENvdW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbi50b3RhbEl0ZW1zID0gdG90YWxDb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMucHJlc2V0cyAmJiB0aGlzLmdyaWRPcHRpb25zLnByZXNldHMucGFnaW5hdGlvbiAmJiB0aGlzLmdyaWRPcHRpb25zLnBhZ2luYXRpb24pIHtcclxuICAgICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbi5wYWdlU2l6ZSA9IHRoaXMuZ3JpZE9wdGlvbnMucHJlc2V0cy5wYWdpbmF0aW9uLnBhZ2VTaXplO1xyXG4gICAgICAgICAgdGhpcy5ncmlkT3B0aW9ucy5wYWdpbmF0aW9uLnBhZ2VOdW1iZXIgPSB0aGlzLmdyaWRPcHRpb25zLnByZXNldHMucGFnaW5hdGlvbi5wYWdlTnVtYmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdyaWRQYWdpbmF0aW9uT3B0aW9ucyA9IHRoaXMubWVyZ2VHcmlkT3B0aW9ucyh0aGlzLmdyaWRPcHRpb25zKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gcmVzaXplIHRoZSBncmlkIGluc2lkZSBhIHNsaWdodCB0aW1lb3V0LCBpbiBjYXNlIG90aGVyIERPTSBlbGVtZW50IGNoYW5nZWQgcHJpb3IgdG8gdGhlIHJlc2l6ZSAobGlrZSBhIGZpbHRlci9wYWdpbmF0aW9uIGNoYW5nZWQpXHJcbiAgICAgIGlmICh0aGlzLmdyaWQgJiYgdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVBdXRvUmVzaXplKSB7XHJcbiAgICAgICAgY29uc3QgZGVsYXkgPSB0aGlzLmdyaWRPcHRpb25zLmF1dG9SZXNpemUgJiYgdGhpcy5ncmlkT3B0aW9ucy5hdXRvUmVzaXplLmRlbGF5O1xyXG4gICAgICAgIHRoaXMucmVzaXplci5yZXNpemVHcmlkKGRlbGF5IHx8IDEwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRHluYW1pY2FsbHkgY2hhbmdlIG9yIHVwZGF0ZSB0aGUgY29sdW1uIGRlZmluaXRpb25zIGxpc3QuXHJcbiAgICogV2Ugd2lsbCByZS1yZW5kZXIgdGhlIGdyaWQgc28gdGhhdCB0aGUgbmV3IGhlYWRlciBhbmQgZGF0YSBzaG93cyB1cCBjb3JyZWN0bHkuXHJcbiAgICogSWYgdXNpbmcgaTE4biwgd2UgYWxzbyBuZWVkIHRvIHRyaWdnZXIgYSByZS10cmFuc2xhdGUgb2YgdGhlIGNvbHVtbiBoZWFkZXJzXHJcbiAgICovXHJcbiAgdXBkYXRlQ29sdW1uRGVmaW5pdGlvbnNMaXN0KG5ld0NvbHVtbkRlZmluaXRpb25zKSB7XHJcbiAgICBpZiAodGhpcy5ncmlkT3B0aW9ucy5lbmFibGVUcmFuc2xhdGUpIHtcclxuICAgICAgdGhpcy5leHRlbnNpb25TZXJ2aWNlLnRyYW5zbGF0ZUNvbHVtbkhlYWRlcnMoZmFsc2UsIG5ld0NvbHVtbkRlZmluaXRpb25zKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS5yZW5kZXJDb2x1bW5IZWFkZXJzKG5ld0NvbHVtbkRlZmluaXRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5ncmlkT3B0aW9ucyAmJiB0aGlzLmdyaWRPcHRpb25zLmVuYWJsZUF1dG9TaXplQ29sdW1ucykge1xyXG4gICAgICB0aGlzLmdyaWQuYXV0b3NpemVDb2x1bW5zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVG9nZ2xlIHRoZSBmaWx0ZXIgcm93IGRpc3BsYXllZCBvbiBmaXJzdCByb3dcclxuICAgKiBAcGFyYW0gaXNTaG93aW5nXHJcbiAgICovXHJcbiAgc2hvd0hlYWRlclJvdyhpc1Nob3dpbmc6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuZ3JpZC5zZXRIZWFkZXJSb3dWaXNpYmlsaXR5KGlzU2hvd2luZyk7XHJcbiAgICByZXR1cm4gaXNTaG93aW5nO1xyXG4gIH1cclxuXHJcbiAgLyoqIFRvZ2dsZSB0aGUgZmlsdGVyIHJvdyBkaXNwbGF5ZWQgb24gZmlyc3Qgcm93ICovXHJcbiAgdG9nZ2xlSGVhZGVyUm93KCkge1xyXG4gICAgY29uc3QgaXNTaG93aW5nID0gIXRoaXMuZ3JpZC5nZXRPcHRpb25zKCkuc2hvd0hlYWRlclJvdztcclxuICAgIHRoaXMuZ3JpZC5zZXRIZWFkZXJSb3dWaXNpYmlsaXR5KGlzU2hvd2luZyk7XHJcbiAgICByZXR1cm4gaXNTaG93aW5nO1xyXG4gIH1cclxuXHJcbiAgLy9cclxuICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKiogRGlzcGF0Y2ggb2YgQ3VzdG9tIEV2ZW50LCB3aGljaCBieSBkZWZhdWx0IHdpbGwgYnViYmxlICYgaXMgY2FuY2VsYWJsZSAqL1xyXG4gIHByaXZhdGUgZGlzcGF0Y2hDdXN0b21FdmVudChldmVudE5hbWU6IHN0cmluZywgZGF0YT86IGFueSwgaXNCdWJibGluZzogYm9vbGVhbiA9IHRydWUsIGlzQ2FuY2VsYWJsZTogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgIGNvbnN0IGV2ZW50SW5pdDogQ3VzdG9tRXZlbnRJbml0ID0geyBidWJibGVzOiBpc0J1YmJsaW5nLCBjYW5jZWxhYmxlOiBpc0NhbmNlbGFibGUgfTtcclxuICAgIGlmIChkYXRhKSB7XHJcbiAgICAgIGV2ZW50SW5pdC5kZXRhaWwgPSBkYXRhO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoZXZlbnROYW1lLCBldmVudEluaXQpKTtcclxuICB9XHJcblxyXG4gIC8qKiBMb2FkIHRoZSBFZGl0b3IgQ29sbGVjdGlvbiBhc3luY2hyb25vdXNseSBhbmQgcmVwbGFjZSB0aGUgXCJjb2xsZWN0aW9uXCIgcHJvcGVydHkgd2hlbiBPYnNlcnZhYmxlIHJlc29sdmVzICovXHJcbiAgcHJpdmF0ZSBsb2FkRWRpdG9yQ29sbGVjdGlvbkFzeW5jKGNvbHVtbjogQ29sdW1uKSB7XHJcbiAgICBjb25zdCBjb2xsZWN0aW9uQXN5bmMgPSBjb2x1bW4gJiYgY29sdW1uLmVkaXRvciAmJiBjb2x1bW4uZWRpdG9yLmNvbGxlY3Rpb25Bc3luYztcclxuICAgIGlmIChjb2xsZWN0aW9uQXN5bmMgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICAgIGNvbGxlY3Rpb25Bc3luYy5zdWJzY3JpYmUoKHJlc29sdmVkQ29sbGVjdGlvbikgPT4gdGhpcy51cGRhdGVFZGl0b3JDb2xsZWN0aW9uKGNvbHVtbiwgcmVzb2x2ZWRDb2xsZWN0aW9uKSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgRWRpdG9yIFwiY29sbGVjdGlvblwiIHByb3BlcnR5IGZyb20gYW4gYXN5bmMgY2FsbCByZXNvbHZlZFxyXG4gICAqIFNpbmNlIHRoaXMgaXMgY2FsbGVkIGFmdGVyIHRoZSBhc3luYyBjYWxsIHJlc29sdmVzLCB0aGUgcG9pbnRlciB3aWxsIG5vdCBiZSB0aGUgc2FtZSBhcyB0aGUgXCJjb2x1bW5cIiBhcmd1bWVudCBwYXNzZWQuXHJcbiAgICogT25jZSB3ZSBmb3VuZCB0aGUgbmV3IHBvaW50ZXIsIHdlIHdpbGwgcmVhc3NpZ24gdGhlIFwiZWRpdG9yXCIgYW5kIFwiY29sbGVjdGlvblwiIHRvIHRoZSBcImludGVybmFsQ29sdW1uRWRpdG9yXCIgc28gaXQgaGFzIG5ld2VzdCBjb2xsZWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVFZGl0b3JDb2xsZWN0aW9uKGNvbHVtbjogQ29sdW1uLCBuZXdDb2xsZWN0aW9uOiBhbnlbXSkge1xyXG4gICAgY29sdW1uLmVkaXRvci5jb2xsZWN0aW9uID0gbmV3Q29sbGVjdGlvbjtcclxuXHJcbiAgICAvLyBmaW5kIHRoZSBuZXcgY29sdW1uIHJlZmVyZW5jZSBwb2ludGVyXHJcbiAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5ncmlkLmdldENvbHVtbnMoKTtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbHVtbnMpKSB7XHJcbiAgICAgIGNvbnN0IGNvbHVtblJlZjogQ29sdW1uID0gY29sdW1ucy5maW5kKChjb2w6IENvbHVtbikgPT4gY29sLmlkID09PSBjb2x1bW4uaWQpO1xyXG4gICAgICBjb2x1bW5SZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgPSBjb2x1bW4uZWRpdG9yO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=