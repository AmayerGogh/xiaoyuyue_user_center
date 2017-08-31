import * as _ from 'lodash';

import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, ChangeDetectionStrategy, Component, Injector, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BookingServiceProxy, JoinBookingDataInfo, JoinBookingInput, JoinBookingTimeInfo } from 'shared/service-proxies/service-proxies';

import { AppAuthService } from 'app/shared/common/auth/app-auth.service';
import { AppComponentBase } from 'shared/common/app-component-base';
import { OptimalBookingTimeModelComponent } from './optimal-booking-time-model/optimal-booking-time-model.component';
import { ReplyBookingModelComponent } from './reply-booking-model/reply-booking-model.component';
import { UtilsService } from '@abp/utils/utils.service';
import { appModuleAnimation } from 'shared/animations/routerTransition';

@Component({
    selector: 'xiaoyuyue-booking-time',
    templateUrl: './booking-time.component.html',
    styleUrls: ['./booking-time.component.scss'],
    animations: [appModuleAnimation()],
    encapsulation: ViewEncapsulation.None,
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingTimeComponent extends AppComponentBase implements OnInit, AfterViewInit {
    hourOfDay: string;

    defaultEnableBookingDate: string[] = ['1970-01-01'];
    selectIndex = 0;
    enableBookingDate: Date[] = [];
    selectDate = '';
    input: JoinBookingInput = new JoinBookingInput();

    href: string = document.location.href;
    source = '';

    @Input() availableDateItemData: JoinBookingDataInfo[] = [];
    @ViewChild('optimalBookingTimeModel') optimalBookingTimeModel: OptimalBookingTimeModelComponent;
    @ViewChild('replyBookingModel') replyBookingModel: ReplyBookingModelComponent;
    public constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _bookingServiceProxy: BookingServiceProxy,
        private _appAuthService: AppAuthService,
        private _utilsService: UtilsService,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.loadBookingTimeData();

        const self = this;
        if (this.ifLoginCallBack()) {
            this._route.queryParams.subscribe(params => {
                const now = moment();
                self.input.date = moment(new Date(params['date'])).local();
                self.selectIndex = params['index'];
                self.availableDateItemData.forEach(item => {
                    if (item.date.isSame(self.input.date)) {
                        self.hourOfDay = item.times[self.selectIndex].hourOfDay
                    }
                });
                self.replyBookingModel.init(self.input, self.hourOfDay);
            });
        }
    }

    ngAfterViewInit() {
        if (this.ifLoginCallBack()) {
            this.replyBookingModel.show();
        }
    }

    loadBookingTimeData() {
        const defaultTimeItem = this.availableDateItemData[0];

        if (typeof defaultTimeItem === 'object' && defaultTimeItem.hasOwnProperty('date')) {
            this.selectDate = this.availableDateItemData[0].date.utcOffset('+08:00').format('YYYY-MM-DD');
        }
        // 测试, 如果没有选择时间段,那么就赋值默认的一个id
        this.input.bookingItemId = this.availableDateItemData[0] ? this.availableDateItemData[0].times[0].id : 0;
        for (let i = 0; i < this.availableDateItemData.length; i++) {
            this.enableBookingDate.push(new Date(this.availableDateItemData[i].date.toDate()));
        }
        this.input.date = moment(this.enableBookingDate[0]);
        $('.flatpickr').flatpickr({
            inline: true,
            minDate: 'today',
            'locale': 'zh',
            disableMobile: 'true',
            enable: this.enableBookingDate.length === 0 ? this.defaultEnableBookingDate : this.enableBookingDate,
            defaultDate: this.enableBookingDate[0],
            onChange: (selectedDates, dateStr, instance) => {
                this.input.date = moment(new Date(selectedDates));
                // self.optimalBookingTimeModel.show();
                // self.optimalBookingTimeModel.save(self.input);
            },
            // enable: ["2017-06-22", "2017-06-23"]
        });
    }

    selectOptimalTime(index: number, time: JoinBookingTimeInfo) {
        this.selectIndex = index;
        this.hourOfDay = time.hourOfDay;

        if (!this._appAuthService.isLogin()) {
            const exdate = new Date();
            let href = location.href;
            exdate.setDate(exdate.getDate() + 1);
            this.selectDate = this.input.date.utcOffset('+08:00').format('YYYY/MM/DD');
            href += encodeURI(`?date=${this.selectDate}&index=${this.selectIndex}`);

            this._router.navigate(['/auth/login']);
            this._utilsService.setCookieValue('UrlHelper.redirectUrl', href, exdate, '/');
            return;
        }
        this.replyBookingModel.init(this.input, time.hourOfDay);
        this.replyBookingModel.show();
    }

    ifLoginCallBack() {
        if (this._appAuthService.isLogin() && this.href.indexOf('?') >= 0) {
            return true
        } else {
            return false;
        }
    }
}