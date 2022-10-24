import {Level} from "./common/enums";

export type PlainObject = { [name: string]: any }


type LoggerFn = (msg: string, meta?: PlainObject, options?: ILoggerMsgOptions) => void;

export interface ILoggerParams {
    level: Level,
    msg: string,
    meta: PlainObject,
    options: ILoggerMsgOptions
}

export interface ILogger {
    error: LoggerFn
    info: LoggerFn
    debug: LoggerFn
    warn: LoggerFn

    clone(): ILogger

    setTransform(fn: (params: ILoggerParams) => ILoggerParams)
}

export interface ILoggerMsgOptions {
    random?: number
}
