/**
 *
 *@author :<a href="mailto:zuiwoxing@qq.com">liudejian</a>
 *@version :Ver 1.0
 *@date :2020-05-03 21:04:12
 */
export class CommonTree {
    // 当前节点ID
    id?: number;
    // 节点唯一标识，不能为空
    key!: string;
    // 父节点ID
    pid?: number;
    // 节点名称
    label?: string;
    url?: string;
	icon?: string;
//	leaf?:boolean;
    // 是否选种
    checked: boolean = false;
    // 是否禁用
    disabled: boolean = false;
    // 排序
    order: number = 0;
    // 层级
    level: number = 0;
    // 根据业务决定该值的使用
    nodeType?:number;
    // 子节点
    children: Array<CommonTree> = new Array<CommonTree>();
    // 扩展参数
    params?: Map<string, any>;

}
