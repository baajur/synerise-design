import { TabItem } from '@synerise/ds-tabs/dist/Tabs.types';
import * as React from 'react';
import { HeaderTexts } from './Elements/Header/Header.types';

export type SidebarObjectProps = {
  avatar?: React.ReactNode;
  headerPreffix?: React.ReactNode;
  headerTabs: TabItem & {content?: React.ReactNode}[];
  inputObject: {
    id: string;
    [key: string]: string | React.ReactNode;
  } & object;
  onEdit?: (inputObject: object) => void;
  onDuplicate?: (inputObject: object) => void;
  onMove?: (inputObject: object) => void;
  onDelete?: (inputObject: object) => void;
  onId?: (inputObject: object) => void;
  texts: HeaderTexts;
  onCloseClick?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  withScrollbar?: boolean;
  handleTabClick: (index: number) => void;
  footer?: React.ReactNode;
  name?: string;
  onRename?: (name: string) => void;
  activeTab?: number;

};
export type FolderItem = {
  id: string;
  name: string;
  favourite?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  canEnterSettings?: boolean;
};
