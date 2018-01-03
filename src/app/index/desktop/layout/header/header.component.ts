import { Component, OnInit, Injector } from '@angular/core';

import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from 'shared/common/app-component-base';

@Component({
    selector: 'xiaoyuyue-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class DesktopHeaderComponent extends AppComponentBase implements OnInit {

    constructor(
        private injector: Injector
    ) {
        super(injector);
    }

    ngOnInit() {
    }

    login(): void {
        window.location.href = AppConsts.businessCenterUrl + '/auth/login';
    }

    register(): void {
        window.location.href = AppConsts.businessCenterUrl + '/auth/register';
    }
}
