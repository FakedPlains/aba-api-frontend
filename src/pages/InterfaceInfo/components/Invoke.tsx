import styles from '@/pages/InterfaceInfo/style.less';
import { invokeInterfaceUsingPOST } from '@/services/aba-api-backend/interfaceInfoController';
import { GridContent, ProColumns, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { Button, Divider, Input, message, Radio, Select, Tabs } from 'antd';
import React, { Fragment, useState } from 'react';

export type Props = {
  interfaceInfo: API.InterfaceInfoVO;
};

export type Header = { name: string; value: any };

const Invoke: React.FC<Props> = (props) => {
  const {
    interfaceInfo: { id, requestParams, requestHeaders },
  } = props;

  const [pathParams, setPathParams] = useState<Record<string, any>>({});
  const [queryParams, setQueryParams] = useState<Record<string, any>>({});
  const [headerParams, setHeaderParams] = useState<Record<string, any>>({});
  const [bodyParams, setBodyParams] = useState<string>();

  const [isInvoke, setIsInvoke] = useState<boolean>(false);
  const [body, setBody] = useState<string>();
  const [headers, setHeaders] = useState<Header[]>([]);

  const columns: ProColumns<API.InterfaceParam>[] = [
    {
      title: '参数名',
      dataIndex: 'name',
    },
    {
      title: '值',
      dataIndex: 'value',
      render: (dom, entity) => (
        <Input
          onChange={(e) => {
            const value = e.target.value;
            const name = entity.name;
            if (name) {
              switch (entity.style) {
                case 0:
                  pathParams[name] = value;
                  setPathParams(pathParams);
                  break;
                case 1:
                  queryParams[name] = value;
                  setQueryParams(queryParams);
                  break;
                case 3:
                  headerParams[name] = value;
                  setHeaderParams(headerParams);
                  break;
              }
            }
          }}
        />
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
    const bodyParams = requestParams?.filter((param) => param.style === 2);
    if (bodyParams?.length !== 0) {
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
            <Input.TextArea
              style={{ marginTop: '20px' }}
              autoSize
              onChange={(e) => setBodyParams(e.target.value)}
            />
          </Fragment>
        ),
      });
    }
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
          <ProDescriptions.Item valueType={'jsonCode'}>{body}</ProDescriptions.Item>
        </ProDescriptions>
      ),
    },
    {
      label: 'Headers',
      key: 'headers',
      children: (
        <ProTable
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
            },
            {
              title: 'Value',
              dataIndex: 'value',
            },
          ]}
          dataSource={headers}
          search={false}
          toolBarRender={false}
          pagination={false}
        />
      ),
    },
  ];

  const handleInvoke = async (value: API.InterfaceInfoInvokeDTO) => {
    try {
      console.log(value);
      const res = await invokeInterfaceUsingPOST({ ...value });
      if (res.data) {
        const { responseBody, responseHeaders } = res.data;
        setBody(responseBody);
        if (responseHeaders) {
          const data: Header[] = [];
          Object.entries(responseHeaders).forEach(([name, value]) => {
            const str = JSON.stringify(value);
            data.push({ name, value: str });
          });
          setHeaders([...data]);
        }
      }
      setIsInvoke(true);
    } catch (e: any) {
      message.error('调用出错，' + e.message);
    }
  };

  return (
    <div className={styles.main}>
      <GridContent>
        <Tabs
          tabPosition={'left'}
          tabBarExtraContent={{
            left: (
              <Button
                type={'primary'}
                style={{ marginRight: '16px', marginBottom: '16px' }}
                onClick={async () => {
                  await handleInvoke({
                    id: id || 0,
                    pathParams,
                    queryParams,
                    headerParams,
                    bodyParams,
                  });
                }}
              >
                发起调用
              </Button>
            ),
          }}
          items={getParamTabs()}
        />
        <Divider />
        <h4>Response</h4>
        {isInvoke ? <Tabs tabPosition={'left'} items={responseTabs} /> : <></>}
      </GridContent>
    </div>
  );
};

export default Invoke;
