/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const percentCompleteBarFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} value
 * @param {?} columnDef
 * @param {?} dataContext
 * @return {?}
 */
(row, cell, value, columnDef, dataContext) => {
    /** @type {?} */
    const isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
    if (!isNumber) {
        return '';
    }
    /** @type {?} */
    let color = '';
    /** @type {?} */
    let inputNumber = parseFloat(value);
    if (inputNumber > 100) {
        inputNumber = 100;
    }
    if (inputNumber < 30) {
        color = 'red';
    }
    else if (inputNumber < 70) {
        color = 'silver';
    }
    else {
        color = 'green';
    }
    return `<span class="percent-complete-bar" style="background:${color}; width:${inputNumber}%"></span>`;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyY2VudENvbXBsZXRlQmFyRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL3BlcmNlbnRDb21wbGV0ZUJhckZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE1BQU0sT0FBTywyQkFBMkI7Ozs7Ozs7O0FBQWMsQ0FBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFpQixFQUFFLFdBQWdCLEVBQVUsRUFBRTs7VUFDckksUUFBUSxHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNqRyxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2IsT0FBTyxFQUFFLENBQUM7S0FDWDs7UUFFRyxLQUFLLEdBQUcsRUFBRTs7UUFDVixXQUFXLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUNuQyxJQUFJLFdBQVcsR0FBRyxHQUFHLEVBQUU7UUFDckIsV0FBVyxHQUFHLEdBQUcsQ0FBQztLQUNuQjtJQUVELElBQUksV0FBVyxHQUFHLEVBQUUsRUFBRTtRQUNwQixLQUFLLEdBQUcsS0FBSyxDQUFDO0tBQ2Y7U0FBTSxJQUFJLFdBQVcsR0FBRyxFQUFFLEVBQUU7UUFDM0IsS0FBSyxHQUFHLFFBQVEsQ0FBQztLQUNsQjtTQUFNO1FBQ0wsS0FBSyxHQUFHLE9BQU8sQ0FBQztLQUNqQjtJQUVELE9BQU8sd0RBQXdELEtBQUssV0FBVyxXQUFXLFlBQVksQ0FBQztBQUN6RyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4sIEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcblxuZXhwb3J0IGNvbnN0IHBlcmNlbnRDb21wbGV0ZUJhckZvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIHZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55KTogc3RyaW5nID0+IHtcbiAgY29uc3QgaXNOdW1iZXIgPSAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gJycpID8gZmFsc2UgOiAhaXNOYU4oK3ZhbHVlKTtcbiAgaWYgKCFpc051bWJlcikge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGxldCBjb2xvciA9ICcnO1xuICBsZXQgaW5wdXROdW1iZXIgPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgaWYgKGlucHV0TnVtYmVyID4gMTAwKSB7XG4gICAgaW5wdXROdW1iZXIgPSAxMDA7XG4gIH1cblxuICBpZiAoaW5wdXROdW1iZXIgPCAzMCkge1xuICAgIGNvbG9yID0gJ3JlZCc7XG4gIH0gZWxzZSBpZiAoaW5wdXROdW1iZXIgPCA3MCkge1xuICAgIGNvbG9yID0gJ3NpbHZlcic7XG4gIH0gZWxzZSB7XG4gICAgY29sb3IgPSAnZ3JlZW4nO1xuICB9XG5cbiAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cInBlcmNlbnQtY29tcGxldGUtYmFyXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiR7Y29sb3J9OyB3aWR0aDoke2lucHV0TnVtYmVyfSVcIj48L3NwYW4+YDtcbn07XG4iXX0=