/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * This GraphqlQueryBuilder class is a lib that already exist
 * but was causing issues with TypeScript, RequireJS and other bundler/packagers
 * and so I rewrote it in pure TypeScript.
 *
 * The previous lib can be viewed here at this Github
 * https://github.com/codemeasandwich/graphql-query-builder
 */
var /**
 * This GraphqlQueryBuilder class is a lib that already exist
 * but was causing issues with TypeScript, RequireJS and other bundler/packagers
 * and so I rewrote it in pure TypeScript.
 *
 * The previous lib can be viewed here at this Github
 * https://github.com/codemeasandwich/graphql-query-builder
 */
GraphqlQueryBuilder = /** @class */ (function () {
    /* Constructor, query/mutator you wish to use, and an alias or filter arguments. */
    function GraphqlQueryBuilder(queryFnName, aliasOrFilter) {
        this.queryFnName = queryFnName;
        this.head = [];
        if (typeof aliasOrFilter === 'function') {
            this.alias = aliasOrFilter;
        }
        else if (typeof aliasOrFilter === 'object') {
            this.filter(aliasOrFilter);
        }
        else if (undefined === aliasOrFilter && 2 === arguments.length) {
            throw new TypeError("You have passed undefined as Second argument to \"Query\"");
        }
        else if (undefined !== aliasOrFilter) {
            throw new TypeError("Second argument to \"Query\" should be an alias name(String) or filter arguments(Object). was passed " + aliasOrFilter);
        }
    }
    /**
     * The parameters to run the query against.
     * @param filters An object mapping attribute to values
     */
    /**
     * The parameters to run the query against.
     * @template THIS
     * @this {THIS}
     * @param {?} filters An object mapping attribute to values
     * @return {THIS}
     */
    GraphqlQueryBuilder.prototype.filter = /**
     * The parameters to run the query against.
     * @template THIS
     * @this {THIS}
     * @param {?} filters An object mapping attribute to values
     * @return {THIS}
     */
    function (filters) {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(Object.keys(filters)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var prop = _c.value;
                if (typeof filters[prop] === 'function') {
                    continue;
                }
                /** @type {?} */
                var val = (/** @type {?} */ (this)).getGraphQLValue(filters[prop]);
                if (val === '{}') {
                    continue;
                }
                (/** @type {?} */ (this)).head.push(prop + ":" + val);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return (/** @type {?} */ (this));
    };
    /**
     * Outlines the properties you wish to be returned from the query.
     * @param properties representing each attribute you want Returned
     */
    /**
     * Outlines the properties you wish to be returned from the query.
     * @template THIS
     * @this {THIS}
     * @param {...?} searches
     * @return {THIS}
     */
    GraphqlQueryBuilder.prototype.find = /**
     * Outlines the properties you wish to be returned from the query.
     * @template THIS
     * @this {THIS}
     * @param {...?} searches
     * @return {THIS}
     */
    function () {
        var searches = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            searches[_i] = arguments[_i];
        }
        if (!searches) {
            throw new TypeError("find value can not be >>falsy<<");
        }
        // if its a string.. it may have other values
        // else it sould be an Object or Array of maped values
        /** @type {?} */
        var searchKeys = (searches.length === 1 && Array.isArray(searches[0])) ? searches[0] : searches;
        (/** @type {?} */ (this)).body = (/** @type {?} */ (this)).parceFind(searchKeys);
        return (/** @type {?} */ (this));
    };
    /**
     * set an alias for this result.
     * @param alias
     */
    /**
     * set an alias for this result.
     * @param {?} alias
     * @return {?}
     */
    GraphqlQueryBuilder.prototype.setAlias = /**
     * set an alias for this result.
     * @param {?} alias
     * @return {?}
     */
    function (alias) {
        this.alias = alias;
    };
    /**
     * Return to the formatted query string
     * @return
     */
    /**
     * Return to the formatted query string
     * @return {?}
     */
    GraphqlQueryBuilder.prototype.toString = /**
     * Return to the formatted query string
     * @return {?}
     */
    function () {
        if (this.body === undefined) {
            throw new ReferenceError("return properties are not defined. use the 'find' function to defined them");
        }
        return ((this.alias) ? (this.alias + ':') : '') + " " + this.queryFnName + " " + ((this.head.length > 0) ? '(' + this.head.join(',') + ')' : '') + "  { " + this.body + " }";
    };
    // --
    // PRIVATE FUNCTIONS
    // -----------------
    // --
    // PRIVATE FUNCTIONS
    // -----------------
    /**
     * @private
     * @param {?} _levelA
     * @return {?}
     */
    GraphqlQueryBuilder.prototype.parceFind = 
    // --
    // PRIVATE FUNCTIONS
    // -----------------
    /**
     * @private
     * @param {?} _levelA
     * @return {?}
     */
    function (_levelA) {
        /** @type {?} */
        var propsA = _levelA.map((/**
         * @param {?} currentValue
         * @param {?} index
         * @return {?}
         */
        function (currentValue, index) {
            /** @type {?} */
            var itemX = _levelA[index];
            if (itemX instanceof GraphqlQueryBuilder) {
                return itemX.toString();
            }
            else if (!Array.isArray(itemX) && typeof itemX === 'object') {
                /** @type {?} */
                var propsAA = Object.keys(itemX);
                if (1 !== propsAA.length) {
                    throw new RangeError("Alias objects should only have one value. was passed: " + JSON.stringify(itemX));
                }
                /** @type {?} */
                var propS = propsAA[0];
                /** @type {?} */
                var item = itemX[propS];
                if (Array.isArray(item)) {
                    return new GraphqlQueryBuilder(propS).find(item);
                }
                return propS + " : " + item + " ";
            }
            else if (typeof itemX === 'string') {
                return itemX;
            }
            else {
                throw new RangeError("cannot handle Find value of " + itemX);
            }
        }));
        return propsA.join(',');
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    GraphqlQueryBuilder.prototype.getGraphQLValue = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (typeof value === 'string') {
            value = JSON.stringify(value);
        }
        else if (Array.isArray(value)) {
            value = value.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                return _this.getGraphQLValue(item);
            })).join();
            value = "[" + value + "]";
        }
        else if (value instanceof Date) {
            value = JSON.stringify(value);
        }
        else if (value !== null && typeof value === 'object') {
            value = this.objectToString(value);
        }
        return value;
    };
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    GraphqlQueryBuilder.prototype.objectToString = /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        var e_2, _a;
        /** @type {?} */
        var sourceA = [];
        try {
            for (var _b = tslib_1.__values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var prop = _c.value;
                if (typeof obj[prop] === 'function') {
                    continue;
                }
                sourceA.push(prop + ":" + this.getGraphQLValue(obj[prop]));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return "{" + sourceA.join() + "}";
    };
    return GraphqlQueryBuilder;
}());
/**
 * This GraphqlQueryBuilder class is a lib that already exist
 * but was causing issues with TypeScript, RequireJS and other bundler/packagers
 * and so I rewrote it in pure TypeScript.
 *
 * The previous lib can be viewed here at this Github
 * https://github.com/codemeasandwich/graphql-query-builder
 */
export default GraphqlQueryBuilder;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbFF1ZXJ5QnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvc2VydmljZXMvZ3JhcGhxbFF1ZXJ5QnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBUUE7Ozs7Ozs7OztJQUtFLG1GQUFtRjtJQUNuRiw2QkFBb0IsV0FBbUIsRUFBRSxhQUErQjtRQUFwRCxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUp2QyxTQUFJLEdBQVUsRUFBRSxDQUFDO1FBS2YsSUFBSSxPQUFPLGFBQWEsS0FBSyxVQUFVLEVBQUU7WUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7U0FDNUI7YUFBTSxJQUFJLE9BQU8sYUFBYSxLQUFLLFFBQVEsRUFBRTtZQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzVCO2FBQU0sSUFBSSxTQUFTLEtBQUssYUFBYSxJQUFJLENBQUMsS0FBSyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ2hFLE1BQU0sSUFBSSxTQUFTLENBQUMsMkRBQXlELENBQUMsQ0FBQztTQUNoRjthQUFNLElBQUksU0FBUyxLQUFLLGFBQWEsRUFBRTtZQUN0QyxNQUFNLElBQUksU0FBUyxDQUFDLDBHQUFzRyxhQUFlLENBQUMsQ0FBQztTQUM1STtJQUNILENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7O0lBQ0gsb0NBQU07Ozs7Ozs7SUFBTixVQUFPLE9BQVk7OztZQUNqQixLQUFtQixJQUFBLEtBQUEsaUJBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBcEMsSUFBTSxJQUFJLFdBQUE7Z0JBQ2IsSUFBSSxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLEVBQUU7b0JBQ3ZDLFNBQVM7aUJBQ1Y7O29CQUNLLEdBQUcsR0FB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QyxLQUFLLENBQUMsQ0FBQztTQUNwQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7O0lBRU8sNENBQWM7Ozs7O0lBQXRCLFVBQXVCLEdBQVE7OztZQUN2QixPQUFPLEdBQUcsRUFBRTs7WUFFbEIsS0FBbUIsSUFBQSxLQUFBLGlCQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQWhDLElBQU0sSUFBSSxXQUFBO2dCQUNiLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssVUFBVSxFQUFFO29CQUNuQyxTQUFTO2lCQUNWO2dCQUNELE9BQU8sQ0FBQyxJQUFJLENBQUksSUFBSSxTQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFHLENBQUMsQ0FBQzthQUM1RDs7Ozs7Ozs7O1FBQ0QsT0FBTyxNQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBRyxDQUFDO0lBQy9CLENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUFsSUQsSUFrSUM7Ozs7Ozs7Ozs7OztJQWpJQyxvQ0FBeUI7O0lBQ3pCLG1DQUFpQjs7SUFDakIsbUNBQVU7Ozs7O0lBR0UsMENBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFRoaXMgR3JhcGhxbFF1ZXJ5QnVpbGRlciBjbGFzcyBpcyBhIGxpYiB0aGF0IGFscmVhZHkgZXhpc3RcclxuICogYnV0IHdhcyBjYXVzaW5nIGlzc3VlcyB3aXRoIFR5cGVTY3JpcHQsIFJlcXVpcmVKUyBhbmQgb3RoZXIgYnVuZGxlci9wYWNrYWdlcnNcclxuICogYW5kIHNvIEkgcmV3cm90ZSBpdCBpbiBwdXJlIFR5cGVTY3JpcHQuXHJcbiAqXHJcbiAqIFRoZSBwcmV2aW91cyBsaWIgY2FuIGJlIHZpZXdlZCBoZXJlIGF0IHRoaXMgR2l0aHViXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jb2RlbWVhc2FuZHdpY2gvZ3JhcGhxbC1xdWVyeS1idWlsZGVyXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaHFsUXVlcnlCdWlsZGVyIHtcclxuICBhbGlhczogc3RyaW5nIHwgRnVuY3Rpb247XHJcbiAgaGVhZDogYW55W10gPSBbXTtcclxuICBib2R5OiBhbnk7XHJcblxyXG4gIC8qIENvbnN0cnVjdG9yLCBxdWVyeS9tdXRhdG9yIHlvdSB3aXNoIHRvIHVzZSwgYW5kIGFuIGFsaWFzIG9yIGZpbHRlciBhcmd1bWVudHMuICovXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBxdWVyeUZuTmFtZTogc3RyaW5nLCBhbGlhc09yRmlsdGVyPzogc3RyaW5nIHwgb2JqZWN0KSB7XHJcbiAgICBpZiAodHlwZW9mIGFsaWFzT3JGaWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy5hbGlhcyA9IGFsaWFzT3JGaWx0ZXI7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhbGlhc09yRmlsdGVyID09PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aGlzLmZpbHRlcihhbGlhc09yRmlsdGVyKTtcclxuICAgIH0gZWxzZSBpZiAodW5kZWZpbmVkID09PSBhbGlhc09yRmlsdGVyICYmIDIgPT09IGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgWW91IGhhdmUgcGFzc2VkIHVuZGVmaW5lZCBhcyBTZWNvbmQgYXJndW1lbnQgdG8gXCJRdWVyeVwiYCk7XHJcbiAgICB9IGVsc2UgaWYgKHVuZGVmaW5lZCAhPT0gYWxpYXNPckZpbHRlcikge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBTZWNvbmQgYXJndW1lbnQgdG8gXCJRdWVyeVwiIHNob3VsZCBiZSBhbiBhbGlhcyBuYW1lKFN0cmluZykgb3IgZmlsdGVyIGFyZ3VtZW50cyhPYmplY3QpLiB3YXMgcGFzc2VkICR7YWxpYXNPckZpbHRlcn1gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBwYXJhbWV0ZXJzIHRvIHJ1biB0aGUgcXVlcnkgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gZmlsdGVycyBBbiBvYmplY3QgbWFwcGluZyBhdHRyaWJ1dGUgdG8gdmFsdWVzXHJcbiAgICovXHJcbiAgZmlsdGVyKGZpbHRlcnM6IGFueSkge1xyXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5rZXlzKGZpbHRlcnMpKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgZmlsdGVyc1twcm9wXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHZhbCA9IHRoaXMuZ2V0R3JhcGhRTFZhbHVlKGZpbHRlcnNbcHJvcF0pO1xyXG4gICAgICBpZiAodmFsID09PSAne30nKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5oZWFkLnB1c2goYCR7cHJvcH06JHt2YWx9YCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE91dGxpbmVzIHRoZSBwcm9wZXJ0aWVzIHlvdSB3aXNoIHRvIGJlIHJldHVybmVkIGZyb20gdGhlIHF1ZXJ5LlxyXG4gICAqIEBwYXJhbSBwcm9wZXJ0aWVzIHJlcHJlc2VudGluZyBlYWNoIGF0dHJpYnV0ZSB5b3Ugd2FudCBSZXR1cm5lZFxyXG4gICAqL1xyXG4gIGZpbmQoLi4uc2VhcmNoZXM6IGFueVtdKSB7IC8vIFRISVMgTkVFRCBUTyBCRSBBIFwiRlVOQ1RJT05cIiB0byBzY29wZSAnYXJndW1lbnRzJ1xyXG4gICAgaWYgKCFzZWFyY2hlcykge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBmaW5kIHZhbHVlIGNhbiBub3QgYmUgPj5mYWxzeTw8YCk7XHJcbiAgICB9XHJcbiAgICAvLyBpZiBpdHMgYSBzdHJpbmcuLiBpdCBtYXkgaGF2ZSBvdGhlciB2YWx1ZXNcclxuICAgIC8vIGVsc2UgaXQgc291bGQgYmUgYW4gT2JqZWN0IG9yIEFycmF5IG9mIG1hcGVkIHZhbHVlc1xyXG4gICAgY29uc3Qgc2VhcmNoS2V5cyA9IChzZWFyY2hlcy5sZW5ndGggPT09IDEgJiYgQXJyYXkuaXNBcnJheShzZWFyY2hlc1swXSkpID8gc2VhcmNoZXNbMF0gOiBzZWFyY2hlcztcclxuICAgIHRoaXMuYm9keSA9IHRoaXMucGFyY2VGaW5kKHNlYXJjaEtleXMpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzZXQgYW4gYWxpYXMgZm9yIHRoaXMgcmVzdWx0LlxyXG4gICAqIEBwYXJhbSBhbGlhc1xyXG4gICAqL1xyXG4gIHNldEFsaWFzKGFsaWFzOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuYWxpYXMgPSBhbGlhcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0byB0aGUgZm9ybWF0dGVkIHF1ZXJ5IHN0cmluZ1xyXG4gICAqIEByZXR1cm5cclxuICAgKi9cclxuICB0b1N0cmluZygpIHtcclxuICAgIGlmICh0aGlzLmJvZHkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoYHJldHVybiBwcm9wZXJ0aWVzIGFyZSBub3QgZGVmaW5lZC4gdXNlIHRoZSAnZmluZCcgZnVuY3Rpb24gdG8gZGVmaW5lZCB0aGVtYCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGAkeyh0aGlzLmFsaWFzKSA/ICh0aGlzLmFsaWFzICsgJzonKSA6ICcnfSAke3RoaXMucXVlcnlGbk5hbWV9ICR7KHRoaXMuaGVhZC5sZW5ndGggPiAwKSA/ICcoJyArIHRoaXMuaGVhZC5qb2luKCcsJykgKyAnKScgOiAnJ30gIHsgJHt0aGlzLmJvZHl9IH1gO1xyXG4gIH1cclxuXHJcbiAgLy8gLS1cclxuICAvLyBQUklWQVRFIEZVTkNUSU9OU1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIHByaXZhdGUgcGFyY2VGaW5kKF9sZXZlbEE6IGFueVtdKSB7XHJcbiAgICBjb25zdCBwcm9wc0EgPSBfbGV2ZWxBLm1hcCgoY3VycmVudFZhbHVlLCBpbmRleCkgPT4ge1xyXG4gICAgICBjb25zdCBpdGVtWCA9IF9sZXZlbEFbaW5kZXhdO1xyXG5cclxuICAgICAgaWYgKGl0ZW1YIGluc3RhbmNlb2YgR3JhcGhxbFF1ZXJ5QnVpbGRlcikge1xyXG4gICAgICAgIHJldHVybiBpdGVtWC50b1N0cmluZygpO1xyXG4gICAgICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGl0ZW1YKSAmJiB0eXBlb2YgaXRlbVggPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgY29uc3QgcHJvcHNBQSA9IE9iamVjdC5rZXlzKGl0ZW1YKTtcclxuICAgICAgICBpZiAoMSAhPT0gcHJvcHNBQS5sZW5ndGgpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGBBbGlhcyBvYmplY3RzIHNob3VsZCBvbmx5IGhhdmUgb25lIHZhbHVlLiB3YXMgcGFzc2VkOiAke0pTT04uc3RyaW5naWZ5KGl0ZW1YKX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcHJvcFMgPSBwcm9wc0FBWzBdO1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtWFtwcm9wU107XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XHJcbiAgICAgICAgICByZXR1cm4gbmV3IEdyYXBocWxRdWVyeUJ1aWxkZXIocHJvcFMpLmZpbmQoaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBgJHtwcm9wU30gOiAke2l0ZW19IGA7XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW1YID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHJldHVybiBpdGVtWDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgY2Fubm90IGhhbmRsZSBGaW5kIHZhbHVlIG9mICR7aXRlbVh9YCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBwcm9wc0Euam9pbignLCcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRHcmFwaFFMVmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgIHZhbHVlID0gdmFsdWUubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEdyYXBoUUxWYWx1ZShpdGVtKTtcclxuICAgICAgfSkuam9pbigpO1xyXG4gICAgICB2YWx1ZSA9IGBbJHt2YWx1ZX1dYDtcclxuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHZhbHVlID0gdGhpcy5vYmplY3RUb1N0cmluZyh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9iamVjdFRvU3RyaW5nKG9iajogYW55KSB7XHJcbiAgICBjb25zdCBzb3VyY2VBID0gW107XHJcblxyXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5rZXlzKG9iaikpIHtcclxuICAgICAgaWYgKHR5cGVvZiBvYmpbcHJvcF0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBzb3VyY2VBLnB1c2goYCR7cHJvcH06JHt0aGlzLmdldEdyYXBoUUxWYWx1ZShvYmpbcHJvcF0pfWApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGB7JHtzb3VyY2VBLmpvaW4oKX19YDtcclxuICB9XHJcbn1cclxuIl19