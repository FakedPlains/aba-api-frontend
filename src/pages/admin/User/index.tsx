import CreateModal from '@/pages/admin/User/components/CreateModal';
import { addUserUsingPOST, getUserPageUsingGET } from '@/services/aba-api-backend/userController';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { message } from 'antd';
import React, { useRef, useState } from 'react';

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
    title: '用户角色',
    dataIndex: 'userRole',
    hideInSearch: true,
  },
  {
    title: '创建时间',
    // key: 'showTime',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
    hideInForm: true,
  },
  {
    title: '更新时间',
    // key: 'showTime',
    dataIndex: 'updateTime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
    hideInForm: true,
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
    render: (text, record) => [
      <a
        key="lock"
        onClick={() => {
          console.log(text, record);
        }}
      >
        锁定
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

  /*const handleDelete = async (fields: API.DeleteDTO) => {
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
  };*/

  /*const handleUpdate = async (fields: API.UserUpdateDTO) => {
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
  };*/

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
          request={async (params, sort, filter) => {
            console.log(params, sort, filter);
            const res = await getUserPageUsingGET({ ...params });
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
          rowKey="id"
          search={{
            labelWidth: 'auto',
          }}
          options={{
            setting: {
              listsHeight: 400,
            },
          }}
          pagination={{
            pageSize: 5,
          }}
          dateFormatter="string"
          headerTitle="用户数据"
          /* toolBarRender={() => [
            <Button
              key="button"
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => handleCreateModalOpen(true)}
            >
              新建
            </Button>,
          ]}*/
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
};

export default User;
