/*import fs from "fs";
import path from "path";*/

/**
 *@desc 文件工具
 *@author liudejian
 *@date 2020-01-13 17:47
 **/
export class FileUtil {
    /**
     * 格式化文件大小 （ 参数：表示要被转化的容量大小，以字节为单）
     * @param a 待格式化的文件大小(byte)
     * @param b 参数：表示如果转换时出小数，四舍五入保留多少位 默认为2位小数
     */
    public static formatBytes(a: number, b: number): string {
        if (0 == a) return "0 B";
        let c = 1024, d = b || 2, e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
            f = Math.floor(Math.log(a) / Math.log(c));
        return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
    }

    /**
     * 加载文件夹下所有文件
     * @param fileDir
     */
  /*  public static loadAllFiles(fileDir: any): Array<string> {
        let files = new Array<string>();
        let stat = fs.statSync(fileDir);
        if (stat.isFile()) {
            files.push(fileDir);
            return files;
        }
        /!**
         * 加载文件
         * @param fileDir
         *!/
        function loadFile(fileDir: any) {
            let res = fs.readdirSync(fileDir)
            res.forEach((item, index, ary) => {
                // @ts-ignore
                let filePath = path.join(fileDir, item);
                let stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    loadFile(filePath)
                } else {
                    files.push(filePath);
                }
            })
        }

        loadFile(fileDir);
        return files;
    }
*/
}


