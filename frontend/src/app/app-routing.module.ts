import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayPageComponent} from "./components/play/play-page/play-page.component";
import {RegistrationPageComponent} from "./components/registration-page/registration-page.component";
import {StartPageComponent} from "./components/start-page/start-page.component";
import {PrePlayPageComponent} from "./components/play/pre-play-page/pre-play-page.component";
import {LearnTimeComponent} from "./components/learn-time/learn-time.component";
import {PreLearnPageComponent} from "./components/pre-learn-page/pre-learn-page.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {EasyLevelPageComponent} from "./components/play/levels/easy-level-page/easy-level-page.component";
import {MediumLevelPageComponent} from "./components/play/levels/medium-level-page/medium-level-page.component";
import {HardLevelPageComponent} from "./components/play/levels/hard-level-page/hard-level-page.component";
import {PaymentComponent} from "./components/payment/payment.component";
import {ProfilePageComponent} from "./components/profile-page/profile-page.component";
import {PayPageComponent} from "./components/pay-page/pay-page.component";

const routes: Routes = [
  {path: '', component: StartPageComponent},

  {path: 'game/menu/:timesID', component: PlayPageComponent},
  {path: 'game/easy', component: EasyLevelPageComponent},
  {path: 'game/medium', component: MediumLevelPageComponent},
  {path: 'game/hard', component: HardLevelPageComponent},
  {path: 'pre-play/:timesID', component: PrePlayPageComponent},

  {path: 'register', component: RegistrationPageComponent},
  {path: 'login', component: LoginPageComponent },

  {path: 'profile', component: ProfilePageComponent },
  {path: 'pay', component: PayPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
