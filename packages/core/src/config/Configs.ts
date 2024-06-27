import {PosisiConfig} from "../config/PosisiConfig";
import {DefaultFeignDecode} from "../feign/decode/DefaultFeignDecode";
import {DefaultFeignInterceptor} from "../feign/decode/DefaultFeignInterceptor";


const posisiConfig = new PosisiConfig();
posisiConfig.userDecodeIns = new DefaultFeignDecode();
posisiConfig.userInterceptorIns = new DefaultFeignInterceptor();
export {posisiConfig}