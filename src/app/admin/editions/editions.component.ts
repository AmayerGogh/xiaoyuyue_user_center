import { Component, AfterViewInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { EditionServiceProxy, EditionListDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Observable } from 'rxjs/Observable';
import { CreateOrEditEditionModalComponent } from './create-or-edit-edition-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import { AppConsts } from '@shared/AppConsts';
import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process, SortDescriptor, orderBy, toODataString } from '@progress/kendo-data-query';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from "moment";
import { AppGridData } from "shared/grid-data-results/grid-data-results";

@Component({
    templateUrl: "./editions.component.html",
    styleUrls: ["./editions.component.less"],
    animations: [appModuleAnimation()]
})
export class EditionsComponent extends AppComponentBase implements AfterViewInit {

    @ViewChild('createOrEditEditionModal') createOrEditEditionModal: CreateOrEditEditionModalComponent;
    @ViewChild(GridComponent) private grid: GridComponent;

    private _$editionsTable: JQuery;
    // 是否加载loading动画
    loading: boolean = false;

    // grid result
    editionsData: AppGridData;
    // kendo grid
    buttonCount: number = 5;
    info: boolean = true;
    type: 'numeric' | 'input' = 'numeric';
    pageSizes: number[] = AppConsts.grid.pageSizes;
    previousNext: boolean = true;
    pageSize: number = AppConsts.grid.defaultPageSize;
    skip: number = 0;
    sort: Array<SortDescriptor> = [];


    constructor(
        injector: Injector,
        private _editionService: EditionServiceProxy,
        private _editionsGridDataResult: AppGridData,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        super(injector);
    }

    ngAfterViewInit(): void {
        this.editionsData = this._editionsGridDataResult;
        this.getEditions();
    }

    getEditions(): void {
        this.loadData();
    }

    createEdition(): void {
        // self.createOrEditEditionModal.show();
        this._router.navigate(['app/admin/editions/create']);
    };

    deleteEdition(edition: EditionListDto): void {
        let self = this;
        self.message.confirm(
            self.l('EditionDeleteWarningMessage', edition.displayName),
            function (isConfirmed) {
                if (isConfirmed) {
                    self._editionService.deleteEdition(edition.id).subscribe((resul) => {
                        self.getEditions();
                        self.notify.success(self.l('SuccessfullyDeleted'));
                    });
                }
            }
        );
    }

    public dataStateChange({ skip, take, sort }: DataStateChangeEvent): void {
        this.skip = skip;
        this.pageSize = take;
        this.sort = sort;

        this.loadData();
    }

    private loadData(): void {
        // let state = { skip: this.skip, take: this.pageSize, sort: this.sort };
        let loadEditionsData = () => {
            return this._editionService.getEditions().map(response => {
                var gridData = (<GridDataResult>{
                    data: response.items,
                    total: response.items.length
                });
                return gridData;
            });
        };

        this._editionsGridDataResult.query(loadEditionsData, true);
    }

    // 编辑删除
    protected editHandler(dataItem) {
        this._router.navigate(['app/admin/editions/edit', dataItem.id]);

    }

    protected removeHandler(dataItem) {
        this.deleteEdition(dataItem);
    }
}