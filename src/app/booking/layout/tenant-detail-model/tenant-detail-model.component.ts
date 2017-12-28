import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap';
import { OrganizationInfoDto } from 'shared/service-proxies/service-proxies';
import { MediaPath } from 'shared/AppConsts';

@Component({
    selector: 'xiaoyuyue-tenant-detail-model',
    templateUrl: './tenant-detail-model.component.html',
    styleUrls: ['./tenant-detail-model.component.scss'],
    encapsulation: ViewEncapsulation.None
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

    getTenantBgUrl(url: string): string {
        return url ? url : MediaPath.defaultBgUrl;
    }
    getTenantLogoUrl(url: string): string {
        return url ? url : MediaPath.defaultProfilePictureUrl;
    }
}
