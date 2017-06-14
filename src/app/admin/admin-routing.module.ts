import { AdminPermissions } from '@shared/AdminPermissions';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HostSettingsComponent } from './settings/host-settings.component';
import { TenantSettingsComponent } from './settings/tenant-settings.component';
import { MessageManageComponent } from "app/admin/message-manage/message-manage.component";
import { CreateOrEditMessageTemplateComponent } from "app/admin/message-manage/create-or-edit-message-template/create-or-edit-message-template.component";
import { CreateOrEditBookingComponent } from "app/admin/create-or-edit-booking/create-or-edit-booking.component";
import { ManageBookingComponent } from "app/admin/manage-booking/manage-booking.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [

                    {
                        path: 'booking',
                        children: [
                            { path: '', redirectTo: 'list' },
                            { path: "list", component: ManageBookingComponent },
                            { path: "create", component: CreateOrEditBookingComponent },
                            { path: "edit/:id", component: CreateOrEditBookingComponent }
                        ]
                    },
                    { path: 'hostSettings', component: HostSettingsComponent, data: { permission: AdminPermissions.configuration_HostSettings } },
                    { path: 'tenantSettings', component: TenantSettingsComponent, data: { permission: AdminPermissions.configuration_TenantSettings } },
                    {
                        path: 'message-template',
                        children: [
                            { path: '', redirectTo: 'list', data: { permission: AdminPermissions.content_SmsTemplates } },
                            { path: "list", component: MessageManageComponent },
                            { path: "create", component: CreateOrEditMessageTemplateComponent },
                            { path: "edit/:id", component: CreateOrEditMessageTemplateComponent }
                        ]
                    },
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {
    constructor(private router: Router) {
        router.events.subscribe(() => {
            this.hideOpenJTableDropdownMenus();
        });
    }

    hideOpenJTableDropdownMenus(): void {
        var $dropdownMenus = $('.dropdown-menu.tether-element');
        $dropdownMenus.css({
            'display': 'none'
        });
    }
}