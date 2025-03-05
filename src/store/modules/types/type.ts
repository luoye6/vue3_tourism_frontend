// 定义小仓库数据state类型
import { RouteRecordRaw } from "vue-router";

export interface UserState {
  token: string | null;
  userName: string | null;
  avatar: string | null;
  buttons: string[];
  menuRoutes: RouteRecordRaw[];
  userRole: string;
  id: number | string;
}
