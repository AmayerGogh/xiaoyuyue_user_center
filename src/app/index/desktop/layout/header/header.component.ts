import { Component, OnInit } from '@angular/core';

import { AppConsts } from '@shared/AppConsts';

@Component({
    selector: 'xiaoyuyue-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    login(): void {
        window.location.href = AppConsts.appBusinessBaseUrl + '/auth/login';
    }

    register(): void {
        window.location.href = AppConsts.appBusinessBaseUrl + '/auth/register';
    }
}
