import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { EditionServiceProxy, EditionEditDto, CreateOrUpdateEditionDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { FeatureTreeComponent } from '../shared/feature-tree.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Location } from '@angular/common';

import * as _ from "lodash";

@Component({
    selector: 'createOrEditEditionModal',
    templateUrl: './create-or-edit-edition-modal.component.html',
    animations: [appModuleAnimation()]
})
export class CreateOrEditEditionModalComponent extends AppComponentBase {

    @ViewChild('editionNameInput') editionNameInput: ElementRef;
    @ViewChild('createOrEditModal') modal: ModalDirective;
    @ViewChild('featureTree') featureTree: FeatureTreeComponent;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    saving: boolean = false;

    edition: EditionEditDto = new EditionEditDto();

    constructor(
        injector: Injector,
        private _editionService: EditionServiceProxy,
        private _location: Location
    ) {
        super(injector);
    }

    ngOnInit():void{
        var href = document.location.href;
        var id = +href.substr(href.lastIndexOf("/") + 1, href.length);
        isNaN(id) ? this.show() : this.show(id);
        $(this.editionNameInput.nativeElement).focus();
    }

    show(editionId?: number): void {
        let self = this;
        self._editionService.getEditionForEdit(editionId).subscribe(result => {
            self.edition = result.edition;
            self.featureTree.editData = result;
        });
    }


    save(): void {
        let self = this;

        var input = new CreateOrUpdateEditionDto();
        input.edition = self.edition;
        input.featureValues = self.featureTree.getGrantedFeatures();

        this.saving = true;
        this._editionService.createOrUpdateEdition(input)
            .finally(() => this.saving = false)
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this._location.back();
    }
}