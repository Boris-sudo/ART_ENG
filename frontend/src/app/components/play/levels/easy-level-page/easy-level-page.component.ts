import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../../../../services/api/game.service";
import {TimeSentencesService} from "../../../../services/time-sentences.service";

@Component({
	selector: 'app-easy-level-page',
	templateUrl: './easy-level-page.component.html',
	styleUrls: ['./easy-level-page.component.css']
})
export class EasyLevelPageComponent implements OnInit {
	public allTimes: string[] = [
		"Present Simple",
		"Present Continuous",
		"Present Perfect",
		"Present Perfect Continuous",
		"Past Simple",
		"Past Continuous",
		"Past Perfect",
		"Past Perfect Continuous",
		"Future Simple",
		"Future Continuous",
		"Future Perfect",
		"Future Perfect Continuous",
	]
	public answers: string[][] = [[], [], []];
	public sentences: string[][] = [[], [], []];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private gameApi: GameService,
		private timeSentencesService: TimeSentencesService,
	) {
	}

	ngOnInit(): void {
		function getRandomInt(max: number) {
			return Math.floor(Math.random() * max);
		}
		function findTime(time: string, times: string[]) {
			for (let i = 0; i < times.length; i++)
				if (times[i]==time)
					return i;
			return -1;
		}

		this.gameApi.get(1).subscribe(
			response => {
				let i = 0;
				// @ts-ignore
				while (i < response.values?.length) {
					for (let j = 0; j < 4; j++) {
						// @ts-ignore
						this.answers[i].push(response.values[i * 4 + j]);
					}
					i++;
				}
			},
			error => { console.log(error); }
		);

		for (let i = 0; i < this.answers.length; i++) {
			let index=findTime(this.answers[i][0], this.allTimes);
			let random_sentence=getRandomInt(15);
			this.sentences[i].push(this.timeSentencesService.sentences[index][random_sentence])
			for (let j = 0; j < 4; j++) {
				let random_time = getRandomInt(12);
				while (random_time == index) random_time = getRandomInt(12);
				random_sentence=getRandomInt(15);
				this.sentences[i].push(this.timeSentencesService.sentences[random_time][random_sentence]);
			}
			this.sentences[i].sort(() => Math.random() - 0.5);
		}
	}

	showHint(id: number) {

	}

	next() {

	}
}
