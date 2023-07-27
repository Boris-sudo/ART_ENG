import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlayService} from "../../../services/play.service";
import {PlayModel} from "../../../models/playModel";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: 'app-pre-play-page',
  templateUrl: './pre-play-page.component.html',
  styleUrls: ['./pre-play-page.component.css', '../../../../styles.css'],
})
export class PrePlayPageComponent implements OnInit {
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
  private game: PlayModel={
    times:[],
    level:0
  }
  public selectedLevel:string="easy";
  public chosenTimes:string []=[];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playService:PlayService,
  ) { }

  ngOnInit(): void {
    // getting times from link
    const routeParams = this.route.snapshot.paramMap;
    const timesIDs = String(routeParams.get('timesID'));
    if (timesIDs!="-1")
      for(let i=0; i<timesIDs.length;i+=2) {
      var charCodeI2=0;
      var charCodeI1=0;
      var charCode0=0;
      var code0 = '0'.charCodeAt(charCode0);
      var codeI1 = timesIDs[i].charCodeAt(charCodeI1) - code0;
      var codeI2 = timesIDs[i+1].charCodeAt(charCodeI2) - code0;
      let id = codeI1 * 10 + codeI2;
      if (this.chosenTimes.length<3)
        this.chosenTimes.push(this.allTimes[id]);
    }
  }

  isTimeChosen(time:string) {
    for(let i=0;i<this.chosenTimes.length;++i) if(this.chosenTimes[i]==time) return true;
    return false;
  }
  addChosen(time:string) {
    if (this.isTimeChosen(time)) {
      for (let i = 0; i < this.chosenTimes.length; ++i)
        if (this.chosenTimes[i] == time)
          this.chosenTimes.splice(i, 1);
    } else {
      if (this.chosenTimes.length < 3)
        this.chosenTimes.push(time);
      else {
        // @ts-ignore
        document.getElementById(time).style.background="#e13d3d";
        setTimeout(function (time) {
          // @ts-ignore
          document.getElementById(time).style.background="#FFD6E1";
        }, 200, time);
      }
    }
  }

  getIndexes(): string {
    let res="";
    for (let i = 0; i < this.chosenTimes.length; i++)
      for (let j = 0; j < this.allTimes.length; j++)
        if (this.chosenTimes[i]==this.allTimes[j]) {
          if (j<10) res+="0";
          res+=String(j);
          break;
        }
    return res;
  }

  play(): void {
    this.playService.setGame(this.chosenTimes, this.selectedLevel);
    this.router.navigate(['/game/menu', this.getIndexes()]);
  }
}
