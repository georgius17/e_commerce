import { debounce } from "lodash";
import { postLogError, WebLogRequest } from "Api/Api";

type WindowWithErrorStack = {
  applicationErrorStack: WebLogRequest[];
  applicationStore: any;
};

const logStorage = (window as unknown) as WindowWithErrorStack;

const logToApi = () => {
  console.log(logStorage.applicationErrorStack);
  postLogError({
    webLogRequests: logStorage.applicationErrorStack,
    dateCreated: new Date().toISOString(),
  });
  logStorage.applicationErrorStack = [];
};

const logToApiDebounced = debounce(logToApi, 1000);

const logError = (error?: Error, additionalInfo?: any) => {
  if (error || additionalInfo) {
    const errorLog: WebLogRequest = {
      dateCreated: new Date().toISOString(),
      error: `${
        error?.message
      } || ${error?.message.toString()} || ${error?.stack?.toString()} `,
      additionalInfo: JSON.stringify(additionalInfo || {}),
      reduxState: JSON.stringify(logStorage.applicationStore?.getState() || {}),
    };
    logStorage.applicationErrorStack = logStorage.applicationErrorStack || [];
    logStorage.applicationErrorStack.push(errorLog);
    logToApiDebounced();
  }
};

export { logError };
