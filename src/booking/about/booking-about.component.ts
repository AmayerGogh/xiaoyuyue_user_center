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
  bookingId: number = 40;
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
        this._bookingServiceProxy
            .getJoinBookingInfo(this.source, this.bookingId)
            .subscribe(result => {
                this.businessAboutData = result.bookingInfo;
            })
    }

}