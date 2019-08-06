import {Level} from "../common/enums";
import {PlainObject} from "../ILogger";

export interface ICustomTransport {

    initialize(): Promise<void>

    log(level: Level, msg: string, args: PlainObject)
}
