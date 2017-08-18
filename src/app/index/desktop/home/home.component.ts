import { Component, OnInit } from '@angular/core';

import { AppConsts } from '@shared/AppConsts';

@Component({
    selector: 'xiaoyuyue-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
    createBooking(): void {
        window.location.href = AppConsts.appBusinessBaseUrl + '/app/admin/booking/create';
    }

}
