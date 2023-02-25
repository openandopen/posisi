/**
 *@desc 后台响应对象
 *@author liudejian
 *@date 2020-01-23 23:11
 **/
import {BizCode, HttpStatus} from "../enums";
import {CommonUtil} from "../../common";


export class Response<T> {
    //响应结果
    data?: T;
    //messgae
    message?: string;
    //响应的http 状态
    status: number = 200;
    //业务状态
    code: number = BizCode.SUCCESS;
    //响应参数(扩展参数)
    params?: Map<string, object>;

    public static COMMON_SUCCESS_TIP = "操作成功"

    private static errorCallback?: Function;

    private static successCallback?: Function;

    /**
     * 用户设置通用错误回调-处理
     * @param errorCallback
     */
    public static setErrorCallback(errorCallback: Function) {
        Response.errorCallback = errorCallback;
    }

    /**
     * 用户设置通用成功回调-处理
     * @param successCallback
     */
    public static setSuccessCallback(successCallback: Function) {
        Response.successCallback = successCallback;
    }


    public isSuccess(): boolean {
        return this.status === 200 && this.code === BizCode.SUCCESS;
    }


    /**
     *
     * @param callback 回调返回正常结果
     */
    public success(callback: Function): this {
        if (this.isSuccess() && callback) {
            callback(this.getResult())
        }
        return this;
    }

    public error(callback: Function): this {
        if (!this.isSuccess() && callback) {
            callback(this.getMessage())
        }
        return this;
    }

    /**
     * 成功提示
     * @param success
     */
    public successTip(...success: any): this {
        if (this.isSuccess()) {
            if (success != null && success != undefined) {
               // console.log(success[0])
                if (Response.successCallback) {
                    Response.successCallback(success)
                }
            } else {
                if (Response.successCallback) {
                    Response.successCallback(Response.COMMON_SUCCESS_TIP)
                }
            }
        }
        return this;
    }

    /**
     * 错误提示
     * @param errors
     */
    public errorTip(...errors: any): this {
        if (!this.isSuccess()) {
            if (errors != null && errors != undefined && errors.length > 0) {
                if (Response.errorCallback) {
                    Response.errorCallback(errors[0])
                }
            } else {
                if (Response.errorCallback) {
                    Response.errorCallback(this.getMessage())
                }
            }
        }
        return this;
    }


    public getMessage(): string {
        return this.message || ""
    }

    public setStatus(status: number): Response<T> {
        this.status = status;
        return this;
    }

    public setMessage(message?: string): Response<T> {
        this.message = message;
        return this;
    }

    public setData(data: T): Response<T> {
        this.data = data;
        return this;
    }

    public getResult(): T {
        return this.data || (new Object() as T);
    }

    public setCode(code: number): Response<T> {
        this.code = code;
        return this;
    }

    public getParams(): Map<string, object> {
        return this.params || new Map<string, object>();
    }


    public addAllParams(map: any): this {
        if (!CommonUtil.isEmptyObject(map)) {
            let mp = map as Map<any, any>;
            if (CommonUtil.isMap(mp)) {
                let keys = mp.keys();
                if (keys) {
                    let next = keys.next();
                    while (!next.done) {
                        let v = next.value;
                        // @ts-ignore
                        this.addParam(v, mp.get(v))
                        next = keys.next();
                    }
                }
            } else if (CommonUtil.isObject(map) && map != undefined) {
                let keys = Reflect.ownKeys(map || {});
                if (keys) {
                    for (let i = 0; i < keys.length; i++) {
                        let k = keys[i] as string;

                    }
                    keys.forEach((k) => {
                        let ks = k as string;
                        this.addParam(ks, map[ks]);
                    })
                }
            }
        }
        return this;
    }

    public addParam(key: string, value: object): this {
        if (this.params == undefined || this.params == null) {
            this.params = new Map<string, object>();
        }
        this.params.set(key, value);
        return this;
    }

    public removeParam(key: string): this {
        if (this.params == undefined || this.params == null) {
            return this;
        }
        this.params.delete(key);
        return this;
    }

    /**
     * 构建实例
     * @param status
     * @param code
     */
    public static build(status: number, code: number): Response<any> {
        return new Response<any>().setCode(code).setStatus(status)
    }

    /**
     * 成功
     */
    public static ok(): Response<any> {
        return new Response<any>().setCode(BizCode.SUCCESS).setStatus(HttpStatus.OK)
    }

    /**
     * 失败
     */
    public static fail(): Response<any> {
        return new Response<any>().setCode(BizCode.FAIL).setStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    }

}
