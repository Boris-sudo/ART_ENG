import {Component, OnInit} from '@angular/core';
import {PlayService} from "../../../services/play.service";
import {PlayModel} from "../../../models/playModel";
import {ActivatedRoute, Router} from "@angular/router";
import {TimeSentencesService} from "../../../services/time-sentences.service";
import {GameService} from "../../../services/api/game.service";
import {UserRegister} from "../../../models/api/user-register.model";
import {Game} from "../../../models/api/game.model";

@Component({
	selector: 'app-play-page',
	templateUrl: './play-page.component.html',
	styleUrls: ['./play-page.component.css', '../../../../styles.css']
})
export class PlayPageComponent implements OnInit {
	public times: string[] = [];
	public indexes: number[] = [];
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

		// getting times from link
		const routeParams = this.route.snapshot.paramMap;
		const timesIDs = String(routeParams.get('timesID'));
		for (let i = 0; i < timesIDs.length; i += 2) {
			var charCodeI2 = 0;
			var charCodeI1 = 0;
			var charCode0 = 0;
			var code0 = '0'.charCodeAt(charCode0);
			var codeI1 = timesIDs[i].charCodeAt(charCodeI1) - code0;
			var codeI2 = timesIDs[i + 1].charCodeAt(charCodeI2) - code0;
			let id = codeI1 * 10 + codeI2;
			this.times.push(this.allTimes[id]);
			this.indexes.push(id);
		}

		//getting random sentences for each time
		for (let i = 0; i < this.times.length; i++) {
			let random_sentence = getRandomInt(6);
			this.sentences[i].push(this.timeSentencesService.sentences[this.indexes[i]][random_sentence])
			for (let j = 0; j < 4; j++) {
				let random_time = getRandomInt(12);
				while (random_time == this.indexes[i]) random_time = getRandomInt(12);
				random_sentence = getRandomInt(6);
				this.sentences[i].push(this.timeSentencesService.sentences[random_time][random_sentence]);
			}
			this.sentences[i].sort(() => Math.random() - 0.5);
		}
	}

	showHint(id: number): void {
		// @ts-ignore
		let object:HTMLElement=document.getElementById('hint'+id);
		if (object.style.display == 'none'||object.style.display=='') {
			object.style.display = 'block';

			setTimeout(function (object) {
				object.style.opacity = '100%';
			}, 10, object);

			setTimeout(function (object) {
				object.style.opacity = '0%';
			}, 10000, object);

			setTimeout(function (object) {
				object.style.display = 'none';
			}, 11000, object);
		} else {
			object.style.opacity = '0%';

			setTimeout(function (object) {
				object.style.display = 'none';
			}, 100, object);
		}
	}

	isCorrectSentence(sentence: string, ind: number): boolean {
		for (let i = 0; i < this.timeSentencesService.sentences[this.indexes[ind]].length; i++)
			if (this.timeSentencesService.sentences[this.indexes[ind]][i] == sentence)
				return true;
		return false;
	}

	isCorrectStructure(structure: string, ind: number): boolean {
		structure = structure.toLowerCase();
		let new_structure = "";
		for (let i = 0; i < structure.length; i++) {
			if ((structure[i] < 'a' || structure[i] > 'z') && (structure[i] < '1' || structure[i] > '9')) continue;
			new_structure += structure[i];
		}

		for (let i = 0; i < this.timeSentencesService.structure[this.indexes[ind]].length; i++)
			if (this.timeSentencesService.structure[this.indexes[ind]][i] == new_structure)
				return true;
		return false;
	}

	isCorrectWord(word: string, ind: number): boolean {
		word = word.toLowerCase();
		let new_word = "";
		for (let i = 0; i < word.length; i++) {
			if ((word[i] != " " && word[i] != "-") && (word[i] < 'а' || word[i] > 'я')) continue;
			new_word += word[i];
		}


		console.log(this.timeSentencesService.words[this.indexes[ind]]);
		for (let i = 0; i < this.timeSentencesService.words[this.indexes[ind]].length; i++)
			if (this.timeSentencesService.words[this.indexes[ind]][i] == new_word)
				return true;
		return false;
	}

	play(): void {
		const data: Game = {
			id: 1,
			values: [],
		}

		let valid:boolean = true;
		for (let i = 0; i < this.times.length; i++) {
			// @ts-ignore
			let structure:string = document.getElementById('structure' + this.times[i]).value;
			// @ts-ignore
			let sentence:string = document.getElementById('sentence' + this.times[i]).value;
			// @ts-ignore
			let word:string = document.getElementById('word' + this.times[i]).value;
			structure=structure.toLowerCase();
			word=word.toLowerCase();


			if (!this.isCorrectStructure(structure, i)) {
				console.log('struct');
				// @ts-ignore
				document.getElementById('structure' + this.times[i]).style.background = '#bd4141'
				valid=false;
			} if (!this.isCorrectSentence(sentence, i)) {
				console.log('sentence');
				// @ts-ignore
				document.getElementById('sentence' + this.times[i]).style.background = '#bd4141'
				valid=false;
			} if (!this.isCorrectWord(word, i)) {
				console.log('word'+this.times[i]);
				// @ts-ignore
				document.getElementById('word' + this.times[i]).style.background = '#bd4141'
				valid=false;
			}

			data.values?.push(this.times[i]);
			data.values?.push(structure);
			data.values?.push(sentence);
			data.values?.push(word);
		}

		console.log(valid);
		if (valid) {
			document.cookie = 'answer=; path=/; expires=-1';
			document.cookie = "answer=" + data.values + ";path:/game";
			console.log(document.cookie);
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			})
			this.router.navigate(['/game/easy/']);
		}
	}
}
