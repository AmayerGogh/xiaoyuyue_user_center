import { AccountServiceProxy, ChangePasswordByPhoneInput, ChangePasswordInput, CodeSendInput, ProfileServiceProxy, SMSServiceProxy, SendPasswordResetCodeInput } from '@shared/service-proxies/service-proxies';
import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';

import { AppComponentBase } from '@shared/common/app-component-base';
import { AppSessionService } from '@shared/common/session/app-session.service';
import { Router } from '@angular/router';
import { VerificationCodeType } from 'shared/AppEnums';
import { appModuleAnimation } from 'shared/animations/routerTransition';

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
    isSendSMS = false;
    input: RepeatPasswdDto = new RepeatPasswdDto();
    byPhoneInput: ChangePasswordByPhoneInput = new ChangePasswordByPhoneInput();
    showCommandWrap = true;
    phoneChangePasswd = false;
    oldPasswdChangePasswd = false;

    @ViewChild('smsBtn') _smsBtn: ElementRef;
    constructor(
        injector: Injector,
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
                this.notify.success(this.l('ChangePasswdSuccessed'));
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
                this.notify.success(this.l('ChangePasswdSuccessed'));
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
            this.message.confirm(this.l('Security.ChangePasswd.MustBingPhone'), (result) => {
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
            this.message.confirm(this.l('Security.ChangePasswd.MustBingEmail'), (result) => {
                if (result) {
                    this._router.navigate(['/user/settings/email']);
                } else {
                    return false;
                }
            })
        }
    }
}
