/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SlickgridConfig } from '../slickgrid-config';
import { TranslateService } from '@ngx-translate/core';
import { CollectionService } from '../services/collection.service';
var FilterFactory = /** @class */ (function () {
    function FilterFactory(config, translate, collectionService) {
        this.config = config;
        this.translate = translate;
        this.collectionService = collectionService;
        this._options = this.config.options;
    }
    // Uses the User model to create a new User
    // Uses the User model to create a new User
    /**
     * @param {?} columnFilter
     * @return {?}
     */
    FilterFactory.prototype.createFilter = 
    // Uses the User model to create a new User
    /**
     * @param {?} columnFilter
     * @return {?}
     */
    function (columnFilter) {
        /** @type {?} */
        var filter;
        if (columnFilter && columnFilter.model) {
            filter = typeof columnFilter.model === 'function' ? new columnFilter.model(this.translate, this.collectionService) : columnFilter.model;
        }
        // fallback to the default filter
        if (!filter && this._options.defaultFilter) {
            filter = new this._options.defaultFilter(this.translate, this.collectionService);
        }
        return filter;
    };
    FilterFactory.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FilterFactory.ctorParameters = function () { return [
        { type: SlickgridConfig },
        { type: TranslateService },
        { type: CollectionService }
    ]; };
    return FilterFactory;
}());
export { FilterFactory };
if (false) {
    /**
     * The options from the SlickgridConfig
     * @type {?}
     * @private
     */
    FilterFactory.prototype._options;
    /**
     * @type {?}
     * @private
     */
    FilterFactory.prototype.config;
    /**
     * @type {?}
     * @private
     */
    FilterFactory.prototype.translate;
    /**
     * @type {?}
     * @private
     */
    FilterFactory.prototype.collectionService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZmlsdGVycy9maWx0ZXJGYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVuRTtJQU9FLHVCQUFvQixNQUF1QixFQUFVLFNBQTJCLEVBQVUsaUJBQW9DO1FBQTFHLFdBQU0sR0FBTixNQUFNLENBQWlCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQzVILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDdEMsQ0FBQztJQUVELDJDQUEyQzs7Ozs7O0lBQzNDLG9DQUFZOzs7Ozs7SUFBWixVQUFhLFlBQXNDOztZQUM3QyxNQUEwQjtRQUU5QixJQUFJLFlBQVksSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFO1lBQ3RDLE1BQU0sR0FBRyxPQUFPLFlBQVksQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztTQUN6STtRQUVELGlDQUFpQztRQUNqQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFO1lBQzFDLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDbEY7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOztnQkF6QkYsVUFBVTs7OztnQkFKRixlQUFlO2dCQUNmLGdCQUFnQjtnQkFDaEIsaUJBQWlCOztJQTRCMUIsb0JBQUM7Q0FBQSxBQTFCRCxJQTBCQztTQXpCWSxhQUFhOzs7Ozs7O0lBSXhCLGlDQUFzQjs7Ozs7SUFFViwrQkFBK0I7Ozs7O0lBQUUsa0NBQW1DOzs7OztJQUFFLDBDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRmlsdGVyIH0gZnJvbSAnLi4vbW9kZWxzL2ZpbHRlci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBDb2x1bW5GaWx0ZXIgfSBmcm9tICcuLi9tb2RlbHMnO1xyXG5pbXBvcnQgeyBTbGlja2dyaWRDb25maWcgfSBmcm9tICcuLi9zbGlja2dyaWQtY29uZmlnJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBDb2xsZWN0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NvbGxlY3Rpb24uc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGaWx0ZXJGYWN0b3J5IHtcclxuICAvKipcclxuICAgKiBUaGUgb3B0aW9ucyBmcm9tIHRoZSBTbGlja2dyaWRDb25maWdcclxuICAgKi9cclxuICBwcml2YXRlIF9vcHRpb25zOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBTbGlja2dyaWRDb25maWcsIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLCBwcml2YXRlIGNvbGxlY3Rpb25TZXJ2aWNlOiBDb2xsZWN0aW9uU2VydmljZSkge1xyXG4gICAgdGhpcy5fb3B0aW9ucyA9IHRoaXMuY29uZmlnLm9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICAvLyBVc2VzIHRoZSBVc2VyIG1vZGVsIHRvIGNyZWF0ZSBhIG5ldyBVc2VyXHJcbiAgY3JlYXRlRmlsdGVyKGNvbHVtbkZpbHRlcjogQ29sdW1uRmlsdGVyIHwgdW5kZWZpbmVkKTogRmlsdGVyIHwgdW5kZWZpbmVkIHtcclxuICAgIGxldCBmaWx0ZXI6IEZpbHRlciB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBpZiAoY29sdW1uRmlsdGVyICYmIGNvbHVtbkZpbHRlci5tb2RlbCkge1xyXG4gICAgICBmaWx0ZXIgPSB0eXBlb2YgY29sdW1uRmlsdGVyLm1vZGVsID09PSAnZnVuY3Rpb24nID8gbmV3IGNvbHVtbkZpbHRlci5tb2RlbCh0aGlzLnRyYW5zbGF0ZSwgdGhpcy5jb2xsZWN0aW9uU2VydmljZSkgOiBjb2x1bW5GaWx0ZXIubW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmFsbGJhY2sgdG8gdGhlIGRlZmF1bHQgZmlsdGVyXHJcbiAgICBpZiAoIWZpbHRlciAmJiB0aGlzLl9vcHRpb25zLmRlZmF1bHRGaWx0ZXIpIHtcclxuICAgICAgZmlsdGVyID0gbmV3IHRoaXMuX29wdGlvbnMuZGVmYXVsdEZpbHRlcih0aGlzLnRyYW5zbGF0ZSwgdGhpcy5jb2xsZWN0aW9uU2VydmljZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZpbHRlcjtcclxuICB9XHJcbn1cclxuIl19