// 路由鉴权: 鉴权,项目当中路由能不能被xx的权限的设置(某一个路由在什么条件下可以访问)
import router from "@/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });
// 获取用户相关的小仓库内部token数据，去判断用户是否登录成功
import userUserStore from "./store/modules/user";
import setting from "./setting";
import pinia from "./store";
import { GET_ROLE } from "@/utils/token";
import {
  anyRoute,
  asnycAdminRoute,
  asnycUserRoute,
  constantRoute
} from "@/router/routes";
// import user from "./store/modules/user";
// import store from "./store";
// 定义一个函数，用于将动态添加的路由信息添加到路由器中
function addDynamicRoutes(routes: any) {
  routes.forEach((route: any) => {
    router.addRoute(route);
  });
}

let menuRoutes: any = [];
// 在实例化路由器之前调用 addDynamicRoutes 函数
addDynamicRoutes(menuRoutes);
const userStore = userUserStore(pinia);
// 全局守卫: 项目当中任意路由切换都会触发的钩子
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // document.title = `${setting.title}-${to.meta.title}`;
  document.title = `${setting.title}`;
  NProgress.start();
  // 获取token,去判断用户登录还是未登录
  const token = userStore.token;
  const userRole = GET_ROLE();

  if (userRole == "admin") {
    menuRoutes = [...constantRoute, ...asnycAdminRoute, anyRoute];
  } else if (userRole == "user") {
    menuRoutes = [...constantRoute, ...asnycUserRoute, anyRoute];
  }
  // 用户登录判断
  // 如果有token
  if (token) {
    // 如果有用户状态
    if (userRole) {
      // 如果是管理员
      if (userRole == "admin") {
        userStore.menuRoutes = menuRoutes;
        addDynamicRoutes(menuRoutes);
        // 如果是user
      } else if (userRole == "user") {
        menuRoutes = [...constantRoute, ...asnycUserRoute, anyRoute];
        userStore.menuRoutes = menuRoutes;
        addDynamicRoutes(menuRoutes);
        // console.log(213);
        // 可能是被ban的账号
      } else {
        menuRoutes = [...constantRoute, anyRoute];
        userStore.menuRoutes = menuRoutes;
        addDynamicRoutes(menuRoutes);
      }
      //如果to.matched.length等于0，意味着没有找到匹配到目标路径的路由记录。
      if (to.matched.length == 0) {
        next({ path: to.path });
      } else {
        // 如果to.matched.length不等于0，说明目标路径存在匹配的路由配置，直接执行 next()，允许导航继续进行。
        next();
      }
    } else {
      // 没有用户状态，调用获取用户信息的方法，等待获取后next放行，如果捕捉到异常，那么就跳转到登录页面
      try {
        await userStore.userInfo();
        next({ ...to });
      } catch (e) {
        await userStore.userInfo();
        next({ path: "/login", query: { redirect: to.path } });
      }
    }
  } else {
    // 没有token并且要登录，放行
    if (to.path == "/login" || to.path == "/register") {
      next();
    } else {
      // 没有token想要跳转到其他页面，强制跳转到登录页面
      next({ path: "/login" });
    }
  }
});
// 全局后置守卫
// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.afterEach((to, from) => {
  NProgress.done();
});
