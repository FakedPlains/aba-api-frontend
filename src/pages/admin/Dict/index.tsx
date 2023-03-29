import {
  addDictTypeUsingPOST,
  deleteDictTypeUsingDELETE,
  getAllDictTypeUsingGET,
  updateDictTypeUsingPUT,
} from '@/services/aba-api-backend/dictTypeController';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  PageContainer,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, message, Popconfirm, Result, Tooltip } from 'antd';
import type { Key } from 'react';
import React, { useEffect, useRef, useState } from 'react';
// import {getDictDataByTypeUsingGET} from "@/services/aba-api-backend/dictDataController";
// import CreateModal from "@/pages/admin/Dict/components/CreateModal";
import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';

const dictTypeColumns: ProColumns<API.DictType>[] = [
  {
    title: '名称',
    dataIndex: 'name',
    renderFormItem: () => (
      <ProFormText name={'name'} placeholder={'请输入名称'} fieldProps={{ maxLength: 20 }} />
    ),
  },
  {
    title: '描述',
    dataIndex: 'description',
    renderFormItem: () => (
      <ProFormTextArea
        name={'description'}
        placeholder={'请输入描述'}
        fieldProps={{ maxLength: 100 }}
      />
    ),
  },
];

const User: React.FC = () => {
  const [addDictTypeModalVisit, setAddDictTypeModalVisit] = useState<boolean>(false);
  const [updateDictTypeModalVisit, setUpdateDictTypeModalVisit] = useState<boolean>(false);
  const [dictTypes, setDictTypes] = useState<API.DictType[]>([]);
  const [currentDictType, setCurrentDictType] = useState<API.DictType>();
  const [activeKey, setActiveKey] = useState<string>();
  const actionRef = useRef<ActionType>();

  const loadDictType = async () => {
    try {
      const res = await getAllDictTypeUsingGET();
      setDictTypes(res?.data || []);
      setActiveKey(dictTypes.length === 0 ? '' : '0');
    } catch (e: any) {
      message.error('加载失败，' + e.message);
    }
  };

  useEffect(() => {
    loadDictType();
  }, []);

  const mapDictTypeToTabs = () => {
    return dictTypes.map((dictType, index) => {
      return {
        key: String(index),
        label: (
          <Tooltip title={dictType.description}>
            <span>{dictType.name}</span>
          </Tooltip>
        ),
      };
    });
  };

  const handleAddDictType = async (fields: API.DictTypeAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      await addDictTypeUsingPOST({
        ...fields,
      });
      hide();
      message.success('添加成功');
      setAddDictTypeModalVisit(false);
      await loadDictType();
      // dictTypeFormRef.current?.resetFields();
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
        id: Number(currentDictType?.id),
      });
      hide();
      message.success('更新成功');
      setUpdateDictTypeModalVisit(false);
      await loadDictType();
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('更新失败' + error.message);
      return false;
    }
  };

  const columns: ProColumns<API.DictData>[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '值',
      dataIndex: 'value',
    },
    {
      title: '编码',
      dataIndex: 'code',
    },
    {
      title: '样式',
      dataIndex: 'style',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <Button
          key="editable"
          type={'link'}
          icon={<EditOutlined />}
          onClick={() => {
            action?.startEditable?.(record.id as Key);
          }}
        />,
        <Popconfirm
          key={'delete'}
          title="确定删除？"
          onConfirm={() => handleDeleteDictType({ id: Number(currentDictType?.id) })}
          okText="确定"
          cancelText="取消"
        >
          <Button key="primary" danger type="link" icon={<DeleteOutlined />} />
        </Popconfirm>,
      ],
    },
  ];

  return (
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer
        header={{
          extra: [
            <Button
              key="button"
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => setAddDictTypeModalVisit(true)}
            >
              新建字典
            </Button>,
          ],
        }}
      >
        {dictTypes.length === 0 ? (
          <Result
            title="暂无字典数据"
            extra={
              <Button
                key="button"
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => setAddDictTypeModalVisit(true)}
              >
                新建字典
              </Button>
            }
          />
        ) : (
          <EditableProTable<API.DictData>
            rowKey="id"
            dateFormatter="string"
            headerTitle="字典数据"
            columns={columns}
            actionRef={actionRef}
            toolbar={{
              menu: {
                type: 'tab',
                activeKey,
                items: mapDictTypeToTabs(),
                onChange: (key) => setActiveKey(String(key)),
              },
              actions: [
                <Button
                  key="primary"
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setCurrentDictType(dictTypes[Number(activeKey)]);
                    setUpdateDictTypeModalVisit(true);
                  }}
                />,
                <Popconfirm
                  key={'delete'}
                  title="确定删除？"
                  onConfirm={() => handleDeleteDictType({ id: Number(currentDictType?.id) })}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button key="primary" danger type="link" icon={<DeleteOutlined />} />
                </Popconfirm>,
              ],
            }}
            search={false}
            /*request={async (params = {}, sort, filter) => {
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
            }}*/
            recordCreatorProps={{
              record: () => ({ id: Date.now() }),
            }}
            editable={
              {
                /*onSave: (key: number, record: API.DictData, originRow: API.DictData) => {
                // return handleUpdate({...record, id: key})
              },*/
              }
            }
          />
        )}

        <CreateModal
          columns={dictTypeColumns}
          onCancel={() => setAddDictTypeModalVisit(false)}
          onSubmit={handleAddDictType}
          visible={addDictTypeModalVisit}
        />
        <UpdateModal
          columns={dictTypeColumns}
          values={currentDictType || {}}
          onCancel={() => setUpdateDictTypeModalVisit(false)}
          onSubmit={handleUpdateDictType}
          visible={updateDictTypeModalVisit}
        />
      </PageContainer>
    </div>
  );
};

export default User;
