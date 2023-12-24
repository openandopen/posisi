/**
 *@desc 自动获取浏览器窗口 高宽
 *@author liudejian
 *@date 2023-03-31 14:41
 **/

export class DataSize {
    /**
     * 高度
     * @private
     */
    public height: number = 0;
    /**
     * 宽度
     * @private
     */
    public width: number = 0;

    public static of(height: number, width: number): DataSize {
        let rs = new DataSize();
        rs.height = height;
        rs.width = width;
        return rs;
    }
}

/**
 * 动态获取高宽
 */
export   class AutoSize {
    public flag: boolean = false;

    /**
     * 抹去的高度/宽度
     * @private
     */
    private eraseSize: DataSize = DataSize.of(0, 0);

    /**
     * 1= window.innerHeight / window.innerWidth
     * 2= document.body.clientHeight / document.body.clientWidth
     * @private
     */
    private clientType: number = 1;

    /**
     * 结果高度/宽度
     * @private
     */
    private resultSize: DataSize;

    /**
     * 回调函数
     * @private
     */
    private callback: Function;

    /**
     * 结果 高宽
     */
    public getSize(): DataSize {
        return this.resultSize
    }

    /**
     *
     * @param eraseHeight 抹去的高度
     * @param callback 高度变化就回调
     */
    public constructor(callback: Function, eraseSize?: DataSize, clientType?: number) {
        this.eraseSize = eraseSize == undefined ? DataSize.of(0, 0) : eraseSize;
        this.callback = callback;
        this.clientType = clientType == undefined ? 1 : clientType;

        if (this.clientType == 1) {
            this.resultSize = DataSize.of(window.innerHeight - this.eraseSize.height, window.innerWidth - this.eraseSize.width);
        } else {
            this.resultSize = DataSize.of(document.body.clientHeight - this.eraseSize.height, document.body.clientWidth - this.eraseSize.width);
        }
        this.initWindowResize(this)
    }

    private initWindowResize(instance: AutoSize) {
        window.onresize = function () {
            if (!instance.flag) {
                instance.flag = true;
                setTimeout(() => {
                    if (instance.clientType == 1) {
                        instance.resultSize.height = window.innerHeight - instance.eraseSize.height;
                        instance.resultSize.width = window.innerWidth - instance.eraseSize.width;
                    } else {
                        instance.resultSize.height = document.body.clientHeight - instance.eraseSize.height;
                        instance.resultSize.width = document.body.clientWidth - instance.eraseSize.width;
                    }
                    instance.flag = false;
                    instance.callback(instance.resultSize)
                }, 200)
            }
        }
    }
}
