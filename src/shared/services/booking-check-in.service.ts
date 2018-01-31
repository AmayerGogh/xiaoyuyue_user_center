import { Injectable, Injector, EventEmitter } from '@angular/core';
import { PerBookingOrderServiceProxy, CheckInBookingOrderInput } from 'shared/service-proxies/service-proxies';
import { AppComponentBase } from 'shared/common/app-component-base';
import { ActivatedRoute } from '@angular/router';

// export class CheckInStatus {
//     active: boolean;
//     text: string;
// }
@Injectable()
export class BookingCheckInService extends AppComponentBase {
    signInBookingOrderInput: CheckInBookingOrderInput
    bookingId: any;
    checkedIn = new EventEmitter<null>();

    constructor(
        private injector: Injector,
        private _route: ActivatedRoute,
        private _perBookingOrderServiceProxy: PerBookingOrderServiceProxy,
    ) {
        super(injector);
    }

    public checkinHandle(bookingId: any): void {
        this.bookingId = bookingId;
        this.signInBookingOrderInput = new CheckInBookingOrderInput();
        this.getLocation();
    }

    private checkInService(): void {
        this._perBookingOrderServiceProxy
            .checkInBookingOrder(this.signInBookingOrderInput)
            .subscribe(() => {
                this.message.success('签到成功');
                this.checkedIn.emit();
            })
    }

    /*
    获取用户地理位置
*/
    private getLocation(): void {
        const options = {
            enableHighAccuracy: true
        }
        this.signInBookingOrderInput.id = +this.bookingId;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                // 获取成功回调
                (position: Position) => {
                    this.signInBookingOrderInput.longitude = `${position.coords.latitude},${position.coords.longitude}`;
                    this.checkInService();
                },
                // 获取失败回调
                (error: PositionError) => {
                    this.signInBookingOrderInput.longitude = null;
                    this.checkInService();
                },
                options
            );
        } else {
            this.signInBookingOrderInput.longitude = null;
            this.checkInService();
        }
    }
}
