import { AccountServiceProxy, CodeSendInput, PasswordComplexitySetting, ProfileServiceProxy, SMSServiceProxy, RegisterInput, PhoneAuthenticateModel } from '@shared/service-proxies/service-proxies'
import { Component, ElementRef, Injector, NgModule, OnInit, ViewChild } from '@angular/core';

import { AppComponentBase } from '@shared/common/app-component-base';
import { LoginService } from 'shared/services/login.service';
import { Router } from '@angular/router';
import { VerificationCodeType, SendCodeType } from 'shared/AppEnums';
import { accountModuleAnimation } from '@shared/animations/routerTransition';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./resister.components.scss'],
    animations: [accountModuleAnimation()]
})
export class RegisterComponent extends AppComponentBase implements OnInit {
    sendCodeType: number = SendCodeType.ShortMessage;
    codeType = VerificationCodeType.Register;
    registerInput: RegisterInput = new RegisterInput();
    passwordComplexitySetting: PasswordComplexitySetting = new PasswordComplexitySetting();
    isPhoneRegister = true;
    registering = false;

    @ViewChild('smsBtn') _smsBtn: ElementRef;
    constructor(
        injector: Injector,
        private _accountService: AccountServiceProxy,
        private _accountServiceProxy: AccountServiceProxy,
        private _router: Router,
        private readonly _loginService: LoginService,
        private _profileService: ProfileServiceProxy,
        private _SMSServiceProxy: SMSServiceProxy
    ) {
        super(injector);
    }

    ngOnInit() {
        if (this.isWeiXin()) {
            this._router.navigate(['auth/login']);
            return;
        }

        this._profileService.getPasswordComplexitySetting().subscribe(result => {
            this.passwordComplexitySetting = result.setting;
        });

        // 注释螺丝帽
        /*jQuery.getScript('//captcha.luosimao.com/static/js/api.js', () => {
        });*/
    }

    // get useCaptcha(): boolean {
    //     return this.setting.getBoolean('App.UserManagement.UseCaptchaOnRegistration');
    // }

    register(): void {
        this.registering = true;
        this._accountServiceProxy.register(this.registerInput)
            .finally(() => { this.registering = false; })
            .subscribe((result) => {
                if (!result.canLogin) {
                    this.notify.success(this.l('SuccessfullyRegistered'));
                    this._router.navigate(['auth/login']);
                    return;
                }

                // Autheticatee
                this.registering = true;
                this._loginService.authenticateModel.loginCertificate = this.registerInput.phoneNumber ? this.registerInput.phoneNumber : this.registerInput.emailAddress;
                this._loginService.authenticateModel.password = result.randomPassword;
                this._loginService.authenticate(() => { this.registering = false; });
            });
    }

    // 注释掉螺丝帽验证码
    // captchaResolved(): void {
    //     let captchaResponse = $('#lc-captcha-response').val();
    //     this.model.captchaResponse = captchaResponse;
    // }

    isWeiXin() {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) + '' === 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }

    emailRegister(): void {
        this.sendCodeType = SendCodeType.Email;
        this.isPhoneRegister = false;
        this.registerInput.phoneNumber = '';
        this.registerInput.registerCode = '';
        this.registerInput.type = 2;
    }
    phoneRegister(): void {
        this.sendCodeType = SendCodeType.ShortMessage;
        this.isPhoneRegister = true;
        this.registerInput.emailAddress = '';
        this.registerInput.registerCode = '';
        this.registerInput.type = 1;
    }
}