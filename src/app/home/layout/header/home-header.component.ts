import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeStyle } from '@angular/platform-browser';

import { AppComponentBase } from '@shared/common/app-component-base';
import { Location } from '@angular/common';
import { MediaPath } from 'shared/AppConsts';
import { ProfileServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
    selector: 'xiaoyuyue-home-header',
    templateUrl: './home-header.component.html',
    styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent extends AppComponentBase implements OnInit {
    safeProfilePicture: SafeStyle;
    shownLoginName = '';
    profilePicture = MediaPath.defaultProfilePictureUrl;
    toggleSideBarFlag: boolean;

    @Output() toggleFlag: EventEmitter<boolean> = new EventEmitter();

    constructor(
        injector: Injector,
        private sanitizer: DomSanitizer,
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
                this.profilePicture = result.profilePicture;
                // this.safeProfilePicture = this.sanitizer.bypassSecurityTrustStyle(this.profilePicture);
            }
        });
    }

    back() {
        this._location.back();
    }
}
