export interface Rule {
  rule: string[];
  sentence: string[];
}

export interface LearnTimeModel {
  time: string;
  whenUses: string[];

  Positive: Rule;
  Negative: Rule;
  Question: Rule;

  rules: string[];
  timeWords: string[];
}

export interface timesToLearn {
  PresentSimple: LearnTimeModel;
  PresentContinuous: LearnTimeModel;
  PresentPerfect: LearnTimeModel;
  PresentPerfectContinuous: LearnTimeModel;
  PastSimple: LearnTimeModel;
  PastContinuous: LearnTimeModel;
  PastPerfect: LearnTimeModel;
  PastPerfectContinuous: LearnTimeModel;
  FutureSimple: LearnTimeModel;
  FutureContinuous: LearnTimeModel;
  FuturePerfect: LearnTimeModel;
  FuturePerfectContinuous: LearnTimeModel;
}
