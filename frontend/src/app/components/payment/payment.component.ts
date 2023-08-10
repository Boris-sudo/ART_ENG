import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileApiService} from "../../services/api/profile.service";
import {UserModel} from "../../models/UserModel";

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.css', '../../../styles.css']
})
export class PaymentComponent implements OnInit {
	public User: UserModel = {
		is_registered: false,
	};

	constructor(
		public router: Router,
		public route: ActivatedRoute,
		private profileApi: ProfileApiService,
	) {
	}

	ngOnInit(): void {
		document.addEventListener("keydown", ev => {
			if (ev.key=='Escape') this.close_open_menu();
		});
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
		);
	}

	pay() {
		if (!this.User.is_registered) this.router.navigate(['/register']);
		else this.router.navigate(['/pay']);
	}
	close_open_menu() {
		// @ts-ignore
		document.getElementById('payment-page').style.transform='rotateX(90deg)';
		// @ts-ignore
		document.getElementById('payment-page').style.opacity='0';
		setTimeout(function() {
			// @ts-ignore
			document.getElementById('payment-page').style.display='none';
		}, 500)
	}

	protected readonly close = close;
}
