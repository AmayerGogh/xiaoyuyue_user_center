import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { IndexComponent } from "index/main.component";

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