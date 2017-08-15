import { NgModule } from '@angular/core';
import * as ngCommon from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { ModalModule, TooltipModule } from 'ngx-bootstrap';
import { FileUploadModule } from '@node_modules/ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AbpModule } from '@abp/abp.module';

import { UtilsModule } from '@shared/utils/utils.module';
import { AppCommonModule } from './shared/common/app-common.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';

import { SideBarComponent } from 'app/shared/side-bar/side-bar.component';
import { UploaderComponent } from './shared/uploader/uploader.component';

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
