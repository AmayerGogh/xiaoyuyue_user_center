import { ActivatedRoute, Router } from '@angular/router';
import { BookingServiceProxy, JoinBookingInput } from 'shared/service-proxies/service-proxies';
import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild } from '@angular/core';

import { AppAuthService } from 'app/shared/common/auth/app-auth.service';
import { AppComponentBase } from 'shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { Moment } from 'moment';
import { LocalStorageService } from 'shared/utils/local-storage.service';

@Component({
    selector: 'xiaoyuyue-reply-booking-model',
    templateUrl: './reply-booking-model.component.html',
    styleUrls: ['./reply-booking-model.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReplyBookingModelComponent extends AppComponentBase implements OnInit {
    bookingTime: string;
    hourOfDay: string;
    saving: boolean = false;
    input: JoinBookingInput = new JoinBookingInput();
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
        
        let temp = `JoinBookingInfoCache-${this._route.snapshot.paramMap.get('id')}`
        this._localStorageService.getItem(temp, () => {})
        .then( (result: JoinBookingInput) => {
            this.input.name = result.name;
            this.input.phoneNumber = result.phoneNumber;
            this.input.subscriberNum = result.subscriberNum;
        })
    }

    submit() {
        // 临时测试
        this.input.age = 0;
        this.input.emailAddress = '';
        this.input.gender = 0;

        this.saving = true;
        this._bookingServiceProxy
            .joinBooking(this.input)
            .finally(() => { this.saving = false; })
            .subscribe(result => {
                this.close();
                let temp = `JoinBookingInfoCache-${this._route.snapshot.paramMap.get('id')}`
                this._localStorageService.setItem(temp, this.input);
                this._router.navigate(['/booking/booked'], { queryParams: { bookingName: result.bookingName, bookingCustomer: result.bookingCustomer, bookingDate: this.d(result.bookingDate), hourOfDay: result.hourOfDay } });
            });
    }
}
