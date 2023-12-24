/**
 *@desc 通用工具类
 *@author liudejian
 *@date 2020-03-20 21:45
 **/
import {DateUtil} from "./DateUtil";
import {CommonUtil} from "./CommonUtil";


export class CommonUtilIns {
    /**
     * 产生UID
     * @param len 长度
     * @param radix 因子长度
     * @returns {string}
     */
    public  genUid(len: number, radix?: number): string {
         return CommonUtil.genUid(len,radix);
    }

    /**
     * 左右对其
     * @param str
     */
    public  trim(str: string): string {
       return  CommonUtil.trim(str);
    }

    /**
     * 判断obj对象是否为空
     * @method isEmptyObject
     * @param { * } obj 需要判断的对象
     * @remind 如果判断的对象是NULL， 将直接返回true， 如果是数组且为空， 返回true， 如果是字符串， 且字符串为空，
     *          返回true， 如果是普通对象， 且该对象没有任何实例属性， 返回true
     * @return { Boolean } 对象是否为空
     * @example
     * ```javascript
     *
     * //output: true
     * console.log( utils.isEmptyObject( {} ) );
     *
     * //output: true
     * console.log( utils.isEmptyObject( [] ) );
     *
     * //output: true
     * console.log( utils.isEmptyObject( "" ) );
     *
     * //output: false
     * console.log( utils.isEmptyObject( { key: 1 } ) );
     *
     * //output: false
     * console.log( utils.isEmptyObject( [1] ) );
     *
     * //output: false
     * console.log( utils.isEmptyObject( "1" ) );
     *
     * ```
     */
    public  isEmptyObject(obj: any): boolean {
       return  CommonUtil.isEmptyObject(obj);
    }

    /**
     * 单词首字母大写
     * @param str
     * @returns {string}
     */
    public  firstWordUpperCase(str: string): string {
        return CommonUtil.firstWordUpperCase(str);
    }


    /**
     * 获取模板值
     * @param template 模板 {username}/{age}
     * @param data {username:'good',age:100}
     * @return good/100
     * @example  templateEngine(template,data);
     */
    public  templateEngine(template: string, json: any): string {
        return CommonUtil.templateEngine(template,json);
    }


    public  isArray(object: any): boolean {
       return  CommonUtil.isArray(object);
    }

    public  isNumber(object: any): boolean {
        return CommonUtil.isNumber(object);
    }

    public  isString(object: any): boolean {
        return CommonUtil.isString(object);
    }

    public  isFunction(object: any): boolean {
        return CommonUtil.isFunction(object);
    }

    public  isObject(object: any): boolean {
        return CommonUtil.isObject(object);
    }

    public  isDate(object: any): boolean {
        return CommonUtil.isDate(object);
    }

    public  isRegExp(object: any): boolean {
        return CommonUtil.isRegExp(object);
    }
    public  isMap(object: any): boolean {
        return CommonUtil.isMap(object);
    }

    public  isSet(object: any): boolean {
        return CommonUtil.isSet(object);
    }
    /**
     * 对象copy
     * @param target 目标对象
     * @param source 原始对象
     * @param deep 是否深度copy
     */
    public  copy(target: any, source: any, deep: boolean) {
       return CommonUtil.copy(target,source,deep);
    }

    /**
     * 空判断
     * @param str
     * @returns {boolean}
     */
    public  isBlank(str: string): boolean {
        return CommonUtil.isEmptyObject(str)
    }

    /**
     *
     * @param str
     * @returns {boolean}
     */
    public  isNotBlank(str: string) {
        return !CommonUtil.isBlank(str)
    }

    /**
     * 开始
     * @param str
     * @param prefix 前缀
     */
    public  startWith(str: string, prefix: string): boolean {
       return  CommonUtil.startWith(str,prefix);
    }

    /**
     * 以 stuff结尾
     * @param str
     * @param stuff
     * @returns {boolean}
     */
    public  endWith(str: string, stuff: string): boolean {
         return CommonUtil.endWith(str,stuff);
    }

    /**
     * 时间格式化
     * @param time 后台时间长整型/date
     * @param fmt 时间格式 yyyy-MM-dd hh:mm:ss
     */
    public  dateFormat(time: Date | number | string, fmt ?: string) {
         return CommonUtil.dateFormat(time,fmt);
    }

    /**
     * 数据格式化(针对el-table-column的)
     * @param datas 数据集
     * @param keyName 指定对比KEY名称
     * @param returnValueName 返回值 KEY名称
     * @returns {{}|*}
     */
    public  dataFormat(datas: Array<any>, returnValueName: string, keyName: string, value: string | number): string {
        return CommonUtil.dataFormat(datas,returnValueName,keyName,value);
    }

    /**
     * 根据编码获取对应的标签值
     * @param appCode 应用编号
     * @param dictCode 枚举字典编码
     * @param code  对应的枚举值编码
     * @param codeName
     * @param codeCnName
     */
    public  getEnumLabelByCode(appCode: string, dictCode: string, code: number, codeName ?: string, codeCnName ?: string): string {
       return  CommonUtil.getEnumLabelByCode(appCode,dictCode,code,codeName,codeCnName);
    }

    /**
     * @param enumAlls 枚举集合[AppCode:[{codeCn: "用户系统", code: 1, ordianl: 0, codeEn: "UC"},{codeCn: "代理系统", code: 2, ordianl: 1, codeEn: "PROXY"}]]
     * @param enumName 枚举名称 AppCode
     * @param key 比如: code
     * @param keyValue 比如:1
     * @param keyCnName 比如:codeCn
     */
    public  getEnumValue(enumAlls: Map<string, Array<any>>, enumName: string, key: string, keyValue: string | number, keyCnName: string): string | number {
         return CommonUtil.getEnumValue(enumAlls,enumName,key,keyValue,keyCnName);
    }


    /**
     *
     * @param enums
     * @param code
     * @param codeName
     * @param codeCnName
     */
    public  getEnumLabel(enums: any[], code: number, codeName ?: string, codeCnName ?: string): string {
         return CommonUtil.getEnumLabel(enums,code,codeName,codeCnName);
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
    public  enumFormat(enums: Map<string, Array<any>>, row: any, column: any, cellVal?: any, manulEnumName?: string): string | number {
        return CommonUtil.enumFormat(enums,row,column,cellVal,manulEnumName);
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
    public  enumDefaultFormat(row: any, column: any, cellVal?: any, manulEnumName?: any, appCode?: any): string | number {
       return CommonUtil.enumDefaultFormat(row,column,cellVal,manulEnumName,appCode);
    }


    /**
     * 添加前缀
     * @param value
     * @param prefix
     */
    public  addPrefix(value: any, prefix: any): any {
        return prefix + value;
    }

    /**
     * 添加后缀
     * @param value
     * @param suffix
     */
    public  addSuffix(value: any, suffix: any): any {
        return value + suffix;
    }


    /**
     * 清空一个数组
     * @param ary
     */
    public  clearArray(ary: Array<any>): Array<any> {
        if (ary != null && ary != undefined) {
            return ary.splice(0, ary.length)
        }
        return ary
    }
    /**
     * 将时间秒转为HH:MM:SS
     * @param second 时间秒
     */
    public  formatSecondToHms(seconds:number):string {
        return DateUtil.formatSecondToHms(seconds);
    }
}
 