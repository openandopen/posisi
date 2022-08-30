/**
 *@desc
 *@author liudejian
 *@date 2020-06-12 10:11
 **/
export default class AssertUtil {

    /**
     * 不能为空判断
     * @param obj
     */
    public static notNull(obj: any, message?: string): any {
        if (obj === null || obj === undefined || obj === "") {
            throw new Error(message ? message : "对象不能为空");
        }
        return obj;
    }

    /**
     * 包装空对象
     * @param obj
     */
    public static wrapNull(obj: any): any {
        if (obj === null || obj === undefined || obj === "") {
            return null;
        }
        return obj;
    }


}
