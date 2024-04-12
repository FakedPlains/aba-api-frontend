import { EditableProTable, ProColumns } from '@ant-design/pro-components';
import React, { useState } from 'react';

export type Props = {
  columns: ProColumns<API.InterfaceParam>[];
  values: readonly API.InterfaceParam[];
  setValues: (values: API.InterfaceParam[]) => void;
};

const InterfaceParamTable: React.FC<Props> = (props) => {
  const { columns, values, setValues } = props;

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    values.map((item) => item.id || 1),
  );

  return (
    <EditableProTable<API.InterfaceParam>
      rowKey="id"
      columns={columns}
      value={values}
      controlled={true}
      recordCreatorProps={{
        newRecordType: 'dataSource',
        position: 'top',
        record: () => ({
          id: Date.now(),
        }),
      }}
      onChange={(values) => setValues([...values])}
      editable={{
        type: 'multiple',
        editableKeys,
        onChange: (keys) => setEditableRowKeys(keys),
        actionRender: (row, _, dom) => [dom.delete],
      }}
    />
  );
};

export default InterfaceParamTable;
