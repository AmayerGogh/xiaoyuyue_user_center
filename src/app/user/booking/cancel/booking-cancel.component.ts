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
    isShowTextarea: boolean = false;
    routineReason: string;
    otherReason: string;
    input: CancelBookingOrderInput = new CancelBookingOrderInput();

    @ViewChild('cancelBookingModal') modal: ModalDirective;
    @Output() isCancelBooking: EventEmitter<boolean> = new EventEmitter()

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

    isShowOtherTextarea(flag: boolean): void {
        this.isShowTextarea = flag;
    }

    submit() {
        this.input.refuseReason = this.isShowTextarea ? this.otherReason : this.routineReason;
        this._perBookingOrderServiceProxy
            .cancelBookingOrder(this.input)
            .subscribe(result => {
                this.isCancelBooking.emit(true);
                this.notify.success('取消成功!');
                this.close();
            });

    }

    public onHide() {
        this.routineReason = '';
        this.otherReason = '';
    }
}
