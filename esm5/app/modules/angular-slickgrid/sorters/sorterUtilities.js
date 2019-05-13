/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FieldType } from './../models/index';
import { Sorters } from './index';
/**
 * @param {?} value1
 * @param {?} value2
 * @param {?} fieldType
 * @param {?} sortDirection
 * @param {?} sortColumn
 * @return {?}
 */
export function sortByFieldType(value1, value2, fieldType, sortDirection, sortColumn) {
    /** @type {?} */
    var sortResult = 0;
    switch (fieldType) {
        case FieldType.number:
            sortResult = Sorters.numeric(value1, value2, sortDirection);
            break;
        case FieldType.date:
            sortResult = Sorters.date(value1, value2, sortDirection);
            break;
        case FieldType.dateIso:
            sortResult = Sorters.dateIso(value1, value2, sortDirection);
            break;
        case FieldType.dateUs:
            sortResult = Sorters.dateUs(value1, value2, sortDirection);
            break;
        case FieldType.dateUsShort:
            sortResult = Sorters.dateUsShort(value1, value2, sortDirection);
            break;
        case FieldType.object:
            sortResult = Sorters.objectString(value1, value2, sortDirection, sortColumn);
            break;
        default:
            sortResult = Sorters.string(value1, value2, sortDirection);
            break;
    }
    return sortResult;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVyVXRpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zb3J0ZXJzL3NvcnRlclV0aWxpdGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFVLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7Ozs7OztBQUVsQyxNQUFNLFVBQVUsZUFBZSxDQUFDLE1BQVcsRUFBRSxNQUFXLEVBQUUsU0FBb0IsRUFBRSxhQUFxQixFQUFFLFVBQWtCOztRQUNuSCxVQUFVLEdBQUcsQ0FBQztJQUVsQixRQUFRLFNBQVMsRUFBRTtRQUNqQixLQUFLLFNBQVMsQ0FBQyxNQUFNO1lBQ25CLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDNUQsTUFBTTtRQUNSLEtBQUssU0FBUyxDQUFDLElBQUk7WUFDakIsVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztZQUN6RCxNQUFNO1FBQ1IsS0FBSyxTQUFTLENBQUMsT0FBTztZQUNwQixVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQzVELE1BQU07UUFDUixLQUFLLFNBQVMsQ0FBQyxNQUFNO1lBQ25CLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDM0QsTUFBTTtRQUNSLEtBQUssU0FBUyxDQUFDLFdBQVc7WUFDeEIsVUFBVSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztZQUNoRSxNQUFNO1FBQ1IsS0FBSyxTQUFTLENBQUMsTUFBTTtZQUNuQixVQUFVLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUM3RSxNQUFNO1FBQ1I7WUFDRSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQzNELE1BQU07S0FDVDtJQUVELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4sIEZpZWxkVHlwZSB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgU29ydGVycyB9IGZyb20gJy4vaW5kZXgnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNvcnRCeUZpZWxkVHlwZSh2YWx1ZTE6IGFueSwgdmFsdWUyOiBhbnksIGZpZWxkVHlwZTogRmllbGRUeXBlLCBzb3J0RGlyZWN0aW9uOiBudW1iZXIsIHNvcnRDb2x1bW46IENvbHVtbikge1xyXG4gIGxldCBzb3J0UmVzdWx0ID0gMDtcclxuXHJcbiAgc3dpdGNoIChmaWVsZFR5cGUpIHtcclxuICAgIGNhc2UgRmllbGRUeXBlLm51bWJlcjpcclxuICAgICAgc29ydFJlc3VsdCA9IFNvcnRlcnMubnVtZXJpYyh2YWx1ZTEsIHZhbHVlMiwgc29ydERpcmVjdGlvbik7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZTpcclxuICAgICAgc29ydFJlc3VsdCA9IFNvcnRlcnMuZGF0ZSh2YWx1ZTEsIHZhbHVlMiwgc29ydERpcmVjdGlvbik7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZUlzbzpcclxuICAgICAgc29ydFJlc3VsdCA9IFNvcnRlcnMuZGF0ZUlzbyh2YWx1ZTEsIHZhbHVlMiwgc29ydERpcmVjdGlvbik7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVVzOlxyXG4gICAgICBzb3J0UmVzdWx0ID0gU29ydGVycy5kYXRlVXModmFsdWUxLCB2YWx1ZTIsIHNvcnREaXJlY3Rpb24pO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVVc1Nob3J0OlxyXG4gICAgICBzb3J0UmVzdWx0ID0gU29ydGVycy5kYXRlVXNTaG9ydCh2YWx1ZTEsIHZhbHVlMiwgc29ydERpcmVjdGlvbik7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUub2JqZWN0OlxyXG4gICAgICBzb3J0UmVzdWx0ID0gU29ydGVycy5vYmplY3RTdHJpbmcodmFsdWUxLCB2YWx1ZTIsIHNvcnREaXJlY3Rpb24sIHNvcnRDb2x1bW4pO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHNvcnRSZXN1bHQgPSBTb3J0ZXJzLnN0cmluZyh2YWx1ZTEsIHZhbHVlMiwgc29ydERpcmVjdGlvbik7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHNvcnRSZXN1bHQ7XHJcbn1cclxuIl19