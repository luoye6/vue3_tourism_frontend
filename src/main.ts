import { createApp } from "vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import App from "./App.vue";
import "@/styles/index.scss";
import router from "./router";
import pinia from "./store";
import "./permission.ts";
import "element-plus/theme-chalk/dark/css-vars.css";
import gloablComponent from "@/components/index";
import "@/assets/fonts/iconfont.css";

const app = createApp(App);
import useUserStore from "@/store/modules/user";
import useLayOutSettingStore from "@/store/modules/setting"; // 引入 layout 相关配置

const userStore = useUserStore();
userStore.userInfo();

const layoutStore = useLayOutSettingStore();

// **判断是否是手机端**
const checkMobile = () => {
  layoutStore.fold = window.innerWidth < 768; // 小于 768px 认为是手机
};

// **监听窗口大小变化**
window.addEventListener("resize", checkMobile);

// **初始化时检查**
checkMobile();

// 使用 ElementPlus 组件库
app.use(ElementPlus, {
  locale: zhCn
});

// 注册全局组件
app.use(gloablComponent);

// 使用路由
app.use(router);

// 安装仓库
app.use(pinia);

app.mount("#app");
