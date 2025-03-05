// 引入项目中全部的全局组件
import SvgIcon from "./SvgIcon/index.vue";
import type { App } from "vue";
// 引入ElementUi Plus图标库
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 全局对象
const allGlobalComponent: any = { SvgIcon };
// 对外暴露插件对象
export default {
  // 必须是install方法
  install(app: App) {
    // 注册项目全部的全局组件
    Object.keys(allGlobalComponent).forEach((key: string) => {
      // 注册为全局组件
      app.component(key, allGlobalComponent[key]);
    });
    // 将ElementUi-Plus图标库 注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  }
};
