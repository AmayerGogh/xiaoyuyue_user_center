import * as _ from 'lodash';

import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { AppAuthService } from 'app/shared/common/auth/app-auth.service';

@Component({
  selector: 'xiaoyuyue-home-side-bar',
  templateUrl: './home-side-bar.component.html',
  styleUrls: ['./home-side-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeSideBarComponent implements OnInit {
  @ViewChild('sideBar') sideBarEle: ElementRef;
  constructor(
    private _authService: AppAuthService
  ) { }

  ngOnInit() {
    const self = this;
    $('.menu-item').click(() => {
      self.hideSideBar();
    })
  }
  showSideBar() {
    this.sideBarEle.nativeElement.style.display = 'block';
    $('html').css({
      transform: 'translateX(-250px)',
      transition: 'all 0.6s cubic-bezier(0.13, 0.41, 0, 1.17)'
    })
  }

  hideSideBar() {
    this.sideBarEle.nativeElement.style.display = 'none';
    $('html').css({
      transform: 'translateX(0)',
      transition: 'all 0.6s cubic-bezier(0.13, 0.41, 0, 1.17)'
    })
  }

  logout() {
    this._authService.logout();
  }
}
