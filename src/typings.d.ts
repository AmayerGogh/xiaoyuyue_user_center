///<reference path="../node_modules/@types/jquery/index.d.ts"/>
///<reference path="../node_modules/@types/jstree/index.d.ts"/>
///<reference path="../node_modules/abp-web-resources/Abp/Framework/scripts/abp.d.ts"/>
///<reference path="../node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.jquery.d.ts"/>
///<reference path="../node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr.d.ts"/>
///<reference path="../node_modules/moment/moment.d.ts"/>
///<reference path="../node_modules/@types/moment-timezone/index.d.ts"/>
///<reference path="../node_modules/@types/bootstrap/index.d.ts"/>
///<reference path="../node_modules/@types/toastr/index.d.ts"/>
///<reference path="../node_modules/@types/jquery-backstretch/index.d.ts"/>

// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;

declare var App: any; //Related to Metronic
declare var Layout: any; //Related to Metronic

interface JQuery {
    Jcrop(...any): any;
}

interface JQuery {
    daterangepicker(...any): any;
}

interface JQuery {
    slimScroll(...any): any;
}

interface JQuery {
    timeago(...any): any;
}


/**
 * jQuery selectpicker
 */

interface JQuery {
    selectpicker(...any): any;
}

/**
 * bootstrap multiselect
 */

interface JQuery {
    multiselect(...any): any;
}


// interface JQuery {
//     backstretch(...any): any;
// }


/**
 * jQuery sparkline
 */

interface JQuery {
    sparkline(...any): any;
}

/**
 * jQuery Bootstrap Switch
 */

interface JQuery {
    bootstrapSwitch(...any): any;
}

/**
 * Morris
 */

declare namespace morris {
    interface IAreaOptions {
        gridEnabled?: boolean;
        //gridLineColor?: string;
        padding?: number;
    }
}

/**
 * rtl-detect
 */

declare module 'rtl-detect';

/**
 * Wechat Login
 */
declare var WxLogin: any;

declare var Push: any;

declare var $:any;
declare var Qiniu:any;
declare var QiniuJsSDK:any;
declare var plupload:any;
declare var FileProgress:jQuery;

interface JQuery {
    LUOCAPTCHA(...any): any;
}

interface JQuery {
    flatpickr(...any): any;
}
interface Window {
    FileReader: any;
    webkitURL: any;
    mozURL: any;
}

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}