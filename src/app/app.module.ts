import * as ngCommon from '@angular/common';

import { HttpModule, JsonpModule } from '@angular/http';
import { ModalModule, TooltipModule } from 'ngx-bootstrap';

import { AbpModule } from '@abp/abp.module';
import { AppCommonModule } from './shared/common/app-common.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { FileUploadModule } from '@node_modules/ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { IndexModule } from './index/index.module';
import { NgModule } from '@angular/core';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SideBarComponent } from 'app/shared/side-bar/side-bar.component';
import { UploaderComponent } from './shared/uploader/uploader.component';
import { UserModule } from './user/user.module';
import { UtilsModule } from '@shared/utils/utils.module';

@NgModule({
    declarations: [
        AppComponent,
        SideBarComponent,
        UploaderComponent,
    ],
    imports: [
        ngCommon.CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,

        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        FileUploadModule,
        AbpModule,
        AppRoutingModule,
        UtilsModule,
        AppCommonModule.forRoot(),
        ServiceProxyModule
    ],
    providers: [
    ]
})
export class AppModule { }
