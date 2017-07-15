import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { PerBookingOrderServiceProxy, CancelBookingOrderInput } from 'shared/service-proxies/service-proxies';
import { AppComponentBase } from 'shared/common/app-component-base';

@Component({
  selector: 'xiaoyuyue-cancel-booking-modal',
  templateUrl: './cancel-booking-modal.component.html',
  styleUrls: ['./cancel-booking-modal.component.scss']
})
export class CancelBookingModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('cancelBookingModal') modal: ModalDirective;
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
      .subscribe( result => {
        this.notify.success("取消成功!");
        this.close();
      });

  }
}
