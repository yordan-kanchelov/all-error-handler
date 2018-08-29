(function() {
    var root = this;
    var previous_mymodule = root.AllErrorHandler;

    /**
     * Class providing objects to listen for uncaught errors.
     */
    class AllErrorHandler {
        /**
         * Create a allErrorHandler object.
         * @param {Function} callback - The callback which is called after an occurred error event.
         * @param {Boolean} startListening - Chose if the object should start listening immediately.
         */
        constructor(callback, startListening = true) {
            if (!callback) {
                throw new Error("Missing callback function");
            }

            this._callback = callback;
            this._listening = startListening;

            this._setupEvents(this._listening);
        }
        /**
         * Start listening for error events.
         * @return {void}
         */
        startListening() {
            this._setupEvents(true);
        }

        /**
         * Stop listening for error events.
         * @return {void}
         */
        stopListening() {
            this._setupEvents(false);
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
                this._setupEvents(false);
            }

            this._callback = null;
        }

        /**
         * It will attach or detach the listening event based on the given parameter;
         * @param {Boolean} attach - if true the object will start listening.
         * @return {void}
         */
        _setupEvents(attach) {
            this._listening = attach ? true : false;

            if (attach) {
                if (typeof window !== "undefined") {
                    window.addEventListener("error", this._callback);
                } else {
                    process.on("uncaughtException", this._callback);
                }
            } else {
                if (typeof window !== "undefined") {
                    window.removeEventListener("error", this._callback);
                } else {
                    process.removeListener("uncaughtException", this._callback);
                }
            }
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
