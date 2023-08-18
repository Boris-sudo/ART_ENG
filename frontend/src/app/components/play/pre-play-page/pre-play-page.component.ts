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
					date_paid: response.date_paid,
					username: response.username,
					email: response.email,
					is_registered: true,
				}
				// @ts-ignore
				let paid=new Date(this.User.date_paid*1000);
				let curr=new Date;
				let paid_num = paid.getDate();
				let curr_num = curr.getDate();
				this.User.is_valid_pay=(30-paid_num+curr_num)%30<=30&&this.User.date_paid!=null;
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
		if (!this.islogged()&&(time!='Present Simple'&&time!='Present Continuous')) {
			this.open_payment();
			return;
		} else {
			if (this.isTimeChosen(time)) {
				for (let i = 0; i < this.chosenTimes.length; ++i)
					if (this.chosenTimes[i] == time)
						this.chosenTimes.splice(i, 1);
			} else {
				this.chosenTimes.push(time);
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

	play(): void {
		if (this.chosenTimes.length==0) {
			// @ts-ignore
			document.getElementById('play-btn').style.background='#f11219';
			setTimeout(function() {
				// @ts-ignore
				document.getElementById('play-btn').style.background='transparent';
			}, 300)
			return;
		}
		let result='';
		for (let time of this.chosenTimes)
			result+=time+',';
		localStorage.setItem("chosenTimes", result);
		this.router.navigate(['/game/easy/']);
	}
}
