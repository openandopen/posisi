/**
 *@desc 元信息
 *@author liudejian
 *@date 2020-03-04 22:37
 **/

export enum Scope {
    //单例
    SINGLE = 1,
    //多例
    PROTOTYPE = 2
}

/**
 * bean定义类元信息
 */
export class BeanDefinition {
    //类名
    name: string = "";
    //类构造函数
    // @ts-ignore
    type: any;
    //bean作用域(默认：单例)
    scope: Scope = Scope.SINGLE;
    //候选标识
    qualifier?:string="";
    //属性或者方法
    fields?: Set<PropertyInfo>;


    public getPropertySet(): Set<PropertyInfo> {
        return this.fields ? this.fields : new Set<PropertyInfo>();
    }

    public addProperty(propertyInfo: PropertyInfo): this {
        if (this.fields == undefined) {
            this.fields = new Set<PropertyInfo>();
        }
        this.fields.add(propertyInfo);
        return this;
    }

    public setScope(scope: Scope): this {
        this.scope = scope;
        return this;
    }

    /**
     * 构建
     * @param name
     * @param classConstructor
     */
    public static build(name: string, classConstructor: any,qualifier?:string): BeanDefinition {
        let cm = new BeanDefinition();
        cm.name = name;
        cm.type = classConstructor;
        cm.qualifier = qualifier;
        return cm;
    }
}

/**
 *  属性信息
 */
export class PropertyInfo {
    //名称
    name?: string;
    //类型
    type?: any;
    //值
    value?: any;

    public static build(name: string, type: any, value: any): PropertyInfo {
        let fi = new PropertyInfo();
        fi.name = name;
        fi.type = type;
        fi.value = value;
        return fi;
    }
}

/**
 * 注册服务源信息
 */
export interface ServiceMeta {
    //作用域
    scope?: Scope;
    //候选标识
    qualifier?:string;
}

/**
 * 适配元信息
 */
export interface AutowireMeta{
    //候选标识
    qualifier?:string;
    //注入类的类型
    classType?:any;
}


