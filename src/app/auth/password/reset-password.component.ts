import { Component, Injector, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AccountServiceProxy, ResetPasswordOutput } from '@shared/service-proxies/service-proxies';
import { AuthenticateModel, AuthenticateResultModel, PasswordComplexitySetting, ProfileServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppSessionService } from '@shared/common/session/app-session.service';
import { AppUrlService } from '@shared/common/nav/app-url.service';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { ResetPasswordModel } from './reset-password.model';
import { AppConsts } from '@shared/AppConsts';
import { LoginService } from 'shared/services/login.service';

@Component({
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    animations: [accountModuleAnimation()]
})
export class ResetPasswordComponent extends AppComponentBase implements OnInit {

    model: ResetPasswordModel = new ResetPasswordModel();
    passwordComplexitySetting: PasswordComplexitySetting = new PasswordComplexitySetting();
    saving = false;

    constructor(
        injector: Injector,
        private _accountService: AccountServiceProxy,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _loginService: LoginService,
        private _appUrlService: AppUrlService,
        private _appSessionService: AppSessionService,
        private _profileService: ProfileServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.model.userId = this._activatedRoute.snapshot.queryParams["userId"];
        this.model.resetCode = this._activatedRoute.snapshot.queryParams["resetCode"];

        this._appSessionService.changeTenantIfNeeded(
            this.parseTenantId(
                this._activatedRoute.snapshot.queryParams["tenantId"]
            )
        );

        this._profileService.getPasswordComplexitySetting().subscribe(result => {
            this.passwordComplexitySetting = result.setting;
        });
    }

    save(): void {
        this.saving = true;
        this._accountService.resetPassword(this.model)
            .finally(() => { this.saving = false; })
            .subscribe((result: ResetPasswordOutput) => {
                if (!result.canLogin) {
                    this._router.navigate(['auth/login']);
                    return;
                }

                //Autheticate
                this.saving = true;
                this._loginService.authenticateModel.loginCertificate = result.userName;
                this._loginService.authenticateModel.password = this.model.password;
                this._loginService.authenticate(() => {
                    this.saving = false;
                }, AppConsts.appBaseUrl);
            });
    }

    parseTenantId(tenantIdAsStr?: string): number {
        let tenantId = !tenantIdAsStr ? undefined : parseInt(tenantIdAsStr);
        if (tenantId === NaN) {
            tenantId = undefined;
        }

        return tenantId;
    }
}