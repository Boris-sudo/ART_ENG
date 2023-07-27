import { Component, OnInit } from '@angular/core';
import {LearnTimeServiceService} from "../../services/learn-time-service.service";
import {LearnTimeModel, timesToLearn} from "../../models/LearnTimeModel";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-learn-time',
  templateUrl: './learn-time.component.html',
  styleUrls: ['./learn-time.component.css', '../../../styles.css']
})
export class LearnTimeComponent implements OnInit {
  public Rule: LearnTimeModel={
    time: "Present Simple - «настоящее простое»",
    whenUses: [
      "Законы природы — то, что всегда правда",
      "Факты",
      "Регулярные действия",
      "Расписание",
    ],

    Positive: {
      sentence: ["Мест. (I, we, you, they) + V", "Мест. (he, she, it) + Vs"],
      rule: ["They play tennis every weekend", "He plays tennis every weekend"],
    },
    Negative: {
      sentence: ["Мест. (I, we, you, they) + do + not + V", "Мест. (he, she, it) + does + not + V"],
      rule: ["They do not play tennis every weekend", "He does not play tennis every weekend"],
    },
    Question: {
      sentence: ["Do + мест. (I, we, you, they) + V", "Does + мест. (he, she, it) + V"],
      rule: ["Do they play tennis every weekend?", "Does he play tennis every weekend?"],
    },

    rules: [
      "Do - I , we , you , they",
      "Does - he , she , it",
      "I, we, you, they + V",
      "He, she, it + Vs"],
    timeWords: [
      "always-всегда",
      "usually-обычно",
      "often-часто",
      "sometimes-иногда",
      "rarely, seldom-редко",
      "never-никогда",
    ],
  };
  public time:string="";
  public time_name: string="";
  public big_array:number[]=[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public learnTimeServiceService:LearnTimeServiceService,
  ) { }

  ngOnInit(): void {
    // getting times from link
    const routeParams = this.route.snapshot.paramMap;
    const timeName = String(routeParams.get('timeName'));
    console.log(timeName)
    for (let i = 0; i < timeName.length; i++) {
      if (timeName[i]=='\n') { this.time_name+=" "; continue; }
      this.time+=timeName[i];
      this.time_name+=timeName[i];
    }
    this.Rule=this.learnTimeServiceService.getRules(this.time);
    for (let i = 0; i < 120; i++) this.big_array.push(0);
  }

  getLink() {
    let res="";
    let index=this.learnTimeServiceService.getIndex(this.time);
    if (index<10) res+="0"+String(index);
    return res;
  }
}
