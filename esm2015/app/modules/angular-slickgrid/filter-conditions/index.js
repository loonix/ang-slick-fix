/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { booleanFilterCondition } from './booleanFilterCondition';
import { dateFilterCondition } from './dateFilterCondition';
import { dateIsoFilterCondition } from './dateIsoFilterCondition';
import { dateUsFilterCondition } from './dateUsFilterCondition';
import { dateUsShortFilterCondition } from './dateUsShortFilterCondition';
import { dateUtcFilterCondition } from './dateUtcFilterCondition';
import { executeMappedCondition } from './executeMappedCondition';
import { collectionSearchFilterCondition } from './collectionSearchFilterCondition';
import { numberFilterCondition } from './numberFilterCondition';
import { stringFilterCondition } from './stringFilterCondition';
import { testFilterCondition } from './filterUtilities';
/** @type {?} */
export const FilterConditions = {
    executeMappedCondition,
    booleanFilter: booleanFilterCondition,
    collectionSearchFilter: collectionSearchFilterCondition,
    dateFilter: dateFilterCondition,
    dateIsoFilter: dateIsoFilterCondition,
    dateUtcFilter: dateUtcFilterCondition,
    dateUsFilter: dateUsFilterCondition,
    dateUsShortFilter: dateUsShortFilterCondition,
    numberFilter: numberFilterCondition,
    stringFilter: stringFilterCondition,
    testFilter: testFilterCondition
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2ZpbHRlci1jb25kaXRpb25zL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFFeEQsTUFBTSxPQUFPLGdCQUFnQixHQUFHO0lBQzlCLHNCQUFzQjtJQUN0QixhQUFhLEVBQUUsc0JBQXNCO0lBQ3JDLHNCQUFzQixFQUFFLCtCQUErQjtJQUN2RCxVQUFVLEVBQUUsbUJBQW1CO0lBQy9CLGFBQWEsRUFBRSxzQkFBc0I7SUFDckMsYUFBYSxFQUFFLHNCQUFzQjtJQUNyQyxZQUFZLEVBQUUscUJBQXFCO0lBQ25DLGlCQUFpQixFQUFFLDBCQUEwQjtJQUM3QyxZQUFZLEVBQUUscUJBQXFCO0lBQ25DLFlBQVksRUFBRSxxQkFBcUI7SUFDbkMsVUFBVSxFQUFFLG1CQUFtQjtDQUNoQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZpbHRlckNvbmRpdGlvbk9wdGlvbiB9IGZyb20gJy4vLi4vbW9kZWxzL2ZpbHRlckNvbmRpdGlvbk9wdGlvbi5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBib29sZWFuRmlsdGVyQ29uZGl0aW9uIH0gZnJvbSAnLi9ib29sZWFuRmlsdGVyQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgZGF0ZUZpbHRlckNvbmRpdGlvbiB9IGZyb20gJy4vZGF0ZUZpbHRlckNvbmRpdGlvbic7XHJcbmltcG9ydCB7IGRhdGVJc29GaWx0ZXJDb25kaXRpb24gfSBmcm9tICcuL2RhdGVJc29GaWx0ZXJDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBkYXRlVXNGaWx0ZXJDb25kaXRpb24gfSBmcm9tICcuL2RhdGVVc0ZpbHRlckNvbmRpdGlvbic7XHJcbmltcG9ydCB7IGRhdGVVc1Nob3J0RmlsdGVyQ29uZGl0aW9uIH0gZnJvbSAnLi9kYXRlVXNTaG9ydEZpbHRlckNvbmRpdGlvbic7XHJcbmltcG9ydCB7IGRhdGVVdGNGaWx0ZXJDb25kaXRpb24gfSBmcm9tICcuL2RhdGVVdGNGaWx0ZXJDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBleGVjdXRlTWFwcGVkQ29uZGl0aW9uIH0gZnJvbSAnLi9leGVjdXRlTWFwcGVkQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgY29sbGVjdGlvblNlYXJjaEZpbHRlckNvbmRpdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvblNlYXJjaEZpbHRlckNvbmRpdGlvbic7XHJcbmltcG9ydCB7IG51bWJlckZpbHRlckNvbmRpdGlvbiB9IGZyb20gJy4vbnVtYmVyRmlsdGVyQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgc3RyaW5nRmlsdGVyQ29uZGl0aW9uIH0gZnJvbSAnLi9zdHJpbmdGaWx0ZXJDb25kaXRpb24nO1xyXG5pbXBvcnQgeyB0ZXN0RmlsdGVyQ29uZGl0aW9uIH0gZnJvbSAnLi9maWx0ZXJVdGlsaXRpZXMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEZpbHRlckNvbmRpdGlvbnMgPSB7XHJcbiAgZXhlY3V0ZU1hcHBlZENvbmRpdGlvbixcclxuICBib29sZWFuRmlsdGVyOiBib29sZWFuRmlsdGVyQ29uZGl0aW9uLFxyXG4gIGNvbGxlY3Rpb25TZWFyY2hGaWx0ZXI6IGNvbGxlY3Rpb25TZWFyY2hGaWx0ZXJDb25kaXRpb24sXHJcbiAgZGF0ZUZpbHRlcjogZGF0ZUZpbHRlckNvbmRpdGlvbixcclxuICBkYXRlSXNvRmlsdGVyOiBkYXRlSXNvRmlsdGVyQ29uZGl0aW9uLFxyXG4gIGRhdGVVdGNGaWx0ZXI6IGRhdGVVdGNGaWx0ZXJDb25kaXRpb24sXHJcbiAgZGF0ZVVzRmlsdGVyOiBkYXRlVXNGaWx0ZXJDb25kaXRpb24sXHJcbiAgZGF0ZVVzU2hvcnRGaWx0ZXI6IGRhdGVVc1Nob3J0RmlsdGVyQ29uZGl0aW9uLFxyXG4gIG51bWJlckZpbHRlcjogbnVtYmVyRmlsdGVyQ29uZGl0aW9uLFxyXG4gIHN0cmluZ0ZpbHRlcjogc3RyaW5nRmlsdGVyQ29uZGl0aW9uLFxyXG4gIHRlc3RGaWx0ZXI6IHRlc3RGaWx0ZXJDb25kaXRpb25cclxufTtcclxuIl19