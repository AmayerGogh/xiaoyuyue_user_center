import { MediaCompressFormat } from 'shared/AppConsts';

export class PictureUrlHelper {
    static getCompressUrl(url: string, compressProt: string): string {
        return url + '?' + compressProt;
    }

    static getBookingPictureCompressUrl(url: string): string {
        return url + '?' + MediaCompressFormat.bookingPictureFormat;
    }

    static getTimelinePictuCompressUrl(url: string): string {
        return url + '?' + MediaCompressFormat.timelinePictureFormat;
    }

    static getOutletPictuCompressUrl(url: string): string {
        return url + '?' + MediaCompressFormat.outletPictureFormat;
    }
}