import {
  MODULES_CONFIG,
  MODULES,
  STAGES,
  STAGE_CONFIG,
} from '../constants/lessonConfig';
import makeStoreWithStateOverrides from '../testUtils/makeStoreWithStateOverrides';
import { getMatches, getHasError } from './input';

const stage = STAGE_CONFIG[STAGES.PERIOD];
if (stage.type !== 'REGEX' || !stage.searchBody) {
  throw new Error('Expected a regex stage with searchable text');
}
const searchBody = stage.searchBody;

function stateWithPattern(value: string) {
  return makeStoreWithStateOverrides({
    moduleProgress: {
      stageIndex: MODULES_CONFIG[MODULES.BASICS].stages.indexOf(STAGES.PERIOD),
    },
    input: { value, caretPos: value.length },
  }).getState();
}

function matchesFor(value: string) {
  const matches = getMatches(stateWithPattern(value));
  if (!matches) throw new Error(`Expected valid matches for ${value}`);
  return matches;
}

describe('regex question matching', () => {
  it('rejects a standalone asterisk without throwing', () => {
    const state = stateWithPattern('*');
    expect(getMatches(state)).toBe(false);
    expect(getHasError(state)).toBe(true);
  });

  it('finishes when a quantifier matches empty strings', () => {
    const matches = matchesFor('x*');
    expect(matches).toHaveLength(searchBody.length + 1);
    expect(matches.every((match) => match[0] === '')).toBe(true);
    expect(matches.map((match) => match.index)).toEqual(
      Array.from({ length: searchBody.length + 1 }, (_, index) => index),
    );
  });

  it('keeps nonempty matches and the trailing empty match', () => {
    const matches = matchesFor('.*');
    expect(matches.map((match) => [match[0], match.index])).toEqual([
      [searchBody, 0],
      ['', searchBody.length],
    ]);
  });

  it.each(['a*', 'i*', '(?=i)', '\\b', '^', '$'])(
    'finishes matching %s without reporting invalid regex',
    (pattern) => {
      const state = stateWithPattern(pattern);
      expect(matchesFor(pattern).length).toBeGreaterThan(0);
      expect(getHasError(state)).toBe(false);
    },
  );

  it('preserves ordinary matching and capture groups', () => {
    const matches = matchesFor('(it)');
    expect(matches).toHaveLength(1);
    expect(matches[0][0]).toBe('it');
    expect(matches[0][1]).toBe('it');
    expect(matches[0].index).toBe(searchBody.indexOf('it'));
  });
});
