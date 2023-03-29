import { EditableProTable, ProColumns } from '@ant-design/pro-components';
import React, { useState } from 'react';

export type Props = {
  columns: ProColumns<API.InterfaceParam>[];
  values: API.InterfaceParam[];
  setValues: (values: API.InterfaceParam[]) => void;
};

const InterfaceParamTable: React.FC<Props> = (props) => {
  const { columns, values, setValues } = props;

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    values.map((item) => item.id),
  );

  return (
    <EditableProTable<API.InterfaceParam>
      rowKey="id"
      columns={columns}
      dataSource={values}
      recordCreatorProps={{
        newRecordType: 'dataSource',
        position: 'top',
        record: () => ({
          id: Date.now(),
        }),
      }}
      editable={{
        type: 'multiple',
        editableKeys,
        onChange: (keys) => {
          setEditableRowKeys(keys);
        },
        onValuesChange: (record, recordList) => {
          setValues(recordList);
        },
        actionRender: (row, _, dom) => {
          return [dom.delete];
        },
      }}
    />
  );
};

export default InterfaceParamTable;
