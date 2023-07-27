import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserLoginService} from "../../services/api/user-login.service";
import {UserRegister} from "../../models/api/user-register.model";
import {UserRegisterService} from "../../services/api/user-register.service";
import {ProfileApiService} from "../../services/api/profile.service";

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
						document.getElementById('password2-addon-text').style.display='block';
						// @ts-ignore
						document.getElementById('password2-addon-text').innerText='Пароли не совпадают';
				} else {
						// @ts-ignore
						document.getElementById('password2-input').classList.remove('active-input');
						// @ts-ignore
						document.getElementById('password2-addon-text').style.display='none';
				}

				if (password2 == password1) {
						const data: UserRegister = {
								username: username,
								email: email,
								password: password1,
						}

						this.registration_service.create(data).subscribe(
								response => {
										this.router.navigate(['']);
								},
								error => {
										console.log(error);
								}
						);
				}
		}
}
