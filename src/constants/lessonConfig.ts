import { Module, ModuleKey, Stage, StageKey } from '../types';

export const STAGE_TYPES = {
  INFO: 'INFO',
  REGEX: 'REGEX',
  CHOICE: 'CHOICE',
} as const;

export const STAGES = {
  SETS_INTRO: 'SETS_INTRO',
  SETS_VOWELS: 'SETS_VOWELS',
  SETS_CHOICE: 'SETS_CHOICE',
  SETS_REPEAT: 'SETS_REPEAT',
  SETS_RANGE: 'SETS_RANGE',
  SETS_DIGITS: 'SETS_DIGITS',
  SETS_COMBINED: 'SETS_COMBINED',
  SETS_NEGATED: 'SETS_NEGATED',
  SETS_NEGATED_CHOICE: 'SETS_NEGATED_CHOICE',
  SETS_PUNCTUATION: 'SETS_PUNCTUATION',
  SETS_HYPHEN: 'SETS_HYPHEN',
  SETS_CHALLENGE: 'SETS_CHALLENGE',

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
  QUANTIFIERS_INTRO: 'QUANTIFIERS_INTRO',
  ONE_OR_MORE: 'ONE_OR_MORE',
  ONE_OR_MORE_TEST: 'ONE_OR_MORE_TEST',
  OPTIONAL: 'OPTIONAL',
  OPTIONAL_TEST: 'OPTIONAL_TEST',
  ZERO_OR_MORE: 'ZERO_OR_MORE',
  QUANTIFIER_CHOICE: 'QUANTIFIER_CHOICE',
  EXACT_COUNT: 'EXACT_COUNT',
  COUNT_RANGE: 'COUNT_RANGE',
  MINIMUM_COUNT: 'MINIMUM_COUNT',
  QUANTIFIER_SCOPE: 'QUANTIFIER_SCOPE',
  QUANTIFIERS_CHALLENGE: 'QUANTIFIERS_CHALLENGE',
} as const;

export const MODULES = {
  BASICS: 'BASICS',
  CHARACTER_SETS: 'CHARACTER_SETS',
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
  [STAGES.QUANTIFIERS_INTRO]: {
    type: STAGE_TYPES.INFO,
    text: [
      'Back for more? Excellent. So is regex.',
      'Last time, we built patterns character by character. Three digits? We could write <span class="code">\\d\\d\\d</span>. Twelve digits? Our keyboard would like a word.',
      'Meet quantifiers. They tell regex how many times to repeat the character or shorthand just before them. Less typing. More matching. Lovely.',
    ],
  },
  [STAGES.ONE_OR_MORE]: {
    type: STAGE_TYPES.REGEX,
    text: [
      'First up: <span class="code">+</span> means ONE OR MORE.',
      'Put it after <span class="code">\\d</span> and we can grab a whole number, however many digits it has.',
      'Try <span class="code">\\d+</span> on this very reasonable shopping list.',
    ],
    searchBody: '3 pineapples, 12 cakes, 405 emergency biscuits',
    answer: '\\d+',
    acceptedAnswers: ['\\d{1,}'],
    successText: [
      'There we go! Each number is now one match. The + repeats the digit shorthand, so we no longer have to guess how long the number will be.',
    ],
    hint: 'A digit shorthand, followed by a plus. No need to escape the plus this time.',
  },
  [STAGES.ONE_OR_MORE_TEST]: {
    type: STAGE_TYPES.REGEX,
    text: [
      'Someone has been leaning on the space bar.',
      'Match each run of whitespace below. A single space should count too. You already know the shorthand; give it a little + power.',
    ],
    searchBody: 'one space   three spaces     five spaces',
    answer: '\\s+',
    acceptedAnswers: ['\\s{1,}'],
    hint: 'The whitespace shorthand from Basics is \\s.',
    successText: ['Space successfully located. All of it.'],
  },
  [STAGES.OPTIONAL]: {
    type: STAGE_TYPES.REGEX,
    text: [
      'Next: <span class="code">?</span> means ZERO OR ONE. In other words, optional.',
      'Put it after a character and that character can turn up once, or sit this one out.',
      'Type <span class="code">colou?r</span> to match both spellings below. International diplomacy, courtesy of regex.',
    ],
    searchBody: 'color colour',
    answer: 'colou?r',
    acceptedAnswers: ['colou{0,1}r'],
    hint: 'Only the u is optional. The r still needs to be there.',
    successText: [
      'Two spellings, one pattern. Nobody has to change their dictionary.',
    ],
  },
  [STAGES.OPTIONAL_TEST]: {
    type: STAGE_TYPES.REGEX,
    text: [
      'One duck. Several ducks. Same pond.',
      'Write one pattern that matches both words below. This time, you decide which character gets to be optional.',
    ],
    searchBody: 'duck ducks',
    answer: 'ducks?',
    acceptedAnswers: ['ducks{0,1}'],
    hint: 'Start with duck. The s is the bit that may or may not appear.',
    successText: ['Quacking stuff. The s can appear once or not at all.'],
  },
  [STAGES.ZERO_OR_MORE]: {
    type: STAGE_TYPES.REGEX,
    text: [
      '<span class="code">*</span> means ZERO OR MORE. Like +, but happy to accept none at all.',
      'Try <span class="code">ab*c</span> below. How many b characters do we need? As many as you like. Including zero.',
    ],
    searchBody: 'ac abc abbc abbbbbc',
    answer: 'ab*c',
    acceptedAnswers: ['ab{0,}c'],
    hint: 'The * repeats the b. The a and c still have to show up.',
    successText: [
      'Even ac gets in! Zero b characters is allowed.',
      'A pattern such as b* can also match an empty string. That is a valid match, just a rather difficult one to highlight. Here, the a and c keep our matches visible.',
    ],
  },
  [STAGES.QUANTIFIER_CHOICE]: {
    type: STAGE_TYPES.CHOICE,
    text: [
      'Quick b inspection.',
      'Which pattern matches BOTH abc and abbc, but finds NO match in ac?',
    ],
    choices: ['ab?c', 'ab+c', 'ab*c', 'abc'],
    answer: 1,
    successText: [
      'Yep! + insists on at least one b, and happily accepts a second helping.',
    ],
    failText: [
      '+ needs one or more b characters. ? allows at most one, * allows none, and plain abc only allows one. So ab+c is our winner.',
    ],
  },
  [STAGES.EXACT_COUNT]: {
    type: STAGE_TYPES.REGEX,
    text: [
      'Sometimes "more" is a bit vague. Enter <span class="code">{n}</span>: EXACTLY n repetitions.',
      'The tiny vault below has a four-digit code. Match the four digits using <span class="code">\\d{4}</span>.',
      'This finds four consecutive digits. It does not check that an entire input is only four digits long; we will meet that trick in a later lesson.',
    ],
    searchBody: 'Vault code: 8042. Please do not tell the biscuits.',
    answer: '\\d{4}',
    acceptedAnswers: ['\\d\\d\\d\\d', '\\d{4,4}'],
    hint: 'Curly braces hold the count. They do not need escaping when you use them as a quantifier.',
    successText: ['Click. Four digits, precisely. The biscuits remain secure.'],
  },
  [STAGES.COUNT_RANGE]: {
    type: STAGE_TYPES.REGEX,
    text: [
      'Want some wiggle room? <span class="code">{n,m}</span> means AT LEAST n, AT MOST m. Both ends count.',
      'Match every complete beep below: a b, between two and four e characters, then a p.',
      'The shortest and longest beeps should be left out. No earplugs required.',
    ],
    searchBody: 'bep beep beeep beeeep beeeeep',
    answer: 'be{2,4}p',
    hint: 'The e repeats. Put the lower and upper counts in braces straight after it, separated by a comma.',
    successText: ['Beep, beeep, beeeep. A perfectly acceptable amount of e.'],
  },
  [STAGES.MINIMUM_COUNT]: {
    type: STAGE_TYPES.REGEX,
    text: [
      'Leave the upper count blank and <span class="code">{n,}</span> means AT LEAST n, with no upper limit.',
      'Find the numbers with three or more digits below. Grab every digit of each one; the smaller numbers can stay put.',
    ],
    searchBody: '7 42 305 8042 12345',
    answer: '\\d{3,}',
    hint: 'Use the digit shorthand, then a minimum of 3. Keep the comma, but leave the upper limit empty.',
    successText: [
      'Big numbers, small pattern.',
      'You have met this idea already: {1,} means the same as +, and {0,} means the same as *. Handy little shortcuts, those two.',
    ],
  },
  [STAGES.QUANTIFIER_SCOPE]: {
    type: STAGE_TYPES.CHOICE,
    text: [
      'One last thing before we let you loose.',
      'In <span class="code">ha+</span>, which bit does the + repeat?',
    ],
    choices: [
      'The whole ha',
      'Only the a',
      'Only the h',
      'Whatever comes after it',
    ],
    answer: 1,
    successText: [
      'Exactly! We can match ha, haa, haaa... The + only repeats the a immediately before it.',
      'Repeating a whole chunk takes grouping. A treat for another lesson.',
    ],
    failText: [
      'Only the a repeats. A quantifier works on the character or shorthand immediately before it, so ha+ matches ha, haa, haaa...',
      'We will learn how to repeat a whole chunk when we meet grouping.',
    ],
  },
  [STAGES.QUANTIFIERS_CHALLENGE]: {
    type: STAGE_TYPES.REGEX,
    text: [
      'Final boss: the ticket machine. It has opinions about punctuation.',
      'Match each complete ticket: an R, exactly three digits, an optional literal dot, then an exclamation mark.',
      'Leave tickets with too few or too many digits alone. You have all the pieces. Time to put them together!',
    ],
    searchBody: 'R123! R456.! R78! R9012! R007.!',
    answer: 'R\\d{3}\\.?!',
    acceptedAnswers: [
      'R\\d\\d\\d\\.?!',
      'R\\d{3,3}\\.?!',
      'R\\d{3}\\.{0,1}!',
      'R\\d\\d\\d\\.{0,1}!',
    ],
    hint: 'Start with R, count three digits, then make an escaped dot optional. Finish with !, which is an ordinary character here.',
    successText: [
      'Tickets, please! R123!, R456.! and R007.! all make the cut.',
      'You can now say one, some, lots, or exactly how many. Not bad for a handful of squiggles.',
    ],
  },
  [STAGES.SETS_INTRO]: {
    type: 'INFO',
    text: [
      'So far, we can match a particular character, or reach for a shorthand like \\d.',
      'But what if we only want vowels? Or letters from a to f?',
      'Time to make our own little collection. Meet character sets.',
    ],
  },
  [STAGES.SETS_VOWELS]: {
    type: 'REGEX',
    text: [
      'Square brackets mean “match ONE of the characters inside.”',
      '[aeiou] matches one lowercase vowel. Any of them. We’re not taking sides.',
      'Try it on the robot’s lunch order.',
    ],
    searchBody: 'robot soup',
    answer: '[aeiou]',
    hint: 'Put all five lowercase vowels inside one pair of square brackets.',
    successText: [
      'Four vowels, four matches. Each outlined block is one character picked from our set.',
    ],
    acceptedAnswers: [],
  },
  [STAGES.SETS_CHOICE]: {
    type: 'CHOICE',
    text: [
      'Small brackets. Important distinction.',
      'We use [cat] on the text cat. What does regex find?',
    ],
    choices: [
      'One match: cat',
      'Three matches: c, a, t',
      'Two matches: ca, t',
      'No matches',
    ],
    answer: 1,
    successText: [
      'Exactly! The brackets offer a choice of characters. They don’t keep those characters together as a word.',
    ],
    failText: [
      'Each match takes ONE character from the set. So [cat] finds c, then a, then t: three separate matches.',
    ],
  },
  [STAGES.SETS_REPEAT]: {
    type: 'REGEX',
    text: [
      'Remember our friend +?',
      'Put a quantifier after a set and it repeats the whole choice. Each repetition can pick a different character from that set.',
      'Match every run of lowercase vowels below. Keep neighbouring vowels together in one match.',
    ],
    searchBody: 'queue for the moon',
    answer: '[aeiou]+',
    hint: 'Start with your vowel set. Then ask for one or more.',
    successText: [
      'ueue, o, e, oo. Quite the conversation.',
      'Notice that the letters in a match don’t have to be identical. They just have to belong to the set.',
    ],
    acceptedAnswers: [],
  },
  [STAGES.SETS_RANGE]: {
    type: 'REGEX',
    text: [
      'Listing the whole alphabet sounds like homework. Let’s not.',
      'Inside a set, a-z means every lowercase letter from a through z. Both ends count.',
      'Try [a-z]+ below. Watch what happens to Shhh.',
    ],
    searchBody: 'QUIET quiet Shhh 123',
    answer: '[a-z]+',
    hint: 'A lowercase range inside brackets, followed by one or more.',
    successText: [
      'quiet and hhh make the cut. The capital S stays behind.',
      'Ranges are case-sensitive, and a match can start partway through a word.',
    ],
    acceptedAnswers: [],
  },
  [STAGES.SETS_DIGITS]: {
    type: 'CHOICE',
    text: [
      'You’ve actually been using a ready-made set all along.',
      'Which pattern means the same thing as \\d: one digit from 0 to 9?',
    ],
    choices: ['[09]', '[0-9]+', '[0-9]', '[0-9]?'],
    answer: 2,
    successText: [
      'Yep! [0-9] and \\d both match one digit. Same job, different outfit.',
    ],
    failText: [
      '[0-9] includes every digit between 0 and 9. [09] only includes those two digits.',
      'Adding + or ? changes how many digits we can match.',
    ],
  },
  [STAGES.SETS_COMBINED]: {
    type: 'REGEX',
    text: [
      'Ranges can share a set. [a-zA-Z] allows lowercase OR uppercase letters.',
      'Match each run of letters below, whatever their case. Leave the numbers and spaces alone.',
    ],
    searchBody: 'Room 7 has WiFi and 2 ROBOTS',
    answer: '[a-zA-Z]+',
    hint: 'Both ranges go inside the same brackets. The quantifier goes outside.',
    successText: [
      'Mixed case? No problem. WiFi is one match, and the ROBOTS have been accounted for.',
    ],
    acceptedAnswers: ['[A-Za-z]+'],
  },
  [STAGES.SETS_NEGATED]: {
    type: 'REGEX',
    text: [
      'Put ^ immediately after the opening bracket and the set changes its mind.',
      '[^aeiou] means “one character that ISN’T a lowercase vowel.”',
      'Try it below. Keep an eye on the space.',
    ],
    searchBody: 'a b!2',
    answer: '[^aeiou]',
    hint: 'The ^ goes just inside the opening bracket, before the vowels.',
    successText: [
      'The space, b, exclamation mark and digit all match.',
      '“Not a vowel” doesn’t mean “a consonant.” Anything outside the set gets through.',
    ],
    acceptedAnswers: [],
  },
  [STAGES.SETS_NEGATED_CHOICE]: {
    type: 'CHOICE',
    text: [
      'We use [^0-9] on a7 ! (there’s a space before the exclamation mark).',
      'Which characters get matched?',
    ],
    choices: ['Only a', 'a and !', 'a, the space, and !', 'Only 7'],
    answer: 2,
    successText: [
      'Spot on. Only digits are excluded. Spaces and punctuation are still invited.',
    ],
    failText: [
      'This set excludes digits, not everything except letters. So a, the space and ! each match. The 7 doesn’t.',
    ],
  },
  [STAGES.SETS_PUNCTUATION]: {
    type: 'REGEX',
    text: [
      'Inside a set, . and ? are ordinary characters. No wildcard. No optional extra. Just punctuation.',
      'Match each run of dots and question marks below. Leave the exclamation mark alone.',
    ],
    searchBody: 'Wait... what? Really?!',
    answer: '[.?]+',
    hint: 'Put the two punctuation characters inside one set, then match one or more.',
    successText: [
      'Three dots together, then two separate question marks. The exclamation mark can wait its turn.',
      'Outside brackets, these symbols still have their usual special meanings.',
    ],
    acceptedAnswers: ['[?.]+', '[\\.?]+', '[.\\?]+', '[\\.\\?]+'],
  },
  [STAGES.SETS_HYPHEN]: {
    type: 'REGEX',
    text: [
      'A hyphen between characters can make a range. But sometimes we just want an actual hyphen.',
      'Put it last in the set and it stays literal.',
      'Try [+-] to find the plus and minus signs below.',
    ],
    searchBody: '8+3-2=9',
    answer: '[+-]',
    hint: 'Plus first, hyphen last. Both inside the brackets.',
    successText: [
      'Two signs, two matches. The plus is literal inside this set too.',
      'A hyphen can also go first: [-+] works just as well.',
    ],
    acceptedAnswers: ['[-+]', '[+\\-]', '[\\-+]'],
  },
  [STAGES.SETS_CHALLENGE]: {
    type: 'REGEX',
    text: [
      'The warehouse robots have mixed up the parcel labels. Naturally.',
      'Find each complete label: a capital A, B or C, exactly two digits, then a colon.',
      'Include the colon in each match. Leave the other labels behind.',
    ],
    searchBody: 'A12: B07: D55: C004: C42: A9:',
    answer: '[ABC][0-9]{2}:',
    hint: 'A set for the first letter, a digit shorthand or range with an exact count, then a literal colon.',
    successText: [
      'A12:, B07: and C42:. Parcels sorted. Robots looking suspiciously pleased with themselves.',
      'You can now choose which characters belong, which don’t, and how many to match.',
    ],
    acceptedAnswers: [
      '[ABC]\\d{2}:',
      '[A-C][0-9]{2}:',
      '[A-C]\\d{2}:',
      '[ABC]\\d\\d:',
      '[A-C]\\d\\d:',
    ],
  },
};

export const MODULES_CONFIG: Record<ModuleKey, Module> = {
  [MODULES.CHARACTER_SETS]: {
    id: MODULES.CHARACTER_SETS,
    name: 'Character Sets',
    pictureText: '[abc]',
    points: 300,
    stages: [
      STAGES.SETS_INTRO,
      STAGES.SETS_VOWELS,
      STAGES.SETS_CHOICE,
      STAGES.SETS_REPEAT,
      STAGES.SETS_RANGE,
      STAGES.SETS_DIGITS,
      STAGES.SETS_COMBINED,
      STAGES.SETS_NEGATED,
      STAGES.SETS_NEGATED_CHOICE,
      STAGES.SETS_PUNCTUATION,
      STAGES.SETS_HYPHEN,
      STAGES.SETS_CHALLENGE,
    ],
  },

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
    name: 'Quantifiers',
    pictureText: '123',
    points: 300,
    stages: [
      STAGES.QUANTIFIERS_INTRO,
      STAGES.ONE_OR_MORE,
      STAGES.ONE_OR_MORE_TEST,
      STAGES.OPTIONAL,
      STAGES.OPTIONAL_TEST,
      STAGES.ZERO_OR_MORE,
      STAGES.QUANTIFIER_CHOICE,
      STAGES.EXACT_COUNT,
      STAGES.COUNT_RANGE,
      STAGES.MINIMUM_COUNT,
      STAGES.QUANTIFIER_SCOPE,
      STAGES.QUANTIFIERS_CHALLENGE,
    ],
  },
};
