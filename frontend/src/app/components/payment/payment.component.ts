import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.css', '../../../styles.css']
})
export class PaymentComponent implements OnInit {

	constructor() {
	}

	ngOnInit(): void {

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
