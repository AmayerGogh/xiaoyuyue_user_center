import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppConsts } from 'shared/AppConsts';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit {
    fullpage: any;
    pagesArr: number[] = [];
    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.getPageOffsetTop();
        // this.fullpage = $('#mobileFullpage').fullpage({
        // });
    }

    ngOnDestroy() {
    }

    getPageOffsetTop(): void {
        let self = this;
        $(".page").each(function () {
            self.pagesArr.push($(this).offset().top);
        })
    }

    // 跳转机构中心
    linkToBusiness(): void {
        window.location.href = AppConsts.appBusinessBaseUrl;
    }
}
