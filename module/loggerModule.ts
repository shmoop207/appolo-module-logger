import {Module, module, IModuleParams} from "@appolo/engine";
import {Logger} from "./src/logger";
import {IOptions} from "../index";


@module({exports: [Logger]})
export class LoggerModule extends Module<IOptions> {

    protected readonly Defaults: Partial<IOptions> = {};

    public static for(options: IOptions): IModuleParams {
        return {type: LoggerModule, options}
    }
}
