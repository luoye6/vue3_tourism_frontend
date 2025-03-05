//统一管理咱们项目用户相关的接口

import request from "@/utils/request";
import {
  addInterfaceInfoData,
  addInterfaceResponse,
  getInterfaceInfoResponseDataById,
  getInterfaceResponseData,
  getTopInterfaceResponse,
  InterfaceParamVO,
  invokeInterfaceResponseById,
  onlineInterfaceResponse,
  PageRequest,
  updateInterfaceResponse
} from "@/api/interface/type";

// 项目用户相关的请求地址
enum API {
  // 获取接口列表
  INTERFACE_INFO_LIST_URL = "/interfaceInfo/list/page",
  // 根据id获取接口
  INTERFACE_INFO_ID_URL = "/interfaceInfo/get",
  // 调用接口
  INTERFACE_INFO_INVOKE_URL = "/interfaceInfo/invoke1",
  // 发布接口
  INTERFACE_INFO_ONLINE_URL = "/interfaceInfo/online",
  // 下线接口
  INTERFACE_INFO_OFFLINE_URL = "/interfaceInfo/offline",
  // 根据id删除接口(逻辑删除)
  INTERFACE_INFO_DELETE_URL = "/interfaceInfo/delete",
  // 根据查询条件获取列表
  // INTERFACE_INFO_LIST_SEARCH_URL = "/interfaceInfo/list",
  // 新建接口的地址
  INTERFACE_INFO_ADD_URL = "/interfaceInfo/add",
  // 更新接口的地址
  INTERFACE_INFO_UPDATE_URL = "/interfaceInfo/update",
  // 获取接口次数调用最多的三个接口
  INTERFACE_INFO_TOP_URL = "/analysis/top/interface/invoke",
  // 根据接口id获取每个接口的特定的参数
  INTERFACE_INFO_PARAMS_URL = "/interfaceInfo/get/interface_params",
  // 根据excel文件生成可视化图表
  INTERFACE_INFO_STATISTICS_URL = "/interfaceInfo/statistics"
}

// 获取接口列表 第二个类型是约束返回类型
export const reqInterfaceInfoList = (data: PageRequest) =>
  request.get<any, getInterfaceResponseData>(API.INTERFACE_INFO_LIST_URL, {
    params: data
  });
// 根据id获取接口信息
export const reqInterfaceInfoById = (id: number) =>
  request.get<any, getInterfaceInfoResponseDataById>(
    API.INTERFACE_INFO_ID_URL,
    {
      params: {
        id
      }
    }
  );
// 调用接口
export const invokeInterfaceById = (
  id: number,
  params: string,
  userId: number
) =>
  request.post<any, invokeInterfaceResponseById>(
    API.INTERFACE_INFO_INVOKE_URL,
    { id, userRequestParams: params, userId }
  );
// 发布接口
export const onlineInterface = (id: number) =>
  request.post<any, onlineInterfaceResponse>(API.INTERFACE_INFO_ONLINE_URL, {
    id
  });
// 下线接口
export const offlineInterface = (id: number) =>
  request.post<any, onlineInterfaceResponse>(API.INTERFACE_INFO_OFFLINE_URL, {
    id
  });
// 根据id删除接口
export const deleteInterfaceById = (id: number) =>
  request.post<any, onlineInterfaceResponse>(API.INTERFACE_INFO_DELETE_URL, {
    id
  });
// 根据条件批量获取接口列表
export const getInterfaceListBySearch = (interfaceQuery: any) =>
  request.get<any, getInterfaceResponseData>(API.INTERFACE_INFO_LIST_URL, {
    params: interfaceQuery
  });
// 新建接口
export const addInterface = (interfaceInfo: addInterfaceInfoData) =>
  request.post<any, addInterfaceResponse>(API.INTERFACE_INFO_ADD_URL, {
    name: interfaceInfo.name,
    description: interfaceInfo.description,
    url: interfaceInfo.url,
    requestParams: interfaceInfo.requestParams,
    requestHeader: interfaceInfo.requestHeader,
    responseHeader: interfaceInfo.responseHeader,
    method: interfaceInfo.method,
    userId: interfaceInfo.userId
  });
// 更新接口
export const updateInterfaceInfo = (
  updateInterfaceInfo: addInterfaceInfoData
) =>
  request.post<any, updateInterfaceResponse>(API.INTERFACE_INFO_UPDATE_URL, {
    id: updateInterfaceInfo.id,
    name: updateInterfaceInfo.name,
    description: updateInterfaceInfo.description,
    url: updateInterfaceInfo.url,
    requestParams: updateInterfaceInfo.requestParams,
    requestHeader: updateInterfaceInfo.requestHeader,
    responseHeader: updateInterfaceInfo.responseHeader,
    method: updateInterfaceInfo.method,
    userId: updateInterfaceInfo.userId
  });
// 获取调用次数最多的三个接口
export const getTopInterface = () =>
  request.get<any, getTopInterfaceResponse>(API.INTERFACE_INFO_TOP_URL);
// 根据id获取接口参数
export const getInterfaceParamsById = (id: number) =>
  request.get<any, InterfaceParamVO>(API.INTERFACE_INFO_PARAMS_URL, {
    params: {
      id
    }
  });
// 根据AI生成可视化图标
export const getStatisticsByAI = (formData: any) =>
  request.post<any, any>(API.INTERFACE_INFO_STATISTICS_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
