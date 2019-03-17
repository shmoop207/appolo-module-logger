"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_1 = require("appolo");
const __1 = require("../");
let should = require('chai').should();
describe("socket module Spec", function () {
    let app;
    beforeEach(async () => {
        app = appolo_1.createApp({ root: __dirname + "/mock", environment: "production", port: 8182 });
        await app.module(new __1.LoggerModule());
        await app.launch();
    });
    afterEach(async () => {
        await app.reset();
    });
    it("should write error", async () => {
        let logger = app.injector.getObject("logger");
        logger.error.should.be.ok;
        try {
            testStack();
        }
        catch (e) {
            logger.error("test new", { e: e }, { a: 11 });
        }
    });
});
function testStack() {
    throw new Error("bla");
}
//# sourceMappingURL=spec.js.map