/**
 *@desc
 *@author liudejian
 *@date 2020-03-26 17:54
 **/
import {CommonUtil} from "./CommonUtil";

/**
 * 本地存储工具
 */
export class StorageUtil {

    /**
     * session存储
     * @param key
     * @param value
     */
    public static setSessionStorage(key: string, value: any): void {
        if (CommonUtil.isObject(value)) {
            window.sessionStorage.setItem(key, JSON.stringify(value))
        } else {
            window.sessionStorage.setItem(key, value)
        }
    }

    /**
     * session获取
     * @param key
     */
    public static getSessionStorage(key: string): any {
        let value = window.sessionStorage.getItem(key) || "";
        try {
            if (value.startsWith("{")) {
                return JSON.parse(value);
            }
        } catch (e) {
            value = "";
            console.error(e);
        }
        if (value == undefined || value == 'undefined' || value == 'null' || value == null) {
            value = "";
        }
        return value;
    }

    public static removeSessionStorage(key: string): void {
        window.sessionStorage.removeItem(key);
    }

    public static clearSessionStorage(): void {
        window.sessionStorage.clear();
    }

    /**
     * session存储
     * @param key
     * @param value
     */
    public static setLocalStorage(key: string, value: any): void {

        if (CommonUtil.isObject(value)) {
            localStorage.setItem(key, JSON.stringify(value))
        } else {
            localStorage.setItem(key, value)
        }
    }

    /**
     * session获取
     * @param key
     */
    public static getLocalStorage(key: string): any {
        let value = window.localStorage.getItem(key) || "";
        try {
            if (value.startsWith("{")) {
                return JSON.parse(value);
            }

        } catch (e) {
           value = "";
           console.error(e)
        }
        if (value == undefined || value == 'undefined' || value == 'null' || value == null) {
            value = "";
        }
        return value;
    }

    public static removeLocalStorage(key: string): void {
        window.localStorage.removeItem(key);
    }

    public static clearLocalStorage(): void {
        window.localStorage.clear();
    }


}
