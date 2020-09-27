"use strict";
import {Logger} from "./module/src/logger";
import {LoggerModule} from "./module/loggerModule";
import {ILogger} from "./module/src/ILogger";
import {Level} from "./module/src/common/enums";
import {Util} from "./module/src/util";
import * as winston from "winston";
import {ICustomTransport} from "./module/src/transports/ICustomTransport";

export interface IOptions {
    level?: Level,
    transports?: winston.transports.StreamTransportInstance[]
    customTransports?: ICustomTransport[]
}

export {ILogger}  from "./module/src/ILogger"
export {Logger, LoggerModule, ICustomTransport, Util}

