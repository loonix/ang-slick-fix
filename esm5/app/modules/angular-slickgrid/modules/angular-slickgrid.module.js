/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AngularUtilService } from './../services/angularUtilService';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSlickgridComponent } from './../components/angular-slickgrid.component';
import { CollectionService } from './../services/collection.service';
import { FilterFactory } from '../filters/filterFactory';
import { GraphqlService } from './../services/graphql.service';
import { GridOdataService } from './../services/grid-odata.service';
import { SlickPaginationComponent } from './../components/slick-pagination.component';
var AngularSlickgridModule = /** @class */ (function () {
    function AngularSlickgridModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    AngularSlickgridModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: AngularSlickgridModule,
            providers: [
                { provide: 'config', useValue: config },
                AngularUtilService,
                CollectionService,
                FilterFactory,
                GraphqlService,
                GridOdataService
            ]
        };
    };
    AngularSlickgridModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        TranslateModule
                    ],
                    declarations: [
                        AngularSlickgridComponent,
                        SlickPaginationComponent
                    ],
                    exports: [
                        AngularSlickgridComponent,
                        SlickPaginationComponent
                    ],
                    entryComponents: [AngularSlickgridComponent]
                },] }
    ];
    return AngularSlickgridModule;
}());
export { AngularSlickgridModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1zbGlja2dyaWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFcEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFHdEY7SUFBQTtJQTZCQSxDQUFDOzs7OztJQWJRLDhCQUFPOzs7O0lBQWQsVUFBZSxNQUF1QjtRQUF2Qix1QkFBQSxFQUFBLFdBQXVCO1FBQ3BDLE9BQU87WUFDTCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtnQkFDdkMsa0JBQWtCO2dCQUNsQixpQkFBaUI7Z0JBQ2pCLGFBQWE7Z0JBQ2IsY0FBYztnQkFDZCxnQkFBZ0I7YUFDakI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Z0JBNUJGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixlQUFlO3FCQUNoQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1oseUJBQXlCO3dCQUN6Qix3QkFBd0I7cUJBQ3pCO29CQUNELE9BQU8sRUFBRTt3QkFDUCx5QkFBeUI7d0JBQ3pCLHdCQUF3QjtxQkFDekI7b0JBQ0QsZUFBZSxFQUFFLENBQUMseUJBQXlCLENBQUM7aUJBQzdDOztJQWVELDZCQUFDO0NBQUEsQUE3QkQsSUE2QkM7U0FkWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmd1bGFyVXRpbFNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2FuZ3VsYXJVdGlsU2VydmljZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBBbmd1bGFyU2xpY2tncmlkQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9jb21wb25lbnRzL2FuZ3VsYXItc2xpY2tncmlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbGxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9jb2xsZWN0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGaWx0ZXJGYWN0b3J5IH0gZnJvbSAnLi4vZmlsdGVycy9maWx0ZXJGYWN0b3J5JztcclxuaW1wb3J0IHsgR3JhcGhxbFNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2dyYXBocWwuc2VydmljZSc7XHJcbmltcG9ydCB7IEdyaWRPZGF0YVNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2dyaWQtb2RhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IEdyaWRPcHRpb24gfSBmcm9tICcuLy4uL21vZGVscy9ncmlkT3B0aW9uLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFNsaWNrUGFnaW5hdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vLi4vY29tcG9uZW50cy9zbGljay1wYWdpbmF0aW9uLmNvbXBvbmVudCc7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBUcmFuc2xhdGVNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQW5ndWxhclNsaWNrZ3JpZENvbXBvbmVudCxcclxuICAgIFNsaWNrUGFnaW5hdGlvbkNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgQW5ndWxhclNsaWNrZ3JpZENvbXBvbmVudCxcclxuICAgIFNsaWNrUGFnaW5hdGlvbkNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbQW5ndWxhclNsaWNrZ3JpZENvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJTbGlja2dyaWRNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogR3JpZE9wdGlvbiA9IHt9KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogQW5ndWxhclNsaWNrZ3JpZE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgeyBwcm92aWRlOiAnY29uZmlnJywgdXNlVmFsdWU6IGNvbmZpZyB9LFxyXG4gICAgICAgIEFuZ3VsYXJVdGlsU2VydmljZSxcclxuICAgICAgICBDb2xsZWN0aW9uU2VydmljZSxcclxuICAgICAgICBGaWx0ZXJGYWN0b3J5LFxyXG4gICAgICAgIEdyYXBocWxTZXJ2aWNlLFxyXG4gICAgICAgIEdyaWRPZGF0YVNlcnZpY2VcclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19