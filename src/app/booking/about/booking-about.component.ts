import 'assets/swiper/js/swiper.min'

import * as _ from 'lodash';

import { AfterViewInit, Component, Injector, Input, OnInit } from '@angular/core';
import { BookingServiceProxy, JoinBookingInfoDto } from 'shared/service-proxies/service-proxies';

import { AppComponentBase } from 'shared/common/app-component-base';
import { MediaCompressFormat } from 'shared/AppConsts';
import { PictureUrlHelper } from 'shared/helpers/PictureUrlHelper';
import { appModuleAnimation } from 'shared/animations/routerTransition';

declare var Swiper: any;

@Component({
    selector: 'xiaoyuyue-booking-about',
    templateUrl: './booking-about.component.html',
    styleUrls: ['./booking-about.component.scss'],
    animations: [appModuleAnimation()]
})

export class BookingAboutComponent extends AppComponentBase implements OnInit, AfterViewInit {
    @Input()
    businessAboutData: JoinBookingInfoDto;

    href: string = document.location.href;
    bookingId: string = this.href.substr(this.href.lastIndexOf('/') + 1, this.href.length);
    source = '';

    public constructor(
        injector: Injector,
        private _bookingServiceProxy: BookingServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.initSwiper();
        }, 500);
    }

    initSwiper(): void {
        const swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
        console.log(swiper);
    }
}