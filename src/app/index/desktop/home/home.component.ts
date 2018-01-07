import { AfterViewInit, Component, OnInit, Injector } from '@angular/core';

import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from 'shared/common/app-component-base';

@Component({
    selector: 'xiaoyuyue-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent extends AppComponentBase implements OnInit {
    introVideoUrl = 'https://static.vapps.com.cn/xiaoyuyue_usage_scenario.mp4';
    constructor(
        private injector: Injector
    ) {
        super(injector);
    }


    ngOnInit() {
    }

    createBooking(): void {
        window.location.href = AppConsts.businessCenterUrl + '/booking/create';
    }

}
