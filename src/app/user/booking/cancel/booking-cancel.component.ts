import { CancelBookingOrderInput, PerBookingOrderServiceProxy } from 'shared/service-proxies/service-proxies';
import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';

import { AppComponentBase } from 'shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'xiaoyuyue-booking-cancel',
    templateUrl: './booking-cancel.component.html',
    styleUrls: ['./booking-cancel.component.scss']
})
export class BookingCancelComponent extends AppComponentBase implements OnInit {
    @ViewChild('cancelBookingModal') modal: ModalDirective;
    @Output() isCancelBooking: EventEmitter<boolean> = new EventEmitter()
    input: CancelBookingOrderInput = new CancelBookingOrderInput()

    constructor(
        injector: Injector,
        private _perBookingOrderServiceProxy: PerBookingOrderServiceProxy
    ) {
        super(injector);
    }

    ngOnInit() {
    }

    show(bookingId: number): void {
        this.input.id = bookingId;
        this.modal.show();
    }

    close(): void {
        this.modal.hide();
    }

    submit() {
        this._perBookingOrderServiceProxy
            .cancelBookingOrder(this.input)
            .subscribe(result => {
                this.isCancelBooking.emit(true);
                this.notify.success('取消成功!');
                this.close();
            });

    }
}
