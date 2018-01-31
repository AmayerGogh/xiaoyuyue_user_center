import * as ngCommon from '@angular/common';

import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ModalModule, TooltipModule } from 'ngx-bootstrap';

import { AbpModule } from '@abp/abp.module';
import { AppCommonModule } from './shared/common/app-common.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BreadcrumbService } from 'shared/services/bread-crumb.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { ServicesModule } from 'shared/services/services.module';
import { UtilsModule } from '@shared/utils/utils.module';
import { PageNotFoundComponent } from 'app/page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    imports: [
        ngCommon.CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        AbpModule,
        AppRoutingModule,
        UtilsModule,
        AppCommonModule.forRoot(),
        ServiceProxyModule,
        ServicesModule
    ],
    providers: [
    ]
})
export class AppModule {
    // 提前 注册 BreadcrumbService
    constructor(private breadcrumbService: BreadcrumbService) {

    }
}
