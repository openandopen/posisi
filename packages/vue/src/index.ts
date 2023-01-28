export {VueEleResponse} from "./feign/model/VueEleResponse"
import CommonSelect from "./components/select/CommonSelect.vue";
import CommonSelectTree from "./components/select/CommonSelectTree.vue";
import CommonTable from "./components/table/CommonTable.vue";
const components = [
    CommonSelect,
    CommonSelectTree,
    CommonTable,
]

const install = function(Vue:any) {
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}
// @ts-ignore
if (typeof window !== "undefined" && window.Vue) {
    // @ts-ignore
    install(window.Vue)
}
export default { ...components,install}
