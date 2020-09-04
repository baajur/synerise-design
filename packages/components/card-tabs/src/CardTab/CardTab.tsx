import * as React from 'react';
import Icon from '@synerise/ds-icon';
import InlineEdit from '@synerise/ds-inline-edit/dist/InlineEdit';
import { injectIntl, IntlShape } from 'react-intl';
import * as S from './CardTab.styles';
import CardTabPrefix from './CardTabPrefix/CardTabPrefix';
import CardTabActions from './CardTabActions/CardTabActions';

export enum prefixType {
  TAG,
  ICON,
}

export type Color =
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

export type CardTabTexts = {
  changeNameTooltip?: string | React.ReactNode;
  removeTooltip?: string | React.ReactNode;
  duplicateTooltip?: string | React.ReactNode;
};

export interface CardTabProps {
  intl: IntlShape;
  id: number;
  name: string;
  tag: string;
  prefix: prefixType;
  color?: Color;
  active?: boolean;
  draggable?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  disabled?: boolean;
  invalid?: boolean;
  invalidName?: boolean;
  greyBackground?: boolean;
  onSelectTab?: (id: number) => void;
  onChangeName?: (id: number, name: string) => void;
  onDuplicateTab?: (id: number) => void;
  onRemoveTab?: (id: number) => void;
  texts?: CardTabTexts;
}

const CardTab: React.FC<CardTabProps> = ({
  intl,
  id,
  name,
  tag,
  prefix,
  prefixIcon,
  suffixIcon,
  active,
  draggable,
  disabled,
  invalid,
  invalidName,
  greyBackground,
  onChangeName,
  onSelectTab,
  onDuplicateTab,
  onRemoveTab,
  texts,
  color = 'yellow',
}) => {
  const [edited, setEdited] = React.useState(false);
  const [editedName, setEditedName] = React.useState(name);
  const [pressed, setPressed] = React.useState(false);

  const getTexts = React.useMemo(() => {
    return {
      changeNameTooltip: intl.formatMessage({ id: 'DS.CARD-TAB.RENAME' }),
      removeTooltip: intl.formatMessage({ id: 'DS.CARD-TAB.REMOVE' }),
      duplicateTooltip: intl.formatMessage({ id: 'DS.CARD-TAB.DUPLICATE' }),
      ...texts,
    };
  }, [texts, intl]);

  const handleEditName = React.useCallback(
    (event: React.MouseEvent<HTMLElement>): void => {
      !!event && event.stopPropagation();
      setEdited(true);
    },
    [setEdited]
  );

  const handleChangeName = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = event.target;
      setEditedName(value);
    },
    [setEditedName]
  );

  const handleEditNameBlur = React.useCallback((): void => {
    setEdited(false);
    onChangeName && onChangeName(id, editedName);
  }, [onChangeName, id, editedName]);

  const handleDuplicate = React.useCallback(
    (event: React.MouseEvent<HTMLElement>): void => {
      !!event && event.stopPropagation();
      onDuplicateTab && onDuplicateTab(id);
    },
    [id, onDuplicateTab]
  );

  const handleRemove = React.useCallback(
    (event: React.MouseEvent<HTMLElement>): void => {
      !!event && event.stopPropagation();
      onRemoveTab && onRemoveTab(id);
    },
    [id, onRemoveTab]
  );

  const handleSelect = React.useCallback(
    (event: React.MouseEvent<HTMLElement>): void => {
      !!event && event.stopPropagation();
      !edited && onSelectTab && onSelectTab(id);
    },
    [edited, id, onSelectTab]
  );

  const showCardActions = React.useCallback((): boolean => {
    return (!!onChangeName || !!onDuplicateTab || !!onRemoveTab) && !suffixIcon;
  }, [onChangeName, onDuplicateTab, onRemoveTab, suffixIcon]);

  return (
    <S.CardTabContainer
      className={`${pressed ? 'pressed' : ''}`}
      edited={edited}
      active={Boolean(active)}
      invalid={Boolean(invalid)}
      invalidName={Boolean(invalidName) && !invalid}
      disabled={!active && Boolean(disabled)}
      color={color}
      onClick={handleSelect}
      onMouseDown={(): void => setPressed(true)}
      onMouseLeave={(): void => setPressed(false)}
      onMouseUp={(): void => setPressed(false)}
      greyBackground={!!greyBackground}
      data-id={id}
      data-testid="card-tab-container"
    >
      <CardTabPrefix draggable={draggable} prefixIcon={prefixIcon} prefix={prefix} tag={tag} />
      <S.CardTabLabel data-testid="card-tab-label" invalidName={Boolean(invalidName) && !invalid}>
        {edited ? (
          <InlineEdit
            className="ds-card-tabs__edit-name"
            size="small"
            hideIcon
            autoFocus
            input={{
              value: editedName,
              name: `ds-card-tab-input-${id}`,
              onBlur: handleEditNameBlur,
              onChange: handleChangeName,
            }}
            data-testid="card-tab-edit-input"
          />
        ) : (
          <S.CardTabName data-testid="card-tab-name">{name}</S.CardTabName>
        )}
      </S.CardTabLabel>
      {showCardActions() && (
        <CardTabActions
          enterEditNameMode={handleEditName}
          changeNameAvailable={Boolean(onChangeName)}
          onDuplicateTab={handleDuplicate}
          onRemoveTab={handleRemove}
          texts={getTexts}
        />
      )}
      {suffixIcon && <Icon className="ds-card-tabs__suffix-icon" component={suffixIcon} />}
    </S.CardTabContainer>
  );
};

export default injectIntl(CardTab);
