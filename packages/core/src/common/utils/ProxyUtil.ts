/**
 *@desc 代理
 *@author liudejian
 *@date 2020-05-18 16:20
 **/
export default class ProxyUtil {

    /**
     * 创建代理
     * @param obj
     * @param handler
     */
    public static createProxy<T>(obj: any, handler: ProxyHandler<any>): T {
        return new Proxy(obj, handler);
    }

    /**
     * 创建默认代理,不做任何操作，可提供给vue使用
     * @param obj
     */
    public static createDefaultProxy<T>(obj: any): T {
        return new Proxy(obj, new class implements ProxyHandler<any> {
            get(target: any, p: string | symbol, receiver: any): any {
                return Reflect.get(target, p, receiver);
            }

            has(target: any, p: string | symbol): boolean {
                return true;
            }

            set(target: any, p: string | symbol, value: any, receiver: any): boolean {
                return Reflect.set(target, p, value, receiver);
            }
        })
    }

}
