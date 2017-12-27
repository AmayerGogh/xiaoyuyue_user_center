import { AfterViewInit, Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';

import { AppConsts } from 'shared/AppConsts';
import { ClientTypeHelper } from 'shared/helpers/ClientTypeHelper';
import { Router } from '@angular/router';
import { AppComponentBase } from 'shared/common/app-component-base';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent extends AppComponentBase implements OnInit, AfterViewInit {
    fullpage: any;
    pagesArr: number[] = [];
    constructor(
        private injector: Injector,
        private _router: Router
    ) {
        super(injector);
    }

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
            window.location.href = AppConsts.businessCenterUrl;
        } else {
            wx.miniProgram.navigateTo({
                url: '/pages/business-center/business-center'
            })
        }
    }

    // 跳转会员中心
    linkToHome(): void {
        if (!ClientTypeHelper.isWeChatMiniProgram) {
            this._router.navigate(['/user/home']);
        } else {
            wx.miniProgram.navigateTo({
                url: '/pages/user-center/user-center'
            })
        }
    }
}
