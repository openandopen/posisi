import {ParamType, RequestMethod} from "../enums";

/**
 *@desc 服务元信息
 *@author liudejian
 *@date 2020-02-06 16:17
 **/
export class ClassMeta {
    /**
     * 名称
     */
    name?: string;

    /**
     * 服务基础地址 (example:http(s)://localhost:8080)
     */
    serverUrl: string = "/";
    /**
     * 前缀URI(example: /user/getName)
     */
    uri: string = "/";
    /**
     * 描述
     */
    desc?: string;
}

/**
 *@desc
 *@author liudejian
 *@date 2020-03-20 21:13
 **/
export class MethodMeta {
    //请求URI的名称
    name?: string;
    //请求的URI
    // @ts-ignore
    uri: string;
    //请求方式
    // @ts-ignore
    method: RequestMethod;
    //请求参数名(param|body)
    params?: Array<ParamMeta>;
    //描述信息
    desc?: string;
}

/**
 * 参数元信息
 */
export class ParamMeta {
    //参数下标索引
    index!: number;
    // @ts-ignore
    //参数名
    name!: string;
    //是否必填
    require!: boolean;
    //参数类型
    type!: ParamType;
}

//请求元信息
export class ReqInfo {
    //请求的URI
    uri: string = "/";
    //请求方式
    method: RequestMethod = RequestMethod.GET;
    //消息体
    bodyData?: object;
    //GET|DELETE 请求
    paramData?: Map<string, object>;
    //header参数
    headerData?: Map<string, string>

    public setUri(uri: string): this {
        this.uri = uri;
        return this;
    }

    public setMethod(method: RequestMethod): this {
        this.method = method;
        return this;
    }

    public setBodyData(bodyData: object): this {
        this.bodyData = bodyData;
        return this;
    }

    public addParam(key: string, value: object): this {
        if (this.paramData == undefined || this.paramData == null) {
            this.paramData = new Map<string, object>();
        }
        this.paramData.set(key, value);
        return this;
    }

    public addHeader(key: string, value: string): this {
        if (this.headerData == undefined || this.headerData == null) {
            this.headerData = new Map<string, string>();
        }
        this.headerData.set(key, value);
        return this;
    }

    public removeHeader(key: string): this {
        if (this.headerData == undefined || this.headerData == null) {
            this.headerData = new Map<string, string>();
        }
        this.headerData.delete(key);
        return this;
    }

    /**
     * 构建
     * @param uri
     * @param method
     */
    public static build(uri: string, method: RequestMethod): ReqInfo {
        return new ReqInfo().setUri(uri).setMethod(method);
    }

}
