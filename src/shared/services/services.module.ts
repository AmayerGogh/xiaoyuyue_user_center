import { AccessRecordService } from 'shared/services/access-record.service';
import { BreadcrumbService } from 'shared/services/bread-crumb.service';
import { CookiesService } from 'shared/services/cookies.service';
import { LoginService } from 'shared/services/login.service';
import { NgModule } from '@angular/core';
import { SitemapsService } from 'shared/services/sitemaps.service';
import { TenantService } from 'shared/services/tenant.service';
import { TitleService } from 'shared/services/title.service';
import { UploadPictureService } from 'shared/services/upload-picture.service';
import { WeChatShareTimelineService } from 'shared/services/wechat-share-timeline.service';
import { ListScrollService } from 'shared/services/list-scroll.service';

@NgModule({
    providers: [
        AccessRecordService,
        TenantService,
        LoginService,
        CookiesService,
        BreadcrumbService,
        TitleService,
        WeChatShareTimelineService,
        SitemapsService,
        UploadPictureService,
        ListScrollService
    ]
})
export class ServicesModule { }
