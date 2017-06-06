import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from "shared/common/app-component-base";
import { RegisterModel } from "account/register/register.model";
import { PasswordComplexitySetting, SupplementaryExternalAuthModel, TokenAuthServiceProxy, ProfileServiceProxy } from "shared/service-proxies/service-proxies";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from "shared/services/login.service";
import { PhoneValidateComponent } from "account/shared/phone-validate/phone-validate.component";

@Component({
  selector: 'app-supplementary-external-register',
  templateUrl: './supplementary-external-register.component.html',
  styleUrls: ['./supplementary-external-register.component.css']
})
export class SupplementaryExternalRegisterComponent extends AppComponentBase implements OnInit {
  userId: any;
  saving: boolean = false;
  model: SupplementaryExternalAuthModel = new SupplementaryExternalAuthModel();
  passwordComplexitySetting: PasswordComplexitySetting = new PasswordComplexitySetting();
  requiredEmail: boolean;
  RequiredTelephone: boolean;
  RequiredUserName: boolean;

  @ViewChild('PhoneValidate') phoneValidate: PhoneValidateComponent;

  constructor(
    injector: Injector,
    private _tokenAuthServiceProxy: TokenAuthServiceProxy,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _profileService: ProfileServiceProxy,
    private readonly _loginService: LoginService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.requiredEmail = this.toBoolean(abp.setting.values["App.ExternalAuthentication.UserActivationCondition.RequiredEmail"]);
    this.RequiredTelephone = this.toBoolean(abp.setting.values["App.ExternalAuthentication.UserActivationCondition.RequiredTelephone"]);
    this.RequiredUserName = this.toBoolean(abp.setting.values["App.ExternalAuthentication.UserActivationCondition.RequiredUserName"]);

    this._activatedRoute.params.subscribe((params: Params) => {
      this.userId = params.id;
    })

    this._profileService.getPasswordComplexitySetting().subscribe(result => {
      this.passwordComplexitySetting = result.setting;
    });

    jQuery.getScript('//captcha.luosimao.com/static/js/api.js', () => {
    });
  }

  // 是否使用人机验证
  get useCaptcha(): boolean {
    return this.setting.getBoolean('App.UserManagement.UseCaptchaOnRegistration');
  }

  save() {
    // this.captchaResolved();
    // if (this.RequiredTelephone) {
    //   this.model.captchaResponse = this.phoneValidate.captchaResolved();
    //   if (this.useCaptcha && !this.model.captchaResponse) {
    //     this.message.warn(this.l('CaptchaCanNotBeEmpty'));
    //     return;
    //   }
    // }

    this.saving = true;
    this.model.userId = this.userId;

    this._tokenAuthServiceProxy
      .supplementaryExternalAuthenticate(this.model)
      .finally(() => this.saving = false)
      .subscribe(result => {
        if (!result) {
          this.notify.success(this.l('SuccessfullyRegistered'));
          this._router.navigate(['account/login']);
          return;
        }

        //Autheticate
        this.saving = true;
        // 用户名或手机号或邮箱，有一个满足即返回凭证去作为登陆凭证
        let voucher = this.model.emailAddress || this.model.phoneNumber || this.model.userName;
        this._loginService.authenticateModel.loginCertificate = voucher;
        this._loginService.authenticateModel.password = this.model.password;
        this._loginService.authenticate(() => { this.saving = false; });
      });
  }

  // captchaResolved(): void {
  //   let captchaResponse = $('#lc-captcha-response').val();
  //   this.model.captchaResponse = captchaResponse;
  // }

  toBoolean(value: string): boolean {
    return value.toLowerCase() === "false" ? false : true;
  }

}
