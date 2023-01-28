import {Response} from "@zuiwoxing/posisi";
import {ElMessage} from "element-plus";

/**
 *@desc
 *@author liudejian
 *@date 2022-09-19 11:32
 **/
export   class VueEleResponse<T> extends Response<any> {

    /**
     * 成功提示
     * @param success
     */
    public successTip(...success: any): this {
        if (this.isSuccess()) {
            if (success != null && success != undefined) {
                ElMessage.success(success[0])
            } else {
                ElMessage.success("操作成功")
            }
        }
        return this;
    }

    /**
     * 错误提示
     * @param errors
     */
    public errorTip(...errors: any): this {
        if (!this.isSuccess()) {
            if (errors != null && errors != undefined && errors.length > 0) {
                ElMessage.error(errors[0])
            } else {
                ElMessage.error(this.getMessage())
            }
        }
        return this;
    }

}
