// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getAllDictType GET /api/dict/type */
export async function getAllDictTypeUsingGET(options?: { [key: string]: any }) {
  return request<API.ResponseResultListDictType>('/api/dict/type', {
    method: 'GET',
    ...(options || {}),
  });
}

/** updateDictType PUT /api/dict/type */
export async function updateDictTypeUsingPUT(
  body: API.DictTypeUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResultboolean>('/api/dict/type', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** addDictType POST /api/dict/type */
export async function addDictTypeUsingPOST(
  body: API.DictTypeAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResultboolean>('/api/dict/type', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteDictType DELETE /api/dict/type */
export async function deleteDictTypeUsingDELETE(
  body: API.DeleteDTO,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResultboolean>('/api/dict/type', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
