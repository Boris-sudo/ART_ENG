import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-pre-learn-page',
  templateUrl: './pre-learn-page.component.html',
  styleUrls: ['./pre-learn-page.component.css']
})
export class PreLearnPageComponent implements OnInit {
  public allTimes:string[] = [
    "Present\nSimple",
    "Present\nContinuous",
    "Present\nPerfect",
    "Present\nPerfect\nContinuous",
    "Past\nSimple",
    "Past\nContinuous",
    "Past\nPerfect",
    "Past\nPerfect\nContinuous",
    "Future\nSimple",
    "Future\nContinuous",
    "Future\nPerfect",
    "Future\nPerfect\nContinuous",
  ]

  constructor(
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  learn(time:string): void {
    this.router.navigate(['/learn-time', time]);
  }
}
