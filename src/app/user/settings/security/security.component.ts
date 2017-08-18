import { Component, Injector, OnInit } from '@angular/core';

import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'xiaoyuyue-security',
    templateUrl: './security.component.html',
    styleUrls: ['./security.component.scss']
})
export class SecurityComponent extends AppComponentBase implements OnInit {

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        // TODO: 暂时处理
        $('#headerTitle').text('账户安全');
    }

    stayTuned(): void {
        this.message.info('正在完善中...', '敬请期待');
    }

}

