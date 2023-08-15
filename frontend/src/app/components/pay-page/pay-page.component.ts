import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-pay-page',
	templateUrl: './pay-page.component.html',
	styleUrls: ['./pay-page.component.css', '../../../styles.css']
})
export class PayPageComponent implements OnInit {

	constructor() {
	}

	ngOnInit(): void {

	}

	pay() {
      // setTimeout(function(profile_service, router) {
      // 	let date = new Date;
      // 	let timestamp = date.getTime();
      //
      // 	profile_service.post({"date_paid": timestamp/1000}).subscribe(
      // 		response => {
      // 			window.location.reload();
      // 			setTimeout(function() {
      // 				router.navigate(['/profile']);
      // 			}, 100)
      // 		}, error => {}
      // 	)
      // }, 100, this.profile_service, this.router)
	}
}
