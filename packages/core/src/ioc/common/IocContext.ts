/**
 *@desc 应用上下文
 *@author liudejian
 *@date 2020-03-05 21:40
 **/
import {Container} from "./Container";
import {IocUtil} from "../util/IocUtil";

/**
 * 存放容器
 */
const IOC_CONTAINER_MAP = new Map<string, Container>();

/**
 * 应用上下文
 */
export class IocContext {

    private static DEFAULT_KEY: string = "default";

    /**
     * 获取默认容器
     */
    public static get(): Container {
        let container = IOC_CONTAINER_MAP.get(this.DEFAULT_KEY)
        if (!container) {
            container = IocUtil.genInstanceId<Container>(new Container());
            IOC_CONTAINER_MAP.set(this.DEFAULT_KEY, container);
        }
        return container;
    }

    /**
     * 根据名称获取容器
     * @param name
     */
    public static getContainer(name: string): Container | undefined {
        return IOC_CONTAINER_MAP.get(name)
    }

    /**
     * 创建一个容器
     * @param name
     */
    public static createContainer(name: string): void {
        let container = IocUtil.genInstanceId<Container>(new Container());
        IOC_CONTAINER_MAP.set(name, container)
    }

    /**
     * 获取bean实例
     * @param classType bean类型
     * @param qualifier 候选标识
     */
    public static getBean<T>(classType: any, qualifier?: string): T {
        return this.get().getBean<T>(classType, qualifier);
    }

    /**
     * 根据bean名称获取bean 实例
     * @param className bean名称
     * @param qualifier  候选标识
     */
    public static getBeanByName<T>(className: string, qualifier?: string): T {
        return this.get().getBeanByName<T>(className, qualifier);
    }

    /**
     * 根据类型获取所有 bean
     * @param classType
     */
    public static getBeansByType<T>(classType: any): Array<T> {
        return this.get().getBeansByType<T>(classType);
    }

    /**
     * 根据名称获取所有bean
     * @param className
     */
    public static getBeansByName<T>(className: string):  Array<T>{
        return this.get().getBeansByName<T>(className);
    }

}
