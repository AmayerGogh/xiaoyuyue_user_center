import { BookingServiceProxy, OrganizationInfoDto } from 'shared/service-proxies/service-proxies';
import { Component, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'xiaoyuyue-booking-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class BookingHeaderComponent implements OnInit {

    @Input()
    organizationInfoData: OrganizationInfoDto;
    @Output() showTenantDetail: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private _bookingServiceProxy: BookingServiceProxy
    ) {
    }

    ngOnInit() {
    }

    showTenantDetailHandler(): void {
        this.showTenantDetail.emit(true);
    }
}
