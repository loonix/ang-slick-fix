/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AutoCompleteEditor } from './autoCompleteEditor';
import { CheckboxEditor } from './checkboxEditor';
import { DateEditor } from './dateEditor';
import { FloatEditor } from './floatEditor';
import { IntegerEditor } from './integerEditor';
import { LongTextEditor } from './longTextEditor';
import { MultipleSelectEditor } from './multipleSelectEditor';
import { SingleSelectEditor } from './singleSelectEditor';
import { SliderEditor } from './sliderEditor';
import { TextEditor } from './textEditor';
/** @type {?} */
export const Editors = {
    /**
     * AutoComplete Editor (using jQuery UI autocomplete feature)
     */
    autoComplete: AutoCompleteEditor,
    /**
     * Checkbox Editor (uses native checkbox DOM element)
     */
    checkbox: CheckboxEditor,
    /**
     * Date Picker Editor (which uses 3rd party lib "flatpickr")
     */
    date: DateEditor,
    /**
     * Float Number Editor
     */
    float: FloatEditor,
    /**
     * Integer Editor
     */
    integer: IntegerEditor,
    /**
     * Long Text Editor (uses a textarea)
     */
    longText: LongTextEditor,
    /**
     * Multiple Select editor (which uses 3rd party lib "multiple-select.js")
     */
    multipleSelect: MultipleSelectEditor,
    /**
     * Single Select editor (which uses 3rd party lib "multiple-select.js")
     */
    singleSelect: SingleSelectEditor,
    /**
     * Slider Editor
     */
    slider: SliderEditor,
    /**
     * Text Editor
     */
    text: TextEditor
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2VkaXRvcnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7QUFFMUMsTUFBTSxPQUFPLE9BQU8sR0FBRzs7OztJQUVyQixZQUFZLEVBQUUsa0JBQWtCOzs7O0lBR2hDLFFBQVEsRUFBRSxjQUFjOzs7O0lBR3hCLElBQUksRUFBRSxVQUFVOzs7O0lBR2hCLEtBQUssRUFBRSxXQUFXOzs7O0lBR2xCLE9BQU8sRUFBRSxhQUFhOzs7O0lBR3RCLFFBQVEsRUFBRSxjQUFjOzs7O0lBR3hCLGNBQWMsRUFBRSxvQkFBb0I7Ozs7SUFHcEMsWUFBWSxFQUFFLGtCQUFrQjs7OztJQUdoQyxNQUFNLEVBQUUsWUFBWTs7OztJQUdwQixJQUFJLEVBQUUsVUFBVTtDQUNqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF1dG9Db21wbGV0ZUVkaXRvciB9IGZyb20gJy4vYXV0b0NvbXBsZXRlRWRpdG9yJztcclxuaW1wb3J0IHsgQ2hlY2tib3hFZGl0b3IgfSBmcm9tICcuL2NoZWNrYm94RWRpdG9yJztcclxuaW1wb3J0IHsgRGF0ZUVkaXRvciB9IGZyb20gJy4vZGF0ZUVkaXRvcic7XHJcbmltcG9ydCB7IEZsb2F0RWRpdG9yIH0gZnJvbSAnLi9mbG9hdEVkaXRvcic7XHJcbmltcG9ydCB7IEludGVnZXJFZGl0b3IgfSBmcm9tICcuL2ludGVnZXJFZGl0b3InO1xyXG5pbXBvcnQgeyBMb25nVGV4dEVkaXRvciB9IGZyb20gJy4vbG9uZ1RleHRFZGl0b3InO1xyXG5pbXBvcnQgeyBNdWx0aXBsZVNlbGVjdEVkaXRvciB9IGZyb20gJy4vbXVsdGlwbGVTZWxlY3RFZGl0b3InO1xyXG5pbXBvcnQgeyBTaW5nbGVTZWxlY3RFZGl0b3IgfSBmcm9tICcuL3NpbmdsZVNlbGVjdEVkaXRvcic7XHJcbmltcG9ydCB7IFNsaWRlckVkaXRvciB9IGZyb20gJy4vc2xpZGVyRWRpdG9yJztcclxuaW1wb3J0IHsgVGV4dEVkaXRvciB9IGZyb20gJy4vdGV4dEVkaXRvcic7XHJcblxyXG5leHBvcnQgY29uc3QgRWRpdG9ycyA9IHtcclxuICAvKiogQXV0b0NvbXBsZXRlIEVkaXRvciAodXNpbmcgalF1ZXJ5IFVJIGF1dG9jb21wbGV0ZSBmZWF0dXJlKSAqL1xyXG4gIGF1dG9Db21wbGV0ZTogQXV0b0NvbXBsZXRlRWRpdG9yLFxyXG5cclxuICAvKiogQ2hlY2tib3ggRWRpdG9yICh1c2VzIG5hdGl2ZSBjaGVja2JveCBET00gZWxlbWVudCkgKi9cclxuICBjaGVja2JveDogQ2hlY2tib3hFZGl0b3IsXHJcblxyXG4gIC8qKiBEYXRlIFBpY2tlciBFZGl0b3IgKHdoaWNoIHVzZXMgM3JkIHBhcnR5IGxpYiBcImZsYXRwaWNrclwiKSAqL1xyXG4gIGRhdGU6IERhdGVFZGl0b3IsXHJcblxyXG4gIC8qKiBGbG9hdCBOdW1iZXIgRWRpdG9yICovXHJcbiAgZmxvYXQ6IEZsb2F0RWRpdG9yLFxyXG5cclxuICAvKiogSW50ZWdlciBFZGl0b3IgKi9cclxuICBpbnRlZ2VyOiBJbnRlZ2VyRWRpdG9yLFxyXG5cclxuICAvKiogTG9uZyBUZXh0IEVkaXRvciAodXNlcyBhIHRleHRhcmVhKSAqL1xyXG4gIGxvbmdUZXh0OiBMb25nVGV4dEVkaXRvcixcclxuXHJcbiAgLyoqIE11bHRpcGxlIFNlbGVjdCBlZGl0b3IgKHdoaWNoIHVzZXMgM3JkIHBhcnR5IGxpYiBcIm11bHRpcGxlLXNlbGVjdC5qc1wiKSAqL1xyXG4gIG11bHRpcGxlU2VsZWN0OiBNdWx0aXBsZVNlbGVjdEVkaXRvcixcclxuXHJcbiAgLyoqIFNpbmdsZSBTZWxlY3QgZWRpdG9yICh3aGljaCB1c2VzIDNyZCBwYXJ0eSBsaWIgXCJtdWx0aXBsZS1zZWxlY3QuanNcIikgKi9cclxuICBzaW5nbGVTZWxlY3Q6IFNpbmdsZVNlbGVjdEVkaXRvcixcclxuXHJcbiAgLyoqIFNsaWRlciBFZGl0b3IgKi9cclxuICBzbGlkZXI6IFNsaWRlckVkaXRvcixcclxuXHJcbiAgLyoqIFRleHQgRWRpdG9yICovXHJcbiAgdGV4dDogVGV4dEVkaXRvclxyXG59O1xyXG4iXX0=