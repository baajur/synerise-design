import styled, { css } from 'styled-components';
import { TagShape } from './Tag';

const defaultStatusStyles = css`
  border-radius: 8px;
  font-size: 10px;
  height: 16px;
  line-height: 14px;
  text-transform: uppercase;
  padding: 0 8px;
`;

const insertShapeStyles = (props): string => {
  switch (props.shape) {
    case TagShape.SMALL_SQUARE:
      return css`
        color: ${props.textColor || '#fff'};
        border-radius: 3px;
        font-size: 10px;
        height: 16px;
        line-height: 16px;
        text-transform: uppercase;
        font-weight: 500;
        padding: 0 4px;
      `;

    case TagShape.SMALL_ROUND:
      return css`
        color: ${props.textColor || '#fff'};
        border-radius: 8px;
        font-size: 10px;
        height: 16px;
        line-height: 16px;
        text-transform: uppercase;
        padding: 0 4px;
      `;

    case TagShape.DEFAULT_ROUND:
      return css`
        color: ${props.textColor || '#fff'};
        border-radius: 12px;
        font-size: 13px;
        height: 24px;
        line-height: 24px;

        padding: ${props.removable ? '0' : '0 12px'};

        span {
          padding: ${props.removable ? '0 0 0 12px' : '0'};
        }
      `;

    case TagShape.DEFAULT_SQUARE:
      return css`
        color: ${props.textColor || '#fff'};
        border-radius: 3px;
        font-size: 13px;
        height: 24px;
        line-height: 24px;
        padding: 0 8px;
      `;

    case TagShape.SINGLE_CHARACTER_SQUARE:
      return css`
        color: ${props.textColor || '#fff'};
        border-radius: 12px;
        font-size: 13px;
        height: 24px;
        width: 24px;
        line-height: 24px;
        justify-content: center;
      `;

    case TagShape.SINGLE_CHARACTER_ROUND:
      return css`
        color: ${props.textColor || '#fff'};
        border-radius: 3px;
        font-size: 13px;
        height: 24px;
        width: 24px;
        line-height: 24px;
        justify-content: center;
      `;

    case TagShape.STATUS_NEUTRAL:
      return css`
        border: 1px solid ${props.color || props.theme.palette['grey-500']};
        color: ${props.textColor || props.color || props.theme.palette['grey-500']};
        ${defaultStatusStyles}
      `;

    case TagShape.STATUS_SUCCESS:
      return css`
        border: 1px solid ${props.theme.palette['green-600']};
        color: ${props.theme.palette['green-600']};
        ${defaultStatusStyles}
      `;

    case TagShape.STATUS_ERROR:
      return css`
        border: 1px solid ${props.theme.palette['red-600']};
        color: ${props.theme.palette['red-600']};
        ${defaultStatusStyles}
      `;

    case TagShape.STATUS_WARNING:
      return css`
        border: 1px solid ${props.theme.palette['yellow-600']};
        color: ${props.theme.palette['yellow-600']};
        ${defaultStatusStyles}
      `;

    default:
      return css``;
  }
};

export const Tag = styled.div<{ shape: string; color: string; textColor: string; removable: boolean }>`
  position: relative;
  margin: 4px;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  overflow: hidden;

  ${insertShapeStyles}

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props): string => props.color || props.theme.palette['grey-500']};
  }

  &:hover:before {
    filter: brightness(90%);
  }

  div.content {
    position: relative;
  }

  img {
    width: 18px;
    height: 18px;
    margin: 3px 4px 0 0;
  }

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  button {
    color: #fff;
    height: 18px;
    width: 18px;
    border-radius: 10px;
    padding: 0;
    border: none;
    outline: none;
    margin: 3px 3px 3px 7px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    > div {
      position: relative;
      line-height: 16px;
      width: 100%;
      height: 100%;
    }

    &:before {
      background-color: ${(props): string => props.color || props.theme.palette['grey-500']};
      filter: brightness(70%);
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &:hover:before {
      filter: brightness(60%);
    }
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

export const DeleteButton = styled.div``;
