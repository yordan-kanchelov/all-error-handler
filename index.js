(function() {
    var root = this;
    var previous_mymodule = root.AllErrorHandler;

    /**
     * Class providing objects to listen for uncaught errors.
     */
    class AllErrorHandler {
        /**
         * This callback type is called `requestCallback` and is displayed as a global symbol.
         *
         * @callback ErrorCallback
         * @param {ErrorEvent} error - error object 
         */

        /**
         * Create a allErrorHandler object.
         * @param {ErrorCallback} callback - The callback which is called after an occurred error event.
         * @param {Boolean} startListening - Chose if the object should start listening immediately.
         */
        constructor(callback, startListening = true) {
            if (!callback) {
                throw new Error("Missing callback function");
            }

            this._callback = callback;

            if (this.startListening) {
                this.startListening();
            }
        }
        /**
         * Start listening for error events.
         * @return {void}
         */
        startListening() {
            this._listening = true;

            if (typeof window !== "undefined") {
                window.addEventListener("error", this._callback);
            } else {
                process.on("uncaughtException", this._callback);
            }
        }

        /**
         * Stop listening for error events.
         * @return {void}
         */
        stopListening() {
            this._listening = false;

            if (typeof window !== "undefined") {
                window.removeEventListener("error", this._callback);
            } else {
                process.removeListener("uncaughtException", this._callback);
            }
        }

        /**
         * Call noConflict to avoid conflicts over the AllErrorHandler name
         * @return {AllErrorHandler}  Returns a AllErrorHandler constructor.
         */
        noConflict() {
            root.AllErrorHandler = previous_mymodule;
            return AllErrorHandler;
        }

        /**
         * Disposing the class so there would be no memory leak.
         * @return {void}
         */
        dispose() {
            if (this._listening) {
                this.stopListening();
            }

            this._callback = null;
        }
    }
    if (typeof define === "function" && define.amd) {
        define([], function() {
            return (root.AllErrorHandler = AllErrorHandler);
        });
    } else if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) {
            exports = module.exports = AllErrorHandler;
        }
        exports.AllErrorHandler = AllErrorHandler;
    } else {
        root.AllErrorHandler = AllErrorHandler;
    }
}.call(typeof self !== "undefined" ? self : this));
