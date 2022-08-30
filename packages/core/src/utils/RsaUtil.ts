
import jsr from 'jsrsasign'

/**
 *@desc
 *@author liudejian
 *@date 2020-06-26 20:56
 **/
export   class RsaUtil {

    private static RSA_PRIVATE_KEY = "-----BEGIN RSA PRIVATE KEY-----\n" +
        "MIICXQIBAAKBgQDjnqokLXzkRl/dMNieoV8xIEjPjkiyCg1ll0qsLhCRadgbp5nJ\n" +
        "dGRlBrkg5HLfWEyZ6c3mDe0LRlPecomrmGK5TL1ry3YTlKtfAxz+W/yTrDHLIe/w\n" +
        "dGL8GGx4x3j5HB4bxCXaOowNmE12oZahn00R+K6YaJFJw5buOGz7p0YOGQIDAQAB\n" +
        "AoGBAIkwfEPJ1tiPQgBDDIyvnnwxhTD0BQSp4mE0yqD0MrAyJzqjzaEKMehiIPqe\n" +
        "Nk4/Hgw2Sw85nYGKJcqRJkDyW61IPbqKBc5aNiO+7oIEM6n9rXhXuilfSExSFAYA\n" +
        "90pSRoQUW3BmZKne5AQj9sjwKfYrCoikpU1dCBKdLF8ydUoBAkEA/Ag8Aw8onDeS\n" +
        "qxG1Jj8IjkM7tt3FTlbXDkGCfh5RQMi8S27SZDpqqUIw0P9kR8498wp6FXksTjqW\n" +
        "ujhOTMciaQJBAOc0CnrPIU6liKY3Zw6O6vMOltnGv5STpvtJAeuGzxh7nx9U+x9d\n" +
        "sH6z8NygYoyy3lv2sEhFcXaR4JJAaxlluDECQC2aB9G94mkxnPYbBB3hddjXzWwv\n" +
        "AE5GZC8OJ2BOeAEy0O8NJEBCWZ46fb6zFx/u70KUeLZ98EhPTYpwOaqmtVECQBDz\n" +
        "gtUwPIvsnRE6vKaXmehKKIs9BCzbioGf/7EKCEMORUNh0quhDeCsRruWUsNoFd9+\n" +
        "Pbx+wuvjlCiE6pVJHPECQQCuLyYXVrHCkvj0IhLt07QT/XoQrGwhXI0GwVwDl+ui\n" +
        "fihjd8to4NMx13L29RN/cArpd7q6kXnd2kLVCyxxAIV3\n" +
        "-----END RSA PRIVATE KEY-----";

    private static RSA_PUBLIC_KEY = "-----BEGIN PUBLIC KEY-----\n" +
        "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDjnqokLXzkRl/dMNieoV8xIEjP\n" +
        "jkiyCg1ll0qsLhCRadgbp5nJdGRlBrkg5HLfWEyZ6c3mDe0LRlPecomrmGK5TL1r\n" +
        "y3YTlKtfAxz+W/yTrDHLIe/wdGL8GGx4x3j5HB4bxCXaOowNmE12oZahn00R+K6Y\n" +
        "aJFJw5buOGz7p0YOGQIDAQAB\n" +
        "-----END PUBLIC KEY-----";


    /**
     * 公钥加密
     * @param word
     */
    public static encrypt(word:string):string {
        let pub = jsr.KEYUTIL.getKey(this.RSA_PUBLIC_KEY) as any;
        let enc = jsr.KJUR.crypto.Cipher.encrypt(word, pub,"RSAOAEP");
        return jsr.hextob64(enc);
    }

    /**
     * 私钥解密
     * @param word
     */
    public static descrypt(word:string):string {
        let pub = jsr.KEYUTIL.getKey(this.RSA_PRIVATE_KEY) as any;
        word = jsr.b64nltohex(word)
        let enc = jsr.KJUR.crypto.Cipher.decrypt(word, pub,"RSAOAEP");
        return enc;
    }


}
