import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppAuthService } from "app/shared/common/auth/app-auth.service";
import * as _ from 'lodash';

@Component({
  selector: 'xiaoyuyue-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class CenterSideBarComponent implements OnInit {
  @ViewChild('sideBar') sideBarEle: ElementRef;
  constructor(
    private _authService: AppAuthService
  ) { }

  ngOnInit() {
    let self = this;
    $(".menu-item").click(() => {
      self.hideSideBar();
    })
  }
  showSideBar() {
    this.sideBarEle.nativeElement.style.display = "block";
  }

  hideSideBar() {
    this.sideBarEle.nativeElement.style.display = "none";
  }

  layout() {
    this._authService.logout();
  }

}
