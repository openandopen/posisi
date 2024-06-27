/**
 *@desc
 *@author liudejian
 *@date 2023-12-29 21:16
 **/
export interface StorageApi {

    /**
     * 获取localStorage中的所有KEY
     */
    getLocalStorageKeys():Array<string>;

    /**
     * 获取sessionStorage中的所有KEY
     */
    getSessionStorageKeys():Array<string>;
    /**
     * 设置session key对应的值
     * @param key
     * @param value
     */
     setSessionStorage(key: string, value: any): void;

    /**
     * 获取session存储
     * @param key
     */
    getSessionStorage(key: string): any;

    /**
     * 删除session对应的缓存
     * @param key
     */
    removeSessionStorage(key: string): void;

    /**
     * 清理sesssion
     */
    clearSessionStorage(): void;

    /**
     * session存储
     * @param key
     * @param value
     */
    setLocalStorage(key: string, value: any): void;

    /**
     * session获取
     * @param key
     */
    getLocalStorage(key: string): any;

    removeLocalStorage(key: string): void;

    clearLocalStorage(): void;
}