import 'element-plus/lib/theme-chalk/index.css'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import {
  ElButton,
  ElCard,
  ElCheckbox,
  ElCol,
  ElContainer,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElPagination,
  ElRadio,
  ElRadioGroup,
  ElRow,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElUpload,
  ElMessage,
  ElMessageBox,
  ElHeader,
  ElAside,
  locale,
  ElOption
} from 'element-plus'

const components = [
  ElButton,
  ElCard,
  ElCheckbox,
  ElCol,
  ElContainer,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElPagination,
  ElRadio,
  ElRadioGroup,
  ElRow,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElUpload,
  ElHeader,
  ElAside,
  ElOption
]

locale(lang)
const plugins = [ElMessage, ElMessageBox]

export default (app: any) => {
  components.forEach(component => {
    app.component(component.name, component)
  })

  plugins.forEach(plugin => {
    app.use(plugin)
  })
}
