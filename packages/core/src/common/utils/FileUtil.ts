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
     * 判断是否为Base64字符串
     * @param data
     */
    public static isBase64Img(data:string) {
        //正则表达式判断
        let reg = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
        return reg.test(data);
    }
    /**
     * 判断是否为Blob对象
     * @param data
     */
    public static isBlob(data:any):boolean {
        return data instanceof Blob;
    }
    /**
     * 判断是否为File对象
     * @param data
     */
    public static isFile(data:any):boolean {
        return data instanceof File && !(data instanceof Blob)
    }
    /**
     * Base64转换为File
     * @param dataurl
     * @param filename
     */
    public static dataURLtoFile(dataurl:any, filename:string) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }


    /**
     * Base64转换为Blob
     * @param dataurl
     * @param filename
     */
    public static dataURLtoBlob(dataurl:any, filename:string) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    /**
     * Blob转File
     * @param blob
     */
    public static blobToFile(blob:any) {
        return new File([blob], 'screenshot.png', { type: 'image/jpeg' })
    }

    public static blobToFileDefineName(blob:any,fileName:string) {
        return new File([blob], fileName, { type: 'image/jpeg' })
    }

    /**
     * 获取图片高宽
     * @param file
     *
     */
    public static getImageWidthHeight(file:File) :Promise<ImageHw>{
        return new Promise((resolve, reject) => {
            // 获取上传的图片的宽高
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (evt:any) {
                let replaceSrc = evt.target.result;
                let imageObj = new Image();
                imageObj.src = replaceSrc as any;
                imageObj.onload = function () {
                    resolve({width:imageObj.width,height:imageObj.height} as ImageHw)
                };
            };
            reader.onerror = function (err:any) {
                reject(err)
            }
        })
    }

    /**
     * 获取音视频 播放时长(单位:秒(s))
     * @param file
     */
   public static getMediaDuration(file: File): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            //获取音频、视频时长
            const url = URL.createObjectURL(file);
            const audioElement = new Audio(url);
            let duration;
            audioElement.addEventListener("loadedmetadata", (_event) => {
                duration = audioElement.duration;
                resolve(duration)
            });
        })
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

/**
 * 图片高宽
 */
export interface ImageHw {
  height:number;
  width:number;
}
