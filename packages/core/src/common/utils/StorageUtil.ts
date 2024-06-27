import {StorageApi} from "/@/common/adapter/StorageApi";

/**
 * 本地存储工具
 * @desc
 * @author liudejian
 * @date 2020-03-26 17:54
 */
export class StorageUtil {

    public static storageApi: StorageApi;

    public static setStorageApi(storageApi: StorageApi): void {
        StorageUtil.storageApi = storageApi
    }

    public static isObject(object: any): boolean {
        return Object.prototype.toString.apply(object) == '[object Object]';
    }

    /**
     * 返回所有localStorage中的keys
     */
    public static getLocalStorageKeys(): Array<string> {
        if (StorageUtil.storageApi) {
            return  StorageUtil.storageApi.getLocalStorageKeys();
        } else {
            const len = localStorage.length;
            const keys = new Array<string>();
            for (let i = 0; i < len; i++) {
                keys.push(localStorage.key(i) as string);
            }
            return keys;
        }
    }

    /**
     * 返回sessionStorage中所有key
     */
    public static getSessionStorageKeys(): Array<string> {
        if (StorageUtil.storageApi) {
           return  StorageUtil.storageApi.getSessionStorageKeys();
        } else {
            const len = sessionStorage.length;
            const keys = new Array<string>();
            for (let i = 0; i < len; i++) {
                keys.push(sessionStorage.key(i) as string);
            }
            return keys;
        }

    }

    /**
     * session存储
     * @param key
     * @param value
     */
    public static setSessionStorage(key: string, value: any): void {
        if (StorageUtil.storageApi) {
            StorageUtil.storageApi.setSessionStorage(key, value);
        } else {
            if (StorageUtil.isObject(value)) {
                window.sessionStorage.setItem(key, JSON.stringify(value))
            } else {
                window.sessionStorage.setItem(key, value)
            }
        }
    }

    /**
     * session获取
     * @param key
     */
    public static getSessionStorage(key: string): any {
        if (StorageUtil.storageApi) {
            return StorageUtil.storageApi.getSessionStorage(key);
        } else {
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

    }

    public static removeSessionStorage(key: string): void {
        if (StorageUtil.storageApi) {
            StorageUtil.storageApi.removeSessionStorage(key);
        } else {
            window.sessionStorage.removeItem(key);
        }
    }

    public static clearSessionStorage(): void {
        if (StorageUtil.storageApi) {
            StorageUtil.storageApi.clearSessionStorage();
        } else {
            window.sessionStorage.clear();
        }
    }

    /**
     * session存储
     * @param key
     * @param value
     */
    public static setLocalStorage(key: string, value: any): void {
        if (StorageUtil.storageApi) {
            StorageUtil.storageApi.setLocalStorage(key, value);
        } else {
            if (StorageUtil.isObject(value)) {
                localStorage.setItem(key, JSON.stringify(value))
            } else {
                localStorage.setItem(key, value)
            }
        }

    }

    /**
     * session获取
     * @param key
     */
    public static getLocalStorage(key: string): any {
        if (StorageUtil.storageApi) {
            return StorageUtil.storageApi.getLocalStorage(key);
        } else {
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

    }

    public static removeLocalStorage(key: string): void {
        if (StorageUtil.storageApi) {
            StorageUtil.storageApi.removeLocalStorage(key);
        } else {
            window.localStorage.removeItem(key);
        }

    }

    public static clearLocalStorage(): void {
        if (StorageUtil.storageApi) {
            StorageUtil.storageApi.clearLocalStorage();
        } else {
            window.localStorage.clear();
        }
    }


}
