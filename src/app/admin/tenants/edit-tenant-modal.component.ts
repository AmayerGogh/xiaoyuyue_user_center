import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { Location } from '@angular/common';
import { TenantServiceProxy, CommonLookupServiceProxy, TenantEditDto, ComboboxItemDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { FeatureTreeComponent } from '../shared/feature-tree.component';
import { TenantFeaturesModalComponent } from './tenant-features-modal.component'
import { appModuleAnimation } from '@shared/animations/routerTransition';

import * as _ from "lodash";
import { TenantService } from "shared/services/tenant.service";

@Component({
    selector: 'editTenantModal',
    templateUrl: './edit-tenant-modal.component.html',
    styles: [
        `
            .has-warning { color: #c29d0b !important }
        `
    ],
    animations: [appModuleAnimation()],
})
export class EditTenantModalComponent extends AppComponentBase {

    @ViewChild('tenantFeaturesModal') tenantFeaturesModal: TenantFeaturesModalComponent;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        injector: Injector,
        private location: Location,
        private _editTenantService: TenantService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        let href = window.location.href;
        let userId = +href.substr(href.lastIndexOf("/") + 1, href.length);;
        this._editTenantService.getEditionsForCombobox();
        this._editTenantService.getTenantForEdit(userId);
    }

    submitForm(): void {
        this.tenantFeaturesModal.save();
        this.close();
    }

    close(): void {
        this.location.back();
    }
}