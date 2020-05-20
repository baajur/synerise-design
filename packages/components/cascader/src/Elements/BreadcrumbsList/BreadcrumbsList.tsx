import * as React from 'react';
import Menu from '@synerise/ds-menu';

export interface BreadcrumbsListProps {
  paths: string[][];
  highlight?: string;
}

const BreadcrumbsList: React.FC<BreadcrumbsListProps> = ({paths,highlight }) => {
  return (
    <React.Fragment>
      {paths.map(path => (
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        <Menu.Breadcrumb path={path} key={String(path.flat())} highlight={highlight} />
      ))}
    </React.Fragment>
  );
};
export default BreadcrumbsList;
