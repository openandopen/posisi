/**
 *@desc 请求对象
 *@author liudejian
 *@date 2020-03-20 21:28
 **/
export   class Request<T> {
    //请求body对象
    body?: T;
    //分页-开始下标记录索引(从0开始)
    start: number = 0;
    //分页-限制返回条数
    limit: number = 10;
    //请求扩展参数
    extendParams?: Map<string, Object>;

    setBody(body: T): Request<T> {
        this.body = body;
        return this;
    }

    setStart(start: number): Request<T> {
        this.start = start;
        return this;
    }

    setLimit(limit: number): Request<T> {
        this.limit = limit;
        return this;
    }

    setExtendParams(extendParams: Map<string, Object>): Request<T> {
        this.extendParams = extendParams;
        return this;
    }

    /**
     * 构建实例
     * @param body
     * @param start
     * @param limit
     */
    public static build(body: any, start: number, limit: number): Request<any> {
        return new Request<any>().setBody(body).setStart(start).setLimit(limit);
    }
}
