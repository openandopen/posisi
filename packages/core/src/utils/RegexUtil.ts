export class Word {
    //匹配单词下标
    index!: number;
    //单词
    word!: string;
}

/**
 *@desc 正则表达式工具类
 *@author liudejian
 *@date 2022-11-03 14:03
 **/
export class RegexUtil {

    /**
     * g    全局搜索。
     * i    不区分大小写搜索。
     * m    多行搜索。
     * s    允许 . 匹配换行符。
     * u    使用 unicode 码的模式进行匹配。
     * y    执行“粘性 (sticky)”搜索，匹配从目标字符串的当前位置开始。
     * 从 text中提取 所有满足条件的单词数据
     * @param text
     * @param regex  格式 /xxx/gi
     */
    public static extractAll(text: string, regex: object): Array<Word> {
        let result = new Array<Word>();
        if (text && regex) {
            // @ts-ignore
            text.replace(regex, (matchWord, index, content) => {
                result.push({index: index, word: matchWord} as Word);
                return matchWord;
            });
        }
        return result;
    }

    /**
     * 提取第一个匹配
     * @param text
     * @param regex 格式 /xxx/gi
     */
    public static extractFirst(text: string, regex: object): Word | null {
        let word: any = null;
        if (text && regex) {
            // @ts-ignore
            text.replace(regex, (matchWord, index, content) => {
                if (word == null) {
                    word = {index: index, word: matchWord} as Word;
                }
                return matchWord;
            });
        }
        return word;
    }

    /**
     * 提取最后一个匹配
     * @param text
     * @param regex 格式 /xxx/gi
     */
    public static extractLast(text: string, regex: object): Word | null {
        let word = null;
        if (text && regex) {
            // @ts-ignore
            text.replace(regex, (matchWord, index, content) => {
                word = {index: index, word: matchWord} as Word;
                return matchWord;
            });
        }
        return word;
    }

    /**
     * 分割单词
     * @param text
     * @param regex 格式 /xxx/gi
     * @param limit 限制分割数
     */
    public static splitWord(text: string, regex: object, limit?: number): Array<string> {
        if (text && regex) {
            // @ts-ignore
            return text.split(regex, limit)
        }
        return new Array<string>();
    }

    /**
     * 检索匹配
     * @param text
     * @param regex 格式 /xxx/gi
     */
    public static searchWord(text: string, regex: object): number {
        if (text && regex) {
            // @ts-ignore
            return text.search(regex)
        }
        return -1;
    }

    /**
     * 匹配单词
     * @param text
     * @param regex 格式 /xxx/gi
     */
    public static matchWord(text: string, regex: object): Array<string> {
        if (text && regex) {
            // @ts-ignore
            return text.match(regex)
        }
        return new Array<string>();
    }

    /**
     * 是否匹配单词
     * @param text
     * @param regex  格式 /xxx/gi
     */
    public static testWord(text: string, regex: object):boolean {
        if (text && regex) {
            // @ts-ignore
            return new RegExp(regex).test(text)
        }
        return false;
    }

    /**
     * 按正则-替换
     * @param text 原始内容
     * @param regex 正则表达式
     * @param map 替换内容k-v形式 example: {name:'liu',age:20}
     */
    public static replaceWord(text:string,regex:object,map:any):string {
        if (text && regex) {
            // @ts-ignore
           return  text.replace(regex, (matchWord, index, content) => {
                return map[matchWord];
            });
        }
        return text;
    }
}


/*let words = "中华人民共和国,中A国共产a党";
let arys = RegexUtil.extractAll(words, /a/gi);
arys.forEach((word) => {
    console.log(word)
})

let arysx = RegexUtil.splitWord(words, /a/gi);

console.log(arysx)
console.log(RegexUtil.searchWord(words,/a/gi));
console.log(RegexUtil.matchWord(words,/a/gi));
let reg = new RegExp(/a/gi)
console.log(RegexUtil.testWord(words,/a/gi))
console.log(RegexUtil.replaceWord(words,/中/gi,{"中":"<h1>中</h1>"}))*/
