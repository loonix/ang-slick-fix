/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This GraphqlQueryBuilder class is a lib that already exist
 * but was causing issues with TypeScript, RequireJS and other bundler/packagers
 * and so I rewrote it in pure TypeScript.
 *
 * The previous lib can be viewed here at this Github
 * https://github.com/codemeasandwich/graphql-query-builder
 */
export default class GraphqlQueryBuilder {
    /* Constructor, query/mutator you wish to use, and an alias or filter arguments. */
    /**
     * @param {?} queryFnName
     * @param {?=} aliasOrFilter
     */
    constructor(queryFnName, aliasOrFilter) {
        this.queryFnName = queryFnName;
        this.head = [];
        if (typeof aliasOrFilter === 'function') {
            this.alias = aliasOrFilter;
        }
        else if (typeof aliasOrFilter === 'object') {
            this.filter(aliasOrFilter);
        }
        else if (undefined === aliasOrFilter && 2 === arguments.length) {
            throw new TypeError(`You have passed undefined as Second argument to "Query"`);
        }
        else if (undefined !== aliasOrFilter) {
            throw new TypeError(`Second argument to "Query" should be an alias name(String) or filter arguments(Object). was passed ${aliasOrFilter}`);
        }
    }
    /**
     * The parameters to run the query against.
     * @template THIS
     * @this {THIS}
     * @param {?} filters An object mapping attribute to values
     * @return {THIS}
     */
    filter(filters) {
        for (const prop of Object.keys(filters)) {
            if (typeof filters[prop] === 'function') {
                continue;
            }
            /** @type {?} */
            const val = (/** @type {?} */ (this)).getGraphQLValue(filters[prop]);
            if (val === '{}') {
                continue;
            }
            (/** @type {?} */ (this)).head.push(`${prop}:${val}`);
        }
        return (/** @type {?} */ (this));
    }
    /**
     * Outlines the properties you wish to be returned from the query.
     * @template THIS
     * @this {THIS}
     * @param {...?} searches
     * @return {THIS}
     */
    find(...searches) {
        if (!searches) {
            throw new TypeError(`find value can not be >>falsy<<`);
        }
        // if its a string.. it may have other values
        // else it sould be an Object or Array of maped values
        /** @type {?} */
        const searchKeys = (searches.length === 1 && Array.isArray(searches[0])) ? searches[0] : searches;
        (/** @type {?} */ (this)).body = (/** @type {?} */ (this)).parceFind(searchKeys);
        return (/** @type {?} */ (this));
    }
    /**
     * set an alias for this result.
     * @param {?} alias
     * @return {?}
     */
    setAlias(alias) {
        this.alias = alias;
    }
    /**
     * Return to the formatted query string
     * @return {?}
     */
    toString() {
        if (this.body === undefined) {
            throw new ReferenceError(`return properties are not defined. use the 'find' function to defined them`);
        }
        return `${(this.alias) ? (this.alias + ':') : ''} ${this.queryFnName} ${(this.head.length > 0) ? '(' + this.head.join(',') + ')' : ''}  { ${this.body} }`;
    }
    // --
    // PRIVATE FUNCTIONS
    // -----------------
    /**
     * @private
     * @param {?} _levelA
     * @return {?}
     */
    parceFind(_levelA) {
        /** @type {?} */
        const propsA = _levelA.map((/**
         * @param {?} currentValue
         * @param {?} index
         * @return {?}
         */
        (currentValue, index) => {
            /** @type {?} */
            const itemX = _levelA[index];
            if (itemX instanceof GraphqlQueryBuilder) {
                return itemX.toString();
            }
            else if (!Array.isArray(itemX) && typeof itemX === 'object') {
                /** @type {?} */
                const propsAA = Object.keys(itemX);
                if (1 !== propsAA.length) {
                    throw new RangeError(`Alias objects should only have one value. was passed: ${JSON.stringify(itemX)}`);
                }
                /** @type {?} */
                const propS = propsAA[0];
                /** @type {?} */
                const item = itemX[propS];
                if (Array.isArray(item)) {
                    return new GraphqlQueryBuilder(propS).find(item);
                }
                return `${propS} : ${item} `;
            }
            else if (typeof itemX === 'string') {
                return itemX;
            }
            else {
                throw new RangeError(`cannot handle Find value of ${itemX}`);
            }
        }));
        return propsA.join(',');
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    getGraphQLValue(value) {
        if (typeof value === 'string') {
            value = JSON.stringify(value);
        }
        else if (Array.isArray(value)) {
            value = value.map((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                return this.getGraphQLValue(item);
            })).join();
            value = `[${value}]`;
        }
        else if (value instanceof Date) {
            value = JSON.stringify(value);
        }
        else if (value !== null && typeof value === 'object') {
            value = this.objectToString(value);
        }
        return value;
    }
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    objectToString(obj) {
        /** @type {?} */
        const sourceA = [];
        for (const prop of Object.keys(obj)) {
            if (typeof obj[prop] === 'function') {
                continue;
            }
            sourceA.push(`${prop}:${this.getGraphQLValue(obj[prop])}`);
        }
        return `{${sourceA.join()}}`;
    }
}
if (false) {
    /** @type {?} */
    GraphqlQueryBuilder.prototype.alias;
    /** @type {?} */
    GraphqlQueryBuilder.prototype.head;
    /** @type {?} */
    GraphqlQueryBuilder.prototype.body;
    /**
     * @type {?}
     * @private
     */
    GraphqlQueryBuilder.prototype.queryFnName;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbFF1ZXJ5QnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvc2VydmljZXMvZ3JhcGhxbFF1ZXJ5QnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxNQUFNLENBQUMsT0FBTyxPQUFPLG1CQUFtQjs7Ozs7O0lBTXRDLFlBQW9CLFdBQW1CLEVBQUUsYUFBK0I7UUFBcEQsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFKdkMsU0FBSSxHQUFVLEVBQUUsQ0FBQztRQUtmLElBQUksT0FBTyxhQUFhLEtBQUssVUFBVSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDO1NBQzVCO2FBQU0sSUFBSSxPQUFPLGFBQWEsS0FBSyxRQUFRLEVBQUU7WUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM1QjthQUFNLElBQUksU0FBUyxLQUFLLGFBQWEsSUFBSSxDQUFDLEtBQUssU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNoRSxNQUFNLElBQUksU0FBUyxDQUFDLHlEQUF5RCxDQUFDLENBQUM7U0FDaEY7YUFBTSxJQUFJLFNBQVMsS0FBSyxhQUFhLEVBQUU7WUFDdEMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzR0FBc0csYUFBYSxFQUFFLENBQUMsQ0FBQztTQUM1STtJQUNILENBQUM7Ozs7Ozs7O0lBTUQsTUFBTSxDQUFDLE9BQVk7UUFDakIsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZDLElBQUksT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssVUFBVSxFQUFFO2dCQUN2QyxTQUFTO2FBQ1Y7O2tCQUNLLEdBQUcsR0FBRyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUks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QUFFO2dCQUNuQyxTQUFTO2FBQ1Y7WUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO0lBQy9CLENBQUM7Q0FDRjs7O0lBaklDLG9DQUF5Qjs7SUFDekIsbUNBQWlCOztJQUNqQixtQ0FBVTs7Ozs7SUFHRSwwQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogVGhpcyBHcmFwaHFsUXVlcnlCdWlsZGVyIGNsYXNzIGlzIGEgbGliIHRoYXQgYWxyZWFkeSBleGlzdFxyXG4gKiBidXQgd2FzIGNhdXNpbmcgaXNzdWVzIHdpdGggVHlwZVNjcmlwdCwgUmVxdWlyZUpTIGFuZCBvdGhlciBidW5kbGVyL3BhY2thZ2Vyc1xyXG4gKiBhbmQgc28gSSByZXdyb3RlIGl0IGluIHB1cmUgVHlwZVNjcmlwdC5cclxuICpcclxuICogVGhlIHByZXZpb3VzIGxpYiBjYW4gYmUgdmlld2VkIGhlcmUgYXQgdGhpcyBHaXRodWJcclxuICogaHR0cHM6Ly9naXRodWIuY29tL2NvZGVtZWFzYW5kd2ljaC9ncmFwaHFsLXF1ZXJ5LWJ1aWxkZXJcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBocWxRdWVyeUJ1aWxkZXIge1xyXG4gIGFsaWFzOiBzdHJpbmcgfCBGdW5jdGlvbjtcclxuICBoZWFkOiBhbnlbXSA9IFtdO1xyXG4gIGJvZHk6IGFueTtcclxuXHJcbiAgLyogQ29uc3RydWN0b3IsIHF1ZXJ5L211dGF0b3IgeW91IHdpc2ggdG8gdXNlLCBhbmQgYW4gYWxpYXMgb3IgZmlsdGVyIGFyZ3VtZW50cy4gKi9cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHF1ZXJ5Rm5OYW1lOiBzdHJpbmcsIGFsaWFzT3JGaWx0ZXI/OiBzdHJpbmcgfCBvYmplY3QpIHtcclxuICAgIGlmICh0eXBlb2YgYWxpYXNPckZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLmFsaWFzID0gYWxpYXNPckZpbHRlcjtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGFsaWFzT3JGaWx0ZXIgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRoaXMuZmlsdGVyKGFsaWFzT3JGaWx0ZXIpO1xyXG4gICAgfSBlbHNlIGlmICh1bmRlZmluZWQgPT09IGFsaWFzT3JGaWx0ZXIgJiYgMiA9PT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBZb3UgaGF2ZSBwYXNzZWQgdW5kZWZpbmVkIGFzIFNlY29uZCBhcmd1bWVudCB0byBcIlF1ZXJ5XCJgKTtcclxuICAgIH0gZWxzZSBpZiAodW5kZWZpbmVkICE9PSBhbGlhc09yRmlsdGVyKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFNlY29uZCBhcmd1bWVudCB0byBcIlF1ZXJ5XCIgc2hvdWxkIGJlIGFuIGFsaWFzIG5hbWUoU3RyaW5nKSBvciBmaWx0ZXIgYXJndW1lbnRzKE9iamVjdCkuIHdhcyBwYXNzZWQgJHthbGlhc09yRmlsdGVyfWApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHBhcmFtZXRlcnMgdG8gcnVuIHRoZSBxdWVyeSBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSBmaWx0ZXJzIEFuIG9iamVjdCBtYXBwaW5nIGF0dHJpYnV0ZSB0byB2YWx1ZXNcclxuICAgKi9cclxuICBmaWx0ZXIoZmlsdGVyczogYW55KSB7XHJcbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgT2JqZWN0LmtleXMoZmlsdGVycykpIHtcclxuICAgICAgaWYgKHR5cGVvZiBmaWx0ZXJzW3Byb3BdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgdmFsID0gdGhpcy5nZXRHcmFwaFFMVmFsdWUoZmlsdGVyc1twcm9wXSk7XHJcbiAgICAgIGlmICh2YWwgPT09ICd7fScpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmhlYWQucHVzaChgJHtwcm9wfToke3ZhbH1gKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3V0bGluZXMgdGhlIHByb3BlcnRpZXMgeW91IHdpc2ggdG8gYmUgcmV0dXJuZWQgZnJvbSB0aGUgcXVlcnkuXHJcbiAgICogQHBhcmFtIHByb3BlcnRpZXMgcmVwcmVzZW50aW5nIGVhY2ggYXR0cmlidXRlIHlvdSB3YW50IFJldHVybmVkXHJcbiAgICovXHJcbiAgZmluZCguLi5zZWFyY2hlczogYW55W10pIHsgLy8gVEhJUyBORUVEIFRPIEJFIEEgXCJGVU5DVElPTlwiIHRvIHNjb3BlICdhcmd1bWVudHMnXHJcbiAgICBpZiAoIXNlYXJjaGVzKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGZpbmQgdmFsdWUgY2FuIG5vdCBiZSA+PmZhbHN5PDxgKTtcclxuICAgIH1cclxuICAgIC8vIGlmIGl0cyBhIHN0cmluZy4uIGl0IG1heSBoYXZlIG90aGVyIHZhbHVlc1xyXG4gICAgLy8gZWxzZSBpdCBzb3VsZCBiZSBhbiBPYmplY3Qgb3IgQXJyYXkgb2YgbWFwZWQgdmFsdWVzXHJcbiAgICBjb25zdCBzZWFyY2hLZXlzID0gKHNlYXJjaGVzLmxlbmd0aCA9PT0gMSAmJiBBcnJheS5pc0FycmF5KHNlYXJjaGVzWzBdKSkgPyBzZWFyY2hlc1swXSA6IHNlYXJjaGVzO1xyXG4gICAgdGhpcy5ib2R5ID0gdGhpcy5wYXJjZUZpbmQoc2VhcmNoS2V5cyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHNldCBhbiBhbGlhcyBmb3IgdGhpcyByZXN1bHQuXHJcbiAgICogQHBhcmFtIGFsaWFzXHJcbiAgICovXHJcbiAgc2V0QWxpYXMoYWxpYXM6IHN0cmluZykge1xyXG4gICAgdGhpcy5hbGlhcyA9IGFsaWFzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRvIHRoZSBmb3JtYXR0ZWQgcXVlcnkgc3RyaW5nXHJcbiAgICogQHJldHVyblxyXG4gICAqL1xyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgaWYgKHRoaXMuYm9keSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgcmV0dXJuIHByb3BlcnRpZXMgYXJlIG5vdCBkZWZpbmVkLiB1c2UgdGhlICdmaW5kJyBmdW5jdGlvbiB0byBkZWZpbmVkIHRoZW1gKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYCR7KHRoaXMuYWxpYXMpID8gKHRoaXMuYWxpYXMgKyAnOicpIDogJyd9ICR7dGhpcy5xdWVyeUZuTmFtZX0gJHsodGhpcy5oZWFkLmxlbmd0aCA+IDApID8gJygnICsgdGhpcy5oZWFkLmpvaW4oJywnKSArICcpJyA6ICcnfSAgeyAke3RoaXMuYm9keX0gfWA7XHJcbiAgfVxyXG5cclxuICAvLyAtLVxyXG4gIC8vIFBSSVZBVEUgRlVOQ1RJT05TXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgcHJpdmF0ZSBwYXJjZUZpbmQoX2xldmVsQTogYW55W10pIHtcclxuICAgIGNvbnN0IHByb3BzQSA9IF9sZXZlbEEubWFwKChjdXJyZW50VmFsdWUsIGluZGV4KSA9PiB7XHJcbiAgICAgIGNvbnN0IGl0ZW1YID0gX2xldmVsQVtpbmRleF07XHJcblxyXG4gICAgICBpZiAoaXRlbVggaW5zdGFuY2VvZiBHcmFwaHFsUXVlcnlCdWlsZGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1YLnRvU3RyaW5nKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoaXRlbVgpICYmIHR5cGVvZiBpdGVtWCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBjb25zdCBwcm9wc0FBID0gT2JqZWN0LmtleXMoaXRlbVgpO1xyXG4gICAgICAgIGlmICgxICE9PSBwcm9wc0FBLmxlbmd0aCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYEFsaWFzIG9iamVjdHMgc2hvdWxkIG9ubHkgaGF2ZSBvbmUgdmFsdWUuIHdhcyBwYXNzZWQ6ICR7SlNPTi5zdHJpbmdpZnkoaXRlbVgpfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwcm9wUyA9IHByb3BzQUFbMF07XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1YW3Byb3BTXTtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcclxuICAgICAgICAgIHJldHVybiBuZXcgR3JhcGhxbFF1ZXJ5QnVpbGRlcihwcm9wUykuZmluZChpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGAke3Byb3BTfSA6ICR7aXRlbX0gYDtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbVggPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1YO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGBjYW5ub3QgaGFuZGxlIEZpbmQgdmFsdWUgb2YgJHtpdGVtWH1gKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHByb3BzQS5qb2luKCcsJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEdyYXBoUUxWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgdmFsdWUgPSB2YWx1ZS5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0R3JhcGhRTFZhbHVlKGl0ZW0pO1xyXG4gICAgICB9KS5qb2luKCk7XHJcbiAgICAgIHZhbHVlID0gYFske3ZhbHVlfV1gO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgdmFsdWUgPSB0aGlzLm9iamVjdFRvU3RyaW5nKHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb2JqZWN0VG9TdHJpbmcob2JqOiBhbnkpIHtcclxuICAgIGNvbnN0IHNvdXJjZUEgPSBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgT2JqZWN0LmtleXMob2JqKSkge1xyXG4gICAgICBpZiAodHlwZW9mIG9ialtwcm9wXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHNvdXJjZUEucHVzaChgJHtwcm9wfToke3RoaXMuZ2V0R3JhcGhRTFZhbHVlKG9ialtwcm9wXSl9YCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYHske3NvdXJjZUEuam9pbigpfX1gO1xyXG4gIH1cclxufVxyXG4iXX0=