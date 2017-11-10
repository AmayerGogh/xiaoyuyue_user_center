import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { AdminSideBarComponent } from 'app/user/layout/side-bar/side-bar.component';

@Component({
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, AfterViewInit {
    toggleSideBarFlag = false;
    @ViewChild('sideBarModel') sideBarModel: AdminSideBarComponent;
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

