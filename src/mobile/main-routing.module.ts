import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { IndexComponent } from 'mobile/main.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: "",
                component: IndexComponent,
                children: [
                    { path: '', component: HomeComponent },
                    { path: 'intro', component: IntroductionComponent },
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class IndexRoutingModule { }