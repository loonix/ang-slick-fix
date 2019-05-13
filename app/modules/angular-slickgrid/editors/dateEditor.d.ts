import { Column, ColumnEditor, Editor, EditorValidator, EditorValidatorOutput, GridOption } from './../models/index';
export declare class DateEditor implements Editor {
    private args;
    private _$inputWithData;
    $input: any;
    flatInstance: any;
    defaultDate: string;
    constructor(args: any);
    /** Get Column Definition object */
    readonly columnDef: Column;
    /** Get Column Editor object */
    readonly columnEditor: ColumnEditor;
    /** Get Flatpickr options passed to the editor by the user */
    readonly editorOptions: any;
    /** Get the Validator function, can be passed in Editor property or Column Definition */
    readonly validator: EditorValidator;
    init(): void;
    getCurrentLocale(columnDef: Column, gridOptions: GridOption): any;
    loadFlatpickrLocale(locale: string): any;
    destroy(): void;
    show(): void;
    hide(): void;
    focus(): void;
    save(): void;
    getColumnEditor(): any;
    loadValue(item: any): void;
    serializeValue(): string;
    applyValue(item: any, state: any): void;
    isValueChanged(): boolean;
    validate(inputValue?: any): EditorValidatorOutput;
}
