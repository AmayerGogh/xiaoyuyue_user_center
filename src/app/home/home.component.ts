import { AfterViewInit, Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { AppComponentBase } from 'shared/common/app-component-base';
import { HomeSideBarComponent } from 'app/home/layout/side-bar/home-side-bar.component';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent extends AppComponentBase implements OnInit, AfterViewInit {
    toggleSideBarFlag: boolean;
    @ViewChild('sideBarModel') sideBarModel: HomeSideBarComponent;

    public constructor(
        injector: Injector
    ) {
        super(injector);
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

