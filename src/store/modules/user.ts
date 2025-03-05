//创建用户相关的小仓库

import { defineStore } from "pinia";
//引入接口
import type { loginFormData } from "@/api/user/type";
import type { UserState } from "./types/type";
//引入操作本地存储的工具方法
import {
  GET_ROLE,
  GET_TOKEN,
  REMOVE_TOKEN,
  SET_AVATAR,
  SET_ID,
  SET_ROLE,
  SET_TOKEN,
  SET_USER_NAME
} from "@/utils/token";
//引入路由(常量路由)
import {
  anyRoute,
  asnycAdminRoute,
  asnycUserRoute,
  constantRoute
} from "@/router/routes";
import router from "@/router";
import { userLoginUsingPost } from "@/api/userController";

//创建用户小仓库
const useUserStore = defineStore("User", {
  //小仓库存储数据地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      userName: "",
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组(路由)
      avatar: "",
      //存储当前用户是否包含某一个按钮
      buttons: [],
      userRole: "",
      id: ""
    };
  },
  //异步|逻辑的地方
  actions: {
    //用户登录的方法
    async userLogin(data: loginFormData) {
      //登录请求
      const result: any = await userLoginUsingPost(data);
      //登录请求:成功200->token
      //登录请求:失败201->登录失败错误的信息
      if (result.code == 200) {
        // console.log(result);
        this.userName = result.data.userName;
        this.userRole = result.data.userRole;
        this.avatar = result.data.userAvatar;
        if (this.userRole == "admin") {
          this.menuRoutes = [...constantRoute, ...asnycAdminRoute, anyRoute];
        } else if (this.userRole == "user") {
          this.menuRoutes = [...constantRoute, ...asnycUserRoute, anyRoute];
        }
        //pinia仓库存储一下token
        //由于pinia|vuex存储数据其实利用js对象
        this.token = result.hashMap.token as string;
        //本地存储持久化存储一份
        SET_TOKEN(result.hashMap.token as string);
        // 本地存储用户id
        SET_ID(result.data.id as string);
        // 本地存储用户角色
        SET_ROLE(this.userRole);
        // 本地存储用户头像
        SET_AVATAR(result.data.userAvatar as string);
        // 本地存储用户昵称
        SET_USER_NAME(result.data.userName);
        //能保证当前async函数返回一个成功的promise
        return "ok";
      } else {
        return Promise.reject(new Error(result.data as any));
      }
    },
    //获取用户信息方法
    async userInfo() {
      //获取用户信息进行存储仓库当中[用户头像、名字]
      // const id = GET_ID();
      // const userId = parseInt(id as string);
      const userRole = GET_ROLE();
      // await reqUserInfo(userId);
      if (userRole == "admin") {
        this.menuRoutes = [...constantRoute, ...asnycAdminRoute, anyRoute];
      } else if (userRole == "user") {
        this.menuRoutes = [...constantRoute, ...asnycUserRoute, anyRoute];
      } else {
        this.menuRoutes = [...constantRoute, anyRoute];
      }
      this.menuRoutes.forEach((route: any) => {
        router.addRoute(route);
      });
    },
    //退出登录
    async userLogout() {
      //退出登录请求
      //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
      this.token = "";
      this.userName = "";
      REMOVE_TOKEN();
      return "ok";
    },
    // 更新头像的方法
    async updateAvatar(newAvatar: string) {
      this.avatar = newAvatar;
      SET_AVATAR(newAvatar); // 同步更新本地存储
    }
  },
  getters: {}
});
//对外暴露获取小仓库方法
export default useUserStore;
