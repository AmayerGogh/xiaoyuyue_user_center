import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { SecurityComponent } from './security/security.component';
import { SuggestComponent } from './suggest/suggest.component';
import { PasswdComponent } from './security/passwd/passwd.component';
import { EmailComponent } from './security/email/email.component';
import { CurrentPhoneComponent } from './security/phone/current-phone/current-phone.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: SettingsComponent},
            { path: 'settings', component: SettingsComponent},
            { path: 'security', component: SecurityComponent},
            { path: 'suggest', component: SuggestComponent},
            { path: 'passwd', component: PasswdComponent},
            { path: 'change-phone', component: CurrentPhoneComponent},
            { path: 'email', component: EmailComponent}
        ]
    }
];

export const SettingsRoutes = RouterModule.forChild(routes);