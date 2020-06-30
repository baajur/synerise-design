import styled from 'styled-components';

export const Container = styled.div`
  width: 600px;
  background-color: white;
  user-select: none;
`;

export const Separator = styled.div`
  margin: 16px;
  border-top: 1px dotted ${(props): string => props.theme.palette['grey-600']};
`;

export const Addon = styled.div`
  margin: 16px;
`;
