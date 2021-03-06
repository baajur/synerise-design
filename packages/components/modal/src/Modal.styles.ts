import styled from 'styled-components';
import Typography from '@synerise/ds-typography';
import { ModalProps } from 'antd/lib/modal';
import Modal from 'antd/lib/modal/Modal';

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  && {
    .close-modal {
      line-height: 1;
    }
  }
`;

export const Title = styled(Typography.Title)`
  width: 100%;
  color: ${(props): string => props.theme.palette['grey-800']};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  && {
    margin: 0;
  }
`;

export const Description = styled.div`
  font-weight: normal;
  display: block;
  padding: 12px 0 0;
  margin: 14px 0 0;

  background-image: linear-gradient(
    to right,
    ${(props): string => props.theme.palette['grey-300']} 33%,
    rgba(255, 255, 255, 0) 0%
  );
  background-repeat: repeat-x;
  background-size: 4px 1px;
  background-position: top;
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .ant-btn {
    margin: 0 4px;
  }
  .close-modal {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
export const AntdModal = styled(Modal)<ModalProps>``;
