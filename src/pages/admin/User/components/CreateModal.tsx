import {ActionType, ProTable} from '@ant-design/pro-components';
import type {ProColumns} from '@ant-design/pro-components';
import { Modal } from 'antd';
import React, {useEffect, useRef} from 'react';

export type Props = {
  columns: ProColumns<API.UserVO>[];
  onCancel: () => void;
  onSubmit: (values: API.UserVO) => Promise<void>;
  visible: boolean;
};
const CreateModal: React.FC<Props> = (props) => {
  const { columns, visible, onCancel, onSubmit } = props;
  const actionRef = useRef<ActionType>();

  useEffect(() => {
    actionRef.current?.reset?.()
  }, [visible])

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
        actionRef={actionRef}
        columns={columns}
        onSubmit={async (values) => {
          onSubmit?.(values);
        }}
      />
    </Modal>
  );
};

export default CreateModal;
