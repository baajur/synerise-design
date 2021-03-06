import styled from 'styled-components';
import BaseAntInputNumber from 'antd/lib/input-number';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

export const AntdInputNumber = styled(BaseAntInputNumber)`
  color: ${(props): string => props.theme.palette['grey-700']};

  input,
  input:focus {
    ${(props: { error: boolean } & ThemeProps): string | false =>
      !!props.error &&
      `
      background: ${props.theme.palette['red-050']};
      border: 0;
    `};
  }
`;

export const ContentAbove = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const Label = styled.label`
  color: ${(props: ThemeProps): string => props.theme.palette['grey-800']};
  font-weight: 500;
  display: block;
  white-space: nowrap;
`;

export const Description = styled.div`
  color: ${(props: ThemeProps): string => props.theme.palette['grey-600']};
`;

export const ContentBelow = styled.div`
  margin-top: 8px;
`;

export const ErrorText = styled.div`
  color: ${(props: ThemeProps): string => props.theme.palette['red-600']};
  margin-bottom: 4px;
`;
