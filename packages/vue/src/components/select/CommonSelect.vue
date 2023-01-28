<template>
  <el-select :placeholder="placeholder"
             v-model="selectData"
             :clearable="sClearable"
             :disabled="sDisabled"
             :size="sSize"
             :class="sClass"
             :style="`width: ${sWidth};`"
             @change="methods.change">
    <el-option :key="item[sKeyName ? sKeyName : 'code']"
               :label="item[sLabelName ? sLabelName : 'codeCn']"
               :value="item[sReturnValue ? sReturnValue : 'code']"
               v-for="item in sData"/>
  </el-select>
</template>

<script lang="ts">
import {getCurrentInstance, onMounted, reactive, toRefs, watch} from 'vue'

export default {
  name: "CommonSelect",
  emits: ["change","input"],
  props: {
    value: {
      type: [String, Number],
      required: false,
      default: ""
    },
    sSize: {
      type: String,
      required: false,
      default: 'default'
    },
    sData: {
      type: Array,
      required: true
    },

    placeholder: {
      type: String,
      required: false
    },

    sWidth: {
      type: [String, Number],
      default: '100%'
    },
    sKeyName: {
      type: String,
      required: false
    },
    sLabelName: {
      type: String,
      required: false
    },
    sReturnValue: {
      type: String,
      required: false
    },
    sClass: {
      type: String,
      default: "querySelect"
    },
    sDisabled: {
      type: Boolean,
      default: false
    },
    sClearable: {
      type: Boolean,
      default: true
    }

  },
  setup(props: any) {
    const {proxy} = getCurrentInstance() as any;
    const state = reactive({
      //将传入的 value 在 data 中重新定义赋值，以便子组件改变值（子组件中不能直接修改 props 中的值）
      selectData: proxy.value
    })
    //监听prop变化
    watch(() => props.value,
        (newVal, prevVal) => {
          proxy.selectData = newVal;
        }
    )
    //监听state值变化
    watch(() => state.selectData, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        proxy.$emit("input", state.selectData);
      }
    }, {deep: true})

    const methods = {
      change(event: any) {
        proxy.$emit("change", event);
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

</style>
