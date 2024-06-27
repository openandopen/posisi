/**
 *@desc
 *@author liudejian
 *@date 2023-12-24 10:35
 **/
import {FeignDecode} from "../../feign/decode/FeignDecode";
import {Response} from "../../feign/model/Response";
import {ReqInfo} from "../../feign/model/Meta";
import {ResponseUtil} from "/@/feign/utils/ResponseUtil";

/**
 * 默认解码器
 */
export class DefaultFeignDecode implements FeignDecode {


    /**
     * 对象反序列化
     * @param data
     */
    public decode(data: any): Response<any> {
        return  ResponseUtil.wrapOkResponse(data);
    }

    /**
     * 异常处理
     * @param error
     */
    public error(error: any): Response<any> {
       return  ResponseUtil.wrapErrorResponse(error);
    }

    /**
     * 最终返回调用
     * @param reqInfo
     */
    public finally(reqInfo: ReqInfo): any {

        return reqInfo;
    }



    
 
  
    

}