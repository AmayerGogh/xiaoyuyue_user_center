import { Component, ElementRef, OnInit, ViewChild, Injector } from '@angular/core';

import { AppAuthService } from 'app/shared/common/auth/app-auth.service';
import { AppComponentBase } from 'shared/common/app-component-base';

@Component({
  selector: 'xiaoyuyue-admin-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class AdminSideBarComponent extends AppComponentBase implements OnInit {
  @ViewChild('sideBar') sideBarEle: ElementRef;
  constructor(
      private injector: Injector,
    private _authService: AppAuthService
  ) {
      super(injector)
  }

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
