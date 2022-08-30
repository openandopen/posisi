/**
 *@desc
 *@author liudejian
 *@date 2022-08-30 16:22
 **/
import AopUtil from "./AopUtil";
import {MethodHandler} from "./MethodHandler";
import {Logger} from "../logger";

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
