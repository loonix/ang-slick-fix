import { Column, ColumnEditor, Editor, EditorValidator, EditorValidatorOutput } from './../models/index';
export declare class FloatEditor implements Editor {
    private args;
    private _lastInputEvent;
    $input: any;
    defaultValue: any;
    constructor(args: any);
    /** Get Column Definition object */
    readonly columnDef: Column;
    /** Get Column Editor object */
    readonly columnEditor: ColumnEditor;
    readonly hasAutoCommitEdit: any;
    /** Get the Validator function, can be passed in Editor property or Column Definition */
    readonly validator: EditorValidator;
    init(): void;
    destroy(): void;
    focus(): void;
    getColumnEditor(): any;
    getDecimalPlaces(): number;
    getInputDecimalSteps(): string;
    loadValue(item: any): void;
    serializeValue(): any;
    applyValue(item: any, state: any): void;
    isValueChanged(): boolean;
    save(): void;
    validate(inputValue?: any): EditorValidatorOutput;
}
