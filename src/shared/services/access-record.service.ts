import { BookingAccessRecordInput, BookingRecordServiceProxy, OutletServiceServiceProxy } from './../service-proxies/service-proxies';
import { BookingAccessSourceType, WeChatAccessSourceType } from './../AppEnums';

import { AppAuthService } from 'app/shared/common/auth/app-auth.service';
import { AppConsts } from './../AppConsts';
import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { UtilsService } from '@abp/utils/utils.service';
import { device } from 'device.js';

const UA = require('ua-device');

@Injectable()
export class AccessRecordService {
    constructor(
        private _utilsService: UtilsService,
        private _bookingRecordService: BookingRecordServiceProxy,
        private _appAuthService: AppAuthService
    ) { }

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

    recordBookingAccess(bookingId: number, source: string, weChatSource: string, accessTime: Moment, href: string) {
        const outputUa = new UA(window.navigator.userAgent);

        // 是否首次
        const bookingidString = this._utilsService.getCookieValue(AppConsts.accessRecord.bookings);
        let firstTimeOfDay = true;
        if (bookingidString) {
            firstTimeOfDay = bookingidString.split(',').indexOf(bookingId.toString()) < 0;
        }
        const hoverSecond = moment().diff(accessTime);
        const brand = outputUa.device.manufacturer;
        const isWap = (outputUa.device.type === 'mobile');

        const input = new BookingAccessRecordInput();
        input.firstTimeOfDay = firstTimeOfDay;
        input.accessUrl = href;
        input.bookingId = bookingId;
        input.osName = outputUa.os.name; // 操作系统
        input.deviceBrand = outputUa.device.manufacturer; // 设备品牌
        input.source = BookingAccessSourceType.getType(source); // 访问渠道
        input.weChatSource = WeChatAccessSourceType.getType(source); // 微信内来源
        input.isWap = (outputUa.device.type === 'mobile'); // 是否移动端
        input.standingTime = moment().diff(accessTime); // 计算停留时间
        this._bookingRecordService
            .recordBookingAccessAsync(input).toPromise()
            .then(result => { });
    }
}
