import { Component, ViewContainerRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SideBarComponent } from "app/shared/side-bar/side-bar.component";

@Component({
    templateUrl: './center.component.html'
})
export class CenterComponent implements OnInit, AfterViewInit {
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

