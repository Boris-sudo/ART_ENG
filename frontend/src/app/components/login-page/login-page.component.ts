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
		// @ts-ignore
		document.getElementById('background-font').style.display='block';
		// @ts-ignore
		document.getElementById('loader').style.display='block';
		setTimeout(function() {
			// @ts-ignore
			document.getElementById('background-font').style.opacity='100%';
			// @ts-ignore
			document.getElementById('loader').style.opacity='100%';
		}, 10)

		this.login_service.create(data).subscribe(
			response => {
				this.router.navigate(['']);
				setTimeout(function() {
					window.location.reload();
				}, 10);
			},
			error => {
				// @ts-ignore
				document.getElementById('background-font').style.opacity='0';
				// @ts-ignore
				document.getElementById('loader').style.opacity='0';
				// @ts-ignore
				document.getElementById('background-font').style.display='none';
				// @ts-ignore
				document.getElementById('loader').style.display='none';

				alert('Incorrect username or password')
			}
		);
	}
}
