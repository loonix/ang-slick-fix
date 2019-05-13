import { TranslateService } from '@ngx-translate/core';
import { Column, ColumnFilter, Filter, FilterArguments, FilterCallback, OperatorString, OperatorType, SearchTerm } from './../models/index';
export declare class CompoundInputFilter implements Filter {
    protected translate: TranslateService;
    private _clearFilterTriggered;
    private _shouldTriggerQuery;
    private _inputType;
    private $filterElm;
    private $filterInputElm;
    private $selectOperatorElm;
    private _operator;
    grid: any;
    searchTerms: SearchTerm[];
    columnDef: Column;
    callback: FilterCallback;
    constructor(translate: TranslateService);
    /** Getter for the Grid Options pulled through the Grid Object */
    private readonly gridOptions;
    /** Getter for the Column Filter */
    readonly columnFilter: ColumnFilter;
    /** Getter of input type (text, number, password) */
    /** Setter of input type (text, number, password) */
    inputType: string;
    /** Getter of the Operator to use when doing the filter comparing */
    /** Getter of the Operator to use when doing the filter comparing */
    operator: OperatorType | OperatorString;
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
    setValues(values: SearchTerm[]): void;
    private buildInputHtmlString;
    private buildSelectOperatorHtmlString;
    private getOptionValues;
    /**
     * Create the DOM element
     */
    private createDomElement;
    private onTriggerEvent;
}
