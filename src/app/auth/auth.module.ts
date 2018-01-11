import * as ngCommon from '@angular/common';

import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { AppConsts } from '@shared/AppConsts';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@shared/common/common.module';
import { ConfirmEmailComponent } from './shared/email-activation/confirm-email.component';
import { EmailActivationComponent } from './shared/email-activation/email-activation.component';
import { ExternalAuthComponent } from './external-auth/external-auth.component';
import { ForgotPasswordComponent } from './password/forgot-password.component';
import { FormsModule } from '@angular/forms';
import { LocalizationService } from 'abp-ng2-module/src/localization/localization.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './../../shared/services/login.service';
import { LuosimaoCaptcha } from './shared/luosimao-captcha/luosimao-captcha.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { PhoneValidateComponent } from './shared/phone-validate/phone-validate.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './password/reset-password.component';
import { SendTwoFactorCodeComponent } from './login/send-two-factor-code.component';
import { TenantChangeComponent } from './shared/tenant-change.component';
import { TenantChangeModalComponent } from './shared/tenant-change-modal.component';
import { TooltipModule } from 'ngx-bootstrap';
import { UtilsModule } from '@shared/utils/utils.module';
import { ValidateTwoFactorCodeComponent } from './login/validate-two-factor-code.component';
import { AppCommonModule } from 'app/shared/common/app-common.module';

@NgModule({
    imports: [
        ngCommon.CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,

        ModalModule.forRoot(),
        TooltipModule.forRoot(),

        CommonModule,
        AppCommonModule,

        UtilsModule,
        AuthRoutingModule
    ],
    declarations: [
        AuthComponent,
        TenantChangeComponent,
        TenantChangeModalComponent,
        LoginComponent,
        ExternalAuthComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        EmailActivationComponent,
        ConfirmEmailComponent,
        SendTwoFactorCodeComponent,
        ValidateTwoFactorCodeComponent,
        PhoneValidateComponent,
        LuosimaoCaptcha
    ],
    providers: [
        TooltipModule
    ]
})
export class AuthModule {
    constructor(private localization: LocalizationService) {

    }

    public l(key: string, ...args: any[]): string {
        let localizedText = this.localization.localize(key, AppConsts.localization.defaultLocalizationSourceName);

        if (localizedText === key) {
            localizedText = this.localization.localize(key, AppConsts.localization.commonLocalizationSourceName);
        }

        if (!localizedText) {
            localizedText = key;
        }

        if (!args || !args.length) {
            return localizedText;
        }

        args.unshift(localizedText);
        return abp.utils.formatString.apply(this, args);
    }
}
