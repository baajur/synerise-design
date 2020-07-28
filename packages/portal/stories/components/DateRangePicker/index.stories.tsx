import * as React from 'react';

import DateRangePicker from '@synerise/ds-date-range-picker';
import { RELATIVE_PRESETS } from '@synerise/ds-date-range-picker/dist/constants';
import { boolean } from '@storybook/addon-knobs';

const decorator = (storyFn) => (
  <div style={{ width: '100vw', position: 'absolute', left: '0', top: '5vh' }}>
    <div style={{ width: '300px', margin: 'auto' }}>{storyFn()}</div>
  </div>
);

const stories = {
  default: () => {
    const value = RELATIVE_PRESETS[0];
    const showTime = boolean('Set showTime', true);
    return (
      <DateRangePicker
        onApply={console.log}
        showTime={showTime}
        value={value}
        relativeFuture
        forceAbsolute
        texts={{
          startDatePlaceholder: 'Start date',
          endDatePlaceholder: 'End date',
        }}
      />
    );
  },
};

export default {
  name: 'Pickers|DateRangePicker',
  config: {},
  stories,
  decorator,
};
