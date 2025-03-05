// 登录接口需要携带参数ts类型
export interface loginFormData {
  userAccount: string;
  userPassword: string;
}

// 定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface UserData {
  id: number | string;
  userName: string | null;
  userAccount: string;
  userAvatar: string | null;
  gender: number;
  userRole: string;
  userPassword: string;
  accessKey: string;
  secretKey: string;
  invitationCode: string | null;
  email: string | null;
  balance: number | null;
  createTime: string;
  updateTime: string;
  isDelete: 0;
  tokenValue: string;
}

// 定义登陆接口返回数据类型
export interface loginResponseData extends ResponseData {
  code: number;
  data: UserData;
  message: string;
  hashMap: any;
}

// 定义获取用户信息返回数据类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[];
    buttons: string[];
    roles: string[];
    name: string;
    avatar: string;
  };
}

// 定义用户签到数据类型
export interface userSignInfo {
  id: number | null;
  userId: number | null;
  signDate: string | null;
  isDelete: number | null;
  createTime: string | null;
  updateTime: string | null;
}

// 定义用户签到数据返回类型
export interface userSignInfoResponseData extends ResponseData {
  code: number;
  data: userSignInfo;
  message: string;
}

// 定义更新用户名和头像的类型
export interface userAvatarAndUserAccount {
  id: number | null;
  userAvatar: string | null;
  userAccount: string | null;
}
