import styles from '@/pages/InterfaceInfo/style.less';
import { GridContent, ProColumns, ProTable } from '@ant-design/pro-components';
import { Card } from 'antd';
import React from 'react';

export type Props = {
  interfaceInfo: API.InterfaceInfoVO;
};

const columnsMap: Record<string, ProColumns<API.InterfaceParam>[]> = {
  requestParams: [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '位置',
      dataIndex: 'style',
      valueEnum: {
        0: { text: 'path' },
        1: { text: 'query' },
        2: { text: 'body' },
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'select',
      request: () =>
        Promise.resolve([
          {
            label: 'number',
            value: 0,
          },
          {
            label: 'sting',
            value: 1,
          },
        ]),
    },
    {
      title: '必填',
      dataIndex: 'isRequired',
      render: (dom, entity) =>
        entity.isRequired === 1 ? <span style={{ color: 'red' }}>是</span> : <span>否</span>,
    },
    {
      title: '最大长度',
      dataIndex: 'maxLength',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
  ],
  requestHeaders: [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '必填',
      dataIndex: 'isRequired',
      render: (dom, entity) => {
        return entity.isRequired === 1 ? <span style={{ color: 'red' }}>是</span> : <span>否</span>;
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
  ],
  responseParams: [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'select',
      request: () =>
        Promise.resolve([
          {
            label: 'path',
            value: 0,
          },
          {
            label: 'query',
            value: 1,
          },
          {
            label: 'body',
            value: 2,
          },
        ]),
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
  ],
  errorCode: [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
  ],
};

const Info: React.FC<Props> = (props) => {
  const { interfaceInfo } = props;

  return (
    <div className={styles.main}>
      <GridContent>
        {/*{
          ["requestParams", "requestHeaders", "responseParams", "errorCode"]
            .filter(key => interfaceInfo[key as keyof API.InterfaceInfoVO] !== undefined)
            .map(key => (
              <Card key={key} title="请求参数" style={{marginBottom: 24}} bordered={false}>
                <ProTable
                  search={false}
                  toolBarRender={false}
                  columns={columnsMap[key]}
                  dataSource={interfaceInfo[key as keyof API.InterfaceInfoVO]}
                  pagination={false}
                />
              </Card>
            ))
        }*/}
        {interfaceInfo?.requestParams ? (
          <Card title="请求参数" style={{ marginBottom: 24 }} bordered={false}>
            <ProTable
              search={false}
              toolBarRender={false}
              columns={columnsMap['requestParams']}
              dataSource={interfaceInfo['requestParams']}
              pagination={false}
            />
          </Card>
        ) : (
          <></>
        )}
        {interfaceInfo?.requestHeaders ? (
          <Card title="请求头" style={{ marginBottom: 24 }} bordered={false}>
            <ProTable
              search={false}
              toolBarRender={false}
              columns={columnsMap['requestHeaders']}
              dataSource={interfaceInfo.requestHeaders}
              pagination={false}
            />
          </Card>
        ) : (
          <></>
        )}
        {interfaceInfo?.responseParams ? (
          <Card title="响应参数" style={{ marginBottom: 24 }} bordered={false}>
            <ProTable
              search={false}
              toolBarRender={false}
              columns={columnsMap['responseParams']}
              dataSource={interfaceInfo.responseParams}
              pagination={false}
            />
          </Card>
        ) : (
          <></>
        )}
        {interfaceInfo?.errorCode ? (
          <Card title="错误码" style={{ marginBottom: 24 }} bordered={false}>
            <ProTable
              search={false}
              toolBarRender={false}
              columns={columnsMap['errorCode']}
              dataSource={interfaceInfo.errorCode}
              pagination={false}
            />
          </Card>
        ) : (
          <></>
        )}
      </GridContent>
    </div>
  );
};

export default Info;
