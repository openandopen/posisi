/**
 *@desc 通用菜单树
 *@author liudejian
 *@date 2023-11-25 13:34
 **/
export   class CommonMenuTree {
    //ID
    id?: number;
    //PID
    pid?: number;
    //路由路径
    path?: string;
    //路由名称
    name?: string;
    //重定向地址
    redirect?: string;
    //是否虚拟节点
    isVirtual?: boolean;
    //层级
    level?: number;
    //组件路径:example:/views/gc/Test.vue
    component?: string;
    //排序值
    orderNum?: number;
    //子节点
    children?: Array<CommonMenuTree>;
    // 元信息
    meta?: Meta;
}

export class Meta {
    //图标
    icon?: string;
    //标题
    title?: string;
    //是否嵌入式
    embedded?: boolean;
    //是否链接
    isLink?: boolean = false;
    //是否隐藏
    isHide?: boolean = false;
    //是否保持存活
    isKeepAlive?: boolean = true;
    //是否固定
    isAffix?: boolean = false;
    //是否iframe
    isIframe?: boolean = false;

}