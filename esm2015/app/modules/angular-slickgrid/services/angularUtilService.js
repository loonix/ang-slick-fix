/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
export class AngularUtilService {
    /**
     * @param {?} compFactoryResolver
     * @param {?} appRef
     * @param {?} injector
     */
    constructor(compFactoryResolver, appRef, injector) {
        this.compFactoryResolver = compFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    // ref https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
    /**
     * @param {?} component
     * @return {?}
     */
    createAngularComponent(component) {
        // Create a component reference from the component
        /** @type {?} */
        const componentRef = this.compFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);
        // Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(componentRef.hostView);
        // Get DOM element from component
        /** @type {?} */
        let domElem;
        /** @type {?} */
        const viewRef = ((/** @type {?} */ (componentRef.hostView)));
        if (viewRef && Array.isArray(viewRef.rootNodes) && viewRef.rootNodes[0]) {
            domElem = (/** @type {?} */ (viewRef.rootNodes[0]));
        }
        return { componentRef, domElement: domElem };
    }
    // ref https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
    /**
     * @param {?} component
     * @param {?=} targetElement
     * @param {?=} clearTargetContent
     * @return {?}
     */
    createAngularComponentAppendToDom(component, targetElement, clearTargetContent = false) {
        /** @type {?} */
        const componentOutput = this.createAngularComponent(component);
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
    }
}
AngularUtilService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AngularUtilService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ApplicationRef },
    { type: Injector }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhclV0aWxTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9hbmd1bGFyVXRpbFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxjQUFjLEVBQUUsd0JBQXdCLEVBQWlDLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHOUgsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7O0lBQzdCLFlBQ1UsbUJBQTZDLEVBQzdDLE1BQXNCLEVBQ3RCLFFBQWtCO1FBRmxCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBMEI7UUFDN0MsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUN4QixDQUFDOzs7Ozs7SUFHTCxzQkFBc0IsQ0FBQyxTQUFjOzs7Y0FFN0IsWUFBWSxHQUFHLElBQUksQ0FBQyxtQkFBbUI7YUFDMUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDO2FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRXhCLDJFQUEyRTtRQUMzRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7OztZQUcxQyxPQUFPOztjQUNMLE9BQU8sR0FBRyxDQUFDLG1CQUFBLFlBQVksQ0FBQyxRQUFRLEVBQXdCLENBQUM7UUFDL0QsSUFBSSxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN2RSxPQUFPLEdBQUcsbUJBQUEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBZSxDQUFDO1NBQy9DO1FBRUQsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLENBQUM7SUFDL0MsQ0FBQzs7Ozs7Ozs7SUFHRCxpQ0FBaUMsQ0FBQyxTQUFjLEVBQUUsYUFBcUMsRUFBRSxrQkFBa0IsR0FBRyxLQUFLOztjQUMzRyxlQUFlLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQztRQUU5RCxtREFBbUQ7UUFDbkQsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLFdBQVcsRUFBRTtZQUM5QyxJQUFJLGtCQUFrQixJQUFJLGFBQWEsQ0FBQyxTQUFTLEVBQUU7Z0JBQ2pELGFBQWEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2FBQzlCO1lBQ0QsYUFBYSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdkQ7YUFBTTtZQUNMLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGdFQUFnRTtTQUN4SDtRQUVELE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7OztZQTNDRixVQUFVOzs7O1lBRmMsd0JBQXdCO1lBQXhDLGNBQWM7WUFBdUUsUUFBUTs7Ozs7OztJQUtsRyxpREFBcUQ7Ozs7O0lBQ3JELG9DQUE4Qjs7Ozs7SUFDOUIsc0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5ndWxhckNvbXBvbmVudE91dHB1dCB9IGZyb20gJy4vLi4vbW9kZWxzL2FuZ3VsYXJDb21wb25lbnRPdXRwdXQuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQXBwbGljYXRpb25SZWYsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBFbWJlZGRlZFZpZXdSZWYsIEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFyVXRpbFNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjb21wRmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXHJcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcclxuICApIHsgfVxyXG5cclxuICAvLyByZWYgaHR0cHM6Ly9oYWNrZXJub29uLmNvbS9hbmd1bGFyLXByby10aXAtaG93LXRvLWR5bmFtaWNhbGx5LWNyZWF0ZS1jb21wb25lbnRzLWluLWJvZHktYmEyMDBjYzI4OWU2XHJcbiAgY3JlYXRlQW5ndWxhckNvbXBvbmVudChjb21wb25lbnQ6IGFueSk6IEFuZ3VsYXJDb21wb25lbnRPdXRwdXQge1xyXG4gICAgLy8gQ3JlYXRlIGEgY29tcG9uZW50IHJlZmVyZW5jZSBmcm9tIHRoZSBjb21wb25lbnRcclxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuY29tcEZhY3RvcnlSZXNvbHZlclxyXG4gICAgICAucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KVxyXG4gICAgICAuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xyXG5cclxuICAgIC8vIEF0dGFjaCBjb21wb25lbnQgdG8gdGhlIGFwcFJlZiBzbyB0aGF0IGl0J3MgaW5zaWRlIHRoZSBuZyBjb21wb25lbnQgdHJlZVxyXG4gICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyhjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xyXG5cclxuICAgIC8vIEdldCBET00gZWxlbWVudCBmcm9tIGNvbXBvbmVudFxyXG4gICAgbGV0IGRvbUVsZW07XHJcbiAgICBjb25zdCB2aWV3UmVmID0gKGNvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pik7XHJcbiAgICBpZiAodmlld1JlZiAmJiBBcnJheS5pc0FycmF5KHZpZXdSZWYucm9vdE5vZGVzKSAmJiB2aWV3UmVmLnJvb3ROb2Rlc1swXSkge1xyXG4gICAgICBkb21FbGVtID0gdmlld1JlZi5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHsgY29tcG9uZW50UmVmLCBkb21FbGVtZW50OiBkb21FbGVtIH07XHJcbiAgfVxyXG5cclxuICAvLyByZWYgaHR0cHM6Ly9oYWNrZXJub29uLmNvbS9hbmd1bGFyLXByby10aXAtaG93LXRvLWR5bmFtaWNhbGx5LWNyZWF0ZS1jb21wb25lbnRzLWluLWJvZHktYmEyMDBjYzI4OWU2XHJcbiAgY3JlYXRlQW5ndWxhckNvbXBvbmVudEFwcGVuZFRvRG9tKGNvbXBvbmVudDogYW55LCB0YXJnZXRFbGVtZW50PzogSFRNTEVsZW1lbnQgfCBFbGVtZW50LCBjbGVhclRhcmdldENvbnRlbnQgPSBmYWxzZSk6IEFuZ3VsYXJDb21wb25lbnRPdXRwdXQge1xyXG4gICAgY29uc3QgY29tcG9uZW50T3V0cHV0ID0gdGhpcy5jcmVhdGVBbmd1bGFyQ29tcG9uZW50KGNvbXBvbmVudCk7XHJcblxyXG4gICAgLy8gQXBwZW5kIERPTSBlbGVtZW50IHRvIHRoZSBIVE1MIGVsZW1lbnQgc3BlY2lmaWVkXHJcbiAgICBpZiAodGFyZ2V0RWxlbWVudCAmJiB0YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKSB7XHJcbiAgICAgIGlmIChjbGVhclRhcmdldENvbnRlbnQgJiYgdGFyZ2V0RWxlbWVudC5pbm5lckhUTUwpIHtcclxuICAgICAgICB0YXJnZXRFbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICB9XHJcbiAgICAgIHRhcmdldEVsZW1lbnQuYXBwZW5kQ2hpbGQoY29tcG9uZW50T3V0cHV0LmRvbUVsZW1lbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb21wb25lbnRPdXRwdXQuZG9tRWxlbWVudCk7IC8vIHdoZW4gbm8gdGFyZ2V0IHByb3ZpZGVkLCB3ZSdsbCBzaW1wbHkgYWRkIGl0IHRvIHRoZSBIVE1MIEJvZHlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29tcG9uZW50T3V0cHV0O1xyXG4gIH1cclxufVxyXG4iXX0=