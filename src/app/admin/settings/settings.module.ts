import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings.component';
import { SettingsRoutes } from './settings.routing';
import { SuggestComponent } from './suggest/suggest.component';
import { SecurityComponent } from './security/security.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        SettingsRoutes
    ],
    declarations: [
        SettingsComponent,
        SecurityComponent,
        SuggestComponent
    ],
    providers: [
    ]
})
export class SettingsModule { }