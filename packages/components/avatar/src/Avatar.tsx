import * as React from 'react';
import { AvatarProps } from 'antd/lib/avatar';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';

import AntdAvatar from './Avatar.styles';

type backgroundColors =
  | 'red'
  | 'green'
  | 'grey'
  | 'yellow'
  | 'blue'
  | 'pink'
  | 'mars'
  | 'orange'
  | 'fern'
  | 'cyan'
  | 'purple'
  | 'violet';

export interface Props extends Omit<AvatarProps, 'size'> {
  hasStatus?: boolean;
  size?: number | 'small' | 'default' | 'large' | 'extraLarge' | undefined;
  iconComponent?: React.ReactNode;
  backgroundColor?: backgroundColors;
  disabled?: boolean;
}

const Avatar: React.FC<Props> = ({ backgroundColor, disabled, hasStatus, iconComponent, ...antdProps }) => {
  return (
    <AntdAvatar
      hasStatus={hasStatus}
      backgroundColor={backgroundColor}
      disabled={disabled}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...antdProps}
    >
      {iconComponent || antdProps.children}
    </AntdAvatar>
  );
};

export default Avatar;