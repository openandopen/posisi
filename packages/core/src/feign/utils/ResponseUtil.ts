import {Response} from "../../feign/model/Response";
/**
 *@desc
 *@author liudejian
 *@date 2023-12-27 22:23
 **/
export  class ResponseUtil {

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
}