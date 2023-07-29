import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileApiService} from "../../services/api/profile.service";

@Component({
	selector: 'app-pre-learn-page',
	templateUrl: './pre-learn-page.component.html',
	styleUrls: ['./pre-learn-page.component.css', '../../../styles.css']
})
export class PreLearnPageComponent implements OnInit {
	is_registered: boolean = false;
	public allTimes: string[] = [
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

	constructor(
		public router: Router,
		public route: ActivatedRoute,
		private profileApi: ProfileApiService,
	) {
	}

	ngOnInit(): void {
		this.profileApi.get().subscribe(
			response => {
				this.is_registered = true;
			}, error => {
			}
		)
	}

	learn(time: string): void {
		let push_time="";
		for (let i = 0; i < time.length; i++) {
			if (time[i]=='\n') push_time+=' ';
			else push_time+=time[i];
		}
		document.cookie="learn-time="+push_time+";path:/learn-time";
		if (!this.is_registered&&(time=='Present\nSimple'||time=='Present\nContinuous'))
			this.router.navigate(['/learn-time']);
		else if (!this.is_registered) {
			// @ts-ignore
			document.getElementById(time).style.color='#ff2020'
			setTimeout(function (time) {
				// @ts-ignore
				document.getElementById(time).style.color='#000000'
			}, 500, time)
		} else
			this.router.navigate(['/learn-time']);
	}
}
