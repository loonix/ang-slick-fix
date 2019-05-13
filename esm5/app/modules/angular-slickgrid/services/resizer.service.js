/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getScrollBarWidth } from './utilities';
import { Subject } from 'rxjs';
// global constants, height/width are in pixels
/** @type {?} */
var DATAGRID_MIN_HEIGHT = 180;
/** @type {?} */
var DATAGRID_MIN_WIDTH = 300;
/** @type {?} */
var DATAGRID_BOTTOM_PADDING = 20;
/** @type {?} */
var DATAGRID_PAGINATION_HEIGHT = 35;
/**
 * @record
 */
export function GridDimension() { }
if (false) {
    /** @type {?} */
    GridDimension.prototype.height;
    /** @type {?} */
    GridDimension.prototype.width;
    /** @type {?|undefined} */
    GridDimension.prototype.heightWithPagination;
}
var ResizerService = /** @class */ (function () {
    function ResizerService() {
        this.onGridAfterResize = new Subject();
        this.onGridBeforeResize = new Subject();
    }
    Object.defineProperty(ResizerService.prototype, "_gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: /**
         * Getter for the Grid Options pulled through the Grid Object
         * @private
         * @return {?}
         */
        function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizerService.prototype, "_gridUid", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return (this._grid && this._grid.getUID) ? this._grid.getUID() : this._gridOptions && this._gridOptions.gridId;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} grid
     * @param {?=} fixedDimensions
     * @return {?}
     */
    ResizerService.prototype.init = /**
     * @param {?} grid
     * @param {?=} fixedDimensions
     * @return {?}
     */
    function (grid, fixedDimensions) {
        this._grid = grid;
        if (fixedDimensions) {
            this._fixedHeight = fixedDimensions.height;
            this._fixedWidth = fixedDimensions.width;
        }
    };
    /** Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
     * Options: we could also provide a % factor to resize on each height/width independently
     */
    /**
     * Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
     * Options: we could also provide a % factor to resize on each height/width independently
     * @param {?=} newSizes
     * @return {?}
     */
    ResizerService.prototype.bindAutoResizeDataGrid = /**
     * Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
     * Options: we could also provide a % factor to resize on each height/width independently
     * @param {?=} newSizes
     * @return {?}
     */
    function (newSizes) {
        var _this = this;
        // if we can't find the grid to resize, return without attaching anything
        /** @type {?} */
        var gridDomElm = $("#" + (this._gridOptions && this._gridOptions.gridId ? this._gridOptions.gridId : 'grid1'));
        if (gridDomElm === undefined || gridDomElm.offset() === undefined) {
            return null;
        }
        // -- 1st resize the datagrid size at first load (we need this because the .on event is not triggered on first load)
        // -- also we add a slight delay (in ms) so that we resize after the grid render is done
        this.resizeGrid(10, newSizes);
        // -- 2nd attach a trigger on the Window DOM element, so that it happens also when resizing after first load
        // -- attach auto-resize to Window object only if it exist
        $(window).on("resize.grid." + this._gridUid, (/**
         * @return {?}
         */
        function () {
            _this.onGridBeforeResize.next(true);
            _this.resizeGrid(0, newSizes);
        }));
    };
    /**
     * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
     * object gridOptions
     */
    /**
     * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
     * object gridOptions
     * @param {?} gridOptions
     * @return {?}
     */
    ResizerService.prototype.calculateGridNewDimensions = /**
     * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
     * object gridOptions
     * @param {?} gridOptions
     * @return {?}
     */
    function (gridOptions) {
        /** @type {?} */
        var gridDomElm = $("#" + gridOptions.gridId);
        /** @type {?} */
        var autoResizeOptions = gridOptions && gridOptions.autoResize || {};
        /** @type {?} */
        var containerElm = (autoResizeOptions && autoResizeOptions.containerId) ? $("#" + autoResizeOptions.containerId) : $("#" + gridOptions.gridContainerId);
        if (!window || containerElm === undefined || gridDomElm === undefined) {
            return null;
        }
        // calculate bottom padding
        // if using pagination, we need to add the pagination height to this bottom padding
        /** @type {?} */
        var bottomPadding = (autoResizeOptions && autoResizeOptions.bottomPadding) ? autoResizeOptions.bottomPadding : DATAGRID_BOTTOM_PADDING;
        if (bottomPadding && (gridOptions.enablePagination || this._gridOptions.backendServiceApi)) {
            bottomPadding += DATAGRID_PAGINATION_HEIGHT;
        }
        /** @type {?} */
        var gridHeight = 0;
        /** @type {?} */
        var gridOffsetTop = 0;
        // which DOM element are we using to calculate the available size for the grid?
        if (autoResizeOptions.calculateAvailableSizeBy === 'container') {
            // uses the container's height to calculate grid height without any top offset
            gridHeight = containerElm.height() || 0;
        }
        else {
            // uses the browser's window height with its top offset to calculate grid height
            gridHeight = window.innerHeight || 0;
            /** @type {?} */
            var coordOffsetTop = gridDomElm.offset();
            gridOffsetTop = (coordOffsetTop !== undefined) ? coordOffsetTop.top : 0;
        }
        /** @type {?} */
        var availableHeight = gridHeight - gridOffsetTop - bottomPadding;
        /** @type {?} */
        var availableWidth = containerElm.width() || 0;
        /** @type {?} */
        var maxHeight = autoResizeOptions && autoResizeOptions.maxHeight || undefined;
        /** @type {?} */
        var minHeight = autoResizeOptions && autoResizeOptions.minHeight || DATAGRID_MIN_HEIGHT;
        /** @type {?} */
        var maxWidth = autoResizeOptions && autoResizeOptions.maxWidth || undefined;
        /** @type {?} */
        var minWidth = autoResizeOptions && autoResizeOptions.minWidth || DATAGRID_MIN_WIDTH;
        /** @type {?} */
        var newHeight = availableHeight;
        /** @type {?} */
        var newWidth = (autoResizeOptions && autoResizeOptions.sidePadding) ? availableWidth - autoResizeOptions.sidePadding : availableWidth;
        // optionally (when defined), make sure that grid height & width are within their thresholds
        if (newHeight < minHeight) {
            newHeight = minHeight;
        }
        if (maxHeight && newHeight > maxHeight) {
            newHeight = maxHeight;
        }
        if (newWidth < minWidth) {
            newWidth = minWidth;
        }
        if (maxWidth && newWidth > maxWidth) {
            newWidth = maxWidth;
        }
        // return the new dimensions unless a fixed height/width was defined
        return {
            height: this._fixedHeight || newHeight,
            width: this._fixedWidth || newWidth
        };
    };
    /**
     * Dispose function when element is destroyed
     */
    /**
     * Dispose function when element is destroyed
     * @return {?}
     */
    ResizerService.prototype.dispose = /**
     * Dispose function when element is destroyed
     * @return {?}
     */
    function () {
        $(window).off("resize.grid." + this._gridUid);
    };
    /**
     * For some reason this only seems to happen in Chrome and is sometime miscalculated by SlickGrid measureSrollbar() method
     * When that happens we will compensate and resize the Grid Viewport to avoid seeing horizontal scrollbar
     * Most of the time it happens, it's a tiny offset calculation of usually 3px (enough to show scrollbar)
     * GitHub issue reference: https://github.com/6pac/SlickGrid/issues/275
     */
    /**
     * For some reason this only seems to happen in Chrome and is sometime miscalculated by SlickGrid measureSrollbar() method
     * When that happens we will compensate and resize the Grid Viewport to avoid seeing horizontal scrollbar
     * Most of the time it happens, it's a tiny offset calculation of usually 3px (enough to show scrollbar)
     * GitHub issue reference: https://github.com/6pac/SlickGrid/issues/275
     * @param {?} grid
     * @param {?} gridOptions
     * @return {?}
     */
    ResizerService.prototype.compensateHorizontalScroll = /**
     * For some reason this only seems to happen in Chrome and is sometime miscalculated by SlickGrid measureSrollbar() method
     * When that happens we will compensate and resize the Grid Viewport to avoid seeing horizontal scrollbar
     * Most of the time it happens, it's a tiny offset calculation of usually 3px (enough to show scrollbar)
     * GitHub issue reference: https://github.com/6pac/SlickGrid/issues/275
     * @param {?} grid
     * @param {?} gridOptions
     * @return {?}
     */
    function (grid, gridOptions) {
        /** @type {?} */
        var gridElm = $("#" + gridOptions.gridId);
        /** @type {?} */
        var scrollbarDimensions = grid && grid.getScrollbarDimensions();
        /** @type {?} */
        var slickGridScrollbarWidth = scrollbarDimensions && scrollbarDimensions.width;
        /** @type {?} */
        var calculatedScrollbarWidth = getScrollBarWidth();
        // if scrollbar width is different from SlickGrid calculation to our custom calculation
        // then resize the grid with the missing pixels to remove scroll (usually only 3px)
        if (slickGridScrollbarWidth < calculatedScrollbarWidth) {
            gridElm.width(gridElm.width() + (calculatedScrollbarWidth - slickGridScrollbarWidth));
        }
    };
    /**
     * Return the last resize dimensions used by the service
     * @return last dimensions
     */
    /**
     * Return the last resize dimensions used by the service
     * @return {?} last dimensions
     */
    ResizerService.prototype.getLastResizeDimensions = /**
     * Return the last resize dimensions used by the service
     * @return {?} last dimensions
     */
    function () {
        return this._lastDimensions;
    };
    /** Resize the datagrid to fit the browser height & width */
    /**
     * Resize the datagrid to fit the browser height & width
     * @param {?=} delay
     * @param {?=} newSizes
     * @return {?}
     */
    ResizerService.prototype.resizeGrid = /**
     * Resize the datagrid to fit the browser height & width
     * @param {?=} delay
     * @param {?=} newSizes
     * @return {?}
     */
    function (delay, newSizes) {
        var _this = this;
        if (delay === void 0) { delay = 10; }
        if (!this._grid || !this._gridOptions) {
            throw new Error("\n      Angular-Slickgrid resizer requires a valid Grid object and Grid Options defined.\n      You can fix this by setting your gridOption to use \"enableAutoResize\" or create an instance of the ResizerService by calling bindAutoResizeDataGrid()");
        }
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            // because of the javascript async nature, we might want to delay the resize a little bit
            delay = delay || 0;
            if (delay > 0) {
                clearTimeout(_this._timer);
                _this._timer = setTimeout((/**
                 * @return {?}
                 */
                function () { return resolve(_this.resizeGridCallback(newSizes)); }), delay);
            }
            else {
                resolve(_this.resizeGridCallback(newSizes));
            }
        }));
    };
    /**
     * @param {?} newSizes
     * @return {?}
     */
    ResizerService.prototype.resizeGridCallback = /**
     * @param {?} newSizes
     * @return {?}
     */
    function (newSizes) {
        /** @type {?} */
        var lastDimensions = this.resizeGridWithDimensions(newSizes);
        this.onGridAfterResize.next(lastDimensions);
        return lastDimensions;
    };
    /**
     * @param {?=} newSizes
     * @return {?}
     */
    ResizerService.prototype.resizeGridWithDimensions = /**
     * @param {?=} newSizes
     * @return {?}
     */
    function (newSizes) {
        // calculate the available sizes with minimum height defined as a constant
        /** @type {?} */
        var availableDimensions = this.calculateGridNewDimensions(this._gridOptions);
        /** @type {?} */
        var gridElm = $("#" + this._gridOptions.gridId) || {};
        /** @type {?} */
        var gridContainerElm = $("#" + this._gridOptions.gridContainerId) || {};
        if ((newSizes || availableDimensions) && gridElm.length > 0) {
            // get the new sizes, if new sizes are passed (not 0), we will use them else use available space
            // basically if user passes 1 of the dimension, let say he passes just the height,
            // we will use the height as a fixed height but the width will be resized by it's available space
            /** @type {?} */
            var newHeight = (newSizes && newSizes.height) ? newSizes.height : availableDimensions.height;
            /** @type {?} */
            var newWidth = (newSizes && newSizes.width) ? newSizes.width : availableDimensions.width;
            // apply these new height/width to the datagrid
            if (!this._gridOptions.autoHeight) {
                gridElm.height(newHeight);
                gridContainerElm.height(newHeight);
            }
            gridElm.width(newWidth);
            gridContainerElm.width(newWidth);
            // resize the slickgrid canvas on all browser except some IE versions
            // exclude all IE below IE11
            // IE11 wants to be a better standard (W3C) follower (finally) they even changed their appName output to also have 'Netscape'
            if (new RegExp('MSIE [6-8]').exec(navigator.userAgent) === null && this._grid && this._grid.resizeCanvas) {
                this._grid.resizeCanvas();
            }
            // also call the grid auto-size columns so that it takes available when going bigger
            if (this._gridOptions && this._gridOptions.enableAutoSizeColumns && this._grid.autosizeColumns) {
                // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree) to avoid SlickGrid error "missing stylesheet"
                if (this._gridUid && $("." + this._gridUid).length > 0) {
                    this._grid.autosizeColumns();
                }
                // compensate anytime SlickGrid measureScrollbar is incorrect
                this.compensateHorizontalScroll(this._grid, this._gridOptions);
            }
            // keep last resized dimensions & resolve them to the Promise
            this._lastDimensions = {
                height: newHeight,
                width: newWidth
            };
            if ((this._gridOptions.enablePagination || this._gridOptions.backendServiceApi)) {
                this._lastDimensions.heightWithPagination = newHeight + DATAGRID_PAGINATION_HEIGHT;
            }
        }
        return this._lastDimensions;
    };
    return ResizerService;
}());
export { ResizerService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ResizerService.prototype._fixedHeight;
    /**
     * @type {?}
     * @private
     */
    ResizerService.prototype._fixedWidth;
    /**
     * @type {?}
     * @private
     */
    ResizerService.prototype._grid;
    /**
     * @type {?}
     * @private
     */
    ResizerService.prototype._lastDimensions;
    /**
     * @type {?}
     * @private
     */
    ResizerService.prototype._timer;
    /** @type {?} */
    ResizerService.prototype.onGridAfterResize;
    /** @type {?} */
    ResizerService.prototype.onGridBeforeResize;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9yZXNpemVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7SUFNekIsbUJBQW1CLEdBQUcsR0FBRzs7SUFDekIsa0JBQWtCLEdBQUcsR0FBRzs7SUFDeEIsdUJBQXVCLEdBQUcsRUFBRTs7SUFDNUIsMEJBQTBCLEdBQUcsRUFBRTs7OztBQUVyQyxtQ0FJQzs7O0lBSEMsK0JBQWU7O0lBQ2YsOEJBQWM7O0lBQ2QsNkNBQThCOztBQUdoQztJQUFBO1FBTUUsc0JBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQWlCLENBQUM7UUFDakQsdUJBQWtCLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztJQTJOOUMsQ0FBQztJQXhOQyxzQkFBWSx3Q0FBWTtRQUR4QixpRUFBaUU7Ozs7OztRQUNqRTtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM5RSxDQUFDOzs7T0FBQTtJQUVELHNCQUFZLG9DQUFROzs7OztRQUFwQjtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDakgsQ0FBQzs7O09BQUE7Ozs7OztJQUVELDZCQUFJOzs7OztJQUFKLFVBQUssSUFBUyxFQUFFLGVBQStCO1FBQzdDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksZUFBZSxFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQztZQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUM7U0FDMUM7SUFDSCxDQUFDO0lBRUQ7O09BRUc7Ozs7Ozs7SUFDSCwrQ0FBc0I7Ozs7OztJQUF0QixVQUF1QixRQUF3QjtRQUEvQyxpQkFpQkM7OztZQWZPLFVBQVUsR0FBRyxDQUFDLENBQUMsT0FBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFFLENBQUM7UUFDOUcsSUFBSSxVQUFVLEtBQUssU0FBUyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxTQUFTLEVBQUU7WUFDakUsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELG9IQUFvSDtRQUNwSCx3RkFBd0Y7UUFDeEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFOUIsNEdBQTRHO1FBQzVHLDBEQUEwRDtRQUMxRCxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLGlCQUFlLElBQUksQ0FBQyxRQUFVOzs7UUFBRTtZQUMzQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25DLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7OztJQUNILG1EQUEwQjs7Ozs7O0lBQTFCLFVBQTJCLFdBQXVCOztZQUMxQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLE1BQUksV0FBVyxDQUFDLE1BQVEsQ0FBQzs7WUFDeEMsaUJBQWlCLEdBQUcsV0FBVyxJQUFJLFdBQVcsQ0FBQyxVQUFVLElBQUksRUFBRTs7WUFDL0QsWUFBWSxHQUFHLENBQUMsaUJBQWlCLElBQUksaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFJLGlCQUFpQixDQUFDLFdBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBSSxXQUFXLENBQUMsZUFBaUIsQ0FBQztRQUN6SixJQUFJLENBQUMsTUFBTSxJQUFJLFlBQVksS0FBSyxTQUFTLElBQUksVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUNyRSxPQUFPLElBQUksQ0FBQztTQUNiOzs7O1lBSUcsYUFBYSxHQUFHLENBQUMsaUJBQWlCLElBQUksaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsdUJBQXVCO1FBQ3RJLElBQUksYUFBYSxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsRUFBRTtZQUMxRixhQUFhLElBQUksMEJBQTBCLENBQUM7U0FDN0M7O1lBRUcsVUFBVSxHQUFHLENBQUM7O1lBQ2QsYUFBYSxHQUFHLENBQUM7UUFFckIsK0VBQStFO1FBQy9FLElBQUksaUJBQWlCLENBQUMsd0JBQXdCLEtBQUssV0FBVyxFQUFFO1lBQzlELDhFQUE4RTtZQUM5RSxVQUFVLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6QzthQUFNO1lBQ0wsZ0ZBQWdGO1lBQ2hGLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQzs7Z0JBQy9CLGNBQWMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFO1lBQzFDLGFBQWEsR0FBRyxDQUFDLGNBQWMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pFOztZQUVLLGVBQWUsR0FBRyxVQUFVLEdBQUcsYUFBYSxHQUFHLGFBQWE7O1lBQzVELGNBQWMsR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQzs7WUFDMUMsU0FBUyxHQUFHLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLFNBQVMsSUFBSSxTQUFTOztZQUN6RSxTQUFTLEdBQUcsaUJBQWlCLElBQUksaUJBQWlCLENBQUMsU0FBUyxJQUFJLG1CQUFtQjs7WUFDbkYsUUFBUSxHQUFHLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLFFBQVEsSUFBSSxTQUFTOztZQUN2RSxRQUFRLEdBQUcsaUJBQWlCLElBQUksaUJBQWlCLENBQUMsUUFBUSxJQUFJLGtCQUFrQjs7WUFFbEYsU0FBUyxHQUFHLGVBQWU7O1lBQzNCLFFBQVEsR0FBRyxDQUFDLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLEdBQUcsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxjQUFjO1FBRXJJLDRGQUE0RjtRQUM1RixJQUFJLFNBQVMsR0FBRyxTQUFTLEVBQUU7WUFDekIsU0FBUyxHQUFHLFNBQVMsQ0FBQztTQUN2QjtRQUNELElBQUksU0FBUyxJQUFJLFNBQVMsR0FBRyxTQUFTLEVBQUU7WUFDdEMsU0FBUyxHQUFHLFNBQVMsQ0FBQztTQUN2QjtRQUNELElBQUksUUFBUSxHQUFHLFFBQVEsRUFBRTtZQUN2QixRQUFRLEdBQUcsUUFBUSxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxRQUFRLElBQUksUUFBUSxHQUFHLFFBQVEsRUFBRTtZQUNuQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1NBQ3JCO1FBRUQsb0VBQW9FO1FBQ3BFLE9BQU87WUFDTCxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksSUFBSSxTQUFTO1lBQ3RDLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLFFBQVE7U0FDcEMsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxnQ0FBTzs7OztJQUFQO1FBQ0UsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBZSxJQUFJLENBQUMsUUFBVSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7Ozs7O0lBQ0gsbURBQTBCOzs7Ozs7Ozs7SUFBMUIsVUFBMkIsSUFBUyxFQUFFLFdBQXVCOztZQUNyRCxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQUksV0FBVyxDQUFDLE1BQVEsQ0FBQzs7WUFFckMsbUJBQW1CLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTs7WUFDM0QsdUJBQXVCLEdBQUcsbUJBQW1CLElBQUksbUJBQW1CLENBQUMsS0FBSzs7WUFDMUUsd0JBQXdCLEdBQUcsaUJBQWlCLEVBQUU7UUFFcEQsdUZBQXVGO1FBQ3ZGLG1GQUFtRjtRQUNuRixJQUFJLHVCQUF1QixHQUFHLHdCQUF3QixFQUFFO1lBQ3RELE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsd0JBQXdCLEdBQUcsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO1NBQ3ZGO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7SUFDSCxnREFBdUI7Ozs7SUFBdkI7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVELDREQUE0RDs7Ozs7OztJQUM1RCxtQ0FBVTs7Ozs7O0lBQVYsVUFBVyxLQUFVLEVBQUUsUUFBd0I7UUFBL0MsaUJBa0JDO1FBbEJVLHNCQUFBLEVBQUEsVUFBVTtRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckMsTUFBTSxJQUFJLEtBQUssQ0FBQyx5UEFFc0ksQ0FBQyxDQUFDO1NBQ3pKO1FBRUQsT0FBTyxJQUFJLE9BQU87Ozs7UUFBQyxVQUFDLE9BQU87WUFDekIseUZBQXlGO1lBQ3pGLEtBQUssR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO1lBRW5CLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDYixZQUFZLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQixLQUFJLENBQUMsTUFBTSxHQUFHLFVBQVU7OztnQkFBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUExQyxDQUEwQyxHQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ25GO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUM1QztRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCwyQ0FBa0I7Ozs7SUFBbEIsVUFBbUIsUUFBdUI7O1lBQ2xDLGNBQWMsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDO1FBQzlELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDNUMsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCxpREFBd0I7Ozs7SUFBeEIsVUFBeUIsUUFBd0I7OztZQUV6QyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQzs7WUFDeEUsT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBUSxDQUFDLElBQUksRUFBRTs7WUFDakQsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLE1BQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFpQixDQUFDLElBQUksRUFBRTtRQUV6RSxJQUFJLENBQUMsUUFBUSxJQUFJLG1CQUFtQixDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Ozs7O2dCQUlyRCxTQUFTLEdBQUcsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNOztnQkFDeEYsUUFBUSxHQUFHLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsS0FBSztZQUUxRiwrQ0FBK0M7WUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFO2dCQUNqQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMxQixnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDcEM7WUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hCLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVqQyxxRUFBcUU7WUFDckUsNEJBQTRCO1lBQzVCLDZIQUE2SDtZQUM3SCxJQUFJLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7Z0JBQ3hHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDM0I7WUFFRCxvRkFBb0Y7WUFDcEYsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUU7Z0JBQzlGLDBJQUEwSTtnQkFDMUksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxNQUFJLElBQUksQ0FBQyxRQUFVLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN0RCxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO2lCQUM5QjtnQkFFRCw2REFBNkQ7Z0JBQzdELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNoRTtZQUVELDZEQUE2RDtZQUM3RCxJQUFJLENBQUMsZUFBZSxHQUFHO2dCQUNyQixNQUFNLEVBQUUsU0FBUztnQkFDakIsS0FBSyxFQUFFLFFBQVE7YUFDaEIsQ0FBQztZQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDL0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsR0FBRyxTQUFTLEdBQUcsMEJBQTBCLENBQUM7YUFDcEY7U0FDRjtRQUVELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBbE9ELElBa09DOzs7Ozs7O0lBak9DLHNDQUFvQzs7Ozs7SUFDcEMscUNBQW1DOzs7OztJQUNuQywrQkFBbUI7Ozs7O0lBQ25CLHlDQUF1Qzs7Ozs7SUFDdkMsZ0NBQW9COztJQUNwQiwyQ0FBaUQ7O0lBQ2pELDRDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdyaWRPcHRpb24gfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IGdldFNjcm9sbEJhcldpZHRoIH0gZnJvbSAnLi91dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbi8vIGdsb2JhbCBjb25zdGFudHMsIGhlaWdodC93aWR0aCBhcmUgaW4gcGl4ZWxzXHJcbmNvbnN0IERBVEFHUklEX01JTl9IRUlHSFQgPSAxODA7XHJcbmNvbnN0IERBVEFHUklEX01JTl9XSURUSCA9IDMwMDtcclxuY29uc3QgREFUQUdSSURfQk9UVE9NX1BBRERJTkcgPSAyMDtcclxuY29uc3QgREFUQUdSSURfUEFHSU5BVElPTl9IRUlHSFQgPSAzNTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR3JpZERpbWVuc2lvbiB7XHJcbiAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHRXaXRoUGFnaW5hdGlvbj86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlc2l6ZXJTZXJ2aWNlIHtcclxuICBwcml2YXRlIF9maXhlZEhlaWdodDogbnVtYmVyIHwgbnVsbDtcclxuICBwcml2YXRlIF9maXhlZFdpZHRoOiBudW1iZXIgfCBudWxsO1xyXG4gIHByaXZhdGUgX2dyaWQ6IGFueTtcclxuICBwcml2YXRlIF9sYXN0RGltZW5zaW9uczogR3JpZERpbWVuc2lvbjtcclxuICBwcml2YXRlIF90aW1lcjogYW55O1xyXG4gIG9uR3JpZEFmdGVyUmVzaXplID0gbmV3IFN1YmplY3Q8R3JpZERpbWVuc2lvbj4oKTtcclxuICBvbkdyaWRCZWZvcmVSZXNpemUgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByaXZhdGUgZ2V0IF9ncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcclxuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0IF9ncmlkVWlkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRVSUQpID8gdGhpcy5fZ3JpZC5nZXRVSUQoKSA6IHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmdyaWRJZDtcclxuICB9XHJcblxyXG4gIGluaXQoZ3JpZDogYW55LCBmaXhlZERpbWVuc2lvbnM/OiBHcmlkRGltZW5zaW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcclxuICAgIGlmIChmaXhlZERpbWVuc2lvbnMpIHtcclxuICAgICAgdGhpcy5fZml4ZWRIZWlnaHQgPSBmaXhlZERpbWVuc2lvbnMuaGVpZ2h0O1xyXG4gICAgICB0aGlzLl9maXhlZFdpZHRoID0gZml4ZWREaW1lbnNpb25zLndpZHRoO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIEF0dGFjaCBhbiBhdXRvIHJlc2l6ZSB0cmlnZ2VyIG9uIHRoZSBkYXRhZ3JpZCwgaWYgdGhhdCBpcyBlbmFibGUgdGhlbiBpdCB3aWxsIHJlc2l6ZSBpdHNlbGYgdG8gdGhlIGF2YWlsYWJsZSBzcGFjZVxyXG4gICAqIE9wdGlvbnM6IHdlIGNvdWxkIGFsc28gcHJvdmlkZSBhICUgZmFjdG9yIHRvIHJlc2l6ZSBvbiBlYWNoIGhlaWdodC93aWR0aCBpbmRlcGVuZGVudGx5XHJcbiAgICovXHJcbiAgYmluZEF1dG9SZXNpemVEYXRhR3JpZChuZXdTaXplcz86IEdyaWREaW1lbnNpb24pIHtcclxuICAgIC8vIGlmIHdlIGNhbid0IGZpbmQgdGhlIGdyaWQgdG8gcmVzaXplLCByZXR1cm4gd2l0aG91dCBhdHRhY2hpbmcgYW55dGhpbmdcclxuICAgIGNvbnN0IGdyaWREb21FbG0gPSAkKGAjJHt0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5ncmlkSWQgPyB0aGlzLl9ncmlkT3B0aW9ucy5ncmlkSWQgOiAnZ3JpZDEnfWApO1xyXG4gICAgaWYgKGdyaWREb21FbG0gPT09IHVuZGVmaW5lZCB8fCBncmlkRG9tRWxtLm9mZnNldCgpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0gMXN0IHJlc2l6ZSB0aGUgZGF0YWdyaWQgc2l6ZSBhdCBmaXJzdCBsb2FkICh3ZSBuZWVkIHRoaXMgYmVjYXVzZSB0aGUgLm9uIGV2ZW50IGlzIG5vdCB0cmlnZ2VyZWQgb24gZmlyc3QgbG9hZClcclxuICAgIC8vIC0tIGFsc28gd2UgYWRkIGEgc2xpZ2h0IGRlbGF5IChpbiBtcykgc28gdGhhdCB3ZSByZXNpemUgYWZ0ZXIgdGhlIGdyaWQgcmVuZGVyIGlzIGRvbmVcclxuICAgIHRoaXMucmVzaXplR3JpZCgxMCwgbmV3U2l6ZXMpO1xyXG5cclxuICAgIC8vIC0tIDJuZCBhdHRhY2ggYSB0cmlnZ2VyIG9uIHRoZSBXaW5kb3cgRE9NIGVsZW1lbnQsIHNvIHRoYXQgaXQgaGFwcGVucyBhbHNvIHdoZW4gcmVzaXppbmcgYWZ0ZXIgZmlyc3QgbG9hZFxyXG4gICAgLy8gLS0gYXR0YWNoIGF1dG8tcmVzaXplIHRvIFdpbmRvdyBvYmplY3Qgb25seSBpZiBpdCBleGlzdFxyXG4gICAgJCh3aW5kb3cpLm9uKGByZXNpemUuZ3JpZC4ke3RoaXMuX2dyaWRVaWR9YCwgKCkgPT4ge1xyXG4gICAgICB0aGlzLm9uR3JpZEJlZm9yZVJlc2l6ZS5uZXh0KHRydWUpO1xyXG4gICAgICB0aGlzLnJlc2l6ZUdyaWQoMCwgbmV3U2l6ZXMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxjdWxhdGUgdGhlIGRhdGFncmlkIG5ldyBoZWlnaHQvd2lkdGggZnJvbSB0aGUgYXZhaWxhYmxlIHNwYWNlLCBhbHNvIGNvbnNpZGVyIHRoYXQgYSAlIGZhY3RvciBtaWdodCBiZSBhcHBsaWVkIHRvIGNhbGN1bGF0aW9uXHJcbiAgICogb2JqZWN0IGdyaWRPcHRpb25zXHJcbiAgICovXHJcbiAgY2FsY3VsYXRlR3JpZE5ld0RpbWVuc2lvbnMoZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24pOiBHcmlkRGltZW5zaW9uIHwgbnVsbCB7XHJcbiAgICBjb25zdCBncmlkRG9tRWxtID0gJChgIyR7Z3JpZE9wdGlvbnMuZ3JpZElkfWApO1xyXG4gICAgY29uc3QgYXV0b1Jlc2l6ZU9wdGlvbnMgPSBncmlkT3B0aW9ucyAmJiBncmlkT3B0aW9ucy5hdXRvUmVzaXplIHx8IHt9O1xyXG4gICAgY29uc3QgY29udGFpbmVyRWxtID0gKGF1dG9SZXNpemVPcHRpb25zICYmIGF1dG9SZXNpemVPcHRpb25zLmNvbnRhaW5lcklkKSA/ICQoYCMke2F1dG9SZXNpemVPcHRpb25zLmNvbnRhaW5lcklkfWApIDogJChgIyR7Z3JpZE9wdGlvbnMuZ3JpZENvbnRhaW5lcklkfWApO1xyXG4gICAgaWYgKCF3aW5kb3cgfHwgY29udGFpbmVyRWxtID09PSB1bmRlZmluZWQgfHwgZ3JpZERvbUVsbSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNhbGN1bGF0ZSBib3R0b20gcGFkZGluZ1xyXG4gICAgLy8gaWYgdXNpbmcgcGFnaW5hdGlvbiwgd2UgbmVlZCB0byBhZGQgdGhlIHBhZ2luYXRpb24gaGVpZ2h0IHRvIHRoaXMgYm90dG9tIHBhZGRpbmdcclxuICAgIGxldCBib3R0b21QYWRkaW5nID0gKGF1dG9SZXNpemVPcHRpb25zICYmIGF1dG9SZXNpemVPcHRpb25zLmJvdHRvbVBhZGRpbmcpID8gYXV0b1Jlc2l6ZU9wdGlvbnMuYm90dG9tUGFkZGluZyA6IERBVEFHUklEX0JPVFRPTV9QQURESU5HO1xyXG4gICAgaWYgKGJvdHRvbVBhZGRpbmcgJiYgKGdyaWRPcHRpb25zLmVuYWJsZVBhZ2luYXRpb24gfHwgdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpKSB7XHJcbiAgICAgIGJvdHRvbVBhZGRpbmcgKz0gREFUQUdSSURfUEFHSU5BVElPTl9IRUlHSFQ7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGdyaWRIZWlnaHQgPSAwO1xyXG4gICAgbGV0IGdyaWRPZmZzZXRUb3AgPSAwO1xyXG5cclxuICAgIC8vIHdoaWNoIERPTSBlbGVtZW50IGFyZSB3ZSB1c2luZyB0byBjYWxjdWxhdGUgdGhlIGF2YWlsYWJsZSBzaXplIGZvciB0aGUgZ3JpZD9cclxuICAgIGlmIChhdXRvUmVzaXplT3B0aW9ucy5jYWxjdWxhdGVBdmFpbGFibGVTaXplQnkgPT09ICdjb250YWluZXInKSB7XHJcbiAgICAgIC8vIHVzZXMgdGhlIGNvbnRhaW5lcidzIGhlaWdodCB0byBjYWxjdWxhdGUgZ3JpZCBoZWlnaHQgd2l0aG91dCBhbnkgdG9wIG9mZnNldFxyXG4gICAgICBncmlkSGVpZ2h0ID0gY29udGFpbmVyRWxtLmhlaWdodCgpIHx8IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyB1c2VzIHRoZSBicm93c2VyJ3Mgd2luZG93IGhlaWdodCB3aXRoIGl0cyB0b3Agb2Zmc2V0IHRvIGNhbGN1bGF0ZSBncmlkIGhlaWdodFxyXG4gICAgICBncmlkSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IDA7XHJcbiAgICAgIGNvbnN0IGNvb3JkT2Zmc2V0VG9wID0gZ3JpZERvbUVsbS5vZmZzZXQoKTtcclxuICAgICAgZ3JpZE9mZnNldFRvcCA9IChjb29yZE9mZnNldFRvcCAhPT0gdW5kZWZpbmVkKSA/IGNvb3JkT2Zmc2V0VG9wLnRvcCA6IDA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYXZhaWxhYmxlSGVpZ2h0ID0gZ3JpZEhlaWdodCAtIGdyaWRPZmZzZXRUb3AgLSBib3R0b21QYWRkaW5nO1xyXG4gICAgY29uc3QgYXZhaWxhYmxlV2lkdGggPSBjb250YWluZXJFbG0ud2lkdGgoKSB8fCAwO1xyXG4gICAgY29uc3QgbWF4SGVpZ2h0ID0gYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMubWF4SGVpZ2h0IHx8IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IG1pbkhlaWdodCA9IGF1dG9SZXNpemVPcHRpb25zICYmIGF1dG9SZXNpemVPcHRpb25zLm1pbkhlaWdodCB8fCBEQVRBR1JJRF9NSU5fSEVJR0hUO1xyXG4gICAgY29uc3QgbWF4V2lkdGggPSBhdXRvUmVzaXplT3B0aW9ucyAmJiBhdXRvUmVzaXplT3B0aW9ucy5tYXhXaWR0aCB8fCB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBtaW5XaWR0aCA9IGF1dG9SZXNpemVPcHRpb25zICYmIGF1dG9SZXNpemVPcHRpb25zLm1pbldpZHRoIHx8IERBVEFHUklEX01JTl9XSURUSDtcclxuXHJcbiAgICBsZXQgbmV3SGVpZ2h0ID0gYXZhaWxhYmxlSGVpZ2h0O1xyXG4gICAgbGV0IG5ld1dpZHRoID0gKGF1dG9SZXNpemVPcHRpb25zICYmIGF1dG9SZXNpemVPcHRpb25zLnNpZGVQYWRkaW5nKSA/IGF2YWlsYWJsZVdpZHRoIC0gYXV0b1Jlc2l6ZU9wdGlvbnMuc2lkZVBhZGRpbmcgOiBhdmFpbGFibGVXaWR0aDtcclxuXHJcbiAgICAvLyBvcHRpb25hbGx5ICh3aGVuIGRlZmluZWQpLCBtYWtlIHN1cmUgdGhhdCBncmlkIGhlaWdodCAmIHdpZHRoIGFyZSB3aXRoaW4gdGhlaXIgdGhyZXNob2xkc1xyXG4gICAgaWYgKG5ld0hlaWdodCA8IG1pbkhlaWdodCkge1xyXG4gICAgICBuZXdIZWlnaHQgPSBtaW5IZWlnaHQ7XHJcbiAgICB9XHJcbiAgICBpZiAobWF4SGVpZ2h0ICYmIG5ld0hlaWdodCA+IG1heEhlaWdodCkge1xyXG4gICAgICBuZXdIZWlnaHQgPSBtYXhIZWlnaHQ7XHJcbiAgICB9XHJcbiAgICBpZiAobmV3V2lkdGggPCBtaW5XaWR0aCkge1xyXG4gICAgICBuZXdXaWR0aCA9IG1pbldpZHRoO1xyXG4gICAgfVxyXG4gICAgaWYgKG1heFdpZHRoICYmIG5ld1dpZHRoID4gbWF4V2lkdGgpIHtcclxuICAgICAgbmV3V2lkdGggPSBtYXhXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICAvLyByZXR1cm4gdGhlIG5ldyBkaW1lbnNpb25zIHVubGVzcyBhIGZpeGVkIGhlaWdodC93aWR0aCB3YXMgZGVmaW5lZFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaGVpZ2h0OiB0aGlzLl9maXhlZEhlaWdodCB8fCBuZXdIZWlnaHQsXHJcbiAgICAgIHdpZHRoOiB0aGlzLl9maXhlZFdpZHRoIHx8IG5ld1dpZHRoXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzcG9zZSBmdW5jdGlvbiB3aGVuIGVsZW1lbnQgaXMgZGVzdHJveWVkXHJcbiAgICovXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgICQod2luZG93KS5vZmYoYHJlc2l6ZS5ncmlkLiR7dGhpcy5fZ3JpZFVpZH1gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvciBzb21lIHJlYXNvbiB0aGlzIG9ubHkgc2VlbXMgdG8gaGFwcGVuIGluIENocm9tZSBhbmQgaXMgc29tZXRpbWUgbWlzY2FsY3VsYXRlZCBieSBTbGlja0dyaWQgbWVhc3VyZVNyb2xsYmFyKCkgbWV0aG9kXHJcbiAgICogV2hlbiB0aGF0IGhhcHBlbnMgd2Ugd2lsbCBjb21wZW5zYXRlIGFuZCByZXNpemUgdGhlIEdyaWQgVmlld3BvcnQgdG8gYXZvaWQgc2VlaW5nIGhvcml6b250YWwgc2Nyb2xsYmFyXHJcbiAgICogTW9zdCBvZiB0aGUgdGltZSBpdCBoYXBwZW5zLCBpdCdzIGEgdGlueSBvZmZzZXQgY2FsY3VsYXRpb24gb2YgdXN1YWxseSAzcHggKGVub3VnaCB0byBzaG93IHNjcm9sbGJhcilcclxuICAgKiBHaXRIdWIgaXNzdWUgcmVmZXJlbmNlOiBodHRwczovL2dpdGh1Yi5jb20vNnBhYy9TbGlja0dyaWQvaXNzdWVzLzI3NVxyXG4gICAqL1xyXG4gIGNvbXBlbnNhdGVIb3Jpem9udGFsU2Nyb2xsKGdyaWQ6IGFueSwgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24pIHtcclxuICAgIGNvbnN0IGdyaWRFbG0gPSAkKGAjJHtncmlkT3B0aW9ucy5ncmlkSWR9YCk7XHJcblxyXG4gICAgY29uc3Qgc2Nyb2xsYmFyRGltZW5zaW9ucyA9IGdyaWQgJiYgZ3JpZC5nZXRTY3JvbGxiYXJEaW1lbnNpb25zKCk7XHJcbiAgICBjb25zdCBzbGlja0dyaWRTY3JvbGxiYXJXaWR0aCA9IHNjcm9sbGJhckRpbWVuc2lvbnMgJiYgc2Nyb2xsYmFyRGltZW5zaW9ucy53aWR0aDtcclxuICAgIGNvbnN0IGNhbGN1bGF0ZWRTY3JvbGxiYXJXaWR0aCA9IGdldFNjcm9sbEJhcldpZHRoKCk7XHJcblxyXG4gICAgLy8gaWYgc2Nyb2xsYmFyIHdpZHRoIGlzIGRpZmZlcmVudCBmcm9tIFNsaWNrR3JpZCBjYWxjdWxhdGlvbiB0byBvdXIgY3VzdG9tIGNhbGN1bGF0aW9uXHJcbiAgICAvLyB0aGVuIHJlc2l6ZSB0aGUgZ3JpZCB3aXRoIHRoZSBtaXNzaW5nIHBpeGVscyB0byByZW1vdmUgc2Nyb2xsICh1c3VhbGx5IG9ubHkgM3B4KVxyXG4gICAgaWYgKHNsaWNrR3JpZFNjcm9sbGJhcldpZHRoIDwgY2FsY3VsYXRlZFNjcm9sbGJhcldpZHRoKSB7XHJcbiAgICAgIGdyaWRFbG0ud2lkdGgoZ3JpZEVsbS53aWR0aCgpICsgKGNhbGN1bGF0ZWRTY3JvbGxiYXJXaWR0aCAtIHNsaWNrR3JpZFNjcm9sbGJhcldpZHRoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gdGhlIGxhc3QgcmVzaXplIGRpbWVuc2lvbnMgdXNlZCBieSB0aGUgc2VydmljZVxyXG4gICAqIEByZXR1cm4gbGFzdCBkaW1lbnNpb25zXHJcbiAgICovXHJcbiAgZ2V0TGFzdFJlc2l6ZURpbWVuc2lvbnMoKTogR3JpZERpbWVuc2lvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGFzdERpbWVuc2lvbnM7XHJcbiAgfVxyXG5cclxuICAvKiogUmVzaXplIHRoZSBkYXRhZ3JpZCB0byBmaXQgdGhlIGJyb3dzZXIgaGVpZ2h0ICYgd2lkdGggKi9cclxuICByZXNpemVHcmlkKGRlbGF5ID0gMTAsIG5ld1NpemVzPzogR3JpZERpbWVuc2lvbik6IFByb21pc2U8R3JpZERpbWVuc2lvbj4ge1xyXG4gICAgaWYgKCF0aGlzLl9ncmlkIHx8ICF0aGlzLl9ncmlkT3B0aW9ucykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFxyXG4gICAgICBBbmd1bGFyLVNsaWNrZ3JpZCByZXNpemVyIHJlcXVpcmVzIGEgdmFsaWQgR3JpZCBvYmplY3QgYW5kIEdyaWQgT3B0aW9ucyBkZWZpbmVkLlxyXG4gICAgICBZb3UgY2FuIGZpeCB0aGlzIGJ5IHNldHRpbmcgeW91ciBncmlkT3B0aW9uIHRvIHVzZSBcImVuYWJsZUF1dG9SZXNpemVcIiBvciBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFJlc2l6ZXJTZXJ2aWNlIGJ5IGNhbGxpbmcgYmluZEF1dG9SZXNpemVEYXRhR3JpZCgpYCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIC8vIGJlY2F1c2Ugb2YgdGhlIGphdmFzY3JpcHQgYXN5bmMgbmF0dXJlLCB3ZSBtaWdodCB3YW50IHRvIGRlbGF5IHRoZSByZXNpemUgYSBsaXR0bGUgYml0XHJcbiAgICAgIGRlbGF5ID0gZGVsYXkgfHwgMDtcclxuXHJcbiAgICAgIGlmIChkZWxheSA+IDApIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xyXG4gICAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dCgoKSA9PiByZXNvbHZlKHRoaXMucmVzaXplR3JpZENhbGxiYWNrKG5ld1NpemVzKSksIGRlbGF5KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNvbHZlKHRoaXMucmVzaXplR3JpZENhbGxiYWNrKG5ld1NpemVzKSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVzaXplR3JpZENhbGxiYWNrKG5ld1NpemVzOiBHcmlkRGltZW5zaW9uKSB7XHJcbiAgICBjb25zdCBsYXN0RGltZW5zaW9ucyA9IHRoaXMucmVzaXplR3JpZFdpdGhEaW1lbnNpb25zKG5ld1NpemVzKTtcclxuICAgIHRoaXMub25HcmlkQWZ0ZXJSZXNpemUubmV4dChsYXN0RGltZW5zaW9ucyk7XHJcbiAgICByZXR1cm4gbGFzdERpbWVuc2lvbnM7XHJcbiAgfVxyXG5cclxuICByZXNpemVHcmlkV2l0aERpbWVuc2lvbnMobmV3U2l6ZXM/OiBHcmlkRGltZW5zaW9uKTogR3JpZERpbWVuc2lvbiB7XHJcbiAgICAvLyBjYWxjdWxhdGUgdGhlIGF2YWlsYWJsZSBzaXplcyB3aXRoIG1pbmltdW0gaGVpZ2h0IGRlZmluZWQgYXMgYSBjb25zdGFudFxyXG4gICAgY29uc3QgYXZhaWxhYmxlRGltZW5zaW9ucyA9IHRoaXMuY2FsY3VsYXRlR3JpZE5ld0RpbWVuc2lvbnModGhpcy5fZ3JpZE9wdGlvbnMpO1xyXG4gICAgY29uc3QgZ3JpZEVsbSA9ICQoYCMke3RoaXMuX2dyaWRPcHRpb25zLmdyaWRJZH1gKSB8fCB7fTtcclxuICAgIGNvbnN0IGdyaWRDb250YWluZXJFbG0gPSAkKGAjJHt0aGlzLl9ncmlkT3B0aW9ucy5ncmlkQ29udGFpbmVySWR9YCkgfHwge307XHJcblxyXG4gICAgaWYgKChuZXdTaXplcyB8fCBhdmFpbGFibGVEaW1lbnNpb25zKSAmJiBncmlkRWxtLmxlbmd0aCA+IDApIHtcclxuICAgICAgLy8gZ2V0IHRoZSBuZXcgc2l6ZXMsIGlmIG5ldyBzaXplcyBhcmUgcGFzc2VkIChub3QgMCksIHdlIHdpbGwgdXNlIHRoZW0gZWxzZSB1c2UgYXZhaWxhYmxlIHNwYWNlXHJcbiAgICAgIC8vIGJhc2ljYWxseSBpZiB1c2VyIHBhc3NlcyAxIG9mIHRoZSBkaW1lbnNpb24sIGxldCBzYXkgaGUgcGFzc2VzIGp1c3QgdGhlIGhlaWdodCxcclxuICAgICAgLy8gd2Ugd2lsbCB1c2UgdGhlIGhlaWdodCBhcyBhIGZpeGVkIGhlaWdodCBidXQgdGhlIHdpZHRoIHdpbGwgYmUgcmVzaXplZCBieSBpdCdzIGF2YWlsYWJsZSBzcGFjZVxyXG4gICAgICBjb25zdCBuZXdIZWlnaHQgPSAobmV3U2l6ZXMgJiYgbmV3U2l6ZXMuaGVpZ2h0KSA/IG5ld1NpemVzLmhlaWdodCA6IGF2YWlsYWJsZURpbWVuc2lvbnMuaGVpZ2h0O1xyXG4gICAgICBjb25zdCBuZXdXaWR0aCA9IChuZXdTaXplcyAmJiBuZXdTaXplcy53aWR0aCkgPyBuZXdTaXplcy53aWR0aCA6IGF2YWlsYWJsZURpbWVuc2lvbnMud2lkdGg7XHJcblxyXG4gICAgICAvLyBhcHBseSB0aGVzZSBuZXcgaGVpZ2h0L3dpZHRoIHRvIHRoZSBkYXRhZ3JpZFxyXG4gICAgICBpZiAoIXRoaXMuX2dyaWRPcHRpb25zLmF1dG9IZWlnaHQpIHtcclxuICAgICAgICBncmlkRWxtLmhlaWdodChuZXdIZWlnaHQpO1xyXG4gICAgICAgIGdyaWRDb250YWluZXJFbG0uaGVpZ2h0KG5ld0hlaWdodCk7XHJcbiAgICAgIH1cclxuICAgICAgZ3JpZEVsbS53aWR0aChuZXdXaWR0aCk7XHJcbiAgICAgIGdyaWRDb250YWluZXJFbG0ud2lkdGgobmV3V2lkdGgpO1xyXG5cclxuICAgICAgLy8gcmVzaXplIHRoZSBzbGlja2dyaWQgY2FudmFzIG9uIGFsbCBicm93c2VyIGV4Y2VwdCBzb21lIElFIHZlcnNpb25zXHJcbiAgICAgIC8vIGV4Y2x1ZGUgYWxsIElFIGJlbG93IElFMTFcclxuICAgICAgLy8gSUUxMSB3YW50cyB0byBiZSBhIGJldHRlciBzdGFuZGFyZCAoVzNDKSBmb2xsb3dlciAoZmluYWxseSkgdGhleSBldmVuIGNoYW5nZWQgdGhlaXIgYXBwTmFtZSBvdXRwdXQgdG8gYWxzbyBoYXZlICdOZXRzY2FwZSdcclxuICAgICAgaWYgKG5ldyBSZWdFeHAoJ01TSUUgWzYtOF0nKS5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpID09PSBudWxsICYmIHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5yZXNpemVDYW52YXMpIHtcclxuICAgICAgICB0aGlzLl9ncmlkLnJlc2l6ZUNhbnZhcygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBhbHNvIGNhbGwgdGhlIGdyaWQgYXV0by1zaXplIGNvbHVtbnMgc28gdGhhdCBpdCB0YWtlcyBhdmFpbGFibGUgd2hlbiBnb2luZyBiaWdnZXJcclxuICAgICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZUF1dG9TaXplQ29sdW1ucyAmJiB0aGlzLl9ncmlkLmF1dG9zaXplQ29sdW1ucykge1xyXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHRoZSBncmlkIHN0aWxsIGV4aXN0IChieSBsb29raW5nIGlmIHRoZSBHcmlkIFVJRCBpcyBmb3VuZCBpbiB0aGUgRE9NIHRyZWUpIHRvIGF2b2lkIFNsaWNrR3JpZCBlcnJvciBcIm1pc3Npbmcgc3R5bGVzaGVldFwiXHJcbiAgICAgICAgaWYgKHRoaXMuX2dyaWRVaWQgJiYgJChgLiR7dGhpcy5fZ3JpZFVpZH1gKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLl9ncmlkLmF1dG9zaXplQ29sdW1ucygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29tcGVuc2F0ZSBhbnl0aW1lIFNsaWNrR3JpZCBtZWFzdXJlU2Nyb2xsYmFyIGlzIGluY29ycmVjdFxyXG4gICAgICAgIHRoaXMuY29tcGVuc2F0ZUhvcml6b250YWxTY3JvbGwodGhpcy5fZ3JpZCwgdGhpcy5fZ3JpZE9wdGlvbnMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBrZWVwIGxhc3QgcmVzaXplZCBkaW1lbnNpb25zICYgcmVzb2x2ZSB0aGVtIHRvIHRoZSBQcm9taXNlXHJcbiAgICAgIHRoaXMuX2xhc3REaW1lbnNpb25zID0ge1xyXG4gICAgICAgIGhlaWdodDogbmV3SGVpZ2h0LFxyXG4gICAgICAgIHdpZHRoOiBuZXdXaWR0aFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKCh0aGlzLl9ncmlkT3B0aW9ucy5lbmFibGVQYWdpbmF0aW9uIHx8IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSkge1xyXG4gICAgICAgIHRoaXMuX2xhc3REaW1lbnNpb25zLmhlaWdodFdpdGhQYWdpbmF0aW9uID0gbmV3SGVpZ2h0ICsgREFUQUdSSURfUEFHSU5BVElPTl9IRUlHSFQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fbGFzdERpbWVuc2lvbnM7XHJcbiAgfVxyXG59XHJcbiJdfQ==