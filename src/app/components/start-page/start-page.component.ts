import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  public times:string[] = [
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
  private paddingLeft=0;
  public chosen:string[] = [];

  constructor(
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  go(link: string) {
    this.router.navigate([link]);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  isTimeChosen(time:string) {
    for(let i=0;i<this.chosen.length;++i) if(this.chosen[i]==time) return true;
    return false;
  }
  addChosen(time:string) {
    if (this.isTimeChosen(time)) {
      for (let i = 0; i < this.chosen.length; ++i)
        if (this.chosen[i] == time)
          this.chosen.splice(i, 1);
    } else
      this.chosen.push(time);
  }
  getTimesID():string {
    let res="";
    for(let i of this.chosen) {
      let index=0;
      for (let j=0; j<this.times.length; ++j)
        if(this.times[j]==i) { index=j; break; }
      if (index<10) res+="0";
      res+=String(index);
    }
    return res;
  }

  moveleft() {
    this.paddingLeft-=700;
    // @ts-ignore
    if(this.paddingLeft<-4000) {
      this.paddingLeft=-4000;
      // @ts-ignore
      document.getElementById('card-container').style.paddingRight = "4200px";
      setTimeout(function () {
        // @ts-ignore
        document.getElementById('card-container').style.paddingRight = "4000px";
      }, 500)
    } else {
      if (this.paddingLeft > 0) {
        // @ts-ignore
        document.getElementById('card-container').style.paddingLeft = this.paddingLeft + "px";
      } else {
        // @ts-ignore
        document.getElementById('card-container').style.paddingRight = -1 * this.paddingLeft + "px";
      }
    }
  }
  moveright() {
    this.paddingLeft+=700;
    // @ts-ignore
    if(this.paddingLeft>4000) {
      this.paddingLeft=4000;
      // @ts-ignore
      document.getElementById('card-container').style.paddingLeft = "4200px";
      setTimeout(function () {
        // @ts-ignore
        document.getElementById('card-container').style.paddingLeft = "4000px";
      }, 500)
    } else {
      if (this.paddingLeft > 0) {
        // @ts-ignore
        document.getElementById('card-container').style.paddingLeft = this.paddingLeft + "px";
      } else {
        // @ts-ignore
        document.getElementById('card-container').style.paddingRight = -1 * this.paddingLeft + "px";
      }
    }
  }
}
