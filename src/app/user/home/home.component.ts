import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { SideBarComponent } from 'app/shared/side-bar/side-bar.component';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {
    toggleSideBarFlag: boolean;
    @ViewChild('sideBarModel') sideBarModel: SideBarComponent;

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

