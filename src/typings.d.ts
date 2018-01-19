///<reference path="../node_modules/@types/jquery/index.d.ts"/>
///<reference path="../node_modules/abp-web-resources/Abp/Framework/scripts/abp.d.ts"/>
///<reference path="../node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.jquery.d.ts"/>
///<reference path="../node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr.d.ts"/>
///<reference path="../node_modules/moment/moment.d.ts"/>
///<reference path="../node_modules/@types/bootstrap/index.d.ts"/>
///<reference path="../node_modules/@types/toastr/index.d.ts"/>
///<reference path="../node_modules/@types/jquery-backstretch/index.d.ts"/>
///<reference path="../node_modules/better-scroll/types/index.d.ts"/>

// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;
declare var BScroll: any;

interface JQuery {
    slimScroll(...any): any;
}

interface JQuery {
    collapse(...any): any;
}

interface JQuery {
    daterangepicker(...any): any;
}

interface JQuery {
    datepicker(...any): any;
}


// interface JQuery {
//     backstretch(...any): any;
// }


/**
 * Morris
 */

/*declare namespace morris {
    interface IAreaOptions {
        gridEnabled?: boolean;
        //gridLineColor?: string;
        padding?: number;
    }
}*/

/**
 * rtl-detect
 */

declare module 'rtl-detect';

/**
 * Wechat Login
 */
declare var WxLogin: any;

declare var Push: any;

declare var $: any;
declare var Qiniu: any;
declare var QiniuJsSDK: any;
declare var plupload: any;
declare var FileProgress: jQuery;

declare var cropper: any;
declare var Cropper: any;
interface JQuery {
    cropper(...any): any;
}declare var cropper: any;
declare var Cropper: any;
interface JQuery {
    cropper(...any): any;
}
interface JQuery {
    LUOCAPTCHA(...any): any;
}

interface JQuery {
    flatpickr(...any): any;
}
interface JQuery {
    FastClick(...any): any;
}
FastClick.attach(document.body);

interface JQuery {
    inputmask(...any): any;
}

interface Window {
    FileReader: any;
    webkitURL: any;
    mozURL: any;
    __wxjs_environment: any;
}

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}
interface String {
    getMoment(...args): any;
}
// String.prototype.getMoment = function(): any {
//      if (arg === undefined) return undefined;
//         return moment(arg);
// }

declare var moment: any;

declare var wx: any;

