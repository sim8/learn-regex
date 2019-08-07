import { deepFreeze } from "../utils/objectUtils";

export const STAGE_TYPES = {
  INFO: "INFO",
  REGEX: "REGEX",
  CHOICE: "CHOICE"
};

export const STAGES = {
  GREETING: "GREETING",
  INTRO: "INTRO",
  LANGUAGE_CHOICE: "LANGUAGE_CHOICE",
  BASIC_FORM: "BASIC_FORM",
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
    type: STAGE_TYPES.REGEX,
    text: [
      "Welcome to Learn Regex!",
      'Type "hello" then hit Enter to get started.'
    ],
    answer: "hello"
  },
  [STAGES.INTRO]: {
    type: STAGE_TYPES.INFO,
    text: [
      "And hello to you!",
      "Regex is a powerful tool for finding patterns in text. It can be used for searching, data validation, data manipulation, and much more. Better still, it can be used across any programming language.",
      '"Hello" is actually valid regex, though we can do much more.'
    ]
  },
  [STAGES.BASIC_FORM]: {
    type: STAGE_TYPES.INFO,
    text: [
      'Typing "hello" will literally find the word "hello" in a given string. Similarly, typing "123" will find every match for "123".',
      "This isn't very useful by itself - let's add some special characters to make this more powerful."
    ]
  },
  [STAGES.LANGUAGE_CHOICE]: {
    type: STAGE_TYPES.CHOICE,
    text: ["Which programming languages can regex be used in?"],
    successText: [
      "Go you! What makes regex so useful is that it can be used in any language."
    ],
    failText: [
      "What makes regex so useful is that it can be used in any language."
    ],
    choices: ["Java", "Python", "Javascript", "All the above"],
    answer: 3
  },
  [STAGES.PERIOD]: {
    type: STAGE_TYPES.REGEX,
    text: [
      'The "." character matches any character.',
      'Type "i." to see what this means.'
    ],
    successText: [
      'Nice! Notice how we have matched every two-character string starting with an "i".'
    ],
    searchBody: '"Everything is not as it seems."',
    answer: "i."
  },
  [STAGES.META]: {
    type: STAGE_TYPES.INFO,
    text: [
      "Congratulations! You have learnt your first meta character; the humble dot.",
      "We're making good progress!"
    ]
  },
  [STAGES.ESCAPE]: {
    type: STAGE_TYPES.REGEX,
    text: [
      'Sometimes, we might want to search for a meta character. To do this, we use a "\\" beforehand to escape it.',
      "Try to match all the dots in the text."
    ],
    searchBody: '"Erm... it wasn\'t supposed to do that."',
    hint: "Escaped meta-characters might looks like this: \\( \\$ \\}",
    answer: "\\."
  },
  [STAGES.SHORTHAND_DIGIT]: {
    type: STAGE_TYPES.INFO,
    text: [
      'We can also use a "\\" infront of some normal characters to do special things.',
      'If we want to search for a digit for example, we can use "\\d".'
    ]
  },
  [STAGES.SHORTHAND_DIGIT_TEST]: {
    type: STAGE_TYPES.REGEX,
    text: ["Try to match all of the digits in the text."],
    searchBody: "Where am I going to find 50 pineapples in 20 minutes?",
    answer: "\\d"
  },
  [STAGES.SHORTHAND_NON_DIGIT_TEST]: {
    type: STAGE_TYPES.REGEX,
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
      STAGES.LANGUAGE_CHOICE,
      STAGES.BASIC_FORM,
      STAGES.PERIOD,
      STAGES.META,
      STAGES.ESCAPE,
      STAGES.SHORTHAND_DIGIT,
      STAGES.SHORTHAND_DIGIT_TEST,
      STAGES.SHORTHAND_NON_DIGIT_TEST
    ]
  }
});
