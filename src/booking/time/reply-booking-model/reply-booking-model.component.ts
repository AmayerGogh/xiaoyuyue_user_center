import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { BookingServiceProxy, JoinBookingInput } from 'shared/service-proxies/service-proxies';
import { AppComponentBase } from 'shared/common/app-component-base';

@Component({
  selector: 'xiaoyuyue-reply-booking-model',
  templateUrl: './reply-booking-model.component.html',
  styleUrls: ['./reply-booking-model.component.scss']
})
export class ReplyBookingModelComponent extends AppComponentBase implements OnInit {
  input: JoinBookingInput = new JoinBookingInput();
  @ViewChild('replyBookingModel') modal: ModalDirective;
  constructor(
    injector: Injector,
    private _bookingServiceProxy: BookingServiceProxy
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

  save(input: JoinBookingInput) {
    this.input = input;
    console.log(this.t(this.input.date));
  }

  submit() {
    this._bookingServiceProxy
      .joinBooking(this.input)
      .subscribe();
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
