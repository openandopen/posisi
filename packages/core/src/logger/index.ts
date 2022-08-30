import "reflect-metadata";
import {CommonUtil} from "../common";


/**
 * 日志级别
 */
export enum Level {
    DEBUG = 0,
    TRACE = 1,
    WARN = 2,
    INFO = 3,
    ERROR = 4,
}

export function getLevelName(index: number): string {
    switch (index) {
        case 0:
            return "DEBUG"
        case 1:
            return "TRACE"
        case 2:
            return "WARN"
        case 3:
            return "INFO"
        case 4:
            return "ERROR"
        default:
            return "INFO"
    }

}

/**
 *@desc 日志类
 *@author liudejian
 *@date 2020-02-27 12:05
 **/
export class Logger {
    /**
     * 日志模板
     * @private
     */
        //  private category: string = "{time} {level} {module} {msg}";
    private static ENABLE: boolean = true;

    /**
     * 默认info级别
     * @private
     */
    private static LEVEL: number = Level.INFO;

    /**
     * 启用日志
     */
    public static enable() {
        Logger.ENABLE = true
    }

    /**
     * 禁用日志
     */
    public static disable() {
        Logger.ENABLE = false;
    }

    /**
     * 获取日志级别
     */
    public static getLevel(): Level {
        return Logger.LEVEL;
    }

    /**
     * 设置日志级别
     * @param level
     */
    public static setLevel(level: Level) {
        Logger.LEVEL = level;
    }

    /**
     * 模块名class类
     * @private
     */
    private classModule?: any;

    /**
     * 当前类名
     * @private
     */
    private className?: string;

    /**
     * 当前类原型
     * @private
     */
    private classProto?: any;

    private static CURRENT_METHOD_NAME = Symbol("currentMethodName")
    private static CURRENT_METHOD_NAME_KEY = Symbol("currentMethodNameKey")

    /**
     * 获取日志类
     * @param classModule typescript 类
     */
    public static getLogger(classModule: any): Logger {
        let logger = new Logger();
        logger.classModule = classModule;
        logger.className = classModule.name;
        logger.classProto = classModule.prototype;
        Logger.redefineClass(logger.classModule);
        return logger;
    }

    /**
     * 重新定义类
     * @param classModule
     */
    private static redefineClass(classModule: any) {
        let proto = classModule.prototype;
        //es5以及以前可以
        //let keys = Object.keys(proto);
        //es5以后使用些方式获取
        let keys = Reflect.ownKeys(proto);
        let currentMethodName = this.CURRENT_METHOD_NAME;
        let currentMthoeNameKey = this.CURRENT_METHOD_NAME_KEY
        keys.forEach((key, index, ary) => {
            if ('constructor' != key) {
                let method = proto[key];
                if (typeof method == 'function') {
                    let descriptor = Reflect.getOwnPropertyDescriptor(proto, key);
                    method = descriptor?.value;
                    // @ts-ignore
                    descriptor.value = function () {
                        try {
                            Reflect.defineMetadata(currentMethodName, key, proto, currentMthoeNameKey);
                            //obj = Reflect.apply(method,this, arguments);
                            return method?.apply(this, arguments)
                        } finally {
                            Reflect.deleteMetadata(currentMethodName, proto)
                        }
                    }
                    if (descriptor) {
                        Reflect.defineProperty(proto, key, descriptor);
                    }
                }
            }
        })
    }

    /**
     * 给日志增加前缀
     * @param template 原日志模板
     * @param level 日志级别
     * @private
     */
    private addPrefix(template: any, level: Level) {
        if (typeof template == 'object') {
            template = JSON.stringify(template);
        }
        let currentMethodName = Logger.CURRENT_METHOD_NAME;
        let currentMthoeNameKey = Logger.CURRENT_METHOD_NAME_KEY
        let currentMethod = Reflect.getOwnMetadata(currentMethodName, this.classProto, currentMthoeNameKey);
        let methodStr = "";
        if (currentMethod != undefined) {
            methodStr = "." + currentMethod;
        }

        let prefix = CommonUtil.dateFormat(new Date()) + "|" + getLevelName(level) + "|" + this.className + methodStr
        return prefix + " " + template;
    }

    /**
     * 格式化字符串
     * @param template
     * @param val
     * @constructor
     */
    public formatString(template: any, ...args: any): string {
        if (typeof template == 'object') {
            return JSON.stringify(template);
        }
        if (args) {
            let params = args[0] || [];
            for (let index = 0; index < params.length; index++) {
                let value = params[index];
                if (typeof value == 'object') {
                    value = JSON.stringify(value);
                }
                template = template.replace(`{${index}}`, value);
                template = template.replace(`{}`, value);
            }
        }
        return template;
    }

    /**
     * info信息
     * @param message
     * @param args
     */
    public info(message: any, ...args: any): void {
        if (!Logger.ENABLE) {
            return;
        }
        if (Logger.LEVEL > Level.INFO) {
            return;
        }
        let data = this.formatString(message, args)
        data = this.addPrefix(data, Level.INFO)
        console.log(data);
    }

    /**
     * error
     * @param message
     * @param args
     */
    public error(message: any, ...args: any): void {
        if (!Logger.ENABLE) {
            return;
        }
        if (Logger.LEVEL > Level.ERROR) {
            return;
        }
        let data = this.formatString(message, args)
        data = this.addPrefix(data, Level.ERROR)
        console.error(data);
    }

    /**
     * debug
     * @param message
     * @param args
     */
    public debug(message: any, ...args: any): void {
        if (!Logger.ENABLE) {
            return;
        }
        if (Logger.LEVEL > Level.DEBUG) {
            return;
        }
        let data = this.formatString(message, args)
        data = this.addPrefix(data, Level.DEBUG)
        console.debug(data);
    }

    /**
     * trace
     * @param message
     * @param args
     */
    public trace(message: any, ...args: any): void {
        if (!Logger.ENABLE) {
            return;
        }
        if (Logger.LEVEL > Level.TRACE) {
            return;
        }
        let data = this.formatString(message, args)
        data = this.addPrefix(data, Level.TRACE)
        console.trace(data);
    }

    /**
     * warn
     * @param message
     * @param args
     */
    public warn(message: any, ...args: any): void {
        if (!Logger.ENABLE) {
            return;
        }
        if (Logger.LEVEL > Level.WARN) {
            return;
        }
        let data = this.formatString(message, args)
        data = this.addPrefix(data, Level.WARN)
        console.warn(data);
    }
}
