/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { arrayObjectToCsvFormatter } from './arrayObjectToCsvFormatter';
import { arrayToCsvFormatter } from './arrayToCsvFormatter';
import { boldFormatter } from './boldFormatter';
import { checkboxFormatter } from './checkboxFormatter';
import { checkmarkFormatter } from './checkmarkFormatter';
import { collectionFormatter } from './collectionFormatter';
import { collectionEditorFormatter } from './collectionEditorFormatter';
import { complexObjectFormatter } from './complexObjectFormatter';
import { dateIsoFormatter } from './dateIsoFormatter';
import { dateTimeIsoFormatter } from './dateTimeIsoFormatter';
import { dateTimeIsoAmPmFormatter } from './dateTimeIsoAmPmFormatter';
import { dateTimeUsAmPmFormatter } from './dateTimeUsAmPmFormatter';
import { dateTimeUsFormatter } from './dateTimeUsFormatter';
import { dateTimeShortIsoFormatter } from './dateTimeShortIsoFormatter';
import { dateTimeShortUsFormatter } from './dateTimeShortUsFormatter';
import { dateUsFormatter } from './dateUsFormatter';
import { decimalFormatter } from './decimalFormatter';
import { deleteIconFormatter } from './deleteIconFormatter';
import { dollarColoredBoldFormatter } from './dollarColoredBoldFormatter';
import { dollarColoredFormatter } from './dollarColoredFormatter';
import { dollarFormatter } from './dollarFormatter';
import { editIconFormatter } from './editIconFormatter';
import { hyperlinkFormatter } from './hyperlinkFormatter';
import { iconFormatter } from './iconFormatter';
import { infoIconFormatter } from './infoIconFormatter';
import { italicFormatter } from './italicFormatter';
import { lowercaseFormatter } from './lowercaseFormatter';
import { maskFormatter } from './maskFormatter';
import { multipleFormatter } from './multipleFormatter';
import { percentFormatter } from './percentFormatter';
import { percentCompleteBarFormatter } from './percentCompleteBarFormatter';
import { percentCompleteFormatter } from './percentCompleteFormatter';
import { percentSymbolFormatter } from './percentSymbolFormatter';
import { progressBarFormatter } from './progressBarFormatter';
import { translateFormatter } from './translateFormatter';
import { translateBooleanFormatter } from './translateBooleanFormatter';
import { uppercaseFormatter } from './uppercaseFormatter';
import { yesNoFormatter } from './yesNoFormatter';
/**
 * Provides a list of different Formatters that will change the cell value displayed in the UI
 * @type {?}
 */
export var Formatters = {
    /**
     * Takes an array of complex objects converts it to a comma delimited string.
     * Requires to pass an array of "propertyNames" in the column definition the generic "params" property
     * For example, if we have an array of user objects that have the property of firstName & lastName then we need to pass in your column definition::
     * { params: { propertyNames: ['firtName'] }}
     */
    arrayObjectToCsv: arrayObjectToCsvFormatter,
    /**
     * Takes an array of string and converts it to a comma delimited string
     */
    arrayToCsv: arrayToCsvFormatter,
    /**
     * show value in bold font weight
     */
    bold: boldFormatter,
    /**
     * When value is filled (true), it will display a checkbox Unicode icon
     */
    checkbox: checkboxFormatter,
    /**
     * When value is filled (true), it will display a Font-Awesome icon (fa-check)
     */
    checkmark: checkmarkFormatter,
    /**
     * Takes a complex data object and return the data under that property (for example: "user.firstName" will return the first name "John")
     * You can pass the complex structure in the "field" or the "params: { complexField: string }" properties.
     * For example::
     * this.columnDefs = [{ id: 'username', field: 'user.firstName', ... }]
     * OR this.columnDefs = [{ id: 'username', field: 'user', params: { complexField: 'user.firstName' }, ... }]
     */
    complexObject: complexObjectFormatter,
    /**
     * Looks up values from the columnDefinition.params.collection property and displays the label in CSV or string format
     * \@example
     * // the grid will display 'foo' and 'bar' and not 1 and 2 from your dataset
     * { params: { collection: [{ value: 1, label: 'foo'}, {value: 2, label: 'bar' }] }}
     * const dataset = [1, 2];
     */
    collection: collectionFormatter,
    /**
     * Roughly the same as the "collectionFormatter" except that it
     * looks up values from the columnDefinition.editor.collection (instead of params) property and displays the label in CSV or string format
     * \@example
     * // the grid will display 'foo' and 'bar' and not 1 and 2 from your dataset
     * { editor: { collection: [{ value: 1, label: 'foo'}, {value: 2, label: 'bar' }] }}
     * const dataset = [1, 2];
     */
    collectionEditor: collectionEditorFormatter,
    /**
     * Takes a Date object and displays it as an ISO Date format
     */
    dateIso: dateIsoFormatter,
    /**
     * Takes a Date object and displays it as an ISO Date+Time format
     */
    dateTimeIso: dateTimeIsoFormatter,
    /**
     * Takes a Date object and displays it as an ISO Date+Time (without seconds) format
     */
    dateTimeShortIso: dateTimeShortIsoFormatter,
    /**
     * Takes a Date object and displays it as an ISO Date+Time+(am/pm) format
     */
    dateTimeIsoAmPm: dateTimeIsoAmPmFormatter,
    /**
     * Takes a Date object and displays it as an US Date format
     */
    dateUs: dateUsFormatter,
    /**
     * Takes a Date object and displays it as an US Date+Time format
     */
    dateTimeUs: dateTimeUsFormatter,
    /**
     * Takes a Date object and displays it as an US Date+Time (without seconds) format
     */
    dateTimeShortUs: dateTimeShortUsFormatter,
    /**
     * Takes a Date object and displays it as an US Date+Time+(am/pm) format
     */
    dateTimeUsAmPm: dateTimeUsAmPmFormatter,
    /**
     * Displays a Font-Awesome delete icon (fa-trash)
     */
    deleteIcon: deleteIconFormatter,
    /**
     * Display the value as x decimals formatted, defaults to 2 decimals.
     * You can pass "decimalPlaces" or "minDecimalPlaces" and/or "maxDecimalPlaces" to the "params" property.
     * For example:: `{ formatter: Formatters.decimal, params: { decimalPlaces: 3 }}`
     * The property "decimalPlaces" is an alias of "minDecimalPlaces"
     */
    decimal: decimalFormatter,
    /**
     * Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value
     */
    dollar: dollarFormatter,
    /**
     * Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value, change color of text to red/green on negative/positive value
     */
    dollarColored: dollarColoredFormatter,
    /**
     * Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value, change color of text to red/green on negative/positive value, show it in bold font weight as well
     */
    dollarColoredBold: dollarColoredBoldFormatter,
    /**
     * Displays a Font-Awesome edit icon (fa-pencil)
     */
    editIcon: editIconFormatter,
    /**
     * Takes an hyperlink cell value and transforms it into a real hyperlink, given that the value starts with 1 of these (http|ftp|https).
     * The structure will be "<a href="hyperlink">hyperlink</a>"
     * You can optionally change the hyperlink text displayed by using the generic params "hyperlinkText" in the column definition
     * For example: { id: 'link', field: 'link', params: { hyperlinkText: 'Company Website' } } will display "<a href="link">Company Website</a>"
     */
    hyperlink: hyperlinkFormatter,
    /**
     * Display whichever icon you want (library agnostic, it could be Font-Awesome or any other)
     */
    icon: iconFormatter,
    /**
     * Displays a Font-Awesome edit icon (fa-info-circle)
     */
    infoIcon: infoIconFormatter,
    /**
     * show input text value as italic text
     */
    italic: italicFormatter,
    /**
     * Takes a value and displays it all lowercase
     */
    lowercase: lowercaseFormatter,
    /**
     * Takes a value display it according to a mask provided
     * e.: 1234567890 with mask "(000) 000-0000" will display "(123) 456-7890"
     */
    mask: maskFormatter,
    /**
     * You can pipe multiple formatters (executed in sequence), use params to pass the list of formatters.
     * Requires to pass an array of "formatters" in the column definition the generic "params" property
     * For example::
     * { field: 'title', formatter: Formatters.multiple, params: { formatters: [ Formatters.lowercase, Formatters.uppercase ] }
     */
    multiple: multipleFormatter,
    /**
     * Takes a cell value number (between 0.0-1.0) and displays a red (<50) or green (>=50) bar
     */
    percent: percentFormatter,
    /**
     * Takes a cell value number (between 0.0-100) and displays a red (<50) or green (>=50) bar
     */
    percentComplete: percentCompleteFormatter,
    /**
     * Takes a cell value number (between 0-100) and displays Bootstrap "percent-complete-bar" a red (<30), silver (>30 & <70) or green (>=70) bar
     */
    percentCompleteBar: percentCompleteBarFormatter,
    /**
     * Takes a cell value number (between 0-100) and add the "%" after the number
     */
    percentSymbol: percentSymbolFormatter,
    /**
     * Takes a cell value number (between 0-100) and displays Bootstrap "progress-bar" a red (<30), silver (>30 & <70) or green (>=70) bar
     */
    progressBar: progressBarFormatter,
    /**
     * Takes a cell value and translates it (i18n). Requires an instance of the Translate Service:: `i18n: this.translate
     */
    translate: translateFormatter,
    /**
     * Takes a boolean value, cast it to upperCase string and finally translates it (i18n).
     */
    translateBoolean: translateBooleanFormatter,
    /**
     * Takes a value and displays it all uppercase
     */
    uppercase: uppercaseFormatter,
    /**
     * Takes a boolean value and display a string 'Yes' or 'No'
     */
    yesNo: yesNoFormatter
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2Zvcm1hdHRlcnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixF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ZSxFQUFFLHdCQUF3Qjs7OztJQUd6QyxrQkFBa0IsRUFBRSwyQkFBMkI7Ozs7SUFHL0MsYUFBYSxFQUFFLHNCQUFzQjs7OztJQUdyQyxXQUFXLEVBQUUsb0JBQW9COzs7O0lBR2pDLFNBQVMsRUFBRSxrQkFBa0I7Ozs7SUFHN0IsZ0JBQWdCLEVBQUUseUJBQXlCOzs7O0lBRzNDLFNBQVMsRUFBRSxrQkFBa0I7Ozs7SUFHN0IsS0FBSyxFQUFFLGNBQWM7Q0FDdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhcnJheU9iamVjdFRvQ3N2Rm9ybWF0dGVyIH0gZnJvbSAnLi9hcnJheU9iamVjdFRvQ3N2Rm9ybWF0dGVyJztcclxuaW1wb3J0IHsgYXJyYXlUb0NzdkZvcm1hdHRlciB9IGZyb20gJy4vYXJyYXlUb0NzdkZvcm1hdHRlcic7XHJcbmltcG9ydCB7IGJvbGRGb3JtYXR0ZXIgfSBmcm9tICcuL2JvbGRGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBjaGVja2JveEZvcm1hdHRlciB9IGZyb20gJy4vY2hlY2tib3hGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBjaGVja21hcmtGb3JtYXR0ZXIgfSBmcm9tICcuL2NoZWNrbWFya0Zvcm1hdHRlcic7XHJcbmltcG9ydCB7IGNvbGxlY3Rpb25Gb3JtYXR0ZXIgfSBmcm9tICcuL2NvbGxlY3Rpb25Gb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBjb2xsZWN0aW9uRWRpdG9yRm9ybWF0dGVyIH0gZnJvbSAnLi9jb2xsZWN0aW9uRWRpdG9yRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgY29tcGxleE9iamVjdEZvcm1hdHRlciB9IGZyb20gJy4vY29tcGxleE9iamVjdEZvcm1hdHRlcic7XHJcbmltcG9ydCB7IGRhdGVJc29Gb3JtYXR0ZXIgfSBmcm9tICcuL2RhdGVJc29Gb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBkYXRlVGltZUlzb0Zvcm1hdHRlciB9IGZyb20gJy4vZGF0ZVRpbWVJc29Gb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBkYXRlVGltZUlzb0FtUG1Gb3JtYXR0ZXIgfSBmcm9tICcuL2RhdGVUaW1lSXNvQW1QbUZvcm1hdHRlcic7XHJcbmltcG9ydCB7IGRhdGVUaW1lVXNBbVBtRm9ybWF0dGVyIH0gZnJvbSAnLi9kYXRlVGltZVVzQW1QbUZvcm1hdHRlcic7XHJcbmltcG9ydCB7IGRhdGVUaW1lVXNGb3JtYXR0ZXIgfSBmcm9tICcuL2RhdGVUaW1lVXNGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBkYXRlVGltZVNob3J0SXNvRm9ybWF0dGVyIH0gZnJvbSAnLi9kYXRlVGltZVNob3J0SXNvRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgZGF0ZVRpbWVTaG9ydFVzRm9ybWF0dGVyIH0gZnJvbSAnLi9kYXRlVGltZVNob3J0VXNGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBkYXRlVXNGb3JtYXR0ZXIgfSBmcm9tICcuL2RhdGVVc0Zvcm1hdHRlcic7XHJcbmltcG9ydCB7IGRlY2ltYWxGb3JtYXR0ZXIgfSBmcm9tICcuL2RlY2ltYWxGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBkZWxldGVJY29uRm9ybWF0dGVyIH0gZnJvbSAnLi9kZWxldGVJY29uRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgZG9sbGFyQ29sb3JlZEJvbGRGb3JtYXR0ZXIgfSBmcm9tICcuL2RvbGxhckNvbG9yZWRCb2xkRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgZG9sbGFyQ29sb3JlZEZvcm1hdHRlciB9IGZyb20gJy4vZG9sbGFyQ29sb3JlZEZvcm1hdHRlcic7XHJcbmltcG9ydCB7IGRvbGxhckZvcm1hdHRlciB9IGZyb20gJy4vZG9sbGFyRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgZWRpdEljb25Gb3JtYXR0ZXIgfSBmcm9tICcuL2VkaXRJY29uRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgaHlwZXJsaW5rRm9ybWF0dGVyIH0gZnJvbSAnLi9oeXBlcmxpbmtGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBpY29uRm9ybWF0dGVyIH0gZnJvbSAnLi9pY29uRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgaW5mb0ljb25Gb3JtYXR0ZXIgfSBmcm9tICcuL2luZm9JY29uRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgaXRhbGljRm9ybWF0dGVyIH0gZnJvbSAnLi9pdGFsaWNGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBsb3dlcmNhc2VGb3JtYXR0ZXIgfSBmcm9tICcuL2xvd2VyY2FzZUZvcm1hdHRlcic7XHJcbmltcG9ydCB7IG1hc2tGb3JtYXR0ZXIgfSBmcm9tICcuL21hc2tGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBtdWx0aXBsZUZvcm1hdHRlciB9IGZyb20gJy4vbXVsdGlwbGVGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBwZXJjZW50Rm9ybWF0dGVyIH0gZnJvbSAnLi9wZXJjZW50Rm9ybWF0dGVyJztcclxuaW1wb3J0IHsgcGVyY2VudENvbXBsZXRlQmFyRm9ybWF0dGVyIH0gZnJvbSAnLi9wZXJjZW50Q29tcGxldGVCYXJGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBwZXJjZW50Q29tcGxldGVGb3JtYXR0ZXIgfSBmcm9tICcuL3BlcmNlbnRDb21wbGV0ZUZvcm1hdHRlcic7XHJcbmltcG9ydCB7IHBlcmNlbnRTeW1ib2xGb3JtYXR0ZXIgfSBmcm9tICcuL3BlcmNlbnRTeW1ib2xGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBwcm9ncmVzc0JhckZvcm1hdHRlciB9IGZyb20gJy4vcHJvZ3Jlc3NCYXJGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyB0cmFuc2xhdGVGb3JtYXR0ZXIgfSBmcm9tICcuL3RyYW5zbGF0ZUZvcm1hdHRlcic7XHJcbmltcG9ydCB7IHRyYW5zbGF0ZUJvb2xlYW5Gb3JtYXR0ZXIgfSBmcm9tICcuL3RyYW5zbGF0ZUJvb2xlYW5Gb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyB1cHBlcmNhc2VGb3JtYXR0ZXIgfSBmcm9tICcuL3VwcGVyY2FzZUZvcm1hdHRlcic7XHJcbmltcG9ydCB7IHllc05vRm9ybWF0dGVyIH0gZnJvbSAnLi95ZXNOb0Zvcm1hdHRlcic7XHJcblxyXG4vKiogUHJvdmlkZXMgYSBsaXN0IG9mIGRpZmZlcmVudCBGb3JtYXR0ZXJzIHRoYXQgd2lsbCBjaGFuZ2UgdGhlIGNlbGwgdmFsdWUgZGlzcGxheWVkIGluIHRoZSBVSSAqL1xyXG5leHBvcnQgY29uc3QgRm9ybWF0dGVycyA9IHtcclxuICAvKipcclxuICAgKiBUYWtlcyBhbiBhcnJheSBvZiBjb21wbGV4IG9iamVjdHMgY29udmVydHMgaXQgdG8gYSBjb21tYSBkZWxpbWl0ZWQgc3RyaW5nLlxyXG4gICAqIFJlcXVpcmVzIHRvIHBhc3MgYW4gYXJyYXkgb2YgXCJwcm9wZXJ0eU5hbWVzXCIgaW4gdGhlIGNvbHVtbiBkZWZpbml0aW9uIHRoZSBnZW5lcmljIFwicGFyYW1zXCIgcHJvcGVydHlcclxuICAgKiBGb3IgZXhhbXBsZSwgaWYgd2UgaGF2ZSBhbiBhcnJheSBvZiB1c2VyIG9iamVjdHMgdGhhdCBoYXZlIHRoZSBwcm9wZXJ0eSBvZiBmaXJzdE5hbWUgJiBsYXN0TmFtZSB0aGVuIHdlIG5lZWQgdG8gcGFzcyBpbiB5b3VyIGNvbHVtbiBkZWZpbml0aW9uOjpcclxuICAgKiB7IHBhcmFtczogeyBwcm9wZXJ0eU5hbWVzOiBbJ2ZpcnROYW1lJ10gfX1cclxuICAgKi9cclxuICBhcnJheU9iamVjdFRvQ3N2OiBhcnJheU9iamVjdFRvQ3N2Rm9ybWF0dGVyLFxyXG5cclxuICAvKiogVGFrZXMgYW4gYXJyYXkgb2Ygc3RyaW5nIGFuZCBjb252ZXJ0cyBpdCB0byBhIGNvbW1hIGRlbGltaXRlZCBzdHJpbmcgKi9cclxuICBhcnJheVRvQ3N2OiBhcnJheVRvQ3N2Rm9ybWF0dGVyLFxyXG5cclxuICAvKiogc2hvdyB2YWx1ZSBpbiBib2xkIGZvbnQgd2VpZ2h0ICovXHJcbiAgYm9sZDogYm9sZEZvcm1hdHRlcixcclxuXHJcbiAgLyoqIFdoZW4gdmFsdWUgaXMgZmlsbGVkICh0cnVlKSwgaXQgd2lsbCBkaXNwbGF5IGEgY2hlY2tib3ggVW5pY29kZSBpY29uICovXHJcbiAgY2hlY2tib3g6IGNoZWNrYm94Rm9ybWF0dGVyLFxyXG5cclxuICAvKiogV2hlbiB2YWx1ZSBpcyBmaWxsZWQgKHRydWUpLCBpdCB3aWxsIGRpc3BsYXkgYSBGb250LUF3ZXNvbWUgaWNvbiAoZmEtY2hlY2spICovXHJcbiAgY2hlY2ttYXJrOiBjaGVja21hcmtGb3JtYXR0ZXIsXHJcblxyXG4gIC8qKlxyXG4gICAqIFRha2VzIGEgY29tcGxleCBkYXRhIG9iamVjdCBhbmQgcmV0dXJuIHRoZSBkYXRhIHVuZGVyIHRoYXQgcHJvcGVydHkgKGZvciBleGFtcGxlOiBcInVzZXIuZmlyc3ROYW1lXCIgd2lsbCByZXR1cm4gdGhlIGZpcnN0IG5hbWUgXCJKb2huXCIpXHJcbiAgICogWW91IGNhbiBwYXNzIHRoZSBjb21wbGV4IHN0cnVjdHVyZSBpbiB0aGUgXCJmaWVsZFwiIG9yIHRoZSBcInBhcmFtczogeyBjb21wbGV4RmllbGQ6IHN0cmluZyB9XCIgcHJvcGVydGllcy5cclxuICAgKiBGb3IgZXhhbXBsZTo6XHJcbiAgICogdGhpcy5jb2x1bW5EZWZzID0gW3sgaWQ6ICd1c2VybmFtZScsIGZpZWxkOiAndXNlci5maXJzdE5hbWUnLCAuLi4gfV1cclxuICAgKiBPUiB0aGlzLmNvbHVtbkRlZnMgPSBbeyBpZDogJ3VzZXJuYW1lJywgZmllbGQ6ICd1c2VyJywgcGFyYW1zOiB7IGNvbXBsZXhGaWVsZDogJ3VzZXIuZmlyc3ROYW1lJyB9LCAuLi4gfV1cclxuICAgKi9cclxuICBjb21wbGV4T2JqZWN0OiBjb21wbGV4T2JqZWN0Rm9ybWF0dGVyLFxyXG5cclxuICAvKipcclxuICAgKiBMb29rcyB1cCB2YWx1ZXMgZnJvbSB0aGUgY29sdW1uRGVmaW5pdGlvbi5wYXJhbXMuY29sbGVjdGlvbiBwcm9wZXJ0eSBhbmQgZGlzcGxheXMgdGhlIGxhYmVsIGluIENTViBvciBzdHJpbmcgZm9ybWF0XHJcbiAgICogQGV4YW1wbGVcclxuICAgKiAvLyB0aGUgZ3JpZCB3aWxsIGRpc3BsYXkgJ2ZvbycgYW5kICdiYXInIGFuZCBub3QgMSBhbmQgMiBmcm9tIHlvdXIgZGF0YXNldFxyXG4gICAqIHsgcGFyYW1zOiB7IGNvbGxlY3Rpb246IFt7IHZhbHVlOiAxLCBsYWJlbDogJ2Zvbyd9LCB7dmFsdWU6IDIsIGxhYmVsOiAnYmFyJyB9XSB9fVxyXG4gICAqIGNvbnN0IGRhdGFzZXQgPSBbMSwgMl07XHJcbiAgICovXHJcbiAgY29sbGVjdGlvbjogY29sbGVjdGlvbkZvcm1hdHRlcixcclxuXHJcbiAgLyoqXHJcbiAgICogUm91Z2hseSB0aGUgc2FtZSBhcyB0aGUgXCJjb2xsZWN0aW9uRm9ybWF0dGVyXCIgZXhjZXB0IHRoYXQgaXRcclxuICAgKiBsb29rcyB1cCB2YWx1ZXMgZnJvbSB0aGUgY29sdW1uRGVmaW5pdGlvbi5lZGl0b3IuY29sbGVjdGlvbiAoaW5zdGVhZCBvZiBwYXJhbXMpIHByb3BlcnR5IGFuZCBkaXNwbGF5cyB0aGUgbGFiZWwgaW4gQ1NWIG9yIHN0cmluZyBmb3JtYXRcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIC8vIHRoZSBncmlkIHdpbGwgZGlzcGxheSAnZm9vJyBhbmQgJ2JhcicgYW5kIG5vdCAxIGFuZCAyIGZyb20geW91ciBkYXRhc2V0XHJcbiAgICogeyBlZGl0b3I6IHsgY29sbGVjdGlvbjogW3sgdmFsdWU6IDEsIGxhYmVsOiAnZm9vJ30sIHt2YWx1ZTogMiwgbGFiZWw6ICdiYXInIH1dIH19XHJcbiAgICogY29uc3QgZGF0YXNldCA9IFsxLCAyXTtcclxuICAgKi9cclxuICBjb2xsZWN0aW9uRWRpdG9yOiBjb2xsZWN0aW9uRWRpdG9yRm9ybWF0dGVyLFxyXG5cclxuICAvKiogVGFrZXMgYSBEYXRlIG9iamVjdCBhbmQgZGlzcGxheXMgaXQgYXMgYW4gSVNPIERhdGUgZm9ybWF0ICovXHJcbiAgZGF0ZUlzbzogZGF0ZUlzb0Zvcm1hdHRlcixcclxuXHJcbiAgLyoqIFRha2VzIGEgRGF0ZSBvYmplY3QgYW5kIGRpc3BsYXlzIGl0IGFzIGFuIElTTyBEYXRlK1RpbWUgZm9ybWF0ICovXHJcbiAgZGF0ZVRpbWVJc286IGRhdGVUaW1lSXNvRm9ybWF0dGVyLFxyXG5cclxuICAvKiogVGFrZXMgYSBEYXRlIG9iamVjdCBhbmQgZGlzcGxheXMgaXQgYXMgYW4gSVNPIERhdGUrVGltZSAod2l0aG91dCBzZWNvbmRzKSBmb3JtYXQgKi9cclxuICBkYXRlVGltZVNob3J0SXNvOiBkYXRlVGltZVNob3J0SXNvRm9ybWF0dGVyLFxyXG5cclxuICAvKiogVGFrZXMgYSBEYXRlIG9iamVjdCBhbmQgZGlzcGxheXMgaXQgYXMgYW4gSVNPIERhdGUrVGltZSsoYW0vcG0pIGZvcm1hdCAqL1xyXG4gIGRhdGVUaW1lSXNvQW1QbTogZGF0ZVRpbWVJc29BbVBtRm9ybWF0dGVyLFxyXG5cclxuICAvKiogVGFrZXMgYSBEYXRlIG9iamVjdCBhbmQgZGlzcGxheXMgaXQgYXMgYW4gVVMgRGF0ZSBmb3JtYXQgKi9cclxuICBkYXRlVXM6IGRhdGVVc0Zvcm1hdHRlcixcclxuXHJcbiAgLyoqIFRha2VzIGEgRGF0ZSBvYmplY3QgYW5kIGRpc3BsYXlzIGl0IGFzIGFuIFVTIERhdGUrVGltZSBmb3JtYXQgKi9cclxuICBkYXRlVGltZVVzOiBkYXRlVGltZVVzRm9ybWF0dGVyLFxyXG5cclxuICAvKiogVGFrZXMgYSBEYXRlIG9iamVjdCBhbmQgZGlzcGxheXMgaXQgYXMgYW4gVVMgRGF0ZStUaW1lICh3aXRob3V0IHNlY29uZHMpIGZvcm1hdCAqL1xyXG4gIGRhdGVUaW1lU2hvcnRVczogZGF0ZVRpbWVTaG9ydFVzRm9ybWF0dGVyLFxyXG5cclxuICAvKiogVGFrZXMgYSBEYXRlIG9iamVjdCBhbmQgZGlzcGxheXMgaXQgYXMgYW4gVVMgRGF0ZStUaW1lKyhhbS9wbSkgZm9ybWF0ICovXHJcbiAgZGF0ZVRpbWVVc0FtUG06IGRhdGVUaW1lVXNBbVBtRm9ybWF0dGVyLFxyXG5cclxuICAvKiogRGlzcGxheXMgYSBGb250LUF3ZXNvbWUgZGVsZXRlIGljb24gKGZhLXRyYXNoKSAqL1xyXG4gIGRlbGV0ZUljb246IGRlbGV0ZUljb25Gb3JtYXR0ZXIsXHJcblxyXG4gIC8qKlxyXG4gICAqIERpc3BsYXkgdGhlIHZhbHVlIGFzIHggZGVjaW1hbHMgZm9ybWF0dGVkLCBkZWZhdWx0cyB0byAyIGRlY2ltYWxzLlxyXG4gICAqIFlvdSBjYW4gcGFzcyBcImRlY2ltYWxQbGFjZXNcIiBvciBcIm1pbkRlY2ltYWxQbGFjZXNcIiBhbmQvb3IgXCJtYXhEZWNpbWFsUGxhY2VzXCIgdG8gdGhlIFwicGFyYW1zXCIgcHJvcGVydHkuXHJcbiAgICogRm9yIGV4YW1wbGU6OiBgeyBmb3JtYXR0ZXI6IEZvcm1hdHRlcnMuZGVjaW1hbCwgcGFyYW1zOiB7IGRlY2ltYWxQbGFjZXM6IDMgfX1gXHJcbiAgICogVGhlIHByb3BlcnR5IFwiZGVjaW1hbFBsYWNlc1wiIGlzIGFuIGFsaWFzIG9mIFwibWluRGVjaW1hbFBsYWNlc1wiXHJcbiAgICovXHJcbiAgZGVjaW1hbDogZGVjaW1hbEZvcm1hdHRlcixcclxuXHJcbiAgLyoqIERpc3BsYXkgdGhlIHZhbHVlIGFzIDIgZGVjaW1hbHMgZm9ybWF0dGVkIHdpdGggZG9sbGFyIHNpZ24gJyQnIGF0IHRoZSBlbmQgb2Ygb2YgdGhlIHZhbHVlICovXHJcbiAgZG9sbGFyOiBkb2xsYXJGb3JtYXR0ZXIsXHJcblxyXG4gIC8qKiBEaXNwbGF5IHRoZSB2YWx1ZSBhcyAyIGRlY2ltYWxzIGZvcm1hdHRlZCB3aXRoIGRvbGxhciBzaWduICckJyBhdCB0aGUgZW5kIG9mIG9mIHRoZSB2YWx1ZSwgY2hhbmdlIGNvbG9yIG9mIHRleHQgdG8gcmVkL2dyZWVuIG9uIG5lZ2F0aXZlL3Bvc2l0aXZlIHZhbHVlICovXHJcbiAgZG9sbGFyQ29sb3JlZDogZG9sbGFyQ29sb3JlZEZvcm1hdHRlcixcclxuXHJcbiAgLyoqIERpc3BsYXkgdGhlIHZhbHVlIGFzIDIgZGVjaW1hbHMgZm9ybWF0dGVkIHdpdGggZG9sbGFyIHNpZ24gJyQnIGF0IHRoZSBlbmQgb2Ygb2YgdGhlIHZhbHVlLCBjaGFuZ2UgY29sb3Igb2YgdGV4dCB0byByZWQvZ3JlZW4gb24gbmVnYXRpdmUvcG9zaXRpdmUgdmFsdWUsIHNob3cgaXQgaW4gYm9sZCBmb250IHdlaWdodCBhcyB3ZWxsICovXHJcbiAgZG9sbGFyQ29sb3JlZEJvbGQ6IGRvbGxhckNvbG9yZWRCb2xkRm9ybWF0dGVyLFxyXG5cclxuICAvKiogRGlzcGxheXMgYSBGb250LUF3ZXNvbWUgZWRpdCBpY29uIChmYS1wZW5jaWwpICovXHJcbiAgZWRpdEljb246IGVkaXRJY29uRm9ybWF0dGVyLFxyXG5cclxuICAvKipcclxuICAgKiBUYWtlcyBhbiBoeXBlcmxpbmsgY2VsbCB2YWx1ZSBhbmQgdHJhbnNmb3JtcyBpdCBpbnRvIGEgcmVhbCBoeXBlcmxpbmssIGdpdmVuIHRoYXQgdGhlIHZhbHVlIHN0YXJ0cyB3aXRoIDEgb2YgdGhlc2UgKGh0dHB8ZnRwfGh0dHBzKS5cclxuICAgKiBUaGUgc3RydWN0dXJlIHdpbGwgYmUgXCI8YSBocmVmPVwiaHlwZXJsaW5rXCI+aHlwZXJsaW5rPC9hPlwiXHJcbiAgICogWW91IGNhbiBvcHRpb25hbGx5IGNoYW5nZSB0aGUgaHlwZXJsaW5rIHRleHQgZGlzcGxheWVkIGJ5IHVzaW5nIHRoZSBnZW5lcmljIHBhcmFtcyBcImh5cGVybGlua1RleHRcIiBpbiB0aGUgY29sdW1uIGRlZmluaXRpb25cclxuICAgKiBGb3IgZXhhbXBsZTogeyBpZDogJ2xpbmsnLCBmaWVsZDogJ2xpbmsnLCBwYXJhbXM6IHsgaHlwZXJsaW5rVGV4dDogJ0NvbXBhbnkgV2Vic2l0ZScgfSB9IHdpbGwgZGlzcGxheSBcIjxhIGhyZWY9XCJsaW5rXCI+Q29tcGFueSBXZWJzaXRlPC9hPlwiXHJcbiAgICovXHJcbiAgaHlwZXJsaW5rOiBoeXBlcmxpbmtGb3JtYXR0ZXIsXHJcblxyXG4gIC8qKiBEaXNwbGF5IHdoaWNoZXZlciBpY29uIHlvdSB3YW50IChsaWJyYXJ5IGFnbm9zdGljLCBpdCBjb3VsZCBiZSBGb250LUF3ZXNvbWUgb3IgYW55IG90aGVyKSAqL1xyXG4gIGljb246IGljb25Gb3JtYXR0ZXIsXHJcblxyXG4gIC8qKiBEaXNwbGF5cyBhIEZvbnQtQXdlc29tZSBlZGl0IGljb24gKGZhLWluZm8tY2lyY2xlKSAqL1xyXG4gIGluZm9JY29uOiBpbmZvSWNvbkZvcm1hdHRlcixcclxuXHJcbiAgLyoqIHNob3cgaW5wdXQgdGV4dCB2YWx1ZSBhcyBpdGFsaWMgdGV4dCAqL1xyXG4gIGl0YWxpYzogaXRhbGljRm9ybWF0dGVyLFxyXG5cclxuICAvKiogVGFrZXMgYSB2YWx1ZSBhbmQgZGlzcGxheXMgaXQgYWxsIGxvd2VyY2FzZSAqL1xyXG4gIGxvd2VyY2FzZTogbG93ZXJjYXNlRm9ybWF0dGVyLFxyXG5cclxuICAvKipcclxuICAgKiBUYWtlcyBhIHZhbHVlIGRpc3BsYXkgaXQgYWNjb3JkaW5nIHRvIGEgbWFzayBwcm92aWRlZFxyXG4gICAqIGUuOiAxMjM0NTY3ODkwIHdpdGggbWFzayBcIigwMDApIDAwMC0wMDAwXCIgd2lsbCBkaXNwbGF5IFwiKDEyMykgNDU2LTc4OTBcIlxyXG4gICAqL1xyXG4gIG1hc2s6IG1hc2tGb3JtYXR0ZXIsXHJcblxyXG4gIC8qKlxyXG4gICAqIFlvdSBjYW4gcGlwZSBtdWx0aXBsZSBmb3JtYXR0ZXJzIChleGVjdXRlZCBpbiBzZXF1ZW5jZSksIHVzZSBwYXJhbXMgdG8gcGFzcyB0aGUgbGlzdCBvZiBmb3JtYXR0ZXJzLlxyXG4gICAqIFJlcXVpcmVzIHRvIHBhc3MgYW4gYXJyYXkgb2YgXCJmb3JtYXR0ZXJzXCIgaW4gdGhlIGNvbHVtbiBkZWZpbml0aW9uIHRoZSBnZW5lcmljIFwicGFyYW1zXCIgcHJvcGVydHlcclxuICAgKiBGb3IgZXhhbXBsZTo6XHJcbiAgICogeyBmaWVsZDogJ3RpdGxlJywgZm9ybWF0dGVyOiBGb3JtYXR0ZXJzLm11bHRpcGxlLCBwYXJhbXM6IHsgZm9ybWF0dGVyczogWyBGb3JtYXR0ZXJzLmxvd2VyY2FzZSwgRm9ybWF0dGVycy51cHBlcmNhc2UgXSB9XHJcbiAgICovXHJcbiAgbXVsdGlwbGU6IG11bHRpcGxlRm9ybWF0dGVyLFxyXG5cclxuICAvKiogVGFrZXMgYSBjZWxsIHZhbHVlIG51bWJlciAoYmV0d2VlbiAwLjAtMS4wKSBhbmQgZGlzcGxheXMgYSByZWQgKDw1MCkgb3IgZ3JlZW4gKD49NTApIGJhciAqL1xyXG4gIHBlcmNlbnQ6IHBlcmNlbnRGb3JtYXR0ZXIsXHJcblxyXG4gIC8qKiBUYWtlcyBhIGNlbGwgdmFsdWUgbnVtYmVyIChiZXR3ZWVuIDAuMC0xMDApIGFuZCBkaXNwbGF5cyBhIHJlZCAoPDUwKSBvciBncmVlbiAoPj01MCkgYmFyICovXHJcbiAgcGVyY2VudENvbXBsZXRlOiBwZXJjZW50Q29tcGxldGVGb3JtYXR0ZXIsXHJcblxyXG4gIC8qKiBUYWtlcyBhIGNlbGwgdmFsdWUgbnVtYmVyIChiZXR3ZWVuIDAtMTAwKSBhbmQgZGlzcGxheXMgQm9vdHN0cmFwIFwicGVyY2VudC1jb21wbGV0ZS1iYXJcIiBhIHJlZCAoPDMwKSwgc2lsdmVyICg+MzAgJiA8NzApIG9yIGdyZWVuICg+PTcwKSBiYXIgKi9cclxuICBwZXJjZW50Q29tcGxldGVCYXI6IHBlcmNlbnRDb21wbGV0ZUJhckZvcm1hdHRlcixcclxuXHJcbiAgLyoqIFRha2VzIGEgY2VsbCB2YWx1ZSBudW1iZXIgKGJldHdlZW4gMC0xMDApIGFuZCBhZGQgdGhlIFwiJVwiIGFmdGVyIHRoZSBudW1iZXIgKi9cclxuICBwZXJjZW50U3ltYm9sOiBwZXJjZW50U3ltYm9sRm9ybWF0dGVyLFxyXG5cclxuICAvKiogVGFrZXMgYSBjZWxsIHZhbHVlIG51bWJlciAoYmV0d2VlbiAwLTEwMCkgYW5kIGRpc3BsYXlzIEJvb3RzdHJhcCBcInByb2dyZXNzLWJhclwiIGEgcmVkICg8MzApLCBzaWx2ZXIgKD4zMCAmIDw3MCkgb3IgZ3JlZW4gKD49NzApIGJhciAqL1xyXG4gIHByb2dyZXNzQmFyOiBwcm9ncmVzc0JhckZvcm1hdHRlcixcclxuXHJcbiAgLyoqIFRha2VzIGEgY2VsbCB2YWx1ZSBhbmQgdHJhbnNsYXRlcyBpdCAoaTE4bikuIFJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIHRoZSBUcmFuc2xhdGUgU2VydmljZTo6IGBpMThuOiB0aGlzLnRyYW5zbGF0ZSAqL1xyXG4gIHRyYW5zbGF0ZTogdHJhbnNsYXRlRm9ybWF0dGVyLFxyXG5cclxuICAvKiogVGFrZXMgYSBib29sZWFuIHZhbHVlLCBjYXN0IGl0IHRvIHVwcGVyQ2FzZSBzdHJpbmcgYW5kIGZpbmFsbHkgdHJhbnNsYXRlcyBpdCAoaTE4bikuICovXHJcbiAgdHJhbnNsYXRlQm9vbGVhbjogdHJhbnNsYXRlQm9vbGVhbkZvcm1hdHRlcixcclxuXHJcbiAgLyoqIFRha2VzIGEgdmFsdWUgYW5kIGRpc3BsYXlzIGl0IGFsbCB1cHBlcmNhc2UgKi9cclxuICB1cHBlcmNhc2U6IHVwcGVyY2FzZUZvcm1hdHRlcixcclxuXHJcbiAgLyoqIFRha2VzIGEgYm9vbGVhbiB2YWx1ZSBhbmQgZGlzcGxheSBhIHN0cmluZyAnWWVzJyBvciAnTm8nICovXHJcbiAgeWVzTm86IHllc05vRm9ybWF0dGVyXHJcbn07XHJcbiJdfQ==