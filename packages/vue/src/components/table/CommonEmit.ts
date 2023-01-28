/**
 *@desc
 *@author liudejian
 *@date 2022-04-22 17:06
 **/
const emitsInit = ["selectChange","update:c-advanced", "change","auth", "remove", "query", "edit", "rowClick", "rowDbClick"]
export default  class CommonEmit {

    public static registerEmit(...emitNames:string[]) {
        emitNames.forEach((em:any)=>{
            emitsInit.push(em);
        })
    }

    public static getRegisterEmits(): any[] {
        return emitsInit;
    }

    public static deleteEmit(emitName:string) {
        emitsInit.forEach((value,index)=>{
             if (value === emitName) {
                 emitsInit.splice(index,1);
             }
        })
    }

}
