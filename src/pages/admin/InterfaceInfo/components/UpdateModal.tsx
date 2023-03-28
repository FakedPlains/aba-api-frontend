import {ProTable} from '@ant-design/pro-components';
import type {ProColumns, ProFormInstance} from '@ant-design/pro-components';
import {Modal} from 'antd';
import React, {useEffect, useRef} from 'react';

export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  values: API.InterfaceInfo;
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};
const UpdateModal: React.FC<Props> = (props) => {
  const {columns, values, visible, onCancel, onSubmit} = props;

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(values);
    }
  }, [values])

  return (
    <Modal
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type={'form'}
        formRef={formRef}
        columns={columns}
        onSubmit={async (val) => {
          console.log(val);
          onSubmit?.(val);
        }}
      ></ProTable>
    </Modal>
  );
};
export default UpdateModal;
