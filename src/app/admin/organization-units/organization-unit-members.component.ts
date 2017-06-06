import { Component, Injector, ViewChild, OnInit, ElementRef, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { IBasicOrganizationUnitInfo } from './basic-organization-unit-info';
import { OrganizationUnitServiceProxy, OrganizationUnitUserListDto, CommonLookupServiceProxy, FindUsersInput, NameValueDto, UserToOrganizationUnitInput } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { CommonLookupModalComponent } from '@app/shared/common/lookup/common-lookup-modal.component';
import { IUserWithOrganizationUnit } from './user-with-organization-unit';

import { AppConsts } from '@shared/AppConsts';
import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process, SortDescriptor, orderBy, toODataString } from '@progress/kendo-data-query';
import { AppGridData } from "shared/grid-data-results/grid-data-results";
import { DatetimeHelper } from "shared/helpers/DatetimeHelper";

@Component({
    selector: 'organization-unit-members',
    templateUrl: "./organization-unit-members.component.html"
})
export class OrganizationUnitMembersComponent extends AppComponentBase implements OnInit {

    @Output() memberRemoved = new EventEmitter<IUserWithOrganizationUnit>();
    @Output() memberAdded = new EventEmitter<IUserWithOrganizationUnit>();

    @ViewChild('memberLookupModal') memberLookupModal: CommonLookupModalComponent;

    private _organizationUnit: IBasicOrganizationUnitInfo = null;
    private _$table: JQuery;

    // grid result
    membersData: AppGridData;

    // page setting
    private buttonCount: number = 5;
    private info: boolean = true;
    private type: 'numeric';
    private pageSizes: number[] = AppConsts.grid.pageSizes;
    private previousNext: boolean = true;
    private pageSize: number = 5;
    private skip: number = 0;
    public sort: Array<SortDescriptor> = [];

    constructor(
        injector: Injector,
        private _changeDetector: ChangeDetectorRef,
        private _organizationUnitService: OrganizationUnitServiceProxy,
        private _organizationUnitMemberService: AppGridData,
        private _commonLookupService: CommonLookupServiceProxy
    ) {
        super(injector);
    }

    get organizationUnit(): IBasicOrganizationUnitInfo {
        return this._organizationUnit;
    }

    set organizationUnit(ou: IBasicOrganizationUnitInfo) {
        if (this._organizationUnit === ou) {
            return;
        }

        this._organizationUnit = ou;
        if (ou) {
            this.refreshMembers();
        }
    }

    ngOnInit(): void {
        this.memberLookupModal.configure({
            title: this.l('SelectAUser'),
            dataSource: (skipCount: number, maxResultCount: number, filter: string) => {
                var input = new FindUsersInput();
                input.filter = filter;
                input.maxResultCount = maxResultCount;
                input.skipCount = skipCount;
                return this._commonLookupService.findUsers(input);
            },
            canSelect: (item: NameValueDto) => {
                var input = new UserToOrganizationUnitInput();

                input.userId = parseInt(item.value);
                input.organizationUnitId = this.organizationUnit.id;

                return this._organizationUnitService
                    .isInOrganizationUnit(input)
                    .map((value, index) => {
                        if (value) {
                            this.message.warn(this.l('UserIsAlreadyInTheOrganizationUnit'));
                        }

                        return !value;
                    });
            }
        });

        this.membersData = this._organizationUnitMemberService;
    }

    refreshMembers(): void {
        this.loadMembersData();
    }

    openAddModal(): void {
        this.memberLookupModal.show();
    }

    addModalMemberSelected(item: NameValueDto): void {
        let input = new UserToOrganizationUnitInput();
        input.organizationUnitId = this.organizationUnit.id;
        input.userId = parseInt(item.value);
        this._organizationUnitService
            .addUserToOrganizationUnit(input)
            .subscribe(() => {
                this.notify.success(this.l('SuccessfullyAdded'));
                this.memberAdded.emit({
                    userId: input.userId,
                    ouId: input.organizationUnitId
                });
                this.refreshMembers();
            });
    }

    removeMember(user: OrganizationUnitUserListDto): void {
        this.message.confirm(
            this.l('RemoveUserFromOuWarningMessage', user.userName, this.organizationUnit.displayName),
            isConfirmed => {
                if (isConfirmed) {
                    this._organizationUnitService
                        .removeUserFromOrganizationUnit(user.id, this.organizationUnit.id)
                        .subscribe(() => {
                            this.notify.success(this.l('SuccessfullyRemoved'));
                            this.memberRemoved.emit({
                                userId: user.id,
                                ouId: this.organizationUnit.id
                            });
                            this.refreshMembers();
                        });
                }
            }
        );
    }

    public dataStateChange({ skip, take, sort }: DataStateChangeEvent): void {
        this.skip = skip;
        this.pageSize = take;
        this.sort = sort;

        this.loadMembersData();
    }

    private loadMembersData(): void {
        let maxResultCount, skipCount, sorting;
        let state = { skip: this.skip, take: this.pageSize, sort: this.sort };
        if (state) {
            maxResultCount = state.take;
            skipCount = state.skip
            if (state.sort.length > 0 && state.sort[0].dir) {
                sorting = state.sort[0].field + " " + state.sort[0].dir
            }
        }

        let loadOrganizationUnitMember = () => {
            return this._organizationUnitService.getOrganizationUnitUsers(this._organizationUnit.id, sorting, maxResultCount, skipCount)
                .map(response => {
                    var string = response.toJS();
                    string.items.forEach(function (item) {
                        if (item.addedTime) {
                            item.addedTime = DatetimeHelper.localDatetime(item.addedTime);
                        }
                    })
                    return string;
                })
        };

        this._organizationUnitMemberService.query(loadOrganizationUnitMember);
    }

    // 编辑删除
    protected removeHandler({ sender, rowIndex, dataItem }) {
        this.removeMember(dataItem);
    }
}