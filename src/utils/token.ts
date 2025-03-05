// 封装本地存储数据与读取数据的方法

export const SET_TOKEN = (token: string) => {
  localStorage.setItem("TOKEN", token);
};
export const GET_TOKEN = () => {
  return localStorage.getItem("TOKEN");
};
export const REMOVE_TOKEN = () => {
  return localStorage.removeItem("TOKEN");
};
export const SET_ID = (id: string) => {
  localStorage.setItem("id", id);
};
export const GET_ID = () => {
  return localStorage.getItem("id");
};
export const SET_ROLE = (role: string) => {
  localStorage.setItem("role", role);
};
export const GET_ROLE = () => {
  return localStorage.getItem("role");
};
export const SET_AVATAR = (avatar: string) => {
  localStorage.setItem("avatar", avatar);
};
export const GET_AVATAR = () => {
  return localStorage.getItem("avatar") ?? "";
};
export const SET_USER_NAME = (userName: string) => {
  localStorage.setItem("userName", userName);
};
export const GET_USER_NAME = () => {
  return localStorage.getItem("userName") ?? "";
};
