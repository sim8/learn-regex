export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID as string;

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
