// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getDictDataByType GET /api/dict/${param0}/data */
export async function getDictDataByTypeUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDictDataByTypeUsingGETParams,
  options?: { [key: string]: any },
) {
  const { typeId: param0, ...queryParams } = params;
  return request<API.ResponseResultListDictData>(`/api/dict/${param0}/data`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
