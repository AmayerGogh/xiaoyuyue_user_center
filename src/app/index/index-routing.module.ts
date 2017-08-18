import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: '',
                        loadChildren: 'app/index/desktop/desktop.module#DesktopModule',
                        data: { preload: true }
                    },
                    {
                        path: 'mobile',
                        loadChildren: 'app/index/mobile/mobile.module#MobileModule',
                        data: { preload: true }
                    }
                ]
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