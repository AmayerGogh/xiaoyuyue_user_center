import { Component, OnInit, Injector } from '@angular/core';

import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from 'shared/common/app-component-base';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
    selector: 'xiaoyuyue-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class DesktopHeaderComponent extends AppComponentBase implements OnInit, AfterViewInit {
    currentUrl: string;
    scrollSectionArr: number[] = [];

    constructor(
        private injector: Injector,
    ) {
        super(injector);
        this.router.events.subscribe((event: NavigationEnd) => {
            this.currentUrl = event.url;
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.initPageSections();
    }

    login(): void {
        window.location.href = AppConsts.businessCenterUrl + '/auth/login';
    }

    register(): void {
        window.location.href = AppConsts.businessCenterUrl + '/auth/register';
    }

    public scrolled(index: number): void {
        if (this.currentUrl !== '/') {
            this.router.navigate(['/']);
        }
            const scrollTop = this.scrollSectionArr[index] - 80;
            $('html, body').animate({ scrollTop: scrollTop }, 300);
    }

    private initPageSections(): void {
/*         $.each($('.section'), (i, data) => {
            this.scrollSectionArr.push($('.section').eq(i).position().top);
        }); */
        this.scrollSectionArr = [712, 1612, 2512, 3412, 4270];
    }
}
