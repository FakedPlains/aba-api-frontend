import {Button, message, Popconfirm, Result} from "antd";
import React, {useEffect, useRef, useState} from "react";
import type {Key} from "react";
import {
  ModalForm,
  PageContainer, ProFormInstance,
  ProFormText, ProFormTextArea,
  ProTable,
} from "@ant-design/pro-components";
import type {ActionType, ProColumns} from "@ant-design/pro-components";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {
  addDictTypeUsingPOST,
  deleteDictTypeUsingDELETE,
  getAllDictTypeUsingGET, updateDictTypeUsingPUT
} from "@/services/aba-api-backend/dictTypeController";
import {getDictDataByTypeUsingGET} from "@/services/aba-api-backend/dictDataController";


const columns: ProColumns<API.UserVO>[] = [
  {
    dataIndex: 'index',
    valueType: 'index',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'userName',
  },
  {
    title: '用户账号',
    dataIndex: 'userAccount',
  },
  {
    title: '用户性别',
    dataIndex: 'gender',
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
  },
  {
    title: '创建时间',
    // key: 'showTime',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
    hideInForm: true,
    editable: false,
  },
  {
    title: '更新时间',
    // key: 'showTime',
    dataIndex: 'updateTime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
    hideInForm: true,
    editable: false,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateRange',
    hideInTable: true,
    hideInForm: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id as Key);
        }}
      >
        编辑
      </a>,
    ],
  },
];

const User: React.FC = () => {
  const [dictTypeModalVisit, setDictTypeModalVisit] = useState<boolean>(false);
  const [dictTypeMode, setDictTypeMode] = useState<string>("add");
  const addDictTypeFormRef = useRef<ProFormInstance>();
  const [dictTypes, setDictTypes] = useState<API.DictType[]>([])
  const actionRef = useRef<ActionType>();

  const loadDictType = async () => {
    try {
      const res = await getAllDictTypeUsingGET();
      setDictTypes(res?.data || []);
    } catch (e: any) {
      message.error('加载失败，' + e.message);
    }
  };

  useEffect(() => {
    loadDictType();
  }, [])

  const mapDictTypeToTabs = () => {
    return dictTypes.map(dictType => {
      return {
        key: String(dictType.id),
        label: dictType.name,
      }
    })
  }

  const handleAddDictType = async (fields: API.DictTypeAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      await addDictTypeUsingPOST({
        ...fields,
      });
      hide();
      message.success('添加成功');
      setDictTypeModalVisit(false);
      await loadDictType();
      addDictTypeFormRef.current?.resetFields();
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('添加失败' + error.message);
      return false;
    }
  };

  const handleDeleteDictType = async (fields: API.DeleteDTO) => {
    const hide = message.loading('正在删除');
    try {
      await deleteDictTypeUsingDELETE({
        ...fields,
      });
      hide();
      message.success('删除成功');
      await loadDictType();
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败' + error.message);
      return false;
    }
  };

  const handleUpdateDictType = async (fields: API.DictTypeUpdateRequest) => {
    const hide = message.loading('正在更新');
    try {
      await updateDictTypeUsingPUT({
        ...fields,
      });
      hide();
      message.success('更新成功');
      await loadDictType();
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('更新失败' + error.message);
      return false;
    }
  };

  const [activeKey, setActiveKey] = useState<string>('1');

  return (
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer
        header={{
          extra: [
            <Button key="button" icon={<PlusOutlined/>} type="primary" onClick={() => setDictTypeModalVisit(true)}>
              新建字典
            </Button>,
          ]
        }}
      >
        {dictTypes.length === 0 ?
          <Result
            title="暂无字典数据"
            extra={
              <Button key="button" icon={<PlusOutlined/>} type="primary" onClick={() => setDictTypeModalVisit(true)}>
                新建字典
              </Button>
            }
          /> :
          <ProTable<API.DictData>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            toolbar={{
              menu: {
                type: 'tab',
                activeKey: activeKey,
                items: mapDictTypeToTabs(),
                onChange: (key) => {
                  setActiveKey(key as string);
                },
              },
              actions: [
                <Button key="primary" type="link" icon={<EditOutlined/>}/>,
                <Popconfirm
                  key={"delete"}
                  title="确定删除？"
                  onConfirm={() => handleDeleteDictType({id: Number(activeKey)})}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button key="primary" danger type="link" icon={<DeleteOutlined/>}/>
                </Popconfirm>,
              ],
            }}
            search={false}
            request={async (params = {}, sort, filter) => {
              console.log(sort, filter);
              const res = await getDictDataByTypeUsingGET({typeId: 0});
              if (res.data) {
                return {
                  data: res.data || [],
                  success: true,
                  // total: res.data.total,
                };
              }
              return {
                data: [],
                success: false,
                total: 0,
              };
            }}
            /*editable={{
              onSave: (key: number, record: API.UserVO, originRow: API.UserVO) => {
                return handleUpdate({...record, id: key})
              },
              onDelete: (key) => {
                return handleDelete({id: key as number})
              }
            }}*/
            columnsState={{
              persistenceKey: 'pro-table-singe-demos',
              persistenceType: 'localStorage',
              onChange(value) {
                console.log('value: ', value);
              },
            }}
            rowKey="id"
            options={{
              setting: {
                listsHeight: 400,
              },
            }}
            form={{
              // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
              syncToUrl: (values, type) => {
                if (type === 'get') {
                  return {
                    ...values,
                    created_at: [values.startTime, values.endTime],
                  };
                }
                return values;
              },
            }}
            pagination={{
              pageSize: 5,
              onChange: (page) => console.log(page),
            }}
            dateFormatter="string"
            headerTitle="字典数据"
          />
        }
        <ModalForm
          title="添加字典"
          formRef={addDictTypeFormRef}
          open={dictTypeModalVisit}
          onFinish={handleAddDictType}
          onOpenChange={setDictTypeModalVisit}
        >
          <ProFormText name="name" label="名称" fieldProps={{maxLength: 20}} placeholder="请输入名称"/>
          <ProFormTextArea name="desc" label="描述" fieldProps={{maxLength: 100}} placeholder="请输入描述"/>
        </ModalForm>
      </PageContainer>
    </div>
  );
}

export default User;
