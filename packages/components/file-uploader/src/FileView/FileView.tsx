import * as React from 'react';
import filesize from 'filesize.js';
import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import Close3M from '@synerise/ds-icon/dist/icons/Close3M';
import ProgressBar from '@synerise/ds-progress-bar';
import Tooltip from '@synerise/ds-tooltip';
import * as S from './FileView.styles';
import { FileViewProps } from './FileView.types';

const FileView: React.FC<FileViewProps> = ({ data, texts, onRemove, removable }) => {
  const previewableMimeTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/svg+xml'];

  const getFriendlySize = (size?: number): string => filesize(size || 0);

  const { disabled, error, file, progress } = data;
  const fileSource = React.useMemo(() => URL.createObjectURL(data.file), [data]);

  const hasError = !!error;
  const hasProgress = typeof progress === 'number';

  return (
    <S.FileViewContainer disabled={disabled} error={hasError} removable={removable} type="button">
      {previewableMimeTypes.indexOf(file.type) > -1 ? (
        <S.PreviewImage source={fileSource} />
      ) : (
        <S.PlaceholderImage>
          <Icon component={<FileM />} size={24} />
        </S.PlaceholderImage>
      )}

      <S.Info>
        {hasProgress ? (
          <>
            <S.Name>{texts.uploading}</S.Name>
            <ProgressBar amount={100} percent={60} />
          </>
        ) : (
          <>
            <S.Name>{file.name}</S.Name>

            <S.SizeOrError>
              {error || (
                <>
                  {texts.size} {getFriendlySize(file.size)}
                </>
              )}
            </S.SizeOrError>
          </>
        )}
      </S.Info>

      {removable && !disabled && (
        <S.RemoveButtonWrapper onClick={onRemove} data-testid="fileview-remove">
          <Tooltip title={texts.removeTooltip}>
            <Icon component={<Close3M />} size={24} />
          </Tooltip>
        </S.RemoveButtonWrapper>
      )}
    </S.FileViewContainer>
  );
};

export default FileView;
