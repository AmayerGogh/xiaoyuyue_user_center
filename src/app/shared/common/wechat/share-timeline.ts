import '@assets/jweixin-1.2.0';

import { Component, ElementRef, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DefaultTimezoneScope, NameValueDto, TimingServiceProxy } from '@shared/service-proxies/service-proxies';

import { AppComponentBase } from '@shared/common/app-component-base';
import { WeChatShareTimelineInputDto } from 'app/shared/utils/wechat-share-timeline.input.dto';

@Component({
    selector: 'wechat-share-timeline',
    template:
    ``
})
export class WeChatShareTimelineComponent extends AppComponentBase implements OnInit {

    @Output() successAction: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() input: WeChatShareTimelineInputDto;

    constructor(
        private _timingService: TimingServiceProxy,
        injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        wx.config({
            debug: true,
            appId: '@Html.Raw(Model.AppId)',
            timestamp: 123456,
            nonceStr: '@Html.Raw(Model.NonceStr)',
            signature: '@Html.Raw(Model.Signature)',
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage',]
        });

        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: '@Html.Raw(Model.Title)', // 分享标题
                link: '@Html.Raw(Model.link)',
                imgUrl: '@Html.Raw(Model.LogoUrl)', // 分享图标
                trigger: function (res) {
                    // alert("点击分享：" +JSON.stringify(res));
                },
                success: function () {
                    // 分享成功后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareAppMessage({
                title: '@Html.Raw(Model.Title)', // 分享标题
                desc: '@Html.Raw(Model.Desc)', // 分享描述
                link: '@Html.Raw(Model.link)', // 分享链接
                imgUrl: '@Html.Raw(Model.LogoUrl)', // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                },
                cancel: function () {
                }
            });
        });
    }
}
