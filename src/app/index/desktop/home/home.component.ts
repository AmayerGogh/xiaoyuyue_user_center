import { AfterViewInit, Component, OnInit } from '@angular/core';

import { AppConsts } from '@shared/AppConsts';

@Component({
    selector: 'xiaoyuyue-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
    introVideoUrl: string = 'http://static.xiaoyuyue.com/xiaoyuyue_usage_scenario.mp4';
    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        $('#fullpage').fullpage({
            autoScrolling: false,
            fitToSection: false,
            lockAnchors: false,
            anchors: ['head', 'about', 'table', 'booking', 'scene', 'contact'],
            // navigation: true,
            // navigationPosition: 'left',
            // navigationTooltips: ['快速创建', '关于小预约', '如何建表', '如何应约', '使用场景', '联系我们']
        });
    }
    createBooking(): void {
        window.location.href = AppConsts.appBusinessBaseUrl + '/booking/create';
    }

}
