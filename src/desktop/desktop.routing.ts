import { RouterModule, Routes } from '@angular/router';

import { DesktopComponent } from './desktop.component';
import { HomeComponent } from 'desktop/home/home.component';

const routes: Routes = [
  {
      path: '',
      component: DesktopComponent,
      children: [
          {
              path: '',
              component: HomeComponent
          }
      ]
   },
];

export const DesktopRoutingModule = RouterModule.forChild(routes);
