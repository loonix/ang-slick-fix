/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
var AngularUtilService = /** @class */ (function () {
    function AngularUtilService(compFactoryResolver, appRef, injector) {
        this.compFactoryResolver = compFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    // ref https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
    // ref https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
    /**
     * @param {?} component
     * @return {?}
     */
    AngularUtilService.prototype.createAngularComponent = 
    // ref https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
    /**
     * @param {?} component
     * @return {?}
     */
    function (component) {
        // Create a component reference from the component
        /** @type {?} */
        var componentRef = this.compFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);
        // Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(componentRef.hostView);
        // Get DOM element from component
        /** @type {?} */
        var domElem;
        /** @type {?} */
        var viewRef = ((/** @type {?} */ (componentRef.hostView)));
        if (viewRef && Array.isArray(viewRef.rootNodes) && viewRef.rootNodes[0]) {
            domElem = (/** @type {?} */ (viewRef.rootNodes[0]));
        }
        return { componentRef: componentRef, domElement: domElem };
    };
    // ref https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
    // ref https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
    /**
     * @param {?} component
     * @param {?=} targetElement
     * @param {?=} clearTargetContent
     * @return {?}
     */
    AngularUtilService.prototype.createAngularComponentAppendToDom = 
    // ref https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
    /**
     * @param {?} component
     * @param {?=} targetElement
     * @param {?=} clearTargetContent
     * @return {?}
     */
    function (component, targetElement, clearTargetContent) {
        if (clearTargetContent === void 0) { clearTargetContent = false; }
        /** @type {?} */
        var componentOutput = this.createAngularComponent(component);
        // Append DOM element to the HTML element specified
        if (targetElement && targetElement.appendChild) {
            if (clearTargetContent && targetElement.innerHTML) {
                targetElement.innerHTML = '';
            }
            targetElement.appendChild(componentOutput.domElement);
        }
        else {
            document.body.appendChild(componentOutput.domElement); // when no target provided, we'll simply add it to the HTML Body
        }
        return componentOutput;
    };
    AngularUtilService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AngularUtilService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ApplicationRef },
        { type: Injector }
    ]; };
    return AngularUtilService;
}());
export { AngularUtilService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AngularUtilService.prototype.compFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    AngularUtilService.prototype.appRef;
    /**
     * @type {?}
     * @private
     */
    AngularUtilService.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhclV0aWxTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9hbmd1bGFyVXRpbFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxjQUFjLEVBQUUsd0JBQXdCLEVBQWlDLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUg7SUFFRSw0QkFDVSxtQkFBNkMsRUFDN0MsTUFBc0IsRUFDdEIsUUFBa0I7UUFGbEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUEwQjtRQUM3QyxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQ3hCLENBQUM7SUFFTCx1R0FBdUc7Ozs7OztJQUN2RyxtREFBc0I7Ozs7OztJQUF0QixVQUF1QixTQUFjOzs7WUFFN0IsWUFBWSxHQUFHLElBQUksQ0FBQyxtQkFBbUI7YUFDMUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDO2FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRXhCLDJFQUEyRTtRQUMzRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7OztZQUcxQyxPQUFPOztZQUNMLE9BQU8sR0FBRyxDQUFDLG1CQUFBLFlBQVksQ0FBQyxRQUFRLEVBQXdCLENBQUM7UUFDL0QsSUFBSSxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN2RSxPQUFPLEdBQUcsbUJBQUEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBZSxDQUFDO1NBQy9DO1FBRUQsT0FBTyxFQUFFLFlBQVksY0FBQSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQsdUdBQXVHOzs7Ozs7OztJQUN2Ryw4REFBaUM7Ozs7Ozs7O0lBQWpDLFVBQWtDLFNBQWMsRUFBRSxhQUFxQyxFQUFFLGtCQUEwQjtRQUExQixtQ0FBQSxFQUFBLDBCQUEwQjs7WUFDM0csZUFBZSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUM7UUFFOUQsbURBQW1EO1FBQ25ELElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxXQUFXLEVBQUU7WUFDOUMsSUFBSSxrQkFBa0IsSUFBSSxhQUFhLENBQUMsU0FBUyxFQUFFO2dCQUNqRCxhQUFhLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQzthQUM5QjtZQUNELGFBQWEsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3ZEO2FBQU07WUFDTCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxnRUFBZ0U7U0FDeEg7UUFFRCxPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDOztnQkEzQ0YsVUFBVTs7OztnQkFGYyx3QkFBd0I7Z0JBQXhDLGNBQWM7Z0JBQXVFLFFBQVE7O0lBOEN0Ryx5QkFBQztDQUFBLEFBNUNELElBNENDO1NBM0NZLGtCQUFrQjs7Ozs7O0lBRTNCLGlEQUFxRDs7Ozs7SUFDckQsb0NBQThCOzs7OztJQUM5QixzQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmd1bGFyQ29tcG9uZW50T3V0cHV0IH0gZnJvbSAnLi8uLi9tb2RlbHMvYW5ndWxhckNvbXBvbmVudE91dHB1dC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvblJlZiwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIEVtYmVkZGVkVmlld1JlZiwgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJVdGlsU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNvbXBGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcclxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxyXG4gICkgeyB9XHJcblxyXG4gIC8vIHJlZiBodHRwczovL2hhY2tlcm5vb24uY29tL2FuZ3VsYXItcHJvLXRpcC1ob3ctdG8tZHluYW1pY2FsbHktY3JlYXRlLWNvbXBvbmVudHMtaW4tYm9keS1iYTIwMGNjMjg5ZTZcclxuICBjcmVhdGVBbmd1bGFyQ29tcG9uZW50KGNvbXBvbmVudDogYW55KTogQW5ndWxhckNvbXBvbmVudE91dHB1dCB7XHJcbiAgICAvLyBDcmVhdGUgYSBjb21wb25lbnQgcmVmZXJlbmNlIGZyb20gdGhlIGNvbXBvbmVudFxyXG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5jb21wRmFjdG9yeVJlc29sdmVyXHJcbiAgICAgIC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpXHJcbiAgICAgIC5jcmVhdGUodGhpcy5pbmplY3Rvcik7XHJcblxyXG4gICAgLy8gQXR0YWNoIGNvbXBvbmVudCB0byB0aGUgYXBwUmVmIHNvIHRoYXQgaXQncyBpbnNpZGUgdGhlIG5nIGNvbXBvbmVudCB0cmVlXHJcbiAgICB0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XHJcblxyXG4gICAgLy8gR2V0IERPTSBlbGVtZW50IGZyb20gY29tcG9uZW50XHJcbiAgICBsZXQgZG9tRWxlbTtcclxuICAgIGNvbnN0IHZpZXdSZWYgPSAoY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KTtcclxuICAgIGlmICh2aWV3UmVmICYmIEFycmF5LmlzQXJyYXkodmlld1JlZi5yb290Tm9kZXMpICYmIHZpZXdSZWYucm9vdE5vZGVzWzBdKSB7XHJcbiAgICAgIGRvbUVsZW0gPSB2aWV3UmVmLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geyBjb21wb25lbnRSZWYsIGRvbUVsZW1lbnQ6IGRvbUVsZW0gfTtcclxuICB9XHJcblxyXG4gIC8vIHJlZiBodHRwczovL2hhY2tlcm5vb24uY29tL2FuZ3VsYXItcHJvLXRpcC1ob3ctdG8tZHluYW1pY2FsbHktY3JlYXRlLWNvbXBvbmVudHMtaW4tYm9keS1iYTIwMGNjMjg5ZTZcclxuICBjcmVhdGVBbmd1bGFyQ29tcG9uZW50QXBwZW5kVG9Eb20oY29tcG9uZW50OiBhbnksIHRhcmdldEVsZW1lbnQ/OiBIVE1MRWxlbWVudCB8IEVsZW1lbnQsIGNsZWFyVGFyZ2V0Q29udGVudCA9IGZhbHNlKTogQW5ndWxhckNvbXBvbmVudE91dHB1dCB7XHJcbiAgICBjb25zdCBjb21wb25lbnRPdXRwdXQgPSB0aGlzLmNyZWF0ZUFuZ3VsYXJDb21wb25lbnQoY29tcG9uZW50KTtcclxuXHJcbiAgICAvLyBBcHBlbmQgRE9NIGVsZW1lbnQgdG8gdGhlIEhUTUwgZWxlbWVudCBzcGVjaWZpZWRcclxuICAgIGlmICh0YXJnZXRFbGVtZW50ICYmIHRhcmdldEVsZW1lbnQuYXBwZW5kQ2hpbGQpIHtcclxuICAgICAgaWYgKGNsZWFyVGFyZ2V0Q29udGVudCAmJiB0YXJnZXRFbGVtZW50LmlubmVySFRNTCkge1xyXG4gICAgICAgIHRhcmdldEVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgIH1cclxuICAgICAgdGFyZ2V0RWxlbWVudC5hcHBlbmRDaGlsZChjb21wb25lbnRPdXRwdXQuZG9tRWxlbWVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbXBvbmVudE91dHB1dC5kb21FbGVtZW50KTsgLy8gd2hlbiBubyB0YXJnZXQgcHJvdmlkZWQsIHdlJ2xsIHNpbXBseSBhZGQgaXQgdG8gdGhlIEhUTUwgQm9keVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb21wb25lbnRPdXRwdXQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==