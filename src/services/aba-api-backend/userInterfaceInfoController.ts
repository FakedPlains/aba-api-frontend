// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** updateUserInterfaceInfo PUT /api/user-interface-info */
export async function updateUserInterfaceInfoUsingPUT(
  body: API.UserInterfaceInfoUpdateDTO,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResultboolean>('/api/user-interface-info', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** addUserInterfaceInfo POST /api/user-interface-info */
export async function addUserInterfaceInfoUsingPOST(
  body: API.UserInterfaceInfoAddDTO,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResultlong>('/api/user-interface-info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteUserInterfaceInfo DELETE /api/user-interface-info */
export async function deleteUserInterfaceInfoUsingDELETE(
  body: API.DeleteDTO,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResultboolean>('/api/user-interface-info', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserInterfaceInfoById GET /api/user-interface-info/${param0} */
export async function getUserInterfaceInfoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserInterfaceInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseResultUserInterfaceInfo>(`/api/user-interface-info/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** listUserInterfaceInfo GET /api/user-interface-info/list */
export async function listUserInterfaceInfoUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserInterfaceInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResultListUserInterfaceInfo>('/api/user-interface-info/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUserInterfaceInfoByPage GET /api/user-interface-info/page */
export async function listUserInterfaceInfoByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserInterfaceInfoByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResultPageUserInterfaceInfo>('/api/user-interface-info/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
