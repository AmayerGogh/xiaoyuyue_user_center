import { Component, ViewChild, Injector, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { TenantServiceProxy, UpdateTenantFeaturesInput, TenantEditDto, EntityDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { FeatureTreeComponent } from '../shared/feature-tree.component';

import * as _ from "lodash";
import { TenantService } from "shared/services/tenant.service";

@Component({
    selector: 'tenantFeaturesModal',
    templateUrl: './tenant-features-modal.component.html'
})
export class TenantFeaturesModalComponent extends AppComponentBase {

    @ViewChild('featureTree') featureTree: FeatureTreeComponent;
    @Input('initTenant') initTenant;

    active: boolean = false;
    saving: boolean = false;

    // resettingFeatures: boolean = false;
    tenantId: number;
    tenantName: string;
    featureEditData: any = null;

    constructor(
        injector: Injector,
        private _editTenantService: TenantService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getForEdit(this.initTenant.id, this.initTenant.name);

    }

    getForEdit(tenantId: number, tenantName: string): void {
        let self = this
        this.tenantId = tenantId;
        this.tenantName = tenantName;
        this.active = true;
        this._editTenantService
            .getTenantForEdit(tenantId)
            .then(() => {
                this.featureTree.editData = this._editTenantService.tenantFeatures;
            })
    }

    save(): void {
        if (!this.featureTree.areAllValuesValid()) {
            this.message.warn(this.l('InvalidFeaturesWarning'));
            return;
        }

        let input = new TenantEditDto();
        input.id = this.tenantId;
        input.features = this.featureTree.getGrantedFeatures();
        this._editTenantService.updateTenant(input);

    }

    resetFeatures(): void {
        var input = new EntityDto();
        input.id = this.tenantId;

        this._editTenantService.resetTenantSpecificFeatures(input);
    };

}