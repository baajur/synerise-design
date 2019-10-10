import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, select, number } from '@storybook/addon-knobs';
import { DSProvider } from '@synerise/ds-core';
import Button from '@synerise/ds-button';
import Modal from '@synerise/ds-modal';

const sizes = {
  Auto: null,
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
  'Extra Large': 'extra_large'
};

const bodyBackgroundColors = {
  White: 'white',
  Grey: 'grey',
};

const props = () => ({
  wrapClassName: 'custom-class',
  visible: boolean('Open', true),
  title: text('Title text', 'Modal heading'),
  description: text('Description text', 'Modal description'),
  cancelText: text('Cancel text', 'Cancel'),
  okText: text('OK text', 'OK'),
  width: number('Width', 600),
  okType: text('OK style type', 'primary'),
  zIndex: number('zIndex', 1),
  closable: boolean('(x) button is visible on top right', true),
  confirmLoading: boolean('Loading visual effect', false),

  onOk: action('onOk CLICK'),
  onCancel: action('onCancel CLICK'),
  showHeaderAction: boolean('Show example of an additional header button', true),
  renderCustomFooter: boolean('Render custom footer', true),
  removeFooter: boolean('Render without footer', false),
  size: select('Size', sizes, null),
  bodyBackground: select('Body background color', bodyBackgroundColors, bodyBackgroundColors.White),
});

storiesOf('Components|Modal', module)
  .add('default', () => {
    const spread = props();

    return (
      <DSProvider code="en_GB">
        <>
          Some page content

          <Modal
            {...spread}
            footer={spread.removeFooter ? null :
              !spread.renderCustomFooter ? undefined :
                <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
                  <div style={{ width: '100%', display: 'flex' }}>
                    <Button type="secondary">
                      Settings
                    </Button>
                  </div>

                  <div style={{ display: 'flex' }}>
                    <Button type="secondary">
                      Cancel
                    </Button>

                    <Button type="primary" loading={props().confirmLoading}>
                      Apply
                    </Button>
                  </div>
                </div>
            }
            headerActions={
              props().showHeaderAction &&
                <Button type="ghost" onClick={() => window.alert('You just clicked on an additional header button')}>
                  Additional Button
                </Button>
            }
          >
            Some contents...
          </Modal>
        </>
      </DSProvider>
    )
});
