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
    time: number = 60;
    sendSMSTimer: NodeJS.Timer;
    existentPhoneNum: string;
    isSendNewPhone: boolean = false;
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
        this.isVerified = true;
        // this._SMSServiceProxy
        //     .checkCodeByCurrentUserAsync(this.checkUserCodeInput)
        //     .subscribe(() => {
        //         this.codeSendInput = new CodeSendInput();
        //     })
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

    private getPhoneNum(realTimePhoneNum: string): void {

        if (realTimePhoneNum !== this.existentPhoneNum) {
            this.smsBtn.nativeElement.innerHTML = "发送验证码";
            this.isSendNewPhone = false;
            clearInterval(this.sendSMSTimer);
        } else {
            this.isSendNewPhone = true;
        }
    }

    // 发送验证码
    send(event, tel) {

        this.existentPhoneNum = tel;
        this.codeSendInput.targetNumber = tel;
        this.codeSendInput.codeType = VerificationCodeType.PhoneUnBinding;
        console.log(this.existentPhoneNum);
        // input.captchaResponse = this.captchaResolved();

        this._SMSServiceProxy
            .sendCodeAsync(this.codeSendInput)
            .subscribe(result => {
                this.anginSend(event);
            });
    }

    anginSend(event) {
        this.isSendSMS = true;
        this.isSendNewPhone = true;
        this.sendSMSTimer = setInterval(() => {
            this.time--;
            event.target.innerHTML = `${this.time} 秒`;
        }, 1000)

        let timer = setTimeout(() => {
            clearTimeout(timer);
            clearInterval(this.sendSMSTimer);
            this.time = 60;
            this.isSendSMS = false;
            this.isSendNewPhone = false;
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
