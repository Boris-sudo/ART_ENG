import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileApiService} from "../../services/api/profile.service";
import {UserLogoutService} from "../../services/api/user-logout.service";
import {UserModel} from "../../models/UserModel";

@Component({
	selector: 'app-profile-page',
	templateUrl: './profile-page.component.html',
	styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
	public User: UserModel = {
		username: "",
		is_registered: false,
		email: '',
	};
	public current_show: string = 'profile-container';

	constructor(
		public router: Router,
		public route: ActivatedRoute,
		private profile_service: ProfileApiService,
	) {
	}

	ngOnInit(): void {
		this.profile_service.get().subscribe(
			response => {
				this.User = {
					date_paid: response.date_paid,
					username: response.username,
					email: response.email,
					is_registered: true,
				}
			}, error => {
			}
		)
	}

	pay() {

	}
	getDate():string {
		// @ts-ignore
		let result: string=new Date(this.User.date_paid).toDateString();
		return result;
	}
	show(id: string) {
		this.current_show = id;
	}
}
