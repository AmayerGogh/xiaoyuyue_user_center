import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AppConsts } from 'shared/AppConsts';
import { ClientTypeHelper } from 'shared/helpers/ClientTypeHelper';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit {
    fullpage: any;
    pagesArr: number[] = [];
    constructor(
        private _router: Router
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.getPageOffsetTop();
        // this.fullpage = $('#mobileFullpage').fullpage({
        // });
    }

    getPageOffsetTop(): void {
        const self = this;
        $('.page').each(function () {
            self.pagesArr.push($(this).offset().top);
        })
    }

    // 跳转机构中心
    linkToBusiness(): void {
        if (!ClientTypeHelper.isWeChatMiniProgram) {
            window.location.href = AppConsts.appBusinessBaseUrl;
        } else {
            wx.redirectTo({
                url: 'pages/business-center/business-centerr'
            })
        }
    }

    // 跳转会员中心
    linkToHome(): void {
        if (!ClientTypeHelper.isWeChatMiniProgram) {
            this._router.navigate(['/user/home']);
        } else {
            wx.redirectTo({
                url: 'pages/user-center/user-center'
            })
        }
    }
}
