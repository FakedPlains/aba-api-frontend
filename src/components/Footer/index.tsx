import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'ABA 工作室出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'ABA API Platform',
          title: 'ABA API Platform',
          href: '',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/FakedPlains',
          blankTarget: true,
        },
        {
          key: 'ABA Studio',
          title: 'ABA Studio',
          href: 'https://github.com/FakedPlains',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
