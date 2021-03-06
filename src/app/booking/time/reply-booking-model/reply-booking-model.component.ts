import { ActivatedRoute, Router } from '@angular/router';
import { BookingServiceProxy, JoinBookingInfoDto, JoinBookingInput, JoinBookingInputGender } from 'shared/service-proxies/service-proxies';
import { ChangeDetectionStrategy, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';

import { AppAuthService } from 'app/shared/common/auth/app-auth.service';
import { AppComponentBase } from 'shared/common/app-component-base';
import { LocalStorageService } from 'shared/utils/local-storage.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Moment } from 'moment';
import { SelectHelper } from 'shared/helpers/SelectHelper';

@Component({
    selector: 'xiaoyuyue-reply-booking-model',
    templateUrl: './reply-booking-model.component.html',
    styleUrls: ['./reply-booking-model.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReplyBookingModelComponent extends AppComponentBase implements OnInit {
    bookingTime: string;
    hourOfDay: string;
    saving = false;
    input: JoinBookingInput = new JoinBookingInput();
    cacheKey = 'JoinBookingInfoCache';
    genderSelectListData: Object[] = SelectHelper.GenderList();
    defaultGenderSelect: string = '0';

    @Input() bookingInfoData: JoinBookingInfoDto = new JoinBookingInfoDto();
    @ViewChild('replyBookingModel') modal: ModalDirective;
    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _bookingServiceProxy: BookingServiceProxy,
        private _localStorageService: LocalStorageService
    ) {
        super(injector);
    }

    ngOnInit() {
    }

    show(): void {
        this.modal.show();
    }

    close(): void {
        this.modal.hide();
    }

    init(input: JoinBookingInput, hourOfDay?: string) {
        this.input = input;
        this.bookingTime = this.t(input.date);
        this.hourOfDay = hourOfDay;

        this._localStorageService.getItem(this.cacheKey)
            .then((result: JoinBookingInput) => {
                if (result) {
                    this.input.name = result.name;
                    this.input.phoneNumber = result.phoneNumber;
                    this.input.subscriberNum = result.subscriberNum;
                }
            })
    }

    submit() {
        this.saving = true;
        this._bookingServiceProxy
            .joinBooking(this.input)
            .finally(() => { this.saving = false; })
            .subscribe(result => {
                this.close();
                this._localStorageService.setItem(this.cacheKey, this.input);
                this._router.navigate(['/booking/booked'], { queryParams: { bookingName: result.bookingName, bookingCustomer: result.bookingCustomer, bookingDate: this.d(result.bookingDate), hourOfDay: result.hourOfDay } });
            });
    }

    selectGenderHandler(gender: JoinBookingInputGender): void {
        this.input.gender = gender;
    }
}
