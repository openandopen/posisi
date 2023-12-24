/**
 *@desc url工具
 *@author liudejian
 *@date 2020-02-06 22:15
 **/
import {CommonUtil} from "./CommonUtil";


export class UrlUtil {

    /**
     * URL拼接 (以 / 拼接两个字符串)
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

    /**
     * 解析URI
     * @param uri
     */
    public static parseUri(uri: string): any {
        if (uri.indexOf("?") != -1) {
            uri = uri.substring(uri.indexOf("?")+1);
        }
        let params = {}, queries, temp, i, l;
        queries = uri.split("&");
        for (i = 0, l = queries.length; i < l; i++) {
            temp = queries[i].split('=');
            params[temp[0]] = temp[1];
        }
        return params;
    }

    /**
     * 解析参数
     */
    public static parseLocationParams(): any {
        let uri = window.location.href;
        if (uri.indexOf("?") != -1) {
            uri = uri.substring(uri.indexOf("?")+1);
        }
        let params = {}, queries, temp, i, l;
        queries = uri.split("&");
        for (i = 0, l = queries.length; i < l; i++) {
            temp = queries[i].split('=');
            params[temp[0]] = temp[1];
        }
        return params;
    }

    /**
     * 根据参数名获取(window.location.search中)URI参数值
     * @param paramName
     */
    public static getUriParam(paramName:string):string {
        let params =  UrlUtil.parseLocationParams();
        if (params) {
            return params[paramName];
        }
        return ""
    }

    /**
     * 更新当前 window.location.href 中的key=value (刷新页面)
     * @param key
     * @param value
     */
    public static updateLocationUrlReload(key: string, value: string) {
        window.location.href = UrlUtil.updateLocationParam(window.location.href, key, value)
    }

    /**
     * 更新当前 window.location.href 中的key=value (不刷新页面)
     * @param key
     * @param value
     */
    public static updateLocationUrl(key: string, value: string) {
        let uri = window.location.href
        let newurl = UrlUtil.updateLocationParam(uri, key, value)
        //向当前url添加参数，没有历史记录
        window.history.replaceState({
            path: newurl
        }, '', newurl);
    }

    /**
     * 更新当前 uri 中的key=value
     * @param url  example:http://127.0.0.1:8599/#/cvparse?sourceId=1118606561115582464
     * @param key  example:sourceId
     * @param value  example: 1118606561115582464
     */
    public static updateLocationParam(uri: string, key: string, value: string): string {

        if (!value) {
            return uri;
        }
        let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        let separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            return uri + separator + key + "=" + value;
        }
    }
}


