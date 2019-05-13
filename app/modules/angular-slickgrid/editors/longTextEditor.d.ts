import { Column, ColumnEditor, Editor, EditorValidator, EditorValidatorOutput, GridOption, HtmlElementPosition } from './../models/index';
export declare class LongTextEditor implements Editor {
    private args;
    $textarea: any;
    $wrapper: any;
    defaultValue: any;
    /** Grid options */
    gridOptions: GridOption;
    /** The translate library */
    private _translate;
    constructor(args: any);
    /** Get Column Definition object */
    readonly columnDef: Column;
    /** Get Column Editor object */
    readonly columnEditor: ColumnEditor;
    /** Get the Validator function, can be passed in Editor property or Column Definition */
    readonly validator: EditorValidator;
    readonly hasAutoCommitEdit: any;
    init(): void;
    handleKeyDown(event: KeyboardEvent): void;
    cancel(): void;
    hide(): void;
    show(): void;
    position(position: HtmlElementPosition): void;
    destroy(): void;
    focus(): void;
    getValue(): any;
    setValue(val: string): void;
    getColumnEditor(): any;
    loadValue(item: any): void;
    serializeValue(): any;
    applyValue(item: any, state: any): void;
    isValueChanged(): boolean;
    save(): void;
    validate(inputValue?: any): EditorValidatorOutput;
}
