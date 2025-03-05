// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** addNotice POST /api/notice/add */
export async function addNoticeUsingPost(
  body: API.NoticeAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/notice/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** deleteNotice POST /api/notice/delete */
export async function deleteNoticeUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/notice/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** getNoticeVOById GET /api/notice/get/vo */
export async function getNoticeVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNoticeVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseNoticeVO_>("/api/notice/get/vo", {
    method: "GET",
    params: {
      ...params
    },
    ...(options || {})
  });
}

/** listNoticeByPage POST /api/notice/list/page */
export async function listNoticeByPageUsingPost(
  body: API.NoticeQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageNotice_>("/api/notice/list/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** listNoticeVOByPage POST /api/notice/list/page/vo */
export async function listNoticeVoByPageUsingPost(
  body: API.NoticeQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageNoticeVO_>("/api/notice/list/page/vo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** listMyNoticeVOByPage POST /api/notice/my/list/page/vo */
export async function listMyNoticeVoByPageUsingPost(
  body: API.NoticeQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageNoticeVO_>("/api/notice/my/list/page/vo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** updateNotice POST /api/notice/update */
export async function updateNoticeUsingPost(
  body: API.NoticeUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/notice/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}
