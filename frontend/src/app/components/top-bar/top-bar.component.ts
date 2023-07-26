import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(
    public router: Router,
    public route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
  }

  go (link: string) {
    this.router.navigate([link]);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
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

  go_to_login(type:string) {
    this.router.navigate(['/register'])
    setTimeout(function () {
      if(type=='register') { // @ts-ignore
        document.getElementById('container').classList.add('right-panel-active');
      }
    }, 10)
  }
}
