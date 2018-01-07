import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { ClientTypeHelper } from 'shared/helpers/ClientTypeHelper';
import { PhoneComponent } from './security/phone/phone.component';
import { EmailComponent } from './security/email/email.component';
import { NgModule } from '@angular/core';
import { PasswdComponent } from './security/passwd/passwd.component';
import { SecurityComponent } from './security/security.component';
import { SettingsComponent } from './settings.component';
import { SuggestComponent } from './suggest/suggest.component';
import { LangSwitchComponent } from 'app/user/settings/lang-switch/lang-switch.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: '', component: SettingsComponent, data: { breadcrumb: 'Menu.Settings' } },
                    // { path: 'settings', component: SettingsComponent, data: { breadcrumb: 'Menu.Settings' } },
                    { path: 'security', component: SecurityComponent, data: { breadcrumb: 'Menu.Security' } },
                    { path: 'suggest', component: SuggestComponent, data: { breadcrumb: 'Menu.Feedback' } },
                    { path: 'passwd', component: PasswdComponent, data: { breadcrumb: 'Menu.ChangePassword' } },
                    { path: 'phone', component: PhoneComponent, data: { breadcrumb: 'Menu.BindingPhone' } },
                    { path: 'email', component: EmailComponent, data: { breadcrumb: '改绑邮箱' } },
                    { path: 'lang', component: LangSwitchComponent, data: { breadcrumb: '语言切换' } }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class SettingsRoutingModule {
    iswxjsEnvironment = false;
    constructor(private router: Router) {
        this.iswxjsEnvironment = ClientTypeHelper.isWeChatMiniProgram;

        router.events.subscribe((event: NavigationEnd) => {
            setTimeout(() => {
                this.toggleBodyCssClass(event.url);
            }, 0);
        });
    }

    toggleBodyCssClass(url: string): void {
        if (this.iswxjsEnvironment) {
            $('.settings').css('top', '0px');
            $('.settings').css('padding-top', '0px');
            $('.security').css('padding-top', '0px');

            $('.change-passwd-wrap').css('padding-top', '0px');
            $('.current-phone-wrap').css('padding-top', '0px');
            $('.new-phone-wrap').css('padding-top', '0px');
        }
    }
}
