import * as _ from 'lodash';

import { BookingTimelineDto, PerBookingOrderServiceProxy } from 'shared/service-proxies/service-proxies';
import { Component, OnInit } from '@angular/core';

import { MediaCompressFormat } from 'shared/AppConsts';
import { Moment } from 'moment';
import { PictureUrlHelper } from "shared/helpers/PictureUrlHelper";
import { Router } from '@angular/router';

@Component({
    selector: 'xiaoyuyue-time-line',
    templateUrl: './time-line.component.html',
    styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {
    allPerBookingOrderData: any[] = [];
    totalCount: number;
    perBookingOrderData: BookingTimelineDto[] = [];
    skipCount: number = 0;
    maxResultCount: number = 10;
    startDataTime: Moment;
    slogan = '啥都没有，赶紧去预约吧';

    infiniteScrollDistance: number = 2;
    infiniteScrollThrottle: number = 300;
    isLoaded: boolean = false;
    isLoading: boolean = false;

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
                this.perBookingOrderData = _.map(result.items, this.converTimelineData);
                this.allPerBookingOrderData.push(this.perBookingOrderData);
            })
    }

    showBookingDetail(bookingId: number) {
        this._router.navigate(['/user/booking/info', bookingId]);
    }

    converTimelineData(item: BookingTimelineDto): BookingTimelineDto {
        item.orgLogoUrl = PictureUrlHelper.getTimelinePicCompressUrl(item.orgLogoUrl);
        return item;
    }

    public onScrollDown(): void {
        if (this.skipCount > (this.totalCount - this.maxResultCount)) {
            this.isLoaded = true;
            return;
        }
        this.skipCount += this.maxResultCount;
        this.loadData();
    }
}
