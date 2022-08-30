/**
 *@desc 方法处理
 *@author liudejian
 *@date 2020-03-20 21:59
 **/
export interface MethodHandler {

    /**
     * 执行前
     * @param args 入参
     */
    before(...args: any): void;

    /**
     * 执行方法后
     * @param result 执行方法返回的结果
     * @param args 入参
     */
    after(result: any, ...args: any): void;

    /**
     * 异常
     * @param e
     */
    exception(e: any): void;


    /**
     * 返回之前
     * @param result
     * @param args
     */
    return(result: any, ...args: any): void;


    /**
     * 最终返回
     * @param result 执行方法返回的结果
     * @param args  入参
     */
    finally(result: any, ...args: any): void;


}
