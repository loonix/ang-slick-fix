/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { sanitizeHtmlToText } from '../services/utilities';
import { SharedService } from '../services/shared.service';
export class CellExternalCopyManagerExtension {
    /**
     * @param {?} extensionUtility
     * @param {?} sharedService
     */
    constructor(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
    }
    /**
     * @return {?}
     */
    dispose() {
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    }
    /**
     * @return {?}
     */
    register() {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.cellExternalCopyManager);
            this.createUndoRedoBuffer();
            this.hookUndoShortcutKey();
            /** @type {?} */
            let newRowIds = 0;
            /** @type {?} */
            const pluginOptions = {
                clipboardCommandHandler: (/**
                 * @param {?} editCommand
                 * @return {?}
                 */
                (editCommand) => {
                    this._undoRedoBuffer.queueAndExecuteCommand.call(this._undoRedoBuffer, editCommand);
                }),
                dataItemColumnValueExtractor: (/**
                 * @param {?} item
                 * @param {?} columnDef
                 * @return {?}
                 */
                (item, columnDef) => {
                    // when grid or cell is not editable, we will possibly evaluate the Formatter if it was passed
                    // to decide if we evaluate the Formatter, we will use the same flag from Export which is "exportWithFormatter"
                    if (!this.sharedService.gridOptions.editable || !columnDef.editor) {
                        /** @type {?} */
                        const isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : (this.sharedService.gridOptions.exportOptions && this.sharedService.gridOptions.exportOptions.exportWithFormatter);
                        if (columnDef.formatter && isEvaluatingFormatter) {
                            /** @type {?} */
                            const formattedOutput = columnDef.formatter(0, 0, item[columnDef.field], columnDef, item, this.sharedService.grid);
                            if (columnDef.sanitizeDataExport || (this.sharedService.gridOptions.exportOptions && this.sharedService.gridOptions.exportOptions.sanitizeDataExport)) {
                                /** @type {?} */
                                let outputString = (/** @type {?} */ (formattedOutput));
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
                (count) => {
                    for (let i = 0; i < count; i++) {
                        /** @type {?} */
                        const item = {
                            id: 'newRow_' + newRowIds++
                        };
                        this.sharedService.grid.getData().addItem(item);
                    }
                })
            };
            this.sharedService.grid.setSelectionModel(new Slick.CellSelectionModel());
            this._extension = new Slick.CellExternalCopyManager(pluginOptions);
            this.sharedService.grid.registerPlugin(this._extension);
            return this._extension;
        }
        return null;
    }
    /**
     * Create an undo redo buffer used by the Excel like copy
     * @private
     * @return {?}
     */
    createUndoRedoBuffer() {
        /** @type {?} */
        const commandQueue = [];
        /** @type {?} */
        let commandCtr = 0;
        this._undoRedoBuffer = {
            queueAndExecuteCommand: (/**
             * @param {?} editCommand
             * @return {?}
             */
            (editCommand) => {
                commandQueue[commandCtr] = editCommand;
                commandCtr++;
                editCommand.execute();
            }),
            undo: (/**
             * @return {?}
             */
            () => {
                if (commandCtr === 0) {
                    return;
                }
                commandCtr--;
                /** @type {?} */
                const command = commandQueue[commandCtr];
                if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                    command.undo();
                }
            }),
            redo: (/**
             * @return {?}
             */
            () => {
                if (commandCtr >= commandQueue.length) {
                    return;
                }
                /** @type {?} */
                const command = commandQueue[commandCtr];
                commandCtr++;
                if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                    command.execute();
                }
            })
        };
    }
    /**
     * Attach an undo shortcut key hook that will redo/undo the copy buffer
     * @private
     * @return {?}
     */
    hookUndoShortcutKey() {
        // undo shortcut
        $(document).keydown((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e.which === 90 && (e.ctrlKey || e.metaKey)) { // CTRL + (shift) + Z
                if (e.shiftKey) {
                    this._undoRedoBuffer.redo();
                }
                else {
                    this._undoRedoBuffer.undo();
                }
            }
        }));
    }
}
CellExternalCopyManagerExtension.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CellExternalCopyManagerExtension.ctorParameters = () => [
    { type: ExtensionUtility },
    { type: SharedService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbEV4dGVybmFsQ29weU1hbmFnZXJFeHRlbnNpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2V4dGVuc2lvbnMvY2VsbEV4dGVybmFsQ29weU1hbmFnZXJFeHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFxQixhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFPM0QsTUFBTSxPQUFPLGdDQUFnQzs7Ozs7SUFJM0MsWUFBb0IsZ0JBQWtDLEVBQVUsYUFBNEI7UUFBeEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQUksQ0FBQzs7OztJQUVqRyxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRTtZQUNuRix5REFBeUQ7WUFDekQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxD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LENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTzs7OztRQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDN0IsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUsscUJBQXFCO2dCQUN4RSxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDN0I7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDN0I7YUFDRjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBNUdGLFVBQVU7Ozs7WUFSRixnQkFBZ0I7WUFFaEIsYUFBYTs7Ozs7OztJQVFwQixzREFBd0I7Ozs7O0lBQ3hCLDJEQUE2Qjs7Ozs7SUFFakIsNERBQTBDOzs7OztJQUFFLHlEQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbHVtbiwgRXh0ZW5zaW9uLCBFeHRlbnNpb25OYW1lIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IEV4dGVuc2lvblV0aWxpdHkgfSBmcm9tICcuL2V4dGVuc2lvblV0aWxpdHknO1xuaW1wb3J0IHsgc2FuaXRpemVIdG1sVG9UZXh0IH0gZnJvbSAnLi4vc2VydmljZXMvdXRpbGl0aWVzJztcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XG5cbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XG5kZWNsYXJlIHZhciAkOiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDZWxsRXh0ZXJuYWxDb3B5TWFuYWdlckV4dGVuc2lvbiBpbXBsZW1lbnRzIEV4dGVuc2lvbiB7XG4gIHByaXZhdGUgX2V4dGVuc2lvbjogYW55O1xuICBwcml2YXRlIF91bmRvUmVkb0J1ZmZlcjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXh0ZW5zaW9uVXRpbGl0eTogRXh0ZW5zaW9uVXRpbGl0eSwgcHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlKSB7IH1cblxuICBkaXNwb3NlKCkge1xuICAgIGlmICh0aGlzLl9leHRlbnNpb24gJiYgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3kpIHtcbiAgICAgIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXIoKTogYW55IHtcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucykge1xuICAgICAgLy8gZHluYW1pY2FsbHkgaW1wb3J0IHRoZSBTbGlja0dyaWQgcGx1Z2luIHdpdGggcmVxdWlyZUpTXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkubG9hZEV4dGVuc2lvbkR5bmFtaWNhbGx5KEV4dGVuc2lvbk5hbWUuY2VsbEV4dGVybmFsQ29weU1hbmFnZXIpO1xuICAgICAgdGhpcy5jcmVhdGVVbmRvUmVkb0J1ZmZlcigpO1xuICAgICAgdGhpcy5ob29rVW5kb1Nob3J0Y3V0S2V5KCk7XG4gICAgICBsZXQgbmV3Um93SWRzID0gMDtcbiAgICAgIGNvbnN0IHBsdWdpbk9wdGlvbnMgPSB7XG4gICAgICAgIGNsaXBib2FyZENvbW1hbmRIYW5kbGVyOiAoZWRpdENvbW1hbmQ6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMuX3VuZG9SZWRvQnVmZmVyLnF1ZXVlQW5kRXhlY3V0ZUNvbW1hbmQuY2FsbCh0aGlzLl91bmRvUmVkb0J1ZmZlciwgZWRpdENvbW1hbmQpO1xuICAgICAgICB9LFxuICAgICAgICBkYXRhSXRlbUNvbHVtblZhbHVlRXh0cmFjdG9yOiAoaXRlbTogYW55LCBjb2x1bW5EZWY6IENvbHVtbikgPT4ge1xuICAgICAgICAgIC8vIHdoZW4gZ3JpZCBvciBjZWxsIGlzIG5vdCBlZGl0YWJsZSwgd2Ugd2lsbCBwb3NzaWJseSBldmFsdWF0ZSB0aGUgRm9ybWF0dGVyIGlmIGl0IHdhcyBwYXNzZWRcbiAgICAgICAgICAvLyB0byBkZWNpZGUgaWYgd2UgZXZhbHVhdGUgdGhlIEZvcm1hdHRlciwgd2Ugd2lsbCB1c2UgdGhlIHNhbWUgZmxhZyBmcm9tIEV4cG9ydCB3aGljaCBpcyBcImV4cG9ydFdpdGhGb3JtYXR0ZXJcIlxuICAgICAgICAgIGlmICghdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVkaXRhYmxlIHx8ICFjb2x1bW5EZWYuZWRpdG9yKSB7XG4gICAgICAgICAgICBjb25zdCBpc0V2YWx1YXRpbmdGb3JtYXR0ZXIgPSAoY29sdW1uRGVmLmV4cG9ydFdpdGhGb3JtYXR0ZXIgIT09IHVuZGVmaW5lZCkgPyBjb2x1bW5EZWYuZXhwb3J0V2l0aEZvcm1hdHRlciA6ICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZXhwb3J0T3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZXhwb3J0T3B0aW9ucy5leHBvcnRXaXRoRm9ybWF0dGVyKTtcbiAgICAgICAgICAgIGlmIChjb2x1bW5EZWYuZm9ybWF0dGVyICYmIGlzRXZhbHVhdGluZ0Zvcm1hdHRlcikge1xuICAgICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRPdXRwdXQgPSBjb2x1bW5EZWYuZm9ybWF0dGVyKDAsIDAsIGl0ZW1bY29sdW1uRGVmLmZpZWxkXSwgY29sdW1uRGVmLCBpdGVtLCB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCk7XG4gICAgICAgICAgICAgIGlmIChjb2x1bW5EZWYuc2FuaXRpemVEYXRhRXhwb3J0IHx8ICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZXhwb3J0T3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZXhwb3J0T3B0aW9ucy5zYW5pdGl6ZURhdGFFeHBvcnQpKSB7XG4gICAgICAgICAgICAgICAgbGV0IG91dHB1dFN0cmluZyA9IGZvcm1hdHRlZE91dHB1dCBhcyBzdHJpbmc7XG4gICAgICAgICAgICAgICAgaWYgKGZvcm1hdHRlZE91dHB1dCAmJiB0eXBlb2YgZm9ybWF0dGVkT3V0cHV0ID09PSAnb2JqZWN0JyAmJiBmb3JtYXR0ZWRPdXRwdXQuaGFzT3duUHJvcGVydHkoJ3RleHQnKSkge1xuICAgICAgICAgICAgICAgICAgb3V0cHV0U3RyaW5nID0gZm9ybWF0dGVkT3V0cHV0LnRleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvdXRwdXRTdHJpbmcgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIG91dHB1dFN0cmluZyA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc2FuaXRpemVIdG1sVG9UZXh0KG91dHB1dFN0cmluZyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdHRlZE91dHB1dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gZWxzZSB1c2UgdGhlIGRlZmF1bHQgXCJkYXRhSXRlbUNvbHVtblZhbHVlRXh0cmFjdG9yXCIgZnJvbSB0aGUgcGx1Z2luIGl0c2VsZlxuICAgICAgICAgIC8vIHdlIGNhbiBkbyB0aGF0IGJ5IHNldHRpbmcgYmFjayB0aGUgZ2V0dGVyIHdpdGggbnVsbFxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9LFxuICAgICAgICByZWFkT25seU1vZGU6IGZhbHNlLFxuICAgICAgICBpbmNsdWRlSGVhZGVyV2hlbkNvcHlpbmc6IGZhbHNlLFxuICAgICAgICBuZXdSb3dDcmVhdG9yOiAoY291bnQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHtcbiAgICAgICAgICAgICAgaWQ6ICduZXdSb3dfJyArIG5ld1Jvd0lkcysrXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0RGF0YSgpLmFkZEl0ZW0oaXRlbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0U2VsZWN0aW9uTW9kZWwobmV3IFNsaWNrLkNlbGxTZWxlY3Rpb25Nb2RlbCgpKTtcbiAgICAgIHRoaXMuX2V4dGVuc2lvbiA9IG5ldyBTbGljay5DZWxsRXh0ZXJuYWxDb3B5TWFuYWdlcihwbHVnaW5PcHRpb25zKTtcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHRoaXMuX2V4dGVuc2lvbik7XG4gICAgICByZXR1cm4gdGhpcy5fZXh0ZW5zaW9uO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKiBDcmVhdGUgYW4gdW5kbyByZWRvIGJ1ZmZlciB1c2VkIGJ5IHRoZSBFeGNlbCBsaWtlIGNvcHkgKi9cbiAgcHJpdmF0ZSBjcmVhdGVVbmRvUmVkb0J1ZmZlcigpIHtcbiAgICBjb25zdCBjb21tYW5kUXVldWU6IGFueVtdID0gW107XG4gICAgbGV0IGNvbW1hbmRDdHIgPSAwO1xuICAgIHRoaXMuX3VuZG9SZWRvQnVmZmVyID0ge1xuICAgICAgcXVldWVBbmRFeGVjdXRlQ29tbWFuZDogKGVkaXRDb21tYW5kOiBhbnkpID0+IHtcbiAgICAgICAgY29tbWFuZFF1ZXVlW2NvbW1hbmRDdHJdID0gZWRpdENvbW1hbmQ7XG4gICAgICAgIGNvbW1hbmRDdHIrKztcbiAgICAgICAgZWRpdENvbW1hbmQuZXhlY3V0ZSgpO1xuICAgICAgfSxcbiAgICAgIHVuZG86ICgpID0+IHtcbiAgICAgICAgaWYgKGNvbW1hbmRDdHIgPT09IDApIHsgcmV0dXJuOyB9XG4gICAgICAgIGNvbW1hbmRDdHItLTtcbiAgICAgICAgY29uc3QgY29tbWFuZCA9IGNvbW1hbmRRdWV1ZVtjb21tYW5kQ3RyXTtcbiAgICAgICAgaWYgKGNvbW1hbmQgJiYgU2xpY2suR2xvYmFsRWRpdG9yTG9jay5jYW5jZWxDdXJyZW50RWRpdCgpKSB7XG4gICAgICAgICAgY29tbWFuZC51bmRvKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZWRvOiAoKSA9PiB7XG4gICAgICAgIGlmIChjb21tYW5kQ3RyID49IGNvbW1hbmRRdWV1ZS5sZW5ndGgpIHsgcmV0dXJuOyB9XG4gICAgICAgIGNvbnN0IGNvbW1hbmQgPSBjb21tYW5kUXVldWVbY29tbWFuZEN0cl07XG4gICAgICAgIGNvbW1hbmRDdHIrKztcbiAgICAgICAgaWYgKGNvbW1hbmQgJiYgU2xpY2suR2xvYmFsRWRpdG9yTG9jay5jYW5jZWxDdXJyZW50RWRpdCgpKSB7XG4gICAgICAgICAgY29tbWFuZC5leGVjdXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqIEF0dGFjaCBhbiB1bmRvIHNob3J0Y3V0IGtleSBob29rIHRoYXQgd2lsbCByZWRvL3VuZG8gdGhlIGNvcHkgYnVmZmVyICovXG4gIHByaXZhdGUgaG9va1VuZG9TaG9ydGN1dEtleSgpIHtcbiAgICAvLyB1bmRvIHNob3J0Y3V0XG4gICAgJChkb2N1bWVudCkua2V5ZG93bigoZTogYW55KSA9PiB7XG4gICAgICBpZiAoZS53aGljaCA9PT0gOTAgJiYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpKSB7ICAgIC8vIENUUkwgKyAoc2hpZnQpICsgWlxuICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICAgIHRoaXMuX3VuZG9SZWRvQnVmZmVyLnJlZG8oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl91bmRvUmVkb0J1ZmZlci51bmRvKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19