/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DelimiterType, FileType } from './models/index';
import { Filters } from './filters/index';
/**
 * Options that can be passed to the Bootstrap-Datetimepicker directly
 * @type {?}
 */
export var GlobalGridOptions = {
    alwaysShowVerticalScroll: true,
    autoEdit: false,
    asyncEditorLoading: false,
    autoFitColumnsOnFirstLoad: true,
    autoResize: {
        calculateAvailableSizeBy: 'window',
        bottomPadding: 20,
        minHeight: 180,
        minWidth: 300,
        sidePadding: 0
    },
    cellHighlightCssClass: 'slick-cell-modified',
    checkboxSelector: {
        cssClass: 'slick-cell-checkboxsel'
    },
    columnPicker: {
        hideForceFitButton: false,
        hideSyncResizeButton: true
    },
    datasetIdPropertyName: 'id',
    defaultFilter: Filters.input,
    enableFilterTrimWhiteSpace: false,
    // do we want to trim white spaces on all Filters?
    defaultFilterPlaceholder: '&#128269;',
    editable: false,
    enableAutoResize: true,
    enableAutoSizeColumns: true,
    enableCellNavigation: false,
    enableColumnPicker: true,
    enableColumnReorder: true,
    enableExport: true,
    enableGridMenu: true,
    enableHeaderMenu: true,
    enableMouseHoverHighlightRow: true,
    enableSorting: true,
    enableTextSelectionOnCells: true,
    explicitInitialization: true,
    exportOptions: {
        delimiter: DelimiterType.comma,
        exportWithFormatter: false,
        filename: 'export',
        format: FileType.csv,
        groupingAggregatorRowText: '',
        sanitizeDataExport: false,
        useUtf8WithBom: true
    },
    forceFitColumns: false,
    gridMenu: {
        hideClearAllFiltersCommand: false,
        hideClearAllSortingCommand: false,
        hideExportCsvCommand: false,
        hideExportTextDelimitedCommand: true,
        hideForceFitButton: false,
        hideRefreshDatasetCommand: false,
        hideSyncResizeButton: true,
        hideToggleFilterCommand: false,
        hideTogglePreHeaderCommand: false,
        iconCssClass: 'fa fa-bars',
        iconClearAllFiltersCommand: 'fa fa-filter text-danger',
        iconClearAllSortingCommand: 'fa fa-unsorted text-danger',
        iconExportCsvCommand: 'fa fa-download',
        iconExportTextDelimitedCommand: 'fa fa-download',
        iconRefreshDatasetCommand: 'fa fa-refresh',
        iconToggleFilterCommand: 'fa fa-random',
        iconTogglePreHeaderCommand: 'fa fa-random',
        menuWidth: 16,
        resizeOnShowHeaderRow: true
    },
    headerMenu: {
        autoAlign: true,
        autoAlignOffset: 12,
        minWidth: 140,
        iconClearFilterCommand: 'fa fa-filter text-danger',
        iconClearSortCommand: 'fa fa-unsorted',
        iconSortAscCommand: 'fa fa-sort-amount-asc',
        iconSortDescCommand: 'fa fa-sort-amount-desc',
        iconColumnHideCommand: 'fa fa-times',
        hideColumnHideCommand: false,
        hideClearFilterCommand: false,
        hideClearSortCommand: false,
        hideSortCommands: false
    },
    headerRowHeight: 35,
    multiColumnSort: true,
    numberedMultiColumnSort: true,
    tristateMultiColumnSort: false,
    sortColNumberInSeparateSpan: true,
    suppressActiveCellChangeOnEdit: true,
    pagination: {
        pageSizes: [10, 15, 20, 25, 30, 40, 50, 75, 100],
        pageSize: 25,
        totalItems: 0
    },
    rowDetailView: {
        cssClass: 'detail-view-toggle',
        panelRows: 1,
        keyPrefix: '__',
        useRowClick: true,
        useSimpleViewportCalc: true,
        saveDetailViewOnScroll: false,
        // the following 2 property/method should always be override by the user
        process: (/**
         * @return {?}
         */
        function () { return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) { return resolve(''); })); }),
        viewComponent: null
    },
    rowHeight: 35,
    topPanelHeight: 35
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWdyaWQtb3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZ2xvYmFsLWdyaWQtb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQWMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7O0FBSzFDLE1BQU0sS0FBTyxpQkFBaUIsR0FBZTtJQUMzQyx3QkFBd0IsRUFBRSxJQUFJO0lBQzlCLFFBQVEsRUFBRSxLQUFLO0lBQ2Ysa0JBQWtCLEVBQUUsS0FBSztJQUN6Qix5QkFBeUIsRUFBRSxJQUFJO0lBQy9CLFVBQVUsRUFBRTtRQUNWLHdCQUF3QixFQUFFLFFBQVE7UUFDbEMsYUFBYSxFQUFFLEVBQUU7UUFDakIsU0FBUyxFQUFFLEdBQUc7UUFDZCxRQUFRLEVBQUUsR0FBRztRQUNiLFdBQVcsRUFBRSxDQUFDO0tBQ2Y7SUFDRCxxQkFBcUIsRUFBRSxxQkFBcUI7SUFDNUMsZ0JBQWdCLEVBQUU7UUFDaEIsUUFBUSxFQUFFLHdCQUF3QjtLQUNuQztJQUNELFlBQVksRUFBRTtRQUNaLGtCQUFrQixFQUFFLEtBQUs7UUFDekIsb0JBQW9CLEVBQUUsSUFBSTtLQUMzQjtJQUNELHFCQUFxQixFQUFFLElBQUk7SUFDM0IsYUFBYSxFQUFFLE9BQU8sQ0FBQyxLQUFLO0lBQzVCLDBCQUEwQixFQUFFLEtBQUs7O0lBQ2pDLHdCQUF3QixFQUFFLFdBQVc7SUFDckMsUUFBUSxFQUFFLEtBQUs7SUFDZixnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLHFCQUFxQixFQUFFLElBQUk7SUFDM0Isb0JBQW9CLEVBQUUsS0FBSztJQUMzQixrQkFBa0IsRUFBRSxJQUFJO0lBQ3hCLG1CQUFtQixFQUFFLElBQUk7SUFDekIsWUFB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LCBGaWxlVHlwZSwgR3JpZE9wdGlvbiB9IGZyb20gJy4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgRmlsdGVycyB9IGZyb20gJy4vZmlsdGVycy9pbmRleCc7XHJcblxyXG4vKipcclxuICogT3B0aW9ucyB0aGF0IGNhbiBiZSBwYXNzZWQgdG8gdGhlIEJvb3RzdHJhcC1EYXRldGltZXBpY2tlciBkaXJlY3RseVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IEdsb2JhbEdyaWRPcHRpb25zOiBHcmlkT3B0aW9uID0ge1xyXG4gIGFsd2F5c1Nob3dWZXJ0aWNhbFNjcm9sbDogdHJ1ZSxcclxuICBhdXRvRWRpdDogZmFsc2UsXHJcbiAgYXN5bmNFZGl0b3JMb2FkaW5nOiBmYWxzZSxcclxuICBhdXRvRml0Q29sdW1uc09uRmlyc3RMb2FkOiB0cnVlLFxyXG4gIGF1dG9SZXNpemU6IHtcclxuICAgIGNhbGN1bGF0ZUF2YWlsYWJsZVNpemVCeTogJ3dpbmRvdycsXHJcbiAgICBib3R0b21QYWRkaW5nOiAyMCxcclxuICAgIG1pbkhlaWdodDogMTgwLFxyXG4gICAgbWluV2lkdGg6IDMwMCxcclxuICAgIHNpZGVQYWRkaW5nOiAwXHJcbiAgfSxcclxuICBjZWxsSGlnaGxpZ2h0Q3NzQ2xhc3M6ICdzbGljay1jZWxsLW1vZGlmaWVkJyxcclxuICBjaGVja2JveFNlbGVjdG9yOiB7XHJcbiAgICBjc3NDbGFzczogJ3NsaWNrLWNlbGwtY2hlY2tib3hzZWwnXHJcbiAgfSxcclxuICBjb2x1bW5QaWNrZXI6IHtcclxuICAgIGhpZGVGb3JjZUZpdEJ1dHRvbjogZmFsc2UsXHJcbiAgICBoaWRlU3luY1Jlc2l6ZUJ1dHRvbjogdHJ1ZVxyXG4gIH0sXHJcbiAgZGF0YXNldElkUHJvcGVydHlOYW1lOiAnaWQnLFxyXG4gIGRlZmF1bHRGaWx0ZXI6IEZpbHRlcnMuaW5wdXQsXHJcbiAgZW5hYmxlRmlsdGVyVHJpbVdoaXRlU3BhY2U6IGZhbHNlLCAvLyBkbyB3ZSB3YW50IHRvIHRyaW0gd2hpdGUgc3BhY2VzIG9uIGFsbCBGaWx0ZXJzP1xyXG4gIGRlZmF1bHRGaWx0ZXJQbGFjZWhvbGRlcjogJyYjMTI4MjY5OycsXHJcbiAgZWRpdGFibGU6IGZhbHNlLFxyXG4gIGVuYWJsZUF1dG9SZXNpemU6IHRydWUsXHJcbiAgZW5hYmxlQXV0b1NpemVDb2x1bW5zOiB0cnVlLFxyXG4gIGVuYWJsZUNlbGxOYXZpZ2F0aW9uOiBmYWxzZSxcclxuICBlbmFibGVDb2x1bW5QaWNrZXI6IHRydWUsXHJcbiAgZW5hYmxlQ29sdW1uUmVvcmRlcjogdHJ1ZSxcclxuICBlbmFibGVFeHBvcnQ6IHRydWUsXHJcbiAgZW5hYmxlR3JpZE1lbnU6IHRydWUsXHJcbiAgZW5hYmxlSGVhZGVyTWVudTogdHJ1ZSxcclxuICBlbmFibGVNb3VzZUhvdmVySGlnaGxpZ2h0Um93OiB0cnVlLFxyXG4gIGVuYWJsZVNvcnRpbmc6IHRydWUsXHJcbiAgZW5hYmxlVGV4dFNlbGVjdGlvbk9uQ2VsbHM6IHRydWUsXHJcbiAgZXhwbGljaXRJbml0aWFsaXphdGlvbjogdHJ1ZSxcclxuICBleHBvcnRPcHRpb25zOiB7XHJcbiAgICBkZWxpbWl0ZXI6IERlbGltaXRlclR5cGUuY29tbWEsXHJcbiAgICBleHBvcnRXaXRoRm9ybWF0dGVyOiBmYWxzZSxcclxuICAgIGZpbGVuYW1lOiAnZXhwb3J0JyxcclxuICAgIGZvcm1hdDogRmlsZVR5cGUuY3N2LFxyXG4gICAgZ3JvdXBpbmdBZ2dyZWdhdG9yUm93VGV4dDogJycsXHJcbiAgICBzYW5pdGl6ZURhdGFFeHBvcnQ6IGZhbHNlLFxyXG4gICAgdXNlVXRmOFdpdGhCb206IHRydWVcclxuICB9LFxyXG4gIGZvcmNlRml0Q29sdW1uczogZmFsc2UsXHJcbiAgZ3JpZE1lbnU6IHtcclxuICAgIGhpZGVDbGVhckFsbEZpbHRlcnNDb21tYW5kOiBmYWxzZSxcclxuICAgIGhpZGVDbGVhckFsbFNvcnRpbmdDb21tYW5kOiBmYWxzZSxcclxuICAgIGhpZGVFeHBvcnRDc3ZDb21tYW5kOiBmYWxzZSxcclxuICAgIGhpZGVFeHBvcnRUZXh0RGVsaW1pdGVkQ29tbWFuZDogdHJ1ZSxcclxuICAgIGhpZGVGb3JjZUZpdEJ1dHRvbjogZmFsc2UsXHJcbiAgICBoaWRlUmVmcmVzaERhdGFzZXRDb21tYW5kOiBmYWxzZSxcclxuICAgIGhpZGVTeW5jUmVzaXplQnV0dG9uOiB0cnVlLFxyXG4gICAgaGlkZVRvZ2dsZUZpbHRlckNvbW1hbmQ6IGZhbHNlLFxyXG4gICAgaGlkZVRvZ2dsZVByZUhlYWRlckNvbW1hbmQ6IGZhbHNlLFxyXG4gICAgaWNvbkNzc0NsYXNzOiAnZmEgZmEtYmFycycsXHJcbiAgICBpY29uQ2xlYXJBbGxGaWx0ZXJzQ29tbWFuZDogJ2ZhIGZhLWZpbHRlciB0ZXh0LWRhbmdlcicsXHJcbiAgICBpY29uQ2xlYXJBbGxTb3J0aW5nQ29tbWFuZDogJ2ZhIGZhLXVuc29ydGVkIHRleHQtZGFuZ2VyJyxcclxuICAgIGljb25FeHBvcnRDc3ZDb21tYW5kOiAnZmEgZmEtZG93bmxvYWQnLFxyXG4gICAgaWNvbkV4cG9ydFRleHREZWxpbWl0ZWRDb21tYW5kOiAnZmEgZmEtZG93bmxvYWQnLFxyXG4gICAgaWNvblJlZnJlc2hEYXRhc2V0Q29tbWFuZDogJ2ZhIGZhLXJlZnJlc2gnLFxyXG4gICAgaWNvblRvZ2dsZUZpbHRlckNvbW1hbmQ6ICdmYSBmYS1yYW5kb20nLFxyXG4gICAgaWNvblRvZ2dsZVByZUhlYWRlckNvbW1hbmQ6ICdmYSBmYS1yYW5kb20nLFxyXG4gICAgbWVudVdpZHRoOiAxNixcclxuICAgIHJlc2l6ZU9uU2hvd0hlYWRlclJvdzogdHJ1ZVxyXG4gIH0sXHJcbiAgaGVhZGVyTWVudToge1xyXG4gICAgYXV0b0FsaWduOiB0cnVlLFxyXG4gICAgYXV0b0FsaWduT2Zmc2V0OiAxMixcclxuICAgIG1pbldpZHRoOiAxNDAsXHJcbiAgICBpY29uQ2xlYXJGaWx0ZXJDb21tYW5kOiAnZmEgZmEtZmlsdGVyIHRleHQtZGFuZ2VyJyxcclxuICAgIGljb25DbGVhclNvcnRDb21tYW5kOiAnZmEgZmEtdW5zb3J0ZWQnLFxyXG4gICAgaWNvblNvcnRBc2NDb21tYW5kOiAnZmEgZmEtc29ydC1hbW91bnQtYXNjJyxcclxuICAgIGljb25Tb3J0RGVzY0NvbW1hbmQ6ICdmYSBmYS1zb3J0LWFtb3VudC1kZXNjJyxcclxuICAgIGljb25Db2x1bW5IaWRlQ29tbWFuZDogJ2ZhIGZhLXRpbWVzJyxcclxuICAgIGhpZGVDb2x1bW5IaWRlQ29tbWFuZDogZmFsc2UsXHJcbiAgICBoaWRlQ2xlYXJGaWx0ZXJDb21tYW5kOiBmYWxzZSxcclxuICAgIGhpZGVDbGVhclNvcnRDb21tYW5kOiBmYWxzZSxcclxuICAgIGhpZGVTb3J0Q29tbWFuZHM6IGZhbHNlXHJcbiAgfSxcclxuICBoZWFkZXJSb3dIZWlnaHQ6IDM1LFxyXG4gIG11bHRpQ29sdW1uU29ydDogdHJ1ZSxcclxuICBudW1iZXJlZE11bHRpQ29sdW1uU29ydDogdHJ1ZSxcclxuICB0cmlzdGF0ZU11bHRpQ29sdW1uU29ydDogZmFsc2UsXHJcbiAgc29ydENvbE51bWJlckluU2VwYXJhdGVTcGFuOiB0cnVlLFxyXG4gIHN1cHByZXNzQWN0aXZlQ2VsbENoYW5nZU9uRWRpdDogdHJ1ZSxcclxuICBwYWdpbmF0aW9uOiB7XHJcbiAgICBwYWdlU2l6ZXM6IFsxMCwgMTUsIDIwLCAyNSwgMzAsIDQwLCA1MCwgNzUsIDEwMF0sXHJcbiAgICBwYWdlU2l6ZTogMjUsXHJcbiAgICB0b3RhbEl0ZW1zOiAwXHJcbiAgfSxcclxuICByb3dEZXRhaWxWaWV3OiB7XHJcbiAgICBjc3NDbGFzczogJ2RldGFpbC12aWV3LXRvZ2dsZScsXHJcbiAgICBwYW5lbFJvd3M6IDEsXHJcbiAgICBrZXlQcmVmaXg6ICdfXycsXHJcbiAgICB1c2VSb3dDbGljazogdHJ1ZSxcclxuICAgIHVzZVNpbXBsZVZpZXdwb3J0Q2FsYzogdHJ1ZSxcclxuICAgIHNhdmVEZXRhaWxWaWV3T25TY3JvbGw6IGZhbHNlLFxyXG5cclxuICAgIC8vIHRoZSBmb2xsb3dpbmcgMiBwcm9wZXJ0eS9tZXRob2Qgc2hvdWxkIGFsd2F5cyBiZSBvdmVycmlkZSBieSB0aGUgdXNlclxyXG4gICAgcHJvY2VzczogKCkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHJlc29sdmUoJycpKSxcclxuICAgIHZpZXdDb21wb25lbnQ6IG51bGxcclxuICB9LFxyXG4gIHJvd0hlaWdodDogMzUsXHJcbiAgdG9wUGFuZWxIZWlnaHQ6IDM1XHJcbn07XHJcbiJdfQ==