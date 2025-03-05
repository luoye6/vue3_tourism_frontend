//统一管理咱们项目用户相关的接口

import request  from "@/utils/request";
import type {
  loginFormData,
  loginResponseData,
  UserData,
  userInfoResponseData,
  userSignInfoResponseData
} from "./type";
import { userAvatarAndUserAccount } from "./type";

// 项目用户相关的请求地址
enum API {
  LOGIN_URL = "/user/login",
  REGISTER_URL = "/user/register",
  USERINFO_URL = "/user/get/",
  LOGOUT_URL = "/user/logout",
  SIGN_URL = "/user/sign_everyday/",
  UPDATE_CERTIFICATE_URL = "/user/update/certificate/",
  UPLOAD_IMAGE_URL = "/user/upload/images",
  UPDATE_IMAGE_USERACCOUNT_URL = "/user/update/image_useraccount",
  EMAIL_REGISTER_URL = "/email/register",
  EMAIL_VERIFY_URL = "/email/register_verify"
}

// 登录接口 第二个类型是约束返回类型
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);
// 获取用户信息
export const reqUserInfo = (id: number) =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL + id);
// 退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL);
// 用户每日登录接口
export const reqSignEveryDay = (id: number) =>
  request.get<any, userSignInfoResponseData>(API.SIGN_URL + id);
// 更新凭证的接口
export const reqUpdateCertificate = (id: number) =>
  request.get<any, loginResponseData>(API.UPDATE_CERTIFICATE_URL + id);
// 上传头像的接口
export const reqUploadImage = (imageFile: any) =>
  request.post<any, any>(API.UPLOAD_IMAGE_URL, imageFile, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
// 更新用户名和头像的接口
export const reqUpdateImageAndUserAccount = (
  updateForm: userAvatarAndUserAccount
) => request.post<any, UserData>(API.UPDATE_IMAGE_USERACCOUNT_URL, updateForm);
// 邮箱发送验证码的接口
export const reqEmailRegister = (mail: string) =>
  request.post<any, any>(API.EMAIL_REGISTER_URL, {
    email: mail
  });
// 验证码验证是否正确OR过期的接口
export const reqVerifyEmailCode = (qq: string, code: string) =>
  request.post<any, any>(API.EMAIL_VERIFY_URL, {
    qq,
    code
  });
// 注册用户的接口
export const reqUserRegister = (registerForm: any) =>
  request.post<any, any>(API.REGISTER_URL, registerForm);
