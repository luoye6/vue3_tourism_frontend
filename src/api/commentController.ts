// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** addComment POST /api/comment/add */
export async function addCommentUsingPost(
  body: API.CommentAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/comment/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** deleteComment POST /api/comment/delete */
export async function deleteCommentUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/comment/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** editComment POST /api/comment/edit */
export async function editCommentUsingPost(
  body: API.CommentEditRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/comment/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** getCommentByPostId GET /api/comment/get/questonCommnet */
export async function getCommentByPostIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCommentByPostIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListCommentVO_>(
    "/api/comment/get/questonCommnet",
    {
      method: "GET",
      params: {
        ...params
      },
      ...(options || {})
    }
  );
}

/** getCommentVOById GET /api/comment/get/vo */
export async function getCommentVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCommentVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseCommentVO_>("/api/comment/get/vo", {
    method: "GET",
    params: {
      ...params
    },
    ...(options || {})
  });
}

/** listCommentByPage POST /api/comment/list/page */
export async function listCommentByPageUsingPost(
  body: API.CommentQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageComment_>("/api/comment/list/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** listCommentVOByPage POST /api/comment/list/page/vo */
export async function listCommentVoByPageUsingPost(
  body: API.CommentQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageCommentVO_>("/api/comment/list/page/vo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** listMyCommentVOByPage POST /api/comment/my/list/page/vo */
export async function listMyCommentVoByPageUsingPost(
  body: API.CommentQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageCommentVO_>(
    "/api/comment/my/list/page/vo",
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

/** listMyComments POST /api/comment/myComments */
export async function listMyCommentsUsingPost(options?: {
  [key: string]: any;
}) {
  return request<API.BaseResponseListMyCommentVO_>("/api/comment/myComments", {
    method: "POST",
    ...(options || {})
  });
}

/** updateComment POST /api/comment/update */
export async function updateCommentUsingPost(
  body: API.CommentUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/comment/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}
