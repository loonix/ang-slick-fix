/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *
 * SlickGrid Editor interface, more info can be found on the SlickGrid repo
 * https://github.com/6pac/SlickGrid/wiki/Writing-custom-cell-editors
 * @record
 */
export function Editor() { }
if (false) {
    /**
     * Initialize the Editor
     * @type {?}
     */
    Editor.prototype.init;
    /**
     * Saves the Editor value
     * @type {?|undefined}
     */
    Editor.prototype.save;
    /**
     * Cancels the Editor
     * @type {?|undefined}
     */
    Editor.prototype.cancel;
    /**
     * if implemented, this will be called if the cell being edited is scrolled out of the view
     * implement this is your UI is not appended to the cell itself or if you open any secondary
     * selector controls (like a calendar for a datepicker input)
     * @type {?|undefined}
     */
    Editor.prototype.hide;
    /**
     * pretty much the opposite of hide
     * @type {?|undefined}
     */
    Editor.prototype.show;
    /**
     * if implemented, this will be called by the grid if any of the cell containers are scrolled
     * and the absolute position of the edited cell is changed
     * if your UI is constructed as a child of document BODY, implement this to update the
     * position of the elements as the position of the cell changes
     *
     * the cellBox: { top, left, bottom, right, width, height, visible }
     * @type {?|undefined}
     */
    Editor.prototype.position;
    /**
     * remove all data, events & dom elements created in the constructor
     * @type {?}
     */
    Editor.prototype.destroy;
    /**
     * set the focus on the main input control (if any)
     * @type {?}
     */
    Editor.prototype.focus;
    /**
     * Deserialize the value(s) saved to "state" and apply them to the data item
     * this method may get called after the editor itself has been destroyed
     * treat it as an equivalent of a Java/C# "static" method - no instance variables should be accessed
     * @type {?}
     */
    Editor.prototype.applyValue;
    /**
     * Load the value(s) from the data item and update the UI
     * this method will be called immediately after the editor is initialized
     * it may also be called by the grid if if the row/cell being edited is updated via grid.updateRow/updateCell
     * @type {?}
     */
    Editor.prototype.loadValue;
    /**
     * Return the value(s) being edited by the user in a serialized form
     * can be an arbitrary object
     * the only restriction is that it must be a simple object that can be passed around even
     * when the editor itself has been destroyed
     * @type {?}
     */
    Editor.prototype.serializeValue;
    /**
     * return true if the value(s) being edited by the user has/have been changed
     * @type {?}
     */
    Editor.prototype.isValueChanged;
    /**
     * Validate user input and return the result along with the validation message, if any
     * if the input is valid, return {valid:true,msg:null}
     * @type {?}
     */
    Editor.prototype.validate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvbW9kZWxzL2VkaXRvci5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQU1BLDRCQWtFQzs7Ozs7O0lBaEVDLHNCQUFpQjs7Ozs7SUFHakIsc0JBQWtCOzs7OztJQUdsQix3QkFBb0I7Ozs7Ozs7SUFPcEIsc0JBQWtCOzs7OztJQUdsQixzQkFBa0I7Ozs7Ozs7Ozs7SUFVbEIsMEJBQW1DOzs7OztJQUduQyx5QkFBb0I7Ozs7O0lBR3BCLHVCQUFrQjs7Ozs7OztJQU9sQiw0QkFBNEM7Ozs7Ozs7SUFPNUMsMkJBQStCOzs7Ozs7OztJQVEvQixnQ0FBMEI7Ozs7O0lBRzFCLGdDQUE4Qjs7Ozs7O0lBTTlCLDBCQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVkaXRvclZhbGlkYXRvck91dHB1dCB9IGZyb20gJy4vZWRpdG9yVmFsaWRhdG9yT3V0cHV0LmludGVyZmFjZSc7XHJcblxyXG4vKioqXHJcbiAqIFNsaWNrR3JpZCBFZGl0b3IgaW50ZXJmYWNlLCBtb3JlIGluZm8gY2FuIGJlIGZvdW5kIG9uIHRoZSBTbGlja0dyaWQgcmVwb1xyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vNnBhYy9TbGlja0dyaWQvd2lraS9Xcml0aW5nLWN1c3RvbS1jZWxsLWVkaXRvcnNcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgRWRpdG9yIHtcclxuICAvKiogSW5pdGlhbGl6ZSB0aGUgRWRpdG9yICovXHJcbiAgaW5pdDogKCkgPT4gdm9pZDtcclxuXHJcbiAgLyoqIFNhdmVzIHRoZSBFZGl0b3IgdmFsdWUgKi9cclxuICBzYXZlPzogKCkgPT4gdm9pZDtcclxuXHJcbiAgLyoqIENhbmNlbHMgdGhlIEVkaXRvciAqL1xyXG4gIGNhbmNlbD86ICgpID0+IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIGlmIGltcGxlbWVudGVkLCB0aGlzIHdpbGwgYmUgY2FsbGVkIGlmIHRoZSBjZWxsIGJlaW5nIGVkaXRlZCBpcyBzY3JvbGxlZCBvdXQgb2YgdGhlIHZpZXdcclxuICAgKiBpbXBsZW1lbnQgdGhpcyBpcyB5b3VyIFVJIGlzIG5vdCBhcHBlbmRlZCB0byB0aGUgY2VsbCBpdHNlbGYgb3IgaWYgeW91IG9wZW4gYW55IHNlY29uZGFyeVxyXG4gICAqIHNlbGVjdG9yIGNvbnRyb2xzIChsaWtlIGEgY2FsZW5kYXIgZm9yIGEgZGF0ZXBpY2tlciBpbnB1dClcclxuICAgKi9cclxuICBoaWRlPzogKCkgPT4gdm9pZDtcclxuXHJcbiAgLyoqIHByZXR0eSBtdWNoIHRoZSBvcHBvc2l0ZSBvZiBoaWRlICovXHJcbiAgc2hvdz86ICgpID0+IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIGlmIGltcGxlbWVudGVkLCB0aGlzIHdpbGwgYmUgY2FsbGVkIGJ5IHRoZSBncmlkIGlmIGFueSBvZiB0aGUgY2VsbCBjb250YWluZXJzIGFyZSBzY3JvbGxlZFxyXG4gICAqIGFuZCB0aGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGVkaXRlZCBjZWxsIGlzIGNoYW5nZWRcclxuICAgKiBpZiB5b3VyIFVJIGlzIGNvbnN0cnVjdGVkIGFzIGEgY2hpbGQgb2YgZG9jdW1lbnQgQk9EWSwgaW1wbGVtZW50IHRoaXMgdG8gdXBkYXRlIHRoZVxyXG4gICAqIHBvc2l0aW9uIG9mIHRoZSBlbGVtZW50cyBhcyB0aGUgcG9zaXRpb24gb2YgdGhlIGNlbGwgY2hhbmdlc1xyXG4gICAqXHJcbiAgICogdGhlIGNlbGxCb3g6IHsgdG9wLCBsZWZ0LCBib3R0b20sIHJpZ2h0LCB3aWR0aCwgaGVpZ2h0LCB2aXNpYmxlIH1cclxuICAgKi9cclxuICBwb3NpdGlvbj86IChwb3NpdGlvbjogYW55KSA9PiB2b2lkO1xyXG5cclxuICAvKiogcmVtb3ZlIGFsbCBkYXRhLCBldmVudHMgJiBkb20gZWxlbWVudHMgY3JlYXRlZCBpbiB0aGUgY29uc3RydWN0b3IgKi9cclxuICBkZXN0cm95OiAoKSA9PiB2b2lkO1xyXG5cclxuICAvKiogc2V0IHRoZSBmb2N1cyBvbiB0aGUgbWFpbiBpbnB1dCBjb250cm9sIChpZiBhbnkpICovXHJcbiAgZm9jdXM6ICgpID0+IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIERlc2VyaWFsaXplIHRoZSB2YWx1ZShzKSBzYXZlZCB0byBcInN0YXRlXCIgYW5kIGFwcGx5IHRoZW0gdG8gdGhlIGRhdGEgaXRlbVxyXG4gICAqIHRoaXMgbWV0aG9kIG1heSBnZXQgY2FsbGVkIGFmdGVyIHRoZSBlZGl0b3IgaXRzZWxmIGhhcyBiZWVuIGRlc3Ryb3llZFxyXG4gICAqIHRyZWF0IGl0IGFzIGFuIGVxdWl2YWxlbnQgb2YgYSBKYXZhL0MjIFwic3RhdGljXCIgbWV0aG9kIC0gbm8gaW5zdGFuY2UgdmFyaWFibGVzIHNob3VsZCBiZSBhY2Nlc3NlZFxyXG4gICAqL1xyXG4gIGFwcGx5VmFsdWU6IChpdGVtOiBhbnksIHN0YXRlOiBhbnkpID0+IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIExvYWQgdGhlIHZhbHVlKHMpIGZyb20gdGhlIGRhdGEgaXRlbSBhbmQgdXBkYXRlIHRoZSBVSVxyXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSBlZGl0b3IgaXMgaW5pdGlhbGl6ZWRcclxuICAgKiBpdCBtYXkgYWxzbyBiZSBjYWxsZWQgYnkgdGhlIGdyaWQgaWYgaWYgdGhlIHJvdy9jZWxsIGJlaW5nIGVkaXRlZCBpcyB1cGRhdGVkIHZpYSBncmlkLnVwZGF0ZVJvdy91cGRhdGVDZWxsXHJcbiAgICovXHJcbiAgbG9hZFZhbHVlOiAoaXRlbTogYW55KSA9PiB2b2lkO1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gdGhlIHZhbHVlKHMpIGJlaW5nIGVkaXRlZCBieSB0aGUgdXNlciBpbiBhIHNlcmlhbGl6ZWQgZm9ybVxyXG4gICAqIGNhbiBiZSBhbiBhcmJpdHJhcnkgb2JqZWN0XHJcbiAgICogdGhlIG9ubHkgcmVzdHJpY3Rpb24gaXMgdGhhdCBpdCBtdXN0IGJlIGEgc2ltcGxlIG9iamVjdCB0aGF0IGNhbiBiZSBwYXNzZWQgYXJvdW5kIGV2ZW5cclxuICAgKiB3aGVuIHRoZSBlZGl0b3IgaXRzZWxmIGhhcyBiZWVuIGRlc3Ryb3llZFxyXG4gICAqL1xyXG4gIHNlcmlhbGl6ZVZhbHVlOiAoKSA9PiBhbnk7XHJcblxyXG4gIC8qKiByZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUocykgYmVpbmcgZWRpdGVkIGJ5IHRoZSB1c2VyIGhhcy9oYXZlIGJlZW4gY2hhbmdlZCAqL1xyXG4gIGlzVmFsdWVDaGFuZ2VkOiAoKSA9PiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBWYWxpZGF0ZSB1c2VyIGlucHV0IGFuZCByZXR1cm4gdGhlIHJlc3VsdCBhbG9uZyB3aXRoIHRoZSB2YWxpZGF0aW9uIG1lc3NhZ2UsIGlmIGFueVxyXG4gICAqIGlmIHRoZSBpbnB1dCBpcyB2YWxpZCwgcmV0dXJuIHt2YWxpZDp0cnVlLG1zZzpudWxsfVxyXG4gICAqL1xyXG4gIHZhbGlkYXRlOiAoKSA9PiBFZGl0b3JWYWxpZGF0b3JPdXRwdXQ7XHJcbn1cclxuIl19