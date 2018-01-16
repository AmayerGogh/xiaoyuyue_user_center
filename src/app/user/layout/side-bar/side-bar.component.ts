import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AppAuthService } from 'app/shared/common/auth/app-auth.service';

@Component({
  selector: 'xiaoyuyue-admin-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class AdminSideBarComponent implements OnInit {
  @ViewChild('sideBar') sideBarEle: ElementRef;
  constructor(
    private _authService: AppAuthService
  ) { }

  ngOnInit() {
    const self = this;
    $('.menu-item').click(() => {
      self.hideSideBar();
    });
  }
  showSideBar() {
    this.sideBarEle.nativeElement.style.display = 'block';
    $('html').css({
      transform: 'translateX(-250px)',
      transition: 'all 0.2s linear'
    })
  }

  hideSideBar() {
    this.sideBarEle.nativeElement.style.display = 'none';
    $('html').css({
      transform: 'translateX(0)',
      transition: 'all 0.2s linear'
    })
  }

  logout() {
    this._authService.logout();
  }
}
