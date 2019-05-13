import { GraphqlResult } from '../models/graphqlResult.interface';
import { BackendServiceApi } from '../models/backendServiceApi.interface';
import { GridOption } from '../models';
/** Execute the Backend Processes Callback, that could come from an Observable or a Promise callback */
export declare function executeBackendProcessesCallback(startTime: Date, processResult: GraphqlResult | any, backendApi: BackendServiceApi, gridOptions: GridOption): GraphqlResult | any;
/** On a backend service api error, we will run the "onError" if there is 1 provided or just throw back the error when nothing is provided */
export declare function onBackendError(e: any, backendApi: BackendServiceApi): void;
