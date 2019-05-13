/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Execute the Backend Processes Callback, that could come from an Observable or a Promise callback
 * @param {?} startTime
 * @param {?} processResult
 * @param {?} backendApi
 * @param {?} gridOptions
 * @return {?}
 */
export function executeBackendProcessesCallback(startTime, processResult, backendApi, gridOptions) {
    /** @type {?} */
    const endTime = new Date();
    // define what our internal Post Process callback, only available for GraphQL Service for now
    // it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
    if (processResult && backendApi && backendApi.internalPostProcess) {
        backendApi.internalPostProcess(processResult);
    }
    // send the response process to the postProcess callback
    if (backendApi.postProcess) {
        if (processResult instanceof Object) {
            processResult.statistics = {
                startTime,
                endTime,
                executionTime: endTime.valueOf() - startTime.valueOf(),
                itemCount: gridOptions && gridOptions.pagination && gridOptions.pagination.totalItems,
                totalItemCount: gridOptions && gridOptions.pagination && gridOptions.pagination.totalItems
            };
        }
        backendApi.postProcess(processResult);
    }
}
/**
 * On a backend service api error, we will run the "onError" if there is 1 provided or just throw back the error when nothing is provided
 * @param {?} e
 * @param {?} backendApi
 * @return {?}
 */
export function onBackendError(e, backendApi) {
    if (backendApi && backendApi.onError) {
        backendApi.onError(e);
    }
    else {
        throw e;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZC11dGlsaXRpZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2JhY2tlbmQtdXRpbGl0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUtBLE1BQU0sVUFBVSwrQkFBK0IsQ0FBQyxTQUFlLEVBQUUsYUFBa0MsRUFBRSxVQUE2QixFQUFFLFdBQXVCOztVQUNuSixPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUU7SUFFMUIsNkZBQTZGO0lBQzdGLHNIQUFzSDtJQUN0SCxJQUFJLGFBQWEsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLG1CQUFtQixFQUFFO1FBQ2pFLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUMvQztJQUVELHdEQUF3RDtJQUN4RCxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUU7UUFDMUIsSUFBSSxhQUFhLFlBQVksTUFBTSxFQUFFO1lBQ25DLGFBQWEsQ0FBQyxVQUFVLEdBQUc7Z0JBQ3pCLFNBQVM7Z0JBQ1QsT0FBTztnQkFDUCxhQUFhLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLFNBQVMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3RELFNBQVMsRUFBRSxXQUFXLElBQUksV0FBVyxDQUFDLFVBQVUsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLFVBQVU7Z0JBQ3JGLGNBQWMsRUFBRSxXQUFXLElBQUksV0FBVyxDQUFDLFVBQVUsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLFVBQVU7YUFDM0YsQ0FBQztTQUNIO1FBQ0QsVUFBVSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUN2QztBQUNILENBQUM7Ozs7Ozs7QUFHRCxNQUFNLFVBQVcsY0FBYyxDQUFDLENBQU0sRUFBRSxVQUE2QjtJQUNuRSxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFO1FBQ3BDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdkI7U0FBTTtRQUNMLE1BQU0sQ0FBQyxDQUFDO0tBQ1Q7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JhcGhxbFJlc3VsdCB9IGZyb20gJy4uL21vZGVscy9ncmFwaHFsUmVzdWx0LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEJhY2tlbmRTZXJ2aWNlQXBpIH0gZnJvbSAnLi4vbW9kZWxzL2JhY2tlbmRTZXJ2aWNlQXBpLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEdyaWRPcHRpb24gfSBmcm9tICcuLi9tb2RlbHMnO1xyXG5cclxuLyoqIEV4ZWN1dGUgdGhlIEJhY2tlbmQgUHJvY2Vzc2VzIENhbGxiYWNrLCB0aGF0IGNvdWxkIGNvbWUgZnJvbSBhbiBPYnNlcnZhYmxlIG9yIGEgUHJvbWlzZSBjYWxsYmFjayAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZUJhY2tlbmRQcm9jZXNzZXNDYWxsYmFjayhzdGFydFRpbWU6IERhdGUsIHByb2Nlc3NSZXN1bHQ6IEdyYXBocWxSZXN1bHQgfCBhbnksIGJhY2tlbmRBcGk6IEJhY2tlbmRTZXJ2aWNlQXBpLCBncmlkT3B0aW9uczogR3JpZE9wdGlvbik6IEdyYXBocWxSZXN1bHQgfCBhbnkge1xyXG4gIGNvbnN0IGVuZFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAvLyBkZWZpbmUgd2hhdCBvdXIgaW50ZXJuYWwgUG9zdCBQcm9jZXNzIGNhbGxiYWNrLCBvbmx5IGF2YWlsYWJsZSBmb3IgR3JhcGhRTCBTZXJ2aWNlIGZvciBub3dcclxuICAvLyBpdCB3aWxsIGJhc2ljYWxseSByZWZyZXNoIHRoZSBEYXRhc2V0ICYgUGFnaW5hdGlvbiB3aXRob3V0IGhhdmluZyB0aGUgdXNlciB0byBjcmVhdGUgaGlzIG93biBQb3N0UHJvY2VzcyBldmVyeSB0aW1lXHJcbiAgaWYgKHByb2Nlc3NSZXN1bHQgJiYgYmFja2VuZEFwaSAmJiBiYWNrZW5kQXBpLmludGVybmFsUG9zdFByb2Nlc3MpIHtcclxuICAgIGJhY2tlbmRBcGkuaW50ZXJuYWxQb3N0UHJvY2Vzcyhwcm9jZXNzUmVzdWx0KTtcclxuICB9XHJcblxyXG4gIC8vIHNlbmQgdGhlIHJlc3BvbnNlIHByb2Nlc3MgdG8gdGhlIHBvc3RQcm9jZXNzIGNhbGxiYWNrXHJcbiAgaWYgKGJhY2tlbmRBcGkucG9zdFByb2Nlc3MpIHtcclxuICAgIGlmIChwcm9jZXNzUmVzdWx0IGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgIHByb2Nlc3NSZXN1bHQuc3RhdGlzdGljcyA9IHtcclxuICAgICAgICBzdGFydFRpbWUsXHJcbiAgICAgICAgZW5kVGltZSxcclxuICAgICAgICBleGVjdXRpb25UaW1lOiBlbmRUaW1lLnZhbHVlT2YoKSAtIHN0YXJ0VGltZS52YWx1ZU9mKCksXHJcbiAgICAgICAgaXRlbUNvdW50OiBncmlkT3B0aW9ucyAmJiBncmlkT3B0aW9ucy5wYWdpbmF0aW9uICYmIGdyaWRPcHRpb25zLnBhZ2luYXRpb24udG90YWxJdGVtcyxcclxuICAgICAgICB0b3RhbEl0ZW1Db3VudDogZ3JpZE9wdGlvbnMgJiYgZ3JpZE9wdGlvbnMucGFnaW5hdGlvbiAmJiBncmlkT3B0aW9ucy5wYWdpbmF0aW9uLnRvdGFsSXRlbXNcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGJhY2tlbmRBcGkucG9zdFByb2Nlc3MocHJvY2Vzc1Jlc3VsdCk7XHJcbiAgfVxyXG59XHJcblxyXG4vKiogT24gYSBiYWNrZW5kIHNlcnZpY2UgYXBpIGVycm9yLCB3ZSB3aWxsIHJ1biB0aGUgXCJvbkVycm9yXCIgaWYgdGhlcmUgaXMgMSBwcm92aWRlZCBvciBqdXN0IHRocm93IGJhY2sgdGhlIGVycm9yIHdoZW4gbm90aGluZyBpcyBwcm92aWRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gIG9uQmFja2VuZEVycm9yKGU6IGFueSwgYmFja2VuZEFwaTogQmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICBpZiAoYmFja2VuZEFwaSAmJiBiYWNrZW5kQXBpLm9uRXJyb3IpIHtcclxuICAgIGJhY2tlbmRBcGkub25FcnJvcihlKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgZTtcclxuICB9XHJcbn1cclxuIl19