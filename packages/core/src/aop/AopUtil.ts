/**
 *@desc aop代理工具类
 *@author liudejian
 *@date 2020-03-20 21:45
 **/
import {MethodHandler} from "./MethodHandler";

/**
 * AOP工具类
 */
export   class AopUtil {


    /**
     * 创建代理实例
     * @param classType 原始类
     * @param handler 方法拦截器
     * @return 返回原始代理类实例
     */
    public static createProxyInstance<T>(classType: new () => T, handler: MethodHandler): T {
        let ProxyClass = AopUtil.createProxy<T>(classType, handler);
        return new ProxyClass();
    }

    /**
     * 创建代理
     * @param classType 原始类
     * @param handler 方法拦截器
     * @return 返回代理类
     */
    public static createProxy<T>(classType: new () => T, handler: MethodHandler): new () => T {
        let className = classType.name;
        let proto = classType.prototype;
        let keys = Reflect.ownKeys(proto);
        keys.forEach((key) => {
            if ('constructor' == key) {
                return;
            }
            let descriptor = Reflect.getOwnPropertyDescriptor(proto, key);
            if (descriptor) {
                let method = descriptor.value;
                descriptor.value = function () {
                    let obj = null;
                    try {
                        handler.before(arguments);
                        obj = method.apply(this, arguments);
                        handler.after(obj, arguments);
                    } catch (e) {
                        handler.exception(e);
                    } finally {
                        handler.finally(obj, arguments)
                    }
                    handler.return(obj, arguments)
                    return obj;
                }
            }
            //重新定义
            if (descriptor) {
                Reflect.defineProperty(proto, key, descriptor);
            }
        })
        return classType;

    }

}
