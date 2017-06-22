import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ReplyBookingModelComponent } from '../reply-booking-model/reply-booking-model.component';
import { JoinBookingInput } from 'shared/service-proxies/service-proxies';

@Component({
  selector: 'xiaoyuyue-optimal-booking-time-model',
  templateUrl: './optimal-booking-time-model.component.html',
  styleUrls: ['./optimal-booking-time-model.component.scss']
})
export class OptimalBookingTimeModelComponent implements OnInit {
  @ViewChild('optimalBookingTimeModel') modal: ModalDirective;
  @ViewChild('replyBookingModel') replyBookingModel: ReplyBookingModelComponent;
  constructor() { }

  ngOnInit() {
  }

  show(): void {
    this.modal.show();
  }

  close(): void {
    this.modal.hide();
  }
  
  confirmBookingTime() {
    this.close();
    this.replyBookingModel.show();
  }

    save(input: JoinBookingInput) {
      this.replyBookingModel.save(input);
  }
}
