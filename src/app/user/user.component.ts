import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { UserSideBarComponent } from 'app/admin/layout/side-bar/side-bar.component';

@Component({
    templateUrl: './admin.component.html'
})
export class UserComponent implements OnInit, AfterViewInit {
    toggleSideBarFlag: boolean = false;
    title: string = "维普氏科技";
    @ViewChild('sideBarModel') sideBarModel: UserSideBarComponent;
    public constructor(
    ) {
    }

    ngOnInit(): void {
        // SignalRHelper.initSignalR(() => { this._chatSignalrService.init(); });
    }

    ngAfterViewInit(): void {
    }



    showSideBarHandler(flag) {
        this.toggleSideBarFlag = flag;
        this.toggleSideBarFlag && this.sideBarModel.showSideBar();
    }
}

