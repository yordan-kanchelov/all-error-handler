"use strict";

(function () {
    var root = this
    var previous_mymodule = root.AllErrorHandler

    /**
     * Class providing objects to listen for uncaught errors.
     */
    class AllErrorHandler {
        /**
         * Create a allErrorHandler object.
         * @param {Function} callback - The callback which is called after an occured error event.
         * @param {Boolean} startListening - Chose if the object should start listening immediately.
         */
        constructor(callback, startListening = true) {
            if (!callback) {
                throw new Error("Missing callback function");
            }

            this._callback = callback;
            this._listening = false;

            if (startListening) {
                this._setupEvents();
            }
        }

        /**
         * Start listening for error events.
         * @return {void}
         */
        startListening() {
            if (!this._listening) {
                this._setupEvents();
            }
        }

        /**
         * Stop listening for error events.
         * @return {void}
         */
        stopListening() {
            if (this._listening) {
                this._setupEvents(false);
            }
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
            if (this._listening) {
                this._setupEvents(false);
            }

            this._callback = null;
        }

        /**
         * It will attatch or detatch the listening event based on the given parametter;
         * @param {Boolean} attatch - if true the object will start listening. 
         * @return {void}
         */
        _setupEvents(attatch = true) {
            this._listening = attatch ? true : false;

            if (attatch) {
                if (typeof window !== "undefined") {
                    window.addEventListener("error", this._callback);
                } else {
                    process.on('uncaughtException', this._callback);
                }
            } else {
                if (typeof window !== "undefined") {
                    window.removeEventListener("error", this._callback);
                } else {
                    process.removeListener('uncaughtException', this._callback);
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

