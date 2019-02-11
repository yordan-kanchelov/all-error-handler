/**
 * Class providing objects to listen for uncaught errors.
 */
export class AllErrorHandler {
    constructor(callback: ErrorCallback, startListening?: boolean);
    /**
     * Start listening for error events.
     * @return {void}
     */
    startListening(): void;
    /**
     * Stop listening for error events.
     * @return {void}
     */
    stopListening(): void;
    /**
     * Call noConflict to avoid conflicts over the AllErrorHandler name
     * @return {AllErrorHandler}  Returns a AllErrorHandler constructor.
     */
    noConflict(): AllErrorHandler;
    /**
     * Disposing the class so there would be no memory leak.
     * @return {void}
     */
    dispose(): void;
    /**
     * It will attach or detach the listening event based on the given parameter;
     * @param {Boolean} attach - if true the object will start listening.
     * @return {void}
     */
    _setupEvents(attach: boolean): void;
}

/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback ErrorCallback
 * @param {ErrorEvent} error - error object
 */
declare type ErrorCallback = (error: ErrorEvent) => void;

