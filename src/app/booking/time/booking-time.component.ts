import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
    encapsulation: ViewEncapsulation.None
})
export class BookingTimeComponent extends AppComponentBase implements OnInit, AfterViewInit {
    defaultEnableBookingDate: string[] = ['1970-01-01'];
    selectIndex = 0;
    enableBookingDate: Date[] = [];
    selectDate = '';
    input: JoinBookingInput = new JoinBookingInput();

    href: string = document.location.href;
    bookingId: string = this.href.substr(this.href.lastIndexOf('/') + 1, this.href.length);
    source = '';
    availableDateItemData: JoinBookingDataInfo[] = [];

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
        this.loadBookingData();
    }
    ngAfterViewInit() {
        const self = this;
        if (this._appAuthService.isLogin() && this.href.indexOf('?') >= 0) {
            this._route
                .queryParams
                .subscribe(params => {
                    this.input.date = moment(new Date(params['date']));
                    this.selectIndex = params['index'];
                });

            // this.input
            this.replyBookingModel.show();
            this.replyBookingModel.save(this.input);
        }
    }

    loadBookingData() {
        const self = this;
        if (this.href.indexOf('?') >= 0) {
            this.bookingId = this.bookingId.split('?')[0];
        }
        this._bookingServiceProxy
            .getJoinBookingInfo(this.source, parseInt(this.bookingId))
            .subscribe(result => {
                this.availableDateItemData = result.availableDateItem;
                this.selectDate = result.availableDateItem[0].date.utcOffset('+08:00').format('YYYY-MM-DD');

                // 测试, 如果没有选择时间段,那么就赋值默认的一个id
                this.input.bookingItemId = this.availableDateItemData[0] ? this.availableDateItemData[0].times[0].id : 0;
                for (let i = 0; i < result.availableDateItem.length; i++) {
                    this.enableBookingDate.push(new Date(result.availableDateItem[i].date.toDate()));
                }
                this.input.date = moment(this.enableBookingDate[0]);
                $('.flatpickr').flatpickr({
                    inline: true,
                    minDate: 'today',
                    'locale': 'zh',
                    disableMobile: 'true',
                    enable: self.enableBookingDate.length === 0 ? self.defaultEnableBookingDate : self.enableBookingDate,
                    defaultDate: self.enableBookingDate[0],
                    onChange: function (selectedDates, dateStr, instance) {
                        self.input.date = moment(new Date(selectedDates));
                        // self.optimalBookingTimeModel.show();
                        // self.optimalBookingTimeModel.save(self.input);
                    },
                    // enable: ["2017-06-22", "2017-06-23"]
                });
            });
    }

    selectOptimalTime(index: number, time: JoinBookingTimeInfo) {
        this.selectIndex = index;

        if (!this._appAuthService.isLogin()) {
            const exdate = new Date();
            let href = location.href;
            exdate.setDate(exdate.getDate() + 1);
            this.selectDate = this.input.date.utcOffset('+08:00').format('YYYY-MM-DD');
            href += `?date=${this.selectDate}&index=${index}`;

            this._router.navigate(['/auth/login']);
            this._utilsService.setCookieValue('UrlHelper.redirectUrl', href, exdate, '/');
            return;
        }
        this.replyBookingModel.show(time.hourOfDay);
        this.replyBookingModel.save(this.input);
    }
}
