// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** addSpot POST /api/spot/add */
export async function addSpotUsingPost(
  body: API.SpotAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/spot/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** deleteSpot POST /api/spot/delete */
export async function deleteSpotUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/spot/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** editSpot POST /api/spot/edit */
export async function editSpotUsingPost(
  body: API.SpotEditRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/spot/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** getSpotVOById GET /api/spot/get/vo */
export async function getSpotVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSpotVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseSpotVO_>("/api/spot/get/vo", {
    method: "GET",
    params: {
      ...params
    },
    ...(options || {})
  });
}

/** listSpotByPage POST /api/spot/list/page */
export async function listSpotByPageUsingPost(
  body: API.SpotQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageSpot_>("/api/spot/list/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** listSpotVOByPage POST /api/spot/list/page/vo */
export async function listSpotVoByPageUsingPost(
  body: API.SpotQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageSpotVO_>("/api/spot/list/page/vo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** listMySpotVOByPage POST /api/spot/my/list/page/vo */
export async function listMySpotVoByPageUsingPost(
  body: API.SpotQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageSpotVO_>("/api/spot/my/list/page/vo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** getTop10SpotsByViews GET /api/spot/top10 */
export async function getTop10SpotsByViewsUsingGet(options?: {
  [key: string]: any;
}) {
  return request<API.BaseResponseListSpot_>("/api/spot/top10", {
    method: "GET",
    ...(options || {})
  });
}

/** updateSpot POST /api/spot/update */
export async function updateSpotUsingPost(
  body: API.SpotUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/spot/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}
