// 定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  code: number;
  message: string;
}

export interface InterfaceData {
  id: number | string | null;
  name: string | null;
  description: string | null;
  url: string | null;
  requestParams: string | null;
  requestHeader: string | null;
  responseHeader: string | null;
  status: number | null;
  method: string | null;
  userId: number | null;
  interfaceNumber: number | null;
  createTime: string | null;
  updateTime: string | null;
  isDelete: number | null;
}

// 定义登陆接口返回数据类型
export interface getInterfaceResponseData extends ResponseData {
  code: number;
  data: InterfaceListData;
  message: string;
}

export interface InterfaceListData {
  records: InterfaceData;
  total: number;
  size: number;
  current: number;
  orders: any;
  optimizeCountSql: boolean;
  searchCount: boolean;
  countId: number | null;
  maxLimit: number | null;
  pages: number;
}

export interface PageRequest {
  current: number | null;
  pageSize: number | null;
}

export interface getInterfaceInfoResponseDataById {
  code: number;
  data: InterfaceData;
  message: string;
}

export interface invokeInterfaceResponseById {
  code: number;
  data: any;
  message: string;
}

export interface onlineInterfaceResponse {
  code: number;
  data: boolean;
  message: string;
}

export interface addInterfaceResponse {
  code: number;
  data: any;
  message: string;
}

export interface addInterfaceInfoData {
  id: number | null;
  name: string | null;
  description: string | null;
  url: string | null;
  requestParams: string | null;
  requestHeader: string | null;
  responseHeader: string | null;
  method: string | null;
  userId: number | null;
}

export interface updateInterfaceResponse {
  code: number;
  data: any;
  message: string;
}

export interface InterfaceInfoVoData {
  id: number | string | null;
  name: string | null;
  description: string | null;
  url: string | null;
  requestParams: string | null;
  requestHeader: string | null;
  responseHeader: string | null;
  status: number | null;
  method: string | null;
  userId: number | null;
  createTime: string | null;
  updateTime: string | null;
  isDelete: number | null;
  totalNum: number | null;
  interfaceNumber: number | null;
}

export interface getTopInterfaceResponse {
  code: number;
  data: InterfaceInfoVoData[];
  message: string;
}

export interface InterfaceParamVO {
  paramName: string | null;
  type: string | null;
  example: string | null;
}
