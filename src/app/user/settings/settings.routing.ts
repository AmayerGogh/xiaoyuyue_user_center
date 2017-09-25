import { RouterModule, Routes } from '@angular/router';

import { CurrentPhoneComponent } from './security/phone/current-phone/current-phone.component';
import { EmailComponent } from './security/email/email.component';
import { PasswdComponent } from './security/passwd/passwd.component';
import { SecurityComponent } from './security/security.component';
import { SettingsComponent } from './settings.component';
import { SuggestComponent } from './suggest/suggest.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: SettingsComponent, data: { breadcrumb: 'Menu.Settings' } },
            // { path: 'settings', component: SettingsComponent, data: { breadcrumb: 'Menu.Settings' } },
            { path: 'security', component: SecurityComponent, data: { breadcrumb: 'Menu.Security' } },
            { path: 'suggest', component: SuggestComponent, data: { breadcrumb: 'Menu.Feedback' } },
            { path: 'passwd', component: PasswdComponent, data: { breadcrumb: 'Menu.ChangePassword' } },
            { path: 'change-phone', component: CurrentPhoneComponent, data: { breadcrumb: 'Menu.BindingPhone' } },
            { path: 'email', component: EmailComponent, data: { breadcrumb: 'Menu.BindingPhone' } }
        ]
    }
];

export const SettingsRoutes = RouterModule.forChild(routes);
