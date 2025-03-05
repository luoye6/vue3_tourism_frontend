// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** addBarrage POST /api/barrage/add */
export async function addBarrageUsingPost(
  body: API.BarrageAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/barrage/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** deleteBarrage POST /api/barrage/delete */
export async function deleteBarrageUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/barrage/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** getBarrageVOById GET /api/barrage/get/vo */
export async function getBarrageVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBarrageVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBarrageVO_>("/api/barrage/get/vo", {
    method: "GET",
    params: {
      ...params
    },
    ...(options || {})
  });
}

/** listBarrageByPage POST /api/barrage/list/page */
export async function listBarrageByPageUsingPost(
  body: API.BarrageQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageBarrage_>("/api/barrage/list/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** listBarrageVOByPage POST /api/barrage/list/page/vo */
export async function listBarrageVoByPageUsingPost(
  body: API.BarrageQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageBarrageVO_>("/api/barrage/list/page/vo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** listMyBarrageVOByPage POST /api/barrage/my/list/page/vo */
export async function listMyBarrageVoByPageUsingPost(
  body: API.BarrageQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageBarrageVO_>(
    "/api/barrage/my/list/page/vo",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: body,
      ...(options || {})
    }
  );
}

/** updateBarrage POST /api/barrage/update */
export async function updateBarrageUsingPost(
  body: API.BarrageUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/barrage/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}
