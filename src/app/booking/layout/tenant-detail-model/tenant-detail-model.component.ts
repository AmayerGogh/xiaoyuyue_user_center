import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap';
import { OrganizationInfoDto } from 'shared/service-proxies/service-proxies';

@Component({
    selector: 'xiaoyuyue-tenant-detail-model',
    templateUrl: './tenant-detail-model.component.html',
    styleUrls: ['./tenant-detail-model.component.scss']
})
export class TenantDetailModelComponent implements OnInit {
    organizationInfoData: OrganizationInfoDto = new OrganizationInfoDto();

    @ViewChild('tenantDetailModel') model: ModalDirective;

    constructor() { }

    ngOnInit() {
    }

    show(organizationInfoData: OrganizationInfoDto): void {
        this.organizationInfoData = organizationInfoData;
        this.model.show();
    }

    hide(): void {
        this.model.hide();
    }
}
