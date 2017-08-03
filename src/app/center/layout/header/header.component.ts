import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ProfileServiceProxy } from '@shared/service-proxies/service-proxies';
import { Location } from '@angular/common';
import { SafeResourceUrl, DomSanitizer, SafeStyle } from "@angular/platform-browser";

@Component({
    selector: 'xiaoyuyue-center-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class CenterHeaderComponent extends AppComponentBase implements OnInit {
    safeProfilePicture: SafeStyle;
    shownLoginName: string = "";
    profilePicture: string = "/assets/common/images/default-profile-picture.png";
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
