import { BookingAccessRecordInput, BookingRecordServiceProxy, OutletServiceServiceProxy } from './../service-proxies/service-proxies';
import { BookingAccessSourceType, WeChatAccessSourceType } from './../AppEnums';

import { AppAuthService } from 'app/shared/common/auth/app-auth.service';
import { AppConsts } from './../AppConsts';
import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { UtilsService } from '@abp/utils/utils.service';
import { async } from '@angular/core/testing';
import { device } from 'device.js';

const UA = require('ua-device');

@Injectable()
export class AccessRecordService {
    outputUa;
    firstTimeOfDay = true;
    bookingId;
    source;
    weChatSource;
    accessTime;
    href;
    constructor(
        private _utilsService: UtilsService,
        private _bookingRecordService: BookingRecordServiceProxy,
        private _appAuthService: AppAuthService
    ) { }

    init(bookingId: number, source: string, weChatSource: string, href: string) {
        this.bookingId = bookingId;
        this.source = source;
        this.weChatSource = weChatSource;
        this.href = href;
        this.accessTime = moment();
        this.outputUa = new UA(window.navigator.userAgent);
        // 是否首次
        const bookingidString = this._utilsService.getCookieValue(AppConsts.accessRecord.bookings);
        if (bookingidString) {
            this.firstTimeOfDay = bookingidString.split(',').indexOf(bookingId.toString()) < 0;
        }
    }

    setBookingAccessDailyCookies(bookingId: number) {
        const bookingIdString = bookingId.toString();
        const cookiesExpireDate = moment().endOf('day').toDate();
        const bookingidString = this._utilsService.getCookieValue(AppConsts.accessRecord.bookings);
        let bookingIds = [];
        if (bookingidString) {
            bookingIds = this._utilsService.getCookieValue(AppConsts.accessRecord.bookings).split(',');
        }
        if (bookingIds.indexOf(bookingIdString) >= 0) {
            return;
        } else {
            bookingIds.push(bookingIdString);
            this._utilsService.setCookieValue(AppConsts.accessRecord.bookings, bookingIds.join(','), cookiesExpireDate,
                abp.appPath)
        }
    }


    recordBookingAccess(finallyCallback: () => void) {
        const input = new BookingAccessRecordInput();
        input.firstTimeOfDay = this.firstTimeOfDay;
        input.accessUrl = this.href;
        input.bookingId = this.bookingId;
        input.osName = this.outputUa.os.name; // 操作系统
        input.deviceBrand = this.outputUa.device.manufacturer; // 设备品牌
        input.source = BookingAccessSourceType.getType(this.source); // 访问渠道
        input.weChatSource = WeChatAccessSourceType.getType(this.source); // 微信内来源
        input.isWap = (this.outputUa.device.type === 'mobile'); // 是否移动端
        input.standingTime = moment().diff(this.accessTime); // 计算停留时间
        const data = JSON.stringify(input.toJSON());
        this._bookingRecordService
            .recordBookingAccessAsync(input)
            .subscribe(result => {
                finallyCallback();
            });

        // return abp.ajax({
        //     url: AppConsts.remoteServiceBaseUrl + '/api/services/app/BookingRecord/RecordBookingAccessAsync',
        //     method: 'POST',
        //     async: false,
        //     data: data,
        //     headers: {
        //         Authorization: 'Bearer ' + abp.auth.getToken(),
        //         'Abp.TenantId': abp.multiTenancy.getTenantIdCookie()
        //     },
        //     success: function (result) {
        //         console.log('');

        //     },
        //     error: function (result, status) {
        //         console.log('');
        //     }
        // }).done(result => {
        //     finallyCallback();
        // });
    }
}
