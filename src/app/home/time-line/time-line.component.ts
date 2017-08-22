import * as moment from 'moment';

import { BookingTimelineDto, PerBookingOrderServiceProxy } from 'shared/service-proxies/service-proxies';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
    selector: 'xiaoyuyue-time-line',
    templateUrl: './time-line.component.html',
    styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {
    totalCount: number;
    perBookingOrderData: BookingTimelineDto[];
    skipCount: number;
    maxResultCount: number;
    startDataTime: moment.Moment;
    slogan = '啥都没有，赶紧去预约吧';

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
        this._router.navigate(['/user/booking/list/detail', bookingId]);
    }
}
