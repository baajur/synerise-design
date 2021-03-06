import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import { SubjectItem } from '../Subject.types';

interface Props {
  item: SubjectItem;
  clearSearch: () => void;
  searchQuery: string;
  hideDropdown: () => void;
  select: (item: SubjectItem) => void;
  className: string;
}

const SubjectListItem: React.FC<Props> = ({ item, clearSearch, searchQuery, hideDropdown, select, className }) => {
  return (
    <Menu.Item
      className={className}
      highlight={searchQuery}
      onClick={(): void => {
        hideDropdown();
        clearSearch();
        select(item);
      }}
      prefixel={<Icon component={item.icon} />}
    >
      {item.name}
    </Menu.Item>
  );
};

export default SubjectListItem;
