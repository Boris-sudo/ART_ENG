import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileApiService} from "../../services/api/profile.service";
import {UserRegister} from "../../models/api/user-register.model";
import {UserModel} from "../../models/UserModel";
import {UserLogoutService} from "../../services/api/user-logout.service";

@Component({
	selector: 'app-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.css', '../../../styles.css']
})
export class TopBarComponent implements OnInit {
	public User: UserModel = {
		username: "",
		is_registered: false,
		email: '',
	};

	constructor(
		public router: Router,
		public route: ActivatedRoute,
		private profile_service: ProfileApiService,
		private logout_api: UserLogoutService,
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

	go(link: string) {
		if (link[0] != '/') {
			this.router.navigate(['']);
			setTimeout(function(link) {
				window.scrollTo({
					// @ts-ignore
					top: document.getElementById(link).offsetTop-60-30,
					behavior: "smooth"
				});
			}, 300, link)
		}
		else if (link == '/pre-play')
			this.router.navigate([link, -1]);
		else {
			this.router.navigate([link]);
			window.scrollTo({
				// @ts-ignore
				top: 0,
				behavior: "smooth"
			});
		}

		setTimeout(function(close_menu, close_profile_menu) {
			close_menu();
			close_profile_menu();
		}, 100, this.close_menu, this.close_profile_menu);
	}

	open_menu() {
		// @ts-ignore
		document.getElementById('menu').style.right = 'calc(-1*var(--padding-right))';
		// @ts-ignore
		document.getElementById('dop-menu').style.display = 'block';
		setTimeout(function () {
			// @ts-ignore
			document.getElementById('dop-menu').style.background = 'rgba(0,0,0,0.5)';
		}, 10)
	}

	close_menu() {
		// @ts-ignore
		document.getElementById('menu').style.right = 'calc(-1*(var(--width) + var(--padding-right)))';
		// @ts-ignore
		document.getElementById('dop-menu').style.background = 'rgba(0,0,0,0)';
		// @ts-ignore
		document.getElementById('dop-menu').style.display = 'none';
	}

	go_to_login(type: string) {
		this.router.navigate(['/register'])
		setTimeout(function () {
			if (type == 'register') { // @ts-ignore
				document.getElementById('container').classList.add('right-panel-active');
			}
		}, 10)
	}

	logout() {
		const data = "";
		this.logout_api.post(data).subscribe(
			response => {
			},
			error => {
			}
		)
		window.location.reload();
	}

	close_profile_menu() {
		// @ts-ignore
		document.getElementById('profile-menu').style.height = '0px';
		setTimeout(function () {
			// @ts-ignore
			document.getElementById('profile-menu').style.display = 'none';
		}, 500)
	}
	open_profile_menu() {
		// @ts-ignore
		if (document.getElementById('profile-menu').style.height == '' || document.getElementById('profile-menu').style.height == '0px') {
			// @ts-ignore
			document.getElementById('profile-menu').style.display = 'block';
			setTimeout(function () {
				// @ts-ignore
				document.getElementById('profile-menu').style.height = 'var(--height)';
			}, 10)
		} else {
			this.close_profile_menu();
		}
	}
}
