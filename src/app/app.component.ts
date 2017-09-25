import { AfterViewInit, Component, Injector, OnInit, ViewContainerRef } from '@angular/core';

import { AppComponentBase } from 'shared/common/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { WeChatShareResultDto } from 'app/shared/utils/wechat-share-timeline.input.dto';
import { WeChatShareTimelineService } from 'shared/services/wechat-share-timeline.service';

@Component({
    templateUrl: './app.component.html'
})
export class AppComponent extends AppComponentBase implements OnInit, AfterViewInit {

    public constructor(
        injector: Injector,
        private _weChatShareTimelineService: WeChatShareTimelineService
    ) {
        super(injector);
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.initWechatShareConfig();
    }

    initWechatShareConfig() {
        this._weChatShareTimelineService.input.sourceUrl = document.location.href;
        this._weChatShareTimelineService.input.title = this.l('ShareApp');
        this._weChatShareTimelineService.input.desc = this.l('Slogan');
        this._weChatShareTimelineService.input.imgUrl = AppConsts.appBaseUrl + '/assets/common/images/logo.jpg';
        this._weChatShareTimelineService.input.link = AppConsts.appBaseUrl;

        this._weChatShareTimelineService.initWeChatShareConfig();
    }

    shareCallBack(result: WeChatShareResultDto) {
        if (result) {
            // 分享成功
        }
    }
}

