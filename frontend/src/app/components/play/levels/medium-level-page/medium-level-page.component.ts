import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../../../../services/api/game.service";
import {TimeSentencesService} from "../../../../services/time-sentences.service";

@Component({
	selector: 'app-medium-level-page',
	templateUrl: './medium-level-page.component.html',
	styleUrls: ['./medium-level-page.component.css', '../../../../../styles.css']
})
export class MediumLevelPageComponent implements OnInit {
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
	public answers: string[][] = [[]];
	public sentences: string[][] = [[], [], []];
	public newClicks: number = 0;
	private changeID: string[] = [];
	private changeNumber: number[][] = [[], []];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private gameApi: GameService,
		private timeSentencesService: TimeSentencesService,
	) {
	}

	ngOnInit(): void {
		function getCookie(name: string): string {
			var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
			return matches ? decodeURIComponent(matches[1]) : "";
		}

		let res: string = getCookie('answer');
		res += ',';
		let word: string = '';
		let count: number = 0;
		for (let i = 0; i < res.length; i++) {
			if (res[i] == ',') {
				this.answers[this.answers.length - 1].push(word);
				word = '';
				count++;
				if (count == 4)
					this.answers.push([]), count = 0;
			} else
				word += res[i];
		}
		this.answers.pop();

		this.answers.sort(() => Math.random() - 0.5);
	}

	showHint(id: number) {
		/*@ts-ignore*/
		document.getElementById('hint' + id).style.display = 'block';

		setTimeout(function (id) {
			/*@ts-ignore*/
			document.getElementById(id).style.opacity = '100%';
		}, 10, 'hint' + id);

		setTimeout(function (id) {
			/*@ts-ignore*/
			document.getElementById(id).style.opacity = '0%';
		}, 10000, 'hint' + id);

		setTimeout(function (id) {
			/*@ts-ignore*/
			document.getElementById(id).style.display = 'none';
		}, 11000, 'hint' + id);

	}

	checkAnswers() {
		let valid:boolean=false;
		for (let i = 0; i < this.changeID.length; i++) {
			// @ts-ignore
			let result = document.getElementById(this.changeID[i]).value;
			let check = this.answers[this.changeNumber[0][i]][this.changeNumber[1][i]];
			if (this.changeNumber[1][i] == 1) {
				result = this.structureToNormal(result);
				check = this.structureToNormal(check);
			}
			if (this.changeNumber[1][i]==3) {
				result=result.toLowerCase();
			}
			if (result != check) {
				// @ts-ignore
				document.getElementById(this.changeID[i]).style.background = '#f61313';
				setTimeout(function (id) {
					// @ts-ignore
					document.getElementById(id).style.background = 'transparent';
				}, 200, this.changeID[0])
				valid=false;
			}
		}

		return valid;
	}

	structureToNormal(str: string) {
		str = str.toLowerCase();
		let result = "";
		for (let i = 0; i < str.length; i++)
			if (str[i] >= 'a' && str[i] <= 'z')
				result += str[i];
		console.log(result);
		return result;
	}

	next() {
		if (!this.checkAnswers()) {
			return;
		} else {
			for (let i = 0; i < this.changeID.length; i++) {
				// @ts-ignore
				document.getElementById(this.changeID[i]).style.background = '#00ff00';
			}
			setTimeout(function (router) {
				router.navigate(['/game/hard']);
				setTimeout(function() {
					window.scrollTo({
						top: 0,
						behavior: "smooth"
					});
				}, 10)
			}, 200, this.router);
		}
	}

	generate() {
		function getRandomInt(max: number) {
			return Math.floor(Math.random() * max);
		}

		function find(str: number, arr: number[]): boolean {
			for (let i = 0; i < arr.length; i++)
				if (arr[i] == str)
					return true;
			return false;
		}

		function findIndex(time: string, times: string[]) {
			for (let i = 0; i < times.length; i++)
				if (times[i] == time)
					return i;
			return -1;
		}

		// setting this.sentences
		for (let i = 0; i < this.answers.length; i++) {
			this.sentences[i].length = 0;
			let index = findIndex(this.answers[i][0], this.allTimes);
			let random_sentence = getRandomInt(15);
			this.sentences[i].push(this.answers[i][2]);

			for (let j = 0; j < 4; j++) {
				let random_time = getRandomInt(12);
				while (random_time == index) random_time = getRandomInt(12);
				random_sentence = getRandomInt(15);
				this.sentences[i].push(this.timeSentencesService.sentences[random_time][random_sentence]);
			}
			this.sentences[i].sort(() => Math.random() - 0.5);
		}

		// setting words to their inputs randomly
		for (let i = 0; i < this.answers.length; i++) {
			let available: number[] = [];
			for (let j = 0; j < 2; j++) {
				let new_available = getRandomInt(4);
				while (find(new_available, available))
					new_available = getRandomInt(4);
				available.push(new_available);
			}

			// @ts-ignore
			document.getElementById(this.answers[i][0]).value = this.answers[i][0];
			// @ts-ignore
			document.getElementById('sentence' + this.answers[i][0]).value = this.answers[i][2];
			// @ts-ignore
			document.getElementById('structure' + this.answers[i][0]).value = this.answers[i][1];
			// @ts-ignore
			document.getElementById('word' + this.answers[i][0]).value = this.answers[i][3];

			for (let j = 0; j < available.length; j++) {
				if (available[j] == 0) this.changeID.push(this.answers[i][0]);
				else if (available[j] == 1) this.changeID.push('structure' + this.answers[i][0]);
				else if (available[j] == 2) this.changeID.push('sentence' + this.answers[i][0]);
				else this.changeID.push('word' + this.answers[i][0]);

				this.changeNumber[0].push(i);
				this.changeNumber[1].push(available[j]);
			}

			for (const id of this.changeID) {
				// @ts-ignore
				document.getElementById(id).removeAttribute('disabled');
				// @ts-ignore
				document.getElementById(id).value = "";
			}
		}
	}

	new() {
		if (this.newClicks == 0) {
			// @ts-ignore
			document.getElementById('new-level').innerText = 'Проверить';
			this.generate();
			this.newClicks = (this.newClicks + 1) % 2;
		} else {
			if (!this.checkAnswers()) {
				return;
			} else {
				// обнуление лишних массивов
				this.changeNumber[0].length = 0;
				this.changeNumber[1].length = 0;
				this.changeID.length = 0;

				// @ts-ignore
				document.getElementById('new-level').innerText = 'Сгенерировать уровень';


				for (let i = 0; i < this.changeID.length; i++) {
					// @ts-ignore
					document.getElementById(this.changeID[i]).style.background = '#00ff00';
				}


				setTimeout(function (ids, answers) {
					for (let i = 0; i < ids.length; i++) {
						// @ts-ignore
						document.getElementById(ids[i]).style.background = 'transparent';
					}

					for (let i = 0; i < answers.length; i++) {
						// @ts-ignore
						document.getElementById(answers[i][0]).removeAttribute('disabled');
						// @ts-ignore
						document.getElementById('sentence' + answers[i][0]).removeAttribute('disabled');
						// @ts-ignore
						document.getElementById('structure' + answers[i][0]).removeAttribute('disabled');
						// @ts-ignore
						document.getElementById('word' + answers[i][0]).removeAttribute('disabled');

						// @ts-ignore
						document.getElementById('' + answers[i][0]).value = '';
						// @ts-ignore
						document.getElementById('structure' + answers[i][0]).value = '';
						// @ts-ignore
						document.getElementById('sentence' + answers[i][0]).value = '';
						// @ts-ignore
						document.getElementById('word' + answers[i][0]).value = '';
					}
				}, 200, this.changeID, this.answers)


				this.newClicks = (this.newClicks + 1) % 2;
			}
		}
	}
}
