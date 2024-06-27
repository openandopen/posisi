import {FeignInterceptor} from "./FeignInterceptor";
import {ReqInfo} from "../../feign/model/Meta";

/**
 *@desc
 *@author liudejian
 *@date 2024-03-10 23:02
 **/
export   class DefaultFeignInterceptor implements FeignInterceptor{
    finallyProcess(reqInfo: ReqInfo): any {
        return reqInfo;
    }

    responseErrorProcess(res: any): any {
        return res;
    }

    responseSuccessProcess(res:any): any {
        return res;
    }

    requestErrorProcess(res: any): any {
        return res
    }

    requestPreProcess(reqInfo: ReqInfo): ReqInfo {
        return reqInfo;
    }
}