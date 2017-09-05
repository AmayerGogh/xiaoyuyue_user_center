import * as _ from 'lodash';

import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, HostListener, Injector, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { BookingServiceProxy, JoinBookingInfoDto, JoinBookingOutput } from 'shared/service-proxies/service-proxies';

import { AccessRecordService } from 'shared/services/access-record.service';
import { AppAuthService } from 'app/shared/common/auth/app-auth.service';
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
        private _bookingServiceProxy: BookingServiceProxy,
        private _appAuthService: AppAuthService,
        private _utilsService: UtilsService,
        private _router: Router
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
        this._accessRecordService.recordBookingAccess(() => {
            this._accessRecordService.setBookingAccessDailyCookies(this.bookingId);
        });
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
        // this._accessRecordService.recordBookingAccess(() => {
        //     this._accessRecordService.setBookingAccessDailyCookies(this.bookingId);
        // });
    }

    // @HostListener('window:pagehide')
    // closeWindow() {
    //     const result = this._accessRecordService.recordBookingAccess(() => {
    //         this._accessRecordService.setBookingAccessDailyCookies(this.bookingId);
    //     });
    // }
    public isBookingHandler(flag: boolean): void {
        if (!this._appAuthService.isLogin()) {
            const exdate = new Date();
            let href = location.href;
            exdate.setDate(exdate.getDate() + 1);

            this._router.navigate(['/auth/login']);
            this._utilsService.setCookieValue('UrlHelper.redirectUrl', href, exdate, '/');
        }
        this.selectTab(1);
        this.bookingTimeModel.showOptimalBookingTimeModel();
    }

    selectTab(tabId: number) {
        this.staticTabs.tabs[tabId].active = true;
    }
}
