import Example from '@/pages/InterfaceInfo/components/Example';
import { contentTypes, methodTags } from '@/pages/utils/interfaceData';
import { getInterfaceInfoByIdUsingGET } from '@/services/aba-api-backend/interfaceInfoController';
import { PageContainer, ProDescriptions, RouteContext } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Button, message, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import Info from './components/Info';
import Invoke from './components/Invoke';
import styles from './style.less';

const InterfaceInfo: React.FC = () => {
  const { id } = useParams();
  const [interfaceInfo, setInterfaceInfo] = useState<API.InterfaceInfoVO>();
  const [loading, setLoading] = useState<boolean>(false);

  const loadData = async () => {
    setLoading(true);
    try {
      if (id) {
        const res = await getInterfaceInfoByIdUsingGET({ id: Number(id) });
        setInterfaceInfo(res.data);
      } else {
        throw new Error('接口不存在');
      }
    } catch (e: any) {
      message.error('加载失败，' + e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, [id]);

  const action = [
    interfaceInfo?.hasFree === 1 ? (
      <Button key={'free'}>激活免费试用</Button>
    ) : (
      <Button disabled key={'free'}>
        已试用
      </Button>
    ),
    <Button key={'buy'} type={'primary'}>
      立即购买
    </Button>,
  ];

  const description = (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <ProDescriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
          <ProDescriptions.Item label="创建人">{interfaceInfo?.userAccount}</ProDescriptions.Item>
          <ProDescriptions.Item label="dataId">{interfaceInfo?.dataId}</ProDescriptions.Item>
          <ProDescriptions.Item label="请求方式">
            {methodTags[interfaceInfo?.method || 0]}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="ContentType">
            {contentTypes[interfaceInfo?.contentType || 0].label}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="描述">{interfaceInfo?.description}</ProDescriptions.Item>
          <ProDescriptions.Item label="创建时间">{interfaceInfo?.createTime}</ProDescriptions.Item>
        </ProDescriptions>
      )}
    </RouteContext.Consumer>
  );

  const extraContent = (
    <div className={styles.moreInfo}>
      <Statistic title="免费调用次数" value={interfaceInfo?.interfaceCharging?.freeCount} />
      <Statistic
        title="单价"
        value={interfaceInfo?.interfaceCharging?.price}
        prefix="¥"
        suffix={'元/次'}
      />
    </div>
  );

  const [tabStatus, seTabStatus] = useState<string>('info');

  const onTabChange = (tabActiveKey: string) => {
    seTabStatus(tabActiveKey);
  };

  const tabList = [
    {
      tab: '接口信息',
      key: 'info',
      children: <Info interfaceInfo={interfaceInfo || {}} />,
    },
    {
      tab: '在线调用',
      key: 'invoke',
      children: <Invoke interfaceInfo={interfaceInfo || {}} />,
    },
    {
      tab: '示例代码',
      key: 'example',
      children: <Example />,
    },
  ];

  return (
    <PageContainer
      title={interfaceInfo?.name}
      loading={loading}
      extra={action}
      className={styles.pageHeader}
      content={description}
      extraContent={extraContent}
      tabActiveKey={tabStatus}
      onTabChange={onTabChange}
      tabList={tabList}
    />
  );
};

export default InterfaceInfo;
