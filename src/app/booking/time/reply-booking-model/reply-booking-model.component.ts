import { BookingServiceProxy, JoinBookingInput } from 'shared/service-proxies/service-proxies';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';

import { AppAuthService } from 'app/shared/common/auth/app-auth.service';
import { AppComponentBase } from 'shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'xiaoyuyue-reply-booking-model',
    templateUrl: './reply-booking-model.component.html',
    styleUrls: ['./reply-booking-model.component.scss']
})
export class ReplyBookingModelComponent extends AppComponentBase implements OnInit {
    hourOfDay: string;
    input: JoinBookingInput = new JoinBookingInput();
    href: string = document.location.href;
    bookingId: string = this.href.substr(this.href.lastIndexOf("/") + 1, this.href.length);
    @ViewChild('replyBookingModel') modal: ModalDirective;
    constructor(
        injector: Injector,
        private _router: Router,
        private _bookingServiceProxy: BookingServiceProxy
    ) {
        super(injector);
    }

    ngOnInit() {
    }

    show(hourOfDay?: string): void {
        this.hourOfDay = hourOfDay;
        this.modal.show();
    }

    close(): void {
        this.modal.hide();
    }

    save(input: JoinBookingInput) {
        this.input = input;
    }

    submit() {
        // 临时测试
        this.input.age = 0;
        this.input.emailAddress = "";
        this.input.gender = 0;

        if (this.href.indexOf("?") >= 0) {
            this.bookingId = this.bookingId.split("?")[0];
        }

        this._bookingServiceProxy
            .joinBooking(this.input)
            .subscribe(result => {
                this.close();
                // let bookedDetail = "?bookingname=" + result.bookingName + "&bookingcustomer=" + result.bookingCustomer + "&bookingdate=" + result.bookingDate + "&hourofday=" + result.hourOfDay;
                this._router.navigate(['/booking/booked/', this.bookingId], { queryParams: { bookingName: result.bookingName, bookingCustomer: result.bookingCustomer, bookingDate: this.t(result.bookingDate), hourOfDay: result.hourOfDay } });
            });
    }

    getNameHandler(event: any) {
        this.input.name = event.target.value;
    }

    getPhoneNumberHandler(event: any) {
        this.input.phoneNumber = event.target.value;
    }

    getSubscriberNumHandler(event: any) {
        this.input.subscriberNum = event.target.value;
    }
}
