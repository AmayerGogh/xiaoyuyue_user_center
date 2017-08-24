import { Booking } from './service-proxies/service-proxies';
import { ExternalLoginProvider } from 'shared/services/login.service';

export class AppConsts {

    static readonly tenancyNamePlaceHolderInUrl = '{TENANCY_NAME}';

    static remoteServiceBaseUrl: string;
    static remoteServiceBaseUrlFormat: string;
    static appBaseUrl: string;
    static appBusinessBaseUrl: string;
    static bookingPictureFormat: string;
    static appBaseUrlFormat: string;
    static BookingPicture: string;
    static readonly externalLoginUrl = '/auth/login';

    static readonly userManagement = {
        defaultAdminUserName: 'admin'
    };

    static readonly localization = {
        defaultLocalizationSourceName: 'Xiaoyuyue'
    };

    static readonly authorization = {
        encrptedAuthTokenName: 'enc_auth_token'
    };

    static readonly grid = {
        defaultPageSize: 1,
        pageSizes: [5, 10, 20, 50, 100],
        maxPageSize: 1000,
    }
}

export class MediaCompressFormat {
    static bookingPictureFormat = 'imageView2/2/w/800/q/100|imageslim';
    static outletPictureFormat = 'imageView2/2/w/800/q/100|imageslim';
    static timelinePictureFormat = 'imageView2/2/w/100/q/100|imageslim';
    static profilePictureFormat = 'imageView2/2/w/800/q/100|imageslim';
}
