export type ThumbnailMode = "lfit"|"mfit"|"fill"|"pad"|"fixed"

/**
 *@desc OSS工具
 *@author liudejian
 *@date 2024-04-21 11:16
 **/
export   class OssUtil {

    /**
     * 阿里云OSS,百分比缩放图片
     * @param url 图片URL
     * @param percentage 百分比:example(10,20,50)
     * @return 返回最终于URL
     */
    public static aliThumbnailPercentage(url:string,percentage:number):string {
        if (url){
            percentage = Math.ceil(percentage);
            if (url.indexOf("?") !=-1) {
                url+="&x-oss-process=image/resize,p_"+percentage;
            } else {
                url+="?x-oss-process=image/resize,p_"+percentage;
            }
        }
        return url
    }

    /**
     * 将原图指定按短边缩略
     * @param url  图片URL
     * @param width 宽 example:100
     * @param height 高 example:200
     * @param tm 缩放方式 (
     * lfit（默认值）：等比缩放，缩放图限制为指定w与h的矩形内的最大图片。
     * mfit：等比缩放，缩放图为延伸出指定w与h的矩形框外的最小图片。
     * fill：将原图等比缩放为延伸出指定w与h的矩形框外的最小图片，然后将超出的部分进行居中裁剪。
     * pad：将原图缩放为指定w与h的矩形内的最大图片，然后使用指定颜色居中填充空白部分。
     * fixed：固定宽高，强制缩放。)
     * @return 返回最终于URL
     */
    public static aliThumbnai(url:string,width:number,height:number,tm?:ThumbnailMode):string {
        if (url){
            if (!tm) {
                tm="lfit";
            }
            width = Math.ceil(width);
            height = Math.ceil(height);
            if (url.indexOf("?") !=-1) {
                url+="&x-oss-process=image/resize,m_"+tm+",h_"+height+",w_"+width+"";
            } else {
                url+="?x-oss-process=image/resize,m_"+tm+",h_"+height+",w_"+width+"";
            }
        }
        return url
    }
}