import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings.component';
import { SettingsRoutes } from './settings.routing';
import { SuggestComponent } from './suggest/suggest.component';
import { SecurityComponent } from './security/security.component';
import { PasswdComponent } from './security/passwd/passwd.component';
import { EmailComponent } from './security/email/email.component';
import { CurrentPhoneComponent } from './security/phone/current-phone/current-phone.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        SettingsRoutes
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