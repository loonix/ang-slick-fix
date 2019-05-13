/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { sanitizeHtmlToText } from '../services/utilities';
import { SharedService } from '../services/shared.service';
var CellExternalCopyManagerExtension = /** @class */ (function () {
    function CellExternalCopyManagerExtension(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
    }
    /**
     * @return {?}
     */
    CellExternalCopyManagerExtension.prototype.dispose = /**
     * @return {?}
     */
    function () {
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    };
    /**
     * @return {?}
     */
    CellExternalCopyManagerExtension.prototype.register = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.cellExternalCopyManager);
            this.createUndoRedoBuffer();
            this.hookUndoShortcutKey();
            /** @type {?} */
            var newRowIds_1 = 0;
            /** @type {?} */
            var pluginOptions = {
                clipboardCommandHandler: (/**
                 * @param {?} editCommand
                 * @return {?}
                 */
                function (editCommand) {
                    _this._undoRedoBuffer.queueAndExecuteCommand.call(_this._undoRedoBuffer, editCommand);
                }),
                dataItemColumnValueExtractor: (/**
                 * @param {?} item
                 * @param {?} columnDef
                 * @return {?}
                 */
                function (item, columnDef) {
                    // when grid or cell is not editable, we will possibly evaluate the Formatter if it was passed
                    // to decide if we evaluate the Formatter, we will use the same flag from Export which is "exportWithFormatter"
                    if (!_this.sharedService.gridOptions.editable || !columnDef.editor) {
                        /** @type {?} */
                        var isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : (_this.sharedService.gridOptions.exportOptions && _this.sharedService.gridOptions.exportOptions.exportWithFormatter);
                        if (columnDef.formatter && isEvaluatingFormatter) {
                            /** @type {?} */
                            var formattedOutput = columnDef.formatter(0, 0, item[columnDef.field], columnDef, item, _this.sharedService.grid);
                            if (columnDef.sanitizeDataExport || (_this.sharedService.gridOptions.exportOptions && _this.sharedService.gridOptions.exportOptions.sanitizeDataExport)) {
                                /** @type {?} */
                                var outputString = (/** @type {?} */ (formattedOutput));
                                if (formattedOutput && typeof formattedOutput === 'object' && formattedOutput.hasOwnProperty('text')) {
                                    outputString = formattedOutput.text;
                                }
                                if (outputString === null) {
                                    outputString = '';
                                }
                                return sanitizeHtmlToText(outputString);
                            }
                            return formattedOutput;
                        }
                    }
                    // else use the default "dataItemColumnValueExtractor" from the plugin itself
                    // we can do that by setting back the getter with null
                    return null;
                }),
                readOnlyMode: false,
                includeHeaderWhenCopying: false,
                newRowCreator: (/**
                 * @param {?} count
                 * @return {?}
                 */
                function (count) {
                    for (var i = 0; i < count; i++) {
                        /** @type {?} */
                        var item = {
                            id: 'newRow_' + newRowIds_1++
                        };
                        _this.sharedService.grid.getData().addItem(item);
                    }
                })
            };
            this.sharedService.grid.setSelectionModel(new Slick.CellSelectionModel());
            this._extension = new Slick.CellExternalCopyManager(pluginOptions);
            this.sharedService.grid.registerPlugin(this._extension);
            return this._extension;
        }
        return null;
    };
    /** Create an undo redo buffer used by the Excel like copy */
    /**
     * Create an undo redo buffer used by the Excel like copy
     * @private
     * @return {?}
     */
    CellExternalCopyManagerExtension.prototype.createUndoRedoBuffer = /**
     * Create an undo redo buffer used by the Excel like copy
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var commandQueue = [];
        /** @type {?} */
        var commandCtr = 0;
        this._undoRedoBuffer = {
            queueAndExecuteCommand: (/**
             * @param {?} editCommand
             * @return {?}
             */
            function (editCommand) {
                commandQueue[commandCtr] = editCommand;
                commandCtr++;
                editCommand.execute();
            }),
            undo: (/**
             * @return {?}
             */
            function () {
                if (commandCtr === 0) {
                    return;
                }
                commandCtr--;
                /** @type {?} */
                var command = commandQueue[commandCtr];
                if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                    command.undo();
                }
            }),
            redo: (/**
             * @return {?}
             */
            function () {
                if (commandCtr >= commandQueue.length) {
                    return;
                }
                /** @type {?} */
                var command = commandQueue[commandCtr];
                commandCtr++;
                if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                    command.execute();
                }
            })
        };
    };
    /** Attach an undo shortcut key hook that will redo/undo the copy buffer */
    /**
     * Attach an undo shortcut key hook that will redo/undo the copy buffer
     * @private
     * @return {?}
     */
    CellExternalCopyManagerExtension.prototype.hookUndoShortcutKey = /**
     * Attach an undo shortcut key hook that will redo/undo the copy buffer
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        // undo shortcut
        $(document).keydown((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (e.which === 90 && (e.ctrlKey || e.metaKey)) { // CTRL + (shift) + Z
                if (e.shiftKey) {
                    _this._undoRedoBuffer.redo();
                }
                else {
                    _this._undoRedoBuffer.undo();
                }
            }
        }));
    };
    CellExternalCopyManagerExtension.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CellExternalCopyManagerExtension.ctorParameters = function () { return [
        { type: ExtensionUtility },
        { type: SharedService }
    ]; };
    return CellExternalCopyManagerExtension;
}());
export { CellExternalCopyManagerExtension };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CellExternalCopyManagerExtension.prototype._extension;
    /**
     * @type {?}
     * @private
     */
    CellExternalCopyManagerExtension.prototype._undoRedoBuffer;
    /**
     * @type {?}
     * @private
     */
    CellExternalCopyManagerExtension.prototype.extensionUtility;
    /**
     * @type {?}
     * @private
     */
    CellExternalCopyManagerExtension.prototype.sharedService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbEV4dGVybmFsQ29weU1hbmFnZXJFeHRlbnNpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2V4dGVuc2lvbnMvY2VsbEV4dGVybmFsQ29weU1hbmFnZXJFeHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFxQixhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFNM0Q7SUFLRSwwQ0FBb0IsZ0JBQWtDLEVBQVUsYUFBNEI7UUFBeEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQUksQ0FBQzs7OztJQUVqRyxrREFBTzs7O0lBQVA7UUFDRSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7Ozs7SUFFRCxtREFBUTs7O0lBQVI7UUFBQSxpQkFvREM7UUFuREMsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFO1lBQ25GLHlEQUF5RDtZQUN6RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLG9CQUFv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QUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsQ0FBTTtZQUN6QixJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBSyxxQkFBcUI7Z0JBQ3hFLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRTtvQkFDZCxLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUM3QjtxQkFBTTtvQkFDTCxLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUM3QjthQUNGO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOztnQkE1R0YsVUFBVTs7OztnQkFSRixnQkFBZ0I7Z0JBRWhCLGFBQWE7O0lBbUh0Qix1Q0FBQztDQUFBLEFBN0dELElBNkdDO1NBNUdZLGdDQUFnQzs7Ozs7O0lBQzNDLHNEQUF3Qjs7Ozs7SUFDeEIsMkRBQTZCOzs7OztJQUVqQiw0REFBMEM7Ozs7O0lBQUUseURBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29sdW1uLCBFeHRlbnNpb24sIEV4dGVuc2lvbk5hbWUgfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHsgRXh0ZW5zaW9uVXRpbGl0eSB9IGZyb20gJy4vZXh0ZW5zaW9uVXRpbGl0eSc7XG5pbXBvcnQgeyBzYW5pdGl6ZUh0bWxUb1RleHQgfSBmcm9tICcuLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlJztcblxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENlbGxFeHRlcm5hbENvcHlNYW5hZ2VyRXh0ZW5zaW9uIGltcGxlbWVudHMgRXh0ZW5zaW9uIHtcbiAgcHJpdmF0ZSBfZXh0ZW5zaW9uOiBhbnk7XG4gIHByaXZhdGUgX3VuZG9SZWRvQnVmZmVyOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBleHRlbnNpb25VdGlsaXR5OiBFeHRlbnNpb25VdGlsaXR5LCBwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UpIHsgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgaWYgKHRoaXMuX2V4dGVuc2lvbiAmJiB0aGlzLl9leHRlbnNpb24uZGVzdHJveSkge1xuICAgICAgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3RlcigpOiBhbnkge1xuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zKSB7XG4gICAgICAvLyBkeW5hbWljYWxseSBpbXBvcnQgdGhlIFNsaWNrR3JpZCBwbHVnaW4gd2l0aCByZXF1aXJlSlNcbiAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5sb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoRXh0ZW5zaW9uTmFtZS5jZWxsRXh0ZXJuYWxDb3B5TWFuYWdlcik7XG4gICAgICB0aGlzLmNyZWF0ZVVuZG9SZWRvQnVmZmVyKCk7XG4gICAgICB0aGlzLmhvb2tVbmRvU2hvcnRjdXRLZXkoKTtcbiAgICAgIGxldCBuZXdSb3dJZHMgPSAwO1xuICAgICAgY29uc3QgcGx1Z2luT3B0aW9ucyA9IHtcbiAgICAgICAgY2xpcGJvYXJkQ29tbWFuZEhhbmRsZXI6IChlZGl0Q29tbWFuZDogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5fdW5kb1JlZG9CdWZmZXIucXVldWVBbmRFeGVjdXRlQ29tbWFuZC5jYWxsKHRoaXMuX3VuZG9SZWRvQnVmZmVyLCBlZGl0Q29tbWFuZCk7XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFJdGVtQ29sdW1uVmFsdWVFeHRyYWN0b3I6IChpdGVtOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uKSA9PiB7XG4gICAgICAgICAgLy8gd2hlbiBncmlkIG9yIGNlbGwgaXMgbm90IGVkaXRhYmxlLCB3ZSB3aWxsIHBvc3NpYmx5IGV2YWx1YXRlIHRoZSBGb3JtYXR0ZXIgaWYgaXQgd2FzIHBhc3NlZFxuICAgICAgICAgIC8vIHRvIGRlY2lkZSBpZiB3ZSBldmFsdWF0ZSB0aGUgRm9ybWF0dGVyLCB3ZSB3aWxsIHVzZSB0aGUgc2FtZSBmbGFnIGZyb20gRXhwb3J0IHdoaWNoIGlzIFwiZXhwb3J0V2l0aEZvcm1hdHRlclwiXG4gICAgICAgICAgaWYgKCF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZWRpdGFibGUgfHwgIWNvbHVtbkRlZi5lZGl0b3IpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzRXZhbHVhdGluZ0Zvcm1hdHRlciA9IChjb2x1bW5EZWYuZXhwb3J0V2l0aEZvcm1hdHRlciAhPT0gdW5kZWZpbmVkKSA/IGNvbHVtbkRlZi5leHBvcnRXaXRoRm9ybWF0dGVyIDogKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5leHBvcnRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5leHBvcnRPcHRpb25zLmV4cG9ydFdpdGhGb3JtYXR0ZXIpO1xuICAgICAgICAgICAgaWYgKGNvbHVtbkRlZi5mb3JtYXR0ZXIgJiYgaXNFdmFsdWF0aW5nRm9ybWF0dGVyKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZE91dHB1dCA9IGNvbHVtbkRlZi5mb3JtYXR0ZXIoMCwgMCwgaXRlbVtjb2x1bW5EZWYuZmllbGRdLCBjb2x1bW5EZWYsIGl0ZW0sIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkKTtcbiAgICAgICAgICAgICAgaWYgKGNvbHVtbkRlZi5zYW5pdGl6ZURhdGFFeHBvcnQgfHwgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5leHBvcnRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5leHBvcnRPcHRpb25zLnNhbml0aXplRGF0YUV4cG9ydCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgb3V0cHV0U3RyaW5nID0gZm9ybWF0dGVkT3V0cHV0IGFzIHN0cmluZztcbiAgICAgICAgICAgICAgICBpZiAoZm9ybWF0dGVkT3V0cHV0ICYmIHR5cGVvZiBmb3JtYXR0ZWRPdXRwdXQgPT09ICdvYmplY3QnICYmIGZvcm1hdHRlZE91dHB1dC5oYXNPd25Qcm9wZXJ0eSgndGV4dCcpKSB7XG4gICAgICAgICAgICAgICAgICBvdXRwdXRTdHJpbmcgPSBmb3JtYXR0ZWRPdXRwdXQudGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG91dHB1dFN0cmluZyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgb3V0cHV0U3RyaW5nID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzYW5pdGl6ZUh0bWxUb1RleHQob3V0cHV0U3RyaW5nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0dGVkT3V0cHV0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBlbHNlIHVzZSB0aGUgZGVmYXVsdCBcImRhdGFJdGVtQ29sdW1uVmFsdWVFeHRyYWN0b3JcIiBmcm9tIHRoZSBwbHVnaW4gaXRzZWxmXG4gICAgICAgICAgLy8gd2UgY2FuIGRvIHRoYXQgYnkgc2V0dGluZyBiYWNrIHRoZSBnZXR0ZXIgd2l0aCBudWxsXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIHJlYWRPbmx5TW9kZTogZmFsc2UsXG4gICAgICAgIGluY2x1ZGVIZWFkZXJXaGVuQ29weWluZzogZmFsc2UsXG4gICAgICAgIG5ld1Jvd0NyZWF0b3I6IChjb3VudDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0ge1xuICAgICAgICAgICAgICBpZDogJ25ld1Jvd18nICsgbmV3Um93SWRzKytcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXREYXRhKCkuYWRkSXRlbShpdGVtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRTZWxlY3Rpb25Nb2RlbChuZXcgU2xpY2suQ2VsbFNlbGVjdGlvbk1vZGVsKCkpO1xuICAgICAgdGhpcy5fZXh0ZW5zaW9uID0gbmV3IFNsaWNrLkNlbGxFeHRlcm5hbENvcHlNYW5hZ2VyKHBsdWdpbk9wdGlvbnMpO1xuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQucmVnaXN0ZXJQbHVnaW4odGhpcy5fZXh0ZW5zaW9uKTtcbiAgICAgIHJldHVybiB0aGlzLl9leHRlbnNpb247XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqIENyZWF0ZSBhbiB1bmRvIHJlZG8gYnVmZmVyIHVzZWQgYnkgdGhlIEV4Y2VsIGxpa2UgY29weSAqL1xuICBwcml2YXRlIGNyZWF0ZVVuZG9SZWRvQnVmZmVyKCkge1xuICAgIGNvbnN0IGNvbW1hbmRRdWV1ZTogYW55W10gPSBbXTtcbiAgICBsZXQgY29tbWFuZEN0ciA9IDA7XG4gICAgdGhpcy5fdW5kb1JlZG9CdWZmZXIgPSB7XG4gICAgICBxdWV1ZUFuZEV4ZWN1dGVDb21tYW5kOiAoZWRpdENvbW1hbmQ6IGFueSkgPT4ge1xuICAgICAgICBjb21tYW5kUXVldWVbY29tbWFuZEN0cl0gPSBlZGl0Q29tbWFuZDtcbiAgICAgICAgY29tbWFuZEN0cisrO1xuICAgICAgICBlZGl0Q29tbWFuZC5leGVjdXRlKCk7XG4gICAgICB9LFxuICAgICAgdW5kbzogKCkgPT4ge1xuICAgICAgICBpZiAoY29tbWFuZEN0ciA9PT0gMCkgeyByZXR1cm47IH1cbiAgICAgICAgY29tbWFuZEN0ci0tO1xuICAgICAgICBjb25zdCBjb21tYW5kID0gY29tbWFuZFF1ZXVlW2NvbW1hbmRDdHJdO1xuICAgICAgICBpZiAoY29tbWFuZCAmJiBTbGljay5HbG9iYWxFZGl0b3JMb2NrLmNhbmNlbEN1cnJlbnRFZGl0KCkpIHtcbiAgICAgICAgICBjb21tYW5kLnVuZG8oKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlZG86ICgpID0+IHtcbiAgICAgICAgaWYgKGNvbW1hbmRDdHIgPj0gY29tbWFuZFF1ZXVlLmxlbmd0aCkgeyByZXR1cm47IH1cbiAgICAgICAgY29uc3QgY29tbWFuZCA9IGNvbW1hbmRRdWV1ZVtjb21tYW5kQ3RyXTtcbiAgICAgICAgY29tbWFuZEN0cisrO1xuICAgICAgICBpZiAoY29tbWFuZCAmJiBTbGljay5HbG9iYWxFZGl0b3JMb2NrLmNhbmNlbEN1cnJlbnRFZGl0KCkpIHtcbiAgICAgICAgICBjb21tYW5kLmV4ZWN1dGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKiogQXR0YWNoIGFuIHVuZG8gc2hvcnRjdXQga2V5IGhvb2sgdGhhdCB3aWxsIHJlZG8vdW5kbyB0aGUgY29weSBidWZmZXIgKi9cbiAgcHJpdmF0ZSBob29rVW5kb1Nob3J0Y3V0S2V5KCkge1xuICAgIC8vIHVuZG8gc2hvcnRjdXRcbiAgICAkKGRvY3VtZW50KS5rZXlkb3duKChlOiBhbnkpID0+IHtcbiAgICAgIGlmIChlLndoaWNoID09PSA5MCAmJiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkpIHsgICAgLy8gQ1RSTCArIChzaGlmdCkgKyBaXG4gICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgdGhpcy5fdW5kb1JlZG9CdWZmZXIucmVkbygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3VuZG9SZWRvQnVmZmVyLnVuZG8oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=