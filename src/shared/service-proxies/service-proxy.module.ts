import * as ApiServiceProxies from './service-proxies';

import { NgModule } from '@angular/core';

@NgModule({
    providers: [
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.TenantRegistrationServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,

        ApiServiceProxies.OrgBookingServiceProxy,
        ApiServiceProxies.PerBookingOrderServiceProxy,
        ApiServiceProxies.OutletServiceServiceProxy,
        ApiServiceProxies.PictureServiceProxy,
        ApiServiceProxies.SMSTemplateServiceProxy,

        ApiServiceProxies.ProfileServiceProxy,
        ApiServiceProxies.SMSServiceProxy,
        ApiServiceProxies.BookingServiceProxy,
        ApiServiceProxies.SMSTemplateServiceProxy,
        ApiServiceProxies.PerBookingOrderServiceProxy,
        ApiServiceProxies.BookingRecordServiceProxy

    ]
})
export class ServiceProxyModule { }
