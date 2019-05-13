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
    var endTime = new Date();
    // define what our internal Post Process callback, only available for GraphQL Service for now
    // it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
    if (processResult && backendApi && backendApi.internalPostProcess) {
        backendApi.internalPostProcess(processResult);
    }
    // send the response process to the postProcess callback
    if (backendApi.postProcess) {
        if (processResult instanceof Object) {
            processResult.statistics = {
                startTime: startTime,
                endTime: endTime,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZC11dGlsaXRpZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2JhY2tlbmQtdXRpbGl0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUtBLE1BQU0sVUFBVSwrQkFBK0IsQ0FBQyxTQUFlLEVBQUUsYUFBa0MsRUFBRSxVQUE2QixFQUFFLFdBQXVCOztRQUNuSixPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUU7SUFFMUIsNkZBQTZGO0lBQzdGLHNIQUFzSDtJQUN0SCxJQUFJLGFBQWEsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLG1CQUFtQixFQUFFO1FBQ2pFLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUMvQztJQUVELHdEQUF3RDtJQUN4RCxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUU7UUFDMUIsSUFBSSxhQUFhLFlBQVksTUFBTSxFQUFFO1lBQ25DLGFBQWEsQ0FBQyxVQUFVLEdBQUc7Z0JBQ3pCLFNBQVMsV0FBQTtnQkFDVCxPQUFPLFNBQUE7Z0JBQ1AsYUFBYSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFO2dCQUN0RCxTQUFTLEVBQUUsV0FBVyxJQUFJLFdBQVcsQ0FBQyxVQUFVLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxVQUFVO2dCQUNyRixjQUFjLEVBQUUsV0FBVyxJQUFJLFdBQVcsQ0FBQyxVQUFVLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxVQUFVO2FBQzNGLENBQUM7U0FDSDtRQUNELFVBQVUsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDdkM7QUFDSCxDQUFDOzs7Ozs7O0FBR0QsTUFBTSxVQUFXLGNBQWMsQ0FBQyxDQUFNLEVBQUUsVUFBNkI7SUFDbkUsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRTtRQUNwQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3ZCO1NBQU07UUFDTCxNQUFNLENBQUMsQ0FBQztLQUNUO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdyYXBocWxSZXN1bHQgfSBmcm9tICcuLi9tb2RlbHMvZ3JhcGhxbFJlc3VsdC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBCYWNrZW5kU2VydmljZUFwaSB9IGZyb20gJy4uL21vZGVscy9iYWNrZW5kU2VydmljZUFwaS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBHcmlkT3B0aW9uIH0gZnJvbSAnLi4vbW9kZWxzJztcclxuXHJcbi8qKiBFeGVjdXRlIHRoZSBCYWNrZW5kIFByb2Nlc3NlcyBDYWxsYmFjaywgdGhhdCBjb3VsZCBjb21lIGZyb20gYW4gT2JzZXJ2YWJsZSBvciBhIFByb21pc2UgY2FsbGJhY2sgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVCYWNrZW5kUHJvY2Vzc2VzQ2FsbGJhY2soc3RhcnRUaW1lOiBEYXRlLCBwcm9jZXNzUmVzdWx0OiBHcmFwaHFsUmVzdWx0IHwgYW55LCBiYWNrZW5kQXBpOiBCYWNrZW5kU2VydmljZUFwaSwgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24pOiBHcmFwaHFsUmVzdWx0IHwgYW55IHtcclxuICBjb25zdCBlbmRUaW1lID0gbmV3IERhdGUoKTtcclxuXHJcbiAgLy8gZGVmaW5lIHdoYXQgb3VyIGludGVybmFsIFBvc3QgUHJvY2VzcyBjYWxsYmFjaywgb25seSBhdmFpbGFibGUgZm9yIEdyYXBoUUwgU2VydmljZSBmb3Igbm93XHJcbiAgLy8gaXQgd2lsbCBiYXNpY2FsbHkgcmVmcmVzaCB0aGUgRGF0YXNldCAmIFBhZ2luYXRpb24gd2l0aG91dCBoYXZpbmcgdGhlIHVzZXIgdG8gY3JlYXRlIGhpcyBvd24gUG9zdFByb2Nlc3MgZXZlcnkgdGltZVxyXG4gIGlmIChwcm9jZXNzUmVzdWx0ICYmIGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5pbnRlcm5hbFBvc3RQcm9jZXNzKSB7XHJcbiAgICBiYWNrZW5kQXBpLmludGVybmFsUG9zdFByb2Nlc3MocHJvY2Vzc1Jlc3VsdCk7XHJcbiAgfVxyXG5cclxuICAvLyBzZW5kIHRoZSByZXNwb25zZSBwcm9jZXNzIHRvIHRoZSBwb3N0UHJvY2VzcyBjYWxsYmFja1xyXG4gIGlmIChiYWNrZW5kQXBpLnBvc3RQcm9jZXNzKSB7XHJcbiAgICBpZiAocHJvY2Vzc1Jlc3VsdCBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICBwcm9jZXNzUmVzdWx0LnN0YXRpc3RpY3MgPSB7XHJcbiAgICAgICAgc3RhcnRUaW1lLFxyXG4gICAgICAgIGVuZFRpbWUsXHJcbiAgICAgICAgZXhlY3V0aW9uVGltZTogZW5kVGltZS52YWx1ZU9mKCkgLSBzdGFydFRpbWUudmFsdWVPZigpLFxyXG4gICAgICAgIGl0ZW1Db3VudDogZ3JpZE9wdGlvbnMgJiYgZ3JpZE9wdGlvbnMucGFnaW5hdGlvbiAmJiBncmlkT3B0aW9ucy5wYWdpbmF0aW9uLnRvdGFsSXRlbXMsXHJcbiAgICAgICAgdG90YWxJdGVtQ291bnQ6IGdyaWRPcHRpb25zICYmIGdyaWRPcHRpb25zLnBhZ2luYXRpb24gJiYgZ3JpZE9wdGlvbnMucGFnaW5hdGlvbi50b3RhbEl0ZW1zXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBiYWNrZW5kQXBpLnBvc3RQcm9jZXNzKHByb2Nlc3NSZXN1bHQpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqIE9uIGEgYmFja2VuZCBzZXJ2aWNlIGFwaSBlcnJvciwgd2Ugd2lsbCBydW4gdGhlIFwib25FcnJvclwiIGlmIHRoZXJlIGlzIDEgcHJvdmlkZWQgb3IganVzdCB0aHJvdyBiYWNrIHRoZSBlcnJvciB3aGVuIG5vdGhpbmcgaXMgcHJvdmlkZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uICBvbkJhY2tlbmRFcnJvcihlOiBhbnksIGJhY2tlbmRBcGk6IEJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgaWYgKGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5vbkVycm9yKSB7XHJcbiAgICBiYWNrZW5kQXBpLm9uRXJyb3IoZSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IGU7XHJcbiAgfVxyXG59XHJcbiJdfQ==