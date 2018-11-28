// Type definitions for [ All-Error-Handler] [ 1.2.0]
// Project: [ All-Error-Handler ]
// Definitions by: [ jkanchelov ] <[ https://github.com/jkanchelov ]>

export as namespace AllErrorHandler;
export = AllErrorHandler;

declare class AllErrorHandler {
    /**
     * Create a allErrorHandler object.
     * @param {Function} callback - The callback which is called after an occurred error event.
     * @param {boolean} startListening - Chose if the object should start listening immediately.
     */
    constructor(callback: Function, startListening: boolean = true);

    /**
     * Start listening for error events.
     */
    startListening(): void;

    /**
     * Stop listening for error events.
     */
    stopListening(): void;

    /**
     * Call noConflict to avoid conflicts over the AllErrorHandler name
     */
    noConflict(): AllErrorHandler;

    /**
     * Disposing the class so there would be no memory leak.
     */
    dispose(): void;

    /**
     * It will attach or detach the listening event based on the given parameter;
     * @param {Boolean} attach - if true the object will start listening.
     */
    protected _setupEvents(attach: boolean): void;
}
