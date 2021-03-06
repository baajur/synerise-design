import * as React from 'react';
import { Column } from '../ColumnManagerItem/ColumManagerItem.types';

export type Props = {
  searchResults: Column[];
  searchQuery: string;
  setFixed: (id: string, fixed?: string) => void;
  showGroupSettings: (item: Column) => void;
  switchAction: (id: string, visible: boolean) => void;
  texts: {
    [k: string]: string | React.ReactNode;
  };
};
