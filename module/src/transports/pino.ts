import {IOptions} from "../../../index";
import {define, alias, singleton, inject} from '@appolo/inject';
import {App} from '@appolo/engine';
import {ICustomTransport} from "./ICustomTransport";
import pino = require("pino");
import {Level} from "../common/enums";
import  jsonStringify = require('fast-safe-stringify');
import {PlainObject} from "../ILogger";
import {Util} from "../util";

@define()
@alias("ICustomTransport")
@singleton()
export class Pino implements ICustomTransport {

    private _logger: pino.Logger;
    @inject() private app: App;

    @inject() private moduleOptions: IOptions;

    readonly DEFAULTS = {};

    public isSupported(): boolean {
        return true;
    }

    private _format(splat: PlainObject): string {
        let meta = "";

        if (splat) {
            splat = Util.prepareMeta(splat);
            meta = jsonStringify.default(splat, null, 0);
            meta = meta == '{}' ? "" : ` ${meta}`;
        }

        return meta
    }

    public async initialize(): Promise<void> {
        let isProduction = process.env.NODE_ENV === "production" || (this.app.env as any).name == "production" || this.app.env.type == "production";

        this._logger = pino({
            prettyPrint: {
                colorize: !isProduction,
                levelFirst: false,
               // messageFormat:'[{levelLabel}] {msg}',
                translateTime: "yyyy-mm-dd HH:MM:ss.l", ignore: 'pid,hostname'
            },
        });
    }

    public log(level: Level, msg: string, args: PlainObject) {

        this._logger[level].call(this._logger, msg + this._format(args));
    }

}
