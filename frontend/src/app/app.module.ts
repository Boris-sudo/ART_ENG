import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { PlayPageComponent } from './components/play-page/play-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { PrePlayPageComponent } from './components/pre-play-page/pre-play-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LearnTimeComponent } from './components/learn-time/learn-time.component';
import { PreLearnPageComponent } from './components/pre-learn-page/pre-learn-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    StartPageComponent,
    PlayPageComponent,
    RegistrationPageComponent,
    PrePlayPageComponent,
    LearnTimeComponent,
    PreLearnPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
