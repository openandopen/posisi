import {ReqInfo} from "../../feign/model/Meta";
import {FeignInterceptor} from "./FeignInterceptor";

/**
 *@desc 解码器
 *@author liudejian
 *@date 2023-12-24 10:22
 **/
export interface FeignDecode {



    /**
     * 对象反序列化
     * @param data
     */
    decode(data: any): any;

    /**
     * 异常处理
     * @param error
     */
    error(error: any): any;

    /**
     * 最终调用
     */
    finally(reqInfo: ReqInfo): any;
}

/**
 * 判断是否是 FeignDecode 实例
 * @param object
 */
const instanceOfFeignDecode = (object: any): object is FeignDecode => {
    return ('decode' in object && 'error' in object && 'finally' in object);
}


export {instanceOfFeignDecode}