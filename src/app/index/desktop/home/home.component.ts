import { AfterViewInit, Component, OnInit, Injector } from '@angular/core';

import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from 'shared/common/app-component-base';

export class UsageSceneDTO {
    tenantName: string;
    tenantBackgroudUrl: string;
    tenantBookingQRCode: string;
}

@Component({
    selector: 'xiaoyuyue-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent extends AppComponentBase implements OnInit {
    allUsageSceneData: UsageSceneDTO[] = [];
    introVideoUrl = 'https://static.vapps.com.cn/xiaoyuyue_usage_scenario.mp4';
    tenantNameArr: string[] = ['花艺', '烘焙', '宠物店', '茶道', '瑜伽', '健身房'];
    tenantBackgroudUrlArr: string[] = [
        '/assets/common/images/index/scene/floriculture.jpg',
        '/assets/common/images/index/scene/bake.jpg',
        '/assets/common/images/index/scene/pet-store.jpg',
        '/assets/common/images/index/scene/teaism.jpg',
        '/assets/common/images/index/scene/yoga.jpg',
        '/assets/common/images/index/scene/gym.jpg'];
    tenantBookingQRCodeArr: string[] = [
        '/assets/common/images/index/scene/qrcode/floriculture.png',
        '/assets/common/images/index/scene/qrcode/bake.png',
        '/assets/common/images/index/scene/qrcode/pet-store.png',
        '/assets/common/images/index/scene/qrcode/teaism.png',
        '/assets/common/images/index/scene/qrcode/yoga.png',
        '/assets/common/images/index/scene/qrcode/gym.png'];
    constructor(
        private injector: Injector
    ) {
        super(injector);
    }


    ngOnInit() {
        this.initUsageSceneData();
    }

    createBooking(): void {
        window.location.href = AppConsts.businessCenterUrl + '/booking/create';
    }

    initUsageSceneData(): void {
        const tenantNum = 6;
        for (let i = 0; i < tenantNum; i++) {
            const usageSceneData = new UsageSceneDTO();
            usageSceneData.tenantName = this.tenantNameArr[i];
            usageSceneData.tenantBackgroudUrl = this.tenantBackgroudUrlArr[i];
            usageSceneData.tenantBookingQRCode = this.tenantBookingQRCodeArr[i];
            this.allUsageSceneData.push(usageSceneData);
        }
    }

}
