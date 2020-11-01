import {App, createApp} from '@appolo/core'
import {Logger, LoggerModule} from "../";


let should = require('chai').should();


describe("socket module Spec", function () {

    let app: App;

    beforeEach(async () => {


        app = createApp({root: __dirname + "/mock", environment: "production", port: 8182});

        await app.module.load(LoggerModule);

        await app.launch();

    });

    afterEach(async () => {
        await app.reset();
    });

    it("should write error", async () => {


        let logger = app.injector.getObject<Logger>("logger");


        logger.error.should.be.ok;

        try {
            testStack()
        } catch (e) {
            logger.error("test new", {e, a: 11}, {random: 1})
        }
    })

});


function testStack() {
    throw new Error("bla");
}
