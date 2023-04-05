import IntroduceRow from '@/pages/admin/dashboard/analysis/components/IntroduceRow';
import { GridContent } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import type { FC } from 'react';
import { Suspense } from 'react';

const Analysis: FC = () => {
  return (
    <GridContent>
      <>
        <Suspense>
          <IntroduceRow loading={false} />
        </Suspense>

        <Suspense fallback={null}></Suspense>

        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}></Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}></Suspense>
          </Col>
        </Row>

        <Suspense fallback={null}></Suspense>
      </>
    </GridContent>
  );
};

export default Analysis;
