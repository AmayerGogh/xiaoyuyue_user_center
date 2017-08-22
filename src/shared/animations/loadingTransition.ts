import { element } from 'protractor';

// 设置进入页面的启动加载页面，替换Abp框架的Loading动画
// tslint:disable-next-line:class-name
export class appLoadingBusy {
    static effectText = ['小', '预', '约', ' ', '知', '未', '来'];
    static setBusy(): void {
        let bodyEle = $('body');
        let effectTextWrap = $('<div></div>').addClass('effect-text-wrap');
        let imgLogo = $('<img>').addClass('logo').attr('src','/assets/common/images/login/logo-colorized.jpg');
        let appLoadingBusyWrap = $('<div></div>').addClass('app-loading-busy-wrap');

        bodyEle.append(appLoadingBusyWrap);
        appLoadingBusyWrap.append(imgLogo);
        appLoadingBusyWrap.append(effectTextWrap);

        appLoadingBusy.effectText.forEach(element => {
            let spanEle = $('<span></span>').text(element).addClass('effect-text');
            effectTextWrap.append(spanEle);
        });
    };

    static clearBusy(): void {
       $('.app-loading-busy-wrap').remove();
     };
};
