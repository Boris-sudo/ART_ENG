import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    // @ts-ignore
    var username = document.getElementById('login-name').value;
    // @ts-ignore
    var password = document.getElementById('login-password').value;

    this.router.navigate(['']);
  }

  register(): void {
    // @ts-ignore
    var username = document.getElementById('registration-name').value;
    // @ts-ignore
    var email = document.getElementById('registration-email').value;
    // @ts-ignore
    var password1 = document.getElementById('registration-password1').value;
    // @ts-ignore
    var password2 = document.getElementById('registration-password2').value;

    if (password2 != password1) {
      // @ts-ignore
      document.getElementById('password2-icon').style.display='block';
      // @ts-ignore
      document.getElementById('password2-content').innerHTML='<p>passwords are not the same</p>'
    }
    else {
      // @ts-ignore
      document.getElementById('password2-icon').style.display='none';
    }
    if (!('a' <= username[0] && username[0] <= 'z') || username.length > 16) {
      // @ts-ignore
      document.getElementById('username-icon').style.display='block'
      if (username.length > 16) {
        // @ts-ignore
        document.getElementById('username-content').innerHTML = '<p>too long username</p>';
      } else {
        // @ts-ignore
        document.getElementById('username-content').innerHTML = '<p>username should start with a letter</p>';
      }
    }
    else {
      // @ts-ignore
      document.getElementById('username-icon').style.display='none'
    }

    if (password2 == password1 && ('a' <= username[0] && username[0] <= 'z') && username.length <= 16) {

      this.router.navigate([]);
    }
  }

  show_content(id:string) {
    // @ts-ignore
    document.getElementById(id).style.display='block';
  }
  hide_content(id:string) {
    // @ts-ignore
    document.getElementById(id).style.display='none';
  }
}
