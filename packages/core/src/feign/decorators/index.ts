/**
 *@desc
 *@author liudejian
 *@date 2020-03-20 15:57
 **/

import {UrlUtil} from "../../common";
import {ParamType} from "../../feign/enums";
import HttpRequest from "../../feign/utils/HttpRequest";
import {ClassMeta, MethodMeta, ReqInfo} from "../../feign/model/Meta";
import {ConfigUtil} from "../../config/ConfigUtil";

const classPropKey = Symbol("classPropKey");
const classMetaKey = Symbol("classMetaKey");
const PATTERN = /\{(.*)\}/g

export  function urlReplaceEngine(template: string, json: any) {
    return template.replace(PATTERN, function (match, key, value) {
      //  console.log("match-key===",key)
        return json[key]
    })
}
/**
 *@desc 客户端
 *@author liudejian
 *@date 2020-02-06 11:58
 **/
export function FeignClient(classMeta: ClassMeta): ClassDecorator {
    return function (constructor: any) {
        //定义class级别类型
        Reflect.defineMetadata(classMetaKey, classMeta, constructor.prototype, classPropKey);
    }
}

/**
 * 请求方法上的注解
 * @param methodMeta
 * @constructor
 */
export function RequestMapping(methodMeta: MethodMeta) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
        let method = descriptor.value;
        descriptor.value = async function () {
            // console.log("RequestMapping========",method)
            //获取定义的类信息
            let classMeta: ClassMeta = Reflect.getOwnMetadata(classMetaKey, target, classPropKey);
            let urlResult = urlReplaceEngine(classMeta.serverUrl,ConfigUtil.getConfigMapToObject());
             let finalServerUrl = urlResult;
            let serverUrl = UrlUtil.urlJoin(finalServerUrl, classMeta.uri || "");
            let finalUrl = UrlUtil.urlJoin(serverUrl, methodMeta.uri);

            let reqMethod = methodMeta.method;
            let reqInfo = ReqInfo.build(finalUrl, reqMethod);
            let params = methodMeta.params;
            let callback: any = null
            if (params) {
                for (let param of params) {
                    let pIndex = param.index;
                    // @ts-ignore
                    let paramValue = arguments[pIndex];
                    if (param.require && (paramValue == null || paramValue == undefined || paramValue == "")) {
                        throw new Error(param.name + " 为必填项!");
                    }
                    if (param.type == ParamType.HEADER) {
                        reqInfo.addHeader(param.name, paramValue);
                    } else if (param.type == ParamType.PARAM) {
                        reqInfo.addParam(param.name, paramValue);
                    } else if (param.type == ParamType.BODY) {
                        reqInfo.setBodyData(paramValue);
                    } else if (param.type == ParamType.CALLBACK) {
                        callback = paramValue;
                    }
                }
            }

             let promise = HttpRequest.request(reqInfo, {}, function (finished: any) {
            })
            return promise;
        }

    };
}
