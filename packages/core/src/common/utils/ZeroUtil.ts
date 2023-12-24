import {CommonUtil} from "@/common";

/**
 *@desc 零宽字符处理
 *@author liudejian
 *@date 2023-10-14 21:41
 **/
export class ZeroUtil {
    // 用户替换1
    public static HIDE_WORD_1: string = "\u200b";
    // zero-width non-joiner 用于替换0
    public static HIDE_WORD_0: string = "\u200c";
    //分割使用
    public static HIDE_WORD_FEFF: string = "\ufeff";

    /**
     *  将 word 进行字符拆分，然后每个字符进行转译
     * @param word
     */
    public static textToBinary(word: string): Array<any> {
        return word.split('').map(char => {
            return char.charCodeAt(0).toString(2);
        })
    }


    /**
     * 将二进制转零宽字符
     * @param arr
     */
    public static binaryToZeroAry(arr: Array<any>): Array<any> {
        return arr.map((binary: string) => {
            return binary.split('').map((num: any) => {
                if (+num === 1) {
                    return ZeroUtil.HIDE_WORD_1; // zero-width space
                    // '•'.charCodeAt(0).toString(16) => '200b'
                } else {
                    return ZeroUtil.HIDE_WORD_0; // zero-width non-joiner
                    // '•'.charCodeAt(0).toString(16) => '200c'
                }
            }).join('')
        })
    }

    /**
     * 将零宽字符拼接在字符串 prefix后面
     * @param prefix 前缀
     * @param zeroAry  零宽字符数组
     */
    public static joinZeroAryToString(prefix: string, zeroAry: Array<any>): string {
        return prefix + zeroAry.join(ZeroUtil.HIDE_WORD_FEFF);
    }


    /**
     * 零宽字符转字符串
     * @param zeroWidthStr
     */
    public static zeroWidthToStr(zeroWidthStr: string): string {
        let binaryStr = zeroWidthStr.split('').map((zeroWidthChar) => {
            if (zeroWidthChar === ZeroUtil.HIDE_WORD_1) {
                return '1';
            } else {
                return '0';
            }
        }).join('');
        return ZeroUtil.binaryToStr(+binaryStr)
    }

    /**
     * 将二进制数转成字符
     * @param binary
     * @private
     */
    public static binaryToStr(binary: any): string {
        return String.fromCharCode(parseInt(binary, 2));
    }


    /**
     * 零宽转String
     * @param zeroArr
     */
    public static zeroArrToString(zeroArr: Array<any>): string {
        return zeroArr.map(ZeroUtil.zeroWidthToStr).join('');
    }
    /**
     * 【1】将word转为零宽字符
     * @param word
     */
    public static convertToZeroString(word:string):string {
        if (CommonUtil.isBlank(word)) {
            return "";
        }
        let binaryAry = ZeroUtil.textToBinary(word);
        let zeroAry = ZeroUtil.binaryToZeroAry(binaryAry);
        return zeroAry.join(ZeroUtil.HIDE_WORD_FEFF)
    }

    /**
     *  【2】提取word中隐藏的零宽字符串
     * @param word
     */
    public static extractHideInfo(word: string): string {
        return word.replace(/[^\u200b-\u200f\uFEFF\u202a-\u202e]/g, "");
    }



    /**
     * 【3】将零宽字符还原为正常字符串
     * @param zeroWord
     */
    public static convertZeroStringToString(zeroWord:string):string {
        if (CommonUtil.isBlank(zeroWord)) {
            return "";
        }
        let zeroWordAry = zeroWord.split(ZeroUtil.HIDE_WORD_FEFF);
        let result = ZeroUtil.zeroArrToString(zeroWordAry);
        return result;
    }
}

/**
 * console.log("===============================")
 * let link = 'lvalue.com'
 * let zeroWord = ZeroUtil.convertToZeroString("中华人民共和国")
 * zeroWord = link+zeroWord;
 * console.log(zeroWord+"===========");
 * zeroWord = ZeroUtil.extractHideInfo(zeroWord);
 * console.log(zeroWord+"===========");
 * let res = ZeroUtil.convertZeroStringToString(zeroWord);
 * console.log(res)
 */

