import mitt from 'mitt';


/**
 *@desc
 *@author liudejian
 *@date 2020-03-26 13:12
 **/
// @ts-ignore
const BUS = mitt()

/**
 * 事件总线
 */
export class EventBus {

    /**
     * 发布事件
     * @param key
     * @param data
     */
    public static publish(key: string, data: any) {
        BUS.emit(key, data)
    }

    /**
     * 监听事件
     * @param key
     * @param callback
     */
    public static on(key: string, callback: any) {
        BUS.on(key, callback);
    }
}
