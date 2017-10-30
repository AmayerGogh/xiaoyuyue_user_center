import { AfterViewInit, Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { AppComponentBase } from 'shared/common/app-component-base';
import { AdminSideBarComponent } from 'app/user/layout/side-bar/side-bar.component';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent extends AppComponentBase implements OnInit, AfterViewInit {
    toggleSideBarFlag: boolean;
    @ViewChild('sideBarModel') sideBarModel: AdminSideBarComponent;

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

