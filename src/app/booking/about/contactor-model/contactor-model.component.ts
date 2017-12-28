import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from 'shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'xiaoyuyue-contactor-model',
    templateUrl: './contactor-model.component.html',
    styleUrls: ['./contactor-model.component.scss']
})
export class ContactorModelComponent extends AppComponentBase implements OnInit {
    contactorWechatUrl: string;
    contactorName: string;

    @ViewChild('contactorModel') contactorModel: ModalDirective;
    constructor(
        private injector: Injector
    ) {
        super(injector);
    }

    ngOnInit() {
    }

    show(contactorName: string, contactorWechatUrl: string): void {
        this.contactorName = contactorName;
        this.contactorWechatUrl = contactorWechatUrl;
        this.contactorModel.show();
    }
    hide(): void {
        this.contactorModel.hide();
    }

    getContactorWechatUrl(contactorWechatUrl: string): string {
        return contactorWechatUrl ? contactorWechatUrl : null;
    }

}
