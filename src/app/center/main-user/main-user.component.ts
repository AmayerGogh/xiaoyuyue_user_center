import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerBookingOrderServiceProxy, BookingTimelineDto } from 'shared/service-proxies/service-proxies';
import * as moment from 'moment';

@Component({
    selector: 'xiaoyuyue-booking-main-user',
    templateUrl: './main-user.component.html',
    styleUrls: ['./main-user.component.scss']
})
export class MainUserComponent implements OnInit {
    totalCount: number;
    perBookingOrderData: BookingTimelineDto[];
    skipCount: number;
    maxResultCount: number;
    startDataTime: moment.Moment;
    slogan: string = "啥都没有，感觉去预约吧";

    constructor
        (
        private _router: Router,
        private _perBookingOrderServiceProxy: PerBookingOrderServiceProxy
        ) { }

    ngOnInit() {
        this.loadData();
    }

    loadData(): void {
        this._perBookingOrderServiceProxy
            .getBookingTimeline(this.startDataTime, this.maxResultCount, this.skipCount)
            .subscribe(result => {
                this.totalCount = result.totalCount;
                this.perBookingOrderData = result.items;
            })
    }

    showBookingDetail(bookingId: number) {
        this._router.navigate(['/app/admin/order/detail', bookingId]);
    }
}
