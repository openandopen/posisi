/**
 *@desc
 *@author liudejian
 *@date 2020-04-06 21:54
 **/
export   class DictDto {


    /**
     * 名称空间 编码
     */
    namespace?: string;

    /**
     * 应用Code
     */
    appCode?: string;
    /**
     * 字典名称(中文)
     */
    dictName?: string;

    /**
     * 字典编码
     */
    dictCode?: string;

    /**
     * 字典枚举详细信息
     */
    dictDetails?: Array<DictDetailDto>

}

export class DictDetailDto {
    /**
     * 字典名称中文
     */
    codeCn?: string;

    /**
     * 字典编码英文
     */
    codeEn?: string;

    /**
     * 字典编码
     */
    code?: number;

}
