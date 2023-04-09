// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** updateInterfaceCharging PUT /api/interface/charging */
export async function updateInterfaceChargingUsingPUT(
  body: API.InterfaceChargingRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResultVoid>('/api/interface/charging', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** addInterfaceCharging POST /api/interface/charging */
export async function addInterfaceChargingUsingPOST(
  body: API.InterfaceChargingRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResultlong>('/api/interface/charging', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getInterfaceChargingByInterfaceId GET /api/interface/charging/${param0} */
export async function getInterfaceChargingByInterfaceIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceChargingByInterfaceIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { interfaceId: param0, ...queryParams } = params;
  return request<API.ResponseResultInterfaceCharging>(`/api/interface/charging/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
