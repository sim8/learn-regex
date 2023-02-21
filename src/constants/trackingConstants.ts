export const GA_TRACKING_ID = 'UA-146906169-1';

export const ACTIONS = {
  COMPLETE_STAGE: 'complete-stage',
  MOVE_TO_NEXT_STAGE: 'move-to-next-stage',
  MOVE_TO_PREVIOUS_STAGE: 'move-to-previous-stage',
  COMPLETE_MODULE: 'complete-module',
} as const;

export const CATEGORIES = {
  STAGE: 'stage',
  MODULE: 'module',
} as const;
