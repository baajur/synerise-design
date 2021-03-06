import * as React from 'react';

export type RelativeUnits = 'SECONDS' | 'MINUTES' | 'HOURS' | 'DAYS' | 'WEEKS' | 'MONTHS' | 'YEARS';

export interface DateFilter {
  type: 'ABSOLUTE' | 'RELATIVE' | 'SINCE';
  from?: string | Date;
  to?: string | Date;
  duration?: {
    type: RelativeUnits;
    value: number;
  };
  offset?: {
    type: RelativeUnits;
    value: number;
  };
}
export interface DateRangeBase {
  key?: string;
  future?: boolean;
  filter?: DateFilter;
  translationKey?: string;
  id?: React.ReactText;
  timestamp?: Date;
}

export interface AbsoluteDateRange extends DateRangeBase {
  from?: string | Date;
  to?: string | Date;
  type: 'ABSOLUTE';
}

export interface Duration {
  type: RelativeUnits;
  value: number;
}

export interface RelativeDateRange extends DateRangeBase {
  type: 'RELATIVE' | 'SINCE';
  offset: {
    type: RelativeUnits;
    value: number;
  };
  duration: Duration;
  from?: string | Date;
  to?: string | Date;
}

export type Days = { [key: string]: object };

export type DateRange = AbsoluteDateRange | RelativeDateRange;
