import { AppComponent } from './app.component';
import { AppRouteGuard } from './shared/common/auth/auth-route-guard';
import { BreadcrumbService } from 'shared/services/bread-crumb.service';
import { NgModule } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { PageNotFoundComponent } from 'app/page-not-found/page-not-found.component';
import { CookiesService } from 'shared/services/cookies.service';
import { InitLanguage, AppConsts } from 'shared/AppConsts';

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
                    {
                        path: '**',
                        component: PageNotFoundComponent
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
    constructor(
        private router: Router,
        private _cookiesService: CookiesService
    ) {
        router.events.subscribe((event: NavigationEnd) => {
            if (!(event instanceof NavigationEnd)) { return; }

            this.initLanguage(event);
        });
    }

    initLanguage(event: NavigationEnd): void {
        if (event.url === '/') { return; }
        InitLanguage.all.forEach((langName: string) => {
            let url = event.url;
            url = url.replace(/\//, '');
            const value = langName.toLocaleLowerCase().indexOf(url.toLocaleLowerCase());
            if (value < 0) { return; }
            this.changeLanguage(langName);
        });
    }

    changeLanguage(langName: string) {
        this._cookiesService.setCookieValue(
            'Abp.Localization.CultureName',
            langName,
            new Date(new Date().getTime() + 5 * 365 * 86400000), // 5 year
            abp.appPath
        );
        window.location.href = AppConsts.appBaseUrl;
    }
}
