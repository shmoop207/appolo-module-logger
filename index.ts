"use strict";
import {Logger} from "./module/src/logger";
import {LoggerModule} from "./module/loggerModule";
import {ILogger} from "./module/src/ILogger";
import {IModuleOptions} from "appolo";
import {Level} from "./module/src/common/enums";
import {Util} from "./module/src/util";
import * as winston from "winston";
import {ICustomTransport} from "./module/src/transports/ICustomTransport";

export interface IOptions extends IModuleOptions {
    level?: Level,
    transports?: winston.transports.StreamTransportInstance[]
    customTransports?: ICustomTransport[]
}

export {ILogger}  from "./module/src/ILogger"
export {Logger, LoggerModule, ICustomTransport, Util}

