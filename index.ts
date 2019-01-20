"use strict";
import {Logger} from "./module/src/logger";
import {LoggerModule} from "./module/loggerModule";
import {ILogger} from "./module/src/ILogger";
import {IModuleOptions} from "appolo";
import Raven = require('raven');

export interface IOptions extends IModuleOptions {
    sentry?: {
        dsn?: string
        opts?:Raven.ConstructorOptions
    }
    prettyInProduction?: boolean
}

export {ILogger}  from "./module/src/ILogger"
export {Logger, LoggerModule}

