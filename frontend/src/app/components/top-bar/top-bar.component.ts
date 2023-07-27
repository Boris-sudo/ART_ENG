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
				this.User={
					username: response.username,
					email: response.email,
					is_registered: true,
				}
			}, error => {
				console.log(error);
			}
		)
	}

	go(link: string) {
		if (link=='/pre-play')
			this.router.navigate([link,-1]);
		else
			this.router.navigate([link]);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
		this.close_menu();
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
				this.User = {
					is_registered: false,
				}
				this.close_menu();
			}, error => {
				console.log(error);
			}
		)
	}
}
