import { InputFilter } from './inputFilter';
import { FilterArguments } from '../models/filterArguments.interface';
export declare class InputMaskFilter extends InputFilter {
    /** Initialize the Filter */
    constructor();
    /** Getter of the input mask, when provided */
    readonly inputMask: string;
    /**
     * Override the Filter init used by SlickGrid
     */
    init(args: FilterArguments): void;
    /** From a regular string, we will use the mask to output a new string */
    private maskValue;
    /** From a masked string, we will remove the mask and make a regular string again */
    private unmaskValue;
}
