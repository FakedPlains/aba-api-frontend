import { DrawerForm, ProFormDigit } from '@ant-design/pro-components';
import { ProFormRadio } from '@ant-design/pro-form';
import React, { Fragment, useState } from 'react';

export type Props = {
  data: API.InterfaceCharging | undefined;
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: API.InterfaceChargingRequest) => Promise<boolean>;
};

const ChargingModal: React.FC<Props> = (props) => {
  const { data, visible, onCancel, onSubmit } = props;

  const [isCharge, setIsCharge] = useState<number>(data?.isCharge || 0);

  return (
    <DrawerForm
      title={'配置计费信息'}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout={'horizontal'}
      open={visible}
      onFinish={onSubmit}
      drawerProps={{
        destroyOnClose: true,
        onClose: onCancel,
      }}
      initialValues={{
        isCharge: data?.isCharge || 0,
        freeCount: data?.freeCount || 0,
        price: data?.price || 0,
      }}
    >
      <ProFormRadio.Group
        name="isCharge"
        layout="horizontal"
        label="是否收费"
        fieldProps={{
          onChange: (e) => setIsCharge(e.target.value),
        }}
        options={[
          {
            label: '免费',
            value: 0,
          },
          {
            label: '收费',
            value: 1,
          },
        ]}
      />
      {isCharge === 1 ? (
        <Fragment>
          <ProFormDigit label="免费试用次数" name="freeCount" width="sm" min={0} />
          <ProFormDigit
            label="接口计费"
            name="price"
            width="sm"
            min={0}
            fieldProps={{ precision: 3 }}
          />
        </Fragment>
      ) : (
        <></>
      )}
    </DrawerForm>
  );
};

export default ChargingModal;
