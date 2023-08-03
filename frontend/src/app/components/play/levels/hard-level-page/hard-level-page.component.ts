import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../../../../services/api/game.service";
import {TimeSentencesService} from "../../../../services/time-sentences.service";

@Component({
	selector: 'app-hard-level-page',
	templateUrl: './hard-level-page.component.html',
	styleUrls: ['./hard-level-page.component.css', '../../../../../styles.css']
})
export class HardLevelPageComponent implements OnInit {
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
	public times:string[]=[]; // времена с которыми клиент имеет дело
	public indexes: number[]=[]; // индексы времен в allTimes
	public newClicks: number=0; // 0-проверить; 1-сгенерировать
	// обнуляется
	public sentences: string[][] = [[], [], [],[], [], [],[], [], [],[], [], [],];
	public disabled: boolean[][] = [[true, true, true, true], [true, true, true, true], [true, true, true, true],[true, true, true, true], [true, true, true, true], [true, true, true, true],[true, true, true, true], [true, true, true, true], [true, true, true, true],[true, true, true, true], [true, true, true, true], [true, true, true, true],];
	private changeNumber: number[][] = [[], [], [],[], [], [],[], [], [],[], [], [],];
	private changeIDs: string[][] = [[], [], [],[], [], [],[], [], [],[], [], [],];
	public selectValues: string[]=["...", "...", "...","...", "...", "...","...", "...", "...","...", "...", "...",];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private timeSentencesService: TimeSentencesService,
	) {
	}

	ngOnInit(): void {
		function findIndex(name: string, a: string[]):number {
			for (let i = 0; i < a.length; i++)
				if (a[i]==name)
					return i;
			return -1;
		}

		// @ts-ignore
		let times_string:string=localStorage.getItem('chosenTimes');
		let time="";
		for (let i = 0; i < times_string.length; i++) {
			if (times_string[i]==',') this.times.push(time), time='';
			else time+=times_string[i];
		}

		// this.times.sort(() => Math.random() - 0.5);
		for (const time of this.times)
			this.indexes.push(findIndex(time, this.allTimes))
	}

	showHint(id: number){
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

	deleteSigns(a: string): string {
		let result='';

		a=a.toLowerCase();
		for (let c of a) {
			if (c>='a'&&c<='z') result+=c;
			else if (c>='а'&&c<='я') result+=c;
		}

		return result.toLowerCase();
	}

	checkAnswers():boolean {
		let result:boolean = true;

		//проверка
		for (let i = 0; i < this.times.length; i++) {
			for (let j = 0; j < this.changeNumber[i].length; j++) {
				let found: boolean=false;

				if (this.changeNumber[i][j]==0) {
					// @ts-ignore
					let value=document.getElementById(this.changeIDs[i][j]).value;
					if (value.toLowerCase() == this.times[i].toLowerCase())
						found=true;
				}
				else if (this.changeNumber[i][j]==1) {
					// @ts-ignore
					let value=this.deleteSigns(document.getElementById(this.changeIDs[i][j]).value);
					for (let k = 0; k < this.timeSentencesService.structure[this.indexes[i]].length; k++)
						if (this.timeSentencesService.structure[this.indexes[i]][k]==value)
							found=true;
				}
				else if (this.changeNumber[i][j]==2) {
					// @ts-ignore
					let value=document.getElementById(this.changeIDs[i][j]).value;
					for (let k = 0; k < this.timeSentencesService.sentences[this.indexes[i]].length; k++)
						if (this.timeSentencesService.sentences[this.indexes[i]][k]==value)
							found=true;
				}
				else if (this.changeNumber[i][j]==3) {
					// @ts-ignore
					let value=this.deleteSigns(document.getElementById(this.changeIDs[i][j]).value);
					for (let k = 0; k < this.timeSentencesService.words[this.indexes[i]].length; k++)
						if (this.deleteSigns(this.timeSentencesService.words[this.indexes[i]][k])==value)
							found=true;
				}

				if (!found) {
					result = false;
					// @ts-ignore
					document.getElementById(this.changeIDs[i][j]).style.background='#ff1818';
				}else {
					// @ts-ignore
					document.getElementById(this.changeIDs[i][j]).value = '';
				}
			}
		}

		return result;
	}

	next() {
		if (!this.checkAnswers()) {
			return;
		} else {
			this.router.navigate(['/pre-play', '-1']);
			setTimeout(function() {
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				})
			}, 10)
		}
	}
	generate() {
		function getRandomInt(max: number) {
			return Math.floor(Math.random() * max);
		}
		function findStr(name: string, a: string[]) {
			for (let i = 0; i < a.length; i++) {
				if (name==a[i]) return true;
			}
			return false;
		}
		function findNum(name: number, a: number[]) {
			for (let i = 0; i < a.length; i++) {
				if (name==a[i]) return true;
			}
			return false;
		}

		for (let i = 0; i < this.times.length; i++) {
			let result_sentence:string='';
			let visible_input=0;
			// getting random active inputs
			for (let j = 0; j < 1; j++) {
				let index=getRandomInt(4);
				while (findNum(index, this.changeNumber[i])) index=getRandomInt(4);

				this.changeNumber[i].push(index);
				// setting active inputs abled
				this.disabled[i][index]=false;
			}
			// getting random visible input
			for (let j = 0; j < 1; j++) {
				let index=getRandomInt(4);
				while (findNum(index, this.changeNumber[i])) index=getRandomInt(4);
				visible_input=index;
			}


			// getting random sentences
			let random_sentence = getRandomInt(6);
			result_sentence=this.timeSentencesService.sentences[this.indexes[i]][random_sentence];
			for (let j = 0; j < 4; j++) {
				let random_time = getRandomInt(12);
				while (random_time == this.indexes[i]) random_time = getRandomInt(12);
				random_sentence = getRandomInt(6);
				while (findStr(this.timeSentencesService.sentences[random_time][random_sentence], this.sentences[i])) random_sentence=getRandomInt(6);
				this.sentences[i].push(this.timeSentencesService.sentences[random_time][random_sentence]);
			}

			//setting void values for chosen inputs
			for (let j = 0; j < this.changeNumber[i].length; j++) {
				if (this.changeNumber[i][j]==0) this.changeIDs[i].push(''+this.times[i]);
				else if (this.changeNumber[i][j]==1) this.changeIDs[i].push('structure'+this.times[i]);
				else if (this.changeNumber[i][j]==2) this.changeIDs[i].push('sentence'+this.times[i]);
				else if (this.changeNumber[i][j]==3) this.changeIDs[i].push('word'+this.times[i]);

				if (this.changeNumber[i][j]==2) {
					this.sentences[i].sort(() => Math.random() - 0.5);
					this.selectValues[i] = '...';
				}
				else {
					// @ts-ignore
					document.getElementById(this.changeIDs[i][j]).value = '';
				}
				// @ts-ignore
				document.getElementById(this.changeIDs[i][j]).style.background='#696969';
			}
		}
	}
	new() {
		if (this.newClicks==0) {
			this.generate();
			// @ts-ignore
			document.getElementById('gen-btn').innerText='Проверить';
			this.newClicks=1;
		} else {
			if (this.checkAnswers()) {
				//обнуление массивов
				for (let i = 0; i < this.times.length; i++) {
					this.sentences[i].length=0;
					this.changeNumber[i].length=0;
					this.changeIDs[i].length=0;
				}
				for (let i = 0; i < this.disabled.length; i++)
					for (let j = 0; j < this.disabled[i].length; j++)
						this.disabled[i][j]=true;
				for (let i = 0; i < this.selectValues.length; i++)
					this.selectValues[i]='...';
				for (let i = 0; i < this.times.length; i++) {
					// @ts-ignore
					document.getElementById(''+this.times[i]).value='';
					// @ts-ignore
					document.getElementById('structure'+this.times[i]).value='';
					// @ts-ignore
					document.getElementById('word'+this.times[i]).value='';

					// @ts-ignore
					document.getElementById(''+this.times[i]).style.background='transparent';
					// @ts-ignore
					document.getElementById('sentence'+this.times[i]).style.background='transparent';
					// @ts-ignore
					document.getElementById('structure'+this.times[i]).style.background='transparent';
					// @ts-ignore
					document.getElementById('word'+this.times[i]).style.background='transparent';
				}
				// постановка изначального состояния
				// @ts-ignore
				document.getElementById('gen-btn').innerText='Сгенерировать';
				this.newClicks=0;
			} else {
				return;
			}
		}
	}

	changeSelectedValue(ind: number) {
		// @ts-ignore
		this.selectValues[ind]=document.getElementById('sentence'+this.times[ind]).value;
	}
}
