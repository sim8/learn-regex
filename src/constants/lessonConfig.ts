import { Module, ModuleKey, Stage, StageKey } from '../types';

export const STAGE_TYPES = {
  INFO: 'INFO',
  REGEX: 'REGEX',
  CHOICE: 'CHOICE',
} as const;

export const STAGES = {
  GREETING: 'GREETING',
  INTRO: 'INTRO',
  LANGUAGE_CHOICE: 'LANGUAGE_CHOICE',
  BASIC_FORM: 'BASIC_FORM',
  PERIOD: 'PERIOD',
  META: 'META',
  ESCAPE: 'ESCAPE',
  SHORTHAND_DIGIT: 'SHORTHAND_DIGIT',
  SHORTHAND_DIGIT_TEST: 'SHORTHAND_DIGIT_TEST',
  SHORTHAND_NON_DIGIT_TEST: 'SHORTHAND_NON_DIGIT_TEST',
  ESCAPE_CHOICE: 'ESCAPE_CHOICE',
  SHORTHAND_ALL: 'SHORTHAND_ALL',
  SHORTHAND_ALL_NEGATED: 'SHORTHAND_ALL_NEGATED',
  SHORTHAND_WHITESPACE_TEST: 'SHORTHAND_WHITESPACE_TEST',
  SHORTHAND_NON_ALPHANUMERIC_TEST: 'SHORTHAND_NON_ALPHANUMERIC_TEST',
  BASIC_SEQUENCE: 'BASIC_SEQUENCE',
  BASIC_SEQUENCE_TEST: 'BASIC_SEQUENCE_TEST',
  BASIC_SEQUENCE_2_TEST: 'BASIC_SEQUENCE_2_TEST',
} as const;

export const MODULES = {
  BASICS: 'BASICS',
  QUANTIFIERS: 'QUANTIFIERS',
  // LOGIC: 'LOGIC',
} as const;

export const STAGE_CONFIG: Record<StageKey, Stage> = {
  [STAGES.GREETING]: {
    type: STAGE_TYPES.REGEX,
    text: [
      'Welcome to Learn Regex!',
      'Type "hello" then hit Enter to get started.',
    ],
    answer: 'hello',
  },
  [STAGES.INTRO]: {
    type: STAGE_TYPES.INFO,
    text: [
      'And hello to you!',
      'Regex is a powerful tool for finding patterns in text. It can be used for searching, data validation, data manipulation, and much more. Better still, it can be used across any programming language.',
      '<span class="code">hello</span> is actually valid regex, though we can do much more.',
    ],
  },
  [STAGES.BASIC_FORM]: {
    type: STAGE_TYPES.INFO,
    text: [
      'Typing <span class="code">hello</span> will literally find the word "hello" in a given string. Similarly, typing <span class="code">123</span> will find every match for "123".',
      "This isn't very useful by itself - let's add some special characters to make this more powerful.",
    ],
  },
  [STAGES.LANGUAGE_CHOICE]: {
    type: STAGE_TYPES.CHOICE,
    text: ['Which programming languages can regex be used in?'],
    successText: [
      'Go you! What makes regex so useful is that it can be used in any language.',
    ],
    failText: [
      'What makes regex so useful is that it can be used in any language.',
    ],
    choices: ['Java', 'Python', 'Javascript', 'All the above'],
    answer: 3,
  },
  [STAGES.PERIOD]: {
    type: STAGE_TYPES.REGEX,
    text: [
      'The "." character matches any character.',
      'Type <span class="code">i.</span> to see what this means.',
    ],
    successText: [
      'Nice! Notice how we have matched every two-character string starting with an "i".',
    ],
    searchBody: '"Everything is not as it seems."',
    answer: 'i.',
  },
  [STAGES.META]: {
    type: STAGE_TYPES.INFO,
    text: [
      'Congratulations! You have learnt your first meta character; the humble dot.',
      "We're making good progress!",
    ],
  },
  [STAGES.ESCAPE]: {
    type: STAGE_TYPES.REGEX,
    text: [
      'Sometimes, we might want to search for a meta character. To do this, we use a "\\" beforehand to escape it.',
      'Try to match all the dots in the text.',
    ],
    successText: [
      'Awesome! You could do the same with "?" to match the question mark.',
    ],
    searchBody: '"So... you don\'t want the cake?"',
    hint: 'Escaped meta-characters might look like this: \\( \\$ \\}',
    answer: '\\.',
  },
  [STAGES.SHORTHAND_DIGIT]: {
    type: STAGE_TYPES.INFO,
    text: [
      'We can also use a "\\" infront of some normal characters to do special things.',
      'If we want to search for a digit for example, we can use <span class="code">\\d</span>.',
    ],
  },
  [STAGES.SHORTHAND_DIGIT_TEST]: {
    type: STAGE_TYPES.REGEX,
    text: ['Try to match all of the digits in the text.'],
    successText: ['You rock!'],
    searchBody: 'Where am I going to find 50 pineapples in 20 minutes?',
    hint: '*cough* previous page *cough*',
    answer: '\\d',
  },
  [STAGES.SHORTHAND_NON_DIGIT_TEST]: {
    type: STAGE_TYPES.REGEX,
    text: [
      "If we use a capital D when searching for digits, we can match everything that ISN'T a digit.",
      'Try and find all the non digits in the encrypted text.',
    ],
    successText: [
      'Woo! <span class="code">\\d</span> is one of three shorthand characters. Let\'s meet the others.',
    ],
    searchBody:
      '284118204928WHERE123948954ARE123THE09820394PINEAPPLES12382822HIDDEN?31',
    answer: '\\D',
  },
  [STAGES.ESCAPE_CHOICE]: {
    type: STAGE_TYPES.CHOICE,
    text: ['Which character is used to escape a meta character?'],
    successText: ['Nice work!'],
    failText: [
      '<span class="code">\\</span> is used to escape meta characters. For example, we would us <span class="code">\\$</span> to find all the dollar signs.',
    ],
    choices: ['\\', '.', '\\d', '!'],
    answer: 0,
  },
  [STAGES.SHORTHAND_ALL]: {
    type: STAGE_TYPES.INFO,
    text: [
      '<span class="code">\\d</span> matches digits, like 4, 7, or 0.',
      '<span class="code">\\w</span> matches alphanumeric characters, which could be a number or letter.',
      '<span class="code">\\s</span> matches whitespace (space, linebreak, or tab).',
    ],
  },
  [STAGES.SHORTHAND_ALL_NEGATED]: {
    type: STAGE_TYPES.INFO,
    text: [
      'You best believe it...',
      '<span class="code">\\D</span> matches NON digits (a, ., %)',
      '<span class="code">\\W</span> matches NON alphanumeric characters (?, $, ")',
      '<span class="code">\\S</span> matches NON whitespace (K, 7, !)',
    ],
  },
  [STAGES.SHORTHAND_WHITESPACE_TEST]: {
    type: STAGE_TYPES.REGEX,
    text: ['Find all the whitespace in the text.'],
    successText: ['Killing it.'],
    searchBody: 'Read between the lines...',
    answer: '\\s',
  },
  [STAGES.SHORTHAND_NON_ALPHANUMERIC_TEST]: {
    type: STAGE_TYPES.REGEX,
    text: ['Find all the NON alphanumeric characters.'],
    successText: ['Sonic BOOM!'],
    searchBody: 'ABC 123!@£)(* asdf ???',
    answer: '\\W',
  },
  [STAGES.BASIC_SEQUENCE]: {
    type: STAGE_TYPES.INFO,
    text: [
      "We're nearly there!",
      "Everything we've learnt so far can be combined in a sequence, to match a sequence of characters.",
      'For example, <span class="code">\\w\\d</span> will match any alphanumeric character followed by any digit.',
    ],
  },
  [STAGES.BASIC_SEQUENCE_TEST]: {
    type: STAGE_TYPES.REGEX,
    text: ['Find every digit followed by a space.'],
    successText: ['Wahoo! One more to go!'],
    searchBody: '8SS 1 H2 93 16B 4 5 7K6 K',
    answer: '\\d\\s',
  },
  [STAGES.BASIC_SEQUENCE_2_TEST]: {
    type: STAGE_TYPES.REGEX,
    text: [
      'Find every NON-alphanumeric character, followed by ANY character, followed by a dot.',
    ],
    successText: ['Heck yeah!'],
    searchBody: 'sdf23l.kj?l.3sdl)^fk..1sdf8',
    hint: 'A dot matches any character. Any meta-character can be searched for by putting a backslash in front of it.',
    answer: '\\W.\\.',
  },
};

export const MODULES_CONFIG: Record<ModuleKey, Module> = {
  [MODULES.BASICS]: {
    id: MODULES.BASICS,
    name: 'Basics',
    pictureText: '\\\\',
    points: 300,
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
      STAGES.SHORTHAND_NON_DIGIT_TEST,
      STAGES.ESCAPE_CHOICE,
      STAGES.SHORTHAND_ALL,
      STAGES.SHORTHAND_ALL_NEGATED,
      STAGES.SHORTHAND_WHITESPACE_TEST,
      STAGES.SHORTHAND_NON_ALPHANUMERIC_TEST,
      STAGES.BASIC_SEQUENCE,
      STAGES.BASIC_SEQUENCE_TEST,
      STAGES.BASIC_SEQUENCE_2_TEST,
    ],
  },
  [MODULES.QUANTIFIERS]: {
    id: MODULES.QUANTIFIERS,
    comingSoon: true,
    name: 'Quantifiers',
    pictureText: '123',
    points: 300,
    stages: [],
  },
};
