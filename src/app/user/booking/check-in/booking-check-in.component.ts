import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from 'shared/common/app-component-base';
import { ActivatedRoute } from '@angular/router';
import { PerBookingOrderServiceProxy, GetPersonBookingOrderOutput, BookingOrderInfoStatus } from 'shared/service-proxies/service-proxies';
import { appModuleAnimation } from 'shared/animations/routerTransition';

@Component({
    selector: 'xiaoyuyue-booking-check-in',
    templateUrl: './booking-check-in.component.html',
    styleUrls: ['./booking-check-in.component.scss'],
    animations: [appModuleAnimation()]
})
export class BookingCheckInComponent extends AppComponentBase implements OnInit {
    bookingOrderForEdidData: GetPersonBookingOrderOutput;
    bookingStatus: BookingOrderInfoStatus;
    outletPictureUrl: string = '/assets/common/images/booking/tenant-bg.png';
    bookingId: any;
    constructor(
        private injector: Injector,
        private _route: ActivatedRoute,
        private _perBookingOrderServiceProxy: PerBookingOrderServiceProxy
    ) {
        super(injector);
        this.bookingId = this._route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.loadBookingOrderForEditData(this.bookingId);
    }

    loadBookingOrderForEditData(bookingId: number) {
        this._perBookingOrderServiceProxy
            .getBookingOrderForEdit(bookingId)
            .subscribe(result => {
                this.bookingOrderForEdidData = result;
                this.bookingStatus = result.orderInfo.status;
                this.bookingOrderForEdidData.bookingInfo.outletPictureUrl = this.getOutletPictureUrl(this.bookingOrderForEdidData.bookingInfo.outletPictureUrl);
                console.log(this.bookingOrderForEdidData);
            })
    }

    private getOutletPictureUrl(url: string): string {
        return url === '' ? this.outletPictureUrl : url;
    }

}
