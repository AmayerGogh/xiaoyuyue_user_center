import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule, TabsModule, TooltipModule, PopoverModule } from 'ngx-bootstrap';
import { FileUploadModule } from '@node_modules/ng2-file-upload';

import { UtilsModule } from '@shared/utils/utils.module'

import { AppStorageService } from "shared/services/storage.service";
import { TenantService } from "shared/services/tenant.service";

import { AppCommonModule } from "app/shared/common/app-common.module";
import { AdminRoutingModule } from "app/center/center-routing.module";
import { CenterComponent } from "app/center/center.component";
import { CenterSideBarComponent } from "app/center/layout/side-bar/side-bar.component";
import { CenterHeaderComponent } from "app/center/layout/header/header.component";
import { MainUserComponent } from 'app/center/main-user/main-user.component';
import { EmptyPageComponent } from './empty-page/empty-page.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,

        FileUploadModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),

        AdminRoutingModule,
        UtilsModule,
        AppCommonModule,
    ],
    declarations: [
        MainUserComponent,
        CenterComponent,
        CenterHeaderComponent,
        CenterSideBarComponent,
        EmptyPageComponent
    ],
    providers: [
        AppStorageService,
        TenantService
    ]
})
export class CenterModule { }