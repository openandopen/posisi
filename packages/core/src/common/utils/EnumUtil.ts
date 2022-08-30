
import {DictDto} from "../../model/DictDto";
import {StorageUtil} from "./StorageUtil";
/**
 *@desc 枚举工具类
 *@author liudejian
 *@date 2020-03-20 21:45
 **/


const GLOBAL_APP_ENUMS: Map<string, Map<string, Array<any>>> = new Map<string, Map<string, Array<any>>>();

/**
 *@desc 后台枚举工具
 *@author liudejian
 *@date 2020-01-13 17:47
 **/

/**
 * 枚举工具类
 */
export class EnumUtil {

    private static CACHE_ENUMS_KEY = "enums";

    public static cacheEnums(enums: Array<DictDto>): boolean {
        StorageUtil.setLocalStorage(EnumUtil.CACHE_ENUMS_KEY, JSON.stringify(enums));
        return true;
    }

    public static getCacheEnums(): Array<DictDto> {
        let enumsJson = StorageUtil.getLocalStorage(EnumUtil.CACHE_ENUMS_KEY);
        if (enumsJson != null && enumsJson != undefined && enumsJson != "") {
            return JSON.parse(enumsJson);
        }
        return new Array<DictDto>();
    }

    /**
     * 清空枚举
     * @constructor
     */
    public static ClearEnum(): boolean {
        GLOBAL_APP_ENUMS.clear()
        StorageUtil.removeLocalStorage(EnumUtil.CACHE_ENUMS_KEY)
        return true;
    }

    /**
     * 返回枚举
     * @param appCode 应用编码
     * @param dictCode 字典code
     * @constructor
     */
    public static GetEnum(dictCode: string, appCode?: any): Array<any> | undefined {
        // console.log("dictCode===", dictCode, appCode)
        if (appCode != null || appCode != undefined) {
            let appEnums = EnumUtil.GetEnums(appCode);
            if (appEnums != null && appEnums != undefined) {
                return appEnums.get(dictCode);
            }
        } else {
            //从全局里面去查询
            let appCodes = EnumUtil.GetAllAppCodes();
            for (let appCode of appCodes) {
                let appEnums = EnumUtil.GetEnums(appCode);
                if (appEnums != null && appEnums != undefined) {
                    let dictDetails = appEnums.get(dictCode);
                    if (dictDetails != undefined && dictDetails.length > 0) {
                        return dictDetails;
                    }
                }
            }
        }
        return new Array<any>();
    }


    /**
     * 用户所有应用编码
     * @constructor
     */
    public static GetAllAppCodes(): string[] {
        let keys = GLOBAL_APP_ENUMS.keys();
        let next = keys.next();
        let arys: string[] = []
        while (!next.done) {
            arys.push(next.value);
            next = keys.next();
        }
        return arys;
    }

    /**
     * 获取当前用户下所有 枚举
     * @param appCode 应用编码
     * @constructor
     */
    public static GetEnums(appCode: string) {
        let appEnums = GLOBAL_APP_ENUMS.get(appCode);
        if (appEnums == null && appEnums == undefined) {
            appEnums = new Map<string, Array<any>>();
        }
        return appEnums;
    }

    /**
     * 向全局enums中添加值
     * @param appCode  应用编码
     * @param dictCode 字典code
     * @param datas 数据字典
     * @constructor
     */
    public static PutEnum(appCode: string, dictCode: string, datas: Array<any>): Map<string, Array<any>> {
        let appEnums = EnumUtil.GetEnums(appCode);
        if (appEnums == null || appEnums == undefined || appEnums.size == 0) {
            appEnums = new Map<string, Array<any>>();
        }
        appEnums.set(dictCode, datas);
        // console.log(appCode, "===========", appEnums)
        GLOBAL_APP_ENUMS.set(appCode, appEnums);
        return appEnums;
    }
}

