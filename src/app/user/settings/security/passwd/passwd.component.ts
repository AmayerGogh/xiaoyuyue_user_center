import { ChangePasswordByPhoneInput, ChangePasswordInput, CodeSendInput, ProfileServiceProxy, SMSServiceProxy, AccountServiceProxy, SendPasswordResetCodeInput } from '@shared/service-proxies/service-proxies';
import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';

import { AppComponentBase } from '@shared/common/app-component-base';
import { AppSessionService } from '@shared/common/session/app-session.service';
import { Location } from '@angular/common';
import { VerificationCodeType } from 'shared/AppEnums';
import { appModuleAnimation } from 'shared/animations/routerTransition';
import { Router } from '@angular/router';

export class RepeatPasswdDto extends ChangePasswordInput {
    repeatPasswd: string;
}
@Component({
    selector: 'xiaoyuyue-passwd',
    templateUrl: './passwd.component.html',
    styleUrls: ['./passwd.component.scss'],
    animations: [appModuleAnimation()]
})
export class PasswdComponent extends AppComponentBase implements OnInit {
    sendPasswordResetCodeInput: SendPasswordResetCodeInput = new SendPasswordResetCodeInput();
    emailAddress: string;
    phoneNum: string;
    phoneNumText: string;
    isSendSMS: boolean = false;
    input: RepeatPasswdDto = new RepeatPasswdDto();
    byPhoneInput: ChangePasswordByPhoneInput = new ChangePasswordByPhoneInput();
    showCommandWrap: boolean = true;
    phoneChangePasswd: boolean = false;
    oldPasswdChangePasswd: boolean = false;

    @ViewChild('smsBtn') _smsBtn: ElementRef;
    constructor(
        injector: Injector,
        private _location: Location,
        private _router: Router,
        private _SMSServiceProxy: SMSServiceProxy,
        private _profileServiceProxy: ProfileServiceProxy,
        private _accountService: AccountServiceProxy,
        private _appSessionService: AppSessionService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.encrypt();
        this.emailAddress = this._appSessionService.user.emailAddress;
        this.phoneNum = this._appSessionService.user.phoneNumber;
    }
    // 使用旧密码更改密码
    oldPasswdChangeHandler(): void {
        this._profileServiceProxy
            .changePassword(this.input)
            .subscribe(result => {
                this.notify.success('密码修改成功');
                this.showCommandWrap = true;
                this.phoneChangePasswd = false;
                this.oldPasswdChangePasswd = false;
            });
        this.input = new RepeatPasswdDto();
    }

    // 使用手机验证更改密码
    phoneChangeHandler(): void {
        this._profileServiceProxy
            .changePasswordByPhone(this.byPhoneInput)
            .subscribe(result => {
                this.notify.success('密码修改成功');
                this.showCommandWrap = true;
                this.phoneChangePasswd = false;
                this.oldPasswdChangePasswd = false;
            });
        this.byPhoneInput = new ChangePasswordByPhoneInput();
    }

    showUseOldPasswdEle(): void {
        this.showCommandWrap = false;
        this.oldPasswdChangePasswd = true;
        this.phoneChangePasswd = false;
    }
    showUsePhoneChangeEle(): void {
        const result = this.isBindingPhoneHandler();
        if (!result) {
            return;
        }
        this.showCommandWrap = false;
        this.oldPasswdChangePasswd = false;
        this.phoneChangePasswd = true;
    }
    emailChangeHandler(): void {
        const result = this.isBindingEmailHandler();
        if (!result) {
            return;
        }
        this.sendPasswordResetCodeInput.emailAddress = this.emailAddress;
        this._accountService.sendPasswordResetCode(this.sendPasswordResetCodeInput)
        .subscribe(() => {
            this.message.success(this.l('PasswordResetMailSentMessage'));
        });
    }

    // 发送验证码
    send() {
        const model = new CodeSendInput();
        model.targetNumber = this.phoneNum;
        model.codeType = VerificationCodeType.ChangePassword;
        // this.captchaResolved();

        this._SMSServiceProxy
            .sendCode(model)
            .subscribe(result => {
                this.anginSend();
            });
    }

    anginSend() {
        const self = this;
        let time = 60;
        this.isSendSMS = true;
        const set = setInterval(() => {
            time--;
            self._smsBtn.nativeElement.innerHTML = `${time} 秒`;
        }, 1000)

        setTimeout(() => {
            clearInterval(set);
            self.isSendSMS = false;
            self._smsBtn.nativeElement.innerHTML = this.l('AgainSendValidateCode');
        }, 60000);
    }
    private encrypt(): void {
        if (!this.phoneNum) {
            return;
        }
        this.phoneNumText = '•••••••' + this.phoneNum.substr(this.phoneNum.length - 4);
    }

    private isBindingPhoneHandler(): boolean {
        if (this.phoneNum != null) {
            this.encrypt();
            return true;
        } else {
            this.message.confirm('您当前未绑定手机，绑定手机号才能更改密码', (result) => {
                if (result) {
                    this._router.navigate(['/user/settings/phone']);
                } else {
                    return false;
                }
            })
        }
    }

    private isBindingEmailHandler(): boolean {
        if (this._appSessionService.user.emailAddress != null) {
            this.encrypt();
            return true;
        } else {
            this.message.confirm('您当前未绑定邮箱，绑定邮箱才能更改密码', (result) => {
                if (result) {
                    this._router.navigate(['/user/settings/email']);
                } else {
                    return false;
                }
            })
        }
    }
}
