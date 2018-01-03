import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CurrentPhoneComponent } from './security/phone/current-phone/current-phone.component';
import { EmailComponent } from './security/email/email.component';
import { NgModule } from '@angular/core';
import { PasswdComponent } from './security/passwd/passwd.component';
import { SecurityComponent } from './security/security.component';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SuggestComponent } from './suggest/suggest.component';
import { AppCommonModule } from 'app/shared/common/app-common.module';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        SettingsRoutingModule,
        AppCommonModule
    ],
    declarations: [
        SettingsComponent,
        SecurityComponent,
        SuggestComponent,
        PasswdComponent,
        EmailComponent,
        CurrentPhoneComponent
    ],
    providers: [
    ]
})
export class SettingsModule { }