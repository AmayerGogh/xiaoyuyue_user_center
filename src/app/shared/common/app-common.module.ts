import * as ngCommon from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { UtilsModule } from '@shared/utils/utils.module';
import { AbpModule } from '@abp/abp.module';
import { CommonModule } from '@shared/common/common.module';

import { TimeZoneComboComponent } from './timing/timezone-combo.component';
import { AppAuthService } from './auth/app-auth.service';
import { JqPluginDirective } from './libs/jq-plugin.directive';
import { AppRouteGuard } from './auth/auth-route-guard';
import { AppLocalizationService } from 'app/shared/common/localization/app-localization.service';

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
                AppRouteGuard
            ]
        }
    }
}