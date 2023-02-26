/**
 *@desc Posisi整体配置信息
 *@author liudejian
 *@date 2023-02-26 21:20
 **/
export class PosisiConfig {

}

/**
 * feign调用配置
 */
export class FeignConfig {

    /**
     * 异常回调
     * @private
     */
    public static errorCallback: Function;

    /**
     * 成功回调
     * @private
     */
    public static successCallback?: Function;

    /**
     * 开始加载-回调
     */
    public static loadingStartCallback?: Function;

    /**
     * 加载结束-回调
     */
    public static loadingEndCallback?: Function;

    /**
     * 跳转登录-回调
     */
    public static gotoLoginCallback?: Function;
    //基础URL(http://localhost:8080)
    public static BASE_URL: string;

    /**
     * 通用请求头
     */
    public static COMMON_HEADERS = {
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "Content-Type": "application/json"
    };


    /**
     * 排除URL后缀(正则匹配)
     * @type {RegExp[]}
     */
    public static EXCLUDE_URLS = [/\/login$/, /\/enums\/all$/]

    /**
     * 启用Loading
     * @private
     */
    public static LOADING: boolean = true;

    public static IS_DEBUG: boolean = true;

    /**
     * 请求超时时间 30 秒
     */
    public static REQUEST_TIMEOUT = 30000;


    /**
     * 启用DEBUG
     * @param isDebug
     */
    public static enableDebug(): void {
        FeignConfig.IS_DEBUG = true;
    }

    /**
     * 禁用DEBUG
     */
    public static disableDebug(): void {
        FeignConfig.IS_DEBUG = false;
    }

    /**
     * 用户设置通用错误回调-处理
     * @param errorCallback
     */
    public static setErrorCallback(errorCallback: Function) {
        FeignConfig.errorCallback = errorCallback;
    }

    /**
     * 用户设置通用成功回调-处理
     * @param successCallback
     */
    public static setSuccessCallback(successCallback: Function) {
        FeignConfig.successCallback = successCallback;
    }

    /**
     * 启用loading
     */
    public static enableLoading() {
        FeignConfig.LOADING = true;
    }

    /**
     * 关闭load
     */
    public static disableLoading() {
        FeignConfig.LOADING = true;
    }

    /**
     * 设置loadstart开始加载回调
     * @param loadingStartCallback
     */
    public static setLoadingStartCallback(loadingStartCallback?: Function) {
        FeignConfig.loadingStartCallback = loadingStartCallback;
    }

    /**
     * 结束loading 时候回调
     * @param loadingEndCallback
     */
    public static setLoadingEndCallback(loadingEndCallback?: Function) {
        FeignConfig.loadingEndCallback = loadingEndCallback;
    }

    /**
     * 设置基础URL
     * @param baseUrl
     */
    public static setBaseUrl(baseUrl: string): void {
        FeignConfig.BASE_URL = baseUrl;
    }
}
