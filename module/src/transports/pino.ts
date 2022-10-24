import {IOptions} from "../../../index";
import {define, alias, singleton, inject} from '@appolo/inject';
import {App} from '@appolo/engine';
import {ICustomTransport} from "./ICustomTransport";
import pino from "pino" ;
import pretty from 'pino-pretty'
import {Level} from "../common/enums";
import jsonStringify from 'fast-safe-stringify';
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

            try {
                meta = jsonStringify(splat, null, 0);
                meta = meta == '{}' ? "" : ` ${meta}`;
            } catch (e) {

            }
        }

        return meta
    }

    public async initialize(): Promise<void> {
        let isProduction = process.env.NODE_ENV === "production" || (this.app.env as any).name == "production" || this.app.env.type == "production";

        this._logger = pino(pretty({
                colorize: !isProduction,
                levelFirst: false,
                translateTime: "yyyy-mm-dd HH:MM:ss.l", ignore: 'pid,hostname'

            }
        ))

    }

    public log(level: Level, msg: string, args: PlainObject) {

        this._logger[level].call(this._logger, msg + this._format(args));
    }

}
