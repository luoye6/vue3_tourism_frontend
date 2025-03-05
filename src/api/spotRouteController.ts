// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** addSpotRoute POST /api/spotRoute/add */
export async function addSpotRouteUsingPost(
  body: API.SpotRouteAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/spotRoute/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** deleteSpotRoute POST /api/spotRoute/delete */
export async function deleteSpotRouteUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/spotRoute/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** getSpotRouteVOById GET /api/spotRoute/get/vo */
export async function getSpotRouteVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSpotRouteVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseSpotRouteVO_>("/api/spotRoute/get/vo", {
    method: "GET",
    params: {
      ...params
    },
    ...(options || {})
  });
}

/** listSpotRouteByPage POST /api/spotRoute/list/page */
export async function listSpotRouteByPageUsingPost(
  body: API.SpotRouteQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageSpotRoute_>("/api/spotRoute/list/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** listSpotRouteVOByPage POST /api/spotRoute/list/page/vo */
export async function listSpotRouteVoByPageUsingPost(
  body: API.SpotRouteQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageSpotRouteVO_>(
    "/api/spotRoute/list/page/vo",
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

/** listMySpotRouteVOByPage POST /api/spotRoute/my/list/page/vo */
export async function listMySpotRouteVoByPageUsingPost(
  body: API.SpotRouteQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageSpotRouteVO_>(
    "/api/spotRoute/my/list/page/vo",
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

/** updateSpotRoute POST /api/spotRoute/update */
export async function updateSpotRouteUsingPost(
  body: API.SpotRouteUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/spotRoute/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}
