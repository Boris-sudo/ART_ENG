import { Injectable } from '@angular/core';
import { PlayModel } from "../models/playModel";

@Injectable({
  providedIn: 'root'
})
export class PlayService {
  private Game: PlayModel = {
    times: [],
    level: 0,
  }

  constructor() { }

  setGame(times:string[], level:string): void {
    if (level=="easy") this.Game.level=1;
    if (level=="medium") this.Game.level=2;
    if (level=="hard") this.Game.level=3;
    this.Game.times=times;
  }
  getGame(): PlayModel {
    return this.Game;
  }
}
