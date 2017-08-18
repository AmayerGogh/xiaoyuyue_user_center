import { BookingServiceProxy, OrganizationInfoDto } from '../service-proxies/service-proxies';

import { Injectable } from '@angular/core';

@Injectable()
export class BookingService {
    organizationInfoData: OrganizationInfoDto = undefined;
    bookingId = 38;
    source = '';
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
            });
    }
}