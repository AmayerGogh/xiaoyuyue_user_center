import * as _ from 'lodash';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, Injector, OnInit, Output } from '@angular/core';
import { AuthenticateModel, AuthenticateResultModel, ExternalLoginProviderInfoModel, TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { ExternalLoginProvider, LoginService } from "shared/services/login.service";
import { Headers, Http } from '@angular/http';

import { AbpSessionService } from '@abp/session/abp-session.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { Location } from '@angular/common';
import { NgxAni } from "ngxani";
import { TooltipConfig } from "ngx-bootstrap";
import { accountModuleAnimation } from '@shared/animations/routerTransition';

@Component({
    templateUrl: './login.component.html',
    animations: [accountModuleAnimation()],
    styleUrls: ['./login.component.scss'],
    providers: [{ provide: TooltipConfig, useFactory: getAlertConfig }]
})
export class LoginComponent extends AppComponentBase implements AfterViewInit {
    externalLoginProviders: ExternalLoginProvider[];

    submitting: boolean = false;
    flag: boolean = true;
    // 普通登录或者手机验证登录，默认普通登录
    ordinaryLogin: boolean = true;

    constructor(
        injector: Injector,
        public loginService: LoginService,
        private _router: Router,
        private _location: Location,
        private _activatedRoute: ActivatedRoute,
        private _sessionService: AbpSessionService,
        private _tokenAuthService: TokenAuthServiceProxy,
        private _ngxAni: NgxAni
    ) {
        super(injector);
    }

    clearCookie() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString() + "; path=/";
        }
    }

    ngOnInit(): void {
        // this._activatedRoute.queryParams.subscribe((params: Params) => {
        //     this.loginService.externalLoginCallback(params);
        // });
        // this.clearCookie();
        if (this.is_weixn()) {
            this._router.navigate(['/auth/external']);
        }

        if (this._sessionService.userId) {
            this._router.navigate(['/user/home']);
        }
    }

    ngAfterViewInit(): void {
        let self = this;
        // 解决Chrome浏览器自动填充的BUG
        setTimeout(() => {
            $("input:-webkit-autofill").addClass('edited')
        }, 600);

        $(document).click(() => {
            self.flag = true;
            $('#externalLogin').css({
                opacity: 0,
                transform: 'scale(0)'
            });
            $('#external_login_container').css({
                opacity: 0
            });
        })
    }

    get multiTenancySideIsTeanant(): boolean {
        return this._sessionService.tenantId > 0;
    }

    get isSelfRegistrationAllowed(): boolean {
        if (!this._sessionService.tenantId) {
            return false;
        }

        return this.setting.getBoolean('App.UserManagement.AllowSelfRegistration');
    }


    login(): void {
        if (!this.loginService.authenticateModel.loginCertificate || !this.loginService.authenticateModel.password) {
            this.message.error(this.l('UserNameOrPasswdCannotForNull'), this.l('CannotLogin'));
            return;
        }

        this.submitting = true;
        this.loginService.authenticate(
            () => this.submitting = false
        );
    }

    is_weixn() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) + '' == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }

    externalLogin(provider: ExternalLoginProvider, elementRef: object, externalContent: object, $event) {
        $event.cancelBubble = true;
        this.flag && this.loginService.externalAuthenticate(provider); //执行第三方登陆逻辑

        if (provider.name == 'WeChat' && this.flag) {
            // 由于每次点击都回去请求微信，但是微信图片隐藏时没必要也去请求
            this.animationShow(elementRef, externalContent);
        } else {
            this.animationHide(elementRef, externalContent);
        }
        this.flag = !this.flag;
    }

    // NgxAni动画
    private animationShow(externalAni, externalContent) {
        this._ngxAni.to(externalAni, .6, {
            transform: 'scale(1)',
            opacity: .8,
            'ease': this._ngxAni['easeOutBack'],
            onComplete: () => {
                // 利用定时器解决每次请求微信图片会出现延迟，导致显示问题
                setTimeout(() => {
                    this._ngxAni.to(externalContent, 1, {
                        opacity: 1
                    })
                }, 10);
            }
        });
    }


    private animationHide(externalAni, externalContent) {
        this._ngxAni.to(externalAni, .4, {
            transform: 'scale(0)',
            opacity: 0,
        });
        this._ngxAni.to(externalContent, 1, {
            opacity: 0
        })
    }

    // add after
    //是否账号登录
    isOrdinaryLogin() {
        this.ordinaryLogin = true;
    }
    //是否手机验证登录
    isPhoneLogin() {
        this.ordinaryLogin = false;
    }

}


export function getAlertConfig(): TooltipConfig {
    return Object.assign(new TooltipConfig(), {
        placement: 'top',
        container: 'body'
    });

}