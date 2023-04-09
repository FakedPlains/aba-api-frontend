// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** updateInterfaceInfo PUT /api/interface/info */
export async function updateInterfaceInfoUsingPUT(
  body: API.InterfaceInfoUpdateDTO,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResultboolean>('/api/interface/info', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** addInterfaceInfo POST /api/interface/info */
export async function addInterfaceInfoUsingPOST(
  body: API.InterfaceInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResultlong>('/api/interface/info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteInterfaceInfo DELETE /api/interface/info */
export async function deleteInterfaceInfoUsingDELETE(
  body: API.DeleteDTO,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResultboolean>('/api/interface/info', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getInterfaceInfoById GET /api/interface/info/${param0} */
export async function getInterfaceInfoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseResultInterfaceInfoVO>(`/api/interface/info/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** offlineInterfaceInfo POST /api/interface/info/${param0}/offline */
export async function offlineInterfaceInfoUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.offlineInterfaceInfoUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseResultboolean>(`/api/interface/info/${param0}/offline`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** onlineInterfaceInfo POST /api/interface/info/${param0}/online */
export async function onlineInterfaceInfoUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.onlineInterfaceInfoUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseResultboolean>(`/api/interface/info/${param0}/online`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** invokeInterface POST /api/interface/info/invoke */
export async function invokeInterfaceUsingPOST(
  body: API.InterfaceInfoInvokeDTO,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResultInterfaceInvokeVO>('/api/interface/info/invoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listInterfaceInfo GET /api/interface/info/list */
export async function listInterfaceInfoUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listInterfaceInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResultListInterfaceInfo>('/api/interface/info/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getShowingInterfaceInfo GET /api/interface/info/page */
export async function getShowingInterfaceInfoUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getShowingInterfaceInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResultPageInterfaceInfoVO>('/api/interface/info/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getInterfaceInfoPages GET /api/interface/info/show */
export async function getInterfaceInfoPagesUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceInfoPagesUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResultPageInterfaceInfoVO>('/api/interface/info/show', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
