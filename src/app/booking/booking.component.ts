import * as _ from 'lodash';

import { AfterViewInit, Component, HostListener, Injector, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { BookingServiceProxy, JoinBookingInfoDto, JoinBookingOutput } from 'shared/service-proxies/service-proxies';

import { AccessRecordService } from 'shared/services/access-record.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { BookingTimeComponent } from 'app/booking/time/booking-time.component';
import { Moment } from 'moment';
import { Observable } from 'rxjs/Rx';
import { PictureUrlHelper } from 'shared/helpers/PictureUrlHelper';
import { TabsetComponent } from 'ngx-bootstrap';
import { UtilsService } from '@abp/utils/utils.service';
import { accountModuleAnimation } from '@shared/animations/routerTransition';

@Component({
    templateUrl: './booking.component.html',
    styleUrls: [
        './booking.component.scss',
    ],
    animations: [accountModuleAnimation()],
    encapsulation: ViewEncapsulation.None
})
export class BookingComponent extends AppComponentBase implements OnInit, AfterViewInit, OnDestroy {
    optimalBookingTime: string;
    showReplyBookingModel = false;

    href: string = document.location.href;
    bookingId;
    bookingData: JoinBookingOutput;
    source = '';
    wechatSource = '';

    @ViewChild('staticTabs') staticTabs: TabsetComponent;
    @ViewChild('bookingTimeModel') bookingTimeModel: BookingTimeComponent;
    public constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _accessRecordService: AccessRecordService,
        private _bookingServiceProxy: BookingServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._route
            .queryParams
            .subscribe(params => {
                const date = moment(new Date(params['date']));
                const selectIndex = params['index'];
                if (date && selectIndex) {
                    this.showReplyBookingModel = true;
                }

                this.source = params['source'];
                this.wechatSource = params['wechatSource'];
            });

        this.bookingId = this._route.snapshot.paramMap.get('id');
    }

    ngAfterViewInit(): void {
        this.loadBookingData();
        this._accessRecordService.init(this.bookingId, this.source, this.wechatSource, this.href);
    }

    loadBookingData() {
        this._bookingServiceProxy
            .getJoinBookingInfo(parseInt(this.bookingId, null))
            .subscribe(result => {
                this.bookingData = result;
                this.bookingData.bookingInfo.pictures = _.map(this.bookingData.bookingInfo.pictures, PictureUrlHelper.getBookingPicCompressUrl);
                this.getOptimalBookingTime();
            });
    }

    getOptimalBookingTime(): void {
        if (!(this.bookingData && this.bookingData.availableDateItem.length > 0)) {
            this.optimalBookingTime = undefined;
            return;
        }
        const bookingData = this.bookingData.availableDateItem[0].date.local().format('YYYY-MM-DD');
        const bookingTime = this.bookingData.availableDateItem[0].times[0].hourOfDay;
        this.optimalBookingTime = bookingData + ' ' + bookingTime;
    }

    ngOnDestroy() {
        this._accessRecordService.recordBookingAccess(() => {
            this._accessRecordService.setBookingAccessDailyCookies(this.bookingId);
        });
    }

    @HostListener('window:pagehide')
    closeWindow() {
        const result = this._accessRecordService.recordBookingAccess(() => {
            this._accessRecordService.setBookingAccessDailyCookies(this.bookingId);
        });
    }
    public isBookingHandler(flag: boolean): void {
        this.selectTab(1);
        this.bookingTimeModel.showOptimalBookingTimeModel();
    }

    selectTab(tabId: number) {
        this.staticTabs.tabs[tabId].active = true;
    }
}
