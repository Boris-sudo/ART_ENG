import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserLoginService} from "../../services/api/user-login.service";
import {UserRegister} from "../../models/api/user-register.model";
import {UserRegisterService} from "../../services/api/user-register.service";
import {ProfileApiService} from "../../services/api/profile.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {PaymentModel} from "../../models/api/payment.class";
import {PaymentService} from "../../services/api/payment.service";
import {UserLogoutService} from "../../services/api/user-logout.service";

@Component({
	selector: 'app-registration-page',
	templateUrl: './registration-page.component.html',
	styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private registration_service: UserRegisterService,
		private profile_service: ProfileApiService,
		private payment_service: PaymentService,
		private log_out_service: UserLogoutService,
	) {
	}

	ngOnInit(): void {
	}


	register(): void {

		// @ts-ignore
		var username = document.getElementById('username-input').value;
		// @ts-ignore
		var email = document.getElementById('email-input').value;
		// @ts-ignore
		var password1 = document.getElementById('password1-input').value;
		// @ts-ignore
		var password2 = document.getElementById('password2-input').value;

		if (password2 != password1) {
			// @ts-ignore
			document.getElementById('password2-input').classList.add('active-input');
			// @ts-ignore
			document.getElementById('password2-addon-text').style.display = 'block';
			// @ts-ignore
			document.getElementById('password2-addon-text').innerText = 'Пароли не совпадают';
		} else {
			// @ts-ignore
			document.getElementById('password2-input').classList.remove('active-input');
			// @ts-ignore
			document.getElementById('password2-addon-text').style.display = 'none';
		}

		if (password2 == password1) {
			// @ts-ignore
			document.getElementById('background-font').style.display = 'block';
			// @ts-ignore
			document.getElementById('loader').style.display = 'block';
			setTimeout(function () {
				// @ts-ignore
				document.getElementById('background-font').style.opacity = '100%';
				// @ts-ignore
				document.getElementById('loader').style.opacity = '100%';
			}, 10)

			const data: UserRegister = {
				username: username,
				email: email,
				password: password1,
			}

			this.registration_service.create(data).subscribe(
				response => {
					this.payment_service.post('').subscribe(
						response2 => {
							console.log(response2);
						}, error=> {
							console.log(error);
						}
					)
				},
				error => {

					if (error.error.password != undefined) {
						// @ts-ignore
						document.getElementById('password1-input').classList.add('active-input');
						// @ts-ignore
						document.getElementById('password1-addon-text').style.display = 'block';
						// @ts-ignore
						document.getElementById('password1-addon-text').innerText = error.error.password[0];
					}
					else {
						// @ts-ignore
						document.getElementById('password1-input').classList.remove('active-input');
						// @ts-ignore
						document.getElementById('password1-addon-text').style.display = 'none';
					}

					if (error.error.username != undefined) {
						// @ts-ignore
						document.getElementById('username-input').classList.add('active-input');
						// @ts-ignore
						document.getElementById('username-addon-text').style.display = 'block';
						// @ts-ignore
						document.getElementById('username-addon-text').innerText = error.error.username[0];
					}
					else {
						// @ts-ignore
						document.getElementById('username-input').classList.remove('active-input');
						// @ts-ignore
						document.getElementById('username-addon-text').style.display = 'none';
					}
					// @ts-ignore
					document.getElementById('background-font').style.opacity = '0';
					// @ts-ignore
					document.getElementById('loader').style.opacity = '0';
					// @ts-ignore
					document.getElementById('background-font').style.display = 'none';
					// @ts-ignore
					document.getElementById('loader').style.display = 'none';

					console.log(error);
				}
			);
		}
	}
}
