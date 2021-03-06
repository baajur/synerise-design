import { FolderItem } from '../../../SidebarObject.types';
import { OverviewTexts } from '../../Overview/Overview.types';
import { HeaderTexts } from '../Header.types';

export interface Props {
  data: FolderItem[];
  onClickAction?: () => void;
  onClearInput?: () => void;
  parentFolder: FolderItem;
  texts: OverviewTexts & HeaderTexts;
  onDropdownOutsideClick: () => void;
  onSearchChange: (value: string) => void;
  searchValue: string;
  onFolderSelect: (item: FolderItem) => void;
}