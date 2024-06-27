import {ReqInfo} from "../../feign/model/Meta";
import {Response} from "../../feign/model/Response";
/**
 *@desc 解码器
 *@author liudejian
 *@date 2023-12-24 10:22
 **/
export interface FeignInterceptor {

    /**
     * 请求前处理
     * @param reqInfo
     */
    requestPreProcess(reqInfo: ReqInfo) : ReqInfo;

    /**
     * 请求异常处理
     * @param error
     */
    requestErrorProcess(res: any): any;

    /**
     * 响应成功处理
     * @param data
     */
    responseSuccessProcess(res: any): any;

    /**
     * 响应异常处理
     * @param error
     */
    responseErrorProcess(res: any): any;

    /**
     * 最终处理完成
     */
    finallyProcess(reqInfo: ReqInfo): any;
}

/**
 * 判断是否是 FeignDecode 实例
 * @param object
 */
const instanceOfFeignInterceptor = (object: any):object is FeignInterceptor => {
    return ('requestPreProcess' in object && 'requestErrorProcess' in object && 'responseSuccessProcess' in  object
        && 'responseErrorProcess' in  object && 'finallyProcess' in  object);
}


export {instanceOfFeignInterceptor}