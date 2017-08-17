import { Component, OnInit, Injector, Input } from '@angular/core';
import { appModuleAnimation } from "shared/animations/routerTransition";
import { AppComponentBase } from "shared/common/app-component-base";
import { JoinBookingInfoDto, BookingServiceProxy } from "shared/service-proxies/service-proxies";

@Component({
    selector: 'xiaoyuyue-booking-about',
    templateUrl: './booking-about.component.html',
    styleUrls: ['./booking-about.component.scss'],
    animations: [appModuleAnimation()]
})

export class BookingAboutComponent extends AppComponentBase implements OnInit {
    href: string = document.location.href;
    bookingId: string = this.href.substr(this.href.lastIndexOf("/") + 1, this.href.length);
    source: string = "";
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