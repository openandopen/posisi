/**
 *@desc cookie工具
 *@author liudejian
 *@date 2020-03-26 17:28
 **/
import Cookies, {CookieAttributes} from 'js-cookie'

/**
 * cookie工具
 */
export default class CookieUtil {

    /**
     * 默认cookie配置
     */
    public static defaultCookieConfig(): CookieAttributes {
        let attr = {
            expires: 365,
            path: '/',
            secure: true,
            sameSite: 'strict'
        } as CookieAttributes;
        return attr;
    }

    /**
     * 设置cookie
     * @param key
     * @param value
     * @param options
     */
    public static setCookie(key: string, value: string, options: CookieAttributes): string | undefined {
        return Cookies.set(key, value, options);
    }

    /**
     * 设置cookie
     * @param key
     * @param value
     */
    public static setDefaultCookie(key: string, value: string): string | undefined {
        return CookieUtil.setCookie(key, value, CookieUtil.defaultCookieConfig());
    }

    /**
     * 设置对象cookie
     * @param key
     * @param value
     * @param options
     */
    public static setObjCookie(key: string, value: any, options: CookieAttributes): string | undefined {
        return CookieUtil.setCookie(key, JSON.stringify(value), options);
    }

    /**
     * 获取cookie
     * @param key
     */
    public static getObjCookie<T>(key: string): T {
        let json = CookieUtil.getCookie(key) || "{}";
        return JSON.parse(json);
    }

    /**
     * 获取cookie
     * @param key
     */
    public static getCookie(key: string): string | undefined {
        return Cookies.get(key)
    }

    /**
     * 删除cookie
     * @param key
     */
    public static removeCookie(key: string) {
        Cookies.remove(key);
    }


}
