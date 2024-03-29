/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { booleanFilterCondition } from './booleanFilterCondition';
import { dateFilterCondition } from './dateFilterCondition';
import { dateIsoFilterCondition } from './dateIsoFilterCondition';
import { dateUsShortFilterCondition } from './dateUsShortFilterCondition';
import { dateUsFilterCondition } from './dateUsFilterCondition';
import { dateUtcFilterCondition } from './dateUtcFilterCondition';
import { collectionSearchFilterCondition } from './collectionSearchFilterCondition';
import { numberFilterCondition } from './numberFilterCondition';
import { objectFilterCondition } from './objectFilterCondition';
import { stringFilterCondition } from './stringFilterCondition';
import { FieldType } from '../models/index';
/** @type {?} */
export const executeMappedCondition = (/**
 * @param {?} options
 * @return {?}
 */
(options) => {
    // when using a multi-select ('IN' operator) we will not use the field type but instead go directly with a collection search
    /** @type {?} */
    const operator = options && options.operator && options.operator.toUpperCase();
    if (operator === 'IN' || operator === 'NIN' || operator === 'IN_CONTAINS' || operator === 'NIN_CONTAINS') {
        return collectionSearchFilterCondition(options);
    }
    // execute the mapped type, or default to String condition check
    switch (options.fieldType) {
        case FieldType.boolean:
            return booleanFilterCondition(options);
        case FieldType.date:
            return dateFilterCondition(options);
        case FieldType.dateUtc:
            return dateUtcFilterCondition(options);
        case FieldType.dateIso:
            return dateIsoFilterCondition(options);
        case FieldType.dateUs:
        case FieldType.dateTimeUs:
            return dateUsFilterCondition(options);
        case FieldType.dateUsShort:
        case FieldType.dateTimeUsShort:
            return dateUsShortFilterCondition(options);
        case FieldType.number:
            return numberFilterCondition(options);
        case FieldType.object:
            return objectFilterCondition(options);
        case FieldType.string:
        default:
            return stringFilterCondition(options);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0ZU1hcHBlZENvbmRpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZmlsdGVyLWNvbmRpdGlvbnMvZXhlY3V0ZU1hcHBlZENvbmRpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHbEUsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUU1QyxNQUFNLE9BQU8sc0JBQXNCOzs7O0FBQW9CLENBQUMsT0FBOEIsRUFBRSxFQUFFOzs7VUFFbEYsUUFBUSxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFO0lBQzlFLElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLEtBQUssS0FBSyxJQUFJLFFBQVEsS0FBSyxhQUFhLElBQUksUUFBUSxLQUFLLGNBQWMsRUFBRTtRQUN4RyxPQUFPLCtCQUErQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2pEO0lBRUQsZ0VBQWdFO0lBQ2hFLFFBQVEsT0FBTyxDQUFDLFNBQVMsRUFBRTtRQUN6QixLQUFLLFNBQVMsQ0FBQyxPQUFPO1lBQ3BCLE9BQU8sc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsS0FBSyxTQUFTLENBQUMsSUFBSTtZQUNqQixPQUFPLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLEtBQUssU0FBUyxDQUFDLE9BQU87WUFDcEIsT0FBTyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QyxLQUFLLFNBQVMsQ0FBQyxPQUFPO1lBQ3BCLE9BQU8sc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsS0FBSyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ3RCLEtBQUssU0FBUyxDQUFDLFVBQVU7WUFDdkIsT0FBTyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxLQUFLLFNBQVMsQ0FBQyxXQUFXLENBQUM7UUFDM0IsS0FBSyxTQUFTLENBQUMsZUFBZTtZQUM1QixPQUFPLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLEtBQUssU0FBUyxDQUFDLE1BQU07WUFDbkIsT0FBTyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxLQUFLLFNBQVMsQ0FBQyxNQUFNO1lBQ25CLE9BQU8scUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsS0FBSyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ3RCO1lBQ0UsT0FBTyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN6QztBQUNILENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJvb2xlYW5GaWx0ZXJDb25kaXRpb24gfSBmcm9tICcuL2Jvb2xlYW5GaWx0ZXJDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBkYXRlRmlsdGVyQ29uZGl0aW9uIH0gZnJvbSAnLi9kYXRlRmlsdGVyQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgZGF0ZUlzb0ZpbHRlckNvbmRpdGlvbiB9IGZyb20gJy4vZGF0ZUlzb0ZpbHRlckNvbmRpdGlvbic7XHJcbmltcG9ydCB7IGRhdGVVc1Nob3J0RmlsdGVyQ29uZGl0aW9uIH0gZnJvbSAnLi9kYXRlVXNTaG9ydEZpbHRlckNvbmRpdGlvbic7XHJcbmltcG9ydCB7IGRhdGVVc0ZpbHRlckNvbmRpdGlvbiB9IGZyb20gJy4vZGF0ZVVzRmlsdGVyQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgZGF0ZVV0Y0ZpbHRlckNvbmRpdGlvbiB9IGZyb20gJy4vZGF0ZVV0Y0ZpbHRlckNvbmRpdGlvbic7XHJcbmltcG9ydCB7IEZpbHRlckNvbmRpdGlvbk9wdGlvbiB9IGZyb20gJy4vLi4vbW9kZWxzL2ZpbHRlckNvbmRpdGlvbk9wdGlvbi5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBGaWx0ZXJDb25kaXRpb24gfSBmcm9tICcuLi9tb2RlbHMvZmlsdGVyQ29uZGl0aW9uLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IGNvbGxlY3Rpb25TZWFyY2hGaWx0ZXJDb25kaXRpb24gfSBmcm9tICcuL2NvbGxlY3Rpb25TZWFyY2hGaWx0ZXJDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBudW1iZXJGaWx0ZXJDb25kaXRpb24gfSBmcm9tICcuL251bWJlckZpbHRlckNvbmRpdGlvbic7XHJcbmltcG9ydCB7IG9iamVjdEZpbHRlckNvbmRpdGlvbiB9IGZyb20gJy4vb2JqZWN0RmlsdGVyQ29uZGl0aW9uJztcclxuaW1wb3J0IHsgc3RyaW5nRmlsdGVyQ29uZGl0aW9uIH0gZnJvbSAnLi9zdHJpbmdGaWx0ZXJDb25kaXRpb24nO1xyXG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGV4ZWN1dGVNYXBwZWRDb25kaXRpb246IEZpbHRlckNvbmRpdGlvbiA9IChvcHRpb25zOiBGaWx0ZXJDb25kaXRpb25PcHRpb24pID0+IHtcclxuICAvLyB3aGVuIHVzaW5nIGEgbXVsdGktc2VsZWN0ICgnSU4nIG9wZXJhdG9yKSB3ZSB3aWxsIG5vdCB1c2UgdGhlIGZpZWxkIHR5cGUgYnV0IGluc3RlYWQgZ28gZGlyZWN0bHkgd2l0aCBhIGNvbGxlY3Rpb24gc2VhcmNoXHJcbiAgY29uc3Qgb3BlcmF0b3IgPSBvcHRpb25zICYmIG9wdGlvbnMub3BlcmF0b3IgJiYgb3B0aW9ucy5vcGVyYXRvci50b1VwcGVyQ2FzZSgpO1xyXG4gIGlmIChvcGVyYXRvciA9PT0gJ0lOJyB8fCBvcGVyYXRvciA9PT0gJ05JTicgfHwgb3BlcmF0b3IgPT09ICdJTl9DT05UQUlOUycgfHwgb3BlcmF0b3IgPT09ICdOSU5fQ09OVEFJTlMnKSB7XHJcbiAgICByZXR1cm4gY29sbGVjdGlvblNlYXJjaEZpbHRlckNvbmRpdGlvbihvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8vIGV4ZWN1dGUgdGhlIG1hcHBlZCB0eXBlLCBvciBkZWZhdWx0IHRvIFN0cmluZyBjb25kaXRpb24gY2hlY2tcclxuICBzd2l0Y2ggKG9wdGlvbnMuZmllbGRUeXBlKSB7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5ib29sZWFuOlxyXG4gICAgICByZXR1cm4gYm9vbGVhbkZpbHRlckNvbmRpdGlvbihvcHRpb25zKTtcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGU6XHJcbiAgICAgIHJldHVybiBkYXRlRmlsdGVyQ29uZGl0aW9uKG9wdGlvbnMpO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVV0YzpcclxuICAgICAgcmV0dXJuIGRhdGVVdGNGaWx0ZXJDb25kaXRpb24ob3B0aW9ucyk7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlSXNvOlxyXG4gICAgICByZXR1cm4gZGF0ZUlzb0ZpbHRlckNvbmRpdGlvbihvcHRpb25zKTtcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVVczpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXM6XHJcbiAgICAgIHJldHVybiBkYXRlVXNGaWx0ZXJDb25kaXRpb24ob3B0aW9ucyk7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVXNTaG9ydDpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNTaG9ydDpcclxuICAgICAgcmV0dXJuIGRhdGVVc1Nob3J0RmlsdGVyQ29uZGl0aW9uKG9wdGlvbnMpO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUubnVtYmVyOlxyXG4gICAgICByZXR1cm4gbnVtYmVyRmlsdGVyQ29uZGl0aW9uKG9wdGlvbnMpO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUub2JqZWN0OlxyXG4gICAgICByZXR1cm4gb2JqZWN0RmlsdGVyQ29uZGl0aW9uKG9wdGlvbnMpO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuc3RyaW5nOlxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIHN0cmluZ0ZpbHRlckNvbmRpdGlvbihvcHRpb25zKTtcclxuICB9XHJcbn07XHJcbiJdfQ==