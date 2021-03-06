import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { CloseS } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { Props, TagShape } from './Tag.types';
import * as S from './Tag.styles';

const Tag: React.FC<Props> = ({
  id,
  name,
  className,
  disabled,
  removable,
  image,
  shape,
  color,
  textColor,
  onRemove,
  onClick,
  prefixel,
  suffixel,
}: Props) => {
  const isDefaultType = shape && [TagShape.DEFAULT_ROUND, TagShape.DEFAULT_SQUARE].includes(shape);
  const isDefaultRound = shape === TagShape.DEFAULT_ROUND;
  const isDefaultSquare = shape === TagShape.DEFAULT_SQUARE;
  const isStatusShape =
    shape &&
    [TagShape.STATUS_ERROR, TagShape.STATUS_NEUTRAL, TagShape.STATUS_SUCCESS, TagShape.STATUS_WARNING].includes(shape);
  const isRemovable = removable && (isDefaultRound || isDefaultSquare);
  const isActionable = !disabled && isRemovable;

  const onRemoveCall = (): void | false => !!onRemove && !!id && onRemove(id);
  const renderPrefixel = (): React.ReactNode => {
    if (typeof prefixel === 'string' || typeof prefixel === 'number') {
      return <S.PrefixWrapper>{prefixel}</S.PrefixWrapper>;
    }
    return <S.DefaultPrefixWrapper>{prefixel}</S.DefaultPrefixWrapper>;
  };
  const renderSuffixel = (): React.ReactNode => {
    if (typeof suffixel === 'string' || typeof suffixel === 'number') {
      return <S.SuffixWrapper>{suffixel}</S.SuffixWrapper>;
    }
    return <S.DefaultSuffixWrapper>{suffixel}</S.DefaultSuffixWrapper>;
  };

  return (
    <S.Tag
      className={`ds-tag ${className ?? ''}`}
      isStatusShape={isStatusShape}
      shape={shape}
      color={color}
      textColor={textColor}
      removable={removable}
      disabled={disabled}
      isActionable={isActionable}
      onClick={onClick}
      data-testid={typeof id !== 'undefined' ? `tag-${id}` : 'tag'}
      preffixel={!!prefixel}
      suffixel={!!suffixel}
      hasImage={!!image}
    >
      <S.Content>
        {image && isDefaultType && <img src={image} alt="" />}
        {!!prefixel && renderPrefixel()}
        <S.TagName>{name}</S.TagName>
        {!!suffixel && renderSuffixel()}
        {isRemovable && (
          <S.RemoveButton onClick={onRemoveCall} data-testid="remove-btn">
            <Icon className="icon" component={<CloseS />} size={24} color={theme.palette.white} />
          </S.RemoveButton>
        )}
      </S.Content>
    </S.Tag>
  );
};

Tag.defaultProps = {
  shape: TagShape.DEFAULT_ROUND && TagShape.DEFAULT_SQUARE,
};

export default Tag;
