const AllErrorHandler = require("../index");

describe("Constructor tests", function() {
    it("error is passed to the callback", function(done) {
        const error = new Error("testError-0");

        let errorHandler = new AllErrorHandler(arg1 => {
            expect(arg1).toBe(error);
            errorHandler.dispose();
            done();
        });

        setTimeout(() => {
            throw error;
        }, 0);
    });

    it("should not start listening if second param is false", function(done) {
        let errorHandler = new AllErrorHandler(() => {
            done("ERROR");
        }, false);

        setTimeout(() => {
            throw new Error("testError-1");
        }, 0);

        errorHandler.dispose();
        errorHandler = null;
        done();
    });
});

describe("Methods Tests", function() {
    it("handler should stop listening", function(done) {
        let errorHandler = new AllErrorHandler(() => {
            done("ERROR");
        });

        errorHandler.stopListening();

        setTimeout(() => {
            throw new Error("testError-2");
        }, 0);

        errorHandler.dispose();
        done();
    });

    it("dispose should work", function(done) {
        let errorHandler = new AllErrorHandler(() => {
            done("ERROR");
        });
        errorHandler.dispose();
        errorHandler = null;

        setTimeout(() => {
            throw new Error("testError-4");
        }, 0);

        done();
    });

    it("handler should start listening", function(done) {
        let errorHandler = new AllErrorHandler(() => {
            setTimeout(() => {
                errorHandler.dispose();
            }, 0);

            done();
        }, false);

        errorHandler.startListening();

        setTimeout(() => {
            throw new Error("testError-5");
        }, 0);
    });
});
