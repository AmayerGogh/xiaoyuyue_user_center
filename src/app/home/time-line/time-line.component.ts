import * as _ from 'lodash';

import { BookingTimelineDto, PerBookingOrderServiceProxy, PagedResultDtoOfBookingTimelineDto } from 'shared/service-proxies/service-proxies';
import { Component, Injector, OnInit } from '@angular/core';
import { MediaCompressFormat, MediaPath } from 'shared/AppConsts';

import { AppComponentBase } from 'shared/common/app-component-base';
import { ClientTypeHelper } from 'shared/helpers/ClientTypeHelper';
import { Moment } from 'moment';
import { ProfileServiceProxy } from '@shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
import { ScrollStatusOutput } from 'app/shared/utils/list-scroll.dto';
import { ListScrollService } from 'shared/services/list-scroll.service';

@Component({
    selector: 'xiaoyuyue-time-line',
    templateUrl: './time-line.component.html',
    styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent extends AppComponentBase implements OnInit {
    scrollStatusOutput: ScrollStatusOutput = new ScrollStatusOutput();
    updateDataIndex = -1;
    allPerBookingOrderData: any[] = [];
    totalCount: number;
    perBookingOrderData: BookingTimelineDto[] = [];
    skipCount = 0;
    maxResultCount = 10;
    startDataTime: Moment;
    slogan = '啥都没有，赶紧去预约吧';

    infiniteScrollDistance = 1;
    infiniteScrollThrottle = 300;
    isLoaded = false;
    isLoading = false;
    shownLoginName = '';
    profilePicture = MediaPath.defaultProfilePictureUrl;

    constructor
        (
        injector: Injector,
        private _router: Router,
        private _profileServiceProxy: ProfileServiceProxy,
        private _listScrollService: ListScrollService,
        private _perBookingOrderServiceProxy: PerBookingOrderServiceProxy
        ) {
        super(injector);
    }

    ngOnInit() {
        this.loadData();
        this.getProfilePicture();
        this.getCurrentLoginInformations();
    }

    ngAfterViewInit() {
        this.resetHeaderStyle();
    }

    ngOnDestroy() {
        this.beforeHeaderStyle();
    }

    // scrollHandleBack: 接收一个回调函数，控制下拉刷新，上拉加载的状态
    loadData(scrollHandleBack?: any): void {
        this.startDataTime = moment();
        this._perBookingOrderServiceProxy
            .getBookingTimeline(this.startDataTime, this.maxResultCount, this.skipCount)
            .finally(() => {
                scrollHandleBack && scrollHandleBack();
            })
            .subscribe((result: PagedResultDtoOfBookingTimelineDto) => {
                this.totalCount = result.totalCount;
                this.perBookingOrderData = result.items;

                if (this.perBookingOrderData.length > 0 && this.updateDataIndex < 0) {
                    this.allPerBookingOrderData.push(this.perBookingOrderData);
                } else {
                    this.allPerBookingOrderData[this.updateDataIndex] = this.perBookingOrderData;
                }
            })
    }

    resetHeaderStyle(): void {
        $('#fixedHeader').find('.top-title').addClass('opacity-bg');
    }

    beforeHeaderStyle(): void {
        $('#fixedHeader').find('.top-title').removeClass('opacity-bg');

    }
    showBookingDetail(bookingId: number) {
        const bookingUrl = '/user/booking/info/' + bookingId;
        if (!ClientTypeHelper.isWeChatMiniProgram) {
            this._router.navigate([bookingUrl]);
        } else {
            wx.miniProgram.redirectTo({
                url: `/pages/user-center/user-center?route=${encodeURIComponent(bookingUrl)}`
            })
        }
    }

    converTimelineData(item: BookingTimelineDto): BookingTimelineDto {
        return item;
    }

    getCurrentLoginInformations(): void {
        this.shownLoginName = this.appSession.getShownLoginName();
    }

    getProfilePicture(): void {
        this._profileServiceProxy.getProfilePicture().subscribe(result => {
            if (result && result.profilePicture) {
                this.profilePicture = result.profilePicture;
                // this.safeProfilePicture = this.sanitizer.bypassSecurityTrustStyle(this.profilePicture);
            }
        });
    }

    pullDownRefresh(): void {
        this.updateDataIndex = 0;
        this.skipCount = 0;
        this.scrollStatusOutput = new ScrollStatusOutput();
        this.scrollStatusOutput.pulledDownActive = true;
        this._listScrollService.listScrollFinished.emit(this.scrollStatusOutput);
        this.loadData(() => {
            this.scrollStatusOutput = new ScrollStatusOutput();
            this.scrollStatusOutput.pulledDownActive = false;
            this._listScrollService.listScrollFinished.emit(this.scrollStatusOutput);
        });
    }

    pullUpLoad(): void {
        this.updateDataIndex = -1;
        let totalCount = 0;
        this.allPerBookingOrderData.forEach(perBookingOrderData => {
            perBookingOrderData.forEach(element => {
                totalCount++;
            });
        });
        this.skipCount = totalCount;
        if (this.skipCount >= this.totalCount) {
            this.scrollStatusOutput = new ScrollStatusOutput();
            this.scrollStatusOutput.noMore = true;
            this._listScrollService.listScrollFinished.emit(this.scrollStatusOutput);
            return;
        }
        this.scrollStatusOutput = new ScrollStatusOutput();
        this.scrollStatusOutput.pulledUpActive = true;
        this._listScrollService.listScrollFinished.emit(this.scrollStatusOutput);
        this.loadData(() => {
            this.scrollStatusOutput = new ScrollStatusOutput();
            this.scrollStatusOutput.pulledUpActive = false;
            this._listScrollService.listScrollFinished.emit(this.scrollStatusOutput);
        });
    }
}
