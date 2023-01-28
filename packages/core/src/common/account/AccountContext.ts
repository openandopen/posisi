/**
 *@desc
 *@author liudejian
 *@date 2020-03-26 18:30
 **/


import Constant from "../Constant";
import {EnumUtil,StorageUtil} from "../index";
import {UserInfo} from "../../model/UserInfo";


/**
 * account
 */
export   class AccountContext {

    private static USER_INFO = "user_info";
    private static TOKEN = "token";
    private static ROUTER = "router";

    public static userInfo: UserInfo;


    /**
     * 缓存
     * @param userInfo
     */
    public static setUserInfo(userInfo: UserInfo): void {
        AccountContext.userInfo = userInfo;
        StorageUtil.setSessionStorage(AccountContext.USER_INFO, userInfo);
    }

    public static setToken(token: string): void {
        StorageUtil.setSessionStorage(AccountContext.TOKEN, token);
    }

    /**
     * 获取用户信息
     */
    public static getUserInfo(): UserInfo {
        let userInfo = AccountContext.userInfo;
        if (userInfo == undefined || userInfo == null) {
            AccountContext.userInfo = StorageUtil.getSessionStorage(AccountContext.USER_INFO);
        }
        return AccountContext.userInfo || {};
    }


    /**
     * 获取token
     */
    public static getToken(): string {
        return StorageUtil.getSessionStorage(AccountContext.TOKEN);
    }

/*    public static getUserOwnRouter() :Array<RouteRecordRaw> {
        let routeStr = StorageUtil.getSessionStorage(AccountContext.ROUTER);
        return JSON.parse(routeStr);
    }

    public static setUserOwnRouter(routers:Array<RouteRecordRaw>) {
        StorageUtil.setSessionStorage(AccountContext.ROUTER,JSON.stringify(routers))
    }*/

    /**
     * 获取token
     */
    public static clearAccount(): void {
        StorageUtil.removeSessionStorage(AccountContext.TOKEN);
        StorageUtil.removeSessionStorage(AccountContext.USER_INFO);
        StorageUtil.removeSessionStorage(AccountContext.ROUTER);
        StorageUtil.removeLocalStorage(Constant.OWER_MENU);
        EnumUtil.ClearEnum();
    }

}
