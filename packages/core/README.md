### posisi

### 一. 本组介绍

```
   作者: 黑肱
   邮箱: zuiwoxing@qq.com
   源码: https://gitee.com/zuiwoxing/posisi 
        https://github.com/openandopen/posisi
   1. 项目描述:  本组件以typescript基础,提供规范,方便快捷的前端业务操作控制组件，提高开发效率。
   2. 组件功能:
       2.1 IOC容器,类似spring的IOC容器
       2.2 AOP 面向切面的编程组件
       2.3 Feign 提供方便,规范快捷的后台接口操作组件 (Feign的请求各参数配置参见 FeignConfig)
       2.4 Logger 日志组件
       2.5 Util 包含常用的工具(日期,Cookie,枚举,代理,文件等)
   3. 后期规划:
     3.1 将分别与VUE与REACT集成
     3.2 Feign 优化支持客户端负载，路由，序列化与反序列化，自定义拦截器等

```

### 二. 组件安装

```text
   npm i @zuiwoxing/posisi 
   或者
   yarn add @zuiwoxing/posisi 
```

### 三. 使用示例

#### 3.1 Feign客户端的使用,先定义一个字典请求API与后接口接口对应(可根据swagger生成)

``` typescript
import 'reflect-metadata';
import DictBo from "/@/service/dict/bo/DictBo";
import QueryMultiDto from "/@/service/dict/dto/QueryMultiDto";
import DictDto from "/@/service/dict/dto/DictDto";
import {Service,FeignClient,ParamType,RequestMapping,Response,RequestMethod,Service,Request,Page} from '@zuiwoxing/posisi';
/**
 *
 *@desc 字典服务
 *@author liudejian
 *@date 2022-02-26 18:14
 **/
//将该服务注入到IOC容器,其实Service也可指定scope作用域(单例|原型)以及qualifier候选标识(用于唯一标识该bean)
@Service({})  
// 定义API请求的Feign接口，其中dict.server.url可以是一个具体的地址，也可以在项目启动时将该配置放入ConfigUtil中(例如:ConfigUtil.put("gc.server.url","http://127.0.0.1:8080"))
@FeignClient({serverUrl: "{dict.server.url}", uri: "/", name: "字典主表"})  
export default class DictApi {
    /**
     * 添加数据
     * @param dict
     */
    @RequestMapping({
        uri: "console/dict/create", method: RequestMethod.POST, name: "添加数据",
        params: [{index: 0, name: "dict", type: ParamType.BODY, require: true}]
    })
    public create(dict: DictBo): Promise<Response<boolean>> {
        return Promise.prototype
    }
    /**
     * 更新数据
     * @param dict
     */
    @RequestMapping({
        uri: "console/dict/update", method: RequestMethod.POST, name: "更新数据",
        params: [{index: 0, name: "dict", type: ParamType.BODY, require: true}]
    })
    public update(dict: DictBo): Promise<Response<number>> {
        return Promise.prototype
    }

    /**
     * 根据主键ID删除
     * @param ids
     */
    @RequestMapping({
        uri: "console/dict/remove", method: RequestMethod.POST, name: "根据主键ID删除",
        params: [{index: 0, name: "ids", type: ParamType.BODY, require: true}]
    })
    public delete(ids: Array<string>): Promise<Response<number>> {
        return Promise.prototype
    }

    /**
     * 分页查询
     * @param request
     */
    @RequestMapping({
        uri: "console/dict/page", method: RequestMethod.POST, name: "分页查询",
        params: [{index: 0, name: "request", type: ParamType.BODY, require: true}]
    })
    public page(request: Request<DictDto>): Promise<Response<Page<DictDto>>> {
        return Promise.prototype
    }
    /**
     * 根据主键查询
     * @param ids
     */
    @RequestMapping({uri: "console/dict/single", method: RequestMethod.GET, name: "根据主键ID查询",
        params: [{index: 0, name: "id", type: ParamType.PARAM, require: true}]
    })
    public single(id: string): Promise<Response<DictDto>> {
        return Promise.prototype
    }
}
   
```

#### 3.2 Feign接口使用

##### 3.2.1 第一种使用方式(在其他typescript 定义的类中使用)

```typescript

@Service({})
export default class DictService {
    //可指定后续标识 与 注入类的类型 例如: @Autowired({qualifier="DictApi",classType=DictApi})
    @Autowired()
    dictApi?: DictApi;
    // logger的使用
     logger : Logger = Logger.getLogger(DictService)
    /**
     * 分页查询
     * @param request
     */
    public pageList(request: Request<QueryMultiDto>): Promise<Page<DictDto>> {
        let self = this;
        return new Promise<any>((resolve, reject) => {
            self.dictApi?.page(request).then((res: Response<Page<DictDto>>) => {
                res.success((page: Page<DictDto>) => {
                    resolve(page)
                    logger.info(page)
                }).error((reason: string) => {
                    reject(reason)
                    logger.error(reason)
                })
            }).catch((error: Response<any>) => {
                reject(error.message)
                logger.error(error.message+"-{0}","查询异常")
            })
        });
    }

}

```

##### 3.2.2 第二种使用方式(在VUE项目中使用)

```typescript

<template>
    <div>
        </div>
< /template>
< script
lang = "ts" >
import {getCurrentInstance, onMounted, reactive, toRefs} from 'vue'
import {AccountContext, CommonUtil, IocContext, Response} from "@zuiwoxing/posisi";
import DictApi from "/@/service/apis/DictApi";
import DictDto from "/@/service/dto/DictDto";

export default {
    name: "Dict",
    setup() {
        const {proxy} = getCurrentInstance() as any;
        let dictApi = IocContext.getBean<DictApi>(DictApi);
        const state = reactive({
            queryData: {},
            optData: {},
            viewData: {
                items: [],
                total: 0
            },
        });
        /**
         * 方法区
         */
        const methods = {
            /**
             * 分页查询
             * @param start
             * @param limit
             */
            query(start ?: number, limit?: number) {
                let req = new Request<DictDto>();
                req.start = start || 0
                req.limit = limit || 10
                req.body = reqData
                dictApi.page(req).then((res: Response<Page<DictDto>>) => {
                    res.success((page: Page<DictDto>) => {
                        proxy.viewData.total = page.total;
                        proxy.viewData.items = page.results;
                    }).error((reason: string) => {
                        //Element-UI 错误提示
                        ElMessage.error(reason)
                    })
                })
            }
        }

        return {
            methods,
            ...toRefs(state)
        }
    }
}
< /script>
```

##### 3.2.3 第三种使用方式(在React项目中使用)

```typescript
import {AccountContext, CommonUtil, IocContext, Response} from "@zuiwoxing/posisi";
import DictApi from "/@/service/apis/DictApi";
import DictDto from "/@/service/dto/DictDto";

const index: FC = (props: any) => {
    const [dictApi] = useState(() => IocContext.getBean<DictApi>(DictApi));
    const [page, setPage] = useState(new Page<DictDto>());
    const methods = {
        query() {
            /**
             * 分页查询
             * @param start
             * @param limit
             */
            query(start?: number,limit?: number) {
                let req = new Request<DictDto>();
                req.start = start || 0
                req.limit = limit || 10
                req.body = reqData
                dictApi.page(req).then((res: Response<Page<DictDto>>) => {
                    res.success((page: Page<DictDto>) => {
                        setPage(page)
                    }).error((reason: string) => {
                        //semi.design UI 错误提示
                        Toast.error(reason)
                    })
                })
            }
        }
    }
    
    return (
        <>
            <button onClick={methods.query}>测试查询</button>
        </>    
    )
}

```

#### 3.3 AOP的使用
```typescript
  //使用示例
  import {AopUtil,Logger,MethodHandler} from "@zuiwoxing/posisi";
class Person {
    id!: number;
    name!: string;
    age?: number;
}

class PersonService {
    public create(person: Person): boolean {
        person.id = 999999
        person.name = "刘刘"
        return true
    }
}

export default class TestAopUtil {
    static logger  = Logger.getLogger(PersonService)
    public static  testPersonService() {
        let personService = AopUtil.createProxyInstance<PersonService>(PersonService, new class implements MethodHandler {
            before(...args: any): void {
                TestAopUtil.logger.info("执行方法前:{0}",args)
            }
            after(result: any, ...args: any): void {
                TestAopUtil.logger.info("执行方法后:{0} , {1}",result,args)
            }
            exception(e: any): void {
                TestAopUtil.logger.error("执行方法异常:{0}",e)
            }
            finally(result: any, ...args: any): void {
                TestAopUtil.logger.info("执行最终返回:{0} ,{1}",result,args)
            }
            return(result: any, ...args: any): void {
                TestAopUtil.logger.info("执行完成返回:{0} ,{1}",result,args)
            }
        })

        let person = new Person()
        person.id = 100;
        person.name = "liudejian";
        person.age = 1000
        let result = personService.create(person)
        console.log("执行结果:",result)
    }
}

TestAopUtil.testPersonService()

//运行  esno TestAopUtil.ts 结果如下

2022-08-30 16:40:28|INFO|PersonService 执行方法前:[{"0":{"id":100,"name":"liudejian","age":1000}}]
2022-08-30 16:40:28|INFO|PersonService.create 执行方法后:true , [{"0":{"id":999999,"name":"刘刘","age":1000}}]
2022-08-30 16:40:28|INFO|PersonService.create 执行最终返回:true ,[{"0":{"id":999999,"name":"刘刘","age":1000}}]
2022-08-30 16:40:28|INFO|PersonService.create 执行完成返回:true ,[{"0":{"id":999999,"name":"刘刘","age":1000}}]
执行结果: true


```
```html
changelog
0.0.26 将axios版本将为 1.2.0 
```

#### 交流

<div>
  <span>
  <img src="images/weixin.jpg" width="200" height="200">
  </span>
</div>

#### 打赏

<div>
  <span>
  <img src="images/support.jpg" width="200" height="200">
  </span>
</div>
