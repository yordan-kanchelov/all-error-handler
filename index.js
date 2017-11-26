"use strict";

class AllErrorHandler {
    constructor(callback) {
        this.callback = callback;

        this._setupEvents();
    }

    startListening() {
        this._setupEvents();
    }

    stopListening() {
        this._setupEvents(false);
    }

    dispose() {
        this._setupEvents(false);
        this.callback = null;
    }

    _setupEvents(on = true) {
        if(on) {
            if (typeof window !== "undefined") {
                window.addEventListener("error", this.callback);
            } else {
                process.on('uncaughtException', this.callback);
            }
        } else {
            if (typeof window !== "undefined") {
                window.removeEventListener("error", this.callback, true);
            }
            else {
                process.off('uncaughtException', this.callback);
            }
        }
    }
}

(function () {
    var root = this
    var previous_mymodule = root.AllErrorHandler

    AllErrorHandler.noConflict = function () {
        root.AllErrorHandler = previous_mymodule
        return AllErrorHandler
    }

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = AllErrorHandler
        }
        exports.AllErrorHandler = AllErrorHandler
    }
    else {
        root.AllErrorHandler = AllErrorHandler
    }
}).call(this);


