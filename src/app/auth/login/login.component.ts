import * as _ from 'lodash';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AuthenticateModel, AuthenticateResultModel, CodeSendInput, ExternalLoginProviderInfoModel, PhoneAuthenticateModel, SMSServiceProxy, TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { ExternalLoginProvider, LoginService } from 'shared/services/login.service';
import { Headers, Http } from '@angular/http';

import { AbpSessionService } from '@abp/session/abp-session.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { AppSessionService } from 'shared/common/session/app-session.service';
import { Location } from '@angular/common';
import { VerificationCodeType } from 'shared/AppEnums';
import { accountModuleAnimation } from '@shared/animations/routerTransition';

@Component({
    templateUrl: './login.component.html',
    animations: [accountModuleAnimation()],
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AppComponentBase implements OnInit, AfterViewInit {
    model: PhoneAuthenticateModel = new PhoneAuthenticateModel();
    externalLoginProviders: ExternalLoginProvider[];
    codeType = VerificationCodeType.Login;
    flag = true;
    // 普通登录或者手机验证登录，默认普通登录
    ordinaryLogin = true;
    saving = false;

    @ViewChild('smsBtn') _smsBtn: ElementRef;
    constructor(
        injector: Injector,
        public loginService: LoginService,
        private _router: Router,
        private _location: Location,
        private _activatedRoute: ActivatedRoute,
        private _tokenAuthService: TokenAuthServiceProxy,
        private _SMSServiceProxy: SMSServiceProxy,
    ) {
        super(injector);
        loginService.rememberMe = true;
    }

    ngOnInit(): void {
        if (this.appSession.user) {
            this._router.navigate(['/user/home']);
        }

        if (this.isWeiXin()) {
            this.loginService.init(() => {
                this.loginService.externalAuthenticate(this.loginService.findExternalLoginProvider(ExternalLoginProvider.WECHATMP))
            });

            this._router.navigate(['/auth/external']);
        }
    }

    ngAfterViewInit(): void {
        const self = this;
        // 解决Chrome浏览器自动填充的BUG
        setTimeout(() => {
            $('input:-webkit-autofill').addClass('edited')
        }, 600);
    }

    get multiTenancySideIsTeanant(): boolean {
        return this.appSession.tenantId > 0;
    }

    get isSelfRegistrationAllowed(): boolean {
        if (!this.appSession.tenantId) {
            return false;
        }

        return this.setting.getBoolean('App.UserManagement.AllowSelfRegistration');
    }

    login(): void {
        if (!this.loginService.authenticateModel.loginCertificate || !this.loginService.authenticateModel.password) {
            this.message.error(this.l('UserNameOrPasswdCannotForNull'), this.l('CannotLogin'));
            return;
        }

        this.saving = true;
        if (!this.ordinaryLogin) {
            this.loginService.phoneNumAuth(this.model, () => this.saving = false);
            return;
        }

        this.loginService.authenticate(
            () => this.saving = false
        );
    }

    mobileExternalLogin(provider: ExternalLoginProvider): void {
        this.loginService.externalAuthenticate(provider);
    }

    // 是否账号登录
    isOrdinaryLogin() {
        this.ordinaryLogin = true;
    }
    // 是否手机验证登录
    isPhoneLogin() {
        this.ordinaryLogin = false;
    }

    checkInputAutofill(): boolean {
        return $('input:-webkit-autofill').length === 2 ? false : true;
    }
}
