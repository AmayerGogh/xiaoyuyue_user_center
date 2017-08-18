import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'desktop',
                loadChildren: 'desktop/desktop.module#DesktopModule',
                data: { preload: true }
            },
            {
                path: 'mobile',
                loadChildren: 'mobile/mobile.module#MobileModule',
                data: { preload: true }
            }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class IndexRoutingModule { }