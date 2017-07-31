import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { TokenAuthServiceProxy, ExternalLoginProviderInfoModel } from '@shared/service-proxies/service-proxies';
import { ExternalLoginProvider, LoginService } from 'shared/services/login.service';
import * as _ from 'lodash';
import { AppConsts } from '@shared/AppConsts';

@Component({
    selector: 'xiaoyuyue-loading',
    templateUrl: './external-auth.component.html',
    styleUrls: ['./external-auth.component.scss']
})
export class ExternalAuthComponent implements OnInit {

    constructor(
        private _router: Router,
        private _loginService: LoginService,
        private _activatedRoute: ActivatedRoute,
        private _tokenAuthService: TokenAuthServiceProxy
    ) { }

    ngOnInit() {
        this.externalLogin();
    }

    externalLogin(): void {
        this._activatedRoute.queryParams.subscribe((params: Params) => {
            if (params['providerName'] !== undefined) {
                this._loginService.externalLoginCallback(params);
            } else {
                this._loginService.init((externalLoginProviders) => {
                    for (let i = 0; i < externalLoginProviders.length; i++) {
                        if (externalLoginProviders[i].name == "WeChatMP") {
                            let authBaseUrl = "https://open.weixin.qq.com/connect/oauth2/authorize";
                            let appid = externalLoginProviders[i].clientId;
                            let redirect_url = AppConsts.appBaseUrl + '/auth/loading' + '?providerName=' + ExternalLoginProvider.WECHATMP;
                            let response_type = "code";
                            let scope = "snsapi_userinfo";

                            let authUrl = `${authBaseUrl}?appid=${appid}&redirect_uri=${encodeURIComponent(redirect_url)}&response_type=${response_type}&scope=${scope}#wechat_redirect`;
                            window.location.href = authUrl;
                        }
                    }
                });
            }
        });
    }
}
