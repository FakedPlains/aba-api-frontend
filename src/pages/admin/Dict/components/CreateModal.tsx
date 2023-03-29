import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';

export type Props = {
  columns: ProColumns<API.DictType>[];
  onCancel: () => void;
  onSubmit: (values: API.DictTypeAddRequest) => Promise<boolean>;
  visible: boolean;
};
const CreateModal: React.FC<Props> = (props) => {
  const { columns, visible, onCancel, onSubmit } = props;

  return (
    <Modal
      open={visible}
      footer={null}
      destroyOnClose
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type={'form'}
        columns={columns}
        onSubmit={async (values) => {
          onSubmit?.(values as API.DictTypeAddRequest);
        }}
      ></ProTable>
    </Modal>
  );
};
export default CreateModal;
