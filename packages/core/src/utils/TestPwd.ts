/**
 *@desc
 *@author liudejian
 *@date 2020-06-26 21:07
 **/
import {RsaUtil} from "./RsaUtil";

export default class TestPwd {

    public static test() {
        let password = "liudejian@999"
        /*    let pwd =  CryptoUtil.RsaPublicKeyEncrypt(password);
            console.log(pwd);
            let desPwd = CryptoUtil.RsaPrivateKeyDescrypt(pwd);
          console.log(desPwd);*/
        let pwd = RsaUtil.encrypt(password);
        console.log(pwd);
        let pwdW = RsaUtil.descrypt(pwd);
        console.log(pwdW);
    }
}

TestPwd.test()
