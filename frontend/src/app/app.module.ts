import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {StartPageComponent} from './components/start-page/start-page.component';
import {PlayPageComponent} from './components/play/play-page/play-page.component';
import {RegistrationPageComponent} from './components/registration-page/registration-page.component';
import {PrePlayPageComponent} from './components/play/pre-play-page/pre-play-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LearnTimeComponent} from './components/learn-time/learn-time.component';
import {PreLearnPageComponent} from './components/pre-learn-page/pre-learn-page.component';
import {HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {LoginPageComponent} from './components/login-page/login-page.component';
import {EasyLevelPageComponent} from './components/play/levels/easy-level-page/easy-level-page.component';
import {MediumLevelPageComponent} from './components/play/levels/medium-level-page/medium-level-page.component';
import {HardLevelPageComponent} from './components/play/levels/hard-level-page/hard-level-page.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import {NgOptimizedImage} from "@angular/common";

@NgModule({
	declarations: [
		AppComponent,
		TopBarComponent,
		StartPageComponent,
		PlayPageComponent,
		RegistrationPageComponent,
		PrePlayPageComponent,
		LearnTimeComponent,
		PreLearnPageComponent,
		LoginPageComponent,
		EasyLevelPageComponent,
		MediumLevelPageComponent,
		HardLevelPageComponent,
  PaymentComponent,
  ProfilePageComponent
	],
	imports: [
		HttpClientModule,
		HttpClientXsrfModule.withOptions({
			cookieName: 'csrftoken',
			headerName: 'X-CSRFToken',
		}),
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		NgOptimizedImage,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
