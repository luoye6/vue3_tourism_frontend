// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** addSpotOrder POST /api/spotOrder/add */
export async function addSpotOrderUsingPost(
  body: API.SpotOrderAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/spotOrder/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** deleteSpotOrder POST /api/spotOrder/delete */
export async function deleteSpotOrderUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/spotOrder/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** editSpotOrder POST /api/spotOrder/edit */
export async function editSpotOrderUsingPost(
  body: API.SpotOrderEditRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/spotOrder/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** getSpotOrderVOById GET /api/spotOrder/get/vo */
export async function getSpotOrderVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSpotOrderVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseSpotOrderVO_>("/api/spotOrder/get/vo", {
    method: "GET",
    params: {
      ...params
    },
    ...(options || {})
  });
}

/** getTravelData GET /api/spotOrder/getTravelData */
export async function getTravelDataUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTravelDataUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListMapStringObject_>(
    "/api/spotOrder/getTravelData",
    {
      method: "GET",
      params: {
        ...params
      },
      ...(options || {})
    }
  );
}

/** listSpotOrderByPage POST /api/spotOrder/list/page */
export async function listSpotOrderByPageUsingPost(
  body: API.SpotOrderQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageSpotOrder_>("/api/spotOrder/list/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** listSpotOrderVOByPage POST /api/spotOrder/list/page/vo */
export async function listSpotOrderVoByPageUsingPost(
  body: API.SpotOrderQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageSpotOrderVO_>(
    "/api/spotOrder/list/page/vo",
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

/** listMySpotOrderVOByPage POST /api/spotOrder/my/list/page/vo */
export async function listMySpotOrderVoByPageUsingPost(
  body: API.SpotOrderQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageSpotOrderVO_>(
    "/api/spotOrder/my/list/page/vo",
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

/** updateSpotOrder POST /api/spotOrder/update */
export async function updateSpotOrderUsingPost(
  body: API.SpotOrderUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/spotOrder/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}
