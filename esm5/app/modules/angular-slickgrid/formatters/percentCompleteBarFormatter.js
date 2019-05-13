/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var percentCompleteBarFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} value
 * @param {?} columnDef
 * @param {?} dataContext
 * @return {?}
 */
function (row, cell, value, columnDef, dataContext) {
    /** @type {?} */
    var isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
    if (!isNumber) {
        return '';
    }
    /** @type {?} */
    var color = '';
    /** @type {?} */
    var inputNumber = parseFloat(value);
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
    return "<span class=\"percent-complete-bar\" style=\"background:" + color + "; width:" + inputNumber + "%\"></span>";
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyY2VudENvbXBsZXRlQmFyRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL3BlcmNlbnRDb21wbGV0ZUJhckZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE1BQU0sS0FBTywyQkFBMkI7Ozs7Ozs7O0FBQWMsVUFBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFpQixFQUFFLFdBQWdCOztRQUN6SCxRQUFRLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2pHLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixPQUFPLEVBQUUsQ0FBQztLQUNYOztRQUVHLEtBQUssR0FBRyxFQUFFOztRQUNWLFdBQVcsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQ25DLElBQUksV0FBVyxHQUFHLEdBQUcsRUFBRTtRQUNyQixXQUFXLEdBQUcsR0FBRyxDQUFDO0tBQ25CO0lBRUQsSUFBSSxXQUFXLEdBQUcsRUFBRSxFQUFFO1FBQ3BCLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDZjtTQUFNLElBQUksV0FBVyxHQUFHLEVBQUUsRUFBRTtRQUMzQixLQUFLLEdBQUcsUUFBUSxDQUFDO0tBQ2xCO1NBQU07UUFDTCxLQUFLLEdBQUcsT0FBTyxDQUFDO0tBQ2pCO0lBRUQsT0FBTyw2REFBd0QsS0FBSyxnQkFBVyxXQUFXLGdCQUFZLENBQUM7QUFDekcsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5cbmV4cG9ydCBjb25zdCBwZXJjZW50Q29tcGxldGVCYXJGb3JtYXR0ZXI6IEZvcm1hdHRlciA9IChyb3c6IG51bWJlciwgY2VsbDogbnVtYmVyLCB2YWx1ZTogYW55LCBjb2x1bW5EZWY6IENvbHVtbiwgZGF0YUNvbnRleHQ6IGFueSk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGlzTnVtYmVyID0gKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09ICcnKSA/IGZhbHNlIDogIWlzTmFOKCt2YWx1ZSk7XG4gIGlmICghaXNOdW1iZXIpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBsZXQgY29sb3IgPSAnJztcbiAgbGV0IGlucHV0TnVtYmVyID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gIGlmIChpbnB1dE51bWJlciA+IDEwMCkge1xuICAgIGlucHV0TnVtYmVyID0gMTAwO1xuICB9XG5cbiAgaWYgKGlucHV0TnVtYmVyIDwgMzApIHtcbiAgICBjb2xvciA9ICdyZWQnO1xuICB9IGVsc2UgaWYgKGlucHV0TnVtYmVyIDwgNzApIHtcbiAgICBjb2xvciA9ICdzaWx2ZXInO1xuICB9IGVsc2Uge1xuICAgIGNvbG9yID0gJ2dyZWVuJztcbiAgfVxuXG4gIHJldHVybiBgPHNwYW4gY2xhc3M9XCJwZXJjZW50LWNvbXBsZXRlLWJhclwiIHN0eWxlPVwiYmFja2dyb3VuZDoke2NvbG9yfTsgd2lkdGg6JHtpbnB1dE51bWJlcn0lXCI+PC9zcGFuPmA7XG59O1xuIl19