import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { SecurityComponent } from './security/security.component';
import { SuggestComponent } from './suggest/suggest.component';
import { PasswdComponent } from './security/passwd/passwd.component';
import { EmailComponent } from './security/email/email.component';
import { CurrentPhoneComponent } from './security/phone/current-phone/current-phone.component';
import { NewPhoneComponent } from './security/phone/new-phone/new-phone.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: SettingsComponent},
            { path: 'settings', component: SettingsComponent},
            { path: 'security', component: SecurityComponent},
            { path: 'suggest', component: SuggestComponent},
            { path: 'passwd', component: PasswdComponent},
            { path: 'current-phone', component: CurrentPhoneComponent},
            { path: 'new-phone', component: NewPhoneComponent},
            { path: 'email', component: EmailComponent}
        ]
    }
];

export const SettingsRoutes = RouterModule.forChild(routes);