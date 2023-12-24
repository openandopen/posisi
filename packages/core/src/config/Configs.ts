import {PosisiConfig} from "@/config/PosisiConfig";
import {DefaultFeignDecode} from "@/feign/decode/DefaultFeignDecode";


const posisiConfig = new PosisiConfig();
posisiConfig.userDecode = DefaultFeignDecode;
export {posisiConfig}