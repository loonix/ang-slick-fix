/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class GridEventService {
    constructor() {
        this._eventHandler = new Slick.EventHandler();
    }
    /* OnCellChange Event */
    /**
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    attachOnCellChange(grid, dataView) {
        // subscribe to this Slickgrid event of onCellChange
        this._eventHandler.subscribe(grid.onCellChange, (/**
         * @param {?} e
         * @param {?} args
         * @return {?}
         */
        (e, args) => {
            if (!e || !args || !grid || args.cell === undefined || !grid.getColumns || !grid.getDataItem) {
                return;
            }
            /** @type {?} */
            const column = grid.getColumns()[args.cell];
            // if the column definition has a onCellChange property (a callback function), then run it
            if (typeof column.onCellChange === 'function') {
                // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onCellChange
                /** @type {?} */
                const returnedArgs = {
                    row: args.row,
                    cell: args.cell,
                    dataView,
                    gridDefinition: grid.getOptions(),
                    grid,
                    columnDef: column,
                    dataContext: grid.getDataItem(args.row)
                };
                // finally call up the Slick.column.onCellChanges.... function
                column.onCellChange(e, returnedArgs);
            }
        }));
    }
    /* OnClick Event */
    /**
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    attachOnClick(grid, dataView) {
        this._eventHandler.subscribe(grid.onClick, (/**
         * @param {?} e
         * @param {?} args
         * @return {?}
         */
        (e, args) => {
            if (!e || !args || !grid || args.cell === undefined || !grid.getColumns || !grid.getDataItem) {
                return;
            }
            /** @type {?} */
            const column = grid.getColumns()[args.cell];
            /** @type {?} */
            const gridOptions = grid.getOptions();
            // only when using autoCommitEdit, we will make the cell active (in focus) when clicked
            // setting the cell as active as a side effect and if autoCommitEdit is set to false then the Editors won't save correctly
            if (gridOptions && gridOptions.enableCellNavigation && !gridOptions.editable || (gridOptions.editable && gridOptions.autoCommitEdit)) {
                grid.setActiveCell(args.row, args.cell);
            }
            // if the column definition has a onCellClick property (a callback function), then run it
            if (typeof column.onCellClick === 'function') {
                // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onClick
                /** @type {?} */
                const returnedArgs = {
                    row: args.row,
                    cell: args.cell,
                    dataView,
                    gridDefinition: grid.getOptions(),
                    grid,
                    columnDef: column,
                    dataContext: grid.getDataItem(args.row)
                };
                // finally call up the Slick.column.onCellClick.... function
                column.onCellClick(e, returnedArgs);
            }
        }));
    }
    /**
     * @return {?}
     */
    dispose() {
        this._eventHandler.unsubscribeAll();
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    GridEventService.prototype._eventHandler;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZEV2ZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2dyaWRFdmVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFLQSxNQUFNLE9BQU8sZ0JBQWdCO0lBQTdCO1FBQ1Usa0JBQWEsR0FBUSxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQWtFeEQsQ0FBQzs7Ozs7OztJQS9EQyxrQkFBa0IsQ0FBQyxJQUFTLEVBQUUsUUFBYTtRQUN6QyxvREFBb0Q7UUFDcEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVk7Ozs7O1FBQUUsQ0FBQyxDQUFRLEVBQUUsSUFBYyxFQUFFLEVBQUU7WUFDM0UsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUM1RixPQUFPO2FBQ1I7O2tCQUNLLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUUzQywwRkFBMEY7WUFDMUYsSUFBSSxPQUFPLE1BQU0sQ0FBQyxZQUFZLEtBQUssVUFBVSxFQUFFOzs7c0JBRXZDLFlBQVksR0FBZ0I7b0JBQ2hDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztvQkFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsUUFBUTtvQkFDUixjQUFjLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTtvQkFDakMsSUFBSTtvQkFDSixTQUFTLEVBQUUsTUFBTTtvQkFDakIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDeEM7Z0JBRUQsOERBQThEO2dCQUM5RCxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQzthQUN0QztRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7OztJQUVELGFBQWEsQ0FBQyxJQUFTLEVBQUUsUUFBYTtRQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTzs7Ozs7UUFBRSxDQUFDLENBQVEsRUFBRSxJQUFjLEVBQUUsRUFBRTtZQUN0RSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQzVGLE9BQU87YUFDUjs7a0JBQ0ssTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOztrQkFDckMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFFckMsdUZBQXVGO1lBQ3ZGLDBIQUEwSDtZQUMxSCxJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsb0JBQW9CLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsSUFBSSxXQUFXLENBQUMsY0FBYyxDQUFDLEVBQUU7Z0JBQ3BJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDekM7WUFFRCx5RkFBeUY7WUFDekYsSUFBSSxPQUFPLE1BQU0sQ0FBQyxXQUFXLEtBQUssVUFBVSxFQUFFOzs7c0JBRXRDLFlBQVksR0FBZ0I7b0JBQ2hDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztvQkFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsUUFBUTtvQkFDUixjQUFjLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTtvQkFDakMsSUFBSTtvQkFDSixTQUFTLEVBQUUsTUFBTTtvQkFDakIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDeEM7Z0JBRUQsNERBQTREO2dCQUM1RCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQzthQUNyQztRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3RDLENBQUM7Q0FDRjs7Ozs7O0lBbEVDLHlDQUFzRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9uRXZlbnRBcmdzLCBDZWxsQXJncywgR3JpZE9wdGlvbiB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBHcmlkRXZlbnRTZXJ2aWNlIHtcclxuICBwcml2YXRlIF9ldmVudEhhbmRsZXI6IGFueSA9IG5ldyBTbGljay5FdmVudEhhbmRsZXIoKTtcclxuXHJcbiAgLyogT25DZWxsQ2hhbmdlIEV2ZW50ICovXHJcbiAgYXR0YWNoT25DZWxsQ2hhbmdlKGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSkge1xyXG4gICAgLy8gc3Vic2NyaWJlIHRvIHRoaXMgU2xpY2tncmlkIGV2ZW50IG9mIG9uQ2VsbENoYW5nZVxyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShncmlkLm9uQ2VsbENoYW5nZSwgKGU6IEV2ZW50LCBhcmdzOiBDZWxsQXJncykgPT4ge1xyXG4gICAgICBpZiAoIWUgfHwgIWFyZ3MgfHwgIWdyaWQgfHwgYXJncy5jZWxsID09PSB1bmRlZmluZWQgfHwgIWdyaWQuZ2V0Q29sdW1ucyB8fCAhZ3JpZC5nZXREYXRhSXRlbSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBjb2x1bW4gPSBncmlkLmdldENvbHVtbnMoKVthcmdzLmNlbGxdO1xyXG5cclxuICAgICAgLy8gaWYgdGhlIGNvbHVtbiBkZWZpbml0aW9uIGhhcyBhIG9uQ2VsbENoYW5nZSBwcm9wZXJ0eSAoYSBjYWxsYmFjayBmdW5jdGlvbiksIHRoZW4gcnVuIGl0XHJcbiAgICAgIGlmICh0eXBlb2YgY29sdW1uLm9uQ2VsbENoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIC8vIGFkZCB0byB0aGUgb3V0cHV0IGdyaWRPcHRpb25zICYgZGF0YVZpZXcgc2luY2Ugd2UnbGwgbmVlZCB0aGVtIGluc2lkZSB0aGUgQUpBWCBjb2x1bW4ub25DZWxsQ2hhbmdlXHJcbiAgICAgICAgY29uc3QgcmV0dXJuZWRBcmdzOiBPbkV2ZW50QXJncyA9IHtcclxuICAgICAgICAgIHJvdzogYXJncy5yb3csXHJcbiAgICAgICAgICBjZWxsOiBhcmdzLmNlbGwsXHJcbiAgICAgICAgICBkYXRhVmlldyxcclxuICAgICAgICAgIGdyaWREZWZpbml0aW9uOiBncmlkLmdldE9wdGlvbnMoKSxcclxuICAgICAgICAgIGdyaWQsXHJcbiAgICAgICAgICBjb2x1bW5EZWY6IGNvbHVtbixcclxuICAgICAgICAgIGRhdGFDb250ZXh0OiBncmlkLmdldERhdGFJdGVtKGFyZ3Mucm93KVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIGZpbmFsbHkgY2FsbCB1cCB0aGUgU2xpY2suY29sdW1uLm9uQ2VsbENoYW5nZXMuLi4uIGZ1bmN0aW9uXHJcbiAgICAgICAgY29sdW1uLm9uQ2VsbENoYW5nZShlLCByZXR1cm5lZEFyZ3MpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgLyogT25DbGljayBFdmVudCAqL1xyXG4gIGF0dGFjaE9uQ2xpY2soZ3JpZDogYW55LCBkYXRhVmlldzogYW55KSB7XHJcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKGdyaWQub25DbGljaywgKGU6IEV2ZW50LCBhcmdzOiBDZWxsQXJncykgPT4ge1xyXG4gICAgICBpZiAoIWUgfHwgIWFyZ3MgfHwgIWdyaWQgfHwgYXJncy5jZWxsID09PSB1bmRlZmluZWQgfHwgIWdyaWQuZ2V0Q29sdW1ucyB8fCAhZ3JpZC5nZXREYXRhSXRlbSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBjb2x1bW4gPSBncmlkLmdldENvbHVtbnMoKVthcmdzLmNlbGxdO1xyXG4gICAgICBjb25zdCBncmlkT3B0aW9ucyA9IGdyaWQuZ2V0T3B0aW9ucygpO1xyXG5cclxuICAgICAgLy8gb25seSB3aGVuIHVzaW5nIGF1dG9Db21taXRFZGl0LCB3ZSB3aWxsIG1ha2UgdGhlIGNlbGwgYWN0aXZlIChpbiBmb2N1cykgd2hlbiBjbGlja2VkXHJcbiAgICAgIC8vIHNldHRpbmcgdGhlIGNlbGwgYXMgYWN0aXZlIGFzIGEgc2lkZSBlZmZlY3QgYW5kIGlmIGF1dG9Db21taXRFZGl0IGlzIHNldCB0byBmYWxzZSB0aGVuIHRoZSBFZGl0b3JzIHdvbid0IHNhdmUgY29ycmVjdGx5XHJcbiAgICAgIGlmIChncmlkT3B0aW9ucyAmJiBncmlkT3B0aW9ucy5lbmFibGVDZWxsTmF2aWdhdGlvbiAmJiAhZ3JpZE9wdGlvbnMuZWRpdGFibGUgfHwgKGdyaWRPcHRpb25zLmVkaXRhYmxlICYmIGdyaWRPcHRpb25zLmF1dG9Db21taXRFZGl0KSkge1xyXG4gICAgICAgIGdyaWQuc2V0QWN0aXZlQ2VsbChhcmdzLnJvdywgYXJncy5jZWxsKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaWYgdGhlIGNvbHVtbiBkZWZpbml0aW9uIGhhcyBhIG9uQ2VsbENsaWNrIHByb3BlcnR5IChhIGNhbGxiYWNrIGZ1bmN0aW9uKSwgdGhlbiBydW4gaXRcclxuICAgICAgaWYgKHR5cGVvZiBjb2x1bW4ub25DZWxsQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAvLyBhZGQgdG8gdGhlIG91dHB1dCBncmlkT3B0aW9ucyAmIGRhdGFWaWV3IHNpbmNlIHdlJ2xsIG5lZWQgdGhlbSBpbnNpZGUgdGhlIEFKQVggY29sdW1uLm9uQ2xpY2tcclxuICAgICAgICBjb25zdCByZXR1cm5lZEFyZ3M6IE9uRXZlbnRBcmdzID0ge1xyXG4gICAgICAgICAgcm93OiBhcmdzLnJvdyxcclxuICAgICAgICAgIGNlbGw6IGFyZ3MuY2VsbCxcclxuICAgICAgICAgIGRhdGFWaWV3LFxyXG4gICAgICAgICAgZ3JpZERlZmluaXRpb246IGdyaWQuZ2V0T3B0aW9ucygpLFxyXG4gICAgICAgICAgZ3JpZCxcclxuICAgICAgICAgIGNvbHVtbkRlZjogY29sdW1uLFxyXG4gICAgICAgICAgZGF0YUNvbnRleHQ6IGdyaWQuZ2V0RGF0YUl0ZW0oYXJncy5yb3cpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gZmluYWxseSBjYWxsIHVwIHRoZSBTbGljay5jb2x1bW4ub25DZWxsQ2xpY2suLi4uIGZ1bmN0aW9uXHJcbiAgICAgICAgY29sdW1uLm9uQ2VsbENsaWNrKGUsIHJldHVybmVkQXJncyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCgpO1xyXG4gIH1cclxufVxyXG4iXX0=