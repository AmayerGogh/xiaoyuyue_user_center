﻿import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Location } from '@angular/common';
import { TenantServiceProxy, CreateTenantInput, CommonLookupServiceProxy, PasswordComplexitySetting } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { FeatureTreeComponent } from '../shared/feature-tree.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import * as _ from "lodash";

@Component({
    selector: 'createTenantModal',
    templateUrl: './create-tenant-modal.component.html',
    animations: [appModuleAnimation()],
})
export class CreateTenantModalComponent extends AppComponentBase {

    @ViewChild('tenancyNameInput') tenancyNameInput: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    saving: boolean = false;
    setRandomPassword: boolean = true;
    useHostDb: boolean = true;
    editions = [];
    tenant: CreateTenantInput;
    passwordComplexitySetting: PasswordComplexitySetting = new PasswordComplexitySetting();

    constructor(
        injector: Injector,
        private _tenantService: TenantServiceProxy,
        private _commonLookupService: CommonLookupServiceProxy,
        private location: Location
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.init();
    }

    onShown(): void {
        $(this.tenancyNameInput.nativeElement).focus();
    }

    init(): void {
        this.tenant = new CreateTenantInput();
        this.tenant.isActive = true;
        this.tenant.shouldChangePasswordOnNextLogin = true;
        this.tenant.sendActivationEmail = true;
        this.tenant.editionId = 0;

        this._commonLookupService.getEditionsForCombobox()
            .subscribe((result) => {
                this.editions = result.items;
                this.editions.unshift({ value: "0", displayText: this.l('NotAssigned') });

                this._commonLookupService.getDefaultEditionName().subscribe((getDefaultEditionResult) => {
                    var defaultEdition = _.filter(this.editions, { displayText: getDefaultEditionResult.name });
                    if (defaultEdition && defaultEdition[0]) {
                        this.tenant.editionId = parseInt(defaultEdition[0].value);
                    }
                });
            });
    }

    getEditionValue(item): number {
        return parseInt(item.value);
    }

    save(): void {
        if (this.setRandomPassword) {
            this.tenant.adminPassword = null;
        }

        if (this.tenant.editionId === 0) {
            this.tenant.editionId = null;
        }

        this.saving = true;
        this._tenantService.createTenant(this.tenant)
            .finally(() => this.saving = false)
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.location.back();
    }
}