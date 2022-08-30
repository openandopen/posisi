/**
 *@desc IOC工具
 *@author liudejian
 *@date 2020-03-05 16:11
 **/
import {CommonUtil} from "../../common";


export class IocUtil {
    public static INSTANCE_ID: string = "_instanceId_"

    /**
     * 为每个实例生成唯一ID
     * @param instance
     */
    public static genInstanceId<T>(instance: any): T {
        if (instance) {
            instance[IocUtil.INSTANCE_ID] = CommonUtil.genUid(16, 10);
        }
        return instance;
    }

    /**
     * 转为数组
     * @param values
     */
    public static convertToArray<T>(values: IterableIterator<T>): Array<T> {
        let arrAry = new Array<T>()
        if (values) {
            let result = values.next();
            while (!result.done) {
                arrAry.push(result.value);
                result = values.next();
            }
        }
        return arrAry;
    }

    /**
     * 获取类的构造函数
     * @param clsBiz
     */
    public static getConstructor(clsBiz: any): any {
        let prototype = null;
        if (typeof clsBiz === "function") {
            prototype = clsBiz.prototype;
        } else if (typeof clsBiz === "object") {
            prototype = Reflect.getPrototypeOf(clsBiz);
        } else {
            throw new Error("not suport type " + typeof clsBiz)
        }
        let keys = Reflect.ownKeys(prototype);
        for (let key of keys) {
            if (key === "constructor") {
                return prototype[key];
                break;
            }
        }
        return null;
    }

    /**
     * 包装beanName
     * @param classType class
     * @param qualifier 候选标识
     */
    public static wrapBeanName(classType: Function,qualifier?: string):string {
        let key = classType.name;
        if (qualifier) {
            key += qualifier;
        }
        return key;
    }

    /**
     * 包装beanName
     * @param beanName 原始名称
     * @param qualifier 候选标识
     */
    public static wrapBeanNameByStr(beanName:string,qualifier?: string):string {
        let key = beanName;
        if (qualifier) {
            key += qualifier;
        }
        return key;
    }
}


