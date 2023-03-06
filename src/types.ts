import { STAGE_TYPES, STAGES, MODULES } from './constants/lessonConfig';

export type StageKey = (typeof STAGES)[keyof typeof STAGES];
export type ModuleKey = (typeof MODULES)[keyof typeof MODULES];

export type RegexStage = {
  type: typeof STAGE_TYPES.REGEX;
  text: string[];
  searchBody?: string;
  answer: string;
  successText?: string[];
  hint?: string;
};

export type ChoiceStage = {
  type: typeof STAGE_TYPES.CHOICE;
  text: string[];
  answer: number;
  successText?: string[];
  failText?: string[];
  choices: string[];
};

type InfoStage = {
  type: typeof STAGE_TYPES.INFO;
  text: string[];
};

export type Stage = RegexStage | ChoiceStage | InfoStage;

export type Module = {
  id: ModuleKey;
  name: string;
  pictureText: string;
  points: number;
  stages: StageKey[];
  comingSoon?: boolean;
};
