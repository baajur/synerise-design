import { MenuProps } from 'antd/lib/menu';
import * as React from 'react';

export interface SubMenuProps extends Omit<MenuProps, 'dataSource' | 'footer'> {
  parent?: boolean;
  checked?: boolean;
  prefixel?: React.ReactNode;
  suffixel?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  index?: number;
  text: string | React.ReactNode;
  description?: string | React.ReactNode;
  ordered?: boolean | undefined;
  subMenu?: SubMenuProps[] | string[];
}