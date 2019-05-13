import { TranslateService } from '@ngx-translate/core';
import { CollectionCustomStructure, CollectionOption, Column, ColumnFilter, Filter, FilterArguments, FilterCallback, GridOption, OperatorType, OperatorString, SearchTerm } from './../models/index';
import { CollectionService } from '../services/collection.service';
import { Subscription, Subject, Observable } from 'rxjs';
export declare class AutoCompleteFilter implements Filter {
    protected translate: TranslateService;
    protected collectionService: CollectionService;
    private _clearFilterTriggered;
    private _shouldTriggerQuery;
    /** DOM Element Name, useful for auto-detecting positioning (dropup / dropdown) */
    elementName: string;
    /** The JQuery DOM element */
    $filterElm: any;
    grid: any;
    searchTerms: SearchTerm[];
    columnDef: Column;
    callback: FilterCallback;
    isFilled: boolean;
    /** The property name for labels in the collection */
    labelName: string;
    /** The property name for values in the collection */
    optionLabel: string;
    /** The property name for values in the collection */
    valueName: string;
    enableTranslateLabel: boolean;
    subscriptions: Subscription[];
    /**
     * Initialize the Filter
     */
    constructor(translate: TranslateService, collectionService: CollectionService);
    /** Getter for the Collection Options */
    protected readonly collectionOptions: CollectionOption;
    /** Getter for the Column Filter */
    readonly columnFilter: ColumnFilter;
    /** Getter for the Custom Structure if exist */
    readonly customStructure: CollectionCustomStructure | undefined;
    /** Getter for the Grid Options pulled through the Grid Object */
    readonly gridOptions: GridOption;
    /** Getter of the Operator to use when doing the filter comparing */
    readonly operator: OperatorType | OperatorString;
    /**
     * Initialize the filter template
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
    setValues(values: SearchTerm | SearchTerm[]): void;
    /**
     * user might want to filter certain items of the collection
     * @param inputCollection
     * @return outputCollection filtered and/or sorted collection
     */
    protected filterCollection(inputCollection: any[]): any[];
    /**
     * user might want to sort the collection in a certain way
     * @param inputCollection
     * @return outputCollection filtered and/or sorted collection
     */
    protected sortCollection(inputCollection: any[]): any[];
    protected renderOptionsAsync(collectionAsync: Promise<any> | Observable<any> | Subject<any>): Promise<void>;
    /** Create or recreate an Observable Subject and reassign it to the "collectionAsync" object so user can call a "collectionAsync.next()" on it */
    protected createCollectionAsyncSubject(): void;
    /**
     * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
     * and reinitialize filter collection with this new collection
     */
    protected renderDomElementFromCollectionAsync(collection: any): void;
    protected renderDomElement(collection: any[]): void;
    /**
     * Create the HTML template as a string
     */
    private buildTemplateHtmlString;
    /**
     * From the html template string, create a DOM element
     * @param filterTemplate
     */
    private createDomElement;
    private onSelect;
}
