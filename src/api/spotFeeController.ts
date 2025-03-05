// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** addSpotFee POST /api/spotFee/add */
export async function addSpotFeeUsingPost(
  body: API.SpotFeeAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/spotFee/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** buySpotFee POST /api/spotFee/buy */
export async function buySpotFeeUsingPost(
  body: API.BuySpotFeeRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/spotFee/buy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** deleteSpotFee POST /api/spotFee/delete */
export async function deleteSpotFeeUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/spotFee/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** editSpotFee POST /api/spotFee/edit */
export async function editSpotFeeUsingPost(
  body: API.SpotFeeEditRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/spotFee/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** getSpotFeeVOById GET /api/spotFee/get/vo */
export async function getSpotFeeVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSpotFeeVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseSpotFeeVO_>("/api/spotFee/get/vo", {
    method: "GET",
    params: {
      ...params
    },
    ...(options || {})
  });
}

/** listSpotFeeByPage POST /api/spotFee/list/page */
export async function listSpotFeeByPageUsingPost(
  body: API.SpotFeeQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageSpotFee_>("/api/spotFee/list/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** listSpotFeeVOByPage POST /api/spotFee/list/page/vo */
export async function listSpotFeeVoByPageUsingPost(
  body: API.SpotFeeQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageSpotFeeVO_>("/api/spotFee/list/page/vo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** listMySpotFeeVOByPage POST /api/spotFee/my/list/page/vo */
export async function listMySpotFeeVoByPageUsingPost(
  body: API.SpotFeeQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageSpotFeeVO_>(
    "/api/spotFee/my/list/page/vo",
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

/** updateSpotFee POST /api/spotFee/update */
export async function updateSpotFeeUsingPost(
  body: API.SpotFeeUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/spotFee/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}
