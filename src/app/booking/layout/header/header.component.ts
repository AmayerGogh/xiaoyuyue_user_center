import { BookingServiceProxy, OrganizationInfoDto } from 'shared/service-proxies/service-proxies';
import { Component, Input, OnInit, ViewChild, EventEmitter, Output, Injector } from '@angular/core';
import { AppComponentBase } from 'shared/common/app-component-base';

@Component({
    selector: 'xiaoyuyue-booking-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class BookingHeaderComponent extends AppComponentBase implements OnInit {

    @Input()
    organizationInfoData: OrganizationInfoDto;
    @Output() showTenantDetail: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private injector: Injector,
        private _bookingServiceProxy: BookingServiceProxy
    ) {
        super(injector)
    }

    ngOnInit() {
    }

    showTenantDetailHandler(): void {
        this.showTenantDetail.emit(true);
    }
}
