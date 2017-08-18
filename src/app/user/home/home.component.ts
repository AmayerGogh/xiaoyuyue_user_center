import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { HomeSideBarComponent } from 'app/user/home//layout/side-bar/home-side-bar.component';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {
    toggleSideBarFlag: boolean;
    @ViewChild('sideBarModel') sideBarModel: HomeSideBarComponent;

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

