import * as _ from 'lodash';

import { BookingTimelineDto, PerBookingOrderServiceProxy } from 'shared/service-proxies/service-proxies';
import { Component, Injector, OnInit } from '@angular/core';

import { AppComponentBase } from 'shared/common/app-component-base';
import { MediaCompressFormat } from 'shared/AppConsts';
import { Moment } from 'moment';
import { PictureUrlHelper } from 'shared/helpers/PictureUrlHelper';
import { Router } from '@angular/router';

@Component({
    selector: 'xiaoyuyue-time-line',
    templateUrl: './time-line.component.html',
    styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent extends AppComponentBase implements OnInit {
    allPerBookingOrderData: any[] = [];
    totalCount: number;
    perBookingOrderData: BookingTimelineDto[] = [];
    skipCount = 0;
    maxResultCount = 10;
    startDataTime: Moment;
    slogan = '啥都没有，赶紧去预约吧';

    infiniteScrollDistance = 2;
    infiniteScrollThrottle = 300;
    isLoaded = false;
    isLoading = false;

    constructor
        (
        injector: Injector,
        private _router: Router,
        private _perBookingOrderServiceProxy: PerBookingOrderServiceProxy
        ) {
        super(injector);
    }

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
