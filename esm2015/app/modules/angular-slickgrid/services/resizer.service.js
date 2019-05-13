/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getScrollBarWidth } from './utilities';
import { Subject } from 'rxjs';
// global constants, height/width are in pixels
/** @type {?} */
const DATAGRID_MIN_HEIGHT = 180;
/** @type {?} */
const DATAGRID_MIN_WIDTH = 300;
/** @type {?} */
const DATAGRID_BOTTOM_PADDING = 20;
/** @type {?} */
const DATAGRID_PAGINATION_HEIGHT = 35;
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
export class ResizerService {
    constructor() {
        this.onGridAfterResize = new Subject();
        this.onGridBeforeResize = new Subject();
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @private
     * @return {?}
     */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    /**
     * @private
     * @return {?}
     */
    get _gridUid() {
        return (this._grid && this._grid.getUID) ? this._grid.getUID() : this._gridOptions && this._gridOptions.gridId;
    }
    /**
     * @param {?} grid
     * @param {?=} fixedDimensions
     * @return {?}
     */
    init(grid, fixedDimensions) {
        this._grid = grid;
        if (fixedDimensions) {
            this._fixedHeight = fixedDimensions.height;
            this._fixedWidth = fixedDimensions.width;
        }
    }
    /**
     * Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
     * Options: we could also provide a % factor to resize on each height/width independently
     * @param {?=} newSizes
     * @return {?}
     */
    bindAutoResizeDataGrid(newSizes) {
        // if we can't find the grid to resize, return without attaching anything
        /** @type {?} */
        const gridDomElm = $(`#${this._gridOptions && this._gridOptions.gridId ? this._gridOptions.gridId : 'grid1'}`);
        if (gridDomElm === undefined || gridDomElm.offset() === undefined) {
            return null;
        }
        // -- 1st resize the datagrid size at first load (we need this because the .on event is not triggered on first load)
        // -- also we add a slight delay (in ms) so that we resize after the grid render is done
        this.resizeGrid(10, newSizes);
        // -- 2nd attach a trigger on the Window DOM element, so that it happens also when resizing after first load
        // -- attach auto-resize to Window object only if it exist
        $(window).on(`resize.grid.${this._gridUid}`, (/**
         * @return {?}
         */
        () => {
            this.onGridBeforeResize.next(true);
            this.resizeGrid(0, newSizes);
        }));
    }
    /**
     * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
     * object gridOptions
     * @param {?} gridOptions
     * @return {?}
     */
    calculateGridNewDimensions(gridOptions) {
        /** @type {?} */
        const gridDomElm = $(`#${gridOptions.gridId}`);
        /** @type {?} */
        const autoResizeOptions = gridOptions && gridOptions.autoResize || {};
        /** @type {?} */
        const containerElm = (autoResizeOptions && autoResizeOptions.containerId) ? $(`#${autoResizeOptions.containerId}`) : $(`#${gridOptions.gridContainerId}`);
        if (!window || containerElm === undefined || gridDomElm === undefined) {
            return null;
        }
        // calculate bottom padding
        // if using pagination, we need to add the pagination height to this bottom padding
        /** @type {?} */
        let bottomPadding = (autoResizeOptions && autoResizeOptions.bottomPadding) ? autoResizeOptions.bottomPadding : DATAGRID_BOTTOM_PADDING;
        if (bottomPadding && (gridOptions.enablePagination || this._gridOptions.backendServiceApi)) {
            bottomPadding += DATAGRID_PAGINATION_HEIGHT;
        }
        /** @type {?} */
        let gridHeight = 0;
        /** @type {?} */
        let gridOffsetTop = 0;
        // which DOM element are we using to calculate the available size for the grid?
        if (autoResizeOptions.calculateAvailableSizeBy === 'container') {
            // uses the container's height to calculate grid height without any top offset
            gridHeight = containerElm.height() || 0;
        }
        else {
            // uses the browser's window height with its top offset to calculate grid height
            gridHeight = window.innerHeight || 0;
            /** @type {?} */
            const coordOffsetTop = gridDomElm.offset();
            gridOffsetTop = (coordOffsetTop !== undefined) ? coordOffsetTop.top : 0;
        }
        /** @type {?} */
        const availableHeight = gridHeight - gridOffsetTop - bottomPadding;
        /** @type {?} */
        const availableWidth = containerElm.width() || 0;
        /** @type {?} */
        const maxHeight = autoResizeOptions && autoResizeOptions.maxHeight || undefined;
        /** @type {?} */
        const minHeight = autoResizeOptions && autoResizeOptions.minHeight || DATAGRID_MIN_HEIGHT;
        /** @type {?} */
        const maxWidth = autoResizeOptions && autoResizeOptions.maxWidth || undefined;
        /** @type {?} */
        const minWidth = autoResizeOptions && autoResizeOptions.minWidth || DATAGRID_MIN_WIDTH;
        /** @type {?} */
        let newHeight = availableHeight;
        /** @type {?} */
        let newWidth = (autoResizeOptions && autoResizeOptions.sidePadding) ? availableWidth - autoResizeOptions.sidePadding : availableWidth;
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
    }
    /**
     * Dispose function when element is destroyed
     * @return {?}
     */
    dispose() {
        $(window).off(`resize.grid.${this._gridUid}`);
    }
    /**
     * For some reason this only seems to happen in Chrome and is sometime miscalculated by SlickGrid measureSrollbar() method
     * When that happens we will compensate and resize the Grid Viewport to avoid seeing horizontal scrollbar
     * Most of the time it happens, it's a tiny offset calculation of usually 3px (enough to show scrollbar)
     * GitHub issue reference: https://github.com/6pac/SlickGrid/issues/275
     * @param {?} grid
     * @param {?} gridOptions
     * @return {?}
     */
    compensateHorizontalScroll(grid, gridOptions) {
        /** @type {?} */
        const gridElm = $(`#${gridOptions.gridId}`);
        /** @type {?} */
        const scrollbarDimensions = grid && grid.getScrollbarDimensions();
        /** @type {?} */
        const slickGridScrollbarWidth = scrollbarDimensions && scrollbarDimensions.width;
        /** @type {?} */
        const calculatedScrollbarWidth = getScrollBarWidth();
        // if scrollbar width is different from SlickGrid calculation to our custom calculation
        // then resize the grid with the missing pixels to remove scroll (usually only 3px)
        if (slickGridScrollbarWidth < calculatedScrollbarWidth) {
            gridElm.width(gridElm.width() + (calculatedScrollbarWidth - slickGridScrollbarWidth));
        }
    }
    /**
     * Return the last resize dimensions used by the service
     * @return {?} last dimensions
     */
    getLastResizeDimensions() {
        return this._lastDimensions;
    }
    /**
     * Resize the datagrid to fit the browser height & width
     * @param {?=} delay
     * @param {?=} newSizes
     * @return {?}
     */
    resizeGrid(delay = 10, newSizes) {
        if (!this._grid || !this._gridOptions) {
            throw new Error(`
      Angular-Slickgrid resizer requires a valid Grid object and Grid Options defined.
      You can fix this by setting your gridOption to use "enableAutoResize" or create an instance of the ResizerService by calling bindAutoResizeDataGrid()`);
        }
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            // because of the javascript async nature, we might want to delay the resize a little bit
            delay = delay || 0;
            if (delay > 0) {
                clearTimeout(this._timer);
                this._timer = setTimeout((/**
                 * @return {?}
                 */
                () => resolve(this.resizeGridCallback(newSizes))), delay);
            }
            else {
                resolve(this.resizeGridCallback(newSizes));
            }
        }));
    }
    /**
     * @param {?} newSizes
     * @return {?}
     */
    resizeGridCallback(newSizes) {
        /** @type {?} */
        const lastDimensions = this.resizeGridWithDimensions(newSizes);
        this.onGridAfterResize.next(lastDimensions);
        return lastDimensions;
    }
    /**
     * @param {?=} newSizes
     * @return {?}
     */
    resizeGridWithDimensions(newSizes) {
        // calculate the available sizes with minimum height defined as a constant
        /** @type {?} */
        const availableDimensions = this.calculateGridNewDimensions(this._gridOptions);
        /** @type {?} */
        const gridElm = $(`#${this._gridOptions.gridId}`) || {};
        /** @type {?} */
        const gridContainerElm = $(`#${this._gridOptions.gridContainerId}`) || {};
        if ((newSizes || availableDimensions) && gridElm.length > 0) {
            // get the new sizes, if new sizes are passed (not 0), we will use them else use available space
            // basically if user passes 1 of the dimension, let say he passes just the height,
            // we will use the height as a fixed height but the width will be resized by it's available space
            /** @type {?} */
            const newHeight = (newSizes && newSizes.height) ? newSizes.height : availableDimensions.height;
            /** @type {?} */
            const newWidth = (newSizes && newSizes.width) ? newSizes.width : availableDimensions.width;
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
                if (this._gridUid && $(`.${this._gridUid}`).length > 0) {
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
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9yZXNpemVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7TUFNekIsbUJBQW1CLEdBQUcsR0FBRzs7TUFDekIsa0JBQWtCLEdBQUcsR0FBRzs7TUFDeEIsdUJBQXVCLEdBQUcsRUFBRTs7TUFDNUIsMEJBQTBCLEdBQUcsRUFBRTs7OztBQUVyQyxtQ0FJQzs7O0lBSEMsK0JBQWU7O0lBQ2YsOEJBQWM7O0lBQ2QsNkNBQThCOztBQUdoQyxNQUFNLE9BQU8sY0FBYztJQUEzQjtRQU1FLHNCQUFpQixHQUFHLElBQUksT0FBTyxFQUFpQixDQUFDO1FBQ2pELHVCQUFrQixHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7SUEyTjlDLENBQUM7Ozs7OztJQXhOQyxJQUFZLFlBQVk7UUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzlFLENBQUM7Ozs7O0lBRUQsSUFBWSxRQUFRO1FBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7SUFDakgsQ0FB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QyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDL0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsR0FBRyxTQUFTLEdBQUcsMEJBQTBCLENBQUM7YUFDcEY7U0FDRjtRQUVELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0NBQ0Y7Ozs7OztJQWpPQyxzQ0FBb0M7Ozs7O0lBQ3BDLHFDQUFtQzs7Ozs7SUFDbkMsK0JBQW1COzs7OztJQUNuQix5Q0FBdUM7Ozs7O0lBQ3ZDLGdDQUFvQjs7SUFDcEIsMkNBQWlEOztJQUNqRCw0Q0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHcmlkT3B0aW9uIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBnZXRTY3JvbGxCYXJXaWR0aCB9IGZyb20gJy4vdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG4vLyBnbG9iYWwgY29uc3RhbnRzLCBoZWlnaHQvd2lkdGggYXJlIGluIHBpeGVsc1xyXG5jb25zdCBEQVRBR1JJRF9NSU5fSEVJR0hUID0gMTgwO1xyXG5jb25zdCBEQVRBR1JJRF9NSU5fV0lEVEggPSAzMDA7XHJcbmNvbnN0IERBVEFHUklEX0JPVFRPTV9QQURESU5HID0gMjA7XHJcbmNvbnN0IERBVEFHUklEX1BBR0lOQVRJT05fSEVJR0hUID0gMzU7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdyaWREaW1lbnNpb24ge1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgaGVpZ2h0V2l0aFBhZ2luYXRpb24/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXNpemVyU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfZml4ZWRIZWlnaHQ6IG51bWJlciB8IG51bGw7XHJcbiAgcHJpdmF0ZSBfZml4ZWRXaWR0aDogbnVtYmVyIHwgbnVsbDtcclxuICBwcml2YXRlIF9ncmlkOiBhbnk7XHJcbiAgcHJpdmF0ZSBfbGFzdERpbWVuc2lvbnM6IEdyaWREaW1lbnNpb247XHJcbiAgcHJpdmF0ZSBfdGltZXI6IGFueTtcclxuICBvbkdyaWRBZnRlclJlc2l6ZSA9IG5ldyBTdWJqZWN0PEdyaWREaW1lbnNpb24+KCk7XHJcbiAgb25HcmlkQmVmb3JlUmVzaXplID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBwcml2YXRlIGdldCBfZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldCBfZ3JpZFVpZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0VUlEKSA/IHRoaXMuX2dyaWQuZ2V0VUlEKCkgOiB0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5ncmlkSWQ7XHJcbiAgfVxyXG5cclxuICBpbml0KGdyaWQ6IGFueSwgZml4ZWREaW1lbnNpb25zPzogR3JpZERpbWVuc2lvbik6IHZvaWQge1xyXG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XHJcbiAgICBpZiAoZml4ZWREaW1lbnNpb25zKSB7XHJcbiAgICAgIHRoaXMuX2ZpeGVkSGVpZ2h0ID0gZml4ZWREaW1lbnNpb25zLmhlaWdodDtcclxuICAgICAgdGhpcy5fZml4ZWRXaWR0aCA9IGZpeGVkRGltZW5zaW9ucy53aWR0aDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBBdHRhY2ggYW4gYXV0byByZXNpemUgdHJpZ2dlciBvbiB0aGUgZGF0YWdyaWQsIGlmIHRoYXQgaXMgZW5hYmxlIHRoZW4gaXQgd2lsbCByZXNpemUgaXRzZWxmIHRvIHRoZSBhdmFpbGFibGUgc3BhY2VcclxuICAgKiBPcHRpb25zOiB3ZSBjb3VsZCBhbHNvIHByb3ZpZGUgYSAlIGZhY3RvciB0byByZXNpemUgb24gZWFjaCBoZWlnaHQvd2lkdGggaW5kZXBlbmRlbnRseVxyXG4gICAqL1xyXG4gIGJpbmRBdXRvUmVzaXplRGF0YUdyaWQobmV3U2l6ZXM/OiBHcmlkRGltZW5zaW9uKSB7XHJcbiAgICAvLyBpZiB3ZSBjYW4ndCBmaW5kIHRoZSBncmlkIHRvIHJlc2l6ZSwgcmV0dXJuIHdpdGhvdXQgYXR0YWNoaW5nIGFueXRoaW5nXHJcbiAgICBjb25zdCBncmlkRG9tRWxtID0gJChgIyR7dGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuZ3JpZElkID8gdGhpcy5fZ3JpZE9wdGlvbnMuZ3JpZElkIDogJ2dyaWQxJ31gKTtcclxuICAgIGlmIChncmlkRG9tRWxtID09PSB1bmRlZmluZWQgfHwgZ3JpZERvbUVsbS5vZmZzZXQoKSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC0tIDFzdCByZXNpemUgdGhlIGRhdGFncmlkIHNpemUgYXQgZmlyc3QgbG9hZCAod2UgbmVlZCB0aGlzIGJlY2F1c2UgdGhlIC5vbiBldmVudCBpcyBub3QgdHJpZ2dlcmVkIG9uIGZpcnN0IGxvYWQpXHJcbiAgICAvLyAtLSBhbHNvIHdlIGFkZCBhIHNsaWdodCBkZWxheSAoaW4gbXMpIHNvIHRoYXQgd2UgcmVzaXplIGFmdGVyIHRoZSBncmlkIHJlbmRlciBpcyBkb25lXHJcbiAgICB0aGlzLnJlc2l6ZUdyaWQoMTAsIG5ld1NpemVzKTtcclxuXHJcbiAgICAvLyAtLSAybmQgYXR0YWNoIGEgdHJpZ2dlciBvbiB0aGUgV2luZG93IERPTSBlbGVtZW50LCBzbyB0aGF0IGl0IGhhcHBlbnMgYWxzbyB3aGVuIHJlc2l6aW5nIGFmdGVyIGZpcnN0IGxvYWRcclxuICAgIC8vIC0tIGF0dGFjaCBhdXRvLXJlc2l6ZSB0byBXaW5kb3cgb2JqZWN0IG9ubHkgaWYgaXQgZXhpc3RcclxuICAgICQod2luZG93KS5vbihgcmVzaXplLmdyaWQuJHt0aGlzLl9ncmlkVWlkfWAsICgpID0+IHtcclxuICAgICAgdGhpcy5vbkdyaWRCZWZvcmVSZXNpemUubmV4dCh0cnVlKTtcclxuICAgICAgdGhpcy5yZXNpemVHcmlkKDAsIG5ld1NpemVzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlIHRoZSBkYXRhZ3JpZCBuZXcgaGVpZ2h0L3dpZHRoIGZyb20gdGhlIGF2YWlsYWJsZSBzcGFjZSwgYWxzbyBjb25zaWRlciB0aGF0IGEgJSBmYWN0b3IgbWlnaHQgYmUgYXBwbGllZCB0byBjYWxjdWxhdGlvblxyXG4gICAqIG9iamVjdCBncmlkT3B0aW9uc1xyXG4gICAqL1xyXG4gIGNhbGN1bGF0ZUdyaWROZXdEaW1lbnNpb25zKGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uKTogR3JpZERpbWVuc2lvbiB8IG51bGwge1xyXG4gICAgY29uc3QgZ3JpZERvbUVsbSA9ICQoYCMke2dyaWRPcHRpb25zLmdyaWRJZH1gKTtcclxuICAgIGNvbnN0IGF1dG9SZXNpemVPcHRpb25zID0gZ3JpZE9wdGlvbnMgJiYgZ3JpZE9wdGlvbnMuYXV0b1Jlc2l6ZSB8fCB7fTtcclxuICAgIGNvbnN0IGNvbnRhaW5lckVsbSA9IChhdXRvUmVzaXplT3B0aW9ucyAmJiBhdXRvUmVzaXplT3B0aW9ucy5jb250YWluZXJJZCkgPyAkKGAjJHthdXRvUmVzaXplT3B0aW9ucy5jb250YWluZXJJZH1gKSA6ICQoYCMke2dyaWRPcHRpb25zLmdyaWRDb250YWluZXJJZH1gKTtcclxuICAgIGlmICghd2luZG93IHx8IGNvbnRhaW5lckVsbSA9PT0gdW5kZWZpbmVkIHx8IGdyaWREb21FbG0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjYWxjdWxhdGUgYm90dG9tIHBhZGRpbmdcclxuICAgIC8vIGlmIHVzaW5nIHBhZ2luYXRpb24sIHdlIG5lZWQgdG8gYWRkIHRoZSBwYWdpbmF0aW9uIGhlaWdodCB0byB0aGlzIGJvdHRvbSBwYWRkaW5nXHJcbiAgICBsZXQgYm90dG9tUGFkZGluZyA9IChhdXRvUmVzaXplT3B0aW9ucyAmJiBhdXRvUmVzaXplT3B0aW9ucy5ib3R0b21QYWRkaW5nKSA/IGF1dG9SZXNpemVPcHRpb25zLmJvdHRvbVBhZGRpbmcgOiBEQVRBR1JJRF9CT1RUT01fUEFERElORztcclxuICAgIGlmIChib3R0b21QYWRkaW5nICYmIChncmlkT3B0aW9ucy5lbmFibGVQYWdpbmF0aW9uIHx8IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSkge1xyXG4gICAgICBib3R0b21QYWRkaW5nICs9IERBVEFHUklEX1BBR0lOQVRJT05fSEVJR0hUO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBncmlkSGVpZ2h0ID0gMDtcclxuICAgIGxldCBncmlkT2Zmc2V0VG9wID0gMDtcclxuXHJcbiAgICAvLyB3aGljaCBET00gZWxlbWVudCBhcmUgd2UgdXNpbmcgdG8gY2FsY3VsYXRlIHRoZSBhdmFpbGFibGUgc2l6ZSBmb3IgdGhlIGdyaWQ/XHJcbiAgICBpZiAoYXV0b1Jlc2l6ZU9wdGlvbnMuY2FsY3VsYXRlQXZhaWxhYmxlU2l6ZUJ5ID09PSAnY29udGFpbmVyJykge1xyXG4gICAgICAvLyB1c2VzIHRoZSBjb250YWluZXIncyBoZWlnaHQgdG8gY2FsY3VsYXRlIGdyaWQgaGVpZ2h0IHdpdGhvdXQgYW55IHRvcCBvZmZzZXRcclxuICAgICAgZ3JpZEhlaWdodCA9IGNvbnRhaW5lckVsbS5oZWlnaHQoKSB8fCAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gdXNlcyB0aGUgYnJvd3NlcidzIHdpbmRvdyBoZWlnaHQgd2l0aCBpdHMgdG9wIG9mZnNldCB0byBjYWxjdWxhdGUgZ3JpZCBoZWlnaHRcclxuICAgICAgZ3JpZEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCAwO1xyXG4gICAgICBjb25zdCBjb29yZE9mZnNldFRvcCA9IGdyaWREb21FbG0ub2Zmc2V0KCk7XHJcbiAgICAgIGdyaWRPZmZzZXRUb3AgPSAoY29vcmRPZmZzZXRUb3AgIT09IHVuZGVmaW5lZCkgPyBjb29yZE9mZnNldFRvcC50b3AgOiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGF2YWlsYWJsZUhlaWdodCA9IGdyaWRIZWlnaHQgLSBncmlkT2Zmc2V0VG9wIC0gYm90dG9tUGFkZGluZztcclxuICAgIGNvbnN0IGF2YWlsYWJsZVdpZHRoID0gY29udGFpbmVyRWxtLndpZHRoKCkgfHwgMDtcclxuICAgIGNvbnN0IG1heEhlaWdodCA9IGF1dG9SZXNpemVPcHRpb25zICYmIGF1dG9SZXNpemVPcHRpb25zLm1heEhlaWdodCB8fCB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBtaW5IZWlnaHQgPSBhdXRvUmVzaXplT3B0aW9ucyAmJiBhdXRvUmVzaXplT3B0aW9ucy5taW5IZWlnaHQgfHwgREFUQUdSSURfTUlOX0hFSUdIVDtcclxuICAgIGNvbnN0IG1heFdpZHRoID0gYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMubWF4V2lkdGggfHwgdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgbWluV2lkdGggPSBhdXRvUmVzaXplT3B0aW9ucyAmJiBhdXRvUmVzaXplT3B0aW9ucy5taW5XaWR0aCB8fCBEQVRBR1JJRF9NSU5fV0lEVEg7XHJcblxyXG4gICAgbGV0IG5ld0hlaWdodCA9IGF2YWlsYWJsZUhlaWdodDtcclxuICAgIGxldCBuZXdXaWR0aCA9IChhdXRvUmVzaXplT3B0aW9ucyAmJiBhdXRvUmVzaXplT3B0aW9ucy5zaWRlUGFkZGluZykgPyBhdmFpbGFibGVXaWR0aCAtIGF1dG9SZXNpemVPcHRpb25zLnNpZGVQYWRkaW5nIDogYXZhaWxhYmxlV2lkdGg7XHJcblxyXG4gICAgLy8gb3B0aW9uYWxseSAod2hlbiBkZWZpbmVkKSwgbWFrZSBzdXJlIHRoYXQgZ3JpZCBoZWlnaHQgJiB3aWR0aCBhcmUgd2l0aGluIHRoZWlyIHRocmVzaG9sZHNcclxuICAgIGlmIChuZXdIZWlnaHQgPCBtaW5IZWlnaHQpIHtcclxuICAgICAgbmV3SGVpZ2h0ID0gbWluSGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgaWYgKG1heEhlaWdodCAmJiBuZXdIZWlnaHQgPiBtYXhIZWlnaHQpIHtcclxuICAgICAgbmV3SGVpZ2h0ID0gbWF4SGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgaWYgKG5ld1dpZHRoIDwgbWluV2lkdGgpIHtcclxuICAgICAgbmV3V2lkdGggPSBtaW5XaWR0aDtcclxuICAgIH1cclxuICAgIGlmIChtYXhXaWR0aCAmJiBuZXdXaWR0aCA+IG1heFdpZHRoKSB7XHJcbiAgICAgIG5ld1dpZHRoID0gbWF4V2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmV0dXJuIHRoZSBuZXcgZGltZW5zaW9ucyB1bmxlc3MgYSBmaXhlZCBoZWlnaHQvd2lkdGggd2FzIGRlZmluZWRcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGhlaWdodDogdGhpcy5fZml4ZWRIZWlnaHQgfHwgbmV3SGVpZ2h0LFxyXG4gICAgICB3aWR0aDogdGhpcy5fZml4ZWRXaWR0aCB8fCBuZXdXaWR0aFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc3Bvc2UgZnVuY3Rpb24gd2hlbiBlbGVtZW50IGlzIGRlc3Ryb3llZFxyXG4gICAqL1xyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICAkKHdpbmRvdykub2ZmKGByZXNpemUuZ3JpZC4ke3RoaXMuX2dyaWRVaWR9YCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGb3Igc29tZSByZWFzb24gdGhpcyBvbmx5IHNlZW1zIHRvIGhhcHBlbiBpbiBDaHJvbWUgYW5kIGlzIHNvbWV0aW1lIG1pc2NhbGN1bGF0ZWQgYnkgU2xpY2tHcmlkIG1lYXN1cmVTcm9sbGJhcigpIG1ldGhvZFxyXG4gICAqIFdoZW4gdGhhdCBoYXBwZW5zIHdlIHdpbGwgY29tcGVuc2F0ZSBhbmQgcmVzaXplIHRoZSBHcmlkIFZpZXdwb3J0IHRvIGF2b2lkIHNlZWluZyBob3Jpem9udGFsIHNjcm9sbGJhclxyXG4gICAqIE1vc3Qgb2YgdGhlIHRpbWUgaXQgaGFwcGVucywgaXQncyBhIHRpbnkgb2Zmc2V0IGNhbGN1bGF0aW9uIG9mIHVzdWFsbHkgM3B4IChlbm91Z2ggdG8gc2hvdyBzY3JvbGxiYXIpXHJcbiAgICogR2l0SHViIGlzc3VlIHJlZmVyZW5jZTogaHR0cHM6Ly9naXRodWIuY29tLzZwYWMvU2xpY2tHcmlkL2lzc3Vlcy8yNzVcclxuICAgKi9cclxuICBjb21wZW5zYXRlSG9yaXpvbnRhbFNjcm9sbChncmlkOiBhbnksIGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uKSB7XHJcbiAgICBjb25zdCBncmlkRWxtID0gJChgIyR7Z3JpZE9wdGlvbnMuZ3JpZElkfWApO1xyXG5cclxuICAgIGNvbnN0IHNjcm9sbGJhckRpbWVuc2lvbnMgPSBncmlkICYmIGdyaWQuZ2V0U2Nyb2xsYmFyRGltZW5zaW9ucygpO1xyXG4gICAgY29uc3Qgc2xpY2tHcmlkU2Nyb2xsYmFyV2lkdGggPSBzY3JvbGxiYXJEaW1lbnNpb25zICYmIHNjcm9sbGJhckRpbWVuc2lvbnMud2lkdGg7XHJcbiAgICBjb25zdCBjYWxjdWxhdGVkU2Nyb2xsYmFyV2lkdGggPSBnZXRTY3JvbGxCYXJXaWR0aCgpO1xyXG5cclxuICAgIC8vIGlmIHNjcm9sbGJhciB3aWR0aCBpcyBkaWZmZXJlbnQgZnJvbSBTbGlja0dyaWQgY2FsY3VsYXRpb24gdG8gb3VyIGN1c3RvbSBjYWxjdWxhdGlvblxyXG4gICAgLy8gdGhlbiByZXNpemUgdGhlIGdyaWQgd2l0aCB0aGUgbWlzc2luZyBwaXhlbHMgdG8gcmVtb3ZlIHNjcm9sbCAodXN1YWxseSBvbmx5IDNweClcclxuICAgIGlmIChzbGlja0dyaWRTY3JvbGxiYXJXaWR0aCA8IGNhbGN1bGF0ZWRTY3JvbGxiYXJXaWR0aCkge1xyXG4gICAgICBncmlkRWxtLndpZHRoKGdyaWRFbG0ud2lkdGgoKSArIChjYWxjdWxhdGVkU2Nyb2xsYmFyV2lkdGggLSBzbGlja0dyaWRTY3JvbGxiYXJXaWR0aCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRoZSBsYXN0IHJlc2l6ZSBkaW1lbnNpb25zIHVzZWQgYnkgdGhlIHNlcnZpY2VcclxuICAgKiBAcmV0dXJuIGxhc3QgZGltZW5zaW9uc1xyXG4gICAqL1xyXG4gIGdldExhc3RSZXNpemVEaW1lbnNpb25zKCk6IEdyaWREaW1lbnNpb24ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xhc3REaW1lbnNpb25zO1xyXG4gIH1cclxuXHJcbiAgLyoqIFJlc2l6ZSB0aGUgZGF0YWdyaWQgdG8gZml0IHRoZSBicm93c2VyIGhlaWdodCAmIHdpZHRoICovXHJcbiAgcmVzaXplR3JpZChkZWxheSA9IDEwLCBuZXdTaXplcz86IEdyaWREaW1lbnNpb24pOiBQcm9taXNlPEdyaWREaW1lbnNpb24+IHtcclxuICAgIGlmICghdGhpcy5fZ3JpZCB8fCAhdGhpcy5fZ3JpZE9wdGlvbnMpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBcclxuICAgICAgQW5ndWxhci1TbGlja2dyaWQgcmVzaXplciByZXF1aXJlcyBhIHZhbGlkIEdyaWQgb2JqZWN0IGFuZCBHcmlkIE9wdGlvbnMgZGVmaW5lZC5cclxuICAgICAgWW91IGNhbiBmaXggdGhpcyBieSBzZXR0aW5nIHlvdXIgZ3JpZE9wdGlvbiB0byB1c2UgXCJlbmFibGVBdXRvUmVzaXplXCIgb3IgY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBSZXNpemVyU2VydmljZSBieSBjYWxsaW5nIGJpbmRBdXRvUmVzaXplRGF0YUdyaWQoKWApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAvLyBiZWNhdXNlIG9mIHRoZSBqYXZhc2NyaXB0IGFzeW5jIG5hdHVyZSwgd2UgbWlnaHQgd2FudCB0byBkZWxheSB0aGUgcmVzaXplIGEgbGl0dGxlIGJpdFxyXG4gICAgICBkZWxheSA9IGRlbGF5IHx8IDA7XHJcblxyXG4gICAgICBpZiAoZGVsYXkgPiAwKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcclxuICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZSh0aGlzLnJlc2l6ZUdyaWRDYWxsYmFjayhuZXdTaXplcykpLCBkZWxheSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzb2x2ZSh0aGlzLnJlc2l6ZUdyaWRDYWxsYmFjayhuZXdTaXplcykpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlc2l6ZUdyaWRDYWxsYmFjayhuZXdTaXplczogR3JpZERpbWVuc2lvbikge1xyXG4gICAgY29uc3QgbGFzdERpbWVuc2lvbnMgPSB0aGlzLnJlc2l6ZUdyaWRXaXRoRGltZW5zaW9ucyhuZXdTaXplcyk7XHJcbiAgICB0aGlzLm9uR3JpZEFmdGVyUmVzaXplLm5leHQobGFzdERpbWVuc2lvbnMpO1xyXG4gICAgcmV0dXJuIGxhc3REaW1lbnNpb25zO1xyXG4gIH1cclxuXHJcbiAgcmVzaXplR3JpZFdpdGhEaW1lbnNpb25zKG5ld1NpemVzPzogR3JpZERpbWVuc2lvbik6IEdyaWREaW1lbnNpb24ge1xyXG4gICAgLy8gY2FsY3VsYXRlIHRoZSBhdmFpbGFibGUgc2l6ZXMgd2l0aCBtaW5pbXVtIGhlaWdodCBkZWZpbmVkIGFzIGEgY29uc3RhbnRcclxuICAgIGNvbnN0IGF2YWlsYWJsZURpbWVuc2lvbnMgPSB0aGlzLmNhbGN1bGF0ZUdyaWROZXdEaW1lbnNpb25zKHRoaXMuX2dyaWRPcHRpb25zKTtcclxuICAgIGNvbnN0IGdyaWRFbG0gPSAkKGAjJHt0aGlzLl9ncmlkT3B0aW9ucy5ncmlkSWR9YCkgfHwge307XHJcbiAgICBjb25zdCBncmlkQ29udGFpbmVyRWxtID0gJChgIyR7dGhpcy5fZ3JpZE9wdGlvbnMuZ3JpZENvbnRhaW5lcklkfWApIHx8IHt9O1xyXG5cclxuICAgIGlmICgobmV3U2l6ZXMgfHwgYXZhaWxhYmxlRGltZW5zaW9ucykgJiYgZ3JpZEVsbS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIC8vIGdldCB0aGUgbmV3IHNpemVzLCBpZiBuZXcgc2l6ZXMgYXJlIHBhc3NlZCAobm90IDApLCB3ZSB3aWxsIHVzZSB0aGVtIGVsc2UgdXNlIGF2YWlsYWJsZSBzcGFjZVxyXG4gICAgICAvLyBiYXNpY2FsbHkgaWYgdXNlciBwYXNzZXMgMSBvZiB0aGUgZGltZW5zaW9uLCBsZXQgc2F5IGhlIHBhc3NlcyBqdXN0IHRoZSBoZWlnaHQsXHJcbiAgICAgIC8vIHdlIHdpbGwgdXNlIHRoZSBoZWlnaHQgYXMgYSBmaXhlZCBoZWlnaHQgYnV0IHRoZSB3aWR0aCB3aWxsIGJlIHJlc2l6ZWQgYnkgaXQncyBhdmFpbGFibGUgc3BhY2VcclxuICAgICAgY29uc3QgbmV3SGVpZ2h0ID0gKG5ld1NpemVzICYmIG5ld1NpemVzLmhlaWdodCkgPyBuZXdTaXplcy5oZWlnaHQgOiBhdmFpbGFibGVEaW1lbnNpb25zLmhlaWdodDtcclxuICAgICAgY29uc3QgbmV3V2lkdGggPSAobmV3U2l6ZXMgJiYgbmV3U2l6ZXMud2lkdGgpID8gbmV3U2l6ZXMud2lkdGggOiBhdmFpbGFibGVEaW1lbnNpb25zLndpZHRoO1xyXG5cclxuICAgICAgLy8gYXBwbHkgdGhlc2UgbmV3IGhlaWdodC93aWR0aCB0byB0aGUgZGF0YWdyaWRcclxuICAgICAgaWYgKCF0aGlzLl9ncmlkT3B0aW9ucy5hdXRvSGVpZ2h0KSB7XHJcbiAgICAgICAgZ3JpZEVsbS5oZWlnaHQobmV3SGVpZ2h0KTtcclxuICAgICAgICBncmlkQ29udGFpbmVyRWxtLmhlaWdodChuZXdIZWlnaHQpO1xyXG4gICAgICB9XHJcbiAgICAgIGdyaWRFbG0ud2lkdGgobmV3V2lkdGgpO1xyXG4gICAgICBncmlkQ29udGFpbmVyRWxtLndpZHRoKG5ld1dpZHRoKTtcclxuXHJcbiAgICAgIC8vIHJlc2l6ZSB0aGUgc2xpY2tncmlkIGNhbnZhcyBvbiBhbGwgYnJvd3NlciBleGNlcHQgc29tZSBJRSB2ZXJzaW9uc1xyXG4gICAgICAvLyBleGNsdWRlIGFsbCBJRSBiZWxvdyBJRTExXHJcbiAgICAgIC8vIElFMTEgd2FudHMgdG8gYmUgYSBiZXR0ZXIgc3RhbmRhcmQgKFczQykgZm9sbG93ZXIgKGZpbmFsbHkpIHRoZXkgZXZlbiBjaGFuZ2VkIHRoZWlyIGFwcE5hbWUgb3V0cHV0IHRvIGFsc28gaGF2ZSAnTmV0c2NhcGUnXHJcbiAgICAgIGlmIChuZXcgUmVnRXhwKCdNU0lFIFs2LThdJykuZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50KSA9PT0gbnVsbCAmJiB0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQucmVzaXplQ2FudmFzKSB7XHJcbiAgICAgICAgdGhpcy5fZ3JpZC5yZXNpemVDYW52YXMoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYWxzbyBjYWxsIHRoZSBncmlkIGF1dG8tc2l6ZSBjb2x1bW5zIHNvIHRoYXQgaXQgdGFrZXMgYXZhaWxhYmxlIHdoZW4gZ29pbmcgYmlnZ2VyXHJcbiAgICAgIGlmICh0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5lbmFibGVBdXRvU2l6ZUNvbHVtbnMgJiYgdGhpcy5fZ3JpZC5hdXRvc2l6ZUNvbHVtbnMpIHtcclxuICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgZ3JpZCBzdGlsbCBleGlzdCAoYnkgbG9va2luZyBpZiB0aGUgR3JpZCBVSUQgaXMgZm91bmQgaW4gdGhlIERPTSB0cmVlKSB0byBhdm9pZCBTbGlja0dyaWQgZXJyb3IgXCJtaXNzaW5nIHN0eWxlc2hlZXRcIlxyXG4gICAgICAgIGlmICh0aGlzLl9ncmlkVWlkICYmICQoYC4ke3RoaXMuX2dyaWRVaWR9YCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgdGhpcy5fZ3JpZC5hdXRvc2l6ZUNvbHVtbnMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNvbXBlbnNhdGUgYW55dGltZSBTbGlja0dyaWQgbWVhc3VyZVNjcm9sbGJhciBpcyBpbmNvcnJlY3RcclxuICAgICAgICB0aGlzLmNvbXBlbnNhdGVIb3Jpem9udGFsU2Nyb2xsKHRoaXMuX2dyaWQsIHRoaXMuX2dyaWRPcHRpb25zKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8ga2VlcCBsYXN0IHJlc2l6ZWQgZGltZW5zaW9ucyAmIHJlc29sdmUgdGhlbSB0byB0aGUgUHJvbWlzZVxyXG4gICAgICB0aGlzLl9sYXN0RGltZW5zaW9ucyA9IHtcclxuICAgICAgICBoZWlnaHQ6IG5ld0hlaWdodCxcclxuICAgICAgICB3aWR0aDogbmV3V2lkdGhcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICgodGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlUGFnaW5hdGlvbiB8fCB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkpIHtcclxuICAgICAgICB0aGlzLl9sYXN0RGltZW5zaW9ucy5oZWlnaHRXaXRoUGFnaW5hdGlvbiA9IG5ld0hlaWdodCArIERBVEFHUklEX1BBR0lOQVRJT05fSEVJR0hUO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX2xhc3REaW1lbnNpb25zO1xyXG4gIH1cclxufVxyXG4iXX0=