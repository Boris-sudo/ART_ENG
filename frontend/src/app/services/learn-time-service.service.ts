import { Injectable } from '@angular/core';
import { timesToLearn, LearnTimeModel, Rule } from "../models/LearnTimeModel";

const LENGTH=12;

@Injectable({
  providedIn: 'root'
})
export class LearnTimeServiceService {
  private timesArray:timesToLearn={
    PresentSimple: {
      time: "Present Simple - «настоящее простое»",
      whenUses: [
        "Законы природы — то, что всегда правда",
        "Факты",
        "Регулярные действия",
        "Расписание",
      ],

      Positive: {
        sentence: [

          "Мест. (I, we, you, they) + V",
          "Мест. (he, she, it) + Vs"
        ],
        rule: [

          "They play tennis every weekend",
          "He plays tennis every weekend"
        ],
      },
      Negative: {
        sentence: [

          "Мест. (I, we, you, they) + do + not + V",
          "Мест. (he, she, it) + does + not + V"
        ],
        rule: [ "They do not play tennis every weekend", "He does not play tennis every weekend"],
      },
      Question: {
        sentence: [ "Do + мест. (I, we, you, they) + V", "Does + мест. (he, she, it) + V"],
        rule: ["Do they play tennis every weekend?", "Does he play tennis every weekend?"],
      },

      rules: [
        "Do - I , we , you , they",
        "Does - he , she , it",
        "I, we, you, they + V",
        "He, she, it + Vs"],
      timeWords: [
        "always - всегда",
        "usually - обычно",
        "often - часто",
        "sometimes - иногда",
        "rarely, seldom - редко",
        "never - никогда",
      ],
    },
    PresentContinuous: {
      time: "Present Continuous - «настоящее длительное»",
      whenUses: [
        "Действия, которые происходят в момент речи",
        "Запланированные действия в ближайшем будущем",
        "Развитие какого - то процесса или сообщение об изменениях",
        "Чтобы выразить свое раздражение",
      ],

      Positive: {
        sentence: ["Мест. (I) + am + Ving","Мест. (we, you, they) + are + Ving","Мест. (he, she, it) + is + Ving"],
        rule: ["I am playing tennis now","They are playing tennis now","He is playing tennis now"],
      },
      Negative: {
        sentence: ["Мест. (I) + am + not + Ving","Мест. (we, you, they) + are + not + Ving","Мест. (he, she, it) + is + not + Ving",],
        rule: ["I am not playing tennis now","They are not playing tennis now","He is not playing tennis now", ],
      },
      Question: {
        sentence: ["Am + мест. (I) + Ving","Are + мест. (we, you, they) + Ving","Is + мест. (he, she, it) + Ving"],
        rule: ["Am I playing tennis now?","Are they playing tennis now?","Is he playing tennis now?"],
      },

      rules: [
        "to be (am, is, are) + Ving",
        "Am - I",
        "Is - he , she , it",
        "Are - we , you , they"],
      timeWords: [
        "now - сейчас",
        "right now - прямо сейчас",
        "at this moment - в настоящий момент",
        "still - еще, все еще, до сих пор",
        "at present - в настоящее время",
        "today - сегодня",
        "currently - в настоящее время",
      ],
    },
    PresentPerfect: {
      time: "Present Perfect - «настоящее совершенное»",
      whenUses: [
        "Действие совершилось, виден результат",
        "Незаконченное действие",
        "Важно подчеркнуть факт какого - то свершившегося события без точного указания времени",
        "Прошлый опыт",
        "Достижения, которые не привязаны к конкретному времени",
        "Новости, которые случились недавно",
      ],

      Positive: {
        sentence: ["Мест. (I, we, you, they) + have + V3","Мест. (he, she, it) + has + V3"],
        rule: ["They have played tennis before","He has played tennis before"],
      },
      Negative: {
        sentence: ["Мест. (I, we, you, they) + have not + V3","Мест. (he, she, it)  + has not + V3"],
        rule: ["They have not played tennis before","He has not played tennis before"],
      },
      Question: {
        sentence: ["Have + мест. (I, we, you, they) + V3","Has + мест. (he, she, it)  + V3"],
        rule: ["Have they played tennis before?","Has he played tennis before?"],
      },

      rules: [
        "have/has + Ved / V3",
        "Have - I , we , you , they",
        "Has - he , she , it",
        "Часто вопрос начинается с вопросительных слов:",
          "when — когда",
          "who — кто",
          "where — где",
          "why — почему"],
      timeWords: [
        "ever - когда - либо",
        "never - никогда",
        "just - только что",
        "already - уже",
        "before - раньше",
        "recently - недавно",
        "this week - на этой неделе",
      ],
    },
    PresentPerfectContinuous: {
      time: "Present Perfect Continuous - «настоящее длительное совершенное»",
      whenUses: [
        "Действие началось в прошлом, длилось какое - то время и все еще продолжается в настоящем",
        "Действие закончилось недавно и сейчас виден его результат",
      ],

      Positive: {
        sentence: [ "Мест. (I, we, you, they) + have/has been + Ving", "Мест. (he, she, it) + have/has been + Ving"],
        rule: ["They have been playing tennis since 1997.","He has been playing tennis since 1997."],
      },
      Negative: {
        sentence: ["Мест. (I, we, you, they) + have/has + not + been + Ving","Мест. (he, she, it) + have/has + not + been + Ving"],
        rule: ["They have not been playing tennis since 1997.","He has not been playing tennis since 1997."],
      },
      Question: {
        sentence: ["Have/has + мест. (I, we, you, they) + been + Ving","Have/has + мест. (he, she, it) + been + Ving"],
        rule: ["Have they been playing tennis since 1997?","Has he been playing tennis since 1997?"],
      },

      rules: [
        "Present perfect continuous + (since + past simple)",
        "have/has + been + Ving",
        "Have - I , we , you , they",
        "Has - he , she , it",
      ],
      timeWords: [
        "since - с тех пор как",
      ],
    },
    PastSimple: {
      time: "Past Simple - «прошедшее простое»",
      whenUses: [
        "Указание на простое действие в прошлом",
        "Регулярные, повторяющиеся действия в прошлом",
        "Перечисление последовательности действий в прошлом (действия однократные и происходят друг за другом)",
      ],

      Positive: {
        sentence: [
          "мест. (I, we, you, they) + Ved/V2",
          "мест. (he, she, it) + Ved/V2"
        ],
        rule: [
          "They played tennis yesterday.",
          "He played tennis yesterday."
        ],
      },
      Negative: {
        sentence: [
          "мест. (I, we, you, they) + did + not + V",
          "мест. (he, she, it) + did + not + V",
        ],
        rule: [
          "They did not play tennis yesterday.",
          "He did not play tennis yesterday.",
        ],
      },
      Question: {
        sentence: [
          "Did + мест. (I, we, you, they) + V",
          "Did + мест. (he, she, it) + V",
        ],
        rule: [
          "Did they play tennis yesterday?",
          "Did he play tennis yesterday?",
        ],
      },

      rules: [
        "did",
        "️Ved / V2",
        ],
      timeWords: [
        "yesterday – вчера",
        "the day before yesterday – позавчера",
        "last week/month/year/weekend – на прошлой неделе/в прошлом месяце/в прошлом году/в прошлые выходные",
        "a day ago/ten days ago/a week ago/a month ago/a year ago – день назад/10 дней назад/неделю назад/месяц назад/год назад",
        "during the holidays – во время каникул",
      ],
    },
    PastContinuous: {
      time: "Past Continuous - «прошедшее длительное»",
      whenUses: [
        "Продолжительные действия в конкретный момент в прошлом",
        "Одновременные действия в прошлом",
        "Неодобрение",
        "Временная ситуация",
      ],

      Positive: {
        sentence: [
          "мест. (I, we, you, they) + were + Ving",
          "мест. (he, she, it) + was + Ving",
        ],
        rule: [
          "They were playing tennis at that moment",
          "He was playing tennis at that moment",
        ],
      },
      Negative: {
        sentence: [
          "Were + мест. (I, we, you, they) + Ving",
          "Was + мест. (he, she, it) + Ving",
        ],
        rule: [
          "They were not playing tennis at that moment",
          "He was not playing tennis at that moment",
        ],
      },
      Question: {
        sentence: [
          "Were + мест. (I, we, you, they) + Ving",
          "Was + мест. (he, she, it) + Ving",
        ],
        rule: [
          "Were they playing tennis now?",
          "Was he playing tennis now?",
        ],
      },

      rules: [
        "was/were + Ving",
        "Was - I , we , you , they",
        "Were - he , she , it",
        ],
      timeWords: [
        "at that moment - в тот момент",
        "when - когда",
        "while - в то время, как",
        "as - так как",
        "all night (long) - всю ночь",
        "last Sunday - в прошлое воскресенье",
      ],
    },
    PastPerfect: {
      time: "Past Perfect - «прошедшее совершенное»",
      whenUses: [
        "Действия, произошедшие до другого действия в прошлом",
        "Действия, результат которых был виден в прошлом",
      ],

      Positive: {
        sentence: ["мест (I, we, you, they) + had + Ved/V3","мест (he, she, it) + had + Ved/V3"],
        rule: ["They had played tennis before the class started.","He had played tennis before the class started."],
      },
      Negative: {
        sentence: ["мест (I, we, you, they) + had + not + Ved/V3","мест (he, she, it) + had + not + Ved/V3"],
        rule: ["They had not played tennis before the class started.","He had not played tennis before the class started."],
      },
      Question: {
        sentence: ["Had + мест (I, we, you, they) + Ved/V3?","Had + мест (he, she, it) + Ved/V3?"],
        rule: ["Had they played tennis before the class started?","Had he played tennis before the class started?"],
      },

      rules: [
        "had + Ved / V3",
        ],
      timeWords: [
        "before - до того, как",
        "never before - никогда раньше",
        "no sooner...than / hardly...when - едва; как только",
        "by that time - к тому времени",
        "by 9 pm - к девяти вечера",
        "by evening - к вечеру",
      ],
    },
    PastPerfectContinuous: {
      time: "Present Perfect Continuous - «прошедшее совершенное длительное»",
      whenUses: [
        "Действие, которое длилось в течение какого - то периода времени в прошлом и завершилось с определенным результатом",
        "Действие началось в прошлом и длилось до определенного момента в прошлом",
      ],

      Positive: {
        sentence: ["мест + had been + Ving"],
        rule: ["He had been playing tennis for two hour."],
      },
      Negative: {
        sentence: ["мест + had + not + been + Ving"],
        rule: ["He has not been playing tennis for two hours."],
      },
      Question: {
        sentence: ["Had + мест. + been + Ving?"],
        rule: ["Had he been playing tennis for two hours?"],
      },

      rules: [
        "had been + Ving",
      ],
      timeWords: [
        "for - в течение",
        "by - к какому - то времени ",
        "since - с тех пор как",
        "before - перед тем как",
        "when - когда",
      ],
    },
    FutureSimple: {
      time: "Future Simple - «будущее простое»",
      whenUses: [
        "Простое действие в будущем",
        "Регулярные, повторяющиеся действия в будущем",
        "При перечислении последовательности действий в будущем",
        "Надежда, обещания и опасения",
      ],

      Positive: {
        sentence: ["мест + will + V"],
        rule: ["He will play tennis tomorrow."],
      },
      Negative: {
        sentence: ["мест + will + not + V"],
        rule: ["He will not play tennis tomorrow."],
      },
      Question: {
        sentence: ["Will + мест. + V"],
        rule: ["Will he play tennis tomorrow?"],
      },

      rules: [
        "will + V",
      ],
      timeWords: [
        "soon - скоро",
        "later - позже",
        "as soon as - как только",
        "tomorrow - завтра",
        "tonight - вечером",
        "next week - на следующей неделе",
        "next year - на будущий год",
        "in a month - через месяц",
        "in three days - через три дня",
        "in 2020 - в 2020 году",
      ],
    },
    FutureContinuous: {
      time: "Future Continuous - «будущее длительное время»",
      whenUses: [
        "Процес, который будет происходить в определенный момент в будущем",
        "Несколько действий в будущем, которые будут происходить одновременно",
        "Запланированные действия",
        "Неизбежные действия",
      ],

      Positive: {
        sentence: ["мест + will be + Ving"],
        rule: ["He will be playing tennis tomorrow morning."],
      },
      Negative: {
        sentence: ["мест + will + not + be + Ving"],
        rule: ["They will not be playing tennis tomorrow morning."],
      },
      Question: {
        sentence: ["Will + мест + be + Ving"],
        rule: ["Will they be playing tennis tomorrow morning?"],
      },

      rules: [
        "will be + Ving",
      ],
      timeWords: [
        "at 3 o’clock (в три часа)",
        "this time tomorrow (завтра в это же время)",
        "at that moment (в тот момент)",
        "meanwhile / meantime (тем временем)",
        "from...till… / from...to…. (с...до...)",
        "during that time (в течение этого времени)",
        "during the day (в течение дня)",
      ],
    },
    FuturePerfect: {
      time: "Future Perfect - «будущее совершенное время»",
      whenUses: [
        "Действие будет длится до определенного момента в будущем с глаголами состояния, которые не употребляются в длительных временах Continuous (to know, to think, to be, to own)",
        "Действие, которое начнется и закончится до определенного момента в будущем",
      ],

      Positive: {
        sentence: ["мест + will + have + Ved/V3"],
        rule: ["He will have played tennis."],
      },
      Negative: {
        sentence: ["мест + will + not + have + Ved/V3"],
        rule: ["He will not have played tennis."],
      },
      Question: {
        sentence: ["Will + мест + have + Ved/V3?"],
        rule: ["Will he have played tennis?"],
      },

      rules: [
        "will + have",
        "Ved/V3",
      ],
      timeWords: [
        "by - к какому - то времени/моменту",
        "by the time - к тому времени как",
        "by then - к тому времени",
        "before - перед тем как",
        "when - когда",
        "until/till - до того как (только в отрицательных предложениях)",
      ],
    },
    FuturePerfectContinuous: {
      time: "Future Perfect Continuous - «будущее совершенное длительное»",
      whenUses: [
        "Действие, которое началось и продолжалось в течение некоторого времени до определенного момента в будущем",
      ],

      Positive: {
        sentence: ["мест + will + have been + Ving"],
        rule: ["He will have been playing tennis for 3 hours tomorrow."],
      },
      Negative: {
        sentence: ["мест + will + not + have been + Ving"],
        rule: ["He will not have been playing tennis for 3 hours tomorrow."],
      },
      Question: {
        sentence: ["Will + мест + have been + Ving"],
        rule: ["Will he have been playing tennis tomorrow?"],
      },

      rules: [
        "мест + will + have been + Ving",
      ],
      timeWords: [
        "till – до того как (только в отрицательных предложениях)",
        "until – до того как (только в отрицательных предложениях)",
        "for 2 hours – на протяжении двух часов",
        "for 3 weeks – на протяжении трех недель",
        "for 1 year – на протяжении одного года",
        "by the end of the hour – к концу часа",
        "by the end of the morning – к концу утра",
      ],
    },
  };
  private times: string[] = [
    "PresentSimple",
    "PresentContinuous",
    "PresentPerfect",
    "PresentPerfectContinuous",
    "PastSimple",
    "PastContinuous",
    "PastPerfect",
    "PastPerfectContinuous",
    "FutureSimple",
    "FutureContinuous",
    "FuturePerfect",
    "FuturePerfectContinuous",
  ];

  constructor() {
  }

  getRules(time: string) {
    const index=this.getIndex(time);
    if (index==0) return this.timesArray.PresentSimple;
    else if (index==1) return this.timesArray.PresentContinuous;
    else if (index==2) return this.timesArray.PresentPerfect;
    else if (index==3) return this.timesArray.PresentPerfectContinuous;
    else if (index==4) return this.timesArray.PastSimple;
    else if (index==5) return this.timesArray.PastContinuous;
    else if (index==6) return this.timesArray.PastPerfect;
    else if (index==7) return this.timesArray.PastPerfectContinuous;
    else if (index==8) return this.timesArray.FutureSimple;
    else if (index==9) return this.timesArray.FutureContinuous;
    else if (index==10) return this.timesArray.FuturePerfect;
    else return this.timesArray.FuturePerfectContinuous;
  }
  getLength() {
    return LENGTH;
  }
  getIndex(time: string) {
    for (let i = 0; i < this.times.length; i++) {
      if (time==this.times[i]) return i;
    }
    return  -1;
  }
}
