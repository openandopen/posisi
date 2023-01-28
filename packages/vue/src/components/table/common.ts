export default {
    methods: {
        /**
         * 按钮显示与否
         * @param row
         * @param callback
         * @returns {boolean|*}
         */
        btnShowRule(row: any, callback: any): boolean {
            if (callback) {
                return callback(row);
            } else {
                return true;
            }
        },
        /**
         * 用户自定义
         * @param row 行
         * @param col 列
         * @param callback
         */
        userDefined(row: any,col:any, callback: any): any {
            if (callback) {
                return callback(row,col);
            } else {
                return "";
            }
        }
    }
}
