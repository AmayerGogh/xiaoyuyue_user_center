import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ProfileServiceProxy } from '@shared/service-proxies/service-proxies';
import { Location } from '@angular/common';

@Component({
  selector: 'xiaoyuyue-center-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class CenterHeaderComponent extends AppComponentBase implements OnInit {
  shownLoginName: string = "";
  profilePicture: string = "/assets/common/images/default-profile-picture.png";
  toggleSideBarFlag: boolean;

  @Output() toggleFlag: EventEmitter<boolean> = new EventEmitter();

  constructor(
    injector: Injector,
        private _location: Location,
    private _profileServiceProxy: ProfileServiceProxy,
  ) {
    super(injector)
  }

  ngOnInit() {
    this.getProfilePicture();
    this.getCurrentLoginInformations();
  }
  showSideBar() {
    this.toggleSideBarFlag = true;
    this.toggleFlag.emit(this.toggleSideBarFlag);
  }

  getCurrentLoginInformations(): void {
    this.shownLoginName = this.appSession.getShownLoginName();
  }

  getProfilePicture(): void {
    this._profileServiceProxy.getProfilePicture().subscribe(result => {
      if (result && result.profilePicture) {
        this.profilePicture = 'data:image/jpeg;base64,' + result.profilePicture;
      }
    });
  }

    back() {
    this._location.back();
  }
}
