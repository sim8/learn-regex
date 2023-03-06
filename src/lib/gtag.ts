/* global window */

import {
  GA_TRACKING_ID,
  ACTIONS,
  CATEGORIES,
} from '../constants/trackingConstants';

type TrackingAction = (typeof ACTIONS)[keyof typeof ACTIONS];
type TrackingCategory = (typeof CATEGORIES)[keyof typeof CATEGORIES];

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (
  action: TrackingAction,
  {
    category,
    label,
    value,
  }: {
    category?: TrackingCategory;
    label?: string;
    value?: number;
  } = {}
) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
