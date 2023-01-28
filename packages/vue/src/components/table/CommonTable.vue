<!--
@description: 通用表格组件
@author:      liudejian
@date:       2019-08-11
-->
<template>
  <ElConfigProvider :locale="locale">
    <div :style="`${'background-color:#f1f2f3;'+cTableCss}`">
      <el-card ref="headerCard" shadow="hover"
               :style="`${'padding-bottom: 5px;'+cHeaderCardCss}`"
               v-if="cEnableCardHeader">
        <div :style="`${cHeaderCss}`" v-if="cEnableHeader">
          <slot name="header"></slot>
        </div>
        <div :style="`${'margin-top: 10px;'+cToolBarCss}`" v-if="cEnableToolBar">
          <el-row>
            <el-col :span="22">
              <slot name="toolbar"></slot>
            </el-col>
            <el-col :span="2">
              <div style="margin-left: 5px;cursor: pointer;" @click="methods.toggleAdvanced">
                <el-tooltip class="item" effect="dark" transition="none" content="展开筛选条件" placement="top">
                  <el-image v-show="!cAdvanced" :src="icon.expand" alt=""></el-image>
                </el-tooltip>

                <el-tooltip class="item" effect="dark" transition="none" content="收起" placement="top">
                  <el-image v-show="cAdvanced" :src="icon.packup" alt=""></el-image>
                </el-tooltip>
              </div>
            </el-col>
          </el-row>


        </div>
      </el-card>
      <el-card ref="tableCard" class="box-card" shadow="hover" style="margin-top: 5px;">
        <div style="margin-top: -20px;margin-left: -20px;margin-right: -20px;">
          <el-row :gutter="cGutter">
            <el-col :span="cTableLeftWidth">
              <el-table ref="commonTable" :data="cDatas" :size="density"
                        v-if="showTable" v-bind="cOptions" :fit="true"
                        border
                        :height="`${cTableHeight === -1 ? tableHeight : cTableHeight}`"
                        :highlight-current-row="true"
                        @selection-change="methods.selectChange"
                        @row-click="methods.rowClick"
                        @row-dblclick="methods.rowDbClick">
                <el-table-column v-if="cEnableCheckbox" type="selection" width="50" align="center"/>
                <el-table-column v-if="cEnableSerialNum" align="center" fixed="left" label="序号" type="index"
                                 width="50"/>
                <el-table-column v-for="(col,index) in tableColumns"
                                 :label="col.label"
                                 :prop="col.prop"
                                 :resizable="col.resizable ? col.resizable : true"
                                 :show-overflow-tooltip="col.overflowTip ? col.overflowTip : true"
                                 :align="col.align ? col.align : 'left'"
                                 :header-align="col.headerAlign ? col.headerAlign : 'center'"
                                 v-bind:key="index"
                                 :sortable="col.sortable ? col.sortable : false"
                                 :width="col.width ? col.width : 'auto'"
                                 :min-width="col.minWidth ? col.minWidth : '80'"
                                 :fixed="col.fixed ? col.fixed : false"
                                 :formatter="col.formatter ? col.formatter : (row,col,cellvalue,index)=>{return cellvalue;}">
                  <template #default="scope">
                           <span v-if="col.templates && Array.isArray(col.templates)">
                               <span style="padding-right: 3px;" v-for="(temp,index) in col.templates"
                                     v-bind:key="`_${index}`">
                                   <el-button v-if="temp.component === 'el-button'"
                                              :size="temp.size ? temp.size : 'small'"
                                              :type="temp.type"
                                              :icon="temp.icon"
                                              style="margin-left: 3px;"
                                              :text="temp.isText ? temp.isText : false"
                                              :link="temp.isLink ? temp.isLink : false"
                                              :bg="temp.isBg ? temp.isBg : false"
                                              :auto-insert-space="temp.autoSpace ? temp.autoSpace : false"
                                              v-show="btnShowRule(scope.row,temp.showRule)"
                                              @click="methods.clickHandle(temp.rowHandle,scope.row)">
                                       {{ temp.text }}
                                   </el-button>
                                   <el-link v-if="temp.component === 'el-link'" :type="temp.type"
                                            @click="methods.clickHandle(temp.rowHandle,scope.row)"
                                            :target="temp.target">
                                        {{
                                       scope.row[scope.column.property] ? scope.row[scope.column.property] : temp.text
                                     }}
                                   </el-link>
                                   <el-image v-else-if="temp.component === 'el-image' && temp.baseUrl !=''"
                                             :style="temp.style"
                                             fit="cover"
                                             :preview-teleported="true"
                                             :src="`${temp.baseUrl}/${scope.row[scope.column.property]}`"
                                             :preview-src-list="temp.previewSrcList ? temp.previewSrcList : [`${temp.baseUrl ? temp.baseUrl: ''}/${scope.row[scope.column.property]}`]">
                                   </el-image>
                                    <el-image v-else-if="temp.component === 'el-images' && temp.baseUrl !=''"
                                              :style="temp.style"
                                              fit="cover"
                                              :preview-teleported="true"
                                              :src="`${temp.baseUrl}/${scope.row[scope.column.property][0]}`"
                                              :preview-src-list="temp.previewSrcList ? temp.previewSrcList : [`${temp.baseUrl ? temp.baseUrl: ''}/${scope.row[scope.column.property][0]}`]">
                                   </el-image>
                                   <el-image v-else-if="temp.component === 'el-image' && temp.baseUrl ==''"
                                             :style="temp.style"
                                             fit="cover"
                                             :preview-teleported="true"
                                             :src="`${scope.row[scope.column.property]}`"
                                             :preview-src-list="temp.previewSrcList ? temp.previewSrcList : [`${scope.row[scope.column.property]}`]">
                                   </el-image>
                                   <el-input v-else-if="temp.component === 'el-input'"
                                             :type="temp.type ? temp.type : 'text'" :style="temp.style"
                                             :placeholder="temp.placeholder ? temp.placeholder: ''"
                                             v-model="scope.row[scope.column.property]"
                                             :show-password="temp.showPassword ? false : temp.showPassword"
                                             :disabled="temp.disabled ? temp.disabled : false"
                                             :key="`inp_${index}`"
                                             :clearable="temp.clearable ? true : false"
                                             :autofocus="true"
                                             :maxlength="temp.maxlength ? temp.maxlength : ''"
                                             :show-word-limit="temp.showWordLimit ? temp.showWordLimit : false"
                                             :size="temp.size ? temp.size: 'small'">
                                   </el-input>
                                   <el-input-number v-else-if="temp.component === 'el-input-number'"
                                                    :style="temp.style"
                                                    :placeholder="temp.placeholder ? temp.placeholder: ''"
                                                    v-model="scope.row[scope.column.property]"
                                                    :disabled="temp.disabled ? temp.disabled : false"
                                                    :key="`inp_${index}`"
                                                    :clearable="temp.clearable ? true : false"
                                                    :autofocus="true"
                                                    :size="temp.size ? temp.size: 'small'">
                                   </el-input-number>
                                   <el-select v-else-if="temp.component === 'el-select'"
                                              v-model="scope.row[scope.column.property]"
                                              :clearable="temp.clearable ? true : false"
                                              :style="temp.style"
                                              :placeholder="temp.placeholder">
                                       <el-option v-for="item in temp.options"
                                                  :key="item[temp.keyName]"
                                                  :value="item[temp.keyName]"
                                                  :label="item[temp.labelName]">
                                       </el-option>
                                   </el-select>
                                   <el-dropdown v-else-if="temp.component === 'el-dropdown'"
                                                :style="temp.style"
                                                @command="methods.handleDropdown($event,scope.row)">
                                       <span class="el-dropdown-link">
                                            <el-button type="primary">
                                              {{ temp.text }}<i class="el-icon-arrow-down el-icon--right"></i>
                                            </el-button>
                                        </span>
                                      <template #dropdown>
                                        <el-dropdown-menu slot="dropdown">
                                          <el-dropdown-item v-for="item in temp.dropdowns"
                                                            :command="item.command">{{ item.text }}</el-dropdown-item>
                                       </el-dropdown-menu>
                                      </template>
                                   </el-dropdown>
                                    <el-switch v-else-if="temp.component === 'el-switch'"
                                               v-model="scope.row[scope.column.property]"
                                               :inline-prompt="temp.inlinePrompt"
                                               :active-value="temp.activeValue"
                                               :inactive-value="temp.inactiveValue"
                                               :active-text="temp.activeText"
                                               :inactive-text="temp.inactiveText"
                                               @change="methods.handleChange($event,scope.row)">
                                     </el-switch>
                                 <!--用户自定义组件-->
                                 			<div v-else-if="temp.component === 'v-html'" style="height: 10px;text-align: center;padding-top: 5px;">
                                         <div  v-html="userDefined(scope.row, scope.column, temp.callback)"></div>
                                      </div>
                               </span>
                          </span>
                    <span v-else>
                {{
                        col.formatter ? col.formatter(scope.row, scope.column, scope.row[col.prop], scope.$index) : scope.row[col.prop]
                      }}
             </span>
                  </template>

                </el-table-column>
              </el-table>
              <div style="float: right;margin-bottom: 10px;" v-if="cPagination">
                <el-pagination
                    @current-change="methods.pageCurrentChange"
                    @size-change="methods.pageSizeChange"
                    :total="cTotal"
                    v-bind="cPagination">
                </el-pagination>
              </div>
              <div>
                <slot name="footer"></slot>
              </div>
            </el-col>
            <el-col :span="cTableRightWidth">
              <slot name="tableRight"></slot>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
  </ElConfigProvider>
</template>

<script lang="ts">
import {ElConfigProvider} from 'element-plus';
import {getCurrentInstance, ref, defineComponent, reactive, toRefs, onMounted} from 'vue';
import zhLocale from 'element-plus/lib/locale/lang/zh-cn';
import common from "./common";
import expand from "../../assets/images/expand.png";
import packup from "../../assets/images/packup.png";
import  CommonEmit  from "./CommonEmit";



export default defineComponent({
  name: "CommonTable",
  emits: CommonEmit.getRegisterEmits(),
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  mixins: [common],
  props: {
    cRowStyle: {
      type: Function,
      default: function (row: any, rowIndex: number) {
        /* if (proxy.currentRowId === row.id) {
           return {
             'background-color': 'rgb(94, 180, 251)',
             'color': 'rgb(255, 255, 255)'
           }
         }*/
        return "";
      }
    },
    cGutter: {
      type: Number,
      default: 5
    },
    cTableCss: {
      type: String,
      default: ""
    },
    cTableRealCss: {
      type: String,
      default: ""
    },
    cHeaderCardCss: {
      type: String,
      default: ""
    },
    cHeaderCss: {
      type: String,
      default: ""
    },
    cToolBarCss: {
      type: String,
      default: ""
    },
    //  表格头部卡片是否开启
    cEnableCardHeader: {
      type: Boolean,
      default: true
    },
    cEnableHeader: {
      type: Boolean,
      default: true
    },
    cEnableToolBar: {
      type: Boolean,
      default: true
    },
    cEnableTool: {
      type: Boolean,
      default: true
    },
    cTableHeight: {
      type: Number,
      default: -1
    },
    cTableLeftWidth: {
      type: Number,
      default: 24
    },
    cTableRightWidth: {
      type: Number,
      default: 0
    },
    // 列名
    cColumns: {
      type: Array,
      required: true
    },
    //  数据
    cDatas: {
      type: Array,
      required: true
    },
    //  页码
    cTotal: {
      type: Number,
      required: true,
      default: 0
    },
    cTopFixedHight: {
      type: Number,
      required: false,
      default: 0
    },
    cStripe: {
      type: Boolean,
      default: true
    },
    cEnableCheckbox: {
      type: Boolean,
      default: true
    },
    cEnableAutoHeight: {
      type: Boolean,
      default: true
    },
    cEnableSerialNum: {
      type: Boolean,
      default: true
    },
    cBody: {
      type: Boolean,
      default: false
    },
    //  筛选默认折叠展开
    cAdvanced: {
      type: Boolean,
      default: true
    },
    //  筛选图标显示隐藏
    cShowFilter: {
      type: Boolean,
      default: true
    },
    cPagination: {
      type: Object,
      default: function () {
        return {
          currentPage: 1,
          pageSize: 10,
          prevText: "上一页",
          nextText: "下一页",
          pageSizes: [5, 10, 20, 30, 40, 50, 100],
          layout: 'total, sizes, prev, pager, next, jumper'
        }
      }
    },
    cOptions: {
      type: Object,
      default: function () {
        return {
          width: '100%',
          height: 350,
          border: true,
          stripe: true,
          size: 'small',
          fit: true
        }
      }
    }
  },
  setup(props: any, context: any) {
    const {proxy} = getCurrentInstance() as any;

    const state = reactive({
      icon: {
        packup: packup,
        expand: expand
      },
      currentRowId: 0,
      tableHeight: 400,
      tableColumns: [],

      showTable: true,
      isFullscreen: false,
      density: 'small'
    });

    const methods = {
      /**
       * 自动视频table高度
       * */
      autoAdapterTableHeight() {
        let flag = false;
        proxy.methods.autoTableHeight();
        window.onresize = function () {
          if (!flag) {
            flag = true;
            proxy.methods.autoTableHeight(() => {
              flag = false;
            })
          }
        }
      },
      /**
       * 自动设置table高度
       * */
      autoTableHeight(callback: any) {

        //顶部工具高度
        let fixedHeaderHeight = 100;
        //分页工具条高度
        let pageToolBarHeight = 40;
        let headerMarginTop = 20;
        //头高度
        let headerCardOffsetTop = 0
        if (proxy.$refs.headerCard && proxy.$refs.headerCard.$el) {
          headerCardOffsetTop = proxy.$refs.headerCard.$el.offsetTop;
        }
        if (headerCardOffsetTop == 0) {
          fixedHeaderHeight = 0;
        }
        // let headerDiv = window.getComputedStyle(proxy.$refs.headerCard.$el);
        // console.log(proxy.$refs.headerCard,"================",headerDiv)
        //获取实际高度
        //  let headerHeight = headerDiv.getPropertyValue('height').replaceAll(/[a-zA-Z]/g,'');
        // let headerCardHeight = parseInt(headerHeight);
        //获取客户端高度
        //table到内部页面顶点高度
        let tableCardOffsetTop = 0;
        if (proxy.$refs.tableCard && proxy.$refs.tableCard.$el) {
          tableCardOffsetTop = proxy.$refs.tableCard.$el.offsetTop;
        }
        proxy.$nextTick(() => {
          setTimeout(() => {
            //注意这个高度应该放到nextTick里面来获取,后缀前后不一致
            let headerCardClientHeight = 100
            if (proxy.$refs.headerCard && proxy.$refs.headerCard.$el) {
              headerCardClientHeight = proxy.$refs.headerCard.$el.clientHeight;
            }
            //未启用表头
            if (!proxy.cEnableCardHeader) {
              proxy.tableHeight = window.innerHeight - pageToolBarHeight - proxy.cTopFixedHight;
              // alert("11="+ proxy.tableHeight)
            } else {
              fixedHeaderHeight = 100
              //console.log(window.innerHeight, headerMarginTop, fixedHeaderHeight, headerCardClientHeight, pageToolBarHeight)
              proxy.tableHeight = window.innerHeight - headerMarginTop - fixedHeaderHeight - headerCardClientHeight - pageToolBarHeight - proxy.cTopFixedHight;
              // alert("12="+ proxy.tableHeight)
            }
            proxy.mittBus.emit("commonTableHeight", proxy.tableHeight)
            if (callback) {
              callback(proxy.tableHeight);
            }
          }, 500)
        });
      },


      selectChange(selectedRows: any) {
        proxy.$emit("selectChange", selectedRows)
      },
      rowClick(row: any, column: any) {
        proxy.$emit("rowClick", row, column)
        if (proxy.currentRowId === row.id) {
          return
        }
        proxy.currentRowId = row.id
      },
      rowDbClick(row: any, column: any) {
        proxy.$emit("rowDbClick", row, column)
        if (proxy.currentRowId === row.id) {
          return
        }
        proxy.currentRowId = row.id
      },
      clickHandle(handleName: any, value: any) {
        proxy.$emit(handleName, value);
      },
      handleChange(val: any, value: any) {
        proxy.$emit("change", val, value);
      },


      /**
       * 点击下拉
       * */
      handleDropdown(command: string, record: any) {
        proxy.$emit(command, record)
      },
      /**
       * 刷新table重新渲染
       */
      refreshTable() {
        proxy.showTable = false
        proxy.$nextTick(() => {
          proxy.showTable = true;
        })
      },
      /**
       * 折叠收齐(同步数据)
       */
      toggleAdvanced() {
        let result = !proxy.cAdvanced;
        proxy.$emit("update:c-advanced", result);
        proxy.methods.autoTableHeight();
      },

      /**
       * 分页当前页变化
       * */
      pageCurrentChange: function (currentPage: number) {
        proxy.cPagination.currentPage = currentPage
        let startIndex = proxy.cPagination.pageSize * (currentPage - 1)
        if (startIndex < 0) {
          startIndex = 0
        }
        proxy.$emit("query", startIndex, proxy.cPagination.pageSize)
      },
      /**
       * 分页size变化
       * */
      pageSizeChange: function (pageSize: number) {
        proxy.cPagination.pageSize = pageSize
        proxy.$emit("query", 0, proxy.cPagination.pageSize)
      },
    }

    onMounted(() => {
      proxy.cColumns.forEach((col: any, index: number) => {
        proxy.tableColumns.push(col);
      })
      if (proxy.cEnableAutoHeight) {
        setTimeout(() => {
          proxy.methods.autoAdapterTableHeight();
        }, 500)
      }

    })
    const locale = ref(zhLocale);
    return {
      locale,
      methods,
      ...toRefs(state)
    };
  },

})
</script>

<style scoped>

::v-deep(.el-table__header) {
  height: 50px;
  font-size: 13px;
  font-family: "Courier New";
  background-color: #d3dce6;
  font-weight: bold;
}

</style>
