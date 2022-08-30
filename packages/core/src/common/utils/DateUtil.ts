/**
 *@desc 日期工具类
 *@author liudejian
 *@date 2020-01-13 17:47
 **/
export class DateUtil {
    /**
     * 时间格式化
     * @param time 后台时间长整型/date
     * @param fmt 时间格式 yyyy-MM-dd hh:mm:ss
     * @returns {*}
     */
    public static dateFormat(time: Date | number, fmt ?: string): string {
        if (time === null || time == undefined) {
            return ''
        }
        if (fmt == undefined) {
            fmt = 'yyyy-MM-dd hh:mm:ss'
        }
        let date = null

        if (typeof time == 'object') {
            date = time
        } else if (typeof time == 'number') {
            date = new Date(time)
        } else {
            return time
        }

        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        const o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }

        // 遍历这个对象
        for (const k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                // console.log(`${k}`)
                // console.log(RegExp.$1)
                // @ts-ignore
                const str = o[k] + ''
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : (('00' + str).substr(str.length)))
            }
        }
        return fmt
    }


    /*
 * 年(Y) 可用1-4个占位符
 * 月(m)、日(d)、小时(H)、分(M)、秒(S) 可用1-2个占位符
 * 星期(W) 可用1-3个占位符
 * 季度(q为阿拉伯数字，Q为中文数字)可用1或4个占位符
 *
 * let date = new Date()
 * formatDate(date, "YYYY-mm-dd HH:MM:SS")           // 2020-02-09 14:04:23
 * formatDate(date, "YYYY-mm-dd HH:MM:SS Q")         // 2020-02-09 14:09:03 一
 * formatDate(date, "YYYY-mm-dd HH:MM:SS WWW")       // 2020-02-09 14:45:12 星期日
 * formatDate(date, "YYYY-mm-dd HH:MM:SS QQQQ")      // 2020-02-09 14:09:36 第一季度
 * formatDate(date, "YYYY-mm-dd HH:MM:SS WWW QQQQ")  // 2020-02-09 14:46:12 星期日 第一季度
 */
    public static formatDate(date: Date, format: string = 'YYYY-mm-dd HH:MM:SS'): string {
        let we = date.getDay(); // 星期
        let qut = Math.floor((date.getMonth() + 3) / 3).toString(); // 季度
        const opt: any = {
            'Y+': date.getFullYear().toString(), // 年
            'm+': (date.getMonth() + 1).toString(), // 月(月份从0开始，要+1)
            'd+': date.getDate().toString(), // 日
            'H+': date.getHours().toString(), // 时
            'M+': date.getMinutes().toString(), // 分
            'S+': date.getSeconds().toString(), // 秒
            'q+': qut, // 季度
        };
        // 中文数字 (星期)
        const week: any = {
            '0': '日',
            '1': '一',
            '2': '二',
            '3': '三',
            '4': '四',
            '5': '五',
            '6': '六',
        };
        // 中文数字（季度）
        const quarter: any = {
            '1': '一',
            '2': '二',
            '3': '三',
            '4': '四',
        };
        if (/(W+)/.test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '星期' + week[we] : '周' + week[we]) : week[we]);
        if (/(Q+)/.test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 4 ? '第' + quarter[qut] + '季度' : quarter[qut]);
        for (let k in opt) {
            let r = new RegExp('(' + k + ')').exec(format);
            // 若输入的长度不为1，则前面补零
            if (r) format = format.replace(r[1], RegExp.$1.length == 1 ? opt[k] : opt[k].padStart(RegExp.$1.length, '0'));
        }
        return format;
    }

    /**
     * 10秒：  10 * 1000
     * 1分：   60 * 1000
     * 1小时： 60 * 60 * 1000
     * 24小时：60 * 60 * 24 * 1000
     * 3天：   60 * 60* 24 * 1000 * 3
     *
     * let data = new Date()
     * formatPast(data)                                           // 刚刚
     * formatPast(data - 11 * 1000)                               // 11秒前
     * formatPast(data - 2 * 60 * 1000)                           // 2分钟前
     * formatPast(data - 60 * 60 * 2 * 1000)                      // 2小时前
     * formatPast(data - 60 * 60 * 2 * 1000)                      // 2小时前
     * formatPast(data - 60 * 60 * 71 * 1000)                     // 2天前
     * formatPast("2020-06-01")                                   // 2020-06-01
     * formatPast("2020-06-01", "YYYY-mm-dd HH:MM:SS WWW QQQQ")   // 2020-06-01 08:00:00 星期一 第二季度
     */
    public static formatPast(param: any, format: string = 'YYYY-mm-dd') {
        // 传入格式处理、存储转换值
        let t: any, s: any;
        // 获取js 时间戳
        let time: any = new Date().getTime();
        // 是否是对象
        typeof param === 'string' || 'object' ? (t = new Date(param).getTime()) : (t = param);
        // 当前时间戳 - 传入时间戳
        time = Number.parseInt(`${time - t}`);
        if (time < 10000) {
            // 10秒内
            return '刚刚';
        } else if (time < 60000 && time >= 10000) {
            // 超过10秒少于1分钟内
            s = Math.floor(time / 1000);
            return `${s}秒前`;
        } else if (time < 3600000 && time >= 60000) {
            // 超过1分钟少于1小时
            s = Math.floor(time / 60000);
            return `${s}分钟前`;
        } else if (time < 86400000 && time >= 3600000) {
            // 超过1小时少于24小时
            s = Math.floor(time / 3600000);
            return `${s}小时前`;
        } else if (time < 259200000 && time >= 86400000) {
            // 超过1天少于3天内
            s = Math.floor(time / 86400000);
            return `${s}天前`;
        } else {
            // 超过3天
            let date = typeof param === 'string' || 'object' ? new Date(param) : param;
            return DateUtil.formatDate(date, format);
        }
    }

    /**
     * formatAxis(new Date())   // 上午好
     */
    public static formatAxis(param: any): string {
        let hour: number = new Date(param).getHours();
        if (hour < 6) return '凌晨好';
        else if (hour < 9) return '早上好';
        else if (hour < 12) return '上午好';
        else if (hour < 14) return '中午好';
        else if (hour < 17) return '下午好';
        else if (hour < 19) return '傍晚好';
        else if (hour < 22) return '晚上好';
        else return '夜里好';
    }

    /**
     * 获取当前月第一天
     */
    public static getMonthFirstDay(): Date {
        let now = new Date(); //当前日期
        let nowMonth = now.getMonth(); //当前月
        let nowYear = now.getFullYear(); //当前年
        return new Date(nowYear, nowMonth, 1);
    }

    /**
     * 获取当前月最后一天
     */
    public static getMonthLastDay(): Date {
        let now = new Date(); //当前日期
        let nowMonth = now.getMonth(); //当前月
        let nowYear = now.getFullYear(); //当前年
        //本月的结束时间
        return new Date(nowYear, nowMonth + 1, 0);
    }


    /**
     * 将时间秒转为HH:MM:SS
     * @param second 时间秒
     */
    public static formatSecondToHms(second: any): string {
        if (second == null || second == "") {
            return "00:00:00";
        }
        let secondInt = parseInt(second);
        let hours = Math.round((secondInt - 30 * 60) / (60 * 60));
        let minutes = Math.round((secondInt - 30) / 60) % 60;
        let seconds = secondInt % 60;
        return (hours > 9 ? (hours) : "0"+hours) +":"+ (minutes > 9 ? (minutes)  : "0"+minutes) +":"+ (seconds > 9 ? (seconds +"") : "0"+seconds);

    }

}




