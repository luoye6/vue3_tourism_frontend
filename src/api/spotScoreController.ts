// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** addSpotScore POST /api/spotScore/add */
export async function addSpotScoreUsingPost(
  body: API.SpotScoreAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/spotScore/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** getAverageScore GET /api/spotScore/averageScore */
export async function getAverageScoreUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAverageScoreUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponse>("/api/spotScore/averageScore", {
    method: "GET",
    params: {
      ...params
    },
    ...(options || {})
  });
}

/** deleteSpotScore POST /api/spotScore/delete */
export async function deleteSpotScoreUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/spotScore/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** editSpotScore POST /api/spotScore/edit */
export async function editSpotScoreUsingPost(
  body: API.SpotScoreEditRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/spotScore/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** getSpotScoreVOById GET /api/spotScore/get/vo */
export async function getSpotScoreVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSpotScoreVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseSpotScoreVO_>("/api/spotScore/get/vo", {
    method: "GET",
    params: {
      ...params
    },
    ...(options || {})
  });
}

/** listSpotScoreByPage POST /api/spotScore/list/page */
export async function listSpotScoreByPageUsingPost(
  body: API.SpotScoreQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageSpotScore_>("/api/spotScore/list/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** listSpotScoreVOByPage POST /api/spotScore/list/page/vo */
export async function listSpotScoreVoByPageUsingPost(
  body: API.SpotScoreQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageSpotScoreVO_>(
    "/api/spotScore/list/page/vo",
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

/** listMySpotScoreVOByPage POST /api/spotScore/my/list/page/vo */
export async function listMySpotScoreVoByPageUsingPost(
  body: API.SpotScoreQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageSpotScoreVO_>(
    "/api/spotScore/my/list/page/vo",
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

/** updateSpotScore POST /api/spotScore/update */
export async function updateSpotScoreUsingPost(
  body: API.SpotScoreUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/spotScore/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}
