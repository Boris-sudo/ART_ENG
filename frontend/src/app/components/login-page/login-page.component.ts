import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserLogin} from "../../models/api/user-login.model";
import {UserLoginService} from "../../services/api/user-login.service";

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private login_service: UserLoginService,
	) {
	}

	ngOnInit(): void {
	}


	login(): void {
		// @ts-ignore
		var username = document.getElementById('username-input').value;
		// @ts-ignore
		var password = document.getElementById('password-input').value;

		const data: UserLogin = {
			username: username,
			password: password,
		}

		this.login_service.create(data).subscribe(
			response => {
				this.router.navigate(['']);
				setTimeout(function() {
					window.location.reload();
				}, 10);
			},
			error => {
				console.log(error);
			}
		);
	}
}
