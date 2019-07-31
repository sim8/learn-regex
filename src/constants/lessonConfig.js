import { deepFreeze } from "../utils/objectUtils";

export const STAGES = {
  GREETING: "GREETING",
  INTRO: "INTRO",
  LEARN_PERIOD: "LEARN_PERIOD"
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
    text: [
      "And hello to you!",
      "Regex is a powerful tool for searching for patterns in strings.",
      '"Hello" is actually valid regex, though we can do much more.'
    ]
  },
  [STAGES.LEARN_PERIOD]: {
    type: "TEST",
    text: [
      'The "." character matches any character.',
      'Type ".s" to see what this means.'
    ],
    searchBody: '"Everything is not as it seems."',
    answer: "hello"
  }
});

export const MODULES_CONFIG = deepFreeze({
  [MODULES.WELCOME]: {
    stages: [STAGES.GREETING, STAGES.INTRO, STAGES.LEARN_PERIOD]
  }
});
