
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
    public static GetAllAppCodes(): Array<string>  {
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


    /**
     * 根据编码获取对应的标签值
     * @param appCode 应用编号
     * @param dictCode 枚举字典编码
     * @param code  对应的枚举值编码
     * @param codeName
     * @param codeCnName
     */
    public static getEnumLabelByCode(appCode: string, dictCode: string, code: number, codeName ?: string, codeCnName ?: string): string {
        let appEnums = EnumUtil.GetEnums(appCode);
        let enums = appEnums.get(dictCode) || [];
        return this.getEnumLabel(enums, code, codeName, codeCnName);
    }

    /**
     * @param enumAlls 枚举集合[AppCode:[{codeCn: "用户系统", code: 1, ordianl: 0, codeEn: "UC"},{codeCn: "代理系统", code: 2, ordianl: 1, codeEn: "PROXY"}]]
     * @param enumName 枚举名称 AppCode
     * @param key 比如: code
     * @param keyValue 比如:1
     * @param keyCnName 比如:codeCn
     */
    public static getEnumValue(enumAlls: Map<string, Array<any>>, enumName: string, key: string, keyValue: string | number, keyCnName: string): string | number {
        if (enumAlls != null) {
            let singleEnums = enumAlls.get(enumName);
            if (singleEnums != null && singleEnums != undefined) {
                for (let item of singleEnums) {
                    if (item[key] == keyValue) {
                        return item[keyCnName]
                    }
                }
            }
        }
        return keyValue
    }


    /**
     *
     * @param enums
     * @param code
     * @param codeName
     * @param codeCnName
     */
    public static getEnumLabel(enums: any[], code: number, codeName ?: string, codeCnName ?: string): string {
        if (enums == null) {
            return ""
        }
        let codeDesc = codeName;
        let codeCnDesc = codeCnName;
        if (codeDesc == undefined || codeDesc == "") {
            codeDesc = "code"
        }
        if (codeCnDesc == undefined || codeCnDesc == "") {
            codeCnDesc = "codeCn"
        }

        let result = "";
        enums.forEach((v, i, ary) => {
            if (codeDesc != undefined) {
                if (v[codeDesc] == code && codeCnDesc != undefined) {
                    result = v[codeCnDesc];
                    return
                }
            }

        })
        return result;
    }

    /**
     * 枚举格式化(针对el-table-column的)
     * @param enums 枚举集合
     * @param row  行
     * @param column 列
     * @param cellVal 当前值
     * @param  index  当前值的行索引
     * @param manulEnumName 手动传入枚举名称
     * @param appCode 应用编码
     * @returns {*}
     */
    public static enumFormat(enums: Map<string, Array<any>>, row: any, column: any, cellVal?: any, manulEnumName?: string): string | number {
        let cellValue = row[column.property]
        let enumName = EnumUtil.firstWordUpperCase(column.property)
        if (manulEnumName != undefined && manulEnumName != null) {
            enumName = manulEnumName;
        }
        if (cellVal == null) {
            cellVal = cellValue;
        }
        return EnumUtil.getEnumValue(enums, enumName, 'code', cellVal, 'codeCn');
    }

    /**
     * 枚举格式化(针对el-table-column的)
     * @param enums 枚举集合
     * @param row  行
     * @param column 列
     * @param cellVal 当前值
     * @param  index  当前值的行索引
     * @param manulEnumName 手动传入枚举名称
     * @param appCode 应用编码
     * @returns {*}
     */
    public static enumDefaultFormat(row: any, column: any, cellVal?: any, manulEnumName?: any, appCode?: any): string | number {
        let cellValue = row[column.property]
        let enumName = EnumUtil.firstWordUpperCase(column.property)
        if (manulEnumName != undefined && manulEnumName != null) {
            enumName = manulEnumName;
        }
        let cellFinalValue = cellVal ? cellVal : cellValue;
        if (cellFinalValue == null || cellFinalValue == undefined) {
            return "";
        }
        if (appCode != null && appCode != undefined) {
            return EnumUtil.getEnumValue(EnumUtil.GetEnums(appCode), enumName, 'code', cellFinalValue, 'codeCn');
        }
        let appCodes = EnumUtil.GetAllAppCodes();
        for (let appCodeKey of appCodes) {
            let appEnums = EnumUtil.GetEnums(appCodeKey);
            let resultValue = EnumUtil.getEnumValue(appEnums, enumName, 'code', cellFinalValue, 'codeCn');
            if (resultValue != null && resultValue != undefined && resultValue != cellFinalValue) {
                return resultValue;
            }
        }
        return "";
    }
    /**
     * 单词首字母大写
     * @param str
     * @returns {string}
     */
    public static firstWordUpperCase(str: string): string {
        if (str != null && str != undefined) {
            return str.slice(0, 1).toUpperCase() + str.slice(1)
        }
        return "";
    }
}

