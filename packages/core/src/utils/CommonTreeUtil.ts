/**
 *@desc 通用树
 *@author liudejian
 *@date 2020-07-03 16:03
 **/
import {CommonTree} from "../model/CommonTree";

export   class CommonTreeUtil {

    /**
     * 将分类转为树结构
     * @param categorys
     * @param checkedIds
     * @param maxLevel
     */
    public static convertToTree(treeBos: Array<CommonTree>, checkedIds: Array<number>, maxLevel: number): Array<CommonTree> {
        let results = new Array<CommonTree>();
        if (treeBos) {
            //第一步：将所有层级初始化空对应放入List
            let levelMap = new Map<number, Array<CommonTree>>();
            for (let i = 0; i <= maxLevel; i++) {
                levelMap.set(i, new Array<CommonTree>());
            }
            let checkMaps = new Map<number, boolean>();
            if (checkedIds) {
                checkedIds.forEach((checkedId => {
                    checkMaps.set(checkedId, true);
                }))
            }
            //第二步：遍历所有子节点数据，取得根节点集合数据并且将数据按层级归类。
            treeBos.forEach(source => {
                let commonTree = new CommonTree();
                commonTree.level = source.level;
                commonTree.key = source.key;
                commonTree.id = source.id;
                commonTree.pid = source.pid;
                commonTree.label = source.label;
                commonTree.order = source.order;
              //  commonTree.leaf = source.leaf;
                commonTree.url = source.url;
                commonTree.params = source.params;
                if (checkMaps.get(commonTree.id || 0)) {
                    commonTree.checked = true
                }
                if (commonTree.level >= maxLevel) {
                    return;
                }
                if (commonTree.level <= 0) {
                    results.push(commonTree);
                }
                let tempList = levelMap.get(commonTree.level);
                if (tempList != null) {
                    tempList.push(commonTree);
                    levelMap.set(commonTree.level,tempList);
                }
            })

             //第三步: 根据层级倒序遍历，设置子节点
            for (let n = maxLevel; n > 0; n--) {
                //子节点
                let childList = levelMap.get(n);
                 let parentList = null;
                if (n - 1 >= 0) {
                    //父节点
                    parentList = levelMap.get(n - 1);
                } else {
                    //父节点
                    parentList = results;
                }
                if (parentList != null && parentList.length > 0
                    && childList != null && childList.length > 0) {
                    for (let parent of parentList) {
                        let id = parent.id;
                        for (let child of childList) {
                            if (child.pid != null && child.pid == id) {
                                 parent.children?.push(child);
                            }
                        }
                        //为空才设置
                    /*    if (parent.leaf == null || parent.leaf == undefined) {
                            if (parent.children == undefined || parent.children.length == 0) {
                                parent.leaf = (true);
                            } else {
                                parent.leaf = (false);
                            }
                        }*/
                    }
                }
            }
        }
        return results;
    }


    /**
     * 排序
     * @param rts
     */
    public static sortTree(rts: Array<CommonTree>) {
        if (rts) {
            rts.sort((o1: CommonTree, o2: CommonTree) => {
                if (o1.order == null) {
                    o1.order = 0;
                }
                if (o2.order == null) {
                    o2.order = 0;
                }
                return o1.order - o2.order;
            })

            for(let rt of rts) {
                let childs = rt.children || [];
                if (childs && childs.length > 0) {
                 //   rt.leaf = true;
                    rt.children = [];
                } else {
                   // rt.leaf = false;
                }
                this.sortTree(childs);
            }
        }
    }


}
