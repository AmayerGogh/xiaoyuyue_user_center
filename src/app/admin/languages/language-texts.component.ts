import { Component, Injector, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LanguageServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { EditTextModalComponent } from './edit-text-modal.component';

import { Observable } from 'rxjs/Observable';
import { AppConsts } from '@shared/AppConsts';
import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process, SortDescriptor, orderBy, toODataString } from '@progress/kendo-data-query';

import * as _ from 'lodash';
import { AppGridData } from "shared/grid-data-results/grid-data-results";
import { LanguageTextGridDataInputDto } from "shared/grid-data-results/base-grid-data-input.dto";

@Component({
    templateUrl: "./language-texts.component.html",
    styleUrls: ["./language-texts.component.less"]
})
export class LanguageTextsComponent extends AppComponentBase implements AfterViewInit, OnInit {

    @ViewChild('targetLanguageNameCombobox') targetLanguageNameCombobox: ElementRef;
    @ViewChild('baseLanguageNameCombobox') baseLanguageNameCombobox: ElementRef;
    @ViewChild('sourceNameCombobox') sourceNameCombobox: ElementRef;
    @ViewChild('targetValueFilterCombobox') targetValueFilterCombobox: ElementRef;
    @ViewChild('editTextModal') editTextModal: EditTextModalComponent;
    @ViewChild(GridComponent) private grid: GridComponent;

    sourceNames: string[] = [];
    languages: abp.localization.ILanguageInfo[] = [];

    targetLanguageName: string;
    sourceName: string;
    baseLanguageName: string;
    targetValueFilter: string;
    filterText: string;

    // grid result
    textData: AppGridData;

    // kendo grid action
    pageSize: number = 5;
    skip: number = 0;
    sort: Array<SortDescriptor> = [];

    // page setting
    buttonCount: number = AppConsts.grid.defaultPageSize;
    info: boolean = true;
    type: 'numeric';
    pageSizes: number[] = AppConsts.grid.pageSizes;
    previousNext: boolean = true;

    constructor(
        injector: Injector,
        private _languageService: LanguageServiceProxy,
        private _languageTextGridDataResult: AppGridData,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.sourceNames = _.map(_.filter(abp.localization.sources, source => source.type === 'MultiTenantLocalizationSource'), value => value.name);
        this.languages = abp.localization.languages;
        this.textData = this._languageTextGridDataResult;
    }

    ngAfterViewInit(): void {
        this._activatedRoute.params.subscribe((params: Params) => {
            this.baseLanguageName = params['baseLanguageName'] || abp.localization.currentLanguage.name;
            this.targetLanguageName = params['name'];
            this.sourceName = params['sourceName'] || 'Xiaoyuyue';
            this.targetValueFilter = params['targetValueFilter'] || 'ALL';
            this.filterText = params['filterText'] || '';

            setTimeout(() => {
                $(this.baseLanguageNameCombobox.nativeElement).selectpicker('refresh');
                $(this.targetLanguageNameCombobox.nativeElement).selectpicker('refresh');
                $(this.sourceNameCombobox.nativeElement).selectpicker('refresh');
                $(this.targetValueFilterCombobox.nativeElement).selectpicker('refresh');
            }, 0);

            this.loadTextData();
        });
    }

    applyFilters(): void {
        this._router.navigate(['app/admin/languages', this.targetLanguageName, 'texts', {
            sourceName: this.sourceName,
            baseLanguageName: this.baseLanguageName,
            targetValueFilter: this.targetValueFilter,
            filterText: this.filterText
        }]);
    }

    refreshTextValueFromModal(): void {
        this.loadTextData();
    }

    truncateString(value: string) {
        return abp.utils.truncateString(value, 32) || '';
    }

    public dataStateChange({ skip, take, sort }: DataStateChangeEvent): void {
        this.skip = skip;
        this.pageSize = take;
        this.sort = sort;
        this.loadTextData();
    }

    private loadTextData(): void {
        var inputDto = new LanguageTextGridDataInputDto();
        inputDto.baseLanguageName = this.baseLanguageName;
        inputDto.targetLanguageName = this.targetLanguageName;
        inputDto.sourceName = this.sourceName;
        inputDto.targetValueFilter = this.targetValueFilter;
        inputDto.filterText = this.filterText;

        inputDto.maxResultCount = this.pageSize;
        inputDto.skipCount = this.skip;
        if (this.sort.length > 0 && this.sort[0].dir) {
            inputDto.sorting = this.sort[0].field + " " + this.sort[0].dir;
        }

        let loadLanguageTextData = () => {
            return this._languageService
                .getLanguageTexts(
                inputDto.maxResultCount,
                inputDto.skipCount,
                inputDto.sorting,
                inputDto.sourceName,
                inputDto.baseLanguageName,
                inputDto.targetLanguageName,
                inputDto.targetValueFilter,
                inputDto.filterText)
        };

        this._languageTextGridDataResult.query(loadLanguageTextData);
    }

    // 编辑删除
    editHandler({ sender, rowIndex, dataItem }) {
        this.editTextModal.show(this.baseLanguageName,
            this.targetLanguageName,
            this.sourceName,
            dataItem.key,
            dataItem.baseValue,
            dataItem.targetValue
        );
    }
}