import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import BaseAntInput from 'antd/lib/input';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as React from 'react';

const errorInputStyle = (props: ThemeProps): string => `
  && {
    border-color: ${props.theme.palette['red-600']};
    box-shadow: inset 0 0 0 1px ${props.theme.palette['red-600']};
    background: ${props.theme.palette['red-050']};
  }
`;

export const OuterWrapper = styled.div<{ resetMargin?: boolean }>`
  margin: ${(props): string => (props.resetMargin ? '0' : '0 0 24px 0')};
`;

export const Wrapper = styled.div`
  margin-bottom: 24px;
`;

interface InputWrapperProps {
  icon1: boolean;
  icon2: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  .ant-input {
    padding-right: ${(props): string => {
      if (props.icon1 && props.icon2) return '64px;';
      if (props.icon1 || props.icon2) return '36px;';
      return '12px';
    }};
  }
`;

export const IconsWrapper = styled.div<{ disabled?: boolean }>`
  position: absolute;
  right: 8px;
  top: 0;
  z-index: 1;
  height: 100%;

  .icon {
    svg {
      transition: 0.3s all;
      fill: ${(props): string => props.theme.palette['grey-600']};
      opacity: ${(props): string => (props.disabled ? '0.4' : '')};
    }
  }
`;

export const IconsFlexContainer = styled.div<{ type: string }>`
  ${(props): FlattenSimpleInterpolation => {
    if (props.type === 'input') {
      return css`
        display: flex;
        align-items: center;
        height: 100%;
      `;
    }

    return css`
      display: flex;
      align-items: flex-end;
      height: 100%;
      padding-bottom: 8px;
    `;
  }}
`;

// eslint-disable-next-line
export const AntdInput = styled(({ error, ...props }) => <BaseAntInput {...props} />)<{ error?: boolean }>`
  ${(props): string => (props.error ? errorInputStyle(props) : '')};

  && {
    color: ${(props): string => props.theme.palette['grey-700']};
  }
`;

// eslint-disable-next-line
export const AntdTextArea = styled(({ error, ...props }) => <BaseAntInput.TextArea {...props} />)<{ error?: boolean }>`
  ${(props): string => (props.error ? errorInputStyle(props) : '')};

  && {
    color: ${(props): string => props.theme.palette['grey-700']};
  }
`;

export const ContentBelow = styled.div`
  margin-top: 8px;
`;

export const ErrorText = styled.div`
  color: ${(props): string => props.theme.palette['red-600']};
  margin-bottom: 4px;
`;

export const Label = styled.label`
  color: ${(props): string => props.theme.palette['grey-800']};
  font-weight: 500;
  display: block;
`;

export const Counter = styled.div`
  font-weight: 500;
`;

export const Description = styled.div`
  color: ${(props): string => props.theme.palette['grey-500']};
`;

export const ContentAbove = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;