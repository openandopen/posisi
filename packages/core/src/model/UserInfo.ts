/**
 *@desc 用户信息
 *@author liudejian
 *@date 2020-02-26 18:26
 **/

export   class UserInfo {
    /**
     * ID唯一标识
     */

    id: number = 0;
    /**
     * UID
     */
    uid:string = "";
    /**
     * 邮箱
     */

    email?: string;
    /**
     * 头像
     */

    avatar?: string;

    /**
     * 性别
     */

    sex?: number;

    /**
     * 用户名
     **/

    username?: string;
    /**
     * 昵称
     */
    nickname?:string;

    token?: string;
    /**
     * 用户真名
     **/

    realName?: string;


    /**
     * 手机号
     **/

    mobile?: number;


    /**
     * 开放ID
     **/

    openId?: string;


    /**
     * 租户ID
     **/

    tenantId?: string;

    /**
     * 角色
     */
    roles?: Array<string>;

    /**
     * 按钮权限
     */
    authBtnList?: Array<string>;

    time?: number;
    lastLoginTime?:number;
}

