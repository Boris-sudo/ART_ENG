import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayPageComponent} from "./components/play-page/play-page.component";
import {RegistrationPageComponent} from "./components/registration-page/registration-page.component";
import {StartPageComponent} from "./components/start-page/start-page.component";
import {PrePlayPageComponent} from "./components/pre-play-page/pre-play-page.component";
import {LearnTimeComponent} from "./components/learn-time/learn-time.component";
import {PreLearnPageComponent} from "./components/pre-learn-page/pre-learn-page.component";

const routes: Routes = [
  {path: '', component: StartPageComponent},

  {path: 'play/:timesID', component: PlayPageComponent},
  {path: 'pre-play/:timesID', component: PrePlayPageComponent},

  {path: 'pre-learn', component: PreLearnPageComponent},
  {path: 'learn-time/:timeName', component: LearnTimeComponent},

  {path: 'register', component: RegistrationPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
