/**
 *@desc 通用工具类
 *@author liudejian
 *@date 2020-03-20 21:45
 **/
import {DateUtil} from "./DateUtil";
import {EnumUtil} from "./EnumUtil";
import {SnowflakeIdv1} from 'simple-flakeid'

const snowflake = new SnowflakeIdv1({workerId: 1, seqBitLength: 16})

export class CommonUtil {

    /**
     * 雪花算法ID (18位)
     */
    public static genSnowflake(): number | bigint {
        return snowflake.NextId()
    }

    /**
     * 随机数生成
     * @param min 最小值
     * @param max 最大值
     */
    public static genRandom(min: number, max: number): number {
        let range = max - min;
        let rand = Math.random();
        let res = (min + Math.round(rand * range));
        return res;
    }

    /**
     * 产生UID
     * @param len 长度
     * @param radix 因子长度
     * @returns {string}
     */
    public static genUid(len: number, radix?: number): string {
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
        let uuid = [];
        let i: number;
        radix = radix || chars.length

        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
        } else {
            let r
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
            uuid[14] = '4'
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
                }
            }
        }
        return uuid.join('')
    }

    /**
     * 左右对其
     * @param str
     */
    public static trim(str: string): string {
        if (str == null || str == undefined) {
            return "";
        }
        return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '');
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
    public static isEmptyObject(obj: any): boolean {
        if (obj == null || obj == undefined) return true
        if (this.isArray(obj) || this.isString(obj)) {
            return obj.length === 0
        }
        if (this.isNumber(obj)) {
            return false
        }
        for (let key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) return false
        return true
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


    /**
     * 获取模板值
     * @param template 模板 {username}/{age}
     * @param data {username:'good',age:100}
     * @return good/100
     * @example  templateEngine(template,data);
     */
    public static templateEngine(template: string, json: any): string {
        let pattern = /\{(\w*[:]*[=]*\w+)\}(?!})/g;
        return template.replace(pattern, function (match, key, value) {
            return json[key]
        })
    }


    public static isArray(object: any): boolean {
        return Array.isArray(object);
    }

    public static isNumber(object: any): boolean {
        return Object.prototype.toString.apply(object) == '[object Number]';
    }

    public static isString(object: any): boolean {
        return Object.prototype.toString.apply(object) == '[object String]';
    }

    public static isFunction(object: any): boolean {
        return Object.prototype.toString.apply(object) == '[object Function]';
    }

    public static isObject(object: any): boolean {
        return Object.prototype.toString.apply(object) == '[object Object]';
    }

    public static isDate(object: any): boolean {
        return Object.prototype.toString.apply(object) == '[object Date]';
    }

    public static isRegExp(object: any): boolean {
        return Object.prototype.toString.apply(object) == '[object RegExp]';
    }

    public static isMap(object: any): boolean {
        return Object.prototype.toString.apply(object) == '[object Map]';
    }

    public static isSet(object: any): boolean {
        return Object.prototype.toString.apply(object) == '[object Set]';
    }

    /**
     * 对象copy
     * @param target 目标对象
     * @param source 原始对象
     * @param deep 是否深度copy
     */
    public static copy(target: any, source: any, deep: boolean) {
        if (deep) {
            let proto = Object.getPrototypeOf(source)
            return Object.assign(target, Object.create(proto), source)
        } else {
            return Object.assign(target, source)
        }
    }

    /**
     * 空判断
     * @param str
     * @returns {boolean}
     */
    public static isBlank(str: string): boolean {
        return CommonUtil.isEmptyObject(str)
    }

    /**
     *
     * @param str
     * @returns {boolean}
     */
    public static isNotBlank(str: string) {
        return !CommonUtil.isBlank(str)
    }

    /**
     * 开始
     * @param str
     * @param prefix 前缀
     */
    public static startWith(str: string, prefix: string): boolean {
        let reg = new RegExp("^" + prefix + ".*", 'i');
        return reg.test(str);
        /*if (str != null && str.startWith(prefix)) {
            return true;
        }
        return false;*/
    }

    /**
     * 以 stuff结尾
     * @param str
     * @param stuff
     * @returns {boolean}
     */
    public static endWith(str: string, stuff: string): boolean {
        let reg: RegExp = new RegExp('.*" + stuff + "$', 'i');
        return reg.test(str);
        /*  if (str != null && str.endsWith(stuff)) {
              return true;
          }
          return false;*/
    }

    /**
     * 时间格式化
     * @param time 后台时间长整型/date
     * @param fmt 时间格式 yyyy-MM-dd hh:mm:ss
     */
    public static dateFormat(time: Date | number | string, fmt ?: string) {
        if (time == '' || time == undefined || time == null || time == 'null' || time == 'NULL') {
            return "";
        }
        if (typeof time == 'string') {
            time = parseInt(time);
        }
        return DateUtil.dateFormat(time, fmt);
    }

    /**
     * 数据格式化(针对el-table-column的)
     * @param datas 数据集
     * @param keyName 指定对比KEY名称
     * @param returnValueName 返回值 KEY名称
     * @returns {{}|*}
     */
    public static dataFormat(datas: Array<any>, returnValueName: string, keyName: string, value: string | number): string {
        if (datas == undefined || returnValueName == undefined || keyName == undefined || value == undefined) {
            return "";
        }
        if (datas) {
            let data = datas.find(item => item[keyName] == value);
            if (data) {
                return data[returnValueName];
            }
        }
        return value as string;
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
        let enumName = CommonUtil.firstWordUpperCase(column.property)
        if (manulEnumName != undefined && manulEnumName != null) {
            enumName = manulEnumName;
        }
        if (cellVal == null) {
            cellVal = cellValue;
        }
        return CommonUtil.getEnumValue(enums, enumName, 'code', cellVal, 'codeCn');
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
        let enumName = CommonUtil.firstWordUpperCase(column.property)
        if (manulEnumName != undefined && manulEnumName != null) {
            enumName = manulEnumName;
        }
        let cellFinalValue = cellVal ? cellVal : cellValue;
        if (cellFinalValue == null || cellFinalValue == undefined) {
            return "";
        }
        if (appCode != null && appCode != undefined) {
            return CommonUtil.getEnumValue(EnumUtil.GetEnums(appCode), enumName, 'code', cellFinalValue, 'codeCn');
        }
        let appCodes = EnumUtil.GetAllAppCodes();
        for (let appCodeKey of appCodes) {
            let appEnums = EnumUtil.GetEnums(appCodeKey);
            let resultValue = CommonUtil.getEnumValue(appEnums, enumName, 'code', cellFinalValue, 'codeCn');
            if (resultValue != null && resultValue != undefined && resultValue != cellFinalValue) {
                return resultValue;
            }
        }
        return "";
    }


    /**
     * 添加前缀
     * @param value
     * @param prefix
     */
    public static addPrefix(value: any, prefix: any): any {
        return prefix + value;
    }

    /**
     * 添加后缀
     * @param value
     * @param suffix
     */
    public static addSuffix(value: any, suffix: any): any {
        return value + suffix;
    }


    /**
     * 清空一个数组
     * @param ary
     */
    public static clearArray(ary: Array<any>): Array<any> {
        if (ary != null && ary != undefined) {
            return ary.splice(0, ary.length)
        }
        return ary
    }

    /**
     * 将时间秒转为HH:MM:SS
     * @param second 时间秒
     */
    public static formatSecondToHms(seconds: number): string {
        return DateUtil.formatSecondToHms(seconds);
    }
}
 