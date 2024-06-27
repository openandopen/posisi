import {FeignDecode, instanceOfFeignDecode} from "../feign/decode/FeignDecode";
import {DefaultFeignDecode} from "../feign/decode/DefaultFeignDecode";
import {ClassUtil} from "../aop/ClassUtil";
import {FeignInterceptor, instanceOfFeignInterceptor} from "../feign/decode/FeignInterceptor";
import {DefaultFeignInterceptor} from "/@/feign/decode/DefaultFeignInterceptor";

/**
 *@desc Posisi整体配置信息
 *@author liudejian
 *@date 2023-02-26 21:20
 **/
export class PosisiConfig {
    /**
     * 异常回调
     * @private
     */
    //  public errorCallback?: Function;

    /**
     * 成功回调
     * @private
     */
    //  public successCallback?: Function;

    /**
     * 开始加载-回调
     */
    public loadingStartCallback?: Function;

    /**
     * 加载结束-回调
     */
    public loadingEndCallback?: Function;

    /**
     * 跳转登录-回调
     */
    public gotoLoginCallback?: Function;


    /**
     * 用户自定义Decode
     * 实现 FeignDecode
     */
    public userDecodeIns?: any;

    /**
     * 实例
     */
    public userInterceptorIns?: any;

    //基础URL(http://localhost:8080)
    public baseUrl?: string;

    /**
     * 忽略异常(如果设置为true,当有异常时全局将不提示)
     */
    public ignoreGlobalError: boolean = false;

    /**
     * 通用请求头
     */
    public COMMON_HEADERS = {
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "Content-Type": "application/json"
    };


    /**
     * 排除URL后缀(正则匹配)
     * @type {RegExp[]}
     */
    public EXCLUDE_URLS = [/\/login$/, /\/enums\/all$/]
    /**
     * 请求超时时间 30 秒
     */
    public REQUEST_TIMEOUT = 30000;
    /**
     * 启用Loading
     * @private
     */
    public loading: boolean = true;

    public isDebug: boolean = true;

    /**
     * 是否忽略全局异常处理
     * @param isIgnoreError
     */
    public setIgnoreGlobalError(isIgnoreError: boolean): PosisiConfig {
        this.ignoreGlobalError = isIgnoreError;
        return this;
    }

    /**
     * 启用DEBUG
     * @param isDebug
     */
    public enableDebug(): PosisiConfig {
        this.isDebug = true;
        return this;
    }

    /**
     * 禁用DEBUG
     */
    public disableDebug(): PosisiConfig {
        this.isDebug = false;
        return this;
    }

    /**
     * 用户设置通用错误回调-处理
     * @param errorCallback(message:any)
     */
    /* public setErrorCallback(errorCallback: Function):PosisiConfig {
         this.errorCallback = errorCallback;
         return this;
     }*/

    /**
     * 用户设置通用成功回调-处理
     * @param successCallback
     */

    /* public setSuccessCallback(successCallback: Function):PosisiConfig {
         this.successCallback = successCallback;
         return this;
     }*/

    /**
     * 启用loading
     */
    public enableLoading(): PosisiConfig {
        this.loading = true;
        return this;
    }

    /**
     * 关闭load
     */
    public disableLoading(): PosisiConfig {
        this.loading = false;
        return this;
    }


    /**
     * 设置loadstart开始加载回调
     * @param loadingStartCallback
     */
    public setLoadingStartCallback(loadingStartCallback?: Function): PosisiConfig {
        this.loadingStartCallback = loadingStartCallback;
        return this;
    }

    /**
     * 结束loading 时候回调
     * @param loadingEndCallback
     */
    public setLoadingEndCallback(loadingEndCallback?: Function): PosisiConfig {
        this.loadingEndCallback = loadingEndCallback;
        return this;
    }

    /**
     * 设置基础URL
     * @param baseUrl
     */
    public setBaseUrl(baseUrl: string): PosisiConfig {
        this.baseUrl = baseUrl;
        return this;
    }

    /**
     * this.setFeignDecode(DefaultFeignDecode)
     * this.setFeignDecode(new DefaultFeignDecode())
     * 设置用户自定义的解码器: 必须实现FeignDecode接口
     * @param userDecode
     */
    public setFeignDecode(userDecodeIns: any): PosisiConfig {
        if (ClassUtil.isClass(userDecodeIns)) {
            this.userDecodeIns = ClassUtil.newInstance(userDecodeIns, {});
        } else {
            this.userDecodeIns = userDecodeIns;
        }
        if (!instanceOfFeignDecode(this.userDecodeIns)) {
            throw new Error(this.userDecodeIns + " 必须实现 FeignDecode所有方法!");
        }
        return this;
    }

    /**
     * 获取解码器
     */
    public getFeignDecode(): FeignDecode {
        if (this.userDecodeIns == undefined) {
            this.userDecodeIns = new DefaultFeignDecode();
        }
        return this.userDecodeIns;
    }

    /**
     * 设置拦截器
     * @param userInterceptor
     */
    public setUserInterceptor(userInterceptorIns: any): PosisiConfig {
        if (ClassUtil.isClass(userInterceptorIns)) {
            this.userInterceptorIns = ClassUtil.newInstance(userInterceptorIns, {});
        } else {
            this.userInterceptorIns = userInterceptorIns;
        }
        if (!instanceOfFeignInterceptor(this.userInterceptorIns)) {
            throw new Error(this.userInterceptorIns + " 必须实现 FeignInterceptor所有方法!");
        }
        return this;
    }

    /**
     * 获取用户自定义拦截器
     */
    public getUserInterceptor(): FeignInterceptor {
        if (this.userInterceptorIns == undefined) {
            this.userInterceptorIns = new DefaultFeignInterceptor();
        }
        return this.userInterceptorIns;
    }

}
