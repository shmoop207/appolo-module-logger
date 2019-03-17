import {Module, module} from "appolo/index";
import {Logger} from "./src/logger";
import {IOptions} from "../index";


@module({exports: [Logger], immediate: true})
export class LoggerModule extends Module<IOptions> {

    protected readonly Defaults: Partial<IOptions> = {

    };

    constructor(opts?: IOptions) {
        super(opts);
    }
}
