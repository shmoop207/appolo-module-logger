export type PlainObject = { [name: string]: any }


type LoggerFn = (msg: string, meta?: PlainObject) => void;

export interface ILogger {
    error: LoggerFn
    info: LoggerFn
    debug: LoggerFn
    warn: LoggerFn
}
