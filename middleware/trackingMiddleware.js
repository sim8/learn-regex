import {
  APP_RENDERED_ON_CLIENT,
  MOVE_TO_PREVIOUS_STAGE,
  MOVE_TO_NEXT_STAGE,
  STAGE_COMPLETE,
  SUBMIT_ANSWER
} from "../actions/actionTypes";
import { getStageId } from "../selectors/progressSelectors";
import { event } from "../lib/gtag";
import { ACTIONS, CATEGORIES } from "../constants/trackingConstants";

let stageStartedTimestamp;

const trackingMiddleware = store => next => action => {
  const stageId = getStageId(store.getState());
  if (typeof performance !== "undefined") {
    if ([APP_RENDERED_ON_CLIENT, MOVE_TO_NEXT_STAGE].includes(action.type)) {
      // start timing stage
      stageStartedTimestamp = performance.now();
    } else if (
      [STAGE_COMPLETE, SUBMIT_ANSWER].includes(action.type) &&
      stageStartedTimestamp
    ) {
      // track stage completion
      const totalSeconds = Math.round(
        (performance.now() - stageStartedTimestamp) / 1000
      );
      event(ACTIONS.COMPLETE_STAGE, {
        category: CATEGORIES.STAGE,
        label: stageId,
        value: totalSeconds
      });
    }
  }
  if (action.type === MOVE_TO_NEXT_STAGE) {
    event(ACTIONS.MOVE_TO_NEXT_STAGE, {
      category: CATEGORIES.STAGE,
      label: stageId
    });
  } else if (action.type === MOVE_TO_PREVIOUS_STAGE) {
    event(ACTIONS.MOVE_TO_PREVIOUS_STAGE, {
      category: CATEGORIES.STAGE,
      label: stageId
    });
  }
  return next(action);
};

export default trackingMiddleware;
