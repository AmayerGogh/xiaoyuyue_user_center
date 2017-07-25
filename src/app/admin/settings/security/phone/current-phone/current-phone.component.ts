import { Component, OnInit, ElementRef, ViewChild, Injector } from '@angular/core';
import { ProfileServiceProxy, CodeSendInput, SMSServiceProxy } from '@shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
import { VerificationCodeType } from 'shared/AppEnums';
import { AppComponentBase } from 'shared/common/app-component-base';
declare var $: any;
@Component({
    selector: 'xiaoyuyue-current-phone',
    templateUrl: './current-phone.component.html',
    styleUrls: ['./current-phone.component.scss']
})
export class CurrentPhoneComponent extends AppComponentBase implements OnInit {
    isSendSMS: boolean;
    code: string;
    @ViewChild("smsBtn") smsBtn: ElementRef;

    constructor(
        injector: Injector,
        private _router: Router,
        private _SMSServiceProxy: SMSServiceProxy,
        private _profileServiceProxy: ProfileServiceProxy
    ) {
        super(injector);
    }

    ngOnInit() {
        $.material.init();
    }

    ngAfterViewInit() {
        // TODO: 暂时处理
        $("#headerTitle").text("更换手机");
    }

    unbindPhone(): void {
        this._profileServiceProxy
            .unBindingPhoneNum(this.code)
            .subscribe(() => {
                this._router.navigate(['/app/admin/settings/new-phone']);
            })
    }

    getUserPhoneNum(): void {

    }

    // 发送验证码
    send() {
        let input: CodeSendInput = new CodeSendInput();
        // 暂时手机号码写死
        input.targetNumber = '18599926714';
        input.codeType = VerificationCodeType.PhoneUnbinding;
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
