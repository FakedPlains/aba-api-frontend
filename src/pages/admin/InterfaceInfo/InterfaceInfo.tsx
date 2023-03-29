import InterfaceParamTable from '@/pages/admin/InterfaceInfo/components/InterfaceParamTable';
import {
  addInterfaceInfoUsingPOST,
  getInterfaceInfoByIdUsingGET,
} from '@/services/aba-api-backend/interfaceInfoController';
import {
  FooterToolbar,
  PageContainer,
  ProColumns,
  ProForm,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, message, Select, Tabs, TabsProps } from 'antd';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

const { Option } = Select;

const contentTypeList = [
  { label: 'application/json', value: 0 },
  { label: 'application/x-wwww-form-urlencoded', value: 1 },
  { label: 'multipart/form-data', value: 2 },
  { label: 'application/xml', value: 3 },
  { label: 'text/plain', value: 4 },
  { label: '*/*', value: 5 },
];

const columnsMap: Record<string, ProColumns<API.InterfaceParam>[]> = {
  '0': [
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
      title: '位置',
      dataIndex: 'style',
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
      title: '必填',
      dataIndex: 'isRequired',
      valueType: 'switch',
      width: 100,
    },
    {
      title: '最大长度',
      dataIndex: 'length',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      valueType: 'option',
    },
  ],
  '3': [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '必填',
      dataIndex: 'isRequired',
      valueType: 'switch',
      width: 100,
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      valueType: 'option',
    },
  ],
  '4': [
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
    {
      title: '操作',
      valueType: 'option',
    },
  ],
  '5': [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      valueType: 'option',
    },
  ],
};

const handleAddInterfaceInfo = async (fields: API.InterfaceInfoAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    await addInterfaceInfoUsingPOST({
      ...fields,
    });
    hide();
    message.success('添加成功');
    history.back();
    return true;
  } catch (error: any) {
    hide();
    message.error('添加失败' + error.message);
    return false;
  }
};

const InterfaceInfo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<ProFormInstance>();

  const [interfaceInfo, setInterfaceInfo] = useState<API.InterfaceInfoVO>();

  const [method, setMethod] = useState<number>(0);

  const [requestParams, setRequestParams] = useState<API.InterfaceParam[]>([]);
  const [requestHeaders, setRequestHeaders] = useState<API.InterfaceParam[]>([]);
  const [responseParams, setResponseParams] = useState<API.InterfaceParam[]>([]);
  const [errorCode, setErrorCode] = useState<API.InterfaceParam[]>([]);

  const { id } = useParams();

  const loadInterfaceInfo = async (id: number) => {
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET({ id });
      if (res.data) {
        setInterfaceInfo(res.data);
        const { requestParams, requestHeaders, responseParams, errorCode } = res.data;
        setResponseParams(requestParams || []);
        setRequestHeaders(requestHeaders || []);
        setResponseParams(responseParams || []);
        setErrorCode(errorCode || []);
      }
    } catch (e: any) {
      message.error('加载失败，' + e.message);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    if (id) {
      loadInterfaceInfo(Number(id));
    }
  }, [id]);

  useEffect(() => {
    formRef.current?.setFieldsValue(interfaceInfo);
  }, [interfaceInfo]);

  const selectBefore = (
    <ProFormText name={'method'} noStyle>
      <Select style={{ width: 80 }} defaultValue={method} onChange={setMethod}>
        <Option value={0}>GET</Option>
        <Option value={1}>POST</Option>
        <Option value={2}>PUT</Option>
        <Option value={3}>DELETE</Option>
      </Select>
    </ProFormText>
  );

  const interfaceParamTypes: TabsProps['items'] = [
    {
      key: '0',
      label: '请求参数',
      children: (
        <InterfaceParamTable
          columns={columnsMap['0']}
          values={requestParams}
          setValues={setRequestParams}
        />
      ),
    },
    {
      key: '3',
      label: '请求头',
      children: (
        <InterfaceParamTable
          columns={columnsMap['3']}
          values={requestHeaders}
          setValues={setRequestHeaders}
        />
      ),
    },
    {
      key: '4',
      label: '响应参数',
      children: (
        <InterfaceParamTable
          columns={columnsMap['4']}
          values={responseParams}
          setValues={setResponseParams}
        />
      ),
    },
    {
      key: '5',
      label: '错误码',
      children: (
        <InterfaceParamTable
          columns={columnsMap['5']}
          values={errorCode}
          setValues={setErrorCode}
        />
      ),
    },
  ];

  return (
    <PageContainer>
      <ProForm<API.InterfaceInfo>
        loading={loading}
        layout={'horizontal'}
        formRef={formRef}
        submitter={{
          render: (_, dom) => (
            <FooterToolbar
              extra={
                <Button key={'back'} onClick={() => history.back()}>
                  返回
                </Button>
              }
            >
              {dom}
            </FooterToolbar>
          ),
        }}
        onFinish={async (values) => {
          // @ts-ignore
          await handleAddInterfaceInfo({
            ...values,
            method,
            requestParams: requestParams as API.RequestParam[],
            requestHeaders: requestHeaders as API.RequestHeader[],
            responseParams: responseParams as API.ResponseParam[],
            errorCode: errorCode as API.ErrorCode[],
          });
        }}
      >
        <ProFormText
          name="name"
          width={'lg'}
          label="名称"
          tooltip="最长为 20 位"
          placeholder="请输入名称"
          fieldProps={{ maxLength: 20 }}
        />
        <ProFormTextArea
          name="description"
          width={'xl'}
          label="描述"
          tooltip="最长为 100 位"
          placeholder="请输入描述"
          fieldProps={{ maxLength: 100 }}
        />
        <ProFormText
          name="url"
          width={'lg'}
          label="url 地址"
          addonBefore={selectBefore}
          rules={[{ required: true, message: '请输入请求地址!' }]}
        />
        <ProFormSelect
          name="contentType"
          width={'md'}
          label="ContentType"
          options={contentTypeList}
          placeholder="请选择"
        />
        <ProForm.Item name="dataSource" trigger="onValuesChange">
          <Tabs defaultActiveKey="1" items={interfaceParamTypes} />
        </ProForm.Item>
      </ProForm>
    </PageContainer>
  );
};

export default InterfaceInfo;
