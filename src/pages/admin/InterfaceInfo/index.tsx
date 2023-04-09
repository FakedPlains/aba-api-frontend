import { methodTags } from '@/pages/utils/interfaceData';
import {
  deleteInterfaceInfoUsingDELETE,
  getInterfaceInfoPagesUsingGET,
  offlineInterfaceInfoUsingPOST,
  onlineInterfaceInfoUsingPOST,
} from '@/services/aba-api-backend/interfaceInfoController';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Dropdown, message, Popconfirm, Space } from 'antd';
import React, { useRef } from 'react';

const TableList: React.FC = () => {
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const actionRef = useRef<ActionType>();

  /**
   *  Delete node
   * @zh-CN 发布接口
   *
   * @param id
   */
  const handleOnline = async (id: number) => {
    const hide = message.loading('正在发布');
    if (id <= 0) return true;
    try {
      await onlineInterfaceInfoUsingPOST({
        id,
      });
      hide();
      message.success('发布成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('发布失败，' + error.message);
      return false;
    }
  };
  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param id
   */
  const handleOffline = async (id: number) => {
    const hide = message.loading('正在下线');
    if (id <= 0) return true;
    try {
      await offlineInterfaceInfoUsingPOST({
        id,
      });
      hide();
      message.success('下线成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('下线失败，' + error.message);
      return false;
    }
  };
  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param record
   */
  const handleRemove = async (record: API.InterfaceInfo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteInterfaceInfoUsingDELETE({
        id: record.id || 0,
      });
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
      return false;
    }
  };

  const columns: ProColumns<API.InterfaceInfoVO>[] = [
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: 'url',
      dataIndex: 'url',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '方法',
      dataIndex: 'method',
      render: (_, record) => methodTags[record.method || 0],
      hideInSearch: true,
    },
    {
      title: '接口调用次数',
      dataIndex: 'totalInvokeCount',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '开启',
          status: 'Processing',
        },
      },
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a key="monitor">监控</a>,
        <Dropdown
          menu={{
            items: [
              {
                key: 'edit',
                label: (
                  <a
                    key="edit"
                    onClick={() => history.push(`/admin/interface-info/update/${record.id}`)}
                  >
                    修改
                  </a>
                ),
              },
              {
                key: 'onoff',
                label:
                  record.status === 0 ? (
                    <a
                      onClick={async () => {
                        if (record.id !== undefined) {
                          await handleOnline(record.id);
                        }
                      }}
                    >
                      发布
                    </a>
                  ) : (
                    <a
                      onClick={async () => {
                        if (record.id !== undefined) {
                          await handleOffline(record.id);
                        }
                      }}
                    >
                      下线
                    </a>
                  ),
              },
              {
                key: 'delete',
                danger: true,
                label: (
                  <Popconfirm
                    key="delete"
                    title="删除接口信息"
                    description="确定删除?"
                    onConfirm={async () => {
                      await handleRemove(record);
                    }}
                    okText="确定"
                    cancelText="取消"
                  >
                    <a>删除</a>
                  </Popconfirm>
                ),
              },
            ],
          }}
          key={'more'}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              更多
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        columns={columns}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              history.push('/admin/interface-info/create');
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params) => {
          const res = await getInterfaceInfoPagesUsingGET({
            ...params,
          });
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
      />
    </PageContainer>
  );
};
export default TableList;
