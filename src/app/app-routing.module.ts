import { AppComponent } from './app.component';
import { AppRouteGuard } from './shared/common/auth/auth-route-guard';
import { BreadcrumbService } from 'shared/services/bread-crumb.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    {
                        path: '',
                        loadChildren: 'app/index/index.module#IndexModule', // Lazy load index module
                        data: { preload: true }
                    },
                    {
                        path: 'auth',
                        loadChildren: 'app/auth/auth.module#AuthModule', // Lazy load auth module
                        data: { preload: true }
                    },
                    {
                        path: 'user/home',
                        loadChildren: 'app/home/home.module#HomeModule', // Lazy load home module
                        data: { preload: true }
                    },
                    {
                        path: 'user',
                        loadChildren: 'app/user/user.module#UserModule', // Lazy load user module
                        data: { preload: true }
                    },
                    {
                        path: 'booking',
                        loadChildren: 'app/booking/booking.module#BookingModule', // Lazy load booking module
                        data: { preload: true }
                    },
                    {
                        path: 'help',
                        loadChildren: 'app/sitemaps/help/help.module#HelpModule', // Lazy load booking module
                        data: { preload: true }
                    },
                    {
                        path: 'guide',
                        loadChildren: 'app/sitemaps/guide/guide.module#GuideModule', // Lazy load booking module
                        data: { preload: true }
                    },
                    {
                        path: 'other',
                        loadChildren: 'app/sitemaps/other/other.module#OtherModule', // Lazy load booking module
                        data: { preload: true }
                    },
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
