/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const iconFormatter = (/**
 * @param {?} row
 * @param {?} cell
 * @param {?} value
 * @param {?} columnDef
 * @param {?} dataContext
 * @return {?}
 */
(row, cell, value, columnDef, dataContext) => {
    /** @type {?} */
    const columnParams = columnDef && columnDef.params || {};
    /** @type {?} */
    const icon = columnParams.icon || columnParams.formatterIcon;
    if (!icon) {
        throw new Error(`You must provide the "icon" or "formatterIcon" via the generic "params" options (e.g.: { formatter: Formatters.icon, params: { formatterIcon: 'fa fa-search' }}`);
    }
    return `<i class="${icon}" aria-hidden="true"></i>`;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbkZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9pY29uRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsTUFBTSxPQUFPLGFBQWE7Ozs7Ozs7O0FBQWMsQ0FBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFpQixFQUFFLFdBQWdCLEVBQUUsRUFBRTs7VUFDL0csWUFBWSxHQUFHLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUU7O1VBQ2xELElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxJQUFJLFlBQVksQ0FBQyxhQUFhO0lBRTVELElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxNQUFNLElBQUksS0FBSyxDQUFDLGlLQUFpSyxDQUFDLENBQUM7S0FDcEw7SUFDRCxPQUFPLGFBQWEsSUFBSSwyQkFBMkIsQ0FBQztBQUN0RCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4gfSBmcm9tICcuLy4uL21vZGVscy9jb2x1bW4uaW50ZXJmYWNlJztcbmltcG9ydCB7IEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2Zvcm1hdHRlci5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY29uc3QgaWNvbkZvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIHZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55KSA9PiB7XG4gIGNvbnN0IGNvbHVtblBhcmFtcyA9IGNvbHVtbkRlZiAmJiBjb2x1bW5EZWYucGFyYW1zIHx8IHt9O1xuICBjb25zdCBpY29uID0gY29sdW1uUGFyYW1zLmljb24gfHwgY29sdW1uUGFyYW1zLmZvcm1hdHRlckljb247XG5cbiAgaWYgKCFpY29uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBZb3UgbXVzdCBwcm92aWRlIHRoZSBcImljb25cIiBvciBcImZvcm1hdHRlckljb25cIiB2aWEgdGhlIGdlbmVyaWMgXCJwYXJhbXNcIiBvcHRpb25zIChlLmcuOiB7IGZvcm1hdHRlcjogRm9ybWF0dGVycy5pY29uLCBwYXJhbXM6IHsgZm9ybWF0dGVySWNvbjogJ2ZhIGZhLXNlYXJjaCcgfX1gKTtcbiAgfVxuICByZXR1cm4gYDxpIGNsYXNzPVwiJHtpY29ufVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5gO1xufTtcbiJdfQ==