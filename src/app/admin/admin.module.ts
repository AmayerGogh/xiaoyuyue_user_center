import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule, TabsModule, TooltipModule, PopoverModule } from 'ngx-bootstrap';
import { FileUploadModule } from '@node_modules/ng2-file-upload';

import { UtilsModule } from '@shared/utils/utils.module'

import { AppStorageService } from "shared/services/storage.service";
import { TenantService } from "shared/services/tenant.service";

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
        TenantService
    ]
})
export class BookingOrderModule { }