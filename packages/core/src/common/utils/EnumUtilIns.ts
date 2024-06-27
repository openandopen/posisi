import {DictDto} from "../../model/DictDto";
import {EnumUtil} from "../../common";

/**
 *@desc
 *@author liudejian
 *@date 2023-09-25 13:57
 **/
export   class EnumUtilIns {

    public cacheEnums(enums: Array<DictDto>): boolean {
        return EnumUtil.cacheEnums(enums);
    }

    public getCacheEnums(): Array<DictDto> {
        return EnumUtil.getCacheEnums();
    }

    /**
     * 清空枚举
     * @constructor
     */
    public ClearEnum(): boolean {
        return EnumUtil.ClearEnum();
    }

    /**
     * 返回枚举
     * @param appCode 应用编码
     * @param dictCode 字典code
     * @constructor
     */
    public GetEnum(dictCode: string, appCode?: any): Array<any>  {
        return EnumUtil.GetEnum(dictCode, appCode) || [];
    }


    /**
     * 用户所有应用编码
     * @constructor
     */
    public GetAllAppCodes(): Array<string> {
        return EnumUtil.GetAllAppCodes();
    }

    /**
     * 获取当前用户下所有 枚举
     * @param appCode 应用编码
     * @constructor
     */
    public GetEnums(appCode: string) {
        return EnumUtil.GetEnums(appCode);
    }

    /**
     * 向全局enums中添加值
     * @param appCode  应用编码
     * @param dictCode 字典code
     * @param datas 数据字典
     * @constructor
     */
    public PutEnum(appCode: string, dictCode: string, datas: Array<any>): Map<string, Array<any>> {
        return EnumUtil.PutEnum(appCode, dictCode, datas);
    }


    /**
     * 根据编码获取对应的标签值
     * @param appCode 应用编号
     * @param dictCode 枚举字典编码
     * @param code  对应的枚举值编码
     * @param codeName
     * @param codeCnName
     */
    public getEnumLabelByCode(appCode: string, dictCode: string, code: number, codeName ?: string, codeCnName ?: string): string {
        return EnumUtil.getEnumLabelByCode(appCode, dictCode, code, codeName, codeCnName);
    }

    /**
     * @param enumAlls 枚举集合[AppCode:[{codeCn: "用户系统", code: 1, ordianl: 0, codeEn: "UC"},{codeCn: "代理系统", code: 2, ordianl: 1, codeEn: "PROXY"}]]
     * @param enumName 枚举名称 AppCode
     * @param key 比如: code
     * @param keyValue 比如:1
     * @param keyCnName 比如:codeCn
     */
    public getEnumValue(enumAlls: Map<string, Array<any>>, enumName: string, key: string, keyValue: string | number, keyCnName: string): string | number {
        return EnumUtil.getEnumValue(enumAlls, enumName, key, keyValue, keyCnName);

    }


    /**
     *
     * @param enums
     * @param code
     * @param codeName
     * @param codeCnName
     */
    public getEnumLabel(enums: any[], code: number, codeName ?: string, codeCnName ?: string): string {
        return EnumUtil.getEnumLabel(enums, code, codeName, codeCnName);
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
    public enumFormat(enums: Map<string, Array<any>>, row: any, column: any, cellVal?: any, manulEnumName?: string): string | number {
        return EnumUtil.enumFormat(enums, row, column, cellVal, manulEnumName);
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
    public enumDefaultFormat(row: any, column: any, cellVal?: any, manulEnumName?: any, appCode?: any): string | number {
        return EnumUtil.enumDefaultFormat(row, column, cellVal, manulEnumName, appCode);
    }

    /**
     * 单词首字母大写
     * @param str
     * @returns {string}
     */
    public firstWordUpperCase(str: string): string {
        return EnumUtil.firstWordUpperCase(str);
    }
}