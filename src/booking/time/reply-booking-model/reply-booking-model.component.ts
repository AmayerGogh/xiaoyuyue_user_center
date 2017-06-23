import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { BookingServiceProxy, JoinBookingInput } from 'shared/service-proxies/service-proxies';

@Component({
  selector: 'xiaoyuyue-reply-booking-model',
  templateUrl: './reply-booking-model.component.html',
  styleUrls: ['./reply-booking-model.component.scss']
})
export class ReplyBookingModelComponent implements OnInit {
  input: JoinBookingInput;
  @ViewChild('replyBookingModel') modal: ModalDirective;
  constructor(
    private _bookingServiceProxy: BookingServiceProxy
  ) { }

  ngOnInit() {
  }

  show(): void {
    this.modal.show();
  }

  close(): void {
    this.modal.hide();
  }

  save(input: JoinBookingInput) {

    // this._bookingServiceProxy
      // .joinBooking(this.input)
      //   .subscribe();

  }
}
