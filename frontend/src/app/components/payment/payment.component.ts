import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

	constructor() {
	}

	ngOnInit(): void {

	}

	confirm() {
		// @ts-ignore
		let number=document.getElementById('card-number1').value+document.getElementById('card-number2').value+document.getElementById('card-number3').value+document.getElementById('card-number4').value;
		// @ts-ignore
		let user=document.getElementById('card-name').value;
		// @ts-ignore
		let month=document.getElementById('card-expiration-mon').value;
		// @ts-ignore
		let year=document.getElementById('card-expiration-year').value;


	}
}
