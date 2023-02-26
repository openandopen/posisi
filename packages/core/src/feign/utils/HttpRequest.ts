import axios, {AxiosInstance, AxiosRequestConfig} from 'axios'

import {BizCode, RequestMethod} from "../enums";
import {ReqInfo} from "../model/Meta";
import {Response} from "../model/Response"
import {AccountContext} from "../../common/account/AccountContext";
import {FeignConfig} from "../../config/Configs";



//URL模板
const PATTERN = /\{(\w*[:]*[=]*\w+)\}(?!})/g


/**
 * 是否匹配排除的URL
 * @param url
 * @returns {boolean}
 */
export function isMatchExclude(url: string): boolean {
    let value = FeignConfig.EXCLUDE_URLS.find(value => {
        return url.search(value) > 0;
    })
    if (value != null && value != undefined) {
        return true;
    }
    return false;
}



/**
 * @desc 所有后台API配置
 * @author liudejian
 * @date 2020-07-06 16:02:30
 */
export class HttpRequest {



    public static AXIOS_INSTANCE: AxiosInstance;

    constructor(baseUrl: string) {
        FeignConfig.setBaseUrl(baseUrl);
    }





    /**
     * 请求拦截器
     * @param currentInstance
     * @private
     */
    private static initGlobalRequestInterceptor(currentInstance: AxiosInstance) {
        currentInstance.interceptors.request.use(
            //【1】请求配置参数
            (config: any) => {
                let token = AccountContext.getToken();
                let url = config.url || "";
                if ((token == null || token == undefined) && !isMatchExclude(url)) {
                    if (FeignConfig.gotoLoginCallback) {
                        FeignConfig.gotoLoginCallback(url)
                    }
                }
                // 请求头信息
                for (let key in FeignConfig.COMMON_HEADERS) {
                    config.headers[key] = FeignConfig.COMMON_HEADERS[key];
                }
                config.headers["X-Custom-Header-REQTIME"] = new Date().getTime();
                config.headers["Authorization"] = 'Bearer ' + token;

                if (FeignConfig.LOADING && FeignConfig.loadingStartCallback) {
                    FeignConfig.loadingStartCallback();
                    /*  loading = ElLoading.service({
                          lock: true,
                          text: '正在请求数据',
                          background: 'rgba(237,234,234,0.5)',
                          spinner: 'el-icon-loading'
                      })*/
                }


                if (FeignConfig.IS_DEBUG) {
                    console.log("request-config:", config)
                }
                return config
            },
            //【2】请求异常
            (error: any) => {
                if (FeignConfig.IS_DEBUG) {
                    console.log("request-error:", error)
                }
                if (FeignConfig.LOADING && FeignConfig.loadingEndCallback) {
                    FeignConfig.loadingEndCallback();
                }
                let res = Response.fail().setStatus(0).setMessage("请求异常:" + error).setCode(BizCode.FAIL);
                if (FeignConfig.errorCallback) {
                    FeignConfig.errorCallback(res.getMessage())
                }
                return Promise.reject(error)
            }
        )
    }

    /**
     * 全局应拦截器
     * @param currentInstance
     * @private
     */
    private static initGlobalResponseInterceptor(currentInstance: AxiosInstance) {
        currentInstance.interceptors.response.use(
            //【1】响应对象
            (response: any) => {
                    if (FeignConfig.LOADING && FeignConfig.loadingEndCallback) {
                        FeignConfig.loadingEndCallback();
                    }

                if (FeignConfig.IS_DEBUG) {
                    console.log("response-data:", response)
                }
                // http状态
                const httpStatus = response.status
                //状态描述
                const resText = response.statusText;
                //业务数据
                const resultData = response.data;
                //响应头信息
                const headers = response.headers;

                //  console.log("=====111====", httpStatus, resText, resultData, headers)
                if (200 === httpStatus) {
                    return resultData;
                } else {
                    let error = new Error();
                    error = HttpRequest.httStatusConvert(error, httpStatus, resText);
                    console.log("error========", error)
                    return Response.fail().setMessage(error.message).setStatus(httpStatus);
                }
            },
            //【2】 响应异常
            (error: any) => {
                /*    if (loading && this.ENABLE_LOADING) {
                        loading.close()
                    }*/
                if (FeignConfig.IS_DEBUG) {
                    console.log("response-error:", error)
                }
                let res: Response<any> = {} as any;
                // console.error("error=", error)
                //错误响应对象
                let errResponse = error.response;
                if (errResponse == undefined && error.isAxiosError) {
                    res = Response.fail().setStatus(404).setMessage("请求服务无响应");
                    if (FeignConfig.errorCallback) {
                        FeignConfig.errorCallback(res.getMessage())
                    }
                    return res;
                }
                //响应的业务异常数据
                let errData = errResponse.data;

                if (errData) {
                    //console.log("errData============",errData)
                    let message = errData.message;
                    if (!message) {
                        message = errData.error;
                    }
                    res = Response.fail().setStatus(errData.status).setMessage(message).setCode(errData.code);
                    if (FeignConfig.errorCallback) {
                        FeignConfig.errorCallback(res.getMessage())
                    }
                    return res;
                }

                //请求配置数据
                let errConfig = errResponse.config;
                //请求对象
                let errReq = errResponse.request;
                // http状态
                const httpStatus = errResponse.status;
                //状态描述
                const resText = errResponse.statusText;
                error = HttpRequest.httStatusConvert(error, httpStatus, resText);
                res = Response.fail().setMessage(error.message).setStatus(httpStatus);
                if (FeignConfig.errorCallback) {
                    FeignConfig.errorCallback(res.getMessage())
                }
                return res;
            }
        )
    }


    /**
     * 获取axios实例
     */
    public static getAxiosInstance(): AxiosInstance {
        if (HttpRequest.AXIOS_INSTANCE == undefined || HttpRequest.AXIOS_INSTANCE == null) {
            HttpRequest.AXIOS_INSTANCE = axios.create({
                //  baseURL: process.env.VUE_APP_API,
                baseURL: FeignConfig.BASE_URL,
                // 请求超时时间
                timeout: FeignConfig.REQUEST_TIMEOUT
            });
            HttpRequest.initGlobalRequestInterceptor(HttpRequest.AXIOS_INSTANCE);
            HttpRequest.initGlobalResponseInterceptor(HttpRequest.AXIOS_INSTANCE);
        }
        return HttpRequest.AXIOS_INSTANCE;
    }


    /**
     * 获取模板值
     * @param template 模板 {username}/{age}
     * @param data {username:'good',age:100}
     * @return good/100
     * @example this.$templateEngine(template,data);
     */
    public static templateEngine(template: string, json: any) {
        return template.replace(PATTERN, function (match, key, value) {
            return json[key]
        })
    }


    /**
     * 后台网络请求
     * @param api 请求API
     *example:
     *  {
     *     method: 'POST',
     *     path : '/api/xx/xxx'
     * }
     * @param bodyData body体请求
     * @param paramData 参数请求
     * @param config 请求config
     * @param finishCallback 请求回调不管成功与否都会调用
     * @returns {Promise<unknown>}
     */
    public static request(reqInfo: ReqInfo, config: AxiosRequestConfig, finishCallback: any): Promise<any> {
        config = config || {};
        let axiosIns = HttpRequest.getAxiosInstance();
        let paramData = reqInfo.paramData;
        let bodyData = reqInfo.bodyData;
        let headerData = reqInfo.headerData;
        let reqUri = reqInfo.uri || ""
        //设置header
        if (headerData) {
            let headers: any = {}
            let headerKeys = headerData.keys();
            let headerKey = headerKeys.next();
            while (!headerKey.done) {
                let hk = headerKey.value;
                headers[hk] = headerData.get(hk);
                headerKey = headerKeys.next();
            }
            config.headers = headers;
        }
        //设置URI参数
        let paramRequest: any = {};
        if (paramData) {
            let keys = paramData.keys();
            let key = keys.next();
            while (!key.done) {
                let kv = key.value;
                paramRequest[kv] = paramData.get(kv);
                key = keys.next();
            }
        }
        reqUri = this.templateEngine(reqUri, paramRequest);
        return new Promise((resolve, reject) => {
            const reqType = reqInfo.method;
            if (RequestMethod.POST === reqType) {
                axiosIns.post(reqUri, bodyData, config).then(function (res: any) {
                    resolve(HttpRequest.wrapOkResponse(res))
                }).catch(function (error: any) {
                    reject(HttpRequest.wrapErrorResponse(error))
                    // @ts-ignore
                }).finally(function () {
                    if (finishCallback) {
                        finishCallback(reqInfo);
                    }
                })
            } else if (RequestMethod.PUT === reqType) {
                axiosIns.put(reqUri, bodyData, config).then(function (res: any) {
                    resolve(HttpRequest.wrapOkResponse(res))
                }).catch(function (error: any) {
                    reject(HttpRequest.wrapErrorResponse(error))
                    // @ts-ignore
                }).finally(function () {
                    if (finishCallback) {
                        finishCallback(reqInfo);
                    }
                })
            } else if (RequestMethod.PATCH === reqType) {
                axiosIns.patch(reqUri, bodyData, config).then(function (res: any) {
                    resolve(HttpRequest.wrapOkResponse(res))
                }).catch(function (error: any) {
                    reject(HttpRequest.wrapErrorResponse(error))
                    // @ts-ignore
                }).finally(function () {
                    if (finishCallback) {
                        finishCallback(reqInfo);
                    }
                })
            } else if (RequestMethod.GET === reqType) {
                config = Object.assign({params: paramRequest}, config)
                axiosIns.get(reqUri, config).then(function (res: any) {
                    resolve(HttpRequest.wrapOkResponse(res))
                }).catch(function (error: any) {
                    reject(HttpRequest.wrapErrorResponse(error))
                    // @ts-ignore
                }).finally(function () {
                    if (finishCallback) {
                        finishCallback(reqInfo);
                    }
                })
            } else if (RequestMethod.DELETE === reqType) {
                config = Object.assign({params: paramRequest}, config)
                axiosIns.delete(reqUri, config)
                    .then(function (res: any) {
                        resolve(HttpRequest.wrapOkResponse(res))
                    }).catch(function (error: any) {
                    reject(HttpRequest.wrapErrorResponse(error))
                    // @ts-ignore
                }).finally(function () {
                    if (finishCallback) {
                        finishCallback(reqInfo);
                    }
                })

            } else if (RequestMethod.HEAD === reqType) {
                config = Object.assign({params: paramRequest}, config)
                axiosIns.head(reqUri, config).then(function (res: any) {
                    resolve(HttpRequest.wrapOkResponse(res))
                }).catch(function (error: any) {
                    reject(HttpRequest.wrapErrorResponse(error))
                    // @ts-ignore
                }).finally(function () {
                    if (finishCallback) {
                        finishCallback(reqInfo);
                    }
                })

            } else if (RequestMethod.OPTIONS === reqType) {
                config = Object.assign({params: paramRequest}, config)
                axiosIns.options(reqUri, config).then(function (res: any) {
                    resolve(HttpRequest.wrapOkResponse(res))
                }).catch(function (error: any) {
                    reject(HttpRequest.wrapErrorResponse(error))
                    // @ts-ignore
                }).finally(function () {
                    if (finishCallback) {
                        finishCallback(reqInfo);
                    }
                })
            }
            // @ts-ignore
        }).finally(() => {
        })
    }

    /**
     * 正常响应包装
     * @param res
     */
    public static wrapOkResponse(res: Response<any>): Response<any> {
        return Response.build(res.status, res.code)
            .setData(res.data).addAllParams(res.params).setMessage(res.message);
    }

    /**
     * 错误响应包装
     * @param errorRes
     */
    public static wrapErrorResponse(errorRes: any): Response<any> {
        if (errorRes instanceof Response) {
            return errorRes;
        } else {
            return Response.fail().setMessage(errorRes)
        }
    }

    /**
     * http 状态异常转换
     * @param error
     * @param status
     * @param errorMsg
     * @returns {*}
     */
    public static httStatusConvert(error: any, status: number, errorMsg: string) {
        if (status == 400) {
            error.message = '请求参数错误:' + errorMsg
        } else if (status == 401) {
            window.localStorage.clear();
            error.message = '未授权，请登录'
        } else if (status == 403) {
            error.message = '拒绝访问'
        } else if (status == 404) {
            error.message = `请求地址出错: ${error.response.config.url}`
        } else if (status == 408) {
            error.message = '请求超时'
        } else if (status == 500) {
            error.message = errorMsg
        } else if (status == 501) {
            error.message = '服务未实现:' + errorMsg
        } else if (status == 502) {
            error.message = '网关错误:' + errorMsg
        } else if (status == 503) {
            error.message = '服务不可用:' + errorMsg
        } else if (status == 504) {
            error.message = '网关超时:' + errorMsg
        } else if (status == 505) {
            error.message = 'HTTP版本不受支持:' + errorMsg
        } else if (status == 0) {
            error.message = '请检查网路连接'
        }
        // console.error("error", error)
        return error
    }
}

