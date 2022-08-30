/**
 *@desc url工具
 *@author liudejian
 *@date 2020-02-06 22:15
 **/
import {CommonUtil} from "./CommonUtil";


export class UrlUtil {

    /**
     * URL拼接
     * @param uriFirst
     * @param uriSecond
     */
    public static urlJoin(uriFirst: string, uriSecond: string): string {
        if (CommonUtil.isBlank(uriFirst)) {
            return uriSecond;
        }
        if (CommonUtil.isBlank(uriSecond)) {
            return uriFirst;
        }
        if (uriFirst.endsWith("/") && uriSecond.startsWith("/")) {
            return uriFirst + uriSecond.substring(1, uriSecond.length);
        } else if (uriFirst.endsWith("/") && !uriSecond.startsWith("/")) {
            return uriFirst + uriSecond;
        } else if (!uriFirst.endsWith("/") && !uriSecond.startsWith("/")) {
            return uriFirst + "/" + uriSecond;
        } else {
            return uriFirst + uriSecond;
        }
    }

}


