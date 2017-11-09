import 'assets/swiper/js/swiper.min'

import * as _ from 'lodash';

import { AfterViewInit, Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { BookingServiceProxy, JoinBookingInfoDto } from 'shared/service-proxies/service-proxies';

import { AppComponentBase } from 'shared/common/app-component-base';
import { MediaCompressFormat } from 'shared/AppConsts';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { BusinessMapsModelComponent } from './business-maps-model/business-maps-model.component';
import { ContactorModelComponent } from './contactor-model/contactor-model.component';

declare var Swiper: any;

@Component({
    selector: 'xiaoyuyue-booking-about',
    templateUrl: './booking-about.component.html',
    styleUrls: ['./booking-about.component.scss'],
    animations: [appModuleAnimation()],
    encapsulation: ViewEncapsulation.None
})

export class BookingAboutComponent extends AppComponentBase implements OnInit, AfterViewInit {
    @Input()
    businessAboutData: JoinBookingInfoDto;
    @Input()
    optimalBookingTime: string;
    @Output()
    isBooking: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('businessMapsModel') businessMapsModel: BusinessMapsModelComponent;
    @ViewChild('contactorModel') contactorModel: ContactorModelComponent;
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
        const swiper = new Swiper('#bookingAboutSwiperContainer', {
            autoplay : 2000,
            loop: true,
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
    }

    atOnceBooking(): void {
        this.isBooking.emit(true);
    }

    showBusinessMap(): void {
        this.businessMapsModel.show();
    }

    showContactorModel(): void {
        this.contactorModel.show(this.businessAboutData.contactorName, this.businessAboutData.contactorWechatUrl);
    }
}