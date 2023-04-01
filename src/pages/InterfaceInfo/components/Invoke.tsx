import styles from '@/pages/InterfaceInfo/style.less';
import { GridContent, ProColumns, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { Button, Divider, Input, Radio, Select, Tabs } from 'antd';
import React, { Fragment, useState } from 'react';

export type Props = {
  interfaceInfo: API.InterfaceInfoVO;
};

export type InvokeParams = {
  [key: string]: any;
};

const Invoke: React.FC<Props> = (props) => {
  const {
    interfaceInfo: { requestParams, requestHeaders },
  } = props;

  // @ts-ignore
  const { params, setParams } = useState<InvokeParams>({});

  const columns: ProColumns<API.InterfaceParam>[] = [
    {
      title: '参数名',
      dataIndex: 'name',
    },
    {
      title: '值',
      dataIndex: 'value',
      render: (dom, entity) => (
        <Input onChange={(e) => setParams({ ...params, [entity.name]: e.target.value })} />
      ),
    },
  ];

  const getParamTabs = () => {
    const paramTabs = [];
    const pathParams = requestParams?.filter((param) => param.style === 0);
    if (pathParams?.length !== 0) {
      paramTabs.push({
        label: 'Path',
        key: '0',
        children: (
          <ProTable
            search={false}
            toolBarRender={false}
            columns={columns}
            dataSource={pathParams}
            pagination={false}
          />
        ),
      });
    }
    const queryParams = requestParams?.filter((param) => param.style === 1);
    if (queryParams?.length !== 0) {
      paramTabs.push({
        label: 'Query',
        key: '1',
        children: (
          <ProTable
            search={false}
            toolBarRender={false}
            columns={columns}
            dataSource={queryParams}
            pagination={false}
          />
        ),
      });
    }
    // const bodyParams = requestParams?.filter(param => param.style === 2);
    // if (bodyParams?.length !== 0) {
    paramTabs.push({
      label: 'Body',
      key: '2',
      children: (
        <Fragment>
          <Radio.Group defaultValue="x-www-form-urlencoded" buttonStyle="solid">
            <Radio.Button value="x-www-form-urlencoded">x-www-form-urlencoded</Radio.Button>
            <Radio.Button value="raw">raw</Radio.Button>
            <Radio.Button value="multipart">multipart</Radio.Button>
          </Radio.Group>
          <Select
            defaultValue="JSON"
            dropdownMatchSelectWidth={120}
            bordered={false}
            options={[
              { value: 'Text', label: 'Text' },
              { value: 'JavaScript', label: 'JavaScript' },
              { value: 'JSON', label: 'JSON' },
              { value: 'HTML', label: 'HTML' },
              { value: 'XML', label: 'XML' },
            ]}
          />
          <Input.TextArea style={{ marginTop: '20px' }} autoSize />
        </Fragment>
      ),
    });
    // }
    if (requestHeaders) {
      paramTabs.push({
        label: 'Headers',
        key: '3',
        children: (
          <ProTable
            search={false}
            toolBarRender={false}
            columns={columns}
            dataSource={requestHeaders}
            pagination={false}
          />
        ),
      });
    }
    return paramTabs;
  };

  const responseTabs = [
    {
      label: 'Body',
      key: 'body',
      children: (
        <ProDescriptions>
          <ProDescriptions.Item valueType={'jsonCode'}>{}</ProDescriptions.Item>
        </ProDescriptions>
      ),
    },
    {
      label: 'Headers',
      key: 'headers',
    },
  ];

  return (
    <div className={styles.main}>
      <GridContent>
        <Tabs
          tabPosition={'left'}
          tabBarExtraContent={{
            left: (
              <Button type={'primary'} style={{ marginRight: '16px', marginBottom: '16px' }}>
                发起调用
              </Button>
            ),
          }}
          items={getParamTabs()}
        />
        <Divider />
        <h4>Response</h4>
        <Tabs tabPosition={'left'} items={responseTabs} />
      </GridContent>
    </div>
  );
};

export default Invoke;
