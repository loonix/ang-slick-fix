import { Column, ColumnFilter, Filter, FilterArguments, FilterCallback, GridOption, OperatorType, OperatorString, SearchTerm } from './../models/index';
export declare class InputFilter implements Filter {
    protected _clearFilterTriggered: boolean;
    protected _shouldTriggerQuery: boolean;
    protected _inputType: string;
    protected $filterElm: any;
    grid: any;
    searchTerms: SearchTerm[];
    columnDef: Column;
    callback: FilterCallback;
    constructor();
    /** Getter for the Column Filter */
    readonly columnFilter: ColumnFilter;
    /** Getter of input type (text, number, password) */
    /** Setter of input type (text, number, password) */
    inputType: string;
    /** Getter of the Operator to use when doing the filter comparing */
    readonly operator: OperatorType | OperatorString;
    /** Getter for the Grid Options pulled through the Grid Object */
    protected readonly gridOptions: GridOption;
    /**
     * Initialize the Filter
     */
    init(args: FilterArguments): void;
    /**
     * Clear the filter value
     */
    clear(shouldTriggerQuery?: boolean): void;
    /**
     * destroy the filter
     */
    destroy(): void;
    /**
     * Set value(s) on the DOM element
     */
    setValues(values: SearchTerm): void;
    /**
     * Create the HTML template as a string
     */
    protected buildTemplateHtmlString(): string;
    /**
     * From the html template string, create a DOM element
     * @param filterTemplate
     */
    protected createDomElement(filterTemplate: string, searchTerm?: SearchTerm): any;
}
