/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AutoCompleteFilter } from './autoCompleteFilter';
import { CompoundDateFilter } from './compoundDateFilter';
import { CompoundInputFilter } from './compoundInputFilter';
import { CompoundInputNumberFilter } from './compoundInputNumberFilter';
import { CompoundInputPasswordFilter } from './compoundInputPasswordFilter';
import { CompoundSliderFilter } from './compoundSliderFilter';
import { InputFilter } from './inputFilter';
import { InputMaskFilter } from './inputMaskFilter';
import { InputNumberFilter } from './inputNumberFilter';
import { InputPasswordFilter } from './inputPasswordFilter';
import { MultipleSelectFilter } from './multipleSelectFilter';
import { NativeSelectFilter } from './nativeSelectFilter';
import { SingleSelectFilter } from './singleSelectFilter';
import { SliderFilter } from './sliderFilter';
/** @type {?} */
export var Filters = {
    /**
     * AutoComplete Filter (using jQuery UI autocomplete feature)
     */
    autoComplete: AutoCompleteFilter,
    /**
     * Compound Date Filter (compound of Operator + Date picker)
     */
    compoundDate: CompoundDateFilter,
    /**
     * Alias to compoundInputText to Compound Input Filter (compound of Operator + Input Text)
     */
    compoundInput: CompoundInputFilter,
    /**
     * Compound Input Number Filter (compound of Operator + Input of type Number)
     */
    compoundInputNumber: CompoundInputNumberFilter,
    /**
     * Compound Input Password Filter (compound of Operator + Input of type Password, also note that only the text shown in the UI will be masked, filter query is still plain text)
     */
    compoundInputPassword: CompoundInputPasswordFilter,
    /**
     * Compound Input Text Filter (compound of Operator + Input Text)
     */
    compoundInputText: CompoundInputFilter,
    /**
     * Compound Slider Filter (compound of Operator + Slider)
     */
    compoundSlider: CompoundSliderFilter,
    /**
     * Alias to inputText, input type text filter
     */
    input: InputFilter,
    /**
     * Input Filter of type text that will be formatted with a mask output
     * e.g.: column: { filter: { model: Filters.inputMask }, params: { mask: '(000) 000-0000' }}
     */
    inputMask: InputMaskFilter,
    /**
     * Input Filter of type Number
     */
    inputNumber: InputNumberFilter,
    /**
     * Input Filter of type Password (note that only the text shown in the UI will be masked, filter query is still plain text)
     */
    inputPassword: InputPasswordFilter,
    /**
     * Default Filter, input type text filter
     */
    inputText: InputFilter,
    /**
     * Multiple Select filter, which uses 3rd party lib "multiple-select.js"
     */
    multipleSelect: MultipleSelectFilter,
    /**
     * Select filter, which uses native DOM element select
     */
    select: NativeSelectFilter,
    /**
     * Single Select filter, which uses 3rd party lib "multiple-select.js"
     */
    singleSelect: SingleSelectFilter,
    /**
     * Slider Filter
     */
    slider: SliderFilter,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2ZpbHRlcnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFOUMsTUFBTSxLQUFPLE9BQU8sR0FBRzs7OztJQUVyQixZQUFZLEVBQUUsa0JBQWtCOzs7O0lBR2hDLFlBQVksRUFBRSxrQkFBa0I7Ozs7SUFHaEMsYUFBYSxFQUFFLG1CQUFtQjs7OztJQUdsQyxtQkFBbUIsRUFBRSx5QkFBeUI7Ozs7SUFHOUMscUJBQXFCLEVBQUUsMkJBQTJCOzs7O0lBR2xELGlCQUFpQixFQUFFLG1CQUFtQjs7OztJQUd0QyxjQUFjLEVBQUUsb0JBQW9COzs7O0lBR3BDLEtBQUssRUFBRSxXQUFXOzs7OztJQU1sQixTQUFTLEVBQUUsZUFBZTs7OztJQUcxQixXQUFXLEVBQUUsaUJBQWlCOzs7O0lBRzlCLGFBQWEsRUFBRSxtQkFBbUI7Ozs7SUFHbEMsU0FBUyxFQUFFLFdBQVc7Ozs7SUFHdEIsY0FBYyxFQUFFLG9CQUFvQjs7OztJQUdwQyxNQUFNLEVBQUUsa0JBQWtCOzs7O0lBRzFCLFlBQVksRUFBRSxrQkFBa0I7Ozs7SUFHaEMsTUFBTSxFQUFFLFlBQVk7Q0FDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4sIEZpbHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgQXV0b0NvbXBsZXRlRmlsdGVyIH0gZnJvbSAnLi9hdXRvQ29tcGxldGVGaWx0ZXInO1xyXG5pbXBvcnQgeyBDb21wb3VuZERhdGVGaWx0ZXIgfSBmcm9tICcuL2NvbXBvdW5kRGF0ZUZpbHRlcic7XHJcbmltcG9ydCB7IENvbXBvdW5kSW5wdXRGaWx0ZXIgfSBmcm9tICcuL2NvbXBvdW5kSW5wdXRGaWx0ZXInO1xyXG5pbXBvcnQgeyBDb21wb3VuZElucHV0TnVtYmVyRmlsdGVyIH0gZnJvbSAnLi9jb21wb3VuZElucHV0TnVtYmVyRmlsdGVyJztcclxuaW1wb3J0IHsgQ29tcG91bmRJbnB1dFBhc3N3b3JkRmlsdGVyIH0gZnJvbSAnLi9jb21wb3VuZElucHV0UGFzc3dvcmRGaWx0ZXInO1xyXG5pbXBvcnQgeyBDb21wb3VuZFNsaWRlckZpbHRlciB9IGZyb20gJy4vY29tcG91bmRTbGlkZXJGaWx0ZXInO1xyXG5pbXBvcnQgeyBJbnB1dEZpbHRlciB9IGZyb20gJy4vaW5wdXRGaWx0ZXInO1xyXG5pbXBvcnQgeyBJbnB1dE1hc2tGaWx0ZXIgfSBmcm9tICcuL2lucHV0TWFza0ZpbHRlcic7XHJcbmltcG9ydCB7IElucHV0TnVtYmVyRmlsdGVyIH0gZnJvbSAnLi9pbnB1dE51bWJlckZpbHRlcic7XHJcbmltcG9ydCB7IElucHV0UGFzc3dvcmRGaWx0ZXIgfSBmcm9tICcuL2lucHV0UGFzc3dvcmRGaWx0ZXInO1xyXG5pbXBvcnQgeyBNdWx0aXBsZVNlbGVjdEZpbHRlciB9IGZyb20gJy4vbXVsdGlwbGVTZWxlY3RGaWx0ZXInO1xyXG5pbXBvcnQgeyBOYXRpdmVTZWxlY3RGaWx0ZXIgfSBmcm9tICcuL25hdGl2ZVNlbGVjdEZpbHRlcic7XHJcbmltcG9ydCB7IFNpbmdsZVNlbGVjdEZpbHRlciB9IGZyb20gJy4vc2luZ2xlU2VsZWN0RmlsdGVyJztcclxuaW1wb3J0IHsgU2xpZGVyRmlsdGVyIH0gZnJvbSAnLi9zbGlkZXJGaWx0ZXInO1xyXG5cclxuZXhwb3J0IGNvbnN0IEZpbHRlcnMgPSB7XHJcbiAgLyoqIEF1dG9Db21wbGV0ZSBGaWx0ZXIgKHVzaW5nIGpRdWVyeSBVSSBhdXRvY29tcGxldGUgZmVhdHVyZSkgKi9cclxuICBhdXRvQ29tcGxldGU6IEF1dG9Db21wbGV0ZUZpbHRlcixcclxuXHJcbiAgLyoqIENvbXBvdW5kIERhdGUgRmlsdGVyIChjb21wb3VuZCBvZiBPcGVyYXRvciArIERhdGUgcGlja2VyKSAqL1xyXG4gIGNvbXBvdW5kRGF0ZTogQ29tcG91bmREYXRlRmlsdGVyLFxyXG5cclxuICAvKiogQWxpYXMgdG8gY29tcG91bmRJbnB1dFRleHQgdG8gQ29tcG91bmQgSW5wdXQgRmlsdGVyIChjb21wb3VuZCBvZiBPcGVyYXRvciArIElucHV0IFRleHQpICovXHJcbiAgY29tcG91bmRJbnB1dDogQ29tcG91bmRJbnB1dEZpbHRlcixcclxuXHJcbiAgLyoqIENvbXBvdW5kIElucHV0IE51bWJlciBGaWx0ZXIgKGNvbXBvdW5kIG9mIE9wZXJhdG9yICsgSW5wdXQgb2YgdHlwZSBOdW1iZXIpICovXHJcbiAgY29tcG91bmRJbnB1dE51bWJlcjogQ29tcG91bmRJbnB1dE51bWJlckZpbHRlcixcclxuXHJcbiAgLyoqIENvbXBvdW5kIElucHV0IFBhc3N3b3JkIEZpbHRlciAoY29tcG91bmQgb2YgT3BlcmF0b3IgKyBJbnB1dCBvZiB0eXBlIFBhc3N3b3JkLCBhbHNvIG5vdGUgdGhhdCBvbmx5IHRoZSB0ZXh0IHNob3duIGluIHRoZSBVSSB3aWxsIGJlIG1hc2tlZCwgZmlsdGVyIHF1ZXJ5IGlzIHN0aWxsIHBsYWluIHRleHQpICovXHJcbiAgY29tcG91bmRJbnB1dFBhc3N3b3JkOiBDb21wb3VuZElucHV0UGFzc3dvcmRGaWx0ZXIsXHJcblxyXG4gIC8qKiBDb21wb3VuZCBJbnB1dCBUZXh0IEZpbHRlciAoY29tcG91bmQgb2YgT3BlcmF0b3IgKyBJbnB1dCBUZXh0KSAqL1xyXG4gIGNvbXBvdW5kSW5wdXRUZXh0OiBDb21wb3VuZElucHV0RmlsdGVyLFxyXG5cclxuICAvKiogQ29tcG91bmQgU2xpZGVyIEZpbHRlciAoY29tcG91bmQgb2YgT3BlcmF0b3IgKyBTbGlkZXIpICovXHJcbiAgY29tcG91bmRTbGlkZXI6IENvbXBvdW5kU2xpZGVyRmlsdGVyLFxyXG5cclxuICAvKiogQWxpYXMgdG8gaW5wdXRUZXh0LCBpbnB1dCB0eXBlIHRleHQgZmlsdGVyICovXHJcbiAgaW5wdXQ6IElucHV0RmlsdGVyLFxyXG5cclxuICAvKipcclxuICAgKiBJbnB1dCBGaWx0ZXIgb2YgdHlwZSB0ZXh0IHRoYXQgd2lsbCBiZSBmb3JtYXR0ZWQgd2l0aCBhIG1hc2sgb3V0cHV0XHJcbiAgICogZS5nLjogY29sdW1uOiB7IGZpbHRlcjogeyBtb2RlbDogRmlsdGVycy5pbnB1dE1hc2sgfSwgcGFyYW1zOiB7IG1hc2s6ICcoMDAwKSAwMDAtMDAwMCcgfX1cclxuICAgKi9cclxuICBpbnB1dE1hc2s6IElucHV0TWFza0ZpbHRlcixcclxuXHJcbiAgLyoqIElucHV0IEZpbHRlciBvZiB0eXBlIE51bWJlciAqL1xyXG4gIGlucHV0TnVtYmVyOiBJbnB1dE51bWJlckZpbHRlcixcclxuXHJcbiAgLyoqIElucHV0IEZpbHRlciBvZiB0eXBlIFBhc3N3b3JkIChub3RlIHRoYXQgb25seSB0aGUgdGV4dCBzaG93biBpbiB0aGUgVUkgd2lsbCBiZSBtYXNrZWQsIGZpbHRlciBxdWVyeSBpcyBzdGlsbCBwbGFpbiB0ZXh0KSAqL1xyXG4gIGlucHV0UGFzc3dvcmQ6IElucHV0UGFzc3dvcmRGaWx0ZXIsXHJcblxyXG4gIC8qKiBEZWZhdWx0IEZpbHRlciwgaW5wdXQgdHlwZSB0ZXh0IGZpbHRlciAqL1xyXG4gIGlucHV0VGV4dDogSW5wdXRGaWx0ZXIsXHJcblxyXG4gIC8qKiBNdWx0aXBsZSBTZWxlY3QgZmlsdGVyLCB3aGljaCB1c2VzIDNyZCBwYXJ0eSBsaWIgXCJtdWx0aXBsZS1zZWxlY3QuanNcIiAqL1xyXG4gIG11bHRpcGxlU2VsZWN0OiBNdWx0aXBsZVNlbGVjdEZpbHRlcixcclxuXHJcbiAgLyoqIFNlbGVjdCBmaWx0ZXIsIHdoaWNoIHVzZXMgbmF0aXZlIERPTSBlbGVtZW50IHNlbGVjdCAqL1xyXG4gIHNlbGVjdDogTmF0aXZlU2VsZWN0RmlsdGVyLFxyXG5cclxuICAvKiogU2luZ2xlIFNlbGVjdCBmaWx0ZXIsIHdoaWNoIHVzZXMgM3JkIHBhcnR5IGxpYiBcIm11bHRpcGxlLXNlbGVjdC5qc1wiICovXHJcbiAgc2luZ2xlU2VsZWN0OiBTaW5nbGVTZWxlY3RGaWx0ZXIsXHJcblxyXG4gIC8qKiBTbGlkZXIgRmlsdGVyICovXHJcbiAgc2xpZGVyOiBTbGlkZXJGaWx0ZXIsXHJcbn07XHJcbiJdfQ==