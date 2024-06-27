/**
 *@desc
 *@author liudejian
 *@date 2020-03-12 21:17
 **/
import 'reflect-metadata';
import {AutowireMeta, BeanDefinition, PropertyInfo, Scope, ServiceMeta} from "../model/Meta";
import {IocUtil} from "../util/IocUtil";
import {IocContext} from '../common/IocContext';

export const CLASS_META_KEY = Symbol("class_meta_key");
export const CLASS_PROP_KEY = Symbol("class_prop_key");


/**
 * 服务
 * @param sm
 * @constructor
 */
export function Service(sm: ServiceMeta): ClassDecorator {
    return (constructor: any) => {
        let name = constructor.name;
        let meta = new BeanDefinition()
        meta.name = name;
        meta.scope = sm.scope ? sm.scope : Scope.SINGLE;
        meta.type = constructor;
        meta.qualifier = sm.qualifier;
        //【1】将类元信息，定义为当前类原型链-全局属性
        Reflect.defineMetadata(CLASS_META_KEY, meta, constructor.prototype, CLASS_PROP_KEY);
        //【1.1】获取默认容器
        let defaultContainer = IocContext.get();
        //【2】 将meta信息中的scope 重新覆盖为类定义的范围
        if (defaultContainer.hasBeanDefinition(meta.type,meta.qualifier)) {
            let existMeta = defaultContainer.getBeanDefinition(meta.type,meta.qualifier);
            //覆盖范围,以注注释的范围为准
            existMeta.scope = meta.scope;
        } else {
            defaultContainer.registerBeanDefinition(meta);
        }
        //【3】如果容器中没有当前类实例，则自动注册
        if (!defaultContainer.hasBean(meta.type,meta.qualifier)) {
            let instance = IocUtil.genInstanceId(new constructor());
            defaultContainer.registerSingleBean(meta.type, instance,meta.qualifier)
        }

    }
}

/**
 * 自动注入
 * @param am
 * @constructor
 */
export function Autowired(meta?: AutowireMeta): PropertyDecorator {
    // @ts-ignore
    return (targetClas: any, fieldName: string) => {
        let descClassConstructor = targetClas.constructor;
        //【1】获取该类中，声明的属性类型
        let autowiredServiceCls = Reflect.getMetadata('design:type', targetClas, fieldName);
        if (autowiredServiceCls == undefined && meta?.classType) {
            autowiredServiceCls = meta.classType;
        }
        if (autowiredServiceCls == undefined) {
            //throw new Error(fieldName+" does't exist!")
            console.error(fieldName + " does't exist property!")
            console.log(Object.keys(targetClas))
            console.log(Object.keys(descClassConstructor))
            return;
        }
        //获取默认容器
        let defaultContainer = IocContext.get();
        //【1.1】  构建注入类【定义】
        let autowiredCm = BeanDefinition.build(autowiredServiceCls.name, autowiredServiceCls)
         autowiredCm.qualifier = meta ? (meta.qualifier ? meta.qualifier : "") : ""
        //【1.2】检查容器中是否存在该类元信息,不存在就注册
        if (!defaultContainer.hasBeanDefinition(autowiredServiceCls,autowiredCm.qualifier)) {
            autowiredCm.qualifier = autowiredCm.qualifier;
            defaultContainer.registerBeanDefinition(autowiredCm);
        }
        //【2】检查容器中是否存在autowired的【实例】
        let autoInstance = null;
        //bean 名称
        let beanName = autowiredServiceCls.name;
        //【2.1】 检查容器中是否存在自动注入的实例
        if (!defaultContainer.hasBean(beanName,autowiredCm.qualifier)) {
            autoInstance = IocUtil.genInstanceId(new autowiredServiceCls())
            defaultContainer.registerSingleBean(autowiredServiceCls, autoInstance,autowiredCm.qualifier);
        } else {
            autoInstance = defaultContainer.getSingleBean(autowiredServiceCls,autowiredCm.qualifier);
        }
        //【3】获取当前声明类实例（如果不存在将自动创建声明类实例）
        let parentService = defaultContainer.getBean(descClassConstructor,autowiredCm.qualifier) as any;
        //【4】将自动注入实例赋值给声明类的对应属性
        parentService[fieldName] = autoInstance;
        //【4.1】重新覆盖类实例
        defaultContainer.registerSingleBean(descClassConstructor.name, parentService,autowiredCm.qualifier);
        //【5】 获取声明类 BeanDefinitaion信息
        let beanDefinition = defaultContainer.getBeanDefinition(descClassConstructor,autowiredCm.qualifier);
        if (beanDefinition) {
            beanDefinition.addProperty(PropertyInfo.build(fieldName, autowiredServiceCls, autoInstance))
            beanDefinition.qualifier = autowiredCm.qualifier;
            //【5.1】 重新覆盖bean定义信息
            defaultContainer.registerBeanDefinition(beanDefinition);
        }
    }
}


