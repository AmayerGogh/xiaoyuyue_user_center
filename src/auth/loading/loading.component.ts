import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenAuthServiceProxy, ExternalLoginProviderInfoModel } from '@shared/service-proxies/service-proxies';
import { ExternalLoginProvider } from 'shared/services/login.service';
import * as _ from 'lodash';
import { AppConsts } from '@shared/AppConsts';

@Component({
    selector: 'xiaoyuyue-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
    externalLoginProviders: any[];

    constructor(
        private _router: Router,
        private _tokenAuthService: TokenAuthServiceProxy
    ) { }

    ngOnInit() {
        this._tokenAuthService
            .getExternalAuthenticationProviders()
            .subscribe((providers: ExternalLoginProviderInfoModel[]) => {
                this.externalLoginProviders = _.map(providers, p => {
                    return new ExternalLoginProvider(p);
                });

                for (let i = 0; i < this.externalLoginProviders.length; i++) {
                    if (this.externalLoginProviders[i].name == "WeChatMP") {
                        let authBaseUrl = "https://open.weixin.qq.com/connect/oauth2/authorize";
                        let appid = this.externalLoginProviders[i].clientId;
                        let redirect_url = AppConsts.appBaseUrl + '/auth/loading' + '?providerName=' + ExternalLoginProvider.WECHATMP;
                        let response_type = "code";
                        let scope = "snsapi_userinfo";

                        let authUrl = `${authBaseUrl}?appid=${appid}&redirect_uri=${encodeURIComponent(redirect_url)}&response_type=${response_type}&scope=${scope}#wechat_redirect`;
                        window.location.href = authUrl;
                    }
                }
            });
    }

}
