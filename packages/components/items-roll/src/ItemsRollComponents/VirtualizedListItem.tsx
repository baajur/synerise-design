import * as React from 'react';
import { ListChildComponentProps } from 'react-window';
import Menu from '@synerise/ds-menu';
import * as S from './ListItem.styles';

import { RemoveIcon } from './ItemRemoveIcon';
import { ItemRollElement } from '../ItemsRoll.types';
import { NOOP } from './ListItem';
import { ItemRendererProps } from './VirtualizedListItem.types';

const ItemRenderer = ({ highlight, onItemClick, onItemRemove, tooltipLabel }: ItemRendererProps) => ({
  index,
  style,
  data,
}: ListChildComponentProps): JSX.Element => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { suffixel, ...item } = data[index] as ItemRollElement;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onClick = React.useCallback(() => onItemClick && onItemClick(item.id), [item.id]);

  return (
    <S.ListItem>
      <Menu.Item
        className="items-roll-list-item"
        highlight={highlight}
        onItemHover={NOOP}
        onClick={onClick}
        style={style}
        suffixel={
          <S.SuffixelWrapper>
            {suffixel}
            {!!onItemRemove && <RemoveIcon id={item.id} handleRemove={onItemRemove} tooltipLabel={tooltipLabel} />}
          </S.SuffixelWrapper>
        }
      >
        {item.text}
      </Menu.Item>
    </S.ListItem>
  );
};

export default ItemRenderer;
