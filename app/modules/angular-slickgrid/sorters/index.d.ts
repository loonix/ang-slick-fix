export declare const Sorters: {
    /** Sorter method to sort values by Date object type */
    date: import("../models/sorter.interface").Sorter;
    /** Sorter method to sort values by Date formatted as ISO date */
    dateIso: import("../models/sorter.interface").Sorter;
    /** Sorter method to sort values by Date formatted as US date */
    dateUs: import("../models/sorter.interface").Sorter;
    /** Sorter method to sort values by Date formatted as US short date */
    dateUsShort: import("../models/sorter.interface").Sorter;
    /** Sorter method to sort values as numeric fields */
    numeric: import("../models/sorter.interface").Sorter;
    /** Sorter method to sort object values with a "dataKey" provided which it's output will be of string (e.g. obj1[dataKey] = 'John') */
    objectString: import("../models/sorter.interface").Sorter;
    /** Sorter method to sort values as regular strings */
    string: import("../models/sorter.interface").Sorter;
};
