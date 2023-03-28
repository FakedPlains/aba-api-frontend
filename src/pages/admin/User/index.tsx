import {Button, message} from "antd";
import React, {useRef, useState} from "react";
import type {Key} from "react";
import {
  PageContainer,
  ProTable,
} from "@ant-design/pro-components";
import type {ActionType, ProColumns} from "@ant-design/pro-components";
import {PlusOutlined} from "@ant-design/icons";
import {
  addUserUsingPOST,
  deleteUserUsingDELETE,
  getUserPageUsingGET,
  updateUserUsingPUT
} from "@/services/aba-api-backend/userController";
import CreateModal from "@/pages/admin/User/components/CreateModal";


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
  /*{
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
  },*/
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
  const [createModalOpen, handleCreateModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const handleAdd = async (fields: API.UserAddDTO) => {
    const hide = message.loading('正在添加');
    try {
      await addUserUsingPOST({
        ...fields,
      });
      hide();
      message.success('添加成功');
      handleCreateModalOpen(false);
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('添加失败' + error.message);
      return false;
    }
  };

  const handleDelete = async (fields: API.DeleteDTO) => {
    const hide = message.loading('正在删除');
    try {
      await deleteUserUsingDELETE({
        ...fields,
      });
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败' + error.message);
      return false;
    }
  };

  const handleUpdate = async (fields: API.UserUpdateDTO) => {
    const hide = message.loading('正在更新');
    try {
      await updateUserUsingPUT({
        ...fields,
      });
      hide();
      message.success('更新成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('更新失败' + error.message);
      return false;
    }
  };

  return (
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer>
        <ProTable<API.UserVO>
          columns={columns}
          actionRef={actionRef}
          cardBordered
          request={async (params = {}, sort, filter) => {
            console.log(params, sort, filter);
            const res = await getUserPageUsingGET({...params});
            if (res.data) {
              return {
                data: res.data.records || [],
                success: true,
                total: res.data.total,
              };
            }
            return {
              data: [],
              success: false,
              total: 0,
            };
          }}
          editable={{
            onSave: (key: number, record: API.UserVO, originRow: API.UserVO) => {
              return handleUpdate({...record, id: key})
            },
            onDelete: (key) => {
              return handleDelete({id: key as number})
            }
          }}
          columnsState={{
            persistenceKey: 'pro-table-singe-demos',
            persistenceType: 'localStorage',
            onChange(value) {
              console.log('value: ', value);
            },
          }}
          rowKey="id"
          search={{
            labelWidth: 'auto',
          }}
          options={{
            setting: {
              listsHeight: 400,
            },
          }}
          /*form={{
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
          }}*/
          pagination={{
            pageSize: 5,
            onChange: (page) => console.log(page),
          }}
          dateFormatter="string"
          headerTitle="用户数据"
          toolBarRender={() => [
            <Button key="button" icon={<PlusOutlined/>} type="primary" onClick={() => handleCreateModalOpen(true)}>
              新建
            </Button>,
          ]}
        />
        <CreateModal
          columns={columns}
          onCancel={() => {
            handleCreateModalOpen(false);
          }}
          onSubmit={async (values) => {
            await handleAdd(values as API.UserAddDTO);
          }}
          visible={createModalOpen}
        />
      </PageContainer>
    </div>
  );
}

export default User;
