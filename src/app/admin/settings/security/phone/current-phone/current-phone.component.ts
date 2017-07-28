import { Component, OnInit, ElementRef, ViewChild, Injector } from '@angular/core';
import { ProfileServiceProxy, CodeSendInput, SMSServiceProxy, CheckUserCodeInput, ChangeBindingPhoneNumInput } from '@shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { VerificationCodeType } from 'shared/AppEnums';
import { AppComponentBase } from 'shared/common/app-component-base';
@Component({
    selector: 'xiaoyuyue-current-phone',
    templateUrl: './current-phone.component.html',
    styleUrls: ['./current-phone.component.scss']
})
export class CurrentPhoneComponent extends AppComponentBase implements OnInit {
    isVerified: boolean = false;
    currentPhoneNum: string;
    encryptPhoneNum: string;
    isSendSMS: boolean;
    code: string;
    codeSendInput: CodeSendInput = new CodeSendInput();
    changeBindingPhoneNumInput: ChangeBindingPhoneNumInput = new ChangeBindingPhoneNumInput();
    checkUserCodeInput: CheckUserCodeInput = new CheckUserCodeInput();
    @ViewChild("smsBtn") smsBtn: ElementRef;

    constructor(
        injector: Injector,
        private _router: Router,
        private _location: Location,
        private _SMSServiceProxy: SMSServiceProxy,
        private _profileServiceProxy: ProfileServiceProxy
    ) {
        super(injector);
    }

    ngOnInit() {
        this.getUserPhoneNum();
    }

    ngAfterViewInit() {
        // TODO: 暂时处理
        $("#headerTitle").text("更换手机");
    }

    verificationPhoneNum(): void {
        this.checkUserCodeInput.code = this.code;
        this.checkUserCodeInput.codeType = VerificationCodeType.PhoneUnBinding;
        this._SMSServiceProxy
            .checkCodeByCurrentUserAsync(this.checkUserCodeInput)
            .subscribe(() => {
                this.isVerified = true;
                this.codeSendInput = new CodeSendInput();
            })
    }

    bindPhone(): void {
        this.changeBindingPhoneNumInput.validCode = this.code;
        this._profileServiceProxy
            .changeBindingPhoneNum(this.changeBindingPhoneNumInput)
            .subscribe(() => {
                this._location.back();
                setTimeout(() => {
                    this.notify.success("更绑成功");
                }, 1000);
            });
    }

    // 发送验证码
    send(event) {
        console.log(event);

        this.codeSendInput.targetNumber = this.currentPhoneNum;
        this.codeSendInput.codeType = VerificationCodeType.PhoneUnBinding;
        // input.captchaResponse = this.captchaResolved();

        this._SMSServiceProxy
            .sendCodeAsync(this.codeSendInput)
            .subscribe(result => {
                this.anginSend(event);
            });
    }

    anginSend(event) {
        let time = 60;
        this.isSendSMS = true;
        let set = setInterval(() => {
            time--;
            event.target.innerHTML = `${time} 秒`;
        }, 1000)

        setTimeout(() => {
            clearInterval(set);
            this.isSendSMS = false;
            event.target.innerHTML = this.l("AgainSendValidateCode");
        }, 60000);
    }

    getUserPhoneNum(): void {
        this._profileServiceProxy
            .getCurrentUserProfileForEdit()
            .subscribe(result => {
                this.currentPhoneNum = result.phoneNumber;
                this.encrypt();
            })
    }


    private encrypt(): void {
        this.encryptPhoneNum = "•••••••" + this.currentPhoneNum.substr(this.currentPhoneNum.length - 4);
    }
}
