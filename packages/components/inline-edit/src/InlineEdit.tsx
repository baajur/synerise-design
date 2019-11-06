import * as React from 'react';
import AutosizeInput from 'react-input-autosize';
import Tooltip from '@synerise/ds-tooltip';
import Icon from '@synerise/ds-icon';
import EditM from '@synerise/ds-icon/dist/icons/EditM';
import { toCamelCase } from '@synerise/ds-utils';
import * as S from './InlineEdit.styles';
import { attachWidthWatcher } from './utils';

const SAMPLE = String.fromCharCode(...[...Array(26).keys()].map(i => i + 65));

export type InputProps = {
  name?: string;
  value: string | number;
  disabled?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onEnterPress?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  autoComplete?: string;
};

export interface InlineEditProps {
  size?: 'normal' | 'small';
  tooltipTitle?: string;
  className?: string;
  disabled?: boolean;
  input: InputProps;
  style?: { [key: string]: string | number };
  autoFocus?: boolean;
  error?: boolean;
  hideIcon?: boolean;
}

const InlineEdit: React.FC<InlineEditProps> = ({
  className,
  style,
  size = 'normal',
  disabled,
  autoFocus,
  hideIcon,
  tooltipTitle,
  error,
  input,
}): React.ReactElement => {
  const inputRef = React.useMemo(() => {
    return React.createRef<HTMLInputElement>();
  }, []);

  const fontStyleWatcher = React.useMemo(() => {
    return React.createRef<HTMLDivElement>();
  }, []);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      input.onChange(e);
    },
    [input]
  );

  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      input.onBlur && input.onBlur(e);
    },
    [input]
  );

  const handleKeyPress = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        input.onEnterPress && input.onEnterPress(e);
        inputRef.current && inputRef.current.blur();
      }
    },
    [input, inputRef]
  );

  const handleFocusInput = React.useCallback(() => {
    inputRef.current && inputRef.current.focus();
  }, [inputRef]);

  const updateInputWidth = React.useCallback(() => {
    if (inputRef.current) {
      (inputRef.current as any).copyInputStyles();
      (inputRef.current as any).updateInputWidth();
    }
  }, [inputRef]);

  React.useEffect(() => {
    autoFocus && inputRef.current && inputRef.current.focus();
    updateInputWidth();
    if (fontStyleWatcher) {
      attachWidthWatcher(fontStyleWatcher.current as any, updateInputWidth);
    }
  }, [autoFocus, fontStyleWatcher, inputRef, updateInputWidth]);

  return (
    <S.InPlaceEditableInputContainer
      className={className}
      style={style}
      size={size}
      disabled={disabled}
      error={error}
      emptyValue={input.value === ''}
    >
      <AutosizeInput
        id={input.name ? toCamelCase(input.name) : 'id'}
        className="autosize-input"
        placeholder={input.placeholder}
        maxLength={input.maxLength}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        name={input.name}
        value={input.value || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete={input.autoComplete}
        placeholderIsMinWidth={false}
        ref={inputRef as any}
      />
      {!hideIcon && (
        <Tooltip data-testid="inline-edit-icon" title={tooltipTitle}>
          <S.IconWrapper onClick={handleFocusInput} size={size}>
            <Icon component={<EditM />} size={20} />
          </S.IconWrapper>
        </Tooltip>
      )}
      <S.FontStyleWatcher
        ref={fontStyleWatcher}
        style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }}
      >
        {SAMPLE}
      </S.FontStyleWatcher>
    </S.InPlaceEditableInputContainer>
  );
};

export default InlineEdit;
