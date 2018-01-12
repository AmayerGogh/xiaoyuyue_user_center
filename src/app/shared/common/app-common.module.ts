import * as ngCommon from '@angular/common';

import { ModuleWithProviders, NgModule } from '@angular/core';

import { AbpModule } from '@abp/abp.module';
import { AdminFooterComponent } from 'app/user/layout/footer/footer.component';
import { AdminHeaderComponent } from 'app/user/layout/header/header.component';
import { AdminSideBarComponent } from 'app/user/layout/side-bar/side-bar.component';
import { AppAuthService } from './auth/app-auth.service';
import { AppLocalizationService } from 'app/shared/common/localization/app-localization.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { CommonModule } from '@shared/common/common.module';
import { DesktopFooterComponent } from 'app/index/desktop/layout/footer/footer.component';
import { DesktopHeaderComponent } from 'app/index/desktop/layout/header/header.component';
import { EmptyPageComponent } from 'app/shared/common/empty-page/empty-page.component';
import { FormsModule } from '@angular/forms';
import { JqPluginDirective } from './libs/jq-plugin.directive';
import { MobileUploadPictureComponent } from 'app/shared/common/mobile-upload-picture/mobile-upload-picture.component';
import { ModalModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { SendCodeComponent } from 'app/shared/common/send-code/send-code.component';
import { TimeZoneComboComponent } from './timing/timezone-combo.component';
import { UtilsModule } from '@shared/utils/utils.module';
import { LanguageSwitchComponent } from 'app/shared/common/language-switch.component/language-switch.component';

@NgModule({
    imports: [
        ngCommon.CommonModule,
        FormsModule,
        ModalModule.forRoot(),
        UtilsModule,
        AbpModule,
        CommonModule,
        RouterModule
    ],
    declarations: [
        TimeZoneComboComponent,
        JqPluginDirective,
        AdminHeaderComponent,
        AdminSideBarComponent,
        AdminFooterComponent,
        EmptyPageComponent,
        SendCodeComponent,
        DesktopHeaderComponent,
        DesktopFooterComponent,
        MobileUploadPictureComponent,
        LanguageSwitchComponent
    ],
    exports: [
        TimeZoneComboComponent,
        JqPluginDirective,
        AdminHeaderComponent,
        AdminSideBarComponent,
        AdminFooterComponent,
        EmptyPageComponent,
        SendCodeComponent,
        DesktopHeaderComponent,
        DesktopFooterComponent,
        MobileUploadPictureComponent,
        LanguageSwitchComponent
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