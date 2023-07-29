import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LearnTimeModel} from "../../models/LearnTimeModel";
import {LearnTimeServiceService} from "../../services/learn-time-service.service";
import {ProfileApiService} from "../../services/api/profile.service";

@Component({
	selector: 'app-start-page',
	templateUrl: './start-page.component.html',
	styleUrls: ['./start-page.component.css', '../../../styles.css']
})
export class StartPageComponent implements OnInit {
	public times: string[] = [
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
	private paddingLeft = 0;
	public chosen: string[] = [];
	public InputTimeName: string = '';
	public InputTime: string = '';
	public islogged: boolean = false;
	public InputRule: LearnTimeModel = {
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

	constructor(
		public router: Router,
		public route: ActivatedRoute,
		private profileApi: ProfileApiService,
		public learnTimeServiceService: LearnTimeServiceService,
	) {
	}

	ngOnInit(): void {
		this.profileApi.get().subscribe(
			response => {
				this.islogged = true;
			}, error => {
			}
		)
	}

	go(link: string) {
		this.router.navigate([link]);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		})
	}

	isTimeChosen(time: string) {
		for (let i = 0; i < this.chosen.length; ++i) if (this.chosen[i] == time) return true;
		return false;
	}

	addChosen(time: string) {
		if (this.isTimeChosen(time)) {
			for (let i = 0; i < this.chosen.length; ++i)
				if (this.chosen[i] == time)
					this.chosen.splice(i, 1);
		} else
			this.chosen.push(time);
	}

	getTimesID(): string {
		let res = "";
		for (let i of this.chosen) {
			let index = 0;
			for (let j = 0; j < this.times.length; ++j)
				if (this.times[j] == i) {
					index = j;
					break;
				}
			if (index < 10) res += "0";
			res += String(index);
		}
		return res;
	}

	moveleft() {
		this.paddingLeft -= 700;
		// @ts-ignore
		if (this.paddingLeft < -4000) {
			this.paddingLeft = -4000;
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
		this.paddingLeft += 700;
		// @ts-ignore
		if (this.paddingLeft > 4000) {
			this.paddingLeft = 4000;
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

	open_payment() {
		// @ts-ignore
		document.getElementById('payment-page').style.display = 'block';
		setTimeout(function () {
			// @ts-ignore
			document.getElementById('payment-page').style.transform = 'rotateX(0deg) translateZ(0)';
			// @ts-ignore
			document.getElementById('payment-page').style.opacity = '100%';
		}, 10)
	}
	openTime(time: string) {
		if (!this.islogged&&(time!='Present Simple'&&time!='Present Continuous')) {
			this.open_payment();
			this.addChosen(time);
			setTimeout(function(chosen, time) {
				for (let i = 0; i < chosen.length; ++i)
					if (chosen[i] == time)
						chosen.splice(i, 1);
			}, 300, this.chosen, time);
			console.log(this.chosen);
			return;
		}
		this.InputTime = '';
		this.InputTimeName = '';
		for (let i = 0; i < time.length; i++) {
			if (time[i] == ' ') {
				this.InputTimeName += ' ';
				continue;
			}
			this.InputTime += time[i];
			this.InputTimeName += time[i];
		}
		this.InputRule = this.learnTimeServiceService.getRules(this.InputTime);

		// @ts-ignore
		document.getElementById('learn-page').style.display = 'block';
		setTimeout(function () {
			// @ts-ignore
			document.getElementById('scrolled-part').scrollTo({
				top: 0,
				behavior: 'smooth',
			})
			// @ts-ignore
			document.getElementById('learn-page').style.transform = 'rotateX(0deg) translateZ(0)';
			// @ts-ignore
			document.getElementById('learn-page-background').style.opacity = '100%';
		}, 10)
	}

}
