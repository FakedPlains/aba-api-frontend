import { methodTags } from '@/pages/utils/interfaceData';
import { getShowingInterfaceInfoUsingGET } from '@/services/aba-api-backend/interfaceInfoController';
import { PageContainer, ProList } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import React from 'react';

const InterfaceList: React.FC = () => {
  return (
    <PageContainer title={'接口列表'}>
      <ProList<any>
        onRow={(record: any) => {
          return {
            onMouseEnter: () => {
              console.log(record);
            },
            onClick: () => {
              console.log(record);
            },
          };
        }}
        rowKey="name"
        // dataSource={dataSource}
        request={async () => {
          const res = await getShowingInterfaceInfoUsingGET({ current: 1, pageSize: 10 });
          if (res.data) {
            return {
              success: true,
              data: res.data.records,
              total: res.data.total,
            };
          }
          return {
            success: false,
          };
        }}
        showActions="hover"
        showExtra="hover"
        grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }}
        metas={{
          title: {
            dataIndex: 'name',
          },
          content: {
            dataIndex: 'description',
          },
          subTitle: {
            render: (text, row) => {
              return (
                <Space size={0}>
                  <Tag color="blue">作者：{row.userAccount}</Tag>
                  {methodTags[row.method || 0]}
                </Space>
              );
            },
          },
          actions: {
            render: (text, row) => [
              <a href={`/interface/info/${row.id}`} rel="noopener noreferrer" key="view">
                查看
              </a>,
            ],
          },
        }}
      />
    </PageContainer>
  );
};

export default InterfaceList;
