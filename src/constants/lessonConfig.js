import { deepFreeze } from "../utils/objectUtils";

export const STAGES = {
  GREETING: "GREETING",
  INTRO: "INTRO",
  PERIOD: "PERIOD",
  META: "META",
  ESCAPE: "ESCAPE",
  SHORTHAND_DIGIT: "SHORTHAND_DIGIT",
  SHORTHAND_DIGIT_TEST: "SHORTHAND_DIGIT_TEST",
  SHORTHAND_NON_DIGIT_TEST: "SHORTHAND_NON_DIGIT_TEST"
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
  [STAGES.PERIOD]: {
    type: "TEST",
    text: [
      'The "." character matches any character.',
      'Type "i." to see what this means.'
    ],
    searchBody: '"Everything is not as it seems."',
    answer: "i."
  },
  [STAGES.META]: {
    type: "LESSON",
    text: [
      "Congratulations! You have learnt your first meta character; the humble dot.",
      "We're making good progress!"
    ]
  },
  [STAGES.ESCAPE]: {
    type: "TEST",
    text: [
      'Sometimes, we might want to search for a meta character. To do this, we use a "\\" beforehand.',
      "Try to match all the dots in the text."
    ],
    searchBody: '"Erm... it wasn\'t supposed to do that."',
    answer: "\\."
  },
  [STAGES.SHORTHAND_DIGIT]: {
    type: "LESSON",
    text: [
      'We can also use a "\\" infront of some normal characters to do special things.',
      'If we want to search for a digit for example, we can use "\\d".'
    ]
  },
  [STAGES.SHORTHAND_DIGIT_TEST]: {
    type: "TEST",
    text: ["Try to match all of the digits in the text."],
    searchBody: "Where am I going to find 50 pineapples in 20 minutes?",
    answer: "\\d"
  },
  [STAGES.SHORTHAND_NON_DIGIT_TEST]: {
    type: "TEST",
    text: [
      "If we use a capital D when searching for digits, we can match everything that ISN'T a digit.",
      "Try and find all the non digits in the encrypted text."
    ],
    searchBody:
      "284118204928WHERE123948954ARE123THE09820394PINEAPPLES12382822HIDDEN?31",
    answer: "\\D"
  }
});

export const MODULES_CONFIG = deepFreeze({
  [MODULES.WELCOME]: {
    stages: [
      STAGES.GREETING,
      STAGES.INTRO,
      STAGES.PERIOD,
      STAGES.META,
      STAGES.ESCAPE,
      STAGES.SHORTHAND_DIGIT,
      STAGES.SHORTHAND_DIGIT_TEST,
      STAGES.SHORTHAND_NON_DIGIT_TEST
    ]
  }
});
