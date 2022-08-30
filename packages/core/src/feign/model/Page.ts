/**
 *@desc 分页对象
 *@author liudejian
 *@date 2020-01-23 23:20
 **/
export   class Page<T> {

    //总数
    total: number = 0;
    //结果集
    results: Array<T> = [];


    public setTotal(total: number): this {
        this.total = total;
        return this;
    }

    public setResults(results: Array<T>): this {
        this.results = results;
        return this;
    }

    /**
     * 构建实例
     * @param total
     * @param results
     */
    public static build(total: number, results: Array<any>): Page<any> {
        return new Page<any>().setResults(results).setTotal(total);
    }

}
