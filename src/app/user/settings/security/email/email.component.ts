import { Component, OnInit } from '@angular/core';

import { appModuleAnimation } from 'shared/animations/routerTransition';

@Component({
    selector: 'xiaoyuyue-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.scss'],
    animations: [appModuleAnimation()]
})
export class EmailComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
}
