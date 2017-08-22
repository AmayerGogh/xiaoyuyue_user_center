import 'assets/Swiper-3.4.2/dist/js/swiper.min'

import { AfterViewInit, Component, Injector, Input, OnInit } from '@angular/core';
import { BookingServiceProxy, JoinBookingInfoDto } from "shared/service-proxies/service-proxies";

import { AppComponentBase } from "shared/common/app-component-base";
import { appModuleAnimation } from "shared/animations/routerTransition";

declare var Swiper: any;

@Component({
    selector: 'xiaoyuyue-booking-about',
    templateUrl: './booking-about.component.html',
    styleUrls: ['./booking-about.component.scss'],
    animations: [appModuleAnimation()]
})

export class BookingAboutComponent extends AppComponentBase implements OnInit, AfterViewInit {
    href: string = document.location.href;
    bookingId: string = this.href.substr(this.href.lastIndexOf('/') + 1, this.href.length);
    source = '';
    businessAboutData: JoinBookingInfoDto;
    public constructor(
        injector: Injector,
        private _bookingServiceProxy: BookingServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.loadBookingData();
    }

    ngAfterViewInit() {
        setTimeout( () => {
            this.initSwiper();
        }, 500);
    }

    initSwiper(): void {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
        console.log(swiper);
    }

    loadBookingData() {
        if (this.href.indexOf("?") >= 0) {
            this.bookingId = this.bookingId.split("?")[0];
        }
        this._bookingServiceProxy
            .getJoinBookingInfo(this.source, parseInt(this.bookingId))
            .subscribe(result => {
                this.businessAboutData = result.bookingInfo;
            })
    }

}