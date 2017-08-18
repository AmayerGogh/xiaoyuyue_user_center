import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ReplyBookingModelComponent } from '../reply-booking-model/reply-booking-model.component';
import { JoinBookingInput } from 'shared/service-proxies/service-proxies';
import { AppAuthService } from 'app/shared/common/auth/app-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'xiaoyuyue-optimal-booking-time-model',
  templateUrl: './optimal-booking-time-model.component.html',
  styleUrls: ['./optimal-booking-time-model.component.scss']
})
export class OptimalBookingTimeModelComponent implements OnInit {
  @ViewChild('optimalBookingTimeModel') modal: ModalDirective;
  @ViewChild('replyBookingModel') replyBookingModel: ReplyBookingModelComponent;
  constructor(
    private _router: Router,
    private _appAuthService: AppAuthService,
  ) { }

  ngOnInit() {
  }

  show(): void {
    this.modal.show();
  }

  close(): void {
    this.modal.hide();
  }

  confirmBookingTime() {
    if (!this._appAuthService.isLogin()) {
      this._router.navigate(['/auth/login']);
    }
    this.close();
    this.replyBookingModel.show();
  }

  save(input: JoinBookingInput) {
    this.replyBookingModel.save(input);
  }
}
