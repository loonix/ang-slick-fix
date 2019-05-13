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
export class AngularSlickgridModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
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
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1zbGlja2dyaWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFcEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFrQnRGLE1BQU0sT0FBTyxzQkFBc0I7Ozs7O0lBQ2pDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBcUIsRUFBRTtRQUNwQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7Z0JBQ3ZDLGtCQUFrQjtnQkFDbEIsaUJBQWlCO2dCQUNqQixhQUFhO2dCQUNiLGNBQWM7Z0JBQ2QsZ0JBQWdCO2FBQ2pCO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQTVCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZUFBZTtpQkFDaEI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLHlCQUF5QjtvQkFDekIsd0JBQXdCO2lCQUN6QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AseUJBQXlCO29CQUN6Qix3QkFBd0I7aUJBQ3pCO2dCQUNELGVBQWUsRUFBRSxDQUFDLHlCQUF5QixDQUFDO2FBQzdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5ndWxhclV0aWxTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9hbmd1bGFyVXRpbFNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgQW5ndWxhclNsaWNrZ3JpZENvbXBvbmVudCB9IGZyb20gJy4vLi4vY29tcG9uZW50cy9hbmd1bGFyLXNsaWNrZ3JpZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb2xsZWN0aW9uU2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvY29sbGVjdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRmlsdGVyRmFjdG9yeSB9IGZyb20gJy4uL2ZpbHRlcnMvZmlsdGVyRmFjdG9yeSc7XHJcbmltcG9ydCB7IEdyYXBocWxTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ncmFwaHFsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHcmlkT2RhdGFTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ncmlkLW9kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHcmlkT3B0aW9uIH0gZnJvbSAnLi8uLi9tb2RlbHMvZ3JpZE9wdGlvbi5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBTbGlja1BhZ2luYXRpb25Db21wb25lbnQgfSBmcm9tICcuLy4uL2NvbXBvbmVudHMvc2xpY2stcGFnaW5hdGlvbi5jb21wb25lbnQnO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgVHJhbnNsYXRlTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEFuZ3VsYXJTbGlja2dyaWRDb21wb25lbnQsXHJcbiAgICBTbGlja1BhZ2luYXRpb25Db21wb25lbnRcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEFuZ3VsYXJTbGlja2dyaWRDb21wb25lbnQsXHJcbiAgICBTbGlja1BhZ2luYXRpb25Db21wb25lbnRcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW0FuZ3VsYXJTbGlja2dyaWRDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFyU2xpY2tncmlkTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IEdyaWRPcHRpb24gPSB7fSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IEFuZ3VsYXJTbGlja2dyaWRNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHsgcHJvdmlkZTogJ2NvbmZpZycsIHVzZVZhbHVlOiBjb25maWcgfSxcclxuICAgICAgICBBbmd1bGFyVXRpbFNlcnZpY2UsXHJcbiAgICAgICAgQ29sbGVjdGlvblNlcnZpY2UsXHJcbiAgICAgICAgRmlsdGVyRmFjdG9yeSxcclxuICAgICAgICBHcmFwaHFsU2VydmljZSxcclxuICAgICAgICBHcmlkT2RhdGFTZXJ2aWNlXHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==