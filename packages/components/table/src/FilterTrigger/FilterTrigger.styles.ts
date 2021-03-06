import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import Button from '@synerise/ds-button';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';

const buttonTransition = 'cubic-bezier(.645,.045,.355,1)';

export const FilterButton = styled(Button)<{ opened: boolean }>`
  &&& {
    transition: none;
    &:hover {
      color: ${(props): string => props.theme.palette['blue-600']};
      ${IconContainer} {
        svg {
          transition: all 0.3s ${buttonTransition};
          fill: ${(props): string => props.theme.palette['blue-600']} !important;
          color: ${(props): string => props.theme.palette['blue-600']} !important;
        }
      }
    }
    ${(props): FlattenInterpolation<ThemeProps<boolean>> | false =>
      props.opened &&
      css`
        transition: all 0.3s ${buttonTransition};
        &:focus {
          .btn-focus {
            box-shadow: none;
          }
        }
      `}
  }
`;

export const ClearButton = styled(Button)`
  &&& {
    ${IconContainer} {
      svg {
        fill: ${(props): string => props.theme.palette['red-600']};
        color: ${(props): string => props.theme.palette['red-600']};
      }
    }
    &:hover {
      ${IconContainer} {
        svg {
          fill: ${(props): string => props.theme.palette['red-600']} !important;
          color: ${(props): string => props.theme.palette['red-600']} !important;
        }
      }
    }
    &:focus {
      .btn-focus {
        box-shadow: none;
      }
    }
  }
`;

export const ListButton = styled(Button)`
  &&& {
    &:before {
      content: '';
      display: flex;
      position: absolute;
      left: 0;
      top: 0;
      width: 1px;
      height: 100%;
      opacity: 0.3;
      background-color: ${(props): string => props.theme.palette['grey-400']};
      z-index: 10;
    }
  }
`;

export const FilterButtonLabel = styled.span`
  max-width: 0;
  opacity: 0;
  width: 100%;
  visibility: hidden;
`;

export const FilterTrigger = styled.div<{ opened: boolean; selected?: object }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: ${(props): string => (props.opened ? '191px' : '32px')};
  height: 32px;
  position: relative;
  ${(props): FlattenInterpolation<ThemeProps<boolean>> | false =>
    props.opened &&
    css`
      &&& {
        ${FilterButtonLabel} {
          flex: 1;
          max-width: 100%;
          opacity: 1;
          visibility: visible;
        }
        ${FilterButton} {
          border-radius: 3px 0 0 3px;
          background-color: rgba(181, 189, 195, 0.15) !important;
        }
        ${ListButton} {
          min-width: 32px;
          border-radius: 0 3px 3px 0;
          background-color: rgba(181, 189, 195, 0.15) !important;
        }
        ${ClearButton} {
          background-color: transparent !important;
        }
      }
    `}

  ${(props): FlattenInterpolation<ThemeProps<boolean>> | false =>
    Boolean(props.selected) &&
    css`
      &&& {
        ${FilterButtonLabel} {
          flex: 1;
          max-width: 100%;
          opacity: 1;
          visibility: visible;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        ${FilterButton} {
          padding-right: 32px;
        }

        ${ClearButton} {
          background-color: transparent !important;
          position: absolute;
          right: 32px;
        }
      }
    `};

  button {
    background-color: ${(props): string =>
      props.opened ? props.theme.palette['grey-100'] : props.theme.palette.white};
  }
`;

export const FilterButtons = styled.div`
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
