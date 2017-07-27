import { Component, OnInit, Injector, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ProfileServiceProxy, BindingPhoneNumInput, SMSServiceProxy, CodeSendInput } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { VerificationCodeType } from 'shared/AppEnums';
@Component({
    selector: 'xiaoyuyue-new-phone',
    templateUrl: './new-phone.component.html',
    styleUrls: ['./new-phone.component.scss']
})
export class NewPhoneComponent extends AppComponentBase implements OnInit {
    isSendSMS: boolean;
    input: BindingPhoneNumInput = new BindingPhoneNumInput();
    @ViewChild('smsBtn') smsBtn: ElementRef;
    constructor(
        injector: Injector,
        private _location: Location,
        private _profileServiceProxy: ProfileServiceProxy,
        private _SMSServiceProxy: SMSServiceProxy
    ) {
        super(injector);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        // TODO: 暂时处理
        $("#headerTitle").text("更换手机");
    }

    bindPhone(): void {
        this._profileServiceProxy
            .bindingPhoneNum(this.input)
            .subscribe(() => {
                this._location.back();
                setTimeout(() => {
                    this.notify.success("更绑成功");
                }, 1000);
            });
    }

    // 发送验证码
    send() {
        let input: CodeSendInput = new CodeSendInput();
        input.targetNumber = this.input.phoneNum;
        input.codeType = VerificationCodeType.PhoneVerify;
        input.captchaResponse = "";
        // input.captchaResponse = this.captchaResolved();

        this._SMSServiceProxy
            .sendCodeAsync(input)
            .subscribe(result => {
                this.anginSend();
            });
    }

    anginSend() {
        let self = this;
        let time = 60;
        this.isSendSMS = true;
        let set = setInterval(() => {
            time--;
            self.smsBtn.nativeElement.innerHTML = `${time} 秒`;
        }, 1000)

        setTimeout(() => {
            clearInterval(set);
            self.isSendSMS = false;
            self.smsBtn.nativeElement.innerHTML = this.l("AgainSendValidateCode");
        }, 60000);
    }
}
