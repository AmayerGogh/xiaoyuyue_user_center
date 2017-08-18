import * as ngCommon from '@angular/common';

import { ModuleWithProviders, NgModule } from '@angular/core';

import { AbpModule } from '@abp/abp.module';
import { AppAuthService } from './auth/app-auth.service';
import { AppLocalizationService } from 'app/shared/common/localization/app-localization.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { CommonModule } from '@shared/common/common.module';
import { DeviceSwtichGuard } from './auth/device-switch.service';
import { FormsModule } from '@angular/forms';
import { JqPluginDirective } from './libs/jq-plugin.directive';
import { ModalModule } from 'ngx-bootstrap';
import { TimeZoneComboComponent } from './timing/timezone-combo.component';
import { UtilsModule } from '@shared/utils/utils.module';

@NgModule({
    imports: [
        ngCommon.CommonModule,
        FormsModule,
        ModalModule.forRoot(),
        UtilsModule,
        AbpModule,
        CommonModule,
    ],
    declarations: [
        TimeZoneComboComponent,
        JqPluginDirective
    ],
    exports: [
        TimeZoneComboComponent,
        JqPluginDirective,
    ],
    providers: [
        AppLocalizationService
    ]
})
export class AppCommonModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AppCommonModule,
            providers: [
                AppAuthService,
                AppRouteGuard,
            ]
        }
    }
}