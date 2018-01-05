import '@node_modules/qiniu-js/dist/qiniu.min';

import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppGender, DefaultUploadPictureGroundId } from 'shared/AppEnums';
import { PictureServiceProxy, ProfileServiceProxy } from '@shared/service-proxies/service-proxies';

import { AppComponentBase } from 'shared/common/app-component-base';
import { CurrentUserProfileEditDto } from '@shared/service-proxies/service-proxies';
import { MediaPath } from 'shared/AppConsts';
import { UploadPictureDto } from 'app/shared/utils/upload-picture.dto';
import { appModuleAnimation } from 'shared/animations/routerTransition';

@Component({
    selector: 'xiaoyuyue-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss'],
    animations: [appModuleAnimation()]
})
export class UserInfoComponent extends AppComponentBase implements OnInit {

    filpActive = true;
    defaultProfilePictureUrl = MediaPath.defaultProfilePictureUrl;
    localPictureUrl = '';
    userProfileData: CurrentUserProfileEditDto = new CurrentUserProfileEditDto();
    input: CurrentUserProfileEditDto = new CurrentUserProfileEditDto();
    groupId: number = DefaultUploadPictureGroundId.OutletGroup;

    private _$profilePicture: JQuery;
    constructor(
        injector: Injector,
        private _profileServiceProxy: ProfileServiceProxy,
        private _pictureServiceProxy: PictureServiceProxy
    ) {
        super(injector)
    }

    ngOnInit() {
        this.loadData();
    }

    loadData(): void {
        this._profileServiceProxy
            .getCurrentUserProfileForEdit()
            .subscribe(result => {
                this.userProfileData = result;
                this.input = new CurrentUserProfileEditDto(result);
                this.filpActive = true;
            })
    }

    save(): void {
        this._profileServiceProxy
            .updateCurrentUserProfile(this.input)
            .subscribe(result => {
                this.filpActive = true;
                this.loadData();
            });
    }

    cancel(): void {
        this.input = new CurrentUserProfileEditDto(this.userProfileData);
        this.filpActive = true;
    }

    // 获取上传logo图片信息
    getLogoUploadHandler(picInfo: UploadPictureDto): void {
        this.input.profilePictureUrl = picInfo.pictureUrl;
        this.input.profilePictureId = picInfo.pictureId;
    }

    showEdit(): void {
        this.filpActive = false;
    }

}
