import 'reflect-metadata';

/**
 *@desc
 *@author liudejian
 *@date 2023-12-24 11:00
 **/
export class ClassUtil {

    /**
     * 创建对象实例
     * @param cls  类
     * @param params 构造参数
     */
    public static newInstance(cls: any, params: any): any {
        return new cls(params);
    }

    /**
     * 获取对象声明字段
     * @param cls
     */
    public static getFields(cls: any): Array<string> {
        let cs = new cls();
        /*  let fields = new Array<string>()
          for (const c of Object.keys(cs)) {
              fields.push(c);
          }
          return fields;*/
        return Object.getOwnPropertyNames(cs);
    }

    /**
     * 获取所有 声明方法
     * @param cls
     */
    public static getMethodNames(cls: any): Array<string> {
        let ins = new cls();
        const prototype = Object.getPrototypeOf(ins);
        let methodNames = new Array<string>()
        let methods = Reflect.ownKeys(prototype);
        for (let i = 0; i < methods.length; i++) {
            let methodName = methods[i];
            if (methodName != 'constructor') {
                methodNames.push(methodName.toString());
            }
        }
        return methodNames;
    }

    /**
     * 获取所有声明的方法
     * @param cls
     */
    public static getMethods(cls: any): Array<Function> {
        let ins = new cls();
        let results = new Array<Function>()
        const prototype = Object.getPrototypeOf(ins);
        let methods = Object.getOwnPropertyDescriptors(prototype);
        let keys = Object.keys(methods);
        for (let key of keys) {
            if (key == 'constructor') {
                continue;
            }
            results.push(methods[key] as Function)
        }
        return results;
    }
}