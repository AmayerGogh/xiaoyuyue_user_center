import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule, TabsModule, TooltipModule, PopoverModule } from 'ngx-bootstrap';
import { FileUploadModule } from '@node_modules/ng2-file-upload';

import { UtilsModule } from '@shared/utils/utils.module'

import { GridModule, SharedModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { AppStorageService } from "shared/services/storage.service";
import { HostSettingService } from "shared/services/get-host-settings.service";
import { GetUserForEdit } from "shared/services/get-user-info.service";
import { TenantService } from "shared/services/tenant.service";

import { DialogModule } from '@progress/kendo-angular-dialog';
import { SMSTemplateServiceProxy, OrganizationBookingServiceProxy, PictureServiceProxy, OutletServiceServiceProxy, PersonBookingServiceProxy } from 'shared/service-proxies/service-proxies';
import { AppCommonModule } from "app/shared/common/app-common.module";
import { AdminHeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AdminRoutingModule } from "app/admin/admin-routing.module";
import { AdminComponent } from "app/admin/admin.component";
import { BookingDetailComponent } from './booking-detail/booking-detial.component';
import { AdminSideBarComponent } from "app/admin/layout/side-bar/side-bar.component";
import { BookingManageComponent } from 'app/admin/booking-manage/booking-manage.component';
import { CancelBookingModalComponent } from 'app/admin/cancel-booking-modal/cancel-booking-modal.component';

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
        GridModule,
        DropDownsModule,
        ButtonsModule,
        SharedModule,
        DialogModule,
    ],
    declarations: [
        AdminComponent,
        BookingDetailComponent,
        AdminHeaderComponent,
        FooterComponent,
        AdminSideBarComponent,
        BookingManageComponent,
        CancelBookingModalComponent
    ],
    providers: [
        AppStorageService,
        HostSettingService,
        GetUserForEdit,
        TenantService,
        SMSTemplateServiceProxy,
        OrganizationBookingServiceProxy,
        PictureServiceProxy,
        OutletServiceServiceProxy,
        PersonBookingServiceProxy
    ]
})
export class AdminModule { }