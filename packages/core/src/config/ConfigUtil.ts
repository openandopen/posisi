/**
 *@desc
 *@author liudejian
 *@date 2020-04-05 22:17
 **/

const GLOBAL_CONFIG = new Map<string, any>();
export  class ConfigUtil {


    public static getConfigMap(): Map<string, any> {
        return GLOBAL_CONFIG;
    }

    public static getConfigMapToObject(): any {
        let result = {} as any;
        for (let [key,value] of GLOBAL_CONFIG) {
            result[key] = value;
        }
        return result;
    }

    public static put(key: string, value: any): Map<string, any> {
        return GLOBAL_CONFIG.set(key, value);
    }

    public static remove(key: string): boolean {
        return GLOBAL_CONFIG.delete(key);
    }

    public static get(key: string): any {
        return GLOBAL_CONFIG.get(key);
    }

    public static has(key: string): boolean {
        return GLOBAL_CONFIG.has(key);
    }
}
