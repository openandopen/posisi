/**
 *@desc
 *@author liudejian
 *@date 2022-09-19 11:14
 **/
export enum Sex {
    //男
    MALE = 1,
    //女
    FEMALE = 2
}
export enum CommonYn {
    //是
    YES = 1,
    //否
    NO = 2
}
export enum Status {
    //启用
    ENABLE = 1,
    //禁用
    DISABLE = 2
}
export enum LoginType {
    //用户名密码+验证码
    BASIC = 1,
    //令牌
    TOKEN = 2,
    //手机验证码
    MOBILE = 3,
    //开放ID
    OPENID = 4,
    //用户名密码
    PASSWORD = 5,
    //邮箱
    EMAIL=6
}
