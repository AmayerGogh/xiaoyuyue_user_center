import { Component, Injector, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageServiceProxy, ApplicationLanguageListDto, SetDefaultLanguageInput } from '@shared/service-proxies/service-proxies';

import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrEditLanguageModalComponent } from './create-or-edit-language-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import { Observable } from 'rxjs/Observable';
import { AppConsts } from '@shared/AppConsts';
import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process, SortDescriptor, orderBy, toODataString } from '@progress/kendo-data-query';
import { AppGridData } from "shared/grid-data-results/grid-data-results";

@Component({
    templateUrl: "./languages.component.html",
    styleUrls: ["./languages.component.less"],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class LanguagesComponent extends AppComponentBase {

    @ViewChild('createOrEditLanguageModal') createOrEditLanguageModal: CreateOrEditLanguageModalComponent;
    @ViewChild(GridComponent) private grid: GridComponent;

    // grid result
    languagesData: AppGridData = new AppGridData();

    // kendo grid action
    private displayName: string;

    //  page setting
    pageSize: number = AppConsts.grid.maxPageSize;
    sort: Array<SortDescriptor> = [];

    defaultLanguageName: string;

    constructor(
        injector: Injector,
        private _languageService: LanguageServiceProxy,
        private _router: Router
    ) {
        super(injector);
    }

    public ngOnInit(): void {
        this.loadData();
    }

    /**
     * languages action
     */

    getLanguages(): void {
        this.loadData();
    }

    editLanguage(dataItem): void {
        this.createOrEditLanguageModal.show(dataItem.id);
    }


    changeTexts(language: ApplicationLanguageListDto): void {
        this._router.navigate(['app/admin/languages', language.name, 'texts']);
    }

    setAsDefaultLanguage(language: ApplicationLanguageListDto): void {
        const input = new SetDefaultLanguageInput();
        input.name = language.name;
        this._languageService.setDefaultLanguage(input).subscribe(() => {
            this.getLanguages();
            this.notify.success(this.l('SuccessfullySaved'));
        });
    }

    deleteLanguage(language: ApplicationLanguageListDto): void {
        this.message.confirm(
            this.l('LanguageDeleteWarningMessage', language.displayName),
            isConfirmed => {
                if (isConfirmed) {
                    this._languageService.deleteLanguage(language.id).subscribe(() => {
                        this.getLanguages();
                        this.notify.success(this.l('SuccessfullyDeleted'));
                    });
                }
            }
        );
    }

    private loadData(): void {
        let loadLanguagesData = () => {
            return this._languageService.getLanguages()
                .map(response => {
                    var gridData = (<GridDataResult>{
                        data: response.items,
                        total: response.items.length,
                    });
                    return gridData;
                });
        };
        this.languagesData.query(loadLanguagesData, true);
    }

    public dataStateChange({ skip, take, sort }: DataStateChangeEvent): void {
        this.loadData();
    }

    // 编辑删除
    editHandler({ sender, rowIndex, dataItem }) {
        this.createOrEditLanguageModal.show(dataItem.id);
        // this._router.navigate(['app/admin/roles/edit', dataItem.id]);
    }
    removeHandler({ sender, rowIndex, dataItem }) {
        this.deleteLanguage(dataItem);
    }
}