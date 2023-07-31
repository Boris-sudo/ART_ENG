import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlayService} from "../../../services/play.service";
import {PlayModel} from "../../../models/playModel";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ProfileApiService} from "../../../services/api/profile.service";
import {Profile} from "../../../models/api/profile.model";
import {UserModel} from "../../../models/UserModel";

@Component({
	selector: 'app-pre-play-page',
	templateUrl: './pre-play-page.component.html',
	styleUrls: ['./pre-play-page.component.css', '../../../../styles.css'],
})
export class PrePlayPageComponent implements OnInit {
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
	private game: PlayModel = {
		times: [],
		level: 0
	}
	public User:UserModel={
		is_registered: false,
		is_valid_pay: false,
	};
	public selectedLevel: string = "easy";
	public chosenTimes: string [] = [];


	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private profileApi: ProfileApiService,
		private playService: PlayService,
	) {
	}

	ngOnInit(): void {
		this.profileApi.get().subscribe(
			response => {
				const current = new Date;
				const timestamp = current.getTime();
				this.User = {
					// @ts-ignore
					date_paid: response.date_paid*1000,
					username: response.username,
					email: response.email,
					is_registered: true,
				}
				// @ts-ignore
				let paid=new Date(this.User.date_paid);
				let curr=new Date;
				let paid_num = paid.getDate();
				let curr_num = curr.getDate();
				this.User.is_valid_pay=(30-paid_num+curr_num)%30<=30;
			}, error => {
			}
		)
	}

	isTimeChosen(time: string) {
		for (let i = 0; i < this.chosenTimes.length; ++i) if (this.chosenTimes[i] == time) return true;
		return false;
	}


	islogged():boolean {
		if (this.User.is_registered&&this.User.is_valid_pay)
			return true;
		return false;
	}

	addChosen(time: string) {
		console.log(this.islogged())
		if (!this.islogged()&&(time!='Present Simple'&&time!='Present Continuous')) {
			this.open_payment();
			return;
		} else {
			console.log(2);
			if (this.isTimeChosen(time)) {
				for (let i = 0; i < this.chosenTimes.length; ++i)
					if (this.chosenTimes[i] == time)
						this.chosenTimes.splice(i, 1);
			} else {
				if (this.chosenTimes.length < 3)
					this.chosenTimes.push(time);
				else {
					// @ts-ignore
					document.getElementById(time).style.background = "#e13d3d";
					setTimeout(function (time) {
						// @ts-ignore
						document.getElementById(time).style.background = "#FFD6E1";
					}, 200, time);
				}
			}
		}
	}

	getIndexes(): string {
		let res = "";
		for (let i = 0; i < this.chosenTimes.length; i++)
			for (let j = 0; j < this.allTimes.length; j++)
				if (this.chosenTimes[i] == this.allTimes[j]) {
					if (j < 10) res += "0";
					res += String(j);
					break;
				}
		return res;
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

	play(): void {
		let result='';
		for (let time of this.chosenTimes)
			result+=time+',';
		localStorage.setItem("chosenTimes", result);
		this.router.navigate(['/game/easy/']);
	}
}
