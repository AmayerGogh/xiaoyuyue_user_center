import { Injectable } from '@angular/core';
import { BookingServiceProxy, OrganizationInfoDto } from '../service-proxies/service-proxies';

@Injectable()
export class BookingService {
    organizationInfoData: OrganizationInfoDto = undefined;
    bookingId: number = 38;
    source: string = "";
    constructor(
        private _bookingServiceProxy: BookingServiceProxy
    ) { }

    ngOnInit(): void {
    }

    loadBookingData() {
        this._bookingServiceProxy
            .getJoinBookingInfo(this.source, this.bookingId)
            .subscribe(result => {
                this.organizationInfoData = result.organizationInfo;
            })
    }
}