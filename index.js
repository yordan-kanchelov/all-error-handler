"use strict";

(function () {
    var root = this
    var previous_mymodule = root.AllErrorHandler

    /**
     * Class providing objects to listen for uncaught errors.
     */
    class AllErrorHandler {
        /**
         * Create a point.
         * @param {Function} callback - The callback which is called after an occured error event.
         * @param {Boolean} startListening - Chose if the object should start listening immediately.
         */
        constructor(callback, startListening = true) {
            if (!callback) {
                throw new Error("Missing callback function");
            }

            this.callback = callback;

            if (startListening) {
                this._setupEvents();
            }
        }

        /**
         * Start listening for error events.
         * @return {void}
         */
        startListening() {
            this._setupEvents();
        }

        /**
         * Stop listening for error events.
         * @return {void} The x value.
         */
        stopListening() {
            this._setupEvents(false);
        }

        /**
         * Call noConflict to avoid conflicts over the AllErrorHandler name
         * @return {AllErrorHandler}  Returns a AllErrorHandler constructor.
         */
        noConflict() {
            root.AllErrorHandler = previous_mymodule
            return AllErrorHandler
        }

        /**
         * Disposing the class so there would be no memory leak.
         * @return {void}
         */
        dispose() {
            this._setupEvents(false);
            this.callback = null;
        }

        /**
         * It will attatch or detatch the listening event based on the given parametter;
         * @param {Boolean} attatch - if true the object will start listening. 
         * @return {void}
         */
        _setupEvents(attatch = true) {
            if (attatch) {
                if (typeof window !== "undefined") {
                    window.addEventListener("error", this.callback);
                } else {
                    process.on('uncaughtException', this.callback);
                }
            } else {
                if (typeof window !== "undefined") {
                    window.removeEventListener("error", this.callback, true);
                } else {
                    process.off('uncaughtException', this.callback);
                }
            }
        }
    }
    if (typeof define === 'function' && define.amd) {
        define([], AllErrorHandler);
    } else if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = AllErrorHandler
        }
        exports.AllErrorHandler = AllErrorHandler
    } else {
        root.AllErrorHandler = AllErrorHandler
    }
}).call(this);