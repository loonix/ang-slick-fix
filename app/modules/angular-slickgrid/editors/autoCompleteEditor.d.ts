import { Column, ColumnEditor, Editor, EditorValidator, EditorValidatorOutput, CollectionCustomStructure } from './../models/index';
export declare class AutoCompleteEditor implements Editor {
    private args;
    private _currentValue;
    private _defaultTextValue;
    private _lastInputEvent;
    $input: any;
    /** The property name for labels in the collection */
    labelName: string;
    /** The property name for values in the collection */
    valueName: string;
    forceUserInput: boolean;
    constructor(args: any);
    /** Get the Collection */
    readonly collection: any[];
    /** Get Column Definition object */
    readonly columnDef: Column;
    /** Get Column Editor object */
    readonly columnEditor: ColumnEditor;
    /** Getter for the Custom Structure if exist */
    readonly customStructure: CollectionCustomStructure;
    readonly hasAutoCommitEdit: any;
    /** Get the Validator function, can be passed in Editor property or Column Definition */
    readonly validator: EditorValidator;
    readonly editorOptions: any;
    init(): void;
    destroy(): void;
    focus(): void;
    getValue(): any;
    setValue(val: string): void;
    loadValue(item: any): void;
    save(): void;
    serializeValue(): any;
    applyValue(item: any, state: any): void;
    isValueChanged(): boolean;
    validate(inputValue?: any): EditorValidatorOutput;
    private onClose;
}
