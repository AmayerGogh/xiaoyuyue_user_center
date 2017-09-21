import { AfterViewInit, Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';

import { AppComponentBase } from 'shared/common/app-component-base';
import { appModuleAnimation } from 'shared/animations/routerTransition';

@Component({
    selector: 'xiaoyuyue-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class SettingsComponent extends AppComponentBase implements OnInit, AfterViewInit {

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        // TODO: 暂时处理
    }

    stayTuned(): void {
        this.message.info('正在完善中...', '敬请期待');
    }

}
