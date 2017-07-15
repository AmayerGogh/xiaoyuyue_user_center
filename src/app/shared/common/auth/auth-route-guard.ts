﻿import { Injectable } from '@angular/core';
import { PermissionCheckerService } from "@abp/auth/permission-checker.service";
import { AppSessionService } from '@shared/common/session/app-session.service';
import { AdminPermissions } from '@shared/AdminPermissions';
import { UrlHelper } from '@shared/helpers/UrlHelper';

import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';
import { UtilsService } from '@abp/utils/utils.service';
import { AppAuthService } from 'app/shared/common/auth/app-auth.service';

@Injectable()
export class AppRouteGuard implements CanActivate, CanActivateChild {

    constructor(
        private _permissionChecker: PermissionCheckerService,
        private _router: Router,
        private _utilsService: UtilsService,
        private _appAuthService: AppAuthService,
        private _sessionService: AppSessionService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this._sessionService.user) {
            this._appAuthService.recordRedirectUrl();
            this._router.navigate(['/auth/login']);
            return false;
        }

        if (!route.data || !route.data["permission"]) {
            return true;
        }

        if (this._permissionChecker.isGranted(route.data["permission"])) {
            return true;
        }

        this._router.navigate([this.selectBestRoute()]);
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    selectBestRoute(): string {
        if (!this._sessionService.user) {
            return '/auth/login';
        }

        if (this._permissionChecker.isGranted(AdminPermissions.tenantDashboard)) {
            return '/admin/center';
        }

        if (this._permissionChecker.isGranted(AdminPermissions.userManage_Tenants)) {
            return '/app/admin/tenants';
        }

        if (this._permissionChecker.isGranted(AdminPermissions.userManage)) {
            return '/app/admin/users';
        }

        return '/app/notifications';
    }
}