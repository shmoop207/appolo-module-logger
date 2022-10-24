"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("@appolo/engine");
const __1 = require("../");
let should = require('chai').should();
describe("socket module Spec", function () {
    let app;
    beforeEach(async () => {
        app = (0, engine_1.createApp)({ root: __dirname + "/mock", environment: "development" });
        await app.module.load(__1.LoggerModule);
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
            logger.error("test new", { err:e, a: 11 }, { random: 1 });
        }
    });
});
function testStack() {
    throw new Error("bla");
}
//# sourceMappingURL=spec.js.map
