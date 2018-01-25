import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from 'shared/common/app-component-base';
import { ActivatedRoute, Router } from '@angular/router';
import { PerBookingOrderServiceProxy, GetPersonBookingOrderOutput, BookingOrderInfoStatus, CheckInBookingOrderInput } from 'shared/service-proxies/service-proxies';
import { appModuleAnimation } from 'shared/animations/routerTransition';
export class CheckInStatus {
    active: boolean;
    text: string;
}
@Component({
    selector: 'xiaoyuyue-booking-check-in',
    templateUrl: './booking-check-in.component.html',
    styleUrls: ['./booking-check-in.component.scss'],
    animations: [appModuleAnimation()]
})
export class BookingCheckInComponent extends AppComponentBase implements OnInit {
    bookingOrderForEdidData: GetPersonBookingOrderOutput;
    bookingStatus: BookingOrderInfoStatus;
    signInBookingOrderInput: CheckInBookingOrderInput = new CheckInBookingOrderInput();
    outletPictureUrl = '/assets/common/images/booking/tenant-bg.png';
    bookingId: any;
    checkInStatus = new CheckInStatus();
    constructor(
        private injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _perBookingOrderServiceProxy: PerBookingOrderServiceProxy
    ) {
        super(injector);
        this.bookingId = this._route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.loadBookingOrderForEditData(this.bookingId);
        this.checkInStatus.text = '签到';
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

    viewBookingInfo(): void {
        this._router.navigate(['user/booking/info/' + this.bookingId]);
    }

    // 用户签到
    userCheckInHandle(): void {
        const position: Position = this.getLocation();
        if (!position) { return; }
        this.signInBookingOrderInput.id = +this.bookingId;
        this.signInBookingOrderInput.longitude = `${position.coords.latitude},${position.coords.longitude}`
        this.checkInService();
    }

    private checkInService(): void {
        this._perBookingOrderServiceProxy
            .checkInBookingOrder(this.signInBookingOrderInput)
            .subscribe(() => {
                this.message.success('签到成功');
                this.checkInStatus.active = true;
                this.checkInStatus.text = '已签到';
            })
    }

    /*
        获取用户地理位置
        @成功直接返回position，否则返回null
    */
    private getLocation(): Position {
        const options = {
            enableHighAccuracy: true
        }
        if (navigator.geolocation) {
            let returnValue: Position;
            navigator.geolocation.getCurrentPosition(
                // 获取成功回调
                (position: Position) => {
                    returnValue = position;
                },
                // 获取失败回调
                (error: PositionError) => {
                    returnValue = null;
                },
                options
            );
            return returnValue;
        }
    }

    private showPosition(position: Position): void {
        console.log(position);
    }

    private getOutletPictureUrl(url: string): string {
        return url === '' ? this.outletPictureUrl : url;
    }

}
