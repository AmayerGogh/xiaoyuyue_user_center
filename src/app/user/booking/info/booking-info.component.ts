import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BookingOrderInfoStatus, GetPersonBookingOrderOutput, PerBookingOrderServiceProxy } from 'shared/service-proxies/service-proxies';

import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'shared/common/app-component-base';
import { BookingCancelComponent } from 'app/user/booking/cancel/booking-cancel.component';
import { ClientTypeHelper } from 'shared/helpers/ClientTypeHelper';
import { MediaCompressFormat } from 'shared/AppConsts';
import { QrcodeModelComponent } from './qrcode-model/qrcode-model.component';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { BookingCheckInService } from 'shared/services/booking-check-in.service';

@Component({
    selector: 'xiaoyuyue-booking-info',
    templateUrl: './booking-info.component.html',
    styleUrls: ['./booking-info.component.scss'],
    animations: [appModuleAnimation()]
})
export class BookingInfoComponent extends AppComponentBase implements OnInit, AfterViewInit {
    bookingOrderForEdidData: GetPersonBookingOrderOutput;

    href: string = document.location.href;
    bookingId;
    bookingStatus: BookingOrderInfoStatus;
    outletPictureUrl: string = '/assets/common/images/booking/tenant-bg.png';
    iswxjsEnvironment = false;

    @ViewChild('cancelBookingModal') cancelBookingModal: BookingCancelComponent;
    @ViewChild('qrcodeModel') qrcodeModel: QrcodeModelComponent;
    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _bookingCheckInService: BookingCheckInService,
        private _perBookingOrderServiceProxy: PerBookingOrderServiceProxy
    ) {
        super(injector);
        this.bookingId = this._route.snapshot.paramMap.get('id');
        this.iswxjsEnvironment = ClientTypeHelper.isWeChatMiniProgram;
        this._bookingCheckInService.checkedIn.subscribe(() => {
            this.loadBookingOrderForEditData(this.bookingId);
        })
    }

    ngOnInit() {
        this.loadBookingOrderForEditData(this.bookingId);
    }

    ngAfterViewInit() {

    }

    loadBookingOrderForEditData(bookingId: number) {
        this._perBookingOrderServiceProxy
            .getBookingOrderForEdit(bookingId)
            .subscribe(result => {
                this.bookingOrderForEdidData = result;
                this.bookingStatus = result.orderInfo.status;
                this.bookingOrderForEdidData.bookingInfo.outletPictureUrl = this.getOutletPictureUrl(this.bookingOrderForEdidData.bookingInfo.outletPictureUrl);
            })
    }

    cancelBooking() {
        this.cancelBookingModal.show(this.bookingId);
    }

    getIsCancelBooking(event: boolean): void {
        if (event) {
            this.loadBookingOrderForEditData(this.bookingId);
        }
    }

    private getOutletPictureUrl(url: string): string {
        return url === '' ? this.outletPictureUrl : url;
    }

    // 用户签到
    userCheckInHandle(): void {
        this._bookingCheckInService.checkinHandle(this.bookingId);
    }

    showQrcodeModel(): void {
        this.qrcodeModel.show();
    }
}
