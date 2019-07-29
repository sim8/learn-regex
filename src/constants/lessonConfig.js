import { deepFreeze } from "../utils/objectUtils";

export const STAGES = {
  GREETING: "GREETING",
  INTRO: "INTRO"
};

export const MODULES = {
  WELCOME: "WELCOME"
};

export const STAGE_CONFIG = deepFreeze({
  [STAGES.GREETING]: {
    type: "TEST",
    text: [
      "Welcome to Learn Regex!",
      'Type "hello" then hit Enter to get started.'
    ],
    answer: "hello"
  },
  [STAGES.INTRO]: {
    type: "LESSON",
    text: ["And hello to you!"]
  }
});

export const MODULES_CONFIG = deepFreeze({
  [MODULES.WELCOME]: {
    stages: [STAGES.GREETING, STAGES.INTRO]
  }
});
