/**
 * Compare 2 objects,
 * we will loop through all properties of the object to compare the entire content of both objects
 * Optionally we can compare by a property key, when that is provided we will compare the object content
 * @param o1
 * @param o2
 * @param compareKey optional
 */
export declare const compareObjects: (o1: any, o2: any, compareKey?: string) => boolean;
export declare const testFilterCondition: (operator: string, value1: any, value2: any) => boolean;
