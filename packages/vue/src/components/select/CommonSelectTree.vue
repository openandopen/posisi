<template>
  <el-select ref="selectTree"
             v-model="selectedLabels"
             :placeholder="cPlaceholder"
             :collapse-tags="false"
             :clearable="true"
             @clear="methods.clearData"
             v-bind="$attrs"
             filterable
             @remove-tag="methods.removeTag">
    <el-option value=""/>
    <el-tree
        ref="treeOption"
        :show-checkbox="this.$attrs.multiple"
        :default-expand-all="true"
        :highlight-current="true"
        :accordion="true"
        node-key="id"
        :check-strictly="cCheckStrictly"
        :default-checked-keys="cDefaultCheckNodes"
        :check-on-click-node="true"
        :data="cTreeData"
        :props="cDefaultProps"
        @node-click="methods.nodeClick"
        @check="methods.checkNodes"
    />
  </el-select>
</template>

<script lang="ts">
import {getCurrentInstance, onMounted, reactive, toRefs} from 'vue'
export default {
  name: 'CommonSelectTree',
  emits:["update:cReturnValue","update:modelValue","nodeClick"],
  props: {
    cPlaceholder: {
      type: String,
      default: () => {
        return '请选择'
      }
    },
    cCheckStrictly: {
      type: Boolean,
      default: false
    },
    // 节点数据
    cTreeData: {
      type: Array, // 必须是树形结构的对象数组
      default: () => {
        return []
      }
    },

    cReturnValue: { //选择的返回单个值
      type: Object, //如果是单选，就返回一个值，如果是多选择就返回一个数组
      default: {}
    },
    // 设置lable value属性
    cDefaultProps: {
      type: Object,
      default: () => {
        return {
          value: 'id', // ID字段名
          label: 'label', // 显示名称
          isLeaf: 'leaf',
          children: 'children' // 子级字段名
        }
      }
    },
    // 默认勾选的节点 // 已经分配的资源
    cDefaultCheckNodes: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  setup(props:any) {
    const {proxy} = getCurrentInstance() as any;
    const state = reactive({
      selectedValues: [],
      selectedLabels: [],
      cacheDatas: []
    });
    // 页面加载时
    onMounted(() => {

    });
   const methods = {
      /**
       * clearable事件
       * */
      clearData() {
        if (proxy.$attrs.multiple) {
          proxy.$emit("update:cReturnValue", [])
          proxy.$emit("update:modelValue", [])
        } else {
          proxy.$emit("update:cReturnValue", "")
          proxy.$emit("update:modelValue", "")
        }
      },
      /**
       * 清空selected
       * */
      clearSelected() {
        if (proxy.$attrs.multiple) {
          proxy.selectedValues.splice(0, proxy.selectedValues.length);
          proxy.selectedLabels.splice(0, proxy.selectedLabels.length);
          proxy.$refs.treeOption.setCheckedKeys([]);
        } else {
          proxy.selectedValues = "";
          proxy.selectedLabels = ""
        }
        proxy.cacheDatas = []
      },
      /**
       * 设置选中节点
       * */
      selectedNode(checkedKeys: any) {
        proxy.$refs.treeOption.setCheckedKeys(checkedKeys);
        checkedKeys = checkedKeys || []
        proxy.selectedValues.splice(0, proxy.selectedValues.length);
        proxy.selectedLabels.splice(0, proxy.selectedLabels.length);
        checkedKeys.forEach((id: any) => {
          proxy.selectedValues.push(id)
        })
        proxy.$nextTick(() => {
          let checkedNodes = proxy.$refs.treeOption.getCheckedNodes() || [];
          proxy.cacheDatas = checkedNodes;
          if (checkedNodes) {
            checkedNodes.forEach((node: any) => {
              proxy.selectedLabels.push(node.label);
            })
          }
          proxy.$emit("update:cReturnValue", proxy.selectedValues)
          proxy.$emit("update:modelValue", proxy.selectedLabels)
        })

      },
      // 删除tag时，
      removeTag(val: any) {

        //  console.log("val=======", val)
        // 取消勾选
        const treeOption = proxy.$refs.treeOption;
        let data = proxy.cacheDatas.find((v:any, i:number, obj:any) => v.label == val);
        if (data) {
          treeOption.setChecked(data.id, false, false)
          proxy.selectedValues.splice(proxy.selectedValues.findIndex((item:any) => item === data.id), 1)
        }
        // 重新给控件赋值
        proxy.$emit("update:modelValue", proxy.selectedLabels)
        proxy.$emit("update:cReturnValue", proxy.selectedValues)
      },
      // 勾选节点，
      checkNodes(curChecked: any, checkedNode: any) {
        console.log(curChecked, "====" + proxy.$attrs.multiple + "======", checkedNode)
        if (proxy.$attrs.multiple) {
          proxy.selectedValues = checkedNode.checkedKeys
          let checkeds = checkedNode.checkedNodes || [];

          //先清空,数组
          proxy.selectedValues.splice(0, proxy.selectedValues.length);
          proxy.selectedLabels.splice(0, proxy.selectedLabels.length);
          //再添加
          checkeds.forEach((ck: any) => {
            // console.log("ck=======", ck)
            proxy.selectedLabels.push(ck.label)
            proxy.selectedValues.push(ck.id)
          })
          const selectTree = proxy.$refs.selectTree
          proxy.cacheDatas = checkeds;

          // console.log("curChecked======", curChecked)
          //  curChecked.value = curChecked.id
          //  curChecked.currentLabel = curChecked.label
          // 给selectTree的cachedOptions赋值 设置node.label，使用页面显示label值
          //  console.log("selectTree=======", selectTree)
          // console.log("selectTree.cachedOptions=======", selectTree.options)
          // selectTree.options.set(curChecked.id,{key:curChecked.id,value:curChecked});
          // selectTree.handleOptionSelect(curChecked, true)
          //  console.log("proxy.selectedValues=======", proxy.selectedValues)
          proxy.$emit("update:modelValue", proxy.selectedLabels)
          proxy.$emit("update:cReturnValue", proxy.selectedValues)
        //  console.log("selectedLabels=========", proxy.selectedLabels)
         // console.log("selectedValues=========", proxy.selectedValues)
        }
      },


      /**
       * 点击节点
       * @param nodeData
       * @param node
       * @param vnode
       */
      nodeClick(nodeData: any, node: any, vnode: any) {
        //console.log(proxy.$attrs.multiple)
        if (!proxy.$attrs.multiple) {
          // console.log(nodeData)
          // 输入框赋值
          //   proxy.selectedValues = nodeData.label
          //   console.log(proxy.selectedValues)
          let labelMpName = props.cDefaultProps.label;
          let idMpName =  props.cDefaultProps.value;
          // 隐藏下拉框
          proxy.selectedValues = nodeData[idMpName];
          proxy.selectedLabels = nodeData[labelMpName];
          proxy.$emit("update:cReturnValue", proxy.selectedValues)
          proxy.$emit("update:modelValue", proxy.selectedLabels)
          proxy.$refs['selectTree'].blur()
          proxy.$emit("nodeClick", nodeData)

        }
      }
    }
    return {
      methods,
      ...toRefs(state)
    }
  },

}
</script>

<style scoped>
/* 去除tree上面的一行高度 */
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  padding: 0;
}

</style>

<style scoped>

</style>
