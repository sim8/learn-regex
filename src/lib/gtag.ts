/* global window */

import { GA_TRACKING_ID } from '../constants/trackingConstants';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (
  action: string,
  {
    category,
    label,
    value,
  }: {
    category?: string;
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
