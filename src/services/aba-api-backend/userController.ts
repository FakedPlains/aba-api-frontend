// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** updateUser PUT /api/user */
export async function updateUserUsingPUT(
  body: API.UserUpdateDTO,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResultboolean>('/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** addUser POST /api/user */
export async function addUserUsingPOST(body: API.UserAddDTO, options?: { [key: string]: any }) {
  return request<API.ResponseResultlong>('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteUser DELETE /api/user */
export async function deleteUserUsingDELETE(body: API.DeleteDTO, options?: { [key: string]: any }) {
  return request<API.ResponseResultboolean>('/api/user', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserByAccessKey GET /api/user/access/${param0} */
export async function getUserByAccessKeyUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByAccessKeyUsingGETParams,
  options?: { [key: string]: any },
) {
  const { accessKey: param0, ...queryParams } = params;
  return request<API.ResponseResultUser>(`/api/user/access/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getUserByUserAccount GET /api/user/account/${param0} */
export async function getUserByUserAccountUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByUserAccountUsingGETParams,
  options?: { [key: string]: any },
) {
  const { userAccount: param0, ...queryParams } = params;
  return request<API.ResponseResultUser>(`/api/user/account/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** current GET /api/user/current */
export async function currentUsingGET(options?: { [key: string]: any }) {
  return request<API.ResponseResultSimpleUser>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** login POST /api/user/login */
export async function loginUsingPOST(body: API.UserLoginDTO, options?: { [key: string]: any }) {
  return request<API.ResponseResultstring>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserPage GET /api/user/page */
export async function getUserPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResultPageUserVO>('/api/user/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** register POST /api/user/register */
export async function registerUsingPOST(
  body: API.UserRegisterDTO,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResultlong>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
