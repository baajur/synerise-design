import * as React from 'react';
import { injectIntl } from 'react-intl';
import Typography from 'antd/lib/typography';
import Drawer from '@synerise/ds-drawer';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import ItemFilter from '@synerise/ds-item-filter';
import { CloseM, FolderM, SearchM } from '@synerise/ds-icon/dist/icons';
import Scrollbar from '@synerise/ds-scrollbar';
import SearchBar from '@synerise/ds-search-bar';
import ColumnManagerActions from './ColumnManagerActions/ColumnManagerActions';
import ColumnManagerList from './ColumnManagerList/ColumnManagerList';
import { ColumnManagerProps, State, Texts } from './ColumnManager.types';
import { Column } from './ColumnManagerItem/ColumManagerIte.types';
import * as S from './styles/ColumnManager.styles';

const DEFAULT_STATE: State = {
  searchQuery: '',
  visibleList: [],
  hiddenList: [],
  itemFilterVisible: false,
  selectedFilterId: undefined,
};

class ColumnManager extends React.Component<ColumnManagerProps, State> {
  constructor(props: ColumnManagerProps) {
    super(props);
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      ...DEFAULT_STATE,
      visibleList: props.columns.filter((column: Column) => column.visible),
      hiddenList: props.columns.filter((column: Column) => !column.visible),
      selectedFilterId: props.itemFilterConfig && props.itemFilterConfig.selectedItemId,
    };
  }

  static getDerivedStateFromProps(props: ColumnManagerProps, state: State): Partial<State> | null {
    if (props.itemFilterConfig && props.itemFilterConfig.selectedItemId !== state.selectedFilterId) {
      const visible = props.columns.filter((column: Column) => column.visible);
      const hidden = props.columns.filter((column: Column) => !column.visible);
      return {
        visibleList: visible,
        hiddenList: hidden,
        selectedFilterId: (props.itemFilterConfig && props.itemFilterConfig.selectedItemId) || undefined,
      };
    }
    return null;
  }

  get texts(): { [k in Texts]: string | React.ReactNode } {
    const { texts, intl } = this.props;
    return {
      title: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.TITLE' }),
      searchPlaceholder: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.SEARCH-PLACEHOLDER' }),
      searchClearTooltip: intl.formatMessage({ id: 'DS.ITEM-FILTER.SEARCH-CLEAR' }),
      noResults: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.NO-RESULTS' }),
      searchResults: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.SEARCH-RESULTS' }),
      visible: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.VISIBLE' }),
      hidden: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.HIDDEN' }),
      saveView: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.SAVE-VIEW' }),
      cancel: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.CANCEL' }),
      apply: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.APPLY' }),
      fixedLeft: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.FIXED-LEFT' }),
      fixedRight: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.FIXED-RIGHT' }),
      clear: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.CLEAR' }),
      viewName: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.VIEW-NAME' }),
      viewDescription: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.VIEW-DESCRIPTION' }),
      viewNamePlaceholder: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.VIEW-NAME-PLACEHOLDER' }),
      viewDescriptionPlaceholder: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.VIEW-DESCRIPTION-PLACEHOLDER' }),
      mustNotBeEmpty: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.MUST-NOT-BE-EMPTY' }),
      ...texts,
    };
  }

  updateVisibleColumns = (newVisibleList: Column[]): void => {
    this.setState({
      visibleList: newVisibleList.map((column: Column): Column => ({ ...column, visible: true })),
    });
  };

  updateHiddenColumns = (newHiddenList: Column[]): void => {
    this.setState({
      hiddenList: newHiddenList.map((column: Column): Column => ({ ...column, visible: false })),
    });
  };

  hideColumn = (id: string): void => {
    const { visibleList, hiddenList } = this.state;
    const column = visibleList.find(col => col.id === id);
    column &&
      this.setState({
        visibleList: visibleList.filter(visibleColumn => visibleColumn.id !== column.id),
        hiddenList: [...hiddenList, { ...column, visible: false }],
      });
  };

  showColumn = (id: string): void => {
    const { visibleList, hiddenList } = this.state;
    const column = hiddenList.find(col => col.id === id);
    column &&
      this.setState({
        hiddenList: hiddenList.filter(hiddenColumn => hiddenColumn.id !== column.id),
        visibleList: [...visibleList, { ...column, visible: true }],
      });
  };

  toggleColumn = (id: string, columnVisible: boolean): void => {
    if (columnVisible) {
      this.hideColumn(id);
    } else {
      this.showColumn(id);
    }
  };

  setFixed = (id: string, fixed?: string): void => {
    const { visibleList } = this.state;
    this.setState({
      visibleList: visibleList.map(visibleColumn =>
        visibleColumn.id === id ? { ...visibleColumn, fixed } : visibleColumn
      ),
    });
  };

  hideItemFilter = (): void => {
    this.setState({
      itemFilterVisible: false,
    });
  };

  handleShowItemFilter = (): void => {
    this.setState({
      itemFilterVisible: true,
    });
  };

  handleSearchChange = (query: string): void => {
    this.setState({
      searchQuery: query,
    });
  };

  handleSave = (viewMeta: { name: string; description: string }): void => {
    const { onSave } = this.props;
    const { visibleList, hiddenList } = this.state;
    onSave({
      meta: viewMeta,
      columns: [...visibleList, ...hiddenList],
    });
  };

  handleApply = (): void => {
    const { onApply } = this.props;
    const { visibleList, hiddenList } = this.state;
    onApply([...visibleList, ...hiddenList]);
  };

  render(): React.ReactElement {
    const { visible, hide, itemFilterConfig } = this.props;
    const { visibleList, hiddenList, searchQuery, itemFilterVisible } = this.state;

    const searchResults = [...visibleList, ...hiddenList].filter(column =>
      column.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <S.ColumnManager visible={visible} width={338} onClose={hide}>
        <Drawer.DrawerHeader>
          <Drawer.DrawerHeaderBar>
            <Typography.Title style={{ flex: 1, margin: 0 }} level={4}>
              {this.texts.title}
            </Typography.Title>
            <Button
              data-testid="ds-column-manager-show-filters"
              type="ghost"
              mode="single-icon"
              onClick={this.handleShowItemFilter}
            >
              <Icon component={<FolderM />} />
            </Button>
            <Button
              data-testid="ds-column-manager-close"
              style={{ marginLeft: '8px' }}
              mode="single-icon"
              type="ghost"
              onClick={hide}
            >
              <Icon component={<CloseM />} />
            </Button>
          </Drawer.DrawerHeaderBar>
        </Drawer.DrawerHeader>
        <SearchBar
          onSearchChange={this.handleSearchChange}
          placeholder={this.texts.searchPlaceholder as string}
          value={searchQuery}
          onClearInput={(): void => this.handleSearchChange('')}
          iconLeft={<Icon component={<SearchM />} />}
          clearTooltip={(this.texts.searchClearTooltip as string) || ''}
        />
        <Scrollbar>
          <Drawer.DrawerContent style={{ padding: '0 0 80px' }}>
            <ColumnManagerList
              texts={this.texts}
              searchQuery={searchQuery}
              searchResults={searchResults}
              visibleList={visibleList}
              hiddenList={hiddenList}
              setFixed={this.setFixed}
              toggleColumn={this.toggleColumn}
              updateVisibleList={this.updateVisibleColumns}
              updateHiddenList={this.updateHiddenColumns}
            />
          </Drawer.DrawerContent>
        </Scrollbar>

        <ColumnManagerActions onSave={this.handleSave} onApply={this.handleApply} onCancel={hide} texts={this.texts} />
        {itemFilterConfig && (
          <ItemFilter {...itemFilterConfig} visible={itemFilterVisible} hide={this.hideItemFilter} />
        )}
      </S.ColumnManager>
    );
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default injectIntl(ColumnManager);
