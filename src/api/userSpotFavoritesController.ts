// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** addUserSpotFavorites POST /api/userSpotFavorites/add */
export async function addUserSpotFavoritesUsingPost(
  body: API.UserSpotFavoritesAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/userSpotFavorites/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** deleteUserSpotFavorites POST /api/userSpotFavorites/delete */
export async function deleteUserSpotFavoritesUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/userSpotFavorites/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** editUserSpotFavorites POST /api/userSpotFavorites/edit */
export async function editUserSpotFavoritesUsingPost(
  body: API.UserSpotFavoritesEditRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/userSpotFavorites/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}

/** getUserSpotFavoritesVOById GET /api/userSpotFavorites/get/vo */
export async function getUserSpotFavoritesVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserSpotFavoritesVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserSpotFavoritesVO_>(
    "/api/userSpotFavorites/get/vo",
    {
      method: "GET",
      params: {
        ...params
      },
      ...(options || {})
    }
  );
}

/** listUserSpotFavoritesByPage POST /api/userSpotFavorites/list/page */
export async function listUserSpotFavoritesByPageUsingPost(
  body: API.UserSpotFavoritesQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageUserSpotFavorites_>(
    "/api/userSpotFavorites/list/page",
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

/** listUserSpotFavoritesVOByPage POST /api/userSpotFavorites/list/page/vo */
export async function listUserSpotFavoritesVoByPageUsingPost(
  body: API.UserSpotFavoritesQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageUserSpotFavoritesVO_>(
    "/api/userSpotFavorites/list/page/vo",
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

/** listMyUserSpotFavoritesVOByPage POST /api/userSpotFavorites/my/list/page/vo */
export async function listMyUserSpotFavoritesVoByPageUsingPost(
  body: API.UserSpotFavoritesQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageUserSpotFavoritesVO_>(
    "/api/userSpotFavorites/my/list/page/vo",
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

/** updateUserSpotFavorites POST /api/userSpotFavorites/update */
export async function updateUserSpotFavoritesUsingPost(
  body: API.UserSpotFavoritesUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/userSpotFavorites/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: body,
    ...(options || {})
  });
}
