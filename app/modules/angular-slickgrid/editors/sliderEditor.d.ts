import { Column, Editor, EditorValidator, EditorValidatorOutput, ColumnEditor } from './../models/index';
export declare class SliderEditor implements Editor {
    private args;
    private _lastInputEvent;
    private _elementRangeInputId;
    private _elementRangeOutputId;
    $editorElm: any;
    $input: any;
    $sliderNumber: any;
    defaultValue: any;
    constructor(args: any);
    /** Get Column Definition object */
    readonly columnDef: Column;
    /** Get Column Editor object */
    readonly columnEditor: ColumnEditor;
    /** Getter for the Editor Generic Params */
    private readonly editorParams;
    /** Get the Validator function, can be passed in Editor property or Column Definition */
    readonly validator: EditorValidator;
    init(): void;
    destroy(): void;
    focus(): void;
    save(): void;
    cancel(): void;
    loadValue(item: any): void;
    serializeValue(): number;
    applyValue(item: any, state: any): void;
    isValueChanged(): boolean;
    validate(inputValue?: any): EditorValidatorOutput;
    /**
     * Create the HTML template as a string
     */
    private buildTemplateHtmlString;
}
