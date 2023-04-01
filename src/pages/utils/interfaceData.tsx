import { Space, Tag } from 'antd';

export const methodTags = [
  <Space key={'get'}>
    <Tag color={'green'} key={'get'}>
      GET
    </Tag>
  </Space>,
  <Space key={'post'}>
    <Tag color={'orange'} key={'post'}>
      POST
    </Tag>
  </Space>,
  <Space key={'put'}>
    <Tag color={'blue'} key={'put'}>
      PUT
    </Tag>
  </Space>,
  <Space key={'del'}>
    <Tag color={'red'} key={'del'}>
      DELETE
    </Tag>
  </Space>,
];

export const contentTypes = [
  { label: 'application/json', value: 0 },
  { label: 'application/x-wwww-form-urlencoded', value: 1 },
  { label: 'multipart/form-data', value: 2 },
  { label: 'application/xml', value: 3 },
  { label: 'text/plain', value: 4 },
  { label: '*/*', value: 5 },
];
