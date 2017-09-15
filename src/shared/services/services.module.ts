import { AccessRecordService } from 'shared/services/access-record.service';
import { CookiesService } from 'shared/services/cookies.service';
import { LoginService } from 'shared/services/login.service';
import { NgModule } from '@angular/core';
import { TenantService } from 'shared/services/tenant.service';

@NgModule({
    providers: [
        AccessRecordService,
        TenantService,
        LoginService,
        CookiesService,
    ]
})
export class ServicesModule { }
