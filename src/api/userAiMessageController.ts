// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** addUserAiMessage POST /api/userAiMessage/add */
export async function addUserAiMessageUsingPost(
  body: API.UserAiMessageAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserAiMessage_>("/api/userAiMessage/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** deleteUserAiMessage POST /api/userAiMessage/delete */
export async function deleteUserAiMessageUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/userAiMessage/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** editUserAiMessage POST /api/userAiMessage/edit */
export async function editUserAiMessageUsingPost(
  body: API.UserAiMessageEditRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/userAiMessage/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** getUserAiMessageVOById GET /api/userAiMessage/get/vo */
export async function getUserAiMessageVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserAiMessageVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserAiMessageVO_>(
    "/api/userAiMessage/get/vo",
    {
      method: "GET",
      params: {
        ...params
      },
      ...(options || {})
    }
  );
}

/** listUserAiMessageByPage POST /api/userAiMessage/list/page */
export async function listUserAiMessageByPageUsingPost(
  body: API.UserAiMessageQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageUserAiMessage_>(
    "/api/userAiMessage/list/page",
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

/** listUserAiMessageVOByPage POST /api/userAiMessage/list/page/vo */
export async function listUserAiMessageVoByPageUsingPost(
  body: API.UserAiMessageQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageUserAiMessageVO_>(
    "/api/userAiMessage/list/page/vo",
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

/** listMyUserAiMessageVOByPage POST /api/userAiMessage/my/list/page/vo */
export async function listMyUserAiMessageVoByPageUsingPost(
  body: API.UserAiMessageQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageUserAiMessageVO_>(
    "/api/userAiMessage/my/list/page/vo",
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

/** updateUserAiMessage POST /api/userAiMessage/update */
export async function updateUserAiMessageUsingPost(
  body: API.UserAiMessageUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/userAiMessage/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}
