import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { SecurityComponent } from './security/security.component';
import { SuggestComponent } from './suggest/suggest.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: SettingsComponent},
            { path: 'settings', component: SettingsComponent},
            { path: 'security', component: SecurityComponent},
            { path: 'suggest', component: SuggestComponent}
        ]
    }
];

export const SettingsRoutes = RouterModule.forChild(routes);
