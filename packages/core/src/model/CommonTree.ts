/**
 *
 *@author :<a href="mailto:zuiwoxing@qq.com">liudejian</a>
 *@version :Ver 1.0
 *@date :2020-05-03 21:04:12
 */
export class CommonTree {
    id?: number;
    key!: string;
    pid?: number;
    label?: string;
    url?: string;
	icon?: string;
//	leaf?:boolean;
    checked: boolean = false;
    disabled: boolean = false;
    order: number = 0;
    level: number = 0;
    children: Array<CommonTree> = new Array<CommonTree>();
    params?: Map<string, any>;

}
