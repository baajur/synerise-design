import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { FolderFavouriteFlatM, FolderFavouriteM, FolderM } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { useOnClickOutside } from '@synerise/ds-utils';
import Tooltip from '@synerise/ds-tooltip';
import { FolderProps } from './Folder.types';
import * as S from './Folder.styles';
import ActionsDropdown from '../Actions/Dropdown/ActionsDropdown';
import ActionsRow from '../Actions/Row/ActionsRow';
import { validateFolderName } from '../../utils';

const Folder: React.FC<FolderProps> = ({
  item,
  actionsDisplay,
  onSettingsEnter,
  onDelete,
  onFavourite,
  onEdit,
  toggleDeleteModal,
  texts,
  onItemSelect,
}: FolderProps) => {
  const { name, favourite } = item;
  const [hovered, setHovered] = React.useState<boolean>(false);
  const [folderName, setFolderName] = React.useState<string>(name);
  const [editMode, setEditMode] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const confirmEdit = React.useCallback((): void => {
    if (validateFolderName(folderName)) {
      const trimmedName = folderName.trim();
      onEdit && onEdit({ ...item, name: trimmedName });
      setEditMode(false);
    } else {
      onEdit && onEdit({ ...item, name });
      setFolderName(name);
      setEditMode(false);
    }
  }, [folderName, name, item, onEdit]);

  React.useEffect(() => {
    setFolderName(name);
  }, [name]);
  const getPrefix = React.useCallback((isFavourite, isHovered, isEditMode): React.ReactNode => {
    if (isFavourite) {
      return isHovered || isEditMode ? <FolderFavouriteFlatM /> : <FolderFavouriteM />;
    }
    return <FolderM />;
  }, []);

  React.useEffect(() => {
    inputRef?.current !== null && inputRef.current.focus();
  }, [inputRef, editMode]);

  const onMouseOver = React.useCallback((): void => {
    setHovered(true);
  }, [setHovered]);

  const onMouseOut = React.useCallback((): void => {
    setHovered(false);
  }, [setHovered]);

  const handleOnFavourite = React.useCallback((): void => {
    onFavourite && onFavourite(item);
  }, [onFavourite, item]);

  const renderSuffix = (): React.ReactNode => {
    return actionsDisplay === 'inline' ? (
      <ActionsRow
        onDelete={
          onDelete &&
          ((): void => {
            toggleDeleteModal && toggleDeleteModal();
          })
        }
        onFavourite={(): void => {
          setHovered(false);
          handleOnFavourite && handleOnFavourite();
        }}
        onSettingsEnter={onSettingsEnter}
        onEdit={
          onEdit &&
          ((): void => {
            setEditMode(true);
          })
        }
        isFavourite={favourite}
        texts={texts}
        hovered={hovered}
      />
    ) : (
      <ActionsDropdown
        onDelete={
          onDelete &&
          ((): void => {
            toggleDeleteModal && toggleDeleteModal();
          })
        }
        onFavourite={handleOnFavourite}
        onSettingsEnter={onSettingsEnter}
        onEdit={
          onEdit &&
          ((): void => {
            setEditMode(true);
          })
        }
        isFavourite={favourite}
        dropdownMouseOut={onMouseOut}
        dropdownMouseOver={onMouseOver}
        texts={texts}
      />
    );
  };
  useOnClickOutside(inputRef, () => {
    if (editMode) {
      confirmEdit();
    }
  });

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <S.FolderItem
      editMode={editMode}
      onClick={(): void => {
        onItemSelect && onItemSelect(item);
      }}
      prefixel={
        <S.PrefixWrapper>
          <Icon
            component={getPrefix(favourite, hovered, editMode)}
            color={hovered || editMode ? theme.palette['blue-600'] : theme.palette['grey-600']}
          />
        </S.PrefixWrapper>
      }
      suffixel={
        <S.SuffixWrapper className={hovered ? 'suffix-wrapper-hovered' : undefined}>{renderSuffix()}</S.SuffixWrapper>
      }
      text={
        editMode ? (
          <S.InlineEditWrapper>
            <S.InlineEditInput
              value={folderName}
              onChange={(e: React.SyntheticEvent<HTMLInputElement>): void => setFolderName(e.currentTarget.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => {
                if (e.key === 'Enter') {
                  confirmEdit();
                }
              }}
              ref={inputRef}
            />
          </S.InlineEditWrapper>
        ) : (
          <S.FolderText>
            <Tooltip placement="topLeft" title={folderName}>
              {folderName}{' '}
            </Tooltip>
          </S.FolderText>
        )
      }
      inline={actionsDisplay === 'inline'}
      onItemHover={onMouseOver}
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      onMouseLeave={onMouseOut}
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
    />
  );
};

export default Folder;
