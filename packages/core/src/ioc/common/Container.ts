/**
 *@desc bean定义与实例容器
 *@author <a href="mailto:zuiwoxing@qq.com">liudejian</a>
 *@date 2020-03-05 21:47
 **/
import {BeanDefinition, Scope} from "../model/Meta";
import {IocUtil} from "../util/IocUtil";
import AssertUtil from "../../common/utils/AssertUtil";


export class Container {
    /**
     * 存放实例
     * @param key  beanNameKey=Object.name+qualifier
     * @param value bean实例
     */
    private BEAN_INSTANCE_MAP = new Map<string, any>();
    /**
     * 存放bean定义
     * @param key  beanNameKey=Object.name+qualifier
     * @param value ClassMeta
     */
    private BEAN_DEFINITION_MAP = new Map<string, BeanDefinition>();


    /**
     * 获取所有 bean名称
     */
    public getBeanNames(): Array<string> {
        let aryList = new Array<string>();
        for (let [key, beanDef] of this.BEAN_DEFINITION_MAP) {
            aryList.push(beanDef.name);
        }
        return aryList;
    }

    /**
     * 获取所有bean定义
     */
    public getBeanDefinitions(): Array<BeanDefinition> {
        return IocUtil.convertToArray(this.BEAN_DEFINITION_MAP.values());
    }

    /**
     * 注册bean定义
     * @param beanDefinition
     */
    public registerBeanDefinition(beanDefinition: BeanDefinition): this {
         let key = IocUtil.wrapBeanNameByStr(beanDefinition.name, beanDefinition.qualifier);
         this.BEAN_DEFINITION_MAP.set(key, beanDefinition);
        return this;
    }

    /**
     * 获取bean定义
     * @param classType class
     * @param qualifier 候选标识
     */
    public getBeanDefinition(classType: Function, qualifier?: string): BeanDefinition {
        let key = IocUtil.wrapBeanName(classType, qualifier);
         return AssertUtil.wrapNull(this.BEAN_DEFINITION_MAP.get(key));
    }

    /**
     * 获取bean定义
     * @param classType class
     * @param qualifier 候选标识
     */
    public getBeanDefinitionByName(className: string, qualifier?: string): BeanDefinition {
        let key = IocUtil.wrapBeanNameByStr(className, qualifier);
        return AssertUtil.wrapNull(this.BEAN_DEFINITION_MAP.get(key));
    }

    /**
     * 是否存在bean定义
     * @param classType class
     * @param qualifier 候选标识
     */
    public hasBeanDefinition(classType: Function, qualifier?: string): boolean {
        let key = IocUtil.wrapBeanName(classType, qualifier);
        return this.BEAN_DEFINITION_MAP.has(key)
    }


    /**
     * 注册单例bean
     * @param classType class
     * @param instance 实例
     * @param qualifier 候选标识
     */
    public registerSingleBean<T>(classType: Function, instance: T, qualifier?: string): this {
        let key = IocUtil.wrapBeanName(classType, qualifier);
        this.BEAN_INSTANCE_MAP.set(key, instance);
        //注册单例bean定义
        this.registerBeanDefinition(BeanDefinition.build(classType.name, IocUtil.getConstructor(instance), qualifier))
        return this;
    }

    /**
     * 是否存在 bean
     * @param classType  class
     */
    public hasBean<T>(classType: Function, qualifier?: string): boolean {
        let key = IocUtil.wrapBeanName(classType, qualifier);
        return this.BEAN_INSTANCE_MAP.has(key);
    }

    /**
     * 获取单例bean
     * @param classType class
     */
    public getSingleBean<T>(classType: Function, qualifier?: string): T {
        let key = IocUtil.wrapBeanName(classType, qualifier);
        //console.log("key==",key,this.BEAN_INSTANCE_MAP)
        return this.BEAN_INSTANCE_MAP.get(key);
    }

    /**
     * 获取单例bean
     * @param classType class
     */
    public getSingleBeanByName<T>(className: string, qualifier?: string): T {
        let key = IocUtil.wrapBeanNameByStr(className, qualifier);
        return this.BEAN_INSTANCE_MAP.get(key);
    }


    /**
     * 根据bean类型获取所有bean信息，不能自动创建bean
     * @param classType
     */
    public getBeansByType<T>(classType: new () => T): Array<any> {
        let beans = new Array<any>()
        for (let [key, beanDef] of this.BEAN_DEFINITION_MAP) {
            if (beanDef.type instanceof classType) {
                let bean = this.BEAN_INSTANCE_MAP.get(key);
                if (bean) {
                    beans.push(bean);
                }
            }
        }
        return beans;
    }

    /**
     * 根据bean的名称获取其下所有bean
     * @param beanName
     */
    public getBeansByName<T>(beanName:string): Array<any> {
        let beans = new Array<any>()
        for (let [key, beanDef] of this.BEAN_DEFINITION_MAP) {
            if (beanDef.name === beanName) {
                let bean = this.BEAN_INSTANCE_MAP.get(key);
                if (bean) {
                    beans.push(bean);
                }
            }
        }
        return beans;
    }

    /**
     * 根据bean名称获取[如果不存在则自动创建]
     * @param className
     * @param qualifier
     */
    public getBeanByName<T>(className: string, qualifier?: string): any {
        //获取当前类全局meta信息
        let res = this.getSingleBeanByName(className, qualifier)
        //bean定义
        let beanDefinition = this.getBeanDefinitionByName(className, qualifier);
        //[1]如果存在就直接返回
        if (res) {
            if (Scope.SINGLE == beanDefinition.scope) {
                this.recursionSetProperty(res, beanDefinition)
                return res;
            } else if (Scope.PROTOTYPE == beanDefinition.scope) {
                let serviceType = beanDefinition.type;
                let instance = IocUtil.genInstanceId(new serviceType());
                this.recursionSetProperty(instance, beanDefinition)
                return instance;
            }
            return res;
        }
        if (beanDefinition === null || beanDefinition === undefined) {
             return null;
        }
        //验证bean定义不能为空
        let classType = beanDefinition.type;
        //[2]如果不存在就直接创建
        let beanInstance = IocUtil.genInstanceId(new classType());
        //初始化时，默认单例
        beanDefinition = BeanDefinition.build(classType.name, classType, qualifier);
        this.registerBeanDefinition(beanDefinition);
        this.registerSingleBean(classType, beanInstance, qualifier);
        return beanInstance;
    }

    /**
     * 获取bean实例(单例|多例)[如果不存在则自动创建]
     * @param classType   class
     */
    public getBean<T>(classType: new () => T, qualifier?: string): any {
        //获取当前类全局meta信息
        // console.log("classType======", classType.name, qualifier)
        let res = this.getSingleBean(classType, qualifier)
        //bean定义
        let beanDefinition = this.getBeanDefinition(classType, qualifier);
        // console.log("res======", beanDefinition, res)
        //[1]如果存在就直接返回
        if (res) {
            if (Scope.SINGLE == beanDefinition.scope) {
                this.recursionSetProperty(res, beanDefinition)
                return res;
            } else if (Scope.PROTOTYPE == beanDefinition.scope) {
                let serviceType = beanDefinition.type;
                let instance = IocUtil.genInstanceId(new serviceType());
                this.recursionSetProperty(instance, beanDefinition)
                return instance;
            }
            return res;
        }
        //  let cm: ClassMeta = Reflect.getOwnMetadata(CLASS_META_KEY, clsConstructor, CLASS_PROP_KEY);
        // console.log("cm==========",cm)
        //[2]如果不存在就直接创建
        let beanInstance = IocUtil.genInstanceId(new classType());
        //初始化时，默认单例
        beanDefinition = BeanDefinition.build(classType.name, classType, qualifier);
        this.registerBeanDefinition(beanDefinition);
        this.registerSingleBean(classType, beanInstance, qualifier);
        return beanInstance;
    }


    /**
     * 递归设置属性
     * @param parentInstance
     * @param parentClassMeta
     */
    private recursionSetProperty(parentInstance: any, parentBeanDefinition: BeanDefinition) {
        let fields = parentBeanDefinition.getPropertySet();
        let values = fields.values();
        let result = values.next();
        while (!result.done) {
            let fieldInfo = result.value;
            let fieldType = fieldInfo.type;
            let fieldName = fieldInfo.name || "";
            //  console.log("fieldType======", fieldType)
            let fieldCm = this.getBeanDefinition(fieldType);
            //  console.log("fieldCm======", fieldCm)
            if (Scope.SINGLE === fieldCm.scope) {
                parentInstance[fieldName] = fieldInfo.value;
            } else if (Scope.PROTOTYPE === fieldCm.scope) {
                let currentInstance = IocUtil.genInstanceId(new fieldType());
                parentInstance[fieldName] = currentInstance;
                this.recursionSetProperty(currentInstance, fieldCm);
            }
            result = values.next();
        }
    }
}



