"use strict";
import {Logger} from "./module/src/logger";
import {LoggerModule} from "./module/loggerModule";
import {ILogger} from "./module/src/ILogger";
import {Level} from "./module/src/common/enums";
import {Util} from "./module/src/util";
import {ICustomTransport} from "./module/src/transports/ICustomTransport";

export interface IOptions {
    level?: Level,
    transports?: ICustomTransport[]
}

export {ILogger, PlainObject, ILoggerMsgOptions, ILoggerParams} from "./module/src/ILogger"
export {Level} from "./module/src/common/enums"
export {Logger, LoggerModule, ICustomTransport, Util}

