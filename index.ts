"use strict";
import {Logger} from "./module/src/logger";
import {LoggerModule} from "./module/loggerModule";
import {ILogger} from "./module/src/ILogger";
import {IModuleOptions} from "appolo";
import {Level} from "./module/src/common/enums";
import * as winston from "winston";

export interface IOptions extends IModuleOptions {
    level?: Level,
    transports?: winston.transports.StreamTransportInstance[]
}

export {ILogger}  from "./module/src/ILogger"
export {Logger, LoggerModule}

