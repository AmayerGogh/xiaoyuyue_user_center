import * as _ from 'lodash';

import { AfterViewInit, Component, HostListener, Injector, Input, OnDestroy, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { BookingServiceProxy, JoinBookingInfoDto, JoinBookingOutput } from 'shared/service-proxies/service-proxies';

import { AccessRecordService } from 'shared/services/access-record.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Moment } from 'moment';
import { Observable } from 'rxjs/Rx';
import { PictureUrlHelper } from 'shared/helpers/PictureUrlHelper';
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
    showReplyBookingModel = false;

    href: string = document.location.href;
    bookingId;
    bookingData: JoinBookingOutput;
    accessTime;
    source = '';
    wechatSource = '';
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

        this.accessTime = moment();
        this.bookingId = this._route.snapshot.paramMap.get('id');
    }

    ngAfterViewInit(): void {
        this.loadBookingData();

    }

    loadBookingData() {
        this._bookingServiceProxy
            .getJoinBookingInfo(parseInt(this.bookingId, null))
            .subscribe(result => {
                this.bookingData = result;
                this.bookingData.bookingInfo.pictures = _.map(this.bookingData.bookingInfo.pictures, PictureUrlHelper.getBookingPicCompressUrl);
            });
    }

    ngOnDestroy() {
        this._accessRecordService.recordBookingAccess(this.bookingId, this.source, this.wechatSource, this.accessTime, this.href);
        ;
    }

    @HostListener('window:beforeunload')
    closeWindow() {
        this._accessRecordService.recordBookingAccess(this.bookingId, this.source, this.wechatSource, this.accessTime, this.href);
        this._accessRecordService.setBookingAccessDailyCookies(this.bookingId);
    }

    recordBookingAccess() {
        // 计算停留时间
        const hoverSecond = moment().diff(this.accessTime);
    }
}
