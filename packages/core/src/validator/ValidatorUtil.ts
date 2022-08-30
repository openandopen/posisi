/**
 *@desc
 *@author liudejian
 *@date 2020-03-01 23:03
 **/
//import {validateOrReject, ValidationError} from "class-validator";


export default class ValidatorUtil {

    /**
     * 验证对象是否合法
     * @param data
     */
    /*public static validateAndRejct(data: any): Promise<string> {
        return ValidatorUtil.validateAndRejctByGroup(data, [])
    }*/

    /**
     * 验证对象是否合法
     * @param data
     * @param groups  example:["user"]
     */
   /* public static validateAndRejctByGroup(data: any, groups: any): Promise<string> {
        if (groups == null || groups == undefined) {
            groups = []
        }
        return new Promise((resolve, reject) => {
            validateOrReject(data, {groups: groups}).catch((errors => {
                let res = ValidatorUtil.parseErrorToStringAry(errors);
                reject(JSON.stringify(res))
            })).then(() => {
                //验证成功
                resolve("ok")
            })
        })
    }*/

    /**
     * 解析异常
     * @param errors
     */
    /*public static parseErrorToStringAry(errors: ValidationError[]): string[] {
        let errrosStringAry: string[] = [];
        if (errors && errors.length > 0) {
            errors.forEach(er => {
                let errorItem = er.constraints || {};
                let keys = Object.keys(errorItem);
                keys.forEach((val, i, ary) => {
                    //  console.log(val,errorItem[val])
                    errrosStringAry.push(er.property + " " + errorItem[val]);
                })
            })
        }
        return errrosStringAry;
    }*/
}
