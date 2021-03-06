import styled from 'styled-components';

export const DayShortname = styled.span`
  font-weight: 500;
  color: ${(props): string => props.theme.palette['grey-800']};
`;
export const TitleWrapper = styled.div`
  color: ${(props): string => props.theme.palette['grey-700']};
  display: flex;
  flex-wrap: wrap;
`;
