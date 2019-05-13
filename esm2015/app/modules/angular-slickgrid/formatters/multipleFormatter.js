/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const multipleFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} value
 * @param {?} columnDef
 * @param {?} dataContext
 * @param {?} grid
 * @return {?}
 */
(row, cell, value, columnDef, dataContext, grid) => {
    /** @type {?} */
    const params = columnDef.params || {};
    if (!params.formatters || !Array.isArray(params.formatters)) {
        throw new Error(`The multiple formatter requires the "formatters" to be provided as a column params.
    For example: this.columnDefinitions = [{ id: title, field: title, formatter: Formatters.multiple, params: { formatters: [Formatters.lowercase, Formatters.uppercase] }`);
    }
    /** @type {?} */
    const formatters = params.formatters;
    // loop through all Formatters, the value of 1st formatter will be used by 2nd formatter and so on.
    // they are piped and executed in sequences
    /** @type {?} */
    let currentValue = value;
    for (const formatter of formatters) {
        currentValue = formatter(row, cell, currentValue, columnDef, dataContext, grid);
    }
    return currentValue;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwbGVGb3JtYXR0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2Zvcm1hdHRlcnMvbXVsdGlwbGVGb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxNQUFNLE9BQU8saUJBQWlCOzs7Ozs7Ozs7QUFBYyxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsV0FBZ0IsRUFBRSxJQUFTLEVBQUUsRUFBRTs7VUFDOUgsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRTtJQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzNELE1BQU0sSUFBSSxLQUFLLENBQUM7MktBQ3VKLENBQUMsQ0FBQztLQUMxSzs7VUFDSyxVQUFVLEdBQWdCLE1BQU0sQ0FBQyxVQUFVOzs7O1FBSTdDLFlBQVksR0FBRyxLQUFLO0lBQ3hCLEtBQUssTUFBTSxTQUFTLElBQUksVUFBVSxFQUFFO1FBQ2xDLFlBQVksR0FBRyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNqRjtJQUNELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgRm9ybWF0dGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuZXhwb3J0IGNvbnN0IG11bHRpcGxlRm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnksIGdyaWQ6IGFueSkgPT4ge1xyXG4gIGNvbnN0IHBhcmFtcyA9IGNvbHVtbkRlZi5wYXJhbXMgfHwge307XHJcbiAgaWYgKCFwYXJhbXMuZm9ybWF0dGVycyB8fCAhQXJyYXkuaXNBcnJheShwYXJhbXMuZm9ybWF0dGVycykpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgVGhlIG11bHRpcGxlIGZvcm1hdHRlciByZXF1aXJlcyB0aGUgXCJmb3JtYXR0ZXJzXCIgdG8gYmUgcHJvdmlkZWQgYXMgYSBjb2x1bW4gcGFyYW1zLlxyXG4gICAgRm9yIGV4YW1wbGU6IHRoaXMuY29sdW1uRGVmaW5pdGlvbnMgPSBbeyBpZDogdGl0bGUsIGZpZWxkOiB0aXRsZSwgZm9ybWF0dGVyOiBGb3JtYXR0ZXJzLm11bHRpcGxlLCBwYXJhbXM6IHsgZm9ybWF0dGVyczogW0Zvcm1hdHRlcnMubG93ZXJjYXNlLCBGb3JtYXR0ZXJzLnVwcGVyY2FzZV0gfWApO1xyXG4gIH1cclxuICBjb25zdCBmb3JtYXR0ZXJzOiBGb3JtYXR0ZXJbXSA9IHBhcmFtcy5mb3JtYXR0ZXJzO1xyXG5cclxuICAvLyBsb29wIHRocm91Z2ggYWxsIEZvcm1hdHRlcnMsIHRoZSB2YWx1ZSBvZiAxc3QgZm9ybWF0dGVyIHdpbGwgYmUgdXNlZCBieSAybmQgZm9ybWF0dGVyIGFuZCBzbyBvbi5cclxuICAvLyB0aGV5IGFyZSBwaXBlZCBhbmQgZXhlY3V0ZWQgaW4gc2VxdWVuY2VzXHJcbiAgbGV0IGN1cnJlbnRWYWx1ZSA9IHZhbHVlO1xyXG4gIGZvciAoY29uc3QgZm9ybWF0dGVyIG9mIGZvcm1hdHRlcnMpIHtcclxuICAgIGN1cnJlbnRWYWx1ZSA9IGZvcm1hdHRlcihyb3csIGNlbGwsIGN1cnJlbnRWYWx1ZSwgY29sdW1uRGVmLCBkYXRhQ29udGV4dCwgZ3JpZCk7XHJcbiAgfVxyXG4gIHJldHVybiBjdXJyZW50VmFsdWU7XHJcbn07XHJcbiJdfQ==